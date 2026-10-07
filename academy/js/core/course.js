// Loads the course content and picks questions for each learner.
import { rngFrom } from './rng.js';
import { makeGen, genLabel, GENS } from '../gens/index.js';
import { S } from './store.js';

export const UNIT_IDS = ['u1', 'u2', 'u3', 'u4', 'u5', 'cp'];
export const UNIT_ICONS = { u1: 'spark', u2: 'table', u3: 'sigma', u4: 'wand', u5: 'code', cp: 'tool' };
export const C = { units: [], topics: new Map(), order: [], exercises: new Map(), loaded: false };

export async function loadCourse() {
  if (C.loaded) return C;
  // A unit that fails to load is skipped (and logged) so the rest of the course still works.
  const mods = (await Promise.all(UNIT_IDS.map(id => import(`../content/${id}.js`).then(m => m.default).catch(err => { console.error('Unit failed to load:', id, err); return null; })))).filter(Boolean);
  if (!mods.length) throw new Error('No course units could be loaded.');
  const ex = await import('../py/exercises.js').then(m => m.default).catch(() => import('../py/exercises-cp.js').then(m => m.default).catch(() => []));
  ex.forEach(e => C.exercises.set(e.id, e));
  C.units = mods;
  mods.forEach((u, ui) => {
    u.index = ui;
    u.topics.forEach((t, ti) => {
      t.unit = u; t.index = ti; t.pool = t.pool || []; t.gens = t.gens || []; t.concepts = t.concepts || {};
      t.byConcept = {};
      t.pool.forEach(it => { (t.byConcept[it.c] = t.byConcept[it.c] || []).push(it); it.topic = t.id; });
      C.topics.set(t.id, t); C.order.push(t.id);
    });
  });
  C.loaded = true;
  return C;
}

export const topicById = id => C.topics.get(id);
export const unitById = id => C.units.find(u => u.id === id);
export function conceptLabel(topic, tag) { return (topic && topic.concepts[tag]) || genLabel(tag) || tag; }

function seedRng(...parts) { return rngFrom(S.state ? S.state.seed : 0, ...parts); }

// Turn a generator into a concrete item with a stable id for this draw.
function genItem(topic, gid, salt) {
  const it = makeGen(gid, seedRng('gen', topic.id, gid, salt));
  if (!it) return null;
  it.id = `g:${gid}:${topic.id}:${salt}`; it.topic = topic.id;
  return it;
}

/**
 * Pick n items for a learner. Different learners (seed) and different attempts
 * (salt) get different selections; items the learner has already seen are used
 * last. Generators supply up to genShare of the set when the topic has them.
 */
export function drawItems(topic, n, { salt = 0, concepts = null, genShare = 0.3, avoid = [] } = {}) {
  const rng = seedRng('draw', topic.id, salt, concepts ? concepts.join(',') : '*');
  let pool = concepts ? topic.pool.filter(it => concepts.includes(it.c)) : topic.pool.slice();
  const seen = new Set([...(S.state.topics[topic.id]?.seen || []), ...avoid]);
  const fresh = rng.shuffle(pool.filter(it => !seen.has(it.id)));
  const old = rng.shuffle(pool.filter(it => seen.has(it.id)));
  const gens = concepts ? [] : topic.gens;
  const nGen = gens.length ? Math.min(n - 1, Math.round(n * genShare)) : 0;
  const out = [];
  // Spread picks across concepts so one idea doesn't dominate a quiz.
  const take = (list, k) => {
    const byC = {}; list.forEach(it => (byC[it.c] = byC[it.c] || []).push(it));
    const keys = rng.shuffle(Object.keys(byC));
    while (k > 0 && keys.some(c => byC[c].length)) {
      for (const c of keys) { if (k > 0 && byC[c].length) { out.push(byC[c].shift()); k--; } }
    }
    return k;
  };
  let need = n - nGen;
  need = take(fresh, need);
  if (need > 0) take(old, need);
  for (let i = 0; i < nGen; i++) { const g = genItem(topic, gens[i % gens.length], `${salt}-${i}`); if (g) out.push(g); }
  while (out.length < n && gens.length) { const g = genItem(topic, rng.pick(gens), `${salt}-x${out.length}`); if (!g) break; out.push(g); }
  return rng.shuffle(out).slice(0, n);
}

// A *different* question on the same idea, for retries and the Mistake Gym.
export function variantFor(topic, tag, { exclude = [], salt = Date.now() } = {}) {
  const rng = seedRng('variant', topic.id, tag, salt);
  const g = topic.gens.find(gid => GENS[gid] && GENS[gid].c === tag);
  if (g) return genItem(topic, g, 'v' + salt);
  const list = (topic.byConcept[tag] || []);
  const notEx = list.filter(it => !exclude.includes(it.id));
  return rng.pick(notEx.length ? notEx : list) || null;
}

export function unitProgress(u) {
  const ts = u.topics.map(t => S.state.topics[t.id]);
  const done = ts.filter(t => t && t.done).length;
  return { done, total: u.topics.length, pct: Math.round(done / u.topics.length * 100) };
}
export function courseProgress() {
  let done = 0, total = 0;
  C.units.forEach(u => { const p = unitProgress(u); done += p.done; total += p.total; });
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}
export function totalMinutes() { let m = 0; C.topics.forEach(t => { m += t.minutes || 0; }); return m; }
export function nextTopic() {
  for (const id of C.order) { const st = S.state.topics[id]; if (!st || !st.done) return C.topics.get(id); }
  return null;
}
export function stepsDone(topic) {
  const st = S.state.topics[topic.id]; if (!st) return 0;
  return Object.keys(st.steps || {}).length;
}
