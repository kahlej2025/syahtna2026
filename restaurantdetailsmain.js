// ===== Time slots buttons =====
document.querySelectorAll('.slot-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // style
    document.querySelectorAll('.slot-btn').forEach(b =>
      b.classList.remove('ring-2','ring-emerald-500','bg-emerald-50','border-emerald-300')
    );
    btn.classList.add('ring-2','ring-emerald-500','bg-emerald-50','border-emerald-300');

    // update time input + pin label
    const t = btn.dataset.time;
    const timeInput = document.getElementById('res-time');
    timeInput.value = t;
    // Convert to 12h label for the pin
    const [hh, mm] = t.split(':').map(Number);
    const label = `${(hh % 12) || 12}:${mm.toString().padStart(2,'0')} ${hh >= 12 ? 'PM' : 'AM'}`;
    document.getElementById('map-pin').textContent = label;
  });
});

// ===== set today as default date =====
(function () {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  const input = document.getElementById('res-date');
  if (input) input.value = `${yyyy}-${mm}-${dd}`;
})();


// ===== Category filter + glow (version 1) =====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('menu-cats');
  if (!nav) return;

  const btns = nav.querySelectorAll('.cat-btn');
  const items = document.querySelectorAll('#menu .grid a[data-cat]');

  // ===== Category filter =====
  function setActive(btn){
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  function filter(cat){
    const c = (cat || 'all').toLowerCase();
    items.forEach(it => {
      it.style.display = (c === 'all' || it.dataset.cat === c) ? '' : 'none';
    });
  }
  nav.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn'); 
    if (!btn) return;
    setActive(btn); 
    filter(btn.dataset.filter);
  });

  // ===== Mobile/Desktop glow flash =====
  const FLASH_MS = 140;
  document.querySelectorAll('#menu a > .glow-card').forEach(card => {
    const link = card.closest('a');

    // start glow on press
    link.addEventListener('pointerdown', () => {
      card.classList.add('active-glow');
    }, { passive: true });

    const endPress = () => {
      setTimeout(() => { card.classList.remove('active-glow'); }, FLASH_MS);
      // remove focus after touch/click
      link.blur();
    };

    link.addEventListener('pointerup', endPress, { passive: true });
    link.addEventListener('pointercancel', endPress, { passive: true });
    link.addEventListener('pointerleave', endPress, { passive: true });
    link.addEventListener('click', () => link.blur(), { passive: true });
  });
});


// ===== Category filter + glow (version 2 – مختصر للموبايل) =====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('menu-cats');
  if (!nav) return;

  const btns = nav.querySelectorAll('.cat-btn');
  const items = document.querySelectorAll('#menu .grid a[data-cat]');

  function setActive(btn){
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  function filter(cat){
    const c = (cat || 'all').toLowerCase();
    items.forEach(it => {
      it.style.display = (c === 'all' || it.dataset.cat === c) ? '' : 'none';
    });
  }

  nav.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn'); 
    if (!btn) return;
    setActive(btn); 
    filter(btn.dataset.filter);
  });

  // Mobile glow effect
  document.querySelectorAll('a .glow-card').forEach(card => {
    const link = card.closest('a');
    link.addEventListener('touchstart', () => { 
      card.classList.add('active-glow'); 
    }, {passive:true});
    const remove = () => { card.classList.remove('active-glow'); };
    link.addEventListener('touchend', remove);
    link.addEventListener('touchcancel', remove);
  });
});


// ===== favorite BTN =====
const favBtn = document.getElementById("favBtn");
const favIcon = document.getElementById("favIcon");
const favPulse = document.getElementById("favPulse");

let isFav = false;

if (favBtn && favIcon && favPulse) {
  favBtn.addEventListener("click", () => {
    isFav = !isFav;

    // تفعيل أو إلغاء المفضلة
    if (isFav) {
      favIcon.setAttribute("fill", "red");
      favIcon.setAttribute("stroke", "red");

      // تأثير نبض
      favPulse.classList.add("opacity-40", "scale-150");
      setTimeout(() => favPulse.classList.remove("opacity-40", "scale-150"), 400);
    } else {
      favIcon.setAttribute("fill", "none");
      favIcon.setAttribute("stroke", "currentColor");
    }
  });
}


// ===== footer reveal =====
(function () {
  const revealables = document.querySelectorAll('[data-reveal]');
  const withStagger = (root) => {
    const items = root.querySelectorAll('li, a, p, h4, span');
    items.forEach((el, i) => el.style.setProperty('--rv-delay', (i * 60) + 'ms'));
  };
  if (!('IntersectionObserver' in window)) {
    revealables.forEach(el => { 
      withStagger(el); 
      el.classList.add('is-inview'); 
    });
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
