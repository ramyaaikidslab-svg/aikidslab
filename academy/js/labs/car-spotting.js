import { ic, esc, RM } from '../core/util.js';
import { frac } from '../core/rng.js';

const COLS = [
  { k: 'red', name: 'Red', fill: '#E8453C' }, { k: 'white', name: 'White', fill: '#FFFFFF' },
  { k: 'black', name: 'Black', fill: '#23262D' }, { k: 'blue', name: 'Blue', fill: '#2F6FED' }
];
const DUR = 60, LANE_T = [4.4, 3.8], MIN_GAP = 1.7;

// ---------- seeded traffic schedule (exported for tests) ----------
export function makeTraffic(rng) {
  let counts;
  for (;;) {
    const T = rng.int(20, 26), w = COLS.map(() => 1 + rng() * 2.2), sw = w.reduce((a, b) => a + b, 0);
    counts = w.map(x => Math.max(2, Math.round(x / sw * T)));
    const mx = Math.max(...counts);
    if (counts.filter(c => c === mx).length === 1) break;
  }
  const T = counts.reduce((a, b) => a + b, 0);
  const colours = rng.shuffle(counts.flatMap((c, i) => Array(c).fill(COLS[i].k)));
  const lanes = [Math.ceil(T / 2), Math.floor(T / 2)], list = [];
  lanes.forEach((k, lane) => {
    const t0 = 0.6, t1 = DUR - LANE_T[lane] - 0.6, sp = (t1 - t0) / k, jit = Math.max(0, (sp - MIN_GAP) / 2);
    for (let i = 0; i < k; i++) list.push({ lane, t: +(t0 + i * sp + sp / 2 - jit + rng() * 2 * jit).toFixed(2) });
  });
  list.forEach(v => { v.t = Math.max(0.3, v.t); });
  list.sort((a, b) => a.t - b.t);
  list.forEach((v, i) => { v.col = colours[i]; v.type = rng.chance(0.35) ? 'auto' : 'car'; });
  const actual = Object.fromEntries(COLS.map(c => [c.k, list.filter(v => v.col === c.k).length]));
  return { list, actual, total: list.length };
}
export function fracOptions(red, total, rng) {
  const right = frac(red, total);
  const cand = [frac(red, total - red), frac(red + 1, total), '1/4', frac(Math.max(1, red - 1), total), frac(total - red, total), `${red}/${total + 4}`];
  const opts = [right];
  cand.forEach(c => { if (!opts.includes(c) && opts.length < 4) opts.push(c); });
  return rng.shuffle(opts);
}
function tallySVG(n) {
  if (!n) return '<span class="muted">—</span>';
  let g = '', x = 2;
  for (let i = 0; i < n; i += 5) {
    const k = Math.min(5, n - i);
    for (let j = 0; j < Math.min(4, k); j++) g += `<line x1="${x + j * 6}" y1="3" x2="${x + j * 6}" y2="21" stroke="#15171C" stroke-width="2.2" stroke-linecap="round"/>`;
    if (k === 5) g += `<line x1="${x - 3}" y1="17" x2="${x + 21}" y2="7" stroke="#E8453C" stroke-width="2.4" stroke-linecap="round"/>`;
    x += 32;
  }
  return `<svg viewBox="0 0 ${x} 24" width="${x}" height="24" role="img" aria-label="${n} tally marks">${g}</svg>`;
}

export default {
  title: 'Car Spotting: tally, frequency table and mode',
  mount(ctx) {
    const rng = ctx.rng;
    const TR = makeTraffic(rng);
    const fopts = fracOptions(TR.actual.red, TR.total, rng);
    const reliable = rng.shuffle([
      ['Record a video and count again, or have two people count and compare', true],
      ['Count only the red vehicles', false], ['Guess the numbers from memory afterwards', false], ['Count for just 10 seconds', false]]);
    const mode = COLS.reduce((a, c) => TR.actual[c.k] > TR.actual[a.k] ? c : a, COLS[0]);
    const QS = [
      { kind: 'mcq', text: 'Which colour was the most common? (This is the <b>mode</b>.)', opts: COLS.map(c => c.name), ans: mode.name, why: `${mode.name} appeared ${TR.actual[mode.k]} times — more than any other colour, so it is the mode.` },
      { kind: 'num', text: 'How many vehicles passed in total?', ans: TR.total, why: `${COLS.map(c => TR.actual[c.k]).join(' + ')} = ${TR.total}. Add up the frequency column.` },
      { kind: 'mcq', text: 'What fraction of all the vehicles were red?', opts: fopts, ans: frac(TR.actual.red, TR.total), why: `${TR.actual.red} red out of ${TR.total} vehicles = ${TR.actual.red}/${TR.total}${frac(TR.actual.red, TR.total) !== `${TR.actual.red}/${TR.total}` ? ' = ' + frac(TR.actual.red, TR.total) : ''} ${Number.isInteger(TR.actual.red / TR.total * 100) ? '=' : '≈'} ${+(TR.actual.red / TR.total).toFixed(2)}.` },
      { kind: 'mcq', text: 'How could you make your count more reliable?', opts: reliable.map(r => r[0]), ans: reliable.find(r => r[1])[0], why: 'Checking the data a second way (a recording, or two counters comparing) catches mistakes. Counting longer and at different times also gives more representative data.' }
    ];
    let phase = 'ready', mode2 = 'anim', simT = 0, last = 0, raf = 0, tally = Object.fromEntries(COLS.map(c => [c.k, 0])), hist = [], ok = [false, false, false, false], qMsg = ['', '', '', ''], fired = false;
    let W = 600, H = 220, dpr = 1;

    ctx.el.innerHTML = `
      <style>
        .lab-car{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-car .road{position:relative;}
        .lab-car canvas{width:100%; height:220px; display:block; border:var(--b2); border-radius:12px; background:#CFE8F7;}
        .lab-car .over{position:absolute; inset:0; display:grid; place-items:center; background:rgba(255,249,236,.82); border-radius:12px; text-align:center; padding:12px;}
        .lab-car .tal{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px;}
        @media (max-width:520px){ .lab-car .tal{grid-template-columns:repeat(2,minmax(0,1fr));} }
        .lab-car .tb{display:flex; align-items:center; gap:8px; justify-content:space-between; background:#fff; border:var(--b); border-radius:12px; box-shadow:var(--sh); padding:10px 12px; font-weight:900; font-size:1.05rem; min-height:56px; touch-action:manipulation;}
        .lab-car .tb:active:not(:disabled){transform:translate(3px,3px); box-shadow:1px 1px 0 var(--ink);}
        .lab-car .tb:disabled{opacity:.45;}
        .lab-car .sw{width:26px; height:26px; border-radius:8px; border:2px solid var(--ink); flex-shrink:0;}
        .lab-car .cnt{font-family:var(--head); font-size:1.4rem; min-width:28px; text-align:right;}
        .lab-car .qrow{display:grid; gap:8px; border-top:2px dashed var(--line); padding-top:12px;}
        .lab-car .qrow:first-child{border-top:0; padding-top:0;}
        .lab-car .opts{grid-template-columns:repeat(auto-fit,minmax(140px,1fr));}
        .lab-car .tbl td{vertical-align:middle;}
        .lab-car .tbl th,.lab-car .tbl td{padding:6px 8px;}
        .lab-car .nw{white-space:nowrap;}
        @media (max-width:420px){ .lab-car .tb{padding:8px 10px; font-size:.95rem;} .lab-car .tb .sw{width:20px; height:20px;} .lab-car .tbl{font-size:.84rem;} .lab-car .tbl th,.lab-car .tbl td{padding:5px 5px;} }
        .lab-car .tb .nm{display:flex; align-items:center; gap:8px; min-width:0;}
      </style>
      <div class="lab-car stack">
        <p class="lab-intro">You are doing a <b>traffic survey</b> outside school. For 60 seconds, tap a colour button every time a vehicle passes. Then compare your tally with the real counts.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> finish the tally, then answer 4 questions. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        ${RM ? '<div class="banner">' + ic('eye') + '<span>Moving pictures switched off on your device? Use <b>“Show me the list”</b> to count from a list instead.</span></div>' : ''}
        <div class="lab-box" id="csTop">
          <div class="road" id="csRoad"><canvas id="csCv" aria-label="Animated road with passing vehicles. Use Show me the list for a text version." role="img"></canvas><div class="over" id="csOver"></div></div>
          <div class="row between mt"><div class="row" style="gap:8px"><button class="btn sm" id="csPause" disabled>Pause</button><button class="btn sm ghost" id="csList">${ic('table')} Show me the list</button></div>
            <span class="small" style="font-weight:800" id="csTime" aria-live="off">60 s left</span></div>
          <div class="meter mt" aria-hidden="true"><i id="csBar" style="width:100%"></i></div>
          <div id="csListBox"></div>
          <h4 class="mt">Your tally <span class="small muted">(keys 1–4 work too)</span></h4>
          <div class="tal" id="csTal">${COLS.map((c, i) => `<button class="tb" data-c="${c.k}" disabled aria-label="${c.name}: add one"><span class="nm"><span class="sw" style="background:${c.fill}"></span>${c.name}</span><span class="cnt" id="csN${c.k}">0</span></button>`).join('')}</div>
          <div class="row mt"><button class="btn sm" id="csUndo" disabled>${ic('back')} Undo last tap</button><button class="btn sm dark" id="csDone" hidden>I've finished counting</button></div>
        </div>
        <div id="csRes"></div>
        <div id="csEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);
    const cv = $('#csCv'), g = cv.getContext('2d');

    function resize() { const r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1); W = Math.max(260, r.width); H = r.height || 220; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); draw(); }
    const ro = new ResizeObserver(resize); ro.observe(cv);

    // ---------- drawing ----------
    function rr(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
    function wheel(x, y, r) { g.fillStyle = '#15171C'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.fillStyle = '#B9BEC6'; g.beginPath(); g.arc(x, y, r * .45, 0, 7); g.fill(); }
    function vehicle(v, x, base) {
      const c = COLS.find(q => q.k === v.col), dir = v.lane === 0 ? 1 : -1;
      const sc = W > 700 ? 1.15 : 1;
      g.save(); g.translate(x, base); g.scale(dir * sc, sc);
      g.lineWidth = 2; g.strokeStyle = '#15171C';
      if (v.type === 'car') {
        g.fillStyle = c.fill;
        g.beginPath(); g.moveTo(-22, -16); g.lineTo(-12, -30); g.lineTo(12, -30); g.lineTo(24, -16); g.closePath(); g.fill(); g.stroke();
        rr(-36, -18, 72, 14, 6); g.fill(); g.stroke();
        g.fillStyle = '#D6ECFA'; g.beginPath(); g.moveTo(-17, -17); g.lineTo(-10, -27); g.lineTo(-1, -27); g.lineTo(-1, -17); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(3, -17); g.lineTo(3, -27); g.lineTo(11, -27); g.lineTo(19, -17); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = '#FFE38A'; g.fillRect(31, -14, 5, 4);
        wheel(-21, -3, 7); wheel(21, -3, 7);
      } else {
        g.fillStyle = '#23262D'; rr(-22, -36, 40, 8, 4); g.fill(); g.stroke();
        g.fillStyle = c.fill; g.beginPath(); g.moveTo(-22, -28); g.lineTo(-22, -6); g.lineTo(24, -6); g.lineTo(24, -14); g.lineTo(14, -28); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = '#D6ECFA'; g.beginPath(); g.moveTo(6, -26); g.lineTo(14, -26); g.lineTo(20, -16); g.lineTo(6, -16); g.closePath(); g.fill(); g.stroke();
        wheel(-15, -4, 6); wheel(17, -4, 6);
      }
      g.restore();
    }
    function draw() {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sky = H * .3, roadT = H * .42, roadB = H * .92;
      g.fillStyle = '#CFE8F7'; g.fillRect(0, 0, W, H);
      // buildings + trees
      for (let x = 0, i = 0; x < W; x += 70, i++) { g.fillStyle = ['#F3D9A4', '#E9C1B6', '#CFD8C4'][i % 3]; g.fillRect(x + 6, sky - 26 - (i % 3) * 10, 50, 26 + (i % 3) * 10 + 14); g.fillStyle = '#9BB8D3'; g.fillRect(x + 14, sky - 18 - (i % 3) * 10, 10, 8); g.fillRect(x + 36, sky - 18 - (i % 3) * 10, 10, 8); }
      g.fillStyle = '#B7D69A'; g.fillRect(0, sky + 14, W, roadT - sky - 14);
      g.fillStyle = '#D9D2C3'; g.fillRect(0, roadT - 8, W, 8); g.fillRect(0, roadB, W, H - roadB);
      g.fillStyle = '#8E949C'; g.fillRect(0, roadT, W, roadB - roadT);
      g.strokeStyle = '#FFF'; g.lineWidth = 3; g.setLineDash([18, 14]); g.beginPath(); g.moveTo(0, (roadT + roadB) / 2); g.lineTo(W, (roadT + roadB) / 2); g.stroke(); g.setLineDash([]);
      // vehicles
      const bases = [roadT + (roadB - roadT) * .42, roadB - 4];
      [0, 1].forEach(lane => TR.list.forEach(v => {
        if (v.lane !== lane) return;
        const p = (simT - v.t) / LANE_T[lane];
        if (p <= 0 || p >= 1) return;
        const span = W + 90, x = v.lane === 0 ? -45 + p * span : W + 45 - p * span;
        vehicle(v, x, bases[lane]);
      }));
    }

    // ---------- loop ----------
    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      simT = Math.min(DUR, simT + dt);
      draw(); drawTime();
      if (simT >= DUR) { finishTally(); return; }
      raf = requestAnimationFrame(frame);
    }
    function drawTime() {
      const left = Math.max(0, Math.ceil(DUR - simT));
      $('#csTime').textContent = phase === 'list' ? 'List mode' : `${left} s left`;
      $('#csBar').style.width = (phase === 'list' ? 0 : (DUR - simT) / DUR * 100) + '%';
    }
    function setTally(on) { ctx.el.querySelectorAll('.tb').forEach(b => { b.disabled = !on; }); $('#csUndo').disabled = !on || !hist.length; }
    function overlay(html) { $('#csOver').innerHTML = html; $('#csOver').hidden = !html; }

    function start() {
      phase = 'run'; simT = 0; last = performance.now();
      overlay(''); setTally(true); $('#csPause').disabled = false; $('#csPause').textContent = 'Pause';
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      if (phase === 'run') { phase = 'paused'; cancelAnimationFrame(raf); raf = 0; $('#csPause').textContent = 'Resume'; overlay(`<div><b>Paused</b><div class="mt"><button class="btn primary" id="csRes2">Resume</button></div></div>`); $('#csRes2').onclick = pause; }
      else if (phase === 'paused') { phase = 'run'; last = performance.now(); overlay(''); $('#csPause').textContent = 'Pause'; raf = requestAnimationFrame(frame); }
    }
    function listMode() {
      if (phase === 'done') return;
      cancelAnimationFrame(raf); raf = 0; phase = 'list'; mode2 = 'list';
      $('#csPause').disabled = true; $('#csList').disabled = true; $('#csRoad').hidden = true;
      ctx.el.querySelector('.meter').hidden = true;
      $('#csListBox').innerHTML = `<p class="small mt">Here are all <b>${TR.total}</b> vehicles in the order they passed. Count each colour with the buttons below, then press “I've finished counting”.</p>
        <div class="tblwrap mt" style="max-height:300px; overflow:auto"><table class="tbl"><thead><tr><th>#</th><th>Time</th><th>Colour</th><th>Type</th></tr></thead><tbody>
        ${TR.list.map((v, i) => `<tr><td>${i + 1}</td><td>${Math.floor(v.t)} s</td><td class="nw"><span class="sw" style="display:inline-block; width:14px; height:14px; border-radius:4px; vertical-align:-2px; background:${COLS.find(c => c.k === v.col).fill}"></span> ${COLS.find(c => c.k === v.col).name}</td><td>${v.type === 'car' ? 'Car' : 'Auto-rickshaw'}</td></tr>`).join('')}</tbody></table></div>`;
      setTally(true); $('#csDone').hidden = false; drawTime();
    }
    function finishTally() {
      cancelAnimationFrame(raf); raf = 0; phase = 'done'; setTally(false); $('#csPause').disabled = true; $('#csList').disabled = true; $('#csDone').hidden = true;
      if (mode2 === 'anim') { overlay(`<div><b>Time's up!</b><div class="small">${TR.total} vehicles passed. Scroll down to compare.</div></div>`); drawTime(); }
      ctx.data.tallied = 1; ctx.save(); ctx.sfx('pop');
      results();
    }

    function tap(k) {
      if (!(phase === 'run' || phase === 'list')) return;
      tally[k]++; hist.push(k); ctx.sfx('tick');
      $('#csN' + k).textContent = tally[k]; $('#csUndo').disabled = false;
    }

    // ---------- results + questions ----------
    function results() {
      const rowsHTML = COLS.map(c => `<tr><td class="nw"><span class="sw" style="display:inline-block; width:16px; height:16px; border-radius:4px; vertical-align:-3px; background:${c.fill}"></span> ${c.name}</td><td>${tally[c.k]}</td><td>${tallySVG(TR.actual[c.k])}</td><td><b>${TR.actual[c.k]}</b></td></tr>`).join('');
      const yourTot = Object.values(tally).reduce((a, b) => a + b, 0);
      const exact = COLS.filter(c => tally[c.k] === TR.actual[c.k]).length;
      const cars = TR.list.filter(v => v.type === 'car').length;
      $('#csRes').innerHTML = `<div class="lab-box"><h4>Frequency table</h4>
        <p class="small muted">Tally marks are drawn in groups of five (four lines and a fifth line across). The <b>frequency</b> is how many times each colour appeared.</p>
        <div class="tblwrap mt"><table class="tbl"><thead><tr><th>Colour</th><th>You</th><th>Tally (actual)</th><th>Freq.</th></tr></thead><tbody>${rowsHTML}
          <tr><td><b>Total</b></td><td>${yourTot}</td><td></td><td><b>${TR.total}</b></td></tr></tbody></table></div>
        <p class="small mt">${exact === 4 ? 'Perfect counting — all four colours match!' : `You matched ${exact} of 4 colours exactly. Counting moving things is hard — that is why surveys check their data.`} By type: ${cars} cars and ${TR.total - cars} auto-rickshaws.</p><button class="btn sm mt" id="csAgain">${ic('refresh')} Do the survey again</button></div>
        <div class="lab-box"><h4>Questions <span class="small muted">(use the actual frequencies)</span></h4><div class="stack mt" id="csQs"></div></div>`;
      drawQs();
      $('#csAgain').onclick = again;
    }
    function again() {
      cancelAnimationFrame(raf); raf = 0; phase = 'ready'; mode2 = 'anim'; simT = 0; hist = [];
      COLS.forEach(c => { tally[c.k] = 0; $('#csN' + c.k).textContent = 0; });
      $('#csRoad').hidden = false; ctx.el.querySelector('.meter').hidden = false; $('#csListBox').innerHTML = '';
      $('#csList').disabled = false; $('#csPause').disabled = true; $('#csPause').textContent = 'Pause'; $('#csDone').hidden = true; setTally(false);
      $('#csRes').innerHTML = '';
      overlay(`<div><button class="btn primary big" id="csGo">${ic('play')} Start the survey</button></div>`); $('#csGo').onclick = start;
      resize(); drawTime(); $('#csTop').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function drawQs() {
      $('#csQs').innerHTML = QS.map((q, i) => `<div class="qrow"><div><b>Q${i + 1}.</b> ${q.text} ${ok[i] ? '<span class="chip ok">Correct</span>' : ''}</div>
        ${ok[i] ? `<div class="small">${esc(q.why)}</div>` : q.kind === 'num'
          ? `<div class="numin"><label class="sr" for="csNum">Total vehicles</label><input class="input" id="csNum" inputmode="numeric"><button class="btn sm" data-q="${i}">Check</button></div>`
          : `<div class="opts">${q.opts.map(o => `<button class="opt" data-q="${i}" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`}
        <div aria-live="polite">${qMsg[i]}</div></div>`).join('');
      ctx.el.querySelectorAll('#csQs [data-q]').forEach(b => b.onclick = () => answer(+b.dataset.q, b.dataset.o));
      const n = $('#csNum'); if (n) n.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); answer(1); } });
    }
    function answer(i, o) {
      const q = QS[i];
      let good;
      if (q.kind === 'num') { const v = $('#csNum').value.trim(); if (!/^\d+$/.test(v)) { ctx.toast('Type a whole number.'); return; } good = +v === q.ans; }
      else good = o === q.ans;
      if (good) { ok[i] = true; qMsg[i] = ''; ctx.sfx('ok'); }
      else { ctx.sfx('bad'); qMsg[i] = `<div class="fb bad small"><div><b>Not quite.</b> ${['Look for the biggest number in the Frequency column.', 'Add up all the frequencies.', `Fraction = red vehicles ÷ all vehicles, then simplify.`, 'Which option checks the data a second way?'][i]}</div></div>`; }
      drawQs();
      if (ok.every(Boolean)) end();
    }
    function end() {
      if ($('#csEnd').innerHTML) return;
      $('#csEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>Survey complete! You collected <b>primary data</b> by observation, organised it with <b>tally marks</b> into a <b>frequency table</b>, found the <b>mode</b> (${mode.name}) and a <b>fraction</b> of the whole. Collecting, organising and interpreting data like this is <b>Statistics</b> — and reliable data makes for reliable AI.</div></div>`;
      if (!fired && !ctx.done && !ctx._completed) {
        fired = true; ctx._completed = true; ctx.data.completed = 1; ctx.save();
        ctx.complete(`Tallied ${TR.total} vehicles${mode2 === 'list' ? ' from the list' : ''}, built a frequency table and answered 4 questions (mode: ${mode.name}).`);
      }
    }

    // ---------- events ----------
    const onKey = e => {
      if (!(phase === 'run' || phase === 'list') || e.target.closest && e.target.closest('input,textarea,select')) return;
      const i = ['1', '2', '3', '4'].indexOf(e.key); if (i >= 0) { e.preventDefault(); tap(COLS[i].k); }
    };
    window.addEventListener('keydown', onKey);
    ctx.el.querySelectorAll('.tb').forEach(b => b.onclick = () => tap(b.dataset.c));
    $('#csUndo').onclick = () => { const k = hist.pop(); if (!k) return; tally[k]--; $('#csN' + k).textContent = tally[k]; $('#csUndo').disabled = !hist.length; };
    $('#csPause').onclick = pause;
    $('#csList').onclick = listMode;
    $('#csDone').onclick = finishTally;
    overlay(`<div><p style="font-weight:800">${TR.total > 0 ? 'Get ready! Vehicles will pass for 60 seconds.' : ''}</p><div class="mt"><button class="btn primary big" id="csGo">${ic('play')} Start the survey</button></div></div>`);
    $('#csGo').onclick = start;
    resize();
    return () => { cancelAnimationFrame(raf); raf = 0; ro.disconnect(); window.removeEventListener('keydown', onKey); phase = 'gone'; };
  }
};
