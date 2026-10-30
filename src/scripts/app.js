const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll.
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.1 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Cursor spotlight and per-card glow.
if (!reduce) {
  addEventListener('pointermove', (e) => {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
  document.querySelectorAll('.card, .spot').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--cx', e.clientX - r.left + 'px');
    c.style.setProperty('--cy', e.clientY - r.top + 'px');
  }));
}

// Scroll progress bar.
const onScroll = () => {
  const h = root.scrollHeight - innerHeight;
  root.style.setProperty('--p', h > 0 ? Math.min(1, scrollY / h) : 0);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Nav highlight for the section in view.
const links = [...document.querySelectorAll('[data-nav]')];
const secs = [...new Set(links.map((l) => l.dataset.nav))].map((id) => document.getElementById(id)).filter(Boolean);
const navIo = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((l) => l.classList.toggle('act', l.dataset.nav === e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
secs.forEach((s) => navIo.observe(s));

// Copy email.
const toast = document.querySelector('.toast');
document.querySelector('.copy')?.addEventListener('click', async (e) => {
  const b = e.currentTarget;
  try { await navigator.clipboard.writeText(b.dataset.copy); toast.textContent = 'Email copied'; }
  catch { toast.textContent = b.dataset.copy; }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});
