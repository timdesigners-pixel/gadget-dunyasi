import { test, expect } from '@playwright/test';

/* Tüm sayfalar konsol hatası ve yakalanmamış istisna olmadan yüklenmeli */
const PAGES = [
  '/index.html', '/products.html', '/product.html?id=1', '/cart.html',
  '/checkout.html', '/order-success.html', '/login.html', '/register.html',
  '/account.html', '/reviews.html', '/sets.html', '/rent-to-own.html',
  '/admin-login.html'
];

for (const path of PAGES) {
  test(`sayfa hatasız yüklenir: ${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
}

test('product.html geçersiz id ile de hatasız açılır', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('/product.html?id=9999');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
