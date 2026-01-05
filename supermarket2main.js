

//  to scroll the grid with arrows on small/medium screens -->
 
  (function () {
    const grid = document.getElementById('catGrid');
    const prev = document.getElementById('catPrev');
    const next = document.getElementById('catNext');
    if (!grid || !prev || !next) return;

    const scrollAmount = 260; // adjust if needed

    prev.addEventListener('click', () => grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    next.addEventListener('click', () => grid.scrollBy({ left:  scrollAmount, behavior: 'smooth' }));
  })();






// favorite icon
 
  const favBtn = document.getElementById("favBtn");
  const favIcon = document.getElementById("favIcon");
  const favPulse = document.getElementById("favPulse");
  let isFav = false;

  favBtn.addEventListener("click", () => {
    isFav = !isFav;

    if (isFav) {
      favIcon.setAttribute("fill", "red");
      favIcon.setAttribute("stroke", "red");

      // تأثير النبضة
      favPulse.classList.add("opacity-40", "scale-150");
      setTimeout(() => favPulse.classList.remove("opacity-40", "scale-150"), 400);
    } else {
      favIcon.setAttribute("fill", "none");
      favIcon.setAttribute("stroke", "currentColor");
    }

    // حركة القلب (تكبير خفيف)
    favBtn.classList.add("scale-125");
    setTimeout(() => favBtn.classList.remove("scale-125"), 200);
  });
 







// offer slider
  const slider = document.getElementById('offerSlider');
  const slides = slider.children.length;
  let index = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
 
  setInterval(() => {
    index = (index + 1) % slides;
    updateSlider();
  }, 3000);








 
  // Reveal on view (بدون خصائص تجريبية)
  (function () {
    const root = document.getElementById('categoriesSection');
    if (!root) return;

    const targets = root.querySelectorAll('.cat-title, .cat-card');

    // لو المتصفح لا يدعم IntersectionObserver، أظهر العناصر فورًا
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // عرض مرة واحدة
        }
      });
    }, {
      root: null,
      threshold: 0.25 // يبدأ عند تغطية 25%
    });

    targets.forEach(el => io.observe(el));
  })();

  // لمسة لطيفة لوهج زر الرجوع مع الماوس (اختياري، قياسي)
  document.addEventListener('pointermove', e => {
    document.querySelectorAll('.back-btn').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', mx + '%');
      btn.style.setProperty('--my', my + '%');
    });
  });
 




















 
  (function () {
    const supportsViewTimeline = CSS && CSS.supports && (
      CSS.supports('animation-timeline: view()') || CSS.supports('animation-timeline: view-timeline')
    );

    // Fallback للمتصفحات القديمة: IntersectionObserver
    if (!supportsViewTimeline) {
      const reveal = (el, delay = 0) => {
        setTimeout(() => {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0) scale(1)';
        }, delay);
      };
      const cards = document.querySelectorAll('.cat-card');
      const title = document.querySelector('.cat-title');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target === title) {
            reveal(title, 0);
          } else {
            const index = [...cards].indexOf(entry.target);
            reveal(entry.target, 80 * index);
          }
          io.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      if (title) io.observe(title);
      cards.forEach(c => io.observe(c));
    }

    // 3D Tilt / Magnetic Hover للكروت
    const MAX_TILT = 8; 
    const cards = document.querySelectorAll('.cat-card');
    cards.forEach(card => {
      card.setAttribute('data-tilt', '1');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;    
        const y = e.clientY - rect.top;
        const px = (x / rect.width)  - 0.5; // -0.5 .. 0.5
        const py = (y / rect.height) - 0.5;

        const rx = (+py * MAX_TILT);
        const ry = (-px * MAX_TILT);
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });

    // Magnetic glow  
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
      backBtn.addEventListener('mousemove', (e) => {
        const r = backBtn.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100 + '%';
        const my = ((e.clientY - r.top)  / r.height) * 100 + '%';
        backBtn.style.setProperty('--mx', mx);
        backBtn.style.setProperty('--my', my);
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
 
