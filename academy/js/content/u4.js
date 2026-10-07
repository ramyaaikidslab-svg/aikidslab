// Unit 4 — Introduction to Generative AI. CBSE 417 Class IX, Part B.
export default {
  id: 'u4',
  title: 'Introduction to Generative AI',
  short: 'Generative AI',
  color: 'violet',
  syllabus: 'Unit 4 · 8 h theory + 12 h practical in the CBSE plan',
  topics: [
  {
    id: 'u4-01',
    title: 'What is Generative AI?',
    minutes: 60,
    outcomes: [
      'Define generative AI',
      'Classify different kinds of generative AI by the content they create',
      'Use clues and source-checking to judge whether an image is real or AI-generated'
    ],
    hook: 'One of these two photos of a flooded street was never taken by any camera. Can you tell which?',
    concepts: {
      'genai-def': 'What generative AI is',
      'genai-output': 'Kinds of content generative AI creates',
      'image-clues': 'Clues in AI-generated images',
      'text-clues': 'Clues in AI-generated text',
      'verify': 'Clues are not proof: verify the source'
    },
    steps: [
      { kind: 'card', title: 'A poster nobody drew', html: `
  <p>Meera needs a poster for her school’s Diwali mela. She types: <i>“A bright poster with diyas, rangoli and fireworks over a school building, in a cheerful cartoon style.”</i> Ten seconds later she has four different posters to choose from.</p>
  <p>No artist drew them. No camera took them. They did not exist anywhere until she asked. A computer program <b>generated</b> them — that is where the name <b>generative AI</b> comes from.</p>
  <p>The same kind of AI can write a story, compose a tune, make a short video clip, or suggest lines of computer code.</p>
  <div class="key"><b>Key idea</b> Generative AI does not just recognise or sort things — it makes something new.</div>` },
      { kind: 'card', title: 'Defining generative AI', html: `
  <div class="def"><dfn>Generative AI</dfn> AI that creates new content — text, images, audio, video or code — by learning patterns from large amounts of existing data.</div>
  <p>Two parts of this definition matter:</p>
  <ul>
  <li><b>Learning patterns from large data.</b> An image model has studied a huge number of pictures with descriptions. It has learned what diyas, rangoli and fireworks usually look like, and how cartoon styles differ from photos.</li>
  <li><b>Creating new content.</b> The poster is not a copy of one stored picture. The model combines learned patterns to make something that fits the request.</li>
  </ul>
  <p>The request you type is called a <b>prompt</b>. A clearer, more detailed prompt usually gives a result closer to what you want.</p>` },
      { kind: 'card', title: 'What can it create?', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Output</th><th>Example</th><th>Tools you may hear of</th></tr></thead>
  <tbody>
  <tr><td>Text</td><td>A story, an email draft, a summary</td><td>ChatGPT, Gemini</td></tr>
  <tr><td>Image</td><td>A poster, an illustration</td><td>DALL·E, Midjourney, Adobe Firefly</td></tr>
  <tr><td>Audio</td><td>A tune, a spoken voice-over</td><td>Music and voice generators</td></tr>
  <tr><td>Video</td><td>A short clip from a description</td><td>Text-to-video tools</td></tr>
  <tr><td>Code</td><td>Lines of a Python program</td><td>Coding assistants such as GitHub Copilot</td></tr>
  </tbody></table></div>
  <p>Classifying generative AI by the <b>kind of content it creates</b> is the simplest way to sort it. Some tools can handle more than one kind — for example, a chatbot that can also make images.</p>` },
      { kind: 'check', concepts: ['genai-def', 'genai-output'], n: 3 },
      { kind: 'card', title: 'Why spotting fakes matters', html: `
  <p>During floods and cyclones, dramatic pictures spread fast on messaging apps. Some are real. Some are old photos from another place. Some are now made entirely by AI.</p>
  <p>A convincing fake image can cause panic, spread false news, damage someone’s reputation or help a scam. Before you believe or forward an image, it is worth a few seconds of checking.</p>
  <p>The CBSE activity <b>“Guess the Real Image vs the AI-generated Image”</b> trains exactly this habit: look closely, find clues, then check the source.</p>
  <div class="key"><b>Key idea</b> Being able to question an image is now part of being a responsible digital citizen.</div>` },
      { kind: 'card', title: 'Clues in AI-generated images', html: `
  <p>Image generators are impressive, but they often slip on details. Look for:</p>
  <div class="cols">
  <div class="mini"><h4>✋ Hands</h4><p>Extra, missing or merged fingers; fingers bending oddly.</p></div>
  <div class="mini"><h4>🔤 Text</h4><p>Signs, labels or posters with garbled, melted or made-up letters.</p></div>
  <div class="mini"><h4>💡 Light</h4><p>Shadows pointing different ways; reflections that don’t match the scene.</p></div>
  <div class="mini"><h4>👂 Details</h4><p>Earrings that don’t match, glasses that melt into skin, overly smooth “plastic” skin, warped railings or windows in the background.</p></div>
  </div>
  <p>Zoom in on edges, hands, text and the background — that is where errors usually hide.</p>` },
      { kind: 'card', title: 'Clues in AI-generated text', html: `
  <p>Text from a chatbot can also leave clues:</p>
  <ul>
  <li><b>Made-up references.</b> A book, article or study that does not exist, often with a real-sounding author and page number.</li>
  <li><b>Confident but wrong facts.</b> Wrong dates, places or numbers stated with no hesitation.</li>
  <li><b>Very general wording.</b> Smooth sentences that sound good but say little that is specific.</li>
  </ul>
  <div class="eg"><b>Example</b> A chatbot answer says, “According to Sharma (2019), Journal of Indian Monsoon Studies, page 45…”. If you cannot find that journal or article anywhere, treat the claim as unverified.</div>
  <div class="warn"><b>Careful</b> Fluent writing is not the same as true writing.</div>` },
      { kind: 'lab', lab: 'real-or-ai', title: 'Real or AI?', intro: 'Inspect 8 close-up cards — hands, signs, reflections, textures, a citation. For each, decide “likely AI-generated” or “likely real” and name the clue.' },
      { kind: 'card', title: 'Clues are not proof — check the source', html: `
  <p>A real photo can look odd: motion blur, a strange reflection, heavy editing. And newer AI tools make fewer obvious mistakes. So a clue is a reason to <b>check</b>, not proof.</p>
  <ol class="flow">
  <li><b>Pause</b><span>Don’t forward it straight away.</span></li>
  <li><b>Look for clues</b><span>Hands, text, light, details, background.</span></li>
  <li><b>Find the source</b><span>Who posted it first, and when? A reverse image search (such as Google Lens) can find earlier copies.</span></li>
  <li><b>Check trusted sources</b><span>Reliable news, official accounts (e.g. IMD, district authorities), or PIB Fact Check.</span></li>
  <li><b>Decide</b><span>Share, ignore, or report it.</span></li>
  </ol>` },
      { kind: 'check', concepts: ['image-clues', 'text-clues', 'verify'], n: 3 },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>“It just copies and pastes.”</b> Generative AI creates new content from learned patterns; it does not cut and paste one saved picture.</div>
  <div class="warn"><b>“All AI is generative.”</b> A spam filter or face-unlock is AI too, but it recognises or sorts — it does not create.</div>
  <div class="warn"><b>“If it looks real, it is real.”</b> Realistic images can be generated in seconds.</div>
  <div class="warn"><b>“One clue proves it.”</b> Clues raise suspicion; the source settles it.</div>
  <div class="warn"><b>“It only makes text.”</b> It can make images, audio, video and code too.</div>` },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u4-01-q01', c: 'genai-def', t: 'mcq', d: 1, q: 'Which is the best definition of generative AI?', o: ['AI that creates new content using patterns learned from large data', 'AI that sorts existing data into fixed categories it has learned', 'A program that follows only the rules written by its programmer', 'A search engine that finds web pages which already exist online'], a: 0, ex: 'Generative AI creates new text, images, audio, video or code, using patterns learned from large amounts of data.' },
      { id: 'u4-01-q02', c: 'genai-def', t: 'tf', d: 1, q: 'Generative AI creates new content by learning patterns from large amounts of existing data.', a: true, ex: 'That is the definition: it learns patterns from data and uses them to create something new.' },
      { id: 'u4-01-q03', c: 'genai-def', t: 'mcq', d: 2, q: 'Which of these is generative AI at work?', o: ['An app writes a new monsoon poem from a short prompt', 'A calculator app adds up the prices on a bill', 'A spam filter moves an unwanted email to the spam folder', 'A thermostat switches on the AC when it reaches 28 °C'], a: 0, mis: { 2: 'A spam filter is AI, but it sorts emails — it does not create new content.', 3: 'A thermostat follows a fixed rule. It neither learns nor creates.' }, ex: 'Writing a new poem creates new content, which is what generative AI does.' },
      { id: 'u4-01-q04', c: 'genai-def', t: 'mcq', d: 2, q: 'What does “new” mean when we say generative AI creates new content?', o: ['It is built from learned patterns, not copied from one item', 'It is always an exact copy of one existing web page', 'It was secretly drawn by a human artist working very fast', 'It has never been seen or checked by any person at all'], a: 0, mis: { 1: 'Generative AI does not fetch and copy a page; it combines learned patterns into something new.' }, ex: 'The model combines patterns it learned from many examples to produce content that did not exist before.' },
      { id: 'u4-01-q05', c: 'genai-def', t: 'mcq', d: 3, q: 'Diya asks an app for “a peacock reading a newspaper on a Kolkata tram”. No such photo exists anywhere, yet she gets a convincing picture. How is that possible?', o: ['It learned how peacocks, newspapers and trams look, and combined them', 'The app searched the internet and found a real photo of this scene', 'A photographer was quickly paid to stage the scene and send a photo', 'The app copied a matching picture from Diya’s own phone gallery'], a: 0, mis: { 1: 'No such photo exists to find. The image was generated, not searched for.' }, ex: 'Generative AI combines patterns it has learned separately — peacocks, newspapers, trams — into a new image.' },
      { id: 'u4-01-q06', c: 'genai-def', t: 'multi', d: 2, q: 'Which of these are generative AI tasks? Select all that apply.', o: ['Writing a short story from a prompt', 'Turning a text description into an image', 'Composing a new background tune', 'Sorting photos into “cat” and “dog” folders', 'Flagging a suspicious bank transaction'], a: [0, 1, 2], ex: 'Stories, images and tunes are new content. Sorting photos and flagging transactions are classification tasks done by conventional AI.' },
      { id: 'u4-01-q07', c: 'genai-output', t: 'match', d: 1, q: 'Match each kind of output to an example.', pairs: [['Text', 'A chatbot drafts an email'], ['Image', 'A poster made from a typed description'], ['Audio', 'A generated voice reads a story aloud'], ['Video', 'A short clip made from a text prompt'], ['Code', 'A tool suggests the next lines of a program']], ex: 'Generative AI can be classified by what it creates: text, image, audio, video or code.' },
      { id: 'u4-01-q08', c: 'genai-output', t: 'bins', d: 2, q: 'Sort each request by the kind of content it asks for.', bins: ['Text', 'Image', 'Audio'], items: [['A summary of a history chapter', 0], ['A logo for the school eco club', 1], ['A short tune for a skit', 2], ['A thank-you letter to a guest', 0], ['A cartoon of a tiger in a forest', 1], ['A Hindi voice-over for a video', 2]], ex: 'Summaries and letters are text; logos and cartoons are images; tunes and voice-overs are audio.' },
      { id: 'u4-01-q09', c: 'genai-output', t: 'mcq', d: 1, q: 'A tool turns the prompt “a cat riding a scooter” into a picture. What kind of output is this?', o: ['Image', 'Text', 'Audio', 'Code'], a: 0, ex: 'The output is a picture, so it is image generation.' },
      { id: 'u4-01-q10', c: 'genai-output', t: 'mcq', d: 2, q: 'Kabir uses one tool to write a speech and another to turn the speech into a spoken recording. Which kinds of output did he create, in order?', o: ['Text, then audio', 'Image, then video', 'Code, then image', 'Audio, then text'], a: 0, mis: { 3: 'The order is reversed: the speech was written first (text), then turned into sound (audio).' }, ex: 'Writing the speech produces text; turning it into speech produces audio.' },
      { id: 'u4-01-q11', c: 'genai-output', t: 'tf', d: 2, q: 'Generative AI can only produce text.', a: false, ex: 'Generative AI can create text, images, audio, video and code.' },
      { id: 'u4-01-q12', c: 'image-clues', t: 'mcq', d: 1, q: 'Which is a common clue that an image may be AI-generated?', o: ['A hand with six fingers, or fingers merged together', 'A photo taken outdoors in bright afternoon sunlight', 'A picture that shows a crowded market with many people', 'An image that has been saved on a phone as a JPG file'], a: 0, ex: 'Image generators often get hands wrong, so extra or merged fingers are a classic clue.' },
      { id: 'u4-01-q13', c: 'image-clues', t: 'multi', d: 2, q: 'Which are common clues of AI-generated images? Select all that apply.', o: ['Garbled or melted letters on signs', 'Shadows or reflections that don’t match the light', 'Earrings that don’t match each other', 'Unnaturally smooth, plastic-looking skin', 'The image is in colour', 'The image shows people outdoors'], a: [0, 1, 2, 3], ex: 'Garbled text, inconsistent lighting, mismatched accessories and over-smooth skin are typical slips. Colour and outdoor scenes are normal in real photos.' },
      { id: 'u4-01-q14', c: 'image-clues', t: 'mcq', d: 2, q: 'In a “photo” of a sweet shop, the signboard letters melt into each other and spell nonsense. What does this suggest?', o: ['It may be AI-generated, as image models often garble text', 'It must be a real photo, because real shops have signboards', 'It is definitely a painting made by a human artist by hand', 'It proves that the sweet shop has closed down for good'], a: 0, mis: { 1: 'Real shops have readable signs. Melted, nonsense lettering is a typical AI slip.' }, ex: 'Image generators often struggle to draw readable text, so garbled signs are a strong clue — though you should still check the source.' },
      { id: 'u4-01-q15', c: 'image-clues', t: 'bins', d: 3, q: 'Sort each detail.', bins: ['Likely clue of AI generation', 'Normal in real photos'], items: [['Six fingers on one hand', 0], ['Background railings that bend and melt together', 0], ['Shadows falling in different directions under one sun', 0], ['Slight blur on a fast-moving cyclist', 1], ['Grainy texture in a photo taken at night', 1], ['People far away look smaller', 1]], ex: 'Extra fingers, warped backgrounds and inconsistent shadows are typical AI slips. Motion blur, low-light grain and perspective are normal in camera photos.' },
      { id: 'u4-01-q16', c: 'image-clues', t: 'mcq', d: 3, q: 'A viral portrait shows glasses whose frame sinks into the cheek, two earrings of different shapes and unusually smooth skin. What is the best conclusion?', o: ['Several clues suggest AI; check the source before believing or sharing it', 'It is certainly AI-generated, so there is no need to check anything further', 'It is definitely real, because portraits are hard to fake', 'Clues like these are never found in AI images'], a: 0, mis: { 1: 'Clues raise suspicion, but they are not proof. The source settles it.', 2: 'Realistic portraits are one of the easiest things for modern AI to generate.' }, ex: 'Several clues point towards AI, but clues are not proof. Tracing the original source is the reliable check.' },
      { id: 'u4-01-q17', c: 'text-clues', t: 'mcq', d: 1, q: 'Which is a warning sign in AI-generated text?', o: ['A reference to a book or study that does not exist', 'A sentence that ends neatly with a full stop', 'A paragraph that is written in simple, clear English', 'A heading in bold letters at the top of the page'], a: 0, ex: 'Chatbots can invent realistic-looking references. If a source cannot be found, the claim is unverified.' },
      { id: 'u4-01-q18', c: 'text-clues', t: 'tf', d: 2, q: 'If a paragraph sounds confident and fluent, it must be accurate.', a: false, ex: 'Generative AI is very good at fluent writing, but fluency does not guarantee truth. Facts must be checked.' },
      { id: 'u4-01-q19', c: 'text-clues', t: 'mcq', d: 2, q: 'A chatbot cites “Sharma, R. (2019), Journal of Indian Monsoon Studies, p. 45”. You cannot find this journal or article anywhere. What is most likely?', o: ['The citation may be invented; don’t use it without a real source', 'The article must be secret, which makes it extra reliable', 'The chatbot is always right, so cite it exactly as it was given', 'The library must have lost every single copy of that old journal'], a: 0, mis: { 2: 'Chatbots can produce realistic but invented references. Only use sources you have found yourself.' }, ex: 'Invented references are a known problem with generative AI. If you cannot find a source, treat the claim as unverified.' },
      { id: 'u4-01-q20', c: 'text-clues', t: 'mcq', d: 3, q: 'Sana’s project includes a chatbot claim that “India has 5,000 active volcanoes”. What is the best action?', o: ['Check it in a reliable source before using it', 'Use it, because the chatbot sounded certain', 'Double it to make the project more exciting', 'Use it, but write it in smaller font'], a: 0, mis: { 1: 'Sounding certain is not evidence. Chatbots can state false facts confidently.' }, ex: 'The claim is false: India has very few volcanoes, and Barren Island in the Andaman Sea is its only confirmed active one. Checking a reliable source catches such errors.' },
      { id: 'u4-01-q21', c: 'verify', t: 'mcq', d: 1, q: 'Clues such as extra fingers or garbled text are best treated as…', o: ['hints that need checking, not proof', 'final proof that an image is fake', 'signs that the image is definitely real', 'details that never matter'], a: 0, ex: 'Real photos can look odd, and good AI images may show no clues. Clues prompt you to check the source.' },
      { id: 'u4-01-q22', c: 'verify', t: 'order', d: 2, q: 'Put the steps for checking a suspicious viral image in order.', items: ['Pause — don’t forward it straight away', 'Look for visual clues such as hands, text and lighting', 'Find the original source or do a reverse image search', 'Check trusted news or official accounts', 'Decide whether to share, ignore or report it'], ex: 'Stop first, inspect, trace the source, confirm with trusted sources, and only then decide.' },
      { id: 'u4-01-q23', c: 'verify', t: 'mcq', d: 2, q: 'What is the strongest way to check whether a viral photo is real?', o: ['Trace its original source and check trusted news outlets', 'Count the fingers in it — that always settles the question', 'See how many times it has been forwarded in different groups', 'Ask yourself whether it looks too exciting to be made up'], a: 0, mis: { 1: 'Fingers are one clue, but newer AI images often get hands right, and real photos can look odd.', 2: 'Being forwarded many times says nothing about whether something is true.' }, ex: 'The source and trusted confirmation are stronger evidence than any single visual clue.' },
      { id: 'u4-01-q24', c: 'verify', t: 'tf', d: 2, q: 'As AI image tools improve, they make fewer obvious mistakes, so visual clues alone become less reliable.', a: true, ex: 'Newer models handle hands and text better. That is why checking the source matters more and more.' },
      { id: 'u4-01-q25', c: 'verify', t: 'mcq', d: 3, q: 'During a cyclone, a forward shows a shark swimming down a flooded city street, captioned “Happening now in Chennai!”. What should you do?', o: ['Don’t forward it; check the source and trusted news first', 'Forward it quickly so that people stay safe', 'Believe it, because the caption names a real place and says “now”', 'Add your own caption and post it on social media'], a: 0, mis: { 1: 'Forwarding a fake during a disaster spreads panic and drowns out real warnings.', 2: 'Anyone can add a caption. A place name is not evidence.' }, ex: 'Dramatic disaster images are often old, from elsewhere, or generated. Checking official and trusted sources first stops false alarms.' },
      { id: 'u4-01-q26', c: 'verify', t: 'mcq', d: 3, q: 'Rohan says a photo from the local market must be AI-generated because one signboard is blurry. What is the lesson?', o: ['Real photos can look odd too, so check the source, not one clue', 'Any blurry detail in a photo proves that it is AI-generated', 'Photos of busy markets are almost always made by AI tools', 'Blurry photos are impossible to check, so just guess'], a: 0, mis: { 1: 'Blur is common in real photos (movement, focus). One clue is not proof.' }, ex: 'A single clue can mislead. Clues suggest where to look; the source decides.' },
      { id: 'u4-01-q27', c: 'verify', t: 'multi', d: 2, q: 'Which are good ways to check whether an image is real? Select all that apply.', o: ['Do a reverse image search, e.g. with Google Lens', 'Check whether trusted news outlets report it', 'Look for the original uploader and date', 'Count how many groups it has been forwarded to', 'Trust it if many friends have shared it'], a: [0, 1, 2], ex: 'Reverse searches, trusted reporting and the original source are evidence. Popularity is not.' },
      { id: 'u4-01-q28', c: 'genai-output', t: 'mcq', d: 1, q: 'Which tool is mainly known for generating images from text prompts?', o: ['Midjourney', 'Google Maps', 'DigiYatra', 'A calculator app'], a: 0, ex: 'Midjourney creates images from text prompts. The others are not image generators.' },
      { id: 'u4-01-q29', c: 'text-clues', t: 'mcq', d: 2, q: 'Which of these is a typical sign that text may be AI-generated?', o: ['Smooth, general sentences that say little that is specific', 'A spelling mistake made while typing quickly', 'A personal memory with names and dates the writer can explain', 'A handwritten note on a page'], a: 0, mis: { 1: 'Typing slips are a very human feature. Chatbot text is usually free of spelling mistakes.' }, ex: 'Chatbot text is often fluent but generic. A writer who can explain specific personal details is more likely to be the real author.' },
      { id: 'u4-01-q30', c: 'genai-def', t: 'mcq', d: 2, q: 'Which statement about generative AI is correct?', o: ['It learns patterns from large data and uses them to create new content', 'It cuts and pastes pieces of stored images to make new ones', 'It understands the world in exactly the same way people do', 'It must search the internet first, before it gives every single answer'], a: 0, mis: { 1: 'It learns patterns rather than keeping a library of pieces to paste.', 2: 'It works with learned patterns; it does not truly understand like a person.' }, ex: 'Generative AI learns patterns from data and generates new content from them.' },
      { id: 'u4-01-q31', c: 'genai-output', t: 'mcq', d: 3, q: 'A teacher wants to turn a written lesson summary into a short narrated animation. Which kinds of generated output are involved?', o: ['Text, audio and video', 'Only code, for the animation', 'Only a single still image', 'Only audio, for the narration'], a: 0, mis: { 2: 'A still image cannot move or speak. The animation is video, and the narration is audio.' }, ex: 'The summary is text, the narration is audio, and the animation is video.' },
      { id: 'u4-01-q32', c: 'image-clues', t: 'mcq', d: 2, q: 'Which background detail is a typical clue of an AI-generated image?', o: ['Window frames and railings that bend into each other', 'A grey, cloudy sky above the row of buildings', 'A car parked at the side of the road near a shop', 'People in the distance looking smaller than those nearby'], a: 0, mis: { 3: 'Distant things look smaller in every real photo — that is perspective, not an AI slip.' }, ex: 'Warped straight lines in the background are a common AI slip. The other details are normal in real photos.' }
    ]
  }
  ,
  {
    id: 'u4-02',
    title: 'How Generative AI Learns',
    minutes: 70,
    outcomes: [
      'Explain how generative AI works and recognise how it learns',
      'Compare generative AI with conventional AI',
      'Describe next-token prediction, GANs (generator and discriminator) and diffusion in simple terms'
    ],
    hook: 'Your phone keyboard already guesses your next word. A chatbot does the same thing — billions of times better.',
    concepts: {
      'genai-vs-conv': 'Generative AI vs conventional AI',
      'learn-patterns': 'Learning patterns from large data',
      'next-token': 'Next-token prediction',
      'gan': 'GANs: generator vs discriminator',
      'diffusion': 'Diffusion: from noise to image'
    },
    steps: [
      { kind: 'card', title: 'Two kinds of AI', html: `
  <p>Your email app has an AI that moves junk mail to the spam folder. A chatbot has an AI that can write a polite email for you. Both are AI — but they do very different jobs.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th></th><th>Conventional AI</th><th>Generative AI</th></tr></thead>
  <tbody>
  <tr><td>Job</td><td>Analyses, classifies or predicts</td><td>Creates new content</td></tr>
  <tr><td>Output</td><td>A label, score or number</td><td>Text, image, audio, video, code</td></tr>
  <tr><td>Examples</td><td>Spam filter, video recommendations, bank fraud alerts</td><td>Chatbots, image generators, music generators</td></tr>
  </tbody></table></div>
  <p><b>Conventional</b> (traditional) AI answers questions like “Is this spam?” or “What will you watch next?”. <b>Generative</b> AI answers “Make me something new.”</p>` },
      { kind: 'card', title: 'What they share', html: `
  <p>It is a common mistake to think only one of them “learns”. <b>Both learn patterns from data.</b> The difference is what they do with those patterns.</p>
  <div class="eg"><b>Example</b> A crop app that labels a leaf photo “healthy” or “diseased” uses conventional AI — it <i>classifies</i>. An app that draws a brand-new picture of a diseased leaf for a textbook uses generative AI — it <i>creates</i>.</div>
  <p>Many real products combine both. A photo app might first recognise faces (conventional) and then generate a cartoon version of the picture (generative).</p>
  <div class="key"><b>Key idea</b> Conventional AI analyses, classifies or predicts from data; generative AI creates new content. Both learn from data.</div>` },
      { kind: 'check', concepts: ['genai-vs-conv'], n: 2 },
      { kind: 'card', title: 'Learning from huge amounts of data', html: `
  <p>Your phone keyboard suggests “you” after “thank”. It has learned that this word often comes next. Generative AI works on the same principle, at a vastly larger scale.</p>
  <ul>
  <li>A <b>large language model</b> (LLM) is trained on an enormous amount of text. It learns grammar, common facts, writing styles and how ideas usually connect.</li>
  <li>An <b>image model</b> is trained on a huge number of pictures with descriptions. It learns what objects look like and which words go with which pictures.</li>
  </ul>
  <p>What the model keeps is not a library of copies. It keeps <b>patterns</b>, stored as millions or billions of numbers inside the model.</p>
  <div class="warn"><b>Careful</b> A model only knows patterns that were in its data. If something happened after its training data was collected, it may not know about it.</div>` },
      { kind: 'card', title: 'Next-token prediction', html: `
  <p>A language model writes by repeatedly asking: <b>“What comes next?”</b> It works in <b>tokens</b> — whole words or pieces of words.</p>
  <div class="eg"><b>Example</b> Prompt: “The capital of India is”.<br>The model gives each possible next token a probability, for instance <b>New</b> very high, <b>Delhi</b> fairly low, <b>a</b> very low.<br>It picks “New”, adds it, and asks again: “The capital of India is New” → “Delhi” now gets a very high probability.</div>
  <ol class="flow">
  <li><b>Read</b><span>Look at all the text so far.</span></li>
  <li><b>Predict</b><span>Give every possible next token a probability.</span></li>
  <li><b>Pick</b><span>Choose one, usually a likely one.</span></li>
  <li><b>Repeat</b><span>Add it to the text and go again.</span></li>
  </ol>
  <p>One token at a time, this loop produces whole paragraphs.</p>` },
      { kind: 'card', title: 'Temperature, and why fluent is not the same as true', html: `
  <p>Many tools have a setting often called <b>temperature</b>.</p>
  <ul>
  <li><b>Low temperature</b>: the model almost always picks the most likely token. Output is safe and predictable — and can be repetitive.</li>
  <li><b>High temperature</b>: less likely tokens get picked more often. Output is more varied and creative — and sometimes odd.</li>
  </ul>
  <p>Notice what the model is doing: choosing words that are <b>likely</b>, not checking facts in a database. Usually likely words are correct. But sometimes a confident, fluent sentence is simply false. This is called a <b>hallucination</b>.</p>
  <div class="key"><b>Key idea</b> A language model predicts likely text. That makes it fluent, not automatically truthful.</div>` },
      { kind: 'lab', lab: 'next-word', title: 'Next-Word Machine', intro: 'Explore a small language model trained on about 60 sentences. See its top-5 next-word guesses, then generate sentences at low and high temperature.' },
      { kind: 'check', concepts: ['learn-patterns', 'next-token'], n: 3 },
      { kind: 'card', title: 'GANs: the forger and the detective', html: `
  <div class="def"><dfn>GAN</dfn> Generative Adversarial Network: two neural networks that improve by competing with each other.</div>
  <div class="cols">
  <div class="mini"><h4>🎨 Generator</h4><p>The forger. Starting from random noise, it creates fake samples — for example, pictures of faces.</p></div>
  <div class="mini"><h4>🔍 Discriminator</h4><p>The detective. It is shown real pictures and the generator’s fakes, and must judge: real or fake?</p></div>
  </div>
  <p>“Adversarial” means opponents. When the detective catches a fake, the forger learns what gave it away and improves. When the forger fools the detective, the detective learns to look more closely.</p>
  <p>Round after round, both get better — until the fakes are so realistic that the discriminator can do little better than guess.</p>` },
      { kind: 'card', title: 'Inside a GAN’s training loop', html: `
  <ol class="flow">
  <li><b>Generate</b><span>The generator turns random noise into a batch of fake samples.</span></li>
  <li><b>Mix</b><span>The discriminator receives real samples from the training data and the fakes.</span></li>
  <li><b>Judge</b><span>It labels each one “real” or “fake”.</span></li>
  <li><b>Learn</b><span>Both get feedback: the discriminator on its mistakes, the generator on which fakes were caught.</span></li>
  <li><b>Repeat</b><span>Thousands of times.</span></li>
  </ol>
  <p>A sign of a well-trained GAN: the discriminator is right only about half the time — like tossing a coin — because the fakes look just like real data.</p>
  <p>GANs have been used to create realistic faces of people who do not exist and, in GAN Paint, to add objects like trees and doors to photos.</p>` },
      { kind: 'lab', lab: 'discriminator', title: 'Be the Discriminator', intro: 'You are the detective. In each of 5 rounds, mark which patterns are real and which the generator made — and watch the generator get harder to catch.' },
      { kind: 'card', title: 'Diffusion: from noise to image', html: `
  <p>Many modern image generators use <b>diffusion models</b>.</p>
  <p><b>Training</b>: take a real image and add a little random noise — like TV static — again and again, until nothing is left but noise. The model learns to <b>undo</b> each small step: given a noisy image, predict a slightly cleaner one.</p>
  <p><b>Generating</b>: start from fresh, pure random noise. Remove a little noise, then a little more, step by step. The text prompt guides each step, so the shapes that emerge match the description.</p>
  <div class="eg"><b>Example</b> Prompt: “a red kite over Jaipur’s rooftops”. Early steps show blurry blobs of colour; later steps add rooftops, a sky and finally a sharp kite.</div>
  <p>Because each run starts from different random noise, the same prompt gives different pictures each time.</p>` },
      { kind: 'check', concepts: ['gan', 'diffusion'], n: 3 },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>“Only conventional AI learns from data.”</b> Both learn from data; they differ in output.</div>
  <div class="warn"><b>“It pastes together stored pictures.”</b> Models store learned patterns as numbers, not a library of images. (Occasionally a model can reproduce something very close to a training example, which is one reason copyright is debated.)</div>
  <div class="warn"><b>“It looks facts up.”</b> A language model predicts likely next tokens; unless a tool adds a web search, it is not checking a database.</div>
  <div class="warn"><b>“The discriminator makes the images.”</b> The generator creates; the discriminator judges.</div>
  <div class="warn"><b>“Diffusion starts from a photo.”</b> It starts from random noise.</div>` },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u4-02-q01', c: 'genai-vs-conv', t: 'mcq', d: 1, q: 'What is the main difference between conventional AI and generative AI?', o: ['Conventional AI analyses, classifies or predicts; generative AI creates', 'Conventional AI uses data; generative AI does not use any data at all', 'Conventional AI runs only on phones; generative AI only on computers', 'Conventional AI is always correct; generative AI is always wrong'], a: 0, ex: 'Both learn from data. Conventional AI outputs labels, scores or predictions; generative AI outputs new text, images, audio, video or code.' },
      { id: 'u4-02-q02', c: 'genai-vs-conv', t: 'bins', d: 2, q: 'Sort each AI system.', bins: ['Conventional AI', 'Generative AI'], items: [['A spam filter sorting emails', 0], ['A video app recommending what to watch next', 0], ['A chatbot writing a birthday poem', 1], ['A bank flagging an unusual UPI payment', 0], ['An app creating a poster from a description', 1], ['A tool composing background music', 1]], ex: 'Sorting, recommending and flagging are analysis or prediction (conventional). Writing, designing and composing create new content (generative).' },
      { id: 'u4-02-q03', c: 'genai-vs-conv', t: 'tf', d: 1, q: 'Generative AI does not learn from data; only conventional AI does.', a: false, ex: 'Both kinds learn patterns from data. They differ in what they produce.' },
      { id: 'u4-02-q04', c: 'genai-vs-conv', t: 'mcq', d: 2, q: 'A crop app looks at a leaf photo and outputs “healthy” or “diseased”. What kind of AI is this?', o: ['Conventional AI, because it classifies the photo', 'Generative AI, because its output is a new word', 'Generative AI, because it takes in a camera photo', 'Not AI at all, because it is used by farmers'], a: 0, mis: { 1: 'Outputting a label is classification. Generative AI would create new content, such as a new image or paragraph.', 2: 'Using a camera does not make it generative. What matters is whether it creates new content.' }, ex: 'Choosing between fixed labels is classification, which is what conventional AI does.' },
      { id: 'u4-02-q05', c: 'genai-vs-conv', t: 'mcq', d: 3, q: 'A hospital wants (a) an AI to flag X-rays that may show pneumonia and (b) an AI to draft simple discharge notes for patients. Which is correct?', o: ['(a) conventional AI, (b) generative AI', '(a) generative AI, (b) conventional AI', '(a) generative AI, (b) generative AI', '(a) conventional AI, (b) conventional AI'], a: 0, mis: { 1: 'Flagging X-rays classifies them; drafting notes writes new text. The labels are swapped.', 2: 'Flagging an X-ray does not create new content — it classifies.', 3: 'Drafting notes creates new text, which is generative.' }, ex: 'Flagging X-rays is classification (conventional). Writing new notes is content creation (generative).' },
      { id: 'u4-02-q06', c: 'genai-vs-conv', t: 'mcq', d: 2, q: 'Which statement is accurate?', o: ['Each learns patterns from data; they differ in what they output', 'Conventional AI is newer than generative AI and has replaced it', 'Generative AI can only classify things into fixed groups', 'Conventional AI writes essays, while generative AI only sorts data'], a: 0, mis: { 3: 'This swaps them. Writing essays is generative; sorting is conventional.' }, ex: 'Learning from data is shared. Conventional AI produces labels or predictions; generative AI produces new content.' },
      { id: 'u4-02-q07', c: 'learn-patterns', t: 'mcq', d: 1, q: 'How does generative AI learn?', o: ['By finding patterns in very large amounts of example data', 'By having programmers type in every possible answer by hand', 'By reading one carefully chosen book many times over', 'By directly copying the knowledge stored in a human brain'], a: 0, ex: 'Generative models are trained on huge amounts of data and learn patterns from it.' },
      { id: 'u4-02-q08', c: 'learn-patterns', t: 'tf', d: 2, q: 'A generative AI model keeps a copy of every training image and pastes pieces together to make new ones.', a: false, ex: 'The model stores learned patterns as numbers, not a library of images. (Rarely, a model can reproduce something close to a training example — one reason copyright is debated.)' },
      { id: 'u4-02-q09', c: 'learn-patterns', t: 'mcq', d: 2, q: 'Why do large language models need so much training text?', o: ['Varied examples help them learn grammar, facts and styles', 'They must memorise every sentence and repeat it word for word', 'The text is only needed to make the model file look bigger', 'More text makes them run faster on older mobile phones'], a: 0, mis: { 1: 'The goal is to learn general patterns, not to store sentences to repeat.' }, ex: 'The more varied the examples, the more patterns of language, knowledge and style the model can learn.' },
      { id: 'u4-02-q10', c: 'learn-patterns', t: 'mcq', d: 3, q: 'An image generator was trained mostly on photos of Western cities. Asked for “a busy street in Lucknow”, what may happen?', o: ['The street may look more like the cities in its training data', 'It will produce a perfect, accurate photo of a real Lucknow street', 'It will refuse, because it thinks Lucknow is not a real city', 'It will produce a road map of Lucknow instead of a street scene'], a: 0, mis: { 1: 'A model can only use patterns from its data. If Lucknow’s streets were rare in the data, the result may be inaccurate.' }, ex: 'Models reflect their training data. Under-represented places, people or cultures may be drawn inaccurately — a form of bias.' },
      { id: 'u4-02-q11', c: 'learn-patterns', t: 'multi', d: 2, q: 'What can a language model learn from patterns in its training text? Select all that apply.', o: ['How sentences are usually put together', 'Common facts that appear often in the text', 'Different writing styles, such as poems or letters', 'News events that happened after its training data was collected', 'What you are privately thinking'], a: [0, 1, 2], ex: 'It learns grammar, common facts and styles from its data. It cannot know events that were not in its data, and it cannot read minds.' },
      { id: 'u4-02-q12', c: 'next-token', t: 'mcq', d: 1, q: 'Large language models generate text by…', o: ['predicting the next token, again and again', 'copying whole answers from a fixed list', 'translating a picture into words', 'choosing random letters until a word appears'], a: 0, ex: 'An LLM predicts a likely next token, adds it to the text, and repeats.' },
      { id: 'u4-02-q13', c: 'next-token', t: 'mcq', d: 1, q: 'In a language model, a <b>token</b> is…', o: ['a whole word or a piece of a word', 'a coin used to pay for the app', 'a password needed to log in', 'a picture inside the text'], a: 0, ex: 'Language models break text into tokens — whole words or parts of words — and predict them one at a time.' },
      { id: 'u4-02-q14', c: 'next-token', t: 'order', d: 2, q: 'Put the steps a language model follows to continue a sentence in order.', items: ['Read the text so far', 'Give each possible next token a probability', 'Pick one token, usually a likely one', 'Add the token to the text', 'Repeat with the longer text'], ex: 'Read, predict, pick, add, repeat — this loop produces text one token at a time.' },
      { id: 'u4-02-q15', c: 'next-token', t: 'mcq', d: 1, q: '“The Taj Mahal is in ___”. Which next word would a well-trained model give the highest probability?', o: ['Agra', 'Paris', 'banana', 'quickly'], a: 0, ex: 'In the training text, “Taj Mahal” appears with “Agra” very often, so “Agra” gets the highest probability.' },
      { id: 'u4-02-q16', c: 'next-token', t: 'mcq', d: 3, q: 'Riya sets temperature to 0.2 and gets nearly the same safe sentence each time. Arjun sets it to 1.5 and gets creative but sometimes odd sentences. Why?', o: ['Low temperature favours likely tokens; high lets unlikely ones in more', 'Low temperature teaches the model facts; high makes it forget them', 'Temperature changes how hot the computer gets, changing the words', 'Arjun’s model must have been trained on different data from Riya’s'], a: 0, mis: { 1: 'Temperature does not change what the model knows. It changes how adventurous the choice of next token is.', 3: 'The same model can do both — only the temperature setting changed.' }, ex: 'Temperature controls how strongly the model sticks to its most likely choices. Higher means more variety and more surprises.' },
      { id: 'u4-02-q17', c: 'next-token', t: 'tf', d: 2, q: 'Because language models predict likely next words, they can produce fluent sentences that are false.', a: true, ex: 'Likely-sounding text is not always true. Such confident false output is called a hallucination.' },
      { id: 'u4-02-q18', c: 'next-token', t: 'mcq', d: 3, q: 'A chatbot confidently names a cricket record holder who does not exist. Why can this happen?', o: ['It writes likely-sounding words instead of checking facts', 'Someone must have hacked the chatbot to insert that name', 'Chatbots are designed to invent names on purpose for fun', 'The chatbot’s screen displayed the wrong letters by mistake'], a: 0, mis: { 2: 'It is not on purpose. The model produces plausible text, and plausible is sometimes wrong.' }, ex: 'Next-token prediction produces fluent, plausible text. Without fact-checking, it can invent details — a hallucination.' },
      { id: 'u4-02-q19', c: 'gan', t: 'mcq', d: 1, q: 'What does <b>GAN</b> stand for?', o: ['Generative Adversarial Network', 'General Artificial Notebook', 'Graphic Animation Node', 'Guided Answer Network'], a: 0, ex: 'Generative Adversarial Network: two networks, a generator and a discriminator, that compete.' },
      { id: 'u4-02-q20', c: 'gan', t: 'match', d: 2, q: 'Match each part of a GAN to its role.', pairs: [['Generator', 'Creates fake samples from random noise'], ['Discriminator', 'Judges whether a sample is real or fake'], ['Training data', 'The real examples the fakes are compared with'], ['Feedback', 'Tells each network how to improve']], ex: 'The generator creates, the discriminator judges against real data, and feedback improves both.' },
      { id: 'u4-02-q21', c: 'gan', t: 'mcq', d: 1, q: 'In a GAN, what does the discriminator do?', o: ['Judges whether each sample is real or generated', 'Creates brand-new images starting from random noise', 'Writes the text prompt that the generator must follow', 'Stores every real image so they can be copied later'], a: 0, ex: 'The discriminator is the detective: it labels samples as real or fake.' },
      { id: 'u4-02-q22', c: 'gan', t: 'mcq', d: 2, q: 'How does the generator in a GAN improve?', o: ['It learns from which of its fakes the discriminator caught', 'A human artist redraws its images by hand every round', 'It simply copies the discriminator’s answers each round', 'It stops changing once it has made its very first image'], a: 0, mis: { 2: 'The discriminator does not give answers to copy; its judgements are feedback the generator learns from.' }, ex: 'Feedback on caught fakes shows the generator what looked wrong, so its next fakes are more realistic.' },
      { id: 'u4-02-q23', c: 'gan', t: 'tf', d: 2, q: 'In a GAN, the generator and discriminator compete, and both get better over time.', a: true, ex: '“Adversarial” means opponents. Each improves in response to the other.' },
      { id: 'u4-02-q24', c: 'gan', t: 'mcq', d: 3, q: 'After long training, a GAN’s discriminator is right only about half the time. What does this suggest?', o: ['The fakes are now so realistic that it is basically guessing', 'The discriminator has become better than ever at spotting fakes', 'The generator has stopped producing any new images at all', 'The real training data has been deleted from the computer'], a: 0, mis: { 1: 'If it were better at spotting fakes, it would be right far more than half the time.' }, ex: 'Being right about 50% of the time is like tossing a coin — the fakes are hard to tell apart from real data.' },
      { id: 'u4-02-q25', c: 'gan', t: 'mcq', d: 3, q: 'Which analogy best matches how a GAN works?', o: ['A forger makes fake paintings, an expert spots them, and each improves', 'A teacher reads out the answers and the students copy them down', 'Two students share one notebook between them to save paper', 'A librarian sorts the books on a shelf by the colour of their covers'], a: 0, mis: { 1: 'Copying answers involves no competition. A GAN has two opponents pushing each other to improve.' }, ex: 'The forger is the generator and the expert is the discriminator; their contest drives both to improve.' },
      { id: 'u4-02-q26', c: 'gan', t: 'order', d: 2, q: 'Put one round of GAN training in order.', items: ['The generator turns random noise into fake samples', 'The discriminator receives real samples and fakes', 'The discriminator labels each one real or fake', 'Both networks get feedback and adjust', 'The round repeats, thousands of times'], ex: 'Generate, mix, judge, learn, repeat — this loop makes both networks better.' },
      { id: 'u4-02-q27', c: 'diffusion', t: 'mcq', d: 1, q: 'Diffusion models create images by…', o: ['starting from random noise and removing it step by step', 'cutting out parts of real photos and joining them together', 'letting a discriminator network draw the final picture', 'tracing carefully over the lines of an existing drawing'], a: 0, ex: 'A diffusion model begins with pure noise and gradually removes it, guided by the prompt, until an image forms.' },
      { id: 'u4-02-q28', c: 'diffusion', t: 'order', d: 2, q: 'Put the life of a diffusion model in order, from training to generating.', items: ['Take a real training image', 'Add noise again and again until it is pure noise', 'Train the model to undo each small noise step', 'Later, start from fresh random noise and remove it step by step'], ex: 'In training, it learns to undo added noise. When generating, it applies that skill to fresh noise.' },
      { id: 'u4-02-q29', c: 'diffusion', t: 'tf', d: 1, q: 'During training, a diffusion model learns to remove noise from images that had noise added to them.', a: true, ex: 'Training images are gradually made noisy, and the model learns to reverse each step.' },
      { id: 'u4-02-q30', c: 'diffusion', t: 'mcq', d: 2, q: 'Why does a diffusion model give a different picture each time for the same prompt?', o: ['Each run starts from different random noise', 'It forgets the prompt halfway through', 'It downloads a different photo each time', 'The prompt is changed by the computer before use'], a: 0, mis: { 2: 'It does not download photos. The variety comes from the random starting noise.' }, ex: 'The starting noise is random, so the same prompt leads to a different final image each time.' },
      { id: 'u4-02-q31', c: 'diffusion', t: 'multi', d: 3, q: 'Which statements about diffusion models are true? Select all that apply.', o: ['They begin from random noise', 'They improve the image over many small steps', 'A text prompt can guide what appears', 'They cut and paste parts of stored photos', 'They need a discriminator to judge each image'], a: [0, 1, 2], ex: 'Diffusion turns noise into an image step by step, guided by the prompt. Cutting and pasting is not how it works, and the discriminator belongs to GANs.' },
      { id: 'u4-02-q32', c: 'learn-patterns', t: 'mcq', d: 3, q: 'A chatbot whose training data ends in 2023, with no web search, is asked who won a match played last week. What is likely?', o: ['It may not know, or may invent an answer, as the match isn’t in its data', 'It will give the correct winner, because AI always knows everything', 'It will quickly watch a video of the match to find out the result', 'It will refuse to answer any question about sports ever again'], a: 0, mis: { 1: 'A model only knows patterns from its training data. Without search, recent events are unknown to it.' }, ex: 'Models learn from their training data. Events after that are missing, so the model may say it does not know — or may hallucinate an answer.' }
    ]
  }
  ,
  {
    id: 'u4-03',
    title: 'Types and Examples of Generative AI',
    minutes: 50,
    outcomes: [
      'Classify generative AI by the type of output it creates (text, image, audio, video, code)',
      'Describe the main types of generative models: GANs, VAEs, RNNs and transformers (LLMs), and diffusion models',
      'Name examples of generative AI tools and choose a suitable kind of tool for a task'
    ],
    hook: 'ChatGPT, Midjourney, Copilot — they all “generate”, but under the hood they can be very different machines.',
    concepts: {
      'type-output': 'Types of generative AI by output',
      'type-model': 'Types of generative AI by model',
      'tools': 'Generative AI tools and what they make',
      'pick-type': 'Choosing the right kind of tool for a task'
    },
    steps: [
      { kind: 'card', title: 'Two ways to sort generative AI', html: `
  <p>You can sort vehicles in two ways: by <b>what they carry</b> (passengers or goods) or by <b>what drives them</b> (petrol, diesel or electric). Both are useful; they answer different questions.</p>
  <p>Generative AI is the same:</p>
  <div class="cols">
  <div class="mini"><h4>By output</h4><p>What does it make? Text, image, audio, video or code.</p></div>
  <div class="mini"><h4>By model</h4><p>How does it work inside? GAN, VAE, RNN or transformer, or diffusion.</p></div>
  </div>
  <p>As a user, you usually choose a tool by its <b>output</b>. To understand how it works — and why it makes certain mistakes — you need to know its <b>model</b>.</p>` },
      { kind: 'card', title: 'Types by output', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Output</th><th>What it does</th><th>Example use</th></tr></thead>
  <tbody>
  <tr><td>Text</td><td>Writes, summarises, translates, answers</td><td>Summarising a chapter</td></tr>
  <tr><td>Image</td><td>Creates or edits pictures from prompts</td><td>Designing a fest poster</td></tr>
  <tr><td>Audio</td><td>Makes music, sound effects or speech</td><td>A voice-over for a video</td></tr>
  <tr><td>Video</td><td>Makes short clips from text or images</td><td>A 10-second animation</td></tr>
  <tr><td>Code</td><td>Suggests or writes program code</td><td>Finishing a Python loop</td></tr>
  </tbody></table></div>
  <p>Text-to-speech is a common audio example: it turns written text into natural-sounding speech, which helps people with low vision or those who prefer listening.</p>` },
      { kind: 'card', title: 'One tool, many outputs', html: `
  <p>Some tools work with several kinds of content. Chatbots such as ChatGPT and Gemini can read and produce text, understand images you upload, and create images too. Tools like these are called <b>multimodal</b>.</p>
  <p>To choose a tool, start from the <b>output you need</b>:</p>
  <div class="eg"><b>Example</b> A science club wants (1) quiz questions on photosynthesis, (2) a labelled-leaf style illustration and (3) a small program that scores the quiz. That is <b>text</b>, then an <b>image</b>, then <b>code</b>.</div>
  <div class="warn"><b>Careful</b> A code assistant is the wrong tool for a poster, and an image generator is the wrong tool for an essay. Match the tool to the output.</div>` },
      { kind: 'check', concepts: ['type-output', 'pick-type'], n: 3 },
      { kind: 'card', title: 'GANs and VAEs', html: `
  <div class="cols">
  <div class="mini"><h4>GAN</h4><p><b>Generative Adversarial Network.</b> A generator creates samples and a discriminator judges real vs fake; they improve by competing. Known for very realistic images, such as faces of people who do not exist. GAN Paint uses a GAN.</p></div>
  <div class="mini"><h4>VAE</h4><p><b>Variational Autoencoder.</b> An encoder squeezes each example into a short list of numbers — a compressed representation. A decoder turns such lists back into examples. Picking new points in that compressed space and decoding them creates new, similar examples.</p></div>
  </div>
  <div class="eg"><b>VAE example</b> Trained on thousands of handwritten digits, a VAE can produce new “3”s in many handwriting styles by decoding nearby points in its compressed space.</div>` },
      { kind: 'card', title: 'RNNs, transformers and LLMs', html: `
  <p>Text, music and speech are <b>sequences</b> — one item after another.</p>
  <ul>
  <li><b>RNN</b> (Recurrent Neural Network): reads a sequence one step at a time, carrying a memory of what came before. Used in earlier text and music generators, but it tends to forget the start of long passages.</li>
  <li><b>Transformer</b>: looks at all the words in the context together and works out which ones matter most for predicting the next token (this is called <b>attention</b>). It handles long text much better.</li>
  <li><b>LLM</b> (Large Language Model): a very large model, usually a transformer, trained on huge amounts of text.</li>
  </ul>
  <div class="eg"><b>Fact</b> The “GPT” in ChatGPT stands for <b>Generative Pre-trained Transformer</b>.</div>` },
      { kind: 'card', title: 'Diffusion models', html: `
  <p><b>Diffusion models</b> generate images by starting from random noise and removing it step by step, guided by a text prompt. They learned this by practising on training images that had noise added to them.</p>
  <p>Diffusion is behind many of today’s popular image generators, including Stable Diffusion and OpenAI’s DALL·E 3. The same idea is also being used to generate video and audio.</p>
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Model</th><th>Key idea</th><th>Often used for</th></tr></thead>
  <tbody>
  <tr><td>GAN</td><td>Generator vs discriminator</td><td>Realistic images</td></tr>
  <tr><td>VAE</td><td>Compress, then decode new samples</td><td>Variations of examples</td></tr>
  <tr><td>RNN / Transformer (LLM)</td><td>Predict the next token in a sequence</td><td>Text, code, music</td></tr>
  <tr><td>Diffusion</td><td>Noise → image, step by step</td><td>Images, video</td></tr>
  </tbody></table></div>` },
      { kind: 'check', concepts: ['type-model'], n: 3 },
      { kind: 'card', title: 'Tools you will hear about', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Tool</th><th>Made by</th><th>Mainly creates</th></tr></thead>
  <tbody>
  <tr><td>ChatGPT</td><td>OpenAI</td><td>Text (also images, voice)</td></tr>
  <tr><td>Gemini</td><td>Google</td><td>Text (also images)</td></tr>
  <tr><td>DALL·E</td><td>OpenAI</td><td>Images</td></tr>
  <tr><td>Midjourney</td><td>Midjourney</td><td>Images</td></tr>
  <tr><td>Adobe Firefly</td><td>Adobe</td><td>Images, inside design apps</td></tr>
  <tr><td>GitHub Copilot</td><td>GitHub</td><td>Code suggestions</td></tr>
  </tbody></table></div>
  <p>There are also many <b>music and voice generators</b> that create tunes or natural speech from text. Adobe says Firefly was trained on licensed content, such as Adobe Stock, and public-domain content.</p>
  <div class="warn"><b>Careful</b> Tools change quickly and add new features. Learn the <i>types</i>; names come and go.</div>` },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>Mixing up the two sorts</b> “Image” is an output type; “diffusion” is a model type. A diffusion model can be an image tool.</div>
  <div class="warn"><b>“Each tool does one thing.”</b> Multimodal tools handle text and images, sometimes audio too.</div>
  <div class="warn"><b>“GPT is a type of image model.”</b> GPT is a transformer that generates text one token at a time.</div>
  <div class="warn"><b>“The discriminator is a separate app.”</b> Generator and discriminator are two parts of one GAN.</div>
  <div class="warn"><b>Wrong tool for the job</b> Decide the output first, then pick the tool.</div>` },
      { kind: 'check', concepts: ['tools', 'type-model'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u4-03-q01', c: 'type-output', t: 'mcq', d: 1, q: 'Classifying generative AI “by output” means sorting it by…', o: ['the kind of content it creates, such as text or images', 'the company that built the tool and sells it to users', 'the price you have to pay to use the app every month', 'the country where the tool was first built'], a: 0, ex: 'By output = by what it makes. The other way to sort is by model — how it works inside.' },
      { id: 'u4-03-q02', c: 'type-output', t: 'match', d: 2, q: 'Match each output type to an example use.', pairs: [['Text', 'Summarising a chapter'], ['Image', 'Designing a fest poster'], ['Audio', 'Creating a voice-over'], ['Video', 'Making a short animated clip'], ['Code', 'Writing a Python function']], ex: 'Each use needs a different kind of generated content.' },
      { id: 'u4-03-q03', c: 'type-output', t: 'multi', d: 2, q: 'Which could a generative AI tool produce? Select all that apply.', o: ['A new song melody', 'A short story', 'A Python function', 'A guaranteed-correct medical diagnosis', 'A real photograph of a past event'], a: [0, 1, 2], ex: 'Melodies, stories and code are generated content. Nothing it makes is guaranteed correct, and a generated image is never a real photograph of an event.' },
      { id: 'u4-03-q04', c: 'type-output', t: 'tf', d: 1, q: 'Some generative AI tools can work with more than one kind of content, such as text and images.', a: true, ex: 'Such tools are called multimodal — for example, chatbots that can read images and create them.' },
      { id: 'u4-03-q05', c: 'type-output', t: 'mcq', d: 2, q: 'A tool turns a typed paragraph into natural-sounding speech in Tamil. What type of output is this?', o: ['Audio', 'Text', 'Image', 'Code'], a: 0, mis: { 1: 'The input is text, but the output — what it creates — is speech, which is audio.' }, ex: 'Text-to-speech creates spoken audio.' },
      { id: 'u4-03-q06', c: 'type-output', t: 'mcq', d: 3, q: 'A science club wants (1) a quiz on photosynthesis, (2) an illustration of a leaf and (3) a small program to score the quiz. Which output types does it need, in order?', o: ['Text, image, code', 'Image, text, audio', 'Code, video, text', 'Audio, image, code'], a: 0, mis: { 1: 'The quiz is text and the scorer is code; nothing here needs audio.' }, ex: 'Quiz questions are text, the illustration is an image, and the scoring program is code.' },
      { id: 'u4-03-q07', c: 'type-model', t: 'mcq', d: 1, q: 'Which type of generative model has a generator and a discriminator?', o: ['GAN', 'VAE', 'Diffusion model', 'Transformer'], a: 0, ex: 'A Generative Adversarial Network pits a generator against a discriminator.' },
      { id: 'u4-03-q08', c: 'type-model', t: 'match', d: 2, q: 'Match each model type to how it works.', pairs: [['GAN', 'A generator and a discriminator compete'], ['VAE', 'Compresses examples, then decodes new ones'], ['RNN', 'Reads a sequence one step at a time with a memory'], ['Transformer', 'Uses attention over all the words to predict the next token'], ['Diffusion', 'Removes noise step by step to form an image']], ex: 'These are the main generative model families you need for Class 9.' },
      { id: 'u4-03-q09', c: 'type-model', t: 'mcq', d: 1, q: 'What does “GPT” in ChatGPT stand for?', o: ['Generative Pre-trained Transformer', 'General Purpose Text Translator', 'Graphical Picture Template', 'Generated Prompt Technology'], a: 0, ex: 'GPT = Generative Pre-trained Transformer: a transformer model pre-trained on huge amounts of text.' },
      { id: 'u4-03-q10', c: 'type-model', t: 'mcq', d: 2, q: 'A VAE (Variational Autoencoder) creates new examples by…', o: ['squeezing examples into short number lists and decoding new ones', 'having two networks compete with each other as forger and detective', 'starting with pure noise and removing it over many steps', 'predicting the next word in a sentence, one at a time'], a: 0, mis: { 1: 'That describes a GAN.', 2: 'That describes a diffusion model.' }, ex: 'A VAE encodes data into a compressed representation and decodes new samples from it.' },
      { id: 'u4-03-q11', c: 'type-model', t: 'mcq', d: 2, q: 'Which type of model is behind large language models such as those used in ChatGPT and Gemini?', o: ['Transformer', 'GAN', 'Diffusion model', 'Decision tree'], a: 0, mis: { 1: 'GANs are best known for images. Large language models are built on transformers.', 3: 'A decision tree is a rule-based model, not a generative language model.' }, ex: 'Modern LLMs are transformers trained on huge amounts of text to predict the next token.' },
      { id: 'u4-03-q12', c: 'type-model', t: 'tf', d: 2, q: 'An RNN processes a sequence one step at a time, carrying a memory of what came before.', a: true, ex: 'That is how a recurrent neural network works — which is also why it can forget the start of long passages.' },
      { id: 'u4-03-q13', c: 'type-model', t: 'mcq', d: 3, q: 'An app creates pictures by starting with static-like noise that sharpens into an image over 30 steps. Which model type is it most likely using?', o: ['A diffusion model', 'A GAN with a discriminator', 'An RNN text model', 'A VAE (autoencoder)'], a: 0, mis: { 1: 'A GAN’s generator produces an image in one go and has a discriminator; step-by-step denoising is diffusion.', 2: 'RNNs generate sequences like text, not images by denoising.' }, ex: 'Starting from noise and refining over many steps is the signature of diffusion.' },
      { id: 'u4-03-q14', c: 'type-model', t: 'mcq', d: 3, q: 'A researcher wants new handwritten-digit images in many styles by learning a compressed “map” of handwriting and picking new points on it. Which model fits best?', o: ['VAE', 'GAN', 'RNN', 'Transformer'], a: 0, mis: { 1: 'A GAN can make digits too, but learning a compressed map and decoding points from it describes a VAE.' }, ex: 'Encoding into a compressed space and decoding new points from it is exactly how a Variational Autoencoder generates.' },
      { id: 'u4-03-q15', c: 'type-model', t: 'bins', d: 3, q: 'Sort each description by model type.', bins: ['GAN', 'Transformer (LLM)', 'Diffusion'], items: [['A generator tries to fool a discriminator', 0], ['Predicts the next token using attention over the whole text', 1], ['Starts from noise and removes it step by step', 2], ['GAN Paint adds trees and doors to a photo', 0], ['Writes a summary of a long chapter', 1], ['Stable Diffusion creates an image from a prompt', 2]], ex: 'Competition = GAN; next-token prediction with attention = transformer; denoising = diffusion.' },
      { id: 'u4-03-q16', c: 'tools', t: 'mcq', d: 1, q: 'Which of these is mainly a text chatbot?', o: ['ChatGPT', 'Midjourney', 'Adobe Firefly', 'DALL·E'], a: 0, ex: 'ChatGPT is a chatbot built on a large language model. The other three are image generators.' },
      { id: 'u4-03-q17', c: 'tools', t: 'match', d: 2, q: 'Match each tool to what it mainly creates.', pairs: [['ChatGPT', 'Chat-style text answers'], ['Midjourney', 'Images from text prompts'], ['GitHub Copilot', 'Code suggestions while programming'], ['A text-to-speech generator', 'Spoken audio from written text']], ex: 'Each tool is mainly known for one kind of output, though many now do more.' },
      { id: 'u4-03-q18', c: 'tools', t: 'mcq', d: 1, q: 'Which company makes Gemini?', o: ['Google', 'Adobe', 'OpenAI', 'Midjourney'], a: 0, mis: { 2: 'OpenAI makes ChatGPT and DALL·E. Gemini is from Google.' }, ex: 'Gemini is Google’s family of generative AI models and its chatbot.' },
      { id: 'u4-03-q19', c: 'tools', t: 'mcq', d: 1, q: 'Which company makes Firefly, an image generator built into its design apps?', o: ['Adobe', 'Google', 'OpenAI', 'GitHub'], a: 0, ex: 'Adobe Firefly is Adobe’s image generator, available in apps such as Photoshop.' },
      { id: 'u4-03-q20', c: 'tools', t: 'tf', d: 2, q: 'DALL·E and Midjourney are tools mainly used to generate images from text prompts.', a: true, ex: 'Both are text-to-image generators.' },
      { id: 'u4-03-q21', c: 'tools', t: 'multi', d: 2, q: 'Which of these are mainly image generators? Select all that apply.', o: ['DALL·E', 'Midjourney', 'Adobe Firefly', 'GitHub Copilot', 'Google Maps'], a: [0, 1, 2], ex: 'DALL·E, Midjourney and Firefly create images. Copilot suggests code, and Google Maps is a navigation app.' },
      { id: 'u4-03-q22', c: 'tools', t: 'mcq', d: 3, q: 'Which statement about generative AI tools is accurate?', o: ['One tool can create several types, e.g. chatbots that make images', 'Every tool can only ever produce one single kind of output', 'Image generators always copy one real photograph from the web', 'Chatbots can only answer questions about computers and coding'], a: 0, mis: { 1: 'Many tools are multimodal. ChatGPT and Gemini, for instance, work with both text and images.', 2: 'Image generators create new images from learned patterns.' }, ex: 'Multimodal tools work across text, images and sometimes audio, so one tool can fall under several output types.' },
      { id: 'u4-03-q23', c: 'pick-type', t: 'mcq', d: 1, q: 'Riya needs a colourful poster for the school science fair. Which kind of generative AI tool fits best?', o: ['An image generator', 'A code assistant', 'A music generator', 'A text-to-speech tool'], a: 0, ex: 'A poster is a picture, so an image generator is the right tool.' },
      { id: 'u4-03-q24', c: 'pick-type', t: 'mcq', d: 2, q: 'Arjun’s Python loop keeps running forever and he wants a suggested fix. Which kind of tool fits best?', o: ['A code assistant', 'An image generator', 'A music generator', 'A text-to-video tool'], a: 0, mis: { 1: 'An image generator makes pictures, not program code.' }, ex: 'Code assistants suggest and explain program code — though Arjun should still understand and test the fix.' },
      { id: 'u4-03-q25', c: 'pick-type', t: 'mcq', d: 3, q: 'Your grandmother cannot read small print. You want a letter from her cousin read aloud to her in Marathi. Which kind of tool fits best?', o: ['A text-to-speech (audio) generator', 'An image generator for bigger text', 'A code assistant for programs', 'A video game about letters'], a: 0, mis: { 1: 'A bigger picture would not help if reading is hard; turning the text into speech would.' }, ex: 'Text-to-speech turns written text into spoken audio — an accessibility benefit of generative AI.' },
      { id: 'u4-03-q26', c: 'pick-type', t: 'bins', d: 2, q: 'Sort each task by the output type it needs.', bins: ['Text', 'Image', 'Audio'], items: [['Draft a thank-you note to the bus driver', 0], ['Illustrate a story about a clever crow', 1], ['Create background music for a skit', 2], ['Summarise a news article', 0], ['Design a mascot for the eco club', 1], ['Read a chapter aloud for a classmate with low vision', 2]], ex: 'Notes and summaries are text; illustrations and mascots are images; music and read-aloud are audio.' },
      { id: 'u4-03-q27', c: 'pick-type', t: 'mcq', d: 3, q: 'A team wants a 30-second animated advert for its school fete. Which kind of tool fits best?', o: ['A text-to-video generator', 'A text chatbot on its own', 'A code assistant tool', 'A spreadsheet program'], a: 0, mis: { 1: 'A chatbot can help write the script, but the advert itself is a moving clip — video.' }, ex: 'An animated advert is video, so a text-to-video tool fits. A chatbot could help with the script first.' },
      { id: 'u4-03-q28', c: 'pick-type', t: 'tf', d: 2, q: 'To create a picture of a new school logo, a code assistant is the best tool.', a: false, ex: 'A logo is an image, so an image generator fits. Code assistants are for program code.' },
      { id: 'u4-03-q29', c: 'type-output', t: 'mcq', d: 2, q: 'Text-to-video tools create…', o: ['short moving clips from a written description', 'printed books from a video you upload', 'spreadsheets from a photograph of a table', 'secure passwords from a typed sentence'], a: 0, mis: { 1: 'The direction is reversed: text goes in, video comes out.' }, ex: 'They take a text prompt and generate a short video clip.' },
      { id: 'u4-03-q30', c: 'type-model', t: 'tf', d: 1, q: 'Diffusion models create images by gradually removing noise.', a: true, ex: 'They start from random noise and refine it step by step into an image.' },
      { id: 'u4-03-q31', c: 'tools', t: 'mcq', d: 3, q: 'Adobe says Firefly was trained on licensed content, such as Adobe Stock, and public-domain content. Why might a designer care about this?', o: ['It aims to reduce worries about using artists’ work without permission', 'It means Firefly’s images can never contain any mistakes or errors at all', 'It makes Firefly faster than every other image tool available', 'It means Firefly can create only black-and-white images'], a: 0, mis: { 1: 'Training data choices are about permission and copyright, not about avoiding every error.' }, ex: 'Training on licensed and public-domain material is Adobe’s way of addressing copyright concerns, which matter for commercial design.' },
      { id: 'u4-03-q32', c: 'pick-type', t: 'mcq', d: 3, q: 'Meera wants help brainstorming lines for a Hindi poem about the monsoon, and then wants to turn the poem into a song tune. Which tools fit, in order?', o: ['A text generator, then a music generator', 'An image generator, then a code assistant', 'A music generator, then an image generator', 'A code assistant, then a text-to-video tool'], a: 0, mis: { 2: 'The poem must come first, and it is text.' }, ex: 'Brainstorming poem lines needs text output; turning it into a tune needs audio (music) output.' }
    ]
  }
  ,
  {
    id: 'u4-04',
    title: 'Benefits, Limitations and GAN Paint',
    minutes: 60,
    outcomes: [
      'Describe the benefits of using generative AI',
      'Explain the limitations of generative AI, including hallucination, bias and lack of true understanding',
      'Apply a generative AI tool (GAN Paint) to create content and explain what it shows about GANs'
    ],
    hook: 'The same tool that can draft your speech in seconds can also invent a fact with total confidence. Learn to use the first and catch the second.',
    concepts: {
      'benefits': 'Benefits of generative AI',
      'hallucination': 'Hallucinations: confident but false',
      'bias-understanding': 'Bias and no true understanding',
      'other-limits': 'Copyright, deepfakes, privacy, energy and over-dependence',
      'gan-paint': 'GAN Paint (MIT-IBM Watson AI Lab)'
    },
    steps: [
      { kind: 'card', title: 'What generative AI is good for', html: `
  <div class="cols">
  <div class="mini"><h4>💡 Creativity support</h4><p>Brainstorm themes, slogans or story ideas when you are stuck.</p></div>
  <div class="mini"><h4>⚡ Speed</h4><p>Get a first draft of a notice, poster or set of practice questions in seconds.</p></div>
  <div class="mini"><h4>🎯 Personalised learning</h4><p>Ask for an explanation at your level, with your own examples, as many times as you need.</p></div>
  <div class="mini"><h4>♿ Accessibility</h4><p>Text-to-speech, translation and simpler wording help people with low vision, reading difficulties or a different home language.</p></div>
  </div>
  <p>It is also useful for <b>prototyping</b>: quickly mocking up an app screen, a logo idea or a product sketch to test before spending time on the real thing.</p>` },
      { kind: 'card', title: 'Benefits in everyday India', html: `
  <div class="eg"><b>School</b> A teacher in a small school with no art teacher shows students examples of Warli-style patterns, then the students draw their own.</div>
  <div class="eg"><b>Shop</b> A shop owner in Jaipur drafts a menu card in Hindi and English in minutes — then checks every price and spelling before printing.</div>
  <div class="eg"><b>Home</b> A student turns a school circular into spoken Marathi for a grandparent who finds small print hard to read.</div>
  <p>Notice the pattern: the AI makes a <b>quick first version</b>, and a person <b>checks and improves</b> it.</p>
  <div class="key"><b>Key idea</b> Generative AI works best as an assistant that speeds you up — not as a replacement for your own judgement.</div>` },
      { kind: 'check', concepts: ['benefits'], n: 2 },
      { kind: 'card', title: 'Limitation 1: hallucinations', html: `
  <div class="def"><dfn>Hallucination</dfn> A confident-sounding output from generative AI that is false or made up.</div>
  <p>Ask a chatbot where the Konark Sun Temple is, and it will very likely say Odisha — correct. But on a less common question, it may invent a date, a quotation, a book or a statistic, and state it just as confidently.</p>
  <p>Why? A language model produces <b>likely-sounding</b> text. It is not checking each fact against a trusted record. Usually likely is right; sometimes it is not.</p>
  <div class="warn"><b>Careful</b> AI does not sound less sure when it is wrong. Check names, numbers, dates and references in reliable sources — especially for school work, health or money.</div>` },
      { kind: 'card', title: 'Limitation 2: bias and no true understanding', html: `
  <p><b>Bias</b>: generative AI learns from data made by people, and that data contains stereotypes and gaps. Ask some image tools for “a doctor” and you may mostly get men; ask for “a nurse” and mostly women. Villages, regional languages or particular communities may be shown inaccurately because they were rare in the data.</p>
  <p><b>No true understanding</b>: the model works with patterns, not meaning. It can write a fine essay on kindness without knowing what kindness feels like, or solve a hard-looking problem but fail a simple common-sense riddle.</p>
  <div class="key"><b>Key idea</b> Generative AI can repeat unfair patterns from its data, and it does not understand the world as people do. Human review is essential.</div>` },
      { kind: 'card', title: 'More limitations to know', html: `
  <div class="tblwrap"><table class="tbl">
  <thead><tr><th>Limitation</th><th>What it means</th></tr></thead>
  <tbody>
  <tr><td>Copyright and ownership</td><td>Models learn from existing works; outputs may closely resemble someone’s work, and the rules on who owns AI output are still being decided.</td></tr>
  <tr><td>Deepfakes and misinformation</td><td>Realistic fake images, audio or video of real people can mislead and harm.</td></tr>
  <tr><td>Privacy risks</td><td>Personal details you type or upload may be stored by the service.</td></tr>
  <tr><td>High energy use</td><td>Training and running large models uses a lot of electricity, and data centres also use water for cooling.</td></tr>
  <tr><td>Over-dependence</td><td>Letting AI do all the thinking can weaken your own skills.</td></tr>
  </tbody></table></div>` },
      { kind: 'check', concepts: ['hallucination', 'bias-understanding', 'other-limits'], n: 3 },
      { kind: 'card', title: 'GAN Paint', html: `
  <p><b>GAN Paint</b> is a research demo from the <b>MIT-IBM Watson AI Lab</b>. You start with a picture of a scene — often a building — and choose a “brush” such as <b>tree</b>, <b>grass</b>, <b>door</b>, <b>sky</b> or <b>cloud</b>.</p>
  <p>When you paint, you are not adding pixels of colour. You are telling the GAN “put more <i>tree</i> here”. The GAN then <b>draws</b> realistic trees that fit the scene’s lighting and perspective.</p>
  <p>The surprising part: context matters. Paint “door” on a wall and a door appears. Paint “door” in the sky and the GAN typically won’t draw a realistic door there — it learned that doors belong on buildings.</p>
  <p>The <b>erase</b> brush removes objects, and the GAN fills the gap with what plausibly lies behind.</p>` },
      { kind: 'lab', lab: 'gan-paint', title: 'GAN Paint', intro: 'Paint trees, grass, clouds, doors and windows onto a landscape. Try putting things in the wrong place and see how a GAN that has learned context responds.' },
      { kind: 'card', title: 'What GAN Paint teaches', html: `
  <p>Researchers behind GAN Paint found that, inside a trained GAN, particular parts of the network respond to particular <b>concepts</b> — one group to trees, another to doors, another to domes. Switching those parts on or off adds or removes the object.</p>
  <ul>
  <li>The GAN has learned <b>what objects look like</b> from training data.</li>
  <li>It has also learned <b>where objects usually appear</b> — grass on the ground, clouds in the sky.</li>
  <li>The objects are <b>generated</b>, not pasted from a library of stock pictures.</li>
  </ul>
  <div class="warn"><b>Careful</b> The same power to edit a photo realistically is what makes manipulated images possible. Tools like this are fun and educational — and a reason to be cautious about any picture you see online.</div>` },
      { kind: 'card', title: 'Using generative AI tools wisely', html: `
  <ol class="flow">
  <li><b>Check the rules</b><span>Many tools set a minimum age (often 13) and need a parent’s permission for users under 18. Follow your school’s policy too.</span></li>
  <li><b>Prompt clearly</b><span>Say what you want, for whom, in what style and length.</span></li>
  <li><b>Improve step by step</b><span>Ask follow-up questions; refine the result.</span></li>
  <li><b>Check everything</b><span>Facts, numbers, names, spellings, and fairness.</span></li>
  <li><b>Make it yours and say so</b><span>Add your own thinking, and mention how you used AI.</span></li>
  </ol>
  <p>Never type passwords, OTPs, Aadhaar numbers or other personal details into a chatbot.</p>` },
      { kind: 'check', concepts: ['gan-paint', 'benefits'], n: 2 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u4-04-q01', c: 'benefits', t: 'mcq', d: 1, q: 'Which is a benefit of generative AI?', o: ['Helping people create first drafts and ideas quickly', 'Guaranteeing that every answer it gives is correct', 'Removing the need for anyone to learn new skills', 'Running very large models without using any electricity'], a: 0, ex: 'Speed and creativity support are real benefits. GenAI is not always correct, does not replace learning, and uses a lot of energy.' },
      { id: 'u4-04-q02', c: 'benefits', t: 'match', d: 2, q: 'Match each benefit to an example.', pairs: [['Creativity support', 'Brainstorming themes for Annual Day'], ['Speed', 'Drafting ten practice questions in seconds'], ['Personalised learning', 'Explaining a topic at your level with your examples'], ['Accessibility', 'Reading text aloud for a student with low vision'], ['Prototyping', 'Quickly mocking up an app screen to test an idea']], ex: 'These are the main benefits of generative AI, each shown in a real use.' },
      { id: 'u4-04-q03', c: 'benefits', t: 'multi', d: 2, q: 'Which are genuine benefits of generative AI? Select all that apply.', o: ['Translating a school notice into several Indian languages quickly', 'Generating practice questions on a topic', 'Reading text aloud for a student with dyslexia', 'Guaranteeing that every fact is correct', 'Removing the need to learn anything yourself'], a: [0, 1, 2], ex: 'Translation, practice questions and text-to-speech are real benefits. GenAI can be wrong, and relying on it for everything weakens your own skills.' },
      { id: 'u4-04-q04', c: 'benefits', t: 'mcq', d: 3, q: 'A small school with no art teacher uses generative AI to show students examples of Warli-style patterns before they draw their own. Which benefit is this?', o: ['Creativity support for learning', 'Creating realistic deepfakes', 'Saving electricity and water', 'Protecting data security'], a: 0, mis: { 1: 'Nothing here fakes a real person. The AI is giving examples to inspire students’ own work.' }, ex: 'The AI provides examples and ideas that support students’ own creativity — a creativity and learning benefit.' },
      { id: 'u4-04-q05', c: 'benefits', t: 'tf', d: 1, q: 'Generative AI can make content more accessible, for example by converting text to speech.', a: true, ex: 'Text-to-speech, translation and simpler wording help many people access information.' },
      { id: 'u4-04-q06', c: 'hallucination', t: 'mcq', d: 1, q: 'In generative AI, a <b>hallucination</b> is…', o: ['a confident-sounding output that is false or made up', 'a picture with far too many bright colours in it', 'a slow response caused by a very busy computer server', 'a question that the AI politely refuses to answer'], a: 0, ex: 'Hallucinations are false or invented outputs presented as if they were true.' },
      { id: 'u4-04-q07', c: 'hallucination', t: 'mcq', d: 2, q: 'Why do language models sometimes hallucinate?', o: ['They produce likely-sounding words without checking facts', 'They are deliberately programmed to lie to their users', 'Their screens are too small to show the complete answer', 'They run out of new words after answering many questions'], a: 0, mis: { 1: 'They do not intend to deceive. They produce plausible text, and plausible can be wrong.' }, ex: 'Next-token prediction produces fluent text; without fact-checking, it can invent details.' },
      { id: 'u4-04-q08', c: 'hallucination', t: 'mcq', d: 3, q: 'A chatbot tells Kabir that the Konark Sun Temple is in Kerala. (It is in Odisha.) What is the best lesson?', o: ['Check key facts in reliable sources; AI can be confidently wrong', 'Trust the chatbot, because it has read far more books than Kabir', 'Stop using maps and atlases, because they are often wrong', 'Assume that his geography textbook must be out of date'], a: 0, mis: { 1: 'Reading a lot does not stop a model from producing false statements.', 3: 'The textbook is right here. The AI made the error.' }, ex: 'The answer is a hallucination. A quick check in a textbook or reliable website catches it.' },
      { id: 'u4-04-q09', c: 'hallucination', t: 'tf', d: 2, q: 'Hallucinations are easy to spot because the AI always sounds unsure when it is wrong.', a: false, ex: 'AI usually sounds just as confident when it is wrong, which is what makes hallucinations risky.' },
      { id: 'u4-04-q10', c: 'hallucination', t: 'mcq', d: 2, q: 'Rohan’s essay includes three references a chatbot suggested. What should he do?', o: ['Find each source himself and check that it says what is claimed', 'Copy them exactly as they are, since chatbots never invent sources', 'Remove the author names so that nobody can check the references', 'Ask the same chatbot for two more references and add those too'], a: 0, mis: { 1: 'Chatbots can invent realistic-looking references. Each one must be checked.' }, ex: 'Made-up references are a common hallucination. Only cite sources you have actually found and read.' },
      { id: 'u4-04-q11', c: 'bias-understanding', t: 'mcq', d: 2, q: 'An image generator draws “a doctor” as a man almost every time. This is an example of…', o: ['bias learned from training data', 'a hallucination about a fact', 'the high energy use of AI', 'a breach of patient privacy'], a: 0, mis: { 1: 'A hallucination is a false statement of fact. This is a pattern of unfair representation — bias.' }, ex: 'If the training data showed doctors mostly as men, the model repeats that stereotype. That is bias.' },
      { id: 'u4-04-q12', c: 'bias-understanding', t: 'mcq', d: 1, q: 'Does generative AI truly understand what it writes?', o: ['No — it works with patterns, not meaning as people experience it', 'Yes — it understands everything exactly as a human does', 'Yes — but it understands meaning only when the text is in English', 'No — it cannot produce any sensible text at all'], a: 0, ex: 'Generative AI is powerful at patterns but has no true understanding of meaning, feelings or the real world.' },
      { id: 'u4-04-q13', c: 'bias-understanding', t: 'mcq', d: 3, q: 'A story generator keeps setting stories in big cities and rarely includes village life or regional names. What is the most likely cause?', o: ['Its training data had little village life or regional names', 'Stories are not allowed to be set in villages at all', 'The story generator is broken and must be thrown away at once', 'The user’s phone is too old to show village scenes'], a: 0, mis: { 2: 'It is working as designed — it repeats what was common in its data. Clear prompts and more diverse data help.' }, ex: 'Models reflect their data. Under-represented groups and places appear less often or less accurately — bias from data.' },
      { id: 'u4-04-q14', c: 'bias-understanding', t: 'tf', d: 2, q: 'If the training data contains stereotypes, generative AI can repeat them in what it creates.', a: true, ex: 'Generative AI learns patterns from data, including unfair ones, so it can reproduce stereotypes.' },
      { id: 'u4-04-q15', c: 'other-limits', t: 'bins', d: 2, q: 'Sort each situation by the limitation it shows.', bins: ['Privacy risk', 'Copyright concern', 'Deepfake or misinformation'], items: [['Pasting a friend’s phone number and address into a chatbot', 0], ['Selling posters that copy a living artist’s style and signature', 1], ['A fake video of a minister announcing a holiday', 2], ['Uploading the class photo to an unknown AI app', 0], ['Using an AI song that closely copies a film song’s tune', 1], ['A cloned voice of a relative asking for money', 2]], ex: 'Sharing personal data is a privacy risk; copying creators’ work is a copyright concern; fake media of real people is a deepfake.' },
      { id: 'u4-04-q16', c: 'other-limits', t: 'mcq', d: 2, q: 'Why is energy use counted as a limitation of generative AI?', o: ['Large models need lots of electricity, and data centres use water', 'AI tools only drain the battery of the user’s own phone', 'Generative AI uses no energy at all, so this is not really a limitation', 'Using more energy makes the AI’s answers more accurate'], a: 0, mis: { 1: 'Phones use some power, but the big cost is in the data centres that train and run the models.' }, ex: 'Large models need powerful computers in data centres, which use large amounts of electricity and cooling water.' },
      { id: 'u4-04-q17', c: 'other-limits', t: 'mcq', d: 1, q: 'Over-dependence on generative AI can…', o: ['weaken your own skills if it does all your thinking', 'make your phone screen brighter while you use it', 'improve your handwriting automatically over time', 'stop the AI tool from working after a few weeks'], a: 0, ex: 'If AI always writes, solves and decides for you, you practise less and your own skills weaken.' },
      { id: 'u4-04-q18', c: 'other-limits', t: 'multi', d: 2, q: 'Which are limitations of generative AI? Select all that apply.', o: ['Hallucinations', 'Bias from training data', 'Privacy risks', 'High energy use', 'Producing a quick first draft', 'Translating into many languages'], a: [0, 1, 2, 3], ex: 'Hallucination, bias, privacy and energy use are limitations. Quick drafts and translation are benefits.' },
      { id: 'u4-04-q19', c: 'other-limits', t: 'mcq', d: 3, q: 'A school tells every student to use a chatbot for all homework from day one, with no guidelines. What is the main concern?', o: ['Students may copy without learning and trust wrong facts', 'Chatbots cannot help students with homework in any way at all', 'The school will quickly run out of notebooks and pens', 'Students will learn far too much, far too quickly'], a: 0, mis: { 1: 'Chatbots can help, which is why clear guidelines matter — the risk is misuse, not uselessness.' }, ex: 'Without guidelines, over-dependence and unchecked hallucinations harm learning. Good use needs rules and checking.' },
      { id: 'u4-04-q20', c: 'gan-paint', t: 'mcq', d: 1, q: 'GAN Paint was developed by…', o: ['the MIT-IBM Watson AI Lab', 'the India Meteorological Department', 'a school science club', 'a mobile phone company'], a: 0, ex: 'GAN Paint is a research demo from the MIT-IBM Watson AI Lab.' },
      { id: 'u4-04-q21', c: 'gan-paint', t: 'mcq', d: 1, q: 'In GAN Paint, what happens when you paint with the “tree” brush on the ground of a scene?', o: ['The GAN draws realistic trees that fit the scene', 'Green paint is smeared over that part of the photo', 'A stock photo of a tree is cut out and pasted in', 'The whole picture is deleted and must be reloaded'], a: 0, ex: 'You are telling the GAN to add the concept “tree” there; it generates trees that match the lighting and perspective.' },
      { id: 'u4-04-q22', c: 'gan-paint', t: 'mcq', d: 2, q: 'What typically happens if you paint “door” in the sky in GAN Paint?', o: ['Usually no realistic door appears, as doors belong on buildings', 'A perfect wooden door appears floating in the sky', 'The whole sky turns into one giant wooden door', 'The tool ignores your brush and draws clouds in that place instead'], a: 0, mis: { 1: 'The GAN learned context from real scenes; doors in the sky did not appear in its training data.' }, ex: 'The GAN learned where objects usually appear, so it resists drawing them in places that make no sense.' },
      { id: 'u4-04-q23', c: 'gan-paint', t: 'tf', d: 2, q: 'GAN Paint shows that a GAN has learned what objects look like and where they usually appear in a scene.', a: true, ex: 'It draws objects realistically and respects context — evidence of both kinds of learning.' },
      { id: 'u4-04-q24', c: 'gan-paint', t: 'mcq', d: 3, q: 'What did the researchers behind GAN Paint discover about how a trained GAN works?', o: ['Parts of the network match concepts like “tree”; switching them on adds one', 'The GAN keeps a big folder of tree photos and simply pastes them into the scene', 'The GAN sends each request to a human artist who draws the object', 'The GAN only works on old black-and-white photos of buildings'], a: 0, mis: { 1: 'Objects are generated by the network, not pasted from stored photos.' }, ex: 'Inside the GAN, groups of units match concepts. Turning them up or down adds or removes the object in context.' },
      { id: 'u4-04-q25', c: 'gan-paint', t: 'order', d: 2, q: 'Put the steps of using GAN Paint in order.', items: ['Choose a scene to edit', 'Pick a brush such as tree or grass', 'Paint over an area of the image', 'Watch the GAN draw the object to fit the scene', 'Use erase to remove objects and compare'], ex: 'Choose, pick a brush, paint, observe the GAN’s drawing, then experiment with erasing.' },
      { id: 'u4-04-q26', c: 'gan-paint', t: 'mcq', d: 2, q: 'The trees and doors that appear in GAN Paint are…', o: ['generated by the GAN, not pasted from a picture library', 'cut out of other people’s photos found on the internet', 'drawn by hand by the researchers before the demo began', 'downloaded fresh from the internet every time you paint'], a: 0, mis: { 1: 'A GAN creates from learned patterns; it does not cut out other photos.' }, ex: 'The generator network creates the objects from what it learned in training.' },
      { id: 'u4-04-q27', c: 'benefits', t: 'mcq', d: 2, q: 'What is the best way to use generative AI for a school project?', o: ['Use it to brainstorm, then check facts and write in your own words', 'Submit whatever it writes without reading it', 'Avoid checking anything, since AI is faster', 'Ask it to write the whole project and then remove its mistakes by guessing'], a: 0, mis: { 3: 'You cannot remove mistakes by guessing; you must check against reliable sources.' }, ex: 'Using AI as an assistant — ideas first, then your own checked work — gets the benefits without the risks.' },
      { id: 'u4-04-q28', c: 'other-limits', t: 'mcq', d: 3, q: 'A realistic video of a famous cricketer promoting a betting app goes viral, but the cricketer never made it. Which limitation does this show?', o: ['Deepfakes and misinformation', 'High energy use by data centres', 'Personalised learning', 'Slow processing speed'], a: 0, mis: { 2: 'Personalised learning is a benefit. A fake video of a real person is a deepfake.' }, ex: 'Fake media of a real person, used to mislead, is a deepfake — one of the most serious risks of generative AI.' },
      { id: 'u4-04-q29', c: 'hallucination', t: 'mcq', d: 3, q: 'A student asks a chatbot for last July’s rainfall in her district. It gives a precise number with no source. What should she do?', o: ['Check IMD’s website or another official source first', 'Use it, because such a precise number must be correct', 'Round it off and use it, since rounding fixes any errors', 'Ask the same chatbot again and use whichever number is bigger'], a: 0, mis: { 1: 'Precision is not evidence. A made-up number can look very exact.', 3: 'Asking the same model again does not verify anything.' }, ex: 'Official data comes from sources such as IMD. A chatbot’s number with no source may be a hallucination.' },
      { id: 'u4-04-q30', c: 'bias-understanding', t: 'mcq', d: 2, q: 'A chatbot solves a long algebra problem but fails a simple riddle that needs everyday common sense. What does this show?', o: ['It uses learned patterns and lacks true understanding', 'It is secretly a human typing the answers very fast', 'Riddles are impossible for anyone at all to solve', 'Algebra is easier than common sense for everyone'], a: 0, mis: { 3: 'This is about the AI, not about people. It reveals pattern-matching without real understanding.' }, ex: 'Strong pattern skills can coexist with surprising failures, because the model does not understand the world as people do.' },
      { id: 'u4-04-q31', c: 'other-limits', t: 'tf', d: 1, q: 'Training very large AI models uses large amounts of electricity.', a: true, ex: 'Training runs on many powerful computers for a long time, which uses a lot of energy.' },
      { id: 'u4-04-q32', c: 'benefits', t: 'mcq', d: 3, q: 'A shop owner in Jaipur uses generative AI to make a menu card in Hindi and English. Which statement is right?', o: ['It speeds up drafting and translation, but she must check it', 'It guarantees a perfect menu, so no checking is needed', 'It is useless, because AI tools cannot write in Hindi', 'It means she no longer needs to remember any of her own prices'], a: 0, mis: { 1: 'Speed is the benefit, but AI can make errors — including in prices and spellings.', 2: 'Many tools handle Hindi and other Indian languages, though results still need checking.' }, ex: 'Speed and translation are real benefits; human checking is still essential.' }
    ]
  }
  ,
  {
    id: 'u4-05',
    title: 'Using Generative AI Ethically',
    minutes: 60,
    outcomes: [
      'Understand the ethical considerations of using generative AI',
      'Explain deepfakes, consent, copyright, academic honesty, disclosure and privacy in the context of generative AI',
      'Apply a responsible-use checklist before creating or sharing AI-generated content'
    ],
    hook: 'Making a fake video of a classmate now takes minutes. Deciding not to — and knowing what to do when someone else does — takes character.',
    concepts: {
      'deepfakes': 'Deepfakes and consent',
      'honesty': 'Academic honesty and disclosure',
      'copyright': 'Copyright and ownership',
      'privacy-genai': 'Privacy when using generative AI',
      'verify': 'Verify before you trust or share',
      'checklist': 'The responsible-use checklist'
    },
    steps: [
      { kind: 'card', title: 'Power to create, duty to care', html: `
  <p>Ayaan’s class is making posters for Road Safety Week. One student uses an image generator to design a striking poster and credits the tool. Another makes an AI image of a famous actor appearing to “support” the event — the actor never agreed. A third copies a chatbot’s paragraph word for word and signs it.</p>
  <p>All three used the same kind of technology. Only one used it responsibly.</p>
  <div class="def"><dfn>Ethics of generative AI</dfn> The principles that guide how we create, use and share AI-generated content so that it is honest, fair, safe and respectful of others.</div>
  <p>In this topic you will look at six areas: deepfakes and consent, academic honesty and disclosure, copyright, privacy, verification, and a checklist that pulls them together.</p>` },
      { kind: 'card', title: 'Deepfakes and consent', html: `
  <div class="def"><dfn>Deepfake</dfn> An AI-generated or AI-altered image, audio clip or video that makes a real person appear to say or do something they never did.</div>
  <p>Deepfakes can be used to bully, to spread false news, or to scam. A common scam uses a <b>cloned voice</b> of a relative on a phone call, urgently asking for money by UPI.</p>
  <ul>
  <li>Never create deepfakes of real people — not even “as a joke”.</li>
  <li>Get <b>consent</b> before using anyone’s face, voice or name.</li>
  <li>If you get an urgent money request in a familiar voice, hang up and call the person back on a number you already know.</li>
  <li>If a deepfake targets someone, don’t share it. Tell a trusted adult and report it — in India, at <b>cybercrime.gov.in</b> or the helpline <b>1930</b>.</li>
  </ul>` },
      { kind: 'card', title: 'Academic honesty and disclosure', html: `
  <p>Using AI is not automatically cheating. Passing off AI’s work as your own is.</p>
  <div class="cols">
  <div class="mini"><h4>✅ Usually fine (if your school allows)</h4><p>Brainstorming ideas, asking for an explanation of a hard concept, checking grammar, getting feedback on your own draft.</p></div>
  <div class="mini"><h4>❌ Not honest</h4><p>Submitting AI-written work under your name, changing a few words and calling it yours, using AI where it was not allowed.</p></div>
  </div>
  <p><b>Disclosure</b> means saying clearly when and how you used AI: <i>“I used ChatGPT to suggest an outline; the writing is my own.”</i></p>
  <div class="key"><b>Key idea</b> Follow your school’s rules, do your own thinking, and disclose your AI use.</div>` },
      { kind: 'check', concepts: ['deepfakes', 'honesty'], n: 3 },
      { kind: 'card', title: 'Copyright and ownership', html: `
  <div class="def"><dfn>Copyright</dfn> The legal right of creators to control how their original work — writing, art, music, photos, films — is copied and used.</div>
  <p>Generative AI raises hard questions. Models learned from huge amounts of existing work, often without asking the creators. An output may closely resemble a particular artist’s style or even a specific work. And who owns an AI-generated image — the user, the company, or no one? Rules are still being decided and differ between countries.</p>
  <ul>
  <li>Don’t use AI to copy or imitate a specific artist’s work and pass it off as original.</li>
  <li>Don’t put famous characters or brand logos on things you sell.</li>
  <li>Use images you have permission for, and give credit.</li>
  </ul>` },
      { kind: 'card', title: 'Privacy', html: `
  <p>Whatever you type or upload into an AI tool leaves your device. Depending on the tool and its settings, it may be stored and even used to improve the model.</p>
  <div class="cols">
  <div class="mini"><h4>🔒 Never share</h4><p>Passwords, OTPs, Aadhaar numbers, bank details, home address, phone numbers.</p></div>
  <div class="mini"><h4>🙋 Ask first</h4><p>Before uploading a friend’s or family member’s photo or voice, get their permission.</p></div>
  <div class="mini"><h4>🔍 Check the app</h4><p>Who made it? What permissions does it ask for? Does it really need your contacts or location?</p></div>
  </div>
  <div class="warn"><b>Careful</b> A “free” app that turns your selfie into a film poster might be collecting face data. If the developer is unknown and the permissions are excessive, skip it.</div>` },
      { kind: 'check', concepts: ['copyright', 'privacy-genai'], n: 3 },
      { kind: 'card', title: 'Verify before you trust or share', html: `
  <p>Generative AI can hallucinate, and generated images can look real. So the responsible habit is: <b>check before you use or forward</b>.</p>
  <ol class="flow">
  <li><b>Read carefully</b><span>Pick out the key facts, names and numbers.</span></li>
  <li><b>Check reliable sources</b><span>Textbooks, official websites, trusted news.</span></li>
  <li><b>Remove what you cannot confirm</b><span>If you can’t find it, don’t use it.</span></li>
  <li><b>Note your sources</b><span>So others can check too.</span></li>
  </ol>
  <p>Some topics need extra care. For <b>health</b>, see a doctor. During <b>floods or cyclones</b>, rely on official channels such as IMD, NDMA and your district administration — not viral forwards.</p>` },
      { kind: 'lab', lab: 'genai-cases', title: 'GenAI Choices', intro: 'Work through 8 real-life situations — from homework to deepfakes to helping grandparents. Choose the responsible action each time and see why it matters.' },
      { kind: 'card', title: 'The responsible-use checklist', html: `
  <p>Before you create or share anything with generative AI, run through these questions:</p>
  <ol class="flow">
  <li><b>Allowed?</b><span>Does my school, the tool or the competition permit this use?</span></li>
  <li><b>Consent?</b><span>Am I using anyone’s face, voice, name or work without permission?</span></li>
  <li><b>Private?</b><span>Am I sharing personal data — mine or someone else’s?</span></li>
  <li><b>True?</b><span>Have I checked the facts in reliable sources?</span></li>
  <li><b>Fair?</b><span>Could this be biased, hurtful or misleading?</span></li>
  <li><b>Disclosed?</b><span>Have I said where and how I used AI?</span></li>
  </ol>
  <div class="key"><b>Key idea</b> If any answer worries you, stop and fix it before you share.</div>` },
      { kind: 'card', title: 'Common mistakes', html: `
  <div class="warn"><b>“It was only a joke.”</b> A deepfake can hurt someone badly whatever the intention.</div>
  <div class="warn"><b>“I changed some words, so it’s mine.”</b> Light editing does not make AI’s work your original work.</div>
  <div class="warn"><b>“AI made it, so nobody owns it and I can do anything.”</b> Copyright and ownership rules still apply and are still being decided.</div>
  <div class="warn"><b>“Everyone uploads photos to these apps.”</b> Popularity does not make an app safe for your data.</div>
  <div class="warn"><b>“Two chatbots agreed, so it’s true.”</b> Both can be wrong. Check a reliable source.</div>` },
      { kind: 'check', concepts: ['verify', 'checklist'], n: 3 },
      { kind: 'practice', n: 8 },
      { kind: 'quiz', n: 10, pass: 0.8 }
    ],
    pool: [
      { id: 'u4-05-q01', c: 'deepfakes', t: 'mcq', d: 1, q: 'What is a <b>deepfake</b>?', o: ['AI-made media that makes a real person seem to say or do something', 'Any ordinary photo that has simply been cropped, resized or brightened', 'A cartoon character drawn by an artist for a comic', 'A video clip filmed in a very deep swimming pool'], a: 0, ex: 'A deepfake uses AI to fake a real person’s appearance or voice.' },
      { id: 'u4-05-q02', c: 'deepfakes', t: 'mcq', d: 2, q: 'Sana gets a call in her uncle’s voice urgently asking her to send money by UPI. What might this be, and what should she do?', o: ['A possible voice-clone scam — hang up and call him back', 'Definitely her uncle — she should send the money at once', 'A wrong number — she should send half the money to be safe', 'A test from the bank — she should share her UPI PIN to pass'], a: 0, mis: { 1: 'Voices can now be cloned with AI. Urgent money requests should always be checked.', 3: 'No genuine bank or person ever needs your UPI PIN.' }, ex: 'AI can clone voices. Calling back on a known number confirms who is really asking.' },
      { id: 'u4-05-q03', c: 'deepfakes', t: 'tf', d: 1, q: 'Making a deepfake of a classmate “just as a joke” can still cause serious harm.', a: true, ex: 'The person shown did not agree, and the fake can embarrass, bully or mislead others whatever the intention.' },
      { id: 'u4-05-q04', c: 'deepfakes', t: 'mcq', d: 3, q: 'A deepfake image of a classmate is being shared in your class group. What is the best thing to do?', o: ['Don’t share it; support your classmate and report it to an adult', 'Forward it to a few close friends to ask if it is real', 'Add a funny comment so that it seems less serious', 'Ignore it completely, since the image is not about you or your friends'], a: 0, mis: { 1: 'Forwarding spreads the harm, even if you mean to check it.', 3: 'Ignoring it leaves your classmate alone. Reporting and support help stop the harm.' }, ex: 'Not spreading it, supporting the victim and reporting it are the responsible steps.' },
      { id: 'u4-05-q05', c: 'deepfakes', t: 'mcq', d: 1, q: 'Why does consent matter when using someone’s face or voice in AI content?', o: ['People have the right to decide how their face and voice are used', 'Asking for consent makes the AI tool run much faster', 'Consent is only ever needed when using famous people', 'Consent is not needed at all if the final result looks realistic enough'], a: 0, mis: { 2: 'Everyone — classmates, family, strangers — has the right to control how their likeness is used.' }, ex: 'Using someone’s likeness without permission can mislead others and harm that person.' },
      { id: 'u4-05-q06', c: 'deepfakes', t: 'mcq', d: 2, q: 'In India, where can you report cybercrime such as a harmful deepfake?', o: ['On cybercrime.gov.in or the helpline 1930', 'By forwarding it to more groups as a warning', 'By replying angrily to the person who made it', 'By posting it publicly with a caption'], a: 0, mis: { 1: 'Forwarding spreads the harm further. Report it instead.', 3: 'Posting it publicly spreads it to even more people.' }, ex: 'The national cybercrime portal (cybercrime.gov.in) and helpline 1930 are official ways to report.' },
      { id: 'u4-05-q07', c: 'honesty', t: 'mcq', d: 1, q: 'Academic honesty when using generative AI means…', o: ['following school rules and not passing off AI’s work as your own', 'never using any kind of technology for school work', 'using AI tools only when the teacher is not looking', 'letting AI do all the work, as long as you end up getting good marks'], a: 0, ex: 'Honesty means doing your own thinking, following the rules and being open about AI use.' },
      { id: 'u4-05-q08', c: 'honesty', t: 'bins', d: 2, q: 'Sort each action.', bins: ['Honest use', 'Dishonest use'], items: [['Using AI to brainstorm, then writing your own essay', 0], ['Submitting an AI-written essay under your name', 1], ['Asking AI to explain a concept, then solving problems yourself', 0], ['Changing a few words in an AI answer and calling it yours', 1], ['Writing “I used AI to check grammar” in your project', 0], ['Using AI in a test where it was not allowed', 1]], ex: 'Honest use supports your own work and is disclosed. Dishonest use passes off AI’s work as yours or breaks the rules.' },
      { id: 'u4-05-q09', c: 'honesty', t: 'mcq', d: 1, q: 'In the context of AI, <b>disclosure</b> means…', o: ['clearly saying when and how you used AI', 'hiding that you used AI', 'deleting your chat history', 'sharing your password with the teacher'], a: 0, ex: 'Disclosure is being open about AI use, e.g. “I used a chatbot to suggest an outline.”' },
      { id: 'u4-05-q10', c: 'honesty', t: 'tf', d: 2, q: 'If you change a few words in an AI-written essay, it becomes your own original work.', a: false, ex: 'Light editing does not change who did the thinking and writing. Presenting it as yours is dishonest.' },
      { id: 'u4-05-q11', c: 'honesty', t: 'mcq', d: 3, q: 'Ayaan’s teacher allows AI for brainstorming but not for writing. Ayaan used AI to suggest an outline, then wrote every sentence himself. What should he do?', o: ['Submit it and mention that he used AI for the outline', 'Hide the AI use, since he wrote the sentences', 'Ask AI to rewrite his essay to make it better', 'Delete his essay and start all over again without any help at all'], a: 0, mis: { 1: 'His use was allowed, but disclosure is still expected. Being open builds trust.', 2: 'That would break the rule against using AI for writing.' }, ex: 'His use followed the rules. Disclosing it is the honest final step.' },
      { id: 'u4-05-q12', c: 'copyright', t: 'mcq', d: 1, q: 'Copyright protects…', o: ['creators’ rights over their original work, like art and music', 'every single idea that anyone, anywhere in the world, has ever had', 'only the names and logos of large companies', 'public roads, parks and government buildings'], a: 0, ex: 'Copyright gives creators control over how their original works are copied and used.' },
      { id: 'u4-05-q13', c: 'copyright', t: 'mcq', d: 2, q: 'Why is copyright a concern with generative AI?', o: ['Models train on others’ work, outputs may copy it, and ownership is unclear', 'AI tools cannot create real images, so copyright can never apply to them', 'Copyright only applies to printed books and never to any digital content', 'All AI-generated content automatically belongs to the user, everywhere'], a: 0, mis: { 3: 'Ownership rules for AI output are unsettled and differ between countries.' }, ex: 'Training on existing works, close copies, and unclear ownership are the main copyright questions.' },
      { id: 'u4-05-q14', c: 'copyright', t: 'mcq', d: 3, q: 'Diya wants to sell T-shirts printed with AI images of a famous cartoon character. What is the main problem?', o: ['The character is its creators’ property; selling copies could break copyright', 'AI-made images cannot be printed on fabric, so the T-shirts will simply not work', 'Cartoon characters are not allowed on any T-shirts sold in India', 'There is no problem at all, because an AI tool made the images'], a: 0, mis: { 3: 'Using AI does not remove the creators’ rights over their character.' }, ex: 'Famous characters are protected. Original designs avoid the problem.' },
      { id: 'u4-05-q15', c: 'copyright', t: 'tf', d: 2, q: 'Rules about who owns AI-generated content are still being debated and can differ between countries.', a: true, ex: 'Laws are still catching up with generative AI, and countries are taking different approaches.' },
      { id: 'u4-05-q16', c: 'copyright', t: 'mcq', d: 2, q: 'You want to use a photo found online as part of an AI-made poster. What should you check first?', o: ['Whether you have permission to use it, and how to credit it', 'Whether the photo is in colour or in black and white', 'Whether the photo is large and sharp enough to print on a big poster', 'Whether your friends think the photo looks nice'], a: 0, mis: { 2: 'Size matters for printing, but permission and credit come first.' }, ex: 'Images online usually belong to someone. Check the licence or ask, and give credit.' },
      { id: 'u4-05-q17', c: 'privacy-genai', t: 'mcq', d: 1, q: 'Which should you never type into a public chatbot?', o: ['Your Aadhaar number, home address or passwords', 'A question about how photosynthesis works', 'A request for a short poem about the monsoon', 'A request to explain how to add fractions'], a: 0, ex: 'Personal and sensitive data may be stored by the service and could be misused.' },
      { id: 'u4-05-q18', c: 'privacy-genai', t: 'mcq', d: 2, q: 'Before uploading a friend’s photo to an AI “cartoonify” app, you should…', o: ['ask your friend’s permission and check the app’s privacy policy', 'upload it straight away, since it is only a cartoon', 'upload it now, and tell your friend about it afterwards', 'upload several photos of your friend so the cartoon looks better'], a: 0, mis: { 2: 'Permission must come before uploading — afterwards is too late to undo.' }, ex: 'Your friend’s face is their personal data. Ask first and check the app’s privacy policy.' },
      { id: 'u4-05-q19', c: 'privacy-genai', t: 'multi', d: 2, q: 'Which are good privacy habits when using generative AI? Select all that apply.', o: ['Remove names and personal details before pasting text', 'Check app permissions and privacy settings', 'Ask before uploading other people’s photos', 'Share an OTP if the chatbot asks for it', 'Upload family documents to try out new apps'], a: [0, 1, 2], ex: 'Removing details, checking settings and asking permission protect privacy. Never share OTPs or upload sensitive documents.' },
      { id: 'u4-05-q20', c: 'privacy-genai', t: 'tf', d: 2, q: 'Some AI tools may store your chats and use them to improve their models.', a: true, ex: 'Depending on the tool and its settings, conversations may be kept and used for training. Check the settings and avoid sharing personal data.' },
      { id: 'u4-05-q21', c: 'privacy-genai', t: 'mcq', d: 3, q: 'A message says: “Upload your selfie to this free app to see yourself as a film star!” The developer is unknown and the app wants access to your contacts. What should you do?', o: ['Avoid it — it asks for more than it needs and could misuse your face', 'Install it, because free apps are always safe to use', 'Install it and allow contacts access, since everyone else has done so already', 'Send the link to all your contacts first, then decide'], a: 0, mis: { 1: '“Free” apps can be paid for with your data.', 2: 'Popularity does not make an app safe. Contacts access is not needed to edit a selfie.' }, ex: 'Unknown developer plus unnecessary permissions are red flags for misuse of personal data.' },
      { id: 'u4-05-q22', c: 'verify', t: 'mcq', d: 1, q: 'Why must you verify facts from generative AI?', o: ['It can produce confident but false information', 'It always refuses to answer questions', 'Its answers are always out of date by exactly one year', 'Teachers do not allow reading AI answers'], a: 0, ex: 'Hallucinations look and sound like real facts, so checking is essential.' },
      { id: 'u4-05-q23', c: 'verify', t: 'mcq', d: 2, q: 'A chatbot suggests home remedies for a high fever that has lasted four days. What is the best action?', o: ['See a doctor; don’t rely on AI for medical decisions', 'Follow the remedies and wait another week', 'Ask the chatbot for a stronger remedy', 'Share the remedies in the family group as medical advice'], a: 0, mis: { 1: 'A long, high fever needs a doctor. AI health tips can be wrong or unsafe.' }, ex: 'Health decisions need qualified professionals. AI can be a starting point for questions, not a replacement for a doctor.' },
      { id: 'u4-05-q24', c: 'verify', t: 'mcq', d: 3, q: 'During heavy rain, a forward with an AI-looking image claims a nearby dam has burst. What is the best action?', o: ['Check official sources, like the district administration or NDMA, first', 'Forward it to everyone in your contacts immediately, just to be on the safe side', 'Post it on social media with the caption “Is this true?”', 'Ignore all weather news and warnings for the rest of the week'], a: 0, mis: { 1: 'Forwarding unverified alarms causes panic and hides real warnings.', 2: 'Posting it, even as a question, still spreads it.' }, ex: 'In emergencies, official channels give reliable information. Unverified forwards can cause harm.' },
      { id: 'u4-05-q25', c: 'verify', t: 'tf', d: 2, q: 'If two different chatbots give the same answer, it must be correct.', a: false, ex: 'Models trained on similar data can make the same mistake. Check a reliable source.' },
      { id: 'u4-05-q26', c: 'verify', t: 'order', d: 2, q: 'Put the steps for checking an AI answer in order.', items: ['Read the AI answer carefully', 'Pick out the key facts and numbers', 'Check them in reliable sources', 'Correct or remove anything you cannot confirm', 'Use the checked information and note your sources'], ex: 'Read, identify claims, check, fix, then use with sources — that turns an AI draft into trustworthy work.' },
      { id: 'u4-05-q27', c: 'checklist', t: 'mcq', d: 1, q: 'Which question belongs on a responsible-use checklist for generative AI?', o: ['Is this use allowed by my school’s rules?', 'Will this post make me famous online?', 'Can I finish this without reading it?', 'How can I hide that I used AI here?'], a: 0, ex: 'Checking that a use is allowed is the first question on the checklist.' },
      { id: 'u4-05-q28', c: 'checklist', t: 'multi', d: 2, q: 'Which questions belong in a responsible-use checklist? Select all that apply.', o: ['Have I checked the facts?', 'Do I have consent to use this person’s image?', 'Have I said where I used AI?', 'Am I sharing anyone’s private data?', 'Will it go viral if I skip checking?', 'Can I hide that AI was used?'], a: [0, 1, 2, 3], ex: 'Facts, consent, disclosure and privacy are core checks. Going viral and hiding AI use are not responsible goals.' },
      { id: 'u4-05-q29', c: 'checklist', t: 'mcq', d: 3, q: 'Sana makes an AI poster for the school fest showing a realistic image of a famous actor “inviting” everyone. The actor knows nothing about it. What is the ethical problem?', o: ['It falsely suggests the actor supports the fest, without consent', 'The poster uses far too many bright colours for a school event like this', 'Posters for school events should never use any images', 'The school fest is much too small for a famous actor'], a: 0, mis: { 2: 'Images are fine; the problem is faking a real person’s endorsement.' }, ex: 'Using a real person’s likeness to suggest they endorse something, without consent, is misleading and a form of deepfake.' },
      { id: 'u4-05-q30', c: 'checklist', t: 'match', d: 2, q: 'Match each action to the principle it follows.', pairs: [['Labelling an image “made with AI”', 'Disclosure'], ['Asking a friend before using their photo', 'Consent'], ['Checking a statistic on an official website', 'Verification'], ['Crediting the photographer whose photo you used', 'Respecting copyright'], ['Not typing your address into a chatbot', 'Protecting privacy']], ex: 'Each action is one item from the responsible-use checklist.' },
      { id: 'u4-05-q31', c: 'checklist', t: 'mcq', d: 2, q: 'What is a good last question to ask before sharing AI-made content?', o: ['Could this mislead or hurt anyone?', 'Is this the fastest way to get likes?', 'Can anyone tell that I used AI?', 'Is the file size small enough?'], a: 0, mis: { 2: 'The goal is to be open about AI use, not to hide it.' }, ex: 'Thinking about harm to others is the heart of responsible use.' },
      { id: 'u4-05-q32', c: 'honesty', t: 'mcq', d: 3, q: 'Rohan’s Hindi project asks students to write a paragraph in their own words. He writes it in English and has an AI translate it into Hindi. What should he do?', o: ['Ask his teacher if this is allowed, and disclose the AI translation', 'Submit it as it is, without mentioning the translation', 'Tell the teacher the Hindi is entirely his own writing', 'Translate it back into English and submit the two versions without comment'], a: 0, mis: { 1: 'The task is about writing in Hindi himself. Hiding the AI step is dishonest.', 2: 'The Hindi wording came from the AI, so claiming it is all his is untrue.' }, ex: 'The task tests his own Hindi writing. He should follow the rules and be open about any AI use.' },
      { id: 'u4-05-q33', c: 'copyright', t: 'mcq', d: 3, q: 'Kabir generates an image “in the style of” a well-known living Indian painter and enters it in an art competition as his own original painting. What is wrong?', o: ['He misrepresents who made it and imitates an artist without credit', 'Nothing — AI images always belong to whoever typed the prompt', 'The image is not colourful enough to win an art competition', 'Art competitions only ever accept drawings made in pencil'], a: 0, mis: { 1: 'Ownership of AI output is unsettled, and either way the entry claims to be his own painting, which it is not.' }, ex: 'Entering AI output as your own painting is dishonest, and closely imitating a living artist raises fairness and copyright concerns. Follow the rules and disclose.' }
    ]
  }
  ]
};
