import { ic, esc, RM } from '../core/util.js';

const STAGES = ['Problem Scoping', 'Data Acquisition', 'Data Exploration', 'Modelling', 'Evaluation', 'Deployment'];

// Preventable Blindness: only the facts in CONTENT_SPEC §6. Other options describe
// what the stage needs in general, not claims about what the real team did.
const PROJECTS = {
  blind: {
    name: 'Preventable Blindness', emoji: '👁️',
    intro: 'Diabetic retinopathy is an eye disease that can cause blindness in people with diabetes if it is not detected early. India has too few eye specialists for the number of diabetic patients who need their eyes checked.',
    stages: [
      { q: 'What is the problem this project should solve?', o: [
        { t: 'Diabetic retinopathy can cause blindness if not caught early, and there are too few eye specialists to check every diabetic patient in time.', ok: 1, why: 'Yes. A clear problem statement names who is affected, what the problem is and why it matters.' },
        { t: 'Decide which deep-learning model to use, and which computers to buy, before talking to any doctors.', why: 'Choosing a model is Modelling (stage 4). First you must understand the problem.' },
        { t: 'Many people find eye drops too expensive, so make them cheaper at every chemist shop.', why: 'That is a different problem. The real need here is early detection of an eye disease.' }] },
      { q: 'What data does the team need?', o: [
        { t: 'Lots of retina photos graded by ophthalmologists (eye doctors). The real project used about 128,000.', ok: 1, why: 'Right. The model needs lots of relevant, labelled examples, and expert grading makes the labels reliable.' },
        { t: 'Selfies of patients\' faces downloaded from social media, because faces are easy to find.', why: 'Not relevant: face photos do not show the retina, and using them without consent would be wrong.' },
        { t: 'A few hundred retina photos with no grades, since the model can work out the grades itself.', why: 'Too little data, and with no grades the model cannot learn what disease looks like.' }] },
      { q: 'The images are collected. What should happen in Data Exploration?', o: [
        { t: 'Look at the data and make simple charts: how many images show each grade, and which photos are too blurry to use.', ok: 1, why: 'Yes. Exploring and visualising data helps you spot patterns, gaps and bad samples before training.' },
        { t: 'Send the app to hospitals straight away so patients can start using it this week.', why: 'That is Deployment, and the model has not even been built or tested yet.' },
        { t: 'Delete every image that shows disease so the data looks neat.', why: 'Then the model could never learn what disease looks like. Exploration checks the data; it does not remove the important part.' }] },
      { q: 'How should the model be built?', o: [
        { t: 'Train a deep-learning model on the graded images so it learns the signs of diabetic retinopathy itself.', ok: 1, why: 'Correct. This is a learning-based approach: the machine finds the patterns from examples.' },
        { t: 'Write an if-else rule by hand for every possible retina photo that could ever be taken.', why: 'No one can write rules for every possible photo. Patterns this complex are learned from data.' },
        { t: 'Make the model guess randomly, so that every patient has the same chance of being flagged.', why: 'Random guessing is not fair. It would miss sick patients. A model must learn from data.' }] },
      { q: 'How should the team evaluate the model?', o: [
        { t: 'Test it on retina images it has never seen and compare its answers with ophthalmologists\' grades, paying special attention to missed cases (False Negatives).', ok: 1, why: 'Yes. Testing data must be new to the model, and in health screening a False Negative (missing a sick eye) is the dangerous error.' },
        { t: 'Test it only on the images it was trained on, because those grades are already known to be correct.', why: 'The model has already seen those, so the score would look better than it really is. Use unseen testing data.' },
        { t: 'Check how quickly the app opens on a phone and how good its buttons and colours look.', why: 'Speed matters later, but evaluation first checks whether the predictions are correct.' }] },
      { q: 'How is the model deployed?', o: [
        { t: 'It was deployed with Aravind Eye Hospital (Madurai) to screen retina photos, so doctors can focus on the patients who need treatment. It keeps being monitored.', ok: 1, why: 'Correct. Deployment puts the model into real use inside a real system, and monitoring keeps it working well.' },
        { t: 'Close the eye clinics and replace every eye doctor with the AI, since it never gets tired.', why: 'The AI screens photos to help doctors; doctors still examine and treat patients.' },
        { t: 'Keep the finished model safely on one laptop in the research lab, so it never changes.', why: 'Then no patient would benefit. Deployment means real use.' }] }
    ]
  },
  edu: {
    name: 'Personalised Education AI', emoji: '🎓',
    intro: 'In a Class 9 room of 40 students, some race ahead and some fall behind, but everyone gets the same worksheet. Could an AI suggest the right practice for each student?',
    stages: [
      { q: 'What is the problem this project should solve?', o: [
        { t: 'Students learn at different speeds, so one lesson plan leaves some bored and others behind.', ok: 1, why: 'Yes. It names the stakeholders (students), the problem and the context (one plan for all).' },
        { t: 'Every student must finish the whole syllabus in the same week, whatever their speed.', why: 'That is a rule, not a problem statement, and it ignores the different needs of learners.' },
        { t: 'The school wants to use the newest AI model because other schools already have one.', why: 'Starting from a tool, not a problem, is a common mistake. Problem Scoping begins with a real need.' }] },
      { q: 'What data should be collected?', o: [
        { t: 'With permission from students and parents: quiz scores, time spent on each topic and which questions were answered wrongly.', ok: 1, why: 'Right. This data is relevant to learning, and consent protects students\' privacy.' },
        { t: 'Students\' private chats on their phones, read secretly so that they behave naturally.', why: 'That breaks privacy and trust, and it is not needed to plan practice.' },
        { t: 'Students\' shoe sizes, heights and favourite colours, because more data is always better.', why: 'These are not relevant features. They do not tell us how someone learns maths or science.' }] },
      { q: 'What should happen in Data Exploration?', o: [
        { t: 'Chart scores by topic to find where most students struggle and spot patterns.', ok: 1, why: 'Yes. Visualising data shows trends, gaps and outliers before you build a model.' },
        { t: 'Look only at the toppers\' marks, since they show what good learning looks like.', why: 'That hides the students who need the most help. Explore the whole data set.' },
        { t: 'Skip it and start building straight away, because the data was collected carefully.', why: 'Without exploring, you would not notice missing or messy data, or which features matter.' }] },
      { q: 'How should the model be built?', o: [
        { t: 'Train a model on past learning data so it recommends the next lesson or practice level for each student.', ok: 1, why: 'Correct. A learning-based model can adapt as it sees more data about each learner.' },
        { t: 'Give every student the same fixed worksheet, so that nobody feels left out.', why: 'That is the problem we started with. It is not personalised.' },
        { t: 'Rank all students by marks and put the list on the notice board every week.', why: 'That does not personalise learning and could hurt students. It is not a model for this goal.' }] },
      { q: 'How should the model be evaluated?', o: [
        { t: 'Try it with a test group of students and check whether its suggestions really help them improve; teachers review the results.', ok: 1, why: 'Yes. Evaluate on new data and real outcomes, with people who understand the students.' },
        { t: 'Count how many students liked the app\'s colours and cartoon characters.', why: 'Nice to know, but it does not show whether the predictions help learning.' },
        { t: 'Check it only on the same data it was trained on, so the results are easy to compare.', why: 'The model has seen that data already, so the result would look too good. Use testing data.' }] },
      { q: 'How should it be deployed?', o: [
        { t: 'Add it to the school\'s learning app, let teachers see and change its suggestions, and keep improving it with feedback.', ok: 1, why: 'Correct. Deployment includes monitoring and feedback, and keeping people in charge.' },
        { t: 'Launch it once in the learning app and never change it, so students do not get confused.', why: 'Students and syllabus change. A deployed model needs monitoring and updates.' },
        { t: 'Let the AI decide every student\'s final exam marks on its own, with no teacher involved.', why: 'That is not what it was built for, and important decisions need human accountability.' }] }
    ]
  }
};

const CSS = `
.lab-cw .cw-ring{max-width:340px; margin:0 auto; display:block; width:100%; height:auto;}
.lab-cw .cw-ring text{font-family:var(--head); font-weight:800;}
.lab-cw .stagelist{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; margin-top:10px;}
.lab-cw .stagelist span{font-size:.76rem; font-weight:800; border:2px solid var(--line); border-radius:8px; padding:4px 6px; background:#fff; color:var(--muted); line-height:1.2; display:flex; gap:5px; align-items:center;}
.lab-cw .stagelist span.d{border-color:var(--good); background:var(--good-wash); color:#0B6B47;}
.lab-cw .stagelist span.now{border-color:var(--ink); background:var(--gold); color:var(--ink);}
.lab-cw .stagelist b{font-family:var(--head);}
.lab-cw .ptabs{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px;}
.lab-cw .ptab > span:last-child{min-width:0; overflow-wrap:break-word;}
.lab-cw .ptab{display:flex; gap:8px; align-items:center; text-align:left; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:10px 12px; font-weight:800; min-height:56px; line-height:1.2;}
.lab-cw .ptab[aria-pressed="true"]{background:var(--gold-wash); outline:3px solid var(--gold-deep);}
.lab-cw .ptab .e{font-size:1.4rem;}
.lab-cw .ptab small{display:block; font-weight:700; color:var(--muted);}
.lab-cw .opt.wrong, .lab-cw .opt.right{cursor:default;}
@media (max-width:420px){ .lab-cw .stagelist{grid-template-columns:repeat(2,minmax(0,1fr));} .lab-cw .ptab{font-size:.9rem; padding:8px 10px;} .lab-cw .ptab .e{display:none;} }
`;

export default {
  title: 'Walk the AI Project Cycle',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-cw');
    const d = ctx.data;
    const prog = { blind: 0, edu: 0, ...(d.p || {}) };     // stages completed per project (0..6)
    let cur = d.cur in PROJECTS ? d.cur : 'blind';
    let tried = new Set();         // wrong options tried on this question
    let solved = false;            // current question answered correctly, waiting for "Next"
    let completed = false, raf = 0;
    let pos = prog[cur] % 6;       // token position (node index, may be fractional while animating)

    // seeded option order per project + stage
    const order = {};
    Object.keys(PROJECTS).forEach(k => { order[k] = PROJECTS[k].stages.map(s => ctx.rng.shuffle(s.o.map((_, i) => i))); });

    const save = () => { d.p = prog; d.cur = cur; ctx.save(); };
    const bothDone = () => prog.blind >= 6 && prog.edu >= 6;

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro">Every AI project moves through six stages. Walk two real-world projects through the cycle: at each stage, pick what the team should do.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> complete all 6 stages for <b>both</b> projects.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div class="ptabs" id="tabs"></div>
      <div class="lab-grid">
        <div class="lab-box"><div id="ringBox"></div><div class="stagelist" id="slist"></div></div>
        <div class="lab-box" id="qbox"></div>
      </div>
      <div id="cwEnd" aria-live="polite"></div>`;
    const TABS = el.querySelector('#tabs'), RING = el.querySelector('#ringBox'), SL = el.querySelector('#slist'), QB = el.querySelector('#qbox'), END = el.querySelector('#cwEnd');

    // ---------- the cycle ring ----------
    const C = 170, RR = 118;
    const ang = i => -Math.PI / 2 + i * Math.PI / 3;
    const pt = (i, r = RR) => [C + r * Math.cos(ang(i)), C + r * Math.sin(ang(i))];
    function ringSVG() {
      const done = prog[cur];
      let g = `<circle cx="${C}" cy="${C}" r="${RR}" fill="none" stroke="#E6DFCF" stroke-width="10"/>`;
      // progress arc
      if (done > 0) {
        const n = Math.min(done, 6);
        if (n >= 6) g += `<circle cx="${C}" cy="${C}" r="${RR}" fill="none" stroke="#109A66" stroke-width="10"/>`;
        else { const [x0, y0] = pt(0), [x1, y1] = pt(n); g += `<path d="M${x0} ${y0} A${RR} ${RR} 0 ${n > 3 ? 1 : 0} 1 ${x1} ${y1}" fill="none" stroke="#109A66" stroke-width="10" stroke-linecap="round"/>`; }
      }
      // arrowheads between nodes
      for (let i = 0; i < 6; i++) {
        const a = ang(i + 0.5), x = C + RR * Math.cos(a), y = C + RR * Math.sin(a), rot = a * 180 / Math.PI + 90;
        g += `<path d="M-6 -5 L4 0 L-6 5" transform="translate(${x} ${y}) rotate(${rot})" fill="none" stroke="#15171C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
      for (let i = 0; i < 6; i++) {
        const [x, y] = pt(i), isDone = i < done, now = i === done % 6 && done < 6;
        g += `<rect x="${x - 23}" y="${y - 23}" width="46" height="46" rx="13" fill="${isDone ? '#109A66' : now ? '#FFC800' : '#fff'}" stroke="#15171C" stroke-width="2.5"/>`;
        g += isDone ? `<path d="M${x - 9} ${y + 1} l6 6 l12 -13" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
          : `<text x="${x}" y="${y + 8}" text-anchor="middle" style="font-size:22px;fill:#15171C">${i + 1}</text>`;
      }
      const label = done >= 6 ? 'Cycle complete!' : STAGES[done];
      const words = label.split(' ');
      g += `<text x="${C}" y="${C - 22}" text-anchor="middle" style="font-size:13px;fill:#87620F;letter-spacing:.12em">${done >= 6 ? 'AND AGAIN…' : 'STAGE ' + (done + 1) + ' OF 6'}</text>`;
      words.forEach((w, k) => { g += `<text x="${C}" y="${C + 6 + k * 24}" text-anchor="middle" style="font-size:22px;fill:#15171C">${esc(w)}</text>`; });
      const [tx, ty] = tokenXY(pos);
      g += `<g id="tok" transform="translate(${tx} ${ty})"><circle r="10" fill="#E8453C" stroke="#15171C" stroke-width="2.5"/><circle r="3.5" fill="#fff"/></g>`;
      return `<svg class="cw-ring" viewBox="0 0 340 340" role="img" aria-label="AI Project Cycle: ${done} of 6 stages done for ${PROJECTS[cur].name}">${g}</svg>`;
    }
    function tokenXY(p) { const a = ang(p); return [C + (RR + 34) * Math.cos(a), C + (RR + 34) * Math.sin(a)]; }

    function moveToken(to, onEnd) {
      cancelAnimationFrame(raf);
      const from = pos, t0 = performance.now(), dur = RM ? 1 : 750;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        pos = from + (to - from) * e;
        const tok = RING.querySelector('#tok');
        if (tok) { const [x, y] = tokenXY(pos); tok.setAttribute('transform', `translate(${x} ${y})`); }
        if (k < 1) raf = requestAnimationFrame(step); else { pos = to % 6; raf = 0; onEnd && onEnd(); }
      };
      raf = requestAnimationFrame(step);
    }

    function renderTabs() {
      TABS.innerHTML = Object.entries(PROJECTS).map(([k, p]) => `<button class="ptab" data-p="${k}" aria-pressed="${k === cur}"><span class="e" aria-hidden="true">${p.emoji}</span><span>${p.name}<small>${prog[k] >= 6 ? '✓ Complete' : prog[k] + ' / 6 stages'}</small></span></button>`).join('');
      TABS.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
        if (b.dataset.p === cur) return;
        cancelAnimationFrame(raf); raf = 0;
        cur = b.dataset.p; pos = prog[cur] % 6; tried = new Set(); solved = false; save(); ctx.sfx('tick'); renderAll();
      });
    }
    function renderRing() {
      RING.innerHTML = ringSVG();
      SL.innerHTML = STAGES.map((s, i) => `<span class="${i < prog[cur] ? 'd' : i === prog[cur] ? 'now' : ''}"><b>${i + 1}</b>${s}</span>`).join('');
    }

    function renderQ() {
      const P = PROJECTS[cur], si = prog[cur];
      if (si >= 6) {
        const other = cur === 'blind' ? 'edu' : 'blind';
        QB.innerHTML = `<h4>${P.emoji} ${P.name}: all 6 stages done</h4>
          <p>Deployment is not the end. Once the model is in use, the team <b>monitors</b> it and collects <b>feedback</b>, which sends them back to Problem Scoping to improve it. That is why it is drawn as a <b>cycle</b>.</p>
          <div class="row mt">${prog[other] < 6 ? `<button class="btn primary" id="goOther">${PROJECTS[other].emoji} Now try ${PROJECTS[other].name} ${ic('arrow')}</button>` : ''}
          <button class="btn sm" id="redo">${ic('refresh')} Walk this project again</button></div>`;
        const go = QB.querySelector('#goOther');
        if (go) go.onclick = () => TABS.querySelector(`[data-p="${other}"]`).click();
        QB.querySelector('#redo').onclick = () => { prog[cur] = 0; pos = 0; tried = new Set(); solved = false; save(); renderAll(); };
        return;
      }
      const S = P.stages[si];
      QB.innerHTML = `${si === 0 ? `<p class="small muted mb">${P.intro}</p>` : ''}
        <div class="kicker">Stage ${si + 1} · ${STAGES[si]}</div>
        <h4 class="mt" style="margin-top:4px">${S.q}</h4>
        <div class="opts">${order[cur][si].map((oi, n) => {
          const o = S.o[oi], cls = solved && o.ok ? 'right' : tried.has(oi) ? 'wrong' : '';
          return `<button class="opt ${cls}" data-o="${oi}" ${solved || tried.has(oi) ? 'disabled' : ''}><span class="k">${'ABC'[n]}</span><span>${o.t}</span></button>`;
        }).join('')}</div>
        <div id="qfb" class="mt" aria-live="polite">${fbHTML(S)}</div>`;
      QB.querySelectorAll('[data-o]').forEach(b => b.onclick = () => choose(+b.dataset.o));
      const nx = QB.querySelector('#next');
      if (nx) nx.onclick = advance;
    }
    let lastWrong = -1;
    function fbHTML(S) {
      if (solved) {
        const o = S.o.find(x => x.ok);
        return `<div class="fb good"><div class="h">${ic('check')} Correct</div><div>${o.why}</div></div>
          <button class="btn primary mt" id="next">${prog[cur] === 5 ? 'Finish the cycle' : 'Next stage'} ${ic('arrow')}</button>`;
      }
      if (lastWrong >= 0) return `<div class="fb bad"><div class="h">${ic('x')} Not this one</div><div>${S.o[lastWrong].why}</div></div>`;
      return '';
    }
    function choose(oi) {
      const S = PROJECTS[cur].stages[prog[cur]];
      if (S.o[oi].ok) { solved = true; lastWrong = -1; ctx.sfx('ok'); }
      else { tried.add(oi); lastWrong = oi; ctx.sfx('bad'); }
      renderQ();
      const f = QB.querySelector(solved ? '#next' : '.opt:not(:disabled)'); if (f) f.focus();
    }
    function advance() {
      const from = prog[cur];
      prog[cur]++; solved = false; tried = new Set(); lastWrong = -1; save();
      QB.querySelector('#next').disabled = true;
      ctx.sfx(prog[cur] >= 6 ? 'win' : 'pop');
      moveToken(from + 1, () => { renderAll(); });
    }

    function renderEnd() {
      if (!bothDone()) { END.innerHTML = ''; return; }
      END.innerHTML = `<div class="lab-done">${ic('check')}<div>You walked two projects through the <b>AI Project Cycle</b>: Problem Scoping → Data Acquisition → Data Exploration → Modelling → Evaluation → <b>Deployment</b>. Deployment means putting the evaluated model into real use, like the Preventable Blindness screening with Aravind Eye Hospital, then monitoring and improving it.</div></div>`;
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete('Walked the Preventable Blindness and Personalised Education projects through all 6 stages of the AI Project Cycle.');
      }
    }

    function renderAll() { renderTabs(); renderRing(); renderQ(); renderEnd(); }
    renderAll();
    return () => { cancelAnimationFrame(raf); el.classList.remove('lab-cw'); };
  }
};
