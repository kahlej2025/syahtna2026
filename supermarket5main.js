

// main image
(function(){
  const card = document.querySelector('.prod3d');
  const img  = document.querySelector('.prod3d-img');
  const wrap = document.querySelector('.reveal-spring');
  if(!card || !img || !wrap) return;

  // Reveal بالدخول في الشاشة
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        wrap.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .25, rootMargin: '0px 0px -10% 0px' });
  io.observe(wrap);

  // 3D tilt/parallax مع الماوس
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  let rafId = null;
  function onMove(e){
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1
    const y = (e.clientY - rect.top)  / rect.height;  // 0..1
    const ry = (x - .5) * 14; // deg
    const rx = -(y - .5) * 10;
    const tx = (x - .5) * 16; // px parallax
    const ty = (y - .5) * 14;

    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(()=>{
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--tx', tx + 'px');
      card.style.setProperty('--ty', ty + 'px');
    });
  }
  function reset(){
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--tx', '0px');
    card.style.setProperty('--ty', '0px');
  }

  const useEvents = !('ontouchstart' in window);
  if(useEvents){
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  }
})();







// description
(function(){
  // ===== Reveal + Stagger
  const wrap = document.querySelector('.desc-reveal');
  if(wrap){
    const items = [...wrap.querySelectorAll('.desc-item')];
    const priceEl = wrap.querySelector('.price-val');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          wrap.classList.add('is-in');
         
          items.forEach((el,i)=> el.style.animationDelay = (i*90)+'ms');
          if(priceEl) priceEl.classList.add('flash');
          io.unobserve(e.target);
        }
      });
    }, { threshold:.2, rootMargin:'0px 0px -10% 0px' });
    io.observe(wrap);
  }

  // ===== Button interactions
  const btn = document.getElementById('btnAddToCart');
  if(btn){
    btn.addEventListener('click', (ev)=>{
      // Ripple
      const rect = btn.getBoundingClientRect();
      const x = ev.clientX - rect.left, y = ev.clientY - rect.top;
      const rp = document.createElement('span');
      rp.className = 'ripple';
      rp.style.left = x+'px'; rp.style.top = y+'px';
      btn.appendChild(rp);
      setTimeout(()=> rp.remove(), 650);
 
      btn.classList.add('added');
      setTimeout(()=> btn.classList.remove('added'), 800);
 
      const qtyInput = document.getElementById('qtyInput');
      const amount = Math.max(1, parseInt(qtyInput?.value || '1', 10));
      const bubble = document.createElement('span');
      bubble.className = 'add-float';
      bubble.textContent = `+${amount}`;
      
      btn.parentElement.appendChild(bubble);
      setTimeout(()=> bubble.remove(), 950);
    });
  }
})();

















 
  document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.getElementById("qtyInput");
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus  = document.getElementById("qtyPlus");

    // دالة ترجع القيمة بشكل صحيح (وتتأكد إنها ≥ min)
    function getQty() {
      let val = parseInt(qtyInput.value) || 1;
      let min = parseInt(qtyInput.min) || 1;
      if (val < min) val = min;
      return val;
    }

    // ناقص
    qtyMinus.addEventListener("click", () => {
      let current = getQty();
      if (current > 1) {
        qtyInput.value = current - 1;
      }
    });

    // زائد
    qtyPlus.addEventListener("click", () => {
      let current = getQty();
      qtyInput.value = current + 1;
    });

    // لو كتب رقم بإيده
    qtyInput.addEventListener("input", () => {
      qtyInput.value = getQty();
    });
  });
 






 
  (function () {
    const weightInput = document.getElementById('weightInput');
    const weightMinus = document.getElementById('weightMinus');
    const weightPlus  = document.getElementById('weightPlus');

    const STEP = 0.5;
    const MIN  = 0.5;

    function roundToStep(v) {
      return Math.max(MIN, Math.round(v / STEP) * STEP);
    }

    weightMinus?.addEventListener('click', () => {
      const current = parseFloat(weightInput.value || MIN);
      const next = Math.max(MIN, current - STEP);
      weightInput.value = next.toFixed(1);
      weightInput.dispatchEvent(new Event('change'));
    });

    weightPlus?.addEventListener('click', () => {
      const current = parseFloat(weightInput.value || MIN);
      const next = current + STEP;
      weightInput.value = next.toFixed(1);
      weightInput.dispatchEvent(new Event('change'));
    });

    // تنظيف الإدخال اليدوي
    weightInput?.addEventListener('blur', () => {
      let v = parseFloat(weightInput.value || MIN);
      if (isNaN(v)) v = MIN;
      weightInput.value = roundToStep(v).toFixed(1);
    });
  })();












 
  // add to cart
  (function () {
    const addBtn    = document.getElementById("addToCartBtn");
    const toast     = document.getElementById("toast");
    const cartBadge = document.getElementById("cartBadge");

    // ممكن تبدأ من localStorage بدل 0 لو حابب تخزين دائم
    let cartCount = 0; 

    function updateCartBadge() {
      if (!cartBadge) return;
      if (cartCount > 0) {
        cartBadge.textContent = cartCount;
        cartBadge.classList.remove("hidden");
        cartBadge.classList.add("flex");
      } else {
        cartBadge.textContent = "";
        cartBadge.classList.add("hidden");
        cartBadge.classList.remove("flex");
      }
    }

    function showToast() {
      if (!toast) return;
      toast.classList.remove("hidden");
      requestAnimationFrame(() => {
        toast.classList.remove("opacity-0", "translate-y-2");
        toast.classList.add("opacity-100", "translate-y-0");
      });
      setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.classList.add("hidden"), 300);
      }, 1500);
    }

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        // ✅ خُد الكمية من الحقل بدل cartCount++
        const qtyInput = document.getElementById("qtyInput");
        const amount = Math.max(1, parseInt(qtyInput?.value || "1", 10)); // <-- هنا التغيير
        cartCount += amount;                                              // <-- وهنا

        updateCartBadge();
        showToast();
      });
    }

    updateCartBadge();
  })();
 

























 

// cards
(function(){
  const grid = document.querySelector('.rel-grid');
  if(!grid) return;

  const cards = [...grid.querySelectorAll('.rel-card')];
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        grid.classList.add('is-in');
       
        cards.forEach((card,i)=>{
          const price = card.querySelector('.rel-price');
          if(price){ setTimeout(()=> price.classList.add('flash'), 120 + i*120); }
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold:.18, rootMargin:'0px 0px -8% 0px' });

  io.observe(grid);
})();
















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
 

