// Certificates: issued when a topic is mastered, a unit is finished, or the whole
// course is complete. Drawn on a canvas (A4 landscape ratio) and downloadable as
// PNG or PDF. Each has an ID that the teacher's sheet can verify.
import CFG from '../config.js';
import { S, touch, addXP } from './store.js';
import { backend } from './store.js';
import { hashStr } from './rng.js';
import { fmtDate, download, toast } from './util.js';
import { loadPDF } from './pdf.js';

export function certId(kind, ref) {
  const h = hashStr(`${S.email}|${kind}|${ref}|${S.state.created}`).toString(36).toUpperCase().padStart(7, '0');
  return `AIKL-${kind === 'topic' ? 'T' : kind === 'unit' ? 'U' : 'C'}${h.slice(0, 7)}`;
}

/** Issue a certificate once; returns it. kind: topic | unit | course */
export function issue(kind, ref, title, extra = {}) {
  const id = certId(kind, ref);
  if (S.state.certs[id]) return S.state.certs[id];
  const c = { id, kind, ref, title, at: Date.now(), name: S.state.profile.name, ...extra };
  S.state.certs[id] = c;
  addXP(kind === 'topic' ? 100 : kind === 'unit' ? 300 : 1000);
  touch();
  backend.cert(S.email, S.token, c).catch(() => {});
  return c;
}

const W = 2000, H = 1414;
function rr(x, X, Y, w, h2, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h2, r); x.arcTo(X + w, Y + h2, X, Y + h2, r); x.arcTo(X, Y + h2, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
function wrap(x, text, maxW) {
  const words = String(text).split(' '), lines = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
  if (line) lines.push(line); return lines;
}

export async function drawCert(canvas, c) {
  try { await Promise.all(['800 80px "Baloo 2"', '700 40px "Nunito"', '800 40px "Nunito"'].map(f => document.fonts.load(f))); } catch (e) {}
  canvas.width = W; canvas.height = H;
  const x = canvas.getContext('2d');
  // background + frame
  x.fillStyle = '#FFF9EC'; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(21,23,28,.05)';
  for (let i = 40; i < W; i += 40) for (let j = 40; j < H; j += 40) { x.beginPath(); x.arc(i, j, 2, 0, 7); x.fill(); }
  x.lineWidth = 14; x.strokeStyle = '#15171C'; rr(x, 50, 50, W - 100, H - 100, 36); x.stroke();
  x.lineWidth = 6; x.strokeStyle = '#FFC800'; rr(x, 86, 86, W - 172, H - 172, 24); x.stroke();
  // corner bands by kind
  const band = c.kind === 'course' ? '#15171C' : c.kind === 'unit' ? '#2F6FED' : '#FFC800';
  x.fillStyle = band; x.beginPath(); x.moveTo(86, 300); x.lineTo(300, 86); x.lineTo(420, 86); x.lineTo(86, 420); x.fill();
  x.beginPath(); x.moveTo(W - 86, H - 300); x.lineTo(W - 300, H - 86); x.lineTo(W - 420, H - 86); x.lineTo(W - 86, H - 420); x.fill();
  // logo
  const lx = W / 2 - 300, ly = 170;
  x.lineWidth = 9; x.strokeStyle = '#15171C'; rr(x, lx, ly, 70, 70, 14); x.stroke();
  x.fillStyle = '#FFC800'; rr(x, lx + 22, ly + 22, 26, 26, 6); x.fill();
  x.fillStyle = '#15171C'; rr(x, lx + 31, ly + 31, 8, 8, 2); x.fill();
  x.fillStyle = '#15171C'; x.font = '800 44px "Nunito", sans-serif'; x.textBaseline = 'middle'; x.textAlign = 'left';
  x.fillText('AI KIDS LAB  ·  ACADEMY', lx + 96, ly + 37);
  // title
  x.textAlign = 'center'; x.textBaseline = 'alphabetic';
  x.font = '800 40px "Nunito", sans-serif'; x.fillStyle = '#87620F';
  x.fillText(c.kind === 'course' ? 'COURSE CERTIFICATE' : c.kind === 'unit' ? 'UNIT CERTIFICATE' : 'CERTIFICATE OF MASTERY', W / 2, 340);
  x.font = '800 104px "Baloo 2", sans-serif'; x.fillStyle = '#15171C';
  x.fillText(c.kind === 'course' ? 'AI Ready — Class IX' : 'Certificate of Achievement', W / 2, 450);
  x.font = '700 40px "Nunito", sans-serif'; x.fillStyle = '#5B606A'; x.fillText('This certifies that', W / 2, 545);
  // name
  x.font = '800 120px "Baloo 2", sans-serif'; x.fillStyle = '#15171C';
  const name = c.name || S.state.profile.name;
  x.fillText(name, W / 2, 680);
  const nw = Math.min(1300, x.measureText(name).width + 120);
  x.fillStyle = '#FFC800'; x.fillRect(W / 2 - nw / 2, 708, nw, 10);
  // achievement
  x.font = '700 40px "Nunito", sans-serif'; x.fillStyle = '#5B606A';
  x.fillText(c.kind === 'topic' ? 'has mastered the topic' : c.kind === 'unit' ? 'has completed every topic in' : 'has completed all units and the capstone of', W / 2, 800);
  x.font = '800 66px "Baloo 2", sans-serif'; x.fillStyle = '#15171C';
  const lines = wrap(x, c.title, 1500).slice(0, 2);
  lines.forEach((l, i) => x.fillText(l, W / 2, 885 + i * 74));
  let y = 885 + lines.length * 74 + 10;
  x.font = '700 36px "Nunito", sans-serif'; x.fillStyle = '#5B606A';
  x.fillText(CFG.COURSE + (c.unitTitle ? '  ·  ' + c.unitTitle : ''), W / 2, y);
  if (c.stars) { x.font = '800 54px "Nunito", sans-serif'; x.fillStyle = '#DFA426'; x.fillText('★'.repeat(c.stars) + '☆'.repeat(3 - c.stars), W / 2, y + 74); }
  // footer
  x.textAlign = 'left'; x.font = '700 32px "Nunito", sans-serif'; x.fillStyle = '#15171C';
  x.fillText('Date: ' + fmtDate(c.at), 200, H - 210);
  x.fillText('Certificate ID: ' + c.id, 200, H - 160);
  x.textAlign = 'right'; x.fillStyle = '#5B606A'; x.font = '700 28px "Nunito", sans-serif';
  x.fillText(CFG.BACKEND_URL ? 'Verify at ' + CFG.SITE.replace('https://', '') + '/academy/verify.html' : CFG.SITE.replace('https://', ''), W - 200, H - 160);
  x.font = '800 34px "Nunito", sans-serif'; x.fillStyle = '#15171C'; x.fillText(CFG.ORG, W - 200, H - 210);
  return canvas;
}

const fileName = c => `${(c.name || 'learner').replace(/[^\w]+/g, '-')}-${c.id}`;
export async function downloadPNG(c) {
  const cv = await drawCert(document.createElement('canvas'), c);
  cv.toBlob(b => { const u = URL.createObjectURL(b); download(fileName(c) + '.png', u); setTimeout(() => URL.revokeObjectURL(u), 4000); }, 'image/png');
}
export async function downloadPDF(c) {
  try {
    const [cv, jsPDF] = await Promise.all([drawCert(document.createElement('canvas'), c), loadPDF()]);
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.addImage(cv.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 297, 210);
    doc.setProperties({ title: `${c.title} — ${c.name}`, subject: 'AI Kids Lab Academy certificate', creator: 'AI Kids Lab Academy' });
    doc.save(fileName(c) + '.pdf');
  } catch (e) { toast('Could not make the PDF. Try the PNG download instead.'); }
}
