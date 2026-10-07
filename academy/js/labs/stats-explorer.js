import { ic, esc } from '../core/util.js';

// ---------- exact statistics helpers (exported for tests) ----------
export function describe(vals) {
  const n = vals.length;
  if (!n) return { n: 0, sorted: [], sum: 0, mean: NaN, median: NaN, modes: [], modeNote: 'no values', maxF: 0, range: 0 };
  const s = [...vals].sort((a, b) => a - b);
  const sum = s.reduce((a, b) => a + b, 0);
  const median = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  const freq = new Map();
  s.forEach(v => freq.set(v, (freq.get(v) || 0) + 1));
  const fs = [...freq.values()], maxF = Math.max(...fs);
  let modes = [], modeNote = '';
  if (maxF === 1) modeNote = 'every value appears once';
  else if (freq.size > 1 && fs.every(f => f === maxF)) modeNote = 'every value appears equally often';
  else modes = [...freq].filter(([, f]) => f === maxF).map(([v]) => v);
  return { n, sorted: s, sum, mean: sum / n, median, modes, modeNote, maxF, range: s[n - 1] - s[0], min: s[0], max: s[n - 1] };
}
export const fmt2 = x => (Math.round(x * 100 + 1e-9) / 100).toFixed(2);
export const fmtNum = x => Number.isInteger(x) ? String(x) : String(Math.round(x * 100) / 100);
export function listAnd(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
export function modeText(d) {
  if (!d.n) return '—';
  if (!d.modes.length) return `No mode (${d.modeNote})`;
  if (d.modes.length === 1) return String(d.modes[0]);
  return `${listAnd(d.modes)} (${d.modes.length === 2 ? 'two' : d.modes.length === 3 ? 'three' : d.modes.length} modes)`;
}

const MAXV = 20, MAXN = 15, OUT = 16;
const X0 = 22, XS = 19, R = 9, DY = 19;
const xOf = v => X0 + v * XS;
const ord = k => k + (k % 100 >= 11 && k % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[k % 10] || 'th'));

export default {
  title: 'Stats Explorer: mean, median, mode and range',
  mount(ctx) {
    const rng = ctx.rng;
    const st = ctx.data.ch && ctx.data.ch.length === 3 ? ctx.data.ch : [false, false, false];
    let cur = st.findIndex(c => !c); if (cur < 0) cur = 3;
    let vals = [], tool = 'add', drag = null, base = null, c2Asked = false, c2Feedback = '', fired = false;

    // seeded starting sets for each challenge
    function startSet(i) {
      if (i === 0) { let a; do { a = Array.from({ length: 5 }, () => rng.int(1, 17)); } while (a.reduce((x, y) => x + y, 0) === 40); return a; }
      if (i === 1) {
        let a, d;
        do { const m = rng.int(5, 7); a = Array.from({ length: 7 }, () => rng.int(m - 3, m + 2)); d = describe(a); }
        while (d.sorted[4] - d.sorted[3] > 1 || d.sorted[3] - d.sorted[2] > 1 || d.max > 9 || d.min < 2);
        return a;
      }
      if (i === 2) { const m = rng.int(6, 12); return rng.shuffle([m - rng.int(2, 5), m, m, m, m + rng.int(1, 6)]); }
      return [3, 5, 8, 8, 11, 14];
    }
    function load(i) { vals = startSet(i); if (i === 1) base = [...vals]; c2Asked = false; c2Feedback = ''; }
    load(Math.min(cur, 3));

    ctx.el.innerHTML = `
      <style>
        .lab-stats{min-width:0; grid-template-columns:minmax(0,1fr);}
        .lab-stats .plot{max-width:720px; margin-inline:auto; touch-action:none; user-select:none; -webkit-user-select:none;}
        .lab-stats .plot .dot{cursor:grab;}
        .lab-stats .chl{display:grid; gap:8px;}
        .lab-stats .chl li{list-style:none; display:grid; grid-template-columns:28px 1fr; gap:10px; align-items:start; border:2px solid var(--line); border-radius:12px; padding:9px 11px; background:#fff; font-weight:700;}
        .lab-stats .chl li.now{border-color:var(--ink); background:var(--gold-wash);}
        .lab-stats .chl li.ok{border-color:var(--good); background:var(--good-wash);}
        .lab-stats .chl .n{width:28px; height:28px; border-radius:8px; border:2px solid var(--ink); display:grid; place-items:center; font-family:var(--head); font-weight:800; background:#fff;}
        .lab-stats .chl li.ok .n{background:var(--good); border-color:var(--good); color:#fff;}
        .lab-stats .vchips{display:flex; flex-wrap:wrap; gap:6px;}
        .lab-stats .vchips button{min-width:44px; min-height:40px; border:2px solid var(--ink); border-radius:10px; background:#fff; font-weight:800; padding:4px 8px;}
        .lab-stats .vchips button:hover{background:var(--bad-wash);}
        .lab-stats .sgrid{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px;}
        .lab-stats .stat .v{font-size:1.45rem;}
        .lab-stats .stat .w{font-size:.8rem; color:var(--muted); font-weight:700; margin-top:2px;}
        .lab-stats .numin .input{max-width:110px;}
      </style>
      <div class="lab-stats stack">
        <p class="lab-intro">Every dot is one value on a number line from 0 to 20. Add, move and remove dots and watch the <b>mean</b>, <b>median</b>, <b>mode</b> and <b>range</b> change instantly.</p>
        <div class="banner">${ic('target')}<span><b>Goal:</b> finish all 3 challenges. ${ctx.done ? '<span class="chip ok">Already completed — replay any time</span>' : ''}</span></div>
        <div class="lab-box">
          <div class="row between"><div class="seg" role="group" aria-label="Tool">
            <button data-tool="add">Add</button><button data-tool="move">Move</button><button data-tool="remove">Remove</button></div>
            <span class="small muted" id="seHelp"></span></div>
          <svg class="plot svgchart mt" id="sePlot" viewBox="0 0 422 160" role="img" aria-label="Dot plot"></svg>
          <div class="row mt" style="justify-content:space-between">
            <div class="numin"><label class="small" for="seIn"><b>Value</b></label><input class="input" id="seIn" type="number" min="0" max="20" step="1" value="10" inputmode="numeric"><button class="btn sm" id="seAdd">Add value</button></div>
            <button class="btn sm ghost" id="seReset">${ic('refresh')} Reset data</button>
          </div>
          <div class="mt"><div class="tiny muted" id="seVlabel">Values (tap one to remove it):</div><div class="vchips mt" id="seChips"></div></div>
        </div>
        <div class="lab-grid">
          <div class="lab-box"><h4>Live statistics</h4><div class="sgrid" id="seStats" aria-live="polite"></div></div>
          <div class="lab-box"><h4>Challenges</h4><ol class="chl" id="seCh"></ol><div id="seTask" class="mt" aria-live="polite"></div></div>
        </div>
        <div id="seEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);
    const plot = $('#sePlot');

    function stackPos() { // index -> stack level within its value column
      const seen = {}, lv = [];
      vals.forEach((v, i) => { seen[v] = (seen[v] || 0); lv[i] = seen[v]++; });
      return lv;
    }

    function drawPlot() {
      const d = describe(vals), lv = stackPos();
      const top = Math.max(5, ...lv.map(l => l + 1)) * DY + 16;
      const axisY = top + 10, H = axisY + 62;
      plot.setAttribute('viewBox', `0 0 422 ${H}`);
      let g = `<rect x="0" y="0" width="422" height="${H}" fill="transparent"/>`;
      g += `<line x1="${xOf(0) - 8}" y1="${axisY}" x2="${xOf(20) + 8}" y2="${axisY}" stroke="#15171C" stroke-width="2"/>`;
      for (let v = 0; v <= MAXV; v++) {
        g += `<line x1="${xOf(v)}" y1="${axisY}" x2="${xOf(v)}" y2="${axisY + (v % 5 ? 5 : 9)}" stroke="#15171C" stroke-width="${v % 5 ? 1 : 2}"/>`;
        if (v % 2 === 0) g += `<text x="${xOf(v)}" y="${axisY + 22}" text-anchor="middle" style="font-size:12px">${v}</text>`;
      }
      if (cur === 1 && base) g += `<line x1="${xOf(OUT) - 9}" y1="${axisY - 4}" x2="${xOf(20) + 8}" y2="${axisY - 4}" stroke="#E8453C" stroke-width="5" opacity=".35"/><text x="${xOf(18)}" y="${14}" text-anchor="middle" style="font-size:11px;fill:#A3262B">outlier zone</text>`;
      vals.forEach((v, i) => {
        const cy = axisY - R - 3 - lv[i] * DY, act = drag && drag.i === i;
        g += `<circle class="dot" data-i="${i}" cx="${xOf(v)}" cy="${cy}" r="${R}" fill="${act ? '#FFC800' : '#2F6FED'}" stroke="#15171C" stroke-width="2"/>`;
      });
      if (d.n) {
        const my = axisY + 34, dy2 = axisY + 50;
        g += `<path d="M${xOf(d.mean)} ${my - 9} l-6 9 h12 z" fill="#2F6FED" stroke="#15171C" stroke-width="1.5"/><text x="${Math.min(380, Math.max(30, xOf(d.mean)))}" y="${my + 12}" text-anchor="middle" style="font-size:11px;fill:#2F6FED">mean ${fmt2(d.mean)}</text>`;
        g += `<rect x="${xOf(d.median) - 5}" y="${axisY + 1}" width="10" height="10" rx="2" fill="#E8453C" stroke="#15171C" stroke-width="1.5" transform="rotate(45 ${xOf(d.median)} ${axisY + 6})"/>`;
        g += `<text x="${Math.min(380, Math.max(30, xOf(d.median)))}" y="${dy2 + 10}" text-anchor="middle" style="font-size:11px;fill:#A3262B">median ${fmtNum(d.median)}</text>`;
      }
      plot.innerHTML = g;
      plot.setAttribute('aria-label', `Dot plot of ${d.n} values: ${d.n ? d.sorted.join(', ') : 'empty'}`);
    }

    function statTile(k, v, w) { return `<div class="stat"><div class="k">${k}</div><div class="v">${v}</div><div class="w">${w}</div></div>`; }
    function drawStats() {
      const d = describe(vals);
      if (!d.n) { $('#seStats').innerHTML = '<p class="small muted">Add some values to see the statistics.</p>'; return; }
      const mid = d.n % 2 ? `middle (${ord((d.n + 1) / 2)}) value` : `(${d.sorted[d.n / 2 - 1]} + ${d.sorted[d.n / 2]}) ÷ 2`;
      $('#seStats').innerHTML =
        statTile('Mean', fmt2(d.mean), `sum ${d.sum} ÷ ${d.n} value${d.n > 1 ? 's' : ''}`) +
        statTile('Median', fmtNum(d.median), d.n === 1 ? 'only value' : mid) +
        statTile('Mode', d.modes.length ? esc(listAnd(d.modes.map(String))) : 'None', d.modes.length ? `appears ${d.maxF} times${d.modes.length > 1 ? ' each — ' + d.modes.length + ' modes' : ''}` : d.modeNote) +
        statTile('Range', d.range, `${d.max} − ${d.min}`) +
        `<p class="small muted" style="grid-column:1/-1">Sorted: ${d.sorted.join(', ')} &nbsp;(n = ${d.n})</p>`;
    }

    function drawChips() {
      $('#seChips').innerHTML = vals.length ? vals.map((v, i) => `<button data-rm="${i}" aria-label="Remove value ${v}">${v} ×</button>`).join('') : '<span class="small muted">No values yet.</span>';
      $('#seAdd').disabled = vals.length >= MAXN;
    }

    const CH = [
      'Make the <b>mean exactly 8</b> using exactly <b>5 values</b>.',
      `Add one <b>outlier</b> (${OUT} or more) to the class data. Which measure moves most?`,
      'Make the <b>mode different from the median</b> (one single mode, at least 5 values).'
    ];
    function drawCh() {
      $('#seCh').innerHTML = CH.map((t, i) => `<li class="${st[i] ? 'ok' : i === cur ? 'now' : ''}"><span class="n">${st[i] ? ic('check', 'sm') : i + 1}</span><span>${t}${st[i] ? ' <span class="sr">(done)</span>' : ''}</span></li>`).join('');
    }

    function c2State() { // is current data = base + exactly one outlier?
      if (!base || vals.length !== base.length + 1) return null;
      const rest = [...vals], extra = [];
      const b = [...base];
      rest.sort((a, z) => a - z); b.sort((a, z) => a - z);
      let i = 0, j = 0;
      while (i < rest.length) { if (j < b.length && rest[i] === b[j]) { i++; j++; } else extra.push(rest[i++]); }
      return j === b.length && extra.length === 1 ? extra[0] : null;
    }

    function drawTask() {
      const d = describe(vals), box = $('#seTask');
      if (cur === 0) {
        const ok = d.n === 5 && d.sum === 40;
        box.innerHTML = `<div class="panel small"><b>Tip:</b> 5 values with mean 8 must add up to 5 × 8 = <b>40</b>.<br>Now: ${d.n} value${d.n === 1 ? '' : 's'}, sum <b>${d.sum || 0}</b>${d.n === 5 ? ` — ${d.sum === 40 ? 'perfect!' : d.sum > 40 ? `${d.sum - 40} too much` : `${40 - d.sum} short`}` : ' — you need exactly 5'}.</div>`;
        if (ok) return [0, `Mean = 40 ÷ 5 = 8.00. Many different sets of 5 values give the same mean!`];
      } else if (cur === 1) {
        const x = c2State(), bd = describe(base);
        if (x === null || x < OUT) {
          const changed = vals.length && !(vals.length === base.length && describe(vals).sorted.join() === bd.sorted.join()) && x === null;
          box.innerHTML = `<div class="panel small">Class data loaded (7 values, mean <b>${fmt2(bd.mean)}</b>, median <b>${fmtNum(bd.median)}</b>). Add <b>one</b> value of ${OUT} or more.${changed ? '<br><span class="err">Keep the 7 class values as they are — press “Reset data” to start again.</span>' : ''}${x !== null && x < OUT ? `<br><span class="err">${x} is not far enough from the rest to be an outlier. Try ${OUT} or more.</span>` : ''}</div>`;
          c2Asked = false;
        } else {
          const ad = d, dm = Math.abs(ad.mean - bd.mean), dmed = Math.abs(ad.median - bd.median);
          const ans = Math.abs(dm - dmed) < 1e-9 ? 'same' : dm > dmed ? 'mean' : 'median';
          c2Asked = ans;
          box.innerHTML = `<div class="panel small"><div class="tblwrap"><table class="tbl"><thead><tr><th>Measure</th><th>Before</th><th>After adding ${x}</th></tr></thead><tbody>
            <tr><td>Mean</td><td>${fmt2(bd.mean)}</td><td>${fmt2(ad.mean)}</td></tr>
            <tr><td>Median</td><td>${fmtNum(bd.median)}</td><td>${fmtNum(ad.median)}</td></tr>
            <tr><td>Mode</td><td>${esc(modeText(bd))}</td><td>${esc(modeText(ad))}</td></tr>
            <tr><td>Range</td><td>${bd.range}</td><td>${ad.range}</td></tr></tbody></table></div>
            <p class="mt"><b>Of the two averages, which moved more: the mean or the median?</b></p>
            <div class="row mt"><button class="btn sm" data-a="mean">Mean</button><button class="btn sm" data-a="median">Median</button><button class="btn sm" data-a="same">They moved the same</button></div>
            <div aria-live="polite" class="mt">${c2Feedback}</div></div>`;
          box.querySelectorAll('[data-a]').forEach(b => b.onclick = () => {
            if (b.dataset.a === ans) {
              ctx.sfx('ok');
              pass(1, (ans === 'mean' ? `The mean moved by ${fmt2(dm)} but the median only by ${fmtNum(dmed)}.` : `Here the mean moved by ${fmt2(dm)} and the median by ${fmtNum(dmed)}.`) + ` The mean uses every value, so one extreme value pulls it; the median only looks at the middle. The range jumped from ${bd.range} to ${ad.range}.`);
            } else {
              ctx.sfx('bad');
              c2Feedback = `<div class="fb bad"><div><b>Not quite.</b> Compare the numbers: the mean changed by ${fmt2(dm)}, the median by ${fmtNum(dmed)}.</div></div>`;
              drawTask();
            }
          });
        }
      } else if (cur === 2) {
        const one = d.modes.length === 1, ok = d.n >= 5 && one && d.modes[0] !== d.median;
        let msg = '';
        if (d.n < 5) msg = `Use at least 5 values (now ${d.n}).`;
        else if (!d.modes.length) msg = `No mode right now (${d.modeNote}). Stack two dots on the same value.`;
        else if (!one) msg = `Two or more modes (${listAnd(d.modes)}). Make one value appear most often.`;
        else if (d.modes[0] === d.median) msg = `Mode ${d.modes[0]} = median ${fmtNum(d.median)}. Move the stack of dots away from the middle.`;
        box.innerHTML = `<div class="panel small">Mode: <b>${esc(modeText(d))}</b> · Median: <b>${d.n ? fmtNum(d.median) : '—'}</b><br>${esc(msg)}</div>`;
        if (ok) return [2, `Mode ${d.modes[0]} ≠ median ${fmtNum(d.median)}. The mode is the most frequent value, the median is the middle one — they need not be the same.`];
      } else box.innerHTML = '';
    }

    let lastPass = '';
    function pass(i, why) {
      drag = null; st[i] = true; ctx.data.ch = st; ctx.save(); ctx.sfx('win');
      lastPass = `<div class="fb good mt"><div class="h">${ic('check')} Challenge ${i + 1} done</div><div class="small">${esc(why)}</div></div>`;
      cur = st.findIndex(c => !c); if (cur < 0) cur = 3;
      if (cur < 3) load(cur);
      renderAll();
      if (cur === 3) end();
    }

    function renderAll() {
      drawPlot(); drawStats(); drawChips(); drawCh();
      const p = drawTask();
      if (p) return pass(...p);
      if (lastPass) $('#seTask').insertAdjacentHTML('afterbegin', lastPass);
      ctx.el.querySelectorAll('[data-tool]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tool === tool));
      $('#seHelp').textContent = { add: 'Tap the line to add a dot', move: 'Drag a dot sideways', remove: 'Tap a dot to remove it' }[tool];
    }
    function changed() { lastPass = ''; c2Feedback = ''; renderAll(); }

    function end() {
      $('#seEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>All 3 challenges done! The <b>mean</b> (sum ÷ count) uses every value so outliers pull it; the <b>median</b> is the middle value; the <b>mode</b> is the most frequent value (there can be none or several); the <b>range</b> (max − min) measures spread. These are the measures of <b>central tendency</b> and spread in <b>Statistics</b>.</div></div>
        <div class="row mt"><button class="btn sm" id="seAgain">${ic('refresh')} Play the challenges again</button></div>`;
      $('#seAgain').onclick = () => { st.fill(false); cur = 0; load(0); lastPass = ''; $('#seEnd').innerHTML = ''; renderAll(); };
      if (!fired && !ctx.done && !ctx._completed) {
        fired = true; ctx._completed = true;
        ctx.complete('Explored mean, median, mode and range and completed 3 statistics challenges.');
      }
    }

    // ---------- pointer interaction ----------
    function toVal(ev) {
      const p = plot.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
      const q = p.matrixTransform(plot.getScreenCTM().inverse());
      return { v: Math.round((q.x - X0) / XS), x: q.x, y: q.y };
    }
    function hitDot(ev) {
      const t = ev.target.closest && ev.target.closest('.dot');
      if (t) return +t.dataset.i;
      const { v } = toVal(ev); // fall back to the top dot of the nearest column (bigger touch target)
      return vals.lastIndexOf(v);
    }
    plot.addEventListener('pointerdown', ev => {
      const i = hitDot(ev), { v } = toVal(ev);
      if (tool === 'add') {
        if (v < 0 || v > MAXV) return;
        if (vals.length >= MAXN) { ctx.toast(`Maximum ${MAXN} values.`); return; }
        vals.push(v); ctx.sfx('pop'); changed();
      } else if (tool === 'remove') {
        if (i < 0) return; vals.splice(i, 1); ctx.sfx('tick'); changed();
      } else if (tool === 'move' && i >= 0) {
        drag = { i, id: ev.pointerId }; plot.setPointerCapture(ev.pointerId); ev.preventDefault(); drawPlot();
      }
    });
    plot.addEventListener('pointermove', ev => {
      if (!drag || ev.pointerId !== drag.id) return;
      const v = Math.max(0, Math.min(MAXV, toVal(ev).v));
      if (v !== vals[drag.i]) {
        // keep the dragged dot on top of its new column so drag index stays valid
        const [old] = vals.splice(drag.i, 1); void old; vals.push(v); drag.i = vals.length - 1; ctx.sfx('tick'); changed();
      }
    });
    const endDrag = ev => { if (drag && ev.pointerId === drag.id) { drag = null; drawPlot(); } };
    plot.addEventListener('pointerup', endDrag);
    plot.addEventListener('pointercancel', endDrag);

    ctx.el.querySelectorAll('[data-tool]').forEach(b => b.onclick = () => { tool = b.dataset.tool; renderAll(); });
    $('#seAdd').onclick = () => {
      const v = Math.round(+$('#seIn').value);
      if (!Number.isFinite(v) || v < 0 || v > MAXV || $('#seIn').value === '') { ctx.toast('Enter a whole number from 0 to 20.'); return; }
      if (vals.length >= MAXN) return;
      vals.push(v); ctx.sfx('pop'); changed();
    };
    $('#seIn').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('#seAdd').click(); } });
    $('#seChips').addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (!b) return; vals.splice(+b.dataset.rm, 1); ctx.sfx('tick'); changed(); });
    $('#seReset').onclick = () => { load(Math.min(cur, 3)); changed(); };

    renderAll();
    if (cur === 3) end();
    return () => { drag = null; };
  }
};
