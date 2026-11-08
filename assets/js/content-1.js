/* Redline Design School: course content, modules 1–3.
   Every factual claim here is paraphrased from the sources listed on each lesson. */
window.COURSE = window.COURSE || [];

COURSE.push({
  id: "foundations", title: "Foundations", color: "#D9145A",
  blurb: "What product design is, where UX and UI fit, and the process that keeps work honest.",
  lessons: [
  {
    id: "what-is-product-design", title: "What product designers do", mins: 12, level: "Beginner",
    summary: "Product design is the work of deciding what a product should do, how it should work and how it should look, then proving those choices with evidence.",
    goals: ["Explain how UX, UI and usability relate to each other", "Judge an idea through the value, viability and feasibility lenses", "Describe the loop designers repeat on every project"],
    sections: [
      { id: "ux-definition", t: "Start with the definition of UX", h: `
<p>In their 1998 article, Don Norman and Jakob Nielsen define user experience as <strong>every part of the end user's interaction with a company, its services and its products</strong>. That is deliberately wide. It covers the app, but also the onboarding email, the support chat and the moment a delivery arrives late.</p>
<p>They put two requirements in order. First, meet the customer's exact needs without fuss or bother. Second, do it with simplicity and elegance, so the product is a joy to own and use. Note what is <em>not</em> on the list: giving people a checklist of every feature they asked for.</p>
<aside class="co ex"><b>Example from the source</b><p>A movie-review site can have a flawless search interface. If its database only covers big studio releases, someone looking for a small independent film still has a poor experience. The UI was fine; the experience was not.</p></aside>` },
      { id: "ux-ui-usability", t: "UX, UI and usability are not the same thing", h: `
<div class="tbl"><table>
<thead><tr><th>Term</th><th>What it covers</th><th>Question it answers</th></tr></thead>
<tbody>
<tr><td><b>UX</b></td><td>The whole relationship with the product and company</td><td>Did this solve the person's problem, end to end?</td></tr>
<tr><td><b>UI</b></td><td>The screens, controls, type and layout people touch</td><td>Can people see and operate it?</td></tr>
<tr><td><b>Usability</b></td><td>A quality of the UI: easy to learn, efficient, pleasant</td><td>How well does the interface work?</td></tr>
</tbody></table></div>
<p>Norman and Nielsen describe usability as a quality attribute of the UI, and UX as the broader concept. They also argue that great UX needs several disciplines to work together: engineering, marketing, graphic and industrial design, and interface design.</p>
<aside class="co warn"><b>Common mistake</b><p>Treating UX as a synonym for "the UI" or for "usability". A product can pass every usability test and still fail because it solves the wrong problem.</p></aside>` },
      { id: "three-lenses", t: "The three lenses: valuable, viable, feasible", h: `
<p>Product designers judge ideas through three questions at once:</p>
<ol class="steps">
<li><b>Valuable.</b> Does it solve a real problem people have, well enough that they will change their behavior?</li>
<li><b>Viable.</b> Does it work for the business: cost, revenue, legal and brand constraints?</li>
<li><b>Feasible.</b> Can the team build and maintain it with the time, skills and technology available?</li>
</ol>
<p>An idea that scores high on only one lens is a warning sign. A beautiful feature nobody can build, or a cheap feature nobody needs, both fail. The designer's job is to find the overlap, and to bring evidence for each lens rather than opinions.</p>` },
      { id: "the-loop", t: "The loop every designer repeats", h: `
<p>Whatever framework a team uses, the same loop runs underneath at different speeds: <strong>understand → define → explore → decide → test → ship → learn</strong>. A one-day fix might go round it in hours; a new product might take months per lap.</p>
<p>A typical week mixes all of it: running two interviews, sketching flows on paper, arguing to cut a feature, tightening the spacing on a settings screen, and sitting with an engineer to work through an edge case.</p>
<aside class="co tip"><b>Tip</b><p>When you feel stuck, ask which step of the loop you skipped. Most stuck projects skipped "understand" or "define".</p></aside>` }
    ],
    keys: ["UX covers every interaction with the company, its services and products.", "UI is part of UX; usability is a quality of the UI.", "Judge ideas by value, viability and feasibility together.", "The loop runs from understanding to learning, then repeats."],
    lab: "lenses", labTitle: "Score an idea through three lenses", labIntro: "Rate a feature idea on each lens. The diagram shows where it lands and what to investigate next.",
    practice: `<p>Pick an app you use daily. Write one short paragraph for each lens: who it is valuable to, how it makes money (viable), and one thing you suspect was hard to build (feasible). Then name one moment in its <em>experience</em> that happens outside the UI.</p>`,
    quiz: [
      { q: "According to Norman and Nielsen, what is the first requirement for an exemplary user experience?", o: ["A large feature set", "Meeting the customer's exact needs without fuss", "A modern visual style", "Fast load times"], a: 1, w: "They list meeting exact needs first, then simplicity and elegance." },
      { q: "Usability is best described as…", o: ["Another word for UX", "A quality attribute of the UI", "The visual style of a product", "A research method"], a: 1, w: "Usability is a quality of the interface; UX is the broader concept." },
      { q: "Which question belongs to the feasibility lens?", o: ["Will people pay for it?", "Can the team build and maintain it?", "Do users understand it?", "Does it fit the brand?"], a: 1, w: "Feasibility is about building and maintaining it with real constraints." }
    ],
    sources: [["NN/g: The Definition of User Experience (UX)", "https://www.nngroup.com/articles/definition-user-experience/"]],
    figs: ["Product design sits where valuable, viable and feasible overlap.", "The core loop every designer repeats."]
  },
  {
    id: "double-diamond", title: "Design thinking and the Double Diamond", mins: 14, level: "Beginner",
    summary: "Two well-known process models, what each phase is for, and why real projects loop back instead of marching in a straight line.",
    goals: ["Name and explain the four phases of the Double Diamond", "Map design thinking's six phases onto real activities", "Recognise when a team has skipped problem discovery"],
    sections: [
      { id: "origin", t: "Where the Double Diamond came from", h: `
<p>In 2003 the UK Design Council had no standard way to describe the design process. Its director, Richard Eisermann, put the question to his team, and they codified, renamed and popularised a set of steps that became the Double Diamond. The Council describes it as a picture of the design and innovation process that fits any project, whatever methods you use.</p>
<aside class="co def"><b>Definition</b><p><b>Diverge:</b> open up and gather many options. <b>Converge:</b> narrow down and make a decision. Each diamond does one of each.</p></aside>` },
      { id: "four-phases", t: "The four phases", h: `
<ol class="steps">
<li><b>Discover.</b> Understand the problem instead of assuming it. Spend time with the people affected by it.</li>
<li><b>Define.</b> Use what you learned to frame the challenge, often differently from how it was first described.</li>
<li><b>Develop.</b> Generate different answers to the defined problem. Look for inspiration elsewhere and co-design with a range of people.</li>
<li><b>Deliver.</b> Test small-scale versions, reject the ones that will not work, and improve the rest.</li>
</ol>
<p>The first diamond is about finding the right problem; the second is about finding the right solution. Most beginner mistakes happen when a team jumps straight into the second diamond with a solution someone already liked.</p>` },
      { id: "design-thinking", t: "Design thinking: an ideology with a process", h: `
<p>Nielsen Norman Group describes design thinking as an ideology supported by a process: the belief that a hands-on, user-centred approach leads to innovation. Its six phases sit inside three buckets.</p>
<div class="tbl"><table>
<thead><tr><th>Bucket</th><th>Phase</th><th>What you do</th></tr></thead>
<tbody>
<tr><td rowspan="2">Understand</td><td>Empathize</td><td>Research what users do, say, think and feel</td></tr>
<tr><td>Define</td><td>Combine research, identify unmet needs and pain points</td></tr>
<tr><td rowspan="2">Explore</td><td>Ideate</td><td>Generate many ideas; quantity over quality at first</td></tr>
<tr><td>Prototype</td><td>Build tangible versions of a few ideas</td></tr>
<tr><td rowspan="2">Materialize</td><td>Test</td><td>Check with real users whether it meets their needs</td></tr>
<tr><td>Implement</td><td>Put the vision into effect; the most often forgotten phase</td></tr>
</tbody></table></div>` },
      { id: "loops", t: "Real projects loop back", h: `
<p>Neither model is a rigid sequence. The Design Council later expanded its version into a Framework for Innovation because projects often loop back to the start, and testing an early idea can itself be a form of discovery. NN/g likewise notes that teams often revisit empathize and define after prototyping.</p>
<aside class="co warn"><b>Common mistake</b><p>Treating a loop back as failure. Finding out in testing that you misunderstood the problem is the process working, and it is far cheaper than finding out after launch.</p></aside>` }
    ],
    keys: ["Discover, Define, Develop, Deliver: two rounds of diverge then converge.", "Diamond one finds the right problem; diamond two finds the right solution.", "Design thinking: empathize, define, ideate, prototype, test, implement.", "Looping back is expected, not a failure."],
    lab: "diamond", labTitle: "Walk the Double Diamond", labIntro: "Select a phase to see its mindset, typical methods and what it should produce.",
    practice: `<p>Take a small annoyance from your life, for example splitting bills with housemates. Spend 10 minutes listing every way the problem shows up (diverge). Then circle the one that matters most and write it as a single sentence (converge). You just ran the first diamond.</p>`,
    quiz: [
      { q: "Which phase turns research into a clear framing of the challenge?", o: ["Discover", "Define", "Develop", "Deliver"], a: 1, w: "Define converges discovery insights into a framed problem." },
      { q: "A team opens Figma on day one with a solution in mind. What did they skip?", o: ["The first diamond", "The second diamond", "Nothing", "Implementation"], a: 0, w: "They skipped discovering and defining the problem." },
      { q: "NN/g calls which design thinking phase the most important and most often forgotten?", o: ["Empathize", "Ideate", "Test", "Implement"], a: 3, w: "Implement is where the vision actually becomes real." }
    ],
    sources: [["Design Council: The Double Diamond", "https://www.designcouncil.org.uk/resources/the-double-diamond/"], ["NN/g: Design Thinking 101", "https://www.nngroup.com/articles/design-thinking/"]],
    figs: ["The Double Diamond: discover, define, develop, deliver.", "Diverge to see many options, then converge on one decision."]
  },
  {
    id: "tools-of-the-trade", title: "Tools and working setup", mins: 10, level: "Beginner",
    summary: "Tools change; habits last. Set up a kit that keeps you sketching early and learning Figma through real work.",
    goals: ["Choose the right tool for each stage of work", "Know which Figma features to learn first", "Set up a practice file for this course"],
    sections: [
      { id: "kit", t: "A minimal kit", h: `
<ul>
<li><b>Paper and a thick marker.</b> The fastest prototyping tool. A thick tip stops you fussing over details too early.</li>
<li><b>Figma.</b> The common industry tool for interface design, prototyping and design systems.</li>
<li><b>A whiteboard tool</b> (FigJam, Miro or similar) for research synthesis, journey maps and workshops.</li>
<li><b>A notes system</b> for interview notes and design decisions. Your future case study depends on it.</li>
</ul>` },
      { id: "figma-order", t: "Learn Figma in this order", h: `
<ol class="steps">
<li><b>Frames.</b> Containers for screens and components. Everything lives in a frame.</li>
<li><b>Auto layout.</b> Makes frames grow and shrink with their content using direction, gap and padding. Add it with <kbd>Shift</kbd>+<kbd>A</kbd>.</li>
<li><b>Components.</b> Reusable elements whose changes flow to every copy.</li>
<li><b>Variants and variables.</b> One component with many states; stored values such as colors and spacing that can switch between modes like light and dark.</li>
</ol>
<aside class="co tip"><b>Tip</b><p>Learn each feature when a practice brief needs it. Tutorials teach buttons; projects teach judgement.</p></aside>` },
      { id: "shortcuts", t: "A few shortcuts worth knowing", h: `
<div class="tbl"><table><thead><tr><th>Action</th><th>Shortcut</th></tr></thead><tbody>
<tr><td>Frame tool</td><td><kbd>F</kbd></td></tr>
<tr><td>Rectangle</td><td><kbd>R</kbd></td></tr>
<tr><td>Text</td><td><kbd>T</kbd></td></tr>
<tr><td>Add auto layout</td><td><kbd>Shift</kbd>+<kbd>A</kbd></td></tr>
<tr><td>Remove auto layout</td><td><kbd>Alt</kbd>/<kbd>Option</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd></td></tr>
<tr><td>Toggle Dev Mode</td><td><kbd>Shift</kbd>+<kbd>D</kbd></td></tr>
</tbody></table></div>` }
    ],
    keys: ["Sketch on paper before opening Figma.", "Figma order: frames, auto layout, components, variants and variables.", "Keep a decision log from day one."],
    lab: "shortcuts", labTitle: "Shortcut flashcards", labIntro: "Press the shortcut you think matches each action, or tap to reveal. Six cards.",
    practice: `<p>Create a Figma file called "Redline practice" with one page per module. Recreate the home screen of your daily app using frames and auto layout. Don't chase pixel accuracy yet; focus on structure.</p>`,
    quiz: [
      { q: "Why sketch with a thick marker?", o: ["It looks better", "It keeps attention on structure, not detail", "It is required", "It scans better"], a: 1, w: "Low fidelity keeps you focused on flow and layout." },
      { q: "Which shortcut adds auto layout in Figma?", o: ["Shift+D", "Shift+A", "Ctrl+G", "A"], a: 1, w: "Shift+A adds auto layout; Shift+D toggles Dev Mode." }
    ],
    sources: [["Figma Learn: Guide to auto layout", "https://help.figma.com/hc/en-us/articles/360040451373"], ["Figma Learn: Guide to variables", "https://help.figma.com/hc/en-us/articles/15339657135383"], ["Figma Learn: Guide to Dev Mode", "https://help.figma.com/hc/en-us/articles/15023124644247"]],
    figs: ["A typical setup: paper sketches first, then the design tool.", "Learn Figma features in this order."]
  }
  ]
});

COURSE.push({
  id: "research", title: "User Research", color: "#2F6FDB",
  blurb: "Learn what people actually do and need, then package it so the whole team remembers.",
  lessons: [
  {
    id: "user-interviews", title: "Running user interviews", mins: 16, level: "Beginner",
    summary: "Interviews uncover people's behavior, context and motivations. Done badly, they collect polite opinions; done well, they change what you build.",
    goals: ["Plan an interview from research goals to a piloted guide", "Write open, neutral questions about past behavior", "Avoid the mistakes that make interviews useless"],
    sections: [
      { id: "what", t: "What an interview is, and is not", h: `
<p>NN/g defines a user interview as a research method where the interviewer asks about a topic, listens, and follows up to learn more. Outside UX it goes by names like in-depth or semi-structured interview.</p>
<div class="tbl"><table><thead><tr><th></th><th>User interview</th><th>Usability test</th></tr></thead><tbody>
<tr><td>Type of data</td><td>Attitudinal: what people say about their lives</td><td>Behavioral: what people do with a design</td></tr>
<tr><td>When</td><td>Early, while empathizing</td><td>Later, while testing</td></tr>
<tr><td>Design needed?</td><td>No</td><td>Yes</td></tr>
</tbody></table></div>` },
      { id: "steps", t: "Six steps to a good interview", h: `
<ol class="steps">
<li><b>Identify research goals.</b> Narrow enough to act on. "Learn about our users" is too broad.</li>
<li><b>Prepare a guide</b> of open-ended questions.</li>
<li><b>Pilot the guide</b> with a colleague or one participant and fix confusing questions.</li>
<li><b>Start easy</b> with simple questions about the person's context.</li>
<li><b>Build rapport</b> so people feel safe telling the truth.</li>
<li><b>Follow up and probe.</b> Most insight lives in the second and third answer.</li>
</ol>` },
      { id: "questions", t: "Writing questions people can answer honestly", h: `
<div class="dd"><div class="do"><b>Ask</b><ul><li>"Tell me about the last time you…"</li><li>"Walk me through how you did that."</li><li>"Why was that?" / "What happened next?"</li></ul></div>
<div class="dont"><b>Avoid</b><ul><li>"Would you use an app that…?" (hypothetical)</li><li>"Don't you hate…?" (leading)</li><li>"What features do you want?" (asks them to design)</li></ul></div></div>
<p>Rob Fitzpatrick's <em>The Mom Test</em> is built on the same idea: people will be nice to you, so ask about their life and past behavior, not your idea, if you want learning instead of compliments.</p>` },
      { id: "limits", t: "Know the limits", h: `
<p>Interviews rely on memory. NN/g lists poor recollection, missing details and social-desirability bias (saying what sounds good) as their main limitations. Pair them with observation or usability testing when you need to know what people actually do.</p>
<aside class="co warn"><b>Common mistakes</b><p>Turning the session into a sales pitch or a casual chat; setting goals that are too broad; asking leading questions; asking questions that make participants feel judged.</p></aside>
<aside class="co tip"><b>Tip</b><p>Adding a usability test to an interview session typically stretches it from about 60 to about 90 minutes, so plan your schedule and incentives accordingly.</p></aside>` }
    ],
    keys: ["Interviews are attitudinal; usability tests are behavioral.", "Goals → guide → pilot → easy start → rapport → probing.", "Ask about specific past behavior, never hypotheticals.", "Memory and politeness distort answers; observe when you can."],
    lab: "questions", labTitle: "Fix the interview question", labIntro: "Classify each question. You'll see why it works or fails and a better version.",
    practice: `<p>Interview two people about how they plan meals for the week. Write a six-question guide first, every question about past behavior, and pilot it on a friend. Afterwards, list the three most surprising things you heard.</p>`,
    quiz: [
      { q: "Which is the best interview question?", o: ["Would you use a meal-planning app?", "Don't you find meal planning stressful?", "Tell me about the last time you decided what to cook.", "What features should a meal app have?"], a: 2, w: "It asks about specific past behavior and does not lead." },
      { q: "What kind of data do interviews mainly produce?", o: ["Behavioral", "Attitudinal", "Analytics", "Biometric"], a: 1, w: "Interviews capture what people say; tests capture what they do." },
      { q: "What should you do right after writing your interview guide?", o: ["Recruit 20 people", "Pilot it", "Analyze results", "Write personas"], a: 1, w: "Piloting catches confusing or leading questions before real sessions." }
    ],
    sources: [["NN/g: User Interviews 101", "https://www.nngroup.com/articles/user-interviews/"], ["Rob Fitzpatrick, The Mom Test", "https://www.momtestbook.com/"]],
    figs: ["An interview: one person asks and listens, the other tells stories.", "Questions to avoid and questions to ask."]
  },
  {
    id: "personas-jtbd", title: "Personas and Jobs to Be Done", mins: 14, level: "Beginner",
    summary: "Two ways to package research so the team remembers it: a realistic person to design for, and the progress people are trying to make.",
    goals: ["Build a persona whose every detail changes a decision", "Write job stories that describe context, motivation and outcome", "Choose when to use personas, job stories or both"],
    sections: [
      { id: "personas", t: "Personas done properly", h: `
<p>NN/g defines a persona as a fictional yet realistic description of a typical or target user. The key word is <em>realistic</em>: personas must come from research such as interviews, field studies or surveys, ideally built as a team.</p>
<ol class="steps">
<li>Identify user characteristics from your research.</li>
<li>Cluster people with similar characteristics.</li>
<li>Merge groups that are too similar and drop the less relevant ones.</li>
<li>Add details: name, context, goals, concerns, a representative quote.</li>
</ol>
<aside class="co ex"><b>The relevance rule</b><p>Every detail must affect a design decision. A favourite wine is noise for an intranet, but genuinely useful for a sommelier marketplace.</p></aside>` },
      { id: "why", t: "Why personas work", h: `
<p>People respond more to a concrete individual than to statistics. A persona gives the team a shared shorthand ("Would Priya manage this on the train?") and stops you designing for everyone, which usually means designing for no one. NN/g also lists ongoing uses: briefing agencies, guiding expert reviews, recruiting test participants and segmenting analytics.</p>
<aside class="co warn"><b>Common mistake</b><p>Inventing personas without research, or decorating them with stock photos and witty taglines that change nothing.</p></aside>` },
      { id: "jtbd", t: "Jobs to Be Done and job stories", h: `
<p>Jobs to Be Done focuses on causality: the situation, anxieties and motivations that make someone "hire" a product. On the Intercom blog, Alan Klement argued that personas based on demographics ignore this causality, and that user stories mix implementation details into motivations.</p>
<p class="formula"><b>When</b> [situation], <b>I want to</b> [motivation], <b>so I can</b> [expected outcome].</p>
<p>"When I get home tired on a weekday, I want to decide dinner in under a minute, so I can avoid ordering takeout again." It names no app or button, which leaves room for better solutions.</p>` },
      { id: "process", t: "Klement's five-step process", h: `
<ol class="steps">
<li>Start with the high-level job.</li>
<li>Identify the smaller jobs that support it.</li>
<li>Observe how people solve the problem today.</li>
<li>Write job stories capturing causality, anxieties and motivations.</li>
<li>Design a solution that resolves each story.</li>
</ol>
<aside class="co ex"><b>Example from the source</b><p>Car buyers applying for a loan felt anxious about sharing financial details. The job story led to an always-visible salesperson profile with a photo, job title, cars sold and years at the company, which built trust at exactly that moment.</p></aside>` }
    ],
    keys: ["Personas are research-based and every detail must change a decision.", "Job stories: When…, I want to…, so I can…", "Jobs focus on situation and motivation, not demographics.", "Use both: personas for who, jobs for why."],
    lab: "jobstory", labTitle: "Job story builder", labIntro: "Write the three parts. The builder flags solution words that sneak in and narrow your thinking.",
    practice: `<p>From your meal-planning interviews, write one persona (goals, frustrations, context) and three job stories. Then cross out every persona detail that would not change a design decision.</p>`,
    quiz: [
      { q: "What makes a persona useful?", o: ["A realistic photo", "Research-based details that change decisions", "A witty tagline", "A long biography"], a: 1, w: "Personas exist to guide decisions and must come from research." },
      { q: "Which is a well-formed job story?", o: ["As a user I want a button", "When I'm rushing to a meeting, I want to see my next stop instantly, so I can leave on time", "Add dark mode", "Users like fast apps"], a: 1, w: "It names situation, motivation and outcome without a solution." },
      { q: "Klement's critique of demographic personas is that they ignore…", o: ["Visual design", "Causality", "Accessibility", "Revenue"], a: 1, w: "Jobs to Be Done centres on why people act in a given situation." }
    ],
    sources: [["NN/g: Personas Make Users Memorable", "https://www.nngroup.com/articles/persona/"], ["Intercom: Designing features using job stories", "https://www.intercom.com/blog/using-job-stories-design-features-ui-ux/"]],
    figs: ["A persona built from research, keeping only decision-changing details.", "The job story format with a worked example."]
  },
  {
    id: "synthesis", title: "Synthesis and affinity mapping", mins: 13, level: "Intermediate",
    summary: "Turn a pile of notes into themes and insights the team agrees on, without letting the loudest voice decide.",
    goals: ["Run an affinity mapping session in three steps", "Write insights, not just observations", "Avoid forced clusters and dominant voices"],
    sections: [
      { id: "what", t: "What affinity mapping is", h: `
<p>NN/g defines affinity diagramming as organizing related observations, ideas or findings into distinct clusters. It is also called affinity mapping, collaborative sorting or snowballing. Don't confuse it with card sorting, which is a research method for information architecture.</p>` },
      { id: "steps", t: "Three steps", h: `
<ol class="steps">
<li><b>Generate notes.</b> One observation per sticky, written independently, usually over 5–10 minutes, so people don't copy each other.</li>
<li><b>Cluster.</b> Group notes by content first; name the themes only after groups form. A note can be duplicated into two clusters.</li>
<li><b>Prioritize.</b> Use dot voting if consensus is hard, then name a point person for each action.</li>
</ol>
<div class="dd"><div class="do"><b>Do</b><ul><li>Prepare and filter data before the workshop</li><li>Invite varied perspectives</li><li>Document the board afterwards</li></ul></div>
<div class="dont"><b>Don't</b><ul><li>Force notes into clusters</li><li>Over-categorize</li><li>Ignore small clusters; they can hold the surprise</li></ul></div></div>` },
      { id: "insights", t: "From observation to insight", h: `
<p class="formula"><b>Observation</b> + <b>why it matters</b> = <b>insight</b></p>
<p><b>Observation:</b> 4 of 6 people screenshot recipes. <b>Insight:</b> people collect recipes in places they never return to, so saving is easy but finding again is broken. The insight points straight at an opportunity.</p>
<aside class="co tip"><b>Tip</b><p>Name clusters with statements ("People plan around what's about to expire"), not labels ("Food waste"). Statements carry the meaning forward.</p></aside>
<aside class="co warn"><b>Common mistake</b><p>Letting dominant participants steer the grouping. Silent individual sorting and dot voting keep it fair.</p></aside>` }
    ],
    keys: ["One observation per sticky, written independently.", "Cluster by content first, name themes second.", "Insight = observation + why it matters.", "Dot voting counters dominant voices."],
    lab: "affinity", labTitle: "Sort the sticky notes", labIntro: "Drag each note to a cluster, or tap a note then tap a cluster. Then check your map.",
    practice: `<p>Put every note from your interviews on a FigJam board, one observation per sticky. Cluster them silently with a friend, name each cluster as a statement, and write three insights in the observation + why-it-matters format.</p>`,
    quiz: [
      { q: "Which is an insight rather than an observation?", o: ["Users click the blue button", "3 of 5 people abandoned the form", "People abandon at the address step because they don't have the postcode handy, so we ask too early", "The form has 8 fields"], a: 2, w: "It explains why, and implies what to do." },
      { q: "When should you name clusters?", o: ["Before sorting", "After groups form from the content", "Never", "Only at the end of the project"], a: 1, w: "NN/g recommends grouping by content before naming themes." },
      { q: "Affinity mapping is different from card sorting because card sorting is…", o: ["A synthesis method", "A research method for information architecture", "Only done digitally", "A prioritization tool"], a: 1, w: "Card sorting studies how users group content for IA." }
    ],
    sources: [["NN/g: Affinity Diagramming", "https://www.nngroup.com/articles/affinity-diagram/"]],
    figs: ["An affinity map: stickies grouped bottom-up under statement headers.", "Observation plus why it matters equals an insight."]
  }
  ]
});

COURSE.push({
  id: "strategy", title: "Problem Framing & Strategy", color: "#7A3FD1",
  blurb: "Frame the right problem, decide how to measure success, and choose what to build first.",
  lessons: [
  {
    id: "problem-statements", title: "Problem statements and How Might We", mins: 12, level: "Intermediate",
    summary: "A well-framed problem is half the solution. Turn research into a problem statement, then into questions that invite many ideas.",
    goals: ["Write a problem statement with who, what and why", "Write How Might We questions at the right scope", "Spot embedded solutions and symptom-focused wording"],
    sections: [
      { id: "statement", t: "Anatomy of a problem statement", h: `
<p>A problem statement names <b>who</b> has the problem, <b>what</b> it is, and <b>why</b> it matters, grounded in research.</p>
<p class="formula"><i>Busy parents who cook on weeknights</i> (who) <i>can't decide what to make with what they have</i> (what), <i>so they waste food and order takeout</i> (why).</p>` },
      { id: "hmw", t: "How Might We questions", h: `
<p>At the end of discovery, the team agrees on its top findings and turns them into "How might we…" questions before ideating. NN/g notes the format was first introduced at Procter &amp; Gamble in the 1970s and later adopted by IDEO. Its job is to make ideation target real problems instead of pet solutions.</p>
<ol class="steps">
<li><b>Start from an insight</b>, not a generic goal like "improve the user experience".</li>
<li><b>Don't embed a solution.</b> "…tell users which form to complete" limits ideas; "…help users feel confident they're filing correctly" does not.</li>
<li><b>Keep it broad, but not so broad it loses the problem.</b></li>
<li><b>Target the outcome, not a symptom.</b> "…stop users calling us" treats a symptom.</li>
<li><b>Phrase it positively.</b> Prefer increase, create, enhance over reduce, remove, prevent.</li>
</ol>` },
      { id: "scope", t: "Finding the right scope", h: `
<div class="tbl"><table><thead><tr><th>Scope</th><th>Example</th></tr></thead><tbody>
<tr><td>Too broad</td><td>How might we fix dinner?</td></tr>
<tr><td><b>Just right</b></td><td><b>How might we help parents decide dinner from what's already in the fridge?</b></td></tr>
<tr><td>Too narrow</td><td>How might we add a fridge-scanning button? (a solution)</td></tr>
</tbody></table></div>
<aside class="co tip"><b>Team checklist</b><p>Is it based on an insight? Does it target an outcome? Is it positive? Is it broad enough? Does it avoid suggesting a solution? Too many HMWs? Merge overlaps or rank them by impact.</p></aside>` }
    ],
    keys: ["Problem statement = who + what + why.", "HMWs come from insights, not generic goals.", "No embedded solutions, no symptoms, no negative verbs.", "Merge or rank when you have too many."],
    lab: "hmw", labTitle: "Scope the How Might We", labIntro: "Classify each question. Feedback uses NN/g's five tips.",
    practice: `<p>Write one problem statement from your meal-planning insights, then five HMWs. Run each through the team checklist and rewrite any that fail.</p>`,
    quiz: [
      { q: "Which HMW is scoped well?", o: ["How might we improve food?", "How might we add a barcode scanner?", "How might we help commuters know if their train is late before they leave home?", "How might we use AI?"], a: 2, w: "Specific about who and the need, open about the solution." },
      { q: "'How might we stop users from calling support?' mainly targets…", o: ["An outcome", "A symptom", "A persona", "A metric"], a: 1, w: "Calls are a symptom; confidence and information are the outcome." },
      { q: "Where did NN/g say the HMW format was first introduced?", o: ["IDEO in 2010", "Procter & Gamble in the 1970s", "Google Ventures", "Apple"], a: 1, w: "P&G in the 1970s; IDEO later adopted it." }
    ],
    sources: [["NN/g: Using How Might We Questions", "https://www.nngroup.com/articles/how-might-we-questions/"]],
    figs: ["The three parts of a problem statement.", "Scoping How Might We questions."]
  },
  {
    id: "metrics", title: "Measuring success with HEART", mins: 15, level: "Intermediate",
    summary: "If you can't say how you'll know a design worked, you can't defend it. Google's HEART framework and the Goals–Signals–Metrics process give you a way.",
    goals: ["Explain the five HEART categories with examples", "Run the Goals → Signals → Metrics process", "Choose metrics that are normalized, sensitive and specific"],
    sections: [
      { id: "heart", t: "The HEART framework", h: `
<p>Kerry Rodden, Hilary Hutchinson and Xin Fu introduced HEART at CHI 2010 from their work with Google product teams. It gives five categories from which teams pick specific metrics:</p>
<div class="tbl"><table><thead><tr><th>Category</th><th>What it captures</th><th>Example metric</th></tr></thead><tbody>
<tr><td><b>H</b>appiness</td><td>Attitudes: satisfaction, visual appeal, likelihood to recommend, perceived ease of use</td><td>Weekly in-product satisfaction survey</td></tr>
<tr><td><b>E</b>ngagement</td><td>Frequency, intensity or depth of use over time</td><td>Visits per user per week</td></tr>
<tr><td><b>A</b>doption</td><td>New users starting to use a product or feature</td><td>Accounts created in the last 7 days</td></tr>
<tr><td><b>R</b>etention</td><td>Users from one period still active later</td><td>% of 7-day actives still active 3 months later</td></tr>
<tr><td><b>T</b>ask success</td><td>Effectiveness and efficiency</td><td>Completion rate, time on task, error rate</td></tr>
</tbody></table></div>
<aside class="co ex"><b>Example from the paper</b><p>After a major iGoogle redesign, satisfaction dipped, then recovered over time. The team read it as change aversion and kept the new design with more confidence.</p></aside>` },
      { id: "gsm", t: "Goals → Signals → Metrics", h: `
<ol class="steps">
<li><b>Goals.</b> What should the product or feature achieve for users? Use HEART as prompts. Don't worry yet about whether you can measure it.</li>
<li><b>Signals.</b> What behavior or attitude would show success or failure? Where will the data come from: logs, surveys?</li>
<li><b>Metrics.</b> Turn signals into numbers you can track on a dashboard over time.</li>
</ol>
<aside class="co tip"><b>Tips from the paper</b><p>Choose signals that move only when the experience changes, not for unrelated reasons. Sometimes failure is easier to see than success, for example abandonment or undo events. Normalize raw counts into ratios, percentages or per-user averages, because totals rise just from user growth.</p></aside>` },
      { id: "choose", t: "You don't need all five", h: `
<p>The authors are explicit: it is not always appropriate to use every category. Engagement may mean little for an enterprise tool people must use for work, where Happiness or Task success matter more. The framework's value is forcing a deliberate choice about each category.</p>
<aside class="co tip"><b>Guardrails</b><p>Pair a metric you want to move with one you must not hurt. Faster checkout is only a win if refunds don't climb.</p></aside>` }
    ],
    keys: ["HEART: Happiness, Engagement, Adoption, Retention, Task success.", "Goals first, then signals, then metrics.", "Report per-user averages and ratios, not raw totals.", "Pick the categories that fit; skip the rest deliberately."],
    lab: "heart", labTitle: "Build a HEART scorecard", labIntro: "Choose categories for a feature, then write a goal, signal and metric for each. The checker flags raw totals.",
    practice: `<p>For your meal-planning idea, fill a HEART table for the two categories that matter most: goal, signal, metric. Add one guardrail metric and explain why you skipped the other categories.</p>`,
    quiz: [
      { q: "Time to complete checkout belongs to which HEART category?", o: ["Happiness", "Adoption", "Retention", "Task success"], a: 3, w: "Task success covers effectiveness and efficiency." },
      { q: "Why report engagement as an average per user?", o: ["It looks bigger", "Totals can rise just because there are more users", "Surveys require it", "It is easier to compute"], a: 1, w: "Per-user figures separate more usage from more users." },
      { q: "What comes first in the process?", o: ["Metrics", "Signals", "Goals", "Dashboards"], a: 2, w: "Goals → Signals → Metrics." }
    ],
    sources: [["Rodden, Hutchinson & Fu (2010): Measuring the User Experience on a Large Scale", "https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/"]],
    figs: ["Google's HEART framework.", "Goal, signal and metric, plus a guardrail."]
  },
  {
    id: "prioritization", title: "Prioritization: RICE and matrices", mins: 15, level: "Intermediate",
    summary: "There are always more ideas than time. Scoring models and matrices turn arguments about opinions into arguments about inputs.",
    goals: ["Score ideas with RICE using Intercom's scales", "Run a fair prioritization matrix workshop", "Know when to override the score"],
    sections: [
      { id: "rice", t: "RICE, as Intercom defines it", h: `
<p class="formula">RICE score = (<b>Reach</b> × <b>Impact</b> × <b>Confidence</b>) ÷ <b>Effort</b></p>
<div class="tbl"><table><thead><tr><th>Factor</th><th>How to estimate it</th></tr></thead><tbody>
<tr><td>Reach</td><td>People or events per time period, e.g. customers per quarter, ideally from real product data</td></tr>
<tr><td>Impact</td><td>Per person: 3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal</td></tr>
<tr><td>Confidence</td><td>100% high, 80% medium, 50% low; below that is a moonshot</td></tr>
<tr><td>Effort</td><td>Person-months across product, design and engineering (0.5 for well under a month)</td></tr>
</tbody></table></div>
<p>Intercom describes the result as total impact per time worked. Sort by score, then sanity-check anything that looks surprisingly high or low.</p>` },
      { id: "matrix", t: "Prioritization matrices", h: `
<p>NN/g describes a prioritization matrix as a 2D visual of items placed by two weighted criteria. It descends from the Eisenhower Method's urgent/important quadrants; impact vs. effort is the most familiar version.</p>
<ol class="steps">
<li>Write items on sticky notes and agree two criteria tied to project goals.</li>
<li>Vote individually and silently: about half as many dots as items, each person voting only on their expertise (engineers on feasibility, designers on user impact).</li>
<li>Place items from the votes, with little discussion.</li>
<li>Discuss and negotiate placement.</li>
<li>Share the map and turn it into an action plan.</li>
</ol>
<aside class="co warn"><b>Stick to two criteria</b><p>NN/g warns that three criteria are hard and four or more extremely hard. Split into pairs or make several matrices instead.</p></aside>` },
      { id: "override", t: "When to override the score", h: `
<p>A score is input, not a verdict. Intercom names dependencies and table-stakes features as legitimate reasons to work out of order. Watch for scoring your own favourite features generously, and for impact numbers invented without data. Low confidence is a signal to do more research, not to guess higher.</p>
<aside class="co tip"><b>MVP thinking</b><p>Find the smallest version that tests your riskiest assumption. An MVP is a learning tool, not a smaller final product.</p></aside>` }
    ],
    keys: ["RICE = Reach × Impact × Confidence ÷ Effort.", "Impact 3 / 2 / 1 / 0.5 / 0.25; confidence 100 / 80 / 50%.", "Effort is in person-months.", "Vote silently first so the loudest voice doesn't win."],
    lab: "rice", labTitle: "RICE calculator and matrix", labIntro: "Edit the ideas. Scores, ranking and the impact/effort plot update live.",
    practice: `<p>List eight feature ideas for meal planning. Score each with RICE in a table, then plot them on an impact/effort matrix. Where do the two methods disagree, and why?</p>`,
    quiz: [
      { q: "Reach 500, Impact 2, Confidence 80%, Effort 4. What is the RICE score?", o: ["200", "250", "400", "1000"], a: 0, w: "500 × 2 × 0.8 ÷ 4 = 200." },
      { q: "In Intercom's model, Effort is measured in…", o: ["Story points", "Person-weeks", "Person-months", "Hours"], a: 2, w: "Person-months across product, design and engineering." },
      { q: "In a matrix workshop, what happens before discussion?", o: ["The manager decides", "Silent individual voting", "Building prototypes", "Writing personas"], a: 1, w: "Silent voting first reduces groupthink and HIPPO effects." }
    ],
    sources: [["Intercom: RICE Prioritization", "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/"], ["NN/g: Using Prioritization Matrices", "https://www.nngroup.com/articles/prioritization-matrices/"]],
    figs: ["The impact/effort matrix.", "RICE with a worked example."]
  }
  ]
});
