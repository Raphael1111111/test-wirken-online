/* ==========================================================================
   Stakeholder-Landkarte
   --------------------------------------------------------------------------
   Eine 2x2-Matrix: Einfluss × Wohlwollen.
   Stakeholder hinzufügen, ziehen, sortieren — und passende Empfehlungen
   für die Beziehungs- und Netzwerkarbeit ableiten.
   ========================================================================== */

const STORAGE_KEY = 'wirken.landkarte.v1';

let stakeholders = load();
let selectedId = null;
let phase = 'start';   // start | map

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return [
    { id: id(), name: 'Schuldirektor:in einer Pilotschule', x: 0.65, y: 0.62 },
    { id: id(), name: 'Förderstiftung X',                    x: 0.78, y: 0.40 },
    { id: id(), name: 'Bezirksvorstehung',                   x: 0.42, y: 0.18 },
    { id: id(), name: 'Co-Gründer:in',                       x: 0.38, y: 0.85 },
  ];
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stakeholders)); } catch (e) { /* ignore */ }
}

function id() { return Math.random().toString(36).slice(2, 9); }

const root = document.getElementById('app');

function backIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
}

function topbar(active) {
  return `
    <header class="topbar">
      <a href="index.html" class="brand">
        <img src="assets/wirken-logo.png" alt="wirken" class="brand-img" />
        <span class="muted tiny">/ Landkarte</span>
      </a>
      <nav>
        <a href="selbstcheck.html" class="${active==='selbstcheck'?'is-active':''}">Selbstcheck</a>
        <a href="anliegen.html"    class="${active==='anliegen'?'is-active':''}">Anliegen</a>
        <a href="landkarte.html"   class="${active==='landkarte'?'is-active':''}">Landkarte</a>
      </nav>
    </header>
  `;
}

function render() {
  if (phase === 'start') return renderStart();
  return renderMap();
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
            <span class="top">Stakeholder-Landkarte</span>
            <img src="assets/wirken-logo.png" alt="wirken" class="wirken-mark" />
          </h1>
          <p class="lede" style="max-width: 460px;">
            Wer trägt deine Idee? Wer bremst? Eine kleine Karte zeigt, wo dein nächster Anruf am meisten bewirkt.
          </p>

          <div class="steps-preview stagger" style="grid-template-columns: 1fr 1fr; max-width: 360px;">
            <div class="sp" style="--i:0"><span class="num">↗</span><span>Investieren</span></div>
            <div class="sp" style="--i:1"><span class="num">↘</span><span>Bewegen</span></div>
            <div class="sp" style="--i:2"><span class="num">↖</span><span>Pflegen</span></div>
            <div class="sp" style="--i:3"><span class="num">↙</span><span>Beobachten</span></div>
          </div>

          <button class="play float" id="btnStart" aria-label="Landkarte öffnen">
            <img src="assets/play-button.png" alt="Start" />
          </button>
          <p class="muted tiny" style="margin-top: -4px;">10 Minuten · deine Karte bleibt auf deinem Gerät</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btnStart').addEventListener('click', () => {
    phase = 'map';
    render();
  });
}

function renderMap() {
  root.innerHTML = `
    ${topbar('landkarte')}

    <main class="shell">
      <span class="eyebrow reveal">Werkzeug 03 — Beziehungs- und Netzwerkarbeit</span>
      <h1 class="reveal" style="margin-top: 10px; animation-delay: 0.05s;">Wer trägt deine Idee?</h1>
      <p class="lede reveal" style="max-width: 640px; animation-delay: 0.1s;">
        Schieb die Punkte dorthin, wo sie heute stehen — nicht, wo du sie gerne hättest.
      </p>

      <div id="recoTop" class="reveal" style="margin-top: 18px; animation-delay: 0.15s;"></div>

      <div class="map-wrap reveal" style="margin-top: 18px; animation-delay: 0.2s;">
        <div>
          <div class="matrix" id="matrix">
            <div class="quadrant-bg qtl"></div>
            <div class="quadrant-bg qtr"></div>
            <div class="quadrant-bg qbl"></div>
            <div class="quadrant-bg qbr"></div>
            <div class="axis-x"></div>
            <div class="axis-y"></div>
            <span class="qlabel tl">Pflegen</span>
            <span class="qlabel tr">Investieren</span>
            <span class="qlabel bl">Beobachten</span>
            <span class="qlabel br">Bewegen</span>

            <span class="axis-name x">Einfluss +</span>
            <span class="axis-name x-min">– Einfluss</span>
            <span class="axis-name y">Wohlwollen +</span>
            <span class="axis-name y-min">– Wohlwollen</span>

            ${stakeholders.map(s => renderDot(s)).join('')}
          </div>
          <p class="muted tiny" style="margin-top: 8px; text-align: center;">
            Tipp: Punkte sind ziehbar. Klick auf einen Punkt, um ihn hervorzuheben.
          </p>
        </div>

        <div>
          <h3 style="margin-bottom: 10px;">Stakeholder hinzufügen</h3>
          <form class="stake-form" id="addForm" autocomplete="off">
            <div class="row">
              <input type="text" id="newName" placeholder="z.B. Mentor:innen-Netzwerk Wien" />
              <button class="btn btn-primary" type="submit">+</button>
            </div>
            <p class="muted tiny" style="margin: 0;">Neue Punkte landen in der Mitte. Schieb sie an die richtige Stelle.</p>
          </form>

          <div class="stake-list" id="stakeList">
            ${renderListHtml()}
          </div>
        </div>
      </div>

      <section class="reveal" style="margin-top: 40px; max-width: 760px; animation-delay: 0.3s;">
        <h2 style="font-size: 1.4rem;">Wie du die Quadranten liest</h2>
        <div class="quad-grid">
          <div class="qexp qexp-tr"><strong>Investieren</strong><span>Hoher Einfluss · hohes Wohlwollen. Engste Verbündete. Bewusst Zeit investieren — nicht nur, wenn du etwas brauchst.</span></div>
          <div class="qexp qexp-br"><strong>Bewegen</strong><span>Hoher Einfluss · geringes Wohlwollen. Such den Dialog, nimm Bedenken ernst. Eine Person, die kippt, kann mehr verändern als zehn neue Fans.</span></div>
          <div class="qexp qexp-tl"><strong>Pflegen</strong><span>Geringer Einfluss · hohes Wohlwollen. Treue Basis. Versorge sie mit Updates, lass sie spüren, dass ihr Mittragen zählt.</span></div>
          <div class="qexp qexp-bl"><strong>Beobachten</strong><span>Geringer Einfluss · geringes Wohlwollen. Nicht ignorieren, aber auch nicht zu viel Energie investieren.</span></div>
        </div>
        <p class="muted" style="margin-top: 18px;">
          Menschen wandern. Lade dir die Karte einmal im Quartal neu und sieh, was sich verschoben hat.
        </p>
      </section>

      <div class="cta-row" style="margin-top: 36px;">
        <a href="index.html" class="btn btn-ghost">← Zurück zur Übersicht</a>
      </div>
    </main>
  `;

  bindForm();
  bindDots();
  bindList();
  updateRecommendation();
}

function renderListHtml() {
  if (!stakeholders.length) return '<p class="muted tiny">Noch keine Stakeholder.</p>';
  return stakeholders.map(s => `
    <div class="stake-row" data-id="${s.id}">
      <div>
        <div class="name">${escapeHtml(s.name)}</div>
        <div class="meta">${quadrantLabel(s)} · Einfluss ${rate(s.x)} · Wohlwollen ${rate(s.y)}</div>
      </div>
      <button class="btn-del" data-del="${s.id}" title="Entfernen">✕</button>
    </div>
  `).join('');
}

function renderDot(s) {
  const left = (s.x * 100).toFixed(2) + '%';
  const top  = ((1 - s.y) * 100).toFixed(2) + '%';
  return `<button class="dot ${selectedId === s.id ? 'is-selected' : ''}" data-id="${s.id}" style="left:${left}; top:${top};">${escapeHtml(s.name)}</button>`;
}

function bindForm() {
  const form = document.getElementById('addForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newName');
    const name = input.value.trim();
    if (!name) return;
    stakeholders.push({ id: id(), name, x: 0.5, y: 0.5 });
    input.value = '';
    save();
    render();
  });
}

function bindList() {
  document.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const did = btn.dataset.del;
      stakeholders = stakeholders.filter(s => s.id !== did);
      if (selectedId === did) selectedId = null;
      save();
      render();
    });
  });
}

function bindDots() {
  const matrix = document.getElementById('matrix');
  document.querySelectorAll('.dot').forEach(dot => {
    let dragging = false;
    let moved = false;
    let pid = null;

    dot.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      dragging = true;
      moved = false;
      pid = e.pointerId;
      dot.setPointerCapture(pid);
      dot.classList.add('is-dragging');
    });

    dot.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      moved = true;
      const rect = matrix.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
      const s = stakeholders.find(s => s.id === dot.dataset.id);
      if (s) {
        s.x = x; s.y = y;
        dot.style.left = (x * 100).toFixed(2) + '%';
        dot.style.top  = ((1 - y) * 100).toFixed(2) + '%';
        highlightQuadrant(x, y);
      }
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      dot.classList.remove('is-dragging');
      clearQuadrantHighlight();
      try { dot.releasePointerCapture(pid); } catch (_) {}
      if (moved) {
        save();
        refreshSidebar();
      } else {
        selectedId = (selectedId === dot.dataset.id) ? null : dot.dataset.id;
        render();
      }
    }

    dot.addEventListener('pointerup', endDrag);
    dot.addEventListener('pointercancel', endDrag);
  });
}

function highlightQuadrant(x, y) {
  clearQuadrantHighlight();
  const matrix = document.getElementById('matrix');
  if (!matrix) return;
  let bgClass, qClass;
  if      (x >= 0.5 && y >= 0.5) { bgClass = 'qtr'; qClass = 'tr'; }
  else if (x >= 0.5 && y <  0.5) { bgClass = 'qbr'; qClass = 'br'; }
  else if (x <  0.5 && y >= 0.5) { bgClass = 'qtl'; qClass = 'tl'; }
  else                           { bgClass = 'qbl'; qClass = 'bl'; }
  matrix.querySelector('.quadrant-bg.' + bgClass)?.classList.add('is-active');
  matrix.querySelector('.qlabel.' + qClass)?.classList.add('is-active');
}

function clearQuadrantHighlight() {
  document.querySelectorAll('.quadrant-bg.is-active').forEach(el => el.classList.remove('is-active'));
  document.querySelectorAll('.qlabel.is-active').forEach(el => el.classList.remove('is-active'));
}

function refreshSidebar() {
  const list = document.getElementById('stakeList');
  list.innerHTML = renderListHtml();
  bindList();
  updateRecommendation();
}

function updateRecommendation() {
  const box = document.getElementById('recoTop') || document.getElementById('recoBox');
  if (!box) return;

  const inInvest  = stakeholders.filter(s => s.x >= 0.5 && s.y >= 0.5);
  const inBewegen = stakeholders.filter(s => s.x >= 0.5 && s.y <  0.5);
  const inPflegen = stakeholders.filter(s => s.x <  0.5 && s.y >= 0.5);

  let main = '';
  if (inInvest.length === 0 && stakeholders.length > 0) {
    main = `Du hast aktuell <strong>keine Verbündeten mit hohem Einfluss</strong>.
            Das ist der Engpass. Frag dich: Wer könnte das werden?
            Wer im Quadranten „Pflegen" hat das Potenzial, einflussreicher zu werden?`;
  } else if (inBewegen.length >= 2) {
    main = `Du hast <strong>${inBewegen.length} einflussreiche Skeptiker:innen</strong>.
            Such gezielt das Gespräch. Nimm ihre Bedenken ernst — auch wenn es dich Energie kostet.
            Eine Person, die kippt, kann mehr verändern als zehn neue Fans.`;
  } else if (inInvest.length >= 3) {
    main = `Du hast eine <strong>solide Allianz</strong>.
            Pflege sie aktiv: ein Update pro Quartal, ein Anruf zur richtigen Zeit.
            Verbündete kühlen ab, wenn sie nichts mehr von dir hören.`;
  } else if (stakeholders.length === 0) {
    main = `Beginne mit fünf Namen. Wer weiß heute schon, dass du das Vorhaben angehst?
            Wer sollte es als Nächste:r erfahren?`;
  } else {
    main = `Deine Karte ist im Aufbau. Frag dich:
            Welche Person fehlt noch — vor allem in den oberen beiden Quadranten?`;
  }

  box.innerHTML = `
    <div class="recommendation lead">
      <h4>Nächster Hebel</h4>
      <p>${main}</p>
    </div>
  `;
}

function quadrantLabel(s) {
  if (s.x >= 0.5 && s.y >= 0.5) return 'Investieren';
  if (s.x >= 0.5 && s.y <  0.5) return 'Bewegen';
  if (s.x <  0.5 && s.y >= 0.5) return 'Pflegen';
  return 'Beobachten';
}

function rate(v) {
  const stars = Math.round(v * 5);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

render();
