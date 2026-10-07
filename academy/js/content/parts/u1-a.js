export default [
  // ───────────────────────────── u1-01 What is AI? ─────────────────────────────
  {
    id: 'u1-01',
    title: 'What is AI?',
    minutes: 75,
    outcomes: [
      'Identify and appreciate Artificial Intelligence and describe its applications in daily life',
      'Distinguish AI systems that learn from data from machines that follow fixed rules',
      'Explain how a language-understanding tool turns a sentence about lighting into an intent and entities that adjust a smart home'
    ],
    hook: 'Your phone warned you about a traffic jam before you reached it — let’s find out how a machine can “learn”.',
    concepts: {
      'intelligence': 'What intelligence means',
      'ai-def': 'What makes a machine “AI”',
      'ai-vs-rules': 'AI vs fixed-rule machines',
      'how-ai-learns': 'How AI learns from data',
      'ai-daily': 'AI in everyday life in India',
      'intent-entity': 'Intents and entities in language'
    },
    steps: [
      { kind: 'card', title: 'Machines that seem to think', html: `
<p>Think about your last 24 hours.</p>
<ul>
<li>Google Maps turned a road red and suggested a faster route.</li>
<li>YouTube lined up a video you actually wanted to watch.</li>
<li>Your phone unlocked the moment it saw your face.</li>
</ul>
<p>Nobody was sitting inside your phone making these choices. A program looked at <b>data</b> — traffic speeds, what millions of people watched, the shape of your face — and made a <b>decision</b> or a <b>prediction</b>.</p>
<div class="key"><b>Key idea</b> This topic answers one big question: what makes a machine “intelligent”, and how is that different from a machine that simply follows instructions?</div>` },

      { kind: 'card', title: 'First, what is intelligence?', html: `
<p>Before we talk about <i>artificial</i> intelligence, look at your own. Being intelligent means you can:</p>
<div class="cols">
<div class="mini"><h4>🧠 Learn</h4><p>You bowl better spin after many overs of practice.</p></div>
<div class="mini"><h4>🔍 Understand</h4><p>You recognise a friend’s voice on a crackly phone call.</p></div>
<div class="mini"><h4>🧩 Decide</h4><p>You pick the shorter queue at the canteen.</p></div>
<div class="mini"><h4>🔄 Adapt</h4><p>You change your plan when it suddenly rains.</p></div>
</div>
<div class="def"><dfn>Intelligence</dfn> The ability to learn from experience, understand information, solve problems, make decisions and adapt to new situations.</div>` },

      { kind: 'card', title: 'So what is Artificial Intelligence?', html: `
<p><b>Artificial</b> means made by humans. So artificial intelligence is human-made intelligence inside a machine.</p>
<div class="def"><dfn>Artificial Intelligence (AI)</dfn> The ability of a machine to learn from data and use what it learned to make decisions or predictions — tasks that usually need human intelligence.</div>
<p>Notice the two parts:</p>
<ol>
<li><b>Learns from data</b> — it is shown many examples.</li>
<li><b>Decides or predicts</b> — it uses the patterns it found on new cases it has never seen.</li>
</ol>
<div class="eg"><b>Example</b> A crop-disease app is trained on thousands of labelled leaf photos. A farmer in Nashik photographs a brand-new tomato leaf, and the app predicts which disease it most likely has.</div>` },

      { kind: 'card', title: 'AI or just a fixed rule?', html: `
<p>Lots of machines are automatic. That does not make them AI.</p>
<table class="tbl">
<thead><tr><th>Fixed-rule machine</th><th>AI system</th></tr></thead>
<tbody>
<tr><td>Calculator: 7 × 8 is always 56.</td><td>Maps app: predicts today’s travel time from live and past traffic.</td></tr>
<tr><td>Microwave timer: stops after exactly 2 minutes.</td><td>Streaming app: suggests shows based on what you and similar viewers watched.</td></tr>
<tr><td>TV remote: button 5 always means channel 5.</td><td>Voice assistant: understands “play some old Kishore Kumar songs” said in many accents.</td></tr>
</tbody>
</table>
<div class="key"><b>Key idea</b> A fixed-rule machine does exactly what a human programmed, every single time. An AI system learns patterns from data, and its behaviour can improve as it gets more data.</div>` },

      { kind: 'card', title: 'Careful: “smart” does not always mean AI', html: `
<p>Three traps students often fall into:</p>
<div class="warn"><b>Trap 1</b> “It is automatic, so it is AI.” A street light that switches on at 6:30 pm every day just follows a timer. No learning.</div>
<div class="warn"><b>Trap 2</b> “It is a robot, so it is AI.” A factory arm that repeats the same weld all day follows a fixed program.</div>
<div class="warn"><b>Trap 3</b> “It uses a computer, so it is AI.” A form that checks whether a train seat is free is an ordinary program.</div>
<div class="key"><b>Quick test</b> Ask: <i>Did it learn from examples (data)? Can it handle a case nobody wrote an exact rule for?</i> If both answers are no, it is automation, not AI.</div>` },

      { kind: 'check', concepts: ['intelligence', 'ai-def', 'ai-vs-rules'], n: 3 },

      { kind: 'card', title: 'How does an AI learn?', html: `
<p>Let’s follow an AI that watches digital payments for fraud.</p>
<ol class="flow">
<li><b>Data</b><span>It is given lots of past payments, each one marked “normal” or “fraud”.</span></li>
<li><b>Patterns</b><span>It finds what fraud cases have in common — an unusual amount, a new device, an odd hour.</span></li>
<li><b>Prediction</b><span>A new payment arrives. It predicts “looks normal” or “looks risky” and may send an alert.</span></li>
<li><b>Feedback</b><span>When people confirm whether an alert was right, that becomes new data that helps it improve.</span></li>
</ol>
<div class="key"><b>Key idea</b> Data → patterns → predictions → feedback. More good-quality data usually means better predictions.</div>` },

      { kind: 'card', title: 'AI in your day — India edition', html: `
<table class="tbl">
<thead><tr><th>Where</th><th>What the AI does</th></tr></thead>
<tbody>
<tr><td>🗺️ Google Maps</td><td>Predicts traffic and travel time from live location data and past trips.</td></tr>
<tr><td>💳 UPI and banking apps</td><td>Fraud alerts flag payments that look unusual for your account.</td></tr>
<tr><td>📺 OTT apps and YouTube</td><td>Recommend what to watch next from viewing history.</td></tr>
<tr><td>🗣️ Alexa, Google Assistant</td><td>Turn your speech into text and work out what you want.</td></tr>
<tr><td>🌐 Bhashini</td><td>Government of India’s AI platform that translates between Indian languages.</td></tr>
<tr><td>✈️ DigiYatra</td><td>Matches your face to your registered details so you can pass airport entry and boarding gates.</td></tr>
<tr><td>🌾 Crop-disease apps</td><td>Identify plant diseases from a photo of a leaf.</td></tr>
</tbody>
</table>` },

      { kind: 'card', title: 'Count the AI in your pocket', html: `
<p>Your phone alone runs several AI systems:</p>
<div class="cols">
<div class="mini"><h4>🔓 Face unlock</h4><p>Learned what your face looks like from different angles.</p></div>
<div class="mini"><h4>⌨️ Keyboard</h4><p>Suggests your next word from how people usually write.</p></div>
<div class="mini"><h4>🖼️ Gallery search</h4><p>Type “dog” and it finds dog photos you never labelled.</p></div>
</div>
<p>Beyond phones, AI helps doctors screen eye scans and X-rays, helps farmers plan when to water, and helps cities predict crowding at stations.</p>
<div class="key"><b>Key idea</b> AI is already part of health, farming, banking, transport and entertainment — usually working quietly in the background.</div>` },

      { kind: 'check', concepts: ['how-ai-learns', 'ai-daily'], n: 3 },

      { kind: 'card', title: 'Talking to machines: intents and entities', html: `
<p>You say: “<i>Dim the bedroom light to 30 percent.</i>” A smart home must work out two things:</p>
<div class="cols">
<div class="mini"><h4>🎯 Intent</h4><p>What do you want done? → <b>Dim</b></p></div>
<div class="mini"><h4>🏷️ Entities</h4><p>The details it needs → <b>Room: bedroom</b>, <b>Level: 30%</b></p></div>
</div>
<div class="def"><dfn>Intent</dfn> The goal or action behind a sentence.</div>
<div class="def"><dfn>Entity</dfn> A specific detail in the sentence, such as a place, a number, a time or an object.</div>
<p>Language-understanding tools such as Microsoft LUIS (used in the CBSE activity) are trained on many example sentences, so they recognise the same intent however you phrase it.</p>` },

      { kind: 'card', title: 'Same intent, many sentences', html: `
<p>People never speak in one fixed format. All of these mean the same thing:</p>
<ul>
<li>“Switch on the kitchen light.”</li>
<li>“Put the kitchen light on, please.”</li>
<li>“Kitchen ki light on karo.”</li>
</ul>
<p>→ <b>Intent: TurnOn</b> · <b>Room: kitchen</b></p>
<p>Some sentences don’t even name the action: “It’s too dark in the study” → <b>Intent: Brighten</b> · <b>Room: study</b>.</p>
<p>The tool also gives a <b>confidence</b> score from 0 to 1 — how sure it is. For “Who won the match yesterday?” it should say <b>Intent: None</b> with low confidence, because that is not about lights.</p>
<div class="key"><b>Key idea</b> A fixed list of exact commands breaks easily. Learning from many example sentences is what makes this AI.</div>` },

      { kind: 'lab', lab: 'smart-home', title: 'Smart Home: Talk to Your House', intro: 'Type a sentence about the lights (or tap a suggestion) and watch the AI pull out the intent, the entities and its confidence before it changes the house. Get 5 commands working using at least 3 different intents.' },

      { kind: 'check', concepts: ['intent-entity'], n: 2 },

      { kind: 'card', title: 'What AI is not', html: `
<p>AI is powerful, but it is not magic.</p>
<ul>
<li><b>It only knows its data.</b> A crop app trained only on rice and wheat leaves will struggle with a coffee leaf.</li>
<li><b>It can be wrong.</b> A prediction is a best guess, not a promise. Maps can still be surprised by a sudden road closure.</li>
<li><b>It does not understand like you do.</b> It finds patterns in data; it has no feelings or common sense.</li>
<li><b>Humans stay responsible.</b> People choose the data, check the results and fix the mistakes.</li>
</ul>
<div class="key"><b>Key idea</b> AI = learning from data to predict or decide. Good data and careful humans make it useful.</div>` },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // intelligence
      { id: 'u1-01-q01', c: 'intelligence', t: 'mcq', d: 1,
        q: 'Which description best matches <b>intelligence</b>?',
        o: ['The ability to learn, understand, solve problems and adapt', 'The ability to store a huge amount of information forever', 'The ability to repeat one task very fast without mistakes', 'The ability to follow a list of steps in exactly the same order'],
        a: 0,
        ex: 'Intelligence is about learning from experience, understanding, deciding and adapting to new situations. Storing, repeating or following steps can be done without any learning.' },
      { id: 'u1-01-q02', c: 'intelligence', t: 'tf', d: 1,
        q: 'Changing your route when you find a road blocked is a sign of intelligence, because you are adapting to a new situation.',
        a: true,
        ex: 'Adapting your behaviour when the situation changes is one of the key parts of intelligence.' },
      { id: 'u1-01-q03', c: 'intelligence', t: 'mcq', d: 2,
        q: 'Meera records her Bharatanatyam practice, spots her mistakes in the video and improves every week. Which part of intelligence is she mainly showing?',
        o: ['Learning from experience', 'Following a fixed rule', 'Storing information', 'Calculating quickly'],
        a: 0,
        mis: { 1: 'Not quite — she is not just repeating fixed steps; she changes what she does based on what she noticed.', 2: 'Storing a video is not the intelligent part. Using it to improve is.' },
        ex: 'Meera uses feedback (her video) to improve over time. Getting better from experience is learning, a core part of intelligence.' },
      { id: 'u1-01-q04', c: 'intelligence', t: 'multi', d: 2,
        q: 'Which of these show intelligence in a person? Select all that apply.',
        o: ['Recognising a friend’s voice on a noisy call', 'Guessing a new word’s meaning from the sentence around it', 'Changing your study plan after a poor test result', 'Blinking when dust blows into your eye'],
        a: [0, 1, 2],
        ex: 'Recognising, working out meaning and adapting a plan all involve understanding and learning. Blinking at dust is an automatic reflex — it needs no learning or thinking.' },
      { id: 'u1-01-q05', c: 'intelligence', t: 'mcq', d: 3,
        q: 'In a kabaddi match, a raider notices that one defender always moves left first, so she starts raiding on the right side. Which ability is she using?',
        o: ['Spotting a pattern and adapting her decision', 'Following a rule written by the referee', 'Remembering the rules of the game', 'Reacting by reflex without any thinking'],
        a: 0,
        mis: { 1: 'The referee’s rules are the same for everyone. She made her own choice from what she observed.', 3: 'A reflex is instant and automatic. She watched, noticed a pattern and planned — that is thinking.' },
        ex: 'She observed data (the defender’s moves), found a pattern and changed her plan. Pattern-spotting plus adapting is exactly what we mean by intelligence — and it is what AI tries to copy.' },

      // ai-def
      { id: 'u1-01-q06', c: 'ai-def', t: 'mcq', d: 1,
        q: 'What is Artificial Intelligence (AI)?',
        o: ['A machine’s ability to learn from data and make predictions', 'Any machine that runs on electricity and has a display screen', 'A robot that looks, talks and moves exactly like a human', 'A computer program that can never make a mistake'],
        a: 0,
        ex: 'AI is about learning from data and then deciding or predicting. Many AI systems have no screen or human shape, and all AI can make mistakes.' },
      { id: 'u1-01-q07', c: 'ai-def', t: 'tf', d: 1,
        q: 'In “Artificial Intelligence”, the word “artificial” means made by humans.',
        a: true,
        ex: 'Artificial means human-made. AI is intelligence that humans build into machines.' },
      { id: 'u1-01-q08', c: 'ai-def', t: 'mcq', d: 2,
        q: 'Which pair of actions best sums up what an AI system does?',
        o: ['Learns from data, then predicts', 'Stores data, then prints it out', 'Follows rules, then repeats them', 'Receives orders, then obeys them'],
        a: 0,
        mis: { 1: 'Storing and printing is what an ordinary computer does. AI must find patterns and use them.', 2: 'Following and repeating fixed rules is automation, not AI.' },
        ex: 'The two parts of AI are learning patterns from data and using them to predict or decide about new cases.' },
      { id: 'u1-01-q09', c: 'ai-def', t: 'tf', d: 2,
        q: 'A machine must look like a human to be called AI.',
        a: false,
        ex: 'Most AI has no body at all — it is software inside apps, like Maps or a spam filter. What matters is learning from data, not looks.' },
      { id: 'u1-01-q10', c: 'ai-def', t: 'mcq', d: 3,
        q: 'A weather app in Chennai studies 20 years of past readings plus today’s sensor data and says heavy rain is likely tomorrow. Why does this count as AI?',
        o: ['It learned patterns from past data to predict something new', 'It shows the temperature exactly as the sensor reads it', 'It runs on a phone that is connected to the internet', 'It updates the date and time automatically every midnight'],
        a: 0,
        mis: { 1: 'Just displaying a reading is not AI — there is no learning or prediction.', 2: 'Being online does not make an app AI. Many online apps follow fixed rules.', 3: 'Changing the date at midnight is a fixed rule, not learning.' },
        ex: 'The app uses patterns learned from years of data to predict tomorrow’s weather — learning from data plus prediction is what makes it AI.' },
      { id: 'u1-01-q11', c: 'ai-def', t: 'mcq', d: 2,
        q: 'A crop-disease app correctly names the disease on a leaf photo it has never seen before. What made this possible?',
        o: ['It was trained on many labelled photos of leaves', 'A programmer stored a copy of every leaf photo in the world', 'The farmer typed the name of the disease into the app first', 'Phone cameras automatically know the names of plant diseases'],
        a: 0,
        mis: { 1: 'Nobody can store every leaf in the world. The app learned general patterns, so it can handle new photos.', 2: 'If the farmer already knew the disease, the app would not be needed.' },
        ex: 'By learning from many labelled examples, the app found patterns it can apply to a new, unseen photo.' },

      // ai-vs-rules
      { id: 'u1-01-q12', c: 'ai-vs-rules', t: 'bins', d: 1,
        q: 'Sort each machine into the right group.',
        bins: ['AI system', 'Fixed-rule machine'],
        items: [['Calculator', 1], ['Microwave timer', 1], ['TV remote', 1], ['Maps app predicting travel time', 0], ['Streaming app suggesting shows', 0], ['Voice assistant that understands many accents', 0]],
        ex: 'The calculator, timer and remote do exactly what they were programmed to do every time. The other three learn patterns from data and make predictions.' },
      { id: 'u1-01-q13', c: 'ai-vs-rules', t: 'mcq', d: 1,
        q: 'Which of these is a fixed-rule machine, not AI?',
        o: ['A calculator', 'A spam filter that learns from reported emails', 'Face unlock on a phone', 'A maps app predicting traffic'],
        a: 0,
        ex: 'A calculator follows fixed rules of arithmetic and never learns. The other three learn from data.' },
      { id: 'u1-01-q14', c: 'ai-vs-rules', t: 'mcq', d: 2,
        q: 'A street light switches on at 6:30 pm every evening, whatever the weather. Arjun says it is AI because it works automatically. What is the best reply?',
        o: ['It is not AI — it follows a fixed timer and never learns', 'It is AI — anything that works without a human is AI', 'It is AI — it uses electricity and a computer chip', 'It is not AI — AI can only be found in phones and laptops'],
        a: 0,
        mis: { 1: 'Automatic does not mean intelligent. A timer follows one fixed rule.', 2: 'Having a chip does not make something AI. It must learn from data.', 3: 'Right that it is not AI, but the reason is wrong — AI can be in cars, cameras, fans and more.' },
        ex: 'The light follows one fixed rule (switch on at 6:30). It never learns from data or adapts, so it is automation, not AI.' },
      { id: 'u1-01-q15', c: 'ai-vs-rules', t: 'tf', d: 2,
        q: 'A washing machine that always runs the same 40-minute cycle when you press “Quick Wash” is an example of AI.',
        a: false,
        ex: 'It runs the same fixed programme every time and does not learn from data, so it is a fixed-rule machine.' },
      { id: 'u1-01-q16', c: 'ai-vs-rules', t: 'mcq', d: 3,
        q: 'A school bell rings at fixed times. The principal wants a new system that learns from past records which days students arrive late (rain, exams, festivals) and suggests a better start time. What is the key difference?',
        o: ['The bell follows a set rule; the new system learns from data', 'The bell is electric; the new system runs on batteries', 'The bell is loud; the new system sends quiet messages', 'The bell is old; the new system is newer and costs more'],
        a: 0,
        mis: { 1: 'The power source does not decide whether something is AI.', 3: 'Being new or expensive does not make a system intelligent. Learning from data does.' },
        ex: 'The bell does the same thing every day. The new system learns from data about late arrivals and adapts its suggestion — that is AI.' },
      { id: 'u1-01-q17', c: 'ai-vs-rules', t: 'multi', d: 2,
        q: 'Which of these are AI systems? Select all that apply.',
        o: ['A photo app that finds pictures of your dog when you search “dog”', 'A keyboard that suggests your next word as you type', 'A digital clock that shows the time', 'A traffic signal that turns green every 60 seconds', 'An email service that learns to move spam into a separate folder'],
        a: [0, 1, 4],
        ex: 'Photo search, word suggestions and spam filtering all learn from data. A clock and a fixed-timer signal just follow rules.' },
      { id: 'u1-01-q18', c: 'ai-vs-rules', t: 'mcq', d: 3,
        q: 'Fan A has five speed settings you choose with a remote. Fan B learns from weeks of data what speed each family member likes at different temperatures and adjusts itself. Which statement is correct?',
        o: ['Fan B is AI because it learns from data and adapts', 'Fan A is AI because it is controlled with a remote', 'Fan A is AI because it has five speed settings', 'Fan B is not AI because a fan cannot be intelligent'],
        a: 0,
        mis: { 1: 'A remote just sends your command. The fan does not learn anything.', 2: 'More settings is not intelligence — you still choose every time.', 3: 'Any machine can use AI if it learns from data. Fan B does.' },
        ex: 'Fan B learns patterns (who likes which speed at which temperature) and adapts by itself. Fan A only does what you tell it.' },

      // how-ai-learns
      { id: 'u1-01-q19', c: 'how-ai-learns', t: 'order', d: 1,
        q: 'Put the steps of how an AI learns in the right order.',
        items: ['Collect data (many examples)', 'Find patterns in the data', 'Make predictions on new cases', 'Get feedback and improve'],
        ex: 'AI first needs examples, then finds patterns, then uses them to predict, and feedback on those predictions helps it improve.' },
      { id: 'u1-01-q20', c: 'how-ai-learns', t: 'mcq', d: 1,
        q: 'What does an AI system need first in order to learn?',
        o: ['Data — lots of examples', 'A body shaped like a human', 'A very loud speaker', 'A fast internet connection'],
        a: 0,
        ex: 'AI learns patterns from examples, so data comes first. Without data there is nothing to learn from.' },
      { id: 'u1-01-q21', c: 'how-ai-learns', t: 'tf', d: 2,
        q: 'In general, an AI trained on many good-quality examples makes better predictions than one trained on very few.',
        a: true,
        ex: 'More good examples give the AI a better chance to find the real patterns, so its predictions usually improve.' },
      { id: 'u1-01-q22', c: 'how-ai-learns', t: 'mcq', d: 2,
        q: 'A UPI app sends Sana an alert: “Unusual payment — was this you?” She taps “Yes, it was me.” How can this help the AI?',
        o: ['Her reply is feedback data that can improve future alerts', 'Her reply switches off all future fraud alerts for ever', 'Her reply removes the payment from her bank statement', 'Her reply tells the AI to stop learning from her account'],
        a: 0,
        mis: { 1: 'One answer does not turn the system off — it just adds information.', 3: 'Feedback helps the AI learn more, not stop learning.' },
        ex: 'Feedback tells the AI whether its prediction was right. That new data helps it make better alerts later — the last step of the learning loop.' },
      { id: 'u1-01-q23', c: 'how-ai-learns', t: 'mcq', d: 3,
        q: 'An AI that spots ripe mangoes was trained only on photos of Alphonso mangoes. At a market in Lucknow it keeps getting Dasheri mangoes wrong. What is the most likely reason?',
        o: ['Its training data had no Dasheri examples at all', 'The AI gets tired after looking at too many mangoes', 'Lucknow is too far from where the AI was trained', 'No AI system can ever recognise mangoes'],
        a: 0,
        mis: { 1: 'Machines do not get tired. The problem is what it learned from.', 2: 'Distance does not matter — the data does.' },
        ex: 'An AI only knows the patterns in its data. With no Dasheri examples, it never learned what a ripe Dasheri looks like.' },
      { id: 'u1-01-q24', c: 'how-ai-learns', t: 'match', d: 2,
        q: 'A bus app predicts arrival times. Match each learning step to what happens.',
        pairs: [['Data', 'Thousands of past journeys with their travel times'], ['Pattern', 'Buses are slower on weekday evenings near markets'], ['Prediction', '“Your bus will arrive in 12 minutes”'], ['Feedback', 'The bus took 15 minutes, so the estimate is corrected']],
        ex: 'Past journeys are the data; the slow-evening rule is a pattern found in them; the arrival time is a prediction; and the real travel time is feedback that improves the next estimate.' },

      // ai-daily
      { id: 'u1-01-q25', c: 'ai-daily', t: 'match', d: 1,
        q: 'Match each service to what its AI does.',
        pairs: [['Google Maps', 'Predicts traffic and travel time'], ['DigiYatra', 'Recognises faces at airport gates'], ['Bhashini', 'Translates between Indian languages'], ['UPI fraud alert', 'Flags unusual payments']],
        ex: 'Maps predicts traffic from location data, DigiYatra uses face recognition, Bhashini translates Indian languages, and fraud alerts spot payments that do not fit your usual pattern.' },
      { id: 'u1-01-q26', c: 'ai-daily', t: 'mcq', d: 1,
        q: 'Which Government of India platform uses AI to translate between Indian languages?',
        o: ['Bhashini', 'DigiYatra', 'UPI', 'DigiLocker'],
        a: 0,
        ex: 'Bhashini is India’s AI-based language translation platform. DigiYatra is for airports, UPI is for payments and DigiLocker stores documents.' },
      { id: 'u1-01-q27', c: 'ai-daily', t: 'mcq', d: 2,
        q: 'At Bengaluru airport, Kabir walks through the boarding gate after a camera matches his face to his registered details. Which AI application is this?',
        o: ['DigiYatra face-based boarding', 'A UPI fraud-alert system', 'An OTT recommendation system', 'A crop-disease detection app'],
        a: 0,
        mis: { 1: 'Fraud alerts watch payments, not faces at a gate.', 2: 'Recommendation systems suggest shows; they do not check faces.' },
        ex: 'DigiYatra uses face recognition so registered passengers can pass airport checkpoints without showing a paper ID.' },
      { id: 'u1-01-q28', c: 'ai-daily', t: 'multi', d: 2,
        q: 'In which of these is AI helping in daily life? Select all that apply.',
        o: ['A banking app flagging an unusual payment', 'A streaming app suggesting a show you might like', 'A farmer’s app naming a disease from a leaf photo', 'A wall clock showing the correct time', 'A light switch turning on a fan'],
        a: [0, 1, 2],
        ex: 'Fraud alerts, recommendations and crop-disease detection all learn from data. A wall clock and a light switch follow fixed mechanisms.' },
      { id: 'u1-01-q29', c: 'ai-daily', t: 'mcq', d: 3,
        q: 'Diya’s grandmother speaks only Tamil, and their new neighbour speaks only Bengali. Which kind of AI tool would best help them talk?',
        o: ['A speech translation tool such as Bhashini', 'A face recognition tool such as DigiYatra', 'A traffic prediction tool such as Google Maps', 'A payment fraud detector inside a UPI app'],
        a: 0,
        mis: { 1: 'Face recognition identifies people; it cannot translate what they say.', 2: 'Maps predicts traffic, not language.' },
        ex: 'They need language translation. Bhashini is built to translate between Indian languages, including spoken ones.' },
      { id: 'u1-01-q30', c: 'ai-daily', t: 'mcq', d: 3,
        q: 'A kirana shop owner in Pune never set up any rules, yet her billing app now suggests: “Customers who buy bread often also buy butter — stock up?” What is the app doing?',
        o: ['Finding patterns in past sales data to make a suggestion', 'Following a fixed rule that the owner typed in earlier', 'Reading the owner’s thoughts using the phone camera', 'Copying the idea from a printed newspaper advert'],
        a: 0,
        mis: { 1: 'She never set up rules — the app found the bread-and-butter link by itself from the data.', 2: 'AI cannot read minds. It works from data such as sales records.' },
        ex: 'The app noticed a pattern in its sales data (bread and butter are often bought together) and used it to make a suggestion — learning from data.' },

      // intent-entity
      { id: 'u1-01-q31', c: 'intent-entity', t: 'mcq', d: 1,
        q: 'In the sentence “Turn off the balcony light”, what is the <b>intent</b>?',
        o: ['Turn off', 'The balcony', 'The light bulb', 'The time of day'],
        a: 0,
        ex: 'The intent is the action the person wants — switching the light off. “Balcony” is an entity (a detail about where).' },
      { id: 'u1-01-q32', c: 'intent-entity', t: 'mcq', d: 2,
        q: '“Set the study light to 40 percent.” Which are the <b>entities</b>?',
        o: ['Room: study and Level: 40%', 'Intent: SetLevel and Dim', 'Room: study and Intent: SetLevel', 'Device: light and Unit: percent'],
        a: 0,
        mis: { 1: 'SetLevel and Dim are intents (actions), not entities (details).', 2: 'Study is an entity, but SetLevel is the intent.' },
        ex: 'Entities are the specific details the action needs: which room (study) and what level (40%). SetLevel is the intent.' },
      { id: 'u1-01-q33', c: 'intent-entity', t: 'tf', d: 1,
        q: 'An entity is a specific detail in a sentence, such as a room name or a number.',
        a: true,
        ex: 'Entities are the details — places, numbers, times, objects — that the action needs.' },
      { id: 'u1-01-q34', c: 'intent-entity', t: 'mcq', d: 2,
        q: 'A user says, “It’s too bright in the living room.” The word “dim” is never used. What should a good language-understanding tool detect?',
        o: ['Intent: Dim, Room: living room', 'Intent: TurnOn, Room: living room', 'Intent: None, because “dim” was not said', 'Intent: Brighten, Room: living room'],
        a: 0,
        mis: { 2: 'A good tool understands meaning, not just exact keywords. “Too bright” means the user wants less light.', 3: 'Careful — “too bright” means there is already too much light, so it should be dimmed.' },
        ex: 'Because the tool learned from many example sentences, it can tell that “too bright” means the user wants the light dimmed.' },
      { id: 'u1-01-q35', c: 'intent-entity', t: 'mcq', d: 3,
        q: 'Rohan asks the smart home, “What’s India’s score in the match?” It replies “Intent: None · Confidence 0.12”. Why is this a good response?',
        o: ['The sentence is not about lights, so it correctly finds no lighting intent', 'It shows the tool is broken, because it should always find an intent', 'The confidence is low only because Rohan typed too quickly', '“None” means the tool will now switch off every light in the house'],
        a: 0,
        mis: { 1: 'A good tool should say “None” when a sentence is outside what it handles, rather than guessing.', 3: '“None” means no lighting action — the tool does nothing to the lights.' },
        ex: 'The tool only handles lighting. Recognising that a sentence does not match any of its intents — with low confidence — stops it from doing something silly.' },
      { id: 'u1-01-q36', c: 'intent-entity', t: 'bins', d: 2,
        q: 'Sort the parts of this command: “Please dim the kitchen and bedroom lights to 20 percent.”',
        bins: ['Intent', 'Entity'],
        items: [['dim', 0], ['kitchen', 1], ['bedroom', 1], ['20 percent', 1]],
        ex: '“Dim” is the action (intent). The rooms and the level are details the action needs (entities).' },
      { id: 'u1-01-q37', c: 'intent-entity', t: 'mcq', d: 3,
        q: 'Why do tools like Microsoft LUIS learn from many example sentences instead of using a fixed list of exact commands?',
        o: ['People say the same thing in many different ways', 'A fixed list takes up too much storage space', 'Example sentences make the lights shine brighter', 'A fixed list could only ever work in Hindi'],
        a: 0,
        mis: { 1: 'Storage is not the issue — a fixed list would simply miss most real sentences.', 3: 'A fixed list could be in any language; the problem is that it cannot cope with new phrasings.' },
        ex: '“Switch on”, “put on” and “light on karo” all carry the same intent. Learning from varied examples lets the tool handle sentences it has never seen exactly.' }
    ]
  },
  // ───────────────────────── u1-02 The Three Domains of AI ─────────────────────────
  {
    id: 'u1-02',
    title: 'The Three Domains of AI',
    minutes: 90,
    outcomes: [
      'Recognise, engage and relate with the three domains of AI: Data (Statistical Data), Computer Vision and Natural Language Processing',
      'Relate human-machine interactions in the AI Game to the domain each game is based on',
      'Classify everyday AI applications by the kind of data they use, including systems that combine domains'
    ],
    hook: 'Play three games against an AI — one reads your habits, one reads your drawings and one reads your words.',
    concepts: {
      'domains': 'The three domains of AI',
      'data-domain': 'Data (Statistical Data)',
      'cv': 'Computer Vision',
      'nlp': 'Natural Language Processing',
      'ai-game': 'The AI Game',
      'combined': 'Systems that combine domains'
    },
    steps: [
      { kind: 'card', title: 'Different data, different domains', html: `
<p>You use your eyes to read a face, your ears to follow a conversation, and a memory of numbers to guess whether India can chase 280 runs.</p>
<p>AI is similar. What an AI system can do depends on the <b>kind of data</b> it takes in. CBSE groups AI into three <b>domains</b>:</p>
<div class="cols">
<div class="mini"><h4>📊 Data</h4><p><span class="tag data">Data</span> Numbers and tables</p></div>
<div class="mini"><h4>👁️ Computer Vision</h4><p><span class="tag cv">CV</span> Images and video</p></div>
<div class="mini"><h4>💬 NLP</h4><p><span class="tag nlp">NLP</span> Text and speech</p></div>
</div>
<div class="key"><b>Key idea</b> To find the domain, ask one question: <i>what kind of data does this AI work with?</i></div>` },

      { kind: 'card', title: 'Domain 1: Data (Statistical Data)', html: `
<div class="def"><dfn>Data / Statistical Data</dfn> The AI domain that works with numbers and tables — records, readings, scores, prices — to find patterns and make predictions.</div>
<p>Examples you already know:</p>
<ul>
<li><b>Cricket:</b> a live win-chance graph, worked out from runs, wickets and overs left.</li>
<li><b>Shopping:</b> price comparison websites and “customers also bought” suggestions.</li>
<li><b>Banking:</b> fraud detection that spots unusual payments.</li>
<li><b>Weather:</b> forecasts from years of temperature, pressure and rainfall readings.</li>
</ul>
<div class="eg"><b>Example</b> An electricity company predicts tomorrow’s demand in Delhi from past usage, temperature and the day of the week. All the inputs are numbers in a table.</div>` },

      { kind: 'lab', lab: 'rps', title: 'Rock, Paper, Scissors vs AI', intro: 'Play 20 rounds against an AI that keeps a memory table of your past moves and predicts what you will play next. Compare how often it guesses right in the first rounds and in the last rounds.' },

      { kind: 'card', title: 'Domain 2: Computer Vision', html: `
<div class="def"><dfn>Computer Vision (CV)</dfn> The AI domain that lets machines see and make sense of images and videos — recognising faces, objects, text and movement.</div>
<p>To a computer, a photo is a grid of tiny dots called <b>pixels</b>, each stored as numbers. A CV model learns which arrangements of pixels mean “cat”, “pothole” or “ripe tomato”.</p>
<ul>
<li>Face unlock on phones and DigiYatra at airports</li>
<li>Crop-disease apps that read a leaf photo</li>
<li>Traffic cameras that read number plates</li>
<li>Self-driving cars spotting lanes and pedestrians</li>
<li>Tools that help doctors check X-rays and eye scans</li>
</ul>` },

      { kind: 'lab', lab: 'quickdraw', title: 'Quick, Draw! Shape Challenge', intro: 'You get 20 seconds to draw each shape while the AI shows its top three guesses live. It recognises your drawing by comparing its shape with examples it already knows — the same idea behind Google’s Quick, Draw! game.' },

      { kind: 'card', title: 'Domain 3: Natural Language Processing', html: `
<div class="def"><dfn>Natural Language Processing (NLP)</dfn> The AI domain that lets machines understand and produce human language — both written text and spoken speech.</div>
<p>“Natural language” means the languages people speak and write every day — Hindi, Tamil, English, Marathi — not computer code.</p>
<ul>
<li>Voice assistants such as Alexa and Google Assistant</li>
<li>Bhashini translating between Indian languages</li>
<li>Chatbots answering customer questions</li>
<li>Email spam filters that read message text</li>
<li>Sentiment analysis — is a review happy or angry?</li>
</ul>
<div class="warn"><b>Careful</b> Speech is sound, but understanding spoken words is still NLP, because the AI is working with language.</div>` },

      { kind: 'lab', lab: 'semantris', title: 'Semantris-style Word Tower', intro: 'Pick a clue word and the AI ranks the words in the tower by how closely they are related to it. Clear 8 target words by choosing clues the AI will link to the right word.' },

      { kind: 'check', concepts: ['data-domain', 'cv', 'nlp'], n: 3 },

      { kind: 'card', title: 'The AI Game: what each game shows', html: `
<table class="tbl">
<thead><tr><th>Game</th><th>Domain</th><th>What the AI works with</th></tr></thead>
<tbody>
<tr><td>Rock, Paper &amp; Scissors</td><td><span class="tag data">Data</span></td><td>Your past moves. It predicts your next move from patterns in your history.</td></tr>
<tr><td>Quick, Draw!</td><td><span class="tag cv">CV</span></td><td>Your drawing. It recognises doodles after learning from a huge collection of drawings.</td></tr>
<tr><td>Semantris</td><td><span class="tag nlp">NLP</span></td><td>Your clue word. It ranks words by how related they are in meaning.</td></tr>
</tbody>
</table>
<div class="key"><b>Key idea</b> In all three games the AI learned from lots of examples. Only the kind of data changes — and that decides the domain.</div>` },

      { kind: 'card', title: 'How to sort any application', html: `
<ol class="flow">
<li><b>Look at the input</b><span>What goes into the AI — numbers, pictures or words?</span></li>
<li><b>Match the domain</b><span>Numbers and tables → Data. Images and video → CV. Text and speech → NLP.</span></li>
<li><b>Check for more than one</b><span>Some systems take in two or three kinds of data.</span></li>
</ol>
<div class="warn"><b>Common mistake</b> Do not sort by the device. One phone runs Data, CV and NLP apps. Sort by the <i>data</i>, not the gadget.</div>
<div class="eg"><b>Try it</b> A school app predicts which students may miss the bus from past attendance records → numbers in a table → <span class="tag data">Data</span>.</div>` },

      { kind: 'card', title: 'Spot the domain in India', html: `
<table class="tbl">
<thead><tr><th>Application</th><th>Domain</th></tr></thead>
<tbody>
<tr><td>Google Maps predicting travel time</td><td><span class="tag data">Data</span></td></tr>
<tr><td>DigiYatra face-based boarding</td><td><span class="tag cv">CV</span></td></tr>
<tr><td>Bhashini translating Hindi into Odia</td><td><span class="tag nlp">NLP</span></td></tr>
<tr><td>A UPI fraud alert</td><td><span class="tag data">Data</span></td></tr>
<tr><td>A crop-disease app reading a leaf photo</td><td><span class="tag cv">CV</span></td></tr>
<tr><td>A railway enquiry chatbot replying in Hindi</td><td><span class="tag nlp">NLP</span></td></tr>
<tr><td>OTT “Because you watched…” suggestions</td><td><span class="tag data">Data</span></td></tr>
</tbody>
</table>
<p>Cover the right column and test yourself: what is the input each time?</p>` },

      { kind: 'check', concepts: ['domains', 'ai-game'], n: 3 },

      { kind: 'card', title: 'When domains work together', html: `
<p>Big AI systems often use more than one domain at once.</p>
<div class="cols">
<div class="mini"><h4>🚗 Self-driving car</h4><p><span class="tag cv">CV</span> Cameras spot lanes, signals and people.<br><span class="tag data">Data</span> Speed, distance, GPS and map readings help plan the route and braking.<br><span class="tag nlp">NLP</span> Understands a passenger’s spoken destination.</p></div>
<div class="mini"><h4>📷 Google Lens translate</h4><p><span class="tag cv">CV</span> Finds and reads the text in your camera view.<br><span class="tag nlp">NLP</span> Translates that text into your language.</p></div>
</div>
<div class="key"><b>Key idea</b> When a system takes in more than one kind of data, it uses more than one domain.</div>` },

      { kind: 'check', concepts: ['combined'], n: 2 },

      { kind: 'card', title: 'Why the domain matters to builders', html: `
<p>Knowing the domain is not just a label for an exam. It tells an AI builder what to do next:</p>
<div class="cols">
<div class="mini"><h4>📊 Data project</h4><p>Collect records and readings, often from spreadsheets, sensors or official data portals.</p></div>
<div class="mini"><h4>👁️ CV project</h4><p>Collect many labelled photos or videos, taken in real conditions.</p></div>
<div class="mini"><h4>💬 NLP project</h4><p>Collect many sentences or voice recordings, in the languages your users really speak.</p></div>
</div>
<div class="key"><b>Key idea</b> Domain → kind of data → how you will collect it. You will use this in the AI Project Cycle next.</div>` },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      // domains
      { id: 'u1-02-q01', c: 'domains', t: 'mcq', d: 1,
        q: 'How many domains of AI does the CBSE course describe?',
        o: ['Three', 'Two', 'Four', 'Six'],
        a: 0,
        ex: 'CBSE describes three domains: Data (Statistical Data), Computer Vision and Natural Language Processing.' },
      { id: 'u1-02-q02', c: 'domains', t: 'match', d: 1,
        q: 'Match each AI domain to the kind of data it works with.',
        pairs: [['Data', 'Numbers and tables'], ['Computer Vision', 'Images and video'], ['Natural Language Processing', 'Text and speech']],
        ex: 'The domain is decided by the data: numbers and tables for Data, pictures and video for CV, and language (written or spoken) for NLP.' },
      { id: 'u1-02-q03', c: 'domains', t: 'mcq', d: 2,
        q: 'What is the best way to decide which domain an AI application belongs to?',
        o: ['Look at the kind of data it takes in', 'Look at the device it runs on', 'Look at the company that made it', 'Look at how much it costs to use'],
        a: 0,
        mis: { 1: 'A single phone runs apps from all three domains, so the device cannot tell you the domain.', 2: 'One company can build Data, CV and NLP products. The data is what matters.' },
        ex: 'Each domain is defined by its kind of data — numbers, images or language — so checking the input is the reliable test.' },
      { id: 'u1-02-q04', c: 'domains', t: 'tf', d: 2,
        q: 'Any AI app that runs on a smartphone belongs to the Computer Vision domain.',
        a: false,
        ex: 'Phones run many kinds of AI: keyboards (NLP), fraud alerts (Data) and face unlock (CV). The device does not decide the domain.' },
      { id: 'u1-02-q05', c: 'domains', t: 'bins', d: 2,
        q: 'Sort each application into its AI domain.',
        bins: ['Data', 'Computer Vision', 'NLP'],
        items: [['Predicting house prices from past sales', 0], ['Recognising faces in a photo', 1], ['Translating a sentence into Marathi', 2], ['Forecasting rainfall from past readings', 0], ['Counting cars in a traffic video', 1], ['Replying to a customer’s typed question', 2]],
        ex: 'Prices and rainfall readings are numbers (Data); photos and video are images (CV); translating and replying to text are language tasks (NLP).' },
      { id: 'u1-02-q06', c: 'domains', t: 'mcq', d: 3,
        q: 'Riya is designing an AI for her school library that suggests books to each student based on records of what they borrowed before. Which domain does this mainly belong to?',
        o: ['Data', 'Computer Vision', 'Natural Language Processing', 'Robotics'],
        a: 0,
        mis: { 1: 'No images are involved — the AI works with borrowing records.', 2: 'Books contain words, but the AI is using a table of who borrowed what, not reading the text.', 3: 'Robotics is not one of the three CBSE domains, and nothing here moves.' },
        ex: 'The input is borrowing records — data in a table. Recommendations based on records belong to the Data domain.' },

      // data-domain
      { id: 'u1-02-q07', c: 'data-domain', t: 'mcq', d: 1,
        q: 'Which kind of data does the Data (Statistical Data) domain mainly work with?',
        o: ['Numbers and tables', 'Photos and videos', 'Spoken words', 'Hand-drawn sketches'],
        a: 0,
        ex: 'The Data domain finds patterns in numbers and tables such as records, readings, scores and prices.' },
      { id: 'u1-02-q08', c: 'data-domain', t: 'multi', d: 2,
        q: 'Which of these are Data domain applications? Select all that apply.',
        o: ['A price comparison website', 'A bank system detecting unusual transactions', 'A weather forecast made from past readings', 'An app that unlocks a phone with your face', 'A chatbot that answers questions'],
        a: [0, 1, 2],
        ex: 'Prices, transactions and weather readings are numbers in tables. Face unlock uses images (CV) and a chatbot uses language (NLP).' },
      { id: 'u1-02-q09', c: 'data-domain', t: 'mcq', d: 2,
        q: 'An IPL broadcast shows a live graph of each team’s chance of winning, based on runs, wickets and overs left. Which domain is this?',
        o: ['Data', 'Computer Vision', 'Natural Language Processing', 'Robotics'],
        a: 0,
        mis: { 1: 'The match is on video, but the prediction is made from scores — numbers, not images.', 3: 'Robotics is not one of the three CBSE AI domains.' },
        ex: 'Runs, wickets and overs are numbers. Predicting from numerical records is the Data domain.' },
      { id: 'u1-02-q10', c: 'data-domain', t: 'tf', d: 1,
        q: 'Fraud detection in banking is an example of the Data domain.',
        a: true,
        ex: 'Fraud detection looks for unusual patterns in transaction records — amounts, times, places — which are numbers in tables.' },
      { id: 'u1-02-q11', c: 'data-domain', t: 'mcq', d: 3,
        q: 'A dairy cooperative in Gujarat wants to predict how much milk each village will supply next week, using past daily collection records and rainfall. Which domain will the AI mainly use?',
        o: ['Data, because it works with numbers recorded over time', 'Computer Vision, because the cows can be photographed', 'NLP, because farmers talk about their milk supply', 'Computer Vision, because milk cans are visible objects'],
        a: 0,
        mis: { 1: 'The cows could be photographed, but the AI is not using photos — it uses collection records.', 2: 'The AI is not processing anyone’s words; its inputs are litres and rainfall.' },
        ex: 'Litres collected and rainfall are numbers recorded over time. Predicting from them is a Data domain task.' },
      { id: 'u1-02-q12', c: 'data-domain', t: 'mcq', d: 2,
        q: 'A hospital wants to predict how many beds it will need next week. Which input would make this a Data domain problem?',
        o: ['Past daily admission numbers', 'X-ray images of patients', 'Doctors’ spoken notes', 'Photos of the hospital wards'],
        a: 0,
        mis: { 1: 'X-ray images would make it a Computer Vision task.', 2: 'Spoken notes are language — that would be NLP.' },
        ex: 'Admission counts are numbers in a table, which is the Data domain. Images would be CV and speech would be NLP.' },

      // cv
      { id: 'u1-02-q13', c: 'cv', t: 'mcq', d: 1,
        q: 'Computer Vision helps machines to…',
        o: ['see and make sense of images and videos', 'understand and translate spoken language', 'predict prices from tables of numbers', 'store files safely on the internet'],
        a: 0,
        ex: 'Computer Vision is about images and video: recognising faces, objects, text and movement.' },
      { id: 'u1-02-q14', c: 'cv', t: 'tf', d: 1,
        q: 'To a computer, a digital image is a grid of pixels stored as numbers.',
        a: true,
        ex: 'Every pixel’s colour is stored as numbers. CV models learn which patterns of these numbers mean which objects.' },
      { id: 'u1-02-q15', c: 'cv', t: 'multi', d: 2,
        q: 'Which of these are Computer Vision applications? Select all that apply.',
        o: ['Face unlock on a phone', 'DigiYatra boarding at airports', 'A crop app identifying disease from a leaf photo', 'A voice assistant setting an alarm', 'Predicting exam results from past marks'],
        a: [0, 1, 2],
        ex: 'Faces and leaf photos are images, so those are CV. A voice assistant is NLP and predicting from marks is Data.' },
      { id: 'u1-02-q16', c: 'cv', t: 'mcq', d: 2,
        q: 'A traffic camera in Mumbai reads the number plate of a car that jumps a red light. Which domain is this?',
        o: ['Computer Vision', 'Data', 'Natural Language Processing', 'Robotics'],
        a: 0,
        mis: { 1: 'The output might go into a table, but reading the plate from a camera image is CV.', 2: 'It reads letters and numbers, but from an image — recognising characters in a picture is a CV task.' },
        ex: 'The AI must find and read characters inside a camera image. Making sense of images is Computer Vision.' },
      { id: 'u1-02-q17', c: 'cv', t: 'mcq', d: 3,
        q: 'Drones photograph a cotton field in Maharashtra, and an AI marks the patches where pests have damaged the plants. Which domain does the main work?',
        o: ['Computer Vision — it analyses the field photos', 'Data — it reads a table of pest counts', 'NLP — it reads farmers’ written complaints', 'Robotics — it steers the drone’s flight path'],
        a: 0,
        mis: { 1: 'There is no table of counts here — the AI finds damage by looking at photos.', 3: 'Flying the drone is not the AI task described; spotting damage in the photos is.' },
        ex: 'The AI’s input is aerial photos and its job is to spot damaged areas in them — that is Computer Vision.' },
      { id: 'u1-02-q18', c: 'cv', t: 'mcq', d: 3,
        q: 'Sana’s school wants to mark attendance automatically by recognising students’ faces as they walk in through the gate. Which domain and data does this need?',
        o: ['CV, using images of students’ faces', 'Data, using the class timetable', 'NLP, using students saying “present”', 'CV, using a list of roll numbers'],
        a: 0,
        mis: { 1: 'A timetable cannot tell who walked in. The system must recognise faces.', 2: 'That would be voice-based, but the plan here is to recognise faces.', 3: 'Right domain, wrong data — a list of roll numbers is not an image.' },
        ex: 'Face recognition is Computer Vision, and it must learn from images of each student’s face.' },

      // nlp
      { id: 'u1-02-q19', c: 'nlp', t: 'mcq', d: 1,
        q: 'What does NLP stand for?',
        o: ['Natural Language Processing', 'Native Language Programming', 'Numerical Logic Processing', 'Network Language Protocol'],
        a: 0,
        ex: 'NLP stands for Natural Language Processing — helping machines understand and produce human language.' },
      { id: 'u1-02-q20', c: 'nlp', t: 'tf', d: 2,
        q: 'A voice assistant understanding a spoken question is an NLP task, even though the input is sound.',
        a: true,
        ex: 'Spoken words are still language. Understanding what was said is Natural Language Processing.' },
      { id: 'u1-02-q21', c: 'nlp', t: 'multi', d: 2,
        q: 'Which of these are NLP applications? Select all that apply.',
        o: ['Bhashini translating Hindi into Kannada', 'A spam filter reading the text of emails', 'A chatbot answering train enquiries', 'Detecting a pothole in a road photo', 'Predicting cricket scores from past matches'],
        a: [0, 1, 2],
        ex: 'Translation, reading email text and chatting all work with language. The pothole task uses images (CV) and score prediction uses numbers (Data).' },
      { id: 'u1-02-q22', c: 'nlp', t: 'mcq', d: 2,
        q: 'A film website sorts thousands of written reviews into “positive” and “negative”. Which domain is this?',
        o: ['NLP — it works with written text', 'Data — it works with a table of numbers', 'CV — it looks at the review on screen', 'Robotics — it sorts things automatically'],
        a: 0,
        mis: { 1: 'The reviews are sentences, not numbers. Understanding their tone is a language task.', 2: 'The AI reads the words themselves, not a picture of the screen.' },
        ex: 'Working out whether written text is happy or unhappy is called sentiment analysis, a classic NLP task.' },
      { id: 'u1-02-q23', c: 'nlp', t: 'mcq', d: 3,
        q: 'Ayaan’s grandfather in Bihar asks a farming helpline app, in Bhojpuri, “When should I sow wheat?” and hears a spoken answer. Which domain makes understanding his question possible?',
        o: ['NLP — it understands his spoken question', 'CV — it looks at a photo of his field', 'Data — it reads a table of past harvests', 'CV — it reads his face while he speaks'],
        a: 0,
        mis: { 1: 'No photo is involved in asking the question.', 2: 'The app may use data to find the answer, but understanding his spoken question is NLP.' },
        ex: 'He asks in spoken Bhojpuri. Turning speech into meaning is Natural Language Processing.' },
      { id: 'u1-02-q24', c: 'nlp', t: 'mcq', d: 1,
        q: 'Which of these is an example of “natural language”?',
        o: ['Tamil spoken by people every day', 'Python code written by a programmer', 'Binary 0s and 1s inside a computer', 'A barcode printed on a product'],
        a: 0,
        ex: 'Natural languages are the ones people use to speak and write to each other, such as Tamil. Code, binary and barcodes are made for machines.' },

      // ai-game
      { id: 'u1-02-q25', c: 'ai-game', t: 'match', d: 1,
        q: 'Match each game in the AI Game to its domain.',
        pairs: [['Rock, Paper & Scissors', 'Data'], ['Quick, Draw!', 'Computer Vision'], ['Semantris', 'Natural Language Processing']],
        ex: 'Rock, Paper & Scissors learns from your past moves (Data), Quick, Draw! recognises drawings (CV) and Semantris links words by meaning (NLP).' },
      { id: 'u1-02-q26', c: 'ai-game', t: 'mcq', d: 1,
        q: 'In the AI Game, which game is based on Computer Vision?',
        o: ['Quick, Draw!', 'Semantris', 'Rock, Paper & Scissors', 'Moral Machine'],
        a: 0,
        ex: 'In Quick, Draw! the AI looks at your drawing — an image — so it is Computer Vision.' },
      { id: 'u1-02-q27', c: 'ai-game', t: 'mcq', d: 2,
        q: 'In Rock, Paper & Scissors against an AI, how does the AI try to beat you?',
        o: ['It predicts your next move from patterns in your past moves', 'It watches your hand through the webcam before you play', 'It reads the words you type before each round', 'It always plays the same move to confuse you'],
        a: 0,
        mis: { 1: 'The game does not use a camera — it only uses the record of moves you have played.', 3: 'Playing the same move every time would be easy to beat. The AI changes its move based on your history.' },
        ex: 'The AI keeps a record of your moves and looks for patterns, so it is a Data domain game.' },
      { id: 'u1-02-q28', c: 'ai-game', t: 'tf', d: 2,
        q: 'In Semantris, the AI ranks words by how related they are to your clue, so it is an NLP game.',
        a: true,
        ex: 'Judging how related words are in meaning is a language task, so Semantris is based on Natural Language Processing.' },
      { id: 'u1-02-q29', c: 'ai-game', t: 'mcq', d: 3,
        q: 'After 20 rounds of Rock, Paper & Scissors, Kabir notices the AI predicts his moves much better than in the first 5 rounds. What is the best explanation?',
        o: ['It has collected more data about his habits', 'It has slowed down to think much harder about each move', 'It has started cheating by peeking', 'It has memorised the rules of the game'],
        a: 0,
        mis: { 1: 'Speed is not the reason. The AI improves because it has more examples of Kabir’s moves.', 3: 'It knew the rules from round 1. What changed is how much it knows about Kabir.' },
        ex: 'In the first rounds the AI had almost no data about Kabir. After 20 rounds it has seen his patterns, so its predictions improve — more data, better predictions.' },
      { id: 'u1-02-q30', c: 'ai-game', t: 'mcq', d: 2,
        q: 'In Quick, Draw!, the AI guesses “circle” for Meera’s wobbly drawing of the sun. How did it know?',
        o: ['It compares her drawing with drawings it learned from', 'It reads the label Meera typed under her drawing', 'It asks a human judge to decide in real time', 'It measures the exact colour of the sun she used'],
        a: 0,
        mis: { 1: 'There is no label to read — the AI must work it out from the drawing itself.', 2: 'No human is involved in the guess. The AI decides on its own in seconds.' },
        ex: 'The AI learned from a huge collection of doodles, so it can recognise the shape of a new drawing — Computer Vision.' },

      // combined
      { id: 'u1-02-q31', c: 'combined', t: 'mcq', d: 2,
        q: 'Google Lens can translate a signboard when you point your camera at it. Which domains work together here?',
        o: ['CV and NLP', 'Data and CV', 'NLP only', 'Data and NLP'],
        a: 0,
        mis: { 2: 'Translation is NLP, but first the app must find and read the text in a camera image — that is CV.', 1: 'There is no table of numbers involved. The two steps are reading the image and translating the language.' },
        ex: 'CV finds and reads the text in the image, then NLP translates it. Two kinds of data — image and language — means two domains.' },
      { id: 'u1-02-q32', c: 'combined', t: 'bins', d: 2,
        q: 'A self-driving car does all of these things. Sort each one into the domain it uses.',
        bins: ['Data', 'Computer Vision', 'NLP'],
        items: [['Cameras spot lanes and pedestrians', 1], ['Speed and distance readings help plan braking', 0], ['A passenger says “Take me to India Gate”', 2], ['A camera reads a speed-limit sign', 1], ['GPS position and map data are used to plan the route', 0]],
        ex: 'Camera tasks are CV, number readings such as speed, distance and GPS are Data, and understanding a spoken request is NLP.' },
      { id: 'u1-02-q33', c: 'combined', t: 'mcq', d: 3,
        q: 'A shopping app lets you photograph a product label written in Japanese and hear its name read aloud in Hindi. Which combination of domains is used?',
        o: ['CV to read the label, NLP to translate and speak it', 'Data to read the label, CV to translate and speak it', 'NLP to read the label, Data to translate and speak it', 'CV to translate the label, Data to read it aloud'],
        a: 0,
        mis: { 1: 'Reading text from a photo is CV, and translating is NLP — not the other way round.', 3: 'Translating and speaking are language tasks, so they belong to NLP.' },
        ex: 'Reading the label means understanding an image (CV). Translating it and speaking it in Hindi are language tasks (NLP).' },
      { id: 'u1-02-q34', c: 'combined', t: 'tf', d: 2,
        q: 'An AI system can belong to more than one domain if it uses more than one kind of data.',
        a: true,
        ex: 'A self-driving car uses images, sensor numbers and speech, so it combines CV, Data and NLP.' },
      { id: 'u1-02-q35', c: 'combined', t: 'multi', d: 3,
        q: 'Which of these systems combine at least two AI domains? Select all that apply.',
        o: ['An app that reads a menu photo and translates it into English', 'A self-driving car using cameras and sensor readings', 'A calculator app that adds two numbers', 'A spam filter that only reads email text'],
        a: [0, 1],
        ex: 'The menu app uses CV and NLP; the car uses CV and Data. The calculator is not AI at all, and the spam filter uses only text (NLP).' },
      { id: 'u1-02-q36', c: 'combined', t: 'mcq', d: 3,
        q: 'Diya builds a “plant doctor” app. A farmer photographs a leaf and types a question in Marathi such as “Which spray should I use?”. Which domains are needed?',
        o: ['CV for the leaf photo and NLP for the question', 'Data for the leaf photo and CV for the question', 'NLP for the leaf photo and Data for the question', 'CV only, because the farmer uses a camera'],
        a: 0,
        mis: { 1: 'A photo is an image (CV) and a typed question is language (NLP).', 3: 'The camera covers the photo, but understanding the typed Marathi question needs NLP too.' },
        ex: 'The leaf photo needs Computer Vision; the typed Marathi question needs Natural Language Processing.' }
    ]
  },
  // ───────────────────────── u1-03 The AI Project Cycle ─────────────────────────
  {
    id: 'u1-03',
    title: 'The AI Project Cycle',
    minutes: 50,
    outcomes: [
      'Identify the AI Project Cycle framework and name its six stages in order',
      'Explain the purpose of each stage and map project activities to the right stage',
      'Understand that the AI Project Cycle is iterative'
    ],
    hook: 'Every AI you have met so far was built with the same six-step plan — learn it once and you can plan your own AI project.',
    concepts: {
      'cycle-stages': 'The six stages in order',
      'stage-purpose': 'What each stage does',
      'cycle-map': 'Matching activities to stages',
      'iterative': 'Why the cycle repeats'
    },
    steps: [
      { kind: 'card', title: 'Building AI is a project', html: `
<p>Your class is running a food stall at the school fest. Would you start by frying samosas? No! You would:</p>
<ol>
<li>decide exactly what you are trying to do (what to sell, and to whom),</li>
<li>collect information (prices, how many visitors came last year),</li>
<li>look for patterns in it (what sold out early),</li>
<li>make a plan (the menu and quantities),</li>
<li>test it (a trial batch for teachers),</li>
<li>then run the stall for real.</li>
</ol>
<p>Building an AI follows the same kind of plan. It is called the <b>AI Project Cycle</b>.</p>` },

      { kind: 'card', title: 'The six stages', html: `
<ol class="flow">
<li><b>Problem Scoping</b><span>Decide exactly which problem to solve, and for whom.</span></li>
<li><b>Data Acquisition</b><span>Collect accurate, reliable and relevant data.</span></li>
<li><b>Data Exploration</b><span>Arrange and visualise the data to find patterns.</span></li>
<li><b>Modelling</b><span>Build the model that turns input data into an output.</span></li>
<li><b>Evaluation</b><span>Test the model on new data and check how well it works.</span></li>
<li><b>Deployment</b><span>Put the model into real use and keep monitoring it.</span></li>
</ol>
<div class="key"><b>Memory trick</b> <b>S</b>ome <b>A</b>nts <b>E</b>at <b>M</b>angoes <b>E</b>very <b>D</b>ay — Scoping, Acquisition, Exploration, Modelling, Evaluation, Deployment.</div>` },

      { kind: 'card', title: 'Stages 1–2: scope, then collect', html: `
<div class="cols">
<div class="mini"><h4>🎯 Problem Scoping</h4><p>Understand the problem deeply: who has it, what it is, where it happens and why solving it matters. It ends with a clear <b>problem statement</b>.</p></div>
<div class="mini"><h4>📥 Data Acquisition</h4><p>Collect the data the AI will learn from — from surveys, sensors, cameras, records or APIs. The data must be accurate, reliable and relevant to the problem.</p></div>
</div>
<div class="warn"><b>Careful</b> Skip scoping and you may collect mountains of data that do not help with the real problem.</div>` },

      { kind: 'card', title: 'Stages 3–4: explore, then model', html: `
<div class="cols">
<div class="mini"><h4>🔎 Data Exploration</h4><p>Arrange, clean and visualise the data with graphs to spot trends, patterns and odd values. This helps you decide what kind of model to try.</p></div>
<div class="mini"><h4>🧠 Modelling</h4><p>Build the <b>model</b>: the algorithm or program that takes input data and produces an output, such as a prediction or a decision. Models can be rule-based or learning-based — you will meet both later.</p></div>
</div>
<div class="eg"><b>Example</b> Graphs show that canteen sales drop on exam days. So the model should be given “exam day: yes or no” as an input.</div>` },

      { kind: 'card', title: 'Stages 5–6: test, then use', html: `
<div class="cols">
<div class="mini"><h4>✅ Evaluation</h4><p>Try the model on <b>testing data</b> it has never seen, and compare its predictions with what really happened. Is it reliable enough to use?</p></div>
<div class="mini"><h4>🚀 Deployment</h4><p>Put the evaluated model into real use — inside an app, a website or a device — and keep monitoring how it performs.</p></div>
</div>
<div class="key"><b>Key idea</b> A model that has not been evaluated should not be deployed. Evaluation is the safety check before real people depend on it.</div>` },

      { kind: 'check', concepts: ['cycle-stages', 'stage-purpose'], n: 3 },

      { kind: 'card', title: 'One project, all six stages', html: `
<p>Project: reduce food waste in the school canteen.</p>
<table class="tbl">
<thead><tr><th>Stage</th><th>What the team does</th></tr></thead>
<tbody>
<tr><td>Problem Scoping</td><td>Finds that a lot of food is thrown away on some days. Goal: predict how much of each item to cook.</td></tr>
<tr><td>Data Acquisition</td><td>Collects three months of daily sales, menus, weather, exam days and holidays.</td></tr>
<tr><td>Data Exploration</td><td>Graphs show sales fall on exam days and hot snacks sell more on rainy days.</td></tr>
<tr><td>Modelling</td><td>Builds a model that predicts tomorrow’s sales of each item.</td></tr>
<tr><td>Evaluation</td><td>Tests it on two weeks of data it never saw, comparing predicted and actual sales.</td></tr>
<tr><td>Deployment</td><td>The canteen manager sees a daily prediction on a tablet; staff report big misses.</td></tr>
</tbody>
</table>` },

      { kind: 'card', title: 'A cycle, not a straight line', html: `
<p>It is drawn as a cycle because teams often go back to an earlier stage:</p>
<ul>
<li>Evaluation shows poor results on rainy days → back to <b>Data Acquisition</b> to collect more rainy-day data.</li>
<li>Exploration shows the data does not match the problem → back to <b>Problem Scoping</b> to refine it.</li>
<li>After Deployment, users give feedback → a new or better problem to scope.</li>
</ul>
<div class="def"><dfn>Iterative</dfn> Repeating a set of steps again and again, improving a little each round.</div>
<div class="key"><b>Key idea</b> Each trip around the cycle makes the AI better.</div>` },

      { kind: 'card', title: 'Mistakes to avoid', html: `
<div class="warn"><b>Jumping to Modelling</b> “Let’s build an app!” before anyone knows the exact problem or has any data.</div>
<div class="warn"><b>Mixing up Acquisition and Exploration</b> Acquisition is <i>collecting</i> data. Exploration is <i>studying</i> the data you collected.</div>
<div class="warn"><b>Mixing up Evaluation and Deployment</b> Evaluation tests the model on unseen data. Deployment puts it in front of real users.</div>
<div class="warn"><b>Thinking Deployment is the end</b> The real world changes — new menus, new students — so deployed models must be monitored and improved.</div>` },

      { kind: 'check', concepts: ['cycle-map', 'iterative'], n: 3 },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      // cycle-stages
      { id: 'u1-03-q01', c: 'cycle-stages', t: 'order', d: 1,
        q: 'Put the six stages of the AI Project Cycle in order.',
        items: ['Problem Scoping', 'Data Acquisition', 'Data Exploration', 'Modelling', 'Evaluation', 'Deployment'],
        ex: 'You first define the problem, then collect data, explore it, build a model, test it, and finally put it into use.' },
      { id: 'u1-03-q02', c: 'cycle-stages', t: 'num', d: 1,
        q: 'How many stages are there in the AI Project Cycle?',
        a: 6,
        ex: 'The six stages are Problem Scoping, Data Acquisition, Data Exploration, Modelling, Evaluation and Deployment.' },
      { id: 'u1-03-q03', c: 'cycle-stages', t: 'mcq', d: 1,
        q: 'Which is the first stage of the AI Project Cycle?',
        o: ['Problem Scoping', 'Data Acquisition', 'Modelling', 'Deployment'],
        a: 0,
        ex: 'You must understand the problem before you can know what data to collect or what model to build.' },
      { id: 'u1-03-q04', c: 'cycle-stages', t: 'mcq', d: 2,
        q: 'Which stage comes immediately after Data Exploration?',
        o: ['Modelling', 'Evaluation', 'Data Acquisition', 'Deployment'],
        a: 0,
        mis: { 1: 'Evaluation tests a model — the model has to be built first, in Modelling.', 2: 'Acquisition comes before Exploration: you collect data before you can explore it.' },
        ex: 'After exploring the data and spotting patterns, you use what you learned to build the model.' },
      { id: 'u1-03-q05', c: 'cycle-stages', t: 'mcq', d: 2,
        q: 'Which stage comes immediately before Deployment?',
        o: ['Evaluation', 'Modelling', 'Data Exploration', 'Problem Scoping'],
        a: 0,
        mis: { 1: 'Modelling builds the model, but it must be tested in Evaluation before real use.', 2: 'Exploration happens before any model exists.' },
        ex: 'A model must be evaluated on unseen data before it is trusted in real use.' },
      { id: 'u1-03-q06', c: 'cycle-stages', t: 'tf', d: 1,
        q: 'Data Acquisition comes before Data Exploration in the AI Project Cycle.',
        a: true,
        ex: 'You have to collect data (Acquisition) before you can study and visualise it (Exploration).' },
      { id: 'u1-03-q07', c: 'cycle-stages', t: 'mcq', d: 3,
        q: 'Kabir’s team writes this plan: “Step 1: build the model. Step 2: collect data. Step 3: decide the problem.” What is wrong with it?',
        o: ['It is reversed — scope first, then collect data, then model', 'Nothing — a team can choose any order it likes', 'They must deploy the model before they build it', 'They should evaluate the model before collecting data'],
        a: 0,
        mis: { 1: 'The order matters: you cannot build a useful model without knowing the problem and having data.', 3: 'Evaluation needs a finished model and testing data, so it cannot come first.' },
        ex: 'The cycle starts with Problem Scoping, then Data Acquisition, and only later Modelling. Kabir’s plan runs backwards.' },
      { id: 'u1-03-q32', c: 'cycle-stages', t: 'mcq', d: 2,
        q: 'Which two stages both deal with data before any model is built?',
        o: ['Data Acquisition and Data Exploration', 'Evaluation and Deployment', 'Modelling and Evaluation', 'Problem Scoping and Deployment'],
        a: 0,
        mis: { 1: 'Evaluation and Deployment come after the model is built.', 2: 'Modelling is where the model is built, so it cannot come before it.' },
        ex: 'Stages 2 and 3 — Acquisition (collecting) and Exploration (studying) — prepare the data for Modelling.' },

      // stage-purpose
      { id: 'u1-03-q08', c: 'stage-purpose', t: 'match', d: 1,
        q: 'Match each stage to its purpose.',
        pairs: [['Problem Scoping', 'Understand the problem and set a clear goal'], ['Data Acquisition', 'Collect relevant, reliable data'], ['Data Exploration', 'Visualise data to find patterns'], ['Evaluation', 'Test the model on new data'], ['Deployment', 'Put the model into real use']],
        ex: 'Each stage has one main job: scope, collect, explore, (model), evaluate, deploy.' },
      { id: 'u1-03-q09', c: 'stage-purpose', t: 'mcq', d: 1,
        q: 'In the AI Project Cycle, what is a <b>model</b>?',
        o: ['The algorithm that turns input data into an output', 'A small plastic copy of a robot used in class demos', 'The graph that is drawn during Data Exploration', 'The list of all the people affected by the problem'],
        a: 0,
        ex: 'A model takes input data and produces an output such as a prediction or decision. It is built in the Modelling stage.' },
      { id: 'u1-03-q10', c: 'stage-purpose', t: 'mcq', d: 2,
        q: 'Why do we evaluate a model before deploying it?',
        o: ['To check how well it works on data it has never seen', 'To collect more data from the people who use it', 'To decide which problem the project should solve', 'To make the model run faster on mobile phones'],
        a: 0,
        mis: { 1: 'Collecting data is Data Acquisition. Evaluation tests the model.', 2: 'Choosing the problem is Problem Scoping, which happens at the start.' },
        ex: 'Evaluation compares the model’s predictions with reality on unseen testing data, so we know whether it is good enough before real people rely on it.' },
      { id: 'u1-03-q11', c: 'stage-purpose', t: 'tf', d: 2,
        q: 'In Data Exploration, graphs help you spot trends and patterns that guide which model to try.',
        a: true,
        ex: 'Visualising the data shows its trends and patterns, which helps the team plan the model.' },
      { id: 'u1-03-q12', c: 'stage-purpose', t: 'mcq', d: 2,
        q: 'What should the Problem Scoping stage end with?',
        o: ['A clear problem statement', 'A trained model', 'A deployed app', 'A set of finished graphs'],
        a: 0,
        mis: { 1: 'A trained model comes from Modelling, much later.', 3: 'Graphs are made during Data Exploration, after the data is collected.' },
        ex: 'Problem Scoping turns a vague idea into a clear problem statement that guides every later stage.' },
      { id: 'u1-03-q13', c: 'stage-purpose', t: 'multi', d: 2,
        q: 'Which statements about Deployment are true? Select all that apply.',
        o: ['The model is put into real use', 'It can be inside an app, a website or a device', 'Its performance should keep being monitored', 'It is the stage where the problem is first chosen', 'It happens before Evaluation'],
        a: [0, 1, 2],
        ex: 'Deployment means real use, in some product, with monitoring. The problem is chosen in Problem Scoping, and Evaluation must come before Deployment.' },
      { id: 'u1-03-q14', c: 'stage-purpose', t: 'mcq', d: 3,
        q: 'Meera’s model for spotting healthy and diseased rice leaves was right on 95 out of 100 new photos it had never seen. Which stage has she just completed?',
        o: ['Evaluation', 'Modelling', 'Data Exploration', 'Deployment'],
        a: 0,
        mis: { 1: 'The model was already built. Checking it on new photos is the next stage.', 3: 'The model is not yet in real use with farmers — she is still testing it.' },
        ex: 'Testing a model on unseen data and counting correct predictions is Evaluation.' },
      { id: 'u1-03-q15', c: 'stage-purpose', t: 'mcq', d: 1,
        q: 'Which stage involves collecting data from surveys, sensors, cameras or APIs?',
        o: ['Data Acquisition', 'Data Exploration', 'Evaluation', 'Deployment'],
        a: 0,
        ex: 'Acquisition means getting or collecting. Data Acquisition is when the data is gathered from its sources.' },
      { id: 'u1-03-q33', c: 'stage-purpose', t: 'mcq', d: 3,
        q: 'Rohan says, “Evaluation and Deployment are the same — both use the model.” What is the real difference?',
        o: ['Evaluation tests it on unseen data; Deployment puts it into real use', 'Evaluation uses real customers; Deployment uses only test data', 'Evaluation comes last; Deployment comes in the middle of the cycle', 'Evaluation builds the model; Deployment draws the graphs'],
        a: 0,
        mis: { 1: 'It is the other way round: testing data is for Evaluation, real users are for Deployment.', 3: 'The model is built in Modelling and graphs are drawn in Data Exploration.' },
        ex: 'Both use the model, but Evaluation is a test on unseen data, while Deployment is real use by real people after it passes that test.' },

      // cycle-map
      { id: 'u1-03-q16', c: 'cycle-map', t: 'bins', d: 2,
        q: 'Sort each activity into the stage it belongs to.',
        bins: ['Problem Scoping', 'Data Acquisition', 'Data Exploration'],
        items: [['Filling in a 4Ws problem canvas', 0], ['Downloading rainfall records from a government website', 1], ['Drawing a line graph of daily attendance', 2], ['Writing a problem statement', 0], ['Running a survey of 200 students', 1], ['Spotting an unusual value on a scatter plot', 2]],
        ex: 'The canvas and problem statement define the problem (Scoping). Downloading and surveying gather data (Acquisition). Graphs and spotting odd values study the data (Exploration).' },
      { id: 'u1-03-q17', c: 'cycle-map', t: 'bins', d: 2,
        q: 'Sort each activity into the stage it belongs to.',
        bins: ['Modelling', 'Evaluation', 'Deployment'],
        items: [['Training the model on labelled photos', 0], ['Comparing predictions with real results on test data', 1], ['Launching the model inside the school app', 2], ['Choosing a rule-based or a learning-based approach', 0], ['Counting how many test predictions were correct', 1], ['Monitoring the app after launch', 2]],
        ex: 'Building and training the model is Modelling; checking it on test data is Evaluation; launching and monitoring it is Deployment.' },
      { id: 'u1-03-q18', c: 'cycle-map', t: 'mcq', d: 2,
        q: 'Arjun downloads three years of air-quality readings for his city from a government open-data website. Which stage is he in?',
        o: ['Data Acquisition', 'Data Exploration', 'Problem Scoping', 'Modelling'],
        a: 0,
        mis: { 1: 'He has not started studying or graphing the data yet — he is collecting it.', 2: 'Scoping is about defining the problem, not gathering the data.' },
        ex: 'Downloading data from a source is collecting it — Data Acquisition.' },
      { id: 'u1-03-q19', c: 'cycle-map', t: 'mcq', d: 2,
        q: 'Sana draws bar charts of how many students walk, cycle or take the bus to school, to look for patterns. Which stage is she in?',
        o: ['Data Exploration', 'Data Acquisition', 'Evaluation', 'Deployment'],
        a: 0,
        mis: { 1: 'The data has already been collected. Drawing charts to find patterns is the next stage.', 2: 'Evaluation tests a model. Sana is studying the data, not testing a model.' },
        ex: 'Visualising collected data to find patterns is Data Exploration.' },
      { id: 'u1-03-q20', c: 'cycle-map', t: 'mcq', d: 3,
        q: 'A hospital in Hyderabad starts using an AI tool on its reception tablets to suggest which department a patient should visit, and staff note whenever it is wrong. Which stage is this?',
        o: ['Deployment', 'Evaluation', 'Modelling', 'Data Acquisition'],
        a: 0,
        mis: { 1: 'Noting errors sounds like testing, but the tool is already being used with real patients — that is Deployment with monitoring.', 2: 'The model is already built and in use, so Modelling is over.' },
        ex: 'The tool is in real use, and staff are monitoring it — both are part of Deployment.' },
      { id: 'u1-03-q21', c: 'cycle-map', t: 'mcq', d: 3,
        q: 'Before deciding what to build, a team asks farmers in Punjab, “What is your biggest problem at harvest time, and when does it happen?” Which stage are they in?',
        o: ['Problem Scoping', 'Data Acquisition', 'Data Exploration', 'Evaluation'],
        a: 0,
        mis: { 1: 'They are asking questions, but to understand the problem itself — not to gather training data for a model.', 2: 'There is no data to explore yet; they are still working out the problem.' },
        ex: 'Finding out what the problem is, who has it and when it happens is Problem Scoping.' },
      { id: 'u1-03-q22', c: 'cycle-map', t: 'order', d: 3,
        q: 'A team builds an AI to predict crowding at a Durga Puja pandal. Put their activities in order.',
        items: ['Decide to predict each evening’s crowd to keep visitors safe', 'Collect past visitor counts, weather and day of the week', 'Plot visitor counts against time to spot peak hours', 'Train a model to predict the next evening’s crowd', 'Check its predictions against real counts for a few evenings', 'Show the predictions on volunteers’ phones'],
        ex: 'These follow the six stages: scoping, acquisition, exploration, modelling, evaluation and deployment.' },
      { id: 'u1-03-q23', c: 'cycle-map', t: 'multi', d: 2,
        q: 'Which activities belong to Data Exploration? Select all that apply.',
        o: ['Drawing graphs of the collected data', 'Looking for trends and unusual values', 'Arranging the data neatly in a table', 'Listing the stakeholders of the problem', 'Launching the final app'],
        a: [0, 1, 2],
        ex: 'Exploration is about arranging, visualising and studying the data. Stakeholders belong to Scoping and launching belongs to Deployment.' },
      { id: 'u1-03-q24', c: 'cycle-map', t: 'tf', d: 2,
        q: 'Writing the problem statement belongs to the Modelling stage.',
        a: false,
        ex: 'The problem statement is written during Problem Scoping, the first stage. Modelling comes much later.' },
      { id: 'u1-03-q34', c: 'cycle-map', t: 'tf', d: 2,
        q: 'Running a survey to gather the information an AI will learn from is part of Data Exploration.',
        a: false,
        ex: 'Gathering data through a survey is Data Acquisition. Exploration starts once you have the data and begin studying it.' },

      // iterative
      { id: 'u1-03-q25', c: 'iterative', t: 'tf', d: 1,
        q: 'The AI Project Cycle is iterative, which means teams can go back to earlier stages to improve the project.',
        a: true,
        ex: 'Iterative means repeating and improving. Teams loop back whenever they learn something new.' },
      { id: 'u1-03-q26', c: 'iterative', t: 'mcq', d: 1,
        q: 'What does <b>iterative</b> mean?',
        o: ['Repeating steps and improving each round', 'Doing every step only once and then stopping', 'Skipping the steps that are hard', 'Doing all steps at the same moment'],
        a: 0,
        ex: 'An iterative process goes round again and again, getting a little better each time.' },
      { id: 'u1-03-q27', c: 'iterative', t: 'mcq', d: 2,
        q: 'During Evaluation, a model does badly on photos taken at night. What is the most sensible next step?',
        o: ['Go back and collect more night-time photos', 'Deploy it anyway and hope for the best', 'Delete the problem statement and start over', 'Add more colourful graphs to the report'],
        a: 0,
        mis: { 1: 'Deploying a model that fails at night could cause real problems. Fix it first.', 2: 'The problem is still valid; the data is what needs improving.' },
        ex: 'Poor results on night photos suggest the training data lacked night examples. Going back to Data Acquisition fixes the cause.' },
      { id: 'u1-03-q28', c: 'iterative', t: 'mcq', d: 3,
        q: 'A bus-arrival app worked well in testing, but after launch, commuters in Kochi say it is often wrong during the monsoon. What does this show?',
        o: ['Real-world feedback can send the team back to earlier stages', 'Deployment is the final stage, so nothing more can be done', 'The commuters must be reading the app incorrectly', 'The app was never tested at all before it was launched'],
        a: 0,
        mis: { 1: 'Deployment is not the end — monitoring and feedback keep the cycle going.', 3: 'It was tested; the testing data probably did not include enough monsoon days.' },
        ex: 'Real-world feedback revealed a gap (monsoon conditions). The team should loop back, e.g. to collect monsoon data, then retrain and re-evaluate.' },
      { id: 'u1-03-q29', c: 'iterative', t: 'mcq', d: 2,
        q: 'Why is the AI Project Cycle drawn as a circle rather than a straight line?',
        o: ['Projects loop back to improve after each round', 'All six stages happen at the same time', 'The last stage is always the same as the first', 'Circles are quicker to draw than lines'],
        a: 0,
        mis: { 1: 'The stages have an order; they do not all happen at once.', 2: 'Deployment and Problem Scoping are different stages — but feedback from one can lead into the other.' },
        ex: 'The circle shows that lessons from later stages feed back into earlier ones, so the project keeps improving.' },
      { id: 'u1-03-q30', c: 'iterative', t: 'multi', d: 3,
        q: 'Which situations should send a team back to an earlier stage? Select all that apply.',
        o: ['Exploration shows the data has nothing about the main cause', 'Evaluation shows poor results for one group of users', 'Users report new problems after deployment', 'The model performs well on all of the test data', 'The team picks nicer colours for its graphs'],
        a: [0, 1, 2],
        ex: 'Missing data, weak results for a group and new user problems all reveal gaps to fix. Good test results and chart colours do not require going back.' },
      { id: 'u1-03-q31', c: 'iterative', t: 'mcq', d: 3,
        q: 'Diya’s team starts with “use AI to fix pollution in India”. After some research they change it to “predict high-dust days near our school so PT can be moved indoors”. What does this show?',
        o: ['Refining the problem by revisiting scoping', 'Skipping problem scoping entirely', 'Deploying a model before evaluating it', 'Collecting data without any goal'],
        a: 0,
        mis: { 1: 'They did not skip scoping — they went back to it and improved it.', 3: 'They have a clearer goal now, which will guide what data they collect.' },
        ex: 'Going back and narrowing the problem is iteration within Problem Scoping. The new problem is specific enough to act on.' }
    ]
  },
  // ───────────────────────── u1-04 Problem Scoping and the 4Ws ─────────────────────────
  {
    id: 'u1-04',
    title: 'Problem Scoping and the 4Ws',
    minutes: 100,
    outcomes: [
      'Learn problem scoping and ways to set goals for an AI project, moving from a theme to a topic to a problem',
      'Understand the Sustainable Development Goals as themes for AI projects and develop responsible citizenship',
      'Fill in the 4Ws Problem Canvas, identify stakeholders and current actions, and write a problem statement',
      'Brainstorm the ethical issues around the chosen problem and understand the iterative nature of problem scoping'
    ],
    hook: '“Use AI to save the planet” is a wish, not a project — learn how to turn a big wish into a problem an AI can actually solve.',
    concepts: {
      'theme-topic': 'Themes, topics and problems',
      'sdg': 'Sustainable Development Goals',
      'four-ws': 'The 4Ws Problem Canvas',
      'stakeholders': 'Stakeholders and current actions',
      'ps-template': 'The problem statement template',
      'scoping-ethics': 'Ethics and iterative scoping'
    },
    steps: [
      { kind: 'card', title: 'From a big wish to a clear problem', html: `
<p>“Use AI to improve health” sounds great. But where would you start? Which people? What exactly goes wrong? Where?</p>
<div class="def"><dfn>Problem Scoping</dfn> The first stage of the AI Project Cycle: understanding a problem in detail — who it affects, what it is, where it happens and why it matters — and setting a clear goal.</div>
<div class="eg"><b>Example</b> Big wish: “Improve health.” Scoped problem: “Many students in our school feel tired in the first period because they skip breakfast.” Now you can collect data and design a solution.</div>
<div class="key"><b>Key idea</b> A well-scoped problem is small enough to act on and clear enough to check.</div>` },

      { kind: 'card', title: 'Theme → topic → problem', html: `
<ol class="flow">
<li><b>Theme</b><span>A broad area, e.g. Health, Agriculture, Environment, Education, Transport.</span></li>
<li><b>Topic</b><span>A narrower area inside the theme, e.g. inside Environment: air pollution, waste, water.</span></li>
<li><b>Problem</b><span>One specific issue, e.g. plastic waste piles up near the school gate after lunch.</span></li>
</ol>
<p>To get from a topic to a problem, <b>brainstorm</b>. List — or draw a <b>mind map</b> of — all the problems linked to the topic, then choose one to be the goal of your project.</p>
<div class="warn"><b>Careful</b> Choose a problem you can find evidence for and that matters to real people near you.</div>` },

      { kind: 'card', title: 'The Sustainable Development Goals', html: `
<p>Need a theme? The world has already listed the biggest ones.</p>
<div class="def"><dfn>Sustainable Development Goals (SDGs)</dfn> 17 goals adopted by the member countries of the United Nations in 2015 to end poverty, protect the planet and improve lives for everyone by 2030.</div>
<table class="tbl">
<thead><tr><th>Goal</th><th>Name</th></tr></thead>
<tbody>
<tr><td>2</td><td>Zero Hunger</td></tr>
<tr><td>3</td><td>Good Health and Well-being</td></tr>
<tr><td>4</td><td>Quality Education</td></tr>
<tr><td>6</td><td>Clean Water and Sanitation</td></tr>
<tr><td>13</td><td>Climate Action</td></tr>
</tbody>
</table>
<p>Each goal is a theme you can scope down to a local problem. CBSE asks you to relate your project work to the SDGs.</p>` },

      { kind: 'check', concepts: ['theme-topic', 'sdg'], n: 3 },

      { kind: 'card', title: 'The 4Ws Problem Canvas', html: `
<p>Once you have a problem, the <b>4Ws Problem Canvas</b> helps you understand it fully.</p>
<div class="cols">
<div class="mini"><h4>👥 Who</h4><p>Who are the <b>stakeholders</b> — the people affected by the problem?</p></div>
<div class="mini"><h4>❓ What</h4><p>What exactly is the problem or need? What <b>evidence</b> shows it exists?</p></div>
<div class="mini"><h4>📍 Where</h4><p>Where does it happen — in what context, situation or location?</p></div>
<div class="mini"><h4>💡 Why</h4><p>Why is it worth solving? How would a solution improve things for the stakeholders?</p></div>
</div>
<div class="key"><b>Key idea</b> Filling the canvas turns a vague idea into facts you can check.</div>` },

      { kind: 'card', title: 'Who and What, in depth', html: `
<p>Scenario: elderly people in Sana’s housing colony often forget to take their medicines.</p>
<div class="cols">
<div class="mini"><h4>👥 Who</h4><p>Elderly residents (directly affected); their families; local doctors and pharmacists; the residents’ welfare association.</p></div>
<div class="mini"><h4>❓ What</h4><p>They miss doses, especially in the evening. Evidence: a short survey of 40 households and what local doctors report.</p></div>
</div>
<div class="warn"><b>Careful</b> “What” needs <b>evidence</b>. “I think…” is a guess. A survey, interview, observation or record is evidence.</div>` },

      { kind: 'card', title: 'Where and Why, in depth', html: `
<p>Same scenario: elderly residents missing their medicines.</p>
<div class="cols">
<div class="mini"><h4>📍 Where</h4><p>At home, in the evenings — especially when they live alone or family members are out at work.</p></div>
<div class="mini"><h4>💡 Why</h4><p>Taking medicines on time keeps them healthier, can reduce hospital visits and gives families peace of mind.</p></div>
</div>
<p>Notice that “Why” is about the <b>benefit to the stakeholders</b> — not about how impressive the technology is.</p>
<div class="key"><b>Key idea</b> Who + What + Where + Why = a complete picture of the problem.</div>` },

      { kind: 'check', concepts: ['four-ws'], n: 3 },

      { kind: 'card', title: 'Stakeholders and current actions', html: `
<div class="def"><dfn>Stakeholder</dfn> A person or group who is affected by a problem or who can affect its solution.</div>
<p>Make a full list. Teams often forget people like the bus driver, the canteen vendor or the parents.</p>
<p>Next, research the <b>current actions</b>: what is already being done? A government scheme? An NGO? A school rule?</p>
<div class="eg"><b>Example</b> Problem: plastic waste near the school gate. Current actions: there are dustbins, and the municipality cleans the road once a week. Gap: the bins overflow after lunch, so waste spreads. Your project should aim at the gap.</div>
<div class="key"><b>Key idea</b> Knowing the current actions stops you rebuilding what exists, and shows where AI could add value.</div>` },

      { kind: 'card', title: 'The problem statement template', html: `
<p>Now squeeze the whole canvas into two sentences.</p>
<div class="formula">Our [stakeholder(s)] has/have a problem that [issue/problem/need] when/while [context/situation]. An ideal solution would [benefit of the solution for them].</div>
<div class="eg"><b>Example</b> Our <b>elderly residents</b> have a problem that <b>they miss their medicine doses</b> while <b>they are at home alone in the evenings</b>. An ideal solution would <b>remind them at the right time and alert their family if a dose is missed</b>.</div>
<p>Who → stakeholders. What → the problem. Where → the context. Why → what an ideal solution would do for them.</p>` },

      { kind: 'lab', lab: 'four-ws', title: '4Ws Problem Canvas Builder', intro: 'Choose a school problem, sort eight statements into Who, What, Where and Why, then build its problem statement with the template. Get one scenario completely right to finish.' },

      { kind: 'check', concepts: ['stakeholders', 'ps-template'], n: 3 },

      { kind: 'card', title: 'Ethics: is the goal itself fair?', html: `
<p>Before building anything, ask whether the goal could harm anyone.</p>
<ul>
<li><b>Privacy</b> — Will you collect personal data such as faces or health details? Have people agreed?</li>
<li><b>Fairness</b> — Could the solution help some groups and leave others out, such as people without smartphones?</li>
<li><b>Safety</b> — What happens if the AI is wrong?</li>
<li><b>Honesty</b> — Will people know that an AI is involved?</li>
</ul>
<div class="eg"><b>Example</b> Cameras that film students who litter might reduce waste, but filming and naming children raises privacy concerns. A fairer goal: measure how full each bin is at different times — no faces needed.</div>` },

      { kind: 'card', title: 'Scoping is never quite finished', html: `
<p>Problem scoping is <b>iterative</b>. As you learn more, you go back and refine it.</p>
<ul>
<li>A survey shows the real cause is different from your guess → rewrite the “What”.</li>
<li>You find a stakeholder you missed → update the “Who”.</li>
<li>You discover something already solves your problem → aim at the gap instead.</li>
</ul>
<div class="warn"><b>Common mistakes</b> A problem that is far too broad (“fix traffic in India”). Writing a solution instead of a problem (“we need an app”). No evidence for the “What”.</div>` },

      { kind: 'check', concepts: ['scoping-ethics'], n: 2 },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      // theme-topic
      { id: 'u1-04-q01', c: 'theme-topic', t: 'order', d: 1,
        q: 'Order these from the broadest to the most specific.',
        items: ['Theme: Environment', 'Topic: Waste management', 'Problem: Plastic waste piles up near the school gate after lunch'],
        ex: 'A theme is a broad area, a topic is a narrower part of it, and a problem is one specific issue you can work on.' },
      { id: 'u1-04-q02', c: 'theme-topic', t: 'mcq', d: 1,
        q: 'What is problem scoping?',
        o: ['Understanding a problem in detail and setting a clear goal', 'Building and testing an AI model on new data', 'Collecting as much data as possible from the internet', 'Launching an AI app for people to use'],
        a: 0,
        ex: 'Problem scoping is the first stage of the AI Project Cycle: understanding who, what, where and why, and setting a goal.' },
      { id: 'u1-04-q03', c: 'theme-topic', t: 'bins', d: 2,
        q: 'Sort each item into Theme, Topic or Problem.',
        bins: ['Theme', 'Topic', 'Problem'],
        items: [['Agriculture', 0], ['Health', 0], ['Water for irrigation', 1], ['Air pollution', 1], ['Farmers in our village do not know when to water their crops', 2], ['Many Class 9 students skip breakfast before school', 2]],
        ex: 'Agriculture and Health are broad themes. Irrigation water and air pollution are narrower topics. The last two describe specific people and a specific issue — problems.' },
      { id: 'u1-04-q04', c: 'theme-topic', t: 'mcq', d: 2,
        q: 'Which of these is the best-scoped problem for an AI project?',
        o: ['Class 6 students get lost finding rooms in the first week', 'Improve the whole education system across India', 'Use artificial intelligence to make all schools smarter', 'Build a brand-new mobile app for every student'],
        a: 0,
        mis: { 1: 'This is a theme-sized wish. It is far too broad to act on or check.', 3: 'This describes a solution, not a problem — and it does not say what need it meets.' },
        ex: 'It names specific people (Class 6), a specific issue (getting lost) and a time (first week), so it can be investigated and solved.' },
      { id: 'u1-04-q05', c: 'theme-topic', t: 'mcq', d: 2,
        q: 'What is a mind map used for in problem scoping?',
        o: ['Listing related problems so you can pick one', 'Testing a model on data it has never seen', 'Drawing the final chart of the results', 'Writing the code for the AI model'],
        a: 0,
        mis: { 1: 'Testing a model is Evaluation, much later in the cycle.', 2: 'Result charts belong to Data Exploration or reporting, not brainstorming.' },
        ex: 'A mind map helps you brainstorm many related problems around a topic, so you can pick one as the project goal.' },
      { id: 'u1-04-q06', c: 'theme-topic', t: 'mcq', d: 3,
        q: 'Kabir’s group is given the theme “Transport”. What is the best next step?',
        o: ['Brainstorm topics like road safety, then list problems', 'Start collecting all the traffic data available in India', 'Build a self-driving car model straight away', 'Write the problem statement before choosing any topic'],
        a: 0,
        mis: { 1: 'Collecting data before knowing the problem wastes effort — you will not know which data matters.', 2: 'Jumping to a model skips scoping and data entirely.' },
        ex: 'Theme → topic → problem. Brainstorming narrows the theme into a topic and then a specific problem before any data is collected.' },
      { id: 'u1-04-q37', c: 'theme-topic', t: 'mcq', d: 2,
        q: 'Which is a sign that a problem has been scoped too broadly?',
        o: ['It is too vague to act on, e.g. “fix traffic in India”', 'It names one specific place, e.g. the school gate', 'It names the stakeholders who are affected by it', 'It is backed by evidence from a survey of parents'],
        a: 0,
        mis: { 1: 'Naming a specific place is a sign of good scoping.', 3: 'Evidence makes a problem stronger, not broader.' },
        ex: 'A problem that is too broad has no clear people, place or measure, so you cannot gather focused data or know when it is solved.' },

      // sdg
      { id: 'u1-04-q07', c: 'sdg', t: 'num', d: 1,
        q: 'How many Sustainable Development Goals are there?',
        a: 17,
        ex: 'There are 17 SDGs, from No Poverty (Goal 1) to Partnerships for the Goals (Goal 17).' },
      { id: 'u1-04-q08', c: 'sdg', t: 'mcq', d: 1,
        q: 'Which organisation’s member countries adopted the Sustainable Development Goals?',
        o: ['The United Nations', 'The World Bank', 'The International Cricket Council', 'The Indian Space Research Organisation'],
        a: 0,
        ex: 'The SDGs were adopted by the member countries of the United Nations.' },
      { id: 'u1-04-q09', c: 'sdg', t: 'mcq', d: 1,
        q: 'In which year were the SDGs adopted?',
        o: ['2015', '2000', '2020', '2030'],
        a: 0,
        ex: 'They were adopted in 2015. 2030 is the year by which the goals are meant to be achieved.' },
      { id: 'u1-04-q10', c: 'sdg', t: 'match', d: 2,
        q: 'Match each SDG to a local problem it could cover.',
        pairs: [['Clean Water and Sanitation', 'Taps leaking water in the school toilets'], ['Quality Education', 'Students without study material in their own language'], ['Climate Action', 'Warning outdoor workers before a heatwave'], ['Good Health and Well-being', 'Elderly people missing their medicine doses']],
        ex: 'Each local problem fits the goal it most directly helps: water, learning, climate-related hazards and health.' },
      { id: 'u1-04-q11', c: 'sdg', t: 'tf', d: 2,
        q: 'The SDGs are meant to be achieved by the year 2030.',
        a: true,
        ex: 'The SDGs were adopted in 2015 as part of an agenda with 2030 as the target year.' },
      { id: 'u1-04-q12', c: 'sdg', t: 'mcq', d: 3,
        q: 'Ayaan wants an AI that warns farmers in Vidarbha about pest attacks, so fewer crops are lost and families have enough food. Which SDG fits best?',
        o: ['Zero Hunger', 'Quality Education', 'Gender Equality', 'Life Below Water'],
        a: 0,
        mis: { 1: 'The farmers learn something, but the main aim is protecting crops and food supply.', 3: 'Life Below Water is about oceans and marine life, not farm crops.' },
        ex: 'Protecting crops so families have enough food is about food security, which is the focus of Zero Hunger (Goal 2).' },

      // four-ws
      { id: 'u1-04-q13', c: 'four-ws', t: 'match', d: 1,
        q: 'Match each W of the 4Ws Problem Canvas to what it asks about.',
        pairs: [['Who', 'The stakeholders affected by the problem'], ['What', 'The problem and evidence that it exists'], ['Where', 'The context or location where it happens'], ['Why', 'The value of solving it for the stakeholders']],
        ex: 'Who = stakeholders, What = the problem plus evidence, Where = context or situation, Why = the benefit of solving it.' },
      { id: 'u1-04-q14', c: 'four-ws', t: 'mcq', d: 2,
        q: '“A survey of 120 students showed that most of them wait more than 15 minutes in the canteen queue.” Which W does this sentence answer?',
        o: ['What', 'Who', 'Where', 'Why'],
        a: 0,
        mis: { 1: 'It mentions students, but its job is to give evidence that the problem exists — that is “What”.', 2: 'The canteen is mentioned, but the sentence is mainly evidence of the problem.' },
        ex: 'Survey results are evidence that the problem (long waits) is real, which belongs under “What”.' },
      { id: 'u1-04-q15', c: 'four-ws', t: 'mcq', d: 2,
        q: '“Faster service would give students more time to eat and play during the break.” Which W does this answer?',
        o: ['Why', 'What', 'Where', 'Who'],
        a: 0,
        mis: { 1: '“What” describes the problem. This sentence describes the benefit of solving it.', 3: 'Students are mentioned, but the sentence is about the value of a solution for them.' },
        ex: 'It explains the benefit a solution would bring to the stakeholders, which is the “Why”.' },
      { id: 'u1-04-q16', c: 'four-ws', t: 'tf', d: 1,
        q: 'In the 4Ws canvas, “Where” describes the situation or location in which the problem occurs.',
        a: true,
        ex: '“Where” covers the context, situation or place where the problem happens.' },
      { id: 'u1-04-q17', c: 'four-ws', t: 'mcq', d: 3,
        q: 'Under “What”, Rohan writes: “I think people waste water.” Why is this weak?',
        o: ['It gives no evidence, such as a survey or record', 'It mentions water, which belongs under “Where”', 'It should describe the solution, not the problem', 'It should list the stakeholders affected instead'],
        a: 0,
        mis: { 2: 'The canvas describes the problem first. Solutions come later.', 3: 'Stakeholders go under “Who”. Under “What” he needs proof of the problem.' },
        ex: '“What” must show that the problem really exists. A guess needs to be backed by evidence — for example, meter readings or observations of taps left running.' },
      { id: 'u1-04-q18', c: 'four-ws', t: 'mcq', d: 2,
        q: '“During the morning rush at the crossing outside the school gate.” Which W does this answer?',
        o: ['Where', 'What', 'Who', 'Why'],
        a: 0,
        mis: { 1: 'It does not say what goes wrong — only when and where it happens.', 3: 'It gives no benefit or value — just the situation.' },
        ex: 'A time and a place describe the context of the problem, which is the “Where”.' },
      { id: 'u1-04-q19', c: 'four-ws', t: 'multi', d: 3,
        q: 'Which of these are good evidence for the “What” of a problem? Select all that apply.',
        o: ['Results of a survey of parents', 'Photos taken over a week showing overflowing bins', 'School records of late arrivals', 'A guess made by one student', 'A rumour shared in a WhatsApp group'],
        a: [0, 1, 2],
        ex: 'Surveys, photos taken over time and official records are evidence. A guess or a rumour is not reliable proof.' },

      // stakeholders
      { id: 'u1-04-q20', c: 'stakeholders', t: 'mcq', d: 1,
        q: 'Who is a stakeholder?',
        o: ['Anyone who affects or is affected by the problem', 'Only the person who writes the code for the AI', 'Only the government officials in charge of the area', 'Only people who own shares in a company'],
        a: 0,
        ex: 'Stakeholders include everyone affected by the problem and everyone who can influence the solution, not just one group.' },
      { id: 'u1-04-q21', c: 'stakeholders', t: 'multi', d: 2,
        q: 'Problem: students cross a busy road unsafely outside the school. Who are the stakeholders? Select all that apply.',
        o: ['Students', 'Parents', 'Traffic police', 'Drivers using that road', 'A film star living in another city'],
        a: [0, 1, 2, 3],
        ex: 'Students and parents are affected; traffic police and drivers can affect the situation. A film star in another city has no connection to it.' },
      { id: 'u1-04-q22', c: 'stakeholders', t: 'mcq', d: 2,
        q: 'Why should you research the current actions already being taken on a problem?',
        o: ['To avoid repeating what exists and find the gap AI could fill', 'To copy another team’s project and submit it as your own', 'To prove that the problem does not need solving at all', 'To find somebody to blame for causing the problem'],
        a: 0,
        mis: { 1: 'Copying is dishonest. Research helps you build on what exists, not take it.', 2: 'Existing actions often leave gaps — the problem may still need solving.' },
        ex: 'Knowing what is already done shows what still is not working, so your project adds real value instead of duplicating effort.' },
      { id: 'u1-04-q23', c: 'stakeholders', t: 'tf', d: 2,
        q: 'Stakeholders include only the people who directly face the problem.',
        a: false,
        ex: 'Stakeholders also include people who can affect the solution — such as officials, teachers, shopkeepers or doctors — not only those who face the problem.' },
      { id: 'u1-04-q24', c: 'stakeholders', t: 'mcq', d: 3,
        q: 'Meera’s team is scoping “long queues at a ration shop”. They find the shop already sends an SMS when stock arrives, but huge queues still form on the first day. What should the team do?',
        o: ['Focus on the first-day rush that SMS alerts do not fix', 'Drop the project because an action already exists', 'Build another SMS alert exactly like the current one', 'Ignore current actions and start a new theme'],
        a: 0,
        mis: { 1: 'An existing action does not mean the problem is solved — the queues are still there.', 2: 'Repeating what exists will not change the result.' },
        ex: 'Current actions show what is already done. The remaining gap — everyone arriving on day one — is where a new solution could help.' },
      { id: 'u1-04-q25', c: 'stakeholders', t: 'mcq', d: 2,
        q: 'Problem: fruit sellers in a mandi lose money when fruit rots before it is sold. Which of these is NOT a stakeholder?',
        o: ['A cricket coach in another state', 'The fruit sellers', 'Customers who buy the fruit', 'Farmers who supply the mandi'],
        a: 0,
        mis: { 2: 'Customers are affected — rotting fruit can mean higher prices or poorer quality for them.', 3: 'Farmers are affected if sellers buy less, and they can help with harvest timing.' },
        ex: 'Sellers, customers and farmers are all affected by or can affect the problem. A coach in another state has no link to it.' },

      // ps-template
      { id: 'u1-04-q26', c: 'ps-template', t: 'order', d: 1,
        q: 'Put the parts of the problem statement template in order.',
        items: ['Our [stakeholder(s)]', 'has/have a problem that [issue/problem/need]', 'when/while [context/situation]', 'An ideal solution would [benefit for them]'],
        ex: 'The template follows Who → What → Where → Why: stakeholders, the problem, the context, then the benefit of an ideal solution.' },
      { id: 'u1-04-q27', c: 'ps-template', t: 'mcq', d: 1,
        q: 'In the problem statement template, what goes in the blank after “Our …”?',
        o: ['The stakeholder(s)', 'The context or situation', 'The benefit of the solution', 'The source of the data'],
        a: 0,
        ex: 'The statement begins with who has the problem: “Our [stakeholder(s)] has/have a problem that…”.' },
      { id: 'u1-04-q28', c: 'ps-template', t: 'match', d: 2,
        q: 'Match each part of this problem statement to the W it comes from.',
        pairs: [['Our school bus drivers', 'Who'], ['cannot see children walking behind the bus', 'What'], ['while reversing in the school parking area', 'Where'], ['warn them before a child gets hurt', 'Why']],
        ex: 'Stakeholders come from Who, the problem from What, the situation from Where, and the benefit of the ideal solution from Why.' },
      { id: 'u1-04-q29', c: 'ps-template', t: 'mcq', d: 2,
        q: 'Which sentence correctly follows the problem statement template?',
        o: ['Our farmers have a problem that crops dry out while canal water is late. An ideal solution would say when to water.', 'We will build an AI app with soil sensors that waters every farm in the whole district automatically every night.', 'Farmers in India need more water, so an ideal solution would be to build a very large new dam close to the villages.', 'Our problem is that we want to build a chatbot for farmers that can speak in every Indian language.'],
        a: 0,
        mis: { 1: 'This describes a solution, not a problem, and names no context.', 3: 'Wanting to build something is not a problem the stakeholders have.' },
        ex: 'It has every part: stakeholders (farmers), problem (crops dry out), context (while canal water is late) and benefit (knowing when to water).' },
      { id: 'u1-04-q30', c: 'ps-template', t: 'tf', d: 2,
        q: 'The “An ideal solution would…” part describes how a solution would benefit the stakeholders.',
        a: true,
        ex: 'That final sentence comes from the “Why”: it states the value a solution would bring to the people affected.' },
      { id: 'u1-04-q31', c: 'ps-template', t: 'mcq', d: 3,
        q: 'Sana writes: “Our students have a problem that we need a mobile app.” What is the main mistake?',
        o: ['It names a solution instead of describing the problem', 'It puts the stakeholders in the wrong place', 'It is far too specific about the location', 'It mentions students, who cannot be stakeholders'],
        a: 0,
        mis: { 1: 'The stakeholders (students) are in the right place.', 3: 'Students are very often stakeholders in school problems.' },
        ex: 'An app is a possible solution. The statement must say what goes wrong for the students and when, before any solution is chosen.' },

      // scoping-ethics
      { id: 'u1-04-q32', c: 'scoping-ethics', t: 'tf', d: 1,
        q: 'Problem scoping is iterative: you may refine the problem as you learn more.',
        a: true,
        ex: 'New evidence, new stakeholders or new information about current actions can all lead you to improve your problem statement.' },
      { id: 'u1-04-q33', c: 'scoping-ethics', t: 'mcq', d: 2,
        q: 'A team plans to put cameras in classrooms to record which students talk during lessons. Which ethical concern matters most?',
        o: ['Students’ privacy — being filmed without consent', 'The cost of buying cameras for every classroom', 'The colour and design of the camera casing', 'The speed of the school’s Wi-Fi connection'],
        a: 0,
        mis: { 1: 'Cost is a practical issue, not an ethical one.', 3: 'Wi-Fi speed is technical. The ethical question is about filming children.' },
        ex: 'Filming children and tracking their behaviour collects personal data. Privacy and consent must be considered before such a goal is chosen.' },
      { id: 'u1-04-q34', c: 'scoping-ethics', t: 'multi', d: 2,
        q: 'Which questions help you check the ethics of a project goal? Select all that apply.',
        o: ['Will we collect personal data, and have people agreed?', 'Could some groups be left out or treated unfairly?', 'What happens if the AI makes a wrong decision?', 'Which font should the app use?', 'How many likes will the project get online?'],
        a: [0, 1, 2],
        ex: 'Privacy, fairness and safety are ethical questions. Fonts and likes have nothing to do with whether the goal could harm people.' },
      { id: 'u1-04-q35', c: 'scoping-ethics', t: 'mcq', d: 3,
        q: 'After a survey, Arjun’s team learns that students skip breakfast not because they forget, but because the school bus leaves too early. What should they do?',
        o: ['Go back and rewrite the “What” and the problem statement', 'Keep the original statement because it was written first', 'Stop the project because the survey disagreed with them', 'Ignore the survey and build a reminder app anyway'],
        a: 0,
        mis: { 1: 'Scoping is iterative — a statement should change when the evidence shows something new.', 3: 'A reminder app would not fix an early bus. Ignoring evidence leads to the wrong solution.' },
        ex: 'New evidence changed the understanding of the problem. Revisiting scoping keeps the project aimed at the real cause.' },
      { id: 'u1-04-q36', c: 'scoping-ethics', t: 'mcq', d: 3,
        q: 'A project plans to send health tips only through a smartphone app to women in a village where many families share one basic phone. Which ethical issue should the team think about?',
        o: ['Fairness and access — many women may be left out', 'Copyright — the tips might belong to someone else', 'Speed — the app might load slowly', 'Battery — the app might drain the phone'],
        a: 0,
        mis: { 1: 'Copyright matters in general, but the bigger issue here is who can actually receive the tips.', 2: 'Speed is a technical detail. Many women cannot use the app at all.' },
        ex: 'If people cannot access the solution, it is unfair to them. The team might add SMS, voice calls or health-worker visits.' }
    ]
  },
  // ───────────────────────── u1-05 Data Acquisition and System Maps ─────────────────────────
  {
    id: 'u1-05',
    title: 'Data Acquisition and System Maps',
    minutes: 100,
    outcomes: [
      'Identify data requirements and find reliable sources to obtain relevant data',
      'Foresee the kind of data required and the kind of analysis to be done',
      'Identify the data features affecting a problem and create system maps considering those features'
    ],
    hook: 'An AI is only as good as the data it learns from — find out what to collect, where to get it, and how to map the system behind a problem.',
    concepts: {
      'data-basics': 'Data, training data and testing data',
      'features': 'Data features',
      'sources': 'Sources of data',
      'data-quality': 'Reliable, relevant and enough data',
      'system-map': 'System maps and + / − links',
      'data-analysis': 'Planning data and analysis'
    },
    steps: [
      { kind: 'card', title: 'No data, no AI', html: `
<p>You have scoped a problem. Now the AI needs something to learn from.</p>
<div class="def"><dfn>Data Acquisition</dfn> The second stage of the AI Project Cycle: collecting accurate, reliable and relevant data for the problem.</div>
<p><b>Data</b> is any collection of facts, numbers, words, measurements, images or sounds that can be used to learn something. Rainfall readings, exam marks, photos of leaves and recordings of voice commands are all data.</p>
<div class="key"><b>Key idea</b> If the data is poor, the predictions will be poor — however clever the model is.</div>` },

      { kind: 'card', title: 'Training data and testing data', html: `
<p>Think about preparing for an exam.</p>
<div class="cols">
<div class="mini"><h4>📘 Training data</h4><p>Like practice questions with answers. The model learns patterns from these examples.</p></div>
<div class="mini"><h4>📝 Testing data</h4><p>Like the real exam paper with new questions. It checks whether the model works on examples it has never seen.</p></div>
</div>
<div class="eg"><b>Example</b> From 1,000 labelled leaf photos, a team might use most of them to train the model and keep the rest aside, unseen, to test it.</div>
<div class="warn"><b>Careful</b> Never test on the same data you trained on. A student who memorised the practice answers may still fail a new paper — and a model can do the same.</div>` },

      { kind: 'card', title: 'Data features', html: `
<p>You want to predict the wheat harvest of a farm in Punjab. What could affect it?</p>
<div class="cols">
<div class="mini"><h4>🌧️ Weather</h4><p>Rainfall, temperature</p></div>
<div class="mini"><h4>🌱 Field</h4><p>Soil type, seed variety</p></div>
<div class="mini"><h4>🚜 Care</h4><p>Fertiliser used, irrigation water</p></div>
</div>
<div class="def"><dfn>Data features</dfn> The attributes (variables) that describe the data and affect the problem. Each feature usually becomes one column in your data table.</div>
<div class="warn"><b>Careful</b> Choose features that really affect the outcome. The farmer’s favourite colour is data, but it is useless for predicting the harvest.</div>` },

      { kind: 'check', concepts: ['data-basics', 'features'], n: 3 },

      { kind: 'card', title: 'Where can data come from?', html: `
<table class="tbl">
<thead><tr><th>Source</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Surveys</td><td>An online form asking 300 students how they travel to school</td></tr>
<tr><td>Interviews</td><td>Talking to canteen staff about their busiest hours</td></tr>
<tr><td>Observation</td><td>Counting vehicles at a crossing every morning for a week</td></tr>
<tr><td>Sensors</td><td>A soil-moisture sensor in a field</td></tr>
<tr><td>Cameras</td><td>Photos of leaves; video of a road</td></tr>
<tr><td>Web scraping</td><td>A program that collects prices from many shopping websites</td></tr>
<tr><td>APIs</td><td>A weather app asking a weather service for live data</td></tr>
<tr><td>Documents and records</td><td>Attendance registers; government open data such as data.gov.in</td></tr>
</tbody>
</table>
<div class="def"><dfn>API (Application Programming Interface)</dfn> A way for one program to request data or services from another program in an agreed format.</div>` },

      { kind: 'card', title: 'Reliable, authentic, relevant', html: `
<div class="cols">
<div class="mini"><h4>✅ Reliable and authentic</h4><p>Comes from a trustworthy source and is accurate, not made up. Good sources: government open-data portals such as data.gov.in, research institutes, official records.</p></div>
<div class="mini"><h4>🎯 Relevant</h4><p>About your actual problem, place and time. Delhi traffic data will not help you predict traffic in Shillong.</p></div>
<div class="mini"><h4>⚠️ Avoid</h4><p>Forwarded social-media messages, guessed numbers, and data copied without permission.</p></div>
</div>
<div class="key"><b>Key idea</b> Collect data ethically too: ask permission, respect privacy and collect only what you need.</div>` },

      { kind: 'card', title: 'How often? How much?', html: `
<p><b>How often should you collect?</b> It depends on how fast the thing changes:</p>
<ul>
<li>Air quality changes hour by hour → collect often.</li>
<li>Crop yield changes once a season → collect each season.</li>
</ul>
<p><b>What if there isn’t enough data?</b> The model sees too few examples, so it learns weak or wrong patterns and makes unreliable predictions — especially for cases it rarely saw.</p>
<p><b>Fixes:</b> collect for longer, add more sources (such as open data), ask more people, or narrow the problem.</p>
<div class="eg"><b>Example</b> A traffic AI that has seen only a handful of rainy days cannot reliably predict traffic in the monsoon.</div>` },

      { kind: 'check', concepts: ['sources', 'data-quality'], n: 3 },

      { kind: 'card', title: 'System maps: seeing the whole picture', html: `
<p>Problems rarely have just one cause. A <b>system map</b> helps you see how the parts connect.</p>
<div class="def"><dfn>System map</dfn> A diagram that shows the elements of a system and the relationships between them. Arrows show the direction of the effect.</div>
<div class="cols">
<div class="mini"><h4>➕ Plus sign</h4><p><b>Direct relationship:</b> both change in the same direction. More vehicles → more air pollution; fewer vehicles → less pollution.</p></div>
<div class="mini"><h4>➖ Minus sign</h4><p><b>Inverse relationship:</b> one increases while the other decreases. More trees → less air pollution.</p></div>
</div>` },

      { kind: 'card', title: 'Loops in a system map', html: `
<p>Follow the arrows and sometimes you end up back where you started. That is a <b>loop</b>.</p>
<ol class="flow">
<li><b>Cars on the road → Traffic jams (+)</b><span>More cars, more jams.</span></li>
<li><b>Traffic jams → People taking the metro (+)</b><span>More jams push more people to the metro.</span></li>
<li><b>People taking the metro → Cars on the road (−)</b><span>More metro riders, fewer cars.</span></li>
</ol>
<p>Here the loop pushes back: a rise in cars eventually leads to fewer cars.</p>
<div class="key"><b>Key idea</b> System maps help you choose data features — every element on the map is something you might measure.</div>` },

      { kind: 'lab', lab: 'system-map', title: 'System Map Builder', intro: 'Set each arrow on an air-pollution map to + (same direction) or − (opposite direction). Then build a second map by choosing which links really exist and giving each one a sign. Get both maps right to finish.' },

      { kind: 'check', concepts: ['system-map'], n: 3 },

      { kind: 'card', title: 'Plan your data and analysis', html: `
<p>Before collecting anything, answer the CBSE <b>Data and Analysis</b> questions. Example: water wasted at school taps.</p>
<table class="tbl">
<thead><tr><th>Question</th><th>Example answer</th></tr></thead>
<tbody>
<tr><td>What data features are needed?</td><td>Tap location, time of day, litres used</td></tr>
<tr><td>How will the features affect the problem?</td><td>Taps near the playground may run longer after games</td></tr>
<tr><td>Where can you get the data?</td><td>Water-meter readings, observation, a survey</td></tr>
<tr><td>How often must you collect it?</td><td>Daily for a month, at fixed times</td></tr>
<tr><td>What if there isn’t enough data?</td><td>Collect for longer or cover more taps</td></tr>
<tr><td>What analysis is needed?</td><td>Compare litres per tap and per hour using charts</td></tr>
<tr><td>How will it be validated?</td><td>Check findings against new meter readings</td></tr>
<tr><td>How does the analysis inform action?</td><td>Fix the worst taps first; put reminders there</td></tr>
</tbody>
</table>` },

      { kind: 'check', concepts: ['data-analysis'], n: 2 },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      // data-basics
      { id: 'u1-05-q01', c: 'data-basics', t: 'mcq', d: 1,
        q: 'What is Data Acquisition?',
        o: ['Collecting reliable and relevant data for the problem', 'Drawing graphs to find patterns in the collected data', 'Putting a finished model into real use for people', 'Writing the problem statement for the project'],
        a: 0,
        ex: 'Data Acquisition is the second stage of the AI Project Cycle: gathering the data the AI will learn from.' },
      { id: 'u1-05-q02', c: 'data-basics', t: 'match', d: 1,
        q: 'Match each term to its meaning.',
        pairs: [['Training data', 'Examples the model learns patterns from'], ['Testing data', 'New examples used to check the model'], ['Data features', 'Attributes that describe the data and affect the problem']],
        ex: 'Training data teaches the model, testing data checks it on unseen examples, and features are the attributes recorded for each example.' },
      { id: 'u1-05-q03', c: 'data-basics', t: 'tf', d: 2,
        q: 'A model should be tested on the same examples it was trained on, to get a fair score.',
        a: false,
        ex: 'Testing on the training examples only shows whether the model memorised them. A fair test uses unseen data.' },
      { id: 'u1-05-q04', c: 'data-basics', t: 'mcq', d: 2,
        q: 'Why must testing data be kept separate from training data?',
        o: ['To check the model on examples it has never seen', 'To make the training process finish faster', 'To save storage space on the computer', 'So that the model can memorise the test answers'],
        a: 0,
        mis: { 1: 'Speed is not the reason. Separate testing data gives an honest check.', 3: 'That is exactly what we want to avoid — a model that memorises cannot be trusted on new data.' },
        ex: 'In real use the model meets new cases. Unseen testing data is the only honest way to check it can handle them.' },
      { id: 'u1-05-q05', c: 'data-basics', t: 'mcq', d: 3,
        q: 'Riya has 500 labelled photos of ripe and unripe tomatoes. A friend suggests training on all 500 and then testing on the same 500. What is the problem?',
        o: ['The test would not show how it handles new tomatoes', '500 photos are far too many to train any model', 'Tomato photos cannot be used for Computer Vision', 'Training must always use fewer than 50 photos'],
        a: 0,
        mis: { 1: 'More examples usually help. The issue is testing on photos the model has already seen.', 2: 'Tomato photos are fine for CV. The issue is how the test is set up.' },
        ex: 'She should keep some photos aside as testing data. Testing on the training photos would make the model look better than it really is.' },
      { id: 'u1-05-q06', c: 'data-basics', t: 'mcq', d: 2,
        q: 'Which is the best comparison for training data and testing data?',
        o: ['Practice questions with answers, then a new exam paper', 'Reading a book, then reading the same book again', 'Watching a match live, then watching the replay', 'A recipe card, then a shopping list'],
        a: 0,
        mis: { 1: 'Reading the same book again is like testing on training data — nothing new is checked.', 2: 'A replay is the same match. Testing needs new examples.' },
        ex: 'You learn from practice questions (training) and prove what you learned on a new paper (testing).' },

      // features
      { id: 'u1-05-q07', c: 'features', t: 'mcq', d: 1,
        q: 'What are data features?',
        o: ['Attributes of the data that affect the problem', 'The colours and styles used in a chart of the data', 'The final predictions made by the trained model', 'The people who collect and record the data'],
        a: 0,
        ex: 'Features are the attributes recorded for each example — like rainfall or soil type — that may affect the outcome.' },
      { id: 'u1-05-q08', c: 'features', t: 'multi', d: 2,
        q: 'Which are useful features for predicting attendance at a village school on a given day? Select all that apply.',
        o: ['Whether it is raining', 'Whether it is harvest season', 'How far students travel to school', 'The colour of the school gate', 'The headteacher’s favourite song'],
        a: [0, 1, 2],
        ex: 'Rain, harvest work and travel distance can all change whether students come to school. The gate colour and a favourite song have no effect.' },
      { id: 'u1-05-q09', c: 'features', t: 'mcq', d: 2,
        q: 'For predicting the price of a second-hand scooter, which feature is least useful?',
        o: ['The owner’s birthday', 'Kilometres driven', 'Age of the scooter', 'Engine condition'],
        a: 0,
        mis: { 1: 'Kilometres driven tells you about wear, which affects price.', 3: 'A scooter with a poor engine sells for less, so this feature matters.' },
        ex: 'Distance driven, age and condition all affect a scooter’s value. The owner’s birthday does not.' },
      { id: 'u1-05-q10', c: 'features', t: 'mcq', d: 3,
        q: 'A hospital in Lucknow wants to predict how many patients will come to its emergency ward each night. Which set of features is most sensible?',
        o: ['Day of week, festival days, weather, past night counts', 'Doctors’ favourite foods, wall colours, chair brands', 'Number of windows, building height, car colours', 'The hospital logo, website font, phone ringtone'],
        a: 0,
        mis: { 1: 'These describe the staff and furniture, not what brings patients in.', 2: 'The building’s shape does not change how many patients arrive.' },
        ex: 'Patient numbers can change with the day, festivals and weather, and past counts show the usual pattern. These features actually affect the problem.' },
      { id: 'u1-05-q11', c: 'features', t: 'tf', d: 1,
        q: 'Each data feature usually becomes a column in a data table.',
        a: true,
        ex: 'In a table, each row is one example and each column is one feature, such as rainfall or soil type.' },
      { id: 'u1-05-q12', c: 'features', t: 'mcq', d: 3,
        q: 'Arjun is predicting mango yields. His data shows that orchards with more flowering in February gave more mangoes later. What does this tell him about the feature “flowering in February”?',
        o: ['It is a useful feature that affects the yield', 'It is useless because it is measured in February', 'It should be dropped because flowers are not fruit', 'It belongs in testing data, not in training data'],
        a: 0,
        mis: { 1: 'Early information is valuable — it lets you predict before the harvest.', 2: 'A feature does not have to be the outcome itself; it only needs to affect it.' },
        ex: 'A feature that changes along with the outcome helps the model predict it. That answers the syllabus question “How will the features collected affect the problem?”' },

      // sources
      { id: 'u1-05-q13', c: 'sources', t: 'match', d: 1,
        q: 'Match each data source to an example.',
        pairs: [['Survey', 'An online form asking students how they travel'], ['Sensor', 'A soil-moisture probe in a field'], ['API', 'A weather app requesting live data from a weather service'], ['Web scraping', 'A program collecting prices from many websites'], ['Camera', 'Photos of crop leaves for disease detection']],
        ex: 'Surveys ask people, sensors measure things, APIs let one program request data from another, scraping collects from websites, and cameras capture images.' },
      { id: 'u1-05-q14', c: 'sources', t: 'mcq', d: 1,
        q: 'What does API stand for?',
        o: ['Application Programming Interface', 'Automatic Program Installer', 'Advanced Prediction Intelligence', 'Applied Pattern Identifier'],
        a: 0,
        ex: 'API stands for Application Programming Interface — a way for programs to request data or services from each other.' },
      { id: 'u1-05-q15', c: 'sources', t: 'mcq', d: 2,
        q: 'Kabir wants to know how students in his school feel about the canteen menu. Which source is best?',
        o: ['A survey of students', 'A temperature sensor in the canteen', 'Web scraping of restaurant websites', 'An API that gives share prices'],
        a: 0,
        mis: { 1: 'A sensor measures temperature, not opinions.', 2: 'Restaurant websites tell you nothing about your school’s students.' },
        ex: 'Opinions come from people, so asking students directly through a survey gives the most relevant data.' },
      { id: 'u1-05-q16', c: 'sources', t: 'multi', d: 2,
        q: 'Which are genuine sources of data for an AI project? Select all that apply.',
        o: ['Sensors', 'Cameras', 'Surveys', 'Numbers made up by the team', 'APIs'],
        a: [0, 1, 2, 4],
        ex: 'Sensors, cameras, surveys and APIs collect real data. Made-up numbers are not data — they would teach the AI false patterns.' },
      { id: 'u1-05-q17', c: 'sources', t: 'mcq', d: 3,
        q: 'A team in Jaipur builds an app showing live air quality. Instead of placing their own sensors, the app asks an official air-quality service for the latest readings every hour. Which source is this?',
        o: ['An API', 'A survey', 'An interview', 'Observation'],
        a: 0,
        mis: { 1: 'A survey asks people questions. Here one program asks another for data.', 3: 'Observation means watching and recording yourself. The app is requesting data from another service.' },
        ex: 'When one program automatically requests data from another service in an agreed format, it is using an API.' },
      { id: 'u1-05-q18', c: 'sources', t: 'tf', d: 2,
        q: 'Government open-data portals such as data.gov.in can be a reliable source of data for projects.',
        a: true,
        ex: 'Official open-data portals publish data collected by government departments, which makes them an authentic source.' },
      { id: 'u1-05-q19', c: 'sources', t: 'mcq', d: 2,
        q: 'Meera stands at a crossing for an hour each morning and counts the vehicles that pass. Which method is she using?',
        o: ['Observation', 'Web scraping', 'An API', 'An interview'],
        a: 0,
        mis: { 1: 'Web scraping collects data from websites, not from the street.', 3: 'She is not asking anyone questions — she is watching and counting.' },
        ex: 'Watching and recording what happens is observation.' },

      // data-quality
      { id: 'u1-05-q20', c: 'data-quality', t: 'mcq', d: 1,
        q: 'What does <b>relevant</b> data mean?',
        o: ['Data about your actual problem, place and time', 'Data that is the newest on the whole internet', 'Data that has the largest possible number of rows', 'Data that is shown in colourful charts'],
        a: 0,
        ex: 'Relevant data matches the problem you are solving. New, big or colourful data is useless if it is about something else.' },
      { id: 'u1-05-q21', c: 'data-quality', t: 'mcq', d: 2,
        q: 'Which source is most reliable for rainfall figures in Kerala?',
        o: ['Official weather department records', 'A forwarded WhatsApp message from a friend', 'A guess from a classmate who lives there', 'A comment under a video'],
        a: 0,
        mis: { 1: 'Forwards often have no source and can be wrong or old.', 3: 'Comments are opinions, not measured data.' },
        ex: 'Official records come from measured readings by a responsible authority, so they are authentic and reliable.' },
      { id: 'u1-05-q22', c: 'data-quality', t: 'tf', d: 2,
        q: 'If an AI has too little data, it may learn weak or wrong patterns and make unreliable predictions.',
        a: true,
        ex: 'With few examples, the model cannot see the real pattern clearly, so its predictions on new cases are unreliable.' },
      { id: 'u1-05-q23', c: 'data-quality', t: 'mcq', d: 3,
        q: 'A team trains a traffic AI for Shillong using only Delhi traffic data. What is the main problem?',
        o: ['The data is not relevant to Shillong’s roads', 'The data is too reliable to be useful for AI', 'Delhi traffic data is always kept secret', 'Traffic data can never be used to train AI'],
        a: 0,
        mis: { 1: 'Reliability is good. The issue is that the data describes a different city.', 3: 'Traffic data is widely used for AI — it just has to be from the right place.' },
        ex: 'Shillong’s hilly roads, size and traffic patterns are very different from Delhi’s. Data must be relevant to where the AI will be used.' },
      { id: 'u1-05-q24', c: 'data-quality', t: 'mcq', d: 2,
        q: 'How often should data be collected for an AI that predicts air quality in a city?',
        o: ['Often, e.g. every hour, as it changes quickly', 'Once a year, because air quality hardly changes', 'Only once, right at the start of the project', 'Only on public holidays, when traffic is low'],
        a: 0,
        mis: { 1: 'Air quality can change a lot within a single day.', 2: 'One reading cannot show how air quality changes.' },
        ex: 'How often you collect depends on how fast the thing changes. Air quality changes within hours, so frequent readings are needed.' },
      { id: 'u1-05-q25', c: 'data-quality', t: 'mcq', d: 3,
        q: 'Ayaan’s crop-disease model was trained on 1,000 photos of healthy leaves but only 12 photos of diseased leaves. What is the most likely result, and the best fix?',
        o: ['It may miss diseases; collect many more diseased-leaf photos', 'It will be perfect; diseased leaves are easy to spot', 'It will be slow; delete some healthy photos at random', 'It will see disease everywhere; collect fewer photos overall'],
        a: 0,
        mis: { 1: 'With only 12 examples, the model has hardly seen what disease looks like.', 3: 'With so few diseased examples, it is more likely to call leaves healthy, not diseased.' },
        ex: 'Too few diseased examples means the model learns little about disease and may miss it. More diseased-leaf data fixes the gap.' },
      { id: 'u1-05-q26', c: 'data-quality', t: 'multi', d: 3,
        q: 'A school team needs students’ health data for a project. Which steps are ethical? Select all that apply.',
        o: ['Asking students and parents for permission', 'Collecting only the data the project needs', 'Keeping students’ names private', 'Copying data from the school nurse’s files without asking', 'Posting each student’s results on the notice board'],
        a: [0, 1, 2],
        ex: 'Consent, collecting only what is needed and protecting identities are ethical practices. Taking data without permission or making it public breaks privacy.' },

      // system-map
      { id: 'u1-05-q27', c: 'system-map', t: 'mcq', d: 1,
        q: 'What does a system map show?',
        o: ['Elements of a system and how they affect each other', 'The street map of a city with all its main roads', 'The parts inside a computer’s cabinet', 'The order of stages in the AI Project Cycle'],
        a: 0,
        ex: 'A system map shows the elements of a system, with arrows and + or − signs for how they affect each other.' },
      { id: 'u1-05-q28', c: 'system-map', t: 'mcq', d: 2,
        q: 'On a system map, an arrow from “Vehicles on the road” to “Air pollution” has a + sign. What does this mean?',
        o: ['As vehicles increase, air pollution increases too', 'As vehicles increase, air pollution decreases', 'Vehicles and air pollution are not connected', 'Air pollution causes more vehicles to be made'],
        a: 0,
        mis: { 1: 'That would be a − sign (inverse relationship).', 3: 'The arrow points from vehicles to pollution, so vehicles are the cause here.' },
        ex: 'A + sign means a direct relationship: both change in the same direction. More vehicles, more pollution.' },
      { id: 'u1-05-q29', c: 'system-map', t: 'mcq', d: 2,
        q: 'Which link should be marked with a − (inverse) sign?',
        o: ['Trees planted → air pollution', 'Factories → smoke', 'Rainfall → water in reservoirs', 'Study time → exam marks'],
        a: 0,
        mis: { 1: 'More factories usually means more smoke — same direction, so +.', 2: 'More rain fills reservoirs more — same direction, so +.' },
        ex: 'Planting more trees tends to reduce air pollution: one goes up while the other goes down, which is an inverse (−) link.' },
      { id: 'u1-05-q30', c: 'system-map', t: 'bins', d: 2,
        q: 'Sort each link by the sign it should have on a system map.',
        bins: ['+ (same direction)', '− (opposite direction)'],
        items: [['Hours of rain → water in a lake', 0], ['Number of vehicles → traffic jams', 0], ['Price of tomatoes → tomatoes bought', 1], ['Hours of practice → mistakes in a song', 1], ['Mosquito breeding spots → dengue cases', 0], ['Working street lights → road accidents at night', 1]],
        ex: 'Rain/water, vehicles/jams and mosquito spots/dengue rise together (+). Higher prices mean fewer bought, more practice means fewer mistakes, and more working lights mean fewer night accidents (−).' },
      { id: 'u1-05-q31', c: 'system-map', t: 'tf', d: 1,
        q: 'On a system map, a − sign means one element increases while the other decreases.',
        a: true,
        ex: 'A − sign shows an inverse relationship: the two elements move in opposite directions.' },
      { id: 'u1-05-q32', c: 'system-map', t: 'mcq', d: 3,
        q: 'A loop reads: Cars on the road →(+) Traffic jams →(+) People taking the metro →(−) Cars on the road. If cars on the road increase, what does the loop eventually do?',
        o: ['It pushes the number of cars back down', 'It makes the number of cars rise for ever', 'It has no effect on the number of cars', 'It makes the metro close down'],
        a: 0,
        mis: { 1: 'Follow the last arrow: more metro riders means fewer cars (−), so the rise does not continue for ever.', 2: 'The arrows lead back to cars, so the loop does affect them.' },
        ex: 'More cars → more jams → more metro riders → fewer cars. The − link turns the rise back down.' },
      { id: 'u1-05-q33', c: 'system-map', t: 'multi', d: 3,
        q: 'You are drawing a system map of water scarcity in a city. Which links should have a + sign? Select all that apply.',
        o: ['Rainfall → water in reservoirs', 'Population of the city → water demand', 'Water demand → water scarcity', 'Fixing leaking pipes → water wasted', 'Water in reservoirs → water scarcity'],
        a: [0, 1, 2],
        ex: 'More rain, more stored water; more people, more demand; more demand, more scarcity — all same direction (+). Fixing leaks reduces waste, and fuller reservoirs reduce scarcity — both inverse (−).' },

      // data-analysis
      { id: 'u1-05-q34', c: 'data-analysis', t: 'match', d: 2,
        q: 'A team wants to reduce late returns of library books. Match each planning question to their answer.',
        pairs: [['What data features are needed?', 'Borrow date, return date, class, book type'], ['Where can you get the data?', 'The library’s issue register'], ['How will it be validated?', 'Check predictions against next month’s returns'], ['How does the analysis inform the action?', 'Send reminders to the classes with most late returns']],
        ex: 'Features are what you record, the register is the source, comparing with new returns validates the analysis, and reminders are the action it leads to.' },
      { id: 'u1-05-q35', c: 'data-analysis', t: 'mcq', d: 2,
        q: 'Which planning question is about <b>validation</b>?',
        o: ['How will we check our results are correct?', 'Where can we get the data from?', 'Which features affect the problem?', 'How often should we collect the data?'],
        a: 0,
        mis: { 1: 'That question is about data sources.', 2: 'That question is about choosing features.' },
        ex: 'Validation means checking that the analysis or predictions are correct, for example by comparing them with new real data.' },
      { id: 'u1-05-q36', c: 'data-analysis', t: 'mcq', d: 3,
        q: 'Diya’s team finds that most canteen food waste happens on Fridays, when rice is served, so they decide to cook less rice on Fridays. Which planning question does this decision answer?',
        o: ['How does the analysis inform the action?', 'What data features are needed?', 'Where can you get the data?', 'How often must the data be collected?'],
        a: 0,
        mis: { 1: 'Features were chosen earlier. Here the team is using the result to decide what to do.', 3: 'This is not about how often to collect — it is about acting on what they found.' },
        ex: 'They turned a finding (Friday rice waste) into a decision (cook less rice). That is how analysis informs action.' },
      { id: 'u1-05-q37', c: 'data-analysis', t: 'tf', d: 1,
        q: 'You should decide how often you need to collect data before you start collecting it.',
        a: true,
        ex: 'Planning the collection frequency in advance makes sure you capture how the thing changes — hourly, daily or seasonally.' },
      { id: 'u1-05-q38', c: 'data-analysis', t: 'mcq', d: 3,
        q: 'A team wants to predict which weeks a village health centre will run short of fever medicine, but it has only two months of records. What is the best answer to “What happens if you don’t have enough data?”',
        o: ['Combine with district health records and keep collecting for longer', 'Make up numbers for the missing months so the table looks full', 'Use medicine data from a hospital in another country', 'Stop the project as soon as any data is missing'],
        a: 0,
        mis: { 1: 'Made-up data teaches the model false patterns.', 2: 'Data from another country is unlikely to be relevant to this village.' },
        ex: 'Too little data gives unreliable predictions. Adding relevant reliable sources and collecting for longer gives the model more real examples.' }
    ]
  },
  // ───────────────────────── u1-06 Data Exploration and Visualisation ─────────────────────────
  {
    id: 'u1-06',
    title: 'Data Exploration and Visualisation',
    minutes: 90,
    outcomes: [
      'Understand the purpose of data visualisation in the Data Exploration stage',
      'Use various types of graphs to visualise acquired data and choose a suitable graph for each purpose',
      'Identify data features for a Top 10 Song Prediction and present collected data graphically using a spreadsheet'
    ],
    hook: 'A thousand numbers tell you nothing at a glance — the right chart makes the pattern jump out in two seconds.',
    concepts: {
      'why-viz': 'Why we visualise data',
      'bar-line-pie': 'Bar, line and pie charts',
      'scatter-hist': 'Scatter plots and histograms',
      'dataviz-cat': 'More charts and the Data Viz Catalogue',
      'song-features': 'Top 10 Song Prediction',
      'spreadsheets': 'Making clear charts in spreadsheets'
    },
    steps: [
      { kind: 'card', title: 'Rows of numbers, or one picture?', html: `
<p>Imagine ten years of Mumbai’s monthly rainfall: 120 numbers in a table. Can you spot the monsoon? Not easily.</p>
<p>Now draw the same numbers as a line chart. A huge peak appears every June to September. You see it in a second.</p>
<div class="def"><dfn>Data Exploration</dfn> The third stage of the AI Project Cycle: arranging, cleaning and visualising the collected data to understand it and find patterns.</div>
<div class="key"><b>Key idea</b> Data visualisation means showing data as charts and graphs so that patterns are easy to see.</div>` },

      { kind: 'card', title: 'Why visualise?', html: `
<p>A good chart helps you spot four things quickly:</p>
<div class="cols">
<div class="mini"><h4>📈 Trends</h4><p>Is something going up, down or staying level over time?</p></div>
<div class="mini"><h4>🔁 Patterns</h4><p>Repeating behaviour, like sweet-shop sales rising every Diwali.</p></div>
<div class="mini"><h4>🔗 Relationships</h4><p>Do two things change together, like study hours and marks?</p></div>
<div class="mini"><h4>⚠️ Outliers</h4><p>Unusual values, like a temperature of 450 °C typed by mistake.</p></div>
</div>
<p>Visualising also helps the team <b>decide which model to try</b>, and <b>communicate</b> findings to people who will never read a giant table.</p>` },

      { kind: 'card', title: 'Bar charts and line charts', html: `
<div class="cols">
<div class="mini"><h4>📊 Bar chart</h4><p><b>Compare categories.</b> Example: how many students joined each club — robotics, music, sports, art.</p></div>
<div class="mini"><h4>📈 Line chart</h4><p><b>Show change over time.</b> Example: the daily maximum temperature in Nagpur through May.</p></div>
</div>
<div class="warn"><b>Careful</b> Don’t use a line chart for unrelated categories. A line joining “robotics” to “music” suggests a change over time that does not exist.</div>
<div class="key"><b>Quick test</b> Is the horizontal axis time (days, months, years)? A line chart is usually best. Is it separate categories? Use bars.</div>` },

      { kind: 'card', title: 'Pie charts: parts of a whole', html: `
<p>A pie chart shows how one whole is split into parts. All the slices together make 100%.</p>
<div class="eg"><b>Example</b> How a family’s monthly budget is split between food, rent, travel, school fees and savings.</div>
<div class="warn"><b>Careful</b> Use a pie only when the parts add up to one whole and there are just a few slices. Twelve thin slices are hard to compare — a bar chart is clearer. Never use a pie to show change over time.</div>
<div class="key"><b>Key idea</b> Bar → compare. Line → over time. Pie → parts of a whole.</div>` },

      { kind: 'check', concepts: ['why-viz', 'bar-line-pie'], n: 3 },

      { kind: 'card', title: 'Scatter plots and histograms', html: `
<div class="cols">
<div class="mini"><h4>⚬ Scatter plot</h4><p><b>Relationship between two numeric variables.</b> Each dot is one item. Example: hours of sleep against test marks for 40 students.</p></div>
<div class="mini"><h4>▥ Histogram</h4><p><b>Distribution of one numeric variable</b> — how many values fall in each range. Example: Class 9 heights in groups of 140–145 cm, 145–150 cm, and so on.</p></div>
</div>
<div class="warn"><b>Careful</b> A histogram looks like a bar chart, but each bar is a <b>range of numbers</b> and the bars touch. A bar chart compares <b>separate categories</b>, with gaps between the bars.</div>` },

      { kind: 'card', title: 'More charts: the Data Viz Catalogue', html: `
<p>There are many more ways to show data. The <b>Data Viz Catalogue</b> (datavizcatalogue.com) is a free website that describes dozens of chart types, what each is good for, and lets you search by what you want to show — comparisons, proportions, relationships and more.</p>
<div class="cols">
<div class="mini"><h4>Area chart</h4><p>A line chart with the space below it filled in.</p></div>
<div class="mini"><h4>Bubble chart</h4><p>A scatter plot where bubble size shows a third value.</p></div>
<div class="mini"><h4>Heat map</h4><p>A grid where colour shows the value, e.g. busy hours at a metro station across a week.</p></div>
<div class="mini"><h4>Flow chart</h4><p>Boxes and arrows that show the steps of a process.</p></div>
</div>` },

      { kind: 'lab', lab: 'chart-chooser', title: 'Chart Chooser', intro: 'For six small datasets, pick a bar, line, pie, scatter or histogram and see your chart drawn instantly, with feedback on whether it answers the question. Switch charts until it does — get at least 5 of the 6 right.' },

      { kind: 'check', concepts: ['scatter-hist', 'dataviz-cat'], n: 3 },

      { kind: 'card', title: 'Project: Top 10 Song Prediction', html: `
<p>Can you predict which songs will be in next week’s Top 10? First decide the <b>data features</b> that might affect a song’s rank.</p>
<table class="tbl">
<thead><tr><th>Feature</th><th>Why it might matter</th></tr></thead>
<tbody>
<tr><td>Streams</td><td>How many times the song was played</td></tr>
<tr><td>Likes</td><td>How much listeners enjoyed it</td></tr>
<tr><td>Shares</td><td>Whether people are spreading it to friends</td></tr>
<tr><td>Artist popularity</td><td>Fans of popular artists listen to new songs quickly</td></tr>
<tr><td>Release recency</td><td>New songs often climb fast; older ones slowly drop</td></tr>
</tbody>
</table>
<div class="key"><b>Key idea</b> Next week’s rank is the <b>output</b> you want to predict. The features are the <b>inputs</b>.</div>` },

      { kind: 'card', title: 'Turning song data into charts', html: `
<p>Collect a week of data for about 15 songs (a class survey of favourite songs works too). Then ask questions — and pick the chart that answers each one.</p>
<table class="tbl">
<thead><tr><th>Question</th><th>Best chart</th></tr></thead>
<tbody>
<tr><td>Which song has the most streams this week?</td><td>Bar chart</td></tr>
<tr><td>How did one song’s daily streams change after release?</td><td>Line chart</td></tr>
<tr><td>Do songs with more shares also get more streams?</td><td>Scatter plot</td></tr>
<tr><td>What share of the class’s votes went to each language?</td><td>Pie chart</td></tr>
</tbody>
</table>
<div class="key"><b>Key idea</b> The question you ask decides the chart you draw.</div>` },

      { kind: 'card', title: 'Making charts in a spreadsheet', html: `
<ol class="flow">
<li><b>Enter the data</b><span>One column per feature, with a clear heading in the first row: Song, Streams, Likes, Shares.</span></li>
<li><b>Select the cells</b><span>Include the headings.</span></li>
<li><b>Insert a chart</b><span>Use Insert → Chart in Google Sheets, Microsoft Excel or LibreOffice Calc.</span></li>
<li><b>Choose the type</b><span>Bar, line, pie or scatter — whichever matches your question.</span></li>
<li><b>Label it</b><span>Add a title, axis titles and units, then check it is easy to read.</span></li>
</ol>
<div class="key"><b>Key idea</b> When you update the numbers, the spreadsheet redraws the chart automatically.</div>` },

      { kind: 'card', title: 'Chart mistakes to avoid', html: `
<ul>
<li><b>No title or axis labels</b> — the reader cannot tell what is shown.</li>
<li><b>Missing units</b> — is it ₹ or lakhs of ₹? °C or °F?</li>
<li><b>Pie charts with too many slices</b>, or parts that do not make one whole.</li>
<li><b>3-D effects</b> that tilt and distort the sizes of bars and slices.</li>
<li><b>Line charts for unrelated categories.</b></li>
</ul>
<div class="key"><b>Key idea</b> A good chart answers one clear question honestly, and anyone can read it without you explaining it.</div>` },

      { kind: 'check', concepts: ['song-features', 'spreadsheets'], n: 3 },

      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 12, pass: 0.8 }
    ],
    pool: [
      // why-viz
      { id: 'u1-06-q01', c: 'why-viz', t: 'mcq', d: 1,
        q: 'Why do we visualise data?',
        o: ['To spot trends, patterns and outliers quickly', 'To make the data take up more storage space', 'To hide the mistakes that are in the data', 'To avoid having to collect any data at all'],
        a: 0,
        ex: 'Charts let our eyes pick up trends, patterns, relationships and unusual values far faster than reading a table.' },
      { id: 'u1-06-q02', c: 'why-viz', t: 'multi', d: 1,
        q: 'Visualising data helps you to… Select all that apply.',
        o: ['spot trends over time', 'find outliers', 'communicate findings to others', 'change the data so it looks better', 'skip the Data Acquisition stage'],
        a: [0, 1, 2],
        ex: 'Charts reveal trends and outliers and help you explain findings. They should never be used to change data, and you still need to collect data first.' },
      { id: 'u1-06-q03', c: 'why-viz', t: 'tf', d: 2,
        q: 'Data Exploration comes after Data Acquisition and before Modelling in the AI Project Cycle.',
        a: true,
        ex: 'You collect the data first, then explore it to understand its patterns, and use what you learn to build the model.' },
      { id: 'u1-06-q04', c: 'why-viz', t: 'mcq', d: 2,
        q: 'A teacher has a table of 400 marks out of 100 and wants to check quickly whether any were typed wrongly, such as 950. What will a chart help her find?',
        o: ['Outliers', 'Stakeholders', 'Training data', 'Intents'],
        a: 0,
        mis: { 1: 'Stakeholders are people affected by a problem — a chart of marks will not show them.', 2: 'Training data is used to teach a model. She is looking for unusual values.' },
        ex: 'A value like 950 sits far away from all the others on a chart. Such unusual values are called outliers.' },
      { id: 'u1-06-q05', c: 'why-viz', t: 'mcq', d: 3,
        q: 'A team exploring hospital data sees on a line chart that dengue cases rise every year after the monsoon. How does this help their AI project?',
        o: ['It shows a seasonal pattern to use when building the model', 'It proves that the hospital collected the data wrongly', 'It means that no model is needed for this project', 'It tells the team exactly who the stakeholders are'],
        a: 0,
        mis: { 1: 'A repeating rise is a pattern, not a sign of bad data.', 2: 'Seeing a pattern helps build a better model — it does not replace one.' },
        ex: 'Spotting a seasonal pattern tells the team that month or rainfall should be a feature, and guides the kind of model they try.' },
      { id: 'u1-06-q06', c: 'why-viz', t: 'mcq', d: 1,
        q: 'What is Data Exploration?',
        o: ['Arranging and visualising data to find patterns', 'Collecting data from surveys, sensors and cameras', 'Testing a model on data it has never seen', 'Using the finished model inside a real app'],
        a: 0,
        ex: 'Data Exploration is the third stage of the AI Project Cycle, where collected data is arranged, cleaned and visualised.' },

      // bar-line-pie
      { id: 'u1-06-q07', c: 'bar-line-pie', t: 'match', d: 1,
        q: 'Match each chart to what it is best for.',
        pairs: [['Bar chart', 'Comparing categories'], ['Line chart', 'Showing change over time'], ['Pie chart', 'Showing parts of a whole']],
        ex: 'Bars compare separate categories, lines show how something changes over time, and pies show how a whole is split into parts.' },
      { id: 'u1-06-q08', c: 'bar-line-pie', t: 'mcq', d: 1,
        q: 'Which chart is best for showing how a city’s temperature changed across the days of May?',
        o: ['Line chart', 'Pie chart', 'Histogram', 'Flow chart'],
        a: 0,
        ex: 'Days of May are time, and a line chart shows change over time most clearly.' },
      { id: 'u1-06-q09', c: 'bar-line-pie', t: 'mcq', d: 2,
        q: 'Which chart is best for comparing the number of students in each school house — Red, Blue, Green and Yellow?',
        o: ['Bar chart', 'Line chart', 'Scatter plot', 'Histogram'],
        a: 0,
        mis: { 1: 'Houses are categories, not points in time, so a line would suggest a change that does not exist.', 3: 'A histogram groups numbers into ranges. Houses are named categories.' },
        ex: 'Comparing amounts across separate categories is exactly what bar charts are for.' },
      { id: 'u1-06-q10', c: 'bar-line-pie', t: 'mcq', d: 2,
        q: 'Kabir wants to show how his ₹500 pocket money is split between snacks, travel, books and savings. Which chart fits best?',
        o: ['Pie chart', 'Line chart', 'Scatter plot', 'Histogram'],
        a: 0,
        mis: { 1: 'There is no time involved — just one total split into parts.', 2: 'A scatter plot needs two numeric variables for each item.' },
        ex: 'The four parts add up to one whole (₹500), and there are only a few of them — a perfect job for a pie chart.' },
      { id: 'u1-06-q11', c: 'bar-line-pie', t: 'tf', d: 2,
        q: 'A pie chart is a good choice for showing how sales changed each month over a year.',
        a: false,
        ex: 'Change over time needs a line chart (or bars). A pie shows parts of one whole at one moment.' },
      { id: 'u1-06-q12', c: 'bar-line-pie', t: 'mcq', d: 3,
        q: 'Sana draws a pie chart with 15 slices showing her class’s favourite foods. Many slices look almost the same size. What is the best fix?',
        o: ['Use a bar chart so the categories are easy to compare', 'Use a line chart to show the foods over time', 'Add more slices to make the chart more detailed', 'Make the pie 3-D so that it looks bigger'],
        a: 0,
        mis: { 1: 'Favourite foods are categories, not a time series.', 3: '3-D effects distort slice sizes and make comparison even harder.' },
        ex: 'Pies work only with a few slices. With many categories, bars of different lengths are far easier to compare.' },
      { id: 'u1-06-q13', c: 'bar-line-pie', t: 'mcq', d: 3,
        q: 'A cricket analyst wants to show how India’s run rate changed over by over during a T20 innings. Which chart should she use?',
        o: ['Line chart', 'Pie chart', 'Histogram', 'Bubble chart'],
        a: 0,
        mis: { 1: 'A pie shows parts of a whole, not how something changes over time.', 2: 'A histogram shows how values are spread across ranges, not change over the innings.' },
        ex: 'Overs are a sequence in time, and a line chart shows how the run rate rises and falls across them.' },
      { id: 'u1-06-q14', c: 'bar-line-pie', t: 'mcq', d: 2,
        q: 'Why should a line chart not be used to compare clubs such as Robotics, Music and Sports?',
        o: ['The line suggests a change over time that isn’t there', 'Line charts are not able to show any numbers at all', 'Line charts can only ever show exactly two values', 'Line charts must always slope upwards from left to right'],
        a: 0,
        mis: { 1: 'Line charts do show numbers — the problem is what the connecting line implies.', 3: 'Lines can go up, down or stay flat.' },
        ex: 'Joining separate categories with a line falsely suggests one flows into the next. Separate categories belong in a bar chart.' },

      // scatter-hist
      { id: 'u1-06-q15', c: 'scatter-hist', t: 'mcq', d: 1,
        q: 'Which chart shows the relationship between two numeric variables?',
        o: ['Scatter plot', 'Pie chart', 'Bar chart', 'Flow chart'],
        a: 0,
        ex: 'In a scatter plot, each dot is placed by two numbers, so you can see whether they rise or fall together.' },
      { id: 'u1-06-q16', c: 'scatter-hist', t: 'mcq', d: 1,
        q: 'What does a histogram show?',
        o: ['How values of one numeric variable spread across ranges', 'How one whole is divided into slices of a circle', 'The steps of a process shown with boxes and arrows', 'The relationship between two different numeric variables'],
        a: 0,
        ex: 'A histogram groups one numeric variable into ranges and shows how many values fall in each — its distribution.' },
      { id: 'u1-06-q17', c: 'scatter-hist', t: 'mcq', d: 2,
        q: 'A PE teacher records the heights of 120 students and wants to see how many fall in 140–145 cm, 145–150 cm and so on. Which chart should he use?',
        o: ['Histogram', 'Pie chart', 'Line chart', 'Scatter plot'],
        a: 0,
        mis: { 2: 'There is no time order here — just one measurement grouped into ranges.', 3: 'A scatter plot needs two numeric variables. Here there is only height.' },
        ex: 'Counting how many values of one numeric variable fall into each range is exactly what a histogram shows.' },
      { id: 'u1-06-q18', c: 'scatter-hist', t: 'mcq', d: 2,
        q: 'On a chart, each dot stands for one student and is placed by that student’s hours of screen time and hours of sleep. What kind of chart is it?',
        o: ['Scatter plot', 'Histogram', 'Pie chart', 'Line chart'],
        a: 0,
        mis: { 1: 'A histogram uses bars for ranges of one variable, not dots for two.', 3: 'A line chart joins points in time order. These dots are separate students.' },
        ex: 'Dots placed by two numeric values for each item make a scatter plot, used to look for a relationship.' },
      { id: 'u1-06-q19', c: 'scatter-hist', t: 'tf', d: 2,
        q: 'In a histogram, each bar stands for a range of numbers, and the bars are drawn touching each other.',
        a: true,
        ex: 'The ranges follow on from one another (140–145, 145–150 …), so the bars touch. A bar chart of categories has gaps.' },
      { id: 'u1-06-q20', c: 'scatter-hist', t: 'mcq', d: 3,
        q: 'A farmers’ group in Andhra Pradesh wants to know whether fields that got more rainfall also gave higher yields, using data from 60 farms. Which chart should they use?',
        o: ['Scatter plot of rainfall against yield', 'Pie chart of the yield of each farm', 'Histogram of the names of the farms', 'Flow chart of how rainfall happens'],
        a: 0,
        mis: { 1: 'A pie shows parts of a whole. Here we want to see whether two numbers move together.', 3: 'A flow chart shows the steps of a process, not data from 60 farms.' },
        ex: 'Each farm has two numbers — rainfall and yield. A scatter plot shows whether higher rainfall goes with higher yield.' },
      { id: 'u1-06-q21', c: 'scatter-hist', t: 'bins', d: 2,
        q: 'Sort each dataset by the chart that suits it.',
        bins: ['Bar chart', 'Histogram'],
        items: [['Number of students in each school house', 0], ['How many students scored 0–10, 10–20, 20–30 … marks', 1], ['Medals won by each state', 0], ['Ages of 200 marathon runners grouped in 5-year ranges', 1], ['Votes for each favourite fruit', 0], ['Daily rainfall amounts grouped into ranges', 1]],
        ex: 'Named categories (houses, states, fruits) go in bar charts. Numbers grouped into ranges (marks, ages, rainfall) go in histograms.' },

      // dataviz-cat
      { id: 'u1-06-q22', c: 'dataviz-cat', t: 'mcq', d: 1,
        q: 'What is the Data Viz Catalogue?',
        o: ['A website describing many chart types and when to use each', 'A spreadsheet app for typing in and storing data', 'A government portal that publishes data about India', 'An AI tool that collects data from sensors'],
        a: 0,
        ex: 'The Data Viz Catalogue (datavizcatalogue.com) explains dozens of chart types and what each is good for.' },
      { id: 'u1-06-q23', c: 'dataviz-cat', t: 'match', d: 2,
        q: 'Match each chart type to its description.',
        pairs: [['Heat map', 'Colours in a grid show the values'], ['Bubble chart', 'Bubble size shows a third value'], ['Flow chart', 'Boxes and arrows show the steps of a process'], ['Area chart', 'A line chart with the space below filled in']],
        ex: 'Heat maps use colour, bubble charts add size as a third value, flow charts show steps, and area charts fill under a line.' },
      { id: 'u1-06-q24', c: 'dataviz-cat', t: 'mcq', d: 2,
        q: 'A metro station manager wants a grid of days × hours where darker colours show busier times. Which chart is this?',
        o: ['Heat map', 'Pie chart', 'Flow chart', 'Histogram'],
        a: 0,
        mis: { 2: 'A flow chart shows the steps of a process, not values in a grid.', 3: 'A histogram uses bars for ranges of one variable, not colours in a grid.' },
        ex: 'A heat map uses colour in a grid to show values, so busy times stand out at a glance.' },
      { id: 'u1-06-q25', c: 'dataviz-cat', t: 'tf', d: 2,
        q: 'On the Data Viz Catalogue, you can look up charts by what you want to show, such as comparisons, proportions or relationships.',
        a: true,
        ex: 'The site lets you search by function — what you want the chart to do — as well as browse chart types.' },
      { id: 'u1-06-q26', c: 'dataviz-cat', t: 'mcq', d: 3,
        q: 'Rohan has data on 30 cities: population, number of hospitals and air-quality index. He wants one chart that plots population against hospitals, with dot size showing air quality. Which should he pick?',
        o: ['Bubble chart', 'Pie chart', 'Line chart', 'Flow chart'],
        a: 0,
        mis: { 1: 'A pie shows one whole split into parts — it cannot show three variables per city.', 2: 'There is no time order across the cities.' },
        ex: 'A bubble chart is a scatter plot with a third variable shown as bubble size — exactly what Rohan needs.' },

      // song-features
      { id: 'u1-06-q27', c: 'song-features', t: 'multi', d: 1,
        q: 'Which are sensible data features for Top 10 Song Prediction? Select all that apply.',
        o: ['Number of streams', 'Number of likes', 'Number of shares', 'Artist popularity', 'Colour of the singer’s shoes'],
        a: [0, 1, 2, 3],
        ex: 'Streams, likes, shares and artist popularity can all affect how high a song ranks. Shoe colour has no sensible link to rank.' },
      { id: 'u1-06-q28', c: 'song-features', t: 'mcq', d: 2,
        q: 'Why is <b>release recency</b> (how recently a song came out) a useful feature for predicting the Top 10?',
        o: ['New songs often climb fast while older songs slowly drop', 'Older songs always stay at number one for ever', 'A recent release date makes a song sound better', 'It tells you exactly how many minutes each song lasts'],
        a: 0,
        mis: { 1: 'Most songs fall down the chart over time — they rarely stay at the top for ever.', 3: 'Song length is a different feature. Recency is about when it was released.' },
        ex: 'How long a song has been out affects where it is in its rise and fall, so recency helps predict next week’s rank.' },
      { id: 'u1-06-q29', c: 'song-features', t: 'mcq', d: 2,
        q: 'In the song project, which chart best shows whether songs with more shares also get more streams?',
        o: ['Scatter plot', 'Pie chart', 'Line chart', 'Histogram'],
        a: 0,
        mis: { 1: 'A pie shows parts of a whole, not whether two numbers rise together.', 2: 'There is no time order — each song is a separate point with two numbers.' },
        ex: 'Each song has two numbers (shares and streams). A scatter plot shows whether they move together.' },
      { id: 'u1-06-q30', c: 'song-features', t: 'mcq', d: 3,
        q: 'Meera wants to see how one new Punjabi song’s daily streams changed in its first 14 days. Which chart should she use?',
        o: ['Line chart', 'Pie chart', 'Scatter plot', 'Bubble chart'],
        a: 0,
        mis: { 1: 'The 14 days are not parts of one whole — she wants to see change.', 2: 'A scatter plot looks for a relationship between two variables; she wants a trend over time.' },
        ex: 'Daily streams over 14 days is change over time, which a line chart shows best.' },
      { id: 'u1-06-q31', c: 'song-features', t: 'tf', d: 2,
        q: 'In Top 10 Song Prediction, a song’s rank next week is the output we want to predict, not an input feature.',
        a: true,
        ex: 'Streams, likes, shares, artist popularity and recency are inputs. Next week’s rank is what the model tries to predict.' },
      { id: 'u1-06-q32', c: 'song-features', t: 'mcq', d: 3,
        q: 'Diya’s class has collected streams, likes, shares and artist popularity for 15 songs. Before drawing any charts, what should they do first?',
        o: ['Decide which question each chart should answer', 'Make every chart a pie chart for consistency', 'Delete the songs that have low streams', 'Add made-up rows so the charts look full'],
        a: 0,
        mis: { 1: 'One chart type cannot answer every question. The question decides the chart.', 3: 'Made-up data gives false patterns and is dishonest.' },
        ex: 'The question (compare? over time? relationship?) decides which chart to draw, so it must come first.' },

      // spreadsheets
      { id: 'u1-06-q33', c: 'spreadsheets', t: 'order', d: 1,
        q: 'Put the steps for making a chart in a spreadsheet in order.',
        items: ['Enter the data in columns with headings', 'Select the data, including the headings', 'Insert a chart', 'Choose the chart type', 'Add a title and axis labels'],
        ex: 'You need data before you can select it, a chart before you can choose its type, and the chart type before you finish it with labels.' },
      { id: 'u1-06-q34', c: 'spreadsheets', t: 'mcq', d: 1,
        q: 'Which of these is a spreadsheet program you can use to make charts?',
        o: ['Google Sheets', 'Google Maps', 'WhatsApp', 'Bhashini'],
        a: 0,
        ex: 'Google Sheets, Microsoft Excel and LibreOffice Calc are spreadsheet programs that can turn data into charts.' },
      { id: 'u1-06-q35', c: 'spreadsheets', t: 'tf', d: 1,
        q: 'When you change the numbers in a spreadsheet, a chart made from them updates automatically.',
        a: true,
        ex: 'Spreadsheet charts are linked to their cells, so changing the data redraws the chart.' },
      { id: 'u1-06-q36', c: 'spreadsheets', t: 'mcq', d: 2,
        q: 'Arjun’s chart shows bars but has no title, no axis labels and no units. What is the main problem?',
        o: ['Readers cannot tell what the chart shows', 'The chart will not be able to print', 'Bars are not allowed in spreadsheets', 'The data in the chart must be wrong'],
        a: 0,
        mis: { 2: 'Bar charts are one of the most common spreadsheet charts.', 3: 'The data may be fine — the problem is that nobody can read it.' },
        ex: 'Without a title, labels and units, a reader has to guess what the bars mean. A chart must be understandable on its own.' },
      { id: 'u1-06-q37', c: 'spreadsheets', t: 'mcq', d: 3,
        q: 'Ayaan types his song data into a single cell as “Song A 500 Song B 700 …” and the chart comes out wrong. What is the best fix?',
        o: ['Put each feature in its own headed column', 'Make the font size bigger so it is clearer', 'Change the chart to a 3-D style instead', 'Type all the data in capital letters'],
        a: 0,
        mis: { 1: 'Font size does not change how the spreadsheet reads the data.', 2: '3-D effects do not fix badly arranged data — and they distort charts.' },
        ex: 'Spreadsheets read data from rows and columns. Song names in one column and streams in another lets the chart tool use them correctly.' },
      { id: 'u1-06-q38', c: 'spreadsheets', t: 'multi', d: 2,
        q: 'Which of these make a chart clearer? Select all that apply.',
        o: ['A clear title', 'Axis labels with units', 'A chart type that suits the question', '3-D effects that tilt the bars', 'A pie chart with 20 slices'],
        a: [0, 1, 2],
        ex: 'Titles, labelled axes with units and the right chart type help readers. 3-D tilts distort sizes, and 20-slice pies are hard to compare.' }
    ]
  }
];
