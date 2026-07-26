/* ============================================================
   CHATBOT.JS — Demo interactiva del bot AMAIA
   ------------------------------------------------------------
   Simula una conversación real: el visitante pulsa una pregunta
   sugerida, aparece como mensaje suyo, el bot "escribe" unos
   instantes y responde con la información de la empresa
   (la "memoria de empresa" que vive en data/content.js).

   IMPORTANTE: esto es una DEMO sin inteligencia artificial real.
   El AMAIA que se vende a los clientes sí se conecta a un modelo
   de IA; aquí solo mostramos cómo se ve y se siente.
   ============================================================ */

function initChatbot() {
  const messages = document.getElementById('chat-messages');
  const demo = window.SITE_CONTENT.amaiaDemo;

  /* --- Añade un mensaje a la ventana de chat --- */
  function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'msg ' + who;          // 'bot' o 'user'
    div.textContent = text;
    messages.appendChild(div);
    // Auto-scroll al último mensaje
    messages.scrollTop = messages.scrollHeight;
  }

  /* --- Muestra el indicador de "escribiendo…" y devuelve
         una función para quitarlo --- */
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return () => div.remove();
  }

  /* --- Mensaje de bienvenida al cargar --- */
  addMessage(demo.greeting, 'bot');

  /* --- Clic en una pregunta sugerida --- */
  document.getElementById('chat-questions').addEventListener('click', (e) => {
    const btn = e.target.closest('.chat-q');
    if (!btn || btn.disabled) return;

    const item = demo.questions[parseInt(btn.dataset.q, 10)];

    // 1. La pregunta aparece como mensaje del usuario
    addMessage(item.q, 'user');

    // 2. Desactivamos ese botón (ya se ha preguntado)
    btn.disabled = true;

    // 3. El bot "piensa" un momento y responde
    const removeTyping = showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(item.a, 'bot');
    }, 900 + Math.random() * 600);   // entre 0.9 y 1.5 segundos
  });
}
