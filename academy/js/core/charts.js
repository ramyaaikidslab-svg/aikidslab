// Tiny SVG chart helpers for labs and lessons. All charts are drawn to one
// linear scale per axis, label only values the data reaches, and use the design
// system colours. Each returns an SVG string.

const PAL = ['#2F6FED', '#E8453C', '#109A66', '#DFA426', '#7B4DFF', '#0E9C9C', '#15171C'];
const e = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function niceMax(v) { if (v <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
function ticks(max, n = 5) { const step = max / n; return Array.from({ length: n + 1 }, (_, i) => +(i * step).toFixed(6)); }
function fmt(v) { return Math.abs(v) >= 1000 ? (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k' : (+v.toFixed(2)).toString(); }

function frame(W, H, L, B, T, R, max, title, ylabel, min = 0) {
  let g = '';
  ticks(max - min).forEach(t => {
    const v = min + t, y = H - B - (t / (max - min)) * (H - B - T);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#E6DFCF"/><text x="${L - 6}" y="${y + 4}" text-anchor="end">${fmt(v)}</text>`;
  });
  g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#15171C" stroke-width="2"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#15171C" stroke-width="2"/>`;
  if (title) g += `<text x="${L}" y="14" style="font-weight:800">${e(title)}</text>`;
  if (ylabel) g += `<text x="${L}" y="${T - 6}" style="fill:#5B606A;font-size:11px">${e(ylabel)}</text>`;
  return g;
}

export function bar(labels, values, { W = 560, H = 300, title = '', ylabel = '', color = PAL[0], highlight = -1 } = {}) {
  const L = 48, B = 46, T = 30, R = 12, max = niceMax(Math.max(...values, 0) * 1.05);
  let g = frame(W, H, L, B, T, R, max, title, ylabel);
  const bw = (W - L - R) / labels.length;
  labels.forEach((lb, i) => {
    const v = values[i], h2 = (v / max) * (H - B - T), x = L + i * bw + bw * .15, y = H - B - h2;
    g += `<rect x="${x}" y="${y}" width="${bw * .7}" height="${h2}" rx="4" fill="${i === highlight ? '#FFC800' : color}" stroke="#15171C" stroke-width="1.5"/>`;
    g += `<text x="${x + bw * .35}" y="${y - 5}" text-anchor="middle">${fmt(v)}</text>`;
    g += `<text x="${x + bw * .35}" y="${H - B + 16}" text-anchor="middle">${e(lb).slice(0, 12)}</text>`;
  });
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(title || 'Bar chart')}">${g}</svg>`;
}

export function line(labels, series, { W = 560, H = 300, title = '', ylabel = '', names = [], min = 0 } = {}) {
  const L = 48, B = 46, T = 30, R = 12;
  const all = series.flat(); const max = niceMax(Math.max(...all) * 1.05);
  let g = frame(W, H, L, B, T, R, max, title, ylabel, min);
  const step = (W - L - R) / Math.max(1, labels.length - 1);
  const every = Math.ceil(labels.length / 12);
  labels.forEach((lb, i) => { if (i % every === 0) g += `<text x="${L + i * step}" y="${H - B + 16}" text-anchor="${i === labels.length - 1 ? 'end' : i === 0 ? 'start' : 'middle'}">${e(lb)}</text>`; });
  series.forEach((s, k) => {
    const pts = s.map((v, i) => `${L + i * step},${H - B - ((v - min) / (max - min)) * (H - B - T)}`).join(' ');
    g += `<polyline points="${pts}" fill="none" stroke="${PAL[k % PAL.length]}" stroke-width="3" stroke-linejoin="round"/>`;
    s.forEach((v, i) => { g += `<circle cx="${L + i * step}" cy="${H - B - ((v - min) / (max - min)) * (H - B - T)}" r="3.5" fill="#fff" stroke="${PAL[k % PAL.length]}" stroke-width="2"/>`; });
  });
  if (names.length) g += names.map((n, k) => `<rect x="${W - R - 130}" y="${T + k * 16}" width="10" height="10" fill="${PAL[k]}"/><text x="${W - R - 115}" y="${T + 9 + k * 16}">${e(n)}</text>`).join('');
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(title || 'Line chart')}">${g}</svg>`;
}

export function pie(labels, values, { W = 560, H = 300, title = '' } = {}) {
  const total = values.reduce((a, b) => a + b, 0) || 1, cx = 150, cy = H / 2 + 8, r = Math.min(120, H / 2 - 24);
  let a0 = -Math.PI / 2, g = title ? `<text x="12" y="16" style="font-weight:800">${e(title)}</text>` : '';
  values.forEach((v, i) => {
    const a1 = a0 + (v / total) * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    g += values.length === 1 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PAL[0]}" stroke="#15171C" stroke-width="2"/>`
      : `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z" fill="${PAL[i % PAL.length]}" stroke="#15171C" stroke-width="2"/>`;
    g += `<rect x="300" y="${40 + i * 22}" width="14" height="14" rx="3" fill="${PAL[i % PAL.length]}" stroke="#15171C"/><text x="322" y="${52 + i * 22}">${e(labels[i])} — ${Math.round(v / total * 100)}%</text>`;
    a0 = a1;
  });
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(title || 'Pie chart')}">${g}</svg>`;
}

export function scatter(points, { W = 560, H = 300, title = '', xlabel = '', ylabel = '', xmax, ymax, colors } = {}) {
  const L = 48, B = 46, T = 30, R = 12;
  const mx = xmax || niceMax(Math.max(...points.map(p => p[0])) * 1.05), my = ymax || niceMax(Math.max(...points.map(p => p[1])) * 1.05);
  let g = frame(W, H, L, B, T, R, my, title, ylabel);
  ticks(mx).forEach(t => { const x = L + (t / mx) * (W - L - R); g += `<text x="${x}" y="${H - B + 16}" text-anchor="middle">${fmt(t)}</text>`; });
  if (xlabel) g += `<text x="${W - R}" y="${H - 8}" text-anchor="end" style="fill:#5B606A;font-size:11px">${e(xlabel)} →</text>`;
  points.forEach((p, i) => { g += `<circle cx="${L + (p[0] / mx) * (W - L - R)}" cy="${H - B - (p[1] / my) * (H - B - T)}" r="5" fill="${colors ? colors[i] : PAL[0]}" stroke="#15171C" stroke-width="1.5"/>`; });
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(title || 'Scatter plot')}">${g}</svg>`;
}

export function histogram(values, bins, { W = 560, H = 300, title = '', xlabel = '' } = {}) {
  const lo = Math.min(...values), hi = Math.max(...values), w = (hi - lo) / bins || 1;
  const counts = Array(bins).fill(0); values.forEach(v => { counts[Math.min(bins - 1, Math.floor((v - lo) / w))]++; });
  const labels = counts.map((_, i) => `${fmt(lo + i * w)}–${fmt(lo + (i + 1) * w)}`);
  const L = 48, B = 46, T = 30, R = 12, max = niceMax(Math.max(...counts) * 1.05);
  let g = frame(W, H, L, B, T, R, max, title, 'Count');
  const bw = (W - L - R) / bins;
  counts.forEach((c, i) => { const h2 = (c / max) * (H - B - T); g += `<rect x="${L + i * bw}" y="${H - B - h2}" width="${bw}" height="${h2}" fill="${PAL[0]}" stroke="#15171C" stroke-width="1.5"/><text x="${L + i * bw + bw / 2}" y="${H - B + 16}" text-anchor="middle" style="font-size:10px">${labels[i]}</text>`; });
  if (xlabel) g += `<text x="${W - R}" y="${H - 8}" text-anchor="end" style="fill:#5B606A;font-size:11px">${e(xlabel)} →</text>`;
  return `<svg class="svgchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(title || 'Histogram')}">${g}</svg>`;
}

export const COLORS = PAL;
