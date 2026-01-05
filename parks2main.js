 


 
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

      // تأثير النبض
      favPulse.classList.add("opacity-40", "scale-150");
      setTimeout(() => favPulse.classList.remove("opacity-40", "scale-150"), 400);
    } else {
      favIcon.setAttribute("fill", "none");
      favIcon.setAttribute("stroke", "currentColor");
    }

    // حركة بسيطة للقلب
    favBtn.classList.add("scale-125");
    setTimeout(() => favBtn.classList.remove("scale-125"), 200);
  });
 












  
 // gallery
  (function(){
    const grid = document.querySelector('#parkGallery .gallery-grid');
    if(!grid) return;

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          grid.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    io.observe(grid);
  })();
 
 
 
 
 
 // details
  const toggleBtn = document.getElementById("toggleDetails"); // زر View details
  const hideBtn   = document.getElementById("hideDetails");   // زر Hide details
  const details   = document.getElementById("detailsSection");

  // إظهار التفاصيل
  toggleBtn.addEventListener("click", function(e) {
    e.preventDefault();
    details.classList.remove("hidden");
    details.scrollIntoView({ behavior: "smooth" });
  });

  // إخفاء التفاصيل
  hideBtn.addEventListener("click", function() {
    details.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
 