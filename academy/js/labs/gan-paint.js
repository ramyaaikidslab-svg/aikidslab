import { esc, ic } from '../core/util.js';

const W = 800, H = 500;
const HOUSE = { x: 470, y: 230, w: 180, h: 150 };              // wall rectangle
const ROOF = { l: 450, r: 670, top: 150, base: 230 };
const GROUND = 300;                                             // flat meadow starts here
const hillTop = x => 262 - 80 * Math.exp(-(((x - 170) / 150) ** 2)) - 60 * Math.exp(-(((x - 640) / 190) ** 2));

const BRUSHES = [
  { k: 'tree', name: 'Tree', emoji: '🌳', gap: 46 },
  { k: 'grass', name: 'Grass', emoji: '🌱', gap: 16 },
  { k: 'cloud', name: 'Cloud', emoji: '☁️', gap: 70 },
  { k: 'door', name: 'Door', emoji: '🚪', gap: 0 },
  { k: 'window', name: 'Window', emoji: '🪟', gap: 0 },
  { k: 'erase', name: 'Erase', emoji: '🧽', gap: 20 }
];
const GOAL = 3;

function region(x, y) {
  if (x >= HOUSE.x && x <= HOUSE.x + HOUSE.w && y >= HOUSE.y && y <= HOUSE.y + HOUSE.h) return 'wall';
  if (y <= ROOF.base && y >= ROOF.top) {
    const half = (ROOF.r - ROOF.l) / 2 * (y - ROOF.top) / (ROOF.base - ROOF.top), mid = (ROOF.l + ROOF.r) / 2;
    if (x >= mid - half && x <= mid + half) return 'roof';
  }
  return y < hillTop(x) ? 'sky' : 'land';
}

function prng(seed) { let s = Math.floor(seed * 2147483646) + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

const CSS = `
.lab-gan-paint .gp-brushes{display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px;}
@media (max-width:560px){ .lab-gan-paint .gp-brushes{grid-template-columns:repeat(3,minmax(0,1fr));} }
.lab-gan-paint .gp-brush{display:grid; justify-items:center; gap:2px; background:#fff; border:var(--b2); border-radius:12px; padding:6px 4px; min-height:56px; font-weight:800; font-size:.85rem; box-shadow:var(--sh-sm);}
.lab-gan-paint .gp-brush span{font-size:1.4rem; line-height:1.1;}
.lab-gan-paint .gp-brush[aria-pressed="true"]{background:var(--ink); color:#fff;}
.lab-gan-paint .gp-brush.used:not([aria-pressed="true"]){background:var(--good-wash); border-color:var(--good);}
.lab-gan-paint .gp-msg{min-height:52px; display:flex; gap:10px; align-items:center; border:var(--b2); border-radius:12px; padding:8px 12px; background:#fff; font-weight:700;}
.lab-gan-paint .gp-msg.no{background:var(--bad-wash); border-color:var(--bad);}
.lab-gan-paint .gp-msg.yes{background:var(--good-wash); border-color:var(--good);}
.lab-gan-paint canvas{cursor:crosshair; max-width:760px; margin:0 auto;}
`;

export default {
  title: 'GAN Paint: paint with context',
  mount(ctx) {
    let brush = 'tree', objs = [], marks = [], raf = 0, drawing = false, last = null, refusedThisStroke = false, completed = false;
    const used = new Set(ctx.data.used || []);
    let msg = { cls: '', html: 'Pick a brush, then tap or drag on the picture.' };

    ctx.el.innerHTML = `<style>${CSS}</style>
      <div class="lab-gan-paint stack">
        <p class="lab-intro">In <b>GAN Paint</b> you don’t draw pixels. You tell the AI <i>what</i> to put <i>where</i>, and the generator draws it. It also knows <b>context</b>: it will refuse to paint things where they never appear in real photos.</p>
        ${ctx.done ? '<p class="chip ok">Already completed — replay any time</p>' : ''}
        <div class="row between"><b>Goal: use ${GOAL} different object brushes successfully</b><span class="chip gold" id="gpCount"></span></div>
        <div class="gp-brushes" role="group" aria-label="Brushes">${BRUSHES.map(b => `<button class="gp-brush" data-b="${b.k}" aria-pressed="${b.k === brush}"><span aria-hidden="true">${b.emoji}</span>${b.name}</button>`).join('')}</div>
        <canvas class="lab-canvas" id="gpCv" width="${W}" height="${H}" aria-label="Landscape with sky, hills, a meadow and a house. Paint objects onto it."></canvas>
        <div class="gp-msg" id="gpMsg" aria-live="polite"></div>
        <div class="row"><button class="btn sm" id="gpUndo">${ic('back')} Undo</button><button class="btn sm" id="gpClear">${ic('refresh')} Clear all</button></div>
        <div class="lab-box small"><h4>About the real GAN Paint</h4>
          <p>GAN Paint was built by researchers at the <b>MIT-IBM Watson AI Lab</b>. You brush “tree”, “grass”, “door” or “sky” onto a photo and a <b>GAN</b> (Generative Adversarial Network) draws it realistically. Nobody wrote rules like “doors go on walls”: the network <b>learned</b> them from thousands of training photos. This lab imitates that behaviour with simple rules so you can feel how it works.</p></div>
        <div id="gpEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);
    const cv = $('#gpCv'), g = cv.getContext('2d');

    /* ---------- drawing ---------- */
    function scene() {
      const sky = g.createLinearGradient(0, 0, 0, GROUND);
      sky.addColorStop(0, '#8EC5FF'); sky.addColorStop(1, '#DDF0FF');
      g.fillStyle = sky; g.fillRect(0, 0, W, H);
      g.fillStyle = '#FFD84D'; g.beginPath(); g.arc(90, 80, 36, 0, Math.PI * 2); g.fill();
    }
    function land() {
      g.fillStyle = '#7CC36B'; g.strokeStyle = '#15171C'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 10) g.lineTo(x, hillTop(x)); g.lineTo(W, H); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#93D17E'; g.fillRect(0, GROUND, W, H - GROUND);
      g.beginPath(); g.moveTo(0, GROUND); g.lineTo(W, GROUND); g.strokeStyle = 'rgba(21,23,28,.25)'; g.lineWidth = 2; g.stroke();
      g.fillStyle = '#D9C49A'; g.beginPath(); g.moveTo(HOUSE.x + 60, HOUSE.y + HOUSE.h); g.lineTo(HOUSE.x + 120, HOUSE.y + HOUSE.h); g.lineTo(560, H); g.lineTo(420, H); g.closePath(); g.fill();
    }
    function house() {
      g.lineWidth = 3; g.strokeStyle = '#15171C';
      g.fillStyle = '#F6E3C4'; g.fillRect(HOUSE.x, HOUSE.y, HOUSE.w, HOUSE.h); g.strokeRect(HOUSE.x, HOUSE.y, HOUSE.w, HOUSE.h);
      g.fillStyle = '#C8553D'; g.beginPath(); g.moveTo(ROOF.l, ROOF.base); g.lineTo((ROOF.l + ROOF.r) / 2, ROOF.top); g.lineTo(ROOF.r, ROOF.base); g.closePath(); g.fill(); g.stroke();
    }
    function tree(o) {
      const r = prng(o.seed), s = 0.55 + (o.y - 180) / 320;
      g.fillStyle = '#7A5230'; g.strokeStyle = '#15171C'; g.lineWidth = 2;
      g.fillRect(o.x - 5 * s, o.y - 42 * s, 10 * s, 42 * s); g.strokeRect(o.x - 5 * s, o.y - 42 * s, 10 * s, 42 * s);
      const greens = ['#2E8B57', '#3FA34D', '#228B4E', '#4CB35A'];
      if (r() < 0.3) {
        for (let i = 0; i < 3; i++) {
          g.fillStyle = greens[i % 4]; g.beginPath();
          const by = o.y - 30 * s - i * 22 * s, w2 = (30 - i * 7) * s;
          g.moveTo(o.x - w2, by); g.lineTo(o.x + w2, by); g.lineTo(o.x, by - 38 * s); g.closePath(); g.fill(); g.stroke();
        }
      } else {
        const n = 4 + Math.floor(r() * 3);
        for (let i = 0; i < n; i++) {
          g.fillStyle = greens[Math.floor(r() * 4)];
          g.beginPath(); g.arc(o.x + (r() - 0.5) * 34 * s, o.y - 62 * s + (r() - 0.5) * 28 * s, (15 + r() * 9) * s, 0, Math.PI * 2); g.fill(); g.stroke();
        }
      }
    }
    function grass(o) {
      const r = prng(o.seed), n = 6 + Math.floor(r() * 4);
      g.lineWidth = 2.2; g.lineCap = 'round';
      for (let i = 0; i < n; i++) {
        const bx = o.x + (r() - 0.5) * 18, hgt = 10 + r() * 14, lean = (r() - 0.5) * 12;
        g.strokeStyle = ['#2E7D32', '#3A9A3E', '#1F6B2A'][i % 3];
        g.beginPath(); g.moveTo(bx, o.y); g.quadraticCurveTo(bx + lean * 0.3, o.y - hgt * 0.6, bx + lean, o.y - hgt); g.stroke();
      }
    }
    function cloud(o) {
      const r = prng(o.seed), n = 4 + Math.floor(r() * 3);
      g.fillStyle = '#FFFFFF'; g.strokeStyle = 'rgba(21,23,28,.35)'; g.lineWidth = 2;
      const parts = Array.from({ length: n }, (_, i) => [o.x + (i - (n - 1) / 2) * 20, o.y - r() * 14, 16 + r() * 12]);
      parts.forEach(([x, y, rr]) => { g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.stroke(); });
      parts.forEach(([x, y, rr]) => { g.beginPath(); g.arc(x, y, rr - 1, 0, Math.PI * 2); g.fill(); });
    }
    function door(o) {
      g.fillStyle = '#8B5A2B'; g.strokeStyle = '#15171C'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(o.x - 20, o.y); g.lineTo(o.x - 20, o.y - 54); g.arc(o.x, o.y - 54, 20, Math.PI, 0); g.lineTo(o.x + 20, o.y); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(21,23,28,.4)'; g.lineWidth = 2; g.strokeRect(o.x - 12, o.y - 60, 24, 22); g.strokeRect(o.x - 12, o.y - 32, 24, 24);
      g.fillStyle = '#FFC800'; g.beginPath(); g.arc(o.x + 12, o.y - 34, 3, 0, Math.PI * 2); g.fill();
    }
    function windowObj(o) {
      g.fillStyle = '#BFE3F2'; g.strokeStyle = '#15171C'; g.lineWidth = 3;
      g.fillRect(o.x - 18, o.y - 18, 36, 36); g.strokeRect(o.x - 18, o.y - 18, 36, 36);
      g.beginPath(); g.moveTo(o.x, o.y - 18); g.lineTo(o.x, o.y + 18); g.moveTo(o.x - 18, o.y); g.lineTo(o.x + 18, o.y); g.lineWidth = 2.5; g.stroke();
      g.fillStyle = '#FFFFFF'; g.globalAlpha = 0.6; g.fillRect(o.x - 14, o.y - 14, 8, 8); g.globalAlpha = 1;
      g.fillStyle = '#9B7653'; g.fillRect(o.x - 22, o.y + 18, 44, 5); g.strokeRect(o.x - 22, o.y + 18, 44, 5);
    }
    const DRAW = { tree, grass, cloud, door, window: windowObj };

    function paint() {
      scene();
      objs.filter(o => o.k === 'cloud').forEach(cloud);
      land();
      const base = HOUSE.y + HOUSE.h;
      const behind = objs.filter(o => (o.k === 'tree' || o.k === 'grass') && o.y < base).sort((a, b) => a.y - b.y);
      const front = objs.filter(o => (o.k === 'tree' || o.k === 'grass') && o.y >= base).sort((a, b) => a.y - b.y);
      behind.forEach(o => DRAW[o.k](o));
      house();
      objs.filter(o => o.k === 'door' || o.k === 'window').forEach(o => DRAW[o.k](o));
      front.forEach(o => DRAW[o.k](o));
      const now = performance.now();
      marks = marks.filter(m => now - m.t < 900);
      marks.forEach(m => {
        const a = 1 - (now - m.t) / 900;
        g.globalAlpha = a; g.strokeStyle = '#D93A40'; g.lineWidth = 6; g.lineCap = 'round';
        g.beginPath(); g.arc(m.x, m.y, 18, 0, Math.PI * 2); g.moveTo(m.x - 12, m.y - 12); g.lineTo(m.x + 12, m.y + 12); g.stroke();
        g.globalAlpha = 1;
      });
      if (marks.length) { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }
    }

    /* ---------- rules ---------- */
    const box = o => o.k === 'door' ? [o.x - 20, o.y - 74, o.x + 20, o.y] : o.k === 'window' ? [o.x - 22, o.y - 18, o.x + 22, o.y + 23] : null;
    const overlaps = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

    function tryPlace(k, x, y) {
      const reg = region(x, y);
      const no = text => ({ ok: false, text });
      if (k === 'tree' || k === 'grass') {
        const nm = k === 'tree' ? 'Trees' : 'Grass';
        if (reg === 'sky') return no(`${nm} grow on the ground, not in the sky. In real photos, ${k === 'tree' ? 'trees never float in the air' : 'grass is always on the ground'}.`);
        if (reg === 'wall' || reg === 'roof') return no(`${nm} can’t grow out of a house ${reg}.`);
        return { ok: true, o: { k, x, y } };
      }
      if (k === 'cloud') {
        if (reg !== 'sky') return no(`Clouds belong in the sky. The GAN has never seen a cloud ${reg === 'land' ? 'sitting on the grass' : 'stuck to a house'}.`);
        return { ok: true, o: { k, x, y } };
      }
      if (k === 'door' || k === 'window') {
        if (reg !== 'wall') return no(`${k === 'door' ? 'Doors' : 'Windows'} only appear on a building’s wall${reg === 'roof' ? ', not on the roof' : ''}.`);
        let o;
        if (k === 'door') {
          if (y < HOUSE.y + HOUSE.h * 0.45) return no('Doors start at ground level. The GAN has never seen a door floating high up a wall. Tap lower on the wall.');
          o = { k, x: Math.round(x), y: HOUSE.y + HOUSE.h };
          if (o.x - 20 < HOUSE.x + 6 || o.x + 20 > HOUSE.x + HOUSE.w - 6) return no('A door here would hang off the edge of the wall. Tap nearer the middle.');
        } else {
          if (y > HOUSE.y + HOUSE.h - 40) return no('Windows sit higher up the wall, above the ground. Tap higher.');
          o = { k, x: Math.round(x), y: Math.max(HOUSE.y + 26, Math.round(y)) };
          if (o.x - 22 < HOUSE.x + 4 || o.x + 22 > HOUSE.x + HOUSE.w - 4) return no('That window would hang off the edge of the wall. Tap nearer the middle.');
        }
        if (objs.some(p => box(p) && overlaps(box(p), box(o)))) return no('There’s already a door or window there.');
        return { ok: true, o };
      }
      return no('');
    }

    function apply(x, y, first) {
      if (brush === 'erase') {
        const before = objs.length;
        objs = objs.filter(o => {
          const b = box(o) || (o.k === 'tree' ? [o.x - 30, o.y - 95, o.x + 30, o.y] : o.k === 'cloud' ? [o.x - 50, o.y - 40, o.x + 50, o.y + 30] : [o.x - 14, o.y - 24, o.x + 14, o.y]);
          return !(x > b[0] - 6 && x < b[2] + 6 && y > b[1] - 6 && y < b[3] + 6);
        });
        if (objs.length !== before) { setMsg('yes', `${ic('check')} Erased.`); paint(); }
        return;
      }
      const res = tryPlace(brush, x, y);
      if (res.ok) {
        res.o.seed = ctx.rng();
        objs.push(res.o);
        if (objs.length > 400) objs.shift();
        const bdef = BRUSHES.find(b => b.k === brush);
        if (!used.has(brush)) { used.add(brush); ctx.data.used = [...used]; ctx.save(); ctx.sfx('ok'); } else if (first) ctx.sfx('pop');
        setMsg('yes', `<span aria-hidden="true">${bdef.emoji}</span> The generator painted ${{ tree: 'a tree', grass: 'some grass', cloud: 'a cloud', door: 'a door', window: 'a window' }[brush]} that fits the scene.`);
        paint(); progress();
      } else {
        marks.push({ x, y, t: performance.now() });
        if (!refusedThisStroke) { ctx.sfx('bad'); setMsg('no', `${ic('x')} <span><b>GAN refused:</b> ${esc(res.text)}</span>`); }
        refusedThisStroke = true;
        paint();
      }
    }

    function setMsg(cls, html) { msg = { cls, html }; const m = $('#gpMsg'); m.className = 'gp-msg ' + cls; m.innerHTML = html; }

    function progress() {
      const n = [...used].filter(k => k !== 'erase').length;
      $('#gpCount').textContent = n >= GOAL ? `✓ ${n} brushes used` : `Brushes used: ${n} / ${GOAL}`;
      ctx.el.querySelectorAll('[data-b]').forEach(b => b.classList.toggle('used', used.has(b.dataset.b)));
      if (n >= GOAL && !completed) {
        completed = true;
        $('#gpEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>You painted with ${n} different brushes, and saw the AI refuse things that break the scene’s context. A <b>GAN</b> is generative AI: it creates new image content that fits patterns it learned from real photos, including <b>where</b> objects belong.</div></div>`;
        ctx.sfx('win');
        if (!ctx.done) ctx.complete(`Used ${n} GAN Paint brushes and saw how a GAN respects context learned from photos.`);
      }
    }

    /* ---------- input ---------- */
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
    cv.addEventListener('pointerdown', e => {
      e.preventDefault();
      drawing = true; refusedThisStroke = false;
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      const [x, y] = pos(e); last = [x, y];
      apply(x, y, true);
    });
    cv.addEventListener('pointermove', e => {
      if (!drawing) return;
      const b = BRUSHES.find(q => q.k === brush);
      if (!b.gap) return;
      const [x, y] = pos(e);
      if (Math.hypot(x - last[0], y - last[1]) >= b.gap) { last = [x, y]; apply(x, y, false); }
    });
    const up = () => { drawing = false; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    ctx.el.querySelectorAll('[data-b]').forEach(b => b.onclick = () => {
      brush = b.dataset.b;
      ctx.el.querySelectorAll('[data-b]').forEach(x => x.setAttribute('aria-pressed', x === b));
      const tips = { tree: 'Trees: tap or drag on the hills or meadow.', grass: 'Grass: drag along the ground.', cloud: 'Clouds: drag across the sky.',
        door: 'Door: tap low on the house wall.', window: 'Window: tap high on the house wall.', erase: 'Erase: tap or drag over an object.' };
      setMsg('', tips[brush]);
      ctx.sfx('tick');
    });
    $('#gpUndo').onclick = () => { objs.pop(); paint(); };
    $('#gpClear').onclick = () => { objs = []; paint(); setMsg('', 'Canvas cleared. Paint again!'); };

    setMsg(msg.cls, msg.html);
    paint(); progress();
    return () => cancelAnimationFrame(raf);
  }
};
