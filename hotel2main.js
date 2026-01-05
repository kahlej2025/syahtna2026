
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




 
 // auto slider
  (function () {
    const rowA = document.getElementById('slider-row-a');
    const rowB = document.getElementById('slider-row-b');
    const track = rowA.parentElement;

    if (!rowA || !rowB) return;

    // 1) استنساخ محتوى A إلى B (تطابق تام لضمان اللوب السلس)
    rowB.innerHTML = rowA.innerHTML;

    // 2) لو مجموع عرض الكروت أصغر من عرض الشاشة، نكرر الكروت لحد ما يغطي مرتين العرض (عشان ما يحصلش فراغ)
    function totalWidth(el) {
      const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || 24);
      let sum = 0;
      [...el.children].forEach((child, i, arr) => {
        const rect = child.getBoundingClientRect();
        sum += rect.width;
        if (i < arr.length - 1) sum += gap; // إضافة الفراغ بين العناصر
      });
      // padding-inline يضاف بواسطة CSS؛ مش محتاجين نحسبه هنا لأن الصفين متطابقين
      return sum;
    }

    function fillIfShort() {
      const vw = track.parentElement.getBoundingClientRect().width; // عرض القسم
      // نحتاج أن يغطي صف واحد على الأقل "عرض الشاشة"؛ وبما إننا بنحرك بنصف العرض، الأفضل نحاول نخلي صف A ≥ vw
      let guard = 50; // لتجنب لوب لا نهائي
      while (guard-- > 0 && totalWidth(rowA) < vw) {
        rowA.appendChild(rowA.children[0].cloneNode(true));
      }
      // بعد ما A كبر بما يكفي، نجعل B نسخة منه مرة أخرى
      rowB.innerHTML = rowA.innerHTML;
    }

    // نعبّي عند التحميل وبعد أول ريندر
    window.addEventListener('load', fillIfShort);
    // وبرضه لو اتغيرت الأحجام (فونت/وسائط) أو تم تغيير حجم النافذة
    window.addEventListener('resize', () => {
      // إعادة التعبئة فقط لو صار أصغر من العرض
      fillIfShort();
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





 