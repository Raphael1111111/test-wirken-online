/* ==========================================================================
   Anliegen-Werkstatt
   --------------------------------------------------------------------------
   Schritt-für-Schritt-Werkstatt entlang der Kapitel „Anliegen und Geschichte"
   und „Storyline" aus dem Buch „wirken".
   ========================================================================== */

const steps = [
  {
    id: 'problem',
    label: 'Das Problem',
    eyebrow: 'Schritt 1 von 6',
    title: 'Welches Problem siehst du, das dich nicht loslässt?',
    hint: 'Beschreibe es so konkret wie möglich. Eine Headline aus der Sonntagszeitung, ein Satz einer Lehrerin, eine Beobachtung im Wartezimmer — was hat dich aufmerksam werden lassen?',
    placeholder: 'Beispiel: Ein Drittel der Jugendlichen an Wiener Brennpunktschulen sieht nach der Pflichtschule keine Perspektive jenseits des AMS.',
    field: 'textarea',
    minLen: 30,
    needHint: 'Bitte beschreibe das Problem etwas ausführlicher (mindestens 30 Zeichen). Ein einzelnes Stichwort reicht hier nicht.',
  },
  {
    id: 'biografie',
    label: 'Deine Wurzeln',
    eyebrow: 'Schritt 2 von 6',
    title: 'Welche Erfahrung in deinem Leben bringt dich zu diesem Thema?',
    hint: 'Das echte Anliegen entsteht, wenn deine Biografie und ein Bedürfnis der Zeit zusammentreffen. Welche Geschichte trägst du in dir, die zu diesem Thema gehört?',
    placeholder: 'Beispiel: Ich bin in einer kleinbürgerlichen Familie aufgewachsen. Über den Sport habe ich Zugang zum Gymnasium gefunden. Ohne diesen Zufall wäre vieles anders gelaufen.',
    field: 'textarea',
    minLen: 30,
    needHint: 'Schreib eine kleine Anekdote oder Erfahrung auf — auch zwei, drei Sätze reichen. Ohne Wurzel wird das Anliegen austauschbar.',
  },
  {
    id: 'aenderung',
    label: 'Deine Vision',
    eyebrow: 'Schritt 3 von 6',
    title: 'Welche Veränderung wünschst du dir — in einem Satz?',
    hint: 'Eine Vision darf groß sein. Mach sie hörbar. Wenn dieses Vorhaben gelingt, wie sieht die Welt dann ein Stück besser aus?',
    placeholder: 'Beispiel: Eine chancengerechte Gesellschaft, in der die soziale Herkunft keine Rolle für den Bildungserfolg spielt.',
    field: 'textarea',
    minLen: 20,
    needHint: 'Formuliere die Vision in einem ganzen Satz (mindestens 20 Zeichen). Trau dich an die Größe ran — sie darf groß sein.',
  },
  {
    id: 'ansatz',
    label: 'Dein Ansatz',
    eyebrow: 'Schritt 4 von 6',
    title: 'Was ist dein konkreter Ansatz?',
    hint: 'Wie genau willst du wirken? Nicht alles, nicht für alle — sondern: was tust du, mit wem und auf welchem Weg?',
    placeholder: 'Beispiel: Ein Mentoring-Programm, das junge Erwachsene mit Jugendlichen am Übergang Schule–Beruf zusammenbringt. Finanziert durch Unternehmen, die ihre Mitarbeiter:innen als Mentor:innen entsenden.',
    field: 'textarea',
    minLen: 30,
    needHint: 'Beschreibe den Ansatz etwas konkreter (mindestens 30 Zeichen). Was tust du, mit wem, auf welchem Weg?',
  },
  {
    id: 'ziel',
    label: 'Dein Ziel',
    eyebrow: 'Schritt 5 von 6',
    title: 'Wie misst du Erfolg in den nächsten 12 Monaten?',
    hint: 'Ein gutes Ziel hat eine Zahl, eine Zielgruppe und einen Zeitpunkt. Trau dich an die Konkretheit ran — auch wenn sie sich erst zerbrechlich anfühlt.',
    fields: [
      { key: 'anzahl',     label: 'Zahl',         placeholder: '200', kind: 'text' },
      { key: 'zielgruppe', label: 'Zielgruppe',   placeholder: 'Jugendliche im 9. Schuljahr', kind: 'text' },
      { key: 'zeitpunkt',  label: 'Zeitpunkt',    placeholder: 'bis Ende 2026', kind: 'text' },
    ],
    field: 'compound',
    needHint: 'Bitte alle drei Felder ausfüllen: Zahl, Zielgruppe und Zeitpunkt. Diese Konkretheit ist der eigentliche Sinn dieses Schritts.',
  },
  {
    id: 'naechster',
    label: 'Der nächste Schritt',
    eyebrow: 'Schritt 6 von 6',
    title: 'Was ist der eine konkrete Schritt in den nächsten 14 Tagen?',
    hint: 'Klein, eigenhändig, machbar. Etwas, das nicht von der Antwort eines anderen Menschen abhängt.',
    placeholder: 'Beispiel: Drei Schulleiter:innen anrufen und um ein 30-Minuten-Gespräch bitten.',
    field: 'textarea',
    minLen: 20,
    needHint: 'Beschreibe einen konkreten Schritt (mindestens 20 Zeichen). Klein, eigenhändig, machbar in 14 Tagen.',
  },
];

const data = {
  problem: '',
  biografie: '',
  aenderung: '',
  ansatz: '',
  ziel: { anzahl: '', zielgruppe: '', zeitpunkt: '' },
  naechster: '',
};

let phase = 'start';   // start | step | result
let stepIndex = 0;
const root = document.getElementById('app');

function render() {
  if (phase === 'start')   return renderStart();
  if (phase === 'result')  return renderResult();
  return renderStep();
}

function backIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
}

function topbar(active) {
  return `
    <header class="topbar">
      <a href="index.html" class="brand">
        <img src="assets/wirken-logo.png" alt="wirken" class="brand-img" />
        <span class="muted tiny">/ Anliegen</span>
      </a>
      <nav>
        <a href="selbstcheck.html" class="${active==='selbstcheck'?'is-active':''}">Selbstcheck</a>
        <a href="anliegen.html"    class="${active==='anliegen'?'is-active':''}">Anliegen</a>
        <a href="landkarte.html"   class="${active==='landkarte'?'is-active':''}">Landkarte</a>
      </nav>
    </header>
  `;
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
            <span class="top">Anliegen-Werkstatt</span>
            <img src="assets/wirken-logo.png" alt="wirken" class="wirken-mark" />
          </h1>
          <p class="lede" style="max-width: 460px;">
            Aus deiner Geschichte und einem Bedürfnis der Zeit wird ein klares Anliegen.
          </p>

          <div class="steps-preview stagger" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
            <div class="sp" style="--i:0"><span class="num">1</span><span>Problem</span></div>
            <div class="sp" style="--i:1"><span class="num">2</span><span>Wurzel</span></div>
            <div class="sp" style="--i:2"><span class="num">3</span><span>Vision</span></div>
            <div class="sp" style="--i:3"><span class="num">4</span><span>Ansatz</span></div>
            <div class="sp" style="--i:4"><span class="num">5</span><span>Ziel</span></div>
            <div class="sp" style="--i:5"><span class="num">6</span><span>Nächster&nbsp;Schritt</span></div>
          </div>

          <button class="play float" id="btnStart" aria-label="Werkstatt starten">
            <img src="assets/play-button.png" alt="Start" />
          </button>
          <p class="muted tiny" style="margin-top: -4px;">8 Minuten · am Ende dein Anliegen auf einer Seite</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btnStart').addEventListener('click', () => {
    phase = 'step';
    stepIndex = 0;
    render();
  });
}

function renderStep() {
  const s = steps[stepIndex];
  const stepDots = steps.map((_, i) =>
    `<div class="step ${i < stepIndex ? 'is-done' : ''} ${i === stepIndex ? 'is-active' : ''}"></div>`
  ).join('');

  const currentLen = s.field !== 'compound' ? (data[s.id] || '').trim().length : 0;
  const minLen = s.minLen || 0;
  const isOk   = currentLen >= minLen;

  const fieldHtml = s.field === 'compound'
    ? s.fields.map(f => `
        <div class="field">
          <label for="f_${f.key}">${f.label}</label>
          <input id="f_${f.key}" type="${f.kind}" placeholder="${f.placeholder}" value="${escapeAttr(data.ziel[f.key])}" data-key="${f.key}" />
        </div>
      `).join('')
    : `
        <div class="field">
          <textarea id="mainField" placeholder="${s.placeholder}" rows="5">${escapeText(data[s.id])}</textarea>
          <div class="charcount ${isOk ? 'is-ok' : ''}" id="charcount">
            <span id="charcountVal">${currentLen} / mindestens ${minLen} Zeichen</span>
          </div>
        </div>
      `;

  root.innerHTML = `
    ${topbar('anliegen')}
    <main class="shell">
      <div class="workshop">
        <div class="steps">${stepDots}</div>

        <div class="fade-in" key="step-${stepIndex}">
          <span class="eyebrow">${s.eyebrow}</span>
          <h2 style="margin-top: 8px;">${s.title}</h2>
          <p class="muted" style="max-width: 640px;">${s.hint}</p>

          <div style="margin-top: 18px; display: grid; gap: 12px;">
            ${fieldHtml}
          </div>

          <div class="need-hint hidden" id="needHint">
            <strong>Kurz noch:</strong> ${s.needHint}
          </div>

          ${stepIndex === 0 ? `
            <div class="callout" style="margin-top: 16px;">
              <strong>Tipp aus dem Buch:</strong> Ein Anliegen entsteht aus Unzufriedenheit — einer leisen oder lauten Spannung mit dem Status quo. Versuche, das Problem so zu beschreiben, dass jemand es spürt, der es nicht aus eigener Erfahrung kennt.
            </div>
          ` : ''}

          ${stepIndex === 4 ? `
            <div class="callout" style="margin-top: 16px;">
              <strong>Achtung Marketingsprech:</strong> Vermeide Worte wie „mehr", „besser", „nachhaltig". Sie klingen gut und messen nichts. Eine Zahl, ein Wer, ein Wann — mehr braucht es nicht.
            </div>
          ` : ''}
        </div>

        <div class="step-nav sticky">
          <button class="btn btn-ghost" id="btnBack">← Zurück</button>
          <button class="btn btn-primary" id="btnNext">${stepIndex === steps.length - 1 ? 'Anliegen anzeigen' : 'Weiter →'}</button>
        </div>
      </div>
    </main>
  `;

  if (s.field === 'compound') {
    s.fields.forEach(f => {
      const el = document.getElementById('f_' + f.key);
      el.addEventListener('input', () => {
        data.ziel[f.key] = el.value;
        hideNeedHint();
      });
    });
  } else {
    const ta = document.getElementById('mainField');
    const cc = document.getElementById('charcount');
    const cv = document.getElementById('charcountVal');
    ta.addEventListener('input', () => {
      data[s.id] = ta.value;
      hideNeedHint();
      const n = ta.value.trim().length;
      if (cv) cv.textContent = `${n} / mindestens ${s.minLen || 0} Zeichen`;
      if (cc) cc.classList.toggle('is-ok', n >= (s.minLen || 0));
    });
    setTimeout(() => ta.focus(), 50);
  }

  document.getElementById('btnBack').addEventListener('click', () => {
    if (stepIndex === 0) {
      phase = 'start';
    } else {
      stepIndex--;
    }
    render();
  });
  document.getElementById('btnNext').addEventListener('click', () => {
    if (!isStepValid(s)) {
      showNeedHint();
      return;
    }
    if (stepIndex === steps.length - 1) {
      phase = 'result';
      render();
    } else {
      stepIndex++;
      render();
    }
  });
}

function isStepValid(s) {
  if (s.field === 'compound') {
    return s.fields.every(f => (data.ziel[f.key] || '').trim().length > 0);
  }
  const v = (data[s.id] || '').trim();
  return v.length >= (s.minLen || 1);
}

function showNeedHint() {
  const el = document.getElementById('needHint');
  if (!el) return;
  el.classList.remove('hidden');
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 600);
}
function hideNeedHint() {
  const el = document.getElementById('needHint');
  if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
}

function renderResult() {
  const z = data.ziel;
  const zielSatz = (z.anzahl && z.zielgruppe && z.zeitpunkt)
    ? buildZielSatz(z)
    : 'Ziel noch unvollständig.';

  const statementParts = buildStatementParts();
  const statementFrags = statementParts
    .map((p, i) => `<span class="frag" style="animation-delay:${0.25 + i * 0.35}s">${escapeHtml(p)}${i < statementParts.length - 1 ? ' ' : ''}</span>`)
    .join('');

  root.innerHTML = `
    ${topbar('anliegen')}
    <main class="shell" style="padding-bottom: 60px;">
      <span class="eyebrow reveal">Dein Anliegen — auf einer Seite</span>
      <h1 class="reveal" style="margin-top: 10px; animation-delay: 0.05s;">Hier ist deine Geschichte.</h1>
      <p class="lede reveal" style="max-width: 640px; animation-delay: 0.12s;">
        Lies sie laut. Tausch sie mit jemandem aus, dem du vertraust.
      </p>

      <div class="statement-out reveal" style="margin-top: 24px; animation-delay: 0.2s;">
        <h2>Mein Anliegen</h2>
        <blockquote id="quote">${statementFrags}</blockquote>

        <div class="meta-grid stagger" style="--gap-base: 0.1s;">
          <div class="m" style="--i:0"><div class="l">Problem</div><div class="v">${escapeHtml(data.problem)}</div></div>
          <div class="m" style="--i:1"><div class="l">Wurzel</div><div class="v">${escapeHtml(data.biografie)}</div></div>
          <div class="m" style="--i:2"><div class="l">Vision</div><div class="v">${escapeHtml(data.aenderung)}</div></div>
          <div class="m" style="--i:3"><div class="l">Ansatz</div><div class="v">${escapeHtml(data.ansatz)}</div></div>
          <div class="m" style="--i:4"><div class="l">Ziel</div><div class="v">${escapeHtml(zielSatz)}</div></div>
          <div class="m" style="--i:5"><div class="l">Nächster Schritt</div><div class="v">${escapeHtml(data.naechster)}</div></div>
        </div>
      </div>

      <div class="cta-row" style="margin-top: 22px;">
        <button class="btn btn-primary" id="btnCopy">Statement in die Zwischenablage</button>
        <button class="btn btn-ghost" id="btnPrint">Drucken / als PDF speichern</button>
        <button class="btn btn-ghost" id="btnEdit">Werkstatt bearbeiten</button>
        <a href="index.html" class="btn btn-ghost">Zurück zur Übersicht</a>
      </div>

      <div class="callout" style="margin-top: 28px;">
        <strong>Was jetzt?</strong> Schreib dein Statement auf eine A4-Seite und nimm sie zu drei Kaffeegesprächen mit. Bitte aktiv um Resonanz. Nach zehn Gesprächen wirst du wissen, was wirklich trägt — und was du noch schärfen darfst.
      </div>
    </main>
  `;

  document.getElementById('btnCopy').addEventListener('click', async () => {
    const b = document.getElementById('btnCopy');
    const orig = b.textContent;
    const text = buildPlainText();
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (e) { /* fall through */ }
    if (!ok) {
      // Fallback: legacy execCommand
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed'; ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { /* ignore */ }
    }
    b.textContent = ok ? 'Kopiert ✓' : 'Bitte manuell markieren';
    setTimeout(() => { b.textContent = orig; }, 1800);
  });

  document.getElementById('btnPrint').addEventListener('click', () => window.print());

  document.getElementById('btnEdit').addEventListener('click', () => {
    phase = 'step';
    stepIndex = 0;
    render();
  });
}

function buildStatementParts() {
  const parts = [];
  if (data.problem)   parts.push(data.problem.trim());
  if (data.biografie) parts.push('Mich treibt dabei eine eigene Erfahrung an: ' + data.biografie.trim());
  if (data.aenderung) parts.push('Meine Vision: ' + ensureEnd(data.aenderung.trim()));
  if (data.ansatz)    parts.push('Mein Ansatz dafür: ' + ensureEnd(data.ansatz.trim()));
  const z = data.ziel;
  if (z.anzahl && z.zielgruppe && z.zeitpunkt) {
    parts.push('Mein Ziel: ' + buildZielSatz(z));
  }
  if (data.naechster) parts.push('Mein nächster Schritt: ' + ensureEnd(data.naechster.trim()));
  return parts;
}

function buildStatement() {
  return buildStatementParts().join(' ');
}

function ensureEnd(s) {
  if (!s) return s;
  return /[.!?]$/.test(s) ? s : s + '.';
}

function buildZielSatz(z) {
  let zeit = z.zeitpunkt.trim();
  let prefix = '';
  if (/^(bis|ab|im|in|ende|anfang|mitte|q[1-4]|H[1-2])\b/i.test(zeit)) {
    prefix = zeit.charAt(0).toUpperCase() + zeit.slice(1);
  } else if (/^\d/.test(zeit)) {
    prefix = 'Bis ' + zeit;
  } else {
    prefix = zeit.charAt(0).toUpperCase() + zeit.slice(1);
  }
  return `${prefix} begleiten wir ${z.anzahl} ${z.zielgruppe}.`;
}

function buildPlainText() {
  const z = data.ziel;
  return [
    'MEIN ANLIEGEN',
    '',
    buildStatement(),
    '',
    '— Bausteine —',
    'Problem: ' + data.problem,
    'Wurzel:  ' + data.biografie,
    'Vision:  ' + data.aenderung,
    'Ansatz:  ' + data.ansatz,
    'Ziel:    ' + (z.anzahl && z.zielgruppe && z.zeitpunkt
      ? buildZielSatz(z)
      : '(noch offen)'),
    'Nächster Schritt: ' + data.naechster,
  ].join('\n');
}

function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeText(s) { return (s || '').replace(/</g, '&lt;'); }
function escapeAttr(s) { return (s || '').replace(/"/g, '&quot;'); }

render();
