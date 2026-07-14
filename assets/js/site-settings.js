/*
 * Site ayarları, ödeme yöntemleri ve kargo entegrasyonu (demo).
 * Hepsi localStorage'da tutulur ve admin panelinden yönetilir; gerçek bir
 * ödeme sağlayıcısı veya kargo firması API'sine bağlı değildir.
 */
window.GD = window.GD || {};

(function(){
  const SETTINGS_KEY = 'gd_settings';
  const PAYMENTS_KEY = 'gd_payment_methods';
  const CARRIERS_KEY = 'gd_carriers';

  const DEFAULT_SETTINGS = {
    siteName: 'gadgetdünyası',
    contactEmail: 'destek@gadgetdunyasi.com',
    contactPhone: '0850 000 00 00',
    currency: 'TL',
    freeShippingThreshold: 150,
    shippingFee: 49.90,
    maintenanceMode: false
  };

  function getSettings(){
    let stored;
    try { stored = JSON.parse(localStorage.getItem(SETTINGS_KEY)); }
    catch(e){ stored = null; }
    return Object.assign({}, DEFAULT_SETTINGS, stored || {});
  }
  function saveSettings(patch){
    const merged = Object.assign(getSettings(), patch);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  }

  /* ---------- Ödeme Yöntemleri ---------- */
  function getPaymentMethods(){
    let stored;
    try { stored = JSON.parse(localStorage.getItem(PAYMENTS_KEY)); }
    catch(e){ stored = null; }
    if(!Array.isArray(stored)){
      stored = [
        { key:'card', label:'Kredi / Banka Kartı', sub:'Visa, Mastercard, Troy', icon:'credit-card', enabled:true },
        { key:'cash', label:'Kapıda Ödeme', sub:'Nakit veya kartla teslimatta öde', icon:'banknote', enabled:true },
        { key:'transfer', label:'Banka Havalesi / EFT', sub:'Sipariş onayından sonra IBAN gönderilir', icon:'banknote', enabled:false }
      ];
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify(stored));
    }
    return stored;
  }
  function savePaymentMethods(list){ localStorage.setItem(PAYMENTS_KEY, JSON.stringify(list)); }

  /* ---------- Kargo Entegrasyonu (demo) ---------- */
  function getCarriers(){
    let stored;
    try { stored = JSON.parse(localStorage.getItem(CARRIERS_KEY)); }
    catch(e){ stored = null; }
    if(!Array.isArray(stored)){
      stored = [
        { id:'yurtici', name:'Yurtiçi Kargo', enabled:true,  apiKeyMasked:'YK-••••-8841' },
        { id:'aras',    name:'Aras Kargo',    enabled:true,  apiKeyMasked:'AR-••••-2290' },
        { id:'mng',     name:'MNG Kargo',     enabled:false, apiKeyMasked:'MN-••••-1187' },
        { id:'ptt',     name:'PTT Kargo',     enabled:false, apiKeyMasked:'PT-••••-5502' }
      ];
      localStorage.setItem(CARRIERS_KEY, JSON.stringify(stored));
    }
    return stored;
  }
  function saveCarriers(list){ localStorage.setItem(CARRIERS_KEY, JSON.stringify(list)); }
  function generateTrackingNumber(carrierId){
    const prefix = (carrierId || 'GD').slice(0,3).toUpperCase();
    return `${prefix}${Date.now().toString().slice(-9)}`;
  }

  Object.assign(GD, {
    getSettings, saveSettings,
    getPaymentMethods, savePaymentMethods,
    getCarriers, saveCarriers, generateTrackingNumber
  });
})();
