// Capstone — Build It Yourself. Mirrors CBSE 417 Class IX Part D (Project Work / Field Visit /
// Student Portfolio, related to the Sustainable Development Goals). Capstone topics have no
// practice/quiz: learners build things. Check steps use the small pools below.
export default {
  id: 'cp',
  title: 'Capstone: Build It Yourself',
  short: 'Capstone',
  color: 'teal',
  syllabus: 'Project Work / Student Portfolio (Part D) — related to the Sustainable Development Goals',
  topics: [
    // ---------------------------------------------------------------- cp-01
    {
      id: 'cp-01',
      title: 'Train Your Own Image Classifier',
      minutes: 90,
      outcomes: [
        'Create an AI model using tools like Teachable Machine or Machine Learning for Kids',
        'Collect and label training data for different classes, train a model and test it on new data',
        'Evaluate a classifier with a confusion matrix and accuracy, and improve it with better data'
      ],
      hook: 'Teach a computer to tell your doodles apart — no rules, only examples you draw yourself.',
      concepts: {
        'tm-workflow': 'Classes → samples → train → test → export',
        'train-test': 'Training data vs testing data',
        'cp-eval': 'Confusion matrix and accuracy for a classifier',
        'better-data': 'Improving a model with more, varied, balanced data'
      },
      steps: [
        {
          kind: 'card',
          title: 'What you will build',
          html: `<p>In Unit 1 you learnt that a <b>learning-based</b> model finds the rules itself from examples. Now you will make one.</p>
<p>You will build an <b>image classifier</b>: a model that looks at a picture and says which group, or <b>class</b>, it belongs to. Think of an app that tells a tomato leaf from a diseased one, or a bin that tells paper from plastic.</p>
<div class="cols"><div class="mini"><h4>🖍️ In this app</h4><p>Draw doodles, train a model on them, test it and read its confusion matrix.</p></div><div class="mini"><h4>💻 At home or school</h4><p>Repeat the same steps with real photos in Teachable Machine.</p></div></div>
<div class="key"><b>Key idea</b> This is Part D project 1 of your syllabus: “Create an AI model using tools like Teachable Machine or Machine Learning for Kids.”</div>`
        },
        {
          kind: 'card',
          title: 'How Teachable Machine works',
          html: `<p><b>Teachable Machine</b> (<code>teachablemachine.withgoogle.com</code>) is a free website from Google. You can train a model on images, sounds or body poses without writing code. Every project follows the same four steps:</p>
<ol class="flow"><li><b>Gather</b><span>Make classes and add samples from your webcam or from files.</span></li><li><b>Train</b><span>Press “Train Model”. The model finds the patterns that separate your classes.</span></li><li><b>Preview</b><span>Show it something new and watch its confidence for each class.</span></li><li><b>Export</b><span>Get a shareable link or use the model in a website or app.</span></li></ol>
<p>It learns quickly because it builds on a model that was already trained on a very large set of images. Your few dozen examples only teach it the final step: telling <i>your</i> classes apart.</p>`
        },
        {
          kind: 'card',
          title: 'Machine Learning for Kids',
          html: `<p><b>Machine Learning for Kids</b> (<code>machinelearningforkids.co.uk</code>) lets you train models on <b>text, images, numbers or sounds</b>, then use them inside <b>Scratch</b> to make games and apps.</p>
<ol class="flow"><li><b>Train</b><span>Create labels (classes) and add examples to each.</span></li><li><b>Learn &amp; Test</b><span>Train the model, then type or show new examples to test it.</span></li><li><b>Make</b><span>Use the model’s answer in a Scratch project, e.g. a game that reacts to what you type.</span></li></ol>
<div class="eg"><b>Example</b> Sort text messages into “compliment” and “insult”, then build a Scratch character that smiles or frowns.</div>
<div class="key"><b>Key idea</b> Both tools follow the AI Project Cycle: you acquire data, the tool does the modelling, and you evaluate the result before you use it.</div>`
        },
        {
          kind: 'card',
          title: 'Classes, samples and labels',
          html: `<div class="def"><dfn>Class</dfn> One group the model must recognise, such as “sun”, “fish” or “house”.</div>
<div class="def"><dfn>Sample</dfn> One labelled example. A doodle saved under “fish” is a sample with the label <i>fish</i>.</div>
<p>A computer cannot “see” a doodle. It sees numbers. In the doodle trainer, each drawing is shrunk to a <b>20 × 20 grid</b>: 400 squares, each inked or blank. Remember Unit 3: an image is a grid of numbers.</p>
<p>The model never gets a rule like “a fish has a tail”. It only gets grids with labels, and it must find the patterns itself.</p>
<div class="warn"><b>Careful</b> A wrong label teaches the wrong lesson. If you save a house under “fish”, the model learns that houses are fish.</div>`
        },
        {
          kind: 'card',
          title: 'Training data vs testing data',
          html: `<p>You need two separate sets of examples.</p>
<div class="cols"><div class="mini"><h4>📚 Training data</h4><p>The samples the model learns from. In the lab: at least 6 doodles per class.</p></div><div class="mini"><h4>📝 Testing data</h4><p>New samples the model has <b>never seen</b>, used only to check it. In the lab: 3 fresh doodles per class.</p></div></div>
<p>Testing on training samples is like taking an exam with the exact questions you practised. You would score highly, but it says nothing about whether you really learnt the topic.</p>
<div class="key"><b>Key idea</b> A model is only as good as its score on <b>unseen</b> testing data.</div>`
        },
        { kind: 'check', concepts: ['tm-workflow', 'train-test'], n: 2 },
        {
          kind: 'lab',
          lab: 'doodle-trainer',
          title: 'Doodle Trainer',
          intro: 'Name 3 classes, draw at least 6 samples of each, and train your own model. Then test it live and evaluate it with 3 new drawings per class.'
        },
        {
          kind: 'card',
          title: 'How your doodle model decides',
          html: `<p>The doodle trainer uses a simple learning method called <b>nearest neighbours</b>.</p>
<ol class="flow"><li><b>Compare</b><span>Your new doodle’s grid is compared with every saved sample.</span></li><li><b>Pick the closest 3</b><span>It finds the 3 samples that look most similar.</span></li><li><b>Vote</b><span>The class with the most votes wins. The bars show how strongly the closest samples agree.</span></li></ol>
<p>You never wrote a single rule, yet the model can label doodles it has never seen. That is what makes it <b>learning-based</b>.</p>
<div class="eg"><b>Example</b> If 2 of the 3 nearest samples are “sun” and 1 is “fish”, the model says <i>sun</i>, but it is less sure than if all 3 were “sun”.</div>`
        },
        {
          kind: 'card',
          title: 'Reading your confusion matrix',
          html: `<p>With 3 classes, the confusion matrix is a 3 × 3 table. Rows show what you <b>actually drew</b>. Columns show what the model <b>predicted</b>.</p>
<table class="tbl"><thead><tr><th>Actual ↓ / Predicted →</th><th>Sun</th><th>Fish</th><th>House</th></tr></thead><tbody><tr><td><b>Sun</b></td><td>3</td><td>0</td><td>0</td></tr><tr><td><b>Fish</b></td><td>1</td><td>2</td><td>0</td></tr><tr><td><b>House</b></td><td>0</td><td>1</td><td>2</td></tr></tbody></table>
<p>The <b>diagonal</b> (top-left to bottom-right) holds the correct predictions: 3 + 2 + 2 = 7 out of 9. Every other cell is a mistake, and it tells you <i>which</i> classes get mixed up.</p>
<div class="formula">Accuracy = correct predictions ÷ total predictions × 100% = 7 ÷ 9 × 100% ≈ 77.8%</div>`
        },
        { kind: 'check', concepts: ['cp-eval'], n: 2 },
        {
          kind: 'card',
          title: 'Make your model better',
          html: `<p>When accuracy is low, fix the <b>data</b> first. Garbage in, garbage out.</p>
<ul><li><b>More samples.</b> 6 per class is a start; 15–20 is better.</li><li><b>Varied samples.</b> Draw big and small, in the centre and near the edges, neat and messy. Ask a friend to draw some too.</li><li><b>Balanced classes.</b> Give every class about the same number of samples, or the model leans towards the biggest class.</li><li><b>Clear differences.</b> Classes that look alike (circle and sun) get confused. Look at the matrix to find them.</li><li><b>Check labels.</b> Delete samples saved under the wrong class.</li></ul>
<p>Then retrain and test again with <b>new</b> drawings. Improving a model is a loop, just like the AI Project Cycle.</p>`
        },
        { kind: 'check', concepts: ['better-data'], n: 2 },
        {
          kind: 'project',
          title: 'Project: Build a classifier in Teachable Machine',
          html: `<p>Do this at home or in the school lab. A computer with a webcam works best. If you have no webcam, you can upload photos.</p>
<ol><li>Open <code>teachablemachine.withgoogle.com</code> → <b>Get Started</b> → <b>Image Project</b> → <b>Standard image model</b>.</li><li>Pick an SDG-linked idea, e.g. sorting waste: rename the classes <b>Paper</b>, <b>Plastic</b> and <b>Food waste</b> (SDG 12).</li><li>Add <b>at least 30 images per class</b>. Turn the object, change the background and lighting, and move closer and further.</li><li>Press <b>Train Model</b> and keep the tab open until it finishes.</li><li>Test with <b>5 new objects per class</b> that were not in your training images. Note each prediction in a 3 × 3 confusion matrix and work out the accuracy.</li><li>Improve the weakest class with more varied images, retrain and test again. Record the new accuracy.</li><li>Optional: <b>Export Model</b> → upload it to get a shareable link.</li></ol>
<div class="warn"><b>Careful</b> Do not photograph people without their permission. Your samples stay in your browser unless you choose to save or upload the project.</div>
<p><b>For your portfolio:</b> screenshots of your classes, both confusion matrices and 3 sentences on what improved the model.</p>`
        }
      ],
      pool: [
        {
          id: 'cp-01-q01', c: 'tm-workflow', t: 'mcq', d: 1,
          q: 'In Teachable Machine, what is a <b>class</b>?',
          o: ['A group or label that the model learns to recognise', 'The computer room where the model is trained', 'The button that starts the training', 'A rule that the programmer types in'],
          a: 0,
          ex: 'A class is one category the model must tell apart from the others, such as “paper” or “plastic”. You give it samples of each class and it learns the differences.'
        },
        {
          id: 'cp-01-q02', c: 'tm-workflow', t: 'order', d: 1,
          q: 'Put the steps for building an image classifier in Teachable Machine in order.',
          items: ['Create and name the classes', 'Add samples to each class', 'Train the model', 'Test it with new images', 'Export or share the model'],
          ex: 'You must have classes before you can add samples, and samples before you can train. Testing checks the trained model, and only a tested model is worth sharing.'
        },
        {
          id: 'cp-01-q03', c: 'tm-workflow', t: 'mcq', d: 2,
          q: 'Meera trains a model in Teachable Machine by giving it photos of ripe and unripe mangoes. She never types any rules. Which kind of model has she made?',
          o: ['A learning-based model', 'A rule-based model', 'A decision tree she wrote by hand', 'A model that cannot make mistakes'],
          a: 0,
          mis: { 1: 'Not quite — in a rule-based model the developer writes the rules. Meera only gave labelled examples.', 3: 'Every model can make mistakes. That is why you test it on new data.' },
          ex: 'The model found the patterns that separate ripe and unripe mangoes from her labelled examples. Learning from data, not from typed rules, makes it learning-based.'
        },
        {
          id: 'cp-01-q04', c: 'train-test', t: 'mcq', d: 2,
          q: 'Kabir tests his doodle model using the same doodles he trained it on and gets 100% accuracy. Why does this result tell him very little?',
          o: ['The model has already seen these doodles, so the test does not show how it handles new ones', 'Doodles can never be used as testing data', 'Accuracy cannot be calculated for doodles', 'A model always scores 100% on new data'],
          a: 0,
          mis: { 1: 'Doodles are fine as testing data, as long as they are new ones the model has not seen.', 3: 'Scores on new data are usually lower, not perfect. That is exactly why we test on unseen examples.' },
          ex: 'Testing data must be unseen. Testing on training samples is like an exam made only of questions you practised. A high score does not prove the model will work on new drawings.'
        },
        {
          id: 'cp-01-q05', c: 'train-test', t: 'tf', d: 1,
          q: 'Testing data should be new examples that the model did not see during training.',
          a: true,
          ex: 'True. Testing data checks how well the model works on examples it has never met, which is what it will face in real use.'
        },
        {
          id: 'cp-01-q06', c: 'cp-eval', t: 'num', d: 2,
          q: 'Riya tests her 3-class doodle model with 12 new drawings. It labels 9 of them correctly. What is its accuracy in %?',
          a: 75, unit: '%',
          ex: 'Accuracy = correct ÷ total × 100% = 9 ÷ 12 × 100% = 75%.'
        },
        {
          id: 'cp-01-q07', c: 'cp-eval', t: 'mcq', d: 2,
          q: 'In a confusion matrix where rows are the actual class and columns are the predicted class, where are the <b>correct</b> predictions?',
          o: ['On the diagonal from top-left to bottom-right', 'In the first row only', 'In the last column only', 'In the cells outside the diagonal'],
          a: 0,
          mis: { 3: 'Cells outside the diagonal are where the actual and predicted classes differ, so they are mistakes.' },
          ex: 'A diagonal cell has the same class for its row and its column: drawn as a fish and predicted as a fish. Every other cell shows a mix-up.'
        },
        {
          id: 'cp-01-q08', c: 'cp-eval', t: 'mcq', d: 3,
          q: 'Arjun’s confusion matrix shows that 4 of his 5 test <i>fish</i> doodles were predicted as <i>sun</i>. Sun and house are almost always right. What is the best next step?',
          o: ['Add more varied fish samples, retrain and test again', 'Delete all the sun samples so the model stops saying sun', 'Test again with the same 5 fish doodles until it gets them right', 'Rename the fish class to sun'],
          a: 0,
          mis: { 1: 'Removing the sun class would make the model useless for suns. Fix the weak class instead.', 2: 'Reusing the same test doodles cannot improve the model. The fix is better training data.' },
          ex: 'The matrix points to the weak class. More, and more varied, fish samples help the model learn what makes a fish different from a sun.'
        },
        {
          id: 'cp-01-q09', c: 'better-data', t: 'multi', d: 2,
          q: 'Which of these are likely to make an image classifier more accurate on new images? Select all that apply.',
          o: ['Adding more samples to each class', 'Including samples of different sizes, positions and backgrounds', 'Giving every class roughly the same number of samples', 'Copying one perfect sample 20 times', 'Testing on the training samples instead of new ones'],
          a: [0, 1, 2],
          ex: 'More, varied and balanced samples help the model learn the real pattern. Copies of one sample add no variety, and testing on training samples only hides problems.'
        },
        {
          id: 'cp-01-q10', c: 'better-data', t: 'mcq', d: 3,
          q: 'Diya’s waste sorter was trained on 60 photos of plastic and only 8 photos of paper. It now calls most paper items “plastic”. What is the main cause?',
          o: ['The classes are unbalanced, so the model leans towards plastic', 'Paper cannot be recognised by a camera', 'The model has too many classes', 'Teachable Machine only works with plastic'],
          a: 0,
          mis: { 1: 'Paper can be recognised. The model just has very few paper examples to learn from.', 2: 'Two classes is a small number. The problem is how many samples each class has.' },
          ex: 'With 60 plastic photos and only 8 paper photos, the model has seen far more plastic. Adding paper photos until both classes are similar in size usually fixes this.'
        },
        {
          id: 'cp-01-q11', c: 'better-data', t: 'tf', d: 2,
          q: 'A model trained only on photos taken in bright sunlight may perform badly on photos taken in a dim classroom.',
          a: true,
          ex: 'True. The model only learns from the conditions it has seen. Adding samples in different lighting makes it work in more places.'
        }
      ]
    },

    // ---------------------------------------------------------------- cp-02
    {
      id: 'cp-02',
      title: 'Build a Rule-based Chatbot in Python',
      minutes: 90,
      outcomes: [
        'Write Python programs that take input, make decisions with if/elif/else and repeat with a while loop',
        'Build a rule-based chatbot whose keyword rules are stored in lists',
        'Compare rule-based and learning-based chatbots and explain the limits of each'
      ],
      hook: 'Build HelpBot, a chatbot that answers your school’s most-asked questions, one line of real Python at a time.',
      concepts: {
        'bot-rules': 'Keyword rules with if/elif and the in operator',
        'bot-loop': 'Chat loops, counters and lists',
        'bot-types': 'Rule-based vs learning-based chatbots'
      },
      steps: [
        {
          kind: 'card',
          title: 'What is a chatbot?',
          html: `<div class="def"><dfn>Chatbot</dfn> A program that holds a conversation with people through text or voice.</div>
<p>You meet chatbots on bank and shopping websites, in customer-care chats and on school or college helpdesks. They answer the same common questions many times a day, so people can work on harder ones.</p>
<p>In this topic you will build <b>HelpBot</b>, a helpdesk for an imaginary school. It will answer questions about timings, the library, the canteen, exams and fees.</p>
<div class="key"><b>Key idea</b> HelpBot is <b>rule-based</b>: you write every rule it follows. At the end you will compare it with <b>learning-based</b> chatbots that learn from examples.</div>`
        },
        {
          kind: 'card',
          title: 'How HelpBot will work',
          html: `<p>Every turn of the conversation follows the same four steps:</p>
<ol class="flow"><li><b>Read</b><span>Get the user’s message with <code>input()</code>.</span></li><li><b>Match</b><span>Look for a keyword such as <code>library</code> in the message.</span></li><li><b>Reply</b><span>Print the answer linked to that keyword, or a polite “Sorry”.</span></li><li><b>Repeat</b><span>Ask again, until the user types <code>bye</code>.</span></li></ol>
<p>You will build it in <b>7 small steps</b>. Each step adds one idea, and the app checks your output against a working version. So copy the reply text <b>exactly</b>, including <code>Bot: </code> at the start and the full stop at the end.</p>
<div class="warn"><b>Careful</b> The prompt inside <code>input("You: ")</code> is part of the output too. Keep the space after the colon.</div>`
        },
        {
          kind: 'card',
          title: 'New tool: the in operator',
          html: `<p>To find a keyword inside a sentence, Python has the <code>in</code> operator. It gives <code>True</code> or <code>False</code>, so it works as an <code>if</code> condition.</p>
<pre class="code">question = "where is the library"
print("library" in question)   # True
print("canteen" in question)   # False</pre>
<p>Because the rule only looks for a word <i>inside</i> the message, “where is the library”, “library timings?” and “is the library open” all match the same rule.</p>
<div class="warn"><b>Careful</b> <code>in</code> is case-sensitive: <code>"library" in "LIBRARY"</code> is <code>False</code>. You will fix this in the final step with <code>.lower()</code>.</div>`
        },
        { kind: 'code', ex: 'py-bot-1' },
        { kind: 'code', ex: 'py-bot-2' },
        { kind: 'check', concepts: ['bot-rules'], n: 2 },
        {
          kind: 'card',
          title: 'A loop keeps the chat going',
          html: `<p>Real conversations have many turns. A <code>while</code> loop repeats as long as its condition is <code>True</code>:</p>
<pre class="code">question = input("You: ")
while question != "bye":
    # reply to the question here
    question = input("You: ")
print("Bot: Goodbye! Have a great day.")</pre>
<p>The last line inside the loop asks the next question. When the user types <code>bye</code>, the condition becomes <code>False</code>, the loop stops and the goodbye line runs.</p>
<div class="warn"><b>Careful</b> If you forget the <code>input()</code> inside the loop, <code>question</code> never changes and the loop runs forever. The app stops programs that run too long.</div>`
        },
        { kind: 'code', ex: 'py-bot-3' },
        {
          kind: 'card',
          title: 'Rules as data: two lists',
          html: `<p>Five topics means five <code>elif</code> blocks. Fifty topics would be messy. Instead, store the rules as <b>data</b> in two lists kept in the same order:</p>
<pre class="code">keywords = ["timing", "library", "canteen"]
answers = ["School runs ...", "The library ...", "The canteen ..."]</pre>
<p><code>answers[0]</code> is the reply for <code>keywords[0]</code>, <code>answers[1]</code> for <code>keywords[1]</code>, and so on. A <code>for i in range(len(keywords))</code> loop checks every keyword with the same two lines of code.</p>
<div class="key"><b>Key idea</b> To teach HelpBot a new topic, you add one keyword and one answer. The program itself does not change.</div>
<p>You will also count questions with <code>count = count + 1</code>, just like the counters and sums in Unit 5.</p>`
        },
        { kind: 'code', ex: 'py-bot-4' },
        { kind: 'code', ex: 'py-bot-5' },
        { kind: 'check', concepts: ['bot-loop'], n: 2 },
        {
          kind: 'card',
          title: 'A rule-based bot cannot learn by itself',
          html: `<p>Ask HelpBot “Is there a school bus?” and it can only say sorry. No rule mentions buses, and it cannot work out an answer.</p>
<p>That is the main limit of a <b>rule-based</b> system: it is only as good as the rules a person writes. So in step 6 HelpBot keeps a list of questions it could not answer. The school office reads the list and a programmer adds new rules.</p>
<div class="cols"><div class="mini"><h4>✅ Strengths</h4><p>Predictable, easy to check, needs no training data, never makes up an answer.</p></div><div class="mini"><h4>⚠️ Limits</h4><p>Misses spelling mistakes and new wording, cannot understand meaning, and every topic is added by hand.</p></div></div>`
        },
        { kind: 'code', ex: 'py-bot-6' },
        { kind: 'code', ex: 'py-bot-7' },
        {
          kind: 'card',
          title: 'Rule-based vs learning-based chatbots',
          html: `<table class="tbl"><thead><tr><th></th><th>Rule-based (HelpBot)</th><th>Learning-based</th></tr></thead><tbody>
<tr><td><b>How it decides</b></td><td>Keyword rules written by the programmer</td><td>Patterns learnt from many example sentences (NLP)</td></tr>
<tr><td><b>New wording</b></td><td>Fails unless a keyword matches</td><td>Can often handle wording it has not seen</td></tr>
<tr><td><b>Needs</b></td><td>Someone to write every rule</td><td>Lots of example data and training</td></tr>
<tr><td><b>Risk</b></td><td>Says “sorry” too often</td><td>Can give a confident but wrong answer</td></tr></tbody></table>
<p>The smart-home lab in Unit 1 worked like a learning-based tool such as Microsoft LUIS: it found the <b>intent</b> and <b>entities</b> in a sentence. Generative AI chatbots such as ChatGPT and Gemini go further and write new replies from patterns learnt from huge amounts of text.</p>`
        },
        { kind: 'check', concepts: ['bot-types'], n: 2 },
        {
          kind: 'project',
          title: 'Project: Make HelpBot your own',
          html: `<p>Copy your final HelpBot into any Python editor (IDLE, Thonny, Replit or Jupyter) and turn it into a helpdesk for <b>your</b> school or a cause linked to an SDG.</p>
<ol><li>Collect 5 real questions people ask. Ask your class teacher or school office. Put the correct answers in the <code>answers</code> list.</li><li>Add <b>synonyms</b>: for example, make <code>"bus"</code> and <code>"transport"</code> both point to the same answer.</li><li>Test it with 5 classmates. Save the unanswered list and add rules for the most common gaps.</li><li>Count before and after: how many questions did it answer out of the total?</li></ol>
<div class="warn"><b>Careful</b> Tell users they are talking to a bot. Never ask for passwords, OTPs, Aadhaar numbers or phone numbers. Give only answers you have checked.</div>
<p><b>For your portfolio:</b> your code, a sample conversation, and 3 sentences on where a rule-based bot works well and where a learning-based one would do better.</p>`
        }
      ],
      pool: [
        {
          id: 'cp-02-q01', c: 'bot-rules', t: 'mcq', d: 1,
          q: 'What is the output of this code?',
          code: `question = "where is the library"\nprint("library" in question)`,
          o: ['True', 'False', 'library', '1'],
          a: 0,
          ex: 'The in operator checks whether one string appears inside another. "library" is part of the question, so the result is True.'
        },
        {
          id: 'cp-02-q02', c: 'bot-rules', t: 'mcq', d: 2,
          q: 'What is the output of this code?',
          code: `question = "Canteen open?"\nif "canteen" in question:\n    print("Lunch is at 11:30")\nelse:\n    print("Sorry")`,
          o: ['Sorry', 'Lunch is at 11:30', 'True', 'Canteen open?'],
          a: 0,
          mis: { 1: 'Not quite — in is case-sensitive. "canteen" with a small c is not inside "Canteen open?", which has a capital C.' },
          ex: 'The in operator is case-sensitive, so "canteen" does not match "Canteen". The condition is False and the else branch prints Sorry. Using .lower() on the question fixes this.'
        },
        {
          id: 'cp-02-q03', c: 'bot-rules', t: 'mcq', d: 2,
          q: 'What is the output of this code?',
          code: `q = "exam timings"\nif "timing" in q:\n    print("A")\nelif "exam" in q:\n    print("B")\nelse:\n    print("C")`,
          o: ['A', 'B', 'C', 'Nothing is printed'],
          a: 0,
          mis: { 1: 'The message does contain "exam", but the if condition was already True. Python skips every elif after the first True condition.' },
          ex: 'Python checks conditions from the top and runs only the first one that is True. "timing" is inside "exam timings", so it prints A and skips the elif and else.'
        },
        {
          id: 'cp-02-q04', c: 'bot-rules', t: 'tf', d: 1,
          q: 'In Python, <code>"fee" in "when is the fee due"</code> gives <code>True</code>.',
          a: true,
          ex: 'True. The in operator returns True when the first string appears anywhere inside the second, and "fee" appears in the sentence.'
        },
        {
          id: 'cp-02-q05', c: 'bot-loop', t: 'mcq', d: 2,
          q: 'Rohan’s chatbot uses <code>while question != "bye":</code> but he forgot to call <code>input()</code> inside the loop. What happens after the first question?',
          o: ['The loop repeats forever because question never changes', 'The program stops after one reply', 'Python automatically asks for the next question', 'The program prints Goodbye straight away'],
          a: 0,
          mis: { 2: 'Python only asks for input when your code calls input(). Without it, the question stays the same.' },
          ex: 'The condition depends on question. If question is never updated inside the loop, the condition stays True and the same reply prints again and again.'
        },
        {
          id: 'cp-02-q06', c: 'bot-loop', t: 'num', d: 2,
          q: 'What number does this code print?',
          code: `count = 0\nfor word in ["hi", "library", "fee"]:\n    count = count + 1\nprint(count)`,
          a: 3,
          ex: 'The loop runs once for each of the 3 items in the list, adding 1 each time, so count goes 1, 2, 3 and 3 is printed.'
        },
        {
          id: 'cp-02-q07', c: 'bot-loop', t: 'mcq', d: 2,
          q: 'HelpBot stores its rules in two lists, <code>keywords</code> and <code>answers</code>. Sana wants it to answer questions about the school bus. What should she do?',
          o: ['Add "bus" to keywords and the bus answer to answers, at the same position', 'Add "bus" to keywords only', 'Add the bus answer to the start of answers and "bus" to the end of keywords', 'Write a new while loop just for bus questions'],
          a: 0,
          mis: { 1: 'Without a matching answer, answers[i] would point to the wrong reply or cause an error.', 2: 'The lists must stay in the same order, so keyword and answer need the same position.' },
          ex: 'answers[i] is the reply for keywords[i]. Adding the keyword and its answer at the same position keeps the pairs matched, and the existing loop handles the new topic.'
        },
        {
          id: 'cp-02-q08', c: 'bot-types', t: 'mcq', d: 1,
          q: 'HelpBot answers only when one of its keywords appears in the message. Which approach does it use?',
          o: ['Rule-based', 'Learning-based', 'Generative AI', 'Computer Vision'],
          a: 0,
          mis: { 1: 'HelpBot never learns from examples. A programmer wrote every keyword and reply.' },
          ex: 'A rule-based system follows rules that the developer defines. HelpBot’s keyword rules were all written by hand.'
        },
        {
          id: 'cp-02-q09', c: 'bot-types', t: 'bins', d: 2,
          q: 'Sort each statement: does it describe a rule-based chatbot or a learning-based chatbot?',
          bins: ['Rule-based chatbot', 'Learning-based chatbot'],
          items: [
            ['Replies only when a keyword it was given appears', 0],
            ['A programmer must add every new topic by hand', 0],
            ['Its behaviour can be predicted by reading its code', 0],
            ['Is trained on thousands of example questions', 1],
            ['Can often understand a way of asking it has never seen', 1],
            ['Needs lots of example data before it works well', 1]
          ],
          ex: 'Rule-based bots follow hand-written rules, so they are predictable but limited to those rules. Learning-based bots learn patterns from example data, so they handle new wording but need lots of data.'
        },
        {
          id: 'cp-02-q10', c: 'bot-types', t: 'mcq', d: 3,
          q: 'A school wants a helpdesk bot that understands questions typed in English, Hindi and Hinglish, worded in many different ways. Which choice fits best?',
          o: ['A learning-based NLP model trained on many example questions in all three languages', 'A rule-based bot with one English keyword per topic', 'A rule-based bot that only accepts the exact sentence "help"', 'A computer vision model trained on photos of the school'],
          a: 0,
          mis: { 1: 'One English keyword per topic would miss most Hindi and Hinglish questions and any new wording.', 3: 'The questions are text, so this is an NLP task, not computer vision.' },
          ex: 'So many languages and wordings would need endless hand-written rules. A learning-based NLP model can learn the patterns from examples of each kind of question.'
        },
        {
          id: 'cp-02-q11', c: 'bot-types', t: 'tf', d: 2,
          q: 'A chatbot should tell users that they are talking to a bot, not a person.',
          a: true,
          ex: 'True. Transparency is an AI ethics principle. People have a right to know when they are talking to a machine, so they can judge its answers.'
        }
      ]
    },

    // ---------------------------------------------------------------- cp-03
    {
      id: 'cp-03',
      title: 'SDG Data Project',
      minutes: 120,
      outcomes: [
        'Choose an issue related to the Sustainable Development Goals and scope it with a 4Ws problem canvas and a problem statement',
        'Identify the data features and create a system map to understand the relationships between them',
        'Visualise the collected data graphically using spreadsheet software and draw conclusions',
        'Suggest an AI-enabled solution (prototype or research work) and check it against AI ethics'
      ],
      hook: 'Pick a real problem near your home or school, back it with data, and design the AI that could help solve it.',
      concepts: {
        'sdg-goals': 'The 17 SDGs and matching a problem to a goal',
        'sdg-scoping': '4Ws canvas and problem statement',
        'sdg-data': 'Data features, system maps and charts',
        'sdg-solution': 'Designing an ethical AI solution'
      },
      steps: [
        {
          kind: 'card',
          title: 'Your project brief',
          html: `<p>This is Part D project 2 of your syllabus: <b>choose an issue linked to the Sustainable Development Goals</b> and work through it like an AI developer.</p>
<ol class="flow"><li><b>Scope</b><span>Make a 4Ws problem canvas and write a problem statement.</span></li><li><b>Map</b><span>Find the data features and draw a system map of how they affect each other.</span></li><li><b>Visualise</b><span>Collect data, store it in a spreadsheet and show it in a chart.</span></li><li><b>Solve</b><span>Suggest an AI-enabled solution, as a prototype or as research work.</span></li></ol>
<p>These are the first stages of the AI Project Cycle: Problem Scoping, Data Acquisition, Data Exploration, then planning the Modelling, Evaluation and Deployment.</p>
<div class="key"><b>Key idea</b> At the end, the SDG Project lab turns your work into a 2-page PDF report.</div>`
        },
        {
          kind: 'card',
          title: 'The 17 Sustainable Development Goals',
          html: `<p>In 2015, all member states of the United Nations adopted 17 <b>Sustainable Development Goals</b> (SDGs) to reach by 2030:</p>
<ol><li>No Poverty</li><li>Zero Hunger</li><li>Good Health and Well-being</li><li>Quality Education</li><li>Gender Equality</li><li>Clean Water and Sanitation</li><li>Affordable and Clean Energy</li><li>Decent Work and Economic Growth</li><li>Industry, Innovation and Infrastructure</li><li>Reduced Inequalities</li><li>Sustainable Cities and Communities</li><li>Responsible Consumption and Production</li><li>Climate Action</li><li>Life Below Water</li><li>Life on Land</li><li>Peace, Justice and Strong Institutions</li><li>Partnerships for the Goals</li></ol>
<p>In Unit 1 you used the SDGs as <b>themes</b> for problem scoping. Now you will turn one theme into your own project.</p>`
        },
        {
          kind: 'card',
          title: 'Think local: from goal to problem',
          html: `<p>“Climate Action” is too big to solve in a school project. Narrow it down: <b>theme → topic → problem</b>.</p>
<table class="tbl"><thead><tr><th>Goal</th><th>A local problem you could study</th></tr></thead><tbody>
<tr><td>6 Clean Water and Sanitation</td><td>Water wasted at leaking or open taps in school</td></tr>
<tr><td>12 Responsible Consumption and Production</td><td>Cooked food thrown away in the canteen</td></tr>
<tr><td>3 Good Health and Well-being</td><td>Stagnant water where mosquitoes breed after the monsoon</td></tr>
<tr><td>11 Sustainable Cities and Communities</td><td>Unsafe road crossing outside the school gate</td></tr></tbody></table>
<p>A good project problem is <b>specific</b>, <b>local</b>, affects real people, and is something you can <b>collect data on</b> safely in 2–3 weeks.</p>`
        },
        { kind: 'check', concepts: ['sdg-goals'], n: 2 },
        {
          kind: 'card',
          title: '4Ws canvas and problem statement',
          html: `<div class="cols"><div class="mini"><h4>Who</h4><p>The stakeholders affected by the problem.</p></div><div class="mini"><h4>What</h4><p>The problem, and evidence that it exists.</p></div><div class="mini"><h4>Where</h4><p>The context or place where it happens.</p></div><div class="mini"><h4>Why</h4><p>Why solving it matters and how it would improve things.</p></div></div>
<p>Then join your answers in the problem statement template:</p>
<div class="formula">Our [stakeholders] has/have a problem that [issue] when/while [context]. An ideal solution would [benefit].</div>
<div class="eg"><b>Example</b> Our <i>students and canteen staff</i> have a problem that <i>a lot of cooked food is thrown away</i> while <i>lunch is served in the school canteen</i>. An ideal solution would <i>help the canteen cook closer to what students will eat</i>.</div>`
        },
        {
          kind: 'card',
          title: 'Data features and the system map',
          html: `<p><b>Data features</b> are the things you can measure that affect the problem. For canteen food waste: number of students present, menu item, portion size, how much students like the dish, and kilograms of food thrown away.</p>
<p>A <b>system map</b> shows how these elements are linked. An arrow shows the direction of the effect.</p>
<ul><li><b>+</b> means they change in the same direction: bigger portions → more waste.</li><li><b>−</b> means they change in opposite directions: more students like the dish → less waste.</li></ul>
<p>Look for <b>loops</b>. For example, more waste → higher cooking cost → smaller budget for good dishes → students like the food less → more waste.</p>
<div class="key"><b>Key idea</b> The system map shows which features your data must cover and where an AI could act.</div>`
        },
        {
          kind: 'card',
          title: 'Collect and visualise your data',
          html: `<p>Use <b>primary data</b> you collect yourself (a survey, tally marks while observing, weighing waste every day for two weeks). Add <b>secondary data</b> from reliable sources such as <code>data.gov.in</code> or school records.</p>
<p>Store it in spreadsheet software such as Excel, Google Sheets or LibreOffice Calc: one row per observation, one column per feature.</p>
<pre class="code">=AVERAGE(B2:B11)   =MEDIAN(B2:B11)   =MAX(B2:B11)</pre>
<p>Then choose a chart that answers your question:</p>
<ul><li><b>Line</b>: how waste changes day by day</li><li><b>Bar</b>: waste for each menu item</li><li><b>Pie</b>: share of each type of waste</li><li><b>Scatter</b>: students present vs waste</li></ul>
<p>Write <b>3 findings</b> the chart shows, such as a trend, a peak day or an outlier.</p>`
        },
        { kind: 'check', concepts: ['sdg-scoping', 'sdg-data'], n: 3 },
        {
          kind: 'card',
          title: 'Design the AI solution',
          html: `<p>You do not have to build the full AI. A <b>prototype</b> (like your classifier or HelpBot) or <b>research work</b> (a clear, detailed plan) both count. Answer these five questions:</p>
<ol class="flow"><li><b>Domain</b><span>Data, Computer Vision or NLP? A camera that sorts food waste is CV.</span></li><li><b>Data</b><span>Which features, from where, and how much?</span></li><li><b>Approach</b><span>Rule-based or learning-based, and why?</span></li><li><b>Evaluation</b><span>How will you test it? Accuracy, a confusion matrix, and which error is worse here?</span></li><li><b>Deployment</b><span>An app, a website, a device in the canteen? Who uses it, and how will you keep checking it?</span></li></ol>
<div class="eg"><b>Example</b> A learning-based model predicts tomorrow’s lunch count from attendance, day and menu, so the canteen cooks the right amount.</div>`
        },
        {
          kind: 'card',
          title: 'Ethics check before you finish',
          html: `<p>Every AI solution must be checked against the AI ethics principles from Unit 1.</p>
<ul><li><b>Privacy:</b> ask for consent before surveys or photos. Store no names you do not need.</li><li><b>Bias and fairness:</b> does your data include every group of people the solution affects?</li><li><b>Inclusion and access:</b> will it work for people without smartphones, or who speak another language?</li><li><b>Transparency:</b> do people know when AI is making a suggestion?</li><li><b>Accountability:</b> who checks and fixes mistakes? Keep a human in charge of important decisions.</li><li><b>Safety:</b> what harm could a wrong prediction do?</li></ul>
<div class="warn"><b>Careful</b> Never collect data in unsafe places, such as standing on a busy road to count traffic. Observe from a safe spot with an adult.</div>`
        },
        { kind: 'check', concepts: ['sdg-solution'], n: 2 },
        {
          kind: 'lab',
          lab: 'sdg-project',
          title: 'SDG Project Builder',
          intro: 'Work through the eight steps: pick a goal and problem, fill the 4Ws, write your problem statement, map the system, analyse the data, design the AI and check its ethics. Your work is saved as you go, and you finish by downloading a PDF report.'
        },
        {
          kind: 'project',
          title: 'Checklist: a report that stands out',
          html: `<p>Before you submit or present, check that your report includes:</p>
<ol><li><b>Title and SDG:</b> goal number and official name.</li><li><b>4Ws canvas</b> with evidence that the problem is real.</li><li><b>Problem statement</b> in the template wording.</li><li><b>System map</b> with + and − signs, and any loop explained.</li><li><b>Data:</b> how, when and where you collected it, the table (or spreadsheet file), the chart and 3 findings.</li><li><b>AI solution:</b> domain, data, approach, evaluation and deployment.</li><li><b>Ethics:</b> at least 3 risks and how you reduce them.</li><li><b>Next steps:</b> what you would do with more time.</li><li><b>Credits:</b> team roles, data sources, and any AI tools you used.</li></ol>
<div class="key"><b>Key idea</b> Present it in 3–5 minutes: problem, evidence (chart), solution, ethics. Then add the report to your AI portfolio.</div>`
        }
      ],
      pool: [
        {
          id: 'cp-03-q01', c: 'sdg-goals', t: 'mcq', d: 1,
          q: 'How many Sustainable Development Goals did the United Nations adopt in 2015?',
          o: ['17', '10', '15', '20'],
          a: 0,
          ex: 'There are 17 SDGs, from Goal 1 No Poverty to Goal 17 Partnerships for the Goals, to be achieved by 2030.'
        },
        {
          id: 'cp-03-q02', c: 'sdg-goals', t: 'match', d: 1,
          q: 'Match each SDG number to its official name.',
          pairs: [['Goal 2', 'Zero Hunger'], ['Goal 4', 'Quality Education'], ['Goal 6', 'Clean Water and Sanitation'], ['Goal 13', 'Climate Action']],
          ex: 'Goal 2 is Zero Hunger, Goal 4 is Quality Education, Goal 6 is Clean Water and Sanitation and Goal 13 is Climate Action.'
        },
        {
          id: 'cp-03-q03', c: 'sdg-goals', t: 'mcq', d: 2,
          q: 'Ayaan’s team weighs the cooked food thrown away in the school canteen every day and wants to reduce it. Which SDG fits this project best?',
          o: ['Responsible Consumption and Production', 'Life Below Water', 'Gender Equality', 'Affordable and Clean Energy'],
          a: 0,
          mis: { 1: 'Life Below Water is about oceans and marine life, not canteen food waste.', 3: 'Clean energy is about electricity and fuel, not how much food is wasted.' },
          ex: 'Goal 12, Responsible Consumption and Production, includes cutting food waste. Using only what we need is exactly what the project measures.'
        },
        {
          id: 'cp-03-q04', c: 'sdg-scoping', t: 'order', d: 1,
          q: 'Put the parts of the problem statement template in order.',
          items: ['Our [stakeholders]', 'has/have a problem that [issue]', 'when/while [context]', 'An ideal solution would [benefit]'],
          ex: 'The template names who is affected, then the problem, then when or where it happens, and finally what a good solution would achieve.'
        },
        {
          id: 'cp-03-q05', c: 'sdg-scoping', t: 'match', d: 2,
          q: 'A team is studying food waste in the school canteen. Match each 4Ws question to the answer that belongs there.',
          pairs: [['Who', 'Students and canteen staff'], ['What', 'Leftover cooked food is thrown away every day'], ['Where', 'In the school canteen after the lunch break'], ['Why', 'Less waste saves money and reduces garbage']],
          ex: 'Who names the stakeholders, What describes the problem, Where gives the context or place, and Why explains the value of solving it.'
        },
        {
          id: 'cp-03-q06', c: 'sdg-scoping', t: 'mcq', d: 2,
          q: 'Which of these is the best-scoped problem for a Class 9 SDG project?',
          o: ['Water is wasted at the open taps near our school playground', 'Climate change is affecting the whole world', 'Poverty exists in many countries', 'Cities everywhere have too much traffic'],
          a: 0,
          mis: { 1: 'True, but far too big. A good project problem is specific and local enough to collect data on.', 3: 'This is still too broad. Narrow it to one place you can observe, such as one crossing near school.' },
          ex: 'A good project problem is specific and local, so you can observe it and collect data in a few weeks. The school taps fit; the others are themes, not problems.'
        },
        {
          id: 'cp-03-q07', c: 'sdg-data', t: 'mcq', d: 1,
          q: 'In a system map, which sign goes on the arrow “more plastic bags thrown away → more blocked drains”?',
          o: ['+', '−', '×', '='],
          a: 0,
          ex: 'Both elements change in the same direction: more bags, more blocked drains. A + sign shows a direct relationship.'
        },
        {
          id: 'cp-03-q08', c: 'sdg-data', t: 'mcq', d: 2,
          q: 'Kabir recorded the kilograms of food wasted in the canteen every school day for four weeks. Which chart best shows how waste changed over time?',
          o: ['Line chart', 'Pie chart', 'Scatter plot', 'Histogram'],
          a: 0,
          mis: { 1: 'A pie chart shows parts of a whole, not change over time.', 3: 'A histogram shows how values are distributed, not the order in which they happened.' },
          ex: 'A line chart joins values in time order, so rising, falling or repeating patterns across the four weeks are easy to see.'
        },
        {
          id: 'cp-03-q09', c: 'sdg-data', t: 'tf', d: 2,
          q: 'In a system map, a − sign on an arrow means that when one element increases, the other decreases.',
          a: true,
          ex: 'True. A − sign shows an inverse relationship. For example, the more students like a dish, the less of it is wasted.'
        },
        {
          id: 'cp-03-q10', c: 'sdg-solution', t: 'mcq', d: 2,
          q: 'Meera suggests a camera above the canteen bins that looks at each plate and records which dish was left uneaten. Which AI domain does her solution use?',
          o: ['Computer Vision', 'Natural Language Processing', 'Data / Statistical Data only', 'Generative AI'],
          a: 0,
          mis: { 1: 'NLP works with text and speech. Here the input is camera images.', 3: 'Generative AI creates new content. Meera’s camera recognises what is already there.' },
          ex: 'The system takes in images from a camera and recognises what is in them, which is Computer Vision.'
        },
        {
          id: 'cp-03-q11', c: 'sdg-solution', t: 'multi', d: 2,
          q: 'Which of these are good ethical practices for an SDG data project? Select all that apply.',
          o: ['Asking for consent before photographing or surveying people', 'Leaving names out of survey data when they are not needed', 'Checking that the data includes every group the solution affects', 'Collecting as much personal data as possible, just in case', 'Hiding from users that an AI makes the suggestions'],
          a: [0, 1, 2],
          ex: 'Consent and collecting only the data you need protect privacy, and covering every group reduces bias. Extra personal data and hiding the AI break privacy and transparency.'
        },
        {
          id: 'cp-03-q12', c: 'sdg-solution', t: 'mcq', d: 3,
          q: 'Rohan’s team designs an AI app that tells farmers when to water their crops. Many farmers in their village use basic phones without internet. What is the best change to the plan?',
          o: ['Also send the advice by SMS or voice call in the local language', 'Keep the app as it is, because smartphones will spread one day', 'Remove the AI and ask farmers to guess', 'Only offer the app to farmers who already own smartphones'],
          a: 0,
          mis: { 1: 'Waiting leaves out the farmers who need help now. That widens the digital divide.', 3: 'This would leave out many farmers, which is an AI access and inclusion problem.' },
          ex: 'AI access matters: a solution that needs a smartphone leaves many people out. SMS or voice in the local language reaches more farmers, which makes the solution more inclusive.'
        }
      ]
    },

    // ---------------------------------------------------------------- cp-04
    {
      id: 'cp-04',
      title: 'AI Portfolio',
      minutes: 60,
      outcomes: [
        'Maintain a record of AI activities and projects as a student portfolio (minimum 5 activities)',
        'Reflect on learning and present each piece of work with evidence',
        'Plan, carry out and report on a field visit to an organisation that creates or uses AI'
      ],
      hook: 'Turn everything you built this year into a portfolio you are proud to show.',
      concepts: {
        'portfolio': 'What goes into an AI portfolio',
        'field-visit': 'Planning and reporting a field visit'
      },
      steps: [
        {
          kind: 'card',
          title: 'Why keep a portfolio?',
          html: `<p>For Part D, CBSE asks you to do <b>any one</b> of three things: a <b>project</b>, a <b>field visit</b> or a <b>student portfolio</b>. All of them are linked to the Sustainable Development Goals.</p>
<div class="def"><dfn>Student portfolio</dfn> A record of all your AI activities and projects, with a <b>minimum of 5 activities</b>.</div>
<p>A portfolio is more than a folder of files. It shows what you made, what you learnt and how your thinking grew from the first lesson to the capstone. It is also a great thing to show at a science fair, an interview or a competition.</p>
<div class="key"><b>Key idea</b> Quality beats quantity: 5 entries with evidence and reflection beat 15 screenshots with no explanation.</div>`
        },
        {
          kind: 'card',
          title: 'What goes in',
          html: `<p>The syllabus suggests these activities. You can make most of them in this app:</p>
<table class="tbl"><thead><tr><th>Activity</th><th>Where to make it</th></tr></thead><tbody>
<tr><td>Letter to Future Self</td><td>Portfolio lab</td></tr>
<tr><td>Smart Home Floor Plan</td><td>Portfolio lab (try the smart-home lab in Unit 1 first)</td></tr>
<tr><td>Future Job Advertisement</td><td>Portfolio lab</td></tr>
<tr><td>AI in Different Sectors</td><td>Portfolio lab</td></tr>
<tr><td>Research work on AI for SDGs, 4Ws canvas, System Map</td><td>SDG Project lab (topic cp-03)</td></tr></tbody></table>
<p>You can add your image classifier from cp-01 and HelpBot from cp-02 as extra entries.</p>`
        },
        {
          kind: 'card',
          title: 'What makes a strong entry',
          html: `<p>Give every entry the same five parts:</p>
<ol class="flow"><li><b>Title and date</b><span>What it is and when you made it.</span></li><li><b>What I did</b><span>2–3 sentences on the task and your steps.</span></li><li><b>Evidence</b><span>A screenshot, chart, code, drawing or PDF.</span></li><li><b>What I learnt</b><span>Use syllabus terms: training data, problem statement, system map.</span></li><li><b>Reflection</b><span>What would you change or improve next time?</span></li></ol>
<div class="warn"><b>Careful</b> Credit your sources and your teammates. If an AI tool helped you, say which one and how, as you learnt in Unit 4.</div>`
        },
        {
          kind: 'card',
          title: 'Ideas for each template',
          html: `<div class="cols"><div class="mini"><h4>✉️ Letter to Future Self</h4><p>How might AI change your school, city and dream career in 10 years? What skills will you build? What worries you?</p></div><div class="mini"><h4>🏠 Smart Home Floor Plan</h4><p>Place AI devices in each room. Note the data each one uses and one privacy setting you would turn on.</p></div><div class="mini"><h4>📣 Future Job Advertisement</h4><p>Invent a job that AI could create, such as a drone-farming technician. List its duties, skills and the subjects to study.</p></div><div class="mini"><h4>🏥 AI in Different Sectors</h4><p>For health, farming, education, transport or banking, give one use of AI, one benefit, one risk and a link to an SDG.</p></div></div>`
        },
        { kind: 'check', concepts: ['portfolio'], n: 2 },
        {
          kind: 'lab',
          lab: 'portfolio',
          title: 'Portfolio Builder',
          intro: 'Fill in the templates and save at least 3 entries. Then download your portfolio as a PDF. It includes your SDG project if you have made one.'
        },
        {
          kind: 'card',
          title: 'Or choose a field visit',
          html: `<p>The third Part D option is a <b>field visit</b> to an industry, IT company or any other place that creates or uses AI applications. You then present a report. The visit can be <b>physical or virtual</b>.</p>
<div class="cols"><div class="mini"><h4>🏭 Physical</h4><p>A software company, a hospital that uses AI to help read scans, a factory with camera-based quality checks, or an agriculture start-up.</p></div><div class="mini"><h4>💻 Virtual</h4><p>An online talk or video call with a professional, a company’s virtual tour, or a webinar where a team demonstrates its AI product.</p></div></div>
<p>As you watch, link everything to what you know: which <b>domain</b> it uses, what <b>data</b> it learns from, and which stage of the <b>AI Project Cycle</b> you are seeing.</p>
<div class="warn"><b>Careful</b> Go only with your school or a parent’s permission, and take photos only where the host allows it.</div>`
        },
        {
          kind: 'project',
          title: 'Field visit report template',
          html: `<h4>Before the visit</h4>
<ul><li>Get permission and read about the organisation and what it does.</li><li>Prepare at least 5 questions, for example: What problem does your AI solve? What data does it learn from? How do you check its accuracy? What happens when it is wrong? How do you protect people’s privacy? What skills does your team need?</li></ul>
<h4>During the visit</h4>
<ul><li>Take notes on what you see and the answers you get. Note names and job titles only with permission.</li></ul>
<h4>Your report</h4>
<ol><li>Visit details: organisation, date, physical or virtual, who you met.</li><li>About the organisation and its work.</li><li>AI applications you saw: domain, data used and AI Project Cycle stage.</li><li>Ethics: privacy, bias and how humans stay in control.</li><li>Link to an SDG.</li><li>What I learnt and a question I still have.</li><li>A thank-you note to the host.</li></ol>`
        },
        { kind: 'check', concepts: ['field-visit'], n: 2 }
      ],
      pool: [
        {
          id: 'cp-04-q01', c: 'portfolio', t: 'mcq', d: 1,
          q: 'According to the CBSE syllabus, what is the minimum number of activities in a student AI portfolio?',
          o: ['5', '2', '3', '10'],
          a: 0,
          ex: 'The syllabus describes the student portfolio as a record of all AI activities and projects, with a minimum of 5 activities.'
        },
        {
          id: 'cp-04-q02', c: 'portfolio', t: 'multi', d: 1,
          q: 'Which of these are suggested portfolio activities in the CBSE Class 9 AI syllabus? Select all that apply.',
          o: ['Letter to Future Self', 'Future Job Advertisement', 'System Map', 'A list of your passwords', 'A copy of a classmate’s project'],
          a: [0, 1, 2],
          ex: 'The syllabus suggests the Letter to Future Self, Smart Home Floor Plan, Future Job Advertisement, research on AI for SDGs and AI in different sectors, the 4Ws canvas and the System Map. Passwords and other people’s work never belong in it.'
        },
        {
          id: 'cp-04-q03', c: 'portfolio', t: 'mcq', d: 2,
          q: 'Sana is adding her doodle classifier to her portfolio. Which entry is strongest?',
          o: ['A screenshot of the confusion matrix, what she did, what she learnt and what she would improve', 'Just the screenshot, with no text', 'One line: “I made an AI.”', 'A long copy of the lesson text about classifiers'],
          a: 0,
          mis: { 1: 'Evidence alone does not show what you learnt. Add what you did and a reflection.', 3: 'Copying the lesson shows no work of your own. Write about what you did and learnt.' },
          ex: 'A strong entry joins evidence (the screenshot) with explanation and reflection, so a reader can see both what was made and what was learnt.'
        },
        {
          id: 'cp-04-q04', c: 'portfolio', t: 'tf', d: 2,
          q: 'If an AI tool helped you write part of a portfolio entry, you should say which tool you used and how.',
          a: true,
          ex: 'True. Disclosing AI help is part of using generative AI ethically, and it keeps your portfolio honest.'
        },
        {
          id: 'cp-04-q05', c: 'field-visit', t: 'tf', d: 1,
          q: 'The CBSE syllabus allows the AI field visit to be done in virtual mode.',
          a: true,
          ex: 'True. The syllabus says the visit to an industry, IT company or other place using AI can be in physical or virtual mode.'
        },
        {
          id: 'cp-04-q06', c: 'field-visit', t: 'mcq', d: 2,
          q: 'Arjun can ask one question during a virtual visit to an AI start-up. Which question will teach him the most about how their AI works?',
          o: ['What data does your AI learn from, and how do you check that it is accurate?', 'What colour is your office?', 'How many floors does your building have?', 'What time does your office open?'],
          a: 0,
          mis: { 1: 'This tells him about the office, not about the AI.', 3: 'Office hours do not explain anything about how the AI is built or tested.' },
          ex: 'Asking about data and evaluation links straight to the AI Project Cycle: Data Acquisition and Evaluation. The other questions are not about AI at all.'
        },
        {
          id: 'cp-04-q07', c: 'field-visit', t: 'order', d: 2,
          q: 'Put the stages of a field visit in order.',
          items: ['Get permission and research the organisation', 'Prepare your questions', 'Visit and take notes', 'Write and present the report'],
          ex: 'You need permission and background knowledge before you can ask good questions. Notes taken during the visit are what make a good report possible.'
        },
        {
          id: 'cp-04-q08', c: 'field-visit', t: 'mcq', d: 3,
          q: 'On a factory visit, Diya sees a camera that checks every biscuit on the belt and pushes broken ones off. How should she describe it in her report?',
          o: ['A Computer Vision model at the Deployment stage', 'An NLP model at the Problem Scoping stage', 'A Computer Vision model at the Data Exploration stage', 'An NLP model at the Deployment stage'],
          a: 0,
          mis: { 1: 'The input is camera images, not language, and the system is already working, not being planned.', 2: 'The model is already sorting real biscuits in the factory, so it has been deployed.' },
          ex: 'It works with images, so it is Computer Vision. It is in real use on the production line, which is the Deployment stage.'
        }
      ]
    }
  ]
};
