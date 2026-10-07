// AI Kids Lab Academy — app entry: boot, top bar and router.
import CFG from './config.js';
import { $, esc, ic, h, LOGO, toast, modal, closeModal } from './core/util.js';
import { S, backend, session, startSession, endSession, onStatus, levelOf, sync } from './core/store.js';
import { loadCourse, C } from './core/course.js';
import { authScreen } from './core/auth.js';
import { renderTopic, leavePlayer } from './core/player.js';
import { dashboard, unitPage, gymPage, certsPage, practicalPage, profilePage } from './core/views.js';
import { dueConcepts } from './core/learn.js';

const main = $('#main');
const top = $('#topbar');

function topbar() {
  if (!S.state) {
    top.innerHTML = `<div class="wrap"><a class="brand" href="#/">${LOGO}<b>AI Kids Lab</b><span>Academy</span></a></div>`;
    return;
  }
  const lv = levelOf(S.state.xp), due = dueConcepts().length, initials = S.state.profile.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  top.innerHTML = `<div class="wrap">
    <a class="brand" href="#/">${LOGO}<b>AI Kids Lab</b><span>Academy</span></a>
    <a class="tpill xp" href="#/me" title="${esc(lv.name)}">${ic('star')} ${S.state.xp}<span class="lbl">&nbsp;XP</span></a>
    <span class="tpill" title="Daily streak">${ic('flame')} ${S.state.streak.days}<span class="lbl">&nbsp;day${S.state.streak.days === 1 ? '' : 's'}</span></span>
    <a class="tpill" href="#/gym" title="Mistake Gym">${ic('gym')}<span class="lbl">Gym</span>${due ? `<span class="dot">${due}</span>` : ''}</a>
    <button class="avatar" data-menu aria-label="Menu" aria-haspopup="true">${esc(initials)}</button>
  </div>`;
  top.querySelector('[data-menu]').onclick = e => { e.stopPropagation(); toggleMenu(); };
}

function toggleMenu() {
  const old = $('.menu'); if (old) { old.remove(); return; }
  const st = S.status;
  const m = h(`<div class="menu" role="menu">
    <div class="who"><b>${esc(S.state.profile.name)}</b><span>${esc(S.state.profile.email)}</span><span class="tiny muted" data-sync>${syncText(st)}</span></div>
    <a href="#/" role="menuitem">${ic('home')} Dashboard</a>
    <a href="#/gym" role="menuitem">${ic('gym')} Mistake Gym</a>
    <a href="#/certs" role="menuitem">${ic('cert')} Certificates</a>
    <a href="#/practical" role="menuitem">${ic('code')} Practical file</a>
    <a href="#/me" role="menuitem">${ic('user')} My profile</a>
    <button data-out role="menuitem">${ic('logout')} Sign out</button>
  </div>`);
  document.body.appendChild(m);
  m.querySelector('[data-out]').onclick = signOut;
  setTimeout(() => document.addEventListener('click', function close(ev) { if (!m.contains(ev.target)) { m.remove(); document.removeEventListener('click', close); } }), 0);
  m.querySelectorAll('a').forEach(a => a.addEventListener('click', () => m.remove()));
}
function syncText(s) {
  if (backend.kind === 'local') return 'Progress saved on this device';
  return { saved: '✓ All progress saved', dirty: 'Saving soon…', saving: 'Saving…', offline: 'Offline — will save when you reconnect', expired: 'Signed out elsewhere — please sign in again', idle: '✓ Saved' }[s] || '';
}
onStatus(s => {
  const el = $('[data-sync]'); if (el) el.textContent = syncText(s);
  if (s === 'expired') showExpired();
});
let expiredShown = false;
function showExpired() {
  if (expiredShown) return; expiredShown = true;
  const m = modal(`<h2>Please sign in again</h2><p class="mt">Your session ended (perhaps you signed in on another device). Your latest work is safe on this device and will be saved as soon as you sign in.</p><div class="row mt2"><button class="btn primary" data-re>Sign in</button></div>`);
  m.el.querySelector('[data-re]').onclick = async () => { m.close(); expiredShown = false; const keep = S.state; await endSession(); route(); };
}

async function signOut() {
  $('.menu')?.remove();
  leavePlayer();
  main.innerHTML = '<div class="loading"><span class="spin"></span>Saving your progress…</div>';
  await endSession();
  toast('Signed out. See you soon!');
  location.hash = '#/';
  route();
}

export function nav(hash) { if (location.hash === hash) route(); else location.hash = hash; }

function route() {
  closeModal(); $('.menu')?.remove();
  if (!S.state) {
    leavePlayer(); topbar();
    authScreen(main, (isNew) => { topbar(); nav(isNew ? '#/' : (S.state.last && S.state.last !== '#/' ? S.state.last : '#/')); route(); });
    return;
  }
  topbar();
  const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
  const [p0, p1, p2] = parts;
  if (p0 !== 't') { leavePlayer(); if (p0 === '' || p0 === undefined) S.state.last = S.state.last || '#/'; }
  window.scrollTo(0, 0);
  if (!p0) dashboard(main);
  else if (p0 === 'u') unitPage(main, p1);
  else if (p0 === 't') renderTopic(main, p1, p2 === undefined ? null : +p2, nav);
  else if (p0 === 'gym') gymPage(main);
  else if (p0 === 'certs') certsPage(main);
  else if (p0 === 'practical') practicalPage(main);
  else if (p0 === 'me') profilePage(main, signOut);
  else dashboard(main);
  document.title = (p0 === 't' && C.topics.get(p1) ? C.topics.get(p1).title + ' · ' : '') + CFG.APP_NAME;
}
addEventListener('hashchange', route);

async function boot() {
  main.innerHTML = '<div class="loading"><span class="spin"></span>Loading the Academy…</div>';
  topbar();
  const courseP = loadCourse();
  const sess = session();
  if (sess && sess.email && sess.kind === backend.kind) {
    try {
      const r = await backend.load(sess.email, sess.token);
      if (r && r.ok) await startSession(sess.email, sess.token, r.profile, r.state);
      else if (r && (r.error === 'bad_token' || r.error === 'not_allowed' || r.error === 'no_user')) { await endSession(); }
    } catch (e) {
      // Offline: continue from this device's cache and sync later.
      try { const cache = JSON.parse(localStorage.getItem('aikl-acad-cache:' + sess.email) || 'null'); if (cache) { await startSession(sess.email, sess.token, cache.profile, cache); toast('You seem to be offline. Your work is saved on this device and will sync later.', 5000); } } catch (e2) {}
    }
  }
  try { await courseP; }
  catch (e) { main.innerHTML = `<div class="card"><h2>Something went wrong loading the course</h2><p class="mt">Please reload the page. If it keeps happening, tell your teacher.</p><pre class="code mt">${esc(e.message)}</pre></div>`; console.error(e); return; }
  if (S.state && (!location.hash || location.hash === '#/' || location.hash === '#')) {
    // Land on the dashboard; its big "Continue" card takes them back to the exact step.
  }
  route();
}
boot();

// Keep the top bar's gym count fresh while the app is open.
setInterval(() => { if (S.state && !$('.menu')) { const due = dueConcepts().length; const d = top.querySelector('.tpill .dot'); if ((due && !d) || (d && +d.textContent !== due) || (!due && d)) topbar(); } }, 60000);
addEventListener('online', () => { if (S.state) sync(); });
