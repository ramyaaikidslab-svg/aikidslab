// Practice sessions, mastery quizzes, mistake tracking and the Mistake Gym.
//
// Mistake model (per topic + concept): a wrong answer puts the concept in box 0,
// due again in 10 minutes. Each later correct answer on that concept moves it up
// a box (due in 1, 3, then 7 days). Reaching box 4 means the mistake is fixed.
// Retries always use a *different* question on the same idea where one exists.
import { esc, ic, h, sfx, xpFly, confetti } from './util.js';
import { S, touch, addXP, topicState } from './store.js';
import { renderQuestion } from './questions.js';
import { topicById, conceptLabel, drawItems, variantFor } from './course.js';

const MIN = 60000, DAY = 86400000;
const INTERVALS = [10 * MIN, DAY, 3 * DAY, 7 * DAY];

export function recordAnswer(topicId, item, ok, { gym = false } = {}) {
  const st = S.state, key = topicId + '|' + item.c;
  st.log.push([Date.now(), topicId, item.id, item.c, ok ? 1 : 0]);
  if (st.log.length > 600) st.log.splice(0, st.log.length - 600);
  const ts = topicState(topicId);
  if (!item.id.startsWith('g:') && !ts.seen.includes(item.id)) { ts.seen.push(item.id); if (ts.seen.length > 200) ts.seen.shift(); }
  let c = st.concepts[key];
  if (!ok) {
    c = c || { n: 0, box: 0, due: 0, fixed: 0, wrong: [] };
    c.n++; c.box = 0; c.due = Date.now() + INTERVALS[0]; c.last = Date.now();
    c.wrong = (c.wrong || []).filter(x => x !== item.id).concat(item.id).slice(-6);
    st.concepts[key] = c;
  } else if (c && c.box < 4) {
    if (gym || Date.now() >= c.due - 60000) {          // only counts once it's due (spacing)
      c.box++; c.due = Date.now() + (INTERVALS[c.box] || 0);
      if (c.box >= 4) { c.fixed = (c.fixed || 0) + 1; addXP(15); }
    }
  }
  addXP(ok ? 10 : 2);
  touch();
}

export function dueConcepts(now = Date.now()) {
  return Object.entries(S.state.concepts)
    .filter(([, c]) => c.box < 4 && c.n > 0 && c.due <= now)
    .map(([k, c]) => ({ key: k, topic: k.split('|')[0], tag: k.split('|')[1], ...c }))
    .sort((a, b) => a.due - b.due);
}
export function openConcepts() {
  return Object.entries(S.state.concepts).filter(([, c]) => c.box < 4 && c.n > 0)
    .map(([k, c]) => ({ key: k, topic: k.split('|')[0], tag: k.split('|')[1], ...c }));
}
export function fixedCount() { return Object.values(S.state.concepts).filter(c => c.box >= 4).length; }

/**
 * Run a sequence of questions inside `el`.
 * opts: {items, mode:'check'|'practice'|'quiz'|'gym', topic, title, requeue, onDone(summary)}
 */
export function runSession(el, opts) {
  const { mode, onDone } = opts;
  const queue = opts.items.slice();
  const results = [];
  let i = 0, requeued = 0;
  const maxRequeue = mode === 'practice' ? 2 : 0;

  function header() {
    const total = queue.length;
    return `<div class="qcount"><span>${opts.title || ''} · Question ${Math.min(i + 1, total)} of ${total}</span>
      <span class="dots">${queue.map((_, k) => `<i class="${k < results.length ? (results[k].ok ? 'ok' : 'no') : k === i ? 'now' : ''}"></i>`).join('')}</span></div>`;
  }
  function show() {
    if (i >= queue.length) return finish();
    const it = queue[i];
    const topic = topicById(it.topic) || opts.topic;
    el.innerHTML = header() + '<div data-q></div><div class="navrow" data-nav hidden><span></span><button class="btn primary" data-next>Next ' + ic('arrow') + '</button></div>';
    const label = mode === 'gym' ? `${esc(topic ? topic.title : '')} · ${esc(conceptLabel(topic, it.c))}` : (it.retry ? 'Same idea, new question' : '');
    renderQuestion(it, el.querySelector('[data-q]'), {
      salt: mode + i, label,
      onAnswer: ({ ok }) => {
        results.push({ ok, item: it });
        recordAnswer(it.topic || topic.id, it, ok, { gym: mode === 'gym' });
        if (ok) xpFly(10);
        if (!ok && requeued < maxRequeue) {
          const v = variantFor(topic, it.c, { exclude: [it.id], salt: Date.now() + i });
          if (v && v.id !== it.id) { queue.splice(Math.min(queue.length, i + 3), 0, { ...v, retry: true }); requeued++; }
        }
        el.querySelector('.qcount').outerHTML = header();
        const nav = el.querySelector('[data-nav]'); nav.hidden = false;
        const nb = el.querySelector('[data-next]'); nb.innerHTML = (i + 1 >= queue.length ? 'See results ' : 'Next ') + ic('arrow');
        nb.onclick = () => { i++; show(); };
        nb.focus({ preventScroll: true });
      }
    });
  }
  function finish() {
    const right = results.filter(r => r.ok).length, total = results.length;
    const firstTry = results.filter(r => !r.item.retry);
    const score = firstTry.length ? firstTry.filter(r => r.ok).length / firstTry.length : 1;
    const weak = {};
    results.filter(r => !r.ok).forEach(r => { const t = topicById(r.item.topic) || opts.topic; weak[r.item.c] = conceptLabel(t, r.item.c); });
    onDone && onDone({ right, total, score, weak, results });
  }
  show();
}

/* ---------- topic-level helpers used by the player ---------- */
export function quizItems(topic, n, attempt) { return drawItems(topic, n, { salt: 'quiz' + attempt }); }
export function practiceItems(topic, n, attempt) {
  // Practice leans on the learner's open mistakes in this topic first.
  const mine = openConcepts().filter(c => c.topic === topic.id).map(c => c.tag);
  const base = drawItems(topic, n, { salt: 'practice' + attempt, genShare: 0.35 });
  if (!mine.length) return base;
  const extra = mine.slice(0, 3).map((tag, k) => variantFor(topic, tag, { salt: 'p' + attempt + k })).filter(Boolean);
  const ids = new Set(extra.map(x => x.id));
  return extra.concat(base.filter(x => !ids.has(x.id))).slice(0, n);
}
export function checkItems(topic, concepts, n, stepIndex) {
  return drawItems(topic, n, { salt: 'check' + stepIndex, concepts, genShare: 0 });
}

export function gymItems(limit = 10) {
  const due = dueConcepts().slice(0, limit), out = [];
  due.forEach((c, k) => {
    const t = topicById(c.topic); if (!t) return;
    const v = variantFor(t, c.tag, { exclude: c.wrong || [], salt: Date.now() + k });
    if (v) out.push({ ...v, topic: t.id });
  });
  return out;
}

export function resultCard({ right, total, score, weak }, { pass, passed, title, actions }) {
  const pct = Math.round(score * 100);
  const w = Object.values(weak);
  return h(`<div class="result fade-in">
    <div class="kicker">${esc(title)}</div>
    <div class="big">${pct}%</div>
    <p class="muted">${right} of ${total} correct${pass ? ` · pass mark ${Math.round(pass * 100)}%` : ''}</p>
    ${passed === true ? `<div class="chip ok">${ic('check', 'sm')} Passed</div>` : passed === false ? `<div class="chip bad">Not yet — you need ${Math.round(pass * 100)}%</div>` : ''}
    ${w.length ? `<div class="weak"><b>Ideas to strengthen</b>${w.map(x => `<li>${ic('target', 'sm')} ${esc(x)}</li>`).join('')}</div>` : ''}
    <div class="row" style="justify-content:center">${actions || ''}</div>
  </div>`);
}

export function stars(best) { return best >= 1 ? 3 : best >= 0.9 ? 2 : best >= 0.8 ? 1 : 0; }
export function celebrate() { sfx('win'); confetti(); }
