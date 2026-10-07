import { ic, esc } from '../core/util.js';

// ---------- helpers (exported for tests) ----------
export function median(a) { const s = [...a].sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
export function avg(rows) { const v = rows.map(r => r.h).filter(h => h !== null); return v.length ? { mean: v.reduce((a, b) => a + b, 0) / v.length, n: v.length } : { mean: NaN, n: 0 }; }
export const f1 = x => (Math.round(x * 10 + 1e-9) / 10).toFixed(1);
const fmtH = h => h === null ? '' : Number.isInteger(h) ? String(h) : String(+h.toFixed(2));
const CITY_FIX = { delhi: 'Delhi', del: 'Delhi', 'new delhi': 'Delhi' };

export function makeData(rng) {
  const names = rng.sample(['Aarav', 'Diya', 'Kabir', 'Meera', 'Rohan', 'Ananya', 'Ishaan', 'Saanvi', 'Vihaan', 'Priya', 'Arjun', 'Zoya', 'Neha', 'Kunal', 'Tara', 'Dev', 'Farhan', 'Ira'], 11);
  const others = ['Mumbai', 'Chennai', 'Kolkata', 'Jaipur'];
  const studs = names.map((name, i) => ({ name, city: i < 3 ? ['Delhi', 'delhi', 'DEL'][i] : rng.pick(others), h: rng.int(140, 172) }));
  const order = rng.shuffle(studs.map((_, i) => i));
  // distinct students for each problem: metres, outlier, 2 missing, duplicate source
  const [im, io, ia, ib, idup] = order;
  const truth = studs.map(s => ({ ...s, city: CITY_FIX[s.city.toLowerCase()] || s.city }));
  studs[im].h = studs[im].h / 100;
  studs[io].h = studs[io].h * 10;
  studs[ia].h = null; studs[ib].h = null;
  const rows = studs.map((s, i) => ({ ...s, key: i }));
  const dupAt = Math.min(rows.length, rows.findIndex(r => r.key === idup) + rng.int(2, 5));
  rows.splice(dupAt, 0, { ...rows.find(r => r.key === idup), key: 'd' });
  return { rows, truth, im, io, ia, ib, idup };
}

export const TOOLS = {
  dup: { name: 'Remove duplicates', icon: 'table', prob: 'The same row appears twice.',
    affects: rows => rows.filter((r, i) => rows.findIndex(q => q.name === r.name && q.city === r.city && q.h === r.h) < i).length,
    apply: rows => rows.filter((r, i) => rows.findIndex(q => q.name === r.name && q.city === r.city && q.h === r.h) === i) },
  unit: { name: 'Convert metres → cm', icon: 'refresh', prob: 'One height is in metres, the rest are in centimetres.',
    affects: rows => rows.filter(r => r.h !== null && r.h < 3).length,
    apply: rows => rows.map(r => r.h !== null && r.h < 3 ? { ...r, h: Math.round(r.h * 100), hFix: 'unit' } : r) },
  out: { name: 'Fix the outlier', icon: 'alert', prob: 'One height is impossible — a typing slip with an extra 0.',
    affects: rows => rows.filter(r => r.h !== null && r.h > 250).length,
    apply: rows => rows.map(r => r.h !== null && r.h > 250 ? { ...r, h: r.h / 10, hFix: 'out' } : r) },
  city: { name: 'Standardise city names', icon: 'pen', prob: 'Delhi is written in 3 different ways.',
    affects: rows => rows.filter(r => CITY_FIX[r.city.toLowerCase()] && CITY_FIX[r.city.toLowerCase()] !== r.city).length,
    apply: rows => rows.map(r => { const c = CITY_FIX[r.city.toLowerCase()]; return c && c !== r.city ? { ...r, city: c, cityFixed: true } : r; }) },
  fill: { name: 'Fill missing with median', icon: 'sigma', prob: 'Two heights are missing.',
    affects: rows => rows.filter(r => r.h === null).length,
    apply: rows => { const m = median(rows.filter(r => r.h !== null).map(r => r.h)); return rows.map(r => r.h === null ? { ...r, h: m, hFix: 'fill' } : r); } }
};
const ORDER = ['dup', 'unit', 'out', 'city', 'fill'];

export default {
  title: 'Data Cleaner: fix the messy class table',
  mount(ctx) {
    const D = makeData(ctx.rng);
    let rows, used, flash = new Set(), log = [], fired = false;
    const dirty = avg(D.rows);
    function reset() { rows = D.rows.map(r => ({ ...r })); used = {}; log = []; flash = new Set(); }
    reset();

    ctx.el.innerHTML = `
      <style>
        .lab-clean{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-clean .tbl th,.lab-clean .tbl td{padding:6px 8px;}
        @media (max-width:420px){ .lab-clean .tbl{font-size:.86rem;} .lab-clean .tbl th,.lab-clean .tbl td{padding:5px 6px;} }
        .lab-clean .tbl td.bad{background:var(--bad-wash); font-weight:800;}
        .lab-clean .tbl td.fix{background:var(--good-wash); font-weight:800;}
        .lab-clean .tbl tr.dupe td{background:var(--gold-wash);}
        .lab-clean .tbl td .why{display:block; font-size:.7rem; font-weight:800; color:#A3262B; text-transform:uppercase; letter-spacing:.04em;}
        .lab-clean .tbl td.fix .why{color:#0B6B47;}
        .lab-clean .tbl tr.flash td{animation:clFlash 1s;}
        @keyframes clFlash{from{background:var(--gold);}}
        .lab-clean .tools{display:grid; gap:8px;}
        .lab-clean .tool{display:grid; grid-template-columns:auto 1fr; gap:4px 10px; align-items:center; text-align:left; width:100%; background:#fff; border:var(--b2); border-radius:12px; padding:9px 12px; box-shadow:var(--sh-sm); font-weight:800;}
        .lab-clean .tool .p{grid-column:2; font-size:.8rem; color:var(--muted); font-weight:700;}
        .lab-clean .tool.done{background:var(--good-wash); border-color:var(--good); box-shadow:none;}
        .lab-clean .tool:disabled{cursor:default; opacity:1;}
        .lab-clean .tool.locked{opacity:.6;}
        .lab-clean .big{font-family:var(--head); font-weight:800; font-size:2rem; line-height:1;}
      </style>
      <div class="lab-clean stack">
        <p class="lab-intro">Class 9B measured everyone's height for a science project — but the spreadsheet is a mess. Use the cleaning tools and watch how much the <b>average height</b> changes.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> fix all 5 problems so the table is clean. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-grid">
          <div class="lab-box"><div class="row between"><h4 style="margin:0">Class height data</h4><span class="chip dim" id="clRows"></span></div>
            <div class="tblwrap mt"><table class="tbl" id="clTbl"></table></div>
            <p class="tiny muted mt">Red = problem cell · Green = fixed cell · Yellow row = duplicate.</p></div>
          <div class="stack">
            <div class="lab-box"><h4>Average height</h4><div aria-live="polite" id="clAvg"></div><div id="clPlot" class="mt"></div></div>
            <div class="lab-box"><h4>Cleaning tools</h4><div class="tools" id="clTools"></div>
              <button class="btn sm ghost mt" id="clReset">${ic('refresh')} Start again with the messy table</button></div>
          </div>
        </div>
        <div class="lab-box"><h4>Cleaning log</h4><ol id="clLog" class="small" style="padding-left:20px; display:grid; gap:4px"></ol><div id="clCity" class="mt"></div></div>
        <div id="clEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function cellState(r, i) {
      const isDup = rows.findIndex(q => q.name === r.name && q.city === r.city && q.h === r.h) < i;
      const hBad = r.h === null ? 'missing' : r.h < 3 ? 'metres' : r.h > 250 ? 'typo' : '';
      const cBad = CITY_FIX[r.city.toLowerCase()] && CITY_FIX[r.city.toLowerCase()] !== r.city ? 'spelling' : '';
      return { isDup, hBad, cBad };
    }

    function drawTable() {
      $('#clRows').textContent = `${rows.length} rows`;
      $('#clTbl').innerHTML = `<thead><tr><th>#</th><th>Student</th><th>City</th><th>Height (cm)</th></tr></thead><tbody>${rows.map((r, i) => {
        const s = cellState(r, i), fx = r.hFix;
        const hc = s.hBad ? 'bad' : fx ? 'fix' : '';
        const cc = s.cBad ? 'bad' : r.cityFixed ? 'fix' : '';
        const hWhy = s.hBad || (fx === 'unit' ? 'was metres' : fx === 'out' ? 'was typo' : fx === 'fill' ? 'median' : '');
        return `<tr class="${s.isDup ? 'dupe' : ''} ${flash.has(r.key) ? 'flash' : ''}"><td>${i + 1}</td><td>${esc(r.name)}${s.isDup ? '<span class="why" style="color:var(--gold-ink)">duplicate</span>' : ''}</td>
          <td class="${cc}">${esc(r.city)}${s.cBad ? '<span class="why">spelling</span>' : ''}</td>
          <td class="${hc}">${r.h === null ? '<span class="sr">blank</span>' : fmtH(r.h)}${hWhy ? `<span class="why">${hWhy}</span>` : ''}</td></tr>`;
      }).join('')}</tbody>`;
    }

    function drawAvg() {
      const a = avg(rows), clean = ORDER.every(k => used[k]);
      $('#clAvg').innerHTML = `<div class="row" style="align-items:baseline"><span class="big">${a.n ? f1(a.mean) : '—'}</span><b>cm</b></div>
        <p class="small muted">Mean of the ${a.n} heights that are filled in (blank cells are skipped).${!clean && log.length ? ` The messy table started at <b>${f1(dirty.mean)} cm</b>.` : ''}</p>
        ${clean ? `<div class="fb good mt"><div><b>Clean average: ${f1(a.mean)} cm.</b> The messy data said ${f1(dirty.mean)} cm — wrong by ${f1(Math.abs(dirty.mean - a.mean))} cm!</div></div>` : ''}`;
      // dot strip: heights on one axis
      const hs = rows.map(r => r.h).filter(h => h !== null), mx = Math.max(200, ...hs), top = mx > 1000 ? 2000 : mx > 250 ? 500 : 200;
      const X = v => 18 + v / top * 324;
      let g = `<line x1="18" y1="40" x2="342" y2="40" stroke="#15171C" stroke-width="2"/>`;
      for (let k = 0; k <= 4; k++) { const v = top / 4 * k; g += `<line x1="${X(v)}" y1="40" x2="${X(v)}" y2="46" stroke="#15171C"/><text x="${X(v)}" y="60" text-anchor="middle" style="font-size:12px">${v}</text>`; }
      hs.forEach(h => { g += `<circle cx="${X(h)}" cy="30" r="6" fill="${h < 3 || h > 250 ? '#E8453C' : '#2F6FED'}" fill-opacity=".75" stroke="#15171C" stroke-width="1.5"/>`; });
      if (a.n) g += `<path d="M${X(a.mean)} 8 l-6 -7 h12 z" transform="translate(0 6)" fill="#FFC800" stroke="#15171C" stroke-width="1.5"/>`;
      $('#clPlot').innerHTML = `<svg class="svgchart" viewBox="0 0 360 70" role="img" aria-label="Heights on a number line from 0 to ${top} cm; the gold marker shows the average">${g}</svg><p class="tiny muted mt">Each dot is a height (cm); red dots are wrong values. Gold marker = average.</p>`;
    }

    function drawTools() {
      const pre = used.dup && used.unit && used.out;
      $('#clTools').innerHTML = ORDER.map(k => {
        const t = TOOLS[k], n = t.affects(rows), done = used[k], locked = k === 'fill' && !pre && !done;
        return `<button class="tool ${done ? 'done' : ''} ${locked ? 'locked' : ''}" data-k="${k}" ${done ? 'disabled aria-disabled="true"' : ''}>${ic(done ? 'check' : t.icon)}<span>${t.name}${done ? ' — done' : ` <span class="chip dim">${n} row${n === 1 ? '' : 's'}</span>`}</span>
          <span class="p">${done ? esc(used[k]) : locked ? 'Fix duplicates, units and the typo first, so the median uses correct numbers.' : esc(t.prob)}</span></button>`;
      }).join('');
      ctx.el.querySelectorAll('.tool[data-k]').forEach(b => b.onclick = () => applyTool(b.dataset.k));
    }

    function drawCity() {
      const c = {}; rows.forEach(r => { c[r.city] = (c[r.city] || 0) + 1; });
      $('#clCity').innerHTML = `<div class="small"><b>Students per city</b> — ${Object.keys(c).length} different names:</div><div class="pill-row mt">${Object.entries(c).map(([k, v]) => `<span class="chip ${CITY_FIX[k.toLowerCase()] && CITY_FIX[k.toLowerCase()] !== k ? 'bad' : ''}">${esc(k)}: ${v}</span>`).join('')}</div>`;
      $('#clLog').innerHTML = log.length ? log.map(l => `<li>${l}</li>`).join('') : '<li class="muted" style="list-style:none; margin-left:-20px">No changes yet.</li>';
    }

    function applyTool(k) {
      if (used[k]) return;
      if (k === 'fill' && !(used.dup && used.unit && used.out)) { ctx.sfx('bad'); ctx.toast('Fix duplicates, units and the typo first — otherwise the median would use wrong numbers.'); return; }
      const before = rows, t = TOOLS[k], n = t.affects(rows), a0 = avg(rows);
      let msg = '';
      if (k === 'fill') {
        const known = rows.filter(r => r.h !== null).map(r => r.h).sort((x, y) => x - y), m = median(known);
        msg = `Median of the ${known.length} known heights (${known.join(', ')}) is <b>${fmtH(m)} cm</b> → filled ${n} blank${n === 1 ? '' : 's'}.`;
      }
      rows = t.apply(rows);
      if (k === 'dup') { const gone = before.filter(r => !rows.includes(r)); msg = `Removed ${gone.length} duplicate row (${gone.map(r => esc(r.name)).join(', ')}).`; }
      if (k === 'unit') { const r = rows.find((q, i) => before[i].h !== q.h); msg = `${esc(r.name)}: ${fmtH(before[rows.indexOf(r)].h)} m × 100 = <b>${r.h} cm</b>.`; }
      if (k === 'out') { const r = rows.find((q, i) => before[i].h !== q.h); msg = `${esc(r.name)}: ${fmtH(before[rows.indexOf(r)].h)} cm is impossible (taller than any human!) — a slip for <b>${r.h} cm</b>.`; }
      if (k === 'city') { msg = `Changed ${n} spelling${n === 1 ? '' : 's'} (${before.filter(r => CITY_FIX[r.city.toLowerCase()] && CITY_FIX[r.city.toLowerCase()] !== r.city).map(r => esc(r.city)).join(', ')}) to “Delhi”.`; }
      flash = new Set(rows.filter(r => !before.includes(r)).map(r => r.key));
      const a1 = avg(rows);
      used[k] = k === 'fill' ? 'Filled with the median' : k === 'dup' ? 'Duplicate removed' : k === 'unit' ? 'Converted to cm' : k === 'out' ? 'Typo corrected' : 'All spelt “Delhi”';
      log.push(`${msg} Average: ${a0.n ? f1(a0.mean) : '—'} → <b>${f1(a1.mean)} cm</b>.`);
      ctx.sfx('ok');
      renderAll();
      if (ORDER.every(x => used[x])) end();
    }

    function renderAll() { drawTable(); drawAvg(); drawTools(); drawCity(); }

    function end() {
      const a = avg(rows);
      $('#clEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>The table is clean: ${rows.length} students, one spelling per city, every height in cm. The average went from a misleading <b>${f1(dirty.mean)} cm</b> to <b>${f1(a.mean)} cm</b>. <b>Garbage in, garbage out</b> — an AI trained on messy data learns wrong things. Fixing duplicates, missing values, units, outliers and spellings is called <b>data preprocessing</b> (data cleaning and transformation).</div></div>`;
      if (!fired && !ctx.done && !ctx._completed) {
        fired = true; ctx._completed = true; ctx.data.cleanAvg = f1(a.mean); ctx.save();
        ctx.complete(`Cleaned a messy table with 5 preprocessing steps; the average height changed from ${f1(dirty.mean)} cm to ${f1(a.mean)} cm.`);
      }
    }

    $('#clReset').onclick = () => { reset(); $('#clEnd').innerHTML = ''; renderAll(); };
    renderAll();
    return () => {};
  }
};
