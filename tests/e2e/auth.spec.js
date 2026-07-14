import { test, expect } from '@playwright/test';

const OTP = '123456';

async function fillOtp(page, code = OTP) {
  const digits = page.locator('.otp-digit');
  for (let i = 0; i < 6; i++) await digits.nth(i).fill(code[i]);
  await page.click('#otpForm button[type="submit"]');
}

/* Kritik akış 2: kayıt → 2FA → hesap; ardından çıkış ve tekrar giriş */
test('kayıt + 2FA doğrulaması hesap sayfasında oturum açar', async ({ page }) => {
  await page.goto('/register.html');
  await page.fill('#regName', 'Deniz Test');
  await page.fill('#regEmail', 'deniz@example.com');
  await page.fill('#regPassword', 'sifre123');
  await page.fill('#regPasswordConfirm', 'sifre123');
  await page.click('#registerForm button[type="submit"]');

  await expect(page.locator('#stepOtp')).toBeVisible();
  await fillOtp(page);

  await expect(page).toHaveURL(/account\.html/);
  await expect(page.locator('#accountWrap')).toContainText('Deniz Test');
  await expect(page.locator('#accountLabel')).toContainText('Deniz');
});

test('yanlış 2FA kodu oturum açtırmaz', async ({ page }) => {
  await page.goto('/register.html');
  await page.fill('#regName', 'Deniz Test');
  await page.fill('#regEmail', 'deniz@example.com');
  await page.fill('#regPassword', 'sifre123');
  await page.fill('#regPasswordConfirm', 'sifre123');
  await page.click('#registerForm button[type="submit"]');

  await fillOtp(page, '999999');
  await expect(page.locator('#err-otp')).toContainText('Kod hatalı');
  await expect(page).toHaveURL(/register\.html/);
});

test('kayıtlı kullanıcı e-posta/şifre + 2FA ile giriş yapar', async ({ page }) => {
  await page.goto('/login.html');
  // Kayıtlı kullanıcıyı hazırla (localStorage tabanlı demo hesap sistemi)
  await page.evaluate(() => GD.createUserAccount({ name: 'Ece Kaya', email: 'ece@example.com', password: 'parola1' }));

  await page.fill('#loginEmail', 'ece@example.com');
  await page.fill('#loginPassword', 'parola1');
  await page.click('#loginForm button[type="submit"]');

  await expect(page.locator('#stepOtp')).toBeVisible();
  await fillOtp(page);

  await expect(page).toHaveURL(/account\.html/);
  await expect(page.locator('#accountWrap')).toContainText('ece@example.com');
});

test('yanlış şifre girişte hata gösterir, 2FA adımına geçmez', async ({ page }) => {
  await page.goto('/login.html');
  await page.evaluate(() => GD.createUserAccount({ name: 'Ece Kaya', email: 'ece@example.com', password: 'parola1' }));

  await page.fill('#loginEmail', 'ece@example.com');
  await page.fill('#loginPassword', 'yanlis');
  await page.click('#loginForm button[type="submit"]');

  await expect(page.locator('#err-loginPassword')).toContainText('hatalı');
  await expect(page.locator('#stepOtp')).not.toBeVisible();
});
