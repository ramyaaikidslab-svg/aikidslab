import { esc, ic } from '../core/util.js';

// Smart Home: a tiny, deterministic "NLU" that turns a sentence into an intent
// + entities (rooms, level) + confidence, the way tools like Microsoft LUIS do.

const ROOMS = [
  { id: 'bedroom', name: 'Bedroom', x: 6, y: 6, w: 150, h: 150, lamp: [81, 92] },
  { id: 'study', name: 'Study', x: 156, y: 6, w: 118, h: 150, lamp: [215, 96] },
  { id: 'kitchen', name: 'Kitchen', x: 274, y: 6, w: 140, h: 150, lamp: [344, 96] },
  { id: 'living', name: 'Living room', x: 6, y: 156, w: 268, h: 168, lamp: [140, 250] },
  { id: 'balcony', name: 'Balcony', x: 274, y: 156, w: 140, h: 168, lamp: [344, 250] }
];
const RNAME = Object.fromEntries(ROOMS.map(r => [r.id, r.name]));
const INTENTS = ['TurnOn', 'TurnOff', 'Dim', 'Brighten', 'SetLevel', 'Status', 'None'];
const GOAL_OK = 5, GOAL_INTENTS = 3;

/* ---------------- the intent parser ---------------- */

const ROOM_RX = [
  ['living', /\b(living ?rooms?|living|lounge|hall|drawing ?rooms?|sitting ?rooms?|baithak)\b/],
  ['bedroom', /\b(bed ?rooms?|my room|sleeping rooms?)\b/],
  ['kitchen', /\b(kitchens?|rasoi(?: ?ghar)?)\b/],
  ['study', /\b(study ?rooms?|study|studies|office)\b/],
  ['balcony', /\b(balcon(?:y|ies)|terraces?|verandahs?|verandas?|varanda)\b/]
];
const ALL_STRONG = /\b((whole|entire|full) (house|home|ghar)|everywhere|every ?rooms?|all (the )?rooms|all over|poore ghar|pure ghar|ghar ki sab|house|home)\b/;
const ALL_WEAK = /\b(all|every|sab|sabhi|saari|sari|saare|sare|both)\b/;
const LIGHT_RX = /\b(lights?|lamps?|bulbs?|batti|battiyan|lighting|brightness|bright|brighter|dim|dimmer|glow|roshni|tube ?lights?)\b/;
const DEVICE_RX = /\b(fans?|tv|television|ac|air ?conditioners?|music|songs?|play|doors?|geyser|oven|alarm|pankha|cooler|heater|radio|windows?|curtains?|taps?)\b/;
const NOCTX_OK = /\b(turn|switch) (it |them |everything )?(on|off)\b/;
const NEG_RX = /\b(do not|dont|never|mat)\b/;
const ACTION_RX = /\b(turn|switch|put|set|make|dim|brighten|increase|decrease|lower|raise|kar|karo|kardo|kijiye|band|bandh|jalao|chalu|chaalu|kill)\b/;
const QSTART_RX = /^(is|are|was|were|which|what|whats|how|kya|kaun|kaunsi|kitni|check|status|tell|show|report|any)\b/;

// [intent, regex, weight, standalone?]  standalone cues make sense without a light/room word
const CUES = [
  ['TurnOn', /\b(turn|switch|put)\b(?:\s+\w+){0,4}?\s+on\b/, 0.95],
  ['TurnOn', /\b(light up|lights on|illuminate)\b/, 0.93, true],
  ['TurnOn', /\bon (karo|kar do|kardo|kar dijiye|kijiye|kar)\b|\b(chalu|chaalu|jalao|jala do|jalado|jala)\b/, 0.9],
  ['TurnOn', /\bon\b/, 0.72],
  ['TurnOff', /\b(turn|switch|put|shut)\b(?:\s+\w+){0,4}?\s+off\b/, 0.95],
  ['TurnOff', /\b(kill (the |all (the )?)?lights?|lights out|lights off)\b/, 0.93, true],
  ['TurnOff', /\boff (karo|kar do|kardo|kar dijiye|kijiye|kar)\b|\b(band|bandh) (karo|kar do|kardo|kar)\b|\b(bujhao|bujha do|bujha)\b/, 0.9],
  ['TurnOff', /\b(band|bandh)\b/, 0.82],
  ['TurnOff', /\b(good ?night|shubh ratri)\b/, 0.8, true],
  ['TurnOff', /\boff\b/, 0.72],
  ['Dim', /\b(dim|dimmer|dim down|turn down|lower|decrease|reduce|less bright|darker|softer|tone down)\b/, 0.95],
  ['Dim', /\b(kam (karo|kar do|kardo|kar)|halka|halki|dheema|dheemi|kam)\b/, 0.88],
  ['Dim', /\b(too|very|so|bahut|zyada) (bright|tez)\b|\bglare|glaring|hurts? my eyes|chamak\b/, 0.88, true],
  ['Dim', /\bmake\b(?:\s+\w+){0,4}?\s+dark\b/, 0.86],
  ['Brighten', /\b(brighten|brighter|turn up|increase|raise|more light|boost)\b/, 0.95],
  ['Brighten', /\b(badhao|badha do|tez (karo|kar do|kar)|zyada (karo|roshni))\b/, 0.9],
  ['Brighten', /\b(too|so|very|really|bahut) dark\b|\b(is|its) dark\b|\bdark in\b|\b(cannot|cant|can not|hard to) see\b|\bandhe?ra\b|\bandhere\b/, 0.88, true]
];

const UNITS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const TEENS = { ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 };
const TENS = { twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const HINDI_NUM = { das: 10, dus: 10, bees: 20, tees: 30, chalis: 40, chaalis: 40, pachas: 50, pachaas: 50, sattar: 70, assi: 80, sau: 100 };

function normalise(s) {
  return ' ' + String(s).toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\bit's\b/g, 'it is').replace(/\bcan't\b/g, 'cannot').replace(/\bdon't\b/g, 'do not').replace(/\bwhat's\b/g, 'what is')
    .replace(/'/g, '')
    .replace(/(\d)\s*%/g, '$1 percent').replace(/%/g, ' percent')
    .replace(/\bper cent\b/g, 'percent')
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9? ]+/g, ' ')
    .replace(/\?/g, ' ')
    .replace(/\s+/g, ' ').trim() + ' ';
}

function findLevel(t) {
  const d = t.match(/\b(\d{1,3})\b/);
  if (d) return { level: Math.min(100, +d[1]), raw: d[1] };
  const w = t.match(/\b(twenty|thirty|forty|fourty|fifty|sixty|seventy|eighty|ninety)(?: (one|two|three|four|five|six|seven|eight|nine))?\b/);
  if (w) return { level: TENS[w[1]] + (w[2] ? UNITS[w[2]] : 0), raw: w[0] };
  const hd = t.match(/\b(a |one )?hundred\b/);
  if (hd) return { level: 100, raw: hd[0].trim() };
  const tn = t.match(/\b(ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)\b/);
  if (tn) return { level: TEENS[tn[1]], raw: tn[1] };
  const u = t.match(/\b(one|two|three|four|five|six|seven|eight|nine) percent\b/);
  if (u) return { level: UNITS[u[1]], raw: u[0] };
  const hi = t.match(/\b(das|dus|bees|tees|chalis|chaalis|pachas|pachaas|sattar|assi|sau)\b(?= percent| par| pe| tak| karo| kar)/);
  if (hi) return { level: HINDI_NUM[hi[1]], raw: hi[1] };
  if (/\bzero\b/.test(t)) return { level: 0, raw: 'zero' };
  if (/\bhalf\b|\badha\b|\baadha\b/.test(t)) return { level: 50, raw: 'half' };
  if (/\b(full|max|maximum|brightest|poori)\b/.test(t)) return { level: 100, raw: 'full' };
  if (/\b(min|minimum|lowest|dimmest)\b/.test(t)) return { level: 10, raw: 'lowest' };
  return null;
}

function findRooms(t) {
  const found = [];
  ROOM_RX.forEach(([id, rx]) => { const m = t.match(rx); if (m) found.push([m.index, id]); });
  found.sort((a, b) => a[0] - b[0]);
  const specific = found.map(f => f[1]);
  if (ALL_STRONG.test(t)) return { rooms: ROOMS.map(r => r.id), all: true, source: 'said' };
  if (specific.length) return { rooms: specific, all: false, source: 'said' };
  if (ALL_WEAK.test(t)) return { rooms: ROOMS.map(r => r.id), all: true, source: 'said' };
  return { rooms: [], all: false, source: 'none' };
}

// tiny deterministic hash for the "other intents" score bars
function h01(s) { let x = 7; for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) % 9973; return x / 9973; }

export function parse(text) {
  const t = normalise(text);
  const R = findRooms(t);
  const lv = findLevel(t);
  const lightCtx = LIGHT_RX.test(t) || R.source === 'said';
  const device = DEVICE_RX.test(t);
  const scores = Object.fromEntries(INTENTS.map(i => [i, +(0.01 + 0.04 * h01(t + i)).toFixed(2)]));
  const out = { text: String(text).trim(), intent: 'None', conf: 0, rooms: [], all: false, roomSource: 'none', level: null, levelRaw: '', note: '', scores };
  const none = (note, c) => { out.intent = 'None'; out.conf = c; out.note = note; scores.None = c; return out; };

  if (!t.trim()) return none('Type a sentence first.', 0.05);

  // collect matched cues
  const hits = [];
  CUES.forEach(([intent, rx, w, standalone]) => { const m = t.match(rx); if (m) hits.push({ intent, w, standalone: !!standalone, i: m.index }); });

  const hasAction = ACTION_RX.test(t);
  const isQ = (QSTART_RX.test(t.trim()) || /\b(which|status|kaun|kaunsi|kitni)\b/.test(t)) && !hasAction && (lightCtx || R.all);
  if (isQ) hits.push({ intent: 'Status', w: /\bstatus\b/.test(t) ? 0.97 : 0.95, standalone: true, i: 0 });
  if (lv && !isQ && (lightCtx || R.all)) hits.push({ intent: 'SetLevel', w: /\b(set|level|percent|brightness|adjust|keep)\b/.test(t) ? 0.94 : 0.85, standalone: false, i: 99 });

  if (NEG_RX.test(t) && hits.length) return none("I heard “don't”, so I'll leave the lights as they are.", 0.42);

  const usable = hits.filter(hh => hh.standalone || lightCtx || R.all || (!device && NOCTX_OK.test(t)));
  if (!usable.length || (device && !lightCtx && !usable.some(hh => hh.standalone))) {
    if (device) return none('I can only control lights — not fans, TVs, music or doors.', 0.18);
    return none('Sorry, I can only control the lights in this house.', lightCtx ? 0.34 : 0.12);
  }

  usable.sort((a, b) => b.w - a.w || a.i - b.i);
  let top = usable[0];
  // a level turns "Dim/Brighten/TurnOn ... to 30%" into a target level; plain numbers become SetLevel
  if (lv) {
    if (top.intent === 'TurnOff' && lv.level > 0) top = { intent: 'SetLevel', w: 0.85 };
    if (top.intent !== 'Status') { out.level = lv.level; out.levelRaw = lv.raw; }
  }
  out.intent = top.intent;
  let c = top.w;
  if (R.source === 'said') c += 0.03;
  if (!lightCtx && !R.all) c -= 0.15;
  const rival = usable.find(u2 => u2.intent !== top.intent && u2.w >= 0.85 && !(u2.intent === 'SetLevel' && lv));
  if (rival) c -= 0.1;
  out.conf = +Math.max(0.05, Math.min(0.99, c)).toFixed(2);
  usable.forEach(u2 => { if (u2.intent !== out.intent) scores[u2.intent] = Math.max(scores[u2.intent], +(u2.w * 0.35).toFixed(2)); });
  scores[out.intent] = out.conf;

  if (R.rooms.length) { out.rooms = R.rooms; out.all = R.all; out.roomSource = 'said'; }
  else { out.rooms = ROOMS.map(r => r.id); out.all = true; out.roomSource = 'default'; out.note = 'No room was named, so I used the whole house.'; }
  return out;
}

/* ---------------- the lab ---------------- */

const CHIPS = [
  'Switch on the living room lights',
  'Dim the bedroom to 30%',
  "It's too dark in the study",
  'Kitchen ki light band karo',
  'Set the balcony to fifty percent',
  'Are the lights on?',
  'Turn off all the lights',
  'Play my favourite song'
];

const CSS = `
.lab-smart-home .sh-plan{width:100%; height:auto; display:block; border:var(--b2); border-radius:12px; background:#1E222B;}
.lab-smart-home .sh-plan .floor{transition:fill .5s;}
.lab-smart-home .sh-plan .glow{transition:opacity .5s, r .5s;}
.lab-smart-home .sh-plan .bulb{transition:fill .4s;}
.lab-smart-home .sh-plan .wall{fill:none; stroke:#15171C; stroke-width:6;}
.lab-smart-home .sh-plan .flash{fill:none; stroke:#FFC800; stroke-width:6; opacity:0; transition:opacity .25s;}
.lab-smart-home .sh-plan .flash.on{opacity:1;}
.lab-smart-home .sh-plan text{font-family:var(--body); font-weight:800;}
.lab-smart-home .nlu{background:#fff; border:var(--b2); border-radius:12px; padding:12px 14px; font-family:var(--mono); font-size:.86rem; display:grid; gap:8px;}
.lab-smart-home .nlu .line{display:flex; flex-wrap:wrap; gap:6px 8px; align-items:center;}
.lab-smart-home .nlu .tok{background:var(--paper-2); border:2px solid var(--ink); border-radius:8px; padding:1px 8px; font-weight:800;}
.lab-smart-home .nlu .tok.i{background:var(--gold);}
.lab-smart-home .nlu .tok.e{background:var(--blue-wash); border-color:var(--blue);}
.lab-smart-home .nlu .tok.none{background:var(--bad-wash); border-color:var(--bad);}
.lab-smart-home .ibar{display:grid; grid-template-columns:78px 1fr 38px; gap:8px; align-items:center; font-size:.78rem;}
.lab-smart-home .ibar .meter{height:10px;}
.lab-smart-home .ibar.lead b{color:var(--ink);} .lab-smart-home .ibar:not(.lead){color:var(--muted);}
.lab-smart-home .sh-form{display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px;}
.lab-smart-home .sugg{display:flex; flex-wrap:wrap; gap:6px;}
.lab-smart-home .sugg button{font-size:.82rem; min-height:40px; text-align:left;}
.lab-smart-home .log{display:grid; gap:6px; font-size:.86rem;}
.lab-smart-home .log li{list-style:none; display:grid; grid-template-columns:22px minmax(0,1fr); gap:6px; align-items:start;}
.lab-smart-home .log .ic{width:18px; height:18px; stroke-width:2.6;}
.lab-smart-home .goalrow{display:flex; flex-wrap:wrap; gap:8px 14px; align-items:center;}
.lab-smart-home .goalrow .meter{flex:1; min-width:140px;}
`;

function planSVG() {
  const defs = `<defs>
    <radialGradient id="shGlow"><stop offset="0" stop-color="#FFE38A" stop-opacity="1"/><stop offset=".45" stop-color="#FFD24D" stop-opacity=".55"/><stop offset="1" stop-color="#FFC800" stop-opacity="0"/></radialGradient>
    ${ROOMS.map(r => `<clipPath id="shc-${r.id}"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/></clipPath>`).join('')}
  </defs>`;
  const furn = {
    bedroom: '<rect x="22" y="22" width="62" height="86" rx="8"/><rect x="28" y="28" width="50" height="18" rx="5"/><rect x="104" y="22" width="36" height="22" rx="4"/>',
    study: '<rect x="170" y="20" width="90" height="28" rx="4"/><rect x="200" y="54" width="28" height="24" rx="6"/><rect x="236" y="120" width="26" height="26" rx="4"/>',
    kitchen: '<rect x="290" y="20" width="110" height="26" rx="4"/><circle cx="312" cy="33" r="7"/><circle cx="334" cy="33" r="7"/><rect x="380" y="56" width="20" height="58" rx="4"/>',
    living: '<rect x="24" y="270" width="110" height="38" rx="10"/><rect x="24" y="252" width="20" height="56" rx="8"/><rect x="164" y="282" width="56" height="26" rx="6"/><rect x="200" y="172" width="60" height="10" rx="3"/>',
    balcony: '<circle cx="300" cy="300" r="12"/><circle cx="392" cy="300" r="12"/><rect x="290" y="176" width="110" height="10" rx="3"/>'
  };
  const rooms = ROOMS.map(r => `
    <g data-room="${r.id}">
      <rect class="floor" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="#3A3F4C"/>
      <g clip-path="url(#shc-${r.id})"><circle class="glow" cx="${r.lamp[0]}" cy="${r.lamp[1]}" r="20" fill="url(#shGlow)" opacity="0"/></g>
      <g fill="none" stroke="#15171C" stroke-opacity=".35" stroke-width="3">${furn[r.id]}</g>
      <circle class="bulb" cx="${r.lamp[0]}" cy="${r.lamp[1]}" r="8" fill="#6B7080" stroke="#15171C" stroke-width="2.5"/>
      <g class="lbl"><rect x="${r.x + 7}" y="${r.y + r.h - 52}" width="${r.id === 'living' ? 132 : Math.min(112, r.w - 14)}" height="45" rx="9" fill="#fff" stroke="#15171C" stroke-width="2"/>
        <text x="${r.x + 14}" y="${r.y + r.h - 33}" font-size="17">${r.name}</text>
        <text class="state" x="${r.x + 14}" y="${r.y + r.h - 14}" font-size="15" fill="#5B606A">OFF</text></g>
      <rect class="flash" x="${r.x + 3}" y="${r.y + 3}" width="${r.w - 6}" height="${r.h - 6}" rx="4"/>
    </g>`).join('');
  return `<svg class="sh-plan" viewBox="0 0 420 330" role="img" aria-label="Floor plan of the house with five lights">${defs}${rooms}
    <rect class="wall" x="3" y="3" width="414" height="324" rx="6"/>
    <path class="wall" d="M156 3V60M156 100V156M274 3V156M3 156H60M100 156H200M240 156H274M274 156V230M274 270V327"/>
    <path d="M414 156V327" stroke="#FFF9EC" stroke-width="6" stroke-dasharray="6 6"/></svg>`;
}

export default {
  title: 'Smart Home: talk to the lights',
  mount(ctx) {
    ctx.el.classList.add('lab-smart-home');
    const st = {};
    ROOMS.forEach(r => { st[r.id] = { on: false, level: 0 }; });
    st.living = { on: true, level: ctx.rng.pick([50, 60, 70]) };
    st.kitchen = { on: ctx.rng.chance(0.5), level: 80 };
    if (!st.kitchen.on) st.kitchen.level = 0;

    const saved = ctx.data || {};
    let okCount = Math.min(saved.ok || 0, GOAL_OK);
    let used = new Set((saved.intents || []).filter(i => INTENTS.includes(i)));
    let completed = false;
    const timers = new Set();
    const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); };
    const log = [];

    ctx.el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">This house understands plain English (and a little Hinglish). Type what you want the lights to do. Watch how the AI breaks your sentence into an <b>intent</b> (what you want) and <b>entities</b> (which room, how bright).</p>
      <div class="banner"><span class="chip gold">Goal</span><span>Give <b>${GOAL_OK} commands that work</b>, using <b>at least ${GOAL_INTENTS} different intents</b>.</span></div>
      <div class="lab-grid">
        <div class="lab-box">
          <h4>Your smart home</h4>
          <div id="shPlan">${planSVG()}</div>
          <p class="tiny muted mt">Each glowing circle is a light. Bigger, brighter glow = higher brightness.</p>
        </div>
        <div class="lab-box stack" style="gap:12px">
          <form class="sh-form" id="shForm" autocomplete="off">
            <label class="sr" for="shIn">Command for the house</label>
            <input class="input" id="shIn" maxlength="120" placeholder="e.g. dim the bedroom to 30%">
            <button class="btn primary" type="submit">${ic('arrow')}<span class="sr">Send</span></button>
          </form>
          <div><div class="tiny muted" style="font-weight:800;margin-bottom:6px">TRY ONE</div><div class="sugg" id="shSugg">${CHIPS.map(c => `<button type="button" class="btn sm" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div></div>
          <div class="nlu" id="shNlu" aria-live="polite"><span class="muted">The AI's interpretation will appear here.</span></div>
          <p class="small" id="shReply" aria-live="polite" style="font-weight:700"></p>
        </div>
      </div>
      <div class="lab-box">
        <div class="goalrow"><b id="shCount"></b><div class="meter" aria-hidden="true"><i id="shMeter" style="width:0"></i></div></div>
        <div class="pill-row mt" id="shUsed"></div>
        <ul class="log mt" id="shLog"></ul>
      </div>
      <div id="shDone"></div>`;

    const $ = s => ctx.el.querySelector(s);
    const input = $('#shIn');

    function drawHouse(flash = []) {
      ROOMS.forEach(r => {
        const g = $(`[data-room="${r.id}"]`), s = st[r.id], lvl = s.on ? s.level : 0;
        g.querySelector('.floor').style.fill = s.on ? mix(lvl) : '#3A3F4C';
        const gl = g.querySelector('.glow');
        gl.setAttribute('r', 30 + lvl * 0.95);
        gl.style.opacity = s.on ? (0.35 + lvl / 100 * 0.65).toFixed(2) : 0;
        g.querySelector('.bulb').style.fill = s.on ? '#FFC800' : '#6B7080';
        g.querySelector('.state').textContent = s.on ? `ON · ${lvl}%` : 'OFF';
        if (flash.includes(r.id)) {
          const f = g.querySelector('.flash'); f.classList.add('on'); later(() => f.classList.remove('on'), 900);
        }
      });
      $('#shPlan svg').setAttribute('aria-label', 'Floor plan. ' + ROOMS.map(r => `${r.name}: ${st[r.id].on ? 'on at ' + st[r.id].level + '%' : 'off'}`).join(', '));
    }
    function mix(l) { // warm floor colour that gets lighter with brightness
      const a = [74, 70, 60], b = [255, 244, 214], k = 0.35 + 0.65 * l / 100;
      return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
    }

    function apply(p) {
      if (p.intent === 'None') return { ok: false, msg: p.note };
      const names = p.all ? 'all the lights' : p.rooms.map(r => RNAME[r]).join(' and ');
      if (p.intent === 'Status') {
        const on = ROOMS.filter(r => st[r.id].on && p.rooms.includes(r.id));
        const offs = ROOMS.filter(r => !st[r.id].on && p.rooms.includes(r.id));
        const msg = (on.length ? 'On: ' + on.map(r => `${r.name} (${st[r.id].level}%)`).join(', ') + '. ' : 'No lights are on there. ') + (offs.length ? 'Off: ' + offs.map(r => r.name).join(', ') + '.' : '');
        return { ok: true, msg, changed: [] };
      }
      const changed = [];
      p.rooms.forEach(id => {
        const s = st[id], before = JSON.stringify(s);
        const set = v => { if (v <= 0) { s.on = false; s.level = 0; } else { s.on = true; s.level = Math.max(1, Math.min(100, Math.round(v))); } };
        if (p.intent === 'TurnOn') set(p.level ?? (s.on ? s.level : 80));
        else if (p.intent === 'TurnOff') set(0);
        else if (p.intent === 'SetLevel') set(p.level);
        else if (p.intent === 'Dim') { if (p.level != null) set(p.level); else if (s.on) set(Math.max(10, s.level - 30)); }
        else if (p.intent === 'Brighten') { if (p.level != null) set(p.level); else set(s.on ? Math.min(100, s.level + 30) : 40); }
        if (JSON.stringify(s) !== before) changed.push(id);
      });
      if (!changed.length) {
        const why = p.intent === 'Dim' ? 'Those lights are off, so there is nothing to dim.' : p.intent === 'TurnOff' ? `${cap(names)} ${p.all || p.rooms.length > 1 ? 'are' : 'is'} already off.` : 'Nothing needed to change — it is already like that.';
        return { ok: false, msg: why, understood: true };
      }
      const verb = { TurnOn: 'switched on', TurnOff: 'switched off', Dim: 'dimmed', Brighten: 'brightened', SetLevel: 'set' }[p.intent];
      const lvl = p.level != null && p.intent !== 'TurnOff' ? ` to ${p.level}%` : '';
      const who = changed.length === ROOMS.length ? 'All the lights' : changed.map(r => RNAME[r]).join(', ');
      return { ok: true, msg: `Done: ${who} ${verb}${lvl}.`, changed };
    }
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

    function showNLU(p) {
      const ent = [];
      if (p.intent !== 'None') {
        ent.push(`<span class="tok e">Room: ${p.all ? 'all' : p.rooms.map(r => RNAME[r].toLowerCase()).join(', ')}${p.roomSource === 'default' ? ' (default)' : ''}</span>`);
        if (p.level != null) ent.push(`<span class="tok e">Level: ${p.level}%</span>`);
      }
      const ranked = INTENTS.map(i => [i, p.scores[i]]).sort((a, b) => b[1] - a[1]).slice(0, 4);
      $('#shNlu').innerHTML = `
        <div class="muted">“${esc(p.text)}”</div>
        <div class="line"><span class="tok i ${p.intent === 'None' ? 'none' : ''}">Intent: ${p.intent}</span>${ent.join('')}<span class="tok">Confidence ${p.conf.toFixed(2)}</span></div>
        <div style="display:grid;gap:4px">${ranked.map(([i, s], k) => `<div class="ibar ${k === 0 ? 'lead' : ''}"><b>${i}</b><div class="meter"><i style="width:${Math.round(s * 100)}%;${k ? 'background:var(--line)' : ''}"></i></div><span>${s.toFixed(2)}</span></div>`).join('')}</div>`;
    }

    function updateProgress() {
      $('#shCount').textContent = `Working commands: ${okCount} / ${GOAL_OK} · Intents used: ${used.size} / ${GOAL_INTENTS}`;
      const pct = (Math.min(okCount, GOAL_OK) / GOAL_OK) * 0.6 + (Math.min(used.size, GOAL_INTENTS) / GOAL_INTENTS) * 0.4;
      $('#shMeter').style.width = Math.round(pct * 100) + '%';
      $('#shUsed').innerHTML = INTENTS.filter(i => i !== 'None').map(i => `<span class="chip ${used.has(i) ? 'ok' : 'dim'}">${used.has(i) ? '✓ ' : ''}${i}</span>`).join('');
      $('#shLog').innerHTML = log.slice(-5).reverse().map(l => `<li>${l.ok ? `<span style="color:var(--good)">${ic('check')}</span>` : `<span style="color:var(--bad)">${ic('x')}</span>`}<span><b>${esc(l.intent)}</b> — ${esc(l.text)}</span></li>`).join('');
      if ((okCount >= GOAL_OK && used.size >= GOAL_INTENTS) || ctx.done) finish();
    }

    function finish() {
      if ($('#shDone').innerHTML) return;
      $('#shDone').innerHTML = `<div class="lab-done">${ic('check')}<div>${ctx.done && !completed && !(okCount >= GOAL_OK && used.size >= GOAL_INTENTS) ? 'Goal already met earlier — keep experimenting! ' : 'Goal met! '}
        You saw how <b>Natural Language Processing (NLP)</b> turns language into action: the AI finds the <b>intent</b> (what you want) and the <b>entities</b> (which room, what level), then the house acts. Real tools like <b>Microsoft LUIS</b> learn this from many example sentences instead of hand-written rules.</div></div>`;
      if (!ctx.done && !completed && okCount >= GOAL_OK && used.size >= GOAL_INTENTS) {
        completed = true;
        ctx.sfx('win');
        ctx.complete(`Controlled the smart home with ${okCount} working commands using ${used.size} different intents.`);
      }
    }

    function run(text) {
      const p = parse(text);
      showNLU(p);
      const r = apply(p);
      drawHouse(r.changed || []);
      $('#shReply').innerHTML = `${r.ok ? '🏠' : '🤖'} ${esc(r.msg)}${p.note && r.ok ? ` <span class="muted">(${esc(p.note)})</span>` : ''}`;
      log.push({ ok: r.ok, intent: p.intent, text: p.text });
      if (r.ok) {
        ctx.sfx('ok');
        okCount = Math.min(GOAL_OK, okCount + 1); used.add(p.intent);
        ctx.data.ok = okCount; ctx.data.intents = [...used]; ctx.save();
      } else ctx.sfx(p.intent === 'None' ? 'bad' : 'tick');
      updateProgress();
    }

    $('#shForm').addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (!v) { input.focus(); return; } run(v); input.value = ''; });
    $('#shSugg').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) { input.value = b.dataset.c; run(b.dataset.c); input.value = ''; } });

    drawHouse();
    updateProgress();
    return () => { timers.forEach(clearTimeout); timers.clear(); ctx.el.classList.remove('lab-smart-home'); };
  }
};
