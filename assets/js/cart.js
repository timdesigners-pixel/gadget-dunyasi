/* Sepet durumu — localStorage üzerinde kalıcı, tüm sayfalarda paylaşılır */
window.GD = window.GD || {};

(function(){
  const CART_KEY = 'gd_cart';
  const COUPON_KEY = 'gd_coupon';
  const COUPONS = { 'GADGET10': 10, 'GADGET20': 20 };

  function getCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function addToCart(item, qty){
    qty = qty || 1;
    const cart = getCart();
    const existing = cart.find(i => String(i.id) === String(item.id));
    if(existing){ existing.qty += qty; }
    else { cart.push({ id:item.id, name:item.name, price:item.price, icon:item.icon, grad:item.grad, qty }); }
    saveCart(cart);
    return cart;
  }
  function updateQty(id, qty){
    let cart = getCart();
    if(qty <= 0){ cart = cart.filter(i => String(i.id) !== String(id)); }
    else {
      const item = cart.find(i => String(i.id) === String(id));
      if(item) item.qty = qty;
    }
    saveCart(cart);
    return cart;
  }
  function removeFromCart(id){
    const cart = getCart().filter(i => String(i.id) !== String(id));
    saveCart(cart);
    return cart;
  }
  function clearCart(){
    localStorage.removeItem(CART_KEY);
  }
  function cartCount(cart){
    cart = cart || getCart();
    return cart.reduce((s,i) => s + i.qty, 0);
  }
  function cartSubtotal(cart){
    cart = cart || getCart();
    return cart.reduce((s,i) => s + i.qty * i.price, 0);
  }
  function getCoupon(){
    try { return JSON.parse(localStorage.getItem(COUPON_KEY)) || null; }
    catch(e){ return null; }
  }
  function applyCoupon(code){
    code = (code || '').trim().toUpperCase();
    const percent = COUPONS[code];
    if(!percent) return null;
    const coupon = { code, percent };
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    return coupon;
  }
  function clearCoupon(){
    localStorage.removeItem(COUPON_KEY);
  }
  function couponDiscount(subtotal){
    const c = getCoupon();
    return c ? Math.round(subtotal * c.percent / 100) : 0;
  }

  Object.assign(GD, {
    getCart, saveCart, addToCart, updateQty, removeFromCart, clearCart,
    cartCount, cartSubtotal, getCoupon, applyCoupon, clearCoupon, couponDiscount
  });

  /* Header'daki sepet ikonu + açılır panel — her sayfada aynı markup kullanılır */
  function renderHeaderCart(){
    const cartCountEl = document.getElementById('cartCount');
    if(!cartCountEl) return;
    const cart = getCart();
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    cartCountEl.textContent = cartCount(cart);
    cartTotalEl.textContent = GD.fmt(cartSubtotal(cart));
    if(cart.length === 0){
      cartItemsEl.innerHTML = `<div class="cart-empty">Sepetiniz henüz boş.<br>Ürün eklemek için "Sepete Ekle" butonunu kullanın.</div>`;
      return;
    }
    cartItemsEl.innerHTML = cart.map(i => `
      <div class="cart-row">
        <div class="thumb">${GD.mediaImgTag(i.icon, i.grad, i.name, {size:120})}</div>
        <div class="info">
          <div class="name">${i.name}</div>
          <div class="meta">${i.qty} adet · ${GD.fmt(i.price)}</div>
        </div>
        <button class="remove" data-id="${i.id}"><i data-lucide="x" style="width:15px;height:15px;"></i></button>
      </div>`).join('');
    GD.createIconsIn(cartItemsEl);
    cartItemsEl.querySelectorAll('.remove').forEach(btn=>{
      btn.addEventListener('click', ()=>{ removeFromCart(btn.dataset.id); renderHeaderCart(); });
    });
  }
  GD.renderHeaderCart = renderHeaderCart;

  function initHeaderCart(){
    const cartToggle = document.getElementById('cartToggle');
    const cartPanel = document.getElementById('cartPanel');
    if(!cartToggle) return;
    renderHeaderCart();
    cartToggle.addEventListener('click', (e)=>{
      e.stopPropagation();
      cartPanel.classList.toggle('open');
    });
    document.addEventListener('click', (e)=>{
      if(!cartPanel.contains(e.target) && !cartToggle.contains(e.target)){
        cartPanel.classList.remove('open');
      }
    });
    const goCartBtn = document.getElementById('cartGoBtn');
    if(goCartBtn) goCartBtn.addEventListener('click', ()=>{ window.location.href = 'cart.html'; });

    // Arama formunu URL'deki mevcut q/cat parametreleriyle senkronize et
    const params = new URLSearchParams(window.location.search);
    const searchInput = document.querySelector('#headerSearchForm input[name="q"]');
    const catSelect = document.getElementById('headerCatSelect');
    if(searchInput && params.get('q')) searchInput.value = params.get('q');
    if(catSelect && params.get('cat')) catSelect.value = params.get('cat');

    const accountLabel = document.getElementById('accountLabel');
    if(accountLabel){
      const session = GD.getSession ? GD.getSession() : null;
      accountLabel.textContent = session ? session.name.split(' ')[0] + ' ▾' : 'Hesap ve Listeler ▾';
    }
  }
  GD.initHeaderCart = initHeaderCart;

  GD.openCartPanel = function(){
    renderHeaderCart();
    const cartPanel = document.getElementById('cartPanel');
    if(!cartPanel) return;
    // Sepete ekleme butonunun tıklaması document'e kadar kabarcıklanıp paneli
    // hemen kapatmasın diye açma işlemini bu tık olayı bittikten sonraya ertele.
    setTimeout(()=> cartPanel.classList.add('open'), 0);
  };
})();
