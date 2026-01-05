  
  document.querySelectorAll('[data-plan2]').forEach(card => {
    const isRTL = () => document.documentElement.getAttribute('dir') === 'rtl';

    // spotlight follows mouse (RTL-aware)
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const x  = e.clientX - r.left;
      const y  = e.clientY - r.top;
      const mx = isRTL() ? (r.width - x) : x;
      card.style.setProperty('--mx', `${mx}px`);
      card.style.setProperty('--my', `${y}px`);
    });

    // ripple on click
    card.addEventListener('click', (e) => {
      const r = card.getBoundingClientRect();
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top  = (e.clientY - r.top)  + 'px';
      s.style.background = getComputedStyle(card).color || 'rgba(0,0,0,.25)';
      card.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    }, { passive: true });
  });
 





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
 
