#!/usr/bin/env node
// Runs backend/Code.gs against an in-memory fake Google Sheet.
//   node tools/mock-sheets.mjs test          → scripted backend tests
//   node tools/mock-sheets.mjs serve 8790    → HTTP server that behaves like the deployed web app (for E2E tests)
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import vm from 'node:vm';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function makeSheetApp() {
  const sheets = new Map();
  class Range {
    constructor(sh, r, c, nr = 1, nc = 1) { Object.assign(this, { sh, r, c, nr, nc }); }
    cell(i, j) { const row = this.sh.rows[this.r - 1 + i] || []; const v = row[this.c - 1 + j]; return v === undefined ? '' : v; }
    getValues() { return Array.from({ length: this.nr }, (_, i) => Array.from({ length: this.nc }, (_, j) => this.cell(i, j))); }
    getValue() { return this.cell(0, 0); }
    setValues(vals) { vals.forEach((row, i) => row.forEach((v, j) => this.sh.put(this.r + i, this.c + j, v))); return this; }
    setValue(v) { this.sh.put(this.r, this.c, v); return this; }
    clearContent() { for (let i = 0; i < this.nr; i++) for (let j = 0; j < this.nc; j++) this.sh.put(this.r + i, this.c + j, ''); return this; }
    setFontWeight() { return this; }
    createTextFinder(text) {
      const self = this; let entire = false, mc = true;
      const f = { matchEntireCell(b) { entire = b; return f; }, matchCase(b) { mc = b; return f; },
        findNext() {
          for (let i = 0; i < self.nr; i++) for (let j = 0; j < self.nc; j++) {
            let v = String(self.cell(i, j)), t = String(text);
            if (!mc) { v = v.toLowerCase(); t = t.toLowerCase(); }
            if (entire ? v === t : v.includes(t)) return { getRow: () => self.r + i };
          }
          return null;
        } };
      return f;
    }
  }
  class Sheet {
    constructor(name) { this.name = name; this.rows = []; }
    put(r, c, v) { while (this.rows.length < r) this.rows.push([]); const row = this.rows[r - 1]; while (row.length < c) row.push(''); row[c - 1] = v; }
    appendRow(vals) { this.rows.push(vals.slice()); return this; }
    getLastRow() { let n = this.rows.length; while (n && this.rows[n - 1].every(v => v === '')) n--; return n; }
    getLastColumn() { return Math.max(0, ...this.rows.map(r => r.length)); }
    getRange(r, c, nr, nc) { return new Range(this, r, c, nr, nc); }
    getDataRange() { return new Range(this, 1, 1, Math.max(1, this.getLastRow()), Math.max(1, this.getLastColumn())); }
    setFrozenRows() { return this; }
  }
  const ss = {
    getSheetByName: n => sheets.get(n) || null,
    insertSheet: n => { const s = new Sheet(n); sheets.set(n, s); return s; },
    getSheets: () => [...sheets.values()],
    deleteSheet: s => sheets.delete(s.name)
  };
  return { ss, sheets };
}

export function loadBackend() {
  const { ss, sheets } = makeSheetApp();
  const ctx = {
    SpreadsheetApp: { getActiveSpreadsheet: () => ss },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: s => ({ s, setMimeType() { return this; } }) },
    Utilities: { getUuid: () => randomUUID() },
    console, Date, JSON, Math, String, Number, Object, Array, RegExp, Error
  };
  vm.createContext(ctx);
  vm.runInContext(readFileSync(join(ROOT, 'backend/Code.gs'), 'utf8') + '\n;this.__api={setup,doPost,doGet};', ctx);
  const api = ctx.__api;
  api.setup();
  const post = body => JSON.parse(api.doPost({ postData: { contents: JSON.stringify(body) } }).s);
  return { post, sheets, api };
}

const pin = (email, p) => createHash('sha256').update('aikl-academy|' + email + '|' + p).digest('hex');

if (process.argv[2] === 'test') {
  const { post, sheets } = loadBackend();
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  const e = 'meera@school.in';
  ok(post({ action: 'lookup', email: e }).exists === false, 'new user not found');
  const reg = post({ action: 'register', email: e, name: 'Meera Iyer', school: 'KV', section: '9A', pinHash: pin(e, '4826') });
  ok(reg.ok && reg.token, 'register ok');
  ok(post({ action: 'register', email: e, name: 'X', pinHash: pin(e, '1111') }).error === 'exists', 'no duplicate register');
  ok(post({ action: 'login', email: e, pinHash: pin(e, '0000') }).error === 'bad_pin', 'bad pin rejected');
  const lg = post({ action: 'login', email: e, pinHash: pin(e, '4826') });
  ok(lg.ok && lg.token && lg.profile.name === 'Meera Iyer', 'login ok');
  const big = { rev: 7, profile: { name: 'Meera Iyer', email: e }, filler: 'x'.repeat(130000) };
  const sv = post({ action: 'save', email: e, token: lg.token, state: JSON.stringify(big), summary: { topicsDone: 3, certs: 3, xp: 820, minutes: 95, mistakesOpen: 4, pyPassed: 2, last: '#/t/u1-04/3' } });
  ok(sv.ok, 'save large state ok');
  { const r = sheets.get('Students').rows[1]; ok(r[8] === 3 && r[11] === 95 && r[14] === '#/t/u1-04/3', 'summary columns updated'); }
  const ld = post({ action: 'load', email: e, token: lg.token });
  ok(ld.ok && JSON.parse(ld.state).filler.length === 130000, 'state round-trips through chunks');
  const small = { rev: 8, profile: { name: 'Meera Iyer', email: e } };
  post({ action: 'save', email: e, token: lg.token, state: JSON.stringify(small), summary: {} });
  ok(JSON.parse(post({ action: 'load', email: e, token: reg.token }).state).rev === 8, 'shrinking state clears old chunks; older token still valid');
  ok(post({ action: 'save', email: e, token: 'nope', state: '{}' }).error === 'bad_token', 'bad token rejected');
  ok(post({ action: 'cert', email: e, token: lg.token, cert: { id: 'AIKL-T1234ABC', title: 'What is AI?', kind: 'topic', ref: 'u1-01', at: Date.now() } }).ok, 'cert saved');
  post({ action: 'cert', email: e, token: lg.token, cert: { id: 'AIKL-T1234ABC', title: 'dup', kind: 'topic', ref: 'u1-01' } });
  ok(sheets.get('Certificates').getLastRow() === 2, 'cert not duplicated');
  const v = post({ action: 'verify', id: 'aikl-t1234abc' });
  ok(v.ok && v.name === 'Meera Iyer', 'verify finds cert');
  for (let k = 0; k < 4; k++) post({ action: 'login', email: e, pinHash: pin(e, '9999') });
  ok(post({ action: 'login', email: e, pinHash: pin(e, '9999') }).error === 'locked', 'locks after 5 wrong PINs');
  ok(post({ action: 'login', email: e, pinHash: pin(e, '4826') }).error === 'locked', 'locked even with right PIN');
  const stud = sheets.get('Students');
  // allowlist
  sheets.get('Settings').rows[1][1] = 'allowlist';
  ok(post({ action: 'lookup', email: 'kabir@school.in' }).allowed === false, 'allowlist blocks unknown');
  ok(post({ action: 'register', email: 'kabir@school.in', name: 'Kabir', pinHash: pin('kabir@school.in', '1357') }).error === 'not_allowed', 'allowlist blocks register');
  sheets.get('Allowlist').appendRow(['Kabir@School.in', 'Kabir', '']);
  ok(post({ action: 'lookup', email: 'kabir@school.in' }).allowed === true, 'allowlist allows listed (case-insensitive)');
  // PIN reset by teacher
  stud.rows[1][4] = ''; stud.rows[1][16] = '';
  sheets.get('Allowlist').appendRow([e, '', '']);
  ok(post({ action: 'lookup', email: e }).needsPin === true, 'needsPin after reset');
  ok(post({ action: 'login', email: e, pinHash: pin(e, '2468') }).ok, 'reset login sets new PIN');
  ok(post({ action: 'login', email: e, pinHash: pin(e, '2468') }).ok, 'new PIN works');
  ok(post({ action: 'login', email: e, pinHash: pin(e, '4826') }).error === 'bad_pin', 'old PIN no longer works');
  ok(post({ action: 'nonsense' }).error === 'unknown_action', 'unknown action');
  ok(sheets.get('Logins').getLastRow() > 5, 'logins logged');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'Backend tests: all passed');
  process.exit(fails.length ? 1 : 0);
}

if (process.argv[2] === 'serve') {
  const port = +(process.argv[3] || 8790);
  const { post, sheets } = loadBackend();
  createServer((req, res) => {
    const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
    if (req.method === 'GET' && req.url.startsWith('/dump')) { res.writeHead(200, cors); res.end(JSON.stringify(Object.fromEntries([...sheets].map(([k, v]) => [k, v.rows])))); return; }
    if (req.method !== 'POST') { res.writeHead(200, cors); res.end('{"ok":true}'); return; }
    let body = ''; req.on('data', d => body += d); req.on('end', () => {
      if ((req.headers['content-type'] || '').indexOf('text/plain') !== 0) { res.writeHead(400, cors); res.end('{"ok":false,"error":"must be text/plain like Apps Script simple requests"}'); return; }
      res.writeHead(200, cors); res.end(JSON.stringify(post(JSON.parse(body))));
    });
  }).listen(port, () => console.log('mock sheets on', port));
}
