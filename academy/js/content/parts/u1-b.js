// Unit 1, part B: topics u1-07 to u1-11 (Modelling, Evaluation, Deployment, Ethics, Bias & Access).
// Confusion-matrix layout used throughout: rows = Actual, columns = Predicted.
export default [
  // ───────────────────────────── u1-07 ─────────────────────────────
  {
    id: 'u1-07',
    title: 'Modelling: Rule-based vs Learning-based',
    minutes: 90,
    outcomes: [
      'Understand modelling (Rule-based & Learning-based)',
      'Explain the parts of a decision tree and use one to reach a decision',
      'Compare the strengths and weaknesses of rule-based and learning-based models and choose a suitable approach for a problem'
    ],
    hook: 'Can a machine learn to sort fruit without you telling it a single rule? You are about to try both ways.',
    concepts: {
      'model-def': 'What a model is',
      'rule-based': 'The rule-based approach',
      'decision-tree': 'Decision trees: root, branches, leaves',
      'learning-based': 'The learning-based approach',
      'pros-cons': 'Strengths and weaknesses of each approach',
      'choose-approach': 'Choosing the right approach'
    },
    steps: [
      { kind: 'card', title: 'Two ways to teach a mango sorter', html: `
<p>Meera’s family sells mangoes in Ratnagiri. Every morning, someone must sort them into <b>ripe</b> and <b>not ripe</b>. Meera wants a machine to help.</p>
<div class="cols">
  <div class="mini"><h4>📋 Way 1: Write the rules</h4><p>Meera writes: “If the skin is yellow-orange and it smells sweet, it is ripe.” The machine just follows her list.</p></div>
  <div class="mini"><h4>🧺 Way 2: Show examples</h4><p>Meera shows the machine 1,000 mangoes, each already marked ripe or not ripe. The machine works out the pattern by itself.</p></div>
</div>
<p>Both ways build something that takes a mango in and gives an answer out. In AI, that “something” is called a <b>model</b>.</p>
<div class="key"><b>Key idea</b> There are two main ways to build a model: give it the rules, or let it learn the rules from examples.</div>` },
      { kind: 'card', title: 'What is a model?', html: `
<p>Every AI system has a part that turns what goes in into what comes out.</p>
<ol class="flow">
  <li><b>Input</b><span>Data goes in: a photo of a mango, its colour, its smell.</span></li>
  <li><b>Model</b><span>The algorithm or program works on that data.</span></li>
  <li><b>Output</b><span>A decision or prediction comes out: “ripe”.</span></li>
</ol>
<div class="def"><dfn>Model</dfn> The algorithm or program that turns input data into an output, such as a decision or a prediction.</div>
<p><b>Modelling</b> is stage 4 of the AI Project Cycle. It comes after Data Exploration, because you must understand your data first. It comes before Evaluation, because a model must exist before you can test it.</p>
<div class="eg"><b>Example</b> A travel-time app takes your location and traffic data as input, and its model outputs an estimated arrival time.</div>` },
      { kind: 'card', title: 'The rule-based approach', html: `
<p>In the <b>rule-based approach</b>, a human developer decides the rules. The machine simply follows them, step by step.</p>
<pre class="code">if temperature_c > 38:
    print("Fever alert: please see the nurse")
else:
    print("Temperature normal")</pre>
<p>A school’s thermal scanner could work like this. The number 38 was chosen by a person. The machine did not discover it.</p>
<div class="def"><dfn>Rule-based approach</dfn> The developer defines the rules or relationships, and the machine follows them to produce an output.</div>
<div class="key"><b>Key idea</b> A rule-based model does exactly what its rules say. It cannot improve on its own; a person must change the rules.</div>` },
      { kind: 'check', concepts: ['model-def', 'rule-based'], n: 2 },
      { kind: 'card', title: 'Decision trees: rules drawn as a tree', html: `
<p>A <b>decision tree</b> is a rule-based model that asks one question at a time. Each answer leads down a branch until you reach a final decision. It is drawn upside down: the root is at the top.</p>
<p><b>Should Kabir carry an umbrella?</b></p>
<ul>
  <li><b>Is it cloudy?</b> ← root node
    <ul>
      <li>No → <b>Leave the umbrella</b> ← leaf</li>
      <li>Yes → <b>Does the forecast say rain?</b> ← internal node
        <ul><li>Yes → <b>Carry the umbrella</b> ← leaf</li><li>No → <b>Leave the umbrella</b> ← leaf</li></ul>
      </li>
    </ul>
  </li>
</ul>
<table class="tbl">
  <thead><tr><th>Part</th><th>What it is</th></tr></thead>
  <tbody>
    <tr><td>Root node</td><td>The first question, at the top</td></tr>
    <tr><td>Branches</td><td>The answers that lead from one node to the next</td></tr>
    <tr><td>Internal node</td><td>A follow-up question in the middle</td></tr>
    <tr><td>Leaf node</td><td>A final decision: no more questions</td></tr>
  </tbody>
</table>` },
      { kind: 'card', title: 'Rule-based: strengths and weaknesses', html: `
<div class="cols">
  <div class="mini"><h4>👍 Strengths</h4><p><b>Transparent:</b> you can read every rule and see exactly why it decided.<br><b>Predictable:</b> the same input always follows the same rules.<br><b>No training data needed</b>, and a wrong rule is easy to find and fix.</p></div>
  <div class="mini"><h4>👎 Weaknesses</h4><p><b>Cannot adapt:</b> it never improves on its own.<br><b>Breaks on new cases</b> that nobody wrote a rule for.<br><b>Too many rules</b> are needed for complex problems like faces or voices.</p></div>
</div>
<div class="eg"><b>Example</b> Ayaan writes a spam rule: “If an email contains the word LOTTERY, mark it as spam.” Scammers simply type “L0TTERY” with a zero, and the rule misses it. Someone has to keep adding new rules by hand.</div>` },
      { kind: 'lab', lab: 'decision-tree', title: 'Build a fruit-sorting decision tree', intro: 'Pick the question at each node to build a tree that sorts apples, bananas, oranges, grapes, watermelons and lemons. Then run 10 test fruits through your rules and check the accuracy.' },
      { kind: 'check', concepts: ['decision-tree'], n: 2 },
      { kind: 'card', title: 'The learning-based approach', html: `
<p>Some rules are almost impossible to write. Try writing rules to recognise your best friend’s face in any photo, in any light, from any angle!</p>
<p>In the <b>learning-based approach</b>, you give the machine lots of <b>examples</b> instead of rules. The machine finds the pattern itself.</p>
<ol class="flow">
  <li><b>Examples with answers</b><span>Thousands of leaf photos, each labelled “healthy” or “diseased”.</span></li>
  <li><b>Learning</b><span>The machine finds the patterns that separate the two groups.</span></li>
  <li><b>Prediction</b><span>A farmer uploads a new leaf photo, and the model predicts its label.</span></li>
</ol>
<div class="def"><dfn>Learning-based approach</dfn> The machine is given data (examples) and learns the patterns or rules itself, so it can adapt when it is given new data.</div>` },
      { kind: 'card', title: 'Learning-based: strengths and weaknesses', html: `
<div class="cols">
  <div class="mini"><h4>👍 Strengths</h4><p><b>Adapts:</b> train it again on new data and it can improve.<br><b>Finds patterns</b> too complex for people to write down, in faces, voices and handwriting.<br><b>Handles messy, varied inputs</b> from the real world.</p></div>
  <div class="mini"><h4>👎 Weaknesses</h4><p><b>Needs lots of good data:</b> poor or too few examples give a poor model.<br><b>Copies mistakes</b> and unfairness hidden in its data.<br><b>Can be a black box:</b> it is often hard to explain why it gave an answer.</p></div>
</div>
<div class="def"><dfn>Black box</dfn> A model whose reasons for a decision are hard for people to see or explain.</div>
<div class="key"><b>Key idea</b> A learning-based model is only as good as the examples it learns from.</div>` },
      { kind: 'lab', lab: 'learn-by-example', title: 'Teach a plant-watering model by example', intro: 'Add labelled examples of plants that do or do not need watering, using hours of sunlight and soil moisture, and watch the model colour in its regions as it learns. Then reveal 10 hidden test plants and aim for 90% accuracy or more.' },
      { kind: 'check', concepts: ['learning-based', 'pros-cons'], n: 3 },
      { kind: 'card', title: 'Side by side', html: `
<div class="tblwrap"><table class="tbl">
  <thead><tr><th></th><th>Rule-based</th><th>Learning-based</th></tr></thead>
  <tbody>
    <tr><td><b>Who makes the rules?</b></td><td>The developer</td><td>The machine, from examples</td></tr>
    <tr><td><b>Needs training data?</b></td><td>No</td><td>Yes, lots of good data</td></tr>
    <tr><td><b>Improves on its own?</b></td><td>No; a person edits the rules</td><td>Yes, when trained again on new data</td></tr>
    <tr><td><b>Easy to explain?</b></td><td>Yes; every rule is visible</td><td>Often hard (black box)</td></tr>
    <tr><td><b>Best when…</b></td><td>Rules are few, clear and fixed</td><td>Patterns are complex and examples are plentiful</td></tr>
    <tr><td><b>Example</b></td><td>Library late fine: ₹2 per day</td><td>Recognising handwritten PIN codes</td></tr>
  </tbody>
</table></div>
<div class="key"><b>Key idea</b> Rule-based: humans write the rules. Learning-based: the machine learns the rules from data.</div>` },
      { kind: 'card', title: 'Choosing an approach', html: `
<p>Before you build, ask three questions:</p>
<ol class="flow">
  <li><b>Are the rules clear, few and fixed?</b><span>If yes, a rule-based model is simple and reliable.</span></li>
  <li><b>Is the pattern too complex to write down?</b><span>If yes, and you have many good examples, choose learning-based.</span></li>
  <li><b>Must every decision be easy to explain?</b><span>If yes, lean towards rule-based, or add strong human checks.</span></li>
</ol>
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Task</th><th>Better approach</th></tr></thead>
  <tbody>
    <tr><td>Railway fare from a fixed fare table</td><td>Rule-based</td></tr>
    <tr><td>Spotting crop disease in leaf photos</td><td>Learning-based</td></tr>
    <tr><td>“Pass” if marks are 33 or more</td><td>Rule-based</td></tr>
    <tr><td>Understanding spoken commands in many accents</td><td>Learning-based</td></tr>
  </tbody>
</table></div>` },
      { kind: 'card', title: 'Common mistakes to avoid', html: `
<div class="warn"><b>Careful</b> “Learning-based means no humans are needed.” Wrong: people collect the data, label the examples, choose the model and check its results.</div>
<div class="warn"><b>Careful</b> “More data always makes a better model.” Only if the data is good and covers every kind of case. A thousand blurry or wrongly labelled photos teach the wrong pattern.</div>
<div class="warn"><b>Careful</b> “A rule-based model gets smarter with use.” It does not. It changes only when a person edits its rules.</div>
<div class="warn"><b>Careful</b> “Rule-based models are old and useless.” They are often the best choice when the rules are clear and every decision must be explained.</div>` },
      { kind: 'check', concepts: ['choose-approach'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      // model-def
      { id: 'u1-07-q01', c: 'model-def', t: 'mcq', d: 1,
        q: 'In AI, what is a <b>model</b>?',
        o: ['The algorithm or program that turns input into output', 'The collection of raw data gathered for an AI project', 'The app screen where users see the final results', 'The person who designs, builds and tests the AI system'],
        a: 0,
        ex: 'A model sits in the middle: data goes in, and the model produces a decision or prediction. The data is its input, and the app is only how people use it.' },
      { id: 'u1-07-q02', c: 'model-def', t: 'mcq', d: 1,
        q: 'Modelling is which stage of the AI Project Cycle?',
        o: ['Stage 4, after Data Exploration', 'Stage 2, after Problem Scoping', 'Stage 6, after Evaluation', 'Stage 1, before any other stage'],
        a: 0,
        ex: 'The order is Problem Scoping → Data Acquisition → Data Exploration → Modelling → Evaluation → Deployment, so Modelling is stage 4.' },
      { id: 'u1-07-q03', c: 'model-def', t: 'tf', d: 1,
        q: 'Modelling comes before Evaluation in the AI Project Cycle, because a model must be built before it can be tested.',
        a: true,
        ex: 'True. Evaluation checks a model’s predictions against reality, so the model has to exist first.' },
      { id: 'u1-07-q04', c: 'model-def', t: 'match', d: 2,
        q: 'Match each part to the mango-sorting example.',
        pairs: [['Input', 'A photo of a mango'], ['Model', 'The program that decides ripeness'], ['Output', 'The label “ripe”']],
        ex: 'Data (the photo) goes in, the model (the program) works on it, and a decision (“ripe”) comes out.' },
      { id: 'u1-07-q05', c: 'model-def', t: 'mcq', d: 2,
        q: 'A weather app takes today’s humidity, temperature and wind speed and shows “70% chance of rain”. Which part is the <b>output</b>?',
        o: ['The “70% chance of rain” message', 'The humidity, temperature and wind speed', 'The program that combines the readings', 'The phone on which the app is running'],
        a: 0,
        mis: { 1: 'Not quite — those readings are the input data that go into the model.', 2: 'That program is the model itself. The output is what the model produces.' },
        ex: 'The output is the prediction the model produces. The readings are inputs and the program in between is the model.' },
      { id: 'u1-07-q06', c: 'model-def', t: 'mcq', d: 3,
        q: 'Sana says, “Our model is just the folder of 5,000 mango photos.” What is wrong with her statement?',
        o: ['The photos are data; the model is the program that learns from them', 'Nothing; a model and its dataset mean exactly the same thing', 'The photos are the output that the model produces at the end', 'A model can only use numbers, so photos cannot be involved'],
        a: 0,
        mis: { 1: 'Data and model are different things: data is what goes in; the model turns data into an answer.', 2: 'The photos are what the model learns from, not what it produces. Its output is a label like “ripe”.', 3: 'Models can work with images — that is what Computer Vision does.' },
        ex: 'The photos are the data. The model is the algorithm or program that learns from that data and then turns new inputs into outputs.' },

      // rule-based
      { id: 'u1-07-q07', c: 'rule-based', t: 'mcq', d: 1,
        q: 'In the rule-based approach, who decides the rules?',
        o: ['The developer, who writes the rules for the machine', 'The machine, by finding patterns in many examples', 'The users, by voting on every single output', 'The internet, by copying rules from websites'],
        a: 0,
        ex: 'In the rule-based approach the developer defines the rules or relationships, and the machine only follows them.' },
      { id: 'u1-07-q08', c: 'rule-based', t: 'tf', d: 1,
        q: 'A rule-based model improves on its own each time it is used.',
        a: false,
        ex: 'False. A rule-based model does exactly what its rules say. It changes only when a person edits the rules.' },
      { id: 'u1-07-q09', c: 'rule-based', t: 'mcq', d: 2,
        q: 'This rule-based grading program is run. What does it print?',
        code: 'marks = 72\nif marks >= 75:\n    print("A")\nelif marks >= 60:\n    print("B")\nelse:\n    print("C")',
        o: ['B', 'A', 'C', '72'],
        a: 0,
        mis: { 1: '72 is less than 75, so the first rule is not met.', 2: 'The second rule (72 >= 60) is met first, so the else part never runs.' },
        ex: '72 is not ≥ 75, but it is ≥ 60, so the second rule fires and prints B. The machine simply follows the rules a person wrote.' },
      { id: 'u1-07-q10', c: 'rule-based', t: 'mcq', d: 2,
        q: 'Which of these is an example of the rule-based approach?',
        o: ['A toll booth program: if the vehicle is a car, charge the car rate', 'A photo app that learned to spot cats from thousands of pictures', 'A keyboard that learned your typing habits from your messages', 'A music app that learned your taste from your listening history'],
        a: 0,
        mis: { 1: 'This app learned from examples, so it is learning-based.', 2: 'Learning habits from your messages is learning from data — learning-based.', 3: 'Learning your taste from history is learning from data — learning-based.' },
        ex: 'The toll booth follows a fixed if-then rule written by a person. The other three learned their patterns from data.' },
      { id: 'u1-07-q11', c: 'rule-based', t: 'multi', d: 2,
        q: 'Which statements describe the rule-based approach? Select all that apply.',
        o: ['A person writes the rules or relationships', 'The machine follows the rules exactly as given', 'It needs thousands of examples to learn from', 'It discovers new rules by itself from data', 'If-else rules are a common way to write it'],
        a: [0, 1, 4],
        ex: 'In a rule-based model a person writes the rules (often as if-else rules or a decision tree) and the machine follows them. Learning from examples is the learning-based approach.' },

      // decision-tree
      { id: 'u1-07-q12', c: 'decision-tree', t: 'mcq', d: 1,
        q: 'In a decision tree, what is the <b>root node</b>?',
        o: ['The first question, at the top of the tree', 'A final decision at the end of a path', 'A line linking an answer to the next node', 'The data used to test the finished tree'],
        a: 0,
        ex: 'The root node is where every path starts: the first question. Decision trees are drawn with the root at the top.' },
      { id: 'u1-07-q13', c: 'decision-tree', t: 'mcq', d: 1,
        q: 'In a decision tree, what does a <b>leaf node</b> hold?',
        o: ['A final decision, with no more questions after it', 'The very first question that the tree asks', 'An answer that links two questions together', 'A list of all the examples used to build it'],
        a: 0,
        ex: 'A leaf node is the end of a path. It gives the final decision, such as “Carry the umbrella”.' },
      { id: 'u1-07-q14', c: 'decision-tree', t: 'match', d: 1,
        q: 'Match each part of a decision tree to its job.',
        pairs: [['Root node', 'Asks the first question'], ['Branch', 'Carries an answer to the next node'], ['Internal node', 'Asks a follow-up question'], ['Leaf node', 'Gives the final decision']],
        ex: 'The root asks first, branches carry the answers, internal nodes ask follow-up questions, and leaves give the final decision.' },
      { id: 'u1-07-q15', c: 'decision-tree', t: 'order', d: 2,
        q: 'A decision tree decides “Should Diya take an umbrella?” It is cloudy and rain is forecast. Put her path through the tree in order, from top to bottom.',
        items: ['Root: Is it cloudy?', 'Branch: Yes, it is cloudy', 'Internal node: Does the forecast say rain?', 'Branch: Yes, rain is forecast', 'Leaf: Carry the umbrella'],
        ex: 'Every path starts at the root question, follows the branch for each answer, passes through any follow-up questions, and stops at a leaf with the decision.' },
      { id: 'u1-07-q16', c: 'decision-tree', t: 'mcq', d: 2,
        q: 'A fruit-sorting tree works like this:<br>Root: <b>Is it yellow?</b><br>• Yes → <b>Is it long?</b> Yes → Banana; No → Lemon<br>• No → <b>Is it bigger than a football?</b> Yes → Watermelon; No → Apple<br>A fruit is <b>not yellow</b> and <b>smaller than a football</b>. What does the tree decide?',
        o: ['Apple', 'Lemon', 'Watermelon', 'Banana'],
        a: 0,
        mis: { 1: 'Lemon is only reached through the “Yes, it is yellow” branch.', 2: 'Watermelon is the leaf for fruits bigger than a football.', 3: 'Banana needs the answers “yellow” and “long”.' },
        ex: 'Not yellow → go to “Is it bigger than a football?” → No → the leaf is Apple.' },
      { id: 'u1-07-q17', c: 'decision-tree', t: 'num', d: 2,
        q: 'A decision tree’s root asks a Yes/No question. Each of its two answers leads to another Yes/No question, and every answer to those questions ends in a leaf. How many leaf nodes does the tree have?',
        a: 4,
        ex: 'The root splits into 2 internal nodes. Each internal node splits into 2 leaves, so there are 2 × 2 = 4 leaf nodes.' },
      { id: 'u1-07-q18', c: 'decision-tree', t: 'tf', d: 2,
        q: 'When you design all the questions in a decision tree yourself, the tree is a rule-based model.',
        a: true,
        ex: 'True. You, the developer, decided every question and every answer path, so the machine is only following your rules.' },
      { id: 'u1-07-q19', c: 'decision-tree', t: 'mcq', d: 3,
        q: 'Rohan’s tree: Root <b>Is it yellow?</b> → Yes → <b>Is it long?</b> → Yes: Banana, No: Lemon. He puts in a round, yellow mango. What happens, and why?',
        o: ['It is labelled Lemon, because the tree has no rule for mangoes', 'It is labelled Mango, because the tree learns new fruits by itself', 'It is labelled Banana, because every yellow fruit goes to Banana', 'It gets no label, because the tree stops at the root node'],
        a: 0,
        mis: { 1: 'A rule-based tree cannot learn new fruits. Someone must add a new question and leaf.', 2: 'Only fruits that are yellow AND long reach the Banana leaf.', 3: 'The mango answers “Yes” at the root, so it moves on down the tree.' },
        ex: 'Yellow → Yes, long → No, so it lands on the Lemon leaf. A rule-based model breaks on a new case nobody wrote a rule for.' },

      // learning-based
      { id: 'u1-07-q20', c: 'learning-based', t: 'mcq', d: 1,
        q: 'In the learning-based approach, how does the machine get its rules?',
        o: ['It learns patterns from the examples (data) it is given', 'A developer types in every rule as if-else lines', 'It copies the rules from a rule-based machine', 'It asks the user to choose a rule for every input'],
        a: 0,
        ex: 'In the learning-based approach the machine is given data and finds the patterns or rules itself.' },
      { id: 'u1-07-q21', c: 'learning-based', t: 'tf', d: 1,
        q: 'In the learning-based approach, the machine can adapt when it is given new data.',
        a: true,
        ex: 'True. Training the model again on new examples lets it adjust the patterns it has learned.' },
      { id: 'u1-07-q22', c: 'learning-based', t: 'order', d: 2,
        q: 'Put the steps for building a learning-based leaf-disease model in order.',
        items: ['Collect many leaf photos', 'Label each photo healthy or diseased', 'Let the machine learn patterns from the labelled photos', 'Test it on new photos it has never seen', 'Use it to predict for a farmer’s new photo'],
        ex: 'You need data first, then labels, then learning. Testing on unseen photos comes before real use, so you know it works.' },
      { id: 'u1-07-q23', c: 'learning-based', t: 'mcq', d: 2,
        q: 'Which system uses the learning-based approach?',
        o: ['A photo app that learned to spot dogs from labelled pictures', 'A calculator that adds GST to a bill using a fixed percentage', 'A lift that stops at whichever floor has its button pressed', 'A school bell that rings at times set by the office'],
        a: 0,
        mis: { 1: 'GST is worked out with a fixed formula written by a person — rule-based.', 2: 'The lift follows a fixed rule: button pressed → stop there.', 3: 'The bell follows times set by people; it learns nothing.' },
        ex: 'The photo app learned what dogs look like from examples. The others follow fixed rules written by people.' },
      { id: 'u1-07-q24', c: 'learning-based', t: 'mcq', d: 3,
        q: 'Kabir wants a model that reads handwritten PIN codes on envelopes at a post office. Why would writing rules by hand be very hard?',
        o: ['People write digits so differently that rules cannot cover them', 'Computers cannot store pictures of handwriting in any form at all', 'PIN codes change every day, so any written rules would soon expire', 'Rules can only work with letters, never with any digits'],
        a: 0,
        mis: { 1: 'Computers store images easily, as grids of numbers.', 2: 'PIN codes stay the same; the problem is the variety of handwriting.', 3: 'Rules can handle digits; the problem is the endless styles of writing them.' },
        ex: 'Every person writes a “7” or a “4” a little differently. A learning-based model can learn these patterns from many labelled examples instead.' },
      { id: 'u1-07-q25', c: 'learning-based', t: 'mcq', d: 3,
        q: 'A learning-based model sorts ripe and unripe tomatoes. It was trained only on red tomatoes from one farm. A farmer brings a variety that stays slightly green when ripe. What is most likely?',
        o: ['It makes more mistakes, because it never saw examples like these', 'It works perfectly, because learning-based models never make mistakes', 'It rewrites its own rules overnight without being given any new data', 'It switches itself into a rule-based model for the new tomatoes'],
        a: 0,
        mis: { 1: 'A learning-based model is only as good as its examples.', 2: 'It can adapt, but only when it is trained again with new examples.' },
        ex: 'The model learned “ripe = red” from its examples. To handle the green variety, it needs new labelled examples of that variety and retraining.' },

      // pros-cons
      { id: 'u1-07-q26', c: 'pros-cons', t: 'bins', d: 2,
        q: 'Sort each statement under the approach it describes.',
        bins: ['Rule-based', 'Learning-based'],
        items: [['Works without any training data', 0], ['Needs lots of good-quality examples', 1], ['Can be hard to explain why it gave an answer', 1], ['Cannot improve unless a person edits it', 0], ['Can improve when trained again on new data', 1], ['Every decision can be traced to a written rule', 0]],
        ex: 'Rule-based models are transparent and need no training data, but cannot improve alone. Learning-based models adapt and find complex patterns, but need good data and can be black boxes.' },
      { id: 'u1-07-q27', c: 'pros-cons', t: 'mcq', d: 1,
        q: 'Which is a strength of the rule-based approach?',
        o: ['It is transparent: you can see exactly why it decided', 'It finds complex patterns that no human noticed', 'It improves automatically as more data arrives', 'It handles brand-new situations without changes'],
        a: 0,
        ex: 'Every rule is written down by a person, so you can trace any decision back to the rule that caused it.' },
      { id: 'u1-07-q28', c: 'pros-cons', t: 'mcq', d: 1,
        q: 'Which is a weakness of the learning-based approach?',
        o: ['It needs a lot of good-quality data to learn well', 'It can never adapt when the situation changes', 'A person must type every rule in by hand', 'It can only work with numbers in a table'],
        a: 0,
        ex: 'A learning-based model learns from examples, so too few or poor-quality examples give a poor model.' },
      { id: 'u1-07-q29', c: 'pros-cons', t: 'multi', d: 2,
        q: 'Which are weaknesses of the rule-based approach? Select all that apply.',
        o: ['It cannot learn or improve on its own', 'It breaks on new cases nobody wrote a rule for', 'Complex problems need far too many rules', 'Its decisions are impossible to explain', 'It always needs millions of examples'],
        a: [0, 1, 2],
        ex: 'Rule-based models are easy to explain and need no examples, but they cannot adapt, miss cases nobody planned for, and become unmanageable for complex problems.' },
      { id: 'u1-07-q30', c: 'pros-cons', t: 'tf', d: 2,
        q: 'A “black box” model is one whose reasons for a decision are hard for people to see — a common worry with learning-based models.',
        a: true,
        ex: 'True. A learning-based model finds its own patterns, which can be hard to explain in simple words.' },
      { id: 'u1-07-q31', c: 'pros-cons', t: 'tf', d: 2,
        q: 'A rule-based model can still give a wrong answer when a case appears that its rules did not plan for.',
        a: true,
        ex: 'True. A rule-based model follows its rules exactly, so a case nobody planned for can fall into the wrong rule.' },
      { id: 'u1-07-q32', c: 'pros-cons', t: 'mcq', d: 3,
        q: 'Ayaan’s rule: “If a message contains the word <i>free</i> (in any capitals), mark it as spam.” His friend writes, “Are you free for cricket at 5?” What happens, and why?',
        o: ['It is wrongly marked spam, because the rule follows the word, not the meaning', 'It is delivered, because the machine has learned that this sender is a friend', 'It is delivered, because the rule understands that the message is friendly', 'It is marked spam, because the model was trained on past spam emails'],
        a: 0,
        mis: { 1: 'A rule-based filter does not learn who your friends are.', 2: 'Rules do not understand meaning; they only check for the word.', 3: 'This filter was never trained — a person wrote its rule.' },
        ex: 'The rule only checks for the word “free”, so the friendly message is caught. Rules break on cases their writer did not think of.' },
      { id: 'u1-07-q33', c: 'pros-cons', t: 'mcq', d: 3,
        q: 'A bank’s learning-based loan model rejects Meera’s application, and the staff cannot explain why. Which weakness does this show?',
        o: ['It can be a black box that is hard to explain', 'It needs a developer to write every single rule', 'It cannot work with numbers such as income', 'It never changes, even when given new data'],
        a: 0,
        mis: { 1: 'Writing every rule by hand describes the rule-based approach.', 2: 'Learning-based models work with numbers like income all the time.', 3: 'Learning-based models can change when trained on new data.' },
        ex: 'Learning-based models find their own patterns, so their reasons can be hidden even from the people using them. That is the black-box problem.' },

      // choose-approach
      { id: 'u1-07-q34', c: 'choose-approach', t: 'mcq', d: 2,
        q: 'Which task suits a <b>rule-based</b> approach best?',
        o: ['Working out a library late fine of ₹2 per day', 'Recognising a friend’s face in group photos', 'Understanding spoken commands in many accents', 'Spotting diseased leaves in farmers’ photos'],
        a: 0,
        mis: { 1: 'Faces change with light, angle and expression — too complex to write as rules.', 2: 'Accents vary endlessly; this needs learning from many voice examples.', 3: 'Leaf photos vary a lot; a model must learn from labelled examples.' },
        ex: 'A late fine follows one clear, fixed rule (days late × ₹2), so a rule-based model is simple and reliable.' },
      { id: 'u1-07-q35', c: 'choose-approach', t: 'mcq', d: 2,
        q: 'Which task suits a <b>learning-based</b> approach best?',
        o: ['Translating Hindi sentences into Tamil', 'Charging ₹20 per hour for mall parking', 'Ringing the school bell at fixed times', 'Showing “Pass” when marks are 33 or more'],
        a: 0,
        mis: { 1: 'Parking fees follow one simple fixed rule.', 2: 'Fixed times are rules set by people.', 3: 'A pass mark is one clear rule.' },
        ex: 'Language is full of complex patterns that are too many to write as rules, so translation systems learn from large amounts of example text.' },
      { id: 'u1-07-q36', c: 'choose-approach', t: 'bins', d: 2,
        q: 'Sort each task by the approach that suits it best.',
        bins: ['Rule-based', 'Learning-based'],
        items: [['Calculating a railway fare from a fixed fare table', 0], ['Reading handwritten answers on scanned sheets', 1], ['Checking that a password has at least 8 characters', 0], ['Suggesting videos based on what you have watched', 1], ['Adding 18% tax to a bill', 0], ['Detecting crop disease from leaf photos', 1]],
        ex: 'Tasks with clear, fixed rules suit rule-based models. Tasks with complex, varied patterns (handwriting, viewing habits, leaf photos) suit learning from examples.' },
      { id: 'u1-07-q37', c: 'choose-approach', t: 'mcq', d: 3,
        q: 'A hospital office wants software to check whether insurance forms are complete. Every form must have the same 6 filled-in fields, and every rejection must be explained to the patient. Which approach fits best?',
        o: ['Rule-based, as the rules are clear and decisions must be explained', 'Learning-based, because every hospital task today needs deep learning', 'Learning-based, because rule-based models cannot check forms', 'Rule-based, because it will keep improving itself as more forms arrive'],
        a: 0,
        mis: { 1: 'Hospitals use many approaches; the task decides, not the place.', 2: 'Checking 6 fields is exactly what clear rules do well.', 3: 'A rule-based model never improves itself. It fits here because the rules are clear.' },
        ex: 'The rules are few, clear and fixed (6 fields), and each decision must be explained, which is a strength of rule-based models.' },
      { id: 'u1-07-q38', c: 'choose-approach', t: 'mcq', d: 3,
        q: 'A Bengaluru start-up wants to spot potholes in dashboard-camera videos. Roads look different in sunshine, rain and at night. Which approach fits best?',
        o: ['Learning-based, trained on many labelled road videos', 'Rule-based, with the rule “dark patch = pothole”', 'Rule-based, because road videos never change', 'Learning-based, trained on one sunny-day video'],
        a: 0,
        mis: { 1: 'Shadows, puddles and oil stains are dark too, so this rule would make many mistakes.', 2: 'Road videos change a lot with weather, light and traffic.', 3: 'One video is far too few examples, and it misses rain and night.' },
        ex: 'Potholes look very different across conditions, so the pattern is too complex for hand-written rules. Many labelled examples from all conditions are needed.' },
      { id: 'u1-07-q39', c: 'choose-approach', t: 'multi', d: 3,
        q: 'Sana is choosing an approach for her project. Which clues point towards a <b>learning-based</b> approach? Select all that apply.',
        o: ['The pattern is too complex to write as rules', 'Thousands of good, labelled examples are available', 'The rules are short, clear and never change', 'Every decision must be traced to a written rule', 'The inputs vary a lot, like voices or photos'],
        a: [0, 1, 4],
        ex: 'Complex patterns, varied inputs and plenty of good examples suit learning-based models. Clear fixed rules and the need to trace every decision point to rule-based.' }
    ]
  },
  // ───────────────────────────── u1-08 ─────────────────────────────
  {
    id: 'u1-08',
    title: 'Evaluation: TP, FP, TN, FN',
    minutes: 80,
    outcomes: [
      'Understand various evaluation techniques',
      'Define True Positive, False Positive, True Negative and False Negative and arrange them in a confusion matrix',
      'Calculate accuracy and judge which kind of error matters more in a given situation'
    ],
    hook: 'An AI that is “95% accurate” can still miss every sick patient. Learn to spot how.',
    concepts: {
      'why-eval': 'Why we evaluate on testing data',
      'four-outcomes': 'TP, TN, FP and FN',
      'conf-matrix': 'Reading a confusion matrix',
      'accuracy': 'Calculating accuracy',
      'error-cost': 'Which error matters more'
    },
    steps: [
      { kind: 'card', title: 'Would you trust it?', html: `
<p>Arjun built a model that answers one question every morning: <b>“Will it rain today?”</b> His school wants to use it to decide whether sports practice moves indoors.</p>
<p>The model always gives an answer. But before anyone relies on it, one question matters most: <b>how often is it right?</b></p>
<div class="def"><dfn>Evaluation</dfn> Stage 5 of the AI Project Cycle: comparing the model’s predictions with what really happened, to check how well it works.</div>
<div class="key"><b>Key idea</b> Giving answers is not enough. A model must be tested, and its answers checked against reality, before people depend on it.</div>` },
      { kind: 'card', title: 'Test on data it has never seen', html: `
<p>Imagine your exam paper had exactly the same questions as your practice sheet. You could score full marks just by memorising, without understanding anything.</p>
<p>Models can “memorise” too. So we split the data:</p>
<div class="cols">
  <div class="mini"><h4>📚 Training data</h4><p>The examples used to build and teach the model.</p></div>
  <div class="mini"><h4>📝 Testing data</h4><p>New examples kept aside. The model has never seen them, so they show how it will do in the real world.</p></div>
</div>
<div class="warn"><b>Careful</b> Testing a model on the same data it was trained on gives a falsely good score. Always evaluate on unseen testing data.</div>` },
      { kind: 'card', title: 'Prediction vs reality', html: `
<p>For a yes/no model, every test case gives you two answers to compare:</p>
<ol class="flow">
  <li><b>What did the model predict?</b><span><b>Positive</b> (“Yes, rain”) or <b>Negative</b> (“No rain”).</span></li>
  <li><b>What really happened?</b><span>The reality: did it actually rain?</span></li>
  <li><b>Was the model right?</b><span><b>True</b> if prediction matched reality, <b>False</b> if it did not.</span></li>
</ol>
<div class="warn"><b>Careful</b> “Positive” does not mean “good”. It just means the model said “yes” to the thing it is looking for. In a disease test, a positive result means the model thinks the disease <i>is</i> present.</div>` },
      { kind: 'card', title: 'The four outcomes', html: `
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Outcome</th><th>Predicted</th><th>Reality</th><th>Rain example</th></tr></thead>
  <tbody>
    <tr><td><b>True Positive (TP)</b></td><td>Yes</td><td>Yes</td><td>Said rain, and it rained</td></tr>
    <tr><td><b>True Negative (TN)</b></td><td>No</td><td>No</td><td>Said no rain, and it stayed dry</td></tr>
    <tr><td><b>False Positive (FP)</b></td><td>Yes</td><td>No</td><td>Said rain, but it stayed dry (false alarm)</td></tr>
    <tr><td><b>False Negative (FN)</b></td><td>No</td><td>Yes</td><td>Said no rain, but it rained (missed it)</td></tr>
  </tbody>
</table></div>
<div class="key"><b>Key idea</b> Read the name backwards. The second word is what the model <b>predicted</b> (Positive = yes, Negative = no). The first word says whether that prediction was <b>right</b> (True) or <b>wrong</b> (False).</div>` },
      { kind: 'check', concepts: ['why-eval', 'four-outcomes'], n: 3 },
      { kind: 'card', title: 'The confusion matrix', html: `
<p>A <b>confusion matrix</b> is a table that arranges the counts of TP, FN, FP and TN for a model in one place.</p>
<p><b>Layout used in this course: rows = Actual (reality), columns = Predicted.</b></p>
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Rows: Actual · Columns: Predicted</th><th>Predicted Yes</th><th>Predicted No</th></tr></thead>
  <tbody>
    <tr><th>Actual Yes</th><td>TP</td><td>FN</td></tr>
    <tr><th>Actual No</th><td>FP</td><td>TN</td></tr>
  </tbody>
</table></div>
<p>The diagonal (TP and TN) holds the <b>correct</b> predictions. The other two boxes hold the <b>mistakes</b>.</p>
<div class="warn"><b>Careful</b> Some books put Predicted in the rows and Actual in the columns. Then FP and FN swap places. Always read the labels before reading the numbers.</div>` },
      { kind: 'card', title: 'Filling a matrix: 20 days of rain', html: `
<p>Arjun tests his model on 20 new days it has never seen.</p>
<ul>
  <li>It rained on <b>10</b> days. The model predicted rain on 8 of them and missed 2.</li>
  <li>It stayed dry on <b>10</b> days. The model wrongly predicted rain on 3 and correctly said “no rain” on 7.</li>
</ul>
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Rows: Actual · Columns: Predicted</th><th>Predicted Rain</th><th>Predicted No rain</th></tr></thead>
  <tbody>
    <tr><th>Actual Rain</th><td>TP = 8</td><td>FN = 2</td></tr>
    <tr><th>Actual No rain</th><td>FP = 3</td><td>TN = 7</td></tr>
  </tbody>
</table></div>
<div class="eg"><b>Check</b> 8 + 2 + 3 + 7 = 20. The four boxes must always add up to the number of test cases.</div>` },
      { kind: 'check', concepts: ['conf-matrix'], n: 2 },
      { kind: 'card', title: 'Accuracy', html: `
<p><b>Accuracy</b> tells you what share of all predictions were correct.</p>
<div class="formula">Accuracy = (TP + TN) ÷ (TP + TN + FP + FN) × 100%</div>
<p>For Arjun’s rain model:</p>
<ol class="flow">
  <li><b>Correct predictions</b><span>TP + TN = 8 + 7 = 15</span></li>
  <li><b>All predictions</b><span>8 + 7 + 3 + 2 = 20</span></li>
  <li><b>Divide and convert</b><span>15 ÷ 20 = 0.75, and 0.75 × 100% = 75%</span></li>
</ol>
<div class="key"><b>Key idea</b> 75% accuracy means the model was right on 75 out of every 100 test cases, here 15 out of 20 days.</div>` },
      { kind: 'card', title: 'When accuracy fools you', html: `
<p>A clinic tests a disease-screening model on <b>100</b> people. Only <b>5</b> really have the disease. The model is lazy: it says “No disease” for everyone.</p>
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Rows: Actual · Columns: Predicted</th><th>Predicted Disease</th><th>Predicted No disease</th></tr></thead>
  <tbody>
    <tr><th>Actual Disease</th><td>TP = 0</td><td>FN = 5</td></tr>
    <tr><th>Actual No disease</th><td>FP = 0</td><td>TN = 95</td></tr>
  </tbody>
</table></div>
<p>Accuracy = (0 + 95) ÷ 100 × 100% = <b>95%</b>. It sounds excellent, but the model found <b>none</b> of the 5 sick people.</p>
<div class="warn"><b>Careful</b> When one answer is rare, a high accuracy can hide dangerous mistakes. Always look at the whole matrix, not just one number.</div>` },
      { kind: 'check', concepts: ['accuracy'], n: 2 },
      { kind: 'lab', lab: 'confusion-matrix', title: 'Sort predictions into a confusion matrix', intro: 'Sort 12 of an AI’s predictions into TP, FP, TN and FN, then work out its accuracy. Finally, move the threshold slider to watch false positives and false negatives trade off, and choose a setting for hospital screening.' },
      { kind: 'card', title: 'Which mistake is worse?', html: `
<p>FP and FN are both mistakes, but they do not cost the same. It depends on the problem.</p>
<div class="cols">
  <div class="mini"><h4>🩺 Cancer screening</h4><p>Positive = “may have cancer”.<br><b>FN is worse:</b> a sick person is told they are fine and misses treatment.<br>An FP means extra tests and worry, but further checks can clear it up.</p></div>
  <div class="mini"><h4>📧 Spam filter</h4><p>Positive = “spam”.<br><b>FP is worse:</b> a real email, like your exam admit-card notice, is hidden in the spam folder.<br>An FN just lets one junk message into your inbox, which you can delete.</p></div>
</div>
<div class="key"><b>Key idea</b> Before judging a model, ask: “Which mistake hurts people more here?”</div>` },
      { kind: 'card', title: 'Alarms, exams and trade-offs', html: `
<div class="cols">
  <div class="mini"><h4>🔥 Fire alarm</h4><p>Positive = “fire”. A missed fire (FN) puts lives at risk. A false alarm (FP) only costs time. So alarms are set to be very sensitive.</p></div>
  <div class="mini"><h4>🧑‍🏫 Exam-proctoring AI</h4><p>Positive = “cheating”. An FP accuses an honest student, which is unfair and upsetting. So a teacher should review every flag before any action.</p></div>
</div>
<p><b>The trade-off:</b> if you tune a model to catch more real positives, it usually raises more false alarms too. If you cut false alarms, it usually misses more real cases.</p>
<div class="warn"><b>Careful</b> There is no setting that is best for every problem. Choose based on which mistake costs more in that situation.</div>` },
      { kind: 'check', concepts: ['error-cost'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // why-eval
      { id: 'u1-08-q01', c: 'why-eval', t: 'mcq', d: 1,
        q: 'What happens in the <b>Evaluation</b> stage of the AI Project Cycle?',
        o: ['Predictions are compared with reality to see how well it works', 'New data is collected from surveys, sensors and cameras for training', 'The problem is described using the 4Ws Problem Canvas', 'The finished model is put into an app for people to use'],
        a: 0,
        ex: 'Evaluation checks a model by comparing what it predicted with what really happened. Collecting data, scoping and deploying are other stages.' },
      { id: 'u1-08-q02', c: 'why-eval', t: 'mcq', d: 1,
        q: 'Why do we evaluate a model on <b>testing data</b>?',
        o: ['To check it on examples it did not see during training', 'To give the model more examples to memorise', 'To make the model run faster on a phone', 'To choose the colours for the app’s screens'],
        a: 0,
        ex: 'Testing data is kept aside during training, so it shows how the model handles new, unseen cases, just as it must in the real world.' },
      { id: 'u1-08-q03', c: 'why-eval', t: 'tf', d: 1,
        q: 'Testing a model on the same data it was trained on gives a fair picture of how it will do in the real world.',
        a: false,
        ex: 'False. The model may simply have memorised its training data, like a student who saw the exam questions in advance. Unseen testing data gives a fair check.' },
      { id: 'u1-08-q04', c: 'why-eval', t: 'order', d: 1,
        q: 'Put these stages of the AI Project Cycle in order.',
        items: ['Data Exploration', 'Modelling', 'Evaluation', 'Deployment'],
        ex: 'You explore the data, build a model, evaluate it, and only then deploy it. Evaluation is the check before real use.' },
      { id: 'u1-08-q05', c: 'why-eval', t: 'mcq', d: 2,
        q: 'Riya’s teacher puts the exact practice questions in the exam. How does this link to evaluating AI?',
        o: ['A model tested on its training data may just have memorised it', 'A model tested on new data will always score 100%', 'A model should be tested only by the person who built it', 'A model needs no testing if its training went smoothly'],
        a: 0,
        mis: { 1: 'New data gives a fair test; it does not guarantee a perfect score.', 2: 'Who tests matters less than what it is tested on. Unseen data is the key.', 3: 'Even a well-trained model must be checked on unseen data.' },
        ex: 'A high score on already-seen questions does not prove understanding. In the same way, a model must be tested on data it has not seen.' },
      { id: 'u1-08-q06', c: 'why-eval', t: 'mcq', d: 3,
        q: 'Arjun’s model spots ripe mangoes with 99% accuracy, but he tested it on the same 500 photos he trained it on. What should he do next?',
        o: ['Test it on a fresh set of mango photos it has never seen', 'Deploy it at once, since 99% is an excellent score', 'Train it on the same photos again to reach 100%', 'Delete the photos so that the model cannot cheat'],
        a: 0,
        mis: { 1: 'The 99% may come from memorising. It has not been fairly tested yet.', 2: 'Training again on the same photos still does not show how it handles new mangoes.', 3: 'Deleting data does not test anything. He needs new, unseen photos.' },
        ex: 'Only unseen testing data shows how well the model works on new mangoes. His 99% might just be memory.' },
      { id: 'u1-08-q07', c: 'why-eval', t: 'mcq', d: 3,
        q: 'A school’s face-recognition attendance model was tested only on photos taken in bright classrooms. The school now wants to use it at the main gate at 7 a.m., when light is dim. What should the team do first?',
        o: ['Test it on photos taken at the gate in early-morning light', 'Use it at the gate, since it passed its classroom tests', 'Retest it on the same bright classroom photos', 'Switch off the gate lights so all photos look the same'],
        a: 0,
        mis: { 1: 'Passing in bright rooms does not prove it works in dim light.', 2: 'The same photos cannot reveal how it handles a new situation.', 3: 'This makes the images worse, not the test better.' },
        ex: 'Testing data should look like the real situation where the model will be used. Dim gate photos are a new case it has not been checked on.' },

      // four-outcomes
      { id: 'u1-08-q08', c: 'four-outcomes', t: 'mcq', d: 1,
        q: 'The model predicted <b>Yes</b>, and in reality the answer was <b>Yes</b>. What is this outcome called?',
        o: ['True Positive', 'False Positive', 'True Negative', 'False Negative'],
        a: 0,
        ex: 'Positive = the model predicted yes. True = the prediction matched reality. So it is a True Positive.' },
      { id: 'u1-08-q09', c: 'four-outcomes', t: 'mcq', d: 1,
        q: 'The model predicted <b>Yes</b>, but in reality the answer was <b>No</b>. What is this outcome called?',
        o: ['False Positive', 'True Positive', 'False Negative', 'True Negative'],
        a: 0,
        ex: 'Positive = the model said yes. False = that prediction was wrong. So it is a False Positive, a false alarm.' },
      { id: 'u1-08-q10', c: 'four-outcomes', t: 'mcq', d: 1,
        q: 'The model predicted <b>No</b>, but in reality the answer was <b>Yes</b>. What is this outcome called?',
        o: ['False Negative', 'True Negative', 'False Positive', 'True Positive'],
        a: 0,
        ex: 'Negative = the model said no. False = that prediction was wrong. So it is a False Negative: the model missed a real case.' },
      { id: 'u1-08-q11', c: 'four-outcomes', t: 'match', d: 1,
        q: 'Match each outcome to its meaning.',
        pairs: [['True Positive', 'Predicted yes, and it really was yes'], ['True Negative', 'Predicted no, and it really was no'], ['False Positive', 'Predicted yes, but it was really no'], ['False Negative', 'Predicted no, but it was really yes']],
        ex: 'The second word is what the model predicted (Positive = yes, Negative = no). The first word says whether it was right (True) or wrong (False).' },
      { id: 'u1-08-q12', c: 'four-outcomes', t: 'mcq', d: 2,
        q: 'A rain-prediction model said “No rain” on Monday, and it rained heavily. Which outcome is this?',
        o: ['False Negative', 'False Positive', 'True Negative', 'True Positive'],
        a: 0,
        mis: { 1: 'A False Positive is predicting rain when it stays dry — the opposite case.', 2: 'True Negative would mean it said no rain and it really stayed dry.', 3: 'True Positive would need the model to predict rain.' },
        ex: 'The model predicted no (Negative), and that was wrong (False) because it rained. So it is a False Negative.' },
      { id: 'u1-08-q13', c: 'four-outcomes', t: 'mcq', d: 2,
        q: 'A spam filter (positive = spam) moves Diya’s school timetable email into the spam folder. Which outcome is this?',
        o: ['False Positive', 'False Negative', 'True Positive', 'True Negative'],
        a: 0,
        mis: { 1: 'A False Negative would be a real spam message that reached the inbox.', 2: 'True Positive needs the email to actually be spam. A timetable email is not.' },
        ex: 'The filter said “spam” (Positive), but the email was genuine, so the prediction was wrong (False): a False Positive.' },
      { id: 'u1-08-q14', c: 'four-outcomes', t: 'bins', d: 2,
        q: 'A model predicts whether a mango is ripe. Sort each case: was the model right or wrong?',
        bins: ['Model was right', 'Model was wrong'],
        items: [['Predicted ripe; the mango was ripe', 0], ['Predicted not ripe; the mango was ripe', 1], ['Predicted ripe; the mango was unripe', 1], ['Predicted not ripe; the mango was unripe', 0]],
        ex: 'When prediction and reality match, the outcome is True (TP or TN). When they differ, it is False (FP or FN), which is a mistake.' },
      { id: 'u1-08-q15', c: 'four-outcomes', t: 'tf', d: 2,
        q: 'In “False Positive”, the word <i>Positive</i> tells you what the model predicted, and <i>False</i> tells you the prediction was wrong.',
        a: true,
        ex: 'True. Positive means the model said “yes”; False means reality did not match, so the model was wrong.' },
      { id: 'u1-08-q16', c: 'four-outcomes', t: 'tf', d: 2,
        q: 'A “positive” prediction always means something good has happened.',
        a: false,
        ex: 'False. Positive only means the model said “yes” to what it looks for. In disease screening, a positive prediction means the disease may be present.' },
      { id: 'u1-08-q17', c: 'four-outcomes', t: 'multi', d: 2,
        q: 'Which outcomes are mistakes made by the model? Select all that apply.',
        o: ['True Positive', 'False Positive', 'True Negative', 'False Negative'],
        a: [1, 3],
        ex: '“False” means the prediction did not match reality. False Positives are false alarms; False Negatives are missed cases.' },
      { id: 'u1-08-q18', c: 'four-outcomes', t: 'mcq', d: 3,
        q: 'A fever-screening camera at a railway station flags people with a high temperature (positive = fever). Kabir has no fever, but he is flagged because he just ran to catch his train. Which outcome is this?',
        o: ['False Positive', 'False Negative', 'True Positive', 'True Negative'],
        a: 0,
        mis: { 1: 'A False Negative would be a person with fever who was not flagged.', 2: 'True Positive would need Kabir to actually have a fever.', 3: 'True Negative means not flagged and no fever; Kabir was flagged.' },
        ex: 'The camera said “fever” (Positive), but Kabir had none, so it was wrong (False). Running warmed him up and caused a false alarm.' },

      // conf-matrix
      { id: 'u1-08-q19', c: 'conf-matrix', t: 'mcq', d: 1,
        q: 'What is a <b>confusion matrix</b>?',
        o: ['A table that arranges the TP, FP, TN and FN counts for a model', 'A chart that shows how data changes over a period of time', 'A list of the rules written for a rule-based model', 'A map of the stakeholders affected by an AI project'],
        a: 0,
        ex: 'A confusion matrix puts the four outcome counts in one table, so you can see at a glance where the model is right and where it is confused.' },
      { id: 'u1-08-q20', c: 'conf-matrix', t: 'mcq', d: 1,
        q: 'How many boxes does the confusion matrix of a yes/no model have?',
        o: ['4', '2', '3', '6'],
        a: 0,
        ex: 'One box for each outcome: TP, FN, FP and TN, arranged in 2 rows × 2 columns.' },
      { id: 'u1-08-q21', c: 'conf-matrix', t: 'mcq', d: 2,
        q: 'Layout: <b>rows = Actual, columns = Predicted</b>.<table class="tbl"><thead><tr><th></th><th>Predicted Yes</th><th>Predicted No</th></tr></thead><tbody><tr><th>Actual Yes</th><td>30</td><td>5</td></tr><tr><th>Actual No</th><td>10</td><td>55</td></tr></tbody></table>How many <b>False Negatives</b> are there?',
        o: ['5', '10', '30', '55'],
        a: 0,
        mis: { 1: '10 is in row Actual No, column Predicted Yes — that box is the False Positives.', 2: '30 is Actual Yes and Predicted Yes — the True Positives.', 3: '55 is Actual No and Predicted No — the True Negatives.' },
        ex: 'A False Negative is Actual Yes but Predicted No: row Actual Yes, column Predicted No, which holds 5.' },
      { id: 'u1-08-q22', c: 'conf-matrix', t: 'num', d: 2,
        q: 'Layout: <b>rows = Actual, columns = Predicted</b>.<table class="tbl"><thead><tr><th></th><th>Predicted Yes</th><th>Predicted No</th></tr></thead><tbody><tr><th>Actual Yes</th><td>30</td><td>5</td></tr><tr><th>Actual No</th><td>10</td><td>55</td></tr></tbody></table>How many test cases were there in total?',
        a: 100,
        ex: 'Every test case lands in exactly one box, so add all four: 30 + 5 + 10 + 55 = 100.' },
      { id: 'u1-08-q23', c: 'conf-matrix', t: 'mcq', d: 2,
        q: 'In a confusion matrix with <b>rows = Actual and columns = Predicted</b>, where are the correct predictions?',
        o: ['On the diagonal, from top-left to bottom-right', 'In the top row only: the boxes for Actual Yes', 'In the right column only: the boxes for Predicted No', 'On the other diagonal, from top-right to bottom-left'],
        a: 0,
        mis: { 1: 'The top row holds both TP (correct) and FN (a mistake).', 2: 'The Predicted No column holds both FN (a mistake) and TN (correct).', 3: 'The top-right and bottom-left boxes are FN and FP — the mistakes.' },
        ex: 'The top-left box (Actual Yes, Predicted Yes) is TP and the bottom-right box (Actual No, Predicted No) is TN. That diagonal is where prediction matches reality; the other two boxes are the mistakes.' },
      { id: 'u1-08-q24', c: 'conf-matrix', t: 'match', d: 2,
        q: 'Layout: <b>rows = Actual, columns = Predicted</b>. Match each box to the outcome it holds.',
        pairs: [['Row Actual Yes, column Predicted Yes', 'True Positive'], ['Row Actual Yes, column Predicted No', 'False Negative'], ['Row Actual No, column Predicted Yes', 'False Positive'], ['Row Actual No, column Predicted No', 'True Negative']],
        ex: 'Read the row for reality and the column for the prediction. Matching yes/yes or no/no is True; a mismatch is False, named after the prediction.' },
      { id: 'u1-08-q25', c: 'conf-matrix', t: 'mcq', d: 2,
        q: 'Layout: <b>rows = Actual, columns = Predicted</b>.<table class="tbl"><thead><tr><th></th><th>Predicted Ripe</th><th>Predicted Unripe</th></tr></thead><tbody><tr><th>Actual Ripe</th><td>22</td><td>3</td></tr><tr><th>Actual Unripe</th><td>6</td><td>19</td></tr></tbody></table>How many <b>False Positives</b> are there?',
        o: ['6', '3', '22', '19'],
        a: 0,
        mis: { 1: '3 is Actual Ripe but Predicted Unripe — those are False Negatives.', 2: '22 is the True Positives: ripe and predicted ripe.', 3: '19 is the True Negatives: unripe and predicted unripe.' },
        ex: 'A False Positive is predicted “Ripe” (positive) but actually unripe: row Actual Unripe, column Predicted Ripe, which holds 6.' },
      { id: 'u1-08-q26', c: 'conf-matrix', t: 'num', d: 3,
        q: 'A mango-sorting model is tested on 50 mangoes. It predicted 20 ripe mangoes as ripe, 4 ripe mangoes as unripe, and 6 unripe mangoes as ripe. The rest were unripe mangoes correctly predicted as unripe. How many <b>True Negatives</b> are there?',
        a: 20,
        ex: 'TP = 20, FN = 4 and FP = 6 add up to 30. The four boxes must total 50, so TN = 50 − 30 = 20.' },
      { id: 'u1-08-q27', c: 'conf-matrix', t: 'mcq', d: 3,
        q: 'Sana’s textbook draws the matrix with <b>Predicted in the rows and Actual in the columns</b>. Her teacher’s worksheet uses <b>Actual in the rows and Predicted in the columns</b>. What must she remember?',
        o: ['The FP and FN boxes swap places, so always read the labels first', 'The counts change, so her accuracy will come out different', 'Only one layout is correct, so the textbook must be wrong', 'The TP and TN boxes swap places, so correct ones look wrong'],
        a: 0,
        mis: { 1: 'The four counts stay the same, so accuracy does not change.', 2: 'Both layouts are used; neither is wrong if it is labelled.', 3: 'TP and TN stay on the diagonal in both layouts. It is FP and FN that swap.' },
        ex: 'Swapping rows and columns keeps TP and TN on the diagonal but moves FP and FN into each other’s boxes. Reading the labels avoids mixing them up.' },

      // accuracy
      { id: 'u1-08-q28', c: 'accuracy', t: 'mcq', d: 1,
        q: 'Which formula gives a model’s <b>accuracy</b>?',
        o: ['(TP + TN) ÷ (TP + TN + FP + FN) × 100%', '(TP + FP) ÷ (TP + TN + FP + FN) × 100%', '(FP + FN) ÷ (TP + TN + FP + FN) × 100%', 'TP ÷ (TP + TN) × 100%'],
        a: 0,
        mis: { 1: 'TP + FP counts every “yes” prediction, including the wrong ones.', 2: 'FP + FN counts the mistakes, so this gives the error rate.' },
        ex: 'Accuracy is the share of all predictions that were correct. The correct ones are TP and TN; the total is all four boxes.' },
      { id: 'u1-08-q29', c: 'accuracy', t: 'num', d: 2,
        q: 'A model has TP = 42, TN = 48, FP = 6 and FN = 4. What is its accuracy, in %?',
        a: 90, unit: '%',
        ex: 'Correct = 42 + 48 = 90. Total = 42 + 48 + 6 + 4 = 100. Accuracy = 90 ÷ 100 × 100% = 90%.' },
      { id: 'u1-08-q30', c: 'accuracy', t: 'num', d: 2,
        q: 'A model has TP = 18, TN = 12, FP = 6 and FN = 4. What is its accuracy, in %?',
        a: 75, unit: '%',
        ex: 'Correct = 18 + 12 = 30. Total = 18 + 12 + 6 + 4 = 40. Accuracy = 30 ÷ 40 × 100% = 75%.' },
      { id: 'u1-08-q31', c: 'accuracy', t: 'num', d: 2,
        q: 'Layout: <b>rows = Actual, columns = Predicted</b>.<table class="tbl"><thead><tr><th></th><th>Predicted Yes</th><th>Predicted No</th></tr></thead><tbody><tr><th>Actual Yes</th><td>30</td><td>5</td></tr><tr><th>Actual No</th><td>10</td><td>55</td></tr></tbody></table>What is the model’s accuracy, in %?',
        a: 85, unit: '%',
        ex: 'Correct predictions are on the diagonal: 30 + 55 = 85. Total = 30 + 5 + 10 + 55 = 100. Accuracy = 85 ÷ 100 × 100% = 85%.' },
      { id: 'u1-08-q32', c: 'accuracy', t: 'num', d: 3,
        q: 'A plant-disease app is tested on 200 leaf photos: TP = 70, TN = 90, FP = 15, FN = 25. What is its accuracy, in %?',
        a: 80, unit: '%',
        ex: 'Correct = 70 + 90 = 160. Total = 70 + 90 + 15 + 25 = 200. Accuracy = 160 ÷ 200 × 100% = 80%.' },
      { id: 'u1-08-q33', c: 'accuracy', t: 'num', d: 3,
        q: 'A clinic tests a screening model on 100 people. Only 5 have the disease. The model predicts “No disease” for <b>everyone</b>. What is its accuracy, in %?',
        a: 95, unit: '%',
        ex: 'TP = 0, FN = 5, FP = 0, TN = 95. Accuracy = (0 + 95) ÷ 100 × 100% = 95% — even though it missed every sick person.' },
      { id: 'u1-08-q34', c: 'accuracy', t: 'mcq', d: 3,
        q: 'A clinic’s screening model is tested on 100 people, 5 of whom really have the disease. It says “No disease” to all 100 and scores 95% accuracy. Why is it still useless?',
        o: ['It missed all 5 sick people: 5 False Negatives', 'It flagged 95 healthy people: 95 False Positives', 'Its accuracy is far too low to use in any clinic', 'It was tested on too many people to be fair'],
        a: 0,
        mis: { 1: 'It never predicted “disease”, so it made 0 False Positives. The 95 are True Negatives.', 2: '95% sounds high. The problem is which cases it got wrong.', 3: '100 people is a reasonable test. The problem is the model’s missed cases.' },
        ex: 'The only people who needed help were the 5 sick ones, and the model missed all of them. A high accuracy can hide dangerous False Negatives when one answer is rare.' },
      { id: 'u1-08-q35', c: 'accuracy', t: 'mcq', d: 2,
        q: 'Model A gets 90 correct out of 100 test cases. Model B gets 160 correct out of 200. Which is more accurate?',
        o: ['Model A: 90% compared with 80%', 'Model B: it got 160 correct, not 90', 'They are equal: both made some mistakes', 'Model B: it was tested on more cases'],
        a: 0,
        mis: { 1: 'Compare the share correct, not the raw count: 160 ÷ 200 = 80%.', 3: 'More test cases do not raise accuracy by themselves.' },
        ex: 'Accuracy is a percentage: A = 90 ÷ 100 = 90%, B = 160 ÷ 200 = 80%. So Model A is more accurate.' },
      { id: 'u1-08-q36', c: 'accuracy', t: 'tf', d: 2,
        q: 'If a model has FP = 0 and FN = 0 on its test data, its accuracy on that test is 100%.',
        a: true,
        ex: 'True. With no False Positives or False Negatives, every prediction was correct, so (TP + TN) equals the total.' },

      // error-cost
      { id: 'u1-08-q37', c: 'error-cost', t: 'mcq', d: 2,
        q: 'An AI screens scans for cancer (positive = cancer). Which error is more dangerous?',
        o: ['A False Negative, because a sick patient is told they are healthy', 'A False Positive, because a healthy patient needs one more test', 'A True Negative, because a healthy patient is sent home', 'A True Positive, because a sick patient is sent for treatment'],
        a: 0,
        mis: { 1: 'A false alarm is worrying, but further tests can clear it up. A missed cancer delays treatment.', 2: 'A True Negative is a correct result, not an error.', 3: 'A True Positive is a correct result, not an error.' },
        ex: 'A False Negative means the disease is missed and treatment is delayed, which can be very harmful. A False Positive leads to extra checks.' },
      { id: 'u1-08-q38', c: 'error-cost', t: 'mcq', d: 2,
        q: 'For an email spam filter (positive = spam), which error usually causes more harm?',
        o: ['A False Positive, because a real email is hidden in spam', 'A False Negative, because one junk email reaches the inbox', 'A True Positive, because a spam email is moved to spam', 'A True Negative, because a real email reaches the inbox'],
        a: 0,
        mis: { 1: 'A junk email in your inbox is annoying, but you can simply delete it. A hidden real email may be missed entirely.' },
        ex: 'A False Positive can hide something important, like an exam or job email. A False Negative is just one unwanted message you can delete.' },
      { id: 'u1-08-q39', c: 'error-cost', t: 'multi', d: 2,
        q: 'In which situations is a False Negative especially dangerous? Select all that apply.',
        o: ['Screening for a serious disease', 'Detecting smoke in a building', 'Detecting cracks in a bridge', 'Suggesting a song you might like', 'Filtering spam from an inbox'],
        a: [0, 1, 2],
        ex: 'Missing a disease, a fire or a cracked bridge puts people in danger. Missing a song suggestion or a spam email does little harm.' },
      { id: 'u1-08-q40', c: 'error-cost', t: 'tf', d: 2,
        q: 'Tuning a model to catch more real positives often also increases the number of false positives.',
        a: true,
        ex: 'True. Making a model more eager to say “yes” catches more real cases but also raises more false alarms. This is the FP–FN trade-off.' },
      { id: 'u1-08-q41', c: 'error-cost', t: 'mcq', d: 3,
        q: 'A school science lab is fitting an AI fire alarm (positive = fire). Which setting is wiser?',
        o: ['Accept some false alarms so that real fires are not missed', 'Accept some missed fires so that there are no false alarms', 'Switch the alarm off during exams to avoid disturbance', 'Ignore both errors, because fires in schools are rare'],
        a: 0,
        mis: { 1: 'A missed fire (FN) puts lives at risk; a false alarm (FP) only costs time.', 2: 'Fires can happen at any time; switching off creates guaranteed misses.', 3: 'Rare events can still be deadly, so missing one matters.' },
        ex: 'For a fire alarm, a False Negative can cost lives, while a False Positive only interrupts a class. So it is wiser to accept a few false alarms.' },
      { id: 'u1-08-q42', c: 'error-cost', t: 'mcq', d: 3,
        q: 'An online exam-proctoring AI flags students as “cheating” (positive = cheating). Why is a False Positive serious here, and what is a good safeguard?',
        o: ['An honest student is accused; a teacher should review every flag', 'A cheater goes unnoticed; the AI should flag every student', 'The exam slows down; the AI should be switched off for toppers', 'It uses too much data; flags should be stored offline only'],
        a: 0,
        mis: { 1: 'That describes a False Negative. Flagging everyone would also create many more False Positives.', 2: 'Speed is not the issue, and treating toppers differently is unfair.', 3: 'Storage does not fix wrong accusations. Human review does.' },
        ex: 'A False Positive here accuses an honest student, which is unfair and upsetting. A human checking each flag before any action protects students.' },
      { id: 'u1-08-q43', c: 'error-cost', t: 'bins', d: 3,
        q: 'For each system, which error is usually worse?',
        bins: ['False Positive is worse', 'False Negative is worse'],
        items: [['Spam filter (positive = spam)', 0], ['Cancer screening (positive = cancer)', 1], ['Fire alarm (positive = fire)', 1], ['Exam-proctoring AI (positive = cheating)', 0], ['Airport bag scanner (positive = dangerous item)', 1], ['Phone face unlock (positive = this is the owner)', 0]],
        ex: 'Ask which mistake hurts people more. Hiding real emails, accusing honest students or unlocking for a stranger are FP harms. Missing cancer, fire or a dangerous item are FN harms.' }
    ],
    gens: ['conf-matrix', 'accuracy-calc']
  },
  // ───────────────────────────── u1-09 ─────────────────────────────
  {
    id: 'u1-09',
    title: 'Deployment and the Preventable Blindness Case',
    minutes: 70,
    outcomes: [
      'Apply knowledge of deployment to future AI projects and explore different deployment methods',
      'Trace the Preventable Blindness case study through all six stages of the AI Project Cycle',
      'Apply the AI Project Cycle to develop an AI model for Personalised Education'
    ],
    hook: 'A brilliant model that sits on a laptop helps nobody. Find out how AI leaves the lab and helps real patients in Madurai.',
    concepts: {
      'deploy-def': 'What deployment means',
      'deploy-methods': 'Ways to deploy a model',
      'monitoring': 'Monitoring, feedback and improvement',
      'blindness-case': 'The Preventable Blindness case study',
      'edu-ai': 'Personalised Education AI'
    },
    steps: [
      { kind: 'card', title: 'A model on a laptop helps nobody', html: `
<p>Diya trained a model that spots disease in tomato leaves. On her testing data it is right 94 times out of 100. She is thrilled!</p>
<p>But the model lives in a folder on her laptop. A farmer in Nashik, standing in her field with a sick plant, cannot use it at all.</p>
<p>Diya has finished five stages of the AI Project Cycle. The last stage is what turns her project into real help: <b>Deployment</b>.</p>
<div class="key"><b>Key idea</b> An AI model only creates value when it reaches the people who need it, in a form they can actually use.</div>` },
      { kind: 'card', title: 'What deployment means', html: `
<div class="def"><dfn>Deployment</dfn> Putting the evaluated model into real use: integrating it into a product or system, then monitoring and improving it.</div>
<p>Deployment is stage 6, the final stage, of the AI Project Cycle. It always comes <b>after Evaluation</b>, so that only a model that has passed its tests reaches real users.</p>
<ol class="flow">
  <li><b>Evaluated model</b><span>It has been tested on unseen data and works well enough.</span></li>
  <li><b>Integrate</b><span>Build it into an app, website, device or existing system.</span></li>
  <li><b>Release</b><span>Real users start using it in their daily lives.</span></li>
  <li><b>Monitor and improve</b><span>Watch how it performs and update it when needed.</span></li>
</ol>` },
      { kind: 'card', title: 'Ways to deploy a model', html: `
<p>Where should the model live? Choose the method that fits your users.</p>
<div class="cols">
  <div class="mini"><h4>📱 Mobile app</h4><p>A farmer photographs a leaf on her phone and gets advice.</p></div>
  <div class="mini"><h4>🌐 Website or web service</h4><p>Students type a question on a school portal and get help.</p></div>
  <div class="mini"><h4>📷 On a device (edge)</h4><p>The model runs inside the device itself, like a smart camera checking parts on a factory line, even with weak internet.</p></div>
  <div class="mini"><h4>🏥 Inside an existing system</h4><p>A hospital’s records software shows the AI’s result next to each patient’s scan.</p></div>
</div>
<div class="key"><b>Key idea</b> Think about your users: their devices, their internet, their language and where they work.</div>` },
      { kind: 'card', title: 'After launch: monitor and improve', html: `
<p>Deployment is not the end. The real world keeps changing: new roads open, new crop varieties arrive, new users speak differently.</p>
<ol class="flow">
  <li><b>Monitor</b><span>Track how accurate the predictions are in real use.</span></li>
  <li><b>Collect feedback</b><span>Let users report mistakes easily.</span></li>
  <li><b>Find problems</b><span>Does it work worse for some places or groups of people?</span></li>
  <li><b>Retrain and re-evaluate</b><span>Add new data, train again, and test again on unseen data.</span></li>
  <li><b>Redeploy</b><span>Release the improved version, and keep monitoring.</span></li>
</ol>
<div class="key"><b>Key idea</b> The AI Project Cycle is iterative. Feedback after deployment can send a team back to any earlier stage.</div>` },
      { kind: 'check', concepts: ['deploy-def', 'deploy-methods', 'monitoring'], n: 3 },
      { kind: 'card', title: 'Case study: the problem', html: `
<p><b>Preventable Blindness</b> is a real AI project. Let’s walk through it stage by stage.</p>
<div class="def"><dfn>Diabetic retinopathy</dfn> An eye disease linked to diabetes that affects the retina, the back of the eye. It can cause blindness if it is not detected early.</div>
<p><b>Stage 1: Problem Scoping.</b> India has too few eye specialists for the number of diabetic patients. So many patients cannot get their eyes checked in time.</p>
<div class="cols">
  <div class="mini"><h4>Who?</h4><p>Diabetic patients, and the eye doctors who treat them.</p></div>
  <div class="mini"><h4>What?</h4><p>Too few specialists to screen everyone’s retina early.</p></div>
  <div class="mini"><h4>Why?</h4><p>Catching the disease early gives a chance to prevent vision loss.</p></div>
</div>` },
      { kind: 'card', title: 'Case study: data and model', html: `
<ol class="flow">
  <li><b>Stage 2: Data Acquisition</b><span>About <b>128,000 retinal images</b> were collected. Each one was graded by ophthalmologists (eye specialists). These grades are the labels the model learns from.</span></li>
  <li><b>Stage 3: Data Exploration</b><span>This stage means studying the images and grades before training, for example checking that pictures are clear and that both healthy and diseased eyes are included.</span></li>
  <li><b>Stage 4: Modelling</b><span>Google, working with Verily, trained a <b>deep-learning model</b> on the graded images.</span></li>
</ol>
<div class="key"><b>Key idea</b> This is a <b>learning-based</b> model. Nobody wrote rules for “what a diseased retina looks like”; the model learned the patterns from the specialists’ graded examples.</div>` },
      { kind: 'card', title: 'Case study: evaluate and deploy', html: `
<ol class="flow">
  <li><b>Stage 5: Evaluation</b><span>This stage means comparing the model’s grades with specialists’ grades on images it has never seen. The most dangerous error is a <b>False Negative</b>: a patient with the disease marked as healthy.</span></li>
  <li><b>Stage 6: Deployment</b><span>The system was deployed with <b>Aravind Eye Hospital in Madurai</b> to screen retina photos.</span></li>
</ol>
<div class="eg"><b>Why it helps</b> The AI screens the photos, so that doctors can focus their limited time on the patients who need treatment.</div>
<div class="warn"><b>Careful</b> The AI does not replace eye doctors. It supports them, so that more patients can be screened.</div>` },
      { kind: 'card', title: 'The whole case on one page', html: `
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Stage</th><th>Preventable Blindness</th></tr></thead>
  <tbody>
    <tr><td>Problem Scoping</td><td>Diabetic retinopathy can cause blindness if not detected early; too few eye specialists for many diabetic patients</td></tr>
    <tr><td>Data Acquisition</td><td>About 128,000 retinal images graded by ophthalmologists</td></tr>
    <tr><td>Data Exploration</td><td>Study the images and grades before training</td></tr>
    <tr><td>Modelling</td><td>A deep-learning (learning-based) model trained on the graded images</td></tr>
    <tr><td>Evaluation</td><td>Compare its grades with specialists’ grades on unseen images</td></tr>
    <tr><td>Deployment</td><td>Screening retina photos with Aravind Eye Hospital, Madurai</td></tr>
  </tbody>
</table></div>` },
      { kind: 'check', concepts: ['blindness-case'], n: 3 },
      { kind: 'card', title: 'Your turn: a Personalised Education AI', html: `
<p>In a class of 40, students learn at different speeds. One worksheet cannot suit everyone. Let’s plan an AI that helps.</p>
<ol class="flow">
  <li><b>Problem Scoping</b><span>Students need practice that matches their level; teachers cannot plan 40 different worksheets.</span></li>
  <li><b>Data Acquisition</b><span>Quiz scores per topic, time spent on each lesson, and which questions were answered wrongly.</span></li>
  <li><b>Data Exploration</b><span>Graphs show which topics many students struggle with.</span></li>
  <li><b>Modelling</b><span>A learning-based model recommends the next practice for each learner.</span></li>
  <li><b>Evaluation</b><span>Check the learning gains: do students’ later quiz scores improve?</span></li>
  <li><b>Deployment</b><span>Build it into a learning app, and keep monitoring how it works for every student.</span></li>
</ol>` },
      { kind: 'card', title: 'Doing it responsibly', html: `
<div class="cols">
  <div class="mini"><h4>🔒 Protect student data</h4><p>Ask students and parents for permission. Collect only what the model needs, like quiz scores, not home addresses.</p></div>
  <div class="mini"><h4>📈 Measure real learning</h4><p>Judge the AI by learning gains, not by how many minutes students spend clicking.</p></div>
  <div class="mini"><h4>🧑‍🏫 Keep teachers in charge</h4><p>Teachers see the suggestions and can change them. The AI supports teaching; it does not replace it.</p></div>
</div>
<div class="warn"><b>Careful</b> Two common mistakes: thinking a good test score means the model is already deployed, and thinking deployment means the work is finished. Neither is true.</div>` },
      { kind: 'lab', lab: 'cycle-walk', title: 'Walk two projects through the cycle', intro: 'Guide the Preventable Blindness project and a Personalised Education AI through all six stages. At each stage, pick the right action from three choices and see why the others do not fit.' },
      { kind: 'check', concepts: ['edu-ai'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // deploy-def
      { id: 'u1-09-q01', c: 'deploy-def', t: 'mcq', d: 1,
        q: 'What does <b>deployment</b> mean in the AI Project Cycle?',
        o: ['Putting the evaluated model into real use in a product', 'Collecting the very first set of data for a new project', 'Drawing graphs to explore the patterns in the data', 'Writing the problem statement with the 4Ws canvas'],
        a: 0,
        ex: 'Deployment is the final stage: the tested model is built into something people use, then monitored and improved.' },
      { id: 'u1-09-q02', c: 'deploy-def', t: 'mcq', d: 1,
        q: 'Where does Deployment come in the AI Project Cycle?',
        o: ['Stage 6, the last stage, after Evaluation', 'Stage 4, straight after Data Exploration', 'Stage 1, before any data is collected', 'Stage 5, just before Evaluation'],
        a: 0,
        ex: 'The order is Problem Scoping → Data Acquisition → Data Exploration → Modelling → Evaluation → Deployment. Only an evaluated model should be deployed.' },
      { id: 'u1-09-q03', c: 'deploy-def', t: 'tf', d: 1,
        q: 'A model should be deployed only after it has been evaluated on testing data.',
        a: true,
        ex: 'True. Evaluation checks that the model works on unseen data, so that only a model that passed its tests reaches real users.' },
      { id: 'u1-09-q04', c: 'deploy-def', t: 'mcq', d: 2,
        q: 'Diya’s leaf-disease model scores 94% on testing data, but it only runs in a folder on her laptop and no farmer can use it. Which stage is missing?',
        o: ['Deployment', 'Evaluation', 'Data Acquisition', 'Problem Scoping'],
        a: 0,
        mis: { 1: 'She has already tested it — that 94% is her evaluation result.', 2: 'She clearly has data; she trained and tested a model with it.', 3: 'She knows the problem; the model just never reached the users.' },
        ex: 'Her model is built and tested, but it has not been put into a product farmers can use. That is the Deployment stage.' },
      { id: 'u1-09-q05', c: 'deploy-def', t: 'tf', d: 2,
        q: 'Once a model is deployed, the project is finished and the model never needs attention again.',
        a: false,
        ex: 'False. Deployed models must be monitored, because the real world changes and new problems appear. Teams update and redeploy them.' },
      { id: 'u1-09-q06', c: 'deploy-def', t: 'mcq', d: 3,
        q: 'Which of these shows a model that has actually been <b>deployed</b>?',
        o: ['A crop-advice model built into an app farmers use daily', 'A model that scored 92% on its testing data in the research lab', 'A dataset of 10,000 soil readings saved on a laptop at home', 'A chart showing ten years of rainfall in a district'],
        a: 0,
        mis: { 1: 'A good test score is the Evaluation stage. It is not yet in real use.', 2: 'A dataset is the result of Data Acquisition, not a deployed model.', 3: 'A chart belongs to Data Exploration.' },
        ex: 'Deployment means real people are using the model in a product. Only the farmers’ app shows that.' },

      // deploy-methods
      { id: 'u1-09-q07', c: 'deploy-methods', t: 'match', d: 1,
        q: 'Match each deployment method to an example.',
        pairs: [['Mobile app', 'A farmer photographs a leaf on her phone for advice'], ['Website', 'Students type a question on a school portal'], ['On a device (edge)', 'A smart camera checks parts on a factory line by itself'], ['Inside an existing system', 'A hospital’s records software flags a scan for a doctor']],
        ex: 'The method is where the model lives: in a phone app, on a website, inside a device, or built into software people already use.' },
      { id: 'u1-09-q08', c: 'deploy-methods', t: 'mcq', d: 1,
        q: 'What does deploying a model “on a device” (edge) mean?',
        o: ['The model runs inside the device itself, like a camera', 'The model is printed on paper and handed out to users', 'The model is only shown off at a school science exhibition', 'The model stays on the developer’s laptop for good'],
        a: 0,
        ex: 'On-device (edge) deployment puts the model inside the device, so it can work quickly and often without a strong internet connection.' },
      { id: 'u1-09-q09', c: 'deploy-methods', t: 'mcq', d: 2,
        q: 'Farmers in a hilly district have phones but very weak internet. Which deployment suits them best?',
        o: ['A phone app whose model runs on the phone itself', 'A website that needs a fast, constant connection', 'A large server that farmers must visit in a city', 'A program that runs only in a school computer lab'],
        a: 0,
        mis: { 1: 'A website needs good internet, which is exactly what is missing.', 2: 'Travelling to a city is not practical for daily farm decisions.', 3: 'Farmers need help in their fields, not in a lab.' },
        ex: 'If the model runs on the phone itself, farmers can use it in the field without a strong internet connection.' },
      { id: 'u1-09-q10', c: 'deploy-methods', t: 'multi', d: 2,
        q: 'Which of these are ways to deploy an AI model? Select all that apply.',
        o: ['As a mobile app', 'As a website or web service', 'Built into a device like a smart camera', 'Inside a hospital’s existing software', 'Saved in a folder that nobody opens'],
        a: [0, 1, 2, 3],
        ex: 'Apps, websites, devices and existing systems all put the model into real use. A model in an unused folder has not been deployed.' },
      { id: 'u1-09-q11', c: 'deploy-methods', t: 'mcq', d: 3,
        q: 'A hospital wants doctors to see the AI’s eye-scan result inside the same software they already use for patient records. Which deployment method fits?',
        o: ['Integrating the model into the hospital’s existing system', 'Releasing a separate game app for patients to download', 'Printing the results and posting them to doctors weekly', 'Running the model only on one researcher’s laptop'],
        a: 0,
        mis: { 1: 'Doctors need results in their own workflow, not in a separate patient game.', 2: 'Weekly printouts are slow and are not a way of deploying a model.', 3: 'A model on one laptop has not been deployed at all.' },
        ex: 'Building the model into the software doctors already use puts results where they need them, with no extra steps.' },
      { id: 'u1-09-q12', c: 'deploy-methods', t: 'mcq', d: 2,
        q: 'A smart speaker recognises its wake word (“Hey…”) even when the Wi-Fi is off. Where is that wake-word model deployed?',
        o: ['On the device itself (edge)', 'Only on a public website', 'Inside a hospital’s records system', 'On a printed instruction sheet'],
        a: 0,
        mis: { 1: 'A website would need the internet, but this works with Wi-Fi off.' },
        ex: 'Working without Wi-Fi means the model must be running inside the speaker itself, which is on-device (edge) deployment.' },

      // monitoring
      { id: 'u1-09-q13', c: 'monitoring', t: 'mcq', d: 1,
        q: 'Why should a team monitor a model after deployment?',
        o: ['To check it still works as the real world changes', 'To stop users from giving any feedback about it', 'To delete all the training data as quickly as possible', 'To lock the model so that it can never be changed again'],
        a: 0,
        ex: 'The real world changes and real users differ from test data, so a model’s performance can drop. Monitoring catches this early.' },
      { id: 'u1-09-q14', c: 'monitoring', t: 'order', d: 2,
        q: 'Put the improvement loop after launch in order.',
        items: ['Deploy the model', 'Monitor its predictions in real use', 'Collect feedback and new data', 'Retrain and re-evaluate the model', 'Deploy the improved version'],
        ex: 'You can only monitor something that is in use. Feedback and new data lead to retraining, which must be tested again before the new version is released.' },
      { id: 'u1-09-q15', c: 'monitoring', t: 'tf', d: 2,
        q: 'The AI Project Cycle is iterative: feedback after deployment can send a team back to earlier stages.',
        a: true,
        ex: 'True. Problems found after launch may need new data, a new model or even a rethink of the problem, so the cycle repeats.' },
      { id: 'u1-09-q16', c: 'monitoring', t: 'mcq', d: 2,
        q: 'Users of a Hindi voice app report that it often misunderstands speakers from Bihar. What should the team do?',
        o: ['Collect more voice samples from those speakers and retrain', 'Ignore the reports, since the model passed its tests', 'Remove Hindi from the app so that these errors cannot happen', 'Tell all users to speak only in English from now on'],
        a: 0,
        mis: { 1: 'Passing tests once does not guarantee real-world performance. Feedback shows the gaps.', 2: 'Removing the language shuts out the very users who need it.', 3: 'The app should adapt to users, not force users to change.' },
        ex: 'User feedback has revealed a group the model handles poorly. More data from that group and retraining can fix the gap.' },
      { id: 'u1-09-q17', c: 'monitoring', t: 'multi', d: 2,
        q: 'Which are good monitoring practices for a deployed model? Select all that apply.',
        o: ['Track how accurate predictions are over time', 'Give users an easy way to report mistakes', 'Check results for different groups of users', 'Turn off error reports so the app looks perfect', 'Never update the model after launch day'],
        a: [0, 1, 2],
        ex: 'Good monitoring tracks accuracy, listens to users and checks fairness across groups. Hiding errors or never updating lets problems grow.' },
      { id: 'u1-09-q18', c: 'monitoring', t: 'mcq', d: 3,
        q: 'A travel-time model in Pune was accurate for a year. After a new flyover opened, its predictions got worse. Why?',
        o: ['Real traffic patterns changed, so the model needs new data', 'The model got tired after making so many predictions', 'The flyover’s sensors deleted the model’s rules', 'Every model loses accuracy on a fixed date each year'],
        a: 0,
        mis: { 1: 'Models do not get tired. The world they predict has changed.', 2: 'Nothing was deleted; the model simply learned from older traffic patterns.', 3: 'There is no fixed expiry date. Accuracy drops when reality changes.' },
        ex: 'The model learned from traffic before the flyover. When reality changed, its old patterns stopped fitting, so it needs new data and retraining.' },
      { id: 'u1-09-q19', c: 'monitoring', t: 'mcq', d: 3,
        q: 'Which is the clearest sign that a deployed model needs retraining?',
        o: ['Its accuracy on recent real cases has dropped steadily', 'Its app icon has not been changed for more than a year', 'Many people are using it every single day', 'It gives its answers in under one second'],
        a: 0,
        mis: { 1: 'An app icon has nothing to do with how well the model predicts.', 2: 'Lots of users is good news, not a sign of a problem.', 3: 'Fast answers are fine; what matters is whether they are correct.' },
        ex: 'A steady drop in real-world accuracy shows that the model’s learned patterns no longer fit reality, so it needs new data and retraining.' },

      // blindness-case
      { id: 'u1-09-q20', c: 'blindness-case', t: 'mcq', d: 1,
        q: 'Which disease is at the centre of the Preventable Blindness case study?',
        o: ['Diabetic retinopathy', 'Viral conjunctivitis', 'Night blindness', 'Dengue fever'],
        a: 0,
        ex: 'Diabetic retinopathy is an eye disease linked to diabetes. It can cause blindness if it is not detected early.' },
      { id: 'u1-09-q21', c: 'blindness-case', t: 'tf', d: 1,
        q: 'Diabetic retinopathy can cause blindness if it is not detected early.',
        a: true,
        ex: 'True. That is why early screening matters so much, and why the project is called Preventable Blindness.' },
      { id: 'u1-09-q22', c: 'blindness-case', t: 'mcq', d: 2,
        q: 'What was the main problem that the Preventable Blindness project set out to solve?',
        o: ['India has too few eye specialists for its diabetic patients', 'Diabetic patients in India were refusing to have any eye tests', 'Eye hospitals could not store any patient records safely', 'Diabetes medicines were too costly for most patients'],
        a: 0,
        mis: { 1: 'The problem was not unwilling patients — it was too few specialists to check them.', 2: 'Record storage was not the problem in this case study.', 3: 'The case is about detecting eye disease early, not about medicine costs.' },
        ex: 'There are not enough eye specialists to screen every diabetic patient in time, so many cases could be missed until it is too late.' },
      { id: 'u1-09-q23', c: 'blindness-case', t: 'mcq', d: 1,
        q: 'About how many retinal images were used to train the Preventable Blindness model?',
        o: ['About 128,000', 'About 1,280', 'About 12,800', 'About 12.8 crore'],
        a: 0,
        ex: 'About 128,000 retinal images, each graded by ophthalmologists, were used to train the model.' },
      { id: 'u1-09-q24', c: 'blindness-case', t: 'mcq', d: 2,
        q: 'Who graded (labelled) the retinal images that the model learned from?',
        o: ['Ophthalmologists (eye specialists)', 'The patients themselves', 'A rule-based computer program', 'Volunteers with no medical training'],
        a: 0,
        mis: { 1: 'Patients cannot judge their own retina images; this needs expert training.', 2: 'The labels came from human experts, which the model then learned from.', 3: 'Grading retina images needs trained eye specialists.' },
        ex: 'Ophthalmologists graded each image. Their expert grades are the “right answers” that the model learned to copy.' },
      { id: 'u1-09-q25', c: 'blindness-case', t: 'mcq', d: 2,
        q: 'What kind of model was built in the Preventable Blindness case?',
        o: ['A deep-learning model that learned from graded images', 'A rule-based decision tree written by one programmer', 'A spreadsheet formula that adds up eye-test scores', 'A pie chart comparing healthy and diseased eyes'],
        a: 0,
        mis: { 1: 'Nobody wrote the rules by hand; the model learned from about 128,000 graded images.', 2: 'A formula is fixed; this model learned patterns from examples.', 3: 'A chart is a way to explore data, not a model that makes predictions.' },
        ex: 'Google, with Verily, trained a deep-learning model — a learning-based approach — on the specialists’ graded images.' },
      { id: 'u1-09-q26', c: 'blindness-case', t: 'mcq', d: 1,
        q: 'Where in India was the Preventable Blindness system deployed?',
        o: ['With Aravind Eye Hospital in Madurai', 'At a cricket academy in Mumbai', 'At a railway station in Kolkata', 'In a school computer lab in Delhi'],
        a: 0,
        ex: 'The system was deployed with Aravind Eye Hospital in Madurai to screen retina photos.' },
      { id: 'u1-09-q27', c: 'blindness-case', t: 'order', d: 2,
        q: 'Put the Preventable Blindness project in the order of the AI Project Cycle.',
        items: ['Problem: too few eye specialists to screen many diabetic patients', 'Data: about 128,000 retinal images graded by ophthalmologists', 'Model: a deep-learning model learns from the graded images', 'Evaluation: its grades are compared with specialists’ grades', 'Deployment: retina photos screened with Aravind Eye Hospital'],
        ex: 'The project follows the cycle: scope the problem, gather labelled data, build the model, evaluate it, then deploy it in a real hospital.' },
      { id: 'u1-09-q28', c: 'blindness-case', t: 'match', d: 2,
        q: 'Match each stage to what happened in the Preventable Blindness case.',
        pairs: [['Problem Scoping', 'Too few specialists for many diabetic patients'], ['Data Acquisition', 'Retinal images graded by ophthalmologists'], ['Modelling', 'Training a deep-learning model'], ['Deployment', 'Screening with Aravind Eye Hospital, Madurai']],
        ex: 'Each stage has a clear job: define the problem, collect labelled data, build the model, and put it into real use.' },
      { id: 'u1-09-q29', c: 'blindness-case', t: 'mcq', d: 3,
        q: 'Why is it helpful that the AI <b>screens</b> retina photos instead of replacing eye doctors?',
        o: ['Doctors can focus on the patients who need treatment', 'Doctors would no longer need any training in eye care', 'Patients no longer need to visit any hospital', 'The AI can prescribe medicines with no checks'],
        a: 0,
        mis: { 1: 'Doctors are still essential; they treat the patients the AI flags.', 2: 'Patients flagged by the screening still need a doctor’s care.', 3: 'The AI screens photos; treatment decisions stay with doctors.' },
        ex: 'With too few specialists, screening lets the AI check many photos so doctors can spend their limited time on patients who need treatment.' },
      { id: 'u1-09-q30', c: 'blindness-case', t: 'mcq', d: 3,
        q: 'In retina screening (positive = disease found), which error would be the most serious?',
        o: ['A False Negative: a patient with the disease is marked healthy', 'A False Positive: a healthy patient is sent for one extra check', 'A True Positive: a patient with the disease is sent to a doctor', 'A True Negative: a healthy patient is told their eyes look fine'],
        a: 0,
        mis: { 1: 'A false alarm costs an extra visit, but a missed case can lead to vision loss.', 2: 'This is a correct result and exactly what screening is for.', 3: 'This is a correct result, not an error.' },
        ex: 'A False Negative means a patient who needs treatment is missed. Since the disease can cause blindness if not caught early, this error is the most harmful.' },

      // edu-ai
      { id: 'u1-09-q31', c: 'edu-ai', t: 'mcq', d: 1,
        q: 'What is the main goal of a Personalised Education AI?',
        o: ['To recommend the next practice that suits each learner', 'To give every student exactly the same worksheet', 'To replace all teachers with a single chatbot', 'To publish students’ marks on a public website'],
        a: 0,
        ex: 'Students learn at different speeds, so the AI suggests practice that matches each learner’s level.' },
      { id: 'u1-09-q32', c: 'edu-ai', t: 'multi', d: 2,
        q: 'Which data would be useful and appropriate for a Personalised Education AI? Select all that apply.',
        o: ['Quiz scores on each topic', 'Time spent on each lesson', 'Which questions were answered wrongly', 'Students’ home addresses', 'Parents’ bank account details'],
        a: [0, 1, 2],
        ex: 'Scores, time spent and wrong answers show what each learner needs. Addresses and bank details do not help recommend practice and should not be collected.' },
      { id: 'u1-09-q33', c: 'edu-ai', t: 'order', d: 2,
        q: 'Put the stages of building a Personalised Education AI in order.',
        items: ['Problem: students learn at different speeds', 'Data: collect quiz scores and time spent', 'Explore: spot topics where many students struggle', 'Model: recommend the next practice for each learner', 'Evaluate: check whether learning actually improved', 'Deploy: build it into a learning app'],
        ex: 'This follows the six stages: Problem Scoping, Data Acquisition, Data Exploration, Modelling, Evaluation, Deployment.' },
      { id: 'u1-09-q34', c: 'edu-ai', t: 'mcq', d: 2,
        q: 'How should a team evaluate its Personalised Education AI?',
        o: ['Check if students’ learning improved after using it', 'Count how many different colours the app’s buttons use', 'Check that every student is given identical questions', 'Measure how long the app takes to download'],
        a: 0,
        mis: { 1: 'Colours are about design, not about whether students learn.', 2: 'Identical questions defeat the purpose of personalising.', 3: 'Download time does not tell you if the recommendations help learning.' },
        ex: 'The goal is better learning, so the key test is learning gains, such as better scores on later quizzes.' },
      { id: 'u1-09-q35', c: 'edu-ai', t: 'bins', d: 2,
        q: 'Sort each Personalised Education AI activity into its stage.',
        bins: ['Data Acquisition', 'Modelling', 'Deployment'],
        items: [['Recording quiz scores and time spent', 0], ['Building it into the school’s learning app', 2], ['Training the model to suggest the next practice', 1], ['Logging which questions each student got wrong', 0], ['Students start using the suggestions in class', 2], ['Choosing a learning-based approach for recommendations', 1]],
        ex: 'Gathering scores and answers is Data Acquisition; choosing and training the model is Modelling; putting it in the app for students is Deployment.' },
      { id: 'u1-09-q36', c: 'edu-ai', t: 'mcq', d: 3,
        q: 'Students’ quiz data is personal. Which practice is best for the Personalised Education AI team?',
        o: ['Collect only needed data, with students’ and parents’ consent', 'Collect as much data as possible in case it is useful one day', 'Share all scores publicly so students can compare with friends', 'Sell the data to companies to pay for building the app'],
        a: 0,
        mis: { 1: 'Collecting extra data “just in case” increases privacy risk for no benefit.', 2: 'Public scores can embarrass students and break their privacy.', 3: 'Selling student data without consent breaks their trust and privacy.' },
        ex: 'Collecting only what is needed (data minimisation) with clear permission (consent) protects students’ privacy.' },
      { id: 'u1-09-q37', c: 'edu-ai', t: 'mcq', d: 3,
        q: 'After deployment, Ayaan’s class notices the AI keeps giving very easy questions to students who already score well. What is the best next step?',
        o: ['Use the feedback to adjust and retrain the model', 'Accept it, because the model passed its evaluation once', 'Delete all of the quiz data so the model starts from nothing', 'Tell high scorers to answer wrongly on purpose'],
        a: 0,
        mis: { 1: 'Passing one evaluation does not mean it is perfect. Feedback shows what to fix.', 2: 'Deleting the data throws away what the model needs to learn.', 3: 'Wrong answers on purpose would give the model bad data.' },
        ex: 'Monitoring and feedback are part of deployment. The team should use this feedback to improve the model, then evaluate and redeploy it.' }
    ]
  },
  // ───────────────────────────── u1-10 ─────────────────────────────
  {
    id: 'u1-10',
    title: 'AI Ethics and the Moral Machine',
    minutes: 80,
    outcomes: [
      'Understand and reflect on the ethical issues around AI',
      'Play the role of major stakeholders and decide what is ethical and what is not for a given scenario',
      'Explore the Moral Machine to understand the impact of ethical concerns'
    ],
    hook: 'A self-driving car must choose, and there is no perfect answer. Who should decide what it does?',
    concepts: {
      'ethics-def': 'What AI ethics means',
      'principles': 'Key ethical principles',
      'stakeholders': 'Stakeholder perspectives and role-play',
      'moral-machine': 'Moral dilemmas and the Moral Machine',
      'privacy': 'Privacy and consent in AI',
      'transparency': 'Transparency and accountability'
    },
    steps: [
      { kind: 'card', title: 'Who should get the tutoring?', html: `
<p>Your school has <b>20 free seats</b> in an extra-tutoring programme and <b>200 students</b>. An AI will choose who gets a seat, using last year’s marks.</p>
<p>Sounds efficient. But think about Rohan. He scored low because he was in hospital for two months. Does the AI know that? Should marks be the only thing that counts? Who checks the AI’s choices?</p>
<p>These are not questions about code. They are questions about what is <b>right and fair</b>. That is what ethics is about.</p>
<div class="key"><b>Key idea</b> Every AI that makes decisions about people raises ethical questions, not just technical ones.</div>` },
      { kind: 'card', title: 'What is AI ethics?', html: `
<div class="def"><dfn>AI ethics</dfn> The moral principles that guide how AI is designed and used.</div>
<div class="cols">
  <div class="mini"><h4>🔧 Technical question</h4><p>“<b>Can</b> we build an AI that picks students for tutoring?”</p></div>
  <div class="mini"><h4>⚖️ Ethical question</h4><p>“<b>Should</b> we? If so, how do we make it fair, private and open to checking?”</p></div>
</div>
<p>Ethics matters more and more because AI now helps make decisions in hospitals, banks, schools and on roads. One AI system can affect lakhs of people at once.</p>
<div class="warn"><b>Careful</b> Being legal and accurate is not the same as being ethical. A system can follow the law and still treat some people unfairly.</div>` },
      { kind: 'card', title: 'Principles that protect people', html: `
<div class="cols">
  <div class="mini"><h4>🧍 Human rights</h4><p>AI should respect people’s dignity and freedoms, and never be used to harm their basic rights.</p></div>
  <div class="mini"><h4>⚖️ Bias and fairness</h4><p>AI should treat different groups of people equally, not favour some over others.</p></div>
  <div class="mini"><h4>🔒 Privacy</h4><p>People should control how their personal data is collected, used and shared.</p></div>
  <div class="mini"><h4>🤝 Inclusion</h4><p>AI should work for everyone: every language, ability, age and background.</p></div>
</div>
<div class="eg"><b>Example</b> A government help-desk chatbot that works only in English leaves out millions of people. That is an <b>inclusion</b> problem.</div>` },
      { kind: 'card', title: 'Principles that build trust', html: `
<div class="cols">
  <div class="mini"><h4>🔍 Transparency</h4><p>People can understand how and why the AI made a decision, and know when an AI is being used.</p></div>
  <div class="mini"><h4>🙋 Accountability</h4><p>Clear people or organisations are responsible for what the AI does, and fix it when it goes wrong.</p></div>
  <div class="mini"><h4>🛡️ Safety</h4><p>The AI is tested carefully so that it does not put people in danger.</p></div>
</div>
<div class="key"><b>Key idea</b> The seven principles to remember: human rights, bias and fairness, privacy, inclusion, transparency, accountability and safety.</div>` },
      { kind: 'check', concepts: ['ethics-def', 'principles'], n: 3 },
      { kind: 'card', title: 'Stakeholders see things differently', html: `
<p>A <b>stakeholder</b> is anyone who affects, or is affected by, an AI system. Suppose a school plans <b>face-recognition attendance</b>.</p>
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Stakeholder</th><th>May welcome</th><th>May worry about</th></tr></thead>
  <tbody>
    <tr><td>Students</td><td>No more roll call</td><td>Being watched all day; errors marking them absent</td></tr>
    <tr><td>Parents</td><td>Knowing their child reached school</td><td>Where the face photos are stored and who sees them</td></tr>
    <tr><td>Teachers</td><td>Saving class time</td><td>Fixing the system’s mistakes</td></tr>
    <tr><td>Software company</td><td>A product schools want</td><td>Keeping the data safe and the system accurate</td></tr>
  </tbody>
</table></div>
<div class="key"><b>Key idea</b> One decision can help some people and worry others. Good ethical thinking listens to all of them.</div>` },
      { kind: 'card', title: 'How to run an ethics role-play', html: `
<p>In class, you may be asked to play a stakeholder and decide what is ethical in a scenario. Use these steps:</p>
<ol class="flow">
  <li><b>Pick your role</b><span>Student, parent, doctor, company, government official…</span></li>
  <li><b>List gains and losses</b><span>What does this person gain? What could they lose?</span></li>
  <li><b>Name the principles</b><span>Is it about fairness, privacy, safety, inclusion…?</span></li>
  <li><b>Decide and explain</b><span>Say what you think is right, and give your reason.</span></li>
  <li><b>Compare views</b><span>Listen to other roles. Where do you agree? Where not?</span></li>
</ol>
<div class="warn"><b>Careful</b> The aim is not to “win” or to find one stakeholder who is always right. It is to see the whole picture before deciding.</div>` },
      { kind: 'check', concepts: ['stakeholders'], n: 2 },
      { kind: 'card', title: 'The Moral Machine', html: `
<p>The <b>Moral Machine</b> is a website created by researchers at MIT. It shows you situations that a self-driving car might face.</p>
<div class="eg"><b>Example</b> A self-driving car’s brakes suddenly fail. It can stay in its lane or swerve. Each choice leads to harm for a <i>different</i> group. You decide what the car should do, then see how your choices compare with other people’s.</div>
<p>These situations are <b>moral dilemmas</b>: every option has a cost, so there is no answer that makes everyone happy.</p>
<div class="key"><b>Key idea</b> The Moral Machine shows that ethical choices are hard and that people disagree about them, yet someone has to decide what a machine will do.</div>` },
      { kind: 'card', title: 'What dilemmas teach AI designers', html: `
<p>A human driver reacts in a split second. A self-driving car follows choices that its designers made long before. So those choices must be made carefully and openly.</p>
<div class="cols">
  <div class="mini"><h4>🗣️ Decide openly</h4><p>Publish the principles the system follows, so the public can question them.</p></div>
  <div class="mini"><h4>🌏 Involve many voices</h4><p>Ask people of different ages, places and backgrounds, not just engineers.</p></div>
  <div class="mini"><h4>📜 Follow the law</h4><p>Obey road-safety and other laws, and work with the people who make them.</p></div>
</div>
<p>The same thinking applies beyond cars: a loan app, a hospital assistant or an exam-proctoring AI all face hard choices.</p>` },
      { kind: 'lab', lab: 'moral-machine', title: 'Face six AI dilemmas', intro: 'Work through six dilemmas, from a self-driving car to an exam-proctoring AI. For each one, pick a stakeholder role and a choice, see how others might view it, and discover your own priority profile.' },
      { kind: 'check', concepts: ['moral-machine'], n: 2 },
      { kind: 'card', title: 'Privacy in AI', html: `
<p>AI systems run on data, and much of it is about people: faces, voices, locations, marks, health.</p>
<ol class="flow">
  <li><b>Consent</b><span>Ask people clearly, and let them agree knowing what their data will be used for.</span></li>
  <li><b>Data minimisation</b><span>Collect only the data that is truly needed, nothing extra “just in case”.</span></li>
  <li><b>Use it only for the stated purpose</b><span>Data collected for attendance should not be sold to advertisers.</span></li>
  <li><b>Keep it safe, then delete it</b><span>Protect stored data and delete it when it is no longer needed.</span></li>
</ol>
<div class="eg"><b>Example</b> A step-counting app has no reason to ask for your contacts and photos. Deny permissions that an app does not need.</div>` },
      { kind: 'card', title: 'Transparency and accountability', html: `
<div class="cols">
  <div class="mini"><h4>🔍 Transparency in practice</h4><p>Tell people when they are dealing with an AI. Explain the main reasons for a decision: “Your form was rejected because the income proof was missing.”</p></div>
  <div class="mini"><h4>🙋 Accountability in practice</h4><p>Name who is responsible. Let a human review big decisions. Give people a way to complain and to have mistakes corrected.</p></div>
</div>
<div class="warn"><b>Careful</b> “The AI decided” is never an excuse. An AI is a tool. The people and organisations that build and use it are responsible for what it does.</div>` },
      { kind: 'check', concepts: ['privacy', 'transparency'], n: 3 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // ethics-def
      { id: 'u1-10-q01', c: 'ethics-def', t: 'mcq', d: 1,
        q: 'What is <b>AI ethics</b>?',
        o: ['The moral principles that guide how AI is designed and used', 'The grammar rules that a chatbot uses to write its sentences', 'The speed at which an AI model makes its decisions', 'The cost of buying computers for an AI project'],
        a: 0,
        ex: 'AI ethics is about right and wrong in how AI is built and used: fairness, privacy, safety, responsibility and more.' },
      { id: 'u1-10-q02', c: 'ethics-def', t: 'tf', d: 1,
        q: 'AI ethics asks not only “Can we build this?” but also “Should we, and how?”',
        a: true,
        ex: 'True. Technical skill tells us what is possible; ethics asks whether it is right and how to do it fairly and safely.' },
      { id: 'u1-10-q03', c: 'ethics-def', t: 'mcq', d: 2,
        q: 'Which of these is an <b>ethical</b> question about an AI project?',
        o: ['Is it fair to everyone the AI makes decisions about?', 'How many lines of code does the model need?', 'Which colour should the app’s logo be?', 'How quickly does the model load on a laptop?'],
        a: 0,
        mis: { 1: 'Code length is a technical detail, not a question of right and wrong.', 2: 'Logo colour is a design choice with no ethical weight.', 3: 'Loading speed is a technical performance question.' },
        ex: 'Fairness is about how people are treated, which is an ethical question. The others are technical or design details.' },
      { id: 'u1-10-q04', c: 'ethics-def', t: 'mcq', d: 2,
        q: 'Why does AI ethics matter more as AI is used in hospitals, banks and schools?',
        o: ['Decisions there can strongly affect people’s lives', 'AI in those places no longer needs any data at all', 'Ethics only applies to very expensive computers', 'Hospitals and banks do not use any other technology'],
        a: 0,
        mis: { 1: 'AI in these places uses lots of data, often personal data.', 2: 'Ethics depends on the impact on people, not on the price of the computer.' },
        ex: 'In these places AI can affect health, money and education, sometimes for very many people at once, so mistakes and unfairness matter a lot.' },
      { id: 'u1-10-q05', c: 'ethics-def', t: 'tf', d: 2,
        q: 'If an AI system is legal and accurate, there are no ethical questions left to ask about it.',
        a: false,
        ex: 'False. A legal, accurate system can still invade privacy, leave people out, or treat some groups unfairly.' },

      // principles
      { id: 'u1-10-q06', c: 'principles', t: 'match', d: 1,
        q: 'Match each ethical principle to its meaning.',
        pairs: [['Privacy', 'People control how their personal data is used'], ['Fairness', 'Different groups of people are treated equally'], ['Transparency', 'People can understand how and why it decides'], ['Accountability', 'Someone is responsible when things go wrong'], ['Safety', 'The AI does not put people in danger']],
        ex: 'Each principle protects people in a different way: their data, equal treatment, understanding, responsibility and physical safety.' },
      { id: 'u1-10-q07', c: 'principles', t: 'mcq', d: 1,
        q: 'Which principle is about making sure AI works for everyone, including people with disabilities and speakers of every language?',
        o: ['Inclusion', 'Accountability', 'Transparency', 'Safety'],
        a: 0,
        ex: 'Inclusion means designing AI so that nobody is left out because of their language, ability, age or background.' },
      { id: 'u1-10-q08', c: 'principles', t: 'multi', d: 1,
        q: 'Which of these are key concerns in AI ethics? Select all that apply.',
        o: ['Bias and fairness', 'Privacy of personal data', 'Accountability for mistakes', 'Making the app look colourful', 'Using the newest phone model'],
        a: [0, 1, 2],
        ex: 'Fairness, privacy and accountability are core ethical concerns. Colours and phone models are design or technical choices.' },
      { id: 'u1-10-q09', c: 'principles', t: 'mcq', d: 2,
        q: 'A government website offers its AI help-desk only in English. Which principle is most at risk?',
        o: ['Inclusion', 'Privacy', 'Safety', 'Accountability'],
        a: 0,
        mis: { 1: 'No personal data is being misused here. The issue is who is left out.', 2: 'Nobody is put in physical danger; people are shut out.', 3: 'Responsibility is not the main issue; access is.' },
        ex: 'Many people in India do not read English, so an English-only service leaves them out. That is an inclusion problem.' },
      { id: 'u1-10-q10', c: 'principles', t: 'mcq', d: 2,
        q: 'A delivery robot is tested for months to make sure it never bumps into children on footpaths. Which principle is this mainly about?',
        o: ['Safety', 'Privacy', 'Inclusion', 'Transparency'],
        a: 0,
        mis: { 1: 'Privacy is about personal data, not physical harm.', 3: 'Transparency is about explaining decisions, not avoiding harm.' },
        ex: 'Careful testing so that the AI does not put people in danger is the principle of safety.' },
      { id: 'u1-10-q11', c: 'principles', t: 'mcq', d: 2,
        q: 'A bank’s chatbot tells Meera, “Your loan was declined because your income proof was missing.” Which principle does this show?',
        o: ['Transparency', 'Accountability', 'Safety', 'Inclusion'],
        a: 0,
        mis: { 1: 'Accountability is about who is responsible; here the AI is explaining its reason.', 2: 'Nobody is in danger here; the point is the explanation.', 3: 'Inclusion is about access for everyone; this is about explaining a decision.' },
        ex: 'Giving the main reason for a decision helps Meera understand it and fix the problem. That is transparency.' },
      { id: 'u1-10-q12', c: 'principles', t: 'mcq', d: 3,
        q: 'A factory installs AI cameras that track every worker’s movements all day, even during breaks, and send minute-by-minute reports to managers. What is the main ethical concern?',
        o: ['It may harm workers’ privacy and dignity', 'It may make the factory machines run faster', 'It may improve the accuracy of factory data', 'It may help workers learn new skills quickly'],
        a: 0,
        mis: { 1: 'Faster machines are not an ethical concern about the workers.', 2: 'Better data may be a benefit, but the question asks about the concern.', 3: 'Constant tracking does not teach skills; it raises privacy worries.' },
        ex: 'Watching people all the time, even on breaks, goes beyond what is needed and can harm their privacy and dignity, which are basic human-rights concerns.' },
      { id: 'u1-10-q13', c: 'principles', t: 'bins', d: 3,
        q: 'Sort each action: does it respect ethics, or raise an ethical concern?',
        bins: ['Respects ethics', 'Raises an ethical concern'],
        items: [['An app asks permission before using your location', 0], ['A health AI’s suggestions are checked by doctors', 0], ['A camera app shares users’ faces with advertisers without telling them', 1], ['A hiring AI rejects people from certain areas with no reason', 1], ['A school explains to parents how its AI tutor uses data', 0], ['A chatbot pretends to be a human customer-care agent', 1]],
        ex: 'Asking permission, human checks and clear explanations respect people. Secret data sharing, unfair rejection and pretending to be human break privacy, fairness and transparency.' },

      // stakeholders
      { id: 'u1-10-q14', c: 'stakeholders', t: 'mcq', d: 1,
        q: 'Who is a <b>stakeholder</b> in an AI project?',
        o: ['Anyone who affects or is affected by the AI system', 'Only the programmer who writes the code', 'Only the company that sells the product', 'Only the people who paid money for the whole project'],
        a: 0,
        ex: 'Stakeholders include users, the people the AI makes decisions about, the builders, and others affected, not just the makers or buyers.' },
      { id: 'u1-10-q15', c: 'stakeholders', t: 'multi', d: 2,
        q: 'A school plans face-recognition attendance. Who are the stakeholders? Select all that apply.',
        o: ['Students', 'Parents', 'Teachers', 'The company providing the software', 'A football club in another country'],
        a: [0, 1, 2, 3],
        ex: 'Students, parents, teachers and the software company all affect or are affected by the system. A distant football club has no connection to it.' },
      { id: 'u1-10-q16', c: 'stakeholders', t: 'mcq', d: 2,
        q: 'In a role-play about face-recognition attendance, which concern would a <b>parent</b> most likely raise?',
        o: ['Where are my child’s photos stored, and who can see them?', 'How many lines of code does the system contain?', 'Which programming language did the company use?', 'How fast can the software company grow its profits?'],
        a: 0,
        mis: { 1: 'Parents care about their child, not code length.', 2: 'The programming language does not affect the child directly.', 3: 'Company profits are the company’s concern, not usually a parent’s.' },
        ex: 'A parent’s main worry is their child’s safety and privacy: what happens to the face photos and who can access them.' },
      { id: 'u1-10-q17', c: 'stakeholders', t: 'mcq', d: 2,
        q: 'Why do ethics role-plays ask students to take on different stakeholder roles?',
        o: ['To see how one decision helps some and worries others', 'To find the one stakeholder who is always in the right', 'To practise acting skills for the annual school play', 'To decide which of the stakeholders can be ignored'],
        a: 0,
        mis: { 1: 'No single stakeholder is always right; each sees part of the picture.', 3: 'The aim is to include every view, not to ignore some.' },
        ex: 'Stepping into different roles shows the whole picture: gains for some, risks for others. That leads to fairer decisions.' },
      { id: 'u1-10-q18', c: 'stakeholders', t: 'order', d: 2,
        q: 'Put the steps of an ethics role-play in order.',
        items: ['Pick a stakeholder role', 'List what this person gains or loses', 'Name the ethical principles involved', 'Decide what you think is right and why', 'Compare your view with other roles'],
        ex: 'You first take a role, then think about its gains and losses, link them to principles, decide with reasons, and finally compare views.' },
      { id: 'u1-10-q19', c: 'stakeholders', t: 'mcq', d: 3,
        q: 'A city plans AI cameras to fine traffic offenders automatically. Which stakeholder’s view is mainly about <b>privacy</b>?',
        o: ['A resident worried that the cameras record everyone, not just offenders', 'A traffic officer hoping for fewer accidents at the city’s busy junctions', 'A taxi driver who wants every fine checked for mistakes', 'A city official who wants fines to be collected faster'],
        a: 0,
        mis: { 1: 'Fewer accidents is about safety.', 2: 'Checking fines for mistakes is about accuracy and accountability.', 3: 'Faster collection is about efficiency.' },
        ex: 'Recording every passer-by, not only offenders, collects personal data about many innocent people. That is a privacy concern.' },
      { id: 'u1-10-q20', c: 'stakeholders', t: 'mcq', d: 3,
        q: 'Role-play: a school AI picks students for free tutoring using only past marks. You play Rohan, who scored low because he was ill for two months. Which concern should you raise?',
        o: ['Marks alone may not show a student’s real need or ability', 'The AI should give tutoring seats only to toppers', 'The school should stop recording marks altogether', 'Illness has nothing to do with tutoring decisions'],
        a: 0,
        mis: { 1: 'That ignores students like Rohan who need help most.', 2: 'Marks are useful; the issue is using them as the only measure.', 3: 'Rohan’s illness explains his marks, so it matters for a fair decision.' },
        ex: 'Rohan’s low marks came from illness, not from his ability. Using only marks can be unfair, so the school should consider more information or let a human review cases.' },

      // moral-machine
      { id: 'u1-10-q21', c: 'moral-machine', t: 'mcq', d: 1,
        q: 'What is the <b>Moral Machine</b>?',
        o: ['An MIT website that poses self-driving car dilemmas', 'A robot that teaches moral science classes in schools', 'A machine that always finds the single right answer', 'A video game about designing faster racing cars'],
        a: 0,
        ex: 'The Moral Machine, created by researchers at MIT, asks people what a self-driving car should do in hard situations and compares their answers.' },
      { id: 'u1-10-q22', c: 'moral-machine', t: 'mcq', d: 2,
        q: 'What does the Moral Machine mainly show?',
        o: ['Ethical choices are hard, and people often disagree', 'Self-driving cars never face difficult situations', 'Computers already know the right answer to every dilemma', 'Only engineers need to think about ethics'],
        a: 0,
        mis: { 1: 'The whole point is that hard situations can happen.', 2: 'A machine follows choices made by people; it does not know the “right” answer.', 3: 'The website invites everyone to think about these choices, not just engineers.' },
        ex: 'People give different answers to the same dilemma, which shows how hard these choices are and why they need open discussion.' },
      { id: 'u1-10-q23', c: 'moral-machine', t: 'tf', d: 1,
        q: 'In a moral dilemma, every choice has some cost, so there may be no option that everyone agrees is right.',
        a: true,
        ex: 'True. That is what makes it a dilemma: each option protects some people or values and costs others.' },
      { id: 'u1-10-q24', c: 'moral-machine', t: 'mcq', d: 2,
        q: 'Since people disagree about dilemmas, what should AI designers do?',
        o: ['Decide the rules openly and explain them to the public', 'Keep the rules secret so that nobody can complain', 'Let the car choose randomly in every situation', 'Avoid testing the car in any difficult situation'],
        a: 0,
        mis: { 1: 'Secret rules cannot be questioned or improved, and break transparency.', 2: 'Random choices avoid responsibility instead of facing it.', 3: 'Skipping hard tests makes the car less safe, not more.' },
        ex: 'Because there is no answer everyone agrees on, the choices must be made openly, explained, and open to public discussion.' },
      { id: 'u1-10-q25', c: 'moral-machine', t: 'multi', d: 3,
        q: 'A team is building a self-driving shuttle for a college campus. Which are good ways to handle hard ethical choices? Select all that apply.',
        o: ['Involve many different people in deciding the rules', 'Publish the principles the shuttle follows', 'Follow road-safety laws and rules', 'Hide the rules to protect company secrets', 'Let one engineer decide everything alone'],
        a: [0, 1, 2],
        ex: 'Including many voices, publishing the principles and obeying the law make the choices fairer and more trustworthy. Secrecy and one-person decisions do the opposite.' },
      { id: 'u1-10-q26', c: 'moral-machine', t: 'mcq', d: 3,
        q: 'In a Moral Machine-style survey, Meera and Arjun choose different answers to the same dilemma. What should a designer learn from this?',
        o: ['People’s values differ, so rules need open discussion', 'One of them must have misread or rushed the question', 'The survey must be broken and should be deleted at once', 'Dilemmas only matter for cars, not for other AI'],
        a: 0,
        mis: { 1: 'Thoughtful people can read the same question and still disagree.', 2: 'Disagreement is the useful finding, not a fault.', 3: 'Loan apps, hospital tools and proctoring AIs face hard choices too.' },
        ex: 'Disagreement shows that people hold different values. Designers must discuss them openly and explain the rules they choose.' },

      // privacy
      { id: 'u1-10-q27', c: 'privacy', t: 'mcq', d: 1,
        q: 'What does <b>consent</b> mean when collecting data?',
        o: ['People agree, knowing what their data will be used for', 'People’s data is collected without them knowing', 'People pay money to have their data stored', 'People’s data is always deleted within one day'],
        a: 0,
        ex: 'Consent means people clearly agree to share their data and understand what it will be used for.' },
      { id: 'u1-10-q28', c: 'privacy', t: 'mcq', d: 1,
        q: 'What is <b>data minimisation</b>?',
        o: ['Collecting only the data that is truly needed', 'Shrinking photos so they use less storage', 'Deleting all data as soon as it is collected', 'Collecting extra data in case it helps later'],
        a: 0,
        ex: 'Data minimisation means taking only what the task needs. Less personal data collected means less that can be misused or leaked.' },
      { id: 'u1-10-q29', c: 'privacy', t: 'tf', d: 2,
        q: 'A fitness app that only counts steps should still ask for access to your contacts and photos, in case they are useful later.',
        a: false,
        ex: 'False. Counting steps does not need contacts or photos. Asking for them breaks data minimisation and puts your privacy at risk.' },
      { id: 'u1-10-q30', c: 'privacy', t: 'mcq', d: 2,
        q: 'A quiz app asks for your microphone, contacts and location, but it only needs to show questions and record answers. What is the best response?',
        o: ['Allow only what the app needs and deny the rest', 'Allow everything, since apps always need all permissions', 'Deny everything, including what the quiz needs', 'Share your password so the app can verify you'],
        a: 0,
        mis: { 1: 'Apps often ask for more than they need. You can say no.', 2: 'Denying what it truly needs may stop it working; deny only the extras.', 3: 'Never share your password with an app.' },
        ex: 'Give only the permissions an app needs for its job. That protects your data while letting the app work.' },
      { id: 'u1-10-q31', c: 'privacy', t: 'mcq', d: 3,
        q: 'A school’s AI tutor wants to keep students’ voice recordings forever “to improve the model”. Which change best respects privacy?',
        o: ['Ask consent, explain the purpose, delete after a set time', 'Keep the recordings forever, but on a larger hard disk', 'Share the recordings with other schools to compare accents', 'Stop telling parents about it so that nobody worries'],
        a: 0,
        mis: { 1: 'More storage keeps more data, which increases the risk.', 2: 'Sharing spreads the data further without consent.', 3: 'Hiding it breaks both consent and transparency.' },
        ex: 'Consent, a clear purpose and deleting data when it is no longer needed together protect students’ privacy.' },
      { id: 'u1-10-q32', c: 'privacy', t: 'bins', d: 2,
        q: 'Sort each practice: does it respect privacy or put it at risk?',
        bins: ['Respects privacy', 'Puts privacy at risk'],
        items: [['Asking before recording a student’s voice', 0], ['Collecting quiz scores but not home addresses', 0], ['Secretly selling users’ chats to advertisers', 1], ['Keeping all data forever with no reason', 1], ['Letting users delete their own data', 0], ['Posting students’ marks on a public website', 1]],
        ex: 'Consent, collecting less, and giving people control respect privacy. Secret selling, keeping data forever and public posting put it at risk.' },

      // transparency
      { id: 'u1-10-q33', c: 'transparency', t: 'mcq', d: 1,
        q: 'What does <b>transparency</b> mean for an AI system?',
        o: ['People can understand how and why the AI made a decision', 'The AI hides its reasons so that it stays simple', 'The AI’s full code is shown on every user’s screen', 'The AI never makes any mistakes at all'],
        a: 0,
        ex: 'Transparency means being open: telling people when AI is used and explaining the main reasons behind its decisions.' },
      { id: 'u1-10-q34', c: 'transparency', t: 'mcq', d: 1,
        q: 'What does <b>accountability</b> mean for an AI system?',
        o: ['Named people or teams answer for what the AI does', 'The AI calculates the accounts for a company', 'The AI blames its users whenever it makes mistakes', 'Nobody is responsible because a machine decided'],
        a: 0,
        ex: 'Accountability means someone answers for the AI’s actions, fixes mistakes and gives people a way to complain.' },
      { id: 'u1-10-q35', c: 'transparency', t: 'tf', d: 2,
        q: 'If an AI system makes a harmful mistake, the AI itself is responsible, not the people or company behind it.',
        a: false,
        ex: 'False. An AI is a tool. The people and organisations that build, sell and use it are responsible for what it does.' },
      { id: 'u1-10-q36', c: 'transparency', t: 'mcq', d: 3,
        q: 'An AI tool lowers some students’ project marks. When they ask why, the company replies, “The model decided; we can’t say why, and we can’t change it.” Which principles are missing?',
        o: ['Transparency and accountability', 'Safety and inclusion of all users', 'Privacy and informed consent', 'Speed and accuracy of the model'],
        a: 0,
        mis: { 1: 'Nobody is in danger or left out here; the problem is no explanation and no responsibility.', 2: 'No personal data is being misused in this example.', 3: 'Speed and accuracy are technical qualities, not ethical principles.' },
        ex: 'Not explaining the decision breaks transparency. Refusing to take responsibility or fix it breaks accountability.' },
      { id: 'u1-10-q37', c: 'transparency', t: 'mcq', d: 3,
        q: 'A hospital uses an AI to suggest which patients need urgent care. What best keeps the system accountable?',
        o: ['Doctors check its suggestions; a named team handles complaints', 'The AI’s suggestions are followed with no human checks at all', 'Patients are never told that an AI is involved in their care', 'The software company alone decides every patient’s treatment'],
        a: 0,
        mis: { 1: 'With no human checks, nobody catches or answers for mistakes.', 2: 'Hiding the AI breaks transparency and trust.', 3: 'Treatment decisions belong with the hospital’s doctors.' },
        ex: 'Human review and a clear team responsible for problems mean someone answers for every decision and can correct mistakes.' },
      { id: 'u1-10-q38', c: 'transparency', t: 'multi', d: 2,
        q: 'Which of these make an AI system more transparent? Select all that apply.',
        o: ['Telling users when they are talking to an AI', 'Explaining the main reasons behind a decision', 'Publishing what kinds of data the system uses', 'Hiding how decisions are made from users', 'Changing the rules without telling anyone'],
        a: [0, 1, 2],
        ex: 'Openness about the AI, its reasons and its data builds understanding and trust. Hiding or secretly changing things does the opposite.' }
    ]
  },
  // ───────────────────────────── u1-11 ─────────────────────────────
  {
    id: 'u1-11',
    title: 'AI Bias, AI Access and the Balloon Debate',
    minutes: 80,
    outcomes: [
      'Gain awareness around AI bias and AI access',
      'Discuss possible bias in data collection and the implications of AI technology',
      'Analyse the advantages and disadvantages of Artificial Intelligence'
    ],
    hook: 'Why does a voice assistant understand your friend perfectly but keep getting your grandmother wrong?',
    concepts: {
      'bias-def': 'What AI bias is',
      'bias-sources': 'Where bias comes from',
      'reduce-bias': 'Ways to reduce bias',
      'ai-access': 'AI access and the digital divide',
      'ai-impact': 'Advantages and disadvantages of AI'
    },
    steps: [
      { kind: 'card', title: 'It understands my friend, not my grandmother', html: `
<p>Sana’s voice assistant understands her school friends perfectly. But when her grandmother, who speaks with a strong Odia accent, asks it to call Sana, it gets the request wrong again and again.</p>
<p>Her grandmother is not speaking “wrongly”. The problem is the model. It learned from lots of voices that sound like Sana’s friends, and very few that sound like her grandmother.</p>
<div class="key"><b>Key idea</b> An AI can work well for some people and badly for others, simply because of the data it learned from. This is called <b>AI bias</b>.</div>` },
      { kind: 'card', title: 'What is AI bias?', html: `
<div class="def"><dfn>AI bias</dfn> Unfair outcomes from an AI system because its training data or design reflects human prejudice or leaves some groups out.</div>
<p>Many people think a machine must be neutral. But a learning-based model learns from data made by people. If that data is unfair or incomplete, the model learns the unfairness too.</p>
<div class="warn"><b>Careful</b> A model can be highly accurate <i>overall</i> and still be unfair. Imagine 95% accuracy overall, but only 70% for one small group. The overall number hides the problem.</div>
<p>Bias is usually not on purpose. That is exactly why teams must look for it carefully.</p>` },
      { kind: 'card', title: 'Where bias comes from', html: `
<div class="cols">
  <div class="mini"><h4>📉 Unrepresentative data</h4><p>Some groups are missing or rare in the training data, like few rural voices or few photos of darker skin.</p></div>
  <div class="mini"><h4>📜 Historical bias</h4><p>The data records past decisions that were unfair, so the model learns to repeat them.</p></div>
  <div class="mini"><h4>🏷️ Labelling bias</h4><p>The people who label the examples add their own stereotypes or mistakes.</p></div>
  <div class="mini"><h4>🛠️ Design choices</h4><p>Decisions by the builders, such as which languages to support or what default voice to use, can leave people out or reinforce stereotypes.</p></div>
</div>` },
      { kind: 'card', title: 'Bias in real AI systems', html: `
<div class="tblwrap"><table class="tbl">
  <thead><tr><th>Example</th><th>What went wrong</th><th>Source</th></tr></thead>
  <tbody>
    <tr><td>Voice assistants and accents</td><td>Work worse for accents that were rare in the training voices</td><td>Unrepresentative data</td></tr>
    <tr><td>Voice assistants with female voices by default</td><td>Can reinforce the stereotype that helpers and assistants are women</td><td>Design choice</td></tr>
    <tr><td>Face recognition</td><td>Trained mostly on one skin tone, so it makes more mistakes on others</td><td>Unrepresentative data</td></tr>
    <tr><td>A hiring tool</td><td>Trained on past hiring decisions that favoured men, so it learned to favour men</td><td>Historical bias</td></tr>
  </tbody>
</table></div>` },
      { kind: 'check', concepts: ['bias-def', 'bias-sources'], n: 3 },
      { kind: 'card', title: 'Reducing bias', html: `
<p>Bias can rarely be removed completely, but it can be reduced a lot.</p>
<ol class="flow">
  <li><b>Collect representative data</b><span>Include every group who will use the system: regions, accents, ages, skin tones, genders.</span></li>
  <li><b>Check accuracy for each group</b><span>Do not trust the overall number alone. Compare the groups.</span></li>
  <li><b>Build diverse teams</b><span>People from different backgrounds spot problems others miss.</span></li>
  <li><b>Label carefully</b><span>Give labellers clear guidelines, and have more than one person check.</span></li>
  <li><b>Keep humans in the loop</b><span>Let people review important decisions, and keep monitoring after launch.</span></li>
</ol>` },
      { kind: 'lab', lab: 'bias-lab', title: 'Fix a biased voice assistant', intro: 'A voice assistant is trained on speech from three accent groups, starting with a very uneven mix. Spend your budget on collecting more samples and shrink the accuracy gap between the best and worst group to under 5 points.' },
      { kind: 'check', concepts: ['reduce-bias'], n: 2 },
      { kind: 'card', title: 'AI access and the digital divide', html: `
<div class="def"><dfn>Digital divide</dfn> The gap between people who have access to devices, the internet, data and digital or AI skills, and people who do not.</div>
<p>To benefit from AI, a person needs several things. Missing even one of them can shut that person out, however useful the AI is.</p>
<div class="cols">
  <div class="mini"><h4>📱 Devices</h4><p>A smartphone or computer at home.</p></div>
  <div class="mini"><h4>📶 Internet</h4><p>A connection that is fast and affordable enough.</p></div>
  <div class="mini"><h4>🗣️ Language</h4><p>Apps that work in a language the person knows.</p></div>
  <div class="mini"><h4>🎓 Skills and cost</h4><p>Knowing how to use the tools, and being able to afford them.</p></div>
</div>` },
      { kind: 'card', title: 'Will AI widen or narrow the gap?', html: `
<div class="cols">
  <div class="mini"><h4>↔️ It can widen gaps</h4><p>If only some people have access, those with AI tools and skills get better jobs, better learning and higher incomes, while others fall further behind.</p></div>
  <div class="mini"><h4>🤝 It can narrow gaps</h4><p>AI can also open doors: voice-based apps help people who cannot read well, and translation lets people use services in their own language.</p></div>
</div>
<div class="eg"><b>Example</b> <b>Bhashini</b> is a Government of India platform that uses AI for translation and speech in Indian languages, so that more people can use digital services in their own language.</div>
<div class="key"><b>Key idea</b> Whether AI widens or narrows the gap depends on who can access it, and on choices made by designers and governments.</div>` },
      { kind: 'check', concepts: ['ai-access'], n: 2 },
      { kind: 'card', title: 'Advantages of AI', html: `
<p>Before you debate, you need the facts on both sides. Start with what AI does well.</p>
<div class="cols">
  <div class="mini"><h4>⚡ Speed and scale</h4><p>Processes huge amounts of data quickly, like screening thousands of medical images.</p></div>
  <div class="mini"><h4>🕐 Always available</h4><p>Works 24×7 without getting tired, and does repetitive tasks consistently.</p></div>
  <div class="mini"><h4>🩺 Helps experts</h4><p>Supports doctors, teachers and farmers, so they can focus on what needs a human.</p></div>
  <div class="mini"><h4>♿ Accessibility</h4><p>Translation, text-to-speech and voice control help many more people use technology.</p></div>
</div>` },
      { kind: 'card', title: 'Disadvantages and risks of AI', html: `
<div class="cols">
  <div class="mini"><h4>⚖️ Bias</h4><p>Can repeat or increase unfairness hidden in its data.</p></div>
  <div class="mini"><h4>🔒 Privacy</h4><p>Often needs personal data, which can be misused or leaked.</p></div>
  <div class="mini"><h4>💼 Job changes</h4><p>Some routine jobs may be automated, so workers need retraining. New jobs also appear.</p></div>
  <div class="mini"><h4>🤔 Over-dependence and errors</h4><p>It can make confident mistakes, and people may stop checking or thinking for themselves.</p></div>
</div>
<div class="key"><b>Key idea</b> AI is a tool with real benefits and real risks. A balanced view weighs both.</div>` },
      { kind: 'card', title: 'Preparing for the balloon debate', html: `
<p>In the balloon debate, you work in teams of three. Two teams get the <b>same theme</b>, such as Healthcare, Jobs or Education. One team argues that AI is <b>beneficial</b> for society; the other argues that it is <b>harmful</b>.</p>
<ol class="flow">
  <li><b>Claim</b><span>State your point clearly: “AI can help doctors screen more patients.”</span></li>
  <li><b>Example</b><span>Back it up: “AI screening of retina photos lets eye doctors focus on patients who need treatment.”</span></li>
  <li><b>Impact</b><span>Say why it matters: “More patients can be checked in time.”</span></li>
</ol>
<div class="warn"><b>Careful</b> Strong arguments use real examples, not feelings or exaggeration. “Robots will rule the world” is not evidence.</div>` },
      { kind: 'lab', lab: 'balloon-debate', title: 'Balloon debate: benefits vs risks', intro: 'Sort 12 statements about AI in Healthcare, Jobs and Education into benefits and risks. Then pick the three strongest arguments for your side and build a closing speech from them.' },
      { kind: 'check', concepts: ['ai-impact'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // bias-def
      { id: 'u1-11-q01', c: 'bias-def', t: 'mcq', d: 1,
        q: 'What is <b>AI bias</b>?',
        o: ['Unfair outcomes from prejudiced or incomplete data or design', 'A model that runs very slowly on an older computer or phone', 'A model that gives the correct answer for every single person', 'A choice of colours and fonts in an AI app’s design'],
        a: 0,
        ex: 'AI bias means the system treats some people unfairly, usually because its training data or design reflects prejudice or misses some groups.' },
      { id: 'u1-11-q02', c: 'bias-def', t: 'tf', d: 1,
        q: 'Because AI is a machine, it is always neutral and fair.',
        a: false,
        ex: 'False. A learning-based model learns from data made by people. If the data is unfair or incomplete, the model can be unfair too.' },
      { id: 'u1-11-q03', c: 'bias-def', t: 'mcq', d: 2,
        q: 'Why can an AI become biased even when nobody meant it to?',
        o: ['It learns from data, including any unfair patterns in it', 'It decides by itself to dislike certain people on purpose', 'Computers slowly become biased if they are used too much', 'It copies the opinions of whoever is using it today'],
        a: 0,
        mis: { 1: 'AI has no likes or dislikes of its own. Bias comes from its data or design.', 2: 'Heavy use does not create bias.', 3: 'A model learns from its training data, not from the current user’s opinions.' },
        ex: 'A model copies whatever patterns are in its data. If the data under-represents a group or records unfair decisions, the model learns that too.' },
      { id: 'u1-11-q04', c: 'bias-def', t: 'mcq', d: 2,
        q: 'Which of these is an example of AI bias?',
        o: ['A speech app understands one region’s accent far better than others', 'A speech app takes about two seconds to reply to every user', 'A speech app uses the same amount of battery for every user', 'A speech app works equally well for every accent it was tested on'],
        a: 0,
        mis: { 1: 'Being equally slow for everyone is not unfair to any group.', 2: 'Equal battery use treats everyone the same.', 3: 'Working equally well for every accent is the opposite of bias.' },
        ex: 'Bias means unequal results for different groups. Working much better for one accent than others is unfair to those other speakers.' },
      { id: 'u1-11-q05', c: 'bias-def', t: 'tf', d: 2,
        q: 'A model can be highly accurate overall and still be unfair to a smaller group.',
        a: true,
        ex: 'True. If one group is small, poor results for that group barely change the overall accuracy. That is why accuracy should be checked for each group.' },
      { id: 'u1-11-q06', c: 'bias-def', t: 'mcq', d: 3,
        q: 'A voice assistant is 95% accurate overall, but only 70% accurate for speakers with Northeast-Indian accents. What does this tell you?',
        o: ['The overall number hides poor performance for one group', 'The model is fair, because 95% is a high overall score', 'Northeast speakers must be using the assistant wrongly', 'Every group always has the same accuracy as the overall'],
        a: 0,
        mis: { 1: 'A high overall score can still hide a big gap between groups.', 2: 'The users are not the problem; the model has not learned their voices well.', 3: 'Group accuracies can differ a lot from the overall figure, as here.' },
        ex: 'The 95% average hides a 25-point gap. The model is biased against one group, most likely because their voices were rare in its training data.' },

      // bias-sources
      { id: 'u1-11-q07', c: 'bias-sources', t: 'match', d: 2,
        q: 'Match each source of bias to an example.',
        pairs: [['Unrepresentative data', 'Training photos show mostly one skin tone'], ['Historical bias', 'A hiring tool learns from years of unfair past decisions'], ['Labelling bias', 'People tagging data add their own stereotypes'], ['Design choice', 'A voice assistant is given a female voice by default']],
        ex: 'Bias can come from missing groups in the data, unfair history in the data, the people who label it, or choices made by the designers.' },
      { id: 'u1-11-q08', c: 'bias-sources', t: 'mcq', d: 1,
        q: 'Which is an example of <b>unrepresentative</b> training data?',
        o: ['A voice dataset of mostly city speakers, few village speakers', 'A voice dataset with equal samples from every region of India', 'A voice dataset that has been checked by many different reviewers', 'A voice dataset of clear recordings that are carefully labelled'],
        a: 0,
        ex: 'Unrepresentative data leaves some groups out or makes them rare. Village speakers are under-represented here, so the model will serve them less well.' },
      { id: 'u1-11-q09', c: 'bias-sources', t: 'mcq', d: 2,
        q: 'A company trains a hiring tool on its past hiring decisions, which mostly picked men. What is the likely result?',
        o: ['The tool learns to favour men, repeating the past unfairness', 'The tool becomes fair, because computers simply ignore gender', 'The tool picks only women, to balance out the past', 'The tool stops working, because the data is too old'],
        a: 0,
        mis: { 1: 'The tool learns from patterns in the data, and the data favours men.', 2: 'A model does not correct the past by itself; it copies it.', 3: 'Old data still works; the problem is the unfair pattern in it.' },
        ex: 'This is historical bias. The model treats past decisions as the “right answers”, so it learns to repeat their unfairness.' },
      { id: 'u1-11-q10', c: 'bias-sources', t: 'mcq', d: 2,
        q: 'Why have people criticised voice assistants that use a female voice by default?',
        o: ['It can reinforce a stereotype that assistants are women', 'Female voices are much harder for computers to produce', 'Male voices cannot be understood by most users', 'It makes the assistant answer people’s questions more slowly'],
        a: 0,
        mis: { 1: 'Computers can produce any kind of voice. The concern is the message it sends.', 2: 'Both voices can be understood. The concern is about stereotypes.', 3: 'Voice choice does not change answer speed.' },
        ex: 'A design choice can carry a social message. Always making the “helper” female can strengthen a gender stereotype.' },
      { id: 'u1-11-q11', c: 'bias-sources', t: 'mcq', d: 2,
        q: 'A face-recognition model was trained mostly on photos of people with lighter skin. What is the likely result?',
        o: ['It makes more mistakes for people with darker skin', 'It works equally well for every skin tone', 'It refuses to scan any face at all', 'It works better for darker skin than lighter skin'],
        a: 0,
        mis: { 1: 'A model learns best what it has seen most. Rare groups get more errors.', 2: 'It will still scan faces; it just makes more mistakes on some.', 3: 'It has seen fewer darker-skinned faces, so it does worse on them, not better.' },
        ex: 'The model saw few examples of darker skin, so it learned those faces less well and makes more errors on them.' },
      { id: 'u1-11-q12', c: 'bias-sources', t: 'tf', d: 2,
        q: 'Bias can enter an AI system when the people labelling its training data add their own stereotypes.',
        a: true,
        ex: 'True. The model learns from the labels as if they were correct, so stereotyped labels become stereotyped predictions.' },
      { id: 'u1-11-q13', c: 'bias-sources', t: 'multi', d: 2,
        q: 'Which of these can cause bias in an AI system? Select all that apply.',
        o: ['Training data that leaves some groups out', 'Past decisions in the data that were unfair', 'Labels added with the labellers’ stereotypes', 'Testing the model on data from every group', 'Reviewing results with a diverse team'],
        a: [0, 1, 2],
        ex: 'Missing groups, unfair history and stereotyped labels all put bias in. Testing across groups and diverse reviews help to find and reduce it.' },
      { id: 'u1-11-q14', c: 'bias-sources', t: 'bins', d: 3,
        q: 'Sort each case by its main source of bias.',
        bins: ['Unrepresentative data', 'Historical bias', 'Design choice'],
        items: [['A medical dataset with very few women patients', 0], ['A loan model trained on years of loans that unfairly rejected one community', 1], ['An assistant given only one default female voice', 2], ['A school-admission model trained on past admissions that favoured rich families', 1], ['A crop dataset with photos from only one state’s farms', 0], ['A chatbot built to answer only in English', 2]],
        ex: 'Missing or rare groups mean unrepresentative data. Unfair past decisions in the data are historical bias. Choices made by the builders, like voice or language, are design choices.' },
      { id: 'u1-11-q15', c: 'bias-sources', t: 'mcq', d: 3,
        q: 'A crop-disease app was trained only on photos of wheat fields in Punjab. It performs poorly for rice farmers in Kerala. What is the main source of this bias?',
        o: ['Unrepresentative training data', 'Historical bias in past decisions', 'Stereotyped labels added by taggers', 'A default voice chosen by designers'],
        a: 0,
        mis: { 1: 'No unfair past decisions are involved; Kerala’s crops were simply missing.', 2: 'The labels may be correct; the problem is which photos were collected.', 3: 'Voice design has nothing to do with this photo-based app.' },
        ex: 'The data covered only one crop and one region, so the model never learned what rice diseases in Kerala look like.' },

      // reduce-bias
      { id: 'u1-11-q16', c: 'reduce-bias', t: 'mcq', d: 1,
        q: 'What is the best way to reduce bias caused by unrepresentative data?',
        o: ['Collect more data from the groups that were left out', 'Remove the groups the model performs badly on', 'Train the model on the same data many more times', 'Hide the accuracy results from the public'],
        a: 0,
        ex: 'If some groups were missing or rare in the data, adding more good examples from them helps the model learn them properly.' },
      { id: 'u1-11-q17', c: 'reduce-bias', t: 'multi', d: 2,
        q: 'Which are good ways to reduce AI bias? Select all that apply.',
        o: ['Use diverse, representative training data', 'Test accuracy separately for each group', 'Include people from different backgrounds in the team', 'Test only with data from one city', 'Ignore user complaints after launch'],
        a: [0, 1, 2],
        ex: 'Representative data, per-group testing and diverse teams all help find and reduce bias. Narrow testing and ignoring complaints hide it.' },
      { id: 'u1-11-q18', c: 'reduce-bias', t: 'tf', d: 2,
        q: 'Checking a model’s accuracy separately for each group can reveal bias that the overall accuracy hides.',
        a: true,
        ex: 'True. A high average can hide a group with poor results. Comparing groups shows the gap.' },
      { id: 'u1-11-q19', c: 'reduce-bias', t: 'order', d: 2,
        q: 'Put the steps for fixing a biased voice assistant in order.',
        items: ['Measure accuracy for each accent group', 'Find the group with the lowest accuracy', 'Collect more samples from that group', 'Retrain the model', 'Test again to check the gap has shrunk'],
        ex: 'You must measure before you can find the weakest group. More data for that group leads to retraining, and testing again shows whether it worked.' },
      { id: 'u1-11-q20', c: 'reduce-bias', t: 'mcq', d: 2,
        q: 'A hiring tool is found to copy unfair past decisions. What is a good step?',
        o: ['Fix the unfair patterns in the data and add human review', 'Feed it even more of the same past hiring decisions', 'Let it make all the final decisions with no human review', 'Keep the tool secret so that nobody can question it'],
        a: 0,
        mis: { 1: 'More of the same unfair data teaches the same unfairness more strongly.', 2: 'Without review, nobody can catch its unfair decisions.', 3: 'Secrecy hides the problem instead of fixing it.' },
        ex: 'Fixing the data tackles the cause, and human review catches unfair decisions that slip through.' },
      { id: 'u1-11-q21', c: 'reduce-bias', t: 'mcq', d: 3,
        q: 'A voice model has 900 samples from Group A, 80 from Group B and 20 from Group C. Accuracy is lowest for Group C. You can collect 600 more samples. Which plan will shrink the gap between groups the most?',
        o: ['Spend most of the samples on Groups B and C', 'Spend all of the samples on Group A', 'Split them equally: 200 to each group', 'Collect none, since Group A already does well'],
        a: 0,
        mis: { 1: 'Group A already has plenty; this widens the gap.', 2: 'This helps a little, but Group A does not need 200 more.', 3: 'Doing nothing leaves Groups B and C poorly served.' },
        ex: 'The smallest groups have the poorest results, so new samples help most there. Group A already has plenty of data.' },
      { id: 'u1-11-q22', c: 'reduce-bias', t: 'mcq', d: 3,
        q: 'Kabir’s team is building a Tamil–English speech app. Which testing plan is best for catching bias?',
        o: ['Test with speakers of different ages, genders and regions', 'Test only with the team members who built the app', 'Test only with speakers from a single city', 'Test only in a quiet lab using one microphone'],
        a: 0,
        mis: { 1: 'The builders are a small, similar group; others may get worse results.', 2: 'One city misses the accents of other regions.', 3: 'Real users speak in noisy places on different phones.' },
        ex: 'Testing with a wide range of real users shows whether the app works fairly for everyone, not just for people like the builders.' },

      // ai-access
      { id: 'u1-11-q23', c: 'ai-access', t: 'mcq', d: 1,
        q: 'What is the <b>digital divide</b>?',
        o: ['Unequal access to devices, internet and digital skills', 'The line that splits a computer screen into two equal halves', 'The difference in price between old and new phone models', 'The split between people who prefer different phone brands'],
        a: 0,
        ex: 'The digital divide is unequal access to devices, the internet, data and digital or AI skills.' },
      { id: 'u1-11-q24', c: 'ai-access', t: 'multi', d: 1,
        q: 'Which of these are barriers to AI access in India? Select all that apply.',
        o: ['No smartphone or computer at home', 'Weak or costly internet', 'Apps only in a language you cannot read', 'Lack of digital skills or training', 'Too many free public libraries nearby'],
        a: [0, 1, 2, 3],
        ex: 'Devices, internet, language and skills are all needed to use AI. Libraries do not block access; they often help.' },
      { id: 'u1-11-q25', c: 'ai-access', t: 'mcq', d: 2,
        q: 'How could AI <b>widen</b> gaps in jobs and income?',
        o: ['People with AI skills get ahead, while others fall behind', 'Everyone automatically gains the same AI skills overnight', 'AI makes every single job in the country pay exactly the same', 'AI tools are only allowed in villages, not in cities'],
        a: 0,
        mis: { 1: 'Skills come from access and training, which are unequal.', 2: 'AI does not equalise pay; it may increase differences.', 3: 'This is not true; access is often better in cities.' },
        ex: 'When access is unequal, those who already have devices, internet and skills gain the most, so existing gaps can grow.' },
      { id: 'u1-11-q26', c: 'ai-access', t: 'mcq', d: 1,
        q: 'What is <b>Bhashini</b>?',
        o: ['A Government of India AI platform for Indian languages', 'A self-driving electric car that was designed and built in India', 'A social media app for sharing short videos and photos', 'A video game that teaches the history of ancient India'],
        a: 0,
        ex: 'Bhashini is a Government of India platform that uses AI for translation and speech in Indian languages.' },
      { id: 'u1-11-q27', c: 'ai-access', t: 'mcq', d: 2,
        q: 'How can a tool like Bhashini help narrow the digital divide?',
        o: ['People can use digital services in their own language', 'Everyone must learn English before going online', 'Phones become cheaper for every family in India', 'Internet speeds rise in every village overnight'],
        a: 0,
        mis: { 1: 'Bhashini does the opposite: it brings services to people’s own languages.', 2: 'Bhashini is about language, not the price of phones.', 3: 'Bhashini is about language, not internet speed.' },
        ex: 'Language is a major barrier. AI translation and speech in Indian languages let more people use online services.' },
      { id: 'u1-11-q28', c: 'ai-access', t: 'tf', d: 2,
        q: 'AI can either widen or narrow gaps in education, depending on who is able to access it.',
        a: true,
        ex: 'True. If only some students can use AI tools, gaps grow. If tools reach everyone, in their language and on low-cost devices, gaps can shrink.' },
      { id: 'u1-11-q29', c: 'ai-access', t: 'mcq', d: 3,
        q: 'A district plans an AI farming-advice service. Many farmers have basic phones and read only Marathi. Which design best improves access?',
        o: ['Voice messages in Marathi that work on basic phones', 'An English-only website full of detailed charts', 'A smartphone app that needs fast 5G internet', 'A paid service with a costly monthly subscription'],
        a: 0,
        mis: { 1: 'English text and charts shut out farmers who read only Marathi.', 2: 'Basic phones cannot run it, and fast internet may not be available.', 3: 'High cost is another barrier to access.' },
        ex: 'Designing around the users’ real devices and language, here basic phones and Marathi voice, lets the service reach the people it is meant for.' },
      { id: 'u1-11-q30', c: 'ai-access', t: 'bins', d: 3,
        q: 'Sort each plan: does it narrow or widen the digital divide?',
        bins: ['Narrows the gap', 'Widens the gap'],
        items: [['Free AI tutoring in Indian languages on low-cost phones', 0], ['An AI course open only to students who own laptops', 1], ['Voice-based apps for people who cannot read well', 0], ['AI exam coaching only for those who can pay high fees', 1], ['Public digital centres teaching AI skills in villages', 0], ['Government services available only through a smartphone app', 1]],
        ex: 'Plans that reach people with fewer devices, skills or money narrow the gap. Plans that need laptops, high fees or smartphones leave those people behind.' },
      { id: 'u1-11-q31', c: 'ai-access', t: 'mcq', d: 3,
        q: 'Sana’s school wants every student to use an AI learning app for homework, but some students have no device at home. What is the fairest step?',
        o: ['Let students use school computers and offer an offline option', 'Give homework marks only to students who use the app', 'Ignore those students, since most of the class has devices', 'Stop teaching anything about AI to the whole class'],
        a: 0,
        mis: { 1: 'This punishes students for something they cannot control.', 2: 'Ignoring them widens the gap the school should close.', 3: 'Removing AI for everyone does not help those without devices.' },
        ex: 'Providing access at school and an offline option lets every student take part, which narrows the digital divide.' },

      // ai-impact
      { id: 'u1-11-q32', c: 'ai-impact', t: 'bins', d: 1,
        q: 'Sort each point as an advantage or a disadvantage of AI.',
        bins: ['Advantage of AI', 'Disadvantage or risk of AI'],
        items: [['Works 24×7 without getting tired', 0], ['Can repeat bias found in its data', 1], ['Processes huge amounts of data quickly', 0], ['Some routine jobs may be automated', 1], ['Helps doctors screen patients faster', 0], ['Personal data may be misused or leaked', 1]],
        ex: 'Speed, constant availability and support for experts are advantages. Bias, job changes and privacy risks are disadvantages that need managing.' },
      { id: 'u1-11-q33', c: 'ai-impact', t: 'mcq', d: 1,
        q: 'Which of these is an <b>advantage</b> of AI?',
        o: ['It can do repetitive tasks quickly and consistently', 'It always understands human feelings perfectly', 'It never needs any data to work properly', 'It can never make any kind of mistake'],
        a: 0,
        ex: 'AI is good at fast, consistent, repetitive work. It does not truly understand feelings, it needs data, and it can make mistakes.' },
      { id: 'u1-11-q34', c: 'ai-impact', t: 'mcq', d: 1,
        q: 'Which of these is a <b>disadvantage</b> of AI?',
        o: ['People may over-depend on it and stop thinking critically', 'It can process large amounts of data very quickly', 'It can keep working at any hour of the day or night', 'It can help translate between many different Indian languages'],
        a: 0,
        ex: 'Over-dependence is a real risk: people may stop checking AI answers or using their own judgement. The other options are advantages.' },
      { id: 'u1-11-q35', c: 'ai-impact', t: 'tf', d: 2,
        q: 'AI can create new kinds of jobs even as it changes or replaces some existing ones.',
        a: true,
        ex: 'True. Some routine tasks may be automated, but new work also appears, such as building, checking and maintaining AI systems.' },
      { id: 'u1-11-q36', c: 'ai-impact', t: 'mcq', d: 2,
        q: 'In the balloon debate, how are the two teams on a theme set up?',
        o: ['Same theme; one team argues for AI and the other against it', 'Both get the same theme and both argue that AI is good for everyone', 'Each team picks a different theme and presents without any opponent', 'The teams vote on AI straight away without giving any reasons'],
        a: 0,
        mis: { 1: 'A debate needs opposing sides: one for AI and one against.', 2: 'Both teams work on the same theme so their arguments meet head-on.', 3: 'The point of the debate is to give reasons and evidence.' },
        ex: 'Two teams of three get the same theme. One argues for AI and the other against, so both benefits and risks are examined.' },
      { id: 'u1-11-q37', c: 'ai-impact', t: 'mcq', d: 2,
        q: 'Which is the strongest argument for the “AI is beneficial” side on the Healthcare theme?',
        o: ['Retina screening by AI lets eye doctors focus on patients in need', 'AI is exciting, and everybody seems to be talking about it these days', 'AI is used in many apps that people install on their phones every day', 'I personally feel that AI is good for all of us in so many ways'],
        a: 0,
        mis: { 1: 'Excitement is not evidence that AI helps patients.', 2: 'Being common does not show a benefit to health.', 3: 'A feeling is not an argument; give a claim, an example and its impact.' },
        ex: 'It gives a clear claim, a real example (retina screening) and an impact (doctors’ time goes to patients who need treatment).' },
      { id: 'u1-11-q38', c: 'ai-impact', t: 'mcq', d: 3,
        q: 'Which is the strongest argument for the “AI is harmful” side on the Jobs theme?',
        o: ['Some routine jobs may be automated, so workers need retraining support', 'Robots will very soon take over the whole world and rule over all humans', 'Machines are scary, and I think nobody really likes them very much', 'Computers cost a lot of money, so all AI must be bad for society'],
        a: 0,
        mis: { 1: 'This is an exaggeration with no evidence, and weakens your side.', 2: 'Feelings are not evidence.', 3: 'Cost alone does not prove AI is harmful; the leap is too big.' },
        ex: 'It makes a realistic claim about a real effect on workers and points to its impact. The others rely on exaggeration, feelings or weak logic.' },
      { id: 'u1-11-q39', c: 'ai-impact', t: 'multi', d: 2,
        q: 'Which of these are balanced, accurate statements about AI? Select all that apply.',
        o: ['AI can speed up tasks like sorting large amounts of data', 'AI can make mistakes, so important results need human checks', 'AI can give farmers advice in their own language', 'AI understands emotions in exactly the same way humans do', 'AI is always right because it learns from data'],
        a: [0, 1, 2],
        ex: 'AI is fast and can help many people, but it makes mistakes and does not truly understand feelings. Learning from data does not make it always right.' }
    ]
  }
];
