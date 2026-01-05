 
 // main functions
(() => {
  
  if (window.__checkoutInited) return;
  window.__checkoutInited = true;

  /* ---------- Utilities ---------- */
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  /* ========== 1) Reveal on scroll ========== */
  const revealBoxes = $$('.reveal');
  revealBoxes.forEach(box => Array.from(box.children).forEach(ch => ch.classList.add('reveal-child')));
  try {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    revealBoxes.forEach(b => io.observe(b));
  } catch {  }

  /* ========== 2) Inputs micro-UX ========== */
  $$('.reveal input, .reveal select, .reveal textarea')
    .forEach(el => el.classList.add('soft-input','rounded-lg','border','px-3','py-2'));

  /* ========== 3) Initialize payment section(s) (one or more) ========== */
  function initPaymentSection(root) {
    // Panels
    const panels = {
      online: $('#panel-online', root),
      bank:   $('#panel-bank', root),
      cash:   $('#panel-cash', root),
    };
    Object.values(panels).forEach(p => { if (p) { p.classList.add('panel'); p.classList.remove('hidden'); p.style.display = 'none'; } });

    const showPanel = (name) => {
      Object.entries(panels).forEach(([k, el]) => {
        if (!el) return;
        if (k === name) {
          el.style.display = 'block';
          requestAnimationFrame(() => el.classList.add('show'));
        } else {
          el.classList.remove('show');
          setTimeout(() => { el.style.display = 'none'; }, 220);
        }
      });
    };

// Highlight the selected radio option as a tile
    const markActive = (scopeSel, label) => {
      $$(scopeSel + ' label', root).forEach(l => l.classList.remove('is-active','choice'));
      if (label) label.classList.add('choice','is-active');
    };

    // Toggle pay method
    const payGroup = $('#payMethodGroup', root);
    if (payGroup) {
      payGroup.addEventListener('change', (e) => {
        const r = e.target.closest('input[name="payMethod"]'); if (!r) return;
        markActive('#payMethodGroup', r.closest('label'));
        showPanel(r.value);
      });
      let init = $('input[name="payMethod"]:checked', payGroup) || $('input[name="payMethod"][value="online"]', payGroup) || $('input[name="payMethod"]', payGroup);
      if (init) { init.checked = true; markActive('#payMethodGroup', init.closest('label')); showPanel(init.value); }
    }

    // Card vs Wallet (Apple/Google)
    const cardGroup     = $('#cardMethodGroup', root);
    const cardDetails   = $('#cardDetails', root);
    const walletDetails = $('#walletDetails', root); // قد لا يكون موجود
    const walletTitle   = $('#walletTitle', root);
    const walletLogo    = $('#walletLogo', root);
    const walletButton  = $('#walletButton', root);

    [cardDetails, walletDetails].forEach(el => { if (el) { el.classList.add('panel'); el.classList.remove('hidden'); } });

    const showCardOrWallet = (val) => {
      const isWallet = (val === 'apple' || val === 'google');
      if (!walletDetails || !cardDetails) { if (cardDetails) { cardDetails.style.display = 'block'; cardDetails.classList.add('show'); } return; }

      if (isWallet) {
        cardDetails.classList.remove('show'); setTimeout(() => cardDetails.style.display='none', 200);
        walletDetails.style.display='block'; requestAnimationFrame(() => walletDetails.classList.add('show'));
        const apple = (val === 'apple');
        if (walletTitle)  walletTitle.textContent = apple ? 'Pay with Apple Pay' : 'Pay with Google Pay';
        if (walletLogo)   walletLogo.src          = apple ? 'img/apple-pay.png' : 'img/google-pay.png';
        if (walletButton) {
          walletButton.textContent = apple ? 'Continue with Apple Pay' : 'Continue with Google Pay';
          walletButton.classList.toggle('bg-black', apple);
          walletButton.classList.toggle('bg-teal-600', !apple);
          walletButton.classList.add('text-white');
        }
      } else {
        walletDetails.classList.remove('show'); setTimeout(() => walletDetails.style.display='none', 200);
        cardDetails.style.display='block'; requestAnimationFrame(() => cardDetails.classList.add('show'));
      }
    };

    if (cardGroup) {
      cardGroup.addEventListener('change', (e) => {
        const r = e.target.closest('input[name="cardMethod"]'); if (!r) return;
        markActive('#cardMethodGroup', r.closest('label'));
        showCardOrWallet(r.value);
      });
      let defBrand = $('input[name="cardMethod"]:checked', cardGroup) || $('input[name="cardMethod"][value="visa"]', cardGroup) || $('input[name="cardMethod"]', cardGroup);
      if (defBrand) { defBrand.checked = true; markActive('#cardMethodGroup', defBrand.closest('label')); showCardOrWallet(defBrand.value); }
    }

    // Bank file hint
    const bankFile = $('#bankFile', root), bankHint = $('#bankFileHint', root);
    if (bankFile && bankHint) {
      bankFile.addEventListener('change', () => {
        const f = bankFile.files?.[0];
        bankHint.textContent = f ? `Selected: ${f.name}` : 'Accepted: JPG, PNG, PDF.';
      });
    }

    // Press feedback inside the payment section
    [...$$('#payMethodGroup label', root), ...$$('#cardMethodGroup label', root)]
      .forEach(el => {
        el.style.transition = (el.style.transition ? el.style.transition + ', ' : '') + 'transform .08s ease';
        el.addEventListener('pointerdown', () => el.style.transform='scale(.985)');
        const clear = () => el.style.transform='';
        window.addEventListener('pointerup', clear);
        window.addEventListener('pointercancel', clear);
        el.addEventListener('mouseleave', clear);
      });
  }

 // Initialize for every existing payment block
  $$('.payment-section').forEach(initPaymentSection);

  /* ========== 4) Coupon & totals (عام) ========== */
  const couponInput = $('#coupon');
  const applyBtn    = $('#applyCoupon');
  const elSub   = $('#subTotal');
  const elShip  = $('#ship');
  const elDisc  = $('#disc');
  const elGrand = $('#grand');
  const msgEl   = $('#couponMsg');

  const num = t => parseFloat(String(t).replace(/[^\d.-]/g,'')) || 0;
  const fmt = v => (Number(v) < 0 ? `- ${Math.abs(Number(v)).toFixed(2)}` : Number(v).toFixed(2));
  function countTo(el, to, dur=600){
    if(!el) return;
    const from = num(el.textContent);
    const start = performance.now();
    const ease = t => (t<.5 ? 2*t*t : -1+(4-2*t)*t);
    const step = (now) => {
      const t = Math.min(1, (now-start)/dur);
      el.textContent = fmt(from + (to-from)*ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function applyCoupon(codeRaw){
    if(!elSub || !elShip || !elDisc || !elGrand) return;
    const code = String(codeRaw||'').trim().toUpperCase();
    const sub  = num(elSub.textContent);
    let ship   = num(elShip.textContent);
    let disc   = -Math.abs(num(elDisc.textContent)); // دايمًا بالسالب في العرض
    let ok=false, msg='';

    if(code==='SAVE10'){        disc = -(sub * 0.10); ok=true; msg='✅ 10% discount applied'; }
    else if(code==='FREESHIP'){ ship = 0;             ok=true; msg='✅ Free shipping applied'; }
    else if(code==='VIP50' || code==='SAVE50'){ disc = -50; ok=true; msg='✅ 50.00 discount applied'; }
    else { msg='❌ Invalid coupon'; }

    if(!ok){ if(msgEl){ msgEl.textContent = msg; msgEl.className = 'text-xs mt-2 text-red-600 font-medium'; } return; }

    const grand = sub + ship + disc;
    countTo(elShip,  ship, 400);
    countTo(elDisc,  disc, 500);
    countTo(elGrand, grand,650);
    if(msgEl){ msgEl.textContent = msg; msgEl.className = 'text-xs mt-2 text-emerald-600 font-medium'; }
  }
  if (applyBtn) applyBtn.addEventListener('click', (e) => { e.preventDefault(); applyCoupon(couponInput?.value); });
  
  if(elSub && elShip && elDisc && elGrand){
    const sub  = num(elSub.textContent);
    const ship = num(elShip.textContent);
    const disc = -Math.abs(num(elDisc.textContent));
    elSub.textContent   = fmt(sub);
    elShip.textContent  = fmt(ship);
    elDisc.textContent  = fmt(disc);
    elGrand.textContent = fmt(sub + ship + disc);
  }

  /* ========== 5) Pay actions (demo) ========== */
  function handlePay(e){
    if (e) e.preventDefault();
    if (!$('#agree')?.checked) { alert('Please agree to the Terms & Conditions.'); return; }

    const method = document.querySelector('input[name="payMethod"]:checked')?.value || 'online';
    if (method === 'bank'){
      if (!$('#bankFile')?.files?.length){ alert('Please upload the bank transfer receipt.'); return; }
      alert('Order placed. We will verify your bank transfer (demo).');
      return;
    }
    if (method === 'cash'){
      alert('Order placed for Cash on Delivery (demo).');
      return;
    }
    // Online:
    const walletOpen = !!$('#walletDetails') && $('#walletDetails').style.display !== 'none';
    if (walletOpen){ alert('Wallet checkout started (demo).'); return; }

    if (!$('#cardName')?.value || !$('#cardNumber')?.value || !$('#cardExp')?.value || !$('#cardCvv')?.value){
      alert('Please complete your card details.'); return;
    }
    alert('Card payment submitted (demo).');
  }

  $('#payBtn')?.addEventListener('click', handlePay);
  $('#payNowLink')?.addEventListener('click', handlePay);
// Press feedback for both pay buttons (if present)
  [$('#payBtn'), $('#payNowLink')].filter(Boolean).forEach(el => {
    el.style.transition = (el.style.transition ? el.style.transition + ', ' : '') + 'transform .08s ease';
    el.addEventListener('pointerdown', () => el.style.transform='scale(.985)');
    const clear = () => el.style.transform='';
    window.addEventListener('pointerup', clear);
    window.addEventListener('pointercancel', clear);
    el.addEventListener('mouseleave', clear);
  });
})();
 

 
 
 
 
// promo code fuction
(() => {
  const btn    = document.getElementById('applyCoupon');
  if(!btn) return;
  const input  = document.getElementById('coupon');
  const msg    = document.getElementById('couponMsg');   // هنستخدمه كـ SR-only فقط
  const elSub  = document.getElementById('subTotal');
  const elShip = document.getElementById('ship');
  const elDisc = document.getElementById('disc');
  const elGrand= document.getElementById('grand');

  const num = t => parseFloat(String(t).replace(/[^\d.-]/g,'')) || 0;
  const fmt = v => Number(v).toFixed(2);

  // Fallback demo (SAVE10/FREESHIP/VIP50,SAVE50)
  function fallbackApply(code){
    const subInit = num(elSub?.textContent);
    let ship = num(elShip?.textContent);
    let disc = -Math.abs(num(elDisc?.textContent));
    const c = String(code||'').trim().toUpperCase();
    let ok = false;

    if (c === 'SAVE10'){            disc = -(subInit * 0.10); ok = true; }
    else if (c === 'FREESHIP'){     ship = 0;                 ok = true; }
    else if (c === 'VIP50' || c==='SAVE50'){ disc = -50;      ok = true; }

    if (ok){
      if (elShip)  elShip.textContent  = fmt(ship);
      if (elDisc)  elDisc.textContent  = (disc < 0 ? '- ' : '') + fmt(Math.abs(disc));
      if (elGrand) elGrand.textContent = fmt(subInit + ship + disc);
    }
    return ok;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.add('is-busy');   // يفترض عندك ستايل السبينر من قبل

    setTimeout(() => {
      let ok = false;

      // استخدم الدالة الأصلية لو موجودة
      if (typeof window.applyCoupon === 'function') {
        try {
          window.applyCoupon(input?.value);
          ok = true; // لو دالتك بتحدد النجاح/الفشل، بدّلي السطر ده بما يناسبك
        } catch { ok = false; }
      } else {
        ok = fallbackApply(input?.value);
      }

      // نجعل الرسالة مخفية بصريًا فقط (للـ a11y)
      if (msg){
        msg.textContent = ok ? 'Coupon applied successfully' : 'Invalid coupon';
        msg.className = 'sr-only';
      }

      // ===== Visual confirmation (new) =====
      if (ok){
        // زر يتحوّل لـ Applied ✓ مؤقتًا
        const old = btn.textContent.trim();
        btn.dataset.oldLabel = old;
        btn.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <svg class="check w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"/>
            </svg>
            Applied
          </span>`;
        btn.classList.remove('is-error');
        btn.classList.add('is-success');

        // وميض خفيف + بَرفة على الإجمالي
        elGrand?.parentElement?.classList.add('grand-flash');
        elGrand?.classList.add('grand-bump');
        setTimeout(()=>{
          elGrand?.parentElement?.classList.remove('grand-flash');
          elGrand?.classList.remove('grand-bump');
        }, 900);

        // رجوع الزر لحالته
        setTimeout(()=>{
          btn.classList.remove('is-success');
          btn.textContent = btn.dataset.oldLabel || 'Apply';
        }, 1400);
      } else {
        // هزة خفيفة للزر في حالة خطأ
        btn.classList.remove('is-success');
        btn.classList.add('is-error');
        setTimeout(()=> btn.classList.remove('is-error'), 550);
      }

      btn.classList.remove('is-busy');
    }, 220);
  });
})(); 
 
 
 
 
 
 
 //footer
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
 

