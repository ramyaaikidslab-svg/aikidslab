import { esc, ic } from '../core/util.js';

const ROUNDS = 5, PER = 6;
const SKINS = ['#F1C27D', '#E0AC69', '#C68642', '#8D5524'];
const HAIRS = ['#1F1612', '#3B2416', '#2A2A2A'];
// Features the generator can get wrong. err 1 = very wrong, 0 = perfect.
const FEATS = [
  { k: 'eyes', name: 'eye sizes' },
  { k: 'level', name: 'eye height' },
  { k: 'mouth', name: 'mouth position' },
  { k: 'colour', name: 'skin colour' },
  { k: 'shape', name: 'face outline' }
];

// Real faces: the fixed style the generator is trying to copy, with natural small variation.
function realFace(r) {
  return { skin: r.pick(SKINS), hair: r.pick(HAIRS), style: r.int(0, 1), eyeR: 4 + r() * 0.6, eyeGap: 15 + r() * 3, eyeY: 44 + r() * 3,
    smile: 5 + r() * 3, mouthW: 12 + r() * 4, bindi: r.chance(0.35), d: { eyes: 0, level: 0, mouth: 0, colour: 0, shape: 0 } };
}

// A fake face: start from a real-looking face, then distort features by the generator's current error.
function fakeFace(r, err) {
  const f = realFace(r);
  FEATS.forEach(({ k }) => { f.d[k] = err[k] * (0.7 + r() * 0.3); });
  f.fake = true;
  return f;
}

function mix(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

function faceSVG(f, seed) {
  const d = f.d, cx = 50, cy = 52;
  // Face outline: a wobbly polygon when 'shape' is distorted.
  let pts = '';
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const wob = d.shape * 7 * Math.sin(a * 5 + seed) + d.shape * 4 * Math.sin(a * 3 + seed * 2);
    pts += `${(cx + (30 + wob) * Math.cos(a)).toFixed(1)},${(cy + (35 + wob) * Math.sin(a)).toFixed(1)} `;
  }
  const skin = mix(f.skin, '#7FBF6A', d.colour * 0.8);
  const rL = f.eyeR * (1 + d.eyes * 0.9), rR = f.eyeR * (1 - d.eyes * 0.45);
  const yL = f.eyeY - d.level * 7, yR = f.eyeY + d.level * 6;
  const mx = cx + d.mouth * 13, my = 72 + d.mouth * 3, sm = f.smile * (1 - d.mouth * 1.6);
  const hair = f.style ? `<path d="M19 50C16 6 84 6 81 50 74 34 60 30 50 31 40 30 26 34 19 50z" fill="${f.hair}"/>`
    : `<path d="M18 56C12 4 88 4 82 56 78 36 64 26 44 30 34 32 24 40 18 56z" fill="${f.hair}"/>`;
  return `<svg viewBox="0 0 100 100" class="ds-face" aria-hidden="true">
    <polygon points="${pts}" fill="${skin}" stroke="#15171C" stroke-width="2.2" stroke-linejoin="round"/>
    ${hair}
    <circle cx="${cx - f.eyeGap}" cy="${yL}" r="${rL.toFixed(2)}" fill="#15171C"/>
    <circle cx="${cx + f.eyeGap}" cy="${yR}" r="${rR.toFixed(2)}" fill="#15171C"/>
    <path d="M${cx} 54l-3 8h5" fill="none" stroke="#15171C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>
    <path d="M${(mx - f.mouthW / 2).toFixed(1)} ${my}q${(f.mouthW / 2).toFixed(1)} ${sm.toFixed(1)} ${f.mouthW.toFixed(1)} 0" fill="none" stroke="#15171C" stroke-width="2.2" stroke-linecap="round"/>
    ${f.bindi ? `<circle cx="${cx}" cy="${f.eyeY - 10}" r="2.2" fill="#E8453C"/>` : ''}
  </svg>`;
}

// Fixed 0–100 % chart, so the 50 % "coin flip" line is always in the same place.
function trendChart(acc, gen) {
  const W = 340, H = 200, L = 42, R = 12, T = 14, B = 26, n = 5;
  const x = i => L + i * (W - L - R) / (n - 1), y = v => T + (100 - v) / 100 * (H - T - B);
  let g = [0, 25, 50, 75, 100].map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#E6DFCF"/><text x="${L - 5}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`).join('');
  g += `<line x1="${L}" x2="${W - R}" y1="${y(50)}" y2="${y(50)}" stroke="#8A8F99" stroke-dasharray="5 4" stroke-width="1.5"/><text x="${W - R}" y="${y(50) - 5}" text-anchor="end" style="fill:#5B606A">coin flip</text>`;
  g += Array.from({ length: n }, (_, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">R${i + 1}</text>`).join('');
  const line = (vals, col, dash) => `<polyline points="${vals.map((v, i) => `${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="${col}" stroke-width="3" ${dash ? 'stroke-dasharray="7 5"' : ''} stroke-linejoin="round"/>` +
    vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="#fff" stroke="${col}" stroke-width="2.5"/>`).join('');
  g += line(gen, '#E8453C', true) + line(acc, '#2F6FED', false);
  return `<svg class="svgchart" style="max-width:520px" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your accuracy by round: ${acc.join(', ')} percent. Generator error: ${gen.join(', ')} percent.">${g}</svg>
    <div class="row small" style="font-weight:700;gap:14px"><span><span style="color:#2F6FED">━━</span> your accuracy</span><span><span style="color:#E8453C">╍╍</span> generator error</span></div>`;
}

const CSS = `
.lab-discriminator .ds-grid{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px;}
@media (max-width:520px){ .lab-discriminator .ds-grid{grid-template-columns:repeat(2,minmax(0,1fr));} }
.lab-discriminator .ds-cell{background:#fff; border:var(--b2); border-radius:12px; padding:6px; display:grid; gap:6px; justify-items:center;}
.lab-discriminator .ds-cell.ok{border-color:var(--good); background:var(--good-wash);}
.lab-discriminator .ds-cell.no{border-color:var(--bad); background:var(--bad-wash);}
.lab-discriminator .ds-face{width:100%; max-width:120px; height:auto; display:block;}
.lab-discriminator .ds-cell .seg{width:100%; display:grid; grid-template-columns:1fr 1fr;}
.lab-discriminator .ds-cell .seg button{min-height:40px; padding:6px 4px;}
.lab-discriminator .ds-res{font-size:.8rem; font-weight:800; text-align:center; line-height:1.25;}
.lab-discriminator .ds-real{display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:6px;}
.lab-discriminator .ds-real .ds-face{background:#fff; border:2px solid var(--line); border-radius:8px;}
.lab-discriminator .ds-evo{display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:6px; text-align:center; font-size:.75rem; font-weight:800;}
.lab-discriminator .ds-evo .ds-face{background:#fff; border:2px solid var(--line); border-radius:8px;}
`;

export default {
  title: 'Be the discriminator: spot the fakes',
  mount(ctx) {
    const r = ctx.rng;
    const examples = Array.from({ length: 6 }, () => realFace(r));
    const err = { eyes: 1, level: 1, mouth: 1, colour: 1, shape: 1 };
    let round = 0, faces = [], marks = [], checked = false, completed = false;
    const hist = [];   // {acc, fooled, fakes, gap, fixed, sample}

    const gap = () => FEATS.reduce((s, f) => s + err[f.k], 0) / FEATS.length;

    function newRound() {
      const nFake = r.int(2, 4);
      const list = [];
      for (let i = 0; i < PER; i++) list.push(i < nFake ? fakeFace(r, err) : realFace(r));
      faces = r.shuffle(list).map((f, i) => ({ ...f, seed: r() * 6 + i }));
      marks = Array(PER).fill(null); checked = false;
    }

    function render() {
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-discriminator stack">
          <p class="lab-intro">A <b>GAN</b> has two players. The <b>generator</b> makes fake faces; the <b>discriminator</b> judges real or fake. Today <b>you</b> are the discriminator. After each round, the generator learns from your verdicts and its fakes get better.</p>
          <div class="qcount"><span><b>Goal:</b> judge ${ROUNDS} rounds</span><span>Round ${Math.min(round + 1, ROUNDS)} / ${ROUNDS}</span>
            <div class="dots" aria-hidden="true">${Array.from({ length: ROUNDS }, (_, i) => `<i class="${i < hist.length ? 'ok' : i === round && round < ROUNDS ? 'now' : ''}"></i>`).join('')}</div></div>
          ${ctx.done ? '<p class="chip ok">Already completed — replay any time</p>' : ''}
          <div class="lab-box">
            <h4>Real faces look like this</h4>
            <p class="small muted">The real style: round face, two equal eyes level with each other, a centred smile, natural skin tones.</p>
            <div class="ds-real mt">${examples.map((f, i) => faceSVG(f, i)).join('')}</div>
          </div>
          ${round >= ROUNDS ? '' : roundHTML()}
          <div id="dsSummary">${hist.length ? summaryHTML() : ''}</div>
        </div>`;
      ctx.el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { if (checked) return; marks[+b.dataset.i] = b.dataset.v; ctx.sfx('tick'); render(); });
      const ck = ctx.el.querySelector('#dsCheck'); if (ck) ck.onclick = check;
      const nx = ctx.el.querySelector('#dsNext'); if (nx) nx.onclick = () => { round++; if (hist.length < ROUNDS) newRound(); render(); };
      const ag = ctx.el.querySelector('#dsAgain'); if (ag) ag.onclick = restart;
    }

    function roundHTML() {
      const all = marks.every(Boolean);
      const last = hist[hist.length - 1];
      return `<div class="lab-box">
        <div class="row between"><h4>Round ${round + 1}: which faces are real?</h4><span class="chip">Generator error: ${Math.round(gap() * 100)}%</span></div>
        <p class="small muted">Mark every face. Somewhere between 2 and 4 of them are fakes.</p>
        <div class="ds-grid mt">${faces.map((f, i) => {
          const res = checked ? ((marks[i] === 'fake') === !!f.fake ? 'ok' : 'no') : '';
          return `<div class="ds-cell ${res}">${faceSVG(f, f.seed)}
            ${checked ? `<div class="ds-res">${f.fake ? 'Fake' : 'Real'} · you said ${marks[i]}<br>${res === 'ok' ? '✓ correct' : '✗ wrong'}</div>`
              : `<div class="seg" role="group" aria-label="Face ${i + 1}"><button data-i="${i}" data-v="real" aria-pressed="${marks[i] === 'real'}">Real</button><button data-i="${i}" data-v="fake" aria-pressed="${marks[i] === 'fake'}">Fake</button></div>`}
          </div>`;
        }).join('')}</div>
        <div class="row mt">${checked
          ? `<button class="btn primary" id="dsNext">${hist.length >= ROUNDS ? 'See results' : 'Next round'} ${ic('arrow')}</button>`
          : `<button class="btn primary" id="dsCheck" ${all ? '' : 'disabled'}>Check my verdicts</button><span class="small muted">${marks.filter(Boolean).length}/${PER} marked</span>`}</div>
        <div aria-live="polite" class="mt">${checked && last ? `<div class="fb ${last.acc >= 0.67 ? 'good' : 'bad'}"><div class="h">You were right on ${Math.round(last.acc * PER)} of ${PER} (${Math.round(last.acc * 100)}%)</div>
          <div>${last.fooled ? `${last.fooled} of ${last.fakes} fakes fooled you.` : `You caught all ${last.fakes} fakes.`} ${hist.length < ROUNDS ? `<b>Generator update:</b> it used your verdicts as feedback and improved most on <b>${last.fixed}</b>.` : ''}</div></div>` : ''}</div>
      </div>`;
    }

    function check() {
      if (checked || !marks.every(Boolean)) return;
      checked = true;
      let right = 0, fakes = 0, fooled = 0;
      const caught = { eyes: 0, level: 0, mouth: 0, colour: 0, shape: 0 };
      faces.forEach((f, i) => {
        const ok = (marks[i] === 'fake') === !!f.fake;
        if (ok) right++;
        if (f.fake) { fakes++; if (marks[i] === 'real') fooled++; else FEATS.forEach(({ k }) => { caught[k] += f.d[k]; }); }
      });
      const sample = faces.find(f => f.fake);
      // Generator learning: every feature improves; the biggest give-away in caught fakes improves most.
      let worst = FEATS[0].k;
      FEATS.forEach(({ k }) => { if (caught[k] + err[k] * 0.01 > caught[worst] + err[worst] * 0.01) worst = k; });
      if (!Object.values(caught).some(v => v > 0)) worst = FEATS.reduce((a, f) => (err[f.k] > err[a] ? f.k : a), FEATS[0].k);
      const g0 = gap();
      FEATS.forEach(({ k }) => { err[k] *= k === worst ? 0.3 : 0.55; });
      hist.push({ acc: right / PER, fooled, fakes, gap: g0, fixed: FEATS.find(f => f.k === worst).name, sample });
      ctx.sfx(right >= 4 ? 'ok' : 'bad');
      render();
      if (hist.length >= ROUNDS) finish();
    }

    function summaryHTML() {
      const accs = hist.map(h => Math.round(h.acc * 100));
      const first = (accs[0] + (accs[1] ?? accs[0])) / 2, lastTwo = hist.length >= 4 ? (accs[accs.length - 1] + accs[accs.length - 2]) / 2 : null;
      let msg = '';
      if (hist.length >= ROUNDS) {
        if (lastTwo < first - 5) msg = `Your accuracy fell from about ${Math.round(first)}% in the first rounds to about ${Math.round(lastTwo)}% at the end. That is exactly what a GAN aims for: the generator’s fakes became so close to the real style that the discriminator could no longer tell them apart.`;
        else if (lastTwo > first + 5) msg = `Your accuracy actually went up (first two rounds about ${Math.round(first)}%, last two about ${Math.round(lastTwo)}%): you learned what to look for faster than the generator improved. In a real GAN both players learn like this, and that competition pushes the generator to get even better.`;
        else msg = `Your accuracy stayed about the same (around ${Math.round(first)}% → ${Math.round(lastTwo)}%), even though the fakes got much harder, because you sharpened your eye as you went. With only 6 faces a round, a single guess changes accuracy by 17 points, so small changes are mostly luck.`;
      }
      return `<div class="lab-box stack">
        <h4>Discriminator accuracy by round</h4>
        ${trendChart(accs, hist.map(h => Math.round(h.gap * 100)))}
        <p class="tiny muted">50% accuracy = coin-flip guessing. Generator error = how far its fakes were from the real style when that round was made.</p>
        <div><b class="small">One fake from each round, improving:</b>
          <div class="ds-evo mt">${hist.map((h, i) => `<div>${faceSVG(h.sample, i + 1)}R${i + 1}</div>`).join('')}${hist.length >= ROUNDS ? `<div>${faceSVG(examples[0], 0)}Real</div>` : ''}</div></div>
        ${msg ? `<p>${esc(msg)}</p>` : ''}
        ${hist.length >= ROUNDS ? `<div class="lab-done">${ic('check')}<div>That was a <b>Generative Adversarial Network (GAN)</b>: the <b>generator</b> creates fake samples, the <b>discriminator</b> judges real vs fake, and each improves by competing with the other until fakes are very hard to spot.</div></div>
          <div class="row"><button class="btn sm" id="dsAgain">${ic('refresh')} Play again</button></div>` : ''}
      </div>`;
    }

    function finish() {
      if (completed) return;
      completed = true;
      ctx.sfx('win');
      const accs = hist.map(h => Math.round(h.acc * 100));
      ctx.data.last = accs; ctx.save();
      if (!ctx.done) ctx.complete(`Played discriminator for 5 GAN rounds (accuracy ${accs[0]}% → ${accs[accs.length - 1]}%) while the generator improved.`);
    }

    function restart() {
      Object.keys(err).forEach(k => { err[k] = 1; });
      hist.length = 0; round = 0; newRound(); render();
    }

    newRound(); render();
    return () => {};
  }
};
