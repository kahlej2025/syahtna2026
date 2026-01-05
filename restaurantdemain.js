 
 
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');

  const btnPrev  = document.getElementById('lbPrev');
  const btnNext  = document.getElementById('lbNext');
  const btnClose = document.getElementById('lbClose');

  if (!lb || !lbImg || !lbCaption) return;

  let items = [];
  let idx = -1;

  function getItems() {
    items = Array.from(document.querySelectorAll('#foodGrid [data-full]'));
  }

  function loadImg(src, fallback) {
    return new Promise(resolve => {
      if (!src) return resolve(fallback || '');
      const im = new Image();
      im.onload  = () => resolve(src);
      im.onerror = () => resolve(fallback || '');
      im.decoding = 'async';
      im.src = src;
      if ('decode' in im) im.decode().then(() => resolve(src)).catch(()=>{});
    });
  }

  async function openFrom(el) {
    getItems();
    idx = items.indexOf(el);
    if (idx < 0) return;

    const full  = (el.dataset.full || '').trim();
    const thumb = el.querySelector('img')?.src || '';
    const alt   = el.dataset.alt || el.querySelector('img')?.alt || '';
    const title = (el.dataset.title?.trim()) || alt || 'Dish';

    const okSrc = await loadImg(full, thumb);
    lbImg.src = okSrc;
    lbImg.alt = alt || title;
    lbCaption.textContent = title;

    lb.classList.remove('hidden');
    lb.classList.add('flex');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('overflow-hidden');
    (btnClose || lb).focus();
  }

  function close() {
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.removeAttribute('src');
    idx = -1;
    document.documentElement.classList.remove('overflow-hidden');
  }

  function prev() { if (idx !== -1) openFrom(items[(idx - 1 + items.length) % items.length]); }
  function next() { if (idx !== -1) openFrom(items[(idx + 1) % items.length]); }

  // Delegation
  document.addEventListener('click', (e) => {
    const card = e.target.closest('#foodGrid [data-full]');
    if (card) { e.preventDefault(); openFrom(card); return; }

    if (e.target.closest('#lbClose')) { close(); return; }
    if (e.target.closest('#lbPrev')) { prev(); return; }
    if (e.target.closest('#lbNext')) { next(); return; }

    // Click outside the card to close
    if (!lb.classList.contains('hidden')) {
      const inside = e.target.closest('article, #lbPrev, #lbNext, #lbClose');
      if (!inside) close();
    }
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft')  prev();
    else if (e.key === 'ArrowRight') next();
  });
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
 