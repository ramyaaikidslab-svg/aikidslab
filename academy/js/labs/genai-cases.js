import { esc, ic } from '../core/util.js';

// Eight real-life generative-AI dilemmas. Each has exactly one responsible action.
const CASES = [
  {
    id: 'essay', emoji: '📝', title: 'The festival essay',
    text: 'Your English teacher wants a 400-word essay on “My favourite festival”. A friend says: “Just ask an AI chatbot to write it. Nobody will know.”',
    opts: [
      { t: 'Paste the AI essay and submit it as your own work.', ok: false, why: 'Passing off AI work as your own is dishonest, and you skip the practice the essay was meant to give you.' },
      { t: 'Write it yourself. If you use AI to brainstorm ideas or check grammar, follow your teacher’s rules and say how you used it.', ok: true, why: 'AI can be a helper, but the thinking and writing should be yours, and you are open about any AI help.' },
      { t: 'Let the AI write it, then change a few words so it looks different.', ok: false, why: 'Changing a few words does not make it your work. It is still hiding AI use.' }
    ],
    rule: 'Be honest: disclose AI help and never pass off AI work as your own.'
  },
  {
    id: 'deepfake', emoji: '🎭', title: 'A “funny” face-swap',
    text: 'Someone in your class WhatsApp group found an AI app that puts any face into a dance video. They want to make one of a classmate “just for fun”.',
    opts: [
      { t: 'Make it, but only share it inside the class group.', ok: false, why: 'Group chats get forwarded. A fake video of a real person, made without consent, can embarrass and hurt them.' },
      { t: 'Make it and add a small “FAKE” label in the corner.', ok: false, why: 'Labels can be cropped out, and the classmate still never agreed to it.' },
      { t: 'Say no. Explain that deepfakes of real people without consent can hurt them, and tell a teacher if one starts circulating.', ok: true, why: 'Respecting consent protects people. A deepfake can spread far beyond the group and cannot be taken back.' }
    ],
    rule: 'Never create deepfakes of real people. Consent comes first.'
  },
  {
    id: 'poster', emoji: '🎨', title: 'Poster for the school fest',
    text: 'You are making the poster for your school’s Annual Fest. An AI image tool can create a colourful background in seconds.',
    opts: [
      { t: 'Use the AI image, write “Background made with an AI tool” on the poster, and check it does not copy someone else’s artwork or logo.', ok: true, why: 'Using AI for creativity is fine when you disclose it and respect other people’s work and copyright.' },
      { t: 'Use the AI image and tell everyone you painted it yourself.', ok: false, why: 'Claiming AI work as your own art is dishonest.' },
      { t: 'Ask the AI to copy a famous film poster, with the actors’ faces, and use it.', ok: false, why: 'This copies someone else’s copyrighted work and uses real people’s faces without permission.' }
    ],
    rule: 'Disclose AI-made content and respect copyright.'
  },
  {
    id: 'translate', emoji: '👵', title: 'Translating for Nani',
    text: 'Your school sent a circular in English about a parent–teacher meeting. Your grandmother reads only Tamil. You think of using an AI translator.',
    opts: [
      { t: 'Don’t use AI at all. Machine translation is always wrong.', ok: false, why: 'AI translation is a genuinely useful accessibility tool. It just needs checking.' },
      { t: 'Use the AI translation, then double-check key details like the date, time and place with the original or a parent.', ok: true, why: 'AI helps people access information. Checking the facts that matter catches any mistakes.' },
      { t: 'Use the translation and trust every word without checking.', ok: false, why: 'Translations can get dates, numbers or meanings wrong. Important details deserve a check.' }
    ],
    rule: 'Use AI to include people, and double-check the details that matter.'
  },
  {
    id: 'celebrity', emoji: '🏏', title: 'A famous cricketer’s “advice”',
    text: 'An Instagram post shows a famous cricketer saying: “I doubled my money with this app! Download now.” The video looks a little too smooth.',
    opts: [
      { t: 'Share it with friends. He is famous, so it must be true.', ok: false, why: 'AI can fake a famous person’s face and voice. Sharing spreads a possible scam.' },
      { t: 'Download the app to see if it works.', ok: false, why: 'Money-doubling apps are a classic scam, and installing one can steal your data or money.' },
      { t: 'Check the cricketer’s official accounts and trusted news. Don’t share it, and report the post if it is fake.', ok: true, why: 'Verifying the source is the best defence against AI-made fake endorsements.' }
    ],
    rule: 'Verify the source before you trust or share.'
  },
  {
    id: 'medical', emoji: '🩺', title: 'Fever and a chatbot',
    text: 'You have had a fever and headache for three days. You ask an AI chatbot what to do.',
    opts: [
      { t: 'Take whatever medicine and dose the chatbot suggests.', ok: false, why: 'Chatbots can hallucinate: they sound confident even when wrong. Medicine doses must come from a doctor.' },
      { t: 'Use the AI only for general information, tell a parent, and see a doctor.', ok: true, why: 'For health, money and safety, a qualified human must make the decision.' },
      { t: 'Ignore it, because the chatbot said it is probably nothing.', ok: false, why: 'AI does not examine you and can be wrong. A three-day fever needs a real check-up.' }
    ],
    rule: 'AI can be confidently wrong. For health, money and safety, ask a qualified person.'
  },
  {
    id: 'photo', emoji: '📸', title: 'Your friend’s photo',
    text: 'A trending app turns photos into cartoon avatars. You want to upload your best friend’s photo as a birthday surprise.',
    opts: [
      { t: 'Ask your friend first, and check what the app does with uploaded photos (its privacy policy).', ok: true, why: 'A face is personal data. Consent and knowing where the data goes protect your friend.' },
      { t: 'Upload it without asking. It’s only a cartoon.', ok: false, why: 'The app may store or reuse the photo. Your friend never agreed to share their face.' },
      { t: 'Upload the whole class photo so everyone gets an avatar.', ok: false, why: 'That shares many people’s personal data without any of them agreeing.' }
    ],
    rule: 'Protect personal data. Ask before you share anyone’s photo or details.'
  },
  {
    id: 'facts', emoji: '📚', title: 'Facts for a project',
    text: 'For your Science project on tigers, an AI chatbot gives you a statistic about tiger reserves in India and names a book as its source.',
    opts: [
      { t: 'Copy the statistic and the book name into your project.', ok: false, why: 'Chatbots can invent facts and even make up sources that don’t exist.' },
      { t: 'Check the fact in a reliable source (your textbook or an official government website) and cite that source.', ok: true, why: 'Verifying facts and citing real sources keeps your work accurate and honest.' },
      { t: 'Use the statistic but don’t cite anything.', ok: false, why: 'An unchecked, uncited fact may be wrong, and readers can’t check it.' }
    ],
    rule: 'Check AI facts against reliable sources, and cite the real source.'
  }
];

const CSS = `
.lab-genai-cases .gc-card{background:#fff; border:var(--b2); border-radius:14px; padding:16px; display:grid; gap:12px;}
.lab-genai-cases .gc-head{display:flex; gap:12px; align-items:center;}
.lab-genai-cases .gc-emoji{font-size:2.2rem; line-height:1; width:56px; height:56px; display:grid; place-items:center; background:var(--violet-wash); border:var(--b2); border-radius:14px; flex-shrink:0;}
.lab-genai-cases .gc-list{list-style:none; display:grid; gap:8px;}
.lab-genai-cases .gc-list li{display:flex; gap:10px; align-items:flex-start; background:#fff; border:2px solid var(--good); border-radius:10px; padding:8px 12px; font-weight:700;}
.lab-genai-cases .gc-list li .ic{color:var(--good); margin-top:2px;}
`;

export default {
  title: 'Generative AI: what’s the responsible choice?',
  mount(ctx) {
    const order = ctx.rng.shuffle(CASES.map((_, i) => i));
    const optOrder = CASES.map(c => ctx.rng.shuffle(c.opts.map((_, i) => i)));
    let idx = 0, picked = [], firstTry = 0, completed = false;

    function render() {
      if (idx >= CASES.length) return renderEnd();
      const c = CASES[order[idx]];
      const right = picked.some(p => c.opts[p].ok);
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-genai-cases stack">
          <p class="lab-intro">Generative AI can write, draw, translate and talk. Using it <b>responsibly</b> is a skill. For each situation, pick the most responsible action.</p>
          <div class="qcount"><span><b>Goal:</b> decide all ${CASES.length} situations</span><span>Case ${idx + 1} / ${CASES.length}</span>
            <div class="dots" aria-hidden="true">${CASES.map((_, i) => `<i class="${i < idx ? 'ok' : i === idx ? 'now' : ''}"></i>`).join('')}</div></div>
          ${ctx.done ? '<p class="chip ok">Already completed — replay any time</p>' : ''}
          <div class="gc-card">
            <div class="gc-head"><div class="gc-emoji" aria-hidden="true">${c.emoji}</div><h4>${esc(c.title)}</h4></div>
            <p>${esc(c.text)}</p>
            <div class="opts" role="group" aria-label="Choose an action">
              ${optOrder[order[idx]].map((oi, k) => {
                const o = c.opts[oi], was = picked.includes(oi);
                const cls = was ? (o.ok ? 'right' : 'wrong') : '';
                return `<button class="opt ${cls}" data-o="${oi}" ${right || was ? 'disabled' : ''}><span class="k">${'ABC'[k]}</span><span>${esc(o.t)}</span></button>`;
              }).join('')}
            </div>
            <div aria-live="polite" id="gcFb">${picked.length ? feedback(c) : ''}</div>
          </div>
          ${right ? `<div class="row"><button class="btn primary" id="gcNext">${idx === CASES.length - 1 ? 'See my checklist' : 'Next case'} ${ic('arrow')}</button></div>` : ''}
        </div>`;
      ctx.el.querySelectorAll('[data-o]').forEach(b => b.onclick = () => choose(+b.dataset.o));
      const nx = ctx.el.querySelector('#gcNext');
      if (nx) nx.onclick = () => { idx++; picked = []; ctx.sfx('pop'); render(); ctx.el.querySelector('button')?.focus(); };
    }

    function feedback(c) {
      const o = c.opts[picked[picked.length - 1]];
      if (o.ok) return `<div class="fb good"><div class="h">${ic('check')} Responsible choice</div><div>${esc(o.why)}</div><div class="key"><b>Rule</b>${esc(c.rule)}</div></div>`;
      return `<div class="fb bad"><div class="h">${ic('x')} Not the best choice</div><div>${esc(o.why)}</div><div class="small muted">Try another option.</div></div>`;
    }

    function choose(oi) {
      const c = CASES[order[idx]];
      if (!picked.length && c.opts[oi].ok) firstTry++;
      picked.push(oi);
      ctx.sfx(c.opts[oi].ok ? 'ok' : 'bad');
      render();
      ctx.el.querySelector('#gcFb')?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
    }

    function renderEnd() {
      ctx.el.innerHTML = `<style>${CSS}</style>
        <div class="lab-genai-cases stack">
          <div class="row between"><h4>Your responsible-use checklist</h4><span class="chip gold">First-try right: ${firstTry} / ${CASES.length}</span></div>
          <p class="small muted">Before you use generative AI, run through this list:</p>
          <ul class="gc-list">${CASES.map(c => `<li>${ic('check')}<span>${esc(c.rule)}</span></li>`).join('')}</ul>
          <div class="lab-done">${ic('check')}<div>Generative AI is a powerful helper, but it can hallucinate, copy, fake and leak. <b>Responsible use</b> means being honest about AI help, verifying facts and sources, respecting consent and copyright, and protecting personal data.</div></div>
          <div class="row"><button class="btn sm" id="gcAgain">${ic('refresh')} Play again</button></div>
        </div>`;
      ctx.el.querySelector('#gcAgain').onclick = () => { idx = 0; picked = []; firstTry = 0; render(); };
      if (!completed) {
        completed = true;
        ctx.sfx('win');
        ctx.data.best = Math.max(ctx.data.best || 0, firstTry); ctx.save();
        if (!ctx.done) ctx.complete(`Decided 8 generative-AI situations (${firstTry} right first time) and built a responsible-use checklist.`);
      }
    }

    render();
    return () => {};
  }
};
