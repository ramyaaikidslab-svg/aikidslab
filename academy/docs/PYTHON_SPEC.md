# Python exercises — specification

File: `academy/js/py/exercises.js` → `export default [ ...exercises ]`.
Learners write code in the browser (real Python 3 via Pyodide). The app grades by running the learner's code
and the reference `solution` on the same inputs and comparing output — so **expected output never has to be
typed by hand** and can't be wrong as long as the solution is right. `tools/check_exercises.py` runs every
solution with CPython to prove it works.

## Schema

```js
{
  id: 'py-sq7',                     // unique, 'py-' prefix, kebab-case
  topic: 'u5-02',                   // topic whose `code` step uses it
  practical: 'PRINT',               // CBSE practical list group if it is a syllabus program: PRINT | INPUT | LIST | IF-FOR-WHILE; omit otherwise
  title: 'Square of 7',
  task: `<p>Print the square of 7.</p>`,      // HTML (same vocabulary as cards). Say exactly what to print.
  starter: `# Find the square of 7\nnumber = 7\n`,   // optional starting code
  tests: [ { inputs: [] } ],        // one entry per run; inputs = strings fed to input() in order
  match: 'exact',                   // 'exact' (default): output must equal the solution's output (trailing spaces ignored)
                                    // 'numbers': the numbers printed must match in order (text around them may differ)
                                    // 'lines': same number of non-empty lines as the solution (for free-text output like personal info)
  need: { calls: ['print'], nodes: ['For'], methods: ['append'] },   // constructs the learner must use (Python ast names)
  forbid: { calls: ['sorted'] },    // optional
  hints: ['Use the ** operator', 'print(number ** 2)'],              // 2–3, progressively more specific
  solution: `number = 7\nprint(number ** 2)\n`,
  params: { n: [3, 9] }             // optional per-learner integers, substituted as {{n}} in task/starter/solution/inputs
}
```

`nodes` use Python `ast` class names: `For`, `While`, `If`, `List`, `Subscript`, `Slice`, `BinOp`, `Compare`, `BoolOp`, `AugAssign`.
`calls` are plain function names (`print`, `input`, `int`, `float`, `len`, `range`, `sum`); `methods` are attribute calls (`append`, `remove`, `pop`, `insert`, `extend`, `sort`).

## Rules

1. Every program in the CBSE "Suggested Program List" (Part C) must exist exactly once with the matching `practical` group (see list below), on the topic where it fits best.
2. Add **extra** exercises so each Python topic has 4–8 `code` steps, building from easy to harder. Use `params` for some extras so different learners get different numbers.
3. Inputs in tests must be strings. Use 2–3 tests for programs with input so hard-coding fails (e.g. positive, negative, zero).
4. Solutions use only what Class 9 has learned by that topic; plain style; no f-string format specs beyond `{x}`; no imports.
5. When output contains floats, make the expected value unambiguous (e.g. ask to `round(x, 2)` or print as given) and prefer `match: 'numbers'`.
6. Personal info / patterns: patterns use `match: 'exact'` and the exact pattern from the syllabus; personal info uses `match: 'lines'` with `need.calls: ['print']`.

## CBSE Suggested Program List (all must be covered)

PRINT: personal information (name, father's name, class, school); the two star patterns (increasing 1–5 stars, decreasing 5–1, stars separated by a space as shown: `* * *`); square of 7; sum of 15 and 20; km → metres; table of 5 up to five terms; simple interest with principal_amount = 2000, rate_of_interest = 4.5, time = 10.

INPUT: area and perimeter of a rectangle; area of a triangle (base, height); average marks of 3 subjects; discounted amount with discount %; surface area and volume of a cuboid.

LIST: science-quiz list (Arjun, Sonakshi, Vikram, Sandhya, Sonal, Isha, Kartik) → print, delete "Vikram", add "Jay" at end, remove item at second position; `num = [23,12,5,9,65,44]` → length, elements second to fourth (positive indexing), third to fifth (negative indexing); first 10 even numbers, add 1 to each, print; `List_1 = [10,20,30,40]` extend with `[14,15,12]`, sort ascending, print.

IF-FOR-WHILE: check if a person can vote; grade of a student; positive/negative/zero; first 10 natural numbers; first 10 even numbers; odd numbers from 1 to n; sum of first 10 natural numbers; sum of all numbers stored in a list.
