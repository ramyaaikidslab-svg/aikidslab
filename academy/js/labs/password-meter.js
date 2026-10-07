import { ic, esc } from '../core/util.js';

// Privacy: the typed password lives only in the <input> and local variables while scoring.
// It is never put in ctx.data, never logged and never sent anywhere.

const COMMON = ['password', '123456', '123456789', '12345678', '12345', '1234567', '1234567890', 'qwerty', 'abc123', 'password1',
  '111111', '123123', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'iloveyou', 'india123', 'india@123', 'india', 'iloveindia',
  'sunshine', 'princess', 'football', 'cricket', 'qwerty123', '000000', '1q2w3e4r', '654321', 'superman', 'batman', 'master',
  'hello123', 'hello', 'freedom', 'whatever', 'trustno1', '987654321', 'password123', 'pass@123', 'admin123', 'admin@123', 'test123',
  'qwertyuiop', 'asdfgh', 'asdfghjkl', 'zxcvbnm', '112233', '121212', '123321', '7777777', '666666', 'krishna', 'sairam', 'jaihind',
  'bharat', 'mumbai', 'delhi123', 'pokemon', 'naruto', 'computer', 'internet', 'samsung', 'qazwsx', 'abcd1234', 'abcdef', 'login',
  'secret', 'changeme', 'default', 'pass1234', 'welcome123', 'p@ssw0rd', 'passw0rd', 'shadow', 'michael', 'charlie', 'baseball'];
const COMMON_SET = new Set(COMMON);
const WORDS = COMMON.filter(w => /^[a-z]{5,}$/.test(w)).sort((a, b) => b.length - a.length);
const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890'];
const LEET = { '@': 'a', '4': 'a', '0': 'o', '1': 'i', '3': 'e', '$': 's', '5': 's', '7': 't', '!': 'i' };
const RATE = 1e10;  // guesses per second for a fast offline attacker
const STRONG_BITS = 72;
const PHRASE_WORDS = ['mango', 'river', 'kite', 'tiger', 'cloud', 'pencil', 'monsoon', 'rocket', 'banyan', 'lantern', 'pebble', 'turmeric',
  'violin', 'comet', 'puzzle', 'jasmine', 'chutney', 'harbour', 'meadow', 'peacock', 'thunder', 'saffron', 'island', 'marble', 'falcon',
  'ginger', 'orbit', 'velvet', 'canyon', 'whistle', 'bamboo', 'glacier', 'paddle', 'quartz', 'riddle', 'lotus', 'cobalt', 'drizzle'];

function analyse(pw, names) {
  const n = pw.length;
  const lower = pw.toLowerCase();
  const leet = lower.replace(/[@4013$57!]/g, c => LEET[c]);
  const types = { lower: /[a-z]/.test(pw), upper: /[A-Z]/.test(pw), digit: /\d/.test(pw), symbol: /[^a-zA-Z0-9]/.test(pw) };
  const pool = (types.lower ? 26 : 0) + (types.upper ? 26 : 0) + (types.digit ? 10 : 0) + (types.symbol ? 33 : 0) || 1;
  const w = Array(n).fill(1);
  let token = 0, repeatSeq = false, nameHit = false, commonWord = null;

  const base = lower.replace(/[\d\W_]+$/, '');
  const exact = COMMON_SET.has(lower) || COMMON_SET.has(leet) || (base.length >= 4 && (COMMON_SET.has(base) || COMMON_SET.has(base.replace(/[@4013$57!]/g, c => LEET[c]))));
  // common words / names inside the password: count them as one guessable "token"
  const mark = (word, bits) => {
    let found = false;
    [lower, leet].forEach(s => { let i = s.indexOf(word); while (i >= 0) { for (let k = i; k < i + word.length; k++) w[k] = 0; found = true; i = s.indexOf(word, i + 1); } });
    if (found) token += bits;
    return found;
  };
  for (const word of WORDS) if (mark(word, 12)) { commonWord = commonWord || word; }
  names.forEach(nm => { if (mark(nm, 8)) nameHit = true; });
  // repeats and sequences (aaaa, 1234, dcba) are easy to guess
  for (let i = 1; i < n; i++) {
    const d = pw.charCodeAt(i) - pw.charCodeAt(i - 1);
    if (d === 0 || Math.abs(d) === 1) {
      const d0 = i > 1 ? pw.charCodeAt(i - 1) - pw.charCodeAt(i - 2) : null;
      if (d === 0 && d0 === 0 || Math.abs(d) === 1 && d0 === d) repeatSeq = true;
      w[i] = Math.min(w[i], 0.25);
    }
  }
  // keyboard runs of 4+ (qwer, asdf, 7890)
  ROWS.forEach(row => {
    for (let len = row.length; len >= 4; len--) for (let s = 0; s + len <= row.length; s++) {
      const sub = row.slice(s, s + len);
      let i = lower.indexOf(sub);
      while (i >= 0) { repeatSeq = true; for (let k = i + 1; k < i + len; k++) w[k] = Math.min(w[k], 0.2); i = lower.indexOf(sub, i + 1); }
    }
  });
  const effLen = w.reduce((a, b) => a + b, 0);
  let bits = effLen * Math.log2(pool) + token;
  if (exact) { const r = Math.max(COMMON.indexOf(lower), COMMON.indexOf(leet), COMMON.indexOf(base)); bits = Math.log2((r < 0 ? 100 : r + 1) * 4); }
  if (!n) bits = 0;
  const nTypes = Object.values(types).filter(Boolean).length;
  return { n, bits, types, nTypes, exact, commonWord, nameHit, repeatSeq };
}

function fmtGuesses(bits) {
  const g = Math.pow(2, bits);
  if (g < 1e6) return Math.max(1, Math.round(g)).toLocaleString('en-IN');
  const e = Math.floor(Math.log10(g));
  return `about 10<sup>${e}</sup>`;
}
function fmtTime(bits) {
  const s = Math.pow(2, bits) / RATE;
  const U = [[60, 'second'], [3600, 'minute'], [86400, 'hour'], [2629800, 'day'], [31557600, 'month'], [31557600 * 100, 'year'], [31557600 * 1e5, 'century']];
  if (s < 1) return { t: 'instantly', band: 0 };
  const div = { second: 1, minute: 60, hour: 3600, day: 86400, month: 2629800, year: 31557600, century: 3155760000 };
  for (let i = 0; i < U.length; i++) if (s < U[i][0]) {
    const unit = U[i][1], v = Math.round(s / div[unit]), pl = unit === 'century' ? 'centuries' : unit + 's';
    return { t: `about ${v.toLocaleString('en-IN')} ${v === 1 ? unit : pl}`, band: Math.min(5, i) };
  }
  return { t: 'more than 100,000 years', band: 6 };
}
const LEVELS = [
  { min: 0, n: 'Very weak', c: '#D93A40' }, { min: 28, n: 'Weak', c: '#E8453C' }, { min: 45, n: 'Fair', c: '#DFA426' },
  { min: STRONG_BITS, n: 'Strong', c: '#109A66' }, { min: 90, n: 'Very strong', c: '#0B6B47' }
];

const HABITS = [
  { id: 'otp', t: 'A caller says he is from your bank and asks for the OTP you just received, "to stop your card being blocked". You read it out to him.', safe: false, why: 'Never share an OTP. Banks never ask for it. The OTP is the key that lets someone into your account.' },
  { id: '2fa', t: 'You turn on two-factor authentication (2FA) for your email, so logging in needs your password and a code on your phone.', safe: true, why: 'Even if someone steals your password, they still need the second factor to get in.' },
  { id: 'same', t: 'You use the same password for your email, your games and your school portal, so it is easy to remember.', safe: false, why: 'If one site leaks it, attackers try it everywhere. Use a different password for every account.' },
  { id: 'phrase', t: 'Instead of a short word, you make a long passphrase of four random words, with a number or symbol added.', safe: true, why: 'Long passphrases are easy to remember but take an extremely long time to guess.' }
];

const CSS = `
.lab-pw .pwrow{display:flex; gap:8px;}
.lab-pw .pwrow .input{font-family:var(--mono); font-size:1.1rem; flex:1; min-width:0;}
.lab-pw .strength{height:18px; border:2px solid var(--ink); border-radius:999px; background:#fff; overflow:hidden;}
.lab-pw .strength i{display:block; height:100%; transition:width .3s, background .3s;}
.lab-pw .lvl{font-family:var(--head); font-weight:800; font-size:1.5rem; line-height:1.1;}
.lab-pw .checks{list-style:none; display:grid; gap:6px;}
.lab-pw .checks li{display:flex; gap:8px; align-items:flex-start; font-weight:700; font-size:.95rem;}
.lab-pw .checks .m{width:22px; height:22px; border-radius:7px; border:2px solid var(--ink); display:grid; place-items:center; flex-shrink:0; font-size:.8rem; font-weight:900;}
.lab-pw .checks .ok .m{background:var(--good); border-color:var(--good); color:#fff;}
.lab-pw .checks .no .m{background:var(--bad-wash); border-color:var(--bad); color:#A3262B;}
.lab-pw .checks .idle{color:var(--muted);}
.lab-pw .habits{display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:10px;}
.lab-pw .habit{background:#fff; border:2px solid var(--ink); border-radius:12px; padding:12px; display:grid; gap:10px; align-content:start;}
.lab-pw .habit.right{background:var(--good-wash); border-color:var(--good);} .lab-pw .habit.wrong{background:var(--bad-wash); border-color:var(--bad);}
.lab-pw .habit .seg{justify-self:start;} .lab-pw .habit .seg button{min-height:42px; padding:7px 16px;}
.lab-pw .kv dd{font-variant-numeric:tabular-nums;}
.lab-pw .pill-row .toggle{min-height:40px;}
`;

export default {
  title: 'Password Strength Lab',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-pw');
    const d = ctx.data;
    const names = String(ctx.user?.name || '').toLowerCase().split(/[^a-z]+/).filter(s => s.length >= 3);
    const first = (ctx.user?.name || 'Riya').split(/\s+/)[0].replace(/[^A-Za-z]/g, '') || 'Riya';
    let strongMade = !!d.strong;
    let hab = d.h && typeof d.h === 'object' ? { ...d.h } : {};
    let completed = false;
    const habits = ctx.rng.shuffle(HABITS);
    const save = () => { d.strong = strongMade; d.h = hab; ctx.save(); };   // no password here, ever

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">How long would it take a computer to guess your password? Type one below and watch the meter. <b>Don't use a password you really use</b> — make up a new one.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> make a password rated <b>Strong</b> or better, and get all 4 habit cards right.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div class="lab-grid">
        <div class="lab-box stack" style="gap:12px">
          <label for="pwIn"><b>Try a password</b></label>
          <div class="pwrow">
            <input class="input" id="pwIn" type="password" autocomplete="new-password" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="64" aria-describedby="pwNote">
            <button class="btn" id="pwEye" type="button" aria-pressed="false" aria-label="Show password">${ic('eye')}<span class="eyeTxt">Show</span></button>
          </div>
          <p class="tiny muted" id="pwNote">${ic('lock', 'sm')} Checked only inside this page. It is never saved or sent anywhere.</p>
          <div class="pill-row" aria-label="Examples to try">
            <button class="toggle" data-ex="india123">india123</button>
            <button class="toggle" data-ex="P@ssw0rd">P@ssw0rd</button>
            <button class="toggle" data-ex="${esc(first)}2010">${esc(first)}2010</button>
            <button class="toggle" data-ex="qwerty1234">qwerty1234</button>
            <button class="toggle" id="pwGen">${ic('wand', 'sm')} Passphrase idea</button>
          </div>
          <div>
            <div class="row between"><span class="lvl" id="pwLvl">—</span><span class="chip ok" id="pwStrong" ${strongMade ? '' : 'hidden'}>${ic('check', 'sm')} Strong password made</span></div>
            <div class="strength mt" role="img" id="pwBarWrap" aria-label="Strength meter"><i id="pwBar" style="width:0"></i></div>
          </div>
          <dl class="kv" aria-live="polite">
            <dt>Guesses needed</dt><dd id="pwG">—</dd>
            <dt>Time to crack</dt><dd id="pwT">—</dd>
          </dl>
          <p class="small" id="pwShort" hidden><b>Rated Fair:</b> good mix, but under 12 characters. Smart guessing tools try words with swaps like 0 for o first, so short passwords fall faster than this estimate.</p>
          <p class="tiny muted">Estimate for a fast computer trying 10 billion guesses a second. Real attackers try common passwords and patterns first.</p>
        </div>
        <div class="lab-box">
          <h4>What the checker looks at</h4>
          <ul class="checks" id="pwChecks"></ul>
          <div class="key mt"><b>Tip</b> Length beats complexity. Four random words, like a mini story only you can picture, plus a number or symbol, are hard to guess and easy to remember.</div>
        </div>
      </div>
      <section class="stack" style="gap:10px">
        <h4>Safe or unsafe? Four everyday habits</h4>
        <div class="habits" id="pwHab"></div>
      </section>
      <div id="pwEnd" aria-live="polite"></div>`;

    const IN = el.querySelector('#pwIn'), EYE = el.querySelector('#pwEye');
    const CHECKS = el.querySelector('#pwChecks'), HAB = el.querySelector('#pwHab'), END = el.querySelector('#pwEnd');

    function update() {
      const pw = IN.value;
      const r = analyse(pw, names);
      // Short passwords are capped at Fair: smart guessing tools (dictionary words with
      // letter swaps like 0 for o) crack many of them much faster than this estimate.
      const short = r.n < 12 && r.bits >= STRONG_BITS;
      const lvl = short ? LEVELS[2] : [...LEVELS].reverse().find(L => r.bits >= L.min);
      const strongNow = r.n >= 12 && r.bits >= STRONG_BITS && !r.exact && !r.nameHit && !r.commonWord;
      el.querySelector('#pwLvl').textContent = r.n ? lvl.n : '—';
      el.querySelector('#pwLvl').style.color = r.n ? lvl.c : '';
      const bar = el.querySelector('#pwBar');
      bar.style.width = (r.n ? Math.min(100, Math.max(4, r.bits / 100 * 100)) : 0) + '%';
      bar.style.background = lvl.c;
      el.querySelector('#pwBarWrap').setAttribute('aria-label', r.n ? `Strength: ${lvl.n}` : 'Strength meter, empty');
      el.querySelector('#pwG').innerHTML = r.n ? fmtGuesses(r.bits) : '—';
      el.querySelector('#pwT').textContent = r.n ? fmtTime(r.bits).t : '—';
      el.querySelector('#pwShort').hidden = !short;
      const item = (state, text) => `<li class="${state}"><span class="m" aria-hidden="true">${state === 'ok' ? '✓' : state === 'no' ? '✗' : '·'}</span><span>${text}<span class="sr">${state === 'ok' ? ' (passed)' : state === 'no' ? ' (problem)' : ''}</span></span></li>`;
      const st = c => !r.n ? 'idle' : c ? 'ok' : 'no';
      CHECKS.innerHTML = [
        item(st(r.n >= 12), `At least 12 characters <span class="muted">(${r.n} now)</span>`),
        item(st(r.nTypes >= 3), `Mix of types: lowercase, UPPERCASE, digits, symbols or spaces <span class="muted">(${r.nTypes}/4)</span>`),
        item(st(!r.exact && !r.commonWord), r.exact ? 'This is on the list of most common passwords!' : r.commonWord ? `Contains a very common word ("${esc(r.commonWord)}")` : 'Not a common password or common word'),
        item(st(!r.repeatSeq), r.n && r.repeatSeq ? 'Has repeats or sequences (like aaa, 1234 or qwerty)' : 'No repeats or easy sequences'),
        item(st(!r.nameHit), r.nameHit ? 'Contains your name — that is the first thing people guess' : 'Does not contain your name')
      ].join('');
      if (strongNow && !strongMade) { strongMade = true; ctx.sfx('ok'); save(); el.querySelector('#pwStrong').hidden = false; checkDone(); }
    }

    function renderHabits() {
      HAB.innerHTML = habits.map(H => {
        const v = hab[H.id], answered = v === true || v === false, right = answered && v === H.safe;
        return `<div class="habit ${answered ? (right ? 'right' : 'wrong') : ''}">
          <p>${esc(H.t)}</p>
          <div class="seg" role="group" aria-label="Safe or unsafe"><button data-h="${H.id}" data-v="1" aria-pressed="${v === true}" ${right ? 'disabled' : ''}>Safe</button><button data-h="${H.id}" data-v="0" aria-pressed="${v === false}" ${right ? 'disabled' : ''}>Unsafe</button></div>
          ${answered ? `<p class="small" aria-live="polite"><b>${right ? 'Right.' : 'Think again.'}</b> ${right ? esc(H.why) : 'Imagine someone wants to get into your account. Does this habit help them or stop them?'}</p>` : ''}
        </div>`;
      }).join('');
      HAB.querySelectorAll('[data-h]').forEach(b => b.onclick = () => {
        const H = HABITS.find(x => x.id === b.dataset.h), v = b.dataset.v === '1';
        hab[H.id] = v; ctx.sfx(v === H.safe ? 'ok' : 'bad'); save(); renderHabits(); checkDone();
        const nb = HAB.querySelector(`[data-h="${H.id}"]:not(:disabled)`); if (nb) nb.focus();
      });
    }

    function checkDone() {
      const habitsOK = HABITS.every(H => hab[H.id] === H.safe);
      if (!(strongMade && habitsOK)) {
        END.innerHTML = strongMade || habitsOK ? `<p class="small muted">${strongMade ? 'Strong password made ✓ — now get all 4 habit cards right.' : 'Habits all right ✓ — now make a Strong password.'}</p>` : '';
        return;
      }
      END.innerHTML = `<div class="lab-done">${ic('check')}<div>You made a strong password and spotted safe habits. This is <b>cyber security</b>: protections like long unique passwords, <b>two-factor authentication</b> and never sharing OTPs keep your data safe from <b>unauthorised access</b>. (Data <b>privacy</b> is your right to control who uses your data; security is how it is protected.)</div></div>`;
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete('Made a strong password and identified 4 safe and unsafe security habits.');
      }
    }

    IN.addEventListener('input', update);
    EYE.onclick = () => {
      const show = IN.type === 'password';
      IN.type = show ? 'text' : 'password';
      EYE.setAttribute('aria-pressed', String(show));
      EYE.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      EYE.querySelector('.eyeTxt').textContent = show ? 'Hide' : 'Show';
    };
    el.querySelectorAll('[data-ex]').forEach(b => b.onclick = () => { IN.value = b.dataset.ex; ctx.sfx('tick'); update(); });
    el.querySelector('#pwGen').onclick = () => {
      // Real randomness (not the seeded ctx.rng): a password idea must not be predictable.
      const r = new Uint32Array(5); crypto.getRandomValues(r);
      const pool = PHRASE_WORDS.slice();
      const ws = [0, 1, 2, 3].map(i => pool.splice(r[i] % pool.length, 1)[0]);
      ws[1] = ws[1][0].toUpperCase() + ws[1].slice(1);
      IN.value = ws.join('-') + (r[4] % 90 + 10);
      ctx.sfx('pop'); update();
      ctx.toast('A passphrase idea. For a real one, pick your own words that nobody could guess.');
    };
    update(); renderHabits(); checkDone();
    return () => { IN.value = ''; el.classList.remove('lab-pw'); };
  }
};
