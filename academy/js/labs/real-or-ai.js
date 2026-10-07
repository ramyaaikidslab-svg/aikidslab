import { esc, ic } from '../core/util.js';

// Palette used by the detail illustrations.
const SKIN = '#D9A066', SKIN_D = '#B97F48', INK = '#15171C', HAIR = '#2A1E17';

function svgWrap(inner, label) {
  return `<svg class="ra-svg" viewBox="0 0 240 170" role="img" aria-label="${esc(label)}">${inner}</svg>`;
}

// Deterministic grain so the "noise" picture is identical for everyone.
function grain(seed, n, x0, y0, w, hgt, cols) {
  let s = seed, out = '';
  const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < n; i++) {
    out += `<rect x="${(x0 + r() * w).toFixed(1)}" y="${(y0 + r() * hgt).toFixed(1)}" width="1.6" height="1.6" fill="${cols[Math.floor(r() * cols.length)]}" opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

const ART = {
  hand: () => svgWrap(`
    <rect width="240" height="170" fill="#EAF1FB"/>
    <g stroke="${INK}" stroke-width="2.5" fill="${SKIN}" stroke-linejoin="round">
      <rect x="56" y="104" width="22" height="50" rx="11" transform="rotate(-38 67 129)"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${82 + i * 16}" y="${36 + Math.abs(i - 2) * 7}" width="15" height="${74 - Math.abs(i - 2) * 7}" rx="7.5"/>`).join('')}
      <rect x="78" y="92" width="88" height="70" rx="24"/>
    </g>
    <g font-family="Nunito,system-ui,sans-serif" font-size="10" font-weight="800" text-anchor="middle">
      ${[[42, 104], [89, 24], [105, 17], [121, 12], [137, 17], [153, 24]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7.5" fill="#FFC800" stroke="${INK}" stroke-width="1.5"/><text x="${x}" y="${y + 3.5}">${i + 1}</text>`).join('')}
    </g>`, 'A hand with five fingers plus a thumb: six digits, numbered 1 to 6'),

  sign: () => svgWrap(`
    <defs><filter id="raMelt" x="-10%" y="-30%" width="120%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter></defs>
    <rect width="240" height="170" fill="#F4E7D3"/>
    <rect x="20" y="96" width="200" height="74" fill="#C9B79C" stroke="${INK}" stroke-width="2"/>
    <path d="M20 96h200v16H20z" fill="#E8453C" stroke="${INK}" stroke-width="2"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect x="${20 + i * 20}" y="96" width="10" height="16" fill="#fff" opacity=".85"/>`).join('')}
    <rect x="18" y="30" width="204" height="58" rx="6" fill="#FFC800" stroke="${INK}" stroke-width="2.5"/>
    <g filter="url(#raMelt)"><text x="120" y="70" text-anchor="middle" font-family="Baloo 2,Trebuchet MS,sans-serif" font-weight="800" font-size="27" fill="#7A1E16">MITHIA SHPO</text></g>
    <rect x="60" y="120" width="40" height="50" fill="#8A6B4A" stroke="${INK}" stroke-width="2"/>
    <rect x="130" y="120" width="60" height="34" fill="#BFE3F2" stroke="${INK}" stroke-width="2"/>`, 'A yellow shop sign whose letters are warped and misspelt, reading MITHIA SHPO'),

  earrings: () => svgWrap(`
    <rect width="240" height="170" fill="#F3E9FF"/>
    <path d="M62 150V84c0-44 116-44 116 0v66z" fill="${HAIR}"/>
    <ellipse cx="68" cy="98" rx="9" ry="14" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="172" cy="98" rx="9" ry="14" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="120" cy="96" rx="48" ry="56" fill="${SKIN}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M66 94C58 12 182 12 174 94 162 64 140 58 120 60 100 58 78 64 66 94z" fill="${HAIR}"/>
    <path d="M120 34v24" stroke="#5A4030" stroke-width="2"/>
    <circle cx="102" cy="96" r="4.5" fill="${INK}"/><circle cx="138" cy="96" r="4.5" fill="${INK}"/>
    <path d="M108 126q12 9 24 0" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="120" cy="80" r="3" fill="#E8453C"/>
    <line x1="66" y1="111" x2="66" y2="118" stroke="#B8860B" stroke-width="2"/>
    <path d="M54 134q12-22 24 0z" fill="#FFC800" stroke="#87620F" stroke-width="2"/>
    <circle cx="58" cy="138" r="2.2" fill="#FFC800" stroke="#87620F"/><circle cx="66" cy="139" r="2.2" fill="#FFC800" stroke="#87620F"/><circle cx="74" cy="138" r="2.2" fill="#FFC800" stroke="#87620F"/>
    <line x1="174" y1="111" x2="174" y2="115" stroke="#8A8F99" stroke-width="2"/>
    <rect x="165" y="115" width="18" height="18" transform="rotate(45 174 124)" fill="none" stroke="#5DA9E9" stroke-width="3.5"/>
    <text x="18" y="164" font-family="Nunito,sans-serif" font-size="11" font-weight="800" fill="${INK}">gold jhumka</text>
    <text x="160" y="164" font-family="Nunito,sans-serif" font-size="11" font-weight="800" fill="${INK}">blue square</text>`, 'A portrait where the left earring is a gold jhumka and the right earring is a blue square'),

  mirror: () => {
    const person = (x, shirt, cup) => `
      <circle cx="${x}" cy="62" r="15" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>
      <path d="M${x - 15} 58q15-24 30 0" fill="${HAIR}"/>
      <path d="M${x - 20} 135l6-55h28l6 55z" fill="${shirt}" stroke="${INK}" stroke-width="2"/>
      <path d="M${x - 14} 84l-12 34" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      ${cup ? `<path d="M${x + 14} 84l14 18" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><rect x="${x + 24}" y="96" width="12" height="14" rx="2" fill="#fff" stroke="${INK}" stroke-width="2"/>`
        : `<path d="M${x + 14} 84l12 34" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`}
      <path d="M${x - 8} 135v22M${x + 8} 135v22" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    return svgWrap(`
      <rect width="240" height="170" fill="#FFF6E5"/>
      <rect x="130" y="16" width="96" height="146" rx="10" fill="#D6ECF5" stroke="#8A6B4A" stroke-width="6"/>
      <path d="M150 30l20 0-30 40z" fill="#fff" opacity=".6"/>
      ${person(70, '#E8453C', true)}
      <g transform="translate(248 0) scale(-1 1)">${person(70, '#109A66', false)}</g>
      <text x="178" y="12" text-anchor="middle" font-family="Nunito,sans-serif" font-size="11" font-weight="800" fill="${INK}">mirror</text>`,
      'A girl in a red top holding a cup stands by a mirror; her reflection wears green and holds no cup');
  },

  street: () => svgWrap(`
    <rect width="240" height="170" fill="#DDEBF7"/>
    <rect x="114" y="80" width="12" height="90" fill="#8A8F99" stroke="${INK}" stroke-width="2"/>
    <rect x="26" y="22" width="188" height="68" rx="8" fill="#0F7A4B" stroke="${INK}" stroke-width="2.5"/>
    <rect x="32" y="28" width="176" height="56" rx="5" fill="none" stroke="#fff" stroke-width="2"/>
    <text x="44" y="64" font-family="Trebuchet MS,Arial,sans-serif" font-weight="700" font-size="21" fill="#fff" textLength="116" lengthAdjust="spacingAndGlyphs">M.G. ROAD</text>
    <path d="M172 56h24M188 49l8 7-8 7" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="176" y="79" text-anchor="middle" font-family="Trebuchet MS,Arial,sans-serif" font-size="11" fill="#fff">200 m</text>
    <circle cx="38" cy="34" r="2.5" fill="#C9CCD3"/><circle cx="202" cy="34" r="2.5" fill="#C9CCD3"/><circle cx="38" cy="78" r="2.5" fill="#C9CCD3"/><circle cx="202" cy="78" r="2.5" fill="#C9CCD3"/>
    <path d="M44 84q8-3 14 0M150 30q10 2 18 0" stroke="#7FB59A" stroke-width="2" fill="none" opacity=".8"/>
    <circle cx="70" cy="82" r="3" fill="#8B5A2B" opacity=".5"/><circle cx="196" cy="70" r="2" fill="#8B5A2B" opacity=".45"/>`,
    'A green street sign reading M.G. ROAD with an arrow and 200 m; slight scratches and rust spots'),

  noise: () => svgWrap(`
    <defs><linearGradient id="raSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2440"/><stop offset="1" stop-color="#46507A"/></linearGradient>
      <radialGradient id="raLamp"><stop offset="0" stop-color="#FFE9A8"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>
    <rect width="240" height="170" fill="url(#raSky)"/>
    <rect y="128" width="240" height="42" fill="#2A2F3A"/>
    <circle cx="70" cy="48" r="38" fill="url(#raLamp)"/>
    <rect x="66" y="50" width="6" height="80" fill="#15171C"/><rect x="58" y="42" width="22" height="9" rx="3" fill="#FFE9A8"/>
    <rect x="140" y="88" width="70" height="40" fill="#3A3F52"/><rect x="150" y="96" width="14" height="12" fill="#FFD66B"/><rect x="180" y="96" width="14" height="12" fill="#FFD66B" opacity=".7"/>
    ${grain(12345, 700, 0, 0, 240, 170, ['#ffffff', '#c9d2ff', '#ffd9c9', '#000000'])}`,
    'A night street photo with fine, evenly spread random grain over everything'),

  symmetric: () => {
    const half = `
      <path d="M120 22c-34 0-52 24-52 58 0 8 1 14 3 20-4 0-8 4-6 12 2 7 7 9 10 9 8 22 26 36 45 36z" fill="#E7B98A" stroke="${INK}" stroke-width="2.5"/>
      <path d="M120 18c-40 0-58 28-56 64 8-22 26-36 56-38z" fill="${HAIR}"/>
      <ellipse cx="98" cy="88" rx="9" ry="6" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="98" cy="88" r="4" fill="#3A2A1E"/><circle cx="99.5" cy="86.5" r="1.3" fill="#fff"/>
      <path d="M86 76q12-7 24 0" fill="none" stroke="${HAIR}" stroke-width="3" stroke-linecap="round"/>
      <path d="M120 118q-9 0-12-4" fill="none" stroke="${SKIN_D}" stroke-width="2" stroke-linecap="round"/>
      <path d="M120 134q-12 0-16-6" fill="none" stroke="#B5524A" stroke-width="3" stroke-linecap="round"/>`;
    return svgWrap(`
      <rect width="240" height="170" fill="#FFF1E8"/>
      ${half}<g transform="translate(240 0) scale(-1 1)">${half}</g>
      <line x1="120" y1="6" x2="120" y2="166" stroke="#2F6FED" stroke-width="2" stroke-dasharray="5 4"/>
      <text x="126" y="164" font-family="Nunito,sans-serif" font-size="10" font-weight="800" fill="#2F6FED">mirror line</text>`,
      'A face where the left half is an exact mirror copy of the right half, with very smooth skin');
  },

  citation: () => `<div class="ra-doc" role="img" aria-label="A paragraph with a citation to a journal">
      <div class="tiny muted" style="font-weight:800">From a “study tips” article</div>
      <p>Drinking coconut water before an exam improves memory. Students who did this scored <b>23% higher</b>
      <span class="ra-cite">(Sharma &amp; Rao, 2019, <i>Journal of Indian Exam Science</i>, vol. 12, p. 45)</span>.</p>
      <p class="tiny muted">🔍 Search result for “Journal of Indian Exam Science”: <b>no matching journal found</b>.</p></div>`
};

// verdict: 'ai' | 'real'. clue index 0 is the correct clue; options are shuffled per learner.
const CARDS = [
  { art: 'hand', verdict: 'ai', cap: 'Close-up of a hand from a viral “prize-giving” photo.',
    clues: ['The hand has six digits: five fingers plus a thumb.', 'The background is light blue.', 'The skin colour is warm.'],
    why: 'Image generators often get hands wrong: extra or merged fingers, odd joints.',
    caveat: 'A clue is not proof: a few people really are born with an extra finger (polydactyly).',
    verify: 'Find the original post. Was the event covered by the school or a newspaper with other photos?' },
  { art: 'sign', verdict: 'ai', cap: 'A shop sign in the background of a street photo shared online.',
    clues: ['The letters look melted and spell nonsense (“MITHIA SHPO”).', 'The shop has a striped awning.', 'The sign is yellow.'],
    why: 'Image generators learn what text looks like, not how to spell, so background text is often warped gibberish.',
    caveat: 'Real signs can have typos or worn paint too, so look for other clues as well.',
    verify: 'Does this shop exist? Look it up on a map or find other photos of the same street.' },
  { art: 'earrings', verdict: 'ai', cap: 'Close-up from a portrait shared as “my cousin’s wedding photo”.',
    clues: ['The two earrings are completely different in shape, colour and metal.', 'She is wearing a bindi.', 'Her hair is dark.'],
    why: 'Generators draw each side of a face separately and often forget that pairs (earrings, eyes, collars) should match.',
    caveat: 'Some people wear mismatched earrings on purpose, so this is a clue, not proof.',
    verify: 'Ask the person who shared it, or look for other photos from the same wedding.' },
  { art: 'mirror', verdict: 'ai', cap: 'A photo of a girl standing next to a mirror.',
    clues: ['The reflection wears a different colour and is not holding the cup.', 'The mirror has a wooden frame.', 'She is smiling.'],
    why: 'Reflections must copy the scene exactly. AI images often get reflections, shadows and lighting inconsistent.',
    caveat: 'Camera angle can hide things in a mirror, but it cannot change the colour of clothes.',
    verify: 'Reverse-image search the photo to find where it first appeared.' },
  { art: 'street', verdict: 'real', cap: 'A street sign photographed in Bengaluru.',
    clues: ['The text is spelled correctly, sharp and consistent, and the wear looks natural.', 'Green signs are always AI-made.', 'The picture has an arrow, so it must be fake.'],
    why: 'Clean, correctly spelled text with natural wear (scratches, rust spots) is what we expect from a real camera photo.',
    caveat: 'Newer AI tools can write text well, so a clean sign does not prove a photo is real.',
    verify: 'Check the location on a map: is there really an M.G. Road there?' },
  { art: 'noise', verdict: 'real', cap: 'A phone photo of a street at night.',
    clues: ['Fine, random grain is spread evenly over everything, like a phone camera in low light.', 'It is night time, so it must be AI.', 'The lamp is glowing.'],
    why: 'Camera sensors add random “noise” in low light, evenly across the whole image. AI images are often unnaturally smooth.',
    caveat: 'Noise can be added to an AI image with an editing app, so grain alone is not proof.',
    verify: 'Check the photo’s source and whether the original file has camera details (metadata).' },
  { art: 'symmetric', verdict: 'ai', cap: 'A profile picture from a new account that sent you a friend request.',
    clues: ['Both halves of the face are perfect mirror copies and the skin is plastic-smooth.', 'The person has eyebrows.', 'The background is peach.'],
    why: 'Real faces are slightly uneven (one eye a little higher, a different smile line). Perfect symmetry and plastic skin are common in generated faces.',
    caveat: 'Some real people have very symmetrical faces, and photo filters smooth skin.',
    verify: 'A new account with an AI-looking face could be fake. Don’t accept requests from people you don’t know.' },
  { art: 'citation', verdict: 'ai', cap: 'A paragraph from an online “study tips” article.',
    clues: ['The cited journal can’t be found anywhere when you search for it.', 'It mentions coconut water.', 'It has a number in it.'],
    why: 'Chatbots can “hallucinate” references that look real but don’t exist.',
    caveat: 'A citation you can’t find quickly might just be obscure. Check a library or ask a teacher.',
    verify: 'Search for the paper itself. Real studies can be found and read.' }
];

const CSS = `
.lab-real-or-ai .ra-card{background:#fff; border:var(--b2); border-radius:14px; padding:14px; display:grid; gap:12px;}
.lab-real-or-ai .ra-view{position:relative; border:var(--b2); border-radius:12px; overflow:hidden; background:#fff; max-width:480px; width:100%; justify-self:center;}
.lab-real-or-ai .ra-svg{display:block; width:100%; height:auto;}
.lab-real-or-ai .ra-tag{position:absolute; left:8px; top:8px; background:var(--ink); color:#fff; font-size:.72rem; font-weight:800; padding:2px 8px; border-radius:999px; letter-spacing:.08em;}
.lab-real-or-ai .ra-doc{padding:36px 16px 16px; background:#FFFDF6; display:grid; gap:8px; min-height:170px; align-content:center; font-size:.98rem;}
.lab-real-or-ai .ra-cite{background:var(--gold-wash); border-bottom:2px dashed var(--gold-deep);}
.lab-real-or-ai .ra-verdict{display:grid; grid-template-columns:1fr 1fr; gap:10px;}
.lab-real-or-ai .ra-verdict .btn[aria-pressed="true"]{background:var(--ink); color:#fff; opacity:1;}
@media (max-width:420px){ .lab-real-or-ai .ra-verdict{grid-template-columns:1fr;} }
`;

export default {
  title: 'Real or AI? Inspect the clues',
  mount(ctx) {
    const order = ctx.rng.shuffle(CARDS.map((_, i) => i));
    const clueOrder = CARDS.map(c => ctx.rng.shuffle(c.clues.map((_, i) => i)));
    let idx = 0, verdict = null, clue = null, completed = false;
    let score = { verdict: 0, clue: 0 };

    function render() {
      if (idx >= CARDS.length) return renderEnd();
      const c = CARDS[order[idx]];
      const revealed = clue !== null;
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-real-or-ai stack">
          <p class="lab-intro">Detectives don’t guess, they collect <b>clues</b>. Zoom in on each detail, decide if the picture or text is <b>likely AI-generated</b> or <b>likely real</b>, then name the clue you used.</p>
          <div class="qcount"><span><b>Goal:</b> inspect all ${CARDS.length} cards</span><span>Card ${idx + 1} / ${CARDS.length} · verdicts right ${score.verdict}</span>
            <div class="dots" aria-hidden="true">${CARDS.map((_, i) => `<i class="${i < idx ? 'ok' : i === idx ? 'now' : ''}"></i>`).join('')}</div></div>
          ${ctx.done ? '<p class="chip ok">Already completed — replay any time</p>' : ''}
          <div class="ra-card">
            <div class="ra-view"><span class="ra-tag">ZOOMED DETAIL</span>${ART[c.art]()}</div>
            <p class="small"><b>${esc(c.cap)}</b></p>
            <div class="ra-verdict" role="group" aria-label="Your verdict">
              <button class="btn" data-v="ai" aria-pressed="${verdict === 'ai'}" ${revealed ? 'disabled' : ''}>${ic('wand')} Likely AI-generated</button>
              <button class="btn" data-v="real" aria-pressed="${verdict === 'real'}" ${revealed ? 'disabled' : ''}>${ic('eye')} Likely real</button>
            </div>
            ${verdict ? `<div><p class="small" style="font-weight:800">Which clue did you use?</p>
              <div class="opts mt" role="group" aria-label="Clue">${clueOrder[order[idx]].map((ci, k) => {
                const cls = revealed ? (ci === 0 ? 'right' : ci === clue ? 'wrong' : '') : '';
                return `<button class="opt ${cls}" data-c="${ci}" ${revealed ? 'disabled' : ''}><span class="k">${'ABC'[k]}</span><span>${esc(c.clues[ci])}</span></button>`;
              }).join('')}</div></div>` : ''}
            <div aria-live="polite">${revealed ? reveal(c) : ''}</div>
          </div>
          ${revealed ? `<div class="row"><button class="btn primary" id="raNext">${idx === CARDS.length - 1 ? 'Finish' : 'Next card'} ${ic('arrow')}</button></div>` : ''}
        </div>`;
      ctx.el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { verdict = b.dataset.v; ctx.sfx('tick'); render(); ctx.el.querySelector('[data-c]')?.focus(); });
      ctx.el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => pickClue(+b.dataset.c));
      const nx = ctx.el.querySelector('#raNext');
      if (nx) nx.onclick = () => { idx++; verdict = null; clue = null; render(); ctx.el.querySelector('[data-v]')?.focus(); };
    }

    function pickClue(ci) {
      const c = CARDS[order[idx]];
      clue = ci;
      if (verdict === c.verdict) score.verdict++;
      if (ci === 0) score.clue++;
      ctx.sfx(verdict === c.verdict && ci === 0 ? 'ok' : verdict === c.verdict ? 'pop' : 'bad');
      render();
    }

    function reveal(c) {
      const vOk = verdict === c.verdict, cOk = clue === 0;
      const ans = c.verdict === 'ai' ? 'Likely AI-generated' : 'Likely real';
      return `<div class="fb ${vOk ? 'good' : 'bad'}">
        <div class="h">${ic(vOk ? 'check' : 'x')} ${vOk ? 'Good call' : 'Not quite'}: ${ans}</div>
        <div>${cOk ? 'Strong clue! ' : 'That clue doesn’t tell us much. The useful clue: <b>' + esc(c.clues[0]) + '</b> '}${esc(c.why)}</div>
        <div class="warn small"><b>Clue ≠ proof.</b>${esc(c.caveat)}</div>
        <div class="key small"><b>Verify the source</b>${esc(c.verify)}</div></div>`;
    }

    function renderEnd() {
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-real-or-ai stack">
          <div class="row between"><h4>Inspection report</h4><span class="chip gold">Verdicts ${score.verdict}/${CARDS.length} · Clues ${score.clue}/${CARDS.length}</span></div>
          <div class="cols">
            <div class="mini"><h4>Clues in images</h4><p>Extra fingers, melted text, mismatched pairs, wrong reflections, plastic-smooth perfect faces.</p></div>
            <div class="mini"><h4>Clues in text</h4><p>Confident facts with sources that can’t be found anywhere (hallucinated citations).</p></div>
            <div class="mini"><h4>Verify the source</h4><p>Who posted it first? Reverse-image search, look for other photos or trusted news, and check the citation really exists.</p></div>
          </div>
          <div class="lab-done">${ic('check')}<div>Generative AI can make content that looks real. <b>Look for clues, and verify the source.</b> A clue is only a hint, never proof; checking where something came from is what settles it.</div></div>
          <div class="row"><button class="btn sm" id="raAgain">${ic('refresh')} Inspect again</button></div>
        </div>`;
      ctx.el.querySelector('#raAgain').onclick = () => { idx = 0; verdict = null; clue = null; score = { verdict: 0, clue: 0 }; render(); };
      if (!completed) {
        completed = true;
        ctx.sfx('win');
        ctx.data.best = Math.max(ctx.data.best || 0, score.verdict); ctx.save();
        if (!ctx.done) ctx.complete(`Inspected 8 cards for AI clues (${score.verdict}/8 verdicts right) and learned to verify the source.`);
      }
    }

    render();
    return () => {};
  }
};
