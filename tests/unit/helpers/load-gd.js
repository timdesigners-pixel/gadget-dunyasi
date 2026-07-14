/*
 * assets/js dosyaları modül değil, sayfalarda <script> etiketiyle yüklenen
 * klasik IIFE'lerdir. Testlerde de aynı şekilde global kapsamda çalıştırıp
 * window.GD'yi taze halde döndürüyoruz.
 */
import fs from 'node:fs';
import path from 'node:path';

const JS_DIR = path.resolve(process.cwd(), 'assets/js');
const LOAD_ORDER = ['icons.js', 'data.js', 'cart.js', 'orders.js', 'checkout-logic.js', 'catalog.js'];

export function loadGD(){
  localStorage.clear();
  delete window.GD;
  delete window.lucide;
  for(const name of LOAD_ORDER){
    const code = fs.readFileSync(path.join(JS_DIR, name), 'utf8');
    (0, eval)(code); // dolaylı eval: sayfadaki <script> gibi global kapsamda çalışır
  }
  return window.GD;
}
