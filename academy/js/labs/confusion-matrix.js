import { ic, esc } from '../core/util.js';

// Mango-ripeness AI. Positive class = "Ripe". 12 seeded predictions, each with a
// confidence score; the AI says "Ripe" when score >= threshold (0.50 by default).
const OUT = ['TP', 'FP', 'TN', 'FN'];
const NAME = { TP: 'True Positive', FP: 'False Positive', TN: 'True Negative', FN: 'False Negative' };
const RANGE = { TP: [55, 97], FP: [52, 78], TN: [4, 46], FN: [31, 48] }; // scores ×100, consistent with t = 0.50

const CSS = `
.lab-cm .cm-cards{display:grid; grid-template-columns:repeat(auto-fill,minmax(132px,1fr)); gap:8px;}
.lab-cm .cm-card{background:#fff; border:2px solid var(--ink); border-radius:12px; padding:10px; display:grid; gap:6px; font-size:.9rem; transition:background .2s;}
.lab-cm .cm-card.ok{background:var(--good-wash); border-color:var(--good);}
.lab-cm .cm-card.no{background:var(--bad-wash); border-color:var(--bad);}
.lab-cm .cm-card .hd{display:flex; justify-content:space-between; align-items:center; font-weight:900;}
.lab-cm .cm-card .ln{display:grid; gap:0; font-weight:700; line-height:1.25;}
.lab-cm .cm-card .ln > span:first-child{color:var(--muted); font-size:.7rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase;}
.lab-cm .kgrid{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px 14px; margin-top:4px; font-size:.95rem;}
.lab-cm .kgrid span b{display:inline-block; min-width:32px; font-size:.95rem; color:var(--ink); letter-spacing:0; margin:0;}
@media (max-width:560px){ .lab-cm .kgrid{grid-template-columns:1fr;} }
.lab-cm .mxbox{position:sticky; top:12px;}
.lab-cm .cm-pick{display:grid; grid-template-columns:1fr 1fr; gap:6px;}
.lab-cm .cm-pick button{min-height:40px; border:2px solid var(--ink); border-radius:9px; background:var(--paper-2); font-weight:900; font-size:.9rem;}
.lab-cm .cm-pick button[aria-pressed="true"]{background:var(--ink); color:#fff;}
.lab-cm .cm-pick button:disabled{cursor:default;}
.lab-cm .cm-hint{font-size:.8rem; font-weight:700; color:#A3262B;}
.lab-cm .yes{color:#0B6B47;} .lab-cm .no-t{color:#A3262B;}
.lab-cm .cm-mx{width:100%; border-collapse:separate; border-spacing:6px; table-layout:fixed;}
.lab-cm .cm-mx th{font-size:.78rem; font-weight:900; text-align:center; padding:4px; line-height:1.2;}
.lab-cm .cm-mx thead th{background:var(--blue-wash); border:2px solid var(--ink); border-radius:8px;}
.lab-cm .cm-mx tbody th{background:var(--gold-wash); border:2px solid var(--ink); border-radius:8px;}
.lab-cm .cm-mx .ax{background:none !important; border:0 !important; color:var(--muted); letter-spacing:.08em; text-transform:uppercase; font-size:.7rem;}
.lab-cm .cm-mx td{border:2px solid var(--ink); border-radius:10px; text-align:center; padding:8px 4px; background:#fff;}
.lab-cm .cm-mx td b{display:block; font-family:var(--head); font-size:1.7rem; line-height:1.1;}
.lab-cm .cm-mx td small{font-weight:800; font-size:.72rem; color:var(--muted);}
.lab-cm .cm-mx td.t{background:var(--good-wash);} .lab-cm .cm-mx td.f{background:var(--bad-wash);}
.lab-cm .cm-mx tr > th:first-child{width:30%;}
.lab-cm .step{display:grid; gap:12px;}
.lab-cm .step.locked{opacity:.5;}
.lab-cm .stepk{display:flex; align-items:center; gap:8px; font-family:var(--head); font-weight:800; font-size:1.15rem;}
.lab-cm .stepk .n{width:30px; height:30px; border-radius:9px; background:var(--gold); border:2px solid var(--ink); display:grid; place-items:center; font-size:1rem; flex-shrink:0;}
.lab-cm .stepk .n.d{background:var(--good); color:#fff; border-color:var(--good);}
.lab-cm input[type=range]{width:100%; accent-color:var(--ink); min-height:40px;}
.lab-cm .mini4{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px;}
.lab-cm .mini4 .stat{padding:8px 10px;} .lab-cm .mini4 .stat .v{font-size:1.4rem;}
.lab-cm .mini4 .stat.hl{background:var(--bad-wash); border-color:var(--bad);}
@media (max-width:420px){ .lab-cm .mini4{grid-template-columns:repeat(2,minmax(0,1fr));} }
`;

export default {
  title: 'Confusion Matrix: the Mango Ripeness AI',
  mount(ctx) {
    const { rng } = ctx;
    const el = ctx.el;
    el.classList.add('lab-cm');

    // ---- seeded cards ----
    const cnt = { TP: rng.int(3, 5), TN: rng.int(3, 5) };
    cnt.FP = rng.int(1, Math.min(2, 12 - cnt.TP - cnt.TN - 1));
    cnt.FN = 12 - cnt.TP - cnt.TN - cnt.FP;
    const used = new Set();
    const score = k => { let s; do { s = rng.int(...RANGE[k]); } while (used.has(s)); used.add(s); return s / 100; };
    let cards = [];
    OUT.forEach(k => { for (let i = 0; i < cnt[k]; i++) cards.push({ out: k, score: score(k), ripe: k === 'TP' || k === 'FN' }); });
    cards = rng.shuffle(cards).map((c, i) => ({ ...c, n: i + 1 }));
    const accExact = (cnt.TP + cnt.TN) / 12 * 100;
    const acc1 = Math.round(accExact * 10) / 10;

    // ---- state (restored from ctx.data) ----
    const d = ctx.data;
    let ans = Array.isArray(d.ans) && d.ans.length === 12 ? d.ans.map(x => OUT.includes(x) ? x : null) : Array(12).fill(null);
    let stage = Number.isInteger(d.stage) ? Math.min(d.stage, 3) : 0;   // 0 sort, 1 accuracy, 2 threshold, 3 done
    let checked = stage > 0;          // after a check, wrong cards are flagged
    let accTries = 0, thr = 0.5, thrPick = d.thr ?? null, completed = false;
    if (stage > 0) ans = cards.map(c => c.out);

    const save = () => { d.ans = ans; d.stage = stage; d.thr = thrPick; ctx.save(); };

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">A fruit seller at the mandi tests <b>RipeCheck</b>, an AI that looks at a mango and predicts <b>Ripe</b> (positive) or <b>Not ripe</b> (negative). Here are its predictions for 12 mangoes and what each mango really was. Time to evaluate it!</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> sort all 12 predictions into the confusion matrix, calculate the accuracy, then choose the right threshold for a hospital.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div class="key"><b>The four outcomes</b>
        <div class="kgrid"><span><b>TP</b> AI said Ripe — it was ripe ✓</span><span><b>FP</b> AI said Ripe — it was not ripe ✗</span>
        <span><b>TN</b> AI said Not ripe — it was not ripe ✓</span><span><b>FN</b> AI said Not ripe — it was ripe ✗</span></div>
        <span class="small muted" style="display:block;margin-top:6px">First word: was the AI right (True) or wrong (False)? Second word: what did the AI predict (Positive = Ripe, Negative = Not ripe)?</span></div>
      <section class="step" id="s1"></section>
      <section class="step" id="s2"></section>
      <section class="step" id="s3"></section>
      <div id="cmEnd" aria-live="polite"></div>`;
    const S1 = el.querySelector('#s1'), S2 = el.querySelector('#s2'), S3 = el.querySelector('#s3'), END = el.querySelector('#cmEnd');

    const stepHead = (n, title, done) => `<div class="stepk"><span class="n ${done ? 'd' : ''}">${done ? ic('check', 'sm') : n}</span>${title}</div>`;
    const lab = r => r ? 'Ripe' : 'Not ripe';

    function hintFor(c, pick) {
      const predPos = c.score >= 0.5, pickPos = pick === 'TP' || pick === 'FP';
      if (predPos !== pickPos) return `The AI predicted <b>${lab(predPos)}</b>, so this is a <b>${predPos ? 'Positive' : 'Negative'}</b>.`;
      const right = predPos === c.ripe;
      return `Was the AI right? It said ${lab(predPos)} and the mango was ${lab(c.ripe)} → <b>${right ? 'True' : 'False'}</b>.`;
    }

    function matrixHTML(counts, verified, caption) {
      const cell = (k, cls) => `<td class="${verified ? cls : ''}"><small>${k}</small><b>${counts[k]}</b><small>${NAME[k]}</small></td>`;
      return `<table class="cm-mx" aria-label="Confusion matrix: rows are actual, columns are predicted">
        <caption class="small muted" style="caption-side:bottom;text-align:left;padding-top:4px">${caption}</caption>
        <thead><tr><th class="ax" scope="col"></th><th class="ax" scope="colgroup" colspan="2">Predicted by the AI →</th></tr>
        <tr><th class="ax" scope="col">Actual ↓</th><th scope="col">Predicted<br>Ripe</th><th scope="col">Predicted<br>Not ripe</th></tr></thead>
        <tbody><tr><th scope="row">Actually<br>Ripe</th>${cell('TP', 't')}${cell('FN', 'f')}</tr>
        <tr><th scope="row">Actually<br>Not ripe</th>${cell('FP', 'f')}${cell('TN', 't')}</tr></tbody></table>`;
    }

    function tally(arr) { const t = { TP: 0, FP: 0, TN: 0, FN: 0 }; arr.forEach(x => { if (x) t[x]++; }); return t; }

    // ---------- step 1: sort ----------
    function renderS1() {
      const done = stage > 0;
      const filled = ans.filter(Boolean).length;
      S1.innerHTML = `${stepHead(1, 'Sort each prediction', done)}
        <div class="lab-grid">
          <div class="cm-cards">${cards.map((c, i) => {
            const st = checked && ans[i] ? (ans[i] === c.out ? 'ok' : 'no') : '';
            return `<div class="cm-card ${st}" role="group" aria-label="Mango ${c.n}">
              <div class="hd"><span>🥭 #${c.n}</span>${st === 'ok' ? `<span class="chip ok">${ic('check', 'sm')}</span>` : ''}</div>
              <div class="ln"><span>AI said</span><b>${lab(c.score >= 0.5)} <span class="tiny muted">(${c.score.toFixed(2)})</span></b></div>
              <div class="ln"><span>Really</span><b class="${c.ripe ? 'yes' : 'no-t'}">${lab(c.ripe)}</b></div>
              <div class="cm-pick">${OUT.map(o => `<button data-i="${i}" data-o="${o}" aria-pressed="${ans[i] === o}" aria-label="Mango ${c.n}: ${NAME[o]}" ${done || st === 'ok' ? 'disabled' : ''}>${o}</button>`).join('')}</div>
              ${st === 'no' ? `<div class="cm-hint">${hintFor(c, ans[i])}</div>` : ''}
            </div>`;
          }).join('')}</div>
          <div class="lab-box mxbox">
            <h4>Your confusion matrix</h4>
            ${matrixHTML(tally(ans), done, done ? 'Verified: every prediction is in the right box.' : `Counts update as you sort (${filled}/12 sorted).`)}
            ${done ? '' : `<button class="btn primary block mt" id="chk" ${filled < 12 ? 'disabled' : ''}>${ic('check')} Check my matrix</button>
              <p class="small muted mt" id="s1msg" aria-live="polite">${filled < 12 ? 'Sort all 12 mangoes to check.' : ''}</p>`}
          </div>
        </div>`;
      S1.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; ans[i] = b.dataset.o; ctx.sfx('tick'); save(); renderS1();
        const nb = S1.querySelector(`[data-i="${i}"][data-o="${b.dataset.o}"]`); if (nb) nb.focus();
      });
      const chk = S1.querySelector('#chk');
      if (chk) chk.onclick = () => {
        checked = true;
        const wrong = cards.filter((c, i) => ans[i] !== c.out).length;
        if (!wrong) { stage = 1; ctx.sfx('ok'); save(); renderAll(); S2.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        ctx.sfx('bad'); renderS1();
        S1.querySelector('#s1msg').innerHTML = `<b class="err">${wrong} card${wrong > 1 ? 's are' : ' is'} in the wrong box.</b> Read the hint on each red card and fix it.`;
      };
    }

    // ---------- step 2: accuracy ----------
    function renderS2() {
      if (stage < 1) { S2.className = 'step locked'; S2.innerHTML = `${stepHead(2, 'Calculate the accuracy')}<p class="small muted">Finish step 1 to unlock.</p>`; return; }
      S2.className = 'step';
      const done = stage > 1;
      S2.innerHTML = `${stepHead(2, 'Calculate the accuracy', done)}
        <div class="formula">Accuracy = (TP + TN) ÷ (TP + TN + FP + FN) × 100%</div>
        ${done ? `<div class="fb good"><div class="h">${ic('check')} Accuracy = (${cnt.TP} + ${cnt.TN}) ÷ 12 × 100 = ${acc1.toFixed(1)}%</div><div>The AI was right on ${cnt.TP + cnt.TN} of 12 mangoes.</div></div>`
          : `<label class="small" for="accIn"><b>Type the accuracy to 1 decimal place</b> (e.g. 41.7)</label>
            <div class="numin"><input class="input" id="accIn" inputmode="decimal" autocomplete="off" placeholder="0.0"><b>%</b><button class="btn primary" id="accBtn">Check</button></div>
            <div id="accFb" aria-live="polite"></div>`}`;
      if (done) return;
      const inp = S2.querySelector('#accIn'), fb = S2.querySelector('#accFb');
      const go = () => {
        const raw = inp.value.trim().replace('%', '').replace(',', '.').trim();
        if (!/^\d+(\.\d+)?$/.test(raw)) { fb.innerHTML = `<p class="err">Type a number, like 41.7</p>`; return; }
        const dec = (raw.split('.')[1] || '').length, v = parseFloat(raw);
        if (Math.round(v * 10) === Math.round(acc1 * 10) && dec <= 1) { stage = 2; ctx.sfx('ok'); save(); renderAll(); S3.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        accTries++; ctx.sfx('bad');
        let msg;
        if (dec > 1 && Math.abs(v - accExact) < 0.06) msg = `So close! Now <b>round to 1 decimal place</b>.`;
        else if (Math.abs(v - (cnt.TP + cnt.TN)) < 0.01) msg = `That's the number of correct predictions (TP + TN). Now divide by the total (12) and multiply by 100.`;
        else if (accTries === 1) msg = `Not yet. Correct predictions are <b>TP + TN</b>. Use the numbers in your matrix.`;
        else msg = `Not yet. Correct = TP + TN = ${cnt.TP} + ${cnt.TN} = ${cnt.TP + cnt.TN}. Total = 12. So (${cnt.TP + cnt.TN} ÷ 12) × 100 = ? Round to 1 decimal place.`;
        fb.innerHTML = `<div class="fb bad"><div class="h">${ic('x')} Try again</div><div>${msg}</div></div>`;
      };
      S2.querySelector('#accBtn').onclick = go;
      inp.onkeydown = e => { if (e.key === 'Enter') go(); };
    }

    // ---------- step 3: threshold ----------
    function atThr(t) { const o = { TP: 0, FP: 0, TN: 0, FN: 0 }; cards.forEach(c => { const p = c.score >= t - 1e-9; o[p ? (c.ripe ? 'TP' : 'FP') : (c.ripe ? 'FN' : 'TN')]++; }); return o; }

    // stagger dots that sit close together so none hide each other
    const lane = new Map();
    [true, false].forEach(r => {
      const row = cards.filter(c => c.ripe === r).sort((x, y) => x.score - y.score);
      let prev = -1, k = 0;
      row.forEach(c => { k = c.score - prev < 0.05 ? k + 1 : 0; prev = c.score; lane.set(c, [0, -1, 1][k % 3]); });
    });

    function lineSVG(t) {
      const W = 360, H = 196, L = 16, R = 16, X = v => L + v * (W - L - R);
      const rowY = { true: 62, false: 128 };
      let g = `<rect x="${X(t)}" y="22" width="${X(1) - X(t)}" height="132" fill="#FFF1C2"/>`;
      g += `<text x="${X(1)}" y="16" text-anchor="end" style="font-size:11px">AI says Ripe →</text><text x="${X(0)}" y="16" style="font-size:11px">← AI says Not ripe</text>`;
      g += `<text x="${X(0) + 2}" y="${rowY.true - 22}" style="font-size:10px;fill:#5B606A">really ripe</text><text x="${X(0) + 2}" y="${rowY.false - 22}" style="font-size:10px;fill:#5B606A">really not ripe</text>`;
      g += `<line x1="${L}" y1="154" x2="${W - R}" y2="154" stroke="#15171C" stroke-width="2"/>`;
      [0, .25, .5, .75, 1].forEach(v => { g += `<line x1="${X(v)}" y1="154" x2="${X(v)}" y2="159" stroke="#15171C" stroke-width="2"/><text x="${X(v)}" y="172" text-anchor="${v === 0 ? 'start' : v === 1 ? 'end' : 'middle'}" style="font-size:11px">${v.toFixed(2)}</text>`; });
      g += `<text x="${W / 2}" y="190" text-anchor="middle" style="font-size:10px;fill:#5B606A">confidence score (how sure the AI is that it is ripe)</text>`;
      cards.forEach(c => {
        const p = c.score >= t - 1e-9, err = p !== c.ripe, y = rowY[c.ripe] + lane.get(c) * 17, x = X(c.score);
        g += `<circle cx="${x}" cy="${y}" r="8" fill="${c.ripe ? '#FFC800' : '#109A66'}" stroke="${err ? '#D93A40' : '#15171C'}" stroke-width="${err ? 3.5 : 1.5}"/>`;
        if (err) g += `<path d="M${x - 3.5} ${y - 3.5}l7 7M${x + 3.5} ${y - 3.5}l-7 7" stroke="#D93A40" stroke-width="2.4" stroke-linecap="round"/>`;
      });
      g += `<line x1="${X(t)}" y1="22" x2="${X(t)}" y2="158" stroke="#15171C" stroke-width="3" stroke-dasharray="6 4"/>`;
      return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" style="max-width:640px" role="img" aria-label="Mangoes placed on a 0 to 1 confidence line with the threshold at ${t.toFixed(2)}">${g}</svg>`;
    }

    function thrLive() {
      const o = atThr(thr), a = ((o.TP + o.TN) / 12 * 100).toFixed(1);
      S3.querySelector('#thrVal').textContent = thr.toFixed(2);
      S3.querySelector('#thrPlot').innerHTML = lineSVG(thr);
      S3.querySelector('#thrStats').innerHTML = OUT.map(k => `<div class="stat ${k[0] === 'F' && o[k] ? 'hl' : ''}"><div class="k">${k}</div><div class="v">${o[k]}</div></div>`).join('');
      S3.querySelector('#thrSay').textContent = `At threshold ${thr.toFixed(2)}: ${o.FP} false positive${o.FP === 1 ? '' : 's'}, ${o.FN} false negative${o.FN === 1 ? '' : 's'}, accuracy ${a}%.`;
    }

    const OPTS = [
      { id: 'low', t: 'A low threshold (about 0.30)', s: 'Flags more people for a check-up: fewer False Negatives, more False Positives (false alarms).' },
      { id: 'mid', t: 'Keep 0.50 — the threshold never matters', s: 'Use the same threshold for every problem.' },
      { id: 'high', t: 'A high threshold (about 0.80)', s: 'Flags only very sure cases: fewer false alarms, but more False Negatives.' }
    ];
    const opts = rng.shuffle(OPTS);
    const OPT_FB = {
      mid: 'Not quite. You just saw FP and FN change as the threshold moved, so the choice really matters, and it depends on which mistake is worse.',
      high: 'Not quite. A high threshold sends fewer people for check-ups, so more sick people are missed (more False Negatives). That is the dangerous mistake here.',
      low: 'Yes! In health screening a False Negative (missing a sick person) is the worst mistake. A lower threshold catches more real cases; the extra false alarms are sorted out by a doctor\'s check-up.'
    };

    function renderS3() {
      if (stage < 2) { S3.className = 'step locked'; S3.innerHTML = `${stepHead(3, 'Move the threshold')}<p class="small muted">Finish step 2 to unlock.</p>`; return; }
      S3.className = 'step';
      const done = stage > 2;
      S3.innerHTML = `${stepHead(3, 'Move the threshold', done)}
        <p class="small">RipeCheck gives every mango a <b>confidence score</b>. It says <b>Ripe</b> when the score is at or above the <b>threshold</b>. Drag the threshold and watch the mistakes trade places. <span class="muted">Yellow dots = really ripe, green dots = really not ripe, red cross = a mistake (FP or FN).</span></p>
        <div id="thrPlot"></div>
        <label class="row between" for="thr"><b>Threshold</b><span class="chip gold" id="thrVal">0.50</span></label>
        <input type="range" id="thr" min="0.05" max="0.95" step="0.05" value="${thr}" aria-describedby="thrSay">
        <div class="mini4" id="thrStats"></div>
        <p class="small" id="thrSay" aria-live="polite"></p>
        <div class="panel">
          <p><b>Question.</b> A hospital uses the same idea for a fever-screening camera. Positive = "may have a fever, send for a check-up". Missing someone who is really sick (a <b>False Negative</b>) is the dangerous mistake. Which threshold should it choose?</p>
          <div class="opts mt" id="thrOpts">${opts.map((o, i) => `<button class="opt ${thrPick === o.id ? (o.id === 'low' ? 'right' : 'wrong') : ''}" data-q="${o.id}" ${done ? 'disabled' : ''}><span class="k">${'ABC'[i]}</span><span><b>${o.t}</b><br><span class="small muted">${o.s}</span></span></button>`).join('')}</div>
          <div id="thrFb" class="mt" aria-live="polite">${thrPick ? fbHTML(thrPick) : ''}</div>
        </div>`;
      const sl = S3.querySelector('#thr');
      sl.oninput = () => { thr = Math.round(parseFloat(sl.value) * 100) / 100; thrLive(); };
      thrLive();
      S3.querySelectorAll('[data-q]').forEach(b => b.onclick = () => {
        thrPick = b.dataset.q;
        if (thrPick === 'low') { stage = 3; ctx.sfx('win'); save(); renderAll(); return; }
        ctx.sfx('bad'); save();
        S3.querySelectorAll('[data-q]').forEach(x => x.classList.toggle('wrong', x === b));
        S3.querySelector('#thrFb').innerHTML = fbHTML(thrPick);
      });
    }
    function fbHTML(id) { const ok = id === 'low'; return `<div class="fb ${ok ? 'good' : 'bad'}"><div class="h">${ic(ok ? 'check' : 'x')} ${ok ? 'Right' : 'Try again'}</div><div>${OPT_FB[id]}</div></div>`; }

    function renderEnd() {
      if (stage < 3) { END.innerHTML = ''; return; }
      END.innerHTML = `<div class="lab-done">${ic('check')}<div>You built a <b>confusion matrix</b> (TP ${cnt.TP}, FP ${cnt.FP}, TN ${cnt.TN}, FN ${cnt.FN}) and found <b>accuracy = ${acc1.toFixed(1)}%</b>. This is <b>Evaluation</b> in the AI Project Cycle — and which error is worse depends on the problem: in health screening a False Negative is the dangerous one.</div></div>
        <div class="row mt"><button class="btn sm" id="cmAgain">${ic('refresh')} Try again</button></div>`;
      END.querySelector('#cmAgain').onclick = () => { ans = Array(12).fill(null); stage = 0; checked = false; accTries = 0; thrPick = null; thr = 0.5; save(); renderAll(); el.scrollIntoView({ behavior: 'smooth' }); };
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Built a confusion matrix for 12 mango predictions, calculated accuracy ${acc1.toFixed(1)}% and chose a low threshold for hospital screening.`);
      }
    }

    function renderAll() { renderS1(); renderS2(); renderS3(); renderEnd(); }
    renderAll();
    return () => { el.classList.remove('lab-cm'); };
  }
};
