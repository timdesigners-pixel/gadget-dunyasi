import { describe, it, expect, beforeEach } from 'vitest';
import { loadGD } from './helpers/load-gd.js';

let GD, CK;
beforeEach(() => { GD = loadGD(); CK = GD.checkout; });

const cartOf = (...pairs) => pairs.map(([price, qty], i) => ({ id: i + 1, name: 'Ürün', price, qty }));

describe('sipariş toplamı hesabı (computeTotals)', () => {
  it('boş sepette tüm kalemler sıfırdır', () => {
    expect(CK.computeTotals([])).toEqual({ subtotal: 0, discount: 0, shipping: 0, total: 0 });
  });

  it('eşiğin altında kargo ücreti ekler', () => {
    const t = CK.computeTotals(cartOf([100, 1]));
    expect(t.shipping).toBe(CK.SHIPPING_FEE);
    expect(t.total).toBeCloseTo(100 + CK.SHIPPING_FEE);
  });

  it('tam eşikte (150 TL) kargo ücretsiz olur', () => {
    const t = CK.computeTotals(cartOf([150, 1]));
    expect(t.shipping).toBe(0);
    expect(t.total).toBe(150);
  });

  it('kupon indirimini ara toplam üzerinden düşer', () => {
    GD.applyCoupon('GADGET10');
    const t = CK.computeTotals(cartOf([500, 2])); // 1000 TL
    expect(t).toEqual({ subtotal: 1000, discount: 100, shipping: 0, total: 900 });
  });

  it('kupon toplamı eşiğin altına düşürürse kargo ücreti geri gelir', () => {
    GD.applyCoupon('GADGET20');
    const t = CK.computeTotals(cartOf([160, 1])); // 160 - 32 = 128 < 150
    expect(t.discount).toBe(32);
    expect(t.shipping).toBe(CK.SHIPPING_FEE);
    expect(t.total).toBeCloseTo(128 + CK.SHIPPING_FEE);
  });

  it('gerçek katalog senaryosu: en ucuz ürün bile ücretsiz kargo eşiğini geçer', () => {
    const cheapest = [...GD.PRODUCTS].sort((a, b) => a.price - b.price)[0];
    const t = CK.computeTotals([{ ...cheapest, qty: 1 }]);
    expect(t.shipping).toBe(0);
  });
});

describe('form doğrulayıcıları', () => {
  it('e-posta doğrulaması', () => {
    expect(CK.isValidEmail('ali@example.com')).toBe(true);
    expect(CK.isValidEmail('ali@example')).toBe(false);
    expect(CK.isValidEmail('ali example@x.com')).toBe(false);
    expect(CK.isValidEmail('')).toBe(false);
  });

  it('telefon: biçimlendirme karakterlerinden bağımsız en az 10 rakam ister', () => {
    expect(CK.isValidPhone('(555) 123 45 67')).toBe(true);
    expect(CK.isValidPhone('0555 123 45 67')).toBe(true);
    expect(CK.isValidPhone('555 123')).toBe(false);
  });

  it('kart numarası: boşluklar hariç tam 16 hane', () => {
    expect(CK.isValidCardNumber('1234 5678 9012 3456')).toBe(true);
    expect(CK.isValidCardNumber('1234567890123456')).toBe(true);
    expect(CK.isValidCardNumber('1234 5678 9012 345')).toBe(false);
  });

  it('son kullanma tarihi AA/YY biçiminde olmalı', () => {
    expect(CK.isValidCardExpiry('12/29')).toBe(true);
    expect(CK.isValidCardExpiry('1229')).toBe(false);
    expect(CK.isValidCardExpiry('12/2029')).toBe(false);
  });

  it('CVV 3-4 hane olmalı', () => {
    expect(CK.isValidCardCvv('123')).toBe(true);
    expect(CK.isValidCardCvv('1234')).toBe(true);
    expect(CK.isValidCardCvv('12')).toBe(false);
    expect(CK.isValidCardCvv('12a')).toBe(false);
  });
});

describe('girdi maskeleri', () => {
  it('kart numarasını 4\'lü gruplara böler ve 16 haneyle sınırlar', () => {
    expect(CK.formatCardNumber('1234567890123456789')).toBe('1234 5678 9012 3456');
    expect(CK.formatCardNumber('12345')).toBe('1234 5');
    expect(CK.formatCardNumber('12ab34')).toBe('1234');
  });

  it('son kullanma tarihine otomatik / ekler', () => {
    expect(CK.formatCardExpiry('1229')).toBe('12/29');
    expect(CK.formatCardExpiry('12')).toBe('12');
    expect(CK.formatCardExpiry('12/29')).toBe('12/29');
  });

  it('CVV yalnızca rakam kabul eder, 4 haneyle sınırlar', () => {
    expect(CK.formatCardCvv('12a34x5')).toBe('1234');
  });
});
