const root = document.documentElement;
const toast = document.querySelector('.toast');
const say = (t) => { toast.textContent = t; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); };
window.addEventListener('toast', (e) => say(e.detail));

// Theme: lightning | dreamforce | trailhead. Also settable from the console via a 'set-theme' event.
const themeBtns = [...document.querySelectorAll('[data-set-theme]')];
const setTheme = (t) => {
  if (!['lightning', 'dreamforce', 'trailhead'].includes(t)) return;
  root.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch {}
  themeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setTheme === t)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--brand').trim());
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: t }));
};
themeBtns.forEach((b) => b.addEventListener('click', () => setTheme(b.dataset.setTheme)));
addEventListener('set-theme', (e) => setTheme(e.detail));
setTheme(root.dataset.theme);

// Reveal on scroll (.rv -> .in).
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.08 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Nav highlight for the section in view (desktop nav and mobile tab bar).
const links = [...document.querySelectorAll('[data-nav]')];
const secs = [...new Set(links.map((l) => l.dataset.nav))].map((id) => document.getElementById(id)).filter(Boolean);
const navIo = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((l) => l.classList.toggle('act', l.dataset.nav === e.target.id));
}), { rootMargin: '-30% 0px -60% 0px' });
secs.forEach((s) => navIo.observe(s));

// Copy email: any button.copy[data-copy].
document.addEventListener('click', async (e) => {
  const b = e.target.closest?.('.copy');
  if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); say('Email copied'); } catch { say(b.dataset.copy); }
});
