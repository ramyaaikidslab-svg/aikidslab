# AI Kids Lab Academy — Content Specification

Course: **CBSE Artificial Intelligence (Subject Code 417), Class IX, Session 2026–27, Part B — Subject Specific Skills.**
Audience: Grade 9 students (age 14–15), Indian schools, mixed ability. Total learner time target: **40–50 hours**.

This document is the single source of truth for every content file. Follow it exactly. The app engine
validates content against it (`academy/tools/validate.mjs`) and refuses malformed items.

---

## 1. File format

Each unit is one ES module in `academy/js/content/`:

```js
// academy/js/content/u1.js
export default {
  id: 'u1',
  title: 'AI Reflection, Project Cycle and Ethics',
  short: 'AI Reflection',
  color: 'gold',            // one of: gold, blue, coral, green, violet, teal
  syllabus: 'Unit 1 · 30 h theory + 25 h practical in the CBSE plan',
  topics: [ /* topic objects, in teaching order */ ]
};
```

Use plain JavaScript object literals. Use backtick template strings for HTML. No imports, no functions
inside content files (generators live in `academy/js/gens/`). Escape backticks inside template strings.
Use straight quotes in code; typographic apostrophes (’) are fine in prose.

## 2. Topic object

```js
{
  id: 'u1-01',                       // fixed, see plan below
  title: 'What is AI?',
  minutes: 75,                       // estimated active learner time incl. practice + quiz
  outcomes: ['Identify and appreciate AI and describe its applications in daily life'], // copied/paraphrased from the CBSE learning outcomes
  hook: 'One sentence that makes a 14-year-old want to start.',
  concepts: {                        // concept tag -> short learner-facing label (used in Mistake Gym)
    'ai-def': 'What makes a machine "AI"',
    'ai-vs-rules': 'AI vs fixed-rule machines'
  },
  steps: [ /* see §3 */ ],
  pool: [ /* question items, see §4 */ ],
  gens: ['optional-generator-id']    // only ids listed in §7
}
```

## 3. Steps (the lesson, in order)

| kind | fields | purpose |
|---|---|---|
| `card` | `title`, `html` | Teach one idea. 60–170 words of HTML. One idea per card. |
| `check` | `concepts: [tags]`, `n` (1–3) | Quick understanding check drawn from the pool items with those concept tags. Place after the card(s) that teach those concepts. |
| `lab` | `lab: 'lab-id'`, `title`, `intro` (1–2 sentences) | Interactive lab (built by engineering). Only use lab ids listed for that topic in §8. |
| `code` | `ex: 'exercise-id'` | Python exercise (Unit 5 and capstone only). |
| `practice` | `n` (6–10) | Adaptive practice from the whole pool + generators. Wrong answers come back as variants. |
| `quiz` | `n` (10, or 12 for big topics), `pass: 0.8` | Mastery check. Passing completes the topic and unlocks its certificate. Must be the last step. |

Every topic: 6–12 `card` steps, 2–4 `check` steps spread between cards, its labs, one `practice`, one `quiz` (last).
Capstone topics may replace practice/quiz with project steps (see §8, CP).

## 4. Question items (`pool`)

Every item has: `id`, `c` (concept tag present in topic `concepts`), `t` (type), `d` (difficulty 1–3), `q` (stem, HTML allowed), `ex` (explanation shown after answering, 1–3 sentences, always explains WHY the right answer is right).

| `t` | extra fields | notes |
|---|---|---|
| `mcq` | `o: [4 strings]`, `a: index`, optional `mis: {index: 'feedback'}` | Exactly 4 options. One unambiguously correct. Options are shuffled at runtime, so never write "all of the above", "both A and B", "none of these". |
| `multi` | `o: [4–6 strings]`, `a: [indices]` | "Select all that apply." 2–4 correct. Stem must say "Select all that apply." |
| `tf` | `a: true|false` | Statement in `q`. |
| `order` | `items: [strings in correct order]` | 3–6 items. Stem says what to order. |
| `match` | `pairs: [[left, right], ...]` | 3–5 pairs, rights all distinct. |
| `bins` | `bins: [2–3 labels]`, `items: [[text, binIndex], ...]` | 4–8 items. Every bin used at least once. |
| `num` | `a: number`, optional `tol` (default 0), optional `unit` | Numeric answer. State rounding in the stem if needed ("to 1 decimal place"). |

Optional on any item: `code` (Python source shown in a code block under the stem; for "what is the output" items the correct option must be EXACTLY what CPython 3 prints — the validator executes it).

**Difficulty mix per pool:** about 30% `d:1` (recall/define), 45% `d:2` (understand/apply to a familiar case), 25% `d:3` (apply to a new real-world scenario / analyse / spot the error). Application-level items are scenarios from Indian daily life, schools, farms, cities, hospitals, cricket, festivals, transport, UPI, etc.

**Pool size:** at least **30 items** per theory topic (Units 1–4), at least **24** per Python topic. Each concept tag must have **at least 3 items** (so the Mistake Gym can ask a *different* question on the same idea). Type mix per pool: ≥ 55% `mcq`, plus at least 2 each of `tf`, `multi`, and at least 3 drawn from `order`/`match`/`bins`.

**Item ids:** `<topicId>-q<2 digits>`, e.g. `u1-01-q07`. Unique across the course.

**Misconceptions (`mis`)**: for mcq items, give targeted feedback for the most tempting wrong options (at least 1 per d:2/d:3 item). Feedback names the misunderstanding kindly: "Not quite — a timer follows a fixed rule; it never learns from data."

**Quality rules (non-negotiable):**
1. Factually correct and consistent with the CBSE 417 Class IX handbook terminology (see §6). When in doubt, use the handbook's wording.
2. One clearly correct answer. Distractors plausible but definitely wrong. No trick wording, no double negatives.
3. Options similar in length and grammar; the right answer must not be the longest by habit.
4. No "all/none of the above", no "both".
5. Age-appropriate, inclusive, no stereotypes, Indian names and contexts welcome (Riya, Arjun, Meera, Kabir, Ayaan, Sana, Diya, Rohan …).
6. Do not invent statistics, laws or quotes. Real products may be named (Google Maps, YouTube, Alexa, Google Translate, ChatGPT, Gemini, DALL·E, Bhashini, DigiYatra, UPI) only with accurate claims.
7. British/Indian spelling (colour, visualise, programme for TV but "program" for code).

## 5. Card HTML vocabulary

Allowed tags: `p, b, i, em, strong, ul, ol, li, br, code, pre, table, thead, tbody, tr, th, td, h4, span, div, sup, sub, small`.
Allowed classes (the design system styles these — do not use inline styles):

```html
<div class="key"><b>Key idea</b> One-sentence takeaway.</div>
<div class="def"><dfn>Data literacy</dfn> The ability to read, understand, work with and communicate data.</div>
<div class="eg"><b>Example</b> …</div>
<div class="warn"><b>Careful</b> …</div>
<div class="cols"><div class="mini"><h4>Title</h4><p>…</p></div> … </div>   <!-- 2–4 minis -->
<ol class="flow"><li><b>Stage</b><span>what happens</span></li> … </ol>   <!-- process / pipeline -->
<div class="formula">Probability = favourable outcomes ÷ total outcomes</div>
<table class="tbl"> … </table>
<span class="tag data">Data</span> <span class="tag cv">Computer Vision</span> <span class="tag nlp">NLP</span>
<pre class="code">print("Hello")</pre>
```

Emoji are allowed sparingly (max 1 per `mini` heading) — the brand style uses them for friendliness. Write in second person ("you"), short sentences, concrete examples first, then the term.

## 6. Verified facts (use this wording)

- **AI domains (CBSE):** Data / Statistical Data (works with numbers & tables), Computer Vision (images & video), Natural Language Processing (text & speech). The AI Game: Rock, Paper & Scissors (Data), Semantris (NLP), Quick, Draw! (CV).
- **AI Project Cycle — 6 stages in order:** Problem Scoping → Data Acquisition → Data Exploration → Modelling → Evaluation → Deployment.
- **4Ws Problem Canvas:** Who (stakeholders), What (the problem/need and evidence it exists), Where (context/situation/location where it occurs), Why (value of solving it / how the solution improves things).
- **Problem Statement Template:** "Our [stakeholder(s)] **has/have a problem that** [issue/problem/need] **when/while** [context/situation]. **An ideal solution would** [benefit of the solution for them]."
- **Data Acquisition:** collecting accurate, reliable, relevant data. Sources: surveys, web scraping, sensors, cameras, observations, APIs (Application Programming Interfaces), interviews, documents/records. Training data teaches the model; testing data checks it on unseen examples. Data features = the attributes/variables that describe the data and affect the problem.
- **System Map:** shows elements of a system and the relationships between them; arrows show direction; a `+` sign means a direct relationship (both increase/decrease together); a `−` sign means an inverse relationship (one increases while the other decreases). Loops can form.
- **Data Exploration / Visualisation:** visualising data helps spot trends, patterns, relationships and outliers quickly. Graph types: bar (compare categories), line (change over time), pie (parts of a whole), scatter (relationship between two numeric variables), histogram (distribution of one numeric variable), plus others listed in the Data Viz Catalogue (area, bubble, heat map, flow chart, etc.).
- **Modelling:** a model is the algorithm/program that turns input data into an output. **Rule-based approach:** the developer defines the rules/relationships; the machine follows them (e.g. decision tree, if-else rules); it cannot improve on its own. **Learning-based approach:** the machine is given data (examples) and learns the patterns/rules itself; it can adapt to new data. (Class 9 keeps to these two; do not teach supervised/unsupervised/reinforcement taxonomy beyond a single optional mention.)
- **Decision tree:** rule-based model; root node (first question), branches (answers), internal nodes, leaf nodes (final decision).
- **Evaluation:** compare predictions with reality. True Positive (predicted yes, actually yes), True Negative (predicted no, actually no), False Positive (predicted yes, actually no), False Negative (predicted no, actually yes). Confusion matrix arranges these four. Accuracy = (TP + TN) ÷ (TP + TN + FP + FN) × 100%. Which error is worse depends on the problem (missing a disease = FN is dangerous; spam filter FP hides a real email).
- **Deployment:** putting the evaluated model into real use, integrated into a product/system, monitored and improved. Case study **Preventable Blindness**: diabetic retinopathy can cause blindness if not detected early; India has too few eye specialists for the number of diabetic patients; Google (with Verily) trained a deep-learning model on about 128,000 retinal images graded by ophthalmologists; it was deployed with Aravind Eye Hospital (Madurai) to screen retina photos so that doctors could focus on patients who need treatment. Keep claims to these facts.
- **AI Ethics:** moral principles guiding how AI is designed and used. Key concerns: human rights, bias & fairness, privacy, inclusion/access, transparency, accountability, safety. **Moral Machine** (MIT) poses self-driving-car dilemmas to show that ethical choices are hard and that people disagree.
- **AI Bias:** unfair outcomes because training data or design reflects human prejudice or leaves groups out (e.g. voice assistants defaulting to female voices; face recognition trained mostly on one skin tone; hiring tool trained on past biased decisions). **AI Access:** the digital divide — unequal access to devices, internet, data and AI skills; AI can widen gaps in employment, education and income if access is unequal.
- **Data literacy:** the ability to find, read, understand, evaluate, use and communicate data. **Data Literacy Process Framework (iterative):** 1 Plan (set the goal and strategy) → 2 Communicate (explain the purpose to all stakeholders) → 3 Assess (check the current level of data understanding) → 4 Develop Culture (build data skills into everyday work and learning) → 5 Prescriptive Learning (provide learning resources suited to each learner) → 6 Evaluate (measure progress regularly, then repeat).
- **Data privacy vs data security:** Privacy = the right of people to control how their personal data is collected, used and shared (who is allowed to see/use it). Security = the protections (passwords, encryption, firewalls, access control, backups) that keep data safe from unauthorised access, theft or damage. Privacy is about *proper use*; security is about *protection*. Risks: data breaches, unauthorised access, phishing, malware, identity theft. Best practices: strong unique passwords/passphrases, two-factor authentication, don't share OTPs/passwords, think before clicking links, update software, use antivirus, avoid sensitive work on public Wi-Fi, check app permissions, back up data, log out on shared devices.
- **Types of data:** Qualitative (descriptive, non-numerical: nominal — categories without order e.g. blood group; ordinal — ordered categories e.g. ratings, grades) and Quantitative (numerical: discrete — countable whole numbers e.g. number of students; continuous — measurable, can take decimals e.g. height, temperature). Also by form: textual, numeric, image, audio, video; structured (rows/columns) vs unstructured (photos, free text). Primary data (collected first-hand) vs secondary data (already collected by others).
- **Data preprocessing:** data cleaning (handle missing values, remove duplicates, fix errors/inconsistent formats, deal with outliers), data transformation (scaling/normalisation, encoding categories, unit conversion), data reduction (remove irrelevant features/records), data integration (combine data from several sources).
- **Data interpretation:** reviewing data to draw meaningful conclusions. Methods: qualitative interpretation (themes in non-numerical data) and quantitative interpretation (statistics on numerical data — mean, median, mode, trends). Types (forms of presentation): textual, tabular, graphical. Importance: informed decisions, spotting trends, predicting, saving cost/time, identifying needs.
- **Trend analysis:** looking at data over time to identify upward, downward, seasonal or stable patterns.
- **Dashboards:** interactive collection of charts/KPIs on one screen with filters; tools: Tableau (Tableau Public), Datawrapper, Google Sheets/Looker Studio, Excel.
- **Math for AI:** Statistics (collect, organise, analyse, interpret data), Linear Algebra (vectors/matrices — images are grids/matrices of numbers), Probability (measuring uncertainty/likelihood of outcomes), Calculus (how things change; used to optimise/train models).
- **Statistics:** science of collecting, organising, analysing, interpreting and presenting data. Applications: disaster management, sports, disease prediction, weather forecasting. Mean = sum ÷ count; Median = middle value of ordered data (average of two middle values if even count); Mode = most frequent value; Range = max − min.
- **Probability:** P(E) = number of favourable outcomes ÷ total number of possible outcomes (equally likely). 0 ≤ P ≤ 1. Types of events: sure/certain (P = 1), impossible (P = 0), likely (more than ½), unlikely (less than ½), equally likely (each outcome has the same chance / P = ½ for two outcomes). Complement: P(not E) = 1 − P(E). Applications: sports (win chances, strategy), weather forecast ("70% chance of rain"), traffic estimation (travel-time apps).
- **Generative AI:** AI that creates new content (text, images, audio, video, code) by learning patterns from large amounts of existing data. **Conventional (traditional) AI** analyses, classifies or predicts from data (e.g. spam filter, recommendation) — it does not create new content. Types/models: GANs (Generative Adversarial Networks — a generator creates samples and a discriminator judges real vs fake; they improve by competing), VAEs (Variational Autoencoders — learn a compressed representation and sample from it), RNNs/Transformers/large language models (generate sequences such as text, one token at a time), diffusion models (turn noise into an image step by step). Examples: ChatGPT, Gemini (text), DALL·E, Midjourney, Adobe Firefly (images), music/voice generators. **GAN Paint** (MIT-IBM): paint objects such as trees, grass, doors, sky onto a photo and the GAN draws them realistically.
- **GenAI benefits:** creativity support, speed, personalised learning, accessibility (e.g. text-to-speech, translation), prototyping. **Limitations:** hallucinations (confident but false output), bias from training data, no true understanding, copyright/ownership questions, deepfakes/misinformation, privacy risks, high energy use, over-dependence. **Ethics:** disclose AI use, don't pass off AI work as your own, verify facts, respect consent and copyright, never create deepfakes of real people, protect personal data.
- **Python (Unit 5):** variables, arithmetic operators (+ − * / // % **), expressions, comparison operators (== != > < >= <=), logical operators (and or not), assignment operators (= += −= *= /=), data types (int, float, str, bool), type conversion (int(), float(), str()), print(), input() (always returns a string), if/elif/else, for with range(), while, lists (create, index from 0, negative index, slicing, len, append, insert, extend, remove, pop, del, sort, sum/min/max).

## 7. Generators available (`gens`)

Ids the engine implements (topics may list any that fit):

- `conf-matrix` (u1-08) — random TP/FP/TN/FN counts → accuracy / count questions.
- `accuracy-calc` (u1-08)
- `chart-pick` (u1-06, u2-07) — scenario → best chart type.
- `data-type` (u2-03) — random variable → nominal/ordinal/discrete/continuous.
- `mean-median-mode` (u3-02) — random small data set → mean/median/mode/range.
- `number-pattern` (u3-01) — arithmetic/geometric/square/fibonacci-like sequence → missing number.
- `prob-basic` (u3-04) — dice/coins/bags/cards (no face-card trivia) → probability fraction/decimal.
- `event-type` (u3-04) — event → sure/impossible/likely/unlikely/equally likely.
- `prob-complement` (u3-05)
- `py-output-arith` (u5-03) — expression with random ints → output.
- `py-output-cond` (u5-04)
- `py-output-loop` (u5-05)
- `py-output-list` (u5-06)
- `py-type` (u5-02, u5-03) — value → int/float/str/bool.

## 8. Topic plan (ids, titles, minutes, labs)

Minutes include practice and mastery quiz. Lab ids in **bold** must appear as `lab` steps in that topic.

### Unit 1 — AI Reflection, Project Cycle and Ethics (`u1`, color gold)
| id | title | min | labs | must cover |
|---|---|---|---|---|
| u1-01 | What is AI? | 75 | **smart-home** | intelligence; AI = machines that learn from data to make decisions/predictions; AI vs fixed-rule automation; how AI learns (data → patterns → predictions → feedback); AI in daily life (phones, maps, OTT, banking, health, farming, transport); LUIS-style smart home: a statement → intent + entity → action |
| u1-02 | The Three Domains of AI | 90 | **rps**, **quickdraw**, **semantris** | Data/Statistical Data, CV, NLP; the AI Game; real applications per domain; sorting applications into domains; systems that combine domains |
| u1-03 | The AI Project Cycle | 50 | — | six stages in order, purpose of each, iterative nature, mapping activities to stages |
| u1-04 | Problem Scoping and the 4Ws | 100 | **four-ws** | themes → topics → problem; SDGs as themes (17 goals); 4Ws canvas; stakeholders; current actions; ethics of the goal; problem statement template; iterative scoping |
| u1-05 | Data Acquisition and System Maps | 100 | **system-map** | data, training vs testing data; data features; sources; reliable & authentic data; how often to collect; not enough data; system maps (+/− relations, loops); data & analysis questions from the syllabus |
| u1-06 | Data Exploration and Visualisation | 90 | **chart-chooser** | why visualise; graph types and when to use them; Data Viz Catalogue; Top 10 Song Prediction features; spreadsheets for charts |
| u1-07 | Modelling: Rule-based vs Learning-based | 90 | **decision-tree**, **learn-by-example** | what a model is; rule-based (incl. decision trees) with pros/cons; learning-based with pros/cons; choosing an approach |
| u1-08 | Evaluation: TP, FP, TN, FN | 80 | **confusion-matrix** | why evaluate; testing data; the four outcomes; confusion matrix; accuracy; which error is worse in context |
| u1-09 | Deployment and the Preventable Blindness Case | 70 | **cycle-walk** | what deployment means; deployment methods (app, website, device/edge, integrated into hospital systems); monitoring & feedback; Preventable Blindness case through all 6 stages; Personalised Education AI walk-through |
| u1-10 | AI Ethics and the Moral Machine | 80 | **moral-machine** | ethics definition; principles; stakeholders & role-play; dilemmas; transparency, accountability, privacy |
| u1-11 | AI Bias, AI Access and the Balloon Debate | 80 | **bias-lab**, **balloon-debate** | sources of bias; examples; reducing bias; AI access & digital divide; advantages and disadvantages of AI |

### Unit 2 — Data Literacy (`u2`, color blue)
| id | title | min | labs | must cover |
|---|---|---|---|---|
| u2-01 | Basics of Data Literacy | 70 | **misleading-chart** | definition; importance; impact (informed decisions, critical thinking); how to become data literate; Data Literacy Process Framework (6 steps, iterative); Impact of News Articles activity |
| u2-02 | Data Privacy and Cyber Security | 80 | **password-meter**, **phishing-spotter** | privacy vs security; relation to AI; breaches & unauthorised access; best practices for cyber security |
| u2-03 | Types of Data | 70 | — | qualitative (nominal, ordinal) vs quantitative (discrete, continuous); textual/numeric/image/audio/video; structured vs unstructured; primary vs secondary |
| u2-04 | Acquiring Data | 60 | — | methods (surveys, interviews, observation, sensors, cameras, web scraping, APIs, existing records/open data e.g. data.gov.in); best practices (relevance, accuracy, consent, ethics, documentation, enough data, reliable sources) |
| u2-05 | Data Features and Preprocessing | 90 | **data-cleaner** | features (input variables) and labels; preprocessing steps (cleaning, transformation, reduction, integration); missing values, duplicates, outliers, inconsistent units; garbage in, garbage out |
| u2-06 | Data Interpretation and Trend Analysis | 80 | **trend-reader** | definition; methods (qualitative, quantitative); types (textual, tabular, graphical); importance; trend analysis |
| u2-07 | Data Visualisation and Interactive Dashboards | 100 | **dashboard-builder** | importance of visualisation; methods; dashboards; KPIs & filters; Tableau and Datawrapper; telling a story with data; good vs misleading design |

### Unit 3 — Math for AI (Statistics & Probability) (`u3`, color coral)
| id | title | min | labs | must cover |
|---|---|---|---|---|
| u3-01 | Why Math Matters for AI | 60 | **number-patterns**, **picture-analogy** | patterns in numbers and images; statistics, linear algebra, probability, calculus in AI; images as number grids |
| u3-02 | Statistics in Real Life | 90 | **stats-explorer** | definition; applications (disaster management, sports, disease prediction, weather forecast); mean, median, mode, range; choosing a measure |
| u3-03 | Car Spotting and Tabulating | 50 | **car-spotting** | data collection, tally marks, frequency tables, interpreting the table, link to AI |
| u3-04 | Probability and Types of Events | 80 | **probability-sim** | chance; experiments/outcomes; formula; 0–1 scale; sure, impossible, likely, unlikely, equally likely; experimental vs theoretical |
| u3-05 | Probability in Sports, Weather and Traffic | 60 | — | applications; complement; reading forecasts; revision |

### Unit 4 — Introduction to Generative AI (`u4`, color violet)
| id | title | min | labs | must cover |
|---|---|---|---|---|
| u4-01 | What is Generative AI? | 60 | **real-or-ai** | definition; real vs AI-generated clues; classify kinds by output |
| u4-02 | How Generative AI Learns | 70 | **next-word**, **discriminator** | GenAI vs conventional AI; learning patterns from data; GAN generator/discriminator; next-token prediction |
| u4-03 | Types and Examples of Generative AI | 50 | — | by output (text, image, audio, video, code); by model (GAN, VAE, RNN/transformer, diffusion); tools |
| u4-04 | Benefits, Limitations and GAN Paint | 60 | **gan-paint** | benefits; limitations (hallucination etc.); hands-on GAN Paint; GenAI tools |
| u4-05 | Using Generative AI Ethically | 60 | **genai-cases** | ethical considerations; deepfakes; copyright; academic honesty; disclosure; privacy; responsible-use checklist |

### Unit 5 — Introduction to Python (`u5`, color green)
| id | title | min | labs/code | must cover |
|---|---|---|---|---|
| u5-01 | Programming and Python | 90 | **robo-runner** | what programming is; Python uses & applications; gamified sequencing/loops/conditions |
| u5-02 | print(), Variables and Data Types | 80 | code steps | print, comments, variables, naming rules, int/float/str/bool, type() |
| u5-03 | Operators, Expressions and input() | 110 | code steps | arithmetic, assignment, comparison, logical operators; precedence; type conversion; input() returns str |
| u5-04 | Decisions with if, elif, else | 90 | code steps | conditions, indentation, if/elif/else |
| u5-05 | Loops with for and while | 100 | code steps | range(), for, while, loop counters and sums |
| u5-06 | Python Lists | 110 | code steps | create, index, negative index, slicing, len, append, insert, extend, remove, pop, del, sort, sum/min/max, loop over list |
| u5-07 | Practical File: 15+ Programs | 60 | code steps | completing the CBSE suggested program list |

### Capstone — Build It Yourself (`cp`, color teal)
| id | title | min | labs/code |
|---|---|---|---|
| cp-01 | Train Your Own Image Classifier | 90 | **doodle-trainer** |
| cp-02 | Build a Rule-based Chatbot in Python | 90 | code steps |
| cp-03 | SDG Data Project | 120 | **sdg-project** |
| cp-04 | AI Portfolio | 60 | **portfolio** |

Total ≈ 2,875 minutes of lessons + Mistake Gym reviews ≈ 48–50 hours.
