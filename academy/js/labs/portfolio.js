import { esc, ic } from '../core/util.js';

/* ---------- content ---------- */

const TABS = [['letter', 'Letter', 'pen'], ['home', 'Smart Home', 'home'], ['job', 'Future Job', 'user'], ['sec', 'AI in Sectors', 'grid'], ['pdf', 'Download', 'download']];
const TITLES = { letter: 'Letter to My Future Self', home: 'Smart Home Floor Plan', job: 'Future Job Advertisement', sec: 'AI in Different Sectors' };

const PROMPTS = [
  ['Dear future me,', 'Dear future me,\n'],
  ['What I\'m learning now', 'Right now, in Class 9, I am learning how AI works. '],
  ['My hope for AI', 'By 2035 I hope AI will help people by '],
  ['A worry', 'One thing about AI that worries me is '],
  ['How I use AI today', 'Today I use AI when '],
  ['A promise', 'I promise to keep practising '],
  ['Sign off', '\nYours,\n']
];

const ROOMS = ['Living room', 'Bedroom', 'Kitchen', 'Study', 'Dining', 'Balcony', 'Entrance', 'Bathroom', 'Kids\' room', 'Puja room', 'Garage'];
const DEFAULT_ROOMS = [0, 2, 6, 1, 3, 5];
const DEV = {
  light: { n: 'Smart lights', dom: 'Data', u: 'Motion sensor and time of day', dc: 'When to switch on/off and how bright' },
  voice: { n: 'Voice assistant', dom: 'NLP', u: 'My spoken commands', dc: 'What I asked for, e.g. play music or set a reminder' },
  cam: { n: 'Security camera', dom: 'CV', u: 'Video of the front door', dc: 'Is this a family member or a stranger? Send an alert' },
  fan: { n: 'Smart fan / thermostat', dom: 'Data', u: 'Room temperature and who is in the room', dc: 'Fan speed or AC temperature' },
  vac: { n: 'Robot vacuum', dom: 'CV', u: 'Distance sensors and a map of the floor', dc: 'Which path to clean next and how to avoid obstacles' },
  fridge: { n: 'Smart fridge', dom: 'CV', u: 'Camera inside and weight of items', dc: 'Which food is running low; adds it to a shopping list' }
};
const ICONS = {
  light: '<path d="M9 17.5h6M10 20.5h4M12 3.5a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9v1.2h5v-1.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3.5Z"/>',
  voice: '<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M11 7.5h2M10.5 11h3M10.5 14h3"/>',
  cam: '<rect x="3" y="7" width="13" height="10" rx="3"/><path d="m16 10.5 5-2.5v8l-5-2.5"/><circle cx="9.5" cy="12" r="2"/>',
  fan: '<circle cx="12" cy="12" r="1.8"/><path d="M12 10.2C11 6 13.5 3.5 15.5 5s-1 4.5-3.5 5.2M13.6 12.9c3.2 2.8 2.5 6.3.1 6.4s-2.6-3.8-1.9-6.3M10.3 12.6C6.2 13.8 4 11.3 5.2 9.2s4.6.1 5.2 2.5"/>',
  vac: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M5 9h3M16 9h3"/>',
  fridge: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M6 10h12M9 5.5v2.5M9 12.5v3"/>'
};
const dicon = (t, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[t]}</svg>`;
const MAX_DEV = 8;

const AI_SKILLS = ['Python programming', 'Collecting training data', 'Checking AI for bias', 'Data visualisation', 'Writing good prompts', 'Evaluating models', 'Computer vision', 'Data privacy'];
const HUMAN_SKILLS = ['Empathy', 'Teamwork', 'Creativity', 'Communication', 'Ethical judgement', 'Problem solving', 'Curiosity', 'Patience'];

const SECTORS = {
  health: ['Healthcare', 'Screening eye photos to spot diabetic retinopathy early', 'A wrong "all clear" (false negative) could delay treatment'],
  agri: ['Agriculture', 'Detecting crop disease from a phone photo of a leaf', 'Farmers without smartphones or internet are left out'],
  edu: ['Education', 'Practice questions that adapt to each student\'s level', 'Student data could be shared without permission'],
  transport: ['Transport', 'Maps predicting traffic to suggest faster routes', 'Tracking location can invade people\'s privacy'],
  bank: ['Banking & Finance', 'Flagging unusual card payments as possible fraud', 'A biased model might unfairly refuse loans to some groups'],
  retail: ['Retail & Shopping', 'Recommending products based on what you browsed', 'Can push people to buy things they don\'t need'],
  factory: ['Manufacturing', 'Cameras spotting faulty products on an assembly line', 'Some repetitive jobs may disappear'],
  ent: ['Entertainment & Media', 'Suggesting songs and videos you might like', 'Deepfakes and fake news can spread quickly'],
  gov: ['Government services', 'Chatbots answering questions in many Indian languages', 'Mistakes can affect people\'s access to benefits'],
  env: ['Environment', 'Predicting floods and air quality from sensor data', 'Wrong predictions could cause panic or missed warnings']
};

const LIM = { letter: 1200, short: 60, line: 90, skills: 250, why: 400, sec: 160 };

/* ---------- PDF helpers ---------- */
function safe(s) {
  return String(s ?? '').replace(/[‘’‛′]/g, "'").replace(/[“”″]/g, '"')
    .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/₹/g, 'Rs ').replace(/→/g, '->')
    .replace(/•/g, '-').replace(/[^\t\n\r\x20-\x7E\xA0-\xFF]/g, '');
}
const hasNonLatin = s => /[^\t\n\r\x20-\x7E\xA0-\xFF‘’“”–—…₹−→]/.test(s);
const clean = s => String(s || '').trim();
const fmtDate = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

/* ---------- lab ---------- */

export default {
  title: 'My AI Portfolio',
  mount(ctx) {
    const d = ctx.data;
    d.tab ??= 'letter'; d.letter ??= { t: '' };
    d.home ??= { rooms: DEFAULT_ROOMS.slice(), dev: [] };
    d.job ??= {}; d.sec ??= [];
    const root = ctx.el;
    root.classList.add('lab-portfolio');
    let saveT = 0, sel = null, completedNow = false, busy = false, drag = null, ghost = null, suppressClick = false;
    const secCache = {};   // text for sectors the learner unticked this session

    const sdgReport = () => d.sdgReport || ctx.sdgReport || null;

    /* --- readiness --- */
    const L = (s, n) => clean(s).length >= n;
    const READY = {
      letter: () => L(d.letter.t, 100),
      home: () => d.home.dev.filter(x => L(x.u, 4) && L(x.dc, 4)).length >= 3,
      job: () => L(d.job.title, 3) && L(d.job.ai, 5) && L(d.job.hu, 5) && L(d.job.why, 15),
      sec: () => d.sec.length === 3 && d.sec.every(x => L(x.u, 5) && L(x.k, 5))
    };
    const NEED = {
      letter: 'Write at least 100 characters.',
      home: 'Place at least 3 devices and fill in both lines for each.',
      job: 'Fill in job title, AI skills, human skills and why the job will exist.',
      sec: 'Pick 3 sectors and write one use and one risk for each.'
    };
    const readyKeys = () => Object.keys(READY).filter(k => READY[k]());

    /* --- save --- */
    function save(now) {
      clearTimeout(saveT);
      const go = () => { ctx.save(); const s = root.querySelector('#pfSaved'); if (s) s.textContent = 'Saved ✓'; };
      if (now) go(); else { const s = root.querySelector('#pfSaved'); if (s) s.textContent = 'Saving…'; saveT = setTimeout(go, 350); }
    }

    /* --- field helper (data-k path into d) --- */
    const get = k => k.split('.').reduce((o, p) => (o == null ? undefined : o[p]), d);
    const set = (k, v) => { const p = k.split('.'), last = p.pop(); p.reduce((o, q) => (o[q] ??= {}), d)[last] = v; };
    let fid = 0;
    function field(k, label, { ph = '', max = LIM.line, rows = 0, hint = '' } = {}) {
      const v = get(k) || '', id = 'pf' + (++fid);
      const a = `id="${id}" data-k="${k}" data-max="${max}" placeholder="${esc(ph)}"${hint ? ` aria-describedby="${id}h"` : ''}`;
      return `<div class="field"><label for="${id}">${label}</label>${hint ? `<span class="small muted" id="${id}h">${hint}</span>` : ''}
        ${rows ? `<textarea class="input" ${a} rows="${rows}">${esc(v)}</textarea>` : `<input class="input" ${a} value="${esc(v)}">`}
        <span class="tiny muted pf-lim" data-lim="${k}">${v.length} / ${max}</span></div>`;
    }

    /* --- views --- */
    function letterView() {
      return `<p class="lab-intro">Write a letter to yourself to open in <b>2035</b>. What do you hope AI will be like? What will you be doing? Tap a prompt to get started.</p>
        <div class="pill-row" aria-label="Letter prompts">${PROMPTS.map(([t], i) => `<button type="button" class="toggle" data-prompt="${i}">+ ${esc(t)}</button>`).join('')}</div>
        <div class="pf-letter">${field('letter.t', 'My letter', { rows: 12, max: LIM.letter, ph: 'Dear future me,\nToday I learned that AI…' })}</div>
        <p class="small muted">Tip: a good letter has 3 parts — who you are now, your hopes and worries about AI, and a promise to yourself.</p>`;
    }

    function homeView() {
      const h = d.home;
      return `<p class="lab-intro">Design an AI-powered home. Choose a name for each room, then <b>drag</b> a device into a room — or <b>tap</b> a device, then tap a room. For each device, say what data it uses and what it decides.</p>
        <div class="lab-box"><h4>Devices <span class="chip ${h.dev.length >= 3 ? 'ok' : 'dim'}">${h.dev.length} / ${MAX_DEV} placed</span></h4>
          <div class="pf-pal" role="group" aria-label="Devices to place">${Object.entries(DEV).map(([t, v]) => `<button type="button" class="pf-dev" data-pal="${t}" aria-pressed="${sel && sel.pal === t}">${dicon(t)}<span>${v.n}</span></button>`).join('')}</div>
          <p class="small mt" id="pfHint" aria-live="polite">${sel && sel.pal ? `Now tap a room to place the <b>${DEV[sel.pal].n}</b>.` : sel && sel.dev != null ? `Tap another room to move the <b>${DEV[h.dev[sel.dev].t].n}</b>.` : 'Pick a device to place.'}</p>
        </div>
        <div class="pf-plan" aria-label="Floor plan">${h.rooms.map((r, i) => `<div class="pf-room${sel ? ' target' : ''}" data-cell="${i}">
            <label class="sr" for="pfR${i}">Room ${i + 1} type</label>
            <select class="pf-rsel" id="pfR${i}" data-room="${i}">${ROOMS.map((n, j) => `<option value="${j}"${j === r ? ' selected' : ''}>${n}</option>`).join('')}</select>
            <div class="pf-tokens">${h.dev.map((x, j) => x.r === i ? `<button type="button" class="pf-tok${sel && sel.dev === j ? ' on' : ''}" data-tok="${j}" aria-label="${DEV[x.t].n} in ${ROOMS[r]} — tap to edit or move">${dicon(x.t)}<span>${DEV[x.t].n}</span></button>` : '').join('')}</div>
            ${sel ? `<button type="button" class="btn sm pf-here" data-place="${i}">${ic('down', 'sm')} Place here</button>` : ''}
          </div>`).join('')}</div>
        <div class="stack" id="pfDevList">${h.dev.length ? h.dev.map((x, j) => `<div class="lab-box pf-row${sel && sel.dev === j ? ' on' : ''}" data-row="${j}">
            <div class="row between"><b class="row" style="gap:6px">${dicon(x.t)} ${DEV[x.t].n} <span class="small muted">in ${ROOMS[h.rooms[x.r]]}</span> <span class="tag ${DEV[x.t].dom.toLowerCase()}">${DEV[x.t].dom}</span></b>
              <button type="button" class="btn sm" data-rmdev="${j}" aria-label="Remove ${DEV[x.t].n}">${ic('x', 'sm')} Remove</button></div>
            <div class="pf-two mt">${field(`home.dev.${j}.u`, 'What data it uses', { ph: 'e.g. ' + DEV[x.t].u })}${field(`home.dev.${j}.dc`, 'What it decides', { ph: 'e.g. ' + DEV[x.t].dc })}</div>
          </div>`).join('') : '<p class="small muted">No devices yet. Your device notes will appear here.</p>'}</div>`;
    }

    function jobView() {
      return `<p class="lab-intro">Imagine a job that will exist in <b>2035</b> because of AI. Write the job advertisement! Good AI jobs need both <b>AI skills</b> and <b>human skills</b>.</p>
        <div class="lab-grid">
          <div class="stack">
            ${field('job.title', 'Job title', { max: LIM.short, ph: 'e.g. AI Crop Doctor' })}
            ${field('job.co', 'Company or organisation', { max: LIM.short, ph: 'e.g. GreenFields Agri-Tech, Nashik' })}
            <div>${field('job.ai', 'AI skills needed', { rows: 2, max: LIM.skills, ph: 'e.g. Training image models, checking data for bias' })}
              <div class="pill-row">${AI_SKILLS.map(s => `<button type="button" class="toggle" data-skill="ai" data-v="${esc(s)}">+ ${esc(s)}</button>`).join('')}</div></div>
            <div>${field('job.hu', 'Human skills needed', { rows: 2, max: LIM.skills, ph: 'e.g. Explaining results kindly to farmers' })}
              <div class="pill-row">${HUMAN_SKILLS.map(s => `<button type="button" class="toggle" data-skill="hu" data-v="${esc(s)}">+ ${esc(s)}</button>`).join('')}</div></div>
            ${field('job.why', 'Why will this job exist in 2035?', { rows: 3, max: LIM.why, ph: 'e.g. More farms will use AI cameras, and someone must train them, check them and help farmers trust them.' })}
          </div>
          <div id="pfJobCard">${jobCard()}</div>
        </div>`;
    }
    function jobCard() {
      const j = d.job;
      return `<div class="pf-ad"><div class="pf-ad-h">NOW HIRING · 2035</div>
        <h3>${esc(j.title || 'Job title')}</h3><p class="small muted">${esc(j.co || 'Company')}</p>
        <div class="pf-ad-cols"><div><b>AI skills</b><p class="small">${esc(j.ai || '—')}</p></div><div><b>Human skills</b><p class="small">${esc(j.hu || '—')}</p></div></div>
        <div class="key small"><b>Why this job exists</b>${esc(j.why || '—')}</div></div>`;
    }

    function secView() {
      const chosen = d.sec.map(x => x.s);
      return `<p class="lab-intro">AI is used in almost every sector. Pick <b>3 sectors</b>. For each, write one way AI is used and one risk to watch out for.</p>
        <div class="pill-row" role="group" aria-label="Sectors">${Object.entries(SECTORS).map(([k, [n]]) => `<button type="button" class="toggle" data-sec="${k}" aria-pressed="${chosen.includes(k)}"${!chosen.includes(k) && chosen.length >= 3 ? ' disabled' : ''}>${esc(n)}</button>`).join('')}</div>
        <p class="small muted" aria-live="polite">${chosen.length}/3 chosen${chosen.length >= 3 ? ' — untick one to swap.' : ''}</p>
        <div class="pf-secs">${d.sec.map((x, i) => `<div class="lab-box pf-sec"><h4>${esc(SECTORS[x.s][0])}</h4>
          ${field(`sec.${i}.u`, 'One AI use', { rows: 2, max: LIM.sec, ph: 'e.g. ' + SECTORS[x.s][1] })}
          ${field(`sec.${i}.k`, 'One risk', { rows: 2, max: LIM.sec, ph: 'e.g. ' + SECTORS[x.s][2] })}</div>`).join('')}</div>`;
    }

    function pdfView() {
      const r = readyKeys(), rep = sdgReport();
      const nonLatin = hasNonLatin(JSON.stringify([d.letter, d.home.dev, d.job, d.sec]));
      return `<p class="lab-intro">Your portfolio is a record of your AI activities. <b>Goal: complete 3 entries and download your portfolio PDF.</b></p>
        <div class="lab-box"><ul class="pf-check">${Object.keys(READY).map(k => `<li class="${READY[k]() ? 'ok' : ''}"><span class="d">${READY[k]() ? ic('check', 'sm') : ''}</span><span><b>${TITLES[k]}</b><br><span class="small muted">${READY[k]() ? 'Ready — will be included.' : NEED[k]}</span></span>${READY[k]() ? '' : `<button type="button" class="btn sm" data-tab="${k}">Open</button>`}</li>`).join('')}
          <li class="${rep ? 'ok' : ''}"><span class="d">${rep ? ic('check', 'sm') : ''}</span><span><b>SDG Data Project</b><br><span class="small muted">${rep ? `SDG ${rep.sdg}: ${esc(rep.title || rep.sdgName)} — will be included.` : 'Not found yet. Finish the SDG Data Project lab and download its report; it will then appear here.'}</span></span></li></ul>
          <div class="meter mt" aria-hidden="true"><i style="width:${Math.min(100, r.length / 3 * 100)}%"></i></div>
          <p class="small mt"><b>${r.length} of 4</b> entries complete${r.length >= 3 ? ' — that\'s enough to finish!' : ` (you need ${3 - r.length} more)`}.</p></div>
        ${nonLatin ? '<div class="warn small"><b>Heads-up:</b> the PDF can only print English letters. Words in other scripts (or emoji) will be left out of the PDF, but they stay saved here.</div>' : ''}
        <div class="row"><button type="button" class="btn primary big" id="pfPdf"${r.length ? '' : ' disabled'}>${ic('download')} Download portfolio PDF</button>
          <span class="small muted" id="pfMsg" aria-live="polite">${r.length ? (r.length < 3 ? `You can download now, but you need 3 complete entries to finish the lab.` : 'All set!') : 'Complete at least one entry first.'}</span></div>
        <div id="pfDone">${d.pdf && r.length >= 3 || ctx.done ? doneBox() : ''}</div>`;
    }
    const doneBox = () => `<div class="lab-done">${ic('check')}<div>Your <b>AI portfolio</b> is ready — a record of your AI activities for Part D (Project Work / Student Portfolio). You used the 3 AI domains (Data, Computer Vision, NLP), thought about future jobs and weighed benefits against risks.</div></div>`;

    const VIEWS = { letter: letterView, home: homeView, job: jobView, sec: secView, pdf: pdfView };

    /* --- shell --- */
    root.innerHTML = `
      <style>
        .lab-portfolio .pf-top{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between}
        .lab-portfolio .pf-tabs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
        .lab-portfolio .pf-tab{min-height:52px;border:2px solid var(--ink);border-radius:10px;background:#fff;font-weight:800;font-size:.82rem;display:grid;place-items:center;align-content:center;gap:2px;padding:4px;line-height:1.1;text-align:center}
        .lab-portfolio .pf-tab .ic{width:18px;height:18px}
        .lab-portfolio .pf-tab.ok{background:var(--good-wash);border-color:var(--good)}
        .lab-portfolio .pf-tab[aria-selected="true"]{background:var(--gold);border-color:var(--ink);box-shadow:var(--sh-sm)}
        @media(max-width:520px){.lab-portfolio .pf-tab .l{font-size:.62rem;letter-spacing:-.01em}.lab-portfolio .pf-tab{padding:4px 1px}}
        .lab-portfolio .pf-body{display:grid;gap:14px;min-width:0}
        .lab-portfolio .pf-lim{justify-self:end} .lab-portfolio .pf-lim.over{color:var(--bad);font-weight:800}
        .lab-portfolio .pf-letter textarea{font-family:var(--body);background:#FFFDF6 repeating-linear-gradient(transparent 0 30.5px,#EDE3C8 30.5px 32px);line-height:32px;padding-top:4px;min-height:340px}
        .lab-portfolio .pf-pal{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}
        .lab-portfolio .pf-dev{display:flex;align-items:center;gap:8px;min-height:48px;border:2px solid var(--ink);border-radius:10px;background:#fff;padding:6px 10px;font-weight:800;font-size:.86rem;text-align:left;touch-action:none;user-select:none;-webkit-user-select:none;line-height:1.15;box-shadow:var(--sh-sm)}
        .lab-portfolio .pf-dev[aria-pressed="true"]{background:var(--gold)}
        .lab-portfolio .pf-dev .ic,.lab-portfolio .pf-tok .ic{width:22px;height:22px}
        .lab-portfolio .pf-plan{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:4px solid var(--ink);border-radius:12px;background:#fff;overflow:hidden}
        @media(max-width:560px){.lab-portfolio .pf-plan{grid-template-columns:repeat(2,minmax(0,1fr))}.lab-portfolio .pf-pal{grid-template-columns:1fr 1fr}}
        .lab-portfolio .pf-room{min-height:150px;border:1.5px dashed #B9AE95;padding:8px;display:flex;flex-direction:column;gap:6px;background:repeating-linear-gradient(45deg,#FFFBF0 0 10px,#FFF6E0 10px 20px);min-width:0}
        .lab-portfolio .pf-room.target{background:var(--blue-wash);cursor:copy}
        .lab-portfolio .pf-room.over{background:var(--gold-wash);outline:3px solid var(--gold-deep);outline-offset:-3px}
        .lab-portfolio .pf-rsel{font:inherit;font-weight:800;font-size:.85rem;border:2px solid var(--ink);border-radius:8px;background:#fff;padding:4px 6px;min-height:36px;width:100%}
        .lab-portfolio .pf-tokens{display:flex;flex-wrap:wrap;gap:5px}
        .lab-portfolio .pf-tok{display:inline-flex;align-items:center;gap:4px;border:2px solid var(--ink);border-radius:999px;background:#fff;padding:3px 9px 3px 5px;font-weight:800;font-size:.74rem;min-height:40px;touch-action:none;user-select:none;-webkit-user-select:none;max-width:100%;text-align:left;line-height:1.1}
        .lab-portfolio .pf-tok.on{background:var(--gold)}
        .lab-portfolio .pf-here{margin-top:auto;align-self:flex-start}
        .lab-portfolio .pf-row.on{border-color:var(--gold-deep);box-shadow:0 0 0 3px var(--gold)}
        .lab-portfolio .pf-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        @media(max-width:620px){.lab-portfolio .pf-two{grid-template-columns:1fr}}
        .pf-ghost{position:fixed;z-index:99;pointer-events:none;display:flex;align-items:center;gap:6px;background:var(--gold);border:2px solid var(--ink);border-radius:999px;padding:6px 12px;font-weight:800;font-size:.85rem;box-shadow:var(--sh);transform:translate(-50%,-120%)}
        .pf-ghost .ic{width:20px;height:20px}
        .lab-portfolio .pf-ad{background:#fff;border:3px solid var(--ink);border-radius:14px;padding:0 16px 16px;display:grid;gap:8px;box-shadow:var(--sh);overflow-wrap:anywhere}
        .lab-portfolio .pf-ad-h{background:var(--ink);color:var(--gold);margin:0 -16px 6px;padding:10px 16px;font-weight:900;letter-spacing:.14em;font-size:.8rem;border-radius:10px 10px 0 0}
        .lab-portfolio .pf-ad-cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .lab-portfolio .pf-ad-cols>div{background:var(--paper);border:2px solid var(--ink);border-radius:10px;padding:8px 10px;min-width:0}
        .lab-portfolio .pf-secs{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
        .lab-portfolio .pf-sec{display:grid;gap:8px;align-content:start}
        .lab-portfolio .pf-check{list-style:none;display:grid;gap:6px}
        .lab-portfolio .pf-check li{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:10px;align-items:center;background:#fff;border:2px solid var(--line);border-radius:10px;padding:6px 10px}
        .lab-portfolio .pf-check li.ok{border-color:var(--good);background:var(--good-wash)}
        .lab-portfolio .pf-check .d{width:26px;height:26px;border-radius:8px;border:2px solid var(--ink);display:grid;place-items:center;background:#fff}
        .lab-portfolio .pf-check li.ok .d{background:var(--good);border-color:var(--good);color:#fff}
        .lab-portfolio .lab-box,.lab-portfolio .key{min-width:0;overflow-wrap:anywhere}
      </style>
      <div class="pf-top"><div><div class="kicker">AI Portfolio</div><b id="pfTitle"></b></div><span class="tiny muted" id="pfSaved">Saved ✓</span></div>
      <div class="pf-tabs" role="tablist" aria-label="Portfolio entries" id="pfTabs"></div>
      <div class="pf-body" id="pfBody" role="tabpanel"></div>`;
    const body = root.querySelector('#pfBody');

    function updateTabs() {
      root.querySelector('#pfTabs').innerHTML = TABS.map(([k, n, icn]) => {
        const okk = READY[k] ? READY[k]() : (d.pdf && readyKeys().length >= 3);
        return `<button type="button" role="tab" class="pf-tab${okk ? ' ok' : ''}" data-tab="${k}" aria-selected="${d.tab === k}" aria-label="${n}${okk ? ' (complete)' : ''}">${okk ? ic('check') : ic(icn)}<span class="l">${n}</span></button>`;
      }).join('');
    }
    let tabT = 0;
    const updateTabsSoon = () => { clearTimeout(tabT); tabT = setTimeout(updateTabs, 250); };

    function render() {
      fid = 0;
      if (!VIEWS[d.tab]) d.tab = 'letter';
      root.querySelector('#pfTitle').textContent = d.tab === 'pdf' ? 'Download your portfolio' : TITLES[d.tab];
      body.innerHTML = VIEWS[d.tab]();
      updateTabs();
    }

    /* --- input --- */
    function onInput(e) {
      const t = e.target, k = t.dataset && t.dataset.k;
      if (!k) return;
      const max = +t.dataset.max || LIM.line;
      let v = t.value;
      const lim = body.querySelector(`[data-lim="${k}"]`);
      if (v.length > max) {
        v = v.slice(0, max); t.value = v;
        if (lim) { lim.textContent = `${max} / ${max} — kept the first ${max} characters`; lim.classList.add('over'); }
      } else if (lim) { lim.textContent = `${v.length} / ${max}`; lim.classList.remove('over'); }
      set(k, v);
      if (k.startsWith('sec.')) { const x = d.sec[+k.split('.')[1]]; if (x) secCache[x.s] = { u: x.u, k: x.k }; }
      if (k.startsWith('job.')) { const c = body.querySelector('#pfJobCard'); if (c) c.innerHTML = jobCard(); }
      save(); updateTabsSoon();
    }
    function appendTo(k, text, sep, max) {
      const cur = get(k) || '';
      if (sep === ', ' && cur.toLowerCase().includes(text.toLowerCase())) return;
      const v = cur ? (/[\s,]$/.test(cur) || sep === '' ? cur : cur.replace(/\s+$/, '') + sep) + text : text;
      if (v.length > max) { ctx.toast('That box is full — edit it to make space.'); return; }
      const el = body.querySelector(`[data-k="${k}"]`);
      if (el) { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.focus(); el.setSelectionRange(v.length, v.length); }
    }

    /* --- floor plan actions --- */
    function place(t, room) {
      if (d.home.dev.length >= MAX_DEV) { ctx.toast(`Maximum ${MAX_DEV} devices — remove one first.`); ctx.sfx('bad'); return false; }
      d.home.dev.push({ t, r: room, u: '', dc: '' });
      ctx.sfx('pop'); sel = null; save(); render();
      const hint = body.querySelector('#pfHint'); if (hint) hint.innerHTML = `Placed the <b>${DEV[t].n}</b>. Fill in its notes below the plan.`;
      return true;
    }
    function move(j, room) { d.home.dev[j].r = room; ctx.sfx('tick'); sel = null; save(); render(); }

    function onClick(e) {
      if (suppressClick) { suppressClick = false; return; }
      const b = e.target.closest('button');
      const cell = e.target.closest('[data-cell]');
      if (!b) {
        if (cell && sel && !e.target.closest('select')) { const r = +cell.dataset.cell; if (sel.pal) place(sel.pal, r); else move(sel.dev, r); }
        return;
      }
      const D = b.dataset;
      if (D.tab) { d.tab = D.tab; sel = null; save(true); render(); ctx.sfx('tick'); root.querySelector('#pfTitle').scrollIntoView({ block: 'nearest' }); return; }
      if (D.prompt != null) { const [, txt] = PROMPTS[+D.prompt]; appendTo('letter.t', +D.prompt === PROMPTS.length - 1 ? txt + (ctx.user.name || '') : txt, txt.startsWith('\n') || txt.startsWith('Dear') ? '' : ' ', LIM.letter); return; }
      if (D.pal) { sel = sel && sel.pal === D.pal ? null : { pal: D.pal }; render(); return; }
      if (D.tok != null) {
        const j = +D.tok; sel = sel && sel.dev === j ? null : { dev: j }; render();
        if (sel) { const inp = body.querySelector(`[data-k="home.dev.${j}.u"]`); if (inp) inp.scrollIntoView({ block: 'nearest' }); }
        return;
      }
      if (D.place != null) { const r = +D.place; if (sel.pal) place(sel.pal, r); else move(sel.dev, r); return; }
      if (D.rmdev != null) { d.home.dev.splice(+D.rmdev, 1); sel = null; save(); render(); return; }
      if (D.skill) { appendTo('job.' + D.skill, D.v, ', ', LIM.skills); return; }
      if (D.sec) {
        const i = d.sec.findIndex(x => x.s === D.sec);
        if (i >= 0) { secCache[D.sec] = { u: d.sec[i].u, k: d.sec[i].k }; d.sec.splice(i, 1); }
        else if (d.sec.length < 3) d.sec.push({ s: D.sec, u: (secCache[D.sec] || {}).u || '', k: (secCache[D.sec] || {}).k || '' });
        save(); render(); const f = body.querySelector(`[data-sec="${D.sec}"]`); if (f) f.focus(); return;
      }
      if (b.id === 'pfPdf') makePdf();
    }
    function onChange(e) {
      const t = e.target;
      if (t.dataset.room != null) { d.home.rooms[+t.dataset.room] = +t.value; save(); render(); const s = body.querySelector(`[data-room="${t.dataset.room}"]`); if (s) s.focus(); }
    }

    /* --- drag & drop with pointer events (mouse + touch) --- */
    function onDown(e) {
      const src = e.target.closest('[data-pal],[data-tok]');
      if (!src || !body.contains(src) || e.button > 0) return;
      drag = { src, x: e.clientX, y: e.clientY, id: e.pointerId, pal: src.dataset.pal, tok: src.dataset.tok != null ? +src.dataset.tok : null, on: false };
      try { src.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
      src.addEventListener('pointermove', onMove);
      src.addEventListener('pointerup', onUp);
      src.addEventListener('pointercancel', onCancel);
    }
    function cellAt(x, y) { const el = document.elementFromPoint(x, y); return el && el.closest('[data-cell]'); }
    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.on && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) {
        drag.on = true;
        const t = drag.pal || d.home.dev[drag.tok].t;
        ghost = document.createElement('div'); ghost.className = 'pf-ghost'; ghost.innerHTML = dicon(t) + esc(DEV[t].n);
        document.body.appendChild(ghost);
      }
      if (!drag.on) return;
      e.preventDefault();
      ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
      body.querySelectorAll('.pf-room.over').forEach(c => c.classList.remove('over'));
      const c = cellAt(e.clientX, e.clientY); if (c) c.classList.add('over');
    }
    function endDrag() {
      if (!drag) return;
      drag.src.removeEventListener('pointermove', onMove); drag.src.removeEventListener('pointerup', onUp); drag.src.removeEventListener('pointercancel', onCancel);
      if (ghost) { ghost.remove(); ghost = null; }
      body.querySelectorAll('.pf-room.over').forEach(c => c.classList.remove('over'));
    }
    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      const was = drag; endDrag(); drag = null;
      if (!was.on) return;            // a tap: the click handler deals with it
      suppressClick = true; setTimeout(() => { suppressClick = false; }, 0);
      const c = cellAt(e.clientX, e.clientY);
      if (!c) return;
      const r = +c.dataset.cell;
      if (was.pal) place(was.pal, r); else if (was.tok != null) move(was.tok, r);
    }
    function onCancel() { endDrag(); drag = null; }

    /* --- PDF --- */
    async function makePdf() {
      if (busy) return; busy = true;
      const btn = root.querySelector('#pfPdf'), msg = root.querySelector('#pfMsg');
      btn.disabled = true; msg.textContent = 'Building your PDF…';
      try {
        const jsPDF = await ctx.pdf();
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        buildPdf(doc);
        const name = safe(ctx.user.name || 'learner').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'learner';
        doc.save(`AI-Portfolio-${name}.pdf`);
        d.pdf = Date.now(); save(true);
        const n = readyKeys().length;
        if (n >= 3) {
          msg.textContent = 'Downloaded! Check your Downloads folder.';
          ctx.sfx('win');
          if (!ctx.done && !completedNow) { completedNow = true; ctx.complete(`Built an AI portfolio with ${n} entries${sdgReport() ? ' plus the SDG project' : ''} and downloaded it as a PDF.`); }
          root.querySelector('#pfDone').innerHTML = doneBox();
        } else {
          msg.textContent = `Downloaded. Complete ${3 - n} more entr${3 - n === 1 ? 'y' : 'ies'} and download again to finish the lab.`;
          ctx.sfx('ok');
        }
        updateTabs();
      } catch (er) {
        msg.textContent = 'Sorry — the PDF could not be made (' + (er.message || er) + '). Your work is saved; please try again.';
        ctx.sfx('bad');
      } finally { busy = false; btn.disabled = false; }
    }

    function buildPdf(doc) {
      const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 50, CW = W - 2 * M;
      const learner = safe(ctx.user.name || 'Learner'), today = fmtDate(new Date()), rep = sdgReport(), ready = readyKeys();
      let y = 0;
      const ink = () => doc.setTextColor(21, 23, 28), muted = () => doc.setTextColor(91, 96, 106);
      function logo(x, yy, s) {
        doc.setDrawColor(255, 200, 0); doc.setLineWidth(s / 10); doc.roundedRect(x, yy, s, s, s / 5, s / 5, 'S');
        doc.setFillColor(255, 200, 0); doc.roundedRect(x + s * .27, yy + s * .27, s * .46, s * .46, s / 10, s / 10, 'F');
        doc.setFillColor(21, 23, 28); doc.rect(x + s * .43, yy + s * .43, s * .14, s * .14, 'F');
      }
      function header(title) {
        doc.setFillColor(21, 23, 28); doc.rect(0, 0, W, 42, 'F'); doc.setFillColor(255, 200, 0); doc.rect(0, 42, W, 4, 'F');
        logo(M, 11, 20);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(255, 200, 0); doc.text('AI KIDS LAB ACADEMY', M + 30, 25, { charSpace: 1.2 });
        doc.setFont('helvetica', 'normal'); doc.setTextColor(255, 255, 255); doc.text('My AI Portfolio  |  ' + learner, W - M, 25, { align: 'right' });
        y = 80;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(135, 98, 15); doc.text('PORTFOLIO ENTRY', M, y, { charSpace: 1 });
        doc.setFontSize(22); ink(); doc.text(safe(title), M, y + 26);
        doc.setDrawColor(255, 200, 0); doc.setLineWidth(3); doc.line(M, y + 38, M + 60, y + 38);
        y += 60;
      }
      const page = t => { doc.addPage(); header(t); };
      let curTitle = '';
      const ensure = h => { if (y + h > H - 60) page(curTitle + ' (continued)'); };
      function para(text, { size = 11, style = 'normal', color = ink, x = M, w = CW, lh = size * 1.45, gap = 8 } = {}) {
        doc.setFont('helvetica', style); doc.setFontSize(size); color();
        doc.splitTextToSize(safe(text), w).forEach(l => { ensure(lh); doc.text(l, x, y, { baseline: 'top' }); y += lh; });
        y += gap;
      }
      function card(x, yy, w, h, fill) { doc.setFillColor(...fill); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.4); doc.roundedRect(x, yy, w, h, 8, 8, 'FD'); }
      function labelled(x, yy, w, label, text, size = 10) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(135, 98, 15); doc.text(safe(label).toUpperCase(), x, yy, { baseline: 'top', charSpace: .6 });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(size); ink();
        const ls = doc.splitTextToSize(safe(text || '-'), w); ls.forEach((l, i) => doc.text(l, x, yy + 14 + i * size * 1.38, { baseline: 'top' }));
        return 14 + ls.length * size * 1.38;
      }
      const measure = (text, w, size = 10) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(size); return 14 + doc.splitTextToSize(safe(text || '-'), w).length * size * 1.38; };

      /* cover */
      doc.setFillColor(255, 249, 236); doc.rect(0, 0, W, H, 'F');
      doc.setFillColor(21, 23, 28); doc.rect(0, 0, W, 300, 'F'); doc.setFillColor(255, 200, 0); doc.rect(0, 300, W, 8, 'F');
      logo(M, 54, 40);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 200, 0); doc.text('AI KIDS LAB ACADEMY', M + 54, 79, { charSpace: 1.6 });
      doc.setFontSize(42); doc.setTextColor(255, 255, 255); doc.text('My AI Portfolio', M, 180);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(13); doc.setTextColor(255, 241, 194);
      doc.text('CBSE Artificial Intelligence (417)  |  Class IX  |  Part D: Student Portfolio', M, 212);
      doc.setFontSize(10.5); doc.setTextColor(200, 204, 211); doc.text('A record of my AI activities and projects', M, 236);
      y = 360;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(135, 98, 15); doc.text('PREPARED BY', M, y, { charSpace: 1 });
      doc.setFontSize(26); ink(); doc.text(doc.splitTextToSize(learner, CW)[0], M, y + 30);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(11); muted(); doc.text(today, M, y + 50);
      y += 92;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(13); ink(); doc.text('Contents', M, y); y += 14;
      const entries = Object.keys(READY).map(k => [TITLES[k], ready.includes(k)]);
      entries.push(['SDG Data Project summary', !!rep]);
      entries.forEach(([t, inc], i) => {
        const yy = y + i * 34;
        doc.setFillColor(255, 255, 255); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.2); doc.roundedRect(M, yy, CW, 28, 6, 6, 'FD');
        doc.setFillColor(...(inc ? [16, 154, 102] : [230, 223, 207])); doc.roundedRect(M + 8, yy + 6, 16, 16, 4, 4, 'F');
        if (inc) { doc.setDrawColor(255, 255, 255); doc.setLineWidth(2); doc.line(M + 11.5, yy + 14, M + 15, yy + 17.5); doc.line(M + 15, yy + 17.5, M + 21, yy + 10); }
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); ink(); doc.text(t, M + 34, yy + 18);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9); muted();
        doc.text(inc ? 'Included' : (i === 4 ? 'Can be added: finish the SDG Data Project lab' : 'Not completed yet'), W - M - 10, yy + 18, { align: 'right' });
      });

      /* letter */
      if (ready.includes('letter')) {
        curTitle = TITLES.letter; page(curTitle);
        para(`Written on ${today}  |  To be opened in 2035`, { size: 10, style: 'italic', color: muted, gap: 14 });
        doc.setDrawColor(230, 223, 207); doc.setLineWidth(1);
        String(d.letter.t).split(/\n/).forEach(p => { if (!p.trim()) { y += 8; return; } para(p, { size: 12, lh: 19, gap: 4 }); });
        y += 16; ensure(40);
        doc.setDrawColor(21, 23, 28); doc.setLineWidth(.8); doc.line(M, y + 20, M + 180, y + 20);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9); muted(); doc.text(learner, M, y + 32);
      }

      /* smart home */
      if (ready.includes('home')) {
        curTitle = TITLES.home; page(curTitle);
        para('A plan of my AI-powered home: which smart devices go in which room, the data each one uses, and what it decides.', { size: 10.5, color: muted, gap: 12 });
        const cols = 3, gw = CW / cols, gh = 112, X0 = M, Y0 = y;
        doc.setFillColor(255, 251, 240); doc.rect(X0, Y0, CW, gh * 2, 'F');
        d.home.rooms.forEach((r, i) => {
          const x = X0 + (i % cols) * gw, yy = Y0 + Math.floor(i / cols) * gh;
          doc.setDrawColor(185, 174, 149); doc.setLineWidth(1); doc.setLineDashPattern([4, 3], 0); doc.rect(x, yy, gw, gh, 'S'); doc.setLineDashPattern([], 0);
          doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); ink(); doc.text(safe(ROOMS[r]), x + 8, yy + 16);
          d.home.dev.map((v, j) => [v, j]).filter(([v]) => v.r === i).forEach(([v, j], k) => {
            const ty = yy + 26 + k * 21, tw = gw - 16;
            if (ty + 18 > yy + gh) return;
            doc.setFillColor(255, 200, 0); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1); doc.roundedRect(x + 8, ty, tw, 17, 8, 8, 'FD');
            doc.setFillColor(21, 23, 28); doc.circle(x + 18, ty + 8.5, 6, 'F');
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(255, 255, 255); doc.text(String(j + 1), x + 18, ty + 11, { align: 'center' });
            doc.setFontSize(8.5); ink(); doc.text(doc.splitTextToSize(DEV[v.t].n, tw - 28)[0], x + 28, ty + 12);
          });
        });
        doc.setDrawColor(21, 23, 28); doc.setLineWidth(4); doc.rect(X0, Y0, CW, gh * 2, 'S');
        y = Y0 + gh * 2 + 22;
        // device table
        const cw = [24, 110, 46, (CW - 180) / 2, (CW - 180) / 2];
        const headRow = ['#', 'Device', 'Domain', 'Data it uses', 'What it decides'];
        const row = (cells, hdr) => {
          doc.setFont('helvetica', hdr ? 'bold' : 'normal'); doc.setFontSize(9.5);
          const ls = cells.map((c, i) => doc.splitTextToSize(safe(c), cw[i] - 10)), h = Math.max(...ls.map(l => l.length)) * 12.5 + 10;
          ensure(h);
          let x = M;
          ls.forEach((l, i) => {
            doc.setFillColor(...(hdr ? [21, 23, 28] : [255, 255, 255])); doc.setDrawColor(21, 23, 28); doc.setLineWidth(.8); doc.rect(x, y, cw[i], h, 'FD');
            if (hdr) doc.setTextColor(255, 255, 255); else ink();
            if (!hdr && i === 1) doc.setFont('helvetica', 'bold'); else if (!hdr) doc.setFont('helvetica', 'normal');
            l.forEach((t, k) => doc.text(t, x + 5, y + 6 + k * 12.5, { baseline: 'top' }));
            x += cw[i];
          });
          y += h;
        };
        row(headRow, true);
        d.home.dev.forEach((v, j) => row([String(j + 1), DEV[v.t].n + '\n(' + ROOMS[d.home.rooms[v.r]] + ')', DEV[v.t].dom, v.u || '-', v.dc || '-']));
        y += 14;
        para('Data = Statistical Data domain, CV = Computer Vision, NLP = Natural Language Processing.', { size: 9, style: 'italic', color: muted });
      }

      /* job ad */
      if (ready.includes('job')) {
        curTitle = TITLES.job; page(curTitle);
        const j = d.job, w2 = (CW - 14) / 2;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(24);
        const tl = doc.splitTextToSize(safe(j.title), CW - 40);
        const hAi = measure(j.ai, w2 - 24, 10.5), hHu = measure(j.hu, w2 - 24, 10.5), hWhy = measure(j.why, CW - 64, 11);
        const total = 60 + tl.length * 28 + 30 + Math.max(hAi, hHu) + 30 + hWhy + 60;
        card(M, y, CW, total, [255, 255, 255]);
        doc.setFillColor(21, 23, 28); doc.roundedRect(M, y, CW, 38, 8, 8, 'F'); doc.rect(M, y + 20, CW, 18, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 200, 0); doc.text('NOW HIRING  |  2035', M + 20, y + 24, { charSpace: 2 });
        let yy = y + 64;
        doc.setFontSize(24); ink(); tl.forEach(l => { doc.text(l, M + 20, yy); yy += 28; });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(12); muted(); doc.text(safe(j.co || 'Company of the future'), M + 20, yy - 4); yy += 18;
        const hh = Math.max(hAi, hHu) + 20;
        card(M + 20, yy, w2 - 13, hh, [228, 236, 255]); labelled(M + 32, yy + 10, w2 - 37, 'AI skills needed', j.ai, 10.5);
        card(M + 20 + w2 - 13 + 12, yy, w2 - 13, hh, [217, 245, 232]); labelled(M + 44 + w2 - 13, yy + 10, w2 - 37, 'Human skills needed', j.hu, 10.5);
        yy += hh + 12;
        card(M + 20, yy, CW - 40, hWhy + 20, [255, 241, 194]); labelled(M + 32, yy + 10, CW - 64, 'Why this job will exist in 2035', j.why, 11);
        yy += hWhy + 34;
        doc.setFont('helvetica', 'italic'); doc.setFontSize(9); muted(); doc.text(`Advertisement imagined by ${learner}, ${today}`, M + 20, yy);
        y = y + total + 10;
      }

      /* sectors */
      if (ready.includes('sec')) {
        curTitle = TITLES.sec; page(curTitle);
        para('Three sectors where AI is used today, with one benefit and one risk for each.', { size: 10.5, color: muted, gap: 12 });
        d.sec.forEach((x, i) => {
          const hu = measure(x.u, CW - 40, 11), hk = measure(x.k, CW - 40, 11), h = 40 + hu + hk + 14;
          ensure(h + 12);
          card(M, y, CW, h, [255, 255, 255]);
          doc.setFillColor(...[[47, 111, 237], [232, 69, 60], [16, 154, 102]][i]); doc.roundedRect(M, y, 10, h, 5, 5, 'F');
          doc.setFont('helvetica', 'bold'); doc.setFontSize(15); ink(); doc.text(safe(SECTORS[x.s][0]), M + 22, y + 24);
          labelled(M + 22, y + 38, CW - 40, 'AI use', x.u, 11);
          labelled(M + 22, y + 38 + hu + 6, CW - 40, 'Risk to watch', x.k, 11);
          y += h + 14;
        });
      }

      /* SDG project */
      if (rep) {
        curTitle = 'SDG Data Project'; page(curTitle);
        para(`SDG ${rep.sdg}: ${rep.sdgName || ''}${rep.at ? '  |  Report made on ' + rep.at : ''}`, { size: 11, style: 'bold', color: () => doc.setTextColor(135, 98, 15), gap: 4 });
        if (rep.title) para(rep.title, { size: 17, style: 'bold', gap: 8 });
        if (rep.ps) { const h = measure(rep.ps, CW - 28, 11); ensure(h + 24); card(M, y, CW, h + 18, [255, 241, 194]); labelled(M + 14, y + 10, CW - 28, 'Problem statement', rep.ps, 11); y += h + 30; }
        if (rep.w) {
          const w2 = (CW - 12) / 2;
          [['who', 'what'], ['where', 'why']].forEach(pair => {
            const h = Math.max(...pair.map(k => measure(rep.w[k], w2 - 24, 10))) + 16;
            ensure(h + 10);
            pair.forEach((k, i) => { card(M + i * (w2 + 12), y, w2, h, [[228, 236, 255], [217, 245, 232], [255, 229, 226], [238, 231, 255]][(pair[0] === 'who' ? 0 : 2) + i]); labelled(M + i * (w2 + 12) + 12, y + 9, w2 - 24, k, rep.w[k], 10); });
            y += h + 10;
          });
          y += 6;
        }
        const rows = [['System map', rep.map], ['Data', rep.data], ['Insight', rep.ins], ['AI domain', rep.dom], ['Approach', rep.appr], ['What it does', rep.how], ['Evaluation', rep.ev], ['Deployment', rep.dep]].filter(r => r[1]);
        rows.forEach(([k, v], i) => {
          doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
          const ls = doc.splitTextToSize(safe(v), CW - 130), h = ls.length * 13.5 + 10;
          ensure(h);
          doc.setFillColor(...(i % 2 ? [255, 255, 255] : [255, 249, 236])); doc.setDrawColor(230, 223, 207); doc.setLineWidth(.8); doc.rect(M, y, CW, h, 'FD');
          doc.setFont('helvetica', 'bold'); ink(); doc.text(k, M + 8, y + 6, { baseline: 'top' });
          doc.setFont('helvetica', 'normal'); ls.forEach((l, j) => doc.text(l, M + 120, y + 6 + j * 13.5, { baseline: 'top' }));
          y += h;
        });
      }

      const n = doc.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        doc.setPage(i);
        doc.setDrawColor(230, 223, 207); doc.setLineWidth(1); doc.line(M, H - 40, W - M, H - 40);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); muted();
        doc.text(`${learner}  |  AI Kids Lab Academy  |  ${today}`, M, H - 28);
        doc.text(`Page ${i} of ${n}`, W - M, H - 28, { align: 'right' });
      }
    }

    root.addEventListener('input', onInput);
    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);
    root.addEventListener('pointerdown', onDown);
    const onBlur = () => save(true);
    root.addEventListener('focusout', onBlur);
    render();

    return () => {
      clearTimeout(tabT);
      if (saveT) { clearTimeout(saveT); ctx.save(); }
      endDrag(); drag = null;
      root.removeEventListener('input', onInput); root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange); root.removeEventListener('pointerdown', onDown); root.removeEventListener('focusout', onBlur);
    };
  }
};
