// Dashboard, unit pages, Mistake Gym, certificates, practical file and profile.
import CFG from '../config.js';
import { esc, ic, h, fmtMin, fmtDate, toast, modal, setSound, sound } from './util.js';
import { S, touch, levelOf, backend, endSession } from './store.js';
import { C, UNIT_ICONS, unitProgress, courseProgress, totalMinutes, nextTopic, topicById, conceptLabel, stepsDone } from './course.js';
import { dueConcepts, openConcepts, fixedCount, runSession, gymItems, resultCard, stars } from './learn.js';
import { certModal } from './player.js';
import { downloadPNG, downloadPDF } from './cert.js';

const greet = () => { const hr = new Date().getHours(); return hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening'; };

export function dashboard(main) {
  const st = S.state, cp = courseProgress(), lv = levelOf(st.xp), due = dueConcepts().length, open = openConcepts().length;
  const next = nextTopic();
  const resumeT = /^#\/t\/([\w-]+)/.exec(st.last || '');
  const cont = resumeT && topicById(resumeT[1]) && !st.topics[resumeT[1]]?.done ? topicById(resumeT[1]) : next;
  const certs = Object.values(st.certs).sort((a, b) => b.at - a.at);
  const remaining = Math.max(0, totalMinutes() - C.order.reduce((m, id) => m + (st.topics[id]?.done ? topicById(id).minutes : 0), 0));
  main.innerHTML = `
    <div class="hello">
      <div><div class="kicker">${esc(CFG.COURSE)}</div><h1>${greet()}, ${esc(st.profile.name.split(' ')[0])}!</h1>
        <p class="muted">${cp.done ? `${cp.done} of ${cp.total} topics mastered. About ${fmtMin(remaining)} of learning left.` : `Your course: ${cp.total} topics, about ${fmtMin(totalMinutes())} of hands-on learning.`}</p></div>
      <div class="ring" style="--p:${cp.pct}"><b>${cp.pct}%</b></div>
    </div>
    <div class="stats mt2">
      <div class="stat"><div class="k">${ic('star', 'sm')} Level</div><div class="v">${esc(lv.name)}</div><div class="tiny muted">${st.xp} XP${lv.next ? ` · ${lv.next - st.xp} to ${esc(lv.nextName)}` : ''}</div></div>
      <div class="stat"><div class="k">${ic('flame', 'sm')} Streak</div><div class="v">${st.streak.days} <small>day${st.streak.days === 1 ? '' : 's'}</small></div><div class="tiny muted">Learn a little every day</div></div>
      <div class="stat"><div class="k">${ic('clock', 'sm')} Time learning</div><div class="v">${fmtMin(st.time.total)}</div><div class="tiny muted">Active time only</div></div>
      <div class="stat"><div class="k">${ic('cert', 'sm')} Certificates</div><div class="v">${certs.length}</div><div class="tiny muted">One for every topic</div></div>
    </div>
    ${cont ? `<a class="continue mt2" href="#/t/${cont.id}${cont.id === (resumeT && resumeT[1]) ? '/' + (st.topics[cont.id]?.step || 0) : ''}">
      <span class="ui">${ic('play', 'lg')}</span>
      <span><span class="kicker" style="color:var(--gold)">${st.topics[cont.id] ? 'Continue where you left off' : 'Start here'}</span><h3>${esc(cont.title)}</h3><p>${esc(cont.unit.short)} · step ${(st.topics[cont.id]?.step || 0) + 1} of ${cont.steps.length} · ~${cont.minutes} min</p></span>
      <span class="btn primary">${st.topics[cont.id] ? 'Continue' : 'Start'} ${ic('arrow')}</span></a>`
      : `<div class="card mt2 center"><h3>You've mastered every topic! 🎉</h3><p class="muted">Download your course certificate and keep your Mistake Gym at zero.</p><a class="btn primary mt" href="#/certs">My certificates</a></div>`}
    <div class="card mt2 gymcard">
      <div class="avatar" style="width:58px;height:58px;border-radius:16px;border:3px solid var(--ink)">${ic('gym', 'lg')}</div>
      <div><h3>Mistake Gym</h3><p class="muted">${due ? `<b>${due} idea${due > 1 ? 's' : ''}</b> ready to retrain with fresh questions.` : open ? `${open} idea${open > 1 ? 's' : ''} in training — the next review unlocks soon.` : 'No mistakes waiting. Every mistake you make comes here so you can fix it.'} ${fixedCount() ? `· ${fixedCount()} fixed so far` : ''}</p></div>
      <a class="btn ${due ? 'primary' : ''}" href="#/gym">${due ? 'Train now' : 'Open gym'} ${ic('arrow')}</a>
    </div>
    <h2 class="mt3">Your units</h2>
    <div class="units mt">${C.units.map(u => { const p = unitProgress(u); return `
      <a class="unit u-${u.color}" href="#/u/${u.id}">
        <div class="ub">${ic(UNIT_ICONS[u.id], 'lg')}<span class="uk">${u.id === 'cp' ? 'Capstone' : 'Unit ' + u.id.slice(1)}</span></div>
        <h3>${esc(u.title)}</h3>
        <div class="bar"><i style="width:${p.pct}%"></i></div>
        <div class="row between small muted"><span>${p.done} / ${p.total} topics</span><span>~${fmtMin(u.topics.reduce((m, t) => m + t.minutes, 0))}</span></div>
      </a>`; }).join('')}</div>
    ${certs.length ? `<h2 class="mt3">Latest certificates</h2><div class="row mt">${certs.slice(0, 4).map(c => `<button class="btn sm" data-cert="${c.id}">${ic('cert', 'sm')} ${esc(c.title)}</button>`).join('')}<a class="btn sm" href="#/certs">All certificates</a></div>` : ''}`;
  main.querySelectorAll('[data-cert]').forEach(b => b.onclick = () => certModal(st.certs[b.dataset.cert]));
}

export function unitPage(main, uid) {
  const u = C.units.find(x => x.id === uid); if (!u) { main.innerHTML = '<p>Unit not found.</p>'; return; }
  const p = unitProgress(u), st = S.state;
  const nextIdx = u.topics.findIndex(t => !st.topics[t.id]?.done);
  main.innerHTML = `<div class="u-${u.color}">
    <a class="btn sm" href="#/">${ic('back', 'sm')} Dashboard</a>
    <div class="uhead mt">
      <div class="kicker">${u.id === 'cp' ? 'Capstone' : 'Unit ' + u.id.slice(1)} · ${esc(u.syllabus || '')}</div>
      <h1>${esc(u.title)}</h1>
      <div class="row mt"><div class="bar" style="flex:1;min-width:180px"><i style="width:${p.pct}%"></i></div><b>${p.done} / ${p.total} mastered</b></div>
    </div>
    <div class="tlist">${u.topics.map((t, k) => {
      const ts = st.topics[t.id], done = ts?.done, started = ts && stepsDone(t) > 0;
      const s = stars(ts?.best || 0);
      return `<a class="titem ${done ? 'done' : ''}" href="#/t/${t.id}">
        <span class="n">${done ? ic('check') : k + 1}</span>
        <span><h4>${esc(t.title)}</h4><span class="meta"><span>${ic('clock', 'sm')} ~${t.minutes} min</span>${started && !done ? `<span>${stepsDone(t)} / ${t.steps.length} steps</span>` : ''}${done ? `<span class="stars">${[0, 1, 2].map(j => ic('star', j < s ? 'on' : '')).join('')}</span>` : ''}${k === nextIdx ? '<span class="chip gold">Up next</span>' : ''}</span>
          <span class="small muted">${esc(t.hook || '')}</span></span>
        <span class="go btn sm ${k === nextIdx ? 'primary' : ''}">${done ? 'Review' : started ? 'Continue' : 'Start'} ${ic('arrow', 'sm')}</span>
      </a>`;
    }).join('')}</div></div>`;
}

export function gymPage(main) {
  const due = dueConcepts(), open = openConcepts();
  const byUnit = {};
  open.forEach(c => { const t = topicById(c.topic); if (!t) return; (byUnit[t.unit.id] = byUnit[t.unit.id] || []).push({ ...c, t }); });
  main.innerHTML = `<a class="btn sm" href="#/">${ic('back', 'sm')} Dashboard</a>
    <div class="card mt">
      <div class="kicker">Mistake Gym</div><h1>Turn mistakes into mastery</h1>
      <p class="muted mt">Every question you get wrong lands here as an <b>idea to retrain</b>. You'll get a <b>new question on the same idea</b> after 10 minutes, then after 1, 3 and 7 days. Get it right each time and it's fixed for good.</p>
      <div class="stats mt2">
        <div class="stat"><div class="k">Ready now</div><div class="v">${due.length}</div></div>
        <div class="stat"><div class="k">In training</div><div class="v">${open.length}</div></div>
        <div class="stat"><div class="k">Fixed</div><div class="v">${fixedCount()}</div></div>
        <div class="stat"><div class="k">Total slips logged</div><div class="v">${Object.values(S.state.concepts).reduce((a, c) => a + c.n, 0)}</div></div>
      </div>
      <div class="row mt2">${due.length ? `<button class="btn primary big" data-train>${ic('gym')} Train ${Math.min(10, due.length)} idea${due.length > 1 ? 's' : ''} now</button>` : `<span class="chip ok">${ic('check', 'sm')} Nothing due right now</span>`}</div>
      <div data-session class="mt2"></div>
    </div>
    ${open.length ? `<h2 class="mt3">Ideas in training</h2>${Object.entries(byUnit).map(([uid, list]) => {
      const u = C.units.find(x => x.id === uid);
      return `<h3 class="mt2">${esc(u.title)}</h3><div class="tlist" style="margin-top:10px">${list.sort((a, b) => a.due - b.due).map(c => `
        <div class="titem"><span class="n" style="font-size:.95rem">${c.box}/4</span>
          <span><h4>${esc(conceptLabel(c.t, c.tag))}</h4><span class="meta"><span>${esc(c.t.title)}</span><span>missed ${c.n}×</span><span>${c.due <= Date.now() ? '<b style="color:var(--bad)">due now</b>' : 'next: ' + whenText(c.due)}</span></span></span>
          <a class="go btn sm" href="#/t/${c.t.id}">Revisit topic</a></div>`).join('')}</div>`;
    }).join('')}` : ''}`;
  const tb = main.querySelector('[data-train]');
  if (tb) tb.onclick = () => {
    const items = gymItems(10); if (!items.length) { toast('Nothing is due right now.'); return; }
    tb.remove();
    const box = main.querySelector('[data-session]');
    runSession(box, { mode: 'gym', items, title: 'Mistake Gym', onDone: r => {
      box.innerHTML = ''; box.appendChild(resultCard(r, { title: 'Gym session done', actions: `<a class="btn primary" href="#/gym">${ic('refresh', 'sm')} Back to the gym</a><a class="btn" href="#/">Dashboard</a>` }));
    } });
  };
}
function whenText(ts) {
  const d = ts - Date.now(); if (d < 3600000) return `in ${Math.max(1, Math.round(d / 60000))} min`;
  if (d < 86400000) return `in ${Math.round(d / 3600000)} h`; return `in ${Math.round(d / 86400000)} day${Math.round(d / 86400000) > 1 ? 's' : ''}`;
}

export function certsPage(main) {
  const st = S.state, have = Object.values(st.certs).sort((a, b) => a.at - b.at);
  const haveRef = new Set(have.map(c => c.kind + ':' + c.ref));
  main.innerHTML = `<a class="btn sm" href="#/">${ic('back', 'sm')} Dashboard</a>
    <div class="card mt"><div class="kicker">Certificates</div><h1>Your certificates</h1>
    <p class="muted mt">Master a topic's check (80% or more) to earn its certificate. Finish every topic in a unit for a unit certificate, and everything for the course certificate. Each has an ID your teacher can verify.</p></div>
    ${C.units.map(u => `<h2 class="mt3">${esc(u.title)}</h2><div class="certs mt">
      ${haveRef.has('unit:' + u.id) ? certCard(have.find(c => c.kind === 'unit' && c.ref === u.id)) : ''}
      ${u.topics.map(t => haveRef.has('topic:' + t.id) ? certCard(have.find(c => c.kind === 'topic' && c.ref === t.id)) : `<div class="certcard locked"><b>${esc(t.title)}</b><span class="small muted">${ic('lock', 'sm')} Master this topic to unlock</span><a class="btn sm" href="#/t/${t.id}">Go to topic</a></div>`).join('')}
    </div>`).join('')}
    ${haveRef.has('course:course') ? `<h2 class="mt3">Course</h2><div class="certs mt">${certCard(have.find(c => c.kind === 'course'))}</div>` : ''}`;
  main.querySelectorAll('[data-view]').forEach(b => b.onclick = () => certModal(st.certs[b.dataset.view]));
  main.querySelectorAll('[data-png]').forEach(b => b.onclick = () => downloadPNG(st.certs[b.dataset.png]));
  main.querySelectorAll('[data-pdf]').forEach(b => b.onclick = () => downloadPDF(st.certs[b.dataset.pdf]));
}
function certCard(c) {
  if (!c) return '';
  return `<div class="certcard"><div class="row between"><span class="chip ${c.kind === 'topic' ? 'gold' : 'ok'}">${c.kind === 'topic' ? 'Topic' : c.kind === 'unit' ? 'Unit' : 'Course'}</span><span class="tiny muted">${fmtDate(c.at)}</span></div>
    <b>${esc(c.title)}</b><span class="tiny muted">ID ${esc(c.id)}</span>
    <div class="row"><button class="btn sm" data-view="${c.id}">View</button><button class="btn sm" data-png="${c.id}">${ic('download', 'sm')} PNG</button><button class="btn sm" data-pdf="${c.id}">${ic('download', 'sm')} PDF</button></div></div>`;
}

export function practicalPage(main) {
  const ex = [...C.exercises.values()].filter(e => e.practical);
  const groups = ['PRINT', 'INPUT', 'LIST', 'IF-FOR-WHILE'];
  const passed = ex.filter(e => S.state.py[e.id]?.passed).length;
  const allPassed = [...C.exercises.values()].filter(e => S.state.py[e.id]?.passed).length;
  const where = id => { for (const t of C.topics.values()) { const k = t.steps.findIndex(s => s.kind === 'code' && s.ex === id); if (k >= 0) return `#/t/${t.id}/${k}`; } return '#/'; };
  main.innerHTML = `<a class="btn sm" href="#/">${ic('back', 'sm')} Dashboard</a>
    <div class="card mt u-green"><div class="kicker">Part C · Practical File</div><h1>Your Python practical file</h1>
      <p class="muted mt">CBSE asks for at least <b>15 programs</b> in your practical file. Every syllabus program is here — solve it in the browser and it's ticked off. You've solved <b>${allPassed}</b> programs in total, ${passed} of the ${ex.length} syllabus programs.</p>
      <div class="bar mt"><i style="width:${Math.min(100, Math.round(passed / Math.max(1, ex.length) * 100))}%"></i></div>
      <div class="row mt"><button class="btn primary" data-dl>${ic('download', 'sm')} Download my practical file (PDF)</button><span class="small muted">Includes your code for every solved program.</span></div></div>
    ${groups.map(g => `<h2 class="mt3">${g === 'IF-FOR-WHILE' ? 'IF, FOR, WHILE' : g}</h2><div class="tlist" style="margin-top:10px">${ex.filter(e => e.practical === g).map((e, k) => {
      const ok = S.state.py[e.id]?.passed;
      return `<a class="titem ${ok ? 'done' : ''}" href="${where(e.id)}"><span class="n">${ok ? ic('check') : k + 1}</span><span><h4>${esc(e.title)}</h4><span class="meta">${ok ? `<span>Solved ${S.state.py[e.id].at ? fmtDate(S.state.py[e.id].at) : ''}</span>` : '<span>Not solved yet</span>'}</span></span><span class="go btn sm">${ok ? 'Open' : 'Solve'} ${ic('arrow', 'sm')}</span></a>`;
    }).join('')}</div>`).join('')}`;
  main.querySelector('[data-dl]').onclick = () => practicalPDF();
}

async function practicalPDF() {
  const { loadPDF } = await import('./pdf.js');
  try {
    const jsPDF = await loadPDF();
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const W = 595, M = 50; let y = 70;
    const st = S.state;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.text('Python Practical File', M, y); y += 24;
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text(`${st.profile.name}${st.profile.school ? ' · ' + st.profile.school : ''} · ${CFG.COURSE}`, M, y); y += 16;
    doc.text('Generated by AI Kids Lab Academy on ' + fmtDate(Date.now()), M, y); y += 24;
    const solved = [...C.exercises.values()].filter(e => st.py[e.id]?.passed);
    if (!solved.length) { doc.text('No programs solved yet.', M, y); }
    solved.forEach((e, k) => {
      const code = (st.py[e.id].code || '').replace(/\t/g, '    ').split('\n');
      const task = (e.task || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
      const taskLines = doc.splitTextToSize(task, W - 2 * M);
      const need = 40 + taskLines.length * 13 + code.length * 12;
      if (y + Math.min(need, 300) > 790) { doc.addPage(); y = 60; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text(`${k + 1}. ${e.title}${e.practical ? '  [' + e.practical + ']' : ''}`, M, y); y += 16;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); taskLines.forEach(l => { if (y > 800) { doc.addPage(); y = 60; } doc.text(l, M, y); y += 13; }); y += 4;
      doc.setFont('courier', 'normal'); doc.setFontSize(10);
      code.forEach(l => { doc.splitTextToSize(l || ' ', W - 2 * M - 10).forEach(p => { if (y > 800) { doc.addPage(); y = 60; } doc.text(p, M + 10, y); y += 12; }); });
      y += 16;
    });
    doc.save(`Practical-File-${st.profile.name.replace(/\W+/g, '-')}.pdf`);
  } catch (e) { toast('Could not create the PDF. Please try again.'); }
}

export function profilePage(main, onSignOut) {
  const st = S.state;
  main.innerHTML = `<a class="btn sm" href="#/">${ic('back', 'sm')} Dashboard</a>
    <div class="card mt"><div class="kicker">My profile</div><h1>${esc(st.profile.name)}</h1>
      <dl class="kv mt"><dt>Email</dt><dd>${esc(st.profile.email)}</dd><dt>School</dt><dd>${esc(st.profile.school || '—')}</dd><dt>Section</dt><dd>${esc(st.profile.section || '—')}</dd><dt>Joined</dt><dd>${fmtDate(st.created)}</dd><dt>Time learning</dt><dd>${fmtMin(st.time.total)}</dd><dt>Progress saved</dt><dd>${backend.kind === 'local' ? 'On this device' : 'To your school account (syncs automatically)'}</dd></dl>
      <div class="row mt2"><button class="btn" data-sound>${ic(sound.on ? 'sound' : 'mute', 'sm')} Sound ${sound.on ? 'on' : 'off'}</button><button class="btn dark" data-out>${ic('logout', 'sm')} Sign out</button></div>
      ${backend.kind === 'local' ? '<p class="small muted mt">Device-only mode: your progress is stored in this browser. Use the same browser and device to continue.</p>' : ''}
    </div>
    <h2 class="mt3">Time by unit</h2>
    <div class="tlist" style="margin-top:10px">${C.units.map(u => { const m = u.topics.reduce((a, t) => a + (st.topics[t.id]?.minutes || 0), 0); const p = unitProgress(u); return `<div class="titem u-${u.color}"><span class="n">${ic(UNIT_ICONS[u.id])}</span><span><h4>${esc(u.title)}</h4><span class="meta"><span>${fmtMin(m)} spent</span><span>${p.done}/${p.total} mastered</span></span></span></div>`; }).join('')}</div>`;
  main.querySelector('[data-sound]').onclick = () => { setSound(!sound.on); profilePage(main, onSignOut); };
  main.querySelector('[data-out]').onclick = onSignOut;
}
