// Full end-to-end playthrough of the Academy against the Firebase emulators, as a learner would do it:
// sign-up, every topic of every unit and the capstone (lesson cards, quick checks, labs, practice,
// Python exercises, mastery checks), deliberate mistakes, Mistake Gym, certificates, practical file,
// resume on another device, PIN reset and the teacher dashboard.
//
// Setup: firebase emulators (auth 9099, firestore 8080, rules with ADMINS = ['teacher@example.com']),
// repo root served on :8765 (python3 -m http.server 8765), then from academy/:
//   PW=$(npm root -g)/playwright node tools/course-e2e.cjs [mobile|desktop] [topicFilter]
// Screenshots go to $SHOTS (default /tmp/aikl-shots/<profile>).
const { chromium } = require(process.env.PW);
const fs = require('fs');
const { monitor, layoutIssues, shot, sleep } = require('./e2e-lib.cjs');
const DRIVERS = require('./lab-drivers.cjs');

const PROFILE = process.argv[2] || 'mobile';
const FILTER = process.argv[3] || '';
const MOBILE = PROFILE === 'mobile';
const P = 'ai-kids-lab-82b81';
const FS = `http://127.0.0.1:8080/v1/projects/${P}/databases/(default)/documents`;
const AU = `http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/projects/${P}`;
const H = { Authorization: 'Bearer owner', 'Content-Type': 'application/json' };
const BASE = 'http://localhost:8765/academy/';
const SHOTS = (process.env.SHOTS || '/tmp/aikl-shots') + '/' + PROFILE;
const EMAIL = `kid.${PROFILE}@example.com`, PIN = '2580', NAME = PROFILE === 'mobile' ? 'Aarav Sharma' : 'Meera Iyer';

const problems = [];      // page errors, console errors, 404s, layout issues
const fails = [];         // functional failures
let passes = 0;
const ok = (c, m) => { if (c) { passes++; console.log('PASS ' + m); } else { fails.push(m); console.log('FAIL ' + m); } };
const shotsTaken = new Set();
async function snap(page, kind, full = true) { if (!MOBILE || shotsTaken.has(kind)) return; shotsTaken.add(kind); await shot(page, SHOTS, kind, full); }
async function checkLayout(page, where) {
  const iss = await layoutIssues(page);
  iss.forEach(i => problems.push(`[layout ${PROFILE} ${page.viewportSize().width}px] ${where}: ${i}`));
}

async function newPage(browser, extra = {}) {
  const opts = MOBILE ? { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } : { viewport: { width: 1280, height: 900 } };
  const c = await browser.newContext({ ...opts, acceptDownloads: true });
  await c.addInitScript(e => { window.__AIKL_FB_EMULATOR = true; window.__AIKL_E2E = {}; Object.assign(window, e); }, extra);
  const p = await c.newPage();
  monitor(p, PROFILE, problems);
  p.setDefaultTimeout(15000);
  return p;
}
// Tap on touch devices, click elsewhere. Uses Playwright's actionability checks (visible, enabled, not covered).
async function press(page, sel, opts = {}) {
  const l = typeof sel === 'string' ? page.locator(sel).first() : sel;
  await l.scrollIntoViewIfNeeded({ timeout: opts.timeout || 15000 });
  if (MOBILE) await l.tap({ timeout: opts.timeout || 15000 }); else await l.click({ timeout: opts.timeout || 15000 });
}
const store = (p, fn) => p.evaluate(`(async () => { const m = await import('./js/core/store.js'); return (${fn})(m); })()`);

/* ------------------------------------------------------------------ questions */
// Answer the question on screen. mode: 'right' | 'wrong'.
async function answer(page, mode) {
  const it = await page.evaluate(() => { const i = window.__AIKL_E2E.item; return i && JSON.parse(JSON.stringify(i)); });
  if (!it) throw new Error('no question item exposed');
  const right = mode === 'right';
  const t = it.t;
  if (t === 'mcq') {
    let i = it.a; if (!right) i = (it.a + 1) % it.o.length;
    await press(page, `.q .opt[data-i="${i}"]`);
  } else if (t === 'multi') {
    let sel = it.a.slice(); if (!right) sel = it.o.map((_, i) => i).filter(i => !it.a.includes(i)).slice(0, 1).concat(it.a.slice(1));
    if (!sel.length) sel = [0];
    for (const i of sel) await press(page, `.q .opt[data-i="${i}"]`);
  } else if (t === 'tf') {
    await press(page, `.q .opt[data-v="${(right ? it.a : !it.a) ? 1 : 0}"]`);
  } else if (t === 'order') {
    if (right) {
      // Work out where each item is now, then bubble items into place with the arrow buttons.
      const cur = await page.evaluate(items => {
        const norm = s => { const d = document.createElement('div'); d.innerHTML = s; return d.innerHTML.trim(); };
        const want = items.map(norm);
        return [...document.querySelectorAll('.q .oitem')].map(r => want.indexOf(r.children[1].innerHTML.trim()));
      }, it.items);
      if (cur.includes(-1)) throw new Error('order: could not map items ' + JSON.stringify(cur));
      for (let k = 0; k < cur.length; k++) {
        let j = cur.indexOf(k);
        while (j > k) { await press(page, `.q [data-up="${j}"]`); [cur[j - 1], cur[j]] = [cur[j], cur[j - 1]]; j--; }
      }
    } // wrong: the starting order is never correct
  } else if (t === 'match') {
    const n = it.pairs.length;
    for (let i = 0; i < n; i++) {
      const v = right ? it.pairs[i][1] : it.pairs[(i + 1) % n][1];
      await page.locator(`.q select[data-m="${i}"]`).selectOption({ value: v });
    }
  } else if (t === 'bins') {
    for (let i = 0; i < it.items.length; i++) {
      let b = it.items[i][1]; if (!right && i === 0) b = (b + 1) % it.bins.length;
      await press(page, `.q .seg button[data-i="${i}"][data-b="${b}"]`);
    }
  } else if (t === 'num') {
    await page.fill('.q [data-num]', String(right ? it.a : it.a + 997));
  } else throw new Error('unknown question type ' + t);
  await press(page, '.q [data-check]');
  const good = await page.locator('.qfb .fb').first().getAttribute('class');
  if (right && !/good/.test(good)) fails.push(`answer key/grader mismatch on ${it.id} (${t}): answered per key but marked wrong`);
  if (!right && /good/.test(good)) fails.push(`wrong answer accepted on ${it.id} (${t})`);
  return it;
}

// Run a whole question session (check, practice, quiz, gym). wrongAt: set of question indexes to answer wrongly.
async function session(page, wrongAt = new Set(), tag = '') {
  let n = 0;
  const seenTypes = new Set();
  for (let guard = 0; guard < 80; guard++) {
    const st = await page.evaluate(() => {
      const qc = document.querySelector('.qcount'); if (!qc) return 'done';
      const chk = document.querySelector('.q [data-check]'); if (chk && !chk.hidden) return 'q';
      if (document.querySelector('[data-nav]:not([hidden]) [data-next]')) return 'next';
      return 'wait';
    });
    if (st === 'done') return { n, types: seenTypes };
    if (st === 'wait') { await sleep(100); continue; }
    if (st === 'q') {
      if (n === 0) await snap(page, 'question');
      const it = await answer(page, wrongAt.has(n) ? 'wrong' : 'right');
      seenTypes.add(it.t);
      if (!shotsTaken.has('q-' + it.t)) { await snap(page, 'q-' + it.t); }
      if (wrongAt.has(n)) await snap(page, 'feedback-wrong');
      n++;
      await checkLayout(page, `${tag} question ${it.id}`);
    }
    await press(page, '[data-nav]:not([hidden]) [data-next]');
  }
  throw new Error('session did not finish: ' + tag);
}

/* ------------------------------------------------------------------ steps */
async function solveCode(page, topicId, stepIdx, exId, { failFirst = false } = {}) {
  await page.waitForSelector('.code-wrap [data-check]');
  const sol = await page.evaluate(async id => {
    const { C } = await import('./js/core/course.js'); const { exParams } = await import('./js/core/code.js');
    const ex = C.exercises.get(id), p = exParams(ex);
    const sub = s => String(s ?? '').replace(/\{\{(\w+)\}\}/g, (_, k) => (k in p ? p[k] : `{{${k}}}`));
    return { code: sub(ex.solution), starter: sub(ex.starter || ''), hints: (ex.hints || []).length };
  }, exId);
  // wait for the editor (CodeMirror) to be ready
  await page.waitForFunction(() => document.querySelector('.code-wrap .CodeMirror') || window.__noCM, null, { timeout: 15000 }).catch(() => {});
  const setCode = code => page.evaluate(c => { const cm = document.querySelector('.code-wrap .CodeMirror'); if (cm) cm.CodeMirror.setValue(c); else document.querySelector('.code-wrap textarea').value = c; }, code);
  if (failFirst) {
    // A learner's broken first attempts: three failed checks reveal the solution button; hints step through.
    for (let k = 0; k < 3; k++) {
      await setCode(k === 0 ? 'print("hello"' : 'print("not the answer")');
      await press(page, '.code-wrap [data-check]');
      await page.waitForFunction(() => !document.querySelector('.code-wrap [data-check]').disabled && !document.querySelector('[data-tests] .spin'), null, { timeout: 60000 });
    }
    ok(await page.isVisible('.code-wrap [data-sol]'), `code ${exId}: "Show a solution" appears after 3 tries`);
    for (let k = 0; k < sol.hints; k++) await press(page, '.code-wrap [data-hint]');
    ok((await page.locator('[data-hints] .key').count()) === sol.hints, `code ${exId}: all ${sol.hints} hints shown`);
    await snap(page, 'code-failed-with-hints');
    await press(page, '.code-wrap [data-sol]');
  }
  await setCode(sol.code);
  await press(page, '.code-wrap [data-run]');
  await page.waitForFunction(() => !document.querySelector('.code-wrap [data-run]').disabled, null, { timeout: 90000 });
  const out = await page.innerText('.code-wrap [data-out]');
  if (/Error|too long|not available/.test(out)) fails.push(`code ${exId}: Run of reference solution printed an error: ${out.slice(0, 200)}`);
  await press(page, '.code-wrap [data-check]');
  await page.waitForFunction(() => !document.querySelector('.code-wrap [data-check]').disabled && !document.querySelector('[data-tests] .spin'), null, { timeout: 90000 });
  const passed = await page.isVisible('[data-tests] .lab-done');
  ok(passed, `code ${exId}: reference solution passes through the editor UI`);
  if (!passed) console.log((await page.innerText('[data-tests]')).slice(0, 600));
  await snap(page, 'code-step-passed');
  return passed;
}

async function runLab(page, labId, topicId) {
  await page.waitForSelector('[data-lab]');
  await page.waitForFunction(() => !document.querySelector('[data-lab] .loading'), null, { timeout: 20000 });
  if (await page.isVisible('[data-lab] .warn')) { fails.push(`lab ${labId}: failed to load`); return false; }
  await checkLayout(page, `lab ${labId} (start)`);
  if (MOBILE) await shot(page, SHOTS + '/labs', labId + '-start');
  const drv = DRIVERS[labId];
  let done = false;
  if (!drv) fails.push(`lab ${labId}: no driver`);
  else {
    try {
      await drv(page, { root: '[data-lab]', press, MOBILE, sleep, shot: n => MOBILE && shot(page, SHOTS + '/labs', labId + '-' + n), layout: w => checkLayout(page, `lab ${labId} ${w}`) });
      done = await page.waitForFunction(() => { const b = document.querySelector('.navrow [data-next]'); return b && !b.disabled; }, null, { timeout: 15000 }).then(() => true).catch(() => false);
    } catch (e) { fails.push(`lab ${labId}: driver error ${String(e.message).split('\n')[0]}`); }
  }
  await checkLayout(page, `lab ${labId} (end)`);
  if (MOBILE) await shot(page, SHOTS + '/labs', labId + '-end');
  ok(done, `lab ${labId}: completed (Next unlocked)`);
  if (!done) {
    const sk = page.locator('.navrow [data-skip]');
    if (await sk.count()) { await press(page, sk); return 'skipped'; }
    fails.push(`lab ${labId}: no way forward (not completed and no skip)`);
  }
  return done;
}

/* ------------------------------------------------------------------ topic */
async function playTopic(page, t, opts) {
  const { failQuiz, wrongInCheck, codeFailFirst } = opts;
  await page.evaluate(id => { location.hash = `#/t/${id}/0`; }, t.id);
  await page.waitForSelector('.stage .stage-k');
  for (let i = 0; i < t.steps.length; i++) {
    const s = t.steps[i];
    // make sure the player shows step i
    await page.waitForFunction(k => { const e = document.querySelector('.stage > .stage-k'); return e && e.textContent.includes(`Step ${k + 1} of`); }, i, { timeout: 15000 });
    await checkLayout(page, `${t.id} step ${i + 1} (${s.kind})`);
    const last = i === t.steps.length - 1;
    if (s.kind === 'card' || s.kind === 'project') {
      await snap(page, s.kind === 'project' ? 'project-card' : 'lesson-card');
      if (last) break;
      await press(page, '.navrow [data-next]');
      continue;
    }
    if (s.kind === 'check') {
      await snap(page, 'quick-check');
      await session(page, wrongInCheck && i === t.steps.findIndex(x => x.kind === 'check') ? new Set([0]) : new Set(), `${t.id} check`);
      await snap(page, 'quick-check-result');
    } else if (s.kind === 'lab') {
      await runLab(page, s.lab, t.id);
      if (last) break;
      // runLab may have skipped (navigated already)
      const now = await page.evaluate(() => document.querySelector('.stage > .stage-k').textContent);
      if (!now.includes(`Step ${i + 1} of`)) continue;
    } else if (s.kind === 'code') {
      const passed = await solveCode(page, t.id, i, s.ex, { failFirst: codeFailFirst && i === t.steps.findIndex(x => x.kind === 'code') });
      if (!passed) { const sk = page.locator('.navrow [data-skip]'); if (await sk.count()) { await press(page, sk); continue; } }
    } else if (s.kind === 'practice') {
      await snap(page, 'practice-intro');
      await press(page, '[data-start]');
      const r = await session(page, new Set([0, 2]), `${t.id} practice`);
      ok(r.n > s.n, `${t.id} practice: a missed idea came back as a new question (${r.n} questions for ${s.n})`);
      await snap(page, 'practice-result');
      ok(await page.isVisible('[data-again]'), `${t.id} practice: "Practise again" offered`);
    } else if (s.kind === 'quiz') {
      await snap(page, 'quiz-intro');
      await press(page, '[data-start]');
      if (failQuiz) {
        await session(page, new Set([0, 1, 2, 3]), `${t.id} quiz (fail)`);
        await snap(page, 'quiz-failed');
        ok(await page.isVisible('[data-weak]') && /Not yet/.test(await page.innerText('.result')), `${t.id} quiz: failing shows "Not yet" and targeted practice`);
        await press(page, '[data-weak]');
        await session(page, new Set(), `${t.id} targeted practice`);
        await press(page, '[data-retake]');
      }
      await session(page, new Set(), `${t.id} quiz`);
      const res = await page.innerText('.result');
      ok(/Passed/.test(res), `${t.id} mastery check passed`);
      await snap(page, 'quiz-passed');
      // first pass pops up the certificate
      const modal = await page.waitForSelector('.modal [data-cv]', { timeout: 5000 }).then(() => true).catch(() => false);
      ok(modal, `${t.id}: certificate pops up after first pass`);
      if (modal) {
        await sleep(600);
        await snap(page, 'certificate-modal', false);
        if (opts.downloadCert) {
          const [d1] = await Promise.all([page.waitForEvent('download'), press(page, '.modal [data-png]')]);
          const [d2] = await Promise.all([page.waitForEvent('download'), press(page, '.modal [data-pdf]')]);
          const f1 = await d1.path(), f2 = await d2.path();
          ok(/\.png$/.test(d1.suggestedFilename()) && fs.readFileSync(f1).slice(1, 4).toString() === 'PNG', `${t.id}: certificate PNG download (${d1.suggestedFilename()})`);
          ok(/\.pdf$/.test(d2.suggestedFilename()) && fs.readFileSync(f2).slice(0, 4).toString() === '%PDF', `${t.id}: certificate PDF download (${fs.statSync(f2).size} bytes)`);
        }
        await press(page, '.modal [data-close]');
      }
      break;
    }
    if (last) break;
    await press(page, '.navrow [data-next]');
  }
  const done = await page.evaluate(async id => { const m = await import('./js/core/store.js'); const s = m.S.state.topics[id]; return { done: !!(s && s.done), steps: s ? Object.keys(s.steps).length : 0 }; }, t.id);
  ok(done.done, `${t.id} topic mastered/completed (${done.steps}/${t.steps.length} steps done)`);
}

/* ------------------------------------------------------------------ main */
(async () => {
  const course = await loadCourseNode();
  const browser = await chromium.launch();
  if (!FILTER && MOBILE) {
    await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${P}/databases/(default)/documents`, { method: 'DELETE' });
    await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${P}/accounts`, { method: 'DELETE' });
  }
  let page = await newPage(browser);
  // ---------- sign-up ----------
  await page.goto(BASE); await page.waitForSelector('#em');
  await snap(page, 'auth-email');
  await checkLayout(page, 'auth email');
  await page.fill('#em', 'not-an-email'); await press(page, 'button[type=submit]');
  ok(/full email/.test(await page.innerText('.err')), 'auth: invalid email explained');
  const lk = await (await fetch(`${AU}/accounts:lookup`, { method: 'POST', headers: H, body: JSON.stringify({ email: [EMAIL] }) })).json();
  const existing = !!(lk.users && lk.users.length);
  await page.fill('#em', EMAIL.toUpperCase()); await press(page, 'button[type=submit]');
  if (!existing) {
    await page.waitForSelector('#nm');
    await snap(page, 'auth-register');
    await checkLayout(page, 'auth register');
    await page.fill('#nm', NAME); await page.fill('#sc', 'Kendriya Vidyalaya No. 2, Sector 8, R.K. Puram, New Delhi'); await page.fill('#se', '9-B');
    const pins = async (sel, pin) => { const ins = page.locator(`${sel} input`); for (let i = 0; i < 4; i++) await ins.nth(i).fill(pin[i]); };
    await pins('[data-pin="n"]', '1111'); await pins('[data-pin="c"]', '1111'); await press(page, 'button[type=submit]');
    ok(/harder to guess/.test(await page.innerText('.err')), 'register: easy PIN rejected');
    await pins('[data-pin="n"]', PIN); await pins('[data-pin="c"]', '2581'); await press(page, 'button[type=submit]');
    ok(/don't match/.test(await page.innerText('.err')), 'register: PIN mismatch caught');
    await pins('[data-pin="c"]', PIN); await press(page, 'button[type=submit]');
    await page.waitForSelector('.hello', { timeout: 20000 });
    ok(true, 'register: account created, dashboard shown');
  } else {
    await page.waitForSelector('[data-pin="a"]');
    const ins = page.locator('[data-pin="a"] input'); for (let i = 0; i < 4; i++) await ins.nth(i).fill(PIN[i]);
    await page.waitForSelector('#topbar .avatar', { timeout: 20000 });
  }
  await sleep(500);
  await snap(page, 'dashboard');
  await checkLayout(page, 'dashboard');

  // ---------- play the course ----------
  let k = 0;
  for (const u of course) {
    for (const t of u.topics) {
      if (FILTER && !new RegExp(FILTER).test(t.id)) continue;
      const opts = { failQuiz: k % 6 === 1, wrongInCheck: k % 3 === 0, codeFailFirst: t.id === 'u5-02', downloadCert: k === 0 || t.id === 'cp-04' };
      const t0 = Date.now();
      try { await playTopic(page, t, opts); }
      catch (e) { fails.push(`${t.id}: ${String(e.message).split('\n')[0]}`); console.log('ERR', t.id, e.message); await shot(page, SHOTS + '/errors', t.id); }
      console.log(`  ${t.id} took ${Math.round((Date.now() - t0) / 1000)}s`);
      k++;
    }
    if (!FILTER) {
      // unit page after the unit
      await page.evaluate(id => { location.hash = '#/u/' + id; }, u.id); await page.waitForSelector('.tlist');
      await snap(page, 'unit-page'); await checkLayout(page, 'unit page ' + u.id);
    }
  }
  await sync(page);
  console.log(`\nProblems (${problems.length}):\n` + problems.join('\n'));
  console.log(`\nFailures (${fails.length}):\n` + fails.join('\n'));
  console.log(`\n${passes} passed, ${fails.length} failed, ${problems.length} problems`);
  await browser.close();
  process.exit(fails.length || problems.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });

async function sync(page) { try { await store(page, m => m.sync()); } catch (e) {} }

async function loadCourseNode() {
  const ids = ['u1', 'u2', 'u3', 'u4', 'u5', 'cp'];
  const out = [];
  for (const id of ids) out.push((await import(require('path').resolve(__dirname, `../js/content/${id}.js`))).default);
  return out;
}
