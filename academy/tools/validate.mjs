#!/usr/bin/env node
// Content validator: node academy/tools/validate.mjs [unitId ...]
// Checks every unit file against docs/CONTENT_SPEC.md. Python "output" items are
// executed with CPython and the marked answer must equal the real output.
import { readFileSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLAN = {
  u1: { 'u1-01': ['smart-home'], 'u1-02': ['rps', 'quickdraw', 'semantris'], 'u1-03': [], 'u1-04': ['four-ws'], 'u1-05': ['system-map'], 'u1-06': ['chart-chooser'], 'u1-07': ['decision-tree', 'learn-by-example'], 'u1-08': ['confusion-matrix'], 'u1-09': ['cycle-walk'], 'u1-10': ['moral-machine'], 'u1-11': ['bias-lab', 'balloon-debate'] },
  u2: { 'u2-01': ['misleading-chart'], 'u2-02': ['password-meter', 'phishing-spotter'], 'u2-03': [], 'u2-04': [], 'u2-05': ['data-cleaner'], 'u2-06': ['trend-reader'], 'u2-07': ['dashboard-builder'] },
  u3: { 'u3-01': ['number-patterns', 'picture-analogy'], 'u3-02': ['stats-explorer'], 'u3-03': ['car-spotting'], 'u3-04': ['probability-sim'], 'u3-05': [] },
  u4: { 'u4-01': ['real-or-ai'], 'u4-02': ['next-word', 'discriminator'], 'u4-03': [], 'u4-04': ['gan-paint'], 'u4-05': ['genai-cases'] },
  u5: { 'u5-01': ['robo-runner'], 'u5-02': [], 'u5-03': [], 'u5-04': [], 'u5-05': [], 'u5-06': [], 'u5-07': [] },
  cp: { 'cp-01': ['doodle-trainer'], 'cp-02': [], 'cp-03': ['sdg-project'], 'cp-04': ['portfolio'] }
};
const GENS = ['conf-matrix', 'accuracy-calc', 'chart-pick', 'data-type', 'mean-median-mode', 'number-pattern', 'prob-basic', 'event-type', 'prob-complement', 'py-output-arith', 'py-output-cond', 'py-output-loop', 'py-output-list', 'py-type'];
const TAGS = new Set(['p', 'b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'br', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'h4', 'span', 'div', 'sup', 'sub', 'small', 'dfn']);
const CLASSES = new Set(['key', 'def', 'eg', 'warn', 'cols', 'mini', 'flow', 'formula', 'tbl', 'tblwrap', 'tag', 'data', 'cv', 'nlp', 'code', 'muted', 'small', 't5']);
const BANNED = /\b(all of the above|none of the above|both (a|b) and|both of (these|them|the above)|none of these)\b/i;

const errors = [], warns = [];
const E = (w, m) => errors.push(`${w}: ${m}`), W = (w, m) => warns.push(`${w}: ${m}`);
const want = process.argv.slice(2);
const units = want.length ? want : Object.keys(PLAN);
const allIds = new Set();
let exIds = new Set();
const exFile = join(ROOT, 'js/py/exercises.js');
if (existsSync(exFile)) {
  try { const ex = (await import(pathToFileURL(exFile).href)).default; exIds = new Set(ex.map(e => e.id)); } catch (e) { E('exercises', 'failed to import: ' + e.message); }
}
const pyChecks = [];

function checkHTML(where, html) {
  if (typeof html !== 'string') return E(where, 'html missing');
  for (const m of html.matchAll(/<\/?([a-zA-Z0-9]+)([^>]*)>/g)) {
    const tag = m[1].toLowerCase();
    if (!TAGS.has(tag)) E(where, `tag <${tag}> not allowed`);
    if (/\sstyle=/.test(m[2])) E(where, 'inline style not allowed');
    if (/\son\w+=/.test(m[2])) E(where, 'event handler attribute not allowed');
    const cls = /class="([^"]*)"/.exec(m[2]);
    if (cls) cls[1].split(/\s+/).filter(Boolean).forEach(c => { if (!CLASSES.has(c)) E(where, `class "${c}" not in vocabulary`); });
  }
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return words;
}

function checkItem(t, it, conceptSet) {
  const w = `${t.id}/${it.id || '?'}`;
  if (!/^[a-z0-9]+-\d\d-q\d\d$/.test(it.id || '') || !it.id.startsWith(t.id + '-')) E(w, 'bad id format');
  if (allIds.has(it.id)) E(w, 'duplicate id'); allIds.add(it.id);
  if (!conceptSet.has(it.c)) E(w, `concept "${it.c}" not declared`);
  if (![1, 2, 3].includes(it.d)) E(w, 'd must be 1–3');
  if (typeof it.q !== 'string' || it.q.length < 8) E(w, 'q missing');
  if (typeof it.ex !== 'string' || it.ex.length < 25) E(w, 'ex missing/too short');
  const text = [it.q, ...(it.o || []), ...(it.items || []).flat(), ...(it.pairs || []).flat()].join(' ');
  if (BANNED.test(text)) E(w, 'banned option phrase (all/none of the above, both)');
  switch (it.t) {
    case 'mcq':
      if (!Array.isArray(it.o) || it.o.length !== 4) E(w, 'mcq needs exactly 4 options');
      else if (new Set(it.o.map(o => String(o).trim().toLowerCase())).size !== 4) E(w, 'duplicate options');
      if (!Number.isInteger(it.a) || it.a < 0 || it.a > 3) E(w, 'mcq a must be 0–3');
      if (it.mis) for (const k of Object.keys(it.mis)) { if (+k === it.a || +k < 0 || +k > 3) E(w, `mis key ${k} invalid`); }
      if (it.d >= 2 && !it.mis) W(w, 'd≥2 mcq without misconception feedback');
      break;
    case 'multi':
      if (!Array.isArray(it.o) || it.o.length < 4 || it.o.length > 6) E(w, 'multi needs 4–6 options');
      if (!Array.isArray(it.a) || it.a.length < 2 || it.a.length > 4 || it.a.some(a => !Number.isInteger(a) || a < 0 || a >= (it.o || []).length) || new Set(it.a).size !== it.a.length) E(w, 'multi a must be 2–4 valid unique indices');
      if (!/select all/i.test(it.q)) E(w, 'multi stem must say "Select all that apply"');
      break;
    case 'tf': if (typeof it.a !== 'boolean') E(w, 'tf a must be boolean'); break;
    case 'order':
      if (!Array.isArray(it.items) || it.items.length < 3 || it.items.length > 6) E(w, 'order needs 3–6 items');
      else if (new Set(it.items).size !== it.items.length) E(w, 'order items must be distinct');
      break;
    case 'match':
      if (!Array.isArray(it.pairs) || it.pairs.length < 3 || it.pairs.length > 5) E(w, 'match needs 3–5 pairs');
      else if (new Set(it.pairs.map(p => p[1])).size !== it.pairs.length || new Set(it.pairs.map(p => p[0])).size !== it.pairs.length) E(w, 'match sides must be distinct');
      break;
    case 'bins':
      if (!Array.isArray(it.bins) || it.bins.length < 2 || it.bins.length > 3) E(w, 'bins needs 2–3 bins');
      if (!Array.isArray(it.items) || it.items.length < 4 || it.items.length > 8) E(w, 'bins needs 4–8 items');
      else {
        const used = new Set(it.items.map(x => x[1]));
        if (it.items.some(x => !Number.isInteger(x[1]) || x[1] < 0 || x[1] >= it.bins.length)) E(w, 'bins item index invalid');
        if (used.size !== it.bins.length) E(w, 'every bin must be used');
      }
      break;
    case 'num': if (typeof it.a !== 'number' || !isFinite(it.a)) E(w, 'num a must be a finite number'); break;
    default: E(w, `unknown type ${it.t}`);
  }
  if (it.code !== undefined) {
    if (typeof it.code !== 'string') E(w, 'code must be a string');
    else if (it.t === 'mcq' && /output|print/i.test(it.q)) pyChecks.push({ w, code: it.code, right: it.o[it.a], opts: it.o });
    else if (it.t === 'num' && /output|print/i.test(it.q)) pyChecks.push({ w, code: it.code, right: String(it.a), opts: [String(it.a)], num: true });
  }
}

for (const arg of units) {
  // An argument is a unit id (u1) or a path to a part file exporting an array of topics.
  const isPart = arg.endsWith('.js');
  const f = isPart ? join(process.cwd(), arg) : join(ROOT, 'js/content', arg + '.js');
  if (!existsSync(f)) { E(arg, 'file missing'); continue; }
  let unit;
  try { unit = (await import(pathToFileURL(f).href + '?t=' + Date.now())).default; } catch (e) { E(arg, 'import failed: ' + e.message); continue; }
  if (Array.isArray(unit)) unit = { id: (unit[0] && unit[0].id || '').split('-')[0], topics: unit };
  const u = unit.id;
  if (!PLAN[u]) { E(arg, 'unknown unit id ' + u); continue; }
  if (!isPart && unit.id !== arg) E(arg, 'unit id mismatch');
  const ids = (unit.topics || []).map(t => t.id);
  const planIds = Object.keys(PLAN[u]);
  if (isPart) { ids.forEach(id => { if (!planIds.includes(id)) E(arg, 'topic ' + id + ' not in plan'); }); }
  else if (JSON.stringify(ids) !== JSON.stringify(planIds)) E(u, `topic ids ${ids.join(',')} != plan ${planIds.join(',')}`);
  for (const t of unit.topics || []) {
    const w = t.id;
    if (!t.title || !t.hook || !t.minutes || !Array.isArray(t.outcomes) || !t.outcomes.length) E(w, 'title/hook/minutes/outcomes required');
    const concepts = new Set(Object.keys(t.concepts || {}));
    const isCP = u === 'cp';
    if (!isCP && concepts.size < 3) E(w, 'need ≥3 concepts');
    const steps = t.steps || [];
    const kinds = steps.map(s => s.kind);
    const cards = kinds.filter(k => k === 'card').length;
    if (!isCP && (cards < 6 || cards > 12)) E(w, `cards ${cards}, need 6–12`);
    if (isCP && cards < 3) E(w, 'capstone needs ≥3 cards');
    if (!isCP && kinds.filter(k => k === 'check').length < 2) E(w, 'need ≥2 check steps');
    if (!isCP && kinds[kinds.length - 1] !== 'quiz') E(w, 'last step must be quiz');
    if (!isCP && !kinds.includes('practice')) E(w, 'practice step missing');
    const labs = steps.filter(s => s.kind === 'lab').map(s => s.lab);
    for (const l of PLAN[u][t.id] || []) if (!labs.includes(l)) E(w, `planned lab ${l} missing`);
    for (const l of labs) if (!(PLAN[u][t.id] || []).includes(l)) E(w, `lab ${l} not planned for this topic`);
    steps.forEach((s, i) => {
      const sw = `${w}/step${i}`;
      if (s.kind === 'card') { if (!s.title) E(sw, 'card title missing'); const n = checkHTML(sw, s.html); if (n < 40 || n > 230) W(sw, `card has ${n} words (aim 60–170)`); }
      else if (s.kind === 'check') { if (!Array.isArray(s.concepts) || !s.concepts.length) E(sw, 'check concepts missing'); else s.concepts.forEach(c => { if (!concepts.has(c)) E(sw, `check concept ${c} undeclared`); }); if (!(s.n >= 1 && s.n <= 3)) E(sw, 'check n 1–3'); }
      else if (s.kind === 'lab') { if (!s.lab || !s.title || !s.intro) E(sw, 'lab needs lab/title/intro'); }
      else if (s.kind === 'code') { if (!s.ex) E(sw, 'code needs ex'); else if (exIds.size && !exIds.has(s.ex)) E(sw, `exercise ${s.ex} not found in js/py/exercises.js`); }
      else if (s.kind === 'practice') { if (!(s.n >= 6 && s.n <= 10)) E(sw, 'practice n 6–10'); }
      else if (s.kind === 'quiz') { if (!(s.n >= 8 && s.n <= 12)) E(sw, 'quiz n 8–12'); if (s.pass !== 0.8) E(sw, 'quiz pass must be 0.8'); }
      else if (s.kind === 'project') { if (!s.title || !s.html) E(sw, 'project step needs title/html'); else checkHTML(sw, s.html); }
      else E(sw, `unknown step kind ${s.kind}`);
    });
    const pool = t.pool || [];
    (t.gens || []).forEach(g => { if (!GENS.includes(g)) E(w, `unknown generator ${g}`); });
    const minPool = isCP ? 0 : u === 'u5' ? 24 : 30;
    if (pool.length < minPool) E(w, `pool has ${pool.length} items, need ≥${minPool}`);
    pool.forEach(it => checkItem(t, it, concepts));
    if (!isCP) {
      const per = {}; pool.forEach(it => { per[it.c] = (per[it.c] || 0) + 1; });
      for (const c of concepts) if ((per[c] || 0) < 3) E(w, `concept ${c} has ${per[c] || 0} items, need ≥3`);
      steps.filter(s => s.kind === 'check').forEach(s => { const n = pool.filter(it => s.concepts.includes(it.c)).length; if (n < s.n + 1) W(w, `check on ${s.concepts} has only ${n} items for n=${s.n}`); });
      const types = {}; pool.forEach(it => { types[it.t] = (types[it.t] || 0) + 1; });
      if ((types.mcq || 0) / pool.length < 0.5) W(w, 'mcq share below 50%');
      if ((types.tf || 0) < 2) E(w, 'need ≥2 tf'); if ((types.multi || 0) < 2) E(w, 'need ≥2 multi');
      if ((types.order || 0) + (types.match || 0) + (types.bins || 0) < 3) E(w, 'need ≥3 order/match/bins');
      const d = [1, 2, 3].map(k => pool.filter(it => it.d === k).length / pool.length);
      if (d[2] < 0.15) W(w, `only ${Math.round(d[2] * 100)}% d:3 application items`);
    }
  }
}

if (pyChecks.length) {
  const dir = mkdtempSync(join(tmpdir(), 'aikl-'));
  const script = join(dir, 'run.py'), data = join(dir, 'items.json');
  writeFileSync(data, JSON.stringify(pyChecks.map(p => p.code)));
  writeFileSync(script, `import json,sys,io,contextlib
codes=json.load(open(sys.argv[1]))
out=[]
for c in codes:
    buf=io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(c,{})
        out.append(buf.getvalue())
    except Exception as e:
        out.append('__ERROR__ '+type(e).__name__+': '+str(e))
print(json.dumps(out))`);
  const res = JSON.parse(execFileSync('python3', [script, data]).toString());
  const norm = s => String(s).replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
  pyChecks.forEach((p, i) => {
    const actual = norm(res[i]);
    if (actual.startsWith('__ERROR__')) { E(p.w, 'code raises: ' + actual); return; }
    if (norm(p.right) !== actual) E(p.w, `marked answer ${JSON.stringify(p.right)} but Python prints ${JSON.stringify(actual)}`);
    p.opts.forEach(o => { if (o !== p.right && norm(o) === actual) E(p.w, 'a distractor equals the real output'); });
  });
}

console.log(`Checked ${units.join(', ')} — ${allIds.size} items, ${pyChecks.length} Python outputs executed.`);
warns.forEach(w => console.log('WARN  ' + w));
errors.forEach(e => console.log('ERROR ' + e));
console.log(errors.length ? `\n${errors.length} error(s), ${warns.length} warning(s)` : `\nOK — 0 errors, ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
