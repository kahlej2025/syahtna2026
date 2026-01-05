//Script for Tabs  
   
    const termsBtn = document.getElementById('termsBtn');
    const privacyBtn = document.getElementById('privacyBtn');
    const termsContent = document.getElementById('termsContent');
    const privacyContent = document.getElementById('privacyContent');

    termsBtn.addEventListener('click', () => {
      termsContent.classList.remove('hidden');
      privacyContent.classList.add('hidden');
      termsBtn.classList.replace('bg-gray-200', 'bg-teal-600');
      termsBtn.classList.replace('text-gray-700', 'text-white');
      privacyBtn.classList.replace('bg-teal-600', 'bg-gray-200');
      privacyBtn.classList.replace('text-white', 'text-gray-700');
    });

    privacyBtn.addEventListener('click', () => {
      privacyContent.classList.remove('hidden');
      termsContent.classList.add('hidden');
      privacyBtn.classList.replace('bg-gray-200', 'bg-teal-600');
      privacyBtn.classList.replace('text-gray-700', 'text-white');
      termsBtn.classList.replace('bg-teal-600', 'bg-gray-200');
      termsBtn.classList.replace('text-white', 'text-gray-700');
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
 