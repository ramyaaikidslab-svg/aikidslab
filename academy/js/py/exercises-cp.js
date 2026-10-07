// Capstone (cp-02) — HelpBot, a rule-based school-helpdesk chatbot built in 7 steps.
// Schema: docs/PYTHON_SPEC.md. Each step builds on the one before. The facts HelpBot
// gives are about an imaginary school, so every reply is fixed text and match: 'exact' is fair.
// input() prompts are echoed into the output (with the typed value), so tasks state each prompt exactly.

export default [
  {
    id: 'py-bot-1',
    topic: 'cp-02',
    title: 'HelpBot says hello',
    task: `<p>Every chatbot starts with a greeting. Ask the user’s name with the prompt <code>What is your name? </code> (note the space after the question mark), then print exactly these two lines:</p>
<pre class="code">Bot: Hello, Riya! I am HelpBot, your school helpdesk.
Bot: Ask me about school timings, the library or the canteen.</pre>
<p>Use the name the user typed in place of <b>Riya</b>. A full run looks like this when the user types Riya:</p>
<pre class="code">What is your name? Riya
Bot: Hello, Riya! I am HelpBot, your school helpdesk.
Bot: Ask me about school timings, the library or the canteen.</pre>`,
    starter: `# HelpBot step 1: greet the user by name
name = input("What is your name? ")
`,
    tests: [{ inputs: ['Riya'] }, { inputs: ['Kabir'] }, { inputs: ['Sana'] }],
    match: 'exact',
    need: { calls: ['input', 'print'] },
    hints: [
      'input() gives back whatever the user typed, as a string. You already stored it in name.',
      'Join strings with +, for example "Bot: Hello, " + name + "!"',
      'print("Bot: Hello, " + name + "! I am HelpBot, your school helpdesk.")'
    ],
    solution: `name = input("What is your name? ")
print("Bot: Hello, " + name + "! I am HelpBot, your school helpdesk.")
print("Bot: Ask me about school timings, the library or the canteen.")
`
  },
  {
    id: 'py-bot-2',
    topic: 'cp-02',
    title: 'Answer one question with keyword rules',
    task: `<p>Now HelpBot answers <b>one</b> question. Ask with the prompt <code>You: </code> and look for a <b>keyword</b> inside the question. The <code>in</code> operator checks whether one string appears inside another: <code>"library" in "where is the library"</code> is <code>True</code>.</p>
<p>Check the rules in this order with <code>if</code> / <code>elif</code> / <code>else</code> and print exactly one reply:</p>
<table class="tbl"><thead><tr><th>If the question contains</th><th>Print</th></tr></thead><tbody>
<tr><td><code>timing</code></td><td><code>Bot: School runs from 8:00 am to 2:30 pm, Monday to Saturday.</code></td></tr>
<tr><td><code>library</code></td><td><code>Bot: The library is on the first floor. It is open from 9 am to 4 pm.</code></td></tr>
<tr><td><code>canteen</code></td><td><code>Bot: The canteen is next to the playground. Lunch break is at 11:30 am.</code></td></tr>
<tr><td>none of these keywords</td><td><code>Bot: Sorry, I don't know that yet. Please ask at the school office.</code></td></tr>
</tbody></table>
<p>Example run:</p>
<pre class="code">You: where is the library
Bot: The library is on the first floor. It is open from 9 am to 4 pm.</pre>`,
    starter: `# HelpBot step 2: one question, keyword rules
question = input("You: ")
# Rule 1: if "timing" is in the question ...
`,
    tests: [
      { inputs: ['where is the library'] },
      { inputs: ['what are the school timings?'] },
      { inputs: ['is the canteen open today'] },
      { inputs: ['can I bring my pet dog'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['If', 'Compare'] },
    hints: [
      'Each rule is a condition like "timing" in question.',
      'Start with if "timing" in question: then use elif for library and canteen, and else for the sorry reply.',
      'if "timing" in question:\n    print("Bot: School runs from 8:00 am to 2:30 pm, Monday to Saturday.")\nelif "library" in question:\n    ...'
    ],
    solution: `question = input("You: ")
if "timing" in question:
    print("Bot: School runs from 8:00 am to 2:30 pm, Monday to Saturday.")
elif "library" in question:
    print("Bot: The library is on the first floor. It is open from 9 am to 4 pm.")
elif "canteen" in question:
    print("Bot: The canteen is next to the playground. Lunch break is at 11:30 am.")
else:
    print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
`
  },
  {
    id: 'py-bot-3',
    topic: 'cp-02',
    title: 'Keep chatting until "bye"',
    task: `<p>A real helpdesk answers many questions. Use a <code>while</code> loop so HelpBot keeps asking <code>You: </code> and replying (same rules and replies as step 2) <b>until the user types exactly</b> <code>bye</code>.</p>
<ol>
<li>Before the loop, print <code>Bot: Hi! I am HelpBot. Type bye to stop.</code></li>
<li>Ask the first question with <code>input("You: ")</code>.</li>
<li>While the question is not <code>"bye"</code>: reply using the rules, then ask again with <code>input("You: ")</code>.</li>
<li>After the loop, print <code>Bot: Goodbye! Have a great day.</code></li>
</ol>
<p>Do not reply to <code>bye</code> itself. Example run:</p>
<pre class="code">Bot: Hi! I am HelpBot. Type bye to stop.
You: where is the library
Bot: The library is on the first floor. It is open from 9 am to 4 pm.
You: what are the timings
Bot: School runs from 8:00 am to 2:30 pm, Monday to Saturday.
You: bye
Bot: Goodbye! Have a great day.</pre>`,
    starter: `# HelpBot step 3: keep chatting until the user types bye
print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
# while ... :
#     put your step 2 rules here (indented)
#     ask the next question
`,
    tests: [
      { inputs: ['where is the library', 'what are the timings', 'bye'] },
      { inputs: ['bye'] },
      { inputs: ['is the canteen open', 'do you like cricket', 'bye'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['While', 'If'] },
    hints: [
      'The loop condition is question != "bye".',
      'The last line inside the loop must ask again: question = input("You: "). Without it the loop never ends.',
      'while question != "bye":\n    if "timing" in question:\n        ...\n    question = input("You: ")\nprint("Bot: Goodbye! Have a great day.")'
    ],
    solution: `print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
while question != "bye":
    if "timing" in question:
        print("Bot: School runs from 8:00 am to 2:30 pm, Monday to Saturday.")
    elif "library" in question:
        print("Bot: The library is on the first floor. It is open from 9 am to 4 pm.")
    elif "canteen" in question:
        print("Bot: The canteen is next to the playground. Lunch break is at 11:30 am.")
    else:
        print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
    question = input("You: ")
print("Bot: Goodbye! Have a great day.")
`
  },
  {
    id: 'py-bot-4',
    topic: 'cp-02',
    title: 'Store the FAQ rules in lists',
    task: `<p>Adding one <code>elif</code> per topic gets long. Store the rules as data instead: a list of <b>keywords</b> and a list of <b>answers</b> in the same order (the starter has them — do not change the text). <code>answers[0]</code> is the reply for <code>keywords[0]</code>, and so on.</p>
<p>Ask <b>one</b> question with <code>input("You: ")</code>. Loop through the keyword list with <code>for</code>. For <b>every</b> keyword found in the question, print <code>Bot: </code> followed by its answer (in list order). If no keyword was found, print <code>Bot: Sorry, I don't know that yet. Please ask at the school office.</code></p>
<p>Example run (two keywords, so two replies):</p>
<pre class="code">You: when is the exam fee due
Bot: The exam timetable is on the notice board and in the school app.
Bot: Fees can be paid at the school office or online in the school app.</pre>`,
    starter: `# HelpBot step 4: rules stored in lists
keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
question = input("You: ")
found = False
# for i in range(len(keywords)):
`,
    tests: [
      { inputs: ['when is the exam fee due'] },
      { inputs: ['where is the library'] },
      { inputs: ['hello there'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['For', 'List', 'If', 'Subscript'] },
    hints: [
      'for i in range(len(keywords)): gives i = 0, 1, 2, 3, 4 — use keywords[i] and answers[i].',
      'Set found = True whenever a keyword matches. After the loop, if not found: print the sorry reply.',
      'for i in range(len(keywords)):\n    if keywords[i] in question:\n        print("Bot: " + answers[i])\n        found = True'
    ],
    solution: `keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
question = input("You: ")
found = False
for i in range(len(keywords)):
    if keywords[i] in question:
        print("Bot: " + answers[i])
        found = True
if not found:
    print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
`
  },
  {
    id: 'py-bot-5',
    topic: 'cp-02',
    title: 'Loop over the lists and count questions',
    task: `<p>Put it together: the list rules from step 4 inside the <code>while</code> loop from step 3. Also <b>count</b> how many questions the user asked (every message except <code>bye</code>) in a variable <code>count</code> that starts at 0.</p>
<ol>
<li>Print <code>Bot: Hi! I am HelpBot. Type bye to stop.</code> and ask <code>input("You: ")</code>.</li>
<li>While the message is not <code>bye</code>: add 1 to <code>count</code>, reply with the list rules exactly as in step 4, then ask again.</li>
<li>After the loop print <code>Bot: Questions asked: </code> followed by the count, then <code>Bot: Goodbye! Have a great day.</code></li>
</ol>
<p>Example run:</p>
<pre class="code">Bot: Hi! I am HelpBot. Type bye to stop.
You: fee
Bot: Fees can be paid at the school office or online in the school app.
You: how old are you
Bot: Sorry, I don't know that yet. Please ask at the school office.
You: canteen menu
Bot: The canteen is next to the playground. Lunch break is at 11:30 am.
You: bye
Bot: Questions asked: 3
Bot: Goodbye! Have a great day.</pre>`,
    starter: `# HelpBot step 5: lists + loop + a question counter
keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
`,
    tests: [
      { inputs: ['fee', 'how old are you', 'canteen menu', 'bye'] },
      { inputs: ['bye'] },
      { inputs: ['library timings', 'exam', 'bye'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['While', 'For', 'If'] },
    hints: [
      'Inside the while loop: count = count + 1, then set found = False before the for loop, so each question starts fresh.',
      'print() with + needs strings: "Bot: Questions asked: " + str(count)',
      'while question != "bye":\n    count = count + 1\n    found = False\n    for i in range(len(keywords)):\n        ...\n    question = input("You: ")'
    ],
    solution: `keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
while question != "bye":
    count = count + 1
    found = False
    for i in range(len(keywords)):
        if keywords[i] in question:
            print("Bot: " + answers[i])
            found = True
    if not found:
        print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
    question = input("You: ")
print("Bot: Questions asked: " + str(count))
print("Bot: Goodbye! Have a great day.")
`
  },
  {
    id: 'py-bot-6',
    topic: 'cp-02',
    title: 'A help menu and a list of unanswered questions',
    task: `<p>A rule-based bot cannot learn new answers by itself — a person has to add rules. So HelpBot should <b>remember the questions it could not answer</b> and hand them to the school office. Start from your step 5 program and add two things:</p>
<ol>
<li><b>Help menu.</b> If the message is exactly <code>help</code>, print <code>Bot: I know about these topics:</code> and then each keyword on its own line as <code>- timing</code>, <code>- library</code> … (use a <code>for</code> loop over <code>keywords</code>). <code>help</code> still counts as a question.</li>
<li><b>Unanswered list.</b> Make an empty list <code>unknown = []</code>. When no keyword matches, print the sorry reply <b>and</b> <code>append</code> the question to <code>unknown</code>.</li>
</ol>
<p>After the loop print, in this order: <code>Bot: Questions asked: </code> + count; then, <b>only if</b> <code>unknown</code> is not empty, <code>Bot: Questions to pass on to the office:</code> followed by each one as <code>- </code> + question; finally <code>Bot: Goodbye! Have a great day.</code></p>
<pre class="code">Bot: Hi! I am HelpBot. Type bye to stop.
You: help
Bot: I know about these topics:
- timing
- library
- canteen
- exam
- fee
You: is there a bus service
Bot: Sorry, I don't know that yet. Please ask at the school office.
You: exam
Bot: The exam timetable is on the notice board and in the school app.
You: bye
Bot: Questions asked: 3
Bot: Questions to pass on to the office:
- is there a bus service
Bot: Goodbye! Have a great day.</pre>`,
    starter: `# HelpBot step 6: help menu + remember unanswered questions
keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
unknown = []
print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
`,
    tests: [
      { inputs: ['help', 'is there a bus service', 'exam', 'bye'] },
      { inputs: ['library', 'canteen timing', 'bye'] },
      { inputs: ['what is the dress code', 'who is the principal', 'bye'] },
      { inputs: ['bye'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['While', 'For', 'If'], methods: ['append'] },
    hints: [
      'Inside the loop use if question == "help": … else: (the keyword rules from step 5).',
      'Check whether the list is empty with if len(unknown) > 0:',
      'if not found:\n    print("Bot: Sorry, I don\'t know that yet. Please ask at the school office.")\n    unknown.append(question)'
    ],
    solution: `keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
unknown = []
print("Bot: Hi! I am HelpBot. Type bye to stop.")
question = input("You: ")
while question != "bye":
    count = count + 1
    if question == "help":
        print("Bot: I know about these topics:")
        for word in keywords:
            print("- " + word)
    else:
        found = False
        for i in range(len(keywords)):
            if keywords[i] in question:
                print("Bot: " + answers[i])
                found = True
        if not found:
            print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
            unknown.append(question)
    question = input("You: ")
print("Bot: Questions asked: " + str(count))
if len(unknown) > 0:
    print("Bot: Questions to pass on to the office:")
    for q in unknown:
        print("- " + q)
print("Bot: Goodbye! Have a great day.")
`
  },
  {
    id: 'py-bot-7',
    topic: 'cp-02',
    title: 'Final HelpBot: names, capitals and a tidy finish',
    task: `<p>Your final version. Users type <code>Library</code>, <code>BYE</code> or <code>Where is the CANTEEN?</code> — a keyword rule written in small letters misses these. Fix it with the string method <code>.lower()</code>, which gives a copy of the text in small letters: <code>"Where is the LIBRARY".lower()</code> is <code>"where is the library"</code>.</p>
<p>Start from step 6 and change only these parts:</p>
<ol>
<li>First ask <code>input("What is your name? ")</code>, then print <code>Bot: Hello, Riya! I am HelpBot, your school helpdesk.</code> (with the user’s name) and <code>Bot: Ask me a question, type help for topics, or bye to stop.</code> — these two lines replace the old “Hi!” line.</li>
<li>Every <code>input("You: ")</code> becomes <code>input("You: ").lower()</code>, so <code>help</code>, <code>bye</code> and the keywords work in any capitals. The unanswered list stores the small-letter version.</li>
<li>The last line becomes <code>Bot: Goodbye, Riya! Have a great day.</code> (with the user’s name).</li>
</ol>
<p>Everything else (help menu, replies, count, unanswered list) stays exactly as in step 6.</p>
<pre class="code">What is your name? Arjun
Bot: Hello, Arjun! I am HelpBot, your school helpdesk.
Bot: Ask me a question, type help for topics, or bye to stop.
You: Where is the LIBRARY?
Bot: The library is on the first floor. It is open from 9 am to 4 pm.
You: Is there a Bus?
Bot: Sorry, I don't know that yet. Please ask at the school office.
You: BYE
Bot: Questions asked: 2
Bot: Questions to pass on to the office:
- is there a bus?
Bot: Goodbye, Arjun! Have a great day.</pre>`,
    starter: `# HelpBot final version
keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
unknown = []
name = input("What is your name? ")
`,
    tests: [
      { inputs: ['Arjun', 'Where is the LIBRARY?', 'Is there a Bus?', 'BYE'] },
      { inputs: ['Meera', 'HELP', 'Exam Fee', 'Bye'] },
      { inputs: ['Ayaan', 'bye'] }
    ],
    match: 'exact',
    need: { calls: ['input', 'print'], nodes: ['While', 'For', 'If'], methods: ['lower', 'append'] },
    hints: [
      'Write question = input("You: ").lower() in both places: before the loop and at the end of the loop.',
      'Use name only in the greeting and the goodbye: "Bot: Goodbye, " + name + "! Have a great day."',
      'The name itself is not lowered — only the questions are.'
    ],
    solution: `keywords = ["timing", "library", "canteen", "exam", "fee"]
answers = [
    "School runs from 8:00 am to 2:30 pm, Monday to Saturday.",
    "The library is on the first floor. It is open from 9 am to 4 pm.",
    "The canteen is next to the playground. Lunch break is at 11:30 am.",
    "The exam timetable is on the notice board and in the school app.",
    "Fees can be paid at the school office or online in the school app."
]
count = 0
unknown = []
name = input("What is your name? ")
print("Bot: Hello, " + name + "! I am HelpBot, your school helpdesk.")
print("Bot: Ask me a question, type help for topics, or bye to stop.")
question = input("You: ").lower()
while question != "bye":
    count = count + 1
    if question == "help":
        print("Bot: I know about these topics:")
        for word in keywords:
            print("- " + word)
    else:
        found = False
        for i in range(len(keywords)):
            if keywords[i] in question:
                print("Bot: " + answers[i])
                found = True
        if not found:
            print("Bot: Sorry, I don't know that yet. Please ask at the school office.")
            unknown.append(question)
    question = input("You: ").lower()
print("Bot: Questions asked: " + str(count))
if len(unknown) > 0:
    print("Bot: Questions to pass on to the office:")
    for q in unknown:
        print("- " + q)
print("Bot: Goodbye, " + name + "! Have a great day.")
`
  }
];
