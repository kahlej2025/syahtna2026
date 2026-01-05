
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
 

 
 
