import { esc, ic } from '../core/util.js';

// Training data: short school / India sentences. Words repeat across sentences
// on purpose, so the bigram model has real choices to make.
const CORPUS = [
  'i go to school by bus', 'i go to school by bicycle', 'i go to the market with my mother',
  'my school is near the park', 'my school has a big library', 'my school has a green playground',
  'the library has many books', 'the library is quiet in the morning', 'we read books in the library',
  'we play cricket in the playground', 'we play cricket after school', 'we play kabaddi in the evening',
  'my friend likes to play cricket', 'my friend likes to read stories', 'my friend lives near the station',
  'my mother makes hot chai in the morning', 'my father reads the newspaper in the morning', 'my sister likes to draw pictures',
  'my brother likes to eat mangoes', 'i like to eat mangoes in summer', 'i like to eat hot samosas',
  'i like to read stories at night', 'i like the rain in july', 'the rain makes the city green',
  'the city is busy in the evening', 'the market is busy on sunday', 'the market sells fresh vegetables',
  'the bus is late today', 'the bus is full of students', 'the train is late today',
  'the train goes to delhi', 'we go to delhi in winter', 'we go to the temple on sunday',
  'our teacher is very kind', 'our teacher gives us homework', 'our teacher tells us stories',
  'our class has forty students', 'our class plants trees in july', 'the students plant trees near the school',
  'the students sing the national anthem every morning', 'we sing songs in the music class', 'we learn maths in the morning',
  'we learn about ai in class nine', 'ai can help doctors', 'ai can translate many languages',
  'ai learns patterns from data', 'a computer learns from data', 'a computer can play chess',
  'the sun is very hot in may', 'the sky is blue today', 'the sky is dark at night',
  'grandma tells us stories at night', 'grandma makes sweet ladoos for diwali', 'we light diyas on diwali',
  'we fly kites in january', 'my brother flies a red kite', 'the kite is high in the sky',
  'i drink a glass of milk every morning', 'i finish my homework after school', 'we eat lunch at one o clock'
];
const S = '<s>', E = '</s>';

function train(corpus) {
  const counts = {};
  corpus.forEach(line => {
    const w = [S, ...line.split(' '), E];
    for (let i = 0; i < w.length - 1; i++) {
      const row = counts[w[i]] || (counts[w[i]] = {});
      row[w[i + 1]] = (row[w[i + 1]] || 0) + 1;
    }
  });
  return counts;
}

// P(next | prev) = count(prev, next) / total count of bigrams starting with prev.
function probs(model, prev) {
  const row = model[prev];
  if (!row) return [];
  const total = Object.values(row).reduce((a, b) => a + b, 0);
  return Object.entries(row).map(([w, c]) => ({ w, c, p: c / total })).sort((a, b) => b.p - a.p || (a.w < b.w ? -1 : 1));
}

// Temperature: p_i^(1/T), renormalised so the new values add up to 1.
function withTemp(list, T) {
  const raw = list.map(x => Math.pow(x.p, 1 / T));
  const z = raw.reduce((a, b) => a + b, 0);
  return list.map((x, i) => ({ ...x, q: raw[i] / z }));
}

const tokenize = s => s.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
const label = w => (w === E ? '⏹ end' : w);

const CSS = `
.lab-next-word .nw-sent{display:flex; flex-wrap:wrap; gap:6px; align-items:center; min-height:52px; background:#fff; border:var(--b2); border-radius:12px; padding:10px 12px; font-family:var(--head); font-weight:700; font-size:1.2rem;}
.lab-next-word .nw-w{background:var(--paper-2); border:2px solid var(--line); border-radius:8px; padding:0 8px;}
.lab-next-word .nw-w.gen{background:var(--violet-wash); border-color:var(--violet);}
.lab-next-word .nw-w.fresh{animation:fadeIn .25s var(--ease);}
.lab-next-word .nw-cursor{width:3px; height:1.3em; background:var(--ink); animation:nwBlink 1s steps(1) infinite;}
@keyframes nwBlink{50%{opacity:0;}}
.lab-next-word .nw-opt{display:grid; grid-template-columns:minmax(70px,auto) 1fr auto; gap:10px; align-items:center; width:100%; text-align:left; background:#fff; border:var(--b2); border-radius:10px; padding:6px 10px; min-height:44px; font-weight:800;}
.lab-next-word .nw-opt:hover:not(:disabled){background:var(--gold-wash);}
.lab-next-word .nw-bars{display:grid; gap:3px;}
.lab-next-word .nw-bar{height:10px; border-radius:999px; background:#EFE7D2; overflow:hidden; border:1.5px solid var(--ink);}
.lab-next-word .nw-bar i{display:block; height:100%; background:var(--gold); transition:width .3s;}
.lab-next-word .nw-bar.t i{background:var(--violet);}
.lab-next-word .nw-pct{font-variant-numeric:tabular-nums; font-size:.85rem; text-align:right; line-height:1.2;}
.lab-next-word .nw-legend{display:flex; gap:14px; flex-wrap:wrap; font-size:.8rem; font-weight:700; color:var(--muted);}
.lab-next-word .nw-legend i{display:inline-block; width:14px; height:10px; border:1.5px solid var(--ink); border-radius:4px; margin-right:5px; vertical-align:middle;}
.lab-next-word .nw-slider{width:100%; accent-color:var(--violet); height:32px;}
.lab-next-word .nw-out{display:grid; gap:8px; list-style:none;}
.lab-next-word .nw-out li{background:#fff; border:2px solid var(--line); border-radius:10px; padding:8px 10px;}
.lab-next-word .nw-goal{list-style:none; display:grid; gap:4px; font-weight:700; font-size:.92rem;}
.lab-next-word .nw-goal .ic{width:18px; height:18px;}
.lab-next-word .nw-goal .on{color:var(--good);}
`;

export default {
  title: 'Next-word predictor: a tiny language model',
  mount(ctx) {
    const model = train(CORPUS);
    const seen = new Set(CORPUS);
    const vocab = new Set(Object.keys(model).concat(...Object.values(model).map(r => Object.keys(r))));
    let words = [], genIdx = -1, T = 1.0, busy = false, timer = null, completed = false, note = '';
    const outs = [];                       // {text, T, isNew, pairs}
    ctx.data.low = ctx.data.low || 0; ctx.data.high = ctx.data.high || 0;

    const prev = () => (words.length ? words[words.length - 1] : S);
    const ended = () => words[words.length - 1] === E;
    const lowDone = () => outs.some(o => o.T <= 0.5), highDone = () => outs.some(o => o.T >= 1.2);
    const goalMet = () => outs.length >= 3 && lowDone() && highDone();

    ctx.el.innerHTML = `<style>${CSS}</style>
      <div class="lab-next-word stack">
        <p class="lab-intro">This model read <b>${CORPUS.length} short sentences</b> and counted which word follows which (a <b>bigram</b> model). Start a sentence, see what it predicts next, then let it <b>generate</b>.</p>
        ${ctx.done ? '<p class="chip ok">Already completed — replay any time</p>' : ''}
        <div class="lab-grid">
          <div class="lab-box stack">
            <h4>Your sentence</h4>
            <div class="nw-sent" id="nwSent" aria-live="polite"></div>
            <form class="row" id="nwForm" autocomplete="off">
              <label class="sr" for="nwIn">Type words to start a sentence</label>
              <input class="input" id="nwIn" placeholder="Type a start, e.g. my friend" style="flex:1;min-width:160px">
              <button class="btn sm" type="submit">Use</button>
            </form>
            <div class="row"><button class="btn sm" id="nwBack">${ic('back')} Undo word</button><button class="btn sm" id="nwClear">${ic('refresh')} Clear</button></div>
            <p class="small" id="nwNote" aria-live="polite"></p>
            <div>
              <label for="nwT" class="row between" style="font-weight:800"><span>Temperature</span><span class="chip" id="nwTv"></span></label>
              <input type="range" class="nw-slider" id="nwT" min="0.2" max="1.5" step="0.1" value="1">
              <div class="row between tiny muted" style="font-weight:700"><span>0.2 safe, repetitive</span><span>1.5 creative, odd</span></div>
            </div>
            <button class="btn primary block" id="nwGen">${ic('wand')} Generate the rest</button>
          </div>
          <div class="lab-box stack">
            <h4 id="nwPredH">Top 5 next words</h4>
            <div class="nw-legend"><span><i style="background:var(--gold)"></i>learned probability</span><span><i style="background:var(--violet)"></i>chance of being picked at this temperature</span></div>
            <div class="stack" id="nwPred" style="gap:8px"></div>
          </div>
        </div>
        <div class="lab-box stack">
          <div class="row between"><h4>Generated sentences</h4></div>
          <ul class="nw-goal" id="nwGoal"></ul>
          <ul class="nw-out" id="nwOut"></ul>
        </div>
        <div id="nwEnd"></div>
      </div>`;
    const $ = s => ctx.el.querySelector(s);

    function renderSentence() {
      $('#nwSent').innerHTML = (words.length ? words.filter(w => w !== E).map((w, i, arr) => `<span class="nw-w ${genIdx >= 0 && i >= genIdx ? 'gen' : ''}${busy && i === arr.length - 1 ? ' fresh' : ''}">${esc(w)}</span>`).join('') + (ended() ? '<b>.</b>' : '')
        : '<span class="muted small">(empty: the model will choose a first word)</span>') + (ended() ? '' : '<span class="nw-cursor" aria-hidden="true"></span>');
    }

    function renderPred() {
      const list = withTemp(probs(model, prev()), T);
      $('#nwPredH').textContent = ended() ? 'Sentence finished' : `Top 5 words after “${prev() === S ? 'start of sentence' : prev()}”`;
      if (ended()) { $('#nwPred').innerHTML = '<p class="small muted">The model chose “end of sentence”. Undo a word or clear to try again.</p>'; return; }
      if (!list.length) { $('#nwPred').innerHTML = `<p class="small">The model never saw “<b>${esc(prev())}</b>” in its training sentences, so it has <b>no idea</b> what comes next. A language model can only use patterns from its training data.</p>`; return; }
      const top = list.slice(0, 5);
      $('#nwPred').innerHTML = top.map(x => `
        <button class="nw-opt" data-w="${esc(x.w)}" ${busy ? 'disabled' : ''} aria-label="${esc(label(x.w))}: learned ${Math.round(x.p * 100)} percent, picked ${Math.round(x.q * 100)} percent at this temperature">
          <span>${esc(label(x.w))}</span>
          <span class="nw-bars"><span class="nw-bar"><i style="width:${(x.p * 100).toFixed(1)}%"></i></span><span class="nw-bar t"><i style="width:${(x.q * 100).toFixed(1)}%"></i></span></span>
          <span class="nw-pct">${Math.round(x.p * 100)}%<br><span style="color:var(--violet)">${Math.round(x.q * 100)}%</span></span>
        </button>`).join('') +
        `<p class="tiny muted">“${esc(prev() === S ? 'start' : prev())}” was followed by ${list.length} different word${list.length > 1 ? 's' : ''} in training${list.length > 5 ? ` (showing the top 5)` : ''}. Tap a word to add it.</p>`;
      ctx.el.querySelectorAll('[data-w]').forEach(b => b.onclick = () => { if (busy) return; words.push(b.dataset.w); genIdx = -1; note = ''; ctx.sfx('tick'); update(); });
    }

    function renderOuts() {
      const g = (ok, t) => `<li class="${ok ? 'on' : ''}">${ic(ok ? 'check' : 'mark')} ${t}</li>`;
      $('#nwGoal').innerHTML = `<li><b>Goal:</b> generate 3 sentences, at least one at low and one at high temperature.</li>` +
        g(outs.length >= 3, `Generate 3 sentences (${Math.min(outs.length, 3)}/3)`) + g(lowDone(), 'One at low temperature (0.5 or less)') + g(highDone(), 'One at high temperature (1.2 or more)');
      $('#nwOut').innerHTML = outs.length ? outs.slice().reverse().map(o => `<li>
          <div class="row between"><b>“${esc(o.text)}.”</b><span class="chip ${o.T <= 0.5 ? 'dim' : o.T >= 1.2 ? 'gold' : ''}">T = ${o.T.toFixed(1)}</span></div>
          <div class="small mt" style="margin-top:4px">${o.isNew ? `<span class="chip ok">New sentence</span> not in the training data, but every word pair in it was learned from it.` : `<span class="chip">Copied</span> this exact sentence is in the training data. Low temperature often repeats what it learned.`}</div>
          <details class="tiny muted" style="margin-top:4px"><summary>Show the learned word pairs</summary>${o.pairs.map(p => `${esc(p[0])} → ${esc(p[1])} (seen ${p[2]}×)`).join(' · ')}</details></li>`).join('')
        : '<li class="small muted">Nothing yet. Press <b>Generate</b>.</li>';
    }

    function update() {
      renderSentence(); renderPred();
      $('#nwNote').innerHTML = note;
      $('#nwBack').disabled = busy || !words.length; $('#nwClear').disabled = busy;
      $('#nwGen').disabled = busy; $('#nwIn').disabled = busy;
      $('#nwGen').innerHTML = `${ic('wand')} ${busy ? 'Generating…' : 'Generate the rest'}`;
    }

    function sample(list) {
      const r = ctx.rng(); let acc = 0;
      for (const x of list) { acc += x.q; if (r < acc) return x.w; }
      return list[list.length - 1].w;
    }

    function generate() {
      if (busy) return;
      if (ended()) words.pop();
      if (!probs(model, prev()).length) { note = `The model can’t continue after “${esc(prev())}”: it never saw that word. Undo it or pick a suggested word.`; update(); ctx.sfx('bad'); return; }
      busy = true; genIdx = words.length; note = '';
      const usedT = T;
      const step = () => {
        const w = sample(withTemp(probs(model, prev()), usedT));
        words.push(w);
        update();
        if (w === E || words.length >= 18) {
          if (w !== E) words.push(E);
          busy = false; finishGen(usedT); return;
        }
        timer = setTimeout(step, 220);
      };
      update();
      timer = setTimeout(step, 150);
    }

    function finishGen(usedT) {
      const body = words.filter(w => w !== E);
      const text = body.join(' ');
      const seq = [S, ...body, E], pairs = [];
      for (let i = 0; i < seq.length - 1; i++) pairs.push([seq[i] === S ? 'start' : seq[i], label(seq[i + 1]), (model[seq[i]] || {})[seq[i + 1]] || 0]);
      outs.push({ text, T: usedT, isNew: !seen.has(text), pairs });
      if (usedT <= 0.5) ctx.data.low++;
      if (usedT >= 1.2) ctx.data.high++;
      ctx.save();
      ctx.sfx('pop');
      renderOuts(); update();
      if (goalMet()) finish();
    }

    function finish() {
      if (completed) return;
      completed = true;
      const nNew = outs.filter(o => o.isNew).length;
      $('#nwEnd').innerHTML = `<div class="lab-done">${ic('check')}<div>You generated ${outs.length} sentences (${nNew} brand new). A <b>language model</b> predicts the next word from probabilities learned from its training text; generative AI like ChatGPT does the same, one token at a time, with far more data. <b>Temperature</b> controls how risky its choices are.</div></div>`;
      ctx.sfx('win');
      if (!ctx.done) ctx.complete(`Generated ${outs.length} sentences with a bigram language model at low and high temperature.`);
    }

    $('#nwT').oninput = e => { T = +e.target.value; $('#nwTv').textContent = `T = ${T.toFixed(1)} · ${T <= 0.5 ? 'safe' : T >= 1.2 ? 'creative' : 'balanced'}`; renderPred(); };
    $('#nwT').oninput({ target: $('#nwT') });
    $('#nwForm').onsubmit = e => {
      e.preventDefault();
      if (busy) return;
      const toks = tokenize($('#nwIn').value);
      if (!toks.length) return;
      if (ended()) words.pop();
      words.push(...toks); genIdx = -1;
      const unknown = toks.filter(t => !vocab.has(t));
      note = unknown.length ? `Unknown to the model: <b>${unknown.map(esc).join(', ')}</b>. It only knows the ${vocab.size - 2} words from its training sentences.` : '';
      $('#nwIn').value = '';
      update();
    };
    $('#nwBack').onclick = () => { if (busy) return; words.pop(); genIdx = -1; note = ''; update(); };
    $('#nwClear').onclick = () => { if (busy) return; words = []; genIdx = -1; note = ''; update(); };
    $('#nwGen').onclick = generate;

    update(); renderOuts();
    return () => clearTimeout(timer);
  }
};
