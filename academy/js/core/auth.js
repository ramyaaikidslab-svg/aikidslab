// Sign in: email → (returning) 4-digit PIN, or (new) name + school + new PIN.
import CFG from '../config.js';
import { esc, ic, h, toast } from './util.js';
import { backend, normEmail, validEmail, startSession } from './store.js';
import { pinHash } from './rng.js';

const side = `<div class="auth-side">
  <div class="kicker">${esc(CFG.COURSE)}</div>
  <h2>Learn AI by <em>doing</em> it.</h2>
  <ul>
    <li>${ic('check')} 40 topics across all five Part B units, plus a capstone you build yourself</li>
    <li>${ic('check')} 30+ hands-on labs and real Python in your browser</li>
    <li>${ic('check')} Your own questions — and every mistake comes back to be fixed</li>
    <li>${ic('check')} A certificate for every topic you master</li>
    <li>${ic('check')} Pick up exactly where you left off, on any device</li>
  </ul></div>`;

export function authScreen(main, onDone) {
  let email = '';
  const shell = inner => { main.innerHTML = `<div class="auth"><div class="auth-hero">${side}<div class="card">${inner}</div></div></div>`; };

  function stepEmail(msg = '') {
    shell(`<div class="kicker">Welcome</div><h1>Sign in to start learning</h1>
      <form class="stack mt2" data-f novalidate>
        <div class="field"><label for="em">Your email address</label><input class="input" id="em" type="email" autocomplete="email" inputmode="email" required value="${esc(email)}" placeholder="name@school.edu.in"></div>
        <div class="err" aria-live="polite">${msg}</div>
        <button class="btn primary big block" type="submit">Continue ${ic('arrow')}</button>
        <p class="small muted">New here? You'll create your account in the next step. Use an email you'll remember — it's how you get back to your progress.</p>
      </form>`);
    const f = main.querySelector('[data-f]'), inp = main.querySelector('#em');
    inp.focus();
    f.onsubmit = async e => {
      e.preventDefault();
      email = normEmail(inp.value);
      if (!validEmail(email)) return showErr(f, 'Please type a full email address, like name@school.edu.in');
      busy(f, true);
      try {
        const r = await backend.lookup(email);
        if (!r.ok) throw new Error(r.error);
        if (!r.allowed) return stepEmail(`This email isn't on the access list yet. Ask your teacher to add <b>${esc(email)}</b>.`);
        r.exists ? stepPin(r.name, '', r.needsPin) : stepRegister();
      } catch (err) { busy(f, false); showErr(f, 'Could not reach the server. Check your internet connection and try again.'); }
    };
  }

  function pinInputs(prefix) {
    return `<div class="pin" data-pin="${prefix}">${[0, 1, 2, 3].map(i => `<input inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="PIN digit ${i + 1}" autocomplete="off" data-d="${i}">`).join('')}</div>`;
  }
  function wirePin(root, onFull) {
    const ins = [...root.querySelectorAll('input')];
    ins.forEach((inp, i) => {
      inp.oninput = () => { inp.value = inp.value.replace(/\D/g, '').slice(-1); if (inp.value && i < 3) ins[i + 1].focus(); if (ins.every(x => x.value)) onFull && onFull(); };
      inp.onkeydown = e => { if (e.key === 'Backspace' && !inp.value && i > 0) ins[i - 1].focus(); };
      inp.onpaste = e => { const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4); if (t.length === 4) { e.preventDefault(); t.split('').forEach((c, k) => { ins[k].value = c; }); onFull && onFull(); } };
    });
    return () => ins.map(x => x.value).join('');
  }

  function stepPin(name, msg = '', reset = false) {
    shell(`<button class="linkbtn" data-back>${ic('back', 'sm')} Use a different email</button>
      <div class="kicker mt">Welcome back</div><h1>Hi ${esc(name || 'there')}!</h1>
      <p class="muted">${reset ? 'Your teacher reset your PIN. Choose a new 4-digit PIN.' : 'Enter your 4-digit PIN.'}</p>
      <form class="stack mt2" data-f novalidate>${pinInputs('a')}
        <div class="err" aria-live="polite">${msg}</div>
        <button class="btn primary big block" type="submit">${reset ? 'Set PIN and sign in' : 'Sign in'} ${ic('arrow')}</button>
        <p class="small muted">Forgot your PIN? Ask your teacher to reset it — your progress stays safe.</p>
      </form>`);
    main.querySelector('[data-back]').onclick = () => stepEmail();
    const f = main.querySelector('[data-f]');
    const get = wirePin(f.querySelector('[data-pin]'), () => f.requestSubmit());
    f.querySelector('input').focus();
    f.onsubmit = async e => {
      e.preventDefault();
      const pin = get(); if (pin.length !== 4) return showErr(f, 'Enter all 4 digits.');
      busy(f, true);
      try {
        const r = await backend.login(email, await pinHash(email, pin));
        if (!r.ok) {
          const m = { bad_pin: 'That PIN is not right. Try again.', locked: 'Too many wrong tries. Wait 15 minutes, or ask your teacher.', not_allowed: 'This email is not on the access list.', no_user: 'No account with this email.' }[r.error] || 'Sign-in failed. Try again.';
          return stepPin(name, m, reset);
        }
        await startSession(email, r.token, r.profile, r.state);
        onDone();
      } catch (err) { busy(f, false); showErr(f, 'Could not reach the server. Check your connection and try again.'); }
    };
  }

  function stepRegister(msg = '') {
    shell(`<button class="linkbtn" data-back>${ic('back', 'sm')} Use a different email</button>
      <div class="kicker mt">Create your account</div><h1>Let's set you up</h1>
      <p class="muted small">${esc(email)}</p>
      <form class="stack mt2" data-f novalidate>
        <div class="field"><label for="nm">Your full name (as it should appear on certificates)</label><input class="input" id="nm" autocomplete="name" maxlength="60" required></div>
        <div class="field"><label for="sc">School <span class="faint">(optional)</span></label><input class="input" id="sc" autocomplete="organization" maxlength="80"></div>
        <div class="field"><label for="se">Class and section <span class="faint">(optional)</span></label><input class="input" id="se" maxlength="20" placeholder="e.g. 9-B"></div>
        <div class="field"><label>Create a 4-digit PIN</label>${pinInputs('n')}</div>
        <div class="field"><label>Type the PIN again</label>${pinInputs('c')}</div>
        <div class="err" aria-live="polite">${msg}</div>
        <button class="btn primary big block" type="submit">Create account ${ic('arrow')}</button>
        <p class="small muted">We save your name, email, school and progress so you can continue on any device and your teacher can see how you're doing.</p>
      </form>`);
    main.querySelector('[data-back]').onclick = () => stepEmail();
    const f = main.querySelector('[data-f]');
    const gN = wirePin(f.querySelector('[data-pin="n"]'), () => f.querySelector('[data-pin="c"] input').focus());
    const gC = wirePin(f.querySelector('[data-pin="c"]'));
    f.querySelector('#nm').focus();
    f.onsubmit = async e => {
      e.preventDefault();
      const name = f.querySelector('#nm').value.trim().replace(/\s+/g, ' ');
      const school = f.querySelector('#sc').value.trim(), section = f.querySelector('#se').value.trim();
      if (name.length < 2) return showErr(f, 'Please type your name.');
      if (gN().length !== 4) return showErr(f, 'Create a 4-digit PIN.');
      if (gN() !== gC()) return showErr(f, "The two PINs don't match.");
      if (/^(\d)\1{3}$|^1234$|^0000$/.test(gN())) return showErr(f, 'Choose a PIN that is harder to guess than ' + gN() + '.');
      busy(f, true);
      try {
        const r = await backend.register({ email, name, school, section, pinHash: await pinHash(email, gN()) });
        if (!r.ok) return stepRegister(r.error === 'exists' ? 'An account with this email already exists. Go back and sign in.' : r.error === 'not_allowed' ? 'This email is not on the access list yet.' : 'Could not create the account. Try again.');
        await startSession(email, r.token, { name, school, section, email }, null);
        toast(`Welcome, ${esc(name.split(' ')[0])}! Your progress saves automatically.`, 4000);
        onDone(true);
      } catch (err) { busy(f, false); showErr(f, 'Could not reach the server. Check your connection and try again.'); }
    };
  }

  stepEmail();
}

function showErr(f, m) { f.querySelector('.err').innerHTML = m; }
function busy(f, on) { const b = f.querySelector('button[type=submit]'); if (b) { b.disabled = on; if (on) b.dataset.t = b.innerHTML, b.innerHTML = '<span class="spin"></span> Please wait…'; else if (b.dataset.t) b.innerHTML = b.dataset.t; } }
