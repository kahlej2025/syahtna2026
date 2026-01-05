
  
 
  // ===== Tabs =====
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
 
      tabs.forEach(t => t.classList.remove("bg-teal-600","text-white"));
      tab.classList.add("bg-teal-600","text-white");

    
      panels.forEach(p => {
        p.classList.add("hidden");
        if (p.getAttribute("data-panel") === target) {
          p.classList.remove("hidden");
        }
      });
    });
  });

  // ===== Size buttons (active) =====
  const sizeBtns = document.querySelectorAll(".size-btn");
  let selectedSize = document.querySelector(".size-btn.active")?.textContent?.trim() || "S";
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.textContent.trim();
    });
  });

  // ===== Quantity controls =====
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus  = document.getElementById("qtyPlus");
  const qtyInput = document.getElementById("qtyInput");

  function sanitizeQty() {
    let v = parseInt(qtyInput.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    qtyInput.value = v;
    return v;
  }
  qtyMinus?.addEventListener("click", () => {
    const v = sanitizeQty();
    if (v > 1) qtyInput.value = v - 1;
  });
  qtyPlus?.addEventListener("click", () => {
    const v = sanitizeQty();
    qtyInput.value = v + 1;
  });
  qtyInput?.addEventListener("change", sanitizeQty);

  // ===== Add to cart + Badge + Toast =====
  const addToCartBtn = document.getElementById("addToCartBtn");
  const toast = document.getElementById("toast");
  const cartBadge = document.getElementById("cartBadge");
  const cartIcon = document.getElementById("cartIcon");
  let cartCount = parseInt(cartBadge?.textContent || "0", 10) || 0;

  function showToast() {
    if (!toast) return;
    toast.classList.remove("hidden");
    // trigger transition
    requestAnimationFrame(() => {
      toast.classList.add("opacity-100", "translate-y-0");
    });
    // hide after 2.5s
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 2500);
  }

  function bumpIcon() {
    if (!cartIcon) return;
    cartIcon.classList.add("animate-bounce");
    setTimeout(() => cartIcon.classList.remove("animate-bounce"), 600);
  }

  addToCartBtn?.addEventListener("click", () => {
    const qty = sanitizeQty();
    cartCount += qty;
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.classList.remove("hidden");
cartBadge.classList.add("flex");
    }
    showToast();
    bumpIcon();
     
     
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