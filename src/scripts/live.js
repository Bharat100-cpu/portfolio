// Live widgets: Flow runner, Governor limits meter, Developer console. All content comes from data attributes.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
const toast = (t) => window.dispatchEvent(new CustomEvent('toast', { detail: t }));

/* ---------------- Flow ---------------- */
function initFlow() {
  const f = $('[data-flow]');
  if (!f) return;
  const labels = JSON.parse($('[data-flow-labels]', f).textContent);
  const nodes = Object.fromEntries($$('[data-node]', f).map((n) => [n.dataset.node, n]));
  const wires = $$('.wire', f); // 0 start-screen, 1 screen-decision, 2 decision-action, 3 action-end
  const next = $('[data-flow-next]', f), reset = $('[data-flow-reset]', f), state = $('[data-flow-state]', f);
  const radios = $$('input[name="flow-need"]', f);
  let busy = false;

  const setNode = (k, s) => {
    nodes[k].dataset.state = s;
    $('.nbody', nodes[k]).hidden = s === 'todo';
  };
  const wire = (i, on) => { wires[i].classList.toggle('on', on); wires[i].classList.toggle('flowing', false); };
  const setState = (t, run) => { state.textContent = t; f.dataset.run = run; };
  const init = () => {
    f.removeAttribute('data-cat');
    ['decision', 'action', 'end'].forEach((k) => setNode(k, 'todo'));
    nodes.screen.dataset.state = 'active';
    $('.nbody', nodes.screen).hidden = false;
    wires.forEach((_, i) => wire(i, i === 0));
    $$('[data-res]', f).forEach((r) => (r.hidden = true));
    radios.forEach((r) => { r.checked = false; r.disabled = false; });
    next.disabled = true; next.hidden = false; reset.hidden = true;
    $('[data-flow-dec]', f).textContent = 'Matches?';
    $('[data-flow-dec]', f).className = 'dec';
    setState('Waiting for input', 'idle');
  };

  radios.forEach((r) => r.addEventListener('change', () => {
    f.dataset.cat = r.value; next.disabled = false;
    setState(`${labels[r.value]} selected`, 'idle');
  }));

  async function run() {
    const cat = radios.find((r) => r.checked)?.value;
    if (!cat || busy) return;
    busy = true;
    radios.forEach((r) => (r.disabled = true)); next.hidden = true;
    setState('Running…', 'running');
    nodes.screen.dataset.state = 'done';
    wires[1].classList.add('flowing'); await wait(600); wire(1, true);
    setNode('decision', 'active');
    const matches = $$(`[data-res="${cat}"] .reslist li`, f).length;
    const dec = $('[data-flow-dec]', f);
    dec.textContent = `Checking ${labels[cat]} work…`; await wait(700);
    dec.textContent = matches ? `Yes · ${matches} match${matches > 1 ? 'es' : ''} found` : 'No exact match · showing skills';
    dec.className = 'dec yes';
    nodes.decision.dataset.state = 'done';
    wires[2].classList.add('flowing'); await wait(600); wire(2, true);
    setNode('action', 'active');
    $(`[data-res="${cat}"]`, f).hidden = false; await wait(700);
    nodes.action.dataset.state = 'done';
    wires[3].classList.add('flowing'); await wait(500); wire(3, true);
    setNode('end', 'done');
    $('[data-flow-mail]', f).href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(`Interview request: ${labels[cat]} work`)}`;
    reset.hidden = false; busy = false;
    setState('Interview requested', 'done');
    toast('Flow finished: Interview requested');
    window.dispatchEvent(new CustomEvent('flow-finished', { detail: cat }));
    $('[data-flow-mail]', f).focus({ preventScroll: true });
  }
  next.addEventListener('click', run);
  f.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('input[type=radio]')) { e.preventDefault(); run(); } });
  reset.addEventListener('click', () => { init(); radios[0].focus(); });
  init();
}

/* ---------------- Limits ---------------- */
const limits = { sections: new Set(), projects: new Set(), themes: new Set(), commands: 0 };
function initLimits() {
  const p = $('[data-limits]');
  if (!p) return;
  const row = (k) => $(`[data-meter="${k}"]`, p);
  let done = false;
  const render = () => {
    let all = true;
    for (const k of Object.keys(limits)) {
      const el = row(k), max = +el.dataset.max;
      const v = Math.min(max, k === 'commands' ? limits[k] : limits[k].size);
      $('[data-val]', el).textContent = `${v}/${max}`;
      $('i', el).style.width = `${(v / max) * 100}%`;
      const bar = $('.bar', el);
      bar.setAttribute('aria-valuenow', v); bar.setAttribute('aria-valuetext', `${v} of ${max}`);
      el.classList.toggle('full', v >= max);
      if (v < max) all = false;
    }
    if (all && !done) {
      done = true;
      $('[data-lim-done]', p).hidden = false;
      p.classList.add('over');
      toast('Limit reached: LIMIT.EXCEEDED');
    }
  };
  // sections
  const max = +row('sections').dataset.max;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { limits.sections.add(e.target.id); render(); }
  }), { rootMargin: '0px 0px -30% 0px' });
  ['top', 'experience', 'work', 'skills', 'credentials', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  void max;
  // themes (the active theme counts as the first one)
  limits.themes.add(document.documentElement.dataset.theme);
  addEventListener('theme-changed', (e) => { limits.themes.add(e.detail); render(); });
  // projects opened: click or <details> toggle inside #work
  const work = document.getElementById('work');
  if (work) {
    const key = (t) => {
      const card = t.closest('[data-project],article,details,li,.card');
      if (!card || card === work) return null;
      return card.dataset.project || $('h3,h4,summary,strong', card)?.textContent.trim() || card;
    };
    const mark = (t) => { const k = key(t); if (k && t.closest('a,button,summary,[role=button],[tabindex],details')) { limits.projects.add(k); render(); } };
    work.addEventListener('click', (e) => mark(e.target));
    work.addEventListener('toggle', (e) => { if (e.target.open) mark(e.target); }, true);
    work.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') mark(e.target); });
  }
  addEventListener('project-opened', (e) => { limits.projects.add(e.detail ?? limits.projects.size); render(); });
  addEventListener('console-command', () => { limits.commands++; render(); });
  render();
}

/* ---------------- Console ---------------- */
function initConsole() {
  const dc = $('[data-dc]');
  if (!dc) return;
  const D = JSON.parse(dc.dataset.json);
  const win = $('.dc-win', dc), log = $('[data-dc-log]', dc), input = $('[data-dc-in]', dc);
  const hist = []; let hi = 0, last = null, welcomed = false;
  const THEMES = ['space', 'lightning', 'dreamforce', 'trailhead'];
  const clock = () => new Date().toTimeString().slice(0, 8);

  function row(ev, text, cls = '', href) {
    const r = document.createElement('div');
    r.className = `lr ${cls}`;
    const t = document.createElement('span'); t.className = 't'; t.textContent = clock();
    const e = document.createElement('span'); e.className = 'e'; e.textContent = ev;
    const d = document.createElement('span'); d.className = 'd';
    if (href) { const a = document.createElement('a'); a.href = href; a.textContent = text; if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; } d.append(a); } else d.textContent = text;
    r.append(t, e, d); log.append(r); log.scrollTop = log.scrollHeight;
  }
  const dbg = (t, i = 1) => row('USER_DEBUG', `[${i}]|DEBUG|${t}`);
  const list = (items) => items.forEach((t, i) => dbg(t, i + 1));
  const all = [...D.projects, ...D.solutions];
  const mail = D.links.email;

  const commands = {
    help: () => {
      row('USER_INFO', 'Available commands:');
      [['whoami', 'who is this record'], ['skills', 'skills by group'], ['certs', 'certifications and superbadges'], ['projects', 'projects and solutions'], ['experience', 'roles'], ['contact', 'ways to reach me'], ['theme <lightning|dreamforce|trailhead>', 'switch theme'], ['clear', 'empty the log']].forEach(([c, d]) => row('', `${c.padEnd(40)} ${d}`));
      row('', "Also try: System.debug('hi');  Database.executeBatch(new Hire());");
    },
    whoami: () => { dbg(`${D.profile.name} · ${D.profile.role}`); dbg(D.profile.location); D.profile.about.slice(0, 1).forEach((a) => dbg(a, 2)); },
    skills: () => D.skillGroups.forEach(([g, v], i) => dbg(`${g}: ${v}`, i + 1)),
    certs: () => {
      list(D.certifications.map((c) => `Salesforce Certified ${c.name}`));
      D.superbadges.forEach((s) => row('USER_DEBUG', `${s.name} (${s.sub})`));
    },
    projects: () => all.forEach((p, i) => { dbg(`${p.title}: ${p.headline}`, i + 1); row('', `   stack: ${p.stack.join(', ')}`); }),
    experience: () => D.roles.forEach((r, i) => { dbg(`${r.title} @ ${r.company} (${r.when})`, i + 1); row('', `   ${r.stack.join(', ')}`); }),
    contact: () => {
      row('USER_DEBUG', `Email: ${mail}`, '', `mailto:${mail}`);
      row('USER_DEBUG', 'LinkedIn', '', D.links.linkedin);
      row('USER_DEBUG', 'Trailhead', '', D.links.trailhead);
      row('USER_DEBUG', 'GitHub', '', D.links.github);
    },
    clear: () => { log.textContent = ''; },
  };
  const names = [...Object.keys(commands), 'theme', 'System.debug', 'Database.executeBatch'];

  const lev = (a, b) => {
    const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  };

  function exec(raw) {
    const line = raw.trim().replace(/;+$/, '');
    if (!line) return;
    row('EXECUTE_ANON', `> ${raw.trim()}`, 'cmd');
    window.dispatchEvent(new CustomEvent('console-command', { detail: line }));
    const [w, ...rest] = line.split(/\s+/);
    const cmd = w.toLowerCase();
    let m;
    if (commands[cmd] && !rest.length) { row('EXECUTION_STARTED', cmd, 'ok'); commands[cmd](); return; }
    if (cmd === 'theme') {
      const t = (rest[0] || '').toLowerCase();
      if (THEMES.includes(t)) { window.dispatchEvent(new CustomEvent('set-theme', { detail: t })); row('USER_DEBUG', `Theme set to ${t}`, 'ok'); }
      else row('COMPILE_ERROR', `Invalid theme '${rest[0] || ''}'. Use: theme space | lightning | dreamforce | trailhead`, 'err');
      return;
    }
    if ((m = line.match(/^System\.debug\s*\(\s*(?:(?:LoggingLevel\.\w+)\s*,\s*)?(.*)\)$/i))) {
      let a = m[1].trim(); const q = a.match(/^(['"])([\s\S]*)\1$/);
      row('USER_DEBUG', `[1]|DEBUG|${q ? q[2].replace(/\\'/g, "'") : a}`); return;
    }
    if ((m = line.match(/^Database\.executeBatch\s*\(\s*new\s+(\w+)\s*\(\s*\)\s*(?:,\s*\d+\s*)?\)$/i))) {
      const c = m[1];
      row('EXECUTION_STARTED', 'Execute Anonymous', 'ok');
      row('CODE_UNIT_STARTED', `${c}.start()`);
      if (c.toLowerCase() === 'hire') {
        dbg('Querying: SELECT Id FROM Developer__c WHERE Name = \'Bharat Kumar\' LIMIT 1');
        dbg('execute(): 1 record, 0 errors, 0 governor limits harmed', 2);
        dbg(`finish(): interview invitation queued. Draft it at ${mail}`, 3);
        row('CODE_UNIT_FINISHED', 'Hire.finish()', 'ok');
      } else {
        dbg(`${c}.start(): no class named ${c} in this org, but the batch was very enthusiastic.`);
        row('CODE_UNIT_FINISHED', `${c} (simulated)`, 'ok');
      }
      row('EXECUTION_FINISHED', 'Success', 'ok'); return;
    }
    if (/^select\b/i.test(line)) {
      if (/from\s+skills?(__c)?\b/i.test(line)) { D.skills.forEach((s, i) => dbg(s, i + 1)); row('USER_INFO', `${D.skills.length} rows`, 'ok'); }
      else if (/from\s+project/i.test(line)) { all.forEach((p, i) => dbg(p.title, i + 1)); row('USER_INFO', `${all.length} rows`, 'ok'); }
      else row('USER_INFO', '0 rows. Try: SELECT Name FROM Skill__c', 'ok');
      return;
    }
    const best = names.map((n) => [n, lev(cmd.split('(')[0], n.toLowerCase())]).sort((a, b) => a[1] - b[1])[0];
    const hint = best && best[1] <= Math.max(3, Math.ceil(best[0].length / 2)) ? best[0] : 'help';
    row('COMPILE_ERROR', `Line 1, Column 1: Unexpected token '${w}'. Did you mean '${hint}'? Type help for commands.`, 'err');
  }

  /* open / close / focus trap */
  const focusables = () => $$('button:not([disabled]),input,a[href],[tabindex]:not([tabindex="-1"])', win).filter((e) => !e.closest('[hidden]'));
  function open() {
    if (!dc.hidden) return;
    last = document.activeElement;
    dc.hidden = false; document.documentElement.classList.add('dc-lock');
    if (!welcomed) { welcomed = true; row('EXECUTION_STARTED', 'Developer Console ready', 'ok'); row('USER_INFO', "Type 'help' for commands. Esc closes."); }
    input.focus();
  }
  function close() {
    if (dc.hidden) return;
    dc.hidden = true; document.documentElement.classList.remove('dc-lock');
    last?.focus?.({ preventScroll: true });
  }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-open-console]')) { e.preventDefault(); open(); } });
  $$('[data-dc-close]', dc).forEach((b) => b.addEventListener('click', close));
  addEventListener('keydown', (e) => {
    const typing = e.target.closest?.('input,textarea,select,[contenteditable="true"]');
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); dc.hidden ? open() : close(); return; }
    if (e.key === '`' && !e.metaKey && !e.ctrlKey && !e.altKey && dc.hidden) { if (!typing) { e.preventDefault(); open(); } return; }
    if (dc.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') {
      const f = focusables(); if (!f.length) return;
      const first = f[0], lastEl = f[f.length - 1];
      if (!win.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  });
  $('[data-dc-form]', dc).addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value; input.value = '';
    if (v.trim()) { hist.push(v); hi = hist.length; }
    v.split('\n').forEach(exec);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi]; }
    else if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] ?? ''; }
  });
  $$('[data-dc-cmd]', dc).forEach((b) => b.addEventListener('click', () => { hist.push(b.dataset.dcCmd); hi = hist.length; exec(b.dataset.dcCmd); input.focus(); }));
}

initFlow();
initLimits();
initConsole();
