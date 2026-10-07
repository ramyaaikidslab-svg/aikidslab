import { esc, ic } from '../core/util.js';

// 4Ws Problem Canvas + Problem Statement Template (Problem Scoping).

const WS = [
  { id: 'who', label: 'Who', desc: 'stakeholders' },
  { id: 'what', label: 'What', desc: 'problem & evidence' },
  { id: 'where', label: 'Where', desc: 'context / situation' },
  { id: 'why', label: 'Why', desc: 'value of solving it' }
];
const WCOL = { who: 'var(--blue-wash)', what: 'var(--coral-wash)', where: 'var(--green-wash)', why: 'var(--violet-wash)' };

export const SCEN = [
  {
    id: 'water', emoji: '🚰', title: 'Water wasted at school taps',
    st: [
      ['who', 'Students and teachers who use the school taps every day.', 'It names people who are affected by the problem.'],
      ['who', 'The school management, which pays the water bill.', 'This is a group of people involved in the problem — a stakeholder.'],
      ['what', 'The eco-club measured about 200 litres of water wasted every day.', 'This is evidence that the problem exists, and how big it is.'],
      ['what', 'Taps are often left running or dripping after use.', 'This describes the problem itself.'],
      ['where', 'At the drinking-water and hand-wash taps near the playground.', 'This tells you the location.'],
      ['where', 'Mostly during the lunch break and after games period, when many students use the taps in a hurry.', 'This describes the situation and time when it happens — that is context.'],
      ['why', "Saving water would lower the school's water bill and help during summer shortages.", 'This is the value or benefit of solving the problem.'],
      ['why', 'Students would build water-saving habits they can take home.', 'This says how things get better if the problem is solved.']
    ],
    tpl: {
      who: [['students and teachers', ''], ['water-tanker drivers', 'They are not the people facing wasted water at school.'], ['the leaking taps', 'Taps are things. Stakeholders are people.']],
      what: [['taps are left running and water is wasted', ''], ['the school needs a swimming pool', 'Nobody found that problem in the 4Ws.'], ['students drink too much water', 'Drinking water is good! The problem is water being wasted.']],
      where: [['they use the taps in a hurry during breaks', ''], ['the school is closed for summer holidays', 'Nobody uses the taps then — so no waste.'], ['it rains heavily', 'Rain is not the situation we found in the 4Ws.']],
      why: [['save water and money by making sure taps are closed after use', ''], ['punish students who forget', "That doesn't describe a benefit for the stakeholders."], ['buy more water tankers', "That uses more water and doesn't stop the waste."]]
    }
  },
  {
    id: 'road', emoji: '🚸', title: 'Unsafe road crossing outside school',
    st: [
      ['who', 'Students who walk or cycle to school.', 'It names people who are affected by the problem.'],
      ['who', 'Parents and school staff who drop children at the gate.', 'This is a group of people involved — a stakeholder.'],
      ['what', "Vehicles don't slow down near the gate — there were 3 near-misses last month.", 'This is evidence that the problem is real.'],
      ['what', 'There is no zebra crossing or traffic warden at the gate.', 'This describes the problem itself.'],
      ['where', 'On the busy main road right outside the school gate.', 'This tells you the location.'],
      ['where', 'At 7:30–8:00 am and 1:30–2:00 pm, when school starts and ends.', 'This describes the time and situation — that is context.'],
      ['why', 'A safe crossing would prevent accidents and injuries.', 'This is the value of solving the problem.'],
      ['why', 'Parents would feel confident letting children walk or cycle to school.', 'This says how things get better if it is solved.']
    ],
    tpl: {
      who: [['students who walk or cycle to school', ''], ['the vehicles on the road', 'Vehicles are things. Stakeholders are people.'], ['the traffic signal', 'A signal is a thing, and there is none here anyway.']],
      what: [["crossing the road is unsafe because vehicles don't slow down", ''], ['their school bags are too heavy', 'That is a different problem from the one in the 4Ws.'], ['school starts too early', 'That is not the problem we found.']],
      where: [['they cross the main road at school opening and closing times', ''], ['they sleep at night', 'That is not when or where the problem happens.'], ['they play inside the school ground', 'The danger is on the road outside, not inside.']],
      why: [['let them cross safely and prevent accidents', ''], ['close the school gate forever', 'Students still need to get to school!'], ['make the road wider so cars go faster', 'Faster cars would make crossing even less safe.']]
    }
  },
  {
    id: 'food', emoji: '🍛', title: 'Food wasted in the canteen',
    st: [
      ['who', 'Students who eat lunch from the canteen.', 'It names people who are affected by the problem.'],
      ['who', 'The canteen staff who cook and serve the food.', 'This is a group of people involved — a stakeholder.'],
      ['what', 'About 15 kg of food is thrown away every day (weighed by the canteen).', 'This is evidence of the problem and how big it is.'],
      ['what', "Many students leave food because portions are too big or they don't like a dish.", 'This describes the problem and its cause.'],
      ['where', 'In the school canteen, at the plate-return counter.', 'This tells you the location.'],
      ['where', 'During the lunch break, especially on days with a new menu.', 'This describes the time and situation — that is context.'],
      ['why', 'Less waste would save money that could make meals better.', 'This is the value of solving the problem.'],
      ['why', 'Less food would end up in landfills, where it rots and gives off harmful gases.', 'This says how things get better if it is solved.']
    ],
    tpl: {
      who: [['students and canteen staff', ''], ['the dustbins', 'Dustbins are things. Stakeholders are people.'], ['the vegetable sellers', 'They are not the people facing this problem at school.']],
      what: [['a lot of cooked food is thrown away', ''], ['the canteen is too small', 'That is a different problem from the one in the 4Ws.'], ['the food is too cheap', 'Nobody found that problem.']],
      where: [['plates are returned after the lunch break', ''], ['the canteen is closed on Sundays', 'No food is wasted when it is closed.'], ['teachers check homework', 'That is not when or where food is wasted.']],
      why: [['cut waste and save money by serving the right portions', ''], ['close the canteen', 'Then students would have no lunch — not a benefit.'], ['make students finish every plate as a punishment', "Punishment isn't a benefit for the stakeholders."]]
    }
  }
];

const CSS = `
.lab-four-ws .scen{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px;}
@media (max-width:640px){ .lab-four-ws .scen{grid-template-columns:1fr;} }
.lab-four-ws .scen .opt{align-items:center;}
.lab-four-ws .scen .em{font-size:1.8rem; line-height:1;}
.lab-four-ws .brow .seg{display:grid; grid-template-columns:repeat(4,minmax(0,1fr));}
.lab-four-ws .brow .seg button{min-height:40px; min-width:58px; padding:7px 6px;}
@media (max-width:620px){ .lab-four-ws .brow .seg button{min-width:0;} }
.lab-four-ws .brow .hint{grid-column:1/-1; font-size:.86rem; color:#A3262B;}
.lab-four-ws .canvas4{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px;}
@media (max-width:560px){ .lab-four-ws .canvas4{grid-template-columns:1fr;} }
.lab-four-ws .canvas4 > div{border:var(--b2); border-radius:12px; padding:10px 12px; font-size:.92rem;}
.lab-four-ws .canvas4 b{font-family:var(--head); font-size:1.05rem;}
.lab-four-ws .canvas4 ul{padding-left:18px; margin-top:4px;}
.lab-four-ws .stmt{font-family:var(--head); font-size:1.15rem; font-weight:700; line-height:1.45;}
.lab-four-ws .stmt .bl{padding:1px 6px; border-radius:6px; border-bottom:3px solid var(--ink);}
.lab-four-ws .stmt .bl.empty{color:var(--faint); border-bottom-style:dashed;}
.lab-four-ws .blank{display:grid; gap:8px;}
.lab-four-ws .blank .opts{gap:8px;}
.lab-four-ws .final{background:#fff; border:var(--b); border-radius:var(--r); box-shadow:var(--sh); padding:18px;}
`;

export default {
  title: 'The 4Ws Problem Canvas',
  mount(ctx) {
    ctx.el.classList.add('lab-four-ws');
    const rng = ctx.rng;
    const S = {}; // per-scenario working state
    SCEN.forEach(sc => {
      S[sc.id] = {
        order: rng.shuffle(sc.st.map((_, i) => i)), ans: {}, checked: false, sorted: false,
        opts: Object.fromEntries(WS.map(w => [w.id, rng.shuffle(sc.tpl[w.id].map((_, i) => i))])), pick: {}, tchecked: false, solved: false
      };
    });
    const solvedIds = new Set(Array.isArray(ctx.data.solved) ? ctx.data.solved.filter(id => S[id]) : []);
    let cur = null, completed = false;

    const $ = s => ctx.el.querySelector(s);

    function render() {
      const sc = SCEN.find(s => s.id === cur), s = sc && S[cur];
      ctx.el.innerHTML = `<style>${CSS}</style>
        <p class="lab-intro">Before building any AI, we <b>scope the problem</b>. The 4Ws Problem Canvas asks: <b>Who</b> has the problem, <b>What</b> it is, <b>Where</b> it happens, and <b>Why</b> solving it matters.</p>
        <div class="banner"><span class="chip gold">Goal</span><span>Pick a scenario. Sort all 8 statements correctly, then build a correct <b>problem statement</b>.</span></div>
        <div><h4 class="mb">1 · Choose a scenario</h4><div class="scen">${SCEN.map(x => `<button class="opt" data-sc="${x.id}" aria-pressed="${x.id === cur}"><span class="em" aria-hidden="true">${x.emoji}</span><span>${esc(x.title)}${solvedIds.has(x.id) ? ' <span class="chip ok">✓ done</span>' : ''}</span></button>`).join('')}</div></div>
        ${sc ? sortHTML(sc, s) : ''}
        ${sc && s.sorted ? canvasHTML(sc, s) + tplHTML(sc, s) : ''}
        ${sc && s.solved ? finalHTML(sc, s) : ''}
        <div id="fwDone">${doneHTML()}</div>`;
      wire();
    }

    function sortHTML(sc, s) {
      return `<div class="lab-box"><div class="row between mb"><h4 style="margin:0">2 · Sort each statement into Who / What / Where / Why</h4><span class="chip">${Object.keys(s.ans).length} / 8 placed</span></div>
        <div class="stack" style="gap:8px">${s.order.map(i => {
          const [w, text, hint] = sc.st[i], a = s.ans[i], mark = s.checked && a ? (a === w ? 'right' : 'wrong') : '';
          return `<div class="brow ${mark}"><span>${mark === 'right' ? '✓ ' : mark === 'wrong' ? '✗ ' : ''}${esc(text)}</span>
            <div class="seg" role="group" aria-label="Which W?">${WS.map(x => `<button data-st="${i}" data-w="${x.id}" aria-pressed="${a === x.id}" ${s.sorted ? 'disabled' : ''}>${x.label}</button>`).join('')}</div>
            ${mark === 'wrong' ? `<span class="hint">Hint: ${esc(hint)}</span>` : ''}</div>`;
        }).join('')}</div>
        ${s.sorted ? `<p class="chip ok mt">✓ All 8 sorted correctly</p>` : `<div class="row mt"><button class="btn primary" id="fwCheck" ${Object.keys(s.ans).length < 8 ? 'disabled' : ''}>${ic('check')} Check my sorting</button><span class="small muted" aria-live="polite" id="fwMsg">${s.checked ? s.msg : 'Place all 8 to check.'}</span></div>`}
      </div>`;
    }

    function canvasHTML(sc) {
      return `<div class="lab-box"><h4>Your 4Ws Problem Canvas</h4><div class="canvas4 mt">${WS.map(w => `<div style="background:${WCOL[w.id]}"><b>${w.label}</b> <span class="tiny muted">${w.desc}</span><ul>${sc.st.filter(x => x[0] === w.id).map(x => `<li>${esc(x[1])}</li>`).join('')}</ul></div>`).join('')}</div></div>`;
    }

    function sentence(sc, s, mark) {
      const part = id => {
        const p = s.pick[id];
        if (p == null) return `<span class="bl empty">[${WS.find(w => w.id === id).desc}]</span>`;
        const bad = mark && p !== 0;
        return `<span class="bl" style="background:${bad ? 'var(--bad-wash)' : WCOL[id]}">${esc(sc.tpl[id][p][0])}</span>`;
      };
      return `Our ${part('who')} <b>has/have a problem that</b> ${part('what')} <b>when/while</b> ${part('where')}. <b>An ideal solution would</b> ${part('why')}.`;
    }

    function tplHTML(sc, s) {
      return `<div class="lab-box"><h4>3 · Build the Problem Statement Template</h4>
        <p class="small muted">Choose the best phrase for each blank. Use your 4Ws canvas above.</p>
        <p class="stmt mt panel" aria-live="polite">${sentence(sc, s, s.tchecked)}</p>
        <div class="stack mt">${WS.map(w => {
          const p = s.pick[w.id], wrong = s.tchecked && p != null && p !== 0;
          return `<div class="blank"><b class="small">${w.label} — ${w.desc}</b><div class="opts">${s.opts[w.id].map(k => {
            const cls = s.tchecked && p === k ? (k === 0 ? 'right' : 'wrong') : '';
            return `<button class="opt ${cls}" data-b="${w.id}" data-k="${k}" aria-pressed="${p === k}" ${s.solved ? 'disabled' : ''}>${esc(sc.tpl[w.id][k][0])}</button>`;
          }).join('')}</div>${wrong ? `<span class="small" style="color:#A3262B;font-weight:700">Hint: ${esc(sc.tpl[w.id][p][1])}</span>` : ''}</div>`;
        }).join('')}</div>
        ${s.solved ? '' : `<div class="row mt"><button class="btn primary" id="fwTCheck" ${Object.keys(s.pick).length < 4 ? 'disabled' : ''}>${ic('check')} Check my statement</button></div>`}
      </div>`;
    }

    function finalHTML(sc, s) {
      return `<div class="final"><div class="kicker">Problem statement · ${esc(sc.title)}</div>
        <p class="stmt mt">${sentence(sc, s, false).replace('has/have', 'have').replace('when/while', 'when')}</p></div>`;
    }

    function doneHTML() {
      if (!solvedIds.size && !ctx.done) return '';
      return `<div class="lab-done">${ic('check')}<div>${solvedIds.size ? `You scoped ${solvedIds.size === 1 ? 'a problem' : solvedIds.size + ' problems'}!` : 'Goal already met — try another scenario.'} You used the <b>4Ws Problem Canvas</b> (Who, What, Where, Why) and the <b>Problem Statement Template</b>. This is <b>Problem Scoping</b> — the first stage of the AI Project Cycle.</div></div>
        ${solvedIds.size && solvedIds.size < SCEN.length ? '<p class="small muted mt">Want more practice? Pick another scenario above.</p>' : ''}`;
    }

    function wire() {
      ctx.el.querySelectorAll('[data-sc]').forEach(b => b.onclick = () => { cur = b.dataset.sc; ctx.sfx('tick'); render(); });
      const sc = SCEN.find(x => x.id === cur), s = sc && S[cur];
      if (!sc) return;
      ctx.el.querySelectorAll('[data-st]').forEach(b => b.onclick = () => {
        s.ans[b.dataset.st] = b.dataset.w; s.checked = false; ctx.sfx('tick'); keep(() => render(), b);
      });
      const ck = $('#fwCheck');
      if (ck) ck.onclick = () => {
        const wrong = s.order.filter(i => s.ans[i] !== sc.st[i][0]).length;
        s.checked = true;
        if (!wrong) { s.sorted = true; ctx.sfx('ok'); ctx.toast('All 8 correct! Now build the problem statement.'); }
        else { s.msg = `${8 - wrong} right, ${wrong} to fix — read the hints.`; ctx.sfx('bad'); }
        render();
        if (s.sorted) $('.stmt')?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      };
      ctx.el.querySelectorAll('[data-b]').forEach(b => b.onclick = () => {
        s.pick[b.dataset.b] = +b.dataset.k; s.tchecked = false; ctx.sfx('tick'); keep(() => render(), b);
      });
      const tc = $('#fwTCheck');
      if (tc) tc.onclick = () => {
        s.tchecked = true;
        if (WS.every(w => s.pick[w.id] === 0)) { s.solved = true; solve(sc); }
        else ctx.sfx('bad');
        render();
        if (s.solved) $('.final')?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      };
    }

    // keep the tapped control under the finger after a full re-render
    function keep(fn, el) {
      const sel = el.dataset.st != null ? `[data-st="${el.dataset.st}"][data-w="${el.dataset.w}"]` : `[data-b="${el.dataset.b}"][data-k="${el.dataset.k}"]`;
      const y = el.getBoundingClientRect().top;
      fn();
      const n = ctx.el.querySelector(sel);
      if (n) { window.scrollBy(0, n.getBoundingClientRect().top - y); n.focus({ preventScroll: true }); }
    }

    function solve(sc) {
      solvedIds.add(sc.id);
      ctx.data.solved = [...solvedIds]; ctx.save();
      ctx.sfx('win');
      if (!completed && !ctx.done) { completed = true; ctx.complete(`Scoped the problem "${sc.title}" with the 4Ws canvas and a correct problem statement.`); }
    }

    render();
    return () => { ctx.el.classList.remove('lab-four-ws'); };
  }
};
