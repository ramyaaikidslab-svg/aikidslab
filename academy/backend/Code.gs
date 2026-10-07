/**
 * AI Kids Lab Academy — Google Sheets backend (Google Apps Script web app).
 *
 * Paste this whole file into Extensions → Apps Script of a Google Sheet you own,
 * run `setup` once, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). See SETUP.md.
 *
 * Sheets created by setup():
 *   Students      one row per learner: email, name, school, progress summary
 *   State         each learner's saved progress (JSON split across cells)
 *   Logins        every sign-up, sign-in and failed PIN, with time
 *   Certificates  every certificate issued (used by the verify page)
 *   Allowlist     emails allowed in when ACCESS_MODE = allowlist
 *   Settings      ACCESS_MODE = open | allowlist
 */

const SH = { students: 'Students', state: 'State', logins: 'Logins', certs: 'Certificates', allow: 'Allowlist', settings: 'Settings' };
const STUDENT_COLS = ['Email', 'Name', 'School', 'Section', 'PinHash', 'Tokens', 'Created', 'LastSeen', 'TopicsDone', 'Certificates', 'XP', 'MinutesLearning', 'OpenMistakes', 'PythonSolved', 'LastPage', 'FailedPins', 'LockedUntil'];
const C = Object.fromEntries(STUDENT_COLS.map((k, i) => [k, i + 1]));
const CHUNK = 45000, MAX_STATE = 900000, MAX_FAILS = 5, LOCK_MIN = 15;

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const make = (name, headers) => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) { sh.appendRow(headers); sh.setFrozenRows(1); sh.getRange(1, 1, 1, headers.length).setFontWeight('bold'); }
    return sh;
  };
  make(SH.students, STUDENT_COLS);
  make(SH.state, ['Email', 'UpdatedAt', 'Rev', 'Chunks']);
  make(SH.logins, ['Time', 'Email', 'Name', 'Event']);
  make(SH.certs, ['CertificateId', 'Email', 'Name', 'Title', 'Kind', 'Topic/Unit', 'IssuedAt']);
  make(SH.allow, ['Email', 'Name', 'Note']);
  const st = make(SH.settings, ['Key', 'Value', 'Help']);
  if (st.getLastRow() === 1) st.appendRow(['ACCESS_MODE', 'open', 'open = anyone can sign up · allowlist = only emails in the Allowlist sheet']);
  const s1 = ss.getSheetByName('Sheet1'); if (s1 && s1.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s1);
  return 'Setup complete';
}

/* ------------------------------------------------------------------ HTTP */
function doGet(e) {
  if (e && e.parameter && e.parameter.verify) return out(verify({ id: e.parameter.verify }));
  return out({ ok: true, service: 'AI Kids Lab Academy backend', time: new Date().toISOString() });
}

function doPost(e) {
  let req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'bad_request' }); }
  try {
    const a = req.action;
    if (a === 'lookup') return out(lookup(req));
    if (a === 'register') return out(withLock(() => register(req)));
    if (a === 'login') return out(withLock(() => login(req)));
    if (a === 'load') return out(load(req));
    if (a === 'save') return out(withLock(() => save(req)));
    if (a === 'cert') return out(withLock(() => cert(req)));
    if (a === 'verify') return out(verify(req));
    return out({ ok: false, error: 'unknown_action' });
  } catch (err) {
    console.error(err);
    return out({ ok: false, error: 'server_error', message: String(err && err.message || err) });
  }
}

function out(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function withLock(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, error: 'busy' };
  try { return fn(); } finally { lock.releaseLock(); }
}

/* ------------------------------------------------------------------ helpers */
function sheet(name) { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }
function normEmail(e) { return String(e || '').trim().toLowerCase(); }
function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 120; }
function clip(s, n) { return String(s == null ? '' : s).trim().slice(0, n); }
function setting(key, dflt) {
  const sh = sheet(SH.settings); if (!sh) return dflt;
  const vals = sh.getDataRange().getValues();
  for (let i = 1; i < vals.length; i++) if (String(vals[i][0]).trim() === key) return String(vals[i][1]).trim();
  return dflt;
}
function isAllowed(email) {
  if (setting('ACCESS_MODE', 'open').toLowerCase() !== 'allowlist') return true;
  const sh = sheet(SH.allow); if (!sh || sh.getLastRow() < 2) return false;
  const vals = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
  return vals.some(r => normEmail(r[0]) === email);
}
function findRow(sh, email) {
  if (sh.getLastRow() < 2) return 0;
  const f = sh.getRange(2, 1, sh.getLastRow() - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).findNext();
  return f ? f.getRow() : 0;
}
function student(email) {
  const sh = sheet(SH.students), r = findRow(sh, email);
  if (!r) return null;
  const v = sh.getRange(r, 1, 1, STUDENT_COLS.length).getValues()[0];
  return { sh, row: r, v };
}
function logEvent(email, name, ev) { sheet(SH.logins).appendRow([new Date(), email, name, ev]); }
function newToken() { return Utilities.getUuid().replace(/-/g, ''); }
function hasToken(st, token) { return !!token && String(st.v[C.Tokens - 1] || '').split(',').indexOf(String(token)) >= 0; }
function profileOf(st, email) { return { email: email, name: st.v[C.Name - 1], school: st.v[C.School - 1], section: st.v[C.Section - 1] }; }

function readState(email) {
  const sh = sheet(SH.state), r = findRow(sh, email);
  if (!r) return '';
  const n = Number(sh.getRange(r, 4).getValue()) || 0;
  if (!n) return '';
  return sh.getRange(r, 5, 1, n).getValues()[0].join('');
}
function writeState(email, json, rev) {
  const sh = sheet(SH.state), chunks = [];
  for (let i = 0; i < json.length; i += CHUNK) chunks.push(json.slice(i, i + CHUNK));
  let r = findRow(sh, email);
  if (!r) { sh.appendRow([email]); r = sh.getLastRow(); }
  const lastCol = sh.getLastColumn();
  if (lastCol > 4) sh.getRange(r, 5, 1, lastCol - 4).clearContent();
  sh.getRange(r, 1, 1, 4).setValues([[email, new Date(), rev, chunks.length]]);
  if (chunks.length) sh.getRange(r, 5, 1, chunks.length).setValues([chunks]);
}

/* ------------------------------------------------------------------ actions */
function lookup(req) {
  const email = normEmail(req.email);
  if (!validEmail(email)) return { ok: false, error: 'bad_email' };
  const st = student(email);
  return { ok: true, exists: !!st, allowed: isAllowed(email), name: st ? st.v[C.Name - 1] : '', needsPin: !!st && !st.v[C.PinHash - 1] };
}

function register(req) {
  const email = normEmail(req.email);
  if (!validEmail(email)) return { ok: false, error: 'bad_email' };
  if (!isAllowed(email)) return { ok: false, error: 'not_allowed' };
  if (student(email)) return { ok: false, error: 'exists' };
  const name = clip(req.name, 60), pin = clip(req.pinHash, 64);
  if (name.length < 2 || pin.length !== 64) return { ok: false, error: 'bad_request' };
  const token = newToken(), now = new Date();
  const row = STUDENT_COLS.map(k => ({ Email: email, Name: name, School: clip(req.school, 80), Section: clip(req.section, 20), PinHash: pin, Tokens: token, Created: now, LastSeen: now, TopicsDone: 0, Certificates: 0, XP: 0, MinutesLearning: 0, OpenMistakes: 0, PythonSolved: 0, LastPage: '', FailedPins: 0, LockedUntil: '' })[k]);
  sheet(SH.students).appendRow(row);
  logEvent(email, name, 'register');
  return { ok: true, token: token };
}

function login(req) {
  const email = normEmail(req.email), pin = clip(req.pinHash, 64);
  if (!isAllowed(email)) return { ok: false, error: 'not_allowed' };
  const st = student(email);
  if (!st) return { ok: false, error: 'no_user' };
  const lockedUntil = st.v[C.LockedUntil - 1];
  if (lockedUntil && new Date(lockedUntil) > new Date()) return { ok: false, error: 'locked' };
  const stored = String(st.v[C.PinHash - 1] || '');
  if (!stored) st.sh.getRange(st.row, C.PinHash).setValue(pin);          // teacher cleared the PIN: this login sets a new one
  else if (stored !== pin) {
    const fails = (Number(st.v[C.FailedPins - 1]) || 0) + 1;
    st.sh.getRange(st.row, C.FailedPins).setValue(fails >= MAX_FAILS ? 0 : fails);
    if (fails >= MAX_FAILS) st.sh.getRange(st.row, C.LockedUntil).setValue(new Date(Date.now() + LOCK_MIN * 60000));
    logEvent(email, st.v[C.Name - 1], 'failed_pin');
    return { ok: false, error: fails >= MAX_FAILS ? 'locked' : 'bad_pin' };
  }
  const token = newToken();
  const tokens = String(st.v[C.Tokens - 1] || '').split(',').filter(Boolean).concat(token).slice(-5).join(',');
  st.sh.getRange(st.row, C.Tokens).setValue(tokens);
  st.sh.getRange(st.row, C.LastSeen).setValue(new Date());
  st.sh.getRange(st.row, C.FailedPins).setValue(0);
  st.sh.getRange(st.row, C.LockedUntil).setValue('');
  logEvent(email, st.v[C.Name - 1], 'login');
  return { ok: true, token: token, profile: profileOf(st, email), state: readState(email) };
}

function load(req) {
  const email = normEmail(req.email);
  if (!isAllowed(email)) return { ok: false, error: 'not_allowed' };
  const st = student(email);
  if (!st) return { ok: false, error: 'no_user' };
  if (!hasToken(st, req.token)) return { ok: false, error: 'bad_token' };
  return { ok: true, profile: profileOf(st, email), state: readState(email) };
}

function save(req) {
  const email = normEmail(req.email);
  if (!isAllowed(email)) return { ok: false, error: 'not_allowed' };
  const st = student(email);
  if (!st) return { ok: false, error: 'no_user' };
  if (!hasToken(st, req.token)) return { ok: false, error: 'bad_token' };
  const json = String(req.state || '');
  if (!json || json.length > MAX_STATE) return { ok: false, error: 'too_large' };
  let parsed; try { parsed = JSON.parse(json); } catch (e) { return { ok: false, error: 'bad_state' }; }
  writeState(email, json, Number(parsed.rev) || 0);
  const s = req.summary || {};
  const set = (k, v) => st.sh.getRange(st.row, C[k]).setValue(v);
  set('LastSeen', new Date());
  set('TopicsDone', Number(s.topicsDone) || 0);
  set('Certificates', Number(s.certs) || 0);
  set('XP', Number(s.xp) || 0);
  set('MinutesLearning', Number(s.minutes) || 0);
  set('OpenMistakes', Number(s.mistakesOpen) || 0);
  set('PythonSolved', Number(s.pyPassed) || 0);
  set('LastPage', clip(s.last, 60));
  return { ok: true };
}

function cert(req) {
  const email = normEmail(req.email);
  const st = student(email);
  if (!st || !hasToken(st, req.token)) return { ok: false, error: 'bad_token' };
  const c = req.cert || {}, id = clip(c.id, 24);
  if (!/^AIKL-[A-Z0-9]{8}$/.test(id)) return { ok: false, error: 'bad_request' };
  const sh = sheet(SH.certs);
  if (findRow(sh, id)) return { ok: true };
  sh.appendRow([id, email, clip(c.name || st.v[C.Name - 1], 60), clip(c.title, 140), clip(c.kind, 10), clip(c.ref, 20), new Date(Number(c.at) || Date.now())]);
  return { ok: true };
}

function verify(req) {
  const id = clip(req.id, 24).toUpperCase(), sh = sheet(SH.certs), r = findRow(sh, id);
  if (!r) return { ok: false, error: 'not_found' };
  const v = sh.getRange(r, 1, 1, 7).getValues()[0];
  return { ok: true, id: v[0], name: v[2], title: v[3], kind: v[4], issuedAt: v[6] };
}
