 
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
 





 
  
    (function() {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = document.querySelectorAll('[data-animate]');
      const base = 'opacity-0 translate-y-6';
      const active = 'opacity-100 translate-y-0';

      items.forEach((el) => {
        el.classList.add('transition-all', 'duration-700', 'ease-out');
        if (!prefersReduced) el.classList.add(...base.split(' '));
      });

      if (!prefersReduced) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = [...items].indexOf(el) * 80;
              setTimeout(() => {
                el.classList.remove(...base.split(' '));
                el.classList.add(...active.split(' '));
              }, delay);
              io.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        items.forEach((el) => io.observe(el));
      }
    })();
 