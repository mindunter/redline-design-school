/* Redline Design School: course content, modules 7–9 and glossary. */
COURSE.push({
  id: "systems", title: "Design Systems & Figma", color: "#3A57C4",
  blurb: "Components, tokens, auto layout and handoff: designing at the scale real teams work.",
  lessons: [
  {
    id: "components-tokens", title: "Atomic design, components and tokens", mins: 15, level: "Intermediate",
    summary: "A design system is a shared set of decisions, components and guidelines. Atomic design gives you a mental model; tokens and variables make decisions reusable.",
    goals: ["Explain the five stages of atomic design", "Name tokens by purpose so themes can change", "Use Figma variables and modes for theming"],
    sections: [
      { id: "atomic", t: "Atomic design in five stages", h: `
<div class="tbl"><table><thead><tr><th>Stage</th><th>What it is</th><th>Example</th></tr></thead><tbody>
<tr><td>Atoms</td><td>Basic elements that stop being useful if split further</td><td>Label, input, button</td></tr>
<tr><td>Molecules</td><td>Simple groups of atoms working as a unit</td><td>Search form: label + input + button</td></tr>
<tr><td>Organisms</td><td>Complex sections made of molecules, atoms or other organisms</td><td>Site header, product grid</td></tr>
<tr><td>Templates</td><td>Page layouts showing content structure, without final content</td><td>Article template</td></tr>
<tr><td>Pages</td><td>Templates filled with representative content</td><td>Cart with 1 item vs. 10 items</td></tr>
</tbody></table></div>
<p>Brad Frost stresses that this isn't a linear process. It's a mental model for moving between the abstract and the concrete, and it applies to any interface, not just the web. Teams can rename the stages; GE did.</p>
<aside class="co warn"><b>Common mistake</b><p>Designing elements in isolation and hoping they'll fit together. Use pages to stress-test the system with real and extreme content.</p></aside>` },
      { id: "tokens", t: "Tokens: name decisions by purpose", h: `
<p>Design tokens are named values: <code>color.text.primary</code>, <code>space.4</code>, <code>radius.md</code>. A common structure has three tiers:</p>
<ol class="steps">
<li><b>Primitive:</b> raw values, e.g. <code>magenta-600</code>.</li>
<li><b>Semantic:</b> purpose, e.g. <code>color.action.primary</code> → magenta-600.</li>
<li><b>Component:</b> where it's used, e.g. <code>button.background</code> → color.action.primary.</li>
</ol>
<p>Because components point at purposes rather than raw values, you can change a theme (dark mode, a rebrand) by remapping semantic tokens, without touching components.</p>` },
      { id: "figma", t: "Variables and modes in Figma", h: `
<p>Figma variables store reusable values for design properties and prototypes: colors, numbers, strings and booleans. <b>Modes</b> let one variable hold several values, such as light and dark themes, or spacing that changes when a frame switches device size. Variables can also drive prototype logic with conditionals. Publishing variables to team libraries requires a paid plan.</p>
<aside class="co tip"><b>Variants</b><p>Build components with variants for their states and sizes, and properties for text, icons and toggles, so one component covers every case.</p></aside>` }
    ],
    keys: ["Atoms → molecules → organisms → templates → pages.", "Atomic design is a mental model, not a linear process.", "Tokens: primitive → semantic → component.", "Modes let one variable switch between themes."],
    lab: "tokens", labTitle: "Retheme with tokens", labIntro: "Change the semantic tokens on the left. Every component updates, because they point at purposes, not raw values.",
    practice: `<p>In Figma, create color and spacing variables with a light and a dark mode. Build a Button component with variants (primary/secondary × default/hover/disabled × small/large) that uses only variables.</p>`,
    quiz: [
      { q: "A search form made of a label, input and button is a…", o: ["Atom", "Molecule", "Organism", "Template"], a: 1, w: "A simple group of atoms working as a unit." },
      { q: "Why name a token 'color.text.primary' instead of 'gray-900'?", o: ["It's shorter", "Purpose names survive theme changes", "Figma requires it", "It loads faster"], a: 1, w: "The value can change per theme while the meaning stays fixed." },
      { q: "What do Figma variable modes let you do?", o: ["Export code", "Give one variable several values, like light and dark", "Create components", "Run tests"], a: 1, w: "Modes switch a variable's value by context." }
    ],
    sources: [["Brad Frost, Atomic Design, chapter 2", "https://atomicdesign.bradfrost.com/chapter-2/"], ["Figma Learn: Guide to variables", "https://help.figma.com/hc/en-us/articles/15339657135383"]],
    figs: ["Atomic design, from atoms to pages.", "Three tiers of design tokens."]
  },
  {
    id: "auto-layout", title: "Auto layout in practice", mins: 13, level: "Intermediate",
    summary: "Auto layout makes Figma frames behave like real UI: they grow with content, keep spacing and respond to resizing. It maps closely to CSS flexbox.",
    goals: ["Set direction, gap and padding deliberately", "Choose hug, fill or fixed sizing", "Translate auto layout into CSS terms"],
    sections: [
      { id: "basics", t: "The core properties", h: `
<ul>
<li><b>Flow:</b> vertical, horizontal or grid. Horizontal and vertical can wrap.</li>
<li><b>Padding:</b> space between the frame's edge and its children.</li>
<li><b>Gap:</b> space between children, as a number or Auto (space between).</li>
<li><b>Alignment:</b> where children sit inside the frame.</li>
</ul>
<p>Add auto layout with <kbd>Shift</kbd>+<kbd>A</kbd>; remove it with <kbd>Alt</kbd>/<kbd>Option</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>.</p>` },
      { id: "sizing", t: "Hug, fill and fixed", h: `
<div class="tbl"><table><thead><tr><th>Setting</th><th>Behavior</th><th>CSS equivalent</th></tr></thead><tbody>
<tr><td>Hug contents</td><td>Frame shrinks to its children plus padding. A 40 px text layer with 10 px padding each side gives a 60 px frame.</td><td><code>width: fit-content</code></td></tr>
<tr><td>Fill container</td><td>Child stretches to fill the parent's available space</td><td><code>flex: 1</code> / <code>align-self: stretch</code></td></tr>
<tr><td>Fixed</td><td>Size stays put. Typing a width sets Fixed.</td><td><code>width: 240px</code></td></tr>
</tbody></table></div>
<p>Min and max sizes can be added to any of these. If any child is set to Fill, the parent can no longer hug on that axis.</p>` },
      { id: "nesting", t: "Nesting and stress-testing", h: `
<p>Nest auto layout frames: a card is a vertical stack containing a horizontal header row. When you can type a much longer title and everything reflows correctly, your structure is right.</p>
<p>"Ignore auto layout" (formerly absolute position) takes one child out of the flow, for badges or overlays. In components, instances can adjust padding and gap and hide layers, but only the main component can add or reorder layers.</p>` }
    ],
    keys: ["Gap is between children; padding is inside the frame.", "Hug, fill or fixed on each axis.", "A Fill child stops its parent hugging on that axis.", "Auto layout ≈ flexbox, which smooths handoff."],
    lab: "autolayout", labTitle: "Auto layout playground", labIntro: "Change the settings and watch the frame respond. The panel shows the matching CSS.",
    practice: `<p>Rebuild a recipe card with nested auto layout: image, title, a meta row (time · servings) and a button. Stress-test it with a three-line title and a missing image.</p>`,
    quiz: [
      { q: "Auto layout most closely mirrors which CSS feature?", o: ["Floats", "Flexbox", "Tables", "Absolute positioning"], a: 1, w: "Direction, gap, padding and alignment map to flexbox." },
      { q: "A 40 px text layer with 10 px padding on each side, set to Hug. How wide is the frame?", o: ["40 px", "50 px", "60 px", "80 px"], a: 2, w: "40 + 10 + 10 = 60 px." },
      { q: "If a child is set to Fill container, what happens to a hugging parent on that axis?", o: ["Nothing", "It stops hugging", "It becomes fixed at 0", "It wraps"], a: 1, w: "Figma switches the parent away from hug on that axis." }
    ],
    sources: [["Figma Learn: Guide to auto layout", "https://help.figma.com/hc/en-us/articles/360040451373"]],
    figs: ["Auto layout properties on a card.", "Hug, fill and fixed sizing."]
  },
  {
    id: "handoff", title: "Developer handoff", mins: 12, level: "Intermediate",
    summary: "Handoff isn't a moment; it's a conversation that starts at kickoff. Still, the file you hand over should answer most questions on its own.",
    goals: ["Prepare a file that answers developers' questions", "Use Figma Dev Mode statuses", "Run a design QA pass on the build"],
    sections: [
      { id: "file", t: "A file that explains itself", h: `
<ul>
<li><b>Name layers and components</b> clearly.</li>
<li><b>Use tokens, styles and variables</b>, never one-off values.</li>
<li><b>Annotate behavior:</b> what happens on tap, what animates, what truncates, maximum lengths.</li>
<li><b>Show every state</b> from the states lesson.</li>
<li><b>Specify responsive behavior</b> at key breakpoints.</li>
</ul>` },
      { id: "devmode", t: "Figma Dev Mode", h: `
<p>Dev Mode is a developer-focused workspace for inspecting designs, viewing properties and code, and downloading assets. Toggle it with <kbd>Shift</kbd>+<kbd>D</kbd>.</p>
<ul>
<li>Mark frames, components or sections as <b>Ready for dev</b> so developers know what is final.</li>
<li>The Inspect panel shows layer properties, styles and variables, and lets developers compare changes.</li>
<li>Code Connect can show your design system's real component code instead of auto-generated code.</li>
</ul>
<p>Dev Mode is available on paid plans; the "Completed" status needs Organization or Enterprise.</p>` },
      { id: "qa", t: "Design QA", h: `
<p>Review the build with the engineer before it ships. Small visual bugs are cheap to fix in review and expensive after launch. Check spacing against your tokens, every state, keyboard focus, and long-content cases.</p>` }
    ],
    keys: ["Involve engineers from kickoff.", "Tokens, clear names, every state, behavior notes.", "Mark work Ready for dev in Dev Mode.", "QA the build before launch."],
    lab: "handoff", labTitle: "Handoff readiness check", labIntro: "Tick what your file has. The meter shows readiness and lists what a developer will ask about.",
    practice: `<p>Prepare your weekly plan screen for handoff: clean layer names, variables everywhere, a states section and five behavior annotations. Ask a developer friend what is still unclear.</p>`,
    quiz: [
      { q: "When should engineers first see the design?", o: ["After final polish", "At handoff", "Early, ideally at kickoff", "After launch"], a: 2, w: "Early involvement catches feasibility issues while changes are cheap." },
      { q: "Which shortcut toggles Dev Mode?", o: ["Shift+A", "Shift+D", "Ctrl+D", "D"], a: 1, w: "Shift+D." }
    ],
    sources: [["Figma Learn: Guide to Dev Mode", "https://help.figma.com/hc/en-us/articles/15023124644247"]],
    figs: ["An annotated screen ready for handoff.", "Design QA: designer and developer review the build together."]
  }
  ]
});

COURSE.push({
  id: "testing", title: "Prototyping & Testing", color: "#13805A",
  blurb: "Make it real enough to test, watch people use it, and make sure everyone can.",
  lessons: [
  {
    id: "prototyping", title: "Prototyping", mins: 13, level: "Intermediate",
    summary: "A prototype is a hypothesis. Choose the fidelity that answers your question fastest, across interactivity, visuals and content.",
    goals: ["Describe fidelity on three dimensions", "Pick low or high fidelity for a given question", "Run a test with a paper or Wizard-of-Oz prototype"],
    sections: [
      { id: "dimensions", t: "Fidelity has three dimensions", h: `
<p>NN/g treats a prototype as a hypothesis, and testing it means watching people use it. Fidelity isn't one dial; it's three:</p>
<ul><li><b>Interactivity:</b> does it respond by itself, or does a person play "the computer"?</li><li><b>Visuals:</b> sketchy or polished?</li><li><b>Content:</b> placeholder or real?</li></ul>` },
      { id: "compare", t: "Low vs. high fidelity", h: `
<div class="dd"><div class="do"><b>Low fidelity is good for</b><ul><li>Little prep time</li><li>Changing things between sessions</li><li>Less pressure on participants</li><li>Keeping designers open to change</li><li>Showing stakeholders it's unfinished</li></ul></div>
<div class="do"><b>High fidelity is good for</b><ul><li>Realistic response speed</li><li>Testing workflows and complex widgets</li><li>Checking legibility and affordance</li><li>Natural participant behavior</li><li>Fewer human "computer" errors</li></ul></div></div>
<p>Before building, write down the question. "Will people understand that swiping a recipe adds it to the plan?" tells you exactly what to prototype, and what not to.</p>` },
      { id: "wizard", t: "Static prototypes and Wizard of Oz", h: `
<p>With static prototypes, a person acts as the computer: swapping paper screens or controlling what appears. NN/g notes Wizard-of-Oz testing is useful for trying AI features before building them. Signal when the "computer" is working, and if the wrong screen appears, remove it and go back.</p>
<aside class="co tip"><b>Pilot first</b><p>Errors by the human "computer" can derail a study. Run a pilot session before real participants.</p></aside>` }
    ],
    keys: ["A prototype is a hypothesis to test.", "Fidelity = interactivity + visuals + content.", "Use the lowest fidelity that answers the question.", "Wizard of Oz lets you test AI ideas before building them."],
    lab: "fidelity", labTitle: "Pick the right fidelity", labIntro: "Choose a question you need answered. The lab recommends a fidelity on each dimension and explains why.",
    practice: `<p>Write one question about your weekly plan flow. Build the smallest clickable Figma prototype that answers it, with only the screens needed, and pilot it with one person.</p>`,
    quiz: [
      { q: "You want to know if the overall flow makes sense. Best first prototype?", o: ["Coded app", "High-fidelity animations", "Paper or low-fi clickable", "Marketing video"], a: 2, w: "Low fidelity is fastest for flow questions." },
      { q: "What are NN/g's three fidelity dimensions?", o: ["Speed, cost, quality", "Interactivity, visuals, content", "Color, type, layout", "Desktop, tablet, mobile"], a: 1, w: "Each can be high or low independently." }
    ],
    sources: [["NN/g: UX Prototypes: Low Fidelity vs. High Fidelity", "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/"]],
    figs: ["Prototype fidelity: realism versus speed.", "Screens linked into a clickable prototype."]
  },
  {
    id: "usability-testing", title: "Usability testing", mins: 16, level: "Intermediate",
    summary: "Watch real people try real tasks. Five participants per round find most problems, and several small rounds beat one big study.",
    goals: ["Run a moderated think-aloud session", "Explain Nielsen's five-user math", "Choose qualitative or quantitative testing"],
    sections: [
      { id: "what", t: "What usability testing is", h: `
<p>NN/g describes usability testing as an observational method with three elements: a <b>facilitator</b>, <b>tasks</b> and a <b>participant</b>. The goals: find problems, uncover opportunities and learn about users' behavior.</p>
<div class="tbl"><table><thead><tr><th></th><th>Qualitative</th><th>Quantitative</th></tr></thead><tbody>
<tr><td>Collects</td><td>Insights and anecdotes</td><td>Metrics: task success, time on task</td></tr>
<tr><td>Best for</td><td>Finding problems</td><td>Benchmarks and comparisons</td></tr>
<tr><td>Typical size</td><td>About 5 per user group</td><td>About 20+</td></tr>
</tbody></table></div>
<p>A simple "discount" study can take three days: plan on day one, test five people on day two, analyze on day three.</p>` },
      { id: "five", t: "Why five users", h: `
<p>Nielsen's formula for problems found by <i>n</i> users is <span class="formula-inline">N × (1 − (1 − L)<sup>n</sup>)</span>, where <i>N</i> is the total number of problems and <i>L</i> is the share one user reveals, typically 31%.</p>
<ul><li>One user finds almost a third of the problems.</li><li>Five users find about 85%.</li><li>Finding nearly all of them takes about 15.</li></ul>
<p>Nielsen's advice: instead of one study with 15 people, run three studies with 5, fixing problems in between. With distinct user groups, test 3–4 people per group.</p>` },
      { id: "think-aloud", t: "Running a think-aloud session", h: `
<ol class="steps"><li>Recruit representative users.</li><li>Give them representative tasks, written as scenarios: "You have chicken and rice at home. Plan tonight's dinner."</li><li>Stay quiet and let them talk.</li></ol>
<p>When someone asks "Should I click this?", reply "What would you expect to happen?" Asking participants to read tasks aloud catches misunderstandings early.</p>
<aside class="co warn"><b>Common mistake</b><p>Prompting too often or putting words in people's mouths. Nielsen notes this makes the findings for that part of the session unusable.</p></aside>` }
    ],
    keys: ["Facilitator + tasks + participant.", "Problems found = N × (1 − (1 − L)^n), L ≈ 31%.", "5 users ≈ 85% of problems; iterate in small rounds.", "Stay quiet; redirect questions back to the participant."],
    lab: "curve", labTitle: "The five-user curve", labIntro: "Adjust the number of users and the share of problems each one finds. The curve uses Nielsen's formula.",
    practice: `<p>Test your prototype with three people using two task scenarios. Log every issue with a severity rating, make one revision, then test it with one more person.</p>`,
    quiz: [
      { q: "A participant asks 'Do I tap here?' Best reply?", o: ["Yes", "No, the other button", "What would you expect to happen?", "Let me show you"], a: 2, w: "Redirecting keeps the test honest without leading." },
      { q: "With L = 31%, how many problems do five users find?", o: ["About 31%", "About 50%", "About 85%", "100%"], a: 2, w: "1 − 0.69⁵ ≈ 0.84." },
      { q: "Nielsen recommends spending a 15-user budget on…", o: ["One big study", "Three studies of five users", "Fifteen single-user tests", "A survey"], a: 1, w: "Iterate: test, fix, test again." }
    ],
    sources: [["NN/g: Usability Testing 101", "https://www.nngroup.com/articles/usability-testing-101/"], ["NN/g: Why You Only Need to Test with 5 Users", "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/"], ["NN/g: Thinking Aloud", "https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/"]],
    figs: ["A usability test session.", "Problems found versus number of test users."]
  },
  {
    id: "accessibility", title: "Accessibility", mins: 17, level: "Intermediate",
    summary: "Accessibility means people with disabilities can use your product, and it makes products better for everyone. WCAG gives you testable rules.",
    goals: ["Explain WCAG's four POUR principles", "Size touch targets for WCAG, iOS and Android", "Run a designer's accessibility checklist"],
    sections: [
      { id: "pour", t: "The four principles (POUR)", h: `
<div class="tbl"><table><thead><tr><th>Principle</th><th>Guidelines</th></tr></thead><tbody>
<tr><td><b>Perceivable</b></td><td>Text alternatives (1.1), captions and media alternatives (1.2), adaptable content (1.3), distinguishable content (1.4): contrast, resizable text, color not the only cue</td></tr>
<tr><td><b>Operable</b></td><td>Keyboard access (2.1), enough time (2.2), no seizure triggers (2.3), navigable (2.4), input modalities beyond the keyboard (2.5)</td></tr>
<tr><td><b>Understandable</b></td><td>Readable (3.1), predictable (3.2), input assistance with helpful error messages (3.3)</td></tr>
<tr><td><b>Robust</b></td><td>Compatible with current and future user agents, including assistive technologies (4.1)</td></tr>
</tbody></table></div>
<aside class="co ex"><b>From W3C</b><p>A search button's text alternative should say "search", not "magnifying lens". Describe the purpose, not the picture.</p></aside>` },
      { id: "targets", t: "Touch and click target sizes", h: `
<div class="tbl"><table><thead><tr><th>Source</th><th>Size</th></tr></thead><tbody>
<tr><td>WCAG 2.2 SC 2.5.8 Target Size (Minimum), AA</td><td>At least 24 × 24 CSS px, or enough spacing (a 24 px circle around each small target mustn't overlap another)</td></tr>
<tr><td>WCAG 2.2 SC 2.5.5 Target Size (Enhanced), AAA</td><td>44 × 44 CSS px</td></tr>
<tr><td>Apple HIG, iOS and iPadOS</td><td>Default control size 44 × 44 pt; minimum 28 × 28 pt</td></tr>
<tr><td>Android accessibility guidance</td><td>At least 48 × 48 dp; larger is better</td></tr>
</tbody></table></div>
<p>Inline text links inside sentences are exempt from 2.5.8, and zooming can't be used to claim compliance.</p>` },
      { id: "checklist", t: "A designer's checklist", h: `
<ul class="checks">
<li>Contrast: 4.5:1 text, 3:1 large text, icons and input borders</li>
<li>Text can be resized to 200% without breaking</li>
<li>Visible focus styles on every interactive element</li>
<li>Every input has a visible label (not placeholder-only)</li>
<li>One H1 per page, no skipped heading levels</li>
<li>Meaningful alt text; empty alt on decorative images</li>
<li>Respect reduced-motion preferences; no autoplaying media</li>
<li>Errors are not shown by color alone</li>
<li>Link text makes sense on its own (no "click here")</li>
</ul>
<p>The A11y Project checklist targets WCAG AA, which many governments require, and reminds you that a checklist alone doesn't guarantee accessibility.</p>` }
    ],
    keys: ["POUR: Perceivable, Operable, Understandable, Robust.", "WCAG 2.5.8: 24 × 24 px minimum; 2.5.5: 44 × 44.", "iOS 44 × 44 pt default; Android 48 × 48 dp.", "Labels, focus, alt text, headings, no color-only errors."],
    lab: "targets", labTitle: "Touch target tester", labIntro: "Resize the buttons and the gap between them. The lab checks each guideline as you go.",
    practice: `<p>Audit your weekly plan screen against the checklist and fix every failure. Then use a website for five minutes with only the keyboard and note where focus gets lost.</p>`,
    quiz: [
      { q: "Why are placeholder-only input labels a problem?", o: ["They look dated", "They disappear when typing and often fail contrast", "Screen readers can't see color", "They load slowly"], a: 1, w: "People lose the label mid-task, and placeholder text is usually low-contrast." },
      { q: "WCAG 2.2 SC 2.5.8 (AA) requires targets of at least…", o: ["16 × 16 px", "24 × 24 px", "44 × 44 px", "48 × 48 px"], a: 1, w: "24 × 24 CSS px, or the spacing exception." },
      { q: "A good text alternative for a search icon button is…", o: ["Magnifying glass", "Icon", "Search", "Button"], a: 2, w: "Describe the function, not the picture." }
    ],
    sources: [["W3C: Accessibility Principles", "https://www.w3.org/WAI/fundamentals/accessibility-principles/"], ["W3C: Understanding SC 2.5.8 Target Size (Minimum)", "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"], ["The A11Y Project: Checklist", "https://www.a11yproject.com/checklist/"], ["Apple HIG: Accessibility", "https://developer.apple.com/design/human-interface-guidelines/accessibility"], ["Android Developers: Make apps more accessible", "https://developer.android.com/guide/topics/ui/accessibility/apps"]],
    figs: ["WCAG's four POUR principles.", "Touch target sizes and visible focus."]
  }
  ]
});

COURSE.push({
  id: "career", title: "Portfolio & Capstone", color: "#5B6070",
  blurb: "Critique well, tell the story of your work, and prove your skills end to end.",
  lessons: [
  {
    id: "critique", title: "Giving and receiving critique", mins: 12, level: "Beginner",
    summary: "Critique analyses whether a design meets its objectives. It's a conversation aimed at improvement, not a verdict on the designer.",
    goals: ["Run a structured critique session", "Turn opinions into goal-based questions", "Present work so you get useful feedback"],
    sections: [
      { id: "what", t: "What critique is", h: `
<p>NN/g defines design critique as analysing a design and giving feedback on whether it meets its objectives. Two kinds exist: <b>standalone critiques</b> to improve a piece of work, and <b>design reviews</b>, often by an expert or for approval. A good critique has three things: a clear scope, agreed objectives, and conversation instead of commands.</p>` },
      { id: "formats", t: "Formats and facilitation", h: `
<ul><li><b>Round robin:</b> everyone speaks in turn, so quieter people are heard.</li><li><b>Quotas:</b> for example two strengths and one improvement each, to get discussion started.</li></ul>
<p>The facilitator time-boxes, shares the scope and agenda beforehand, invites people from different disciplines, reframes opinions as goal-based questions, records feedback, and sends action items afterwards. Rotate the role. To start, try 30 minutes a week.</p>` },
      { id: "phrasing", t: "Phrasing feedback", h: `
<div class="dd"><div class="dont"><b>Unhelpful</b><ul><li>"Make it pop."</li><li>"I don't like it."</li></ul></div>
<div class="do"><b>Helpful</b><ul><li>"The goal is speed. Could this be one step?"</li><li>"What led you to hide the filters?"</li></ul></div></div>
<p>When presenting: restate the objectives, tell the story of the work, keep it short, and share designs in advance. When receiving: listen, write it down, ask questions, and don't defend in the moment.</p>
<aside class="co warn"><b>Pitfalls</b><p>No agreed personas or objectives; sessions that run too long; taking feedback personally; rushing to solve problems in the room; talking only about negatives.</p></aside>` }
    ],
    keys: ["Critique = analysis against objectives.", "Scope, objectives, conversation.", "Reframe opinions as goal-based questions.", "Start small: 30 minutes a week."],
    lab: "feedback", labTitle: "Reframe the feedback", labIntro: "Pick the best rewrite of each comment. The goal: tie feedback to objectives and invite a solution.",
    practice: `<p>Share your weekly plan screen with someone. Tell them the goal and the kind of feedback you want. Log every comment, then note which you'll act on and why.</p>`,
    quiz: [
      { q: "Which is the most useful critique?", o: ["I don't like it", "Make it pop", "The goal is quick planning; could the three-step add flow be one step?", "Use blue"], a: 2, w: "It ties the comment to the goal and invites a solution." },
      { q: "What's a round-robin critique?", o: ["Only the lead speaks", "Everyone speaks in turn", "Anonymous written feedback", "A vote"], a: 1, w: "Turn-taking makes sure every voice is heard." }
    ],
    sources: [["NN/g: Design Critiques", "https://www.nngroup.com/articles/design-critiques/"], ["Adam Connor & Aaron Irizarry, Discussing Design (O'Reilly)", "https://www.oreilly.com/library/view/discussing-design/9781491902394/"]],
    figs: ["A design critique session.", "Unhelpful versus helpful feedback."]
  },
  {
    id: "case-studies", title: "Writing portfolio case studies", mins: 12, level: "Beginner",
    summary: "Hiring managers skim. A case study must show your thinking in two minutes, and reward the people who keep reading.",
    goals: ["Structure a case study in five parts", "Lead with a one-screen summary", "Show decisions and trade-offs, not every artifact"],
    sections: [
      { id: "structure", t: "A structure that works", h: `
<ol class="steps">
<li><b>Summary:</b> problem, your role, team, timeline and outcome on one screen.</li>
<li><b>Context and problem:</b> why it mattered, with evidence.</li>
<li><b>Process highlights:</b> two or three key decisions, what you considered and why you chose.</li>
<li><b>Solution:</b> the final design, shown large.</li>
<li><b>Outcome:</b> metrics or test results, and what you'd do next.</li>
</ol>` },
      { id: "show", t: "What to show", h: `
<p>Show messy work only when it explains a decision. Name your role precisely ("I led research and interaction design; a second designer owned visual design"). Use the evidence you've gathered across this course: interview insights, HMWs, HEART metrics, test findings.</p>
<aside class="co tip"><b>Depth beats breadth</b><p>Three deep case studies beat eight shallow ones.</p></aside>` }
    ],
    keys: ["Summary first: problem, role, timeline, outcome.", "Show decisions and trade-offs.", "Evidence over decoration.", "Three deep projects beat eight shallow ones."],
    lab: "casestudy", labTitle: "Case study summary builder", labIntro: "Fill in the fields to draft your one-screen summary. The preview updates as you type.",
    practice: `<p>Outline a case study for the meal-planning project you've built across this course using the five-part structure. Write the one-screen summary in full.</p>`,
    quiz: [
      { q: "What belongs on the first screen of a case study?", o: ["A mood board", "Problem, role, timeline and outcome", "Every sketch", "Your process diagram"], a: 1, w: "A quick summary lets skimmers understand the project at once." }
    ],
    sources: [["Bestfolios: product design portfolios", "https://www.bestfolios.com/"]],
    figs: ["Case study structure.", "A portfolio on laptop and phone."]
  },
  {
    id: "capstone", title: "Capstone project", mins: 8, level: "Advanced",
    summary: "Bring everything together in one end-to-end project, with evidence at every step and a case study at the end.",
    goals: ["Plan a 4–6 week project", "Produce every deliverable with evidence", "Finish with a portfolio-ready case study"],
    sections: [
      { id: "deliverables", t: "Deliverables", h: `
<ol class="steps">
<li>Research plan, five interviews and an affinity map with three insights.</li>
<li>Problem statement, HMWs, and a HEART metric with a guardrail.</li>
<li>Card sort or tree test, a sitemap and one core flow with unhappy paths.</li>
<li>Wireframes, then high-fidelity screens using a small design system (variables plus 5+ components).</li>
<li>A prototype, a five-person think-aloud test and one revision round.</li>
<li>An accessibility audit against the checklist.</li>
<li>A case study written with the five-part structure.</li>
</ol>` },
      { id: "plan", t: "Plan your time", h: `
<p>Plan for four to six weeks at a few hours a week. Use the notes box on each lesson to collect links and decisions as you go. Then they're ready when you write the case study.</p>` }
    ],
    keys: ["One problem, end to end.", "Evidence at every step.", "Finish with a case study."],
    lab: "planner", labTitle: "Capstone planner", labIntro: "Set a start date and weekly hours. The planner spreads the milestones across your calendar.",
    practice: `<p>Choose your capstone problem and write a one-page brief: who, problem, why now, success metric and timeline. Put the link in your notes.</p>`,
    quiz: [
      { q: "Which deliverable proves your design works for people?", o: ["Mood board", "A usability test with revisions", "A logo", "A color palette"], a: 1, w: "Testing with real people and iterating is the evidence." }
    ],
    sources: [["Daily UI design challenges for extra practice", "https://www.dailyui.co/"]],
    figs: ["A six-week capstone roadmap.", "Example of finished capstone screens."]
  }
  ]
});

window.GLOSSARY = [
  ["Affinity diagram", "Organizing observations or findings into clusters to reveal themes.", "synthesis"],
  ["Affordance", "What an object or control lets you do.", "affordance-feedback"],
  ["Atomic design", "Brad Frost's model: atoms, molecules, organisms, templates, pages.", "components-tokens"],
  ["Auto layout", "Figma's flexbox-like system for frames that respond to content.", "auto-layout"],
  ["Card sorting", "Participants group labeled cards to reveal their mental model of content.", "information-architecture"],
  ["Chunking", "Grouping information into units so it's easier to process and remember.", "laws-of-ux"],
  ["Confidence (RICE)", "How sure you are of an estimate: 100% high, 80% medium, 50% low.", "prioritization"],
  ["Contrast ratio", "Luminance difference from 1:1 to 21:1, used by WCAG.", "color"],
  ["Converge", "Narrowing many options down to a decision.", "double-diamond"],
  ["Crazy 8s", "Sketching eight ideas in eight minutes.", "wireframing"],
  ["Design token", "A named design decision, such as color.text.primary.", "components-tokens"],
  ["Dev Mode", "Figma's developer workspace for inspecting designs and code.", "handoff"],
  ["Directness", "In tree testing, whether people went straight to the answer.", "information-architecture"],
  ["Diverge", "Opening up to generate many options.", "double-diamond"],
  ["Doherty threshold", "Responding within about 400 ms keeps people productive.", "laws-of-ux"],
  ["Double Diamond", "Design Council model: Discover, Define, Develop, Deliver.", "double-diamond"],
  ["Fidelity", "How close a prototype is to the real thing in interactivity, visuals and content.", "prototyping"],
  ["Fitts's law", "Time to reach a target depends on its distance and size.", "laws-of-ux"],
  ["Guardrail metric", "A metric you must not harm while improving another.", "metrics"],
  ["HEART", "Happiness, Engagement, Adoption, Retention, Task success.", "metrics"],
  ["Heuristic evaluation", "Reviewing a design against usability rules of thumb.", "affordance-feedback"],
  ["Hick's law", "Decision time grows with the number and complexity of choices.", "laws-of-ux"],
  ["How Might We", "A question format that turns insights into ideation prompts.", "problem-statements"],
  ["Hug / Fill / Fixed", "Auto layout sizing: shrink to content, stretch to parent, or stay set.", "auto-layout"],
  ["Information architecture", "How content is organized, labeled and connected.", "information-architecture"],
  ["Insight", "An observation plus why it matters.", "synthesis"],
  ["Jakob's law", "People expect your product to work like the ones they already use.", "laws-of-ux"],
  ["Job story", "When [situation], I want to [motivation], so I can [outcome].", "personas-jtbd"],
  ["Journey map", "A visualization of the process a person goes through to reach a goal.", "user-flows"],
  ["Line length (measure)", "Characters per line; Butterick recommends 45–90.", "typography"],
  ["Miller's law", "People hold about 7 ± 2 items in working memory.", "laws-of-ux"],
  ["Persona", "A fictional yet realistic, research-based description of a target user.", "personas-jtbd"],
  ["POUR", "WCAG's principles: Perceivable, Operable, Understandable, Robust.", "accessibility"],
  ["RICE", "Reach × Impact × Confidence ÷ Effort.", "prioritization"],
  ["Service blueprint", "A map of the staff, systems and processes behind each customer step.", "user-flows"],
  ["Signifier", "A visible cue that shows what action is possible.", "affordance-feedback"],
  ["Slip", "An unconscious error caused by inattention.", "affordance-feedback"],
  ["Think-aloud", "Participants verbalize their thoughts while using a design.", "usability-testing"],
  ["Tree testing", "Testing whether people can find items in a text-only hierarchy.", "information-architecture"],
  ["Type scale", "A set of font sizes made from a base size and a ratio.", "typography"],
  ["Usability", "A quality of the UI: easy to learn, efficient, pleasant.", "what-is-product-design"],
  ["User experience (UX)", "Every part of the end user's interaction with a company, its services and products.", "what-is-product-design"],
  ["Variables (Figma)", "Stored reusable values that can switch by mode, such as light and dark.", "components-tokens"],
  ["WCAG", "Web Content Accessibility Guidelines from the W3C.", "accessibility"],
  ["Wizard of Oz", "A prototype where a person secretly plays the computer.", "prototyping"],
  ["8-point grid", "Using multiples of 8 for sizes and spacing.", "layout-spacing"]
];
