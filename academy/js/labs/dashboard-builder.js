import { ic, esc } from '../core/util.js';
import * as chart from '../core/charts.js';

const ITEMS = [['Samosa', 15], ['Vada Pav', 20], ['Idli', 25], ['Sandwich', 30]];
const MONTHS = ['Jul', 'Aug', 'Sep'], MONTH_NAME = { Jul: 'July', Aug: 'August', Sep: 'September' };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const CATS = { item: ITEMS.map(i => i[0]), day: DAYS, month: MONTHS };
const MEAS = { rev: 'Revenue (₹)', qty: 'Quantity sold' };
const GRP = { item: 'Item', day: 'Day', month: 'Month' };
const TYPES = { bar: 'Bar', line: 'Line', pie: 'Pie' };
const KPIS = { rev: 'Total revenue', qty: 'Items sold', best: 'Best-selling item', day: 'Busiest day' };

// ---------- data + aggregation (exported for tests) ----------
export const rupees = n => '₹' + Math.round(n).toLocaleString('en-IN');
export function agg(rows, by, m) { const out = Object.fromEntries(CATS[by].map(c => [c, 0])); rows.forEach(r => { out[r[by]] += r[m]; }); return out; }
export function top(obj) { const e = Object.entries(obj).sort((a, b) => b[1] - a[1]); return { key: e[0][0], v: e[0][1], margin: e.length > 1 ? (e[0][1] - e[1][1]) / e[0][1] : 1 }; }
// whole-number percentages that always add up to exactly 100 (largest remainder)
export function pcts(vals) {
  const tot = vals.reduce((a, b) => a + b, 0); if (!tot) return vals.map(() => 0);
  const raw = vals.map(v => v / tot * 100), fl = raw.map(Math.floor); let left = 100 - fl.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - fl[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { fl[i]++; left--; } });
  return fl;
}
export const filt = (rows, month) => month === 'All' ? rows : rows.filter(r => r.month === month);

export function makeData(rng) {
  let best = null;
  for (let tries = 0; tries < 400; tries++) {
    const base = ITEMS.map(() => rng.int(16, 40)), star = MONTHS.map(() => rng.int(0, 3)), dayF = DAYS.map(() => 0.8 + rng.int(0, 5) / 10);
    const rows = [];
    MONTHS.forEach((m, mi) => DAYS.forEach((d, di) => ITEMS.forEach(([it, pr], ii) => {
      const q = Math.max(3, Math.round(base[ii] * dayF[di] * (star[mi] === ii ? 1.7 : 1) + rng.int(-4, 4)));
      rows.push({ item: it, day: d, month: m, qty: q, rev: q * pr });
    })));
    const overall = top(agg(rows, 'item', 'rev')).key;
    const m1s = rng.shuffle(MONTHS).filter(m => { const t = top(agg(filt(rows, m), 'item', 'rev')); return t.key !== overall && t.margin >= 0.03; });
    const dayTop = top(agg(rows, 'day', 'qty'));
    if (m1s.length && dayTop.margin >= 0.02) {
      const m1 = m1s[0], m2 = rng.pick(MONTHS.filter(m => m !== m1));
      best = { rows, q: [
        { kind: 'mcq', text: `In ${MONTH_NAME[m1]}, which item earned the most revenue?`, opts: CATS.item, ans: top(agg(filt(rows, m1), 'item', 'rev')).key, hint: `Set the filter to ${m1} and look at a Revenue by Item chart.` },
        { kind: 'num', text: `What was the total revenue in ${MONTH_NAME[m2]}? (in ₹)`, ans: filt(rows, m2).reduce((a, r) => a + r.rev, 0), hint: `Set the filter to ${m2} and add a “Total revenue” KPI tile.` },
        { kind: 'mcq', text: 'Over all three months, on which day of the week were the most items sold?', opts: DAYS, ans: dayTop.key, hint: 'Set the filter to All and chart Quantity by Day (or add a “Busiest day” KPI).' }
      ] };
      break;
    }
  }
  return best;
}

export default {
  title: 'Dashboard Builder: school canteen sales',
  mount(ctx) {
    const D = makeData(ctx.rng);
    const sd = ctx.data;
    sd.charts = Array.isArray(sd.charts) ? sd.charts.slice(0, 3) : [];
    sd.kpis = Array.isArray(sd.kpis) ? sd.kpis.slice(0, 2) : [];
    sd.ok = Array.isArray(sd.ok) ? sd.ok : [false, false, false];
    let month = 'All', form = { m: 'rev', g: 'item', t: 'bar' }, fired = false, qMsg = ['', '', ''];

    ctx.el.innerHTML = `
      <style>
        .lab-dash{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-dash .tiles{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px;}
        @media (max-width:760px){ .lab-dash .tiles{grid-template-columns:minmax(0,1fr);} }
        .lab-dash .tile{background:#fff; border:var(--b2); border-radius:14px; padding:10px 12px; display:grid; gap:6px; min-width:0;}
        .lab-dash .tile .th{display:flex; justify-content:space-between; align-items:center; gap:8px; font-weight:800;}
        .lab-dash .x{width:40px; height:40px; border:2px solid var(--ink); border-radius:10px; background:#fff; display:grid; place-items:center; flex-shrink:0;}
        .lab-dash .x:hover{background:var(--bad-wash);}
        .lab-dash .kpis{display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:10px;}
        .lab-dash .stat{display:grid; grid-template-columns:1fr auto; gap:2px 8px; align-items:center;}
        .lab-dash .stat .v{grid-column:1;}
        .lab-dash .stat .x{grid-row:1 / span 2; grid-column:2;}
        .lab-dash .build{display:grid; gap:10px;}
        .lab-dash .build .lbl{font-size:.8rem; font-weight:800; color:var(--muted); margin-bottom:4px;}
        .lab-dash .pie{display:grid; grid-template-columns:minmax(0,160px) 1fr; gap:12px; align-items:center;}
        .lab-dash .pie svg{width:100%; height:auto;}
        .lab-dash .leg{display:grid; gap:4px; font-size:.86rem; font-weight:700;}
        .lab-dash .leg i{display:inline-block; width:12px; height:12px; border:2px solid var(--ink); border-radius:3px; margin-right:6px; vertical-align:-1px;}
        .lab-dash .tip{font-size:.8rem; color:var(--gold-ink); font-weight:700;}
        .lab-dash .chkl{display:flex; flex-wrap:wrap; gap:6px;}
        .lab-dash .filter{display:flex; flex-wrap:wrap; gap:10px; align-items:center; background:var(--ink); color:#fff; border-radius:12px; padding:10px 12px;}
        .lab-dash .filter .seg{border-color:#fff; background:transparent;}
        .lab-dash .svgchart text{font-size:14px;}
        .lab-dash .filter .seg button{color:#fff; min-height:40px;}
        .lab-dash .filter .seg button + button{border-left-color:#fff;}
        .lab-dash .filter .seg button[aria-pressed="true"]{background:var(--gold); color:var(--ink);}
        .lab-dash details summary{cursor:pointer; font-weight:800; min-height:40px; display:flex; align-items:center;}
        .lab-dash .qrow{display:grid; gap:8px; border-top:2px dashed var(--line); padding-top:12px;}
        .lab-dash .qrow:first-child{border-top:0; padding-top:0;}
      </style>
      <div class="lab-dash stack">
        <p class="lab-intro">The school canteen recorded 60 rows of sales (item, day, month, quantity, revenue) for July–September. Build a <b>dashboard</b> — KPI tiles, charts and a filter on one screen — then use it to answer the principal's questions.</p>
        <div class="banner">${ic('target')}<div><b>Goal:</b> add 2 or more charts and 1 KPI, use the month filter, and answer 3 questions correctly. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}<div class="chkl mt" id="dbChk"></div></div></div>
        <div class="filter" role="group" aria-label="Month filter">${ic('grid')}<b>Month filter</b><div class="seg">${['All', ...MONTHS].map(m => `<button data-f="${m}">${m}</button>`).join('')}</div><span class="small" id="dbRowsN"></span></div>
        <div class="lab-box">
          <div class="row between"><h4 style="margin:0">KPI tiles</h4>
            <div class="row" style="gap:8px"><label class="sr" for="dbKpi">KPI to add</label><select class="input" id="dbKpi" style="width:auto; min-height:40px; padding-block:6px">${Object.entries(KPIS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select><button class="btn sm" id="dbAddK">Add KPI</button></div></div>
          <div class="kpis mt" id="dbKpis" aria-live="polite"></div>
        </div>
        <div class="lab-box build">
          <h4 style="margin:0">Chart builder <span class="small muted" id="dbCount"></span></h4>
          <div class="row" style="align-items:flex-start; gap:14px">
            <div><div class="lbl">Measure</div><div class="seg" role="group" aria-label="Measure">${Object.entries(MEAS).map(([k, v]) => `<button data-fm="${k}">${v}</button>`).join('')}</div></div>
            <div><div class="lbl">Group by</div><div class="seg" role="group" aria-label="Group by">${Object.entries(GRP).map(([k, v]) => `<button data-fg="${k}">${v}</button>`).join('')}</div></div>
            <div><div class="lbl">Chart type</div><div class="seg" role="group" aria-label="Chart type">${Object.entries(TYPES).map(([k, v]) => `<button data-ft="${k}">${v}</button>`).join('')}</div></div>
          </div>
          <div class="row"><button class="btn primary" id="dbAddC">${ic('data')} Add chart</button><span class="tip" id="dbTip" aria-live="polite"></span></div>
        </div>
        <div class="tiles" id="dbTiles"></div>
        <div class="lab-box"><h4>The principal's questions</h4><p class="small muted">Answer using your dashboard — change the filter and add tiles as needed.</p><div class="stack mt" id="dbQs"></div></div>
        <details class="lab-box"><summary>See the raw data (60 rows)</summary><div class="tblwrap mt" style="max-height:340px; overflow:auto" id="dbRaw"></div></details>
        <div id="dbEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    const rowsNow = () => filt(D.rows, month);
    const fLabel = () => month === 'All' ? 'Jul–Sep' : month;

    function kpiVal(k) {
      const r = rowsNow();
      if (k === 'rev') return [rupees(r.reduce((a, x) => a + x.rev, 0)), `${r.length} rows`];
      if (k === 'qty') return [r.reduce((a, x) => a + x.qty, 0).toLocaleString('en-IN'), 'snacks sold'];
      if (k === 'best') { const t = top(agg(r, 'item', 'qty')); return [t.key, `${t.v.toLocaleString('en-IN')} sold`]; }
      const t = top(agg(r, 'day', 'qty')); return [t.key, `${t.v.toLocaleString('en-IN')} items sold`];
    }
    function drawKpis() {
      $('#dbKpis').innerHTML = sd.kpis.length ? sd.kpis.map((k, i) => { const [v, w] = kpiVal(k); return `<div class="stat"><div class="k">${KPIS[k]} · ${fLabel()}</div><button class="x" data-rk="${i}" aria-label="Remove ${KPIS[k]} tile">${ic('x', 'sm')}</button><div class="v">${esc(v)} <small>${esc(w)}</small></div></div>`; }).join('')
        : '<p class="small muted">No KPI tiles yet. A KPI (Key Performance Indicator) is one important number, shown big.</p>';
      $('#dbAddK').disabled = sd.kpis.length >= 2;
      ctx.el.querySelectorAll('[data-rk]').forEach(b => b.onclick = () => { sd.kpis.splice(+b.dataset.rk, 1); save(); drawAll(); });
    }

    function tipFor(c) {
      if (c.t === 'line' && c.g === 'item') return 'Tip: line charts suit things in time order (days, months). For separate items a bar chart is clearer.';
      if (c.t === 'pie' && c.g === 'day') return 'Tip: a pie shows parts of a whole — fine here, but bars make it easier to compare days.';
      if (c.g === 'month' && month !== 'All') return `Note: the filter shows only ${month}, so this chart has one value. Set the filter to All to compare months.`;
      return '';
    }
    function chartHTML(c) {
      const data = agg(rowsNow(), c.g, c.m), labels = Object.keys(data), vals = Object.values(data);
      const title = `${c.m === 'rev' ? 'Revenue' : 'Quantity'} by ${GRP[c.g]} · ${fLabel()}`;
      if (c.t === 'pie') {
        const tot = vals.reduce((a, b) => a + b, 0) || 1, pc = pcts(vals); let a0 = -Math.PI / 2, g = '';
        vals.forEach((v, i) => {
          const a1 = a0 + v / tot * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0, col = chart.COLORS[i % chart.COLORS.length];
          g += v === tot ? `<circle cx="80" cy="80" r="72" fill="${col}" stroke="#15171C" stroke-width="2"/>` : v ? `<path d="M80,80 L${80 + 72 * Math.cos(a0)},${80 + 72 * Math.sin(a0)} A72,72 0 ${large} 1 ${80 + 72 * Math.cos(a1)},${80 + 72 * Math.sin(a1)} Z" fill="${col}" stroke="#15171C" stroke-width="2"/>` : '';
          a0 = a1;
        });
        return [title, `<div class="pie"><svg viewBox="0 0 160 160" role="img" aria-label="${esc(title)}: ${labels.map((l, i) => `${l} ${pc[i]}%`).join(', ')}">${g}</svg>
          <div class="leg">${labels.map((l, i) => `<div><i style="background:${chart.COLORS[i % chart.COLORS.length]}"></i>${esc(l)} — ${pc[i]}% <span class="muted">(${c.m === 'rev' ? rupees(vals[i]) : vals[i]})</span></div>`).join('')}</div></div>`];
      }
      const o = { W: 360, H: 240, title: '', ylabel: MEAS[c.m] };
      return [title, c.t === 'bar' ? chart.bar(labels, vals, o) : chart.line(labels, [vals], o)];
    }
    function drawTiles() {
      $('#dbCount').textContent = `(${sd.charts.length}/3)`;
      $('#dbAddC').disabled = sd.charts.length >= 3;
      $('#dbTiles').innerHTML = sd.charts.map((c, i) => { const [t, svg] = chartHTML(c), tip = tipFor(c); return `<div class="tile"><div class="th"><span>${esc(t)}</span><button class="x" data-rc="${i}" aria-label="Remove chart: ${esc(t)}">${ic('x', 'sm')}</button></div>${svg}${tip ? `<div class="tip">${esc(tip)}</div>` : ''}</div>`; }).join('')
        || '<div class="tile"><p class="small muted">Your charts will appear here. Pick a measure, a group and a chart type above, then press “Add chart”.</p></div>';
      ctx.el.querySelectorAll('[data-rc]').forEach(b => b.onclick = () => { sd.charts.splice(+b.dataset.rc, 1); save(); drawAll(); });
    }

    function drawForm() {
      ctx.el.querySelectorAll('[data-fm]').forEach(b => b.setAttribute('aria-pressed', b.dataset.fm === form.m));
      ctx.el.querySelectorAll('[data-fg]').forEach(b => b.setAttribute('aria-pressed', b.dataset.fg === form.g));
      ctx.el.querySelectorAll('[data-ft]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ft === form.t));
      ctx.el.querySelectorAll('[data-f]').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === month));
      $('#dbRowsN').textContent = `${rowsNow().length} of 60 rows`;
    }

    function drawQs() {
      $('#dbQs').innerHTML = D.q.map((q, i) => `<div class="qrow"><div><b>Q${i + 1}.</b> ${esc(q.text)} ${sd.ok[i] ? '<span class="chip ok">Correct</span>' : ''}</div>
        ${sd.ok[i] ? `<div class="small"><b>Answer:</b> ${q.kind === 'num' ? rupees(q.ans) : esc(q.ans)}</div>` : q.kind === 'num'
          ? `<div class="numin"><label class="sr" for="dbN${i}">Answer in rupees</label><input class="input" id="dbN${i}" inputmode="numeric" placeholder="₹"><button class="btn sm" data-q="${i}">Check</button></div>`
          : `<div class="pill-row">${q.opts.map(o => `<button class="btn sm" data-q="${i}" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`}
        <div aria-live="polite">${qMsg[i]}</div></div>`).join('');
      ctx.el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => answer(+b.dataset.q, b.dataset.o));
      ctx.el.querySelectorAll('#dbQs input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); inp.nextElementSibling.click(); } }));
    }
    function answer(i, o) {
      const q = D.q[i];
      let ok;
      if (q.kind === 'num') {
        const raw = $(`#dbN${i}`).value.replace(/[₹,\s]/g, '').replace(/^rs\.?/i, '');
        if (!/^\d+(\.\d+)?$/.test(raw)) { ctx.toast('Type the amount as a number, e.g. 12345'); return; }
        ok = Math.abs(+raw - q.ans) < 0.5;
      } else ok = o === q.ans;
      if (ok) { sd.ok[i] = true; qMsg[i] = ''; ctx.sfx('ok'); save(); }
      else { ctx.sfx('bad'); qMsg[i] = `<div class="fb bad small"><div><b>Not quite.</b> ${esc(q.hint)}</div></div>`; }
      drawQs(); drawChk(); check();
    }

    function drawChk() {
      const items = [[sd.charts.length >= 2, `2+ charts (${sd.charts.length})`], [sd.kpis.length >= 1, `1+ KPI (${sd.kpis.length})`], [!!sd.filterUsed, 'Filter used'], [sd.ok.every(Boolean), `3 answers (${sd.ok.filter(Boolean).length}/3)`]];
      $('#dbChk').innerHTML = items.map(([ok, t]) => `<span class="chip ${ok ? 'ok' : 'dim'}">${ok ? ic('check', 'sm') : ''}${t}${ok ? '<span class="sr"> done</span>' : ''}</span>`).join('');
    }
    function drawRaw() {
      $('#dbRaw').innerHTML = `<table class="tbl"><thead><tr><th>Item</th><th>Day</th><th>Month</th><th>Qty</th><th>Revenue</th></tr></thead><tbody>${rowsNow().map(r => `<tr><td>${r.item}</td><td>${r.day}</td><td>${r.month}</td><td>${r.qty}</td><td>${rupees(r.rev)}</td></tr>`).join('')}</tbody></table>`;
    }
    function save() { ctx.save(); }
    function drawAll() { drawForm(); drawKpis(); drawTiles(); drawChk(); drawRaw(); check(); }

    function check() {
      const met = sd.charts.length >= 2 && sd.kpis.length >= 1 && sd.filterUsed && sd.ok.every(Boolean);
      if (!met || $('#dbEnd').innerHTML) return;
      $('#dbEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>Your dashboard works! <b>KPI tiles</b> show the key numbers, <b>charts</b> show comparisons and patterns, and the <b>filter</b> updates every tile at once — so you can answer questions in seconds. This is an <b>interactive dashboard</b>, like the ones people build in Tableau, Datawrapper or Google Sheets / Looker Studio.</div></div>`;
      if (!fired && !ctx.done && !ctx._completed) {
        fired = true; ctx._completed = true; sd.completed = 1; save();
        ctx.complete(`Built a canteen sales dashboard with ${sd.charts.length} charts, ${sd.kpis.length} KPI tile${sd.kpis.length > 1 ? 's' : ''} and a month filter, and answered 3 questions.`);
      }
    }

    ctx.el.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { month = b.dataset.f; if (month !== 'All') sd.filterUsed = 1; save(); ctx.sfx('tick'); drawAll(); });
    ctx.el.querySelectorAll('[data-fm]').forEach(b => b.onclick = () => { form.m = b.dataset.fm; drawForm(); });
    ctx.el.querySelectorAll('[data-fg]').forEach(b => b.onclick = () => { form.g = b.dataset.fg; drawForm(); });
    ctx.el.querySelectorAll('[data-ft]').forEach(b => b.onclick = () => { form.t = b.dataset.ft; drawForm(); });
    $('#dbAddC').onclick = () => {
      if (sd.charts.length >= 3) return;
      if (sd.charts.some(c => c.m === form.m && c.g === form.g && c.t === form.t)) { ctx.toast('You already have that chart — try a different measure, group or type.'); return; }
      sd.charts.push({ ...form }); save(); ctx.sfx('pop');
      $('#dbTip').textContent = tipFor(form);
      drawAll();
    };
    $('#dbAddK').onclick = () => {
      const k = $('#dbKpi').value;
      if (sd.kpis.length >= 2) return;
      if (sd.kpis.includes(k)) { ctx.toast('That KPI is already on the dashboard.'); return; }
      sd.kpis.push(k); save(); ctx.sfx('pop'); drawAll();
    };
    drawAll(); drawQs();
    return () => {};
  }
};
