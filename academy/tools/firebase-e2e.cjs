// End-to-end test of the Firebase backend against the local emulators (no real data touched).
// Run: firebase emulators:start --project ai-kids-lab-82b81 (auth 9099, firestore 8080) with
// backend/firestore.rules where ADMINS = ['teacher@example.com']; serve the repo root on :8765;
// then: PW=$(npm root -g)/playwright node tools/firebase-e2e.cjs
const { chromium } = require(process.env.PW);
const P = 'ai-kids-lab-82b81', FS = `http://127.0.0.1:8080/v1/projects/${P}/databases/(default)/documents`, AU = `http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/projects/${P}`;
const H = { Authorization: 'Bearer owner', 'Content-Type': 'application/json' };
const BASE = 'http://localhost:8765/academy/';
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const fsget = async path => { const r = await fetch(`${FS}/${path}`, { headers: H }); return r.ok ? r.json() : null; };
async function ctx(b, extra = {}) {
  const c = await b.newContext(); await c.addInitScript(e => { window.__AIKL_FB_EMULATOR = true; Object.assign(window, e); }, extra);
  const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e))); p.errs = errs; return p;
}
async function typePin(p, sel, pin) { const ins = await p.$$(`${sel} input`); for (let i = 0; i < 4; i++) await ins[i].fill(pin[i]); }
async function email(p, e) { await p.goto(BASE); await p.waitForSelector('#em'); await p.fill('#em', e); await p.click('button[type=submit]'); await p.waitForTimeout(1500); }
async function register(p, e, name, pin) {
  await email(p, e); await p.fill('#nm', name); await p.fill('#sc', 'Test School'); await p.fill('#se', '9-B');
  await typePin(p, '[data-pin="n"]', pin); await typePin(p, '[data-pin="c"]', pin); await p.click('button[type=submit]');
}
async function signin(p, e, pin) { await email(p, e); await typePin(p, '[data-pin="a"]', pin); await p.waitForTimeout(2500); }
const signedIn = p => p.evaluate(async () => { const m = await import('./js/core/store.js'); return !!m.S.state; });
const store = (p, fn) => p.evaluate(`(async () => { const m = await import('./js/core/store.js'); return (${fn})(m); })()`);

(async () => {
  await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${P}/databases/(default)/documents`, { method: 'DELETE' });
  await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${P}/accounts`, { method: 'DELETE' });
  const b = await chromium.launch();

  // Check page
  let p = await ctx(b); await p.goto(BASE + 'check.html'); await p.click('#go'); await p.waitForTimeout(3000);
  const chk = await p.innerText('#out'); ok((chk.match(/✓/g) || []).length === 2, 'check page: both checks pass'); 

  // Register
  await register(p, 'S1@Example.com', 'Asha Rao', '2580'); await p.waitForTimeout(3000);
  ok(await signedIn(p), 'register: signed in');
  let sdoc = await fsget('students/s1@example.com'); ok(sdoc && sdoc.fields.name.stringValue === 'Asha Rao' && sdoc.fields.school.stringValue === 'Test School', 'register: students doc written');
  ok(!!(await fsget('directory/s1@example.com')), 'register: directory doc written');
  // Save progress
  await store(p, m => { m.S.state.xp += 777; m.S.state.last = '#/u/u1'; m.touch(); return m.sync(); }); await p.waitForTimeout(1500);
  const sd = await fsget('state/s1@example.com'); ok(sd && JSON.parse(sd.fields.json.stringValue).xp === 777, 'save: state doc has progress');
  sdoc = await fsget('students/s1@example.com'); ok(sdoc.fields.xp.integerValue === '777', 'save: summary updated (xp)');
  // Certificate + verify
  const cr = await store(p, m => m.backend.cert('s1@example.com', '', { id: 'AIKL-T1234567', title: 'Topic 1.1', kind: 'topic', ref: 'u1-1', at: Date.now(), name: 'Asha Rao' }));
  ok(cr.ok, 'cert: issued');
  // Privacy: s1 cannot read others / write config
  const priv = await store(p, async m => { const { fs, db } = await m.backend.ready(); const r = {};
    try { await fs.setDoc(fs.doc(db, 'config', 'access'), { mode: 'open' }); r.cfg = 'ALLOWED'; } catch (e) { r.cfg = e.code; }
    try { await fs.setDoc(fs.doc(db, 'students', 'x@example.com'), { email: 'x@example.com', name: 'Xx', school: '', section: '' }); r.other = 'ALLOWED'; } catch (e) { r.other = e.code; }
    try { await fs.getDocs(fs.collection(db, 'students')); r.list = 'ALLOWED'; } catch (e) { r.list = e.code; }
    try { await fs.setDoc(fs.doc(db, 'allowlist', 's1@example.com'), {}); r.allow = 'ALLOWED'; } catch (e) { r.allow = e.code; }
    return r; });
  ok(Object.values(priv).every(v => v === 'permission-denied'), 'rules: student cannot write config/allowlist, other students, or list students ' + JSON.stringify(priv));
  // Sign out (menu) → wrong PIN → right PIN
  await store(p, m => m.endSession());
  await signin(p, 's1@example.com', '1111');
  ok(!(await signedIn(p)) && /not right/.test(await p.innerText('.err')), 'login: wrong PIN rejected');
  await typePin(p, '[data-pin="a"]', '2580'); await p.waitForTimeout(3000);
  ok(await signedIn(p) && (await store(p, m => m.S.state.xp)) === 777, 'login: right PIN signs in with progress');
  ok(p.errs.length === 0, 'no page errors (device 1) ' + p.errs.join(' | '));

  // Second device: fresh browser context, progress comes from the server
  let p2 = await ctx(b); await signin(p2, 's1@example.com', '2580'); await p2.waitForTimeout(1000);
  ok((await store(p2, m => m.S.state && m.S.state.xp)) === 777, 'device 2: progress loaded from Firebase');
  // Reload keeps session
  await p2.reload(); await p2.waitForTimeout(3000);
  ok((await store(p2, m => m.S.state && m.S.state.xp)) === 777, 'device 2: reload resumes signed in');

  // Verify page
  let pv = await ctx(b); await pv.goto(BASE + 'verify.html?id=AIKL-T1234567'); await pv.waitForTimeout(2500);
  ok(/Genuine/.test(await pv.innerText('#out')) && /Asha Rao/.test(await pv.innerText('#out')), 'verify: certificate genuine');
  await pv.goto(BASE + 'verify.html?id=AIKL-T0000000'); await pv.waitForTimeout(2000); ok(/Not found/.test(await pv.innerText('#out')), 'verify: unknown id not found');

  // PIN reset: delete the auth account, then sign in with a new PIN — progress kept
  const lk = await (await fetch(`${AU}/accounts:lookup`, { method: 'POST', headers: H, body: JSON.stringify({ email: ['s1@example.com'] }) })).json();
  await fetch(`${AU}/accounts:delete`, { method: 'POST', headers: H, body: JSON.stringify({ localId: lk.users[0].localId }) });
  let p3 = await ctx(b); await signin(p3, 's1@example.com', '7531');
  ok((await store(p3, m => m.S.state && m.S.state.xp)) === 777, 'PIN reset: new PIN accepted, progress kept');
  await store(p3, m => m.endSession()); await signin(p3, 's1@example.com', '2580');
  ok(!(await signedIn(p3)), 'PIN reset: old PIN no longer works');

  // Teacher: non-admin Google account rejected
  let pt = await ctx(b, { __AIKL_FB_TEST_ADMIN: { sub: 'g-other', email: 'other@example.com', email_verified: true } });
  await pt.goto(BASE + 'teacher.html'); await pt.waitForSelector('#g'); await pt.click('#g'); await pt.waitForTimeout(2500);
  ok(/not an admin/.test(await pt.innerText('main')), 'teacher: non-admin rejected');
  // Admin
  pt = await ctx(b, { __AIKL_FB_TEST_ADMIN: { sub: 'g-teacher', email: 'teacher@example.com', email_verified: true } });
  await pt.goto(BASE + 'teacher.html'); await pt.waitForSelector('#g'); await pt.click('#g'); await pt.waitForTimeout(3000);
  const tt = await pt.innerText('main'); ok(/Asha Rao/.test(tt) && /s1@example.com/.test(tt), 'teacher: sees student row');
  // CSV download
  const [dl] = await Promise.all([pt.waitForEvent('download'), pt.click('#csv')]);
  const csvText = require('fs').readFileSync(await dl.path(), 'utf8'); ok(/Asha Rao,s1@example.com,Test School,9-B,0,0,777/.test(csvText), 'teacher: CSV has student');
  const [dl2] = await Promise.all([pt.waitForEvent('download'), pt.click('#logs')]);
  const logText = require('fs').readFileSync(await dl2.path(), 'utf8'); ok(/register/.test(logText) && /login/.test(logText) && /pin_reset_login/.test(logText), 'teacher: sign-in log CSV');
  // Allowlist: add s1, switch on
  await pt.fill('#add', 's1@example.com, bad-email'); await pt.click('#addb'); await pt.waitForTimeout(800);
  ok(/Not valid/.test(await pt.innerText('#addmsg')), 'teacher: invalid email rejected');
  await pt.fill('#add', 'S1@example.com\nnew.kid@example.com'); await pt.click('#addb'); await pt.waitForTimeout(1500);
  ok(/On the list \(2\)/.test(await pt.innerText('main')), 'teacher: 2 emails added');
  await pt.click('[data-mode="allowlist"]'); await pt.waitForTimeout(1500);
  ok((await fsget('config/access')).fields.mode.stringValue === 'allowlist', 'teacher: allowlist mode on');

  // Not-listed email blocked; listed new email can register; listed s1 can sign in
  let p4 = await ctx(b); await email(p4, 'stranger@example.com');
  ok(/isn't on the access list/.test(await p4.innerText('.err')), 'allowlist: unlisted email blocked');
  await register(p4, 'new.kid@example.com', 'New Kid', '8642'); await p4.waitForTimeout(3000);
  ok(await signedIn(p4), 'allowlist: listed email can register');
  let p5 = await ctx(b); await signin(p5, 's1@example.com', '7531'); ok(await signedIn(p5), 'allowlist: listed existing student signs in');
  // Remove s1 → blocked on save and on sign-in
  pt.on('dialog', d => d.accept());
  await pt.click('[data-rm="s1@example.com"]'); await pt.waitForTimeout(1500);
  const sv = await store(p5, async m => { m.S.state.xp += 1; m.touch(); await m.sync(); return m.S.status; });
  ok(sv === 'expired', 'allowlist: removed student blocked on save (status ' + sv + ')');
  let p6 = await ctx(b); await email(p6, 's1@example.com'); ok(/isn't on the access list/.test(await p6.innerText('.err')), 'allowlist: removed student cannot sign in');
  // Back to open
  await pt.click('[data-mode="open"]'); await pt.waitForTimeout(1500);
  let p7 = await ctx(b); await signin(p7, 's1@example.com', '7531'); ok(await signedIn(p7), 'open mode: student signs in again');
  for (const x of [p2, p3, p4, p5, p7, pt]) if (x.errs.length) ok(false, 'page errors: ' + x.errs.join(' | '));
  await b.close();
  console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
})().catch(e => { console.error(e); process.exit(1); });
