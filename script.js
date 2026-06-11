/* =============================================
   VEKTOR MKT – vektor.js
   ============================================= */
'use strict';

// ── Year ──────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile menu ───────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  navToggle.classList.remove('active');
  navLinks.classList.remove('open');
}));

// ── Scroll reveal ─────────────────────────────
const aosEls = document.querySelectorAll('[data-aos]');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = e.target.dataset.delay || 0;
    setTimeout(() => e.target.classList.add('visible'), +delay);
    revObs.unobserve(e.target);
  });
}, { threshold: 0.12 });
aosEls.forEach(el => revObs.observe(el));

// ── Contact form ──────────────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const btnText     = document.getElementById('btn-text');
const feedback    = document.getElementById('form-feedback');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  submitBtn.disabled = true;
  btnText.textContent = 'Enviando…';

  try {
    const res = await fetch('https://amaia-bot-production.up.railway.app/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    document.getElementById('f-name').value,
        email:   document.getElementById('f-email').value,
        service: document.getElementById('f-service').value,
        message: document.getElementById('f-message').value
      })
    });

    const data = await res.json();

    if (data.ok) {
      btnText.textContent = '¡Enviado! ✓';
      feedback.textContent = '✅ Gracias, te respondemos en menos de 24 h.';
      feedback.className = 'form-feedback success';
      contactForm.reset();
    } else {
      throw new Error('Error del servidor');
    }
  } catch (err) {
    btnText.textContent = 'Enviar mensaje →';
    feedback.textContent = '❌ Algo salió mal. Inténtalo de nuevo.';
    feedback.className = 'form-feedback error';
  } finally {
    submitBtn.disabled = false;
    setTimeout(() => {
      btnText.textContent = 'Enviar mensaje →';
      feedback.className = 'form-feedback hidden';
    }, 5000);
  }
});

// ── CHAT WIDGET ───────────────────────────────
const chatToggle   = document.getElementById('chat-toggle');
const chatWindow   = document.getElementById('chat-window');
const chatCloseBtn = document.getElementById('chat-close');
const chatInput    = document.getElementById('chat-input');
const chatSendBtn  = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const quickChips   = document.getElementById('quick-chips');

let chatOpen = false;
let chatHistory = [];
let aiTyping = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('open', chatOpen);
  const icon = chatToggle.querySelector('.chat-toggle-icon');
  if (icon) icon.textContent = chatOpen ? '✕' : '💬';
  if (chatOpen) chatInput.focus();
}
chatToggle.addEventListener('click', toggleChat);
chatCloseBtn.addEventListener('click', toggleChat);

// Quick chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    sendMessage(chip.dataset.q);
    if (quickChips) quickChips.remove();
  });
});

// Send handlers
chatSendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });

function handleSend() {
  const text = chatInput.value.trim();
  if (!text || aiTyping) return;
  chatInput.value = '';
  if (quickChips && quickChips.parentNode) quickChips.remove();
  sendMessage(text);
}

function sendMessage(text) {
  appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  showTyping();
  callVektorAI([...chatHistory]);
}

function timeStr() {
  return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function appendMsg(role, html) {
  const wrap = document.createElement('div');
  wrap.className = `msg msg-${role}`;

  const av = document.createElement('div');
  av.className = 'msg-av' + (role === 'bot' ? ' gradient-bg' : '');
  av.textContent = role === 'bot' ? 'V' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  wrap.appendChild(av);
  wrap.appendChild(bubble);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  aiTyping = true;
  const wrap = document.createElement('div');
  wrap.className = 'msg msg-bot';
  wrap.id = 'typing-indicator';
  wrap.innerHTML = `
    <div class="msg-av gradient-bg">V</div>
    <div class="msg-bubble">
      <div class="typing"><span></span><span></span><span></span></div>
    </div>`;
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
  aiTyping = false;
}

// ── Claude API ────────────────────────────────
const SYSTEM_PROMPT = `Eres Vektor AI, el asistente virtual oficial de Vektor MKT, una agencia de soluciones digitales.
Responde SIEMPRE en español, con tono profesional pero cercano, como en un chat real.
Sé conciso: 2-3 párrafos máximo. Usa emojis con moderación.

SOBRE VEKTOR MKT:
- Empresa: Vektor MKT - Digital Solutions
- Servicios: Diseño web, Agentes de IA, Marketing Digital
- Web: diseño moderno, responsive, SEO, landing pages, e-commerce, portales, web apps
- IA: chatbots generativos, automatización, agentes 24/7, integración WhatsApp/Web
- Marketing: SEO, redes sociales, Meta Ads, Google Ads, email marketing, funnels
- Proceso: Diagnóstico → Propuesta → Ejecución ágil → Lanzamiento + soporte
- Ventajas: velocidad, resultados medibles, tecnología de vanguardia, comunicación directa
- Contacto: contacto@vektormkt.es | Web: www.vektormkt.es | Lun–Vie 9-20h
- Soporte IA: 24/7

PRECIOS ORIENTATIVOS:
- Landing page: desde 800€ | Web corporativa: desde 2.000€ | E-commerce: desde 2.500€
- Agente IA básico: desde 1.500€ | Agente IA avanzado: desde 3.000€
- Marketing mensual: desde 500€/mes | Packs combinados con descuento disponibles

Si preguntan por presupuesto exacto, indica que depende del proyecto y anima a contactar.
Redirige amablemente si preguntan cosas ajenas a Vektor MKT.`;

async function callVektorAI(history) {
  try {
    const lastMessage = history[history.length - 1].content;

    const res = await fetch('https://amaia-bot-production.up.railway.app/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: history })
});
    const data = await res.json();
    hideTyping();

    const reply = data.response || data.message || data.reply || data.text;
    if (reply) {
      appendMsg('bot', reply);
      chatHistory.push({ role: 'assistant', content: reply });
    } else {
      appendMsg('bot', 'Lo siento, algo salió mal. Escríbenos a **contacto@vektormkt.es** 🙏');
    }
  } catch (err) {
    hideTyping();
    appendMsg('bot', 'Error de conexión. Contáctanos en **contacto@vektormkt.es** 📧');
    console.error(err);
  }
}