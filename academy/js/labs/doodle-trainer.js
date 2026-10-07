import { esc, ic } from '../core/util.js';

const N = 20, SIZE = 160, SCALE = 2, MIN = 6, MAX = 15, K = 3, EVAL_PER = 3;
const COLS = ['#2F6FED', '#E8453C', '#109A66'];
const STEPS = ['Name classes', 'Collect', 'Train', 'Test', 'Evaluate'];

/* ---------- bitmap helpers ---------- */
// Crop the drawing to its bounding box, scale the longer side to 18 cells and centre it in a 20×20 grid.
function rasterize(strokes) {
  const pts = strokes.flat();
  if (!pts.length) return null;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  pts.forEach(([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); });
  const size = Math.max(x1 - x0, y1 - y0);
  if (size < 12) return null;
  const s = (N - 3) / size, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const bits = new Uint8Array(N * N);
  const mark = (x, y) => {
    const gx = Math.min(N - 1, Math.max(0, Math.floor((x - cx) * s + N / 2))), gy = Math.min(N - 1, Math.max(0, Math.floor((y - cy) * s + N / 2)));
    bits[gy * N + gx] = 1;
  };
  strokes.forEach(st => {
    if (st.length === 1) mark(...st[0]);
    for (let i = 1; i < st.length; i++) {
      const [ax, ay] = st[i - 1], [bx, by] = st[i];
      const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) * s * 4));
      for (let t = 0; t <= steps; t++) mark(ax + (bx - ax) * t / steps, ay + (by - ay) * t / steps);
    }
  });
  return bits;
}
const toHex = bits => { let h = ''; for (let i = 0; i < bits.length; i += 4) h += (bits[i] << 3 | bits[i + 1] << 2 | bits[i + 2] << 1 | bits[i + 3]).toString(16); return h; };
const fromHex = hex => { const b = new Uint8Array(N * N); for (let i = 0; i < hex.length; i++) { const v = parseInt(hex[i], 16); for (let j = 0; j < 4; j++) b[i * 4 + j] = (v >> (3 - j)) & 1; } return b; };

// A small blur, so two lines that are one cell apart still count as similar.
function features(bits) {
  const f = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!bits[y * N + x]) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      f[ny * N + nx] += dx === 0 && dy === 0 ? 1 : dx === 0 || dy === 0 ? 0.5 : 0.25;
    }
  }
  return f;
}
const dist = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; s += d * d; } return Math.sqrt(s); };

function thumb(bits, color = '#15171C', px = 2) {
  const c = document.createElement('canvas'); c.width = N * px; c.height = N * px;
  const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = color;
  for (let i = 0; i < N * N; i++) if (bits[i]) g.fillRect((i % N) * px, Math.floor(i / N) * px, px, px);
  return c.toDataURL();
}

const CSS = `
.lab-doodle-trainer .dt-steps{display:flex; flex-wrap:wrap; gap:6px;}
.lab-doodle-trainer .dt-steps .chip.now{background:var(--gold);}
.lab-doodle-trainer .dt-steps .chip.past{background:var(--good-wash); border-color:var(--good); color:#0B6B47;}
.lab-doodle-trainer .dt-pad{display:grid; gap:10px; justify-items:center;}
.lab-doodle-trainer .dt-pad canvas{width:100%; max-width:300px; aspect-ratio:1; cursor:crosshair;}
.lab-doodle-trainer .dt-class{background:#fff; border:var(--b2); border-radius:12px; padding:10px; display:grid; gap:8px; border-left-width:8px;}
.lab-doodle-trainer .dt-thumbs{display:flex; flex-wrap:wrap; gap:5px;}
.lab-doodle-trainer .dt-thumbs button{padding:0; border:2px solid var(--line); border-radius:6px; background:#fff; width:40px; height:40px; overflow:hidden;}
.lab-doodle-trainer .dt-thumbs button:hover{border-color:var(--bad);}
.lab-doodle-trainer .dt-thumbs img{width:100%; height:100%; image-rendering:pixelated; display:block;}
.lab-doodle-trainer .dt-bar{display:grid; grid-template-columns:minmax(64px,auto) 1fr 44px; gap:8px; align-items:center; font-weight:800; font-size:.92rem;}
.lab-doodle-trainer .dt-nn{display:flex; gap:8px; flex-wrap:wrap;}
.lab-doodle-trainer .dt-nn figure{display:grid; gap:2px; justify-items:center; font-size:.72rem; font-weight:800;}
.lab-doodle-trainer .dt-nn img{width:48px; height:48px; image-rendering:pixelated; border:2px solid var(--line); border-radius:6px;}
.lab-doodle-trainer .dt-cm td.diag{background:var(--good-wash); font-weight:900;}
.lab-doodle-trainer .dt-cm td.off{background:var(--bad-wash);}
.lab-doodle-trainer .dt-cm td, .lab-doodle-trainer .dt-cm th{text-align:center; padding:6px 5px; font-size:.86rem; overflow-wrap:anywhere;}
.lab-doodle-trainer .dt-names{display:grid; gap:10px;}
`;

export default {
  title: 'Doodle Trainer: teach a machine to see',
  mount(ctx) {
    const D = ctx.data;
    if (!Array.isArray(D.classes) || D.classes.length !== 3) { D.classes = null; D.samples = [[], [], []]; }
    if (!Array.isArray(D.samples)) D.samples = [[], [], []];
    let phase = !D.classes ? 'name' : D.trained && D.samples.every(s => s.length >= MIN) ? 'test' : 'collect';
    let strokes = [], cur = null, raf = 0, completed = false, model = null, evalList = [], evalRes = [], flash = '', trainTimer = 0;

    const enough = () => D.samples.every(s => s.length >= MIN);
    function buildModel() {
      model = [];
      D.samples.forEach((list, c) => list.forEach(hex => { const b = fromHex(hex); model.push({ c, b, f: features(b) }); }));
    }
    function predict(bits) {
      const f = features(bits);
      const nn = model.map(m => ({ ...m, d: dist(f, m.f) })).sort((a, b) => a.d - b.d).slice(0, K);
      const votes = [0, 0, 0]; nn.forEach(n => votes[n.c]++);
      const top = Math.max(...votes);
      const pred = votes[nn[0].c] === top ? nn[0].c : votes.indexOf(top);   // a tie goes to the single nearest example
      return { pred, votes, nn };
    }

    /* ---------- layout ---------- */
    function shell(right, withPad = true) {
      const si = { name: 0, collect: 1, test: 3, eval: 4, result: 4 }[phase];
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-doodle-trainer stack">
          <p class="lab-intro">Like Google’s <b>Teachable Machine</b>: you choose 3 classes, draw examples (the <b>training data</b>), the computer learns from them, then you check it on <b>new drawings</b> (the <b>testing data</b>).</p>
          <div class="row between"><b>Goal: train your model, then evaluate it on 9 new drawings</b>${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</div>
          <div class="dt-steps" aria-label="Steps">${STEPS.map((s, i) => `<span class="chip ${i === si ? 'now' : i < si ? 'past' : 'dim'}">${i + 1}. ${s}</span>`).join('')}</div>
          ${withPad ? `<div class="lab-grid">
            <div class="lab-box dt-pad">
              <h4 id="dtPadH" style="justify-self:start">Draw here</h4>
              <canvas class="lab-canvas" id="dtCv" width="${SIZE * SCALE}" height="${SIZE * SCALE}" aria-label="Drawing pad"></canvas>
              <div class="row"><button class="btn sm" id="dtClear">${ic('refresh')} Clear</button><span class="small muted" id="dtPadNote"></span></div>
            </div>
            <div class="lab-box stack" id="dtRight">${right}</div>
          </div>` : `<div class="lab-box stack" id="dtRight">${right}</div>`}
          <div id="dtEnd"></div>
        </div>`;
      if (withPad) setupPad();
    }
    const $ = s => ctx.el.querySelector(s);

    /* ---------- drawing pad ---------- */
    function setupPad() {
      const cv = $('#dtCv'), g = cv.getContext('2d');
      strokes = []; cur = null;
      const redraw = () => {
        g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height);
        g.strokeStyle = '#15171C'; g.lineWidth = 6 * SCALE; g.lineCap = 'round'; g.lineJoin = 'round';
        strokes.forEach(st => { g.beginPath(); st.forEach(([x, y], i) => (i ? g.lineTo(x * SCALE, y * SCALE) : g.moveTo(x * SCALE, y * SCALE))); if (st.length === 1) g.lineTo(st[0][0] * SCALE + 0.1, st[0][1] * SCALE); g.stroke(); });
      };
      const pos = e => { const r = cv.getBoundingClientRect(); return [Math.max(0, Math.min(SIZE, (e.clientX - r.left) * SIZE / r.width)), Math.max(0, Math.min(SIZE, (e.clientY - r.top) * SIZE / r.height))]; };
      cv.addEventListener('pointerdown', e => { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } cur = [pos(e)]; strokes.push(cur); redraw(); });
      cv.addEventListener('pointermove', e => {
        if (!cur) return;
        const p = pos(e), l = cur[cur.length - 1];
        if (Math.hypot(p[0] - l[0], p[1] - l[1]) < 1.5) return;
        cur.push(p); redraw();
        if (phase === 'test' && !raf) raf = requestAnimationFrame(() => { raf = 0; livePredict(); });
      });
      const up = () => { if (!cur) return; cur = null; onStroke(); };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      $('#dtClear').onclick = () => { strokes = []; redraw(); onStroke(); };
      redraw();
    }
    function onStroke() {
      if (phase === 'test') livePredict();
      if (phase === 'collect') ctx.el.querySelectorAll('[data-add]').forEach(b => { b.disabled = !strokes.length || D.samples[+b.dataset.add].length >= MAX; });
      if (phase === 'eval') { const b = $('#dtSubmit'); if (b) b.disabled = !strokes.length; }
    }
    function grab() {
      const bits = rasterize(strokes);
      if (!bits) { $('#dtPadNote').textContent = strokes.length ? 'Draw a bit bigger.' : 'Draw something first.'; ctx.sfx('bad'); return null; }
      $('#dtPadNote').textContent = '';
      return bits;
    }

    /* ---------- phases ---------- */
    function renderName() {
      const ex = D.classes || ['', '', ''], ph = ['Sun', 'House', 'Fish'];
      shell(`<h4>Step 1 · Name your 3 classes</h4>
        <p class="small muted">Pick three things that are quick to draw and look different, e.g. sun, house, fish, or tick, cross, circle.</p>
        <form class="dt-names" id="dtNames">${[0, 1, 2].map(i => `<div class="field"><label for="dtN${i}">Class ${i + 1}</label><input class="input" id="dtN${i}" maxlength="16" placeholder="${ph[i]}" value="${esc(ex[i] || '')}" style="border-left:8px solid ${COLS[i]}"></div>`).join('')}
          <p class="err" id="dtNameErr" aria-live="polite"></p>
          <button class="btn primary" type="submit">Start collecting ${ic('arrow')}</button></form>`, false);
      $('#dtNames').onsubmit = e => {
        e.preventDefault();
        const names = [0, 1, 2].map(i => ($(`#dtN${i}`).value.trim() || ph[i]).slice(0, 16));
        if (new Set(names.map(n => n.toLowerCase())).size < 3) { $('#dtNameErr').textContent = 'Give each class a different name.'; return; }
        const changed = D.classes && D.classes.some((n, i) => n !== names[i]);
        D.classes = names;
        if (changed) D.trained = false;
        ctx.save(); phase = 'collect'; ctx.sfx('pop'); render();
      };
    }

    function renderCollect() {
      shell(`<h4>Step 2 · Collect training data</h4>
        <p class="small muted">Draw one example, then tap the class it belongs to. At least ${MIN} per class (max ${MAX}). Vary them a little, like different people would. Tap a thumbnail to delete it.</p>
        ${D.classes.map((n, c) => `<div class="dt-class" style="border-left-color:${COLS[c]}">
          <div class="row between"><b>${esc(n)}</b><span class="chip ${D.samples[c].length >= MIN ? 'ok' : ''}">${D.samples[c].length} / ${MIN}</span></div>
          <div class="dt-thumbs">${D.samples[c].map((hx, i) => `<button data-del="${c}:${i}" aria-label="Delete ${esc(n)} sample ${i + 1}"><img alt="" src="${thumb(fromHex(hx), COLS[c])}"></button>`).join('')}</div>
          <button class="btn sm" data-add="${c}" disabled>${ic('down')} Add drawing as “${esc(n)}”</button></div>`).join('')}
        <p class="small" aria-live="polite">${flash}</p>
        <div class="row"><button class="btn primary" id="dtTrain" ${enough() ? '' : 'disabled'}>${ic('spark')} Train model</button><button class="linkbtn" id="dtRename">Rename classes</button></div>`);
      $('#dtPadH').textContent = 'Draw a training example';
      ctx.el.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        const c = +b.dataset.add, bits = grab();
        if (!bits) return;
        if (D.samples[c].length >= MAX) return;
        D.samples[c].push(toHex(bits)); D.trained = false; ctx.save(); ctx.sfx('pop');
        flash = `Added to “${esc(D.classes[c])}”: the drawing was cropped, centred and shrunk to a 20×20 grid of 0s and 1s.`;
        renderCollect();
      });
      ctx.el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
        const [c, i] = b.dataset.del.split(':').map(Number);
        D.samples[c].splice(i, 1); D.trained = false; ctx.save(); flash = 'Sample deleted.'; renderCollect();
      });
      $('#dtTrain').onclick = train;
      $('#dtRename').onclick = () => { phase = 'name'; render(); };
    }

    function train() {
      if (!enough()) return;
      const total = D.samples.reduce((a, s) => a + s.length, 0);
      $('#dtRight').innerHTML = `<h4>Step 3 · Training…</h4><div class="py-status"><span class="spin"></span> Preparing ${total} examples</div><div class="meter"><i id="dtTm" style="width:0%"></i></div>`;
      let p = 0;
      const tick = () => {
        p += 20; const m = $('#dtTm'); if (m) m.style.width = p + '%';
        if (p < 100) { trainTimer = setTimeout(tick, 120); return; }
        buildModel(); D.trained = true; ctx.save(); phase = 'test'; flash = ''; ctx.sfx('ok'); render();
      };
      trainTimer = setTimeout(tick, 120);
    }

    function renderTest() {
      if (!model) buildModel();
      const total = model.length;
      shell(`<h4>Step 4 · Test it live</h4>
        <p class="small muted">The model learned from <b>${total} examples</b>. It uses <b>k-nearest neighbours (k = 3)</b>: it finds the 3 training drawings most similar to yours, and they vote.</p>
        <div id="dtLive" aria-live="polite"><p class="small">Draw something on the pad.</p></div>
        <div class="row"><button class="btn primary" id="dtEval">${ic('target')} Evaluate on new drawings</button><button class="btn sm" id="dtMore">Add more training data</button></div>`);
      $('#dtPadH').textContent = 'Draw to test';
      $('#dtEval').onclick = startEval;
      $('#dtMore').onclick = () => { phase = 'collect'; render(); };
    }
    function livePredict() {
      const box = $('#dtLive'); if (!box) return;
      const bits = rasterize(strokes);
      if (!bits) { box.innerHTML = '<p class="small">Draw something on the pad.</p>'; return; }
      const { pred, votes, nn } = predict(bits);
      box.innerHTML = `<p style="font-family:var(--head);font-weight:800;font-size:1.3rem">I think it’s a <span style="color:${COLS[pred]}">${esc(D.classes[pred])}</span></p>
        <div class="stack" style="gap:6px">${D.classes.map((n, c) => `<div class="dt-bar"><span>${esc(n)}</span><div class="meter"><i style="width:${votes[c] / K * 100}%;background:${COLS[c]}"></i></div><span>${Math.round(votes[c] / K * 100)}%</span></div>`).join('')}</div>
        <p class="tiny muted mt">Confidence = share of the 3 nearest neighbours’ votes. The 3 most similar training drawings:</p>
        <div class="dt-nn">${nn.map(m => `<figure><img alt="${esc(D.classes[m.c])} example" src="${thumb(m.b, COLS[m.c])}">${esc(D.classes[m.c])}</figure>`).join('')}</div>`;
    }

    function startEval() {
      evalList = ctx.rng.shuffle([0, 1, 2].flatMap(c => Array(EVAL_PER).fill(c)));
      evalRes = []; phase = 'eval'; render();
    }
    function renderEval() {
      const i = evalRes.length, want = evalList[i];
      const last = evalRes[i - 1];
      shell(`<h4>Step 5 · Evaluate on testing data</h4>
        <p class="small muted">Draw <b>new</b> pictures the model has never seen. These are <b>testing data</b>, so they are <b>not</b> added to training.</p>
        <div class="qcount" style="margin:0"><span>Test ${i + 1} of ${evalList.length}</span><div class="dots" aria-hidden="true">${evalList.map((_, j) => `<i class="${j < i ? (evalRes[j][0] === evalRes[j][1] ? 'ok' : 'no') : j === i ? 'now' : ''}"></i>`).join('')}</div></div>
        <p style="font-family:var(--head);font-weight:800;font-size:1.4rem">Draw a <span style="color:${COLS[want]}">${esc(D.classes[want])}</span></p>
        <p class="small" aria-live="polite">${last ? `Last one: you drew <b>${esc(D.classes[last[0]])}</b>, model said <b>${esc(D.classes[last[1]])}</b> ${last[0] === last[1] ? '✓' : '✗'}` : ''}</p>
        <div class="row"><button class="btn primary" id="dtSubmit" disabled>Submit drawing ${ic('arrow')}</button><button class="btn sm" id="dtQuit">Back to testing</button></div>`);
      $('#dtPadH').textContent = `Test drawing ${i + 1}`;
      $('#dtSubmit').onclick = () => {
        const bits = grab(); if (!bits) return;
        evalRes.push([want, predict(bits).pred]); ctx.sfx('tick');
        if (evalRes.length >= evalList.length) { phase = 'result'; render(); } else renderEval();
      };
      $('#dtQuit').onclick = () => { phase = 'test'; render(); };
    }

    function renderResult() {
      const cm = [0, 1, 2].map(() => [0, 0, 0]);
      evalRes.forEach(([a, p]) => cm[a][p]++);
      const right = cm[0][0] + cm[1][1] + cm[2][2], acc = Math.round(right / evalRes.length * 100);
      const worst = [0, 1, 2].map(c => ({ c, miss: EVAL_PER - cm[c][c] })).sort((a, b) => b.miss - a.miss)[0];
      shell(`<div class="row between"><h4>Evaluation results</h4><span class="chip gold">Accuracy ${acc}%</span></div>
        <div class="tblwrap"><table class="tbl dt-cm"><caption class="small muted" style="caption-side:top;text-align:left;padding-bottom:6px">Confusion matrix: rows = what you drew (actual), columns = what the model said (predicted)</caption>
          <thead><tr><th><span class="tiny">actual ↓<br>predicted →</span></th>${D.classes.map(n => `<th>${esc(n)}</th>`).join('')}</tr></thead>
          <tbody>${cm.map((row, a) => `<tr><th scope="row" style="background:${COLS[a]}">${esc(D.classes[a])}</th>${row.map((v, p) => `<td class="${a === p ? 'diag' : v ? 'off' : ''}">${v}${a === p ? ' ✓' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
        <div class="formula">Accuracy = correct ÷ total = ${right} ÷ ${evalRes.length} = ${acc}%</div>
        <p class="small">${acc === 100 ? 'Perfect on this test set! Try harder test drawings to see where it breaks.' : `Most mistakes: <b>${esc(D.classes[worst.c])}</b>. Adding more varied training drawings of it usually helps.`} Off-diagonal cells are mistakes; the green diagonal is correct.</p>
        <div class="row"><button class="btn sm" id="dtMore">Add training data</button><button class="btn sm" id="dtAgain">${ic('refresh')} Evaluate again</button></div>`, false);
      $('#dtMore').onclick = () => { phase = 'collect'; render(); };
      $('#dtAgain').onclick = startEval;
      $('#dtEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>Your <b>training data</b> (${model.length} labelled drawings) taught the model; the <b>testing data</b> (9 new drawings it had never seen) checked it fairly. <b>Accuracy</b> = correct predictions ÷ all predictions = ${acc}%. This is a <b>learning-based</b> Computer Vision model.</div></div>`;
      D.evalAcc = acc; ctx.save();
      if (!completed) {
        completed = true; ctx.sfx('win');
        if (!ctx.done) ctx.complete(`Trained a 3-class doodle classifier and evaluated it on 9 test drawings: ${acc}% accuracy.`);
      }
    }

    function render() {
      flash = phase === 'collect' ? flash : '';
      ({ name: renderName, collect: renderCollect, test: renderTest, eval: renderEval, result: renderResult })[phase]();
    }
    render();
    return () => { cancelAnimationFrame(raf); clearTimeout(trainTimer); };
  }
};
