/* ============================================================
   CALCULATOR.JS — Calculadora de presupuesto en vivo
   ------------------------------------------------------------
   El visitante elige un plan (solo uno) y los add-ons que
   quiera (varios). El total se actualiza al instante:
   - Pago único (setup)
   - Cuota mensual
   Es una de las piezas que más "vende" porque el cliente
   juega con su propio presupuesto.
   ============================================================ */

function initCalculator() {
  const plans = window.SITE_CONTENT.plans;
  const addons = window.SITE_CONTENT.addons;

  // Estado actual de la selección
  let selectedPlan = null;              // id del plan elegido
  const selectedAddons = new Set();     // ids de add-ons marcados

  const totalSetupEl = document.getElementById('calc-setup');
  const totalMonthlyEl = document.getElementById('calc-monthly');

  /* --- Recalcula y pinta los totales --- */
  function updateTotal() {
    let setup = 0;
    let monthly = 0;

    // Sumamos el plan elegido
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      setup += plan.priceSetup;
      monthly += plan.priceMonthly;
    }

    // Sumamos cada add-on marcado
    selectedAddons.forEach(id => {
      const addon = addons.find(a => a.id === id);
      if (addon) {
        setup += addon.priceSetup;
        monthly += addon.priceMonthly;
      }
    });

    // toLocaleString pone el punto de miles: 2.750 €
    totalSetupEl.textContent = setup.toLocaleString('es-ES') + ' €';
    totalMonthlyEl.textContent = '+ ' + monthly + ' €/mes';
  }

  /* --- Clic en cualquier opción de la calculadora --- */
  document.querySelector('.calculator').addEventListener('click', (e) => {
    const btn = e.target.closest('.calc-option');
    if (!btn) return;

    const { type, id } = btn.dataset;

    if (type === 'plan') {
      // Los planes son excluyentes: solo puede haber uno marcado
      selectedPlan = (selectedPlan === id) ? null : id;
      document.querySelectorAll('[data-type="plan"]').forEach(b => {
        b.classList.toggle('selected', b.dataset.id === selectedPlan);
      });
    } else {
      // Los add-ons se marcan y desmarcan libremente
      if (selectedAddons.has(id)) {
        selectedAddons.delete(id);
        btn.classList.remove('selected');
      } else {
        selectedAddons.add(id);
        btn.classList.add('selected');
      }
    }

    updateTotal();
  });

  updateTotal();   // pintamos el 0 € inicial
}
