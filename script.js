// ===== Edit your content here =====
const skillGroups = {
  "Front-end technologies": ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
  "Framework": ["React.js"],
  "Database": ["SQL", "SQLite"]
};
const GITHUB = "https://github.com/pranathikonduri";
// Add a `live` URL to a project to show a "Live demo" button; add `github` for its own repo link.
const projects = [
  {name:"Weather Dashboard",desc:"Weather app with city search showing temperature, humidity and wind speed. Includes login, logout, protected pages and favourite cities, with error handling and a responsive UI.",tags:["React.js","Authentication","Protected routes"],github:GITHUB},
  {name:"Nxt Assess: Online Assessment Platform",desc:"Responsive assessment app with authentication, protected routing and REST API integration. Features question navigation, multiple question types, a countdown timer, answer tracking and score calculation.",tags:["React.js","REST APIs","Authentication"],github:GITHUB}
];
const CONTACT_EMAIL = "pranathikonduri99@gmail.com";
// ==================================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$("#skillGroups").innerHTML = Object.entries(skillGroups).map(([g, l]) =>
  `<div class="group"><h3>${g}</h3><ul class="chips">${l.map(s => `<li>${s}</li>`).join("")}</ul></div>`).join("");

$("#projectGrid").innerHTML = projects.map(p => `
  <article class="card">
    <h4>${p.name}</h4><p>${p.desc}</p>
    <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
    <div class="row">
      ${p.github ? `<a class="btn small ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
      ${p.live ? `<a class="btn small" href="${p.live}" target="_blank" rel="noopener">Live demo</a>` : ""}
    </div>
  </article>`).join("");

// Mobile menu
const menuBtn = $("#menuBtn"), links = $("#links");
const setMenu = o => { links.classList.toggle("open", o); menuBtn.setAttribute("aria-expanded", String(o)); };
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
$$("#links a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

// Theme (remembered when storage is available)
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch { root.dataset.theme = "light"; }
$("#themeBtn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Active nav link + back to top
const navLinks = $$('#links a[href^="#"]');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach(s => spy.observe(s));
const topBtn = $("#topBtn");
addEventListener("scroll", () => topBtn.hidden = scrollY < 600, { passive: true });
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// Contact form: validates, then opens the visitor's email app with the message filled in.
const form = $("#form"), status = $("#status");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  let bad = false;
  ["name", "email", "message"].forEach(k => {
    const ok = k === "email" ? /^\S+@\S+\.\S+$/.test(d[k]) : d[k].trim();
    form[k].classList.toggle("err", !ok); bad ||= !ok;
  });
  if (bad) { status.textContent = "Fill in your name, a valid email and a message."; return; }
  const body = `${d.message}\n\nFrom: ${d.name} (${d.email})`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio message from " + d.name)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Opening your email app. Send the draft to finish.";
  form.reset();
});
