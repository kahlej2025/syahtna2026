 //step 1 animation
(() => {
  const els = Array.from(document.querySelectorAll('.anim-fadeUp'));
  if (!('IntersectionObserver' in window) || !els.length) return;

  
  els.forEach(el => { el.style.animationPlayState = 'paused'; el.style.opacity = 0; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({isIntersecting, target}) => {
      if (isIntersecting) {
        target.style.opacity = '';                // رجّع القيمة الافتراضية
        target.style.animationPlayState = 'running';
        io.unobserve(target); // شغّل مرة واحدة
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();














 
function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  }).format(date);
}

// مثال: إنشاء كارت جديد
function createDayCard(dayNumber, city, dateObj) {
  const tpl = document.getElementById('dayCardTpl');
  const clone = tpl.content.cloneNode(true);

  clone.querySelector('.dNum').textContent = dayNumber;
  clone.querySelector('.dCity').textContent = city;

  // التاريخ الميلادي
  clone.querySelector('.dDate').textContent = formatDate(dateObj);

  return clone;
}




















 // main function
(() => {
  // ================== I18N (منظّم بلا تكرار) ==================
  const I18N = {
    en: {
      
      // Header / Wizard
      badge: "✈️ Trip Wizard",
      title: "Smart trip planner: Balance your energy and budget",
      subtitle: "Pick dates, travel energy, and cities; get a balanced day-by-day plan you can lock & regenerate.",
      subtitleInline: "(Morning / Afternoon / Evening)",

      // Stepper
      stepBasics: "Basics", stepCities: "Cities", stepPrefs: "Preferences",

      // Dates
      startDate: "Start date", endDate: "End date",
      phStartDate: "Select start date", phEndDate: "Select end date",

      // Energy
      energyLabel: "Daily activity level",
      lightPlan: "Light Plan", balancedPlan: "Balanced Plan", intensePlan: "Intense Plan",

      // Group
      partyLabel: "Who are you traveling with?", solo: "Solo", friends: "Friends", family: "Family", couple: "Couple",

      // Buttons / Generic
      next: "Next", back: "Back", addCity: "+ Add city", generate: "Generate itinerary",
      generateBtn: "Generate itinerary", yourItinerary: "Your itinerary", reset: "Reset",

      // Labels / Help
      chooseCity: "Choose city",
      interests: "Interests (influence activity picks)",
      interestsLabel: "Interests (influence activity picks)",
      budget: "Budget (SAR)", budgetLabel: "Budget (SAR)", phBudget: "e.g., 8000", currencySAR: "SAR",

      // Output section
      itineraryTitle: "Your itinerary",
      resetBtn: "Reset",
      durationTxt: "Duration",
      dayLabel: "Day",
      addDaySameCity: "Add day in this city",
      removeDay: "Remove",
      regenerateDay: "Regenerate",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",

      // Interests chips
      interest_culture: "Culture",
      interest_food: "Food",
      interest_coffee: "Coffee & tea",
      interest_nature: "Nature",
      interest_stays: "Elegant stays",
      interest_adventure: "Adventure",
      interest_shopping: "Shopping",

      results_icon_alt: "Section icon",
    rest_img_alt: "Restaurant",

    footer_categories: "All Categories",
  footer_restaurants: "Restaurants",
  footer_cafe: "Cafe",
  footer_supermarkets: "Supermarket",
  footer_hotels: "Hotels",

  footer_contact: "Contact",
  footer_email: "Email: Support123@gmail.com",
  footer_phone1: "Phone 1: 12345678",
  footer_phone2: "Phone 2: 3455765433345",

  footer_policies: "Policies",
  footer_guidelines: "Community Guidelines",
  footer_terms: "Terms of Use",
  footer_privacy: "Privacy Policy",

  footer_download: "Download Our App",
  footer_download_desc: "Get the Latest Version of our Apps",
  footer_rights: "© 2025 Siyahatna. All rights reserved.",

  footer_logo_alt: "Siyahatna logo",
  footer_google_alt: "Get it on Google Play",
  footer_apple_alt: "Download on the App Store",
    },

    ar: {
       
      // Header / Wizard
      badge: "✈️ مُخطِّط الرحلات",
      title: "مُخطِّط رحلات ذكي يوازن بين طاقتك وميزانيتك",
      subtitle: "اختر التواريخ، مستوى النشاط، والمدن؛ واحصل على خطة يومية متوازنة مع إمكانية القفل وإعادة التوليد.",
      subtitleInline: "(صباح / بعد الظهر / مساء)",

      // Stepper
      stepBasics: "الأساسيات", stepCities: "المدن", stepPrefs: "التفضيلات",

      // Dates
      startDate: "تاريخ البداية", endDate: "تاريخ النهاية",
      phStartDate: "اختر تاريخ البداية", phEndDate: "اختر تاريخ النهاية",

      // Energy
      energyLabel: "مستوى النشاط اليومي",
      lightPlan: "خطة خفيفة", balancedPlan: "خطة متوازنة", intensePlan: "خطة مكثفة",

      // Group
      partyLabel: "ستسافر مع من؟", solo: "فردي", friends: "أصدقاء", family: "عائلة", couple: "ثنائي",

      // Buttons / Generic
      next: "التالي", back: "رجوع", addCity: "+ إضافة مدينة", generate: "ولّد الخطة",
      generateBtn: "إنشاء برنامج الرحلة", yourItinerary: "برنامج رحلتك", reset: "إعادة الضبط",

      // Labels / Help
      chooseCity: "اختر مدينة",
      interests: "الاهتمامات (تؤثر على اختيار الأنشطة)",
      interestsLabel: "الاهتمامات (تؤثر على اختيار الأنشطة)",
      budget: "الميزانية (ر.س)", budgetLabel: "الميزانية (ر.س)", phBudget: "مثال: ٨٠٠٠", currencySAR: "ر.س",

      // Output section
      itineraryTitle: "برنامج رحلتك",
      resetBtn: "إعادة تعيين",
      durationTxt: "المدة",
      dayLabel: "اليوم",
      addDaySameCity: "إضافة يوم في نفس المدينة",
      removeDay: "إزالة",
      regenerateDay: "إعادة التوليد",
      morning: "صباحًا",
      afternoon: "بعد الظهر",
      evening: "مساءً",

      // Interests chips
      interest_culture: "ثقافة",
      interest_food: "طعام",
      interest_coffee: "قهوة وشاي",
      interest_nature: "طبيعة",
      interest_stays: "إقامات فاخرة",
      interest_adventure: "مغامرة",
      interest_shopping: "تسوق",

      
    results_icon_alt: "أيقونة القسم",
    rest_img_alt: "مطعم",

    footer_categories: "كل الفئات",
  footer_restaurants: "مطاعم",
  footer_cafe: "مقاهي",
  footer_supermarkets: "سوبر ماركت",
  footer_hotels: "فنادق",

  footer_contact: "تواصل معنا",
  footer_email: "البريد: Support123@gmail.com",
  footer_phone1: "الهاتف 1: 12345678",
  footer_phone2: "الهاتف 2: 3455765433345",

  footer_policies: "السياسات",
  footer_guidelines: "إرشادات المجتمع",
  footer_terms: "شروط الاستخدام",
  footer_privacy: "سياسة الخصوصية",

  footer_download: "حمّل تطبيقنا",
  footer_download_desc: "احصل على أحدث إصدار من تطبيقاتنا",
  footer_rights: "© 2025 سياحتنا. جميع الحقوق محفوظة.",

  footer_logo_alt: "شعار سياحتنا",
  footer_google_alt: "متاح على Google Play",
  footer_apple_alt: "حمّل من App Store"

    }
  };

  // ================== Helpers ==================
  const html = document.documentElement;
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const getLang = () => localStorage.getItem("lang") || "en";

  function translateIn(root, lang){
    const dict = I18N[lang] || I18N.en;
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
  }

  function applyLang(lang){
    localStorage.setItem("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
    translateIn(document, lang);
  }

  const fmtDateLocal = (dateLike, lang=getLang()) => {
    const d = (dateLike instanceof Date) ? dateLike : new Date(dateLike);
    const locales = (lang === "ar") ? "ar-SA" : "en-US";
    return new Intl.DateTimeFormat(locales, { year: "numeric", month: "long", day: "numeric" }).format(d);
  };

  const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate() + n); return d; };
  const isValidDate = (v) => !Number.isNaN(new Date(v).getTime());

  // ================== Language Menus ==================
  function setupLangMenus(){
    $("#langMenuDesktop")?.classList.add("lang-menu");
    $("#langMenuMobile")?.classList.add("lang-menu");

    const toggle = (btnSel, menuSel) => {
      const btn = $(btnSel), menu = $(menuSel);
      if(!btn || !menu) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        $$(".lang-menu").forEach(m => m.classList.add("hidden"));
        menu.classList.toggle("hidden");
      });
    };
    toggle("#langBtnDesktop", "#langMenuDesktop");
    toggle("#langBtnMobile", "#langMenuMobile");

    $$('#langMenuDesktop [data-lang], #langMenuMobile [data-lang]').forEach(a=>{
      a.addEventListener("click", (e)=>{
        e.preventDefault();
        const lang = a.getAttribute("data-lang");
        applyLang(lang);
        $$(".lang-menu").forEach(m => m.classList.add("hidden"));
      });
    });

    document.addEventListener("click", ()=> $$(".lang-menu").forEach(m=> m.classList.add("hidden")));
  }

  // ================== Stepper ==================
  const steps = $$('.step');
  const dots  = $$('.step-dot');
  let stepIdx = 0;
  const goStep = (i) => {
    stepIdx = Math.max(0, Math.min(i, steps.length-1));
    steps.forEach((el, idx) => el.classList.toggle('hidden', idx !== stepIdx));
    dots.forEach((d, idx) => {
      d.classList.toggle('bg-teal-600', idx <= stepIdx);
      d.classList.toggle('text-white',  idx <= stepIdx);
      d.classList.toggle('bg-gray-200', idx >  stepIdx);
      d.classList.toggle('text-gray-700', idx > stepIdx);
    });
  };

  // ================== Cities (Step 2) ==================
  const addBtn   = $('#addCity');
  const rowsWrap = $('#cityRows');
  const cityTpl  = $('#cityTpl');

  const addCityRow = (name='') => {
    const node = cityTpl.content.firstElementChild.cloneNode(true);
    const nameInp = $('.cityName', node);
    const daysInp = $('.cityDays', node);
    const inc = $('.incDay', node);
    const dec = $('.decDay', node);
    const rm  = $('.rmCity', node);

    nameInp.value = name;
    inc.addEventListener('click', () => { daysInp.value = (parseInt(daysInp.value||'1',10)+1); });
    dec.addEventListener('click', () => {
      const v = Math.max(1, parseInt(daysInp.value||'1',10)-1);
      daysInp.value = v;
    });
    daysInp.addEventListener('input', () => {
      const v = parseInt((daysInp.value||'').replace(/\D/g,'' ) || '1',10);
      daysInp.value = Math.max(1, v);
    });
    rm.addEventListener('click', () => node.remove());

    rowsWrap.appendChild(node);
  };

  // ================== Interests (Step 3) ==================
  const bindInterests = () => {
    $$('#interestWrap .interest').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('!bg-teal-600');
        btn.classList.toggle('!text-white');
        btn.classList.toggle('!border-teal-600');
        btn.classList.toggle('ring-2');
        btn.classList.toggle('ring-teal-300');
      });
    });
  };

  // ================== Output & Templates ==================
  const outWrap       = $('#outWrap');
  const daysContainer = $('#daysContainer');
  const durationTxt   = $('#durationTxt');
  const dayCardTpl    = $('#dayCardTpl');
  const resetAll      = $('#resetAll');
  const energyEl      = $('#energy');

  const BASE_POOL = {
    Culture:   ['Heritage quarter walk', 'Local museum visit', 'Historic market stroll', 'Art gallery stop'],
    Food:      ['Local breakfast spot', 'Popular lunch eatery', 'Dessert café', 'Street food corner'],
    'Coffe & tea': ['Specialty coffee bar', 'Teahouse break', 'Coffee roastery tour', 'Modern café'],
    Nature:    ['City park walk', 'Scenic viewpoint', 'Lakeside stroll', 'Botanical garden'],
    'Elegant stays': ['Hotel lounge tea', 'Rooftop view time', 'Spa hour', 'Poolside unwind'],
    Adventure: ['Light hike', 'Bike ride', 'Kayak / boat ride', 'Zipline / ropes (if avail)'],
    Shopping:  ['Modern mall', 'Local craft market', 'Souvenir arcade', 'Design concept store']
  };

  const cityFlavor = (city) => [
    `${city} old-town corners`,
    `${city} signature café`,
    `${city} skyline viewpoint`,
    `${city} night promenade`
  ];

  const DEFAULT_SLOT = {
    morning:   ['Breakfast & gentle walk', 'Photo spots'],
    afternoon: ['Main attraction + lunch'],
    evening:   ['Sunset view + dinner']
  };

  const slotSizeByEnergy = (val) => {
    const v = parseInt(val||'2',10); // 1 خفيف / 2 متوازن / 3 مكثف
    return v === 1 ? 1 : (v === 3 ? 3 : 2);
  };

  const pickForSlot = (slot, interests, city, energyVal) => {
    const size = slotSizeByEnergy(energyVal);
    const pool = [];
    interests.forEach(k => { if (BASE_POOL[k]) pool.push(...BASE_POOL[k]); });
    pool.push(...cityFlavor(city));
    if (!interests.length) pool.push(...(DEFAULT_SLOT[slot] || []));
    const chosen = [];
    const bag = [...new Set(pool)];
    for (let i=0;i<size && bag.length;i++){
      const idx = Math.floor(Math.random()*bag.length);
      chosen.push(bag.splice(idx,1)[0]);
    }
    return chosen;
  };

  const renumberDays = () => {
    const cards = $$('.day-card', daysContainer);
    cards.forEach((c, idx) => { $('.dNum', c).textContent = idx+1; });
  };

  // صانع بطاقة اليوم مع الترجمة الفورية
  const makeDayCard = (dayIndex, cityName, dateObj) => {
    const node = dayCardTpl.content.firstElementChild.cloneNode(true);

    // ترجم محتوى البطاقة فورًا حسب اللغة الحالية
    translateIn(node, getLang());

    $('.dNum', node).textContent  = dayIndex + 1;
    $('.dCity', node).textContent = cityName;
    $('.dDate', node).textContent = fmtDateLocal(dateObj);

    const interests = $$('#interestWrap .interest')
      .filter(b => b.classList.contains('!bg-teal-600'))
      .map(b => b.textContent.trim());

    const energyVal = energyEl?.value || '2';

    const fillSlot = (ulSel, slot) => {
      const ul = $(ulSel, node);
      ul.innerHTML = '';
      const items = pickForSlot(slot, interests, cityName, energyVal);
      items.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        ul.appendChild(li);
      });
    };
    fillSlot('.morning',   'morning');
    fillSlot('.afternoon', 'afternoon');
    fillSlot('.evening',   'evening');

    $('.regenDay', node).addEventListener('click', () => {
      fillSlot('.morning',   'morning');
      fillSlot('.afternoon', 'afternoon');
      fillSlot('.evening',   'evening');
    });
    $('.removeDay', node).addEventListener('click', () => {
      node.remove();
      renumberDays();
    });
    $('.addSameCity', node).addEventListener('click', () => {
      const cards = $$('.day-card', daysContainer);
      const insertIdx = cards.indexOf(node) + 1;
      const lastCard  = cards[cards.length-1];
      const lastDateText = lastCard ? $('.dDate', lastCard).textContent : fmtDateLocal(dateObj);
      const lastDate = new Date(lastDateText);
      const newDate  = addDays(lastDate, 1);
      const newCard  = makeDayCard(insertIdx, cityName, newDate);
      if (insertIdx >= cards.length) daysContainer.appendChild(newCard);
      else daysContainer.insertBefore(newCard, cards[insertIdx]);
      renumberDays();
    });

    return node;
  };

  // ================== Generate ==================
  const bindGenerate = () => {
    $('#generate')?.addEventListener('click', () => {
      const sVal = $('#sDate')?.value?.trim();
      const eVal = $('#eDate')?.value?.trim();

      if (!isValidDate(sVal) || !isValidDate(eVal)) {
        alert(getLang()==='ar' ? 'من فضلك أدخل تاريخي بدء/نهاية صحيحين.' : 'Please enter valid start/end dates.');
        return;
      }
      const sDate = new Date(sVal);
      const eDate = new Date(eVal);
      if (eDate < sDate) {
        alert(getLang()==='ar' ? 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية.' : 'End date must be after start date.');
        return;
      }

      // مدن + أيام
      const rows = $$('#cityRows > div');
      const cities = [];
      rows.forEach(r => {
        const name = $('.cityName', r)?.value.trim();
        const days = Math.max(1, parseInt($('.cityDays', r)?.value||'1',10));
        if (name) cities.push({ name, days });
      });
      if (!cities.length) {
        alert(getLang()==='ar' ? 'أضف مدينة واحدة على الأقل.' : 'Please add at least one city.');
        return;
      }

      // اهتمامات مختارة 
      const interests = $$('#interestWrap .interest')
        .filter(b => b.classList.contains('!bg-teal-600'))
        .map(b => b.textContent.trim());

      // الطاقة
      const energyVal = $('#energy')?.value || '2';

      // المدة الشاملة
      const totalDays = Math.max(1, Math.round((eDate - sDate) / (1000*60*60*24)) + 1);

      // مواءمة أيام المدن مع المدة
      let sumCityDays = cities.reduce((a,c)=>a+c.days,0);
      if (sumCityDays < totalDays) {
        let idx = 0;
        while (sumCityDays < totalDays) { cities[idx % cities.length].days += 1; sumCityDays++; idx++; }
      } else if (sumCityDays > totalDays) {
        let idx = 0;
        while (sumCityDays > totalDays) {
          const c = cities[idx % cities.length];
          if (c.days > 1) { c.days -= 1; sumCityDays--; }
          idx++;
        }
      }

      const cityCycle = [];
      cities.forEach(c => { for(let i=0;i<c.days;i++) cityCycle.push(c.name); });

      // ابني المخرجات
      daysContainer.innerHTML = '';
      outWrap.classList.remove('hidden');

      const lang = getLang();
      const dict = I18N[lang] || I18N.en;
      durationTxt.textContent =
        (lang === 'ar')
          ? `${dict.durationTxt}: ${totalDays} يوم • ${fmtDateLocal(sDate, lang)} → ${fmtDateLocal(eDate, lang)}`
          : `${dict.durationTxt}: ${totalDays} day(s) • ${fmtDateLocal(sDate, lang)} → ${fmtDateLocal(eDate, lang)}`;

      for (let i=0;i<totalDays;i++){
        const cityName = cityCycle[i % cityCycle.length];
        const d = addDays(sDate, i);
        const card = makeDayCard(i, cityName, d);
        daysContainer.appendChild(card);
      }
      renumberDays();
      goStep(2);
    });
  };

  // ================== Reset ==================
  const bindReset = () => {
    resetAll?.addEventListener('click', () => {
      daysContainer.innerHTML = '';
      outWrap.classList.add('hidden');
      goStep(0);
    });
  };

  // ================== Flatpickr ==================
  const initCalendars = () => {
    if (typeof flatpickr !== 'function') return; // تأكد من تحميل المكتبة
    const isRTL = (getLang() === 'ar') || (html.getAttribute('dir') === 'rtl');

    const commonOpts = {
      minDate: 'today',
      dateFormat: 'Y-m-d',    // قيمة الحقل الفعلية
      altInput: true,
      altFormat: 'd M Y',     // عرض للمستخدم
      allowInput: true,
      locale: isRTL ? (window.Flatpickr?.l10ns?.ar || null) : undefined,
      disableMobile: true
    };

    const sPicker = flatpickr('#sDate', {
      ...commonOpts,
      onChange: (selectedDates, dateStr) => {
        if (ePicker) {
          ePicker.set('minDate', dateStr || 'today');
          if (!ePicker.input.value) ePicker.setDate(dateStr, true);
        }
      }
    });

    var ePicker = flatpickr('#eDate', { ...commonOpts });

    // لو فيه قيمة بداية قبل التحميل
    const sVal = sPicker?.input?.value;
    if (sVal && ePicker) ePicker.set('minDate', sVal);
  };

  // ================== Navbar Anim + Mobile Menu   ==================
  const bindNavbar = () => {
    // دخول عناصر الناف
    const items = document.querySelectorAll(".nav-item");
    items.forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-2");
        el.classList.add("opacity-100", "translate-y-0");
      }, i * 200);
    });

    // همبرجر
    const navToggle  = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (navToggle && mobileMenu) {
      const mobileLinks = mobileMenu.querySelectorAll("a");
      navToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !expanded);
      });
      mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  };

  // ================== Init ==================
  document.addEventListener('DOMContentLoaded', () => {
    // لغة البداية
    applyLang(getLang());

    // ستبر + أزرار
    $$('.next').forEach(b => b.addEventListener('click', () => goStep(stepIdx+1)));
    $$('.prev').forEach(b => b.addEventListener('click', () => goStep(stepIdx-1)));
    goStep(0);

    // مدينة افتراضية
    if (!rowsWrap?.children?.length) addCityRow('Riyadh');
    addBtn?.addEventListener('click', () => addCityRow());

    // اهتمامات
    bindInterests();

    // قوائم اللغة
    setupLangMenus();

    // تقويم
    initCalendars();

    // توليد/إعادة ضبط
    bindGenerate();
    bindReset();

    // ناف بار
    bindNavbar();
  });
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
 

 

 