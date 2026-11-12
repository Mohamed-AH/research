(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
  // stagger article blocks on load
  document.querySelectorAll('.reveal > *').forEach(function (el, i) { el.style.setProperty('--d', Math.min(i, 14)); });
  // figure labels: "Fig. 5.1"
  var n = (document.querySelector('.big-n') || {}).textContent;
  var fig = root.lang === 'ar' ? 'شكل' : 'Fig.';
  document.querySelectorAll('.widget').forEach(function (w, i) {
    w.setAttribute('data-fig', fig + ' ' + (n ? parseInt(n, 10) + '.' : '') + (i + 1));
  });
  // close the chapter menu when clicking elsewhere
  document.addEventListener('click', function (e) {
    var d = document.querySelector('.toc[open]');
    if (d && !d.contains(e.target)) d.removeAttribute('open');
  });
})();
