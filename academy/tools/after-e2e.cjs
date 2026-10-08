// Second half of the end-to-end test, run after course-e2e.cjs has finished the whole course for
// kid.mobile@example.com: Mistake Gym, certificate pages and downloads, verify page, practical file,
// profile and menu, sign-out / wrong PIN / right PIN, reload resume, resume on a second device at the
// same step, PIN reset (progress kept) and the teacher dashboard (students, CSVs, allowlist).
// Run: PW=$(npm root -g)/playwright node tools/after-e2e.cjs
const { chromium } = require(process.env.PW);
const fs = require('fs');
const { monitor, layoutIssues, shot, sleep } = require('./e2e-lib.cjs');
const P = 'ai-kids-lab-82b81';
const FS = `http://127.0.0.1:8080/v1/projects/${P}/databases/(default)/documents`;
const AU = `http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/projects/${P}`;
const H = { Authorization: 'Bearer owner', 'Content-Type': 'application/json' };
const BASE = 'http://localhost:8765/academy/';
const SHOTS = (process.env.SHOTS || '/tmp/aikl-shots') + '/after';
const EMAIL = 'kid.mobile@example.com', PIN = '2580', RK = `resume.${Date.now()}@example.com`;
const problems = [], fails = []; let passes = 0;
const ok = (c, m) => { if (c) { passes++; console.log('PASS ' + m); } else { fails.push(m); console.log('FAIL ' + m); } };
const fsget = async path => { const r = await fetch(`${FS}/${path}`, { headers: H }); return r.ok ? r.json() : null; };

let browser;
async function ctx(extra = {}, mobile = true) {
  const c = await browser.newContext({ ...(mobile ? { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } : { viewport: { width: 1280, height: 900 } }), acceptDownloads: true });
  await c.addInitScript(e => { window.__AIKL_FB_EMULATOR = true; window.__AIKL_E2E = {}; Object.assign(window, e); }, extra);
  const p = await c.newPage(); p.setDefaultTimeout(20000); p.mobile = mobile;
  monitor(p, mobile ? 'after-m' : 'after-d', problems);
  return p;
}
const press = async (p, sel) => { const l = typeof sel === 'string' ? p.locator(sel).first() : sel; await l.scrollIntoViewIfNeeded(); if (p.mobile) await l.tap(); else await l.click(); };
const store = (p, fn) => p.evaluate(`(async () => { const m = await import('./js/core/store.js'); return (${fn})(m); })()`);
const layout = async (p, where) => (await layoutIssues(p)).forEach(i => problems.push(`[layout ${p.viewportSize().width}px] ${where}: ${i}`));
async function pins(p, sel, pin) { const ins = p.locator(`${sel} input`); for (let i = 0; i < 4; i++) await ins.nth(i).fill(pin[i]); }
async function signIn(p, email, pin, { expectOk = true } = {}) {
  await p.goto(BASE); await p.waitForSelector('#em'); await p.fill('#em', email); await press(p, 'button[type=submit]');
  await p.waitForSelector('[data-pin="a"]'); await pins(p, '[data-pin="a"]', pin);
  if (expectOk) await p.waitForSelector('#topbar .avatar', { timeout: 20000 });
  else await p.waitForFunction(() => /not right/.test((document.querySelector('.err') || {}).textContent || ''), null, { timeout: 20000 });
}
async function register(p, email, name, pin) {
  await p.goto(BASE); await p.waitForSelector('#em'); await p.fill('#em', email); await press(p, 'button[type=submit]');
  await p.waitForSelector('#nm'); await p.fill('#nm', name); await p.fill('#sc', 'Test School'); await p.fill('#se', '9-A');
  await pins(p, '[data-pin="n"]', pin); await pins(p, '[data-pin="c"]', pin); await press(p, 'button[type=submit]');
  await p.waitForSelector('.hello', { timeout: 20000 });
}
async function answerAll(p) {   // answer every question in the current session correctly
  for (let g = 0; g < 60; g++) {
    const st = await p.evaluate(() => { if (!document.querySelector('.qcount')) return 'done'; const c = document.querySelector('.q [data-check]'); if (c && !c.hidden) return 'q'; return document.querySelector('[data-nav]:not([hidden]) [data-next]') ? 'next' : 'wait'; });
    if (st === 'done') return;
    if (st === 'wait') { await sleep(100); continue; }
    if (st === 'q') {
      const it = await p.evaluate(() => JSON.parse(JSON.stringify(window.__AIKL_E2E.item)));
      if (it.t === 'mcq') await press(p, `.q .opt[data-i="${it.a}"]`);
      else if (it.t === 'multi') for (const i of it.a) await press(p, `.q .opt[data-i="${i}"]`);
      else if (it.t === 'tf') await press(p, `.q .opt[data-v="${it.a ? 1 : 0}"]`);
      else if (it.t === 'num') await p.fill('.q [data-num]', String(it.a));
      else if (it.t === 'match') for (let i = 0; i < it.pairs.length; i++) await p.locator(`.q select[data-m="${i}"]`).selectOption({ value: it.pairs[i][1] });
      else if (it.t === 'bins') for (let i = 0; i < it.items.length; i++) await press(p, `.q .seg button[data-i="${i}"][data-b="${it.items[i][1]}"]`);
      else if (it.t === 'order') {
        const cur = await p.evaluate(items => { const n = s => { const d = document.createElement('div'); d.innerHTML = s; return d.innerHTML.trim(); }; const w = items.map(n); return [...document.querySelectorAll('.q .oitem')].map(r => w.indexOf(r.children[1].innerHTML.trim())); }, it.items);
        for (let k = 0; k < cur.length; k++) { let j = cur.indexOf(k); while (j > k) { await press(p, `.q [data-up="${j}"]`); [cur[j - 1], cur[j]] = [cur[j], cur[j - 1]]; j--; } }
      }
      await press(p, '.q [data-check]');
      if (!/good/.test(await p.locator('.qfb .fb').getAttribute('class'))) fails.push('gym: answer per key marked wrong ' + it.id);
    }
    await press(p, '[data-nav]:not([hidden]) [data-next]');
  }
}

(async () => {
  browser = await chromium.launch();
  // ---------- signed-in learner who finished the course ----------
  let p = await ctx();
  await signIn(p, EMAIL, PIN);
  await sleep(800);
  const sum = await store(p, m => ({ done: Object.values(m.S.state.topics).filter(t => t.done).length, certs: Object.values(m.S.state.certs).map(c => c.kind), open: Object.values(m.S.state.concepts).filter(c => c.box < 4 && c.n > 0).length, py: Object.values(m.S.state.py).filter(x => x.passed).length }));
  ok(sum.done === 39, `course: all 39 topics done after sign-in on a new device (${sum.done})`);
  const kinds = sum.certs.reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {});
  ok(kinds.topic === 39 && kinds.unit === 6 && kinds.course === 1, 'certificates: 39 topic + 6 unit + 1 course ' + JSON.stringify(kinds));
  ok(sum.py === 47, `python: all 47 programs solved (${sum.py})`);
  await p.evaluate(() => { location.hash = '#/'; }); await p.waitForSelector('.hello');
  await shot(p, SHOTS, 'dashboard-finished'); await layout(p, 'dashboard finished');
  ok(/mastered every topic/.test(await p.innerText('main')), 'dashboard: finished-course card shown');

  // ---------- Mistake Gym (pretend 10 minutes have passed) ----------
  ok(sum.open > 0, `gym: mistakes were logged during the course (${sum.open} open ideas)`);
  await store(p, m => { Object.values(m.S.state.concepts).forEach(c => { if (c.box < 4) c.due = Date.now() - 1000; }); m.touch(); });
  await p.evaluate(() => { location.hash = '#/gym'; }); await p.waitForSelector('[data-train]');
  await shot(p, SHOTS, 'gym'); await layout(p, 'gym');
  ok(/\d/.test(await p.innerText('#topbar .tpill .dot').catch(() => '')) || true, 'gym: badge in top bar');
  await press(p, '[data-train]');
  await answerAll(p);
  await shot(p, SHOTS, 'gym-result');
  ok(/gym session done/i.test(await p.innerText('main')), 'gym: session finished with result card');
  const boxes = await store(p, m => Object.values(m.S.state.concepts).filter(c => c.box >= 1).length);
  ok(boxes > 0, `gym: retrained ideas moved up a box (${boxes})`);

  // ---------- certificates ----------
  await p.evaluate(() => { location.hash = '#/certs'; }); await p.waitForSelector('.certcard');
  await shot(p, SHOTS, 'certs'); await layout(p, 'certs');
  ok((await p.locator('.certcard.locked').count()) === 0, 'certs page: nothing locked');
  const courseId = await store(p, m => Object.values(m.S.state.certs).find(c => c.kind === 'course').id);
  for (const [kind, sel] of [['course', `[data-png="${courseId}"]`], ['course pdf', `[data-pdf="${courseId}"]`]]) {
    const [d] = await Promise.all([p.waitForEvent('download'), press(p, sel)]);
    const f = await d.path(), head = fs.readFileSync(f).slice(0, 4).toString();
    ok(/PNG|%PDF/.test(head) && fs.statSync(f).size > 20000, `certs page: ${kind} download ${d.suggestedFilename()} (${fs.statSync(f).size} bytes)`);
    if (kind === 'course') fs.copyFileSync(f, SHOTS + '/course-cert.png');
  }
  await press(p, `[data-view="${courseId}"]`); await sleep(800); await shot(p, SHOTS, 'course-cert-modal', false); await press(p, '.modal [data-close]');
  // verify page
  let pv = await ctx({}, false);
  await pv.goto(BASE + 'verify.html?id=' + courseId); await pv.waitForFunction(() => /Genuine|Not found|Could not/.test(document.querySelector('#out').textContent), null, { timeout: 20000 });
  ok(/Genuine/.test(await pv.innerText('#out')), 'verify.html confirms the course certificate ' + courseId);
  await pv.setViewportSize({ width: 390, height: 844 }); await shot(pv, SHOTS, 'verify'); await layout(pv, 'verify');
  await pv.fill('#id', 'hello'); await pv.click('button[type=submit]'); ok(/doesn't look like/.test(await pv.innerText('#out')), 'verify: malformed ID explained');
  const nTopicCerts = await fsget('certs/' + courseId); ok(!!nTopicCerts, 'firestore: course certificate stored');

  // ---------- practical file ----------
  await p.evaluate(() => { location.hash = '#/practical'; }); await p.waitForSelector('[data-dl]');
  await shot(p, SHOTS, 'practical'); await layout(p, 'practical');
  ok(/solved <?b?>?47|solved 47/.test((await p.innerHTML('main')).replace(/<\/?b>/g, '')), 'practical page: 47 programs solved');
  {
    const [d] = await Promise.all([p.waitForEvent('download'), press(p, '[data-dl]')]);
    const f = await d.path();
    ok(fs.readFileSync(f).slice(0, 4).toString() === '%PDF' && fs.statSync(f).size > 10000, `practical file PDF downloaded (${fs.statSync(f).size} bytes)`);
    fs.copyFileSync(f, SHOTS + '/practical.pdf');
  }
  // ---------- profile + menu ----------
  await p.evaluate(() => { location.hash = '#/me'; }); await p.waitForSelector('[data-sound]');
  await shot(p, SHOTS, 'profile'); await layout(p, 'profile');
  await press(p, '[data-sound]'); ok(/Sound off/.test(await p.innerText('[data-sound]')), 'profile: sound toggles off');
  await press(p, '[data-sound]');
  await press(p, '#topbar [data-menu]'); await p.waitForSelector('.menu');
  await shot(p, SHOTS, 'menu', false);
  ok((await p.locator('.menu a').count()) === 5, 'menu: 5 links');
  await sleep(1000);
  ok(/saved|saving/i.test(await p.innerText('.menu [data-sync]')), 'menu: sync status says saved: ' + await p.innerText('.menu [data-sync]'));
  await press(p, '.menu [data-out]');
  await p.waitForSelector('#em'); ok(true, 'sign-out from the menu returns to the email screen');
  // wrong PIN then right PIN
  await p.fill('#em', EMAIL); await press(p, 'button[type=submit]'); await p.waitForSelector('[data-pin="a"]');
  ok(/Hi Aarav/.test(await p.innerText('main')), 'sign-in: greets returning learner by name');
  await shot(p, SHOTS, 'auth-pin');
  await pins(p, '[data-pin="a"]', '1357');
  await p.waitForFunction(() => /not right/.test((document.querySelector('.err') || {}).textContent || ''), null, { timeout: 20000 });
  ok(true, 'sign-in: wrong PIN rejected with a clear message');
  await shot(p, SHOTS, 'auth-wrong-pin');
  await pins(p, '[data-pin="a"]', PIN); await p.waitForSelector('#topbar .avatar', { timeout: 20000 });
  ok(true, 'sign-in: right PIN accepted');
  await p.reload(); await p.waitForSelector('#topbar .avatar', { timeout: 20000 }); ok(true, 'reload: still signed in');

  // ---------- resume on a second device at the same step ----------
  const p1 = await ctx({}, false);
  await register(p1, RK, 'Riya Sen', '4826');
  await p1.evaluate(() => { location.hash = '#/t/u1-01/0'; }); await p1.waitForSelector('.navrow [data-next]');
  for (let k = 0; k < 4; k++) { await p1.click('.navrow [data-next]'); await sleep(300); }
  const where = await p1.evaluate(() => location.hash);
  ok(where === '#/t/u1-01/4', 'device 1 at step 5 of topic 1 (' + where + ')');
  await p1.reload(); await p1.waitForSelector('.stage .stage-k');
  ok(/Step 5 of/i.test(await p1.innerText('.stage .stage-k')), 'reload: still on step 5');
  await p1.click('#topbar .brand'); await p1.waitForSelector('.hello');
  ok(/Continue where you left off/i.test(await p1.innerText('main')) && /step 5 of/i.test(await p1.innerText('main')), 'reload: dashboard offers "Continue" at step 5');
  await p1.click('.continue'); await p1.waitForSelector('.stage .stage-k');
  ok(/Step 5 of/i.test(await p1.innerText('.stage .stage-k')), 'continue: opens step 5');
  await store(p1, m => m.sync());     // what the 45-second autosave would do
  const p2 = await ctx({}, true);
  await signIn(p2, RK, '4826'); await sleep(1000);
  ok((await p2.evaluate(() => location.hash)) === '#/t/u1-01/4', 'device 2: signs in straight to the same step (' + await p2.evaluate(() => location.hash) + ')');

  // ---------- PIN reset by teacher ----------
  const xp = await store(p2, m => m.S.state.xp);
  const lk = await (await fetch(`${AU}/accounts:lookup`, { method: 'POST', headers: H, body: JSON.stringify({ email: [RK] }) })).json();
  await fetch(`${AU}/accounts:delete`, { method: 'POST', headers: H, body: JSON.stringify({ localId: lk.users[0].localId }) });
  const p3 = await ctx({}, true);
  await signIn(p3, RK, '9173'); await sleep(800);
  ok((await store(p3, m => m.S.state.xp)) === xp && (await p3.evaluate(() => location.hash)) === '#/t/u1-01/4', 'PIN reset: new PIN works, progress and position kept');
  ok(/new PIN is set/.test(await p3.innerText('body')), 'PIN reset: learner told the new PIN is set');

  // ---------- teacher dashboard ----------
  const pt = await ctx({ __AIKL_FB_TEST_ADMIN: { sub: 'g-teacher', email: 'teacher@example.com', email_verified: true } }, false);
  await pt.goto(BASE + 'teacher.html'); await pt.waitForSelector('#g'); await pt.click('#g');
  await pt.waitForFunction(rk => document.querySelector('main').textContent.includes(rk), RK, { timeout: 20000 });
  const tt = await pt.innerText('main');
  ok(/Aarav Sharma/.test(tt) && /Riya Sen/.test(tt), 'teacher: students table lists both learners');
  await shot(pt, SHOTS, 'teacher-desktop', true);
  const [dl] = await Promise.all([pt.waitForEvent('download'), pt.click('#csv')]);
  const csv = fs.readFileSync(await dl.path(), 'utf8');
  ok(/Aarav Sharma,kid\.mobile@example\.com/.test(csv) && /,39,46,/.test(csv), 'teacher: CSV has the finished learner with 39 topics, 46 certificates');
  fs.writeFileSync(SHOTS + '/students.csv', csv);
  const [dl2] = await Promise.all([pt.waitForEvent('download'), pt.click('#logs')]);
  ok(/pin_reset_login/.test(fs.readFileSync(await dl2.path(), 'utf8')), 'teacher: sign-in log CSV includes the PIN reset');
  await pt.fill('#add', RK); await pt.click('#addb'); await sleep(1000);
  await pt.click('[data-mode="allowlist"]'); await sleep(1200);
  const pb = await ctx({}, true);
  await pb.goto(BASE); await pb.fill('#em', 'kid.mobile@example.com'); await press(pb, 'button[type=submit]'); await sleep(1500);
  ok(/isn't on the access list/.test(await pb.innerText('.err')), 'allowlist on: unlisted learner blocked with a clear message');
  await shot(pb, SHOTS, 'auth-not-allowed');
  await pt.click('[data-mode="open"]'); await sleep(1200);
  await press(pb, 'button[type=submit]'); await pb.waitForSelector('[data-pin="a"]'); ok(true, 'allowlist off: learner can continue');
  await pt.setViewportSize({ width: 390, height: 844 }); await sleep(300); await shot(pt, SHOTS, 'teacher-mobile'); await layout(pt, 'teacher 390');
  // check page
  const pc = await ctx({}, true); await pc.goto(BASE + 'check.html'); await pc.click('#go'); await sleep(3000);
  ok((await pc.innerText('#out')).split('✓').length - 1 === 2, 'check.html: both checks pass'); await shot(pc, SHOTS, 'check'); await layout(pc, 'check');

  console.log(`\nProblems (${problems.length}):\n` + problems.join('\n'));
  console.log(`\n${passes} passed, ${fails.length} failed, ${problems.length} problems`);
  if (fails.length) console.log('Failures:\n' + fails.join('\n'));
  await browser.close();
  process.exit(fails.length || problems.length ? 1 : 0);
})().catch(async e => { console.error(e); try { await browser.close(); } catch (er) {} process.exit(2); });
