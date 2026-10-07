// Unit 2 — Data Literacy (CBSE 417, Class IX, Part B)
// Authored against docs/CONTENT_SPEC.md §6 (verified facts) and §8 (topic plan).

export default {
  id: 'u2',
  title: 'Data Literacy',
  short: 'Data Literacy',
  color: 'blue',
  syllabus: 'Unit 2 · 22 h theory + 28 h practical in the CBSE plan',
  topics: [

    // ───────────────────────────────────────────────────────────── u2-01
    {
      id: 'u2-01',
      title: 'Basics of Data Literacy',
      minutes: 70,
      outcomes: [
        'Define data literacy and recognise its importance',
        'Understand how data literacy enables informed decision-making and critical thinking',
        'Apply the Data Literacy Process Framework to analyse and interpret data effectively'
      ],
      hook: 'A headline screams “Cases DOUBLED!” — by the end of this topic you’ll know the five questions to ask before you believe it.',
      concepts: {
        'dl-def': 'What data literacy means',
        'dl-why': 'Why data literacy matters and its impact',
        'dl-become': 'How to become data literate',
        'dl-framework': 'The Data Literacy Process Framework',
        'dl-critical': 'Reading news and charts critically'
      },
      steps: [
        { kind: 'card', title: 'Data is talking to you all day', html: `
<p>Before lunch today, Diya met more data than she noticed:</p>
<div class="cols">
<div class="mini"><h4>🌧️ Weather app</h4><p>“70% chance of rain after 4 pm.” Should she carry an umbrella?</p></div>
<div class="mini"><h4>🏏 Cricket score</h4><p>An opener’s strike rate is 142.5. Is that good for a T20 match?</p></div>
<div class="mini"><h4>📱 WhatsApp forward</h4><p>“9 out of 10 doctors recommend this drink!” Which doctors? How many were asked? Who paid for the ad?</p></div>
</div>
<p>Each of these is <b>data</b> asking her to believe something or do something. Some of it is helpful. Some of it is misleading. The skill that tells them apart is called <b>data literacy</b>.</p>
<div class="key"><b>Key idea</b> You don’t need to be a scientist to use data — but you do need to read it with a thinking brain.</div>` },

        { kind: 'card', title: 'What is data literacy?', html: `
<div class="def"><dfn>Data literacy</dfn> The ability to find, read, understand, evaluate, use and communicate data.</div>
<p>Reading literacy lets you understand the story in a book. Data literacy lets you understand the story inside numbers, tables and charts — and tell that story to others.</p>
<table class="tbl"><thead><tr><th>Skill</th><th>What it looks like</th></tr></thead><tbody>
<tr><td><b>Find</b></td><td>Locating rainfall data for your district on data.gov.in</td></tr>
<tr><td><b>Read &amp; understand</b></td><td>Knowing what each axis of a chart shows, and in which units</td></tr>
<tr><td><b>Evaluate</b></td><td>Asking “Who collected this? How many people were asked?”</td></tr>
<tr><td><b>Use</b></td><td>Deciding when to water the school garden from soil and rain data</td></tr>
<tr><td><b>Communicate</b></td><td>Explaining your finding to the class with one clear chart</td></tr>
</tbody></table>` },

        { kind: 'card', title: 'Why data literacy matters', html: `
<p>Data now shapes almost every choice around you — which videos an app suggests, how buses are routed, which crop a farmer sows. AI systems are built from data too. A data-literate person can ask: <i>Is this data good enough? Does this result make sense?</i></p>
<div class="cols">
<div class="mini"><h4>🎓 As a student</h4><p>Read your progress report, compare options for streams and colleges, and judge claims in advertisements.</p></div>
<div class="mini"><h4>💼 At work</h4><p>Doctors, farmers, shopkeepers, journalists and engineers all make decisions with data.</p></div>
<div class="mini"><h4>🗳️ As a citizen</h4><p>Understand census figures, government reports and election charts instead of trusting rumours.</p></div>
</div>
<div class="key"><b>Key idea</b> Data is everywhere, and AI is only as good as its data — so people who can read and question data are needed everywhere.</div>` },

        { kind: 'card', title: 'The impact: three superpowers', html: `
<p>When you become data literate, three things change in how you think:</p>
<ol class="flow">
<li><b>Informed decisions</b><span>You decide using evidence, not guesses. A shopkeeper who sees that umbrellas sell most in July orders stock in June.</span></li>
<li><b>Critical thinking</b><span>You ask how a number was made before trusting it. “Best school in the city” — says which survey, of how many parents?</span></li>
<li><b>Spotting misinformation</b><span>You notice when a chart or headline twists the truth, so you don’t forward it.</span></li>
</ol>
<div class="eg"><b>Example</b> Before the monsoon, a district office studies past years’ rainfall and flood records to decide where to keep rescue boats ready. Reading data well can protect lives.</div>` },

        { kind: 'check', concepts: ['dl-def', 'dl-why'], n: 2 },

        { kind: 'card', title: 'How to become data literate', html: `
<p>Data literacy is a habit you build, not a talent you are born with. Four habits get you there:</p>
<div class="cols">
<div class="mini"><h4>❓ Ask questions</h4><p>What is being measured? Compared with what? Over what time period?</p></div>
<div class="mini"><h4>🔎 Check sources</h4><p>Who collected the data, how and why? Is it from a reliable body such as the Census or IMD?</p></div>
<div class="mini"><h4>📊 Read charts carefully</h4><p>Title → axes and units → pattern → conclusion. Never skip the axes.</p></div>
<div class="mini"><h4>🏋️ Practise with real data</h4><p>Your class marks, IPL scores, or open data from data.gov.in.</p></div>
</div>
<div class="warn"><b>Careful</b> Being data literate does not mean distrusting everything. It means trusting data <i>for good reasons</i> — a named source, a clear method and enough data.</div>` },

        { kind: 'card', title: 'The Data Literacy Process Framework', html: `
<p>How does a whole school, company or hospital become data literate? It follows a step-by-step plan called the <b>Data Literacy Process Framework</b>.</p>
<ol class="flow">
<li><b>Plan</b><span>Set the goal and the strategy.</span></li>
<li><b>Communicate</b><span>Explain the purpose to all stakeholders.</span></li>
<li><b>Assess</b><span>Check the current level of data understanding.</span></li>
<li><b>Develop Culture</b><span>Build data skills into everyday work and learning.</span></li>
<li><b>Prescriptive Learning</b><span>Provide learning resources suited to each learner.</span></li>
<li><b>Evaluate</b><span>Measure progress regularly — then repeat.</span></li>
</ol>
<div class="key"><b>Key idea</b> The framework is <b>iterative</b>: after Evaluate, you go back to Plan with what you learned and improve the next round.</div>` },

        { kind: 'card', title: 'The framework in your school', html: `
<p>Imagine your principal wants every Class 9 student to read graphs confidently by March.</p>
<table class="tbl"><thead><tr><th>Step</th><th>What the school does</th></tr></thead><tbody>
<tr><td><b>Plan</b></td><td>Goal: every student can read and explain a graph. Strategy: weekly data activities.</td></tr>
<tr><td><b>Communicate</b></td><td>Explains the goal and why it matters to teachers, students and parents.</td></tr>
<tr><td><b>Assess</b></td><td>A short starting quiz shows who already reads graphs well.</td></tr>
<tr><td><b>Develop Culture</b></td><td>Every subject uses real data; a “Data Corner” in assembly each week.</td></tr>
<tr><td><b>Prescriptive Learning</b></td><td>Extra pie-chart practice for some, a data project for others.</td></tr>
<tr><td><b>Evaluate</b></td><td>A March quiz is compared with the starting quiz, and the plan is improved.</td></tr>
</tbody></table>
<div class="warn"><b>Careful</b> <b>Assess</b> checks the <i>starting</i> level. <b>Evaluate</b> measures <i>progress</i> after the learning.</div>` },

        { kind: 'check', concepts: ['dl-become', 'dl-framework'], n: 3 },

        { kind: 'card', title: 'Impact of news articles', html: `
<p>Headlines are written to grab attention. A data-literate reader slows down and asks five questions before believing — or forwarding — a story:</p>
<ol class="flow">
<li><b>Who says so?</b><span>Is the source named — a government survey, a research team, or an advertiser?</span></li>
<li><b>How many?</b><span>“Doubled” from 2 to 4 is very different from 2,000 to 4,000.</span></li>
<li><b>Compared with what?</b><span>Last month? Last year? Another city of a different size?</span></li>
<li><b>What time window?</b><span>Were a few convenient months picked out of many years?</span></li>
<li><b>Cause or coincidence?</b><span>Two things rising together does not prove one causes the other.</span></li>
</ol>
<div class="eg"><b>Try it</b> “Students who eat breakfast score higher!” Maybe — or maybe those students also sleep earlier. The headline alone can’t tell you which.</div>` },

        { kind: 'card', title: 'Five ways a chart can mislead', html: `
<table class="tbl"><thead><tr><th>Trick</th><th>What it does</th></tr></thead><tbody>
<tr><td><b>Truncated y-axis</b></td><td>Bars start at 95 instead of 0, so 96 vs 98 looks like a giant gap.</td></tr>
<tr><td><b>Cherry-picked time window</b></td><td>Shows only the few months that support the claim and hides the rest.</td></tr>
<tr><td><b>Missing units or labels</b></td><td>“Sales up 40” — 40 what? Rupees? Lakhs? Packets?</td></tr>
<tr><td><b>3-D pie distortion</b></td><td>Tilting the pie makes the front slices look bigger than they really are.</td></tr>
<tr><td><b>Correlation shown as causation</b></td><td>Two lines rise together and the caption claims one caused the other.</td></tr>
</tbody></table>
<div class="key"><b>Key idea</b> The numbers can be true while the picture still misleads. Check the axes before you look at the bars.</div>` },

        { kind: 'check', concepts: ['dl-critical'], n: 2 },

        { kind: 'lab', lab: 'misleading-chart', title: 'Spot the Misleading Chart', intro: 'Five news headlines, five charts, five tricks. Name the trick behind each chart, then compare it side by side with the honest, corrected version.' },

        { kind: 'card', title: 'Common mistakes to avoid', html: `
<div class="cols">
<div class="mini"><h4>❌ “Numbers can’t lie.”</h4><p>Numbers can be cherry-picked, rounded or drawn on a stretched axis. Check how they were made and shown.</p></div>
<div class="mini"><h4>❌ “It went viral, so it’s true.”</h4><p>Shares measure popularity, not accuracy. Look for the original source.</p></div>
<div class="mini"><h4>❌ “One example proves it.”</h4><p>“My cousin topped without studying” is one case, not data about all students.</p></div>
<div class="mini"><h4>❌ “The framework is done once.”</h4><p>It is iterative: what you learn in Evaluate feeds the next Plan.</p></div>
</div>
<div class="key"><b>Key idea</b> Data literacy = curiosity + caution + practice.</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // dl-def
        { id: 'u2-01-q01', c: 'dl-def', t: 'mcq', d: 1, q: 'Which is the best definition of <b>data literacy</b>?',
          o: ['The ability to find, read, understand, evaluate, use and communicate data', 'The ability to type large amounts of data quickly into a spreadsheet', 'The ability to memorise tables of numbers and recall them later', 'The ability to build computers and servers that can store data'],
          a: 0, ex: 'Data literacy is about the whole journey with data — finding it, making sense of it, judging it, using it and explaining it. Typing speed or memory is not the point.' },
        { id: 'u2-01-q02', c: 'dl-def', t: 'tf', d: 1, q: 'Data literacy is only needed by scientists and computer programmers.',
          a: false, ex: 'False. Shopkeepers, farmers, doctors, students and voters all meet data every day, so everyone benefits from being data literate.' },
        { id: 'u2-01-q03', c: 'dl-def', t: 'mcq', d: 2, q: 'Kabir studies a bar chart of his class’s test scores and tells his teacher that most students lost marks on Question 4. Which data-literacy skills is he mainly using?',
          o: ['Reading data and communicating what it shows', 'Collecting primary data through interviews', 'Protecting data with strong passwords', 'Building a learning-based AI model'],
          a: 0, mis: { 1: 'Not quite — the scores already existed; Kabir is reading them, not collecting new data.', 3: 'No model is being built here. Kabir is reading a chart and explaining it to someone.' },
          ex: 'Kabir reads the chart, understands the pattern and explains it to his teacher — that is reading and communicating data.' },
        { id: 'u2-01-q04', c: 'dl-def', t: 'multi', d: 2, q: 'Which of these are part of being data literate? Select all that apply.',
          o: ['Finding data that is relevant to your question', 'Judging whether a data source can be trusted', 'Explaining what a chart shows to other people', 'Memorising every number in a report', 'Avoiding charts because they are confusing'],
          a: [0, 1, 2], ex: 'Data literacy means finding, evaluating, using and communicating data. Memorising numbers or avoiding charts is not part of it.' },
        { id: 'u2-01-q05', c: 'dl-def', t: 'match', d: 2, q: 'Match each data-literacy skill to an example of it.',
          pairs: [['Find', 'Locating crop data on data.gov.in'], ['Read', 'Noting the rainfall value for July on a bar chart'], ['Evaluate', 'Checking whether a survey asked enough people'], ['Communicate', 'Presenting your result to the class with one clear chart']],
          ex: 'Finding is locating data; reading is taking values from it; evaluating is judging its quality; communicating is explaining it to others.' },
        { id: 'u2-01-q06', c: 'dl-def', t: 'mcq', d: 3, q: 'A shopkeeper in Jaipur looks at two years of her sales register and sees that umbrellas sell most in July. She orders extra umbrellas in June. What has she done?',
          o: ['Used data to make an informed decision', 'Collected unstructured image data', 'Protected her shop’s data from a breach', 'Trained a computer vision system'],
          a: 0, mis: { 3: 'No AI is involved — she read her own records and acted on the pattern.', 1: 'A sales register is a written table of numbers, not images.' },
          ex: 'She found a pattern in her own records and acted on it before the busy month — a classic informed, data-based decision.' },
        { id: 'u2-01-q07', c: 'dl-def', t: 'tf', d: 1, q: 'Being able to communicate what data shows to other people is part of data literacy.',
          a: true, ex: 'True. Data literacy includes communicating data, for example explaining a finding clearly with a chart.' },

        // dl-why
        { id: 'u2-01-q08', c: 'dl-why', t: 'mcq', d: 1, q: 'What is a main reason data literacy matters today?',
          o: ['It helps people make decisions based on evidence rather than guesses', 'It makes every decision correct without any further checking', 'It means people no longer need to read or write well', 'It lets people avoid using any numbers in daily life'],
          a: 0, ex: 'Data literacy supports informed decision-making — choosing based on evidence. It does not guarantee every decision is right.' },
        { id: 'u2-01-q09', c: 'dl-why', t: 'multi', d: 2, q: 'Which of these are impacts of becoming data literate? Select all that apply.',
          o: ['Making better-informed decisions', 'Thinking more critically about claims', 'Spotting misleading headlines and charts', 'Never needing to check a source again', 'Being sure that every decision will turn out right'],
          a: [0, 1, 2], ex: 'Data literacy improves decisions, critical thinking and the ability to spot misinformation. It makes you check sources more, not less, and no skill guarantees perfect results.' },
        { id: 'u2-01-q10', c: 'dl-why', t: 'mcq', d: 2, q: 'Why is data literacy especially important in a world full of AI?',
          o: ['AI learns from data, so people must judge whether the data and results make sense', 'AI always gives correct answers, so people only need to read its output', 'AI systems do not use data, so people must supply all the rules', 'AI replaces the need for anyone to understand charts or tables'],
          a: 0, mis: { 1: 'AI can be wrong, especially when its data is poor or biased. That is exactly why people need to question it.', 2: 'Most modern AI learns patterns from data — that is why data quality matters so much.' },
          ex: 'AI is built from data. Data-literate people can question whether the data was good and whether the AI’s output is sensible.' },
        { id: 'u2-01-q11', c: 'dl-why', t: 'tf', d: 2, q: 'A data-literate person trusts any number that appears in an official-looking chart.',
          a: false, ex: 'False. A data-literate person checks the source, units, scale and time window before trusting a chart, however official it looks.' },
        { id: 'u2-01-q12', c: 'dl-why', t: 'mcq', d: 3, q: 'Coaching centre A advertises a “95% success rate” and centre B a “80% success rate”. Rohan is choosing one. What is the most data-literate first step?',
          o: ['Ask how many students each counted and how “success” was defined', 'Choose centre A at once because 95 is bigger than 80', 'Choose centre B because lower numbers are more honest', 'Ignore both numbers because advertisements always lie'],
          a: 0, mis: { 1: 'The bigger number may hide a tiny sample or a generous definition of “success”. Check how it was measured first.', 3: 'Rejecting all data is not critical thinking either — find out how the numbers were made.' },
          ex: 'A percentage means little until you know the group size and the definition. Centre A may have counted only 20 hand-picked students.' },
        { id: 'u2-01-q13', c: 'dl-why', t: 'mcq', d: 2, q: 'Which action best shows <b>critical thinking</b> with data?',
          o: ['Asking how a “best school” ranking was calculated before believing it', 'Forwarding a chart quickly so friends see it before others do', 'Choosing the option with the most colourful infographic', 'Believing a claim because many people have shared it'],
          a: 0, mis: { 3: 'Popularity is not evidence. Many shares can spread a false claim quickly.' },
          ex: 'Critical thinking means questioning how a number was produced before accepting it.' },
        { id: 'u2-01-q14', c: 'dl-why', t: 'mcq', d: 3, q: 'Before the monsoon, a district office studies past years’ rainfall and flood records to decide where to keep rescue boats ready. Which impact of data literacy does this show best?',
          o: ['Informed decision-making that can protect lives', 'Spotting a fake headline on social media', 'Protecting records with encryption', 'Collecting new data through web scraping'],
          a: 0, mis: { 3: 'The office used existing records; it did not collect new data from websites.' },
          ex: 'The office used evidence from past data to plan where help is most likely to be needed — an informed decision with real-world impact.' },

        // dl-become
        { id: 'u2-01-q15', c: 'dl-become', t: 'order', d: 2, q: 'Put these chart-reading habits in the order you should use them.',
          items: ['Read the title to know what the chart is about', 'Check what each axis measures and its units', 'Look at the bars or line to find the pattern', 'State a conclusion that the data supports'],
          ex: 'First know what the chart is about, then what is measured and in which units, then the pattern — and only then draw a conclusion.' },
        { id: 'u2-01-q16', c: 'dl-become', t: 'multi', d: 1, q: 'Which are good ways to become data literate? Select all that apply.',
          o: ['Ask questions about where numbers come from', 'Check the source of the data', 'Practise with real data such as data.gov.in', 'Read only the headline and skip the chart', 'Avoid numbers whenever possible'],
          a: [0, 1, 2], ex: 'Asking questions, checking sources and practising with real data build data literacy. Skipping charts or avoiding numbers does the opposite.' },
        { id: 'u2-01-q17', c: 'dl-become', t: 'mcq', d: 2, q: 'Ayaan wants to improve his data literacy over the summer. Which plan helps most?',
          o: ['Track his cricket team’s scores and make charts to find patterns', 'Share every interesting chart he sees without reading it', 'Copy statistics from forwards into his notebook', 'Read only the conclusions of news reports'],
          a: 0, mis: { 2: 'Copying numbers without checking where they came from does not build understanding.' },
          ex: 'Practising with real data you care about — collecting, charting and interpreting it — is one of the best ways to build data literacy.' },
        { id: 'u2-01-q18', c: 'dl-become', t: 'tf', d: 1, q: 'Checking who collected a set of data is a good habit of a data-literate person.',
          a: true, ex: 'True. Knowing the source helps you judge whether the data is reliable or might be biased.' },
        { id: 'u2-01-q19', c: 'dl-become', t: 'mcq', d: 2, q: 'A chart in a forwarded message shows “Pollution up 40” with no units on the y-axis. What should a data-literate reader do?',
          o: ['Treat it with caution and look for the original source', 'Assume the unit is percent because that is most common', 'Share it, since the trend is what really matters', 'Accept it because the line clearly goes upward'],
          a: 0, mis: { 1: 'Guessing the unit can change the meaning completely — 40 µg/m³ and 40% are very different.' },
          ex: 'Without units you cannot know what “40” means. Find the original source before trusting or sharing it.' },
        { id: 'u2-01-q20', c: 'dl-become', t: 'mcq', d: 3, q: 'Sana sees a website claim: “Students who drink Brand X juice score 20% higher!” What is the best first question to ask?',
          o: ['Who carried out this study, and how many students were in it?', 'Which flavour of Brand X juice is the most popular?', 'How much does one bottle of Brand X juice cost?', 'Can I find a bigger number on another website?'],
          a: 0, mis: { 3: 'Hunting for a more exciting number is not checking. Ask who made the claim and how.' },
          ex: 'A claim made by a juice company about its own product, with an unknown sample size, needs checking before anyone believes it.' },

        // dl-framework
        { id: 'u2-01-q21', c: 'dl-framework', t: 'order', d: 1, q: 'Put the six steps of the Data Literacy Process Framework in order.',
          items: ['Plan', 'Communicate', 'Assess', 'Develop Culture', 'Prescriptive Learning', 'Evaluate'],
          ex: 'Plan → Communicate → Assess → Develop Culture → Prescriptive Learning → Evaluate, and then the cycle repeats.' },
        { id: 'u2-01-q22', c: 'dl-framework', t: 'mcq', d: 1, q: 'Which is the <b>first</b> step of the Data Literacy Process Framework?',
          o: ['Plan', 'Assess', 'Communicate', 'Evaluate'],
          a: 0, ex: 'Everything starts with Plan: setting the goal and the strategy.' },
        { id: 'u2-01-q23', c: 'dl-framework', t: 'match', d: 2, q: 'Match each framework step to what happens in it.',
          pairs: [['Plan', 'Set the goal and the strategy'], ['Communicate', 'Explain the purpose to all stakeholders'], ['Assess', 'Check the current level of data understanding'], ['Prescriptive Learning', 'Provide resources suited to each learner'], ['Evaluate', 'Measure progress regularly']],
          ex: 'Each step has one job: plan, explain, check the starting level, give suitable learning, then measure progress.' },
        { id: 'u2-01-q24', c: 'dl-framework', t: 'mcq', d: 2, q: 'Before any lessons begin, a school gives every Class 9 student a short quiz to see how well they already read graphs. Which framework step is this?',
          o: ['Assess', 'Evaluate', 'Plan', 'Develop Culture'],
          a: 0, mis: { 1: 'Evaluate measures progress after learning. Checking the starting level is Assess.', 2: 'Plan sets the goal and strategy; this quiz measures where students are now.' },
          ex: 'Assess checks the current level of data understanding so that later learning can be targeted.' },
        { id: 'u2-01-q25', c: 'dl-framework', t: 'mcq', d: 2, q: 'Riya gets extra practice on reading pie charts, while Arjun, who already reads them well, gets a harder data project. Which step is this?',
          o: ['Prescriptive Learning', 'Develop Culture', 'Communicate', 'Plan'],
          a: 0, mis: { 1: 'Develop Culture builds data into everyday routines for everyone. Giving different resources to different learners is Prescriptive Learning.' },
          ex: 'Prescriptive Learning provides learning resources suited to each learner’s needs.' },
        { id: 'u2-01-q26', c: 'dl-framework', t: 'tf', d: 2, q: 'The Data Literacy Process Framework is iterative: after Evaluate, the cycle can start again with an improved plan.',
          a: true, ex: 'True. Evaluation results feed back into planning, so the process repeats and improves.' },
        { id: 'u2-01-q27', c: 'dl-framework', t: 'mcq', d: 3, q: 'A principal starts a weekly “Data Corner” in assembly, and teachers begin using real class data in every subject. Which framework step does this show?',
          o: ['Develop Culture', 'Communicate', 'Assess', 'Evaluate'],
          a: 0, mis: { 1: 'Communicate is explaining the purpose to stakeholders. Making data part of everyday routines is Develop Culture.' },
          ex: 'Develop Culture means building data skills into everyday work and learning — exactly what a weekly routine across subjects does.' },
        { id: 'u2-01-q28', c: 'dl-framework', t: 'mcq', d: 3, q: 'After three months, a hospital compares its staff’s new dashboard-reading scores with their scores at the start. What step is this, and what should come next?',
          o: ['Evaluate — then use the results to plan the next round', 'Assess — then stop, because the programme is complete', 'Plan — then set a brand-new goal unrelated to data', 'Communicate — then send the scores to advertisers'],
          a: 0, mis: { 1: 'Comparing progress after learning is Evaluate, and the framework is iterative, so it does not simply stop.' },
          ex: 'Measuring progress is Evaluate. Because the framework is iterative, the results guide the next Plan.' },
        { id: 'u2-01-q29', c: 'dl-framework', t: 'mcq', d: 2, q: 'A hospital head holds meetings to explain to doctors, nurses and office staff <i>why</i> everyone will learn to read patient-data dashboards. Which step is this?',
          o: ['Communicate', 'Assess', 'Prescriptive Learning', 'Evaluate'],
          a: 0, mis: { 2: 'No learning resources are being given yet — the head is explaining the purpose.' },
          ex: 'Communicate means explaining the purpose to all stakeholders so that everyone understands and supports the goal.' },

        // dl-critical
        { id: 'u2-01-q30', c: 'dl-critical', t: 'mcq', d: 2, q: 'A bar chart of two schools’ pass rates starts its y-axis at 95. School A (96%) looks less than half as tall as School B (98%). What trick is this?',
          o: ['A truncated y-axis', 'A 3-D pie distortion', 'A missing data source', 'A cherry-picked time window'],
          a: 0, mis: { 3: 'The time period is not the issue here; the axis starting at 95 instead of 0 exaggerates the gap.' },
          ex: 'Starting the axis at 95 instead of 0 makes a 2-point difference look enormous. That is a truncated y-axis.' },
        { id: 'u2-01-q31', c: 'dl-critical', t: 'bins', d: 2, q: 'Sort each feature of a news chart: is it a reason to trust it more, or a red flag?',
          bins: ['Reason to trust', 'Red flag'],
          items: [['The source and date of the data are given', 0], ['The bar chart’s y-axis starts at zero', 0], ['The number of people surveyed is stated', 0], ['The headline says “SHOCKING” and names no source', 1], ['Only 3 months are shown out of 5 years of data', 1], ['The y-axis has numbers but no units', 1]],
          ex: 'A named source, an honest axis and a stated sample size build trust. No source, a cherry-picked window and missing units are warning signs.' },
        { id: 'u2-01-q32', c: 'dl-critical', t: 'mcq', d: 3, q: 'A headline says: “Ice-cream sales and heatstroke cases both rise in May — ice cream causes heatstroke!” What is wrong with this reasoning?',
          o: ['It treats correlation as causation; hot weather drives both', 'It uses a truncated y-axis on its bar chart', 'It uses too much data from too many months', 'Nothing — rising together proves one causes the other'],
          a: 0, mis: { 3: 'Two things rising together is correlation. A hidden cause — hot weather — explains both.' },
          ex: 'Ice-cream sales and heatstroke both increase in hot weather. They are correlated, but one does not cause the other.' },
        { id: 'u2-01-q33', c: 'dl-critical', t: 'mcq', d: 3, q: 'Fuel prices rose for most of a year, but a news channel shows only the three months when they fell, under the title “Prices are falling!”. Which trick is this?',
          o: ['A cherry-picked time window', 'A truncated y-axis', 'A 3-D pie distortion', 'Correlation shown as causation'],
          a: 0, mis: { 1: 'The axis may be fine; the problem is that most of the year was left out.' },
          ex: 'Choosing only the months that support the claim hides the overall trend. That is cherry-picking the time window.' },
        { id: 'u2-01-q34', c: 'dl-critical', t: 'tf', d: 2, q: 'Tilting a pie chart into 3-D can make a slice look bigger or smaller than it really is.',
          a: true, ex: 'True. In a tilted 3-D pie, slices at the front look larger than equal slices at the back.' },
        { id: 'u2-01-q35', c: 'dl-critical', t: 'mcq', d: 3, q: 'A local paper says: “Bicycle thefts DOUBLED in our colony!” The data shows 2 thefts last year and 4 this year. What is the most data-literate response?',
          o: ['The counts are very small, so “doubled” sounds bigger than it is', 'Thefts doubled, so the colony is now twice as dangerous as everywhere', 'The paper must have invented the numbers, so ignore it', 'Doubling always means a serious long-term trend has begun'],
          a: 0, mis: { 1: 'With such small counts, a change of 2 can happen by chance. One year’s change does not make a trend.', 2: 'The numbers may be accurate; the framing is what needs care.' },
          ex: 'Going from 2 to 4 is technically doubling, but with tiny numbers a small change creates a dramatic percentage. Context matters.' }
      ]
    },

    // ───────────────────────────────────────────────────────────── u2-02
    {
      id: 'u2-02',
      title: 'Data Privacy and Cyber Security',
      minutes: 80,
      outcomes: [
        'Differentiate between data privacy and data security',
        'Identify potential risks associated with data breaches and unauthorised access',
        'Learn measures to protect data privacy and enhance data security'
      ],
      hook: 'Someone calls “from your bank” and asks for the OTP they just sent you. What do you do — and why does the answer protect both your privacy and your security?',
      concepts: {
        'privacy': 'Data privacy: control over personal data',
        'security': 'Data security: protecting data',
        'priv-vs-sec': 'Telling privacy and security apart',
        'ai-data': 'How privacy and security relate to AI',
        'risks': 'Breaches, unauthorised access and phishing',
        'best-practice': 'Cyber-security best practices'
      },
      steps: [
        { kind: 'card', title: 'Your data trail', html: `
<p>Think about one ordinary day. You unlock your phone with your face, pay ₹20 for a samosa by UPI, check marks on the school portal and post a photo from a cousin’s wedding. Each action leaves <b>personal data</b> behind.</p>
<div class="cols">
<div class="mini"><h4>🪪 Who you are</h4><p>Name, date of birth, Aadhaar number, face, fingerprints, voice.</p></div>
<div class="mini"><h4>📍 Where you are</h4><p>Home address, live location, check-ins, clues in a photo’s background.</p></div>
<div class="mini"><h4>🧾 What you do</h4><p>UPI payments, marks, searches, chats, the apps you use.</p></div>
</div>
<div class="key"><b>Key idea</b> Personal data is information that identifies you or can be linked to you. Two questions protect it: <i>Who is allowed to use it?</i> and <i>How is it kept safe?</i></div>` },

        { kind: 'card', title: 'Data privacy: who may use your data', html: `
<div class="def"><dfn>Data privacy</dfn> The right of people to control how their personal data is collected, used and shared — who is allowed to see it and use it.</div>
<p>Privacy is about <b>proper use</b>. Your school collects parents’ phone numbers to send exam alerts — fair use. If it handed that list to a coaching centre for adverts, nobody “hacked” anything, yet privacy was broken: the data was used for a purpose people never agreed to.</p>
<div class="eg"><b>India example</b> When a hotel asks for ID, you can show a <b>masked Aadhaar</b>, which hides all but the last four digits of the number. In <b>DigiLocker</b>, you choose which document to share and with whom. Both keep you in control of your data.</div>` },

        { kind: 'card', title: 'Data security: how data is protected', html: `
<div class="def"><dfn>Data security</dfn> The protections that keep data safe from unauthorised access, theft or damage.</div>
<div class="cols">
<div class="mini"><h4>🔑 Passwords</h4><p>Only people who know the secret can get in.</p></div>
<div class="mini"><h4>🔐 Encryption</h4><p>Scrambles data so only someone with the key can read it.</p></div>
<div class="mini"><h4>🧱 Firewalls</h4><p>Block suspicious traffic between a network and the internet.</p></div>
<div class="mini"><h4>🚪 Access control</h4><p>Class teachers can edit marks; students can only view them.</p></div>
</div>
<p>Add <b>backups</b> too: a copy saved somewhere else protects your data if a phone is lost, broken or attacked.</p>` },

        { kind: 'card', title: 'Privacy vs security: the diary test', html: `
<p>Think of your personal diary.</p>
<table class="tbl"><thead><tr><th></th><th>Privacy</th><th>Security</th></tr></thead><tbody>
<tr><td><b>Asks</b></td><td>Who is <i>allowed</i> to read it?</td><td>How do we <i>stop</i> others from reading it?</td></tr>
<tr><td><b>About</b></td><td>Proper use, rights, consent</td><td>Protection, tools, defences</td></tr>
<tr><td><b>Examples</b></td><td>Consent forms, privacy settings, sharing only what is needed</td><td>Passwords, encryption, firewalls, access control, backups</td></tr>
</tbody></table>
<div class="key"><b>Key idea</b> Privacy is about <b>proper use</b>; security is about <b>protection</b>. You need both: a company can lock its data perfectly and still break privacy by selling it without consent.</div>` },

        { kind: 'check', concepts: ['privacy', 'security', 'priv-vs-sec'], n: 3 },

        { kind: 'card', title: 'Privacy, security and AI', html: `
<p>AI learns from data — and much of that data is personal: faces for attendance cameras, voices for assistants, health records for diagnosis tools. So AI teams must follow four rules:</p>
<ol class="flow">
<li><b>Get consent</b><span>People should know and agree before their photos, voice or records are used to train AI.</span></li>
<li><b>Collect only what is needed</b><span>A canteen-sales predictor does not need students’ home addresses.</span></li>
<li><b>Anonymise</b><span>Remove names, phone numbers and ID numbers so people cannot be identified.</span></li>
<li><b>Secure the data</b><span>Encrypt training data and control who can access it.</span></li>
</ol>
<div class="warn"><b>Careful</b> Removing names is not always enough. Details like date of birth plus home address can still point to one person — and AI can combine harmless-looking data to guess private facts.</div>` },

        { kind: 'card', title: 'What can go wrong: the risks', html: `
<div class="cols">
<div class="mini"><h4>💥 Data breach</h4><p>Data is exposed to people who should not have it — for example, a leaked customer list.</p></div>
<div class="mini"><h4>🚫 Unauthorised access</h4><p>Someone gets into an account or system without permission — for example, using a password they watched you type.</p></div>
<div class="mini"><h4>🎣 Phishing</h4><p>Fake messages trick you into handing over passwords, OTPs or card details.</p></div>
<div class="mini"><h4>🦠 Malware &amp; identity theft</h4><p>Harmful software steals or damages data; stolen details are used to pretend to be you.</p></div>
</div>
<p>The harm is real: money lost to fraud, social-media accounts taken over, private photos spread, or someone misusing your identity.</p>` },

        { kind: 'card', title: 'Spotting phishing', html: `
<p>Phishing works by making you act <i>fast</i>, before you think. Look for these red flags:</p>
<ul>
<li><b>Urgency or fear:</b> “Your account will be blocked in 1 hour! Update KYC now.”</li>
<li><b>Too good to be true:</b> “Congratulations! You won ₹25 lakh in a lucky draw.”</li>
<li><b>Odd links:</b> misspelt or strange web addresses such as <code>bank-kyc-upd8.co</code>.</li>
<li><b>Asks for secrets:</b> OTP, UPI PIN, password, card number or CVV.</li>
<li><b>Strange sender:</b> an unknown number, or a familiar name from an unfamiliar number.</li>
</ul>
<div class="key"><b>Key idea</b> You never need to enter your UPI PIN to <i>receive</i> money. Banks do not ask for your OTP or PIN on a call or message.</div>` },

        { kind: 'check', concepts: ['ai-data', 'risks'], n: 2 },

        { kind: 'lab', lab: 'phishing-spotter', title: 'Phishing Spotter', intro: 'Six messages arrive by SMS, email and WhatsApp. Mark each one Phishing or Safe, then tap the exact red flags that gave it away.' },

        { kind: 'card', title: 'Best practices 1: protect your accounts', html: `
<ol class="flow">
<li><b>Strong, unique passwords</b><span>A long passphrase such as <code>Mango!Rickshaw7Monsoon</code> beats <code>Riya@2010</code> (but don’t use this one — it’s public now!). Use a different password for each account.</span></li>
<li><b>Two-factor authentication (2FA)</b><span>A second check, such as an OTP or an app code, is needed besides the password.</span></li>
<li><b>Never share OTPs or passwords</b><span>Not with a caller “from the bank”, a delivery agent or even a close friend.</span></li>
<li><b>Lock and log out</b><span>Use a screen lock on your phone; log out on shared or cyber-café computers.</span></li>
</ol>
<div class="key"><b>Key idea</b> A stolen password alone should never be enough to get into your account — that is why 2FA matters.</div>` },

        { kind: 'card', title: 'Best practices 2: protect your devices', html: `
<div class="cols">
<div class="mini"><h4>🔗 Think before you click</h4><p>Open bank or school sites by typing the address or using the official app, not a link in a message.</p></div>
<div class="mini"><h4>⬆️ Update &amp; use antivirus</h4><p>Updates fix security holes; antivirus catches known malware.</p></div>
<div class="mini"><h4>📶 Careful on public Wi-Fi</h4><p>Avoid banking or typing passwords on station or café Wi-Fi.</p></div>
<div class="mini"><h4>📲 Permissions &amp; backups</h4><p>A torch app doesn’t need your contacts. Back up important files.</p></div>
</div>
<p>If something goes wrong, tell a trusted adult quickly. In India, cyber fraud can be reported on the national helpline <b>1930</b> or at <code>cybercrime.gov.in</code>. CBSE has also published a <b>Cyber Safety</b> handbook, listed as a reference in your syllabus.</p>` },

        { kind: 'check', concepts: ['best-practice'], n: 2 },

        { kind: 'lab', lab: 'password-meter', title: 'Password Strength Lab', intro: 'Type a practice password (it is never stored or sent) and watch how length, variety and common patterns change how long it would take to crack. Then sort four online habits into safe and unsafe.' },

        { kind: 'card', title: 'Myths to drop', html: `
<div class="cols">
<div class="mini"><h4>❌ “I have nothing to hide.”</h4><p>Your data can still be misused for fraud, spam or identity theft. Privacy protects everyone.</p></div>
<div class="mini"><h4>❌ “Padlock = genuine site.”</h4><p>The padlock means the connection is encrypted, not that the site is honest. Scam sites can have one too.</p></div>
<div class="mini"><h4>❌ “Incognito makes me invisible.”</h4><p>It only stops your own browser saving history. Websites and networks can still see your activity.</p></div>
<div class="mini"><h4>❌ “Good security means good privacy.”</h4><p>A well-locked database can still be shared without consent. You need both.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // privacy
        { id: 'u2-02-q01', c: 'privacy', t: 'mcq', d: 1, q: 'What does <b>data privacy</b> mean?',
          o: ['The right of people to control how their personal data is collected, used and shared', 'The tools, such as firewalls and encryption, that block hackers from a network', 'The habit of deleting all your photos and messages every week', 'The speed at which data travels between two phones on a network'],
          a: 0, mis: { 1: 'Firewalls and encryption are security tools. Privacy is about who is allowed to use the data and for what.' },
          ex: 'Privacy is about proper use: people’s right to decide how their personal data is collected, used and shared.' },
        { id: 'u2-02-q02', c: 'privacy', t: 'tf', d: 1, q: 'Your home address and mobile number are examples of personal data.',
          a: true, ex: 'True. Both can identify you or be linked to you, so they are personal data.' },
        { id: 'u2-02-q03', c: 'privacy', t: 'mcq', d: 2, q: 'A timetable app asks for access to your contacts list, though it only needs to show your class schedule. What is the main concern?',
          o: ['It wants more personal data than it needs, a privacy concern', 'It will make your phone battery run out faster', 'It shows that the app has strong encryption', 'It means the timetable will be more accurate'],
          a: 0, mis: { 2: 'Asking for contacts tells you nothing about encryption. The worry is collecting data it does not need.' },
          ex: 'Collecting only what is needed is a key privacy principle. A timetable has no use for your contacts.' },
        { id: 'u2-02-q04', c: 'privacy', t: 'multi', d: 2, q: 'Which of these are personal data? Select all that apply.',
          o: ['Your Aadhaar number', 'Your fingerprint', 'Your exam marks with your name', 'The capital city of Rajasthan', 'The number of states in India'],
          a: [0, 1, 2], ex: 'Aadhaar numbers, fingerprints and named marks identify or relate to a specific person. General facts about India do not.' },
        { id: 'u2-02-q05', c: 'privacy', t: 'mcq', d: 3, q: 'A school gives its list of students’ parents’ phone numbers to a tuition centre, which calls them with offers. No one hacked the school. What has been violated?',
          o: ['Privacy — the data was used for a purpose people did not agree to', 'Security — a hacker broke through the school’s firewall', 'Nothing — phone numbers are not personal data', 'Accuracy — the phone numbers must have been wrong'],
          a: 0, mis: { 1: 'No system was broken into. The problem is how the data was shared, which is a privacy issue.', 2: 'Phone numbers are linked to real people, so they are personal data.' },
          ex: 'The numbers were collected for school alerts. Sharing them for advertising without consent breaks privacy, even with no hacking at all.' },
        { id: 'u2-02-q06', c: 'privacy', t: 'mcq', d: 2, q: 'Why is sharing a <b>masked Aadhaar</b> a good privacy habit when a hotel asks for ID?',
          o: ['It hides most of the Aadhaar number, so less personal data is exposed', 'It encrypts the hotel’s Wi-Fi so no one can hack it', 'It deletes your Aadhaar record from government systems', 'It lets the hotel see more details about your family'],
          a: 0, mis: { 1: 'A masked Aadhaar has nothing to do with Wi-Fi. It simply hides most digits of your number.' },
          ex: 'A masked Aadhaar shows only the last four digits of the number, so you share only what is needed to identify you.' },

        // security
        { id: 'u2-02-q07', c: 'security', t: 'mcq', d: 1, q: 'What does <b>data security</b> mean?',
          o: ['Protections that keep data safe from unauthorised access, theft or damage', 'The right of a person to decide who may use their data', 'A law that says all data must be made public', 'The process of collecting data with a survey'],
          a: 0, mis: { 1: 'Deciding who may use data is privacy. Security is the protection that enforces it.' },
          ex: 'Security is about protection — passwords, encryption, firewalls, access control and backups.' },
        { id: 'u2-02-q08', c: 'security', t: 'multi', d: 1, q: 'Which of these are data-security measures? Select all that apply.',
          o: ['Encryption', 'Strong passwords', 'Firewalls', 'Regular backups', 'Posting your OTP in a group chat', 'One password for every account'],
          a: [0, 1, 2, 3], ex: 'Encryption, strong passwords, firewalls and backups all protect data. Sharing OTPs and reusing passwords weaken security.' },
        { id: 'u2-02-q09', c: 'security', t: 'mcq', d: 2, q: 'What does <b>encryption</b> do to data?',
          o: ['Scrambles it so only someone with the key can read it', 'Deletes it automatically after it has been read once', 'Copies it to a second device in case of loss', 'Removes names so that people cannot be identified'],
          a: 0, mis: { 2: 'Copying to another device is a backup. Encryption scrambles the data itself.', 3: 'Removing names is anonymisation. Encryption makes the whole data unreadable without a key.' },
          ex: 'Encrypted data looks like gibberish to anyone without the key, so even stolen data stays unreadable.' },
        { id: 'u2-02-q10', c: 'security', t: 'tf', d: 2, q: 'Backing up data is a security measure because it protects you from losing data if a device is damaged, lost or attacked.',
          a: true, ex: 'True. Security protects data from damage and loss as well as theft, and backups do exactly that.' },
        { id: 'u2-02-q11', c: 'security', t: 'mcq', d: 3, q: 'A clinic stores patient records on a computer at the front desk that anyone can open without a password. Which security measure is most clearly missing?',
          o: ['Access control, so only authorised staff can open records', 'A brighter monitor so records are easier to read', 'A faster internet connection for the clinic', 'More patient data so the records are complete'],
          a: 0, mis: { 3: 'More data would not protect anything. The problem is that anyone can open the records.' },
          ex: 'Access control limits who can see or change data. Without it, any visitor could read private health records.' },
        { id: 'u2-02-q12', c: 'security', t: 'mcq', d: 2, q: 'Which is an example of <b>access control</b>?',
          o: ['Only class teachers can edit marks on the school portal', 'The school posts a privacy notice on its website', 'Students fill in a survey about canteen food', 'The principal shares results at the annual day'],
          a: 0, mis: { 1: 'A privacy notice explains how data is used. Access control decides who can actually open or change it.' },
          ex: 'Access control gives different people different permissions — teachers can edit, students can only view.' },

        // priv-vs-sec
        { id: 'u2-02-q13', c: 'priv-vs-sec', t: 'bins', d: 2, q: 'Sort each example: is it mainly about privacy or mainly about security?',
          bins: ['Privacy', 'Security'],
          items: [['Deciding who is allowed to see your health report', 0], ['Locking the school’s server room', 1], ['An app asking your consent before using your location', 0], ['Encrypting UPI payment data', 1], ['A firewall on the school network', 1], ['Choosing not to post your birthday publicly', 0]],
          ex: 'Choices about who may see or use data are privacy. Locks, encryption and firewalls that protect data are security.' },
        { id: 'u2-02-q14', c: 'priv-vs-sec', t: 'mcq', d: 2, q: 'If privacy is about <i>who is allowed</i> to read your diary, then security is like…',
          o: ['the lock that stops others opening it', 'the list of friends you would let read it', 'the colour of the diary’s cover', 'the pen you use to write in it'],
          a: 0, mis: { 1: 'Deciding which friends may read it is still privacy — a choice about permission, not protection.' },
          ex: 'Security is the protection — the lock — that enforces the privacy decision.' },
        { id: 'u2-02-q15', c: 'priv-vs-sec', t: 'tf', d: 3, q: 'A company can keep its data perfectly secure from hackers and still break people’s privacy by selling that data without consent.',
          a: true, ex: 'True. Security protects data from outsiders; privacy is about proper use. Selling data without consent is improper use, however well it is locked.' },
        { id: 'u2-02-q16', c: 'priv-vs-sec', t: 'mcq', d: 3, q: 'A fitness app encrypts all its data and has never been hacked, but it shares users’ step counts and locations with advertisers without asking. Which statement is correct?',
          o: ['Security is strong, but privacy is not respected', 'Privacy is strong, but security is weak', 'Privacy and security are equally strong here', 'This is a data breach caused by hackers'],
          a: 0, mis: { 1: 'It is the other way round: the protection is good, but the use of data is not.', 3: 'No hacker was involved. The company itself chose to share the data.' },
          ex: 'Encryption and no hacks show good security. Sharing data without consent is a privacy failure.' },
        { id: 'u2-02-q17', c: 'priv-vs-sec', t: 'mcq', d: 1, q: 'Which pair is correct?',
          o: ['Privacy is about proper use; security is about protection', 'Privacy is about protection; security is about proper use', 'Privacy is about speed; security is about storage size', 'Privacy is about storage size; security is about speed'],
          a: 0, ex: 'Privacy decides how data may be used and by whom. Security protects it from unauthorised access, theft or damage.' },
        { id: 'u2-02-q18', c: 'priv-vs-sec', t: 'mcq', d: 2, q: 'Which question is about <b>privacy</b> rather than security?',
          o: ['Should the school put students’ photos on its public website?', 'Is the school server protected by a firewall?', 'Are the marks files encrypted when stored?', 'Is there a backup of the attendance register?'],
          a: 0, mis: { 2: 'Encryption is a protection tool, so that is a security question.' },
          ex: 'Whether to share students’ photos publicly is a decision about proper use and consent — privacy. The others are about protection.' },

        // ai-data
        { id: 'u2-02-q19', c: 'ai-data', t: 'mcq', d: 1, q: 'Why do privacy and security matter so much in AI?',
          o: ['AI systems are often trained on large amounts of personal data', 'AI systems never use any data about real people', 'AI systems work only offline, so data can’t leak', 'AI systems delete all data as soon as they learn'],
          a: 0, ex: 'Faces, voices, messages and health records are often used to train AI, so that data must be used properly and protected.' },
        { id: 'u2-02-q20', c: 'ai-data', t: 'mcq', d: 2, q: 'What does <b>anonymising</b> a dataset mean?',
          o: ['Removing or hiding details such as names and phone numbers so people can’t be identified', 'Scrambling the whole file so nobody can read it without a key', 'Making a second copy of the data on another computer', 'Collecting the data without telling anyone about it'],
          a: 0, mis: { 1: 'Scrambling a file with a key is encryption. Anonymising removes identifying details but keeps the data readable.', 3: 'Collecting secretly breaks privacy. Anonymising protects people’s identities.' },
          ex: 'Anonymisation removes identifying details so the data can still be studied without pointing to particular people.' },
        { id: 'u2-02-q21', c: 'ai-data', t: 'tf', d: 2, q: 'Before using students’ photos to train a face-recognition attendance system, the school should get consent.',
          a: true, ex: 'True. Faces are sensitive personal data. People (and for minors, their parents) should know and agree before photos are used to train AI.' },
        { id: 'u2-02-q22', c: 'ai-data', t: 'mcq', d: 3, q: 'A start-up building a Hindi voice assistant secretly records people talking at a busy market to use as training data. What is the main problem?',
          o: ['Personal data (voices) is being collected without consent', 'Market recordings are too clean to train a model', 'Voice data cannot be used for NLP at all', 'The recordings will contain too few Hindi words'],
          a: 0, mis: { 2: 'Speech is a common input for NLP. The issue is how the data was collected, not its type.' },
          ex: 'Voices can identify people and conversations can be private. Recording secretly ignores consent, a basic privacy rule for AI data.' },
        { id: 'u2-02-q23', c: 'ai-data', t: 'multi', d: 2, q: 'An AI team will use hospital records to build a disease-prediction tool. Which steps are responsible? Select all that apply.',
          o: ['Remove names and ID numbers from the records', 'Get the required permission and consent first', 'Store the data encrypted with access control', 'Publish the full records online for transparency', 'Keep the data forever “just in case”'],
          a: [0, 1, 2], ex: 'Anonymising, getting consent and securing the data protect patients. Publishing records or keeping them forever increases the risk of harm.' },
        { id: 'u2-02-q24', c: 'ai-data', t: 'mcq', d: 3, q: 'A team says, “Our student dataset is anonymous — we removed the names.” It still has each student’s exact date of birth and home address. Is it truly anonymous?',
          o: ['No — date of birth plus address can still identify a person', 'Yes — once names are removed, nobody can be identified', 'Yes — addresses are not personal data', 'No — the data must also be printed on paper'],
          a: 0, mis: { 1: 'Other details can be combined to point to one person. Removing names alone is often not enough.' },
          ex: 'Combining details like birth date and address can single out an individual, so they should also be removed or generalised.' },

        // risks
        { id: 'u2-02-q25', c: 'risks', t: 'match', d: 2, q: 'Match each risk to its meaning.',
          pairs: [['Data breach', 'Data is exposed to people who should not have it'], ['Phishing', 'Fake messages trick you into giving secrets'], ['Malware', 'Harmful software that damages or steals data'], ['Identity theft', 'Someone uses your details to pretend to be you']],
          ex: 'A breach exposes data; phishing tricks people; malware is harmful software; identity theft misuses your details to impersonate you.' },
        { id: 'u2-02-q26', c: 'risks', t: 'mcq', d: 1, q: 'What is a <b>data breach</b>?',
          o: ['An incident where data is exposed to people who should not have it', 'A planned backup of data to a second device', 'A survey that collects data from many people', 'A chart that shows a break in a trend'],
          a: 0, ex: 'A data breach happens when protected data is seen, copied or stolen by someone not authorised to have it.' },
        { id: 'u2-02-q27', c: 'risks', t: 'mcq', d: 2, q: 'Which is an example of <b>unauthorised access</b>?',
          o: ['A classmate logs in to your school portal with a password he saw you type', 'Your teacher opens the marks file she is in charge of', 'You log in to your own email on your own phone', 'A parent views their child’s report card using the parent login'],
          a: 0, mis: { 1: 'The teacher is authorised for that file. Unauthorised access means entering without permission.' },
          ex: 'Using someone else’s password without permission is unauthorised access, even if it seems harmless.' },
        { id: 'u2-02-q28', c: 'risks', t: 'mcq', d: 3, q: 'An SMS says: “Your electricity will be disconnected TONIGHT at 9:30 pm. Call this number immediately to update your bill.” What is the best reading of it?',
          o: ['Likely phishing — it uses urgency to make you act without checking', 'Genuine — power companies usually send such warnings', 'Malware — reading the SMS has already infected the phone', 'A data breach — the electricity company was hacked'],
          a: 0, mis: { 1: 'Urgency plus an unknown number is a classic scam pattern. Check through the official app or bill instead.' },
          ex: 'Fear and urgency are the main red flags. Verify by contacting the electricity provider through its official app or website, not the number in the SMS.' },
        { id: 'u2-02-q29', c: 'risks', t: 'tf', d: 1, q: 'Phishing messages often create panic or urgency so that you act without thinking.',
          a: true, ex: 'True. Scammers want you to click or share before you have time to check whether the message is genuine.' },
        { id: 'u2-02-q30', c: 'risks', t: 'mcq', d: 3, q: 'Kavya receives a UPI request: “Enter your UPI PIN to receive your ₹2,000 cashback prize.” What should she understand?',
          o: ['A UPI PIN is never needed to receive money, so this is a scam', 'She must enter the PIN quickly before the prize expires', 'Entering the PIN is safe because UPI is encrypted', 'She should share the PIN with a friend to check it'],
          a: 0, mis: { 2: 'Encryption protects the payment, but entering your PIN approves money going OUT of your account.' },
          ex: 'Your UPI PIN authorises a payment from your account. Receiving money never needs it, so this request would take money from her.' },
        { id: 'u2-02-q31', c: 'risks', t: 'multi', d: 2, q: 'An email claims to be from your bank. Which features are red flags? Select all that apply.',
          o: ['A link to <code>bank-kyc-upd8.co</code>', 'It asks you to reply with your OTP', 'It says your account will be blocked in one hour', 'It is written in English', 'It arrived in the morning'],
          a: [0, 1, 2], ex: 'Odd web addresses, requests for secrets and urgent threats are red flags. The language or time of arrival tells you nothing.' },

        // best-practice
        { id: 'u2-02-q32', c: 'best-practice', t: 'mcq', d: 1, q: 'Which of these is the strongest password?',
          o: ['purple-Kite!chai-Train9', 'Riya@2010', 'qwerty12345', 'india123'],
          a: 0, ex: 'A long passphrase with mixed characters is hardest to guess. The others use names, years or common keyboard patterns found on attackers’ lists.' },
        { id: 'u2-02-q33', c: 'best-practice', t: 'tf', d: 1, q: 'It is safe to share an OTP with a bank employee who calls you.',
          a: false, ex: 'False. Banks do not ask for OTPs on calls. Anyone asking for your OTP should be treated as a scammer.' },
        { id: 'u2-02-q34', c: 'best-practice', t: 'mcq', d: 2, q: 'How does <b>two-factor authentication (2FA)</b> protect your account?',
          o: ['A second check, such as an OTP, is needed as well as the password', 'It makes your password twice as long automatically', 'It lets two people share one account safely', 'It backs up your account to two different phones'],
          a: 0, mis: { 1: '2FA does not change the password. It adds a separate second step.' },
          ex: 'With 2FA, a stolen password alone is not enough — the attacker would also need your second factor.' },
        { id: 'u2-02-q35', c: 'best-practice', t: 'mcq', d: 2, q: 'You are waiting at a railway station with free public Wi-Fi. What is the wisest choice?',
          o: ['Avoid banking or typing passwords while on it', 'Use it for banking because it is faster', 'Turn off your screen lock to save time', 'Share your hotspot password with strangers'],
          a: 0, mis: { 1: 'Speed is not the issue. Others on a public network may try to watch traffic, so avoid sensitive tasks.' },
          ex: 'Public Wi-Fi is shared with strangers, so sensitive tasks are best done on mobile data or a trusted network.' },
        { id: 'u2-02-q36', c: 'best-practice', t: 'bins', d: 2, q: 'Sort each habit as safe or unsafe.',
          bins: ['Safe', 'Unsafe'],
          items: [['Turning on 2FA for your email', 0], ['Installing app updates promptly', 0], ['Backing up your project files', 0], ['Using one password for every account', 1], ['Reading an OTP aloud to a caller', 1], ['Staying logged in on a cyber-café computer', 1]],
          ex: '2FA, updates and backups protect you. Reusing passwords, sharing OTPs and staying logged in on shared computers put your data at risk.' },
        { id: 'u2-02-q37', c: 'best-practice', t: 'mcq', d: 3, q: 'Arjun uses a cyber-café computer to download his admit card. What is the most important thing to do before he leaves?',
          o: ['Log out and make sure the browser did not save his password', 'Leave the browser open so the next person can save time', 'Write his password on a sticky note for later', 'Change the café computer’s wallpaper'],
          a: 0, mis: { 1: 'Leaving the account open lets the next user into it — that is unauthorised access waiting to happen.' },
          ex: 'On shared computers, always log out and don’t let the browser remember passwords, so nobody else can enter your account.' },
        { id: 'u2-02-q38', c: 'best-practice', t: 'mcq', d: 3, q: 'A new torch app asks for permission to read your contacts, location and microphone. What is the best action?',
          o: ['Deny permissions it doesn’t need, or choose a different app', 'Allow everything, because the app is free', 'Allow everything, but only for one week', 'Turn off your phone’s screen lock instead'],
          a: 0, mis: { 1: 'Free apps can still misuse data. A torch only needs the flashlight.' },
          ex: 'Checking app permissions is a key best practice. A torch has no reason to access contacts, location or the microphone.' },
        { id: 'u2-02-q39', c: 'best-practice', t: 'mcq', d: 2, q: 'Why should you install software updates on your phone and laptop?',
          o: ['They often fix security weaknesses that attackers could use', 'They always delete viruses that are already on the device', 'They make every app free to use forever', 'They remove the need for passwords'],
          a: 0, mis: { 1: 'Updates close holes; removing existing malware is the job of antivirus software.' },
          ex: 'Updates patch security holes. Old, unpatched software is an easy target for attackers.' }
      ]
    },

    // ───────────────────────────────────────────────────────────── u2-03
    {
      id: 'u2-03',
      title: 'Types of Data',
      minutes: 70,
      outcomes: [
        'Classify different types of data: qualitative (nominal, ordinal) and quantitative (discrete, continuous)',
        'Identify data by form (text, numbers, images, audio, video) and the AI domain that uses it',
        'Distinguish structured from unstructured data and primary from secondary data'
      ],
      hook: 'Can you calculate the “average jersey number” of a cricket team? If that sounds odd, you already sense that not all numbers are the same kind of data.',
      concepts: {
        'qual-quant': 'Qualitative vs quantitative data',
        'nominal-ordinal': 'Nominal vs ordinal data',
        'discrete-continuous': 'Discrete vs continuous data',
        'data-forms': 'Data by form and the AI domain that uses it',
        'structured': 'Structured vs unstructured data',
        'primary-secondary': 'Primary vs secondary data'
      },
      steps: [
        { kind: 'card', title: 'One student, many kinds of data', html: `
<p>Here is Riya’s record from the school sports-day file:</p>
<table class="tbl"><thead><tr><th>Field</th><th>Riya</th></tr></thead><tbody>
<tr><td>Blood group</td><td>B+</td></tr>
<tr><td>House</td><td>Green</td></tr>
<tr><td>Position in 100 m race</td><td>2nd</td></tr>
<tr><td>Number of events entered</td><td>3</td></tr>
<tr><td>Time for 100 m</td><td>15.42 s</td></tr>
<tr><td>Jersey number</td><td>18</td></tr>
<tr><td>Cheering video</td><td>🎥 clip.mp4</td></tr>
</tbody></table>
<p>Some fields are words, some are numbers, one is a video. Could you find the “average house”? The “average jersey number”? Knowing the <b>type</b> of each piece of data tells you what you can — and can’t — do with it.</p>` },

        { kind: 'card', title: 'Qualitative vs quantitative', html: `
<div class="cols">
<div class="mini"><h4>🎨 Qualitative</h4><p>Descriptive, non-numerical data: categories or qualities. <i>Blood group, house colour, favourite festival, mother tongue.</i></p></div>
<div class="mini"><h4>🔢 Quantitative</h4><p>Numerical data: amounts you can count or measure. <i>Number of events, 100 m time, height, rainfall.</i></p></div>
</div>
<div class="key"><b>Key idea</b> Quick test: does arithmetic make sense? You can average race times, but not blood groups. If maths on it makes sense, it is quantitative.</div>
<div class="warn"><b>Careful</b> Some numbers are only labels. A jersey number, PIN code or mobile number is <b>qualitative</b> — the “average PIN code” of your class means nothing.</div>` },

        { kind: 'card', title: 'Nominal vs ordinal', html: `
<p>Qualitative data comes in two kinds:</p>
<table class="tbl"><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody>
<tr><td><b>Nominal</b></td><td>Categories with <b>no</b> natural order (think “name”)</td><td>Blood group, house colour, state of birth, favourite sport</td></tr>
<tr><td><b>Ordinal</b></td><td>Categories with a meaningful <b>order</b></td><td>Grades A1/A2/B1, T-shirt size S/M/L, race position, spice level mild/medium/hot, 1–5 star ratings</td></tr>
</tbody></table>
<div class="eg"><b>Example</b> Is Green House “more” than Red House? No — nominal. Is 1st place ahead of 2nd? Yes — ordinal.</div>
<div class="warn"><b>Careful</b> Ordinal data has an order, but the gaps are not equal: 1st and 2nd might be 0.1 s apart while 2nd and 3rd are 2 s apart.</div>` },

        { kind: 'check', concepts: ['qual-quant', 'nominal-ordinal'], n: 3 },

        { kind: 'card', title: 'Discrete vs continuous', html: `
<p>Quantitative data also comes in two kinds:</p>
<div class="cols">
<div class="mini"><h4>🧮 Discrete</h4><p><b>Counted</b> in whole-number steps, with no values in between. <i>Number of students, wickets, siblings, cars at a signal.</i> Nobody has 2.5 siblings.</p></div>
<div class="mini"><h4>📏 Continuous</h4><p><b>Measured</b>, so it can take any value in a range, including decimals. <i>Height 152.4 cm, temperature 36.6 °C, time 15.42 s, rainfall 23.7 mm.</i></p></div>
</div>
<div class="key"><b>Key idea</b> Ask: “Am I <b>counting</b> it or <b>measuring</b> it?” Counting → discrete. Measuring → continuous.</div>
<div class="eg"><b>Cricket</b> Runs and wickets are counted (discrete). The speed of a delivery in km/h is measured (continuous).</div>` },

        { kind: 'card', title: 'Three questions sort any variable', html: `
<ol class="flow">
<li><b>Does arithmetic make sense on it?</b><span>No → qualitative. Yes → quantitative.</span></li>
<li><b>If qualitative: is there a natural order?</b><span>No → <b>nominal</b> (blood group). Yes → <b>ordinal</b> (grades).</span></li>
<li><b>If quantitative: counted or measured?</b><span>Counted → <b>discrete</b> (number absent). Measured → <b>continuous</b> (weight of a school bag).</span></li>
</ol>
<table class="tbl"><thead><tr><th>Riya’s field</th><th>Type</th></tr></thead><tbody>
<tr><td>Blood group B+, jersey 18, Green House</td><td>Nominal</td></tr>
<tr><td>Race position 2nd</td><td>Ordinal</td></tr>
<tr><td>Events entered: 3</td><td>Discrete</td></tr>
<tr><td>100 m time: 15.42 s</td><td>Continuous</td></tr>
</tbody></table>` },

        { kind: 'check', concepts: ['discrete-continuous', 'qual-quant'], n: 2 },

        { kind: 'card', title: 'Data by form — and which AI uses it', html: `
<table class="tbl"><thead><tr><th>Form</th><th>Examples</th><th>AI domain</th></tr></thead><tbody>
<tr><td>Numbers / tables</td><td>Marks, sales, AQI readings, scorecards</td><td><span class="tag data">Data</span></td></tr>
<tr><td>Text</td><td>Messages, reviews, news articles</td><td><span class="tag nlp">NLP</span></td></tr>
<tr><td>Audio (speech)</td><td>Voice commands, recorded questions</td><td><span class="tag nlp">NLP</span></td></tr>
<tr><td>Images</td><td>Selfies, X-rays, satellite photos, scanned answer sheets</td><td><span class="tag cv">Computer Vision</span></td></tr>
<tr><td>Video</td><td>CCTV, dashcam, match footage</td><td><span class="tag cv">Computer Vision</span></td></tr>
</tbody></table>
<div class="key"><b>Key idea</b> Inside a computer, every form becomes numbers: an image is a grid of pixel values, and a sound is a long list of measurements over time.</div>` },

        { kind: 'card', title: 'Structured vs unstructured', html: `
<div class="cols">
<div class="mini"><h4>🗂️ Structured</h4><p>Organised in rows and columns with fixed fields, so it is easy to sort, filter and calculate. <i>Attendance spreadsheet, railway reservation records, a table of rainfall per district.</i></p></div>
<div class="mini"><h4>🧺 Unstructured</h4><p>No fixed rows and columns. <i>Photos, videos, voice notes, chat messages, free-text answers.</i> It needs processing — often by CV or NLP — before analysis.</p></div>
</div>
<div class="eg"><b>Example</b> On one feedback form, “Rate the canteen 1–5” fills a neat column (structured), while “Any other comments?” collects free sentences (unstructured).</div>` },

        { kind: 'check', concepts: ['data-forms', 'structured'], n: 2 },

        { kind: 'card', title: 'Primary vs secondary data', html: `
<table class="tbl"><thead><tr><th></th><th>Primary data</th><th>Secondary data</th></tr></thead><tbody>
<tr><td><b>Meaning</b></td><td>Collected first-hand by you, for your purpose</td><td>Already collected by someone else</td></tr>
<tr><td><b>Examples</b></td><td>Your survey of classmates; counting vehicles at the school gate; readings from the school rain gauge</td><td>Census of India; data.gov.in datasets; IMD weather records; cricket statistics on a sports website</td></tr>
<tr><td><b>Plus</b></td><td>Fits your exact question; you know how it was collected</td><td>Saves time and money; can cover huge areas and many years</td></tr>
<tr><td><b>Minus</b></td><td>Takes time and effort to collect</td><td>May not fit your question exactly, or may be out of date</td></tr>
</tbody></table>` },

        { kind: 'check', concepts: ['primary-secondary'], n: 2 },

        { kind: 'card', title: 'Common mistakes', html: `
<div class="cols">
<div class="mini"><h4>❌ “Digits mean quantitative.”</h4><p>Roll numbers, PIN codes and jersey numbers are labels — nominal data.</p></div>
<div class="mini"><h4>❌ “Ratings are just numbers.”</h4><p>1–5 stars are ordered categories — ordinal. The gaps between them are not guaranteed to be equal.</p></div>
<div class="mini"><h4>❌ “Secondary means second-rate.”</h4><p>Census and IMD data are carefully collected. “Secondary” only means someone else collected it.</p></div>
<div class="mini"><h4>❌ “Photos are pixels, so structured.”</h4><p>Pixels are numbers, but a photo has no fixed fields like “name” or “marks” — it is unstructured.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // qual-quant
        { id: 'u2-03-q01', c: 'qual-quant', t: 'mcq', d: 1, q: 'Which of these is <b>quantitative</b> data?',
          o: ['Number of goals scored in a match', 'Blood group of a player', 'Favourite colour of a student', 'Name of a student’s home town'],
          a: 0, ex: 'Goals scored is a number you can count and do arithmetic with. The others are categories.' },
        { id: 'u2-03-q02', c: 'qual-quant', t: 'tf', d: 1, q: 'Qualitative data describes qualities or categories rather than measured amounts.',
          a: true, ex: 'True. Qualitative data is descriptive and non-numerical, such as blood group or favourite sport.' },
        { id: 'u2-03-q03', c: 'qual-quant', t: 'bins', d: 2, q: 'Sort each variable into qualitative or quantitative.',
          bins: ['Qualitative', 'Quantitative'],
          items: [['Mother tongue', 0], ['Mass of a school bag in kg', 1], ['Mode of transport to school', 0], ['Number of library books borrowed', 1], ['Rainfall in mm', 1], ['Favourite festival', 0]],
          ex: 'Language, transport mode and festival are categories (qualitative). Mass, books borrowed and rainfall are numbers you can do arithmetic on (quantitative).' },
        { id: 'u2-03-q04', c: 'qual-quant', t: 'mcq', d: 2, q: 'A cricketer’s jersey number is 18. What type of data is a jersey number?',
          o: ['Qualitative (nominal) — it is a label', 'Quantitative (discrete) — it is a whole number', 'Quantitative (continuous) — it can be measured', 'Qualitative (ordinal) — higher numbers rank higher'],
          a: 0, mis: { 1: 'It is written in digits, but adding or averaging jersey numbers means nothing. It only names a player.', 3: 'Jersey 18 is not “better” than jersey 7. There is no meaningful order.' },
          ex: 'A jersey number identifies a player like a name does. Arithmetic on it is meaningless, so it is nominal, qualitative data.' },
        { id: 'u2-03-q05', c: 'qual-quant', t: 'multi', d: 2, q: 'Which of these are quantitative data? Select all that apply.',
          o: ['Temperature in °C', 'Number of siblings', 'Height in cm', 'PIN code of your area', 'Blood group'],
          a: [0, 1, 2], ex: 'Temperature, siblings and height are amounts. A PIN code is a label made of digits, and blood group is a category.' },
        { id: 'u2-03-q06', c: 'qual-quant', t: 'tf', d: 2, q: 'Because PIN codes are written as digits, it makes sense to calculate the average PIN code of a class.',
          a: false, ex: 'False. PIN codes are labels for areas. Their “average” would not describe any real place, so they are qualitative.' },
        { id: 'u2-03-q07', c: 'qual-quant', t: 'match', d: 2, q: 'Match each variable to its data type.',
          pairs: [['Blood group', 'Nominal'], ['Exam grade (A1, A2, B1)', 'Ordinal'], ['Number of pets', 'Discrete'], ['Wrist circumference in cm', 'Continuous']],
          ex: 'Blood group has no order (nominal); grades are ordered (ordinal); pets are counted (discrete); a circumference is measured (continuous).' },

        // nominal-ordinal
        { id: 'u2-03-q08', c: 'nominal-ordinal', t: 'mcq', d: 1, q: 'Which of these is <b>ordinal</b> data?',
          o: ['Grades A, B, C, D', 'Blood groups A, B, AB, O', 'Names of Indian states', 'Colours of school houses'],
          a: 0, ex: 'Grades have a meaningful order (A is above B). Blood groups, states and house colours are categories without order.' },
        { id: 'u2-03-q09', c: 'nominal-ordinal', t: 'mcq', d: 1, q: 'What is <b>nominal</b> data?',
          o: ['Categories with no natural order', 'Categories with a meaningful order', 'Numbers that are counted', 'Numbers that are measured'],
          a: 0, ex: 'Nominal data names categories — such as blood group or favourite sport — that cannot be ranked.' },
        { id: 'u2-03-q10', c: 'nominal-ordinal', t: 'bins', d: 2, q: 'Sort each variable into nominal or ordinal.',
          bins: ['Nominal', 'Ordinal'],
          items: [['Blood group', 0], ['T-shirt size S, M, L, XL', 1], ['State of birth', 0], ['Medal: gold, silver, bronze', 1], ['Movie rating 1–5 stars', 1], ['Favourite sport', 0]],
          ex: 'Sizes, medals and star ratings have a clear order. Blood group, state and favourite sport are just names.' },
        { id: 'u2-03-q11', c: 'nominal-ordinal', t: 'mcq', d: 2, q: 'Why is “position in a race (1st, 2nd, 3rd)” ordinal and not nominal?',
          o: ['The categories have a meaningful order', 'The values are measured with a stopwatch', 'The values can be added together', 'The categories are written in words'],
          a: 0, mis: { 1: 'The time is measured, but the position itself is a ranked category.', 2: 'Adding positions makes no sense. What matters is that 1st comes before 2nd.' },
          ex: 'Ordinal categories can be ranked. 1st is ahead of 2nd, which is ahead of 3rd.' },
        { id: 'u2-03-q12', c: 'nominal-ordinal', t: 'mcq', d: 3, q: 'A canteen survey asks: “How happy are you with the food? 1 = very unhappy … 5 = very happy.” What type of data are the answers?',
          o: ['Ordinal — ordered categories coded as numbers', 'Nominal — categories with no order', 'Continuous — measured to any decimal', 'Discrete — a count of objects'],
          a: 0, mis: { 1: 'The choices clearly go from unhappy to happy, so they have an order.', 3: 'The numbers are codes for feelings, not counts of anything.' },
          ex: 'Each number stands for an ordered feeling. The order matters, but the gaps between levels are not guaranteed equal, so it is ordinal.' },
        { id: 'u2-03-q13', c: 'nominal-ordinal', t: 'mcq', d: 3, q: 'A survey codes mother tongue as Hindi = 1, Tamil = 2, Bengali = 3. Ayaan calculates the class’s “average language” as 1.8. What is wrong?',
          o: ['The codes are labels for nominal data, so an average is meaningless', 'He should have used the median because the data is ordinal', 'He made an arithmetic slip; the true average is 2', 'Nothing — any data with numbers can be averaged'],
          a: 0, mis: { 1: 'Languages have no natural order, so they are nominal, not ordinal.', 3: 'Numbers used as codes are still labels. Arithmetic on them has no meaning.' },
          ex: 'The numbers only name languages. Language 1.8 does not exist, so averaging nominal codes gives a meaningless result.' },

        // discrete-continuous
        { id: 'u2-03-q14', c: 'discrete-continuous', t: 'mcq', d: 1, q: 'Which of these is <b>continuous</b> data?',
          o: ['Height of a plant in cm', 'Number of leaves on the plant', 'Number of plants in a pot', 'Number of flowers that bloomed'],
          a: 0, ex: 'Height is measured and can take any value, such as 23.6 cm. The others are counted.' },
        { id: 'u2-03-q15', c: 'discrete-continuous', t: 'mcq', d: 1, q: 'Which describes <b>discrete</b> data?',
          o: ['Countable values in separate steps, such as whole numbers', 'Values that can be any decimal within a range', 'Categories that have no order', 'Categories that have an order'],
          a: 0, ex: 'Discrete data is counted — number of students, wickets or cars — with no values in between.' },
        { id: 'u2-03-q16', c: 'discrete-continuous', t: 'bins', d: 2, q: 'Sort each variable into discrete or continuous.',
          bins: ['Discrete', 'Continuous'],
          items: [['Number of wickets taken', 0], ['Time taken to run 100 m', 1], ['Number of students absent', 0], ['Body temperature', 1], ['Number of cars at a signal', 0], ['Weight of a watermelon', 1]],
          ex: 'Wickets, absentees and cars are counted (discrete). Time, temperature and weight are measured (continuous).' },
        { id: 'u2-03-q17', c: 'discrete-continuous', t: 'mcq', d: 2, q: 'Diya records two things for July: the number of rainy days and the total rainfall in mm. Which statement is correct?',
          o: ['Rainy days is discrete; total rainfall is continuous', 'Rainy days is continuous; total rainfall is discrete', 'Both are discrete because they are numbers', 'Both are qualitative because they describe weather'],
          a: 0, mis: { 2: 'Rainfall is measured, so it can be 212.7 mm. Being a number does not make data discrete.', 3: 'Both are numbers on which arithmetic makes sense, so both are quantitative.' },
          ex: 'Days are counted (discrete); rainfall is measured and can take decimal values (continuous).' },
        { id: 'u2-03-q18', c: 'discrete-continuous', t: 'mcq', d: 3, q: 'A weather station records every 10 minutes: air temperature, humidity in %, and the number of lightning strikes nearby. Which of these is discrete?',
          o: ['The number of lightning strikes', 'The air temperature', 'The humidity in %', 'The time of each reading'],
          a: 0, mis: { 2: 'Humidity is measured and can be 63.4%, so it is continuous even though it is a percentage.' },
          ex: 'Lightning strikes are counted in whole numbers. Temperature, humidity and time are measured, so they are continuous.' },
        { id: 'u2-03-q19', c: 'discrete-continuous', t: 'tf', d: 2, q: 'Continuous data can take any value within a range, including decimals such as 152.75 cm.',
          a: true, ex: 'True. Measured quantities like height can be as precise as the measuring tool allows.' },
        { id: 'u2-03-q20', c: 'discrete-continuous', t: 'mcq', d: 3, q: 'A school-bus app shows “Arriving in 4.5 min” and “Seats free: 12”. Which statement is correct?',
          o: ['Arrival time is continuous; seats free is discrete', 'Arrival time is discrete; seats free is continuous', 'Both are continuous because the app measures them', 'Both are ordinal because they help you decide'],
          a: 0, mis: { 2: 'Seats are counted — you cannot have 12.5 free seats.', 3: 'Both are quantities you can do arithmetic on, so they are quantitative, not ordinal.' },
          ex: 'Time is measured and can take any value; seats are counted in whole numbers.' },

        // data-forms
        { id: 'u2-03-q21', c: 'data-forms', t: 'match', d: 1, q: 'Match each example to its form of data.',
          pairs: [['CCTV footage of a traffic junction', 'Video'], ['Recording of a bird call', 'Audio'], ['A WhatsApp message', 'Text'], ['A chest X-ray', 'Image'], ['Daily AQI readings for a city', 'Numeric']],
          ex: 'Footage is video, a recording is audio, a message is text, an X-ray is an image and AQI readings are numbers.' },
        { id: 'u2-03-q22', c: 'data-forms', t: 'mcq', d: 1, q: 'Which AI domain mainly works with images and video?',
          o: ['Computer Vision', 'Natural Language Processing', 'Data (Statistical Data)', 'Rule-based modelling'],
          a: 0, ex: 'Computer Vision lets machines interpret images and video.' },
        { id: 'u2-03-q23', c: 'data-forms', t: 'mcq', d: 2, q: 'An app lets farmers ask questions aloud in Marathi and turns them into text. What form of input data does it use, and which domain handles it?',
          o: ['Audio data, handled by NLP', 'Audio data, handled by Computer Vision', 'Image data, handled by NLP', 'Numeric data, handled by Computer Vision'],
          a: 0, mis: { 1: 'Computer Vision works with images and video. Speech is language, which belongs to NLP.' },
          ex: 'Spoken questions are audio, and understanding speech and text is the job of Natural Language Processing.' },
        { id: 'u2-03-q24', c: 'data-forms', t: 'tf', d: 2, q: 'Inside a computer, a selfie is stored as a grid of numbers (pixel values).',
          a: true, ex: 'True. Each pixel is stored as numbers for its colour, so an image is a grid (matrix) of numbers.' },
        { id: 'u2-03-q25', c: 'data-forms', t: 'mcq', d: 3, q: 'A hospital AI studies patients’ X-ray scans together with doctors’ typed notes. Which statement is correct?',
          o: ['It combines image data (CV) with text data (NLP)', 'It uses only numeric data from the Data domain', 'It uses only audio data from the doctors', 'It uses only text, since X-rays are reports'],
          a: 0, mis: { 1: 'X-rays are images and notes are text — neither is a plain table of numbers.', 3: 'An X-ray scan is a picture, so it is image data.' },
          ex: 'X-rays are images (Computer Vision) and typed notes are text (NLP). Many real systems combine domains.' },
        { id: 'u2-03-q26', c: 'data-forms', t: 'multi', d: 2, q: 'Which of these are image or video data? Select all that apply.',
          o: ['A satellite photo of a cyclone', 'Dashcam footage from a bus', 'A scanned handwritten answer sheet', 'A podcast episode', 'A spreadsheet of marks'],
          a: [0, 1, 2], ex: 'Photos, footage and scans are images or video. A podcast is audio and a spreadsheet is numeric, tabular data.' },

        // structured
        { id: 'u2-03-q27', c: 'structured', t: 'mcq', d: 1, q: 'What is <b>structured</b> data?',
          o: ['Data organised in rows and columns with fixed fields', 'Data in the form of photos and videos', 'Data that has been deleted and recovered', 'Data written as free sentences in a diary'],
          a: 0, ex: 'Structured data fits a table with fixed fields, like a spreadsheet, so it is easy to sort and calculate.' },
        { id: 'u2-03-q28', c: 'structured', t: 'bins', d: 2, q: 'Sort each example into structured or unstructured data.',
          bins: ['Structured', 'Unstructured'],
          items: [['Attendance register in a spreadsheet', 0], ['Voice notes in a class group', 1], ['Railway reservation records (PNR, name, seat)', 0], ['Photos from the school annual day', 1], ['Free-text answers to “What would you change?”', 1], ['Table of monthly electricity bills', 0]],
          ex: 'Spreadsheets and records with fixed fields are structured. Voice notes, photos and free text have no fixed rows and columns.' },
        { id: 'u2-03-q29', c: 'structured', t: 'mcq', d: 2, q: 'Why is unstructured data harder for a computer to analyse directly?',
          o: ['It has no fixed rows and columns, so it must be processed first', 'It is always much smaller than structured data', 'It can only be stored on paper, not computers', 'It never contains any useful information'],
          a: 0, mis: { 1: 'Unstructured data such as video is often very large. Size is not the reason.', 3: 'Photos, speech and messages hold lots of useful information — it just needs CV or NLP to extract it.' },
          ex: 'Without fixed fields, a computer cannot simply sort or add it. Techniques like CV and NLP turn it into something analysable.' },
        { id: 'u2-03-q30', c: 'structured', t: 'tf', d: 1, q: 'A video of a cricket match is an example of structured data.',
          a: false, ex: 'False. Video has no fixed rows and columns, so it is unstructured. A scorecard table of the same match would be structured.' },
        { id: 'u2-03-q31', c: 'structured', t: 'mcq', d: 3, q: 'A school feedback form has five tick-box options for “Rate the canteen” and an open “Comments” box. Which statement is correct?',
          o: ['The ratings become structured data; the comments are unstructured', 'Both parts are structured because they are on one form', 'Both parts are unstructured because students wrote them', 'The ratings are unstructured; the comments are structured'],
          a: 0, mis: { 1: 'Being on the same form does not make free sentences fit fixed fields.' },
          ex: 'Ticked ratings fit neatly into one column. Free comments are open-ended text with no fixed format.' },
        { id: 'u2-03-q32', c: 'structured', t: 'mcq', d: 3, q: 'An agriculture AI receives a table of soil pH for each field and thousands of phone photos of crop leaves. Which description fits?',
          o: ['The table is structured; the photos are unstructured image data for CV', 'The table is unstructured; the photos are structured numeric data', 'Both are structured because a computer stores them', 'Both are unstructured because they come from farms'],
          a: 0, mis: { 2: 'Everything is stored digitally, but only the table has fixed rows and columns.' },
          ex: 'The pH table has fixed fields (structured). Leaf photos are images without fixed fields (unstructured), analysed with Computer Vision.' },

        // primary-secondary
        { id: 'u2-03-q33', c: 'primary-secondary', t: 'mcq', d: 1, q: 'What is <b>primary</b> data?',
          o: ['Data collected first-hand by you for your own purpose', 'Data that someone else collected earlier', 'The most important column in a table', 'Data that has already been cleaned'],
          a: 0, ex: 'Primary data is collected directly by the person or team who will use it, for example through their own survey.' },
        { id: 'u2-03-q34', c: 'primary-secondary', t: 'mcq', d: 2, q: 'Sana uses Census of India figures for her project on literacy. For her, this data is…',
          o: ['secondary, because it was collected by someone else', 'primary, because it is official government data', 'primary, because she is using it first', 'unstructured, because it is about people'],
          a: 0, mis: { 1: 'Official does not mean primary. What matters is who collected it — here, the Census, not Sana.' },
          ex: 'Sana did not collect the Census data herself, so it is secondary data for her project.' },
        { id: 'u2-03-q35', c: 'primary-secondary', t: 'bins', d: 2, q: 'Sort each example into primary or secondary data.',
          bins: ['Primary', 'Secondary'],
          items: [['Measuring classmates’ heights yourself', 0], ['Downloading crop data from data.gov.in', 1], ['Interviewing the canteen staff', 0], ['Using cricket statistics from a sports website', 1], ['Counting vehicles at the school gate for an hour', 0], ['Reading rainfall records published by IMD', 1]],
          ex: 'Measuring, interviewing and counting yourself give primary data. Data from data.gov.in, websites or IMD was collected by others — secondary.' },
        { id: 'u2-03-q36', c: 'primary-secondary', t: 'mcq', d: 3, q: 'Kabir wants to know which snack students in <i>his school’s</i> Class 9 like best. Which data source fits best?',
          o: ['Primary data from a short survey of Class 9 students', 'Secondary data from a national food report', 'Secondary data from an online snack-sales chart', 'Primary data from his own favourite snack list'],
          a: 0, mis: { 1: 'A national report will not tell you about this one class.', 3: 'His own preferences are only one person’s view, not the class’s.' },
          ex: 'No existing data is this specific, so collecting primary data from the students themselves fits the question best.' },
        { id: 'u2-03-q37', c: 'primary-secondary', t: 'tf', d: 2, q: 'Secondary data is always less accurate than primary data.',
          a: false, ex: 'False. Secondary data such as the Census or IMD records can be very reliable. “Secondary” only means someone else collected it.' },
        { id: 'u2-03-q38', c: 'primary-secondary', t: 'mcq', d: 2, q: 'What is a main advantage of secondary data?',
          o: ['It saves time and money because it has already been collected', 'It always fits your exact question perfectly', 'It is always more recent than primary data', 'It never needs to be checked for errors'],
          a: 0, mis: { 1: 'Secondary data was collected for someone else’s purpose, so it may not fit your question exactly.' },
          ex: 'Using existing data avoids the effort of collecting it yourself, though you must still check that it fits and is reliable.' },
        { id: 'u2-03-q39', c: 'primary-secondary', t: 'mcq', d: 3, q: 'Meera uses IMD’s published rainfall data for her district and also her own daily readings from the school rain gauge. Which statement is correct?',
          o: ['IMD data is secondary; her rain-gauge readings are primary', 'IMD data is primary; her rain-gauge readings are secondary', 'Both are primary because both are about rainfall', 'Both are secondary because both are numbers'],
          a: 0, mis: { 2: 'The topic does not decide the type — who collected the data does.' },
          ex: 'Meera collected the gauge readings herself (primary). IMD collected and published the district data (secondary).' }
      ],
      gens: ['data-type']
    },

    // ───────────────────────────────────────────────────────────── u2-04
    {
      id: 'u2-04',
      title: 'Acquiring Data',
      minutes: 60,
      outcomes: [
        'Determine the best methods to acquire data',
        'List different methodologies to acquire data and their strengths and limits',
        'Apply best practices for acquiring data: relevance, accuracy, consent, ethics and documentation'
      ],
      hook: 'The canteen ran out of samosas again. Before any AI can predict tomorrow’s demand, someone has to decide where the data will come from — that someone is you.',
      concepts: {
        'acq-methods': 'Methods of acquiring data',
        'acq-choose': 'Choosing the right method',
        'acq-online': 'Web scraping, APIs and open data',
        'acq-best': 'Best practices for acquiring data',
        'acq-ethics': 'Consent, ethics and fair sampling'
      },
      steps: [
        { kind: 'card', title: 'The samosa problem', html: `
<p>Your school canteen runs out of samosas on some days and throws extras away on others. The principal asks your class to build a simple AI to predict how many to make. The first question is not about AI at all: <b>where will the data come from?</b></p>
<div class="cols">
<div class="mini"><h4>🗣️ Ask people</h4><p>Survey students: “How often do you buy samosas?”</p></div>
<div class="mini"><h4>👀 Watch</h4><p>Count how many are sold in each break for two weeks.</p></div>
<div class="mini"><h4>📚 Use records</h4><p>The canteen’s sales register for the past year.</p></div>
<div class="mini"><h4>🌐 Go online</h4><p>Weather data — do rainy days change sales?</p></div>
</div>
<div class="key"><b>Key idea</b> How you collect data decides how good your AI can ever be.</div>` },

        { kind: 'card', title: 'What is data acquisition?', html: `
<div class="def"><dfn>Data acquisition</dfn> Collecting accurate, reliable and relevant data for a clear purpose. It is the second stage of the AI Project Cycle.</div>
<p>Every method answers one of four questions: Can we <b>ask</b> people? Can we <b>watch</b>? Can a <b>machine measure</b> it? Has someone <b>already collected</b> it?</p>
<table class="tbl"><thead><tr><th>Family</th><th>Methods</th></tr></thead><tbody>
<tr><td>Ask people</td><td>Surveys, interviews</td></tr>
<tr><td>Watch</td><td>Observation, cameras</td></tr>
<tr><td>Machines measure</td><td>Sensors and IoT devices</td></tr>
<tr><td>Already collected</td><td>Existing records, open data, APIs, web scraping</td></tr>
</tbody></table>` },

        { kind: 'card', title: 'Asking people: surveys and interviews', html: `
<table class="tbl"><thead><tr><th></th><th>📋 Survey</th><th>🎙️ Interview</th></tr></thead><tbody>
<tr><td><b>What</b></td><td>The same set of questions to many people, on paper or an online form</td><td>A detailed conversation with one person or a small group</td></tr>
<tr><td><b>Good for</b></td><td>Facts and opinions from many people, quickly</td><td>Deep reasons and stories — the “why”</td></tr>
<tr><td><b>Watch out</b></td><td>Fixed answers miss detail; people may misread questions or not answer honestly</td><td>Slow; covers only a few people; the interviewer can influence answers</td></tr>
<tr><td><b>Example</b></td><td>How 600 students travel to school</td><td>Why some farmers in a village switched crops</td></tr>
</tbody></table>` },

        { kind: 'card', title: 'Watching and measuring: observation, sensors, cameras', html: `
<div class="cols">
<div class="mini"><h4>👀 Observation</h4><p>Watch and record what really happens — for example, tally how many people use the zebra crossing. It shows actual behaviour, but it is slow and an observer can miss things.</p></div>
<div class="mini"><h4>📡 Sensors &amp; IoT</h4><p>Devices measure automatically, day and night: soil-moisture probes, smart electricity meters, weather stations, fitness bands. <b>IoT</b> (Internet of Things) devices send their readings over the internet. They need power, upkeep and calibration.</p></div>
<div class="mini"><h4>📷 Cameras</h4><p>Traffic cameras, camera traps in forests, crop-photo apps. They produce image and video data for Computer Vision — and raise privacy questions.</p></div>
</div>` },

        { kind: 'check', concepts: ['acq-methods'], n: 2 },

        { kind: 'card', title: 'Online sources: web scraping and APIs', html: `
<div class="def"><dfn>Web scraping</dfn> Using a program to collect information automatically from web pages.</div>
<div class="def"><dfn>API</dfn> Application Programming Interface — a set of rules that lets one program request data or services from another. A weather app asks a weather service’s API for today’s forecast.</div>
<div class="cols">
<div class="mini"><h4>🕸️ Scraping</h4><p>Works on many public pages, but pages change and break the scraper. Respect the site’s terms of use, never collect personal data, and don’t flood the site with requests.</p></div>
<div class="mini"><h4>🔌 API</h4><p>The provider’s official doorway: data arrives in a stable, structured format, with permission. Prefer an API whenever one exists.</p></div>
</div>` },

        { kind: 'card', title: 'Existing records and open data', html: `
<p>Often the data you need already exists:</p>
<ul>
<li><b>Organisation records:</b> school attendance and results, hospital admissions, canteen sales registers, library logs.</li>
<li><b>Open government data:</b> <b>data.gov.in</b> is India’s Open Government Data Platform, where ministries and departments publish datasets that anyone can download.</li>
<li><b>Official statistics:</b> the Census of India, weather records from IMD.</li>
</ul>
<div class="eg"><b>Example</b> For a project on rainfall and crops in your state, you could search data.gov.in for published datasets instead of collecting years of data yourself.</div>
<div class="warn"><b>Careful</b> Existing data was collected for someone else’s purpose. Check its date, units, coverage and what each column really means.</div>` },

        { kind: 'card', title: 'Choosing the right method', html: `
<table class="tbl"><thead><tr><th>You want to know…</th><th>A good method</th></tr></thead><tbody>
<tr><td>Opinions of 500 students</td><td>Survey (online or paper)</td></tr>
<tr><td>Why a few shopkeepers stopped using plastic bags</td><td>Interviews</td></tr>
<tr><td>How people actually cross the road</td><td>Observation or a camera</td></tr>
<tr><td>Classroom temperature every 5 minutes</td><td>Sensor</td></tr>
<tr><td>Live weather inside your app</td><td>Weather API</td></tr>
<tr><td>Literacy rate of every district</td><td>Census or other open data</td></tr>
</tbody></table>
<div class="key"><b>Key idea</b> No method is best for everything. Match the method to the question, the people involved, the time and the budget.</div>` },

        { kind: 'check', concepts: ['acq-online', 'acq-choose'], n: 2 },

        { kind: 'card', title: 'Best practices for acquiring data', html: `
<ol class="flow">
<li><b>Clear purpose</b><span>Write the question first. It decides what to collect.</span></li>
<li><b>Relevant features</b><span>Collect what affects the problem: rainfall for crop yield, not the farmer’s favourite film.</span></li>
<li><b>Enough data</b><span>Ten photos can’t teach an AI every mango variety; many varied examples can.</span></li>
<li><b>Accuracy</b><span>Use the same method for everyone — measure every height without shoes.</span></li>
<li><b>Reliable sources</b><span>Prefer official or well-documented sources over random forwards.</span></li>
<li><b>Documentation</b><span>Record who collected what, when, where and how, so others can check and repeat it.</span></li>
</ol>` },

        { kind: 'card', title: 'Consent, ethics and fair sampling', html: `
<p>Most data comes from people, so collect it fairly:</p>
<ul>
<li><b>Consent:</b> explain the purpose and get permission — from parents too, for students under 18.</li>
<li><b>Collect only what you need:</b> a canteen survey does not need anyone’s Aadhaar number.</li>
<li><b>Protect and anonymise</b> responses before you share results.</li>
</ul>
<div class="warn"><b>Avoid sampling bias</b> Ask only the school cricket team about favourite sports and cricket will “win”. An online-only survey misses families without internet. Include every group your question is about.</div>` },

        { kind: 'check', concepts: ['acq-best', 'acq-ethics'], n: 3 },

        { kind: 'card', title: 'Common mistakes', html: `
<div class="cols">
<div class="mini"><h4>❌ “More data fixes everything.”</h4><p>If data is biased or inaccurate, more of it just repeats the errors.</p></div>
<div class="mini"><h4>❌ “Online means free to use.”</h4><p>Check the terms of use and licence. Personal data is off-limits.</p></div>
<div class="mini"><h4>❌ “My friends are a fair sample.”</h4><p>Friends often think alike. Sample across classes, sections and groups.</p></div>
<div class="mini"><h4>❌ “Collect now, decide later.”</h4><p>Collecting without a purpose wastes effort and risks privacy.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // acq-methods
        { id: 'u2-04-q01', c: 'acq-methods', t: 'mcq', d: 1, q: 'What does <b>data acquisition</b> mean?',
          o: ['Collecting accurate, reliable and relevant data for a purpose', 'Deleting old data to free up storage space', 'Drawing charts to present a final result', 'Testing a trained model on new examples'],
          a: 0, ex: 'Data acquisition is the collection stage: gathering the right data, accurately and reliably, for a clear purpose.' },
        { id: 'u2-04-q02', c: 'acq-methods', t: 'match', d: 1, q: 'Match each method to its description.',
          pairs: [['Survey', 'Asking many people the same set of questions'], ['Interview', 'A detailed conversation with one person'], ['Observation', 'Watching and recording what happens'], ['Sensor', 'A device that measures something automatically']],
          ex: 'Surveys reach many people with fixed questions; interviews go deep with a few; observation records behaviour; sensors measure automatically.' },
        { id: 'u2-04-q03', c: 'acq-methods', t: 'mcq', d: 2, q: 'Which of these is a <b>sensor-based</b> way of acquiring data?',
          o: ['A soil-moisture probe that sends a reading every hour', 'A questionnaire handed out to farmers at a mela', 'A conversation with a farmer about her crops', 'A government report on crop prices'],
          a: 0, mis: { 1: 'A questionnaire is a survey — people answer questions. A sensor measures without asking anyone.', 3: 'A published report is an existing record (secondary data).' },
          ex: 'A sensor measures a physical quantity — here, soil moisture — automatically and repeatedly.' },
        { id: 'u2-04-q04', c: 'acq-methods', t: 'tf', d: 1, q: 'Interviews usually give deeper detail than surveys, but they take more time per person.',
          a: true, ex: 'True. Interviews explore the “why” in depth but can cover only a few people in the same time a survey reaches many.' },
        { id: 'u2-04-q05', c: 'acq-methods', t: 'mcq', d: 2, q: 'What is a common weakness of surveys?',
          o: ['People may misunderstand questions or not answer honestly', 'They can only be done with expensive sensors', 'They can never reach more than five people', 'They always produce video data'],
          a: 0, mis: { 2: 'Surveys are good at reaching many people quickly — that is their strength.' },
          ex: 'Surveys rely on what people say. Unclear questions or the wish to give a “nice” answer can make responses inaccurate.' },
        { id: 'u2-04-q06', c: 'acq-methods', t: 'multi', d: 2, q: 'Which of these are sensor or IoT data sources? Select all that apply.',
          o: ['A smart electricity meter', 'A fitness band counting steps', 'A temperature probe at a weather station', 'A printed newspaper article', 'A handwritten class diary'],
          a: [0, 1, 2], ex: 'Meters, fitness bands and weather probes measure automatically. Newspapers and diaries are written records.' },
        { id: 'u2-04-q07', c: 'acq-methods', t: 'mcq', d: 2, q: 'Cameras at a busy junction record traffic all day. What form of data do they collect, and which AI domain would analyse it?',
          o: ['Video data, analysed with Computer Vision', 'Text data, analysed with NLP', 'Audio data, analysed with NLP', 'Survey data, analysed by interviews'],
          a: 0, mis: { 1: 'Cameras capture pictures, not written words. Images and video belong to Computer Vision.' },
          ex: 'Cameras produce images and video, which Computer Vision can use to count vehicles or detect jams.' },

        // acq-choose
        { id: 'u2-04-q08', c: 'acq-choose', t: 'mcq', d: 2, q: 'Your school wants to know how its 500 students travel to school. Which method fits best?',
          o: ['A short survey for all students', 'A one-hour interview with each student', 'A sensor attached to every student', 'Web scraping of transport websites'],
          a: 0, mis: { 1: 'Five hundred long interviews would take far too long for a simple factual question.' },
          ex: 'A survey collects the same simple facts from many people quickly — perfect for a question like this.' },
        { id: 'u2-04-q09', c: 'acq-choose', t: 'mcq', d: 2, q: 'A researcher wants to understand in depth why a few farmers in a village stopped growing cotton. Which method fits best?',
          o: ['Interviews with those farmers', 'A camera at the village crossroads', 'An online survey with tick boxes', 'A weather API for the region'],
          a: 0, mis: { 2: 'Tick boxes miss the detailed reasons. Deep “why” questions suit interviews.' },
          ex: 'Interviews let people explain their reasons in their own words, which is what an in-depth question needs.' },
        { id: 'u2-04-q10', c: 'acq-choose', t: 'mcq', d: 3, q: 'A health centre must check that its vaccine refrigerator stays cold every minute of the day and night. Which method is best?',
          o: ['A temperature sensor that logs readings automatically', 'A staff member noting the temperature once a week', 'A survey asking nurses whether the fridge feels cold', 'Secondary data from a refrigerator advertisement'],
          a: 0, mis: { 1: 'Weekly readings would miss a problem on any other day. Continuous monitoring needs a sensor.', 2: 'Feelings are not measurements; a sensor gives accurate numbers.' },
          ex: 'Sensors measure continuously and accurately without getting tired — ideal for round-the-clock monitoring.' },
        { id: 'u2-04-q11', c: 'acq-choose', t: 'mcq', d: 3, q: 'Students want to know how many people outside their school actually use the zebra crossing versus crossing elsewhere. Which method gives the most accurate picture?',
          o: ['Observation — watch and tally what people really do', 'A survey asking people whether they use the crossing', 'Interviews with three friends', 'Web scraping of traffic news'],
          a: 0, mis: { 1: 'People may say they use the crossing even when they don’t. Watching shows actual behaviour.' },
          ex: 'Observation records real behaviour, avoiding the gap between what people say and what they do.' },
        { id: 'u2-04-q12', c: 'acq-choose', t: 'match', d: 2, q: 'Match each need to a suitable data-collection method.',
          pairs: [['Hourly air quality across a city', 'Sensors'], ['Live weather inside your app', 'An API'], ['Literacy rate of every district', 'Census or open government data'], ['Why students skip breakfast, in depth', 'Interviews']],
          ex: 'Continuous measurement suits sensors, live service data suits an API, national statistics already exist as open data, and deep reasons suit interviews.' },
        { id: 'u2-04-q13', c: 'acq-choose', t: 'mcq', d: 3, q: 'Forest officers want to count leopards that move mostly at night in a large forest. Which method is most suitable?',
          o: ['Camera traps that photograph animals automatically', 'A survey of tourists who visited the forest', 'Interviews with forest officers in the city office', 'An online poll asking people to guess the number'],
          a: 0, mis: { 1: 'Tourists rarely see shy night animals, so their answers would be guesses.' },
          ex: 'Automatic cameras work day and night without disturbing the animals, giving image data that can be counted.' },
        { id: 'u2-04-q14', c: 'acq-choose', t: 'tf', d: 2, q: 'There is one best data-collection method that suits every problem.',
          a: false, ex: 'False. The best method depends on the question, the people involved, time and budget.' },

        // acq-online
        { id: 'u2-04-q15', c: 'acq-online', t: 'mcq', d: 3, q: 'A start-up wants daily vegetable prices from many public shop websites. No API exists. If it uses web scraping, what must it do?',
          o: ['Follow each site’s terms of use and avoid collecting personal data', 'Copy everything, including customers’ names and phone numbers', 'Send thousands of requests a second to finish quickly', 'Hide its identity so websites cannot apply their rules'],
          a: 0, mis: { 1: 'Collecting personal data breaks privacy and is not needed for prices.', 2: 'Flooding a site with requests can slow or crash it for everyone.' },
          ex: 'Responsible scraping respects terms of use, takes only what is needed (prices, not personal data) and does not overload the website.' },
        { id: 'u2-04-q16', c: 'acq-online', t: 'mcq', d: 1, q: 'What is an <b>API</b> (Application Programming Interface)?',
          o: ['A set of rules that lets one program request data or services from another', 'A camera that records traffic automatically', 'A paper form used in surveys', 'A type of chart used in dashboards'],
          a: 0, ex: 'An API is a doorway for programs: an app sends a request and the service sends back data, such as a weather forecast.' },
        { id: 'u2-04-q17', c: 'acq-online', t: 'mcq', d: 1, q: 'What is <b>web scraping</b>?',
          o: ['Using a program to collect information automatically from web pages', 'Deleting your browsing history after using a website', 'Typing survey answers into a website by hand', 'Removing viruses from a website'],
          a: 0, ex: 'Web scraping uses code to read web pages and pull out the needed information automatically.' },
        { id: 'u2-04-q18', c: 'acq-online', t: 'tf', d: 2, q: 'If information is visible on a website, it is always fine to scrape it and reuse it however you like.',
          a: false, ex: 'False. Websites have terms of use, and personal data must be respected even when it is visible.' },
        { id: 'u2-04-q19', c: 'acq-online', t: 'mcq', d: 2, q: 'What is <b>data.gov.in</b>?',
          o: ['India’s Open Government Data Platform, where departments publish datasets', 'A private social-media site for sharing photos', 'An app that blocks phishing messages', 'A tool that turns tables into 3-D pie charts'],
          a: 0, mis: { 1: 'data.gov.in is an official government site for open datasets, not a social-media platform.' },
          ex: 'data.gov.in is India’s open data portal, where ministries and departments publish datasets anyone can use.' },
        { id: 'u2-04-q20', c: 'acq-online', t: 'mcq', d: 2, q: 'When a service offers an API, why do developers usually prefer it to scraping the same website?',
          o: ['The API gives permitted data in a stable, structured format', 'The API always gives more data than exists on the site', 'Scraping is the only way to get structured data', 'An API never needs any internet connection'],
          a: 0, mis: { 2: 'It is the other way round: APIs return structured data, while scraped pages need cleaning and break when layouts change.' },
          ex: 'An API is the official, permitted route, and its data format stays stable even when the web page design changes.' },
        { id: 'u2-04-q21', c: 'acq-online', t: 'multi', d: 2, q: 'Which are responsible practices when scraping websites? Select all that apply.',
          o: ['Checking the website’s terms of use', 'Not collecting personal data', 'Not overloading the site with requests', 'Copying private profiles if you can reach them', 'Hiding your identity to dodge the site’s rules'],
          a: [0, 1, 2], ex: 'Respect the site’s rules, people’s privacy and the site’s servers. Taking private data or dodging rules is unethical.' },
        { id: 'u2-04-q22', c: 'acq-online', t: 'mcq', d: 2, q: 'The weather app on your phone shows the current temperature for your city. How does the app most likely get this data?',
          o: ['By requesting it from a weather service through an API', 'By interviewing people in your city every hour', 'By asking you to type the temperature yourself', 'By reading your phone’s photo gallery'],
          a: 0, mis: { 1: 'Interviews are far too slow for live data. Apps request live data from services through APIs.' },
          ex: 'Apps commonly get live data, such as weather, by sending requests to a provider’s API.' },

        // acq-best
        { id: 'u2-04-q23', c: 'acq-best', t: 'order', d: 2, q: 'Put these steps for acquiring data in a sensible order.',
          items: ['Define the purpose and the question', 'Decide which features are needed', 'Choose reliable sources and methods', 'Collect the data and document how', 'Check the data for accuracy'],
          ex: 'The purpose decides the features; the features decide the sources; then you collect, record how, and check what you got.' },
        { id: 'u2-04-q24', c: 'acq-best', t: 'mcq', d: 1, q: 'What should you decide <b>first</b> before collecting any data?',
          o: ['The clear purpose or question the data must answer', 'The colour scheme for your final charts', 'The name of the file you will save', 'The number of slides in your presentation'],
          a: 0, ex: 'A clear purpose tells you what to collect, from whom and how much.' },
        { id: 'u2-04-q25', c: 'acq-best', t: 'multi', d: 1, q: 'Which are good practices when acquiring data? Select all that apply.',
          o: ['Collect features relevant to the problem', 'Record the source and date of the data', 'Use reliable, trustworthy sources', 'Collect every possible column “just in case”', 'Ask only one convenient person'],
          a: [0, 1, 2], ex: 'Relevance, documentation and reliable sources make data useful. Collecting everything wastes effort and risks privacy; one person is not enough.' },
        { id: 'u2-04-q26', c: 'acq-best', t: 'mcq', d: 2, q: 'A team wants to predict wheat yield in a district. Which feature is most relevant to collect?',
          o: ['Rainfall during the growing season', 'The farmer’s favourite film', 'The colour of the farmer’s tractor', 'The farmer’s mobile phone brand'],
          a: 0, mis: { 2: 'Tractor colour has no link to how much wheat grows.' },
          ex: 'Rainfall directly affects crop growth, so it is a relevant feature. The others are unrelated to yield.' },
        { id: 'u2-04-q27', c: 'acq-best', t: 'mcq', d: 2, q: 'Why should you document how, when and where data was collected?',
          o: ['So others can check it, trust it and repeat the collection', 'So the dataset looks longer and more impressive', 'So you never have to clean the data later', 'So the data becomes primary instead of secondary'],
          a: 0, mis: { 2: 'Documentation explains the data; it does not remove errors that need cleaning.' },
          ex: 'Good documentation lets others judge the data’s quality and repeat the process to confirm results.' },
        { id: 'u2-04-q28', c: 'acq-best', t: 'tf', d: 2, q: 'Collecting a very large amount of data cannot make up for data that is inaccurate or irrelevant.',
          a: true, ex: 'True. More of the wrong data only repeats the errors. Quality and relevance matter as much as quantity.' },
        { id: 'u2-04-q29', c: 'acq-best', t: 'mcq', d: 3, q: 'For a class height survey, some students were measured with shoes on and others without. What is the problem, and the fix?',
          o: ['The method was inconsistent; measure everyone the same way', 'The sample was too large; measure fewer students', 'Height is qualitative; record it as tall or short', 'There is no problem because shoes add very little'],
          a: 0, mis: { 3: 'Shoes can add a few centimetres — enough to distort comparisons. Accuracy needs one consistent method.' },
          ex: 'Accurate data needs the same procedure for everyone, so the differences come from heights, not from shoes.' },
        { id: 'u2-04-q30', c: 'acq-best', t: 'mcq', d: 3, q: 'A team trains an AI to judge mango ripeness using just 10 photos, all of one variety taken in one kitchen. What is the main issue?',
          o: ['Not enough varied data for the AI to learn from', 'Too much data, which will confuse the AI', 'Photos cannot be used to train AI', 'The data is secondary instead of primary'],
          a: 0, mis: { 1: 'Ten photos is very little. The AI needs many varied examples to handle new mangoes.', 2: 'Photos are image data, widely used to train Computer Vision models.' },
          ex: 'With few, similar photos, the AI will struggle on other varieties, lighting or backgrounds. It needs enough, varied data.' },

        // acq-ethics
        { id: 'u2-04-q31', c: 'acq-ethics', t: 'mcq', d: 1, q: 'In data collection, what does <b>consent</b> mean?',
          o: ['People agree to give their data, knowing how it will be used', 'People are told their data was used after the project ends', 'Data is collected secretly so answers are honest', 'Data is copied from a friend’s project'],
          a: 0, ex: 'Consent means people understand the purpose and agree before their data is collected or used.' },
        { id: 'u2-04-q32', c: 'acq-ethics', t: 'mcq', d: 2, q: 'To find the most popular sport in the school, Rohan surveys only members of the school cricket team. What is the problem?',
          o: ['The sample is biased towards cricket', 'The survey has too many students in it', 'Sports data cannot be collected by survey', 'Cricket players never answer honestly'],
          a: 0, mis: { 3: 'Their answers may be perfectly honest; the issue is that they are not a fair mix of the whole school.' },
          ex: 'A sample of cricket players over-represents cricket fans, so the result will not reflect the whole school.' },
        { id: 'u2-04-q33', c: 'acq-ethics', t: 'mcq', d: 3, q: 'A team wants to know how many families in a village have mobile internet, so it runs an <i>online-only</i> survey. Why is the result likely to be wrong?',
          o: ['Families without internet cannot answer, so the result looks too high', 'Online surveys always collect too many answers', 'Villages do not have any families with phones', 'Internet access cannot be measured with a survey'],
          a: 0, mis: { 3: 'A survey can measure it — but it must reach people without internet too, e.g. door-to-door.' },
          ex: 'The method itself excludes the very people the question is about, so internet access will be over-estimated. That is sampling bias.' },
        { id: 'u2-04-q34', c: 'acq-ethics', t: 'tf', d: 1, q: 'Before photographing students for a dataset, you should ask for their permission.',
          a: true, ex: 'True. Photos are personal data. Students (and parents, for minors) should agree before images are collected.' },
        { id: 'u2-04-q35', c: 'acq-ethics', t: 'bins', d: 2, q: 'Sort each data-collection practice as ethical or unethical.',
          bins: ['Ethical', 'Unethical'],
          items: [['Explaining the purpose before a survey', 0], ['Letting people skip questions they prefer not to answer', 0], ['Collecting only the data that is needed', 0], ['Recording phone calls without telling the caller', 1], ['Scraping private social-media profiles', 1], ['Asking for Aadhaar numbers in a canteen survey', 1]],
          ex: 'Transparency, choice and collecting only what is needed respect people. Secret recording, taking private data and asking for unneeded ID numbers do not.' },
        { id: 'u2-04-q36', c: 'acq-ethics', t: 'mcq', d: 3, q: 'Kabir’s canteen survey should represent the whole school. Which plan is best?',
          o: ['Survey students from every class and section', 'Survey only his close friends because they reply fast', 'Survey only students who already love the canteen', 'Survey only Class 12 because they are the oldest'],
          a: 0, mis: { 1: 'Friends often share tastes, so their answers may not represent everyone.' },
          ex: 'A sample that includes every group in the school gives a fairer, less biased picture.' },
        { id: 'u2-04-q37', c: 'acq-ethics', t: 'mcq', d: 2, q: 'Which action shows good ethics when sharing survey results?',
          o: ['Removing names before sharing the responses', 'Posting each student’s answers with their photo', 'Sharing phone numbers so people can discuss answers', 'Selling the responses to a coaching company'],
          a: 0, mis: { 2: 'Sharing phone numbers exposes personal data that was never needed for the results.' },
          ex: 'Anonymising responses protects the people who took part while still letting others learn from the results.' }
      ]
    },

    // ───────────────────────────────────────────────────────────── u2-05
    {
      id: 'u2-05',
      title: 'Data Features and Preprocessing',
      minutes: 90,
      outcomes: [
        'Identify features (input variables) and labels in a dataset',
        'Describe the steps of data preprocessing: cleaning, transformation, reduction and integration',
        'Handle missing values, duplicates, outliers and inconsistent formats, and explain “garbage in, garbage out”'
      ],
      hook: 'One typo in a spreadsheet made a Class 9 student 16 metres tall. Learn to catch it before an AI learns from it.',
      concepts: {
        'features-labels': 'Features and labels',
        'pre-why': 'Why preprocess: garbage in, garbage out',
        'cleaning': 'Missing values and duplicates',
        'outliers': 'Outliers and inconsistent formats',
        'transform': 'Data transformation: normalisation, encoding, units',
        'reduce-integrate': 'Data reduction and integration'
      },
      steps: [
        { kind: 'card', title: 'A table with five hidden problems', html: `
<p>Here are heights (in cm) from a Class 9 sports form, typed in a hurry:</p>
<table class="tbl"><thead><tr><th>Student</th><th>City</th><th>Height</th></tr></thead><tbody>
<tr><td>Aarav</td><td>Delhi</td><td>150</td></tr>
<tr><td>Bhavya</td><td>delhi</td><td>154</td></tr>
<tr><td>Chirag</td><td>DEL</td><td>152</td></tr>
<tr><td>Bhavya</td><td>delhi</td><td>154</td></tr>
<tr><td>Diya</td><td>Delhi</td><td><i>blank</i></td></tr>
<tr><td>Esha</td><td>Delhi</td><td>1.55</td></tr>
<tr><td>Farhan</td><td>Delhi</td><td>1600</td></tr>
</tbody></table>
<p>A spreadsheet happily averages the numbers it can see: <b>about 369 cm</b> — more than 3.5 metres! Once the problems are fixed, the real average is <b>about 154 cm</b>. Can you spot all five problems before reading on?</p>` },

        { kind: 'card', title: 'Features and labels', html: `
<p>Before cleaning, know what each column is for. Suppose an AI must predict whether a mango is ripe:</p>
<table class="tbl"><thead><tr><th>Colour</th><th>Softness (1–5)</th><th>Smell</th><th>Days since picked</th><th>Ripe?</th></tr></thead><tbody>
<tr><td>Yellow</td><td>4</td><td>Strong</td><td>6</td><td>Yes</td></tr>
<tr><td>Green</td><td>1</td><td>Faint</td><td>1</td><td>No</td></tr>
</tbody></table>
<div class="def"><dfn>Features</dfn> The input variables (attributes) that describe each example — here colour, softness, smell and days since picked.</div>
<div class="def"><dfn>Label</dfn> The answer the model learns to predict — here “Ripe?”.</div>
<p>Each <b>row</b> is one example (one mango). Each <b>column</b> is one feature, or the label.</p>` },

        { kind: 'card', title: 'Choosing good features', html: `
<div class="cols">
<div class="mini"><h4>✅ Relevant</h4><p>It affects the answer. Hours of study and attendance can help predict exam marks.</p></div>
<div class="mini"><h4>❌ Irrelevant</h4><p>Roll number or favourite colour tells you nothing about marks — it only adds noise.</p></div>
<div class="mini"><h4>⚠️ Unfair</h4><p>Features such as religion, caste or gender should not be used to decide things like admissions or loans.</p></div>
</div>
<div class="key"><b>Key idea</b> Good features are relevant, accurate and fair. A model can only learn from what its features tell it.</div>
<div class="eg"><b>Example</b> To predict crop yield, useful features include rainfall, soil type, seed variety and fertiliser used. The label is the yield in quintals per hectare.</div>` },

        { kind: 'check', concepts: ['features-labels'], n: 2 },

        { kind: 'card', title: 'Why preprocess? Garbage in, garbage out', html: `
<div class="def"><dfn>Data preprocessing</dfn> Preparing raw data so it is clean, consistent and ready for analysis or for training a model.</div>
<div class="key"><b>Garbage in, garbage out</b> A model fed messy or wrong data gives messy or wrong results — however clever the algorithm.</div>
<p>Preprocessing has four main parts (used as needed, not always in this order):</p>
<ol class="flow">
<li><b>Data cleaning</b><span>Handle missing values, remove duplicates, fix errors and inconsistent formats, deal with outliers.</span></li>
<li><b>Data transformation</b><span>Scaling/normalisation, encoding categories, unit conversion.</span></li>
<li><b>Data reduction</b><span>Remove irrelevant features or records.</span></li>
<li><b>Data integration</b><span>Combine data from several sources.</span></li>
</ol>` },

        { kind: 'card', title: 'Cleaning: missing values and duplicates', html: `
<h4>Missing values — three common choices</h4>
<div class="cols">
<div class="mini"><h4>✂️ Remove the row</h4><p>Fine when only a few rows of a large dataset have gaps.</p></div>
<div class="mini"><h4>🧩 Fill with the mean</h4><p>Use the average of the known values — works when there are no extreme values.</p></div>
<div class="mini"><h4>🎯 Fill with the median</h4><p>Use the middle value — safer when an outlier would pull the mean.</p></div>
</div>
<h4>Duplicates</h4>
<p>If Bhavya’s row appears twice, her height counts twice and every total, count and average is off. Remove exact duplicate rows.</p>
<div class="warn"><b>Careful</b> Don’t fill gaps with 0 by habit. A height of 0 cm is not “unknown” — it is wrong, and it drags the mean down.</div>` },

        { kind: 'card', title: 'Outliers and inconsistent formats', html: `
<div class="def"><dfn>Outlier</dfn> A value that is very different from the rest of the data.</div>
<div class="cols">
<div class="mini"><h4>🐞 Error outlier</h4><p>A height of 1600 cm is impossible — a typing slip for 160. Check the source and correct it.</p></div>
<div class="mini"><h4>🌟 Genuine outlier</h4><p>Kabir scores 100 when others score 40–60, and the teacher confirms it. Keep it — it is real.</p></div>
</div>
<p><b>Inconsistent formats</b> make one thing look like many: <code>Delhi</code>, <code>delhi</code> and <code>DEL</code> become three “cities”; dates written as <code>05/03/2026</code> and <code>2026-03-05</code> won’t sort together; <code>1.55</code> (metres) hides among centimetres. Standardise to one spelling, one date format and one unit.</p>` },

        { kind: 'check', concepts: ['pre-why', 'cleaning', 'outliers'], n: 3 },

        { kind: 'card', title: 'Worked example: watch the mean', html: `
<p>Four heights in cm: 150, 154, 152 and <b>1600</b> (a typo for 160).</p>
<div class="formula">Before: (150 + 154 + 152 + 1600) ÷ 4 = 2056 ÷ 4 = 514 cm</div>
<div class="formula">After: (150 + 154 + 152 + 160) ÷ 4 = 616 ÷ 4 = 154 cm</div>
<p>One wrong cell made the average more than three times too big. Duplicates do damage too: marks 30, 50 and 70, with the 70 row entered twice.</p>
<div class="formula">With the duplicate: 220 ÷ 4 = 55 · Without it: 150 ÷ 3 = 50</div>
<div class="key"><b>Key idea</b> Always clean <i>before</i> you calculate or train. One bad cell can change every result that follows.</div>` },

        { kind: 'lab', lab: 'data-cleaner', title: 'Data Cleaner', intro: 'A 12-row table of students, cities and heights is full of problems. Use the cleaning tools one at a time and watch the average height move back to something believable.' },

        { kind: 'card', title: 'Transformation: normalise, encode, convert', html: `
<div class="cols">
<div class="mini"><h4>📐 Normalisation</h4><p>Rescale numbers to a common range, often 0 to 1, so a feature with big numbers (income in ₹) doesn’t drown out one with small numbers (age).</p></div>
<div class="mini"><h4>🔤 Encoding</h4><p>Turn categories into numbers a model can use: Yes → 1, No → 0.</p></div>
<div class="mini"><h4>📏 Unit conversion</h4><p>Bring every value to one unit: 1.55 m → 155 cm; marks out of 50 and out of 100 → percentages.</p></div>
</div>
<div class="formula">Normalised value = (x − min) ÷ (max − min)</div>
<div class="eg"><b>Example</b> Marks range from 20 to 70. A mark of 60 becomes (60 − 20) ÷ (70 − 20) = 40 ÷ 50 = 0.8.</div>` },

        { kind: 'card', title: 'Reduction and integration', html: `
<div class="cols">
<div class="mini"><h4>✂️ Data reduction</h4><p>Remove features or records that don’t help: drop “favourite colour” when predicting exam marks. Smaller, focused data is faster to process and less noisy.</p></div>
<div class="mini"><h4>🔗 Data integration</h4><p>Combine data from several sources into one dataset: join the attendance sheet and the marks sheet by roll number to study whether attendance relates to marks.</p></div>
</div>
<div class="warn"><b>Careful</b> Integration needs a shared key, such as a roll number. Matching by names fails when one sheet says “Mohd. Ayaan” and the other “Mohammed Ayaan”.</div>` },

        { kind: 'check', concepts: ['transform', 'reduce-integrate'], n: 2 },

        { kind: 'card', title: 'Common mistakes', html: `
<div class="cols">
<div class="mini"><h4>❌ Delete every row with a gap</h4><p>If many rows have one blank, you may throw away most of your data. Consider filling instead.</p></div>
<div class="mini"><h4>❌ Remove all outliers</h4><p>Some outliers are real and important — a genuine topper, a record rainfall. Check before deleting.</p></div>
<div class="mini"><h4>❌ Fill gaps with 0</h4><p>Zero is a value, not “unknown”. It distorts averages.</p></div>
<div class="mini"><h4>❌ “Clean” away inconvenient data</h4><p>Cleaning fixes errors. Changing correct data to get the answer you want is dishonest.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 12, pass: 0.8 }
      ],
      pool: [
        // features-labels
        { id: 'u2-05-q01', c: 'features-labels', t: 'mcq', d: 1, q: 'In a dataset, what are <b>features</b>?',
          o: ['The input variables that describe each example', 'The final answers the model must predict', 'The colours used in a chart of the data', 'The names of the people who built the model'],
          a: 0, ex: 'Features are the attributes (columns) that describe each example and help predict the answer.' },
        { id: 'u2-05-q02', c: 'features-labels', t: 'mcq', d: 1, q: 'In a dataset used to train a model, what is the <b>label</b>?',
          o: ['The answer the model learns to predict', 'Any column that contains text', 'The first row of the spreadsheet', 'A note saying who collected the data'],
          a: 0, ex: 'The label is the output or answer for each example, such as “Ripe” or “Not ripe”.' },
        { id: 'u2-05-q03', c: 'features-labels', t: 'bins', d: 2, q: 'An AI will predict whether a mango is ripe. Sort each column into feature or label.',
          bins: ['Feature', 'Label'],
          items: [['Colour of the skin', 0], ['Softness when pressed', 0], ['Strength of smell', 0], ['Days since it was picked', 0], ['Ripe or not ripe', 1]],
          ex: 'Colour, softness, smell and days since picking describe the mango (features). “Ripe or not ripe” is what the model predicts (label).' },
        { id: 'u2-05-q04', c: 'features-labels', t: 'mcq', d: 2, q: 'A model predicts the monthly rent of flats in Pune using area, number of bedrooms and distance to the station. What is the label?',
          o: ['Monthly rent', 'Area in square feet', 'Number of bedrooms', 'Distance to the station'],
          a: 0, mis: { 1: 'Area is an input that helps predict rent, so it is a feature.' },
          ex: 'The rent is what the model must predict, so it is the label. The other columns are features.' },
        { id: 'u2-05-q05', c: 'features-labels', t: 'mcq', d: 3, q: 'A school wants to predict which students may need extra maths support. Which candidate feature should be dropped as irrelevant?',
          o: ['Roll number', 'Scores in earlier maths tests', 'Homework completion rate', 'Attendance in maths classes'],
          a: 0, mis: { 2: 'Homework completion can genuinely relate to how well a student is coping.' },
          ex: 'A roll number is just an identifier and has no link to maths ability. Keeping it only adds noise.' },
        { id: 'u2-05-q06', c: 'features-labels', t: 'tf', d: 2, q: 'In a typical dataset, each row describes one example and each column holds one feature or the label.',
          a: true, ex: 'True. For example, each row is one mango, and the columns are colour, softness and so on, plus “Ripe?”.' },

        // pre-why
        { id: 'u2-05-q07', c: 'pre-why', t: 'mcq', d: 1, q: 'What does “<b>garbage in, garbage out</b>” mean for AI?',
          o: ['Poor-quality input data leads to poor results', 'Old data should always be thrown away', 'AI models produce waste that must be deleted', 'Any data can give good results with a strong model'],
          a: 0, ex: 'If the data used to train or run a model is wrong or messy, the output will be unreliable too.' },
        { id: 'u2-05-q08', c: 'pre-why', t: 'mcq', d: 1, q: 'What is <b>data preprocessing</b>?',
          o: ['Preparing raw data so it is clean, consistent and ready to use', 'Collecting data through surveys and interviews', 'Presenting final results on a dashboard', 'Deploying a model inside a mobile app'],
          a: 0, ex: 'Preprocessing — cleaning, transforming, reducing and integrating — gets raw data ready for analysis or training.' },
        { id: 'u2-05-q09', c: 'pre-why', t: 'match', d: 2, q: 'Match each preprocessing step to an example.',
          pairs: [['Data cleaning', 'Removing a duplicated row'], ['Data transformation', 'Converting metres to centimetres'], ['Data reduction', 'Dropping a column that is irrelevant'], ['Data integration', 'Combining the marks and attendance sheets']],
          ex: 'Cleaning fixes errors; transformation changes form or scale; reduction removes what is not needed; integration combines sources.' },
        { id: 'u2-05-q10', c: 'pre-why', t: 'tf', d: 2, q: 'A powerful enough AI algorithm will always produce good results, even from messy, error-filled data.',
          a: false, ex: 'False. Garbage in, garbage out: a model learns from its data, so errors in the data become errors in its results.' },
        { id: 'u2-05-q11', c: 'pre-why', t: 'mcq', d: 3, q: 'A crop-disease app was trained on many blurry photos, and some were tagged with the wrong disease. Farmers say its answers are unreliable. What is the best explanation?',
          o: ['Garbage in, garbage out — poor training data gave a poor model', 'The farmers’ phones are too old to run AI apps', 'Crop photos can never be used to detect disease', 'The app needs a brighter colour scheme'],
          a: 0, mis: { 2: 'Photos can work very well for crop-disease detection when they are clear and correctly labelled.' },
          ex: 'Blurry images and wrong labels teach the model wrong patterns. Clean, correctly labelled data is needed.' },
        { id: 'u2-05-q12', c: 'pre-why', t: 'multi', d: 2, q: 'Which are good reasons to preprocess data? Select all that apply.',
          o: ['To fix errors such as typos', 'To make formats and units consistent', 'To handle missing values sensibly', 'To make the dataset look bigger', 'To hide results you don’t like'],
          a: [0, 1, 2], ex: 'Preprocessing improves quality and consistency. Padding the data or hiding inconvenient results is not preprocessing — it is misleading.' },

        // cleaning
        { id: 'u2-05-q13', c: 'cleaning', t: 'mcq', d: 1, q: 'Which of these is a <b>data-cleaning</b> task?',
          o: ['Removing duplicate rows', 'Choosing a chart colour', 'Writing the problem statement', 'Deploying the model in an app'],
          a: 0, ex: 'Data cleaning handles missing values, duplicates, errors, inconsistent formats and outliers.' },
        { id: 'u2-05-q14', c: 'cleaning', t: 'num', d: 2, q: 'Test marks are recorded as 40, 50, 60, 90, 90 — but one 90 is a duplicate row for the same student. After removing the duplicate, what is the mean mark?',
          a: 60, ex: 'Without the duplicate: (40 + 50 + 60 + 90) ÷ 4 = 240 ÷ 4 = 60. With it, the mean was 330 ÷ 5 = 66 — too high.' },
        { id: 'u2-05-q15', c: 'cleaning', t: 'num', d: 2, unit: '°C', q: 'Four daily temperatures were 30, 32, <i>missing</i>, 34 °C. If you fill the missing value with the <b>mean</b> of the known values, what value do you fill in?',
          a: 32, ex: 'Mean of the known values = (30 + 32 + 34) ÷ 3 = 96 ÷ 3 = 32 °C.' },
        { id: 'u2-05-q16', c: 'cleaning', t: 'num', d: 2, q: 'The known values in a column are 12, 15, 14, 90 and 13. One value is missing. If you fill it with the <b>median</b> of the known values, what value do you fill in?',
          a: 14, ex: 'In order: 12, 13, 14, 15, 90. The middle value is 14. The median ignores how extreme 90 is.' },
        { id: 'u2-05-q17', c: 'cleaning', t: 'mcq', d: 2, q: 'In a survey with 10,000 rows, just 3 rows have a missing age. What is a reasonable choice?',
          o: ['Remove those 3 rows; very little data is lost', 'Delete the whole age column', 'Fill the 3 gaps with 0', 'Throw away the whole survey'],
          a: 0, mis: { 1: 'Deleting the whole column loses 9,997 good values to fix 3 gaps.', 2: 'An age of 0 is wrong, not unknown, and pulls the average down.' },
          ex: 'When only a tiny share of rows have gaps, removing them loses almost nothing and keeps the data accurate.' },
        { id: 'u2-05-q18', c: 'cleaning', t: 'mcq', d: 3, q: 'A dataset of monthly family incomes in a town includes one billionaire. Some incomes are missing. Which value is safer for filling the gaps?',
          o: ['The median, because the extreme value barely affects it', 'The mean, because it uses every value', 'The largest income, to be generous', 'Zero, because the income is unknown'],
          a: 0, mis: { 1: 'The billionaire would pull the mean far above what a typical family earns.', 3: 'Zero is a real income value, not “unknown”, and would distort results.' },
          ex: 'The median is the middle value, so one huge income hardly changes it. The mean would be dragged up by the outlier.' },
        { id: 'u2-05-q19', c: 'cleaning', t: 'tf', d: 2, q: 'Filling every missing value with 0 is always a safe way to clean data.',
          a: false, ex: 'False. Zero is a real value. Using it for “unknown” can badly distort averages — think of a height of 0 cm.' },
        { id: 'u2-05-q20', c: 'cleaning', t: 'mcq', d: 3, q: 'Two teachers each entered Meera’s details, so she appears twice in the school’s fee records. If this is not fixed, what happens?',
          o: ['She is counted twice, so totals and averages are wrong', 'Nothing, because the two rows are identical', 'The records become more accurate with extra copies', 'Only her name changes; the numbers stay correct'],
          a: 0, mis: { 1: 'Identical rows still get counted twice in every sum, count and average.' },
          ex: 'Duplicate rows inflate counts and shift averages. Exact duplicates should be removed.' },

        // outliers
        { id: 'u2-05-q21', c: 'outliers', t: 'mcq', d: 1, q: 'What is an <b>outlier</b>?',
          o: ['A value that is very different from the rest of the data', 'A value that appears most often in the data', 'A column with no missing values', 'The middle value when data is sorted'],
          a: 0, ex: 'An outlier stands far away from the other values. It may be an error or a genuine unusual case.' },
        { id: 'u2-05-q22', c: 'outliers', t: 'mcq', d: 2, q: 'A Class 9 height list shows one value of 1600 cm. What is the most likely explanation and action?',
          o: ['A typing error — check the source and correct it, probably to 160', 'A genuine record — keep it exactly as it is', 'A missing value — replace it with 0', 'A duplicate — delete the whole column'],
          a: 0, mis: { 1: 'No person is 16 metres tall. A value that is physically impossible is an error, not a record.' },
          ex: '1600 cm is impossible for a person, so it is almost certainly an extra zero. Check the original form and fix it.' },
        { id: 'u2-05-q23', c: 'outliers', t: 'mcq', d: 3, q: 'In a class test, Kabir scores 100 while everyone else scores between 40 and 60. The teacher checks the answer sheet and confirms 100 is correct. What should happen to his score in the data?',
          o: ['Keep it — it is a genuine outlier', 'Delete it — all outliers are errors', 'Change it to 60 so it fits the rest', 'Replace it with the class mean'],
          a: 0, mis: { 1: 'Some outliers are real. Deleting confirmed data hides the truth.', 2: 'Changing correct data to fit a pattern is dishonest.' },
          ex: 'Once an unusual value is confirmed as real, it is valid data and should stay.' },
        { id: 'u2-05-q24', c: 'outliers', t: 'num', d: 3, q: 'A canteen records daily samosa sales of 42, 48, 45 and 450. The 450 is a typing error for 45. After correcting it, what is the mean daily sale?',
          a: 45, ex: 'Corrected: (42 + 48 + 45 + 45) ÷ 4 = 180 ÷ 4 = 45. Before the fix, the mean was 585 ÷ 4 = 146.25 — over three times too big.' },
        { id: 'u2-05-q25', c: 'outliers', t: 'bins', d: 2, q: 'Sort each data problem into its type.',
          bins: ['Inconsistent format', 'Missing value', 'Duplicate'],
          items: [['City written as Delhi, delhi and DEL', 0], ['Dates as 05/03/2026 and 2026-03-05', 0], ['A height cell left blank', 1], ['An age cell that says “N/A”', 1], ['The same student row appears twice', 2], ['One online order entered twice by mistake', 2]],
          ex: 'Different spellings or date styles are inconsistent formats; blanks and “N/A” are missing values; repeated rows are duplicates.' },
        { id: 'u2-05-q26', c: 'outliers', t: 'mcq', d: 2, q: 'A city column contains “Delhi”, “delhi” and “DEL”, all meaning the same city. What should you do?',
          o: ['Standardise them to one spelling, such as “Delhi”', 'Delete every row that mentions Delhi', 'Keep all three, since they are different cities', 'Replace the city column with blank cells'],
          a: 0, mis: { 2: 'They refer to one city. Left as is, counts would split Delhi into three groups.' },
          ex: 'Standardising makes one value for one city, so grouping and counting work correctly.' },
        { id: 'u2-05-q27', c: 'outliers', t: 'tf', d: 2, q: 'Every outlier is an error and must be deleted.',
          a: false, ex: 'False. Some outliers are genuine, such as a confirmed top score or a record rainfall. Check before deleting.' },

        // transform
        { id: 'u2-05-q28', c: 'transform', t: 'mcq', d: 1, q: 'What does <b>normalisation</b> do to numeric data?',
          o: ['Rescales values to a common range, such as 0 to 1', 'Deletes values that are below the average', 'Sorts values from smallest to largest', 'Turns numbers into words for a report'],
          a: 0, ex: 'Normalisation puts features on the same scale so that large-number features do not dominate small-number ones.' },
        { id: 'u2-05-q29', c: 'transform', t: 'num', d: 2, unit: 'cm', q: 'One height in a list measured in centimetres was typed in metres as 1.52. Convert it to centimetres.',
          a: 152, ex: '1 m = 100 cm, so 1.52 m × 100 = 152 cm. Unit conversion is a data transformation.' },
        { id: 'u2-05-q30', c: 'transform', t: 'num', d: 3, q: 'Marks in a dataset range from a minimum of 20 to a maximum of 70. Using normalised value = (x − min) ÷ (max − min), what is the normalised value of a mark of 45? (Give a decimal.)',
          a: 0.5, tol: 0.001, ex: '(45 − 20) ÷ (70 − 20) = 25 ÷ 50 = 0.5. The mark sits exactly halfway between the minimum and maximum.' },
        { id: 'u2-05-q31', c: 'transform', t: 'mcq', d: 2, q: 'Why might you encode a “Has a bicycle?” column from Yes/No into 1/0?',
          o: ['Most models work with numbers, not words', 'It makes the data more private', 'It removes duplicates from the column', 'It changes who owns a bicycle'],
          a: 0, mis: { 1: 'Encoding changes the format, not the privacy. Anyone can still read 1 as “Yes”.' },
          ex: 'Encoding turns categories into numbers so that a model can calculate with them.' },
        { id: 'u2-05-q32', c: 'transform', t: 'mcq', d: 3, q: 'Section A’s marks are out of 50 and Section B’s are out of 100. Before comparing the two sections, what should you do?',
          o: ['Convert both to the same scale, such as percentages', 'Compare the raw marks directly', 'Delete Section A because its marks look lower', 'Add 50 to every mark in Section A'],
          a: 0, mis: { 1: 'A raw 40 out of 50 (80%) would look worse than 60 out of 100 (60%). The scales must match first.', 3: 'Adding 50 does not fix the scale: 40/50 would become 90, not 80.' },
          ex: 'Converting to percentages puts both sections on one scale, so the comparison is fair.' },
        { id: 'u2-05-q33', c: 'transform', t: 'tf', d: 2, q: 'Converting all temperatures in a dataset to °C before analysis is an example of data transformation.',
          a: true, ex: 'True. Unit conversion is part of data transformation, making all values consistent.' },
        { id: 'u2-05-q34', c: 'transform', t: 'mcq', d: 2, q: 'A dataset has family income (in lakhs of rupees, large numbers) and number of children (small numbers). Why normalise both?',
          o: ['So the large-number feature doesn’t dominate just because of its scale', 'So both features end up with exactly the same values', 'So that the number of children becomes a decimal', 'So the dataset takes up less storage space'],
          a: 0, mis: { 1: 'Normalisation keeps each value’s position within its own range; it does not make the features identical.' },
          ex: 'Without scaling, a feature measured in big numbers can overpower others in a model simply because its numbers are larger.' },

        // reduce-integrate
        { id: 'u2-05-q35', c: 'reduce-integrate', t: 'mcq', d: 1, q: 'What is <b>data integration</b>?',
          o: ['Combining data from several sources into one dataset', 'Removing columns that are not needed', 'Filling missing values with the median', 'Converting categories into numbers'],
          a: 0, ex: 'Integration brings data together — for example, joining marks and attendance sheets by roll number.' },
        { id: 'u2-05-q36', c: 'reduce-integrate', t: 'mcq', d: 2, q: 'Which is an example of <b>data reduction</b>?',
          o: ['Removing a “favourite colour” column from an exam-prediction dataset', 'Joining hospital records from two branches', 'Converting heights from metres to centimetres', 'Changing “Yes/No” into 1/0'],
          a: 0, mis: { 1: 'Joining records is integration. Reduction removes data that doesn’t help.' },
          ex: 'Favourite colour does not help predict exam marks, so removing it reduces the data to what matters.' },
        { id: 'u2-05-q37', c: 'reduce-integrate', t: 'mcq', d: 3, q: 'Ayaan joins an attendance sheet (listed by name) with a marks sheet (also by name). Some names are spelt differently, like “Mohd. Ayaan” and “Mohammed Ayaan”. What is the best fix?',
          o: ['Join the sheets on a shared ID, such as roll number', 'Delete every student whose name is long', 'Join the sheets by row position instead', 'Give up, because sheets can’t be combined'],
          a: 0, mis: { 2: 'Rows may be in different orders in the two sheets, so row position can match the wrong students.' },
          ex: 'A unique shared key, such as a roll number, matches records reliably even when names are written differently.' },
        { id: 'u2-05-q38', c: 'reduce-integrate', t: 'tf', d: 2, q: 'Data reduction always means deleting most of your data.',
          a: false, ex: 'False. Reduction removes only what is irrelevant or unhelpful, such as unneeded columns. Useful data is kept.' },
        { id: 'u2-05-q39', c: 'reduce-integrate', t: 'multi', d: 2, q: 'Which of these are examples of data integration? Select all that apply.',
          o: ['Joining patient records from three hospital branches into one table', 'Combining rainfall data with crop yield by district and year', 'Merging library and attendance records by student ID', 'Removing blank rows from a sheet', 'Converting kilograms to grams'],
          a: [0, 1, 2], ex: 'Integration combines sources. Removing blanks is cleaning and converting units is transformation.' },
        { id: 'u2-05-q40', c: 'reduce-integrate', t: 'mcq', d: 3, q: 'A dataset about predicting bus delays has 50 columns, but only 8 relate to delays (such as traffic, weather and time of day). The team keeps those 8 and removes the rest. Which preprocessing step is this?',
          o: ['Data reduction', 'Data integration', 'Data encoding', 'Unit conversion'],
          a: 0, mis: { 1: 'Integration adds data from other sources. Here columns are being removed.' },
          ex: 'Removing irrelevant features to keep only useful ones is data reduction.' }
      ]
    },

    // ───────────────────────────────────────────────────────────── u2-06
    {
      id: 'u2-06',
      title: 'Data Interpretation and Trend Analysis',
      minutes: 80,
      outcomes: [
        'Define and describe data interpretation',
        'List and explain the methods of data interpretation (qualitative and quantitative)',
        'Recognise the types of data interpretation (textual, tabular, graphical) and realise its importance',
        'Carry out a simple trend analysis'
      ],
      hook: 'An umbrella shop sold 15 umbrellas in December and 450 in July. Is business booming, or is something else going on? Interpretation is how you find out.',
      concepts: {
        'interp-def': 'What data interpretation is',
        'interp-methods': 'Qualitative vs quantitative interpretation',
        'interp-types': 'Textual, tabular and graphical presentation',
        'interp-why': 'Why data interpretation matters',
        'trends': 'Upward, downward, seasonal and stable trends',
        'causation': 'Correlation is not causation'
      },
      steps: [
        { kind: 'card', title: 'Numbers don’t speak for themselves', html: `
<p>Here are last year’s monthly sales at an umbrella shop in Mumbai:</p>
<table class="tbl"><thead><tr><th>Month</th><th>Jan</th><th>Mar</th><th>May</th><th>Jun</th><th>Jul</th><th>Aug</th><th>Oct</th><th>Dec</th></tr></thead><tbody>
<tr><td>Umbrellas sold</td><td>20</td><td>25</td><td>90</td><td>400</td><td>450</td><td>300</td><td>60</td><td>15</td></tr>
</tbody></table>
<p>On their own, these are just numbers. To make them useful, you need to ask three questions:</p>
<ul>
<li><b>What happened?</b> Sales shoot up in June–August and fall away by December.</li>
<li><b>Why?</b> That is the monsoon season.</li>
<li><b>So what?</b> Order extra stock in May; offer a discount on leftovers in October.</li>
</ul>
<div class="key"><b>Key idea</b> Turning numbers into “what, why and so what” is data interpretation.</div>` },

        { kind: 'card', title: 'What is data interpretation?', html: `
<div class="def"><dfn>Data interpretation</dfn> Reviewing data to draw meaningful conclusions.</div>
<ol class="flow">
<li><b>Look</b><span>Organise the data and read it carefully — titles, units, time period.</span></li>
<li><b>Describe</b><span>Say what the data shows: highest, lowest, rising, falling, repeating.</span></li>
<li><b>Explain</b><span>Suggest possible reasons, and check them against other evidence.</span></li>
<li><b>Decide</b><span>Use the conclusion to plan an action or ask a new question.</span></li>
</ol>
<div class="warn"><b>Careful</b> Interpretation goes beyond the data, so stay honest: say “the data suggests…” when you are not sure.</div>` },

        { kind: 'card', title: 'Two methods: qualitative and quantitative', html: `
<div class="cols">
<div class="mini"><h4>💬 Qualitative interpretation</h4><p>Finds <b>themes</b> in non-numerical data: comments, interview notes, open answers. <i>Canteen feedback keeps mentioning “too oily” and “long queue” → two themes: health and waiting time.</i></p></div>
<div class="mini"><h4>🔢 Quantitative interpretation</h4><p>Uses <b>statistics</b> on numerical data: mean, median, mode, range, percentages and trends. <i>Average waiting time is 9 minutes; it is longest on Fridays.</i></p></div>
</div>
<div class="key"><b>Key idea</b> Many real studies use both: numbers show <i>how much</i>, words explain <i>why</i>.</div>` },

        { kind: 'card', title: 'The quantitative toolkit', html: `
<p>Arjun’s runs in five matches: <b>12, 45, 30, 45, 18</b>.</p>
<table class="tbl"><thead><tr><th>Measure</th><th>How</th><th>Result</th></tr></thead><tbody>
<tr><td><b>Mean</b></td><td>Sum ÷ count = 150 ÷ 5</td><td>30</td></tr>
<tr><td><b>Median</b></td><td>Middle of the ordered list 12, 18, <b>30</b>, 45, 45</td><td>30</td></tr>
<tr><td><b>Mode</b></td><td>Most frequent value</td><td>45</td></tr>
<tr><td><b>Range</b></td><td>Max − min = 45 − 12</td><td>33</td></tr>
</tbody></table>
<p>Interpretation: Arjun typically scores about 30, but his scores vary a lot (range 33), so he is not yet consistent.</p>` },

        { kind: 'check', concepts: ['interp-def', 'interp-methods'], n: 3 },

        { kind: 'card', title: 'Three forms: textual, tabular, graphical', html: `
<p>The same attendance data can be presented — and interpreted — in three forms:</p>
<div class="cols">
<div class="mini"><h4>📝 Textual</h4><p>“Attendance rose from 82% in June to 91% in July, then dipped to 86% in August.” Good for a few key facts.</p></div>
<div class="mini"><h4>📋 Tabular</h4><p>Rows and columns of month and attendance %. Best when readers need exact values or many numbers.</p></div>
<div class="mini"><h4>📈 Graphical</h4><p>A line or bar chart. Best for seeing patterns, trends and outliers at a glance.</p></div>
</div>
<div class="key"><b>Key idea</b> Choose the form that suits your reader: exact values → table; quick pattern → graph; a headline fact → text.</div>` },

        { kind: 'card', title: 'Why interpretation matters', html: `
<p>Good interpretation turns data into action. It helps people:</p>
<ul>
<li><b>Make informed decisions</b> — a school moves a test away from a day when attendance is always low.</li>
<li><b>Spot trends</b> — a clinic sees cases of a fever rising week by week.</li>
<li><b>Predict</b> — a hospital stocks dengue medicines before the post-monsoon rise it sees every year.</li>
<li><b>Save cost and time</b> — a canteen cooks closer to real demand and wastes less food.</li>
<li><b>Identify needs</b> — a library notices few borrowers in one class and plans a reading drive there.</li>
</ul>` },

        { kind: 'check', concepts: ['interp-types', 'interp-why'], n: 2 },

        { kind: 'card', title: 'Trend analysis', html: `
<div class="def"><dfn>Trend analysis</dfn> Looking at data over time to identify patterns: upward, downward, seasonal or stable.</div>
<div class="cols">
<div class="mini"><h4>📈 Upward</h4><p>Rising over time. <i>A new app’s downloads grow month after month.</i></p></div>
<div class="mini"><h4>📉 Downward</h4><p>Falling over time. <i>Sales of an old phone model drop after a newer one launches.</i></p></div>
<div class="mini"><h4>🔁 Seasonal</h4><p>Rises and falls that repeat at the same time each year. <i>Woollens in winter, umbrellas in the monsoon.</i></p></div>
<div class="mini"><h4>➖ Stable</h4><p>Roughly flat, with small ups and downs. <i>A school’s enrolment stays near 1,200 each year.</i></p></div>
</div>` },

        { kind: 'card', title: 'How to read a trend', html: `
<ol class="flow">
<li><b>Check the title, axes and time period</b><span>Months or years? Units? Does the axis start at zero?</span></li>
<li><b>Find the overall direction</b><span>Ignore small wiggles. Is it mostly up, down or flat?</span></li>
<li><b>Look for repeats</b><span>Does a peak return at the same time each year? That is seasonal.</span></li>
<li><b>Notice unusual points</b><span>A single spike may be an outlier or a one-off event, not a trend.</span></li>
<li><b>Predict carefully</b><span>Extend the pattern only a little way ahead, and give a range rather than one exact number.</span></li>
</ol>
<div class="warn"><b>Careful</b> To judge growth in seasonal data, compare the same month across years — October this year with October last year.</div>` },

        { kind: 'check', concepts: ['trends'], n: 2 },

        { kind: 'lab', lab: 'trend-reader', title: 'Trend Reader', intro: 'Five line charts — from school attendance to AC sales to mobile data use. For each one, name the trend, read a value and predict the next point.' },

        { kind: 'card', title: 'Correlation is not causation', html: `
<p>When two things rise and fall together, they are <b>correlated</b>. That does <i>not</i> prove one causes the other.</p>
<div class="eg"><b>Example</b> On days when a shop sells more umbrellas, it also sells more hot tea. Do umbrellas make people thirsty? No — <b>rainy weather</b> drives both. This hidden cause is sometimes called a <i>confounding factor</i>.</div>
<div class="cols">
<div class="mini"><h4>🔍 Look for a hidden cause</h4><p>Weather, season, population size or age often explain both.</p></div>
<div class="mini"><h4>🔄 Check the direction</h4><p>Sick people go to hospitals — hospitals don’t make people sick.</p></div>
<div class="mini"><h4>⚖️ Test fairly</h4><p>Compare similar groups where only one thing differs.</p></div>
</div>` },

        { kind: 'check', concepts: ['causation'], n: 2 },

        { kind: 'card', title: 'Common mistakes', html: `
<div class="cols">
<div class="mini"><h4>❌ One spike = a trend</h4><p>A single high month may be a festival or an error. A trend needs a pattern over many points.</p></div>
<div class="mini"><h4>❌ Seasonal = growth</h4><p>June umbrella sales beat January every year. That is the monsoon, not a booming business.</p></div>
<div class="mini"><h4>❌ Predicting too far ahead</h4><p>Patterns change. Forecast near-term, with a range.</p></div>
<div class="mini"><h4>❌ Together = because</h4><p>Correlation is a clue to investigate, not proof of cause.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 10, pass: 0.8 }
      ],
      pool: [
        // interp-def
        { id: 'u2-06-q01', c: 'interp-def', t: 'mcq', d: 1, q: 'What is <b>data interpretation</b>?',
          o: ['Reviewing data to draw meaningful conclusions', 'Typing data into a spreadsheet', 'Collecting data with sensors', 'Deleting data that looks unusual'],
          a: 0, ex: 'Data interpretation means making sense of data — working out what it shows, why, and what to do about it.' },
        { id: 'u2-06-q02', c: 'interp-def', t: 'tf', d: 1, q: 'Data interpretation is only about making charts look attractive.',
          a: false, ex: 'False. Interpretation is about drawing meaningful conclusions from data. Presentation is only one part of communicating them.' },
        { id: 'u2-06-q03', c: 'interp-def', t: 'mcq', d: 2, q: 'Which statement is an <b>interpretation</b>, not just a piece of data?',
          o: ['Attendance drops every Monday, so Monday tests may need rescheduling', 'Attendance on 4 March was 38 students', 'The register has 30 columns', 'The class has 42 students in total'],
          a: 0, mis: { 1: 'That is a single data value. Interpretation finds a pattern and draws a conclusion from it.' },
          ex: 'It identifies a pattern across many days and draws a conclusion that can guide a decision.' },
        { id: 'u2-06-q04', c: 'interp-def', t: 'order', d: 2, q: 'Put the steps of interpreting data in order.',
          items: ['Look at the organised data carefully', 'Describe what the data shows', 'Explain possible reasons', 'Decide what to do next'],
          ex: 'First read the data, then describe the pattern, then explain it, and finally use it to decide.' },
        { id: 'u2-06-q05', c: 'interp-def', t: 'mcq', d: 3, q: 'After a “Healthy Week” poster campaign, canteen fruit sales rose from 40 to 65 a day. It is also mango season. Which is the most careful interpretation?',
          o: ['Sales rose after the campaign; it may have helped, but mango season could also explain it', 'The posters definitely caused every extra fruit sale', 'The data shows nothing because posters cannot be measured', 'Fruit sales will now keep rising forever'],
          a: 0, mis: { 1: 'Another explanation — mango season — is possible, so “definitely” goes beyond the evidence.', 3: 'Two weeks of data cannot support a prediction about forever.' },
          ex: 'Good interpretation states what happened and suggests causes without claiming more than the data can prove.' },
        { id: 'u2-06-q06', c: 'interp-def', t: 'mcq', d: 1, q: 'What does good data interpretation produce?',
          o: ['Conclusions that can guide decisions', 'A longer list of raw numbers', 'A new password for the dataset', 'A larger file size'],
          a: 0, ex: 'The goal of interpretation is meaningful conclusions — answers to “what, why and so what”.' },

        // interp-methods
        { id: 'u2-06-q07', c: 'interp-methods', t: 'mcq', d: 1, q: 'What does <b>qualitative</b> interpretation focus on?',
          o: ['Finding themes in non-numerical data such as comments', 'Calculating the mean and median of test scores', 'Drawing a scatter plot of two numeric variables', 'Converting units from metres to centimetres'],
          a: 0, ex: 'Qualitative interpretation looks for patterns and themes in words, opinions and observations.' },
        { id: 'u2-06-q08', c: 'interp-methods', t: 'mcq', d: 1, q: 'Which tools belong to <b>quantitative</b> interpretation?',
          o: ['Mean, median, mode and trends', 'Themes, quotes and stories', 'Passwords, encryption and backups', 'Surveys, interviews and observation'],
          a: 0, ex: 'Quantitative interpretation applies statistics such as mean, median, mode and trend analysis to numbers.' },
        { id: 'u2-06-q09', c: 'interp-methods', t: 'bins', d: 2, q: 'Sort each task into qualitative or quantitative interpretation.',
          bins: ['Qualitative', 'Quantitative'],
          items: [['Grouping canteen comments into themes like taste and price', 0], ['Calculating the mean test score', 1], ['Reading interview notes to find common worries', 0], ['Finding the mode of shoe sizes', 1], ['Comparing monthly rainfall totals', 1], ['Spotting repeated phrases like “too oily” in feedback', 0]],
          ex: 'Working with words and themes is qualitative. Calculating with numbers is quantitative.' },
        { id: 'u2-06-q10', c: 'interp-methods', t: 'num', d: 2, q: 'Sana’s runs in five matches were 20, 35, 50, 15 and 40. What is her mean score?',
          a: 32, ex: 'Mean = sum ÷ count = (20 + 35 + 50 + 15 + 40) ÷ 5 = 160 ÷ 5 = 32.' },
        { id: 'u2-06-q11', c: 'interp-methods', t: 'num', d: 2, q: 'Find the median of these daily temperatures (°C): 7, 3, 9, 4, 12.',
          a: 7, ex: 'In order: 3, 4, 7, 9, 12. The middle (third) value is 7.' },
        { id: 'u2-06-q12', c: 'interp-methods', t: 'mcq', d: 3, q: 'A canteen survey collects 1–5 star ratings and written comments. Which approach gives the fullest picture?',
          o: ['Quantitative methods for the ratings and qualitative methods for the comments', 'Only the average rating, ignoring the comments', 'Only the comments, ignoring the ratings', 'Count the letters in each comment'],
          a: 0, mis: { 1: 'The average shows how satisfied people are but not why. The comments explain the reasons.', 3: 'Counting letters says nothing about meaning. Look for themes instead.' },
          ex: 'Ratings show how much people like the canteen; comments explain why. Using both methods gives the fullest picture.' },
        { id: 'u2-06-q13', c: 'interp-methods', t: 'tf', d: 2, q: 'Mean, median and mode are tools of quantitative interpretation.',
          a: true, ex: 'True. They are statistics calculated from numerical data.' },
        { id: 'u2-06-q14', c: 'interp-methods', t: 'mcq', d: 2, q: 'The shoe sizes in a group are 6, 7, 7, 8, 7, 9. What is the <b>mode</b>?',
          o: ['7', '7.33', '8', '9'],
          a: 0, mis: { 1: '7.33 is roughly the mean (44 ÷ 6). The mode is the most frequent value.', 3: '9 is the largest value, not the most frequent.' },
          ex: 'Size 7 appears three times — more than any other size — so the mode is 7.' },

        // interp-types
        { id: 'u2-06-q15', c: 'interp-types', t: 'match', d: 1, q: 'Match each form of presentation to an example.',
          pairs: [['Textual', 'A sentence: “Attendance rose from 82% in June to 91% in July.”'], ['Tabular', 'Rows and columns of month and attendance %'], ['Graphical', 'A line chart of attendance by month']],
          ex: 'Textual uses sentences, tabular uses rows and columns, and graphical uses charts.' },
        { id: 'u2-06-q16', c: 'interp-types', t: 'mcq', d: 1, q: 'Graphical presentation of data uses…',
          o: ['charts and graphs', 'paragraphs of text', 'rows and columns only', 'audio recordings'],
          a: 0, ex: 'Graphical presentation shows data as charts and graphs so patterns are easy to see.' },
        { id: 'u2-06-q17', c: 'interp-types', t: 'mcq', d: 2, q: 'A teacher needs the exact marks of all 40 students in 5 subjects. Which form is best?',
          o: ['Tabular', 'Graphical', 'Textual', 'Audio'],
          a: 0, mis: { 1: 'Charts show patterns well, but reading 200 exact marks off a chart is hard.', 2: 'Writing 200 marks as sentences would be very hard to follow.' },
          ex: 'A table shows many exact values neatly and lets you look up any one quickly.' },
        { id: 'u2-06-q18', c: 'interp-types', t: 'mcq', d: 2, q: 'At a parent–teacher meeting, a teacher wants parents to see quickly how attendance changed over the year. Which form is best?',
          o: ['A line chart', 'A table of every daily register entry', 'A long paragraph listing each month', 'A list of students’ roll numbers'],
          a: 0, mis: { 1: 'A full register has the data but hides the pattern in too many numbers.' },
          ex: 'A line chart shows change over time at a glance, which is what parents need here.' },
        { id: 'u2-06-q19', c: 'interp-types', t: 'tf', d: 2, q: 'Textual presentation works well for a few key numbers but becomes hard to follow when there is a lot of data.',
          a: true, ex: 'True. Sentences are clear for a headline fact; large amounts of data are easier in a table or chart.' },
        { id: 'u2-06-q20', c: 'interp-types', t: 'mcq', d: 3, q: 'A newspaper reports monsoon rainfall for every state, month by month. Many readers want to look up the exact figure for their own state. Which form should the main display use?',
          o: ['A table with states as rows and months as columns', 'A single pie chart of all states', 'One long sentence listing every value', 'A photo of rain clouds over India'],
          a: 0, mis: { 1: 'A pie chart shows parts of a whole and cannot show months; it also makes exact values hard to read.' },
          ex: 'Readers need exact values for one state, so a table where they can find their row is the best choice.' },

        // interp-why
        { id: 'u2-06-q21', c: 'interp-why', t: 'multi', d: 1, q: 'Why is data interpretation important? Select all that apply.',
          o: ['It supports informed decisions', 'It helps spot trends', 'It helps predict future needs', 'It can save cost and time', 'It guarantees that no problem will ever happen', 'It removes the need to collect data'],
          a: [0, 1, 2, 3], ex: 'Interpretation guides decisions, reveals trends, supports prediction and saves resources. It cannot guarantee the future, and it needs data to work on.' },
        { id: 'u2-06-q22', c: 'interp-why', t: 'mcq', d: 2, q: 'A hospital sees dengue cases rise every year after the monsoon, so it stocks medicines and beds in advance. What does this show?',
          o: ['Using past data to predict and plan', 'Collecting primary data with a survey', 'Encrypting patient records', 'Cleaning duplicate rows'],
          a: 0, mis: { 1: 'The hospital is using records it already has, not running a new survey.' },
          ex: 'By interpreting a repeating pattern, the hospital predicts demand and prepares before it arrives.' },
        { id: 'u2-06-q23', c: 'interp-why', t: 'multi', d: 2, q: 'A school library studies its borrowing records. Which decisions could this data guide? Select all that apply.',
          o: ['Buying more copies of often-borrowed books', 'Changing opening hours to match busy times', 'Planning a reading drive for classes that borrow little', 'Deciding students’ exam grades', 'Finding out students’ home addresses'],
          a: [0, 1, 2], ex: 'Borrowing data shows demand, busy times and low-use groups. It says nothing about exam grades or addresses.' },
        { id: 'u2-06-q24', c: 'interp-why', t: 'tf', d: 2, q: 'Interpreting data well can help an organisation save time and money.',
          a: true, ex: 'True. For example, a canteen that cooks closer to real demand wastes less food and money.' },
        { id: 'u2-06-q25', c: 'interp-why', t: 'mcq', d: 3, q: 'A district office finds that in one block, girls’ attendance falls sharply in Classes 9 and 10. What is the best next step?',
          o: ['Investigate the reasons, for example by talking to families, then target support there', 'Close the schools in that block to save money', 'Ignore it, because averages for the whole district look fine', 'Delete the data for that block as an outlier'],
          a: 0, mis: { 2: 'District averages can hide a local problem. The block-level data shows a real need.', 3: 'A real pattern is not an error. Deleting it would hide a group that needs help.' },
          ex: 'Interpretation identifies a need; the next step is to understand its causes and act where help is needed.' },
        { id: 'u2-06-q26', c: 'interp-why', t: 'mcq', d: 1, q: 'In one line, why does data interpretation matter?',
          o: ['It turns raw numbers into conclusions that guide action', 'It makes datasets bigger and more detailed', 'It replaces the need to think about results', 'It keeps data secret from other people'],
          a: 0, ex: 'Raw data alone does not tell you what to do. Interpretation turns it into conclusions you can act on.' },

        // trends
        { id: 'u2-06-q27', c: 'trends', t: 'mcq', d: 1, q: 'What is <b>trend analysis</b>?',
          o: ['Looking at data over time to identify patterns', 'Checking passwords for common patterns', 'Sorting data into nominal and ordinal', 'Combining two datasets into one'],
          a: 0, ex: 'Trend analysis studies how data changes over time — upward, downward, seasonal or stable.' },
        { id: 'u2-06-q28', c: 'trends', t: 'match', d: 2, q: 'Match each trend to an example.',
          pairs: [['Upward', 'A new app’s downloads rising month after month'], ['Downward', 'Sales of an old phone model falling after a new one launches'], ['Seasonal', 'Woollen sales in Shimla peaking every winter'], ['Stable', 'A school’s enrolment staying near 1,200 each year']],
          ex: 'Upward rises, downward falls, seasonal repeats at the same time each year, and stable stays roughly level.' },
        { id: 'u2-06-q29', c: 'trends', t: 'mcq', d: 2, q: 'Air-conditioner sales are high every April to June and low every winter, year after year. What kind of pattern is this?',
          o: ['Seasonal', 'Stable', 'Downward', 'Random'],
          a: 0, mis: { 1: 'Stable means roughly flat. These sales rise and fall a lot, but in a repeating yearly pattern.' },
          ex: 'A rise and fall that repeats at the same time every year is a seasonal pattern.' },
        { id: 'u2-06-q30', c: 'trends', t: 'mcq', d: 2, q: 'A line chart of a school’s monthly electricity use shows values that stay roughly level, with only small ups and downs. What is the trend?',
          o: ['Stable', 'Upward', 'Downward', 'Seasonal'],
          a: 0, mis: { 3: 'Seasonal needs a clear rise and fall that repeats each year, not just small wiggles.' },
          ex: 'Roughly flat data with small variations shows a stable trend.' },
        { id: 'u2-06-q31', c: 'trends', t: 'num', d: 2, q: 'A shop’s monthly sales were 100, 110, 120 and 130. If this steady pattern continues, what would you predict for the next month?',
          a: 140, ex: 'Sales rise by 10 each month, a steady upward trend, so the next value is about 130 + 10 = 140. Real predictions should allow a range.' },
        { id: 'u2-06-q32', c: 'trends', t: 'mcq', d: 3, q: 'A raincoat shop in Kochi sees sales climb from March to June. The owner says, “Sales are rising for good — let’s order three times more stock for December.” What is the mistake?',
          o: ['Mistaking a seasonal rise for a lasting upward trend', 'Using a table instead of a chart', 'Measuring sales in rupees instead of units', 'Collecting too many months of data'],
          a: 0, mis: { 3: 'More months of data would actually reveal the repeating seasonal pattern.' },
          ex: 'Raincoat sales rise before and during the monsoon and fall afterwards. Comparing with previous years would show the repeating pattern.' },
        { id: 'u2-06-q33', c: 'trends', t: 'tf', d: 2, q: 'One unusually high month is enough to call it an upward trend.',
          a: false, ex: 'False. A trend needs a consistent pattern over many time points. One spike could be a festival, an event or an error.' },
        { id: 'u2-06-q34', c: 'trends', t: 'mcq', d: 3, q: 'A sweet shop compares its October (Diwali month) sales with its September sales and announces “huge growth”. What is a fairer comparison?',
          o: ['Compare this October with last October', 'Compare October with the quietest month of the year', 'Compare only the most expensive sweets', 'Compare October with next January’s forecast'],
          a: 0, mis: { 1: 'Comparing a festival month with the quietest month exaggerates the difference even more.' },
          ex: 'Festival months are seasonal peaks. Comparing the same month across years shows real growth.' },

        // causation
        { id: 'u2-06-q35', c: 'causation', t: 'mcq', d: 1, q: 'When two variables are <b>correlated</b>, it means…',
          o: ['they tend to change together', 'one definitely causes the other', 'they are measured in the same unit', 'they come from the same source'],
          a: 0, ex: 'Correlation means a pattern of changing together. It does not by itself tell you why.' },
        { id: 'u2-06-q36', c: 'causation', t: 'mcq', d: 3, q: 'A report notes that cities with more hospitals have more sick people, and concludes that hospitals make people sick. What is the best response?',
          o: ['Bigger cities have more people, so they have more hospitals and more sick people', 'The conclusion is right because the two numbers rise together', 'Hospitals should be closed to reduce sickness', 'The data must be fake because hospitals help people'],
          a: 0, mis: { 1: 'Rising together shows correlation only. Population size is a hidden factor behind both.' },
          ex: 'Population size drives both numbers, and sick people go to hospitals — not the other way round.' },
        { id: 'u2-06-q37', c: 'causation', t: 'tf', d: 1, q: 'If two things rise together, one must be causing the other.',
          a: false, ex: 'False. Correlation is not causation. A hidden factor, such as the weather, can drive both.' },
        { id: 'u2-06-q38', c: 'causation', t: 'mcq', d: 3, q: 'A study finds that students with more books at home tend to score higher. Which conclusion is most careful?',
          o: ['There is a link, but other factors such as family support may explain it', 'Buying books will certainly raise any student’s marks', 'Books at home have no connection at all with marks', 'Students with high marks must buy more books'],
          a: 0, mis: { 1: 'The study shows a correlation, not that books alone cause higher scores.' },
          ex: 'The data shows correlation. Other factors linked to having many books could be part of the reason.' },
        { id: 'u2-06-q39', c: 'causation', t: 'mcq', d: 2, q: 'On days when a shop sells more umbrellas, it also sells more hot tea. What is the most likely explanation?',
          o: ['Rainy weather increases both', 'Buying umbrellas makes people thirsty', 'Drinking tea makes people buy umbrellas', 'It is a data-entry error'],
          a: 0, mis: { 1: 'That treats correlation as causation. A hidden factor — rain — explains both.' },
          ex: 'Rain is the hidden cause: people buy umbrellas and want something warm to drink on wet days.' },
        { id: 'u2-06-q40', c: 'causation', t: 'mcq', d: 3, q: 'A school wants to know whether a new study timetable actually <i>causes</i> better marks. Which plan gives the strongest evidence?',
          o: ['Compare two similar groups over the same term, one using the timetable and one not', 'Ask students whether they like the timetable', 'Use it only with the top students and see if they do well', 'Look at marks from one student before and after'],
          a: 0, mis: { 2: 'Top students would likely do well anyway, so you couldn’t tell what caused it.' },
          ex: 'A fair test compares similar groups where only the timetable differs, so other causes are ruled out.' }
      ]
    },

    // ───────────────────────────────────────────────────────────── u2-07
    {
      id: 'u2-07',
      title: 'Data Visualisation and Interactive Dashboards',
      minutes: 100,
      outcomes: [
        'Recognise the importance of data visualisation',
        'Discover different methods of data visualisation: charts, maps, infographics and dashboards',
        'Build and interpret an interactive dashboard with KPIs and filters, and know tools such as Tableau and Datawrapper',
        'Tell a clear, honest story with data'
      ],
      hook: 'Twelve numbers in a table, or one picture that shows the monsoon arriving in two seconds flat? Today you learn to build the picture — and a whole dashboard.',
      concepts: {
        'viz-why': 'Why visualise data',
        'viz-methods': 'Methods: charts, maps, infographics, dashboards',
        'chart-choice': 'Choosing the right chart',
        'dashboards': 'Dashboards, KPIs and filters',
        'viz-tools': 'Tableau and Datawrapper',
        'viz-story': 'Storytelling and honest design'
      },
      steps: [
        { kind: 'card', title: 'Spot the monsoon in two seconds', html: `
<p>Monthly rainfall in a coastal town (in mm). Read the numbers — then glance at the bars.</p>
<table class="tbl"><thead><tr><th>Month</th><th>mm</th><th>Picture (█ ≈ 50 mm)</th></tr></thead><tbody>
<tr><td>Apr</td><td>20</td><td>▏</td></tr>
<tr><td>May</td><td>60</td><td>█</td></tr>
<tr><td>Jun</td><td>500</td><td>██████████</td></tr>
<tr><td>Jul</td><td>700</td><td>██████████████</td></tr>
<tr><td>Aug</td><td>450</td><td>█████████</td></tr>
<tr><td>Sep</td><td>300</td><td>██████</td></tr>
<tr><td>Oct</td><td>80</td><td>██</td></tr>
<tr><td>Nov</td><td>20</td><td>▏</td></tr>
</tbody></table>
<p>Your eyes found the peak in July before your brain finished reading the numbers. Now imagine 30 years of <i>daily</i> rainfall — about 11,000 numbers. Without a picture, the pattern would be buried.</p>
<div class="key"><b>Key idea</b> Data visualisation turns numbers into pictures that your eyes can read fast.</div>` },

        { kind: 'card', title: 'Why visualise data?', html: `
<div class="cols">
<div class="mini"><h4>👀 See patterns</h4><p>Trends, cycles and clusters pop out of a chart that hide in a table.</p></div>
<div class="mini"><h4>🚩 Catch outliers</h4><p>One bar far taller than the rest makes you ask: real event, or a typo?</p></div>
<div class="mini"><h4>⚖️ Compare quickly</h4><p>Which district, which month, which product — side by side.</p></div>
<div class="mini"><h4>🗣️ Communicate</h4><p>A panchayat meeting, a parents’ meeting or a newspaper reader can understand a clear chart without being a data expert.</p></div>
</div>
<div class="key"><b>Key idea</b> Visualisation helps you <i>explore</i> data (find the story) and <i>explain</i> data (tell the story).</div>` },

        { kind: 'card', title: 'Methods of visualisation', html: `
<div class="cols">
<div class="mini"><h4>📊 Charts and graphs</h4><p>Bar, line, pie, scatter, histogram and more. The everyday workhorses.</p></div>
<div class="mini"><h4>🗺️ Maps</h4><p>Data that varies by place: districts shaded by rainfall or air quality, dots for schools.</p></div>
<div class="mini"><h4>🖼️ Infographics</h4><p>Icons, short text and a few key numbers combined into one poster — great for public awareness.</p></div>
<div class="mini"><h4>🖥️ Dashboards</h4><p>Several linked charts and key numbers on one interactive screen, with filters.</p></div>
</div>
<p>Pick the method that suits your <b>audience</b> and your <b>question</b>: a poster for the school corridor is an infographic; a tool the principal checks every morning is a dashboard.</p>` },

        { kind: 'card', title: 'Choosing the right chart', html: `
<table class="tbl"><thead><tr><th>Chart</th><th>Best for</th><th>Example</th></tr></thead><tbody>
<tr><td><b>Bar</b></td><td>Comparing categories</td><td>Runs scored by five batters</td></tr>
<tr><td><b>Line</b></td><td>Change over time</td><td>Monthly rainfall over a year</td></tr>
<tr><td><b>Pie</b></td><td>Parts of a whole</td><td>Share of wet, dry and plastic waste</td></tr>
<tr><td><b>Scatter</b></td><td>Relationship between two numeric variables</td><td>Hours of sleep vs test score</td></tr>
<tr><td><b>Histogram</b></td><td>Distribution of one numeric variable</td><td>How 200 students’ heights spread across ranges</td></tr>
</tbody></table>
<p>The Data Viz Catalogue lists many more — area charts, bubble charts, heat maps and others — each with its own best use.</p>
<div class="warn"><b>Careful</b> Pie charts work only for parts of one whole, with a few slices. Twelve thin slices are hard to compare.</div>` },

        { kind: 'check', concepts: ['viz-why', 'viz-methods', 'chart-choice'], n: 3 },

        { kind: 'card', title: 'Dashboards, KPIs and filters', html: `
<div class="def"><dfn>Dashboard</dfn> An interactive collection of charts and key numbers on one screen, with filters to explore the data.</div>
<div class="cols">
<div class="mini"><h4>🎯 KPIs</h4><p><b>Key Performance Indicators</b>: the few numbers that matter most, shown big at the top. <i>Total revenue this month · Best-selling item.</i></p></div>
<div class="mini"><h4>🎚️ Filters</h4><p>Choose a month, class or item and <b>every</b> tile updates to show just that slice.</p></div>
<div class="mini"><h4>🖱️ Interactivity</h4><p>Hover to see exact values; click a bar to focus on that group; drill down from school to class.</p></div>
</div>
<div class="eg"><b>Example</b> A school attendance dashboard: KPI “Today’s attendance 93%”, a bar chart by class, a line chart by week, and filters for class and month.</div>` },

        { kind: 'card', title: 'Designing a dashboard', html: `
<ol class="flow">
<li><b>Know the audience and their questions</b><span>The canteen manager asks: What sells? When? How much money came in?</span></li>
<li><b>Choose the KPIs</b><span>Two or three headline numbers, e.g. total revenue and best-selling item.</span></li>
<li><b>Pick suitable charts</b><span>Bar for items compared, line for sales by day.</span></li>
<li><b>Add filters</b><span>A month filter lets the manager explore one month at a time.</span></li>
<li><b>Test with users and improve</b><span>Can they answer their questions in under a minute? If not, simplify.</span></li>
</ol>
<div class="key"><b>Key idea</b> A good dashboard answers a few important questions fast. It is not a wall of every possible chart.</div>` },

        { kind: 'lab', lab: 'dashboard-builder', title: 'Dashboard Builder', intro: 'Turn a school canteen’s sales records into a working dashboard: add chart tiles and KPI tiles, connect a month filter, then use your dashboard to answer three questions.' },

        { kind: 'card', title: 'Tools: Tableau and Datawrapper', html: `
<table class="tbl"><thead><tr><th></th><th>Tableau / Tableau Public</th><th>Datawrapper</th></tr></thead><tbody>
<tr><td><b>What it is</b></td><td>Data-visualisation software for building charts and interactive dashboards with drag and drop. <b>Tableau Public</b> is its free version.</td><td>A tool that runs in your web browser for making charts, maps and tables. Widely used by newsrooms.</td></tr>
<tr><td><b>Good for</b></td><td>Exploring data and combining many charts with filters into dashboards</td><td>Quick, clean, publish-ready charts for articles and reports</td></tr>
<tr><td><b>Remember</b></td><td>Work saved to Tableau Public is visible to anyone online — never use private data.</td><td>Published charts can be shared by link or embedded in a web page.</td></tr>
</tbody></table>
<p>Spreadsheets such as Google Sheets and Excel, and Looker Studio, can also make charts and simple dashboards.</p>` },

        { kind: 'card', title: 'How the tools work', html: `
<h4>Tableau, in five moves</h4>
<ol class="flow">
<li><b>Connect</b><span>Open a data source, such as an Excel or CSV file.</span></li>
<li><b>Build a sheet</b><span>Drag <i>dimensions</i> (categories like item or month) and <i>measures</i> (numbers like revenue) to make a chart.</span></li>
<li><b>Make a dashboard</b><span>Arrange several sheets on one screen.</span></li>
<li><b>Add filters</b><span>Let viewers pick a month or item.</span></li>
<li><b>Publish</b><span>Save to Tableau Public to share a link.</span></li>
</ol>
<h4>Datawrapper, in four steps</h4>
<p>Upload or paste data → Check &amp; describe it → Visualise (choose and style a chart) → Publish &amp; embed.</p>` },

        { kind: 'check', concepts: ['dashboards', 'viz-tools'], n: 2 },

        { kind: 'card', title: 'Telling a story with data', html: `
<p>A chart shows data. A <b>data story</b> tells people why it matters and what to do.</p>
<ol class="flow">
<li><b>Context</b><span>Why should your audience care? “Our canteen throws away food every day.”</span></li>
<li><b>Data</b><span>One clear chart: daily waste before and after the pre-order system.</span></li>
<li><b>Insight</b><span>What it means: “Waste fell by about half after pre-orders began.”</span></li>
<li><b>Action</b><span>What to do next: “Make pre-ordering permanent.”</span></li>
</ol>
<div class="eg"><b>Tips</b> Write a title that states the finding, not just “Chart 1”. Highlight the one bar that matters in a strong colour and grey out the rest. Add a short note on the chart where something important happened.</div>` },

        { kind: 'card', title: 'Good design vs misleading design', html: `
<table class="tbl"><thead><tr><th>✅ Do</th><th>❌ Don’t</th></tr></thead><tbody>
<tr><td>Start bar-chart axes at zero</td><td>Cut the axis to exaggerate small differences</td></tr>
<tr><td>Label axes and units; cite the source</td><td>Leave readers guessing “40 what?”</td></tr>
<tr><td>Show the full, relevant time period</td><td>Cherry-pick the months that suit your claim</td></tr>
<tr><td>Use flat, simple charts</td><td>Use 3-D effects that distort sizes</td></tr>
<tr><td>Use a few purposeful colours, readable by colour-blind viewers</td><td>Use a rainbow of colours just for decoration</td></tr>
<tr><td>Keep scales the same when comparing charts</td><td>Put side-by-side charts on different scales</td></tr>
</tbody></table>` },

        { kind: 'check', concepts: ['viz-story'], n: 2 },

        { kind: 'card', title: 'Common mistakes', html: `
<div class="cols">
<div class="mini"><h4>❌ Chart soup</h4><p>Fifteen charts on one dashboard means none gets read. Keep the few that answer the key questions.</p></div>
<div class="mini"><h4>❌ Wrong chart for the job</h4><p>A pie chart for change over time, or a line chart joining unrelated categories, confuses readers.</p></div>
<div class="mini"><h4>❌ No title or units</h4><p>Every chart needs a clear title, labelled axes and units.</p></div>
<div class="mini"><h4>❌ Private data in public</h4><p>Remove names and personal details before publishing to Tableau Public or anywhere online.</p></div>
</div>` },

        { kind: 'practice', n: 8 },
        { kind: 'quiz', n: 12, pass: 0.8 }
      ],
      pool: [
        // viz-why
        { id: 'u2-07-q01', c: 'viz-why', t: 'mcq', d: 1, q: 'What is a main reason to visualise data?',
          o: ['To spot patterns, trends and outliers quickly', 'To make the dataset larger', 'To hide errors in the data', 'To avoid needing any data at all'],
          a: 0, ex: 'Charts let your eyes pick out patterns, trends and outliers much faster than reading rows of numbers.' },
        { id: 'u2-07-q02', c: 'viz-why', t: 'tf', d: 1, q: 'A good chart can reveal a pattern that is hard to see in a long table of numbers.',
          a: true, ex: 'True. That is the core purpose of visualisation — making patterns visible at a glance.' },
        { id: 'u2-07-q03', c: 'viz-why', t: 'mcq', d: 2, q: 'A city has 365 daily AQI readings for last year in a table. What is the main benefit of showing them as a line chart?',
          o: ['The winter pollution spikes become visible at a glance', 'The readings become more accurate', 'The number of readings becomes smaller', 'The readings no longer need units'],
          a: 0, mis: { 1: 'A chart changes how data is shown, not how accurate it is.' },
          ex: 'A line chart makes rises, falls and spikes over time visible immediately, which is hard with 365 numbers.' },
        { id: 'u2-07-q04', c: 'viz-why', t: 'multi', d: 2, q: 'What can data visualisation help you do? Select all that apply.',
          o: ['Spot trends over time', 'Find outliers', 'Compare categories', 'Communicate with non-experts', 'Make wrong data correct', 'Skip collecting data'],
          a: [0, 1, 2, 3], ex: 'Visualisation helps you explore and explain data. It cannot fix wrong data or replace collecting it.' },
        { id: 'u2-07-q05', c: 'viz-why', t: 'mcq', d: 3, q: 'A health officer must show a village panchayat that fever cases peak every August and September. What should she bring?',
          o: ['A simple chart of cases by month with a clear title', 'A printed table of every daily case for five years', 'A spoken list of all the numbers', 'A photo of the health centre'],
          a: 0, mis: { 1: 'All the data is there, but the audience would struggle to find the pattern in thousands of numbers.' },
          ex: 'A clear monthly chart lets non-experts see the peak instantly, which is what the meeting needs.' },

        // viz-methods
        { id: 'u2-07-q06', c: 'viz-methods', t: 'match', d: 1, q: 'Match each visualisation method to an example.',
          pairs: [['Chart', 'A bar graph comparing marks by subject'], ['Map', 'Districts shaded by rainfall'], ['Infographic', 'A poster mixing icons, short text and key numbers'], ['Dashboard', 'A screen of linked charts and KPIs with filters']],
          ex: 'Charts plot data; maps show data by place; infographics mix visuals and text for a message; dashboards combine interactive charts and KPIs.' },
        { id: 'u2-07-q07', c: 'viz-methods', t: 'mcq', d: 1, q: 'What is an <b>infographic</b>?',
          o: ['A visual that combines icons, short text and key numbers to explain a topic', 'A spreadsheet with many rows and columns', 'A program that collects data from websites', 'A password-protected database'],
          a: 0, ex: 'Infographics present a few key facts visually, often for public awareness.' },
        { id: 'u2-07-q08', c: 'viz-methods', t: 'mcq', d: 2, q: 'You want people to see which districts of a state have the worst air quality. Which method fits best?',
          o: ['A map with districts shaded by AQI', 'A pie chart of all districts', 'A paragraph listing each district', 'A line chart of a single district'],
          a: 0, mis: { 1: 'A pie chart shows parts of a whole and hides where each district is.' },
          ex: 'When data varies by location, a shaded map shows the worst areas at a glance.' },
        { id: 'u2-07-q09', c: 'viz-methods', t: 'mcq', d: 2, q: 'The eco-club wants a corridor poster on saving water, with a few striking facts and simple icons. Which method fits best?',
          o: ['An infographic', 'An interactive dashboard', 'A scatter plot', 'A raw data table'],
          a: 0, mis: { 1: 'A dashboard is for exploring data on a screen. A poster with a few facts and icons is an infographic.' },
          ex: 'Infographics combine icons and short text to deliver a clear message to a general audience.' },
        { id: 'u2-07-q10', c: 'viz-methods', t: 'tf', d: 2, q: 'A map is a good way to visualise data that varies by location.',
          a: true, ex: 'True. Maps show where values are high or low, such as rainfall or pollution by district.' },
        { id: 'u2-07-q11', c: 'viz-methods', t: 'mcq', d: 3, q: 'A state health department wants officials to check daily cases, free beds and vaccinations for any district they choose, updated every day. Which method fits best?',
          o: ['An interactive dashboard with KPIs and a district filter', 'A printed infographic poster', 'A single pie chart for the whole state', 'A yearly written report'],
          a: 0, mis: { 1: 'A poster cannot update daily or let officials pick a district.', 3: 'A yearly report is far too slow for daily monitoring.' },
          ex: 'Dashboards combine several up-to-date measures on one screen and let users filter to the district they need.' },

        // chart-choice
        { id: 'u2-07-q12', c: 'chart-choice', t: 'match', d: 1, q: 'Match each chart to what it shows best.',
          pairs: [['Bar chart', 'Comparing categories'], ['Line chart', 'Change over time'], ['Pie chart', 'Parts of a whole'], ['Scatter plot', 'Relationship between two numeric variables'], ['Histogram', 'Distribution of one numeric variable']],
          ex: 'Each chart type has a job: bars compare, lines show change, pies show parts, scatters show relationships, histograms show distributions.' },
        { id: 'u2-07-q13', c: 'chart-choice', t: 'mcq', d: 2, q: 'Which chart best shows how monthly rainfall changed over a year?',
          o: ['Line chart', 'Pie chart', 'Scatter plot', 'Histogram'],
          a: 0, mis: { 1: 'A pie chart shows parts of a whole, not change over time.' },
          ex: 'Line charts connect points in time order, making rises and falls easy to follow.' },
        { id: 'u2-07-q14', c: 'chart-choice', t: 'mcq', d: 2, q: 'Which chart best shows what share of the school’s waste is wet, dry or plastic?',
          o: ['Pie chart', 'Line chart', 'Scatter plot', 'Histogram'],
          a: 0, mis: { 1: 'There is no time sequence here — just parts of one total.' },
          ex: 'The three types make up one whole, and there are only a few categories, so a pie chart fits.' },
        { id: 'u2-07-q15', c: 'chart-choice', t: 'mcq', d: 2, q: 'Which chart best shows whether students who sleep more tend to score higher in tests?',
          o: ['Scatter plot', 'Pie chart', 'Bar chart', 'Line chart'],
          a: 0, mis: { 2: 'A bar chart compares categories. Two numeric variables for each student call for a scatter plot.' },
          ex: 'A scatter plot places each student by hours of sleep and score, revealing any relationship.' },
        { id: 'u2-07-q16', c: 'chart-choice', t: 'mcq', d: 3, q: 'A sports teacher wants to see how the heights of 200 students are spread — how many are 140–145 cm, 145–150 cm and so on. Which chart fits best?',
          o: ['Histogram', 'Pie chart', 'Scatter plot', 'Line chart'],
          a: 0, mis: { 1: 'A pie with many height ranges would be hard to read and hides the shape of the spread.', 2: 'A scatter plot needs two numeric variables; here there is only height.' },
          ex: 'A histogram groups one numeric variable into ranges and shows how many values fall in each — its distribution.' },
        { id: 'u2-07-q17', c: 'chart-choice', t: 'mcq', d: 3, q: 'Riya wants to compare the total runs scored by five batters in a series. Which chart fits best?',
          o: ['Bar chart', 'Line chart', 'Scatter plot', 'Histogram'],
          a: 0, mis: { 1: 'A line suggests change over time or a connection between points. Five separate batters are categories.' },
          ex: 'Bars compare separate categories clearly — one bar per batter.' },
        { id: 'u2-07-q18', c: 'chart-choice', t: 'tf', d: 2, q: 'A pie chart is a good choice for showing how a city’s temperature changed over 12 months.',
          a: false, ex: 'False. Change over time is best shown with a line chart. A pie shows parts of a whole.' },
        { id: 'u2-07-q19', c: 'chart-choice', t: 'bins', d: 2, q: 'Sort each task to the best chart.',
          bins: ['Line chart', 'Bar chart', 'Pie chart'],
          items: [['Daily temperature over one month', 0], ['Number of students in each house', 1], ['Share of pocket money spent on food, travel and books', 2], ['A shop’s stock level each month for two years', 0], ['Medals won by four schools', 1], ['Percentage of each blood group in a class', 2]],
          ex: 'Changes over time → line; comparing separate groups → bar; parts of one whole → pie.' },

        // dashboards
        { id: 'u2-07-q20', c: 'dashboards', t: 'mcq', d: 1, q: 'What is a <b>dashboard</b>?',
          o: ['An interactive collection of charts and key numbers on one screen, with filters', 'A single printed chart with no labels', 'A spreadsheet that stores raw survey responses', 'A tool that collects data from sensors'],
          a: 0, ex: 'Dashboards bring several charts and KPIs together on one interactive screen.' },
        { id: 'u2-07-q21', c: 'dashboards', t: 'mcq', d: 1, q: 'In a dashboard, what is a <b>KPI</b>?',
          o: ['A key performance indicator — an important number showing how something is going', 'A kind of pie chart used only in dashboards', 'A filter that removes missing values', 'A password used to open the dashboard'],
          a: 0, ex: 'KPIs are the headline numbers, such as total revenue or today’s attendance, shown prominently.' },
        { id: 'u2-07-q22', c: 'dashboards', t: 'mcq', d: 2, q: 'What does a <b>filter</b> on a dashboard do?',
          o: ['Shows only the data you select, and the tiles update to match', 'Deletes the rows you do not need from the dataset', 'Makes the colours of the charts brighter', 'Prints the dashboard as a PDF'],
          a: 0, mis: { 1: 'A filter only changes what is shown. The underlying data is not deleted.' },
          ex: 'Choosing, say, “March” in a month filter makes the charts and KPIs show only March data.' },
        { id: 'u2-07-q23', c: 'dashboards', t: 'mcq', d: 2, q: 'Which is the most useful KPI for a school canteen’s dashboard?',
          o: ['Total revenue this month', 'The colour of the menu board', 'The canteen manager’s favourite song', 'The number of chairs painted blue'],
          a: 0, mis: { 1: 'A KPI should measure performance that matters to decisions, such as money or sales.' },
          ex: 'Total revenue shows how the canteen is performing and guides decisions; the others do not.' },
        { id: 'u2-07-q24', c: 'dashboards', t: 'tf', d: 2, q: 'A dashboard should include every chart you can make, so that nothing is missed.',
          a: false, ex: 'False. Too many charts make a dashboard hard to read. It should answer a few key questions quickly.' },
        { id: 'u2-07-q25', c: 'dashboards', t: 'order', d: 2, q: 'Put the steps of designing a dashboard in order.',
          items: ['Know the audience and their questions', 'Choose the KPIs', 'Pick suitable charts', 'Add filters for exploring', 'Test with users and improve'],
          ex: 'The audience’s questions decide the KPIs and charts; filters come next, and testing shows what to improve.' },
        { id: 'u2-07-q26', c: 'dashboards', t: 'mcq', d: 3, q: 'A principal wants to see each morning whether attendance is dropping in any class, and then look closely at one class. Which design fits best?',
          o: ['An attendance KPI, a bar chart by class, and filters for class and month', 'A pie chart of the whole school’s attendance for the year', 'A list of every student’s name in alphabetical order', 'An infographic poster updated once a year'],
          a: 0, mis: { 1: 'A single yearly pie cannot show which class is dropping or let her focus on one class.' },
          ex: 'A KPI gives the headline, a chart by class shows where the drop is, and filters let her focus on one class.' },
        { id: 'u2-07-q27', c: 'dashboards', t: 'mcq', d: 2, q: 'A canteen dashboard shows total revenue and a sales-by-day chart for the whole year. The manager selects “March” in the month filter. What should happen?',
          o: ['The KPI and the chart update to show only March', 'Only the title changes to say “March”', 'All data except March is permanently deleted', 'The dashboard turns into a pie chart'],
          a: 0, mis: { 2: 'Filters change the view, not the stored data.' },
          ex: 'A filter applies to the linked tiles, so the KPI and chart recalculate for March only.' },
        { id: 'u2-07-q28', c: 'dashboards', t: 'multi', d: 2, q: 'Which are features of a good dashboard? Select all that apply.',
          o: ['A few clear KPIs at the top', 'Filters that update all the related charts', 'A title saying what the dashboard is for', 'Fifteen colours just for decoration', 'Every chart drawn in 3-D'],
          a: [0, 1, 2], ex: 'Clear KPIs, linked filters and a clear purpose make a dashboard useful. Decorative colours and 3-D effects make it harder to read.' },

        // viz-tools
        { id: 'u2-07-q29', c: 'viz-tools', t: 'mcq', d: 1, q: 'What is <b>Tableau</b>?',
          o: ['Data-visualisation software for building charts and interactive dashboards', 'A government website that publishes census data', 'A messaging app for sharing photos', 'An antivirus program for laptops'],
          a: 0, ex: 'Tableau lets you connect to data and build charts and dashboards with drag and drop. Tableau Public is its free version.' },
        { id: 'u2-07-q30', c: 'viz-tools', t: 'mcq', d: 2, q: 'What is important to remember when saving work to <b>Tableau Public</b>?',
          o: ['It is visible to anyone online, so never use private data', 'It is visible only to you and can never be shared', 'It automatically removes all personal data for you', 'It works only without any data source'],
          a: 0, mis: { 1: 'Tableau Public is designed for sharing publicly — that is why private data must stay out.', 2: 'You are responsible for removing personal data before publishing.' },
          ex: 'Visualisations saved to Tableau Public are published on the web for anyone to see, so only use data that is safe to share.' },
        { id: 'u2-07-q31', c: 'viz-tools', t: 'mcq', d: 1, q: 'What is <b>Datawrapper</b>?',
          o: ['A browser-based tool for making charts, maps and tables', 'A sensor that measures air quality', 'A survey method for interviewing people', 'A type of encryption for passwords'],
          a: 0, ex: 'Datawrapper runs in the web browser and is widely used, including by newsrooms, to make clean charts, maps and tables.' },
        { id: 'u2-07-q32', c: 'viz-tools', t: 'tf', d: 2, q: 'Datawrapper runs in a web browser, so you can make a chart without installing software.',
          a: true, ex: 'True. You paste or upload data, choose a chart and publish it, all in the browser.' },
        { id: 'u2-07-q33', c: 'viz-tools', t: 'mcq', d: 2, q: 'In Tableau, what do you create when you arrange several sheets (charts) on one screen with shared filters?',
          o: ['A dashboard', 'A data source', 'A measure', 'A dimension'],
          a: 0, mis: { 2: 'A measure is a numeric field, such as revenue, used inside a chart.', 3: 'A dimension is a category field, such as month or item.' },
          ex: 'In Tableau, a dashboard combines several sheets into one interactive view.' },
        { id: 'u2-07-q34', c: 'viz-tools', t: 'order', d: 2, q: 'Put Datawrapper’s chart-making steps in order.',
          items: ['Upload or paste the data', 'Check and describe the data', 'Visualise: choose and style the chart', 'Publish and embed'],
          ex: 'Datawrapper guides you from data in, to checking it, to designing the chart, to publishing it.' },
        { id: 'u2-07-q35', c: 'viz-tools', t: 'mcq', d: 3, q: 'Diya made a dashboard of her class survey, which includes students’ names and phone numbers. She wants to share it through Tableau Public. What should she do first?',
          o: ['Remove names and phone numbers, then publish', 'Publish as it is, since only her teacher will look', 'Add more personal details to make it richer', 'Share her Tableau password with the class'],
          a: 0, mis: { 1: 'Anything on Tableau Public can be seen by anyone online, not just her teacher.' },
          ex: 'Tableau Public work is public. Removing personal data protects her classmates’ privacy.' },

        // viz-story
        { id: 'u2-07-q36', c: 'viz-story', t: 'mcq', d: 1, q: 'What is <b>storytelling with data</b>?',
          o: ['Presenting data with context, a clear message and a suggested action', 'Making up numbers to make a chart more exciting', 'Writing a fictional story that has no data', 'Adding as many charts as possible to a report'],
          a: 0, ex: 'A data story explains why the data matters, what it shows and what should happen next.' },
        { id: 'u2-07-q37', c: 'viz-story', t: 'mcq', d: 2, q: 'Which is the best title for a chart in a data story?',
          o: ['Canteen food waste fell by half after pre-orders began', 'Chart 1', 'Data', 'Waste numbers (kg)'],
          a: 0, mis: { 3: 'This names what is measured but not what the reader should notice.' },
          ex: 'A title that states the finding tells the reader the main message straight away.' },
        { id: 'u2-07-q38', c: 'viz-story', t: 'order', d: 2, q: 'Put the parts of a data story in order.',
          items: ['Context: why the audience should care', 'Data: a clear chart of the evidence', 'Insight: what the data means', 'Action: what should happen next'],
          ex: 'Start with why it matters, show the evidence, explain it, then say what to do.' },
        { id: 'u2-07-q39', c: 'viz-story', t: 'mcq', d: 3, q: 'A bar chart compares two schools’ pass rates, 92% and 96%, with the y-axis starting at 90. The 96% bar looks three times taller. How should it be fixed?',
          o: ['Start the y-axis at 0', 'Make the 96% bar a brighter colour', 'Switch to a 3-D bar chart', 'Remove the axis labels'],
          a: 0, mis: { 2: '3-D effects add their own distortion. The fix is an honest axis.' },
          ex: 'Bar lengths should be proportional to the values, so bar-chart axes should start at zero.' },
        { id: 'u2-07-q40', c: 'viz-story', t: 'multi', d: 2, q: 'Which are good chart-design habits? Select all that apply.',
          o: ['Label axes with units', 'Cite the data source', 'Start bar-chart axes at zero', 'Use a 3-D pie for drama', 'Use as many bright colours as possible'],
          a: [0, 1, 2], ex: 'Labels, sources and honest axes help readers trust and understand a chart. 3-D effects and rainbow colours distort or distract.' },
        { id: 'u2-07-q41', c: 'viz-story', t: 'tf', d: 2, q: 'Using a strong colour for the one bar that matters, and grey for the rest, can make a chart’s message clearer.',
          a: true, ex: 'True. Highlighting guides the reader’s eye to the key point of the story.' },
        { id: 'u2-07-q42', c: 'viz-story', t: 'mcq', d: 3, q: 'Kabir has two years of data on plastic bags used at school. He shows only the two months when use fell, titled “The plastic ban works!”. What is the honest fix?',
          o: ['Show the full two years so readers see the real pattern', 'Add a 3-D effect so the fall looks bigger', 'Remove the title so readers decide for themselves', 'Show only one month to make the chart simpler'],
          a: 0, mis: { 2: 'Removing the title does not fix the cherry-picked data.' },
          ex: 'Cherry-picking a short window can mislead. Showing the full relevant period lets readers judge the trend honestly.' }
      ],
      gens: ['chart-pick']
    }

  ]
};
