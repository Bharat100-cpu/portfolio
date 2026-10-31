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
  if (e.isIntersecting) links.forEach((l) => { const on = l.dataset.nav === e.target.id; l.classList.toggle('act', on); if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
}), { rootMargin: '-30% 0px -60% 0px' });
secs.forEach((s) => navIo.observe(s));

// Copy email: any button.copy[data-copy].
document.addEventListener('click', async (e) => {
  const b = e.target.closest?.('.copy');
  if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); say('Email copied'); } catch { say(b.dataset.copy); }
});

// Starfield for the space theme: twinkling points of light that streak and drift faster with scroll velocity.
// Paused when hidden; static under reduced motion; fewer stars and DPR 1 on low-end devices.
(() => {
  const cv = document.getElementById('stars');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const tints = ['255,255,255', '255,255,255', '200,220,255', '255,233,168', '190,170,255'];
  let stars = [], w = 0, h = 0, raf = 0, lastY = scrollY, lastT = 0, vel = 0, drift = 0;
  const build = () => {
    const dpr = lowEnd ? 1 : Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(lowEnd ? 200 : 520, Math.round(w * h / (lowEnd ? 5200 : 3200)));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() ** 3 * 1.9 + 0.35,
      t: tints[(Math.random() * tints.length) | 0], p: Math.random() * 6.28, s: 0.4 + Math.random() * 1.4, z: Math.random(),
    }));
  };
  const draw = (time) => {
    // Scroll velocity (px/s), eased back to calm; clamped so a jump-scroll never produces giant streaks.
    const dt = Math.max(1, time - lastT || 16);
    const y0 = scrollY;
    const inst = reduce ? 0 : Math.max(-4000, Math.min(4000, (y0 - lastY) / dt * 1000));
    lastY = y0; lastT = time;
    vel += (inst - vel) * (Math.abs(inst) > Math.abs(vel) ? 0.25 : 0.06);
    if (Math.abs(vel) < 4) vel = 0;
    drift += vel * dt / 1000 * 0.05;
    const warp = Math.min(1, Math.abs(vel) / 2500);
    const dir = vel < 0 ? -1 : 1;
    ctx.clearRect(0, 0, w, h);
    const k = y0 * 0.04 + drift;
    ctx.lineCap = 'round';
    for (const s of stars) {
      const a = reduce ? 0.8 : 0.45 + 0.55 * Math.sin(time / 1000 * s.s + s.p) ** 2;
      const depth = 0.3 + s.z;
      const y = (((s.y - k * depth) % h) + h) % h;
      const len = warp * (3 + 26 * s.z) ;
      if (len > 2.5) {
        ctx.strokeStyle = `rgba(${s.t},${a * (1 - warp * 0.25)})`;
        ctx.lineWidth = s.r * 1.1;
        ctx.beginPath(); ctx.moveTo(s.x, y); ctx.lineTo(s.x, y + dir * len); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(${s.t},${a})`;
        ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.2) { ctx.fillStyle = `rgba(${s.t},${a * 0.12})`; ctx.beginPath(); ctx.arc(s.x, y, s.r * 4, 0, 6.283); ctx.fill(); }
      }
    }
    if (!reduce) raf = requestAnimationFrame(draw);
  };
  const on = () => { cancelAnimationFrame(raf); if (root.dataset.theme === 'space') { cv.style.display = ''; lastY = scrollY; lastT = 0; vel = 0; build(); raf = requestAnimationFrame(draw); } else cv.style.display = 'none'; };
  addEventListener('resize', () => { if (root.dataset.theme === 'space') build(); });
  addEventListener('theme-changed', on);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) on(); });
  on();
})();

// Scroll polish: progress hairline, sticky mini-path, hero parallax, direction-aware stagger reveals, count-up.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.querySelector('[data-progress]');
  const sp = document.querySelector('[data-sticky-path]');
  const gnav = document.querySelector('.gnav');
  const hero = document.getElementById('top');
  const avatar = hero?.querySelector('.rh-avatar');
  const path = hero?.querySelector('.rh-path');
  const stageLis = sp ? [...sp.querySelectorAll('li')] : [];
  const stageEls = ['credentials', 'experience', 'work', 'skills', 'contact'].map((id) => document.getElementById(id));
  const skillsEl = stageEls[3];

  // Stagger children of each reveal panel (--i), capped so long lists do not drag.
  document.querySelectorAll('.rv').forEach((el) => {
    const list = el.querySelector(':scope > :is(ol,ul,dl,.sk-wrap,.cr-list,.dp-list)');
    const kids = [...el.children, ...(list ? [...(list.querySelector('.sk-sets') || list).children] : [])];
    kids.forEach((k, i) => { k.classList.add('st'); k.style.setProperty('--i', Math.min(i, 9)); });
    el.classList.add('st-host');
  });
  const doneIo = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { doneIo.unobserve(e.target); setTimeout(() => e.target.classList.add('done'), 1600); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.rv').forEach((el) => doneIo.observe(el));
  if (reduce) document.querySelectorAll('.rv').forEach((el) => el.classList.add('in', 'done'));

  // Count-up for real numerals ("4 yrs", "4 years on Salesforce"): final text is already in the HTML.
  const counters = [...document.querySelectorAll('.rh-fields dd, .dp-row dd > span:first-child')].filter((d) => /^\s*\d+\s*(yrs?|years)\b/i.test(d.textContent));
  counters.forEach((d) => {
    const m = d.textContent.match(/^(\s*)(\d+)(.*)$/s);
    const n = +m[2];
    d.textContent = '';
    const out = document.createElement('span'); out.className = 'cu'; out.setAttribute('aria-hidden', 'true'); out.textContent = n;
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = n;
    d.append(m[1], out, sr, m[3]);
    if (reduce) return;
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.disconnect();
      const t0 = performance.now(), dur = 900;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        out.textContent = Math.round(n * (1 - (1 - p) ** 3));
        if (p < 1) requestAnimationFrame(step); else out.textContent = n;
      };
      out.textContent = 0; requestAnimationFrame(step);
    }), { threshold: 0.6 });
    cio.observe(d);
  });

  // One passive scroll listener -> one rAF: read phase, then write phase.
  let ticking = false, prevY = scrollY, shown = null, cur = -1;
  const setGnavH = () => root.style.setProperty('--gnav-h', (gnav ? gnav.offsetHeight : 57) + 'px');
  setGnavH();
  const frame = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const gh = gnav ? gnav.offsetHeight : 57;
    const pathBottom = path ? path.getBoundingClientRect().bottom : 0;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const tops = stageEls.map((e) => (e ? e.getBoundingClientRect() : null));
    // write
    if (bar) bar.style.setProperty('--p', Math.min(1, y / max).toFixed(4));
    if (Math.abs(y - prevY) > 2) { root.dataset.sdir = y < prevY ? 'up' : 'down'; prevY = y; }
    if (!reduce && hero && heroBottom > -200) {
      hero.style.setProperty('--hp-a', (Math.min(y, 400) * 0.08).toFixed(2));
      hero.style.setProperty('--hp-t', (Math.min(y, 400) * 0.04).toFixed(2));
    }
    if (sp) {
      const show = pathBottom < gh;
      if (show !== shown) { shown = show; sp.classList.toggle('on', show); sp.setAttribute('aria-hidden', String(!show)); sp.querySelectorAll('a').forEach((a) => a.tabIndex = show ? 0 : -1); }
      // Active stage: last of Build/Integrate/Automate whose top passed 40% of the viewport; Ship after Skills or at page end.
      let idx = 0;
      for (let i = 1; i <= 3; i++) if (tops[i] && tops[i].top <= vh * 0.4) idx = i;
      if ((skillsEl && tops[3] && tops[3].bottom < vh * 0.45) || y >= max - 8) idx = 4;
      if (idx !== cur) { cur = idx; stageLis.forEach((li, i) => { li.classList.toggle('cur', i === idx); li.classList.toggle('done', i < idx); }); }
    }
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { setGnavH(); req(); }, { passive: true });
  document.addEventListener('visibilitychange', req);
  frame();
})();
