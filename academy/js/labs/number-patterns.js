import { ic, esc } from '../core/util.js';

// Each generator returns { kind, terms, miss, rule, work }
export function makeSet(rng) {
  const G = [
    () => { const a = rng.int(2, 20), d = rng.int(3, 12), t = Array.from({ length: 6 }, (_, i) => a + i * d), m = rng.int(1, 5);
      return { kind: 'Arithmetic (adding)', terms: t, miss: m, rule: `Add ${d} each time.`, work: `${t[m - 1]} + ${d} = ${t[m]}` }; },
    () => { const a = rng.int(60, 99), d = rng.int(3, 9), t = Array.from({ length: 6 }, (_, i) => a - i * d), m = rng.int(1, 5);
      return { kind: 'Arithmetic (subtracting)', terms: t, miss: m, rule: `Subtract ${d} each time.`, work: `${t[m - 1]} − ${d} = ${t[m]}` }; },
    () => { const r = rng.pick([2, 3]), a = r === 2 ? rng.int(1, 6) : rng.int(1, 4), t = Array.from({ length: 6 }, (_, i) => a * r ** i), m = rng.int(1, 5);
      return { kind: 'Geometric (multiplying)', terms: t, miss: m, rule: `Multiply by ${r} each time.`, work: `${t[m - 1]} × ${r} = ${t[m]}` }; },
    () => { const k = rng.int(1, 6), t = Array.from({ length: 6 }, (_, i) => (k + i) ** 2), m = rng.int(1, 5);
      return { kind: 'Square numbers', terms: t, miss: m, rule: `These are square numbers: ${k}², ${k + 1}², ${k + 2}², …`, work: `${k + m}² = ${k + m} × ${k + m} = ${t[m]}` }; },
    () => { const k = rng.int(1, 3), t = Array.from({ length: 5 }, (_, i) => (k + i) ** 3), m = rng.int(1, 4);
      return { kind: 'Cube numbers', terms: t, miss: m, rule: `These are cube numbers: ${k}³, ${k + 1}³, ${k + 2}³, …`, work: `${k + m}³ = ${k + m} × ${k + m} × ${k + m} = ${t[m]}` }; },
    () => { const t = [rng.int(1, 5)]; t.push(t[0] + rng.int(0, 4)); while (t.length < 7) t.push(t[t.length - 1] + t[t.length - 2]); const m = rng.int(2, 6);
      return { kind: 'Fibonacci-like', terms: t, miss: m, rule: 'Each term is the sum of the two terms before it.', work: `${t[m - 2]} + ${t[m - 1]} = ${t[m]}` }; },
    () => { const s = rng.int(1, 10), a = rng.int(2, 6), b = rng.int(7, 12), t = [s]; for (let i = 0; i < 6; i++) t.push(t[i] + (i % 2 ? b : a)); const m = rng.int(2, 6);
      return { kind: 'Alternating steps', terms: t, miss: m, rule: `Add ${a}, then ${b}, then ${a}, then ${b}… (two steps take turns).`, work: `${t[m - 1]} + ${(m - 1) % 2 ? b : a} = ${t[m]}` }; },
    () => { const s = rng.int(1, 10), d0 = rng.int(1, 4), t = [s]; for (let i = 0; i < 5; i++) t.push(t[i] + d0 + i); const m = rng.int(2, 5);
      return { kind: 'Growing gaps', terms: t, miss: m, rule: `The gap grows by 1 each time: +${d0}, +${d0 + 1}, +${d0 + 2}, …`, work: `${t[m - 1]} + ${d0 + m - 1} = ${t[m]}` }; }
  ];
  return rng.shuffle(G).map(g => g());
}

const N = 8, PASS = 6;

export default {
  title: 'Number Patterns: find the missing term',
  mount(ctx) {
    const rng = ctx.rng;
    let set = makeSet(rng), qi = 0, res = [], hint = false, answered = null, fired = false, round = 1;

    ctx.el.innerHTML = `
      <style>
        .lab-np{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-np .tiles{display:flex; flex-wrap:wrap; gap:8px; align-items:center;}
        .lab-np .tile{min-width:56px; height:56px; padding:0 10px; border:var(--b2); border-radius:12px; background:#fff; display:grid; place-items:center; font-family:var(--head); font-weight:800; font-size:1.35rem; box-shadow:var(--sh-sm); font-variant-numeric:tabular-nums;}
        .lab-np .tile.q{background:var(--gold); }
        .lab-np .tile.ok{background:var(--good-wash); border-color:var(--good);}
        .lab-np .tile.no{background:var(--bad-wash); border-color:var(--bad);}
        .lab-np .sep{font-weight:900; color:var(--faint);}
        .lab-np .gaps{display:flex; flex-wrap:wrap; gap:6px;}
      </style>
      <div class="lab-np stack">
        <p class="lab-intro">Mathematicians — and AI systems — look for <b>patterns</b> so they can predict what comes next. Find the rule and type the missing number.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> get at least ${PASS} of ${N} patterns right. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-box" id="npBox"></div>
        <div id="npEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function gapsHTML(p, reveal) {
      const t = p.terms, out = [];
      for (let i = 1; i < t.length; i++) {
        const known = reveal || (i !== p.miss && i - 1 !== p.miss);
        const d = t[i] - t[i - 1];
        out.push(`<span class="chip ${known ? '' : 'dim'}">${known ? (d >= 0 ? '+' + d : '−' + -d) : '?'}</span>`);
      }
      return `<div class="small"><b>Gaps between terms:</b></div><div class="gaps mt">${out.join('')}</div>`;
    }

    function render() {
      if (qi >= set.length) return finish();
      const p = set[qi], right = res.filter(Boolean).length;
      const dots = Array.from({ length: N }, (_, i) => `<i class="${i < res.length ? (res[i] ? 'ok' : 'no') : i === qi ? 'now' : ''}"></i>`).join('');
      const tiles = p.terms.map((v, i) => i === p.miss
        ? `<span class="tile ${answered ? (answered.ok ? 'ok' : 'no') : 'q'}" aria-label="missing term">${answered ? v : '?'}</span>`
        : `<span class="tile">${v}</span>`).join('<span class="sep" aria-hidden="true">,</span>');
      $('#npBox').innerHTML = `
        <div class="qcount"><span>Round ${round} · Pattern ${qi + 1} of ${N} · ${right} correct</span><span class="dots" aria-hidden="true">${dots}</span></div>
        <div class="tiles" role="group" aria-label="Sequence: ${p.terms.map((v, i) => i === p.miss ? 'missing' : v).join(', ')}">${tiles}</div>
        ${answered ? '' : `<div class="numin mt"><label class="sr" for="npIn">Missing number</label><input class="input" id="npIn" type="text" inputmode="numeric" autocomplete="off" placeholder="?"><button class="btn primary" id="npGo">Check</button><button class="btn sm ghost" id="npHint">${ic('bulb')} ${hint ? 'Hide' : 'Show'} the gaps</button></div>`}
        ${hint || answered ? `<div class="mt">${gapsHTML(p, !!answered)}</div>` : ''}
        <div aria-live="polite" class="mt">${answered ? `<div class="fb ${answered.ok ? 'good' : 'bad'}"><div class="h">${ic(answered.ok ? 'check' : 'x')} ${answered.ok ? 'Correct!' : `Not this time — you typed ${esc(answered.v)}, the answer is ${p.terms[p.miss]}.`}</div>
          <div><b>${esc(p.kind)}.</b> ${esc(p.rule)} So ${esc(p.work)}.</div></div>
          <div class="row mt"><button class="btn primary" id="npNext">${qi + 1 < N ? 'Next pattern' : 'See my score'} ${ic('arrow')}</button></div>` : ''}</div>`;
      if (answered) { $('#npNext').onclick = () => { qi++; answered = null; hint = false; render(); }; $('#npNext').focus(); return; }
      const inp = $('#npIn');
      $('#npGo').onclick = check;
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
      $('#npHint').onclick = () => { hint = !hint; render(); $('#npIn').focus(); };
    }

    function check() {
      const raw = $('#npIn').value.trim().replace(/,/g, '').replace(/^−/, '-');
      if (!/^-?\d+$/.test(raw)) { ctx.toast('Type a whole number.'); $('#npIn').focus(); return; }
      const p = set[qi], ok = +raw === p.terms[p.miss];
      res.push(ok); answered = { ok, v: raw };
      ctx.sfx(ok ? 'ok' : 'bad');
      render();
    }

    function finish() {
      const right = res.filter(Boolean).length, passed = right >= PASS;
      ctx.data.best = Math.max(ctx.data.best || 0, right); ctx.save();
      $('#npBox').innerHTML = `<div class="result"><div class="big">${right} / ${N}</div>
        <p>${passed ? 'Pattern spotter!' : `You need ${PASS} to pass. Each new set has fresh numbers — try again!`}</p>
        <button class="btn ${passed ? '' : 'primary'}" id="npAgain">${ic('refresh')} ${passed ? 'Play a new set' : 'Try a new set'}</button></div>`;
      $('#npAgain').onclick = () => { set = makeSet(rng); qi = 0; res = []; answered = null; hint = false; round++; if (!passed) $('#npEnd').innerHTML = ''; render(); };
      if (passed) {
        $('#npEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>${right} of ${N} correct! You found each rule — add, subtract, multiply, squares, cubes, sums of earlier terms — and used it to <b>predict</b> the missing term. Spotting <b>patterns</b> in numbers is the heart of <b>Math for AI</b>: AI models learn patterns in data to make predictions.</div></div>`;
        if (!fired && !ctx.done && !ctx._completed) {
          fired = true; ctx._completed = true;
          ctx.complete(`Found ${right} of ${N} missing terms in number patterns.`);
        }
      }
    }

    render();
    return () => {};
  }
};
