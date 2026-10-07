import { ic, esc } from '../core/util.js';
import * as chart from '../core/charts.js';

const W = 380, H = 290;
const TRICKS = {
  trunc: 'The y-axis does not start at zero (truncated axis)',
  window: 'Only a cherry-picked time period is shown',
  units: 'Units and labels are missing',
  pie3d: 'A 3-D effect distorts the slice sizes',
  cause: 'Correlation is shown as causation'
};
const COL = ['#2F6FED', '#E8453C', '#109A66', '#DFA426'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const svg = (g, label) => `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${g}</svg>`;

// Bars drawn from a baseline that is NOT zero.
function truncBars(labels, values, lo, hi, title) {
  const L = 44, B = 40, T = 34, R = 14, bw = (W - L - R) / labels.length, Y = v => H - B - (v - lo) / (hi - lo) * (H - B - T);
  let g = `<text x="${L}" y="18" style="font-weight:800">${esc(title)}</text>`;
  for (let v = lo; v <= hi; v += 1) g += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#E6DFCF"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
  labels.forEach((lb, i) => {
    const x = L + i * bw + bw * .18, y = Y(values[i]);
    g += `<rect x="${x}" y="${y}" width="${bw * .64}" height="${H - B - y}" rx="4" fill="${COL[i]}" stroke="#15171C" stroke-width="1.5"/>`;
    g += `<text x="${x + bw * .32}" y="${H - B + 18}" text-anchor="middle">${esc(lb)}</text>`;
  });
  g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#15171C" stroke-width="2"/><line x1="${L}" y1="${T - 6}" x2="${L}" y2="${H - B}" stroke="#15171C" stroke-width="2"/>`;
  return svg(g, `${title}: bar chart whose axis starts at ${lo}`);
}

// Bars with no axis numbers, no units and no title.
function bareBars(labels, values) {
  const L = 30, B = 40, T = 30, R = 20, max = Math.max(...values) * 1.1, bw = (W - L - R) / labels.length;
  let g = '';
  labels.forEach((lb, i) => {
    const h2 = values[i] / max * (H - B - T), x = L + i * bw + bw * .2, y = H - B - h2;
    g += `<rect x="${x}" y="${y}" width="${bw * .6}" height="${h2}" rx="4" fill="${COL[i]}" stroke="#15171C" stroke-width="1.5"/>`;
    g += `<text x="${x + bw * .3}" y="${y - 8}" text-anchor="middle" style="font-size:18px">${values[i]}</text>`;
    g += `<text x="${x + bw * .3}" y="${H - B + 20}" text-anchor="middle" style="font-size:14px">${esc(lb)}</text>`;
  });
  g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#15171C" stroke-width="2"/>`;
  return svg(g, 'Bar chart with no title, no axis and no units');
}

// A tilted, perspective 3-D pie. Slice 0 is centred at the front, so it looks bigger than it is.
function pie3d(labels, values, title) {
  const cx = W / 2, cy = 118, R = 120, tilt = 0.45, depth = 34, total = values.reduce((a, b) => a + b, 0);
  const f = s => 1 + 0.28 * s;                                  // perspective: front (s = +1) looks bigger
  const P = (a, dz = 0) => { const s = Math.sin(a), k = f(s); return [cx + R * Math.cos(a) * k, cy + R * s * tilt * k + dz * k]; };
  const shade = (hex, m) => '#' + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) * m).toString(16).padStart(2, '0')).join('');
  const sl = []; let a = Math.PI / 2 - values[0] / total * Math.PI;   // centre slice 0 at the front (angle π/2)
  values.forEach((v, i) => { const a1 = a + v / total * Math.PI * 2; sl.push([a, a1, i]); a = a1; });
  let walls = '', tops = '';
  sl.forEach(([a0, a1, i]) => {
    const pts = []; for (let k = 0; k <= 40; k++) pts.push(a0 + (a1 - a0) * k / 40);
    tops += `<path d="M${cx} ${cy} ${pts.map(t => 'L' + P(t).join(' ')).join(' ')} Z" fill="${COL[i]}" stroke="#15171C" stroke-width="1.5"/>`;
    const front = pts.filter(t => Math.sin(t) > -0.02);       // only the front rim shows a side wall
    if (front.length > 1) walls += `<path d="M${front.map(t => P(t).join(' ')).join(' L')} L${front.slice().reverse().map(t => P(t, depth).join(' ')).join(' L')} Z" fill="${shade(COL[i], .7)}" stroke="#15171C" stroke-width="1.5"/>`;
  });
  let g = `<text x="12" y="18" style="font-weight:800">${esc(title)}</text>` + walls + tops;
  labels.forEach((lb, i) => { g += `<rect x="${12 + (i % 2) * 180}" y="${H - 34 + Math.floor(i / 2) * 18}" width="12" height="12" rx="3" fill="${COL[i]}" stroke="#15171C"/><text x="${30 + (i % 2) * 180}" y="${H - 24 + Math.floor(i / 2) * 18}">${esc(lb)}</text>`; });
  return svg(g, `${title}: tilted 3-D pie chart with no percentages`);
}

export default {
  title: 'Spot the Misleading Chart',
  mount(ctx) {
    const { rng } = ctx;
    const el = ctx.el;
    el.classList.add('lab-mc');
    const d = ctx.data;

    // ---- seeded case data ----
    const a = rng.int(50, 54), b = a + rng.int(2, 4), lo = a - 2;
    const sport = [35, 30, 20, 15];
    const CASES = [
      {
        id: 'trunc', src: 'The Daily Fizz',
        head: `FizzUp CRUSHES ColaKing — sales nearly ${Math.round((b - lo) / (a - lo))}× higher!`,
        bad: () => truncBars(['ColaKing', 'FizzUp'], [a, b], lo, b + 1, 'Bottles sold (thousands)'),
        good: () => chart.bar(['ColaKing', 'FizzUp'], [a, b], { W, H, title: 'Bottles sold (thousands), axis from 0', color: '#2F6FED' }),
        hint: 'Look at the numbers on the y-axis. Where does it start?',
        why: `The axis starts at ${lo}, not 0, so a small difference (${a} vs ${b} thousand) looks huge. From zero, the bars are almost the same height: FizzUp sold only about ${Math.round((b - a) / a * 100)}% more.`,
        ask: 'Does the y-axis start at zero?'
      },
      {
        id: 'window', src: 'Business Buzz',
        head: 'Kulfi Corner is booming! Sales up more than 4× — the business is taking off!',
        bad: () => chart.line(MON.slice(0, 5), [[12, 16, 28, 42, 55]], { W, H, title: 'Kulfis sold (hundreds)' }),
        good: () => chart.line(MON, [[12, 16, 28, 42, 55, 48, 22, 18, 20, 19, 14, 12]], { W, H, title: 'Kulfis sold (hundreds), whole year' }),
        hint: 'How many months does the chart show? What happens in the rest of the year?',
        why: 'Only January to May is shown, the hot months when kulfi sales always rise. Across the whole year, sales go back down after summer. It is a seasonal pattern, not a business taking off.',
        ask: 'Is this the whole time period, or just the part that fits the story?'
      },
      {
        id: 'units', src: 'Teen Talk Weekly',
        head: 'Shocking! Students spend 3× more time on phones than on books!',
        bad: () => bareBars(['Phone', 'Books'], [6, 2]),
        good: () => chart.bar(['Phone', 'Books'], [6, 14], { W, H, title: 'Hours per WEEK (survey of Class 9B)', ylabel: 'hours per week', color: '#109A66' }),
        hint: '6 and 2… 6 what? 2 what? Is anything missing?',
        why: 'The chart had no units. In the survey, phone time was 6 hours per week but book time was 2 hours per day. In the same unit, that is 6 vs 14 hours per week, so students actually read more!',
        ask: 'What are the units, and are they the same for every bar?'
      },
      {
        id: 'pie3d', src: 'Sports Scene',
        head: 'School sports poll: cricket is the clear favourite!',
        bad: () => pie3d(['Cricket', 'Football', 'Badminton', 'Kabaddi'], [sport[1], sport[0], sport[2], sport[3]], 'Favourite sport (poll of 200 students)'),
        good: () => chart.bar(['Football', 'Cricket', 'Badminton', 'Kabaddi'], sport, { W, H, title: 'Favourite sport (% of 200 students)', color: '#E8453C' }),
        hint: 'Which slice is closest to you? Does being in front make a slice look bigger?',
        why: 'The 3-D tilt makes the front slice (cricket) look bigger and adds a thick side wall to it, and there are no percentages. A flat chart shows football (35%) was actually ahead of cricket (30%).',
        ask: 'Are there 3-D effects that change how big things look? Are the real numbers shown?'
      },
      {
        id: 'cause', src: 'The Town Crier',
        head: 'Umbrella sales CAUSE traffic jams, data proves!',
        bad: () => chart.line(MON, [[3, 3, 2, 4, 6, 20, 28, 26, 19, 9, 4, 3], [8, 7, 7, 9, 10, 22, 30, 29, 21, 12, 9, 8]], { W, H, title: 'Umbrellas sold vs traffic jams', names: ['Umbrellas ×100', 'Jam reports'] }),
        good: () => chart.line(MON, [[3, 3, 2, 4, 6, 20, 28, 26, 19, 9, 4, 3], [8, 7, 7, 9, 10, 22, 30, 29, 21, 12, 9, 8], [1, 1, 1, 2, 4, 18, 30, 28, 20, 8, 3, 1]], { W, H, title: 'Add the hidden cause: rainfall', names: ['Umbrellas ×100', 'Jam reports', 'Rain (cm)'] }),
        hint: 'Two things rise together. Does one really make the other happen, or could something else cause both?',
        why: 'Both rise in June to September because of the monsoon rain. Rain makes people buy umbrellas and also slows traffic. Moving together (correlation) does not prove that one causes the other (causation).',
        ask: 'Could a third thing be causing both?'
      }
    ];
    const order = rng.shuffle(CASES.map((_, i) => i));
    const optsFor = CASES.map(C => rng.shuffle([C.id, ...rng.sample(Object.keys(TRICKS).filter(k => k !== C.id), 3)]));

    let idx = Number.isInteger(d.i) ? Math.min(d.i, 5) : 0;
    let first = Array.isArray(d.f) ? d.f.slice(0, 5) : [];     // 1 = right first time
    let tried = new Set(), solved = false, completed = false;
    const save = () => { d.i = idx; d.f = first; ctx.save(); };

    el.innerHTML = `<style>
      .lab-mc .news{background:#fff; border:2px solid var(--ink); border-radius:12px; padding:12px 14px; box-shadow:var(--sh-sm);}
      .lab-mc .news .src{font-family:Georgia,'Times New Roman',serif; font-weight:700; font-size:.8rem; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); border-bottom:2px solid var(--ink); padding-bottom:4px; margin-bottom:6px;}
      .lab-mc .news h3{font-family:Georgia,'Times New Roman',serif; font-size:clamp(1.15rem,3vw,1.5rem); line-height:1.2;}
      .lab-mc .pane{display:grid; gap:8px; align-content:start;}
      .lab-mc .pane .chip{justify-self:start;}
      .lab-mc .svgchart{max-width:520px;}
    </style>
      <p class="lab-intro">Charts can tell the truth in a misleading way. Each news story below uses a chart with a trick in it. Name the trick, then see the honest version side by side.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> spot the trick in all 5 charts.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div id="mcMain" class="stack"></div>`;
    const MAIN = el.querySelector('#mcMain');
    const dots = () => `<div class="dots" aria-hidden="true">${order.map((_, i) => `<i class="${i < idx ? (first[i] ? 'ok' : 'no') : i === idx ? 'now' : ''}"></i>`).join('')}</div>`;

    function renderCase() {
      const ci = order[idx], C = CASES[ci];
      MAIN.innerHTML = `
        <div class="qcount" style="margin:0"><span>Chart ${idx + 1} of 5</span>${dots()}</div>
        <div class="news"><div class="src">${esc(C.src)} · example</div><h3>${esc(C.head)}</h3></div>
        <div class="lab-grid">
          <div class="pane"><span class="chip bad">As published</span>${C.bad()}</div>
          <div class="pane">${solved ? `<span class="chip ok">Corrected</span>${C.good()}` : `
            <h4>What's the trick?</h4>
            <div class="opts">${optsFor[ci].map((k, n) => `<button class="opt ${tried.has(k) ? 'wrong' : ''}" data-k="${k}" ${tried.has(k) ? 'disabled' : ''}><span class="k">${'ABCD'[n]}</span><span>${TRICKS[k]}</span></button>`).join('')}</div>
            <div aria-live="polite">${tried.size ? `<div class="fb bad mt"><div class="h">${ic('x')} Not this one</div><div>Hint: ${esc(C.hint)}</div></div>` : ''}</div>`}
          </div>
        </div>
        ${solved ? `<div class="fb good" aria-live="polite"><div class="h">${ic('check')} ${TRICKS[C.id]}</div><div>${C.why}</div><div class="small"><b>Ask next time:</b> ${esc(C.ask)}</div></div>
          <div><button class="btn primary" id="mcNext">${idx === 4 ? 'Finish' : 'Next chart'} ${ic('arrow')}</button></div>` : ''}`;
      MAIN.querySelectorAll('[data-k]').forEach(btn => btn.onclick = () => {
        const k = btn.dataset.k;
        if (k === C.id) { solved = true; first[idx] = tried.size ? 0 : 1; ctx.sfx('ok'); save(); }
        else { tried.add(k); ctx.sfx('bad'); }
        renderCase();
        const f = MAIN.querySelector(solved ? '#mcNext' : '.opt:not(:disabled)'); if (f) f.focus({ preventScroll: true });
      });
      const nx = MAIN.querySelector('#mcNext');
      if (nx) nx.onclick = () => { idx++; tried = new Set(); solved = false; save(); render(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    }

    function renderEnd() {
      const score = first.filter(Boolean).length;
      MAIN.innerHTML = `
        <div class="qcount" style="margin:0"><span>All 5 charts checked · ${score}/5 right first time</span>${dots()}</div>
        <div class="lab-box"><h4>Your chart-checking checklist</h4>
          <ol class="flow">${CASES.map(C => `<li><b>${esc(C.ask)}</b><span>${TRICKS[C.id]}</span></li>`).join('')}</ol></div>
        <div class="lab-done">${ic('check')}<div><b>Data literacy</b> is reading data critically: before you believe or share a chart, check the axis, the time period, the units, the design and whether a cause is really proven.</div></div>
        <div><button class="btn sm" id="mcAgain">${ic('refresh')} Try again</button></div>`;
      MAIN.querySelector('#mcAgain').onclick = () => { idx = 0; first = []; tried = new Set(); solved = false; save(); render(); };
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Spotted the trick in 5 misleading charts (${score}/5 first time).`);
      }
    }

    function render() { if (idx >= 5) renderEnd(); else renderCase(); }
    render();
    return () => { el.classList.remove('lab-mc'); };
  }
};
