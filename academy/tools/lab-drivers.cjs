// Lab drivers: play each lab to completion the way a learner would (taps, typing, drawing).
// Each driver: async (page, h) where h = { root, press, sleep, shot, layout, MOBILE }.
// Used by course-e2e.cjs (inside the topic player) and labs-e2e.cjs (tools/labtest.html).

const vis = (page, sel) => page.locator(sel).first().isVisible().catch(() => false);
const count = (page, sel) => page.locator(sel).count();
const txt = (page, sel) => page.locator(sel).first().innerText();

// Press option buttons one after another until `done()` is true (for "try again until right" labs).
async function tryUntil(page, h, optSel, done, max = 8) {
  for (let k = 0; k < max; k++) {
    if (await done()) return true;
    const opt = page.locator(`${h.root} ${optSel}:not(:disabled)`).first();
    if (!(await opt.count())) break;
    await h.press(page, opt);
    await h.sleep(60);
  }
  return done();
}

// Draw a path on a canvas; pts are [x, y] in 0..1 of the canvas box.
async function draw(page, sel, pts, steps = 4) {
  const box = await page.locator(sel).first().boundingBox();
  const P = ([x, y]) => [box.x + x * box.width, box.y + y * box.height];
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  const b2 = await page.locator(sel).first().boundingBox();
  const Q = ([x, y]) => [b2.x + x * b2.width, b2.y + y * b2.height];
  const [x0, y0] = Q(pts[0]);
  await page.mouse.move(x0, y0); await page.mouse.down();
  for (let i = 1; i < pts.length; i++) { const [x, y] = Q(pts[i]); await page.mouse.move(x, y, { steps }); }
  await page.mouse.up();
}
async function tapAt(page, sel, x, y) {
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  const b = await page.locator(sel).first().boundingBox();
  await page.mouse.click(b.x + x * b.width, b.y + y * b.height);
}
const circlePts = (cx = 0.5, cy = 0.5, r = 0.32, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + i / n * Math.PI * 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });

// The lab's seeded random generator, recreated in the page (app: per learner; labtest: 'test-seed').
const LABRNG = `async (id) => {
  const { rngFrom } = await import('/academy/js/core/rng.js');
  let st = null; try { st = (await import('/academy/js/core/store.js')).S.state; } catch (e) {}
  return st ? rngFrom(st.seed, 'lab', id) : rngFrom('test-seed', id);
}`;

const D = {};

D['smart-home'] = async (page, h) => {
  const r = h.root;
  await page.fill(`${r} #shIn`, 'please switch on the kitchen lights');
  await h.press(page, `${r} #shForm button[type=submit]`);
  for (const c of ['Dim the bedroom to 30%', "It's too dark in the study", 'Turn off all the lights', 'Set the balcony to fifty percent', 'Switch on the living room lights', 'Are the lights on?']) {
    if (await vis(page, `${r} #shDone .lab-done`)) break;
    await h.press(page, `${r} [data-c="${c.replace(/"/g, '\\"')}"]`);
  }
  await h.press(page, `${r} [data-c="Play my favourite song"]`);
};

D.rps = async (page, h) => {
  const seq = 'rpsrrpspsrsprpssrpsr';
  for (const m of seq) await h.press(page, `${h.root} [data-m="${m}"]`);
  await h.shot('done');
};

D.quickdraw = async (page, h) => {
  const r = h.root;
  const base = await page.evaluate(async () => (await import('/academy/js/labs/quickdraw.js')).BASE);
  for (let round = 0; round < 6; round++) {
    await h.press(page, `${r} #qdGo`);
    const name = (await txt(page, `${r} #qdPrompt b`)).replace(/^a\s+/i, '').trim().toLowerCase();
    const key = Object.keys(base).find(k => name.startsWith(k === 'tick' ? 'tick' : k)) || 'circle';
    const pts = base[key].map(([x, y]) => [0.5 + x / 300, 0.5 + y / 300]);
    await draw(page, `${r} #qdCanvas`, pts, 6);
    await h.sleep(250);
    if (await page.locator(`${r} #qdDone`).isEnabled()) await h.press(page, `${r} #qdDone`);
    if (round < 5) await h.press(page, `${r} #qdNext`);
  }
};

D.semantris = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 40; k++) {
    if (await vis(page, `${r} #smDone .lab-done`)) return;
    const plan = await page.evaluate(async root => {
      const m = await import('/academy/js/labs/semantris.js');
      const el = document.querySelector(root);
      const tower = [...el.querySelectorAll('.tw')].map(x => x.textContent.trim());
      const target = el.querySelector('.tw.target').textContent.trim();
      const chips = [...el.querySelectorAll('[data-c]')].map(b => b.dataset.c);
      const win = m.winners(target, tower);
      return { chip: chips.find(c => win.includes(c)), typed: win[0], target, tower, nwin: win.length };
    }, r);
    if (!plan.nwin) throw new Error(`no winning clue exists for target "${plan.target}" in tower ${plan.tower.join(',')}`);
    if (plan.chip) await h.press(page, `${r} [data-c="${plan.chip}"]`);
    else { await page.fill(`${r} #smIn`, plan.typed); await h.press(page, `${r} #smForm button`); }
    await h.sleep(700);
  }
};

D['four-ws'] = async (page, h) => {
  const r = h.root;
  await h.press(page, `${r} [data-sc="water"]`);
  const plan = await page.evaluate(async root => {
    const { SCEN } = await import('/academy/js/labs/four-ws.js');
    const sc = SCEN.find(s => s.id === 'water');
    return sc.st.map((s, i) => [i, s[0]]);
  }, r);
  // wrong first: everything as "who", check, then fix
  for (const [i] of plan) await h.press(page, `${r} [data-st="${i}"][data-w="who"]`);
  await h.press(page, `${r} #fwCheck`);
  for (const [i, w] of plan) await h.press(page, `${r} [data-st="${i}"][data-w="${w}"]`);
  await h.press(page, `${r} #fwCheck`);
  for (const w of ['who', 'what', 'where', 'why']) await h.press(page, `${r} [data-b="${w}"][data-k="0"]`);
  await h.press(page, `${r} #fwTCheck`);
};

D['system-map'] = async (page, h) => {
  const r = h.root;
  const M = await page.evaluate(async () => { const m = await import('/academy/js/labs/system-map.js'); return { m1: m.MAP1.links.map(l => l.s), w: m.MAP2.water.links.map(l => [l.real, l.s]) }; });
  for (let i = 0; i < M.m1.length; i++) await h.press(page, `${r} [data-m1="${i}"][data-s="${M.m1[i]}"]`);
  await h.press(page, `${r} #m1Check`);
  await h.press(page, `${r} [data-topic="water"]`);
  for (let i = 0; i < M.w.length; i++) {
    const [real, s] = M.w[i];
    await h.press(page, `${r} [data-ex="${i}"][data-v="${real ? 'y' : 'n'}"]`);
    if (real) await h.press(page, `${r} [data-m2="${i}"][data-s="${s}"]`);
  }
  await h.press(page, `${r} #m2Check`);
};

D['chart-chooser'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 6; k++) {
    const best = await page.evaluate(async root => {
      const m = await import('/academy/js/labs/chart-chooser.js');
      const q = document.querySelector(root + ' p.q').textContent.trim();
      const b = m.BANK.find(x => x.q === q); return b ? m.BEST[b.kind] : null;
    }, r);
    if (!best) throw new Error('chart-chooser: unknown question');
    if (k === 0) { await h.press(page, `${r} [data-t="pie"]`); await h.layout('pie'); }
    await h.press(page, `${r} [data-t="${best}"]`);
    if (k === 1) await h.shot('chart');
    await h.press(page, `${r} #ccNext`);
  }
};

D['decision-tree'] = async (page, h) => {
  const r = h.root;
  const facts = await page.evaluate(async () => { const m = await import('/academy/js/labs/decision-tree.js'); return { F: m.FACTS, N: Object.fromEntries(Object.entries(m.FRUITS).map(([k, v]) => [v.n, k])) }; });
  for (let k = 0; k < 20; k++) {
    if (await page.locator(`${r} #dtRun`).isEnabled()) break;
    const arr = await page.evaluate(root => [...document.querySelectorAll(root + ' .arrive .chip')].map(c => c.textContent.trim().replace(/^\S+\s/, '')), r);
    const ks = arr.map(n => facts.N[n]).filter(Boolean);
    if (ks.length <= 1) { await h.press(page, `${r} [data-leaf="${ks[0] || 'apple'}"]`); continue; }
    const qs = ['yellow', 'long', 'big', 'bunch', 'round', 'orange'];
    let pick = null;
    for (const q of qs) {
      if (!(await page.locator(`${r} [data-q="${q}"]`).isEnabled())) continue;
      const y = ks.filter(f => facts.F[f][q]).length; if (y > 0 && y < ks.length) { pick = q; break; }
    }
    if (!pick) throw new Error('decision-tree: no splitting question for ' + ks.join(','));
    await h.press(page, `${r} [data-q="${pick}"]`);
  }
  await h.shot('tree');
  await h.press(page, `${r} #dtRun`);
};

D['learn-by-example'] = async (page, h) => {
  const r = h.root, cv = `${r} #lbeCv`;
  // plane geometry (from the lab): W 420, H 340, L 58, R 12, T 14, B 46; x 0..12 h, y 0..100 %
  const toFrac = (x, y) => [(58 + x / 12 * (420 - 70)) / 420, (340 - 46 - y / 100 * (340 - 60)) / 340];
  for (const label of ['water', 'fine']) {
    await h.press(page, `${r} [data-l="${label}"]`);
    for (let x = 0.5; x < 12; x += 1) {
      for (const off of [5, 14]) {
        const y = 20 + 4 * x + (label === 'water' ? -off : off);
        if (y < 2 || y > 98) continue;
        const [fx, fy] = toFrac(x, y); await tapAt(page, cv, fx, fy);
      }
    }
  }
  await h.press(page, `${r} #lbeTest`);
  await h.shot('tested');
};

D['confusion-matrix'] = async (page, h) => {
  const r = h.root;
  const n = await count(page, `${r} .cm-card`);
  // first deliberately sort card 1 wrong, check, then fix everything
  for (let i = 0; i < n; i++) {
    const c = page.locator(`${r} .cm-card`).nth(i);
    const said = (await c.locator('.ln b').nth(0).innerText()).startsWith('Ripe'), really = (await c.locator('.ln b').nth(1).innerText()).startsWith('Ripe');
    let o = said ? (really ? 'TP' : 'FP') : (really ? 'FN' : 'TN');
    if (i === 0) o = o === 'TP' ? 'FP' : 'TP';
    await h.press(page, `${r} [data-i="${i}"][data-o="${o}"]`);
  }
  await h.press(page, `${r} #chk`);
  {
    const c = page.locator(`${r} .cm-card`).nth(0);
    const said = (await c.locator('.ln b').nth(0).innerText()).startsWith('Ripe'), really = (await c.locator('.ln b').nth(1).innerText()).startsWith('Ripe');
    await h.press(page, `${r} [data-i="0"][data-o="${said ? (really ? 'TP' : 'FP') : (really ? 'FN' : 'TN')}"]`);
    await h.press(page, `${r} #chk`);
  }
  const vals = await page.evaluate(root => [...document.querySelectorAll(root + ' .cm-mx td b')].map(b => +b.textContent), r); // TP FN FP TN
  const acc = Math.round((vals[0] + vals[3]) / 12 * 1000) / 10;
  await page.fill(`${r} #accIn`, String(vals[0] + vals[3])); await h.press(page, `${r} #accBtn`);   // a common slip first
  await page.fill(`${r} #accIn`, acc.toFixed(1)); await h.press(page, `${r} #accBtn`);
  await page.locator(`${r} #thr`).evaluate(el => { el.value = '0.3'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await h.press(page, `${r} [data-q="high"]`);
  await h.press(page, `${r} [data-q="low"]`);
};

D['cycle-walk'] = async (page, h) => {
  const r = h.root;
  for (const proj of ['blind', 'edu']) {
    if (proj === 'edu') await h.press(page, `${r} #goOther`);
    for (let s = 0; s < 6; s++) {
      await tryUntil(page, h, '#qbox .opt', () => vis(page, `${r} #next`), 4);
      await h.press(page, `${r} #next`);
      await page.waitForFunction(root => !document.querySelector(root + ' #next'), r, { timeout: 5000 }).catch(() => {});
      await h.sleep(900);
    }
  }
};

D['moral-machine'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 6; k++) {
    await h.press(page, `${r} [data-r="${k % 2}"]`);
    await h.press(page, `${r} [data-c]`);
    if (k === 0) await h.shot('reflect');
    await h.press(page, `${r} #mmNext`);
  }
};

D['bias-lab'] = async (page, h) => {
  const r = h.root;
  // first a mistake: only the best-served group, then start over and spend wisely
  await h.press(page, `${r} [data-g="0"][data-n="100"]`); await h.press(page, `${r} #bTrain`);
  await h.press(page, `${r} #bReset`);
  for (let k = 0; k < 4; k++) await h.press(page, `${r} [data-g="1"][data-n="100"]`);
  for (let k = 0; k < 5; k++) await h.press(page, `${r} [data-g="2"][data-n="100"]`);
  await h.press(page, `${r} [data-g="1"][data-n="50"]`);
  await h.press(page, `${r} #bTrain`);
};

D['balloon-debate'] = async (page, h) => {
  const r = h.root;
  for (let i = 0; i < 12; i++) await h.press(page, `${r} [data-i="${i}"][data-v="1"]`);
  await h.press(page, `${r} #bdChk`);
  const wrong = await page.evaluate(root => [...document.querySelectorAll(root + ' .st.wrong [data-v="0"]')].map(b => b.dataset.i), r);
  for (const i of wrong) await h.press(page, `${r} [data-i="${i}"][data-v="0"]`);
  await h.press(page, `${r} #bdChk`);
  for (let k = 0; k < 3; k++) await h.press(page, `${r} .pick:not([aria-pressed="true"]):not(:disabled)`);
  await h.press(page, `${r} #bdBuild`);
};

D['misleading-chart'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 5; k++) {
    await tryUntil(page, h, '#mcMain .opt', () => vis(page, `${r} #mcNext`), 5);
    if (k === 0) await h.shot('case');
    await h.press(page, `${r} #mcNext`);
  }
};

D['phishing-spotter'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 6; k++) {
    await h.press(page, `${r} .bit`);
    await h.press(page, `${r} [data-v="${k % 2 ? 0 : 1}"]`);
    if (k === 0) await h.shot('feedback');
    await h.press(page, `${r} #phNext`);
  }
};

D['password-meter'] = async (page, h) => {
  const r = h.root;
  await h.press(page, `${r} [data-ex="india123"]`);
  await page.fill(`${r} #pwIn`, 'Mango-Kite-rides-Bicycle-47!');
  await h.press(page, `${r} #pwEye`);
  for (let k = 0; k < 4; k++) {
    const id = await page.locator(`${r} .habit [data-h]`).nth(k * 2).getAttribute('data-h');
    await h.press(page, `${r} [data-h="${id}"][data-v="1"]`);
    if (await page.locator(`${r} .habit.wrong [data-h="${id}"]`).count()) await h.press(page, `${r} [data-h="${id}"][data-v="0"]`);
  }
};

D['data-cleaner'] = async (page, h) => {
  const r = h.root;
  await h.press(page, `${r} .tool[data-k="fill"]`);   // locked until the rest are fixed (toast)
  for (const k of ['dup', 'unit', 'out', 'city', 'fill']) await h.press(page, `${r} .tool[data-k="${k}"]`);
};

D['trend-reader'] = async (page, h) => {
  const r = h.root;
  for (let c = 0; c < 5; c++) {
    for (let q = 0; q < 3; q++) {
      const label = await txt(page, `${r} .qcount span`);
      await tryUntil(page, h, '#trBox .opt', async () => (await txt(page, `${r} .qcount span`)) !== label || await vis(page, `${r} #trNext`), 5);
    }
    if (c === 0) await h.shot('chart');
    await h.press(page, `${r} #trNext`);
  }
};

D['dashboard-builder'] = async (page, h) => {
  const r = h.root;
  await page.locator(`${r} #dbKpi`).selectOption('rev'); await h.press(page, `${r} #dbAddK`);
  await h.press(page, `${r} #dbAddC`);
  await h.press(page, `${r} [data-fm="qty"]`); await h.press(page, `${r} [data-fg="day"]`); await h.press(page, `${r} #dbAddC`);
  // Q2: total revenue in a month — set the filter, read the KPI
  const q2 = await txt(page, `${r} #dbQs .qrow:nth-child(2)`);
  const mon = { July: 'Jul', August: 'Aug', September: 'Sep' }[(q2.match(/in (July|August|September)/) || [])[1]];
  await h.press(page, `${r} [data-f="${mon}"]`);
  const kpi = await txt(page, `${r} #dbKpis .stat .v`);
  const amount = kpi.replace(/,/g, '').match(/\d+/)[0];
  await page.fill(`${r} #dbN1`, amount); await h.press(page, `${r} [data-q="1"]`);
  await h.press(page, `${r} [data-f="All"]`);
  for (const qi of [0, 2]) {
    for (let k = 0; k < 8; k++) {
      if (await page.locator(`${r} #dbQs .qrow:nth-child(${qi + 1}) .chip.ok`).count()) break;
      await h.press(page, page.locator(`${r} [data-q="${qi}"][data-o]`).nth(k));
    }
  }
  await h.shot('built');
};

D['number-patterns'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 8; k++) {
    const ans = await page.evaluate(async ([root, RNG]) => {
      const rng = await eval(RNG)('number-patterns');
      const { makeSet } = await import('/academy/js/labs/number-patterns.js');
      const set = makeSet(rng);
      const vals = [...document.querySelectorAll(root + ' .tile')].map(t => t.textContent.trim());
      const p = set.find(p => p.terms.length === vals.length && p.terms.every((v, i) => i === p.miss ? vals[i] === '?' : String(v) === vals[i]));
      return p ? p.terms[p.miss] : null;
    }, [r, LABRNG]);
    if (ans == null) throw new Error('number-patterns: could not match pattern');
    await page.fill(`${r} #npIn`, String(k === 0 ? ans + 1 : ans));
    if (k === 1) await h.press(page, `${r} #npHint`), await page.fill(`${r} #npIn`, String(ans));
    await h.press(page, `${r} #npGo`);
    await h.press(page, `${r} #npNext`);
  }
};

D['picture-analogy'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 6; k++) {
    const ans = await page.evaluate(async ([root, RNG]) => {
      const rng = await eval(RNG)('picture-analogy');
      const { makePuzzles } = await import('/academy/js/labs/picture-analogy.js');
      const set = makePuzzles(rng);
      const qi = +document.querySelector(root + ' .qcount span').textContent.match(/Puzzle (\d+)/)[1] - 1;
      return set[qi].ans;
    }, [r, LABRNG]);
    await h.press(page, `${r} .op[data-i="${ans}"]`);
    await h.press(page, `${r} #paNext`);
  }
};

D['stats-explorer'] = async (page, h) => {
  const r = h.root;
  const clear = async () => { while (await count(page, `${r} [data-rm]`)) await h.press(page, `${r} [data-rm="0"]`); };
  const add = async v => { await page.fill(`${r} #seIn`, String(v)); await h.press(page, `${r} #seAdd`); };
  await clear();
  await tapAt(page, `${r} #sePlot`, (22 + 8 * 19) / 422, 0.55);   // tap the number line at 8 (Add tool)
  for (let k = 0; k < 4; k++) await add(8);
  // challenge 2: one outlier
  await add(19);
  await tryUntil(page, h, '[data-a]', () => page.locator(`${r} #seCh li.ok`).count().then(n => n >= 2), 3);
  // challenge 3
  await clear();
  for (const v of [2, 2, 5, 9, 12]) await add(v);
};

D['car-spotting'] = async (page, h) => {
  const r = h.root;
  if (!h.MOBILE) {
    // the real 60-second survey on desktop, tapping a few colours while it runs
    await h.press(page, `${r} #csGo`);
    for (let k = 0; k < 8; k++) { await h.sleep(2000); await h.press(page, `${r} .tb[data-c]`); }
    await page.waitForSelector(`${r} #csQs`, { timeout: 70000 });
  } else {
    await h.press(page, `${r} #csList`);
    const cols = await page.evaluate(root => [...document.querySelectorAll(root + ' #csListBox tbody tr')].map(tr => tr.children[2].textContent.trim()), r);
    const keys = await page.evaluate(root => [...document.querySelectorAll(root + ' .tb')].map(b => [b.dataset.c, b.textContent.trim().replace(/\d+$/, '').trim()]), r);
    for (const c of cols) { const k = keys.find(([, n]) => c.startsWith(n)); await h.press(page, `${r} .tb[data-c="${k[0]}"]`); }
    await h.press(page, `${r} #csDone`);
  }
  await h.shot('table');
  const total = await page.evaluate(root => { const rows = [...document.querySelectorAll(root + ' #csRes tbody tr')]; return rows[rows.length - 1].lastElementChild.textContent.trim(); }, r);
  await page.fill(`${r} #csNum`, total); await h.press(page, `${r} [data-q="1"]`);
  for (const qi of [0, 2, 3]) {
    for (let k = 0; k < 5; k++) {
      if (await page.locator(`${r} #csQs .qrow:nth-child(${qi + 1}) .chip.ok`).count()) break;
      await h.press(page, page.locator(`${r} #csQs [data-q="${qi}"][data-o]`).nth(k));
    }
  }
};

D['probability-sim'] = async (page, h) => {
  const r = h.root;
  for (const e of ['coin', 'die', 'two']) {
    await h.press(page, `${r} [data-e="${e}"]`);
    await h.press(page, `${r} [data-n="${e === 'coin' ? 10 : 1000}"]`);
    await page.waitForFunction(root => !document.querySelector(root + ' [data-n]').disabled, r, { timeout: 10000 });
  }
  for (let q = 0; q < 4; q++) {
    const before = await txt(page, `${r} #pbQ`);
    await tryUntil(page, h, '#pbQ .opt', async () => (await txt(page, `${r} #pbQ`)).slice(0, 60) !== before.slice(0, 60) && !(await txt(page, `${r} #pbQ`)).startsWith(before.slice(0, 20)) || await vis(page, `${r} #pbEnd .lab-done`), 6);
  }
};

D['real-or-ai'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 8; k++) {
    await h.press(page, `${r} [data-v="${k % 2 ? 'real' : 'ai'}"]`);
    await h.press(page, `${r} [data-c]`);
    if (k === 0) await h.shot('reveal');
    await h.press(page, `${r} #raNext`);
  }
};

D['next-word'] = async (page, h) => {
  const r = h.root;
  await page.fill(`${r} #nwIn`, 'my friend'); await h.press(page, `${r} #nwForm button`);
  await h.press(page, `${r} .nw-opt`);
  for (const t of ['0.2', '1.5', '1.0']) {
    await page.locator(`${r} #nwT`).evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
    await h.press(page, `${r} #nwGen`);
    await page.waitForFunction(root => !document.querySelector(root + ' #nwGen').disabled, r, { timeout: 15000 });
    await h.press(page, `${r} #nwClear`);
  }
};

D.discriminator = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 5; k++) {
    const n = await count(page, `${r} .ds-cell`);
    for (let i = 0; i < n; i++) await h.press(page, `${r} [data-i="${i}"][data-v="${i % 3 ? 'real' : 'fake'}"]`);
    await h.press(page, `${r} #dsCheck`);
    await h.press(page, `${r} #dsNext`);
  }
};

D['gan-paint'] = async (page, h) => {
  const r = h.root, cv = `${r} #gpCv`;   // canvas 800 x 500; house wall x 470-650, y 230-380
  await tapAt(page, cv, 100 / 800, 60 / 500);                      // tree in the sky: refused
  await h.press(page, `${r} [data-b="cloud"]`); await draw(page, cv, [[0.3, 0.12], [0.45, 0.14]]);
  await h.press(page, `${r} [data-b="tree"]`); await tapAt(page, cv, 150 / 800, 470 / 500);
  await h.press(page, `${r} [data-b="window"]`); await tapAt(page, cv, 520 / 800, 270 / 500);
  await h.press(page, `${r} [data-b="door"]`); await tapAt(page, cv, 600 / 800, 350 / 500);
  await h.shot('painted');
};

D['genai-cases'] = async (page, h) => {
  const r = h.root;
  for (let k = 0; k < 8; k++) {
    await tryUntil(page, h, '.opt', () => vis(page, `${r} #gcNext`), 4);
    await h.press(page, `${r} #gcNext`);
  }
};

D['robo-runner'] = async (page, h) => {
  const r = h.root;
  await page.waitForFunction(root => /Python ready/.test((document.querySelector(root + ' #rrPy') || {}).textContent || ''), r, { timeout: 90000 });
  for (let lv = 0; lv < 6; lv++) {
    for (let f = 0; f < 2; f++) {   // the starter code does not solve the level: two tries unlock the model solution
      await h.press(page, `${r} #rrRun`);
      await page.waitForFunction(root => !document.querySelector(root + ' #rrRun').disabled, r, { timeout: 30000 });
    }
    if (lv === 0) await h.shot('fail');
    await h.press(page, `${r} #rrSol`);
    await h.press(page, `${r} #rrUse`);
    await h.press(page, `${r} #rrRun`);
    await page.waitForFunction(root => !document.querySelector(root + ' #rrRun').disabled, r, { timeout: 30000 });
    if (!(await vis(page, `${r} #rrOut .fb.good`))) throw new Error(`robo-runner level ${lv + 1}: model solution did not solve it: ` + (await txt(page, `${r} #rrOut`)).slice(0, 200));
    if (lv < 5) await h.press(page, `${r} #rrNext`);
  }
};

const SHAPES = {
  0: () => circlePts(0.5, 0.5, 0.3),
  1: () => [[0.2, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8], [0.2, 0.2]],
  2: () => [[0.15, 0.7], [0.35, 0.3], [0.5, 0.7], [0.65, 0.3], [0.85, 0.7]]
};
const jitter = (pts, k) => pts.map(([x, y], i) => [x + 0.03 * Math.sin(k * 7 + i), y + 0.03 * Math.cos(k * 5 + i)]);
D['doodle-trainer'] = async (page, h) => {
  const r = h.root, cv = `${r} #dtCv`;
  await page.fill(`${r} #dtN0`, 'Circle'); await page.fill(`${r} #dtN1`, 'Square'); await page.fill(`${r} #dtN2`, 'Zigzag');
  await h.press(page, `${r} #dtNames button[type=submit]`);
  for (let c = 0; c < 3; c++) for (let k = 0; k < 6; k++) {
    await draw(page, cv, jitter(SHAPES[c](), k));
    await h.press(page, `${r} [data-add="${c}"]`);
  }
  await h.shot('collected');
  await h.press(page, `${r} #dtTrain`);
  await page.waitForSelector(`${r} #dtEval`, { timeout: 5000 });
  await draw(page, cv, SHAPES[0]());
  await h.press(page, `${r} #dtEval`);
  for (let k = 0; k < 9; k++) {
    const want = await txt(page, `${r} #dtRight p span`);
    const c = ['Circle', 'Square', 'Zigzag'].indexOf(want.trim());
    await draw(page, cv, jitter(SHAPES[c](), k + 11));
    await h.press(page, `${r} #dtSubmit`);
  }
  await h.shot('result');
};

D['sdg-project'] = async (page, h) => {
  const r = h.root;
  const next = () => h.press(page, `${r} #sdgNext`);
  await h.press(page, `${r} [data-sdg="4"]`); await next();
  await h.press(page, `${r} [data-prob="0"]`); await next();
  await page.fill(`${r} [data-k="w.who"]`, 'Students of Class 9 in our school');
  await page.fill(`${r} [data-k="w.what"]`, 'many students cannot find good practice questions');
  await page.fill(`${r} [data-k="w.where"]`, 'when they revise for exams at home');
  await page.fill(`${r} [data-k="w.why"]`, 'help every student practise at the right level');
  await next(); await h.layout('statement'); await next();
  for (let k = 0; k < 4; k++) await h.press(page, `${r} [data-addel]`);
  for (const [a, b, s] of [[0, 1, '+'], [1, 2, '-'], [2, 3, '+']]) {
    await page.locator(`${r} #lnA`).selectOption(String(a)); await page.locator(`${r} #lnB`).selectOption(String(b));
    await h.press(page, `${r} [data-seg="sign"][data-v="${s}"]`); await h.press(page, `${r} #lnAdd`);
  }
  await h.shot('map'); await next();
  await h.press(page, `${r} [data-seg="ch"][data-v="bar"]`);
  await page.fill(`${r} [data-k="dt.ins"]`, 'The values differ a lot between rows, so some groups need more help.');
  await h.shot('data'); await next();
  await page.fill(`${r} [data-k="ai.name"]`, 'PracticePal');
  await page.fill(`${r} [data-k="ai.how"]`, 'It suggests practice questions at the right level for each student.');
  await h.press(page, `${r} [data-dom]`);
  await page.fill(`${r} [data-k="ai.need"]`, 'Quiz scores and topics practised');
  await h.press(page, `${r} [data-seg="appr"][data-v="learn"]`);
  await h.press(page, `${r} [data-tog="ev"]`); await h.press(page, `${r} [data-tog="dep"]`);
  await next();
  const eth = await page.evaluate(root => [...document.querySelectorAll(root + ' [data-k^="eth."]')].map(e => e.dataset.k), r);
  for (const k of eth) await page.fill(`${r} [data-k="${k}"]`, 'We will keep data private and check that it is fair for everyone.');
  await next();
  await h.shot('report');
  const dl = page.waitForEvent('download', { timeout: 30000 });
  await h.press(page, `${r} #pdfBtn`);
  const d = await dl;
  if (!/\.pdf$/.test(d.suggestedFilename())) throw new Error('sdg report not a pdf: ' + d.suggestedFilename());
  h.downloads && h.downloads.push(d.suggestedFilename());
};

D.portfolio = async (page, h) => {
  const r = h.root;
  await h.press(page, `${r} [data-prompt="0"]`);
  await page.fill(`${r} [data-k="letter.t"]`, 'Dear future me, today I learned how AI learns from data and why fairness matters. I hope you still ask good questions and use AI kindly.');
  await h.press(page, `${r} [data-tab="home"]`);
  for (let k = 0; k < 3; k++) {
    await h.press(page, page.locator(`${r} [data-pal]`).nth(k));
    await h.press(page, `${r} [data-place="${k}"]`);
    await page.fill(`${r} [data-k="home.dev.${k}.u"]`, 'motion and time');
    await page.fill(`${r} [data-k="home.dev.${k}.dc"]`, 'when to switch on');
  }
  await h.shot('home');
  await h.press(page, `${r} [data-tab="job"]`);
  await page.fill(`${r} [data-k="job.title"]`, 'AI Crop Doctor');
  await h.press(page, `${r} [data-skill="ai"]`);
  await h.press(page, `${r} [data-skill="hu"]`);
  await page.fill(`${r} [data-k="job.why"]`, 'Farms will use AI cameras and someone must train and check them.');
  await h.press(page, `${r} [data-tab="pdf"]`);
  await h.shot('pdf');
  const dl = page.waitForEvent('download', { timeout: 30000 });
  await h.press(page, `${r} #pfPdf`);
  const d = await dl;
  if (!/\.pdf$/.test(d.suggestedFilename())) throw new Error('portfolio not a pdf');
};

module.exports = D;
