// Add once
  (function(){
    if (window.__animIO) return; // guard
    const targets = '.anim-sidebar, .anim-reveal, .anim-stagger, .anim-pop';
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(targets).forEach(el=> io.observe(el));
    window.__animIO = io;
  })();






 
 //filter 1
 
document.addEventListener("DOMContentLoaded", () => {
  const categoryTabs = document.querySelectorAll("#categoryTabs button");
  const priceTabs    = document.querySelectorAll("#priceTabs button");
  const grid         = document.querySelector(".cards-animate");
  const cards        = grid.querySelectorAll(".card-anim");

  // ========================
  // Helper: get active filter value
  // ========================
  function getActiveValue(tabGroup, attr, fallback = "all") {
    const active = Array.from(tabGroup).find(btn => btn.getAttribute("aria-pressed") === "true");
    return active ? active.dataset[attr] : fallback;
  }

  // ========================
  // Toggle button states
  // ========================
  function updatePressed(tabGroup, activeBtn) {
    tabGroup.forEach(btn => btn.setAttribute("aria-pressed", "false"));
    activeBtn.setAttribute("aria-pressed", "true");
  }

  // ========================
  // Apply filters to cards
  // ========================
  function applyFilters() {
    const cat   = getActiveValue(categoryTabs, "filter", "all");
    const price = getActiveValue(priceTabs, "price", "all");

    let visibleIndex = 0;
    cards.forEach(card => {
      const matchCat   = (cat === "all")   || (card.dataset.category === cat);
      const matchPrice = (price === "all") || (card.dataset.price === price);
      const show = matchCat && matchPrice;

      if (show) {
        card.classList.remove("card-hide");
        card.style.order = visibleIndex; // يعيد الترتيب
        card.style.transitionDelay = (visibleIndex * 0.05) + "s";
        visibleIndex++;
      } else {
        card.classList.add("card-hide");
        card.style.order = "";
        card.style.transitionDelay = "0s";
      }
    });
  }

  // ========================
  // Attach events to tabs
  // ========================
  categoryTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      updatePressed(categoryTabs, btn);
      applyFilters();
    });
  });

  priceTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      updatePressed(priceTabs, btn);
      applyFilters();
    });
  });

  // ========================
  // Initial load
  // ========================
  applyFilters();

  // ========================
  // Trigger cards enter animation (once on scroll)
  // ========================
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  if (grid) io.observe(grid);

  // ========================
  // Debug helper (optional)
  // ========================
  window.testFilter = (cat, price) => {
    categoryTabs.forEach(b => b.setAttribute("aria-pressed", b.dataset.filter === cat ? "true" : "false"));
    priceTabs.forEach(b => b.setAttribute("aria-pressed", b.dataset.price === price ? "true" : "false"));
    applyFilters();
  };
});
 




 
 

// filter 2
 const tabs = document.querySelectorAll('#priceTabs button');
  const cards = document.querySelectorAll('.card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // تغيير تنسيق الأزرار
      tabs.forEach(t => {
        t.classList.remove('bg-teal-600', 'text-white');
        t.classList.add('bg-gray-200');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('bg-teal-600', 'text-white');
      tab.classList.remove('bg-gray-200');
      tab.setAttribute('aria-pressed', 'true');

      const filter = tab.dataset.price;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.price === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


















 // cards
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