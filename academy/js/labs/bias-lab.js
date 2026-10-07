import { ic, esc } from '../core/util.js';

const GROUPS = [
  { n: 'North-Indian English', short: 'North', base: 900, col: '#2F6FED' },
  { n: 'South-Indian English', short: 'South', base: 80, col: '#E8453C' },
  { n: 'Northeast-Indian English', short: 'Northeast', base: 20, col: '#109A66' }
];
const BUDGET = 1000, STEP = 50, TARGET = 5;
// Deterministic saturating learning curve: more samples → higher accuracy, with diminishing returns.
const accOf = n => Math.round((50 + 45 * (1 - Math.exp(-n / 250))) * 10) / 10;
const CMDS = ['"Set an alarm for 6 am"', '"Call Papa"', '"What\'s the weather in Shillong?"', '"Play my study playlist"'];

const CSS = `
.lab-bias .grps{display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:10px;}
.lab-bias .grp{background:#fff; border:2px solid var(--ink); border-radius:12px; padding:12px; display:grid; gap:8px;}
.lab-bias .grp.worst{border-color:var(--bad); box-shadow:0 0 0 3px var(--bad-wash);}
.lab-bias .grp .hd{display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; font-weight:900;}
.lab-bias .grp .sw{display:inline-block; width:12px; height:12px; border-radius:4px; border:2px solid var(--ink); margin-right:6px; vertical-align:-1px;}
.lab-bias .lbl{display:flex; justify-content:space-between; font-size:.82rem; font-weight:800; color:var(--muted);}
.lab-bias .lbl b{color:var(--ink); font-variant-numeric:tabular-nums;}
.lab-bias .sbar{height:16px; border:2px solid var(--ink); border-radius:999px; background:#fff; overflow:hidden; display:flex;}
.lab-bias .sbar i{display:block; height:100%; transition:width .4s var(--ease);}
.lab-bias .sbar i.p{background-image:repeating-linear-gradient(45deg,var(--gold) 0 6px,#fff 6px 10px);}
.lab-bias .abar{height:16px; border:2px solid var(--ink); border-radius:999px; background:#fff; overflow:hidden; position:relative;}
.lab-bias .abar i{display:block; height:100%; transition:width .6s var(--ease);}
.lab-bias .ticks{font-size:1.05rem; letter-spacing:1px; line-height:1;}
.lab-bias .ticks .y{color:var(--good);} .lab-bias .ticks .n{color:var(--bad);}
.lab-bias .ctl{display:flex; gap:8px; flex-wrap:wrap;}
.lab-bias .ctl .btn{min-height:42px;}
.lab-bias .stats4{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px;}
.lab-bias .stats4 .stat .v{font-size:1.35rem;}
.lab-bias .stat.gap{background:var(--bad-wash); border-color:var(--bad);} .lab-bias .stat.gap.ok{background:var(--good-wash); border-color:var(--good);}
@media (max-width:520px){ .lab-bias .stats4{grid-template-columns:repeat(2,minmax(0,1fr));} }
`;

export default {
  title: 'Bias Lab: a fair voice assistant',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-bias');
    const d = ctx.data;
    const ok3 = a => Array.isArray(a) && a.length === 3 && a.every(x => Number.isInteger(x) && x >= 0);
    let trained = ok3(d.t) ? d.t : [0, 0, 0];   // extra samples already used for training
    let pending = [0, 0, 0];                      // collected but not yet trained
    let rounds = d.r || 0, msg = '', completed = false;
    const cmd = ctx.rng.pick(CMDS);
    const save = () => { d.t = trained; d.r = rounds; ctx.save(); };

    const spent = () => trained.reduce((a, b) => a + b, 0) + pending.reduce((a, b) => a + b, 0);
    const accs = () => GROUPS.map((g, i) => accOf(g.base + trained[i]));
    const gapOf = a => Math.round((Math.max(...a) - Math.min(...a)) * 10) / 10;

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro"><b>VaaniBot</b> is a voice assistant trained on recordings of people speaking English. Almost all its training samples came from one accent group, and the results show it. You have a budget to collect <b>${BUDGET.toLocaleString('en-IN')}</b> new voice samples (with speakers' permission). Spend it wisely, then retrain.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> make the accuracy gap between the best and worst group <b>less than ${TARGET} points</b>.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div class="stats4" id="bStats" aria-live="polite"></div>
      <div class="grps" id="bGroups"></div>
      <p class="small muted" style="margin-top:-6px">Striped bar = new samples you collected that the model has not learned from yet. Press <b>Retrain</b> to use them.</p>
      <div class="row">
        <button class="btn primary" id="bTrain">${ic('refresh')} Retrain the model</button>
        <button class="btn sm" id="bReset">Start over</button>
      </div>
      <div id="bMsg" aria-live="polite"></div>
      <div id="bEnd"></div>`;
    const STATS = el.querySelector('#bStats'), GR = el.querySelector('#bGroups'), MSG = el.querySelector('#bMsg'), END = el.querySelector('#bEnd');

    function render() {
      const a = accs(), gap = gapOf(a), best = Math.max(...a), worst = Math.min(...a);
      const left = BUDGET - spent();
      const totals = GROUPS.map((g, i) => g.base + trained[i] + pending[i]);
      const scale = Math.max(1000, ...totals);
      STATS.innerHTML = `
        <div class="stat"><div class="k">Best group</div><div class="v">${best.toFixed(1)}%</div></div>
        <div class="stat"><div class="k">Worst group</div><div class="v">${worst.toFixed(1)}%</div></div>
        <div class="stat gap ${gap < TARGET ? 'ok' : ''}"><div class="k">Gap</div><div class="v">${gap.toFixed(1)}</div></div>
        <div class="stat"><div class="k">Budget left</div><div class="v">${left}</div></div>`;
      GR.innerHTML = GROUPS.map((g, i) => {
        const hits = Math.round(a[i] / 10);
        return `<div class="grp ${a[i] === worst && gap >= TARGET ? 'worst' : ''}">
          <div class="hd"><span><span class="sw" style="background:${g.col}"></span>${g.n}</span>${a[i] === worst && gap >= TARGET ? '<span class="chip bad">Worst served</span>' : ''}</div>
          <div class="lbl"><span>Training samples</span><b>${(g.base + trained[i]).toLocaleString('en-IN')}${pending[i] ? ` <span style="color:var(--gold-ink)">+ ${pending[i]} new</span>` : ''}</b></div>
          <div class="sbar" role="img" aria-label="${g.base + trained[i]} samples trained, ${pending[i]} new samples waiting"><i style="width:${(g.base + trained[i]) / scale * 100}%;background:${g.col}"></i><i class="p" style="width:${pending[i] / scale * 100}%"></i></div>
          <div class="lbl"><span>Accuracy for this group</span><b>${a[i].toFixed(1)}%</b></div>
          <div class="abar" role="img" aria-label="Accuracy ${a[i].toFixed(1)} percent"><i style="width:${a[i]}%;background:${g.col}"></i></div>
          <div class="small"><span class="muted">Says ${esc(cmd)} 10 times → understood ${hits}/10</span>
            <div class="ticks" aria-hidden="true">${'<span class="y">●</span>'.repeat(hits)}${'<span class="n">○</span>'.repeat(10 - hits)}</div></div>
          <div class="ctl">
            <button class="btn sm" data-g="${i}" data-n="${STEP}" ${left < STEP ? 'disabled' : ''} aria-label="Collect ${STEP} more ${g.n} samples">+${STEP}</button>
            <button class="btn sm" data-g="${i}" data-n="${STEP * 2}" ${left < STEP * 2 ? 'disabled' : ''} aria-label="Collect ${STEP * 2} more ${g.n} samples">+${STEP * 2}</button>
            <button class="btn sm ghost" data-g="${i}" data-n="${-STEP}" ${pending[i] < STEP ? 'disabled' : ''} aria-label="Remove ${STEP} new ${g.n} samples">−${STEP}</button>
          </div>
        </div>`;
      }).join('');
      GR.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
        const i = +b.dataset.g, n = +b.dataset.n;
        pending[i] = Math.max(0, pending[i] + n); msg = ''; ctx.sfx('tick'); render();
        const nb = GR.querySelector(`[data-g="${i}"][data-n="${n}"]:not(:disabled)`); if (nb) nb.focus();
      });
      el.querySelector('#bTrain').disabled = !pending.some(Boolean);
      MSG.innerHTML = msg;
      renderEnd(gap);
    }

    function train() {
      const before = accs(), gapBefore = gapOf(before);
      const bestIdx = before.indexOf(Math.max(...before));
      const toBest = pending[bestIdx], total = pending.reduce((a, b) => a + b, 0);
      trained = trained.map((t, i) => t + pending[i]); pending = [0, 0, 0]; rounds++; save();
      const a = accs(), gap = gapOf(a);
      if (gap < TARGET) { msg = ''; ctx.sfx('win'); }
      else {
        ctx.sfx(gap < gapBefore ? 'ok' : 'bad');
        const left = BUDGET - spent();
        let tip;
        if (toBest === total) tip = `You only added samples to the group the model already understood best, so the gap got <b>bigger</b>. Data from the groups that were left out matters most.`;
        else if (gap < gapBefore) tip = `The gap shrank from ${gapBefore.toFixed(1)} to ${gap.toFixed(1)} points. Keep going: which group is still worst served?`;
        else tip = `The gap did not shrink. Look at which group has the fewest samples.`;
        if (left < STEP) tip += ` You have no budget left. Press <b>Start over</b> and spend it only where it is needed.`;
        msg = `<div class="fb ${gap < gapBefore ? 'good' : 'bad'}"><div class="h">${ic(gap < gapBefore ? 'check' : 'x')} Retrained: gap is now ${gap.toFixed(1)} points</div><div>${tip}</div></div>`;
      }
      render();
    }

    function renderEnd(gap) {
      if (gap >= TARGET) { END.innerHTML = ''; return; }
      const a = accs();
      END.innerHTML = `<div class="lab-done">${ic('check')}<div>Gap closed to <b>${gap.toFixed(1)} points</b> (${GROUPS.map((g, i) => `${g.short} ${a[i].toFixed(1)}%`).join(', ')}). <b>Bias came from the data</b>: the model was unfair because some groups were left out of its training data. Better, <b>more representative data</b> reduced the bias.</div></div>`;
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Reduced a voice assistant's accent accuracy gap to ${gap.toFixed(1)} points by collecting more representative training data.`);
      }
    }

    el.querySelector('#bTrain').onclick = train;
    el.querySelector('#bReset').onclick = () => { trained = [0, 0, 0]; pending = [0, 0, 0]; msg = ''; save(); ctx.sfx('pop'); render(); };
    render();
    return () => { el.classList.remove('lab-bias'); };
  }
};
