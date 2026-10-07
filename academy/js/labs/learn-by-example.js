import { ic } from '../core/util.js';

// Learning-based model: the learner adds labelled examples; a k-NN (k = 3)
// colours the plane live; 10 hidden test plants check what it learned.

const W = 480, H = 380, L = 46, R = 12, T = 14, B = 42;
const XMAX = 12, YMAX = 100, K = 3, CELL = 8, GOAL = 0.9, MAXPTS = 80;
const COL = { water: '#2F6FED', fine: '#109A66' };
const WASH = { water: 'rgba(47,111,237,.20)', fine: 'rgba(16,154,102,.20)' };
const NAME = { water: 'Needs water', fine: "Doesn't need water" };

// the gardener's rule (hidden from the machine): water when moisture is below 20% + 4% per hour of sun
export const truth = (x, y) => (y < 20 + 4 * x ? 'water' : 'fine');
const px = x => L + (x / XMAX) * (W - L - R);
const py = y => H - B - (y / YMAX) * (H - B - T);
const ux = X => ((X - L) / (W - L - R)) * XMAX;
const uy = Y => ((H - B - Y) / (H - B - T)) * YMAX;

export function knn(pts, x, y, k = K) {
  if (!pts.length) return null;
  const d = pts.map(p => ({ l: p.l, d: Math.hypot((p.x - x) / XMAX, (p.y - y) / YMAX) })).sort((a, b) => a.d - b.d).slice(0, Math.min(k, pts.length));
  const w = d.filter(q => q.l === 'water').length;
  return w * 2 > d.length ? 'water' : w * 2 < d.length ? 'fine' : d[0].l;
}

function makeTests(rng) {
  const out = [];
  let guard = 0;
  while (out.length < 10 && guard++ < 2000) {
    const x = +(0.5 + rng() * 11).toFixed(1), y = Math.round(4 + rng() * 92);
    const gap = y - (20 + 4 * x);
    const want = out.length % 2 ? 'fine' : 'water';
    if (Math.abs(gap) < 7 || truth(x, y) !== want) continue;
    if (out.some(p => Math.hypot((p.x - x) / XMAX, (p.y - y) / YMAX) < 0.09)) continue;
    out.push({ x, y, l: want });
  }
  return out;
}

const CSS = `
.lab-learn-by-example .lbe-stage{max-width:620px; margin:0 auto;}
.lab-learn-by-example canvas{cursor:crosshair;}
.lab-learn-by-example .lblseg{display:grid; grid-template-columns:1fr 1fr; gap:8px;}
.lab-learn-by-example .lblseg .btn{font-size:.92rem; padding:8px 8px;}
.lab-learn-by-example .lblseg .btn[aria-pressed="true"]{outline:3px solid var(--ink); outline-offset:1px;}
.lab-learn-by-example .lblseg .btn.w[aria-pressed="true"]{background:var(--blue-wash);}
.lab-learn-by-example .lblseg .btn.f[aria-pressed="true"]{background:var(--green-wash);}
.lab-learn-by-example .mk{display:inline-block; width:14px; height:14px; border:2px solid var(--ink); vertical-align:-2px;}
.lab-learn-by-example .mk.w{background:${COL.water}; border-radius:50%;} .lab-learn-by-example .mk.f{background:${COL.fine}; border-radius:2px;}
.lab-learn-by-example .mk.t{background:#fff; border-radius:50%; border-style:dashed;}
.lab-learn-by-example .score{font-family:var(--head); font-weight:800; font-size:1.6rem;}
`;

export default {
  title: 'Learn by Example: teach a plant-watering AI',
  mount(ctx) {
    ctx.el.classList.add('lab-learn-by-example');
    const tests = makeTests(ctx.rng);
    let pts = Array.isArray(ctx.data.ex) ? ctx.data.ex.filter(p => Array.isArray(p) && p.length === 3 && COL[p[2]]).slice(0, MAXPTS).map(([x, y, l]) => ({ x: +x, y: +y, l })) : [];
    let label = 'water', showRule = true, revealed = false, completed = false, acc = null;

    ctx.el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">You're a gardener. You know when a plant needs watering: in strong sun the soil dries faster, so the plant needs water even when the soil is still a bit damp. The AI does <b>not</b> know your rule — it can only learn from <b>examples</b> you give it.</p>
      <div class="banner" style="flex-wrap:wrap"><span class="chip gold">Goal</span><span>Teach the AI with examples until it gets <b>at least 9 of 10</b> hidden test plants right (90%).</span></div>
      <div class="lab-grid">
        <div class="lab-box">
          <div class="lbe-stage"><canvas class="lab-canvas" id="lbeCv" width="${W}" height="${H}" aria-label="Plane: hours of sunlight across, soil moisture up. Tap to add an example."></canvas></div>
          <div class="row mt small" style="gap:6px 14px;font-weight:700"><span><i class="mk w"></i> needs water</span><span><i class="mk f"></i> doesn't need water</span>${'<span><i class="mk t"></i> test plant</span>'}</div>
          <p class="tiny muted mt">Background colour = what the AI would predict there. It looks at the <b>3 nearest examples</b> and takes the majority (k-nearest neighbours, k = 3).</p>
        </div>
        <div class="lab-box stack" style="gap:12px">
          <div><h4>1 · Choose a label, then tap the plane</h4>
            <div class="lblseg" role="group" aria-label="Label for new examples">
              <button class="btn w" data-l="water" aria-pressed="true"><i class="mk w"></i> Needs water</button>
              <button class="btn f" data-l="fine" aria-pressed="false"><i class="mk f"></i> Doesn't need</button></div>
            <p class="tiny muted mt">Tap an existing example to remove it.</p></div>
          <div class="row"><button class="btn sm" id="lbeUndo">${ic('back')} Undo</button><button class="btn sm" id="lbeClear">${ic('x')} Clear all</button>
            <button class="toggle" id="lbeRule" aria-pressed="true">Show my rule</button></div>
          <p class="small" id="lbeCount" aria-live="polite"></p>
          <div><h4>2 · Test the AI</h4>
            <button class="btn primary" id="lbeTest">${ic('eye')} Reveal 10 test plants</button>
            <div id="lbeRes" class="mt" aria-live="polite"></div></div>
        </div>
      </div>
      <div id="lbeDone"></div>`;

    const $ = s => ctx.el.querySelector(s);
    const cv = $('#lbeCv'), g = cv.getContext('2d');

    function draw() {
      g.clearRect(0, 0, W, H);
      g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
      // learned regions
      if (pts.length) {
        for (let X = L; X < W - R; X += CELL) for (let Y = T; Y < H - B; Y += CELL) {
          const lab = knn(pts, ux(X + CELL / 2), uy(Y + CELL / 2));
          g.fillStyle = WASH[lab]; g.fillRect(X, Y, Math.min(CELL, W - R - X), Math.min(CELL, H - B - Y));
        }
      }
      // grid + axes
      g.strokeStyle = 'rgba(21,23,28,.08)'; g.lineWidth = 1; g.font = '700 12px Nunito, system-ui, sans-serif'; g.fillStyle = '#2A2F3A';
      for (let x = 0; x <= XMAX; x += 2) { g.beginPath(); g.moveTo(px(x), T); g.lineTo(px(x), H - B); g.stroke(); g.textAlign = 'center'; g.fillText(x, px(x), H - B + 16); }
      for (let y = 0; y <= YMAX; y += 20) { g.beginPath(); g.moveTo(L, py(y)); g.lineTo(W - R, py(y)); g.stroke(); g.textAlign = 'right'; g.fillText(y + '%', L - 6, py(y) + 4); }
      g.strokeStyle = '#15171C'; g.lineWidth = 2; g.beginPath(); g.moveTo(L, T); g.lineTo(L, H - B); g.lineTo(W - R, H - B); g.stroke();
      g.fillStyle = '#5B606A'; g.textAlign = 'right'; g.fillText('hours of sunlight per day →', W - R, H - 6);
      g.save(); g.translate(13, T + 2); g.rotate(-Math.PI / 2); g.textAlign = 'right'; g.fillText('soil moisture →', 0, 0); g.restore();
      // the gardener's rule
      if (showRule) {
        g.setLineDash([8, 6]); g.strokeStyle = '#87620F'; g.lineWidth = 2.5;
        g.beginPath(); g.moveTo(px(0), py(20)); g.lineTo(px(XMAX), py(68)); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#87620F'; g.textAlign = 'left'; g.fillText('your rule (the AI can’t see this)', px(0.4), py(20 + 4 * 0.4) + 18);
      }
      // examples
      pts.forEach(p => marker(p.x, p.y, p.l));
      // tests
      if (revealed) tests.forEach(t => {
        const pred = knn(pts, t.x, t.y), ok = pred === t.l;
        const X = px(t.x), Y = py(t.y);
        g.beginPath(); g.arc(X, Y, 10, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
        g.setLineDash([3, 3]); g.lineWidth = 2.5; g.strokeStyle = COL[t.l]; g.stroke(); g.setLineDash([]);
        g.fillStyle = ok ? '#109A66' : '#D93A40'; g.font = '900 15px Nunito, system-ui, sans-serif'; g.textAlign = 'center';
        g.fillText(ok ? '✓' : '✗', X, Y + 5); g.font = '700 12px Nunito, system-ui, sans-serif';
      });
    }
    function marker(x, y, l) {
      const X = px(x), Y = py(y);
      g.fillStyle = COL[l]; g.strokeStyle = '#15171C'; g.lineWidth = 2;
      g.beginPath();
      if (l === 'water') g.arc(X, Y, 7, 0, Math.PI * 2); else g.rect(X - 6.5, Y - 6.5, 13, 13);
      g.fill(); g.stroke();
    }

    function evaluate() {
      if (!revealed) return;
      const right = tests.filter(t => knn(pts, t.x, t.y) === t.l).length;
      acc = right / tests.length;
      const wrongN = tests.length - right;
      $('#lbeRes').innerHTML = `<div class="row" style="gap:10px"><span class="score">${right} / ${tests.length}</span><span class="small muted">test plants right · accuracy ${Math.round(acc * 100)}%</span></div>
        <div class="meter mt" aria-hidden="true"><i style="width:${acc * 100}%;background:${acc >= GOAL ? 'var(--good)' : 'var(--gold)'}"></i></div>
        <p class="small mt" style="font-weight:700">${acc >= GOAL ? 'Great teaching! The AI found the pattern from your examples.' : `${wrongN} test plant${wrongN > 1 ? 's are' : ' is'} marked ✗. Add more examples near ${wrongN > 1 ? 'them' : 'it'} — especially close to your rule line — and the AI will update instantly.`}</p>`;
      if (acc >= GOAL) finish();
    }

    function finish() {
      if (!$('#lbeDone').innerHTML.includes('lab-done')) $('#lbeDone').innerHTML = `<div class="lab-done">${ic('check')}<div>The AI got ${Math.round(acc * 100)}% of the test plants right — and you never told it the rule! The machine found the rule from your <b>examples</b> (training data) and was checked on plants it had never seen (testing data). This is a <b>learning-based model</b>.</div></div>`;
      if (!completed && !ctx.done) { completed = true; ctx.sfx('win'); ctx.complete(`Taught a k-NN model with ${pts.length} examples; it scored ${Math.round(acc * 100)}% on 10 test plants.`); }
    }

    function update(saveIt = true) {
      const w = pts.filter(p => p.l === 'water').length, f = pts.length - w;
      $('#lbeCount').textContent = `Examples: ${pts.length} (${w} needs water, ${f} doesn't need)${pts.length >= MAXPTS ? ' — that is the maximum.' : ''}`;
      $('#lbeTest').disabled = !(w >= 2 && f >= 2) || revealed;
      if (!revealed) $('#lbeRes').innerHTML = `<p class="small muted">${w >= 2 && f >= 2 ? 'Ready when you are. Add more examples first for a better score!' : 'Add at least 2 examples of each label first.'}</p>`;
      draw(); evaluate();
      if (saveIt) { ctx.data.ex = pts.map(p => [+p.x.toFixed(1), Math.round(p.y), p.l]); ctx.save(); }
    }

    cv.addEventListener('pointerdown', e => {
      e.preventDefault();
      const r = cv.getBoundingClientRect(), X = (e.clientX - r.left) * W / r.width, Y = (e.clientY - r.top) * H / r.height;
      if (X < L || X > W - R || Y < T || Y > H - B) return;
      const hit = pts.findIndex(p => Math.hypot(px(p.x) - X, py(p.y) - Y) < 12);
      if (hit >= 0) { pts.splice(hit, 1); ctx.sfx('tick'); }
      else if (pts.length < MAXPTS) { pts.push({ x: ux(X), y: uy(Y), l: label }); ctx.sfx('pop'); }
      update();
    });
    ctx.el.querySelectorAll('[data-l]').forEach(b => b.onclick = () => {
      label = b.dataset.l; ctx.el.querySelectorAll('[data-l]').forEach(x => x.setAttribute('aria-pressed', x === b)); ctx.sfx('tick');
    });
    $('#lbeUndo').onclick = () => { pts.pop(); update(); };
    $('#lbeClear').onclick = () => { pts = []; update(); };
    $('#lbeRule').onclick = () => { showRule = !showRule; $('#lbeRule').setAttribute('aria-pressed', showRule); draw(); };
    $('#lbeTest').onclick = () => { revealed = true; ctx.sfx('ok'); update(false); $('#lbeTest').textContent = 'Test plants revealed'; };

    update(false);
    if (ctx.done) $('#lbeDone').innerHTML = '<p class="chip ok">✓ Goal already met — experiment freely</p>';
    return () => { ctx.el.classList.remove('lab-learn-by-example'); };
  }
};
