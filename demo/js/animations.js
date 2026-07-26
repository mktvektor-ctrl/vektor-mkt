/* ============================================================
   ANIMATIONS.JS — Todas las animaciones de la web
   ------------------------------------------------------------
   1. Scroll reveal  → los elementos aparecen al entrar en pantalla
   2. Contadores     → los números de la franja de stats suben solos
   3. Partículas     → fondo animado del hero (solo nivel Pro)
   4. Typewriter     → el titular se escribe letra a letra (solo Pro)

   Nota de accesibilidad: si el usuario tiene activado
   "reducir movimiento", el CSS ya anula las transiciones y
   aquí evitamos lanzar las animaciones de JS.
   ============================================================ */

// ¿El usuario prefiere no ver animaciones?
// (el "&&" protege contra navegadores muy antiguos sin matchMedia)
const REDUCED_MOTION = !!(window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches);


/* ============ 1. SCROLL REVEAL ============ */

let revealObserver = null;

function initReveals() {
  // Navegadores muy antiguos sin IntersectionObserver:
  // mostramos todo directamente, sin animación
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('revealed');
      const counter = el.querySelector('.stat-value');
      if (counter) animateCounter(counter);
    });
    return;
  }

  // IntersectionObserver avisa cuando un elemento entra en pantalla
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Si el elemento es un contador de stats, lo animamos ahora
        const counter = entry.target.querySelector('.stat-value');
        if (counter) animateCounter(counter);

        // Una vez revelado, dejamos de observarlo (rendimiento)
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });   // se dispara cuando el 15% es visible

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* Quita la clase .revealed y vuelve a observar todo.
   Se usa al cambiar de nivel para repetir el efecto. */
function resetReveals() {
  if (revealObserver) revealObserver.disconnect();
  document.querySelectorAll('.reveal').forEach(el => el.classList.remove('revealed'));
  initReveals();
}


/* ============ 2. CONTADORES ANIMADOS ============ */

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';

  // Sin animaciones: mostramos el valor final directamente
  if (REDUCED_MOTION) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1400;              // milisegundos que dura la subida
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // easeOut: empieza rápido y frena al final (queda más natural)
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* Pone los contadores a 0 para que vuelvan a subir
   (se llama al entrar en el nivel Pro) */
function resetCounters() {
  document.querySelectorAll('.stat-value').forEach(el => {
    el.textContent = '0' + (el.dataset.suffix || '');
  });
}


/* ============ 3. PARTÍCULAS (fondo del hero en Pro) ============ */

let particlesRAF = null;   // id del bucle de animación
let particles = [];

function startParticles() {
  if (REDUCED_MOTION) return;   // respeto a la preferencia del usuario

  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;   // navegador sin soporte de canvas: sin partículas

  // Ajustamos el lienzo al tamaño real del hero
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // En móvil ponemos menos partículas (rendimiento y batería)
  const count = window.innerWidth < 640 ? 18 : 36;

  // Creamos las partículas con posición y velocidad aleatorias
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }));

  canvas.style.opacity = '1';

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movemos cada partícula y rebotamos en los bordes
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    // Dibujamos líneas entre partículas cercanas (efecto "red")
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - dist / 120) * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      // El punto de la partícula
      ctx.fillStyle = 'rgba(6, 182, 212, .55)';
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    particlesRAF = requestAnimationFrame(draw);
  }

  // Evitamos lanzar dos bucles a la vez
  stopParticles();
  draw();
}

function stopParticles() {
  if (particlesRAF) {
    cancelAnimationFrame(particlesRAF);
    particlesRAF = null;
  }
  const canvas = document.getElementById('particles');
  canvas.style.opacity = '0';
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}


/* ============ 4. TYPEWRITER (titular del hero en Pro) ============ */

let typeTimer = null;

function startTypewriter() {
  const el = document.getElementById('hero-title-text');
  const cursor = document.getElementById('hero-cursor');
  const phrase = window.SITE_CONTENT.hero.title;

  clearTimeout(typeTimer);

  if (REDUCED_MOTION) {
    el.textContent = phrase;
    cursor.style.display = 'none';
    return;
  }

  el.textContent = '';
  cursor.style.display = 'inline';

  let i = 0;
  function type() {
    if (i < phrase.length) {
      el.textContent += phrase[i];
      i++;
      typeTimer = setTimeout(type, 55);   // velocidad de escritura
    }
  }
  type();
}

/* En Básico y Medio el titular es texto normal, sin cursor */
function stopTypewriter() {
  clearTimeout(typeTimer);
  document.getElementById('hero-title-text').textContent = window.SITE_CONTENT.hero.title;
  document.getElementById('hero-cursor').style.display = 'none';
}
