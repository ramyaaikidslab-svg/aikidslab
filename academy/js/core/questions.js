// Renders one question item, collects the answer, grades it and shows feedback.
import { esc, ic, sfx } from './util.js';
import { rngFrom } from './rng.js';
import { S } from './store.js';

const LETTERS = 'ABCDEF';
const codeBlock = code => code ? `<pre class="code">${esc(code)}</pre>` : '';
const optHTML = s => String(s).includes('\n') ? `<span style="white-space:pre-line;font-family:var(--mono)">${esc(s)}</span>` : `<span>${s}</span>`;

export function parseNum(v) {
  v = String(v).trim().replace(/,/g, '').replace(/%$/, '');
  if (/^-?\d+\s*\/\s*\d+$/.test(v)) { const [a, b] = v.split('/').map(Number); return b ? a / b : NaN; }
  return v === '' ? NaN : Number(v);
}

/**
 * render(item, el, {salt, onAnswer(result)}) — result = {ok, chosen, item}
 * The learner must press "Check" (deliberate answering); feedback then shows.
 */
export function renderQuestion(item, el, { salt = 0, onAnswer, label = '' } = {}) {
  const rng = rngFrom(S.state ? S.state.seed : 0, 'opts', item.id, salt);
  if (window.__AIKL_E2E) window.__AIKL_E2E.item = item;   // automated tests only; off unless a test sets it
  const type = item.t;
  let state = {}, answered = false;
  const hint = { mcq: 'Choose one answer.', multi: 'Select all that apply.', tf: 'True or false?', order: 'Use the arrows to put these in the right order.', match: 'Match each item on the left with one on the right.', bins: 'Put each item in the right group.', num: 'Type a number.' }[type] || '';
  el.innerHTML = `<div class="q fade-in">
      ${label ? `<div class="stage-k">${label}</div>` : ''}
      <div class="stem">${item.q}</div>${codeBlock(item.code)}
      <div class="hint">${hint}</div>
      <div class="qbody"></div>
      <div class="row"><button class="btn primary" data-check disabled>Check answer</button></div>
      <div class="qfb" aria-live="polite"></div>
    </div>`;
  el.querySelectorAll('.stem table').forEach(tb => { const w = document.createElement('div'); w.className = 'tblwrap'; tb.before(w); w.appendChild(tb); });
  const body = el.querySelector('.qbody'), checkBtn = el.querySelector('[data-check]');
  const ready = v => { checkBtn.disabled = !v; };

  if (type === 'mcq' || type === 'multi') {
    const order = rng.shuffle(item.o.map((_, i) => i));
    state.order = order; state.sel = new Set();
    body.innerHTML = `<div class="opts" role="${type === 'mcq' ? 'radiogroup' : 'group'}">${order.map((oi, k) =>
      `<button class="opt" data-i="${oi}" role="${type === 'mcq' ? 'radio' : 'checkbox'}" aria-checked="false"><span class="k">${LETTERS[k]}</span>${optHTML(item.o[oi])}</button>`).join('')}</div>`;
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (answered) return;
      const i = +b.dataset.i; sfx('tick');
      if (type === 'mcq') { state.sel = new Set([i]); body.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-checked', String(x === b))); }
      else { state.sel.has(i) ? state.sel.delete(i) : state.sel.add(i); b.setAttribute('aria-checked', String(state.sel.has(i))); }
      ready(state.sel.size > 0);
    });
  } else if (type === 'tf') {
    body.innerHTML = `<div class="tf"><button class="opt" data-v="1" role="radio" aria-checked="false"><span class="k">T</span><span>True</span></button><button class="opt" data-v="0" role="radio" aria-checked="false"><span class="k">F</span><span>False</span></button></div>`;
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => { if (answered) return; sfx('tick'); state.v = b.dataset.v === '1'; body.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-checked', String(x === b))); ready(true); });
  } else if (type === 'order') {
    let arr = rng.shuffle(item.items.slice());
    if (arr.every((x, i) => x === item.items[i])) arr = arr.slice(1).concat(arr[0]);
    state.arr = arr;
    const draw = () => {
      body.innerHTML = `<div class="olist">${state.arr.map((x, i) => `<div class="oitem" data-k="${i}"><span class="n">${i + 1}</span><span>${x}</span><span class="mv"><button aria-label="Move up" data-up="${i}" ${i === 0 ? 'disabled' : ''}>${ic('up', 'sm')}</button><button aria-label="Move down" data-dn="${i}" ${i === state.arr.length - 1 ? 'disabled' : ''}>${ic('down', 'sm')}</button></span></div>`).join('')}</div>`;
      body.querySelectorAll('[data-up]').forEach(b => b.onclick = () => { if (answered) return; const i = +b.dataset.up; [state.arr[i - 1], state.arr[i]] = [state.arr[i], state.arr[i - 1]]; sfx('tick'); draw(); body.querySelector(`[data-k="${i - 1}"] [data-up]`)?.focus(); });
      body.querySelectorAll('[data-dn]').forEach(b => b.onclick = () => { if (answered) return; const i = +b.dataset.dn; [state.arr[i + 1], state.arr[i]] = [state.arr[i], state.arr[i + 1]]; sfx('tick'); draw(); body.querySelector(`[data-k="${i + 1}"] [data-dn]`)?.focus(); });
    };
    draw(); ready(true); state.draw = draw;
  } else if (type === 'match') {
    const rights = rng.shuffle(item.pairs.map(p => p[1]));
    state.ch = {};
    body.innerHTML = `<div class="olist">${item.pairs.map((p, i) => `<div class="mrow" data-r="${i}"><span>${p[0]}</span><select class="input" data-m="${i}" aria-label="Match for ${esc(p[0].replace(/<[^>]+>/g, ''))}"><option value="">Choose…</option>${rights.map(r => `<option value="${esc(r)}">${esc(r.replace(/<[^>]+>/g, ''))}</option>`).join('')}</select><small class="mpick" aria-hidden="true"></small></div>`).join('')}</div>`;
    body.querySelectorAll('select').forEach(s => s.onchange = () => {
      state.ch[s.dataset.m] = s.value;
      // Phones cut long choices off in the closed dropdown, so echo the full text underneath.
      const pick = s.nextElementSibling; if (pick) pick.textContent = s.value ? '\u2192 ' + s.options[s.selectedIndex].text : '';
      ready(Object.values(state.ch).filter(Boolean).length === item.pairs.length);
    });
  } else if (type === 'bins') {
    const items = rng.shuffle(item.items.map((x, i) => i)); state.ch = {};
    body.innerHTML = `<div class="olist">${items.map(i => `<div class="brow" data-r="${i}"><span>${item.items[i][0]}</span><span class="seg" role="group">${item.bins.map((b, k) => `<button data-i="${i}" data-b="${k}" aria-pressed="false">${b}</button>`).join('')}</span></div>`).join('')}</div>`;
    body.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      if (answered) return; const i = b.dataset.i; state.ch[i] = +b.dataset.b; sfx('tick');
      b.parentNode.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      ready(Object.keys(state.ch).length === item.items.length);
    });
  } else if (type === 'num') {
    body.innerHTML = `<div class="numin"><input class="input" inputmode="decimal" autocomplete="off" aria-label="Your answer" data-num>${item.unit ? `<b>${esc(item.unit)}</b>` : ''}</div>`;
    const inp = body.querySelector('[data-num]');
    inp.oninput = () => ready(!isNaN(parseNum(inp.value)));
    inp.onkeydown = e => { if (e.key === 'Enter' && !checkBtn.disabled) checkBtn.click(); };
    setTimeout(() => inp.focus({ preventScroll: true }), 50);
  }

  checkBtn.onclick = () => {
    if (answered) return;
    answered = true; checkBtn.hidden = true;
    const res = grade(item, state, body);
    showFeedback(item, res, el.querySelector('.qfb'), state);
    sfx(res.ok ? 'ok' : 'bad');
    onAnswer && onAnswer({ ok: res.ok, item, chosen: res.chosen });
  };
  // Keyboard shortcuts for choice questions: 1–6 / A–F select an option.
  el.addEventListener('keydown', e => {
    if (answered || !/^[1-6a-fA-F]$/.test(e.key) || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    const idx = /\d/.test(e.key) ? +e.key - 1 : LETTERS.indexOf(e.key.toUpperCase());
    const b = body.querySelectorAll('.opt')[idx]; if (b) b.click();
  });
}

function grade(item, state, body) {
  switch (item.t) {
    case 'mcq': { const c = [...state.sel][0]; markOpts(body, item, new Set([c])); return { ok: c === item.a, chosen: c }; }
    case 'multi': { const right = new Set(item.a); const ok = state.sel.size === right.size && [...state.sel].every(x => right.has(x)); markOpts(body, item, state.sel); return { ok, chosen: [...state.sel] }; }
    case 'tf': { const ok = state.v === item.a; body.querySelectorAll('.opt').forEach(b => { const v = b.dataset.v === '1'; if (v === item.a) b.classList.add('right'); else if (v === state.v) b.classList.add('wrong'); b.disabled = true; }); return { ok, chosen: state.v }; }
    case 'order': {
      const ok = state.arr.every((x, i) => x === item.items[i]);
      body.querySelectorAll('.oitem').forEach((r, i) => { r.classList.add(state.arr[i] === item.items[i] ? 'right' : 'wrong'); r.querySelectorAll('button').forEach(b => { b.disabled = true; }); });
      return { ok, chosen: state.arr };
    }
    case 'match': {
      let ok = true;
      item.pairs.forEach((p, i) => { const r = body.querySelector(`[data-r="${i}"]`), good = state.ch[i] === p[1]; if (!good) ok = false; r.classList.add(good ? 'right' : 'wrong'); r.querySelector('select').disabled = true; });
      return { ok, chosen: state.ch };
    }
    case 'bins': {
      let ok = true;
      item.items.forEach((x, i) => { const r = body.querySelector(`[data-r="${i}"]`), good = state.ch[i] === x[1]; if (!good) ok = false; r.classList.add(good ? 'right' : 'wrong'); r.querySelectorAll('button').forEach(b => { b.disabled = true; }); });
      return { ok, chosen: state.ch };
    }
    case 'num': {
      const inp = body.querySelector('[data-num]'), v = parseNum(inp.value), tol = item.tol || 0;
      inp.disabled = true;
      return { ok: Math.abs(v - item.a) <= tol + 1e-9, chosen: v };
    }
  }
  return { ok: false };
}

function markOpts(body, item, chosen) {
  const right = new Set(Array.isArray(item.a) ? item.a : [item.a]);
  body.querySelectorAll('.opt').forEach(b => {
    const i = +b.dataset.i; b.disabled = true;
    if (right.has(i)) b.classList.add('right'); else if (chosen.has(i)) b.classList.add('wrong');
  });
}

function showFeedback(item, res, box, state) {
  let mis = '';
  if (!res.ok && item.t === 'mcq' && item.mis && item.mis[res.chosen] !== undefined) mis = `<div class="mis">${item.mis[res.chosen]}</div>`;
  let correct = '';
  if (!res.ok) {
    if (item.t === 'mcq') correct = `<div><b>Correct answer:</b> ${optHTML(item.o[item.a])}</div>`;
    else if (item.t === 'multi') correct = `<div><b>Correct answers:</b> ${item.a.map(i => item.o[i]).join(' · ')}</div>`;
    else if (item.t === 'tf') correct = `<div><b>Correct answer:</b> ${item.a ? 'True' : 'False'}</div>`;
    else if (item.t === 'order') correct = `<div><b>Correct order:</b> ${item.items.map((x, i) => `${i + 1}. ${x}`).join(' → ')}</div>`;
    else if (item.t === 'match') correct = `<div><b>Correct matches:</b> ${item.pairs.map(p => `${p[0]} → ${p[1]}`).join(' · ')}</div>`;
    else if (item.t === 'bins') correct = `<div><b>Correct groups:</b> ${item.bins.map((b, k) => `<b>${b}:</b> ${item.items.filter(x => x[1] === k).map(x => x[0]).join(', ')}`).join(' · ')}</div>`;
    else if (item.t === 'num') correct = `<div><b>Correct answer:</b> ${item.a}${item.unit ? ' ' + esc(item.unit) : ''}</div>`;
  }
  box.innerHTML = `<div class="fb ${res.ok ? 'good' : 'bad'} fade-in">
    <div class="h">${ic(res.ok ? 'check' : 'x')} ${res.ok ? pick(['Correct!', 'Spot on!', 'Yes — well reasoned.', 'Exactly right.']) : 'Not quite.'}</div>
    ${mis}${correct}<div>${item.ex}</div>
    ${res.ok ? '' : `<div class="gym">${ic('gym', 'sm')} This idea goes to your Mistake Gym — you'll get a fresh question on it later.</div>`}
  </div>`;
}
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
