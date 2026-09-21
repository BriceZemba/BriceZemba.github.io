// Static site generator. Run: node src/build.js
// Writes the finished site into the repository root (one level above src/).

const fs = require("fs");
const path = require("path");
const C = require("./content.js");

const ROOT = path.resolve(__dirname, "..");
const LANGS = ["en", "fr"];
const PHOTO_EXTS = ["jpg", "jpeg", "png", "webp", "avif"];
const PROBE_EXTS = ["jpg", "png", "webp"];
const PHOTO = PHOTO_EXTS.map((e) => "assets/profile." + e).find((r) => fs.existsSync(path.join(ROOT, r)));
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const tr = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && "en" in v ? v[lang] : v);

function fmtDate(iso, lang) {
  const [y, m, d] = iso.split("-");
  if (!m) return y;
  const mon = MONTHS[lang][parseInt(m, 10) - 1];
  return d ? `${parseInt(d, 10)} ${mon} ${y}` : `${mon} ${y}`;
}

function ext(url, label) {
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

// Path of a page for a language. key: "" | "projects" | "blog" | "teaching-talks" | "cv"
const urlFor = (lang, key) => (lang === "en" ? "/" : "/fr/") + (key ? key + "/" : "");

// ---------- Command palette data ----------

function paletteData(lang, key) {
  const P = C.palette;
  const other = lang === "en" ? "fr" : "en";
  const items = [];
  const add = (group, label, url, kw, external) => {
    const it = { g: tr(P.groups[group], lang), l: label, u: url, k: kw || "" };
    if (external) it.x = 1;
    items.push(it);
  };
  add("page", lang === "en" ? "Home" : "Accueil", urlFor(lang, ""));
  add("page", tr(C.ui.nav.work, lang), urlFor(lang, "projects"));
  add("page", tr(C.ui.nav.writing, lang), urlFor(lang, "blog"));
  add("page", tr(C.ui.nav.teaching, lang), urlFor(lang, "teaching-talks"));
  add("page", tr(C.ui.nav.cv, lang), urlFor(lang, "cv"), "resume curriculum");
  const sections = [
    ["news", C.ui.sections.news], ["about", C.ui.sections.about], ["map", C.map.title],
    ["education", C.ui.sections.education], ["experience", C.ui.sections.experience],
    ["work", C.ui.sections.work], ["negatives", C.negatives.title],
    ["awards", C.ui.sections.awards], ["posts", C.ui.sections.posts],
  ];
  for (const [id, label] of sections) add("section", tr(label, lang), urlFor(lang, "") + "#" + id);
  for (const p of C.allProjects) {
    add("project", tr(p.title, lang), urlFor(lang, "projects") + "#" + p.id, tr(p.short, lang) + " " + p.tags.map((t) => tr(t, lang)).join(" "));
  }
  const L = C.person.links;
  add("link", "GitHub", L.github, "code repositories", true);
  add("link", "LinkedIn", L.linkedin, "", true);
  add("link", "Google Scholar", L.scholar, "publications citations", true);
  add("link", "Medium", L.medium, "articles blog", true);
  add("link", tr(C.ui.email, lang), "mailto:" + C.person.email, "contact mail");
  items.push({ g: tr(P.groups.action, lang), l: tr(P.actionTheme, lang), a: "theme", k: "dark light theme mode sombre clair" });
  items.push({ g: tr(P.groups.action, lang), l: tr(P.actionLang, lang), u: urlFor(other, key), k: "language langue francais english" });
  return JSON.stringify(items).replace(/</g, "\\u003c");
}

// ---------- Shared layout ----------

function layout({ lang, key, title, desc, body, jsonLd }) {
  const other = lang === "en" ? "fr" : "en";
  const canonical = C.ORIGIN + urlFor(lang, key);
  const navItems = [
    ["about", urlFor(lang, "") + "#about", key === ""],
    ["work", urlFor(lang, "projects"), key === "projects"],
    ["writing", urlFor(lang, "blog"), key === "blog"],
    ["teaching", urlFor(lang, "teaching-talks"), key === "teaching-talks"],
    ["cv", urlFor(lang, "cv"), key === "cv"],
  ];
  const nav = navItems
    .map(([k, href, active]) => {
      const cur = active && k !== "about" ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${cur}>${esc(tr(C.ui.nav[k], lang))}</a></li>`;
    })
    .join("");
  const searchLabel = tr(C.palette.open, lang);
  const searchIcon =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="${lang}" href="${canonical}">
<link rel="alternate" hreflang="${other}" href="${C.ORIGIN + urlFor(other, key)}">
<link rel="alternate" hreflang="x-default" href="${C.ORIGIN + urlFor("en", key)}">
<link rel="alternate" type="application/rss+xml" title="${esc(C.person.short)}" href="/feed.xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
${PHOTO ? `<meta property="og:image" content="${C.ORIGIN}/${PHOTO}">\n<meta name="twitter:card" content="summary">` : '<meta name="twitter:card" content="summary">'}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<script>try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<link rel="stylesheet" href="/assets/style.css">
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
</head>
<body>
<a class="skip" href="#main">${esc(tr(C.ui.skip, lang))}</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="${urlFor(lang, "")}">${esc(C.person.short)}</a>
    <nav aria-label="Main">
      <ul>${nav}</ul>
    </nav>
    <div class="tools">
      <button id="palette-open" class="lang" type="button" hidden aria-label="${esc(searchLabel)} (Ctrl+K)">${searchIcon}<span class="k">${esc(searchLabel)}</span></button>
      <a class="lang" href="${urlFor(other, key)}" hreflang="${other}" lang="${other}" aria-label="${esc(tr(C.ui.langSwitchLabel, lang))}">${esc(tr(C.ui.langSwitch, lang))}</a>
      <button id="theme-toggle" type="button" aria-pressed="false" aria-label="${esc(tr(C.ui.themeLabel, lang))}"><span aria-hidden="true">&#9680;</span></button>
    </div>
  </div>
</header>
<main id="main" class="wrap">
${body}
</main>
<footer class="site-footer">
  <div class="wrap foot">
    <span>&copy; 2026 ${esc(C.person.name)}</span>
    <span>${esc(tr(C.ui.footer, lang))}</span>
    <span>${esc(tr(C.extraUi.updated, lang))} ${BUILD_DATE} · <a href="/feed.xml">${esc(tr(C.ui.rss, lang))}</a></span>
  </div>
</footer>
<dialog id="palette" aria-label="${esc(tr(C.palette.label, lang))}" data-none="${esc(tr(C.palette.none, lang))}">
  <div class="pal-box">
    <input id="palette-input" type="text" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" placeholder="${esc(tr(C.palette.placeholder, lang))}" autocomplete="off" spellcheck="false">
    <ul id="palette-list" role="listbox"></ul>
    <p class="pal-hint">${esc(tr(C.palette.hint, lang))}</p>
  </div>
</dialog>
<script type="application/json" id="palette-data">${paletteData(lang, key)}</script>
<script src="/assets/main.js" defer></script>
</body>
</html>
`;
}

// ---------- Building blocks ----------

function socialPills(lang) {
  const L = C.person.links;
  const items = [
    [tr(C.ui.email, lang), "mailto:" + C.person.email, false],
    ["GitHub", L.github, true],
    ["LinkedIn", L.linkedin, true],
    ["Google Scholar", L.scholar, true],
    ["Medium", L.medium, true],
  ];
  return `<ul class="pills">${items
    .map(([label, url, isExt]) =>
      `<li><a class="pill" href="${esc(url)}"${isExt ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}</a></li>`)
    .join("")}</ul>`;
}

function chips(tags, lang) {
  return `<ul class="chips">${tags.map((t) => `<li>${esc(tr(t, lang))}</li>`).join("")}</ul>`;
}

function projectCard(p, lang) {
  const links = p.links.length
    ? `<p class="links">${p.links.map((l) => ext(l.url, tr(l.label, lang))).join('<span aria-hidden="true"> · </span>')}</p>`
    : "";
  const date = lang === "fr" && p.dateFr ? p.dateFr : p.date;
  return `<article class="card" id="${p.id}" data-themes="${p.themes.join(" ")}">
  ${chips(p.tags, lang)}
  <h3>${esc(tr(p.title, lang))}</h3>
  <p>${esc(tr(p.desc, lang))}</p>
  ${links}
  ${date ? `<p class="meta">${esc(date)}</p>` : ""}
</article>`;
}

function entry({ when, title, org, body, bullets }, lang) {
  const inner = bullets
    ? `<ul class="bullets">${bullets.map((b) => `<li>${esc(tr(b, lang))}</li>`).join("")}</ul>`
    : `<p>${esc(tr(body, lang))}</p>`;
  return `<div class="entry">
  <div class="when">${esc(tr(when, lang))}</div>
  <div>
    <h3>${esc(tr(title, lang))}</h3>
    <p class="org">${esc(tr(org, lang))}</p>
    ${inner}
  </div>
</div>`;
}

function postRow(p, lang) {
  return `<li class="post">
  <time datetime="${p.date}">${esc(fmtDate(p.date, lang))}</time>
  <div>
    <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(tr(p.title, lang))}</a>
    <p class="meta">${esc(p.lang)} · ${p.tags.map(esc).join(", ")}</p>
  </div>
</li>`;
}

function awardsBlock(lang) {
  const rows = C.awards
    .map(
      (a) => `<li><span class="yr">${esc(a.year || "")}</span><span><strong>${esc(tr(a.title, lang))}</strong>, ${esc(tr(a.org, lang))}</span></li>`
    )
    .join("");
  const certs = C.certifications.map((c) => `<li>${esc(tr(c, lang))}</li>`).join("");
  return `<div class="two">
  <div>
    <h3>${esc(tr(C.ui.awardsLabel, lang))}</h3>
    <ul class="awards">${rows}</ul>
  </div>
  <div>
    <h3>${esc(tr(C.ui.certsLabel, lang))}</h3>
    <ul class="plain">${certs}</ul>
  </div>
</div>`;
}

function heroVisual(lang) {
  const alt = esc(tr(C.photo.alt, lang));
  const mono = `<div class="monogram" id="monogram" aria-hidden="true">${esc(C.person.initials)}</div>`;
  if (PHOTO) {
    return `<img class="photo" src="/${PHOTO}" alt="${alt}" width="120" height="120" decoding="async">`;
  }
  // No photo committed yet: the monogram shows, and a script swaps in assets/profile.* as soon as one exists.
  return `<div class="hero-visual" data-photo-probe="${PROBE_EXTS.join(",")}" data-alt="${alt}">${mono}</div>`;
}

function statsStrip(lang) {
  const items = C.stats
    .map((s) => {
      const n = s.n === "projects" ? C.allProjects.length : s.n;
      const suffix = s.suffix || "";
      const shown = n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US") + suffix;
      return `<li><strong data-count="${n}" data-suffix="${esc(suffix)}" data-locale="${lang}">${esc(shown)}</strong><span>${esc(tr(s.label, lang))}</span></li>`;
    })
    .join("");
  return `<section class="stats" aria-label="${esc(tr(C.extraUi.statsLabel, lang))}"><ul>${items}</ul></section>`;
}

function graphLayout() {
  const W = 720, H = 400, cx = W / 2, cy = 205;
  const T = Object.fromEntries(C.themes.map((t) => [t.key, t]));
  const pos = {};
  const singles = {};
  for (const p of C.allProjects) {
    if (p.themes.length === 1) (singles[p.themes[0]] = singles[p.themes[0]] || []).push(p);
    else {
      const xs = p.themes.map((k) => T[k].x), ys = p.themes.map((k) => T[k].y);
      pos[p.id] = { x: xs.reduce((a, b) => a + b, 0) / xs.length, y: ys.reduce((a, b) => a + b, 0) / ys.length };
    }
  }
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  for (const [k, list] of Object.entries(singles)) {
    const t = T[k];
    const base = Math.atan2(t.y - cy, t.x - cx);
    list.forEach((p, i) => {
      const a = base + (i - (list.length - 1) / 2) * 0.7;
      pos[p.id] = { x: clamp(t.x + Math.cos(a) * 72, 22, W - 22), y: clamp(t.y + Math.sin(a) * 72, 22, H - 22) };
    });
  }
  return { W, H, T, pos };
}

function researchMap(lang) {
  const { W, H, T, pos } = graphLayout();
  const count = (k) => C.allProjects.filter((p) => p.themes.includes(k)).length;
  const edges = C.allProjects
    .flatMap((p) =>
      p.themes.map(
        (k) => `<line class="edge" data-p="${p.id}" data-t="${k}" x1="${pos[p.id].x.toFixed(1)}" y1="${pos[p.id].y.toFixed(1)}" x2="${T[k].x}" y2="${T[k].y}"/>`
      )
    )
    .join("\n      ");
  const themeNodes = C.themes
    .map((t) => {
      const cap = `${tr(t.short, lang)}: ${tr(t.desc, lang)} (${tr(C.map.themeCount, lang).replace("{n}", count(t.key))})`;
      return `<a class="node theme" href="${urlFor(lang, "projects")}#${t.key}" data-t="${t.key}" data-cap="${esc(cap)}" aria-label="${esc(tr(t.short, lang) + ", " + tr(C.map.themeCount, lang).replace("{n}", count(t.key)))}">
        <circle cx="${t.x}" cy="${t.y}" r="26"/>
        <text class="tcount" x="${t.x}" y="${t.y}">${count(t.key)}</text>
        <text class="tlabel" x="${t.x}" y="${t.y + 46}">${esc(tr(t.short, lang))}</text>
      </a>`;
    })
    .join("\n      ");
  const projNodes = C.allProjects
    .map((p) => {
      const q = pos[p.id];
      const right = q.x > W / 2;
      return `<a class="node proj" href="${urlFor(lang, "projects")}#${p.id}" data-p="${p.id}" data-themes="${p.themes.join(" ")}" data-cap="${esc(tr(p.title, lang))}" aria-label="${esc(tr(p.title, lang))}">
        <circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="8"/>
        <text class="plabel" x="${(q.x + (right ? -13 : 13)).toFixed(1)}" y="${(q.y + 4).toFixed(1)}" text-anchor="${right ? "end" : "start"}">${esc(tr(p.short, lang))}</text>
      </a>`;
    })
    .join("\n      ");
  return `<section id="map" aria-labelledby="h-map">
  <h2 id="h-map">${esc(tr(C.map.title, lang))}</h2>
  <p class="lede small">${esc(tr(C.map.intro, lang))}</p>
  <div class="map-wrap">
    <svg class="graph" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(tr(C.map.ariaLabel, lang))}">
      <g class="edges">
      ${edges}
      </g>
      <g class="themes">
      ${themeNodes}
      </g>
      <g class="projs">
      ${projNodes}
      </g>
    </svg>
  </div>
  <p class="map-caption" id="map-caption" aria-live="polite">${esc(tr(C.map.hint, lang))}</p>
</section>`;
}

function negativesBlock(lang) {
  const N = C.negatives;
  const items = N.items
    .map(
      (i) => `<li>
    <h3>${esc(tr(i.title, lang))}</h3>
    <p>${esc(tr(i.what, lang))}</p>
    <p class="lesson"><strong>${esc(tr(N.lessonLabel, lang))}.</strong> ${esc(tr(i.lesson, lang))}</p>
  </li>`
    )
    .join("");
  return `<section id="negatives" aria-labelledby="h-neg">
  <h2 id="h-neg">${esc(tr(N.title, lang))}</h2>
  <p class="lede small">${esc(tr(N.intro, lang))}</p>
  <ol class="neg">${items}</ol>
</section>`;
}

// ---------- Pages ----------

function homePage(lang) {
  const featured = C.allProjects.filter((p) => p.featured).slice(0, 4);
  const latest = C.posts.slice(0, 3);
  const newsHtml = C.news
    .map((n) => `<li><time datetime="${n.date}">${esc(fmtDate(n.date, lang))}</time><span>${esc(n[lang])}</span></li>`)
    .join("");
  const body = `
<section class="hero" aria-labelledby="name">
  ${heroVisual(lang)}
  <div>
    <p class="role">${esc(tr(C.hero.role, lang))}</p>
    <h1 id="name">${esc(C.person.name)}</h1>
    <p class="tagline">${esc(tr(C.hero.tagline, lang))}</p>
    ${socialPills(lang)}
    <p class="cta">
      <a class="btn primary" href="${urlFor(lang, "projects")}">${esc(tr(C.ui.viewWork, lang))}</a>
      <a class="btn" href="${urlFor(lang, "cv")}">${esc(tr(C.ui.viewCV, lang))}</a>
    </p>
  </div>
</section>

${statsStrip(lang)}

<section id="news" aria-labelledby="h-news">
  <h2 id="h-news">${esc(tr(C.ui.sections.news, lang))}</h2>
  <ul class="news">${newsHtml}</ul>
</section>

<section id="about" aria-labelledby="h-about">
  <h2 id="h-about">${esc(tr(C.ui.sections.about, lang))}</h2>
  ${C.about.paragraphs.map((p) => `<p>${esc(p[lang])}</p>`).join("\n  ")}
  <h3 class="sub">${esc(tr(C.ui.sections.interests, lang))}</h3>
  ${chips(C.about.interests, lang)}
</section>

${researchMap(lang)}

<section id="education" aria-labelledby="h-edu">
  <h2 id="h-edu">${esc(tr(C.ui.sections.education, lang))}</h2>
  ${C.education.map((e) => entry(e, lang)).join("\n  ")}
</section>

<section id="experience" aria-labelledby="h-exp">
  <h2 id="h-exp">${esc(tr(C.ui.sections.experience, lang))}</h2>
  ${C.experience.map((e) => entry(e, lang)).join("\n  ")}
</section>

<section id="work" aria-labelledby="h-work">
  <h2 id="h-work">${esc(tr(C.ui.sections.work, lang))}</h2>
  <div class="cards">
    ${featured.map((p) => projectCard(p, lang)).join("\n    ")}
  </div>
  <p class="more"><a href="${urlFor(lang, "projects")}">${esc(tr(C.ui.allProjects, lang).replace("{n}", C.allProjects.length))} &rarr;</a></p>
</section>

${negativesBlock(lang)}

<section id="awards" aria-labelledby="h-awards">
  <h2 id="h-awards">${esc(tr(C.ui.sections.awards, lang))}</h2>
  ${awardsBlock(lang)}
</section>

<section id="posts" aria-labelledby="h-posts">
  <h2 id="h-posts">${esc(tr(C.ui.sections.posts, lang))}</h2>
  <ul class="posts">${latest.map((p) => postRow(p, lang)).join("")}</ul>
  <p class="more"><a href="${urlFor(lang, "blog")}">${esc(tr(C.ui.allWriting, lang))} &rarr;</a></p>
</section>`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: C.person.name,
    url: C.ORIGIN + "/",
    jobTitle: tr(C.hero.role, "en").split(" · ")[0],
    email: "mailto:" + C.person.email,
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "ENSAM, Mohammed V University, Rabat" }],
    sameAs: [C.person.links.github, C.person.links.linkedin, C.person.links.scholar, C.person.links.medium],
  };
  if (PHOTO) ld.image = C.ORIGIN + "/" + PHOTO;
  return layout({ lang, key: "", title: tr(C.meta.home.title, lang), desc: tr(C.meta.home.desc, lang), body, jsonLd: JSON.stringify(ld) });
}

function projectsPage(lang) {
  const intro = {
    en: "Research projects and open-source code. Where a result is modest or negative, I say so.",
    fr: "Projets de recherche et code open source. Quand un résultat est modeste ou négatif, je le dis.",
  };
  const filters = `<div class="filters" role="group" aria-label="${esc(tr(C.extraUi.filterLabel, lang))}" hidden>
    <button type="button" data-filter="all" aria-pressed="true">${esc(tr(C.extraUi.filterAll, lang))}</button>
    ${C.themes.map((t) => `<button type="button" data-filter="${t.key}" aria-pressed="false">${esc(tr(t.short, lang))}</button>`).join("\n    ")}
  </div>`;
  const body = `
<section class="page-head">
  <h1>${lang === "en" ? "Work" : "Projets"}</h1>
  <p class="lede">${esc(intro[lang])}</p>
  ${filters}
</section>
<section class="cards one">
  ${C.allProjects.map((p) => projectCard(p, lang)).join("\n  ")}
  <p class="nomatch" hidden>${esc(tr(C.extraUi.noMatch, lang))}</p>
</section>`;
  return layout({ lang, key: "projects", title: tr(C.meta.projects.title, lang), desc: tr(C.meta.projects.desc, lang), body });
}

function blogPage(lang) {
  const h = {
    preprints: { en: "Preprints", fr: "Préprints" },
    articles: { en: "Articles", fr: "Articles" },
    intro: {
      en: "Research preprints on HAL Open Science and articles on Medium, more than 10,000 readers in total.",
      fr: "Préprints de recherche sur HAL Open Science et articles sur Medium, plus de 10 000 lecteurs au total.",
    },
    medium: { en: "All articles on Medium", fr: "Tous les articles sur Medium" },
    scholar: { en: "Google Scholar profile", fr: "Profil Google Scholar" },
  };
  const pre = C.preprints
    .map(
      (p) => `<li class="post"><span class="yr">2026</span><div>${ext(p.url, p.title)}<p class="meta">${esc(tr(p.note, lang))}</p></div></li>`
    )
    .join("");
  const body = `
<section class="page-head">
  <h1>${lang === "en" ? "Writing" : "Écrits"}</h1>
  <p class="lede">${esc(h.intro[lang])}</p>
</section>
<section aria-labelledby="h-pre">
  <h2 id="h-pre">${esc(h.preprints[lang])}</h2>
  <ul class="posts">${pre}</ul>
  <p class="more">${ext(C.person.links.scholar, h.scholar[lang])} &rarr;</p>
</section>
<section aria-labelledby="h-art">
  <h2 id="h-art">${esc(h.articles[lang])}</h2>
  <ul class="posts">${C.posts.map((p) => postRow(p, lang)).join("")}</ul>
  <p class="more">${ext(C.person.links.medium, h.medium[lang])} &rarr;</p>
</section>`;
  return layout({ lang, key: "blog", title: tr(C.meta.blog.title, lang), desc: tr(C.meta.blog.desc, lang), body });
}

function teachingPage(lang) {
  const blocks = C.teaching.blocks
    .map(
      (b) => `<section>
  <h2>${esc(tr(b.title, lang))}</h2>
  <ul class="posts">${b.items
    .map((i) => {
      const when = lang === "fr" && i.whenFr ? i.whenFr : i.when;
      return `<li class="post"><span class="yr">${esc(when || "")}</span><div><p>${esc(i[lang])}</p></div></li>`;
    })
    .join("")}</ul>
</section>`
    )
    .join("\n");
  const body = `
<section class="page-head">
  <h1>${lang === "en" ? "Teaching and talks" : "Enseignement et prises de parole"}</h1>
  <p class="lede">${esc(tr(C.teaching.intro, lang))}</p>
</section>
${blocks}`;
  return layout({ lang, key: "teaching-talks", title: tr(C.meta.teaching.title, lang), desc: tr(C.meta.teaching.desc, lang), body });
}

function cvPage(lang) {
  const h = {
    profile: { en: "Profile", fr: "Profil" },
    pubs: { en: "Publications", fr: "Publications" },
    skills: { en: "Skills", fr: "Compétences" },
    langs: { en: "Languages", fr: "Langues" },
  };
  const profile = {
    en: "Engineer in Data Science and AI (ENSAM Rabat, June 2026). I work on interpretable machine learning, multi-agent reinforcement learning and multi-sensor learning, implement models from their equations, and report results honestly, including negative ones.",
    fr: "Ingénieur en Data Science et IA (ENSAM Rabat, juin 2026). Je travaille sur l'apprentissage automatique interprétable, l'apprentissage par renforcement multi-agent et l'apprentissage multi-capteurs, j'implémente les modèles à partir de leurs équations et je rapporte les résultats honnêtement, y compris les négatifs.",
  };
  const skills = C.skills
    .map((s) => `<li><strong>${esc(tr(s.label, lang))}.</strong> ${esc(tr(s.text, lang))}</li>`)
    .join("");
  const pubs = C.preprints
    .map((p) => `<li>Zemba, W. B. R. (2026). ${ext(p.url, p.title)}. ${esc(tr(p.note, lang))}.</li>`)
    .join("");
  const body = `
<section class="page-head cv-head">
  <div>
    <h1>${esc(C.person.name)}</h1>
    <p class="lede">${esc(C.person.email)} · Rabat, ${lang === "en" ? "Morocco" : "Maroc"}</p>
    ${socialPills(lang)}
  </div>
  <p class="noprint"><button class="btn primary" type="button" data-print>${esc(tr(C.ui.print, lang))}</button></p>
</section>
<section><h2>${esc(h.profile[lang])}</h2><p>${esc(profile[lang])}</p></section>
<section><h2>${esc(tr(C.ui.sections.education, lang))}</h2>${C.education.map((e) => entry(e, lang)).join("")}</section>
<section><h2>${esc(tr(C.ui.sections.experience, lang))}</h2>${C.experience.map((e) => entry(e, lang)).join("")}</section>
<section><h2>${esc(h.pubs[lang])}</h2><ul class="plain">${pubs}</ul></section>
<section><h2>${esc(tr(C.ui.sections.work, lang))}</h2>
  <ul class="plain">${C.allProjects.map((p) => `<li><strong>${esc(tr(p.title, lang))}.</strong> ${esc(tr(p.desc, lang))}</li>`).join("")}</ul>
</section>
<section><h2>${esc(h.skills[lang])}</h2><ul class="plain skills">${skills}</ul></section>
<section><h2>${esc(tr(C.ui.sections.awards, lang))}</h2>${awardsBlock(lang)}</section>
<section><h2>${esc(h.langs[lang])}</h2><p>${esc(C.languages[lang])}</p><p class="meta">${esc(tr(C.ui.cvNote, lang))}</p></section>`;
  return layout({ lang, key: "cv", title: tr(C.meta.cv.title, lang), desc: tr(C.meta.cv.desc, lang), body });
}

function notFoundPage() {
  const body = `
<section class="page-head">
  <h1>404</h1>
  <p class="lede">${esc(C.ui.notFound.en)} / ${esc(C.ui.notFound.fr)}</p>
  <p><a class="btn primary" href="/">${esc(C.ui.backHome.en)}</a> <a class="btn" href="/fr/">${esc(C.ui.backHome.fr)}</a></p>
</section>`;
  return layout({ lang: "en", key: "", title: "404 | " + C.person.short, desc: C.ui.notFound.en, body });
}

// ---------- Assets ----------

const CSS = `
:root{
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --bg:#faf7f2;--surface:#fffdf9;--ink:#211f1c;--muted:#645e55;--line:#e6dfd2;
  --accent:#9a3412;--chip:#f0e9dc;--mono-bg:#9a3412;--mono-ink:#fff;--focus:#1d4ed8;
  --shadow:0 1px 2px rgba(33,31,28,.06),0 10px 28px rgba(33,31,28,.06);
  --radius:14px;color-scheme:light;
}
:root[data-theme="dark"]{
  --bg:#16140f;--surface:#1e1b15;--ink:#ece7dd;--muted:#b0a89a;--line:#2f2a21;
  --accent:#f4a261;--chip:#2a251c;--mono-bg:#c2410c;--mono-ink:#fff;--focus:#93c5fd;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 10px 28px rgba(0,0,0,.35);color-scheme:dark;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#16140f;--surface:#1e1b15;--ink:#ece7dd;--muted:#b0a89a;--line:#2f2a21;
    --accent:#f4a261;--chip:#2a251c;--mono-bg:#c2410c;--mono-ink:#fff;--focus:#93c5fd;
    --shadow:0 1px 2px rgba(0,0,0,.4),0 10px 28px rgba(0,0,0,.35);color-scheme:dark;
  }
}
*{box-sizing:border-box}
[hidden]{display:none!important}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:5rem}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
body{margin:0;background:var(--bg);color:var(--ink);font:1.0625rem/1.65 var(--sans)}
.wrap{max-width:56rem;margin:0 auto;padding:0 1.25rem}
a{color:var(--accent);text-underline-offset:.18em}
a:hover{text-decoration-thickness:2px}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px;border-radius:4px}
.skip{position:absolute;left:-999px;top:0;background:var(--ink);color:var(--bg);padding:.6rem 1rem;z-index:100}
.skip:focus{left:1rem;top:1rem}
h1,h2,h3{font-family:var(--serif);line-height:1.2;margin:0 0 .5rem}
h1{font-size:clamp(2rem,5.5vw,3.1rem);letter-spacing:-.01em}
h2{font-size:1.65rem;margin-bottom:1rem}
h3{font-size:1.1rem}
p{margin:.5rem 0 .9rem}
.meta{color:var(--muted);font-size:.9rem;margin:.25rem 0 0}

.site-header{position:sticky;top:0;z-index:20;background:var(--bg);border-bottom:1px solid var(--line)}
@supports (background:color-mix(in srgb,red,blue)){
  .site-header{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(8px)}
}
.bar{display:flex;align-items:center;justify-content:space-between;gap:.75rem 1.25rem;flex-wrap:wrap;padding-top:.65rem;padding-bottom:.65rem}
.brand{font-family:var(--serif);font-weight:700;font-size:1.15rem;color:var(--ink);text-decoration:none}
nav ul{display:flex;flex-wrap:wrap;gap:.2rem;list-style:none;margin:0;padding:0}
nav a{display:block;padding:.35rem .75rem;border-radius:999px;color:var(--muted);text-decoration:none;font-size:.97rem}
nav a:hover{color:var(--ink);background:var(--chip)}
nav a[aria-current="page"]{color:var(--ink);background:var(--chip);font-weight:600}
.tools{display:flex;align-items:center;gap:.4rem}
.lang,#theme-toggle{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:.3rem .75rem;font:inherit;font-size:.9rem;text-decoration:none;cursor:pointer;line-height:1.4}
.lang:hover,#theme-toggle:hover{border-color:var(--accent)}
#palette-open{display:inline-flex;align-items:center;gap:.4rem}
#palette-open .k{color:var(--muted)}

main{padding-bottom:3rem}
section{padding:2.25rem 0;border-top:1px solid var(--line)}
section:first-child{border-top:0}

.hero{display:grid;grid-template-columns:auto 1fr;gap:1.75rem;align-items:center;padding:3.25rem 0 2.25rem}
.monogram{width:104px;height:104px;border-radius:50%;background:var(--mono-bg);color:var(--mono-ink);display:grid;place-items:center;font:700 2.2rem var(--serif);letter-spacing:.02em;box-shadow:var(--shadow)}
.photo{width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--accent);box-shadow:var(--shadow);background:var(--chip)}
.hero-visual{display:grid;place-items:center}
.role{margin:0 0 .35rem;color:var(--accent);font-weight:600;font-size:.95rem;letter-spacing:.02em}
.tagline{font-size:1.2rem;color:var(--muted);max-width:40rem;margin:.75rem 0 1rem}
.pills{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;margin:0 0 1.1rem;padding:0}
.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:.25rem .85rem;background:var(--surface);color:var(--ink);text-decoration:none;font-size:.93rem}
.pill:hover{border-color:var(--accent);color:var(--accent)}
.cta{display:flex;gap:.6rem;flex-wrap:wrap;margin:0}
.btn{display:inline-block;padding:.55rem 1.1rem;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--ink);text-decoration:none;font:inherit;font-weight:600;cursor:pointer}
.btn:hover{border-color:var(--accent)}
.btn.primary{background:var(--accent);border-color:var(--accent);color:var(--bg)}
.btn.primary:hover{filter:brightness(1.08)}

.stats{padding:0 0 2rem;border-top:0}
.stats ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem}
.stats li{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:.85rem 1rem;box-shadow:var(--shadow)}
.stats strong{display:block;font:700 1.8rem/1.1 var(--serif);color:var(--accent);font-variant-numeric:tabular-nums}
.stats span{display:block;color:var(--muted);font-size:.88rem;line-height:1.35;margin-top:.25rem}

.news,.posts,.plain,.awards,.bullets{margin:0;padding:0;list-style:none}
.news li{display:grid;grid-template-columns:6.5rem 1fr;gap:1rem;padding:.5rem 0}
.news li+li,.posts li+li{border-top:1px dashed var(--line)}
time,.yr{color:var(--muted);font-size:.9rem;font-variant-numeric:tabular-nums}
.post{display:grid;grid-template-columns:6.5rem 1fr;gap:1rem;padding:.65rem 0}
.post p{margin:0}
.post a{font-weight:600}
.sub{margin-top:1.4rem;font-family:var(--sans);text-transform:uppercase;letter-spacing:.06em;font-size:.82rem;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:.4rem;list-style:none;margin:.25rem 0 .6rem;padding:0}
.chips li{background:var(--chip);border-radius:999px;padding:.12rem .7rem;font-size:.82rem;color:var(--ink)}

.entry{display:grid;grid-template-columns:9.5rem 1fr;gap:.25rem 1.5rem;padding:1rem 0}
.entry+.entry{border-top:1px dashed var(--line)}
.when{color:var(--muted);font-size:.92rem;padding-top:.15rem}
.entry h3{margin:0}
.org{margin:.1rem 0 .4rem;color:var(--muted);font-style:italic}
.bullets{padding-left:1.1rem;list-style:disc}
.bullets li{margin:.3rem 0}
.entry p:last-child{margin-bottom:0}

.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr));gap:1.1rem}
.cards.one{grid-template-columns:1fr}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:1.15rem 1.25rem;box-shadow:var(--shadow);display:flex;flex-direction:column}
.card:target{outline:2px solid var(--accent);outline-offset:3px}
.card h3{font-size:1.15rem}
.card p{margin:.3rem 0}
.card .links{margin-top:auto;padding-top:.5rem;font-weight:600}
.more{margin-top:1.1rem;font-weight:600}
.two{display:grid;grid-template-columns:1fr 1fr;gap:2rem}
.two h3{margin-bottom:.6rem}
.awards li{display:grid;grid-template-columns:3.5rem 1fr;gap:.75rem;padding:.4rem 0}
.plain li{padding:.3rem 0}
.skills li{padding:.35rem 0}

.lede.small{font-size:1rem;margin-top:0}
.map-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow)}
.graph{display:block;width:100%;min-width:560px;height:auto}
.graph .node{cursor:pointer;outline:none}
.graph .node:focus-visible circle{stroke:var(--focus);stroke-width:4}
.graph .edge{stroke:var(--line);stroke-width:1.6;transition:stroke .2s,opacity .2s}
.graph .theme circle{fill:var(--accent);transition:transform .2s}
.graph .tcount{fill:var(--bg);font:700 15px var(--sans);text-anchor:middle;dominant-baseline:central}
.graph .tlabel{fill:var(--ink);font:600 13.5px var(--sans);text-anchor:middle;paint-order:stroke;stroke:var(--surface);stroke-width:5px;stroke-linejoin:round}
.graph .proj circle{fill:var(--surface);stroke:var(--accent);stroke-width:2.5}
.graph .plabel{fill:var(--ink);font:600 12px var(--sans);opacity:0;paint-order:stroke;stroke:var(--surface);stroke-width:5px;stroke-linejoin:round;pointer-events:none;transition:opacity .15s}
.graph .proj:hover .plabel,.graph .proj:focus .plabel,.graph .proj.is-related .plabel{opacity:1}
.graph .proj:hover circle,.graph .proj:focus circle{fill:var(--accent)}
.graph.has-active .node{opacity:.28}
.graph.has-active .node.is-related{opacity:1}
.graph.has-active .edge{opacity:.15}
.graph.has-active .edge.is-related{opacity:1;stroke:var(--accent)}
.map-caption{min-height:3.2em;color:var(--muted);font-size:.95rem;margin:.75rem 0 0}

.neg{list-style:none;margin:0;padding:0;counter-reset:n;display:grid;gap:1rem}
.neg li{counter-increment:n;background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:var(--radius);padding:1rem 1.25rem 1rem 1.25rem}
.neg h3{margin:0 0 .3rem}
.neg h3::before{content:counter(n) ".";color:var(--accent);margin-right:.45rem}
.neg p{margin:.3rem 0}
.neg .lesson{color:var(--muted)}
.neg .lesson strong{color:var(--ink)}

.filters{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem}
.filters button{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:.3rem .9rem;font:inherit;font-size:.92rem;cursor:pointer}
.filters button:hover{border-color:var(--accent)}
.filters button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--bg);font-weight:600}
.nomatch{color:var(--muted)}

.page-head{padding:2.75rem 0 1.5rem}
.lede{font-size:1.15rem;color:var(--muted);max-width:42rem}
.cv-head{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:flex-start}
.site-footer{border-top:1px solid var(--line);padding:1.5rem 0;color:var(--muted);font-size:.9rem}
.foot{display:flex;justify-content:space-between;gap:.5rem 1.5rem;flex-wrap:wrap}

dialog#palette{border:1px solid var(--line);border-radius:16px;background:var(--surface);color:var(--ink);padding:0;width:min(34rem,calc(100vw - 2rem));box-shadow:0 24px 70px rgba(0,0,0,.35);margin:12vh auto auto}
dialog#palette::backdrop{background:rgba(20,18,14,.55);backdrop-filter:blur(2px)}
.pal-box{padding:.75rem}
#palette-input{width:100%;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:10px;padding:.65rem .85rem;font:inherit}
#palette-list{list-style:none;margin:.5rem 0 0;padding:0;max-height:min(50vh,24rem);overflow:auto}
.pal-group{padding:.55rem .6rem .2rem;font-size:.75rem;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}
.pal-item,.pal-none{padding:.5rem .65rem;border-radius:8px;cursor:pointer}
.pal-none{color:var(--muted);cursor:default}
.pal-item.active{background:var(--accent);color:var(--bg)}
.pal-hint{margin:.6rem .3rem 0;font-size:.8rem;color:var(--muted)}

@media (max-width:680px){
  .hero{grid-template-columns:1fr;gap:1rem;padding-top:2rem}
  .monogram{width:80px;height:80px;font-size:1.7rem}
  .photo{width:96px;height:96px}
  .entry,.news li,.post{grid-template-columns:1fr;gap:.1rem}
  .two{grid-template-columns:1fr;gap:1.25rem}
  .stats ul{grid-template-columns:1fr 1fr}
  .bar{justify-content:flex-start}
  .site-header{position:static}
  #palette-open .k{display:none}
}
@media print{
  :root,:root[data-theme="dark"]{--bg:#fff;--surface:#fff;--ink:#000;--muted:#333;--line:#bbb;--accent:#000;--chip:#eee;color-scheme:light}
  body{font-size:10.5pt;line-height:1.45}
  .site-header,.site-footer,.skip,.noprint,.cta,dialog,.stats,#map,.filters{display:none!important}
  .wrap{max-width:none;padding:0}
  section{padding:.9rem 0;break-inside:avoid-page}
  .entry,.card{break-inside:avoid}
  .card{box-shadow:none}
  a{color:#000;text-decoration:none}
}
`;

const JS = `(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle */
  var btn = document.getElementById("theme-toggle");
  function effective() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function sync() { if (btn) btn.setAttribute("aria-pressed", effective() === "dark" ? "true" : "false"); }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    sync();
  }

  /* Print button on the CV page */
  Array.prototype.forEach.call(document.querySelectorAll("[data-print]"), function (b) {
    b.addEventListener("click", function () { window.print(); });
  });

  /* Profile photo: if assets/profile.* exists, swap it in for the monogram */
  var probe = document.querySelector("[data-photo-probe]");
  if (probe) {
    var exts = probe.getAttribute("data-photo-probe").split(",");
    var tryNext = function (i) {
      if (i >= exts.length) return;
      var img = new Image();
      img.onload = function () {
        img.className = "photo";
        img.alt = probe.getAttribute("data-alt") || "";
        img.width = 120; img.height = 120;
        probe.innerHTML = "";
        probe.appendChild(img);
      };
      img.onerror = function () { tryNext(i + 1); };
      img.src = "/assets/profile." + exts[i];
    };
    tryNext(0);
  }

  /* Key numbers count up when they scroll into view */
  var counters = document.querySelectorAll("[data-count]");
  function countUp(el) {
    var end = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    var loc = el.getAttribute("data-locale") === "fr" ? "fr-FR" : "en-US";
    var t0 = null, dur = 900;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString(loc) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (c) { io.observe(c); });
  }

  /* Research map: highlight what a node is connected to */
  var svg = document.querySelector(".graph");
  if (svg) {
    var caption = document.getElementById("map-caption");
    var hint = caption ? caption.textContent : "";
    var nodes = Array.prototype.slice.call(svg.querySelectorAll(".node"));
    var edges = Array.prototype.slice.call(svg.querySelectorAll(".edge"));
    var themesOf = function (n) { return (n.getAttribute("data-themes") || "").split(" "); };
    var activate = function (node) {
      var t = node.getAttribute("data-t");
      var p = node.getAttribute("data-p");
      svg.classList.add("has-active");
      nodes.forEach(function (n) {
        var on = n === node ||
          (t && n.getAttribute("data-p") && themesOf(n).indexOf(t) > -1) ||
          (p && n.getAttribute("data-t") && themesOf(node).indexOf(n.getAttribute("data-t")) > -1);
        n.classList.toggle("is-related", !!on);
      });
      edges.forEach(function (e) {
        var on = (t && e.getAttribute("data-t") === t) || (p && e.getAttribute("data-p") === p);
        e.classList.toggle("is-related", !!on);
      });
      if (caption) caption.textContent = node.getAttribute("data-cap") || hint;
    };
    var reset = function () {
      svg.classList.remove("has-active");
      nodes.forEach(function (n) { n.classList.remove("is-related"); });
      edges.forEach(function (e) { e.classList.remove("is-related"); });
      if (caption) caption.textContent = hint;
    };
    nodes.forEach(function (n) {
      n.addEventListener("mouseenter", function () { activate(n); });
      n.addEventListener("focus", function () { activate(n); });
      n.addEventListener("mouseleave", reset);
      n.addEventListener("blur", reset);
    });
  }

  /* Project filters (projects page) */
  var bar = document.querySelector(".filters");
  if (bar) {
    bar.hidden = false;
    var cards = Array.prototype.slice.call(document.querySelectorAll(".card[data-themes]"));
    var fbtns = Array.prototype.slice.call(bar.querySelectorAll("button"));
    var nomatch = document.querySelector(".nomatch");
    var keys = fbtns.map(function (b) { return b.getAttribute("data-filter"); });
    var apply = function (key) {
      var shown = 0;
      cards.forEach(function (c) {
        var on = key === "all" || c.getAttribute("data-themes").split(" ").indexOf(key) > -1;
        c.hidden = !on;
        if (on) shown++;
      });
      fbtns.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === key ? "true" : "false"); });
      if (nomatch) nomatch.hidden = shown > 0;
    };
    var fromHash = function () {
      var h = location.hash.slice(1);
      var isTheme = keys.indexOf(h) > -1 && h !== "all";
      apply(isTheme ? h : "all");
      if (!isTheme && h) {
        var el = document.getElementById(h);
        if (el) el.scrollIntoView();
      }
    };
    fbtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-filter");
        try { history.replaceState(null, "", k === "all" ? location.pathname : "#" + k); } catch (e) {}
        apply(k);
      });
    });
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* Command palette (Ctrl or Cmd + K, or "/") */
  var dlg = document.getElementById("palette");
  var dataEl = document.getElementById("palette-data");
  var openBtn = document.getElementById("palette-open");
  if (dlg && dataEl && typeof dlg.showModal === "function") {
    var items = [];
    try { items = JSON.parse(dataEl.textContent); } catch (e) { items = []; }
    var input = document.getElementById("palette-input");
    var list = document.getElementById("palette-list");
    var shown = [], active = 0;
    var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, ""); };
    var mark = function () {
      Array.prototype.forEach.call(list.querySelectorAll(".pal-item"), function (li) {
        var on = +li.getAttribute("data-i") === active;
        li.classList.toggle("active", on);
        li.setAttribute("aria-selected", on ? "true" : "false");
        if (on) { input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
      });
    };
    var render = function () {
      var q = norm(input.value.trim());
      shown = items.filter(function (it) { return !q || norm(it.l + " " + (it.k || "") + " " + it.g).indexOf(q) > -1; }).slice(0, 14);
      active = 0;
      list.innerHTML = "";
      if (!shown.length) {
        var none = document.createElement("li");
        none.className = "pal-none";
        none.textContent = dlg.getAttribute("data-none") || "";
        list.appendChild(none);
        return;
      }
      var last = "";
      shown.forEach(function (it, i) {
        if (it.g !== last) {
          var g = document.createElement("li");
          g.className = "pal-group";
          g.setAttribute("role", "presentation");
          g.textContent = it.g;
          list.appendChild(g);
          last = it.g;
        }
        var li = document.createElement("li");
        li.id = "pal-" + i;
        li.className = "pal-item";
        li.setAttribute("role", "option");
        li.setAttribute("data-i", i);
        li.textContent = it.l;
        list.appendChild(li);
      });
      mark();
    };
    var go = function (it) {
      dlg.close();
      if (!it) return;
      if (it.a === "theme") { if (btn) btn.click(); return; }
      if (it.x) window.open(it.u, "_blank", "noopener");
      else window.location.href = it.u;
    };
    var open = function () {
      if (dlg.open) return;
      dlg.showModal();
      input.value = "";
      render();
      input.focus();
    };
    if (openBtn) { openBtn.hidden = false; openBtn.addEventListener("click", open); }
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, shown.length - 1); mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); mark(); }
      else if (e.key === "Enter") { e.preventDefault(); go(shown[active]); }
    });
    list.addEventListener("click", function (e) {
      var li = e.target.closest ? e.target.closest(".pal-item") : null;
      if (li) go(shown[+li.getAttribute("data-i")]);
    });
    list.addEventListener("mousemove", function (e) {
      var li = e.target.closest ? e.target.closest(".pal-item") : null;
      if (li && +li.getAttribute("data-i") !== active) { active = +li.getAttribute("data-i"); mark(); }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener("keydown", function (e) {
      var tag = (e.target && e.target.tagName || "").toLowerCase();
      var typing = tag === "input" || tag === "textarea" || tag === "select" || (e.target && e.target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); open(); }
      else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); open(); }
    });
  }
})();
`;

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#9a3412"/><text x="32" y="43" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#fff">BZ</text></svg>
`;

// ---------- Feed, sitemap, robots ----------

function feedXml() {
  const items = C.posts
    .map(
      (p) => `  <item>
    <title>${esc(p.title.en)}</title>
    <link>${esc(p.url)}</link>
    <guid isPermaLink="true">${esc(p.url)}</guid>
    <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
  </item>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${esc(C.person.name)}</title>
  <link>${C.ORIGIN}/</link>
  <description>${esc(C.meta.home.desc.en)}</description>
  <language>en</language>
${items}
</channel>
</rss>
`;
}

function sitemapXml() {
  const keys = ["", "projects", "blog", "teaching-talks", "cv"];
  const urls = [];
  for (const k of keys) {
    for (const l of LANGS) {
      const other = l === "en" ? "fr" : "en";
      urls.push(`  <url>
    <loc>${C.ORIGIN + urlFor(l, k)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <xhtml:link rel="alternate" hreflang="${l}" href="${C.ORIGIN + urlFor(l, k)}"/>
    <xhtml:link rel="alternate" hreflang="${other}" href="${C.ORIGIN + urlFor(other, k)}"/>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

// ---------- Write everything ----------

function write(rel, data) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}

const pages = { "": homePage, projects: projectsPage, blog: blogPage, "teaching-talks": teachingPage, cv: cvPage };
for (const lang of LANGS) {
  for (const [key, fn] of Object.entries(pages)) {
    const rel = (lang === "en" ? "" : "fr/") + (key ? key + "/" : "") + "index.html";
    write(rel, fn(lang));
  }
}
write("404.html", notFoundPage());
write("assets/style.css", CSS.trim() + "\n");
write("assets/main.js", JS);
write("assets/favicon.svg", FAVICON);
write("feed.xml", feedXml());
write("sitemap.xml", sitemapXml());
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${C.ORIGIN}/sitemap.xml\n`);
write(".nojekyll", "");
console.log("Site built in", ROOT, PHOTO ? "(photo: " + PHOTO + ")" : "(no photo yet, monogram shown)");
