# gadgetdünyası — Kod İncelemesi ve İyileştirme Listesi

## Özet

"gadgetdünyası", saf HTML/CSS/vanilla JavaScript ile yazılmış, gerçek bir sunucusu/veritabanı
olmayan bir e-ticaret demo sitesi. Ürün kataloğu, sepet, ödeme akışı, kullanıcı hesapları,
yorumlar ve 10 sayfalık tam bir yönetici (admin) paneli içeriyor; tüm veri `localStorage`
üzerinde tutuluyor ve kod içindeki yorumlarda bunun bir demo olduğu belirtiliyor. Kod genel
olarak okunaklı ve tutarlı bir stile sahip (çoğu yerde `GD.escapeHtml` kullanımı doğru), ancak
bu tutarlılık **her yerde** uygulanmamış: özellikle admin panelinden girilen ürün verilerinin
müşteri sayfalarına kaçışsız (escape edilmeden) basılması ciddi bir stored‑XSS yüzeyi
oluşturuyor, ve "yönetici girişi" tamamen kozmetik — alttaki veri fonksiyonlarında hiçbir
yetkilendirme kontrolü yok. Bu bir demo/prototip olsa da, aşağıdaki bulgular gerçek bir ürüne
dönüştürülmeden önce mutlaka ele alınmalı; ayrıca SEO temelleri (meta description, tekil H1),
klavye erişilebilirliği (focus göstergesi) ve yaygın kod tekrarı gibi orta/düşük öncelikli
konular da var.

Aşağıdaki tüm bulgular bu depoda (`review/iyilestirme-listesi` dalı, `7dfe9a3` başlangıç
commit'i) doğrudan dosyalar okunarak doğrulanmıştır.

---

## Kritik

### K1. "Yönetici girişi" kozmetik — veri fonksiyonlarında hiçbir yetkilendirme kontrolü yok
**Dosyalar:** `assets/js/catalog.js:28,38,53,55-64`, `assets/js/orders.js:84-102,125-134`,
`assets/js/site-settings.js:29-33,50,68`, `assets/js/admin-ui.js:18-25`

`admin.html` ve diğer tüm `admin-*.html` sayfaları erişimi `GD.requireAdmin()`
(`admin-ui.js:18-25`) ile koruyor; bu fonksiyon sadece `localStorage`'da bir `gd_admin_session`
anahtarı olup olmadığına bakıyor. Ancak asıl veriyi değiştiren fonksiyonlar —
`GD.upsertProduct`, `GD.deleteProduct`, `GD.saveCategories`, `GD.saveTags`,
`GD.adminCreateUser`, `GD.updateUser`, `GD.deleteUser`, `GD.saveSettings`,
`GD.savePaymentMethods`, `GD.saveCarriers`, hatta `GD.setAdminSession()`'ın kendisi — hiçbir
oturum kontrolü yapmıyor ve bu fonksiyonları içeren `catalog.js`/`orders.js`/`site-settings.js`
dosyaları **her** sayfada (ör. `index.html:247-252`, `products.html:157-162`) yükleniyor.

**Neden önemli:** `index.html` gibi sıradan bir müşteri sayfasında tarayıcı konsolunu açan
herhangi biri, hiçbir giriş yapmadan `GD.deleteProduct(1)`, `GD.adminCreateUser(...)`,
`GD.saveSettings({maintenanceMode:true})` ya da doğrudan `GD.setAdminSession()` çalıştırarak
admin paneline anında girebilir veya mağaza verisini bozabilir. Giriş ekranı, OTP adımı ve
"yönetici" rolü sadece arayüz seviyesinde var; gerçek bir erişim kontrolü yok. Bu desen aynı
şekilde gerçek bir backend'e taşınırsa (ör. sunucu tarafında da sadece sayfa yönlendirmesiyle
"korunan" ama endpoint'leri açık API'ler), klasik bir "broken access control" / IDOR açığına
dönüşür.

**Çözüm:** Gerçek bir backend kurulduğunda tüm yazma işlemleri (ürün/kategori/kullanıcı/ayar
değişiklikleri) sunucu tarafında oturum/JWT doğrulaması ile korunmalı; istemci tarafındaki
`requireAdmin()` yalnızca UX amaçlı olmalı, güvenlik sınırı olmamalı. Demo kapsamında kalınacaksa
en azından bu mimari kısıtın README/yorumlarda net şekilde vurgulanması ve prod'a taşınmadan önce
mutlaka backend yetkilendirmesi eklenmesi gerektiği belgelenmeli.

### K2. Yönetici kimlik bilgileri ve 2FA kodu istemci kodunda açık metin
**Dosyalar:** `assets/js/orders.js:117,120,122-124`, `admin-login.html:33,60`

`ADMIN_ACCOUNT = { email:'admin@gadgetdunyasi.com', password:'admin123' }` ve
`DEMO_2FA_CODE = '123456'` doğrudan `orders.js` içinde tanımlı ve `admin-login.html`'de de
ekrana yazılıyor ("Demo hesabı: ... admin123", "Doğrulama kodunuz: 123456").

**Neden önemli:** Tarayıcı "görünümü kaynağı göster" ile bakan herkes admin şifresini ve 2FA
kodunu anında görür. K1 ile birlikte değerlendirildiğinde giriş ekranı sadece bir tiyatro
perdesi durumunda.

**Çözüm:** Gerçek kimlik doğrulaması sunucu tarafına taşınmalı; demo modunda dahi kimlik
bilgileri kaynak koddan tamamen kaldırılıp yalnızca belgelenen/ayrı bir ortam değişkeninde
tutulmalı.

### K3. Stored XSS — ürün adı/açıklama/özellikleri birçok sayfada kaçışsız basılıyor
**Dosyalar:** `assets/js/cart.js:93`, `product.html:223,229,259,313`, `index.html:383,460`,
`products.html:243`, `checkout.html:183`, `order-success.html:86`, `account.html:162`,
`admin-accounting.html:162`

Admin panelinde `admin-products.html:241-268` üzerinden serbest metin olarak girilen `name`,
`desc` ve `specs` alanları, `GD.upsertProduct` ile hiçbir sterilizasyon yapılmadan kaydediliyor.
Bu alanlar sonra şu şekillerde **kaçışsız** `innerHTML`'e basılıyor:
- `cart.js:93`: `<div class="name">${i.name}</div>`
- `product.html:223`: `<h1 class="detail-title">${product.name}</h1>`
- `product.html:229`: `<p class="detail-desc">${product.desc || ''}</p>`
- `product.html:313`: `<tr><td>${k}</td><td>${v}</td></tr>` (spec anahtar/değer)
- `index.html:460`, `products.html:243`: ürün adı link metni olarak
- `checkout.html:183`, `order-success.html:86`, `account.html:162`,
  `admin-accounting.html:162`: sipariş kalemi adı

Kodun geri kalanında (`reviews.html:201-210`, `admin-users.html:116-124`, `catalog.js:48`)
`GD.escapeHtml` tutarlı biçimde kullanılmış; bu yalnızca ürün adı/açıklama/özellik alanlarında
unutulmuş bir kalıp.

**Neden önemli:** Admin panelinden `"><img src=x onerror=alert(document.cookie)>` gibi bir ürün
adı girilirse, bu payload sepete eklendiği anda (`cart.js:93`) ve ürün/ana sayfa/ödeme/sipariş
özeti gibi neredeyse her sayfada çalışır. Bu, klasik bir depolanmış (stored) XSS'tir — gerçek bir
çok kullanıcılı sisteme taşındığında saldırgan, tüm ziyaretçilerin tarayıcısında script
çalıştırabilir (oturum çalma, admin oturumunu ele geçirme vb.).

**Çözüm:** Tüm bu render noktalarında `GD.escapeHtml(product.name)`,
`GD.escapeHtml(product.desc)`, `GD.escapeHtml(k)`/`GD.escapeHtml(v)` kullanımına geçilmeli.
Daha kalıcı çözüm olarak, `GD.getAllProducts()`'ı okuyan/render eden tüm yerlerde tek bir
`renderProductName()` yardımcı fonksiyonu kullanmak, bu tür tutarsızlıkların tekrar oluşmasını
engeller.

### K4. Şifreler düz metin olarak saklanıyor ve karşılaştırılıyor
**Dosyalar:** `assets/js/orders.js:51-60` (`createUserAccount`), `orders.js:61-66` (`findUser`),
`orders.js:84-91` (`adminCreateUser`)

Kullanıcı kayıt/giriş akışında şifre hiçbir hash/salt işleminden geçmeden doğrudan
`users.push({..., password, ...})` ile `localStorage`'a yazılıyor, girişte de
`u.password === password` şeklinde düz metin karşılaştırma yapılıyor.

**Neden önemli:** K3'teki XSS ile birleştiğinde, kötü niyetli bir script `GD.getUsers()`
çağrısıyla tüm kayıtlı kullanıcıların düz metin şifrelerini tek satırda dışa aktarabilir. Bu
desen gerçek bir backend'e taşınırsa (kod tabanında zaten "gerçek olmayan" olduğu belirtilse de),
kopyala-yapıştır riskiyle üretime sızabilir.

**Çözüm:** Backend'e taşındığında şifreler bcrypt/argon2 gibi bir algoritma ile hash'lenip
saklanmalı, karşılaştırma hash üzerinden yapılmalı. Demo kapsamında bile, gerçek bir "üretime
hazır" izlenimi vermemek için kod yorumlarında bu noktanın açıkça vurgulanması faydalı olur.

---

## Yüksek

### Y1. CSV dışa aktarımında formül enjeksiyonu (CSV Injection) riski
**Dosya:** `admin-accounting.html:154-167`

`exportCsvBtn` tıklanınca sipariş verileri (müşterinin girdiği `fullName`, `email`, ürün adları
dahil) CSV'ye yazılıyor. `escapeCsv` fonksiyonu (satır 155) yalnızca çift tırnakları
kaçışlıyor: `` v => `"${String(v==null?'':v).replace(/"/g,'""')}"` ``. Hücre değeri
`=`, `+`, `-` veya `@` ile başlıyorsa hiçbir işlem yapılmıyor.

**Neden önemli:** Checkout formunda `fullName` alanına kısıtlama yok
(`checkout.html:70-71`). Bir müşteri "Ad Soyad" alanına
`=HYPERLINK("http://evil.example","tıkla")` veya `=cmd|'/c calc'!A1` gibi bir formül girip
sipariş verirse, admin bu CSV'yi Excel/Google Sheets'te açtığında formül otomatik
çalıştırılabilir (klasik CSV/Formula Injection — CWE-1236). Bu, admin tarafında kod çalıştırma
veya veri sızdırma riski taşır.

**Çözüm:** `escapeCsv` içinde değer `=`, `+`, `-`, `@`, sekme veya satır başı ile başlıyorsa
başına tek tırnak (`'`) veya boşluk eklenmeli, böylece elektronik tablo yazılımları hücreyi
metin olarak yorumlar.

### Y2. Kupon kodları istemci paketinde sabit kodlanmış
**Dosya:** `assets/js/cart.js:7`

`const COUPONS = { 'GADGET10': 10, 'GADGET20': 20 };` doğrudan herkese açık JS dosyasında
tanımlı ve `applyCoupon` (satır 55-62) bu sabit listeye bakıyor.

**Neden önemli:** Herhangi bir ziyaretçi kaynak kodunu okuyarak (veya sadece
`assets/js/cart.js`'i indirerek) tüm geçerli kupon kodlarını ve indirim oranlarını anında
öğrenebilir; kod üretimi/kısıtlama (kullanım limiti, son kullanma tarihi, tek kullanımlık kod)
gibi iş mantığının sunucu tarafında olması gerekir.

**Çözüm:** Kupon doğrulaması backend'e taşınmalı; istemci yalnızca kodu gönderip sunucudan
geçerlilik/indirim bilgisini almalı.

### Y3. Admin panelinde yeni kullanıcı şifre alanı `type="text"`
**Dosya:** `admin-users.html:78`

`<input type="text" id="userPassword" placeholder="En az 6 karakter">` — şifre alanı maskelenmemiş,
admin yazarken ekranda açık metin olarak görünüyor.

**Neden önemli:** Omuz üstünden bakma (shoulder surfing) riski ve tarayıcı otomatik
doldurma/otomatik kaydetme mekanizmalarının şifreyi normal metin alanı gibi ele alması söz
konusu. Sayfadaki diğer tüm şifre alanları (`register.html:87`, `login.html`, vb.) doğru şekilde
`type="password"` kullanıyor; bu sadece bu bir alanda unutulmuş.

**Çözüm:** `type="password"` yapılmalı.

---

## Orta

### O1. Hiçbir sayfada `<meta name="description">` yok
**Dosyalar:** Tüm 24 HTML dosyası (ör. `index.html:1-9`, `product.html:1-9`,
`products.html:1-9`)

Hiçbir sayfada meta description, Open Graph (`og:title`, `og:description`, `og:image`) veya
Twitter Card etiketi bulunmuyor; yalnızca `<title>` var.

**Neden önemli:** Arama motoru sonuçlarında ve sosyal medyada paylaşıldığında (WhatsApp,
Twitter/X, LinkedIn) sayfalar açıklamasız/önizlemesiz görünür, bu da tıklama oranını doğrudan
düşürür — bir e-ticaret sitesi için SEO/organik trafik açısından önemli bir eksik.

**Çözüm:** Her sayfaya özgü, ürün/kategori adını içeren `<meta name="description">` ve temel
`og:*` etiketleri eklenmeli; ürün sayfalarında bu açıklama `product.desc`'ten dinamik
üretilebilir.

### O2. `rent-to-own.html` sayfasında iki adet görünür `<h1>` var
**Dosya:** `rent-to-own.html:92` ve `rent-to-own.html:188`

Sayfada hem üstte ("Kiralayarak Sahip Ol...") hem de altta, sayfa sonundaki CTA bölümünde
("Bugün Seç, Yarın Kullanmaya Başla.") ikinci bir `<h1>` var; ikisi de her zaman görünür (statik
markup, JS ile gizlenmiyor).

**Neden önemli:** Bir sayfada birden fazla `<h1>` bulunması ekran okuyucu kullanıcıları için
belge yapısını (heading outline) belirsizleştirir ve arama motorları için de konu bütünlüğünü
zayıflatır (WCAG 1.3.1 "Info and Relationships" iyi uygulamasına aykırı).

**Çözüm:** İkinci `<h1>` bir `<h2>`'ye düşürülmeli (sayfadaki diğer bölüm başlıkları zaten
`<h2>` kullanıyor, ör. satır 97, 121, 162).

### O3. `outline:none` klavye odak göstergesini kaldırıyor
**Dosyalar:** `assets/css/style.css:48-49` (`.search select`, `.search input`),
`style.css:373` (`.filter-btn` vb. düğmeler), `style.css:525` (`.coupon-row input`),
`style.css:557` (`.form-field input, select`), `style.css:666` (`.otp-row input`),
`style.css:838` (`.admin-toolbar .search-box`)

Bu seçicilerde `outline:none` tanımlanmış ve yerine yalnızca `:focus` durumunda kenarlık rengi
değişimi (`border-color:var(--orange)`) konmuş (ör. `style.css:559`, `style.css:668`).

**Neden önemli:** Tarayıcının varsayılan, yüksek kontrastlı odak halkası kaldırılıp yerine ince
bir kenarlık rengi değişikliği konması, klavye ile gezinen kullanıcılar için odağın hangi
alanda olduğunu takip etmeyi zorlaştırır (WCAG 2.4.7 "Focus Visible"). Özellikle checkout ve
kayıt formlarında bu, form doldurmayı klavyeyle takip etmeyi güçleştirir.

**Çözüm:** `outline:none` kaldırılıp yerine belirgin bir `:focus-visible` stili (ör.
`outline:2px solid var(--orange); outline-offset:2px;`) eklenmeli.

### O4. Admin ve mağaza sayfaları arasında yoğun HTML/JS kod tekrarı
**Dosyalar:** 10 `admin-*.html` dosyasının tamamında aynı header/sidebar iskeleti (ör.
`admin-users.html:12-27`, `admin-products.html:12-27`, `admin-categories.html:12-27` birebir
aynı); 13 mağaza sayfasının tamamında aynı sepet paneli/topstrip/header markup'ı (ör.
`index.html:12-71`, `checkout.html:10-48`, `register.html:10-37` neredeyse birebir aynı)

**Neden önemli:** Header, sepet paneli veya admin kenar çubuğunda küçük bir değişiklik
(ör. yeni bir menü öğesi, marka güncellemesi) yapmak için 10-13 dosyanın elle senkronize
düzenlenmesi gerekiyor; bu hataya çok açık ve zaman alıcı (nitekim admin sayfalarının çoğu
zaten `GD.renderAdminSidebar`/`GD.renderAdminHeader` ile JS'te ortaklaştırılmış, ama header
HTML iskeleti hâlâ her dosyada tekrar ediyor).

**Çözüm:** Statik site olmaya devam edilecekse en azından header/sepet paneli/footer için basit
bir `fetch` + `innerHTML` ile yüklenen ortak parça (partial) dosyaları kullanılabilir; ya da
projeyi Eleventy/Astro gibi hafif bir statik site oluşturucuya taşımak, bu tekrarı derleme
zamanında çözer.

### O5. Kullanıcının şifresini değiştirme veya hesabını silme imkânı yok
**Dosya:** `account.html` (tamamı — `password`, `Şifre Değiştir`, `Hesabımı Sil` gibi bir
alan/aksiyon bulunmuyor)

Kayıt sırasında şifre düz metin olarak saklanıyor (bkz. K4) ama `account.html`'de kullanıcı
kendi şifresini değiştiremiyor, hesabını silemiyor; bu işlemler yalnızca admin panelinden
(`admin-users.html`) başkası adına yapılabiliyor.

**Neden önemli:** Temel bir hesap yönetimi/kendi verisi üzerinde kontrol (self-service) eksik;
gerçek bir sisteme taşındığında bu KVKK/GDPR türü "verilerini yönet/sil" beklentilerini
karşılamaz.

**Çözüm:** `account.html`'e şifre değiştirme ve hesap silme akışları eklenmeli.

---

## Düşük

### D1. Tek parça, sıkıştırılmamış CSS dosyası
**Dosya:** `assets/css/style.css` (902 satır, ~33KB, minify edilmemiş)

Her sayfa `<head>` içinde bu dosyayı senkron olarak yüklüyor (ör. `index.html:8`); dosya
minify edilmemiş ve önbellek kırma (cache-busting) sürüm parametresi yok.

**Neden önemli:** Sitenin boyutu göz önüne alındığında performans etkisi küçük, ama üretime
geçmeden önce minify + `style.css?v=...` gibi bir sürümleme eklenmesi hem transfer boyutunu hem
de dağıtım sonrası önbellek tutarlılığını iyileştirir.

**Çözüm:** Build adımına bir CSS minifier eklenmeli; dosya adına/parametresine sürüm/hash
eklenmeli.

### D2. `robots.txt`, `sitemap.xml` ve canonical etiketleri yok
**Dosyalar:** Proje kökünde `robots.txt`/`sitemap.xml` yok; hiçbir sayfada
`<link rel="canonical">` yok

**Neden önemli:** Arama motorlarının siteyi doğru taraması ve `?q=`/`?cat=` gibi parametreli
URL'lerin (ör. `products.html?cat=telefon`) yinelenen içerik olarak indekslenmesini önlemek için
bu temel SEO dosyaları faydalı olur.

**Çözüm:** Basit bir `robots.txt` ve statik `sitemap.xml` eklenmeli; parametreli ürün listeleme
sayfalarına canonical etiketi konmalı.

### D3. Satır içi (`style="..."`) stillerin yaygın kullanımı
**Dosyalar:** `index.html` (27 kullanım), `rent-to-own.html` (25), `admin.html` (25),
`product.html` (19), `cart.html` (19) ve diğer birçok dosya

**Neden önemli:** Stil mantığının hem `style.css`'te hem de yüzlerce satır içi `style`
özniteliğinde dağınık olması bakımı zorlaştırıyor; ayrıca ileride bir İçerik Güvenliği
Politikası (CSP) eklenmek istenirse satır içi stiller `unsafe-inline` gerektirir ve bu da
CSP'nin XSS'e karşı sağladığı korumayı zayıflatır (bkz. K3).

**Çözüm:** Sık tekrar eden satır içi stiller (`width:14px;height:14px` gibi ikon boyutları,
buton `width:100%;justify-content:center` kalıpları) yardımcı CSS sınıflarına taşınmalı.

---

## Önerilen sıra

1. **`GD.*` admin veri fonksiyonlarına gerçek yetkilendirme ekle (K1)** — mimari değişiklik,
   gerçek bir backend + oturum/JWT doğrulaması gerektirir. *Efor: büyük (birkaç gün-hafta,
   backend kapsamına bağlı).* En yüksek risk burada olduğu için önce bu ele alınmalı.
2. **Stored XSS'i kapat — ürün adı/açıklama/özellik render noktalarına `GD.escapeHtml` ekle
   (K3)** — `cart.js:93`, `product.html:223,229,313`, `index.html:460`, `products.html:243`,
   `checkout.html:183`, `order-success.html:86`, `account.html:162`,
   `admin-accounting.html:162`. *Efor: küçük (birkaç saat), tek tek her dosyada bir satırlık
   değişiklik.*
3. **CSV formül enjeksiyonuna karşı `escapeCsv`'yi güçlendir (Y1)** — `admin-accounting.html:155`.
   *Efor: çok küçük (30 dk).*
4. **Admin panelindeki yeni kullanıcı şifre alanını `type="password"` yap (Y3)** —
   `admin-users.html:78`. *Efor: çok küçük (5 dk).*
5. **Şifreleri hash'leme planı (K4) ve kimlik bilgilerini/2FA kodunu kaynak koddan çıkarma
   (K2)** — gerçek backend kurulana kadar tam çözülemez, ama kısa vadede en azından kodun bir
   "yalnızca demo, üretimde KULLANMAYIN" uyarısıyla daha belirgin işaretlenmesi ve backend
   taşıma planının netleştirilmesi. *Efor: orta (backend olmadan belgeleme; backend ile birlikte
   büyük).*
