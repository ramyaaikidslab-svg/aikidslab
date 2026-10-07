import { ic, esc } from '../core/util.js';

const COL = { red: '#E8453C', blue: '#2F6FED', green: '#109A66', gold: '#FFC800', violet: '#7B4DFF', teal: '#0E9C9C' };
// Asymmetric shapes (no mirror or rotation symmetry), so every turn/flip looks different.
const ASYM = {
  'L-shape': [[30, 12], [48, 12], [48, 70], [76, 70], [76, 88], [30, 88]],
  flag: [[26, 10], [35, 10], [35, 16], [78, 32], [35, 48], [35, 90], [26, 90]],
  chair: [[24, 10], [35, 10], [35, 50], [76, 50], [76, 90], [66, 90], [66, 62], [35, 62], [35, 90], [24, 90]]
};
const rot = p => p.map(([x, y]) => [100 - y, x]);           // 90° clockwise
const rotN = (p, n) => { for (let i = 0; i < n; i++) p = rot(p); return p; };
const mirror = p => p.map(([x, y]) => [100 - x, y]);
const flipUD = p => p.map(([x, y]) => [x, 100 - y]);
const pts = p => p.map(q => q.map(v => +v.toFixed(2)).join(',')).join(' ');
const polyEl = (p, c) => `<polygon points="${pts(p)}" fill="${c}" stroke="#15171C" stroke-width="3" stroke-linejoin="round"/>`;
function ngon(n, cx, cy, r) { return Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (n % 2 ? 0 : Math.PI / n) + i * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }); }
const NGON = { 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon' };
function smallShape(kind, cx, cy, r, c) {
  if (kind === 'circle') return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="#15171C" stroke-width="2.5"/>`;
  if (kind === 'star') { const p = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; }); return polyEl(p, c).replace('stroke-width="3"', 'stroke-width="2"'); }
  const n = { triangle: 3, square: 4 }[kind];
  const p = n === 4 ? [[cx - r * .85, cy - r * .85], [cx + r * .85, cy - r * .85], [cx + r * .85, cy + r * .85], [cx - r * .85, cy + r * .85]] : ngon(3, cx, cy + r * .15, r * 1.1);
  return polyEl(p, c).replace('stroke-width="3"', 'stroke-width="2.5"');
}
const fig = (inner, label) => ({ svg: `<svg viewBox="0 0 100 100" role="img" aria-label="${esc(label)}">${inner}</svg>`, label });
const ORI = ['upright', 'turned 90° clockwise', 'turned upside down (180°)', 'turned 90° anticlockwise'];

export function makePuzzles(rng) {
  const colours = Object.keys(COL);
  const two = (arr) => rng.sample(arr, 2);
  const P = {
    rotate() {
      const [a, c] = two(Object.keys(ASYM)), [ca, cc] = two(colours);
      const F = (s, k, col) => fig(polyEl(rotN(ASYM[s], k), COL[col]), `${col} ${s}, ${ORI[k]}`);
      return { rule: 'Turn 90° clockwise', why: 'A is turned a quarter turn clockwise (to the right) to make B. Do the same to C.',
        A: F(a, 0, ca), B: F(a, 1, ca), C: F(c, 0, cc), right: F(c, 1, cc), wrong: [F(c, 3, cc), F(c, 2, cc), fig(polyEl(mirror(ASYM[c]), COL[cc]), `${cc} ${c}, mirror image`)] };
    },
    mirror() {
      const [a, c] = two(Object.keys(ASYM)), [ca, cc] = two(colours);
      const M = (s, col) => fig(polyEl(mirror(ASYM[s]), COL[col]), `${col} ${s}, mirror image (flipped left-to-right)`);
      return { rule: 'Mirror image (flip left ↔ right)', why: 'B is A reflected in a vertical mirror: left and right swap. Reflect C the same way.',
        A: fig(polyEl(ASYM[a], COL[ca]), `${ca} ${a}`), B: M(a, ca), C: fig(polyEl(ASYM[c], COL[cc]), `${cc} ${c}`), right: M(c, cc),
        wrong: [fig(polyEl(flipUD(ASYM[c]), COL[cc]), `${cc} ${c}, flipped top-to-bottom`), fig(polyEl(rot(ASYM[c]), COL[cc]), `${cc} ${c}, turned 90° clockwise`), fig(polyEl(ASYM[c], COL[cc]), `${cc} ${c}, unchanged`)] };
    },
    swap() {
      const [p1, q1, p2, q2] = rng.sample(colours, 4);
      const [o1, i1, o2, i2] = rng.pick([['square', 'circle', 'circle', 'triangle'], ['circle', 'square', 'square', 'triangle'], ['triangle', 'circle', 'circle', 'square']]);
      const two2 = (o, i, co, ci) => {
        const outer = o === 'circle' ? `<circle cx="50" cy="50" r="40" fill="${COL[co]}" stroke="#15171C" stroke-width="3"/>` : o === 'square' ? `<rect x="12" y="12" width="76" height="76" rx="4" fill="${COL[co]}" stroke="#15171C" stroke-width="3"/>` : polyEl(ngon(3, 50, 58, 46), COL[co]);
        const inner = smallShape(i, 50, o === 'triangle' ? 62 : 50, o === 'triangle' ? 14 : 20, COL[ci]);
        return fig(outer + inner, `${co} ${o} with a ${ci} ${i} inside`);
      };
      return { rule: 'Swap the two colours', why: 'The outside colour and the inside colour change places from A to B. Swap C\'s colours too — the shapes stay where they are.',
        A: two2(o1, i1, p1, q1), B: two2(o1, i1, q1, p1), C: two2(o2, i2, p2, q2), right: two2(o2, i2, q2, p2),
        wrong: [two2(o2, i2, p2, q2), two2(o2, i2, q2, q2), two2(i2, o2, q2, p2)] };
    },
    count() {
      const [s1, s2] = two(['circle', 'star', 'triangle', 'square']), [c1, c2] = two(colours);
      let k1 = rng.int(1, 4), k2 = rng.int(1, 4); while (k2 === k1) k2 = rng.int(1, 4);
      const many = (k, s, col) => {
        const pos = [[28, 30], [72, 30], [50, 50], [28, 72], [72, 72], [50, 88]];
        const lay = { 1: [2], 2: [0, 4], 3: [0, 1, 2], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4], 6: [0, 1, 3, 4, 2, 5] }[k];
        const p6 = k === 6 ? [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]] : null;
        return fig(lay.map((li, j) => { const [x, y] = p6 ? p6[j] : pos[li]; return smallShape(s, x, y, 11, COL[col]); }).join(''), `${k} ${col} ${s}${k > 1 ? 's' : ''}`);
      };
      return { rule: 'Add one more', why: `A has ${k1} and B has ${k1 + 1}: one more shape. C has ${k2}, so the answer has ${k2 + 1} of the same shape.`,
        A: many(k1, s1, c1), B: many(k1 + 1, s1, c1), C: many(k2, s2, c2), right: many(k2 + 1, s2, c2), wrong: [many(k2, s2, c2), many(k2 + 2, s2, c2), many(k2 + 1, s1, c2)] };
    },
    size() {
      const [s1, s2] = two(['circle', 'square', 'triangle', 'star']), [c1, c2] = two(colours);
      const sz = (s, r, col, w) => fig(smallShape(s, 50, 50, r, COL[col]), `${col} ${s}, ${w}`);
      return { rule: 'Double the size', why: 'B is twice as wide and twice as tall as A. Make C twice as big too.',
        A: sz(s1, 15, c1, 'small'), B: sz(s1, 30, c1, 'twice as big'), C: sz(s2, 15, c2, 'small'), right: sz(s2, 30, c2, 'twice as big'),
        wrong: [sz(s2, 15, c2, 'same size'), sz(s2, 45, c2, 'three times as big'), sz(s2, 22, c2, 'one and a half times as big')] };
    },
    sides() {
      let n1 = rng.int(3, 6), n2 = rng.int(3, 6); while (n2 === n1) n2 = rng.int(3, 6);
      const [c1, c2] = two(colours);
      const g = (n, col) => fig(polyEl(ngon(n, 50, n === 3 ? 56 : 50, 40), COL[col]), `${col} ${NGON[n]} (${n} sides)`);
      return { rule: 'One more side', why: `A has ${n1} sides and B has ${n1 + 1}. C has ${n2} sides, so the answer is a ${NGON[n2 + 1]} with ${n2 + 1} sides.`,
        A: g(n1, c1), B: g(n1 + 1, c1), C: g(n2, c2), right: g(n2 + 1, c2), wrong: [g(n2, c2), g(n2 + 2, c2), g(n2 > 3 ? n2 - 1 : n2 + 3, c2)] };
    }
  };
  return rng.shuffle(Object.keys(P)).map(k => {
    const p = P[k](), opts = rng.shuffle([p.right, ...p.wrong]);
    return { ...p, kind: k, opts, ans: opts.indexOf(p.right) };
  });
}

const N = 6, PASS = 5;

export default {
  title: 'Picture Analogies: A is to B as C is to ?',
  mount(ctx) {
    const rng = ctx.rng;
    let set = makePuzzles(rng), qi = 0, res = [], pick = null, fired = false;
    ctx.el.innerHTML = `
      <style>
        .lab-pa{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-pa .eq{display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); gap:6px; align-items:center; max-width:560px;}
        .lab-pa .cell{background:#fff; border:var(--b2); border-radius:12px; padding:6px; text-align:center;}
        .lab-pa .cell svg{width:100%; max-width:110px; height:auto; display:block; margin:0 auto;}
        .lab-pa .cell b{display:block; font-size:.78rem; color:var(--muted);}
        .lab-pa .cell.q{background:var(--gold-wash); border-style:dashed; display:grid; place-items:center; min-height:70px; font-family:var(--head); font-size:2rem; font-weight:800;}
        .lab-pa .colon{font-family:var(--head); font-weight:800; font-size:1.3rem;}
        .lab-pa .ops{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; max-width:560px;}
        @media (max-width:520px){ .lab-pa .ops{grid-template-columns:repeat(2,minmax(0,1fr));} }
        .lab-pa .op{background:#fff; border:var(--b2); border-radius:12px; padding:8px; box-shadow:var(--sh-sm); display:grid; gap:4px; justify-items:center; font-weight:800; min-height:44px;}
        .lab-pa .op svg{width:100%; max-width:96px; height:auto;}
        .lab-pa .op:hover:not(:disabled){background:var(--paper);}
        .lab-pa .op.right{background:var(--good-wash); outline:3px solid var(--good);}
        .lab-pa .op.wrong{background:var(--bad-wash); outline:3px solid var(--bad);}
        .lab-pa .op:disabled{cursor:default;}
      </style>
      <div class="lab-pa stack">
        <p class="lab-intro">“A is to B as C is to ?” Work out what changed from A to B, then apply the <b>same rule</b> to C. This is how AI finds a pattern in examples and applies it to something new.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> solve at least ${PASS} of ${N} picture analogies. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-box" id="paBox"></div>
        <div id="paEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function render() {
      if (qi >= set.length) return finish();
      const p = set[qi], right = res.filter(Boolean).length;
      const dots = Array.from({ length: N }, (_, i) => `<i class="${i < res.length ? (res[i] ? 'ok' : 'no') : i === qi ? 'now' : ''}"></i>`).join('');
      const cell = (f, l) => `<div class="cell">${f.svg}<b>${l}</b></div>`;
      $('#paBox').innerHTML = `
        <div class="qcount"><span>Puzzle ${qi + 1} of ${N} · ${right} correct</span><span class="dots" aria-hidden="true">${dots}</span></div>
        <div class="eq" role="group" aria-label="Analogy: ${esc(p.A.label)} is to ${esc(p.B.label)} as ${esc(p.C.label)} is to what?">
          ${cell(p.A, 'A')}<span class="colon" aria-hidden="true">:</span>${cell(p.B, 'B')}<span class="colon" aria-hidden="true">::</span>${cell(p.C, 'C')}<span class="colon" aria-hidden="true">:</span>
          <div class="cell q">${pick === null ? '?' : p.opts[p.ans].svg}</div></div>
        <p class="mt"><b>Which picture completes the analogy?</b></p>
        <div class="ops mt">${p.opts.map((o, i) => `<button class="op ${pick === null ? '' : i === p.ans ? 'right' : i === pick ? 'wrong' : ''}" data-i="${i}" ${pick === null ? '' : 'disabled'} aria-label="Option ${i + 1}: ${esc(o.label)}">${o.svg}<span>${i + 1}</span></button>`).join('')}</div>
        <div aria-live="polite" class="mt">${pick === null ? '' : `<div class="fb ${pick === p.ans ? 'good' : 'bad'}"><div class="h">${ic(pick === p.ans ? 'check' : 'x')} ${pick === p.ans ? 'Correct!' : `Not quite — option ${p.ans + 1} is right.`}</div><div><b>Rule: ${esc(p.rule)}.</b> ${esc(p.why)}</div></div>
          <div class="row mt"><button class="btn primary" id="paNext">${qi + 1 < N ? 'Next puzzle' : 'See my score'} ${ic('arrow')}</button></div>`}</div>`;
      if (pick === null) ctx.el.querySelectorAll('.op').forEach(b => b.onclick = () => { pick = +b.dataset.i; res.push(pick === p.ans); ctx.sfx(pick === p.ans ? 'ok' : 'bad'); render(); });
      else { $('#paNext').onclick = () => { qi++; pick = null; render(); }; $('#paNext').focus(); }
    }

    function finish() {
      const right = res.filter(Boolean).length, passed = right >= PASS;
      ctx.data.best = Math.max(ctx.data.best || 0, right); ctx.save();
      $('#paBox').innerHTML = `<div class="result"><div class="big">${right} / ${N}</div><p>${passed ? 'Sharp eyes!' : `You need ${PASS} to pass. A new set has new shapes and colours — try again!`}</p>
        <button class="btn ${passed ? '' : 'primary'}" id="paAgain">${ic('refresh')} ${passed ? 'Play a new set' : 'Try a new set'}</button></div>`;
      $('#paAgain').onclick = () => { set = makePuzzles(rng); qi = 0; res = []; pick = null; render(); };
      if (passed) {
        $('#paEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>${right} of ${N} correct! Each analogy hid one rule — turn, mirror, swap colours, add one, double the size, add a side. You <b>found the pattern</b> from one example pair and <b>applied it</b> to a new picture: the same idea behind <b>pattern recognition</b> in AI.</div></div>`;
        if (!fired && !ctx.done && !ctx._completed) { fired = true; ctx._completed = true; ctx.complete(`Solved ${right} of ${N} picture analogies.`); }
      }
    }
    render();
    return () => {};
  }
};
