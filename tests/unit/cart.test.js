import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import { loadGD } from './helpers/load-gd.js';

let GD;
beforeEach(() => { GD = loadGD(); });

const item = (id, price, extra = {}) => ({ id, name: 'Ürün ' + id, price, icon: 'smartphone', grad: '', ...extra });

describe('sepet işlemleri', () => {
  it('boş başlar', () => {
    expect(GD.getCart()).toEqual([]);
    expect(GD.cartCount()).toBe(0);
    expect(GD.cartSubtotal()).toBe(0);
  });

  it('addToCart yeni ürünü qty=1 ile ekler', () => {
    GD.addToCart(item(1, 100));
    expect(GD.getCart()).toHaveLength(1);
    expect(GD.getCart()[0].qty).toBe(1);
  });

  it('addToCart aynı ürünü tekrar eklerse adetleri birleştirir', () => {
    GD.addToCart(item(1, 100));
    GD.addToCart(item(1, 100), 2);
    const cart = GD.getCart();
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(3);
  });

  it('addToCart string ve number id\'yi aynı ürün sayar', () => {
    GD.addToCart(item(1, 100));
    GD.addToCart(item('1', 100));
    expect(GD.getCart()).toHaveLength(1);
    expect(GD.getCart()[0].qty).toBe(2);
  });

  it('updateQty adeti günceller, 0 ve altında ürünü siler', () => {
    GD.addToCart(item(1, 100));
    GD.updateQty(1, 5);
    expect(GD.getCart()[0].qty).toBe(5);
    GD.updateQty(1, 0);
    expect(GD.getCart()).toEqual([]);
  });

  it('updateQty bilinmeyen id için sepeti bozmaz', () => {
    GD.addToCart(item(1, 100));
    GD.updateQty(999, 3);
    expect(GD.getCart()).toHaveLength(1);
    expect(GD.getCart()[0].qty).toBe(1);
  });

  it('removeFromCart yalnızca ilgili ürünü çıkarır', () => {
    GD.addToCart(item(1, 100));
    GD.addToCart(item(2, 200));
    GD.removeFromCart('1');
    expect(GD.getCart().map(i => i.id)).toEqual([2]);
  });

  it('clearCart sepeti tamamen boşaltır', () => {
    GD.addToCart(item(1, 100));
    GD.clearCart();
    expect(GD.getCart()).toEqual([]);
  });

  it('cartCount ve cartSubtotal adet x fiyat üzerinden hesaplar', () => {
    GD.addToCart(item(1, 100), 2);
    GD.addToCart(item(2, 250), 1);
    expect(GD.cartCount()).toBe(3);
    expect(GD.cartSubtotal()).toBe(450);
  });

  it('bozuk localStorage verisinde boş sepete düşer', () => {
    localStorage.setItem('gd_cart', '{bozuk json');
    expect(GD.getCart()).toEqual([]);
  });

  it('sepet sayfalar arası localStorage üzerinden kalıcıdır', () => {
    GD.addToCart(item(1, 100));
    // Yeni sayfa yüklenmesini simüle et: script'ler yeniden çalışır, storage durur
    delete window.GD;
    (0, eval)(fs.readFileSync('assets/js/cart.js', 'utf8'));
    expect(window.GD.getCart()).toHaveLength(1);
  });
});

describe('kupon işlemleri', () => {
  it('geçerli kuponu büyük/küçük harf ve boşluk normalize ederek uygular', () => {
    const c = GD.applyCoupon('  gadget10 ');
    expect(c).toEqual({ code: 'GADGET10', percent: 10 });
    expect(GD.getCoupon()).toEqual(c);
  });

  it('geçersiz kuponu reddeder ve saklamaz', () => {
    expect(GD.applyCoupon('YOKBOYLEKOD')).toBeNull();
    expect(GD.getCoupon()).toBeNull();
  });

  it('couponDiscount yüzdeyi hesaplayıp tam sayıya yuvarlar', () => {
    GD.applyCoupon('GADGET10');
    expect(GD.couponDiscount(1000)).toBe(100);
    expect(GD.couponDiscount(999)).toBe(100); // 99.9 → 100
    expect(GD.couponDiscount(994)).toBe(99);  // 99.4 → 99
  });

  it('kupon yokken indirim 0 olur', () => {
    expect(GD.couponDiscount(1000)).toBe(0);
  });

  it('clearCoupon kuponu kaldırır', () => {
    GD.applyCoupon('GADGET20');
    GD.clearCoupon();
    expect(GD.getCoupon()).toBeNull();
    expect(GD.couponDiscount(1000)).toBe(0);
  });
});

describe('başlık sepet paneli (renderHeaderCart)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="cartCount"></span>
      <div id="cartItems"></div>
      <span id="cartTotal"></span>`;
  });

  it('boş sepette bilgilendirme mesajı gösterir', () => {
    GD.renderHeaderCart();
    expect(document.getElementById('cartItems').textContent).toContain('Sepetiniz henüz boş');
    expect(document.getElementById('cartCount').textContent).toBe('0');
  });

  it('ürünleri adet ve toplamla listeler', () => {
    GD.addToCart(item(1, 100), 2);
    GD.renderHeaderCart();
    expect(document.getElementById('cartCount').textContent).toBe('2');
    expect(document.getElementById('cartTotal').textContent).toBe(GD.fmt(200));
    expect(document.querySelectorAll('#cartItems .cart-row')).toHaveLength(1);
  });

  it('ürün adındaki HTML\'i çalıştırmaz (XSS regresyonu)', () => {
    GD.addToCart(item(1, 100, { name: '<img src=x onerror="window.hacked=1">' }));
    GD.renderHeaderCart();
    expect(document.querySelector('#cartItems img[src="x"]')).toBeNull();
    expect(document.querySelector('#cartItems .name').textContent).toContain('<img');
  });

  it('çıkar butonu ürünü sepetten siler', () => {
    GD.addToCart(item(1, 100));
    GD.renderHeaderCart();
    document.querySelector('#cartItems .remove').click();
    expect(GD.getCart()).toEqual([]);
    expect(document.getElementById('cartCount').textContent).toBe('0');
  });
});
