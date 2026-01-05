/* ============== hero ============== */
(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');

    // نقرأ مسارات الصور اللي الباك إند هيبعتها في data-hero-images
    let dynamicImages = [];
    if (heroSection && heroSection.dataset.heroImages) {
      dynamicImages = heroSection.dataset.heroImages
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }

    // لو الباك إند بعت صور نستخدمها، لو لأ نشتغل بالديفولت القديمة
    const CANDIDATES = dynamicImages.length > 0
      ? dynamicImages
      : ["./img/herosection1.png","./img/herosection2.png","./img/146.jpg"];

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    if (!img1 || !img2) return;

    const mql = matchMedia("(prefers-reduced-motion: reduce)");
    let INTERVAL = mql.matches ? 8000 : 3500;
    mql.addEventListener?.('change', e => { INTERVAL = e.matches ? 8000 : 3500; });

    function canLoad(src) {
      return new Promise((resolve) => {
        let done = false;
        const im = new Image();
        im.decoding = 'async';
        im.onload  = () => { if (!done) { done = true; resolve(true); } };
        im.onerror = () => { if (!done) { done = true; resolve(false); } };
        im.src = src;
        if ('decode' in im) {
          im.decode()
            .then(() => { if (!done) { done = true; resolve(true); } })
            .catch(() => {
              // onload/onerror هيحسموا الموضوع
            });
        }
      });
    }

    async function filterValid(paths) {
      const checks = await Promise.all(paths.map(canLoad));
      const invalid = paths.filter((_, i) => !checks[i]);
      if (invalid.length) console.warn("Hero slider: invalid/missing images removed:", invalid);
      return paths.filter((_, i) => checks[i]);
    }

    let images = [];
    let current = 0;
    let showingImg1 = true;
    let timer = null;

    const start = () => {
      if (!timer) timer = setInterval(swap, INTERVAL);
    };

    const stop  = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    async function preload(src) {
      return canLoad(src);
    }

    async function swap() {
      if (images.length < 2) return;
      let nextIndex = (current + 1) % images.length;

      if (!await preload(images[nextIndex])) {
        const bad = images.splice(nextIndex, 1)[0];
        console.warn("Hero slider: removed bad image at runtime:", bad);
        if (images.length < 2) { stop(); return; }
        nextIndex = (current + 1) % images.length;
      }

      const nextSrc  = images[nextIndex];
      const showing  = showingImg1 ? img1 : img2;
      const incoming = showingImg1 ? img2 : img1;

      incoming.src = nextSrc;

      // ضمان تطبيق transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.classList.remove('opacity-0');
          incoming.classList.add('opacity-100');
          showing.classList.remove('opacity-100');
          showing.classList.add('opacity-0');
          showingImg1 = !showingImg1;
          current = nextIndex;
        });
      });
    }

    filterValid(CANDIDATES).then(valid => {
      images = valid;
      if (images.length === 0) {
        console.error("Hero slider: no valid images.");
        return;
      }
      if (images.length === 1) {
        img1.src = images[0];
        img2.remove();
        return;
      }
      img1.src = images[0];
      img2.src = images[1];
      current = 0;
      Promise.all([preload(images[0]), preload(images[1])]).then(start);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") start();
      else stop();
    });
    window.addEventListener("pagehide", stop);
  });

})();


/* ============== Categories Slider (working) ============== */
(function initCategoriesSlider(){
  const wrapper = document.getElementById('catTrack');    
  const list    = wrapper?.querySelector('ul');          
  const prevBtn = document.getElementById('catPrev');
  const nextBtn = document.getElementById('catNext');
  if (!wrapper || !list || !prevBtn || !nextBtn) return;

  
  const cs = getComputedStyle(list);
  if (cs.display !== 'flex') list.style.display = 'flex';
  if ((cs.gap || cs.columnGap || cs.rowGap) === '0px') list.style.gap = '20px';
  list.style.willChange = 'transform';
  list.style.transform  = 'translateX(0px)';
  list.style.transition = 'transform 500ms';
  wrapper.style.overflowX = 'hidden';

  let index = 0, step = 0, clonesSide = 0, timer = null, isHover = false;
  let dragging = false, startX = 0, startIndex = 0, accum = 0;

  const DIR = () => ((document.documentElement.getAttribute('dir') || 'ltr') === 'rtl') ? 1 : -1;

  function gapPx(){
    const g = (getComputedStyle(list).gap || getComputedStyle(list).columnGap || '20px');
    const n = parseFloat(g); return isNaN(n) ? 20 : n;
  }

  function computeStep(){
    const first = list.querySelector('li') || list.firstElementChild;
    if (!first) return 300;
    const r = first.getBoundingClientRect();
    return Math.round(r.width + gapPx());
  }

  function cleanClones(){
    list.querySelectorAll('[data-clone="1"]').forEach(n=>n.remove());
  }

  function buildClones(){
    cleanClones();
    let items = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone'));

   
    if (items.length < 3){
      const need = 3 - items.length;
      for (let i=0;i<need;i++){
        const c = items[i % items.length].cloneNode(true);
        c.setAttribute('data-clone','1');
        list.appendChild(c);
      }
      items = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone'));
    }

    step = computeStep();

    // حساب perView من عرض الـ wrapper
    const contW = wrapper.getBoundingClientRect().width;
    const perView = Math.max(1, Math.floor(contW / step));

     // perView
    clonesSide = Math.max(2, perView + 1);

   
    const prefix = items.slice(-clonesSide).map(n=>{ const c=n.cloneNode(true); c.setAttribute('data-clone','1'); return c; });
    const suffix = items.slice(0, clonesSide).map(n=>{ const c=n.cloneNode(true); c.setAttribute('data-clone','1'); return c; });

    prefix.forEach(c => list.insertBefore(c, list.firstChild));
    suffix.forEach(c => list.appendChild(c));
  }

  function setTransition(on){
    list.style.transition = on ? 'transform 500ms' : 'none';
    list.style.willChange = on ? 'transform' : 'auto';
  }

  function translateTo(i){
    const tx = DIR() * (i * step);
    list.style.transform = `translateX(${tx}px)`;
  }

  function jumpTo(i){
    setTransition(false);
    index = i;
    translateTo(index);
    requestAnimationFrame(()=>requestAnimationFrame(()=>setTransition(true)));
  }

  function realStart(){ return clonesSide; }
  function next(){ index++; translateTo(index); }
  function prev(){ index--; translateTo(index); }

  function onEnd(){
    const total = list.children.length;
    if (index >= total - clonesSide)      jumpTo(realStart());
    else if (index < clonesSide)          jumpTo(total - clonesSide - 1);
  }

  function canScroll(){
    const totalReal = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone')).length;
    const contW = wrapper.getBoundingClientRect().width;
    const pv = Math.max(1, Math.floor(contW / (step || 1)));
    return totalReal > pv;
  }

  function startAuto(){
    stopAuto();
    if (!canScroll()) return;
    timer = setInterval(()=>{ if(!isHover && document.visibilityState==='visible') next(); }, 2500);
  }
  function stopAuto(){ if(timer){ clearInterval(timer); timer=null; } }

  function recalc(){
    setTransition(false);
    list.style.transform = 'none';
    stopAuto();
    buildClones();
    index = realStart();
    requestAnimationFrame(()=>{ translateTo(index); requestAnimationFrame(()=>{ setTransition(true); startAuto(); }); });
  }

 
  let tapAnchor = null, tapStartX = 0, tapStartY = 0, tapStartTime = 0;

  function onDown(e){
    dragging = true;

    const pt = e.touches?.[0] ?? e;
    tapStartX = startX = pt.clientX || 0;
    tapStartY = pt.clientY || 0;
    tapStartTime = Date.now();

    
    tapAnchor = (e.target && e.target.closest) ? e.target.closest('a') : null;

    startIndex = index;
    accum = 0;
    stopAuto();
    setTransition(false);

   
    if (!tapAnchor && e.pointerId != null) {
      list.setPointerCapture?.(e.pointerId);
    }
  }

  function onMove(e){
    if(!dragging) return;

    const pt = e.touches?.[0] ?? e;
    const x = pt.clientX || 0;
    const y = pt.clientY || 0;

    const dx = x - startX;
    const dy = y - tapStartY;
    accum = dx;

 
    const moved = Math.hypot(dx, dy) > 6;
    setTransition(false);

    const temp = startIndex - Math.round(dx / step) * DIR();
    translateTo(temp);

    if (moved) tapAnchor = null;  
  }

  function onUp(e){
    if(!dragging) return;
    dragging = false;
    setTransition(true);

    const elapsed = Date.now() - tapStartTime;
    const threshold = step * 0.25;

 
    if (tapAnchor && Math.abs(accum) < 8 && elapsed < 300) {
      const href = tapAnchor.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;  
      } else {
        tapAnchor.click?.();
      }
      // إعادة ضبط
      tapAnchor = null;
      startAuto();
      return;  
    }
  
    if (Math.abs(accum) > threshold){
      if ((accum > 0 && DIR() === 1) || (accum < 0 && DIR() === -1)) prev();
      else next();
    } else {
      translateTo(index);
    }

    startAuto();
    tapAnchor = null;
  }

 
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  list.addEventListener('transitionend', onEnd);

  wrapper.addEventListener('mouseenter', ()=>{ isHover=true; stopAuto(); });
  wrapper.addEventListener('mouseleave', ()=>{ isHover=false; startAuto(); });

 
  list.addEventListener('pointerdown', onDown);
  list.addEventListener('pointermove', onMove);
  ['pointerup','pointercancel','mouseleave'].forEach(ev => list.addEventListener(ev, onUp));
  list.addEventListener('touchstart', onDown, {passive:true});
  list.addEventListener('touchmove',  onMove, {passive:true});
  list.addEventListener('touchend',   onUp);

  document.addEventListener('visibilitychange', ()=>{ document.visibilityState==='visible' ? startAuto() : stopAuto(); });

 
  recalc();
})();


 
/* ============== Deals Flip-Card Slider (like Categories) ============== */
(function initDealsSlider(){
  const list    = document.getElementById('flipTrack');
  const prevBtn = document.getElementById('dealsPrev');
  const nextBtn = document.getElementById('dealsNext');
  const wrapper = list?.parentElement;

  if (!list || !prevBtn || !nextBtn || !wrapper) return;

  const cs = getComputedStyle(list);
  if (cs.display !== 'flex') list.style.display = 'flex';
  if ((cs.gap || cs.columnGap || cs.rowGap) === '0px') list.style.gap = '20px';
  list.style.willChange = 'transform';
  list.style.transform  = 'translateX(0px)';
  list.style.transition = 'transform 500ms';
  wrapper.style.overflowX = 'hidden';

  let index = 0, step = 0, clonesSide = 0, timer = null, isHover = false;
  let dragging = false, startX = 0, accum = 0;

  const DIR = () =>
    ((document.documentElement.getAttribute('dir') || 'ltr') === 'rtl') ? 1 : -1;

  function gapPx(){
    const g = (getComputedStyle(list).gap || getComputedStyle(list).columnGap || '20px');
    const n = parseFloat(g); return isNaN(n) ? 20 : n;
  }

  function computeStep(){
    const first = list.firstElementChild;
    if (!first) return 300;
    const r = first.getBoundingClientRect();
    return Math.round(r.width + gapPx());
  }

  function cleanClones(){
    list.querySelectorAll('[data-clone="1"]').forEach(n=>n.remove());
  }

  function buildClones(){
    cleanClones();
    let items = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone'));

    if (items.length < 3){
      const need = 3 - items.length;
      for (let i=0;i<need;i++){
        const c = items[i % items.length].cloneNode(true);
        c.setAttribute('data-clone','1');
        list.appendChild(c);
      }
      items = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone'));
    }

    step = computeStep();
    const contW = wrapper.getBoundingClientRect().width;
    const perView = Math.max(1, Math.floor(contW / step));
    clonesSide = Math.max(2, perView + 1);

    const prefix = items.slice(-clonesSide).map(n=>{
      const c=n.cloneNode(true); c.setAttribute('data-clone','1'); return c;
    });
    const suffix = items.slice(0, clonesSide).map(n=>{
      const c=n.cloneNode(true); c.setAttribute('data-clone','1'); return c;
    });

    prefix.forEach(c => list.insertBefore(c, list.firstChild));
    suffix.forEach(c => list.appendChild(c));
  }

  function setTransition(on){
    list.style.transition = on ? 'transform 500ms' : 'none';
    list.style.willChange = on ? 'transform' : 'auto';
  }

  function translateTo(i){
    const tx = DIR() * (i * step);
    list.style.transform = `translateX(${tx}px)`;
  }

  function jumpTo(i){
    setTransition(false);
    index = i;
    translateTo(index);
    requestAnimationFrame(()=>requestAnimationFrame(()=>setTransition(true)));
  }

  const realStart = () => clonesSide;
  function next(){ index++; translateTo(index); }
  function prev(){ index--; translateTo(index); }

  function onEnd(){
    const total = list.children.length;
    if (index >= total - clonesSide)      jumpTo(realStart());
    else if (index < clonesSide)          jumpTo(total - clonesSide - 1);
  }

  function canScroll(){
    const totalReal = Array.from(list.children).filter(n=>!n.hasAttribute('data-clone')).length;
    const contW = wrapper.getBoundingClientRect().width;
    const pv = Math.max(1, Math.floor(contW / (step || 1)));
    return totalReal > pv;
  }

  function startAuto(){
    stopAuto();
    if (!canScroll()) return;
    timer = setInterval(()=>{ if(!isHover && document.visibilityState==='visible') next(); }, 2500);
  }
  function stopAuto(){ if(timer){ clearInterval(timer); timer=null; } }

  function recalc(){
    setTransition(false);
    list.style.transform = 'none';
    stopAuto();
    buildClones();
    index = realStart();
    requestAnimationFrame(()=>{
      translateTo(index);
      requestAnimationFrame(()=>{ setTransition(true); startAuto(); });
    });
  }

  // ==== سحب/سلايد للسلايدر ====
  let tapAnchor = null, tapStartX = 0, tapStartTime = 0;

  function onDown(e){
    dragging = true;
    const pt = e.touches?.[0] ?? e;
    tapStartX = startX = pt.clientX || 0;
    tapStartTime = Date.now();
    tapAnchor = e.target?.closest?.('a') || null;
    stopAuto();
    setTransition(false);
    if (!tapAnchor && e.pointerId != null) list.setPointerCapture?.(e.pointerId);
  }

  function onMove(e){
    if(!dragging) return;
    const pt = e.touches?.[0] ?? e;
    const x = pt.clientX || 0;
    const dx = x - startX;
    accum = dx;
    const temp = index - Math.round(dx / (step || 1)) * DIR();
    translateTo(temp);
  }

  function onUp(){
    if(!dragging) return;
    dragging = false;
    setTransition(true);
    const threshold = step * 0.25;
    if (Math.abs(accum) > threshold){
      if ((accum > 0 && DIR() === 1) || (accum < 0 && DIR() === -1)) prev();
      else next();
    } else translateTo(index);
    startAuto();
    tapAnchor = null;
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  list.addEventListener('transitionend', onEnd);
  wrapper.addEventListener('mouseenter', ()=>{ isHover=true; stopAuto(); });
  wrapper.addEventListener('mouseleave', ()=>{ isHover=false; startAuto(); });
  list.addEventListener('pointerdown', onDown);
  list.addEventListener('pointermove', onMove);
  ['pointerup','pointercancel','mouseleave'].forEach(ev => list.addEventListener(ev, onUp));
  list.addEventListener('touchstart', onDown, {passive:true});
  list.addEventListener('touchmove',  onMove, {passive:true});
  list.addEventListener('touchend',   onUp);
  document.addEventListener('visibilitychange', ()=>{ document.visibilityState==='visible' ? startAuto() : stopAuto(); });
  let rz; window.addEventListener('resize', ()=>{ clearTimeout(rz); rz=setTimeout(recalc, 200); });
  window.addEventListener('load', recalc);
  recalc();

  // ==== تقليب الكروت باللمس/الكليك مباشرة ====
  function toggleCard(card){
    const v = card.getAttribute('data-flipped') === '1';
    card.setAttribute('data-flipped', v ? '0' : '1');
  }
  function isInteractive(el){
    return !!el.closest?.('a, button, [role="button"], input, textarea, select');
  }
  list.addEventListener('click', function(e){
    const card = e.target.closest?.('.flip-card');
    if (!card) return;
    if (isInteractive(e.target)) return;
    if (Math.abs(accum) > 6) return;
    toggleCard(card);
  });
  list.addEventListener('touchend', function(e){
    const card = e.target.closest?.('.flip-card');
    if (!card) return;
    if (isInteractive(e.target)) return;
    if (Math.abs(accum) < 6) {
      e.preventDefault();
      toggleCard(card);
    }
  }, {passive:false});

  // ========== إرجاع الكروت تلقائيًا ==========
  function flipOff(card){
    if (card && card.getAttribute('data-flipped') === '1'){
      card.setAttribute('data-flipped','0');
    }
  }
  function closeAllExcept(except){
    list.querySelectorAll('.flip-card[data-flipped="1"]').forEach(c=>{
      if (!except || c!==except) c.setAttribute('data-flipped','0');
    });
  }
  list.addEventListener('mouseout', function(e){
    const card = e.target.closest?.('.flip-card');
    if (!card) return;
    const toEl = e.relatedTarget;
    if (!toEl || !card.contains(toEl)) flipOff(card);
  });
  function handleOutsidePress(e){
    if (e.target.closest?.('.flip-card')) return;
    if (e.target.closest?.('a, button, [role="button"], input, textarea, select')) return;
    closeAllExcept(null);
  }
  document.addEventListener('pointerdown', handleOutsidePress, {passive:true});
  document.addEventListener('touchstart',  handleOutsidePress, {passive:true});
  wrapper.addEventListener('mouseleave', ()=> closeAllExcept(null));

})();

// Get the Siyahaty app Section (i18n-ready)
(() => {
 
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.2 });

  document.querySelectorAll('#getApp .reveal').forEach(el => obs.observe(el));

  
  const strength = 12;  
  document.querySelectorAll('#getApp .tilt-card').forEach(card => {
    const isTouch = matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -2 * strength;
      const ry = ((x / r.width)  - 0.5) *  2 * strength;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
})();







 //Features Section  
  (function () {
    const cards = document.querySelectorAll('#features .feature-card');

    // استخدم IntersectionObserver لعمل reveal بدون سكرول أفقي
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger بسيط حسب ترتيب العنصر
          const idx = [...cards].indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx * 80, 320)}ms`;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.2 });

    cards.forEach((card) => io.observe(card));

    // أمان إضافي ضد السحب الأفقي في الموبايل
    // يشيل أي translateX لو اتطبق بالغلط من CSS/JS تاني
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.getElementById('features').style.transform = 'translateX(0)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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