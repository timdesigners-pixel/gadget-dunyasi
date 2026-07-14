# Testler

## Kurulum

```bash
npm install
```

## Birim testleri (Vitest + jsdom)

```bash
npm test          # tek sefer çalıştır
npm run test:watch
```

`tests/unit/` altındaki testler `assets/js/` dosyalarını sayfalardaki gibi
klasik `<script>` olarak yükler (bkz. `tests/unit/helpers/load-gd.js`).
Kapsanan alanlar:

- `cart.test.js` — sepet işlemleri, kupon/indirim hesabı, localStorage
  dayanıklılığı, başlık sepet paneli ve XSS regresyonu
- `orders.test.js` — sipariş kayıtları, kullanıcı hesapları, sosyal giriş,
  oturum ve yönetici oturumu
- `data.test.js` — ürün/set veri bütünlüğü, `fmt`, `escapeHtml`, galeri
  yardımcıları, müşteri yorumları
- `checkout-logic.test.js` — sipariş toplamı (kargo eşiği, kupon), form
  doğrulayıcıları, kart girdi maskeleri
- `catalog.test.js` — katalog filtreleme/arama/sıralama

## Uçtan uca testler (Playwright)

```bash
npm run test:e2e
```

`tests/e2e/` üç kritik akışı gerçek tarayıcıda doğrular:

1. `purchase.spec.js` — katalog → sepet → kupon → ödeme → sipariş onayı
2. `auth.spec.js` — kayıt/giriş + 2 adımlı doğrulama (demo kodu `123456`)
3. `admin.spec.js` — yönetici girişi ve panel koruması

Statik site `scripts/serve.mjs` ile 4173 portunda otomatik ayağa kalkar.
Sistemde hazır bir Chromium varsa `PLAYWRIGHT_CHROMIUM_PATH` ile
gösterilebilir; yoksa `npx playwright install chromium` yeterlidir.

## Hepsi birden

```bash
npm run test:all
```
