// Hero behaviour: typing tagline, org-graph canvas, stat count-up.
(function () {
  const root = document.querySelector('[data-hero]');
  if (!root) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- typing tagline ---------------- */
  const typeEl = root.querySelector('[data-type]');
  const lines = [
    'Database.executeBatch(new Job());',
    'System.enqueueJob(new Chain());',
    '@AuraEnabled public static',
    'Test.startTest(); // 90%+ coverage',
    'Schema.getGlobalDescribe();',
  ];
  if (typeEl) {
    if (reduce) {
      typeEl.textContent = lines[0];
    } else {
      let li = 0, ci = 0, del = false, timer;
      const tick = () => {
        const s = lines[li];
        ci += del ? -1 : 1;
        typeEl.textContent = s.slice(0, ci);
        let d = del ? 28 : 60;
        if (!del && ci === s.length) { del = true; d = 1700; }
        else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; d = 350; }
        timer = setTimeout(tick, d);
      };
      tick();
      document.addEventListener('visibilitychange', () => {
        clearTimeout(timer);
        if (!document.hidden) tick();
      });
    }
  }

  /* ---------------- stat count-up ---------------- */
  const counters = root.querySelectorAll('[data-count]');
  const runCount = (el) => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = end + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : '');
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { runCount(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------------- org graph ---------------- */
  const canvas = root.querySelector('[data-graph]');
  const dataEl = root.querySelector('[data-graph-data]');
  if (!canvas || !dataEl) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let data;
  try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }

  const hue = (cat) => data.cats[cat].hue;
  const col = (cat, a = 1, l = 66) => `hsl(${hue(cat)} 90% ${l}% / ${a})`;
  const catKeys = Object.keys(data.cats);

  let W = 0, H = 0, dpr = 1;
  const nodes = data.nodes.map((n) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0, ph: Math.random() * 6.28, r: 7 }));
  const center = { label: data.center, x: 0, y: 0, r: 15 };
  const edges = [];
  nodes.forEach((a, i) => {
    edges.push([a, center, 'spoke']);
    nodes.slice(i + 1).forEach((b) => { if (a.cat === b.cat) edges.push([a, b, 'cat']); });
  });

  const pointer = { x: -999, y: -999, in: false };
  let hover = null, focusCat = null;

  const layout = () => {
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36;
    center.x = cx; center.y = cy;
    center.r = Math.max(11, Math.min(W, H) * 0.035);
    const byCat = {};
    nodes.forEach((n) => (byCat[n.cat] = byCat[n.cat] || []).push(n));
    catKeys.forEach((k, ci) => {
      const group = byCat[k] || [];
      const base = -Math.PI / 2 + (ci / catKeys.length) * Math.PI * 2;
      const spread = 0.5;
      group.forEach((n, gi) => {
        const off = group.length > 1 ? (gi / (group.length - 1) - 0.5) * spread : 0;
        const ring = R * (0.82 + (gi % 2) * 0.28);
        n.hx = cx + Math.cos(base + off) * ring;
        n.hy = cy + Math.sin(base + off) * ring;
        n.r = Math.max(5, Math.min(W, H) * 0.017);
        if (!n.x && !n.y) { n.x = n.hx; n.y = n.hy; }
      });
    });
  };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
    nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = n.vy = 0; });
    draw(performance.now());
  };

  const physics = (t) => {
    const R = Math.min(W, H) * 0.2;
    for (const n of nodes) {
      const fx = Math.sin(t / 1900 + n.ph) * 6, fy = Math.cos(t / 2300 + n.ph * 1.3) * 6;
      let ax = (n.hx + fx - n.x) * 0.02, ay = (n.hy + fy - n.y) * 0.02;
      if (pointer.in) {
        const dx = n.x - pointer.x, dy = n.y - pointer.y, d = Math.hypot(dx, dy) || 1;
        if (d < R) {
          const f = (1 - d / R);
          // repel up close, gently attract at the edge of the field
          const k = d < R * 0.55 ? f * 2.2 : -f * 0.35;
          ax += (dx / d) * k; ay += (dy / d) * k;
        }
      }
      n.vx = (n.vx + ax) * 0.86; n.vy = (n.vy + ay) * 0.86;
      n.x += n.vx; n.y += n.vy;
    }
  };

  const pickHover = () => {
    hover = null;
    if (!pointer.in) return;
    let best = Infinity;
    for (const n of nodes) {
      const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
      if (d < n.r + 14 && d < best) { best = d; hover = n; }
    }
  };

  const dimmed = (n) => (focusCat && n.cat !== focusCat) || (hover && !(n === hover || n.cat === hover.cat));

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    // edges
    for (const [a, b, kind] of edges) {
      const dim = kind === 'cat' ? dimmed(a) : (hover && a !== hover) || (focusCat && a.cat !== focusCat);
      if (kind === 'spoke') {
        ctx.strokeStyle = col(a.cat, dim ? 0.05 : 0.2);
        ctx.lineWidth = 1;
      } else {
        const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, col(a.cat, dim ? 0.08 : 0.7)); g.addColorStop(1, col(a.cat, dim ? 0.08 : 0.7));
        ctx.strokeStyle = g; ctx.lineWidth = dim ? 1 : 1.6;
      }
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    // nodes
    for (const n of nodes) {
      const dim = dimmed(n), hot = n === hover;
      const pulse = reduce ? 0 : Math.sin(t / 700 + n.ph) * 0.5;
      const rad = n.r + (hot ? 3 : 0) + pulse * 0.6;
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad * 4);
      glow.addColorStop(0, col(n.cat, dim ? 0.1 : hot ? 0.6 : 0.35));
      glow.addColorStop(1, col(n.cat, 0));
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(n.x, n.y, rad * 4, 0, 6.2832); ctx.fill();
      ctx.fillStyle = col(n.cat, dim ? 0.35 : 1, hot ? 78 : 66);
      ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, 6.2832); ctx.fill();
    }
    // center
    const cr = center.r + (reduce ? 0 : Math.sin(t / 900) * 1.2);
    const cg = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, cr * 3.6);
    cg.addColorStop(0, 'rgba(180,200,255,.45)'); cg.addColorStop(1, 'rgba(180,200,255,0)');
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(center.x, center.y, cr * 3.6, 0, 6.2832); ctx.fill();
    const body = ctx.createLinearGradient(center.x - cr, center.y - cr, center.x + cr, center.y + cr);
    body.addColorStop(0, col('lwc')); body.addColorStop(0.5, col('cloud')); body.addColorStop(1, col('apex'));
    ctx.fillStyle = body; ctx.beginPath(); ctx.arc(center.x, center.y, cr, 0, 6.2832); ctx.fill();
    ctx.fillStyle = 'rgba(234,240,255,.92)';
    ctx.font = `600 ${Math.max(11, W * 0.026)}px "Space Grotesk", system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(center.label, center.x, center.y + cr + 8);

    // labels: always for hover / focused category, tiny dim labels otherwise on wide stages
    const fs = Math.max(10, Math.min(13, W * 0.028));
    ctx.font = `500 ${fs}px "JetBrains Mono", ui-monospace, monospace`;
    for (const n of nodes) {
      const hot = n === hover, inFocus = focusCat && n.cat === focusCat;
      if (!hot && !inFocus && W < 420) continue;
      const dim = dimmed(n) && !hot;
      ctx.fillStyle = hot ? '#fff' : dim ? 'rgba(138,151,184,.35)' : 'rgba(200,212,240,.75)';
      const above = n.y < center.y;
      ctx.textAlign = 'center'; ctx.textBaseline = above ? 'bottom' : 'top';
      ctx.fillText(n.label, n.x, n.y + (above ? -(n.r + 7) : n.r + 7));
    }
    if (hover) {
      const text = data.cats[hover.cat].label;
      ctx.font = `600 ${fs - 1}px "JetBrains Mono", ui-monospace, monospace`;
      const w = ctx.measureText(text).width + 18;
      const bx = Math.min(W - w - 6, Math.max(6, hover.x - w / 2)), by = hover.y + (hover.y < center.y ? 26 : -46);
      ctx.fillStyle = 'rgba(8,12,24,.88)'; ctx.strokeStyle = col(hover.cat, 0.8); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx, by, w, 22, 8) : ctx.rect(bx, by, w, 22); ctx.fill(); ctx.stroke();
      ctx.fillStyle = col(hover.cat); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, bx + w / 2, by + 11);
    }
  }

  /* loop control */
  let raf = 0, visible = false;
  const frame = (t) => {
    physics(t); pickHover(); draw(t);
    raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf && visible && !reduce && !document.hidden) raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  const staticRedraw = () => { if (reduce) { pickHover(); draw(0); } };

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.in = true;
    if (reduce) { nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; }); staticRedraw(); }
  });
  const leave = () => { pointer.in = false; pointer.x = pointer.y = -999; hover = null; staticRedraw(); };
  canvas.addEventListener('pointerleave', leave);
  canvas.addEventListener('pointercancel', leave);

  root.querySelectorAll('[data-legend]').forEach((li) => {
    const on = () => { focusCat = li.dataset.legend; li.classList.add('on'); staticRedraw(); };
    const off = () => { focusCat = null; li.classList.remove('on'); staticRedraw(); };
    li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off);
  });

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  resize();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0.05 }).observe(root);
  } else { visible = true; start(); }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
})();
