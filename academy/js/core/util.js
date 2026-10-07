// Shared helpers: DOM, icons, sound, toasts, modals, confetti.

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
export const wait = ms => new Promise(r => setTimeout(r, RM ? Math.min(ms, 30) : ms));
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export function fmtMin(m) { m = Math.round(m); if (m < 60) return m + ' min'; const hh = Math.floor(m / 60), mm = m % 60; return hh + ' h' + (mm ? ' ' + mm + ' min' : ''); }
export function today() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
export function fmtDate(ts) { return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }

/* ---------- icons: 24px grid, built on the logo's rounded-square motif ---------- */
const P = {
  home: '<path d="M4 11 12 4l8 7"/><rect x="6.5" y="10" width="11" height="10" rx="3"/>',
  book: '<rect x="4.5" y="3.5" width="15" height="17" rx="3.5"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  gym: '<rect x="3" y="8.5" width="3.5" height="7" rx="1.2"/><rect x="17.5" y="8.5" width="3.5" height="7" rx="1.2"/><path d="M6.5 12h11M1.5 12H3M21 12h1.5"/>',
  cert: '<rect x="3.5" y="3.5" width="17" height="13" rx="3.5"/><path d="M7.5 8h9M7.5 11h6"/><path d="m10 16.5-1 4 3-1.5 3 1.5-1-4"/>',
  flame: '<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.2 2.6-4.8 3.4-8.4 2 1.2 2.6 3 2.6 4.6 1-.8 1.6-2 1.8-3.4 2.2 1.8 4.2 4.4 4.2 7.2 0 3.2-2.4 5.6-6 5.6Z"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z"/>',
  play: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M10 8.5v7l5.5-3.5Z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow: '<path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
  back: '<path d="M19.5 12h-15M10 6.5 4.5 12l5.5 5.5"/>',
  up: '<path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/>',
  down: '<path d="M12 5v14M6.5 13.5 12 19l5.5-5.5"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  clock: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M12 7.5V12l3 2"/>',
  user: '<rect x="9" y="3.5" width="6" height="6" rx="2"/><path d="M5.5 20.5v-2a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v2"/>',
  logout: '<path d="M14 4.5h3.5a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H14"/><path d="M10 8 6 12l4 4M6 12h10"/>',
  code: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="m9.5 9-3 3 3 3M14.5 9l3 3-3 3"/>',
  lab: '<path d="M9.5 3.5v6L4.8 18a2 2 0 0 0 1.8 2.9h10.8a2 2 0 0 0 1.8-2.9L14.5 9.5v-6M8 3.5h8"/><path d="M7.2 14.5h9.6"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14"/>',
  spark: '<path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.6 2.6M15.4 15.4 18 18M18 6l-2.6 2.6M8.6 15.4 6 18"/>',
  data: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M8 16.5v-3M12 16.5V9.5M16 16.5V7"/>',
  vision: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><rect x="8.5" y="8.5" width="7" height="7" rx="2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21"/>',
  language: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M7.5 9h9M7.5 12.5h6M7.5 16h3.5"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="3.5"/><path d="M3 9.5h18M3 14.5h18M9.5 9.5V20"/>',
  sigma: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M16 7.5H8.5l4 4.5-4 4.5H16"/>',
  wand: '<path d="M4 20 15.5 8.5M13 6l1-2.5L15 6l2.5 1L15 8l-1 2.5L13 8l-2.5-1Z"/><path d="M19 13.5v3M17.5 15h3"/>',
  tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5l-8 8a2.1 2.1 0 0 1-3-3l8-8a4 4 0 0 1-2-2Z"/><path d="M14.5 6.5 17.5 3.5l3 3-3 3"/>',
  mark: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><rect x="8.5" y="8.5" width="7" height="7" rx="2"/><rect x="11" y="11" width="2" height="2" rx=".6"/>',
  alert: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M12 7.5v6M12 16.5v.01"/>',
  sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
  target: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><rect x="7.5" y="7.5" width="9" height="9" rx="2.5"/><rect x="11" y="11" width="2" height="2" rx=".5"/>',
  bulb: '<path d="M9 17.5h6M10 20.5h4M12 3.5a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9v1.2h5v-1.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3.5Z"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  pen: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5Z"/><path d="M13.5 7l3 3"/>',
  quiz: '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17v.01"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.5"/>'
};
export function ic(name, cls = '') { return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || P.mark}</svg>`; }
export const LOGO = '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="6" y="6" width="88" height="88" rx="14"/><rect x="34" y="34" width="32" height="32" rx="8"/><rect x="44" y="44" width="12" height="12" rx="3"/></svg>';

/* ---------- sound ---------- */
let ac = null;
export const sound = { on: true };
try { sound.on = localStorage.getItem('aikl-acad-sound') !== '0'; } catch (e) {}
export function setSound(v) { sound.on = v; try { localStorage.setItem('aikl-acad-sound', v ? '1' : '0'); } catch (e) {} }
export function sfx(kind) {
  if (!sound.on) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const S = { tick: [[880, .03, .04]], ok: [[660, .07, .07], [990, .13, .07]], bad: [[200, .16, .06]],
      win: [[523, .1, .07], [659, .1, .07], [784, .1, .07], [1047, .28, .07]], pop: [[620, .05, .05]] }[kind];
    if (!S) return;
    let t = ac.currentTime;
    S.forEach(([f, d, v]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = kind === 'bad' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + .02); t += d;
    });
  } catch (e) {}
}

/* ---------- toast, xp float, modal, confetti ---------- */
let toastT;
export function toast(html, ms = 3000) {
  $$('.toast').forEach(t => t.remove());
  const t = h(`<div class="toast" role="status">${html}</div>`); document.body.appendChild(t);
  clearTimeout(toastT); toastT = setTimeout(() => t.remove(), ms);
}
export function xpFly(n, ev) {
  const el = h(`<div class="xpfly">+${n} XP</div>`);
  let x = innerWidth / 2, y = innerHeight / 2;
  if (ev && ev.clientX) { x = ev.clientX; y = ev.clientY; }
  el.style.left = clamp(x - 30, 8, innerWidth - 90) + 'px'; el.style.top = (y - 24) + 'px';
  document.body.appendChild(el); setTimeout(() => el.remove(), 1000);
}
export function modal(html, { onClose } = {}) {
  closeModal();
  const bg = h(`<div class="modal-bg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`);
  document.body.appendChild(bg);
  const close = () => { bg.remove(); document.removeEventListener('keydown', key); onClose && onClose(); };
  const key = e => { if (e.key === 'Escape') close(); };
  bg.addEventListener('click', e => { if (e.target === bg || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', key);
  const f = bg.querySelector('button, a, input'); if (f) f.focus();
  return { el: bg.firstElementChild, close };
}
export function closeModal() { $$('.modal-bg').forEach(m => m.remove()); }
export function confetti() {
  if (RM) return;
  let c = $('#confetti'); if (!c) { c = document.createElement('canvas'); c.id = 'confetti'; document.body.appendChild(c); }
  const x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
  const cols = ['#FFC800', '#2F6FED', '#E8453C', '#109A66', '#7B4DFF', '#15171C'];
  const ps = Array.from({ length: 130 }, (_, i) => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 15, vy: -Math.random() * 13 - 4, s: 6 + Math.random() * 7, c: cols[i % 6], r: Math.random() * 6, vr: (Math.random() - .5) * .4 }));
  const t0 = performance.now();
  (function f(t) {
    x.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .42; p.vx *= .99; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
    if (t - t0 < 2400) requestAnimationFrame(f); else x.clearRect(0, 0, c.width, c.height);
  })(t0);
}
export function download(name, href) {
  const a = document.createElement('a'); a.href = href; a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
