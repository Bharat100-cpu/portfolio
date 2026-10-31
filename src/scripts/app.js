const root = document.documentElement;
const toast = document.querySelector('.toast');
const say = (t) => { toast.textContent = t; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); };
window.addEventListener('toast', (e) => say(e.detail));

// Theme: lightning | dreamforce | trailhead. Also settable from the console via a 'set-theme' event.
const themeBtns = [...document.querySelectorAll('[data-set-theme]')];
const setTheme = (t) => {
  if (!['space', 'lightning', 'dreamforce', 'trailhead'].includes(t)) return;
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

// Starfield for the space theme: twinkling points of light, paused when hidden or reduced-motion.
(() => {
  const cv = document.getElementById('stars');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tints = ['255,255,255', '255,255,255', '200,220,255', '255,233,168', '190,170,255'];
  let stars = [], w = 0, h = 0, raf = 0;
  const build = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(520, Math.round(w * h / 3200));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() ** 3 * 1.9 + 0.35,
      t: tints[(Math.random() * tints.length) | 0], p: Math.random() * 6.28, s: 0.4 + Math.random() * 1.4, z: Math.random(),
    }));
  };
  const draw = (time) => {
    ctx.clearRect(0, 0, w, h);
    const k = scrollY * 0.04;
    for (const s of stars) {
      const a = reduce ? 0.8 : 0.45 + 0.55 * Math.sin(time / 1000 * s.s + s.p) ** 2;
      const y = (((s.y - k * (0.3 + s.z)) % h) + h) % h;
      ctx.fillStyle = `rgba(${s.t},${a})`;
      ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.283); ctx.fill();
      if (s.r > 1.2) { ctx.fillStyle = `rgba(${s.t},${a * 0.12})`; ctx.beginPath(); ctx.arc(s.x, y, s.r * 4, 0, 6.283); ctx.fill(); }
    }
    if (!reduce) raf = requestAnimationFrame(draw);
  };
  const on = () => { cancelAnimationFrame(raf); if (root.dataset.theme === 'space') { cv.style.display = ''; build(); raf = requestAnimationFrame(draw); } else cv.style.display = 'none'; };
  addEventListener('resize', () => { if (root.dataset.theme === 'space') build(); });
  addEventListener('theme-changed', on);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) on(); });
  on();
})();
