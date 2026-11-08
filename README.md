# Redline Design School

A free, self-paced course for learning product design.

**Live site:** https://mindunter.github.io/redline-design-school/

## What's inside

- **9 modules, 27 lessons:** foundations, user research, strategy, information architecture, interaction design, visual design, design systems, testing and accessibility, and portfolio work
- **27 interactive labs**, one per lesson: a Fitts's law game, a WCAG contrast checker, a RICE calculator, affinity sorting, a tree test, an auto layout playground, a touch target tester and more
- **Quizzes, practice briefs and notes** in every lesson, all building one capstone project
- **Cited sources:** every lesson links the pages its facts come from (NN/g, W3C, Google, Apple, Android, Figma, WebAIM, Laws of UX and others), and every link was checked
- **Glossary** of 46 terms, **search** (Ctrl/⌘ K or `/`), and a **progress** page with notes export
- **Spec mode:** the ruler button overlays redline measurements on anything you hover

## Responsive by design

- Desktop: curriculum rail, reading column and an "On this page" outline
- Tablet: the rail becomes a slide-out drawer
- Phone: a bottom tab bar, full-width labs and 44 px+ touch targets
- Light, dark and system themes, keyboard navigation (← → between lessons), visible focus states and reduced-motion support

Progress, quiz answers, notes and lab work are saved in your browser (localStorage), so nothing leaves your device.

## Structure

```
index.html
assets/css/app.css        design tokens, layout, components
assets/js/content-*.js    lessons, sources and glossary
assets/js/labs.js         the 27 interactive labs
assets/js/app.js          routing, search, progress, spec mode
images/                   reference images generated with Codex
```

No build step: it's plain HTML, CSS and JavaScript, served by GitHub Pages.
