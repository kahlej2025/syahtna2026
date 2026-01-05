
 // reveal to top seller 
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el=> io.observe(el));
  } else {
    els.forEach(el=> el.classList.add('is-visible'));
  }
});
 



// reveal to related to your cart
(function () {
  // أمان من كسر السكربت لو عناصر ناقصة
  const $all = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // ===== Reveal on view (.fx-reveal -> .fx-in) =====
  function revealInit() {
    const els = $all('.fx-reveal');
    if (!els.length) return;

    const enable = el => el.classList.add('fx-in');

    // احترم تقليل الحركة: أظهر فورًا
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduce || !('IntersectionObserver' in window)) {
      els.forEach(enable);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          enable(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    els.forEach(el => io.observe(el));
  }

  // ===== Parallax tilt للصور داخل .fx-frame (.fx-img) =====
  function parallaxInit() {
    const cards = $all('.fx-card');
    cards.forEach(card => {
      const img = card.querySelector('.fx-frame .fx-img');
      if (!img) return;

      let rect;
      const maxTilt = 10; // درجات
      const updateRect = () => rect = card.getBoundingClientRect();

      const onMove = (e) => {
        if (!rect) updateRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0..1
        const y = (e.clientY - rect.top) / rect.height;   // 0..1
        const rx = (0.5 - y) * maxTilt; // دوران X
        const ry = (x - 0.5) * maxTilt; // دوران Y
        img.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const reset = () => { img.style.transform = 'none'; };

      card.addEventListener('mouseenter', updateRect);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset);
      window.addEventListener('scroll', () => { rect = null; }, { passive: true });
      window.addEventListener('resize', () => { rect = null; });
    });
  }

  // ===== Ripple تأثير على الكارد    =====
  function rippleInit() {
    const els = $all('[data-ripple]');
    els.forEach(el => {
      el.style.position = el.style.position || 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('pointerdown', (e) => {
        const r = el.getBoundingClientRect();
        const d = Math.max(r.width, r.height);
        const x = e.clientX - r.left - d/2;
        const y = e.clientY - r.top  - d/2;

        const wave = document.createElement('span');
        wave.style.position = 'absolute';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.width = wave.style.height = `${d}px`;
        wave.style.borderRadius = '50%';
        wave.style.background = 'rgba(16,185,129,.18)'; // emerald
        wave.style.transform = 'scale(0)';
        wave.style.opacity = '1';
        wave.style.pointerEvents = 'none';
        wave.style.transition = 'transform .5s ease, opacity .6s ease';
        el.appendChild(wave);

        requestAnimationFrame(() => { wave.style.transform = 'scale(1)'; wave.style.opacity = '.0'; });
        setTimeout(() => wave.remove(), 650);
      });
    });
  }

  // شغّل بعد تحميل DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      revealInit(); parallaxInit(); rippleInit();
    });
  } else {
    revealInit(); parallaxInit(); rippleInit();
  }
})();
 









 







 


 
/* =========================================================
   Unified Cart & Slot Script
   ========================================================= */
(function () {
  // امنع التشغيل المزدوج
  if (window.__CART_JS_INITED__) return;
  window.__CART_JS_INITED__ = true;

  /* -------------------- Helpers -------------------- */
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const pick = (...ids) => ids.map(id => document.getElementById(id)).find(Boolean);

  const cartList     = $('#cartList');
  const subtotalEl   = pick('subtotal','os-subtotal');
  const deliveryEl   = pick('delivery','os-delivery');
  const taxesEl      = pick('taxes','os-taxes');
  const grandTotalEl = pick('grandTotal','os-total');

  const parseMoney = (str) => {
    const n = parseFloat(String(str).replace(/[^\d.]/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const fmt = n => (Math.round(n * 100) / 100).toFixed(2);
  const normalizeQty = v => {
    v = parseInt(v, 10);
    return isNaN(v) || v < 1 ? 1 : v;
  };

  // Toast خفيف
  function toast(msg='Done'){
    let t = document.getElementById('cartToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'cartToast';
      t.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:24px;background:#059669;color:#fff;padding:10px 14px;border-radius:999px;font-weight:600;z-index:1000;box-shadow:0 10px 20px rgba(5,150,105,.35);opacity:0;transition:opacity .25s ease';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(()=> t.style.opacity = '1');
    setTimeout(()=> t.style.opacity = '0', 1500);
  }

  /* -------------------- (A) Harmonize legacy qty blocks -------------------- */
  (function unifyQty(){
    if (!cartList) return;
    const svgMinus = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M5 12h14"/></svg>';
    const svgPlus  = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M12 5v14M5 12h14"/></svg>';

    cartList.querySelectorAll('.cart-item').forEach(item=>{
      if (item.querySelector('.qty-wrap')) return;
      const legacy = Array.from(item.querySelectorAll('div.flex.items-center'))
        .find(d => d.querySelector('input[type="number"]'));
      if (!legacy) return;

      const inputOld = legacy.querySelector('input[type="number"]');
      const currVal  = Math.max(1, parseInt(inputOld?.value || '1', 10) || 1);

      const wrap = document.createElement('div');
      wrap.className = 'qty-wrap flex items-center gap-2';
      wrap.innerHTML = `
        <button class="qty-dec qty-btn" aria-label="Decrease quantity">${svgMinus}</button>
        <input class="qty-input qty-box w-12 text-center outline-none" type="number" inputmode="numeric" min="1" value="${currVal}">
        <button class="qty-inc qty-btn" aria-label="Increase quantity">${svgPlus}</button>
      `;
      legacy.replaceWith(wrap);
    });
  })();

  /* -------------------- (B) Totals -------------------- */
  const DELIVERY_BASE = parseMoney(deliveryEl?.textContent || '0');
  const TAXES_BASE    = parseMoney(taxesEl?.textContent || '0');

  function calcLine(item) {
    const base = parseMoney(item.dataset.price || '0');
    const disc = parseFloat(item.dataset.discount || '0'); // 0.23 = 23%
    const input = item.querySelector('.qty-input');
    const qty = normalizeQty(input?.value || 1);
    if (input && String(input.value) !== String(qty)) input.value = qty;

    const unit  = base * (1 - (isNaN(disc) ? 0 : disc));
    const total = unit * qty;

    const lineEl = item.querySelector('.line-total');
    if (lineEl) lineEl.textContent = fmt(total);

    return total;
  }

  function updateTotals() {
    const items = cartList ? $$('.cart-item', cartList) : [];
    const subtotal = items.reduce((s, it) => s + calcLine(it), 0);

    if (subtotalEl)   subtotalEl.textContent   = fmt(subtotal);
    const delivery = parseMoney(deliveryEl?.textContent || '0');
    const taxes    = parseMoney(taxesEl?.textContent || '0');
    const grand    = subtotal + delivery + taxes;
    if (grandTotalEl) grandTotalEl.textContent = fmt(grand);
  }

  /* -------------------- (C) Qty bindings -------------------- */
  function bindQty(item){
    const wrap  = item.querySelector('.qty-wrap') || item;
    if (wrap.dataset.qtyBound === '1') return;
    wrap.dataset.qtyBound = '1';

    const dec   = item.querySelector('.qty-dec');
    const inc   = item.querySelector('.qty-inc');
    const input = item.querySelector('.qty-input');

    const refreshMin = ()=>{
      const v = normalizeQty(input?.value || 1);
      wrap.classList?.toggle('at-min', v <= 1);
    };

    const incStep = ()=>{
      const v = normalizeQty(input?.value || 1) + 1;
      input.value = v;
      wrap.classList?.add('bump-up');
      setTimeout(()=>wrap.classList?.remove('bump-up'), 180);
      updateTotals();
      refreshMin();
    };
    const decStep = ()=>{
      let v = normalizeQty(input?.value || 1);
      if (v <= 1) {
        wrap.classList?.add('shake');
        setTimeout(()=>wrap.classList?.remove('shake'), 350);
        refreshMin();
        return;
      }
      input.value = v - 1;
      wrap.classList?.add('bump-down');
      setTimeout(()=>wrap.classList?.remove('bump-down'), 180);
      updateTotals();
      refreshMin();
    };

    inc?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); incStep(); });
    dec?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); decStep(); });

    input?.addEventListener('input', ()=>{
      const v = normalizeQty(input.value);
      if (String(input.value) !== String(v)) input.value = v;
      updateTotals(); refreshMin();
    });
    input?.addEventListener('blur', ()=>{
      input.value = normalizeQty(input.value);
      updateTotals(); refreshMin();
    });

    refreshMin();
  }

  /* -------------------- (D) Remove bindings -------------------- */
  function bindRemove(item){
    if (item.dataset.removeBound === '1') return;
    item.dataset.removeBound = '1';
    item.querySelector('.remove-item')?.addEventListener('click', ()=>{
      item.style.transition = 'opacity .25s ease, transform .25s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateY(6px)';
      setTimeout(()=>{ item.remove(); updateTotals(); toast('Item removed'); }, 260);
    });
  }

  /* -------------------- (E) Promo codes -------------------- */
  const promoBtn   = document.querySelector('[data-i18n="btn_apply"]');
  const promoInput = document.querySelector('input[placeholder][data-i18n-attr="placeholder:promo_placeholder"]');

  function applyPromo(codeRaw){
    const code = String(codeRaw || '').trim().toUpperCase();

    if (deliveryEl) deliveryEl.textContent = fmt(DELIVERY_BASE);
    if (taxesEl)    taxesEl.textContent    = fmt(TAXES_BASE);

    const subtotal = parseMoney(subtotalEl?.textContent || '0');
    let msg = 'Promo applied';

    if (!code || code === 'RESET') {
      msg = 'Promo cleared';
    } else if (code === 'FREESHIP') {
      if (deliveryEl) deliveryEl.textContent = fmt(0);
      msg = 'Free shipping applied';
    } else if (code === 'SAVE10') {
      const d = subtotal * 0.10;
      if (taxesEl) taxesEl.textContent = fmt(Math.max(TAXES_BASE - d, 0));
      msg = '10% off applied';
    } else if (code === 'SAVE20') {
      const d = subtotal * 0.20;
      if (taxesEl) taxesEl.textContent = fmt(Math.max(TAXES_BASE - d, 0));
      msg = '20% off applied';
    } else {
      msg = 'Invalid promo';
    }
    updateTotals();
    toast(msg);
  }

  promoBtn?.addEventListener('click', ()=> applyPromo(promoInput?.value));
  promoInput?.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') { e.preventDefault(); applyPromo(promoInput.value); }
  });

  /* -------------------- (F) Init & observe -------------------- */
  function initItems(){
    const items = cartList ? $$('.cart-item', cartList) : [];
    items.forEach(it => { bindQty(it); bindRemove(it); });
    updateTotals();
  }
  initItems();

  if (cartList) {
    if (window.__CART_MO__) window.__CART_MO__.disconnect();
    const mo = new MutationObserver(muts=>{
      muts.forEach(m=>{
        m.addedNodes.forEach(n=>{
          if (n.nodeType !== 1) return;
          if (n.classList?.contains('cart-item')) {
            bindQty(n); bindRemove(n); updateTotals();
          } else {
            const items = $$('.cart-item', n);
            items.forEach(ci => { bindQty(ci); bindRemove(ci); });
            if (items.length) updateTotals();
          }
        });
      });
    });
    mo.observe(cartList, { childList: true, subtree: true });
    window.__CART_MO__ = mo;
  }

  /* -------------------- (G) Delivery Slot Modal -------------------- */
  (function slotModule(){
    const dayEl   = document.querySelector('[data-i18n="delivery_today"]');
    const timeEl  = document.querySelector('[data-i18n="delivery_time"]');
    const openBtn = document.querySelector('[data-i18n="btn_change_slot"]');
    const modal   = document.getElementById('slotModal');
    const timesWrap  = document.getElementById('slotTimes');
    const confirmBtn = document.getElementById('slotConfirm');

    if (!openBtn || !modal || !timesWrap || !confirmBtn) return;

    const SLOTS = {
      today:    ['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM'],
      tomorrow: ['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM']
    };

    let currentDay = 'today';
    let chosenTime = null;

    function openModal(){
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setActiveDay(currentDay);
    }
    function closeModal(){
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function renderTimes(day){
      timesWrap.innerHTML = '';
      SLOTS[day].forEach(t=>{
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'slot-time-btn';
        btn.textContent = t;
        btn.dataset.time = t;
        if (chosenTime && chosenTime.day === day && chosenTime.time === t) btn.classList.add('active');
        btn.addEventListener('click', ()=>{
          timesWrap.querySelectorAll('.slot-time-btn').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          chosenTime = {day, time:t};
          confirmBtn.disabled = false;
        });
        timesWrap.appendChild(btn);
      });
      if (!chosenTime || chosenTime.day !== day) confirmBtn.disabled = true;
    }

    function setActiveDay(day){
      currentDay = day;
      document.querySelectorAll('.slot-day-tab').forEach(tab=>{
        const active = tab.dataset.day === day;
        tab.classList.toggle('bg-emerald-600', active);
        tab.classList.toggle('text-white', active);
        tab.classList.toggle('bg-white', !active);
        tab.classList.toggle('text-gray-700', !active);
      });
      renderTimes(day);
    }

    document.querySelectorAll('.slot-day-tab').forEach(tab=>{
      tab.addEventListener('click', ()=> setActiveDay(tab.dataset.day));
    });

    openBtn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); });
    modal.querySelectorAll('[data-close-slot]').forEach(btn=>{
      btn.addEventListener('click', (e)=>{ e.preventDefault(); closeModal(); });
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    confirmBtn.addEventListener('click', ()=>{
      if (!chosenTime) return;
      if (dayEl)  dayEl.textContent  = chosenTime.day === 'today' ? 'Today' : 'Tomorrow';
      if (timeEl) timeEl.textContent = chosenTime.time;
      closeModal();
      toast('Delivery slot updated');
    });
  })();
})();







       
  document.addEventListener("DOMContentLoaded", () => {
    const slotButton = document.getElementById("openSlot");
    const changeSlotButton = document.getElementById("openSlot2");

    // إنشاء input مخفي لاختيار اليوم والوقت
    const dateTimePicker = document.createElement("input");
    dateTimePicker.type = "datetime-local";
    dateTimePicker.style.display = "none";
    document.body.appendChild(dateTimePicker);

    // عند الضغط على زر تغيير الموعد
    changeSlotButton.addEventListener("click", () => {
      dateTimePicker.showPicker(); // يفتح الكالندر (اليوم + الوقت)
    });

    // عند اختيار موعد جديد
    dateTimePicker.addEventListener("change", () => {
      const selectedDate = new Date(dateTimePicker.value);

      if (!isNaN(selectedDate)) {
        // تنسيق التاريخ والوقت إلى صيغة ودّية (Today أو غدًا + الوقت)
        const now = new Date();
        let dayLabel = "";

        const sameDay = selectedDate.toDateString() === now.toDateString();
        const tomorrow =
          selectedDate.toDateString() ===
          new Date(now.getTime() + 86400000).toDateString();

        if (sameDay) dayLabel = "Today";
        else if (tomorrow) dayLabel = "Tomorrow";
        else
          dayLabel = selectedDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

        // تنسيق الوقت
        const time = selectedDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });

        // تحديث العرض في النص والزر
        slotButton.textContent = time;
        slotButton.previousElementSibling.textContent = dayLabel;
      }
    });
  });
 














 



 // footer
  (function () {
    const revealables = document.querySelectorAll('[data-reveal]');
    const withStagger = (root) => {
      const items = root.querySelectorAll('li, a, p, h4, span');
      items.forEach((el, i) => el.style.setProperty('--rv-delay', (i * 60) + 'ms'));
    };
    if (!('IntersectionObserver' in window)) {
      revealables.forEach(el => { withStagger(el); el.classList.add('is-inview'); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          withStagger(entry.target);
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealables.forEach(el => io.observe(el));
  })();
 