import { esc, ic } from '../core/util.js';

// Quick, Draw!-style Computer Vision game, recognised with the $1 Unistroke
// Recognizer (Wobbrock, Wilson & Li, 2007). Templates are generated in code.

/* ---------------- $1 Unistroke Recognizer ---------------- */

const N = 64, SIZE = 250, HALF_DIAG = 0.5 * Math.sqrt(SIZE * SIZE + SIZE * SIZE);
const RANGE = (45 * Math.PI) / 180, PREC = (2 * Math.PI) / 180, PHI = 0.5 * (-1 + Math.sqrt(5));

const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
function pathLength(pts) { let d = 0; for (let i = 1; i < pts.length; i++) d += dist(pts[i - 1], pts[i]); return d; }
function centroid(pts) { let x = 0, y = 0; pts.forEach(p => { x += p.x; y += p.y; }); return { x: x / pts.length, y: y / pts.length }; }

export function resample(points, n = N) {
  const pts = points.map(p => ({ x: p.x, y: p.y }));
  const I = pathLength(pts) / (n - 1);
  if (!(I > 0)) return Array.from({ length: n }, () => ({ ...pts[0] }));
  let D = 0; const out = [{ ...pts[0] }];
  for (let i = 1; i < pts.length; i++) {
    const d = dist(pts[i - 1], pts[i]);
    if (D + d >= I) {
      const q = { x: pts[i - 1].x + ((I - D) / d) * (pts[i].x - pts[i - 1].x), y: pts[i - 1].y + ((I - D) / d) * (pts[i].y - pts[i - 1].y) };
      out.push(q); pts.splice(i, 0, q); D = 0;
    } else D += d;
  }
  while (out.length < n) out.push({ ...pts[pts.length - 1] }); // rounding can leave us one short
  return out.slice(0, n);
}
function rotateBy(pts, a) {
  const c = centroid(pts), cos = Math.cos(a), sin = Math.sin(a);
  return pts.map(p => ({ x: (p.x - c.x) * cos - (p.y - c.y) * sin + c.x, y: (p.x - c.x) * sin + (p.y - c.y) * cos + c.y }));
}
const indicativeAngle = pts => { const c = centroid(pts); return Math.atan2(c.y - pts[0].y, c.x - pts[0].x); };
function scaleTo(pts, size = SIZE) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  pts.forEach(p => { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
  const w = Math.max(maxX - minX, 1e-6), h = Math.max(maxY - minY, 1e-6);
  return pts.map(p => ({ x: p.x * (size / w), y: p.y * (size / h) }));
}
function translateTo(pts, to = { x: 0, y: 0 }) { const c = centroid(pts); return pts.map(p => ({ x: p.x + to.x - c.x, y: p.y + to.y - c.y })); }
export function normalize(points) {
  let p = resample(points, N);
  p = rotateBy(p, -indicativeAngle(p));
  p = scaleTo(p, SIZE);
  return translateTo(p);
}
function pathDistance(a, b) { let d = 0; for (let i = 0; i < a.length; i++) d += dist(a[i], b[i]); return d / a.length; }
const distAtAngle = (pts, T, a) => pathDistance(rotateBy(pts, a), T);
function distanceAtBestAngle(pts, T, a = -RANGE, b = RANGE) {
  let x1 = PHI * a + (1 - PHI) * b, f1 = distAtAngle(pts, T, x1);
  let x2 = (1 - PHI) * a + PHI * b, f2 = distAtAngle(pts, T, x2);
  while (Math.abs(b - a) > PREC) {
    if (f1 < f2) { b = x2; x2 = x1; f2 = f1; x1 = PHI * a + (1 - PHI) * b; f1 = distAtAngle(pts, T, x1); }
    else { a = x1; x1 = x2; f1 = f2; x2 = (1 - PHI) * a + PHI * b; f2 = distAtAngle(pts, T, x2); }
  }
  return f1 < f2 ? { d: f1, a: x1 } : { d: f2, a: x2 };
}

/* ---------------- templates generated in code ---------------- */

const SHAPES = [
  { id: 'circle', name: 'circle' }, { id: 'triangle', name: 'triangle' }, { id: 'square', name: 'square' },
  { id: 'star', name: 'star' }, { id: 'zigzag', name: 'zigzag' }, { id: 'tick', name: 'tick ✓' }
];
const SNAME = Object.fromEntries(SHAPES.map(s => [s.id, s.name]));

function polyline(vs, steps = 16) { // densify straight segments
  const out = [];
  for (let i = 0; i < vs.length - 1; i++) for (let k = 0; k < steps; k++) { const t = k / steps; out.push({ x: vs[i][0] + (vs[i + 1][0] - vs[i][0]) * t, y: vs[i][1] + (vs[i + 1][1] - vs[i][1]) * t }); }
  const l = vs[vs.length - 1]; out.push({ x: l[0], y: l[1] });
  return out;
}
function closedVariants(vs) { // every starting vertex, both directions
  const out = [];
  for (const dir of [1, -1]) for (let s = 0; s < vs.length; s++) {
    const seq = []; for (let k = 0; k <= vs.length; k++) seq.push(vs[((s + dir * k) % vs.length + vs.length) % vs.length]);
    out.push(polyline(seq));
  }
  return out;
}
const rev = pts => pts.slice().reverse();
const STAR_V = [0, 2, 4, 1, 3].map(k => { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; return [Math.cos(a) * 100, Math.sin(a) * 100]; });
export const BASE = { // one clean outline per shape, also used to draw the prompt icon
  circle: Array.from({ length: 65 }, (_, i) => { const a = -Math.PI / 2 + i / 64 * Math.PI * 2; return [Math.cos(a) * 100, Math.sin(a) * 100]; }),
  triangle: [[0, -100], [95, 70], [-95, 70], [0, -100]],
  square: [[-90, -90], [90, -90], [90, 90], [-90, 90], [-90, -90]],
  star: [...STAR_V, STAR_V[0]],
  zigzag: [[-100, 40], [-60, -40], [-20, 40], [20, -40], [60, 40], [100, -40]],
  tick: [[-90, 0], [-35, 60], [95, -80]]
};

function buildTemplates() {
  const T = [];
  const add = (id, pts) => T.push({ id, pts: normalize(pts) });
  for (const dir of [1, -1]) for (const s of [-90, 0, 90, 180]) {
    add('circle', Array.from({ length: 65 }, (_, i) => { const a = (s * Math.PI / 180) + dir * i / 64 * Math.PI * 2; return { x: Math.cos(a) * 100, y: Math.sin(a) * 100 }; }));
  }
  closedVariants([[0, -100], [95, 70], [-95, 70]]).forEach(p => add('triangle', p));
  closedVariants([[-90, -90], [90, -90], [90, 90], [-90, 90]]).forEach(p => add('square', p));
  closedVariants(STAR_V).forEach(p => add('star', p));
  for (const segs of [3, 4, 5]) for (const up of [1, -1]) {
    const vs = Array.from({ length: segs + 1 }, (_, i) => [i * 50, (i % 2 ? -1 : 1) * up * 40]);
    const p = polyline(vs); add('zigzag', p); add('zigzag', rev(p));
  }
  for (const [a, b, c] of [[[-90, 0], [-35, 60], [95, -80]], [[-60, 10], [-30, 50], [80, -90]], [[-90, -20], [-45, 50], [90, -60]]]) {
    const p = polyline([a, b, c]); add('tick', p); add('tick', rev(p));
  }
  return T;
}
export const TEMPLATES = buildTemplates();

export function recognize(points) {
  if (!points || points.length < 5 || pathLength(points) < 20) return { ranked: [], cand: null };
  const cand = normalize(points);
  const best = {};
  TEMPLATES.forEach(t => {
    const r = distanceAtBestAngle(cand, t.pts);
    const score = Math.max(0, 1 - r.d / HALF_DIAG);
    if (!best[t.id] || score > best[t.id].score) best[t.id] = { id: t.id, score, angle: r.a, tpl: t.pts };
  });
  return { ranked: Object.values(best).sort((a, b) => b.score - a.score), cand };
}

/* ---------------- the lab ---------------- */

const ROUNDS = 6, SECONDS = 20, CW = 480, ACCEPT = 0.8;

const CSS = `
.lab-quickdraw .qd-stage{position:relative; max-width:440px; margin:0 auto; width:100%;}
.lab-quickdraw .qd-stage canvas{aspect-ratio:1/1; cursor:crosshair;}
.lab-quickdraw .qd-over{position:absolute; inset:0; display:grid; place-items:center; align-content:center; gap:10px; text-align:center; background:rgba(255,249,236,.94); border:var(--b2); border-radius:12px; padding:16px;}
.lab-quickdraw .qd-over .ask{font-family:var(--head); font-weight:800; font-size:1.5rem; line-height:1.15;}
.lab-quickdraw .qd-icon{width:84px; height:84px;}
.lab-quickdraw .qd-prompt{display:flex; align-items:center; gap:10px; flex-wrap:wrap;}
.lab-quickdraw .qd-prompt .qd-icon{width:40px; height:40px;}
.lab-quickdraw .gbar{display:grid; grid-template-columns:96px 1fr 46px; gap:8px; align-items:center; font-weight:800; font-size:.92rem;}
.lab-quickdraw .gbar.hit{color:#0B6B47;}
.lab-quickdraw .gbar.hit .meter i{background:var(--good);}
.lab-quickdraw .thumbs{display:grid; grid-template-columns:repeat(auto-fill,minmax(84px,1fr)); gap:10px;}
.lab-quickdraw .thumb{background:#fff; border:var(--b2); border-radius:12px; padding:6px; text-align:center; font-size:.8rem; font-weight:800;}
.lab-quickdraw .thumb.ok{border-color:var(--good); background:var(--good-wash);}
.lab-quickdraw .thumb.no{border-color:var(--bad); background:var(--bad-wash);}
.lab-quickdraw .thumb svg{width:100%; height:auto; display:block;}
.lab-quickdraw .seen svg{width:100%; max-width:220px; height:auto; display:block; margin:0 auto; background:#fff; border:var(--b2); border-radius:10px;}
`;

function shapeIcon(id, cls = 'qd-icon') {
  const pts = BASE[id].map(([x, y]) => `${x},${y}`).join(' ');
  return `<svg class="${cls}" viewBox="-120 -120 240 240" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="#15171C" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function thumbSVG(strokes) {
  const all = strokes.flat();
  if (!all.length) return '<svg viewBox="0 0 100 100"></svg>';
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  all.forEach(p => { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
  const s = Math.max(maxX - minX, maxY - minY, 1), k = 80 / s, ox = 50 - (minX + maxX) / 2 * k, oy = 50 - (minY + maxY) / 2 * k;
  return `<svg viewBox="0 0 100 100">${strokes.map(st => `<polyline points="${st.map(p => `${(p.x * k + ox).toFixed(1)},${(p.y * k + oy).toFixed(1)}`).join(' ')}" fill="none" stroke="#15171C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</svg>`;
}

export default {
  title: 'Quick, Draw! — can the AI guess your doodle?',
  mount(ctx) {
    ctx.el.classList.add('lab-quickdraw');
    const order = ctx.rng.shuffle(SHAPES.map(s => s.id));
    let round = 0, state = 'ready', strokes = [], cur = null, tLeft = SECONDS, timer = null, lastLive = 0, lastRes = null;
    const results = [];
    let completed = false;

    ctx.el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">Draw the shape you're asked for. The AI compares your doodle with example shapes it has stored and guesses what it is — live, while you draw. Tip: draw it in <b>one continuous stroke</b>.</p>
      <div class="banner"><span class="chip gold">Goal</span><span>Play <b>${ROUNDS} rounds</b> — one doodle per round, ${SECONDS} seconds each.</span></div>
      <div class="lab-grid">
        <div class="lab-box">
          <div class="row between mb"><div class="qd-prompt" id="qdPrompt"></div><span class="chip" id="qdRound"></span></div>
          <div class="qd-stage">
            <canvas class="lab-canvas" id="qdCanvas" width="${CW}" height="${CW}" aria-label="Drawing area"></canvas>
            <div class="qd-over" id="qdOver"></div>
          </div>
          <div class="meter mt" aria-hidden="true"><i id="qdTime" style="width:100%"></i></div>
          <div class="row mt between"><span class="small" style="font-weight:800"><span id="qdSecs" class="muted"></span> <span id="qdLive"></span></span>
            <div class="row"><button class="btn sm" id="qdClear">${ic('refresh')} Clear</button><button class="btn sm dark" id="qdDone">I'm done</button></div></div>
        </div>
        <div class="lab-box stack" style="gap:12px">
          <div><h4>AI's top 3 guesses</h4><div id="qdGuess" class="stack" style="gap:8px" aria-live="polite"></div></div>
          <p id="qdSay" class="small" style="font-weight:800" aria-live="polite"></p>
          <div class="seen"><h4>How the AI sees your doodle</h4><div id="qdSeen"></div>
            <p class="tiny muted mt">Blue dots: your drawing after the AI <b>resamples</b> it to 64 points, <b>rotates</b> it, <b>scales</b> it to a 250×250 square and <b>centres</b> it. Gold line: the closest stored example.</p></div>
        </div>
      </div>
      <div class="lab-box"><h4>Your doodles</h4><div class="thumbs mt" id="qdThumbs"></div></div>
      <div id="qdEnd"></div>`;

    const $ = s => ctx.el.querySelector(s);
    const cv = $('#qdCanvas'), g = cv.getContext('2d');

    function paint() {
      g.clearRect(0, 0, CW, CW);
      g.strokeStyle = '#EFE7D2'; g.lineWidth = 1;
      for (let i = 40; i < CW; i += 40) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, CW); g.moveTo(0, i); g.lineTo(CW, i); g.stroke(); }
      g.strokeStyle = '#15171C'; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round';
      strokes.forEach(st => { g.beginPath(); st.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)); if (st.length === 1) g.lineTo(st[0].x + 0.1, st[0].y); g.stroke(); });
    }
    const target = () => order[round];

    function setOverlay(html) { const o = $('#qdOver'); o.hidden = !html; o.innerHTML = html || ''; }
    function header() {
      $('#qdRound').textContent = `Round ${round + 1} / ${ROUNDS}`;
      $('#qdPrompt').innerHTML = results.length < ROUNDS ? `${shapeIcon(target())}<span><span class="tiny muted" style="display:block;font-weight:800">DRAW</span><b style="font-family:var(--head);font-size:1.3rem">a ${esc(SNAME[target()])}</b></span>` : '<b>All rounds played!</b>';
      $('#qdDone').disabled = $('#qdClear').disabled = state !== 'drawing';
    }
    function showTime() {
      $('#qdTime').style.width = (tLeft / SECONDS * 100) + '%';
      $('#qdTime').style.background = tLeft < 5 ? 'var(--coral)' : '';
      $('#qdSecs').textContent = state === 'drawing' ? `${Math.ceil(tLeft)} s left` : '';
    }

    function showGuesses(res) {
      lastRes = res;
      const top = res.ranked.slice(0, 3);
      $('#qdLive').textContent = top.length ? `· AI: ${SNAME[top[0].id]} ${Math.round(top[0].score * 100)}%` : '';
      $('#qdGuess').innerHTML = top.length ? top.map(r => `<div class="gbar ${r.id === target() ? 'hit' : ''}"><span>${esc(SNAME[r.id])}</span><div class="meter"><i style="width:${Math.round(r.score * 100)}%"></i></div><span>${Math.round(r.score * 100)}%</span></div>`).join('')
        : '<p class="small muted">Start drawing — guesses appear here.</p>';
      if (res.cand && top.length) {
        const b = top[0];
        const tpl = rotatePts(b.tpl, -b.angle);
        const P = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
        $('#qdSeen').innerHTML = `<svg viewBox="-160 -160 320 320" role="img" aria-label="Your normalised drawing compared with the closest ${esc(SNAME[b.id])} example">
          <rect x="-125" y="-125" width="250" height="250" fill="none" stroke="#E6DFCF" stroke-dasharray="6 6" stroke-width="2"/>
          <polyline points="${P(tpl)}" fill="none" stroke="#FFC800" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
          ${res.cand.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#2F6FED"/>`).join('')}
          <text x="-150" y="150" font-size="18" font-weight="800" fill="#5B606A">closest: ${esc(SNAME[b.id])}</text></svg>`;
      } else $('#qdSeen').innerHTML = '<p class="small muted">Nothing drawn yet.</p>';
    }
    function rotatePts(pts, a) { const c = Math.cos(a), s = Math.sin(a); return pts.map(p => ({ x: p.x * c - p.y * s, y: p.x * s + p.y * c })); }

    function startRound() {
      strokes = []; cur = null; tLeft = SECONDS; state = 'drawing'; paint(); setOverlay('');
      $('#qdSay').textContent = `Draw a ${SNAME[target()]}!`;
      showGuesses({ ranked: [] }); header(); showTime();
      clearInterval(timer);
      const t0 = performance.now();
      timer = setInterval(() => {
        tLeft = Math.max(0, SECONDS - (performance.now() - t0) / 1000); showTime();
        if (tLeft <= 0) endRound('time');
      }, 100);
      cv.focus?.();
    }

    function endRound(why) {
      if (state !== 'drawing') return;
      clearInterval(timer); timer = null; state = 'result';
      if (cur) { strokes.push(cur); cur = null; }
      const res = recognize(strokes.flat()); showGuesses(res);
      const top = res.ranked[0];
      const ok = !!top && top.id === target();
      results.push({ target: target(), ok, guess: top ? top.id : null, score: top ? top.score : 0, strokes: strokes.map(s => s.filter((_, i) => i % 2 === 0 || i === s.length - 1)) });
      ctx.sfx(ok ? 'ok' : 'bad');
      const msg = ok ? `Oh, I know — it's a ${SNAME[target()]}!`
        : top && top.score >= 0.7 ? `I thought it was a ${SNAME[top.id]}.${why === 'time' ? " Time's up!" : ''}`
        : top ? `Hmm, I'm not sure… maybe a ${SNAME[top.id]}?` : "Time's up — I couldn't see a drawing.";
      $('#qdSay').textContent = msg;
      thumbs();
      header();
      showTime();
      if (results.length >= ROUNDS) { setOverlay(`<div class="ask">${ok ? '🎉' : '🖍️'} ${esc(msg)}</div><p class="small muted">That was the last round.</p>`); finish(); }
      else setOverlay(`<div class="ask">${ok ? '🎉' : '🤔'} ${esc(msg)}</div><button class="btn primary" id="qdNext">Next round ${ic('arrow')}</button>`);
      const nb = $('#qdNext'); if (nb) { nb.onclick = () => { round++; ready(); }; nb.focus(); }
    }

    function ready() {
      state = 'ready'; strokes = []; paint(); header(); showTime(); showGuesses({ ranked: [] });
      $('#qdSay').textContent = '';
      setOverlay(`<span class="tiny muted" style="font-weight:800">ROUND ${round + 1} OF ${ROUNDS}</span>${shapeIcon(target())}<div class="ask">Draw a ${esc(SNAME[target()])}</div><p class="small muted">in under ${SECONDS} seconds</p><button class="btn primary big" id="qdGo">Start ${ic('play')}</button>`);
      $('#qdGo').onclick = startRound;
    }

    function thumbs() {
      $('#qdThumbs').innerHTML = Array.from({ length: ROUNDS }, (_, i) => {
        const r = results[i];
        if (!r) return `<div class="thumb" style="opacity:.5">${shapeIcon(order[i], '')}<div>Round ${i + 1}</div></div>`;
        return `<div class="thumb ${r.ok ? 'ok' : 'no'}">${thumbSVG(r.strokes)}<div>${r.ok ? '✓' : '✗'} ${esc(SNAME[r.target])}</div><div class="tiny muted">AI: ${r.guess ? esc(SNAME[r.guess]) + ' ' + Math.round(r.score * 100) + '%' : '—'}</div></div>`;
      }).join('');
    }

    function finish() {
      const ok = results.filter(r => r.ok).length;
      $('#qdEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>The AI recognised <b>${ok} of ${ROUNDS}</b> doodles. This is <b>Computer Vision</b>: the computer compares the <b>shape</b> of what it sees with examples it has learned, and picks the closest match. More (and more varied) examples make it better.</div></div>
        <div class="row mt"><button class="btn sm" id="qdAgain">${ic('refresh')} Play again</button></div>`;
      $('#qdAgain').onclick = () => { results.length = 0; round = 0; thumbs(); $('#qdEnd').innerHTML = ''; ready(); };
      ctx.data.best = Math.max(ctx.data.best || 0, ok); ctx.save();
      if (!completed && !ctx.done) { completed = true; ctx.sfx('win'); ctx.complete(`Played ${ROUNDS} Quick-Draw rounds; the AI recognised ${ok} of ${ROUNDS} doodles.`); }
    }

    // drawing
    const toCanvas = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * CW / r.width, y: (e.clientY - r.top) * CW / r.height }; };
    cv.addEventListener('pointerdown', e => {
      if (state !== 'drawing') return;
      e.preventDefault(); cv.setPointerCapture?.(e.pointerId);
      cur = [toCanvas(e)]; strokes.push(cur);
    });
    cv.addEventListener('pointermove', e => {
      if (state !== 'drawing' || !cur) return;
      const p = toCanvas(e), l = cur[cur.length - 1];
      if (Math.hypot(p.x - l.x, p.y - l.y) < 2) return;
      cur.push(p); paint();
      const now = performance.now();
      if (now - lastLive > 150) { lastLive = now; showGuesses(recognize(strokes.flat())); }
    });
    const up = () => {
      if (state !== 'drawing' || !cur) return;
      cur = null;
      const res = recognize(strokes.flat()); showGuesses(res);
      const top = res.ranked[0];
      if (top && top.id === target() && top.score >= ACCEPT) endRound('got');
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    $('#qdClear').onclick = () => { if (state !== 'drawing') return; strokes = []; cur = null; paint(); showGuesses({ ranked: [] }); };
    $('#qdDone').onclick = () => endRound('done');

    thumbs();
    ready();
    if (ctx.done) $('#qdEnd').innerHTML = `<p class="chip ok">✓ Goal already met — play again any time</p>`;
    return () => { clearInterval(timer); timer = null; ctx.el.classList.remove('lab-quickdraw'); };
  }
};
