import fs from 'node:fs';
import { defineConfig } from '@playwright/test';

// Ortamda hazır kurulu bir Chromium varsa indirme yapmadan onu kullan
const localChromium = process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4173',
    ...(fs.existsSync(localChromium) ? { launchOptions: { executablePath: localChromium } } : {})
  },
  webServer: {
    command: 'node scripts/serve.mjs',
    port: 4173,
    reuseExistingServer: true
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
