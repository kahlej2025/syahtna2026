
// gallery
(function () {
    const main = document.getElementById('mainPhoto');
    const thumbsWrap = document.querySelector('[data-gallery="thumbs"]');
    if (!main || !thumbsWrap) return;

    // استبدال الصورة الكبيرة عند الضغط على أي مصغّرة
    thumbsWrap.addEventListener('click', function (e) {
      const thumb = e.target.closest('img');
      if (!thumb) return;

      const newSrc = thumb.dataset.full || thumb.src;
      const newAlt = thumb.alt || main.alt;

      if (newSrc && newSrc !== main.src) {
        main.src = newSrc;
        main.alt = newAlt;
      }
    });
  })();


// gallery animation

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    images.forEach(img => observer.observe(img));
  });


// cards
(function () {
    const cards = document.querySelectorAll('[data-anim="card"]');
    if (!('IntersectionObserver' in window) || cards.length === 0) {
      cards.forEach(el => el.classList.add('anim-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const index = Array.from(cards).indexOf(e.target);
          e.target.style.setProperty('--d', `${(index % 6) * 0.06}s`);
          e.target.classList.add('anim-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach((el) => io.observe(el));
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
 