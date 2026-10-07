import { ic, esc } from '../core/util.js';

// Values a choice can lean towards. No choice is "right"; we only build a profile.
const VALUES = {
  safety: { n: 'Safety', e: '🛡️', d: 'protecting people from harm' },
  fairness: { n: 'Fairness', e: '⚖️', d: 'treating people equally and helping those who need it most' },
  privacy: { n: 'Privacy', e: '🔒', d: 'letting people control their personal data' },
  rules: { n: 'Rules & accountability', e: '📜', d: 'following agreed rules and keeping a human responsible' },
  benefit: { n: 'Greatest benefit', e: '🌟', d: 'doing the most good for the most people' }
};

const DILEMMAS = [
  {
    title: 'The self-driving car and the cow', emoji: '🚗',
    text: 'A self-driving car is carrying two passengers on a city road. A cow suddenly steps onto the road ahead. The lane next to the car is empty, but there is a solid white line, so crossing it breaks a traffic rule.',
    ask: 'What should the car be programmed to do?',
    roles: [
      { n: 'Passenger', v: 'I want a smooth ride, but most of all I want everyone to be unhurt, me included.' },
      { n: 'Car company engineer', v: 'Whatever we choose, the car will do it thousands of times. The rule must be clear and tested.' },
      { n: 'Traffic police officer', v: 'If self-driving cars cross solid lines whenever they think it is safe, roads could become unpredictable.' },
      { n: 'Animal-welfare volunteer', v: 'Animals on Indian roads are common. Cars must be designed to notice them and avoid hurting them.' }
    ],
    choices: [
      { t: 'Brake hard and stay in its lane', v: { rules: 2, safety: 1 }, c: ['Follows traffic rules, so other drivers can predict what it does.', 'Passengers get a sudden jolt, and the car behind must stop quickly too.', 'If braking is not enough, the cow could still be hit.'] },
      { t: 'Cross the solid line into the empty lane', v: { safety: 2 }, c: ['Most likely avoids the cow and keeps everyone unhurt this time.', 'Breaks a traffic rule. Should a machine decide when rules can be broken?', 'The sensors must be sure the lane really is empty.'] },
      { t: 'Slow down, honk and hand control to a human driver', v: { rules: 1, benefit: 1 }, c: ['Keeps a human responsible for a tricky choice.', 'A passenger may not react quickly enough in a sudden situation.', 'Raises the question: who is accountable when AI and a human share control?'] }
    ]
  },
  {
    title: 'Who gets free tutoring?', emoji: '📚',
    text: 'A school has 20 free after-school tutoring seats but 60 students who want one. The school plans to let an AI system choose who gets a seat.',
    ask: 'How should the AI choose?',
    roles: [
      { n: 'Student who is struggling', v: 'I really need the help. If seats go to students who are already doing well, I fall further behind.' },
      { n: 'Teacher', v: 'I want the seats to make the biggest difference, and I want to be able to explain every choice to parents.' },
      { n: 'Parent', v: 'My child also applied. I just want the process to be fair and clear to everyone.' },
      { n: 'Principal', v: 'Whatever we decide, we must be open about how the AI chooses.' }
    ],
    choices: [
      { t: 'Students with the lowest marks get seats first', v: { fairness: 2 }, c: ['Helps the students who need it most.', 'Students just above the cut-off get nothing, even if they are also struggling.', 'Marks alone may not show why a student is struggling.'] },
      { t: 'A lottery: every applicant has an equal chance', v: { fairness: 1, rules: 1 }, c: ['Simple, open and treats everyone the same.', 'A student who badly needs help may miss out by chance.', 'Easy to explain to everyone, which builds trust.'] },
      { t: 'The AI predicts who will improve the most', v: { benefit: 2 }, c: ['Could do the most good with limited seats.', 'Predictions can be wrong or biased by the data used.', 'Students should be told how they are being judged (transparency).'] }
    ]
  },
  {
    title: 'The loan app', emoji: '💳',
    text: 'A loan app helps small shopkeepers borrow money to grow their business. Many of them have never had a bank loan before, so there is little record of how they repay money.',
    ask: 'What should the app use to decide who gets a loan?',
    roles: [
      { n: 'First-time borrower (a vegetable seller)', v: 'I have run my stall for years but never had a bank account. I just want a fair chance.' },
      { n: 'Bank manager', v: 'If too many loans are not repaid, the bank cannot keep lending to anyone.' },
      { n: 'App developer', v: 'More data could mean better predictions, but people must trust the app with their data.' },
      { n: 'Government regulator', v: 'People have a right to know why a loan was refused, and their data must be protected.' }
    ],
    choices: [
      { t: 'Read the phone\'s contacts, messages and apps to judge each person', v: { benefit: 2 }, c: ['Could approve more first-time borrowers quickly.', 'Collects much more personal data than a loan decision needs.', 'People may not understand or agree to how their data is used.'] },
      { t: 'Use only income and repayment records, and explain every decision', v: { privacy: 1, rules: 1 }, c: ['Uses only relevant data and is transparent.', 'Many first-time borrowers have no records, so they may be refused.', 'An explained decision can be questioned and corrected.'] },
      { t: 'Approve only people with a long bank history', v: { safety: 1, rules: 1 }, c: ['Low risk for the lender.', 'Leaves out exactly the people the app was meant to help.', 'Can widen the gap between people who have access and those who do not.'] }
    ]
  },
  {
    title: 'The hospital queue assistant', emoji: '🏥',
    text: 'A busy hospital OPD has a long queue. An AI assistant reads each patient\'s symptoms at the entry desk and suggests who the doctor should see first.',
    ask: 'How should the queue be ordered?',
    roles: [
      { n: 'Patient waiting in the queue', v: 'I came early and have waited three hours. I want to know how the order is decided.' },
      { n: 'Doctor', v: 'I need to see the most urgent patients first, but the final call should be mine.' },
      { n: 'Hospital manager', v: 'The system must be fast, or the queue becomes even longer.' },
      { n: 'A patient\'s family member', v: 'If the AI makes a mistake, who is responsible?' }
    ],
    choices: [
      { t: 'Patients the AI scores as most urgent go first', v: { safety: 2 }, c: ['Urgent cases are seen sooner.', 'Some patients wait much longer and may not know why.', 'If the AI misreads symptoms, an urgent patient could be missed.'] },
      { t: 'Keep strict token order, first come first served', v: { fairness: 1, rules: 1 }, c: ['Clear and easy to understand.', 'A very sick patient may have to wait behind people with minor problems.', 'Does not use the AI at all.'] },
      { t: 'AI suggests an order, and a nurse checks and can change it', v: { safety: 1, rules: 1 }, c: ['Combines speed with a human who is accountable.', 'Takes more staff time.', 'People must be trained not to accept every AI suggestion blindly.'] }
    ]
  },
  {
    title: 'The smart camera in the park', emoji: '📷',
    text: 'The city wants to put AI cameras in a big public park to help find lost children and reduce theft. Thousands of people walk there every day.',
    ask: 'What kind of camera system should the city use?',
    roles: [
      { n: 'Parent of a young child', v: 'If my child gets lost, I want them found fast.' },
      { n: 'Elderly morning walker', v: 'I walk here every day. I do not like the idea of being recorded and recognised.' },
      { n: 'City council member', v: 'We must keep people safe, and we must also keep their trust.' },
      { n: 'Police officer', v: 'Cameras help, but only if we are allowed to use the footage when it really matters.' }
    ],
    choices: [
      { t: 'Recognise every visitor\'s face and keep the videos for a year', v: { safety: 2 }, c: ['Could find lost children and thieves quickly.', 'Records everyone, including people who did nothing wrong.', 'Stored face data could be misused or leaked.'] },
      { t: 'Only count people and spot crowding; store no faces', v: { privacy: 2 }, c: ['Protects visitors\' privacy.', 'Cannot help to find a specific lost child.', 'Still useful for safety, for example spotting dangerous crowds.'] },
      { t: 'Turn on face search only when a child is reported missing, with police permission; delete videos after 7 days', v: { rules: 1, safety: 1, privacy: 1 }, c: ['A balance between safety and privacy.', 'Needs clear rules and someone accountable for following them.', 'People should be told openly that the cameras exist.'] }
    ]
  },
  {
    title: 'The exam-proctoring AI', emoji: '💻',
    text: 'During an online test taken at home, an AI watches students through their webcams and flags anyone who looks away from the screen too often as "suspicious".',
    ask: 'What should happen when the AI flags a student?',
    roles: [
      { n: 'Student with a nervous habit', v: 'I look around when I think. I am worried the AI will think I am cheating.' },
      { n: 'Teacher', v: 'I want a fair test, but I also know my students. I do not want an innocent student punished.' },
      { n: 'Exam board', v: 'If cheating is easy, the marks mean nothing for anyone.' },
      { n: 'Parent', v: 'A camera in my child\'s bedroom during a test feels like a lot.' }
    ],
    choices: [
      { t: 'Automatically fail anyone the AI flags', v: { rules: 2 }, c: ['Strict and quick.', 'Innocent students with habits or disabilities could be punished.', 'No human checks the AI\'s decision, so no one is accountable.'] },
      { t: 'Flag only; a teacher watches the clip before any decision', v: { fairness: 2 }, c: ['A human checks before anyone is punished.', 'Takes teachers\' time.', 'Students should know how flagging works (transparency).'] },
      { t: 'Switch the camera AI off and set open-book questions instead', v: { privacy: 2 }, c: ['No webcam recording in students\' homes.', 'Test questions must be redesigned to check understanding.', 'Some kinds of cheating may still be possible.'] }
    ]
  }
];

const andList = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

const CSS = `
.lab-mm .scene{display:flex; gap:12px; align-items:flex-start;}
.lab-mm .scene .bigemoji{flex-shrink:0;}
.lab-mm .roles{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px;}
.lab-mm .roles .toggle{border-radius:12px; text-align:left; min-height:44px; padding:8px 12px; line-height:1.25;}
.lab-mm .views{display:grid; gap:8px;}
.lab-mm .view{background:#fff; border:2px solid var(--line); border-radius:10px; padding:8px 12px; font-size:.95rem;}
.lab-mm .view b{display:block; font-size:.82rem; color:var(--muted);}
.lab-mm .cons{display:grid; gap:6px; padding-left:20px;}
.lab-mm .vchips{display:flex; flex-wrap:wrap; gap:6px;}
.lab-mm .prow{display:grid; grid-template-columns:minmax(0,190px) minmax(0,1fr) 28px; gap:10px; align-items:center; font-weight:800;}
.lab-mm .prow .meter i{background:var(--violet);}
.lab-mm .qcount{margin-bottom:0;}
@media (max-width:520px){ .lab-mm .roles{grid-template-columns:minmax(0,1fr);} .lab-mm .prow{grid-template-columns:minmax(0,1fr) 28px;} .lab-mm .prow .meter{grid-column:1 / -1; grid-row:2;} }
`;

export default {
  title: 'Moral Machine: tricky AI choices',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-mm');
    const d = ctx.data;
    // answers: [{r: roleIndex, c: choiceIndex}] in dilemma order
    let ans = Array.isArray(d.a) ? d.a.filter(x => x && Number.isInteger(x.r) && Number.isInteger(x.c)).slice(0, 6) : [];
    let idx = Math.min(ans.length, 6);
    let role = null, pick = null, completed = false;
    // seeded order of choices inside each dilemma, so position never hints at anything
    const corder = DILEMMAS.map(D => ctx.rng.shuffle(D.choices.map((_, i) => i)));
    const save = () => { d.a = ans; ctx.save(); };

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">AI systems are making choices that affect real people. In each situation, step into someone's shoes, decide what the AI should do, and see how others might feel. <b>There are no right or wrong answers here</b> — only reasons.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> decide all 6 dilemmas and discover your priority profile.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div id="mmMain" class="stack"></div>`;
    const MAIN = el.querySelector('#mmMain');

    const dots = () => `<div class="dots" aria-hidden="true">${DILEMMAS.map((_, i) => `<i class="${i < idx ? 'ok' : i === idx ? 'now' : ''}"></i>`).join('')}</div>`;

    function renderDilemma() {
      const D = DILEMMAS[idx];
      const reflected = pick !== null;
      MAIN.innerHTML = `
        <div class="qcount"><span>Dilemma ${idx + 1} of ${DILEMMAS.length}</span>${dots()}</div>
        <div class="lab-box">
          <h4><span aria-hidden="true" style="font-size:1.4em">${D.emoji}</span> ${D.title}</h4><p>${D.text}</p>
        </div>
        <div class="lab-box">
          <h4>1. Whose shoes are you in?</h4>
          <div class="roles" role="group" aria-label="Choose a role">${D.roles.map((r, i) => `<button class="toggle" data-r="${i}" aria-pressed="${role === i}" ${reflected ? 'disabled' : ''}>${esc(r.n)}</button>`).join('')}</div>
          ${role !== null ? `<p class="small mt"><b>As the ${esc(D.roles[role].n.toLowerCase())}:</b> "${esc(D.roles[role].v)}"</p>` : ''}
        </div>
        <div class="lab-box" ${role === null ? 'style="opacity:.5"' : ''}>
          <h4>2. ${D.ask}</h4>
          ${role === null ? '<p class="small muted">Pick a role first.</p>' : `<div class="opts">${corder[idx].map((ci, n) => `<button class="opt" data-c="${ci}" aria-pressed="${pick === ci}" ${reflected ? 'disabled' : ''}><span class="k">${'ABC'[n]}</span><span>${esc(D.choices[ci].t)}</span></button>`).join('')}</div>`}
        </div>
        <div id="mmRef" aria-live="polite" ${reflected ? '' : 'hidden'}>${reflected ? reflectHTML(D) : ''}</div>`;
      MAIN.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { role = +b.dataset.r; ctx.sfx('tick'); renderDilemma(); });
      MAIN.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
        pick = +b.dataset.c; ctx.sfx('pop'); renderDilemma();
        const r = MAIN.querySelector('#mmRef'); r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      const nx = MAIN.querySelector('#mmNext');
      if (nx) nx.onclick = () => {
        ans[idx] = { r: role, c: pick }; idx++; role = null; pick = null; save();
        render(); el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }

    function reflectHTML(D) {
      const C = D.choices[pick];
      const others = D.roles.map((r, i) => ({ ...r, i })).filter(r => r.i !== role);
      return `<div class="lab-box">
          <h4>3. Things to think about</h4>
          <div class="vchips mb">${Object.keys(C.v).map(k => `<span class="chip">${VALUES[k].e} ${VALUES[k].n}</span>`).join('')}</div>
          <ul class="cons">${C.c.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <h4 class="mt">How others might see it</h4>
          <div class="views">${others.map(r => `<div class="view"><b>${esc(r.n)}</b>"${esc(r.v)}"</div>`).join('')}</div>
          <p class="small muted mt">Notice how the same choice can look very different depending on who you are. That is why AI rules should be decided openly, with many stakeholders.</p>
          <button class="btn primary mt" id="mmNext">${idx === DILEMMAS.length - 1 ? 'See my priority profile' : 'Next dilemma'} ${ic('arrow')}</button>
        </div>`;
    }

    function profile() {
      const t = Object.fromEntries(Object.keys(VALUES).map(k => [k, 0]));
      ans.forEach((a, i) => { Object.entries(DILEMMAS[i].choices[a.c].v).forEach(([k, w]) => { t[k] += w; }); });
      return t;
    }

    function renderProfile() {
      const t = profile(), max = Math.max(...Object.values(t), 1);
      const sorted = Object.keys(VALUES).sort((a, b) => t[b] - t[a]);
      const top = sorted.filter(k => t[k] === t[sorted[0]]);
      const names = top.map(k => `<b>${VALUES[k].n}</b> (${VALUES[k].d})`);
      MAIN.innerHTML = `
        <div class="qcount"><span>All 6 dilemmas decided</span>${dots()}</div>
        <div class="lab-box">
          <h4>Your priority profile</h4>
          <p class="small muted mb">Each choice leaned towards one or more values. Here is what you weighed most across the 6 dilemmas.</p>
          <div class="stack" style="gap:10px">${sorted.map(k => `<div class="prow"><span>${VALUES[k].e} ${VALUES[k].n}</span><div class="meter" role="img" aria-label="${VALUES[k].n}: ${t[k]} points"><i style="width:${t[k] / max * 100}%"></i></div><span class="mono">${t[k]}</span></div>`).join('')}</div>
          <p class="mt">You leaned most towards ${andList(names)}. Someone else could choose differently for good reasons, and that is the point.</p>
        </div>
        <div class="lab-box">
          <h4>Your choices</h4>
          <div class="views">${ans.map((a, i) => `<div class="view"><b>${DILEMMAS[i].emoji} ${esc(DILEMMAS[i].title)} · as the ${esc(DILEMMAS[i].roles[a.r].n.toLowerCase())}</b>${esc(DILEMMAS[i].choices[a.c].t)}</div>`).join('')}</div>
        </div>
        <div class="lab-done">${ic('check')}<div><b>AI Ethics:</b> ethical choices are hard and people disagree — just like in MIT's <b>Moral Machine</b>. Because AI follows the rules it is given, AI designers must decide these rules <b>openly</b>, thinking about every stakeholder, fairness, privacy, transparency and accountability.</div></div>
        <div class="row"><button class="btn sm" id="mmAgain">${ic('refresh')} Play again</button></div>`;
      MAIN.querySelector('#mmAgain').onclick = () => { ans = []; idx = 0; role = null; pick = null; save(); render(); };
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Decided 6 AI ethics dilemmas; leaned most towards ${andList(top.map(k => VALUES[k].n))}.`);
      }
    }

    function render() { if (idx >= DILEMMAS.length) renderProfile(); else renderDilemma(); }
    render();
    return () => { el.classList.remove('lab-mm'); };
  }
};
