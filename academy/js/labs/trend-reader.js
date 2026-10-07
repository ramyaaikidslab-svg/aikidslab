import { ic, esc } from '../core/util.js';

const TR = { up: 'Upward (rising)', down: 'Downward (falling)', seasonal: 'Seasonal (repeats every year)', stable: 'Stable (stays about the same)' };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function niceStep(max) { const raw = max / 5, p = 10 ** Math.floor(Math.log10(raw)), n = raw / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }

// ---------- seeded chart data (exported for tests) ----------
export function makeCharts(rng) {
  const out = [];
  { // attendance — stable
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], c = rng.int(92, 95);
    const values = labels.map(() => c + rng.int(-1, 1));
    out.push({ id: 'att', title: 'Class 9 attendance by month', unit: '%', ylab: 'Attendance (%)', labels, values, trend: 'stable', next: 'Apr', w: 4, cap: 100,
      ask: l => `What was the attendance in ${l}?`, why: 'It wiggles a little but stays around the same level month after month.' });
  }
  { // AC sales — seasonal, 2 years
    const base = [30, 40, 90, 150, 180, 140, 70, 50, 45, 35, 25, 20], k = 0.9 + rng.int(0, 3) / 10;
    const labels = [], values = [];
    [23, 24].forEach((y, yi) => base.forEach((b, m) => { labels.push(`${MON[m]} ${y}`); values.push(Math.round(b * k * (1 + yi * 0.1) + rng.int(-6, 6))); }));
    out.push({ id: 'ac', title: 'AC sales at an electronics shop', unit: ' ACs', ylab: 'ACs sold', labels, values, trend: 'seasonal', next: 'Jan 25', w: 40, predict: (values[0] + values[12]) / 2 * 1.05,
      ask: l => `How many ACs were sold in ${l}?`, why: 'Sales shoot up every summer (April–June) and drop every winter — the same shape repeats each year.' });
  }
  { // mobile data — upward
    const labels = Array.from({ length: 9 }, (_, i) => String(2016 + i)), values = [rng.int(1, 3)];
    for (let i = 1; i < 9; i++) values.push(values[i - 1] + rng.int(2, 4));
    out.push({ id: 'data', title: 'Mobile data used per person', unit: ' GB', ylab: 'GB per month', labels, values, trend: 'up', next: '2025', w: 6,
      ask: l => `How much data did a person use per month in ${l}?`, why: 'Every year the value is higher than the year before.' });
  }
  { // computer lab electricity — stable
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], c = rng.int(40, 44);
    const values = labels.map(() => c + rng.int(-2, 2));
    out.push({ id: 'elec', title: 'Electricity used by the computer lab', unit: ' kWh', ylab: 'kWh per day', labels, values, trend: 'stable', next: 'next Mon', w: 6,
      ask: (l, i) => `How much electricity was used on ${l} (day ${i + 1})?`, why: 'The readings stay in a narrow band — no rise, no fall, no repeating season.' });
  }
  { // landlines — downward
    const labels = Array.from({ length: 10 }, (_, i) => String(2015 + i)), values = [rng.int(48, 56)];
    for (let i = 1; i < 10; i++) values.push(values[i - 1] - rng.int(2, 4));
    out.push({ id: 'land', title: 'Landline phones in a town', unit: ' thousand', ylab: 'Landlines (thousands)', labels, values, trend: 'down', next: '2025', w: 6,
      ask: l => `How many landlines (in thousands) were there in ${l}?`, why: 'Each year there are fewer landlines than the year before, as people switch to mobiles.' });
  }
  return rng.shuffle(out).map(c => finish(c, rng));
}

function finish(c, rng) {
  const v = c.values, n = v.length;
  // model prediction for the next point
  let p = c.predict;
  if (p === undefined) {
    if (c.trend === 'stable') p = v.reduce((a, b) => a + b, 0) / n;
    else { const d = (v[n - 1] - v[0]) / (n - 1); p = v[n - 1] + d; }
  }
  const w = c.w;
  // ranges with boundaries on multiples of w/2 so p sits in the middle half of its range
  let b = Math.floor(p / w) * w;
  if (p - b < w / 4 || p - b > 3 * w / 4) b = Math.floor((p - w / 2) / w) * w + w / 2;
  let pos = rng.int(1, 2);
  while (b - pos * w < 0) pos--;
  if (c.cap) while (b + (4 - pos) * w > c.cap + w && pos < 3) pos++;
  const ranges = Array.from({ length: 4 }, (_, i) => [b + (i - pos) * w, b + (i - pos + 1) * w]);
  const actual = Math.min(b + 0.75 * w, Math.max(b + 0.25 * w, Math.round(p)));
  const top = Math.max(...v, actual, ranges[3][1] * 0) * 1.12;
  const step = c.cap ? 20 : niceStep(top), yMax = c.cap ? 100 : Math.ceil(top / step) * step;
  const every = Math.ceil(n / 8), labelled = v.map((_, i) => i).filter(i => i % every === 0);
  const ai = rng.pick(labelled.filter(i => i > 0)), av = v[ai], s = step / 2;
  const ks = rng.shuffle([-3, -2, -1, 1, 2, 3].filter(k => av + k * s >= 0 && av + k * s <= yMax)).sort((x, y) => Math.abs(x) - Math.abs(y)).slice(0, 3);
  const readOpts = rng.shuffle([av, ...ks.map(k => av + k * s)]);
  return { ...c, p, ranges, rangeAns: pos, actual, yMax, step, every, ai, readOpts, readAns: readOpts.indexOf(av) };
}

function chartSVG(c, reveal) {
  const W = 400, H = 240, L = 44, B = 34, T = 16, R = 14, n = c.labels.length + 1;
  const x = i => L + 8 + i * (W - L - R - 16) / (n - 1), y = v => H - B - v / c.yMax * (H - B - T);
  let g = '';
  for (let t = 0; t <= c.yMax + 1e-9; t += c.step) g += `<line x1="${L}" y1="${y(t)}" x2="${W - R}" y2="${y(t)}" stroke="#E6DFCF"/><text x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${+t.toFixed(2)}</text>`;
  for (let t = c.step / 2; t < c.yMax; t += c.step) g += `<line x1="${L}" y1="${y(t)}" x2="${W - R}" y2="${y(t)}" stroke="#F1ECE0" stroke-dasharray="3 4"/>`;
  g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#15171C" stroke-width="2"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#15171C" stroke-width="2"/>`;
  c.labels.forEach((lb, i) => { if (i % c.every === 0) g += `<text x="${x(i)}" y="${H - B + 16}" text-anchor="middle">${esc(lb)}</text>`; });
  g += `<text x="${x(n - 1)}" y="${H - B + 16}" text-anchor="middle" style="fill:#87620F">${esc(c.next)}</text>`;
  g += `<rect x="${x(n - 1) - 12}" y="${T}" width="24" height="${H - B - T}" fill="#FFF1C2" opacity=".7"/>`;
  g += `<polyline points="${c.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="#2F6FED" stroke-width="3" stroke-linejoin="round"/>`;
  c.values.forEach((v, i) => { g += `<circle cx="${x(i)}" cy="${y(v)}" r="${i === c.ai ? 5 : 3.5}" fill="${i === c.ai ? '#FFC800' : '#fff'}" stroke="${i === c.ai ? '#15171C' : '#2F6FED'}" stroke-width="2"/>`; });
  if (reveal) {
    g += `<line x1="${x(n - 2)}" y1="${y(c.values[n - 2])}" x2="${x(n - 1)}" y2="${y(c.actual)}" stroke="#DFA426" stroke-width="3" stroke-dasharray="6 4"/><circle cx="${x(n - 1)}" cy="${y(c.actual)}" r="6" fill="#FFC800" stroke="#15171C" stroke-width="2"/>`;
    g += `<text x="${x(n - 1) - 10}" y="${y(c.actual) - 10}" text-anchor="end" style="font-weight:800">${+c.actual.toFixed(1)}</text>`;
  } else g += `<text x="${x(n - 1)}" y="${T + 18}" text-anchor="middle" style="font-weight:800;fill:#87620F">?</text>`;
  g += `<text x="${L}" y="${T - 4}" style="fill:#5B606A;font-size:11px">${esc(c.ylab)}</text>`;
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart: ${esc(c.title)}. ${c.labels.map((l, i) => `${l}: ${c.values[i]}`).join(', ')}.">${g}</svg>`;
}

export default {
  title: 'Trend Reader: read and predict from line charts',
  mount(ctx) {
    const charts = makeCharts(ctx.rng);
    let ci = Math.min(ctx.data.ci || 0, charts.length), step = 0, first = ctx.data.first || 0, tried = false, wrong = new Set(), msg = '', fired = false;

    ctx.el.innerHTML = `
      <style>
        .lab-trend{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-trend .svgchart{max-width:640px;}
        .lab-trend .opts{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));}
        .lab-trend .steps{display:flex; gap:6px; flex-wrap:wrap;}
      </style>
      <div class="lab-trend stack">
        <p class="lab-intro"><b>Trend analysis</b> means looking at data over time to see if it goes up, goes down, repeats with the seasons or stays steady — and then using that pattern to predict what comes next.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> read all 5 charts: name the trend, read a value, predict the next point. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-box" id="trBox"></div>
        <div id="trEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function render() {
      if (ci >= charts.length) return end();
      const c = charts[ci];
      const unitV = v => `${+v.toFixed(1)}${c.unit}`;
      let stem, opts, ans;
      if (step === 0) { stem = 'What is the trend in this chart?'; opts = Object.values(TR); ans = Object.keys(TR).indexOf(c.trend); }
      else if (step === 1) { stem = c.ask(c.labels[c.ai], c.ai) + ' <span class="small muted">(the gold dot)</span>'; opts = c.readOpts.map(unitV); ans = c.readAns; }
      else if (step === 2) { stem = `Predict: what will the value be in <b>${esc(c.next)}</b>?`; opts = c.ranges.map(([a, b]) => `${+a.toFixed(1)} to ${+b.toFixed(1)}${c.unit}`); ans = c.rangeAns; }
      const dots = charts.map((_, i) => `<i class="${i < ci ? 'ok' : i === ci ? 'now' : ''}"></i>`).join('');
      $('#trBox').innerHTML = `
        <div class="qcount"><span>Chart ${ci + 1} of ${charts.length} · Question ${Math.min(step + 1, 3)} of 3</span><span class="dots" aria-hidden="true">${dots}</span></div>
        <h4>${esc(c.title)}</h4>
        ${chartSVG(c, step >= 3)}
        <div class="q mt">${step < 3 ? `<div class="stem">${stem}</div>
          <div class="opts">${opts.map((o, i) => `<button class="opt ${wrong.has(i) ? 'wrong' : ''}" data-i="${i}" ${wrong.has(i) ? 'disabled' : ''}><span class="k">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>` : ''}
          <div aria-live="polite">${msg}</div>
          ${step >= 3 ? `<div class="row"><button class="btn primary" id="trNext">${ci + 1 < charts.length ? 'Next chart' : 'Finish'} ${ic('arrow')}</button></div>` : ''}</div>`;
      if (step >= 3) { $('#trNext').onclick = () => { ci++; step = 0; msg = ''; ctx.data.ci = ci; ctx.save(); render(); }; return; }
      ctx.el.querySelectorAll('.opt[data-i]').forEach(b => b.onclick = () => answer(+b.dataset.i, ans, c));
    }

    function answer(i, ans, c) {
      if (i !== ans) {
        tried = true; wrong.add(i); ctx.sfx('bad');
        msg = `<div class="fb bad small">${[
          'Look at the whole line from left to right. Does it climb, fall, stay level, or rise and fall in the same way every year?',
          `Find the gold dot, then look across to the numbers on the left. Each faint dashed line is halfway between two labelled lines.`,
          'Continue the pattern: where would the line most likely go next?'][step]}</div>`;
        return render();
      }
      ctx.sfx('ok');
      if (!tried) first++;
      const why = [
        `<b>${TR[c.trend]}.</b> ${esc(c.why)}`,
        `<b>${c.values[c.ai]}${esc(c.unit)}</b> in ${esc(c.labels[c.ai])}.`,
        `${c.trend === 'seasonal' ? `January is always a low month — last two Januaries were ${c.values[0]} and ${c.values[12]}.` : c.trend === 'stable' ? `A stable trend stays near its average of ${(c.p).toFixed(1)}${esc(c.unit)}.` : `The line ${c.trend === 'up' ? 'rises' : 'falls'} by about ${Math.abs((c.values[c.values.length - 1] - c.values[0]) / (c.values.length - 1)).toFixed(1)}${esc(c.unit)} each step, so the next value should be about ${c.p.toFixed(1)}${esc(c.unit)}.`} The actual value was <b>${+c.actual.toFixed(1)}${esc(c.unit)}</b> — your prediction range was right!`][step];
      msg = `<div class="fb good small"><b>Correct!</b> ${why}</div>`;
      step++; tried = false; wrong = new Set();
      ctx.data.first = first;
      render();
    }

    function end() {
      $('#trBox').innerHTML = `<div class="result"><div class="big">${Math.min(first, 15)} / 15</div><p>questions right on the first try</p><button class="btn" id="trAgain">${ic('refresh')} Read the charts again</button></div>`;
      $('#trAgain').onclick = () => { ci = 0; step = 0; first = 0; msg = ''; ctx.data.ci = 0; ctx.data.first = 0; ctx.save(); render(); };
      $('#trEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>You read 5 charts like a data analyst. This is <b>trend analysis</b> — spotting <b>upward</b>, <b>downward</b>, <b>seasonal</b> and <b>stable</b> patterns over time — a key part of <b>data interpretation</b>. Trends let us (and AI) make sensible predictions, always as a likely range, never a certainty.</div></div>`;
      if (!fired && !ctx.done && !ctx._completed) {
        fired = true; ctx._completed = true; ctx.save();
        ctx.complete(`Read 5 trend charts (${Math.min(first, 15)}/15 first-try correct): named the trend, read values and predicted the next point.`);
      }
    }

    render();
    return () => {};
  }
};
