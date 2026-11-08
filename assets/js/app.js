/* Redline Design School: app shell, routing, progress, search, spec mode. */
(function(){
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad = n => String(n).padStart(2, "0");

/* ── data ── */
const COURSE = window.COURSE, GLOSSARY = window.GLOSSARY, LABS = window.LABS;
const ALL = [];
COURSE.forEach((m, mi) => m.lessons.forEach((l, li) => ALL.push(Object.assign(l, {m, mi, li}))));
const byId = Object.fromEntries(ALL.map(l => [l.id, l]));
const READY = new Set("auto-layout-2,case-studies-1,case-studies-2,color-1,components-tokens-1,components-tokens-2,double-diamond-1,double-diamond-2,information-architecture-1,information-architecture-2,laws-of-ux-1,metrics-1,personas-jtbd-1,personas-jtbd-2,problem-statements-1,problem-statements-2,prototyping-1,prototyping-2,synthesis-1,synthesis-2,tools-of-the-trade-1,tools-of-the-trade-2,typography-1,typography-2,user-interviews-1,user-interviews-2,what-is-product-design-1,what-is-product-design-2".split(","));
const imgsFor = l => (l.figs || []).map((cap, i) => ({key: `${l.id}-${i + 1}`, src: `images/${l.id}-${i + 1}.webp`, cap, n: i + 1})).filter(x => READY.has(x.key));
const TOTAL_MIN = ALL.reduce((a, l) => a + l.mins, 0);

/* ── state (browser storage) ── */
const KEY = "redline-v2";
let S = {done: {}, practice: {}, quiz: {}, notes: {}, labs: {}, last: null, days: [], closed: {}};
try { const v = JSON.parse(localStorage.getItem(KEY) || "null"); if (v) S = Object.assign(S, v);
  else { const old = JSON.parse(localStorage.getItem("redline-progress-v1") || "null"); if (old) ["done","practice","quiz","notes"].forEach(k => S[k] = old[k] || {}); } } catch (e) {}
let saveT;
const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 250); };
const markDay = () => { const d = new Date().toISOString().slice(0, 10); if (!S.days.includes(d)) { S.days.push(d); S.days = S.days.slice(-400); save(); } };
const doneCount = () => ALL.filter(l => S.done[l.id]).length;
const modDone = m => m.lessons.filter(l => S.done[l.id]).length;
const streak = () => { let n = 0, d = new Date(); const set = new Set(S.days);
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); } return n; };
const nextUp = () => (S.last && byId[S.last] && !S.done[S.last]) ? byId[S.last] : ALL.find(l => !S.done[l.id]) || null;

/* ── icons ── */
const I = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 11 12 4l8 7v9H4Z"/><path d="M10 20v-5h4v5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19V5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  cursor: '<svg viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21Z" fill="#12141A" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>'
};

/* ── theme ── */
const root = document.documentElement;
let theme = "system"; try { theme = localStorage.getItem("redline-theme") || "system"; } catch (e) {}
const applyTheme = () => { if (theme === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", theme);
  const b = $("#themeBtn"); if (b) { b.innerHTML = theme === "dark" ? I.moon : theme === "light" ? I.sun : I.auto; b.setAttribute("aria-label", `Theme: ${theme}. Change theme`); b.title = `Theme: ${theme}`; }
  const mc = $('meta[name="theme-color"]'); if (mc) mc.content = getComputedStyle(root).getPropertyValue("--surface").trim() || "#ffffff"; };

/* ── shell ── */
const app = $("#app");
app.innerHTML = `
<a class="skip" href="#main">Skip to content</a>
<header class="top" role="banner">
  <button class="iconbtn menu-btn" id="menuBtn" aria-label="Open course outline" aria-controls="rail" aria-expanded="false" style="display:none">${I.menu}</button>
  <a class="brand" href="#/" aria-label="Redline Design School home"><span class="mark" aria-hidden="true"></span><b>Redline</b><span>Design School</span></a>
  <nav class="topnav" aria-label="Main"><a href="#/learn" data-nav="learn">Curriculum</a><a href="#/glossary" data-nav="glossary">Glossary</a><a href="#/progress" data-nav="progress">Progress</a></nav>
  <button class="searchbtn" id="searchBtn" type="button" aria-label="Search lessons and terms">${I.search}<span class="lbl-txt">Search</span><kbd>Ctrl K</kbd></button>
  <button class="iconbtn spec-toggle" id="specBtn" type="button" aria-pressed="false" aria-label="Spec mode: measure anything on the page" title="Spec mode (measure elements)">${I.ruler}</button>
  <button class="iconbtn" id="themeBtn" type="button"></button>
  <a class="ring" id="ring" href="#/progress" aria-label="Your progress"><span></span></a>
  <div class="readbar" id="readbar" aria-hidden="true"></div>
</header>
<div class="shell" id="shell">
  <aside class="rail" id="rail" aria-label="Course outline"></aside>
  <main class="main" id="main" tabindex="-1"></main>
</div>
<div class="scrim" id="scrim"></div>
<nav class="tabbar" aria-label="Sections">
  <a href="#/" data-tab="home">${I.home}<span>Home</span></a>
  <a href="#/learn" data-tab="learn">${I.book}<span>Learn</span></a>
  <button type="button" id="tabSearch">${I.search}<span>Search</span></button>
  <a href="#/progress" data-tab="progress">${I.chart}<span>Progress</span></a>
</nav>
<dialog id="palette" aria-label="Search"><div class="palette"><div class="palette-in">${I.search}<input id="q" type="text" placeholder="Search lessons, sections and terms…" autocomplete="off" aria-label="Search" aria-controls="qres"><kbd>Esc</kbd></div><ul id="qres" role="listbox"></ul></div></dialog>
<dialog id="zoom" class="zoom" aria-label="Enlarged image"><img alt=""><p><span></span><button type="button">Close</button></p></dialog>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="spec-ov" id="specOv" hidden></div>`;
applyTheme();
const main = $("#main"), rail = $("#rail"), shell = $("#shell");
let toastT; const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200); };

/* ── rail ── */
function renderRail(cur){
  rail.innerHTML = `<div class="rail-h"><span class="eyebrow">Curriculum</span><button class="iconbtn rail-close" id="railClose" aria-label="Close course outline">${I.close}</button></div>
  ${COURSE.map((m, mi) => { const open = cur ? (byId[cur] && byId[cur].m === m) || !S.closed[m.id] : !S.closed[m.id];
    return `<div class="mod" data-open="${open}" data-m="${m.id}"><button type="button" aria-expanded="${open}"><span class="num">${pad(mi + 1)}</span>${esc(m.title)}<span class="cnt">${modDone(m)}/${m.lessons.length}</span>${I.chev}</button>
    <div class="lessons">${m.lessons.map(l => `<a class="lnk${S.done[l.id] ? " done" : ""}" href="#/lesson/${l.id}" ${cur === l.id ? 'aria-current="page"' : ""}><span class="dot" aria-hidden="true"></span>${esc(l.title)}</a>`).join("")}</div></div>`; }).join("")}`;
  const curEl = $('[aria-current="page"]', rail); if (curEl && window.innerWidth > 1100) curEl.scrollIntoView({block: "nearest"});
}
rail.addEventListener("click", e => {
  const b = e.target.closest(".mod>button"); if (b) { const m = b.parentElement, open = m.dataset.open !== "true"; m.dataset.open = open; b.setAttribute("aria-expanded", open); S.closed[m.dataset.m] = !open; save(); }
  if (e.target.closest("#railClose")) closeDrawer();
});
const openDrawer = () => { document.body.classList.add("drawer-open"); $("#menuBtn").setAttribute("aria-expanded", "true"); setTimeout(() => ($('[aria-current="page"]', rail) || $("a,button", rail))?.focus(), 50); };
const closeDrawer = () => { document.body.classList.remove("drawer-open"); $("#menuBtn").setAttribute("aria-expanded", "false"); };
$("#menuBtn").onclick = () => document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
$("#scrim").onclick = closeDrawer;

/* ── shared bits ── */
const ring = () => { const p = Math.round(doneCount() / ALL.length * 100), r = $("#ring"); r.style.setProperty("--p", p); $("span", r).textContent = p + "%"; r.title = `${doneCount()} of ${ALL.length} lessons complete`; };
const figure = (im, label) => `<figure class="fig"><button type="button" data-zoom="${im.src}" data-cap="${esc(im.cap)}" aria-label="Enlarge: ${esc(im.cap)}"><img src="${im.src}" alt="${esc(im.cap)}" loading="lazy" width="1672" height="941"></button><figcaption><span class="mono">${label}</span><span>${esc(im.cap)}</span></figcaption></figure>`;
const footer = () => `<footer class="footer"><span>Redline Design School · free, self-paced, sources cited in every lesson.</span><span><a href="#/glossary">Glossary</a> · <a href="https://github.com/mindunter/redline-design-school" target="_blank" rel="noopener">GitHub</a></span></footer>`;

/* ── views ── */
function viewHome(){
  const d = doneCount(), nx = nextUp(), started = d > 0 || S.last;
  const gallery = ALL.flatMap(l => imgsFor(l).map(im => ({...im, l})));
  return `<div class="wrap">
  <section class="hero" aria-labelledby="h1">
    <div class="hero-copy"><span class="eyebrow">Free course · ${ALL.length} lessons · ${ALL.length} labs</span>
      <h1 id="h1">Learn product design <em>to spec.</em></h1>
      <p class="lead">From user interviews to a portfolio case study. Every lesson pairs a deep, cited read with a hands-on lab, a practice brief and a quiz, all building one capstone project.</p>
      <div class="cta">${nx ? `<a class="btn primary" href="#/lesson/${nx.id}">${started ? "Continue" : "Start lesson 1"} →</a>` : `<a class="btn primary" href="#/lesson/capstone">Revisit the capstone →</a>`}<a class="btn" href="#/learn">See the curriculum</a></div></div>
    <div class="hero-art" aria-hidden="true"><div class="spec-wrap"><div class="spec-card"><div class="ph"></div><div class="ln"></div><div class="ln s"></div><div class="b"></div></div>
      <span class="meas h">320</span><span class="meas v">400</span><span class="meas p">padding 18</span><span class="cursor">${I.cursor}</span></div></div>
  </section>
  ${started && nx ? `<a class="continue" href="#/lesson/${nx.id}"><svg class="mini" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="var(--red)" stroke-width="4" stroke-dasharray="${(d / ALL.length * 94.2).toFixed(1)} 94.2" transform="rotate(-90 18 18)"/></svg>
    <div><span class="eyebrow">Pick up where you left off · Module ${pad(nx.mi + 1)}</span><h3>${esc(nx.title)}</h3><span class="muted" style="font-size:14px">${nx.mins} min · Lab: ${esc(nx.labTitle)}</span></div><span class="btn primary go">Continue</span></a>` : ""}
  <section class="stats" aria-label="Course at a glance">
    <div class="stat"><b>${ALL.length}</b><span>in-depth lessons</span></div><div class="stat"><b>${ALL.length}</b><span>interactive labs</span></div>
    <div class="stat"><b>${Math.round(TOTAL_MIN / 60 * 10) / 10} h</b><span>of focused reading</span></div><div class="stat"><b>${GLOSSARY.length}</b><span>glossary terms</span></div></section>
  <section class="features" aria-label="How it works">
    <div class="feature"><span class="ic">${I.flask}</span><h3>Learn by doing</h3><p>Every lesson has a lab: race Fitts's law, check real contrast ratios, sort sticky notes, score ideas with RICE.</p></div>
    <div class="feature"><span class="ic">${I.link}</span><h3>Checked against sources</h3><p>Lessons draw on NN/g, W3C, Google, Apple, Figma and more, with every source linked and checked.</p></div>
    <div class="feature"><span class="ic">${I.check}</span><h3>Saves as you go</h3><p>Progress, quiz answers, notes and lab work stay in this browser. Download your notes any time.</p></div></section>
  <section style="display:flex;flex-direction:column;gap:18px" aria-labelledby="mods"><div class="sec-h"><h2 id="mods">Modules</h2><span class="mono muted">Work in order or jump in</span></div>
    <div class="modgrid">${COURSE.map((m, mi) => { const first = m.lessons.find(l => !S.done[l.id]) || m.lessons[0];
      return `<a class="modcard" href="#/lesson/${first.id}" style="--c:${m.color}"><div class="top-row"><span class="idx">${pad(mi + 1)}</span><span class="mono muted">${modDone(m)}/${m.lessons.length} · ${m.lessons.reduce((a, l) => a + l.mins, 0)} min</span></div>
        <h3>${esc(m.title)}</h3><p>${esc(m.blurb)}</p><ul>${m.lessons.map(l => `<li class="${S.done[l.id] ? "on" : ""}"><i></i>${esc(l.title)}</li>`).join("")}</ul>
        <div class="pips">${m.lessons.map(l => `<i class="${S.done[l.id] ? "on" : ""}"></i>`).join("")}</div></a>`; }).join("")}</div></section>
  <section style="display:flex;flex-direction:column;gap:18px" aria-labelledby="ex"><div class="sec-h"><h2 id="ex">Example images</h2><span class="mono muted">${gallery.length} reference images · tap to open the lesson</span></div>
    <div class="gloss" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))">${gallery.map(g => `<a href="#/lesson/${g.l.id}" class="term" style="padding:10px;text-decoration:none;color:var(--ink)"><img src="${g.src}" alt="${esc(g.cap)}" loading="lazy" width="1672" height="941" style="border-radius:6px;border:1px solid var(--line);aspect-ratio:16/9;object-fit:cover;background:#F6F7F9"><span style="font-size:14px;line-height:1.4">${esc(g.cap)}</span><span class="mono muted" style="font-size:11.5px">${esc(g.l.title)}</span></a>`).join("")}</div></section>
  ${footer()}</div>`;
}

function viewLearn(){
  return `<div class="wrap"><header class="l-hero" style="border:0;padding:0"><span class="eyebrow">Curriculum</span><h1 style="font-size:clamp(34px,5vw,52px)">${COURSE.length} modules, one capstone</h1>
    <p class="sum">Work through in order for the full arc, from understanding people to shipping and presenting work. Each lesson builds part of the same meal-planning project.</p></header>
  ${COURSE.map((m, mi) => `<section style="display:grid;gap:12px" aria-labelledby="m-${m.id}"><div class="sec-h" style="border-color:${m.color}"><h2 id="m-${m.id}"><span class="mono" style="color:${m.color};font-size:14px;margin-right:10px">${pad(mi + 1)}</span>${esc(m.title)}</h2><span class="mono muted">${modDone(m)}/${m.lessons.length} complete</span></div>
    <p class="muted" style="max-width:70ch">${esc(m.blurb)}</p>
    <div class="cards">${m.lessons.map((l, li) => `<a href="#/lesson/${l.id}" class="lrow" style="--c:${S.done[l.id] ? "var(--ok)" : m.color}">
      <span class="num">${mi + 1}.${li + 1}</span><div class="body"><h3>${esc(l.title)}</h3><span class="muted" style="font-size:14px;line-height:1.45">${esc(l.summary)}</span>
      <div class="chips"><span class="chip">${l.mins} min</span><span class="chip">${l.level}</span><span class="chip red">Lab: ${esc(l.labTitle)}</span></div></div>
      <span class="status">${S.done[l.id] ? '<span class="chip ok">✓ Done</span>' : '<span class="chip go">Start →</span>'}</span></a>`).join("")}</div></section>`).join("")}${footer()}</div>`;
}

function viewLesson(l){
  const idx = ALL.indexOf(l), prev = ALL[idx - 1], next = ALL[idx + 1], ims = imgsFor(l), qs = S.quiz[l.id] || {answers: {}};
  const toc = [["goals", "What you'll learn"], ...l.sections.map(s => [s.id, s.t]), ["lab", "Lab"], ["recap", "Key ideas"], ["practice", "Practice brief"], ["quiz", "Quiz"], ["notes", "Your notes"], ["sources", "Sources"]];
  return `<div class="lesson-grid"><article class="lesson" aria-labelledby="lt">
    <nav class="crumb mono" aria-label="Breadcrumb"><a href="#/learn">Curriculum</a><span>/</span><span style="color:${l.m.color}">Module ${pad(l.mi + 1)} · ${esc(l.m.title)}</span><span>/</span><span>Lesson ${l.li + 1} of ${l.m.lessons.length}</span></nav>
    <header class="l-hero"><h1 id="lt">${esc(l.title)}</h1><p class="sum">${esc(l.summary)}</p>
      <div class="chips"><span class="chip">${l.mins} min</span><span class="chip">${l.level}</span><span class="chip red">${I.flask.replace("<svg", '<svg width="13" height="13"')} ${esc(l.labTitle)}</span><span class="chip">${l.quiz.length} questions</span>${S.done[l.id] ? '<span class="chip ok">✓ Completed</span>' : ""}</div></header>
    <section class="goals part" id="goals"><span class="eyebrow">What you'll learn</span><ul>${l.goals.map(g => `<li><span>${esc(g)}</span></li>`).join("")}</ul></section>
    ${ims[0] ? figure(ims[0], "Fig. " + ims[0].n) : ""}
    <div class="prose">${l.sections.map((s, i) => `<section class="part" id="${s.id}"><h2><span class="n">${pad(i + 1)}</span><span>${esc(s.t)}</span><a class="anchor" href="#/lesson/${l.id}/${s.id}" aria-label="Link to this section">#</a></h2>${s.h}</section>`).join("")}</div>
    ${ims.slice(1).map(im => figure(im, "Fig. " + im.n)).join("")}
    <section class="lab part" id="lab" aria-labelledby="lab-h"><div class="lab-h"><span class="tag">Lab</span><h2 id="lab-h">${esc(l.labTitle)}</h2><p>${esc(l.labIntro)}</p></div><div class="lab-b" id="labBody"></div></section>
    <section class="block part" id="recap"><div class="block-h"><h2>Key ideas</h2></div><ul class="keys">${l.keys.map(k => `<li><span>${esc(k)}</span></li>`).join("")}</ul></section>
    <section class="block part" id="practice"><div class="block-h"><h2>Practice brief</h2><span class="eyebrow">Capstone step</span></div><div class="brief">${l.practice}</div>
      <label class="check" for="prac"><input type="checkbox" id="prac" ${S.practice[l.id] ? "checked" : ""}> I completed this brief</label></section>
    <section class="block part" id="quiz"><div class="block-h"><h2>Check your understanding</h2><span class="mono" id="score"></span></div>
      ${l.quiz.map((q, qi) => `<div class="q" data-qi="${qi}"><div class="q-t">${qi + 1}. ${esc(q.q)}</div><div class="opts">${q.o.map((o, oi) => `<button type="button" class="opt" data-oi="${oi}"><span class="k">${"ABCD"[oi]}</span><span>${esc(o)}</span></button>`).join("")}</div><p class="why" hidden></p></div>`).join("")}
      <div><button class="btn sm" type="button" id="retry" hidden>Try again</button></div></section>
    <section class="block part" id="notes"><div class="block-h"><h2>Your notes</h2><span class="mono muted" id="nsaved"></span></div>
      <textarea id="notes-${l.id}" aria-label="Notes for this lesson" placeholder="Links to your work, decisions, questions to come back to…">${esc(S.notes[l.id] || "")}</textarea></section>
    <section class="block part" id="sources"><div class="block-h"><h2>Sources</h2><span class="mono muted">Every link checked</span></div>
      <ul class="res">${l.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><b>${esc(t)}</b><span>${esc(new URL(u).hostname.replace(/^www\./, ""))}</span><i aria-hidden="true">↗</i></a></li>`).join("")}</ul></section>
    <nav class="pager" aria-label="Lesson navigation">${prev ? `<a class="prev" href="#/lesson/${prev.id}"><span class="eyebrow">← Previous</span><b>${esc(prev.title)}</b></a>` : "<span></span>"}
      <button class="btn donebtn${S.done[l.id] ? " done" : ""}" type="button" id="doneBtn">${S.done[l.id] ? "✓ Completed" : "Mark complete"}</button>
      ${next ? `<a class="next" href="#/lesson/${next.id}"><span class="eyebrow">Next →</span><b>${esc(next.title)}</b></a>` : "<span></span>"}</nav>
  </article><aside class="toc" aria-label="On this page"><span class="eyebrow">On this page</span>${toc.map(([id, t]) => `<a href="#/lesson/${l.id}/${id}" data-toc="${id}">${esc(t)}</a>`).join("")}</aside></div>`;
}

function viewGlossary(){
  const sorted = GLOSSARY.slice().sort((a, b) => a[0].localeCompare(b[0])), letters = [...new Set(sorted.map(g => g[0][0].toUpperCase()))];
  return `<div class="wrap"><header class="l-hero" style="border:0;padding:0"><span class="eyebrow">Reference</span><h1 style="font-size:clamp(34px,5vw,52px)">Glossary</h1><p class="sum">${GLOSSARY.length} terms used across the course, each linked to the lesson that explains it.</p></header>
    <div class="gloss-tools"><input type="text" id="gq" placeholder="Filter terms…" aria-label="Filter glossary terms"><nav class="letters" aria-label="Jump to letter">${letters.map(c => `<a href="#/glossary/${c}">${c}</a>`).join("")}</nav></div>
    <div class="gloss" id="gl">${sorted.map(([t, d, l], i) => `<div class="term" data-t="${esc((t + " " + d).toLowerCase())}" ${i === 0 || sorted[i - 1][0][0].toUpperCase() !== t[0].toUpperCase() ? `id="L-${t[0].toUpperCase()}"` : ""}><h3>${esc(t)}</h3><p>${esc(d)}</p><a href="#/lesson/${l}">→ ${esc(byId[l]?.title || "")}</a></div>`).join("")}</div>${footer()}</div>`;
}

function viewProgress(){
  const d = doneCount(), sc = Object.values(S.quiz).filter(s => s && s.total), avg = sc.length ? Math.round(sc.reduce((a, s) => a + s.right / s.total, 0) / sc.length * 100) : null;
  const prac = Object.values(S.practice).filter(Boolean).length, notes = Object.values(S.notes).filter(n => n && n.trim()).length;
  return `<div class="wrap"><header class="l-hero" style="border:0;padding:0"><span class="eyebrow">Your progress</span><h1 style="font-size:clamp(34px,5vw,52px)">${d === ALL.length ? "Course complete. Nice work." : `${d} of ${ALL.length} lessons done`}</h1>
    <p class="sum">Saved in this browser. Clearing site data or using a private window resets it, so download your notes now and then.</p></header>
    <section class="stats"><div class="stat"><b>${Math.round(d / ALL.length * 100)}%</b><span>course complete</span></div><div class="stat"><b>${avg === null ? "–" : avg + "%"}</b><span>average quiz score</span></div>
      <div class="stat"><b>${prac}</b><span>practice briefs done</span></div><div class="stat"><b>${streak()}</b><span>day study streak</span></div></section>
    <section class="block"><div class="block-h"><h2>By module</h2></div><div class="prog-mods">${COURSE.map((m, mi) => { const p = modDone(m) / m.lessons.length * 100;
      return `<div class="prog-row"><a href="#/lesson/${(m.lessons.find(l => !S.done[l.id]) || m.lessons[0]).id}" style="color:var(--ink);text-decoration:none;font-weight:600"><span class="mono" style="color:${m.color}">${pad(mi + 1)}</span> ${esc(m.title)}</a><div class="bar"><i style="width:${p}%;background:${m.color}"></i></div><span class="mono" style="text-align:right">${modDone(m)}/${m.lessons.length}</span></div>`; }).join("")}</div></section>
    <section class="block"><div class="block-h"><h2>Your notes</h2><span class="mono muted">${notes} lessons with notes</span></div>
      <p class="muted">Export everything you've written, including practice status and quiz scores, as a Markdown file.</p>
      <div class="row"><button class="btn primary" type="button" id="dl">Download my notes (.md)</button><button class="btn ghost" type="button" id="reset">Reset progress…</button></div>
      <div id="resetBox" hidden class="co warn"><b>Reset everything?</b><p>This clears lessons, quizzes, notes and lab work in this browser. It can't be undone.</p><div class="row"><button class="btn sm" type="button" id="resetYes" style="border-color:var(--bad);color:var(--bad)">Yes, reset</button><button class="btn sm ghost" type="button" id="resetNo">Cancel</button></div></div></section>
    ${footer()}</div>`;
}

/* ── lesson behaviour ── */
let cleanups = [];
function mountLesson(l){
  S.last = l.id; markDay(); save();
  const qs = S.quiz[l.id] || {answers: {}};
  const paint = () => { let answered = 0, right = 0;
    $$(".q", main).forEach(el => { const qi = +el.dataset.qi, q = l.quiz[qi], pick = qs.answers[qi], why = $(".why", el);
      $$(".opt", el).forEach(b => { const oi = +b.dataset.oi; b.className = "opt"; b.disabled = pick !== undefined; if (pick !== undefined) { if (oi === q.a) b.classList.add("right"); else if (oi === pick) b.classList.add("wrong"); } });
      if (pick !== undefined) { answered++; if (pick === q.a) right++; why.hidden = false; why.innerHTML = `<b>${pick === q.a ? "Correct." : "Not quite."}</b> ${esc(q.w)}`; } else why.hidden = true; });
    $("#score").textContent = answered ? `${right} / ${l.quiz.length} correct` : ""; $("#retry").hidden = answered < l.quiz.length;
    if (answered === l.quiz.length) { qs.right = right; qs.total = l.quiz.length; } };
  $$(".opt", main).forEach(b => b.addEventListener("click", () => { qs.answers[+b.closest(".q").dataset.qi] = +b.dataset.oi; S.quiz[l.id] = qs; paint(); save(); }));
  $("#retry").onclick = () => { qs.answers = {}; delete qs.right; delete qs.total; S.quiz[l.id] = qs; paint(); save(); };
  paint();
  $("#prac").onchange = e => { S.practice[l.id] = e.target.checked; save(); if (e.target.checked) toast("Practice brief marked done"); };
  const ta = $("#notes-" + l.id), ns = $("#nsaved"); let nt;
  ta.addEventListener("input", () => { S.notes[l.id] = ta.value; ns.textContent = "Saving…"; save(); clearTimeout(nt); nt = setTimeout(() => ns.textContent = "Saved", 600); });
  $("#doneBtn").onclick = () => { const was = S.done[l.id]; if (was) delete S.done[l.id]; else S.done[l.id] = Date.now(); save();
    const next = ALL[ALL.indexOf(l) + 1];
    if (!was) { toast(next ? "Lesson complete. On to the next one." : "Course complete!"); if (next) { location.hash = "#/lesson/" + next.id; return; } }
    route(); };
  /* lab */
  const fn = LABS[l.lab];
  if (fn) { const leave = []; try { fn($("#labBody"), {get: () => S.labs[l.lab], set: v => { S.labs[l.lab] = v; save(); }, toast, onLeave: f => leave.push(f)}); } catch (err) { $("#labBody").innerHTML = `<p class="muted">This lab couldn't load in your browser.</p>`; console.error(err); }
    cleanups.push(() => leave.forEach(f => f())); }
  /* scroll spy + reading bar */
  const links = $$("[data-toc]", main), parts = $$("section.part", main);
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.dataset.toc === e.target.id)); }); }, {rootMargin: "-20% 0px -70% 0px"});
    parts.forEach(p => io.observe(p)); cleanups.push(() => io.disconnect()); }
  const bar = $("#readbar"), onScroll = () => { const h = document.documentElement, max = h.scrollHeight - h.clientHeight; bar.style.width = (max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0) + "%"; };
  window.addEventListener("scroll", onScroll, {passive: true}); onScroll(); cleanups.push(() => { window.removeEventListener("scroll", onScroll); bar.style.width = 0; });
}

function mountGlossary(sub){
  $("#gq").addEventListener("input", e => { const q = e.target.value.trim().toLowerCase(); $$(".term", main).forEach(t => t.hidden = q && !t.dataset.t.includes(q)); });
  if (sub) { const t = $("#L-" + sub); if (t) setTimeout(() => t.scrollIntoView({block: "start"}), 30); }
}

function mountProgress(){
  $("#dl").onclick = () => {
    const md = ["# My Redline Design School notes", "", `Exported ${new Date().toLocaleString()} · ${doneCount()}/${ALL.length} lessons complete`, ""];
    COURSE.forEach((m, mi) => { md.push(`## ${mi + 1}. ${m.title}`, ""); m.lessons.forEach(l => { const q = S.quiz[l.id];
      md.push(`### ${l.title}`, `- Status: ${S.done[l.id] ? "complete" : "not complete"}`, `- Practice brief: ${S.practice[l.id] ? "done" : "not done"}`, `- Quiz: ${q && q.total ? `${q.right}/${q.total}` : "not taken"}`, "", (S.notes[l.id] || "_No notes._").trim(), ""); }); });
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([md.join("\n")], {type: "text/markdown"})); a.download = "redline-notes.md"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast("Notes downloaded");
  };
  $("#reset").onclick = () => { $("#resetBox").hidden = false; $("#resetYes").focus(); };
  $("#resetNo").onclick = () => $("#resetBox").hidden = true;
  $("#resetYes").onclick = () => { S = {done: {}, practice: {}, quiz: {}, notes: {}, labs: {}, last: null, days: [], closed: {}}; save(); toast("Progress reset"); route(); };
}

/* Tables become stacked cards on phones; tables with merged cells keep sideways scrolling. */
function stackTables(){
  $$(".tbl", main).forEach(t => { const tb = $("table", t); if (!tb || t.closest(".lab") || $("[rowspan],[colspan]", tb)) return;
    const heads = $$("thead th", tb).map(th => th.textContent.trim());
    $$("tbody tr", tb).forEach(tr => $$("td", tr).forEach((td, i) => td.setAttribute("data-label", heads[i] || "")));
    t.classList.add("stack"); });
}

/* ── router ── */
function route(){
  cleanups.forEach(f => f()); cleanups = []; closeDrawer();
  const h = location.hash.replace(/^#\/?/, ""), [view, a, b] = h.split("/");
  let lesson = view === "lesson" ? byId[a] : byId[view]; // old "#lesson-id" links still work
  shell.classList.toggle("no-rail", !lesson);
  if (!view || view === "home") { renderRail(null); main.innerHTML = viewHome(); document.title = "Redline Design School"; }
  else if (lesson) { renderRail(lesson.id); main.innerHTML = viewLesson(lesson); document.title = `${lesson.title} · Redline Design School`; mountLesson(lesson); }
  else if (view === "learn") { renderRail(null); main.innerHTML = viewLearn(); document.title = "Curriculum · Redline Design School"; }
  else if (view === "glossary") { renderRail(null); main.innerHTML = viewGlossary(); document.title = "Glossary · Redline Design School"; mountGlossary(a); }
  else if (view === "progress") { renderRail(null); main.innerHTML = viewProgress(); document.title = "Progress · Redline Design School"; mountProgress(); }
  else { renderRail(null); main.innerHTML = `<div class="wrap"><h1>Page not found</h1><p>That page doesn't exist. <a href="#/">Go to the home page</a>.</p></div>`; }
  $$("[data-nav]").forEach(x => { if (x.dataset.nav === view) x.setAttribute("aria-current", "page"); else x.removeAttribute("aria-current"); });
  $$("[data-tab]").forEach(x => { const on = (x.dataset.tab === "home" && !view) || x.dataset.tab === view || (x.dataset.tab === "learn" && !!lesson); if (on) x.setAttribute("aria-current", "page"); else x.removeAttribute("aria-current"); });
  ring(); stackTables();
  const target = lesson && b ? document.getElementById(b) : null;
  if (target) setTimeout(() => target.scrollIntoView({block: "start"}), 20); else if (!(view === "glossary" && a)) window.scrollTo(0, 0);
}
let lastPath = null;
window.addEventListener("hashchange", () => {
  const h = location.hash.replace(/^#\/?/, ""), parts = h.split("/");
  /* section anchors inside the current lesson: scroll, don't re-render */
  if (parts[0] === "lesson" && lastPath === "lesson/" + parts[1] && parts[2]) { const t = document.getElementById(parts[2]); if (t) { t.scrollIntoView({block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); return; } }
  lastPath = parts.slice(0, 2).join("/"); route(); main.focus({preventScroll: true});
});

/* ── image zoom ── */
const zoom = $("#zoom");
main.addEventListener("click", e => { const b = e.target.closest("[data-zoom]"); if (!b) return; $("img", zoom).src = b.dataset.zoom; $("img", zoom).alt = b.dataset.cap; $("span", zoom).textContent = b.dataset.cap; zoom.showModal(); });
zoom.addEventListener("click", e => { if (e.target === zoom || e.target.closest("button")) zoom.close(); });

/* ── search palette ── */
const IDX = [];
ALL.forEach(l => { IDX.push({k: "Lesson", t: l.title, s: l.summary, href: `#/lesson/${l.id}`, txt: (l.title + " " + l.summary + " " + l.keys.join(" ") + " " + l.m.title).toLowerCase()});
  l.sections.forEach(s => IDX.push({k: "Section", t: s.t, s: l.title, href: `#/lesson/${l.id}/${s.id}`, txt: (s.t + " " + s.h.replace(/<[^>]+>/g, " ")).toLowerCase()}));
  IDX.push({k: "Lab", t: l.labTitle, s: l.title, href: `#/lesson/${l.id}/lab`, txt: (l.labTitle + " " + l.labIntro).toLowerCase()}); });
GLOSSARY.forEach(([t, d, l]) => IDX.push({k: "Term", t, s: d, href: `#/lesson/${l}`, txt: (t + " " + d).toLowerCase()}));
const pal = $("#palette"), q = $("#q"), qres = $("#qres"); let sel = 0, hits = [];
const hl = (s, words) => { let out = esc(s); words.forEach(w => { if (w.length > 1) out = out.replace(new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>"); }); return out; };
const doSearch = () => { const v = q.value.trim().toLowerCase(), words = v.split(/\s+/).filter(Boolean);
  if (!words.length) hits = ALL.slice(0, 6).map(l => IDX.find(x => x.href === `#/lesson/${l.id}`));
  else hits = IDX.map(x => ({x, s: words.every(w => x.txt.includes(w)) ? (x.t.toLowerCase().includes(v) ? 10 : 0) + (x.k === "Lesson" ? 3 : x.k === "Term" ? 2 : 1) : -1})).filter(r => r.s >= 0).sort((a, b) => b.s - a.s).slice(0, 12).map(r => r.x);
  sel = 0; qres.innerHTML = hits.length ? hits.map((h, i) => `<li><a href="${h.href}" role="option" aria-selected="${i === sel}"><i>${h.k}</i><b>${hl(h.t, words)}</b><span>${esc(h.s)}</span></a></li>`).join("") : `<li class="empty">No matches for “${esc(q.value)}”. Try a broader word.</li>`; };
const openSearch = () => { q.value = ""; doSearch(); pal.showModal(); setTimeout(() => q.focus(), 10); };
q.addEventListener("input", doSearch);
q.addEventListener("keydown", e => { if (!hits.length) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length; $$("a", qres).forEach((a, i) => a.setAttribute("aria-selected", String(i === sel))); $$("a", qres)[sel].scrollIntoView({block: "nearest"}); }
  if (e.key === "Enter") { e.preventDefault(); pal.close(); location.hash = hits[sel].href; } });
qres.addEventListener("click", e => { if (e.target.closest("a")) pal.close(); });
pal.addEventListener("click", e => { if (e.target === pal) pal.close(); });
$("#searchBtn").onclick = openSearch; $("#tabSearch").onclick = openSearch;

/* ── spec mode: redline any element ── */
const ov = $("#specOv"); let specOn = false, hint;
const setSpec = on => { specOn = on; $("#specBtn").setAttribute("aria-pressed", String(on)); document.body.classList.toggle("spec-on", on); ov.hidden = !on; ov.innerHTML = "";
  if (on) { hint = document.createElement("div"); hint.className = "spec-hint"; hint.textContent = "Spec mode: hover anything to see its size and padding. Press Esc or the ruler to exit."; document.body.appendChild(hint); }
  else if (hint) { hint.remove(); hint = null; } };
$("#specBtn").onclick = () => setSpec(!specOn);
document.addEventListener("mousemove", e => {
  if (!specOn) return; const el = document.elementFromPoint(e.clientX, e.clientY); if (!el || el === document.documentElement || el === document.body || el.closest(".spec-hint")) return;
  const r = el.getBoundingClientRect(), cs = getComputedStyle(el), p = ["Top", "Right", "Bottom", "Left"].map(s => parseFloat(cs["padding" + s]) || 0);
  const tag = (x, y, t) => `<span class="spec-tag" style="left:${Math.max(4, Math.min(innerWidth - 120, x))}px;top:${Math.max(4, y)}px">${t}</span>`;
  ov.innerHTML = `<div class="spec-box" style="left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px"></div>` +
    (p[0] ? `<div class="spec-pad" style="left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${p[0]}px"></div>` : "") + (p[2] ? `<div class="spec-pad" style="left:${r.left}px;top:${r.bottom - p[2]}px;width:${r.width}px;height:${p[2]}px"></div>` : "") +
    (p[3] ? `<div class="spec-pad" style="left:${r.left}px;top:${r.top}px;width:${p[3]}px;height:${r.height}px"></div>` : "") + (p[1] ? `<div class="spec-pad" style="left:${r.right - p[1]}px;top:${r.top}px;width:${p[1]}px;height:${r.height}px"></div>` : "") +
    tag(r.left, r.top - 22, `${Math.round(r.width)} × ${Math.round(r.height)}`) + (p.some(Boolean) ? tag(r.left, r.bottom + 4, `padding ${p.map(Math.round).join(" ")}`) : "") +
    tag(r.left, r.bottom + (p.some(Boolean) ? 24 : 4), `${cs.fontSize} ${cs.fontWeight} · ${(cs.fontFamily.split(",")[0] || "").replace(/"/g, "")}`);
}, {passive: true});

/* ── keyboard ── */
document.addEventListener("keydown", e => {
  const typing = e.target.closest("input,textarea,select,[contenteditable]");
  if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) { e.preventDefault(); openSearch(); return; }
  if (e.key === "Escape") { if (specOn) setSpec(false); if (document.body.classList.contains("drawer-open")) closeDrawer(); }
  if (typing || e.altKey || e.ctrlKey || e.metaKey || e.target.closest(".lab")) return;
  const h = location.hash.replace(/^#\/?/, "").split("/"), l = h[0] === "lesson" && byId[h[1]];
  if (l && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { const n = ALL[ALL.indexOf(l) + (e.key === "ArrowRight" ? 1 : -1)]; if (n) location.hash = "#/lesson/" + n.id; }
});
$("#themeBtn").onclick = () => { theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system"; try { localStorage.setItem("redline-theme", theme); } catch (e) {} applyTheme(); toast(`Theme: ${theme}`); };
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", applyTheme);

lastPath = location.hash.replace(/^#\/?/, "").split("/").slice(0, 2).join("/");
route();
})();
