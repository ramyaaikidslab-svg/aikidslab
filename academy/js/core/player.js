// The topic player: one step at a time, resumable, with a step list on the side.
import { esc, ic, h, sfx, toast, modal, xpFly } from './util.js';
import { S, touch, addXP, topicState, setTimeTopic } from './store.js';
import { rngFrom } from './rng.js';
import { C, topicById, conceptLabel, unitProgress, UNIT_ICONS } from './course.js';
import { runSession, quizItems, practiceItems, checkItems, resultCard, stars, celebrate, openConcepts } from './learn.js';
import { variantFor } from './course.js';
import { mountCode } from './code.js';
import { issue, downloadPNG, downloadPDF } from './cert.js';
import * as python from './python.js';
import { loadPDF } from './pdf.js';

let cleanup = null;
export function leavePlayer() { if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; } setTimeTopic(null); }

function stepLabel(t, s) {
  if (s.kind === 'card' || s.kind === 'project') return s.title;
  if (s.kind === 'check') return 'Quick check';
  if (s.kind === 'lab') return 'Lab: ' + s.title;
  if (s.kind === 'code') { const ex = C.exercises.get(s.ex); return 'Code: ' + (ex ? ex.title : s.ex); }
  if (s.kind === 'practice') return 'Practice';
  if (s.kind === 'quiz') return 'Mastery check';
  return s.kind;
}
const KIND_ICON = { card: 'book', project: 'pen', check: 'quiz', lab: 'lab', code: 'code', practice: 'target', quiz: 'star' };

export function renderTopic(main, topicId, stepParam, nav) {
  leavePlayer();
  const t = topicById(topicId);
  if (!t) { main.innerHTML = '<p>Topic not found.</p>'; return; }
  const ts = topicState(t.id);
  const steps = t.steps;
  const furthest = () => Math.max(ts.step || 0, ...Object.keys(ts.steps).map(Number).map(x => x + 1).filter(x => x < steps.length), 0);
  let i = stepParam != null && !isNaN(stepParam) ? Math.min(+stepParam, steps.length - 1) : Math.min(ts.step || 0, steps.length - 1);
  if (i > furthest()) i = furthest();
  setTimeTopic(t.id);
  const u = t.unit;

  main.innerHTML = `<div class="player u-${u.color}">
    <aside class="steps-side" aria-label="Steps"><h4>${esc(t.title)}</h4><div data-steps></div></aside>
    <section>
      <div class="phead">
        <a class="btn sm" href="#/u/${u.id}">${ic('back', 'sm')} ${esc(u.short)}</a>
        <div class="t"><div class="kicker">${esc(u.short)} · Topic ${t.index + 1} of ${u.topics.length}</div><h2>${esc(t.title)}</h2></div>
        <span class="chip dim">${ic('clock', 'sm')} ~${t.minutes} min</span>
      </div>
      <div class="pbar"><i data-pbar></i></div>
      <div class="stage" data-stage></div>
    </section>
  </div>`;
  const stage = main.querySelector('[data-stage]');

  function sidebar() {
    const f = furthest();
    main.querySelector('[data-steps]').innerHTML = steps.map((s, k) => {
      const done = !!ts.steps[k], now = k === i, open = k <= f || done;
      return `<button class="sstep ${done ? 'done' : ''} ${now ? 'now' : ''}" data-go="${k}" ${open ? '' : 'disabled'}><span class="d">${done ? ic('check') : ''}</span>${esc(stepLabel(t, s))}</button>`;
    }).join('');
    main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
    const pct = Math.round(Object.keys(ts.steps).length / steps.length * 100);
    main.querySelector('[data-pbar]').style.width = pct + '%';
  }
  function go(k) { nav(`#/t/${t.id}/${k}`); }
  function complete(k) { if (!ts.steps[k]) { ts.steps[k] = true; touch(); } sidebar(); maybeFinishCapstone(); }

  function navRow(canNext, { skippable = false } = {}) {
    const last = i === steps.length - 1;
    const row = h(`<div class="navrow">
      <div class="row">${i > 0 ? `<button class="btn sm" data-prev>${ic('back', 'sm')} Back</button>` : ''}${skippable ? `<button class="linkbtn" data-skip>Skip for now</button>` : ''}</div>
      ${last ? (ts.done || !steps.some(x => x.kind === 'quiz') ? `<a class="btn ${ts.done ? 'primary' : ''}" href="#/u/${u.id}">Back to ${esc(u.short)} ${ic('arrow')}</a>` : '') : `<button class="btn primary" data-next ${canNext ? '' : 'disabled'}>Next ${ic('arrow')}</button>`}
    </div>`);
    // On the last step of a project topic, show what's still missing for the certificate.
    if (last && !ts.done && !steps.some(x => x.kind === 'quiz')) {
      const missing = steps.map((x, k) => k).filter(k => k !== i && !ts.steps[k]);
      if (missing.length) {
        const note = h(`<div class="warn mt"><b>Almost there.</b> To earn this project's certificate, finish: ${missing.map(k => `<button class="linkbtn" data-jump="${k}">${esc(stepLabel(t, steps[k]))}</button>`).join(', ')}.</div>`);
        note.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => go(+b.dataset.jump));
        const wrapRow = h('<div></div>'); wrapRow.appendChild(note); wrapRow.appendChild(row); return wrapRow;
      }
    }
    row.querySelector('[data-prev]') && (row.querySelector('[data-prev]').onclick = () => go(i - 1));
    row.querySelector('[data-next]') && (row.querySelector('[data-next]').onclick = () => { complete(i); go(i + 1); });
    row.querySelector('[data-skip]') && (row.querySelector('[data-skip]').onclick = () => { ts.step = Math.max(ts.step, i + 1); touch(); toast('Skipped for now — come back any time from the step list.'); go(i + 1); });
    return row;
  }
  const enableNext = () => { const b = stage.querySelector('[data-next]'); if (b) { b.disabled = false; b.focus({ preventScroll: true }); } };

  function render() {
    ts.step = Math.max(ts.step || 0, i); S.state.last = `#/t/${t.id}/${i}`; touch();
    sidebar();
    const s = steps[i];
    stage.innerHTML = '';
    stage.appendChild(h(`<div class="stage-k">${ic(KIND_ICON[s.kind] || 'book', 'sm')} Step ${i + 1} of ${steps.length}</div>`));
    if (s.kind === 'card' || s.kind === 'project') {
      stage.appendChild(h(`<div class="fade-in"><h3>${esc(s.title)}</h3><div class="lesson">${s.html}</div></div>`));
      stage.appendChild(navRow(true));
      if (i === steps.length - 1) { complete(i); maybeFinishCapstone(); }
    } else if (s.kind === 'check') {
      const box = h('<div></div>'); stage.appendChild(box);
      const items = checkItems(t, s.concepts, s.n, i);
      if (!items.length) { complete(i); stage.appendChild(navRow(true)); return; }
      runSession(box, { mode: 'check', topic: t, items, title: 'Quick check', onDone: r => {
        complete(i);
        box.innerHTML = `<div class="fb ${r.right === r.total ? 'good' : 'bad'}"><div class="h">${ic(r.right === r.total ? 'check' : 'target')} ${r.right} of ${r.total} right</div><div>${r.right === r.total ? 'You have this idea. Keep going!' : 'Good effort — the idea you missed will come back as a fresh question in practice and in your Mistake Gym.'}</div></div>`;
        stage.appendChild(navRow(true));
      } });
    } else if (s.kind === 'lab') {
      const labState = S.state.labs[s.lab] = S.state.labs[s.lab] || {};
      const wrap = h(`<div class="fade-in"><h3>${esc(s.title)}</h3><p class="lab-intro">${s.intro || ''}</p><div class="lab" data-lab><div class="loading"><span class="spin"></span>Loading lab…</div></div></div>`);
      stage.appendChild(wrap);
      const done = !!labState.done || !!ts.steps[i];
      stage.appendChild(navRow(done, { skippable: !done }));
      import(`../labs/${s.lab}.js`).then(mod => {
        const el = wrap.querySelector('[data-lab]'); el.innerHTML = '';
        labState.data = labState.data || {};
        // The portfolio includes the learner's SDG project report if they made one.
        if (s.lab === 'portfolio') { const sdg = S.state.labs['sdg-project']; if (sdg && sdg.data && sdg.data.report) labState.data.sdgReport = sdg.data.report; }
        let completed = false;
        const ctx = {
          el, rng: rngFrom(S.state.seed, 'lab', s.lab), user: { name: S.state.profile.name }, data: labState.data,
          save: () => touch(), done, sfx, toast, python, pdf: loadPDF,
          complete: summary => {
            if (completed) return; completed = true;
            if (!labState.done) { labState.done = true; labState.at = Date.now(); addXP(30); xpFly(30); }
            labState.summary = String(summary || '').slice(0, 200);
            complete(i); touch(); enableNext();
            const sk = stage.querySelector('[data-skip]'); if (sk) sk.remove();
          }
        };
        cleanup = mod.default.mount(ctx) || null;
      }).catch(err => {
        wrap.querySelector('[data-lab]').innerHTML = `<div class="warn"><b>This lab couldn't load.</b> Check your connection and reload the page. You can skip it for now and come back.</div>`;
        console.error(err);
      });
    } else if (s.kind === 'code') {
      const ex = C.exercises.get(s.ex);
      const box = h('<div></div>'); stage.appendChild(box);
      if (!ex) { box.innerHTML = '<p>Exercise missing.</p>'; stage.appendChild(navRow(true)); return; }
      box.appendChild(h(`<h3>${esc(ex.title)}</h3>`));
      const inner = h('<div></div>'); box.appendChild(inner);
      const passed = !!(S.state.py[ex.id] && S.state.py[ex.id].passed);
      stage.appendChild(navRow(passed, { skippable: !passed }));
      cleanup = mountCode(inner, ex, { onPass: () => { complete(i); enableNext(); const sk = stage.querySelector('[data-skip]'); if (sk) sk.remove(); maybeFinishCapstone(); } });
    } else if (s.kind === 'practice') {
      practiceStep(s);
    } else if (s.kind === 'quiz') {
      quizStep(s);
    }
  }

  function practiceStep(s) {
    const box = h('<div class="fade-in"></div>'); stage.appendChild(box);
    const open = openConcepts().filter(c => c.topic === t.id).length;
    box.innerHTML = `<h3>Practice</h3><div class="lesson"><p>${s.n} questions picked just for you${open ? `, starting with <b>${open} idea${open > 1 ? 's' : ''}</b> you found tricky` : ''}. Get one wrong and a <b>new question on the same idea</b> comes back a little later.</p></div>
      <div class="row mt"><button class="btn primary big" data-start>${ic('play')} Start practice</button></div>`;
    stage.appendChild(navRow(!!ts.steps[i]));
    box.querySelector('[data-start]').onclick = () => {
      ts.practiceN = (ts.practiceN || 0) + 1; touch();
      const items = practiceItems(t, s.n, ts.practiceN);
      stage.querySelector('.navrow').remove();
      runSession(box, { mode: 'practice', topic: t, items, title: 'Practice', onDone: r => {
        complete(i);
        box.innerHTML = '';
        box.appendChild(resultCard(r, { title: 'Practice complete', actions: `<button class="btn" data-again>${ic('refresh', 'sm')} Practise again</button>` }));
        box.querySelector('[data-again]').onclick = () => practiceAgain(box, s);
        stage.appendChild(navRow(true));
      } });
    };
  }
  function practiceAgain(box, s) {
    stage.querySelector('.navrow')?.remove();
    ts.practiceN = (ts.practiceN || 0) + 1; touch();
    runSession(box, { mode: 'practice', topic: t, items: practiceItems(t, s.n, ts.practiceN), title: 'Practice', onDone: r => {
      box.innerHTML = ''; box.appendChild(resultCard(r, { title: 'Practice complete', actions: `<button class="btn" data-again>${ic('refresh', 'sm')} Practise again</button>` }));
      box.querySelector('[data-again]').onclick = () => practiceAgain(box, s);
      stage.appendChild(navRow(true));
    } });
  }

  function quizStep(s) {
    const box = h('<div class="fade-in"></div>'); stage.appendChild(box);
    const best = ts.best || 0;
    box.innerHTML = `<h3>Mastery check</h3>
      <div class="lesson"><p><b>${s.n} questions</b>, different from anyone else's. Score <b>${Math.round(s.pass * 100)}%</b> or more to master this topic and earn its certificate. You'll see the explanation after each answer.</p>
      ${ts.done ? `<div class="key"><b>Mastered</b>Best score ${Math.round(best * 100)}% · ${'★'.repeat(stars(best))}${'☆'.repeat(3 - stars(best))}. Retake any time to raise your stars.</div>` : ts.attempts ? `<div class="eg"><b>Tip</b>Your last best was ${Math.round(best * 100)}%. Each retake gives you new questions.</div>` : ''}</div>
      <div class="row mt"><button class="btn primary big" data-start>${ic('star')} ${ts.attempts ? 'Retake' : 'Start'} mastery check</button>${ts.done ? `<button class="btn" data-cert>${ic('cert', 'sm')} My certificate</button>` : ''}</div>`;
    stage.appendChild(navRow(false));
    box.querySelector('[data-cert]') && (box.querySelector('[data-cert]').onclick = () => certModal(Object.values(S.state.certs).find(c => c.kind === 'topic' && c.ref === t.id)));
    box.querySelector('[data-start]').onclick = () => {
      ts.attempts = (ts.attempts || 0) + 1; touch();
      const items = quizItems(t, s.n, ts.attempts);
      stage.querySelector('.navrow')?.remove();
      runSession(box, { mode: 'quiz', topic: t, items, title: 'Mastery check', onDone: r => {
        const passed = r.score >= s.pass - 1e-9;
        ts.quiz.push({ at: Date.now(), score: r.score }); if (ts.quiz.length > 20) ts.quiz.shift();
        ts.best = Math.max(ts.best || 0, r.score);
        box.innerHTML = '';
        if (passed) {
          complete(i);
          const first = !ts.done;
          ts.done = true; ts.at = ts.at || Date.now();
          if (first) addXP(50);
          const cert = issue('topic', t.id, t.title, { unitTitle: u.title, stars: stars(ts.best) });
          cert.stars = stars(ts.best);
          touch(); celebrate();
          box.appendChild(resultCard(r, { pass: s.pass, passed: true, title: 'Mastery check', actions: `<button class="btn primary" data-cert>${ic('cert', 'sm')} View certificate</button><button class="btn" data-retake>${ic('refresh', 'sm')} Retake for more stars</button>` }));
          box.querySelector('[data-cert]').onclick = () => certModal(cert);
          box.querySelector('[data-retake]').onclick = () => quizStepRetake();
          checkUnitAndCourse();
          const nextT = u.topics[t.index + 1];
          stage.appendChild(h(`<div class="navrow"><a class="btn" href="#/u/${u.id}">${ic('back', 'sm')} ${esc(u.short)}</a>${nextT ? `<a class="btn primary" href="#/t/${nextT.id}">Next topic: ${esc(nextT.title)} ${ic('arrow')}</a>` : `<a class="btn primary" href="#/">Dashboard ${ic('arrow')}</a>`}</div>`));
          if (first) setTimeout(() => { if (location.hash.startsWith(`#/t/${t.id}`)) certModal(cert, true); }, 900);
        } else {
          box.appendChild(resultCard(r, { pass: s.pass, passed: false, title: 'Mastery check', actions: `<button class="btn primary" data-weak>${ic('target', 'sm')} Practise these ideas</button><button class="btn" data-retake>${ic('refresh', 'sm')} Retake with new questions</button>` }));
          box.querySelector('[data-retake]').onclick = () => quizStepRetake();
          box.querySelector('[data-weak]').onclick = () => weakPractice(box, Object.keys(r.weak));
          stage.appendChild(navRow(false));
        }
      } });
    };
  }
  function quizStepRetake() { render(); stage.querySelector('[data-start]')?.click(); }
  function weakPractice(box, tags) {
    const items = [];
    tags.forEach((tag, k) => { for (let j = 0; j < 2; j++) { const v = variantFor(t, tag, { salt: Date.now() + k * 10 + j }); if (v && !items.some(x => x.id === v.id)) items.push(v); } });
    stage.querySelector('.navrow')?.remove();
    runSession(box, { mode: 'practice', topic: t, items: items.slice(0, 8), title: 'Targeted practice', onDone: r => {
      box.innerHTML = ''; box.appendChild(resultCard(r, { title: 'Targeted practice', actions: `<button class="btn primary" data-retake>${ic('star', 'sm')} Retake mastery check</button>` }));
      box.querySelector('[data-retake]').onclick = () => quizStepRetake();
    } });
  }

  function maybeFinishCapstone() {
    if (steps.some(s => s.kind === 'quiz') || ts.done) return;
    const needed = steps.map((s, k) => k).filter(k => ['lab', 'code', 'card', 'project', 'check'].includes(steps[k].kind));
    if (needed.every(k => ts.steps[k])) {
      ts.done = true; ts.at = Date.now(); addXP(150);
      const cert = issue('topic', t.id, t.title, { unitTitle: u.title });
      touch(); celebrate(); checkUnitAndCourse();
      setTimeout(() => { if (location.hash.startsWith(`#/t/${t.id}`)) certModal(cert, true); }, 700);
    }
  }
  function checkUnitAndCourse() {
    const p = unitProgress(u);
    if (p.done === p.total) { const uc = issue('unit', u.id, u.title); setTimeout(() => toast(`${ic('cert', 'sm')} Unit certificate earned: ${esc(u.title)}`, 5000), 2500); }
    const allDone = C.units.every(un => { const q = unitProgress(un); return q.done === q.total; });
    if (allDone) issue('course', 'course', 'AI Readiness — CBSE Artificial Intelligence (417), Class IX, Part B');
  }

  render();
  window.scrollTo(0, 0);
}

export function certModal(c, fresh = false) {
  if (!c) return;
  const m = modal(`<div class="badge">${ic('cert', 'xl')}</div>
    <div class="center"><div class="kicker">${fresh ? 'New certificate!' : 'Certificate'}</div><h2>${esc(c.title)}</h2>
    <p class="muted small">ID ${esc(c.id)}</p></div>
    <canvas data-cv style="width:100%;border:2px solid var(--ink);border-radius:10px;margin-top:12px"></canvas>
    <div class="row mt" style="justify-content:center"><button class="btn primary" data-png>${ic('download', 'sm')} Download PNG</button><button class="btn" data-pdf>${ic('download', 'sm')} Download PDF</button><button class="btn sm" data-close>Close</button></div>`);
  import('./cert.js').then(({ drawCert }) => drawCert(m.el.querySelector('[data-cv]'), c));
  m.el.querySelector('[data-png]').onclick = () => downloadPNG(c);
  m.el.querySelector('[data-pdf]').onclick = () => downloadPDF(c);
}
