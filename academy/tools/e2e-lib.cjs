// Shared helpers for the browser end-to-end tests (course-e2e.cjs, lab drivers).
// Playwright is loaded from process.env.PW (e.g. PW=$(npm root -g)/playwright).
const fs = require('fs');
const path = require('path');

const IGNORED_URL = /fonts\.googleapis|fonts\.gstatic|cdnjs\.cloudflare|googletagmanager|google-analytics/;

// Watch a page for anything a learner might hit: page errors, console errors, failed same-origin requests.
function monitor(page, label, sink) {
  const add = (kind, msg) => sink.push(`[${label}] ${kind}: ${msg}`);
  page.on('pageerror', e => add('pageerror', String(e && e.stack || e).split('\n').slice(0, 3).join(' | ')));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text(), loc = (m.location() && m.location().url) || '';
    if (IGNORED_URL.test(t) || IGNORED_URL.test(loc)) return;
    if (/net::ERR_(NAME_NOT_RESOLVED|TUNNEL|CONNECTION|PROXY|INTERNET)/.test(t) && !/localhost|127\.0\.0\.1/.test(t)) return;
    add('console', t.slice(0, 300) + (loc ? ' @' + loc : ''));
  });
  page.on('response', r => {
    const u = r.url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1):8765\//.test(u) && r.status() >= 400) add('http', r.status() + ' ' + u);
  });
  page.on('requestfailed', r => {
    const u = r.url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1):8765\//.test(u) && !/ERR_ABORTED/.test(r.failure() && r.failure().errorText || '')) add('requestfailed', u + ' ' + (r.failure() && r.failure().errorText));
  });
}

// Layout problems at the current viewport: horizontal page scroll, and elements whose box sticks out
// past the right edge of the screen (outside any element that scrolls sideways on purpose).
async function layoutIssues(page) {
  return page.evaluate(() => {
    const out = [], vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw + 1) out.push(`page scrolls sideways: scrollWidth ${document.documentElement.scrollWidth} > ${vw}`);
    const clipped = el => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) return true; } return false; };
    const seen = new Set();
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('.modal-bg') && !document.querySelector('.modal-bg')) continue;
      const cs = getComputedStyle(el);
      if (el.closest('.sr') || cs.position === 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (/^(svg|path|g|circle|rect|text|line|polyline|polygon|defs|marker|clippath|stop|radialgradient|lineargradient|tspan|ellipse|style|script|option)$/i.test(el.tagName)) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.right > vw + 1.5 && !clipped(el)) {
        const id = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
        if (!seen.has(id)) { seen.add(id); out.push(`overflows right edge by ${Math.round(r.right - vw)}px: ${id} "${(el.textContent || '').trim().slice(0, 50)}"`); }
      }
      // Text cut off inside a box that hides overflow (single line ellipsis is allowed when it has a title).
      if ((cs.overflowX === 'hidden' || cs.overflow === 'hidden') && el.scrollWidth > el.clientWidth + 2 && el.children.length === 0 && (el.textContent || '').trim() && !el.title && cs.textOverflow !== 'ellipsis') {
        out.push(`text cut off: ${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} "${el.textContent.trim().slice(0, 50)}"`);
      }
    }
    return out.slice(0, 8);
  });
}

async function shot(page, dir, name, full = true) {
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, name.replace(/[^\w.-]+/g, '_') + '.png');
  await page.screenshot({ path: f, fullPage: full });
  return f;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = { monitor, layoutIssues, shot, sleep, IGNORED_URL };
