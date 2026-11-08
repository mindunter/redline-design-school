/* Redline Design School: interactive labs. Each lab renders into `el` and may persist via ctx.get/ctx.set. */
(function(){
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = (s, r) => r.querySelector(s);
const $$ = (s, r) => [...r.querySelectorAll(s)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* Generic "classify each card" lab used by several lessons. */
function classify(el, items, labels){
  el.innerHTML = `<div class="cards">${items.map((it, i) => `
    <div class="qcard" data-i="${i}"><div class="text">${esc(it.t)}</div>
      <div class="seg" role="group" aria-label="Classify">${labels.map(l => `<button type="button" data-l="${esc(l)}" aria-pressed="false">${esc(l)}</button>`).join("")}</div>
      <div class="fb" hidden></div></div>`).join("")}</div><p class="score-line" aria-live="polite"></p>`;
  const score = () => { const done = $$(".qcard[data-done]", el), right = done.filter(c => c.dataset.done === "1").length; $(".score-line", el).textContent = done.length ? `${right} of ${done.length} correct · ${items.length - done.length} to go` : ""; };
  $$(".qcard", el).forEach(card => card.addEventListener("click", e => {
    const b = e.target.closest("button[data-l]"); if (!b) return;
    const it = items[+card.dataset.i], ok = b.dataset.l === it.a;
    $$("button", card).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    const fb = $(".fb", card); fb.hidden = false;
    fb.innerHTML = `<span class="pill ${ok ? "ok" : "bad"}">${ok ? "Correct" : "Answer: " + esc(it.a)}</span> ${esc(it.w)}${it.r ? `<br><b>Better:</b> ${esc(it.r)}` : ""}`;
    card.dataset.done = ok ? "1" : "0"; score();
  }));
}

const LABS = {};

/* 1 ─ Three lenses */
LABS.lenses = (el, ctx) => {
  const v = ctx.get() || {v: 8, b: 5, f: 4, idea: "Scan the fridge to suggest tonight's dinner"};
  el.innerHTML = `<div class="lab-grid">
    <div class="field" style="gap:14px">
      <div class="field"><label for="ln-idea">Idea</label><input type="text" id="ln-idea" value="${esc(v.idea)}"></div>
      ${[["v","Valuable","Solves a real problem people will change behavior for"],["b","Viable","Works for the business: cost, revenue, risk"],["f","Feasible","The team can build and maintain it"]].map(([k,n,d]) => `
      <div class="field"><label for="ln-${k}">${n} <span class="muted" id="ln-${k}-o"></span></label><input type="range" id="ln-${k}" min="0" max="10" value="${v[k]}"><span class="muted" style="font-size:13px">${d}</span></div>`).join("")}
    </div>
    <div class="panel" style="display:grid;gap:12px;justify-items:center">
      <svg viewBox="0 0 300 260" width="100%" style="max-width:340px" role="img" aria-label="Venn diagram of the three lenses">
        <circle id="c-v" cx="110" cy="100" r="78" fill="var(--red)"/><circle id="c-b" cx="190" cy="100" r="78" fill="var(--info)"/><circle id="c-f" cx="150" cy="168" r="78" fill="var(--ok)"/>
        <text x="70" y="70" font-size="12" fill="var(--ink)">Valuable</text><text x="196" y="70" font-size="12" fill="var(--ink)">Viable</text><text x="126" y="226" font-size="12" fill="var(--ink)">Feasible</text>
        <circle id="c-dot" cx="150" cy="124" r="7" fill="var(--ink)"/></svg>
      <div id="ln-verdict" style="font-size:15px;line-height:1.5;width:100%"></div></div></div>`;
  const tips = {v: "Talk to five target users about the last time they had this problem. Is it painful enough?", b: "Sketch the business case: who pays, what it costs to run, and what could go wrong legally or for the brand.", f: "Sit with an engineer for 30 minutes. What's the hardest part, and is there a smaller version?"};
  const names = {v: "valuable", b: "viable", f: "feasible"};
  const upd = () => {
    const s = {v: +$("#ln-v", el).value, b: +$("#ln-b", el).value, f: +$("#ln-f", el).value, idea: $("#ln-idea", el).value};
    ["v","b","f"].forEach(k => { $(`#c-${k}`, el).setAttribute("fill-opacity", (0.08 + s[k] * 0.045).toFixed(2)); $(`#ln-${k}-o`, el).textContent = s[k] + "/10"; });
    const w = s.v + s.b + s.f || 1, x = (110 * s.v + 190 * s.b + 150 * s.f) / w, y = (100 * s.v + 100 * s.b + 168 * s.f) / w;
    $("#c-dot", el).setAttribute("cx", x.toFixed(1)); $("#c-dot", el).setAttribute("cy", y.toFixed(1));
    const low = ["v","b","f"].sort((a, b) => s[a] - s[b])[0], min = Math.min(s.v, s.b, s.f);
    $("#ln-verdict", el).innerHTML = min >= 7 ? `<span class="pill ok">Strong overlap</span> All three lenses look good. Now prove it with evidence before building.`
      : `<span class="pill ${min >= 4 ? "warn" : "bad"}">Weakest: ${names[low]}</span> ${tips[low]}`;
    ctx.set(s);
  };
  el.addEventListener("input", upd); upd();
};

/* 2 ─ Double Diamond */
LABS.diamond = (el) => {
  const P = [
    {n: "Discover", m: "Diverge", c: "Understand the problem rather than assume it.", meth: ["User interviews", "Observation and field visits", "Desk research and analytics"], out: "Research findings"},
    {n: "Define", m: "Converge", c: "Frame the challenge using what you learned.", meth: ["Affinity mapping", "Problem statement", "How Might We questions"], out: "A framed problem"},
    {n: "Develop", m: "Diverge", c: "Generate different answers to the defined problem.", meth: ["Crazy 8s and sketching", "Co-design with users", "Quick prototypes"], out: "Candidate solutions"},
    {n: "Deliver", m: "Converge", c: "Test small, reject what fails, improve what works.", meth: ["Usability testing", "Iteration", "Launch and measure"], out: "A tested solution"}];
  const pts = ["20,110 120,20 120,200", "120,20 220,110 120,200", "220,110 320,20 320,200", "320,20 420,110 320,200"];
  el.innerHTML = `<div style="overflow-x:auto"><svg viewBox="0 0 440 240" width="100%" style="min-width:320px;max-height:260px" role="group" aria-label="Double Diamond phases">
    ${pts.map((p, i) => `<polygon points="${p}" data-i="${i}" tabindex="0" role="button" aria-label="${P[i].n}" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5" style="cursor:pointer"/>`).join("")}
    ${P.map((p, i) => `<text x="${[80,160,280,360][i]}" y="114" text-anchor="middle" font-size="12" fill="var(--ink)" pointer-events="none">${p.n}</text>`).join("")}
    <text x="120" y="226" text-anchor="middle" font-size="11" fill="var(--muted)">Right problem</text><text x="320" y="226" text-anchor="middle" font-size="11" fill="var(--muted)">Right solution</text></svg></div>
    <div class="panel" id="dd-panel" aria-live="polite"></div>`;
  const show = i => {
    $$("polygon", el).forEach((p, j) => { p.setAttribute("fill", j === i ? "var(--red-mid)" : "var(--surface)"); p.setAttribute("stroke", j === i ? "var(--red)" : "var(--ink)"); });
    const p = P[i];
    $("#dd-panel", el).innerHTML = `<div class="row" style="justify-content:space-between"><h3 style="font-size:22px">${i + 1}. ${p.n}</h3><span class="pill ${p.m === "Diverge" ? "warn" : "ok"}">${p.m}</span></div>
      <p style="margin:8px 0 12px">${p.c}</p><div class="lab-grid"><div><div class="lbl">Typical methods</div><ul style="margin:6px 0 0;padding-left:1.1em">${p.meth.map(m => `<li>${m}</li>`).join("")}</ul></div>
      <div><div class="lbl">Output</div><p style="margin-top:6px;font-weight:600">${p.out}</p></div></div>`;
  };
  el.addEventListener("click", e => { const p = e.target.closest("polygon"); if (p) show(+p.dataset.i); });
  el.addEventListener("keydown", e => { const p = e.target.closest("polygon"); if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(+p.dataset.i); } });
  show(0);
};

/* 3 ─ Figma shortcut flashcards */
LABS.shortcuts = (el) => {
  const C = shuffle([["Frame tool", "F"], ["Rectangle", "R"], ["Text", "T"], ["Add auto layout", "Shift+A"], ["Remove auto layout", "Alt+Shift+A"], ["Toggle Dev Mode", "Shift+D"]]);
  let i = 0, right = 0;
  el.innerHTML = `<div class="panel" style="display:grid;gap:14px;text-align:center;justify-items:center;padding:28px 16px" tabindex="0" id="sc-card" aria-label="Flashcard. Focus here and press a shortcut.">
    <div class="lbl" id="sc-n"></div><div class="result" id="sc-a" style="font-size:clamp(24px,4vw,34px)"></div>
    <div id="sc-ans" class="muted" style="min-height:28px"></div>
    <div class="row" style="justify-content:center"><button class="btn sm" id="sc-r" type="button">Reveal</button><button class="btn sm primary" id="sc-next" type="button">Next card</button></div>
    <p class="muted" style="font-size:13px">On a keyboard? Click the card, then press the shortcut. Option/Alt both count.</p></div>`;
  const draw = () => { if (i >= C.length) { $("#sc-n", el).textContent = "Done"; $("#sc-a", el).textContent = `${right} / ${C.length} from memory`; $("#sc-ans", el).textContent = ""; $("#sc-next", el).textContent = "Start again"; return; }
    $("#sc-n", el).textContent = `Card ${i + 1} of ${C.length}`; $("#sc-a", el).textContent = C[i][0]; $("#sc-ans", el).textContent = ""; $("#sc-next", el).textContent = "Next card"; };
  const kb = s => s.split("+").map(k => `<kbd>${k}</kbd>`).join("+");
  $("#sc-r", el).onclick = () => { if (i < C.length) $("#sc-ans", el).innerHTML = kb(C[i][1]); };
  $("#sc-next", el).onclick = () => { if (i >= C.length) { i = 0; right = 0; } else i++; draw(); };
  $("#sc-card", el).addEventListener("keydown", e => {
    if (i >= C.length || ["Shift","Alt","Control","Meta","Tab"].includes(e.key)) return;
    const combo = [e.altKey && "Alt", e.shiftKey && "Shift", e.key.length === 1 && e.key.toUpperCase()].filter(Boolean).join("+");
    if (!combo || e.ctrlKey || e.metaKey) return; e.preventDefault();
    const ok = combo === C[i][1];
    if (ok) right++;
    $("#sc-ans", el).innerHTML = `<span class="pill ${ok ? "ok" : "bad"}">${ok ? "Correct" : "You pressed " + esc(combo)}</span> ${kb(C[i][1])}`;
    if (ok) setTimeout(() => { i++; draw(); }, 700);
  });
  draw();
};

/* 4 ─ Interview questions */
LABS.questions = (el) => classify(el, [
  {t: "Would you use an app that plans your meals?", a: "Hypothetical", w: "People are poor at predicting their own future behavior.", r: "Tell me about how you planned meals last week."},
  {t: "Don't you find grocery shopping exhausting?", a: "Leading", w: "It assumes the answer and invites agreement.", r: "Walk me through your last grocery trip."},
  {t: "Tell me about the last time you threw food away.", a: "Good", w: "Specific, past, open-ended."},
  {t: "What features should a meal app have?", a: "Asks them to design", w: "Users describe problems well; designing features is your job.", r: "What was the hardest part of deciding dinner yesterday?"},
  {t: "Why was that?", a: "Good", w: "A neutral follow-up. Most insight lives in the second and third answer."},
  {t: "How much would you pay for this?", a: "Hypothetical", w: "Stated willingness to pay is unreliable.", r: "What do you currently spend on meal kits or takeout in a typical week?"}
], ["Good", "Leading", "Hypothetical", "Asks them to design"]);

/* 5 ─ Job story builder */
LABS.jobstory = (el, ctx) => {
  const v = ctx.get() || {w: "I get home tired on a weekday", i: "decide dinner in under a minute", s: "avoid ordering takeout again"};
  const SOL = ["app","button","feature","screen","notification","dashboard","ai","click","tap","page","menu","popup","widget","toggle","filter"];
  el.innerHTML = `<div class="lab-grid"><div class="field" style="gap:12px">
    <div class="field"><label for="js-w">When… (situation)</label><input type="text" id="js-w" value="${esc(v.w)}"></div>
    <div class="field"><label for="js-i">I want to… (motivation)</label><input type="text" id="js-i" value="${esc(v.i)}"></div>
    <div class="field"><label for="js-s">So I can… (expected outcome)</label><input type="text" id="js-s" value="${esc(v.s)}"></div></div>
    <div class="panel" style="display:grid;gap:12px"><div class="lbl">Your job story</div><p id="js-out" style="font-family:var(--f-display);font-size:22px;line-height:1.35"></p><div id="js-chk" style="font-size:14.5px;line-height:1.5"></div>
    <button class="btn sm" type="button" id="js-copy">Copy story</button></div></div>`;
  const upd = () => {
    const s = {w: $("#js-w", el).value.trim(), i: $("#js-i", el).value.trim(), s: $("#js-s", el).value.trim()};
    $("#js-out", el).innerHTML = `<b style="color:var(--red)">When</b> ${esc(s.w || "…")}, <b style="color:var(--red)">I want to</b> ${esc(s.i || "…")}, <b style="color:var(--red)">so I can</b> ${esc(s.s || "…")}.`;
    const words = (s.w + " " + s.i + " " + s.s).toLowerCase().match(/[a-z]+/g) || [], hit = [...new Set(words.filter(x => SOL.includes(x)))];
    const issues = [];
    if (hit.length) issues.push(`<span class="pill warn">Solution words: ${hit.join(", ")}</span> Describe the progress, not the UI. Remove them to keep options open.`);
    if (s.w && s.w.split(/\s+/).length < 4) issues.push(`<span class="pill warn">Thin situation</span> Add context: when, where, under what pressure?`);
    if (!issues.length && s.w && s.i && s.s) issues.push(`<span class="pill ok">Looks solution-free</span> Situation, motivation and outcome are all there.`);
    $("#js-chk", el).innerHTML = issues.join("<br>");
    ctx.set(s);
  };
  $("#js-copy", el).onclick = () => { const t = $("#js-out", el).textContent; navigator.clipboard?.writeText(t).then(() => ctx.toast("Copied job story"), () => ctx.toast("Select the text to copy it")); };
  el.addEventListener("input", upd); upd();
};

/* 6 ─ Affinity mapping */
LABS.affinity = (el) => {
  const G = ["Plan around what expires", "Recipes get lost", "Weeknights are rushed"];
  const N = shuffle([["Checks the fridge before deciding", 0], ["Threw out spinach twice this week", 0], ["Cooks whatever is about to go off", 0], ["Buys more fresh produce than they use", 0],
    ["Screenshots recipes from social media", 1], ["Has 300 saved bookmarks", 1], ["Can't remember where a recipe came from", 1], ["Recipes split across four apps", 1],
    ["Gets home at 7 pm", 2], ["Wants dinner decided in a minute", 2], ["Orders takeout when tired", 2], ["Kids need to eat by 7:30", 2]]);
  let sel = null;
  el.innerHTML = `<p class="muted" style="font-size:14px;margin-bottom:12px">Tap a note, then tap a cluster. On desktop you can also drag.</p>
    <div class="aff-pool" data-g="-1" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:8px;padding:12px;border:1px dashed var(--line-2);border-radius:10px;min-height:64px"></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:12px;margin-top:12px">${G.map((g, i) => `<div class="aff-col panel" data-g="${i}" style="min-height:140px;display:flex;flex-direction:column;gap:8px"><b style="font-family:var(--f-display);font-size:16px">${g}</b></div>`).join("")}</div>
    <div class="row" style="margin-top:14px"><button class="btn sm primary" type="button" id="af-check">Check my map</button><button class="btn sm ghost" type="button" id="af-reset">Reset</button><span class="score-line" id="af-score" aria-live="polite"></span></div>`;
  const colors = ["#FFF3B0", "#FFD6E5", "#CFE8FF"];
  const pool = $(".aff-pool", el);
  N.forEach(([t, g], i) => { const b = document.createElement("button"); b.type = "button"; b.className = "aff-note"; b.draggable = true; b.dataset.i = i; b.dataset.g = g; b.textContent = t;
    b.style.cssText = `background:${colors[i % 3]};color:#1a1a1a;border:1px solid rgba(0,0,0,.08);border-radius:4px;padding:10px 12px;font-size:13.5px;line-height:1.35;text-align:left;width:100%;box-shadow:0 1px 2px rgba(0,0,0,.08);min-height:56px;display:flex;align-items:center`;
    pool.appendChild(b); });
  const mark = b => { $$(".aff-note", el).forEach(n => n.style.outline = ""); sel = b; if (b) b.style.outline = "2px solid var(--red)"; };
  el.addEventListener("click", e => {
    const n = e.target.closest(".aff-note"); if (n) { mark(sel === n ? null : n); return; }
    const c = e.target.closest("[data-g]"); if (c && sel) { c.appendChild(sel); mark(null); }
  });
  el.addEventListener("dragstart", e => { const n = e.target.closest(".aff-note"); if (n) { e.dataTransfer.setData("text/plain", n.dataset.i); } });
  el.addEventListener("dragover", e => { if (e.target.closest("[data-g]")) e.preventDefault(); });
  el.addEventListener("drop", e => { const c = e.target.closest("[data-g]"); if (!c) return; e.preventDefault(); const n = $(`.aff-note[data-i="${e.dataTransfer.getData("text/plain")}"]`, el); if (n) c.appendChild(n); });
  $("#af-check", el).onclick = () => { let ok = 0, placed = 0;
    $$(".aff-note", el).forEach(n => { const g = +n.parentElement.dataset.g; if (g >= 0) { placed++; const r = g === +n.dataset.g; if (r) ok++; n.style.boxShadow = r ? "0 0 0 2px var(--ok)" : "0 0 0 2px var(--bad)"; } });
    $("#af-score", el).textContent = placed < N.length ? `${N.length - placed} notes still unsorted · ${ok} correct so far` : `${ok} of ${N.length} in the expected cluster`; };
  $("#af-reset", el).onclick = () => { $$(".aff-note", el).forEach(n => { n.style.boxShadow = ""; pool.appendChild(n); }); $("#af-score", el).textContent = ""; };
};

/* 7 ─ HMW scope */
LABS.hmw = (el) => classify(el, [
  {t: "How might we improve the user experience of meal planning?", a: "Too broad", w: "Generic; it isn't based on a specific insight."},
  {t: "How might we help parents decide dinner from what's already in the fridge?", a: "Just right", w: "Based on an insight, outcome-focused, open to many solutions."},
  {t: "How might we add a barcode scanner to the pantry screen?", a: "Contains a solution", w: "It names the answer and shuts down other ideas.", r: "How might we help people know what they already have at home?"},
  {t: "How might we reduce the number of support calls?", a: "Symptom or negative", w: "Calls are a symptom, and 'reduce' is a negative verb.", r: "How might we help people feel confident they have everything they need?"},
  {t: "How might we make saved recipes easy to find again?", a: "Just right", w: "Grounded in the 'recipes get lost' insight, with an open solution space."}
], ["Just right", "Too broad", "Contains a solution", "Symptom or negative"]);

/* 8 ─ HEART scorecard */
LABS.heart = (el, ctx) => {
  const K = [["H","Happiness"],["E","Engagement"],["A","Adoption"],["R","Retention"],["T","Task success"]];
  const EX = {H: ["People feel confident about their weekly plan", "Survey: 'How confident are you in this week's plan?'", "Average confidence score (1–7) per week"],
    E: ["People plan meals every week", "Opens of the plan screen", "Plan-screen visits per user per week"],
    A: ["New users make a first plan", "First plan saved", "% of new users saving a plan within 7 days"],
    R: ["People keep planning", "Active planners in consecutive months", "% of this month's planners active 3 months later"],
    T: ["Planning a week is quick", "Time from opening to saved plan", "Median time to save a plan; % of sessions abandoned"]};
  const st = ctx.get() || {on: ["T","A"], rows: {}};
  el.innerHTML = `<div style="display:grid;gap:10px;margin-bottom:16px"><div class="row" style="justify-content:space-between"><span class="lbl">Feature: weekly meal plan</span><button class="btn sm" type="button" id="ht-ex">Fill examples</button></div>
    <div class="seg" role="group" aria-label="HEART categories" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,110px),1fr))">${K.map(([k, n]) => `<button type="button" data-k="${k}" aria-pressed="false">${n}</button>`).join("")}</div></div><div id="ht-rows" class="cards"></div>`;
  const draw = () => {
    $$(".seg button", el).forEach(b => b.setAttribute("aria-pressed", String(st.on.includes(b.dataset.k))));
    $("#ht-rows", el).innerHTML = st.on.length ? K.filter(([k]) => st.on.includes(k)).map(([k, n]) => { const r = st.rows[k] || ["","",""];
      return `<div class="qcard" data-k="${k}"><b style="font-family:var(--f-display);font-size:17px"><span style="color:var(--red)">${k}</span> ${n}</b>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:10px">${["Goal","Signal","Metric"].map((f, i) => `<div class="field"><label for="ht-${k}${i}">${f}</label><input type="text" id="ht-${k}${i}" data-f="${i}" value="${esc(r[i])}" placeholder="${esc(EX[k][i])}"></div>`).join("")}</div>
        <div class="fb"></div></div>`; }).join("") : `<p class="muted">Pick at least one category. The paper says you don't need all five, but choose deliberately.</p>`;
    lint();
  };
  const lint = () => $$(".qcard", el).forEach(c => { const m = (st.rows[c.dataset.k] || [])[2] || "";
    const raw = /\b(total|number of|count of)\b/i.test(m) && !/\bper\b|%|rate|average|median|ratio/i.test(m);
    $(".fb", c).innerHTML = raw ? `<span class="pill warn">Normalize</span> Raw totals rise with user growth. Try a per-user average, ratio or percentage.` : m ? `<span class="pill ok">Trackable</span>` : ""; });
  el.addEventListener("click", e => { const b = e.target.closest("button[data-k]"); if (!b) return; const k = b.dataset.k; st.on = st.on.includes(k) ? st.on.filter(x => x !== k) : [...st.on, k]; ctx.set(st); draw(); });
  el.addEventListener("input", e => { const c = e.target.closest(".qcard"); if (!c) return; const k = c.dataset.k; st.rows[k] = st.rows[k] || ["","",""]; st.rows[k][+e.target.dataset.f] = e.target.value; ctx.set(st); lint(); });
  $("#ht-ex", el).onclick = () => { st.on.forEach(k => st.rows[k] = EX[k].slice()); ctx.set(st); draw(); };
  draw();
};

/* 9 ─ RICE */
LABS.rice = (el, ctx) => {
  const st = ctx.get() || {ideas: [["Fridge-based suggestions", 800, 2, 0.5, 3], ["Save recipes from any link", 1200, 1, 0.8, 1], ["Shared family plan", 300, 2, 0.8, 2], ["Dark mode", 2000, 0.25, 1, 0.5]]};
  const IMP = [[3,"3 · massive"],[2,"2 · high"],[1,"1 · medium"],[0.5,"0.5 · low"],[0.25,"0.25 · minimal"]], CONF = [[1,"100% · high"],[0.8,"80% · medium"],[0.5,"50% · low"]];
  el.innerHTML = `<div id="rc-b" class="cards"></div>
    <div class="row" style="margin:12px 0 18px;justify-content:space-between"><button class="btn sm" type="button" id="rc-add">Add idea</button><span class="mono muted" style="font-size:12px">Score = Reach × Impact × Confidence ÷ Effort</span></div>
    <div class="lab-grid"><div class="panel"><div class="lbl" style="margin-bottom:10px">Ranking</div><ol id="rc-rank" style="margin:0;padding:0;list-style:none;display:grid;gap:8px"></ol></div>
    <div class="panel"><div class="lbl">Value vs. effort</div><svg id="rc-svg" viewBox="0 0 320 240" width="100%" role="img" aria-label="Scatter plot of value against effort"></svg></div></div>`;
  const sel = (opts, v, f, label) => `<select data-f="${f}" aria-label="${label}">${opts.map(([x, l]) => `<option value="${x}" ${+v === x ? "selected" : ""}>${l}</option>`).join("")}</select>`;
  const score = r => r[4] > 0 ? r[1] * r[2] * r[3] / r[4] : 0;
  const draw = () => {
    $("#rc-b", el).innerHTML = st.ideas.map((r, i) => `<div class="qcard" data-i="${i}">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:12px;align-items:center"><input type="text" data-f="0" value="${esc(r[0])}" aria-label="Idea name" style="font-weight:600">
        <span style="text-align:right"><span class="lbl" style="display:block;font-size:10px">Score</span><b class="mono" data-score style="font-size:18px"></b></span><button class="iconbtn" data-del aria-label="Remove ${esc(r[0])}" type="button">✕</button></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,130px),1fr));gap:10px;align-items:end">
        <div class="field"><label>Reach / quarter</label><input type="number" min="0" data-f="1" value="${r[1]}" aria-label="Reach per quarter"></div>
        <div class="field"><label>Impact</label>${sel(IMP, r[2], 2, "Impact")}</div>
        <div class="field"><label>Confidence</label>${sel(CONF, r[3], 3, "Confidence")}</div>
        <div class="field"><label>Effort (person-months)</label><input type="number" min="0.5" step="0.5" data-f="4" value="${r[4]}" aria-label="Effort in person-months"></div></div></div>`).join("");
    upd();
  };
  const upd = () => {
    $$("#rc-b .qcard", el).forEach(c => { $("[data-score]", c).textContent = Math.round(score(st.ideas[+c.dataset.i])); });
    const ranked = st.ideas.map((r, i) => [r, score(r)]).sort((a, b) => b[1] - a[1]);
    $("#rc-rank", el).innerHTML = ranked.map(([r, s], i) => `<li style="display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:8px;align-items:baseline"><span class="mono" style="color:var(--red)">${i + 1}</span><b style="min-width:0">${esc(r[0] || "Untitled")}</b><span class="mono muted">${Math.round(s)}</span></li>`).join("");
    const maxV = Math.max(1, ...st.ideas.map(r => r[1] * r[2] * r[3])), maxE = Math.max(1, ...st.ideas.map(r => r[4]));
    const X = e => 40 + e / maxE * 250, Y = v => 196 - v / maxV * 170, placed = [];
    const labels = st.ideas.map(r => { const x = X(r[4]), y = Y(r[1] * r[2] * r[3]), left = x > 170, nm = r[0] || "", t = nm.length > 16 ? nm.slice(0, 15) + "…" : nm, w = t.length * 6;
      let ly = y + 3.5; const x0 = left ? x - 10 - w : x + 10;
      while (placed.some(p => Math.abs(p.y - ly) < 12 && x0 < p.x0 + p.w && p.x0 < x0 + w)) ly += 12;
      placed.push({x0, w, y: ly}); return `<circle cx="${x}" cy="${y}" r="6" fill="var(--red)"/><text x="${left ? x - 10 : x + 10}" y="${ly}" text-anchor="${left ? "end" : "start"}" font-size="10" fill="var(--ink)">${esc(t)}</text>`; });
    $("#rc-svg", el).innerHTML = `<rect x="40" y="26" width="125" height="85" fill="var(--ok-soft)"/><text x="46" y="40" font-size="10" fill="var(--ok)">QUICK WINS</text><text x="290" y="40" font-size="10" text-anchor="end" fill="var(--muted)">BIG BETS</text><text x="290" y="190" font-size="10" text-anchor="end" fill="var(--muted)">MONEY PITS</text>
      <line x1="40" y1="196" x2="290" y2="196" stroke="var(--line-2)"/><line x1="40" y1="26" x2="40" y2="196" stroke="var(--line-2)"/><line x1="165" y1="26" x2="165" y2="196" stroke="var(--line)" stroke-dasharray="3 3"/><line x1="40" y1="111" x2="290" y2="111" stroke="var(--line)" stroke-dasharray="3 3"/>
      <text x="165" y="218" font-size="10" text-anchor="middle" fill="var(--muted)">Effort →</text><text x="16" y="111" font-size="10" fill="var(--muted)" transform="rotate(-90 16 111)" text-anchor="middle">Value →</text>${labels.join("")}`;
    ctx.set(st);
  };
  el.addEventListener("input", e => { const c = e.target.closest(".qcard[data-i]"); if (!c || e.target.tagName === "SELECT") return; const f = +e.target.dataset.f; st.ideas[+c.dataset.i][f] = f === 0 ? e.target.value : +e.target.value || 0; upd(); });
  el.addEventListener("change", e => { if (e.target.tagName !== "SELECT") return; const c = e.target.closest(".qcard"); st.ideas[+c.dataset.i][+e.target.dataset.f] = +e.target.value; upd(); });
  el.addEventListener("click", e => { if (e.target.closest("[data-del]")) { st.ideas.splice(+e.target.closest(".qcard").dataset.i, 1); draw(); } });
  $("#rc-add", el).onclick = () => { st.ideas.push(["New idea", 500, 1, 0.8, 1]); draw(); };
  draw();
};

/* 10 ─ Tree test */
LABS.treetest = (el) => {
  const T = {n: "Home", c: [{n: "Plan", c: [{n: "This week"}, {n: "History"}]}, {n: "Recipes", c: [{n: "Saved"}, {n: "Search"}]}, {n: "Shopping list", c: [{n: "Items"}, {n: "Stores"}]}, {n: "Profile", c: [{n: "Household"}, {n: "Settings"}]}]};
  const TASKS = [["You want to see the meals you planned last month.", "Plan/History"], ["You need to check which shop has your ingredients.", "Shopping list/Stores"], ["Find a recipe you bookmarked last week.", "Recipes/Saved"], ["Add your partner so you can plan together.", "Profile/Household"]];
  let t = 0, path = [], clicks = 0, back = false; const res = [];
  el.innerHTML = `<div class="lab-grid"><div class="panel" style="display:grid;gap:12px"><div class="lbl" id="tt-n"></div><p id="tt-task" style="font-size:18px;font-weight:600;line-height:1.4"></p>
    <nav aria-label="Menu"><div class="mono muted" id="tt-crumb" style="margin-bottom:8px"></div><div id="tt-list" style="display:grid;gap:6px"></div></nav></div>
    <div class="panel"><div class="lbl" style="margin-bottom:8px">Results</div><div id="tt-res" class="cards"><p class="muted" style="font-size:14px">Your results appear here, with success and directness for each task.</p></div></div></div>`;
  const node = () => path.reduce((n, i) => n.c[i], T);
  const draw = () => {
    if (t >= TASKS.length) { $("#tt-n", el).textContent = "Finished"; $("#tt-task", el).textContent = `${res.filter(r => r.ok).length} of ${TASKS.length} found · ${res.filter(r => r.ok && r.direct).length} directly`; $("#tt-list", el).innerHTML = `<button class="btn sm" type="button" data-restart>Run again</button>`; $("#tt-crumb", el).textContent = ""; return; }
    $("#tt-n", el).textContent = `Task ${t + 1} of ${TASKS.length}`; $("#tt-task", el).textContent = TASKS[t][0];
    const n = node(); $("#tt-crumb", el).textContent = ["Home", ...path.map((_, i) => path.slice(0, i + 1).reduce((x, j) => x.c[j], T).n)].join(" › ");
    $("#tt-list", el).innerHTML = (path.length ? `<button class="btn sm ghost" type="button" data-back style="justify-content:flex-start">‹ Back</button>` : "") +
      (n.c ? n.c.map((c, i) => `<button class="btn sm" type="button" data-go="${i}" style="justify-content:space-between">${c.n}<span aria-hidden="true">${c.c ? "›" : ""}</span></button>`).join("") : "") +
      (!n.c ? `<button class="btn sm primary" type="button" data-pick>I'd find it here</button>` : "");
  };
  el.addEventListener("click", e => {
    if (e.target.closest("[data-restart]")) { t = 0; res.length = 0; path = []; clicks = 0; back = false; $("#tt-res", el).innerHTML = ""; draw(); return; }
    if (e.target.closest("[data-back]")) { path.pop(); back = true; clicks++; draw(); return; }
    const g = e.target.closest("[data-go]"); if (g) { path.push(+g.dataset.go); clicks++; draw(); return; }
    if (e.target.closest("[data-pick]")) {
      const names = path.map((_, i) => path.slice(0, i + 1).reduce((x, j) => x.c[j], T).n).join("/"), ok = names === TASKS[t][1], direct = ok && !back && clicks === 2;
      res.push({ok, direct});
      $("#tt-res", el).insertAdjacentHTML("beforeend", `<div class="qcard"><b>Task ${t + 1}</b><div class="row"><span class="pill ${ok ? "ok" : "bad"}">${ok ? "Success" : "Fail"}</span>${ok ? `<span class="pill ${direct ? "ok" : "warn"}">${direct ? "Direct" : "Indirect"}</span>` : ""}<span class="mono muted">${esc(names)}</span></div>${ok ? "" : `<span class="fb">Expected: ${esc(TASKS[t][1].replace("/", " › "))}</span>`}</div>`);
      t++; path = []; clicks = 0; back = false; draw();
    }
  });
  draw();
};

/* 11 ─ Journey emotion line */
LABS.journey = (el, ctx) => {
  const PH = ["Decide", "Shop", "Cook", "Eat", "Reflect"], v = ctx.get() || [0, -2, -1, 2, 1];
  el.innerHTML = `<svg viewBox="0 0 520 224" width="100%" role="img" aria-label="Emotion curve across journey phases (higher is more positive)"></svg>
    <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:8px">${PH.map((p, i) => `<div class="field" style="align-items:center;text-align:center"><label for="jm-${i}">${p}</label>
    <input type="range" id="jm-${i}" min="-3" max="3" value="${v[i]}" aria-label="${p} feeling" style="writing-mode:vertical-lr;direction:rtl;height:100px;width:28px"></div>`).join("")}</div>
    <p id="jm-op" style="margin-top:12px;font-size:15px"></p>`;
  const face = x => x >= 2 ? "😀" : x >= 1 ? "🙂" : x > -1 ? "😐" : x > -2 ? "🙁" : "😣";
  const upd = () => {
    const s = PH.map((_, i) => +$("#jm-" + i, el).value), X = i => 52 + i * 104, Y = x => 112 - x * 26;
    const d = s.map((x, i) => (i ? "L" : "M") + X(i) + " " + Y(x)).join(" "), lo = s.indexOf(Math.min(...s));
    $("svg", el).innerHTML = `<line x1="20" y1="112" x2="500" y2="112" stroke="var(--line-2)" stroke-dasharray="4 4"/><text x="500" y="106" font-size="9" text-anchor="end" fill="var(--muted)">neutral</text>
      <path d="${d}" fill="none" stroke="var(--red)" stroke-width="3" stroke-linejoin="round"/>${s.map((x, i) => `<circle cx="${X(i)}" cy="${Y(x)}" r="${i === lo ? 9 : 5}" fill="${i === lo ? "var(--red)" : "var(--surface)"}" stroke="var(--red)" stroke-width="2"/><text x="${X(i)}" y="${Y(x) - 14}" font-size="16" text-anchor="middle">${face(x)}</text>`).join("")}
      ${PH.map((p, i) => `<text x="${X(i)}" y="212" font-size="11" text-anchor="middle" fill="var(--ink)">${p}</text>`).join("")}`;
    $("#jm-op", el).innerHTML = `<span class="pill bad">Biggest opportunity: ${PH[lo]}</span> This is where the emotion line dips lowest. Start your How Might We questions here.`;
    ctx.set(s);
  };
  el.addEventListener("input", upd); upd();
};

/* 12 ─ Crazy 8s timer */
LABS.crazy8 = (el, ctx) => {
  let per = 60, left = 8 * per, timer = null;
  el.innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:14px"><div class="result mono" id="c8-t" style="font-family:var(--f-mono)">8:00</div>
    <div class="row"><div class="seg" role="group" aria-label="Mode"><button type="button" data-m="60" aria-pressed="true">Real (8 min)</button><button type="button" data-m="2" aria-pressed="false">Demo (16 s)</button></div>
    <button class="btn sm primary" type="button" id="c8-go">Start</button><button class="btn sm ghost" type="button" id="c8-r">Reset</button></div></div>
    <div id="c8-grid" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;aspect-ratio:2/1;max-height:340px">${Array.from({length: 8}, (_, i) => `<div data-p="${i}" style="border:1.5px solid var(--line-2);border-radius:6px;display:grid;place-items:center;font-family:var(--f-display);font-size:28px;color:var(--muted);transition:all .2s">${i + 1}</div>`).join("")}</div>
    <p class="muted" id="c8-msg" style="margin-top:10px;font-size:14px" aria-live="polite">Fold your paper three times to make eight panels, then press Start.</p>`;
  const fmt = s => Math.floor(s / 60) + ":" + String(Math.ceil(s) % 60).padStart(2, "0");
  const paint = () => { const total = 8 * per, cur = Math.min(7, Math.floor((total - left) / per));
    $("#c8-t", el).textContent = per === 60 ? fmt(left) : left.toFixed(0) + "s";
    $$("[data-p]", el).forEach((p, i) => { const done = left <= 0 || i < cur, now = timer && i === cur;
      p.style.background = done ? "var(--ok-soft)" : now ? "var(--red-soft)" : "transparent"; p.style.borderColor = now ? "var(--red)" : done ? "var(--ok)" : "var(--line-2)"; p.style.color = now ? "var(--red)" : done ? "var(--ok)" : "var(--muted)"; });
  };
  const stop = () => { clearInterval(timer); timer = null; $("#c8-go", el).textContent = "Start"; };
  $("#c8-go", el).onclick = () => { if (timer) { stop(); paint(); return; } if (left <= 0) left = 8 * per;
    $("#c8-go", el).textContent = "Pause"; let last = Date.now();
    timer = setInterval(() => { const now = Date.now(); left -= (now - last) / 1000; last = now;
      if (left <= 0) { left = 0; stop(); $("#c8-msg", el).textContent = "Pens down. Present your sheet in two minutes, then dot-vote."; ctx.toast("Crazy 8s complete"); }
      else $("#c8-msg", el).textContent = `Panel ${Math.min(8, Math.floor((8 * per - left) / per) + 1)}: sketch a different idea.`;
      paint(); }, 200); paint(); };
  $("#c8-r", el).onclick = () => { stop(); left = 8 * per; $("#c8-msg", el).textContent = "Ready."; paint(); };
  el.addEventListener("click", e => { const m = e.target.closest("[data-m]"); if (!m) return; stop(); per = +m.dataset.m; left = 8 * per; $$("[data-m]", el).forEach(b => b.setAttribute("aria-pressed", String(b === m))); paint(); });
  ctx.onLeave(stop); paint();
};

/* 13 ─ Fitts's law */
LABS.fitts = (el) => {
  const TR = 12; let n = 0, t0 = 0, data = [], cur = null;
  el.innerHTML = `<div id="ft-arena" style="position:relative;height:300px;border:1px solid var(--line);border-radius:10px;background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/16px 16px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/16px 16px,var(--paper);overflow:hidden;touch-action:manipulation">
    <button type="button" id="ft-start" class="btn primary" style="position:absolute;left:16px;top:50%;transform:translateY(-50%)">Start</button>
    <button type="button" id="ft-target" aria-label="Target" style="position:absolute;border-radius:50%;border:0;background:var(--red);display:none;padding:0"></button></div>
    <div class="lab-grid" style="margin-top:14px"><div class="panel"><div class="lbl">Progress</div><p id="ft-msg" style="margin-top:6px" aria-live="polite">Press Start, then hit the red target as fast as you can. ${TR} trials.</p></div>
    <div class="panel"><div class="lbl">Your results</div><div id="ft-out" style="margin-top:6px;font-size:15px"></div></div></div>`;
  const A = $("#ft-arena", el), S = $("#ft-start", el), G = $("#ft-target", el);
  const sizes = shuffle([20, 20, 20, 20, 36, 36, 36, 36, 72, 72, 72, 72]);
  S.onclick = () => { if (n >= TR) { n = 0; data = []; $("#ft-out", el).innerHTML = ""; }
    const w = A.clientWidth, size = sizes[n % sizes.length], minX = 140, x = minX + Math.random() * Math.max(10, w - minX - size - 16), y = 16 + Math.random() * (300 - size - 32);
    const sr = S.getBoundingClientRect(), ar = A.getBoundingClientRect(), sx = sr.left - ar.left + sr.width / 2, sy = sr.top - ar.top + sr.height / 2;
    cur = {W: size, D: Math.hypot(x + size / 2 - sx, y + size / 2 - sy)};
    Object.assign(G.style, {display: "block", width: size + "px", height: size + "px", left: x + "px", top: y + "px"}); S.disabled = true; t0 = performance.now(); };
  G.onclick = () => { const t = performance.now() - t0; G.style.display = "none"; S.disabled = false; n++;
    data.push({...cur, t, id: Math.log2(cur.D / cur.W + 1)});
    $("#ft-msg", el).textContent = n < TR ? `Trial ${n} of ${TR}: ${Math.round(t)} ms. Press Start for the next one.` : "Done! Press Start to run it again.";
    if (n >= TR) report(); };
  const report = () => { const by = w => { const d = data.filter(x => x.W === w); return d.length ? Math.round(d.reduce((a, x) => a + x.t, 0) / d.length) : 0; };
    const mx = Math.max(...data.map(d => d.t)), mi = Math.max(...data.map(d => d.id));
    $("#ft-out", el).innerHTML = `<div class="row" style="gap:16px">${[72, 36, 20].map(w => `<div><div class="lbl">${w}px targets</div><b class="mono" style="font-size:20px">${by(w)} ms</b></div>`).join("")}</div>
      <svg viewBox="0 0 260 140" width="100%" style="margin-top:10px" role="img" aria-label="Time against index of difficulty"><line x1="30" y1="120" x2="250" y2="120" stroke="var(--line-2)"/><line x1="30" y1="10" x2="30" y2="120" stroke="var(--line-2)"/>
      <text x="140" y="136" font-size="9" text-anchor="middle" fill="var(--muted)">Difficulty: log₂(D/W + 1) →</text><text x="10" y="65" font-size="9" fill="var(--muted)" transform="rotate(-90 10 65)" text-anchor="middle">Time →</text>
      ${data.map(d => `<circle cx="${30 + d.id / mi * 215}" cy="${120 - d.t / mx * 105}" r="4" fill="var(--red)" fill-opacity=".75"/>`).join("")}</svg>
      <p style="font-size:14px;margin-top:6px">Smaller, farther targets (right) usually take longer. That's Fitts's law.</p>`; };
};

/* 14 ─ Which look clickable? */
LABS.clickable = (el) => {
  const E = [
    {h: `<span style="display:inline-block;background:var(--red);color:#fff;padding:10px 16px;border-radius:6px;font-weight:600">Save plan</span>`, c: true, w: "Clear signifier: filled, rectangular, rounded, with an action label."},
    {h: `<span style="font-weight:700;font-size:18px">Weekly recipes</span>`, c: false, w: "A heading. Bold alone doesn't signal clickability; don't style headings like buttons."},
    {h: `<span style="color:var(--info);text-decoration:underline">See all recipes</span>`, c: true, w: "Colored and underlined text is the strongest link signifier."},
    {h: `<span style="color:var(--ink)">Learn more</span>`, c: true, w: "This one IS a link, but it looks like body text. No signifier, so people miss it."},
    {h: `<span style="display:inline-grid;place-items:center;width:36px;height:36px;border-radius:8px;border:1px solid var(--line-2)">⚙</span>`, c: true, w: "Icon-only buttons are ambiguous. NN/g advises pairing icons with text labels."},
    {h: `<span style="display:inline-block;padding:4px 10px;border-radius:12px;background:var(--sunken);font-size:13px">Vegetarian</span>`, c: false, w: "A static tag. Pill shapes can look clickable, so keep tags visibly different from filter chips."},
    {h: `<span style="display:inline-block;padding:10px 16px;border-radius:6px;background:var(--sunken);color:var(--muted)">Disabled</span>`, c: false, w: "A disabled button. It should look inactive, but keep labels readable."},
    {h: `<span style="display:inline-block;padding:10px 16px;border:1.5px solid var(--ink);border-radius:6px;font-weight:600">Add to list</span>`, c: true, w: "An outlined button. Border, shape and padding still read as interactive."}];
  el.innerHTML = `<p class="muted" style="font-size:14px;margin-bottom:12px">Tap each element you believe is interactive.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));gap:10px">${E.map((x, i) => `<button type="button" class="panel ck" data-i="${i}" aria-pressed="false" style="display:grid;place-items:center;min-height:96px;gap:8px;text-align:center">${x.h}<span class="fb" style="font-size:13px;line-height:1.4;color:var(--ink-2)" hidden></span></button>`).join("")}</div>
    <div class="row" style="margin-top:14px"><button class="btn sm primary" type="button" id="ck-rev">Reveal answers</button><span class="score-line" id="ck-s" aria-live="polite"></span></div>`;
  el.addEventListener("click", e => { const b = e.target.closest(".ck"); if (!b || el.dataset.rev) return; const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); b.style.borderColor = on ? "var(--red)" : ""; b.style.boxShadow = on ? "0 0 0 2px var(--red-soft)" : ""; });
  $("#ck-rev", el).onclick = () => { el.dataset.rev = 1; let ok = 0;
    $$(".ck", el).forEach(b => { const x = E[+b.dataset.i], said = b.getAttribute("aria-pressed") === "true", r = said === x.c; if (r) ok++;
      b.style.borderColor = r ? "var(--ok)" : "var(--bad)"; b.style.boxShadow = ""; const f = $(".fb", b); f.hidden = false; f.innerHTML = `<b>${x.c ? "Interactive" : "Not interactive"}.</b> ${x.w}`; });
    $("#ck-s", el).textContent = `${ok} of ${E.length} judged correctly`; };
};

/* 15 ─ State switcher */
LABS.states = (el) => {
  const S = {
    Empty: [`<div style="text-align:center;padding:28px 12px;display:grid;gap:10px;justify-items:center"><div style="width:56px;height:56px;border-radius:50%;background:var(--red-soft);display:grid;place-items:center;font-size:24px">🍳</div><b>No meals planned yet</b><span class="muted" style="font-size:13px">Plan this week in about a minute. We'll suggest meals from what you have.</span><span class="btn sm primary">Plan this week</span></div>`, "Explains what will appear and gives one clear first action."],
    Loading: [Array.from({length: 4}, () => `<div style="display:flex;gap:10px;align-items:center;padding:10px 0"><div style="width:44px;height:44px;border-radius:8px;background:var(--line)"></div><div style="flex:1;display:grid;gap:6px"><div style="height:10px;width:70%;border-radius:5px;background:var(--line)"></div><div style="height:8px;width:40%;border-radius:5px;background:var(--line)"></div></div></div>`).join(""), "Skeletons mirror the real layout, so the wait feels shorter and nothing jumps."],
    Partial: [row("Mon", "Lemon chickpea pasta") + `<div style="padding:14px;border:1px dashed var(--line-2);border-radius:8px;text-align:center;font-size:13px;margin-top:8px" class="muted">6 more days to plan · <b style="color:var(--red)">Suggest meals</b></div>`, "One item still looks intentional, and it nudges toward the next step."],
    Ideal: ["Mon Lemon chickpea pasta|Tue Veg fried rice|Wed Tomato & bean soup|Thu Fish tacos|Fri Pizza night".split("|").map(x => row(x.slice(0, 3), x.slice(4))).join(""), "The screen you designed first. Every other state supports it."],
    Error: [`<div style="padding:14px;border-radius:8px;background:var(--bad-soft);display:grid;gap:6px;margin-bottom:10px"><b style="color:var(--bad)">⚠ Couldn't save your plan</b><span style="font-size:13px">You're offline. Your changes are kept on this phone and we'll save them when you reconnect.</span><span class="btn sm" style="justify-self:start">Try again</span></div>` + row("Mon", "Lemon chickpea pasta"), "Says what happened and what to do; preserves input; icon plus color, not color alone."],
    Overflow: [row("Mon", "Slow-roasted Mediterranean vegetable and halloumi traybake with lemon-herb couscous") + row("Tue", "Pasta") + `<div class="mono muted" style="font-size:12px;padding:8px 0">+ 1,284 saved recipes</div>`, "Long names truncate or wrap gracefully; big counts are formatted."]
  };
  function row(d, n) { return `<div style="display:flex;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)"><span class="mono" style="width:32px;color:var(--red);font-size:12px">${d}</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px">${n}</span></div>`; }
  el.innerHTML = `<div class="seg" role="group" aria-label="Screen state" style="margin-bottom:14px">${Object.keys(S).map(k => `<button type="button" data-s="${k}" aria-pressed="false">${k}</button>`).join("")}</div>
    <div class="lab-grid"><div style="justify-self:center;width:100%;max-width:300px;border:2px solid var(--ink);border-radius:28px;padding:18px 14px;background:var(--surface);min-height:360px">
    <div style="width:70px;height:6px;border-radius:3px;background:var(--line-2);margin:0 auto 14px"></div><b style="font-family:var(--f-display);font-size:20px">This week</b><div id="st-body" style="margin-top:10px"></div></div>
    <div class="panel"><div class="lbl" id="st-n"></div><p id="st-w" style="margin-top:8px;font-size:15.5px;line-height:1.55"></p></div></div>`;
  const show = k => { $$("[data-s]", el).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.s === k))); $("#st-body", el).innerHTML = S[k][0]; $("#st-n", el).textContent = k + " state"; $("#st-w", el).textContent = S[k][1]; };
  el.addEventListener("click", e => { const b = e.target.closest("[data-s]"); if (b) show(b.dataset.s); }); show("Empty");
};

/* 16 ─ Type scale and measure */
LABS.typescale = (el, ctx) => {
  const st = ctx.get() || {b: 16, r: 1.25, w: 560};
  const R = [[1.125, "1.125 Major second"], [1.2, "1.2 Minor third"], [1.25, "1.25 Major third"], [1.333, "1.333 Perfect fourth"], [1.5, "1.5 Perfect fifth"], [1.618, "1.618 Golden ratio"]];
  const sample = "Good typography is invisible. When the measure, size and spacing are right, readers stop noticing the type and simply read. Long lines force the eye to travel too far to find the start of the next line.";
  el.innerHTML = `<div class="row" style="margin-bottom:16px"><div class="field" style="width:120px"><label for="ts-b">Base (px)</label><input type="number" id="ts-b" min="12" max="24" value="${st.b}"></div>
    <div class="field" style="flex:1;min-width:200px"><label for="ts-r">Ratio</label><select id="ts-r">${R.map(([v, l]) => `<option value="${v}" ${v === st.r ? "selected" : ""}>${l}</option>`).join("")}</select></div></div>
    <div id="ts-scale" class="panel" style="display:grid;gap:6px;overflow:hidden"></div>
    <div class="field" style="margin-top:18px"><label for="ts-w">Column width <span id="ts-cpl"></span></label><input type="range" id="ts-w" min="200" max="1000" value="${st.w}"></div>
    <div style="overflow:hidden"><p id="ts-p" style="font:17px/1.35 var(--f-body);border-left:2px solid var(--red);border-right:2px solid var(--red);padding:0 12px;margin-top:8px">${sample}</p></div>`;
  const cv = document.createElement("canvas").getContext("2d");
  const upd = () => { const b = +$("#ts-b", el).value || 16, r = +$("#ts-r", el).value, w = +$("#ts-w", el).value;
    const names = ["Display", "H1", "H2", "H3", "Body", "Caption"], steps = [4, 3, 2, 1, 0, -1];
    $("#ts-scale", el).innerHTML = steps.map((s, i) => { const px = b * Math.pow(r, s); return `<div style="display:grid;grid-template-columns:110px minmax(0,1fr);gap:12px;align-items:baseline"><span class="mono" style="color:var(--red)">${names[i]} ${px.toFixed(px < 100 ? 1 : 0)}</span><span style="font-family:var(--f-display);font-size:${Math.min(px, 64)}px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Weekly plan</span></div>`; }).join("");
    const p = $("#ts-p", el), maxW = p.parentElement.clientWidth || w; p.style.width = Math.min(w, maxW) + "px";
    cv.font = getComputedStyle(p).font; const cw = cv.measureText(sample).width / sample.length, cpl = Math.round((Math.min(w, maxW) - 28) / cw);
    $("#ts-cpl", el).innerHTML = `<span class="pill ${cpl < 45 || cpl > 90 ? "bad" : "ok"}">≈ ${cpl} characters per line</span>`;
    ctx.set({b, r, w}); };
  el.addEventListener("input", upd); el.addEventListener("change", upd); requestAnimationFrame(upd);
};

/* 17 ─ Contrast checker */
LABS.contrast = (el, ctx) => {
  const st = ctx.get() || {fg: "#5F6576", bg: "#FFFFFF"};
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:12px">
    ${[["fg", "Text color"], ["bg", "Background"]].map(([k, l]) => `<div class="field"><label for="cc-${k}t">${l}</label><div class="row" style="flex-wrap:nowrap"><input type="color" id="cc-${k}" value="${st[k]}" aria-label="${l} picker"><input type="text" id="cc-${k}t" value="${st[k]}" maxlength="7" spellcheck="false"></div></div>`).join("")}
    <button class="btn sm" type="button" id="cc-sw">Swap colors</button>
    <div class="panel" style="text-align:center"><div class="lbl">Contrast ratio</div><div class="result" id="cc-r" style="margin-top:6px"></div><p class="muted" style="font-size:12.5px;margin-top:6px">Truncated, never rounded up.</p></div></div>
    <div style="display:grid;gap:12px"><div id="cc-prev" style="border-radius:10px;padding:18px;display:grid;gap:10px;border:1px solid var(--line)">
      <span style="font-size:16px">Normal text: plan this week's dinners</span><span style="font-size:24px;font-weight:700">Large text 24px</span><span id="cc-ui" style="justify-self:start;padding:8px 14px;border-radius:6px;border:2px solid">UI component border</span></div>
      <div id="cc-res" class="cards"></div></div></div>`;
  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ok = h => /^#[0-9a-f]{6}$/i.test(h);
  const upd = src => {
    ["fg", "bg"].forEach(k => { const c = $("#cc-" + k, el), t = $("#cc-" + k + "t", el); if (src === t && ok(t.value)) c.value = t.value; else if (src === c) t.value = c.value; });
    const f = $("#cc-fg", el).value, b = $("#cc-bg", el).value, L1 = lum(f), L2 = lum(b), r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05), rt = Math.floor(r * 100) / 100;
    $("#cc-r", el).textContent = rt.toFixed(2) + ":1";
    Object.assign($("#cc-prev", el).style, {color: f, background: b}); $("#cc-ui", el).style.borderColor = f;
    const C = [["SC 1.4.3 AA · normal text", 4.5], ["SC 1.4.3 AA · large text", 3], ["SC 1.4.6 AAA · normal text", 7], ["SC 1.4.6 AAA · large text", 4.5], ["SC 1.4.11 AA · UI components", 3]];
    $("#cc-res", el).innerHTML = C.map(([n, m]) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--paper)"><span style="font-size:14px;min-width:0">${n} <span class="muted mono" style="white-space:nowrap">≥ ${m}:1</span></span><span class="pill ${r >= m ? "ok" : "bad"}" style="flex:none">${r >= m ? "Pass" : "Fail"}</span></div>`).join("");
    ctx.set({fg: f, bg: b});
  };
  el.addEventListener("input", e => upd(e.target));
  $("#cc-sw", el).onclick = () => { const f = $("#cc-fg", el).value; $("#cc-fg", el).value = $("#cc-bg", el).value; $("#cc-bg", el).value = f; ["fg", "bg"].forEach(k => $("#cc-" + k + "t", el).value = $("#cc-" + k, el).value); upd(); };
  upd();
};

/* 18 ─ 8-point spacing playground */
LABS.spacing = (el, ctx) => {
  const st = ctx.get() || {p: 24, g: 12, s: false};
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:14px">
    <div class="field"><label for="sp-p">Card padding <span id="sp-po"></span></label><input type="range" id="sp-p" min="0" max="48" value="${st.p}"></div>
    <div class="field"><label for="sp-g">Gap between items <span id="sp-go"></span></label><input type="range" id="sp-g" min="0" max="48" value="${st.g}"></div>
    <label class="check"><input type="checkbox" id="sp-s" ${st.s ? "checked" : ""}> Snap to the 8-point grid</label>
    <div id="sp-msg" style="font-size:14.5px;line-height:1.5"></div></div>
    <div class="panel" style="display:grid;place-items:center;background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/8px 8px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/8px 8px,var(--paper)">
    <div id="sp-card" style="position:relative;width:100%;max-width:280px;background:var(--surface);border:1px solid var(--line-2);border-radius:10px;display:flex;flex-direction:column">
      <div style="aspect-ratio:16/9;border-radius:6px;background:repeating-linear-gradient(135deg,var(--sunken) 0 8px,var(--surface) 8px 16px)"></div>
      <b style="font-family:var(--f-display);font-size:18px">Lemon chickpea pasta</b><span class="muted" style="font-size:13px">25 min · Serves 4</span>
      <span style="background:var(--red);color:#fff;border-radius:6px;padding:10px;text-align:center;font-weight:600;font-size:14px">Add to plan</span>
      <span id="sp-tp" class="spec-tag" style="position:absolute;top:0;left:50%;transform:translate(-50%,-50%)"></span>
      <span id="sp-tg" class="spec-tag" style="position:absolute;right:6px;top:50%;transform:translateY(-50%)"></span></div></div></div>`;
  const upd = () => { let p = +$("#sp-p", el).value, g = +$("#sp-g", el).value; const s = $("#sp-s", el).checked;
    if (s) { p = Math.round(p / 8) * 8; g = Math.round(g / 8) * 8; $("#sp-p", el).value = p; $("#sp-g", el).value = g; }
    $("#sp-p", el).step = $("#sp-g", el).step = s ? 8 : 1;
    const c = $("#sp-card", el); c.style.padding = p + "px"; c.style.gap = g + "px";
    const tag = v => v % 8 === 0 ? "ok" : v % 4 === 0 ? "warn" : "bad";
    [["po", p], ["go", g]].forEach(([id, v]) => $("#sp-" + id, el).innerHTML = `<span class="pill ${tag(v)}">${v}px</span>`);
    $("#sp-tp", el).textContent = "padding " + p; $("#sp-tg", el).textContent = "gap " + g;
    [$("#sp-tp", el), $("#sp-tg", el)].forEach((t, i) => t.style.background = tag(i ? g : p) === "ok" ? "var(--red)" : "var(--bad)");
    const off = [p, g].filter(v => v % 8 && v % 4);
    $("#sp-msg", el).innerHTML = off.length ? `<span class="pill bad">Off grid</span> ${off.join(" and ")} px aren't multiples of 8 (or the 4 px half-step). A spec reviewer would flag them.` : `<span class="pill ok">On grid</span> Values are on the 8-point scale${[p, g].some(v => v % 8) ? " (4 px half-steps are fine for tight spots)" : ""}.`;
    ctx.set({p, g, s}); };
  el.addEventListener("input", upd); upd();
};

/* 19 ─ Tokens */
LABS.tokens = (el, ctx) => {
  const st = ctx.get() || {a: "#D2125A", r: "8", d: "regular"};
  const D = {compact: [4, 8, 12], regular: [8, 12, 16], comfy: [12, 16, 24]};
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:14px">
    <div class="field"><label for="tk-a">color.action.primary</label><input type="color" id="tk-a" value="${st.a}"></div>
    <div class="field"><label for="tk-r">radius.control</label><select id="tk-r">${[["0","0 · sharp"],["4","4 · subtle"],["8","8 · soft"],["16","16 · round"],["999","999 · pill"]].map(([v, l]) => `<option value="${v}" ${v === st.r ? "selected" : ""}>${l}</option>`).join("")}</select></div>
    <div class="field"><span class="lbl">space.density</span><div class="seg" role="group" aria-label="Density">${Object.keys(D).map(k => `<button type="button" data-d="${k}" aria-pressed="${k === st.d}">${k}</button>`).join("")}</div></div>
    <div class="tbl"><table style="min-width:0;table-layout:fixed"><thead><tr><th>Component token</th><th>Semantic token</th></tr></thead><tbody id="tk-map"></tbody></table></div></div>
    <div class="panel" id="tk-prev" style="display:grid;gap:var(--s2);align-content:start">
      <b style="font-family:var(--f-display);font-size:18px">Plan this week</b>
      <input type="text" value="Search recipes" aria-label="Preview input" style="border-radius:var(--rad);height:auto;padding:var(--s1) var(--s2)">
      <div style="display:flex;gap:var(--s1);flex-wrap:wrap"><span style="background:var(--act);color:#fff;border-radius:var(--rad);padding:var(--s1) var(--s3);font-weight:600">Save plan</span><span style="border:1.5px solid var(--act);color:var(--act);border-radius:var(--rad);padding:var(--s1) var(--s3);font-weight:600">Share</span></div>
      <div style="border:1px solid var(--line);border-radius:var(--rad);padding:var(--s2);display:grid;gap:var(--s1)"><span style="justify-self:start;background:color-mix(in srgb,var(--act) 14%,transparent);color:var(--act);border-radius:var(--rad);padding:2px var(--s1);font-size:12px;font-weight:600">Vegetarian</span><b>Lemon chickpea pasta</b><span class="muted" style="font-size:13px">25 min</span></div></div></div>`;
  const upd = () => { const a = $("#tk-a", el).value, r = $("#tk-r", el).value, d = ($("[data-d][aria-pressed=true]", el) || {}).dataset?.d || st.d, s = D[d];
    const P = $("#tk-prev", el); P.style.setProperty("--act", a); P.style.setProperty("--rad", r + "px"); s.forEach((v, i) => P.style.setProperty("--s" + (i + 1), v + "px"));
    $("#tk-map", el).innerHTML = [["button.background", "color.action.primary"], ["button.radius", "radius.control"], ["chip.text", "color.action.primary"], ["card.padding", "space.density"]].map(([c, s]) => `<tr><td><code>${c}</code></td><td><code>${s}</code></td></tr>`).join("");
    ctx.set({a, r, d}); };
  el.addEventListener("input", upd); el.addEventListener("change", upd);
  el.addEventListener("click", e => { const b = e.target.closest("[data-d]"); if (!b) return; $$("[data-d]", el).forEach(x => x.setAttribute("aria-pressed", String(x === b))); upd(); });
  upd();
};

/* 20 ─ Auto layout playground */
LABS.autolayout = (el, ctx) => {
  const st = ctx.get() || {dir: "column", gap: 16, pad: 24, align: "stretch", parent: "hug", child: "fill"};
  const seg = (k, opts) => `<div class="seg" role="group" aria-label="${k}">${opts.map(([v, l]) => `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${st[k] === v}">${l}</button>`).join("")}</div>`;
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:12px">
    <div class="field"><span class="lbl">Direction</span>${seg("dir", [["column", "Vertical ↓"], ["row", "Horizontal →"]])}</div>
    <div class="field"><label for="al-gap">Gap <span id="al-go" class="mono"></span></label><input type="range" id="al-gap" min="0" max="48" step="4" value="${st.gap}"></div>
    <div class="field"><label for="al-pad">Padding <span id="al-po" class="mono"></span></label><input type="range" id="al-pad" min="0" max="48" step="4" value="${st.pad}"></div>
    <div class="field"><span class="lbl">Align children</span>${seg("align", [["flex-start", "Start"], ["center", "Center"], ["stretch", "Stretch"]])}</div>
    <div class="field"><span class="lbl">Frame width</span>${seg("parent", [["hug", "Hug"], ["fixed", "Fixed 320"], ["fill", "Fill"]])}</div>
    <div class="field"><span class="lbl">Button sizing</span>${seg("child", [["hug", "Hug"], ["fill", "Fill"], ["fixed", "Fixed 120"]])}</div></div>
    <div style="display:grid;gap:12px;min-width:0"><div class="panel" style="overflow:auto;background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/8px 8px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/8px 8px,var(--paper)">
      <div id="al-f" style="display:flex;background:var(--surface);border:1.5px dashed var(--red);border-radius:8px;outline:var(--pad) solid var(--red-soft);outline-offset:calc(-1 * var(--pad))">
        <div style="background:var(--sunken);border-radius:6px;padding:10px;font-size:13px">Image</div><div style="font-weight:600">Lemon chickpea pasta</div>
        <div id="al-c" style="background:var(--red);color:#fff;border-radius:6px;padding:10px 14px;font-weight:600;font-size:14px;text-align:center">Add to plan</div></div></div>
      <pre id="al-css" class="panel" style="margin:0;font:12.5px/1.6 var(--f-mono);white-space:pre;overflow:auto"></pre></div></div>`;
  const upd = () => { st.gap = +$("#al-gap", el).value; st.pad = +$("#al-pad", el).value;
    const F = $("#al-f", el), C = $("#al-c", el);
    Object.assign(F.style, {flexDirection: st.dir, gap: st.gap + "px", padding: st.pad + "px", alignItems: st.align, width: st.parent === "hug" ? "fit-content" : st.parent === "fixed" ? "320px" : "100%"}); F.style.setProperty("--pad", Math.max(st.pad, 0) + "px");
    const main = st.dir === "row";
    Object.assign(C.style, {flex: st.child === "fill" && main ? "1" : "none", width: st.child === "fixed" ? "120px" : "auto", alignSelf: st.child === "fill" && !main ? "stretch" : "auto"});
    $("#al-go", el).textContent = st.gap + "px"; $("#al-po", el).textContent = st.pad + "px";
    $("#al-css", el).textContent = `.frame {\n  display: flex;\n  flex-direction: ${st.dir};   /* ${main ? "Horizontal" : "Vertical"} */\n  gap: ${st.gap}px;              /* Gap */\n  padding: ${st.pad}px;          /* Padding */\n  align-items: ${st.align};\n  width: ${F.style.width};${st.parent === "hug" ? "  /* Hug contents */" : st.parent === "fill" ? "      /* Fill container */" : ""}\n}\n.button {\n  ${st.child === "fill" ? (main ? "flex: 1;              /* Fill container */" : "align-self: stretch;   /* Fill container */") : st.child === "fixed" ? "width: 120px;          /* Fixed */" : "width: auto;           /* Hug contents */"}\n}`;
    ctx.set(st); };
  el.addEventListener("input", upd);
  el.addEventListener("click", e => { const b = e.target.closest("[data-k]"); if (!b) return; st[b.dataset.k] = b.dataset.v; $$(`[data-k="${b.dataset.k}"]`, el).forEach(x => x.setAttribute("aria-pressed", String(x === b))); upd(); });
  upd();
};

/* 21 ─ Handoff readiness */
LABS.handoff = (el, ctx) => {
  const I = [["Layers and components have clear names", "What is 'Frame 427'?"], ["Colors and spacing use variables, not one-off values", "Is this #D2125A or a new brand color?"], ["Every state is shown (empty, loading, error…)", "What happens when the list is empty?"],
    ["Interactions and animations are annotated", "What happens when I tap this card?"], ["Truncation and max lengths are specified", "What if the title is 80 characters?"], ["Responsive behavior shown at key breakpoints", "How does this look on a tablet?"],
    ["Frames are marked Ready for dev", "Which version is final?"], ["Accessibility notes: focus order, labels, alt text", "What should the screen reader say here?"]];
  const st = ctx.get() || [];
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:4px">${I.map(([t], i) => `<label class="check multi" style="font-weight:500"><input type="checkbox" data-i="${i}" ${st.includes(i) ? "checked" : ""}><span>${t}</span></label>`).join("")}</div>
    <div class="panel" style="display:grid;gap:12px"><div class="lbl">Readiness</div><div class="result" id="ho-p"></div><div class="bar"><i id="ho-b" style="width:0"></i></div><div class="lbl">Questions you'll get in Slack</div><ul id="ho-q" style="margin:0;padding-left:1.1em;display:grid;gap:4px;font-size:14.5px"></ul></div></div>`;
  const upd = () => { const on = $$("input[data-i]", el).filter(x => x.checked).map(x => +x.dataset.i), p = Math.round(on.length / I.length * 100);
    $("#ho-p", el).textContent = p + "%"; $("#ho-b", el).style.width = p + "%"; $("#ho-b", el).style.background = p === 100 ? "var(--ok)" : p >= 60 ? "var(--warn)" : "var(--bad)";
    $("#ho-q", el).innerHTML = I.filter((_, i) => !on.includes(i)).map(x => `<li>“${x[1]}”</li>`).join("") || "<li>None. Your file answers them. Schedule a design QA pass.</li>"; ctx.set(on); };
  el.addEventListener("change", upd); upd();
};

/* 22 ─ Fidelity picker */
LABS.fidelity = (el) => {
  const Q = [["Does the overall flow make sense?", ["Low · human 'computer'", "Low · sketchy", "Medium · real labels"], "Flow questions need speed and easy changes between sessions. Paper or a rough clickable is enough."],
    ["Can people find the filter in our mega menu?", ["High · clickable", "Medium", "High · real categories"], "NN/g lists mega menus and complex widgets as things that need high-fidelity interaction to test properly."],
    ["Is the text readable and do buttons look tappable?", ["Medium", "High · polished", "High · real copy"], "Legibility and affordance depend on visual detail."],
    ["Will people trust an AI meal suggester?", ["Wizard of Oz", "Medium", "High · realistic suggestions"], "A person can play the AI behind the scenes, so you can test before building it."],
    ["Do stakeholders agree on the direction?", ["Low", "Low · clearly unfinished", "Medium"], "Low fidelity signals the work is still open, inviting feedback on direction instead of pixels."]];
  el.innerHTML = `<div class="field" style="margin-bottom:14px"><label for="fd-q">What do you need to learn?</label><select id="fd-q">${Q.map((q, i) => `<option value="${i}">${q[0]}</option>`).join("")}</select></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px" id="fd-d"></div><p id="fd-w" style="margin-top:12px;font-size:15.5px;line-height:1.55"></p>`;
  const upd = () => { const q = Q[+$("#fd-q", el).value];
    $("#fd-d", el).innerHTML = ["Interactivity", "Visuals", "Content"].map((n, i) => `<div class="panel"><div class="lbl">${n}</div><b style="display:block;margin-top:6px;font-family:var(--f-display);font-size:18px">${q[1][i]}</b></div>`).join("");
    $("#fd-w", el).innerHTML = `<b>Why:</b> ${q[2]}`; };
  el.addEventListener("change", upd); upd();
};

/* 23 ─ Five-user curve */
LABS.curve = (el, ctx) => {
  const st = ctx.get() || {n: 5, L: 31};
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:14px">
    <div class="field"><label for="cv-n">Test users (n) <b id="cv-no"></b></label><input type="range" id="cv-n" min="1" max="20" value="${st.n}"></div>
    <div class="field"><label for="cv-l">Problems one user finds (L) <b id="cv-lo"></b></label><input type="range" id="cv-l" min="5" max="60" value="${st.L}"></div>
    <div class="panel" style="text-align:center"><div class="lbl">Problems found</div><div class="result" id="cv-r" style="margin-top:6px"></div><p class="mono muted" id="cv-f" style="font-size:12px;margin-top:6px"></p></div></div>
    <svg id="cv-s" viewBox="0 0 320 220" width="100%" role="img" aria-label="Curve of problems found against number of users"></svg></div>`;
  const upd = () => { const n = +$("#cv-n", el).value, L = +$("#cv-l", el).value / 100, f = k => 1 - Math.pow(1 - L, k);
    $("#cv-no", el).textContent = n; $("#cv-lo", el).textContent = Math.round(L * 100) + "%";
    $("#cv-r", el).textContent = Math.round(f(n) * 100) + "%"; $("#cv-f", el).textContent = `1 − (1 − ${L.toFixed(2)})^${n} = ${f(n).toFixed(3)}`;
    const X = k => 36 + k / 20 * 270, Y = p => 190 - p * 170;
    $("#cv-s", el).innerHTML = `${[0, .25, .5, .75, 1].map(p => `<line x1="36" x2="306" y1="${Y(p)}" y2="${Y(p)}" stroke="var(--line)"/><text x="30" y="${Y(p) + 3}" font-size="9" text-anchor="end" fill="var(--muted)">${p * 100}%</text>`).join("")}
      ${[0, 5, 10, 15, 20].map(k => `<text x="${X(k)}" y="206" font-size="9" text-anchor="middle" fill="var(--muted)">${k}</text>`).join("")}<text x="171" y="218" font-size="9" text-anchor="middle" fill="var(--muted)">Test users</text>
      <path d="${Array.from({length: 21}, (_, k) => (k ? "L" : "M") + X(k) + " " + Y(f(k))).join(" ")}" fill="none" stroke="var(--red)" stroke-width="2.5"/>
      <line x1="${X(n)}" x2="${X(n)}" y1="${Y(0)}" y2="${Y(f(n))}" stroke="var(--red)" stroke-dasharray="3 3"/><circle cx="${X(n)}" cy="${Y(f(n))}" r="6" fill="var(--red)"/>`;
    ctx.set({n, L: L * 100}); };
  el.addEventListener("input", upd); upd();
};

/* 24 ─ Touch targets */
LABS.targets = (el, ctx) => {
  const st = ctx.get() || {s: 32, g: 4};
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:14px">
    <div class="field"><label for="tg-s">Target size <b id="tg-so"></b></label><input type="range" id="tg-s" min="12" max="64" value="${st.s}"></div>
    <div class="field"><label for="tg-g">Gap between targets <b id="tg-go"></b></label><input type="range" id="tg-g" min="0" max="32" value="${st.g}"></div>
    <div class="panel" style="display:grid;place-items:center;min-height:120px"><div id="tg-row" style="display:flex">${["−", "1", "+"].map(x => `<span style="display:grid;place-items:center;border-radius:8px;background:var(--red);color:#fff;font-weight:700">${x}</span>`).join("")}</div></div>
    <p class="muted" style="font-size:12.5px">Shown at CSS pixel size. Apple uses points (pt) and Android density-independent pixels (dp); at 1× they match CSS px.</p></div>
    <div id="tg-res" class="cards"></div></div>`;
  const upd = () => { const s = +$("#tg-s", el).value, g = +$("#tg-g", el).value;
    $("#tg-so", el).textContent = s + "px"; $("#tg-go", el).textContent = g + "px";
    const R = $("#tg-row", el); R.style.gap = g + "px"; $$("span", R).forEach(x => { x.style.width = x.style.height = s + "px"; x.style.fontSize = Math.max(10, s * .4) + "px"; });
    const spacingOK = s >= 24 || (s / 2 + g >= 12 && s + g >= 24);
    const C = [["WCAG 2.5.8 Target Size (Minimum) · AA", s >= 24 ? "pass" : spacingOK ? "spacing" : "fail", s >= 24 ? "At least 24 × 24 px." : spacingOK ? "Passes by the spacing exception: 24 px circles don't overlap." : "Under 24 px and too close together."],
      ["WCAG 2.5.5 Target Size (Enhanced) · AAA", s >= 44 ? "pass" : "fail", "Needs 44 × 44 px."], ["Apple HIG · iOS default control size", s >= 44 ? "pass" : s >= 28 ? "min" : "fail", s >= 44 ? "Meets the 44 × 44 pt default." : s >= 28 ? "Above the 28 × 28 pt minimum, below the 44 pt default." : "Below Apple's 28 × 28 pt minimum."],
      ["Android · minimum touch target", s >= 48 ? "pass" : "fail", "Needs at least 48 × 48 dp; larger is better."]];
    $("#tg-res", el).innerHTML = C.map(([n, r, w]) => `<div class="qcard" style="gap:6px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><b style="font-size:14.5px;min-width:0">${n}</b><span class="pill ${r === "pass" ? "ok" : r === "fail" ? "bad" : "warn"}" style="flex:none">${r === "pass" ? "Pass" : r === "fail" ? "Fail" : r === "spacing" ? "Pass (spacing)" : "Minimum only"}</span></div><span class="fb">${w}</span></div>`).join("");
    ctx.set({s, g}); };
  el.addEventListener("input", upd); upd();
};

/* 25 ─ Feedback reframing */
LABS.feedback = (el) => {
  const F = [["“Make it pop.”", ["Make it bigger and brighter.", "The goal is to get people to save a plan. Is the Save button standing out enough against the other actions?", "I'd use our brand gradient here."], 1],
    ["“I don't like the filters.”", ["What led you to put the filters behind a menu? Our objective was finding recipes quickly.", "Filters are bad UX.", "Remove the filters."], 0],
    ["“This is confusing.”", ["Start over.", "Users won't get it.", "I wasn't sure what 'Sync' does here. If the goal is sharing with family, could the label say that?"], 2]];
  el.innerHTML = `<div class="cards">${F.map(([c, o, a], i) => `<div class="qcard" data-i="${i}"><div class="text">${c}</div><div class="opts">${o.map((x, j) => `<button type="button" class="opt" data-j="${j}"><span class="k">${"ABC"[j]}</span><span>${x}</span></button>`).join("")}</div><div class="fb" hidden></div></div>`).join("")}</div>`;
  el.addEventListener("click", e => { const b = e.target.closest(".opt"); if (!b) return; const card = b.closest(".qcard"), [,, a] = F[+card.dataset.i], j = +b.dataset.j;
    $$(".opt", card).forEach((x, k) => { x.disabled = true; if (k === a) x.classList.add("right"); else if (k === j) x.classList.add("wrong"); });
    const fb = $(".fb", card); fb.hidden = false; fb.innerHTML = j === a ? `<span class="pill ok">Yes</span> It ties the comment to an objective and opens a conversation.` : `<span class="pill bad">Not quite</span> NN/g advises reframing opinions as goal-based questions.`; });
};

/* 26 ─ Case study summary */
LABS.casestudy = (el, ctx) => {
  const st = ctx.get() || {t: "Plan dinner in a minute", p: "Busy parents waste food and order takeout because deciding dinner is hard.", r: "Product designer: research, interaction and visual design", tl: "Solo project · 6 weeks", o: "Task time fell from about 4 minutes to under 1 in testing with 5 people."};
  const F = [["t", "Project title"], ["p", "Problem (one sentence)"], ["r", "Your role"], ["tl", "Team and timeline"], ["o", "Outcome (evidence)"]];
  el.innerHTML = `<div class="lab-grid"><div style="display:grid;gap:10px">${F.map(([k, l]) => `<div class="field"><label for="cs-${k}">${l}</label><input type="text" id="cs-${k}" value="${esc(st[k])}"></div>`).join("")}<p class="muted" style="font-size:13px">The example outcome is placeholder text. Use your own measured results.</p></div>
    <div class="panel" style="display:grid;gap:12px;background:var(--surface);border-color:var(--line-2)"><span class="eyebrow">Case study</span><h3 id="cs-ot" style="font-size:26px"></h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,140px),1fr));gap:12px;font-size:14px">${[["p", "Problem"], ["r", "Role"], ["tl", "Team & timeline"], ["o", "Outcome"]].map(([k, l]) => `<div><div class="lbl">${l}</div><p id="cs-o${k}" style="margin-top:4px;line-height:1.45"></p></div>`).join("")}</div></div></div>`;
  const upd = () => { const v = {}; F.forEach(([k]) => v[k] = $("#cs-" + k, el).value); $("#cs-ot", el).textContent = v.t || "Untitled"; ["p", "r", "tl", "o"].forEach(k => $("#cs-o" + k, el).textContent = v[k] || "—"); ctx.set(v); };
  el.addEventListener("input", upd); upd();
};

/* 27 ─ Capstone planner */
LABS.planner = (el, ctx) => {
  const M = [["Research: plan, 5 interviews, affinity map", 10], ["Define: problem, HMWs, HEART metric", 4], ["Structure: card sort or tree test, sitemap, flow", 6], ["Design: wireframes → hi-fi with a mini design system", 14], ["Test: prototype, 5-person think-aloud, revise", 8], ["Accessibility audit", 3], ["Case study write-up", 6]];
  const today = new Date().toISOString().slice(0, 10), st = ctx.get() || {d: today, h: 8};
  el.innerHTML = `<div class="row" style="margin-bottom:16px;align-items:flex-end"><div class="field" style="width:180px"><label for="pl-d">Start date</label><input type="date" id="pl-d" value="${st.d}"></div>
    <div class="field" style="width:180px"><label for="pl-h">Hours per week</label><select id="pl-h">${[4, 6, 8, 10, 12, 15].map(h => `<option ${h === +st.h ? "selected" : ""}>${h}</option>`).join("")}</select></div><div class="panel" style="padding:0 14px;height:44px;display:flex;flex-direction:column;justify-content:center;gap:2px"><div class="lbl" style="font-size:10px">Finish</div><b id="pl-end" class="mono" style="font-size:16px"></b></div></div>
    <ol id="pl-l" style="list-style:none;margin:0;padding:0;display:grid;gap:8px"></ol>`;
  const fmt = d => d.toLocaleDateString(undefined, {month: "short", day: "numeric"});
  const upd = () => { const d0 = new Date($("#pl-d", el).value + "T00:00"), h = +$("#pl-h", el).value; if (isNaN(d0)) return; let acc = 0;
    const total = M.reduce((a, m) => a + m[1], 0);
    $("#pl-l", el).innerHTML = M.map(([n, hrs], i) => { const s = new Date(d0.getTime() + acc / h * 7 * 864e5); acc += hrs; const e = new Date(d0.getTime() + acc / h * 7 * 864e5);
      return `<li style="display:grid;grid-template-columns:24px minmax(0,1fr) 112px;gap:12px;align-items:center;padding:10px 14px;border:1px solid var(--line);border-radius:8px;background:var(--paper)"><span class="mono" style="color:var(--red)">${i + 1}</span><span>${n}<div class="bar" style="margin-top:6px;height:6px"><i style="width:${hrs / 14 * 100}%;background:var(--red)"></i></div></span><span class="mono muted" style="font-size:12px;text-align:right">${fmt(s)} – ${fmt(e)}<br>${hrs} h</span></li>`; }).join("");
    $("#pl-end", el).textContent = fmt(new Date(d0.getTime() + total / h * 7 * 864e5)) + ` · ${total} h`; ctx.set({d: $("#pl-d", el).value, h}); };
  el.addEventListener("input", upd); el.addEventListener("change", upd); upd();
};

window.LABS = LABS;
})();
