/* ============================================================
   RENDER.JS — Rellena la web con los datos de content.js
   ------------------------------------------------------------
   Cada función pinta una sección leyendo window.SITE_CONTENT.
   Así el HTML queda limpio y todo el contenido se edita en
   un solo sitio (data/content.js).
   ============================================================ */

const C = window.SITE_CONTENT;   // atajo para no escribir tanto

/* Helper: genera el atributo onerror para que, si una imagen no
   carga, el hueco se rellene con un degradado de marca en vez de
   mostrar el icono roto del navegador. */
const IMG_FALLBACK = `onerror="this.style.display='none';this.parentElement.classList.add('img-fallback')"`;

/* ---------- Marca y navegación ---------- */
function renderBrand() {
  document.querySelectorAll('.logo').forEach(el => {
    el.innerHTML = `${C.brand.name}<span class="dot">${C.brand.dot}</span>`;
  });

  const nav = document.getElementById('nav-links');
  nav.innerHTML = C.nav
    .map(item => `<li><a href="${item.target}">${item.label}</a></li>`)
    .join('');
}

/* ---------- Hero ---------- */
function renderHero() {
  document.getElementById('hero-eyebrow').textContent = C.hero.eyebrow;
  document.getElementById('hero-subtitle').textContent = C.hero.subtitle;
  document.getElementById('hero-cta-1').textContent = C.hero.ctaPrimary;
  document.getElementById('hero-cta-2').textContent = C.hero.ctaSecondary;

  // Imagen de fondo del hero (visible sobre todo en el nivel Pro)
  const heroImg = document.getElementById('hero-bg-img');
  if (heroImg && C.hero.image) heroImg.src = C.hero.image;
  // El título lo gestiona animations.js (efecto typewriter en Pro,
  // texto normal en Básico/Medio)
}

/* ---------- Servicios (con imagen y fallback) ---------- */
function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = C.services.map(s => `
    <article class="service-card reveal">
      <div class="service-img">
        <img src="${s.image}" alt="${s.title}" loading="lazy" ${IMG_FALLBACK}>
        <span class="service-icon" aria-hidden="true">${s.icon}</span>
      </div>
      <div class="service-body">
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </div>
    </article>
  `).join('');
}

/* ---------- Galería de trabajos (marcos de navegador) ---------- */
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = C.portfolio.map(p => `
    <figure class="work-card reveal">
      <div class="browser">
        <div class="browser-bar">
          <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
          <span class="browser-url">${p.url}</span>
        </div>
        <div class="browser-shot">
          <img src="${p.image}" alt="${p.title}" loading="lazy" ${IMG_FALLBACK}>
        </div>
      </div>
      <figcaption>
        <h3>${p.title}</h3>
        <span class="work-cat">${p.category}</span>
      </figcaption>
    </figure>
  `).join('');
}

/* ---------- Proceso ---------- */
function renderProcess() {
  const grid = document.getElementById('process-grid');
  grid.innerHTML = C.process.map(p => `
    <article class="process-item reveal">
      <div class="step" aria-hidden="true">${p.step}</div>
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </article>
  `).join('');
}

/* ---------- Estadísticas ---------- */
function renderStats() {
  const grid = document.getElementById('stats-grid');
  grid.innerHTML = C.stats.map(s => `
    <div class="reveal">
      <div class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

/* ---------- Testimonios (con foto del cliente) ---------- */
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  grid.innerHTML = C.testimonials.map(t => `
    <article class="testimonial reveal">
      <div class="quote-mark" aria-hidden="true">"</div>
      <blockquote>${t.quote}</blockquote>
      <div class="testimonial-author">
        <div class="avatar-img">
          <img src="${t.avatar}" alt="${t.author}" loading="lazy" ${IMG_FALLBACK}>
        </div>
        <div>
          <div class="author">${t.author}</div>
          <div class="role">${t.role}</div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------- Planes ---------- */
function renderPlans() {
  const grid = document.getElementById('plans-grid');
  grid.innerHTML = C.plans.map(p => `
    <article class="plan-card reveal ${p.highlight ? 'highlight' : ''}">
      ${p.highlight ? `<span class="plan-badge">${p.badge}</span>` : ''}
      <h3>${p.name}</h3>
      <p class="plan-desc">${p.description}</p>
      <div class="plan-price">
        <span class="amount">${p.priceSetup.toLocaleString('es-ES')} €</span>
        <span class="period">pago único</span>
      </div>
      <div class="plan-monthly">+ ${p.priceMonthly} €/mes · hosting, dominio y soporte</div>
      <ul class="plan-features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
        ${p.notIncluded.map(f => `<li class="not">${f}</li>`).join('')}
      </ul>
      <a href="#contacto" class="btn">Elegir ${p.name}</a>
    </article>
  `).join('');

  document.getElementById('plans-note').textContent = C.plansNote;
}

/* ---------- Add-ons ---------- */
function renderAddons() {
  const grid = document.getElementById('addons-grid');
  grid.innerHTML = C.addons.map(a => `
    <article class="addon-card reveal">
      <div class="icon" aria-hidden="true">${a.icon}</div>
      <div>
        <h3>${a.name}</h3>
        <div class="addon-price">
          ${a.priceSetup} € configuración · + ${a.priceMonthly} €/mes
        </div>
        <p>${a.text}</p>
        <p class="detail">${a.detail}</p>
      </div>
    </article>
  `).join('');
}

/* ---------- Calculadora de presupuesto ---------- */
function renderCalculator() {
  // Botones de planes
  const planRow = document.getElementById('calc-plans');
  planRow.innerHTML = C.plans.map(p => `
    <button class="calc-option" data-type="plan" data-id="${p.id}">
      ${p.name} · ${p.priceSetup.toLocaleString('es-ES')} €
    </button>
  `).join('');

  // Botones de add-ons (se pueden marcar varios)
  const addonRow = document.getElementById('calc-addons');
  addonRow.innerHTML = C.addons.map(a => `
    <button class="calc-option" data-type="addon" data-id="${a.id}">
      ${a.icon} ${a.name} · +${a.priceSetup} €
    </button>
  `).join('');
}

/* ---------- Sección AMAIA ---------- */
function renderAmaia() {
  const d = C.amaiaDemo;
  document.getElementById('amaia-title').textContent = d.title;
  document.getElementById('amaia-subtitle').textContent = d.subtitle;
  document.getElementById('amaia-pitch').textContent = d.salesPitch;
  document.getElementById('chat-name').textContent = d.botName;

  // Botones con preguntas sugeridas
  const qWrap = document.getElementById('chat-questions');
  qWrap.innerHTML = d.questions.map((item, i) => `
    <button class="chat-q" data-q="${i}">${item.q}</button>
  `).join('');
}

/* ---------- Contacto y footer ---------- */
function renderContact() {
  document.getElementById('contact-title').textContent = C.contact.title;
  document.getElementById('contact-subtitle').textContent = C.contact.subtitle;
  document.getElementById('contact-btn').textContent = C.contact.button;
}

function renderFooter() {
  document.getElementById('footer-text').textContent = C.footer.text;
  document.getElementById('footer-sub').textContent = C.footer.subtext;
}

/* ---------- Función principal: pinta toda la web ---------- */
function renderAll() {
  renderBrand();
  renderHero();
  renderServices();
  renderPortfolio();
  renderProcess();
  renderStats();
  renderTestimonials();
  renderPlans();
  renderAddons();
  renderCalculator();
  renderAmaia();
  renderContact();
  renderFooter();
}
