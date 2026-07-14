import { describe, it, expect, beforeEach } from 'vitest';
import { loadGD } from './helpers/load-gd.js';

let GD;
beforeEach(() => { GD = loadGD(); });

describe('ürün verisi bütünlüğü', () => {
  it('tüm ürün id\'leri benzersizdir', () => {
    const ids = GD.PRODUCTS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('her ürünün kategorisi CATEGORIES\'te tanımlıdır', () => {
    const keys = new Set(GD.CATEGORIES.map(c => c.key));
    for (const p of GD.PRODUCTS) expect(keys, `ürün #${p.id} kategorisi: ${p.cat}`).toContain(p.cat);
  });

  it('her ürünün rozeti BADGE_LABEL\'da tanımlıdır', () => {
    for (const p of GD.PRODUCTS) expect(Object.keys(GD.BADGE_LABEL), `ürün #${p.id}`).toContain(p.badge);
  });

  it('indirimli ürünlerde eski fiyat güncel fiyattan büyüktür', () => {
    for (const p of GD.PRODUCTS.filter(p => p.oldPrice != null)) {
      expect(p.oldPrice, `ürün #${p.id}`).toBeGreaterThan(p.price);
    }
  });

  it('fiyatlar pozitif, puanlar 0-5 aralığındadır', () => {
    for (const p of GD.PRODUCTS) {
      expect(p.price, `ürün #${p.id}`).toBeGreaterThan(0);
      expect(p.rating, `ürün #${p.id}`).toBeGreaterThanOrEqual(0);
      expect(p.rating, `ürün #${p.id}`).toBeLessThanOrEqual(5);
    }
  });

  it('ürün ve set ikonlarının tamamı GD.ICONS\'ta çizilebilir', () => {
    for (const p of GD.PRODUCTS) expect(GD.ICONS[p.icon], `ürün #${p.id} ikonu: ${p.icon}`).toBeDefined();
    for (const s of GD.SETS) for (const t of s.thumbs) expect(GD.ICONS[t.icon], `set ${s.id} ikonu: ${t.icon}`).toBeDefined();
  });

  it('set id\'leri benzersiz ve set fiyatları indirimlidir', () => {
    const ids = GD.SETS.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of GD.SETS) expect(s.oldPrice, `set ${s.id}`).toBeGreaterThan(s.price);
  });
});

describe('yardımcı fonksiyonlar', () => {
  it('fmt TL fiyatını tr-TR biçiminde yazar', () => {
    expect(GD.fmt(34999)).toBe('34.999 TL');
    expect(GD.fmt(0)).toBe('0 TL');
  });

  it('getProduct string/number id ayrımı yapmaz, bilinmeyen için undefined döner', () => {
    expect(GD.getProduct(1)).toBeDefined();
    expect(GD.getProduct('1')).toBe(GD.getProduct(1));
    expect(GD.getProduct(9999)).toBeUndefined();
  });

  it('getCategoryLabel bilinen anahtarın etiketini, bilinmeyende anahtarın kendisini döner', () => {
    expect(GD.getCategoryLabel('telefon')).toBe('Telefon');
    expect(GD.getCategoryLabel('bilinmeyen')).toBe('bilinmeyen');
  });

  it('escapeHtml beş özel karakteri de dönüştürür', () => {
    expect(GD.escapeHtml(`<img src="x" & 'onerror'>`)).toBe('&lt;img src=&quot;x&quot; &amp; &#39;onerror&#39;&gt;');
    expect(GD.escapeHtml(null)).toBe('');
    expect(GD.escapeHtml(undefined)).toBe('');
  });

  it('parseGradient açı ve renkleri çözer, bozuk girişte varsayılana düşer', () => {
    expect(GD.parseGradient('linear-gradient(150deg,#22345c,#0e1526)')).toEqual({ angle: 150, c1: '#22345c', c2: '#0e1526' });
    expect(GD.parseGradient('bozuk')).toEqual({ angle: 150, c1: '#22345c', c2: '#0e1526' });
  });

  it('getGallery her ürün için 4 farklı açılı görsel üretir', () => {
    const gallery = GD.getGallery(GD.getProduct(1));
    expect(gallery).toHaveLength(4);
    expect(new Set(gallery.map(g => g.grad)).size).toBe(4);
    for (const g of gallery) expect(g.icon).toBe(GD.getProduct(1).icon);
  });

  it('mediaImgTag alt metnini kaçırılmış olarak gömer', () => {
    const tag = GD.mediaImgTag('smartphone', 'linear-gradient(150deg,#22345c,#0e1526)', '<script>kötü</script>');
    expect(tag).not.toContain('<script>');
    expect(tag).toContain('&lt;script&gt;');
    expect(tag).toContain('loading="lazy"');
  });
});

describe('müşteri yorumları', () => {
  it('ilk çağrıda örnek yorumları tohumlar', () => {
    const reviews = GD.getReviews();
    expect(reviews.length).toBeGreaterThan(0);
    expect(JSON.parse(localStorage.getItem('gd_reviews'))).toHaveLength(reviews.length);
  });

  it('addReview yorumu başa ekler ve puanı 1-5 aralığına sabitler', () => {
    const before = GD.getReviews().length;
    const r1 = GD.addReview({ name: 'Test', rating: 99, comment: 'çok iyi', productId: 1 });
    expect(r1.rating).toBe(5);
    const r2 = GD.addReview({ name: 'Test', rating: -3, comment: 'kötü' });
    expect(r2.rating).toBe(1);
    const reviews = GD.getReviews();
    expect(reviews).toHaveLength(before + 2);
    expect(reviews[0].id).toBe(r2.id);
  });

  it('isimsiz yorumcuya "Misafir" adı verilir', () => {
    expect(GD.addReview({ rating: 4, comment: 'idare eder' }).name).toBe('Misafir');
  });
});
