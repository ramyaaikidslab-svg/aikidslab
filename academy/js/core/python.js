// Main-thread API for running Python in the worker.
import CFG from '../config.js';

let worker = null, readyP = null, seq = 0;
const waiting = new Map();
export const pyState = { status: 'idle', listeners: new Set() };
function setStatus(s) { pyState.status = s; pyState.listeners.forEach(f => f(s)); }

function boot() {
  if (readyP) return readyP;
  setStatus('loading');
  const url = new URL('./py-worker.js', import.meta.url);
  url.searchParams.set('base', CFG.PYODIDE_URL);
  worker = new Worker(url, { type: 'module' });
  readyP = new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      const m = ev.data;
      if (m.type === 'ready') { setStatus('ready'); resolve(); return; }
      if (m.type === 'fatal') { setStatus('error'); reject(new Error(m.message)); return; }
      const w = waiting.get(m.id); if (!w) return;
      waiting.delete(m.id); clearTimeout(w.timer);
      m.ok ? w.resolve(m.res) : w.reject(new Error(m.error));
    };
    worker.onerror = e => { setStatus('error'); reject(new Error(e.message || 'Python failed to start')); };
  });
  return readyP;
}

function restart() {
  if (worker) worker.terminate();
  worker = null; readyP = null;
  waiting.forEach(w => { clearTimeout(w.timer); w.resolve({ stdout: w.partial || '', error: null, timedOut: true }); });
  waiting.clear();
  boot().catch(() => {});
}

export function warm() { return boot().catch(() => {}); }

function call(op, payload, timeout) {
  return boot().then(() => new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => {
      if (!waiting.has(id)) return;
      waiting.delete(id);
      resolve({ stdout: '', error: null, timedOut: true });
      restart();
    }, timeout);
    waiting.set(id, { resolve, reject, timer });
    worker.postMessage({ id, op, ...payload });
  }));
}

/** Run code. inputs: array of strings fed to input(). Returns {stdout, error, timedOut, result}. */
export async function run(code, { inputs = [], timeout = 6000, prelude = '' } = {}) {
  const r = await call('run', { code, inputs, prelude }, timeout);
  return { stdout: r.stdout || '', error: r.error || null, timedOut: !!r.timedOut, result: r.result };
}

/** Parse code and list the constructs it uses (for "use a for loop" style checks). */
export async function analyze(code) { return call('analyze', { code }, 4000); }

// Input prompts and echoed input values are wrapped in \x01 … \x02 by the worker.
export const stripInputs = s => String(s).replace(/\x01[^\x02]*\x02/g, '');
export const display = s => String(s).replace(/[\x01\x02]/g, '');
export const norm = s => String(s).replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
