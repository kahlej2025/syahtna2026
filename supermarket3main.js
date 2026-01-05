 
 // ===== Scoped JS (targets only elements INSIDE #supermarketNavbar)  
 
  (function(){
    const root = document.getElementById('supermarketNavbar');
    if (!root) return;

    const nav = root.querySelector('#categoriesSlider');
    const leftBtn = root.querySelector('#super_scrollLeft');
    const rightBtn = root.querySelector('#super_scrollRight');
    const items = Array.from(nav.querySelectorAll('.super-nav-item'));

    function scrollToIndex(i){
      const target = items[Math.max(0, Math.min(items.length-1, i))];
      if (!target) return;
      const left = target.offsetLeft + (target.offsetWidth/2) - nav.clientWidth/2;
      nav.scrollTo({ left, behavior: 'smooth' });
      setActive(target);
    }

    function nearestIndex(){
      const center = nav.scrollLeft + nav.clientWidth/2;
      let best = { idx:0, dist: Infinity };
      items.forEach((it, idx) => {
        const c = it.offsetLeft + it.offsetWidth/2;
        const d = Math.abs(c - center);
        if (d < best.dist) best = { idx, dist: d };
      });
      return best.idx;
    }

    leftBtn.addEventListener('click', () => { scrollToIndex(nearestIndex() - 1); });
    rightBtn.addEventListener('click', () => { scrollToIndex(nearestIndex() + 1); });

    nav.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(nearestIndex() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(nearestIndex() + 1); }
    });

    // pointer drag
    let down=false, startX=0, scrollStart=0;
    nav.addEventListener('pointerdown', (e) => {
      down = true; nav.setPointerCapture(e.pointerId);
      startX = e.clientX; scrollStart = nav.scrollLeft;
      nav.classList.add('dragging');
    });
    nav.addEventListener('pointermove', (e) => {
      if (!down) return;
      nav.scrollLeft = scrollStart - (e.clientX - startX);
    });
    function up(e){
      if(!down) return;
      down=false; try{ nav.releasePointerCapture(e.pointerId); } catch {}
      nav.classList.remove('dragging');
      scrollToIndex(nearestIndex());
    }
    nav.addEventListener('pointerup', up);
    nav.addEventListener('pointercancel', up);
    nav.addEventListener('pointerleave', up);

    // auto-snap
    let st;
    nav.addEventListener('scroll', () => {
      clearTimeout(st);
      st = setTimeout(() => scrollToIndex(nearestIndex()), 120);
    }, { passive: true });

    // active state handlers
    function clearActive(){ items.forEach(i=>{ i.classList.remove('active'); i.removeAttribute('aria-current'); }); }
    function setActive(el){
      clearActive();
      el.classList.add('active');
      el.setAttribute('aria-current', 'true');
    }
    items.forEach((it, idx) => {
      it.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToIndex(idx);
      });
      if (idx === 0) setActive(it);
    });

    // keep centered on resize
    let rT;
    window.addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => scrollToIndex(nearestIndex()), 100);
    });
  })();
 


  //filter
(() => {
  const root = document.getElementById('resultsSection');
  if (!root) return;

  const $  = (sel, r = root) => r.querySelector(sel);
  const $$ = (sel, r = root) => Array.from(r.querySelectorAll(sel));

  const grid      = $('#productsGrid');
  const cards     = () => $$('#productsGrid > *');

  const inpSearch = $('#fltSearch');
  const inpFrom   = $('#fltPriceFrom');
  const inpTo     = $('#fltPriceTo');
  const chkSale   = $('#fltSale');
  const chkStock  = $('#fltStock');
  const chkBest   = $('#fltBest');
  const listCats  = $('#fltCats');
  const listStores= $('#fltStores');
  const btnApply  = $('#btnApply');
  const btnReset  = $('#btnReset');
  const resultsEl = $('#resultsCount');

  const getCheckedValues = (container) =>
    $$("input[type='checkbox']", container).filter(i => i.checked).map(i => (i.value || '').trim());

  const applyFilters = () => {
    const q      = (inpSearch?.value || '').trim().toLowerCase();
    const pFrom  = parseFloat(inpFrom?.value);
    const pTo    = parseFloat(inpTo?.value);
    const cats   = getCheckedValues(listCats);
    const stores = getCheckedValues(listStores);

    const reqSale  = !!(chkSale && chkSale.checked);
    const reqStock = !!(chkStock && chkStock.checked);
    const reqBest  = !!(chkBest && chkBest.checked);

    let visible = 0;

    cards().forEach(card => {
      const name  = (card.dataset.name || '').toLowerCase();
      const price = parseFloat(card.dataset.price || '0');
      const cat   = (card.dataset.category || '').toLowerCase();
      const store = (card.dataset.store || '').toLowerCase();
      const flags = (card.dataset.flags || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

      let ok = true;

      if (q && !name.includes(q)) ok = false;
      if (!isNaN(pFrom) && price < pFrom) ok = false;
      if (!isNaN(pTo)   && price > pTo)   ok = false;

      if (ok && cats.length   > 0 && !cats.includes(cat)) ok = false;
      if (ok && stores.length > 0 && !stores.includes(store)) ok = false;

      if (ok && reqSale  && !flags.includes('sale')) ok = false;
      if (ok && reqStock && !flags.includes('stock')) ok = false;
      if (ok && reqBest  && !flags.includes('best')) ok = false;

      card.classList.toggle('hidden', !ok);
      if (ok) visible++;
    });

    if (resultsEl) {
      const rtl = document.documentElement.dir === 'rtl';
      resultsEl.textContent = visible === 0
        ? (rtl ? 'لا توجد نتائج' : 'No results')
        : (rtl ? `عدد النتائج: ${visible}` : `Results: ${visible}`);
    }
  };

  let t;
  const debounced = () => { clearTimeout(t); t = setTimeout(applyFilters, 150); };

  inpSearch?.addEventListener('input', debounced);
  inpFrom?.addEventListener('input', debounced);
  inpTo?.addEventListener('input', debounced);
  chkSale?.addEventListener('change', applyFilters);
  chkStock?.addEventListener('change', applyFilters);
  chkBest?.addEventListener('change', applyFilters);

  $$(`#fltCats input[type='checkbox']`).forEach(cb => cb.addEventListener('change', applyFilters));
  $$(`#fltStores input[type='checkbox']`).forEach(cb => cb.addEventListener('change', applyFilters));

  btnApply?.addEventListener('click', (e) => { e.preventDefault(); applyFilters(); });
  btnReset?.addEventListener('click', (e) => {
    e.preventDefault();
    if (inpSearch) inpSearch.value = '';
    if (inpFrom)   inpFrom.value = '';
    if (inpTo)     inpTo.value = '';
    if (chkSale)   chkSale.checked = false;
    if (chkStock)  chkStock.checked = false;
    if (chkBest)   chkBest.checked = false;
    $$(`#fltCats input[type='checkbox'], #fltStores input[type='checkbox']`).forEach(cb => cb.checked = false);
    applyFilters();
  });

  
  applyFilters();
})();
 



//sidebar
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.space-y-6');
  if (!sidebar) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isRTL = document.documentElement.dir === 'rtl';

   
  sidebar.classList.add('sidebar-anim-init');

 
  const innerItems = sidebar.querySelectorAll('div, ul, hr, .flex');
  innerItems.forEach(el => el.classList.add('sidebar-item'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || reduceMotion) {
     
        sidebar.classList.remove('sidebar-anim-init');
        sidebar.classList.add('sidebar-anim-in');
        sidebar.style.animationName = isRTL ? 'slideInRight' : 'slideInLeft';
 
        innerItems.forEach((el, i) => {
          setTimeout(() => {
            el.classList.remove('sidebar-item');
            el.classList.add('sidebar-item-in');
          }, i * 120);  
        });

        io.unobserve(sidebar);
      }
    });
  }, { threshold: 0.15 });

  io.observe(sidebar);
});








 //cards
document.addEventListener('DOMContentLoaded', () => {
  const grid  = document.getElementById('productsGrid');
  if (!grid) return;

  const items = Array.from(grid.children); // كل <a> كارت
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // حضّر العناصر + Stagger delay
  items.forEach((el, i) => {
    el.classList.add('card-anim-init');

    // ضيف تأثيرات الصورة و زر السلة تلقائيًا
    const prodImg = el.querySelector('img[data-i18n-attr*="product_img_alt"]');
    if (prodImg) prodImg.classList.add('photo-float');

    const cartImg = el.querySelector('img[data-i18n-attr*="cart_alt"]');
    if (cartImg) cartImg.classList.add('cart-pop');

    // تأخير متدرّج لطيف (أبطأ: 120ms بدل 70ms)
    el.style.animationDelay = `${(i % 12) * 120}ms`;
  });

  // راقب الظهور على الشاشة
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || reduceMotion) {
        const el = entry.target;
        el.classList.remove('card-anim-init');
        el.classList.add('card-anim-in');
        el.style.animationDelay = el.style.animationDelay || '0ms';
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => io.observe(el));
});
 


 // add to cart
(() => {
  // تأكد أن الصفحة اتحمّلت
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCart);
  } else {
    initCart();
  }

  function initCart() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;

    let count = 0;

    // event delegation: يلقط أي كليك على زر فيه data-add-to-cart
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-to-cart]");
      if (!btn) return;

      e.preventDefault();

      // زوّد العدد
      count++;
      badge.textContent = count;
      badge.classList.remove("hidden");

      // أنيميشن صغيرة للعدّاد
      badge.classList.add("scale-110");
      setTimeout(() => badge.classList.remove("scale-110"), 180);
    });
  }
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
 