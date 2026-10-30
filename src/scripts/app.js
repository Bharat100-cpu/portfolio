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
  document.querySelectorAll('.card').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--cx', e.clientX - r.left + 'px');
    c.style.setProperty('--cy', e.clientY - r.top + 'px');
  }));
}

// Nav highlight for the section in view.
const links = [...document.querySelectorAll('[data-nav]')];
const secs = [...new Set(links.map((l) => l.dataset.nav))].map((id) => document.getElementById(id));
const navIo = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((l) => l.classList.toggle('act', l.dataset.nav === e.target.id));
}), { rootMargin: '-35% 0px -55% 0px' });
secs.forEach((s) => navIo.observe(s));

// "The stack follows you": tiles light up for the project or role nearest the viewport centre.
const tiles = [...document.querySelectorAll('.tile')];
const ctx = document.querySelector('.stack-ctx');
const items = [...document.querySelectorAll('[data-stack]')];
let active = null;
const apply = (el) => {
  if (el === active) return;
  active = el;
  const set = new Set(el.dataset.stack.split('|'));
  tiles.forEach((t) => t.classList.toggle('on', set.has(t.dataset.skill)));
  if (ctx) ctx.textContent = el.dataset.ctx;
  items.forEach((i) => i.classList.toggle('focus', i === el && i.classList.contains('card')));
};
const pick = () => {
  const mid = innerHeight * 0.5;
  let best = null, bd = Infinity;
  for (const el of items) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) continue;
    const d = r.top <= mid && r.bottom >= mid ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
    // Prefer the smaller (more specific) element when several contain the centre.
    // Side-by-side cards: a tiny horizontal bias so they do not tie.
    const score = d * 1000 + r.height + Math.abs((r.left + r.right) / 2 - innerWidth * 0.66) * 0.01;
    if (score < bd) { bd = score; best = el; }
  }
  if (best) apply(best);
};
let tick = false;
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; pick(); }); } }, { passive: true });
addEventListener('resize', pick);
pick();
// Hovering a card also points the rail at it.
document.querySelectorAll('.card[data-stack]').forEach((c) => c.addEventListener('pointerenter', () => apply(c)));

// Copy email.
const toast = document.querySelector('.toast');
document.querySelector('.copy')?.addEventListener('click', async (e) => {
  const b = e.currentTarget;
  try { await navigator.clipboard.writeText(b.dataset.copy); toast.textContent = 'Email copied'; }
  catch { toast.textContent = b.dataset.copy; }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});
