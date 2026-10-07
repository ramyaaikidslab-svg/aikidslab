import { esc, ic } from '../core/util.js';

// System maps: elements + arrows; + = same direction, − = opposite direction.

const NW = 132, NH = 50;
export const MAP1 = {
  title: 'Air pollution in a city',
  nodes: {
    U: { x: 80, y: 40, t: ['Use of public', 'transport'] },
    T: { x: 260, y: 40, t: ['Number of', 'trees'] },
    V: { x: 80, y: 150, t: ['Vehicles on', 'the road'] },
    P: { x: 260, y: 150, t: ['Air', 'pollution'] },
    B: { x: 260, y: 262, t: ['People with', 'breathing problems'] }
  },
  links: [
    { f: 'U', t: 'V', s: '-', why: 'More people taking buses and the metro → fewer vehicles on the road. They move in opposite directions, so −.' },
    { f: 'V', t: 'P', s: '+', why: 'More vehicles → more exhaust smoke → more air pollution. Same direction, so +.' },
    { f: 'T', t: 'P', s: '-', why: 'More trees trap dust and absorb gases → less air pollution. Opposite directions, so −.' },
    { f: 'P', t: 'T', s: '-', why: 'More pollution damages trees → fewer healthy trees. Opposite, so −. With the arrow above, this makes a loop: less trees → more pollution → even fewer trees!' },
    { f: 'P', t: 'B', s: '+', why: 'More air pollution → more people with asthma and coughs. Same direction, so +.' }
  ]
};
export const MAP2 = {
  water: {
    title: 'Water scarcity', emoji: '💧',
    nodes: {
      R: { x: 80, y: 40, t: ['Rainfall'] },
      H: { x: 280, y: 40, t: ['Rainwater', 'harvesting'] },
      G: { x: 180, y: 150, t: ['Groundwater', 'level'] },
      W: { x: 80, y: 262, t: ['Water pumped', 'from borewells'] },
      S: { x: 280, y: 262, t: ['Water', 'scarcity'] }
    },
    links: [
      { f: 'R', t: 'G', real: true, s: '+', why: 'More rain soaks into the soil and refills groundwater. Same direction, so +.' },
      { f: 'S', t: 'R', real: false, bend: -70, why: 'A water shortage on the ground cannot change how much rain falls. No direct link.' },
      { f: 'H', t: 'G', real: true, s: '+', why: 'Harvesting rain (recharge pits, rooftop collection) sends more water into the ground → groundwater rises. +' },
      { f: 'W', t: 'G', real: true, s: '-', why: 'Pumping more water out of borewells → groundwater level falls. Opposite, so −.' },
      { f: 'H', t: 'R', real: false, why: 'Harvesting collects rain that has already fallen; it does not make more or less rain fall.' },
      { f: 'G', t: 'S', real: true, s: '-', why: 'Higher groundwater → wells have water → less scarcity. Opposite, so −.' },
      { f: 'G', t: 'R', real: false, why: 'Water under the ground does not control the rain clouds. Rain → groundwater, not the other way round.' }
    ]
  },
  school: {
    title: 'School results', emoji: '📚',
    nodes: {
      P: { x: 80, y: 40, t: ['Late-night', 'phone use'] },
      S: { x: 280, y: 40, t: ['Hours of', 'sleep'] },
      H: { x: 80, y: 150, t: ['Self-study', 'hours'] },
      C: { x: 280, y: 150, t: ['Concentration', 'in class'] },
      M: { x: 180, y: 262, t: ['Exam', 'marks'] }
    },
    links: [
      { f: 'P', t: 'S', real: true, s: '-', why: 'More late-night phone use → fewer hours of sleep. Opposite, so −.' },
      { f: 'M', t: 'S', real: false, bend: 60, why: 'Arrows show cause → effect. Sleep affects marks; marks do not directly decide how long you sleep.' },
      { f: 'S', t: 'C', real: true, s: '+', why: 'More sleep → you can concentrate better in class. Same direction, so +.' },
      { f: 'C', t: 'P', real: false, why: 'Concentrating in class does not directly change how much you use your phone at night.' },
      { f: 'C', t: 'M', real: true, s: '+', why: 'Better concentration in class → better exam marks. +' },
      { f: 'S', t: 'P', real: false, why: "It's the other way round: phone use cuts sleep. More sleep does not cause phone use." },
      { f: 'H', t: 'M', real: true, s: '+', why: 'More self-study hours → better marks. Same direction, so +.' }
    ]
  }
};

const CSS = `
.lab-system-map .smap{width:100%; height:auto; display:block; background:#fff; border:var(--b2); border-radius:12px; max-width:520px; margin:0 auto;}
.lab-system-map .smap text{font-family:var(--body); font-weight:800; fill:#15171C;}
.lab-system-map .lrow{display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px 12px; align-items:center; background:#fff; border:var(--b2); border-radius:12px; padding:8px 10px; font-weight:700; font-size:.95rem;}
.lab-system-map .lrow.right{background:var(--good-wash); border-color:var(--good);} .lab-system-map .lrow.wrong{background:var(--bad-wash); border-color:var(--bad);}
.lab-system-map .lrow .why{grid-column:1/-1; font-size:.86rem; font-weight:600;}
.lab-system-map .lrow .ctl{display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;}
.lab-system-map .seg button{min-height:40px; min-width:44px;}
.lab-system-map .seg button:disabled{opacity:.35; cursor:not-allowed;}
.lab-system-map .arr{white-space:nowrap; color:var(--muted);}
@media (max-width:560px){ .lab-system-map .lrow{grid-template-columns:1fr;} .lab-system-map .lrow .ctl{justify-content:flex-start;} }
.lab-system-map .legend{display:flex; gap:14px; flex-wrap:wrap; font-size:.86rem; font-weight:700;}
.lab-system-map .legend span{display:inline-flex; gap:6px; align-items:center;}
.lab-system-map .bdg{display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; border:2px solid var(--ink); font-weight:900; font-family:var(--head);}
`;

const SIGN = { '+': '+', '-': '−' };
const SCOL = { '+': '#109A66', '-': '#D93A40', '?': '#8A8F99' };

// rectangle boundary point from centre c towards p
function edgePoint(c, p, pad = 5) {
  const dx = p.x - c.x, dy = p.y - c.y;
  const k = Math.min((NW / 2 + pad) / Math.abs(dx || 1e-9), (NH / 2 + pad) / Math.abs(dy || 1e-9));
  return { x: c.x + dx * k, y: c.y + dy * k };
}

function mapSVG(map, links, uid) {
  // links: [{f,t,s:'+'|'-'|'?', bend, state:'right'|'wrong'|''}]
  const has = (f, t) => links.some(l => l.f === f && l.t === t);
  let edges = '', badges = '';
  links.forEach((l, i) => {
    const A = map.nodes[l.f], B = map.nodes[l.t];
    const bend = l.bend ?? (has(l.t, l.f) ? 22 : 0);
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, len = Math.hypot(B.x - A.x, B.y - A.y);
    const nx = -(B.y - A.y) / len, ny = (B.x - A.x) / len;
    const cx = mx + nx * bend * 2, cy = my + ny * bend * 2; // quadratic control point
    const a = edgePoint(A, bend ? { x: cx, y: cy } : B), b = edgePoint(B, bend ? { x: cx, y: cy } : A, 9);
    const col = l.state === 'wrong' ? '#D93A40' : '#15171C';
    edges += `<path d="M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.5" marker-end="url(#ah-${uid}${l.state === 'wrong' ? 'r' : ''})"/>`;
    const qx = 0.25 * a.x + 0.5 * cx + 0.25 * b.x, qy = 0.25 * a.y + 0.5 * cy + 0.25 * b.y;
    badges += `<g><circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="13" fill="${l.s === '?' ? '#fff' : SCOL[l.s]}" stroke="#15171C" stroke-width="2"/><text x="${qx.toFixed(1)}" y="${(qy + 6).toFixed(1)}" text-anchor="middle" font-size="19" style="fill:${l.s === '?' ? '#5B606A' : '#fff'}">${l.s === '?' ? '?' : SIGN[l.s]}</text></g>`;
  });
  const nodes = Object.values(map.nodes).map(n => `<g><rect x="${n.x - NW / 2}" y="${n.y - NH / 2}" width="${NW}" height="${NH}" rx="12" fill="#FFF1C2" stroke="#15171C" stroke-width="2.5"/>
    ${n.t.map((ln, k) => `<text x="${n.x}" y="${n.y + (n.t.length === 1 ? 6 : k ? 16 : -3)}" text-anchor="middle" font-size="${ln.length > 15 ? 13 : 15}">${esc(ln)}</text>`).join('')}</g>`).join('');
  const label = links.map(l => `${map.nodes[l.f].t.join(' ')} to ${map.nodes[l.t].t.join(' ')}: ${l.s === '?' ? 'not set' : l.s === '+' ? 'plus' : 'minus'}`).join('; ');
  return `<svg class="smap" viewBox="0 0 360 300" role="img" aria-label="System map. ${esc(label || 'No links yet')}">
    <defs><marker id="ah-${uid}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#15171C"/></marker>
    <marker id="ah-${uid}r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#D93A40"/></marker></defs>
    ${edges}${nodes}${badges}</svg>`;
}

const name = (map, id) => map.nodes[id].t.join(' ');

export default {
  title: 'System Maps: what affects what?',
  mount(ctx) {
    ctx.el.classList.add('lab-system-map');
    const m1 = { signs: {}, checked: false, solved: false };
    const m2 = { topic: null, ex: {}, signs: {}, checked: false, solved: false };
    const order1 = ctx.rng.shuffle(MAP1.links.map((_, i) => i));
    const order2 = { water: ctx.rng.shuffle(MAP2.water.links.map((_, i) => i)), school: ctx.rng.shuffle(MAP2.school.links.map((_, i) => i)) };
    let completed = false;
    const $ = s => ctx.el.querySelector(s);

    function render() {
      const y = window.scrollY;
      ctx.el.innerHTML = `<style>${CSS}</style>
        <p class="lab-intro">A <b>system map</b> shows the elements of a problem and how they affect each other. An arrow goes from cause to effect. <b>+</b> means both change in the <b>same direction</b> (one goes up → the other goes up). <b>−</b> means they change in <b>opposite directions</b> (one goes up → the other goes down).</p>
        <div class="banner"><span class="chip gold">Goal</span><span>Get <b>both system maps</b> fully correct.</span><span class="chip ${m1.solved ? 'ok' : 'dim'}">${m1.solved ? '✓' : '1'} Map 1</span><span class="chip ${m2.solved ? 'ok' : 'dim'}">${m2.solved ? '✓' : '2'} Map 2</span></div>
        ${map1HTML()}
        ${m1.solved ? map2HTML() : '<p class="small muted">Map 2 unlocks when Map 1 is correct.</p>'}
        <div id="smDone">${m1.solved && m2.solved ? doneHTML() : ctx.done ? '<p class="chip ok">✓ Goal already met — practise again any time</p>' : ''}</div>`;
      wire();
      window.scrollTo(0, y);
    }

    function legend() {
      return `<div class="legend"><span><i class="bdg" style="background:${SCOL['+']};color:#fff">+</i> same direction</span><span><i class="bdg" style="background:${SCOL['-']};color:#fff">−</i> opposite direction</span><span><i class="bdg">?</i> not set yet</span></div>`;
    }

    function map1HTML() {
      const links = MAP1.links.map((l, i) => ({ ...l, s: m1.signs[i] || '?', state: m1.checked && m1.signs[i] ? (m1.signs[i] === l.s ? 'right' : 'wrong') : '' }));
      return `<div class="lab-box"><h4>Map 1 · ${MAP1.title}</h4>
        <div class="lab-grid mt">
          <div>${mapSVG(MAP1, links, 'm1')}<div class="mt">${legend()}</div></div>
          <div class="stack" style="gap:8px">${order1.map(i => {
            const l = links[i], st = m1.checked ? (l.state || 'wrong') : '';
            return `<div class="lrow ${st}"><span>${esc(name(MAP1, l.f))} <span class="arr">→</span> ${esc(name(MAP1, l.t))}</span>
              <div class="ctl"><div class="seg" role="group" aria-label="Sign">${['+', '-'].map(s => `<button data-m1="${i}" data-s="${s}" aria-pressed="${m1.signs[i] === s}" aria-label="${s === '+' ? 'plus, same direction' : 'minus, opposite direction'}" ${m1.solved ? 'disabled' : ''}>${SIGN[s]}</button>`).join('')}</div></div>
              ${m1.checked && (st === 'wrong' || m1.solved) ? `<span class="why">${st === 'wrong' ? '✗ ' : '✓ '}${st === 'wrong' && !m1.signs[i] ? 'Choose + or −.' : esc(l.why)}</span>` : ''}</div>`;
          }).join('')}
          ${m1.solved ? '<p class="chip ok">✓ Map 1 correct</p>' : `<div class="row"><button class="btn primary" id="m1Check" ${Object.keys(m1.signs).length < MAP1.links.length ? 'disabled' : ''}>${ic('check')} Check Map 1</button><span class="small muted" aria-live="polite">${m1.msg || 'Set a sign on every arrow.'}</span></div>`}
          </div>
        </div></div>`;
    }

    function map2HTML() {
      const tp = m2.topic, M = tp && MAP2[tp];
      let body = '';
      if (M) {
        const links = M.links.map((l, i) => ({ ...l, i, s: m2.signs[i] || '?' })).filter(l => m2.ex[l.i] === 'y')
          .map(l => ({ ...l, state: m2.checked ? (l.real && l.s === M.links[l.i].s ? 'right' : 'wrong') : '' }));
        body = `<div class="lab-grid mt">
          <div>${mapSVG(M, links, 'm2' + tp)}<div class="mt">${legend()}</div><p class="tiny muted mt">Only the links you say exist are drawn.</p></div>
          <div class="stack" style="gap:8px"><p class="small" style="font-weight:700">7 possible links — only <b>4</b> are real. Mark each one, then sign the real ones.</p>
          ${order2[tp].map(i => {
            const l = M.links[i], ex = m2.ex[i], sg = m2.signs[i];
            let st = '';
            if (m2.checked) st = (l.real ? ex === 'y' && sg === l.s : ex === 'n') ? 'right' : 'wrong';
            return `<div class="lrow ${st}"><span>${esc(name(M, l.f))} <span class="arr">→</span> ${esc(name(M, l.t))}</span>
              <div class="ctl"><div class="seg" role="group" aria-label="Does this link exist?">${[['y', 'Real'], ['n', 'No link']].map(([v, t]) => `<button data-ex="${i}" data-v="${v}" aria-pressed="${ex === v}" ${m2.solved ? 'disabled' : ''}>${t}</button>`).join('')}</div>
              <div class="seg" role="group" aria-label="Sign">${['+', '-'].map(s => `<button data-m2="${i}" data-s="${s}" aria-pressed="${ex === 'y' && sg === s}" aria-label="${s === '+' ? 'plus' : 'minus'}" ${ex !== 'y' || m2.solved ? 'disabled' : ''}>${SIGN[s]}</button>`).join('')}</div></div>
              ${m2.checked && (st === 'wrong' || m2.solved) ? `<span class="why">${st === 'wrong' ? '✗ ' : '✓ '}${st === 'wrong' && l.real && ex === 'y' ? 'This link is real, but check its sign. ' : ''}${st === 'wrong' && l.real && ex !== 'y' ? 'This link is real! ' : ''}${esc(l.why)}</span>` : ''}</div>`;
          }).join('')}
          ${m2.solved ? '<p class="chip ok">✓ Map 2 correct</p>' : `<div class="row"><button class="btn primary" id="m2Check" ${M.links.some((l, i) => !m2.ex[i] || (m2.ex[i] === 'y' && !m2.signs[i])) ? 'disabled' : ''}>${ic('check')} Check Map 2</button><span class="small muted" aria-live="polite">${m2.msg || 'Decide every link (and sign the real ones).'}</span></div>`}
          </div></div>`;
      }
      return `<div class="lab-box"><h4>Map 2 · Choose a problem</h4>
        <div class="seg mt" role="group" aria-label="Choose map 2">${Object.entries(MAP2).map(([k, v]) => `<button data-topic="${k}" aria-pressed="${tp === k}" ${m2.solved ? 'disabled' : ''}>${v.emoji} ${v.title}</button>`).join('')}</div>
        ${body}</div>`;
    }

    function doneHTML() {
      return `<div class="lab-done">${ic('check')}<div>Both maps correct! A <b>System Map</b> shows the elements of a system and the relationships between them: arrows show direction, <b>+</b> is a direct relationship (same direction) and <b>−</b> is an inverse relationship (opposite direction). Loops can form. Maps like this help us decide <b>what data to collect</b> during Data Acquisition.</div></div>`;
    }

    function wire() {
      ctx.el.querySelectorAll('[data-m1]').forEach(b => b.onclick = () => { m1.signs[b.dataset.m1] = b.dataset.s; m1.checked = false; m1.msg = ''; ctx.sfx('tick'); render(); });
      const c1 = $('#m1Check');
      if (c1) c1.onclick = () => {
        m1.checked = true;
        const wrong = MAP1.links.filter((l, i) => m1.signs[i] !== l.s).length;
        if (!wrong) { m1.solved = true; ctx.sfx('ok'); ctx.toast('Map 1 correct! Now choose Map 2.'); }
        else { m1.msg = `${MAP1.links.length - wrong} of ${MAP1.links.length} right — read the red ones.`; ctx.sfx('bad'); }
        render();
      };
      ctx.el.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => {
        if (m2.topic !== b.dataset.topic) { m2.topic = b.dataset.topic; m2.ex = {}; m2.signs = {}; m2.checked = false; m2.msg = ''; }
        ctx.sfx('tick'); render();
      });
      ctx.el.querySelectorAll('[data-ex]').forEach(b => b.onclick = () => { m2.ex[b.dataset.ex] = b.dataset.v; if (b.dataset.v === 'n') delete m2.signs[b.dataset.ex]; m2.checked = false; m2.msg = ''; ctx.sfx('tick'); render(); });
      ctx.el.querySelectorAll('[data-m2]').forEach(b => b.onclick = () => { m2.signs[b.dataset.m2] = b.dataset.s; m2.checked = false; m2.msg = ''; ctx.sfx('tick'); render(); });
      const c2 = $('#m2Check');
      if (c2) c2.onclick = () => {
        const M = MAP2[m2.topic];
        m2.checked = true;
        const wrong = M.links.filter((l, i) => l.real ? !(m2.ex[i] === 'y' && m2.signs[i] === l.s) : m2.ex[i] !== 'n').length;
        const yes = M.links.filter((_, i) => m2.ex[i] === 'y').length;
        if (!wrong) { m2.solved = true; ctx.sfx('ok'); }
        else { m2.msg = `${M.links.length - wrong} of ${M.links.length} right.${yes !== 4 ? ` You marked ${yes} links as real — exactly 4 are.` : ''}`; ctx.sfx('bad'); }
        render();
        if (m2.solved) finish();
      };
    }

    function finish() {
      ctx.data.m1 = true; ctx.data.m2 = m2.topic; ctx.save();
      if (!completed && !ctx.done) { completed = true; ctx.sfx('win'); ctx.complete(`Built two correct system maps (air pollution and ${MAP2[m2.topic].title.toLowerCase()}).`); }
    }

    render();
    return () => { ctx.el.classList.remove('lab-system-map'); };
  }
};
