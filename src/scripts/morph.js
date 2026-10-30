import { tokens, stats, legend, projects, blocks, tiles, scenes, links } from '../data/site.js';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const RESUME = `${BASE}Resume.pdf`;
const mq = window.matchMedia('(min-width: 900px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)');

function start() {
  document.documentElement.classList.add('morph');
  mq.addEventListener('change', () => location.reload());

  const $ = (q) => document.querySelector(q);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const NS = 6;
  const href = (h) => (h === 'RESUME' ? RESUME : h);

  const stage = document.createElement('div');
  stage.id = 'stage';
  stage.setAttribute('aria-hidden', 'true');
  stage.innerHTML =
    '<canvas id="stars"></canvas><div class="neb" id="n1"></div><div class="neb" id="n2"></div>';
  const scroller = document.createElement('div');
  scroller.id = 'scroller';
  const bar = document.createElement('div');
  bar.className = 'pbar';
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'dots';
  const hint = document.createElement('div');
  hint.className = 'hint';
  hint.innerHTML = 'scroll <i></i>';
  document.body.append(bar, dotsWrap, hint, scroller, stage);
  // keyboard users tab through the visible stage links; the clipped static copy stays for screen readers
  document.querySelectorAll('.static a').forEach((a) => a.setAttribute('tabindex', '-1'));

  /* ---------- elements ---------- */
  const els = [];
  function mk(id, cls, faces) {
    const e = document.createElement('div');
    e.className = 'el ' + cls;
    if (id) e.id = id;
    const fs = faces.map(([sc, html, fc, link]) => {
      const f = document.createElement(link ? 'a' : 'div');
      f.className = 'face ' + (fc || '');
      if (link) { f.href = href(link); if (!link.startsWith('mailto') && link !== 'RESUME') { f.target = '_blank'; f.rel = 'noopener'; } }
      f.innerHTML = html;
      e.appendChild(f);
      return { f, scenes: sc, link: !!link };
    });
    stage.appendChild(e);
    els.push({ e, fs });
  }
  const heads = scenes.headings.map((h, i) => [[i], h]);
  const paras = scenes.paragraphs.map((p, i) => [[i], p]);
  mk('H', '', heads);
  mk('P', '', paras);
  mk('O', '', [[[0, 1, 5], '<div class="ring"></div>']]);

  const tileHtml = (t) =>
    (t.img ? `<img src="${BASE}img/${t.img}" alt="">` : `<div class="big">${t.big}</div>`) +
    `<div>${t.name}<br><small>${t.sub.replace(/\//g, '/<wbr>')}</small></div>`;
  tokens.forEach((t, i) =>
    mk('', 'shell', [
      [[0, 1, 2, 3], `<i></i>${t.name}`, 'chip'],
      [[4], tileHtml(tiles[i]), 'badge', tiles[i].href],
    ])
  );
  stats.forEach((s, i) =>
    mk('', 'shell', [
      [[0], `<b>${s[0]}</b><span>${s[1]}</span>`, 'stat'],
      [[1], legend[i], 'legend'],
      [[2], `<div class="k">${projects[i].kicker}</div><h3>${projects[i].title}</h3><p>${projects[i].short}</p>`, 'card' + (i === 0 ? ' big' : '')],
      [[3], `<div class="k">${blocks[i][0]}</div>${blocks[i][1]}`, 'bul'],
      [[4], scenes.pills[i], 'pill', i === 0 ? links.trailhead : undefined],
      [[5], `${scenes.contact[i][0]}<span>${scenes.contact[i][1]}</span>`, 'link', scenes.contact[i][2]],
    ])
  );
  const K = 3 + tokens.length; // index of first stat element

  /* ---------- layouts ---------- */
  const TOKN = tokens.map((t) => t.name);
  function layout(s, W, H) {
    const m = W * 0.07, L = [], u = Math.min(1, H / 900);
    const T = (x, y, w, h, o = 1, bg = 1, rad = 14, ac = 0) => ({ x, y, w, h, o, bg, rad, ac });
    const TW = (i) => TOKN[i].length * 8.2 + 46, CH = 28, CP = 34; // compact chip height / row pitch
    const ring = (cx, cy, rx, ry, i, n, off) => { const a = off + (i * 2 * Math.PI) / n; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; };
    const hero = Math.min(H * 0.6, 420), cxO = W * 0.74, RM = W - 56; // RM: right limit so chips clear the progress dots
    const cl = (x, w) => Math.min(x, RM - w);
    const fsH = [Math.min(88, W * 0.06), Math.min(54, W * 0.04), 52, 52, 52, Math.min(70, W * 0.048)];
    const Hs = [T(m, H * 0.24, W * 0.5, H * 0.3), T(m, H * 0.12, W * 0.6, 80), T(m, H * 0.11, W * 0.6, 80), T(m, H * 0.11, W * 0.6, 80), T(m, H * 0.11, W * 0.6, 80), T(m, H * 0.2, W * 0.5, H * 0.3)];
    const Ps = [T(m, H * 0.58, Math.min(540, W * 0.38), 130), T(m, H * 0.12 + 86, Math.min(520, W * 0.42), 80), T(m, H * 0.11 + 78, W * 0.6, 40), T(m, H * 0.11 + 78, W * 0.7, 40), T(m, H * 0.11 + 78, W * 0.6, 50), T(m, H * 0.46, Math.min(480, W * 0.36), 110)];
    const Os = [T(cxO - hero / 2, H * 0.5 - hero / 2, hero, hero), T(W * 0.64 - 70 * u, H * 0.54 - 70 * u, 140 * u, 140 * u), T(W - m - 56, H * 0.12, 56, 56), T(W - m - 56, H * 0.12, 56, 56), T(W * 0.5 - W * 0.38, H * 0.5 - W * 0.38, W * 0.76, W * 0.76, 0.1), T(cxO - hero * 0.5, H * 0.5 - hero * 0.5, hero, hero)];
    L.push({ ...Hs[s], fs: fsH[s] }, Ps[s], Os[s]);
    const top = H * 0.27, tot = H * 0.64, fw = (W - 2 * m) * 0.38, sw = (W - 2 * m - fw - 40) / 2, sh = (tot - 20) / 2;
    const pc = (i) => (i === 0 ? [m, top, fw, tot] : [m + fw + 20 + ((i - 1) % 2) * (sw + 20), top + Math.floor((i - 1) / 2) * (sh + 20), sw, sh]);
    const half = (W - 2 * m - 20) / 2;
    const bc = (i) => { if (i < 2) { const h = (tot - 20) / 2; return [m, top + i * (h + 20), half, h]; } const h = (tot - 40) / 3; return [m + half + 20, top + (i - 2) * (h + 20), half, h]; };
    const flow = (group, x0, y0, maxw) => {
      let x = 0, row = 0; const out = {};
      group.forEach((k) => { const w = TW(TOKN.indexOf(k)) * 0.9; if (x + w > maxw && x > 0) { x = 0; row++; } out[k] = [x, row]; x += w + 8; });
      const rows = row + 1;
      Object.keys(out).forEach((k) => { const [xx, r] = out[k]; out[k] = [x0 + xx, y0 - (rows - r) * CP + 4]; });
      return out;
    };
    const by = (key, n) => [...Array(n).keys()].map((g) => tokens.filter((t) => t[key] === g).map((t) => t.name));
    const PF = by('project', 5).map((g, p) => { const [x, y, w, h] = pc(p); return flow(g, x + 22, y + h - 18, w - 44); });
    const EF = by('exp', 5).map((g, p) => { const [x, y, w, h] = bc(p); return flow(g, x + 22, y + h - 16, w - 44); });
    tokens.forEach((t, i) => {
      let st;
      if (s === 0) { const [x, y] = ring(cxO, H * 0.5, hero * 0.68, hero * 0.62, i, 12, 0.3); st = T(cl(x - TW(i) / 2, TW(i)), y - 20, TW(i), 40); }
      else if (s === 1) { const r = t.ring, idx = tokens.filter((k) => k.ring === r).indexOf(t); const [x, y] = ring(W * 0.64, H * 0.54, [0.11, 0.19, 0.26][r] * W, [0.14, 0.24, 0.32][r] * H, idx, 4, r * 0.8 + 0.35); st = T(cl(x - TW(i) / 2, TW(i)), y - 20, TW(i), 40); }
      else if (s === 2) { const [x, y] = PF[t.project][t.name]; st = T(x, y, TW(i) * 0.9, CH); }
      else if (s === 3) { const [x, y] = EF[t.exp][t.name]; st = T(x, y, TW(i) * 0.9, CH); }
      else if (s === 4) { const row = i < 6 ? 0 : 1, k = row ? i - 6 : i, gap = 16, tw = Math.min(190, (W - 2 * m - 5 * gap) / 6), th = Math.min(176, H * 0.2), tt = 6 * tw + 5 * gap; st = T(W / 2 - tt / 2 + k * (tw + gap), H * 0.35 + row * (th + 66), tw, th, 1, 1, 18); }
      else { const [x, y] = ring(cxO, H * 0.5, hero * 0.68, hero * 0.62, i, 12, 0.3); st = T(x - 7, y - 7, 14, 14, 1, 1, 7, 1); }
      L.push(st);
    });
    for (let i = 0; i < 5; i++) {
      let st;
      if (s === 0) { const cw = Math.min(160, (W * 0.56 - m) / 5); st = T(m + i * (cw + 10), H * 0.8, cw, 70, 1, 0, 10); }
      else if (s === 1) { const cw = (W - 2 * m) / 5; st = T(m + i * cw, H * 0.9 - 24, cw - 16, 48, 1, 0, 10); }
      else if (s === 2) { const [x, y, w, h] = pc(i); st = T(x, y, w, h, 1, 1, 22); }
      else if (s === 3) { const [x, y, w, h] = bc(i); st = T(x, y, w, h, 1, 1, 18); }
      else if (s === 4) {
        const gap = 16, tw = Math.min(190, (W - 2 * m - 5 * gap) / 6), th = Math.min(176, H * 0.2), tt = 6 * tw + 5 * gap, x0 = W / 2 - tt / 2, y1 = H * 0.35, y2 = y1 + th + 66;
        const pos = [[W - m - 2 * 196, H * 0.11 + 2], [W - m - 196, H * 0.11 + 2], [x0, y1 - 46], [x0, y2 - 46], [x0 + 4 * (tw + gap), y2 - 46]];
        st = T(pos[i][0], pos[i][1], i < 2 ? 188 : i === 2 ? 150 : 140, 34, 1, 1, 999);
      } else { const cw = Math.min(225, (Math.min(W * 0.6, cxO - hero * 0.5 - 60) - m - 28) / 3), x = m + (i % 3) * (cw + 14), y = H * 0.7 + Math.floor(i / 3) * 78; st = T(x, y, cw, 64, 1, 1, 14); }
      L.push(st);
    }
    return L;
  }

  /* ---------- engine ---------- */
  let W = innerWidth, H = innerHeight, Ls = [];
  const cv = $('#stars'), cx = cv.getContext('2d');
  const STARS = [...Array(220)].map(() => ({ x: Math.random(), y: Math.random(), z: 0.2 + Math.random() * 0.8, p: Math.random() * 6.28 }));
  function rebuild() {
    W = innerWidth; H = innerHeight;
    Ls = [...Array(NS).keys()].map((s) => layout(s, W, H));
    scroller.style.height = H * (1 + (NS - 1) * 1.7) + 'px';
    cv.width = W; cv.height = H;
    stage.classList.toggle('compact', H < 820);
  }
  rebuild();
  addEventListener('resize', rebuild);
  for (let i = 0; i < NS; i++) dotsWrap.appendChild(document.createElement('i'));

  // nebula hue shifts per scene; the UI accent stays constant (two-tone palette)
  const TH = {
    bg: ['#04060d', '#050913', '#070711', '#060a14', '#04080f', '#0b0711'],
    n1: ['#1e3a8a', '#0f766e', '#5b21b6', '#1d4ed8', '#0e7490', '#9d174d'],
    n2: ['#312e81', '#1e3a8a', '#1e1b4b', '#312e81', '#1e3a8a', '#7c2d12'],
  };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => 'rgb(' + hex(a).map((v, i) => Math.round(lerp(v, hex(b)[i], t))).join(',') + ')';
  let q = 0, target = 0, eff = 0, last = performance.now();
  const navs = [...document.querySelectorAll('nav [data-s]')];
  const dotEls = [...dotsWrap.children], n1 = $('#n1'), n2 = $('#n2'), root = document.documentElement.style;

  function frame() {
    const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
    const max = document.documentElement.scrollHeight - H;
    target = clamp(scrollY / max) * (NS - 1);
    q += (target - q) * (1 - Math.exp(-dt * 5.5));
    if (Math.abs(target - q) < 0.0004) q = target;
    const i = Math.min(NS - 2, Math.floor(q)), f = q - i, eG = ease(clamp((f - 0.04) / 0.92));
    eff = i + eG;
    bar.style.transform = `scaleX(${clamp(q / (NS - 1))})`;
    hint.style.opacity = clamp(1 - scrollY / 120);
    root.setProperty('--bg', mix(TH.bg[i], TH.bg[i + 1], eG));
    n1.style.background = mix(TH.n1[i], TH.n1[i + 1], eG);
    n2.style.background = mix(TH.n2[i], TH.n2[i + 1], eG);
    n1.style.transform = `translate(${-eff * 70}px,${eff * 90}px)`;
    n2.style.transform = `translate(${eff * 110}px,${-eff * 60}px)`;
    cx.clearRect(0, 0, W, H);
    const t = now / 1000;
    STARS.forEach((s) => {
      const y = (((s.y * H - eff * H * 0.5 * s.z) % H) + H) % H, x = s.x * W;
      cx.globalAlpha = clamp(0.3 + 0.28 * Math.sin(t * 1.2 + s.p) + 0.3 * s.z, 0.1, 1);
      cx.fillStyle = '#fff';
      const r = 0.5 + s.z * 1.1; cx.fillRect(x, y, r, r);
    });
    cx.globalAlpha = 1;
    els.forEach((o, k) => {
      const a = Ls[i][k], b = Ls[i + 1][k], d = (k % 9) * 0.016, fk = ease(clamp((f - 0.04 - d) / 0.78));
      const e = f <= 0.001 ? 0 : f >= 0.999 ? 1 : fk;
      const x = lerp(a.x, b.x, e), y = lerp(a.y, b.y, e) + Math.sin(Math.PI * e) * ((k % 2 ? -1 : 1) * 20);
      const w = lerp(a.w, b.w, e), h = lerp(a.h, b.h, e), op = lerp(a.o, b.o, e);
      const ac = lerp(a.ac, b.ac, e * e * e), bg = lerp(a.bg ?? 1, b.bg ?? 1, e), rad = lerp(a.rad ?? 14, b.rad ?? 14, e);
      const s = o.e.style;
      if (k >= 3 && k < K) s.zIndex = 5;
      s.transform = `translate(${x}px,${y}px)`; s.width = w + 'px'; s.height = h + 'px'; s.opacity = op;
      if (o.e.classList.contains('shell')) {
        s.background = `rgba(${Math.round(lerp(14, 139, ac))},${Math.round(lerp(20, 211, ac))},${Math.round(lerp(46, 255, ac))},${lerp(0.74 * bg, 1, ac)})`; s.borderColor = `rgba(160,185,255,${0.22 * bg})`;
        s.borderRadius = rad + 'px'; s.boxShadow = ac > 0.01 ? `0 0 ${14 * ac}px rgba(139,211,255,${0.7 * ac})` : `0 18px 44px -26px rgba(0,0,0,${0.9 * bg})`; s.overflow = 'hidden';
      }
      if (a.fs !== undefined) s.fontSize = lerp(a.fs, b.fs, e) + 'px';
      o.fs.forEach(({ f: fe, scenes: sc, link }) => {
        const hA = sc.includes(i), hB = sc.includes(i + 1);
        let v = 0;
        if (hA && hB) v = 1; else if (hA) v = 1 - sm(0, 0.42, e); else if (hB) v = sm(0.58, 1, e);
        fe.style.opacity = v;
        if (link) { fe.style.pointerEvents = v > 0.7 ? 'auto' : 'none'; fe.style.visibility = v > 0.02 ? 'visible' : 'hidden'; }
      });
    });
    const sc = Math.round(eff);
    navs.forEach((n) => n.classList.toggle('on', +n.dataset.s === sc));
    dotEls.forEach((d, n) => d.classList.toggle('on', n === sc));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const goto = (s) => { const max = document.documentElement.scrollHeight - H; scrollTo({ top: max * (s / (NS - 1)), behavior: 'smooth' }); };
  navs.forEach((n) => n.addEventListener('click', (ev) => { ev.preventDefault(); goto(+n.dataset.s); }));
  dotEls.forEach((d, n) => d.addEventListener('click', () => goto(n)));
}

if (mq.matches) start();
