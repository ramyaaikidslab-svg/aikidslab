import { ic, esc } from '../core/util.js';

// All brands, numbers and web addresses below are made-up examples.
const FLAGS = {
  sender: 'Unknown or odd sender (a personal or foreign number)',
  misspelt: 'Look-alike sender address with a misspelling',
  generic: 'Generic greeting ("Dear Customer") instead of your name',
  urgent: 'Urgency or threats to rush you',
  link: 'A link to an unofficial or look-alike website',
  askOtp: 'Asks for your OTP, PIN or password',
  prize: 'A prize or lottery you never entered',
  fee: 'Asks you to pay a fee to receive money or a parcel'
};
const FLAG_WHY = {
  sender: 'Real banks and companies message from official sender IDs, not random personal or foreign numbers.',
  misspelt: '"sunrlse" uses an l instead of an i. Scammers register look-alike names that are easy to misread.',
  generic: 'Your real bank knows your name. "Dear Customer" is sent to thousands of people at once.',
  urgent: 'Pressure ("today", "within 1 hour", "suspended") is meant to stop you from thinking or checking.',
  link: 'The real website is not this address. Fake sites copy the look of real ones to steal your details.',
  askOtp: 'No bank or app ever asks for your OTP or PIN. Anyone who has them can empty your account.',
  prize: 'You cannot win a lucky draw you never entered.',
  fee: 'Genuine prizes and deliveries do not ask for a small "fee" through a link or UPI. That is how the money is stolen.'
};

// parts: plain strings, or [text, flagKey|null]. Every [] part is tappable; null ones are normal.
const MSGS = [
  {
    id: 'kyc', kind: 'sms', from: ['+91 98XXX X4821', 'sender'], time: '10:42 am', phish: true,
    parts: [['Dear Customer,', 'generic'], ' your ', ['Sunrise Bank account', null], ' ', ['will be BLOCKED today', 'urgent'], ' due to ', ['pending KYC', null], '. Update now at ', ['sunrise-kyc-update.co', 'link'], ' and ', ['enter your ATM PIN and OTP', 'askOtp'], ' to continue banking.']
  },
  {
    id: 'prize', kind: 'wa', from: ['+44 7700 9XX 112', 'sender'], time: '9:15 pm', phish: true,
    parts: ['🎉 ', ['Congratulations!! You have WON ₹25,00,000 in the Mega Lucky Draw 2026', 'prize'], '. ', ['Your number was picked by our computer.', 'prize'], ' To claim it, ', ['pay a ₹4,999 processing fee by UPI', 'fee'], ' ', ['within 1 hour', 'urgent'], ' or the prize goes to someone else. ', ['Our manager Mr. Sharma will help you.', null]]
  },
  {
    id: 'bank', kind: 'email', from: ['Sunrise Bank Security <alerts@sunrlse-bank.com>', 'misspelt'], subject: 'Unusual sign-in detected on your account', time: '7:03 am', phish: true,
    parts: [['Dear Valued Customer,', 'generic'], '\n\nWe noticed ', ['a sign-in from a new device', null], '. If this was not you, ', ['verify your account here: sunrlse-bank.com.secure-login.net', 'link'], ' ', ['within 24 hours', 'urgent'], ' or your account will be ', ['permanently suspended', 'urgent'], '.\n\n', ['Thank you, Sunrise Bank Team', null]]
  },
  {
    id: 'school', kind: 'email', from: ['Green Valley School <office@greenvalleyschool.edu.in>', null], subject: 'Annual Sports Day: Saturday, 14 November', time: 'Yesterday', phish: false,
    parts: [['Dear Parents,', null], '\n\n', ['Annual Sports Day will be held on Saturday, 14 November, from 8:30 am', null], ' in the school ground. ', ['Students should wear their house T-shirts.', null], ' ', ['No payment is needed.', null], '\n\n', ['For any questions, please contact the class teacher or the school office.', null], '\n\nRegards,\nPrincipal'],
    safe: ['It comes from the school\'s usual address, about an event you expect.', 'There are no links, no payments and no requests for personal details.', 'No pressure or threats, and it tells you to contact the school directly.']
  },
  {
    id: 'otp', kind: 'sms', from: ['AX-PAYLIO', null], time: 'Just now', phish: false, context: 'You have just tapped "Log in" in the Paylio app on your own phone.',
    parts: [['482913 is your OTP to log in to Paylio.', null], ' ', ['Valid for 10 minutes.', null], ' ', ['Do not share this OTP with anyone, including Paylio staff.', null]],
    safe: ['You asked for it: you were logging in yourself just now.', 'It does not ask you to share, reply or click anything. It warns you NOT to share.', 'It comes from the app\'s official sender ID, with no link.'],
    note: 'If an OTP arrives when you did not ask for one, someone may be trying to get into your account. Never share it.'
  },
  {
    id: 'parcel', kind: 'sms', from: ['+91 63XXX X0917', 'sender'], time: '2:26 pm', phish: true,
    parts: [['SwiftShip:', null], ' ', ['Your parcel is on hold because of an incomplete address.', null], ' ', ['Pay a ₹25 re-delivery fee', 'fee'], ' at ', ['swiftship-redelivery.top/pay', 'link'], ' ', ['today or it will be returned', 'urgent'], '.']
  }
];
const KIND = { sms: 'SMS', wa: 'WhatsApp', email: 'Email' };

const CSS = `
.lab-ph .phone{background:#fff; border:3px solid var(--ink); border-radius:22px; overflow:hidden; box-shadow:var(--sh); max-width:560px; width:100%;}
.lab-ph .phbar{display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:2px solid var(--ink); background:#F2F4F8;}
.lab-ph .phbar .av{width:36px; height:36px; border-radius:50%; background:#C9CEDA; display:grid; place-items:center; font-weight:900; flex-shrink:0; border:2px solid var(--ink);}
.lab-ph .phbar .who{min-width:0; line-height:1.25;}
.lab-ph .phbar .who small{display:block; color:var(--muted); font-weight:700;}
.lab-ph .phone.wa .phbar{background:#1F6E5B; color:#fff;} .lab-ph .phone.wa .phbar .who small{color:#D2EDE5;}
.lab-ph .phone.wa .phbar .av{background:#BFE7DA; color:var(--ink);}
.lab-ph .body{padding:14px; background:#fff; white-space:pre-line; line-height:2.1;}
.lab-ph .phone.sms .body{background:#fff;}
.lab-ph .phone.wa .body{background:#EFE7DC;}
.lab-ph .bubble{background:#E9ECF2; border-radius:16px 16px 16px 4px; padding:6px 12px; display:inline-block; max-width:100%;}
.lab-ph .phone.wa .bubble{background:#fff; border:1px solid #D9D2C6;}
.lab-ph .bubble .tm{display:block; text-align:right; font-size:.72rem; color:var(--muted); line-height:1.2; margin-top:2px;}
.lab-ph .mailhd{padding:10px 14px; border-bottom:2px solid var(--line); display:grid; gap:2px; font-size:.92rem; line-height:1.9; white-space:normal;}
.lab-ph .mailhd .lb{color:var(--muted); font-weight:800; margin-right:6px;}
.lab-ph .mailhd .subj{font-weight:900; font-size:1.02rem; line-height:1.4;}
.lab-ph .bit{cursor:pointer; border-bottom:2px dotted var(--faint); border-radius:4px; padding:3px 2px; -webkit-box-decoration-break:clone; box-decoration-break:clone; overflow-wrap:anywhere;}
.lab-ph .bit:hover{background:var(--paper-2);}
.lab-ph .bit[aria-pressed="true"]{background:#FFE08A; border-bottom:2px solid var(--gold-deep);}
.lab-ph .bit.found{background:var(--bad-wash); border-bottom:2px solid var(--bad); color:#8E1F24; font-weight:800;}
.lab-ph .bit.missed{background:#fff; outline:2px dashed var(--bad); outline-offset:1px;}
.lab-ph .bit.extra{background:#EEF0F4; border-bottom:2px dotted var(--faint); text-decoration:line-through; text-decoration-color:var(--faint);}
.lab-ph .bit.done{cursor:default;}
.lab-ph .bit.done:hover{background:inherit;}
.lab-ph .verdict{display:grid; grid-template-columns:1fr 1fr; gap:10px; max-width:560px;}
.lab-ph .verdict .btn{min-height:52px;}
.lab-ph .fl{list-style:none; display:grid; gap:6px;}
.lab-ph .fl li{display:grid; grid-template-columns:24px minmax(0,1fr); gap:8px; align-items:start; font-size:.95rem;}
.lab-ph .fl .m{width:22px; height:22px; border-radius:7px; display:grid; place-items:center; font-size:.8rem; font-weight:900; border:2px solid var(--ink);}
.lab-ph .fl .m.y{background:var(--good); border-color:var(--good); color:#fff;} .lab-ph .fl .m.n{background:#fff; border-color:var(--bad); color:var(--bad);}
.lab-ph .ctx{background:var(--blue-wash); border:2px solid var(--ink); border-radius:12px; padding:8px 12px; font-weight:700; font-size:.92rem; max-width:560px;}
`;

export default {
  title: 'Phishing Spotter',
  mount(ctx) {
    const el = ctx.el;
    el.classList.add('lab-ph');
    const d = ctx.data;
    const order = ctx.rng.shuffle(MSGS.map((_, i) => i));
    let idx = Number.isInteger(d.i) ? Math.min(d.i, MSGS.length) : 0;
    let res = Array.isArray(d.r) ? d.r.slice(0, idx) : [];     // [{ok, f: flags found, t: total flags}]
    if (res.length < idx) idx = res.length;
    let taps = new Set(), verdict = null, completed = false;
    const save = () => { d.i = idx; d.r = res; ctx.save(); };

    el.innerHTML = `<style>${CSS}</style>
      <p class="lab-intro"><b>Phishing</b> is a fake message that tries to trick you into clicking a link, paying money or sharing a password or OTP. Check each message like a detective: tap every part that looks suspicious, then decide.</p>
      <div class="banner">${ic('target')}<div><b>Goal:</b> check all 6 messages: tap the red flags and mark each one Phishing or Safe.${ctx.done ? ' <span class="chip ok">Already completed — replay any time</span>' : ''}</div></div>
      <div id="phMain" class="stack"></div>
      <p class="tiny muted">All banks, apps, phone numbers and web addresses here are made-up examples.</p>`;
    const MAIN = el.querySelector('#phMain');
    const dots = () => `<div class="dots" aria-hidden="true">${order.map((_, i) => `<i class="${i < idx ? (res[i].ok ? 'ok' : 'no') : i === idx ? 'now' : ''}"></i>`).join('')}</div>`;

    // flatten the tappable parts of a message (sender first)
    const bits = M => [M.from, ...M.parts.filter(p => Array.isArray(p))];

    function bitHTML(p, k, M) {
      const [text, flag] = p;
      let cls = 'bit';
      if (verdict !== null) cls += ' done ' + (flag ? (taps.has(k) ? 'found' : 'missed') : (taps.has(k) ? 'extra' : ''));
      const extra = verdict !== null && flag ? `<span class="sr"> (red flag${taps.has(k) ? ', you found it' : ', missed'})</span>` : '';
      return `<span class="${cls}" role="button" tabindex="${verdict === null ? 0 : -1}" data-b="${k}" aria-pressed="${taps.has(k)}">${esc(text)}${extra}</span>`;
    }

    function msgHTML(M) {
      let k = 1;
      const body = M.parts.map(p => Array.isArray(p) ? bitHTML(p, k++, M) : esc(p)).join('');
      const from = bitHTML(M.from, 0, M);
      if (M.kind === 'email') return `<div class="phone email"><div class="phbar"><div class="av">${ic('book', 'sm')}</div><div class="who"><b>Inbox</b><small>${M.time}</small></div></div>
        <div class="mailhd"><div><span class="lb">From</span>${from}</div><div class="subj">${esc(M.subject)}</div></div>
        <div class="body">${body}</div></div>`;
      const init = M.kind === 'wa' ? '?' : M.from[0][0] === '+' ? '#' : 'A';
      return `<div class="phone ${M.kind}"><div class="phbar"><div class="av" aria-hidden="true">${init}</div><div class="who">${from}<small>${KIND[M.kind]}</small></div></div>
        <div class="body"><div class="bubble">${body}<span class="tm">${M.time}</span></div></div></div>`;
    }

    function renderMsg() {
      const M = MSGS[order[idx]];
      const all = bits(M), flagged = all.map((p, k) => p[1] ? k : -1).filter(k => k >= 0);
      MAIN.innerHTML = `
        <div class="qcount" style="margin:0"><span>Message ${idx + 1} of ${MSGS.length} · ${KIND[M.kind]}</span>${dots()}</div>
        ${M.context ? `<div class="ctx">${ic('user', 'sm')} ${esc(M.context)}</div>` : ''}
        ${msgHTML(M)}
        ${verdict === null ? `
          <p class="small muted">Tap any part (including the sender) that looks suspicious. Tap again to un-mark. <b>${taps.size}</b> marked.</p>
          <div class="verdict"><button class="btn" data-v="1">🎣 Phishing</button><button class="btn" data-v="0">${ic('check')} Safe</button></div>`
        : feedbackHTML(M, flagged)}`;
      MAIN.querySelectorAll('.bit').forEach(b => {
        const tog = () => { if (verdict !== null) return; const k = +b.dataset.b; taps.has(k) ? taps.delete(k) : taps.add(k); ctx.sfx('tick'); renderMsg(); const nb = MAIN.querySelector(`.bit[data-b="${k}"]`); if (nb) nb.focus(); };
        b.onclick = tog;
        b.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } };
      });
      MAIN.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
        verdict = b.dataset.v === '1';
        const ok = verdict === M.phish, found = flagged.filter(k => taps.has(k)).length;
        res[idx] = { ok: ok ? 1 : 0, f: found, t: flagged.length, id: M.id, fl: flagged.filter(k => taps.has(k)).map(k => all[k][1]) };
        ctx.sfx(ok ? 'ok' : 'bad'); renderMsg();
        const f = MAIN.querySelector('#phNext'); if (f) f.focus({ preventScroll: true });
      });
      const nx = MAIN.querySelector('#phNext');
      if (nx) nx.onclick = () => { idx++; taps = new Set(); verdict = null; save(); render(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    }

    function feedbackHTML(M, flagged) {
      const ok = verdict === M.phish;
      const all = bits(M);
      const extras = [...taps].filter(k => !all[k][1]).length;
      let inner;
      if (M.phish) {
        const kinds = [...new Set(flagged.map(k => all[k][1]))];
        inner = `<p><b>This is phishing.</b> You found ${flagged.filter(k => taps.has(k)).length} of ${flagged.length} red flags.</p>
          <ul class="fl">${kinds.map(f => { const got = flagged.some(k => all[k][1] === f && taps.has(k)); return `<li><span class="m ${got ? 'y' : 'n'}" aria-label="${got ? 'found' : 'missed'}">${got ? '✓' : '!'}</span><span><b>${FLAGS[f]}.</b> ${FLAG_WHY[f]}</span></li>`; }).join('')}</ul>`;
      } else {
        inner = `<p><b>This one is safe.</b> Why:</p><ul class="fl">${M.safe.map(s => `<li><span class="m y">✓</span><span>${esc(s)}</span></li>`).join('')}</ul>${M.note ? `<p class="small"><b>Careful:</b> ${esc(M.note)}</p>` : ''}`;
      }
      if (extras) inner += `<p class="small muted">Grey crossed-out parts are normal. It's good to be careful, but they are not red flags here.</p>`;
      return `<div class="fb ${ok ? 'good' : 'bad'}" aria-live="polite"><div class="h">${ic(ok ? 'check' : 'x')} ${ok ? 'Correct!' : (M.phish ? 'Careful — this was a scam' : 'Actually, this one is genuine')}</div>${inner}</div>
        <div><button class="btn primary" id="phNext">${idx === MSGS.length - 1 ? 'See my summary' : 'Next message'} ${ic('arrow')}</button></div>`;
    }

    function renderEnd() {
      const right = res.filter(r => r.ok).length, f = res.reduce((a, r) => a + r.f, 0), t = res.reduce((a, r) => a + r.t, 0);
      const seen = {};
      res.forEach(r => { const M = MSGS.find(m => m.id === r.id); if (!M || !M.phish) return; bits(M).forEach(p => { if (p[1]) { seen[p[1]] = seen[p[1]] || { t: 0, f: 0 }; seen[p[1]].t++; } }); (r.fl || []).forEach(k => { if (seen[k]) seen[k].f++; }); });
      MAIN.innerHTML = `
        <div class="qcount" style="margin:0"><span>All 6 messages checked</span>${dots()}</div>
        <div class="stats" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <div class="stat"><div class="k">Right verdicts</div><div class="v">${right}<small> / 6</small></div></div>
          <div class="stat"><div class="k">Red flags found</div><div class="v">${f}<small> / ${t}</small></div></div>
        </div>
        <div class="lab-box"><h4>Red flags to remember</h4>
          <ul class="fl">${Object.keys(FLAGS).filter(k => seen[k]).map(k => `<li><span class="m ${seen[k].f >= seen[k].t ? 'y' : 'n'}">${seen[k].f >= seen[k].t ? '✓' : '!'}</span><span><b>${FLAGS[k]}</b> <span class="muted small">(you spotted ${seen[k].f} of ${seen[k].t})</span></span></li>`).join('')}</ul>
        </div>
        <div class="lab-box"><h4>If you get a suspicious message</h4>
          <ul class="fl">
            <li><span class="m y">1</span><span>Don't click links, reply or pay. Never share an OTP, PIN or password.</span></li>
            <li><span class="m y">2</span><span>Check for yourself using the official app or website, or a number you already trust, not the one in the message.</span></li>
            <li><span class="m y">3</span><span>Tell a parent or teacher. In India, cyber fraud can be reported on the helpline <b>1930</b> or at <b>cybercrime.gov.in</b>.</span></li>
          </ul></div>
        <div class="lab-done">${ic('check')}<div>You checked 6 messages for <b>phishing</b>. Spotting red flags (urgency, look-alike links, requests for OTPs, fees and fake prizes) is a key <b>cyber security</b> habit that protects your data from <b>unauthorised access</b> and theft.</div></div>
        <div><button class="btn sm" id="phAgain">${ic('refresh')} Check them again</button></div>`;
      MAIN.querySelector('#phAgain').onclick = () => { idx = 0; res = []; taps = new Set(); verdict = null; save(); render(); };
      if (!completed && !ctx.done) {
        completed = true;
        ctx.complete(`Checked 6 messages for phishing: ${right}/6 right verdicts, ${f} of ${t} red flags found.`);
      }
    }

    function render() { if (idx >= MSGS.length) renderEnd(); else renderMsg(); }
    render();
    return () => { el.classList.remove('lab-ph'); };
  }
};
