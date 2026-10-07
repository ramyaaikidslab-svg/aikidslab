// Unit 5 Python exercises. Schema and grading rules: docs/PYTHON_SPEC.md.
// Every program in the CBSE Suggested Program List (Part C) appears exactly once
// with its `practical` group; the rest are extra graded practice.
// Solutions are written at column 0 inside template strings so that Python
// indentation is exact. tools/check_exercises.py runs every solution.
import CP from './exercises-cp.js';

const U5 = [
  // ───────────────────────── u5-01 Programming and Python ─────────────────────────
  {
    id: 'py-hello',
    topic: 'u5-01',
    title: 'Your first line of Python',
    task: `<p>Make Python greet you. Print exactly this one line:</p>
<pre class="code">Hello, Python!</pre>
<p>Then click <b>Run</b> and check the output panel.</p>`,
    starter: `# Type your first line of Python below this comment
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'] },
    hints: [
      'Use print( ) and put the words inside quotes, so Python knows they are text.',
      'Check the comma and the exclamation mark: they are part of the text.',
      'print("Hello, Python!")'
    ],
    solution: `print("Hello, Python!")
`
  },
  {
    id: 'py-three-lines',
    topic: 'u5-01',
    title: 'Three lines, in order',
    task: `<p>Each <code>print()</code> starts a new line, and Python runs your lines from top to bottom. Print exactly these three lines, in this order:</p>
<pre class="code">My name is Robo.
I can learn Python.
Let's code!</pre>
<p>Careful: the last line contains an apostrophe ( ' ). Put that text inside <b>double</b> quotes.</p>`,
    starter: `# Use three print() lines
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'] },
    hints: [
      'Write three separate print( ) lines, one for each line of output.',
      'For the last line use double quotes on the outside: print("Let\'s code!")',
      'print("My name is Robo.")  then  print("I can learn Python.")  then  print("Let\'s code!")'
    ],
    solution: `print("My name is Robo.")
print("I can learn Python.")
print("Let's code!")
`
  },

  // ─────────────────── u5-02 print(), Variables and Data Types ───────────────────
  {
    id: 'py-personal-info',
    topic: 'u5-02',
    practical: 'PRINT',
    title: 'Print your personal information',
    task: `<p><b>CBSE practical:</b> print personal information like Name, Father's Name, Class and School Name.</p>
<p>Print exactly <b>four lines</b> in this order, using your own details (a made-up name is fine if you prefer):</p>
<pre class="code">Name: Riya Sharma
Father's Name: Rajesh Sharma
Class: 9
School: Kendriya Vidyalaya, Pune</pre>
<p>Use one <code>print()</code> for each line.</p>`,
    starter: `# Print your Name, Father's Name, Class and School on four lines
`,
    tests: [{ inputs: [] }],
    match: 'lines',
    need: { calls: ['print'] },
    hints: [
      'You need four print( ) statements, one per line.',
      'The line with Father\'s Name has an apostrophe, so use double quotes: print("Father\'s Name: ...")',
      'print("Name: Riya Sharma")\nprint("Father\'s Name: Rajesh Sharma")\nprint("Class: 9")\nprint("School: Kendriya Vidyalaya, Pune")'
    ],
    solution: `print("Name: Riya Sharma")
print("Father's Name: Rajesh Sharma")
print("Class: 9")
print("School: Kendriya Vidyalaya, Pune")
`
  },
  {
    id: 'py-stars-up',
    topic: 'u5-02',
    practical: 'PRINT',
    title: 'Star pattern: growing triangle',
    task: `<p><b>CBSE practical:</b> print this pattern using multiple print commands.</p>
<pre class="code">*
* *
* * *
* * * *
* * * * *</pre>
<p>Rules: 5 lines; line 1 has 1 star and each next line has one more; stars are separated by <b>one space</b>; no space before the first star.</p>`,
    starter: `# Print the growing star pattern, one print() per line
print("*")
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'] },
    hints: [
      'The first line is already there. Add four more print( ) lines.',
      'Line 2 is print("* *") with one space between the stars.',
      'print("*")\nprint("* *")\nprint("* * *")\nprint("* * * *")\nprint("* * * * *")'
    ],
    solution: `print("*")
print("* *")
print("* * *")
print("* * * *")
print("* * * * *")
`
  },
  {
    id: 'py-stars-down',
    topic: 'u5-02',
    practical: 'PRINT',
    title: 'Star pattern: shrinking triangle',
    task: `<p><b>CBSE practical:</b> print this pattern using multiple print commands.</p>
<pre class="code">* * * * *
* * * *
* * *
* *
*</pre>
<p>Rules: 5 lines; start with 5 stars and remove one star on each line; stars are separated by <b>one space</b>; no space before the first star.</p>`,
    starter: `# Print the shrinking star pattern, one print() per line
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'] },
    hints: [
      'It is the growing pattern upside down: start with the longest line.',
      'The first line is print("* * * * *") with single spaces between the stars.',
      'print("* * * * *")\nprint("* * * *")\nprint("* * *")\nprint("* *")\nprint("*")'
    ],
    solution: `print("* * * * *")
print("* * * *")
print("* * *")
print("* *")
print("*")
`
  },
  {
    id: 'py-sum-15-20',
    topic: 'u5-02',
    practical: 'PRINT',
    title: 'Sum of 15 and 20',
    task: `<p><b>CBSE practical:</b> find the sum of the two numbers 15 and 20.</p>
<p>The two numbers are already stored in variables <code>a</code> and <code>b</code>. Let Python do the adding with <code>a + b</code> (do not type 35 yourself) and print exactly:</p>
<pre class="code">The sum of 15 and 20 is 35</pre>`,
    starter: `a = 15
b = 20
# Print the sum using a + b
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'print( ) can show several items separated by commas; it puts one space between them.',
      'You can store the answer first: total = a + b',
      'print("The sum of", a, "and", b, "is", a + b)'
    ],
    solution: `a = 15
b = 20
total = a + b
print("The sum of", a, "and", b, "is", total)
`
  },
  {
    id: 'py-sticker-count',
    topic: 'u5-02',
    title: 'Update a variable',
    task: `<p>Diya has <b>{{c}}</b> stickers. Store this in a variable called <code>stickers</code> and print it. Her friend gives her 5 more: update the variable with <code>stickers = stickers + 5</code> and print it again. Then she gives 3 to her brother: update it with <code>stickers = stickers - 3</code> and print it a third time.</p>
<p>Each line must look like this (the first one is shown):</p>
<pre class="code">Stickers: {{c}}</pre>`,
    starter: `stickers = {{c}}
print("Stickers:", stickers)
# Add 5, print, then take away 3, print
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'A variable can be given a new value. Python works out the right side first, then stores it on the left.',
      'After stickers = stickers + 5, write print("Stickers:", stickers) again.',
      'stickers = stickers + 5\nprint("Stickers:", stickers)\nstickers = stickers - 3\nprint("Stickers:", stickers)'
    ],
    solution: `stickers = {{c}}
print("Stickers:", stickers)
stickers = stickers + 5
print("Stickers:", stickers)
stickers = stickers - 3
print("Stickers:", stickers)
`,
    params: { c: [10, 40] }
  },
  {
    id: 'py-types',
    topic: 'u5-02',
    title: 'What type is it?',
    task: `<p>Four variables are ready in the editor. Use <code>type()</code> inside <code>print()</code> to print the data type of each one, in this order: <code>age</code>, <code>height</code>, <code>name</code>, <code>is_student</code>.</p>
<p>Your output should be four lines, each like <code>&lt;class 'int'&gt;</code>.</p>`,
    starter: `age = 14
height = 1.62
name = "Kabir"
is_student = True
# Print the type of each variable, one per line
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'type'] },
    hints: [
      'type(age) gives the type; wrap it in print( ) to see it.',
      'Four lines: print(type(age)), then height, then name, then is_student.',
      'print(type(age))\nprint(type(height))\nprint(type(name))\nprint(type(is_student))'
    ],
    solution: `age = 14
height = 1.62
name = "Kabir"
is_student = True
print(type(age))
print(type(height))
print(type(name))
print(type(is_student))
`
  },

  // ─────────────────── u5-03 Operators, Expressions and input() ───────────────────
  {
    id: 'py-square-7',
    topic: 'u5-03',
    practical: 'PRINT',
    title: 'Square of 7',
    task: `<p><b>CBSE practical:</b> find the square of the number 7.</p>
<p>Use the power operator <code>**</code> (or <code>*</code>) so that Python calculates it, then print exactly:</p>
<pre class="code">Square of 7 is 49</pre>`,
    starter: `number = 7
# Calculate the square and print it
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'number ** 2 means number to the power 2.',
      'square = number ** 2',
      'print("Square of", number, "is", square)'
    ],
    solution: `number = 7
square = number ** 2
print("Square of", number, "is", square)
`
  },
  {
    id: 'py-km-to-m',
    topic: 'u5-03',
    practical: 'PRINT',
    title: 'Kilometres to metres',
    task: `<p><b>CBSE practical:</b> convert a length given in kilometres into metres. (1 km = 1000 m)</p>
<p>The distance is stored in <code>km</code>. Calculate <code>metres</code> and print one line in this form, with the number of metres in the blank:</p>
<pre class="code">{{k}} km = ____ m</pre>
<p>For example, for 3 km the line would be <code>3 km = 3000 m</code>.</p>`,
    starter: `km = {{k}}
# Calculate metres, then print the result
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'Multiply by 1000: metres = km * 1000',
      'Use commas in print( ) to put the number and the units together.',
      'print(km, "km =", metres, "m")'
    ],
    solution: `km = {{k}}
metres = km * 1000
print(km, "km =", metres, "m")
`,
    params: { k: [2, 25] }
  },
  {
    id: 'py-simple-interest',
    topic: 'u5-03',
    practical: 'PRINT',
    title: 'Simple interest',
    task: `<p><b>CBSE practical:</b> calculate Simple Interest when principal_amount = 2000, rate_of_interest = 4.5 and time = 10 (years).</p>
<div class="formula">Simple Interest = principal × rate × time ÷ 100</div>
<p>Store the three values in variables with these names, calculate the interest, and print it in this form:</p>
<pre class="code">Simple Interest = ...</pre>`,
    starter: `principal_amount = 2000
rate_of_interest = 4.5
time = 10
# Calculate simple interest and print it
`,
    tests: [{ inputs: [] }],
    match: 'numbers',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'Turn the formula into Python: use * for × and / for ÷.',
      'si = principal_amount * rate_of_interest * time / 100',
      'print("Simple Interest =", si)'
    ],
    solution: `principal_amount = 2000
rate_of_interest = 4.5
time = 10
si = principal_amount * rate_of_interest * time / 100
print("Simple Interest =", si)
`
  },
  {
    id: 'py-input-greet',
    topic: 'u5-03',
    title: 'Say hello to the user',
    task: `<p>The first line asks the user for their name with <code>input()</code>. Add code to print two lines. If the user types <code>Riya</code>, the output after the question must be:</p>
<pre class="code">Hello, Riya
Nice to meet you!</pre>
<p>Type a name in the <b>Input</b> box before you click Run. Keep the first line exactly as it is.</p>`,
    starter: `name = input("What is your name? ")
# Print the greeting on the next two lines
`,
    tests: [{ inputs: ['Riya'] }, { inputs: ['Kabir Singh'] }],
    match: 'exact',
    need: { calls: ['input', 'print'] },
    hints: [
      'The name the user typed is now stored in the variable name.',
      'print("Hello,", name) puts one space after the comma automatically.',
      'print("Hello,", name)\nprint("Nice to meet you!")'
    ],
    solution: `name = input("What is your name? ")
print("Hello,", name)
print("Nice to meet you!")
`
  },
  {
    id: 'py-next-year',
    topic: 'u5-03',
    title: 'Fix the age program',
    task: `<p>This program is meant to print the user's age next year, but it crashes with a <b>TypeError</b>. Why? <code>input()</code> always gives back a <b>string</b>, and Python cannot add the number 1 to text.</p>
<p>Fix it with <code>int()</code> so that, if the user types <code>14</code>, the last line is:</p>
<pre class="code">Next year you will be 15</pre>
<p>Keep the question text exactly as it is.</p>`,
    starter: `age = input("Enter your age: ")
next_year = age + 1
print("Next year you will be", next_year)
`,
    tests: [{ inputs: ['14'] }, { inputs: ['9'] }],
    match: 'exact',
    need: { calls: ['input', 'int', 'print'] },
    hints: [
      'Convert the text to a whole number before adding.',
      'Wrap input( ) inside int( ): age = int(input("Enter your age: "))',
      'age = int(input("Enter your age: "))\nnext_year = age + 1\nprint("Next year you will be", next_year)'
    ],
    solution: `age = int(input("Enter your age: "))
next_year = age + 1
print("Next year you will be", next_year)
`
  },
  {
    id: 'py-rectangle',
    topic: 'u5-03',
    practical: 'INPUT',
    title: 'Area and perimeter of a rectangle',
    task: `<p><b>CBSE practical:</b> calculate the area and perimeter of a rectangle.</p>
<p>The program already reads the length and breadth (whole numbers). Calculate:</p>
<div class="formula">Area = length × breadth &nbsp;·&nbsp; Perimeter = 2 × (length + breadth)</div>
<p>Print two lines in this order. For length 8 and breadth 5:</p>
<pre class="code">Area = 40
Perimeter = 26</pre>`,
    starter: `length = int(input("Enter the length: "))
breadth = int(input("Enter the breadth: "))
# Calculate area and perimeter, then print them
`,
    tests: [{ inputs: ['8', '5'] }, { inputs: ['12', '7'] }, { inputs: ['10', '10'] }],
    match: 'numbers',
    need: { calls: ['input', 'int', 'print'], nodes: ['BinOp'] },
    hints: [
      'area = length * breadth',
      'In Python you must write the * : perimeter = 2 * (length + breadth)',
      'print("Area =", area)\nprint("Perimeter =", perimeter)'
    ],
    solution: `length = int(input("Enter the length: "))
breadth = int(input("Enter the breadth: "))
area = length * breadth
perimeter = 2 * (length + breadth)
print("Area =", area)
print("Perimeter =", perimeter)
`
  },
  {
    id: 'py-triangle',
    topic: 'u5-03',
    practical: 'INPUT',
    title: 'Area of a triangle',
    task: `<p><b>CBSE practical:</b> calculate the area of a triangle from its base and height.</p>
<ol><li>Read the <b>base</b>, then the <b>height</b>, each with <code>float(input(...))</code> so decimals work. (Your question text can be any words, but keep numbers out of it.)</li>
<li>Calculate <code>area = 0.5 * base * height</code>.</li>
<li>Print one line. For base 10 and height 4:</li></ol>
<pre class="code">Area of triangle = 20.0</pre>`,
    starter: `# Read base and height with float(input(...))

# Calculate the area

# Print the area
`,
    tests: [{ inputs: ['10', '4'] }, { inputs: ['7', '5'] }, { inputs: ['6.5', '2'] }],
    match: 'numbers',
    need: { calls: ['input', 'float', 'print'], nodes: ['BinOp'] },
    hints: [
      'base = float(input("Enter the base: ")) and the same for height.',
      'Area of a triangle is half of base × height: area = 0.5 * base * height',
      'print("Area of triangle =", area)'
    ],
    solution: `base = float(input("Enter the base: "))
height = float(input("Enter the height: "))
area = 0.5 * base * height
print("Area of triangle =", area)
`
  },
  {
    id: 'py-average-marks',
    topic: 'u5-03',
    practical: 'INPUT',
    title: 'Average marks of 3 subjects',
    task: `<p><b>CBSE practical:</b> calculate the average marks of 3 subjects.</p>
<ol><li>Read the English, Maths and Science marks (whole numbers) in that order with <code>int(input(...))</code>. Keep numbers out of your question text.</li>
<li>Find the <code>total</code> and the <code>average</code> (total ÷ 3). Round the average to 2 decimal places with <code>round(average, 2)</code>.</li>
<li>Print two lines. For 80, 90 and 86:</li></ol>
<pre class="code">Total = 256
Average = 85.33</pre>`,
    starter: `english = int(input("Enter English marks: "))
# Read Maths and Science marks the same way

# Calculate total and average

# Print them
`,
    tests: [{ inputs: ['80', '90', '86'] }, { inputs: ['70', '80', '90'] }, { inputs: ['45', '67', '88'] }],
    match: 'numbers',
    need: { calls: ['input', 'int', 'print', 'round'], nodes: ['BinOp'] },
    hints: [
      'maths = int(input("Enter Maths marks: ")) and science the same way.',
      'Use brackets: average = (english + maths + science) / 3, or work out total first.',
      'total = english + maths + science\naverage = round(total / 3, 2)\nprint("Total =", total)\nprint("Average =", average)'
    ],
    solution: `english = int(input("Enter English marks: "))
maths = int(input("Enter Maths marks: "))
science = int(input("Enter Science marks: "))
total = english + maths + science
average = round(total / 3, 2)
print("Total =", total)
print("Average =", average)
`
  },

  // ─────────────────────── u5-04 Decisions with if, elif, else ───────────────────────
  {
    id: 'py-even-odd',
    topic: 'u5-04',
    title: 'Even or odd?',
    task: `<p>A number is even when it leaves remainder 0 on division by 2 (<code>n % 2 == 0</code>). The first line reads a whole number. Print one line:</p>
<pre class="code">8 is even</pre>
<p>or, for an odd number such as 7:</p>
<pre class="code">7 is odd</pre>`,
    starter: `n = int(input("Enter a number: "))
# Use if / else to print whether n is even or odd
`,
    tests: [{ inputs: ['8'] }, { inputs: ['7'] }, { inputs: ['0'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      'if n % 2 == 0:  (do not forget the colon)',
      'Indent the print under if, and under else.',
      'if n % 2 == 0:\n    print(n, "is even")\nelse:\n    print(n, "is odd")'
    ],
    solution: `n = int(input("Enter a number: "))
if n % 2 == 0:
    print(n, "is even")
else:
    print(n, "is odd")
`
  },
  {
    id: 'py-vote',
    topic: 'u5-04',
    practical: 'IF-FOR-WHILE',
    title: 'Can this person vote?',
    task: `<p><b>CBSE practical:</b> check if a person can vote. In India you can vote if you are <b>18 or older</b>.</p>
<p>The first line reads the age. Print exactly one of these lines:</p>
<pre class="code">You can vote.</pre>
<pre class="code">You cannot vote yet.</pre>
<p>Test with 20, 15 and exactly 18. (Is 18 allowed? Yes.)</p>`,
    starter: `age = int(input("Enter your age: "))
# Decide and print the message
`,
    tests: [{ inputs: ['20'] }, { inputs: ['15'] }, { inputs: ['18'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      '“18 or older” is age >= 18, not age > 18.',
      'Use if ... else: so that exactly one message is printed.',
      'if age >= 18:\n    print("You can vote.")\nelse:\n    print("You cannot vote yet.")'
    ],
    solution: `age = int(input("Enter your age: "))
if age >= 18:
    print("You can vote.")
else:
    print("You cannot vote yet.")
`
  },
  {
    id: 'py-sign',
    topic: 'u5-04',
    practical: 'IF-FOR-WHILE',
    title: 'Positive, negative or zero',
    task: `<p><b>CBSE practical:</b> input a number and check whether it is positive, negative or zero, and display an appropriate message.</p>
<p>The first line reads the number (decimals allowed). Print exactly one of:</p>
<pre class="code">The number is positive
The number is negative
The number is zero</pre>`,
    starter: `num = float(input("Enter a number: "))
# Use if / elif / else
`,
    tests: [{ inputs: ['25'] }, { inputs: ['-2.5'] }, { inputs: ['0'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      'There are three possibilities, so use if, elif and else.',
      'Positive means num > 0; negative means num < 0; whatever is left is zero.',
      'if num > 0:\n    print("The number is positive")\nelif num < 0:\n    print("The number is negative")\nelse:\n    print("The number is zero")'
    ],
    solution: `num = float(input("Enter a number: "))
if num > 0:
    print("The number is positive")
elif num < 0:
    print("The number is negative")
else:
    print("The number is zero")
`
  },
  {
    id: 'py-bigger',
    topic: 'u5-04',
    title: 'The larger of two numbers',
    task: `<p>The program reads two whole numbers. Print which is larger, like this:</p>
<pre class="code">The larger number is 9</pre>
<p>If the two numbers are the same, print instead:</p>
<pre class="code">Both numbers are equal</pre>`,
    starter: `a = int(input("Enter the first number: "))
b = int(input("Enter the second number: "))
# Compare a and b
`,
    tests: [{ inputs: ['5', '9'] }, { inputs: ['12', '3'] }, { inputs: ['4', '4'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      'Three cases: a > b, b > a, or equal.',
      'if a > b: ... elif b > a: ... else: ...',
      'if a > b:\n    print("The larger number is", a)\nelif b > a:\n    print("The larger number is", b)\nelse:\n    print("Both numbers are equal")'
    ],
    solution: `a = int(input("Enter the first number: "))
b = int(input("Enter the second number: "))
if a > b:
    print("The larger number is", a)
elif b > a:
    print("The larger number is", b)
else:
    print("Both numbers are equal")
`
  },
  {
    id: 'py-grade',
    topic: 'u5-04',
    practical: 'IF-FOR-WHILE',
    title: 'Grade of a student',
    task: `<p><b>CBSE practical:</b> check the grade of a student. Use these bands (marks out of 100):</p>
<table class="tbl"><thead><tr><th>Marks</th><th>Grade</th></tr></thead><tbody>
<tr><td>90 or more</td><td>A</td></tr><tr><td>75 to 89</td><td>B</td></tr><tr><td>60 to 74</td><td>C</td></tr><tr><td>40 to 59</td><td>D</td></tr><tr><td>below 40</td><td>E</td></tr></tbody></table>
<p>The first line reads the marks. Print one line, for example:</p>
<pre class="code">Grade: B</pre>`,
    starter: `marks = int(input("Enter marks out of 100: "))
# Use if / elif / else to find the grade
`,
    tests: [{ inputs: ['95'] }, { inputs: ['82'] }, { inputs: ['75'] }, { inputs: ['60'] }, { inputs: ['45'] }, { inputs: ['12'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      'Check the highest band first: if marks >= 90: ... then elif marks >= 75: ... and so on.',
      'Once one condition is True, Python skips the rest, so the order matters.',
      'if marks >= 90:\n    print("Grade: A")\nelif marks >= 75:\n    print("Grade: B")\nelif marks >= 60:\n    print("Grade: C")\nelif marks >= 40:\n    print("Grade: D")\nelse:\n    print("Grade: E")'
    ],
    solution: `marks = int(input("Enter marks out of 100: "))
if marks >= 90:
    print("Grade: A")
elif marks >= 75:
    print("Grade: B")
elif marks >= 60:
    print("Grade: C")
elif marks >= 40:
    print("Grade: D")
else:
    print("Grade: E")
`
  },

  // ─────────────────────────── u5-05 Loops with for and while ───────────────────────────
  {
    id: 'py-natural-10',
    topic: 'u5-05',
    practical: 'IF-FOR-WHILE',
    title: 'First 10 natural numbers',
    task: `<p><b>CBSE practical:</b> print the first 10 natural numbers.</p>
<p>Use a <code>for</code> loop with <code>range()</code> to print 1, 2, 3, … 10, <b>each on its own line</b>.</p>`,
    starter: `# Print 1 to 10 using a for loop
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'range'], nodes: ['For'] },
    hints: [
      'range(1, 11) gives 1 up to 10, because the stop value is never included.',
      'for i in range(1, 11):',
      'for i in range(1, 11):\n    print(i)'
    ],
    solution: `for i in range(1, 11):
    print(i)
`
  },
  {
    id: 'py-even-10',
    topic: 'u5-05',
    practical: 'IF-FOR-WHILE',
    title: 'First 10 even numbers',
    task: `<p><b>CBSE practical:</b> print the first 10 even numbers.</p>
<p>Use a <code>for</code> loop to print 2, 4, 6, … 20, <b>each on its own line</b> (10 numbers in total).</p>`,
    starter: `# Print the first 10 even numbers using a for loop
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'range'], nodes: ['For'] },
    hints: [
      'range(start, stop, step): a step of 2 jumps two at a time.',
      'Start at 2 and stop after 20, so the stop value must be 21 (or 22).',
      'for i in range(2, 21, 2):\n    print(i)'
    ],
    solution: `for i in range(2, 21, 2):
    print(i)
`
  },
  {
    id: 'py-odd-to-n',
    topic: 'u5-05',
    practical: 'IF-FOR-WHILE',
    title: 'Odd numbers from 1 to n',
    task: `<p><b>CBSE practical:</b> print the odd numbers from 1 to n.</p>
<p>The first line reads n. Print every odd number from 1 up to <b>and including</b> n (if n is odd), each on its own line. For n = 7:</p>
<pre class="code">1
3
5
7</pre>`,
    starter: `n = int(input("Enter n: "))
# Print odd numbers from 1 to n
`,
    tests: [{ inputs: ['10'] }, { inputs: ['7'] }, { inputs: ['1'] }],
    match: 'exact',
    need: { calls: ['print', 'range'], nodes: ['For'] },
    hints: [
      'Odd numbers start at 1 and go up in steps of 2.',
      'The stop value is not included, so use n + 1 as the stop.',
      'for i in range(1, n + 1, 2):\n    print(i)'
    ],
    solution: `n = int(input("Enter n: "))
for i in range(1, n + 1, 2):
    print(i)
`
  },
  {
    id: 'py-table-n',
    topic: 'u5-05',
    title: 'Multiplication table with a loop',
    task: `<p>Print the multiplication table of <b>{{n}}</b> from 1 to 10 using a <code>for</code> loop. The first line must be:</p>
<pre class="code">{{n}} x 1 = {{n}}</pre>
<p>and the last line is <code>{{n}} x 10 = …</code>. Use a small letter x and one space around x and =.</p>`,
    starter: `n = {{n}}
# Print the table of n from 1 to 10
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'range'], nodes: ['For'] },
    hints: [
      'Loop i over range(1, 11).',
      'print( ) with commas adds the spaces for you: print(n, "x", i, "=", ...)',
      'for i in range(1, 11):\n    print(n, "x", i, "=", n * i)'
    ],
    solution: `n = {{n}}
for i in range(1, 11):
    print(n, "x", i, "=", n * i)
`,
    params: { n: [2, 19] }
  },
  {
    id: 'py-countdown',
    topic: 'u5-05',
    title: 'Rocket countdown with while',
    task: `<p>A rocket launch countdown starts from <b>{{n}}</b>. Use a <code>while</code> loop to print the numbers from {{n}} down to 1, each on its own line, and then print:</p>
<pre class="code">Lift off!</pre>`,
    starter: `count = {{n}}
# while count is more than 0: print it, then reduce it by 1
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['While'] },
    hints: [
      'while count > 0:',
      'Inside the loop: print(count), then count -= 1 (otherwise the loop never ends).',
      'while count > 0:\n    print(count)\n    count -= 1\nprint("Lift off!")'
    ],
    solution: `count = {{n}}
while count > 0:
    print(count)
    count -= 1
print("Lift off!")
`,
    params: { n: [5, 10] }
  },
  {
    id: 'py-sum-10',
    topic: 'u5-05',
    practical: 'IF-FOR-WHILE',
    title: 'Sum of first 10 natural numbers',
    task: `<p><b>CBSE practical:</b> print the sum of the first 10 natural numbers (1 + 2 + … + 10).</p>
<p>Use a <code>while</code> loop with a counter and a running total. Print the answer once, after the loop, in this form:</p>
<pre class="code">Sum = ...</pre>`,
    starter: `total = 0
i = 1
# while i is 10 or less: add i to total, then increase i
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['While'] },
    hints: [
      'while i <= 10:',
      'Inside the loop: total += i and then i += 1. Print after the loop (not indented).',
      'while i <= 10:\n    total += i\n    i += 1\nprint("Sum =", total)'
    ],
    solution: `total = 0
i = 1
while i <= 10:
    total += i
    i += 1
print("Sum =", total)
`
  },

  // ─────────────────────────────── u5-06 Python Lists ───────────────────────────────
  {
    id: 'py-num-list',
    topic: 'u5-06',
    practical: 'LIST',
    title: 'Length and slices of a list',
    task: `<p><b>CBSE practical:</b> create a list <code>num = [23, 12, 5, 9, 65, 44]</code> and:</p>
<ol><li>print the length of the list;</li>
<li>print the elements from the <b>second to fourth</b> position using <b>positive</b> indexing;</li>
<li>print the elements from the <b>third to fifth</b> position using <b>negative</b> indexing.</li></ol>
<p>Print each answer on its own line (just the value). Your output should be three lines: a number and then two lists.</p>`,
    starter: `num = [23, 12, 5, 9, 65, 44]
# 1. length

# 2. second to fourth (positive indexing)

# 3. third to fifth (negative indexing)
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'len'], nodes: ['Slice', 'UnaryOp'] },
    hints: [
      'Positions count from 1 but indexes count from 0: the second position is index 1. A slice [start:stop] stops before stop.',
      'Second to fourth: num[1:4]. With negative indexes the last item is -1, so the fifth item (65) is -2 and the third item (5) is -4.',
      'print(len(num))\nprint(num[1:4])\nprint(num[-4:-1])'
    ],
    solution: `num = [23, 12, 5, 9, 65, 44]
print(len(num))
print(num[1:4])
print(num[-4:-1])
`
  },
  {
    id: 'py-quiz-list',
    topic: 'u5-06',
    practical: 'LIST',
    title: 'The science quiz team',
    task: `<p><b>CBSE practical:</b> create a list of children selected for the science quiz: Arjun, Sonakshi, Vikram, Sandhya, Sonal, Isha, Kartik. Then do these tasks in sequence, and <b>print the whole list after each step</b> (4 prints in total):</p>
<ol><li>Print the whole list.</li>
<li>Delete the name "Vikram" from the list.</li>
<li>Add the name "Jay" at the end.</li>
<li>Remove the item which is at the second position.</li></ol>`,
    starter: `quiz = ["Arjun", "Sonakshi", "Vikram", "Sandhya", "Sonal", "Isha", "Kartik"]
print(quiz)
# Step 2: delete "Vikram", then print

# Step 3: add "Jay" at the end, then print

# Step 4: remove the item at the second position, then print
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], methods: ['remove', 'append'] },
    hints: [
      'remove("Vikram") deletes by value; append("Jay") adds at the end.',
      'The second position is index 1, so use quiz.pop(1) or del quiz[1].',
      'quiz.remove("Vikram")\nprint(quiz)\nquiz.append("Jay")\nprint(quiz)\nquiz.pop(1)\nprint(quiz)'
    ],
    solution: `quiz = ["Arjun", "Sonakshi", "Vikram", "Sandhya", "Sonal", "Isha", "Kartik"]
print(quiz)
quiz.remove("Vikram")
print(quiz)
quiz.append("Jay")
print(quiz)
del quiz[1]
print(quiz)
`
  },
  {
    id: 'py-shopping-cart',
    topic: 'u5-06',
    title: 'Kirana shopping list',
    task: `<p>Start with <code>cart = ["rice", "dal"]</code>. In this order:</p>
<ol><li>add <code>"oil"</code> at the end with <code>append()</code>;</li>
<li>put <code>"atta"</code> at the very front with <code>insert()</code>;</li>
<li>take <code>"dal"</code> out with <code>remove()</code>.</li></ol>
<p>Then print the list and, on the next line, the number of items like this:</p>
<pre class="code">Items: 3</pre>`,
    starter: `cart = ["rice", "dal"]
# append, insert, remove, then print
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'len'], methods: ['append', 'insert', 'remove'] },
    hints: [
      'The front of the list is index 0: cart.insert(0, "atta")',
      'Use len(cart) to count the items.',
      'cart.append("oil")\ncart.insert(0, "atta")\ncart.remove("dal")\nprint(cart)\nprint("Items:", len(cart))'
    ],
    solution: `cart = ["rice", "dal"]
cart.append("oil")
cart.insert(0, "atta")
cart.remove("dal")
print(cart)
print("Items:", len(cart))
`
  },
  {
    id: 'py-extend-sort',
    topic: 'u5-06',
    practical: 'LIST',
    title: 'Extend and sort a list',
    task: `<p><b>CBSE practical:</b> create a list <code>List_1 = [10, 20, 30, 40]</code>. Add the elements <code>[14, 15, 12]</code> using the <code>extend</code> function. Now sort the final list in ascending order and print it.</p>
<p>Your output is one line: the sorted list.</p>`,
    starter: `List_1 = [10, 20, 30, 40]
# extend, sort, print
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], methods: ['extend', 'sort'] },
    hints: [
      'extend() adds every item of another list at the end.',
      'sort() changes the list itself, so print the list on the next line (not print(List_1.sort())).',
      'List_1.extend([14, 15, 12])\nList_1.sort()\nprint(List_1)'
    ],
    solution: `List_1 = [10, 20, 30, 40]
List_1.extend([14, 15, 12])
List_1.sort()
print(List_1)
`
  },
  {
    id: 'py-marks-stats',
    topic: 'u5-06',
    title: 'Class test summary',
    task: `<p>The marks of five students are in the list <code>marks</code>. Use <code>sum()</code>, <code>max()</code>, <code>min()</code> and <code>len()</code> to print four lines in this order:</p>
<pre class="code">Total: ...
Highest: ...
Lowest: ...
Average: ...</pre>
<p>Average = total ÷ number of students (print it as Python gives it).</p>`,
    starter: `marks = [78, 92, 65, 88, {{m}}]
# Print total, highest, lowest and average
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print', 'sum', 'max', 'min', 'len'] },
    hints: [
      'total = sum(marks)',
      'average = total / len(marks)',
      'print("Total:", total)\nprint("Highest:", max(marks))\nprint("Lowest:", min(marks))\nprint("Average:", average)'
    ],
    solution: `marks = [78, 92, 65, 88, {{m}}]
total = sum(marks)
average = total / len(marks)
print("Total:", total)
print("Highest:", max(marks))
print("Lowest:", min(marks))
print("Average:", average)
`,
    params: { m: [35, 99] }
  },
  {
    id: 'py-even-plus-one',
    topic: 'u5-06',
    practical: 'LIST',
    title: 'Even numbers plus one',
    task: `<p><b>CBSE practical:</b> create a list of the first 10 even numbers, add 1 to each list item and print the final list.</p>
<p>Print the list twice: first the even numbers, then (after adding 1 to every item with a loop) the final list. Your output is two lines; the first is:</p>
<pre class="code">[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]</pre>`,
    starter: `evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
print(evens)
# Add 1 to every item using a for loop, then print the list
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['For'] },
    hints: [
      'Loop over the index positions: for i in range(len(evens)):',
      'Inside the loop change the item in place: evens[i] = evens[i] + 1',
      'for i in range(len(evens)):\n    evens[i] = evens[i] + 1\nprint(evens)'
    ],
    solution: `evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
print(evens)
for i in range(len(evens)):
    evens[i] = evens[i] + 1
print(evens)
`
  },
  {
    id: 'py-sum-list',
    topic: 'u5-06',
    practical: 'IF-FOR-WHILE',
    title: 'Sum of numbers stored in a list',
    task: `<p><b>CBSE practical:</b> find the sum of all numbers stored in a list.</p>
<p>Use a <code>for</code> loop and a running total (do <b>not</b> use the <code>sum()</code> function this time). Print the answer once, after the loop:</p>
<pre class="code">Sum = ...</pre>`,
    starter: `numbers = [12, 45, 7, 30, {{n}}]
total = 0
# Add each number to total using a for loop
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['For'] },
    forbid: { calls: ['sum'] },
    hints: [
      'for n in numbers:  gives you each number in turn.',
      'Inside the loop: total += n. Print after the loop.',
      'for n in numbers:\n    total += n\nprint("Sum =", total)'
    ],
    solution: `numbers = [12, 45, 7, 30, {{n}}]
total = 0
for n in numbers:
    total += n
print("Sum =", total)
`,
    params: { n: [1, 50] }
  },

  // ───────────────────────── u5-07 Practical File: 15+ Programs ─────────────────────────
  {
    id: 'py-discount',
    topic: 'u5-07',
    practical: 'INPUT',
    title: 'Discounted amount',
    task: `<p><b>CBSE practical:</b> calculate the discounted amount with discount %.</p>
<ol><li>Read the <b>price</b>, then the <b>discount percent</b>, each with <code>float(input(...))</code>. Keep numbers out of your question text.</li>
<li><code>discount = price * discount_percent / 100</code> and <code>amount = price - discount</code>.</li>
<li>Print two lines. For price 1200 and discount 10:</li></ol>
<pre class="code">Discount = 120.0
Amount to pay = 1080.0</pre>`,
    starter: `# Read price and discount percent

# Calculate the discount and the amount to pay

# Print both
`,
    tests: [{ inputs: ['1200', '10'] }, { inputs: ['499', '20'] }, { inputs: ['850', '0'] }],
    match: 'numbers',
    need: { calls: ['input', 'float', 'print'], nodes: ['BinOp'] },
    hints: [
      'price = float(input("Enter the price: ")) and discount_percent the same way.',
      'discount = price * discount_percent / 100, then amount = price - discount',
      'print("Discount =", discount)\nprint("Amount to pay =", amount)'
    ],
    solution: `price = float(input("Enter the price: "))
discount_percent = float(input("Enter the discount percent: "))
discount = price * discount_percent / 100
amount = price - discount
print("Discount =", discount)
print("Amount to pay =", amount)
`
  },
  {
    id: 'py-cuboid',
    topic: 'u5-07',
    practical: 'INPUT',
    title: 'Surface area and volume of a cuboid',
    task: `<p><b>CBSE practical:</b> calculate the surface area and volume of a cuboid.</p>
<div class="formula">Surface area = 2 × (l×b + b×h + h×l) &nbsp;·&nbsp; Volume = l × b × h</div>
<ol><li>Read length, breadth and height in that order with <code>float(input(...))</code>. Keep numbers out of your question text.</li>
<li>Print two lines. For 5, 3 and 2:</li></ol>
<pre class="code">Surface area = 62.0
Volume = 30.0</pre>`,
    starter: `# Read length, breadth and height

# Calculate surface area and volume

# Print both
`,
    tests: [{ inputs: ['5', '3', '2'] }, { inputs: ['4', '4', '4'] }, { inputs: ['2.5', '2', '1'] }],
    match: 'numbers',
    need: { calls: ['input', 'float', 'print'], nodes: ['BinOp'] },
    hints: [
      'Use three float(input(...)) lines: l, b and h.',
      'Python needs every * written: surface = 2 * (l * b + b * h + h * l)',
      'volume = l * b * h\nprint("Surface area =", surface)\nprint("Volume =", volume)'
    ],
    solution: `l = float(input("Enter the length: "))
b = float(input("Enter the breadth: "))
h = float(input("Enter the height: "))
surface = 2 * (l * b + b * h + h * l)
volume = l * b * h
print("Surface area =", surface)
print("Volume =", volume)
`
  },
  {
    id: 'py-table-5',
    topic: 'u5-07',
    practical: 'PRINT',
    title: 'Table of 5 up to five terms',
    task: `<p><b>CBSE practical:</b> print the table of 5 up to five terms. Let Python do each multiplication (for example <code>5 * 3</code>). Print exactly:</p>
<pre class="code">5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25</pre>
<p>Use five print commands, or a <code>for</code> loop if you like.</p>`,
    starter: `print("5 x 1 =", 5 * 1)
# Add the next four lines
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['BinOp'] },
    hints: [
      'Copy the first line and change the number in two places.',
      'print("5 x 2 =", 5 * 2)',
      'print("5 x 1 =", 5 * 1)\nprint("5 x 2 =", 5 * 2)\nprint("5 x 3 =", 5 * 3)\nprint("5 x 4 =", 5 * 4)\nprint("5 x 5 =", 5 * 5)'
    ],
    solution: `print("5 x 1 =", 5 * 1)
print("5 x 2 =", 5 * 2)
print("5 x 3 =", 5 * 3)
print("5 x 4 =", 5 * 4)
print("5 x 5 =", 5 * 5)
`
  },
  {
    id: 'py-report-card',
    topic: 'u5-07',
    title: 'Mini report card',
    task: `<p>The program reads a name and the marks (out of 100) in English, Maths and Science. Print four lines:</p>
<pre class="code">Name: Riya
Total: 226
Percentage: 75.33
Result: Pass</pre>
<ul><li>Percentage = total ÷ 3, rounded with <code>round(total / 3, 2)</code>.</li>
<li>Result is <b>Pass</b> if the percentage is 33 or more, otherwise <b>Fail</b>.</li></ul>
<p>Keep the four input lines exactly as they are.</p>`,
    starter: `name = input("Student name: ")
english = int(input("English marks: "))
maths = int(input("Maths marks: "))
science = int(input("Science marks: "))
# Calculate total and percentage, decide the result, print four lines
`,
    tests: [{ inputs: ['Riya', '72', '64', '90'] }, { inputs: ['Aman', '20', '30', '25'] }, { inputs: ['Sana', '33', '33', '33'] }],
    match: 'exact',
    need: { calls: ['print', 'round'], nodes: ['If'] },
    hints: [
      'total = english + maths + science and percentage = round(total / 3, 2)',
      'if percentage >= 33: result = "Pass" else: result = "Fail"',
      'print("Name:", name)\nprint("Total:", total)\nprint("Percentage:", percentage)\nprint("Result:", result)'
    ],
    solution: `name = input("Student name: ")
english = int(input("English marks: "))
maths = int(input("Maths marks: "))
science = int(input("Science marks: "))
total = english + maths + science
percentage = round(total / 3, 2)
if percentage >= 33:
    result = "Pass"
else:
    result = "Fail"
print("Name:", name)
print("Total:", total)
print("Percentage:", percentage)
print("Result:", result)
`
  },
  {
    id: 'py-pocket-money',
    topic: 'u5-07',
    title: 'Pocket-money tracker',
    task: `<p>Ayaan wrote down what he spent each day for a week (in ₹) in the list <code>spent</code>. Print three lines:</p>
<pre class="code">Total spent: ...
Highest in a day: ...
Days above 50: ...</pre>
<p>For the last line, use a <code>for</code> loop with an <code>if</code> to count the days on which he spent <b>more than</b> ₹50.</p>`,
    starter: `spent = [40, 75, 20, 60, 35, 90, 50]
count = 0
# Loop over spent and count days above 50, then print three lines
`,
    tests: [{ inputs: [] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['For', 'If'] },
    hints: [
      'sum(spent) and max(spent) give the first two answers.',
      'for amount in spent:\n    if amount > 50:\n        count += 1',
      'print("Total spent:", sum(spent))\nprint("Highest in a day:", max(spent))\nprint("Days above 50:", count)'
    ],
    solution: `spent = [40, 75, 20, 60, 35, 90, 50]
count = 0
for amount in spent:
    if amount > 50:
        count += 1
print("Total spent:", sum(spent))
print("Highest in a day:", max(spent))
print("Days above 50:", count)
`
  },
  {
    id: 'py-electricity-bill',
    topic: 'u5-07',
    title: 'Electricity bill slabs',
    task: `<p>An electricity board charges by slabs (made-up rates for practice):</p>
<table class="tbl"><thead><tr><th>Units used</th><th>Bill (₹)</th></tr></thead><tbody>
<tr><td>up to 100</td><td>units × 5</td></tr>
<tr><td>101 to 200</td><td>500 + (units − 100) × 7</td></tr>
<tr><td>above 200</td><td>1200 + (units − 200) × 10</td></tr></tbody></table>
<p>The first line reads the units. Print one line, for example for 150 units:</p>
<pre class="code">Bill amount: 850</pre>`,
    starter: `units = int(input("Units used: "))
# Use if / elif / else to calculate bill, then print it
`,
    tests: [{ inputs: ['80'] }, { inputs: ['150'] }, { inputs: ['250'] }, { inputs: ['100'] }],
    match: 'exact',
    need: { calls: ['print'], nodes: ['If'] },
    hints: [
      'if units <= 100: ... elif units <= 200: ... else: ...',
      'In the middle slab: bill = 500 + (units - 100) * 7',
      'if units <= 100:\n    bill = units * 5\nelif units <= 200:\n    bill = 500 + (units - 100) * 7\nelse:\n    bill = 1200 + (units - 200) * 10\nprint("Bill amount:", bill)'
    ],
    solution: `units = int(input("Units used: "))
if units <= 100:
    bill = units * 5
elif units <= 200:
    bill = 500 + (units - 100) * 7
else:
    bill = 1200 + (units - 200) * 10
print("Bill amount:", bill)
`
  }
];

export default [...U5, ...CP];
