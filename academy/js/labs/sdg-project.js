import { esc, ic } from '../core/util.js';
import * as chart from '../core/charts.js';
import { rngFrom } from '../core/rng.js';

/* ---------- content ---------- */

const SDGS = [
  [1, 'No Poverty', '#E5243B'], [2, 'Zero Hunger', '#DDA63A'], [3, 'Good Health and Well-being', '#4C9F38'],
  [4, 'Quality Education', '#C5192D'], [5, 'Gender Equality', '#FF3A21'], [6, 'Clean Water and Sanitation', '#26BDE2'],
  [7, 'Affordable and Clean Energy', '#FCC30B'], [8, 'Decent Work and Economic Growth', '#A21942'],
  [9, 'Industry, Innovation and Infrastructure', '#FD6925'], [10, 'Reduced Inequalities', '#DD1367'],
  [11, 'Sustainable Cities and Communities', '#FD9D24'], [12, 'Responsible Consumption and Production', '#BF8B2E'],
  [13, 'Climate Action', '#3F7E44'], [14, 'Life Below Water', '#0A97D9'], [15, 'Life on Land', '#56C02B'],
  [16, 'Peace, Justice and Strong Institutions', '#00689D'], [17, 'Partnerships for the Goals', '#19486A']
];
const sdgOf = n => SDGS[n - 1];

const PROBLEMS = {
  1: ['Families near our school do not know which government schemes they can apply for', 'Daily-wage workers in our area cannot tell which weeks they will find no work'],
  2: ['Cooked food is thrown away in our school canteen every day', 'Mid-day meals in some schools do not meet children\'s nutrition needs', 'Small farmers lose crops to pests they spot too late'],
  3: ['Students sleep too little and feel tired in class', 'People wait for hours at the local clinic to find out if a fever needs a doctor', 'Elderly neighbours forget to take their medicines on time'],
  4: ['Some students fall behind in maths and nobody notices until the final exam', 'Rural school libraries have very few books in students\' own language', 'Students with poor internet at home miss online homework'],
  5: ['Fewer girls than boys join the school coding club', 'Girls feel unsafe walking home after evening tuition'],
  6: ['Water is wasted from leaking taps in our school', 'Families in our colony do not know if their drinking water is safe', 'Water tankers arrive at unpredictable times, so people wait for hours'],
  7: ['Fans and lights are left on in empty classrooms', 'Homes get very high electricity bills in summer', 'Rooftop solar panels make less power when they get dusty'],
  8: ['Young people do not know which local jobs need which skills', 'Street vendors cannot keep track of their daily earnings'],
  9: ['Potholes on our roads are reported and repaired very late', 'Small workshops lose days of work when machines break down suddenly'],
  10: ['Students with low vision find it hard to read printed notices', 'People who speak only their local language cannot use many apps'],
  11: ['Traffic jams form outside the school gate at drop-off time', 'Garbage piles up at some street corners before it is collected', 'Air near busy roads is very polluted in the mornings'],
  12: ['Families use a lot of single-use plastic bags every week', 'Households mix wet and dry waste, so it cannot be recycled', 'Old phones and batteries are thrown into ordinary dustbins'],
  13: ['Heatwaves make students ill during outdoor activities', 'Farmers in our district cannot plan for irregular rainfall', 'People do not know how big their own carbon footprint is'],
  14: ['Plastic waste flows from city drains into rivers and the sea', 'Fishers catch young fish that should be left to grow'],
  15: ['Saplings planted in tree drives die because nobody waters them', 'Wild animals enter fields and damage crops at night'],
  16: ['Students hesitate to report bullying', 'People forward fake news messages without checking them'],
  17: ['Schools and NGOs in our town do not share information about volunteers', 'Donated books and clothes do not reach the people who need them most']
};

const EX = {
  0: { who: 'the people affected, e.g. families in our village', what: 'what goes wrong and how you know, e.g. "most of them …"', where: 'the situation, e.g. "they travel to the market"', why: 'how life would get better, e.g. "save them time and money"' },
  2: { who: 'students and canteen staff of our school', what: 'about a quarter of the cooked food is thrown away every day', where: 'lunch is served in the school canteen', why: 'help the canteen cook the right amount, save money and share extra food' },
  3: { who: 'Class 9 students in our school', what: 'many of us sleep less than 8 hours and feel tired in class', where: 'we use phones late at night, especially before exams', why: 'help us build better sleep habits so we feel healthier and learn better' },
  4: { who: 'students who find maths difficult', what: 'they fall behind and nobody notices until the final exam', where: 'they attempt weekly class tests', why: 'spot students who need help early so teachers can support them' },
  6: { who: 'students and staff of our school', what: 'thousands of litres of water are wasted from leaking taps', where: 'taps are left dripping after breaks', why: 'find and fix leaks faster and save water for our whole area' },
  7: { who: 'families in our colony', what: 'electricity bills are very high and energy is wasted', where: 'fans, lights and ACs are left on in empty rooms in summer', why: 'switch off unused devices automatically and cut bills and pollution' },
  11: { who: 'students and parents near our school gate', what: 'long traffic jams make students late and the air dirty', where: 'cars drop students off between 7:20 and 7:45 am', why: 'suggest drop-off times and routes so traffic and pollution go down' },
  12: { who: 'families in our housing society', what: 'they use many single-use plastic bags every week', where: 'they shop for groceries and vegetables', why: 'track plastic use and nudge families to switch to cloth bags' },
  13: { who: 'students in our school', what: 'some students fall ill during hot afternoons', where: 'outdoor PT and assemblies happen on heatwave days', why: 'warn the school early so outdoor activities move to safer times' }
};

const ELEMENTS = {
  0: ['Size of the problem', 'Awareness', 'People affected', 'Cost', 'Government support', 'Use of technology', 'Community action'],
  2: ['Food wasted', 'Students who like the menu', 'Portion size', 'Hunger in class', 'Canteen cost', 'Awareness posters', 'Leftover sharing'],
  3: ['Hours of sleep', 'Screen time at night', 'Tiredness in class', 'Exercise', 'Marks', 'Stress', 'Junk food'],
  4: ['Attendance', 'Study time', 'Test scores', 'Extra help', 'Internet access', 'Confidence', 'Distractions'],
  6: ['Leaking taps', 'Water wasted', 'Water bill', 'Repair speed', 'Awareness', 'Water available', 'Rainwater harvesting'],
  7: ['Lights left on', 'Electricity used', 'Electricity bill', 'Motion sensors', 'Awareness', 'Temperature', 'Solar power'],
  11: ['Cars at the gate', 'Traffic jam time', 'Air pollution', 'Students who walk or cycle', 'Safe footpaths', 'Late arrivals', 'School buses'],
  12: ['Plastic bags used', 'Cloth bags used', 'Waste at landfill', 'Recycling', 'Awareness', 'Price of plastic bags', 'Littering'],
  13: ['Temperature', 'Trees planted', 'Heatwave days', 'AC use', 'Electricity demand', 'Greenhouse gases', 'Students falling ill']
};

const WS = [
  ['who', 'Who', 'Who are the stakeholders? Who faces this problem, and who else is affected?'],
  ['what', 'What', 'What is the problem or need? How do you know it exists (your evidence)?'],
  ['where', 'Where', 'Where and when does it happen? Describe the situation.'],
  ['why', 'Why', 'Why does it matter? How would a solution make life better for the stakeholders?']
];

const DOMAINS = { data: ['Data (Statistical Data)', 'works with numbers and tables'], cv: ['Computer Vision', 'works with images and video'], nlp: ['Natural Language Processing', 'works with text and speech'] };
const EVALS = { acc: 'Accuracy', cm: 'Confusion matrix', fb: 'User feedback' };
const DEPLOY = { app: 'Mobile app', web: 'Website', kiosk: 'Kiosk', sms: 'SMS', chat: 'WhatsApp chatbot', dev: 'Smart device' };
const SOURCES = ['Surveys', 'Sensors', 'Cameras', 'School records', 'Interviews', 'Observation', 'Government open data (API)'];
const ETHICS = [
  ['privacy', 'Privacy', 'Whose personal data will you collect? How will you keep it private and safe?', 'We will not store names; only class-level totals are saved, on a password-protected school computer.'],
  ['bias', 'Bias & fairness', 'Could your AI work worse for some group (girls, rural users, other languages)? How will you check?', 'We will test it with data from every class and section, not just ours.'],
  ['access', 'Access', 'Can people without a smartphone, internet or English still use it?', 'Results will also be shared by SMS and on the school notice board in Hindi and English.'],
  ['safety', 'Safety', 'What happens if the AI is wrong? Who double-checks its decisions?', 'A teacher checks every alert before any action is taken.'],
  ['consent', 'Consent', 'How will you ask permission before collecting data, photos or voices?', 'We will explain the project and ask students and parents for written permission first.']
];
const CHARTS = { bar: 'Bar', line: 'Line', pie: 'Pie', scatter: 'Scatter', hist: 'Histogram' };

const STEPS = [
  ['SDG', 'Pick a Sustainable Development Goal'], ['Problem', 'Choose a local problem'], ['4Ws', '4Ws problem canvas'],
  ['Statement', 'Problem statement'], ['Map', 'System map'], ['Data', 'Explore the data'],
  ['AI', 'Your AI solution'], ['Ethics', 'Ethics checklist'], ['Report', 'Your project report']
];

const LIM = { s: 60, m: 250, l: 300 };

/* ---------- datasets (seeded per learner) ---------- */

const rd = (v, p = 0) => +(+v).toFixed(p);
function makeDataset(sdg, seed) {
  const r = rngFrom('sdg-data', seed, sdg), N = (a, b) => a + r() * (b - a);
  const g = {
    2() {
      const menus = ['Rice-dal', 'Khichdi', 'Roti-sabzi', 'Poha', 'Chole-rice'], base = { 'Rice-dal': 14, Khichdi: 22, 'Roti-sabzi': 11, Poha: 17, 'Chole-rice': 9 };
      return { t: 'School canteen leftovers (15 school days)', time: true, cols: [['Day', 'lab'], ['Meals served', 'num', 'meals'], ['Food wasted', 'num', 'kg'], ['Menu', 'cat']],
        rows: Array.from({ length: 15 }, (_, i) => { const m = menus[i % 5]; return ['D' + (i + 1), r.int(255, 320), rd(base[m] + N(-3, 3), 1), m]; }) };
    },
    3() {
      return { t: 'Class 9 sleep and screen-time survey (16 students)', cols: [['Student', 'lab'], ['Screen time at night', 'num', 'hours'], ['Sleep', 'num', 'hours'], ['Steps per day', 'num', 'steps'], ['Plays a sport', 'cat']],
        rows: Array.from({ length: 16 }, (_, i) => { const sc = rd(N(0.5, 5), 1), sp = r.chance(0.5); return ['S' + (i + 1), sc, rd(Math.min(9.5, 9.1 - 0.55 * sc + N(-0.5, 0.5)), 1), Math.round((sp ? N(7000, 12000) : N(3000, 8000)) / 10) * 10, sp ? 'Yes' : 'No']; }) };
    },
    4() {
      return { t: 'Maths class test data (16 students)', cols: [['Student', 'lab'], ['Study time', 'num', 'hours/week'], ['Attendance', 'num', '%'], ['Test score', 'num', 'out of 100'], ['Internet at home', 'cat']],
        rows: Array.from({ length: 16 }, (_, i) => { const st = r.int(1, 12), at = r.int(68, 99), net = r.chance(0.6); return ['S' + (i + 1), st, at, Math.min(98, Math.round(22 + 3.6 * st + 0.45 * (at - 68) + (net ? 4 : 0) + N(-6, 6))), net ? 'Yes' : 'No']; }) };
    },
    6() {
      const w = ['Hot', 'Mild', 'Rainy'];
      return { t: 'School water meter readings (14 days)', time: true, cols: [['Day', 'lab'], ['Water used', 'num', 'litres'], ['Leaking taps', 'num', 'taps'], ['Students present', 'num', 'students'], ['Weather', 'cat']],
        rows: Array.from({ length: 14 }, (_, i) => { const lt = i < 7 ? r.int(4, 7) : r.int(0, 3), wt = r.pick(w); return ['D' + (i + 1), Math.round((4100 + 280 * lt + (wt === 'Hot' ? 450 : wt === 'Rainy' ? -300 : 0) + N(-200, 200)) / 10) * 10, lt, r.int(820, 905), wt]; }) };
    },
    7() {
      const T = [14, 17, 23, 29, 33, 33, 31, 30, 29, 25, 20, 15], M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const S = ['Winter', 'Winter', 'Summer', 'Summer', 'Summer', 'Summer', 'Monsoon', 'Monsoon', 'Monsoon', 'Post-monsoon', 'Post-monsoon', 'Winter'];
      return { t: 'One home\'s electricity use (12 months)', time: true, cols: [['Month', 'lab'], ['Units used', 'num', 'kWh'], ['Average temperature', 'num', '°C'], ['Bill', 'num', '₹'], ['Season', 'cat']],
        rows: M.map((m, i) => { const t = rd(T[i] + N(-1.5, 1.5), 1), u = Math.round(150 + Math.max(0, t - 24) * 24 + N(-15, 15)); return [m, u, t, Math.round(u * 6.5 / 10) * 10, S[i]]; }) };
    },
    11() {
      return { t: 'Traffic at the school gate (12 five-minute slots)', time: true, cols: [['Time', 'lab'], ['Vehicles', 'num', 'vehicles'], ['Pedestrians', 'num', 'people'], ['Air quality index', 'num', 'AQI'], ['Rush level', 'cat']],
        rows: Array.from({ length: 12 }, (_, i) => { const v = Math.round(12 + 46 * Math.exp(-((i - 6) ** 2) / 8) + N(-4, 4)); return ['7:' + String(i * 5).padStart(2, '0'), v, Math.round(20 + 30 * Math.exp(-((i - 5) ** 2) / 10) + N(-5, 5)), Math.round(95 + v * 1.4 + N(-8, 8)), v > 40 ? 'High' : v > 22 ? 'Medium' : 'Low']; }) };
    },
    12() {
      return { t: 'Household plastic survey (15 homes)', cols: [['Home', 'lab'], ['Family size', 'num', 'people'], ['Plastic bags per week', 'num', 'bags'], ['Plastic bottles per week', 'num', 'bottles'], ['Carries cloth bag', 'cat']],
        rows: Array.from({ length: 15 }, (_, i) => { const f = r.int(2, 7), cb = r.chance(0.45); return ['H' + (i + 1), f, Math.max(1, Math.round(f * (cb ? 1.2 : 2.6) + N(-2, 2))), Math.max(0, Math.round(f * 1.1 + N(-2, 3))), cb ? 'Yes' : 'No']; }) };
    },
    13() {
      return { t: 'Our city\'s summers (2013–2024)', time: true, cols: [['Year', 'lab'], ['Highest temperature', 'num', '°C'], ['Heatwave days', 'num', 'days'], ['Rainy days', 'num', 'days'], ['Decade', 'cat']],
        rows: Array.from({ length: 12 }, (_, i) => [String(2013 + i), rd(43.2 + 0.12 * i + N(-0.8, 0.8), 1), Math.max(0, Math.round(6 + 0.9 * i + N(-3, 3))), r.int(55, 82), 2013 + i < 2020 ? '2010s' : '2020s']) };
    }
  };
  if (g[sdg]) return g[sdg]();
  const area = ['Urban', 'Rural'];
  return { t: 'Community survey about the problem (15 people)', generic: true, cols: [['Person', 'lab'], ['Age', 'num', 'years'], ['Awareness of the problem', 'num', 'score 1–10'], ['Hours affected per week', 'num', 'hours'], ['Area', 'cat']],
    rows: Array.from({ length: 15 }, (_, i) => { const a = r.pick(area), aw = r.int(2, 10); return ['P' + (i + 1), r.int(13, 68), aw, Math.max(0, Math.round((a === 'Rural' ? 7 : 4) - aw * 0.3 + N(-1.5, 2.5))), a]; }) };
}
const numCols = ds => ds.cols.map((c, i) => c[1] === 'num' ? i : -1).filter(i => i >= 0);
const catCol = ds => ds.cols.findIndex(c => c[1] === 'cat');
function stats(vals) {
  const s = vals.slice().sort((a, b) => a - b), n = s.length, sum = s.reduce((a, b) => a + b, 0);
  return { mean: sum / n, median: n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, min: s[0], max: s[n - 1] };
}
const f1 = v => (Math.round(v * 10) / 10).toLocaleString('en-IN');
const unitTxt = c => c[2] ? ` (${c[2]})` : '';

/* ---------- helpers ---------- */

const clean = s => String(s || '').trim().replace(/\s+/g, ' ').replace(/[.!\s]+$/, '');
const lowerFirst = s => (s && !/^[A-Z]{2}/.test(s) && !/^I\b/.test(s)) ? s[0].toLowerCase() + s.slice(1) : s;
function wrapWords(s, max, lines = 3) {
  const out = []; let cur = '';
  String(s).split(/\s+/).forEach(w => {
    if (!cur) cur = w; else if ((cur + ' ' + w).length <= max) cur += ' ' + w; else { out.push(cur); cur = w; }
  });
  if (cur) out.push(cur);
  if (out.length > lines) { out.length = lines; out[lines - 1] = out[lines - 1].slice(0, max - 1) + '…'; }
  return out.map(l => l.length > max ? l.slice(0, max - 1) + '…' : l);
}

// System map as a standalone SVG string (explicit fonts so it can be rasterised for the PDF).
function mapSvg(els, lns, narrow) {
  const W = narrow ? 360 : 560, H = narrow ? 470 : 400, cx = W / 2, cy = H / 2;
  const rx = narrow ? 112 : 200, ry = narrow ? 175 : 140, nw = narrow ? 118 : 134, nh = 54, fs = 13;
  const pos = els.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / els.length; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  const exit = (c, t) => { const dx = t[0] - c[0], dy = t[1] - c[1], k = Math.min((nw / 2 + 5) / Math.abs(dx || 1e-6), (nh / 2 + 5) / Math.abs(dy || 1e-6)); return [c[0] + dx * k, c[1] + dy * k]; };
  let edges = '', labels = '';
  lns.forEach(([a, b, s]) => {
    const p = pos[a], q = pos[b]; if (!p || !q) return;
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy) || 1;
    const off = lns.some(l => l[0] === b && l[1] === a) ? 30 : 14, nx = -dy / len, ny = dx / len;
    const c = [mx + nx * off * 2, my + ny * off * 2], s0 = exit(p, c), s1 = exit(q, c), col = s === '+' ? '#109A66' : '#D93A40';
    edges += `<path d="M${s0[0].toFixed(1)},${s0[1].toFixed(1)} Q${c[0].toFixed(1)},${c[1].toFixed(1)} ${s1[0].toFixed(1)},${s1[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.6" marker-end="url(#ah${s === '+' ? 'p' : 'm'})"/>`;
    const lx = mx + nx * off, ly = my + ny * off;
    labels += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="12" fill="#fff" stroke="${col}" stroke-width="2.4"/><text x="${lx.toFixed(1)}" y="${(ly + 5.5).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="900" fill="${col}">${s === '+' ? '+' : '−'}</text>`;
  });
  const nodes = els.map((e, i) => {
    const [x, y] = pos[i], L = wrapWords(e, narrow ? 15 : 17, 3), lh = 14.5, y0 = y - (L.length - 1) * lh / 2 + 4.5;
    return `<rect x="${(x - nw / 2).toFixed(1)}" y="${(y - nh / 2).toFixed(1)}" width="${nw}" height="${nh}" rx="12" fill="#FFF1C2" stroke="#15171C" stroke-width="2.2"/>` +
      L.map((l, k) => `<text x="${x.toFixed(1)}" y="${(y0 + k * lh).toFixed(1)}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#15171C">${esc(l)}</text>`).join('');
  }).join('');
  const mk = (id, c) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Nunito, Arial, Helvetica, sans-serif" role="img" aria-label="System map with ${els.length} elements and ${lns.length} links"><defs>${mk('ahp', '#109A66')}${mk('ahm', '#D93A40')}</defs><rect width="${W}" height="${H}" fill="#fff"/>${edges}${nodes}${labels}</svg>`;
}

// Rasterise an SVG string to a PNG data URL (for jsPDF.addImage).
function svgToPng(svg, W, H, css = true, scale = 2.5) {
  let s = svg.replace(/^<svg(?![^>]*xmlns=)/, '<svg xmlns="http://www.w3.org/2000/svg"');
  s = s.replace(/^<svg([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, '')} width="${W}" height="${H}">${css ? '<style>text{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#2A2F3A;font-weight:700}</style>' : ''}<rect width="${W}" height="${H}" fill="#fff"/>`);
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = W * scale; c.height = H * scale;
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
      try { res(c.toDataURL('image/jpeg', 0.9)); } catch (e) { rej(e); }
    };
    img.onerror = () => rej(new Error('Could not draw the picture.'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  });
}

// jsPDF's built-in fonts only know Latin-1 characters.
function safe(s) {
  return String(s ?? '').replace(/[‘’‛′]/g, "'").replace(/[“”″]/g, '"')
    .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/₹/g, 'Rs ').replace(/→/g, '->')
    .replace(/•/g, '-').replace(/[✓✔]/g, 'v').replace(/[^\t\n\r\x20-\x7E\xA0-\xFF]/g, '');
}
const hasNonLatin = s => /[^\t\n\r\x20-\x7E\xA0-\xFF‘’“”–—…₹−→]/.test(s);
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

/* ---------- lab ---------- */

// Update a row of buttons in place (so a tap that lands during an update is not lost).
function morph(box, html) {
  const t = document.createElement('div'); t.innerHTML = html;
  const a = [...box.children], b = [...t.children];
  if (a.length !== b.length) { box.innerHTML = html; return; }
  a.forEach((el, i) => {
    const n = b[i];
    [...el.attributes].forEach(x => { if (!n.hasAttribute(x.name)) el.removeAttribute(x.name); });
    [...n.attributes].forEach(x => { if (el.getAttribute(x.name) !== x.value) el.setAttribute(x.name, x.value); });
    if (el.innerHTML !== n.innerHTML) el.innerHTML = n.innerHTML;
  });
}

export default {
  title: 'SDG Data Project: build an AI solution',
  mount(ctx) {
    const d = ctx.data;
    d.step ??= 0; d.w ??= {}; d.ps ??= { hv: '', ww: 'when', e: {} }; d.map ??= { el: [], ln: [] };
    d.dt ??= { col: 1, ch: '', x: 2, ins: '' }; d.ai ??= { ev: [], dep: [] }; d.eth ??= {}; d.prob ??= ''; d.pi ??= -1;
    if (d.seed == null) d.seed = ctx.rng.int(1, 999999999);
    let completedNow = false, saveT = 0, ds = null, dsFor = null, busy = false;
    const root = ctx.el;
    root.classList.add('lab-sdg');

    const narrow = () => (root.clientWidth || 800) < 520;
    const dataset = () => { if (!d.sdg) return null; if (dsFor !== d.sdg) { ds = makeDataset(d.sdg, d.seed); dsFor = d.sdg; } return ds; };

    /* --- saving --- */
    function save(now) {
      clearTimeout(saveT);
      const go = () => { fitSize(); ctx.save(); const s = root.querySelector('#sdgSaved'); if (s) s.textContent = 'Saved ✓'; };
      if (now) go(); else { const s = root.querySelector('#sdgSaved'); if (s) s.textContent = 'Saving…'; saveT = setTimeout(go, 350); }
    }
    function fitSize() {   // keep ctx.data under ~7.8 KB
      let n = JSON.stringify(d).length;
      if (n < 7800 || !d.report) return;
      ['how', 'ins', 'data', 'map'].forEach(k => { if (n > 7800 && typeof d.report[k] === 'string') { d.report[k] = d.report[k].slice(0, 80); n = JSON.stringify(d).length; } });
      if (n > 7800 && d.report.w) { Object.keys(d.report.w).forEach(k => { d.report.w[k] = d.report.w[k].slice(0, 80); }); }
    }

    /* --- path get/set for data-k fields --- */
    const get = k => k.split('.').reduce((o, p) => (o == null ? undefined : o[p]), d);
    const set = (k, v) => { const p = k.split('.'), last = p.pop(); p.reduce((o, q) => (o[q] ??= {}), d)[last] = v; };

    /* --- problem statement --- */
    function autoPart(k) {
      const w = d.w;
      if (k === 'who') return lowerFirst(clean(w.who).replace(/^(our|the)\s+/i, ''));
      if (k === 'what') return lowerFirst(clean(w.what).replace(/^(we|they)?\s*(have|has)\s+a\s+problem\s+that\s+/i, '').replace(/^(a\s+problem\s+that|the\s+problem\s+is\s+that|problem\s*:|that)\s*/i, ''));
      if (k === 'ctx') return lowerFirst(clean(w.where).replace(/^(when|while)\s+/i, ''));
      return lowerFirst(clean(w.why).replace(/^(an\s+ideal\s+solution\s+would|it\s+would|would|to)\s+/i, ''));
    }
    const part = k => clean(d.ps.e[k] ?? autoPart(k));
    const NOT_PL = /^(class|bus|glass|grass|this|his|is|was|its|campus|address|business|process|access|status)$/i;
    function plural(who) {
      const w = who.toLowerCase().split(/\s+/).filter(x => !/^(our|the|all|many|most|some|young|local|small|old|poor|rural|urban|school|class)$/.test(x)).slice(0, 2);
      return / and |&/.test(who) || w.some(x => /^(people|staff|children|police|youth|we|they|families|women|men)$/.test(x) || (/[^s']s$/.test(x) && !NOT_PL.test(x)));
    }
    const hv = () => d.ps.hv || (plural(part('who')) ? 'have' : 'has');
    function statement() {
      const p = { who: part('who'), what: part('what'), ctx: part('ctx'), ideal: part('ideal') };
      if (!p.who && !p.what && !p.ctx && !p.ideal) return '';
      return `Our ${p.who || '…'} ${hv()} a problem that ${p.what || '…'} ${d.ps.ww} ${p.ctx || '…'}. An ideal solution would ${p.ideal || '…'}.`;
    }

    /* --- step readiness --- */
    const L = (s, n = 8) => clean(s).length >= n;
    const ok = [
      () => !!d.sdg,
      () => L(d.prob, 10),
      () => WS.every(([k]) => L(d.w[k], 3)),
      () => ['who', 'what', 'ctx', 'ideal'].every(k => L(part(k), 3)),
      () => d.map.el.length >= 4 && d.map.ln.length >= 3,
      () => !!d.dt.ch && L(d.dt.ins, 10),
      () => !!d.ai.dom && !!d.ai.appr && L(d.ai.need, 5) && L(d.ai.how, 5) && d.ai.ev.length > 0 && d.ai.dep.length > 0,
      () => ETHICS.every(([k]) => L(d.eth[k], 8)),
      () => !!d.pdf
    ];
    const missing = [
      'Pick one of the 17 goals.', 'Write or pick a problem (at least a short sentence).', 'Fill in all four boxes: Who, What, Where and Why.',
      'Complete all four blanks of the statement.', 'Add at least 4 elements and 3 links (+ or −).', 'Choose a chart and write one insight.',
      'Choose a domain and approach, and fill in what it does, data needed, evaluation and deployment.', 'Write one sentence for each of the 5 ethics points.'
    ];

    /* --- UI building blocks --- */
    let fid = 0;
    function field(k, label, { ph = '', max = LIM.m, rows = 0, hint = '', val } = {}) {
      const v = (val ?? get(k)) || '', id = 'sf' + (++fid);
      const ctl = rows
        ? `<textarea class="input" id="${id}" data-k="${k}" data-max="${max}" rows="${rows}" placeholder="${esc(ph)}"${hint ? ` aria-describedby="${id}h"` : ''}>${esc(v)}</textarea>`
        : `<input class="input" id="${id}" data-k="${k}" data-max="${max}" placeholder="${esc(ph)}" value="${esc(v)}"${hint ? ` aria-describedby="${id}h"` : ''}>`;
      return `<div class="field"><label for="${id}">${label}</label>${hint ? `<span class="small muted" id="${id}h">${hint}</span>` : ''}${ctl}<span class="tiny muted sdg-lim" data-lim="${k}">${v.length} / ${max}</span></div>`;
    }
    const seg = (name, opts, cur, label) => `<div class="seg" role="group" aria-label="${esc(label)}">${Object.entries(opts).map(([k, v]) => `<button type="button" data-seg="${name}" data-v="${k}" aria-pressed="${cur === k}">${esc(v)}</button>`).join('')}</div>`;
    const toggles = (name, opts, cur) => `<div class="pill-row">${Object.entries(opts).map(([k, v]) => `<button type="button" class="toggle" data-tog="${name}" data-v="${k}" aria-pressed="${cur.includes(k)}">${esc(v)}</button>`).join('')}</div>`;
    const needSdg = () => `<div class="warn"><b>First things first.</b> Pick an SDG in step 1 so we can suggest ideas and data for it. <button class="btn sm mt" data-go="0">Go to step 1</button></div>`;
    const sdgChip = () => { const s = sdgOf(d.sdg); return `<span class="sdg-chip" style="background:${s[2]};color:${s[0] === 7 ? '#15171C' : '#fff'}">SDG ${s[0]} · ${esc(s[1])}</span>`; };

    /* --- steps --- */
    const VIEWS = [
      // 1 SDG
      () => `<p class="lab-intro">The 17 Sustainable Development Goals (SDGs) were agreed by all UN countries for 2030. Pick the goal your project will help with.</p>
        <div class="sdg-grid">${SDGS.map(([n, name, c]) => `<button type="button" class="sdg-card" data-sdg="${n}" aria-pressed="${d.sdg === n}" style="background:${c};color:${n === 7 ? '#15171C' : '#fff'}"><span class="n">${n}</span><span>${esc(name)}</span></button>`).join('')}</div>
        <p class="small muted" aria-live="polite" id="sdgPicked">${d.sdg ? `You picked <b>SDG ${d.sdg}: ${esc(sdgOf(d.sdg)[1])}</b>. Press Next.` : 'Tap a goal to choose it.'}</p>`,
      // 2 Problem
      () => !d.sdg ? needSdg() : `<p class="lab-intro">${sdgChip()} Good projects start small and local — a problem you can see in your school, home or neighbourhood.</p>
        <div class="opts">${PROBLEMS[d.sdg].map((p, i) => `<button type="button" class="opt" data-prob="${i}" aria-pressed="${d.pi === i}"><span class="k">${'ABC'[i]}</span><span>${esc(p)}</span></button>`).join('')}</div>
        ${field('prob', 'Your problem (pick one above and edit it, or write your own)', { rows: 3, max: LIM.l, ph: 'e.g. ' + PROBLEMS[d.sdg][0] })}`,
      // 3 4Ws
      () => {
        const ex = EX[d.sdg] || EX[0];
        return `<p class="lab-intro">The <b>4Ws Problem Canvas</b> helps you understand a problem before solving it. Answer each question in a sentence. The grey text is an example.</p>
          ${d.prob ? `<div class="panel small"><b>Your problem:</b> ${esc(d.prob)}</div>` : ''}
          <div class="lab-grid">${WS.map(([k, t, q]) => `<div class="lab-box">${field('w.' + k, `<span class="sdg-w">${t}?</span>`, { rows: 3, max: LIM.m, hint: q, ph: 'e.g. ' + ex[k] })}</div>`).join('')}</div>`;
      },
      // 4 Statement
      () => `<p class="lab-intro">The <b>Problem Statement Template</b> sums up your 4Ws in one clear sentence. We filled the blanks from your canvas — edit any blank so it reads well.</p>
        <div class="key" aria-live="polite"><b>Your problem statement</b><span id="psOut">${esc(statement()) || '<i>Fill in the 4Ws first.</i>'}</span></div>
        <div class="row small"><span class="muted">Our [stakeholders] <b>has/have a problem that</b> [issue] <b>when/while</b> [situation]. <b>An ideal solution would</b> [benefit].</span></div>
        <div class="lab-grid">
          <div class="lab-box">${field('ps.e.who', 'Our … (stakeholders — from Who)', { max: LIM.m, rows: 2, val: part('who') })}<div class="row mt">${seg('hv', { has: 'has', have: 'have' }, hv(), 'has or have')}<span class="small muted">a problem that…</span></div></div>
          <div class="lab-box">${field('ps.e.what', 'a problem that … (issue — from What)', { max: LIM.m, rows: 2, val: part('what') })}</div>
          <div class="lab-box"><div class="row mb">${seg('ww', { when: 'when', while: 'while' }, d.ps.ww, 'when or while')}<span class="small muted">… (situation — from Where)</span></div>${field('ps.e.ctx', 'Situation', { max: LIM.m, rows: 2, val: part('ctx') })}</div>
          <div class="lab-box">${field('ps.e.ideal', 'An ideal solution would … (benefit — from Why)', { max: LIM.m, rows: 2, val: part('ideal') })}</div>
        </div>
        <div class="row"><button type="button" class="btn sm" id="psRefill">${ic('refresh')} Refill blanks from my 4Ws</button></div>`,
      // 5 System map
      () => {
        if (!d.sdg) return needSdg();
        const sug = (ELEMENTS[d.sdg] || ELEMENTS[0]).filter(e => !d.map.el.includes(e));
        const el = d.map.el, opt = sel => el.map((e, i) => `<option value="${i}"${sel === i ? ' selected' : ''}>${esc(e)}</option>`).join('');
        return `<p class="lab-intro">A <b>system map</b> shows the elements of a problem and how they affect each other. An arrow with <b class="sdg-plus">+</b> means both change in the <b>same direction</b> (one goes up, the other goes up). <b class="sdg-minus">−</b> means <b>opposite directions</b> (one goes up, the other goes down).</p>
          <div class="lab-grid">
            <div class="lab-box">
              <h4>1. Elements <span class="chip ${el.length >= 4 ? 'ok' : 'dim'}">${el.length} / 6</span></h4>
              <p class="small muted">Choose 4 to 6 things that are part of your problem.</p>
              <div class="pill-row mt">${el.map((e, i) => `<span class="chip gold sdg-el">${esc(e)} <button type="button" class="sdg-x" data-rmel="${i}" aria-label="Remove ${esc(e)}">${ic('x', 'sm')}</button></span>`).join('') || '<span class="small muted">No elements yet.</span>'}</div>
              ${el.length < 6 ? `<p class="small mt"><b>Suggestions</b> (tap to add)</p><div class="pill-row mt">${sug.map(e => `<button type="button" class="toggle" data-addel="${esc(e)}">+ ${esc(e)}</button>`).join('')}</div>
              <div class="row mt"><label class="sr" for="elNew">Your own element</label><input class="input" id="elNew" maxlength="40" placeholder="Add your own (max 40 letters)" style="flex:1;min-width:0"><button type="button" class="btn sm" id="elAdd">Add</button></div>` : '<p class="small muted mt">That\'s the maximum of 6. Remove one to add another.</p>'}
            </div>
            <div class="lab-box">
              <h4>2. Links <span class="chip ${d.map.ln.length >= 3 ? 'ok' : 'dim'}">${d.map.ln.length} (need 3+)</span></h4>
              ${el.length < 2 ? '<p class="small muted">Add elements first.</p>' : `
              <div class="sdg-link">
                <div class="field"><label for="lnA">When this changes…</label><select class="input" id="lnA">${opt(0)}</select></div>
                <div class="field"><label for="lnB">…it affects this</label><select class="input" id="lnB">${opt(1)}</select></div>
                <div class="field"><span class="small" style="font-weight:800">Direction</span>${seg('sign', { '+': '+ same', '-': '− opposite' }, d.map.sg || '+', 'Relationship sign')}</div>
                <button type="button" class="btn sm primary" id="lnAdd">Add link</button>
              </div>
              <p class="err small" id="lnErr" aria-live="polite"></p>`}
              <ul class="sdg-links">${d.map.ln.map(([a, b, s], i) => `<li><span><b>${esc(el[a])}</b> → <b>${esc(el[b])}</b> <span class="chip ${s === '+' ? 'ok' : 'bad'}">${s === '+' ? '+ same direction' : '− opposite direction'}</span></span><span class="row"><button type="button" class="btn sm" data-flip="${i}" aria-label="Switch sign">± Switch</button><button type="button" class="btn sm" data-rmln="${i}" aria-label="Remove link">${ic('x', 'sm')}</button></span></li>`).join('')}</ul>
            </div>
          </div>
          ${el.length ? `<div id="mapOut">${mapSvg(el, d.map.ln, narrow())}</div>` : ''}`;
      },
      // 6 Data
      () => {
        if (!d.sdg) return needSdg();
        const D = dataset(), nc = numCols(D), ci = catCol(D);
        if (!nc.includes(d.dt.col)) d.dt.col = nc[0];
        if (!nc.includes(d.dt.x) || d.dt.x === d.dt.col) d.dt.x = nc.find(i => i !== d.dt.col);
        const st = stats(D.rows.map(r => r[d.dt.col])), C = D.cols[d.dt.col];
        return `<p class="lab-intro">In a real project you would collect this data yourself (surveys, sensors, records). Here is a <b>practice dataset</b> for ${sdgChip()} — explore it like a spreadsheet.</p>
          ${D.generic ? '<p class="small muted">There is no special dataset for this goal, so we use a general community survey about your problem.</p>' : ''}
          <div class="lab-box"><h4>${ic('table')} ${esc(D.t)}</h4>
            <div class="tblwrap sdg-sheet"><table class="tbl"><thead><tr><th class="sdg-rn">#</th>${D.cols.map((c, i) => `<th${i === d.dt.col ? ' class="sdg-hl"' : ''}>${esc(c[0])}${c[2] ? `<br><span class="tiny">${esc(c[2])}</span>` : ''}</th>`).join('')}</tr></thead>
            <tbody>${D.rows.map((r, j) => `<tr><td class="sdg-rn">${j + 1}</td>${r.map((v, i) => `<td${i === d.dt.col ? ' class="sdg-hl"' : ''}>${esc(typeof v === 'number' ? v.toLocaleString('en-IN') : v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
            <p class="tiny muted mt">Sample data made up for practice · ${D.rows.length} rows</p>
          </div>
          <div class="lab-box">
            <div class="field"><label for="dtCol">Column to analyse</label><select class="input" id="dtCol">${nc.map(i => `<option value="${i}"${i === d.dt.col ? ' selected' : ''}>${esc(D.cols[i][0] + unitTxt(D.cols[i]))}</option>`).join('')}</select></div>
            <div class="stats mt" aria-live="polite">${[['Mean', st.mean], ['Median', st.median], ['Minimum', st.min], ['Maximum', st.max]].map(([k, v]) => `<div class="stat"><div class="k">${k}</div><div class="v">${f1(v)}${C[2] ? ` <small>${esc(C[2])}</small>` : ''}</div></div>`).join('')}</div>
            <p class="small muted mt">Mean = sum ÷ count. Median = middle value when sorted. Range = ${f1(st.max)} − ${f1(st.min)} = <b>${f1(st.max - st.min)}</b>.</p>
          </div>
          <div class="lab-box">
            <h4>Choose a chart</h4>
            <div class="pill-row" role="group" aria-label="Chart type">${Object.entries(CHARTS).map(([k, v]) => `<button type="button" class="toggle" data-seg="ch" data-v="${k}" aria-pressed="${d.dt.ch === k}">${v}</button>`).join('')}</div>
            ${d.dt.ch === 'scatter' ? `<div class="field mt"><label for="dtX">Compare with (x-axis)</label><select class="input" id="dtX">${nc.filter(i => i !== d.dt.col).map(i => `<option value="${i}"${i === d.dt.x ? ' selected' : ''}>${esc(D.cols[i][0])}</option>`).join('')}</select></div>` : ''}
            <div id="chartOut" class="mt">${d.dt.ch ? chartSvg(D, narrow() ? 380 : 560) : '<p class="small muted">Pick a chart type to draw your data.</p>'}</div>
            <p class="small mt" id="chartTip" aria-live="polite">${chartTip(D, ci)}</p>
          </div>
          ${field('dt.ins', 'Your insight — what does the data tell you?', { rows: 3, max: LIM.m, ph: 'e.g. ' + insightEx(D) })}`;
      },
      // 7 AI
      () => `<p class="lab-intro">Now design an AI that could help. This is the <b>Modelling, Evaluation and Deployment</b> part of the AI Project Cycle.</p>
        <div class="lab-box">${field('ai.name', 'Give your AI idea a name', { max: LIM.s, ph: 'e.g. WasteWise — canteen food predictor' })}
          <div class="mt">${field('ai.how', 'What will it do? (1–2 sentences)', { rows: 2, max: LIM.l, ph: 'e.g. It predicts how many students will eat each menu so the canteen cooks the right amount.' })}</div></div>
        <div class="lab-box"><h4>AI domain</h4><div class="opts sdg-dom">${Object.entries(DOMAINS).map(([k, [t, s]]) => `<button type="button" class="opt" data-dom="${k}" aria-pressed="${d.ai.dom === k}"><span class="tag ${k}">${k === 'data' ? 'Data' : k.toUpperCase()}</span><span>${t}<br><span class="small muted">${s}</span></span></button>`).join('')}</div></div>
        <div class="lab-box">${field('ai.need', 'Data needed — what data will it learn from or use?', { rows: 2, max: LIM.l, ph: 'e.g. Daily menu, number of students present, kg of food wasted, weather' })}
          <p class="small mt"><b>Where could the data come from?</b> (tap to add)</p><div class="pill-row mt">${SOURCES.map(s => `<button type="button" class="toggle" data-src="${esc(s)}">+ ${esc(s)}</button>`).join('')}</div></div>
        <div class="lab-box"><h4>Rule-based or learning-based?</h4>
          ${seg('appr', { rule: 'Rule-based', learn: 'Learning-based' }, d.ai.appr || '', 'Approach')}
          <p class="small muted mt"><b>Rule-based:</b> you write the rules (if-else, decision tree); it can't improve by itself. <b>Learning-based:</b> it learns the pattern from examples (data) and can adapt to new data.</p>
          <div class="mt">${field('ai.why', 'Why this approach?', { rows: 2, max: LIM.m, ph: 'e.g. Learning-based, because the amount eaten depends on many things that change, and it can learn from past days.' })}</div></div>
        <div class="lab-box"><h4>How will you evaluate it?</h4>${toggles('ev', EVALS, d.ai.ev)}
          <p class="small muted mt">Accuracy = (TP + TN) ÷ all predictions × 100%. A confusion matrix shows TP, TN, FP and FN.</p>
          <div class="mt">${field('ai.evn', 'How will you test it?', { rows: 2, max: LIM.m, ph: 'e.g. Test on 2 weeks of new data it has never seen and count correct predictions.' })}</div></div>
        <div class="lab-box"><h4>Deployment — how will people use it?</h4>${toggles('dep', DEPLOY, d.ai.dep)}
          <div class="mt">${field('ai.depn', 'Who uses it, and where?', { rows: 2, max: LIM.m, ph: 'e.g. The canteen manager checks the app at 9 am; parents get an SMS summary.' })}</div></div>`,
      // 8 Ethics
      () => `<p class="lab-intro"><b>AI ethics</b> means building AI that is fair, safe and respects people. Write one sentence for each point about <i>your</i> project.</p>
        <div class="stack">${ETHICS.map(([k, t, q, ex]) => `<div class="lab-box"><div class="row between"><h4>${t}</h4><span class="chip ${L(d.eth[k], 8) ? 'ok' : 'dim'}" data-ethchip="${k}">${L(d.eth[k], 8) ? '✓ done' : 'to do'}</span></div>${field('eth.' + k, 'Our plan', { rows: 2, max: LIM.m, hint: q, ph: 'e.g. ' + ex })}</div>`).join('')}</div>`,
      // 9 Report
      () => reportView()
    ];

    function chartSvg(D, W) {
      const C = D.cols[d.dt.col], labs = D.rows.map(r => r[0]), vals = D.rows.map(r => r[d.dt.col]), ci = catCol(D), o = { W, H: 300 };
      if (d.dt.ch === 'bar') return chart.bar(labs, vals, { ...o, title: `${C[0]} by ${D.cols[0][0].toLowerCase()}`, ylabel: C[2] || '' });
      if (d.dt.ch === 'line') return chart.line(labs, [vals], { ...o, title: `${C[0]} over ${D.cols[0][0].toLowerCase()}s`, ylabel: C[2] || '' });
      if (d.dt.ch === 'hist') return chart.histogram(vals, 5, { ...o, title: `How ${C[0].toLowerCase()} is spread`, xlabel: C[0] });
      if (d.dt.ch === 'pie') {
        const cats = [...new Set(D.rows.map(r => r[ci]))];
        return chart.pie(cats, cats.map(c => D.rows.filter(r => r[ci] === c).length), { ...o, title: `${D.cols[ci][0]}: share of ${D.cols[0][0].toLowerCase()}s` });
      }
      const X = D.cols[d.dt.x];
      return chart.scatter(D.rows.map(r => [r[d.dt.x], r[d.dt.col]]), { ...o, title: `${C[0]} vs ${X[0].toLowerCase()}`, xlabel: X[0], ylabel: C[0] });
    }
    function chartTip(D, ci) {
      const t = {
        bar: '✓ <b>Bar chart</b> — good for comparing values across rows or categories.',
        line: D.time ? '✓ <b>Line chart</b> — great here: your rows are in time order, so you can see the trend.' : '⚠ <b>Line chart</b> — line charts are for change over time. These rows are not in time order, so a bar chart may be clearer.',
        pie: `✓ <b>Pie chart</b> — shows parts of a whole: here, the share of rows in each “${esc(D.cols[ci][0])}” group.`,
        scatter: '✓ <b>Scatter plot</b> — shows the relationship between two numbers. Do the dots rise together (+) or go opposite ways (−)?',
        hist: '✓ <b>Histogram</b> — shows how one number is spread out (its distribution).'
      };
      return t[d.dt.ch] || '';
    }
    function insightEx(D) {
      const C = D.cols[d.dt.col], v = D.rows.map(r => r[d.dt.col]), mx = Math.max(...v), row = D.rows[v.indexOf(mx)];
      return `${C[0]} was highest for ${row[0]} (${f1(mx)}${C[2] ? ' ' + C[2] : ''}), well above the mean of ${f1(stats(v).mean)}.`;
    }

    function reportView() {
      const ready = ok.slice(0, 8).map(f => f()), all = ready.every(Boolean), s = d.sdg ? sdgOf(d.sdg) : null;
      const D = dataset(), st = D ? stats(D.rows.map(r => r[d.dt.col])) : null;
      const nonLatin = hasNonLatin(JSON.stringify([d.w, d.prob, d.ps, d.ai, d.eth, d.dt.ins, d.map.el]));
      return `<p class="lab-intro">Check your project, then download a PDF report for your portfolio.</p>
        ${ctx.done && !d.pdf ? '<div class="banner">You finished this lab before. You can still edit and download a fresh report.</div>' : ''}
        <div class="lab-box"><h4>Checklist</h4><ul class="sdg-check">${STEPS.slice(0, 8).map(([sh, t], i) => `<li class="${ready[i] ? 'ok' : ''}"><span class="d">${ready[i] ? ic('check', 'sm') : i + 1}</span><span><b>${esc(t)}</b>${ready[i] ? '' : `<br><span class="small muted">${missing[i]}</span>`}</span>${ready[i] ? '' : `<button type="button" class="btn sm" data-go="${i}">Fix</button>`}</li>`).join('')}</ul></div>
        ${nonLatin ? '<div class="warn small"><b>Heads-up:</b> the PDF can only print English letters. Words in other scripts (or emoji) will be left out of the PDF, but they stay saved here.</div>' : ''}
        <div class="sdg-paper">
          <div class="sdg-paper-h"><span>AI KIDS LAB ACADEMY</span><span>SDG Project Report</span></div>
          ${s ? `<div class="row">${sdgChip()}</div>` : ''}
          <h3>${esc(d.ai.name || d.prob || 'My SDG project')}</h3>
          <p class="small muted">By ${esc(ctx.user.name || 'Learner')} · ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          ${statement() ? `<div class="key mt"><b>Problem statement</b>${esc(statement())}</div>` : ''}
          <div class="sdg-4w mt">${WS.map(([k, t]) => `<div><b>${t}</b><p class="small">${esc(d.w[k] || '—')}</p></div>`).join('')}</div>
          ${d.map.el.length ? `<h4 class="mt">System map</h4>${mapSvg(d.map.el, d.map.ln, narrow())}` : ''}
          ${D && d.dt.ch ? `<h4 class="mt">Data</h4><p class="small">${esc(D.t)} — ${esc(D.cols[d.dt.col][0])}: mean ${f1(st.mean)}, median ${f1(st.median)}, min ${f1(st.min)}, max ${f1(st.max)}.</p>${chartSvg(D, narrow() ? 420 : 560)}<p class="small mt"><b>Insight:</b> ${esc(d.dt.ins || '—')}</p>` : ''}
          ${d.ai.dom ? `<h4 class="mt">AI solution</h4><dl class="kv small"><dt>Domain</dt><dd>${DOMAINS[d.ai.dom][0]}</dd><dt>Approach</dt><dd>${d.ai.appr === 'rule' ? 'Rule-based' : d.ai.appr === 'learn' ? 'Learning-based' : '—'}</dd><dt>Evaluation</dt><dd>${d.ai.ev.map(k => EVALS[k]).join(', ') || '—'}</dd><dt>Deployment</dt><dd>${d.ai.dep.map(k => DEPLOY[k]).join(', ') || '—'}</dd></dl>` : ''}
        </div>
        <div class="row"><button type="button" class="btn primary big" id="pdfBtn" ${all ? '' : 'disabled'}>${ic('download')} Download PDF report</button>
          <span class="small muted" id="pdfMsg" aria-live="polite">${all ? (d.pdf ? 'You can download it again any time.' : 'Your report will be about 3 pages.') : 'Finish the checklist to unlock the PDF.'}</span></div>
        <div id="doneBox">${d.pdf || ctx.done ? doneBox() : ''}</div>`;
    }
    const doneBox = () => `<div class="lab-done">${ic('check')}<div>You completed a full <b>AI Project Cycle</b>: Problem Scoping (4Ws canvas, problem statement, system map) → Data Acquisition and Exploration → Modelling (${d.ai.appr === 'rule' ? 'rule-based' : 'learning-based'}) → Evaluation → Deployment, with an ethics check — all linked to an SDG.</div></div>`;

    /* --- PDF --- */
    async function makePdf() {
      if (busy) return; busy = true;
      const btn = root.querySelector('#pdfBtn'), msg = root.querySelector('#pdfMsg');
      btn.disabled = true; msg.textContent = 'Building your PDF…';
      try {
        const jsPDF = await ctx.pdf();
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const D = dataset();
        const [mapPng, chartPng] = await Promise.all([
          svgToPng(mapSvg(d.map.el, d.map.ln, false), 560, 400, false),
          svgToPng(chartSvg(D, 560), 560, 300)
        ]);
        buildPdf(doc, D, mapPng, chartPng);
        const name = safe(ctx.user.name || 'learner').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'learner';
        doc.save(`SDG-Project-${name}.pdf`);
        storeReport(D);
        const first = !d.pdf;
        d.pdf = Date.now(); save(true);
        msg.textContent = 'Downloaded! Check your Downloads folder.';
        ctx.sfx(first ? 'win' : 'ok');
        if (!ctx.done && !completedNow) {
          completedNow = true;
          ctx.complete(`Built and documented an AI project for SDG ${d.sdg} (${sdgOf(d.sdg)[1]}) and generated the PDF report.`);
        }
        root.querySelector('#doneBox').innerHTML = doneBox();
        updateTabs();
      } catch (e) {
        msg.textContent = 'Sorry — the PDF could not be made (' + (e.message || e) + '). Your work is saved; please try again.';
        ctx.sfx('bad');
      } finally { busy = false; btn.disabled = false; }
    }

    function storeReport(D) {
      const t = (s, n) => clean(s).slice(0, n), st = stats(D.rows.map(r => r[d.dt.col])), C = D.cols[d.dt.col];
      d.report = {
        sdg: d.sdg, sdgName: sdgOf(d.sdg)[1], title: t(d.ai.name || d.prob, 80), prob: t(d.prob, 200), ps: t(statement(), 700),
        w: Object.fromEntries(WS.map(([k]) => [k, t(d.w[k], 160)])),
        map: d.map.ln.map(([a, b, s]) => `${d.map.el[a]} -> ${d.map.el[b]} (${s})`).join('; ').slice(0, 300),
        data: `${D.t}: ${C[0]} mean ${f1(st.mean)}, median ${f1(st.median)}, min ${f1(st.min)}, max ${f1(st.max)}${C[2] ? ' ' + C[2] : ''}; ${CHARTS[d.dt.ch].toLowerCase()} chart.`.slice(0, 220),
        ins: t(d.dt.ins, 200), dom: DOMAINS[d.ai.dom][0], appr: d.ai.appr === 'rule' ? 'Rule-based' : 'Learning-based', how: t(d.ai.how, 200),
        ev: d.ai.ev.map(k => EVALS[k]).join(', '), dep: d.ai.dep.map(k => DEPLOY[k]).join(', '), at: new Date().toISOString().slice(0, 10)
      };
    }

    function buildPdf(doc, D, mapPng, chartPng) {
      const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 46, CW = W - 2 * M;
      const s = sdgOf(d.sdg), sc = hexRgb(s[2]), learner = safe(ctx.user.name || 'Learner');
      const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      let y = 0;
      const ink = () => doc.setTextColor(21, 23, 28), muted = () => doc.setTextColor(91, 96, 106);
      function header() {
        doc.setFillColor(21, 23, 28); doc.rect(0, 0, W, 42, 'F'); doc.setFillColor(255, 200, 0); doc.rect(0, 42, W, 4, 'F');
        doc.setDrawColor(255, 200, 0); doc.setLineWidth(2); doc.roundedRect(M, 11, 20, 20, 4, 4, 'S');
        doc.setFillColor(255, 200, 0); doc.roundedRect(M + 5.5, 16.5, 9, 9, 2, 2, 'F'); doc.setFillColor(21, 23, 28); doc.rect(M + 8.6, 19.6, 2.8, 2.8, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(255, 200, 0); doc.text('AI KIDS LAB ACADEMY', M + 30, 25, { charSpace: 1.2 });
        doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'normal'); doc.text('SDG Project Report  |  CBSE AI (417) Class IX', W - M, 25, { align: 'right' });
        y = 72;
      }
      const page = () => { doc.addPage(); header(); };
      const ensure = h => { if (y + h > H - 58) page(); };
      function para(text, { size = 10.5, style = 'normal', color = ink, x = M, w = CW, lh = size * 1.4, gap = 6 } = {}) {
        doc.setFont('helvetica', style); doc.setFontSize(size); color();
        doc.splitTextToSize(safe(text), w).forEach(l => { ensure(lh); doc.text(l, x, y, { baseline: 'top' }); y += lh; });
        y += gap;
      }
      let secN = 0;
      function section(title, need = 60) {
        ensure(need + 30); y += 6; secN++;
        doc.setFillColor(255, 200, 0); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.2); doc.roundedRect(M, y - 1, 20, 20, 4, 4, 'FD');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); ink(); doc.text(String(secN), M + 10, y + 4, { align: 'center', baseline: 'top' });
        doc.setFontSize(14); doc.text(safe(title), M + 30, y + 2, { baseline: 'top' });
        y += 30;
      }
      function box(text, fill, { size = 11, style = 'normal', label = '' } = {}) {
        doc.setFont('helvetica', style); doc.setFontSize(size);
        const lines = doc.splitTextToSize(safe(text), CW - 28), lh = size * 1.42, h = lines.length * lh + 24 + (label ? 16 : 0);
        ensure(h);
        doc.setFillColor(...fill); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.4); doc.roundedRect(M, y, CW, h, 8, 8, 'FD');
        let yy = y + 12;
        if (label) { doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(135, 98, 15); doc.text(label.toUpperCase(), M + 14, yy, { baseline: 'top', charSpace: 0.8 }); yy += 16; }
        doc.setFont('helvetica', style); doc.setFontSize(size); ink(); lines.forEach(l => { doc.text(l, M + 14, yy, { baseline: 'top' }); yy += lh; });
        y += h + 10;
      }
      function kvTable(rows, kw = 130) {
        rows.forEach(([k, v], i) => {
          doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
          const lines = doc.splitTextToSize(safe(v || '-'), CW - kw - 20), kl = doc.splitTextToSize(safe(k), kw - 16), h = Math.max(lines.length, kl.length) * 14 + 12;
          ensure(h);
          doc.setFillColor(...(i % 2 ? [255, 255, 255] : [255, 249, 236])); doc.setDrawColor(230, 223, 207); doc.setLineWidth(0.8); doc.rect(M, y, CW, h, 'FD');
          doc.setFont('helvetica', 'bold'); ink(); kl.forEach((l, j) => doc.text(l, M + 8, y + 7 + j * 14, { baseline: 'top' }));
          doc.setFont('helvetica', 'normal'); lines.forEach((l, j) => doc.text(l, M + kw, y + 7 + j * 14, { baseline: 'top' }));
          y += h;
        });
        y += 12;
      }

      // Page 1: title
      header();
      doc.setFillColor(...sc); doc.roundedRect(M, y, 64, 64, 8, 8, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(30); doc.setTextColor(...(s[0] === 7 ? [21, 23, 28] : [255, 255, 255])); doc.text(String(s[0]), M + 32, y + 42, { align: 'center' });
      doc.setFontSize(8.5); doc.setTextColor(135, 98, 15); doc.text('SUSTAINABLE DEVELOPMENT GOAL ' + s[0], M + 80, y + 4, { baseline: 'top', charSpace: 0.8 });
      doc.setFontSize(13); ink(); doc.text(safe(s[1]), M + 80, y + 18, { baseline: 'top' });
      doc.setFontSize(9.5); doc.setFont('helvetica', 'normal'); muted(); doc.text(`By ${learner}  |  ${dateStr}`, M + 80, y + 40, { baseline: 'top' });
      y += 82;
      para(d.ai.name || 'My SDG project', { size: 22, style: 'bold', lh: 26, gap: 4 });
      para(d.prob, { size: 11, color: muted, gap: 8 });
      doc.setDrawColor(255, 200, 0); doc.setLineWidth(3); doc.line(M, y, M + 60, y); y += 14;

      section('Problem statement', 70);
      box(statement(), [255, 241, 194], { size: 11.5, style: 'bold', label: 'Our problem statement' });

      section('4Ws problem canvas', 160);
      const gw = (CW - 12) / 2;
      for (let r = 0; r < 2; r++) {
        const pair = WS.slice(r * 2, r * 2 + 2).map(([k, t, q]) => {
          doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
          const lines = doc.splitTextToSize(safe(d.w[k]), gw - 22); doc.setFontSize(8);
          const ql = doc.splitTextToSize(safe(q), gw - 22);
          return { t, lines, ql };
        });
        const h = Math.max(...pair.map(p => p.lines.length * 13.5 + p.ql.length * 10.5)) + 44;
        ensure(h);
        pair.forEach((p, i) => {
          const x = M + i * (gw + 12);
          doc.setFillColor(...[[228, 236, 255], [217, 245, 232], [255, 229, 226], [238, 231, 255]][r * 2 + i]); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.2);
          doc.roundedRect(x, y, gw, h, 8, 8, 'FD');
          doc.setFont('helvetica', 'bold'); doc.setFontSize(13); ink(); doc.text(p.t + '?', x + 11, y + 10, { baseline: 'top' });
          doc.setFont('helvetica', 'italic'); doc.setFontSize(8); muted(); p.ql.forEach((l, j) => doc.text(l, x + 11, y + 28 + j * 10.5, { baseline: 'top' }));
          doc.setFont('helvetica', 'normal'); doc.setFontSize(10); ink();
          const y0 = y + 32 + p.ql.length * 10.5; p.lines.forEach((l, j) => doc.text(l, x + 11, y0 + j * 13.5, { baseline: 'top' }));
        });
        y += h + 12;
      }

      section('System map', 230);
      const mw = 300, mh = mw * 400 / 560, top = y;
      doc.setDrawColor(21, 23, 28); doc.setLineWidth(1.2); doc.roundedRect(M, y, mw, mh, 6, 6, 'S');
      doc.addImage(mapPng, 'JPEG', M + 2, y + 2, mw - 4, mh - 4);
      const tx = M + mw + 16, tw = CW - mw - 16;
      para('Key: "+" = both change in the same direction; "-" = they change in opposite directions.', { size: 8.5, style: 'italic', color: muted, gap: 6, x: tx, w: tw, lh: 11 });
      d.map.ln.forEach(([a, b, sg]) => para(`When "${d.map.el[a]}" goes up, "${d.map.el[b]}" goes ${sg === '+' ? 'up (+)' : 'down (-)'}.`, { size: 9, gap: 4, x: tx, w: tw, lh: 11.5 }));
      y = Math.max(y, top + mh) + 14;

      // Data
      const C = D.cols[d.dt.col], st = stats(D.rows.map(r => r[d.dt.col]));
      section('Data exploration', 330);
      para(`${D.t}. Practice dataset, ${D.rows.length} rows. Columns: ${D.cols.map(c => c[0]).join(', ')}.`, { size: 10, color: muted });
      const cells = [['Column', C[0] + (C[2] ? ` (${C[2]})` : '')], ['Mean', f1(st.mean)], ['Median', f1(st.median)], ['Minimum', f1(st.min)], ['Maximum', f1(st.max)]];
      ensure(48);
      const cw0 = 155, cwi = (CW - cw0) / 4;
      cells.forEach(([k, v], i) => {
        const x = i ? M + cw0 + (i - 1) * cwi : M, w = i ? cwi : cw0;
        doc.setFillColor(21, 23, 28); doc.setDrawColor(21, 23, 28); doc.setLineWidth(1); doc.rect(x, y, w, 18, 'FD');
        doc.setFillColor(255, 255, 255); doc.rect(x, y + 18, w, 24, 'FD');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(255, 255, 255); doc.text(k, x + 7, y + 5, { baseline: 'top' });
        doc.setFontSize(i ? 13 : 9.5); ink(); doc.text(doc.splitTextToSize(safe(v), w - 12)[0], x + 7, y + (i ? 23 : 26), { baseline: 'top' });
      });
      y += 54;
      const chw = 420, chh = chw * 300 / 560;
      ensure(chh + 10);
      doc.addImage(chartPng, 'JPEG', M + (CW - chw) / 2, y, chw, chh); y += chh + 6;
      para(`Chart type: ${CHARTS[d.dt.ch]} chart.`, { size: 9, style: 'italic', color: muted, gap: 6 });
      box(d.dt.ins, [217, 245, 232], { size: 11, label: 'Our insight' });

      // AI solution
      section('Our AI solution', 140);
      kvTable([
        ['Name', d.ai.name || '-'], ['What it does', d.ai.how], ['AI domain', `${DOMAINS[d.ai.dom][0]} - ${DOMAINS[d.ai.dom][1]}`],
        ['Data needed', d.ai.need], ['Approach', `${d.ai.appr === 'rule' ? 'Rule-based' : 'Learning-based'}${d.ai.why ? ': ' + d.ai.why : ''}`],
        ['Evaluation', d.ai.ev.map(k => EVALS[k]).join(', ') + (d.ai.evn ? '. ' + d.ai.evn : '')],
        ['Deployment', d.ai.dep.map(k => DEPLOY[k]).join(', ') + (d.ai.depn ? '. ' + d.ai.depn : '')]
      ]);

      section('Ethics checklist', 140);
      kvTable(ETHICS.map(([k, t]) => [t, d.eth[k]]));

      ensure(110);
      y += 6;
      box('Problem Scoping (4Ws, problem statement, system map) -> Data Acquisition -> Data Exploration -> Modelling -> Evaluation -> Deployment', [255, 249, 236], { size: 10, label: 'AI Project Cycle followed' });
      ensure(50); y += 18;
      doc.setDrawColor(21, 23, 28); doc.setLineWidth(0.8); doc.line(M, y, M + 200, y); doc.line(W - M - 200, y, W - M, y);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9); muted(); doc.text('Learner: ' + learner, M, y + 6, { baseline: 'top' }); doc.text('Teacher', W - M - 200, y + 6, { baseline: 'top' });

      const n = doc.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        doc.setPage(i);
        doc.setDrawColor(230, 223, 207); doc.setLineWidth(1); doc.line(M, H - 40, W - M, H - 40);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); muted();
        doc.text(`${learner}  |  SDG ${s[0]}: ${safe(s[1])}  |  ${dateStr}`, M, H - 28);
        doc.text(`Page ${i} of ${n}`, W - M, H - 28, { align: 'right' });
      }
    }

    /* --- shell --- */
    root.innerHTML = `
      <style>
        .lab-sdg .sdg-top{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between}
        .lab-sdg .sdg-tabs{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:6px}
        .lab-sdg .sdg-tab{min-height:48px;border:2px solid var(--ink);border-radius:10px;background:#fff;font-weight:800;display:grid;place-items:center;align-content:center;padding:4px 2px;font-size:.72rem;line-height:1.1;text-align:center;gap:1px}
        .lab-sdg .sdg-tab .n{font-family:var(--head);font-size:1.05rem;display:flex;align-items:center;gap:2px}
        .lab-sdg .sdg-tab .n .ic{width:13px;height:13px;stroke-width:3;color:var(--good)}
        .lab-sdg .sdg-tab.ok{background:var(--good-wash);border-color:var(--good)}
        .lab-sdg .sdg-tab[aria-current="step"]{background:var(--gold);border-color:var(--ink);box-shadow:var(--sh-sm)}
        @media(max-width:760px){.lab-sdg .sdg-tab .l{display:none}.lab-sdg .sdg-tab{min-height:44px}}
        @media(max-width:520px){.lab-sdg .sdg-tabs{grid-template-columns:repeat(5,minmax(0,1fr))}}
        .lab-sdg .sdg-body{display:grid;gap:14px;min-width:0}
        .lab-sdg .sdg-body h3{margin:0}
        .lab-sdg .sdg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
        .lab-sdg .sdg-card{display:flex;gap:10px;align-items:center;text-align:left;border:2px solid var(--ink);border-radius:12px;padding:10px;font-weight:800;font-size:.9rem;min-height:64px;line-height:1.2;box-shadow:var(--sh-sm)}
        .lab-sdg .sdg-card .n{font-family:var(--head);font-size:1.7rem;min-width:30px;text-align:center}
        .lab-sdg .sdg-card[aria-pressed="true"]{outline:4px solid var(--ink);outline-offset:2px;transform:translate(-1px,-1px)}
        .lab-sdg .sdg-card[aria-pressed="true"]::after{content:"✓";margin-left:auto;background:#fff;color:var(--ink);border-radius:50%;width:24px;height:24px;display:grid;place-items:center;flex-shrink:0}
        @media(max-width:420px){.lab-sdg .sdg-grid{grid-template-columns:1fr 1fr}.lab-sdg .sdg-card{font-size:.82rem;padding:8px;gap:6px}.lab-sdg .sdg-card .n{font-size:1.35rem;min-width:22px}}
        .lab-sdg .sdg-chip{display:inline-block;font-weight:800;font-size:.8rem;padding:3px 10px;border-radius:999px;border:2px solid var(--ink);margin-right:6px}
        .lab-sdg .sdg-lim{justify-self:end}
        .lab-sdg .sdg-lim.over{color:var(--bad);font-weight:800}
        .lab-sdg .sdg-w{font-family:var(--head);font-size:1.25rem}
        .lab-sdg .key span#psOut{font-family:var(--head);font-weight:700;font-size:1.12rem;line-height:1.35;display:block}
        .lab-sdg .sdg-el{padding-right:4px;white-space:normal;max-width:100%;overflow-wrap:anywhere}
        .lab-sdg .sdg-x{border:0;background:none;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;margin:-4px -2px -4px 0}
        .lab-sdg .sdg-x:hover{background:rgba(0,0,0,.1)}
        .lab-sdg .sdg-link{display:grid;gap:10px}
        .lab-sdg .sdg-links{list-style:none;display:grid;gap:8px;margin-top:10px}
        .lab-sdg .sdg-links li{display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between;align-items:center;background:#fff;border:2px solid var(--line);border-radius:10px;padding:6px 8px;font-size:.9rem}
        .lab-sdg .sdg-plus{color:var(--good)} .lab-sdg .sdg-minus{color:var(--bad)}
        .lab-sdg #mapOut svg,.lab-sdg .sdg-paper svg[role=img]:not(.svgchart){width:100%;max-width:640px;height:auto;display:block;margin:0 auto;border:2px solid var(--ink);border-radius:12px;background:#fff}
        .lab-sdg .sdg-sheet{max-height:340px;overflow:auto;border:2px solid var(--ink);border-radius:10px}
        .lab-sdg .sdg-sheet .tbl{font-size:.85rem}
        .lab-sdg .sdg-sheet th{position:sticky;top:0;z-index:1;line-height:1.2}
        .lab-sdg .sdg-sheet .tbl th,.lab-sdg .sdg-sheet .tbl td{border-width:1px;padding:5px 8px;white-space:nowrap}
        .lab-sdg .sdg-sheet td.sdg-rn,.lab-sdg .sdg-sheet th.sdg-rn{background:var(--paper-2);color:var(--muted);text-align:center}
        .lab-sdg .sdg-sheet th.sdg-rn{background:#3a3f4b;color:#fff}
        .lab-sdg .sdg-sheet td.sdg-hl{background:var(--gold-wash);font-weight:800}
        .lab-sdg .sdg-sheet th.sdg-hl{background:var(--gold-deep);color:var(--ink)}
        .lab-sdg .stats .v{font-size:1.35rem}
        .lab-sdg .svgchart{max-width:640px;margin-inline:auto}
        .lab-sdg .sdg-dom .opt{align-items:center}
        .lab-sdg .sdg-check{list-style:none;display:grid;gap:6px}
        .lab-sdg .sdg-check li{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:10px;align-items:center;background:#fff;border:2px solid var(--line);border-radius:10px;padding:6px 10px}
        .lab-sdg .sdg-check li.ok{border-color:var(--good);background:var(--good-wash)}
        .lab-sdg .sdg-check .d{width:26px;height:26px;border-radius:8px;border:2px solid var(--ink);display:grid;place-items:center;font-weight:800;font-size:.85rem;background:#fff}
        .lab-sdg .sdg-check li.ok .d{background:var(--good);border-color:var(--good);color:#fff}
        .lab-sdg .sdg-paper{background:#fff;border:2px solid var(--ink);border-radius:12px;padding:16px;display:grid;gap:6px;box-shadow:var(--sh-sm)}
        .lab-sdg .sdg-paper-h{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;background:var(--ink);color:#fff;margin:-16px -16px 8px;padding:10px 16px;border-radius:10px 10px 0 0;border-bottom:4px solid var(--gold);font-weight:800;font-size:.75rem;letter-spacing:.1em}
        .lab-sdg .sdg-paper-h span:first-child{color:var(--gold)}
        .lab-sdg .sdg-4w{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .lab-sdg .sdg-4w>div{border:2px solid var(--ink);border-radius:10px;padding:8px 10px;background:var(--blue-wash);min-width:0;overflow-wrap:anywhere}
        .lab-sdg .sdg-4w>div:nth-child(2){background:var(--green-wash)} .lab-sdg .sdg-4w>div:nth-child(3){background:var(--coral-wash)} .lab-sdg .sdg-4w>div:nth-child(4){background:var(--violet-wash)}
        @media(max-width:520px){.lab-sdg .sdg-4w{grid-template-columns:1fr}}
        .lab-sdg .kv dd{overflow-wrap:anywhere}
        .lab-sdg .sdg-nav{display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap;border-top:2px solid var(--line);padding-top:14px}
        .lab-sdg .key,.lab-sdg .panel,.lab-sdg .lab-box{overflow-wrap:anywhere;min-width:0}
      </style>
      <div class="sdg-top"><div><div class="kicker">SDG Data Project</div><b id="sdgTitle"></b></div><span class="tiny muted" id="sdgSaved">Saved ✓</span></div>
      <div class="meter" aria-hidden="true"><i id="sdgMeter"></i></div>
      <nav class="sdg-tabs" aria-label="Project steps" id="sdgTabs"></nav>
      <div class="sdg-body" id="sdgBody"></div>
      <div class="sdg-nav"><button type="button" class="btn" id="sdgBack">${ic('back')} Back</button><span class="small muted" id="sdgPos"></span><button type="button" class="btn primary" id="sdgNext">Next ${ic('arrow')}</button></div>`;

    const body = root.querySelector('#sdgBody');

    function updateTabs() {
      const done = ok.map(f => f());
      morph(root.querySelector('#sdgTabs'), STEPS.map(([sh, t], i) => `<button type="button" class="sdg-tab${done[i] ? ' ok' : ''}" data-go="${i}" ${i === d.step ? 'aria-current="step"' : ''} aria-label="Step ${i + 1}: ${esc(t)}${done[i] ? ' (done)' : ''}"><span class="n">${i + 1}${done[i] ? ic('check') : ''}</span><span class="l">${sh}</span></button>`).join(''));
      root.querySelector('#sdgMeter').style.width = Math.round(done.filter(Boolean).length / STEPS.length * 100) + '%';
    }

    function go(i, focus = true) {
      d.step = Math.max(0, Math.min(STEPS.length - 1, i));
      save(true);
      render(focus);
    }

    function render(focus) {
      fid = 0;
      root.querySelector('#sdgTitle').textContent = `Step ${d.step + 1}: ${STEPS[d.step][1]}`;
      body.innerHTML = VIEWS[d.step]();
      root.querySelector('#sdgPos').textContent = `${d.step + 1} of ${STEPS.length}`;
      root.querySelector('#sdgBack').disabled = d.step === 0;
      const nx = root.querySelector('#sdgNext');
      nx.hidden = d.step === STEPS.length - 1;
      updateTabs();
      if (focus) { root.querySelector('#sdgTitle').scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
    }

    /* --- events (delegated) --- */
    function onInput(e) {
      const t = e.target, k = t.dataset && t.dataset.k;
      if (!k) return;
      const max = +t.dataset.max || LIM.m;
      let v = t.value;
      const lim = body.querySelector(`[data-lim="${k}"]`);
      if (v.length > max) {
        v = v.slice(0, max); t.value = v;
        if (lim) { lim.textContent = `${max} / ${max} — kept the first ${max} characters`; lim.classList.add('over'); }
      } else if (lim) { lim.textContent = `${v.length} / ${max}`; lim.classList.remove('over'); }
      if (k.startsWith('ps.e.')) d.ps.e[k.slice(5)] = v; else set(k, v);
      if (k === 'prob') {
        d.pi = PROBLEMS[d.sdg] ? PROBLEMS[d.sdg].indexOf(v) : -1;
        body.querySelectorAll('[data-prob]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.prob === d.pi)));
      }
      if (k.startsWith('ps.')) { const o = body.querySelector('#psOut'); if (o) o.textContent = statement(); syncSeg('hv', hv()); }
      if (k.startsWith('eth.')) { const c = body.querySelector(`[data-ethchip="${k.slice(4)}"]`); if (c) { const y = L(v, 8); c.className = 'chip ' + (y ? 'ok' : 'dim'); c.textContent = y ? '✓ done' : 'to do'; } }
      save();
      updateTabsSoon();
    }
    let tabT = 0;
    const updateTabsSoon = () => { clearTimeout(tabT); tabT = setTimeout(updateTabs, 250); };
    const syncSeg = (name, v) => body.querySelectorAll(`[data-seg="${name}"]`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));

    function addElement(name) {
      name = clean(name).slice(0, 40);
      if (!name || d.map.el.length >= 6) return;
      if (d.map.el.some(e => e.toLowerCase() === name.toLowerCase())) { ctx.toast('That element is already on your map.'); return; }
      d.map.el.push(name); ctx.sfx('pop'); save(); render(false);
      const inp = body.querySelector('#elNew'); if (inp && document.activeElement === document.body) inp.focus();
    }

    function onClick(e) {
      const b = e.target.closest('button'); if (!b || !root.contains(b)) return;
      const ds2 = b.dataset;
      if (ds2.go != null) { go(+ds2.go); return; }
      if (b.id === 'sdgNext') { go(d.step + 1); ctx.sfx('tick'); return; }
      if (b.id === 'sdgBack') { go(d.step - 1); return; }
      if (ds2.sdg) {
        const n = +ds2.sdg;
        if (d.sdg !== n) {
          d.sdg = n; d.pi = -1;
          d.dt.ch = d.dt.ch || ''; d.dt.col = -1; d.dt.x = -1;
        }
        ctx.sfx('pop'); save(); render(false);
        const p = body.querySelector(`[data-sdg="${n}"]`); if (p) p.focus();
        return;
      }
      if (ds2.prob != null) {
        d.pi = +ds2.prob; d.prob = PROBLEMS[d.sdg][d.pi]; save(); render(false); ctx.sfx('tick');
        const ta = body.querySelector('[data-k="prob"]'); if (ta) ta.focus();
        return;
      }
      if (ds2.seg) {
        const v = ds2.v;
        if (ds2.seg === 'hv') d.ps.hv = v;
        else if (ds2.seg === 'ww') d.ps.ww = v;
        else if (ds2.seg === 'sign') d.map.sg = v;
        else if (ds2.seg === 'appr') d.ai.appr = v;
        else if (ds2.seg === 'ch') { d.dt.ch = v; save(); render(false); const c = body.querySelector(`[data-seg="ch"][data-v="${v}"]`); if (c) c.focus(); return; }
        syncSeg(ds2.seg, v);
        const o = body.querySelector('#psOut'); if (o) o.textContent = statement();
        save(); updateTabs(); return;
      }
      if (ds2.tog) {
        const arr = d.ai[ds2.tog], i = arr.indexOf(ds2.v);
        if (i >= 0) arr.splice(i, 1); else arr.push(ds2.v);
        b.setAttribute('aria-pressed', String(i < 0)); save(); updateTabs(); return;
      }
      if (ds2.dom) { d.ai.dom = ds2.dom; body.querySelectorAll('[data-dom]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); save(); updateTabs(); return; }
      if (ds2.src) {
        const cur = clean(d.ai.need || '');
        if (cur.toLowerCase().includes(ds2.src.toLowerCase())) return;
        const v = (cur ? cur + ', ' : 'Collected from: ') + ds2.src.toLowerCase();
        if (v.length > LIM.l) { ctx.toast('That box is full.'); return; }
        d.ai.need = v; const ta = body.querySelector('[data-k="ai.need"]'); if (ta) { ta.value = v; ta.dispatchEvent(new Event('input', { bubbles: true })); }
        return;
      }
      if (ds2.addel) { addElement(ds2.addel); return; }
      if (b.id === 'elAdd') { addElement(body.querySelector('#elNew').value); return; }
      if (ds2.rmel != null) {
        const i = +ds2.rmel;
        d.map.el.splice(i, 1);
        d.map.ln = d.map.ln.filter(l => l[0] !== i && l[1] !== i).map(([a, c, s]) => [a > i ? a - 1 : a, c > i ? c - 1 : c, s]);
        save(); render(false); return;
      }
      if (b.id === 'lnAdd') {
        const a = +body.querySelector('#lnA').value, c = +body.querySelector('#lnB').value, s = d.map.sg || '+', err = body.querySelector('#lnErr');
        if (a === c) { err.textContent = 'Choose two different elements.'; ctx.sfx('bad'); return; }
        if (d.map.ln.some(l => l[0] === a && l[1] === c)) { err.textContent = 'That link already exists — use Switch to change its sign.'; ctx.sfx('bad'); return; }
        if (d.map.ln.length >= 10) { err.textContent = 'Maximum 10 links — keep the map readable.'; return; }
        d.map.ln.push([a, c, s]); ctx.sfx('ok'); save(); render(false); return;
      }
      if (ds2.flip != null) { const l = d.map.ln[+ds2.flip]; l[2] = l[2] === '+' ? '-' : '+'; save(); render(false); return; }
      if (ds2.rmln != null) { d.map.ln.splice(+ds2.rmln, 1); save(); render(false); return; }
      if (b.id === 'psRefill') { d.ps.e = {}; d.ps.hv = ''; save(); render(false); ctx.toast('Blanks refilled from your 4Ws.'); return; }
      if (b.id === 'pdfBtn') { makePdf(); }
    }
    function onChange(e) {
      const t = e.target;
      if (t.id === 'dtCol') { d.dt.col = +t.value; save(); render(false); body.querySelector('#dtCol').focus(); }
      if (t.id === 'dtX') { d.dt.x = +t.value; save(); render(false); body.querySelector('#dtX').focus(); }
    }
    function onKey(e) {
      if (e.target.id === 'elNew' && e.key === 'Enter') { e.preventDefault(); addElement(e.target.value); }
    }
    function onBlur() { save(true); }

    root.addEventListener('input', onInput);
    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);
    root.addEventListener('keydown', onKey);
    root.addEventListener('focusout', onBlur);

    let lastNarrow = narrow(), rzT = 0;
    const onResize = () => { clearTimeout(rzT); rzT = setTimeout(() => { if (narrow() !== lastNarrow && [4, 5, 8].includes(d.step) && !root.contains(document.activeElement)) { lastNarrow = narrow(); render(false); } }, 200); };
    window.addEventListener('resize', onResize);

    render(false);

    return () => {
      clearTimeout(rzT); clearTimeout(tabT);
      if (saveT) { clearTimeout(saveT); fitSize(); ctx.save(); }
      window.removeEventListener('resize', onResize);
      root.removeEventListener('input', onInput); root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange); root.removeEventListener('keydown', onKey); root.removeEventListener('focusout', onBlur);
    };
  }
};
