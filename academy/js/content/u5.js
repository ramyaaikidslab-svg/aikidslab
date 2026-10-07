// Unit 5 — Introduction to Python. See docs/CONTENT_SPEC.md (§8 Unit 5) and docs/PYTHON_SPEC.md.
// Code steps refer to exercises in js/py/exercises.js.
export default {
  id: 'u5',
  title: 'Introduction to Python',
  short: 'Python',
  color: 'green',
  syllabus: 'Unit 5 · 1 h theory + 9 h practical in the CBSE plan; Practical File needs 15+ programs',
  topics: [
    // ═══════════════════════════════════ u5-01 ═══════════════════════════════════
    {
      id: 'u5-01',
      title: 'Programming and Python',
      minutes: 90,
      outcomes: [
        'Learn basic programming skills through gamified platforms',
        'Explain what programming, programs and algorithms are',
        'Describe the Python language and its applications'
      ],
      hook: 'Every app on your phone, from UPI to YouTube, began as someone typing instructions. Today you write your first ones and steer a robot with them.',
      concepts: {
        'prog-def': 'What programming and programs are',
        'algorithm': 'Algorithms: step-by-step plans',
        'python-why': 'Why Python, and where it is used',
        'editor': 'Writing and running code',
        'robo-logic': 'Sequence, loops and conditions'
      },
      steps: [
        {
          kind: 'card',
          title: 'Computers follow instructions',
          html: `<p>A computer can do billions of calculations every second, but it has no common sense. It does <b>exactly</b> what it is told, in exactly the order it is told, and nothing more.</p>
<div class="eg"><b>Example</b> Tell a friend “make me some tea” and they fill in the missing steps. Tell a computer, and it needs every step: boil water, add tea leaves, add milk, add sugar, pour into a cup.</div>
<div class="def"><dfn>Program</dfn> A set of instructions, written in a programming language, that a computer follows to do a task.</div>
<div class="def"><dfn>Programming (coding)</dfn> Writing those instructions. The person who writes them is a programmer.</div>
<div class="key"><b>Key idea</b> A computer cannot guess what you meant, so your instructions must be clear, complete and in the right order.</div>`
        },
        {
          kind: 'card',
          title: 'Algorithms: the plan before the code',
          html: `<p>Before you write a program, you need a plan. That plan is called an <b>algorithm</b>.</p>
<div class="def"><dfn>Algorithm</dfn> A finite, ordered list of clear steps that solves a problem.</div>
<p>Here is an algorithm for finding the tallest student in a line:</p>
<ol class="flow"><li><b>Start</b><span>Note the first student’s height as “tallest so far”.</span></li><li><b>Compare</b><span>For each next student, if they are taller, they become “tallest so far”.</span></li><li><b>Finish</b><span>After the last student, announce “tallest so far”.</span></li></ol>
<p>A good algorithm has steps that are clear, in the correct order, and it must finish.</p>
<div class="key"><b>Key idea</b> The algorithm is the plan. A program is that plan written in a programming language such as Python.</div>`
        },
        { kind: 'check', concepts: ['prog-def', 'algorithm'], n: 2 },
        {
          kind: 'card',
          title: 'Programming languages',
          html: `<p>Deep inside, a computer understands only <b>machine code</b>: long patterns of 0s and 1s. Writing that by hand would be very slow and error-prone.</p>
<p>So we write in a <b>high-level programming language</b>, which uses English-like words and maths symbols. A translator program then turns it into instructions the computer can carry out.</p>
<div class="cols"><div class="mini"><h4>Python</h4><p>Easy to read; used in AI and data science.</p></div><div class="mini"><h4>Scratch</h4><p>Drag-and-drop blocks for beginners.</p></div><div class="mini"><h4>Java, C++</h4><p>Used for large apps, games and systems.</p></div></div>
<p>Python uses a translator called an <b>interpreter</b>, which runs your program line by line, from top to bottom.</p>
<div class="key"><b>Key idea</b> A programming language lets humans write instructions in a form both people and computers can work with.</div>`
        },
        {
          kind: 'card',
          title: 'Why Python?',
          html: `<p><b>Python</b> was created by <b>Guido van Rossum</b> and first released in 1991. He named it after the British comedy show <i>Monty Python’s Flying Circus</i>, not the snake.</p>
<ul><li><b>Easy to read:</b> the code looks close to plain English.</li>
<li><b>Short:</b> you can do a lot with a few lines.</li>
<li><b>Free and open source:</b> anyone can download and use it.</li>
<li><b>Huge libraries:</b> ready-made code for maths, data, charts and AI.</li>
<li><b>Works everywhere:</b> Windows, macOS, Linux, even small boards like the Raspberry Pi.</li></ul>
<p>Showing a message on screen takes one line:</p>
<pre class="code">print("Hello")</pre>
<div class="key"><b>Key idea</b> Python is popular with beginners and with AI experts because it is readable, free and has many libraries.</div>`
        },
        {
          kind: 'card',
          title: 'Where is Python used?',
          html: `<div class="cols"><div class="mini"><h4>🤖 AI and machine learning</h4><p>Libraries such as TensorFlow, PyTorch and scikit-learn help train models that recognise images, speech and text.</p></div>
<div class="mini"><h4>📊 Data science</h4><p>pandas and matplotlib clean data, find patterns and draw charts.</p></div>
<div class="mini"><h4>🌐 Web development</h4><p>Frameworks such as Django and Flask run the server side of websites.</p></div>
<div class="mini"><h4>⚙️ Automation</h4><p>Short scripts do boring jobs, like renaming 500 photos or filling a report.</p></div></div>
<p>Python is also used for school robotics, scientific research, games and teaching programming.</p>
<div class="key"><b>Key idea</b> Python is a general-purpose language, and it is the most common language for building AI.</div>`
        },
        { kind: 'check', concepts: ['python-why'], n: 2 },
        {
          kind: 'card',
          title: 'Meet the editor',
          html: `<p>In this course you write real Python in the <b>editor</b> box. Then:</p>
<ol class="flow"><li><b>Type</b><span>Write your code in the editor.</span></li><li><b>Run</b><span>Click the Run button.</span></li><li><b>Read</b><span>Python runs the lines from top to bottom and shows the result in the output panel.</span></li></ol>
<p>Try reading this program before running it:</p>
<pre class="code">print("Namaste!")
print("I am learning Python.")</pre>
<p>Output:</p>
<pre class="code">Namaste!
I am learning Python.</pre>
<p>The quotes tell Python that <code>Namaste!</code> is text. Quotes are not shown in the output. Each <code>print()</code> starts a new line.</p>`
        },
        { kind: 'code', ex: 'py-hello' },
        {
          kind: 'card',
          title: 'When things go wrong: errors',
          html: `<p>Everyone makes mistakes in code, even experts. A mistake in a program is called a <b>bug</b>, and fixing it is called <b>debugging</b>.</p>
<p>Python is <b>case-sensitive</b>: <code>print</code> and <code>Print</code> are different words.</p>
<pre class="code">Print("Hi")</pre>
<p>This gives a <b>NameError</b>, because Python does not know any command called <code>Print</code>.</p>
<pre class="code">print("Hi)</pre>
<p>This gives a <b>SyntaxError</b>: the closing quote is missing, so Python cannot read the line.</p>
<div class="key"><b>Key idea</b> Read the error message: it names the kind of error and the line number. Check that line, and the line just above it.</div>`
        },
        { kind: 'code', ex: 'py-three-lines' },
        { kind: 'check', concepts: ['editor'], n: 2 },
        {
          kind: 'card',
          title: 'Three big ideas: sequence, loops, conditions',
          html: `<p>Almost every program, from a calculator to an AI, is built from three ideas.</p>
<div class="cols"><div class="mini"><h4>➡️ Sequence</h4><p>Steps run one after another, in order.</p></div><div class="mini"><h4>🔁 Loop</h4><p>Repeat steps without writing them again.</p></div><div class="mini"><h4>❓ Condition</h4><p>Decide what to do based on a question.</p></div></div>
<p>In the next lab you control a robot with Python commands: <code>move()</code>, <code>turn_left()</code>, <code>turn_right()</code>, <code>pick()</code>, and questions <code>front_is_clear()</code>, <code>on_gem()</code>, <code>at_goal()</code>.</p>
<pre class="code">for i in range(3):
    move()
if on_gem():
    pick()</pre>
<p>The robot moves 3 times, then picks up a gem only if it is standing on one. The spaces before <code>move()</code> show it belongs inside the loop.</p>`
        },
        {
          kind: 'lab',
          lab: 'robo-runner',
          title: 'Robo Runner: code a robot',
          intro: 'Guide the robot through 6 levels by writing Python. Start with simple sequences, then use loops and conditions to solve the maze.'
        },
        {
          kind: 'card',
          title: 'What you just used',
          html: `<p>In Robo Runner you used the same building blocks real programmers use:</p>
<table class="tbl"><thead><tr><th>Idea</th><th>Robot code</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Sequence</td><td><code>move()</code> then <code>turn_left()</code></td><td>Do this, then that</td></tr>
<tr><td>for loop</td><td><code>for i in range(4):</code></td><td>Repeat 4 times</td></tr>
<tr><td>while loop</td><td><code>while not at_goal():</code></td><td>Repeat until the goal is reached</td></tr>
<tr><td>Condition</td><td><code>if on_gem():</code></td><td>Only if a gem is here</td></tr></tbody></table>
<p>Lines that are <b>indented</b> (pushed right) under <code>for</code>, <code>while</code> or <code>if</code> belong to it. The CBSE syllabus suggests learning these ideas first through games, such as Code Combat, before moving on to Python.</p>
<div class="key"><b>Key idea</b> Sequence, loops and conditions are enough to build surprisingly clever programs.</div>`
        },
        { kind: 'check', concepts: ['robo-logic'], n: 2 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // prog-def
        { id: 'u5-01-q01', c: 'prog-def', t: 'mcq', d: 1, q: 'What is a computer program?', o: ['A set of instructions a computer follows to do a task', 'A device that stores files and photos', 'A website where you watch videos', 'A table of numbers saved in a spreadsheet'], a: 0, ex: 'A program is a set of instructions, written in a programming language, that tells the computer what to do step by step.' },
        { id: 'u5-01-q02', c: 'prog-def', t: 'tf', d: 1, q: 'A computer can work out what you meant even if your instructions skip some steps.', a: false, ex: 'A computer has no common sense. It follows exactly the instructions it is given, so missing or unclear steps lead to wrong results or errors.' },
        { id: 'u5-01-q03', c: 'prog-def', t: 'mcq', d: 2, q: 'Which of these best describes <b>programming</b>?', o: ['Writing instructions in a language a computer can follow', 'Repairing the hardware inside a computer', 'Typing documents quickly on a keyboard', 'Downloading and installing apps on a phone'], a: 0, mis: { 1: 'Repairing hardware is electronics work. Programming is about writing instructions (software).', 3: 'Installing apps uses programs someone else wrote. Programming means writing the instructions yourself.' }, ex: 'Programming (coding) is the work of writing instructions for a computer in a programming language such as Python.' },
        { id: 'u5-01-q04', c: 'prog-def', t: 'mcq', d: 2, q: 'Why must instructions for a computer be precise and complete?', o: ['A computer does exactly what it is told and cannot fill in missing steps', 'A computer gets tired when the instructions are long', 'A computer only accepts instructions typed in capital letters', 'A computer refuses to run instructions written in English'], a: 0, mis: { 1: 'Computers never get tired. The problem is that they cannot guess missing steps.', 2: 'Python is case-sensitive, but it does not need capital letters. The real reason is that computers follow instructions literally.' }, ex: 'Computers follow instructions literally. If a step is missing or unclear, the computer cannot guess it, so the result is wrong or an error appears.' },
        { id: 'u5-01-q05', c: 'prog-def', t: 'bins', d: 2, q: 'Sort each item: is it a programming language?', bins: ['Programming language', 'Not a programming language'], items: [['Python', 0], ['Scratch', 0], ['Java', 0], ['C++', 0], ['Microsoft Word', 1], ['Google Chrome', 1], ['Hindi', 1]], ex: 'Python, Scratch, Java and C++ are languages for writing programs. Word and Chrome are programs (apps), and Hindi is a human language.' },
        { id: 'u5-01-q06', c: 'prog-def', t: 'mcq', d: 1, q: 'Deep inside, what form of instructions does a computer’s processor actually carry out?', o: ['Machine code made of 0s and 1s', 'Plain English sentences', 'Pictures and icons', 'Python code exactly as typed'], a: 0, mis: { 3: 'Python must first be translated by the interpreter. The processor itself works with machine code.' }, ex: 'Processors work with machine code (binary 0s and 1s). High-level languages like Python are translated so the computer can carry them out.' },
        { id: 'u5-01-q07', c: 'prog-def', t: 'mcq', d: 3, q: 'Meera tells a robot: “Go to the kitchen and get water.” The robot does nothing. What is the best explanation?', o: ['The instruction was not broken into exact steps the robot understands', 'The robot needs a louder voice command', 'Robots can never fetch objects', 'The robot only works at night'], a: 0, mis: { 1: 'Volume is not the issue. A machine needs precise, step-by-step instructions it was programmed to understand.', 2: 'Robots can fetch objects when they are programmed with the exact steps to do it.' }, ex: '“Get water” hides many steps (move, find a glass, fill it). A machine needs each step spelled out in commands it understands. This is why we write programs.' },
        // algorithm
        { id: 'u5-01-q08', c: 'algorithm', t: 'mcq', d: 1, q: 'What is an algorithm?', o: ['A finite, ordered list of steps that solves a problem', 'A type of computer screen', 'A program that only does maths', 'A list of passwords'], a: 0, ex: 'An algorithm is a step-by-step plan for solving a problem. It must be clear, ordered and must finish.' },
        { id: 'u5-01-q09', c: 'algorithm', t: 'order', d: 1, q: 'Put these steps for paying a shopkeeper with a UPI app in the correct order.', items: ['Open the UPI app', 'Scan the shop’s QR code', 'Type the amount', 'Enter your UPI PIN', 'See the payment confirmation'], ex: 'An algorithm is an ordered list of steps. You cannot enter the PIN before choosing who to pay and how much, so the order matters.' },
        { id: 'u5-01-q10', c: 'algorithm', t: 'mcq', d: 2, q: 'How is an algorithm different from a program?', o: ['An algorithm is the plan; a program is that plan written in a programming language', 'An algorithm runs faster than a program', 'An algorithm can only be written in Python', 'A program is always shorter than its algorithm'], a: 0, mis: { 2: 'An algorithm can be written in plain words, a flowchart or any language. It is the plan, not the code.' }, ex: 'The algorithm is the idea, the list of steps. The program is the same steps written in a language like Python so a computer can run them.' },
        { id: 'u5-01-q11', c: 'algorithm', t: 'tf', d: 2, q: 'The order of the steps in an algorithm does not matter, as long as all the steps are there.', a: false, ex: 'Order matters. Pouring tea into a cup before boiling the water gives a very different result, and so does running steps out of order in a program.' },
        { id: 'u5-01-q12', c: 'algorithm', t: 'multi', d: 2, q: 'Select all that apply. Which are features of a good algorithm?', o: ['Each step is clear and unambiguous', 'The steps are in the correct order', 'It finishes after a limited number of steps', 'It must be written in Python', 'It must be as long as possible'], a: [0, 1, 2], ex: 'Good algorithms are clear, correctly ordered and finite. They can be written in any language or in plain words, and shorter is usually better.' },
        { id: 'u5-01-q13', c: 'algorithm', t: 'mcq', d: 3, q: 'Riya’s algorithm to find the tallest student: (1) Note the first student’s height as “tallest so far”. (2) Go to the next student. (3) After the last student, announce “tallest so far”. What is missing?', o: ['Compare each student with “tallest so far” and update it if they are taller', 'Ask every student their name', 'Sort the students by roll number first', 'Measure the first student a second time'], a: 0, mis: { 1: 'Names do not help find the tallest. The comparison step is what is missing.', 2: 'Sorting by roll number does not change heights. Without a comparison the answer is always the first student.' }, ex: 'Without a compare-and-update step, “tallest so far” never changes, so the algorithm would always announce the first student.' },
        // python-why
        { id: 'u5-01-q14', c: 'python-why', t: 'mcq', d: 1, q: 'Who created the Python programming language?', o: ['Guido van Rossum', 'Charles Babbage', 'Alan Turing', 'Tim Berners-Lee'], a: 0, ex: 'Guido van Rossum created Python; it was first released in 1991. Babbage designed early mechanical computers, Turing was a computing pioneer, and Berners-Lee invented the World Wide Web.' },
        { id: 'u5-01-q15', c: 'python-why', t: 'multi', d: 1, q: 'Select all that apply. Why is Python a popular first language?', o: ['Its code is easy to read and close to English', 'It is free and open source', 'It has many ready-made libraries', 'It runs on only one kind of computer', 'It never shows error messages'], a: [0, 1, 2], ex: 'Python is readable, free and has huge libraries. It runs on Windows, macOS and Linux, and it does show error messages, which help you fix bugs.' },
        { id: 'u5-01-q16', c: 'python-why', t: 'match', d: 2, q: 'Match each field to a way Python is used in it.', pairs: [['Artificial Intelligence', 'Training models that recognise images or speech'], ['Data science', 'Analysing data and drawing charts'], ['Web development', 'Running the server side of websites'], ['Automation', 'Scripts that rename hundreds of files automatically']], ex: 'Python is general-purpose: AI (TensorFlow, PyTorch), data science (pandas, matplotlib), web (Django, Flask) and automation scripts.' },
        { id: 'u5-01-q17', c: 'python-why', t: 'mcq', d: 2, q: 'Kabir wants to study his school’s attendance data and draw charts from it. Why is Python a good choice?', o: ['It has libraries for working with data and drawing charts', 'It can only be used for games', 'It works without any instructions', 'It automatically collects attendance from students'], a: 0, mis: { 1: 'Python is used for far more than games: data science is one of its biggest uses.', 3: 'Python does not collect data by itself; Kabir still needs the data, but Python helps him analyse it.' }, ex: 'Libraries like pandas and matplotlib make reading, analysing and charting data easy, which is why Python is the top language for data science.' },
        { id: 'u5-01-q18', c: 'python-why', t: 'tf', d: 1, q: 'Python is free to download and use.', a: true, ex: 'Python is free and open source, so anyone can download it, use it and even look at how it is built.' },
        { id: 'u5-01-q19', c: 'python-why', t: 'mcq', d: 1, q: 'Python got its name from…', o: ['A British comedy show, Monty Python’s Flying Circus', 'A large snake found in Indian forests', 'The name of its creator’s pet', 'A famous early computer'], a: 0, mis: { 1: 'Many people think so because of the logo, but Guido van Rossum named it after the comedy show.' }, ex: 'Guido van Rossum named the language after the comedy show Monty Python’s Flying Circus.' },
        { id: 'u5-01-q20', c: 'python-why', t: 'mcq', d: 3, q: 'A start-up in Bengaluru wants to build an app that reads X-ray images and flags possible problems for doctors. Which reason makes Python a sensible language to start with?', o: ['Python has well-known AI libraries for training image models', 'Python programs never contain bugs', 'Python does not need any data to build an AI', 'Python can only be used by doctors'], a: 0, mis: { 1: 'Every language can have bugs. Python’s advantage here is its AI libraries.', 2: 'AI models always need data. Python helps you train the model on that data.' }, ex: 'Training an image model needs AI libraries such as TensorFlow or PyTorch, and Python is the main language for them.' },
        // editor
        { id: 'u5-01-q21', c: 'editor', t: 'mcq', d: 1, q: 'What is the output of this program?', code: `print("Namaste!")
print("I am learning Python.")`, o: ['Namaste!\nI am learning Python.', 'Namaste! I am learning Python.', '"Namaste!"\n"I am learning Python."', 'print("Namaste!")\nprint("I am learning Python.")'], a: 0, ex: 'Each print() shows its text on a new line. The quotes only mark the text; they are not shown.' },
        { id: 'u5-01-q22', c: 'editor', t: 'mcq', d: 2, q: 'Ayaan types this line and clicks Run. What happens?', code: `Print("Hello")`, o: ['An error, because Python is case-sensitive and Print is not print', 'It shows Hello', 'It shows Print("Hello")', 'It shows hello in small letters'], a: 0, mis: { 1: 'Python treats capital and small letters as different, so Print is an unknown name and causes a NameError.' }, ex: 'Python is case-sensitive. Print is not a known name, so Python stops with a NameError. Writing print in small letters fixes it.' },
        { id: 'u5-01-q23', c: 'editor', t: 'mcq', d: 2, q: 'Which error will this line give?', code: `print("Hello)`, o: ['SyntaxError: the closing quote is missing', 'NameError: Hello is not defined', 'No error: Python adds the quote itself', 'The program runs but shows nothing'], a: 0, mis: { 2: 'Python never guesses missing quotes. It cannot read the line, so it reports a SyntaxError.' }, ex: 'Text must start and end with a quote. Without the closing quote Python cannot read the line, which is a SyntaxError.' },
        { id: 'u5-01-q24', c: 'editor', t: 'order', d: 1, q: 'Put these in order to run a program in the editor.', items: ['Type your code in the editor', 'Click the Run button', 'Python runs the lines from top to bottom', 'Read the result in the output panel'], ex: 'You write the code, run it, Python carries out each line in order, and then you read the output.' },
        { id: 'u5-01-q25', c: 'editor', t: 'tf', d: 2, q: 'Python runs the lines of a simple program from top to bottom, one after another.', a: true, ex: 'This is called sequence. Unless a loop or condition changes the flow, Python runs line 1, then line 2, and so on.' },
        { id: 'u5-01-q26', c: 'editor', t: 'mcq', d: 2, q: 'What is the output?', code: `print("Hello")
print()
print("World")`, o: ['Hello\n\nWorld', 'Hello\nWorld', 'Hello World', 'Hello\n()\nWorld'], a: 0, mis: { 1: 'print() with nothing inside still prints a line: an empty one.' }, ex: 'An empty print() prints a blank line, so there is an empty line between Hello and World.' },
        // robo-logic
        { id: 'u5-01-q27', c: 'robo-logic', t: 'mcq', d: 1, q: 'How many times does the robot move forward?', code: `for i in range(3):
    move()`, o: ['3', '2', '4', '1'], a: 0, mis: { 1: 'range(3) gives three values (0, 1 and 2), so the loop body runs three times.', 2: 'range(3) does not include 3 itself, but it still gives three values: 0, 1, 2.' }, ex: 'range(3) produces 0, 1 and 2: three values, so move() runs three times.' },
        { id: 'u5-01-q28', c: 'robo-logic', t: 'bins', d: 2, q: 'Sort each piece of robot code or idea into the big idea it shows.', bins: ['Sequence', 'Loop', 'Condition'], items: [['move() then turn_left() then move()', 0], ['for i in range(5): move()', 1], ['if on_gem(): pick()', 2], ['while not at_goal(): move()', 1], ['Steps run one after another, in order', 0], ['Pick up the gem only if one is here', 2]], ex: 'Sequence = steps in order; loop (for/while) = repeat; condition (if) = decide using a question.' },
        { id: 'u5-01-q29', c: 'robo-logic', t: 'mcq', d: 3, q: 'What does this robot program do?', code: `for i in range(4):
    if on_gem():
        pick()
    move()`, o: ['On each of 4 squares it picks a gem if there is one, then moves on', 'It picks 4 gems from the same square', 'It moves 4 times and then picks one gem at the end', 'It moves only when it is standing on a gem'], a: 0, mis: { 2: 'pick() is inside the loop, so the gem check happens on every square, not just at the end.', 3: 'move() is not inside the if, so the robot moves every time, gem or no gem.' }, ex: 'Both the if and move() are inside the loop, so 4 times it checks for a gem (picking it if present) and then moves forward.' },
        { id: 'u5-01-q30', c: 'robo-logic', t: 'mcq', d: 2, q: 'When does this loop stop?', code: `while not at_goal():
    move()`, o: ['When the robot reaches the goal', 'After exactly one move', 'It never stops', 'When the robot finds a gem'], a: 0, mis: { 2: 'The loop repeats while “not at goal” is true. Once the robot is at the goal, it stops.' }, ex: 'A while loop repeats as long as its condition is true. “not at_goal()” becomes false when the robot reaches the goal, so the loop ends.' },
        { id: 'u5-01-q31', c: 'robo-logic', t: 'tf', d: 2, q: 'In Python, the lines indented under a for or if line are the ones that belong to it.', a: true, ex: 'Indentation (spaces at the start of a line) tells Python which lines are inside a loop or condition.' },
        { id: 'u5-01-q32', c: 'robo-logic', t: 'mcq', d: 3, q: 'Meera wants the robot to move 3 squares and then turn left <b>once</b>. Instead it turns left after every move. What should she change?', code: `for i in range(3):
    move()
    turn_left()`, o: ['Remove the spaces before turn_left() so it runs after the loop', 'Change range(3) to range(1)', 'Put turn_left() before the for line', 'Change move() to turn_right()'], a: 0, mis: { 1: 'range(1) would move only once. The problem is that turn_left() is inside the loop.', 2: 'That would turn left before moving. She wants to turn after the 3 moves.' }, ex: 'turn_left() is indented, so it is inside the loop and runs 3 times. Unindenting it puts it after the loop, so it runs once.' }
      ]
    },

    // ═══════════════════════════════════ u5-02 ═══════════════════════════════════
    {
      id: 'u5-02',
      title: 'print(), Variables and Data Types',
      minutes: 80,
      outcomes: [
        'Use print() to display text and values, and write comments',
        'Create and update variables that follow Python naming rules',
        'Identify the data types int, float, str and bool using type()'
      ],
      hook: 'A cricket scoreboard changes after every ball. Variables let your program remember a value and update it in just the same way.',
      concepts: {
        'print': 'Using print()',
        'comments': 'Comments with #',
        'variables': 'Variables and assignment',
        'names': 'Rules for variable names',
        'types': 'Data types and type()'
      },
      steps: [
        {
          kind: 'card',
          title: 'print() shows things on screen',
          html: `<p><code>print()</code> is a <b>function</b>: a ready-made command. Whatever you put inside its brackets appears in the output.</p>
<pre class="code">print("Good morning, Class 9!")
print('Python is fun')
print(2026)</pre>
<p>Output:</p>
<pre class="code">Good morning, Class 9!
Python is fun
2026</pre>
<ul><li>Text must be inside quotes, either <code>"double"</code> or <code>'single'</code>. Text in quotes is called a <b>string</b>.</li>
<li>Numbers do not need quotes.</li>
<li>Each <code>print()</code> starts on a new line.</li></ul>
<div class="warn"><b>Careful</b> If the text has an apostrophe, like <code>Let's go</code>, wrap it in double quotes: <code>print("Let's go")</code>.</div>`
        },
        {
          kind: 'card',
          title: 'Printing several items',
          html: `<p>Put several items in one <code>print()</code>, separated by commas. Python prints them on one line with <b>one space</b> between them.</p>
<pre class="code">print("Score:", 95)
print("Class", 9, "B")
print("*", "*", "*")</pre>
<p>Output:</p>
<pre class="code">Score: 95
Class 9 B
* * *</pre>
<p>An empty <code>print()</code> prints a blank line.</p>
<div class="key"><b>Key idea</b> The comma between items becomes a single space in the output. That is how the star patterns in your Practical File get their spaces, though you can also type the spaces inside one string: <code>print("* * *")</code>.</div>`
        },
        { kind: 'code', ex: 'py-personal-info' },
        { kind: 'code', ex: 'py-stars-up' },
        { kind: 'code', ex: 'py-stars-down' },
        {
          kind: 'card',
          title: 'Comments: notes for humans',
          html: `<p>A <b>comment</b> starts with <code>#</code>. Python ignores everything from <code>#</code> to the end of that line.</p>
<pre class="code"># Program: greet the class
print("Hello, everyone!")   # this line prints a greeting
# print("This line is switched off")</pre>
<p>Output:</p>
<pre class="code">Hello, everyone!</pre>
<p>Use comments to:</p>
<ul><li>explain what a part of the program does;</li>
<li>write the aim of the program at the top (useful in your Practical File);</li>
<li>switch off a line for a while when testing.</li></ul>
<div class="key"><b>Key idea</b> Comments never change the output. They make code easier for people to understand.</div>`
        },
        { kind: 'check', concepts: ['print', 'comments'], n: 2 },
        {
          kind: 'card',
          title: 'Variables store values',
          html: `<p>A <b>variable</b> is a name that refers to a value stored in the computer’s memory. Think of a label stuck on a box.</p>
<pre class="code">name = "Arjun"
marks = 85
print(name, "scored", marks)</pre>
<p>Output:</p>
<pre class="code">Arjun scored 85</pre>
<div class="def"><dfn>Assignment</dfn> The <code>=</code> sign stores the value on its right in the variable on its left. It does <b>not</b> mean “is equal to” as in maths.</div>
<p>Notice: <code>print(name)</code> shows the value <i>Arjun</i>, but <code>print("name")</code> shows the word <i>name</i>, because quotes make it text.</p>`
        },
        {
          kind: 'card',
          title: 'Changing a variable',
          html: `<p>A variable can be given a new value at any time. The old value is replaced.</p>
<pre class="code">runs = 40
runs = runs + 6
print(runs)</pre>
<p>Output: <code>46</code></p>
<p>How Python reads line 2: first work out the right side (<code>40 + 6</code> = 46), then store the answer in <code>runs</code>.</p>
<table class="tbl"><thead><tr><th>Line</th><th>runs after the line</th></tr></thead><tbody><tr><td><code>runs = 40</code></td><td>40</td></tr><tr><td><code>runs = runs + 6</code></td><td>46</td></tr></tbody></table>
<div class="key"><b>Key idea</b> In <code>x = x + 1</code> the right side is calculated first using the old value, then the result replaces it.</div>`
        },
        { kind: 'code', ex: 'py-sum-15-20' },
        { kind: 'code', ex: 'py-sticker-count' },
        {
          kind: 'card',
          title: 'Rules for naming variables',
          html: `<table class="tbl"><thead><tr><th>Rule</th><th>OK</th><th>Not allowed</th></tr></thead><tbody>
<tr><td>Use letters, digits and underscore <code>_</code></td><td><code>total_marks</code></td><td><code>total-marks</code>, <code>marks@9</code></td></tr>
<tr><td>Cannot start with a digit</td><td><code>marks2</code></td><td><code>2marks</code></td></tr>
<tr><td>No spaces</td><td><code>my_name</code></td><td><code>my name</code></td></tr>
<tr><td>Not a keyword</td><td><code>class_no</code></td><td><code>class</code>, <code>if</code>, <code>for</code>, <code>True</code></td></tr></tbody></table>
<p>Names are <b>case-sensitive</b>: <code>marks</code>, <code>Marks</code> and <code>MARKS</code> are three different variables.</p>
<div class="key"><b>Key idea</b> Choose meaningful names like <code>maths_marks</code> instead of <code>x</code>. Your program becomes easier to read and to debug.</div>`
        },
        { kind: 'check', concepts: ['variables', 'names'], n: 3 },
        {
          kind: 'card',
          title: 'Data types: int, float, str, bool',
          html: `<p>Every value in Python has a <b>data type</b>. The type decides what you can do with it.</p>
<table class="tbl"><thead><tr><th>Type</th><th>What it holds</th><th>Examples</th></tr></thead><tbody>
<tr><td><code>int</code> (integer)</td><td>Whole numbers</td><td><code>15</code>, <code>-3</code>, <code>0</code></td></tr>
<tr><td><code>float</code></td><td>Numbers with a decimal point</td><td><code>3.14</code>, <code>2.0</code>, <code>-0.5</code></td></tr>
<tr><td><code>str</code> (string)</td><td>Text in quotes</td><td><code>"Riya"</code>, <code>"15"</code></td></tr>
<tr><td><code>bool</code> (Boolean)</td><td>Only True or False</td><td><code>True</code>, <code>False</code></td></tr></tbody></table>
<div class="warn"><b>Careful</b> <code>"15"</code> in quotes is a string, not a number. <code>2.0</code> is a float even though it is a whole number. <code>True</code> and <code>False</code> need capital first letters.</div>`
        },
        {
          kind: 'card',
          title: 'Finding the type with type()',
          html: `<p>The <code>type()</code> function tells you the data type of a value or variable.</p>
<pre class="code">print(type(15))
print(type(1.5))
print(type("15"))
print(type(True))</pre>
<p>Output:</p>
<pre class="code">&lt;class 'int'&gt;
&lt;class 'float'&gt;
&lt;class 'str'&gt;
&lt;class 'bool'&gt;</pre>
<p>Python decides the type from the value you store, so you never have to declare it. A variable can even hold a different type later: <code>x = 5</code> then <code>x = "five"</code>.</p>
<div class="key"><b>Key idea</b> Use <code>type()</code> whenever you are not sure what kind of value a variable holds.</div>`
        },
        { kind: 'code', ex: 'py-types' },
        {
          kind: 'card',
          title: 'Why types matter',
          html: `<p>The same symbol does different things for different types.</p>
<pre class="code">print(5 + 5)
print("5" + "5")</pre>
<p>Output:</p>
<pre class="code">10
55</pre>
<p>For numbers, <code>+</code> adds. For strings, <code>+</code> <b>joins</b> them (this is called concatenation).</p>
<p>Mixing them causes an error:</p>
<pre class="code">print("Age: " + 14)</pre>
<p>This gives a <b>TypeError</b>: Python cannot join a string and an int with <code>+</code>. Use a comma instead, <code>print("Age:", 14)</code>, or convert the number with <code>str(14)</code>.</p>
<div class="key"><b>Key idea</b> Always know whether you have a number or text. It decides what your operators do.</div>`
        },
        { kind: 'check', concepts: ['types'], n: 3 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // print
        { id: 'u5-02-q01', c: 'print', t: 'mcq', d: 1, q: 'What is the output?', code: `print("Hello, Diya")`, o: ['Hello, Diya', '"Hello, Diya"', 'Hello Diya', 'print Hello, Diya'], a: 0, ex: 'print() shows the text inside the quotes exactly, including the comma, but not the quotes themselves.' },
        { id: 'u5-02-q02', c: 'print', t: 'mcq', d: 2, q: 'What is the output?', code: `print("Total:", 50)`, o: ['Total: 50', 'Total:50', 'Total: , 50', '"Total:" 50'], a: 0, mis: { 1: 'The comma between items becomes one space in the output.', 2: 'The comma separates items; it is not printed itself.' }, ex: 'Items separated by commas are printed on one line with a single space between them.' },
        { id: 'u5-02-q03', c: 'print', t: 'mcq', d: 2, q: 'What is the output?', code: `print("*", "*")
print("*")`, o: ['* *\n*', '**\n*', '* * *', '*\n*\n*'], a: 0, mis: { 1: 'The comma adds a space, so the two stars are separated: * *', 2: 'Each print() starts a new line, so the third star is on line 2.' }, ex: 'Line 1 prints two stars separated by one space; the second print() starts a new line with one star.' },
        { id: 'u5-02-q04', c: 'print', t: 'mcq', d: 2, q: 'What is the output?', code: `print(7)
print("7")`, o: ['7\n7', '7\n"7"', '77', '7 7'], a: 0, mis: { 1: 'Quotes mark a string in the code, but they are not shown in the output.' }, ex: 'Both lines show 7. One is an int and one is a str, but print() displays them the same way, without quotes.' },
        { id: 'u5-02-q05', c: 'print', t: 'tf', d: 1, q: 'print() with nothing inside the brackets prints an empty line.', a: true, ex: 'An empty print() outputs a blank line. It is useful for spacing out your output.' },
        { id: 'u5-02-q06', c: 'print', t: 'mcq', d: 3, q: 'What is the output?', code: `print("Class", 9, "B")`, o: ['Class 9 B', 'Class9B', 'Class 9B', '"Class" 9 "B"'], a: 0, mis: { 1: 'print() puts one space between every pair of items.', 2: 'There are three items, so there are two spaces: one between each pair.' }, ex: 'Three items, separated by commas, are printed with one space between each: Class 9 B.' },
        { id: 'u5-02-q07', c: 'print', t: 'mcq', d: 2, q: 'Which line correctly displays <code>I\'m ready!</code>?', o: [`print("I'm ready!")`, `print('I'm ready!')`, `print(I'm ready!)`, `print("I'm ready!)`], a: 0, mis: { 1: 'The apostrophe ends the single-quoted string too early, causing a SyntaxError.', 3: 'The closing double quote is missing.' }, ex: 'Wrap text that contains an apostrophe in double quotes, and close the string with the same quote you opened it with.' },
        // comments
        { id: 'u5-02-q08', c: 'comments', t: 'mcq', d: 1, q: 'What does Python do with a line that starts with <code>#</code>?', o: ['Ignores it, because it is a comment', 'Prints it in the output', 'Treats it as a heading', 'Stops the program'], a: 0, ex: 'Everything after # on a line is a comment. Python skips it; it is only for people reading the code.' },
        { id: 'u5-02-q09', c: 'comments', t: 'mcq', d: 2, q: 'What is the output?', code: `# print("Hidden")
print("Shown")  # greeting`, o: ['Shown', 'Hidden\nShown', 'Shown  # greeting', '# print("Hidden")\nShown'], a: 0, mis: { 1: 'The first line is a comment, so it never runs.', 2: 'The # and the words after it are a comment, so they are not printed.' }, ex: 'Line 1 is entirely a comment. On line 2, the part after # is a comment, so only Shown is printed.' },
        { id: 'u5-02-q10', c: 'comments', t: 'multi', d: 2, q: 'Select all that apply. Good reasons to write comments:', o: ['Explain what a part of the code does', 'Write the aim of the program at the top', 'Switch off a line for a while when testing', 'Make the program run faster', 'Store a value for later use'], a: [0, 1, 2], ex: 'Comments help humans understand and test code. They do not change speed and cannot store values; that is what variables do.' },
        { id: 'u5-02-q11', c: 'comments', t: 'tf', d: 2, q: 'Adding a comment to a line changes what that program prints.', a: false, ex: 'Python ignores comments completely, so the output stays the same.' },
        { id: 'u5-02-q12', c: 'comments', t: 'mcq', d: 3, q: 'What is the output?', code: `marks = 40
# marks = 90
print(marks)`, o: ['40', '90', 'marks', '40\n90'], a: 0, mis: { 1: 'Line 2 is a comment, so marks is never changed to 90.' }, ex: 'The line marks = 90 is commented out, so it never runs. marks is still 40.' },
        // variables
        { id: 'u5-02-q13', c: 'variables', t: 'mcq', d: 1, q: 'In <code>age = 14</code>, what does the <code>=</code> sign do?', o: ['Stores the value 14 in the variable age', 'Checks whether age is equal to 14', 'Prints the value of age', 'Makes age equal 14 forever'], a: 0, mis: { 1: 'Checking equality uses ==. A single = is assignment.', 3: 'A variable can be given a new value later; = just stores the current one.' }, ex: '= is the assignment operator. It stores the value on the right in the variable on the left.' },
        { id: 'u5-02-q14', c: 'variables', t: 'mcq', d: 2, q: 'What is the output?', code: `score = 10
score = 25
print(score)`, o: ['25', '10', '10\n25', '35'], a: 0, mis: { 1: 'The second assignment replaces the old value.', 3: 'Assignment replaces the value; it does not add to it.' }, ex: 'A variable holds one value at a time. score = 25 replaces 10, so 25 is printed.' },
        { id: 'u5-02-q15', c: 'variables', t: 'mcq', d: 2, q: 'What is the output?', code: `runs = 40
runs = runs + 6
print(runs)`, o: ['46', '40', 'runs + 6', '406'], a: 0, mis: { 1: 'Line 2 updates runs, so it is no longer 40.', 3: '40 and 6 are numbers, so + adds them; it does not join them like text.' }, ex: 'Python works out runs + 6 = 46 using the old value, then stores 46 in runs.' },
        { id: 'u5-02-q16', c: 'variables', t: 'mcq', d: 3, q: 'What is the output?', code: `a = 5
b = a
a = 9
print(b)`, o: ['5', '9', 'a', '14'], a: 0, mis: { 1: 'b = a copied the value 5 at that moment. Changing a later does not change b.' }, ex: 'When b = a ran, a was 5, so b got 5. Changing a to 9 afterwards does not affect b.' },
        { id: 'u5-02-q17', c: 'variables', t: 'mcq', d: 2, q: 'What is the output?', code: `city = "Pune"
print("city")
print(city)`, o: ['city\nPune', 'Pune\nPune', 'city\ncity', 'Pune\ncity'], a: 0, mis: { 1: '"city" in quotes is just the text city, not the variable.' }, ex: 'print("city") prints the word city. print(city) without quotes prints the value stored in the variable: Pune.' },
        { id: 'u5-02-q18', c: 'variables', t: 'num', d: 2, q: 'What number does this program print?', code: `x = 3
x = x * 4
x = x - 2
print(x)`, a: 10, ex: 'x starts at 3, becomes 3 × 4 = 12, then 12 − 2 = 10.' },
        { id: 'u5-02-q19', c: 'variables', t: 'order', d: 2, q: 'Put these lines in order so that the program prints 12.', items: ['n = 5', 'n = n + 7', 'print(n)'], ex: 'A variable must be created before it is used, then updated, then printed: 5 + 7 = 12.' },
        // names
        { id: 'u5-02-q20', c: 'names', t: 'multi', d: 1, q: 'Select all that apply. Which are valid Python variable names?', o: ['total_marks', 'marks2', '_count', '2marks', 'total-marks', 'my name'], a: [0, 1, 2], ex: 'Names may use letters, digits and underscores but cannot start with a digit, and cannot contain hyphens or spaces.' },
        { id: 'u5-02-q21', c: 'names', t: 'mcq', d: 2, q: 'Why does <code>class = 9</code> cause an error?', o: ['class is a Python keyword, so it cannot be a variable name', 'Variable names cannot contain the letter s', 'The value 9 must be in quotes', 'Variable names must be in capitals'], a: 0, mis: { 2: 'Numbers do not need quotes. The problem is the name: class is a reserved keyword.' }, ex: 'Keywords like class, if, for and True have special meaning in Python, so they cannot be used as names. Use class_no instead.' },
        { id: 'u5-02-q22', c: 'names', t: 'bins', d: 2, q: 'Sort these variable names.', bins: ['Valid name', 'Invalid name'], items: [['student_name', 0], ['Marks', 0], ['roll_no_1', 0], ['1st_place', 1], ['my-score', 1], ['for', 1], ['total marks', 1]], ex: 'Invalid: starts with a digit (1st_place), contains a hyphen (my-score), is a keyword (for), or contains a space (total marks).' },
        { id: 'u5-02-q23', c: 'names', t: 'mcq', d: 3, q: 'What happens when this code runs?', code: `Name = "Arjun"
print(name)`, o: ['NameError, because name and Name are different variables', 'It shows Arjun', 'It shows Name', 'It shows an empty line'], a: 0, mis: { 1: 'Python is case-sensitive: the variable created was Name with a capital N.' }, ex: 'Python is case-sensitive. Only Name was created, so using name gives a NameError.' },
        { id: 'u5-02-q24', c: 'names', t: 'tf', d: 2, q: 'Python treats total and Total as the same variable.', a: false, ex: 'Names are case-sensitive, so total and Total are two different variables.' },
        { id: 'u5-02-q25', c: 'names', t: 'mcq', d: 1, q: 'Which is the clearest name for a variable that stores a student’s maths marks?', o: ['maths_marks', 'x', 'm1', 'abc'], a: 0, ex: 'Meaningful names like maths_marks make code easier to read and debug. Single letters hide what the value means.' },
        // types
        { id: 'u5-02-q26', c: 'types', t: 'match', d: 1, q: 'Match each value to its data type.', pairs: [['42', 'int'], ['3.5', 'float'], ['"42"', 'str'], ['False', 'bool']], ex: 'Whole numbers are int, decimals are float, anything in quotes is str, and True/False are bool.' },
        { id: 'u5-02-q27', c: 'types', t: 'mcq', d: 2, q: 'What is the output?', code: `print(type(7.0))`, o: [`<class 'float'>`, `<class 'int'>`, `<class 'str'>`, 'float 7.0'], a: 0, mis: { 1: '7.0 has a decimal point, so it is a float even though its value is whole.' }, ex: 'Any number written with a decimal point is a float, including 7.0.' },
        { id: 'u5-02-q28', c: 'types', t: 'mcq', d: 2, q: 'What is the output?', code: `print(type("99"))`, o: [`<class 'str'>`, `<class 'int'>`, `<class 'float'>`, `<class '99'>`], a: 0, mis: { 1: 'The quotes make "99" a string, even though it contains digits.' }, ex: 'Anything inside quotes is a string (str), even if it looks like a number.' },
        { id: 'u5-02-q29', c: 'types', t: 'mcq', d: 2, q: 'What is the output?', code: `a = "5"
b = "5"
print(a + b)`, o: ['55', '10', '5 5', 'a + b'], a: 0, mis: { 1: 'a and b are strings, so + joins them instead of adding.' }, ex: 'For strings, + joins (concatenates) them: "5" + "5" gives "55".' },
        { id: 'u5-02-q30', c: 'types', t: 'mcq', d: 3, q: 'Rohan runs this line. What happens?', code: `print("Age: " + 14)`, o: ['TypeError: a str and an int cannot be joined with +', 'It shows Age: 14', 'It shows Age: + 14', 'SyntaxError: a quote is missing'], a: 0, mis: { 1: 'Python will not automatically turn 14 into text. Use a comma, or str(14).' }, ex: '+ cannot combine a string with an int. Use print("Age:", 14) or print("Age: " + str(14)).' },
        { id: 'u5-02-q31', c: 'types', t: 'tf', d: 1, q: 'True and False are values of the bool data type.', a: true, ex: 'bool (Boolean) has exactly two values, True and False, each written with a capital first letter.' },
        { id: 'u5-02-q32', c: 'types', t: 'multi', d: 2, q: 'Select all that apply. Which of these are float values?', o: ['2.5', '-0.75', '10.0', '10', '"2.5"'], a: [0, 1, 2], ex: 'A float has a decimal point (2.5, -0.75, 10.0). 10 is an int, and "2.5" in quotes is a str.' },
        { id: 'u5-02-q33', c: 'types', t: 'mcq', d: 2, q: 'What is the output?', code: `is_member = True
print(type(is_member))`, o: [`<class 'bool'>`, `<class 'str'>`, `<class 'int'>`, 'True'], a: 0, mis: { 1: 'True has no quotes, so it is not a string; it is a Boolean value.', 3: 'type() reports the type, not the value.' }, ex: 'True (without quotes) is a Boolean, so type() reports bool.' }
      ],
      gens: ['py-type']
    },
    // ═══════════════════════════════════ u5-03 ═══════════════════════════════════
    {
      id: 'u5-03',
      title: 'Operators, Expressions and input()',
      minutes: 110,
      outcomes: [
        'Use arithmetic, assignment, comparison and logical operators to build expressions',
        'Apply the order of operations (precedence) to evaluate expressions',
        'Take input with input() and convert it with int(), float() and str()'
      ],
      hook: 'Split a ₹250 pizza bill between 4 friends, check who scored above 90, and ask users their age: operators and input() make programs genuinely useful.',
      concepts: {
        'arith': 'Arithmetic operators',
        'precedence': 'Order of operations (precedence)',
        'assign': 'Assignment operators (+=, -=, *=, /=)',
        'compare': 'Comparison operators',
        'logic': 'Logical operators: and, or, not',
        'input': 'input() and type conversion'
      },
      steps: [
        {
          kind: 'card',
          title: 'Arithmetic operators',
          html: `<p>Python can be used as a powerful calculator. These are its <b>arithmetic operators</b>, shown with <code>a = 17</code> and <code>b = 5</code>:</p>
<table class="tbl"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>Addition</td><td><code>a + b</code></td><td>22</td></tr>
<tr><td><code>-</code></td><td>Subtraction</td><td><code>a - b</code></td><td>12</td></tr>
<tr><td><code>*</code></td><td>Multiplication</td><td><code>a * b</code></td><td>85</td></tr>
<tr><td><code>/</code></td><td>Division</td><td><code>a / b</code></td><td>3.4</td></tr>
<tr><td><code>//</code></td><td>Floor division</td><td><code>a // b</code></td><td>3</td></tr>
<tr><td><code>%</code></td><td>Remainder (modulus)</td><td><code>a % b</code></td><td>2</td></tr>
<tr><td><code>**</code></td><td>Power (exponent)</td><td><code>2 ** 3</code></td><td>8</td></tr></tbody></table>
<div class="warn"><b>Careful</b> Multiplication is <code>*</code>, not x. Python never multiplies when you write <code>2(3 + 4)</code>: you must write <code>2 * (3 + 4)</code>.</div>`
        },
        {
          kind: 'card',
          title: 'Three kinds of division',
          html: `<p>Four friends share a ₹250 pizza bill:</p>
<pre class="code">print(250 / 4)
print(250 // 4)
print(250 % 4)</pre>
<p>Output:</p>
<pre class="code">62.5
62
2</pre>
<ul><li><code>/</code> gives the exact answer and <b>always</b> gives a float: <code>10 / 2</code> is <code>5.0</code>, not 5.</li>
<li><code>//</code> keeps only the whole-number part (it rounds down): each friend pays ₹62…</li>
<li><code>%</code> gives the remainder: …and ₹2 is left over.</li></ul>
<div class="key"><b>Key idea</b> <code>%</code> is very handy: a number <code>n</code> is even when <code>n % 2 == 0</code>, and <code>n % 10</code> gives its last digit.</div>`
        },
        { kind: 'code', ex: 'py-square-7' },
        { kind: 'code', ex: 'py-km-to-m' },
        {
          kind: 'card',
          title: 'Expressions and order of operations',
          html: `<p>An <b>expression</b> is a combination of values, variables and operators that Python works out to a single value, like <code>2 + 3 * 4</code>.</p>
<p>Python follows an order of operations (<b>precedence</b>), much like BODMAS in maths:</p>
<ol class="flow"><li><b>( )</b><span>Brackets first</span></li><li><b>**</b><span>Powers</span></li><li><b>* / // %</b><span>Left to right</span></li><li><b>+ -</b><span>Left to right</span></li></ol>
<pre class="code">print(2 + 3 * 4)
print((2 + 3) * 4)
print(10 - 4 - 3)</pre>
<p>Output: <code>14</code>, <code>20</code> and <code>3</code>.</p>
<div class="warn"><b>Careful</b> The average of 80 and 90 is <code>(80 + 90) / 2</code>. Without brackets, <code>80 + 90 / 2</code> gives 125.0, because division happens first.</div>`
        },
        { kind: 'code', ex: 'py-simple-interest' },
        { kind: 'check', concepts: ['arith', 'precedence'], n: 3 },
        {
          kind: 'card',
          title: 'Assignment operators',
          html: `<p>Updating a variable is so common that Python has shortcuts called <b>assignment operators</b>.</p>
<table class="tbl"><thead><tr><th>Operator</th><th>Example</th><th>Same as</th></tr></thead><tbody>
<tr><td><code>=</code></td><td><code>x = 10</code></td><td>store 10 in x</td></tr>
<tr><td><code>+=</code></td><td><code>x += 5</code></td><td><code>x = x + 5</code></td></tr>
<tr><td><code>-=</code></td><td><code>x -= 2</code></td><td><code>x = x - 2</code></td></tr>
<tr><td><code>*=</code></td><td><code>x *= 3</code></td><td><code>x = x * 3</code></td></tr>
<tr><td><code>/=</code></td><td><code>x /= 4</code></td><td><code>x = x / 4</code></td></tr></tbody></table>
<pre class="code">wallet = 100
wallet -= 30    # bought a notebook
wallet += 50    # birthday gift
print(wallet)</pre>
<p>Output: <code>120</code></p>
<div class="warn"><b>Careful</b> Just like <code>/</code>, the <code>/=</code> operator always makes the value a float.</div>`
        },
        {
          kind: 'card',
          title: 'Comparison operators',
          html: `<p>A <b>comparison</b> asks a yes/no question. The answer is a bool: <code>True</code> or <code>False</code>.</p>
<table class="tbl"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>equal to</td><td><code>5 == 5</code></td><td>True</td></tr>
<tr><td><code>!=</code></td><td>not equal to</td><td><code>5 != 3</code></td><td>True</td></tr>
<tr><td><code>&gt;</code></td><td>greater than</td><td><code>4 &gt; 9</code></td><td>False</td></tr>
<tr><td><code>&lt;</code></td><td>less than</td><td><code>4 &lt; 9</code></td><td>True</td></tr>
<tr><td><code>&gt;=</code></td><td>greater than or equal to</td><td><code>18 &gt;= 18</code></td><td>True</td></tr>
<tr><td><code>&lt;=</code></td><td>less than or equal to</td><td><code>7 &lt;= 6</code></td><td>False</td></tr></tbody></table>
<div class="warn"><b>Careful</b> <code>=</code> stores a value; <code>==</code> compares two values. Text comparisons are case-sensitive: <code>"Delhi" == "delhi"</code> is False.</div>`
        },
        {
          kind: 'card',
          title: 'Logical operators: and, or, not',
          html: `<p><b>Logical operators</b> combine or flip True/False values.</p>
<table class="tbl"><thead><tr><th>Operator</th><th>Gives True when…</th><th>Example</th></tr></thead><tbody>
<tr><td><code>and</code></td><td>both sides are True</td><td><code>True and False</code> → False</td></tr>
<tr><td><code>or</code></td><td>at least one side is True</td><td><code>True or False</code> → True</td></tr>
<tr><td><code>not</code></td><td>the value is False (it flips it)</td><td><code>not True</code> → False</td></tr></tbody></table>
<pre class="code">age = 15
print(age &gt;= 13 and age &lt;= 19)   # a teenager?
print(age &lt; 5 or age &gt; 60)       # free ticket?
print(not age &gt; 18)</pre>
<p>Output: <code>True</code>, <code>False</code>, <code>True</code></p>
<div class="key"><b>Key idea</b> Comparisons are worked out first, then <code>not</code>, then <code>and</code>, then <code>or</code>.</div>`
        },
        { kind: 'check', concepts: ['assign', 'compare', 'logic'], n: 3 },
        {
          kind: 'card',
          title: 'Asking the user with input()',
          html: `<p>So far our programs used fixed values. <code>input()</code> lets the user type a value while the program runs.</p>
<pre class="code">name = input("What is your name? ")
print("Hello,", name)</pre>
<p>If the user types <code>Sana</code>, the output is:</p>
<pre class="code">What is your name? Sana
Hello, Sana</pre>
<ol class="flow"><li><b>Shows the prompt</b><span>The text in the brackets</span></li><li><b>Waits</b><span>The user types and presses Enter</span></li><li><b>Returns</b><span>What was typed, which you store in a variable</span></li></ol>
<p>In this editor, type the value in the <b>Input</b> box before clicking Run, one value for each <code>input()</code>.</p>`
        },
        { kind: 'code', ex: 'py-input-greet' },
        {
          kind: 'card',
          title: 'input() always gives a string',
          html: `<p>Whatever the user types, even <code>14</code>, <code>input()</code> returns it as a <b>string</b> (str). So maths goes wrong:</p>
<pre class="code">age = input("Age: ")     # user types 14
print(age + "1")         # 141, joined as text
print(age + 1)           # TypeError</pre>
<p><b>Type conversion</b> fixes this:</p>
<table class="tbl"><thead><tr><th>Function</th><th>Converts to</th><th>Example</th></tr></thead><tbody>
<tr><td><code>int()</code></td><td>whole number</td><td><code>int("14")</code> → 14</td></tr>
<tr><td><code>float()</code></td><td>decimal number</td><td><code>float("4.5")</code> → 4.5</td></tr>
<tr><td><code>str()</code></td><td>text</td><td><code>str(92)</code> → "92"</td></tr></tbody></table>
<pre class="code">age = int(input("Age: "))</pre>
<div class="warn"><b>Careful</b> <code>int("12.5")</code> gives a ValueError. Use <code>float()</code> when the user may type decimals.</div>`
        },
        { kind: 'code', ex: 'py-next-year' },
        {
          kind: 'card',
          title: 'Plan it: Input → Process → Output',
          html: `<p>Most simple programs follow three steps. Plan them before you type.</p>
<ol class="flow"><li><b>Input</b><span>What does the user give? <code>length</code>, <code>breadth</code></span></li><li><b>Process</b><span>What is calculated? <code>area = length * breadth</code>, <code>perimeter = 2 * (length + breadth)</code></span></li><li><b>Output</b><span>What is shown? <code>Area = 40</code>, <code>Perimeter = 26</code></span></li></ol>
<pre class="code">length = int(input("Enter the length: "))
breadth = int(input("Enter the breadth: "))
area = length * breadth
print("Area =", area)</pre>
<div class="key"><b>Key idea</b> Turn each maths formula into Python by writing every operator (<code>*</code>, <code>/</code>) and adding brackets wherever the maths has them.</div>`
        },
        { kind: 'code', ex: 'py-rectangle' },
        { kind: 'code', ex: 'py-triangle' },
        { kind: 'code', ex: 'py-average-marks' },
        { kind: 'check', concepts: ['input'], n: 3 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // arith
        { id: 'u5-03-q01', c: 'arith', t: 'mcq', d: 1, q: 'What is the output?', code: `print(17 // 5)`, o: ['3', '3.4', '2', '4'], a: 0, mis: { 1: '3.4 is what / gives. // keeps only the whole-number part.', 2: '2 is the remainder, which is what % gives.' }, ex: '// is floor division: 17 ÷ 5 = 3.4, and the whole-number part is 3.' },
        { id: 'u5-03-q02', c: 'arith', t: 'mcq', d: 1, q: 'What is the output?', code: `print(17 % 5)`, o: ['2', '3', '3.4', '0.4'], a: 0, mis: { 1: '3 is how many times 5 fits (that is //). % gives what is left over.' }, ex: '5 fits into 17 three times (15), leaving a remainder of 2.' },
        { id: 'u5-03-q03', c: 'arith', t: 'mcq', d: 2, q: 'What is the output?', code: `print(10 / 2)`, o: ['5.0', '5', '2', '5.00'], a: 0, mis: { 1: 'The / operator always gives a float, even when the answer is a whole number.' }, ex: 'In Python 3, / always returns a float, so 10 / 2 is 5.0.' },
        { id: 'u5-03-q04', c: 'arith', t: 'mcq', d: 2, q: 'What is the output?', code: `print(2 ** 5)`, o: ['32', '10', '25', '7'], a: 0, mis: { 1: '10 would be 2 * 5. ** means power: 2 × 2 × 2 × 2 × 2.', 2: '25 is 5 ** 2. Here 2 is the base and 5 is the power.' }, ex: '2 ** 5 means 2 to the power 5 = 2 × 2 × 2 × 2 × 2 = 32.' },
        { id: 'u5-03-q05', c: 'arith', t: 'mcq', d: 3, q: 'Four friends share a ₹250 bill. What is the output?', code: `bill = 250
friends = 4
print(bill // friends, bill % friends)`, o: ['62 2', '62.5 2', '62 0.5', '62.5 0'], a: 0, mis: { 1: '// drops the decimal part, so the first number is 62, not 62.5.', 2: '% gives the remainder in rupees (2), not a fraction.' }, ex: '250 // 4 = 62 (each pays ₹62) and 250 % 4 = 2 (₹2 left over).' },
        { id: 'u5-03-q06', c: 'arith', t: 'match', d: 2, q: 'Match each operator to what it does.', pairs: [['//', 'Floor division (whole-number part)'], ['%', 'Remainder'], ['**', 'Power (exponent)'], ['/', 'Division that always gives a float']], ex: '/ gives the exact float answer, // the whole-number part, % the remainder, and ** raises to a power.' },
        { id: 'u5-03-q07', c: 'arith', t: 'tf', d: 2, q: 'In Python, 7 / 7 gives 1.0, not 1.', a: true, ex: 'The / operator always produces a float, so the answer is 1.0.' },
        // precedence
        { id: 'u5-03-q08', c: 'precedence', t: 'mcq', d: 1, q: 'What is the output?', code: `print(2 + 3 * 4)`, o: ['14', '20', '24', '9'], a: 0, mis: { 1: '20 would be (2 + 3) * 4. Multiplication happens before addition.' }, ex: '* comes before +, so 3 * 4 = 12 first, then 2 + 12 = 14.' },
        { id: 'u5-03-q09', c: 'precedence', t: 'mcq', d: 2, q: 'What is the output?', code: `print((2 + 3) * 4)`, o: ['20', '14', '9', '24'], a: 0, mis: { 1: 'Brackets are worked out first, so 2 + 3 = 5 happens before the multiplication.' }, ex: 'Brackets first: 2 + 3 = 5, then 5 * 4 = 20.' },
        { id: 'u5-03-q10', c: 'precedence', t: 'mcq', d: 2, q: 'What is the output?', code: `print(10 - 4 - 3)`, o: ['3', '9', '-3', '17'], a: 0, mis: { 1: '9 would be 10 - (4 - 3). Operators of the same level work left to right.' }, ex: 'Same-level operators go left to right: 10 − 4 = 6, then 6 − 3 = 3.' },
        { id: 'u5-03-q11', c: 'precedence', t: 'mcq', d: 3, q: 'What is the output?', code: `print(20 / 4 * 2 + 1)`, o: ['11.0', '3.5', '11', '15.0'], a: 0, mis: { 1: '3.5 would need 20 / (4 * 2) + 1. / and * have the same level, so go left to right.', 2: 'The / makes the result a float, so it ends in .0.' }, ex: 'Left to right for / and *: 20 / 4 = 5.0, 5.0 * 2 = 10.0, then + 1 gives 11.0.' },
        { id: 'u5-03-q12', c: 'precedence', t: 'order', d: 2, q: 'Python works out <code>2 + 3 ** 2 * 4</code>. Put the steps in the order Python does them.', items: ['3 ** 2 gives 9', '9 * 4 gives 36', '2 + 36 gives 38'], ex: 'Powers first, then multiplication, then addition: 3 ** 2 = 9, 9 * 4 = 36, 2 + 36 = 38.' },
        { id: 'u5-03-q13', c: 'precedence', t: 'num', d: 3, q: 'What number does this print?', code: `print(5 + 2 * 3 ** 2 - 4 // 3)`, a: 22, ex: '3 ** 2 = 9; 2 * 9 = 18; 4 // 3 = 1; then 5 + 18 − 1 = 22.' },
        { id: 'u5-03-q14', c: 'precedence', t: 'mcq', d: 3, q: 'Kabir wants the average of 80 and 90. What does his code print?', code: `avg = 80 + 90 / 2
print(avg)`, o: ['125.0', '85.0', '85', '125'], a: 0, mis: { 1: '85.0 is the correct average, but this code divides only 90 by 2. He needs (80 + 90) / 2.', 3: '/ always gives a float, so the result ends in .0.' }, ex: 'Division happens before addition: 90 / 2 = 45.0, then 80 + 45.0 = 125.0. Brackets fix it: (80 + 90) / 2.' },
        // assign
        { id: 'u5-03-q15', c: 'assign', t: 'mcq', d: 1, q: '<code>x += 3</code> means the same as…', o: ['x = x + 3', 'x = 3', 'x == x + 3', 'x = 3 + 3'], a: 0, ex: '+= adds to the current value: x += 3 is a shortcut for x = x + 3.' },
        { id: 'u5-03-q16', c: 'assign', t: 'mcq', d: 2, q: 'What is the output?', code: `coins = 10
coins += 5
coins -= 3
print(coins)`, o: ['12', '18', '8', '15'], a: 0, mis: { 1: '18 would mean adding 3 at the end. -= subtracts.', 3: '15 is the value after the first update only; then 3 is taken away.' }, ex: '10 + 5 = 15, then 15 − 3 = 12.' },
        { id: 'u5-03-q17', c: 'assign', t: 'mcq', d: 2, q: 'What is the output?', code: `x = 9
x /= 3
print(x)`, o: ['3.0', '3', '27', '6'], a: 0, mis: { 1: '/= uses ordinary division, which always gives a float.', 2: '27 would be *=. /= divides.' }, ex: 'x /= 3 means x = x / 3 = 9 / 3 = 3.0. Division with / always gives a float.' },
        { id: 'u5-03-q18', c: 'assign', t: 'mcq', d: 3, q: 'Diya’s step counter starts at 1000. What is the output?', code: `steps = 1000
steps *= 2
steps += 500
print(steps)`, o: ['2500', '3000', '1500', '2000'], a: 0, mis: { 1: '3000 would be (1000 + 500) * 2. The lines run in order: multiply first, then add.', 2: '1500 ignores the *= 2 line.' }, ex: '1000 × 2 = 2000, then 2000 + 500 = 2500. Lines run top to bottom.' },
        { id: 'u5-03-q19', c: 'assign', t: 'tf', d: 2, q: 'After <code>a = 4</code> and then <code>a *= 3</code>, the value of a is 12.', a: true, ex: 'a *= 3 means a = a * 3 = 4 * 3 = 12.' },
        // compare
        { id: 'u5-03-q20', c: 'compare', t: 'mcq', d: 1, q: 'What is the output?', code: `print(15 > 9)`, o: ['True', 'False', '15 > 9', '6'], a: 0, mis: { 2: 'print() shows the result of the comparison, not the comparison itself.', 3: '6 would be 15 - 9. > compares the numbers and gives True or False.' }, ex: 'A comparison produces a bool. 15 is greater than 9, so the result is True.' },
        { id: 'u5-03-q21', c: 'compare', t: 'mcq', d: 1, q: 'Which expression checks whether <code>marks</code> is equal to 100?', o: ['marks == 100', 'marks = 100', 'marks === 100', 'marks =! 100'], a: 0, mis: { 1: 'A single = stores 100 in marks; it does not compare.' }, ex: '== compares two values. A single = is assignment.' },
        { id: 'u5-03-q22', c: 'compare', t: 'mcq', d: 2, q: 'What is the output?', code: `print(10 != 10)`, o: ['False', 'True', '10', '0'], a: 0, mis: { 1: '!= means “not equal”. 10 is equal to 10, so “not equal” is False.' }, ex: '!= asks “are they different?”. 10 and 10 are the same, so the answer is False.' },
        { id: 'u5-03-q23', c: 'compare', t: 'mcq', d: 2, q: 'What is the output?', code: `age = 18
print(age >= 18, age > 18)`, o: ['True False', 'True True', 'False False', 'False True'], a: 0, mis: { 1: '> means strictly greater. 18 > 18 is False.' }, ex: '>= includes the boundary, so 18 >= 18 is True; > does not, so 18 > 18 is False.' },
        { id: 'u5-03-q24', c: 'compare', t: 'bins', d: 2, q: 'Sort each comparison by its result.', bins: ['True', 'False'], items: [['7 <= 7', 0], ['3 != 3', 1], ['"cat" == "Cat"', 1], ['10 > 2', 0], ['5 * 2 == 10', 0], ['9 < 4', 1]], ex: '7 <= 7 includes equality; "cat" and "Cat" differ in case; arithmetic (5 * 2) is worked out before the comparison.' },
        // logic
        { id: 'u5-03-q25', c: 'logic', t: 'mcq', d: 2, q: 'What is the output?', code: `print(True and False)`, o: ['False', 'True', 'TrueFalse', 'None'], a: 0, mis: { 1: 'and needs both sides to be True.' }, ex: 'and gives True only when both sides are True. One side is False, so the result is False.' },
        { id: 'u5-03-q26', c: 'logic', t: 'mcq', d: 2, q: 'What is the output?', code: `age = 15
print(age >= 13 and age <= 19)`, o: ['True', 'False', '15', 'True True'], a: 0, mis: { 1: 'Both comparisons are True for 15, and True and True is True.' }, ex: '15 >= 13 is True and 15 <= 19 is True, so the whole and-expression is True.' },
        { id: 'u5-03-q27', c: 'logic', t: 'mcq', d: 3, q: 'What is the output?', code: `rain = False
holiday = True
print(rain or holiday, not holiday)`, o: ['True False', 'False True', 'True True', 'False False'], a: 0, mis: { 1: 'or needs only one True side, and holiday is True.', 2: 'not flips True to False.' }, ex: 'rain or holiday is True because holiday is True; not holiday flips True to False.' },
        { id: 'u5-03-q28', c: 'logic', t: 'multi', d: 3, q: 'Select all that apply. Sana is a library member (<code>member = True</code>) with no overdue books (<code>overdue = False</code>). Which expressions are True?', o: ['member and not overdue', 'member or overdue', 'not overdue', 'not member', 'member and overdue'], a: [0, 1, 2], ex: 'not overdue is True, so member and not overdue is True; member or overdue is True because member is True. not member and member and overdue are False.' },
        { id: 'u5-03-q29', c: 'logic', t: 'tf', d: 1, q: '<code>x or y</code> is True when at least one of x and y is True.', a: true, ex: 'or needs only one True side. It is False only when both sides are False.' },
        // input
        { id: 'u5-03-q30', c: 'input', t: 'mcq', d: 1, q: 'What data type does <code>input()</code> give back?', o: ['Always a string (str)', 'Always an int', 'Whatever type the user typed', 'Always a float'], a: 0, mis: { 2: 'Even if the user types 25, input() returns the text "25". You must convert it.' }, ex: 'input() always returns a string. Use int() or float() to turn it into a number.' },
        { id: 'u5-03-q31', c: 'input', t: 'mcq', d: 2, q: 'The first line stands for what <code>input()</code> gives when the user types 14. What is the output?', code: `age = "14"
print(age + "1")`, o: ['141', '15', '14 1', '14'], a: 0, mis: { 1: 'Both values are strings, so + joins them instead of adding.' }, ex: 'age is the string "14". Joining it with "1" gives "141". Convert with int() to add numbers.' },
        { id: 'u5-03-q32', c: 'input', t: 'mcq', d: 3, q: 'Diya runs this and types 14. Which line causes an error, and why?', code: `age = input("Enter age: ")
next_year = age + 1`, o: ['Line 2: age is a string, so the number 1 cannot be added to it', 'Line 1: input() needs a number inside its brackets', 'Line 2: next_year is not a valid variable name', 'No line: next_year becomes 15'], a: 0, mis: { 3: 'input() returns the text "14", and Python cannot add text and a number, so you get a TypeError.' }, ex: 'age holds the string "14". "14" + 1 mixes str and int, giving a TypeError. Use age = int(input("Enter age: ")).' },
        { id: 'u5-03-q33', c: 'input', t: 'mcq', d: 2, q: 'What is the output?', code: `n = int("25")
print(n * 2)`, o: ['50', '2525', '25 2', '52'], a: 0, mis: { 1: '2525 is what "25" * 2 gives for a string. int() turned it into the number 25 first.' }, ex: 'int("25") converts the text to the number 25, and 25 * 2 = 50.' },
        { id: 'u5-03-q34', c: 'input', t: 'mcq', d: 2, q: 'What is the output?', code: `p = float("4.5")
print(p * 2)`, o: ['9.0', '9', '4.54.5', '8'], a: 0, mis: { 1: 'p is a float, so the answer is a float too: 9.0.' }, ex: 'float("4.5") is the number 4.5; 4.5 * 2 = 9.0.' },
        { id: 'u5-03-q35', c: 'input', t: 'mcq', d: 3, q: 'Which line correctly reads a price such as 99.50 typed by the user, as a number?', o: ['price = float(input("Price: "))', 'price = int(input("Price: "))', 'price = input(float("Price: "))', 'price = float(input)("Price: ")'], a: 0, mis: { 1: 'int("99.50") gives a ValueError, because int() cannot read a decimal point.', 2: 'The conversion must wrap the input(), not the prompt text.' }, ex: 'input() gets the text and float() turns it into a decimal number. int() would fail on a decimal.' },
        { id: 'u5-03-q36', c: 'input', t: 'multi', d: 2, q: 'Select all that apply. Which conversions work without an error?', o: ['int("42")', 'float("3.5")', 'str(100)', 'int("3.5")', 'int("forty")'], a: [0, 1, 2], ex: 'int() needs whole-number text; "3.5" and "forty" cause a ValueError. float("3.5") and str(100) work fine.' },
        { id: 'u5-03-q37', c: 'input', t: 'mcq', d: 3, q: 'What is the output?', code: `marks = 92
print("You scored " + str(marks))`, o: ['You scored 92', 'You scored92', 'You scored + 92', 'You scored 92.0'], a: 0, mis: { 1: 'The space is inside the first string "You scored ", so it is kept.', 3: 'str(92) gives "92"; marks is an int, so no .0 appears.' }, ex: 'str(marks) turns 92 into "92", so the two strings can be joined with +.' },
        { id: 'u5-03-q38', c: 'input', t: 'order', d: 2, q: 'Put these lines in order to make a program that finds the area of a square.', items: ['side = int(input("Side: "))', 'area = side * side', 'print("Area =", area)'], ex: 'Input → Process → Output: read the side, calculate the area, then display it.' }
      ],
      gens: ['py-output-arith', 'py-type']
    },
    // ═══════════════════════════════════ u5-04 ═══════════════════════════════════
    {
      id: 'u5-04',
      title: 'Decisions with if, elif, else',
      minutes: 90,
      outcomes: [
        'Use conditional statements (if, if-else, if-elif-else) to control the flow of a program',
        'Write correctly indented blocks of code',
        'Solve simple problems such as voting eligibility and grading using conditions'
      ],
      hook: 'Traffic signals, exam results and UPI PIN checks all make decisions. Now your programs can decide too.',
      concepts: {
        'cond': 'Conditions (True/False tests)',
        'ifelse': 'if and if-else',
        'elif': 'if-elif-else chains',
        'indent': 'Colons and indentation'
      },
      steps: [
        {
          kind: 'card',
          title: 'Programs that decide',
          html: `<p>Until now, every line of a program ran. With <code>if</code>, some lines run <b>only when a condition is True</b>.</p>
<pre class="code">temperature = 38
if temperature &gt; 35:
    print("It is hot. Drink water!")
print("Have a good day")</pre>
<p>Output:</p>
<pre class="code">It is hot. Drink water!
Have a good day</pre>
<p>If <code>temperature</code> were 30, the condition would be False and only <code>Have a good day</code> would be printed.</p>
<div class="def"><dfn>Condition</dfn> An expression that is either True or False, usually a comparison like <code>temperature &gt; 35</code>.</div>`
        },
        {
          kind: 'card',
          title: 'Colon and indentation',
          html: `<p>Python needs two things to know which lines belong to an <code>if</code>:</p>
<ul><li>a <b>colon</b> <code>:</code> at the end of the <code>if</code> line;</li>
<li><b>indentation</b>: the lines inside are pushed right by the same amount (usually 4 spaces). Together they form a <b>block</b>.</li></ul>
<pre class="code">marks = 25
if marks &lt; 33:
    print("Below pass marks")
    print("Let's practise more")
print("Report printed")</pre>
<p>Both indented lines belong to the <code>if</code>. The last line is not indented, so it always runs.</p>
<div class="warn"><b>Careful</b> Forgetting the colon gives a SyntaxError. Forgetting to indent the block gives an IndentationError. Many languages use brackets for blocks; Python uses indentation.</div>`
        },
        { kind: 'check', concepts: ['cond', 'indent'], n: 2 },
        {
          kind: 'card',
          title: 'Two paths: if and else',
          html: `<p><code>else</code> gives the program something to do when the condition is False. Exactly one of the two blocks runs.</p>
<pre class="code">n = 7
if n % 2 == 0:
    print(n, "is even")
else:
    print(n, "is odd")</pre>
<p>Output: <code>7 is odd</code></p>
<ol class="flow"><li><b>Test</b><span>Is <code>n % 2 == 0</code>? 7 % 2 is 1, so False.</span></li><li><b>Skip</b><span>The if block is skipped.</span></li><li><b>Else</b><span>The else block runs.</span></li></ol>
<div class="key"><b>Key idea</b> <code>else</code> has no condition of its own and ends with a colon. It lines up exactly under its <code>if</code>.</div>`
        },
        { kind: 'code', ex: 'py-even-odd' },
        { kind: 'code', ex: 'py-vote' },
        { kind: 'check', concepts: ['ifelse'], n: 2 },
        {
          kind: 'card',
          title: 'Combining conditions',
          html: `<p>Use <code>and</code>, <code>or</code> and <code>not</code> to build richer conditions.</p>
<pre class="code">marks = 45
attendance = 80
if marks &gt;= 33 and attendance &gt;= 75:
    print("Promoted")
else:
    print("Please meet the teacher")</pre>
<p>Output: <code>Promoted</code>, because both parts are True.</p>
<pre class="code">day = "Sunday"
if day == "Saturday" or day == "Sunday":
    print("Weekend!")</pre>
<div class="warn"><b>Careful</b> Write the full comparison on both sides of <code>or</code>. <code>day == "Saturday" or "Sunday"</code> does not do what you expect.</div>`
        },
        {
          kind: 'card',
          title: 'Many paths: elif',
          html: `<p>When there are more than two possibilities, use <code>elif</code> (short for “else if”).</p>
<pre class="code">num = -4
if num &gt; 0:
    print("The number is positive")
elif num &lt; 0:
    print("The number is negative")
else:
    print("The number is zero")</pre>
<p>Output: <code>The number is negative</code></p>
<p>Python checks the conditions from top to bottom. As soon as one is True, it runs that block and <b>skips all the rest</b>. The <code>else</code> at the end catches everything else. You can have as many <code>elif</code> lines as you need.</p>
<div class="key"><b>Key idea</b> In an if-elif-else chain, exactly one block runs: the first one whose condition is True (or else).</div>`
        },
        {
          kind: 'card',
          title: 'The order of elif matters',
          html: `<p>Grade bands: 90+ A, 75+ B, 60+ C, 40+ D, below 40 E. Check the <b>highest band first</b>:</p>
<pre class="code">marks = 82
if marks &gt;= 90:
    print("Grade: A")
elif marks &gt;= 75:
    print("Grade: B")
elif marks &gt;= 60:
    print("Grade: C")
elif marks &gt;= 40:
    print("Grade: D")
else:
    print("Grade: E")</pre>
<p>Output: <code>Grade: B</code>. We do not need <code>marks &lt; 90</code> in the second test, because we only reach it when the first test failed.</p>
<div class="warn"><b>Careful</b> If you test <code>marks &gt;= 40</code> first, a student with 95 gets D, because that is the first True condition.</div>`
        },
        { kind: 'check', concepts: ['elif'], n: 3 },
        { kind: 'code', ex: 'py-sign' },
        { kind: 'code', ex: 'py-bigger' },
        { kind: 'code', ex: 'py-grade' },
        {
          kind: 'card',
          title: 'Test every path',
          html: `<p>A decision program is only correct if <b>every branch</b> works. Choose test values carefully:</p>
<table class="tbl"><thead><tr><th>Program</th><th>Test values</th><th>Why</th></tr></thead><tbody>
<tr><td>Voting (18+)</td><td>25, 12, <b>18</b></td><td>yes, no, and the exact boundary</td></tr>
<tr><td>Positive/negative/zero</td><td>7, −3, <b>0</b></td><td>one value per branch</td></tr>
<tr><td>Grades</td><td>95, 80, 65, 50, 20, and <b>90</b>, <b>75</b></td><td>every band plus boundaries</td></tr></tbody></table>
<p>Boundary values catch the most common bug: writing <code>&gt;</code> when you meant <code>&gt;=</code>. With <code>age &gt; 18</code>, an 18-year-old is wrongly told they cannot vote.</p>
<div class="key"><b>Key idea</b> Test each branch once, and test the exact boundary values.</div>`
        },
        {
          kind: 'card',
          title: 'Common if mistakes',
          html: `<table class="tbl"><thead><tr><th>Mistake</th><th>What happens</th><th>Fix</th></tr></thead><tbody>
<tr><td><code>if age = 18:</code></td><td>SyntaxError</td><td><code>if age == 18:</code></td></tr>
<tr><td><code>if age &gt;= 18</code> (no colon)</td><td>SyntaxError</td><td>add <code>:</code></td></tr>
<tr><td>block not indented</td><td>IndentationError</td><td>indent with 4 spaces</td></tr>
<tr><td><code>age = input(...)</code> then <code>age &gt;= 18</code></td><td>TypeError (str vs int)</td><td><code>int(input(...))</code></td></tr>
<tr><td><code>else marks &gt; 40:</code></td><td>SyntaxError</td><td>use <code>elif</code>; else has no condition</td></tr>
<tr><td><code>"Red" == "red"</code></td><td>False (case matters)</td><td>type the exact text</td></tr></tbody></table>
<div class="key"><b>Key idea</b> Most if-errors come from a missing colon, wrong indentation, = instead of ==, or forgetting to convert input().</div>`
        },
        { kind: 'check', concepts: ['cond', 'indent', 'ifelse'], n: 3 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // cond
        { id: 'u5-04-q01', c: 'cond', t: 'mcq', d: 1, q: 'The condition in an <code>if</code> statement must work out to…', o: ['True or False', 'a whole number', 'a piece of text', 'a list of values'], a: 0, ex: 'An if tests a condition, a Boolean expression that is either True or False.' },
        { id: 'u5-04-q02', c: 'cond', t: 'mcq', d: 2, q: 'What is the output?', code: `temp = 38
if temp > 35:
    print("Hot day")
print("Done")`, o: ['Hot day\nDone', 'Done', 'Hot day', 'Done\nHot day'], a: 0, mis: { 2: 'print("Done") is not indented, so it runs whatever the condition is.' }, ex: '38 > 35 is True, so "Hot day" is printed; the unindented line always runs afterwards.' },
        { id: 'u5-04-q03', c: 'cond', t: 'mcq', d: 2, q: 'What is the output?', code: `temp = 30
if temp > 35:
    print("Hot day")
print("Done")`, o: ['Done', 'Hot day\nDone', 'Hot day', 'Done\nDone'], a: 0, mis: { 1: '30 > 35 is False, so the indented block is skipped.' }, ex: 'The condition is False, so only the unindented line runs.' },
        { id: 'u5-04-q04', c: 'cond', t: 'mcq', d: 3, q: 'What is the output?', code: `marks = 45
attendance = 70
if marks >= 33 and attendance >= 75:
    print("Promoted")
else:
    print("Meet the teacher")`, o: ['Meet the teacher', 'Promoted', 'Promoted\nMeet the teacher', 'False'], a: 0, mis: { 1: 'and needs BOTH parts True. attendance >= 75 is False here.' }, ex: 'marks >= 33 is True but attendance >= 75 is False, so the and-condition is False and the else block runs.' },
        { id: 'u5-04-q05', c: 'cond', t: 'tf', d: 2, q: '<code>if x = 5:</code> is a correct way to check whether x equals 5.', a: false, ex: 'A single = is assignment and causes a SyntaxError here. Comparing uses ==: if x == 5:' },
        { id: 'u5-04-q06', c: 'cond', t: 'mcq', d: 2, q: 'What is the output?', code: `day = "Sunday"
if day == "Saturday" or day == "Sunday":
    print("Weekend")
else:
    print("School day")`, o: ['Weekend', 'School day', 'Weekend\nSchool day', 'Sunday'], a: 0, mis: { 1: 'or needs only one part True, and day == "Sunday" is True.' }, ex: 'day == "Sunday" is True, so the or-condition is True and "Weekend" is printed.' },
        { id: 'u5-04-q07', c: 'cond', t: 'multi', d: 2, q: 'Select all that apply. When <code>age = 16</code>, which conditions are True?', o: ['age > 10', 'age >= 16', 'age == 16 and age < 18', 'age > 18 or age < 13', 'not age > 10'], a: [0, 1, 2], ex: '16 > 10, 16 >= 16 and (16 == 16 and 16 < 18) are True. 16 is neither above 18 nor below 13, and not (16 > 10) is False.' },
        // ifelse
        { id: 'u5-04-q08', c: 'ifelse', t: 'mcq', d: 1, q: 'When does the <code>else</code> block run?', o: ['When the if condition is False', 'Always, after the if block', 'When the if condition is True', 'Never, unless there is an elif'], a: 0, ex: 'else runs only when the if condition is False. Exactly one of the two blocks runs.' },
        { id: 'u5-04-q09', c: 'ifelse', t: 'mcq', d: 2, q: 'What is the output?', code: `n = 7
if n % 2 == 0:
    print("Even")
else:
    print("Odd")`, o: ['Odd', 'Even', 'Even\nOdd', '1'], a: 0, mis: { 1: '7 % 2 is 1, not 0, so the if condition is False.' }, ex: '7 % 2 = 1, so n % 2 == 0 is False and the else block prints Odd.' },
        { id: 'u5-04-q10', c: 'ifelse', t: 'mcq', d: 2, q: 'What is the output?', code: `age = 18
if age >= 18:
    print("Can vote")
else:
    print("Cannot vote")`, o: ['Can vote', 'Cannot vote', 'Can vote\nCannot vote', 'True'], a: 0, mis: { 1: '>= includes 18 itself, so the condition is True.' }, ex: '18 >= 18 is True, so the if block runs.' },
        { id: 'u5-04-q11', c: 'ifelse', t: 'mcq', d: 3, q: 'Rohan wrote a voting check with a small mistake. What is the output for an 18-year-old?', code: `age = 18
if age > 18:
    print("Can vote")
else:
    print("Cannot vote")`, o: ['Cannot vote', 'Can vote', 'Can vote\nCannot vote', 'False'], a: 0, mis: { 1: '18 > 18 is False, because > does not include the boundary. He should use >=.' }, ex: '18 > 18 is False, so the else block runs and wrongly says Cannot vote. Using >= fixes this boundary bug.' },
        { id: 'u5-04-q12', c: 'ifelse', t: 'tf', d: 1, q: 'In an if-else statement, exactly one of the two blocks runs.', a: true, ex: 'If the condition is True the if block runs; otherwise the else block runs. Never both, never neither.' },
        { id: 'u5-04-q13', c: 'ifelse', t: 'mcq', d: 3, q: 'Kabir runs this and types 20. What goes wrong?', code: `age = input("Age: ")
if age >= 18:
    print("Can vote")`, o: ['TypeError: the string from input() cannot be compared with the number 18', 'Nothing: it shows Can vote', 'SyntaxError: the colon is in the wrong place', 'It shows Can vote twice'], a: 0, mis: { 1: 'input() returns the text "20". Python cannot use >= between text and a number.' }, ex: 'input() returns a string, and comparing "20" >= 18 is a TypeError. Use age = int(input("Age: ")).' },
        { id: 'u5-04-q14', c: 'ifelse', t: 'order', d: 2, q: 'Put these lines in order to make an even/odd program.', items: ['n = int(input("Number: "))', 'if n % 2 == 0:', '    print("Even")', 'else:', '    print("Odd")'], ex: 'Read the number first, test it with if, put the Even message inside the if, then else and its Odd message.' },
        // elif
        { id: 'u5-04-q15', c: 'elif', t: 'mcq', d: 1, q: 'What does <code>elif</code> mean?', o: ['“else if”: check another condition when the earlier ones were False', '“end if”: stop the if statement', 'Run this block whether or not the condition is True', 'Repeat the if block again'], a: 0, ex: 'elif means “else if”. It is checked only when all conditions above it were False.' },
        { id: 'u5-04-q16', c: 'elif', t: 'mcq', d: 2, q: 'What is the output?', code: `marks = 82
if marks >= 90:
    print("A")
elif marks >= 75:
    print("B")
elif marks >= 60:
    print("C")
else:
    print("D")`, o: ['B', 'C', 'B\nC', 'A'], a: 0, mis: { 2: 'Once a condition is True, Python skips the rest of the chain, even if later conditions are also True.' }, ex: '82 >= 90 is False; 82 >= 75 is True, so B is printed and the rest is skipped.' },
        { id: 'u5-04-q17', c: 'elif', t: 'mcq', d: 3, q: 'The bands are in the wrong order. What is the output?', code: `marks = 95
if marks >= 40:
    print("D")
elif marks >= 90:
    print("A")`, o: ['D', 'A', 'D\nA', 'A\nD'], a: 0, mis: { 1: 'Python stops at the FIRST True condition. 95 >= 40 is True, so it never reaches the A test.' }, ex: '95 >= 40 is True, so D is printed and the elif is skipped. Always check the highest band first.' },
        { id: 'u5-04-q18', c: 'elif', t: 'mcq', d: 2, q: 'What is the output?', code: `n = -4
if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")`, o: ['Negative', 'Positive', 'Zero', 'Negative\nZero'], a: 0, mis: { 3: 'else runs only when all conditions above were False; here n < 0 was True.' }, ex: '-4 > 0 is False; -4 < 0 is True, so Negative is printed.' },
        { id: 'u5-04-q19', c: 'elif', t: 'mcq', d: 2, q: 'What is the output?', code: `n = 0
if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")`, o: ['Zero', 'Positive', 'Negative', 'Positive\nZero'], a: 0, mis: { 1: '0 > 0 is False, because 0 is not greater than itself.' }, ex: '0 is neither greater nor less than 0, so both tests are False and the else block runs.' },
        { id: 'u5-04-q20', c: 'elif', t: 'tf', d: 2, q: 'In an if-elif-else chain, Python runs every block whose condition is True.', a: false, ex: 'Only the first block whose condition is True runs. The rest of the chain is skipped.' },
        { id: 'u5-04-q21', c: 'elif', t: 'bins', d: 3, q: 'For this traffic-signal program, sort each value of <code>light</code> by what is printed.', code: `if light == "red":
    print("Stop")
elif light == "yellow":
    print("Slow down")
else:
    print("Go")`, bins: ['Stop', 'Slow down', 'Go'], items: [['"red"', 0], ['"yellow"', 1], ['"green"', 2], ['"Red"', 2], ['"blue"', 2]], ex: 'Comparisons are case-sensitive, so "Red" is not equal to "red" and falls through to else, as does any other value such as "blue". This is a bug worth fixing.' },
        { id: 'u5-04-q22', c: 'elif', t: 'match', d: 3, q: 'Bands: 90+ A, 75+ B, 60+ C, 40+ D, below 40 E. Match each mark to its grade.', pairs: [['93', 'A'], ['75', 'B'], ['60', 'C'], ['59', 'D'], ['12', 'E']], ex: 'Boundaries belong to the higher band because the tests use >=: 75 is B and 60 is C, while 59 is just below C, so D.' },
        // indent
        { id: 'u5-04-q23', c: 'indent', t: 'mcq', d: 1, q: 'Which symbol must end an <code>if</code> line?', o: [':', ';', '.', ','], a: 0, ex: 'if, elif and else lines end with a colon, which tells Python that a block follows.' },
        { id: 'u5-04-q24', c: 'indent', t: 'mcq', d: 2, q: 'What is the output?', code: `x = 5
if x > 10:
    print("Big")
    print("Really big")
print("End")`, o: ['End', 'Really big\nEnd', 'Big\nReally big\nEnd', 'Big\nEnd'], a: 0, mis: { 1: 'Both indented lines belong to the if block, so both are skipped.' }, ex: 'x > 10 is False, so the whole indented block (both lines) is skipped. Only End is printed.' },
        { id: 'u5-04-q25', c: 'indent', t: 'mcq', d: 3, q: 'What is the output?', code: `x = 5
if x > 10:
    print("Big")
print("Really big")
print("End")`, o: ['Really big\nEnd', 'End', 'Big\nReally big\nEnd', 'Big\nEnd'], a: 0, mis: { 1: 'print("Really big") is not indented, so it is outside the if and always runs.' }, ex: 'Only print("Big") is inside the if. The other two lines are not indented, so they always run.' },
        { id: 'u5-04-q26', c: 'indent', t: 'mcq', d: 2, q: 'Which line causes an error, and why?', code: `marks = 50
if marks >= 33:
pass_msg = "Pass"`, o: ['Line 3: it must be indented to belong to the if block', 'Line 1: 50 must be in quotes', 'Line 2: >= is not a Python operator', 'Line 3: pass_msg is not a valid name'], a: 0, mis: { 2: '>= is a valid comparison operator meaning “greater than or equal to”.' }, ex: 'After a line ending in a colon, Python expects an indented block. Line 3 is not indented, so you get an IndentationError.' },
        { id: 'u5-04-q27', c: 'indent', t: 'multi', d: 2, q: 'Select all that apply. Which are rules for if blocks in Python?', o: ['The if line ends with a colon', 'Lines inside the block are indented by the same amount', 'The first unindented line after the block is outside the if', 'else must have its own condition', 'Indentation is optional in Python'], a: [0, 1, 2], ex: 'Colon + consistent indentation define the block. else never has a condition, and indentation is required in Python.' },
        { id: 'u5-04-q28', c: 'indent', t: 'tf', d: 2, q: 'Python uses indentation (spaces at the start of a line) to decide which lines belong to an if block.', a: true, ex: 'Unlike many languages that use brackets, Python uses indentation to group lines into blocks.' }
      ],
      gens: ['py-output-cond']
    },
    // ═══════════════════════════════════ u5-05 ═══════════════════════════════════
    {
      id: 'u5-05',
      title: 'Loops with for and while',
      minutes: 100,
      outcomes: [
        'Use iterative statements (for with range(), and while) to repeat instructions',
        'Use loop counters and running totals to solve problems such as sums and tables'
      ],
      hook: 'Printing the numbers 1 to 1000 by hand would take an hour. A loop does it in two lines.',
      concepts: {
        'range': 'range(start, stop, step)',
        'for': 'for loops',
        'while': 'while loops',
        'accum': 'Counters and running totals'
      },
      steps: [
        {
          kind: 'card',
          title: 'Why loops?',
          html: `<p>Suppose you want to print a message 5 times. You could copy the line five times… or use a <b>loop</b>.</p>
<pre class="code">for i in range(5):
    print("Practice makes perfect")</pre>
<p>Output: the message 5 times, each on a new line.</p>
<ul><li><code>for</code> starts the loop and the line ends with a colon.</li>
<li><code>i</code> is the <b>loop variable</b>: it takes a new value on each round.</li>
<li>The indented lines are the <b>body</b>; they repeat on every round.</li></ul>
<div class="def"><dfn>Iteration</dfn> One round of a loop. Loops are also called iterative statements.</div>
<div class="key"><b>Key idea</b> A loop repeats a block of code, so you write it once and Python runs it many times.</div>`
        },
        {
          kind: 'card',
          title: 'range(): counting with a stop',
          html: `<p><code>range()</code> produces a sequence of whole numbers for a <code>for</code> loop.</p>
<table class="tbl"><thead><tr><th>Code</th><th>Numbers produced</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5</td></tr>
<tr><td><code>range(3, 8)</code></td><td>3, 4, 5, 6, 7</td></tr></tbody></table>
<pre class="code">for i in range(1, 4):
    print(i)</pre>
<p>Output: <code>1</code>, <code>2</code>, <code>3</code> on separate lines.</p>
<div class="warn"><b>Careful</b> range starts at 0 if you give only one number, and it <b>stops before</b> the stop value. To include 10, the stop must be 11: <code>range(1, 11)</code>.</div>`
        },
        {
          kind: 'card',
          title: 'range() with a step',
          html: `<p>A third number, the <b>step</b>, sets how much to jump each time: <code>range(start, stop, step)</code>.</p>
<table class="tbl"><thead><tr><th>Code</th><th>Numbers produced</th></tr></thead><tbody>
<tr><td><code>range(2, 11, 2)</code></td><td>2, 4, 6, 8, 10</td></tr>
<tr><td><code>range(1, 10, 2)</code></td><td>1, 3, 5, 7, 9</td></tr>
<tr><td><code>range(0, 50, 10)</code></td><td>0, 10, 20, 30, 40</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1</td></tr></tbody></table>
<p>A negative step counts down. The stop value is still never included.</p>
<div class="key"><b>Key idea</b> start is included, stop is excluded, step is the jump. Check the last number your loop needs and set stop one step beyond it.</div>`
        },
        { kind: 'code', ex: 'py-natural-10' },
        { kind: 'code', ex: 'py-even-10' },
        { kind: 'check', concepts: ['range'], n: 3 },
        {
          kind: 'card',
          title: 'Using the loop variable',
          html: `<p>The loop variable holds the current number, so the body can use it in calculations.</p>
<pre class="code">for i in range(1, 6):
    print(i, "squared is", i * i)</pre>
<p>Output:</p>
<pre class="code">1 squared is 1
2 squared is 4
3 squared is 9
4 squared is 16
5 squared is 25</pre>
<p>The stop value can also be a variable, for example a number the user typed:</p>
<pre class="code">n = int(input("How many? "))
for i in range(1, n + 1):
    print(i)</pre>
<p>Notice <code>n + 1</code>: it makes the loop include <code>n</code> itself.</p>`
        },
        { kind: 'code', ex: 'py-odd-to-n' },
        { kind: 'code', ex: 'py-table-n' },
        {
          kind: 'card',
          title: 'while loops',
          html: `<p>A <code>while</code> loop repeats <b>as long as its condition is True</b>.</p>
<pre class="code">count = 1
while count &lt;= 5:
    print(count)
    count += 1
print("Finished")</pre>
<ol class="flow"><li><b>Check</b><span>Is <code>count &lt;= 5</code>? If False, leave the loop.</span></li><li><b>Run</b><span>Print count, then add 1 to it.</span></li><li><b>Repeat</b><span>Go back and check again.</span></li></ol>
<p>Output: 1 to 5, then <code>Finished</code>.</p>
<div class="warn"><b>Careful</b> Something inside the loop must change the condition. If you forget <code>count += 1</code>, count stays 1 forever: an <b>infinite loop</b>. Our editor stops a program that runs for too long.</div>`
        },
        {
          kind: 'card',
          title: 'for or while?',
          html: `<div class="cols"><div class="mini"><h4>🔢 for</h4><p>Use when you know <b>how many times</b> to repeat, or you are going through a sequence: tables, 1 to 100, every student in a list.</p></div>
<div class="mini"><h4>🔁 while</h4><p>Use when you repeat <b>until something happens</b>: until the robot reaches the goal, until the password is correct, until the savings reach a target.</p></div></div>
<pre class="code">savings = 0
weeks = 0
while savings &lt; 500:
    savings += 120
    weeks += 1
print("Weeks needed:", weeks)</pre>
<p>Output: <code>Weeks needed: 5</code>. You did not know the number of rounds in advance, so <code>while</code> fits.</p>
<div class="key"><b>Key idea</b> Many problems can use either loop; choose the one that makes the code clearest.</div>`
        },
        { kind: 'code', ex: 'py-countdown' },
        { kind: 'check', concepts: ['for', 'while'], n: 3 },
        {
          kind: 'card',
          title: 'Counters and running totals',
          html: `<p>To add up numbers with a loop, keep a <b>running total</b>:</p>
<pre class="code">total = 0
for i in range(1, 6):
    total += i
print("Sum =", total)</pre>
<table class="tbl"><thead><tr><th>i</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>total after</td><td>1</td><td>3</td><td>6</td><td>10</td><td>15</td></tr></tbody></table>
<p>Output: <code>Sum = 15</code></p>
<p>A <b>counter</b> works the same way but adds 1 each time something happens:</p>
<pre class="code">count = 0
for i in range(1, 21):
    if i % 3 == 0:
        count += 1
print(count)   # 6 multiples of 3</pre>
<div class="key"><b>Key idea</b> Set the total or counter <b>before</b> the loop, update it <b>inside</b>, and print it <b>after</b>.</div>`
        },
        {
          kind: 'card',
          title: 'Common loop bugs',
          html: `<table class="tbl"><thead><tr><th>Bug</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td>Off by one</td><td><code>range(1, 10)</code> to print 1–10</td><td>10 is missing</td></tr>
<tr><td>Total reset inside the loop</td><td><code>total = 0</code> indented in the body</td><td>only the last number is kept</td></tr>
<tr><td>Print indented by mistake</td><td><code>print(total)</code> inside the loop</td><td>prints every step, not just the answer</td></tr>
<tr><td>while never ends</td><td>forgot <code>i += 1</code></td><td>infinite loop</td></tr>
<tr><td>Missing colon</td><td><code>for i in range(5)</code></td><td>SyntaxError</td></tr></tbody></table>
<div class="key"><b>Key idea</b> If a loop gives a wrong answer, trace it: write down the variable values for the first two or three rounds and the last round.</div>`
        },
        { kind: 'code', ex: 'py-sum-10' },
        { kind: 'check', concepts: ['accum'], n: 2 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // range
        { id: 'u5-05-q01', c: 'range', t: 'mcq', d: 1, q: 'Which numbers does <code>range(5)</code> produce?', o: ['0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'], a: 0, mis: { 1: 'With one number, range starts at 0, not 1.', 2: 'The stop value 5 is never included.' }, ex: 'range(5) starts at 0 and stops before 5, giving five numbers: 0, 1, 2, 3, 4.' },
        { id: 'u5-05-q02', c: 'range', t: 'mcq', d: 1, q: 'What is the output?', code: `for i in range(1, 4):
    print(i)`, o: ['1\n2\n3', '1\n2\n3\n4', '0\n1\n2\n3', '1 2 3'], a: 0, mis: { 1: 'The stop value 4 is not included.', 3: 'Each print() starts a new line, so the numbers are on separate lines.' }, ex: 'range(1, 4) gives 1, 2, 3, each printed on its own line.' },
        { id: 'u5-05-q03', c: 'range', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(2, 11, 2):
    print(i)`, o: ['2\n4\n6\n8\n10', '2\n4\n6\n8', '0\n2\n4\n6\n8\n10', '2\n4\n6\n8\n10\n12'], a: 0, mis: { 1: '10 is less than the stop value 11, so it is included.', 3: '12 is past the stop value 11, so it is not produced.' }, ex: 'Start at 2 and jump by 2 while below 11: 2, 4, 6, 8, 10.' },
        { id: 'u5-05-q04', c: 'range', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(5, 0, -1):
    print(i)`, o: ['5\n4\n3\n2\n1', '5\n4\n3\n2\n1\n0', '1\n2\n3\n4\n5', '4\n3\n2\n1\n0'], a: 0, mis: { 1: 'The stop value 0 is never included, even when counting down.' }, ex: 'A step of -1 counts down from 5 and stops before 0: 5, 4, 3, 2, 1.' },
        { id: 'u5-05-q05', c: 'range', t: 'mcq', d: 3, q: 'Which range gives exactly 1, 3, 5, 7, 9?', o: ['range(1, 10, 2)', 'range(1, 9, 2)', 'range(0, 10, 2)', 'range(1, 10)'], a: 0, mis: { 1: 'Stopping at 9 means 9 itself is left out: 1, 3, 5, 7.', 2: 'Starting at 0 with step 2 gives the even numbers 0 to 8.' }, ex: 'Start at 1, step 2, and stop past 9: range(1, 10, 2) gives 1, 3, 5, 7, 9.' },
        { id: 'u5-05-q06', c: 'range', t: 'num', d: 2, q: 'How many times does the body of this loop run?', code: `for i in range(3, 15):
    print("Hi")`, a: 12, ex: 'range(3, 15) gives 3 up to 14. That is 15 − 3 = 12 numbers, so the body runs 12 times.' },
        { id: 'u5-05-q07', c: 'range', t: 'tf', d: 2, q: '<code>range(1, 10)</code> includes the number 10.', a: false, ex: 'The stop value is never included. range(1, 10) gives 1 to 9; use range(1, 11) to include 10.' },
        { id: 'u5-05-q08', c: 'range', t: 'match', d: 2, q: 'Match each range to the numbers it produces.', pairs: [['range(4)', '0, 1, 2, 3'], ['range(1, 5)', '1, 2, 3, 4'], ['range(0, 10, 3)', '0, 3, 6, 9'], ['range(4, 0, -1)', '4, 3, 2, 1']], ex: 'Start is included (0 if missing), stop is excluded, and step is the jump (1 if missing).' },
        // for
        { id: 'u5-05-q09', c: 'for', t: 'mcq', d: 1, q: 'What is the output?', code: `for i in range(3):
    print("Hi")`, o: ['Hi\nHi\nHi', 'Hi', 'Hi\nHi', 'Hi Hi Hi'], a: 0, mis: { 2: 'range(3) gives three values (0, 1, 2), so the body runs three times.' }, ex: 'The body runs once for each of 0, 1, 2: three times, each print on a new line.' },
        { id: 'u5-05-q10', c: 'for', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(1, 4):
    print(i * 5)`, o: ['5\n10\n15', '5\n10\n15\n20', '0\n5\n10', '15'], a: 0, mis: { 1: 'The stop value 4 is excluded, so i is only 1, 2, 3.', 2: 'This range starts at 1, not 0.' }, ex: 'i takes 1, 2, 3, so the loop prints 5, 10, 15.' },
        { id: 'u5-05-q11', c: 'for', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(3):
    print(i)
print("Done")`, o: ['0\n1\n2\nDone', '0\nDone\n1\nDone\n2\nDone', '1\n2\n3\nDone', 'Done'], a: 0, mis: { 1: 'print("Done") is not indented, so it runs once after the loop.' }, ex: 'The loop prints 0, 1, 2. The unindented print runs once, after the loop finishes.' },
        { id: 'u5-05-q12', c: 'for', t: 'mcq', d: 3, q: 'What is the output?', code: `for i in range(3):
    print(i)
    print("Done")`, o: ['0\nDone\n1\nDone\n2\nDone', '0\n1\n2\nDone', '0\n1\n2\nDone\nDone\nDone', 'Done\n0\nDone\n1\nDone\n2'], a: 0, mis: { 1: 'print("Done") is indented, so it is part of the loop body and runs every round.' }, ex: 'Both prints are inside the loop, so each round prints the number and then Done.' },
        { id: 'u5-05-q13', c: 'for', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(1, 4):
    print(i, "x 7 =", i * 7)`, o: ['1 x 7 = 7\n2 x 7 = 14\n3 x 7 = 21', '1 x 7 = 7\n2 x 7 = 14\n3 x 7 = 21\n4 x 7 = 28', '0 x 7 = 0\n1 x 7 = 7\n2 x 7 = 14', '7\n14\n21'], a: 0, mis: { 1: 'range(1, 4) stops before 4.', 2: 'This range starts at 1, not 0.' }, ex: 'For i = 1, 2, 3 each line shows i, the text, and i × 7.' },
        { id: 'u5-05-q14', c: 'for', t: 'multi', d: 2, q: 'Select all that apply. For the loop <code>for n in range(1, 6):</code>…', o: ['the body runs 5 times', 'n is 1 in the first round', 'n is 5 in the last round', 'n is 6 in the last round', 'the loop runs forever'], a: [0, 1, 2], ex: 'range(1, 6) gives 1, 2, 3, 4, 5: five rounds, from 1 to 5. A for loop over a range always ends.' },
        { id: 'u5-05-q15', c: 'for', t: 'order', d: 2, q: 'Put these lines in order so the program prints a title, the table of 3, and then Finished.', items: ['n = 3', 'print("Table of", n)', 'for i in range(1, 11):', '    print(n, "x", i, "=", n * i)', 'print("Finished")'], ex: 'Create n first, print the title, loop with the indented table line inside, and put the final print after the loop.' },
        // while
        { id: 'u5-05-q16', c: 'while', t: 'mcq', d: 1, q: 'A <code>while</code> loop repeats…', o: ['as long as its condition is True', 'exactly 10 times', 'until its condition becomes True', 'only once'], a: 0, mis: { 2: 'It is the other way round: it keeps going while the condition is True and stops when it becomes False.' }, ex: 'Before each round the condition is checked; the loop continues while it is True.' },
        { id: 'u5-05-q17', c: 'while', t: 'mcq', d: 2, q: 'What is the output?', code: `count = 1
while count <= 3:
    print(count)
    count += 1`, o: ['1\n2\n3', '1\n2\n3\n4', '0\n1\n2', '1\n2'], a: 0, mis: { 1: 'When count becomes 4, 4 <= 3 is False, so the loop stops before printing it.' }, ex: 'count is printed as 1, 2, 3. When it becomes 4 the condition is False and the loop ends.' },
        { id: 'u5-05-q18', c: 'while', t: 'mcq', d: 3, q: 'What goes wrong with this loop?', code: `n = 1
while n <= 5:
    print(n)`, o: ['n never changes, so the condition stays True and the loop never ends', 'It shows 1 to 5 correctly', 'It shows nothing because n starts at 1', 'It gives a SyntaxError'], a: 0, mis: { 1: 'Nothing inside the loop changes n, so n <= 5 is always True.' }, ex: 'This is an infinite loop: it prints 1 again and again. Adding n += 1 inside the loop fixes it.' },
        { id: 'u5-05-q19', c: 'while', t: 'mcq', d: 2, q: 'What is the output?', code: `n = 10
while n > 0:
    print(n)
    n -= 3`, o: ['10\n7\n4\n1', '10\n7\n4\n1\n-2', '10\n7\n4', '7\n4\n1'], a: 0, mis: { 1: 'After 1, n becomes -2. -2 > 0 is False, so -2 is never printed.' }, ex: 'n goes 10, 7, 4, 1 (all printed), then becomes -2, and the loop stops.' },
        { id: 'u5-05-q20', c: 'while', t: 'tf', d: 2, q: 'If a while loop’s condition is False at the very start, its body runs zero times.', a: true, ex: 'The condition is checked before every round, including the first. If it is False at once, the body is skipped.' },
        { id: 'u5-05-q21', c: 'while', t: 'bins', d: 2, q: 'Which loop fits each task best?', bins: ['for loop', 'while loop'], items: [['Print the table of 9 from 1 to 10', 0], ['Keep asking for the password until it is correct', 1], ['Print the names of all 7 quiz students', 0], ['Move the robot until it reaches the goal', 1], ['Print the numbers 1 to 100', 0], ['Keep rolling a die until you get a 6', 1]], ex: 'for suits a known number of repeats or a known sequence; while suits “repeat until something happens”.' },
        { id: 'u5-05-q22', c: 'while', t: 'mcq', d: 3, q: 'Meera saves ₹30 a week, starting with ₹100. What is the output?', code: `balance = 100
weeks = 0
while balance < 200:
    balance += 30
    weeks += 1
print(weeks, balance)`, o: ['4 220', '3 190', '4 200', '3 220'], a: 0, mis: { 1: 'At 190 the condition 190 < 200 is still True, so the loop runs once more.', 2: 'balance goes up in steps of 30 from 100, so it never equals 200 exactly.' }, ex: 'balance goes 130, 160, 190, 220 over 4 weeks. 220 < 200 is False, so the loop stops and prints 4 220.' },
        // accum
        { id: 'u5-05-q23', c: 'accum', t: 'mcq', d: 1, q: 'Why do we write <code>total = 0</code> before a loop that adds numbers?', o: ['So the running total starts from zero before anything is added', 'Because Python needs every variable to be 0', 'To make the loop run faster', 'So that the loop runs zero times'], a: 0, ex: 'The total must exist and start at 0 before the loop adds each number to it.' },
        { id: 'u5-05-q24', c: 'accum', t: 'mcq', d: 2, q: 'What is the output?', code: `total = 0
for i in range(1, 5):
    total += i
print(total)`, o: ['10', '15', '4', '1\n3\n6\n10'], a: 0, mis: { 1: '15 would need range(1, 6). Here i goes only up to 4.', 3: 'print is not indented, so it runs once after the loop.' }, ex: '1 + 2 + 3 + 4 = 10, printed once after the loop.' },
        { id: 'u5-05-q25', c: 'accum', t: 'mcq', d: 3, q: 'What is the output?', code: `total = 0
for i in range(1, 5):
    total += i
    print(total)`, o: ['1\n3\n6\n10', '10', '1\n2\n3\n4', '0\n1\n3\n6'], a: 0, mis: { 1: 'print is indented, so it runs inside the loop, every round.' }, ex: 'The print is inside the loop, so the running total is shown after each addition: 1, 3, 6, 10.' },
        { id: 'u5-05-q26', c: 'accum', t: 'mcq', d: 3, q: 'Arjun moved <code>total = 0</code> inside the loop by mistake. What is the output?', code: `for i in range(1, 5):
    total = 0
    total += i
print(total)`, o: ['4', '10', '0', '1'], a: 0, mis: { 1: 'total is reset to 0 at the start of every round, so the earlier numbers are lost.' }, ex: 'Each round sets total back to 0 and then adds i. After the last round (i = 4), total is 4.' },
        { id: 'u5-05-q27', c: 'accum', t: 'num', d: 2, q: 'What number does this program print?', code: `count = 0
for i in range(1, 21):
    if i % 5 == 0:
        count += 1
print(count)`, a: 4, ex: 'Between 1 and 20 the multiples of 5 are 5, 10, 15 and 20, so the counter reaches 4.' },
        { id: 'u5-05-q28', c: 'accum', t: 'tf', d: 1, q: 'To find the sum of the first 10 natural numbers, total should be set to 0 before the loop, not inside it.', a: true, ex: 'Setting it inside the loop would reset it every round. It must start at 0 once, before the loop.' },
        { id: 'u5-05-q29', c: 'accum', t: 'mcq', d: 2, q: 'What is the output?', code: `product = 1
for i in range(1, 5):
    product *= i
print(product)`, o: ['24', '10', '0', '120'], a: 0, mis: { 1: '10 is the sum. *= multiplies.', 2: 'product starts at 1, not 0, so multiplying does not give 0.' }, ex: '1 × 1 × 2 × 3 × 4 = 24. A product starts at 1, because starting at 0 would make everything 0.' },
        { id: 'u5-05-q30', c: 'accum', t: 'multi', d: 3, q: 'Select all that apply. Isha’s loop should add 1 to 10 (answer 55) but it prints 45. Which mistakes could cause exactly 45?', o: ['She used range(1, 10)', 'She used range(10)', 'She started with total = 1', 'She used range(1, 11)'], a: [0, 1], ex: 'range(1, 10) and range(10) both miss the 10, giving 45. Starting at total = 1 would give 56, and range(1, 11) gives the correct 55.' }
      ],
      gens: ['py-output-loop']
    },
    // ═══════════════════════════════════ u5-06 ═══════════════════════════════════
    {
      id: 'u5-06',
      title: 'Python Lists',
      minutes: 110,
      outcomes: [
        'Create lists and access items using positive indexing, negative indexing and slicing',
        'Perform simple operations on lists: len, append, insert, extend, remove, pop, del, sort, sum, min and max',
        'Solve basic problems by looping over lists'
      ],
      hook: 'A class of 40 students would need 40 separate variables, or just one list.',
      concepts: {
        'create': 'Creating lists and len()',
        'index': 'Positive and negative indexing',
        'slice': 'Slicing a list',
        'methods': 'Adding and removing items',
        'sortagg': 'sort(), sum(), min(), max()',
        'loop': 'Looping over a list'
      },
      steps: [
        {
          kind: 'card',
          title: 'What is a list?',
          html: `<p>A <b>list</b> stores many values, in order, in one variable. Write the items inside square brackets <code>[ ]</code>, separated by commas.</p>
<pre class="code">quiz = ["Arjun", "Sonakshi", "Vikram"]
marks = [78, 92, 65]
mixed = ["Riya", 14, 1.55, True]
empty = []
print(quiz)
print(len(marks))</pre>
<p>Output:</p>
<pre class="code">['Arjun', 'Sonakshi', 'Vikram']
3</pre>
<ul><li>A list can hold items of any type, even mixed types.</li>
<li><code>len()</code> gives the number of items.</li>
<li>Lists can be changed after they are made: you can add, remove and replace items.</li></ul>
<div class="warn"><b>Careful</b> When Python prints a list of strings, it shows them in <b>single</b> quotes, even if you typed double quotes.</div>`
        },
        {
          kind: 'card',
          title: 'Indexing: counting from 0',
          html: `<p>Each item has a position number called its <b>index</b>. Python starts counting at <b>0</b>.</p>
<table class="tbl"><thead><tr><th>Item</th><th>"Arjun"</th><th>"Sonakshi"</th><th>"Vikram"</th><th>"Sandhya"</th></tr></thead><tbody>
<tr><td>Index</td><td>0</td><td>1</td><td>2</td><td>3</td></tr></tbody></table>
<pre class="code">quiz = ["Arjun", "Sonakshi", "Vikram", "Sandhya"]
print(quiz[0])
print(quiz[2])</pre>
<p>Output: <code>Arjun</code> and <code>Vikram</code>.</p>
<p>The last index is always <code>len(list) - 1</code>. Using an index that does not exist, like <code>quiz[4]</code>, gives an <b>IndexError</b>.</p>
<div class="key"><b>Key idea</b> The 1st item is at index 0, the 2nd at index 1. “Second position” in a question means index 1.</div>`
        },
        {
          kind: 'card',
          title: 'Negative indexing and changing items',
          html: `<p>Python can also count from the end with <b>negative indexes</b>: <code>-1</code> is the last item, <code>-2</code> the second last, and so on.</p>
<table class="tbl"><thead><tr><th>Item</th><th>23</th><th>12</th><th>5</th><th>9</th><th>65</th><th>44</th></tr></thead><tbody>
<tr><td>Positive index</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><td>Negative index</td><td>-6</td><td>-5</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr></tbody></table>
<p>For <code>num = [23, 12, 5, 9, 65, 44]</code>, <code>num[-1]</code> is 44 and <code>num[-4]</code> is 5.</p>
<p>You can replace an item by assigning to its index:</p>
<pre class="code">marks = [80, 75, 92]
marks[1] = 88
print(marks)</pre>
<p>Output: <code>[80, 88, 92]</code></p>`
        },
        { kind: 'check', concepts: ['create', 'index'], n: 3 },
        {
          kind: 'card',
          title: 'Slicing: taking a part of a list',
          html: `<p>A <b>slice</b> <code>list[start:stop]</code> gives a new list from index <code>start</code> up to, but <b>not including</b>, <code>stop</code>.</p>
<pre class="code">num = [23, 12, 5, 9, 65, 44]
print(num[1:4])
print(num[-4:-1])
print(num[:2])
print(num[3:])</pre>
<p>Output:</p>
<pre class="code">[12, 5, 9]
[5, 9, 65]
[23, 12]
[9, 65, 44]</pre>
<ul><li><code>num[1:4]</code>: 2nd to 4th items (indexes 1, 2, 3).</li>
<li><code>num[-4:-1]</code>: 3rd to 5th items, using negative indexes (-4, -3, -2).</li>
<li>Leave out start to begin at the front; leave out stop to go to the end.</li></ul>`
        },
        { kind: 'code', ex: 'py-num-list' },
        {
          kind: 'card',
          title: 'Adding items: append, insert, extend',
          html: `<table class="tbl"><thead><tr><th>Method</th><th>What it does</th></tr></thead><tbody>
<tr><td><code>append(x)</code></td><td>adds one item at the end</td></tr>
<tr><td><code>insert(i, x)</code></td><td>adds x at index i; later items shift right</td></tr>
<tr><td><code>extend(list2)</code></td><td>adds every item of list2 at the end</td></tr></tbody></table>
<pre class="code">team = ["Arjun", "Isha"]
team.append("Jay")
team.insert(1, "Sana")
team.extend(["Kartik", "Sonal"])
print(team)</pre>
<p>Output:</p>
<pre class="code">['Arjun', 'Sana', 'Isha', 'Jay', 'Kartik', 'Sonal']</pre>
<div class="warn"><b>Careful</b> <code>append([1, 2])</code> adds the whole list as <b>one</b> item. Use <code>extend([1, 2])</code> to add its items one by one.</div>`
        },
        {
          kind: 'card',
          title: 'Removing items: remove, pop, del',
          html: `<table class="tbl"><thead><tr><th>Code</th><th>Removes…</th></tr></thead><tbody>
<tr><td><code>quiz.remove("Vikram")</code></td><td>the first item equal to "Vikram" (by <b>value</b>)</td></tr>
<tr><td><code>quiz.pop(1)</code></td><td>the item at index 1, and gives it back</td></tr>
<tr><td><code>quiz.pop()</code></td><td>the last item</td></tr>
<tr><td><code>del quiz[1]</code></td><td>the item at index 1 (by <b>position</b>)</td></tr></tbody></table>
<pre class="code">quiz = ["Arjun", "Sonakshi", "Vikram", "Sandhya"]
quiz.remove("Vikram")
print(quiz)
del quiz[1]
print(quiz)</pre>
<p>Output:</p>
<pre class="code">['Arjun', 'Sonakshi', 'Sandhya']
['Arjun', 'Sandhya']</pre>
<div class="warn"><b>Careful</b> <code>remove()</code> gives a ValueError if the value is not in the list.</div>`
        },
        { kind: 'check', concepts: ['slice', 'methods'], n: 3 },
        { kind: 'code', ex: 'py-quiz-list' },
        { kind: 'code', ex: 'py-shopping-cart' },
        {
          kind: 'card',
          title: 'sort(), sum(), min(), max()',
          html: `<pre class="code">marks = [78, 92, 65, 88]
marks.sort()
print(marks)
print(sum(marks), min(marks), max(marks))
print(sum(marks) / len(marks))</pre>
<p>Output:</p>
<pre class="code">[65, 78, 88, 92]
323 65 92
80.75</pre>
<ul><li><code>sort()</code> arranges the list in ascending order. <code>sort(reverse=True)</code> sorts in descending order.</li>
<li><code>sum()</code>, <code>min()</code> and <code>max()</code> give the total, smallest and largest item.</li>
<li>Average = <code>sum(list) / len(list)</code>.</li></ul>
<div class="warn"><b>Careful</b> <code>sort()</code> changes the list itself and gives back nothing, so <code>print(marks.sort())</code> prints <code>None</code>. Sort first, then print the list.</div>`
        },
        { kind: 'code', ex: 'py-extend-sort' },
        { kind: 'code', ex: 'py-marks-stats' },
        {
          kind: 'card',
          title: 'Looping over a list',
          html: `<p>A <code>for</code> loop can visit every item of a list directly:</p>
<pre class="code">for name in ["Diya", "Kabir", "Meera"]:
    print("Welcome,", name)</pre>
<p>To <b>change</b> each item, loop over the index numbers with <code>range(len(list))</code>:</p>
<pre class="code">prices = [10, 20, 30]
for i in range(len(prices)):
    prices[i] = prices[i] + 5
print(prices)</pre>
<p>Output: <code>[15, 25, 35]</code></p>
<p>Running totals and counters work with lists too:</p>
<pre class="code">total = 0
for p in prices:
    total += p
print(total)    # 75</pre>
<div class="key"><b>Key idea</b> Loop over items to read them; loop over indexes to change them.</div>`
        },
        { kind: 'code', ex: 'py-even-plus-one' },
        { kind: 'code', ex: 'py-sum-list' },
        { kind: 'check', concepts: ['sortagg', 'loop'], n: 3 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // create
        { id: 'u5-06-q01', c: 'create', t: 'mcq', d: 1, q: 'Which of these creates a Python list?', o: ['[10, 20, 30]', '(10, 20, 30)', '"10, 20, 30"', '{10: 20, 30: 40}'], a: 0, mis: { 2: 'Quotes make it one string (text), not a list.' }, ex: 'A list is written with square brackets, items separated by commas.' },
        { id: 'u5-06-q02', c: 'create', t: 'mcq', d: 1, q: 'What is the output?', code: `fruits = ["mango", "banana", "guava"]
print(len(fruits))`, o: ['3', '2', '4', '1'], a: 0, mis: { 1: '2 is the last index. len() counts the items, and there are 3.' }, ex: 'len() counts the items: mango, banana and guava, so 3.' },
        { id: 'u5-06-q03', c: 'create', t: 'mcq', d: 2, q: 'What is the output?', code: `print(["Riya", 14, 1.5])`, o: ["['Riya', 14, 1.5]", '["Riya", 14, 1.5]', 'Riya 14 1.5', "['Riya', '14', '1.5']"], a: 0, mis: { 1: 'Python always shows strings inside a printed list with single quotes.', 3: '14 and 1.5 are numbers, so they are shown without quotes.' }, ex: 'Printing a list shows the brackets and commas, strings in single quotes, and numbers without quotes.' },
        { id: 'u5-06-q04', c: 'create', t: 'tf', d: 1, q: 'A Python list can store items of different data types, such as a str and an int together.', a: true, ex: 'Lists can mix types, for example ["Riya", 14, 1.5, True].' },
        { id: 'u5-06-q05', c: 'create', t: 'mcq', d: 2, q: 'What is the output?', code: `nums = []
print(len(nums))`, o: ['0', '1', 'None', '[]'], a: 0, mis: { 1: 'The brackets are not an item. An empty list has no items.' }, ex: '[] is an empty list, so it has 0 items.' },
        // index
        { id: 'u5-06-q06', c: 'index', t: 'mcq', d: 1, q: 'What is the output?', code: `colours = ["red", "green", "blue"]
print(colours[1])`, o: ['green', 'red', 'blue', 'colours[1]'], a: 0, mis: { 1: 'Indexes start at 0, so red is colours[0].' }, ex: 'Index 0 is red, index 1 is green.' },
        { id: 'u5-06-q07', c: 'index', t: 'mcq', d: 2, q: 'What is the output?', code: `colours = ["red", "green", "blue"]
print(colours[-1])`, o: ['blue', 'red', 'green', '-1'], a: 0, mis: { 1: 'Negative indexes count from the end; -1 is the last item.' }, ex: 'Index -1 always means the last item, which is blue.' },
        { id: 'u5-06-q08', c: 'index', t: 'mcq', d: 3, q: 'What happens when this code runs?', code: `marks = [80, 75, 92]
x = marks[3]`, o: ['IndexError: this list only has indexes 0, 1 and 2', 'x becomes 92', 'x becomes 80', 'x becomes 0'], a: 0, mis: { 1: '92 is at index 2. With 3 items, the last index is 2, not 3.' }, ex: 'A list of 3 items has indexes 0, 1, 2. Index 3 does not exist, so Python raises an IndexError.' },
        { id: 'u5-06-q09', c: 'index', t: 'mcq', d: 2, q: 'What is the output?', code: `marks = [80, 75, 92]
marks[1] = 88
print(marks)`, o: ['[80, 88, 92]', '[88, 75, 92]', '[80, 75, 88]', '[80, 75, 92, 88]'], a: 0, mis: { 1: 'Index 1 is the second item (75), not the first.', 3: 'Assigning to an index replaces that item; it does not add a new one.' }, ex: 'marks[1] is the second item, 75, which is replaced by 88.' },
        { id: 'u5-06-q10', c: 'index', t: 'match', d: 2, q: 'For <code>days = ["Mon", "Tue", "Wed", "Thu", "Fri"]</code>, match each expression to its value.', pairs: [['days[0]', 'Mon'], ['days[2]', 'Wed'], ['days[-1]', 'Fri'], ['days[-2]', 'Thu']], ex: 'Positive indexes count from 0 at the front; negative indexes count from -1 at the end.' },
        { id: 'u5-06-q11', c: 'index', t: 'num', d: 2, q: 'What number does this program print?', code: `num = [23, 12, 5, 9, 65, 44]
print(num[2] + num[-1])`, a: 49, ex: 'num[2] is 5 (the third item) and num[-1] is 44 (the last item); 5 + 44 = 49.' },
        // slice
        { id: 'u5-06-q12', c: 'slice', t: 'mcq', d: 1, q: 'What is the output?', code: `num = [23, 12, 5, 9, 65, 44]
print(num[1:4])`, o: ['[12, 5, 9]', '[12, 5, 9, 65]', '[23, 12, 5]', '[23, 12, 5, 9]'], a: 0, mis: { 1: 'The stop index 4 is not included, so 65 (index 4) is left out.', 2: 'The slice starts at index 1, which is 12, not 23.' }, ex: 'num[1:4] takes indexes 1, 2, 3: the values 12, 5, 9.' },
        { id: 'u5-06-q13', c: 'slice', t: 'mcq', d: 2, q: 'What is the output?', code: `num = [23, 12, 5, 9, 65, 44]
print(num[-4:-1])`, o: ['[5, 9, 65]', '[5, 9, 65, 44]', '[9, 65, 44]', '[65, 9, 5]'], a: 0, mis: { 1: 'The stop index -1 (44) is not included.', 3: 'A slice keeps the original left-to-right order.' }, ex: 'Indexes -4, -3, -2 are 5, 9 and 65. The stop -1 is excluded.' },
        { id: 'u5-06-q14', c: 'slice', t: 'mcq', d: 2, q: 'What is the output?', code: `letters = ["a", "b", "c", "d", "e"]
print(letters[:2])`, o: ["['a', 'b']", "['a', 'b', 'c']", "['c', 'd', 'e']", "['b']"], a: 0, mis: { 1: 'Stop index 2 is not included, so only indexes 0 and 1.' }, ex: 'Leaving out start means “from the beginning”, so [:2] gives indexes 0 and 1.' },
        { id: 'u5-06-q15', c: 'slice', t: 'mcq', d: 3, q: 'What is the output?', code: `letters = ["a", "b", "c", "d", "e"]
print(letters[2:])`, o: ["['c', 'd', 'e']", "['b', 'c', 'd', 'e']", "['a', 'b']", "['c', 'd']"], a: 0, mis: { 1: 'Index 2 is the third item, c.', 3: 'Leaving out stop means “to the end”, so e is included.' }, ex: 'Start at index 2 (c) and, with no stop, go to the end: c, d, e.' },
        { id: 'u5-06-q16', c: 'slice', t: 'tf', d: 2, q: 'In <code>num[1:4]</code>, the item at index 4 is included.', a: false, ex: 'A slice stops before the stop index, so num[1:4] gives indexes 1, 2 and 3 only.' },
        { id: 'u5-06-q17', c: 'slice', t: 'mcq', d: 3, q: 'Which slice gives the 2nd to 4th items of a list called <code>scores</code>?', o: ['scores[1:4]', 'scores[2:4]', 'scores[2:5]', 'scores[1:3]'], a: 0, mis: { 1: 'The 2nd item is at index 1, not 2.', 3: 'The stop is excluded, so [1:3] gives only the 2nd and 3rd items.' }, ex: 'The 2nd to 4th items are indexes 1, 2 and 3, so start at 1 and stop at 4.' },
        // methods
        { id: 'u5-06-q18', c: 'methods', t: 'mcq', d: 1, q: 'What is the output?', code: `team = ["Arjun", "Isha"]
team.append("Jay")
print(team)`, o: ["['Arjun', 'Isha', 'Jay']", "['Jay', 'Arjun', 'Isha']", "['Arjun', 'Jay', 'Isha']", "['Arjun', 'Isha']"], a: 0, ex: 'append() always adds the new item at the end.' },
        { id: 'u5-06-q19', c: 'methods', t: 'mcq', d: 2, q: 'What is the output?', code: `team = ["Arjun", "Isha"]
team.insert(1, "Sana")
print(team)`, o: ["['Arjun', 'Sana', 'Isha']", "['Sana', 'Arjun', 'Isha']", "['Arjun', 'Isha', 'Sana']", "['Arjun', 'Sana']"], a: 0, mis: { 1: 'Index 1 is the second position. Use insert(0, ...) to put something at the front.', 3: 'insert() adds an item; it does not replace Isha.' }, ex: 'insert(1, "Sana") places Sana at index 1, and Isha shifts one place right.' },
        { id: 'u5-06-q20', c: 'methods', t: 'mcq', d: 2, q: 'What is the output?', code: `a = [1, 2]
a.extend([3, 4])
print(a)`, o: ['[1, 2, 3, 4]', '[1, 2, [3, 4]]', '[3, 4, 1, 2]', '[4, 6]'], a: 0, mis: { 1: 'That is what append([3, 4]) would do. extend adds the items one by one.', 3: 'extend joins lists; it does not add the numbers together.' }, ex: 'extend() adds each item of the other list to the end, giving [1, 2, 3, 4].' },
        { id: 'u5-06-q21', c: 'methods', t: 'mcq', d: 3, q: 'What is the output?', code: `n = [5, 8, 5, 2]
n.remove(5)
print(n)`, o: ['[8, 5, 2]', '[8, 2]', '[5, 8, 2]', '[5, 8, 5]'], a: 0, mis: { 1: 'remove() deletes only the FIRST matching value, not every 5.', 3: 'remove(5) removes the value 5; it does not use 5 as an index.' }, ex: 'remove(5) deletes the first 5 it finds (at index 0). The second 5 stays.' },
        { id: 'u5-06-q22', c: 'methods', t: 'mcq', d: 3, q: 'What is the output?', code: `q = ["Arjun", "Sonakshi", "Vikram", "Sandhya"]
q.pop(1)
print(q)`, o: ["['Arjun', 'Vikram', 'Sandhya']", "['Sonakshi', 'Vikram', 'Sandhya']", "['Arjun', 'Sonakshi', 'Sandhya']", "['Arjun', 'Sonakshi', 'Vikram']"], a: 0, mis: { 1: 'pop(1) removes index 1 (the second item), not the first.', 3: 'pop() with no number removes the last item, but here the index 1 is given.' }, ex: 'pop(1) removes the item at index 1, Sonakshi.' },
        { id: 'u5-06-q23', c: 'methods', t: 'match', d: 2, q: 'Match each list method to what it does.', pairs: [['append(x)', 'Adds x at the end'], ['insert(i, x)', 'Adds x at index i'], ['remove(x)', 'Deletes the first item equal to x'], ['pop()', 'Removes and gives back the last item'], ['extend(list2)', 'Adds every item of list2 at the end']], ex: 'append and extend add at the end (one item vs many), insert adds at a position, remove deletes by value, pop by position.' },
        { id: 'u5-06-q24', c: 'methods', t: 'multi', d: 2, q: 'Select all that apply. Which lines delete an item from <code>L = [4, 7, 9]</code>?', o: ['L.remove(7)', 'L.pop(0)', 'del L[2]', 'L.append(7)', 'L.insert(0, 7)'], a: [0, 1, 2], ex: 'remove() deletes by value, pop() and del delete by index. append and insert add items.' },
        { id: 'u5-06-q25', c: 'methods', t: 'order', d: 1, q: 'Put the steps of the CBSE science-quiz list program in the order the task gives them.', items: ['Print the whole list', 'Delete the name “Vikram”', 'Add the name “Jay” at the end', 'Remove the item at the second position'], ex: 'The practical lists these steps in sequence: print, delete Vikram, add Jay at the end, then remove the item at the second position (index 1).' },
        // sortagg
        { id: 'u5-06-q26', c: 'sortagg', t: 'mcq', d: 1, q: 'What is the output?', code: `n = [40, 10, 30]
n.sort()
print(n)`, o: ['[10, 30, 40]', '[40, 30, 10]', '[40, 10, 30]', '[10, 40, 30]'], a: 0, mis: { 1: 'sort() is ascending (smallest first) unless you use reverse=True.' }, ex: 'sort() arranges the list in ascending order: 10, 30, 40.' },
        { id: 'u5-06-q27', c: 'sortagg', t: 'mcq', d: 3, q: 'What is the output?', code: `n = [40, 10, 30]
print(n.sort())`, o: ['None', '[10, 30, 40]', '[40, 10, 30]', '[]'], a: 0, mis: { 1: 'sort() changes the list but returns nothing (None). Sort first, then print(n).' }, ex: 'sort() works in place and returns None, so print shows None. Write n.sort() and then print(n).' },
        { id: 'u5-06-q28', c: 'sortagg', t: 'mcq', d: 2, q: 'What is the output?', code: `marks = [70, 85, 90]
print(sum(marks), max(marks), min(marks))`, o: ['245 90 70', '245 70 90', '3 90 70', '81 90 70'], a: 0, mis: { 1: 'max() is the largest (90) and min() the smallest (70); check the order of the arguments.' }, ex: 'sum = 70 + 85 + 90 = 245, max = 90, min = 70.' },
        { id: 'u5-06-q29', c: 'sortagg', t: 'mcq', d: 2, q: 'What is the output?', code: `marks = [70, 80, 90]
print(sum(marks) / len(marks))`, o: ['80.0', '80', '240', '3'], a: 0, mis: { 1: '/ always gives a float, so the average is 80.0.' }, ex: '240 / 3 = 80.0. Division with / always gives a float.' },
        { id: 'u5-06-q30', c: 'sortagg', t: 'mcq', d: 2, q: 'What is the output?', code: `x = [3, 1, 2]
x.sort(reverse=True)
print(x)`, o: ['[3, 2, 1]', '[1, 2, 3]', '[2, 1, 3]', '[3, 1, 2]'], a: 0, mis: { 1: 'reverse=True sorts in descending order (largest first).', 2: 'reverse=True sorts from largest to smallest; it does not just flip the original order.' }, ex: 'sort(reverse=True) sorts from largest to smallest.' },
        { id: 'u5-06-q31', c: 'sortagg', t: 'tf', d: 2, q: '<code>sort()</code> changes the original list itself.', a: true, ex: 'sort() rearranges the list in place; the old order is lost.' },
        // loop
        { id: 'u5-06-q32', c: 'loop', t: 'mcq', d: 1, q: 'What is the output?', code: `for name in ["Diya", "Kabir"]:
    print("Hi", name)`, o: ['Hi Diya\nHi Kabir', 'Hi Diya Kabir', 'Hi name\nHi name', "Hi ['Diya', 'Kabir']"], a: 0, mis: { 2: 'name is a variable (no quotes), so its value is printed.' }, ex: 'The loop gives name each item in turn, so it prints one greeting per name.' },
        { id: 'u5-06-q33', c: 'loop', t: 'mcq', d: 2, q: 'What is the output?', code: `nums = [4, 6, 10]
total = 0
for n in nums:
    total += n
print(total)`, o: ['20', '10', '3', '4\n10\n20'], a: 0, mis: { 1: '10 is just the last item. The loop adds every item to total.', 3: 'print is outside the loop, so it runs once.' }, ex: 'total becomes 4, then 10, then 20; it is printed once after the loop.' },
        { id: 'u5-06-q34', c: 'loop', t: 'mcq', d: 3, q: 'What is the output?', code: `evens = [2, 4, 6]
for i in range(len(evens)):
    evens[i] = evens[i] + 1
print(evens)`, o: ['[3, 5, 7]', '[2, 4, 6]', '[3, 4, 6]', '[2, 4, 6, 1]'], a: 0, mis: { 1: 'evens[i] = ... changes the list itself, item by item.', 2: 'The loop runs for every index (0, 1, 2), not just the first.' }, ex: 'range(len(evens)) gives 0, 1, 2, and each item is replaced by itself plus 1.' },
        { id: 'u5-06-q35', c: 'loop', t: 'mcq', d: 3, q: 'What is the output?', code: `marks = [45, 78, 52, 30, 91]
count = 0
for m in marks:
    if m > 50:
        count += 1
print(count)`, o: ['3', '2', '5', '4'], a: 0, mis: { 1: '52 is also more than 50; count 78, 52 and 91.' }, ex: '78, 52 and 91 are more than 50, so the counter reaches 3.' },
        { id: 'u5-06-q36', c: 'loop', t: 'multi', d: 2, q: 'Select all that apply. In <code>for x in fruits:</code> …', o: ['x takes each item of the list in turn', 'the loop runs len(fruits) times', 'reading x does not change the list', 'x is the index number of each item', 'the loop always runs exactly 10 times'], a: [0, 1, 2], ex: 'Looping directly over a list gives each item (not the index), once per item. Use range(len(fruits)) when you need indexes.' }
      ],
      gens: ['py-output-list']
    },
    // ═══════════════════════════════════ u5-07 ═══════════════════════════════════
    {
      id: 'u5-07',
      title: 'Practical File: 15+ Programs',
      minutes: 60,
      outcomes: [
        'Write, test and record the CBSE suggested Python programs in a Practical File',
        'Plan programs using Input → Process → Output and turn formulas into Python',
        'Read error messages and debug simple programs'
      ],
      hook: 'Your Practical File is your Python trophy cabinet: every CBSE program, written by you, tested and working.',
      concepts: {
        'pfile': 'Writing up and testing a practical',
        'ipo': 'Input → Process → Output and formulas',
        'debug': 'Reading errors and debugging',
        'mixed': 'Programs that combine skills'
      },
      steps: [
        {
          kind: 'card',
          title: 'What goes in your Practical File',
          html: `<p>For the CBSE practical exam you keep a <b>Practical File</b> of Python programs (at least 15). For each program, record:</p>
<ol class="flow"><li><b>Aim</b><span>One line: “To calculate the area of a triangle from its base and height.”</span></li><li><b>Code</b><span>The full program, with a comment at the top.</span></li><li><b>Input</b><span>The values you typed when testing.</span></li><li><b>Output</b><span>The exact output (copy it or take a screenshot).</span></li></ol>
<p>Write the date, and keep the programs in the order of the syllabus groups.</p>
<div class="key"><b>Key idea</b> A practical is complete only when the code runs and you have recorded a real output for it.</div>`
        },
        {
          kind: 'card',
          title: 'Your CBSE program checklist',
          html: `<p>The CBSE Suggested Program List has four groups. You have already built most of them in this unit:</p>
<table class="tbl"><thead><tr><th>Group</th><th>Programs</th></tr></thead><tbody>
<tr><td><b>PRINT</b></td><td>personal information; two star patterns; square of 7; sum of 15 and 20; km to metres; table of 5 (five terms); simple interest</td></tr>
<tr><td><b>INPUT</b></td><td>rectangle area and perimeter; triangle area; average of 3 subjects; discounted amount; cuboid surface area and volume</td></tr>
<tr><td><b>LIST</b></td><td>science-quiz list; <code>num</code> list length and slices; first 10 even numbers + 1; <code>List_1</code> extend and sort</td></tr>
<tr><td><b>IF, FOR, WHILE</b></td><td>can vote?; grade; positive/negative/zero; first 10 natural numbers; first 10 even numbers; odd numbers 1 to n; sum of first 10 natural numbers; sum of a list</td></tr></tbody></table>
<p>This topic adds the last three: <b>discount</b>, <b>cuboid</b> and <b>table of 5</b>, plus some bonus programs.</p>`
        },
        { kind: 'check', concepts: ['pfile'], n: 2 },
        {
          kind: 'card',
          title: 'Plan before you code',
          html: `<p>Use Input → Process → Output for the <b>discount</b> program:</p>
<table class="tbl"><thead><tr><th>Step</th><th>Plan</th></tr></thead><tbody>
<tr><td>Input</td><td>price, discount percent</td></tr>
<tr><td>Process</td><td>discount = price × discount% ÷ 100; amount = price − discount</td></tr>
<tr><td>Output</td><td>Discount, Amount to pay</td></tr></tbody></table>
<p>Check with a hand calculation first: a ₹1200 bag with 10% off has a ₹120 discount, so you pay ₹1080.</p>
<pre class="code">price = float(input("Enter the price: "))
discount_percent = float(input("Enter the discount percent: "))</pre>
<div class="key"><b>Key idea</b> If you can do one example by hand, you can write the program. The hand answer also tells you whether your output is right.</div>`
        },
        { kind: 'code', ex: 'py-discount' },
        {
          kind: 'card',
          title: 'Turning formulas into Python',
          html: `<table class="tbl"><thead><tr><th>Maths</th><th>Python</th></tr></thead><tbody>
<tr><td>Area of rectangle = l × b</td><td><code>area = l * b</code></td></tr>
<tr><td>Perimeter = 2(l + b)</td><td><code>perimeter = 2 * (l + b)</code></td></tr>
<tr><td>Area of triangle = ½ × b × h</td><td><code>area = 0.5 * base * height</code></td></tr>
<tr><td>SI = P × R × T ÷ 100</td><td><code>si = p * r * t / 100</code></td></tr>
<tr><td>Surface area of cuboid = 2(lb + bh + hl)</td><td><code>sa = 2 * (l*b + b*h + h*l)</code></td></tr>
<tr><td>Volume of cuboid = l × b × h</td><td><code>volume = l * b * h</code></td></tr></tbody></table>
<div class="warn"><b>Careful</b> Python never multiplies on its own. <code>2(l + b)</code> and <code>lb</code> do not work: write <code>2 * (l + b)</code> and <code>l * b</code>. Keep the brackets from the formula.</div>`
        },
        { kind: 'code', ex: 'py-cuboid' },
        {
          kind: 'card',
          title: 'Many prints, or one loop',
          html: `<p>The syllabus asks for the <b>table of 5 up to five terms</b> using print commands:</p>
<pre class="code">print("5 x 1 =", 5 * 1)
print("5 x 2 =", 5 * 2)
print("5 x 3 =", 5 * 3)
print("5 x 4 =", 5 * 4)
print("5 x 5 =", 5 * 5)</pre>
<p>Now that you know loops, the same output takes two lines:</p>
<pre class="code">for i in range(1, 6):
    print("5 x", i, "=", 5 * i)</pre>
<p>Both print:</p>
<pre class="code">5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25</pre>
<div class="key"><b>Key idea</b> Different programs can give the same correct output. A loop is shorter and easy to change, for example to 10 terms.</div>`
        },
        { kind: 'code', ex: 'py-table-5' },
        { kind: 'check', concepts: ['ipo'], n: 3 },
        {
          kind: 'card',
          title: 'Reading error messages',
          html: `<table class="tbl"><thead><tr><th>Error</th><th>Usual cause</th><th>Example</th></tr></thead><tbody>
<tr><td>SyntaxError</td><td>missing bracket, quote or colon</td><td><code>if x &gt; 5</code></td></tr>
<tr><td>IndentationError</td><td>block not indented, or uneven spaces</td><td>line under <code>if</code> not pushed right</td></tr>
<tr><td>NameError</td><td>name misspelt or not created yet</td><td><code>Print("Hi")</code>, <code>totl</code></td></tr>
<tr><td>TypeError</td><td>mixing types</td><td><code>"Age: " + 14</code></td></tr>
<tr><td>ValueError</td><td>right type, wrong content</td><td><code>int("12.5")</code></td></tr>
<tr><td>ZeroDivisionError</td><td>dividing by 0</td><td><code>10 / 0</code></td></tr>
<tr><td>IndexError</td><td>list position does not exist</td><td><code>[1, 2][5]</code></td></tr></tbody></table>
<div class="key"><b>Key idea</b> The last line of an error message names the error; the line number shows where Python noticed it. The real mistake is often on that line or just above it.</div>`
        },
        { kind: 'check', concepts: ['debug'], n: 3 },
        {
          kind: 'card',
          title: 'Test like an examiner',
          html: `<p>Before writing a program into your file, test it with several kinds of values:</p>
<ul><li><b>Normal values</b>: a typical case you can check by hand.</li>
<li><b>Boundary values</b>: exactly 18 for voting, exactly 90 or 75 for grades, exactly 100 units for a bill slab.</li>
<li><b>Special values</b>: 0, a negative number, or a decimal like 2.5.</li></ul>
<p>Some bugs only show up with the right test value. The program can run without any error message and still give a <b>wrong answer</b>: a <i>logic error</i>.</p>
<pre class="code">km = input("Distance in km: ")
print(km * 1000)</pre>
<p>Type 5, and this prints <code>5</code> one thousand times instead of 5000, because <code>km</code> is a string. No error appears; only testing catches it.</p>`
        },
        { kind: 'code', ex: 'py-report-card' },
        { kind: 'code', ex: 'py-pocket-money' },
        { kind: 'code', ex: 'py-electricity-bill' },
        {
          kind: 'card',
          title: 'Good habits for every program',
          html: `<div class="cols"><div class="mini"><h4>🏷️ Clear names</h4><p><code>principal_amount</code> beats <code>p1</code>.</p></div>
<div class="mini"><h4>💬 Comments</h4><p>Write the aim at the top with <code>#</code>.</p></div>
<div class="mini"><h4>❓ Clear prompts</h4><p><code>input("Enter marks out of 100: ")</code> tells the user what to type.</p></div>
<div class="mini"><h4>📋 Labelled output</h4><p><code>Area = 40</code> is clearer than just <code>40</code>.</p></div></div>
<p>Then save your work, run it one last time, and copy the output into your file.</p>
<div class="key"><b>Key idea</b> Code is read more often than it is written. Make yours easy to read, for your teacher and for future you.</div>`
        },
        { kind: 'check', concepts: ['mixed'], n: 3 },
        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // pfile
        { id: 'u5-07-q01', c: 'pfile', t: 'multi', d: 1, q: 'Select all that apply. What should each program in your Practical File include?', o: ['The aim of the program', 'The Python code', 'A real output from running it', 'Your account password', 'Only the final answer, without the code'], a: [0, 1, 2], ex: 'Each practical records its aim, code, input used and the actual output. Never write passwords, and the code itself must be included.' },
        { id: 'u5-07-q02', c: 'pfile', t: 'mcq', d: 1, q: 'How many groups is the CBSE Suggested Program List for Python divided into?', o: ['4', '2', '3', '6'], a: 0, ex: 'There are four groups: PRINT, INPUT, LIST, and IF/FOR/WHILE.' },
        { id: 'u5-07-q03', c: 'pfile', t: 'bins', d: 2, q: 'Sort each CBSE program into its group.', bins: ['PRINT', 'INPUT', 'LIST'], items: [['Square of the number 7', 0], ['Area of a triangle from base and height typed by the user', 1], ['Extend List_1 and sort it', 2], ['Simple interest with principal 2000, rate 4.5, time 10', 0], ['Average marks of 3 subjects typed by the user', 1], ['Delete “Vikram” from the science-quiz list', 2]], ex: 'PRINT programs use fixed values, INPUT programs read values with input(), and LIST programs work with Python lists.' },
        { id: 'u5-07-q04', c: 'pfile', t: 'tf', d: 2, q: 'Testing a program with just one input value is enough to be sure it is correct.', a: false, ex: 'One value tests one path. Test every branch and the boundary values (such as exactly 18) to catch hidden bugs.' },
        { id: 'u5-07-q05', c: 'pfile', t: 'mcq', d: 2, q: 'Which set of test ages best checks the voting program (18 or older can vote)?', o: ['17, 18 and 30', '30, 40 and 50', '18 only', '5, 6 and 7'], a: 0, mis: { 1: 'These all take the “can vote” path; the other branch is never tested.', 3: 'These all take the “cannot vote” path, and the boundary 18 is never tested.' }, ex: 'A good test set covers both branches and the exact boundary: 17 (no), 18 (yes, the boundary) and 30 (yes).' },
        { id: 'u5-07-q06', c: 'pfile', t: 'mcq', d: 3, q: 'Grade bands are 90+ A, 75+ B, 60+ C, 40+ D, below 40 E. Which test marks check every band?', o: ['95, 80, 65, 50, 20', '95, 92, 91, 90, 99', '95, 80, 65, 50', '50, 20'], a: 0, mis: { 1: 'All of these are grade A, so B to E are never tested.', 2: 'No mark below 40 is tested, so the E branch is never checked.' }, ex: 'One mark from each band (A, B, C, D, E) runs every branch of the if-elif-else chain at least once.' },
        // ipo
        { id: 'u5-07-q07', c: 'ipo', t: 'order', d: 1, q: 'Put the steps of the discount program in order.', items: ['Read the price and discount percent with input()', 'Calculate discount = price * discount_percent / 100', 'Calculate amount = price - discount', 'Display the discount and the amount to pay'], ex: 'Input first, then the calculations in the order they depend on each other, then output.' },
        { id: 'u5-07-q08', c: 'ipo', t: 'match', d: 2, q: 'Match each program to the inputs it needs.', pairs: [['Area of a rectangle', 'length and breadth'], ['Area of a triangle', 'base and height'], ['Volume of a cuboid', 'length, breadth and height'], ['Simple interest', 'principal, rate and time']], ex: 'Planning starts by listing the inputs each formula needs.' },
        { id: 'u5-07-q09', c: 'ipo', t: 'mcq', d: 2, q: 'What is the output?', code: `principal_amount = 2000
rate_of_interest = 4.5
time = 10
si = principal_amount * rate_of_interest * time / 100
print(si)`, o: ['900.0', '900', '90000.0', '9000.0'], a: 0, mis: { 1: 'The / operator (and the float 4.5) make the answer a float: 900.0.', 2: '90000.0 is before dividing by 100.' }, ex: '2000 × 4.5 × 10 = 90000.0, and ÷ 100 = 900.0 (a float).' },
        { id: 'u5-07-q10', c: 'ipo', t: 'mcq', d: 2, q: 'Which line correctly calculates the area of a triangle in Python?', o: ['area = 0.5 * base * height', 'area = 1/2 base * height', 'area = base * height / 0.5', 'area = (base + height) / 2'], a: 0, mis: { 1: 'Python needs a * between 1/2 and base; this line is a SyntaxError.', 2: 'Dividing by 0.5 doubles the value instead of halving it.' }, ex: 'Area = ½ × base × height, written with every * shown: 0.5 * base * height.' },
        { id: 'u5-07-q11', c: 'ipo', t: 'mcq', d: 3, q: 'What is the output?', code: `l = 5
b = 3
h = 2
print(2 * (l*b + b*h + h*l), l * b * h)`, o: ['62 30', '31 30', '62 10', '30 62'], a: 0, mis: { 1: '31 is l*b + b*h + h*l without multiplying by 2.' }, ex: 'Surface area = 2 × (15 + 6 + 10) = 62; volume = 5 × 3 × 2 = 30.' },
        { id: 'u5-07-q12', c: 'ipo', t: 'mcq', d: 3, q: 'What is the output?', code: `price = 800
discount_percent = 15
discount = price * discount_percent / 100
print(price - discount)`, o: ['680.0', '680', '120.0', '785'], a: 0, mis: { 2: '120.0 is the discount. The program prints the amount left to pay.', 3: '785 subtracts 15 rupees, not 15 percent.' }, ex: 'discount = 800 × 15 / 100 = 120.0, and 800 − 120.0 = 680.0.' },
        { id: 'u5-07-q13', c: 'ipo', t: 'num', d: 2, q: 'What number does this print?', code: `length = 12
breadth = 5
print(2 * (length + breadth))`, a: 34, ex: 'Perimeter = 2 × (12 + 5) = 2 × 17 = 34.' },
        // debug
        { id: 'u5-07-q14', c: 'debug', t: 'match', d: 2, q: 'Match each error to its usual cause.', pairs: [['SyntaxError', 'A missing bracket, quote or colon'], ['NameError', 'A variable name that is misspelt or never created'], ['TypeError', 'Mixing types, such as adding a str and an int'], ['ZeroDivisionError', 'Dividing a number by 0'], ['IndexError', 'Using a list position that does not exist']], ex: 'The error name tells you the kind of mistake, which makes it much quicker to find.' },
        { id: 'u5-07-q15', c: 'debug', t: 'mcq', d: 2, q: 'Which error does line 3 cause?', code: `marks = [80, 90]
total = marks[0] + marks[1]
average = total / len(Marks)`, o: ['NameError, because Marks (capital M) was never created', 'IndexError, because the list has only 2 items', 'ZeroDivisionError, because the list is empty', 'TypeError, because total is a list'], a: 0, mis: { 1: 'Indexes 0 and 1 both exist in a 2-item list.' }, ex: 'Python is case-sensitive: the list is called marks, so Marks is an unknown name.' },
        { id: 'u5-07-q16', c: 'debug', t: 'mcq', d: 3, q: 'Meera runs this and types 5. What goes wrong?', code: `km = input("Distance in km: ")
metres = km * 1000`, o: ['km is a string, so km * 1000 repeats the text "5" 1000 times', 'TypeError: a string cannot be multiplied', 'Nothing: metres becomes 5000', 'Nothing: metres becomes 5000.0'], a: 0, mis: { 1: 'A string times an int is allowed in Python: it repeats the text. That is why no error appears.', 2: 'input() returned the text "5", not the number 5.' }, ex: 'Multiplying a string by an int repeats it, so this is a logic error with no error message. Use km = float(input(...)).' },
        { id: 'u5-07-q17', c: 'debug', t: 'mcq', d: 2, q: 'What is missing in line 1?', code: `if marks >= 33
    result = "Pass"`, o: ['A colon at the end of the line', 'A semicolon at the end of the line', 'Quotes around 33', 'Brackets around the whole line'], a: 0, mis: { 1: 'Python does not use semicolons to end if lines; it needs a colon.' }, ex: 'Every if, elif, else, for and while line must end with a colon; without it you get a SyntaxError.' },
        { id: 'u5-07-q18', c: 'debug', t: 'mcq', d: 3, q: 'Isha wants every odd number from 1 to n. For n = 9 her program misses 9. Which fix works?', code: `n = int(input("Enter n: "))
for i in range(1, n, 2):
    print(i)`, o: ['Change range(1, n, 2) to range(1, n + 1, 2)', 'Change range(1, n, 2) to range(0, n, 2)', 'Change int to float', 'Change the step 2 to 1'], a: 0, mis: { 1: 'Starting at 0 with step 2 gives even numbers.', 3: 'A step of 1 would include the even numbers too.' }, ex: 'The stop value is excluded, so range(1, 9, 2) stops at 7. Using n + 1 as the stop includes n when n is odd.' },
        { id: 'u5-07-q19', c: 'debug', t: 'tf', d: 1, q: 'A Python error message usually tells you the line number where the problem was found.', a: true, ex: 'The message shows the line number and the error type, which tells you where to start looking.' },
        { id: 'u5-07-q20', c: 'debug', t: 'mcq', d: 2, q: 'What happens when Python runs <code>int("12.5")</code>?', o: ['ValueError, because "12.5" is not a whole number; use float() instead', 'It gives 12', 'It gives 13', 'It gives 12.5'], a: 0, mis: { 1: 'int() can convert the float 12.5 to 12, but it cannot read the TEXT "12.5".' }, ex: 'int() only accepts text that looks like a whole number. float("12.5") works.' },
        { id: 'u5-07-q21', c: 'debug', t: 'multi', d: 3, q: 'Select all that apply. Which of these lines stop with an error?', o: ['print("Total: " + 50)', 'print(10 / 0)', 'Print("Hi")', 'print("Total:", 50)', 'print(10 // 3)'], a: [0, 1, 2], ex: 'Joining str and int is a TypeError, dividing by zero is a ZeroDivisionError, and Print is a NameError. A comma in print and // are fine.' },
        // mixed
        { id: 'u5-07-q22', c: 'mixed', t: 'mcq', d: 2, q: 'What is the output?', code: `marks = [72, 64, 90]
total = sum(marks)
percent = total / 3
if percent >= 33:
    print("Pass", total)
else:
    print("Fail", total)`, o: ['Pass 226', 'Fail 226', 'Pass 75.33', 'Pass 226.0'], a: 0, mis: { 2: 'The program prints total (226), not the percentage.', 3: 'sum() of ints is an int, so total has no .0.' }, ex: 'total = 226 and percent ≈ 75.3, which is at least 33, so it prints Pass 226.' },
        { id: 'u5-07-q23', c: 'mixed', t: 'mcq', d: 3, q: 'Bill slabs: up to 100 units ₹5 each; 101–200: ₹500 + ₹7 per unit above 100; above 200: ₹1200 + ₹10 per unit above 200. What is the output?', code: `units = 150
if units <= 100:
    bill = units * 5
elif units <= 200:
    bill = 500 + (units - 100) * 7
else:
    bill = 1200 + (units - 200) * 10
print(bill)`, o: ['850', '750', '1050', '1200'], a: 0, mis: { 1: '750 charges all 150 units at ₹5. Only the first 100 are at ₹5.', 2: '1050 charges all 150 units at ₹7.' }, ex: '150 is in the middle slab: 500 + (150 − 100) × 7 = 500 + 350 = 850.' },
        { id: 'u5-07-q24', c: 'mixed', t: 'mcq', d: 2, q: 'What is the output?', code: `for i in range(1, 4):
    print("5 x", i, "=", 5 * i)`, o: ['5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15', '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20', '5 x 0 = 0\n5 x 1 = 5\n5 x 2 = 10', '5\n10\n15'], a: 0, mis: { 1: 'range(1, 4) stops before 4.' }, ex: 'i takes 1, 2, 3, so three lines of the table of 5 are printed.' },
        { id: 'u5-07-q25', c: 'mixed', t: 'mcq', d: 3, q: 'What is the output?', code: `expenses = [40, 75, 20, 60]
big = 0
for e in expenses:
    if e > 50:
        big += 1
print(sum(expenses), big)`, o: ['195 2', '195 3', '135 2', '4 2'], a: 0, mis: { 1: 'Only 75 and 60 are more than 50.', 3: '4 is the number of items; sum() adds their values.' }, ex: 'The total is 40 + 75 + 20 + 60 = 195, and two values (75, 60) are above 50.' },
        { id: 'u5-07-q26', c: 'mixed', t: 'mcq', d: 1, q: 'What is the output?', code: `print("* * *")
print("* *")
print("*")`, o: ['* * *\n* *\n*', '*\n* *\n* * *', '***\n**\n*', '* * * * * *'], a: 0, ex: 'Each print() shows its string exactly, spaces included, on its own line.' },
        { id: 'u5-07-q27', c: 'mixed', t: 'tf', d: 2, q: 'Adding 1 to every item of [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] gives the odd numbers from 3 to 21.', a: true, ex: 'Each even number plus 1 is the next odd number, so the list becomes [3, 5, 7, …, 21].' },
        { id: 'u5-07-q28', c: 'mixed', t: 'mcq', d: 2, q: 'What is the output?', code: `num = [23, 12, 5, 9, 65, 44]
print(len(num))
print(num[1:4])
print(num[-4:-1])`, o: ['6\n[12, 5, 9]\n[5, 9, 65]', '6\n[23, 12, 5]\n[5, 9, 65]', '5\n[12, 5, 9]\n[5, 9, 65]', '6\n[12, 5, 9, 65]\n[9, 65, 44]'], a: 0, mis: { 1: 'Index 1 is the 2nd item (12), so the first slice starts at 12.', 2: 'len() counts all 6 items; 5 is the last index.' }, ex: 'There are 6 items; [1:4] gives indexes 1–3 (12, 5, 9); [-4:-1] gives 5, 9, 65.' },
        { id: 'u5-07-q29', c: 'mixed', t: 'mcq', d: 3, q: 'What is the output?', code: `List_1 = [10, 20, 30, 40]
List_1.extend([14, 15, 12])
List_1.sort()
print(List_1)`, o: ['[10, 12, 14, 15, 20, 30, 40]', '[10, 20, 30, 40, 14, 15, 12]', '[10, 20, 30, 40, [14, 15, 12]]', '[40, 30, 20, 15, 14, 12, 10]'], a: 0, mis: { 1: 'The list was sorted after extending, so it is in ascending order.', 2: 'extend adds the items one by one; append would add the list as one item.' }, ex: 'extend adds 14, 15 and 12 to the end, then sort() arranges all seven numbers in ascending order.' }
      ]
    }
  ]
};
