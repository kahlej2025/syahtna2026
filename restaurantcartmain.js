 
(() => {
  const byId = (id) => document.getElementById(id);
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  const formatCents = (c) => fmt.format((c ?? 0) / 100);

  const DELIVERY_FEE_CENTS = 25 * 100;
  const cartContainer = document.querySelector('section.lg\\:col-span-2');
  const orderTypeEl = byId('order-type');

  const getService = () => (orderTypeEl?.dataset?.service || 'dinein').toLowerCase();
  const applyServiceUI = () => {
    const s = getService();
    const addr = byId('delivery-address');
    if (addr) addr.classList.toggle('hidden', s !== 'delivery');
  };

  const readPriceCents = (item) => {
    if (item.dataset.priceCents) return Math.max(0, parseInt(item.dataset.priceCents, 10) || 0);
    const p = parseFloat(item.dataset.price || '0');
    return Math.round((Number.isFinite(p) ? p : 0) * 100);
  };

  const clampQty = (input) => {
    const min = Number(input?.min) || 1;
    const raw = parseInt(input?.value ?? '1', 10);
    const q = Math.max(min, Number.isFinite(raw) ? raw : min);
    if (input && input.value != q) input.value = q;
    return q;
  };

  const calcLineTotalCents = (item) => {
    const price = readPriceCents(item);
    const qty = clampQty(item.querySelector('.quantity'));
    const total = price * qty;
    const out = item.querySelector('.line-total');
    if (out) out.textContent = formatCents(total);
    return total;
  };

  function recalc() {
    const items = [...document.querySelectorAll('.cart-item')];
    const itemsTotal = items.reduce((s, el) => s + calcLineTotalCents(el), 0);
    const delivery = items.length && getService() === 'delivery' ? DELIVERY_FEE_CENTS : 0;
    const grand = itemsTotal + delivery;
    byId('items-total')  && (byId('items-total').textContent  = formatCents(itemsTotal));
    byId('delivery-fee') && (byId('delivery-fee').textContent = formatCents(delivery));
    byId('grand-total')  && (byId('grand-total').textContent  = formatCents(grand));
  }

  function buildPayload() {
    const items = [...document.querySelectorAll('.cart-item')].map(el => {
      let extras = [];
      try { extras = JSON.parse(el.dataset.extras || '[]'); } catch {}
      return {
        product_id: el.dataset.productId,
        variant_id: el.dataset.variantId || null,
        extras,
        qty: clampQty(el.querySelector('.quantity')),
      };
    }).filter(x => x.product_id && x.qty > 0);

    if (!items.length) throw new Error('السلة فارغة.');

    const service = getService();
    const address = byId('addr')?.value?.trim() || '';
    if (service === 'delivery' && !address) throw new Error('من فضلك أدخل عنوان التوصيل.');

    const coupon = byId('coupon')?.value?.trim() || null;
    return { service, address, coupon, items };
  }

  async function submitOrder() {
    const btn = byId('place-order');
    try {
      btn && (btn.disabled = true, btn.textContent = 'جاري الإرسال...');
      const payload = buildPayload();

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // أضف CSRF لو عندك
        body: JSON.stringify(payload) // بدون أسعار
      });
      if (!res.ok) throw new Error(await res.text().catch(()=>'Server error'));

      const data = await res.json();
      // توقّع amounts بالهللات من السيرفر:
      // { order_id, currency: "SAR", amounts: { items_total, delivery_fee, vat, discount, grand_total } }
      if (data?.amounts) {
        byId('items-total')  && (byId('items-total').textContent  = formatCents(data.amounts.items_total));
        byId('delivery-fee') && (byId('delivery-fee').textContent = formatCents(data.amounts.delivery_fee));
        byId('grand-total')  && (byId('grand-total').textContent  = formatCents(data.amounts.grand_total));
      }
      // location.href = `/checkout/${encodeURIComponent(data.order_id)}`;
      alert('تم إنشاء الطلب بنجاح');
    } catch (e) {
      alert(e.message || 'تعذّر إرسال الطلب');
    } finally {
      btn && (btn.disabled = false, btn.textContent = 'إتمام الطلب');
    }
  }

  // تفويض أحداث
  if (cartContainer) {
    cartContainer.addEventListener('click', (e) => {
      const b = e.target.closest('.qty-btn, .remove-item');
      if (!b) return;
      if (b.classList.contains('qty-btn')) {
        const item = b.closest('.cart-item');
        const inp = item?.querySelector('.quantity');
        const delta = parseInt(b.dataset.delta || '0', 10);
        if (inp) inp.value = Math.max(parseInt(inp.min || '1', 10) || 1, (parseInt(inp.value || '1', 10) || 1) + delta);
        recalc();
      }
      if (b.classList.contains('remove-item')) {
        b.closest('.cart-item')?.remove();
        recalc();
      }
    });
    cartContainer.addEventListener('change', (e) => {
      if (e.target.matches('.quantity')) { clampQty(e.target); recalc(); }
    });
  }

  byId('place-order')?.addEventListener('click', submitOrder);

  // تهيئة
  applyServiceUI();
  recalc();
})();





 
(() => {
  // ==== مراجع عناصر الـ aside ====
  const aside = document.querySelector('aside');
  const orderTypeEl   = aside?.querySelector('#order-type');
  const serviceLabel  = aside?.querySelector('#service-label');
  const itemsTotalEl  = aside?.querySelector('#items-total');
  const deliveryFeeEl = aside?.querySelector('#delivery-fee');
  const grandTotalEl  = aside?.querySelector('#grand-total');

  // ==== تنسيقات ====
  const nf = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  const formatCents = (c) => nf.format((c ?? 0) / 100);

  // نفس الرسوم المستخدمة في العربّة
  const DELIVERY_FEE_CENTS = 25 * 100;

  // ==== خدمة الطلب ====
  const labelMap = { dinein: 'Dine-in', pickup: 'Pickup', delivery: 'Delivery' };
  function getSelectedService() {
    const s = (orderTypeEl?.dataset?.service || 'dinein').toLowerCase();
    return ['dinein','pickup','delivery'].includes(s) ? s : 'dinein';
  }
  function applyServiceUI() {
    const s = getSelectedService();
    if (serviceLabel) serviceLabel.textContent = labelMap[s] || 'Dine-in';
  }

  // ==== حسابات العربّة (نفس منطقك، مختصر هنا) ====
  const cartContainer = document.querySelector('section.lg\\:col-span-2');

  function readPriceCents(item) {
    if (item.dataset.priceCents) return Math.max(0, parseInt(item.dataset.priceCents, 10) || 0);
    const p = parseFloat(item.dataset.price || '0');
    return Math.round((Number.isFinite(p) ? p : 0) * 100);
  }
  function clampQty(input) {
    const min = Number(input?.min) || 1;
    const raw = parseInt(input?.value ?? '1', 10);
    const q = Math.max(min, Number.isFinite(raw) ? raw : min);
    if (input && input.value != q) input.value = q;
    return q;
  }
  function calcLineTotalCents(item) {
    const price = readPriceCents(item);
    const qty = clampQty(item.querySelector('.quantity'));
    const total = price * qty;
    const out = item.querySelector('.line-total');
    if (out) out.textContent = formatCents(total);
    return total;
  }

  // ==== إعادة الحساب وتحديث الـ aside ====
  function recalcAndRenderSummary() {
    const items = [...document.querySelectorAll('.cart-item')];
    const itemsTotal = items.reduce((s, el) => s + calcLineTotalCents(el), 0);
    const isDelivery = getSelectedService() === 'delivery';
    const delivery = items.length ? (isDelivery ? DELIVERY_FEE_CENTS : 0) : 0;
    const grand = itemsTotal + delivery;

    if (itemsTotalEl)  itemsTotalEl.textContent  = formatCents(itemsTotal);
    if (deliveryFeeEl) deliveryFeeEl.textContent = formatCents(delivery);
    if (grandTotalEl)  grandTotalEl.textContent  = formatCents(grand);
  }

  // ==== تفويض أحداث من العربّة لتحديث الملخص ====
  if (cartContainer) {
    cartContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.qty-btn, .remove-item');
      if (!btn) return;

      if (btn.classList.contains('qty-btn')) {
        const item = btn.closest('.cart-item');
        const inp = item?.querySelector('.quantity');
        const delta = parseInt(btn.dataset.delta || '0', 10);
        if (inp) inp.value = Math.max(parseInt(inp.min || '1', 10) || 1, (parseInt(inp.value || '1', 10) || 1) + delta);
      }
      if (btn.classList.contains('remove-item')) {
        btn.closest('.cart-item')?.remove();
      }
      recalcAndRenderSummary();
    });

    cartContainer.addEventListener('change', (e) => {
      if (e.target.matches('.quantity')) {
        clampQty(e.target);
        recalcAndRenderSummary();
      }
    });
  }

  // ==== تهيئة أولى ====
  applyServiceUI();
  recalcAndRenderSummary();

  // ملاحظة: لو عندك أزرار تغيّر نوع الخدمة في مكان آخر،
  // استدعِ applyServiceUI() ثم recalcAndRenderSummary() بعد تبديل data-service.
})();
 

 
