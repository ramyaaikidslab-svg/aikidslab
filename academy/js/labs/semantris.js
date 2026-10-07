import { esc, ic } from '../core/util.js';

// Semantris-style word game. The "AI" ranks tower words by how related they are
// to the learner's clue, using a hand-built association table (like a tiny
// word-association model learned from how words are used together).

export const WORDS = {
  food: ['mango', 'tea', 'samosa', 'rice', 'ice cream'],
  animal: ['elephant', 'tiger', 'peacock', 'cow', 'monkey', 'fish'],
  school: ['teacher', 'exam', 'pencil', 'library'],
  nature: ['rain', 'sun', 'river', 'tree', 'mountain', 'moon'],
  sport: ['cricket', 'football', 'kite'],
  things: ['phone', 'fan', 'train', 'bicycle', 'umbrella'],
  life: ['doctor', 'Diwali', 'Holi']
};
export const TOWER = Object.values(WORDS).flat();
const CAT = Object.fromEntries(Object.entries(WORDS).flatMap(([c, ws]) => ws.map(w => [w, c])));

// clue -> "word:strength ..."  (3 = very strongly related, 2 = related, 1 = loosely related)
const RAW = {
  fruit: 'mango:3 tree:1', juicy: 'mango:3 ice cream:1', pickle: 'mango:3 rice:1',
  cup: 'tea:3 ice cream:1 cricket:1', kettle: 'tea:3', biscuit: 'tea:3',
  chutney: 'samosa:3 rice:1', crispy: 'samosa:3', snack: 'samosa:3 tea:1 ice cream:1',
  dal: 'rice:3', grain: 'rice:3', farmer: 'rice:3 cow:2 rain:2 tree:1',
  cone: 'ice cream:3', cold: 'ice cream:3 mountain:2 rain:1 fan:1', sweet: 'ice cream:3 mango:2 Diwali:2',
  trunk: 'elephant:3 tree:2', tusk: 'elephant:3', huge: 'elephant:3 mountain:2 train:1',
  stripes: 'tiger:3', roar: 'tiger:3', jungle: 'tiger:3 monkey:2 elephant:2 tree:2 peacock:1',
  feathers: 'peacock:3 kite:1', dance: 'peacock:3 Holi:2 Diwali:1',
  moo: 'cow:3', grass: 'cow:3 tree:1 football:1 cricket:1', milk: 'cow:3 tea:2 ice cream:2',
  banana: 'monkey:3 mango:1', naughty: 'monkey:3',
  swim: 'fish:3 river:2', pond: 'fish:3 river:1 rain:1', net: 'fish:3 football:2 cricket:1',
  blackboard: 'teacher:3 pencil:1 exam:1', lesson: 'teacher:3 exam:1 library:1',
  marks: 'exam:3 teacher:1', result: 'exam:3 cricket:1', nervous: 'exam:3 doctor:1',
  sharpener: 'pencil:3', eraser: 'pencil:3 exam:1', draw: 'pencil:3 cricket:1',
  books: 'library:3 teacher:1 exam:1', quiet: 'library:3 moon:1',
  cloud: 'rain:3 mountain:1 sun:1', monsoon: 'rain:3 umbrella:2 river:1', thunder: 'rain:3', wet: 'rain:3 umbrella:2 river:2 fish:1',
  hot: 'sun:3 tea:2 fan:2 samosa:1', morning: 'sun:3 tea:2', bright: 'sun:3 Diwali:2 moon:1',
  Ganga: 'river:3', bridge: 'river:3 train:1', boat: 'river:3 fish:1',
  leaves: 'tree:3', shade: 'tree:3 umbrella:2', wood: 'tree:3 pencil:2 cricket:1',
  Himalaya: 'mountain:3 river:1', snow: 'mountain:3 ice cream:1', peak: 'mountain:3',
  night: 'moon:3', stars: 'moon:3',
  bat: 'cricket:3', wicket: 'cricket:3',
  goal: 'football:3', kick: 'football:3',
  string: 'kite:3', sky: 'kite:3 moon:2 sun:2 rain:1',
  selfie: 'phone:3', call: 'phone:3', charger: 'phone:3',
  breeze: 'fan:3 river:1 tree:1', ceiling: 'fan:3',
  station: 'train:3', track: 'train:3 bicycle:1',
  pedal: 'bicycle:3', wheels: 'bicycle:3 train:2', helmet: 'bicycle:3 cricket:2',
  hospital: 'doctor:3', medicine: 'doctor:3', fever: 'doctor:3 rain:1',
  diya: 'Diwali:3', crackers: 'Diwali:3', rangoli: 'Diwali:3 Holi:1',
  colours: 'Holi:3 peacock:2 kite:1', gulal: 'Holi:3', splash: 'Holi:3 rain:2 river:1',
  handle: 'umbrella:3 bicycle:2', fold: 'umbrella:3'
};
export const ASSOC = Object.fromEntries(Object.entries(RAW).map(([c, s]) => [c, Object.fromEntries([...s.matchAll(/([A-Za-z][A-Za-z ]*?):(\d)/g)].map(m => [m[1].trim(), +m[2]]))]));
export const CLUES = Object.keys(ASSOC);
// a clue belongs to the category of the word it is most strongly linked to
const CLUE_CAT = Object.fromEntries(CLUES.map(c => { const top = Object.entries(ASSOC[c]).sort((a, b) => b[1] - a[1])[0]; return [c, top ? CAT[top[0]] : null]; }));

export function score(clue, word) { return (ASSOC[clue]?.[word] || 0) + (CLUE_CAT[clue] === CAT[word] ? 0.5 : 0); }
export function rank(clue, tower) {
  return tower.map((w, i) => ({ w, i, s: score(clue, w) })).sort((a, b) => b.s - a.s || a.i - b.i);
}
// clues that make `target` the clear #1 in this tower
export function winners(target, tower) {
  return CLUES.filter(c => { const st = score(c, target); return st > 0 && tower.every(w => w === target || score(c, w) < st); });
}

const TOWER_SIZE = 8, GOAL = 8, MAXS = 3.5;

const CSS = `
.lab-semantris .tower{display:grid; gap:6px;}
.lab-semantris .tw{display:flex; align-items:center; justify-content:space-between; gap:8px; background:#fff; border:var(--b2); border-radius:10px; padding:8px 12px; font-family:var(--head); font-weight:800; font-size:1.12rem; min-height:44px; transition:background .2s, transform .2s;}
.lab-semantris .tw.target{background:var(--gold); box-shadow:var(--sh-sm);}
.lab-semantris .tw.target::after{content:'TARGET'; font-family:var(--body); font-size:.68rem; letter-spacing:.12em; background:var(--ink); color:#fff; padding:2px 8px; border-radius:999px;}
.lab-semantris .tw.picked{outline:3px solid var(--blue); outline-offset:1px;}
.lab-semantris .tw.gone{background:var(--good-wash); border-color:var(--good); animation:smGone .55s forwards;}
.lab-semantris .tw.drop{animation:smDrop .45s var(--ease);}
@keyframes smGone{to{opacity:0; transform:scale(.9) translateX(30px);}}
@keyframes smDrop{from{opacity:0; transform:translateY(-24px);} to{opacity:1; transform:none;}}
.lab-semantris .clues{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px;}
@media (max-width:420px){ .lab-semantris .clues{grid-template-columns:repeat(2,minmax(0,1fr));} }
.lab-semantris .clues .btn{min-height:44px; padding:8px 6px; font-size:.95rem;}
.lab-semantris .rk{display:grid; grid-template-columns:22px 90px 1fr 44px; gap:8px; align-items:center; font-weight:800; font-size:.92rem;}
.lab-semantris .rk.win .meter i{background:var(--good);}
.lab-semantris .rk .n{font-family:var(--head);}
.lab-semantris .sm-form{display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px;}
`;

export default {
  title: 'Semantris: make the AI find your word',
  mount(ctx) {
    ctx.el.classList.add('lab-semantris');
    const rng = ctx.rng;
    let tower = rng.sample(TOWER, TOWER_SIZE);
    let target = rng.pick(tower);
    let cleared = 0, tries = 0, chips = [], busy = false, completed = false, fresh = null;
    const timers = new Set();
    const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); };

    ctx.el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">The gold word is your <b>target</b>. Pick a clue word that is closely related to it. The AI ranks every word in the tower by how related it is to your clue — if your target comes out <b>#1</b>, it is cleared!</p>
      <div class="banner"><span class="chip gold">Goal</span><span>Clear <b>${GOAL} target words</b>.</span></div>
      <div class="lab-grid">
        <div class="lab-box"><div class="row between mb"><h4 style="margin:0">Word tower</h4><span class="chip" id="smCount"></span></div><div class="tower" id="smTower" aria-live="polite"></div></div>
        <div class="lab-box stack" style="gap:12px">
          <div><h4>Choose a clue</h4><div class="clues" id="smClues"></div></div>
          <form class="sm-form" id="smForm" autocomplete="off"><label class="sr" for="smIn">Type a clue</label>
            <input class="input" id="smIn" maxlength="20" placeholder="…or type a clue"><button class="btn" type="submit">Try</button></form>
          <div id="smRank" aria-live="polite"><p class="small muted">The AI's ranking will appear here.</p></div>
        </div>
      </div>
      <div class="meter" aria-hidden="true"><i id="smMeter" style="width:0"></i></div>
      <div id="smDone"></div>`;
    const $ = s => ctx.el.querySelector(s);

    function dealChips() {
      const win = rng.shuffle(winners(target, tower)).slice(0, 2);
      const decoys = rng.shuffle(CLUES.filter(c => !win.includes(c) && tower.some(w => w !== target && (ASSOC[c][w] || 0) >= 2) && !win.includes(c)));
      const rest = rng.shuffle(CLUES.filter(c => !win.includes(c) && !decoys.includes(c)));
      chips = rng.shuffle([...win, ...decoys.slice(0, 7), ...rest].filter((c, i, a) => a.indexOf(c) === i).slice(0, 12));
      if (!win.some(w => chips.includes(w))) chips[0] = win[0];
      $('#smClues').innerHTML = chips.map(c => `<button type="button" class="btn sm" data-c="${esc(c)}">${esc(c)}</button>`).join('');
    }
    function drawTower(picked = null, gone = null) {
      $('#smTower').innerHTML = tower.map(w => `<div class="tw ${w === target ? 'target' : ''} ${w === picked ? 'picked' : ''} ${w === gone ? 'gone' : ''} ${w === fresh ? 'drop' : ''}">${esc(w)}</div>`).join('');
      fresh = null;
      $('#smCount').textContent = `Cleared ${cleared} / ${GOAL}`;
      $('#smMeter').style.width = Math.min(100, cleared / GOAL * 100) + '%';
    }

    function play(clue) {
      if (busy) return;
      const key = CLUES.find(c => c.toLowerCase() === clue.trim().toLowerCase());
      if (!key) {
        $('#smRank').innerHTML = `<div class="fb bad"><div class="h">${ic('alert')} The AI hasn't learned “${esc(clue)}” yet</div><div class="small">It only knows words it has seen in its training text. Try one of the clue words.</div></div>`;
        ctx.sfx('bad'); return;
      }
      tries++;
      const r = rank(key, tower), top = r[0], hit = top.w === target && (r[1] ? top.s > r[1].s : true);
      const tPos = r.findIndex(x => x.w === target) + 1;
      $('#smRank').innerHTML = `<h4>Clue “${esc(key)}” → AI's ranking</h4>
        <div class="stack" style="gap:6px">${r.slice(0, 3).map((x, i) => `<div class="rk ${x.w === target && hit ? 'win' : ''}"><span class="n">#${i + 1}</span><span>${esc(x.w)}${x.w === target ? ' 🎯' : ''}</span><div class="meter"><i style="width:${Math.round(x.s / MAXS * 100)}%"></i></div><span>${Math.round(x.s / MAXS * 100)}%</span></div>`).join('')}</div>
        <p class="small mt" style="font-weight:800">${hit ? `✓ “${esc(target)}” was ranked #1 — cleared!` : top.w === target ? `It's a tie at the top — the AI couldn't decide. Pick a clue that fits “${esc(target)}” more closely.` : `The AI thought you meant “${esc(top.w)}”. Your target “${esc(target)}” came #${tPos}.`}</p>`;
      if (hit) {
        ctx.sfx('ok'); busy = true; cleared++;
        drawTower(null, target);
        later(() => {
          const pool = TOWER.filter(w => !tower.includes(w));
          const nw = rng.pick(pool);
          tower = tower.filter(w => w !== target); tower.unshift(nw); fresh = nw;
          target = rng.pick(tower.filter(w => w !== nw).concat(nw));
          busy = false; drawTower(); dealChips();
          if (cleared >= GOAL) finish();
        }, 550);
      } else { ctx.sfx('bad'); drawTower(top.w); }
    }

    function finish() {
      if (!$('#smDone').innerHTML.includes('lab-done')) {
        $('#smDone').innerHTML = `<div class="lab-done">${ic('check')}<div>You cleared ${cleared} words in ${tries} tries. This is <b>Natural Language Processing (NLP)</b>: models learn which words are related by seeing how words are used together in lots of text — “stripes” appears near “tiger”, “wicket” near “cricket”.</div></div>`;
      }
      ctx.data.best = Math.max(ctx.data.best || 0, cleared); ctx.save();
      if (!completed && !ctx.done) { completed = true; ctx.sfx('win'); ctx.complete(`Cleared ${cleared} Semantris targets in ${tries} tries.`); }
    }

    $('#smClues').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) play(b.dataset.c); });
    $('#smForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#smIn').value.trim(); if (v) { play(v); $('#smIn').value = ''; } });

    drawTower(); dealChips();
    if (ctx.done) $('#smDone').innerHTML = `<p class="chip ok">✓ Goal already met — keep playing for fun</p>`;
    return () => { timers.forEach(clearTimeout); timers.clear(); ctx.el.classList.remove('lab-semantris'); };
  }
};
