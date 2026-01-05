 
 
  // next prev btns
  const pager = document.querySelector('nav[aria-label="Pagination"]');
  const setActive = (el) => {
 
    pager.querySelectorAll('[data-page]').forEach(a => {
      a.classList.remove('bg-teal-700','text-white','font-semibold','shadow-sm');
      a.classList.add('border','border-gray-300','text-gray-700','hover:bg-gray-100');
      a.removeAttribute('aria-current');
    });
   
    el.classList.add('bg-teal-700','text-white','font-semibold','shadow-sm','animate-pop-once');
    el.classList.remove('border','border-gray-300','text-gray-700','hover:bg-gray-100');
    el.setAttribute('aria-current','page');
 
    el.addEventListener('animationend', () => el.classList.remove('animate-pop-once'), { once: true });
  };

  pager.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
  
    a.classList.add('animate-pop-once');
    a.addEventListener('animationend', () => a.classList.remove('animate-pop-once'), { once: true });

    // إذا كان زر رقمي، خلّيه نشِط
    if (a.hasAttribute('data-page')) {
      e.preventDefault();  
      setActive(a);
      
    }
  });
 

  

 //cards ..
(() => {
 
  const cards = [...document.querySelectorAll('.card.reveal')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
 
        if (!e.target.style.getPropertyValue('--d')) {
          const idx = cards.indexOf(e.target);
          e.target.style.setProperty('--d', `${120 + idx*100}ms`);
        }
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  cards.forEach(c => io.observe(c));

 
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  cards.forEach(card => {
    const img = card.querySelector('.card-img');
    let rect = null;

 
    const glare = document.createElement('span');
    glare.style.cssText = `
      position:absolute; inset:0; pointer-events:none; border-radius:inherit;
      background: radial-gradient(200px 160px at 50% 50%, rgba(255,255,255,.25), transparent 60%);
      opacity:0; transition: opacity .25s ease;
    `;
    card.style.transformStyle = 'preserve-3d';
    card.style.position = 'relative';
    card.appendChild(glare);

    const updateRect = () => rect = card.getBoundingClientRect();
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });

    const onMove = (ev) => {
      if (prefersReduced) return;
      if (!rect) updateRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const tiltX = (-y * 6).toFixed(2);
          const tiltY = ( x * 8).toFixed(2);
          card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(220px 180px at ${ (x+0.5)*100 }% ${ (y+0.5)*100 }%, rgba(255,255,255,.25), transparent 60%)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onLeave = () => {
      card.style.transform = '';
      glare.style.opacity = '0';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mouseenter', () => { if (!prefersReduced) glare.style.opacity = '1'; });
  });
 
  document.querySelectorAll('img.card-img').forEach(async img => {
    try { await img.decode(); } catch(e) {}
  });
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