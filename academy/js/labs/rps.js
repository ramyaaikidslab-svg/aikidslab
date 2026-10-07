import { esc } from '../core/util.js';

const MV = { r: '✊', p: '✋', s: '✌️' }, NM = { r: 'Rock', p: 'Paper', s: 'Scissors' };
const BEATS = { r: 's', p: 'r', s: 'p' }, COUNTER = { r: 'p', p: 's', s: 'r' }, K = ['r', 'p', 's'];
const ROUNDS = 20;

export default {
  title: 'Rock, Paper, Scissors vs a learning AI',
  mount(ctx) {
    const mem = { r: { r: 0, p: 0, s: 0 }, p: { r: 0, p: 0, s: 0 }, s: { r: 0, p: 0, s: 0 } };
    const tot = { r: 0, p: 0, s: 0 };
    let last = null, round = 0, sc = { you: 0, ai: 0, draw: 0 }, hits = [], lastMsg = '', lastPred = '';

    function predict() {
      if (!last) return null;
      let src = mem[last];
      if (!(src.r + src.p + src.s)) src = tot;
      const max = Math.max(src.r, src.p, src.s);
      if (!max) return null;
      return ctx.rng.pick(K.filter(k => src[k] === max));
    }

    function render() {
      const over = round >= ROUNDS;
      ctx.el.innerHTML = `
        <p class="lab-intro">The AI starts knowing <b>nothing</b> about you. Every move you make becomes data it learns from. Can you stay unpredictable for ${ROUNDS} rounds?</p>
        <div class="lab-grid">
          <div class="lab-box">
            <div class="row between"><b>Round ${Math.min(round + 1, ROUNDS)} / ${ROUNDS}</b><span class="chip dim">Draws: ${sc.draw}</span></div>
            <div class="row mt" style="justify-content:space-around;text-align:center">
              <div><div class="tiny muted">YOU</div><div class="bigemoji" style="font-size:3.2rem">${last ? MV[last] : '❔'}</div><div class="stat v">${sc.you}</div></div>
              <div class="chip gold">VS</div>
              <div><div class="tiny muted">AI</div><div class="bigemoji" style="font-size:3.2rem">${lastMsg ? lastMsg.ai : '❔'}</div><div class="stat v">${sc.ai}</div></div>
            </div>
            <p class="center mt" aria-live="polite"><b>${esc(lastMsg ? lastMsg.text : 'Pick your move')}</b><br><span class="small muted">${lastPred}</span></p>
            ${over ? '' : `<div class="row mt" style="justify-content:center">${K.map(k => `<button class="btn big" data-m="${k}" aria-label="${NM[k]}" style="font-size:1.8rem">${MV[k]}</button>`).join('')}</div>`}
          </div>
          <div class="lab-box">
            <h4>Inside the AI's memory</h4>
            <p class="small muted">What you played next, after each move. The AI predicts the biggest number, then plays what beats it.</p>
            <div class="tblwrap mt"><table class="tbl"><thead><tr><th>After you played…</th><th>✊</th><th>✋</th><th>✌️</th></tr></thead><tbody>
              ${K.map(a => { const row = mem[a], mx = Math.max(row.r, row.p, row.s); return `<tr><td>${MV[a]} ${NM[a]}</td>${K.map(b => `<td style="${mx && row[b] === mx ? 'background:var(--gold);font-weight:900' : ''}">${row[b]}</td>`).join('')}</tr>`; }).join('')}
            </tbody></table></div>
          </div>
        </div>
        <div id="rpsEnd"></div>`;
      ctx.el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => play(b.dataset.m));
      if (over) end();
    }

    function play(u) {
      const pred = predict();
      const ai = pred ? COUNTER[pred] : ctx.rng.pick(K);
      hits.push(pred === u);
      if (last) mem[last][u]++;
      tot[u]++; last = u; round++;
      let text;
      if (u === ai) { sc.draw++; text = 'Draw!'; ctx.sfx('tick'); }
      else if (BEATS[u] === ai) { sc.you++; text = 'You win this round!'; ctx.sfx('ok'); }
      else { sc.ai++; text = 'The AI wins this round.'; ctx.sfx('bad'); }
      lastMsg = { ai: MV[ai], text };
      lastPred = pred ? `AI predicted ${MV[pred]} ${NM[pred]}, so it played ${MV[ai]}${pred === u ? ' — and it was right.' : ' — wrong guess.'}` : 'No data about you yet, so the AI guessed randomly.';
      render();
    }

    function end() {
      const early = hits.slice(0, 5).filter(Boolean).length, late = hits.slice(-5).filter(Boolean).length;
      const box = ctx.el.querySelector('#rpsEnd');
      box.innerHTML = `
        <div class="lab-done mt"><svg class="ic" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
          <div>Final score — you ${sc.you}, AI ${sc.ai}. The AI guessed your move right <b>${early} times in rounds 1–5</b> and <b>${late} times in rounds 16–20</b>.
          ${late > early ? 'More data about you made its predictions better.' : 'You were hard to predict! With hundreds of rounds of data, it would find your pattern.'}
          This is the <b>Data (Statistical Data)</b> domain: AI that learns patterns from numbers and records.</div></div>
        <div class="row mt"><button class="btn sm" id="rpsAgain">Play again</button></div>`;
      box.querySelector('#rpsAgain').onclick = () => {
        K.forEach(a => K.forEach(b => { mem[a][b] = 0; })); K.forEach(k => { tot[k] = 0; });
        last = null; round = 0; sc = { you: 0, ai: 0, draw: 0 }; hits = []; lastMsg = ''; lastPred = ''; render();
      };
      if (!ctx.done && !ctx._completed) {
        ctx._completed = true;
        ctx.data.best = Math.max(ctx.data.best || 0, sc.you); ctx.save();
        ctx.complete(`Played ${ROUNDS} rounds against a learning AI (you ${sc.you}, AI ${sc.ai}).`);
      }
    }

    render();
    return () => {};
  }
};
