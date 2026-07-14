import { test, expect } from '@playwright/test';

const OTP = '123456';

async function fillOtp(page, code = OTP) {
  const digits = page.locator('.otp-digit');
  for (let i = 0; i < 6; i++) await digits.nth(i).fill(code[i]);
  await page.click('#otpForm button[type="submit"]');
}

/* Kritik akış 3: yönetici girişi ve panel koruması */
test('doğru kimlik + 2FA ile yönetici paneline girilir', async ({ page }) => {
  await page.goto('/admin-login.html');
  await page.fill('#adminEmail', 'admin@gadgetdunyasi.com');
  await page.fill('#adminPassword', 'admin123');
  await page.click('#adminLoginForm button[type="submit"]');

  await expect(page.locator('#stepOtp')).toBeVisible();
  await fillOtp(page);

  await expect(page).toHaveURL(/admin\.html/);
  await expect(page.locator('#adminNameLabel')).toContainText('Yönetici');
  await expect(page.locator('#adminBody')).toContainText('Genel Bakış');
});

test('yanlış yönetici şifresi reddedilir', async ({ page }) => {
  await page.goto('/admin-login.html');
  await page.fill('#adminEmail', 'admin@gadgetdunyasi.com');
  await page.fill('#adminPassword', 'yanlis');
  await page.click('#adminLoginForm button[type="submit"]');

  await expect(page.locator('#err-adminPassword')).toContainText('hatalı');
  await expect(page).toHaveURL(/admin-login\.html/);
});

test('oturumsuz admin.html ziyareti giriş sayfasına yönlendirilir', async ({ page }) => {
  await page.goto('/admin.html');
  await expect(page).toHaveURL(/admin-login\.html/);
});
