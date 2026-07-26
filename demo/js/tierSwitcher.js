/* ============================================================
   TIERSWITCHER.JS — El corazón de la demo
   ------------------------------------------------------------
   Cambia entre Básico / Medio / Pro añadiendo una clase al
   <body>. El CSS hace el resto (colores, animaciones, qué
   secciones se ven). Aquí solo gestionamos:
   - el clic en los botones
   - reiniciar las animaciones al cambiar de nivel
   - activar/desactivar los efectos exclusivos del Pro
   ============================================================ */

const TIERS = ['basico', 'medio', 'pro'];

function setTier(tier) {
  // 1. Quitamos cualquier clase de nivel anterior y ponemos la nueva
  document.body.classList.remove(...TIERS.map(t => 'tier-' + t));
  document.body.classList.add('tier-' + tier);

  // 2. Marcamos el botón activo del selector
  document.querySelectorAll('.tier-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tier === tier);
  });

  // 3. Reiniciamos las animaciones de scroll para que se vean
  //    de nuevo al cambiar de nivel (efecto "wow" repetible)
  resetReveals();

  // 4. Efectos exclusivos del Pro (definidos en animations.js)
  if (tier === 'pro') {
    startParticles();     // fondo de partículas del hero
    startTypewriter();    // titular que se escribe solo
    resetCounters();      // los contadores vuelven a subir
  } else {
    stopParticles();
    stopTypewriter();     // pone el titular como texto normal
  }

  // 5. Guardamos la elección para recordarla si recargan la página
  try { localStorage.setItem('vektor-tier', tier); } catch (e) { /* modo privado */ }
}

function initTierSwitcher() {
  // Clic en los botones del selector
  document.querySelectorAll('.tier-btn').forEach(btn => {
    btn.addEventListener('click', () => setTier(btn.dataset.tier));
  });

  // Nivel inicial: el guardado, o "basico" por defecto
  // (empezar en básico hace que la subida a Pro impresione más)
  let saved = 'basico';
  try { saved = localStorage.getItem('vektor-tier') || 'basico'; } catch (e) {}
  setTier(TIERS.includes(saved) ? saved : 'basico');
}
