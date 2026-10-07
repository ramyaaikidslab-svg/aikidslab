// Unit 3 — Math for AI (Statistics and Probability). CBSE 417 Class IX, Part B.
export default {
  id: 'u3',
  title: 'Math for AI: Statistics and Probability',
  short: 'Math for AI',
  color: 'coral',
  syllabus: 'Unit 3 · 12 h theory + 13 h practical in the CBSE plan',
  topics: [
  {
    id: 'u3-01',
    title: 'Why Math Matters for AI',
    minutes: 60,
    outcomes: [
      'Analyse data in the form of numbers and images and find the relation or pattern between them',
      'Explain how statistics, linear algebra, probability and calculus are used in AI',
      'Solve number-pattern and picture-analogy problems by finding the rule'
    ],
    hook: 'Your phone recognises your face in a split second — and underneath, it is doing nothing but maths with numbers.',
    concepts: {
      'why-math': 'Why AI needs maths',
      'patterns': 'Finding the rule in a number pattern',
      'picture-patterns': 'Picture analogies (A : B :: C : ?)',
      'math-stats': 'Statistics in AI',
      'linear-algebra': 'Linear algebra: images as grids of numbers',
      'math-prob': 'Probability in AI',
      'calculus': 'Calculus: how things change'
    },
    steps: [
      { kind: 'card', title: 'AI runs on numbers', html: `
  <p>When Diya points her phone at her face, the phone does not “see” a face the way you do. The camera turns the picture into thousands of numbers. The AI then looks for a <b>pattern</b> in those numbers that matches Diya’s face.</p>
  <p>The same is true for everything an AI handles. A voice note becomes a list of numbers describing the sound wave. A sentence becomes numbers that stand for words. Cricket scores, rainfall and exam marks are numbers already.</p>
  <div class="key"><b>Key idea</b> AI finds patterns in data, and data reaches the computer as numbers. Maths is the language AI uses to find, measure and use those patterns.</div>
  <p>In this topic you will practise the first skill every AI needs — spotting a pattern — and meet the four branches of maths that AI depends on.</p>` },
      { kind: 'card', title: 'Spot the rule in a number pattern', html: `
  <p>Look at <b>4, 9, 14, 19, __</b>. Each number is 5 more than the one before, so the missing number is <b>24</b>.</p>
  <div class="cols">
  <div class="mini"><h4>Add the same amount</h4><p>7, 10, 13, 16 → +3 each time → <b>19</b></p></div>
  <div class="mini"><h4>Multiply by the same amount</h4><p>3, 6, 12, 24 → ×2 each time → <b>48</b></p></div>
  <div class="mini"><h4>Square numbers</h4><p>1, 4, 9, 16 → 1², 2², 3², 4² → <b>25</b></p></div>
  <div class="mini"><h4>Add the two before</h4><p>1, 1, 2, 3, 5, 8 → 5 + 8 → <b>13</b></p></div>
  </div>
  <div class="eg"><b>Method</b> 1) Find how each term changes into the next. 2) Guess a rule. 3) Test the rule on <i>every</i> pair of terms. 4) Use it to predict.</div>
  <p>This is exactly what a learning machine does: it finds a rule that fits the examples, then uses it to predict something new.</p>` },
      { kind: 'lab', lab: 'number-patterns', title: 'Number Patterns', intro: 'Find the missing number in 8 sequences. After each one you will see the rule, so you can check your thinking.' },
      { kind: 'card', title: 'Patterns in pictures', html: `
  <p>A <b>picture analogy</b> is written <b>A : B :: C : ?</b> and read “A is to B as C is to what?”.</p>
  <div class="eg"><b>Example</b> Small square : big square :: small circle : ? The change from A to B is “make it bigger”. Apply the same change to C and you get a <b>big circle</b>.</div>
  <p>Common changes are: rotate (turn), flip (mirror), change colour, change size, add one more object, or add one more side (triangle → square).</p>
  <ol class="flow">
  <li><b>Compare A and B</b><span>What exactly changed? Only one thing, or two?</span></li>
  <li><b>Name the change</b><span>“Turned 90° clockwise”, “colours swapped”, “one more dot”.</span></li>
  <li><b>Apply it to C</b><span>Do the same change, and nothing else.</span></li>
  </ol>
  <p>Image AI does something similar: it learns which shapes, edges and colours go together, so it can recognise or complete a picture it has never seen.</p>` },
      { kind: 'lab', lab: 'picture-analogy', title: 'Picture Analogies', intro: 'Solve 6 picture puzzles of the form A : B :: C : ?. Spot the change from A to B, then apply it to C.' },
      { kind: 'check', concepts: ['patterns', 'picture-patterns'], n: 3 },
      { kind: 'card', title: 'Statistics: making sense of data', html: `
  <div class="def"><dfn>Statistics</dfn> The branch of maths that deals with collecting, organising, analysing, interpreting and presenting data.</div>
  <p>Suppose a weather office has rainfall records for your district for many past years. Statistics turns that pile of numbers into answers: What is the <b>average</b> rainfall in July? How much does it vary from year to year? Was this year unusual?</p>
  <p>AI systems use statistics all the time. Before a model is built, people summarise the data (averages, most common values, spread). While the model learns, it is really learning statistical patterns — which inputs usually go with which outputs.</p>
  <div class="key"><b>Key idea</b> Statistics helps AI summarise large data and find what is typical and what is unusual.</div>` },
      { kind: 'card', title: 'Linear algebra: pictures as grids of numbers', html: `
  <p>Zoom far into a photo and you will see tiny squares called <b>pixels</b>. In a greyscale image each pixel stores one number, often from 0 (black) to 255 (white). So the whole image is a <b>grid of numbers</b> in rows and columns — a <b>matrix</b>.</p>
  <div class="tblwrap"><table class="tbl"><tbody>
  <tr><td>255</td><td>0</td><td>255</td></tr>
  <tr><td>0</td><td>0</td><td>0</td></tr>
  <tr><td>255</td><td>0</td><td>255</td></tr>
  </tbody></table></div>
  <p><small>A 3 × 3 image of a black plus sign on white: 9 pixels, 9 numbers.</small></p>
  <p>A colour pixel usually stores <b>three</b> numbers: red, green and blue. A list of numbers like this, in a fixed order, is a <b>vector</b>. A student could also be a vector: [height in cm, mass in kg, age] = [152, 44, 14].</p>
  <div class="key"><b>Key idea</b> Linear algebra is the maths of vectors and matrices. It lets AI store and process images and data as lists and grids of numbers.</div>` },
      { kind: 'card', title: 'Probability: how sure is the AI?', html: `
  <div class="def"><dfn>Probability</dfn> The branch of maths that measures how likely something is to happen, on a scale from 0 (impossible) to 1 (certain).</div>
  <p>An AI rarely says “this is definitely a cat”. Instead it gives probabilities: <b>Cat 0.92, Dog 0.06, Rabbit 0.02</b>. It picks the most likely answer but also tells you how sure it is.</p>
  <p>You meet this every day. A weather app says “70% chance of rain”. A spam filter decides an email is very likely spam. A cricket broadcast shows a team’s chance of winning that changes ball by ball.</p>
  <div class="warn"><b>Careful</b> A high probability is not a promise. An AI that is 92% sure can still be wrong — just less often than one that is 60% sure.</div>` },
      { kind: 'card', title: 'Calculus: how things change', html: `
  <div class="def"><dfn>Calculus</dfn> The branch of maths that studies how things change — for example, how fast a quantity is rising or falling.</div>
  <p>When an AI model is <b>trained</b>, it starts with guesses and makes many mistakes. Its error can be pictured as your height on a hilly field in thick fog. You want to reach the lowest point, but you can only feel the slope under your feet.</p>
  <p>Calculus tells the model which direction is “downhill” and how steep it is. The model takes a small step that way, checks again, and repeats — thousands of times — until the error is as small as it can get. This is called <b>optimising</b> the model.</p>
  <div class="key"><b>Key idea</b> Calculus helps AI improve during training by showing how to change its numbers to reduce errors. You will not need to do calculus here — just know what it is for.</div>` },
      { kind: 'check', concepts: ['math-stats', 'linear-algebra', 'math-prob', 'calculus'], n: 3 },
      { kind: 'card', title: 'All four working together', html: `
  <p>Think of a crop-disease app. A farmer in Punjab photographs a wheat leaf and the app replies, “85% chance of leaf rust”.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Branch</th><th>Where it appears</th></tr></thead>
  <tbody>
  <tr><td>Linear algebra</td><td>The leaf photo is stored as grids of pixel numbers.</td></tr>
  <tr><td>Statistics</td><td>The model learned typical patterns from many labelled leaf photos.</td></tr>
  <tr><td>Calculus</td><td>During training, it helped adjust the model step by step to cut errors.</td></tr>
  <tr><td>Probability</td><td>The answer is given as a chance: 85%.</td></tr>
  </tbody></table></div>
  <div class="key"><b>Key idea</b> Real AI systems use all four branches at once: data as numbers, patterns from statistics, learning with calculus, answers as probabilities.</div>` },
      { kind: 'card', title: 'Common mistakes with patterns', html: `
  <div class="warn"><b>Careful 1</b> Two terms are not enough. After 2, 4, __ the next term could be 6 (add 2) or 8 (multiply by 2). You need more terms to be sure of the rule.</div>
  <div class="warn"><b>Careful 2</b> Test your rule on every pair, not just the first. 2, 5, 4, 7, 6, 9 is not “+3”; it alternates +3 and −1, so the next term is 8.</div>
  <div class="warn"><b>Careful 3</b> In picture analogies, change only what changed from A to B. If A to B only got bigger, the answer keeps C’s shape and colour.</div>
  <p>AI faces the same risk: a pattern that fits past data may not continue for ever. That is why AI predictions are always checked against new data.</p>` },
      { kind: 'check', concepts: ['why-math', 'patterns'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u3-01-q01', c: 'patterns', t: 'num', d: 1, q: 'Find the missing number: <b>4, 9, 14, 19, __</b>', a: 24, ex: 'Each term is 5 more than the one before (4→9→14→19), so the next term is 19 + 5 = 24.' },
      { id: 'u3-01-q02', c: 'patterns', t: 'mcq', d: 1, q: 'What comes next? <b>3, 6, 12, 24, __</b>', o: ['48', '30', '36', '27'], a: 0, mis: { 1: '30 adds 6, but the gaps are not all equal (3, 6, 12). Each term is double the one before.' }, ex: 'Each term is multiplied by 2: 3×2 = 6, 6×2 = 12, 12×2 = 24, so the next is 24×2 = 48.' },
      { id: 'u3-01-q03', c: 'patterns', t: 'num', d: 2, q: 'Find the missing number: <b>1, 4, 9, 16, 25, __</b>', a: 36, ex: 'These are square numbers: 1², 2², 3², 4², 5². The next is 6² = 36.' },
      { id: 'u3-01-q04', c: 'patterns', t: 'mcq', d: 2, q: 'What comes next? <b>1, 1, 2, 3, 5, 8, __</b>', o: ['13', '11', '16', '10'], a: 0, mis: { 1: 'You added 3 (the gap between 5 and 8). The rule is to add the two terms just before: 5 + 8.', 2: 'Doubling 8 gives 16, but 5 is not double 3. Each term is the sum of the two before it.' }, ex: 'Each term is the sum of the two before it: 1+1 = 2, 1+2 = 3, 2+3 = 5, 3+5 = 8, so the next is 5 + 8 = 13.' },
      { id: 'u3-01-q05', c: 'patterns', t: 'mcq', d: 2, q: 'What comes next? <b>2, 5, 4, 7, 6, 9, __</b>', o: ['8', '12', '11', '10'], a: 0, mis: { 1: 'Adding 3 to 9 assumes the rule is +3, but 5 → 4 goes down. The steps alternate +3, −1.', 3: 'The gaps are not +1. Test each step: +3, −1, +3, −1, +3, so the next step is −1.' }, ex: 'The steps alternate: +3, −1, +3, −1, +3. The next step is −1, so 9 − 1 = 8.' },
      { id: 'u3-01-q06', c: 'patterns', t: 'mcq', d: 3, q: 'Riya sees <b>2, 4, __</b> and says the next term is 6. Arjun says it is 8. Who is right?', o: ['Either could be right — two terms do not fix the rule', 'Riya — the rule has to be “add 2”', 'Arjun — the rule has to be “multiply by 2”', 'Neither — the next term has to be 16'], a: 0, mis: { 1: '“Add 2” fits 2 → 4, but so does “multiply by 2”. With only two terms you cannot tell which rule is meant.', 2: '“Multiply by 2” fits, but so does “add 2”. You need a third term to decide.' }, ex: 'Both “add 2” (giving 6) and “multiply by 2” (giving 8) fit 2 → 4. More terms are needed — just as AI needs enough data before trusting a pattern.' },
      { id: 'u3-01-q07', c: 'patterns', t: 'num', d: 3, q: 'In a stadium, row 1 has 20 seats, row 2 has 24 seats and row 3 has 28 seats. The pattern continues. How many seats are in <b>row 10</b>?', a: 56, unit: 'seats', ex: 'Each row has 4 more seats. Row 10 is 9 steps after row 1, so 20 + 9 × 4 = 20 + 36 = 56.' },
      { id: 'u3-01-q08', c: 'patterns', t: 'mcq', d: 2, q: 'Which rule makes the pattern <b>81, 27, 9, 3, …</b>?', o: ['Divide by 3 each time', 'Subtract 3 each time', 'Divide by 2 each time', 'Subtract 27 each time'], a: 0, mis: { 1: '81 − 3 = 78, not 27. Check the rule on the first step before trusting it.', 3: '81 − 27 = 54, not 27. Try dividing instead: 81 ÷ 3 = 27.' }, ex: '81 ÷ 3 = 27, 27 ÷ 3 = 9, 9 ÷ 3 = 3 — the rule works for every step.' },
      { id: 'u3-01-q09', c: 'picture-patterns', t: 'mcq', d: 1, q: 'In a picture analogy <b>A : B :: C : ?</b>, what should you work out first?', o: ['The change that turns A into B', 'Which picture has the most colours', 'How many shapes there are in C', 'Which picture looks the nicest'], a: 0, ex: 'An analogy says “C changes in the same way A changed into B”, so you first find the A → B change and then apply it to C.' },
      { id: 'u3-01-q10', c: 'picture-patterns', t: 'mcq', d: 2, q: 'Small square : big square :: small circle : ?', o: ['Big circle', 'Small square', 'Big square', 'Small triangle'], a: 0, mis: { 1: 'The change from A to B was size, not shape. Keep the circle and make it bigger.', 2: 'A big square copies B. Apply the change (make it bigger) to C, the circle.' }, ex: 'A → B only made the shape bigger. Applying the same change to a small circle gives a big circle.' },
      { id: 'u3-01-q11', c: 'picture-patterns', t: 'mcq', d: 3, q: 'Arrow pointing up : arrow pointing right :: arrow pointing left : ?', o: ['Arrow pointing up', 'Arrow pointing down', 'Arrow pointing right', 'Arrow pointing left'], a: 0, mis: { 1: 'Down would be an anticlockwise turn from left. Up → right is a quarter-turn clockwise, so left turns clockwise to up.', 2: 'Left → right is a half-turn (180°). The A → B change was only a quarter-turn.' }, ex: 'Up → right is a 90° clockwise turn. Turning a left-pointing arrow 90° clockwise makes it point up.' },
      { id: 'u3-01-q12', c: 'picture-patterns', t: 'tf', d: 1, q: 'Solving a picture analogy is similar to how image AI learns which shapes, edges and colours go together.', a: true, ex: 'Both involve spotting a visual pattern and applying it to a new picture — the core skill of computer vision.' },
      { id: 'u3-01-q13', c: 'picture-patterns', t: 'mcq', d: 2, q: 'Triangle : square :: pentagon : ?', o: ['Hexagon', 'Square', 'Triangle', 'Pentagon'], a: 0, mis: { 1: 'The square was B, not the rule. The rule is “one more side”: 3 → 4, so 5 → 6.', 3: 'Something must change. Triangle (3 sides) became square (4 sides), so add one side.' }, ex: 'A triangle has 3 sides and a square has 4, so the rule is “add one side”. A pentagon (5) becomes a hexagon (6).' },
      { id: 'u3-01-q14', c: 'math-stats', t: 'mcq', d: 1, q: 'Which branch of maths deals with collecting, organising, analysing and interpreting data?', o: ['Statistics', 'Calculus', 'Linear algebra', 'Geometry'], a: 0, ex: 'That is the definition of statistics — the maths of working with data.' },
      { id: 'u3-01-q15', c: 'math-stats', t: 'mcq', d: 3, q: 'A weather office studies many years of past July rainfall in a district to find the usual rainfall and how much it varies. Which branch of maths is it mainly using?', o: ['Statistics', 'Calculus', 'Linear algebra', 'Trigonometry'], a: 0, mis: { 1: 'Calculus is about rates of change while models train. Finding the usual value and spread of past data is statistics.', 2: 'Linear algebra handles data as grids and lists. Summarising past records into an average and spread is statistics.' }, ex: 'Finding the average and the spread of past records is analysing and interpreting data — statistics.' },
      { id: 'u3-01-q16', c: 'math-stats', t: 'mcq', d: 2, q: 'A school AI tool reports: “The class average in maths rose from 61 to 68 this term.” Which branch of maths produced this summary?', o: ['Statistics', 'Calculus', 'Linear algebra', 'Probability'], a: 0, mis: { 1: 'The word “rose” is tempting, but working out and comparing averages of marks is statistics.', 3: 'No chance or likelihood is being measured here — just an average of real marks, which is statistics.' }, ex: 'An average (mean) is a statistical summary of data, so this is statistics.' },
      { id: 'u3-01-q17', c: 'linear-algebra', t: 'mcq', d: 1, q: 'To a computer, a greyscale image is stored as…', o: ['a grid of numbers, one for each pixel', 'a list of the objects in the picture', 'a short sentence describing the scene', 'a single number for the whole image'], a: 0, ex: 'Each pixel stores a number for its brightness, arranged in rows and columns — a matrix.' },
      { id: 'u3-01-q18', c: 'linear-algebra', t: 'num', d: 2, q: 'A tiny greyscale image is 8 pixels wide and 6 pixels tall. Each pixel stores one number. How many numbers store the whole image?', a: 48, unit: 'numbers', ex: 'The grid has 6 rows of 8 pixels: 8 × 6 = 48 pixels, and one number each, so 48 numbers.' },
      { id: 'u3-01-q19', c: 'linear-algebra', t: 'num', d: 3, q: 'The same 8 × 6 image is now in colour, with 3 numbers per pixel (red, green, blue). How many numbers store it?', a: 144, unit: 'numbers', ex: '8 × 6 = 48 pixels, and each needs 3 numbers: 48 × 3 = 144.' },
      { id: 'u3-01-q20', c: 'linear-algebra', t: 'mcq', d: 2, q: 'Which of these is a <b>vector</b>?', o: ['[152, 44, 14] — a student’s height, mass and age', 'The word “height” written on a form', 'A printed photo pinned on a notice board', 'The rule “if it is tall, call it a tree”'], a: 0, mis: { 1: 'A single word is not a list of numbers. A vector is an ordered list of numbers.', 3: 'A rule is part of a model, not data. A vector is an ordered list of numbers.' }, ex: 'A vector is an ordered list of numbers. [152, 44, 14] describes one student as three numbers in a fixed order.' },
      { id: 'u3-01-q21', c: 'linear-algebra', t: 'match', d: 2, q: 'Match each term to its meaning.', pairs: [['Pixel', 'The smallest dot of an image'], ['Matrix', 'A grid of numbers in rows and columns'], ['Vector', 'An ordered list of numbers'], ['Greyscale value', 'A number showing how dark or light a pixel is']], ex: 'Images are matrices of pixel values; a vector is a list of numbers; each greyscale value describes one pixel’s brightness.' },
      { id: 'u3-01-q22', c: 'math-prob', t: 'mcq', d: 1, q: 'Which branch of maths measures how likely something is to happen?', o: ['Probability', 'Statistics', 'Calculus', 'Linear algebra'], a: 0, ex: 'Probability measures likelihood on a scale from 0 (impossible) to 1 (certain).' },
      { id: 'u3-01-q23', c: 'math-prob', t: 'mcq', d: 2, q: 'An image app says: <b>Cat 0.92, Dog 0.06, Rabbit 0.02</b>. What do these numbers show?', o: ['How likely the app thinks each label is', 'How many of each animal are in the photo', 'How many pixels each animal covers', 'How old each animal in the photo is'], a: 0, mis: { 1: 'They are not counts — 0.92 of a cat makes no sense. They are probabilities, and they add up to 1.' }, ex: 'These are probabilities: the app is most confident it is a cat (0.92). Together they add to 1.' },
      { id: 'u3-01-q24', c: 'math-prob', t: 'tf', d: 2, q: 'If an AI says it is 92% sure that a photo shows a cat, it cannot be wrong.', a: false, ex: 'A probability is not a promise. A 92% confident AI is wrong less often than a 60% one, but it can still be wrong.' },
      { id: 'u3-01-q25', c: 'calculus', t: 'mcq', d: 1, q: 'Calculus is the branch of maths that studies…', o: ['how things change', 'how to count objects in groups', 'how to draw shapes accurately', 'how to sort words alphabetically'], a: 0, ex: 'Calculus is about change — how fast something rises or falls. AI uses it while training.' },
      { id: 'u3-01-q26', c: 'calculus', t: 'mcq', d: 2, q: 'During training, an AI model keeps adjusting its numbers a little at a time to reduce its error. Which branch of maths tells it which way to adjust?', o: ['Calculus', 'Statistics', 'Probability', 'Geometry'], a: 0, mis: { 1: 'Statistics summarises data. Working out how a change in the model’s numbers changes the error is calculus.', 2: 'Probability expresses how sure the answer is. Deciding how to change the model to reduce error uses calculus.' }, ex: 'Calculus measures how the error changes when the model’s numbers change, so the model knows which way to step.' },
      { id: 'u3-01-q27', c: 'calculus', t: 'tf', d: 2, q: 'Calculus is mainly used when an AI model is being trained, to help it reduce its errors step by step.', a: true, ex: 'Training is an optimisation: calculus shows the “downhill” direction for the error, and the model takes small steps that way.' },
      { id: 'u3-01-q28', c: 'calculus', t: 'mcq', d: 3, q: 'A model’s error is pictured as height on a foggy hillside, and training is like walking down to the lowest point. What does calculus tell the model at each step?', o: ['Which direction is downhill and how steep it is', 'The exact location of the lowest point at once', 'How many people have walked on the hill before', 'Which photos in the data are the prettiest'], a: 0, mis: { 1: 'In fog you cannot see the bottom. Calculus only gives the local slope, so the model takes many small steps.' }, ex: 'Calculus gives the slope at the current position. The model steps downhill, checks again and repeats — that is how training reduces error.' },
      { id: 'u3-01-q29', c: 'why-math', t: 'mcq', d: 1, q: 'Why is maths so important for AI?', o: ['AI turns data into numbers and finds patterns in them', 'AI is only used by maths teachers', 'Maths makes computers run on less electricity', 'AI needs maths only to show the date and time'], a: 0, ex: 'Images, sound, text and tables all reach the AI as numbers, and maths is how it finds and uses patterns in them.' },
      { id: 'u3-01-q30', c: 'why-math', t: 'bins', d: 3, q: 'Sort each task by the branch of maths it mainly uses.', bins: ['Statistics', 'Linear algebra', 'Probability'], items: [['Finding the average marks of a class', 0], ['Storing a photo as a grid of pixel numbers', 1], ['Saying there is a 70% chance of rain', 2], ['Finding the most common shoe size in a class', 0], ['Describing a student as the list [152, 44, 14]', 1], ['Estimating how likely a team is to win', 2]], ex: 'Summaries such as averages are statistics; grids and lists of numbers are linear algebra; chances of events are probability.' },
      { id: 'u3-01-q31', c: 'why-math', t: 'match', d: 2, q: 'Match each branch of maths to how AI uses it.', pairs: [['Statistics', 'Summarise and interpret data'], ['Linear algebra', 'Store images and data as grids and lists'], ['Probability', 'Say how likely a prediction is'], ['Calculus', 'Adjust a model to reduce its errors']], ex: 'These are the four uses of maths in AI named in the CBSE syllabus.' },
      { id: 'u3-01-q32', c: 'why-math', t: 'multi', d: 3, q: 'A farmer photographs a wheat leaf and an app replies “85% chance of leaf rust”. Which statements are true? Select all that apply.', o: ['The leaf photo is stored as grids of numbers', '“85% chance” is a probability statement', 'Calculus helped tune the model during training', '85% chance means the leaf is certainly diseased', 'The app uses no maths because it only looks at pictures'], a: [0, 1, 2], ex: 'The photo becomes matrices (linear algebra), the output is a probability, and calculus was used in training. 85% is likely, not certain, and every step uses maths.' },
      { id: 'u3-01-q33', c: 'why-math', t: 'mcq', d: 1, q: 'When you speak to a voice assistant, what does the AI actually work with?', o: ['Numbers that describe the sound', 'The air you breathe out', 'Printed letters on paper', 'Your thoughts, read directly'], a: 0, ex: 'The microphone records the sound wave, which is stored as a long list of numbers that the AI analyses.' },
      { id: 'u3-01-q34', c: 'patterns', t: 'num', d: 3, q: 'A health officer notes new flu cases on four Mondays: <b>16, 24, 36, 54</b>. Each week is 1.5 times the week before. If the pattern continues, how many cases are expected next Monday?', a: 81, unit: 'cases', ex: 'Check the rule: 16×1.5 = 24, 24×1.5 = 36, 36×1.5 = 54. Next: 54 × 1.5 = 81. (Real outbreaks change, so such predictions must keep being checked.)' },
      { id: 'u3-01-q35', c: 'math-prob', t: 'multi', d: 2, q: 'Where is probability being used? Select all that apply.', o: ['A weather app showing “60% chance of rain”', 'A spam filter rating an email 97% likely to be spam', 'A cricket broadcast showing each team’s chance of winning', 'Counting the pixels in a photo', 'Writing a student’s name on a report card'], a: [0, 1, 2], ex: 'Each of the first three gives a chance or likelihood. Counting pixels and writing a name involve no uncertainty.' }
    ],
    gens: ['number-pattern']
  }
  ,
  {
    id: 'u3-02',
    title: 'Statistics in Real Life',
    minutes: 90,
    outcomes: [
      'Understand the concept of statistics in real life',
      'Describe applications of statistics in disaster management, sports, disease prediction and weather forecasting',
      'Collect data and apply statistical measures (mean, median, mode, range) to analyse it'
    ],
    hook: 'One cricketer scores 45, 12, 78, 30 and 60 — so what is his “usual” score? Four numbers from statistics answer that in seconds.',
    concepts: {
      'stats-def': 'What statistics is',
      'stats-apps': 'Statistics in disaster management, sports, health and weather',
      'mean': 'Mean (average)',
      'median': 'Median (middle value)',
      'mode': 'Mode (most frequent value)',
      'range': 'Range (spread)',
      'choose-measure': 'Choosing the right measure (outliers)'
    },
    steps: [
      { kind: 'card', title: 'From a pile of numbers to an answer', html: `
  <p>Kabir’s last five T20 scores are <b>45, 12, 78, 30, 60</b>. His coach asks: “What does he usually score? Is he steady or up and down?” Just staring at the list does not answer that. You need a way to <b>summarise</b> it.</p>
  <div class="def"><dfn>Statistics</dfn> The science of collecting, organising, analysing, interpreting and presenting data.</div>
  <ol class="flow">
  <li><b>Collect</b><span>Record the scores from each match.</span></li>
  <li><b>Organise</b><span>Put them in a table or in order.</span></li>
  <li><b>Analyse</b><span>Work out measures such as the mean or range.</span></li>
  <li><b>Interpret and present</b><span>“He averages 45 but varies a lot” — shown in a chart.</span></li>
  </ol>` },
      { kind: 'card', title: 'Statistics in disaster management', html: `
  <p>India’s east coast faces tropical cyclones from the Bay of Bengal. The India Meteorological Department (IMD) tracks each storm and issues warnings.</p>
  <p>Statistics makes those warnings useful. Forecasters compare a new storm with <b>records of many past cyclones</b> — their paths, wind speeds and rainfall — together with current measurements. This helps estimate where the storm may cross the coast and how strong it may be.</p>
  <p>Disaster-management authorities then use population data for the coastal villages to decide <b>how many people to move, where the shelters are, and how much food and water to send</b>. Moving people early, before landfall, is what saves lives.</p>
  <div class="key"><b>Key idea</b> In disasters, statistics turns past records and live data into decisions made before the danger arrives.</div>` },
      { kind: 'card', title: 'Sports, disease prediction and weather', html: `
  <div class="cols">
  <div class="mini"><h4>🏏 Sports</h4><p>Batting average, strike rate and a bowler’s economy rate are statistics. Teams study a batter’s scoring areas to plan field placements.</p></div>
  <div class="mini"><h4>🩺 Disease prediction</h4><p>Health departments track daily cases of fever, dengue or flu in each area. A sudden jump above the usual level is an early warning of an outbreak.</p></div>
  <div class="mini"><h4>🌦️ Weather forecast</h4><p>Forecasters combine past weather records with today’s readings of temperature, pressure, humidity and wind to predict rain and heat.</p></div>
  </div>
  <p>In each case the pattern is the same: collect data, find what is <b>typical</b>, notice what is <b>unusual</b>, and act on it.</p>` },
      { kind: 'card', title: 'Mean: the average', html: `
  <div class="formula">Mean = sum of all values ÷ number of values</div>
  <div class="eg"><b>Example</b> Kabir’s scores: 45, 12, 78, 30, 60.<br>Sum = 45 + 12 + 78 + 30 + 60 = 225.<br>Number of values = 5.<br>Mean = 225 ÷ 5 = <b>45 runs</b>.</div>
  <p>The mean shares the total out equally. If Kabir had scored exactly the same in every match, he would have scored 45 each time.</p>
  <p>A cricket <b>run rate</b> is also a mean: runs scored ÷ overs bowled. A team with 168 runs in 20 overs has a run rate of 168 ÷ 20 = 8.4 runs per over.</p>
  <div class="warn"><b>Careful</b> Divide by how many values there are, not by the biggest value or by 10.</div>` },
      { kind: 'card', title: 'Median: the middle value', html: `
  <p>The <b>median</b> is the middle value once the data is <b>arranged in order</b>.</p>
  <div class="eg"><b>Odd count</b> Temperatures (°C): 31, 28, 35, 30, 33.<br>In order: 28, 30, <b>31</b>, 33, 35. Median = <b>31 °C</b>.</div>
  <div class="eg"><b>Even count</b> Goals in six matches: 4, 9, 2, 7, 10, 6.<br>In order: 2, 4, <b>6, 7</b>, 9, 10. Two middle values: 6 and 7.<br>Median = (6 + 7) ÷ 2 = <b>6.5</b>.</div>
  <p>Half the values are at or below the median and half are at or above it. With an even count, the median can be a value that is not in the list, like 6.5.</p>
  <div class="warn"><b>Careful</b> Always sort first. The middle <i>position</i> of an unsorted list is not the median.</div>` },
      { kind: 'check', concepts: ['mean', 'median'], n: 3 },
      { kind: 'card', title: 'Mode and range', html: `
  <p>The <b>mode</b> is the value that appears <b>most often</b>.</p>
  <div class="eg"><b>Example</b> Shoe sizes: 6, 7, 7, 8, 7, 9, 6. Size 7 appears 3 times, more than any other, so the mode is <b>7</b>.</div>
  <p>A data set can have two modes (2, 2, 5, 5, 8) or no mode if every value appears once. The mode also works for categories, like “most popular sport”, where a mean is impossible.</p>
  <div class="formula">Range = largest value − smallest value</div>
  <div class="eg"><b>Example</b> Minimum temperatures in Delhi over a winter week (°C): 6, 9, 7, 11, 8, 10, 5.<br>Range = 11 − 5 = <b>6 °C</b>.</div>
  <p>The range tells you how <b>spread out</b> the data is. A small range means the values are close together — steady, consistent.</p>` },
      { kind: 'check', concepts: ['mode', 'range'], n: 2 },
      { kind: 'lab', lab: 'stats-explorer', title: 'Stats Explorer', intro: 'Add, drag and remove dots on a number line and watch the mean, median, mode and range change live. Then beat three challenges.' },
      { kind: 'card', title: 'Outliers: when the mean misleads', html: `
  <p>Five friends’ monthly pocket money: ₹100, ₹120, ₹150, ₹130 and ₹2000.</p>
  <div class="eg"><b>Mean</b> (100 + 120 + 150 + 130 + 2000) ÷ 5 = 2500 ÷ 5 = <b>₹500</b>.<br><b>Median</b> In order: 100, 120, <b>130</b>, 150, 2000 → <b>₹130</b>.</div>
  <p>Four of the five friends get far less than ₹500. One very large value — an <b>outlier</b> — pulled the mean up. The median hardly noticed it.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Use</th><th>When</th></tr></thead>
  <tbody>
  <tr><td>Mean</td><td>Numbers without extreme values, e.g. marks in a class test</td></tr>
  <tr><td>Median</td><td>Numbers with outliers, e.g. incomes, house prices</td></tr>
  <tr><td>Mode</td><td>The most common value or category, e.g. best-selling size</td></tr>
  <tr><td>Range</td><td>How spread out or consistent the data is</td></tr>
  </tbody></table></div>` },
      { kind: 'card', title: 'Statistics inside AI and public health', html: `
  <p>Suppose a district records new fever cases each day: 10, 12, 9, 15, 11, 13, 14. Daily numbers jump up and down, so health officers often look at a <b>7-day average</b>: (10 + 12 + 9 + 15 + 11 + 13 + 14) ÷ 7 = 84 ÷ 7 = <b>12 cases a day</b>. If next week’s average climbs well above 12, that is a warning sign worth checking.</p>
  <p>AI systems lean on the same measures:</p>
  <ul>
  <li>Before training, data scientists check each feature’s mean, median, range and mode to spot errors and outliers.</li>
  <li>A missing value is often filled with the <b>median</b>, because outliers barely affect it.</li>
  <li>A model’s predictions are judged by statistics such as its average error.</li>
  </ul>` },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>Median without sorting</b> For 12, 30, 5, 18, 9 the middle <i>position</i> holds 5, but in order (5, 9, 12, 18, 30) the median is <b>12</b>.</div>
  <div class="warn"><b>Even count</b> With 6 values there is no single middle. Average the two middle values.</div>
  <div class="warn"><b>Mode vs frequency</b> In 6, 7, 7, 8, 7 the mode is <b>7</b> (the value), not 3 (how many times it appears).</div>
  <div class="warn"><b>Range vs largest</b> The range is largest − smallest, not just the largest value.</div>
  <div class="warn"><b>Mean with outliers</b> One extreme value can drag the mean far from what is typical. Check the median too.</div>` },
      { kind: 'check', concepts: ['choose-measure', 'stats-apps', 'stats-def'], n: 3 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      { id: 'u3-02-q01', c: 'stats-def', t: 'mcq', d: 1, q: 'Statistics is the science of…', o: ['collecting, organising, analysing, interpreting and presenting data', 'measuring angles and drawing accurate shapes', 'writing instructions for a computer to follow', 'studying how living things grow and change'], a: 0, ex: 'That is the definition of statistics: it covers the whole journey of data, from collecting it to presenting what it means.' },
      { id: 'u3-02-q02', c: 'stats-def', t: 'order', d: 2, q: 'Put the steps of a statistical study in order.', items: ['Collect the data', 'Organise it in a table', 'Analyse it, e.g. find the mean', 'Interpret what the results mean', 'Present the findings in a chart or report'], ex: 'You cannot organise data you have not collected, or interpret results you have not calculated — so the steps follow this order.' },
      { id: 'u3-02-q03', c: 'stats-def', t: 'tf', d: 1, q: 'Statistics is only about collecting data; analysing and interpreting it is a separate subject.', a: false, ex: 'Statistics covers collecting, organising, analysing, interpreting and presenting data — all of these steps.' },
      { id: 'u3-02-q04', c: 'stats-apps', t: 'mcq', d: 2, q: 'How does statistics help in disaster management, for example with cyclones on India’s east coast?', o: ['Records of past storms plus live data help estimate where a cyclone may hit, so people can be moved early', 'Statistics stops cyclones from forming over the Bay of Bengal', 'Statistics is used only after a cyclone, to count the damage', 'Statistics lets officials skip warnings because the path is always certain'], a: 0, mis: { 2: 'Counting damage is one use, but the biggest value is before landfall — planning evacuations, shelters and supplies.', 3: 'Forecasts estimate likely paths; they are never certain. That is why warnings and evacuations still matter.' }, ex: 'Comparing a new storm with many past storms and current measurements helps estimate its path and strength, so authorities can evacuate people in time.' },
      { id: 'u3-02-q05', c: 'stats-apps', t: 'match', d: 2, q: 'Match each application of statistics to an example.', pairs: [['Disaster management', 'Plan evacuations using past cyclone and flood records'], ['Sports', 'Study a batter’s scoring areas to set the field'], ['Disease prediction', 'Track daily fever cases to spot an outbreak early'], ['Weather forecast', 'Combine past records and today’s readings to predict rain']], ex: 'Each application collects data, finds what is typical, and spots what is unusual in order to make a decision.' },
      { id: 'u3-02-q06', c: 'stats-apps', t: 'multi', d: 2, q: 'In which situations is statistics being used? Select all that apply.', o: ['A coach compares a bowler’s economy rate across 10 matches', 'A health department tracks daily dengue cases in each ward', 'A weather office compares this year’s rainfall with the long-term average', 'A student learns a poem by heart', 'A painter mixes blue and yellow to make green'], a: [0, 1, 2], ex: 'The first three collect and analyse data to find patterns. Learning a poem and mixing paints involve no data analysis.' },
      { id: 'u3-02-q07', c: 'stats-apps', t: 'mcq', d: 3, q: 'District health officers see that fever cases this week are about double the usual weekly average. What is the most sensible next step?', o: ['Investigate a possible outbreak and alert clinics, since the jump is far above normal', 'Ignore it, because one week of data can never mean anything', 'Delete this week’s numbers so the average stays the same', 'Wait a full year before looking at the data again'], a: 0, mis: { 1: 'One week may be a blip, but a doubling is a strong warning sign. Spotting such jumps early is exactly why cases are tracked.', 2: 'Deleting real data hides the problem. Statistics is useful because it shows when something unusual is happening.' }, ex: 'Comparing current cases with the usual average is how outbreaks are spotted early. A big jump calls for checking and preparing.' },
      { id: 'u3-02-q08', c: 'stats-apps', t: 'mcq', d: 1, q: 'An analyst works out a batter’s average score against spin bowling. This is statistics used in…', o: ['sports', 'disaster management', 'disease prediction', 'weather forecasting'], a: 0, ex: 'Batting averages and similar figures are sports statistics, used to plan strategy.' },
      { id: 'u3-02-q09', c: 'mean', t: 'mcq', d: 1, q: 'How do you find the mean of a set of numbers?', o: ['Add all the values and divide by how many values there are', 'Pick the value that appears most often', 'Arrange the values in order and take the middle one', 'Subtract the smallest value from the largest'], a: 0, ex: 'Mean = sum of values ÷ number of values. The other options describe the mode, median and range.' },
      { id: 'u3-02-q10', c: 'mean', t: 'num', d: 2, q: 'Ayaan’s marks in five tests (out of 20) are 14, 18, 11, 20 and 17. What is his mean mark?', a: 16, ex: 'Sum = 14 + 18 + 11 + 20 + 17 = 80. Number of tests = 5. Mean = 80 ÷ 5 = 16.' },
      { id: 'u3-02-q11', c: 'mean', t: 'mcq', d: 2, q: 'The maximum temperature in Chennai on four days was 31, 33, 34 and 30 °C. What is the mean?', o: ['32 °C', '128 °C', '30 °C', '34 °C'], a: 0, mis: { 1: '128 is the sum. Divide it by the number of days, 4.', 3: '34 is the highest value, not the mean. Add all four values and divide by 4.' }, ex: 'Sum = 31 + 33 + 34 + 30 = 128. Mean = 128 ÷ 4 = 32 °C.' },
      { id: 'u3-02-q12', c: 'mean', t: 'num', d: 3, q: 'The mean of four numbers is 15. Three of them are 12, 18 and 10. What is the fourth number?', a: 20, ex: 'A mean of 15 for 4 numbers means their total is 15 × 4 = 60. The three known numbers add to 12 + 18 + 10 = 40, so the fourth is 60 − 40 = 20.' },
      { id: 'u3-02-q13', c: 'mean', t: 'mcq', d: 2, q: 'What is the mean of 6, 8, 10 and 16?', o: ['10', '40', '9', '8'], a: 0, mis: { 1: '40 is the sum. Divide by the number of values (4): 40 ÷ 4 = 10.', 2: '9 is the median (the average of the middle values 8 and 10), not the mean.' }, ex: 'Sum = 6 + 8 + 10 + 16 = 40. There are 4 values, so mean = 40 ÷ 4 = 10.' },
      { id: 'u3-02-q14', c: 'mean', t: 'num', d: 3, q: 'A team scores 168 runs in 20 overs. What is its run rate (mean runs per over)? Give your answer to 1 decimal place.', a: 8.4, tol: 0.05, unit: 'runs per over', ex: 'Run rate = total runs ÷ overs = 168 ÷ 20 = 8.4 runs per over.' },
      { id: 'u3-02-q15', c: 'median', t: 'mcq', d: 1, q: 'The median of a data set is…', o: ['the middle value when the data is arranged in order', 'the value that appears most often', 'the total of all values divided by how many there are', 'the difference between the largest and smallest values'], a: 0, ex: 'The median is the middle of the ordered data. The other options describe mode, mean and range.' },
      { id: 'u3-02-q16', c: 'median', t: 'mcq', d: 2, q: 'Find the median of <b>7, 3, 9, 5, 11</b>.', o: ['7', '9', '35', '11'], a: 0, mis: { 1: '9 sits in the middle position of the unsorted list. Sort first: 3, 5, 7, 9, 11.', 2: '35 is the sum of the values, not the middle value.' }, ex: 'In order: 3, 5, 7, 9, 11. The middle (3rd) value is 7.' },
      { id: 'u3-02-q17', c: 'median', t: 'num', d: 2, q: 'Find the median of <b>12, 4, 9, 15, 6, 10</b>. Give your answer to 1 decimal place.', a: 9.5, tol: 0.05, ex: 'In order: 4, 6, 9, 10, 12, 15. There are 6 values, so take the two middle ones (9 and 10): (9 + 10) ÷ 2 = 9.5.' },
      { id: 'u3-02-q18', c: 'median', t: 'mcq', d: 3, q: 'Sana is asked for the median of <b>12, 30, 5, 18, 9</b>. She answers 5, because 5 is the middle number in the list. Is she right?', o: ['No — in order (5, 9, 12, 18, 30) the median is 12', 'Yes — the median is the number written in the middle', 'No — the median is the mean of the values, 14.8', 'No — the median is the largest value, 30'], a: 0, mis: { 1: 'You found the middle position, not the middle value — sort first.', 2: '14.8 is the mean (74 ÷ 5). The median is the middle of the sorted values.' }, ex: 'The median is the middle of the ordered data. Sorted: 5, 9, 12, 18, 30, so the median is 12.' },
      { id: 'u3-02-q19', c: 'median', t: 'tf', d: 2, q: 'When there is an even number of values, the median is the mean of the two middle values after sorting.', a: true, ex: 'With an even count there is no single middle value, so you average the two middle ones, e.g. 2, 4, 6, 7, 9, 10 → (6 + 7) ÷ 2 = 6.5.' },
      { id: 'u3-02-q20', c: 'median', t: 'num', d: 3, q: 'Monthly rainfall (mm) at a weather station for 8 months: 20, 35, 12, 180, 250, 90, 15, 40. Find the median. Give your answer to 1 decimal place.', a: 37.5, tol: 0.05, unit: 'mm', ex: 'In order: 12, 15, 20, 35, 40, 90, 180, 250. The two middle values are 35 and 40, so the median = (35 + 40) ÷ 2 = 37.5 mm.' },
      { id: 'u3-02-q21', c: 'mode', t: 'mcq', d: 1, q: 'The mode of a data set is…', o: ['the value that appears most often', 'the middle value after sorting', 'the sum divided by the count', 'the largest value minus the smallest'], a: 0, ex: 'Mode = the most frequent value. The other options are median, mean and range.' },
      { id: 'u3-02-q22', c: 'mode', t: 'mcq', d: 2, q: 'Shoe sizes in a group: <b>6, 7, 8, 7, 9, 7, 6, 8</b>. What is the mode?', o: ['7', '3', '7.25', '9'], a: 0, mis: { 1: '3 is how many times size 7 appears. The mode is the value itself: 7.', 2: '7.25 is the mean (58 ÷ 8). The mode is the most frequent value.' }, ex: 'Counts: size 6 → 2, size 7 → 3, size 8 → 2, size 9 → 1. Size 7 appears most often, so the mode is 7.' },
      { id: 'u3-02-q23', c: 'mode', t: 'mcq', d: 2, q: 'A class votes for its favourite sport: cricket, football, cricket, badminton, kabaddi, cricket, football. Which measure can you find for this data?', o: ['Mode — cricket', 'Mean', 'Median', 'Range'], a: 0, mis: { 1: 'You cannot add “cricket + football”, so a mean is impossible for categories. The mode works.', 3: 'Range needs numbers to subtract. For categories, use the mode.' }, ex: 'The data are categories, not numbers. Only the mode applies: cricket appears 3 times, more than any other sport.' },
      { id: 'u3-02-q24', c: 'mode', t: 'tf', d: 2, q: 'A data set can have more than one mode.', a: true, ex: 'In 2, 2, 5, 5, 8, both 2 and 5 appear twice, so there are two modes.' },
      { id: 'u3-02-q25', c: 'mode', t: 'mcq', d: 1, q: 'Find the mode of <b>4, 9, 4, 6, 9, 4, 2</b>.', o: ['4', '9', '6', '2'], a: 0, ex: '4 appears 3 times, 9 appears twice, and 6 and 2 once each. So the mode is 4.' },
      { id: 'u3-02-q26', c: 'range', t: 'mcq', d: 1, q: 'How do you find the range of a data set?', o: ['Largest value − smallest value', 'Largest value + smallest value', 'Sum of values ÷ number of values', 'The value in the middle position'], a: 0, ex: 'Range = largest − smallest. It measures how spread out the data is.' },
      { id: 'u3-02-q27', c: 'range', t: 'mcq', d: 2, q: 'Minimum temperatures in Shimla over a week (°C): 8, 12, 5, 10, 14, 9, 7. What is the range?', o: ['9 °C', '14 °C', '5 °C', '19 °C'], a: 0, mis: { 1: '14 is the largest value. Subtract the smallest (5): 14 − 5 = 9.', 3: '19 is 14 + 5. The range subtracts: largest − smallest.' }, ex: 'Largest = 14, smallest = 5. Range = 14 − 5 = 9 °C.' },
      { id: 'u3-02-q28', c: 'range', t: 'mcq', d: 2, q: 'Kabir’s scores: 23, 67, 45, 12, 89. What is the range?', o: ['77 runs', '89 runs', '45 runs', '101 runs'], a: 0, mis: { 1: '89 is the largest score. The range subtracts the smallest: 89 − 12.', 2: '45 is the median (the middle of 12, 23, 45, 67, 89), not the range.', 3: '101 is 89 + 12. The range is largest − smallest.' }, ex: 'Largest = 89, smallest = 12. Range = 89 − 12 = 77 runs.' },
      { id: 'u3-02-q29', c: 'range', t: 'mcq', d: 3, q: 'Rohan and Meera both have a batting mean of 40. Rohan’s scores have a range of 10; Meera’s have a range of 85. What can you conclude?', o: ['Rohan is more consistent; Meera’s scores are more spread out', 'Meera is the better batter because her range is larger', 'They must have scored exactly the same runs in every match', 'Rohan must have played more matches than Meera'], a: 0, mis: { 1: 'A bigger range means more up and down, not better. Their means are equal.', 2: 'Equal means do not mean equal scores. Different ranges show their scores differ a lot.' }, ex: 'Same mean, different range: Rohan’s scores stay close together (consistent), while Meera’s vary widely. Range tells you spread, not quality.' },
      { id: 'u3-02-q30', c: 'choose-measure', t: 'mcq', d: 2, q: 'Monthly salaries at a small shop: ₹12,000, ₹13,000, ₹12,500, ₹14,000 and the owner’s ₹90,000. Which measure best describes a typical salary?', o: ['Median, ₹13,000', 'Mean, ₹28,300', 'Range, ₹78,000', 'Largest value, ₹90,000'], a: 0, mis: { 1: 'The mean is pulled up by one large value — no worker earns near ₹28,300. The median resists outliers.', 2: 'The range shows spread, not a typical value.' }, ex: 'One outlier (₹90,000) drags the mean to ₹28,300. In order, the middle salary is ₹13,000, which is far closer to what most people earn.' },
      { id: 'u3-02-q31', c: 'choose-measure', t: 'num', d: 2, q: 'Find the mean of the salaries ₹12,000, ₹13,000, ₹12,500, ₹14,000 and ₹90,000.', a: 28300, unit: '₹', ex: 'Sum = 12,000 + 13,000 + 12,500 + 14,000 + 90,000 = 1,41,500. Mean = 1,41,500 ÷ 5 = ₹28,300 — much higher than four of the five salaries.' },
      { id: 'u3-02-q32', c: 'choose-measure', t: 'mcq', d: 1, q: 'A canteen wants to know which samosa filling sells most. Which measure should it use?', o: ['Mode', 'Mean', 'Median', 'Range'], a: 0, ex: '“Sells most” means “most frequent”, which is the mode. Fillings are categories, so mean and median do not apply.' },
      { id: 'u3-02-q33', c: 'choose-measure', t: 'bins', d: 3, q: 'Sort each situation by the measure that suits it best.', bins: ['Mean', 'Median', 'Mode'], items: [['Most common blood group in a class', 2], ['Typical house price in an area with a few mansions', 1], ['Average marks in a class test with no extreme scores', 0], ['Most popular colour of school bag', 2], ['Typical daily wage when one person earns hugely more', 1], ['Average height of players in a school team', 0]], ex: 'Use the mode for most common categories, the median when outliers are present, and the mean for numbers without extreme values.' },
      { id: 'u3-02-q34', c: 'choose-measure', t: 'tf', d: 2, q: 'An outlier usually changes the mean much more than it changes the median.', a: true, ex: 'The mean uses every value’s size, so one extreme value drags it. The median only depends on the middle position, so it barely moves.' },
      { id: 'u3-02-q35', c: 'choose-measure', t: 'mcq', d: 3, q: 'An AI team is cleaning a table of student heights. A few heights are missing, and one was mistyped as 1600 cm. Which value is safer for filling in the missing heights?', o: ['The median height, because one extreme value barely affects it', 'The mean height, because it always uses every value', 'The largest height, so no one is under-measured', 'Zero, so the missing rows stand out'], a: 0, mis: { 1: 'Using every value is the problem here — the mistyped 1600 cm would pull the mean far too high.', 3: 'A height of 0 is impossible and would distort the data and the model trained on it.' }, ex: 'The median resists outliers, so the mistyped 1600 cm does not distort it. That is why the median is a common choice for filling missing values.' },
      { id: 'u3-02-q36', c: 'mean', t: 'multi', d: 2, q: 'For the data <b>2, 3, 3, 5, 7</b>, which statements are correct? Select all that apply.', o: ['Mean = 4', 'Median = 3', 'Mode = 3', 'Range = 7', 'Median = 5'], a: [0, 1, 2], ex: 'Sum = 20, so mean = 20 ÷ 5 = 4. The data is already in order; the middle value is 3. 3 appears twice, so the mode is 3. Range = 7 − 2 = 5, not 7.' },
      { id: 'u3-02-q37', c: 'median', t: 'order', d: 2, q: 'Put the steps for finding the median of 9, 2, 7, 4 in order.', items: ['Arrange the values in order: 2, 4, 7, 9', 'Count the values: there are 4, an even number', 'Pick the two middle values: 4 and 7', 'Find their mean: (4 + 7) ÷ 2 = 5.5'], ex: 'Sort first, then count to see whether there is one middle value or two. With an even count, average the two middle values.' }
    ],
    gens: ['mean-median-mode']
  }
  ,
  {
    id: 'u3-03',
    title: 'Car Spotting and Tabulating',
    minutes: 50,
    outcomes: [
      'Apply the concept of data collection, analysis and interpretation in a real-life activity',
      'Record observations with tally marks and organise them in a frequency table',
      'Answer questions based on recorded data and explain why data collection is the basis of AI'
    ],
    hook: 'Stand at your school gate for ten minutes and you can collect the same kind of data that smart traffic signals learn from.',
    concepts: {
      'data-collection': 'Planning data collection by observation',
      'tally': 'Tally marks',
      'freq-table': 'Frequency tables',
      'interpret': 'Interpreting a frequency table',
      'ai-link': 'Why data collection matters for AI'
    },
    steps: [
      { kind: 'card', title: 'The Car Spotting activity', html: `
  <p>Here is the challenge. Stand near a road for a fixed time and record the <b>colour</b> of every vehicle that passes. Then turn your record into a table and answer questions from it.</p>
  <p>It sounds simple, but it is the full journey of data in miniature:</p>
  <ol class="flow">
  <li><b>Collect</b><span>Observe and record each vehicle.</span></li>
  <li><b>Tabulate</b><span>Turn the record into a frequency table.</span></li>
  <li><b>Interpret</b><span>Which colour is most common? What fraction are red?</span></li>
  </ol>
  <div class="key"><b>Key idea</b> Data collection plays a key role in AI, because it forms the basis of statistics and of everything an AI learns.</div>
  <p>Data you collect yourself, first-hand, is called <b>primary data</b>.</p>` },
      { kind: 'card', title: 'Plan before you count', html: `
  <p>Meera and Rohan both counted cars for ten minutes, but Meera counted silver cars as “white” and Rohan did not. Their results could not be compared. Good data starts with a plan.</p>
  <ul>
  <li><b>What</b> exactly will you record? Colour, vehicle type, or both?</li>
  <li><b>Categories</b>: decide them in advance — red, white, black, blue, and “other” for anything else.</li>
  <li><b>Where</b>: one fixed spot, with a clear line that each vehicle must cross to be counted.</li>
  <li><b>When and how long</b>: for example 8:00 to 8:10 am.</li>
  <li><b>Rules</b>: count each vehicle once; agree how to classify tricky colours.</li>
  </ul>
  <div class="warn"><b>Careful</b> If you change the rules halfway, your data mixes two different measurements.</div>` },
      { kind: 'card', title: 'Tally marks', html: `
  <p>Vehicles pass quickly, so you cannot stop to write numbers. Instead, draw a short line — a <b>tally mark</b> — each time one passes.</p>
  <p>Every fifth mark is drawn <b>across</b> the four before it, making a bundle of five. In this course a bundle of five is shown as <b>卌</b>.</p>
  <div class="eg"><b>Example</b> 卌 卌 ||| means 5 + 5 + 3 = <b>13</b>.<br>卌 卌 卌 | means 5 + 5 + 5 + 1 = <b>16</b>.</div>
  <p>Why bundles of five? You can count bundles by fives (5, 10, 15 …) and then add the loose marks. It is faster than counting 16 separate lines and you are less likely to lose your place.</p>
  <div class="warn"><b>Careful</b> A bundle is 5, not 4. The crossing line is the fifth mark.</div>` },
      { kind: 'card', title: 'The frequency table', html: `
  <p>When time is up, count each row of tallies. The count is the <b>frequency</b> — how many times that category occurred.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Colour</th><th>Tally</th><th>Frequency</th></tr></thead>
  <tbody>
  <tr><td>White</td><td>卌 卌 卌 |||</td><td>18</td></tr>
  <tr><td>Black</td><td>卌 卌 |</td><td>11</td></tr>
  <tr><td>Red</td><td>卌 ||</td><td>7</td></tr>
  <tr><td>Blue</td><td>||||</td><td>4</td></tr>
  <tr><td><b>Total</b></td><td></td><td><b>40</b></td></tr>
  </tbody></table></div>
  <p>Always add the frequencies: 18 + 11 + 7 + 4 = 40. The total must match the number of vehicles you observed. If it does not, something was missed or counted twice.</p>` },
      { kind: 'check', concepts: ['tally', 'freq-table'], n: 3 },
      { kind: 'lab', lab: 'car-spotting', title: 'Car Spotting', intro: 'Watch a 60-second road and tap a button for each vehicle’s colour. Then compare your tally with the real counts and answer four questions from your table.' },
      { kind: 'card', title: 'Reading the table', html: `
  <p>Using the table (White 18, Black 11, Red 7, Blue 4, total 40):</p>
  <ul>
  <li><b>Most common colour</b>: white. The category with the highest frequency is the <b>mode</b>.</li>
  <li><b>Fraction that were red</b>: 7 ÷ 40 = 0.175 = <b>17.5%</b>.</li>
  <li><b>Share that were white</b>: 18 ÷ 40 = 0.45 = <b>45%</b> — almost half.</li>
  <li><b>Comparisons</b>: white (18) equals black and red together (11 + 7 = 18). White is 14 more than blue.</li>
  </ul>
  <div class="warn"><b>Careful</b> This table describes one road, for ten minutes, on one day. It does not prove that white is the most popular car colour in your city. To say that, you would need far more data from many places and times.</div>` },
      { kind: 'card', title: 'Making the data reliable', html: `
  <p>Two friends counting the same road got 18 and 22 white vehicles. Which is right? Perhaps neither. Reliable data comes from careful method:</p>
  <div class="cols">
  <div class="mini"><h4>Clear rules</h4><p>Agree what counts as each colour, and include “other”.</p></div>
  <div class="mini"><h4>Two counters</h4><p>Count separately, then compare and settle differences.</p></div>
  <div class="mini"><h4>More samples</h4><p>Repeat on different days and at different times.</p></div>
  <div class="mini"><h4>Record honestly</h4><p>Write tallies as you go; never guess afterwards from memory.</p></div>
  </div>
  <div class="key"><b>Key idea</b> More, and more carefully collected, data gives a truer picture — for people and for AI.</div>` },
      { kind: 'check', concepts: ['interpret', 'data-collection'], n: 3 },
      { kind: 'card', title: 'From car spotting to AI', html: `
  <p>Cities collect the same kind of data at a much larger scale. Cameras and sensors at junctions count vehicles every minute. Planners use the counts to set <b>traffic-signal timings</b> and to decide which roads need widening.</p>
  <p>An AI that recognises vehicles in camera footage first needs <b>thousands of labelled examples</b>: photos marked “bus”, “auto”, “bike”, “car”. If those photos were all taken in daylight, the AI may struggle at night. If autos were left out, it will not recognise autos.</p>
  <div class="key"><b>Key idea</b> An AI can only learn patterns that are in its data. Collecting enough accurate, relevant data — from all the situations it will face — is the foundation of every AI system.</div>` },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>Bundle = 4?</b> 卌 卌 |||| is 5 + 5 + 4 = 14. Counting each bundle as 4 gives a wrong 12.</div>
  <div class="warn"><b>Skipping the total check</b> Frequencies must add up to the number of vehicles observed.</div>
  <div class="warn"><b>Wrong denominator</b> The fraction of red vehicles is red ÷ <i>total</i> (7 ÷ 40), not red ÷ all the others.</div>
  <div class="warn"><b>Mode vs frequency</b> The mode is the colour (white), not the number 18.</div>
  <div class="warn"><b>Over-generalising</b> Ten minutes on one road cannot describe a whole city.</div>` },
      { kind: 'check', concepts: ['ai-link'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u3-03-q01', c: 'data-collection', t: 'mcq', d: 1, q: 'Standing at the school gate and recording the colour of each passing vehicle is which method of collecting data?', o: ['Observation', 'Interview', 'Web scraping', 'Online survey'], ex: 'You are watching and recording what happens, which is observation. No one is asked questions and no website is used.', a: 0 },
      { id: 'u3-03-q02', c: 'data-collection', t: 'mcq', d: 2, q: 'Before the car count starts, what should the team decide first?', o: ['Exactly what to record, the categories, the place and the time period', 'Which chart looks nicest for the final poster', 'Who will get the credit for the project', 'What answer they hope the data will show'], a: 0, mis: { 1: 'The chart comes at the end. Without a clear plan, the data itself may be unreliable.', 3: 'Deciding the answer in advance leads to biased counting. Plan the method, then let the data speak.' }, ex: 'Clear categories, a fixed place and a fixed time make the data consistent and comparable.' },
      { id: 'u3-03-q03', c: 'data-collection', t: 'order', d: 2, q: 'Put the steps of the Car Spotting activity in order.', items: ['Decide what to count and the categories', 'Choose the place and the time period', 'Make a tally mark for each vehicle', 'Total the tallies in a frequency table', 'Interpret the results and answer questions'], ex: 'You plan first (what, where, when), then collect with tally marks, then tabulate, and only then interpret.' },
      { id: 'u3-03-q04', c: 'data-collection', t: 'multi', d: 3, q: 'Which actions make the car-count data more reliable? Select all that apply.', o: ['Count at the same spot for a fixed time', 'Agree beforehand how to classify silver or grey cars', 'Repeat the count on different days and times', 'Count only the cars you find interesting', 'Fill in the counts later from memory'], a: [0, 1, 2], ex: 'Fixed place and time, clear category rules and repeated samples make data consistent. Picking favourites or guessing later adds errors and bias.' },
      { id: 'u3-03-q05', c: 'data-collection', t: 'mcq', d: 3, q: 'Two students counting the same road at the same time record 18 and 22 white vehicles. What is the best thing to do?', o: ['Agree clear rules for each colour, recount together and compare', 'Keep the larger number, because more data is always better', 'Delete the white category so there is no disagreement', 'Report 18 because the first number written is usually right'], a: 0, mis: { 1: '“More data” means more observations, not a bigger number. The two counts disagree, so the method needs fixing.', 3: 'Neither number is automatically right. The difference shows the rules were unclear.' }, ex: 'Different counts usually mean the rules were unclear (e.g. silver counted as white). Clear rules and a check make the data reliable.' },
      { id: 'u3-03-q06', c: 'data-collection', t: 'tf', d: 1, q: 'Data that you collect yourself by observing, like a car count, is called primary data.', a: true, ex: 'Primary data is collected first-hand. Data already collected by someone else is secondary data.' },
      { id: 'u3-03-q07', c: 'tally', t: 'mcq', d: 1, q: 'In tally marks, how is a group of five shown?', o: ['Four lines with a fifth line drawn across them', 'Five lines standing side by side with gaps', 'A single circle with the number 5 inside it', 'Four lines and a dot underneath them'], a: 0, ex: 'The fifth mark crosses the first four, making a bundle you can count quickly by fives.' },
      { id: 'u3-03-q08', c: 'tally', t: 'num', d: 1, q: 'What number does <b>卌 卌 |||</b> show?', a: 13, ex: 'Each 卌 is a bundle of 5. So 5 + 5 + 3 = 13.' },
      { id: 'u3-03-q09', c: 'tally', t: 'num', d: 2, q: 'What number does <b>卌 卌 卌 卌 ||</b> show?', a: 22, ex: 'Four bundles of 5 make 20, plus 2 loose marks: 20 + 2 = 22.' },
      { id: 'u3-03-q10', c: 'tally', t: 'mcq', d: 2, q: 'Which tally shows <b>9</b>?', o: ['卌 ||||', '卌 卌', '卌 |||', '卌 卌 ||||'], a: 0, mis: { 1: '卌 卌 is two bundles of five = 10.', 2: '卌 ||| is 5 + 3 = 8.', 3: '卌 卌 |||| is 5 + 5 + 4 = 14.' }, ex: '9 = 5 + 4, so one bundle (卌) and four loose marks (||||).' },
      { id: 'u3-03-q11', c: 'tally', t: 'mcq', d: 2, q: 'Why are tally marks grouped in fives?', o: ['So you can count the total quickly by fives', 'Because only five vehicles may be counted', 'So that each mark stands for five vehicles', 'Because five is the mode of every data set'], a: 0, mis: { 2: 'Each mark is still one vehicle. The bundle simply groups five single marks.' }, ex: 'Bundles let you count 5, 10, 15 … and then add the loose marks, which is fast and reduces counting errors.' },
      { id: 'u3-03-q12', c: 'tally', t: 'mcq', d: 3, q: 'Arjun’s tally for red cars is <b>卌 卌 ||||</b>, but he wrote the frequency as 12. What went wrong?', o: ['He counted each 卌 as 4; the right frequency is 14', 'Nothing — the tally does show 12', 'He should ignore the loose marks, so it is 10', 'Tally marks cannot be turned into numbers'], a: 0, mis: { 1: 'Count again: each 卌 is 5, so 5 + 5 + 4 = 14.', 2: 'Loose marks are vehicles too — every mark counts.' }, ex: 'A bundle is five marks (the crossing line is the fifth). 5 + 5 + 4 = 14. Counting bundles as 4 gives 4 + 4 + 4 = 12.' },
      { id: 'u3-03-q13', c: 'freq-table', t: 'mcq', d: 1, q: 'In a frequency table, the <b>frequency</b> of a category is…', o: ['how many times that category occurred', 'how fast the vehicles were going', 'the percentage of the most common category', 'the order in which the categories appeared'], a: 0, ex: 'Frequency = the count of how often something happened, e.g. 18 white vehicles.' },
      { id: 'u3-03-q14', c: 'freq-table', t: 'num', d: 2, q: 'A vehicle count gives: Bikes 14, Cars 21, Autos 9, Buses 6. How many vehicles were counted in total?', a: 50, unit: 'vehicles', ex: 'Add the frequencies: 14 + 21 + 9 + 6 = 50.' },
      { id: 'u3-03-q15', c: 'freq-table', t: 'mcq', d: 2, q: 'Which set of columns does a frequency table for the car count usually have?', o: ['Colour, Tally, Frequency', 'Driver, Speed, Fuel', 'Mean, Median, Mode', 'Date, Weather, Temperature'], a: 0, mis: { 2: 'Mean, median and mode are measures you might work out later, not the columns of the table itself.' }, ex: 'Each row is a category (colour), with its tally marks and the frequency they add up to.' },
      { id: 'u3-03-q16', c: 'tally', t: 'match', d: 2, q: 'Match each tally to its frequency.', pairs: [['卌 |', '6'], ['卌 卌 ||', '12'], ['|||', '3'], ['卌 卌 卌', '15']], ex: 'Count 5 for each 卌 and 1 for each loose mark: 5+1 = 6; 5+5+2 = 12; 3; 5+5+5 = 15.' },
      { id: 'u3-03-q17', c: 'freq-table', t: 'tf', d: 2, q: 'The frequencies in a frequency table should add up to the total number of observations.', a: true, ex: 'Every vehicle observed belongs to exactly one category, so the frequencies must add up to the total. This is a quick error check.' },
      { id: 'u3-03-q18', c: 'freq-table', t: 'mcq', d: 3, q: 'A table shows White 18, Black 11, Red 7, Blue 4. The counter’s notes say 42 vehicles passed. What does this tell you?', o: ['The frequencies add to 40, so 2 vehicles were missed or not categorised', 'Nothing — totals never need to match', 'The mode must be 42', 'Blue should be changed to 6 to make it fit'], a: 0, mis: { 1: 'Totals should match. A mismatch is a signal to check the data.', 3: 'Never change data to make it fit. Find out what was missed — perhaps an “other” colour.' }, ex: '18 + 11 + 7 + 4 = 40, not 42. Two vehicles are unaccounted for — maybe they were another colour and need an “other” row.' },
      { id: 'u3-03-q19', c: 'interpret', t: 'bins', d: 3, q: 'A 10-minute count on one road gave Bikes 14, Cars 21, Autos 9, Buses 6 (total 50). Sort each statement.', bins: ['Supported by the table', 'Not supported by the table'], items: [['Cars were the most common vehicle', 0], ['Buses made up 12% of the vehicles', 0], ['Fewer than half the vehicles were cars', 0], ['Autos and buses together were fewer than bikes', 1], ['Most families in the city own a car', 1], ['Bikes will always be the second most common here', 1]], ex: 'Cars (21) are the mode; 6 ÷ 50 = 12%; 21 of 50 is under half. Autos + buses = 15, which is more than 14 bikes. One short count cannot tell you about a whole city or about every future day.' },
      { id: 'u3-03-q20', c: 'interpret', t: 'mcq', d: 1, q: 'Counts: White 18, Black 11, Red 7, Blue 4. Which colour is the mode?', o: ['White', 'Black', 'Red', 'Blue'], a: 0, ex: 'The mode is the category with the highest frequency: white, with 18.' },
      { id: 'u3-03-q21', c: 'interpret', t: 'num', d: 2, q: 'Counts: White 18, Black 11, Red 7, Blue 4 (total 40). What percentage of the vehicles were red? Give your answer to 1 decimal place.', a: 17.5, tol: 0.05, unit: '%', ex: 'Red ÷ total = 7 ÷ 40 = 0.175. As a percentage: 0.175 × 100 = 17.5%.' },
      { id: 'u3-03-q22', c: 'interpret', t: 'mcq', d: 2, q: 'Counts: White 18, Black 11, Red 7, Blue 4 (total 40). What fraction of the vehicles were white, in simplest form?', o: ['9/20', '9/11', '1/18', '9/10'], a: 0, mis: { 1: '9/11 is 18/22 — you divided by the vehicles that were not white. Divide by the total, 40.', 3: '9/10 is 18/20. The total is 40, not 20.' }, ex: 'White ÷ total = 18/40. Divide top and bottom by 2: 9/20 (which is 45%).' },
      { id: 'u3-03-q23', c: 'interpret', t: 'mcq', d: 2, q: 'Counts: White 18, Black 11, Red 7, Blue 4. How many more white vehicles than blue ones were there?', o: ['14', '22', '4.5', '12'], a: 0, mis: { 1: '22 is 18 + 4. “How many more” means subtract: 18 − 4.', 2: '4.5 is 18 ÷ 4, which says “how many times as many”. “How many more” needs subtraction.' }, ex: '18 − 4 = 14 more white vehicles than blue ones.' },
      { id: 'u3-03-q24', c: 'interpret', t: 'mcq', d: 3, q: 'A planner counted vehicles on one road from 2:00 to 2:10 pm on a Sunday. Can she use this to describe the road’s traffic for the whole week?', o: ['No — one short count may not represent other days and times', 'Yes — any 10-minute count represents every day', 'Yes — Sunday afternoons are always the busiest time', 'No — traffic can never be measured with tally marks'], a: 0, mis: { 1: 'Traffic changes with the day and hour — weekday rush hours look very different from Sunday afternoon.', 3: 'Tally marks work fine. The problem is the sample is too small and too narrow.' }, ex: 'One small sample can be unrepresentative. She needs counts from different days and times before drawing conclusions about the whole week.' },
      { id: 'u3-03-q25', c: 'interpret', t: 'num', d: 3, q: 'A survey on a highway counted Bikes 14, Cars 21, Autos 9, Buses 6. What percentage of the vehicles were bikes?', a: 28, unit: '%', ex: 'Total = 14 + 21 + 9 + 6 = 50. Bikes ÷ total = 14 ÷ 50 = 0.28 = 28%.' },
      { id: 'u3-03-q26', c: 'ai-link', t: 'mcq', d: 1, q: 'Why does data collection matter so much for AI?', o: ['AI learns patterns from data, so it can only be as good as its data', 'AI needs data only to display charts for users', 'AI collects all the data it needs by itself without any planning', 'Data is only needed after the AI has been built'], a: 0, ex: 'An AI learns from examples. Missing, wrong or one-sided data leads to wrong patterns and poor predictions.' },
      { id: 'u3-03-q27', c: 'ai-link', t: 'mcq', d: 2, q: 'A traffic-camera AI must recognise bikes, cars, autos and buses. What data does it need for training?', o: ['Many photos of each vehicle type, each labelled correctly', 'One photo of a car, since all vehicles look alike', 'A list of vehicle colours with no photos', 'Photos of buses only, because they are the largest'], a: 0, mis: { 1: 'One example cannot show the variety of real vehicles. The AI needs many examples of every type.', 3: 'If a type is missing from the data, the AI will never learn to recognise it.' }, ex: 'The AI learns what each type looks like from many labelled examples covering every category it must recognise.' },
      { id: 'u3-03-q28', c: 'ai-link', t: 'tf', d: 2, q: 'An AI trained only on vehicle photos taken in daylight may perform worse at night.', a: true, ex: 'An AI can only learn patterns that are in its data. Night-time images look different, so it needs night examples too.' },
      { id: 'u3-03-q29', c: 'ai-link', t: 'mcq', d: 3, q: 'A smart traffic-signal AI was trained only on counts from weekday mornings. On Sunday evenings its signal timings cause long queues. What is the best fix?', o: ['Collect counts from more days and times, then retrain it', 'Switch the signals off every Sunday evening', 'Train it again on the same weekday-morning data', 'Ask drivers to drive the way they do on weekday mornings'], a: 0, mis: { 2: 'The same narrow data will teach the same narrow pattern. It needs data from the situations where it fails.' }, ex: 'The AI never saw Sunday-evening traffic. Collecting data from all the situations it will face, then retraining, fixes the gap.' },
      { id: 'u3-03-q30', c: 'ai-link', t: 'multi', d: 2, q: 'How can vehicle-count data be used by city planners or AI systems? Select all that apply.', o: ['Setting traffic-signal timings at busy junctions', 'Deciding which roads need widening', 'Training a model to predict traffic jams', 'Choosing the colour of school uniforms', 'Fixing the date of a festival'], a: [0, 1, 2], ex: 'Vehicle counts describe traffic, so they help with signals, roads and jam prediction. They say nothing about uniforms or festival dates.' },
      { id: 'u3-03-q31', c: 'data-collection', t: 'mcq', d: 2, q: 'Ritu wants to know which vehicle type is most common outside her school in the morning. What should she record?', o: ['The type of each vehicle passing between 7:30 and 8:30 am', 'The colour of each student’s school bag', 'The number of trees along the road', 'The names of the drivers who pass by'], a: 0, mis: { 1: 'Bags do not tell her about vehicles. Data must be relevant to the question.' }, ex: 'Her question is about vehicle types in the morning, so she must record vehicle type, at that place, in that time window.' },
      { id: 'u3-03-q32', c: 'interpret', t: 'mcq', d: 1, q: 'In a frequency table, the category with the highest frequency is the…', o: ['mode', 'median', 'range', 'mean'], a: 0, ex: 'The mode is the most frequent value or category.' }
    ]
  }
  ,
  {
    id: 'u3-04',
    title: 'Probability and Types of Events',
    minutes: 80,
    outcomes: [
      'Understand the concept of probability in real life using relatable examples',
      'Calculate the probability of an event',
      'Identify the type of an event: sure, impossible, likely, unlikely or equally likely'
    ],
    hook: 'Before every cricket match, a coin decides who bats first. Why does nobody complain that the toss is unfair?',
    concepts: {
      'chance': 'Chance and uncertainty',
      'outcomes': 'Experiments, outcomes and events',
      'prob-formula': 'Calculating probability',
      'prob-scale': 'The 0 to 1 probability scale',
      'event-types': 'Types of events',
      'exp-vs-theory': 'Experimental vs theoretical probability'
    },
    steps: [
      { kind: 'card', title: 'Living with chance', html: `
  <p>Will it rain during Saturday’s match? Will the bus be late? Will your team win the toss? You cannot know for sure — but you can say how <b>likely</b> each one is.</p>
  <p>Everyday words already do this: <i>certain</i>, <i>likely</i>, <i>fifty-fifty</i>, <i>unlikely</i>, <i>impossible</i>. Probability turns these words into numbers so we can compare them exactly.</p>
  <div class="def"><dfn>Probability</dfn> A number that measures how likely an event is to happen.</div>
  <p>The coin toss is accepted as fair because a fair coin has two outcomes, heads and tails, and each has exactly the same chance. Neither captain has an advantage.</p>
  <div class="key"><b>Key idea</b> Probability measures uncertainty. It does not tell you what <i>will</i> happen, only how likely it is.</div>` },
      { kind: 'card', title: 'Experiments, outcomes and events', html: `
  <p>Probability uses a few precise words.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Term</th><th>Meaning</th><th>Die example</th></tr></thead>
  <tbody>
  <tr><td><b>Experiment</b></td><td>An action whose result is uncertain</td><td>Rolling a die</td></tr>
  <tr><td><b>Outcome</b></td><td>One possible result</td><td>Getting a 4</td></tr>
  <tr><td><b>All possible outcomes</b></td><td>The complete list of results</td><td>1, 2, 3, 4, 5, 6</td></tr>
  <tr><td><b>Event</b></td><td>The outcome or group of outcomes you are interested in</td><td>“An even number”: 2, 4, 6</td></tr>
  </tbody></table></div>
  <p>The outcomes that make an event happen are its <b>favourable outcomes</b>. For “an even number” on a die, there are 3 favourable outcomes out of 6.</p>
  <p>Tossing two coins has 4 outcomes: HH, HT, TH, TT. HT and TH are different — the first coin and second coin differ.</p>` },
      { kind: 'card', title: 'Calculating probability', html: `
  <div class="formula">P(E) = number of favourable outcomes ÷ total number of possible outcomes</div>
  <p>This works when all outcomes are <b>equally likely</b>, like a fair die, a fair coin, or picking from a well-mixed bag.</p>
  <div class="eg"><b>Example 1</b> A die is rolled. P(even number) = 3 ÷ 6 = <b>1/2</b> = 0.5.</div>
  <div class="eg"><b>Example 2</b> A bag has 3 red and 5 blue marbles. One is picked without looking.<br>Total = 3 + 5 = 8. Favourable (red) = 3.<br>P(red) = <b>3/8</b> = 0.375.</div>
  <div class="warn"><b>Careful</b> Divide by the <i>total</i> (8), not by the other colour (5). 3/5 compares red with blue; it is not a probability.</div>
  <p>Always simplify the fraction where you can: 3/6 = 1/2.</p>` },
      { kind: 'card', title: 'The 0 to 1 scale', html: `
  <p>Every probability lies between <b>0</b> and <b>1</b>.</p>
  <div class="formula">0 ≤ P(E) ≤ 1</div>
  <ul>
  <li><b>0</b> means the event cannot happen: rolling a 7 on a normal die.</li>
  <li><b>1</b> means the event is certain: rolling a number less than 7.</li>
  <li><b>0.5</b> (or 1/2) is an even chance: heads on a fair coin.</li>
  </ul>
  <p>You can write the same probability three ways: <b>1/4 = 0.25 = 25%</b>. Weather apps use percentages: “70% chance of rain” means P = 0.7.</p>
  <div class="warn"><b>Careful</b> A probability can never be negative or more than 1. If your answer is 8/5 or 1.2, the favourable count is bigger than the total — check your working.</div>` },
      { kind: 'check', concepts: ['outcomes', 'prob-formula', 'prob-scale'], n: 3 },
      { kind: 'card', title: 'Types of events', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Type</th><th>Probability</th><th>Die example</th></tr></thead>
  <tbody>
  <tr><td><b>Sure (certain)</b></td><td>exactly 1</td><td>A number less than 7</td></tr>
  <tr><td><b>Impossible</b></td><td>exactly 0</td><td>A 7</td></tr>
  <tr><td><b>Likely</b></td><td>more than 1/2</td><td>A number greater than 2 (4/6)</td></tr>
  <tr><td><b>Unlikely</b></td><td>less than 1/2</td><td>A 6 (1/6)</td></tr>
  <tr><td><b>Equally likely</b></td><td>same chance as each other</td><td>Odd (3/6) and even (3/6)</td></tr>
  </tbody></table></div>
  <p>“Equally likely” describes outcomes or events that have the <b>same</b> probability. Heads and tails on a fair coin are equally likely: each is 1/2. Each face of a fair die is equally likely: 1/6.</p>
  <div class="key"><b>Key idea</b> Work out the probability first, then name the type: 1 sure, 0 impossible, above 1/2 likely, below 1/2 unlikely.</div>` },
      { kind: 'card', title: 'When outcomes are not equally likely', html: `
  <p>A spinner has three colours. Red covers <b>half</b> the circle, blue a <b>quarter</b> and green a <b>quarter</b>.</p>
  <p>Ravi says: “Three colours, so P(red) = 1/3.” That is wrong. The colours are <b>not equally likely</b> — red has a much bigger area.</p>
  <div class="eg"><b>Fix</b> Split the spinner into 4 equal quarters: red, red, blue, green. Now the quarters are equally likely, so P(red) = 2/4 = <b>1/2</b>, P(blue) = 1/4, P(green) = 1/4.</div>
  <p>The same trap appears in sentences like “Either it rains tomorrow or it doesn’t, so it’s 50-50.” Two possible outcomes do not make them equally likely. In the Thar Desert, a dry day is far more likely than a rainy one.</p>
  <div class="warn"><b>Careful</b> Use “favourable ÷ total” only when every outcome has the same chance.</div>` },
      { kind: 'check', concepts: ['event-types'], n: 3 },
      { kind: 'card', title: 'Experimental vs theoretical probability', html: `
  <p><b>Theoretical probability</b> comes from reasoning: a fair coin has 2 equally likely outcomes, so P(heads) = 1/2.</p>
  <p><b>Experimental probability</b> comes from doing trials and counting:</p>
  <div class="formula">Experimental P(E) = number of times E happened ÷ number of trials</div>
  <div class="eg"><b>Example</b> Arjun tosses a coin 10 times and gets 7 heads. Experimental P(heads) = 7/10 = 0.7.</div>
  <p>Is the coin unfair? Not necessarily. With only 10 tosses, results jump around a lot. Suppose the class tosses coins 1000 times in total and gets 508 heads: 508/1000 = 0.508, very close to 0.5.</p>
  <div class="key"><b>Key idea</b> As the number of trials grows, experimental probability usually gets closer to the theoretical probability.</div>` },
      { kind: 'lab', lab: 'probability-sim', title: 'Probability Simulator', intro: 'Toss coins, roll dice and spin an uneven spinner 10, 100 or 1000 times. Compare the experimental bars with the theoretical ones, then name four types of events.' },
      { kind: 'card', title: 'Probability inside AI', html: `
  <p>AI systems speak the language of probability.</p>
  <ul>
  <li>An email filter gives a message a <b>spam probability</b> of 0.97. Above a set threshold, it moves it to the spam folder.</li>
  <li>An image app outputs <b>Cat 0.85, Dog 0.10, Other 0.05</b>. These add up to 1, because one of the labels must apply.</li>
  <li>A language model chooses its next word from a list of words, each with a probability.</li>
  </ul>
  <p>Some of these probabilities come from counting, like experimental probability: if 970 of 1000 similar past emails were spam, a new one like them is very likely spam.</p>
  <div class="warn"><b>Careful</b> 0.97 is likely, not sure. That is why spam folders sometimes catch real emails, and why you should check them now and then.</div>` },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>Wrong total</b> 3 red and 5 blue: P(red) = 3/8, not 3/5. Divide by <i>all</i> outcomes.</div>
  <div class="warn"><b>Two outcomes ≠ 50-50</b> Only equally likely outcomes share the chance equally.</div>
  <div class="warn"><b>Missing outcomes</b> Two coins give 4 outcomes (HH, HT, TH, TT), not 3.</div>
  <div class="warn"><b>Impossible answers</b> A probability above 1 or below 0 means a counting mistake.</div>
  <div class="warn"><b>Few trials</b> 7 heads in 10 tosses does not prove a coin is unfair. Collect many more trials.</div>
  <div class="warn"><b>“Likely” is not “sure”</b> A 5/6 event can still fail to happen.</div>` },
      { kind: 'check', concepts: ['exp-vs-theory', 'chance'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u3-04-q01', c: 'chance', t: 'mcq', d: 1, q: 'Probability is a way of…', o: ['measuring how likely an event is to happen', 'making sure an event will definitely happen', 'counting how many times you have tried something', 'finding the middle value of a data set'], a: 0, ex: 'Probability gives a number to how likely an event is. It does not make anything happen or guarantee a result.' },
      { id: 'u3-04-q02', c: 'chance', t: 'tf', d: 1, q: 'A coin toss is used before a cricket match because, with a fair coin, each captain has an equal chance of winning it.', a: true, ex: 'Heads and tails are equally likely (1/2 each), so neither captain has an advantage.' },
      { id: 'u3-04-q03', c: 'chance', t: 'mcq', d: 2, q: 'Which of these involves chance (uncertainty)?', o: ['Whether it will rain during tomorrow’s match', 'The number of days in a week', 'The answer to 2 + 3', 'The date of India’s Independence Day'], a: 0, mis: { 1: 'A week always has 7 days — there is nothing uncertain about it.', 3: 'Independence Day is always 15 August, so there is no chance involved.' }, ex: 'Tomorrow’s weather is uncertain; the other three are fixed facts.' },
      { id: 'u3-04-q04', c: 'chance', t: 'mcq', d: 3, q: 'A weather report says: “There is a high chance of rain in Mumbai tomorrow.” What does this mean?', o: ['Rain is likely, but it is not certain', 'It will definitely rain all day tomorrow', 'It will rain for exactly half of tomorrow', 'Rain is impossible in Mumbai tomorrow'], a: 0, mis: { 1: 'A high chance is not certainty. Probability tells you how likely something is, not that it will surely happen.', 2: 'Probability is not about what fraction of the day it rains — it is how likely rain is.' }, ex: '“High chance” means likely (a probability above 1/2, possibly close to 1), but not sure. It may still stay dry.' },
      { id: 'u3-04-q05', c: 'outcomes', t: 'mcq', d: 1, q: 'In probability, an <b>outcome</b> is…', o: ['one possible result of an experiment', 'the total number of experiments done', 'a guess about which result is best', 'the probability written as a percentage'], a: 0, ex: 'Each possible result — like getting a 4 on a die — is one outcome.' },
      { id: 'u3-04-q06', c: 'outcomes', t: 'num', d: 1, q: 'A normal six-sided die is rolled. How many possible outcomes are there?', a: 6, unit: 'outcomes', ex: 'The die can land on 1, 2, 3, 4, 5 or 6 — six outcomes.' },
      { id: 'u3-04-q07', c: 'outcomes', t: 'mcq', d: 2, q: 'A die is rolled. Which outcomes are favourable for the event “getting an even number”?', o: ['2, 4, 6', '1, 3, 5', '1, 2, 3', '6 only'], a: 0, mis: { 1: '1, 3 and 5 are odd numbers. Even numbers divide exactly by 2.', 3: '6 is even, but so are 2 and 4.' }, ex: 'The even numbers on a die are 2, 4 and 6, so there are 3 favourable outcomes.' },
      { id: 'u3-04-q08', c: 'outcomes', t: 'mcq', d: 2, q: 'Two coins are tossed together. How many possible outcomes are there?', o: ['4', '2', '3', '6'], a: 0, mis: { 1: 'Each coin has 2 outcomes, and the two coins combine: HH, HT, TH, TT.', 2: 'HT (first coin heads) and TH (first coin tails) are different outcomes, so there are 4, not 3.' }, ex: 'The outcomes are HH, HT, TH and TT — 4 in total.' },
      { id: 'u3-04-q09', c: 'outcomes', t: 'match', d: 2, q: 'Match each experiment to its number of equally likely outcomes.', pairs: [['Tossing one coin', '2'], ['Rolling one die', '6'], ['Picking a day of the week at random', '7'], ['Tossing two coins', '4']], ex: 'Coin: H, T. Die: 1–6. Days: Monday to Sunday. Two coins: HH, HT, TH, TT.' },
      { id: 'u3-04-q10', c: 'outcomes', t: 'multi', d: 2, q: 'A die is rolled. Which outcomes are favourable for “a number greater than 4”? Select all that apply.', o: ['1', '2', '3', '4', '5', '6'], a: [4, 5], ex: '“Greater than 4” means 5 or 6. The number 4 itself is not greater than 4.' },
      { id: 'u3-04-q11', c: 'prob-formula', t: 'mcq', d: 1, q: 'When all outcomes are equally likely, P(E) = …', o: ['favourable outcomes ÷ total possible outcomes', 'total possible outcomes ÷ favourable outcomes', 'favourable outcomes − unfavourable outcomes', 'favourable outcomes × total possible outcomes'], a: 0, ex: 'Probability compares the favourable outcomes with all possible outcomes: favourable ÷ total. This always gives a value from 0 to 1.' },
      { id: 'u3-04-q12', c: 'prob-formula', t: 'mcq', d: 2, q: 'A bag has 3 red and 5 blue marbles. One is picked without looking. What is P(red)?', o: ['3/8', '3/5', '5/8', '1/3'], a: 0, mis: { 1: '3/5 compares red with blue. Divide by the total number of marbles, 3 + 5 = 8.', 2: '5/8 is the probability of blue, not red.' }, ex: 'Total = 3 + 5 = 8. Favourable (red) = 3. P(red) = 3/8.' },
      { id: 'u3-04-q13', c: 'prob-formula', t: 'num', d: 2, q: 'A die is rolled. What is the probability of a number less than 3? Give your answer as a decimal to 2 decimal places.', a: 0.33, tol: 0.005, ex: 'Favourable: 1 and 2 (2 outcomes). Total: 6. P = 2/6 = 1/3 ≈ 0.33.' },
      { id: 'u3-04-q14', c: 'prob-formula', t: 'mcq', d: 3, q: 'A spinner has 8 equal sectors numbered 1 to 8. What is the probability of landing on a multiple of 3?', o: ['1/4', '3/8', '1/3', '1/8'], a: 0, mis: { 1: 'The multiples of 3 from 1 to 8 are only 3 and 6 — that is 2 sectors, not 3.', 2: '1/3 is not found by the formula. Count favourable sectors (3, 6) and divide by 8.', 3: '6 is also a multiple of 3, so there are 2 favourable sectors.' }, ex: 'Multiples of 3 up to 8: 3 and 6. P = 2/8 = 1/4.' },
      { id: 'u3-04-q15', c: 'prob-formula', t: 'num', d: 3, q: 'A class has 18 girls and 12 boys. One student’s name is picked at random to be quiz captain. What is the probability that a girl is picked? Give your answer as a decimal.', a: 0.6, tol: 0.001, ex: 'Total = 18 + 12 = 30. P(girl) = 18/30 = 3/5 = 0.6.' },
      { id: 'u3-04-q16', c: 'prob-formula', t: 'mcq', d: 3, q: 'Cards numbered 1 to 20 are shuffled and one is drawn. What is the probability that it shows a prime number?', o: ['2/5', '9/20', '1/2', '3/10'], a: 0, mis: { 1: '1 is not a prime number. The primes up to 20 are 2, 3, 5, 7, 11, 13, 17, 19 — that is 8.', 2: 'Half the numbers are odd, but not every odd number is prime (9 and 15 are not) and 2 is prime.' }, ex: 'Primes from 1 to 20: 2, 3, 5, 7, 11, 13, 17, 19 = 8 numbers. P = 8/20 = 2/5.' },
      { id: 'u3-04-q17', c: 'prob-formula', t: 'num', d: 2, q: 'A box has 4 green, 6 yellow and 10 white balls. One is picked at random. What is P(yellow)? Give your answer as a decimal.', a: 0.3, tol: 0.001, ex: 'Total = 4 + 6 + 10 = 20. P(yellow) = 6/20 = 3/10 = 0.3.' },
      { id: 'u3-04-q18', c: 'prob-scale', t: 'mcq', d: 1, q: 'The probability of any event always lies…', o: ['between 0 and 1, including 0 and 1', 'between 1 and 100', 'between −1 and 1', 'above 1 for likely events'], a: 0, ex: '0 means impossible and 1 means certain. Every probability is somewhere from 0 to 1.' },
      { id: 'u3-04-q19', c: 'prob-scale', t: 'tf', d: 2, q: 'A probability of 1.2 is possible for an event that is extremely likely.', a: false, ex: 'The highest possible probability is 1 (certain). A value above 1 means the favourable count exceeds the total — a mistake.' },
      { id: 'u3-04-q20', c: 'prob-scale', t: 'order', d: 2, q: 'A normal die is rolled. Order these events from LEAST likely to MOST likely.', items: ['Rolling a 7', 'Rolling a 6', 'Rolling an even number', 'Rolling a number greater than 1', 'Rolling a number less than 7'], ex: 'Their probabilities are 0, 1/6, 3/6, 5/6 and 6/6 (= 1), in that order.' },
      { id: 'u3-04-q21', c: 'prob-scale', t: 'mcq', d: 2, q: 'A forecast gives a probability of 0.75 for rain. Written as a percentage, that is…', o: ['75%', '7.5%', '0.75%', '750%'], a: 0, mis: { 1: 'To convert a decimal to a percentage, multiply by 100: 0.75 × 100 = 75.', 2: '0.75% would be a tiny chance. Multiply 0.75 by 100 to get the percentage.' }, ex: '0.75 × 100 = 75%, which also equals 3/4.' },
      { id: 'u3-04-q22', c: 'prob-scale', t: 'match', d: 2, q: 'Match each probability to its meaning.', pairs: [['0', 'Impossible'], ['1', 'Certain'], ['0.5', 'Even chance'], ['0.9', 'Very likely']], ex: '0 and 1 are the ends of the scale. 0.5 is exactly halfway; 0.9 is close to 1, so very likely.' },
      { id: 'u3-04-q23', c: 'event-types', t: 'mcq', d: 1, q: 'An event with probability 0 is called…', o: ['an impossible event', 'a sure event', 'a likely event', 'an equally likely event'], a: 0, ex: 'Probability 0 means the event can never happen, e.g. rolling a 7 on a normal die.' },
      { id: 'u3-04-q24', c: 'event-types', t: 'mcq', d: 1, q: 'A sure (certain) event has probability…', o: ['1', '0', '1/2', '100'], a: 0, mis: { 3: 'As a percentage it is 100%, but as a probability number it is 1.' }, ex: 'A sure event always happens, so all outcomes are favourable: P = total ÷ total = 1.' },
      { id: 'u3-04-q25', c: 'event-types', t: 'bins', d: 2, q: 'Sort each event as likely or unlikely.', bins: ['Likely', 'Unlikely'], items: [['Rolling a number greater than 2 on a die', 0], ['Rolling a 1 on a die', 1], ['Picking a red ball from 7 red and 3 blue', 0], ['Getting two heads when tossing two coins', 1], ['Not rolling a 6 on a die', 0], ['Picking a blue ball from 7 red and 3 blue', 1]], ex: 'Likely means more than 1/2: 4/6, 7/10, 5/6. Unlikely means less than 1/2: 1/6, 1/4, 3/10.' },
      { id: 'u3-04-q26', c: 'event-types', t: 'bins', d: 2, q: 'Sort each event or pair of outcomes into the right group.', bins: ['Sure', 'Impossible', 'Equally likely'], items: [['A normal die shows a number less than 10', 0], ['A normal die shows 0', 1], ['Heads and tails on a fair coin', 2], ['A month has 35 days', 1], ['Odd and even on a fair die', 2], ['A coin lands on heads or tails', 0]], ex: 'Sure: every outcome is favourable (P = 1). Impossible: no outcome is favourable (P = 0). Equally likely: the outcomes have the same probability (1/2 each here).' },
      { id: 'u3-04-q27', c: 'event-types', t: 'mcq', d: 2, q: 'P(rolling a number greater than 1 on a die) = 5/6. What type of event is this?', o: ['Likely', 'Sure', 'Unlikely', 'Impossible'], a: 0, mis: { 1: '5/6 is close to 1 but not equal to 1 — rolling a 1 is still possible.', 2: '5/6 is more than 1/2, so the event is likely.' }, ex: '5/6 is more than 1/2 but less than 1, so the event is likely, not sure.' },
      { id: 'u3-04-q28', c: 'event-types', t: 'mcq', d: 2, q: 'A box has 2 red and 8 blue pens. Kabir picks one without looking. What type of event is “Kabir picks a red pen”?', o: ['Unlikely', 'Likely', 'Impossible', 'Sure'], a: 0, mis: { 2: 'There are 2 red pens, so it can happen. It is just less likely than not.', 1: 'P(red) = 2/10 = 1/5, which is less than 1/2.' }, ex: 'P(red) = 2/10 = 1/5. That is above 0 but below 1/2, so the event is unlikely.' },
      { id: 'u3-04-q29', c: 'event-types', t: 'mcq', d: 3, q: 'A fair die is rolled. Which pair of events is equally likely?', o: ['Getting an odd number and getting an even number', 'Getting a 6 and not getting a 6', 'Getting a 1 and getting a number above 1', 'Getting a prime number and getting a 4'], a: 0, mis: { 1: 'P(6) = 1/6 but P(not 6) = 5/6. Two possibilities do not mean equal chances.', 3: 'Primes on a die are 2, 3, 5, so P(prime) = 3/6, while P(4) = 1/6.' }, ex: 'Odd (1, 3, 5) and even (2, 4, 6) each have 3 of the 6 outcomes, so both have probability 1/2.' },
      { id: 'u3-04-q30', c: 'event-types', t: 'tf', d: 2, q: 'If an experiment has only two possible outcomes, those outcomes are always equally likely.', a: false, ex: 'Two outcomes can have very different chances — a spinner that is three-quarters red, or rain versus no rain in a desert.' },
      { id: 'u3-04-q31', c: 'event-types', t: 'mcq', d: 3, q: 'On a spinner, red covers half the circle, blue a quarter and green a quarter. Ravi says P(red) = 1/3 because there are 3 colours. Is he right?', o: ['No — the colours are not equally likely; P(red) = 1/2', 'Yes — three colours always means 1/3 each', 'No — P(red) = 1/4 because red is one of four parts', 'Yes — but only if the spinner is spun 3 times'], a: 0, mis: { 1: 'The formula needs equally likely outcomes. Red covers more area than blue or green.', 2: 'Red covers two of the four equal quarters, so P(red) = 2/4 = 1/2.' }, ex: 'Split the spinner into four equal quarters: red, red, blue, green. Now each quarter is equally likely, and red has 2 of 4, so P(red) = 1/2.' },
      { id: 'u3-04-q32', c: 'exp-vs-theory', t: 'mcq', d: 1, q: 'Experimental probability is found by…', o: ['doing trials and dividing how often the event happened by the number of trials', 'reasoning about equally likely outcomes without doing any trials', 'guessing a number between 0 and 1 that feels right', 'asking someone else what they think will happen'], a: 0, ex: 'Experimental P = times the event happened ÷ number of trials. Reasoning without trials gives theoretical probability.' },
      { id: 'u3-04-q33', c: 'exp-vs-theory', t: 'num', d: 2, q: 'Sana tosses a coin 20 times and gets 13 heads. What is the experimental probability of heads? Give your answer as a decimal.', a: 0.65, tol: 0.001, ex: 'Experimental P(heads) = 13 ÷ 20 = 0.65. The theoretical value is 0.5.' },
      { id: 'u3-04-q34', c: 'exp-vs-theory', t: 'mcq', d: 2, q: 'A die is rolled 60 times and a 6 comes up 14 times. What is the experimental probability of getting a 6?', o: ['7/30', '1/6', '7/23', '1/14'], a: 0, mis: { 1: '1/6 is the theoretical probability. The experimental one uses the results: 14 out of 60.', 2: '7/23 is 14/46 — dividing by the rolls that were not 6. Divide by all 60 rolls.' }, ex: 'Experimental P(6) = 14/60 = 7/30 (about 0.23). The theoretical value is 1/6 = 10/60.' },
      { id: 'u3-04-q35', c: 'exp-vs-theory', t: 'mcq', d: 3, q: 'Diya tosses a coin 10 times and gets 7 heads. She says the coin must be unfair. What is the best response?', o: ['10 tosses is too few — toss it many more times and see if heads stays near 0.7', 'She is right — 7 heads proves the coin is unfair', 'She is wrong — a coin always gives exactly 5 heads in 10 tosses', 'Probability cannot be used to study coins'], a: 0, mis: { 1: 'Small samples vary a lot. A fair coin gives 7 or more heads in 10 tosses fairly often.', 2: 'A fair coin does not give exactly 5 heads every time — results vary, especially in short runs.' }, ex: 'With few trials, experimental results jump around. With many more tosses, a fair coin’s proportion of heads should settle close to 0.5.' },
      { id: 'u3-04-q36', c: 'exp-vs-theory', t: 'tf', d: 2, q: 'As the number of trials increases, the experimental probability usually gets closer to the theoretical probability.', a: true, ex: 'With more trials, random ups and downs balance out — e.g. 508 heads in 1000 tosses (0.508) is close to 0.5.' },
      { id: 'u3-04-q37', c: 'chance', t: 'multi', d: 3, q: 'An email filter gives a message a spam probability of 0.97. Which statements are true? Select all that apply.', o: ['The filter thinks the email is very likely spam', 'The email could still be a genuine message', '0.97 is greater than 1/2, so “spam” is a likely event', 'The email is certainly spam', 'There is a 97% chance the email came from a friend'], a: [0, 1, 2], ex: '0.97 is close to 1, so spam is very likely — but not sure, so a real email can be caught. The number is about spam, not about who sent it.' }
    ],
    gens: ['prob-basic', 'event-type']
  }
  ,
  {
    id: 'u3-05',
    title: 'Probability in Sports, Weather and Traffic',
    minutes: 60,
    outcomes: [
      'Apply probability to real-life scenarios in sports, weather forecasting and traffic estimation',
      'Use the complement rule P(not E) = 1 − P(E)',
      'Read probability statements in forecasts and use them to make sensible decisions'
    ],
    hook: 'A TV win meter says your team has a 20% chance with 3 overs left. Should you switch off? Probability says: not yet.',
    concepts: {
      'complement': 'The complement rule: P(not E) = 1 − P(E)',
      'prob-sports': 'Probability in sports',
      'prob-weather': 'Reading weather forecasts',
      'prob-traffic': 'Probability in traffic estimation',
      'prob-revise': 'Revision: calculating probability and types of events'
    },
    steps: [
      { kind: 'card', title: 'The complement: what does NOT happen', html: `
  <p>A forecast says there is a <b>70% chance of rain</b>. What is the chance it stays dry? Either it rains or it doesn’t, and the two chances must add up to 100%. So the chance of no rain is <b>30%</b>.</p>
  <div class="def"><dfn>Complement</dfn> The complement of event E is “E does not happen”, written “not E”.</div>
  <div class="formula">P(not E) = 1 − P(E)</div>
  <div class="eg"><b>Example</b> A die is rolled. P(6) = 1/6.<br>P(not 6) = 1 − 1/6 = <b>5/6</b>.</div>
  <div class="eg"><b>Example</b> A train is on time with probability 0.85.<br>P(not on time) = 1 − 0.85 = <b>0.15</b>.</div>
  <p>The complement is often the quickest route: counting what does <i>not</i> happen can be easier than counting what does.</p>` },
      { kind: 'card', title: 'Probability in sports', html: `
  <p>Cricket broadcasts sometimes show a <b>win-probability meter</b> that changes after every ball. How can anyone put a number on a match that has not finished?</p>
  <p>Such meters are built from <b>data on many past matches</b>. For situations like the current one — runs needed, balls left, wickets in hand, the venue — the model checks how often the team in this position went on to win. If similar teams won about 80 times out of 100, the meter shows 80%.</p>
  <p>Teams use probability too. Analysts study how often a batter gets out to a certain kind of delivery, and bowlers plan around it. Coaches decide field placements based on where a batter hits most often.</p>
  <div class="key"><b>Key idea</b> In sports, probability comes from past data and helps plan strategy — but the game is still played on the field.</div>` },
      { kind: 'card', title: 'Run rates and changing chances', html: `
  <p>A team chasing a target needs <b>54 runs off the last 6 overs</b>.</p>
  <div class="formula">Required run rate = runs needed ÷ overs left</div>
  <div class="eg"><b>Now</b> 54 ÷ 6 = <b>9 runs per over</b>.<br><b>Two overs later</b> they have scored 14, so they need 40 off 4 overs: 40 ÷ 4 = <b>10 runs per over</b>.</div>
  <p>Fewer runs are needed, but the required rate has gone <i>up</i>, so the task is harder. A win meter would usually show the chasing team’s chance going down.</p>
  <p>If one team’s win probability is 64% and the match must have a winner, the other team’s chance is the complement: 100% − 64% = <b>36%</b>.</p>
  <div class="warn"><b>Careful</b> A team at 20% is unlikely to win, not certain to lose. Upsets happen — about 1 time in 5 at 20%.</div>` },
      { kind: 'check', concepts: ['complement', 'prob-sports'], n: 3 },
      { kind: 'card', title: 'Reading weather forecasts', html: `
  <p>“<b>60% chance of rain tomorrow</b>” does not mean it will rain for 60% of the day. It means rain is <b>likely</b>: on days with conditions like tomorrow’s, rain falls more often than not — roughly 6 times out of 10.</p>
  <p>The India Meteorological Department (IMD) also issues <b>colour-coded warnings</b> for districts:</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Colour</th><th>Message</th></tr></thead>
  <tbody>
  <tr><td>Green</td><td>No warning — no action needed</td></tr>
  <tr><td>Yellow</td><td>Watch — be updated</td></tr>
  <tr><td>Orange</td><td>Alert — be prepared</td></tr>
  <tr><td>Red</td><td>Warning — take action</td></tr>
  </tbody></table></div>
  <p>Cyclone track maps often show a <b>cone of uncertainty</b>: the storm’s centre is expected to stay inside the cone, which grows wider further ahead because the forecast becomes less certain.</p>` },
      { kind: 'card', title: 'Deciding with probabilities', html: `
  <p>A probability alone does not tell you what to do. You also weigh <b>what is at stake</b>.</p>
  <div class="cols">
  <div class="mini"><h4>🌾 Farmer</h4><p>80% chance of heavy rain tomorrow. Spraying pesticide today would be washed off, so she waits.</p></div>
  <div class="mini"><h4>🏫 Sports day</h4><p>20% chance of rain. Rain is unlikely, so the event goes ahead — with a plan to move indoors if needed.</p></div>
  <div class="mini"><h4>🌀 Cyclone</h4><p>Even a modest chance of landfall near a town leads to evacuation plans, because the harm would be so serious.</p></div>
  </div>
  <div class="key"><b>Key idea</b> When the harm is serious, act even on an unlikely event. When the cost is small, you can accept more risk.</div>` },
      { kind: 'check', concepts: ['prob-weather', 'complement'], n: 2 },
      { kind: 'card', title: 'Probability in traffic estimation', html: `
  <p>When you ask a map app such as Google Maps for directions, it estimates your travel time. It combines <b>live data</b> — how fast phones on the road are moving right now — with <b>past patterns</b> for that road at that time and day.</p>
  <p>Because traffic is uncertain, apps often show a <b>range</b>, like “25–35 min”, and may warn that a route is usually busy at that hour.</p>
  <div class="eg"><b>Example</b> Route A usually takes 30 minutes, but on about half of evenings a jam makes it 60 minutes. Route B always takes about 40 minutes. Your train leaves in 50 minutes.<br>Route A gives roughly a 1/2 chance of missing the train. Route B is the safer choice.</div>
  <p>Your own data works too: if your bus was late on 5 of the last 20 school days, an estimate for tomorrow is 5/20 = 0.25.</p>` },
      { kind: 'card', title: 'Probability is not a promise', html: `
  <p>A coin lands heads <b>five times in a row</b>. Is tails now “due”? No. The coin has no memory. On the next toss, P(tails) is still <b>1/2</b>.</p>
  <p>Believing that past random results change the next one is a common mistake. Each toss of a fair coin, and each roll of a fair die, is a fresh start.</p>
  <div class="warn"><b>Careful</b> “80% chance” means the event happens in about 80 of 100 similar cases — so in about 20 of them it does not. A forecast that said 80% rain was not “wrong” on a dry day.</div>
  <p>This is why AI systems in weather, sport and traffic are judged over many predictions, not one. A good forecaster’s 70% days should turn out rainy about 70% of the time.</p>` },
      { kind: 'card', title: 'Revision: Unit 3 probability toolkit', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Tool</th><th>Remember</th></tr></thead>
  <tbody>
  <tr><td>Formula</td><td>P(E) = favourable ÷ total (equally likely outcomes)</td></tr>
  <tr><td>Scale</td><td>0 ≤ P(E) ≤ 1; also as % (0.25 = 25%)</td></tr>
  <tr><td>Sure / impossible</td><td>P = 1 / P = 0</td></tr>
  <tr><td>Likely / unlikely</td><td>more than 1/2 / less than 1/2</td></tr>
  <tr><td>Equally likely</td><td>outcomes with the same probability</td></tr>
  <tr><td>Complement</td><td>P(not E) = 1 − P(E)</td></tr>
  <tr><td>Experimental</td><td>times it happened ÷ number of trials</td></tr>
  </tbody></table></div>
  <div class="key"><b>Key idea</b> Sports, weather and traffic predictions all use these same ideas, powered by large amounts of past data.</div>` },
      { kind: 'check', concepts: ['prob-traffic', 'prob-revise'], n: 3 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u3-05-q01', c: 'complement', t: 'mcq', d: 1, q: 'Which rule gives the probability that event E does <b>not</b> happen?', o: ['P(not E) = 1 − P(E)', 'P(not E) = P(E) − 1', 'P(not E) = 1 ÷ P(E)', 'P(not E) = P(E) + 1'], a: 0, ex: 'An event and its complement together are certain (P = 1), so P(not E) = 1 − P(E).' },
      { id: 'u3-05-q02', c: 'complement', t: 'num', d: 1, q: 'The probability of rain tomorrow is 0.7. What is the probability of no rain? Give your answer as a decimal.', a: 0.3, tol: 0.001, ex: 'P(no rain) = 1 − 0.7 = 0.3.' },
      { id: 'u3-05-q03', c: 'complement', t: 'mcq', d: 2, q: 'A die is rolled. What is the probability of <b>not</b> getting a 6?', o: ['5/6', '1/6', '6/5', '1/5'], a: 0, mis: { 1: '1/6 is P(6). The complement is 1 − 1/6.', 2: 'A probability cannot be more than 1. 5 favourable outcomes out of 6 gives 5/6.', 3: 'There are 6 outcomes in total, and 5 of them are not 6, so the answer is 5/6.' }, ex: 'P(not 6) = 1 − 1/6 = 5/6. Check: 1, 2, 3, 4, 5 are 5 favourable outcomes out of 6.' },
      { id: 'u3-05-q04', c: 'complement', t: 'mcq', d: 2, q: 'The probability that a train arrives on time is 0.85. What is the probability that it does not arrive on time?', o: ['0.15', '0.85', '1.85', '0.25'], a: 0, mis: { 1: '0.85 is the probability of arriving on time. Subtract it from 1.', 2: 'A probability cannot be more than 1. Use 1 − 0.85.' }, ex: 'P(not on time) = 1 − 0.85 = 0.15.' },
      { id: 'u3-05-q05', c: 'complement', t: 'mcq', d: 3, q: 'A win meter shows Team A at 64%. Assuming the match must have a winner, what should it show for Team B?', o: ['36%', '64%', '50%', '46%'], a: 0, mis: { 1: 'Both teams cannot have 64% — together the chances must add up to 100%.', 2: 'The teams are not equally likely here; the meter already says Team A is favoured.' }, ex: 'Team B winning is the complement of Team A winning: 100% − 64% = 36%.' },
      { id: 'u3-05-q06', c: 'complement', t: 'tf', d: 1, q: 'The probabilities of an event and its complement always add up to 1.', a: true, ex: 'Either the event happens or it doesn’t — one of the two is certain — so P(E) + P(not E) = 1.' },
      { id: 'u3-05-q07', c: 'complement', t: 'num', d: 3, q: 'A bag has 5 red, 3 green and 2 yellow balls. One is picked at random. What is the probability that it is <b>not</b> green? Give your answer as a decimal.', a: 0.7, tol: 0.001, ex: 'Total = 5 + 3 + 2 = 10. P(green) = 3/10 = 0.3, so P(not green) = 1 − 0.3 = 0.7.' },
      { id: 'u3-05-q08', c: 'complement', t: 'mcq', d: 3, q: 'Meera says: “P(rain) is 0.4, so P(no rain) is also 0.4, because there are only two possibilities.” What is the correct value of P(no rain)?', o: ['0.6, because 1 − 0.4 = 0.6', '0.4, because the two must be equal', '0.5, because there are two possibilities', '1.4, because the two are added together'], a: 0, mis: { 1: 'Complements are not equal unless each is 0.5. They must add to 1.', 2: 'Two possibilities do not make them equally likely. Use 1 − P(rain).' }, ex: 'Rain and no rain are complements, so they add to 1: P(no rain) = 1 − 0.4 = 0.6.' },
      { id: 'u3-05-q09', c: 'prob-sports', t: 'mcq', d: 1, q: 'How do cricket teams and broadcasters mainly use probability?', o: ['To estimate chances of winning and plan strategy from past data', 'To decide the final result before the match begins', 'To choose the colour of the team jerseys', 'To make sure the favourite team always wins'], a: 0, ex: 'Probability from past match data helps estimate win chances and plan bowling, batting and field placements.' },
      { id: 'u3-05-q10', c: 'prob-sports', t: 'mcq', d: 2, q: 'A win meter shows the chasing team at 80%. What does this mean?', o: ['In many past matches with a similar situation, the team in this position won about 80 times in 100', 'The chasing team will definitely win the match', 'The chasing team will score 80% of the remaining runs', 'The chasing team has won 80 matches in its history'], a: 0, mis: { 1: '80% is likely, not certain. The other team still wins about 20 times in 100 such situations.', 2: 'The number is a chance of winning, not a share of runs.' }, ex: 'Win-probability models compare the current situation with many past ones and report how often teams in that position won.' },
      { id: 'u3-05-q11', c: 'prob-sports', t: 'num', d: 2, q: 'A batter scored 50 or more in 12 of her last 40 innings. Based on this, what is the experimental probability that she scores 50 or more in her next innings? Give your answer as a decimal.', a: 0.3, tol: 0.001, ex: 'Experimental P = 12 ÷ 40 = 0.3. It is an estimate from past data, not a guarantee.' },
      { id: 'u3-05-q12', c: 'prob-sports', t: 'mcq', d: 3, q: 'A chasing team needs 54 runs off 6 overs. Two overs later it needs 40 off 4 overs. What has most likely happened to its win probability?', o: ['It has fallen, because the required rate rose from 9 to 10 runs per over', 'It has risen, because fewer runs are now needed', 'It has stayed the same, because the target has not changed', 'It is now 0, because 40 runs cannot be scored in 4 overs'], a: 0, mis: { 1: 'Fewer runs remain, but fewer balls too: 40 ÷ 4 = 10 an over is harder than 54 ÷ 6 = 9.', 3: '10 runs an over is hard but possible, so the probability is not 0.' }, ex: 'Required rate was 54 ÷ 6 = 9; now it is 40 ÷ 4 = 10. A higher required rate makes the chase harder, so win probability usually falls.' },
      { id: 'u3-05-q13', c: 'prob-sports', t: 'tf', d: 2, q: 'If a team has a 90% chance of winning, it cannot lose.', a: false, ex: '90% is very likely but not sure. In about 10 of every 100 such situations, the other team wins.' },
      { id: 'u3-05-q14', c: 'prob-sports', t: 'multi', d: 2, q: 'Which information would help a model estimate a chasing team’s chance of winning? Select all that apply.', o: ['Runs still needed', 'Balls remaining', 'Wickets in hand', 'The colour of the team’s jersey', 'The number of flags in the stands'], a: [0, 1, 2], ex: 'Runs needed, balls left and wickets in hand directly affect the result. Jersey colour and flags do not.' },
      { id: 'u3-05-q15', c: 'prob-sports', t: 'mcq', d: 3, q: 'Data shows a batter got out 6 times in 20 short-pitched balls, but only once in 20 full-length balls. Which plan should the bowler choose?', o: ['Bowl more short-pitched balls — about 0.3 chance of a wicket per ball vs 0.05', 'Bowl more full-length balls — they are the batter’s weakness', 'Mix them equally, because data cannot help in cricket', 'Bowl only wides, so the batter cannot get out'], a: 0, mis: { 1: 'Full balls got him out only 1 time in 20 (0.05). Short balls: 6 in 20 (0.3) — that is his weakness.', 2: 'This is exactly the kind of data teams use to plan.' }, ex: 'Experimental P(out) is 6/20 = 0.3 for short balls and 1/20 = 0.05 for full balls, so short-pitched balls give the better chance.' },
      { id: 'u3-05-q16', c: 'prob-weather', t: 'mcq', d: 1, q: 'A forecast says “60% chance of rain tomorrow”. What does this mean?', o: ['Rain is likely — on days like this it rains roughly 6 times out of 10', 'It will rain for 60% of tomorrow’s hours', 'It will definitely rain, but only lightly', 'Exactly 60 mm of rain will fall tomorrow'], a: 0, ex: 'The percentage is a probability: rain is more likely than not, but a dry day is still possible.' },
      { id: 'u3-05-q17', c: 'prob-weather', t: 'mcq', d: 2, q: 'In IMD’s colour-coded weather warnings, what does a <b>red</b> warning mean?', o: ['Take action — severe weather is expected', 'Be updated — keep watching the forecast', 'No warning — no action is needed', 'Be prepared — conditions may get worse'], a: 0, mis: { 1: 'That is the message of a yellow warning. Red is the most severe level.', 3: 'That is the orange (alert) level. Red means take action.' }, ex: 'IMD’s scale is Green (no action), Yellow (be updated), Orange (be prepared), Red (take action).' },
      { id: 'u3-05-q18', c: 'prob-weather', t: 'order', d: 1, q: 'Put IMD’s colour-coded warnings in order from least to most severe.', items: ['Green — no action needed', 'Yellow — be updated', 'Orange — be prepared', 'Red — take action'], ex: 'The colours step up from Green (no warning) through Yellow and Orange to Red (take action).' },
      { id: 'u3-05-q19', c: 'prob-weather', t: 'mcq', d: 3, q: 'The forecast for the school sports day shows a 20% chance of rain. What is the most sensible decision?', o: ['Go ahead, with a backup plan in case it rains', 'Cancel it, because rain is certain', 'Go ahead with no plan, because rain is impossible', 'Postpone it until a day with a 0% forecast'], a: 0, mis: { 1: '20% is unlikely, not certain.', 2: '20% is unlikely, but not impossible — a backup plan is wise.' }, ex: '20% means rain is unlikely but possible. Going ahead with a simple backup plan balances the small risk.' },
      { id: 'u3-05-q20', c: 'prob-weather', t: 'mcq', d: 3, q: 'A farmer plans to spray pesticide. The forecast gives an 80% chance of heavy rain tomorrow, which would wash the spray off. What should she do?', o: ['Wait and spray after the rain has passed', 'Spray today, because 80% means rain is not possible', 'Spray tomorrow during the rain to save time', 'Ignore the forecast, since probabilities are only guesses'], a: 0, mis: { 1: '80% means rain is very likely, not impossible.', 3: 'Forecasts are uncertain, but an 80% chance is strong evidence worth acting on.' }, ex: 'Heavy rain is likely and would waste the pesticide, so waiting is the sensible choice.' },
      { id: 'u3-05-q21', c: 'prob-weather', t: 'tf', d: 2, q: 'A 30% chance of rain means it is impossible for it to rain.', a: false, ex: '30% is unlikely, but not impossible. Only a probability of 0 means impossible.' },
      { id: 'u3-05-q22', c: 'prob-weather', t: 'mcq', d: 2, q: 'A forecast gives a 35% chance of rain. What is the chance of no rain?', o: ['65%', '35%', '135%', '50%'], a: 0, mis: { 1: '35% is the chance of rain. No rain is the complement: 100% − 35%.', 3: 'Rain and no rain are not equally likely here. Use 100% − 35%.' }, ex: 'P(no rain) = 100% − 35% = 65%.' },
      { id: 'u3-05-q23', c: 'prob-traffic', t: 'mcq', d: 1, q: 'How do map apps estimate travel time?', o: ['By combining live speeds on the road with past traffic patterns for that time and day', 'By dividing the distance by the speed limit and ignoring traffic', 'By asking each driver how fast they plan to go', 'By picking a random time between 10 and 60 minutes'], a: 0, ex: 'Apps use live data (how fast traffic is moving now) together with historical data for that road, day and time.' },
      { id: 'u3-05-q24', c: 'prob-traffic', t: 'mcq', d: 1, q: 'Why might a traffic app say “25–35 min” rather than an exact time?', o: ['Traffic is uncertain, so it gives a likely range', 'The app does not know how far away the place is', 'Exact times are not allowed by law', 'The app wants you to leave as early as possible'], a: 0, ex: 'Delays at signals and jams are uncertain, so a range shows the likely travel time.' },
      { id: 'u3-05-q25', c: 'prob-traffic', t: 'num', d: 2, q: 'Over the last 20 school days, Arjun’s bus was late on 5 days. Estimate the probability that it is late tomorrow. Give your answer as a decimal.', a: 0.25, tol: 0.001, ex: 'Experimental P(late) = 5 ÷ 20 = 0.25. It is an estimate based on recent data.' },
      { id: 'u3-05-q26', c: 'prob-traffic', t: 'mcq', d: 3, q: 'Route A usually takes 30 minutes, but on about half of evenings a jam makes it 60 minutes. Route B always takes about 40 minutes. Your train leaves in 50 minutes. Which route should you take?', o: ['Route B — it reliably arrives in time', 'Route A — it is usually the faster route', 'Route A — a jam is impossible today', 'Either — both are equally likely to make it'], a: 0, mis: { 1: 'Usually faster is not enough: there is about a 1/2 chance of a 60-minute trip, which misses the train.', 3: 'Route B makes it almost surely; Route A only about half the time. They are not equal.' }, ex: 'Route A has roughly a 1/2 chance of taking 60 minutes and missing the train. Route B’s 40 minutes fits within 50, so it is the safer choice.' },
      { id: 'u3-05-q27', c: 'prob-traffic', t: 'tf', d: 2, q: 'Traffic apps use only today’s live data and ignore past traffic patterns.', a: false, ex: 'They combine live data with historical patterns for the same road, day and time.' },
      { id: 'u3-05-q28', c: 'prob-traffic', t: 'multi', d: 2, q: 'Which data could help predict a traffic jam on a city road? Select all that apply.', o: ['The time of day and day of the week', 'Live speeds of vehicles on the road', 'Reports of an accident or road closure', 'The colour of each car on the road', 'The names of the drivers'], a: [0, 1, 2], ex: 'Time, live speeds and incidents all affect traffic. Car colours and driver names do not.' },
      { id: 'u3-05-q29', c: 'prob-revise', t: 'match', d: 2, q: 'Match each type of event to a probability it could have.', pairs: [['Sure event', '1'], ['Impossible event', '0'], ['Likely event', '0.8'], ['Unlikely event', '0.2']], ex: 'Sure = 1, impossible = 0, likely is above 1/2 (0.8), unlikely is below 1/2 (0.2).' },
      { id: 'u3-05-q30', c: 'prob-revise', t: 'mcq', d: 2, q: 'A bag has 2 red and 2 blue marbles. Picking a red and picking a blue are…', o: ['equally likely events', 'impossible events', 'sure events', 'unlikely events'], a: 0, mis: { 3: 'Each has probability 2/4 = 1/2, which is not less than 1/2.' }, ex: 'P(red) = 2/4 = 1/2 and P(blue) = 2/4 = 1/2. Same probability means equally likely.' },
      { id: 'u3-05-q31', c: 'prob-revise', t: 'bins', d: 3, q: 'Sort each event (or pair) into the right group.', bins: ['Likely', 'Unlikely', 'Equally likely pair'], items: [['A forecast gives an 85% chance of rain', 0], ['A 10% chance of a traffic jam on your route', 1], ['Heads and tails on a fair coin', 2], ['Not rolling a 1 on a die', 0], ['Rolling a 6 on a die', 1], ['Odd and even on a fair die', 2]], ex: '85% and 5/6 are above 1/2 (likely). 10% and 1/6 are below 1/2 (unlikely). Heads/tails and odd/even each have probability 1/2 (equally likely).' },
      { id: 'u3-05-q32', c: 'prob-revise', t: 'mcq', d: 1, q: 'Which of these could be a probability?', o: ['0.45', '1.5', '−0.2', '7/4'], a: 0, ex: 'Probabilities lie from 0 to 1. Only 0.45 is in that range; 1.5 and 7/4 are above 1, and −0.2 is below 0.' },
      { id: 'u3-05-q33', c: 'prob-revise', t: 'mcq', d: 3, q: 'A fair coin lands heads 5 times in a row. What is the probability that the next toss is tails?', o: ['1/2', 'More than 1/2, because tails is “due”', 'Less than 1/2, because heads is on a streak', '1, because it cannot be heads six times'], a: 0, mis: { 1: 'The coin has no memory. Past tosses do not change the next one.', 2: 'There is no “streak” effect on a fair coin. Each toss is a fresh start.', 3: 'Six heads in a row is unlikely, but possible.' }, ex: 'Each toss of a fair coin is independent, so P(tails) is always 1/2, whatever happened before.' },
      { id: 'u3-05-q34', c: 'prob-revise', t: 'num', d: 2, q: 'A spinner has 10 equal sectors numbered 1 to 10. What is the probability of landing on a number greater than 7? Give your answer as a decimal.', a: 0.3, tol: 0.001, ex: 'Greater than 7: 8, 9, 10 — 3 favourable outcomes out of 10. P = 3/10 = 0.3.' }
    ],
    gens: ['prob-complement']
  }
  ]
};
