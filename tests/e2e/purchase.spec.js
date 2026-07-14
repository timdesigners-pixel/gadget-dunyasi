import { test, expect } from '@playwright/test';

/* Kritik akış 1: katalog → sepet → kupon → ödeme → sipariş onayı */
test('tam satın alma akışı sipariş onayıyla biter', async ({ page }) => {
  // Katalogdan ilk ürünü sepete ekle
  await page.goto('/products.html');
  await page.locator('.product-add').first().click();
  await expect(page.locator('#cartCount')).toHaveText('1');

  // Sepet sayfası: kupon uygula
  await page.goto('/cart.html');
  await expect(page.locator('#sumSubtotal')).toContainText('TL');
  await page.fill('#couponInput', 'gadget10'); // küçük harf de kabul edilmeli
  await page.click('#couponApplyBtn');
  await expect(page.locator('#couponNote')).toContainText('GADGET10');
  await expect(page.locator('#sumDiscountRow')).toBeVisible();

  // Ödeme sayfası: teslimat + kart bilgileri
  await page.click('#checkoutBtn');
  await expect(page).toHaveURL(/checkout\.html/);
  await expect(page.locator('#ckDiscountRow')).toBeVisible();

  await page.fill('#fullName', 'Test Alıcı');
  await page.fill('#email', 'test@example.com');
  await page.fill('#phone', '0555 123 45 67');
  await page.fill('#address', 'Deneme Mah. Test Sok. No:1');
  await page.fill('#city', 'İstanbul');
  await page.fill('#zip', '34000');
  await page.fill('#cardName', 'Test Alıcı');
  await page.fill('#cardNumber', '1234567890123456');
  await page.fill('#cardExpiry', '1229');
  await expect(page.locator('#cardExpiry')).toHaveValue('12/29'); // girdi maskesi
  await page.fill('#cardCvv', '123');
  await page.click('#checkoutForm button[type="submit"]');

  // Sipariş onay sayfası: sipariş numarası görünür, sepet boşalmıştır
  await expect(page).toHaveURL(/order-success\.html\?order=GD-/);
  await expect(page.locator('#successWrap')).toContainText('GD-');
  await expect(page.locator('#cartCount')).toHaveText('0');
});

test('eksik/hatalı formda sipariş oluşmaz ve hata gösterilir', async ({ page }) => {
  await page.goto('/products.html');
  await page.locator('.product-add').first().click();
  await page.goto('/checkout.html');

  await page.fill('#email', 'gecersiz-eposta');
  await page.click('#checkoutForm button[type="submit"]');

  await expect(page).toHaveURL(/checkout\.html/); // sayfadan ayrılmadık
  await expect(page.locator('#err-fullName')).toContainText('gerekli');
  await expect(page.locator('#err-email')).toContainText('Geçerli bir e-posta');
});

test('boş sepetle ödeme sayfası boş durum mesajı gösterir', async ({ page }) => {
  await page.goto('/checkout.html');
  await expect(page.locator('#checkoutEmptyState')).toBeVisible();
});
