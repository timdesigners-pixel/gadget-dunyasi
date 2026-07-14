/*
 * Kategori / Ürün / Etiket veri katmanı (admin panelinden yönetilebilir).
 * data.js'teki GD.CATEGORIES / GD.PRODUCTS / GD.BADGE_LABEL derleme-zamanı
 * varsayılan değerlerdir; bu dosya onları localStorage üzerinde bir
 * "üzerine yazma" katmanıyla sarar, böylece admin panelindeki değişiklikler
 * gerçekten mağaza sayfalarına yansır. Gerçek bir veritabanı değildir.
 */
window.GD = window.GD || {};

(function(){
  // _v2: gerçek gadget kataloğu eklendi; eski önbelleklenmiş seed'i geçersiz kılar
  const CATS_KEY = 'gd_categories_v2';
  const PRODUCTS_KEY = 'gd_products_v2';
  const TAGS_KEY = 'gd_tags';

  function ensureSeeded(key, seedFn){
    let stored;
    try { stored = JSON.parse(localStorage.getItem(key)); }
    catch(e){ stored = null; }
    if(!Array.isArray(stored)){
      stored = seedFn();
      localStorage.setItem(key, JSON.stringify(stored));
    }
    return stored;
  }

  /* ---------- Kategoriler ---------- */
  function getCategories(){ return ensureSeeded(CATS_KEY, () => GD.CATEGORIES.slice()); }
  function saveCategories(list){ localStorage.setItem(CATS_KEY, JSON.stringify(list)); }

  /* ---------- Etiketler (renkli, admin tarafından yönetilebilir) ---------- */
  function getTags(){
    return ensureSeeded(TAGS_KEY, () => ([
      { key:'bestseller', label:'Çok Satan', color:'#ff7a1a', textColor:'#0b1120' },
      { key:'new',        label:'Yeni',       color:'#2ed3a3', textColor:'#062018' },
      { key:'sale',        label:'İndirim',    color:'#ff5b6b', textColor:'#2a0505' }
    ]));
  }
  function saveTags(list){ localStorage.setItem(TAGS_KEY, JSON.stringify(list)); }
  function getTag(key){ return getTags().find(t => t.key === key) || null; }

  /* Ürün kartlarındaki etiket rozetini (badge) üretir - CSS sınıfına değil,
     etiketin kendi rengine bağlıdır, böylece admin panelinde eklenen özel
     etiketler de doğru renkte görünür. */
  function renderBadge(key){
    if(!key) return '';
    const tag = getTag(key);
    if(!tag) return '';
    return `<span class="product-badge" style="background:${tag.color};color:${tag.textColor};">${GD.escapeHtml(tag.label)}</span>`;
  }

  /* ---------- Ürünler ---------- */
  function getAllProducts(){ return ensureSeeded(PRODUCTS_KEY, () => GD.PRODUCTS.slice()); }
  function saveAllProducts(list){ localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); }
  function getProductById(id){ return getAllProducts().find(p => String(p.id) === String(id)) || null; }
  function upsertProduct(product){
    const list = getAllProducts();
    const idx = list.findIndex(p => String(p.id) === String(product.id));
    if(idx >= 0) list[idx] = product; else list.push(product);
    saveAllProducts(list);
    return product;
  }
  function deleteProduct(id){
    saveAllProducts(getAllProducts().filter(p => String(p.id) !== String(id)));
  }
  function nextProductId(){
    return getAllProducts().reduce((max,p) => Math.max(max, Number(p.id) || 0), 0) + 1;
  }

  Object.assign(GD, {
    getCategories, saveCategories,
    getTags, saveTags, getTag, renderBadge,
    getAllProducts, saveAllProducts, getProduct: getProductById, getProductById,
    upsertProduct, deleteProduct, nextProductId
  });
})();
