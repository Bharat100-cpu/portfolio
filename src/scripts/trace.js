// Scroll-as-playhead over a persistent execution-trace rail, ending in a computed receipt.
// Every number shown is counted from the live DOM. Motion is transform/opacity only.
const nav = document.querySelector('[data-trace-rail]');

if (nav) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = nav) => r.querySelector(s);
  const bar = $('.trace__bar');
  const headEl = $('.trace__head');
  const segsEl = $('.trace__segs');
  const clockEl = $('[data-clock]');
  const linesEl = $('[data-lines]');
  const ledger = $('[data-ledger]');
  const toggle = $('[data-ledger-toggle]');
  const catKeys = [...nav.querySelectorAll('[data-l-cat]')].map((e) => e.dataset.lCat);
  const L = (k) => $(`[data-l="${k}"]`);

  // ---- model: one item per section that exists on this page
  const items = [];
  nav.querySelectorAll('[data-seg]').forEach((a) => {
    const sec = document.getElementById(a.dataset.seg);
    const li = a.closest('li');
    if (!sec || !sec.hasAttribute('data-trace')) { li.hidden = true; return; }
    const label = sec.dataset.trace;
    a.querySelector('.seg__label').textContent = label;
    if (sec.dataset.cat) a.dataset.cat = sec.dataset.cat;
    a.setAttribute('aria-label', `Jump to ${label.replace(/_/g, ' ').toLowerCase()}`);
    items.push({
      sec, a, li, label, t: 0, state: '', fillV: -1, n: 0,
      fill: a.querySelector('.seg__fill'), nEl: a.querySelector('.seg__n'),
      w: 1,
    });
  });
  if (!items.length) { nav.classList.add('is-empty'); }
  const idxOf = new Map(items.map((it, i) => [it.sec, i]));

  // ---- log events (.ev) and their category + owning section
  let evs = [];
  const seen = new Set();
  const collect = () => {
    evs = [...document.querySelectorAll('.ev')].map((el) => {
      const host = el.closest('section[data-trace]');
      const catEl = el.closest('[data-cat]');
      return { el, idx: host && idxOf.has(host) ? idxOf.get(host) : -1, cat: catEl ? catEl.dataset.cat : '' };
    });
    items.forEach((it, i) => { it.n = evs.filter((e) => e.idx === i).length; });
  };
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => {
        let add = false;
        es.forEach((e) => { if (e.isIntersecting && !seen.has(e.target)) { seen.add(e.target); add = true; } });
        if (add) { dirty = true; schedule(); }
      })
    : null;

  // ---- geometry
  let max = 1, vh = 1, barW = 1;
  const geometry = () => {
    vh = innerHeight;
    max = Math.max(1, document.documentElement.scrollHeight - vh);
    barW = segsEl.clientWidth || bar.clientWidth;
    const n = items.length;
    if (!n) return;
    const eps = Math.min(24, max / (n + 1));
    const sy = scrollY;
    items.forEach((it, i) => {
      const top = it.sec.getBoundingClientRect().top + sy;
      it.t = Math.min(Math.max(top - vh * 0.35, 0), max);
    });
    items[0].t = 0;
    for (let i = 1; i < n; i++) items[i].t = Math.max(items[i].t, items[i - 1].t + eps);
    for (let i = n - 1; i >= 0; i--) items[i].t = Math.min(items[i].t, max - (n - 1 - i) * eps);
    // segment width = half equal share, half the real scroll distance it owns
    let sum = 0;
    items.forEach((it, i) => {
      const end = i < n - 1 ? items[i + 1].t : max;
      it.span = Math.max(end - it.t, 1);
      it.w = 0.5 / n + 0.5 * (it.span / max);
      sum += it.w;
    });
    let x = 0;
    items.forEach((it) => {
      it.w /= sum;
      it.x0 = x; x += it.w;
      it.li.style.flexGrow = String(Math.round(it.w * 1000));
    });
    barW = segsEl.clientWidth || barW;
  };

  // ---- state
  let hi = -1;            // high-water section index: stamps stay
  let cur = 0;
  let cmds = 0;
  let dirty = true;
  let open = false, autoOpened = false, userTouched = false, autoTimer = 0;
  let ticking = false;
  let lastClock = '', lastLines = -1, lastX = -1, lastSig = '';

  const fmt = (p) => {
    const s = p * 60;
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0') + '.' + Math.floor((s * 10) % 10);
  };

  const counts = () => {
    const by = Object.fromEntries(catKeys.map((k) => [k, 0]));
    let lines = 0;
    evs.forEach((e) => {
      if ((e.idx >= 0 && e.idx < hi) || seen.has(e.el)) {
        lines++;
        if (e.cat in by) by[e.cat]++;
      }
    });
    return { lines, by };
  };

  const renderLedger = () => {
    const { lines, by } = counts();
    const det = document.querySelectorAll('details');
    const detOpen = document.querySelectorAll('details[open]').length;
    L('sections').textContent = String(hi + 1);
    L('sections-of').textContent = ` of ${items.length}`;
    L('lines').textContent = String(lines);
    L('lines-of').textContent = ` of ${evs.length} on page`;
    L('details').textContent = String(detOpen);
    L('details-of').textContent = ` of ${det.length}`;
    L('cmds').textContent = String(cmds);
    const top = Math.max(1, ...Object.values(by));
    catKeys.forEach((k) => {
      $(`[data-l-cat="${k}"]`).textContent = String(by[k]);
      $(`[data-l-bar="${k}"]`).style.transform = `scaleX(${by[k] / top})`;
    });
    return lines;
  };

  const setOpen = (v, auto = false) => {
    open = v;
    nav.classList.toggle('is-open', v);
    toggle.setAttribute('aria-expanded', String(v));
    ledger.inert = !v;
    if (v) { autoOpened = auto; dirty = true; schedule(); }
  };

  const frame = () => {
    ticking = false;
    const y = Math.min(Math.max(scrollY, 0), max);
    const n = items.length;
    let x = y / max; // fallback with no sections
    if (n) {
      cur = 0;
      for (let i = 0; i < n; i++) if (y >= items[i].t - 0.5) cur = i;
      if (cur > hi) { hi = cur; dirty = true; }
      const c = items[cur];
      const local = Math.min(Math.max((y - c.t) / c.span, 0), 1);
      x = c.x0 + local * c.w;
      items.forEach((it, i) => {
        const st = i === cur ? 'cur' : i <= hi ? 'done' : 'todo';
        if (st !== it.state) {
          const first = it.state === '';
          it.state = st;
          it.a.classList.toggle('is-current', st === 'cur');
          it.a.classList.toggle('is-stamped', st !== 'todo');
          if (st === 'cur') it.a.setAttribute('aria-current', 'location'); else it.a.removeAttribute('aria-current');
          if (!first && st !== 'todo' && !reduce.matches) {
            it.a.classList.remove('is-stamping'); void it.a.offsetWidth; it.a.classList.add('is-stamping');
          }
          it.nEl.textContent = st === 'todo' || !it.n ? '' : String(it.n);
        }
        const f = i < cur ? 1 : i === cur ? local : (i <= hi ? 1 : 0);
        const fv = Math.round(f * 500) / 500;
        if (fv !== it.fillV) { it.fillV = fv; it.fill.style.transform = `scaleX(${fv})`; }
      });
    }
    const px = Math.round(x * barW * 10) / 10;
    if (px !== lastX) { lastX = px; headEl.style.transform = `translate3d(${px}px,0,0)`; }
    const clk = fmt(y / max);
    if (clk !== lastClock) { lastClock = clk; clockEl.textContent = clk; }

    const atEnd = n && hi === n - 1 && y >= max - 4;
    nav.classList.toggle('is-ready', !!n && hi === n - 1);

    if (dirty || open) {
      dirty = false;
      const lines = renderLedger();
      if (lines !== lastLines) { lastLines = lines; linesEl.textContent = String(lines); }
    }

    // receipt: opens itself once when the visitor settles at the very bottom
    if (atEnd && !autoOpened && !userTouched && !open && !autoTimer) {
      autoTimer = setTimeout(() => {
        autoTimer = 0;
        const typing = document.activeElement && document.activeElement.matches('input,textarea');
        if (!userTouched && !typing && scrollY >= max - 8) { setOpen(true, true); userTouched = false; autoOpened = true; }
      }, 900);
    }
    if (!atEnd && autoTimer) { clearTimeout(autoTimer); autoTimer = 0; }
    if (open && autoOpened && !userTouched && max - y > 160) setOpen(false);
  };

  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  // ---- wiring
  const init = () => {
    collect();
    if (io) evs.forEach((e) => io.observe(e.el));
    geometry();
    dirty = true;
    schedule();
  };
  const relayout = () => { geometry(); dirty = true; schedule(); };

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', relayout);
  addEventListener('load', () => { collect(); if (io) evs.forEach((e) => io.observe(e.el)); relayout(); });
  if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(document.body);
  document.fonts && document.fonts.ready.then(relayout);

  addEventListener('cmd-run', (e) => { if (!e.detail || e.detail.ok !== false) cmds++; dirty = true; schedule(); });
  document.addEventListener('toggle', (e) => { if (e.target instanceof HTMLDetailsElement) { dirty = true; schedule(); relayoutSoon(); } }, true);
  let rl = 0;
  function relayoutSoon() { clearTimeout(rl); rl = setTimeout(relayout, 60); }

  toggle.addEventListener('click', () => { userTouched = true; setOpen(!open); });
  $('[data-ledger-close]').addEventListener('click', () => { userTouched = true; setOpen(false); toggle.focus(); });
  $('[data-ledger-top]').addEventListener('click', () => { setOpen(false); });
  nav.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { userTouched = true; setOpen(false); toggle.focus(); } });
  document.addEventListener('focusin', (e) => {
    if (open && autoOpened && !userTouched && e.target.matches && e.target.matches('input,textarea')) setOpen(false);
  });
  items.forEach((it) => it.a.addEventListener('click', (e) => {
    // smooth when allowed; the native hash jump remains the fallback
    if (reduce.matches) return;
    e.preventDefault();
    it.sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${it.sec.id}`);
  }));

  setOpen(false);
  nav.classList.add('is-live');
  init();
}
