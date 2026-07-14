/* Ödeme sayfası iş mantığı — DOM'dan bağımsız tutulur ki birim testleri yazılabilsin */
window.GD = window.GD || {};

(function(){
  const FREE_SHIPPING_THRESHOLD = 150;
  const SHIPPING_FEE = 49.90;

  /* Sepetten sipariş özetini hesaplar: ara toplam, kupon indirimi, kargo, genel toplam */
  function computeTotals(cart){
    cart = cart || GD.getCart();
    if(cart.length === 0){
      return { subtotal:0, discount:0, shipping:0, total:0 };
    }
    const subtotal = GD.cartSubtotal(cart);
    const discount = GD.couponDiscount(subtotal);
    const afterDiscount = subtotal - discount;
    const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return { subtotal, discount, shipping, total: afterDiscount + shipping };
  }

  function isValidEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim());
  }
  function isValidPhone(v){
    return (v || '').replace(/\D/g,'').length >= 10;
  }
  function isValidCardNumber(v){
    return (v || '').replace(/\s/g,'').length === 16;
  }
  function isValidCardExpiry(v){
    return /^\d{2}\/\d{2}$/.test((v || '').trim());
  }
  function isValidCardCvv(v){
    return /^\d{3,4}$/.test((v || '').trim());
  }

  /* Girdi maskeleri: kullanıcı yazarken kart alanlarını biçimlendirir */
  function formatCardNumber(v){
    const digits = (v || '').replace(/\D/g,'').slice(0,16);
    return digits.replace(/(.{4})/g,'$1 ').trim();
  }
  function formatCardExpiry(v){
    const digits = (v || '').replace(/\D/g,'').slice(0,4);
    return digits.length > 2 ? digits.slice(0,2) + '/' + digits.slice(2) : digits;
  }
  function formatCardCvv(v){
    return (v || '').replace(/\D/g,'').slice(0,4);
  }

  GD.checkout = {
    FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, computeTotals,
    isValidEmail, isValidPhone, isValidCardNumber, isValidCardExpiry, isValidCardCvv,
    formatCardNumber, formatCardExpiry, formatCardCvv
  };
})();
