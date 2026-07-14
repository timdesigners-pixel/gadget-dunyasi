import { describe, it, expect, beforeEach } from 'vitest';
import { loadGD } from './helpers/load-gd.js';

let GD;
beforeEach(() => { GD = loadGD(); });

describe('katalog filtreleme (filterProducts)', () => {
  it('filtre verilmezse tüm ürünleri döner', () => {
    expect(GD.filterProducts()).toHaveLength(GD.PRODUCTS.length);
  });

  it('kategoriye göre filtreler', () => {
    const list = GD.filterProducts({ cat: 'telefon' });
    expect(list.length).toBeGreaterThan(0);
    expect(list.every(p => p.cat === 'telefon')).toBe(true);
  });

  it('rozete göre filtreler', () => {
    const list = GD.filterProducts({ badge: 'sale' });
    expect(list.length).toBeGreaterThan(0);
    expect(list.every(p => p.badge === 'sale')).toBe(true);
  });

  it('rozet ve kategori filtrelerini birlikte uygular', () => {
    const list = GD.filterProducts({ cat: 'oyun', badge: 'new' });
    expect(list.every(p => p.cat === 'oyun' && p.badge === 'new')).toBe(true);
  });

  it('arama ürün adında büyük/küçük harf duyarsız eşleşir', () => {
    const list = GD.filterProducts({ query: 'aurora' });
    expect(list.map(p => p.id)).toContain(1);
  });

  it('arama kategori etiketi ve açıklamada da eşleşir', () => {
    // "Ses & Kulaklık" kategori etiketi üzerinden
    expect(GD.filterProducts({ query: 'kulaklık' }).length).toBeGreaterThan(0);
    // yalnızca açıklamada geçen bir ifade
    expect(GD.filterProducts({ query: 'gürültü engelleme' }).length).toBeGreaterThan(0);
  });

  it('eşleşme yoksa boş liste döner', () => {
    expect(GD.filterProducts({ query: 'böyle bir ürün yok xyz' })).toEqual([]);
  });

  it('fiyata göre artan/azalan sıralar', () => {
    const asc = GD.filterProducts({ sortBy: 'price-asc' }).map(p => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = GD.filterProducts({ sortBy: 'price-desc' }).map(p => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it('puana göre azalan sıralar', () => {
    const ratings = GD.filterProducts({ sortBy: 'rating-desc' }).map(p => p.rating);
    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it('sıralama GD.PRODUCTS dizisinin kendisini değiştirmez', () => {
    const originalIds = GD.PRODUCTS.map(p => p.id);
    GD.filterProducts({ sortBy: 'price-desc' });
    expect(GD.PRODUCTS.map(p => p.id)).toEqual(originalIds);
  });
});
