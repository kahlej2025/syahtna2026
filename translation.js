
// navbar links
 document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".nav-item");
  items.forEach((el, i) => {
    setTimeout(() => {
      el.classList.remove("opacity-0", "translate-y-2");
      el.classList.add("opacity-100", "translate-y-0");
    }, i * 200); // بطأنا الحركة
  });
});





 
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, aside");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeUp");
        entry.target.classList.remove("opacity-0");
        obs.unobserve(entry.target); // يظهر مرة واحدة فقط
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));
});
 

















  // HUMBURGER MENU
 
  document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    // فتح/إغلاق المنيو
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
    });

    // إغلاق المنيو عند الضغط على أي رابط
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  });
 


// language btn

(function(){
  const toggleDropdown = (btn, menu) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      document.querySelectorAll('.lang-menu').forEach(m => m.classList.add('hidden'));
      if (!isOpen) menu.classList.remove('hidden');
    });
  };

  const desktopBtn = document.getElementById('langBtnDesktop');
  const desktopMenu = document.getElementById('langMenuDesktop');
  const mobileBtn = document.getElementById('langBtnMobile');
  const mobileMenu = document.getElementById('langMenuMobile');

  desktopMenu.classList.add('lang-menu');
  mobileMenu.classList.add('lang-menu');

  toggleDropdown(desktopBtn, desktopMenu);
  toggleDropdown(mobileBtn, mobileMenu);

  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-menu').forEach(m => m.classList.add('hidden'));
  });
})();


 
(function(){
   const I18N = {
    en: {
      nav_home: "Home",
      nav_categories: "Travel itinerary",
      nav_about: "About",
      nav_deals: "Contact us",
      nav_register: "Register",
      nav_login: "Log in",
      lang_btn: "Language",
      brand: "Siyahatna",
    brand_alt: "Siyahatna logo",
    brand_aria: "Siyahatna",
    // star sidebar
    sb_filter_title: "Filter by Star Rating",
    sb_cta_title: "Ready to Travel",
    sb_cta_desc: "Plan your trip, pick restaurants & book with one tap.",
    sb_cta_btn: "Start Planning",
    sb_also_search: "Also search for:",
    sb_link_restaurant: "Restaurant",
    sb_link_cafe: "Cafe",
    sb_link_supermarket: "Supermarket",
     parks: "Parks",
     hotel: "Hotel",
   // nex prev general
    pg_prev: "Previous",
    pg_next: "Next",
    pg_ellipsis: "...",

     checkout_title: "Checkout",
    checkout_subtitle: "Complete your order and choose your preferred payment method.",
      checkout_contact_title: "Contact & Billing",
    checkout_fullname_label: "Full name",
    checkout_fullname_ph: "John Doe",
    checkout_phone_label: "Phone",
    checkout_phone_ph: "+966 5x xxx xxxx",
    checkout_city_label: "City",
    checkout_city_ph: "Riyadh",
    checkout_email_label: "Email",
    checkout_email_ph: "you@example.com",
    checkout_address_label: "Billing address",
    checkout_address_ph: "Street, building, apartment",

  
  
    pay_title: "Payment method",
    pay_online: "Online payment",
    pay_online_desc: "Visa, Mastercard, Apple Pay, Google Pay",
    pay_bank: "Bank transfer",
    pay_bank_desc: "Transfer to bank account & upload receipt",
    pay_cash: "Cash on delivery",
    pay_cash_desc: "Extra COD fee may apply",

    panel_online_title: "Online Payment",
    panel_bank_title: "Bank Transfer",
    panel_cash_title: "Cash on Delivery",
    panel_cash_desc: "Have exact amount ready. A COD fee may apply.",

    card_visa: "Visa",
    card_mastercard: "Mastercard",
    card_apple: "Apple Pay",
    card_google: "Google Pay",
    card_name: "Cardholder name",
    card_name_ph: "JOHN A DOE",
    card_number: "Card number",
    card_number_ph: "XXXX XXXX XXXX XXXX",
    card_secure_note: "We never store your full card number.",
    card_exp: "Expiry",
    card_exp_ph: "MM/YY",
    card_cvv: "CVV",
    card_cvv_ph: "•••",
    card_save: "Save card for faster checkout next time",

    bank_holder: "Account holder name",
    bank_name: "Bank name",
    bank_swift: "SWIFT / BIC",
    bank_iban: "IBAN",
    bank_upload: "Upload receipt",
    bank_upload_hint: "Accepted: JPG, PNG, PDF.",

    cash_date: "Delivery date",
    cash_time: "Time window",
    cash_any: "Anytime",
    cash_morning: "9:00–12:00",
    cash_afternoon: "12:00–16:00",
    cash_evening: "16:00–20:00",

    terms: "I agree to the Terms & Conditions and Refund Policy.",
    btn_pay: "Pay now",
    btn_hint: "Your card will be charged securely.",

    summary_title: "Order summary",
    item_a: "Item A",
    item_qty1: "Qty 1",
    item_b: "Item B",
    item_qty2: "Qty 2",
    summary_subtotal: "Subtotal",
    summary_shipping: "Shipping",
    summary_discount: "Discount",
    summary_total: "Total",
    coupon_ph: "Coupon code",
    coupon_apply: "Apply",
    summary_note: "Example only — wire up totals to your cart logic.",
    help_title: "Need help?",
    help_text: "Chat with us on WhatsApp or email support@example.com.",



  //payment
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


    // plan
     "plan2.badge": "Plan Your Journey Effortlessly",
      "plan2.title": "Choose how you’d like to build your itinerary",
      "plan2.subtitle": "Go fully assisted with AI for quick, optimized plans — or craft every detail yourself.",

      "plan2.manual.aria": "Manual planning",
      "plan2.manual.title": "Manual Planning",
      "plan2.manual.desc": "Build your trip step by step: days, cities, activities, and timings — full control is yours.",
      "plan2.manual.f1": "Precise control & fine-tuning",
      "plan2.manual.f2": "Works great for fixed bucket lists",
      "plan2.manual.f3": "Offline-friendly draft workflow",
      "plan2.manual.cta": "Start Manual",

      "plan2.smart.aria": "Smart planning (AI)",
      "plan2.smart.badge": "Recommended",
      "plan2.smart.title": "Smart Planning (AI)",
      "plan2.smart.desc": "Get an optimized plan based on your preferences, time, and travel pace — instantly.",
      "plan2.smart.f1": "Tailored suggestions to your interests",
      "plan2.smart.f2": "Optimized routes & realistic timings",
      "plan2.smart.f3": "One-click edits & quick re-planning",
      "plan2.smart.cta": "Start Smart",
      // INDEX
     hero_title1: "Discover Saudi Arabia",
    hero_title2: "with your Custom Travel Plan",
    hero_desc: "Plan your trip, explore top attractions, and book everything in one place.",
    hero_btn: "Start Now",
    hero_img_alt1: "Saudi destination scenic background",
    hero_img_alt2: "Saudi cultural and nature montage",

    promo_title: "Find things to do for everything you’re into",
    promo_desc: "Browse 400,000 experiences and book with us",
    promo_btn: "Book Now",
    promo_img_alt: "Hotel",

    cat_title: "Browse by Category",
    cat_prev: "Previous",
    cat_next: "Next",
    cat_restaurants: "Restaurants",
    cat_restaurants_alt: "Restaurants logo",
    cat_cafes: "Cafés",
    cat_hotels : "Hotels",
    cat_cafes_alt: "Cafe logo",
    cat_supermarkets: "Supermarkets",
    cat_supermarkets_alt: "Supermarkets logo",
    cat_parks: "Parks",
    cat_parks_alt: "Parks logo",

     deals_title: "Exclusive Deals under {{price}}",
      currency_alt: "SAR",
      prev: "Previous",
      next: "Next",
      deal_text: "Limited Time Deal!",
      book_now: "Book Now",
      price_number: "500",
      card1_title: "Luxury Resort",
      card2_title: "Luxury Resort",
      card3_title: "Luxury Resort",
      card4_title: "Luxury Resort",
      card5_title: "Luxury Resort",
    heading : "How Siyahatna helps?",
    description : "Everything you need to plan your trip in one place",
    title_index: "Pick Destination",
    description_index: "Choose from 12+ popular tourist attractions.",
    title_2: "Book Accommodation",
    description_2: "Select hotels & resorts at affordable rates.",
    title_3: "Plan Budget",
    description_3: "Use built-in budget calculator in multiple currencies.",
    title_4: "Create Itinerary",
      description_4: "Plan your itinerary with free online planner.",
    
    wow_btn_aria: "Start planning your trip",

     app_title: "Get the Siyahatna app",
    app_quote: "The best way to organize your travel itinerary within Saudi Arabia using your mobile.",
    app_download_title: "Download Apps",
    app_download_text: "Get the latest version of our app for Android & iOS.",
    google_play_alt: "Download on Google Play",
    app_store_alt: "Download on the App Store",
    app_screen1_alt: "Siyahatna app main screen",
    app_screen2_alt: "Siyahatna app booking screen",

    app_title: "Get the Siyahatna app",
    app_quote: "The best way to organize your travel itinerary within Saudi Arabia using your mobile.",
    app_download_title: "Download Apps",
    app_download_text: "Get the latest version of our app for Android & iOS.",
    google_play_alt: "Download on Google Play",
    app_store_alt: "Download on the App Store",
    app_screen1_alt: "Siyahatna app main screen",
    app_screen2_alt: "Siyahatna app booking screen",
     // restaurant
     // Hero
     hero_title: "Discover and Book the Best Restaurants & Café",
     hero_search_ph: "Restaurant or café name",
    hero_search_btn: "Search",
   
  jeddah: "Jeddah",
  riyadh: "Riyadh",
  dammam: "Dammam",
  mecca: "Mecca",
  medina: "Medina",
  khobar: "Khobar",
  abha: "Abha",
  tabuk: "Tabuk",
  alula: "AlUla",
  najran: "Najran",
  jazan: "Jazan",

      // Categories section
      cat_title: "Browse by Category",
      cat_restaurants: "Restaurants",
      cat_cafe: "Cafe",
      //spcail offers
      deals_header: "Browse By Deals & Special Offers",
      deals_view_all: "See Full List",
      deal_cta: "RESERVE NOW",
      deal_address: "King Abd Al-Aziz Road",

      // pick up 
      plate_title: "Pick up your plate",
      plate_italian: "Italian Food",
      plate_khaleeji: "Khaleeji Food",
      plate_pizza: "Pizza",
      plate_indian: "Indian Food",
      plate_egyptian: "Egyptian Food",
      plate_korean: "Korean Food",

      // how does it work
      how_title: "How does it work?",
      how_card1_title: "Exclusive benefits",
      how_card1_desc: "Enjoy exclusive offers at a wide range of restaurants and cafes, along with many perks through our loyalty program.",
      how_card2_title: "Smart navigation",
      how_card2_desc: "Find places nearby quickly with clear directions and time-saving suggestions.",
      how_card3_title: "Reviews",
      how_card3_desc: "Trusted recommendations and reviews from a vibrant community.",
      how_card4_title: "Easy Reservation",
      how_card4_desc: "Fast, free, and accessible anytime, anywhere.",
  

      // all restaurants 
    hero_title_before_brand: "Get over 1000 offers through the",
    hero_title_after_brand: "app.",
    hero_desc_1: "Discover exclusive restaurant deals, enjoy up to",
    hero_discount: "50% OFF",
    hero_desc_2: "on your favorite meals, and book instantly through the app.",

    hero_google_alt: "Get it on Google Play",
    hero_apple_alt: "Download on the App Store",
    hero_phone1_alt: "App preview – phone 1",
    hero_phone2_alt: "App preview – phone 2",
    hero_offer_alt: "Promotional offer",

    results_title: "Browse more than 3000 Restaurants",
    rest_name_salt_grill: "Salt & Grill",
    card_address: "King Abdul Aziz Rd, Riyadh",
    tag_brunch: "Great for brunch",
    tag_romantic: "Romantic",
    book_now: "Book now",


      
    btn_see_photos: "📷 See All Photos",
    btn_see_photos_aria: "See all photos of this place",

    hero_title_before_brand: "Get over 1000 offers through the",
    hero_title_after_brand: "app.",
    hero_desc_1: "Discover exclusive restaurant deals, enjoy up to",
    hero_discount: "50% OFF",
    hero_desc_2: "on your favorite meals, and book instantly through the app.",

    hero_google_alt: "Get it on Google Play",
    hero_apple_alt: "Download on the App Store",
    hero_phone1_alt: "App preview – phone 1",
    hero_phone2_alt: "App preview – phone 2",
    hero_offer_alt: "Promotional offer",

    results_title: "Browse more than 3000 Restaurants",
    see_all: "See all",
    filter_stars: "Filter by Star Rating",

    ready_to_travel: "Ready to Travel",
    ready_to_travel_desc: "Plan your trip, pick restaurants & book with one tap.",
    start_planning: "Start Planning",

    also_search_for: "Also search for:",
    hotel: "Hotel",
    supermarkets: "Supermarkets",
    cafe: "Cafe: ",
    parks: "Parks",

    rest_name_salt_grill: "Salt & Grill",
    card_address: "King Abdul Aziz Rd, Riyadh",
    tag_brunch: "Great for brunch",
    tag_romantic: "Romantic",
    book_now: "Book now",

    prev: "Previous",
    next: "Next",

     
// restaurant details
  place_name: "Espanda",
place_type: "Café Restaurant",
action_share: "Share",
action_save: "Save",
action_share_aria: "Share this place",
action_save_aria: "Save this place",
see_all_photos: "See all photos",

 
tab_overview: "Overview",
      tab_gallery: "Gallery",
      tab_menu: "Menu",
      tab_offers: "Offers",
      fav_add: "Add to favorites",

      about_titlee: "About this restaurant",
      about_intro: "From tasty snacks to a la carte...",

      pill_brunch: "Great for brunch",
      pill_charming: "Charming",
      pill_romantic: "Romantic",
      pill_tables: "Number of tables: 25",

      highlights_title: "Highlights",
      high_1: "Cozy ambience with indoor & outdoor seating",
      high_2: "Fresh bakery corner and specialty coffee",
      high_3: "Family-friendly area and quick bites menu",

      gallery_titleee: "Food Gallery",
      gallery_subtitleee: "Click a dish to view details",

      tag_pasta: "Pasta",
      tag_salad: "Salad",
      tag_burger: "Burger",
      tag_sushi: "Sushi",

      alt_pasta: "Pasta Arrabiata",
      alt_salad: "Healthy Salad",
      alt_burger: "Cheese Burger",
      alt_sushi: "Sushi Platter",

      open_pasta: "Open Pasta Arrabiata",
      open_salad: "Open Crunchy Garden Salad",
      open_burger: "Open Smash Cheese Burger",
      open_sushi: "Open Signature Sushi Platter",

      close: "Close (Esc)",
      prev: "Previous (←)",
      next: "Next (→)",

gallery_title: "Gallery",
see_all_photos: "See all photos",

sidebar_title: "Select how to dine",
sidebar_dinein: "Dine-in",
sidebar_takeaway: "Takeaway",
sidebar_delivery: "Delivery",
sidebar_pickup: "Car pick-up",

reserve_title: "Make Reservation",
reserve_people: "Number of People",
reserve_date: "Date",
reserve_time: "Time",
reserve_booked: "Booked <span class='font-medium'>4</span> times today",

opt_1_person: "1 Person",
opt_2_people: "2 People",
opt_3_people: "3 People",
opt_4_people: "4 People",
opt_5_people: "5 People",
opt_6_people: "6 People",
opt_7_people: "7 People",
opt_8_people: "8 People",

address: "King Fahd Road, Saudi Arabia",
book_now: "Book Now",

menu_section_title: "Our Special Menu",
menu_section_subtitle: "Taste our best dishes with special prices",
cat_all: "All",
  cat_beef: "Beef",
  cat_chicken: "Chicken",
  cat_pasta: "Pasta",
  cat_desserts: "Desserts",
  cat_drinks: "Drinks",
menu_dish1: "Campo Steak",
menu_dish1_alt: "Campo Steak dish",
menu_dish1_price_value: "7.90",
menu_dish1_old_value: "12.90",
menu_dish1_link_aria: "Open details for Campo Steak",
currency_icon_alt: "Saudi Riyal currency",

offers_title: "Our Special Offers",
offers_subtitle: "Don’t miss our limited-time deals",

offer1_title: "Quattro Pasta",
offer1_desc: "Lorem ipsum dolor sit amet.",
offer1_oldprice: "25.00",
offer1_newprice: "18.00",

offer2_title: "Vegetables Pasta",
offer2_desc: "Fresh veggies with creamy sauce.",
offer2_oldprice: "22.00",
offer2_newprice: "15.00",

offer3_title: "Gluten-Free Pasta",
offer3_desc: "Light & tasty — gluten-free.",
offer3_oldprice: "24.00",
offer3_newprice: "16.00",

offer4_title: "Quattro Pasta",
offer4_desc: "Lorem ipsum dolor sit amet.",
offer4_oldprice: "25.00",
offer4_newprice: "18.00",


cat_breakfast: "Breakfast",
    cat_breakfast_time: "8:00 AM to 10:00 AM",
    cat_lunch: "Lunch",
    cat_lunch_time: "12:00 PM to 3:00 PM",
    cat_dinner: "Dinner",
    cat_dinner_time: "6:00 PM to 11:00 PM",
    cat_drinks: "Drinks",
    cat_drinks_time: "All Day",
    cat_dessert: "Dessert",
    cat_dessert_time: "All Day",

     contact_address_title: "ADDRESS",
    contact_address_text: "King Fahad Street, Jeddah",
    contact_phone: "+9661234567",
    contact_email: "Support@gmail.com",
    contact_hours_title: "WORKING HOURS",
    contact_hours_weekdays: "8:00 AM to 1:00 AM on weekdays",
    contact_hours_weekends: "11:00 PM to 1:00 AM on weekends",
    contact_follow_title: "FOLLOW US",
     // dishdetails
    pd_title: "Dish details",
    pd_img_alt: "Dish image",
    pd_name: "Specially licensed light pineapple",
    pd_price_now: "20",
    pd_price_old: "24",
    pdA_tab_desc: "Description",
    pdA_tab_ing: "Ingredients",
    pdA_tab_nut: "Nutrition",
    pdA_tab_rev: "Reviews",
    pd_desc: "Tender grilled steak with herb butter, mixed greens, and our house sauce.",
    pdA_ready: "Ready in:",
    pdA_ready_val: "15–20 min",
    pdA_serves: "Serves:",
    pdA_serves_val: "1 person",
    pd_ing1: "Beef sirloin",
    pd_ing2: "Butter & garlic",
    pd_ing3: "Herbs & pepper",
    pd_ing4: "Mixed greens",
    pd_allergens_title: "Allergens:",
    pd_allergens: "Dairy, gluten.",
    pd_kcal: "420", pd_kcal_unit: "kcal",
    pd_protein: "28g", pd_protein_unit: "Protein",
    pd_fat: "18g", pd_fat_unit: "Fat",
    pd_size: "Size",
    pd_size_s: "S", pd_size_m: "M", pd_size_l: "L",
    pd_extras: "Extras",
    pd_extra1: "Extra sauce", pd_extra2: "Extra cheese", pd_extra3: "Garlic bread",
    pd_qty: "Quantity:",
    btn_add_cart : "Add to Cart",
     msg_add_success : "✅ Added Successfully",


    // hotel 1
    hero_img_alt: "Saudi Arabia Skyline",
    hero_hotels_title: "Search across 50,000+ hotels around Saudi Arabia",
  search_city: "Search city",
  check_in: "Check in",
  check_out: "Check out",
  rooms_1: "1 Adult - 1 Room",
  rooms_2: "2 Adults - 2 Rooms",
  rooms_3: "Family Suite",
  search_btn: "Search Hotels",
    features_title: "How to Book Hotels on Siyahatna?",
    features_subtitle: "Follow these simple steps to find and book your perfect stay.",

    features_icon_search: "Search Icon",
    features_icon_compare: "Compare Icon",
    features_icon_book: "Book Icon",

    features_step1_title: "Find a hotel",
    features_step1_desc: "Search for a hotel room that matches your preferences, using filters for price, customer reviews, popularity, and star rating.",

    features_step2_title: "Compare prices",
    features_step2_desc: "Find the best deal by comparing the selected hotel room’s prices across multiple choices in one spot.",

    features_step3_title: "Book your price",
    features_step3_desc: "Reserve your preferred hotel room at the best price online — fast and easy!",

    hotels_top_destinations: "Hotels at Top Destinations",
    city_jeddah: "Jeddah",
    city_riyadh: "Riyadh",
    city_makkah: "Makkah",
    city_taif: "Taif",
    city_dammam: "Dammam",
    city_jazan: "Jazan",

    hotels_other_destinations: "Hotels at Other Popular Destinations",
    hotels_top_attractions: "Hotels Near Top Attractions",
    city_khobar: "Khobar",
    city_dahran: "Dahran",
    city_abha: "Abha",
    city_tabuk: "Tabuk",
    city_jizan: "Jizan",
    city_hail: "Hail",
    attr_haram: "Al Masjid Al Haram",
    attr_fountain: "King Fahd Fountain",
    attr_edge: "Edge of the World",
    attr_diriyah: "Diriyah",
    attr_corniche: "Jeddah Corniche",
    attr_elephant: "Elephant Rock",

   // hotel 2
    hotel_title: "Hotels in Jeddah",
    hotel_subtitle: "Discover the best deals & offers in Jeddah",

    offer_discount: "🔥 30% OFF",
    offer_riyadh: "Riyadh • 2 Nights • Free Breakfast",

    offer_rating: "⭐ 4.8",
    offer_jeddah: "Jeddah • Family Suite from <b>299</b> SAR",

    offer_flash: "⚡ Flash",
    offer_makkah: "Makkah • Pay Now & Save More",

    offer_coupon: "🎟️ Coupon",
    offer_coupon_text: "Use <b>STAY10</b> for Extra Discount",

    offer_summer: "🏝️ Summer",
    offer_khobar: "Khobar • Beach Resorts",

     city_label: "Select city",
    city_select: "Select city",
    city_jeddah: "Jeddah",
    city_riyadh: "Riyadh",
    city_makkah: "Makkah",
    city_taif: "Taif",
    city_dammam: "Dammam",
    city_khobar: "Khobar",
    city_abha: "Abha",
    city_tabuk: "Tabuk",
    city_jizan: "Jizan",
    city_hail: "Hail",

    checkin_label: "Check-in date",
    checkout_label: "Check-out date",
    checkin_ph: "mm/dd/yyyy",
    checkout_ph: "mm/dd/yyyy",

    rooms_label: "Rooms & guests",
    rooms_adults1: "Adults 1 Room",
    rooms_adults2: "Adults 2 Rooms",
    rooms_family: "Family Suite",

    btn_update_search: "Update Search",

    filter_sort: "Sort",
    filter_price_label: "Sort by price",
    filter_price: "Price",
    filter_price_low: "Low to High",
    filter_price_high: "High to Low",
    filter_star_label: "Filter by star",
    filter_star: "Star",
    filter_star_5: "★★★★★",
    filter_star_4: "★★★★☆",
    filter_star_3: "★★★☆☆",
    card_img_alt: "Hotel image",
    card_title: "Plaza Hotel",
    card_rating_val: "4.6",
    card_map_alt: "Map",
    card_map: "Map",
    card_reviews: "Customers Reviews",
    card_nearby: "Near by:",
    card_nearby_place: "King Fahed Street",
    card_amen_wifi: "Wifi",
    card_amen_dinner: "Dinner",
    card_amen_spa: "Spa",
    card_amen_pool: "Pool",
    card_amen_parking: "Parking",
    card_currency_alt: "SAR",
    card_price_old: "220",
    card_price_new: "199",
    card_per_night: "Per night",
    card_book_btn: "Book now",

    
    explore_title: "Explore these unique stays",
    explore_subtitle: "Showing deals for 5 Sep – 8 Sep",
    currency_alt: "SAR",

    stay1_img_alt: "Sahara Rum Glamping",
    stay1_badge: "25% OFF",
    stay1_rating: "Exceptional (5 reviews)",
    stay1_title: "Sahara Rum Glamping",
    stay1_price: "500",
    stay1_old_price: "700",
    stay1_note: "Include taxes & fees",

    stay2_img_alt: "Desert Camp",
    stay2_badge: "Hot",
    stay2_rating: "Excellent (12 reviews)",
    stay2_title: "Desert Camp",
    stay2_price: "420",
    stay2_old_price: "560",
    stay2_note: "Breakfast included",

    stay3_img_alt: "City Suites",
    stay3_badge: "Deal",
    stay3_rating: "Very good (30 reviews)",
    stay3_title: "City Suites",
    stay3_price: "350",
    stay3_old_price: "460",
    stay3_note: "Free cancellation",

    stay4_img_alt: "Oasis Resort",
    stay4_badge: "New",
    stay4_rating: "Great (18 reviews)",
    stay4_title: "Oasis Resort",
    stay4_price: "480",
    stay4_old_price: "620",
    stay4_note: "Include taxes & fees",


// hotel 3
see_all_link_text: "See All Hotels",
    arrow_alt: "Arrow",

    hotel_title: "Hilton Hotel",
btn_share: "Share",
btn_save: "Save",
share_alt: "Share",
save_alt: "Save",
gallery_main_alt: "Main photo",
gallery_thumb_alt: "Hotel photo",
 

tab_overview: "Overview",
    tab_about: "About",
    tab_prices: "Prices",
    tab_policies: "Policies",

    hotel_name: "Hilton Hotel",
    tag_brunch: "Great for brunch",
    tag_charming: "Charming",
    tag_romantic: "Romantic",
    overview_text:
      "This modern hotel offers spacious rooms, exceptional service, and a prime location close to major attractions. Guests can enjoy an outdoor pool, fitness center, and on-site dining.",
    see_reviews: "See 130 reviews",

    about_title: "About this Property",
    about_subtitle: "Aparthotel with Outdoor Pool, Near Dhahran Mall",

    feat_wifi: "Wi-Fi",          feat_wifi_alt: "Wi-Fi",
    feat_pool: "Pool",           feat_pool_alt: "Pool",
    feat_restaurant: "Restaurant", feat_restaurant_alt: "Restaurant",
    feat_gym: "Gym",             feat_gym_alt: "Gym",
    feat_frontdesk: "Front Desk",feat_frontdesk_alt: "Front Desk",
    feat_spa: "Spa",             feat_spa_alt: "Spa",

    area_title: "Explore the Area",
    area_address: "Eastern Ring Road, Riyadh 11614, Saudi Arabia",
    area_view_map: "View in a map",

    poi_city_walk: "City Walk",               poi_city_walk_time: "5 min by car",
    poi_red_sea_mall: "Red Sea Mall",         poi_red_sea_mall_time: "11 min by car",
    poi_kingdom_centre: "Kingdom Centre",     poi_kingdom_centre_time: "10 min by car",
    poi_king_mall: "King Mall",               poi_king_mall_time: "9 min by car",


    choose_unit_title: "Choose your Unit",

filters_where_label: "Where to?",
    filters_where_select_aria: "Select city",
    city_jeddah: "Jeddah",
    city_riyadh: "Riyadh",
    city_dammam: "Dammam",
    city_mecca: "Mecca",
    city_medina: "Medina",

    filters_dates_label: "Dates",
    filters_dates_input_aria: "Select date",

    filters_travellers_label: "Travellers",
    filters_travellers_select_aria: "Select travellers and rooms",
    travellers_opt_1: "1 Traveller, 1 Room",
    travellers_opt_2: "2 Travellers, 1 Room",
    travellers_opt_3: "2 Travellers, 2 Rooms",
    travellers_opt_4: "3 Travellers, 2 Rooms",

    unit_room_photo_alt: "Room photo",
    unit_feature_bed: "King bed",
    unit_feature_minibar: "Mini Bar & Coffee Machine",
    unit_feature_roomservice: "24-hour Room Service",
    unit_feature_safetybox: "Safety Deposit Box",
    unit_more_details: "More Details",
    unit_cancel_heading: "Cancellation Policy 🙂",
    unit_cancel_text: "Free cancellation until 24 hours before check-in.",
    unit_include_taxes: "Include taxes & fees",
    unit_reserve: "Reserve",
    currency_alt: "SAR",

    policies_title: "Policies",

    pol_mandatory_title: "Mandatory fees",
    pol_mandatory_desc:
      "You’ll be asked to pay the following charges at check-in or check-out. Fees may include applicable taxes:",
    pol_city_tax_prefix: "A tax is imposed by the city:",
    pol_city_tax_amount: "AED 10.00",
    pol_city_tax_suffix: "per accommodation, per night.",

    pol_optional_title: "Optional extras",
    pol_optional_prefix: "Housekeeping is offered; a fee of",
    pol_optional_amount: "AED 220.00",
    pol_optional_suffix: "per day may be charged based on policy.",

    pol_notes_title: "Notes",
    pol_note_1: "Property has outdoor spaces (balconies, patios, terraces) that may not be suitable for children.",
    pol_note_2: "Noise-free guestrooms cannot be guaranteed.",
    pol_note_3: "Carbon monoxide detector may not be present on the property.",
    pol_note_4: "Fire extinguisher available on site.",
    pol_note_5: "Host has indicated no on-site pets.",

    pol_services_title: "Services & housekeeping",
    pol_services_desc: "Daily front-desk service available. Housekeeping upon request. Luggage storage may be provided.",

    pol_payments_title: "Payments accepted",
    pol_payments_desc: "This property accepts Credit cards (Visa, Mastercard, American Express).",
    pol_payments_visa_alt: "Visa",
    pol_payments_mc_alt: "Mastercard",
    pol_payments_amex_alt: "American Express",

    pol_clean_title: "Cleaning & safety",
    pol_clean_desc: "The property follows cleaning and disinfection practices of Commitment to Clean (Marriott) or equivalent.",

    results_icon_alt: "Section icon",
    rest_img_alt: "Restaurant",

// hotel 4
    hotel_name: "Hilton",
    hotel_type: "Hotel",
    brand_logo_alt: "Brand logo",

     step1_title: "Step 1: Your Details",
    step2_title: "Step 2: Property Details",
    step3_title: "The Final Step: Booking",
    free_cancel_title: "Free cancellation until Tue, Aug 19",
    free_cancel_desc: "You can change or cancel this stay for a full refund if your plans change. Because flexibility matters.",
    first_name: "First Name",
 

    last_name: "Last Name",
    mobile_number: "Mobile Number",
    contact_hint: "We’ll use this number to contact you about your reservation.",
    property_highlights: "Property Highlights",
    included_room: "Included in your room:",
    special_requests: "Any special requests?",
    requests_desc: "Please include details of your special request and we’ll forward it to the property...",
     requests_placeholder: "Write your special requests here (optional)...",
    
    terms_booking: "Terms of Booking",
    terms_desc: "By clicking “Book”, you agree you have read and accept our",
    check_in: "Check-in",
    check_out: "Check-out",
    check_in:"Check-in", check_in_value:"Sun, August 24, 2025 (12:00 PM)" ,
    check_out_value: "Sun, August 25, 2025 (12:00 PM)",
    nights_rooms: "3 nights, 1 room",
    cancellation_policy: "Cancellation policy",
    price_total: "Total price",
    book_btn: "Book",

    sidebar_choice: "Your choice is perfect! Reserve it now before it’s gone.",
    sidebar_nights: "2 nights",
    sidebar_taxes: "Taxes and fees",
    sidebar_total: "Total price",
    sidebar_increase: "This price may increase if you book later.",
    sidebar_cancel_title: "Cancellation policy",
    sidebar_cancel_desc: "If you change or cancel this booking after 11:59, 19/08/2025 property’s local time (Gulf Standard Time), you won’t be refunded any of the payment. We’re unable to refund any payment for no-shows or early check out.",
    sidebar_terms: "Terms and Conditions",
    sidebar_privacy: "Privacy Policy",
    // parks 1
    cat_all: "All",
    cat_natural: "Natural Parks",
    cat_amusement: "Amusement Parks",
    cat_water: "Water Parks",
    price_all: "All",
    price_paid: "Paid",
    price_free: "Free",

     title_browse_parks: "Browse more than 3000 Parks",

   title_browse_parks: "Browse more than 3000 Parks",
    title_icon_alt: "Parks icon",
     
    fav_aria: "Add to favorites",
    card_img_alt: "Place photo",
    rating_4_aria: "4 out of 5",
    city_riyadh: "Riyadh",
    status_open: "Open",
    status_closed: "Closed",
    badge_free: "Free",
    badge_paid: "Paid",
    // parks 2
    gallery_title: "Park Highlights",
gallery_subtitle: "A quick look at the park moments",
view_details: "View details",

center_name: "Woosh Center",
    hide_details: "Hide details ✕",
    overview_title: "Overview",
    overview_text: "Try scuba diving for the first time and explore the magical underwater world of Jeddah. This 45-minute.",
    more_details_title: "More details",
    detail_item1: "Our services are suitable for all ages.",
    detail_item2: "We cater to both private and public events.",
    detail_item3: "Each experience is tailored to your specific needs.",
    experience_title: "Experience Schedules & Availability",
    experience_item1: "Woosh operates across various cities in Saudi Arabia.",
    experience_item2: "Bookings are available all week.",
    included_title: "What’s included",
    included_item1: "All scuba diving equipment: mask, wetsuit, fins, regulator, BCD, oxygen tank",
    included_item2: "Professional dive instructor",
    included_item3: "Boat trip to the dive site",
    prices_title: "Prices & Packages",
    prices_text: "We offer customized packages based on the type of event and requirements. Pricing depends on the scope and size of your event. Payment is made online via our secure system.",
    cancellation_title: "Cancellation policy",
    cancel_item1: "Free cancellation up to 48 hours before the ride",
    cancel_item2: "50% refund if cancelled between 24–48 hours",
    cancel_item3: "No refund if cancelled within 24 hours of departure",
    location_label: "Location:",
    get_directions: "Get Directions",
// supermarket 1
hero_bg_alt: "Hero background",
    hero_title: "Freshness Delivered to Your Doorstep!",
    city_icon_alt: "City",
    city_select_aria: "Select your city",
    city_placeholder: "Select your city",
    city_jeddah: "Jeddah",
    city_riyadh: "Riyadh",
    city_dammam: "Dammam",
    city_makkah: "Makkah",
    city_madinah: "Madinah",
    supermarket_icon_alt: "Supermarket",
    market_select_aria: "Search for your favorite supermarket",
    market_placeholder: "Search for your favorite supermarket",
    market_1: "Supermarket 1",
    market_2: "Supermarket 2",
    market_3: "Supermarket 3",
    market_4: "Supermarket 4",
    market_5: "Supermarket 5",
    search_btn: "Search",
    search_btn_aria: "Search",
    supermarket_icon_alt: "Supermarket",
    market_select_aria: "Search for your favorite supermarket",
    market_placeholder: "Search for your favorite supermarket",
    market_1: "Supermarket 1",
    market_2: "Supermarket 2",
    market_3: "Supermarket 3",
    market_4: "Supermarket 4",
    market_5: "Supermarket 5",
    search_btn: "Search",
    search_btn_aria: "Search",
    supermarkets_title: "Supermarkets in Jeddah",
    supermarket_item_1_label: "Hyper Market",
    supermarket_item_1_alt: "Supermarket 1 logo",
    supermarket_item_2_label: "Hyper Market",
    supermarket_item_2_alt: "Supermarket 2 logo",
    supermarket_item_3_label: "Hyper Market",
    supermarket_item_3_alt: "Supermarket 3 logo",
    supermarket_item_4_label: "Hyper Market",
    supermarket_item_4_alt: "Supermarket 4 logo",
    supermarket_item_5_label: "Hyper Market",
    supermarket_item_5_alt: "Supermarket 5 logo",
    offers_title: "Special Offers",
    offers_subtitle: "Discover the best supermarket deals available now",
     // supermarket 2
    categories_title: "Browse by Category",
    cat_fruits: "Fruits & vegetables",
    cat_fruits_alt: "Fruits & Vegetables",
    cat_meat: "Fresh meat & poultry",
    cat_meat_alt: "Fresh meat & poultry",
    cat_dairy: "Dairy & eggs",
    cat_dairy_alt: "Dairy & eggs",
    cat_herbs: "Herbs & spices",
    cat_herbs_alt: "Herbs & spices",
    cat_beverages: "Beverages",
    cat_beverages_alt: "Beverages",
    cat_cleaning: "Cleaning Essentials",
    cat_cleaning_alt: "Cleaning Essentials",
    cat_electronics: "Electronics",
    cat_electronics_alt: "Electronics",
    cat_fitness: "Fitness & Sport",
    cat_fitness_alt: "Fitness & Sport",
    back_btn: "Back",
    discount_title: "Discount",
    discount_subtitle: "of this week",
    view_all: "View All",

     
    discount_badge: "22% Off",
    wishlist_icon: "♡",
    product_img_alt: "Product Image",
    currency_alt: "SAR",
    add_to_cart: "Add to cart",
    add_to_cart_alt: "Add to cart",

     
    product_name_1: "Spirali Macaroni",
    product_price_1: "7.90",
    product_old_price_1: "12.9",
    product_discount_1: "40%",

    
    product_name_2: "Penne Pasta",
    product_price_2: "8.50",
    product_old_price_2: "13.5",
    product_discount_2: "37%",

     
    product_name_3: "Fusilli Pasta",
    product_price_3: "6.70",
    product_old_price_3: "10.5",
    product_discount_3: "36%",

    featured_title: "Featured",
    featured_subtitle: "Items",

    promo_text: "We’ll hand-pick your shop and bring it to your door.",
    promo_btn: "One day offer",
    promo_img_veg_alt: "Vegetables",
    promo_img_man_alt: "Man with Groceries",
    promo_img_tomato_alt: "Tomatoes",

     fresh_zone_title1: "Fresh",
      fresh_zone_title2: "Food",
      fresh_zone_title3: "Zone!",
      fresh_zone_card1: "Fresh Fruits",
      fresh_zone_card2: "Fresh Vegetables",
      fresh_zone_card3: "Dairy Products",
      fresh_zone_card4: "Meat & Poultry",

      // Alt text
      fresh_zone_card1_alt: "Fresh Fruits",
      fresh_zone_card2_alt: "Fresh Vegetables",
      fresh_zone_card3_alt: "Dairy Products",
      fresh_zone_card4_alt: "Meat & Poultry",

      // supermarket3
     brand: "Supermarket",
    brand_alt: "Supermarket logo",
    brand_slogan: "Slogan Here",
     our_location : "Our Location",

    search_placeholder: "Search for product",
    filter_btn: "Filter",
    search_btn: "Search",

    account: "Account",
    account_alt: "Account icon",
    wishlist: "Wishlist",
    wishlist_alt: "Wishlist icon",
    cart: "Cart",
    cart_alt: "Cart icon",

    nav_fruits: "Fruits",
    nav_vegetables: "Vegetables",
    nav_poultry: "Fresh poultry",
    nav_dairy: "Dairy & eggs",
    nav_herbs: "Herbs",
    nav_beverages: "Beverages",
    nav_cleaning: "Cleaning essentials",
    nav_electronics: "Electronics",
    nav_fitness: "Fitness & sport",
    nav_bakery: "Bakery",
    nav_snacks: "Snacks",
    nav_household: "Household",
    snacks_title: "Snacks",
    results_label: "Results",
    no_results: "No results",
     filter_by: "Filter by",
    search_label: "Search for product",
    search_placeholder: "Search...",
    by_price: "By price",
    price_from: "From",
    price_to: "To",
    currency_sar: "SAR",
    product_status: "Product status",
    status_sale: "On sale",
    status_stock: "In stock",
    status_best: "Best seller",
    category: "Category",
    cat_dairy: "Dairy & Eggs",
    cat_drinks: "Drinks",
    cat_meat: "Meat & Poultry",
    cat_frozen: "Frozen",
    cat_bakery: "Bakery",
    cat_cleaning: "Cleaning",
    store: "Store",
    store_1: "Store name 1",
    store_2: "Store name 2",
    store_3: "Store name 3",
    store_4: "Store name 4",
    store_5: "Store name 5",
    btn_apply: "Apply",
    btn_reset: "Reset",
    /* Cards */
    prod_spirali: "Spirali Macaroni",
    favorite_alt: "Favorite",
    product_img_alt: "Product Image",
    currency_alt: "Saudi Riyal",
    cart_alt: "Add to cart",
    discount_40: "40% OFF",
   // supermarket4
     offers_title: "Flash sales",
    offers_subtitle: "Discover the best supermarket deals available now",
  
     title_weekly_saving_full: "Weekly saving offers",
    /* Cards */
    prod_spirali: "Spirali Macaroni",
    favorite_alt: "Favorite",
    product_img_alt: "Product Image",
    currency_alt: "Saudi Riyal",
    cart_alt: "Add to cart",
    discount_40: "40% OFF",

    //supermarket5
    product_details_title: "The product details",
    product_img_alt: "Product image",
    product_title: "Specially licensed light pineapple",
    product_desc: "Our favorite jean meets our favorite decade. Made from premium non-stretch Japanese denim for a vintage-inspired look, the ’90s Cheeky Jean has an easy straight fit, an extra-high rise…",
    currency_icon_alt: "Currency icon",
    currency_sar: "SAR",

    details_title: "Details",
    details_category: "Category:",
    details_category_val: "Fresh Produce",
    details_tags: "Tags:",
    details_tags_val: "Seasonal, Fresh",
    details_brand: "Brand:",
    details_brand_val: "Brand 01",

    qty_label: "Quantity:",
    weight_label: "Weight (kg):",
    qty_minus_aria: "Decrease quantity",
    qty_input_aria: "Quantity input",
    qty_plus_aria: "Increase quantity",

    btn_add_to_cart: "Add to Cart",
    aria_add_to_cart: "Add this item to cart",

     related_label: "Related",
    products_label: "Products",

    product_img_alt: "Product image",
    currency_icon_alt: "Currency icon",
    label_off: "Off",

    prod_spirali: "Spirali Macaroni",
    discount_40: "40% OFF",
    cart_alt: "Add to cart",
    //supermarket6
    


    delivery_scheduled: "Scheduled Delivery ({count} items)",
    delivery_today: "Today",
    delivery_time: "7:00 PM",
    btn_change_slot: "Change Slot",
    btn_add_items: "Add Items",
    missing_title: "Missing Something?",
    missing_desc: "You can still add more items here.",
    btn_browse: "Browse",

    slot_title: "Choose delivery slot",
    slot_today: "Today",
    slot_tomorrow: "Tomorrow",
    btn_cancel: "Cancel",
    btn_confirm: "Confirm",

    product_lemon: "Lemon",
    product_lemon_alt: "Lemon",
    unit_1kg: "1 kg",
    cat_fresh_fruits: "Fresh Fruits & Vegetables",
    btn_dec: "−",
    btn_inc: "+",
    price_unit: "Unit",
    btn_remove: "Remove",

    product_potato: "Potatoes",
    product_potato_alt: "Potatoes",
    discount_23: "23% off",
    cat_vegetables: "Vegetables",

    product_cucumber: "Cucumber",
    product_cucumber_alt: "Cucumber",

    product_juice: "Strawberry Juice",
    product_juice_alt: "Strawberry Juice",
    unit_1l: "1 L",
    cat_drinks: "Drinks",

    order_summary: "Order Summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    taxes: "Taxes & fees",
    total: "Total",
    promo_placeholder: "Promo code",
    btn_apply: "Apply",
    btn_checkout: "Checkout",

    currency_code: "SAR",
       

      fresh_intro : "You’ll love these",
     fresh_title1 : "Fresh",
     fresh_title2 : "Top Seller",

     cat_fruits : "Fruits",
     cat_vegetables : "Vegetables",
    btn_view_all : "View all",

     badge_discount : "22% Off",
     badge_fresh : "Fresh",

     product_watermelon : "Watermelon",
     meta_watermelon : "≈ 700 g • Fresh",
    price_watermelon : "6.90",
    " aria-label:add_watermelon": "Add Watermelon to cart",

    product_tomato : "Tomato",
     meta_tomato : "1 kg • Organic",
     price_tomato : "3.20",
     "aria-label:add_tomato" : "Add Tomato to cart",

     product_egg : "Egg",
     meta_egg : "12 pcs • Grade A",
     price_egg : "8.90",
     "aria-label:add_egg" : "Add Egg to cart",

     related_intro : "Based on your recent selections",
     related_title1 : "Items",
     related_title2 : "Related To Your Cart",
     cat_fruits : "Fruits",
     cat_vegetables : "Vegetables",

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
    // service provider
      pricing_title: "Subscription Plans",
  pricing_subtitle: "Choose the term that fits your needs — deeper discounts for longer commitments.",

  plan_monthly: "Monthly",
  plan_quarterly: "Quarterly",
  plan_semiannual: "Semiannual",
  plan_annual: "Annual",

  plan_flexible: "Flexible",
  plan_save_10: "Save 10%",
  plan_save_15: "Save 15%",
  plan_save_25: "Best Value · Save 25%",

  plan_monthly_price: "mo",
  plan_quarterly_price: "3 mo",
  plan_semiannual_price: "6 mo",
  plan_annual_price: "12 mo",

  plan_cancel_anytime: "Cancel or upgrade anytime",
  plan_equiv_283: "Equivalent to 283 SAR/mo",
  plan_equiv_266: "Equivalent to 266 SAR/mo",
  plan_equiv_250: "Equivalent to 250 SAR/mo",

  feature_email_support: "Basic email support",
  feature_chat_support: "Email & chat support",
  feature_priority_chat: "Priority chat support",
  feature_24_7: "24/7 support",
  feature_account_manager: "Dedicated account manager",

  feature_monthly_reports: "Monthly reports",
  feature_bimonthly_reports: "Bi-monthly reports",
  feature_weekly_reports: "Weekly reports",

  feature_consultation: "Dedicated consultation",
  feature_advisory_call: "Advisory call",
  feature_monthly_call: "Monthly advisory call",
  feature_two_consultations: "Two free consultations",

  feature_onboarding: "Priority onboarding",

  badge_most_popular: "Most Popular",

  btn_contact: "Subscribe now",

// register

welcome_back: "Welcome back",
    welcome_subtext: "Sign in to your account to continue.",
    signup_title: "Sign up",
    signup_subtext: "Enter your details to continue",
    phone_label: "Phone Number",
    phone_placeholder: "+20 10 1234 5678",
    password_label: "Password",
    password_placeholder: "••••••••",
    signin_button: "Sign up",
    already_have_account: "Already have an account?",
    login_link: "Log in",
    confirm_password_label: "Repeat Password",


      header_title: "Terms & Privacy",
    header_subtitle: "Learn how we protect your data and ensure a safe travel experience 🌍",

    terms_tab: "Terms & Conditions",
    privacy_tab: "Privacy Policy",






contact_title: "Contact Us",
    contact_email_title: "Email",
    contact_email_general: "General",
    contact_email_support: "Support",
    contact_phone_title: "Phone",
    contact_phone_sales: "Sales",
    contact_phone_office: "Office",
    contact_location_title: "Location",
    contact_location_value: "Cairo, Egypt",
    contact_form_name_label: "Name",
    contact_form_name_ph: "Your name",
    contact_form_email_label: "Email",
    contact_form_email_ph: "you@example.com",
    contact_form_msg_label: "Message",
    contact_form_msg_ph: "Write your message...",
    contact_form_submit: "Send Message",


  // account
    avatar_alt: "User profile photo",
    change_photo: "Change profile photo",
    header_title: "My Account",
    header_subtitle: "Manage your profile, bookings, and preferences",
    action_start_planning: "Start Planning",

    tab_overview: "Overview",
    tab_bookings: "Bookings",
    tab_favorites: "Favorites",
    tab_settings: "Settings",

    favorites_title: "Your Favorites",
    favorites_remove: "Remove",
    favorites_card_hotel: "Plaza Hotel",
    favorites_card_park: "Nile Park",
    favorites_card_restaurant: "Lara Restaurant",
    favorites_view: "View",

    settings_personal: "Personal Information",
    settings_security: "Security",
    settings_addresses: "Addresses",
    settings_payments: "Payment Methods",

    change_password: "Change Password",
    logout: "Log out",
    add_payment: "Add New Card",
    address_home: "Home",

    
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email",
      phone: "Phone",
      save: "Save Changes",
      reset: "Reset",
    

     
      change_password: "Change Password",
      current_password: "Current password",
      new_password: "New password",
      confirm_password: "Confirm new password",
      cancel: "Cancel",
      save: "Save",
 
      settings_addresses:"Addresses",
    address_home: "Home",
    address_edit: "Edit",
    address_remove: "Remove",

    settings_payments: "Payment Methods",
    payment_card_number: "**** **** **** 5123",
    payment_card_expiry: "Exp 02/27",
    payment_remove: "Remove",
    add_payment: "Add New Card",


     address_add: "Add New Address",
    address_edit: "Edit Address",
    cancel: "Cancel",
    save: "Save",
  
  
    address_label: "Label",
    address_line1: "Address Line 1",
    address_line2: "Address Line 2 (optional)",
    city: "City",
    country: "Country",
    zip: "ZIP / Postal Code",

    
    

    





    // ===== Terms Section =====
    terms_intro_title: "Introduction",
    terms_intro_text:
      "Welcome to Siyahatna! By using our website, you agree to follow our terms and conditions designed to ensure a fair and enjoyable experience.",

    terms_use_title: "Use of Our Services",
    terms_use_text:
      "You agree to use our services responsibly and for lawful travel purposes only. Misuse or fraudulent activity may lead to account suspension.",

    terms_ip_title: "Intellectual Property",
    terms_ip_text:
      "All website materials, including content, images, and branding, are protected and belong to Siyahatna.",

    terms_liability_title: "Limitation of Liability",
    terms_liability_text:
      "Siyahatna is not responsible for indirect or accidental damages from your use of our services.",

    // ===== Privacy Section =====
    privacy_data_title: "Data Collection",
    privacy_data_text:
      "We collect basic personal details such as your name, email, and preferences to enhance your travel experience.",

    privacy_usage_title: "Data Usage",
    privacy_usage_text:
      "Your information is used to personalize offers, process bookings, and improve our services. We do not sell your data.",

    privacy_cookie_title: "Cookies",
    privacy_cookie_text:
      "We use cookies to provide a better browsing experience. You may disable them anytime through your browser settings.",

    privacy_security_title: "Security",
    privacy_security_text:
      "We use strong encryption and regular security checks to ensure your personal data is safe from unauthorized access.",
    //login
title: "Login",
      subtitle: "Enter your credentials to continue",
      identifier_label: "Phone or Email",
      identifier_placeholder: "7701234567 or you@example.com",
      password_label: "Password",
      password_placeholder: "••••••••",
      remember_me: "Remember me",
      forgot_password: "Forgot?",
      agree_text: "I agree to the",
      terms_link: "Terms & Conditions",
      login_button: "Login",
      no_account: "Don't have an account?",
      register_link: "Register",

       email_label: "Email Address",
 
    results_icon_alt: "Section icon",
    rest_img_alt: "Restaurant",

    footer_categories: "All Categories",
  footer_restaurants: "Restaurants",
  footer_cafe: "Cafe",
  footer_supermarkets: "Supermarket",
  footer_hotels: "Hotels",
    footer_parks: "Parks",

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

   
  btn_discover_more: "Discover More",




 "about.heading": "About Us",
      "about.subheading": "Your Journey Begins Here ✈️",
      "about.tagline": "Explore, Dream, and Discover the Beauty of the World 🌍",
      "about.body": `At <span class="font-semibold text-teal-600">Siyahatna</span>, we bring your wanderlust to life!
Whether you're craving a sun-kissed beach, a thrilling mountain trek, or a peaceful escape into nature —
we craft journeys that leave footprints in your heart and stories worth sharing.
Let’s make your next adventure truly unforgettable!`,
      "about.cta": "Discover More",
      "about.imageAlt": "Travel illustration"
    




 
      },

 


     ar: {
      nav_home: "الرئيسية",
      nav_categories: " البرنامج السياحي" ,
      nav_about: "من نحن",
      nav_deals: "اتصل بنا",
      nav_register: "تسجيل",
      nav_login: "تسجيل الدخول",
      lang_btn: "اللغة",
      brand: "سياحتنا",
    brand_alt: "شعار سياحتنا",
    brand_aria: "سياحتنا",
     // star sidebar
    sb_filter_title: "فلترة حسب التقييم بالنجوم",
    sb_cta_title: "جاهز للسفر",
    sb_cta_desc: "خطط رحلتك، واختر المطاعم واحجز بضغطة واحدة.",
    sb_cta_btn: "ابدأ التخطيط",
    sb_also_search: "ابحث أيضاً عن:",
    sb_link_restaurant: "مطاعم",
    sb_link_cafe: "مقاهى",
    sb_link_supermarket: "سوبرماركت",
    parks: "حدائق",
     hotel: "فنادق",
    // next prev general      
    pg_prev: "السابق",
    pg_next: "التالي",
    pg_ellipsis: "...",
   // payment
    checkout_title: "إتمام الشراء",
    checkout_subtitle: "أكمل طلبك واختر طريقة الدفع المفضلة لديك.",
    checkout_contact_title: "معلومات التواصل والفوترة",
    checkout_fullname_label: "الاسم الكامل",
    checkout_fullname_ph: "محمد أحمد",
    checkout_phone_label: "رقم الجوال",
    checkout_phone_ph: "+966 5x xxx xxxx",
    checkout_city_label: "المدينة",
    checkout_city_ph: "الرياض",
    checkout_email_label: "البريد الإلكتروني",
    checkout_email_ph: "you@example.com",
    checkout_address_label: "عنوان الفوترة",
    checkout_address_ph: "الشارع، المبنى، الشقة",

pay_title: "طريقة الدفع",
    pay_online: "الدفع الإلكتروني",
    pay_online_desc: "فيزا، ماستركارد، أبل باي، جوجل باي",
    pay_bank: "التحويل البنكي",
    pay_bank_desc: "تحويل إلى الحساب البنكي وإرفاق إيصال",
    pay_cash: "الدفع عند الاستلام",
    pay_cash_desc: "قد تُطبق رسوم إضافية عند الدفع عند الاستلام",

    panel_online_title: "الدفع الإلكتروني",
    panel_bank_title: "التحويل البنكي",
    panel_cash_title: "الدفع عند الاستلام",
    panel_cash_desc: "يرجى تجهيز المبلغ كاملًا. قد تُطبق رسوم إضافية.",

    card_visa: "فيزا",
    card_mastercard: "ماستركارد",
    card_apple: "أبل باي",
    card_google: "جوجل باي",
    card_name: "اسم حامل البطاقة",
    card_name_ph: "محمد أحمد",
    card_number: "رقم البطاقة",
    card_number_ph: "XXXX XXXX XXXX XXXX",
    card_secure_note: "نحن لا نخزن رقم بطاقتك كاملًا.",
    card_exp: "تاريخ الانتهاء",
    card_exp_ph: "MM/YY",
    card_cvv: "رمز CVV",
    card_cvv_ph: "•••",
    card_save: "احفظ البطاقة لعمليات دفع أسرع لاحقًا",

    bank_holder: "اسم صاحب الحساب",
    bank_name: "اسم البنك",
    bank_swift: "SWIFT / BIC",
    bank_iban: "رقم IBAN",
    bank_upload: "رفع الإيصال",
    bank_upload_hint: "مسموح: JPG, PNG, PDF.",

    cash_date: "تاريخ التسليم",
    cash_time: "الوقت",
    cash_any: "أي وقت",
    cash_morning: "9:00–12:00",
    cash_afternoon: "12:00–16:00",
    cash_evening: "16:00–20:00",

    terms: "أوافق على الشروط والأحكام وسياسة الاسترجاع.",
    btn_pay: "ادفع الآن",
    btn_hint: "سيتم خصم المبلغ من بطاقتك بأمان.",

    summary_title: "ملخص الطلب",
    item_a: "المنتج أ",
    item_qty1: "الكمية 1",
    item_b: "المنتج ب",
    item_qty2: "الكمية 2",
    summary_subtotal: "الإجمالي الفرعي",
    summary_shipping: "الشحن",
    summary_discount: "الخصم",
    summary_total: "الإجمالي",
    coupon_ph: "كود الخصم",
    coupon_apply: "تطبيق",
    summary_note: "مثال فقط — قم بربطه بمنطق السلة الخاص بك.",
    help_title: "تحتاج مساعدة؟",
    help_text: "تواصل معنا عبر واتساب أو البريد الإلكتروني support@example.com.",
  
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
  footer_apple_alt: "حمّل من App Store",


    // plam
    "plan2.badge": "خطط رحلتك بسهولة",
      "plan2.title": "اختر الطريقة المناسبة لبناء خطتك",
      "plan2.subtitle": "احصل على خطة سريعة ومحسّنة بالذكاء الاصطناعي — أو اصنع كل تفصيلة بنفسك.",

      "plan2.manual.aria": "تخطيط يدوي",
      "plan2.manual.title": "تخطيط يدوي",
      "plan2.manual.desc": "ابنِ رحلتك خطوة بخطوة: الأيام، المدن، الأنشطة، والمواعيد — التحكم الكامل بيدك.",
      "plan2.manual.f1": "تحكم دقيق وضبط متقدم",
      "plan2.manual.f2": "مناسب لقوائم الأماكن المحددة مسبقًا",
      "plan2.manual.f3": "مسودة تعمل دون اتصال بسهولة",
      "plan2.manual.cta": "ابدأ يدويًا",

      "plan2.smart.aria": "تخطيط ذكي (ذكاء اصطناعي)",
      "plan2.smart.badge": "موصى به",
      "plan2.smart.title": "تخطيط ذكي (ذكاء اصطناعي)",
      "plan2.smart.desc": "احصل فورًا على خطة محسّنة حسب تفضيلاتك ووقتك وسرعة تنقلك.",
      "plan2.smart.f1": "اقتراحات مخصّصة لاهتماماتك",
      "plan2.smart.f2": "مسارات محسّنة وتواقيت واقعية",
      "plan2.smart.f3": "تعديلات بنقرة واحدة وإعادة تخطيط سريعة",
      "plan2.smart.cta": "ابدأ باذكاء الاصطناعي",
     // INDEX
     hero_title1: "اكتشف السعودية",
    hero_title2: "مع برنامجك السياحي المخصّص",
    hero_desc: "خطط رحلتك، واستكشف أبرز المعالم، واحجز كل شيء في مكان واحد.",
    hero_btn: "ابدأ الآن",
    hero_img_alt1: "خلفية طبيعية لمناظر في السعودية",
    hero_img_alt2: "مونتاج للثقافة والطبيعة في السعودية",

    promo_title: "اكتشف أنشطة مميزة لكل اهتماماتك",
    promo_desc: "تصفح 400,000 تجربة واحجز معنا بسهولة",
    promo_btn: "احجز الآن",
    promo_img_alt: "فندق",

    cat_title: "تصفح حسب الفئة",
    cat_prev: "السابق",
    cat_next: "التالي",
    cat_restaurants: "مطاعم",
    cat_restaurants_alt: "شعار المطاعم",
    cat_cafes: "مقاهي",
    cat_hotels : "فنادق",
    cat_cafes_alt: "شعار المقاهي",
    cat_supermarkets: "سوبرماركت",
    cat_supermarkets_alt: "شعار السوبرماركت",
    cat_parks: "حدائق",
    cat_parks_alt: "شعار الحدائق",

    deals_title: "عروض حصرية أقل من {{price}}",
      currency_alt: "ريـال سعودي",
      prev: "السابق",
      next: "التالي",
      deal_text: "عرض لفترة محدودة!",
      book_now: "احجز الآن",
      price_number: "٥٠٠",
      card1_title: "منتجع فاخر",
      card2_title: "منتجع فاخر",
      card3_title: "منتجع فاخر",
      card4_title: "منتجع فاخر",
      card5_title: "منتجع فاخر",

    heading : "كيف تساعدك سياحتنا؟ ",
    description : "كل ما تحتاجه لتخطيط رحلتك في مكان واحد",
    title_index: "اختر الوجهة",
    description_index: "اختر من بين أكثر من 12 وجهة سياحية مشهورة.",
    title_2: "احجز الإقامة",
    description_2: "اختر الفنادق والمنتجعات بأسعار مناسبة",
    title_3: "خطط الميزانية",
    description_3: "استخدم حاسبة الميزانية المدمجة بعدة عملات",
    title_4: "أنشئ جدول الرحلة",
      description_4: "خطط جدول رحلتك باستخدام المخطط المجاني عبر الإنترنت",
    
    wow_btn_aria: " ابدأ تخطيط رحلتك",
    app_title: "حمّل تطبيق سياحتنا",
    app_quote: "أفضل وسيلة لتنظيم برنامجك السياحي داخل السعودية عبر جوالك.",
    app_download_title: "تحميل التطبيقات",
    app_download_text: "احصل على أحدث نسخة من تطبيقنا لأجهزة أندرويد و iOS.",
    google_play_alt: "تحميل من متجر جوجل بلاي",
    app_store_alt: "تحميل من متجر آب ستور",
    app_screen1_alt: "الشاشة الرئيسية لتطبيق سياحتنا",
    app_screen2_alt: "شاشة الحجز في تطبيق سياحتنا",
 

     // restaurant
    hero_title: "اكتشف واحجز أفضل المطاعم والمقاهي",
hero_search_ph: "اسم المطعم أو المقهى",
hero_search_btn: "بحث",
 
  jeddah: "جدة",
  riyadh: "الرياض",
  dammam: "الدمام",
  mecca: "مكة",
  medina: "المدينة",
  khobar: "الخبر",
  abha: "أبها",
  tabuk: "تبوك",
  alula: "العلا",
  najran: "نجران",
  jazan: "جازان",

      // Categories section
      cat_title: "تصفح حسب الفئة",
      cat_restaurants: "مطاعم",
      cat_cafe: "مقاهي",
      
      //spcail offers
      deals_header: "تصفح العروض والخصومات الخاصة",
      deals_view_all: "عرض القائمة كاملة",
      deal_cta: "احجز الآن",
      deal_address: "طريق الملك عبدالعزيز",

      // pick up 
      plate_title: "اختر طبقك",
      plate_italian: "مأكولات إيطالية",
      plate_khaleeji: "مأكولات خليجية",
      plate_pizza: "بيتزا",
      plate_indian: "مأكولات هندية",
      plate_egyptian: "مأكولات مصرية",
      plate_korean: "مأكولات كورية",
       
      // how does it work
      how_title: "كيف يعمل النظام؟",
      how_card1_title: "مزايا حصرية",
      how_card1_desc: "استمتع بعروض حصرية لدى مجموعة واسعة من المطاعم والمقاهي، مع مزايا متعددة عبر برنامج الولاء.",
      how_card2_title: "تصفّح ذكي",
      how_card2_desc: "اعثر على الأماكن القريبة بسرعة مع إرشادات واضحة واقتراحات توفر الوقت.",
      how_card3_title: "مراجعات",
      how_card3_desc: "توصيات موثوقة ومراجعات من مجتمع نشط.",
      how_card4_title: "حجز سهل",
      how_card4_desc: "سريع ومجاني ومتاح في أي وقت ومن أي مكان.",

    // all restaurants
    hero_title_before_brand: "احصل على اكثر من ١٠٠٠ عرض عبر التطبيق",
    hero_title_after_brand: " .", // نقطة بعد الكلمة
    hero_desc_1: "اكتشف عروض المطاعم الحصرية وتمتع بخصومات تصل إلى",
    hero_discount: "خصم حتى 50%",
    hero_desc_2: "على وجباتك المفضلة واحجز فورًا عبر التطبيق.",

    hero_google_alt: "متاح على متجر Google Play",
    hero_apple_alt: "حمّل من App Store",
    hero_phone1_alt: "معاينة التطبيق – الهاتف 1",
    hero_phone2_alt: "معاينة التطبيق – الهاتف 2",
    hero_offer_alt: "عرض ترويجي",

    results_title: "تصفح اكثر من ٣٠٠٠ مطعم",
    rest_name_salt_grill: "ملح وشواء",
    card_address: "طريق الملك عبدالعزيز، الرياض",
    tag_brunch: "رائع للبرانش",
    tag_romantic: "رومانسي",
    book_now: "احجز الآن",

    // restaurant details
     btn_see_photos: "📷 عرض جميع الصور",
  place_name: "اسباندا",  
place_type: "كافيه ومطعم",  

 tab_overview: "نظرة عامة",
    tab_gallery: "المعرض",
    tab_menu: "القائمة",
    tab_offers: "العروض",
    tab_reviews: "المراجعات",

action_share: "مشاركة",
action_save: "حفظ",
action_share_aria: "مشاركة هذا المكان",
action_save_aria: "حفظ هذا المكان",

icon_share_alt: "أيقونة المشاركة",
icon_save_alt: "أيقونة الحفظ",

hero_main_alt: "الصورة الرئيسية للمطعم",
see_all_photos: "عرض كل الصور",

cafe_name: "إسباندا",
place_type: "كافيه ومطعم",

 
tab_overview: "نظرة عامة",
      tab_gallery: "المعرض",
      tab_menu: "القائمة",
      tab_offers: "العروض",
      fav_add: "أضِف إلى المفضلة",

      about_titlee: "حول المطعم",
      about_intro: "من الوجبات الخفيفة إلى قائمة الأطباق الخاصة...",

      pill_brunch: "مناسب للإفطار المتأخر",
      pill_charming: "ساحر",
      pill_romantic: "رومانسي",
      pill_tables: "عدد الطاولات: 25",

      highlights_title: "أبرز المزايا",
      high_1: "أجواء دافئة مع جلسات داخلية وخارجية",
      high_2: "ركن مخبوزات طازجة وقهوة مختصة",
      high_3: "مناسب للعائلات وقائمة وجبات سريعة",

      gallery_titleee: "معرض الأطباق",
      gallery_subtitleee: "اضغط على الطبق لعرض التفاصيل",

      tag_pasta: "باستا",
      tag_salad: "سلطة",
      tag_burger: "برجر",
      tag_sushi: "سوشي",

      alt_pasta: "باستا أرابياتا",
      alt_salad: "سلطة صحية",
      alt_burger: "برجر بالجبن",
      alt_sushi: "طبق سوشي",

      open_pasta: "افتح باستا أرابياتا",
      open_salad: "افتح سلطة الحدائق المقرمشة",
      open_burger: "افتح برجر الجبن المحموس",
      open_sushi: "افتح طبق السوشي المميز",

      close: "إغلاق (Escape)",
      prev: "السابق (←)",
      next: "التالي (→)",
sidebar_title: "اختر طريقة تناول الطعام",
sidebar_dinein: "داخل المطعم",
sidebar_takeaway: "سفري",
sidebar_delivery: "توصيل",
sidebar_pickup: "استلام بالسيارة",

reserve_title: "احجز طاولتك",
reserve_people: "عدد الأشخاص",
reserve_date: "التاريخ",
reserve_time: "الوقت",
reserve_booked: "تم الحجز <span class='font-medium'>4</span> مرات اليوم",

opt_1_person: "شخص واحد",
opt_2_people: "شخصان",
opt_3_people: "3 أشخاص",
opt_4_people: "4 أشخاص",
opt_5_people: "5 أشخاص",
opt_6_people: "6 أشخاص",
opt_7_people: "7 أشخاص",
opt_8_people: "8 أشخاص",

address: "طريق الملك فهد، السعودية",
book_now: "احجز الآن",

menu_section_title: "قائمتنا المميزة",
menu_section_subtitle: "استمتع بأفضل أطباقنا بأسعار خاصة",
cat_all: "الكل",
  cat_beef: "لحم بقري",
  cat_chicken: "دجاج",
  cat_pasta: "باستا",
  cat_desserts: "حلويات",
  cat_drinks: "مشروبات",
menu_dish1: "ستيك كامبو",
menu_dish1_alt: "طبق ستيك كامبو",
menu_dish1_price_value: "٧٫٩٠",
menu_dish1_old_value: "١٢٫٩٠",
menu_dish1_link_aria: "فتح تفاصيل ستيك كامبو",
currency_icon_alt: "عملة الريال السعودي",

offers_title: "عروضنا الخاصة",
offers_subtitle: "لا تفوت عروضنا المميزة",

offer1_title: "باستا كواترو",
offer1_desc: "وصف مختصر للطبق.",
offer1_oldprice: "٢٥٫٠٠",
offer1_newprice: "١٨٫٠٠",

offer2_title: "باستا بالخضار",
offer2_desc: "خضروات طازجة مع صوص كريمي.",
offer2_oldprice: "٢٢٫٠٠",
offer2_newprice: "١٥٫٠٠",
offer3_title: "باستا خالية من الجلوتين",
offer3_desc: "خفيفة ولذيذة — بدون جلوتين.",
offer3_oldprice: "٢٤٫٠٠",
offer3_newprice: "١٦٫٠٠",
offer4_title: "باستا كواترو",
offer4_desc: "وصف مختصر للطبق.",
offer4_oldprice: "٢٥٫٠٠",
offer4_newprice: "١٨٫٠٠",


cat_breakfast: "فطور",
    cat_breakfast_time: "8:00 صباحًا إلى 10:00 صباحًا",
    cat_lunch: "غداء",
    cat_lunch_time: "12:00 ظهرًا إلى 3:00 عصرًا",
    cat_dinner: "عشاء",
    cat_dinner_time: "6:00 مساءً إلى 11:00 مساءً",
    cat_drinks: "مشروبات",
    cat_drinks_time: "طوال اليوم",
    cat_dessert: "حلويات",
    cat_dessert_time: "طوال اليوم",

    contact_address_title: "العنوان",
    contact_address_text: "شارع الملك فهد، جدة",
    contact_phone: "+9661234567",
    contact_email: "Support@gmail.com",
    contact_hours_title: "ساعات العمل",
    contact_hours_weekdays: "8:00 صباحًا إلى 1:00 صباحًا في أيام الأسبوع",
    contact_hours_weekends: "11:00 مساءً إلى 1:00 صباحًا في عطلة نهاية الأسبوع",
    contact_follow_title: "تابعنا",
  // dishdetails
   pd_title: "تفاصيل الطبق",
    pd_img_alt: "صورة الطبق",
    pd_name: "أناناس خفيف مرخّص خصيصًا",
    pd_price_now: "20",
    pd_price_old: "24",
    pdA_tab_desc: "الوصف",
    pdA_tab_ing: "المكونات",
    pdA_tab_nut: "القيمة الغذائية",
    pdA_tab_rev: "التقييمات",
    pd_desc: "شريحة لحم طرية مشوية مع زبدة الأعشاب، خضروات مشكلة، وصلصة خاصة.",
    pdA_ready: "جاهز خلال:",
    pdA_ready_val: "15–20 دقيقة",
    pdA_serves: "يكفي:",
    pdA_serves_val: "شخص واحد",
    pd_ing1: "لحم بقري",
    pd_ing2: "زبدة وثوم",
    pd_ing3: "أعشاب وفلفل",
    pd_ing4: "خضروات مشكلة",
    pd_allergens_title: "مسببات الحساسية:",
    pd_allergens: "ألبان، جلوتين.",
    pd_kcal: "420", pd_kcal_unit: "سعرة حرارية",
    pd_protein: "28 جم", pd_protein_unit: "بروتين",
    pd_fat: "18 جم", pd_fat_unit: "دهون",
    pd_size: "الحجم",
    pd_size_s: "صغير", pd_size_m: "وسط", pd_size_l: "كبير",
    pd_extras: "إضافات",
    pd_extra1: "صلصة إضافية", pd_extra2: "جبنة إضافية", pd_extra3: "خبز بالثوم",
    weight_label: "الوزن (كجم)",
    pd_qty: "الكمية:",
    btn_add_cart : "أضف إلى السلة",
    msg_add_success : "✅ تمت الإضافة بنجاح",
 



    // hotel 1
    hero_img_alt: "أفق المملكة العربية السعودية",
    hero_hotels_title: "ابحث بين أكثر من 50,000 فندق في جميع أنحاء السعودية",
    search_city: "ابحث عن مدينة",
  check_in: "تسجيل الوصول",
  check_out: "تسجيل المغادرة",
  rooms_1: "شخص بالغ - غرفة واحدة",
  rooms_2: "شخصان بالغان - غرفتان",
  rooms_3: "جناح عائلي",
  search_btn: "ابحث عن الفنادق",
    features_title: "كيف تحجز فنادق عبر سياحتنا؟",
    features_subtitle: "اتبع هذه الخطوات البسيطة للعثور على إقامتك المثالية وحجزها.",

    features_icon_search: "أيقونة البحث",
    features_icon_compare: "أيقونة المقارنة",
    features_icon_book: "أيقونة الحجز",

    features_step1_title: "ابحث عن فندق",
    features_step1_desc: "ابحث عن غرفة فندقية تناسب تفضيلاتك باستخدام الفلاتر للسعر، تقييمات العملاء، الشعبية، وتقييم النجوم.",

    features_step2_title: "قارن الأسعار",
    features_step2_desc: "اعثر على أفضل عرض بمقارنة أسعار الغرف الفندقية المختارة عبر عدة خيارات في مكان واحد.",

    features_step3_title: "احجز بسعر مناسب",
    features_step3_desc: "احجز غرفتك الفندقية المفضلة بأفضل سعر عبر الإنترنت — بسرعة وسهولة!",

    hotels_top_destinations: "فنادق في أفضل الوجهات",
    city_jeddah: "جدة",
    city_riyadh: "الرياض",
    city_makkah: "مكة",
    city_taif: "الطائف",
    city_dammam: "الدمام",
    city_jazan: "جازان",

     hotels_other_destinations: "فنادق في وجهات شهيرة أخرى",
    hotels_top_attractions: "فنادق بالقرب من أشهر المعالم",
    city_khobar: "الخبر",
    city_dahran: "الظهران",
    city_abha: "أبها",
    city_tabuk: "تبوك",
    city_jizan: "جيزان",
    city_hail: "حائل",
    attr_haram: "المسجد الحرام",
    attr_fountain: "نافورة الملك فهد",
    attr_edge: "حافة العالم",
    attr_diriyah: "الدرعية",
    attr_corniche: "كورنيش جدة",
    attr_elephant: "صخرة الفيل",

  // hotel 2
    hotel_title: "فنادق في جدة",
    hotel_subtitle: "اكتشف أفضل العروض والخصومات في جدة",

    offer_discount: "🔥 خصم 30%",
    offer_riyadh: "الرياض • ليلتان • إفطار مجاني",

    offer_rating: "⭐ 4.8",
    offer_jeddah: "جدة • جناح عائلي ابتداءً من <b>299</b> ريال",

    offer_flash: "⚡ عرض سريع",
    offer_makkah: "مكة • ادفع الآن واحصل على خصم أكبر",

    offer_coupon: "🎟️ كوبون",
    offer_coupon_text: "استخدم <b>STAY10</b> للحصول على خصم إضافي",

    offer_summer: "🏝️ صيفي",
    offer_khobar: "الخبر • منتجعات شاطئية",

    city_label: "اختر المدينة",
    city_select: "اختر المدينة",
    city_jeddah: "جدة",
    city_riyadh: "الرياض",
    city_makkah: "مكة",
    city_taif: "الطائف",
    city_dammam: "الدمام",
    city_khobar: "الخبر",
    city_abha: "أبها",
    city_tabuk: "تبوك",
    city_jizan: "جيزان",
    city_hail: "حائل",

    checkin_label: "تاريخ الوصول",
    checkout_label: "تاريخ المغادرة",
    checkin_ph: "مم/يوم/سنة",
    checkout_ph: "مم/يوم/سنة",

    rooms_label: "الغرف والضيوف",
    rooms_adults1: "بالغون 1 غرفة",
    rooms_adults2: "بالغون 2 غرف",
    rooms_family: "جناح عائلي",

    btn_update_search: "تحديث البحث",
    filter_sort: "ترتيب",
    filter_price_label: "ترتيب حسب السعر",
    filter_price: "السعر",
    filter_price_low: "من الأقل للأعلى",
    filter_price_high: "من الأعلى للأقل",
    filter_star_label: "التصفية حسب النجوم",
    filter_star: "النجوم",
    filter_star_5: "★★★★★",
    filter_star_4: "★★★★☆",
    filter_star_3: "★★★☆☆",

    ard_img_alt: "صورة الفندق",
    card_title: "فندق بلازا",
    card_rating_val: "4.6",
    card_map_alt: "خريطة",
    card_map: "الخريطة",
    card_reviews: "مراجعات العملاء",
    card_nearby: "بالقرب من:",
    card_nearby_place: "شارع الملك فهد",
    card_amen_wifi: "واي فاي",
    card_amen_dinner: "عشاء",
    card_amen_spa: "سبا",
    card_amen_pool: "مسبح",
    card_amen_parking: "موقف سيارات",
    card_currency_alt: "ريال",
    card_price_old: "220",
    card_price_new: "199",
    card_per_night: "لكل ليلة",
    card_book_btn: "احجز الآن",

    
    explore_title: "استكشف هذه الإقامات المميزة",
    explore_subtitle: "عرض العروض من 5 سبتمبر – 8 سبتمبر",
    currency_alt: "ريال",

    stay1_img_alt: "مخيم صحارى رم",
    stay1_badge: "خصم 25%",
    stay1_rating: "ممتاز (5 تقييمات)",
    stay1_title: "مخيم صحارى رم",
    stay1_price: "500",
    stay1_old_price: "700",
    stay1_note: "شامل الضرائب والرسوم",

    stay2_img_alt: "مخيم الصحراء",
    stay2_badge: "جديد",
    stay2_rating: "رائع جدًا (12 تقييم)",
    stay2_title: "مخيم الصحراء",
    stay2_price: "420",
    stay2_old_price: "560",
    stay2_note: "يشمل الإفطار",

    stay3_img_alt: "أجنحة المدينة",
    stay3_badge: "عرض",
    stay3_rating: "جيد جدًا (30 تقييم)",
    stay3_title: "أجنحة المدينة",
    stay3_price: "350",
    stay3_old_price: "460",
    stay3_note: "إلغاء مجاني",

    stay4_img_alt: "منتجع الواحة",
    stay4_badge: "جديد",
    stay4_rating: "جيد (18 تقييم)",
    stay4_title: "منتجع الواحة",
    stay4_price: "480",
    stay4_old_price: "620",
    stay4_note: "شامل الضرائب والرسوم",

// hotel 3
see_all_link_text: "عرض كل الفنادق",
    arrow_alt: "سهم",

    hotel_title: "فندق هيلتون",
btn_share: "مشاركة",
btn_save: "حفظ",
share_alt: "مشاركة",
save_alt: "حفظ",
gallery_main_alt: "الصورة الرئيسية",
gallery_thumb_alt: "صورة الفندق",


 tab_overview: "نظرة عامة",
    tab_about: "عن المكان",
    tab_prices: "الأسعار",
    tab_policies: "السياسات",

    hotel_name: "فندق هيلتون",
    tag_brunch: "مناسب للإفطار المتأخر",
    tag_charming: "ساحر",
    tag_romantic: "رومانسي",
    overview_text:
      "يوفّر هذا الفندق العصري غرفًا واسعة وخدمة مميزة وموقعًا مثاليًا قريبًا من أهم المعالم. يمكن للضيوف الاستمتاع بمسبح خارجي ونادٍ رياضي ومطعم داخل الفندق.",
    see_reviews: "عرض 130 مراجعة",

    about_title: "حول مكان الإقامة",
    about_subtitle: "شقق فندقية مع مسبح خارجي، بالقرب من الظهران مول",

    feat_wifi: "واي فاي",         feat_wifi_alt: "واي فاي",
    feat_pool: "مسبح",            feat_pool_alt: "مسبح",
    feat_restaurant: "مطعم",      feat_restaurant_alt: "مطعم",
    feat_gym: "نادي رياضي",      feat_gym_alt: "نادي رياضي",
    feat_frontdesk: "استقبال 24 ساعة", feat_frontdesk_alt: "استقبال 24 ساعة",
    feat_spa: "سبا",              feat_spa_alt: "سبا",

    area_title: "استكشف المنطقة",
    area_address: "طريق الدائري الشرقي، الرياض 11614، المملكة العربية السعودية",
    area_view_map: "عرض على الخريطة",

    poi_city_walk: "سيتي ووك",                poi_city_walk_time: "٥ دقائق بالسيارة",
    poi_red_sea_mall: "رد سي مول",            poi_red_sea_mall_time: "١١ دقيقة بالسيارة",
    poi_kingdom_centre: "مركز المملكة",       poi_kingdom_centre_time: "١٠ دقائق بالسيارة",
    poi_king_mall: "كينج مول",                poi_king_mall_time: "٩ دقائق بالسيارة",

    choose_unit_title: "اختر وحدتك",

filters_where_label: "إلى أين؟",
    filters_where_select_aria: "اختر المدينة",
    city_jeddah: "جدّة",
    city_riyadh: "الرياض",
    city_dammam: "الدمّام",
    city_mecca: "مكة",
    city_medina: "المدينة",

    filters_dates_label: "التواريخ",
    filters_dates_input_aria: "اختر التاريخ",

    filters_travellers_label: "المسافرون",
    filters_travellers_select_aria: "اختر عدد المسافرين والغرف",
    travellers_opt_1: "مسافر واحد، غرفة واحدة",
    travellers_opt_2: "مسافران، غرفة واحدة",
    travellers_opt_3: "مسافران، غرفتان",
    travellers_opt_4: "٣ مسافرين، غرفتان",

    unit_room_photo_alt: "صورة الغرفة",
    unit_feature_bed: "سرير كينغ",
    unit_feature_minibar: "ميني بار وماكينة قهوة",
    unit_feature_roomservice: "خدمة الغرف على مدار 24 ساعة",
    unit_feature_safetybox: "خزنة أمانات",
    unit_more_details: "المزيد من التفاصيل",
    unit_cancel_heading: "سياسة الإلغاء 🙂",
    unit_cancel_text: "إلغاء مجاني حتى 24 ساعة قبل تسجيل الوصول.",
    unit_include_taxes: "شامل الضرائب والرسوم",
    unit_reserve: "احجز",
    currency_alt: "ريال",

    policies_title: "السياسات",

    pol_mandatory_title: "رسوم إلزامية",
    pol_mandatory_desc:
      "سيُطلب منك دفع الرسوم التالية عند تسجيل الوصول أو المغادرة. قد تشمل الرسوم ضرائب مطبّقة:",
    pol_city_tax_prefix: "تفرض المدينة ضريبة:",
    pol_city_tax_amount: "‏10.00 درهم إماراتي",
    pol_city_tax_suffix: "لكل وحدة إقامة في الليلة.",

    pol_optional_title: "رسوم اختيارية",
    pol_optional_prefix: "تتوفر خدمة تنظيف الغرف؛ قد يتم تحصيل رسوم قدرها",
    pol_optional_amount: "‏220.00 درهم إماراتي",
    pol_optional_suffix: "لكل يوم وفقًا للسياسة.",

    pol_notes_title: "ملاحظات",
    pol_note_1: "يحتوي مكان الإقامة على مساحات خارجية (شرفات/تراسات) قد لا تكون مناسبة للأطفال.",
    pol_note_2: "لا يمكن ضمان غرف خالية تمامًا من الضوضاء.",
    pol_note_3: "قد لا يتوفر كاشف أول أكسيد الكربون في مكان الإقامة.",
    pol_note_4: "يتوفر مطفأة حريق في الموقع.",
    pol_note_5: "أفاد المضيف بعدم وجود حيوانات أليفة في الموقع.",

    pol_services_title: "الخدمات وتنظيف الغرف",
    pol_services_desc: "خدمة الاستقبال متاحة يوميًا. تنظيف الغرف عند الطلب. قد تتوفر خدمة حفظ الأمتعة.",

    pol_payments_title: "طرق الدفع المقبولة",
    pol_payments_desc: "يقبل مكان الإقامة بطاقات الائتمان (فيزا، ماستركارد، أمريكان إكسبريس).",
    pol_payments_visa_alt: "فيزا",
    pol_payments_mc_alt: "ماستركارد",
    pol_payments_amex_alt: "أمريكان إكسبريس",

    pol_clean_title: "التنظيف والسلامة",
    pol_clean_desc: "يتّبع مكان الإقامة ممارسات التنظيف والتعقيم «Commitment to Clean (Marriott)» أو ما يعادلها.",


// hotel 4
    hotel_name: "هيلتون",
    hotel_type: "فندق",
    brand_logo_alt: "شعار العلامة",

    step1_title: "الخطوة 1: تفاصيلك",
    step2_title: "الخطوة 2: تفاصيل العقار",
    step3_title: "الخطوة الأخيرة: الحجز",
    free_cancel_title: "إلغاء مجاني حتى الثلاثاء، 19 أغسطس",
    free_cancel_desc: "يمكنك تغيير أو إلغاء إقامتك لاسترداد كامل المبلغ إذا تغيرت خططك. لأن المرونة مهمة.",
    first_name: "الاسم الأول",
    last_name: "اسم العائلة",
    first_name: "الاسم الأول",
     
    mobile_number: "رقم الجوال",
    contact_hint: "سنستخدم هذا الرقم للتواصل معك بشأن الحجز.",
    property_highlights: "مميزات العقار",
    included_room: "الموجود في غرفتك:",
    special_requests: "هل لديك طلبات خاصة؟",
    requests_desc: "يرجى كتابة تفاصيل طلبك الخاص وسنقوم بإرسالها للعقار...",
    requests_placeholder: "اكتب طلباتك الخاصة هنا (اختياري)...",
    terms_booking: "شروط الحجز",
    terms_desc: "بالضغط على زر “احجز”، فأنت توافق على أنك قرأت وتقبل",
    check_in: "تسجيل الوصول",
    check_in:"تسجيل الوصول", check_in_value:"الأحد، 24 أغسطس 2025 (12:00 م)",
    check_out: "تسجيل المغادرة",
    check_out_value: "الأحد، 25 أغسطس 2025 (12:00 م)",
   nights_rooms: "٣ ليالٍ، غرفة واحدة",
    cancellation_policy: "سياسة الإلغاء",
    price_total: "السعر الإجمالي",
    book_btn: "احجز",

    sidebar_choice: "اختيارك مثالي! احجزه الآن قبل أن يختفي.",
    sidebar_nights: "ليلتان",
    sidebar_taxes: "الضرائب والرسوم",
    sidebar_total: "السعر الإجمالي",
    sidebar_increase: "قد يرتفع السعر إذا حجزت لاحقًا.",
    sidebar_cancel_title: "سياسة الإلغاء",
    sidebar_cancel_desc: "إذا قمت بتغيير أو إلغاء هذا الحجز بعد الساعة 11:59 مساءً بتاريخ 19/08/2025 بتوقيت العقار المحلي (توقيت الخليج القياسي)، فلن يتم استرداد أي مبلغ من الدفعة. لا يمكننا استرداد أي دفعة في حالة عدم الحضور أو المغادرة المبكرة.",
    sidebar_terms: "الشروط والأحكام",
    sidebar_privacy: "سياسة الخصوصية",
    // parks 1
    cat_all: "الكل",
    cat_natural: "الحدائق الطبيعية",
    cat_amusement: "مدن الملاهي",
    cat_water: "الحدائق المائية",
    price_all: "الكل",
    price_paid: "مدفوعة",
    price_free: "مجانية",

    title_browse_parks: "تصفّح أكثر من ٣٠٠٠ حديقة",

   
    title_icon_alt: "أيقونة الحدائق",
     
    fav_aria: "إضافة للمفضلة",
    card_img_alt: "صورة المكان",
    rating_4_aria: "٤ من ٥",
    city_riyadh: "الرياض",
    status_open: "مفتوح",
    status_closed: "مغلق",
    badge_free: "مجاني",
    badge_paid: "مدفوع",
    // parks 2
    gallery_title: "أبرز معالم الحديقة",
gallery_subtitle: "نظرة سريعة على لحظات الحديقة",
view_details: "عرض التفاصيل",

center_name: "مركز ووش",
    hide_details: "إخفاء التفاصيل ✕",
    overview_title: "نظرة عامة",
    overview_text: "جرب الغوص لأول مرة واستكشف العالم البحري السحري في جدة. هذه التجربة مدتها 45 دقيقة.",
    more_details_title: "تفاصيل إضافية",
    detail_item1: "خدماتنا مناسبة لجميع الأعمار.",
    detail_item2: "نقدم خدمات للفعاليات الخاصة والعامة.",
    detail_item3: "كل تجربة يتم تصميمها وفق احتياجاتك الخاصة.",
    experience_title: "مواعيد التجربة والتوافر",
    experience_item1: "يعمل Woosh في مدن متعددة داخل السعودية.",
    experience_item2: "الحجوزات متاحة طوال الأسبوع.",
    included_title: "ما يتضمنه العرض",
    included_item1: "جميع معدات الغوص: قناع، بدلة، زعانف، منظم، سترة طفو، أسطوانة أكسجين",
    included_item2: "مدرب غوص محترف",
    included_item3: "رحلة بالقارب إلى موقع الغوص",
    prices_title: "الأسعار والباقات",
    prices_text: "نقدم باقات مخصصة حسب نوع الحدث والمتطلبات. السعر يعتمد على نطاق وحجم الحدث. الدفع يتم عبر نظامنا الآمن.",
    cancellation_title: "سياسة الإلغاء",
    cancel_item1: "إلغاء مجاني حتى 48 ساعة قبل الرحلة",
    cancel_item2: "استرداد 50% إذا تم الإلغاء بين 24–48 ساعة",
    cancel_item3: "لا يوجد استرداد إذا تم الإلغاء خلال 24 ساعة من موعد الانطلاق",
    location_label: "الموقع:",
    get_directions: "عرض الاتجاهات",
// supermarket1
hero_title: "كل ما هو طازج يصل إلى باب بيتك!",
    city_icon_alt: "المدينة",
    city_select_aria: "اختر مدينتك",
    city_placeholder: "اختر مدينتك",
    city_jeddah: "جدة",
    city_riyadh: "الرياض",
    city_dammam: "الدمام",
    city_makkah: "مكة",
    city_madinah: "المدينة",
    supermarket_icon_alt: "السوبرماركت",
    market_select_aria: "ابحث عن السوبرماركت المفضل لديك",
    market_placeholder: "ابحث عن السوبرماركت المفضل لديك",
    market_1: "سوبرماركت 1",
    market_2: "سوبرماركت 2",
    market_3: "سوبرماركت 3",
    market_4: "سوبرماركت 4",
    market_5: "سوبرماركت 5",
    search_btn: "بحث",
    search_btn_aria: "بحث",
    supermarket_icon_alt: "السوبرماركت",
    market_select_aria: "ابحث عن السوبرماركت المفضل لديك",
    market_placeholder: "ابحث عن السوبرماركت المفضل لديك",
    market_1: "سوبرماركت 1",
    market_2: "سوبرماركت 2",
    market_3: "سوبرماركت 3",
    market_4: "سوبرماركت 4",
    market_5: "سوبرماركت 5",
    search_btn: "بحث",
    search_btn_aria: "بحث",
    supermarkets_title: "الأسواق في جدة",
    supermarket_item_1_label: "هايبر ماركت",
    supermarket_item_1_alt: "شعار السوبرماركت 1",
    supermarket_item_2_label: "هايبر ماركت",
    supermarket_item_2_alt: "شعار السوبرماركت 2",
    supermarket_item_3_label: "هايبر ماركت",
    supermarket_item_3_alt: "شعار السوبرماركت 3",
    supermarket_item_4_label: "هايبر ماركت",
    supermarket_item_4_alt: "شعار السوبرماركت 4",
    supermarket_item_5_label: "هايبر ماركت",
    supermarket_item_5_alt: "شعار السوبرماركت 5",
    offers_title: "العروض الخاصة",
    offers_subtitle: "اكتشف أفضل عروض السوبرماركت المتاحة الآن", 
    // supermarket 2
    categories_title: "تصفح حسب الفئة",
    cat_fruits: "الفواكه والخضروات",
    cat_fruits_alt: "الفواكه والخضروات",
    cat_meat: "اللحوم الطازجة والدواجن",
    cat_meat_alt: "اللحوم الطازجة والدواجن",
    cat_dairy: "الألبان والبيض",
    cat_dairy_alt: "الألبان والبيض",
    cat_herbs: "الأعشاب والتوابل",
    cat_herbs_alt: "الأعشاب والتوابل",
    cat_beverages: "المشروبات",
    cat_beverages_alt: "المشروبات",
    cat_cleaning: "مستلزمات التنظيف",
    cat_cleaning_alt: "مستلزمات التنظيف",
    cat_electronics: "الإلكترونيات",
    cat_electronics_alt: "الإلكترونيات",
    cat_fitness: "اللياقة والرياضة",
    cat_fitness_alt: "اللياقة والرياضة",
    back_btn: "رجوع",
     discount_title: "خصومات",
    discount_subtitle: "هذا الأسبوع",
    view_all: "عرض الكل",
    discount_badge: "خصم 22%",
    wishlist_icon: "♡",
    product_img_alt: "صورة المنتج",
    currency_alt: "ريال سعودي",
    add_to_cart: "أضف إلى السلة",
    add_to_cart_alt: "أضف إلى السلة",

     
    product_name_1: "مكرونة سبيرالي",
    product_price_1: "7.90",
    product_old_price_1: "12.9",
    product_discount_1: "40%",

  
    product_name_2: "مكرونة بني",
    product_price_2: "8.50",
    product_old_price_2: "13.5",
    product_discount_2: "37%",

     
    product_name_3: "مكرونة فوسيلي",
    product_price_3: "6.70",
    product_old_price_3: "10.5",
    product_discount_3: "36%",

   featured_title: "منتجات",
   featured_subtitle: "مميزة",

    promo_text: "سنختار مشترياتك بعناية ونوصلها لباب بيتك",
    promo_btn: "عرض ليوم واحد",
    promo_img_veg_alt: "خضروات",
    promo_img_man_alt: "رجل يحمل مشتريات",
    promo_img_tomato_alt: "طماطم",

     fresh_zone_title1: "قسم",
      fresh_zone_title2: "الطعام",
      fresh_zone_title3: "الطازج!",
      fresh_zone_card1: "فواكه طازجة",
      fresh_zone_card2: "خضروات طازجة",
      fresh_zone_card3: "منتجات ألبان",
      fresh_zone_card4: "لحوم ودواجن",

  
      fresh_zone_card1_alt: "فواكه طازجة",
      fresh_zone_card2_alt: "خضروات طازجة",
      fresh_zone_card3_alt: "منتجات ألبان",
      fresh_zone_card4_alt: "لحوم ودواجن",
       // supermarket3
       brand: "السوبرماركت",
    brand_alt: "شعار السوبرماركت",
    brand_slogan: "هنا الشعار",

    search_placeholder: "ابحث عن منتج",
    filter_btn: "تصفية",
    search_btn: "بحث",

    account: "الحساب",
    account_alt: "أيقونة الحساب",
    wishlist: "المفضلة",
    wishlist_alt: "أيقونة المفضلة",
    cart: "السلة",
    cart_alt: "أيقونة السلة",

    nav_fruits: "الفواكه",
    nav_vegetables: "الخضروات",
    nav_poultry: "الدواجن الطازجة",
    nav_dairy: "الألبان والبيض",
    nav_herbs: "الأعشاب",
    nav_beverages: "المشروبات",
    nav_cleaning: "مستلزمات التنظيف",
    nav_electronics: "الإلكترونيات",
    nav_fitness: "اللياقة والرياضة",
    nav_bakery: "المخبوزات",
    nav_snacks: "الوجبات الخفيفة",
    nav_household: "الأدوات المنزلية",

    snacks_title: "الوجبات الخفيفة",
    snacks_title: "الوجبات الخفيفة",
    results_label: "النتائج",
    no_results: "لا توجد نتائج",

    /* Sidebar */
    filter_by: "تصفية حسب",
    search_label: "ابحث عن منتج",
    search_placeholder: "ابحث...",
    by_price: "حسب السعر",
    price_from: "من",
    price_to: "إلى",
    currency_sar: "ريال",
    product_status: "حالة المنتج",
    status_sale: "تخفيضات",
    status_stock: "متوفر",
    status_best: "الأكثر مبيعًا",
    category: "الفئة",
    cat_dairy: "ألبان وبيض",
    cat_drinks: "مشروبات",
    cat_meat: "لحوم ودواجن",
    cat_frozen: "مجمّدات",
    cat_bakery: "مخبوزات",
    cat_cleaning: "منظفات",
    store: "المتجر",
    store_1: "المتجر 1",
    store_2: "المتجر 2",
    store_3: "المتجر 3",
    store_4: "المتجر 4",
    store_5: "المتجر 5",
    btn_apply: "تطبيق",
    btn_reset: "إعادة ضبط",

    /* Cards */
    prod_spirali: "مكرونة سبيرالي",
    favorite_alt: "مفضلة",
    product_img_alt: "صورة المنتج",
    currency_alt: "ريال سعودي",
    cart_alt: "أضف إلى السلة",
    discount_40: "خصم 40٪",

     //supermarket4
    brand: "السوبرماركت",
    brand_alt: "شعار السوبرماركت",
    brand_slogan: "هنا الشعار",
    our_location: "موقعنا",

    search_placeholder: "ابحث عن منتج",
    filter_btn: "تصفية",
    search_btn: "بحث",

    account: "الحساب",
    account_alt: "أيقونة الحساب",
    wishlist: "المفضلة",
    wishlist_alt: "أيقونة المفضلة",
    cart: "السلة",
    cart_alt: "أيقونة السلة",

     label_off: "خصم",
    currency_sar: "ر.س",

    name_apple_gala: "تفاح جالا 1 كجم",
    name_fresh_milk: "حليب طازج 1 لتر",
    name_chicken_breast: "صدور دجاج 1 كجم",
    name_chips_mix: "باك تشيبس 12 حبة",
    name_orange_juice: "عصير برتقال 1.5 لتر",
    name_laundry_powder: "مسحوق غسيل 3 كجم",
    name_eggs: "بيض 30 حبة",

    aria_apple_gala: "تفاصيل عرض تفاح جالا 1 كجم خصم 25% الآن 6.95 ر.س كان 9.25",
    aria_fresh_milk: "تفاصيل عرض حليب طازج 1 لتر خصم 15% الآن 7.90 ر.س كان 9.30",
    aria_chicken_breast: "تفاصيل عرض صدور دجاج 1 كجم خصم 20% الآن 29.90 ر.س كان 37.50",
    aria_chips_mix: "تفاصيل عرض باك تشيبس 12 حبة خصم 30% الآن 18.90 ر.س كان 26.90",
    aria_orange_juice: "تفاصيل عرض عصير برتقال 1.5 لتر خصم 18% الآن 8.90 ر.س كان 10.90",
    aria_laundry_powder: "تفاصيل عرض مسحوق غسيل 3 كجم خصم 22% الآن 42.00 ر.س كان 54.00",
    aria_eggs: "تفاصيل عرض بيض 30 حبة خصم 12% الآن 22.90 ر.س كان 25.90",

    offers_title: "عروض فلاش",
    offers_subtitle: "اكتشف أفضل عروض السوبرماركت المتاحة الآن",

     title_weekly_saving_full: "عروض التوفير الأسبوعية",
     /* Cards */
    prod_spirali: "مكرونة سبيرالي",
    favorite_alt: "مفضلة",
    product_img_alt: "صورة المنتج",
    currency_alt: "ريال سعودي",
    cart_alt: "أضف إلى السلة",
    discount_40: "خصم 40٪",

    //supermarket5
    brand: "السوبرماركت",
    brand_alt: "شعار السوبرماركت",
    brand_slogan: "هنا الشعار",

    search_placeholder: "ابحث عن منتج",
    filter_btn: "تصفية",
    search_btn: "بحث",

    account: "الحساب",
    account_alt: "أيقونة الحساب",
    wishlist: "المفضلة",
    wishlist_alt: "أيقونة المفضلة",
    cart: "السلة",
    cart_alt: "أيقونة السلة",

     label_off: "خصم",
    currency_sar: "ر.س",

    name_apple_gala: "تفاح جالا 1 كجم",
    name_fresh_milk: "حليب طازج 1 لتر",
    name_chicken_breast: "صدور دجاج 1 كجم",
    name_chips_mix: "باك تشيبس 12 حبة",
    name_orange_juice: "عصير برتقال 1.5 لتر",
    name_laundry_powder: "مسحوق غسيل 3 كجم",
    name_eggs: "بيض 30 حبة",

    aria_apple_gala: "تفاصيل عرض تفاح جالا 1 كجم خصم 25% الآن 6.95 ر.س كان 9.25",
    aria_fresh_milk: "تفاصيل عرض حليب طازج 1 لتر خصم 15% الآن 7.90 ر.س كان 9.30",
    aria_chicken_breast: "تفاصيل عرض صدور دجاج 1 كجم خصم 20% الآن 29.90 ر.س كان 37.50",
    aria_chips_mix: "تفاصيل عرض باك تشيبس 12 حبة خصم 30% الآن 18.90 ر.س كان 26.90",
    aria_orange_juice: "تفاصيل عرض عصير برتقال 1.5 لتر خصم 18% الآن 8.90 ر.س كان 10.90",
    aria_laundry_powder: "تفاصيل عرض مسحوق غسيل 3 كجم خصم 22% الآن 42.00 ر.س كان 54.00",
    aria_eggs: "تفاصيل عرض بيض 30 حبة خصم 12% الآن 22.90 ر.س كان 25.90",

    product_details_title: "تفاصيل المنتج",
    product_img_alt: "صورة المنتج",
    product_title: "أناناس خفيف بترخيص خاص",
    product_desc: "جينزنا المفضل يلتقي بعقد التسعينات. مصنوع من دنيم ياباني فاخر غير مطاطي بطابع كلاسيكي، بقصة مستقيمة مريحة وخصر عالٍ جدًا…",
    currency_icon_alt: "أيقونة العملة",
    currency_sar: "ر.س",

    details_title: "التفاصيل",
    details_category: "الفئة:",
    details_category_val: "خضروات وفواكه طازجة",
    details_tags: "الوسوم:",
    details_tags_val: "موسمي، طازج",
    details_brand: "العلامة:",
    details_brand_val: "العلامة 01",

    qty_label: "الكمية:",
    qty_minus_aria: "تقليل الكمية",
    qty_input_aria: "حقل إدخال الكمية",
    qty_plus_aria: "زيادة الكمية",

    btn_add_to_cart: "أضف إلى السلة",
    aria_add_to_cart: "أضف هذا المنتج إلى السلة",

    related_label: "منتجات",
    products_label: "ذات صلة",  
    product_img_alt: "صورة المنتج",
    currency_icon_alt: "أيقونة العملة",
    label_off: "خصم",

    prod_spirali: "مكرونة سبيرالي",
    discount_40: "خصم 40%",
    cart_alt: "أضف إلى السلة",
     delivery_scheduled: "توصيل مجدول (4 عناصر)",
    delivery_today: "اليوم",
    delivery_time: "7:00 م",
    btn_change_slot: "تغيير الموعد",
    btn_add_items: "إضافة عناصر",
    missing_title: "ناقص شيء؟",
    missing_desc: "لا يزال بإمكانك إضافة المزيد من العناصر هنا.",
    btn_browse: "تصفّح",

     delivery_scheduled: "موعد التوصيل ({count} عناصر)",
    delivery_today: "اليوم",
    delivery_time: "٧:٠٠ م",
    btn_change_slot: "تغيير الموعد",
    btn_add_items: "إضافة منتجات",
    missing_title: "هل ينقص شيء؟",
    missing_desc: "يمكنك إضافة عناصر إضافية هنا.",
    btn_browse: "تصفح",

    slot_title: "اختر توقيت التوصيل",
    slot_today: "اليوم",
    slot_tomorrow: "غداً",
    btn_cancel: "إلغاء",
    btn_confirm: "تأكيد",

    product_lemon: "ليمون",
    product_lemon_alt: "ليمون",
    unit_1kg: "1 كجم",
    cat_fresh_fruits: "فواكه وخضروات طازجة",
    btn_dec: "−",
    btn_inc: "+",
    price_unit: "الوحدة",
    btn_remove: "حذف",

    product_potato: "بطاطس",
    product_potato_alt: "بطاطس",
    discount_23: "خصم ٢٣٪",
    cat_vegetables: "خضروات",

    product_cucumber: "خيار",
    product_cucumber_alt: "خيار",

    product_juice: "عصير فراولة",
    product_juice_alt: "عصير فراولة",
    unit_1l: "1 لتر",
    cat_drinks: "مشروبات",

    order_summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    delivery: "التوصيل",
    taxes: "الضرائب والرسوم",
    total: "الإجمالي",
    promo_placeholder: "كود الخصم",
    btn_apply: "تطبيق",
    btn_checkout: "الدفع",

    currency_code: "SAR",
    /* (Optional) other keys if you use them elsewhere */
    currency_code: "ر.س",

    order_summary: "ملخص الطلب",
      subtotal: "الإجمالي الفرعي",
      delivery: "التوصيل",
      taxes: "الضرائب والرسوم",
      total: "الإجمالي",

      ready_title: "جاهز للسفر",
      ready_desc: "خطّط رحلتك، واختر المطاعم واحجز بضغطة واحدة.",
      btn_start_planning: "ابدأ التخطيط",

      also_search: "ابحث أيضًا عن:",
      search_hotel: "فندق",
      search_restaurant: "مطعم",
      search_cafe: "مقهى",

      fresh_intro: "ستحب هذه المنتجات",
    fresh_title1: "منتجات",
    fresh_title2: "الأكثر مبيعًا",

    cat_fruits: "فواكه",
    cat_vegetables: "خضروات",
    btn_view_all: "عرض الكل",

    badge_discount: "خصم 22%",
    badge_fresh: "طازج",

    product_watermelon: "بطيخ",
  meta_watermelon: "≈ 700 جم • طازج",
    price_watermelon: "٦٫٩٠",
    "aria-label:add_watermelon": "إضافة البطيخ إلى العربة",

     product_tomato : "طماطم",
    meta_tomato : "١ كجم • عضوي",
    price_tomato : "٣٫٢٠",
    "aria-label:add_tomato": "إضافة الطماطم إلى العربة",

     product_egg : "بيض",
     meta_egg : "١٢ قطعة • درجة A",
     price_egg : "٨٫٩٠",
    "aria-label:add_egg": "إضافة البيض إلى العربة",

     related_intro : "استنادًا إلى اختياراتك الأخيرة",
    related_title1 : "منتجات",
    related_title2 : "مرتبطة بسلة التسوق الخاصة بك",
     cat_fruits : "فواكه",
     cat_vegetables : "خضروات",
     // service provider
     pricing_title: "خطط الاشتراك",
  pricing_subtitle: "اختر المدة التي تناسب احتياجاتك — خصومات أكبر عند الالتزام لفترات أطول.",

  plan_monthly: "شهري",
  plan_quarterly: "ربع سنوي",
  plan_semiannual: "نصف سنوي",
  plan_annual: "سنوي",

  plan_flexible: "مرن",
  plan_save_10: "وفر 10%",
  plan_save_15: "وفر 15%",
  plan_save_25: "أفضل قيمة · وفر 25%",

  plan_monthly_price: " شهر",
  plan_quarterly_price: " 3 أشهر",
  plan_semiannual_price: " 6 أشهر",
  plan_annual_price: " 12 شهر",

  plan_cancel_anytime: "يمكن الإلغاء أو الترقية في أي وقت",
  plan_equiv_283: "يعادل 283 ريال/شهر",
  plan_equiv_266: "يعادل 266 ريال/شهر",
  plan_equiv_250: "يعادل 250 ريال/شهر",

  feature_email_support: "دعم أساسي عبر البريد الإلكتروني",
  feature_chat_support: "دعم عبر البريد الإلكتروني والدردشة",
  feature_priority_chat: "دعم دردشة أولوية",
  feature_24_7: "دعم 24/7",
  feature_account_manager: "مدير حساب مخصص",

  feature_monthly_reports: "تقارير شهرية",
  feature_bimonthly_reports: "تقارير نصف شهرية",
  feature_weekly_reports: "تقارير أسبوعية",

  feature_consultation: "استشارة مخصصة",
  feature_advisory_call: "مكالمة استشارية",
  feature_monthly_call: "مكالمة استشارية شهرية",
  feature_two_consultations: "استشارتان مجانيتان",

  feature_onboarding: "إعداد أولوية",

  badge_most_popular: "الأكثر شيوعًا",

  btn_contact: "اشترك الّاّن ",
     
    
    // Plan
      plan2_badge: "خطط رحلتك بسهولة",
      plan2_title: "اختر طريقة إعداد برنامج رحلتك",
      plan2_subtitle: "إمّا بمساعدة الذكاء الاصطناعي لخطط سريعة ومحسّنة، أو اصنع كل التفاصيل يدويًا.",

      plan2_manual_title: "تخطيط يدوي",
      plan2_manual_desc: "ابنِ رحلتك خطوة بخطوة: الأيام، المدن، الأنشطة، والتوقيت — تحكم كامل لك.",
      plan2_manual_f1: "تحكم دقيق وإعدادات متقدمة",
      plan2_manual_f2: "مثالي لقوائم أمنيات ثابتة",
      plan2_manual_f3: "يناسب العمل دون اتصال",
      plan2_manual_cta: "ابدأ يدويًا",

      plan2_smart_badge: "مُوصى به",
      plan2_smart_title: "تخطيط ذكي (ذكاء اصطناعي)",
      plan2_smart_desc: "خطة محسّنة وفق تفضيلاتك ووقتك وإيقاع سفرك — فورًا.",
      plan2_smart_f1: "اقتراحات مخصّصة لاهتماماتك",
      plan2_smart_f2: "مسارات محسّنة وتوقيتات واقعية",
      plan2_smart_f3: "تعديلات بنقرة واحدة وإعادة تخطيط سريعة",
      plan2_smart_cta: "ابدأ بالجولة الذكية",


// register
welcome_back: "مرحبًا بعودتك",
    welcome_subtext: "سجّل الدخول إلى حسابك للمتابعة.",
    signup_title: "إنشاء حساب",
    signup_subtext: "أدخل بياناتك للمتابعة",
    phone_label: "رقم الهاتف",
    phone_placeholder: "+20 10 1234 5678",
    password_label: "كلمة المرور",
    password_placeholder: "••••••••",
    signin_button: "تسجيل الدخول",
    already_have_account: "هل لديك حساب بالفعل؟",
    login_link: "تسجيل الدخول",
    email_label: "البريد الإلكتروني",
confirm_password_label: "أعد إدخال كلمة المرور",


header_title: "الشروط والخصوصية",
    header_subtitle: "تعرف على كيفية حماية بياناتك وضمان تجربة سفر آمنة 🌍",

    terms_tab: "الشروط والأحكام",
    privacy_tab: "سياسة الخصوصية",

    // ===== Terms Section =====
    terms_intro_title: "مقدمة",
    terms_intro_text:
      "مرحبًا بك في <span class='font-semibold text-teal-600'>سياحتنا</span>! باستخدامك لموقعنا، فإنك توافق على اتباع الشروط والأحكام التي تهدف إلى ضمان تجربة عادلة وممتعة للجميع.",

    terms_use_title: "استخدام خدماتنا",
    terms_use_text:
      "أنت توافق على استخدام خدماتنا بمسؤولية ولأغراض السفر القانونية فقط. قد يؤدي سوء الاستخدام أو النشاط الاحتيالي إلى تعليق الحساب.",

    terms_ip_title: "الملكية الفكرية",
    terms_ip_text:
      "جميع مواد الموقع، بما في ذلك المحتوى والصور والعلامات التجارية، محمية وتعود ملكيتها إلى <span class='font-semibold text-teal-600'>سياحتنا</span>.",

    terms_liability_title: "تحديد المسؤولية",
    terms_liability_text:
      "<span class='font-semibold text-teal-600'>سياحتنا</span> غير مسؤولة عن أي أضرار غير مباشرة أو عرضية ناتجة عن استخدامك لخدماتنا.",


    // contact
  contact_title: "اتصل بنا",
  contact_email_title: "البريد الإلكتروني",
  contact_email_general: "عام",
  contact_email_support: "الدعم الفني",
  contact_phone_title: "رقم الهاتف",
  contact_phone_sales: "المبيعات",
  contact_phone_office: "المكتب",
  contact_location_title: "الموقع",
  contact_location_value: "القاهرة، مصر",
  contact_form_name_label: "الاسم",
  contact_form_name_ph: "اكتب اسمك",
  contact_form_email_label: "البريد الإلكتروني",
  contact_form_email_ph: "example@البريد.com",
  contact_form_msg_label: "الرسالة",
  contact_form_msg_ph: "اكتب رسالتك هنا...",
  contact_form_submit: "إرسال الرسالة",            
  // account
    avatar_alt: "صورة الملف الشخصي",
    change_photo: "تغيير الصورة الشخصية",
    header_title: "حسابي",
    header_subtitle: "قم بإدارة ملفك الشخصي والحجوزات والتفضيلات الخاصة بك",
    action_start_planning: "ابدأ التخطيط", 
    
    tab_overview: "نظرة عامة",
    tab_bookings: "الحجوزات",
    tab_favorites: "المفضلة",
    tab_settings: "الإعدادات",

    stats_trips_label: "الرحلات المخططة",
    stats_bookings_label: "الحجوزات",
    stats_favorites_label: "المفضلة",
 
    
     

    recent_activity: "النشاط الأخير",
    bookings_title: "حجوزاتك",
    view_all: "عرض الكل",
    booking_hotel_title: "فندق نايل فيو",
    booking_hotel_code: "#BKG-2451",
    booking_hotel_info: "تسجيل الوصول: 12 أكتوبر 2025 • 3 ليالٍ",
    booking_hotel_view: "عرض",
    booking_hotel_cancel: "إلغاء",
    booking_restaurant_title: "مطعم الخبر جريل",
    booking_restaurant_code: "#RES-1025",
    booking_restaurant_info: "الحجز: 12 أكتوبر 2025 • 7:30 مساءً • ضيفان",
    booking_restaurant_view: "عرض التفاصيل",
    booking_restaurant_cancel: "إلغاء الحجز",
    favorites_title: "المفضلة الخاصة بك",
    favorites_remove: "إزالة",
  favorites_card_hotel: "فندق بلازا",
    favorites_card_park: "منتزه النيل",
    favorites_card_restaurant: "مطعم لارا",
    favorites_view: "عرض",

    settings_personal: "المعلومات الشخصية",
    settings_security: "الأمان",
    settings_addresses: "العناوين",
    settings_payments: "طرق الدفع",

    change_password: "تغيير كلمة المرور",
    logout: "تسجيل الخروج",
    add_payment: "إضافة بطاقة جديدة",
    address_home: "المنزل",

    
      first_name: "الاسم الأول",
      last_name: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      save: "حفظ التغييرات",
      reset: "إعادة التعيين",
    

   
      change_password: "تغيير كلمة المرور",
      current_password: "كلمة المرور الحالية",
      new_password: "كلمة المرور الجديدة",
      confirm_password: "تأكيد كلمة المرور الجديدة",
      cancel: "إلغاء",
      save: "حفظ",
      settings_addresses: "العناوين",
    address_home: "المنزل",
    address_edit: "تعديل",
    address_remove: "إزالة",

    settings_payments: "طرق الدفع",
    payment_card_number: "**** **** **** 5123",
    payment_card_expiry: "تنتهي في 02/27",
    payment_remove: "إزالة",
    add_payment: "إضافة بطاقة جديدة",

    address_add: "إضافة عنوان جديد",
    address_edit: "تعديل العنوان",
    cancel: "إلغاء",
    save: "حفظ",

  
    address_label: "التسمية",
    address_line1: "العنوان سطر 1",
    address_linee: "العنوان سطر 2 (اختياري)",
    city: "المدينة",
    country: "الدولة",
    zip: "الرمز البريدي",
 
    










    // ===== Privacy Section =====
    privacy_data_title: "جمع البيانات",
    privacy_data_text:
      "نقوم بجمع بعض البيانات الأساسية مثل الاسم والبريد الإلكتروني والتفضيلات لتحسين تجربة السفر الخاصة بك.",

    privacy_usage_title: "استخدام البيانات",
    privacy_usage_text:
      "تُستخدم معلوماتك لتخصيص العروض ومعالجة الحجوزات وتحسين خدماتنا. نحن لا نبيع بياناتك لأي جهة.",

    privacy_cookie_title: "ملفات تعريف الارتباط (الكوكيز)",
    privacy_cookie_text:
      "نستخدم ملفات تعريف الارتباط لتوفير تجربة تصفح أفضل. يمكنك تعطيلها في أي وقت من إعدادات المتصفح.",

    privacy_security_title: "الأمان",
    privacy_security_text:
      "نستخدم تقنيات تشفير قوية وفحوصات أمان منتظمة لضمان حماية بياناتك من الوصول غير المصرح به.",

      // login
      title: "تسجيل الدخول",
      subtitle: "أدخل بياناتك للمتابعة",
      identifier_label: "رقم الهاتف أو البريد الإلكتروني",
      identifier_placeholder: "7701234567 أو you@example.com",
      password_label: "كلمة المرور",
      password_placeholder: "••••••••",
      remember_me: "تذكرني",
      forgot_password: "هل نسيت؟",
      agree_text: "أوافق على",
      terms_link: "الشروط والأحكام",
      login_button: "تسجيل الدخول",
      no_account: "ليس لديك حساب؟",
      register_link: "إنشاء حساب جديد",


    results_icon_alt: "أيقونة القسم",
    rest_img_alt: "مطعم",
    footer_categories: "كل الفئات",
  footer_restaurants: "مطاعم",
  footer_cafe: "مقاهي",
   footer_parks: "منتزهات",
  footer_supermarkets: "سوبر ماركت",
  footer_hotels: "فنادق",
  footer_contact: "تواصل معنا",
  footer_email: "البريد: Support123@gmail.com",
  footer_phone1: "الهاتف 1: 12345678",
  footer_phone2: "الهاتف 2: 3455765433345",

  footer_policies: "السياسات",
  footer_guidelines: "إرشادات الاستخدام",
  footer_terms: "شروط الاستخدام",
  footer_privacy: "سياسة الخصوصية",

  footer_download: "حمّل تطبيقنا",
  footer_download_desc: "احصل على أحدث إصدار من تطبيقاتنا",
  footer_rights: "© 2025 سياحتنا. جميع الحقوق محفوظة.",

  footer_logo_alt: "شعار سياحتنا",
  footer_google_alt: "متاح على Google Play",
  footer_apple_alt: "حمّل من App Store",

  your_cart: "سلتك",
    back_to_menu: "العودة إلى القائمة",
    honey_pancakes: "فطائر العسل",
    size: "الحجم",
    extras: "الإضافات",
    total: "الإجمالي",
    add_dish: "أضف طبقًا آخر",
    edit_quantity_note: "يمكنك تعديل الكمية أو حذف الأطباق",
    order_type: "نوع الطلب",
    service: "الخدمة",
    delivery: "توصيل",
    bill_summary: "ملخص الفاتورة",
    items_total: "إجمالي الأصناف",
    delivery_fee: "رسوم التوصيل",
    grand_total: "الإجمالي الكلي",
    confirm_order: "تأكيد الطلب",
    price_note: "الأسعار تشمل الضريبة. رسوم التوصيل تختلف حسب الموقع.",

    
    btn_discover_more:"اكتشف المزيد",




"about.heading": "من نحن",
      "about.subheading": "رحلتك تبدأ من هنا ✈️",
      "about.tagline": "استكشف واحلم واكتشف جمال العالم 🌍",
      "about.body": `في <span class="font-semibold text-teal-600">سياحتنا</span> نُحوّل شغف السفر لديك إلى واقع!
سواء كنت تبحث عن شاطئ دافئ تغمره الشمس، أو مغامرة في الجبال، أو هروب هادئ إلى أحضان الطبيعة —
نصنع رحلات تترك أثراً جميلاً في قلبك وحكايات تستحق أن تُروى.
خلّي مغامرتك القادمة لا تُنسى!`,
      "about.cta": "اكتشف المزيد",
      "about.imageAlt": "رسم توضيحي للسفر"



    }
  };

  const html = document.documentElement;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  function applyLang(lang){
    const dict = I18N[lang] || I18N.en;

    // حدّث النصوص
    $$("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    // اتجاه الصفحة
    const isAR = (lang === "ar");
    html.setAttribute("dir", isAR ? "rtl" : "ltr");
    html.classList.toggle("rtl", isAR);

    // احفظ الاختيار
    localStorage.setItem("lang", lang);
  }

  // Dropdowns (فتح/غلق)
  function setupDropdown(btnSel, menuSel){
    const btn = $(btnSel), menu = $(menuSel);
    if(!btn || !menu) return;
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      // اقفل أي قوائم مفتوحة
      $$(".lang-menu").forEach(m=> m.classList.add("hidden"));
      menu.classList.toggle("hidden");
    });
    // علّمهم بكلاس مشترك
    menu.classList.add("lang-menu");
  }

  // اربط اختيارات اللغة
  function bindLangChoices(){
    $$('#langMenuDesktop [data-lang], #langMenuMobile [data-lang]').forEach(a=>{
      a.addEventListener("click", (e)=>{
        e.preventDefault();
        const lang = a.getAttribute("data-lang");
        applyLang(lang);
        // اقفل القوائم
        $$(".lang-menu").forEach(m=> m.classList.add("hidden"));
      });
    });
  }

  // أغلق القوائم عند الضغط خارجها
  document.addEventListener("click", ()=> $$(".lang-menu").forEach(m=> m.classList.add("hidden")));

  // شغّل
  setupDropdown("#langBtnDesktop", "#langMenuDesktop");
  setupDropdown("#langBtnMobile", "#langMenuMobile");
  bindLangChoices();

  // لغة البداية
  const saved = localStorage.getItem("lang") || "en";
  applyLang(saved);
})();









 
(function(){
  // ملف الترجمة (مثال عربي/إنجليزي)
  const translations = {
    en: {
      hero_title: "Discover and Book the Best Restaurants & Café",
      hero_search_ph: "Restaurant or café name",
      hero_search_btn: "Search",
    },
    ar: {
      hero_title: "اكتشف واحجز أفضل المطاعم والمقاهي",
      hero_search_ph: "اسم المطعم أو المقهى",
      hero_search_btn: "بحث",
    }
  };

  // اللغة الحالية (بدّل حسب الإعدادات أو زر السويتش)
  let currentLang = "ar"; // أو "en"

  function applyTranslations(lang){
    const dict = translations[lang] || {};
    // العناصر العادية
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]) el.textContent = dict[key];
    });
    // الـ placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.getAttribute("data-i18n-placeholder");
      if(dict[key]) el.setAttribute("placeholder", dict[key]);
    });
  }

  // شغّل أول مرة
  applyTranslations(currentLang);

  // مثال: زر يغير اللغة
  window.switchLang = function(lang){
    currentLang = lang;
    applyTranslations(lang);
  };
})();
 
