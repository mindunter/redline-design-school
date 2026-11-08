/* Redline Design School: course content, modules 4–6. */
COURSE.push({
  id: "structure", title: "Information Architecture & Flows", color: "#0E8A7A",
  blurb: "Organize content the way people think, map their journeys, and sketch the skeleton before the skin.",
  lessons: [
  {
    id: "information-architecture", title: "Information architecture", mins: 16, level: "Intermediate",
    summary: "Information architecture is how content is organized, labeled and connected so people can find things. Card sorting reveals how users think; tree testing checks your structure.",
    goals: ["Name the four building blocks of IA", "Plan an open card sort with the right card and participant counts", "Run a tree test with good task wording"],
    sections: [
      { id: "pieces", t: "The building blocks", h: `
<ul>
<li><b>Organization:</b> how items are grouped: by task, audience, topic or time.</li>
<li><b>Labeling:</b> the words used. Use your users' vocabulary, not internal jargon.</li>
<li><b>Navigation:</b> how people move between groups.</li>
<li><b>Search:</b> the fallback when browsing fails.</li>
</ul>
<p>Good IA is invisible. Bad IA shows up as people asking "where is…?"</p>` },
      { id: "card-sort", t: "Card sorting: learn the user's mental model", h: `
<p>In a card sort, participants put individually labeled cards into groups that make sense to them, then name the groups. NN/g's guidance:</p>
<div class="tbl"><table><thead><tr><th>Decision</th><th>Guidance</th></tr></thead><tbody>
<tr><td>Number of cards</td><td>30–50. Above 50, people tire and dump items into "Miscellaneous".</td></tr>
<tr><td>Participants</td><td>At least 15 for qualitative insight; 30–50 for quantitative results</td></tr>
<tr><td>Open sort</td><td>No predefined categories. The most common type, best for discovery.</td></tr>
<tr><td>Closed sort</td><td>Predefined categories. Used for validation, but tree testing is usually better.</td></tr>
<tr><td>Hybrid sort</td><td>Some predefined categories. Generally discouraged because it biases people.</td></tr>
</tbody></table></div>
<aside class="co warn"><b>Common mistake</b><p>Repeating words across labels. "Toyota Camry" and "Toyota Matrix" get grouped by brand because of the shared word, not because of meaning.</p></aside>` },
      { id: "tree-test", t: "Tree testing: check the structure", h: `
<p>NN/g describes tree testing as evaluating a hierarchy (the "tree") by asking people to find where things live. It needs no layout or visual design, only the tree and tasks.</p>
<ol class="steps">
<li>Write out the full tree down to the lowest level.</li>
<li>Write tasks as short scenarios. Never reuse the exact label: "Find 'Shipping policy'" just tests word matching.</li>
<li>Run the test and look at success rates and <b>directness</b>: did people go straight there, or wander and backtrack?</li>
</ol>
<aside class="co tip"><b>Generative vs. evaluative</b><p>Card sorting is generative: it gives you ideas for a structure. Tree testing is evaluative: it tells you whether a structure works. Use them in that order, before any layout or content work.</p></aside>` }
    ],
    keys: ["IA = organization, labeling, navigation, search.", "Card sorts: 30–50 cards, 15+ people for qualitative.", "Open sorts discover; tree tests validate.", "Task wording must not repeat the target label."],
    lab: "treetest", labTitle: "Run a mini tree test", labIntro: "Find each item by clicking through the menu. The lab records success and directness like a real tree test.",
    practice: `<p>List 25–30 things a meal-planning app could contain. Ask two people to group and name them (open card sort). Compare the groupings, draft a sitemap, then write three tree-test tasks that avoid the exact labels.</p>`,
    quiz: [
      { q: "Which method validates a proposed hierarchy without any visuals?", o: ["Open card sort", "Tree test", "A/B test", "Heatmap"], a: 1, w: "Tree tests check findability in a text-only structure." },
      { q: "How many cards does NN/g recommend for a card sort?", o: ["5–10", "30–50", "80–100", "As many as possible"], a: 1, w: "30–50; more causes fatigue and a big Miscellaneous pile." },
      { q: "'Find the Shipping Policy page' is a weak tree-test task because…", o: ["It is too short", "It reuses the exact label", "It mentions shipping", "It has no persona"], a: 1, w: "Reusing labels tests word matching, not understanding." }
    ],
    sources: [["NN/g: Card Sorting", "https://www.nngroup.com/articles/card-sorting-definition/"], ["NN/g: Tree Testing", "https://www.nngroup.com/articles/tree-testing/"]],
    figs: ["A sitemap for the meal-planning app.", "An open card sort in progress."]
  },
  {
    id: "user-flows", title: "User flows and journey maps", mins: 14, level: "Intermediate",
    summary: "Flows map one task screen by screen. Journey maps zoom out to a person's whole experience, including feelings and moments outside the product.",
    goals: ["Draw a flow that includes unhappy paths", "Build a journey map with all five components", "Use the emotion line to find opportunities"],
    sections: [
      { id: "flows", t: "User flows", h: `
<p>A user flow maps the steps someone takes to complete one task: screens, decisions and outcomes.</p>
<ul>
<li>Start at a clear entry point and end at a clear success state.</li>
<li>Use rectangles for screens and diamonds for decisions.</li>
<li>Draw the <b>unhappy paths</b>: wrong password, no results, lost connection. That is where much of the real design work lives.</li>
</ul>
<aside class="co tip"><b>Tip</b><p>Count the steps. Each one is a chance to drop off, so ask of every step: can we remove it, merge it or defer it?</p></aside>` },
      { id: "journey", t: "Journey maps", h: `
<p>NN/g defines a journey map as a visualization of the process a person goes through to accomplish a goal. It has five components:</p>
<ol class="steps">
<li><b>Actor:</b> one persona per map. Students and faculty need two maps.</li>
<li><b>Scenario and expectations:</b> the situation and what the actor expects.</li>
<li><b>Journey phases:</b> high-level stages, e.g. for e-commerce: discover, try, buy, use, seek support.</li>
<li><b>Actions, mindsets and emotions:</b> what they do and think, plus a single emotion line rising and falling across phases.</li>
<li><b>Opportunities:</b> what the team can improve, usually where the emotion line dips.</li>
</ol>
<aside class="co warn"><b>Common mistake</b><p>Mixing several actors in one map. Their journeys differ, and the map becomes vague for everyone.</p></aside>` },
      { id: "relatives", t: "Related maps", h: `
<div class="tbl"><table><thead><tr><th>Map</th><th>Use it for</th></tr></thead><tbody>
<tr><td>Experience map</td><td>A broader parent view, not tied to one product</td></tr>
<tr><td>Service blueprint</td><td>The business side: staff, systems and processes behind each step</td></tr>
<tr><td>User-story map</td><td>Planning and slicing work, not discovery</td></tr>
</tbody></table></div>
<p>Mindsets are strongest when they use real quotes from research. Actions should read as a narrative, not a log of every click.</p>` }
    ],
    keys: ["Flows show one task; journeys show the whole experience.", "Always draw unhappy paths.", "One actor per journey map.", "The emotion line's dips are your opportunities."],
    lab: "journey", labTitle: "Plot the emotion line", labIntro: "Set how the actor feels at each phase. The lab draws the curve and marks the biggest opportunity.",
    practice: `<p>Draw the flow for "plan this week's dinners" from opening the app to a saved plan, with at least three unhappy paths. Then sketch a five-phase journey map for the same persona and circle the lowest emotional point.</p>`,
    quiz: [
      { q: "What does a journey map include that a user flow usually doesn't?", o: ["Screens", "Emotions and offline moments over time", "Buttons", "Error states"], a: 1, w: "Journey maps capture the wider experience and feelings." },
      { q: "How many actors should one journey map have?", o: ["One", "Two", "All personas", "None"], a: 0, w: "NN/g recommends one actor per map." },
      { q: "Which map shows the staff and systems behind each step?", o: ["Experience map", "Service blueprint", "User-story map", "Sitemap"], a: 1, w: "Service blueprints add the business-side view." }
    ],
    sources: [["NN/g: Journey Mapping 101", "https://www.nngroup.com/articles/journey-mapping-101/"]],
    figs: ["A user flow with an unhappy path.", "A journey map with its emotion curve."]
  },
  {
    id: "wireframing", title: "Wireframing and Crazy 8s", mins: 12, level: "Beginner",
    summary: "Wireframes define structure and hierarchy without visual polish. Crazy 8s pushes you past your first idea before you commit to one.",
    goals: ["Choose the right wireframe fidelity", "Run a Crazy 8s round", "Use real content to expose real problems"],
    sections: [
      { id: "ladder", t: "The fidelity ladder", h: `
<ol class="steps">
<li><b>Sketches:</b> minutes each, many variants.</li>
<li><b>Low-fi wireframes:</b> grey boxes and real headlines.</li>
<li><b>Mid-fi wireframes:</b> real content and real layout, still greyscale.</li>
</ol>
<p>Wireframes answer "what is on this screen, in what order, with what importance?" They are not about style.</p>` },
      { id: "content", t: "Use real content early", h: `
<p>Placeholder text hides problems. The real product name is longer, the real list has 47 items, the real error message needs two lines. Brad Frost makes the same point about design systems: test pages with representative content, like a cart with 1 item versus 10, or a 40-character headline versus a 340-character one.</p>` },
      { id: "crazy8s", t: "Crazy 8s", h: `
<p>The Open Practice Library calls Crazy 8s a core Design Sprint method: sketch eight distinct ideas in eight minutes. Its purpose is to push past the first idea, which is often the least innovative.</p>
<ol class="steps">
<li>Give everyone a sheet of paper and a marker.</li>
<li>Fold the sheet in half three times to make eight panels.</li>
<li>Set a timer for eight minutes: one minute per panel.</li>
<li>Sketch eight variations of one idea, or eight different ideas.</li>
<li>Pens down when the timer ends.</li>
<li>Each person presents their sheet for about two minutes.</li>
</ol>
<p>Follow up with dot voting on ideas and components, then combine the strongest into one concept to prototype.</p>` }
    ],
    keys: ["Wireframes are about hierarchy, not style.", "Real content exposes real problems.", "Crazy 8s: eight ideas, eight minutes, then present and vote."],
    lab: "crazy8", labTitle: "Crazy 8s timer", labIntro: "Grab paper and a marker. Each panel lights up for its minute. Use demo mode to see it run in 16 seconds.",
    practice: `<p>Run a Crazy 8s round for the weekly plan screen. Pick the strongest two and turn them into mid-fi wireframes in Figma using real recipe names, including one very long one.</p>`,
    quiz: [
      { q: "Why avoid lorem ipsum in wireframes?", o: ["It is copyrighted", "It hides real length and content problems", "Clients dislike Latin", "Figma blocks it"], a: 1, w: "Real content exposes layout issues early." },
      { q: "How long does each Crazy 8s panel get?", o: ["10 seconds", "One minute", "Two minutes", "Five minutes"], a: 1, w: "Eight panels in eight minutes." },
      { q: "What usually follows a Crazy 8s round?", o: ["Shipping", "Presenting and dot voting", "Card sorting", "A/B testing"], a: 1, w: "Present, vote, then consolidate into one concept." }
    ],
    sources: [["Open Practice Library: Crazy 8s", "https://openpracticelibrary.com/practice/crazy-8s/"], ["Brad Frost, Atomic Design, chapter 2", "https://atomicdesign.bradfrost.com/chapter-2/"]],
    figs: ["The same screen at three fidelities.", "Crazy 8s: eight ideas in eight minutes."]
  }
  ]
});

COURSE.push({
  id: "interaction", title: "Interaction Design", color: "#C25A00",
  blurb: "The psychology, heuristics and states that make an interface feel effortless.",
  lessons: [
  {
    id: "laws-of-ux", title: "Laws of UX", mins: 16, level: "Intermediate",
    summary: "A handful of findings from psychology explain why some interfaces feel easy. Learn where each came from and how to apply it without over-applying it.",
    goals: ["Apply Fitts's, Hick's, Jakob's and Miller's laws", "Design for the 400 ms Doherty threshold", "Avoid treating these laws as rigid rules"],
    sections: [
      { id: "fitts", t: "Fitts's law (1954)", h: `
<p>Psychologist Paul Fitts showed that the time to reach a target depends on its <b>distance</b> and <b>size</b>. Farther and smaller means slower, and rushing toward small targets causes more errors.</p>
<ul><li>Make touch targets large enough.</li><li>Leave space between them.</li><li>Put primary actions close to where the hand or cursor already is.</li></ul>` },
      { id: "hick", t: "Hick's law (1952)", h: `
<p>William Edmund Hick and Ray Hyman found that decision time grows with the number and complexity of choices (it's also called the Hick–Hyman law).</p>
<ul><li>Minimize choices when speed matters.</li><li>Break complex tasks into smaller steps.</li><li>Highlight a recommended option.</li><li>Reveal features progressively, as Slack does by introducing features gradually.</li></ul>
<aside class="co warn"><b>Don't overdo it</b><p>Laws of UX warns against simplifying so far that the interface becomes abstract and unclear.</p></aside>` },
      { id: "jakob", t: "Jakob's law", h: `
<p>Coined by Jakob Nielsen: people spend most of their time on <em>other</em> sites, so they expect yours to work the same way. Use conventions unless you have a strong reason not to.</p>
<aside class="co ex"><b>Example from the source</b><p>When YouTube moved to a Material Design look in 2017, it let desktop users preview the new UI, send feedback and switch back for a while, easing the change instead of forcing it.</p></aside>` },
      { id: "miller", t: "Miller's law (1956)", h: `
<p>George Miller argued that people can hold about seven (plus or minus two) items in working memory. The useful lesson is <b>chunking</b>: group information so it is easier to process and remember, as phone numbers are split into groups.</p>
<aside class="co warn"><b>Common mistake</b><p>Using "the magical number seven" to justify arbitrary limits, like "never more than seven menu items". Capacity varies with knowledge and context.</p></aside>` },
      { id: "doherty", t: "The Doherty threshold (1982)", h: `
<p>Walter Doherty and Ahrvind Thadani, writing in the IBM Systems Journal, argued for a 400 ms response time, replacing the earlier 2-second standard. When computer and person both respond within about 400 ms, neither waits on the other and productivity rises.</p>
<ul><li>Give feedback within 400 ms, even if the work takes longer.</li><li>Use skeleton screens and animation to improve perceived performance.</li><li>Progress bars make waits tolerable even when they aren't precise.</li></ul>` }
    ],
    keys: ["Fitts: big, close targets are faster and safer.", "Hick: fewer, clearer choices speed decisions.", "Jakob: follow conventions by default.", "Miller: chunk information; 7±2 is not a hard limit.", "Doherty: respond within 400 ms."],
    lab: "fitts", labTitle: "Feel Fitts's law", labIntro: "Click the targets as fast as you can. The lab compares your times for small, far targets and large, near ones.",
    practice: `<p>Screenshot three screens from apps you use. Annotate each with one law it follows and one it breaks, then sketch a fix for the worst case.</p>`,
    quiz: [
      { q: "A settings page with 40 toggles on one screen mainly strains…", o: ["Fitts's law", "Hick's law", "The Doherty threshold", "Jakob's law"], a: 1, w: "More choices mean slower decisions." },
      { q: "Placing the main action at the bottom of a phone screen, near the thumb, applies…", o: ["Fitts's law", "Miller's law", "Hick's law", "Jakob's law"], a: 0, w: "The target is closer, so it's faster to reach." },
      { q: "The Doherty threshold sets system response at about…", o: ["100 ms", "400 ms", "2 seconds", "10 seconds"], a: 1, w: "400 ms replaced the earlier 2-second standard." },
      { q: "What is the practical lesson of Miller's law?", o: ["Never show more than 7 items", "Chunk information", "Use 7 colors", "Limit pages to 7"], a: 1, w: "Chunking helps; the number isn't a rigid limit." }
    ],
    sources: [["Laws of UX: Fitts's Law", "https://lawsofux.com/fittss-law/"], ["Laws of UX: Hick's Law", "https://lawsofux.com/hicks-law/"], ["Laws of UX: Jakob's Law", "https://lawsofux.com/jakobs-law/"], ["Laws of UX: Miller's Law", "https://lawsofux.com/millers-law/"], ["Laws of UX: Doherty Threshold", "https://lawsofux.com/doherty-threshold/"]],
    figs: ["Fitts's law: distance and target size.", "Hick's law: more choices, slower decisions."]
  },
  {
    id: "affordance-feedback", title: "Signifiers, feedback and heuristics", mins: 15, level: "Intermediate",
    summary: "People need to see what they can do, and know that it worked. Norman's signifiers and Nielsen's ten heuristics are the grammar of interaction design.",
    goals: ["Design clear signifiers for clickable elements", "Give feedback for every action", "Use Nielsen's ten heuristics to review a design"],
    sections: [
      { id: "signifiers", t: "Affordances and signifiers", h: `
<p>An <b>affordance</b> is what an object lets you do. A <b>signifier</b> is the visible cue that tells you so. Don Norman originally talked about "perceived affordances" and later called them signifiers.</p>
<p>NN/g's guidance on clickable elements:</p>
<ul>
<li>Give buttons a recognizable shape: rectangular, ideally with rounded corners.</li>
<li>Make text links stand out; blue is safest, but any distinct color works if static text never uses it.</li>
<li>Pair icons with text labels.</li>
<li>Don't style headings or static text like buttons or links.</li>
</ul>
<aside class="co ex"><b>From the source</b><p>NN/g cites an early study where clicks rose 416% after flat buttons were changed to 3-D ones. Stripping every visual cue in the name of flat design makes interfaces harder to use.</p></aside>` },
      { id: "feedback", t: "Feedback", h: `
<p>Every action needs a visible response: a pressed state, a spinner, a toast, an updated list. Without it, people repeat the action and double-submit forms. This is heuristic #1, visibility of system status.</p>` },
      { id: "heuristics", t: "Nielsen's ten usability heuristics", h: `
<p>Jakob Nielsen developed these with Rolf Molich in 1990 and refined them in 1994 from an analysis of 249 usability problems. They are broad rules of thumb, not specific guidelines.</p>
<ol class="steps heur">
<li><b>Visibility of system status</b></li>
<li><b>Match between the system and the real world</b></li>
<li><b>User control and freedom</b></li>
<li><b>Consistency and standards</b></li>
<li><b>Error prevention</b></li>
<li><b>Recognition rather than recall</b></li>
<li><b>Flexibility and efficiency of use</b></li>
<li><b>Aesthetic and minimalist design</b></li>
<li><b>Help users recognize, diagnose and recover from errors</b></li>
<li><b>Help and documentation</b></li>
</ol>
<aside class="co def"><b>Slips vs. mistakes</b><p>Under error prevention, Nielsen separates slips (unconscious errors from inattention) from mistakes (conscious errors from a wrong mental model). Slips need constraints and good defaults; mistakes need clearer communication.</p></aside>` }
    ],
    keys: ["Affordance = what's possible; signifier = the cue that shows it.", "Buttons look like buttons; links look like links.", "Every action gets immediate feedback.", "Use the ten heuristics as a review checklist."],
    lab: "clickable", labTitle: "Which of these look clickable?", labIntro: "Tap everything you think is interactive, then reveal. Each element explains the signifier it has, or lacks.",
    practice: `<p>Do a heuristic review of an app you use: go through all ten heuristics and log at least one issue or good example for each, with a screenshot.</p>`,
    quiz: [
      { q: "People double-submit a form because nothing changes after the first click. What's missing?", o: ["Affordance", "Feedback", "Mapping", "A constraint"], a: 1, w: "Without feedback, people repeat the action." },
      { q: "Which is heuristic #1?", o: ["Error prevention", "Visibility of system status", "Help and documentation", "Consistency and standards"], a: 1, w: "Keep people informed about what's going on." },
      { q: "An unconscious error caused by inattention is a…", o: ["Mistake", "Slip", "Bug", "Lapse of policy"], a: 1, w: "Slips come from inattention; mistakes from a wrong mental model." }
    ],
    sources: [["NN/g: 10 Usability Heuristics", "https://www.nngroup.com/articles/ten-usability-heuristics/"], ["NN/g: Beyond Blue Links: Making Clickable Elements Recognizable", "https://www.nngroup.com/articles/clickable-elements/"], ["Don Norman, The Design of Everyday Things", "https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/"]],
    figs: ["Signifiers tell you how to use a door.", "A button's feedback states."]
  },
  {
    id: "ui-states", title: "Designing every state and error", mins: 14, level: "Intermediate",
    summary: "Beginners design the ideal screen. Professionals design all of its states, and write error messages that help instead of blame.",
    goals: ["List the states every screen needs", "Write error messages using NN/g's guidelines", "Design interactive states for every control"],
    sections: [
      { id: "states", t: "Screen states", h: `
<div class="tbl"><table><thead><tr><th>State</th><th>Design it to…</th></tr></thead><tbody>
<tr><td>Empty</td><td>Explain what will appear and how to add the first item</td></tr>
<tr><td>Loading</td><td>Use skeletons for content; spinners only for short waits</td></tr>
<tr><td>Partial</td><td>Look intentional with one item or a half-full list</td></tr>
<tr><td>Ideal</td><td>The screen you already drew</td></tr>
<tr><td>Error</td><td>Say what went wrong and how to fix it</td></tr>
<tr><td>Overflow</td><td>Survive long names, 1,000 items and huge numbers</td></tr>
</tbody></table></div>` },
      { id: "errors", t: "Error messages that help", h: `
<p>NN/g defines an error message as a system-generated interruption telling the user something is incomplete, incompatible or undesirable. Their guidance falls into three groups:</p>
<ol class="steps">
<li><b>Visibility.</b> Show the message next to the source of the error, in bold, high-contrast styling with redundant cues. Around 350 million people have color-vision deficiency, so never rely on red alone. Save modal dialogs for severe errors, and don't flag errors before people have finished typing.</li>
<li><b>Communication.</b> Use plain language and hide error codes. Avoid vague messages like "An error occurred." Offer a remedy. Don't blame users with words like "invalid" or "incorrect", and avoid jokes.</li>
<li><b>Efficiency.</b> Preserve what people typed. Suggest likely fixes. Warn before likely mistakes, such as a missing attachment.</li>
</ol>
<div class="dd"><div class="do"><b>Better</b><ul><li>"Your card was declined. Check the number or try another card."</li></ul></div><div class="dont"><b>Worse</b><ul><li>"Error 402"</li><li>"Invalid input!"</li></ul></div></div>` },
      { id: "control-states", t: "Interactive states for controls", h: `
<p>Every control needs: default, hover, focus, pressed, disabled and selected (where relevant). WebAIM notes that WCAG requires interactive components to keep 3:1 contrast in every state, and that a missing focus indicator fails success criterion 2.4.7.</p>` }
    ],
    keys: ["Empty, loading, partial, ideal, error, overflow.", "Errors: visible, plain, constructive, never blaming.", "Preserve user input after errors.", "Controls need visible focus and 3:1 contrast in every state."],
    lab: "states", labTitle: "State switcher", labIntro: "Switch the same screen between its states and read what each one is doing.",
    practice: `<p>Take your weekly plan wireframe and design its empty, loading, error and overflow states. Write the real copy for the empty and error states using NN/g's guidelines.</p>`,
    quiz: [
      { q: "Which is the best error message?", o: ["Error 402", "Something went wrong", "Your card was declined. Check the number or try another card.", "Invalid input!"], a: 2, w: "It says what happened and how to fix it." },
      { q: "Where should an error message appear?", o: ["In a modal, always", "Near the source of the error", "At the top of the page only", "In the console"], a: 1, w: "Close to the problem, with modals saved for severe errors." },
      { q: "Why add an icon or text to red error styling?", o: ["Decoration", "Color alone fails people with color-vision deficiency", "Branding", "SEO"], a: 1, w: "Redundant cues reach everyone." }
    ],
    sources: [["NN/g: Error-Message Guidelines", "https://www.nngroup.com/articles/error-message-guidelines/"], ["WebAIM: Contrast and Color Accessibility", "https://webaim.org/articles/contrast/"]],
    figs: ["Six states every screen needs.", "Interactive states of a text input."]
  }
  ]
});

COURSE.push({
  id: "visual", title: "Visual Design", color: "#B8860B",
  blurb: "Typography, color and spacing: the craft that makes hierarchy visible and interfaces readable.",
  lessons: [
  {
    id: "typography", title: "Typography for interfaces", mins: 15, level: "Intermediate",
    summary: "Most of an interface is text, so typography carries most of the visual design. Set a scale, control line length and spacing, and let hierarchy come from contrast.",
    goals: ["Build a modular type scale", "Keep line length and line spacing in comfortable ranges", "Create hierarchy with weight and color before size"],
    sections: [
      { id: "scale", t: "Build a type scale", h: `
<p>Pick a base size (16 px is a common body size on screens) and a ratio, then multiply up. With a ratio of 1.25 you get 16, 20, 25, 31, 39. Limit yourself to about five sizes; hierarchy comes from contrast, and too many sizes blur it.</p>` },
      { id: "line-length", t: "Line length", h: `
<p>Matthew Butterick's <em>Practical Typography</em> recommends <b>45 to 90 characters per line</b>, counting spaces. Measure in characters, not inches or pixels, because font size changes how many characters fit. A quick check: two to three lowercase alphabets should fit on one line.</p>
<p>Long lines make the eye travel further to find the next line, which is why newspapers use narrow columns. Butterick also warns that responsive web layouts often neglect line length.</p>` },
      { id: "line-spacing", t: "Line spacing", h: `
<p>Butterick recommends line spacing of <b>120% to 145% of the font size</b>. In CSS, use a unitless <code>line-height</code> (for example 1.35). Fonts that look small at a given size need less spacing. Headings, set large, usually want tighter spacing than body text.</p>
<aside class="co warn"><b>Common mistake</b><p>Defaulting to "single" or "double" spacing in word processors. Butterick notes these map to roughly 117% and 233%, both outside the comfortable range.</p></aside>` },
      { id: "hierarchy", t: "Hierarchy without shouting", h: `
<ul>
<li>Try weight or color before making text bigger.</li>
<li>Two typeface families at most; one family in several weights is often enough.</li>
<li>Left-align body text. The A11y Project checklist flags centered or justified body text as an accessibility problem.</li>
</ul>` }
    ],
    keys: ["Base size × ratio = type scale; keep about five sizes.", "45–90 characters per line (Butterick).", "Line spacing 120–145% of font size.", "Use weight and color before size."],
    lab: "typescale", labTitle: "Type scale and measure lab", labIntro: "Change the base and ratio to build a scale, then drag the column width and watch the characters-per-line counter.",
    practice: `<p>Create five text styles in Figma (Display, H1, H2, Body, Caption) from a modular scale. Apply them to your weekly plan screen, check one paragraph's line length with the alphabet test, and remove any size not in your scale.</p>`,
    quiz: [
      { q: "With a 16 px base and a 1.25 ratio, the next size up is…", o: ["18 px", "20 px", "24 px", "32 px"], a: 1, w: "16 × 1.25 = 20." },
      { q: "Butterick's recommended line length is…", o: ["20–40 characters", "45–90 characters", "100–140 characters", "Any length"], a: 1, w: "45 to 90 characters per line, including spaces." },
      { q: "Butterick's recommended line spacing is…", o: ["100%", "120–145% of the font size", "200%", "Double spacing"], a: 1, w: "120% to 145%; single and double fall outside it." }
    ],
    sources: [["Butterick's Practical Typography: Line length", "https://practicaltypography.com/line-length.html"], ["Butterick's Practical Typography: Line spacing", "https://practicaltypography.com/line-spacing.html"], ["The A11Y Project: Checklist", "https://www.a11yproject.com/checklist/"]],
    figs: ["A type scale with base 16 and ratio 1.25.", "Line length: the comfortable column sits inside Butterick's 45–90 character range."]
  },
  {
    id: "color", title: "Color and contrast", mins: 16, level: "Intermediate",
    summary: "Color in interfaces is a system with jobs. Contrast rules from WCAG decide whether people can actually read and operate what you design.",
    goals: ["Organize color into neutrals, primary and semantic roles", "Apply WCAG contrast thresholds correctly", "Never rely on color alone"],
    sections: [
      { id: "roles", t: "Give color jobs", h: `
<ul>
<li><b>Neutrals</b> do most of the work: backgrounds, text, borders.</li>
<li><b>Primary</b> marks brand and main actions. Use it sparingly so it keeps its meaning.</li>
<li><b>Semantic</b> colors signal success, warning, danger and information.</li>
</ul>
<p>Build each as a scale of tints and shades (for example 50 to 900) so you have consistent steps for hover states, backgrounds and borders. The "60-30-10" split (dominant, secondary, accent) is a handy starting heuristic from interior design, not a rule.</p>` },
      { id: "contrast", t: "WCAG contrast thresholds", h: `
<p>Contrast ratio runs from 1:1 (no contrast) to 21:1 (black on white). Per WebAIM's summary of WCAG 2:</p>
<div class="tbl"><table><thead><tr><th>Content</th><th>AA</th><th>AAA</th></tr></thead><tbody>
<tr><td>Normal text</td><td>4.5:1 (SC 1.4.3)</td><td>7:1 (SC 1.4.6)</td></tr>
<tr><td>Large text (18 pt+, or 14 pt+ bold; about 24 px / 18.67 px)</td><td>3:1</td><td>4.5:1</td></tr>
<tr><td>UI components and meaningful graphics</td><td>3:1 against adjacent colors (SC 1.4.11)</td><td>–</td></tr>
</tbody></table></div>
<aside class="co warn"><b>No rounding up</b><p>#777777 on white is 4.47:1. It fails 4.5:1. WebAIM is explicit that ratios can't be rounded.</p></aside>
<p>Interesting fact from WebAIM: on white, pure red reaches only about 4:1 and pure green about 1.4:1, while pure blue reaches about 8.6:1.</p>` },
      { id: "not-alone", t: "Never use color alone", h: `
<p>SC 1.4.1 says color can't be the only way information is conveyed. Pair it with an icon, text or pattern. For links inside body text, keep the underline; without one, the link needs 3:1 contrast against surrounding text, a hover and focus cue, and 4.5:1 against the background.</p>` }
    ],
    keys: ["Neutrals carry most of the UI; primary is for emphasis.", "AA: 4.5:1 text, 3:1 large text and UI components.", "AAA: 7:1 normal text.", "Never convey meaning with color alone; never round ratios."],
    lab: "contrast", labTitle: "Live contrast checker", labIntro: "Pick text and background colors. The ratio uses the WCAG 2 luminance formula and shows pass or fail for each criterion.",
    practice: `<p>Create a palette for your app: a neutral scale, one primary and four semantic colors. Check every text-on-background pair in this lab and fix anything that fails AA.</p>`,
    quiz: [
      { q: "Minimum WCAG AA contrast for normal body text?", o: ["2:1", "3:1", "4.5:1", "7:1"], a: 2, w: "4.5:1 for normal text; 7:1 is AAA." },
      { q: "A ratio of 4.47:1 for normal text…", o: ["Passes AA after rounding", "Fails AA", "Passes AAA", "Only fails on mobile"], a: 1, w: "Ratios can't be rounded up." },
      { q: "UI components like input borders need at least…", o: ["1.5:1", "3:1", "4.5:1", "7:1"], a: 1, w: "SC 1.4.11 sets 3:1 against adjacent colors." }
    ],
    sources: [["WebAIM: Contrast and Color Accessibility", "https://webaim.org/articles/contrast/"], ["WebAIM: Contrast Checker", "https://webaim.org/resources/contrastchecker/"]],
    figs: ["A UI palette: neutrals, primary and semantic colors.", "The 60-30-10 split and WCAG AA contrast thresholds."]
  },
  {
    id: "layout-spacing", title: "Layout, grids and spacing", mins: 14, level: "Intermediate",
    summary: "Consistent spacing is the fastest way to make a design look professional. Use an 8-point system, let proximity do the grouping, and build on an adaptive grid.",
    goals: ["Apply the 8-point grid with hard and soft grid methods", "Group with proximity instead of boxes", "Plan responsive column grids"],
    sections: [
      { id: "8pt", t: "The 8-point grid", h: `
<p>Spec.fm's guide: use multiples of 8 for the dimensions, padding and margins of elements. It narrows your spacing choices, and most popular screen sizes divide by 8 on at least one axis.</p>
<ul>
<li>Pair the 8-point grid with a 4-point <b>baseline</b> grid for text.</li>
<li><b>Hard grid:</b> snap elements into containers sized in 8s. <b>Soft grid:</b> measure 8-point steps between elements, which is more fluid.</li>
<li>For text buttons, set the font size, then let padding define the button size.</li>
<li>In CSS with a 16 px root, 0.5rem steps give you an 8-point grid.</li>
</ul>
<aside class="co tip"><b>Odd screen sizes are fine</b><p>Keep padding and margins on the grid and let one block absorb the remainder.</p></aside>` },
      { id: "proximity", t: "Proximity does the grouping", h: `
<p>Items closer together read as related. Make the space <em>between</em> groups clearly larger than the space <em>within</em> them. This Gestalt principle often removes the need for borders and boxes.</p>` },
      { id: "grids", t: "Adaptive column grids", h: `
<p>Material Design 3 builds layouts on a grid that adapts across breakpoints: as the screen grows, column count, width and spacing change. Compact screens use fewer columns for a focused layout; larger ones add columns for richer layouts. A common starting point is 4 columns on phones, 8 on tablets and 12 on desktops.</p>
<p>M3 also places bars and rails at the screen edges first, then fills the main region with panes, and uses "rulers" to align titles and content consistently.</p>` }
    ],
    keys: ["Space and size in multiples of 8; baseline text on 4.", "Space between groups > space within groups.", "Grids change column count by breakpoint.", "Let padding define button size."],
    lab: "spacing", labTitle: "8-point spacing playground", labIntro: "Drag the sliders to change padding and gaps. Off-grid values turn red, just like a spec review.",
    practice: `<p>Redline your weekly plan screen: annotate every gap with its value. Change any value off the 8-point scale, and remove any border that proximity can replace.</p>`,
    quiz: [
      { q: "Which spacing set follows the 8-point system?", o: ["5, 10, 15, 20", "8, 16, 24, 32", "6, 12, 18, 24", "10, 20, 30, 40"], a: 1, w: "All are multiples of 8." },
      { q: "What baseline grid does Spec.fm pair with the 8-point grid?", o: ["2-point", "4-point", "10-point", "12-point"], a: 1, w: "A 4-point baseline for text." },
      { q: "In M3, what changes as screens get larger?", o: ["Nothing", "Column count, width and spacing", "Only font size", "Only colors"], a: 1, w: "Grids adapt across breakpoints." }
    ],
    sources: [["Spec.fm: The 8-Point Grid", "https://spec.fm/specifics/8-pt-grid"], ["Material Design 3: Grids and spacing", "https://m3.material.io/foundations/layout/grids-spacing/grids"]],
    figs: ["A card redlined on the 8-point scale.", "12, 8 and 4 column grids."]
  }
  ]
});
