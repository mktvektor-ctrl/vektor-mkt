/* ============================================================
   VEKTOR MKT — script.js
   ============================================================ */

'use strict';

/* ---------- CURSOR ---------- */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const mouseGlow = document.getElementById('mouse-glow');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate3d(${mx - 4}px,${my - 4}px,0)`;
  if (mouseGlow) {
    mouseGlow.style.transform = `translate3d(${mx - 200}px,${my - 200}px,0)`;
  }
});

(function animRing() {
  rx += (mx - rx) * .22;
  ry += (my - ry) * .22;
  cursorRing.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,input,select,textarea,.svc-card,.proj-card,.caso-item,.tech-logo').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '52px';
    cursorRing.style.height = '52px';
    cursorRing.style.borderColor = 'rgba(6,182,212,.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(6,182,212,.4)';
  });
});

/* ---------- NAV ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const open = navLinks.classList.contains('open');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

document.querySelectorAll('.nav-link, .btn-nav').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

/* ---------- YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- PARTICLE CANVAS ---------- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = [
  'rgba(6,182,212,',
  'rgba(59,130,246,',
  'rgba(139,92,246,',
  'rgba(236,72,153,'
];

const particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - .5) * .35,
  vy: (Math.random() - .5) * .35,
  r: Math.random() * 1.5 + .4,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  alpha: Math.random() * .4 + .15
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
  });

  // Connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 130) * .12})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ---------- NEURAL SVG HERO ---------- */
(function buildNeural() {
  const svg = document.getElementById('neural-anim');
  if (!svg) return;

  const W = 500, H = 500;
  const layers = [
    [{ x: 80,  y: 140 }, { x: 80,  y: 240 }, { x: 80,  y: 340 }],
    [{ x: 200, y: 90  }, { x: 200, y: 190 }, { x: 200, y: 290 }, { x: 200, y: 390 }],
    [{ x: 320, y: 130 }, { x: 320, y: 240 }, { x: 320, y: 350 }],
    [{ x: 430, y: 180 }, { x: 430, y: 300 }]
  ];

  const palette = ['#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899'];

  // Connections
  layers.forEach((layer, li) => {
    if (li >= layers.length - 1) return;
    layer.forEach(n => {
      layers[li + 1].forEach(m => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', n.x); line.setAttribute('y1', n.y);
        line.setAttribute('x2', m.x); line.setAttribute('y2', m.y);
        line.setAttribute('stroke', 'rgba(6,182,212,0.1)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);

        // Animated data pulse
        if (Math.random() > .5) {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('r', '2');
          circle.setAttribute('fill', palette[Math.floor(Math.random() * palette.length)]);
          const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
          anim.setAttribute('dur', (2 + Math.random() * 3) + 's');
          anim.setAttribute('repeatCount', 'indefinite');
          anim.setAttribute('begin', Math.random() * 3 + 's');
          anim.setAttribute('path', `M${n.x},${n.y} L${m.x},${m.y}`);
          circle.appendChild(anim);
          svg.appendChild(circle);
        }
      });
    });
  });

  // Nodes
  layers.forEach((layer, li) => {
    layer.forEach(n => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); c.setAttribute('r', '9');
      const col = palette[li % palette.length];
      c.setAttribute('fill', col.replace('#', 'rgba(').replace(/^rgba\(/, 'rgba(') + '15)');
      c.setAttribute('stroke', col); c.setAttribute('stroke-width', '1.5');
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      anim.setAttribute('attributeName', 'r');
      anim.setAttribute('values', '9;12;9');
      anim.setAttribute('dur', (2 + Math.random() * 2) + 's');
      anim.setAttribute('repeatCount', 'indefinite');
      anim.setAttribute('begin', Math.random() * 2 + 's');
      c.appendChild(anim); g.appendChild(c); svg.appendChild(g);
    });
  });

  // Labels
  ['Entrada', 'Proceso', 'Análisis', 'Salida'].forEach((label, i) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', [80, 200, 320, 430][i]);
    t.setAttribute('y', '470');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', '11');
    t.setAttribute('fill', 'rgba(148,163,184,.4)');
    t.setAttribute('font-family', 'Inter');
    t.textContent = label;
    svg.appendChild(t);
  });
})();

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 60);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- STAT COUNTERS ---------- */
function animateCount(el, target, suffix, duration = 2000) {
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  tick();
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target  = parseInt(el.dataset.count);
      const suffix  = el.dataset.suffix || '';
      if (!isNaN(target)) animateCount(el, target, suffix);
      countObserver.unobserve(el);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

/* ---------- AMAIA CHAT DEMO (hero section) ---------- */
(function amaiaChatDemo() {
  const msgsEl = document.getElementById('amaia-msgs');
  if (!msgsEl) return;

  const typing = document.getElementById('typing-msg');
  const responses = [
    'Analizando base de datos de reclamaciones...',
    '✅ <strong>Informe generado.</strong> Esta semana: 23 reclamaciones, 18 resueltas (78%). Tiempo medio: 4.2h. ¿Lo envío a dirección por email?'
  ];

  let i = 0;
  function addMsg() {
    if (i >= responses.length) return;
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'msg';
      div.innerHTML = `<div class="msg-av-sm av-bot" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;flex-shrink:0;">Am</div><div class="msg-bubble" style="padding:.75rem 1rem;border-radius:14px 14px 14px 3px;background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.15);font-size:13px;line-height:1.6;max-width:85%;">${responses[i]}</div>`;
      if (typing) msgsEl.insertBefore(div, typing);
      else msgsEl.appendChild(div);
      i++;
      if (i < responses.length) addMsg();
    }, 1600);
  }
  setTimeout(addMsg, 2000);
})();

/* ---------- CHAT WIDGET ---------- */
const chatFab    = document.getElementById('chat-fab');
const chatWidget = document.getElementById('chat-widget');
const cwClose    = document.getElementById('cw-close');
const cwInput    = document.getElementById('cw-input');
const cwSend     = document.getElementById('cw-send');
const cwMsgs     = document.getElementById('cw-msgs');

chatFab.addEventListener('click', () => chatWidget.classList.toggle('open'));
cwClose.addEventListener('click', () => chatWidget.classList.remove('open'));

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function appendMsg(text, isBot) {
  const div = document.createElement('div');
  div.className = 'cw-msg' + (isBot ? ' cw-msg-bot' : ' cw-msg-user');
  div.innerHTML = isBot
    ? `<div class="cw-msg-av">Am</div><div class="cw-bubble">${text}</div>`
    : `<div class="cw-bubble">${text}</div>`;
  cwMsgs.appendChild(div);
  cwMsgs.scrollTop = cwMsgs.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'cw-msg cw-msg-bot cw-typing-indicator';
  div.innerHTML = '<div class="cw-msg-av">Am</div><div class="cw-bubble cw-typing"><span></span><span></span><span></span></div>';
  cwMsgs.appendChild(div);
  cwMsgs.scrollTop = cwMsgs.scrollHeight;
  return div;
}

// ── SYSTEM PROMPT amaIA ──────────────────────
const AMAIA_SYSTEM = `Eres amaIA, el asistente inteligente de Vektor MKT, empresa especializada en IA empresarial y automatización de procesos para PYMEs e industria española.
Responde SIEMPRE en español, con tono profesional pero cercano.
Sé conciso: 2-3 párrafos máximo. Usa emojis con moderación.

SOBRE VEKTOR MKT:
- Especialistas en: Agentes IA, Automatización de procesos, Plataformas inteligentes, Integración de sistemas
- Proyectos: AmaIA (asistente IA), AmaIA Almacén, FichajesPro, TicketFlow, StorePilot
- Canales: WhatsApp, Telegram, Web, Teams, ERP
- Contacto: contacto@vektormkt.es | Lun–Vie 9-20h | Agentes 24/7
- Siempre dispuestos a crear nuevas soluciones a medida para cualquier empresa o sector.

Si preguntan por presupuesto, indica que depende del proyecto y anima a contactar.`;

let amaiaHistory = [];
let amaiaTyping = false;

async function sendChat() {
  const msg = cwInput.value.trim();
  if (!msg || amaiaTyping) return;
  cwInput.value = '';

  // Append user message
  const userDiv = document.createElement('div');
  userDiv.className = 'cw-msg cw-msg-user';
  userDiv.innerHTML = `<div class="cw-bubble">${escapeHTML(msg)}</div>`;
  cwMsgs.appendChild(userDiv);
  cwMsgs.scrollTop = cwMsgs.scrollHeight;

  // Add to history
  amaiaHistory.push({ role: 'user', content: msg });

  // Show typing
  amaiaTyping = true;
  const typingEl = document.createElement('div');
  typingEl.className = 'cw-msg cw-msg-bot';
  typingEl.innerHTML = '<div class="cw-msg-av" style="background:#0d1520;padding:2px;"><img src="img/proyectos/amaia-logo.png" alt="AmaIA" style="width:20px;height:20px;object-fit:contain;border-radius:50%;"/></div><div class="cw-bubble cw-typing"><span></span><span></span><span></span></div>';
  cwMsgs.appendChild(typingEl);
  cwMsgs.scrollTop = cwMsgs.scrollHeight;

  try {
    const res = await fetch('https://amaia-bot-production.up.railway.app/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: amaiaHistory })
    });
    const data = await res.json();
    const reply = data.response || data.message || data.reply || data.text || 'Para más información contacta con nosotros en contacto@vektormkt.es ✉️';

    typingEl.remove();
    amaiaTyping = false;

    const botDiv = document.createElement('div');
    botDiv.className = 'cw-msg cw-msg-bot';
    botDiv.innerHTML = `<div class="cw-msg-av" style="background:#0d1520;padding:2px;"><img src="img/proyectos/amaia-logo.png" alt="AmaIA" style="width:20px;height:20px;object-fit:contain;border-radius:50%;"/></div><div class="cw-bubble">${escapeHTML(reply).replace(/\n/g,'<br/>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div>`;
    cwMsgs.appendChild(botDiv);
    amaiaHistory.push({ role: 'assistant', content: reply });

  } catch(err) {
    typingEl.remove();
    amaiaTyping = false;
    const errDiv = document.createElement('div');
    errDiv.className = 'cw-msg cw-msg-bot';
    errDiv.innerHTML = '<div class="cw-msg-av" style="background:#0d1520;padding:2px;"><img src="img/proyectos/amaia-logo.png" alt="AmaIA" style="width:20px;height:20px;object-fit:contain;border-radius:50%;"/></div><div class="cw-bubble">Error de conexión. Escríbenos a <strong>contacto@vektormkt.es</strong> 📧</div>';
    cwMsgs.appendChild(errDiv);
    console.error(err);
  }
  cwMsgs.scrollTop = cwMsgs.scrollHeight;
}

cwSend.addEventListener('click', sendChat);
cwInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

/* ---------- CONTACT FORM ---------- */
const submitBtn = document.getElementById('submit-btn');
const formMsg   = document.getElementById('form-msg');

if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const name    = document.getElementById('f-name')?.value.trim();
    const email   = document.getElementById('f-email')?.value.trim();
    const company = document.getElementById('f-company')?.value.trim();
    const service = document.getElementById('f-service')?.value;
    const message = document.getElementById('f-msg')?.value.trim();
    const btnText = document.getElementById('btn-text');

    if (!name || !email || !message) {
      formMsg.style.color = '#f87171';
      formMsg.textContent = 'Por favor completa los campos requeridos.';
      return;
    }

    btnText.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      const res = await fetch('https://amaia-bot-production.up.railway.app/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, service, message })
      });
      const data = await res.json();
      if (data.ok) {
        btnText.textContent = '✅ ¡Enviado!';
        formMsg.style.color = '#34d399';
        formMsg.textContent = 'Recibido. Te respondemos en menos de 24 horas.';
        document.getElementById('f-name').value = '';
        document.getElementById('f-email').value = '';
        document.getElementById('f-msg').value = '';
      } else { throw new Error(); }
    } catch {
      btnText.textContent = 'Solicitar demostración gratuita →';
      formMsg.style.color = '#f87171';
      formMsg.textContent = 'Algo salió mal. Escríbenos a contacto@vektormkt.es';
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        btnText.textContent = 'Solicitar demostración gratuita →';
        formMsg.textContent = '';
      }, 6000);
    }
  });
}

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- PARALLAX HERO ORBS ---------- */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - .5) * 20;
  const y = (e.clientY / window.innerHeight - .5) * 20;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    const factor = (i + 1) * .4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
  document.querySelectorAll('.float-card').forEach((card, i) => {
    const factor = (i + 1) * .15;
    card.style.transform = `translateY(${-y * factor}px)`;
  });
});

/* ---------- TECH STRIP — pause on hover ---------- */
const techStrip = document.querySelector('.tech-strip');
if (techStrip) {
  techStrip.addEventListener('mouseenter', () => techStrip.style.animationPlayState = 'paused');
  techStrip.addEventListener('mouseleave', () => techStrip.style.animationPlayState = 'running');
}

console.log('%c⚡ Vektor MKT — Automatización e IA Empresarial', 'color:#06b6d4;font-size:14px;font-weight:bold;');