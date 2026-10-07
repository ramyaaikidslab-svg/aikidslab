import { esc, ic } from '../core/util.js';

// Build a rule-based fruit sorter (a decision tree) by choosing the question at
// each node, then test it on 10 fruits.

export const FRUITS = {
  apple: { e: '🍎', n: 'Apple' }, banana: { e: '🍌', n: 'Banana' }, orange: { e: '🍊', n: 'Orange' },
  grapes: { e: '🍇', n: 'Grapes' }, watermelon: { e: '🍉', n: 'Watermelon' }, lemon: { e: '🍋', n: 'Lemon' }
};
export const QS = [
  { id: 'yellow', q: 'Is it yellow?', s: 'Yellow?' },
  { id: 'long', q: 'Is it long?', s: 'Long?' },
  { id: 'big', q: 'Is it bigger than a football?', s: 'Bigger than a football?' },
  { id: 'bunch', q: 'Does it grow in bunches?', s: 'Grows in bunches?' },
  { id: 'round', q: 'Is it round?', s: 'Round?' },
  { id: 'orange', q: 'Is it orange in colour?', s: 'Orange in colour?' }
];
const QMAP = Object.fromEntries(QS.map(q => [q.id, q]));
// what the sorter knows about each fruit
export const FACTS = {
  apple: { yellow: 0, long: 0, big: 0, bunch: 0, round: 1, orange: 0 },
  banana: { yellow: 1, long: 1, big: 0, bunch: 1, round: 0, orange: 0 },
  orange: { yellow: 0, long: 0, big: 0, bunch: 0, round: 1, orange: 1 },
  grapes: { yellow: 0, long: 0, big: 0, bunch: 1, round: 1, orange: 0 },
  watermelon: { yellow: 0, long: 0, big: 1, bunch: 0, round: 1, orange: 0 },
  lemon: { yellow: 1, long: 0, big: 0, bunch: 0, round: 1, orange: 0 }
};
const TESTS = [
  ['apple', 'Apple from Shimla'], ['banana', 'Banana from Jalgaon'], ['orange', 'Nagpur orange'], ['grapes', 'Grapes from Nashik'],
  ['watermelon', 'Watermelon from the market'], ['lemon', 'Lemon for nimbu pani'], ['apple', 'Green apple'], ['banana', 'Small elaichi banana'],
  ['orange', 'Kinnow orange'], ['lemon', 'Big lemon']
];

export function classify(node, facts, path = []) {
  if (!node || (!node.q && !node.leaf)) return { leaf: null, path };
  if (node.leaf) return { leaf: node.leaf, path };
  const yes = !!facts[node.q];
  return classify(yes ? node.yes : node.no, facts, path.concat(`${QMAP[node.q].s} ${yes ? 'Yes' : 'No'}`));
}

const CSS = `
.lab-decision-tree > *{min-width:0;}
.lab-decision-tree .treewrap{overflow-x:auto; background:#fff; border:var(--b2); border-radius:12px; -webkit-overflow-scrolling:touch;}
.lab-decision-tree .treewrap svg{display:block; margin:0 auto;}
.lab-decision-tree .treewrap svg text{font-family:var(--body); font-weight:800;}
.lab-decision-tree .tnode{cursor:pointer;}
.lab-decision-tree .tnode:focus{outline:none;}
.lab-decision-tree .tnode:focus-visible rect{stroke:#2F6FED; stroke-width:4;}
.lab-decision-tree .grid3{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px;}
.lab-decision-tree .grid3 .btn{font-size:.9rem; padding:8px 8px; text-align:left; justify-content:flex-start;}
.lab-decision-tree .fruits{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px;}
.lab-decision-tree .fruits .btn{flex-direction:column; gap:0; font-size:.82rem; padding:6px 4px;}
.lab-decision-tree .fruits .btn .em{font-size:1.5rem; line-height:1.2;}
.lab-decision-tree .arrive{display:flex; flex-wrap:wrap; gap:6px; align-items:center;}
.lab-decision-tree .facts .tbl{font-size:.82rem;} .lab-decision-tree .facts .tbl th, .lab-decision-tree .facts .tbl td{padding:4px 6px; text-align:center;}
.lab-decision-tree .facts .tbl td:first-child{text-align:left;}
.lab-decision-tree .facts .tbl th{font-size:1.1rem;}
.lab-decision-tree .res .tbl{font-size:.86rem;} .lab-decision-tree .res .tbl td{padding:5px 8px;}
.lab-decision-tree .res tr.no td{background:var(--bad-wash);}
`;

const SLOT = 94, ROWH = 92;

export default {
  title: 'Decision Tree: build a rule-based fruit sorter',
  mount(ctx) {
    ctx.el.classList.add('lab-decision-tree');
    const tests = ctx.rng.shuffle(TESTS);
    let tree = valid(ctx.data.tree) ? ctx.data.tree : {};
    let sel = tree;       // selected node object
    let result = null, completed = false;
    const $ = s => ctx.el.querySelector(s);

    function valid(n, d = 0) {
      if (!n || typeof n !== 'object' || d > 7) return false;
      if (n.leaf) return !!FRUITS[n.leaf];
      if (n.q) return !!QMAP[n.q] && valid(n.yes, d + 1) && valid(n.no, d + 1);
      return true;
    }
    function save() { ctx.data.tree = tree; ctx.save(); }
    function walk(fn, n = tree, d = 0, path = []) { fn(n, d, path); if (n.q) { walk(fn, n.yes, d + 1, path.concat(n.q)); walk(fn, n.no, d + 1, path.concat(n.q)); } }
    const empties = () => { const out = []; const q = [tree]; while (q.length) { const n = q.shift(); if (n.q) q.push(n.yes, n.no); else if (!n.leaf) out.push(n); } return out; };
    function pathTo(target) { let res = null; walk((n, d, p) => { if (n === target) res = p; }); return res || []; }
    function parentInfo(target) {
      let info = null;
      walk(n => { if (n.q && n.yes === target) info = { p: n, a: 'Yes' }; if (n.q && n.no === target) info = { p: n, a: 'No' }; });
      return info;
    }
    // which of the 6 fruit types would arrive at a node
    function arrivals(target) {
      return Object.keys(FRUITS).filter(f => {
        let n = tree;
        while (n && n !== target && n.q) n = FACTS[f][n.q] ? n.yes : n.no;
        return n === target;
      });
    }

    function layout() {
      let slot = 0, depth = 0; const pos = new Map();
      (function place(n, d) {
        depth = Math.max(depth, d);
        if (n.q) { place(n.yes, d + 1); place(n.no, d + 1); pos.set(n, { x: (pos.get(n.yes).x + pos.get(n.no).x) / 2, y: d }); }
        else pos.set(n, { x: slot++ * SLOT + SLOT / 2, y: d });
      })(tree, 0);
      return { pos, slots: slot, depth };
    }

    function treeSVG() {
      const { pos, slots, depth } = layout();
      const W = Math.max(slots, 2) * SLOT, H = (depth + 1) * ROWH + 20, off = (W - slots * SLOT) / 2;
      const P = n => { const p = pos.get(n); return { x: p.x + off, y: p.y * ROWH + 42 }; };
      let edges = '', nodes = '', i = 0;
      const ids = new Map();
      walk(n => {
        const a = P(n);
        if (n.q) for (const [k, lab] of [['yes', 'Yes'], ['no', 'No']]) {
          const b = P(n[k]);
          edges += `<path d="M${a.x},${a.y + 24} C${a.x},${a.y + 56} ${b.x},${b.y - 56} ${b.x},${b.y - 26}" fill="none" stroke="#15171C" stroke-width="2.5"/>`;
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          edges += `<g><rect x="${mx - 17}" y="${my - 11}" width="34" height="20" rx="10" fill="${lab === 'Yes' ? '#D9F5E8' : '#FFE5E2'}" stroke="#15171C" stroke-width="1.5"/><text x="${mx}" y="${my + 4}" text-anchor="middle" font-size="12">${lab}</text></g>`;
        }
      });
      walk(n => {
        const a = P(n), id = i++, on = n === sel; ids.set(n, id);
        const stroke = on ? '#2F6FED' : '#15171C', sw = on ? 4.5 : 2.5;
        let body;
        if (n.q) {
          const words = QMAP[n.q].s.split(' '), lines = [];
          words.forEach(w => { const l = lines[lines.length - 1]; if (l && (l + ' ' + w).length <= 11) lines[lines.length - 1] = l + ' ' + w; else lines.push(w); });
          const h = 22 + lines.length * 15;
          body = `<rect x="${a.x - 44}" y="${a.y - h / 2}" width="88" height="${h}" rx="10" fill="#FFF1C2" stroke="${stroke}" stroke-width="${sw}"/>` +
            lines.map((l, k) => `<text x="${a.x}" y="${a.y - (lines.length - 1) * 7.5 + k * 15 + 5}" text-anchor="middle" font-size="13">${esc(l)}</text>`).join('');
        } else if (n.leaf) {
          body = `<rect x="${a.x - 38}" y="${a.y - 26}" width="76" height="52" rx="12" fill="#D9F5E8" stroke="${stroke}" stroke-width="${sw}"/><text x="${a.x}" y="${a.y + 2}" text-anchor="middle" font-size="22">${FRUITS[n.leaf].e}</text><text x="${a.x}" y="${a.y + 19}" text-anchor="middle" font-size="11">${FRUITS[n.leaf].n}</text>`;
        } else {
          body = `<rect x="${a.x - 38}" y="${a.y - 24}" width="76" height="48" rx="12" fill="${on ? '#E4ECFF' : '#fff'}" stroke="${stroke}" stroke-width="${sw}" stroke-dasharray="6 5"/><text x="${a.x}" y="${a.y + 6}" text-anchor="middle" font-size="20" fill="#8A8F99">?</text>`;
        }
        const desc = n.q ? QMAP[n.q].q : n.leaf ? 'Leaf: ' + FRUITS[n.leaf].n : 'Empty slot';
        nodes += `<g class="tnode" data-node="${id}" tabindex="0" role="button" aria-label="${esc(desc)}${on ? ' (selected)' : ''}">${body}</g>`;
      });
      return { svg: `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="width:100%; max-width:${Math.round(W * 1.45)}px; min-width:${Math.round(Math.min(W * 0.9, Math.max(280, W * 0.9)))}px" role="group" aria-label="Your decision tree">${edges}${nodes}</svg>`, ids };
    }

    function render() {
      const y = window.scrollY;
      const { svg, ids } = treeSVG();
      const nEmpty = empties().length;
      const path = pathTo(sel), pi = parentInfo(sel), arr = arrivals(sel);
      const where = sel === tree ? 'Root node — the first question' : `The <b>${pi.a}</b> branch of “${esc(QMAP[pi.p.q].q)}”`;
      ctx.el.innerHTML = `<style>${CSS}</style>
        <p class="lab-intro">You are the programmer. Build a <b>decision tree</b> that sorts six fruits by asking yes/no questions. Tap a node in the tree, then choose a question for it — or decide which fruit it is.</p>
        <div class="banner" style="flex-wrap:wrap"><span class="chip gold">Goal</span><span>Build a tree that sorts <b>all 10 test fruits</b> correctly.</span></div>
        <div class="lab-box"><div class="row between mb"><h4 style="margin:0">Your tree</h4><span class="chip ${nEmpty ? 'dim' : 'ok'}">${nEmpty ? `${nEmpty} empty node${nEmpty > 1 ? 's' : ''}` : '✓ complete'}</span></div>
            <div class="treewrap" id="dtTree">${svg}</div>
            <div class="row mt"><button class="btn sm" id="dtReset">${ic('refresh')} Start over</button><span class="tiny muted">Tap any node to select it. On a phone, swipe the tree sideways to see all of it.</span></div></div>
        <div class="lab-grid">
          <div class="lab-box stack" style="gap:12px" id="dtEdit">
            <div><div class="tiny muted" style="font-weight:800">SELECTED NODE</div><p style="font-weight:700">${where}</p>
              <div class="arrive small mt"><span class="muted" style="font-weight:800">Fruits that reach here:</span>${arr.length ? arr.map(f => `<span class="chip">${FRUITS[f].e} ${FRUITS[f].n}</span>`).join('') : '<span class="chip dim">none</span>'}</div>
              ${!sel.q && arr.length > 1 ? '<p class="tiny muted mt">More than one fruit arrives here — ask another question to split them.</p>' : ''}
              ${!sel.q && arr.length === 1 && !sel.leaf ? `<p class="tiny muted mt">Only ${FRUITS[arr[0]].n} arrives here — make this a leaf!</p>` : ''}</div>
            <div><h4>Ask a question</h4><div class="grid3">${QS.map(q => `<button class="btn sm" data-q="${q.id}" aria-pressed="${sel.q === q.id}" ${path.includes(q.id) ? 'disabled title="Already asked on this path"' : ''}>${esc(q.q)}</button>`).join('')}</div></div>
            <div><h4>…or make it a leaf (final answer)</h4><div class="fruits">${Object.entries(FRUITS).map(([k, f]) => `<button class="btn sm" data-leaf="${k}" aria-pressed="${sel.leaf === k}"><span class="em" aria-hidden="true">${f.e}</span>${f.n}</button>`).join('')}</div></div>
            ${sel.q || sel.leaf ? `<button class="btn sm ghost" id="dtClear">${ic('x')} Clear this node${sel.q ? ' and its branches' : ''}</button>` : ''}
          </div>
        <div class="lab-box facts"><h4>What the sorter knows about each fruit</h4>
          <div class="tblwrap mt"><table class="tbl"><thead><tr><th style="font-size:.8rem">Question</th>${Object.values(FRUITS).map(f => `<th title="${f.n}">${f.e}</th>`).join('')}</tr></thead><tbody>
          ${QS.map(q => `<tr><td>${esc(q.q)}</td>${Object.keys(FRUITS).map(f => `<td>${FACTS[f][q.id] ? '✓' : '✗'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
          <p class="tiny muted mt">✓ = yes, ✗ = no. Your questions use these facts.</p></div>
        </div>
        <div class="lab-box res"><div class="row between"><h4 style="margin:0">Test your sorter on 10 fruits</h4><button class="btn ${nEmpty ? '' : 'primary'}" id="dtRun" ${nEmpty ? 'disabled' : ''}>${ic('play')} Run the test</button></div>
          ${nEmpty ? '<p class="small muted mt">Fill every empty node first.</p>' : ''}
          <div id="dtRes" aria-live="polite">${result ? resultHTML() : ''}</div></div>
        <div id="dtDone">${doneHTML()}</div>`;
      // node clicks
      const byId = new Map([...ids].map(([n, id]) => [String(id), n]));
      ctx.el.querySelectorAll('[data-node]').forEach(g => {
        const go = () => { sel = byId.get(g.dataset.node); ctx.sfx('tick'); render(); if (innerWidth < 760) $('#dtEdit').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
        g.addEventListener('click', go);
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
      ctx.el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { if (sel.q !== b.dataset.q) { delete sel.leaf; sel.q = b.dataset.q; sel.yes = {}; sel.no = {}; } changed(true); });
      ctx.el.querySelectorAll('[data-leaf]').forEach(b => b.onclick = () => { delete sel.q; delete sel.yes; delete sel.no; sel.leaf = b.dataset.leaf; changed(true); });
      const cl = $('#dtClear'); if (cl) cl.onclick = () => { Object.keys(sel).forEach(k => delete sel[k]); changed(false); };
      $('#dtReset').onclick = () => { tree = {}; sel = tree; result = null; save(); render(); };
      $('#dtRun').onclick = run;
      window.scrollTo(0, y);
    }

    function changed(advance) {
      result = null; ctx.sfx('pop'); save();
      if (advance) { const e = empties(); if (e.length) sel = e[0]; }
      render();
    }

    function run() {
      result = tests.map(([f, label]) => { const r = classify(tree, FACTS[f]); return { f, label, got: r.leaf, path: r.path, ok: r.leaf === f }; });
      const right = result.filter(r => r.ok).length;
      ctx.sfx(right === tests.length ? 'win' : 'bad');
      render();
      $('#dtRes').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (right === tests.length) {
        ctx.data.solved = true; ctx.save();
        if (!completed && !ctx.done) { completed = true; ctx.complete('Built a decision tree that sorts all 10 test fruits correctly.'); }
      }
    }

    function resultHTML() {
      const right = result.filter(r => r.ok).length, pct = Math.round(right / result.length * 100);
      return `<div class="row mt" style="gap:12px"><b style="font-family:var(--head);font-size:1.4rem">Accuracy: ${pct}%</b><span class="small muted">(${right} of ${result.length} correct)</span></div>
        <div class="meter mt" aria-hidden="true"><i style="width:${pct}%;background:${pct === 100 ? 'var(--good)' : 'var(--gold)'}"></i></div>
        <div class="tblwrap mt"><table class="tbl"><thead><tr><th>Test fruit · path through your tree</th><th>Tree says</th></tr></thead><tbody>
        ${result.map(r => `<tr class="${r.ok ? '' : 'no'}"><td><b>${FRUITS[r.f].e} ${esc(r.label)}</b><div class="tiny muted">${r.path.map(esc).join(' → ') || '—'}</div></td><td style="white-space:nowrap">${r.ok ? '✓' : '✗'} ${r.got ? FRUITS[r.got].e + ' ' + FRUITS[r.got].n : '—'}</td></tr>`).join('')}</tbody></table></div>
        ${right < result.length ? '<p class="small mt" style="font-weight:700">Some fruits went to the wrong leaf. Tap a node in your tree and check “Fruits that reach here”, then fix it and run the test again.</p>' : ''}`;
    }

    function doneHTML() {
      const ok = result && result.every(r => r.ok);
      if (!ok && !ctx.done) return '';
      return `<div class="lab-done">${ic('check')}<div>${ok ? 'All 10 fruits sorted correctly! ' : 'Goal already met earlier — build another tree if you like. '}You wrote the rules yourself: this is a <b>rule-based model</b>. A decision tree starts at the <b>root node</b> (first question), follows <b>branches</b> (yes/no answers) and ends at <b>leaf nodes</b> (the final decision). It can't learn on its own — if a new fruit appears, a person must change the rules.</div></div>`;
    }

    render();
    return () => { ctx.el.classList.remove('lab-decision-tree'); };
  }
};
