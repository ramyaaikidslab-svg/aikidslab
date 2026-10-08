// Plays every lab to completion in tools/labtest.html (no account needed), at phone size with touch
// and at desktop size. Checks: complete() called exactly once, no page/console errors, no sideways scroll.
// Run (repo root served on :8765): PW=$(npm root -g)/playwright node tools/labs-e2e.cjs [mobile|mobile360|desktop] [labFilter]
const { chromium } = require(process.env.PW);
const { monitor, layoutIssues, shot, sleep } = require('./e2e-lib.cjs');
const DRIVERS = require('./lab-drivers.cjs');
const PROFILE = process.argv[2] || 'mobile', FILTER = process.argv[3] || '', MOBILE = PROFILE.startsWith('mobile'), W = PROFILE === 'mobile360' ? 360 : 390;
const SHOTS = (process.env.SHOTS || '/tmp/aikl-shots') + '/labtest-' + PROFILE;

(async () => {
  const b = await chromium.launch();
  const results = [];
  for (const id of Object.keys(DRIVERS)) {
    if (FILTER && !new RegExp(FILTER).test(id)) continue;
    const c = await b.newContext({ ...(MOBILE ? { viewport: { width: W, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 } : { viewport: { width: 1280, height: 900 } }), acceptDownloads: true });
    const page = await c.newPage(); page.setDefaultTimeout(15000);
    const probs = []; monitor(page, id, probs);
    const press = async (p, sel) => { const l = typeof sel === 'string' ? p.locator(sel).first() : sel; await l.scrollIntoViewIfNeeded(); if (MOBILE) await l.tap(); else await l.click(); };
    const t0 = Date.now();
    let err = '';
    try {
      await page.goto(`http://localhost:8765/academy/tools/labtest.html?lab=${id}`);
      await page.waitForFunction(() => (window.__labLog || []).length > 0);
      const lay = async w => (await layoutIssues(page)).forEach(i => probs.push(`[layout] ${id} ${w}: ${i}`));
      await lay('start');
      await DRIVERS[id](page, { root: '#lab', press, sleep, MOBILE, shot: n => shot(page, SHOTS, id + '-' + n), layout: lay });
      await page.waitForFunction(() => window.__completeCount > 0, null, { timeout: 15000 }).catch(() => {});
      await lay('end');
      await shot(page, SHOTS, id + '-end');
    } catch (e) { err = String(e.message).split('\n')[0]; await shot(page, SHOTS, id + '-ERROR').catch(() => {}); }
    const n = await page.evaluate(() => window.__completeCount).catch(() => -1);
    const log = await page.evaluate(() => (window.__labLog || []).filter(l => /ERROR|COMPLETE/.test(l))).catch(() => []);
    const ok = n === 1 && !err && !probs.length;
    results.push(ok);
    console.log(`${ok ? 'PASS' : 'FAIL'} ${id} complete×${n} ${Math.round((Date.now() - t0) / 1000)}s ${err ? 'ERR: ' + err : ''}`);
    probs.forEach(p => console.log('   ' + p)); log.filter(l => /ERROR/.test(l)).forEach(l => console.log('   ' + l));
    await c.close();
  }
  console.log(`\n${results.filter(Boolean).length} / ${results.length} labs passed (${PROFILE})`);
  await b.close();
  process.exit(results.every(Boolean) ? 0 : 1);
})();
