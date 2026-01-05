//search bar
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("heroSearch");
    if (search) {
      requestAnimationFrame(() => {
        search.classList.remove("opacity-0", "translate-y-6");
        search.classList.add("opacity-100", "translate-y-0");
      });
    }
  });
 



 
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
 







 
 // cards
  (function(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(el => el.setAttribute('data-animate',''));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    cards.forEach(el => io.observe(el));
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
 

