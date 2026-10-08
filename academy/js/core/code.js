// A Python exercise step: task, editor, inputs, Run, Check (graded against the
// reference solution), progressive hints, and the solution after 3 tries.
import { esc, ic, h, sfx, toast, xpFly } from './util.js';
import { S, touch, addXP } from './store.js';
import { rngFrom } from './rng.js';
import * as py from './python.js';

let cmP = null;
function loadCM() {
  if (window.CodeMirror) return Promise.resolve(window.CodeMirror);
  if (cmP) return cmP;
  const base = new URL('../../vendor/codemirror/', import.meta.url).href;
  const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'codemirror.css'; document.head.appendChild(css);
  const add = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  cmP = add(base + 'codemirror.js').then(() => add(base + 'python.js')).then(() => window.CodeMirror).catch(() => null);
  return cmP;
}

export function exParams(ex) {
  if (!ex.params) return {};
  const rng = rngFrom(S.state.seed, 'ex', ex.id), p = {};
  for (const [k, [lo, hi]] of Object.entries(ex.params)) p[k] = rng.int(lo, hi);
  return p;
}
const sub = (s, p) => String(s ?? '').replace(/\{\{(\w+)\}\}/g, (_, k) => (k in p ? p[k] : `{{${k}}}`));
const nums = s => (String(s).match(/-?\d+(?:\.\d+)?/g) || []).map(Number);

function compare(mode, got, exp) {
  const g = py.norm(py.stripInputs(got)), e = py.norm(py.stripInputs(exp));
  if (mode === 'numbers') { const a = nums(g), b = nums(e); return a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 1e-6); }
  if (mode === 'lines') { const L = x => x.split('\n').filter(l => l.trim()).length; return L(g) >= L(e) && L(g) > 0; }
  return g === e;
}

export function mountCode(el, ex, { onPass } = {}) {
  const p = exParams(ex);
  const task = sub(ex.task, p), solution = sub(ex.solution, p), starter = sub(ex.starter || '', p);
  const tests = (ex.tests || [{ inputs: [] }]).map(t => ({ inputs: (t.inputs || []).map(v => sub(v, p)) }));
  const usesInput = /\binput\s*\(/.test(solution);
  const rec = S.state.py[ex.id] = S.state.py[ex.id] || { code: starter, passed: false, tries: 0 };
  let editor = null, hintsShown = 0;

  el.innerHTML = `<div class="code-wrap fade-in">
    <div class="code-task lesson">${task}</div>
    ${ex.practical ? `<div class="chip gold">${ic('book', 'sm')} CBSE Practical File · ${esc(ex.practical)}</div>` : ''}
    <div class="editor" data-ed><textarea class="plain" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Python code editor">${esc(rec.code || starter)}</textarea></div>
    ${usesInput ? `<div class="field"><label for="in-${ex.id}">Input values (one per line — each <code>input()</code> takes the next line)</label><textarea class="input" id="in-${ex.id}" rows="3" placeholder="${esc(tests[0].inputs.join('\n') || 'e.g. 15')}">${esc(tests[0].inputs.join('\n'))}</textarea></div>` : ''}
    <div class="row">
      <button class="btn dark" data-run>${ic('play')} Run</button>
      <button class="btn primary" data-check>${ic('check')} Check my program</button>
      <button class="btn sm" data-hint>${ic('bulb', 'sm')} Hint</button>
      <button class="btn sm" data-reset>${ic('refresh', 'sm')} Reset</button>
      <button class="btn sm" data-sol hidden>${ic('eye', 'sm')} Show a solution</button>
      <span class="py-status" data-st></span>
    </div>
    <div data-hints></div>
    <div class="console" data-out aria-live="polite">${rec.passed ? 'You already solved this one. Run it again or improve it.' : 'Output appears here.'}</div>
    <div class="tests" data-tests></div>
  </div>`;
  const $ = s => el.querySelector(s);
  const ta = $('[data-ed] textarea');
  ta.addEventListener('keydown', e => { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('    ', s, ta.selectionEnd, 'end'); } });
  loadCM().then(CM => {
    if (!CM || !el.isConnected) return;
    editor = CM.fromTextArea(ta, { mode: 'python', lineNumbers: true, indentUnit: 4, tabSize: 4, indentWithTabs: false, viewportMargin: Infinity, extraKeys: { Tab: cm => cm.replaceSelection('    ') } });
    editor.on('change', save);
  });
  const getCode = () => editor ? editor.getValue() : ta.value;
  let saveT;
  function save() { clearTimeout(saveT); saveT = setTimeout(() => { rec.code = getCode(); touch(); }, 800); }
  ta.addEventListener('input', save);

  const st = $('[data-st]');
  const status = () => { st.innerHTML = py.pyState.status === 'loading' ? '<span class="spin"></span> Starting Python (first time takes a few seconds)…' : py.pyState.status === 'error' ? 'Python could not start. Check your connection and reload.' : ''; };
  py.pyState.listeners.add(status); status(); py.warm();

  function showOut(r) {
    const out = $('[data-out]');
    let html = esc(py.display(r.stdout));
    if (r.timedOut) html += `<span class="e">\n⏱ Your program ran for too long and was stopped. Is there a loop that never ends?</span>`;
    if (r.error) html += `<span class="e">\n${esc(r.error.type)}${r.error.line ? ` on line ${r.error.line}` : ''}: ${esc(r.error.message)}\n💡 ${esc(r.error.tip || '')}</span>`;
    out.innerHTML = html || '<span class="i">(Your program ran but printed nothing.)</span>';
  }

  $('[data-run]').onclick = async () => {
    const btn = $('[data-run]'); btn.disabled = true;
    const inputs = usesInput ? $('#in-' + ex.id).value.split('\n').filter((l, i, a) => i < a.length - 1 || l !== '') : [];
    $('[data-out]').innerHTML = '<span class="spin"></span>';
    try { showOut(await py.run(getCode(), { inputs })); } catch (e) { $('[data-out]').textContent = 'Python is not available right now.'; }
    btn.disabled = false; rec.code = getCode(); touch();
  };

  $('[data-check]').onclick = async () => {
    const btn = $('[data-check]'); btn.disabled = true;
    const code = getCode(); rec.code = code;
    const box = $('[data-tests]'); box.innerHTML = '<div class="py-status"><span class="spin"></span> Checking…</div>';
    try {
      const msgs = [];
      const an = await py.analyze(code);
      if (!an.ok) { showOut({ stdout: '', error: an.error }); box.innerHTML = ''; fail(); return; }
      const need = ex.need || {}, forbid = ex.forbid || {};
      (need.nodes || []).forEach(n => { if (!an.nodes.includes(n)) msgs.push(`Use ${NODE_NAME[n] || n} in your program.`); });
      (need.calls || []).forEach(c => { if (!an.calls.includes(c)) msgs.push(`Use <code>${c}()</code> in your program.`); });
      (need.methods || []).forEach(m => { if (!an.methods.includes(m)) msgs.push(`Use the list method <code>.${m}()</code>.`); });
      (forbid.calls || []).forEach(c => { if (an.calls.includes(c)) msgs.push(`Solve it without <code>${c}()</code> this time.`); });
      const results = [];
      for (const t of tests) {
        const [exp, got] = [await expected(ex.id, solution, t.inputs), await py.run(code, { inputs: t.inputs })];
        results.push({ t, exp, got, ok: !got.error && !got.timedOut && compare(ex.match || 'exact', got.stdout, exp.stdout) });
      }
      showOut(results[0].got);
      const allOk = results.every(r => r.ok) && !msgs.length;
      box.innerHTML = results.map((r, i) => `<div class="test ${r.ok ? 'ok' : 'no'}">${ic(r.ok ? 'check' : 'x')}<div><b>Test ${i + 1}</b>${r.t.inputs.length ? ` · inputs: <code>${esc(r.t.inputs.join(', '))}</code>` : ''} — ${r.ok ? 'passed' : 'not yet'}
          ${r.ok ? '' : `<pre>Expected:\n${esc(py.norm(py.stripInputs(r.exp.stdout)))}\n\nYour program printed:\n${esc(py.norm(py.stripInputs(r.got.stdout))) || '(nothing)'}${r.got.error ? '\n' + esc(r.got.error.type + ': ' + r.got.error.message) : ''}${r.got.timedOut ? '\n(stopped: ran too long)' : ''}</pre>`}</div></div>`).join('') +
        msgs.map(m => `<div class="test no">${ic('alert')}<div>${m}</div></div>`).join('');
      if (allOk) {
        sfx('win');
        box.insertAdjacentHTML('afterbegin', `<div class="lab-done">${ic('check')}<div>All tests passed${ex.match === 'lines' ? '' : ' — your output matches exactly'}. Great work!</div></div>`);
        if (!rec.passed) { rec.passed = true; rec.at = Date.now(); addXP(40); xpFly(40); }
        touch(); onPass && onPass();
      } else fail();
    } catch (e) {
      box.innerHTML = `<div class="test no">${ic('alert')}<div>Python is not available right now. Reload the page and try again.</div></div>`;
    } finally {
      btn.disabled = false;   // also after a syntax error (early return above), so the learner can fix it and check again
    }
  };
  function fail() {
    sfx('bad'); rec.tries = (rec.tries || 0) + 1; touch();
    if (rec.tries >= 3) $('[data-sol]').hidden = false;
  }
  if ((rec.tries || 0) >= 3) $('[data-sol]').hidden = false;

  $('[data-hint]').onclick = () => {
    const hints = (ex.hints || []).map(x => sub(x, p));
    if (!hints.length) return;
    hintsShown = Math.min(hints.length, hintsShown + 1);
    $('[data-hints]').innerHTML = hints.slice(0, hintsShown).map((x, i) => `<div class="key"><b>Hint ${i + 1}</b>${esc(x)}</div>`).join('');
    if (hintsShown === hints.length) $('[data-hint]').disabled = true;
  };
  $('[data-reset]').onclick = () => {
    if (editor) editor.setValue(starter); else ta.value = starter;
    rec.code = starter; touch(); toast('Code reset to the starting version.');
  };
  $('[data-sol]').onclick = () => {
    $('[data-hints]').innerHTML += `<div class="eg"><b>One possible solution</b><pre class="code">${esc(solution)}</pre><p class="small">Read it line by line, then close it and type your own version — that's how it sticks.</p></div>`;
    $('[data-sol]').hidden = true;
  };
  return () => py.pyState.listeners.delete(status);
}

const NODE_NAME = { For: 'a <code>for</code> loop', While: 'a <code>while</code> loop', If: 'an <code>if</code> statement', List: 'a list', Subscript: 'list indexing like <code>a[0]</code>', Slice: 'slicing like <code>a[1:3]</code>', AugAssign: 'a shortcut like <code>+=</code>', Compare: 'a comparison', BoolOp: '<code>and</code>/<code>or</code>' };

const expCache = new Map();
async function expected(id, solution, inputs) {
  const k = id + '|' + solution + '|' + inputs.join('\u0000');
  if (!expCache.has(k)) expCache.set(k, py.run(solution, { inputs }));
  return expCache.get(k);
}
