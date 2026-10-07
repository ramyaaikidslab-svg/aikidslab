import { ic, esc, RM } from '../core/util.js';
import { gcd } from '../core/rng.js';

// ---------- exact probability helpers (exported for tests) ----------
export function simp(n, d) { if (n === 0) return '0'; const g = gcd(n, d); return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`; }
// decimal: exact when it terminates within 3 places, otherwise "≈ x.xxx"
export function dec(n, d) {
  const x = n / d, r = Math.round(x * 1000) / 1000;
  return Math.abs(r - x) < 1e-12 ? `= ${r}` : `≈ ${r.toFixed(3)}`;
}
export function probText(n, d) { const s = simp(n, d); return s.includes('/') ? `${s} ${dec(n, d)}` : s; }
export function eventType(n, d) { return n === d ? 'sure' : n === 0 ? 'impossible' : 2 * n === d ? 'equal' : 2 * n > d ? 'likely' : 'unlikely'; }

const EXP = {
  coin: { name: 'Toss a coin', short: 'Coin', outs: ['Heads', 'Tails'], w: [1, 1], d: 2 },
  die: { name: 'Roll a die', short: 'Die', outs: ['1', '2', '3', '4', '5', '6'], w: [1, 1, 1, 1, 1, 1], d: 6 },
  two: { name: 'Toss 2 coins (count heads)', short: '2 coins', outs: ['0 heads', '1 head', '2 heads'], w: [1, 2, 1], d: 4 },
  spin: { name: 'Spin an uneven spinner', short: 'Spinner', outs: ['Red', 'Blue', 'Green', 'Yellow'], w: [3, 2, 2, 1], d: 8, col: ['#E8453C', '#2F6FED', '#109A66', '#FFC800'] }
};
const KEYS = Object.keys(EXP);
const TYPES = { sure: 'Sure (certain)', impossible: 'Impossible', likely: 'Likely', unlikely: 'Unlikely', equal: 'Equally likely' };
const BANK = [
  ['Rolling a number less than 7 on a die', 6, 6], ['Getting heads or tails when you toss a coin', 2, 2], ['The spinner lands on Red, Blue, Green or Yellow', 8, 8],
  ['Rolling an 8 on a die', 0, 6], ['Getting 3 heads when you toss 2 coins', 0, 4], ['The spinner lands on Purple', 0, 8],
  ['Rolling a number greater than 2 on a die', 4, 6], ['Getting at least one head when you toss 2 coins', 3, 4], ['The spinner does NOT land on Yellow', 7, 8],
  ['Rolling a 6 on a die', 1, 6], ['Getting 2 heads when you toss 2 coins', 1, 4], ['The spinner lands on Yellow', 1, 8],
  ['Rolling an even number on a die', 3, 6], ['A tossed coin shows heads', 1, 2], ['The spinner lands on Blue or Green', 4, 8], ['Getting exactly one head when you toss 2 coins', 2, 4]
];

export default {
  title: 'Probability Simulator: experiment vs theory',
  mount(ctx) {
    const rng = ctx.rng;
    const sd = ctx.data;
    sd.tried = Array.isArray(sd.tried) ? sd.tried : [];
    let exp = 'coin', counts = null, total = 0, target = 0, raf = 0, last = -1, fired = false;
    const hist = {}; KEYS.forEach(k => { hist[k] = []; });
    const types = rng.sample(Object.keys(TYPES), 4);
    const qs = types.map(t => rng.pick(BANK.filter(b => eventType(b[1], b[2]) === t)));
    let qi = 0, qfb = '';
    const qDone = () => qi >= qs.length;

    ctx.el.innerHTML = `
      <style>
        .lab-prob{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-prob .tbl th,.lab-prob .tbl td{padding:6px 7px;}
        .lab-prob .svgchart text{font-size:13px;}
        .lab-prob .face{width:96px; height:96px; display:grid; place-items:center; margin:0 auto;}
        .lab-prob .runs .btn{flex:1 1 90px;}
        .lab-prob .chk{display:grid; gap:6px;}
        .lab-prob .chk li{list-style:none; display:flex; gap:8px; align-items:center; font-weight:700;}
        .lab-prob .chk .b{width:22px; height:22px; border-radius:7px; border:2px solid var(--ink); display:grid; place-items:center; flex-shrink:0; background:#fff;}
        .lab-prob .chk li.ok .b{background:var(--good); border-color:var(--good); color:#fff;}
        .lab-prob .chk .ic{width:14px; height:14px; stroke-width:3;}
        .lab-prob .legend{display:flex; gap:14px; flex-wrap:wrap; font-size:.82rem; font-weight:700; color:var(--muted);}
        .lab-prob .legend i{display:inline-block; width:14px; height:12px; border:2px solid var(--ink); border-radius:3px; vertical-align:-1px; margin-right:5px; background:#2F6FED;}
        .lab-prob .legend i.t{background:none; border:0; border-top:3px dashed var(--ink); height:0; width:18px; border-radius:0; vertical-align:3px;}
        .lab-prob .evq .opts{grid-template-columns:repeat(auto-fit,minmax(130px,1fr));}
      </style>
      <div class="lab-prob stack">
        <p class="lab-intro">Theory says what <i>should</i> happen; an experiment shows what <i>does</i> happen. Run each experiment 10, 100 and 1000 times and compare the bars (experimental probability) with the dashed lines (theoretical probability).</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> try at least 3 experiments (one with 1000 trials) and answer 4 event questions. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-grid">
          <div class="lab-box">
            <div class="small"><b>Experiment</b></div>
            <div class="seg mt" role="group" aria-label="Experiment" id="pbSeg">${KEYS.map(k => `<button data-e="${k}">${EXP[k].short}</button>`).join('')}</div>
            <div class="row mt" style="gap:14px; align-items:center; flex-wrap:nowrap">
              <div class="face" id="pbFace" aria-hidden="true"></div>
              <div><b id="pbName"></b><div class="small muted" id="pbNow" aria-live="polite"></div></div>
            </div>
            <div class="row runs mt">${[10, 100, 1000].map(n => `<button class="btn ${n === 1000 ? 'primary' : ''}" data-n="${n}">Run ${n}</button>`).join('')}</div>
            <ul class="chk mt" id="pbChk"></ul>
          </div>
          <div class="lab-box">
            <div class="legend"><span><i></i>Experimental</span><span><i class="t"></i>Theoretical</span></div>
            <div id="pbChart" class="mt"></div>
            <p class="small muted mt" id="pbGap" aria-live="polite"></p>
          </div>
        </div>
        <div class="lab-box"><h4>Results table</h4><div class="tblwrap" id="pbTable"></div><div id="pbHist" class="small mt"></div></div>
        <div class="lab-box evq"><h4>Types of events</h4><div id="pbQ"></div></div>
        <div id="pbEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function sample(k) {
      const e = EXP[k];
      if (k === 'two') return (rng() < .5 ? 1 : 0) + (rng() < .5 ? 1 : 0);
      let r = rng() * e.d;
      for (let i = 0; i < e.w.length; i++) { if (r < e.w[i]) return i; r -= e.w[i]; }
      return e.w.length - 1;
    }

    function faceSVG() {
      const e = EXP[exp];
      if (exp === 'coin' || exp === 'two') {
        const one = (x, txt) => `<g><circle cx="${x}" cy="48" r="${exp === 'two' ? 22 : 36}" fill="#FFC800" stroke="#15171C" stroke-width="3"/><text x="${x}" y="${exp === 'two' ? 56 : 60}" text-anchor="middle" style="font:800 ${exp === 'two' ? 20 : 30}px var(--head)">${txt}</text></g>`;
        if (exp === 'coin') return `<svg viewBox="0 0 96 96" width="96" height="96">${one(48, last < 0 ? '?' : last === 0 ? 'H' : 'T')}</svg>`;
        let a = '?', b = '?';
        if (last >= 0) { const hs = last; const p = hs === 2 ? ['H', 'H'] : hs === 0 ? ['T', 'T'] : (total % 2 ? ['H', 'T'] : ['T', 'H']); [a, b] = p; }
        return `<svg viewBox="0 0 96 96" width="96" height="96">${one(26, a)}${one(70, b)}</svg>`;
      }
      if (exp === 'die') {
        const P = { 1: [[48, 48]], 2: [[28, 28], [68, 68]], 3: [[28, 28], [48, 48], [68, 68]], 4: [[28, 28], [68, 28], [28, 68], [68, 68]], 5: [[28, 28], [68, 28], [48, 48], [28, 68], [68, 68]], 6: [[28, 26], [68, 26], [28, 48], [68, 48], [28, 70], [68, 70]] };
        const pips = last < 0 ? '<text x="48" y="60" text-anchor="middle" style="font:800 32px var(--head)">?</text>' : P[last + 1].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#15171C"/>`).join('');
        return `<svg viewBox="0 0 96 96" width="96" height="96"><rect x="8" y="8" width="80" height="80" rx="16" fill="#fff" stroke="#15171C" stroke-width="3"/>${pips}</svg>`;
      }
      let a0 = -Math.PI / 2, g = '';
      e.w.forEach((w, i) => {
        const a1 = a0 + w / e.d * Math.PI * 2, r = 42, large = a1 - a0 > Math.PI ? 1 : 0;
        g += `<path d="M48,48 L${48 + r * Math.cos(a0)},${48 + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${48 + r * Math.cos(a1)},${48 + r * Math.sin(a1)} Z" fill="${e.col[i]}" stroke="#15171C" stroke-width="2"/>`;
        a0 = a1;
      });
      let ang = -90;
      if (last >= 0) { const before = e.w.slice(0, last).reduce((x, y) => x + y, 0); ang = -90 + (before + e.w[last] / 2) / e.d * 360; }
      g += `<g transform="rotate(${ang} 48 48)"><path d="M48 48 L84 48" stroke="#15171C" stroke-width="5" stroke-linecap="round"/><path d="M86 48 l-10 -6 v12 z" fill="#15171C"/></g><circle cx="48" cy="48" r="6" fill="#fff" stroke="#15171C" stroke-width="2"/>`;
      return `<svg viewBox="0 0 96 96" width="96" height="96">${g}</svg>`;
    }

    function chartSVG() {
      const e = EXP[exp], m = e.outs.length;
      const ex = counts ? counts.map(c => total ? c / total : 0) : e.outs.map(() => 0);
      const th = e.w.map(w => w / e.d);
      const top = Math.min(1, Math.ceil(Math.max(...ex, ...th) * 1.15 * 10) / 10);
      const W = 360, H = 250, L = 38, B = 40, T = 14, R = 8, ph = H - B - T, bw = (W - L - R) / m;
      const y = v => H - B - v / top * ph;
      let g = '';
      for (let i = 0; i <= Math.round(top * 10); i++) {
        if (top > .5 && i % 2) continue;
        const v = i / 10; g += `<line x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}" stroke="#E6DFCF"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v.toFixed(1)}</text>`;
      }
      g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#15171C" stroke-width="2"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#15171C" stroke-width="2"/>`;
      e.outs.forEach((o, i) => {
        const x = L + i * bw, h2 = ex[i] / top * ph;
        g += `<rect x="${x + bw * .18}" y="${H - B - h2}" width="${bw * .64}" height="${h2}" rx="3" fill="${e.col ? e.col[i] : '#2F6FED'}" stroke="#15171C" stroke-width="1.5"/>`;
        g += `<line x1="${x + bw * .06}" y1="${y(th[i])}" x2="${x + bw * .94}" y2="${y(th[i])}" stroke="#15171C" stroke-width="3" stroke-dasharray="6 4"/>`;
        g += `<text x="${x + bw / 2}" y="${H - B + 17}" text-anchor="middle">${esc(o)}</text>`;
        if (total) g += `<text x="${x + bw / 2}" y="${H - B + 32}" text-anchor="middle" style="fill:#5B606A;font-size:12px">${(+ex[i].toFixed(3))}</text>`;
      });
      // theoretical line joining the dashed targets
      g += `<polyline points="${th.map((t, i) => `${L + i * bw + bw / 2},${y(t)}`).join(' ')}" fill="none" stroke="#15171C" stroke-width="1.5" opacity=".35"/>`;
      return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Experimental versus theoretical probability for ${esc(e.name)}">${g}</svg>`;
    }

    function maxGap() { const e = EXP[exp]; return Math.max(...counts.map((c, i) => Math.abs(c / total - e.w[i] / e.d))); }

    function drawTable() {
      const e = EXP[exp];
      $('#pbTable').innerHTML = `<table class="tbl"><thead><tr><th>Outcome</th><th>Count</th><th>Experimental</th><th>Theoretical</th></tr></thead><tbody>${e.outs.map((o, i) => {
        const c = counts ? counts[i] : 0;
        return `<tr><td>${esc(o)}</td><td>${counts ? c : '—'}</td><td>${total ? `${+(c / total).toFixed(3)} <span class="tiny muted">(${c}/${total})</span>` : '—'}</td><td>${probText(e.w[i], e.d)}</td></tr>`;
      }).join('')}</tbody></table>`;
      const h = hist[exp];
      $('#pbHist').innerHTML = h.length ? `<b>Your runs (${esc(e.short)}):</b> ${h.map(r => `<span class="chip dim">${r.n} trials → biggest gap ${r.gap.toFixed(3)}</span>`).join(' ')}` : '';
    }

    function drawLive() {
      $('#pbFace').innerHTML = faceSVG();
      $('#pbChart').innerHTML = chartSVG();
      $('#pbNow').textContent = total ? `Trial ${total}${target ? ' of ' + target : ''}: ${EXP[exp].outs[last]}` : 'Press a Run button to start.';
    }

    function drawChk() {
      const tried = sd.tried.length, big = !!sd.big;
      const items = [[tried >= 3, `Try 3 experiments (${Math.min(tried, 3)}/3)`], [big, 'Do a 1000-trial run'], [qDone(), `Answer 4 event questions (${Math.min(qi, 4)}/4)`]];
      $('#pbChk').innerHTML = items.map(([ok, t]) => `<li class="${ok ? 'ok' : ''}"><span class="b">${ok ? ic('check') : ''}</span>${t}${ok ? '<span class="sr"> — done</span>' : ''}</li>`).join('');
    }

    function setButtons(busy) { ctx.el.querySelectorAll('[data-n],[data-e]').forEach(b => { b.disabled = busy; }); }

    function selectExp(k) {
      cancelAnimationFrame(raf); raf = 0; setButtons(false);
      exp = k; counts = null; total = 0; target = 0; last = -1;
      ctx.el.querySelectorAll('[data-e]').forEach(b => b.setAttribute('aria-pressed', b.dataset.e === k));
      $('#pbName').textContent = EXP[k].name;
      $('#pbGap').textContent = '';
      drawLive(); drawTable();
    }

    function run(n) {
      cancelAnimationFrame(raf);
      const e = EXP[exp];
      counts = e.outs.map(() => 0); total = 0; target = n; last = -1;
      setButtons(true);
      const dur = RM ? 0 : n === 10 ? 1100 : 1000, t0 = performance.now();
      const step = now => {
        const want = dur ? Math.min(n, Math.ceil((now - t0) / dur * n)) : n;
        while (total < want) { last = sample(exp); counts[last]++; total++; }
        drawLive();
        if (total < n) { raf = requestAnimationFrame(step); return; }
        raf = 0; setButtons(false); ctx.el.querySelector(`[data-e="${exp}"]`).setAttribute('aria-pressed', 'true');
        const gap = maxGap();
        hist[exp].push({ n, gap }); if (hist[exp].length > 6) hist[exp].shift();
        $('#pbGap').innerHTML = `Biggest difference between experiment and theory: <b>${gap.toFixed(3)}</b>. ${n === 1000 ? 'With 1000 trials the bars sit close to the dashed lines.' : n === 10 ? 'With only 10 trials results jump around a lot.' : 'More trials usually bring the bars closer to theory.'}`;
        if (!sd.tried.includes(exp)) sd.tried.push(exp);
        if (n === 1000) sd.big = 1;
        ctx.save(); ctx.sfx('pop');
        drawTable(); drawChk(); check();
      };
      raf = requestAnimationFrame(step);
    }

    function drawQ() {
      const box = $('#pbQ');
      if (qDone()) { box.innerHTML = `<div class="fb good"><div class="h">${ic('check')} All 4 questions correct</div><div class="small">Sure → P = 1, impossible → P = 0, likely → more than ½, unlikely → less than ½, equally likely → P = ½ (it happens or doesn't with the same chance).</div></div>`; return; }
      const [txt, n, d] = qs[qi];
      box.innerHTML = `<div class="q"><div class="small muted">Question ${qi + 1} of ${qs.length}</div><div class="stem">${esc(txt)}</div><div class="hint">Which word best describes this event?</div>
        <div class="opts">${Object.entries(TYPES).map(([k, v], i) => `<button class="opt" data-t="${k}"><span class="k">${'ABCDE'[i]}</span>${v}</button>`).join('')}</div><div aria-live="polite">${qfb}</div></div>`;
      box.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
        const ans = eventType(n, d), pt = `P = ${n}/${d}${simp(n, d) !== `${n}/${d}` ? ' = ' + simp(n, d) : ''}${n && n !== d ? ' ' + dec(n, d) : ''}`;
        if (b.dataset.t === ans) {
          ctx.sfx('ok'); qi++;
          qfb = ''; drawQ(); drawChk();
          if (!qDone()) $('#pbQ').insertAdjacentHTML('afterbegin', `<div class="fb good mb small"><b>Correct!</b> “${esc(txt)}”: ${esc(pt)} → ${TYPES[ans].toLowerCase()}.</div>`);
          check();
        } else {
          ctx.sfx('bad'); b.classList.add('wrong'); b.disabled = true;
          qfb = `<div class="fb bad small"><b>Not quite.</b> Count the favourable outcomes: ${esc(pt)}. Compare with 0, ½ and 1.</div>`;
          box.querySelector('[aria-live]').innerHTML = qfb; qfb = '';
        }
      });
    }

    function check() {
      if (sd.tried.length >= 3 && sd.big && qDone()) {
        if ($('#pbEnd').innerHTML) return;
        $('#pbEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>Great experimenting! <b>Theoretical probability</b> P(E) = favourable outcomes ÷ total outcomes. <b>Experimental probability</b> = times it happened ÷ number of trials. The more trials you run, the closer experiment gets to theory — that is why AI needs lots of data to measure chances well.</div></div>`;
        if (!fired && !ctx.done && !ctx._completed) {
          fired = true; ctx._completed = true; sd.completed = 1; ctx.save();
          ctx.complete(`Ran ${sd.tried.length} probability experiments (incl. 1000 trials) and classified 4 events correctly.`);
        }
      }
    }

    ctx.el.querySelectorAll('[data-e]').forEach(b => b.onclick = () => selectExp(b.dataset.e));
    ctx.el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => run(+b.dataset.n));
    selectExp('coin'); drawChk(); drawQ();
    return () => { cancelAnimationFrame(raf); raf = 0; };
  }
};
