/* ============================================================
   CONTENT.JS — "Base de datos" de la web
   ------------------------------------------------------------
   Aquí viven TODOS los textos, precios, imágenes y datos.
   Para cambiar un precio, un titular, una foto o un testimonio,
   edita este archivo y nada más: el HTML se rellena solo.

   Sobre las imágenes: usamos fotos de Unsplash (gratuitas y de
   uso libre) servidas por su CDN. Si algún día quieres usar tus
   propias fotos, sustituye la URL por la ruta de tu imagen
   (ej: "img/mi-foto.jpg"). Si una imagen no cargara, la web
   muestra automáticamente un degradado de color de respaldo.
   ============================================================ */

window.SITE_CONTENT = {

  /* ---------- Marca / identidad ---------- */
  brand: {
    name: "VEKTOR",
    dot: ".",
    tagline: "Marketing & Desarrollo Web"
  },

  /* ---------- Menú de navegación ---------- */
  nav: [
    { label: "Inicio",    target: "#hero" },
    { label: "Servicios", target: "#servicios" },
    { label: "Trabajos",  target: "#trabajos" },
    { label: "Planes",    target: "#planes" },
    { label: "AMAIA",     target: "#amaia" },
    { label: "Contacto",  target: "#contacto" },
    { label: "← Vektor MKT", target: "https://vektormkt.es" }
  ],

  /* ---------- Hero (primera pantalla) ---------- */
  hero: {
    eyebrow: "AGENCIA DIGITAL",
    title: "Convertimos ideas en negocio",
    subtitle: "Diseño, tecnología y estrategia en un solo equipo. Webs que no solo se ven bien: venden.",
    ctaPrimary: "Empezar proyecto",
    ctaSecondary: "Ver planes",
    // Imagen de fondo del hero (se usa a pantalla completa en el nivel Pro)
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
  },

  /* ---------- Servicios (ahora con imagen cada uno) ---------- */
  services: [
    {
      icon: "🎯",
      title: "Estrategia digital",
      text: "Analizamos tu negocio y tu competencia para que cada euro invertido tenga un objetivo claro.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      icon: "💻",
      title: "Diseño y desarrollo web",
      text: "Webs rápidas, modernas y adaptadas a móvil, pensadas para convertir visitantes en clientes.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
    },
    {
      icon: "🤖",
      title: "Automatización con IA",
      text: "Nuestro bot AMAIA atiende a tus clientes 24/7 con la información real de tu empresa.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
    },
    {
      icon: "🛒",
      title: "Venta online",
      text: "Catálogo, carrito y pasarela de pago para que tu negocio venda también mientras duermes.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    }
  ],

  /* ---------- Galería de trabajos (marcos de navegador) ----------
     Cada trabajo se muestra dentro de un "navegador" simulado con
     una captura. Es lo que más impresiona a un cliente de diseño web:
     ver ejemplos reales de webs.                                   */
  portfolio: [
    {
      title: "Clínica dental",
      category: "Salud · Reservas online",
      url: "clinica-sonrisa.es",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80"
    },
    {
      title: "Estudio de arquitectura",
      category: "Portfolio · Corporativa",
      url: "estudio-lineal.es",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
    },
    {
      title: "Asesoría legal",
      category: "Servicios · Captación de leads",
      url: "lex-asesores.es",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
    },
    {
      title: "Tienda gourmet",
      category: "E-commerce · Tienda online",
      url: "sabores-selectos.es",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=900&q=80"
    }
  ],

  /* ---------- Proceso de trabajo (timeline) ---------- */
  process: [
    { step: "01", title: "Diagnóstico",  text: "Escuchamos tu negocio, tus objetivos y tu presupuesto." },
    { step: "02", title: "Propuesta",    text: "Te presentamos diseño, plan y precio cerrado. Sin sorpresas." },
    { step: "03", title: "Desarrollo",   text: "Construimos tu web y la revisas antes de publicarla." },
    { step: "04", title: "Lanzamiento",  text: "Publicamos, medimos resultados y te acompañamos cada mes." }
  ],

  /* ---------- Estadísticas (franja oscura del nivel Pro) ---------- */
  stats: [
    { value: 150, suffix: "+", label: "Proyectos entregados" },
    { value: 98,  suffix: "%", label: "Clientes satisfechos" },
    { value: 24,  suffix: "/7", label: "Atención con AMAIA" },
    { value: 12,  suffix: "",  label: "Años de experiencia" }
  ],

  /* ---------- Testimonios (ahora con foto) ---------- */
  testimonials: [
    {
      quote: "Duplicamos las solicitudes de presupuesto en tres meses. La web se paga sola.",
      author: "Laura García",
      role: "Clínica dental",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
    },
    {
      quote: "AMAIA responde a mis clientes a cualquier hora. Es como tener una recepcionista más.",
      author: "Carlos Méndez",
      role: "Asesoría fiscal",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
    },
    {
      quote: "Por fin una agencia que habla claro: precio cerrado, plazos cumplidos y soporte real.",
      author: "Ana Ruiz",
      role: "Estudio de arquitectura",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
    }
  ],

  /* ---------- Planes y precios ---------- */
  plans: [
    {
      id: "basico",
      name: "Básico",
      priceSetup: 550,
      priceMonthly: 19,
      highlight: false,
      description: "Presencia profesional para empezar.",
      features: [
        "Web de 1 página (hasta 4 secciones)",
        "Diseño adaptado a móvil",
        "Formulario de contacto",
        "SEO básico",
        "1 cambio de contenido al mes",
        "Hosting, dominio y SSL incluidos",
        "Soporte por email (48 h)"
      ],
      notIncluded: [
        "Animaciones avanzadas",
        "Blog / páginas adicionales"
      ]
    },
    {
      id: "medio",
      name: "Medio",
      priceSetup: 1100,
      priceMonthly: 35,
      highlight: true,
      badge: "Más elegido",
      description: "Para negocios que quieren crecer.",
      features: [
        "Web de 5–8 páginas + blog",
        "Diseño adaptado a móvil",
        "Animaciones de scroll",
        "SEO trabajado por página",
        "Hasta 3 cambios al mes",
        "Revisión mensual (velocidad, enlaces)",
        "Hosting, dominio y SSL incluidos",
        "Soporte email / WhatsApp (24–48 h)"
      ],
      notIncluded: [
        "Cambios ilimitados"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      priceSetup: 2200,
      priceMonthly: 59,
      highlight: false,
      description: "Diseño premium que impresiona y vende.",
      features: [
        "Diseño 100 % a medida",
        "Animaciones avanzadas y microinteracciones",
        "Copywriting optimizado para vender",
        "SEO avanzado",
        "Cambios menores ilimitados (hasta 2 h/mes)",
        "Informe mensual de visitas",
        "1 mejora SEO al trimestre",
        "Soporte prioritario (mismo día)"
      ],
      notIncluded: []
    }
  ],

  plansNote: "Precios sin IVA. Cambio menor = textos, imágenes, precios u horarios. Nuevas secciones o funcionalidades se presupuestan aparte. Los cambios no usados no se acumulan.",

  /* ---------- Add-ons (extras contratables) ---------- */
  addons: [
    {
      id: "amaia",
      icon: "🤖",
      name: "Bot AMAIA",
      priceSetup: 500,
      priceMonthly: 39,
      text: "Asistente con IA entrenado con la memoria de tu empresa: horarios, servicios, precios y preguntas frecuentes. Atiende a tus clientes 24/7.",
      detail: "Incluye configuración, entrenamiento inicial y 1 actualización de contenido al mes."
    },
    {
      id: "tienda",
      icon: "🛒",
      name: "Tienda online",
      priceSetup: 950,
      priceMonthly: 25,
      text: "Catálogo de productos, carrito y pasarela de pago segura integrados en tu web.",
      detail: "Incluye alta de productos inicial, gestión de pedidos y actualizaciones de seguridad."
    }
  ],

  /* ---------- Demo del chat AMAIA ---------- */
  amaiaDemo: {
    title: "Conoce a AMAIA",
    subtitle: "Tu asistente con la memoria de tu empresa. Pruébala: haz clic en una pregunta.",
    botName: "AMAIA",
    greeting: "¡Hola! Soy AMAIA, la asistente virtual. Conozco todos los detalles de esta empresa. ¿En qué puedo ayudarte?",
    questions: [
      {
        q: "¿Qué horario tenéis?",
        a: "Nuestro horario es de lunes a viernes, de 9:00 a 18:00. Los fines de semana puedes dejarme tu consulta y el equipo te responderá el lunes a primera hora. 😊"
      },
      {
        q: "¿Cuánto cuesta una web?",
        a: "Tenemos tres planes: Básico desde 550 €, Medio desde 1.100 € (el más elegido) y Pro desde 2.200 €. Todos incluyen hosting y dominio en su cuota mensual. ¿Quieres que te explique las diferencias?"
      },
      {
        q: "¿Hacéis tiendas online?",
        a: "¡Sí! La tienda online es un complemento que se añade a cualquier plan: catálogo, carrito y pasarela de pago desde 950 € + 25 €/mes. Perfecta si quieres vender tus productos por internet."
      },
      {
        q: "¿Puedo hablar con una persona?",
        a: "¡Claro! Puedes escribir al equipo desde el formulario de contacto de esta misma página, o si lo prefieres te dejo el email: hola@vektormkt.es. Te responden en menos de 24 h."
      }
    ],
    salesPitch: "💡 Así funcionaría AMAIA en la web de tu negocio: entrenada con TUS horarios, TUS precios y TUS servicios."
  },

  /* ---------- Contacto ---------- */
  contact: {
    title: "¿Hablamos de tu proyecto?",
    subtitle: "Cuéntanos qué necesitas y te enviamos una propuesta sin compromiso.",
    email: "hola@vektormkt.es",
    formspreeEndpoint: "",
    button: "Enviar mensaje"
  },

  /* ---------- Pie de página ---------- */
  footer: {
    text: "© 2026 VEKTOR Marketing · Demo interactiva de niveles de diseño",
    subtext: "Vuelve a la web principal en vektormkt.es"
  }
};
