// Question generators: each takes a seeded rng and returns an item in the
// content schema (minus id). Different learners get different numbers, so
// answers can't simply be passed around. Every generator's Python output is
// verified against CPython by tools/check_gens.mjs.
import { frac } from '../core/rng.js';

// Builds a 4-option item. Wrong options are de-duplicated and never equal the
// right answer; if fewer than 3 remain, numeric neighbours of the answer fill in.
const mcq = (rng, right, wrongs, extra = {}) => {
  const seen = new Set([right]), w = [];
  for (const x of wrongs) { if (!seen.has(x)) { seen.add(x); w.push(x); } if (w.length === 3) break; }
  for (let k = 1; w.length < 3 && k < 50; k++) {
    for (const d of [k, -k]) {
      const cand = nudge(right, d);
      if (cand !== null && !seen.has(cand)) { seen.add(cand); w.push(cand); }
      if (w.length === 3) break;
    }
  }
  const o = rng.shuffle([right, ...w]);
  return { t: 'mcq', o, a: o.indexOf(right), ...extra };
};
function nudge(str, d) {                        // change the last number in the string by d
  const m = /(-?\d+)(\.\d+)?(?!.*\d)/.exec(str);
  if (!m) return null;
  const n = parseInt(m[1], 10) + d;
  if (n < 0) return null;
  return str.slice(0, m.index) + n + (m[2] || '') + str.slice(m.index + m[0].length);
}
const uniq = arr => [...new Set(arr)];

/* ---------- Python literal formatting (matches CPython repr for the values we use) ---------- */
export function pyRepr(v) {
  if (Array.isArray(v)) return '[' + v.map(pyRepr).join(', ') + ']';
  if (typeof v === 'string') return "'" + v + "'";
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (typeof v === 'number') return Number.isInteger(v) && v.__float ? v + '.0' : String(v);
  return String(v);
}
function pyFloat(x) {                         // repr of a float with a short exact decimal
  if (Number.isInteger(x)) return x + '.0';
  return String(+x.toFixed(10));
}
const floorDiv = (a, b) => Math.floor(a / b);
const pyMod = (a, b) => ((a % b) + b) % b;

const CONTEXTS_CM = [
  { what: 'a spam filter checking 1 school inbox', pos: 'spam', neg: 'not spam' },
  { what: 'an AI that checks X-rays for a broken bone', pos: 'broken', neg: 'not broken' },
  { what: 'a camera that sorts mangoes as ripe or unripe', pos: 'ripe', neg: 'unripe' },
  { what: 'a fever-screening camera at a railway station', pos: 'fever', neg: 'no fever' },
  { what: 'an app that predicts whether it will rain in your town', pos: 'rain', neg: 'no rain' }
];
function cmTable(c, tp, fn, fp, tn) {
  return `<div class="tblwrap"><table class="tbl"><thead><tr><th></th><th>Predicted: ${c.pos}</th><th>Predicted: ${c.neg}</th></tr></thead>` +
    `<tbody><tr><th>Actual: ${c.pos}</th><td>${tp}</td><td>${fn}</td></tr><tr><th>Actual: ${c.neg}</th><td>${fp}</td><td>${tn}</td></tr></tbody></table></div>`;
}

export const GENS = {
  'conf-matrix': {
    c: 'g-conf-matrix', label: 'Reading a confusion matrix',
    make(rng) {
      const c = rng.pick(CONTEXTS_CM), tp = rng.int(8, 40), fn = rng.int(1, 12), fp = rng.int(1, 12), tn = rng.int(10, 45);
      const kind = rng.int(0, 3), table = cmTable(c, tp, fn, fp, tn);
      const intro = `This confusion matrix shows ${c.what} (rows = actual, columns = predicted).${table}`;
      if (kind === 0) return { t: 'num', d: 2, q: `${intro}How many cases did the model predict as <b>${c.pos}</b>?`, a: tp + fp, ex: `Predicted ${c.pos} = True Positives + False Positives = ${tp} + ${fp} = ${tp + fp}.` };
      if (kind === 1) return { t: 'num', d: 2, q: `${intro}How many cases were <b>actually ${c.pos}</b>?`, a: tp + fn, ex: `Actually ${c.pos} = True Positives + False Negatives = ${tp} + ${fn} = ${tp + fn}.` };
      if (kind === 2) return { t: 'num', d: 2, q: `${intro}How many predictions were <b>correct</b>?`, a: tp + tn, ex: `Correct predictions are on the diagonal: TP + TN = ${tp} + ${tn} = ${tp + tn}.` };
      const right = 'False Negative';
      return { ...mcq(rng, right, ['False Positive', 'True Negative', 'True Positive']), d: 2,
        q: `${intro}The ${fn} cases that were actually <b>${c.pos}</b> but predicted <b>${c.neg}</b> are called…`,
        ex: `The model said "${c.neg}" (negative) and it was wrong, so these are False Negatives.` };
    }
  },
  'accuracy-calc': {
    c: 'g-accuracy', label: 'Calculating accuracy',
    make(rng) {
      const c = rng.pick(CONTEXTS_CM);
      let tp, fn, fp, tn, total;
      tp = rng.int(10, 50); fn = rng.int(1, 15); fp = rng.int(1, 15); tn = rng.int(10, 50); total = tp + fn + fp + tn;
      const acc = Math.round((tp + tn) / total * 1000) / 10;
      return { t: 'num', d: 2, tol: 0.05, unit: '%',
        q: `Calculate the accuracy of ${c.what} (rows = actual, columns = predicted). Give the answer as a percentage to 1 decimal place.${cmTable(c, tp, fn, fp, tn)}`,
        a: acc, ex: `Accuracy = (TP + TN) ÷ total × 100 = (${tp} + ${tn}) ÷ ${total} × 100 = ${acc}%.` };
    }
  },
  'chart-pick': {
    c: 'g-chart-pick', label: 'Choosing the right chart',
    make(rng) {
      const S = [
        ['Line chart', () => `how ${rng.pick(['Chennai', 'Pune', 'Jaipur', 'Guwahati'])}'s average temperature changed month by month over a year`],
        ['Line chart', () => `how many visitors a school website got each week this term`],
        ['Bar chart', () => `the number of students who joined each club: ${rng.sample(['Robotics', 'Music', 'Art', 'Sports', 'Eco', 'Drama'], 4).join(', ')}`],
        ['Bar chart', () => `total runs scored by ${rng.pick(['five', 'six'])} batters in a match`],
        ['Pie chart', () => `what fraction of a family's monthly budget goes to food, rent, travel and savings`],
        ['Pie chart', () => `the share of each fuel type (petrol, diesel, CNG, electric) among cars in a parking lot, as parts of the whole`],
        ['Scatter plot', () => `whether students who sleep more hours also score higher marks`],
        ['Scatter plot', () => `whether bigger houses in a city have higher electricity bills`],
        ['Histogram', () => `how the heights of 300 Class 9 students are spread across height ranges`],
        ['Histogram', () => `how the waiting times of 500 patients at a clinic are distributed across time ranges`]
      ];
      const [right, f] = rng.pick(S);
      const all = ['Line chart', 'Bar chart', 'Pie chart', 'Scatter plot', 'Histogram'];
      const why = { 'Line chart': 'a line chart shows change over time', 'Bar chart': 'a bar chart compares separate categories', 'Pie chart': 'a pie chart shows parts of a whole', 'Scatter plot': 'a scatter plot shows the relationship between two numeric variables', 'Histogram': 'a histogram shows how one numeric variable is distributed across ranges' };
      return { ...mcq(rng, right, rng.shuffle(all.filter(x => x !== right))), d: 2,
        q: `You want to show ${f()}. Which chart fits best?`, ex: `Use a ${right.toLowerCase()} because ${why[right]}.` };
    }
  },
  'data-type': {
    c: 'g-data-type', label: 'Nominal, ordinal, discrete or continuous',
    make(rng) {
      const V = [['blood group of each student', 'Nominal'], ['favourite colour', 'Nominal'], ['state a person lives in', 'Nominal'], ['mode of travel to school (bus, walk, cycle)', 'Nominal'],
        ['T-shirt size (S, M, L, XL)', 'Ordinal'], ['customer rating from 1 to 5 stars', 'Ordinal'], ['class rank (1st, 2nd, 3rd…)', 'Ordinal'], ['spice level (mild, medium, hot)', 'Ordinal'],
        ['number of siblings', 'Discrete'], ['number of goals scored in a match', 'Discrete'], ['number of cars crossing a signal in a minute', 'Discrete'], ['number of students absent today', 'Discrete'],
        ['height of a student in cm', 'Continuous'], ['time taken to run 100 m', 'Continuous'], ['weight of a watermelon', 'Continuous'], ['temperature at noon', 'Continuous']];
      const [v, right] = rng.pick(V);
      const why = { Nominal: 'it is a category with no natural order', Ordinal: 'it is a category with a meaningful order', Discrete: 'it is counted in whole numbers', Continuous: 'it is measured and can take decimal values' };
      return { t: 'mcq', d: 2, o: ['Nominal', 'Ordinal', 'Discrete', 'Continuous'], a: ['Nominal', 'Ordinal', 'Discrete', 'Continuous'].indexOf(right),
        q: `What type of data is the <b>${v}</b>?`, ex: `${right}: ${why[right]}.` };
    }
  },
  'mean-median-mode': {
    c: 'g-central', label: 'Mean, median, mode and range',
    make(rng) {
      const n = rng.int(5, 8);
      const pool = rng.shuffle(Array.from({ length: 19 }, (_, i) => i + 2));
      const vals = pool.slice(0, n - 1); vals.push(vals[rng.int(0, vals.length - 1)]);   // exactly one repeated value -> unique mode
      const data = rng.shuffle(vals), s = data.slice().sort((a, b) => a - b);
      const sum = data.reduce((a, b) => a + b, 0), mean = Math.round(sum / n * 10) / 10;
      const median = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      const counts = {}; data.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
      const mode = +Object.keys(counts).find(k => counts[k] === 2), range = s[n - 1] - s[0];
      const ctxt = rng.pick(['runs scored by a batter in her last matches', 'marks (out of 20) in weekly tests', 'minutes a bus was late each day', 'mangoes picked from each tree']);
      const which = rng.pick(['mean', 'median', 'mode', 'range']);
      const base = `Data — ${ctxt}: <b>${data.join(', ')}</b>.`;
      if (which === 'mean') return { t: 'num', d: 2, tol: 0.05, q: `${base} Find the <b>mean</b> (to 1 decimal place).`, a: mean, ex: `Sum = ${sum}, count = ${n}, mean = ${sum} ÷ ${n} = ${mean}.` };
      if (which === 'median') return { t: 'num', d: 2, q: `${base} Find the <b>median</b>.`, a: median, ex: `Sorted: ${s.join(', ')}. ${n % 2 ? `The middle (position ${(n + 1) / 2}) value is ${median}.` : `Even count, so average the two middle values: (${s[n / 2 - 1]} + ${s[n / 2]}) ÷ 2 = ${median}.`}` };
      if (which === 'mode') return { t: 'num', d: 1, q: `${base} Find the <b>mode</b>.`, a: mode, ex: `${mode} appears twice; every other value appears once, so the mode is ${mode}.` };
      return { t: 'num', d: 1, q: `${base} Find the <b>range</b>.`, a: range, ex: `Range = highest − lowest = ${s[n - 1]} − ${s[0]} = ${range}.` };
    }
  },
  'number-pattern': {
    c: 'g-pattern', label: 'Finding number patterns',
    make(rng) {
      const kind = rng.int(0, 4); let seq, rule;
      if (kind === 0) { const a = rng.int(1, 20), d = rng.int(2, 9); seq = Array.from({ length: 6 }, (_, i) => a + i * d); rule = `add ${d} each time`; }
      else if (kind === 1) { const a = rng.int(1, 5), r = rng.pick([2, 3]); seq = Array.from({ length: 6 }, (_, i) => a * r ** i); rule = `multiply by ${r} each time`; }
      else if (kind === 2) { const s = rng.int(1, 4); seq = Array.from({ length: 6 }, (_, i) => (s + i) ** 2); rule = 'they are square numbers'; }
      else if (kind === 3) { let a = rng.int(1, 3), b = rng.int(2, 5); seq = [a, b]; while (seq.length < 7) seq.push(seq[seq.length - 1] + seq[seq.length - 2]); rule = 'each term is the sum of the two before it'; }
      else { const a = rng.int(1, 10), x = rng.int(2, 5), y = rng.int(6, 10); seq = [a]; for (let i = 1; i < 7; i++) seq.push(seq[i - 1] + (i % 2 ? x : y)); rule = `add ${x}, then ${y}, alternately`; }
      const hide = rng.int(2, seq.length - 1), ans = seq[hide];
      const shown = seq.map((v, i) => i === hide ? '<b>?</b>' : v).join(', ');
      return { t: 'num', d: 2, q: `Find the missing number: ${shown}`, a: ans, ex: `The rule: ${rule}. So the missing number is ${ans}.` };
    }
  },
  'prob-basic': {
    c: 'g-prob', label: 'Calculating simple probability',
    make(rng) {
      const kind = rng.int(0, 3); let q, n, d, ex;
      if (kind === 0) {
        const ev = rng.pick([['an even number', [2, 4, 6]], ['a number greater than 4', [5, 6]], ['a prime number', [2, 3, 5]], ['a multiple of 3', [3, 6]], ['a number less than 3', [1, 2]], ['a 6', [6]]]);
        q = `A fair six-sided die is rolled once. What is the probability of getting ${ev[0]}?`; n = ev[1].length; d = 6; ex = `Favourable outcomes: ${ev[1].join(', ')} (${n}). Total outcomes: 6. P = ${n}/6 = ${frac(n, 6)}.`;
      } else if (kind === 1) {
        const r = rng.int(2, 7), b = rng.int(2, 7), g = rng.int(1, 6), col = rng.pick([['red', r], ['blue', b], ['green', g]]);
        q = `A bag has ${r} red, ${b} blue and ${g} green marbles. One marble is picked at random. What is the probability it is ${col[0]}?`; n = col[1]; d = r + b + g; ex = `Favourable = ${n} ${col[0]} marbles; total = ${d}. P = ${n}/${d} = ${frac(n, d)}.`;
      } else if (kind === 2) {
        const ev = rng.pick([['two heads', 1], ['at least one head', 3], ['exactly one head', 2], ['no heads', 1]]);
        q = `Two fair coins are tossed. What is the probability of getting ${ev[0]}?`; n = ev[1]; d = 4; ex = `Outcomes: HH, HT, TH, TT (4 equally likely). Favourable: ${n}. P = ${n}/4 = ${frac(n, 4)}.`;
      } else {
        const total = rng.pick([10, 12, 20]), k = rng.int(1, total - 1);
        q = `A spinner has ${total} equal sections numbered 1 to ${total}. What is the probability of landing on a number ≤ ${k}?`; n = k; d = total; ex = `Favourable: 1 to ${k} (${k} sections). P = ${k}/${total} = ${frac(k, total)}.`;
      }
      const right = frac(n, d), val = w => { const [x, y] = w.split('/').map(Number); return x / y; };
      const cands = [frac(Math.max(1, d - n), d), frac(n, d + n), frac(Math.min(n + 1, d), d), frac(Math.max(1, n - 1), d), `${d}/${n}`, '1/2', '1/3', '2/3', '1/4', '3/4', '1/5'];
      const wrongs = uniq(cands).filter(w => Math.abs(val(w) - n / d) > 1e-9);
      return { ...mcq(rng, right, rng.shuffle(wrongs)), d: 2, q, ex };
    }
  },
  'event-type': {
    c: 'g-event', label: 'Types of events',
    make(rng) {
      const E = [['the sun rising in the east tomorrow', 'Sure'], ['getting a number less than 7 on a normal die', 'Sure'], ['picking a vowel from the letters A, E, I', 'Sure'],
        ['getting a 7 on a normal six-sided die', 'Impossible'], ['picking a green ball from a bag of only red balls', 'Impossible'], ['a month having 32 days', 'Impossible'],
        ['getting a number greater than 1 on a die', 'Likely'], ['picking a red ball from a bag with 8 red and 2 blue', 'Likely'],
        ['getting a 6 on a die', 'Unlikely'], ['picking a blue ball from a bag with 8 red and 2 blue', 'Unlikely'],
        ['getting heads when tossing a fair coin', 'Equally likely'], ['getting an even number on a die', 'Equally likely']];
      const [ev, right] = rng.pick(E);
      const all = ['Sure', 'Impossible', 'Likely', 'Unlikely', 'Equally likely'];
      const why = { Sure: 'it will definitely happen (P = 1)', Impossible: 'it can never happen (P = 0)', Likely: 'it has more than a half chance', Unlikely: 'it has less than a half chance', 'Equally likely': 'it is exactly as likely to happen as not (P = 1/2)' };
      return { ...mcq(rng, right, rng.shuffle(all.filter(x => x !== right))), d: 1, q: `What type of event is <b>${ev}</b>?`, ex: `${right}: ${why[right]}.` };
    }
  },
  'prob-complement': {
    c: 'g-complement', label: 'Probability of an event not happening',
    make(rng) {
      if (rng.chance(0.5)) {
        const p = rng.int(1, 19) * 5;
        return { t: 'num', d: 2, unit: '%', q: `The forecast says there is a ${p}% chance of rain tomorrow. What is the chance it does <b>not</b> rain (in %)?`, a: 100 - p, ex: `P(not rain) = 100% − ${p}% = ${100 - p}%.` };
      }
      const p = rng.int(5, 95) / 100;
      return { t: 'num', d: 2, tol: 0.001, q: `A team's probability of winning a match is ${p}. What is the probability that it does <b>not</b> win? (as a decimal)`, a: +(1 - p).toFixed(2), ex: `P(not win) = 1 − ${p} = ${+(1 - p).toFixed(2)}.` };
    }
  },
  'py-type': {
    c: 'g-py-type', label: 'Python data types',
    make(rng) {
      const n = rng.int(2, 99), f = rng.int(2, 9);
      const V = [[`${n}`, 'int'], [`${n}.0`, 'float'], [`"${n}"`, 'str'], [`${f}.5`, 'float'], [`True`, 'bool'], [`False`, 'bool'], [`'hello'`, 'str'],
        [`${n * 2} / 2`, 'float'], [`${n} // 2`, 'int'], [`int("${n}")`, 'int'], [`str(${n})`, 'str'], [`float(${n})`, 'float'], [`${n} > ${f}`, 'bool']];
      const [val, right] = rng.pick(V);
      return { t: 'mcq', d: 2, o: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"], a: ['int', 'float', 'str', 'bool'].indexOf(right),
        q: 'What is the output?', code: `x = ${val}\nprint(type(x))`, ex: `${val} is a${right === 'int' ? 'n' : ''} ${right}. ${right === 'float' && val.includes('/') ? 'The / operator always gives a float.' : right === 'str' ? 'Anything inside quotes, or made with str(), is a string.' : right === 'bool' ? 'Comparisons and True/False are booleans.' : ''}` };
    }
  },
  'py-output-arith': {
    c: 'g-py-arith', label: 'Python operators and expressions',
    make(rng) {
      const kind = rng.int(0, 4); let code, out, ex, wrongs;
      if (kind === 0) {
        const a = rng.int(11, 60), b = rng.int(2, 9);
        code = `a = ${a}\nb = ${b}\nprint(a // b, a % b)`; out = `${floorDiv(a, b)} ${pyMod(a, b)}`;
        wrongs = [`${pyFloat(+(a / b).toFixed(4))} ${pyMod(a, b)}`, `${pyMod(a, b)} ${floorDiv(a, b)}`, `${floorDiv(a, b) + 1} ${pyMod(a, b)}`];
        ex = `// is floor division (${a} // ${b} = ${floorDiv(a, b)}) and % gives the remainder (${a} % ${b} = ${pyMod(a, b)}).`;
      } else if (kind === 1) {
        const a = rng.int(2, 9), b = rng.int(2, 9), c = rng.int(2, 9);
        code = `print(${a} + ${b} * ${c})`; out = String(a + b * c); wrongs = [String((a + b) * c), String(a + b + c), String(a * b + c)];
        ex = `Multiplication happens before addition: ${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${a + b * c}.`;
      } else if (kind === 2) {
        const a = rng.int(2, 5), b = rng.int(2, 3);
        code = `x = ${a}\nprint(x ** ${b})`; out = String(a ** b); wrongs = [String(a * b), String(a + b), String(a ** b + 1)];
        ex = `** is "to the power of": ${a}${b === 2 ? '²' : '³'} = ${a ** b}.`;
      } else if (kind === 3) {
        const b = rng.pick([2, 4, 5]), q = rng.int(2, 9) + rng.pick([0, 0.5, 0.25, 0.2].filter(fr => Number.isInteger(fr * b)));
        const a = q * b;
        code = `print(${a} / ${b})`; out = pyFloat(a / b); wrongs = uniq([String(Math.floor(a / b)), pyFloat(Math.floor(a / b)), String(a % b), pyFloat(a / b + 1)]).filter(w => w !== out);
        ex = `/ always gives a float in Python 3: ${a} / ${b} = ${out}.`;
      } else {
        const a = rng.int(2, 9), b = rng.int(2, 9);
        code = `x = "${a}"\ny = "${b}"\nprint(x + y)`; out = `${a}${b}`; wrongs = uniq([String(a + b), `${a} ${b}`, `${b}${a}`]).filter(w => w !== out);
        ex = `x and y are strings, so + joins them: "${a}" + "${b}" = "${a}${b}".`;
      }
      return { ...mcq(rng, out, rng.shuffle(wrongs)), d: 2, q: 'What is the output?', code, ex };
    }
  },
  'py-output-cond': {
    c: 'g-py-cond', label: 'if, elif and else',
    make(rng) {
      const t1 = rng.pick([40, 50, 60]), t2 = t1 + rng.pick([20, 25, 30]), m = rng.int(20, 99);
      const msg = m >= t2 ? 'Excellent' : m >= t1 ? 'Pass' : 'Try again';
      const code = `marks = ${m}\nif marks >= ${t2}:\n    print("Excellent")\nelif marks >= ${t1}:\n    print("Pass")\nelse:\n    print("Try again")`;
      const opts = ['Excellent', 'Pass', 'Try again', 'Excellent\nPass'];
      return { ...mcq(rng, msg, rng.shuffle(opts.filter(x => x !== msg))), d: 2, q: 'What is the output?', code,
        ex: `Python checks conditions top to bottom and runs only the first true branch. ${m} ${m >= t2 ? `≥ ${t2}` : m >= t1 ? `< ${t2} but ≥ ${t1}` : `< ${t1}`}, so it prints ${msg}.` };
    }
  },
  'py-output-loop': {
    c: 'g-py-loop', label: 'Loops with for and while',
    make(rng) {
      const kind = rng.int(0, 2); let code, out, wrongs, ex;
      if (kind === 0) {
        const a = rng.int(1, 4), b = rng.int(5, 9);
        let s = 0; for (let i = a; i < b; i++) s += i;
        code = `total = 0\nfor i in range(${a}, ${b}):\n    total = total + i\nprint(total)`; out = String(s);
        wrongs = uniq([String(s + b), String(s - a), String(s + b - a)]).filter(w => w !== out);
        ex = `range(${a}, ${b}) gives ${Array.from({ length: b - a }, (_, k) => a + k).join(', ')} — it stops before ${b}. Their sum is ${s}.`;
      } else if (kind === 1) {
        const n = rng.int(3, 6), st = rng.pick([2, 3]);
        const vals = []; for (let i = 0; i < n * st; i += st) vals.push(i);
        code = `for i in range(0, ${n * st}, ${st}):\n    print(i, end=" ")`; out = vals.join(' ');
        wrongs = uniq([vals.concat(n * st).join(' '), vals.slice(1).join(' '), Array.from({ length: n }, (_, k) => k).join(' ')]).filter(w => w !== out);
        ex = `range(0, ${n * st}, ${st}) starts at 0, adds ${st} each time, and stops before ${n * st}: ${out}.`;
      } else {
        const x = rng.int(1, 3), lim = rng.pick([20, 30, 50, 100]);
        let v = x, c = 0; while (v < lim) { v *= 2; c++; }
        code = `x = ${x}\ncount = 0\nwhile x < ${lim}:\n    x = x * 2\n    count = count + 1\nprint(count, x)`; out = `${c} ${v}`;
        wrongs = uniq([`${c - 1} ${v / 2}`, `${c + 1} ${v * 2}`, `${c} ${v / 2}`]).filter(w => w !== out);
        ex = `x doubles until it is no longer less than ${lim}: that takes ${c} loops and ends with x = ${v}.`;
      }
      return { ...mcq(rng, out, rng.shuffle(wrongs)), d: 2, q: 'What is the output?', code, ex };
    }
  },
  'py-output-list': {
    c: 'g-py-list', label: 'Working with lists',
    make(rng) {
      const base = rng.sample([3, 5, 7, 8, 11, 12, 14, 15, 19, 21, 24, 30], 5);
      const kind = rng.int(0, 4); let code, out, wrongs, ex;
      const L = pyRepr(base);
      if (kind === 0) { const i = rng.int(1, 3); code = `nums = ${L}\nprint(nums[${i}], nums[-1])`; out = `${base[i]} ${base[4]}`; wrongs = uniq([`${base[i - 1]} ${base[4]}`, `${base[i]} ${base[0]}`, `${base[i + 1]} ${base[3]}`]).filter(w => w !== out); ex = `Indexes start at 0, so nums[${i}] is ${base[i]}; nums[-1] is the last item, ${base[4]}.`; }
      else if (kind === 1) { const a = rng.int(0, 2), b = a + rng.int(2, 3); code = `nums = ${L}\nprint(nums[${a}:${b}])`; out = pyRepr(base.slice(a, b)); wrongs = uniq([pyRepr(base.slice(a, b + 1)), pyRepr(base.slice(a + 1, b + 1)), pyRepr(base.slice(a + 1, b))]).filter(w => w !== out); ex = `A slice [${a}:${b}] starts at index ${a} and stops before index ${b}: ${out}.`; }
      else if (kind === 2) { const v = rng.int(40, 60); const r = base.concat(v); code = `nums = ${L}\nnums.append(${v})\nprint(len(nums), nums[-1])`; out = `6 ${v}`; wrongs = [`5 ${v}`, `6 ${base[4]}`, `5 ${base[4]}`]; ex = `append adds ${v} to the end, so the list now has ${r.length} items and the last one is ${v}.`; }
      else if (kind === 3) { const s = base.slice().sort((a, b) => a - b); code = `nums = ${L}\nnums.sort()\nprint(nums[0], nums[-1])`; out = `${s[0]} ${s[4]}`; wrongs = uniq([`${base[0]} ${base[4]}`, `${s[4]} ${s[0]}`, `${s[1]} ${s[3]}`]).filter(w => w !== out); ex = `sort() arranges the list in ascending order: ${pyRepr(s)}. First is ${s[0]}, last is ${s[4]}.`; }
      else { const r = base.slice(); const popped = r.splice(1, 1)[0]; code = `nums = ${L}\nx = nums.pop(1)\nprint(x, nums)`; out = `${popped} ${pyRepr(r)}`; wrongs = uniq([`${base[0]} ${pyRepr(base.slice(1))}`, `${popped} ${L}`, `${base[2]} ${pyRepr(base.filter((_, k) => k !== 2))}`]).filter(w => w !== out); ex = `pop(1) removes and returns the item at index 1 (${popped}), leaving ${pyRepr(r)}.`; }
      return { ...mcq(rng, out, rng.shuffle(wrongs)), d: 2, q: 'What is the output?', code, ex };
    }
  }
};

export function makeGen(id, rng) {
  const g = GENS[id]; if (!g) return null;
  const it = g.make(rng);
  return { ...it, c: g.c, gen: id };
}
export function genLabel(tag) { const g = Object.values(GENS).find(x => x.c === tag); return g ? g.label : null; }
export function genTags() { return Object.fromEntries(Object.values(GENS).map(g => [g.c, g.label])); }
