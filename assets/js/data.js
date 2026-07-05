/* Ürün / paket / kategori verisi — tüm sayfalar bu dosyayı paylaşır */
window.GD = window.GD || {};

GD.fmt = n => n.toLocaleString('tr-TR') + ' TL';

GD.CATEGORIES = [
  { key:'all', label:'Tümü' },
  { key:'telefon', label:'Telefon' },
  { key:'bilgisayar', label:'Bilgisayar & Tablet' },
  { key:'kulaklik', label:'Ses & Kulaklık' },
  { key:'oyun', label:'Oyun' },
  { key:'aksesuar', label:'Aksesuar' },
  { key:'giyilebilir', label:'Giyilebilir' }
];

GD.BADGE_LABEL = { bestseller:'Çok Satan', new:'Yeni', sale:'İndirim' };

GD.PRODUCTS = [
  { id:1,  cat:'telefon',    name:'Aurora X12 Pro 256GB',            price:34999, oldPrice:39999, rating:4.7, reviews:312, badge:'bestseller', icon:'smartphone', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    desc:'6.7" AMOLED ekran, üç kameralı sistem ve tüm gün süren pil ömrüyle Aurora X12 Pro, günlük kullanımda ve fotoğrafçılıkta üst düzey performans sunar.',
    specs:[['Ekran','6.7" AMOLED, 120Hz'],['Depolama','256GB'],['RAM','8GB'],['Batarya','5000mAh'],['Kamera','50MP + 12MP + 8MP'],['Renk','Gece Mavisi']] },
  { id:2,  cat:'telefon',    name:'Lumen S8 128GB',                  price:21999, oldPrice:null,  rating:4.4, reviews:145, badge:'new',        icon:'smartphone', grad:'linear-gradient(150deg,#2a2f5c,#101528)',
    desc:'Kompakt tasarımı ve akıcı performansıyla Lumen S8, günlük kullanım için ideal bir orta segment telefon.',
    specs:[['Ekran','6.1" OLED, 90Hz'],['Depolama','128GB'],['RAM','6GB'],['Batarya','4500mAh'],['Kamera','48MP + 8MP'],['Renk','Beyaz']] },
  { id:3,  cat:'telefon',    name:'Nimbus Note 12 512GB',            price:28999, oldPrice:32999, rating:4.6, reviews:203, badge:'sale',       icon:'smartphone', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    desc:'Geniş depolama alanı ve S-Kalem desteğiyle Nimbus Note 12, not almak ve içerik üretmek isteyenler için tasarlandı.',
    specs:[['Ekran','6.8" AMOLED, 120Hz'],['Depolama','512GB'],['RAM','12GB'],['Batarya','5100mAh'],['Kamera','108MP + 12MP + 5MP'],['Renk','Siyah']] },
  { id:4,  cat:'bilgisayar', name:'NovaBook 15" i7 16GB/512GB',      price:52999, oldPrice:null,  rating:4.8, reviews:198, badge:'bestseller', icon:'laptop',     grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    desc:'İnce ve hafif gövdesinde i7 işlemci barındıran NovaBook, ofis işlerinden hafif video düzenlemeye kadar her işi kaldırır.',
    specs:[['İşlemci','Intel Core i7 (12. Nesil)'],['RAM','16GB'],['Depolama','512GB SSD'],['Ekran','15.6" FHD IPS'],['Pil Ömrü','~12 saat'],['Ağırlık','1.6 kg']] },
  { id:5,  cat:'bilgisayar', name:'GridPad 11" Tablet + Kılıf',      price:14999, oldPrice:17999, rating:4.3, reviews:98,  badge:'sale',       icon:'tablet',     grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    desc:'11 inç geniş ekranı ve hediye klavyeli kılıfıyla GridPad, hem eğlence hem de üretkenlik için uygun fiyatlı bir tablet.',
    specs:[['Ekran','11" IPS, 2K'],['Depolama','128GB'],['RAM','6GB'],['Batarya','8000mAh'],['Kutu İçeriği','Tablet + Klavyeli Kılıf'],['Renk','Gri']] },
  { id:6,  cat:'bilgisayar', name:'ProView 27" 4K Monitör',          price:11499, oldPrice:13499, rating:4.7, reviews:167, badge:'sale',       icon:'monitor',    grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    desc:'4K çözünürlük ve %99 sRGB renk doğruluğuyla ProView, tasarım ve video düzenleme işleri için güvenilir bir seçim.',
    specs:[['Panel','27" IPS 4K'],['Yenileme Hızı','60Hz'],['Bağlantı','HDMI, DisplayPort, USB-C'],['Renk Doğruluğu','%99 sRGB'],['Ayarlanabilirlik','Yükseklik + Döndürme']] },
  { id:7,  cat:'kulaklik',   name:'PulseSound ANC Kulaklık',         price:4499,  oldPrice:5999,  rating:4.6, reviews:864, badge:'bestseller', icon:'headphones', grad:'linear-gradient(150deg,#3a2b52,#160f24)',
    desc:'Aktif gürültü engelleme teknolojisi ve 40 saate varan pil ömrüyle PulseSound, uzun yolculuklarda sessizliğin adresi.',
    specs:[['Tip','Kulak üstü, kablosuz'],['Gürültü Engelleme','Aktif (ANC)'],['Pil Ömrü','40 saat (ANC kapalı)'],['Bağlantı','Bluetooth 5.3'],['Ağırlık','250g']] },
  { id:8,  cat:'kulaklik',   name:'AirBeat Pro TWS',                 price:2299,  oldPrice:2899,  rating:4.5, reviews:1203,badge:'sale',       icon:'headphones', grad:'linear-gradient(150deg,#42305c,#170f26)',
    desc:'Cebe sığan şarj kutusu ve dokunmatik kontrollerle AirBeat Pro, spor ve günlük kullanım için pratik bir kablosuz kulaklık.',
    specs:[['Tip','Kulak içi, tamamen kablosuz'],['Su Direnci','IPX5'],['Pil Ömrü','6 saat + kutu ile 24 saat'],['Bağlantı','Bluetooth 5.2'],['Kontrol','Dokunmatik']] },
  { id:9,  cat:'kulaklik',   name:'StudioMic USB Mikrofon',          price:1899,  oldPrice:null,  rating:4.4, reviews:322, badge:'new',        icon:'mic',        grad:'linear-gradient(150deg,#38305c,#150f26)',
    desc:'Kayıt ve yayıncılık için stüdyo kalitesinde ses sunan StudioMic, tak-çalıştır USB bağlantısıyla kuruluma ihtiyaç duymaz.',
    specs:[['Bağlantı','USB-C'],['Polar Örüntü','Kardioid'],['Örnekleme Hızı','48kHz/16-bit'],['Aksesuar','Masaüstü stand dahil']] },
  { id:10, cat:'oyun',       name:'StrikePad RGB Klavye',            price:2199,  oldPrice:null,  rating:4.9, reviews:521, badge:'bestseller', icon:'keyboard',   grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    desc:'Mekanik switch\'ler ve özelleştirilebilir RGB aydınlatmayla StrikePad, rekabetçi oyuncular için hızlı tepki süresi sağlar.',
    specs:[['Switch Tipi','Mekanik (Blue)'],['Aydınlatma','RGB, özelleştirilebilir'],['Bağlantı','Kablolu USB'],['Anti-Ghosting','Evet (N-Key Rollover)']] },
  { id:11, cat:'oyun',       name:'VoltGrip Kablosuz Gamepad',       price:1799,  oldPrice:2299,  rating:4.6, reviews:410, badge:'sale',       icon:'gamepad-2',  grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    desc:'Ergonomik tutuşu ve titreşimli geri bildirimiyle VoltGrip, PC ve mobil cihazlarla uyumlu kablosuz bir oyun kolu.',
    specs:[['Bağlantı','Bluetooth + Kablolu'],['Pil Ömrü','~20 saat'],['Uyumluluk','PC, Android, iOS'],['Titreşim','Çift motor']] },
  { id:12, cat:'oyun',       name:'RaptorX Oyuncu Faresi',           price:1299,  oldPrice:null,  rating:4.7, reviews:288, badge:'new',        icon:'mouse',      grad:'linear-gradient(150deg,#452a3a,#1a0f18)',
    desc:'16000 DPI optik sensörü ve hafif gövdesiyle RaptorX, hassas nişan alma gerektiren oyunlar için tasarlandı.',
    specs:[['Sensör','16000 DPI Optik'],['Ağırlık','78g'],['Bağlantı','Kablolu USB'],['Aydınlatma','RGB']] },
  { id:13, cat:'aksesuar',   name:'PowerCell 20.000mAh Powerbank',   price:899,   oldPrice:null,  rating:4.7, reviews:1032,badge:'bestseller', icon:'battery-charging', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    desc:'Hızlı şarj destekli 20.000mAh kapasitesiyle PowerCell, telefonunuzu ve tabletinizi günlerce şarj edebilir.',
    specs:[['Kapasite','20.000mAh'],['Hızlı Şarj','20W PD'],['Çıkış','2x USB-A, 1x USB-C'],['Ağırlık','380g']] },
  { id:14, cat:'aksesuar',   name:'SonicBox Bluetooth Hoparlör',     price:1599,  oldPrice:1999,  rating:4.5, reviews:576, badge:'sale',       icon:'speaker',    grad:'linear-gradient(150deg,#243a52,#0f1725)',
    desc:'Su geçirmez gövdesi ve güçlü bas performansıyla SonicBox, açık hava aktivitelerinin vazgeçilmezi.',
    specs:[['Güç','20W'],['Su Direnci','IPX7'],['Pil Ömrü','12 saat'],['Bağlantı','Bluetooth 5.1']] },
  { id:15, cat:'giyilebilir',name:'ChronoFit 2 Akıllı Saat',         price:3299,  oldPrice:3899,  rating:4.5, reviews:276, badge:'bestseller', icon:'watch',      grad:'linear-gradient(150deg,#2a3a52,#101725)',
    desc:'Kalp ritmi, uyku ve egzersiz takibiyle ChronoFit 2, sağlıklı yaşamı bileğinize taşıyor.',
    specs:[['Ekran','1.4" AMOLED'],['Su Direnci','5 ATM'],['Pil Ömrü','~7 gün'],['Sensörler','Nabız, SpO2, GPS']] },
  { id:16, cat:'giyilebilir',name:'Vortex Band SE',                  price:1999,  oldPrice:null,  rating:4.3, reviews:189, badge:'new',        icon:'watch',      grad:'linear-gradient(150deg,#2f3a52,#111725)',
    desc:'Hafif tasarımı ve uzun pil ömrüyle Vortex Band SE, gün boyu aktivite takibi için pratik bir akıllı bileklik.',
    specs:[['Ekran','1.1" AMOLED'],['Su Direnci','IP68'],['Pil Ömrü','~10 gün'],['Sensörler','Nabız, Adım Sayar']] }
];

GD.SETS = [
  { id:'s1', name:'Yeni Anne Setleri', featured:true,  items:5, price:6499,  oldPrice:8299,
    thumbs:[ {icon:'baby',grad:'linear-gradient(150deg,#94a3b8,#64748b)'}, {icon:'thermometer',grad:'linear-gradient(150deg,#a3b1c2,#788699)'}, {icon:'headphones',grad:'linear-gradient(150deg,#8b97a8,#5b6678)'} ] },
  { id:'s2', name:'Akıllı Saatler',    featured:false, items:4, price:12999, oldPrice:15999,
    thumbs:[ {icon:'watch',grad:'linear-gradient(150deg,#2a3a52,#101725)'}, {icon:'watch',grad:'linear-gradient(150deg,#3a2b52,#160f24)'}, {icon:'watch',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)'} ] },
  { id:'s3', name:'Lüks Teknoloji',    featured:false, items:6, price:38999, oldPrice:45999,
    thumbs:[ {icon:'tv',grad:'linear-gradient(150deg,#22345c,#0e1526)'}, {icon:'speaker',grad:'linear-gradient(150deg,#2a2a3a,#12121c)'}, {icon:'watch',grad:'linear-gradient(150deg,#2a3a52,#101725)'} ] },
  { id:'s4', name:'Oyuncu Başlangıç Seti', featured:true, items:5, price:18499, oldPrice:22999,
    thumbs:[ {icon:'gamepad-2',grad:'linear-gradient(150deg,#a3a9b8,#6b7180)'}, {icon:'headphones',grad:'linear-gradient(150deg,#9aa3b5,#646e80)'}, {icon:'keyboard',grad:'linear-gradient(150deg,#8f97a8,#5b6478)'} ] },
  { id:'s5', name:'Ofis & Çalışma Seti', featured:false, items:4, price:24999, oldPrice:29999,
    thumbs:[ {icon:'laptop',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)'}, {icon:'monitor',grad:'linear-gradient(150deg,#22345c,#0e1526)'}, {icon:'mouse',grad:'linear-gradient(150deg,#2a3a52,#101725)'} ] },
  { id:'s6', name:'Ses Sistemi Seti',  featured:false, items:3, price:9499,  oldPrice:11999,
    thumbs:[ {icon:'speaker',grad:'linear-gradient(150deg,#3a2b52,#160f24)'}, {icon:'headphones',grad:'linear-gradient(150deg,#2a2a3a,#12121c)'}, {icon:'mic',grad:'linear-gradient(150deg,#22345c,#0e1526)'} ] }
];

GD.getProduct = id => GD.PRODUCTS.find(p => String(p.id) === String(id));
GD.getCategoryLabel = key => (GD.CATEGORIES.find(c => c.key === key) || {}).label || key;
