// Static site builder: content/{en,ar}/*.md -> dist/{en,ar}/*.html
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'dist');
const LANGS = ['en', 'ar'];
const VIDEO = 'https://www.youtube.com/watch?v=0t0UiPQnskk';

const UI = {
  en: {
    dir: 'ltr', site: 'Claiming Ideas', tagline: 'A study companion to a conversation on research and business value',
    chapter: 'Chapter', chapters: 'Chapters', inVideo: 'In the video', watchFrom: 'Watch from',
    watch: 'Watch the episode', prev: 'Previous', next: 'Next', home: 'Home', glossary: 'Glossary',
    sources: 'Sources and About', other: 'العربية', otherLang: 'ar', theme: 'Switch light or dark theme',
    footer: 'An independent study aid. Not affiliated with Salla, KnowledgeX or the podcast.',
    menu: 'Menu', close: 'Close menu', skip: 'Skip to content', fig: 'Fig.', mainNav: 'Page navigation', topNav: 'Site menu',
  },
  ar: {
    dir: 'rtl', site: 'حجز خانات فكرية', tagline: 'رفيق دراسي لحوار عن البحث العلمي والقيمة التجارية',
    chapter: 'الفصل', chapters: 'الفصول', inVideo: 'في الحلقة', watchFrom: 'شاهد من',
    watch: 'شاهد الحلقة', prev: 'السابق', next: 'التالي', home: 'الرئيسية', glossary: 'المسرد',
    sources: 'المصادر وعن الموقع', other: 'English', otherLang: 'en', theme: 'تبديل الوضع الفاتح أو الداكن',
    footer: 'دليل دراسي مستقل، لا يتبع سلة ولا نولج إكس ولا البودكاست.',
    menu: 'القائمة', close: 'إغلاق القائمة', skip: 'تخطَّ إلى المحتوى', fig: 'شكل', mainNav: 'التنقل بين الصفحات', topNav: 'قائمة الموقع',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function slugFor(file) { return file.replace(/\.md$/, ''); }
function hrefFor(slug) { return slug === '00-home' ? 'index.html' : `${slug}.html`; }

function renderMarkdown(md, lang = 'en') {
  let html = marked.parse(md, { gfm: true });
  // internal links: foo.md -> foo.html, 00-home.md -> index.html
  html = html.replace(/href="([0-9a-z-]+)\.md"/g, (_, s) => `href="${hrefFor(s)}"`);
  // video timestamp links become orange chips that open in a new tab
  html = html.replace(/<a href="(https:\/\/www\.youtube\.com\/watch\?v=0t0UiPQnskk(?:&amp;|&)t=\d+s)">([^<]+)<\/a>/g,
    (_, href, text) => `<a class="ts" href="${href}" target="_blank" rel="noopener"><span aria-hidden="true">▶</span>${text}</a>`);
  html = html.replace(/\((<a class="ts"[^>]*>.*?<\/a>)\)/g, (_, a) => `<span class="tsw">(${a})</span>`);
  // other external links open in a new tab
  html = html.replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" target="_blank" rel="noopener">');
  // tables scroll sideways on phones
  html = html.replace(/<table>/g, '<div class="table-wrap" tabindex="0" role="region" aria-label="' + (lang === 'ar' ? 'جدول' : 'Table') + '"><table>').replace(/<\/table>/g, '</table></div>');
  return html;
}

function load(lang) {
  const dir = path.join(ROOT, 'content', lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    return { file, slug: slugFor(file), data, content };
  });
}

function fmtTime(t) { return t; }
function secs(t) { return t.split(':').map(Number).reduce((a, b) => a * 60 + b, 0); }

function nav(lang, pages, current) {
  const u = UI[lang];
  const chapters = pages.filter((p) => p.data.chapter);
  const items = chapters.map((p) => {
    const n = String(p.data.chapter).padStart(2, '0');
    return `<li><a href="${hrefFor(p.slug)}"${p.slug === current ? ' aria-current="page"' : ''}><span class="n">${n}</span>${esc(p.data.title)}</a></li>`;
  }).join('');
  const extra = ['glossary', 'sources'].map((s) => {
    const p = pages.find((x) => x.slug === s);
    return p ? `<li class="extra"><a href="${hrefFor(s)}"${s === current ? ' aria-current="page"' : ''}>${esc(u[s === 'glossary' ? 'glossary' : 'sources'])}</a></li>` : '';
  }).join('');
  return `<details class="toc"><summary>${u.chapters}</summary><ol>${items}${extra}</ol></details>`;
}

const ICON = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/></svg>',
  prev: '<svg class="dir" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>',
  next: '<svg class="dir" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};

function sequence(pages) {
  const chapters = pages.filter((p) => p.data.chapter).sort((a, b) => a.data.chapter - b.data.chapter);
  return ['00-home', ...chapters.map((p) => p.slug), 'glossary', 'sources'].filter((s) => pages.some((p) => p.slug === s));
}

function drawer(lang, pages, current, otherHref) {
  const u = UI[lang];
  const chapters = pages.filter((p) => p.data.chapter).sort((a, b) => a.data.chapter - b.data.chapter);
  const cur = (s) => (s === current ? ' aria-current="page"' : '');
  const items = chapters.map((p) => `<li><a href="${hrefFor(p.slug)}"${cur(p.slug)}><span class="n">${String(p.data.chapter).padStart(2, '0')}</span>${esc(p.data.title)}</a></li>`).join('');
  return `<dialog class="drawer" aria-label="${u.menu}">
  <div class="drawer-head">
    <span class="drawer-title">${esc(u.site)}</span>
    <button class="icon-btn drawer-close" type="button" aria-label="${u.close}">${ICON.close}</button>
  </div>
  <nav>
    <a class="drawer-home" href="index.html"${cur('00-home')}>${ICON.home}<span>${u.home}</span></a>
    <p class="drawer-label">${u.chapters}</p>
    <ol>${items}</ol>
    <ul class="drawer-extra">
      <li><a href="glossary.html"${cur('glossary')}>${u.glossary}</a></li>
      <li><a href="sources.html"${cur('sources')}>${u.sources}</a></li>
    </ul>
  </nav>
  <div class="drawer-foot">
    <a class="lang" href="${otherHref}" hreflang="${u.otherLang}" lang="${u.otherLang}">${u.other}</a>
    <button class="theme" type="button" aria-label="${u.theme}" title="${u.theme}"><span aria-hidden="true"></span></button>
  </div>
</dialog>`;
}

function bottomNav(lang, pages, current) {
  const u = UI[lang];
  const seq = sequence(pages);
  const i = seq.indexOf(current);
  const prev = i > 0 ? seq[i - 1] : null;
  const next = i >= 0 && i < seq.length - 1 ? seq[i + 1] : null;
  const link = (s, icon, label, cls) => s
    ? `<a class="bn ${cls}" href="${hrefFor(s)}">${icon}<span>${label}</span></a>`
    : `<span class="bn ${cls}" aria-disabled="true">${icon}<span>${label}</span></span>`;
  return `<nav class="bottom-nav" aria-label="${u.mainNav}">
  <a class="bn" href="index.html"${current === '00-home' ? ' aria-current="page"' : ''}>${ICON.home}<span>${u.home}</span></a>
  ${link(prev, ICON.prev, u.prev, 'prev')}
  <button class="bn open-menu" type="button" aria-haspopup="dialog">${ICON.menu}<span>${u.chapters}</span></button>
  ${link(next, ICON.next, u.next, 'next')}
</nav>`;
}

function layout({ lang, title, body, slug, pages, bodyClass = '' }) {
  const u = UI[lang];
  const otherExists = fs.existsSync(path.join(ROOT, 'content', u.otherLang, `${slug}.md`));
  const otherHref = otherExists ? `../${u.otherLang}/${hrefFor(slug)}` : `../${u.otherLang}/index.html`;
  const fullTitle = slug === '00-home' ? u.site : `${title} · ${u.site}`;
  return `<!doctype html>
<html lang="${lang}" dir="${u.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(u.tagline)}">
<meta name="theme-color" content="#12343b">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="alternate" hreflang="${u.otherLang}" href="${otherHref}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Martian+Mono:wght@400;600&family=Reem+Kufi:wght@500;700&family=Noto+Naskh+Arabic:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/style.css">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${u.skip}</a>
<header class="bar">
  <a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span><span>${esc(u.site)}</span></a>
  <nav class="bar-nav" aria-label="${u.topNav}">
    <a class="home-link${slug === '00-home' ? ' is-here' : ''}" href="index.html"${slug === '00-home' ? ' aria-current="page"' : ''}>${ICON.home}<span>${u.home}</span></a>
    ${nav(lang, pages, slug)}
    <a class="lang" href="${otherHref}" hreflang="${u.otherLang}" lang="${u.otherLang}">${u.other}</a>
    <button class="theme" type="button" aria-label="${u.theme}" title="${u.theme}"><span aria-hidden="true"></span></button>
    <button class="icon-btn open-menu" type="button" aria-haspopup="dialog" aria-label="${u.menu}">${ICON.menu}</button>
  </nav>
</header>
${drawer(lang, pages, slug, otherHref)}
<main id="main">
${body}
</main>
<footer class="foot">
  <p>${esc(u.footer)}</p>
  <p><a href="${VIDEO}" target="_blank" rel="noopener">${u.watch}</a> · <a href="glossary.html">${u.glossary}</a> · <a href="sources.html">${u.sources}</a></p>
</footer>
${bottomNav(lang, pages, slug)}
<script src="../assets/site.js" defer></script>
<script src="../assets/widgets.js" defer></script>
</body>
</html>`;
}

function chapterCards(lang, pages) {
  const u = UI[lang];
  return `<ol class="cards">${pages.filter((p) => p.data.chapter).map((p, i) => {
    const n = String(p.data.chapter).padStart(2, '0');
    return `<li class="card" style="--i:${i}"><a href="${hrefFor(p.slug)}">
      <span class="card-n">${n}</span>
      <span class="card-t">${esc(p.data.title)}</span>
      <span class="card-m">${u.inVideo} · ${esc(p.data.starts)}</span>
    </a></li>`;
  }).join('')}</ol>`;
}

function buildLang(lang) {
  const u = UI[lang];
  const pages = load(lang);
  if (!pages.length) return;
  const outDir = path.join(OUT, lang);
  fs.mkdirSync(outDir, { recursive: true });
  const chapters = pages.filter((p) => p.data.chapter);

  for (const p of pages) {
    let html = renderMarkdown(p.content, lang);
    let body;
    if (p.slug === '00-home') {
      html = html.replace(/<h1>.*?<\/h1>/s, '');
      html = html.replace('<!-- chapters -->', chapterCards(lang, pages));
      body = `<section class="hero">
  <div class="lattice" aria-hidden="true"></div>
  <p class="kicker">${esc(p.data.kicker || u.tagline)}</p>
  <h1>${esc(p.data.title)}</h1>
  <p class="sub">${esc(p.data.subtitle || '')}</p>
  <a class="btn" href="${VIDEO}" target="_blank" rel="noopener"><span aria-hidden="true">▶</span> ${u.watch} · ${esc(p.data.length || '')}</a>
  <figure class="hero-fig draw" aria-hidden="true">
    <svg viewBox="0 0 420 300">
      <g class="axes"><path d="M30 20 V260 H400"/></g>
      <path class="band" d="M250 250 C 290 245 300 120 318 92 L 330 92 C 336 120 344 245 372 250 Z"/>
      <path class="ln" style="--len:1400" d="M30 252 L60 248 L80 254 L100 249 L120 252 L140 247 L160 253 L180 250 L200 248 L220 252 L240 246 L260 240 L280 215 L295 175 L308 120 L318 60 L324 30 L330 250 L345 252 L360 249 L380 253 L400 250"/>
      <circle class="dot" cx="324" cy="30" r="6"/>
      <text x="300" y="20" class="fig-t">12×</text>
      <text x="336" y="104" class="fig-t soft">3–4×</text>
      ${lang === 'ar' ? '<text x="400" y="292" class="fig-t cap" text-anchor="end">شكل 0 · ذروة العيد</text>' : '<text x="30" y="290" class="fig-t">' + u.fig + ' 0 · The Eid peak</text>'}
    </svg>
  </figure>
</section>
<article class="prose home reveal">${html}</article>`;
    } else if (p.data.chapter) {
      html = html.replace(/<h1>.*?<\/h1>/s, '');
      const idx = chapters.indexOf(p);
      const prev = chapters[idx - 1];
      const next = chapters[idx + 1];
      const n = String(p.data.chapter).padStart(2, '0');
      body = `<section class="chapter-head">
  <div class="lattice" aria-hidden="true"></div>
  <span class="big-n" aria-hidden="true">${n}</span>
  <p class="kicker">${u.chapter} ${p.data.chapter} / ${chapters.length}</p>
  <h1>${esc(p.data.title)}</h1>
  <a class="ts big" href="${VIDEO}&t=${secs(p.data.starts)}s" target="_blank" rel="noopener"><span aria-hidden="true">▶</span>${u.watchFrom} ${esc(p.data.starts)}</a>
</section>
<article class="prose reveal">${html}</article>
<nav class="pager">
  ${prev ? `<a class="prev" href="${hrefFor(prev.slug)}"><small>${u.prev}</small>${esc(prev.data.title)}</a>` : '<span></span>'}
  ${next ? `<a class="next" href="${hrefFor(next.slug)}"><small>${u.next}</small>${esc(next.data.title)}</a>` : `<a class="next" href="glossary.html"><small>${u.next}</small>${u.glossary}</a>`}
</nav>`;
    } else {
      body = `<section class="chapter-head plain"><div class="lattice" aria-hidden="true"></div></section><article class="prose reveal">${html}</article>`;
    }
    const title = p.data.title || '';
    fs.writeFileSync(path.join(outDir, hrefFor(p.slug)), layout({ lang, title, body, slug: p.slug, pages, bodyClass: p.slug === '00-home' ? 'is-home' : '' }));
  }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f); const d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(path.join(ROOT, 'site'), OUT);
for (const lang of LANGS) buildLang(lang);
console.log('Built to', OUT);
