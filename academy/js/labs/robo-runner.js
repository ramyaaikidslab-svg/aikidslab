import { esc, ic } from '../core/util.js';

const CELL = 50, MAX_ACTIONS = 300, MAX_SENSE = 3000, TIMEOUT = 5000;
const DIRS = { '>': 0, '^': 1, '<': 2, 'v': 3 };
const DXY = [[1, 0], [0, -1], [-1, 0], [0, 1]];

// Map legend: '#' wall, '.' floor, 'G' goal, '*' gem, '> ^ < v' robot start + direction.
function levels(rng) {
  const d4 = rng.int(5, 8);
  const gems = rng.sample([1, 2, 3, 4, 5, 6, 7], 3);
  const row5 = Array.from({ length: 9 }, (_, x) => (x === 0 ? '>' : x === 8 ? 'G' : gems.includes(x) ? '*' : '.')).join('');
  return [
    { name: 'First steps', concept: 'Sequence', need: [],
      map: ['######', '>....G', '######'],
      task: 'Walk the robot to the flag. Each <code>move()</code> goes one square forward.',
      starter: '# Move the robot to the flag.\n# Each move() goes one square forward.\nmove()\n',
      hint: 'Count the squares between the robot and the flag. You need one move() for each square, each on its own line.',
      solution: 'move()\nmove()\nmove()\nmove()\nmove()\n' },
    { name: 'Loop it', concept: 'for loop', need: ['for'],
      map: ['##########', '>........G', '##########'],
      task: 'The flag is 9 squares away. Use a <code>for</code> loop instead of typing <code>move()</code> 9 times.',
      starter: '# Use a for loop to repeat move().\nfor i in range(3):\n    move()\n',
      hint: 'for i in range(9): repeats the indented lines below it 9 times. Indent move() by 4 spaces.',
      solution: 'for i in range(9):\n    move()\n' },
    { name: 'Staircase', concept: 'Turns', need: [],
      map: ['#####', '###.G', '##..#', '#..##', '>.###'],
      task: 'Climb the stairs. You will need <code>turn_left()</code> and <code>turn_right()</code>. Turning does not move the robot.',
      starter: '# Climb the stairs: move, turn, move, turn...\nmove()\nturn_left()\n',
      hint: 'The stairs repeat a pattern: move(), turn_left(), move(), turn_right(). Repeat it 3 times (a for loop works well), then one last move().',
      solution: 'for i in range(3):\n    move()\n    turn_left()\n    move()\n    turn_right()\nmove()\n' },
    { name: 'Until the flag', concept: 'while loop', need: ['while'],
      map: ['#########', '>' + '.'.repeat(d4 - 1) + 'G' + '.'.repeat(8 - d4), '#########'],
      task: 'Keep moving <b>until</b> the robot reaches the flag, then stop. Use a <code>while</code> loop with <code>at_goal()</code>.',
      starter: '# Keep moving until at_goal() is True.\n# Hint: while not at_goal():\nmove()\n',
      hint: 'while not at_goal(): keeps repeating its indented lines as long as the robot is NOT on the flag. Put move() inside it.',
      solution: 'while not at_goal():\n    move()\n' },
    { name: 'Gem collector', concept: 'if', need: ['while', 'if'],
      map: ['#########', row5, '#########'],
      task: 'Collect <b>every gem</b> on the way to the flag. <code>on_gem()</code> is True when the robot stands on a gem; <code>pick()</code> picks it up.',
      starter: '# Pick up every gem on the way to the flag.\nwhile not at_goal():\n    move()\n',
      hint: 'Inside your while loop, first check if on_gem(): and pick() (indented under the if). Then move().',
      solution: 'while not at_goal():\n    if on_gem():\n        pick()\n    move()\n' },
    { name: 'Maze runner', concept: 'while + if', need: ['while', 'if'],
      map: ['.....##', '.###.##', '...#.##', '##.#.##', '...#...', '.#####.', '^#####G'],
      task: 'Find the way through the maze. <code>front_is_clear()</code> is True when there is no wall ahead. One program, no counting!',
      starter: '# Find the way through the maze.\n# front_is_clear() is True when there is no wall ahead.\nwhile not at_goal():\n    move()\n',
      hint: 'Inside while not at_goal(): if front_is_clear(): move(). Otherwise (else:) turn_left(), and if it is still blocked, turn_right() twice to face the other way.',
      solution: 'while not at_goal():\n    if front_is_clear():\n        move()\n    else:\n        turn_left()\n        if not front_is_clear():\n            turn_right()\n            turn_right()\n' }
  ].map(parse);
}

function parse(lv) {
  const walls = [], gems = []; let start, goal;
  lv.map.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch === '#') walls.push([x, y]);
    if (ch === '*') gems.push([x, y]);
    if (ch === 'G') goal = [x, y];
    if (ch in DIRS) start = [x, y, DIRS[ch]];
  }));
  return { ...lv, w: lv.map[0].length, h: lv.map.length, walls, gems, start, goal };
}

const pyPairs = list => `[${list.map(([x, y]) => `(${x}, ${y})`).join(', ')}]`;

function prelude(lv) {
  return `
class RobotCrashed(Exception):
    pass

class TooManySteps(Exception):
    pass

class NoGemHere(Exception):
    pass

_W, _H = ${lv.w}, ${lv.h}
_walls = set(${pyPairs(lv.walls)})
_gems = set(${pyPairs(lv.gems)})
_goal = (${lv.goal[0]}, ${lv.goal[1]})
_s = {"x": ${lv.start[0]}, "y": ${lv.start[1]}, "d": ${lv.start[2]}, "sense": 0}
_D = [(1, 0), (0, -1), (-1, 0), (0, 1)]
__result__ = {"actions": [], "crashed": False, "steps": 0}

def _act(a):
    __result__["actions"].append(a)
    __result__["steps"] = len(__result__["actions"])
    if __result__["steps"] >= ${MAX_ACTIONS}:
        raise TooManySteps("The robot did ${MAX_ACTIONS} actions and was stopped. Is a loop running forever?")

def _ahead():
    dx, dy = _D[_s["d"]]
    return _s["x"] + dx, _s["y"] + dy

def _free(x, y):
    return 0 <= x < _W and 0 <= y < _H and (x, y) not in _walls

def _sense():
    _s["sense"] += 1
    if _s["sense"] > ${MAX_SENSE}:
        raise TooManySteps("Your program checked the sensors ${MAX_SENSE} times without finishing. Does your loop ever move the robot?")

def move():
    nx, ny = _ahead()
    if not _free(nx, ny):
        __result__["actions"].append("x")
        __result__["crashed"] = True
        raise RobotCrashed("Bonk! The robot bumped into a wall and stopped.")
    _s["x"], _s["y"] = nx, ny
    _act("m")

def turn_left():
    _s["d"] = (_s["d"] + 1) % 4
    _act("l")

def turn_right():
    _s["d"] = (_s["d"] + 3) % 4
    _act("r")

def pick():
    p = (_s["x"], _s["y"])
    if p not in _gems:
        __result__["actions"].append("n")
        raise NoGemHere("There is no gem here to pick up.")
    _gems.discard(p)
    _act("p")

def front_is_clear():
    _sense()
    return _free(*_ahead())

def on_gem():
    _sense()
    return (_s["x"], _s["y"]) in _gems

def at_goal():
    _sense()
    return (_s["x"], _s["y"]) == _goal
`;
}

const ERR = {
  RobotCrashed: { title: 'Bonk! The robot hit a wall', tip: 'Count the squares again, or use front_is_clear() to check before you move().' },
  TooManySteps: { title: 'Too many steps: is your loop endless?', tip: 'A while loop only stops when its condition becomes False. Make sure the loop moves the robot towards the flag.' },
  NoGemHere: { title: 'No gem here', tip: 'Check with if on_gem(): before you call pick().' },
  NameError: { title: 'Unknown name', tip: 'Check the spelling. The robot knows: move(), turn_left(), turn_right(), pick(), front_is_clear(), on_gem(), at_goal(). Don’t forget the brackets ().' }
};

const SNIPS = ['move()', 'turn_left()', 'turn_right()', 'pick()', 'for i in range(3):', 'while not at_goal():', 'if on_gem():', 'if front_is_clear():', 'else:'];

const CSS = `
.lab-robo-runner .rr-levels{display:flex; flex-wrap:wrap; gap:6px;}
.lab-robo-runner .rr-lv{min-width:44px; min-height:44px; border:var(--b2); border-radius:10px; background:#fff; font-weight:800; display:inline-flex; align-items:center; justify-content:center; gap:4px; padding:0 10px;}
.lab-robo-runner .rr-lv[aria-current="true"]{background:var(--ink); color:#fff;}
.lab-robo-runner .rr-lv.solved:not([aria-current="true"]){background:var(--good-wash); border-color:var(--good);}
.lab-robo-runner .rr-lv:disabled{opacity:.45; cursor:not-allowed;}
.lab-robo-runner .rr-lv .ic{width:16px; height:16px;}
.lab-robo-runner .rr-world{width:100%; height:auto; max-height:380px; display:block; background:#fff; border:var(--b2); border-radius:12px;}
.lab-robo-runner .rr-bot{transition:transform .2s var(--ease); transform-box:view-box;}
.lab-robo-runner .rr-gem{transition:opacity .25s, transform .25s; transform-box:fill-box; transform-origin:center;}
.lab-robo-runner .rr-gem.got{opacity:0; transform:scale(1.8);}
.lab-robo-runner .rr-ed{display:grid; grid-template-columns:auto minmax(0,1fr); border:var(--b2); border-radius:12px; overflow:hidden; background:#1B1E25;}
.lab-robo-runner .rr-gut{font-family:var(--mono); font-size:15px; line-height:22px; padding:10px 8px 10px 10px; color:#7D8290; text-align:right; white-space:pre; user-select:none; overflow:hidden; background:#15171C; min-width:34px;}
.lab-robo-runner .rr-ta{font-family:var(--mono); font-size:15px; line-height:22px; padding:10px 12px; border:0; border-radius:0; min-height:220px; background:#1B1E25; color:#F1EDE2; white-space:pre; overflow:auto; tab-size:4; resize:vertical; caret-color:var(--gold);}
.lab-robo-runner .rr-ta:focus{box-shadow:inset 0 0 0 3px var(--blue);}
.lab-robo-runner .rr-snips{display:flex; flex-wrap:wrap; gap:6px;}
.lab-robo-runner .rr-snips button{font-family:var(--mono); font-size:.8rem; font-weight:700; background:#fff; border:2px solid var(--ink); border-radius:8px; padding:4px 8px; min-height:36px;}
.lab-robo-runner .fb code, .lab-robo-runner .lab-box code, .lab-robo-runner .rr-task code{font-family:var(--mono); font-size:.88em; background:var(--paper-2); border:1px solid var(--line); padding:0 5px; border-radius:5px;}
.lab-robo-runner .rr-api{display:grid; grid-template-columns:auto 1fr; gap:4px 12px; font-size:.88rem;}
.lab-robo-runner .rr-api code{white-space:nowrap;}
@keyframes rrShake{0%,100%{translate:0 0;}25%{translate:-4px 0;}75%{translate:4px 0;}}
.lab-robo-runner .rr-shake{animation:rrShake .25s 2;}
`;

export default {
  title: 'Robo Runner: program a robot in Python',
  mount(ctx) {
    const LV = levels(ctx.rng);
    const D = ctx.data;
    D.solved = Array.isArray(D.solved) ? D.solved : [];
    D.fails = Array.isArray(D.fails) ? D.fails : [];
    D.code = D.code && typeof D.code === 'object' ? D.code : {};
    const unlocked = i => ctx.done || i === 0 || !!D.solved[i - 1];
    let cur = Math.min(Number.isInteger(D.level) ? D.level : 0, LV.length - 1);
    while (cur > 0 && !unlocked(cur)) cur--;
    let alive = true, runId = 0, running = false, timers = [], completed = false, showSol = false, escTab = false;
    let bot = null;   // {x, y, d, angle}

    const sleep = ms => new Promise(res => { const t = setTimeout(res, ms); timers.push(t); });
    const py = ctx.python;

    ctx.el.innerHTML = `<style>${CSS}</style>
      <div class="lab-robo-runner stack">
        <p class="lab-intro">Write <b>Python</b> to guide the robot to the flag 🏁. Every level adds a new idea: sequences, <code>for</code> loops, turns, <code>while</code> loops and <code>if</code> decisions.</p>
        <div class="row between"><b>Goal: solve level 6, the maze</b><span class="py-status" id="rrPy" aria-live="polite"></span></div>
        ${ctx.done ? '<p class="chip ok">Already completed — all levels unlocked</p>' : ''}
        <div class="rr-levels" id="rrLevels" role="group" aria-label="Levels"></div>
        <div class="lab-grid">
          <div class="lab-box stack" style="gap:10px">
            <div class="row between"><h4 id="rrTitle" style="margin:0"></h4><span class="chip" id="rrConcept"></span></div>
            <p class="small rr-task" id="rrTask"></p>
            <div id="rrWorld"></div>
            <div class="row between small" style="font-weight:700"><span id="rrSteps">Steps: 0</span><span id="rrGems"></span></div>
          </div>
          <div class="stack" style="gap:10px">
            <label for="rrTa" class="small" style="font-weight:800">Your Python code <span class="muted" style="font-weight:600">(Tab = 4 spaces · Ctrl+Enter = run · Esc then Tab = leave editor)</span></label>
            <div class="rr-ed"><div class="rr-gut" id="rrGut" aria-hidden="true">1</div>
              <textarea class="input rr-ta" id="rrTa" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" rows="10"></textarea></div>
            <div class="rr-snips" aria-label="Insert code">${SNIPS.map(s => `<button type="button" data-snip="${esc(s)}">${esc(s)}</button>`).join('')}</div>
            <div class="row"><button class="btn primary" id="rrRun">${ic('play')} Run</button><button class="btn" id="rrReset">${ic('refresh')} Reset</button>
              <button class="btn sm" id="rrHint">${ic('bulb')} Hint</button><button class="btn sm" id="rrSol" hidden>${ic('eye')} Show solution</button></div>
          </div>
        </div>
        <div id="rrOut" aria-live="polite"></div>
        <pre class="console" id="rrConsole" hidden></pre>
        <details class="lab-box"><summary style="font-weight:800;cursor:pointer">Robot commands</summary>
          <div class="rr-api mt"><code>move()</code><span>one square forward</span><code>turn_left()</code><span>turn 90° left (stays on the same square)</span>
            <code>turn_right()</code><span>turn 90° right</span><code>pick()</code><span>pick up the gem on this square</span>
            <code>front_is_clear()</code><span>True if no wall is ahead</span><code>on_gem()</code><span>True if standing on a gem</span><code>at_goal()</code><span>True if standing on the flag</span></div></details>
        <div id="rrEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);
    const ta = $('#rrTa');

    /* ---------- Python status ---------- */
    function pyStatus(s) {
      const el = $('#rrPy'); if (!el) return;
      if (!py) { el.innerHTML = `${ic('alert')} Python is not available here`; return; }
      el.innerHTML = s === 'ready' ? `${ic('check')} Python ready` : s === 'error' ? `${ic('alert')} Python could not start. Reload the page to try again.`
        : '<span class="spin"></span> Starting Python… (first time takes a few seconds)';
    }
    const onPy = s => { if (alive) pyStatus(s); };
    if (py) {
      if (py.pyState && py.pyState.listeners) py.pyState.listeners.add(onPy);
      pyStatus(py.pyState ? py.pyState.status : 'loading');
      Promise.resolve(py.warm && py.warm()).then(() => { if (alive) pyStatus(py.pyState ? py.pyState.status : 'ready'); });
    } else pyStatus();

    /* ---------- world drawing ---------- */
    const botTransform = b => `translate(${b.x * CELL}px, ${b.y * CELL}px) rotate(${b.angle}deg)`;
    function drawWorld() {
      const lv = LV[cur];
      bot = { x: lv.start[0], y: lv.start[1], d: lv.start[2], angle: -90 * lv.start[2] };
      const wall = new Set(lv.walls.map(p => p.join(',')));
      let g = '';
      for (let y = 0; y < lv.h; y++) for (let x = 0; x < lv.w; x++) {
        const X = x * CELL, Y = y * CELL;
        g += wall.has(x + ',' + y) ? `<rect x="${X + 2}" y="${Y + 2}" width="${CELL - 4}" height="${CELL - 4}" rx="8" fill="#3A3F4B"/><path d="M${X + 10} ${Y + 18}h30M${X + 10} ${Y + 32}h30" stroke="#525866" stroke-width="3" stroke-linecap="round"/>`
          : `<rect x="${X}" y="${Y}" width="${CELL}" height="${CELL}" fill="${(x + y) % 2 ? '#FFF6E0' : '#FFFBF0'}" stroke="#EADFC6"/>`;
      }
      const [gx, gy] = lv.goal;
      g += `<rect x="${gx * CELL + 3}" y="${gy * CELL + 3}" width="${CELL - 6}" height="${CELL - 6}" rx="8" fill="#D9F5E8" stroke="#109A66" stroke-width="2"/>
        <path d="M${gx * CELL + 18} ${gy * CELL + 40}V${gy * CELL + 10}" stroke="#15171C" stroke-width="3" stroke-linecap="round"/><path d="M${gx * CELL + 19} ${gy * CELL + 11}l17 6-17 7z" fill="#E8453C" stroke="#15171C" stroke-width="2" stroke-linejoin="round"/>`;
      g += '<g id="rrTrail"></g>';
      g += lv.gems.map(([x, y]) => `<path class="rr-gem" data-gem="${x},${y}" d="M${x * CELL + 25} ${y * CELL + 11}l12 14-12 14-12-14z" fill="#7B4DFF" stroke="#15171C" stroke-width="2" stroke-linejoin="round"/>`).join('');
      // Robot drawn facing east (+x) around the origin of its cell, rotated about the cell centre.
      g += `<g class="rr-bot" id="rrBot" style="transform:${botTransform(bot)}; transform-origin:${CELL / 2}px ${CELL / 2}px">
        <g id="rrBotBody"><rect x="9" y="10" width="32" height="30" rx="9" fill="#FFC800" stroke="#15171C" stroke-width="2.5"/>
        <rect x="27" y="17" width="10" height="16" rx="4" fill="#15171C"/><circle cx="33" cy="22" r="2.2" fill="#fff"/>
        <path d="M41 25h5" stroke="#15171C" stroke-width="3" stroke-linecap="round"/>
        <rect x="12" y="6" width="12" height="5" rx="2" fill="#15171C"/><rect x="12" y="39" width="12" height="5" rx="2" fill="#15171C"/></g></g>`;
      $('#rrWorld').innerHTML = `<svg class="rr-world" viewBox="0 0 ${lv.w * CELL} ${lv.h * CELL}" role="img" aria-label="Level ${cur + 1} grid: ${lv.w} by ${lv.h} squares. Robot at column ${lv.start[0] + 1}, row ${lv.start[1] + 1}; flag at column ${gx + 1}, row ${gy + 1}${lv.gems.length ? `; ${lv.gems.length} gems` : ''}.">${g}</svg>`;
      $('#rrSteps').textContent = 'Steps: 0';
      $('#rrGems').textContent = lv.gems.length ? `Gems: 0 / ${lv.gems.length}` : '';
    }

    function renderButtons() {
      $('#rrLevels').innerHTML = LV.map((l, i) => `<button class="rr-lv ${D.solved[i] ? 'solved' : ''}" data-lv="${i}" aria-current="${i === cur}" ${unlocked(i) ? '' : 'disabled'} aria-label="Level ${i + 1}: ${esc(l.name)}${D.solved[i] ? ', solved' : unlocked(i) ? '' : ', locked'}">${unlocked(i) ? '' : ic('lock')}${i + 1}${D.solved[i] ? ic('check') : ''}</button>`).join('');
      ctx.el.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { if (running) return; switchLevel(+b.dataset.lv); });
    }
    function renderLevel() {
      const lv = LV[cur];
      renderButtons();
      $('#rrTitle').textContent = `Level ${cur + 1} · ${lv.name}`;
      $('#rrConcept').textContent = lv.concept;
      $('#rrTask').innerHTML = lv.task + (lv.need.length ? ` <span class="chip gold">Must use: ${lv.need.join(' + ')}</span>` : '');
      ta.value = typeof D.code[cur] === 'string' ? D.code[cur] : lv.starter;
      gutter();
      showSol = false; updateSolBtn();
      $('#rrOut').innerHTML = ''; $('#rrConsole').hidden = true;
      drawWorld();
    }
    function switchLevel(i) {
      if (!unlocked(i)) return;
      saveCode(); runId++; cur = i; D.level = i; ctx.save(); renderLevel();
    }
    function updateSolBtn() { $('#rrSol').hidden = (D.fails[cur] || 0) < 2 && !D.solved[cur]; }
    function saveCode() { D.code[cur] = ta.value.slice(0, 1500); }

    /* ---------- editor ---------- */
    function gutter() {
      const n = Math.max(1, ta.value.split('\n').length);
      $('#rrGut').textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n');
      $('#rrGut').scrollTop = ta.scrollTop;
    }
    function insert(text) {
      ta.focus();
      let ok = false;
      try { ok = document.execCommand('insertText', false, text); } catch (e) { ok = false; }
      if (!ok) ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
      gutter();
    }
    const lineStart = () => ta.value.lastIndexOf('\n', ta.selectionStart - 1) + 1;
    ta.addEventListener('input', gutter);
    ta.addEventListener('scroll', () => { $('#rrGut').scrollTop = ta.scrollTop; });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Escape') { escTab = true; return; }
      if (e.key === 'Tab') {
        if (escTab) { escTab = false; return; }
        e.preventDefault();
        if (e.shiftKey) {
          const ls = lineStart(), spaces = (ta.value.slice(ls).match(/^ {1,4}/) || [''])[0].length;
          if (spaces) { const pos = ta.selectionStart; ta.setRangeText('', ls, ls + spaces, 'start'); const np = Math.max(ls, pos - spaces); ta.setSelectionRange(np, np); gutter(); }
        } else insert('    ');
        return;
      }
      escTab = false;
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); return; }
      if (e.key === 'Enter' && !e.shiftKey) {
        const line = ta.value.slice(lineStart(), ta.selectionStart);
        let ind = (line.match(/^\s*/) || [''])[0];
        if (/:\s*$/.test(line)) ind += '    ';
        e.preventDefault(); insert('\n' + ind);
      }
    });
    ctx.el.querySelectorAll('[data-snip]').forEach(b => b.onclick = () => {
      const s = b.dataset.snip, before = ta.value.slice(lineStart(), ta.selectionStart);
      const ind = (before.match(/^\s*/) || [''])[0];
      let text = (before.trim() ? '\n' + ind : '') + s;
      if (s.endsWith(':')) text += '\n' + ind + '    ';
      insert(text);
    });

    /* ---------- running ---------- */
    function needsMissing(code) {
      const clean = code.split('\n').map(l => l.replace(/#.*$/, '')).join('\n');
      return LV[cur].need.filter(k => !new RegExp(`\\b${k}\\b`).test(clean));
    }

    async function run() {
      if (running || !py) return;
      const lv = LV[cur], code = ta.value, my = ++runId;
      saveCode(); ctx.save();
      running = true; setBusy(true);
      drawWorld();
      $('#rrOut').innerHTML = '<p class="py-status"><span class="spin"></span> Running your program…</p>';
      $('#rrConsole').hidden = true;
      let res;
      try { res = await py.run(code, { prelude: prelude(lv), timeout: TIMEOUT }); }
      catch (e) { res = { error: { type: 'PythonError', message: String(e && e.message || e), line: null, tip: '' }, stdout: '', timedOut: false }; }
      if (!alive || my !== runId) { running = false; if (alive) setBusy(false); return; }
      if (res.stdout) { $('#rrConsole').hidden = false; $('#rrConsole').textContent = res.stdout; }
      const actions = (res.result && Array.isArray(res.result.actions)) ? res.result.actions : [];
      $('#rrOut').innerHTML = actions.length ? '<p class="py-status">Robot running…</p>' : '';
      const end = await animate(actions, my);
      running = false; setBusy(false);
      if (!alive || my !== runId) return;
      judge(res, end, code, actions);
    }

    function setBusy(b) { $('#rrRun').disabled = b; $('#rrRun').innerHTML = b ? '<span class="spin"></span> Running' : `${ic('play')} Run`; }

    async function animate(actions, my) {
      const lv = LV[cur];
      const gems = new Set(lv.gems.map(p => p.join(',')));
      const el = $('#rrBot'), trail = $('#rrTrail');
      const delay = actions.length > 40 ? Math.max(20, Math.round(6000 / actions.length)) : 260;
      el.style.transitionDuration = Math.max(0, Math.min(200, delay - 15)) + 'ms';
      let steps = 0;
      for (const a of actions) {
        if (!alive || my !== runId) return null;
        if (a === 'm') {
          trail.insertAdjacentHTML('beforeend', `<circle cx="${bot.x * CELL + 25}" cy="${bot.y * CELL + 25}" r="4" fill="#FFC800" opacity=".7"/>`);
          bot.x += DXY[bot.d][0]; bot.y += DXY[bot.d][1]; steps++;
        } else if (a === 'l') { bot.d = (bot.d + 1) % 4; bot.angle -= 90; steps++; }
        else if (a === 'r') { bot.d = (bot.d + 3) % 4; bot.angle += 90; steps++; }
        else if (a === 'p') {
          const k = bot.x + ',' + bot.y; gems.delete(k); steps++;
          ctx.el.querySelector(`[data-gem="${k}"]`)?.classList.add('got'); ctx.sfx('pop');
        } else if (a === 'x' || a === 'n') {
          if (a === 'x') {
            const nx = bot.x + DXY[bot.d][0] * 0.3, ny = bot.y + DXY[bot.d][1] * 0.3;
            el.style.transform = botTransform({ ...bot, x: nx, y: ny }); await sleep(160);
          }
          el.style.transform = botTransform(bot);
          const body = $('#rrBotBody'); body.classList.remove('rr-shake'); void body.getBBox(); body.classList.add('rr-shake');
          ctx.sfx('bad'); await sleep(300); continue;
        }
        el.style.transform = botTransform(bot);
        $('#rrSteps').textContent = `Steps: ${steps}`;
        if (lv.gems.length) $('#rrGems').textContent = `Gems: ${lv.gems.length - gems.size} / ${lv.gems.length}`;
        await sleep(delay);
      }
      return { x: bot.x, y: bot.y, gemsLeft: gems.size, steps };
    }

    function errorBox(err, code) {
      const meta = ERR[err.type] || {};
      const lines = code.split('\n'), ln = err.line && lines[err.line - 1] !== undefined ? lines[err.line - 1] : null;
      const title = meta.title || (err.type === 'SyntaxError' || err.type === 'IndentationError' ? `Python can’t read ${err.line ? 'line ' + err.line : 'your code'}` : `${err.type}`);
      return `<div class="fb bad"><div class="h">${ic('alert')} ${esc(title)}</div>
        ${err.line ? `<div>Line ${err.line}${ln !== null ? `: <code>${esc(ln.trim() || '(empty line)')}</code>` : ''}</div>` : ''}
        <div class="small">${esc(String(err.message || '').replace(/\s*\(<your code>, line \d+\)/, ''))}</div>
        ${meta.tip || err.tip ? `<div class="small"><b>Tip:</b> ${esc(meta.tip || err.tip)}</div>` : ''}</div>`;
    }

    function fail(html) {
      D.fails[cur] = (D.fails[cur] || 0) + 1; ctx.save();
      const extra = D.fails[cur] >= 2 && !D.solved[cur] ? '<p class="small mt">Stuck? You can now peek at a <b>model solution</b> (button above), or tap <b>Hint</b>.</p>' : '';
      $('#rrOut').innerHTML = html + extra;
      updateSolBtn();
    }

    function judge(res, end, code, actions) {
      const lv = LV[cur];
      if (res.timedOut) {
        ctx.sfx('bad');
        return fail(`<div class="fb bad"><div class="h">${ic('clock')} Your program ran too long</div><div>It was stopped after ${TIMEOUT / 1000} seconds. This usually means a loop that never ends, for example <code>while True:</code> with nothing that stops it, or a loop that never calls a robot command.</div><div class="small muted">Python is restarting; this takes a few seconds.</div></div>`);
      }
      if (res.error) { if (!actions.length || !['x', 'n'].includes(actions[actions.length - 1])) ctx.sfx('bad'); return fail(errorBox(res.error, code)); }
      const atGoal = end && end.x === lv.goal[0] && end.y === lv.goal[1];
      if (!atGoal) { ctx.sfx('bad'); return fail(`<div class="fb bad"><div class="h">${ic('x')} Not at the flag yet</div><div>Your program finished, but the robot stopped ${end && end.steps ? 'before reaching' : 'without reaching'} the flag. Add more commands, or check your turns.</div></div>`); }
      if (end.gemsLeft) { ctx.sfx('bad'); return fail(`<div class="fb bad"><div class="h">${ic('x')} ${end.gemsLeft} gem${end.gemsLeft > 1 ? 's' : ''} left behind</div><div>You reached the flag, but this level needs every gem. Use <code>if on_gem():</code> then <code>pick()</code>.</div></div>`); }
      const miss = needsMissing(code);
      if (miss.length) { ctx.sfx('pop'); return fail(`<div class="fb bad"><div class="h">${ic('alert')} Reached the flag, but…</div><div>This level is about practising <b>${miss.join(' and ')}</b>. Rewrite your program using <code>${esc(miss[0])}</code>.</div></div>`); }
      success(end);
    }

    function success(end) {
      D.solved[cur] = true; ctx.save();
      ctx.sfx(cur === LV.length - 1 ? 'win' : 'ok');
      const next = cur + 1 < LV.length;
      $('#rrOut').innerHTML = `<div class="fb good"><div class="h">${ic('check')} Level ${cur + 1} solved in ${end.steps} steps!</div>
        <div>${['A program is a <b>sequence</b> of instructions, run in order from top to bottom.', 'A <b>for</b> loop repeats code a fixed number of times.', 'Turns change direction without moving. Patterns of moves and turns can be repeated with a loop.', 'A <b>while</b> loop repeats as long as its condition is True, so it works for any length of road.', 'An <b>if</b> statement lets the program make a decision based on a condition.', 'A <b>while</b> loop with <b>if/else</b> lets one short program react to any maze.'][cur]}</div>
        ${next ? `<div><button class="btn primary sm" id="rrNext">Level ${cur + 2} ${ic('arrow')}</button></div>` : ''}</div>`;
      renderButtons();
      const nb = $('#rrNext'); if (nb) nb.onclick = () => switchLevel(cur + 1);
      updateSolBtn();
      if (cur === LV.length - 1) finish();
    }
    function finish() {
      if (completed) return;
      completed = true;
      $('#rrEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>You programmed a robot in Python using <b>sequences</b>, <b>for</b> and <b>while loops</b>, and <b>if/else</b> decisions. These are the building blocks of every program, including the ones inside AI systems.</div></div>`;
      if (!ctx.done) ctx.complete('Solved all 6 Robo Runner levels in Python, ending with a while + if maze solver.');
    }

    $('#rrRun').onclick = run;
    $('#rrReset').onclick = () => { runId++; running = false; setBusy(false); drawWorld(); $('#rrOut').innerHTML = ''; $('#rrConsole').hidden = true; };
    $('#rrHint').onclick = () => { $('#rrOut').innerHTML = `<div class="key"><b>Hint</b>${esc(LV[cur].hint)}</div>`; ctx.sfx('tick'); };
    $('#rrSol').onclick = () => {
      showSol = !showSol;
      $('#rrOut').innerHTML = showSol ? `<div class="stack" style="gap:8px"><b>A model solution</b><pre class="code">${esc(LV[cur].solution)}</pre>
        <p class="small muted">Read it line by line and predict what the robot will do before you run it. There are other correct answers too.</p>
        <div><button class="btn sm" id="rrUse">Put it in the editor</button></div></div>` : '';
      const u = $('#rrUse'); if (u) u.onclick = () => { ta.value = LV[cur].solution; gutter(); saveCode(); ctx.save(); ta.focus(); };
    };

    renderLevel();
    return () => {
      alive = false; runId++;
      timers.forEach(clearTimeout);
      if (py && py.pyState && py.pyState.listeners) py.pyState.listeners.delete(onPy);
      saveCode(); ctx.save();
    };
  }
};
