# AI Kids Lab Academy

An interactive web app for **CBSE Artificial Intelligence (417), Class IX, Part B — Subject Specific Skills**.
Static files only (works on GitHub Pages); no build step; no AI/LLM calls at runtime.

Live path: `/academy/` (e.g. `https://www.aikidslab.co/academy/`).

## What learners get
- **39 topics**: 35 across the five Part B units plus 4 hands-on capstone projects (≈ 50 hours of estimated active time).
- Lesson cards, quick checks, **34 interactive labs**, practice, and a **mastery check** per topic (80% to pass).
- **Real Python in the browser** (self-hosted Pyodide) with auto-graded exercises, including every program in the CBSE practical list, and a downloadable Practical File PDF.
- **Unique questions per learner**: selections, option order and numbers are seeded from the learner's email, and 14 generators create fresh numeric/code questions.
- **Mistake tracking + Mistake Gym**: every wrong answer is logged by concept and comes back as a *different* question after 10 minutes, then 1, 3 and 7 days (spaced repetition) until fixed.
- **Certificates** for every topic, every unit and the course (PNG/PDF download, verifiable ID).
- Resume exactly where you left off (step-level), on any device when the Sheets backend is on.

## Accounts and data
Sign-in is **email + 4-digit PIN** (name, school, section collected at sign-up).
- **Device-only mode** (default, `BACKEND_URL` empty in `js/config.js`): accounts/progress in the browser.
- **Google Sheets mode**: follow `backend/SETUP.md` (≈ 5 minutes). Names, emails, progress summaries, logins and certificates land in a Google Sheet you own. `Settings → ACCESS_MODE = allowlist` restricts sign-ups to the emails in the `Allowlist` tab.

## Layout
```
index.html, verify.html      app shell, certificate checker
css/app.css                  design system
js/app.js                    boot, top bar, router
js/config.js                 BACKEND_URL and settings
js/core/                     store (state+backends), auth, course, questions, learn (practice/quiz/gym),
                             player, code (Python step), python + py-worker (Pyodide), cert, charts, views, util, rng, pdf
js/content/u1..u5.js, cp.js  course content (unit 1 split into parts/)
js/py/exercises*.js          Python exercises (solutions are the answer key)
js/gens/index.js             question generators
js/labs/*.js                 interactive labs (see docs/LAB_SPEC.md)
vendor/                      Pyodide, jsPDF, CodeMirror (self-hosted)
backend/Code.gs, SETUP.md    Google Apps Script backend
docs/                        CONTENT_SPEC, LAB_SPEC, PYTHON_SPEC
tools/                       validators and tests
```

## Quality checks (run before every release)
```bash
cd academy
node tools/validate.mjs            # every unit: schema, answer keys, Python outputs executed with CPython
python3 tools/check_exercises.py   # every Python exercise solution runs; required constructs present
node tools/check_gens.mjs 1500     # generators: options distinct, Python answers match CPython
node tools/mock-sheets.mjs test    # backend logic against a fake Google Sheet
```
Labs can be tried one at a time: `tools/labtest.html?lab=<id>` via a local server (`python3 -m http.server` from the repo root).

## Editing content
Edit `js/content/*.js` following `docs/CONTENT_SPEC.md`, then run the validator. Item ids must stay stable
(they're stored in learners' progress). Add questions freely; to retire one, remove it — old references are ignored.
