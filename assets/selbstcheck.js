/* ==========================================================================
   Selbstcheck wirken
   --------------------------------------------------------------------------
   Reine Frontend-Logik. Kein Backend, kein Tracking.
   Inhalte angelehnt an die Sprache und die Strukturen des Buchs „wirken".
   ========================================================================== */

const lifeAreas = [
  { id: 'beruf',     label: 'Beruf' },
  { id: 'initiative',label: 'Eigene Initiative' },
  { id: 'ngo',       label: 'Verein / NGO' },
  { id: 'unternehmen', label: 'Unternehmen' },
  { id: 'bildung',   label: 'Bildung' },
  { id: 'politik',   label: 'Politik / Gemeinde' },
  { id: 'stiftung',  label: 'Stiftung / Förderung' },
  { id: 'privat',    label: 'Privates Engagement' },
];

const struggles = [
  { id: 'tun',         label: 'Ich komme nicht ins Tun' },
  { id: 'mitstreiter', label: 'Es fehlen Mitstreiter:innen' },
  { id: 'wirkung',     label: 'Die Wirkung bleibt aus' },
];

const dimensions = [
  { id: 'interesse',  label: 'Interesse',  desc: 'Dein echter Antrieb, dein Warum.' },
  { id: 'klarheit',   label: 'Klarheit',   desc: 'Vision, Thema, nächster Schritt.' },
  { id: 'system',     label: 'System',     desc: 'Krise als Stärke, echter Bedarf, Plan.' },
  { id: 'verbindung', label: 'Verbindung', desc: 'Mentor:in, Spiegelperson, Mitstreiter:innen.' },
];

const questions = [
  {
    id: 'q1', dimension: 'system',
    text: 'Nutze ich eine Krise als Stärke?',
    help: 'Gibt es etwas Schwieriges in deinem Umfeld oder deiner Biografie — eine Veränderung oder ein Problem —, das du für dein Vorhaben nutzen könntest? Krisen sind nicht nur Hindernisse, sie können auch Chancen sein.',
    ifFocus: {
      title: 'Krise als Stärke.',
      tip: 'Was ist gerade schwer — welche Chance ergibt sich daraus für dich?',
      detail: 'Jede Krise trägt etwas Lernbares in sich. Schreib auf, was gerade belastend ist, und frag dich, was du daraus entwickeln kannst. Oft entsteht aus Widerstand neue Kraft oder eine Fähigkeit, die dir später hilft.'
    }
  },
  {
    id: 'q2', dimension: 'interesse',
    text: 'Habe ich echtes Interesse an diesem Thema?',
    help: 'Würdest du dich damit beschäftigen, auch wenn niemand klatscht? Echtes Interesse kommt von innen und gibt Energie — auch ohne Anerkennung.',
    ifFocus: {
      title: 'Interesse klären.',
      tip: 'Würdest du es tun, ohne Applaus?',
      detail: 'Echtes Interesse zeigt sich im Alltag. Beschäftigst du dich freiwillig damit? Liest oder denkst du darüber nach, ohne Druck? Wenn nicht, lohnt sich die Frage, was dich wirklich antreibt.'
    }
  },
  {
    id: 'q3', dimension: 'klarheit',
    text: 'Geht es um das Thema, nicht um die Form?',
    help: 'Begeistert dich der Inhalt — oder eher die Idee einer bestimmten Umsetzung wie Gründung, Präsentation oder Produkt? Die Form kann sich ändern, das Thema sollte tragen.',
    ifFocus: {
      title: 'Thema vor Form.',
      tip: 'Ist die aktuelle Form wirklich die beste für das Thema?',
      detail: 'Man verliert sich leicht in Tools, Formaten oder Auftritten. Geh einen Schritt zurück: Was ist der Kern? Wie erreiche ich ihn am stimmigsten und besten?'
    }
  },
  {
    id: 'q4', dimension: 'system',
    text: 'Weiß ich, was das Umfeld wirklich braucht?',
    help: 'Hast du mit Menschen gesprochen, die von deinem Vorhaben profitieren würden? Echte Gespräche schlagen jede Annahme.',
    ifFocus: {
      title: 'Bedarf prüfen.',
      tip: 'Sprich mit fünf Menschen: Was ist ihr echtes Problem?',
      detail: 'Diese Woche drei kurze Gespräche führen. Offen fragen, gut zuhören. Die Antworten geben oft mehr Klarheit als jede Planung am Schreibtisch.'
    }
  },
  {
    id: 'q5', dimension: 'verbindung',
    text: 'Habe ich eine Mentor:in?',
    help: 'Gibt es jemanden, der sich ehrlich über deinen Erfolg freut und dir Rückmeldung gibt? Das gibt Rückenwind.',
    ifFocus: {
      title: 'Spiegel finden.',
      tip: 'Wer hat etwas Ähnliches schon einmal gemacht?',
      detail: 'Die Person muss kein offizieller Mentor sein. Schreib drei Namen auf — Kolleg:innen, Bekannte, Menschen aus ähnlichen Feldern — und nimm diese Woche Kontakt auf.'
    }
  },
  {
    id: 'q6', dimension: 'klarheit',
    text: 'Ist mein nächster Schritt klar?',
    help: 'Klarheit für den nächsten Schritt bringt Bewegung.',
    ifFocus: {
      title: 'Nächsten Schritt setzen.',
      tip: 'Ein Ziel, das du heute noch schaffst.',
      detail: 'Weniger ist mehr. Der nächste Schritt soll klein, konkret und rasch machbar sein. Schreib ihn auf und leg einen fixen Zeitpunkt fest.'
    }
  },
  {
    id: 'q7', dimension: 'interesse',
    text: 'Glaube ich an mein Vorhaben, um dranzubleiben?',
    help: 'Auch wenn es länger dauert und Rückschläge kommen: Bin ich überzeugt?',
    ifFocus: {
      title: 'Dranbleiben wählen.',
      tip: 'Ein 7-Tage-Experiment.',
      detail: 'Lass die Idee, dein Projekt eine Zeit lang ruhen. Kommt keine Lust weiterzumachen, ist das ein Signal: Ziel anpassen — oder bewusst loslassen.'
    }
  },
];

const focusStatementByPair = {
  'interesse_klarheit':  'Anliegen schärfen.',
  'interesse_system':    'Vom Feuer in den Takt.',
  'interesse_verbindung':'Anliegen teilen, Resonanz suchen.',
  'klarheit_system':     'Vom Plan in den ersten Schritt.',
  'klarheit_verbindung': 'Klarheit gewinnt durch Reibung.',
  'system_verbindung':   'Mitstreiter:innen für die Umsetzung.',
};

/* ==========================================================================
   App-State
   ========================================================================== */

const state = {
  screen: 'start',           // start | area | struggle | questions | result
  selectedArea: null,
  selectedStruggle: null,
  qIndex: 0,
  answers: {},
};

/* ==========================================================================
   Render
   ========================================================================== */

const root = document.getElementById('app');

function render() {
  switch (state.screen) {
    case 'start':     renderStart();     break;
    case 'area':      renderArea();      break;
    case 'struggle':  renderStruggle();  break;
    case 'questions': renderQuestions(); break;
    case 'result':    renderResult();    break;
  }
}

function backIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
}

function renderStart() {
  root.innerHTML = `
    <div class="app-stage">
      <div class="stage-header">
        <a href="index.html" class="iconbtn" aria-label="Zurück zur Übersicht">${backIcon()}</a>
        <a href="index.html" class="brand"><img src="assets/wirken-logo.png" alt="wirken" class="brand-img" /></a>
        <div style="width:40px"></div>
      </div>

      <div class="stage-body">
        <div class="start fade-in">
          <h1>
            <span class="top">Selbstcheck</span>
            <img src="assets/wirken-logo.png" alt="wirken" class="wirken-mark" />
          </h1>
          <p class="lede" style="max-width: 420px;">
            Denk an ein Vorhaben, dem mehr Wirkung gut täte.
          </p>

          <div class="steps-preview stagger" style="margin-top: 6px; grid-template-columns: repeat(3, 1fr); max-width: 360px;">
            <div class="sp" style="--i:0"><span class="num">1</span><span>Bereich</span></div>
            <div class="sp" style="--i:1"><span class="num">2</span><span>Stolperstein</span></div>
            <div class="sp" style="--i:2"><span class="num">3</span><span>7 Fragen</span></div>
          </div>

          <button class="play float" id="btnStart" aria-label="Selbstcheck starten">
            <img src="assets/play-button.png" alt="Start" />
          </button>
          <p class="muted tiny" style="margin-top: -4px;">2 Minuten · alles bleibt auf deinem Gerät</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btnStart').addEventListener('click', () => {
    state.screen = 'area';
    render();
  });
}

function renderArea() {
  root.innerHTML = `
    <div class="app-stage">
      <div class="stage-header">
        <button class="iconbtn" id="btnBack" aria-label="Zurück">${backIcon()}</button>
        <div class="counter">1 / 3</div>
        <div style="width:40px"></div>
      </div>
      <div class="stage-body fade-in">
        <p class="muted tiny center" style="margin-bottom:8px;">Denk an ein Vorhaben, dem mehr Wirkung gut täte.</p>
        <h2 class="center" style="margin-bottom: 22px;">In welchem Bereich liegt es?</h2>
        <div class="choice-grid cols-2" id="areaGrid">
          ${lifeAreas.map((a, i) => `
            <button class="choice-tile slide-up" style="animation-delay:${i*30}ms" data-id="${a.id}">${a.label}</button>
          `).join('')}
        </div>
      </div>
      <div class="stage-footer single">
        <span></span>
      </div>
    </div>
  `;
  document.getElementById('btnBack').addEventListener('click', () => { state.screen = 'start'; render(); });
  document.querySelectorAll('#areaGrid .choice-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedArea = btn.dataset.id;
      btn.classList.add('is-selected');
      setTimeout(() => { state.screen = 'struggle'; render(); }, 280);
    });
  });
}

function renderStruggle() {
  root.innerHTML = `
    <div class="app-stage">
      <div class="stage-header">
        <button class="iconbtn" id="btnBack" aria-label="Zurück">${backIcon()}</button>
        <div class="counter">2 / 3</div>
        <div style="width:40px"></div>
      </div>
      <div class="stage-body fade-in">
        <p class="muted tiny center" style="margin-bottom:8px;">Bei diesem Vorhaben…</p>
        <h2 class="center" style="margin-bottom: 22px;">Woran könnte es liegen, dass es weniger wirkt als möglich?</h2>
        <div class="choice-grid" id="strGrid" style="max-width: 360px;">
          ${struggles.map((s, i) => `
            <button class="choice-tile slide-up" style="animation-delay:${i*60}ms" data-id="${s.id}">${s.label}</button>
          `).join('')}
        </div>
      </div>
      <div class="stage-footer single">
        <span></span>
      </div>
    </div>
  `;
  document.getElementById('btnBack').addEventListener('click', () => { state.screen = 'area'; render(); });
  document.querySelectorAll('#strGrid .choice-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedStruggle = btn.dataset.id;
      btn.classList.add('is-selected');
      setTimeout(() => { state.screen = 'questions'; state.qIndex = 0; render(); }, 280);
    });
  });
}

function renderQuestions() {
  const q = questions[state.qIndex];
  const progress = ((state.qIndex + 1) / questions.length) * 100;

  root.innerHTML = `
    <div class="app-stage">
      <div class="stage-header">
        <button class="iconbtn" id="btnBack" aria-label="Zurück">${backIcon()}</button>
        <div class="progress"><i style="width:${progress}%"></i></div>
        <div class="counter">${state.qIndex + 1}/${questions.length}</div>
      </div>
      <div class="stage-body">
        <p class="swipe-hint">Wisch die Karte — oder tipp unten<span class="kbhint"> · oder ← / →</span></p>
        <div class="qcard-wrap">
          <div class="qcard-stack">
            ${state.qIndex < questions.length - 1 ? '<div class="ghost g2"></div>' : ''}
            ${state.qIndex < questions.length - 1 ? '<div class="ghost g1"></div>' : ''}
            <div class="qcard pop-in" id="qcard">
              <button class="help-toggle" id="btnHelp" aria-label="Hilfe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
              </button>
              <span class="swipe-tag left">Nein</span>
              <span class="swipe-tag right">Ja</span>
              <div class="qtext" id="qtext">${q.text}</div>
              <div class="qhelp hidden" id="qhelp">${q.help}</div>
              <div class="qfoot">
                <button class="left" data-answer="nein"><span>←</span> Nein</button>
                <button class="right" data-answer="ja">Ja <span>→</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stage-footer">
        <button class="btn-no" data-answer="nein">Nein</button>
        <button class="btn-yes" data-answer="ja">Ja</button>
      </div>
    </div>
  `;

  const qtext = document.getElementById('qtext');
  const qhelp = document.getElementById('qhelp');
  document.getElementById('btnHelp').addEventListener('click', (e) => {
    e.stopPropagation();
    qtext.classList.toggle('hidden');
    qhelp.classList.toggle('hidden');
  });

  document.getElementById('btnBack').addEventListener('click', () => {
    if (state.qIndex > 0) {
      state.qIndex -= 1;
      delete state.answers[questions[state.qIndex].id];
      render();
    } else {
      state.screen = 'struggle';
      render();
    }
  });

  document.querySelectorAll('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => recordAnswer(btn.dataset.answer));
  });

  bindSwipe(document.getElementById('qcard'));
  bindKeys();
}

let _keyHandler = null;
function bindKeys() {
  if (_keyHandler) document.removeEventListener('keydown', _keyHandler);
  _keyHandler = (e) => {
    if (state.screen !== 'questions') return;
    if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') { e.preventDefault(); recordAnswer('ja'); }
    else if (e.key === 'ArrowLeft' || e.key === 'n' || e.key === 'N') { e.preventDefault(); recordAnswer('nein'); }
    else if (e.key === '?' || e.key === 'h') {
      const t = document.getElementById('qtext');
      const h = document.getElementById('qhelp');
      if (t && h) { t.classList.toggle('hidden'); h.classList.toggle('hidden'); }
    }
  };
  document.addEventListener('keydown', _keyHandler);
}

function recordAnswer(answer) {
  const q = questions[state.qIndex];
  const card = document.getElementById('qcard');
  if (card) {
    card.style.transition = 'transform 280ms ease, opacity 280ms ease';
    card.style.transform = answer === 'ja' ? 'translateX(360px) rotate(12deg)' : 'translateX(-360px) rotate(-12deg)';
    card.style.opacity = '0';
  }
  setTimeout(() => {
    state.answers[q.id] = answer;
    if (state.qIndex < questions.length - 1) {
      state.qIndex += 1;
      render();
    } else {
      state.screen = 'result';
      render();
    }
  }, 240);
}

function bindSwipe(card) {
  if (!card) return;
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  const tagL = card.querySelector('.swipe-tag.left');
  const tagR = card.querySelector('.swipe-tag.right');

  function onStart(x) {
    dragging = true;
    startX = x;
    card.style.transition = 'none';
  }
  function onMove(x) {
    if (!dragging) return;
    currentX = x - startX;
    const rot = currentX / 18;
    card.style.transform = `translateX(${currentX}px) rotate(${rot}deg)`;
    if (tagR) tagR.style.opacity = Math.max(0, Math.min(1, currentX / 100));
    if (tagL) tagL.style.opacity = Math.max(0, Math.min(1, -currentX / 100));
  }
  function onEnd() {
    if (!dragging) return;
    dragging = false;
    card.style.transition = 'transform 280ms ease, opacity 280ms ease';
    if (currentX > 80) {
      recordAnswer('ja');
    } else if (currentX < -80) {
      recordAnswer('nein');
    } else {
      card.style.transform = '';
      if (tagR) tagR.style.opacity = 0;
      if (tagL) tagL.style.opacity = 0;
    }
    currentX = 0;
  }

  card.addEventListener('pointerdown', (e) => { onStart(e.clientX); });
  card.addEventListener('pointermove', (e) => { onMove(e.clientX); });
  card.addEventListener('pointerup',   onEnd);
  card.addEventListener('pointercancel', onEnd);
  card.addEventListener('pointerleave', onEnd);
}

/* ==========================================================================
   Result
   ========================================================================== */

function renderResult() {
  const focusCounts = { interesse: 0, klarheit: 0, system: 0, verbindung: 0 };
  questions.forEach(q => { if (state.answers[q.id] === 'nein') focusCounts[q.dimension]++; });

  const max = Math.max(...Object.values(focusCounts));
  const topDimIds = max > 0 ? Object.keys(focusCounts).filter(k => focusCounts[k] === max) : [];

  const topLabels = topDimIds.map(id => dimensions.find(d => d.id === id).label).join(' & ');

  let stmt = topLabels;
  if (topDimIds.length === 2) {
    const key = topDimIds.slice().sort().join('_');
    if (focusStatementByPair[key]) stmt = focusStatementByPair[key];
  } else if (topDimIds.length >= 3) {
    stmt = 'An mehreren Stellen anpacken.';
  }
  if (topDimIds.length === 0) stmt = 'Du bist gut aufgestellt — bleib dran.';

  const areaLabel    = lifeAreas.find(a => a.id === state.selectedArea)?.label || '';
  const strugLabel   = struggles.find(s => s.id === state.selectedStruggle)?.label || '';

  const tipsRaw = questions.filter(q => state.answers[q.id] === 'nein');
  const tips = tipsRaw.slice(0, 3);

  root.innerHTML = `
    <header class="topbar">
      <a href="index.html" class="brand">
        <img src="assets/wirken-logo.png" alt="wirken" class="brand-img" />
        <span class="muted tiny">/ Selbstcheck</span>
      </a>
      <nav>
        <a href="selbstcheck.html" class="is-active">Selbstcheck</a>
        <a href="anliegen.html">Anliegen</a>
        <a href="landkarte.html">Landkarte</a>
      </nav>
    </header>

    <main class="result">
      <h1 class="reveal">Dein Fokus</h1>
      <p class="selection reveal" style="animation-delay: 0.05s;">${areaLabel} · ${strugLabel}</p>

      <div class="dim-grid reveal-stagger">
        ${dimensions.map(d => {
          const count = focusCounts[d.id];
          const has = count > 0;
          return `
            <button class="dim-card ${has ? 'has-focus' : ''}" data-dim="${d.id}">
              <span class="dim-status">${has ? '!' : '✓'}</span>
              <div class="dim-label">${d.label}</div>
              <div class="dim-meta">${has ? count + ' Fokuspunkt' + (count > 1 ? 'e' : '') : 'Passt schon'}</div>
            </button>
          `;
        }).join('')}
      </div>

      <div class="focus-statement delay-r">
        <div class="label">Dein nächster Schritt</div>
        <div class="stmt">${stmt}</div>
      </div>

      ${tips.length ? `
        <h3 class="reveal" style="margin-top: 22px; font-size: 1rem; animation-delay: 0.55s;">Was du konkret tun kannst:</h3>
        <div class="tip-list delay-r" id="tipList">
          ${tips.map(t => `
            <button class="tip" data-id="${t.id}">
              <h4>${t.ifFocus.title}</h4>
              <p>${t.ifFocus.tip}</p>
              <div class="detail"><span>${t.ifFocus.detail}</span></div>
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="callout reveal" style="margin-top: 22px; animation-delay: 0.55s;">
          <strong>Stark.</strong> Bei diesem Vorhaben hast du in allen vier Dimensionen
          eine gute Basis. Vielleicht ist jetzt die Zeit, eine Stufe größer zu denken.
        </div>
      `}

      <p class="muted tiny reveal" style="margin-top: 22px; text-align: center; animation-delay: 1s;">Tipp: Screenshot machen — dann hast du es immer dabei.</p>

      <div class="result-actions reveal" style="animation-delay: 1.1s;">
        <a href="index.html" class="btn btn-primary btn-block">Zurück zur Übersicht</a>
        <button class="btn btn-ghost btn-block" id="btnRestart">Selbstcheck neu starten</button>
      </div>
    </main>

    <div class="dialog-backdrop" id="dialog">
      <div class="dialog" id="dialogBody"></div>
    </div>
  `;

  document.querySelectorAll('#tipList .tip').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('is-open'));
  });

  document.querySelectorAll('.dim-card').forEach(btn => {
    btn.addEventListener('click', () => openDimensionDialog(btn.dataset.dim, focusCounts));
  });

  document.getElementById('btnRestart').addEventListener('click', () => {
    state.screen = 'start';
    state.selectedArea = null;
    state.selectedStruggle = null;
    state.qIndex = 0;
    state.answers = {};
    render();
  });

  document.getElementById('dialog').addEventListener('click', (e) => {
    if (e.target.id === 'dialog') closeDialog();
  });
}

function openDimensionDialog(dimId, focusCounts) {
  const dim = dimensions.find(d => d.id === dimId);
  const dimQuestions = questions.filter(q => q.dimension === dimId);
  const body = document.getElementById('dialogBody');
  body.innerHTML = `
    <h3>${dim.label}</h3>
    <p class="muted">${dim.desc}</p>
    <div class="answers">
      ${dimQuestions.map(q => {
        const ans = state.answers[q.id];
        return `
          <div class="ans ${ans === 'ja' ? 'yes' : 'no'}">
            <strong>${ans === 'ja' ? 'Ja' : 'Nein'}</strong> — ${q.text}
          </div>
        `;
      }).join('')}
    </div>
    <div class="close-row">
      <button class="btn btn-ghost" id="btnCloseDialog">Schließen</button>
    </div>
  `;
  document.getElementById('dialog').classList.add('is-open');
  document.getElementById('btnCloseDialog').addEventListener('click', closeDialog);
}

function closeDialog() {
  document.getElementById('dialog').classList.remove('is-open');
}

render();
