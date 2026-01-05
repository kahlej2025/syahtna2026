                        
 
       // nav links
        const tabs = document.querySelectorAll('.tab-btn');
        const panels = {
            overview: document.getElementById('tab-overview'),
            bookings: document.getElementById('tab-bookings'),
            favorites: document.getElementById('tab-favorites'),
            settings: document.getElementById('tab-settings'),
        };

        function activateTab(name) {
            // header buttons
            tabs.forEach(btn => {
                const isActive = btn.dataset.tab === name;
                btn.classList.toggle('text-teal-700', isActive);
                btn.classList.toggle('border-b-2', isActive);
                btn.classList.toggle('border-teal-600', isActive);
                btn.classList.toggle('text-gray-600', !isActive);
            });
            // panels
            Object.entries(panels).forEach(([key, el]) => {
                if (!el) return;
                el.classList.toggle('hidden', key !== name);
            });
        }
        tabs.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
        // default
        activateTab('overview');
    









                               // personal information
                                const messageBox = document.getElementById("messageBox");

                                function showMessage(text, color = "bg-teal-600") {
                                    messageBox.textContent = text;
                                    messageBox.className =
                                        "mt-3 px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity duration-500 " +
                                        color;
                                    messageBox.classList.remove("hidden");
                                    messageBox.style.opacity = "1";

                                    // يخفي الرسالة بعد 3 ثواني
                                    setTimeout(() => {
                                        messageBox.style.opacity = "0";
                                        setTimeout(() => messageBox.classList.add("hidden"), 500);
                                    }, 3000);
                                }

                                // زر الحفظ
                                document.getElementById("saveBtn").addEventListener("click", () => {
                                    const userData = {
                                        firstName: document.getElementById("firstName").value,
                                        lastName: document.getElementById("lastName").value,
                                        email: document.getElementById("email").value,
                                        phone: document.getElementById("phone").value,
                                    };

                                    localStorage.setItem("userInfo", JSON.stringify(userData));
                                    showMessage("✅ Changes saved successfully!");
                                });

                                // زر إعادة الضبط
                                document.getElementById("resetBtn").addEventListener("click", () => {
                                    localStorage.removeItem("userInfo");
                                    showMessage("↩️ Form has been reset!", "bg-gray-500");
                                });

                                // تحميل البيانات المحفوظة
                                window.addEventListener("DOMContentLoaded", () => {
                                    const saved = localStorage.getItem("userInfo");
                                    if (saved) {
                                        const data = JSON.parse(saved);
                                        document.getElementById("firstName").value = data.firstName || "";
                                        document.getElementById("lastName").value = data.lastName || "";
                                        document.getElementById("email").value = data.email || "";
                                        document.getElementById("phone").value = data.phone || "";
                                    }
                                });






                              
// === Change Password  

const secHeader = document.querySelector('[data-i18n="settings_security"]');

if (!secHeader) {
  console.warn('Security header not found (settings_security).');
} else {
  const secRoot = secHeader.closest('.rounded-2xl');
  const changePwBtn = secRoot?.querySelector('[data-i18n="change_password"]');

  const toast     = document.getElementById('secToast');
  const pwModal   = document.getElementById('pwModal');
  const pwClose   = document.getElementById('pwClose');
  const pwCancel  = document.getElementById('pwCancel');
  const pwForm    = document.getElementById('pwForm');
  const pwCurrent = document.getElementById('pwCurrent');
  const pwNew     = document.getElementById('pwNew');
  const pwConfirm = document.getElementById('pwConfirm');
  const pwError   = document.getElementById('pwError');
  const pwSubmit  = document.getElementById('pwSubmit');

  function showToast(text, color = 'bg-teal-600') {
    if (!toast) return;
    toast.textContent = text;
    toast.className = `fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white text-sm shadow-lg z-50 ${color} transition-opacity`;
    toast.style.opacity = '1';
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2500);
  }

  function openPwModal() { pwModal?.classList.remove('hidden'); pwModal?.classList.add('flex'); pwCurrent?.focus(); }
  function closePwModal() { pwModal?.classList.add('hidden'); pwModal?.classList.remove('flex'); pwForm?.reset(); pwError?.classList.add('hidden'); }

  function setLoading(btn, isLoading) {
    if (!btn) return;
    btn.disabled = isLoading;
    btn.dataset._oldText = isLoading ? btn.textContent : btn.dataset._oldText;
    btn.textContent = isLoading ? 'Saving...' : (btn.dataset._oldText || 'Save');
  }

  async function api(url, opts = {}) {
    const res = await fetch(url, {
      method: opts.method || 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts.body || {}),
      credentials: 'include'
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Something went wrong';
      throw new Error(msg);
    }
    return data || {};
  }

  changePwBtn?.addEventListener('click', openPwModal);
  pwClose?.addEventListener('click', closePwModal);
  pwCancel?.addEventListener('click', closePwModal);
  pwModal?.addEventListener('click', (e) => { if (e.target === pwModal) closePwModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pwModal && !pwModal.classList.contains('hidden')) closePwModal(); });

  pwForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    pwError?.classList.add('hidden');

    const current = (pwCurrent?.value || '').trim();
    const next    = (pwNew?.value || '').trim();
    const confirm = (pwConfirm?.value || '').trim();

    if (!current || !next || !confirm) {
      pwError.textContent = 'Please fill all fields.'; pwError.classList.remove('hidden'); return;
    }
    if (next.length < 8) {
      pwError.textContent = 'New password must be at least 8 characters.'; pwError.classList.remove('hidden'); return;
    }
    if (next !== confirm) {
      pwError.textContent = 'Passwords do not match.'; pwError.classList.remove('hidden'); return;
    }

    try {
      setLoading(pwSubmit, true);
      await api('/api/change-password', { body: { currentPassword: current, newPassword: next } });
      closePwModal();
      showToast('Password changed successfully.');
    } catch (err) {
      pwError.textContent = err.message || 'Failed to change password.'; pwError.classList.remove('hidden');
    } finally {
      setLoading(pwSubmit, false);
    }
  });
}
 


 
// ===== Addresses Actions =====
const addrToast   = document.getElementById('addrToast');
const addrModal   = document.getElementById('addrModal');
const addrClose   = document.getElementById('addrClose');
const addrCancel  = document.getElementById('addrCancel');
const addrForm    = document.getElementById('addrForm');

const addrId      = document.getElementById('addrId');
const addrLabel   = document.getElementById('addrLabel');
const addrLine1   = document.getElementById('addrLine1');
const addrLine2   = document.getElementById('addrLine2');
const addrCity    = document.getElementById('addrCity');
const addrCountry = document.getElementById('addrCountry');
const addrZip     = document.getElementById('addrZip');
const addrError   = document.getElementById('addrError');
const addrSubmit  = document.getElementById('addrSubmit');
const addrAddBtn  = document.getElementById('addrAddBtn');
const addrModalTitle = document.getElementById('addrModalTitle');
const addressesGrid = document.getElementById('addressesGrid');

// ===== Helper Functions =====
function showAddrToast(text, color = 'bg-teal-600') {
  addrToast.textContent = text;
  addrToast.className = `fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white text-sm shadow-lg z-50 ${color} transition-opacity`;
  addrToast.style.opacity = '1';
  addrToast.classList.remove('hidden');
  setTimeout(() => {
    addrToast.style.opacity = '0';
    setTimeout(() => addrToast.classList.add('hidden'), 400);
  }, 2500);
}

function openAddrModal(mode='add', data=null) {
  addrError.classList.add('hidden');
  addrForm.reset();
  if (mode === 'edit' && data) {
    addrModalTitle.setAttribute('data-i18n', 'modal.address_edit');
    addrModalTitle.textContent = 'Edit Address';
    addrId.value      = data.id || '';
    addrLabel.value   = data.label || '';
    const parts       = (data.full || '').split(',').map(s => s.trim());
    addrLine1.value   = data.line1 || '';
    addrLine2.value   = data.line2 || '';
    addrCity.value    = data.city  || (parts[1] || '');
    addrCountry.value = data.country || (parts[0] || '');
    addrZip.value     = data.zip || '';
  } else {
    addrModalTitle.setAttribute('data-i18n', 'modal.address_add');
    addrModalTitle.textContent = 'Add New Address';
    addrId.value = '';
  }
  addrModal.classList.remove('hidden');
  addrModal.classList.add('flex');
  addrLabel.focus();
}

function closeAddrModal() {
  addrModal.classList.add('hidden');
  addrModal.classList.remove('flex');
  addrForm.reset();
  addrError.classList.add('hidden');
}

function setLoading(btn, isLoading, txtSaving='Saving...', txtSave='Save') {
  btn.disabled = isLoading;
  btn.dataset._oldText = isLoading ? btn.textContent : btn.dataset._oldText;
  btn.textContent = isLoading ? txtSaving : (btn.dataset._oldText || txtSave);
}

async function api(url, opts = {}) {
  const res = await fetch(url, {
    method: opts.method || 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts.body || {}),
    credentials: 'include'
  });
  let data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || 'Something went wrong';
    throw new Error(msg);
  }
  return data || {};
}

// ===== Event Listeners =====

// فتح نافذة إضافة عنوان
addrAddBtn?.addEventListener('click', () => openAddrModal('add'));

// أزرار Edit / Remove
addressesGrid?.addEventListener('click', (e) => {
  const card = e.target.closest('[data-address-id]');
  if (!card) return;

  // تعديل عنوان
  if (e.target.classList.contains('addrEditBtn')) {
    const id = card.getAttribute('data-address-id');
    const label = card.querySelector('[data-i18n="address_home"]')?.textContent?.trim() || 'Home';
    const full  = card.querySelector('p.mt-1')?.textContent?.trim() || '';
    openAddrModal('edit', { id, label, full });
  }

  // إزالة عنوان بدون alert أو confirm
  if (e.target.classList.contains('addrRemoveBtn')) {
    const id = card.getAttribute('data-address-id');
    card.style.transition = 'opacity 0.4s ease';
    card.style.opacity = '0.3';

    api('/api/address/remove', { method: 'DELETE', body: { id } })
      .then(() => {
        setTimeout(() => {
          card.remove();
          showAddrToast('Address removed successfully.', 'bg-teal-600');
        }, 300);
      })
      .catch(err => {
        card.style.opacity = '1';
        showAddrToast(err.message || 'Failed to remove address.', 'bg-red-600');
      });
  }
});

// غلق النافذة
addrClose?.addEventListener('click', closeAddrModal);
addrCancel?.addEventListener('click', closeAddrModal);
addrModal?.addEventListener('click', (e) => { if (e.target === addrModal) closeAddrModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && addrModal && !addrModal.classList.contains('hidden')) closeAddrModal();
});

// حفظ العنوان (إضافة أو تعديل)
addrForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  addrError.classList.add('hidden');

  const id      = addrId.value.trim();
  const label   = addrLabel.value.trim();
  const line1   = addrLine1.value.trim();
  const line2   = addrLine2.value.trim();
  const city    = addrCity.value.trim();
  const country = addrCountry.value.trim();
  const zip     = addrZip.value.trim();

  if (!label || !line1 || !city || !country) {
    addrError.textContent = 'Please fill required fields (Label, Line 1, City, Country).';
    addrError.classList.remove('hidden');
    return;
  }

  try {
    setLoading(addrSubmit, true);

    if (id) {
      // تعديل عنوان موجود
      await api('/api/address/update', { body: { id, label, line1, line2, city, country, zip } });
      const card = addressesGrid.querySelector(`[data-address-id="${id}"]`);
      if (card) {
        card.querySelector('[data-i18n="address_home"]').textContent = label;
        card.querySelector('p.mt-1').textContent = `${country}, ${city}`;
      }
      showAddrToast('Address updated successfully.');
    } else {
      // إضافة عنوان جديد
      const result = await api('/api/address/create', { body: { label, line1, line2, city, country, zip } });
      const newId = result.id || `addr-${Date.now()}`;
      const article = document.createElement('article');
      article.className = 'rounded-xl border border-gray-200 p-4 hover:shadow-sm transition';
      article.setAttribute('data-address-id', newId);
      article.innerHTML = `
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs uppercase tracking-wide text-gray-500" data-i18n="address_home">${label}</p>
            <p class="mt-1 text-gray-800">${country}, ${city}</p>
          </div>
          <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 text-teal-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
            </svg>
          </span>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <button class="addrEditBtn px-3 py-1.5 rounded-full border border-gray-300 text-sm hover:bg-gray-100" data-i18n="address_edit">Edit</button>
          <button class="addrRemoveBtn px-3 py-1.5 rounded-full border border-gray-300 text-sm hover:bg-gray-100" data-i18n="address_remove">Remove</button>
        </div>`;
      addressesGrid.prepend(article);
      showAddrToast('Address added successfully.');
    }

    closeAddrModal();
  } catch (err) {
    addrError.textContent = err.message || 'Failed to save address.';
    addrError.classList.remove('hidden');
  } finally {
    setLoading(addrSubmit, false);
  }
});
 





 
// ====== Payments Actions ======

const addPaymentBtn = document.querySelector('[data-i18n="add_payment"]');
const removePaymentBtn = document.querySelector('[data-i18n="payment_remove"]');

const paymentToast = document.getElementById('paymentToast');
const addCardModal = document.getElementById('addCardModal');
const addCardClose = document.getElementById('addCardClose');
const cardCancel = document.getElementById('cardCancel');
const addCardForm = document.getElementById('addCardForm');
const cardNumber = document.getElementById('cardNumber');
const cardExpiry = document.getElementById('cardExpiry');
const cardCVV = document.getElementById('cardCVV');
const cardError = document.getElementById('cardError');
const cardSubmit = document.getElementById('cardSubmit');

function showToast(text, color = 'bg-teal-600') {
  paymentToast.textContent = text;
  paymentToast.className = `fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white text-sm shadow-lg z-50 ${color} transition-opacity`;
  paymentToast.style.opacity = '1';
  paymentToast.classList.remove('hidden');
  setTimeout(() => {
    paymentToast.style.opacity = '0';
    setTimeout(() => paymentToast.classList.add('hidden'), 400);
  }, 2500);
}

function openAddCardModal() {
  addCardModal.classList.remove('hidden');
  addCardModal.classList.add('flex');
  cardNumber.focus();
}

function closeAddCardModal() {
  addCardModal.classList.add('hidden');
  addCardModal.classList.remove('flex');
  addCardForm.reset();
  cardError.classList.add('hidden');
}

function setLoading(btn, isLoading) {
  btn.disabled = isLoading;
  btn.dataset._oldText = isLoading ? btn.textContent : btn.dataset._oldText;
  btn.textContent = isLoading ? 'Saving...' : (btn.dataset._oldText || 'Save');
}

async function api(url, opts = {}) {
  const res = await fetch(url, {
    method: opts.method || 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts.body || {}),
    credentials: 'include'
  });
  let data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || 'Something went wrong';
    throw new Error(msg);
  }
  return data || {};
}

// ====== Events ======
addPaymentBtn?.addEventListener('click', openAddCardModal);
addCardClose?.addEventListener('click', closeAddCardModal);
cardCancel?.addEventListener('click', closeAddCardModal);
addCardModal?.addEventListener('click', (e) => { if (e.target === addCardModal) closeAddCardModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !addCardModal.classList.contains('hidden')) closeAddCardModal(); });

addCardForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  cardError.classList.add('hidden');

  const number = cardNumber.value.trim();
  const expiry = cardExpiry.value.trim();
  const cvv = cardCVV.value.trim();

  if (!number || !expiry || !cvv) {
    cardError.textContent = 'Please fill all fields.';
    cardError.classList.remove('hidden');
    return;
  }

  if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(number)) {
    cardError.textContent = 'Enter a valid card number format (1234 5678 9012 3456).';
    cardError.classList.remove('hidden');
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    cardError.textContent = 'Enter expiry in MM/YY format.';
    cardError.classList.remove('hidden');
    return;
  }

  try {
    setLoading(cardSubmit, true);
    // استبدل هذا بمسار API الحقيقي
    await api('/api/add-card', { body: { number, expiry, cvv } });
    closeAddCardModal();
    showToast('Card added successfully.');
  } catch (err) {
    cardError.textContent = err.message || 'Failed to add card.';
    cardError.classList.remove('hidden');
  } finally {
    setLoading(cardSubmit, false);
  }
});

removePaymentBtn?.addEventListener('click', async () => {
  if (!confirm('Are you sure you want to remove this card?')) return;
  try {
    await api('/api/remove-card', { method: 'DELETE', body: { cardId: '5123' } }); // غيّر حسب الـID الحقيقي
    showToast('Card removed successfully.', 'bg-red-600');
  } catch (err) {
    showToast(err.message || 'Failed to remove card.', 'bg-red-600');
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

                            