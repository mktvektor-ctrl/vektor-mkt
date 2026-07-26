/* ============================================================
   MAIN.JS — Punto de entrada de la web
   ------------------------------------------------------------
   Cuando el navegador termina de cargar el HTML:
   1. Pintamos todo el contenido       (render.js)
   2. Activamos el selector de nivel   (tierSwitcher.js)
   3. Preparamos las animaciones       (animations.js)
   4. Arrancamos el chat de AMAIA      (chatbot.js)
   5. Arrancamos la calculadora        (calculator.js)
   6. Menú móvil y formulario de contacto (aquí mismo)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Contenido */
  renderAll();

  /* 2-3. Nivel + animaciones
     (setTier ya llama a resetReveals internamente, por eso
     inicializamos las animaciones ANTES del switcher) */
  initReveals();
  initTierSwitcher();

  /* 4. Chat AMAIA */
  initChatbot();

  /* 5. Calculadora */
  initCalculator();

  /* 6a. Menú hamburguesa en móvil */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Al pulsar un enlace del menú móvil, lo cerramos
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });

  /* 6b. Formulario de contacto */
  initContactForm();
});


/* ============================================================
   FORMULARIO DE CONTACTO
   ------------------------------------------------------------
   Si en data/content.js has configurado un endpoint de
   Formspree, el formulario envía de verdad. Si no, mostramos
   un aviso amable (modo demo).
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const endpoint = window.SITE_CONTENT.contact.formspreeEndpoint;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();   // evitamos que la página se recargue

    // Modo demo: sin endpoint configurado
    if (!endpoint) {
      status.textContent = '✓ ¡Demo! En la web real, este mensaje llegaría a tu email.';
      status.className = 'form-status ok';
      form.reset();
      return;
    }

    // Modo real: enviamos a Formspree
    status.textContent = 'Enviando…';
    status.className = 'form-status';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = '✓ Mensaje enviado. Te responderemos muy pronto.';
        status.className = 'form-status ok';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = '✕ No se pudo enviar. Escríbenos a ' + window.SITE_CONTENT.contact.email;
      status.className = 'form-status error';
    }
  });
}
