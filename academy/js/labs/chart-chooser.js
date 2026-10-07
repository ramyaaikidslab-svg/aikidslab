import { esc, ic } from '../core/util.js';
import * as chart from '../core/charts.js';

// Pick the right chart for the question. Renders the learner's choice with charts.js.

const TYPES = [
  { id: 'bar', name: 'Bar', icon: '<rect x="3" y="11" width="4" height="9" rx="1"/><rect x="10" y="5" width="4" height="15" rx="1"/><rect x="17" y="8" width="4" height="12" rx="1"/>' },
  { id: 'line', name: 'Line', icon: '<path d="M3 18l5-6 4 3 8-10"/>' },
  { id: 'pie', name: 'Pie', icon: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6 6"/>' },
  { id: 'scatter', name: 'Scatter', icon: '<circle cx="6" cy="17" r="1.6"/><circle cx="10" cy="13" r="1.6"/><circle cx="13" cy="14" r="1.6"/><circle cx="16" cy="9" r="1.6"/><circle cx="19" cy="6" r="1.6"/>' },
  { id: 'histogram', name: 'Histogram', icon: '<path d="M3 20V14h4v-5h4V5h4v7h4v8z"/>' }
];
const TNAME = Object.fromEntries(TYPES.map(t => [t.id, t.name]));
export const BEST = { cat: 'bar', time: 'line', parts: 'pie', rel: 'scatter', dist: 'histogram' };
const KIND = { cat: 'Compare categories', time: 'Change over time', parts: 'Parts of a whole', rel: 'Relationship between two numbers', dist: 'Distribution (spread) of one set of numbers' };

const r1 = (rng, lo, hi) => rng.int(lo, hi);
function spread(rng, n, lo, hi) { // bell-ish values, forced to touch lo and hi so histogram bins are whole numbers
  const v = Array.from({ length: n }, () => Math.round(lo + (hi - lo) * ((rng() + rng() + rng()) / 3)));
  v[0] = lo; v[1] = hi; return rng.shuffle(v);
}

export const BANK = [
  { kind: 'cat', q: 'Sports Day: which house scored the most points?', build: rng => ({ labels: ['Red', 'Blue', 'Green', 'Yellow'], values: [r1(rng, 40, 95), r1(rng, 40, 95), r1(rng, 40, 95), r1(rng, 40, 95)], unit: 'points' }) },
  { kind: 'cat', q: 'Which fruit do the students of Class 9B like most?', build: rng => ({ labels: ['Mango', 'Banana', 'Apple', 'Grapes', 'Guava'], values: [r1(rng, 8, 15), r1(rng, 3, 9), r1(rng, 3, 9), r1(rng, 2, 7), r1(rng, 2, 6)], unit: 'students' }) },
  { kind: 'cat', q: 'Which city got the most rain in July?', build: rng => ({ labels: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Jaipur'], values: [r1(rng, 700, 900), r1(rng, 180, 240), r1(rng, 80, 120), r1(rng, 300, 380), r1(rng, 150, 230)], unit: 'mm of rain' }) },
  { kind: 'time', q: 'How did the number of library books borrowed change from April to September?', build: rng => { const b = r1(rng, 60, 90); return { labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], values: [b, Math.round(b * 0.4), Math.round(b * 0.3), b + r1(rng, 10, 30), b + r1(rng, 30, 50), b + r1(rng, 45, 70)], unit: 'books borrowed' }; } },
  { kind: 'time', q: "How did Delhi's average temperature change over the year?", build: rng => ({ labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [14, 17, 23, 29, 33, 34, 31, 30, 29, 25, 19, 15].map(v => v + r1(rng, -1, 1)), unit: '°C' }) },
  { kind: 'time', q: "How has our school's electricity bill changed since solar panels were installed in March?", build: rng => { const b = r1(rng, 46, 54); return { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], values: [b, b + 1, b - 2, b - 14, b - 20, b - 22, b - 23, b - 24].map(v => v + r1(rng, -1, 1)), unit: '₹ thousand' }; } },
  { kind: 'parts', q: 'How does Riya split her ₹500 monthly pocket money?', build: rng => { const f = r1(rng, 12, 16) * 10, t = r1(rng, 6, 9) * 10, s = r1(rng, 8, 12) * 10, bk = r1(rng, 4, 6) * 10; return { labels: ['Food', 'Travel', 'Savings', 'Books', 'Fun'], values: [f, t, s, bk, 500 - f - t - s - bk], unit: '₹' }; } },
  { kind: 'parts', q: "What share of the school's weekly waste is plastic, paper, food and other?", build: rng => ({ labels: ['Plastic', 'Paper', 'Food', 'Other'], values: [r1(rng, 20, 35), r1(rng, 25, 40), r1(rng, 15, 30), r1(rng, 5, 12)], unit: 'kg' }) },
  { kind: 'rel', q: 'Do students who sleep more score higher in tests?', build: rng => ({ pts: Array.from({ length: 16 }, () => { const x = r1(rng, 8, 20) / 2; return [x, Math.max(10, Math.min(98, Math.round(8 * x + r1(rng, -10, 10))))]; }), xname: 'hours of sleep', yname: 'test marks' }) },
  { kind: 'rel', q: 'Do students who practise typing for more hours make fewer typing errors?', build: rng => ({ pts: Array.from({ length: 16 }, () => { const x = r1(rng, 0, 20) / 2; return [x, Math.max(1, Math.round(42 - 3.6 * x + r1(rng, -4, 4)))]; }), xname: 'hours of practice', yname: 'errors per page' }) },
  { kind: 'dist', q: 'How are the heights of 30 Class 9 students spread out?', build: rng => ({ values: spread(rng, 30, 140, 176), bins: 6, unit: 'height (cm)' }) },
  { kind: 'dist', q: 'How many minutes do 40 students take to reach school?', build: rng => ({ values: spread(rng, 40, 5, 53), bins: 6, unit: 'minutes to reach school' }) }
];

function why(kind, t, d) {
  const xn = d.xname || '', yn = d.yname || '';
  const T = {
    cat: { bar: 'Bars make categories easy to compare — the tallest bar is the biggest.', line: 'A line suggests change over time, but these categories have no order. Joining them up is misleading.', pie: 'A pie shows shares of one whole. Slices of similar size are hard to compare — and the question asks which is biggest. Bars are clearer.', scatter: 'A scatter plot needs two numbers for every item. Here each item has a name and only one number.', histogram: 'A histogram groups numbers into ranges and counts them — the category names disappear, so you cannot tell which is biggest.' },
    time: { line: 'A line shows change over time — you can follow it rising and falling month by month.', bar: 'Bars can show each month, but the rise and fall over time is clearer with a line joining the points.', pie: 'Months are not parts of one whole. A pie of months hides how things change over time.', scatter: 'A scatter plot is for the relationship between two measured numbers. Here one of them is just time — a line shows change over time better.', histogram: 'A histogram throws away the order of the months, so you cannot see the change over time.' },
    parts: { pie: 'A pie shows parts of a whole — each slice is a share of the total (100%).', bar: 'Bars can compare the amounts, but they do not show that together they make one whole.', line: 'There is no time order here — a line joining the items is misleading.', scatter: 'A scatter plot needs two numbers for every item. Here each item has a name and only one number.', histogram: 'A histogram counts how many values fall in each range — it loses which item is which, and the whole.' },
    rel: { scatter: `A scatter plot shows the relationship between two numbers. Each dot is one student: if the dots slope up or down, ${xn} and ${yn} are related.`, bar: `One bar per student shows only ${yn} — you cannot see how ${xn} and ${yn} move together.`, line: 'Joining the dots makes it look like a timeline. For two measured numbers, plain dots (a scatter plot) are better.', pie: 'These are pairs of numbers, not parts of a whole. A pie cannot show them.', histogram: `A histogram shows only one set of numbers, so the link between ${xn} and ${yn} is lost.` },
    dist: { histogram: 'A histogram shows how one set of numbers is spread out — how many values fall in each range, and where most of them are.', bar: 'One bar per student gives lots of thin bars — the overall spread is hard to see. A histogram groups them into ranges.', line: 'Joining the values in the order they were collected makes a zig-zag that means nothing.', pie: 'These are separate measurements, not parts of one whole. A pie cannot show them.', scatter: 'A scatter plot needs two numbers per student; here there is only one.' }
  };
  return T[kind][t];
}
const CANT = { cat: ['scatter'], time: ['scatter'], parts: ['scatter'], rel: ['pie', 'histogram'], dist: ['pie', 'scatter'] };

function renderChart(sc, t, narrow) {
  const d = sc.d, W = narrow ? 340 : 560, H = narrow ? 260 : 300, title = '';
  if (CANT[sc.kind].includes(t)) return `<div class="cc-cant">${ic('alert', 'lg')}<b>This chart can't show this data</b><span class="small">${esc(why(sc.kind, t, d))}</span></div>`;
  if (sc.kind === 'rel') {
    const pts = d.pts.slice().sort((a, b) => a[0] - b[0]);
    if (t === 'scatter') return chart.scatter(d.pts, { W, H, title, xlabel: d.xname, ylabel: d.yname });
    if (t === 'bar') return chart.bar(pts.map((_, i) => 'S' + (i + 1)), pts.map(p => p[1]), { W, H, ylabel: d.yname });
    if (t === 'line') return chart.line(pts.map(p => String(p[0])), [pts.map(p => p[1])], { W, H, ylabel: d.yname });
  }
  if (sc.kind === 'dist') {
    if (t === 'histogram') return chart.histogram(d.values, d.bins, { W, H, xlabel: d.unit });
    if (t === 'bar') return chart.bar(d.values.map(() => ''), d.values, { W, H, ylabel: d.unit });
    if (t === 'line') return chart.line(d.values.map((_, i) => String(i + 1)), [d.values], { W, H, ylabel: d.unit });
  }
  if (t === 'bar') return chart.bar(d.labels, d.values, { W, H, ylabel: d.unit });
  if (t === 'line') return chart.line(d.labels, [d.values], { W, H, ylabel: d.unit });
  if (t === 'pie') return pieFit(chart.pie(d.labels, d.values, { W: 560, H: 300 }), d.labels.length, narrow);
  if (t === 'histogram') return chart.histogram(d.values, 4, { W, H, xlabel: d.unit });
  return '';
}
// charts.pie puts its legend to the right; on narrow screens move it below the pie so text stays readable
function pieFit(svg, n, narrow) {
  if (!narrow) return svg;
  const box = document.createElement('div'); box.innerHTML = svg;
  const s = box.firstElementChild;
  let i = 0;
  s.querySelectorAll('rect').forEach(r => { if (r.getAttribute('x') === '300') { r.setAttribute('x', '40'); r.setAttribute('y', 300 + i * 26); i++; } });
  i = 0;
  s.querySelectorAll('text').forEach(tx => { if (tx.getAttribute('x') === '322') { tx.setAttribute('x', '62'); tx.setAttribute('y', 312 + i * 26); tx.style.fontSize = '15px'; i++; } });
  s.setAttribute('viewBox', `0 20 300 ${290 + n * 26}`);
  return s.outerHTML;
}

function dataPreview(sc) {
  const d = sc.d;
  if (d.labels) return `<div class="tblwrap"><table class="tbl"><thead><tr><th></th>${d.labels.map(l => `<th>${esc(l)}</th>`).join('')}</tr></thead><tbody><tr><td><b>${esc(d.unit)}</b></td>${d.values.map(v => `<td>${v}</td>`).join('')}</tr></tbody></table></div>`;
  if (d.pts) return `<div class="tblwrap"><table class="tbl"><thead><tr><th>Student</th>${d.pts.slice(0, 6).map((_, i) => `<th>S${i + 1}</th>`).join('')}<th>…</th></tr></thead><tbody>
    <tr><td><b>${esc(d.xname)}</b></td>${d.pts.slice(0, 6).map(p => `<td>${p[0]}</td>`).join('')}<td>…</td></tr><tr><td><b>${esc(d.yname)}</b></td>${d.pts.slice(0, 6).map(p => `<td>${p[1]}</td>`).join('')}<td>…</td></tr></tbody></table></div><p class="tiny muted mt">${d.pts.length} students, two numbers each.</p>`;
  return `<p class="small"><b>${esc(d.unit)}:</b> ${d.values.slice(0, 12).join(', ')}, … <span class="muted">(${d.values.length} values in all)</span></p>`;
}

const CSS = `
.lab-chart-chooser .types{display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:8px;}
@media (max-width:560px){ .lab-chart-chooser .types{grid-template-columns:repeat(3,minmax(0,1fr));} }
.lab-chart-chooser .types .btn{flex-direction:column; gap:2px; padding:8px 4px; font-size:.86rem;}
.lab-chart-chooser .types .btn .ic{width:26px; height:26px;}
.lab-chart-chooser .types .btn[aria-pressed="true"]{background:var(--gold);}
.lab-chart-chooser .types .btn.good{background:var(--good-wash); color:var(--ink); border-color:var(--good);}
.lab-chart-chooser .cc-chart{min-height:200px;}
.lab-chart-chooser .cc-chart .svgchart{max-width:640px; margin:0 auto;}
.lab-chart-chooser .cc-cant{display:grid; gap:8px; justify-items:center; align-content:center; min-height:230px; text-align:center; padding:30px 16px; border:2px dashed var(--faint); border-radius:12px; background:#fff; color:var(--muted);}
.lab-chart-chooser .cc-cant b{color:var(--ink);}
.lab-chart-chooser .q{font-family:var(--head); font-weight:800; font-size:1.25rem; line-height:1.25;}
.lab-chart-chooser .tbl{font-size:.85rem;} .lab-chart-chooser .tbl th, .lab-chart-chooser .tbl td{padding:4px 8px;}
`;

export default {
  title: 'Chart Chooser: the right chart for the question',
  mount(ctx) {
    ctx.el.classList.add('lab-chart-chooser');
    const rng = ctx.rng;
    let set = [], idx = 0, pick = null, finals = [], completed = false, tries = 0;
    let narrow = false;

    function newSet() {
      const kinds = Object.keys(BEST);
      const chosen = kinds.map(k => rng.pick(BANK.filter(b => b.kind === k)));
      chosen.push(rng.pick(BANK.filter(b => !chosen.includes(b))));
      set = rng.shuffle(chosen).map(b => ({ kind: b.kind, q: b.q, d: b.build(rng) }));
      idx = 0; pick = null; finals = []; tries++;
    }

    function render() {
      const y = window.scrollY;
      const done = idx >= set.length;
      ctx.el.innerHTML = `<style>${CSS}</style>
        <p class="lab-intro">Data exploration starts with the right picture. For each question, choose the chart that answers it best. Your choice is drawn instantly — switch as often as you like, then lock in your <b>final choice</b>.</p>
        <div class="banner" style="flex-wrap:wrap"><span class="chip gold">Goal</span><span>Answer <b>6 questions</b> with at least <b>5 correct</b> final choices.</span></div>
        <div class="qcount"><span>${done ? 'Finished' : `Question ${idx + 1} of ${set.length}`}</span><span class="dots">${set.map((_, i) => `<i class="${i < finals.length ? (finals[i].ok ? 'ok' : 'no') : i === idx ? 'now' : ''}"></i>`).join('')}</span></div>
        ${done ? endHTML() : qHTML(set[idx])}`;
      wire();
      window.scrollTo(0, y);
    }

    function qHTML(sc) {
      const ok = pick && pick === BEST[sc.kind];
      return `<div class="lab-box stack" style="gap:12px">
          <p class="q">${esc(sc.q)}</p>
          <details><summary class="small" style="font-weight:800;cursor:pointer">See the data</summary><div class="mt">${dataPreview(sc)}</div></details>
          <div><div class="tiny muted" style="font-weight:800;margin-bottom:6px">CHOOSE A CHART</div>
          <div class="types" role="group" aria-label="Chart type">${TYPES.map(t => `<button class="btn" data-t="${t.id}" aria-pressed="${pick === t.id}"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${t.icon}</svg>${t.name}</button>`).join('')}</div></div>
          <div class="cc-chart" id="ccChart">${pick ? renderChart(sc, pick, narrow) : '<div class="cc-cant">Pick a chart type to draw the data.</div>'}</div>
          ${pick ? `<div class="fb ${ok ? 'good' : 'bad'}" aria-live="polite"><div class="h">${ic(ok ? 'check' : 'x')} ${ok ? `${TNAME[pick]} chart works!` : `${TNAME[pick]} chart doesn't fit this question`}</div><div>${esc(why(sc.kind, pick, sc.d))}</div>${ok ? `<div class="small muted">Question type: <b>${KIND[sc.kind]}</b>.</div>` : '<div class="small muted">Try another chart type.</div>'}</div>` : ''}
          <div class="row"><button class="btn ${ok ? 'primary' : ''}" id="ccNext" ${pick ? '' : 'disabled'}>Lock in ${pick ? TNAME[pick] : 'choice'} ${ic('arrow')}</button></div>
        </div>`;
    }

    function endHTML() {
      const right = finals.filter(f => f.ok).length, pass = right >= 5;
      return `<div class="lab-box"><h4>Your results: ${right} / ${set.length} correct</h4>
        <div class="tblwrap mt"><table class="tbl"><thead><tr><th>Question</th><th>Your chart</th><th>Best chart</th></tr></thead><tbody>
        ${set.map((sc, i) => `<tr><td>${esc(sc.q)}</td><td>${finals[i].ok ? '✓' : '✗'} ${TNAME[finals[i].t]}</td><td>${TNAME[BEST[sc.kind]]}</td></tr>`).join('')}</tbody></table></div>
        ${pass ? '' : `<p class="mt" style="font-weight:700">You need 5 correct. Try a fresh set of questions!</p>`}
        <div class="row mt"><button class="btn ${pass ? '' : 'primary'}" id="ccAgain">${ic('refresh')} ${pass ? 'Play a new set' : 'Try a new set'}</button></div></div>
        ${pass || ctx.done ? `<div class="lab-done">${ic('check')}<div>${pass ? '' : 'Goal already met earlier. '}This is <b>Data Exploration</b>: visualising data helps us spot trends, patterns, relationships and outliers quickly. <b>Bar</b> → compare categories · <b>Line</b> → change over time · <b>Pie</b> → parts of a whole · <b>Scatter</b> → relationship between two numbers · <b>Histogram</b> → distribution.</div></div>` : ''}`;
    }

    function wire() {
      ctx.el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
        pick = b.dataset.t; ctx.sfx(pick === BEST[set[idx].kind] ? 'ok' : 'tick'); render();
      });
      const nx = ctx.el.querySelector('#ccNext');
      if (nx) nx.onclick = () => {
        finals.push({ t: pick, ok: pick === BEST[set[idx].kind] });
        idx++; pick = null;
        render();
        if (idx >= set.length) finish();
      };
      const ag = ctx.el.querySelector('#ccAgain');
      if (ag) ag.onclick = () => { newSet(); render(); };
    }

    function finish() {
      const right = finals.filter(f => f.ok).length;
      ctx.data.best = Math.max(ctx.data.best || 0, right); ctx.save();
      if (right >= 5) {
        ctx.sfx('win');
        if (!completed && !ctx.done) { completed = true; ctx.complete(`Chose the right chart for ${right} of 6 data questions.`); }
      } else ctx.sfx('bad');
    }

    const measure = () => { const w = ctx.el.clientWidth; const n = w < 520; if (n !== narrow) { narrow = n; if (pick) { const c = ctx.el.querySelector('#ccChart'); if (c && idx < set.length) c.innerHTML = renderChart(set[idx], pick, narrow); } } };
    narrow = ctx.el.clientWidth < 520;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(ctx.el);
    newSet(); tries = 0;
    render();
    return () => { if (ro) ro.disconnect(); ctx.el.classList.remove('lab-chart-chooser'); };
  }
};
