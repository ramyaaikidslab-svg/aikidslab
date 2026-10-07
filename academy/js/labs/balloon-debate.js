import { ic, esc } from '../core/util.js';

const THEMES = [
  { id: 'health', n: 'Healthcare', e: '🏥' },
  { id: 'jobs', n: 'Jobs', e: '💼' },
  { id: 'edu', n: 'Education', e: '🎓' }
];
// b: 1 = benefit, 0 = risk. sp = how the point sounds in a speech.
const STATEMENTS = [
  { th: 'health', b: 1, t: 'AI can help doctors screen eye scans faster, so more patients are checked early.', sp: 'AI helps doctors screen eye scans faster, so more patients are checked before it is too late' },
  { th: 'health', b: 1, t: 'A health chatbot can answer simple questions at any hour, in the patient\'s own language.', sp: 'health chatbots can answer simple questions at any hour, in a patient\'s own language' },
  { th: 'health', b: 0, t: 'A diagnosis AI trained mostly on data from one group of people may be less accurate for others.', sp: 'a diagnosis AI trained mostly on one group of people can be less accurate for everyone else' },
  { th: 'health', b: 0, t: 'Patients\' health records could leak if the AI system that stores them is not kept secure.', sp: 'patients\' private health records could leak if AI systems are not kept secure' },
  { th: 'jobs', b: 1, t: 'AI can take over boring, repetitive tasks, so people have more time for creative work.', sp: 'AI can take over boring, repetitive tasks and free people for creative work' },
  { th: 'jobs', b: 1, t: 'New kinds of jobs appear, such as data annotators, AI trainers and AI testers.', sp: 'AI creates new kinds of jobs, like data annotators, AI trainers and AI testers' },
  { th: 'jobs', b: 0, t: 'Some routine jobs, such as data entry, may be automated, and workers need time and support to learn new skills.', sp: 'routine jobs like data entry may disappear faster than workers can learn new skills' },
  { th: 'jobs', b: 0, t: 'A hiring AI trained on past unfair decisions may unfairly reject some applicants.', sp: 'a hiring AI trained on past unfair decisions can quietly repeat that unfairness' },
  { th: 'edu', b: 1, t: 'An AI tutor can give each student practice at their own pace.', sp: 'AI tutors let every student practise at their own pace' },
  { th: 'edu', b: 1, t: 'Translation and text-to-speech tools help students learn in their own language or with a disability.', sp: 'translation and text-to-speech tools help students learn in their own language or with a disability' },
  { th: 'edu', b: 0, t: 'Students without a device or internet may fall further behind — the digital divide.', sp: 'students without devices or internet fall further behind, widening the digital divide' },
  { th: 'edu', b: 0, t: 'Copying AI answers without understanding them can weaken real learning.', sp: 'copying AI answers without understanding weakens real learning' }
];
const SIDES = {
  1: { n: 'Team Benefit', task: 'Argue that AI must <b>stay</b> in the balloon: its benefits are too valuable to lose.', open: 'Friends, judges, fellow passengers: if we throw AI out of this balloon, we lose a powerful helper.', close: 'Yes, AI has risks, and we must manage them carefully. But throwing it out would throw away all this good. Keep AI in the balloon!' },
  0: { n: 'Team Risk', task: 'Argue that AI should be <b>thrown out</b> of the balloon unless its risks are handled.', open: 'Friends, judges, fellow passengers: AI looks helpful, but it is carrying some dangerous weight.', close: 'AI can do good, but not until these risks are fixed: fair data, strong security and access for everyone. Until then, it goes over the side!' }
};

const CSS = `
.lab-bd .theme{background:#fff; border:2px solid var(--ink); border-radius:14px; overflow:hidden;}
.lab-bd .theme > h4{margin:0; padding:10px 14px; background:var(--gold-wash); border-bottom:2px solid var(--ink); display:flex; justify-content:space-between; align-items:center; gap:8px;}
.lab-bd .st{display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px 12px; align-items:center; padding:10px 14px; border-top:2px solid var(--line); font-weight:700;}
.lab-bd .st:first-of-type{border-top:0;}
.lab-bd .st.right{background:var(--good-wash);} .lab-bd .st.wrong{background:var(--bad-wash);}
.lab-bd .st .why{grid-column:1 / -1; font-size:.85rem; color:#A3262B;}
.lab-bd .seg button{min-height:42px; padding:7px 14px;}
.lab-bd .st .seg{justify-self:start;}
.lab-bd .seg button[data-v="1"][aria-pressed="true"]{background:var(--good); color:#fff;}
.lab-bd .seg button[data-v="0"][aria-pressed="true"]{background:var(--bad); color:#fff;}
.lab-bd .themes{display:grid; gap:12px;}
.lab-bd .pick{display:flex; gap:10px; align-items:flex-start; text-align:left; width:100%; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:10px 12px; font-weight:700; min-height:44px;}
.lab-bd .pick[aria-pressed="true"]{background:var(--gold-wash); outline:3px solid var(--gold-deep);}
.lab-bd .pick .bx{width:24px; height:24px; border:2px solid var(--ink); border-radius:7px; flex-shrink:0; display:grid; place-items:center; background:#fff;}
.lab-bd .pick[aria-pressed="true"] .bx{background:var(--ink); color:#fff;}
.lab-bd .pick:disabled{opacity:.45; cursor:not-allowed;}
.lab-bd .speech{background:#fff; border:3px solid var(--ink); border-radius:16px; padding:16px 18px; box-shadow:var(--sh-sm); font-size:1.05rem; display:grid; gap:10px; position:relative;}
.lab-bd .speech p{max-width:68ch;}
.lab-bd .speech .hl{background:var(--gold-wash); border-radius:3px; box-shadow:0 0 0 2px var(--gold-wash);}
.lab-bd .balloon{font-size:2.4rem; line-height:1;}
@media (max-width:520px){ .lab-bd .st{grid-template-columns:minmax(0,1fr);} }
`;

export default {
  title: 'Balloon Debate: benefits and risks of AI',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-bd');
    const d = ctx.data;
    // seeded statement order inside each theme, and the learner's assigned side
    const order = THEMES.map(T => ctx.rng.shuffle(STATEMENTS.map((s, i) => i).filter(i => STATEMENTS[i].th === T.id)));
    const assigned = ctx.rng.chance(0.5) ? 1 : 0;
    let side = d.side === 0 || d.side === 1 ? d.side : assigned;
    let sorts = Array.isArray(d.s) && d.s.length === 12 ? d.s.map(v => v === 0 || v === 1 ? v : null) : Array(12).fill(null);
    let checked = false;
    let sorted = !!d.sorted && sorts.every((v, i) => v === STATEMENTS[i].b);
    let picks = Array.isArray(d.p) ? d.p.filter(i => Number.isInteger(i) && STATEMENTS[i] && STATEMENTS[i].b === side).slice(0, 3) : [];
    let built = !!d.built && picks.length === 3, completed = false;
    const save = () => { d.s = sorts; d.sorted = sorted; d.side = side; d.p = picks; d.built = built; ctx.save(); };

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro"><span aria-hidden="true">🎈</span> A hot-air balloon is sinking and someone must be thrown out to keep it flying. One of the passengers is <b>AI</b>. Before the debate, sort the arguments, then build your team's speech.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> sort all 12 statements as a Benefit or a Risk of AI, then build a closing speech from your 3 strongest arguments.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <section id="bdSort" class="stack"></section>
      <section id="bdSpeech" class="stack"></section>
      <div id="bdEnd" aria-live="polite"></div>`;
    const SORT = el.querySelector('#bdSort'), SP = el.querySelector('#bdSpeech'), END = el.querySelector('#bdEnd');

    function renderSort() {
      const n = sorts.filter(v => v !== null).length;
      SORT.innerHTML = `<h4>1. Sort the statements ${sorted ? '<span class="chip ok">' + ic('check', 'sm') + ' All correct</span>' : `<span class="chip dim">${n}/12 sorted</span>`}</h4>
        <div class="themes">${THEMES.map((T, ti) => `<div class="theme"><h4><span><span aria-hidden="true">${T.e}</span> ${T.n}</span></h4>
          ${order[ti].map(i => {
            const v = sorts[i], st = (checked || sorted) && v !== null ? (v === STATEMENTS[i].b ? 'right' : 'wrong') : '';
            return `<div class="st ${st}"><span>${esc(STATEMENTS[i].t)}</span>
              <div class="seg" role="group" aria-label="Benefit or risk">
                <button data-i="${i}" data-v="1" aria-pressed="${v === 1}" ${sorted || st === 'right' ? 'disabled' : ''}>Benefit</button><button data-i="${i}" data-v="0" aria-pressed="${v === 0}" ${sorted || st === 'right' ? 'disabled' : ''}>Risk</button>
              </div>
              ${st === 'wrong' ? `<span class="why">Think again: does this make life better, or could it cause harm or unfairness?</span>` : ''}</div>`;
          }).join('')}</div>`).join('')}</div>
        ${sorted ? '' : `<div class="row"><button class="btn primary" id="bdChk" ${n < 12 ? 'disabled' : ''}>${ic('check')} Check my sorting</button><span class="small" id="bdChkMsg" aria-live="polite">${n < 12 ? 'Sort all 12 to check.' : ''}</span></div>`}`;
      SORT.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
        sorts[+b.dataset.i] = +b.dataset.v; ctx.sfx('tick'); save(); renderSort();
        const nb = SORT.querySelector(`[data-i="${b.dataset.i}"][data-v="${b.dataset.v}"]`); if (nb && !nb.disabled) nb.focus();
      });
      const chk = SORT.querySelector('#bdChk');
      if (chk) chk.onclick = () => {
        checked = true;
        const wrong = sorts.filter((v, i) => v !== STATEMENTS[i].b).length;
        if (!wrong) { sorted = true; ctx.sfx('ok'); save(); renderAll(); SP.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        ctx.sfx('bad'); renderSort();
        SORT.querySelector('#bdChkMsg').innerHTML = `<b class="err">${wrong} to fix</b> — they are marked in red.`;
      };
    }

    function renderSpeech() {
      if (!sorted) { SP.innerHTML = `<h4 style="opacity:.5">2. Build your speech</h4><p class="small muted">Sort all the statements correctly to unlock this.</p>`; return; }
      const S = SIDES[side];
      const pool = STATEMENTS.map((s, i) => i).filter(i => STATEMENTS[i].b === side);
      SP.innerHTML = `<h4>2. Build your speech</h4>
        <div class="lab-box"><div class="row between"><div><span class="kicker">You are on</span><h4 style="margin:0">${side ? '🌟' : '⚠️'} ${S.n}</h4></div>
          <button class="btn sm" id="bdSwap" ${built ? '' : ''}>Switch sides</button></div>
          <p class="mt">${S.task} Pick the <b>3 strongest arguments</b> for your side. <span class="muted small">Tip: strong speeches cover more than one theme.</span></p></div>
        <div class="stack" style="gap:8px">${pool.map(i => {
          const on = picks.includes(i), th = THEMES.find(t => t.id === STATEMENTS[i].th);
          return `<button class="pick" data-p="${i}" aria-pressed="${on}" ${!on && picks.length >= 3 ? 'disabled' : ''}><span class="bx">${on ? ic('check', 'sm') : ''}</span><span>${esc(STATEMENTS[i].t)} <span class="chip dim">${th.e} ${th.n}</span></span></button>`;
        }).join('')}</div>
        <div class="row"><button class="btn primary" id="bdBuild" ${picks.length === 3 ? '' : 'disabled'}>${ic('pen')} Build my speech</button><span class="small muted">${picks.length}/3 picked</span></div>
        <div id="bdOut" aria-live="polite">${built ? speechHTML() : ''}</div>`;
      SP.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
        const i = +b.dataset.p;
        picks = picks.includes(i) ? picks.filter(x => x !== i) : picks.concat(i);
        built = false; ctx.sfx('tick'); save(); renderSpeech(); renderEnd();
        const nb = SP.querySelector(`[data-p="${i}"]`); if (nb) nb.focus();
      });
      SP.querySelector('#bdSwap').onclick = () => { side = 1 - side; picks = []; built = false; ctx.sfx('pop'); save(); renderSpeech(); renderEnd(); };
      SP.querySelector('#bdBuild').onclick = () => { built = true; ctx.sfx('win'); save(); renderSpeech(); renderEnd(); SP.querySelector('#bdOut').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
    }

    function speechHTML() {
      const S = SIDES[side];
      const cap = s => s[0].toUpperCase() + s.slice(1);
      const lead = ['First', 'Second', 'Third'];
      const themes = new Set(picks.map(i => STATEMENTS[i].th));
      const counter = STATEMENTS.find((s, i) => s.b !== side && !picks.includes(i) && themes.has(s.th));
      return `<div class="speech">
        <div class="row"><span class="balloon" aria-hidden="true">🎈</span><div><span class="kicker">Closing speech · ${S.n}</span></div></div>
        <p>${S.open}</p>
        ${picks.map((i, k) => `<p><b>${lead[k]},</b> <span class="hl">${esc(STATEMENTS[i].sp)}</span>.</p>`).join('')}
        <p>${counter ? `Some will say ${esc(counter.sp)}. ` : ''}${S.close}</p>
      </div>
      <p class="small muted mt">Your speech covers ${themes.size} of 3 themes. ${themes.size === 1 ? 'Covering more themes would make it harder for the other team to answer.' : 'Good range!'} Notice the speech also answers one point from the other side: good debaters do that.</p>`;
    }

    function renderEnd() {
      if (!(sorted && built)) { END.innerHTML = ''; return; }
      END.innerHTML = `<div class="lab-done">${ic('check')}<div>You weighed the <b>advantages and disadvantages of AI</b> in healthcare, jobs and education. AI brings real benefits, but risks like <b>bias</b>, privacy leaks and the <b>digital divide</b> (unequal <b>AI access</b>) must be managed so that AI is fair for everyone.</div></div>`;
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Sorted 12 AI benefits and risks and built a ${SIDES[side].n} balloon-debate speech.`);
      }
    }

    function renderAll() { renderSort(); renderSpeech(); renderEnd(); }
    renderAll();
    return () => { el.classList.remove('lab-bd'); };
  }
};
