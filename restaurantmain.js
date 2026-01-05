
 
 
 



 // spcial offers
(function(){
  const cards = document.querySelectorAll('.deal-card');
  const head  = document.querySelector('.headline-sweep');

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const d  = parseInt(el.getAttribute('data-delay')||'0',10);
        el.style.animationDelay = (d/1000)+'s';
        el.classList.add('in-view');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.18 });

  cards.forEach(c=>io.observe(c));

  if(head){
    const io2 = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting){ head.classList.add('reveal-underline'); io2.disconnect(); }
      });
    }, { threshold: 0.6 });
    io2.observe(head);
  }
})();
 

// how does it work?
  (function () {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || '0ms';
          entry.target.style.animationDelay = delay;
          entry.target.classList.add('in-view');
          io.unobserve(entry.target); // مرة واحدة لكل عنصر
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => io.observe(el));
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
 
