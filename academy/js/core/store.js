// Accounts, learner state and syncing.
//
// Interchangeable backends share one interface:
//   FirebaseBackend — Firebase Auth + Firestore (js/core/firebase.js), used when CFG.FIREBASE is set.
//   SheetsBackend — a Google Apps Script web app writing to a Google Sheet you own.
//   LocalBackend  — this browser only (used until BACKEND_URL is configured).
// The learner's state is always written to a local cache first, then synced, so a
// flaky school connection never loses progress.

import CFG from '../config.js';
import { today } from './util.js';
import { hashStr } from './rng.js';
import { FirebaseBackend } from './firebase.js';

const SESSION_KEY = 'aikl-acad-session';
const CACHE_KEY = e => 'aikl-acad-cache:' + e;
const USERS_KEY = 'aikl-acad-users';
export const STATE_VERSION = 1;

function lsGet(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
export const normEmail = e => String(e || '').trim().toLowerCase();
export const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normEmail(e));

/* ---------------------------------------------------------------- backends */
class LocalBackend {
  get kind() { return 'local'; }
  users() { return lsGet(USERS_KEY) || {}; }
  put(u) { lsSet(USERS_KEY, u); }
  async lookup(email) { const u = this.users()[email]; return { ok: true, exists: !!u, allowed: true, name: u ? u.name : '', needsPin: !!u && !u.pin }; }
  async register(p) {
    const u = this.users(); if (u[p.email]) return { ok: false, error: 'exists' };
    const token = 'local-' + Date.now().toString(36);
    u[p.email] = { name: p.name, school: p.school, section: p.section, pin: p.pinHash, created: Date.now(), tokens: [token] };
    this.put(u); return { ok: true, token };
  }
  async login(email, pin) {
    const u = this.users(), r = u[email]; if (!r) return { ok: false, error: 'no_user' };
    if (r.pin && r.pin !== pin) return { ok: false, error: 'bad_pin' };
    if (!r.pin) r.pin = pin;                 // PIN was reset by a teacher: first login sets it again
    const token = 'local-' + Date.now().toString(36); r.tokens = [token]; this.put(u);
    return { ok: true, token, profile: { name: r.name, school: r.school, section: r.section, email }, state: lsGet(CACHE_KEY(email)) };
  }
  async load(email, token) {
    const r = this.users()[email];
    if (!r || !(r.tokens || []).includes(token)) return { ok: false, error: 'bad_token' };
    return { ok: true, profile: { name: r.name, school: r.school, section: r.section, email }, state: lsGet(CACHE_KEY(email)) };
  }
  async save(email, token, state) { return { ok: true }; }
  async cert(email, token, cert) { return { ok: true }; }
  async verify(id) { return { ok: false, error: 'local_mode' }; }
}

class SheetsBackend {
  constructor(url) { this.url = url; }
  get kind() { return 'sheets'; }
  async call(payload, { keepalive = false } = {}) {
    const res = await fetch(this.url, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'text/plain;charset=utf-8' }, redirect: 'follow', keepalive });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { throw new Error('Unexpected reply from server: ' + text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)); }
  }
  lookup(email) { return this.call({ action: 'lookup', email }); }
  register(p) { return this.call({ action: 'register', ...p }); }
  login(email, pinHash) { return this.call({ action: 'login', email, pinHash }).then(parseState); }
  load(email, token) { return this.call({ action: 'load', email, token }).then(parseState); }
  save(email, token, state, opts) {
    const summary = summarise(state);
    return this.call({ action: 'save', email, token, state: JSON.stringify(state), summary }, opts);
  }
  cert(email, token, cert) { return this.call({ action: 'cert', email, token, cert }); }
  verify(id) { return this.call({ action: 'verify', id }); }
}

function parseState(r) {
  if (r && typeof r.state === 'string') { try { r.state = r.state ? JSON.parse(r.state) : null; } catch (e) { r.state = null; } }
  return r;
}

export const backend = CFG.FIREBASE && CFG.FIREBASE.apiKey ? new FirebaseBackend(CFG.FIREBASE)
  : CFG.BACKEND_URL ? new SheetsBackend(CFG.BACKEND_URL) : new LocalBackend();

/* ---------------------------------------------------------------- state */
export function newState(profile) {
  return {
    v: STATE_VERSION, rev: 0, updatedAt: Date.now(), created: Date.now(),
    profile,                                  // {name, email, school, section}
    seed: hashStr(profile.email) >>> 0,       // per-learner seed for unique question sets
    xp: 0, streak: { days: 0, last: '' },
    topics: {},                               // id -> {step, steps:{i:true}, done, at, best, attempts, quiz:[], seen:[], minutes, labs:{}}
    concepts: {},                             // "topicId|tag" -> {n, box, due, fixed, last, wrong:[itemIds]}
    log: [],                                  // [ts, topicId, itemId, tag, ok] (last 600)
    py: {},                                   // exerciseId -> {code, passed, at, tries}
    labs: {},                                 // labId -> saved lab data
    portfolio: {},                            // project entries
    certs: {},                                // id -> {id, kind, ref, title, at}
    time: { total: 0, days: {} },             // minutes
    last: '#/'                                // route to resume
  };
}

export const S = { email: '', token: '', state: null, status: 'idle', listeners: new Set() };
let syncT = null, syncAt = 0, saving = false, pending = false;

export function onStatus(fn) { S.listeners.add(fn); }
function setStatus(s) { S.status = s; S.listeners.forEach(f => f(s)); }

export function session() { return lsGet(SESSION_KEY); }

export async function startSession(email, token, profile, remoteState) {
  const cached = lsGet(CACHE_KEY(email));
  let st = null;
  // Keep whichever copy is newer: the server's or this device's unsynced cache.
  if (remoteState && cached) st = (cached.updatedAt || 0) > (remoteState.updatedAt || 0) ? cached : remoteState;
  else st = remoteState || cached || newState(profile);
  st = migrate(st, profile);
  if (profile) st.profile = Object.assign({}, st.profile, profile, { email });
  S.email = email; S.token = token; S.state = st;
  lsSet(SESSION_KEY, { email, token, kind: backend.kind });
  lsSet(CACHE_KEY(email), st);
  touchStreak();
  if (st !== remoteState) schedule(1500);
  return st;
}

function migrate(st, profile) {
  const base = newState(profile || st.profile || { email: S.email, name: '' });
  const out = Object.assign(base, st);
  for (const k of ['topics', 'concepts', 'py', 'labs', 'portfolio', 'certs']) out[k] = out[k] || {};
  out.time = out.time || { total: 0, days: {} }; out.log = out.log || []; out.streak = out.streak || { days: 0, last: '' };
  out.v = STATE_VERSION;
  return out;
}

export function touch() {                      // call after any state change
  if (!S.state) return;
  S.state.rev++; S.state.updatedAt = Date.now();
  lsSet(CACHE_KEY(S.email), S.state);
  schedule(CFG.SYNC_DELAY);
}

function schedule(ms) {
  if (backend.kind === 'local') { setStatus('saved'); return; }
  setStatus('dirty');
  // Keep the earliest pending save, so steady activity can't postpone syncing forever.
  if (syncT && syncAt <= Date.now() + ms) return;
  clearTimeout(syncT); syncAt = Date.now() + ms;
  syncT = setTimeout(() => { syncT = null; sync(); }, ms);
}

export async function sync(opts = {}) {
  if (backend.kind === 'local' || !S.state || !S.email) return true;
  if (saving) { pending = true; return false; }
  saving = true; setStatus('saving');
  try {
    clearTimeout(syncT); syncT = null;
    const r = await backend.save(S.email, S.token, S.state, { ...opts, summary: summarise(S.state) });
    if (r && r.ok) {
      setStatus('saved');
      // Certificates issued while offline are registered (for verify.html) once a save succeeds.
      Object.values(S.state.certs || {}).filter(c => !c.synced).forEach(c => backend.cert(S.email, S.token, c).then(x => { if (x && x.ok) c.synced = 1; }).catch(() => {}));
      return true;
    }
    if (r && (r.error === 'bad_token' || r.error === 'not_allowed')) { setStatus('expired'); return false; }
    throw new Error(r && r.error || 'save failed');
  } catch (e) {
    setStatus('offline'); clearTimeout(syncT); syncAt = Date.now() + 30000; syncT = setTimeout(() => { syncT = null; sync(); }, 30000); return false;
  } finally {
    saving = false;
    if (pending) { pending = false; schedule(2000); }
  }
}

export async function endSession() {
  clearTimeout(syncT);
  if (S.state) { lsSet(CACHE_KEY(S.email), S.state); await sync(); }
  lsDel(SESSION_KEY);
  if (backend.signOut) await backend.signOut();
  S.email = ''; S.token = ''; S.state = null;
}

addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && S.state && S.status !== 'saved') sync({ keepalive: true }); });
addEventListener('pagehide', () => { if (S.state) lsSet(CACHE_KEY(S.email), S.state); });

/* ---------------------------------------------------------------- streak, xp, time */
export function touchStreak() {
  const st = S.state, d = today();
  if (st.streak.last === d) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const yd = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
  st.streak.days = st.streak.last === yd ? st.streak.days + 1 : 1;
  st.streak.last = d; touch();
}
export function addXP(n) { S.state.xp += n; touch(); }
export const LEVELS = [[0, 'AI Explorer'], [600, 'Data Detective'], [1500, 'Pattern Hunter'], [3000, 'Model Maker'], [5000, 'AI Builder'], [7500, 'AI Innovator']];
export function levelOf(xp) {
  let i = 0; for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k][0]) i = k;
  const next = LEVELS[i + 1];
  return { name: LEVELS[i][1], idx: i, floor: LEVELS[i][0], next: next ? next[0] : null, nextName: next ? next[1] : null };
}

// Active-time tracking: counts a minute only while the tab is visible and the
// learner interacted in the last 90 seconds.
let lastAct = Date.now(), timeTopic = null;
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
export function setTimeTopic(id) { timeTopic = id; }
setInterval(() => {
  if (!S.state || document.visibilityState !== 'visible' || Date.now() - lastAct > 90000) return;
  const st = S.state, d = today(), m = 0.25;
  st.time.total += m; st.time.days[d] = (st.time.days[d] || 0) + m;
  if (timeTopic) { const t = topicState(timeTopic); t.minutes = (t.minutes || 0) + m; }
  st.updatedAt = Date.now(); lsSet(CACHE_KEY(S.email), st);
  if (Math.round(st.time.total * 4) % 8 === 0) schedule(CFG.SYNC_DELAY);   // sync at least every ~2 min of activity
}, 15000);

/* ---------------------------------------------------------------- per-topic helpers */
export function topicState(id) {
  const t = S.state.topics;
  if (!t[id]) t[id] = { step: 0, steps: {}, done: false, best: 0, attempts: 0, quiz: [], seen: [], minutes: 0, labs: {} };
  return t[id];
}

// Compact summary columns for the teacher's sheet.
export function summarise(st) {
  const done = Object.values(st.topics).filter(t => t.done).length;
  const open = Object.values(st.concepts).filter(c => c.box < 4 && c.n > 0).length;
  return { name: st.profile.name, school: st.profile.school || '', section: st.profile.section || '',
    topicsDone: done, certs: Object.keys(st.certs).length, xp: st.xp, minutes: Math.round(st.time.total),
    mistakesOpen: open, pyPassed: Object.values(st.py).filter(p => p.passed).length, last: st.last };
}
