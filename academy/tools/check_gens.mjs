#!/usr/bin/env node
// Generates many items from every generator and checks them: schema, 4 distinct
// options, answer in range, and for Python generators that the marked option is
// exactly what CPython prints. Usage: node academy/tools/check_gens.mjs [count]
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GENS, makeGen } from '../js/gens/index.js';
import { rngFrom } from '../js/core/rng.js';

const N = +(process.argv[2] || 400);
const errors = [], py = [];
for (const id of Object.keys(GENS)) {
  for (let k = 0; k < N; k++) {
    const it = makeGen(id, rngFrom('check', id, k));
    const w = `${id}#${k}`;
    if (!it.q || !it.ex || !it.c) errors.push(w + ' missing q/ex/c');
    if (it.t === 'mcq') {
      if (!Array.isArray(it.o) || it.o.length !== 4) errors.push(w + ' needs 4 options: ' + JSON.stringify(it.o));
      else if (new Set(it.o).size !== 4) errors.push(w + ' duplicate options ' + JSON.stringify(it.o));
      if (!(it.a >= 0 && it.a < 4)) errors.push(w + ' bad a');
      if (it.code) py.push({ w, code: it.code, right: it.o[it.a], opts: it.o });
    } else if (it.t === 'num') {
      if (typeof it.a !== 'number' || !isFinite(it.a)) errors.push(w + ' bad num answer');
    } else errors.push(w + ' unexpected type ' + it.t);
  }
}
const dir = mkdtempSync(join(tmpdir(), 'gens-'));
writeFileSync(join(dir, 'c.json'), JSON.stringify(py.map(p => p.code)));
writeFileSync(join(dir, 'r.py'), `import json,sys,io,contextlib
out=[]
for c in json.load(open(sys.argv[1])):
    b=io.StringIO()
    with contextlib.redirect_stdout(b): exec(c,{})
    out.append(b.getvalue())
print(json.dumps(out))`);
const res = JSON.parse(execFileSync('python3', [join(dir, 'r.py'), join(dir, 'c.json')], { maxBuffer: 1 << 26 }).toString());
const norm = s => s.split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
py.forEach((p, i) => {
  const actual = norm(res[i]);
  if (norm(p.right) !== actual) errors.push(`${p.w}: marked ${JSON.stringify(p.right)} but Python prints ${JSON.stringify(actual)}\n${p.code}`);
  p.opts.forEach(o => { if (o !== p.right && norm(o) === actual) errors.push(`${p.w}: distractor equals output`); });
});
console.log(`${Object.keys(GENS).length} generators × ${N} = ${Object.keys(GENS).length * N} items; ${py.length} Python outputs checked with CPython.`);
errors.slice(0, 30).forEach(e => console.log('ERROR', e));
console.log(errors.length ? `${errors.length} error(s)` : 'OK');
process.exit(errors.length ? 1 : 0);
