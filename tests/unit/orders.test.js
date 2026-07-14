import { describe, it, expect, beforeEach } from 'vitest';
import { loadGD } from './helpers/load-gd.js';

let GD;
beforeEach(() => { GD = loadGD(); });

describe('sipariş kayıtları', () => {
  const details = { items: [{ id: 1, qty: 2, price: 100 }], subtotal: 200, discount: 0, shipping: 0, total: 200, status: 'Onaylandı' };

  it('createOrder GD- önekli id ve ISO tarih üretir', () => {
    const order = GD.createOrder(details);
    expect(order.id).toMatch(/^GD-[0-9A-Z]+$/);
    expect(() => new Date(order.date).toISOString()).not.toThrow();
    expect(order.total).toBe(200);
  });

  it('yeni sipariş listenin başına eklenir ve kalıcıdır', () => {
    const first = GD.createOrder(details);
    const second = GD.createOrder({ ...details, total: 999 });
    const orders = GD.getOrders();
    expect(orders).toHaveLength(2);
    expect(orders[0].id).toBe(second.id);
    expect(orders[1].id).toBe(first.id);
  });

  it('getOrder id ile bulur, bilinmeyen id için null döner', () => {
    const order = GD.createOrder(details);
    expect(GD.getOrder(order.id).id).toBe(order.id);
    expect(GD.getOrder('GD-YOK')).toBeNull();
  });

  it('bozuk localStorage verisinde boş sipariş listesine düşer', () => {
    localStorage.setItem('gd_orders', 'çöp');
    expect(GD.getOrders()).toEqual([]);
  });
});

describe('kullanıcı hesapları', () => {
  const acc = { name: 'Ayşe Yılmaz', email: 'ayse@example.com', password: 'gizli123' };

  it('createUserAccount hesabı kaydeder ama oturum AÇMAZ (2FA öncesi)', () => {
    expect(GD.createUserAccount(acc)).toEqual({ ok: true });
    expect(GD.getUsers()).toHaveLength(1);
    expect(GD.getSession()).toBeNull();
  });

  it('aynı e-postayla ikinci hesabı reddeder (büyük/küçük harf duyarsız)', () => {
    GD.createUserAccount(acc);
    const res = GD.createUserAccount({ ...acc, email: '  AYSE@EXAMPLE.COM ' });
    expect(res.ok).toBe(false);
    expect(res.error).toContain('zaten');
    expect(GD.getUsers()).toHaveLength(1);
  });

  it('findUser doğru bilgilerle kullanıcıyı bulur', () => {
    GD.createUserAccount(acc);
    expect(GD.findUser({ email: 'AYSE@example.com', password: 'gizli123' })).not.toBeNull();
    expect(GD.findUser({ email: acc.email, password: 'yanlış' })).toBeNull();
    expect(GD.findUser({ email: 'yok@example.com', password: 'gizli123' })).toBeNull();
  });
});

describe('sosyal medya girişi', () => {
  it('yeni kullanıcıyı oluşturup doğrudan oturum açar', () => {
    const res = GD.socialLogin('google', { name: 'Can Demir', email: 'Can@Example.com' });
    expect(res.ok).toBe(true);
    expect(GD.getUsers()).toHaveLength(1);
    expect(GD.getUsers()[0]).toMatchObject({ email: 'can@example.com', password: null, provider: 'google' });
    expect(GD.getSession()).toMatchObject({ name: 'Can Demir', provider: 'google' });
  });

  it('mevcut hesabı yeniden kullanır, kopya oluşturmaz', () => {
    GD.createUserAccount({ name: 'Can Demir', email: 'can@example.com', password: 'x' });
    GD.socialLogin('facebook', { name: 'Başka İsim', email: 'can@example.com' });
    expect(GD.getUsers()).toHaveLength(1);
    expect(GD.getSession().name).toBe('Can Demir'); // kayıtlı isim korunur
  });
});

describe('oturum yönetimi', () => {
  it('setSession/getSession/logout döngüsü çalışır', () => {
    GD.setSession({ name: 'Test', email: 't@t.com', provider: null });
    expect(GD.getSession().email).toBe('t@t.com');
    GD.logout();
    expect(GD.getSession()).toBeNull();
  });

  it('bozuk session verisinde null döner', () => {
    localStorage.setItem('gd_session', '{bozuk');
    expect(GD.getSession()).toBeNull();
  });
});

describe('yönetici girişi', () => {
  it('doğru kimlik bilgilerini kabul eder (e-posta harf duyarsız)', () => {
    expect(GD.checkAdminCredentials({ email: 'ADMIN@gadgetdunyasi.com ', password: 'admin123' })).toBe(true);
  });

  it('yanlış parola veya e-postayı reddeder', () => {
    expect(GD.checkAdminCredentials({ email: 'admin@gadgetdunyasi.com', password: 'ADMIN123' })).toBe(false);
    expect(GD.checkAdminCredentials({ email: 'baska@mail.com', password: 'admin123' })).toBe(false);
  });

  it('admin oturumu kullanıcı oturumundan bağımsızdır', () => {
    GD.setAdminSession();
    expect(GD.getAdminSession()).not.toBeNull();
    expect(GD.getSession()).toBeNull();
    GD.logoutAdmin();
    expect(GD.getAdminSession()).toBeNull();
  });
});
