/* Ürün / paket / kategori verisi — tüm sayfalar bu dosyayı paylaşır */
window.GD = window.GD || {};

GD.fmt = n => n.toLocaleString('tr-TR') + ' ' + (GD.getSettings ? GD.getSettings().currency : 'TL');

GD.CATEGORIES = [
  { key:'all', label:'Tümü' },
  { key:'telefon', label:'Telefon' },
  { key:'bilgisayar', label:'Bilgisayar & Tablet' },
  { key:'kulaklik', label:'Ses & Kulaklık' },
  { key:'oyun', label:'Oyun' },
  { key:'aksesuar', label:'Aksesuar' },
  { key:'giyilebilir', label:'Giyilebilir' },
  { key:'akilli-ev', label:'Akıllı Ev' },
  { key:'seyahat', label:'Seyahat Teknolojileri' },
  { key:'mutfak', label:'Mutfak Teknolojileri' },
  { key:'hobi', label:'Maker & Hobi' },
  { key:'saglik', label:'Sağlık & Spor' },
  { key:'kamera', label:'Kamera & İçerik' },
  { key:'outdoor', label:'Kamp & Outdoor' },
  { key:'retro', label:'Retro & Nostalji' },
  { key:'ofis', label:'Ofis & Üretkenlik' },
  { key:'ulasim', label:'Araç & Ulaşım' }
];

/*
 * Gerçek ürün fotoğrafları Wikimedia Commons'tan (özgür lisanslı) hotlink
 * edilir; kaynak ve lisans listesi için repo kökündeki IMAGE-CREDITS.md
 * dosyasına bakın. Görsel yüklenemezse ikon+gradyan placeholder devreye girer.
 */
GD.commonsImg = file => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + file + '?width=640';

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
    specs:[['Ekran','1.1" AMOLED'],['Su Direnci','IP68'],['Pil Ömrü','~10 gün'],['Sensörler','Nabız, Adım Sayar']] },

  /* ---------- Gerçek gadget kataloğu (fotoğraflar: Wikimedia Commons) ---------- */

  // Akıllı Ev
  { id:17, cat:'akilli-ev', name:'Amazon Echo Dot (5. Nesil) Akıllı Hoparlör', price:1999, oldPrice:2499, rating:4.7, reviews:2841, badge:'bestseller', icon:'speaker', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('The_black_Amazon_Echo_Dot_(fifth_generation)_on_wooden_table.jpg'),
    desc:'Alexa sesli asistanlı Echo Dot ile müzik çalın, ışıkları kontrol edin, alarm kurun ve evinizi sesinizle yönetin. Küre tasarımlı 5. nesil, öncekilerden çok daha dolgun bir bas sunar.',
    specs:[['Asistan','Alexa (Türkçe destekli)'],['Bağlantı','Wi-Fi, Bluetooth'],['Hoparlör','44mm sürücü'],['Sensör','Sıcaklık sensörü dahili'],['Renk','Siyah']] },
  { id:18, cat:'akilli-ev', name:'Philips Hue Akıllı Ampul Başlangıç Kiti', price:4799, oldPrice:null, rating:4.8, reviews:1156, badge:'new', icon:'package', grad:'linear-gradient(150deg,#3a2b52,#160f24)',
    img:GD.commonsImg('Philips_Hue_hub_and_2_bulbs.jpg'),
    desc:'2 renkli akıllı ampul ve Hue Bridge içeren kit ile evinizin ışıklarını telefondan yönetin: 16 milyon renk, gün doğumu alarmları, film moduna göre değişen ambiyans.',
    specs:[['Kutu İçeriği','2x E27 ampul + Hue Bridge'],['Renk','16 milyon renk + beyaz tonları'],['Kontrol','Uygulama, ses (Alexa/Google)'],['Otomasyon','Zamanlama, sahneler, coğrafi konum']] },
  { id:19, cat:'akilli-ev', name:'iRobot Roomba i7+ Robot Süpürge', price:27999, oldPrice:32999, rating:4.6, reviews:934, badge:'sale', icon:'settings', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('IRobot_Roomba_i7%2B.jpg'),
    desc:'Kendi çöpünü kendisi boşaltan robot süpürge: Clean Base istasyonuna döndüğünde haznesini otomatik boşaltır, evinizin haritasını çıkarır ve oda oda temizlik emri alır.',
    specs:[['Otomatik Boşaltma','Clean Base istasyonu dahil'],['Haritalama','Imprint akıllı haritalama'],['Kontrol','Uygulama + sesli asistan'],['Pil','~75 dk, kaldığı yerden devam']] },
  { id:20, cat:'akilli-ev', name:'Google Nest Learning Termostat', price:8499, oldPrice:null, rating:4.5, reviews:612, badge:'new', icon:'thermometer', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Nest_Learning_Thermostat_(cropped).JPG'),
    desc:'Alışkanlıklarınızı öğrenen termostat: bir hafta kullanın, programınızı kendisi oluştursun. Evde kimse yokken ısıtmayı kısarak faturanızı gözle görülür şekilde düşürür.',
    specs:[['Öğrenme','Otomatik program oluşturma'],['Uzaktan Kontrol','Telefon uygulaması'],['Tasarruf Raporu','Aylık enerji geçmişi'],['Uyumluluk','Kombi ve yerden ısıtma']] },

  // Seyahat Teknolojileri
  { id:21, cat:'seyahat', name:'Apple AirTag Eşya Takip Cihazı', price:1399, oldPrice:null, rating:4.8, reviews:3210, badge:'bestseller', icon:'map-pin', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('Apple_AirTags_einrichten.jpg'),
    desc:'Anahtarlığınıza, valizinize veya çantanıza takın; kaybolduğunda dünyanın her yerinden Bul uygulamasıyla yerini görün. Havalimanında kaybolan bavulların kabusu.',
    specs:[['Takip','Ultra Wideband hassas bulma'],['Ağ','Milyonlarca Apple cihazı üzerinden'],['Pil','Değiştirilebilir CR2032, ~1 yıl'],['Dayanıklılık','IP67 su ve toz direnci']] },
  { id:22, cat:'seyahat', name:'Amazon Kindle Paperwhite (11. Nesil)', price:8499, oldPrice:9499, rating:4.8, reviews:1877, badge:'sale', icon:'tablet', grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    img:GD.commonsImg('Amazon_Kindle_Paperwhite_5_Eleventh_Generation_(C2V2L3)_6-inch_e-reader.jpg'),
    desc:'Cebinize binlerce kitap sığdıran e-okuyucu: kağıt gibi okunan mat ekran, güneş altında bile parlamaz, tek şarjla haftalarca gider. Ayarlanabilir sıcak ışıkla gece okumak da keyif.',
    specs:[['Ekran','6.8" E Ink, 300 ppi'],['Işık','Ayarlanabilir sıcak ışık'],['Su Direnci','IPX8'],['Pil','Haftalarca kullanım'],['Depolama','16GB']] },
  { id:23, cat:'seyahat', name:'Sony WH-1000XM3 Gürültü Engelleyici Kulaklık', price:8999, oldPrice:11999, rating:4.7, reviews:2456, badge:'sale', icon:'headphones', grad:'linear-gradient(150deg,#42305c,#170f26)',
    img:GD.commonsImg('Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.2.jpg'),
    desc:'Uçak motoru sesini bile yok eden efsanevi ANC: Sony\'nin ödüllü gürültü engelleme işlemcisiyle uzun uçuşlar sessiz bir çalışma odasına dönüşür. 30 saat pil, hızlı şarjla 10 dakikada 5 saat.',
    specs:[['Gürültü Engelleme','QN1 işlemcili aktif ANC'],['Pil','30 saat (ANC açık)'],['Hızlı Şarj','10 dk = 5 saat'],['Bağlantı','Bluetooth 4.2, NFC'],['Ağırlık','255g']] },
  { id:24, cat:'seyahat', name:'Anker PowerCore 5000 Cep Powerbank', price:899, oldPrice:null, rating:4.6, reviews:1755, badge:'bestseller', icon:'battery-charging', grad:'linear-gradient(150deg,#2a3f52,#101a25)',
    img:GD.commonsImg('2023_Powerbank_Anker_Powercore_5000mAh.jpg'),
    desc:'Ruj boyutunda 5000mAh: cebinizde taşıyabileceğiniz kadar küçük, telefonunuzu bir buçuk kez dolduracak kadar güçlü. Seyahatte "şarjım bitiyor" stresine kesin çözüm.',
    specs:[['Kapasite','5000mAh'],['Boyut','Ruj formunda, 108mm'],['Çıkış','PowerIQ hızlı şarj'],['Ağırlık','135g']] },

  // Mutfak Teknolojileri
  { id:25, cat:'mutfak', name:'AeroPress Kahve Demleme Seti', price:2199, oldPrice:null, rating:4.9, reviews:1489, badge:'bestseller', icon:'package', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('Red_AeroPress_with_Accessories.jpg'),
    desc:'Basınçla demleme yapan bu ilginç alet, 1 dakikada espresso yoğunluğunda ama asiditesi düşük kahve çıkarır. Kampta, ofiste, seyahatte: dünya şampiyonalarına konu olmuş kult bir gadget.',
    specs:[['Demleme','Basınçlı immersiyon, ~1 dk'],['Kapasite','1-3 fincan'],['Malzeme','BPA içermeyen polipropilen'],['Kutu İçeriği','Gövde, filtreler, karıştırıcı, kaşık']] },
  { id:26, cat:'mutfak', name:'Philips Airfryer Sıcak Hava Fritözü', price:5999, oldPrice:7499, rating:4.7, reviews:3892, badge:'sale', icon:'package', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('Airfryer.jpg'),
    desc:'Yağsız kızartma devrimi: hızlı hava sirkülasyonuyla patates kızartmasını bir kaşık yağla çıtır çıtır yapar. Kızartma, ızgara, fırınlama ve ısıtma tek cihazda.',
    specs:[['Teknoloji','Rapid Air sıcak hava'],['Yağ Kullanımı','%90\'a kadar daha az'],['Fonksiyon','Kızartma, ızgara, fırın'],['Temizlik','Bulaşık makinesinde yıkanabilir sepet']] },
  { id:27, cat:'mutfak', name:'Nespresso Magimix Kapsül Kahve Makinesi', price:7499, oldPrice:null, rating:4.6, reviews:1203, badge:'new', icon:'package', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Nespresso_Magimix_M100.jpg'),
    desc:'19 bar basınçla 30 saniyede barista kalitesinde espresso: kapsülü takın, düğmeye basın. Kompakt gövdesiyle en küçük mutfak tezgahına bile sığar.',
    specs:[['Basınç','19 bar'],['Isınma','~25 saniye'],['Kapsül','Nespresso Original uyumlu'],['Su Tankı','0.7L']] },
  { id:28, cat:'mutfak', name:'Instant Pot Duo Akıllı Çok Amaçlı Pişirici', price:6499, oldPrice:null, rating:4.8, reviews:2670, badge:'new', icon:'package', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    img:GD.commonsImg('Instant_Pot_(49907000991).jpg'),
    desc:'7 cihaz tek gövdede: düdüklü tencere, yavaş pişirici, pilav makinesi, yoğurt makinesi, buharda pişirici, sote tavası ve yemek ısıtıcı. Nohutu ıslatmadan 40 dakikada pişirir.',
    specs:[['Fonksiyon','7\'si 1 arada'],['Programlar','13 akıllı ön ayar'],['Kapasite','5.7L'],['Güvenlik','10 katmanlı güvenlik sistemi']] },

  // Maker & Hobi
  { id:29, cat:'hobi', name:'Raspberry Pi 5 Mini Bilgisayar (8GB)', price:3799, oldPrice:null, rating:4.9, reviews:1544, badge:'bestseller', icon:'grid', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('Raspberry_Pi_5.jpg'),
    desc:'Kredi kartı boyutunda gerçek bir bilgisayar: medya merkezi, retro oyun konsolu, akıllı ev sunucusu ya da robot beyni... Ne hayal ederseniz o. Önceki nesilden 2-3 kat hızlı.',
    specs:[['İşlemci','2.4GHz 4 çekirdek ARM Cortex-A76'],['RAM','8GB LPDDR4X'],['Görüntü','2x micro-HDMI, çift 4K60'],['Bağlantı','Wi-Fi 5, Bluetooth 5.0, Gigabit Ethernet'],['GPIO','40 pin']] },
  { id:30, cat:'hobi', name:'Flipper Zero Çok Amaçlı Hacker Aleti', price:9999, oldPrice:null, rating:4.7, reviews:876, badge:'new', icon:'gamepad-2', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('Flipper_Zero.jpg'),
    desc:'Tamagotchi görünümlü bu sevimli cihaz aslında ciddi bir dijital çakı: kumandaları kopyalar, NFC/RFID kartları okur, kızılötesi cihazları yönetir. Güvenlik meraklıları ve maker\'ların gözdesi.',
    specs:[['Radyo','Sub-1GHz alıcı-verici'],['Kartlar','NFC, RFID (125kHz), iButton'],['Kızılötesi','Öğrenen IR alıcı-verici'],['Ekran','Monokrom LCD + eğlenceli yunus asistan'],['Genişletme','GPIO pinleri']] },
  { id:31, cat:'hobi', name:'Arduino Uno R3 Geliştirme Kartı', price:999, oldPrice:null, rating:4.8, reviews:2311, badge:'bestseller', icon:'grid', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Arduino_Uno_R3.JPG'),
    desc:'Elektroniğe giriş kapısı: LED yakmaktan sulama robotuna kadar binlerce projenin kalbi. Devasa topluluk desteği ve sayısız ücretsiz eğitimle 10 yaş üstü herkes başlayabilir.',
    specs:[['Mikrodenetleyici','ATmega328P'],['Giriş/Çıkış','14 dijital, 6 analog pin'],['Bağlantı','USB-B, harici güç'],['Topluluk','Milyonlarca açık kaynak proje']] },
  { id:32, cat:'hobi', name:'Elgato Stream Deck + Kontrol Paneli', price:10999, oldPrice:null, rating:4.7, reviews:645, badge:'new', icon:'keyboard', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Elgato_Stream_Deck_%2B.jpg'),
    desc:'Her tuşu minik bir LCD ekran olan üretkenlik paneli: tek dokunuşla yayın sahnesi değiştirin, ses kanallarını döndürmeli düğmelerle ayarlayın, kısayollarınızı görsel ikonlarla yönetin.',
    specs:[['Tuşlar','8 özelleştirilebilir LCD tuş'],['Döner Kontrol','4 dokunmatik kadran'],['Dokunmatik Şerit','Anlık bilgi ekranı'],['Uyumluluk','OBS, Spotify, Photoshop ve yüzlerce eklenti']] },

  // Sağlık & Spor
  { id:33, cat:'saglik', name:'Xiaomi Smart Band 8 Akıllı Bileklik', price:1599, oldPrice:null, rating:4.6, reviews:4102, badge:'bestseller', icon:'watch', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('Xiaomi_Mi_Band_8.jpg'),
    desc:'Bu fiyata bu kadar takip başka yerde yok: nabız, uyku, stres, kan oksijeni ve 150+ spor modu. 16 gün pil ömrüyle "şarj etmeyi unuttum" diye bir şey yok.',
    specs:[['Ekran','1.62" AMOLED, 60Hz'],['Pil','~16 gün'],['Sensörler','Nabız, SpO2, uyku, stres'],['Spor Modları','150+'],['Su Direnci','5 ATM']] },
  { id:34, cat:'saglik', name:'Withings Body Akıllı Tartı', price:4299, oldPrice:null, rating:4.5, reviews:987, badge:'new', icon:'bar-chart', grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    img:GD.commonsImg('Withings_Smart_Body.jpg'),
    desc:'Sadece kilo değil; vücut yağ oranı, kas ve su kütlenizi ölçer, Wi-Fi ile uygulamaya otomatik işler. 8 kişiye kadar aile üyelerini otomatik tanır, hamilelik modu bile var.',
    specs:[['Ölçüm','Kilo, yağ, kas, su, BMI'],['Bağlantı','Wi-Fi + Bluetooth'],['Kullanıcı','8 kişiye kadar otomatik tanıma'],['Pil','~18 ay (4x AAA)']] },
  { id:35, cat:'saglik', name:'Withings ScanWatch 2 Hibrit Akıllı Saat', price:13999, oldPrice:null, rating:4.6, reviews:534, badge:'new', icon:'watch', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('Withings_ScanWatch_2_white.jpg'),
    desc:'Klasik saat görünümünde tıbbi sınıf takip: bileğinizden EKG çeker, vücut sıcaklığı değişimini izler, atriyal fibrilasyon uyarısı verir. Üstelik tek şarjla 30 gün.',
    specs:[['EKG','Tıbbi sınıf, AFib tespiti'],['Sıcaklık','7/24 vücut ısısı takibi'],['Pil','~30 gün'],['Tasarım','Analog kadran + gizli OLED'],['Su Direnci','5 ATM']] },
  { id:36, cat:'saglik', name:'Theragun Perküsyon Masaj Tabancası', price:11999, oldPrice:13999, rating:4.7, reviews:1320, badge:'sale', icon:'package', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('Theragun_(51818229810).jpg'),
    desc:'Sporcu fizyoterapisini eve getiren cihaz: dakikada 2400 vuruşla derin doku masajı yapar, antrenman sonrası kas ağrısını gözle görülür şekilde azaltır. Üçgen sapıyla sırtınıza da kolayca ulaşır.',
    specs:[['Vuruş','2400 darbe/dk, 16mm derinlik'],['Başlıklar','Değiştirilebilir masaj başlıkları'],['Sap','Ergonomik üçgen tasarım'],['Pil','~120 dk kablosuz kullanım']] },
  { id:37, cat:'saglik', name:'Oura Ring 3. Nesil Akıllı Yüzük', price:14999, oldPrice:null, rating:4.5, reviews:768, badge:'new', icon:'heart', grad:'linear-gradient(150deg,#3a2b52,#160f24)',
    img:GD.commonsImg('OURA_Ring_-_1.jpg'),
    desc:'Ekransız, sessiz, görünmez takip: parmağınızdaki bu şık yüzük uykunuzu, toparlanmanızı ve vücut ısınızı laboratuvar hassasiyetinde izler; her sabah size bir "hazırlık skoru" verir.',
    specs:[['Form','Titanyum yüzük, 4-6g'],['Sensörler','Nabız, HRV, sıcaklık, SpO2'],['Pil','~7 gün'],['Skorlar','Uyku, aktivite, hazırlık'],['Su Direnci','100m']] },

  // Kamera & İçerik
  { id:38, cat:'kamera', name:'GoPro Hero 9 Black Aksiyon Kamerası', price:13499, oldPrice:15999, rating:4.7, reviews:1934, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    img:GD.commonsImg('GoPro_Hero_9_Black_-_Front_2.jpg'),
    desc:'5K video, öndeki vlog ekranı ve sınıfının en iyi sarsıntı önlemesiyle: bisiklette, denizde, kayakta çekin; HyperSmooth görüntüyü gimbal takılmış gibi sabitler. Kasasız 10m su geçirmez.',
    specs:[['Video','5K30 / 4K60'],['Fotoğraf','20MP'],['Sabitleme','HyperSmooth 3.0'],['Ekran','Ön renkli + arka dokunmatik'],['Su Direnci','10m (kasasız)']] },
  { id:39, cat:'kamera', name:'DJI Mini 4 Pro Katlanabilir Drone', price:36999, oldPrice:null, rating:4.8, reviews:812, badge:'bestseller', icon:'camera', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('2024_Dron_DJI_Mini_4_Pro_(01).jpg'),
    desc:'249 gramla çoğu ülkede kayıt gerektirmeyen sınıfta uçan bu drone, 4K/60fps HDR video çeker, her yönden engel algılar ve sizi otomatik takip eder. Katlanınca avucunuza sığar.',
    specs:[['Ağırlık','249g (katlanabilir)'],['Kamera','4K60 HDR, 48MP'],['Engel Algılama','Çok yönlü'],['Uçuş Süresi','~34 dk'],['Menzil','20 km video aktarımı']] },
  { id:40, cat:'kamera', name:'Fujifilm Instax Mini 70 Anlık Kamera', price:4699, oldPrice:null, rating:4.5, reviews:1467, badge:'new', icon:'camera', grad:'linear-gradient(150deg,#45402a,#1a1810)',
    img:GD.commonsImg('Fujifilm_Instax_mini_70_-_yellow.jpg'),
    desc:'Çektiğiniz anı saniyeler içinde elinizde tutun: selfie aynası, otomatik pozlama ve kendinden geliştiren mini filmlerle her karesi hatıraya dönüşen retro-şık bir kamera.',
    specs:[['Film','Instax Mini (62x46mm)'],['Selfie','Ayna + selfie modu'],['Pozlama','Otomatik'],['Zamanlayıcı','Var'],['Renk','Kanarya Sarısı']] },
  { id:41, cat:'kamera', name:'Blue Yeti USB Stüdyo Mikrofonu', price:5299, oldPrice:null, rating:4.7, reviews:2789, badge:'bestseller', icon:'mic', grad:'linear-gradient(150deg,#2a2a3a,#12121c)',
    img:GD.commonsImg('Blue_Yeti_Blackout.jpg'),
    desc:'Podcast ve yayıncılığın standart mikrofonu: 4 farklı kayıt deseniyle tek kişilik anlatımdan yuvarlak masa sohbetine her senaryoyu kaydeder. Tak-çalıştır, sürücü derdi yok.',
    specs:[['Kapsül','3 kondansatör kapsül'],['Desenler','Kardioid, çift yönlü, çok yönlü, stereo'],['Kontroller','Kazanç, sessize alma, kulaklık çıkışı'],['Bağlantı','USB, stand dahil']] },

  // Oyun & VR
  { id:42, cat:'oyun', name:'Valve Steam Deck El Konsolu', price:29999, oldPrice:null, rating:4.8, reviews:1876, badge:'bestseller', icon:'gamepad-2', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('Steam_Deck_(front).jpg'),
    desc:'PC oyun kütüphanenizi avucunuza taşıyan el konsolu: Steam\'deki binlerce oyunu kanepede, yolda, yatakta oynayın. İsterseniz ekrana bağlayıp masaüstü PC gibi de kullanın.',
    specs:[['İşlemci','AMD APU (Zen 2 + RDNA 2)'],['Ekran','7" dokunmatik'],['Depolama','512GB NVMe SSD'],['Sistem','SteamOS (Linux)'],['Kontrol','Gamepad + izleme yüzeyleri']] },
  { id:43, cat:'oyun', name:'Nintendo Switch OLED Konsol', price:16999, oldPrice:18999, rating:4.8, reviews:3241, badge:'sale', icon:'gamepad-2', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('Nintendo_Switch_OLED_Model.jpg'),
    desc:'Evde TV\'de, yolda elde: 7 inç canlı OLED ekranıyla Switch OLED, Mario ve Zelda\'yı her yere taşır. Joy-Con\'ları ayırıp anında iki kişilik konsola dönüşür.',
    specs:[['Ekran','7" OLED'],['Mod','TV + masaüstü + el konsolu'],['Depolama','64GB (microSD destekli)'],['Kumanda','2x Joy-Con dahil']] },
  { id:44, cat:'oyun', name:'Xbox Series S Konsol 512GB', price:15999, oldPrice:null, rating:4.7, reviews:2109, badge:'bestseller', icon:'gamepad-2', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('Xbox_Series_S_with_controller_(transparent_background).png'),
    desc:'Yeni nesil oyunları en kompakt ve en uygun fiyatlı şekilde oynamanın yolu: tamamen dijital Series S, Game Pass ile yüzlerce oyuna anında erişim sunar.',
    specs:[['Performans','1440p 120fps\'e kadar'],['Depolama','512GB NVMe SSD'],['Özellik','Quick Resume, Game Pass'],['Boyut','Xbox tarihinin en küçük konsolu']] },
  { id:45, cat:'oyun', name:'Sony DualSense Edge Pro Kumanda', price:9499, oldPrice:null, rating:4.6, reviews:734, badge:'new', icon:'gamepad-2', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('DualSense_Edge_Controller.jpg'),
    desc:'PS5\'in e-spor sınıfı kumandası: değiştirilebilir analog çubuklar, ayarlanabilir tetik mesafesi, arka pedallar ve oyun içinde anında profil değiştirme.',
    specs:[['Özelleştirme','Değiştirilebilir çubuk modülleri'],['Tetikler','Ayarlanabilir durdurucu'],['Arka Tuşlar','2 ayarlanabilir pedal'],['Kutu','Taşıma çantası + kablo kilidi']] },
  { id:46, cat:'oyun', name:'Sony DualSense Kablosuz Kumanda', price:3299, oldPrice:3799, rating:4.7, reviews:2876, badge:'sale', icon:'gamepad-2', grad:'linear-gradient(150deg,#2a2f5c,#101528)',
    img:GD.commonsImg('Playstation_DualSense_Controller.png'),
    desc:'Haptik geri bildirim ve uyarlanabilir tetikleriyle DualSense, yağmur damlasını avucunuzda hissettirir; PC ile de uyumludur.',
    specs:[['Haptik','Gelişmiş titreşim motorları'],['Tetikler','Uyarlanabilir dirençli'],['Mikrofon','Dahili'],['Uyumluluk','PS5, PC, mobil']] },
  { id:47, cat:'oyun', name:'8BitDo Ultimate 2C Kablosuz Kumanda', price:1499, oldPrice:null, rating:4.6, reviews:892, badge:'new', icon:'gamepad-2', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('8BitDo_Ultimate_2C_gamepad_HS_DSC_2690.jpg'),
    desc:'Fiyat/performans şampiyonu kumanda: Hall Effect analoglar sayesinde "stick drift" derdi yok; PC, Switch ve Android ile saniyeler içinde eşleşir.',
    specs:[['Analog','Hall Effect (aşınmaz)'],['Bağlantı','2.4GHz + Bluetooth + kablolu'],['Pil','~30 saat'],['Uyumluluk','PC, Switch, Android']] },
  { id:48, cat:'oyun', name:'Meta Quest 3 VR Başlığı 512GB', price:23999, oldPrice:null, rating:4.7, reviews:1432, badge:'bestseller', icon:'monitor', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Meta_Quest_3_front_View.jpg'),
    desc:'Kablosuz, bilgisayarsız tam VR: renkli geçiş kameralarıyla gerçek odanızla sanal dünyayı karıştıran karma gerçeklik deneyimi. Kurulum 5 dakika, kablo yok.',
    specs:[['Çözünürlük','Göz başına 2064x2208'],['İşlemci','Snapdragon XR2 Gen 2'],['Karma Gerçeklik','Renkli passthrough'],['Depolama','512GB'],['Takip','İçeriden dışarı, harici sensörsüz']] },
  { id:49, cat:'oyun', name:'Meta Quest 2 VR Başlığı 128GB', price:12999, oldPrice:15999, rating:4.6, reviews:3654, badge:'sale', icon:'monitor', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('Meta_quest_2_38.jpg'),
    desc:'VR\'a başlamanın en uygun yolu: binlerce oyun ve uygulamaya erişimiyle Quest 2, hâlâ dünyanın en çok satan VR başlığı.',
    specs:[['Çözünürlük','Göz başına 1832x1920'],['Depolama','128GB'],['Takip','6DoF, sensörsüz'],['Kontrolcü','2x Touch kumanda dahil']] },
  { id:50, cat:'oyun', name:'Xbox Kablosuz Kumanda (Patrol Tech)', price:2299, oldPrice:null, rating:4.7, reviews:1965, badge:null, icon:'gamepad-2', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Xbox_One_Wireless_Controller_(Model_1708,_Patrol_Tech).jpg'),
    desc:'PC oyuncularının da standardı haline gelen Xbox kumandası: Bluetooth ile bilgisayara, telefona ve tablete tek tuşla bağlanır.',
    specs:[['Bağlantı','Bluetooth + Xbox Wireless'],['Pil','2x AA veya şarj kiti'],['Uyumluluk','Xbox, PC, Android, iOS'],['Renk','Patrol Tech özel seri']] },

  // Retro & Nostalji
  { id:51, cat:'retro', name:'Nintendo Game Boy Color (Atomic Purple)', price:4999, oldPrice:null, rating:4.8, reviews:687, badge:'bestseller', icon:'gamepad-2', grad:'linear-gradient(150deg,#3a2b52,#160f24)',
    img:GD.commonsImg('Nintendo-Game-Boy-Color-FL.jpg'),
    desc:'Kutusundan 90\'lar çıkıyor: şeffaf mor gövdeli koleksiyonluk Game Boy Color, orijinal kartuşlarla çalışan, pil ile haftalarca giden gerçek bir zaman makinesi.',
    specs:[['Ekran','Renkli TFT, arka ışıksız (orijinal)'],['Güç','2x AA pil, ~30 saat'],['Uyumluluk','GB + GBC kartuşları'],['Durum','Yenilenmiş, koleksiyonluk']] },
  { id:52, cat:'retro', name:'NES Klasik Kumanda (Orijinal)', price:899, oldPrice:null, rating:4.5, reviews:412, badge:null, icon:'gamepad-2', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('NES-Controller-Flat.jpg'),
    desc:'Oyun tarihinin en ikonik kumandası: iki tuş, bir artı yön tuşu ve sonsuz nostalji. Retro köşenizin olmazsa olmazı.',
    specs:[['Tip','Orijinal NES kumandası'],['Durum','Yenilenmiş'],['Kullanım','Koleksiyon / NES konsolları']] },
  { id:53, cat:'retro', name:'Tamagotchi Connection (2024 Yeniden Basım)', price:1999, oldPrice:null, rating:4.6, reviews:534, badge:'new', icon:'heart', grad:'linear-gradient(150deg,#45402a,#1a1810)',
    img:GD.commonsImg('Tamagotchi_Connection_-_2024_Re-Release.jpg'),
    desc:'90\'ların sanal evcil hayvanı resmi olarak geri döndü: besleyin, oynayın, büyütün. Kızılötesiyle arkadaşınızın Tamagotchi\'siyle bile tanıştırabilirsiniz.',
    specs:[['Model','Connection 2024 resmi yeniden basım'],['Bağlantı','Cihazdan cihaza iletişim'],['Güç','Düğme pil'],['Nesil','Orijinal V3 karakterleri']] },
  { id:54, cat:'retro', name:'Sony Sports Walkman WM-B52', price:3999, oldPrice:null, rating:4.4, reviews:276, badge:null, icon:'headphones', grad:'linear-gradient(150deg,#42305c,#170f26)',
    img:GD.commonsImg('Sony_WM-B52_Sports_Walkman_cassette_Player_(51879107619).jpg'),
    desc:'Sarı zırhlı efsane: 80\'lerin suya dayanıklı Sports Walkman\'i, kaset koleksiyonunuzu yeniden hayata döndürür. Çalışır durumda, koleksiyonluk.',
    specs:[['Format','Kompakt kaset'],['Seri','Sports (darbeye dayanıklı)'],['Güç','2x AA pil'],['Durum','Yenilenmiş, test edilmiş']] },
  { id:55, cat:'retro', name:'Polaroid OneStep Anlık Kamera', price:5999, oldPrice:null, rating:4.5, reviews:398, badge:null, icon:'camera', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('Polaroid_OneStep.jpg'),
    desc:'Gökkuşağı şeritli efsanevi Polaroid: deklanşöre basın, fotoğraf elinizde belirsin. Bugünkü tüm anlık kameraların atası, çalışır ve koleksiyonluk.',
    specs:[['Film','Polaroid 600 / SX-70 tipi'],['Odak','Sabit odak, tek tuş'],['Yıl','1977 tasarımı'],['Durum','Yenilenmiş, film ile test edilmiş']] },

  // Giyilebilir
  { id:56, cat:'giyilebilir', name:'Apple Watch Series 8 45mm GPS+LTE', price:17999, oldPrice:19999, rating:4.8, reviews:2431, badge:'sale', icon:'watch', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('Apple_Watch_Series_8_45mm_GPS%2BLTE.jpg'),
    desc:'Bileğinizde tam teşekküllü sağlık merkezi: EKG, kaza algılama, vücut sıcaklığı sensörü ve eSIM ile telefonsuz arama. iPhone kullanıcısının doğal uzantısı.',
    specs:[['Ekran','45mm Always-On Retina'],['Sağlık','EKG, SpO2, sıcaklık sensörü'],['Bağlantı','GPS + LTE (eSIM)'],['Güvenlik','Kaza ve düşme algılama'],['Su Direnci','50m']] },
  { id:57, cat:'giyilebilir', name:'Garmin Forerunner 965 Koşu Saati', price:27999, oldPrice:null, rating:4.9, reviews:876, badge:'new', icon:'watch', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('Garmin_Forerunner_965.jpeg'),
    desc:'Maratoncuların rüya saati: AMOLED ekran, harita üzerinde navigasyon, antrenman yükü analizi ve 23 güne varan pil. Koşuyu ciddiye alanların tercihi.',
    specs:[['Ekran','1.4" AMOLED + titanyum çerçeve'],['Pil','~23 gün (saat modu)'],['Harita','Dahili tam renkli haritalar'],['Analiz','Antrenman hazırlığı, yük oranı'],['GPS','Çok bantlı GNSS']] },
  { id:58, cat:'giyilebilir', name:'Garmin Forerunner 55 Koşu Saati', price:8999, oldPrice:9999, rating:4.7, reviews:1243, badge:'sale', icon:'watch', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('Garmin_Forerunner_55.jpg'),
    desc:'Koşuya yeni başlayanın en akıllı yatırımı: hazır antrenman önerileri, tahmini yarış süreleri ve 2 hafta pil ömrüyle sizi 5K\'dan yarı maratona taşır.',
    specs:[['Pil','~14 gün'],['Antrenman','Günlük öneri + PacePro'],['GPS','Dahili'],['Su Direnci','5 ATM']] },
  { id:59, cat:'giyilebilir', name:'Xiaomi Smart Band 7 Akıllı Bileklik', price:1199, oldPrice:1499, rating:4.5, reviews:3287, badge:'sale', icon:'watch', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('Xiaomi_Smart_Band_7.jpg'),
    desc:'Bütçe dostu giriş bilekliği: AMOLED ekran, 120 spor modu ve iki haftalık pille temel takibin tamamını yapar.',
    specs:[['Ekran','1.62" AMOLED'],['Pil','~14 gün'],['Spor Modları','120+'],['Su Direnci','5 ATM']] },

  // Ses & Kulaklık ekleri
  { id:60, cat:'kulaklik', name:'Apple AirPods Pro (2. Nesil)', price:11999, oldPrice:null, rating:4.8, reviews:4321, badge:'bestseller', icon:'headphones', grad:'linear-gradient(150deg,#2a2f5c,#101528)',
    img:GD.commonsImg('AirPods_Pro_(2nd_generation).jpg'),
    desc:'Kulak içi ANC\'nin zirvesi: bir önceki nesle göre 2 kat güçlü gürültü engelleme, uyarlanabilir şeffaflık ve kayıp modlu şarj kutusu.',
    specs:[['ANC','2x güçlü aktif gürültü engelleme'],['Ses','Uyarlanabilir, kişiselleştirilmiş uzamsal'],['Pil','6 saat + kutuyla 30 saat'],['Kutu','Hoparlörlü, Bul ağı destekli']] },
  { id:61, cat:'kulaklik', name:'Apple AirPods (3. Nesil)', price:8499, oldPrice:null, rating:4.6, reviews:2876, badge:null, icon:'headphones', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('AirPods_3.jpg'),
    desc:'Açık tasarımı sevenler için: uzamsal ses, ter direnci ve MagSafe şarj kutusuyla günlük kullanımın konforlu kulaklığı.',
    specs:[['Ses','Uzamsal ses + dinamik kafa takibi'],['Pil','6 saat + kutuyla 30 saat'],['Direnç','IPX4 ter ve su'],['Şarj','MagSafe / Lightning']] },
  { id:62, cat:'kulaklik', name:'Sony MDR-7506 Stüdyo Kulaklığı', price:4499, oldPrice:null, rating:4.8, reviews:1654, badge:'bestseller', icon:'headphones', grad:'linear-gradient(150deg,#2a2a3a,#12121c)',
    img:GD.commonsImg('Sony_MDR-7506_headphones.jpg'),
    desc:'30 yıldır dünyanın her kayıt stüdyosunda asılı duran efsane: renklendirmesiz, dürüst ses. Miksaj ve podcast düzenlemenin referans kulaklığı.',
    specs:[['Tip','Kapalı, kablolu'],['Sürücü','40mm neodim'],['Kablo','Spiral, 3m'],['Kullanım','Stüdyo/miksaj referansı']] },
  { id:63, cat:'kulaklik', name:'Sony WH-CH500 Kablosuz Kulaklık', price:1999, oldPrice:2499, rating:4.3, reviews:987, badge:'sale', icon:'headphones', grad:'linear-gradient(150deg,#42305c,#170f26)',
    img:GD.commonsImg('Sony_WH-CH500-40871.jpg'),
    desc:'20 saat pil ömrü ve hafif tasarımıyla günlük işe-okula gidiş dönüşün pratik kablosuz kulaklığı.',
    specs:[['Pil','~20 saat'],['Bağlantı','Bluetooth + NFC'],['Ağırlık','140g'],['Mikrofon','Dahili, aramalar için']] },
  { id:64, cat:'kulaklik', name:'JBL Flip 3 Taşınabilir Hoparlör', price:3499, oldPrice:null, rating:4.6, reviews:2143, badge:null, icon:'speaker', grad:'linear-gradient(150deg,#243a52,#0f1725)',
    img:GD.commonsImg('JBL_Flip_3_bluetooth_speaker_(DSCF2653).jpg'),
    desc:'Termos boyutunda parti sesi: su sıçramasına dayanıklı kumaş gövdesiyle piknikten duşa her yerin hoparlörü.',
    specs:[['Güç','2x 8W'],['Pil','~10 saat'],['Direnç','Su sıçramasına dayanıklı'],['Özellik','JBL Connect ile zincirleme']] },
  { id:65, cat:'kulaklik', name:'JBL Xtreme Bluetooth Hoparlör', price:8999, oldPrice:10999, rating:4.7, reviews:1432, badge:'sale', icon:'speaker', grad:'linear-gradient(150deg,#2a3f52,#101a25)',
    img:GD.commonsImg('JBL_Xtreme_Bluetooth_speaker,_28_cm_long,_battery_10.000_mAh.jpg'),
    desc:'Omuz askılı bas topu: 10.000mAh piliyle hem 15 saat müzik çalar hem de telefonunuzu şarj eder. Bahçe partilerinin ağır topu.',
    specs:[['Pil','10.000mAh, ~15 saat'],['Ekstra','Powerbank çıkışı'],['Direnç','Su sıçramasına dayanıklı'],['Boyut','28cm']] },
  { id:66, cat:'kulaklik', name:'JBL GO 2 Mini Hoparlör', price:1299, oldPrice:null, rating:4.4, reviews:3298, badge:'bestseller', icon:'speaker', grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    img:GD.commonsImg('JBL_GO2_Bluetooth_speaker_00_10_27_681000.jpeg'),
    desc:'Cebe sığan sabun boyutunda hoparlör: IPX7 su geçirmezliğiyle duşta, havuz başında, çantada her an yanınızda.',
    specs:[['Güç','3W'],['Pil','~5 saat'],['Su Direnci','IPX7'],['Ağırlık','184g']] },
  { id:67, cat:'kulaklik', name:'JBL PartyBox 710 Parti Hoparlörü', price:34999, oldPrice:null, rating:4.8, reviews:512, badge:'new', icon:'speaker', grad:'linear-gradient(150deg,#3a2b52,#160f24)',
    img:GD.commonsImg('JBL_PartyBox_710.jpg'),
    desc:'800W gücünde tekerlekli parti makinesi: müziğe eşlik eden ışık şovu, mikrofon ve gitar girişleriyle düğün-nişan dahil her etkinliği taşır.',
    specs:[['Güç','800W RMS'],['Işık','Müzikle senkron ışık şovu'],['Giriş','Mikrofon + gitar'],['Direnç','IPX4'],['Taşıma','Tekerlekli']] },

  // Araç & Ulaşım
  { id:68, cat:'ulasim', name:'Xiaomi M365 Pro 2 Elektrikli Scooter', price:18999, oldPrice:21999, rating:4.6, reviews:1876, badge:'sale', icon:'settings', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    img:GD.commonsImg('Xiaomi_M365_Pro_2.jpg'),
    desc:'Şehir içi ulaşımın standardı: 45 km menzil, uygulamadan hız takibi ve katlanınca ofise-tramvaya sığan gövde. Trafiği seyirci olarak izleyin.',
    specs:[['Menzil','~45 km'],['Hız','25 km/s (yasal sınır)'],['Motor','300W'],['Fren','Çift fren + KERS enerji geri kazanımı'],['Katlama','3 saniyede']] },
  { id:69, cat:'ulasim', name:'Segway Ninebot Kickscooter', price:24999, oldPrice:null, rating:4.7, reviews:943, badge:'new', icon:'settings', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Segway_Ninebot_(23849656504).jpg'),
    desc:'Segway güvenilirliğiyle güçlendirilmiş şehir scooter\'ı: dolgu lastikler patlak derdini bitirir, uygulama üzerinden hız modları ve kilit yönetilir.',
    specs:[['Lastik','Patlamaz dolgu lastik'],['Uygulama','Hız modu + uzaktan kilit'],['Işık','Ön-arka LED'],['Taşıma','Katlanabilir']] },
  { id:70, cat:'ulasim', name:'2K Araç İçi Yol Kayıt Kamerası (Dash Cam)', price:2999, oldPrice:3499, rating:4.5, reviews:1234, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('Dashcams_P1210466.JPG'),
    desc:'Trafikte sigortanız: çarpışma algıladığında görüntüyü otomatik kilitler, park halinde bile aracınızı izler. Kaza anında en güvenilir tanık.',
    specs:[['Çözünürlük','2K QHD'],['Kayıt','Döngüsel + G-sensör kilidi'],['Park Modu','Hareket algılamalı'],['Montaj','Vantuz / bant']] },

  // Kamp & Outdoor
  { id:71, cat:'outdoor', name:'BioLite CampStove 2 Şarjlı Kamp Sobası', price:6999, oldPrice:null, rating:4.7, reviews:654, badge:'bestseller', icon:'battery-charging', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('BioLite_Camp_Stove_2.jpg'),
    desc:'Ateşten elektrik üreten soba: dal parçalarıyla yemek pişirirken ürettiği elektrikle telefonunuzu şarj eder. Kampçılığın en "vay be" dedirten aleti.',
    specs:[['Enerji','Termoelektrik jeneratör, 3W USB'],['Yakıt','Dal, kozalak (gaz gerekmez)'],['Batarya','2600mAh dahili'],['Fan','4 kademeli alev kontrolü']] },
  { id:72, cat:'outdoor', name:'LifeStraw Kişisel Su Filtresi', price:1499, oldPrice:null, rating:4.8, reviews:2876, badge:'bestseller', icon:'thermometer', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Lifestraw_-_safe_drinking_water_(2722820246).jpg'),
    desc:'Dereden doğrudan içmenizi sağlayan pipet: bakterilerin %99.999999\'unu filtreler, 4000 litre boyunca çalışır. Acil durum çantasının bir numarası.',
    specs:[['Filtre','0.2 mikron membran'],['Kapasite','4000 litre'],['Koruma','Bakteri + parazit + mikroplastik'],['Ağırlık','46g, pilsiz-kimyasalsız']] },
  { id:73, cat:'outdoor', name:'Leatherman Wave Çok Amaçlı Pense', price:6499, oldPrice:null, rating:4.9, reviews:1987, badge:'bestseller', icon:'settings', grad:'linear-gradient(150deg,#2a2a3a,#12121c)',
    img:GD.commonsImg('Leatherman_Wave_060407_115706.jpg'),
    desc:'Cebinizde 17 alet: pense, bıçak, testere, eğe, tornavidalar ve makas tek gövdede. 25 yıl garantiyle nesilden nesile geçen bir alet.',
    specs:[['Alet','17\'si 1 arada'],['Kilit','Tüm bıçaklar kilitli'],['Malzeme','Paslanmaz çelik'],['Garanti','25 yıl']] },
  { id:74, cat:'outdoor', name:'Leatherman Charge XTi Premium Multitool', price:8999, oldPrice:null, rating:4.8, reviews:743, badge:null, icon:'settings', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('Leatherman-Charge-XTi.jpg'),
    desc:'Wave\'in titanyum saplı ağabeyi: S30V premium çelik bıçak ve değiştirilebilir uçlarıyla profesyonel kullanıcıların EDC tercihi.',
    specs:[['Sap','Titanyum'],['Bıçak','154CM / S30V çelik'],['Uçlar','Değiştirilebilir bit seti'],['Garanti','25 yıl']] },
  { id:75, cat:'outdoor', name:'Petzl Zoom Kafa Lambası', price:2499, oldPrice:null, rating:4.6, reviews:521, badge:null, icon:'map-pin', grad:'linear-gradient(150deg,#45402a,#1a1810)',
    img:GD.commonsImg('Petzl_Zoom_headlamp_(49232220028).jpg'),
    desc:'İki eliniz de serbest: kamp mutfağından gece yürüyüşüne, ayarlanabilir ışık huzmesiyle Petzl kalitesinde aydınlatma.',
    specs:[['Işık','Ayarlanabilir odak'],['Bant','Elastik, yıkanabilir'],['Güç','AA pil'],['Marka','Petzl (Fransa)']] },
  { id:76, cat:'outdoor', name:'Petzl e+LITE Acil Durum Kafa Lambası', price:1799, oldPrice:null, rating:4.7, reviews:387, badge:'new', icon:'map-pin', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('Head_Lamp_Petzl_e%2BLite_with_case.jpg'),
    desc:'26 gram, 10 yıl bekleme ömrü: kutusunda unutun, ihtiyaç anında çalışsın. Kırmızı mod ve düdüklü bandıyla gerçek bir acil durum aleti.',
    specs:[['Ağırlık','26g (kutulu 50g)'],['Bekleme','Pille 10 yıl saklanabilir'],['Mod','Beyaz + kırmızı + SOS yanıp sönme'],['Kutu','Sert taşıma kabı dahil']] },

  // Akıllı Ev ekleri
  { id:77, cat:'akilli-ev', name:'Ring Video Doorbell 2 Görüntülü Kapı Zili', price:4999, oldPrice:null, rating:4.5, reviews:1876, badge:'bestseller', icon:'shield-check', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('Ring_Video_Doorbell_2.jpg'),
    desc:'Kapınızı dünyanın her yerinden açın: zile basan kişiyi telefonunuzdan görün, konuşun; hareket algılayınca kayıt başlasın. Kargocuyla plajdan konuşabilirsiniz.',
    specs:[['Video','1080p HD, gece görüşü'],['Ses','Çift yönlü konuşma'],['Algılama','Ayarlanabilir hareket bölgeleri'],['Güç','Pil veya kablolu']] },
  { id:78, cat:'akilli-ev', name:'TP-Link Tapo C100 Güvenlik Kamerası', price:1199, oldPrice:1499, rating:4.6, reviews:3421, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('TP-Link_Tapo_C100.jpg'),
    desc:'Bu fiyata ev güvenliği: 1080p görüntü, gece görüşü, hareket bildirimi ve sesli uyarı. Kurulumu 2 dakika, aylık ücret yok.',
    specs:[['Video','1080p, gece görüşü'],['Algılama','Hareket + bildirim'],['Depolama','microSD (128GB)'],['Ses','Çift yönlü']] },
  { id:79, cat:'akilli-ev', name:'Google Nest Mini Akıllı Hoparlör', price:1499, oldPrice:null, rating:4.5, reviews:2765, badge:null, icon:'speaker', grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    img:GD.commonsImg('Google_Nest_Mini_-_202001_-_01.jpg'),
    desc:'Google Asistan\'lı mini hoparlör: duvara asılabilen gövdesi ve geri dönüştürülmüş kumaşıyla evin her odasına yayılan ses sistemi kurmanın en ucuz yolu.',
    specs:[['Asistan','Google Asistan'],['Montaj','Duvar askı delikli'],['Malzeme','Geri dönüştürülmüş kumaş'],['Çoklu Oda','Hoparlör grupları']] },
  { id:80, cat:'akilli-ev', name:'Amazon Echo Dot (5. Nesil) Saatli', price:2399, oldPrice:null, rating:4.7, reviews:1987, badge:'new', icon:'speaker', grad:'linear-gradient(150deg,#2a2f5c,#101528)',
    img:GD.commonsImg('Amazon_Echo_Dot_5th_Generation_With_Clock.jpg'),
    desc:'Echo Dot\'un LED ekranlı hali: saati, sıcaklığı, şarkı adını ve zamanlayıcıyı kumaş yüzeyin altından gösterir. Komodinin en şık asistanı.',
    specs:[['Ekran','LED nokta matris'],['Asistan','Alexa'],['Sensör','Sıcaklık'],['Ses','44mm sürücü']] },
  { id:81, cat:'akilli-ev', name:'Echo Dot (3. Nesil) Kumaş Kaplama', price:1299, oldPrice:1599, rating:4.5, reviews:4321, badge:'sale', icon:'speaker', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Alexa_Amazon_Echo_Dot_3rd_Gen_Smart_Speaker_-_Sandstone_Fabric_(Creative_Commons)_(51049273602).jpg'),
    desc:'Akıllı eve girişin en ucuz bileti: kum rengi kumaş kaplamasıyla her dekora uyan, milyonlarca evde çalan klasik Echo Dot.',
    specs:[['Asistan','Alexa'],['Renk','Sandstone kumaş'],['Çıkış','3.5mm ses çıkışı'],['Kullanım','Çoklu oda müzik']] },
  { id:82, cat:'akilli-ev', name:'Dyson Air Multiplier Pervanesiz Fan', price:12999, oldPrice:null, rating:4.6, reviews:876, badge:null, icon:'settings', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('Dyson_Air_Multipier_2.jpg'),
    desc:'Kanadı olmayan fan: içinden elinizi geçirebileceğiniz halkasıyla hem güvenli hem sessiz, kesintisiz ve pürüzsüz bir hava akımı üretir. Gören herkes "nasıl çalışıyor bu?" diye soruyor.',
    specs:[['Teknoloji','Air Multiplier (kanatsız)'],['Güvenlik','Çocuk ve evcil hayvan dostu'],['Temizlik','Silmesi saniyeler sürer'],['Ayar','Kademesiz hava akışı']] },
  { id:83, cat:'akilli-ev', name:'Xiaomi Smart Air Purifier 2S', price:5499, oldPrice:6499, rating:4.5, reviews:1543, badge:'sale', icon:'settings', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('Xiaomi_Smart_Air_Purifier_2S.jpg'),
    desc:'OLED ekranında anlık hava kalitesini gösteren sessiz hava temizleyici: polen mevsiminde ve şehir kirliliğinde evinizin ciğeri.',
    specs:[['Filtre','360° HEPA'],['Ekran','OLED PM2.5 göstergesi'],['Kapsama','~37 m²'],['Kontrol','Uygulama + sesli asistan']] },
  { id:84, cat:'akilli-ev', name:'iRobot Roomba 870 Robot Süpürge', price:14999, oldPrice:17999, rating:4.4, reviews:1123, badge:'sale', icon:'settings', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('IRobot_Roomba_870_(15860914940).jpg'),
    desc:'Robot süpürgeye uygun fiyatla başlangıç: fırçasız AeroForce silindirleriyle saç ve evcil hayvan tüyüne takılmadan gündelik temizliği devralır.',
    specs:[['Sistem','AeroForce fırçasız silindir'],['Program','Haftalık zamanlama'],['Sensör','Merdiven algılama'],['Dönüş','İstasyona otomatik']] },
  { id:85, cat:'akilli-ev', name:'Philips Hue White E27 Akıllı Ampul', price:799, oldPrice:null, rating:4.7, reviews:2654, badge:null, icon:'package', grad:'linear-gradient(150deg,#45402a,#1a1810)',
    img:GD.commonsImg('Philips_Hue_white_bulb_-_June_2018_(1944).jpg'),
    desc:'Hue ekosistemine tekli giriş: telefondan aç-kapa, karartma ve zamanlama. Bridge\'iniz varsa saniyeler içinde sisteme eklenir.',
    specs:[['Duy','E27'],['Karartma','Uygulamadan kademesiz'],['Uyum','Hue Bridge / Bluetooth'],['Ömür','~25.000 saat']] },

  // Mutfak ekleri
  { id:86, cat:'mutfak', name:'Vorwerk Thermomix TM6 Akıllı Mutfak Robotu', price:42999, oldPrice:null, rating:4.8, reviews:987, badge:'new', icon:'package', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('Thermomix_TM6_Vorwerk.jpg'),
    desc:'Tarifi ekranından adım adım gösterip kendisi pişiren robot: doğrar, yoğurur, tartar, buharda pişirir, sous-vide yapar. 20+ cihazın işini tek tezgah alanında görür.',
    specs:[['Fonksiyon','20+ pişirme modu'],['Ekran','6.8" dokunmatik + rehberli tarifler'],['Tarif','Cookidoo: 90.000+ tarif aboneliği'],['Tartı','Dahili hassas terazi']] },
  { id:87, cat:'mutfak', name:'SodaStream Crystal Soda Yapma Makinesi', price:4499, oldPrice:null, rating:4.5, reviews:1432, badge:null, icon:'package', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('SodaStream_Crystal_2.0.jpg'),
    desc:'Musluk suyunu 30 saniyede sodaya çeviren makine: cam karafıyla plastik şişe israfını bitirir, gazlılık seviyesini siz ayarlarsınız.',
    specs:[['Karaf','Cam, bulaşık makinesinde yıkanabilir'],['Tüp','60L CO2 (değiştirilebilir)'],['Güç','Elektrik gerektirmez'],['Tasarruf','Yılda yüzlerce pet şişe']] },
  { id:88, cat:'mutfak', name:'AeroPress Go Seyahat Kahve Demleyici', price:2499, oldPrice:null, rating:4.8, reviews:1123, badge:'new', icon:'package', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('2015_AeroPress_and_2020_AeroPress_Go.jpg'),
    desc:'AeroPress\'in valize giren hali: tüm parçalar kendi bardağının içine paketlenir. Otel odasında, kampta, ofiste 1 dakikada gerçek kahve.',
    specs:[['Paket','Bardak + kapak içinde toplanır'],['Demleme','~1 dakika'],['Kapasite','237ml'],['Ağırlık','326g']] },

  // Ofis & Üretkenlik
  { id:89, cat:'ofis', name:'Logitech MX Master Kablosuz Mouse', price:3999, oldPrice:null, rating:4.9, reviews:3214, badge:'bestseller', icon:'mouse', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('2017_Mysz_komputerowa_Logitech_MX_Master.jpg'),
    desc:'Üretkenlik faresi denince akla gelen ilk isim: başparmak tekerleği ile yatay kaydırma, 3 cihaz arasında tek tuşla geçiş ve camda bile çalışan sensör.',
    specs:[['Sensör','Darkfield (camda çalışır)'],['Tekerlek','Hız değiştiren MagSpeed'],['Cihaz','3 cihaz arası Easy-Switch'],['Pil','~40 gün']] },
  { id:90, cat:'ofis', name:'Keychron K4 Mekanik Klavye', price:3499, oldPrice:null, rating:4.7, reviews:1654, badge:null, icon:'keyboard', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Keychron_K4_mechanical_keyboard.jpg'),
    desc:'Mac ve Windows arasında yaşayanların mekanik klavyesi: %96 kompakt düzende numpad\'i korur, Bluetooth ile 3 cihaza bağlanır.',
    specs:[['Düzen','%96 (numpad dahil)'],['Bağlantı','Bluetooth 3 cihaz + kablolu'],['Switch','Gateron mekanik'],['Uyum','macOS + Windows tuş takımları']] },
  { id:91, cat:'ofis', name:'reMarkable 2 Dijital Kağıt Tablet', price:17999, oldPrice:null, rating:4.6, reviews:876, badge:'new', icon:'tablet', grad:'linear-gradient(150deg,#20403c,#0d1a18)',
    img:GD.commonsImg('ReMarkable_2_tablet_with_Wikipedia_article.jpg'),
    desc:'Kağıda yazma hissini birebir taklit eden 4.7mm incelikte e-mürekkep tablet: bildirimsiz, dikkat dağıtmayan bir odak aleti. Notlarınız anında buluta.',
    specs:[['Ekran','10.3" e-mürekkep, kağıt dokusu'],['Kalınlık','4.7mm'],['Pil','~2 hafta'],['Senkron','Bulut + PDF/ePub işaretleme'],['Odak','Bildirim yok, uygulama yok']] },
  { id:92, cat:'ofis', name:'Wacom Intuos4 Grafik Tablet', price:4999, oldPrice:5999, rating:4.7, reviews:1243, badge:'sale', icon:'tablet', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('Wacom_Intuos4_Pen_Tablet.jpg'),
    desc:'Dijital çizimin giriş kapısı: 2048 basınç seviyeli kalemiyle Photoshop\'ta gerçek fırça hissi. İllüstrasyondan fotoğraf rötuşuna sanatçının masa arkadaşı.',
    specs:[['Basınç','2048 seviye'],['Tuşlar','ExpressKey + dokunmatik halka'],['Kalem','Pilsiz, silgili'],['Bağlantı','USB']] },

  // Sağlık ekleri
  { id:93, cat:'saglik', name:'Omron Bilek Tipi Akıllı Tansiyon Aleti', price:1899, oldPrice:null, rating:4.6, reviews:2143, badge:'bestseller', icon:'heart', grad:'linear-gradient(150deg,#4a2a2a,#1c1010)',
    img:GD.commonsImg('An_Omron_wrist_blood_pressure_monitor.jpg'),
    desc:'Klinik doğrulukta ev ölçümü: bileğe takın, düğmeye basın; sonuçlar hafızada saklanır ve düzensiz nabız uyarısı verir. Aile büyüklerine en anlamlı hediye.',
    specs:[['Ölçüm','Tansiyon + nabız'],['Hafıza','Ölçüm geçmişi'],['Uyarı','Düzensiz kalp atışı'],['Tip','Bilekten, kompakt']] },
  { id:94, cat:'saglik', name:'Oral-B Genius X Akıllı Diş Fırçası', price:4999, oldPrice:5999, rating:4.6, reviews:1876, badge:'sale', icon:'settings', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('Oral-B_Genius_X_Electric_Toothbrush_-_48263287232.jpg'),
    desc:'Yapay zekâlı diş fırçası: fırçalama hareketlerinizi analiz edip ağzınızın hangi bölgesini ihmal ettiğinizi uygulamada gösterir. Diş hekiminizin en sevdiği gadget.',
    specs:[['AI','Fırçalama bölgesi takibi'],['Sensör','Basınç uyarısı'],['Mod','6 temizlik modu'],['Pil','~2 hafta']] },

  // Maker & Hobi ekleri
  { id:95, cat:'hobi', name:'Original Prusa i3 3D Yazıcı', price:27999, oldPrice:null, rating:4.9, reviews:1123, badge:'bestseller', icon:'grid', grad:'linear-gradient(150deg,#4a2f2a,#1c1310)',
    img:GD.commonsImg('Prusa_i3_-_RepRap_3D_printer_printing.jpg'),
    desc:'3D baskı dünyasının güvenilirlik efsanesi: kutudan çıkar çıkmaz kaliteli baskı, otomatik tabla kalibrasyonu ve devasa topluluk desteği.',
    specs:[['Baskı Hacmi','25x21x21 cm'],['Kalibrasyon','Otomatik mesh leveling'],['Filament','PLA, PETG, ABS, esnek'],['Topluluk','Açık kaynak tasarım']] },
  { id:96, cat:'hobi', name:'Creality Ender 3 V4 3D Yazıcı', price:9999, oldPrice:11999, rating:4.6, reviews:2876, badge:'sale', icon:'grid', grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)',
    img:GD.commonsImg('Creality_Ender_3_V4.png'),
    desc:'Dünyanın en çok satan hobi 3D yazıcı ailesinin yeni üyesi: bu fiyata ilk yazıcı olarak rakipsiz; yükseltme ve modifiye topluluğu devasa.',
    specs:[['Baskı Hacmi','22x22x25 cm'],['Hız','Yüksek hız modu'],['Tabla','Esnek manyetik PEI'],['Seviye','Otomatik kalibrasyon']] },
  { id:97, cat:'hobi', name:'BBC micro:bit v2 Eğitim Bilgisayarı', price:1099, oldPrice:null, rating:4.8, reviews:1432, badge:'new', icon:'grid', grad:'linear-gradient(150deg,#2f3a52,#111725)',
    img:GD.commonsImg('BBC_Micro_Bit_with_original_Packaging.jpg'),
    desc:'Çocuklara kod öğreten kart: 25 LED\'lik ekranı, sensörleri ve blok tabanlı kodlamasıyla 8 yaşından itibaren robotik ve programlamaya en tatlı giriş.',
    specs:[['Ekran','5x5 LED matris'],['Sensör','İvme, pusula, mikrofon, hoparlör'],['Kodlama','Blok (MakeCode) + Python'],['Bağlantı','Bluetooth + USB']] },
  { id:98, cat:'hobi', name:'ESP32 Wi-Fi + Bluetooth Geliştirme Kartı', price:449, oldPrice:null, rating:4.7, reviews:3214, badge:'bestseller', icon:'grid', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg'),
    desc:'Akıllı ev projelerinin kalbi: bu fiyata Wi-Fi + Bluetooth\'lu çift çekirdekli kart başka yok. Sensör bağlayın, eviniz sizin kurallarınızla akıllansın.',
    specs:[['İşlemci','Çift çekirdek 240MHz'],['Bağlantı','Wi-Fi + Bluetooth'],['GPIO','30+ pin'],['Ekosistem','Arduino IDE + MicroPython']] },

  // Kamera & İçerik ekleri
  { id:99, cat:'kamera', name:'DJI Osmo Pocket 3 Cep Gimbal Kamerası', price:19999, oldPrice:null, rating:4.8, reviews:1234, badge:'bestseller', icon:'camera', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    img:GD.commonsImg('DJI_Osmo_Pocket_3_-_1.jpg'),
    desc:'Cebe giren 3 eksenli sinema kamerası: 1 inç sensörü ve mekanik sabitlemesiyle yürürken çekilmiş görüntüyü ray üzerinde çekilmiş gibi gösterir.',
    specs:[['Sensör','1" CMOS'],['Video','4K120'],['Sabitleme','3 eksen mekanik gimbal'],['Ekran','Döner dokunmatik'],['Odak','Otomatik yüz takibi']] },
  { id:100, cat:'kamera', name:'Ricoh Theta S 360° Kamera', price:8999, oldPrice:null, rating:4.4, reviews:654, badge:null, icon:'camera', grad:'linear-gradient(150deg,#38305c,#150f26)',
    img:GD.commonsImg('Ricoh_Theta_S.jpg'),
    desc:'Tek basışta her yönü çeken kamera: iki balıkgözü lensiyle 360° fotoğraf ve video kaydeder; sanal turlar ve VR içerikleri için ideal.',
    specs:[['Görüş','Tam 360° küresel'],['Lens','Çift balıkgözü'],['Video','Full HD 360°'],['Paylaşım','Uygulamayla anında']] },
  { id:101, cat:'kamera', name:'GoPro Hero 11 Black', price:17999, oldPrice:19999, rating:4.8, reviews:1543, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#22345c,#0e1526)',
    img:GD.commonsImg('GoPro_Hero_8_Black_and_Hero_11_Black.JPG'),
    desc:'Yeni 8:7 sensörüyle tek çekimden hem yatay hem dikey video çıkaran aksiyon kamerası: 5.3K60 video ve HyperSmooth 5.0 sabitleme.',
    specs:[['Video','5.3K60 / 4K120'],['Sensör','8:7 geniş sensör'],['Sabitleme','HyperSmooth 5.0'],['Su Direnci','10m kasasız']] },
  { id:102, cat:'kamera', name:'GoPro Hero Session Mini Aksiyon Kamerası', price:5999, oldPrice:null, rating:4.4, reviews:876, badge:null, icon:'camera', grad:'linear-gradient(150deg,#1c3a44,#0c1720)',
    img:GD.commonsImg('GoPro_Session_4_Camera.jpg'),
    desc:'Küp şeker boyutunda GoPro: kaska, tasmaya, gidona takıldığını unutturacak kadar küçük ve hafif; tek tuşla kayda başlar.',
    specs:[['Boyut','38mm küp, 74g'],['Video','1440p60'],['Su Direnci','10m kasasız'],['Kontrol','Tek tuş kayıt']] },
  { id:103, cat:'kamera', name:'DJI Mini 2 Katlanabilir Drone', price:17999, oldPrice:20999, rating:4.7, reviews:2143, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#2a3a52,#101725)',
    img:GD.commonsImg('DJI_Mini_2.jpg'),
    desc:'Drone\'a başlamanın altın standardı: 249 gram, 4K kamera ve 10 km görüntü aktarımı. İlk drone\'unuzsa buradan başlayın.',
    specs:[['Ağırlık','249g'],['Kamera','4K30'],['Menzil','10 km OcuSync'],['Uçuş','~31 dk']] },
  { id:104, cat:'kamera', name:'DJI Mini 3 Pro Drone', price:27999, oldPrice:null, rating:4.8, reviews:1432, badge:null, icon:'camera', grad:'linear-gradient(150deg,#1f3550,#0d1622)',
    img:GD.commonsImg('DJI_Mini_3_Pro.jpg'),
    desc:'Mini gövdede profesyonel özellikler: üç yönlü engel algılama, dikey çekim için dönen kamera ve 4K60 HDR video.',
    specs:[['Kamera','4K60 HDR, dikey çekim'],['Engel','3 yönlü algılama'],['Ağırlık','249g'],['Uçuş','~34 dk']] },
  { id:105, cat:'kamera', name:'Fujifilm Instax Mini Link Telefon Yazıcısı', price:4999, oldPrice:null, rating:4.6, reviews:1123, badge:'new', icon:'camera', grad:'linear-gradient(150deg,#45402a,#1a1810)',
    img:GD.commonsImg('Instax_Instant_Camera_(49400493178)_(cropped)_instax_mini_link.jpg'),
    desc:'Telefondaki fotoğrafları saniyeler içinde gerçek Instax kartlarına basan cep yazıcısı: parti anılarını anında dağıtın, buzdolabı kapılarını doldurun.',
    specs:[['Baskı','Instax Mini film'],['Bağlantı','Bluetooth, uygulamalı'],['Hız','~12 saniyede baskı'],['Eğlence','Video karesi yakalama modu']] },
  { id:106, cat:'kamera', name:'Fujifilm Instax Mini 90 Neo Classic', price:6499, oldPrice:null, rating:4.7, reviews:876, badge:null, icon:'camera', grad:'linear-gradient(150deg,#2a2a3a,#12121c)',
    img:GD.commonsImg('Fujifilm_Instax_mini_90.jpg'),
    desc:'Instax ailesinin retro-şık amiral gemisi: çift pozlama ve bulb modu gibi yaratıcı özellikleriyle anlık fotoğrafçılığı sanata çevirir.',
    specs:[['Mod','Çift pozlama, bulb, makro'],['Tasarım','Deri dokulu retro gövde'],['Pil','Şarj edilebilir'],['Film','Instax Mini']] },
  { id:107, cat:'kamera', name:'Fujifilm Instax Mini 25 Anlık Kamera', price:3499, oldPrice:3999, rating:4.4, reviews:1345, badge:'sale', icon:'camera', grad:'linear-gradient(150deg,#42305c,#170f26)',
    img:GD.commonsImg('Fujifilm_Instax_Mini_25_Camera_Front.jpg'),
    desc:'İki deklanşörlü pratik Instax: dikey de yatay da tek elle çekim, selfie aynası ve otomatik flaş ayarıyla parti dostu.',
    specs:[['Deklanşör','Dikey + yatay çift tuş'],['Selfie','Ayna dahil'],['Flaş','Otomatik dolgu'],['Film','Instax Mini']] },

  // Aksesuar ekleri
  { id:108, cat:'aksesuar', name:'Anker PowerCore 10000 Powerbank', price:1299, oldPrice:null, rating:4.7, reviews:4532, badge:'bestseller', icon:'battery-charging', grad:'linear-gradient(150deg,#2a3f52,#101a25)',
    img:GD.commonsImg('Anker_power_bank_lit.jpg'),
    desc:'Kredi kartından biraz büyük gövdede 10.000mAh: çoğu telefonu iki kez doldurur, LED göstergesiyle kalan gücü her an bilirsiniz.',
    specs:[['Kapasite','10.000mAh'],['Şarj','PowerIQ hızlı şarj'],['Boyut','Cebe sığar, 180g'],['Gösterge','LED şarj seviyesi']] }
];

/*
 * Konu bazlı gerçek ürün setleri. productIds set içeriğini katalogdaki
 * gerçek ürünlere bağlar; thumbs aynı ürünlerin gerçek fotoğraflarını kullanır.
 */
GD.SETS = [
  { id:'s1', group:'Akıllı Ev', name:'Akıllı Ev Başlangıç Seti', featured:true, items:4, price:37999, oldPrice:43299,
    productIds:[17,18,19,20],
    desc:'Evinizi tek pakette akıllandırın: Alexa\'lı Echo Dot, Philips Hue akıllı aydınlatma kiti, kendi çöpünü boşaltan Roomba i7+ ve faturanızı düşüren Nest öğrenen termostat.',
    features:['Echo Dot + Hue kit + Roomba i7+ + Nest termostat','Tek uygulama önerisiyle kurulum rehberi dahil','Sesli komutla ışık, süpürge ve ısıtma kontrolü'],
    thumbs:[
      {icon:'speaker',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('The_black_Amazon_Echo_Dot_(fifth_generation)_on_wooden_table.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('Philips_Hue_hub_and_2_bulbs.jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('IRobot_Roomba_i7%2B.jpg')} ] },
  { id:'s2', group:'Seyahat & Outdoor', name:'Gezgin Teknoloji Seti', featured:true, items:4, price:16999, oldPrice:19799,
    productIds:[21,22,23,24],
    desc:'Sık seyahat edenlerin hayalindeki valiz: bavulunuzu takip eden AirTag, binlerce kitaplık Kindle, uçak sesini yok eden Sony ANC kulaklık ve cebe sığan Anker powerbank.',
    features:['AirTag + Kindle + Sony XM3 + PowerCore 5000','Uçuş modunda haftalarca pil ömrü kombinasyonu','Kayıp bavul stresine son'],
    thumbs:[
      {icon:'map-pin',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('Apple_AirTags_einrichten.jpg')},
      {icon:'tablet',grad:'linear-gradient(150deg,#20403c,#0d1a18)', img:GD.commonsImg('Amazon_Kindle_Paperwhite_5_Eleventh_Generation_(C2V2L3)_6-inch_e-reader.jpg')},
      {icon:'headphones',grad:'linear-gradient(150deg,#42305c,#170f26)', img:GD.commonsImg('Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.2.jpg')} ] },
  { id:'s3', group:'Mutfak', name:'Akıllı Mutfak Seti', featured:false, items:4, price:18999, oldPrice:22199,
    productIds:[25,26,27,28],
    desc:'Mutfağı teknoloji üssüne çeviren dörtlü: kült AeroPress kahve demleyici, yağsız kızartan Airfryer, 19 bar Nespresso ve 7\'si 1 arada Instant Pot.',
    features:['AeroPress + Airfryer + Nespresso + Instant Pot','Kahveden akşam yemeğine tam donanım','Yeni eve çıkanlar için ideal hediye paketi'],
    thumbs:[
      {icon:'package',grad:'linear-gradient(150deg,#4a2a2a,#1c1010)', img:GD.commonsImg('Red_AeroPress_with_Accessories.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('Airfryer.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('Instant_Pot_(49907000991).jpg')} ] },
  { id:'s4', group:'Hobi & Maker', name:'Maker & Hobi Elektroniği Seti', featured:false, items:4, price:21999, oldPrice:25799,
    productIds:[29,30,31,32],
    desc:'Kurcalamayı sevenlere: Raspberry Pi 5 mini bilgisayar, Tamagotchi görünümlü Flipper Zero, efsane Arduino Uno ve LCD tuşlu Stream Deck + tek sette.',
    features:['Raspberry Pi 5 + Flipper Zero + Arduino + Stream Deck +','Başlangıç proje rehberleri dahil','Elektronik meraklısına en iyi hediye'],
    thumbs:[
      {icon:'grid',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Raspberry_Pi_5.jpg')},
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('Flipper_Zero.jpg')},
      {icon:'grid',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('Arduino_Uno_R3.JPG')} ] },
  { id:'s5', group:'Sağlık & Spor', name:'Sağlık & Zinde Yaşam Seti', featured:false, items:5, price:39999, oldPrice:46899,
    productIds:[33,34,35,36,37],
    desc:'Vücudunuzu uçtan uca izleyen beşli: Smart Band 8 bileklik, Withings akıllı tartı, EKG çeken ScanWatch 2, Theragun masaj tabancası ve Oura akıllı yüzük.',
    features:['Bileklik + tartı + hibrit saat + masaj + akıllı yüzük','Uyku, nabız, EKG ve toparlanma takibi','Tüm veriler telefon uygulamalarında'],
    thumbs:[
      {icon:'watch',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('Xiaomi_Mi_Band_8.jpg')},
      {icon:'watch',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('Withings_ScanWatch_2_white.jpg')},
      {icon:'heart',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('OURA_Ring_-_1.jpg')} ] },
  { id:'s6', group:'Kamera & İçerik', name:'İçerik Üretici Seti', featured:false, items:4, price:52999, oldPrice:60499,
    productIds:[38,39,40,41],
    desc:'Vlog\'dan drone çekimine komple stüdyo: GoPro Hero 9 Black, 249 gramlık DJI Mini 4 Pro drone, retro Instax Mini 70 ve efsanevi Blue Yeti mikrofon.',
    features:['GoPro + DJI Mini 4 Pro + Instax + Blue Yeti','5K video, 4K HDR drone ve stüdyo sesi','YouTube\'a başlamak için gereken her şey'],
    thumbs:[
      {icon:'camera',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('GoPro_Hero_9_Black_-_Front_2.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('2024_Dron_DJI_Mini_4_Pro_(01).jpg')},
      {icon:'mic',grad:'linear-gradient(150deg,#2a2a3a,#12121c)', img:GD.commonsImg('Blue_Yeti_Blackout.jpg')} ] },

  { id:'s7', group:'Akıllı Ev', name:'Akıllı Ev Güvenlik Seti', featured:false, items:4, price:8999, oldPrice:10099,
    productIds:[77,78,79,80],
    desc:'Evinizi uzaktan gözünüz gibi koruyun: Ring görüntülü kapı zili, Tapo güvenlik kamerası ve iki akıllı hoparlörle sesli kontrollü güvenlik merkezi.',
    features:['Ring Doorbell 2 + Tapo C100 + Nest Mini + Echo Dot Saatli','Kapı ve oda görüntüsü telefonunuzda','Sesli komutla kontrol'],
    thumbs:[
      {icon:'shield-check',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('Ring_Video_Doorbell_2.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('TP-Link_Tapo_C100.jpg')},
      {icon:'speaker',grad:'linear-gradient(150deg,#20403c,#0d1a18)', img:GD.commonsImg('Google_Nest_Mini_-_202001_-_01.jpg')} ] },
  { id:'s8', group:'Akıllı Ev', name:'Temiz Hava & Konfor Seti', featured:false, items:4, price:29999, oldPrice:34299,
    productIds:[82,83,84,85],
    desc:'Ev konforunun dört ayağı: pervanesiz Dyson fan, Xiaomi hava temizleyici, Roomba robot süpürge ve Hue akıllı ampul.',
    features:['Dyson Air Multiplier + Air Purifier 2S + Roomba 870 + Hue White','Temiz hava, temiz zemin, akıllı ışık','Alerji mevsiminin kurtarıcısı'],
    thumbs:[
      {icon:'settings',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('Dyson_Air_Multipier_2.jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('Xiaomi_Smart_Air_Purifier_2S.jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('IRobot_Roomba_870_(15860914940).jpg')} ] },
  { id:'s9', group:'Oyun & Eğlence', name:'Konsol Oyuncu Mega Seti', featured:true, items:4, price:64999, oldPrice:72499,
    productIds:[42,43,44,45],
    desc:'Üç platform tek pakette: Steam Deck ile PC oyunları, Switch OLED ile Nintendo dünyası, Series S ile Game Pass ve DualSense Edge ile pro kontrol.',
    features:['Steam Deck + Switch OLED + Xbox Series S + DualSense Edge','Evde ve yolda sınırsız oyun','Oyuncu evinin komple kurulumu'],
    thumbs:[
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#4a2a2a,#1c1010)', img:GD.commonsImg('Steam_Deck_(front).jpg')},
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('Nintendo_Switch_OLED_Model.jpg')},
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Xbox_Series_S_with_controller_(transparent_background).png')} ] },
  { id:'s10', group:'Oyun & Eğlence', name:'Retro & Nostalji Seti', featured:false, items:5, price:14999, oldPrice:17899,
    productIds:[51,52,53,54,55],
    desc:'90\'ları kutuya koyduk: Game Boy Color, NES kumandası, yeni basım Tamagotchi, Sports Walkman ve Polaroid OneStep. Nostaljinin tam dozu.',
    features:['Game Boy + NES kumanda + Tamagotchi + Walkman + Polaroid','Hepsi çalışır durumda, koleksiyonluk','30+ yaş hediyelerinin şampiyonu'],
    thumbs:[
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('Nintendo-Game-Boy-Color-FL.jpg')},
      {icon:'heart',grad:'linear-gradient(150deg,#45402a,#1a1810)', img:GD.commonsImg('Tamagotchi_Connection_-_2024_Re-Release.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('Polaroid_OneStep.jpg')} ] },
  { id:'s11', group:'Oyun & Eğlence', name:'VR Kaşifi Seti', featured:false, items:4, price:36999, oldPrice:41799,
    productIds:[48,49,47,46],
    desc:'Sanal gerçekliğe aile boyu giriş: Quest 3 size, Quest 2 eve gelen misafire; iki kumandayla düz ekran oyunları da eksik kalmaz.',
    features:['Quest 3 + Quest 2 + 8BitDo + DualSense','Kablosuz, bilgisayarsız VR','İki kişilik VR partileri'],
    thumbs:[
      {icon:'monitor',grad:'linear-gradient(150deg,#38305c,#150f26)', img:GD.commonsImg('Meta_Quest_3_front_View.jpg')},
      {icon:'monitor',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('Meta_quest_2_38.jpg')},
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#2a2f5c,#101528)', img:GD.commonsImg('Playstation_DualSense_Controller.png')} ] },
  { id:'s12', group:'Seyahat & Outdoor', name:'Kamp & Doğa Seti', featured:true, items:4, price:14999, oldPrice:17499,
    productIds:[71,72,73,75],
    desc:'Doğada elektrik, temiz su, alet ve ışık: ateşten telefon şarj eden BioLite, dereden içiren LifeStraw, 17 aletli Leatherman ve Petzl kafa lambası.',
    features:['BioLite CampStove 2 + LifeStraw + Leatherman Wave + Petzl Zoom','Şebekeden bağımsız kamp donanımı','Deprem/acil durum çantası için de ideal'],
    thumbs:[
      {icon:'battery-charging',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('BioLite_Camp_Stove_2.jpg')},
      {icon:'thermometer',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('Lifestraw_-_safe_drinking_water_(2722820246).jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#2a2a3a,#12121c)', img:GD.commonsImg('Leatherman_Wave_060407_115706.jpg')} ] },
  { id:'s13', group:'Seyahat & Outdoor', name:'EDC Cep Seti', featured:false, items:4, price:11499, oldPrice:13499,
    productIds:[74,76,108,21],
    desc:'Her gün yanınızda taşıyacağınız dörtlü: titanyum Leatherman Charge, 26 gramlık acil durum feneri, cep powerbank\'i ve anahtarlığınıza AirTag.',
    features:['Leatherman Charge XTi + Petzl e+LITE + PowerCore 10000 + AirTag','Cebe ve anahtarlığa sığan hazırlık','"Her ihtimale karşı" kültürünün başlangıç paketi'],
    thumbs:[
      {icon:'settings',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Leatherman-Charge-XTi.jpg')},
      {icon:'map-pin',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('Head_Lamp_Petzl_e%2BLite_with_case.jpg')},
      {icon:'battery-charging',grad:'linear-gradient(150deg,#2a3f52,#101a25)', img:GD.commonsImg('Anker_power_bank_lit.jpg')} ] },
  { id:'s14', group:'Mutfak', name:'Şef Mutfağı Pro Seti', featured:false, items:3, price:44999, oldPrice:49999,
    productIds:[86,87,88],
    desc:'Mutfağın lüks segmenti: tarifini kendisi pişiren Thermomix TM6, cam karaflı SodaStream ve valize giren AeroPress Go.',
    features:['Thermomix TM6 + SodaStream Crystal + AeroPress Go','90.000+ rehberli tarif aboneliğiyle','Yemek yapmayı sevenlere zirve hediye'],
    thumbs:[
      {icon:'package',grad:'linear-gradient(150deg,#4a2a2a,#1c1010)', img:GD.commonsImg('Thermomix_TM6_Vorwerk.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('SodaStream_Crystal_2.0.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('2015_AeroPress_and_2020_AeroPress_Go.jpg')} ] },
  { id:'s15', group:'Hobi & Maker', name:'3D Baskı Atölyesi Seti', featured:false, items:4, price:34999, oldPrice:39549,
    productIds:[95,96,97,98],
    desc:'Evde üretim üssü: güvenilir Prusa i3, modifiyeye açık Ender 3 V4, çocuklar için micro:bit ve akıllı ev projeleri için ESP32.',
    features:['Prusa i3 + Ender 3 V4 + micro:bit + ESP32','Baskıdan elektroniğe tam atölye','Aile boyu maker kültürü'],
    thumbs:[
      {icon:'grid',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('Prusa_i3_-_RepRap_3D_printer_printing.jpg')},
      {icon:'grid',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Creality_Ender_3_V4.png')},
      {icon:'grid',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('BBC_Micro_Bit_with_original_Packaging.jpg')} ] },
  { id:'s16', group:'Sağlık & Spor', name:'Koşucu Performans Seti', featured:false, items:4, price:44999, oldPrice:50199,
    productIds:[57,58,60,59],
    desc:'Antrenmandan yarışa: haritalı Forerunner 965 size, Forerunner 55 koşu arkadaşınıza; AirPods Pro kulakta, Smart Band 7 yedekte.',
    features:['Forerunner 965 + Forerunner 55 + AirPods Pro 2 + Smart Band 7','Antrenman yükü ve toparlanma analizi','Koşu kulübü çiftler paketi'],
    thumbs:[
      {icon:'watch',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Garmin_Forerunner_965.jpeg')},
      {icon:'headphones',grad:'linear-gradient(150deg,#2a2f5c,#101528)', img:GD.commonsImg('AirPods_Pro_(2nd_generation).jpg')},
      {icon:'watch',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('Xiaomi_Smart_Band_7.jpg')} ] },
  { id:'s17', group:'Kamera & İçerik', name:'Vlogger Pro Seti', featured:false, items:4, price:45999, oldPrice:51999,
    productIds:[99,100,101,105],
    desc:'Yeni nesil içerik üretimi: gimbal\'lı Osmo Pocket 3, 360° Theta S, GoPro Hero 11 ve anıları anında basan Instax Mini Link.',
    features:['Osmo Pocket 3 + Theta S + GoPro Hero 11 + Instax Mini Link','Yürürken sinema, her yönden çekim','Seyahat vlogger\'ının valiz seti'],
    thumbs:[
      {icon:'camera',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('DJI_Osmo_Pocket_3_-_1.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#38305c,#150f26)', img:GD.commonsImg('Ricoh_Theta_S.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('GoPro_Hero_8_Black_and_Hero_11_Black.JPG')} ] },
  { id:'s18', group:'Ses & Parti', name:'Parti & Müzik Seti', featured:false, items:4, price:42999, oldPrice:48799,
    productIds:[67,65,64,66],
    desc:'Bahçe düğününden piknik keyfine dört boy hoparlör: 800W PartyBox sahneyi, Xtreme bahçeyi, Flip 3 masayı, GO 2 duşu devralır.',
    features:['PartyBox 710 + Xtreme + Flip 3 + GO 2','Işık şovu + mikrofon girişiyle karaoke','Her ortama uygun dört boy ses'],
    thumbs:[
      {icon:'speaker',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('JBL_PartyBox_710.jpg')},
      {icon:'speaker',grad:'linear-gradient(150deg,#2a3f52,#101a25)', img:GD.commonsImg('JBL_Xtreme_Bluetooth_speaker,_28_cm_long,_battery_10.000_mAh.jpg')},
      {icon:'speaker',grad:'linear-gradient(150deg,#243a52,#0f1725)', img:GD.commonsImg('JBL_Flip_3_bluetooth_speaker_(DSCF2653).jpg')} ] },
  { id:'s19', group:'Ulaşım', name:'Elektrikli Ulaşım Seti', featured:false, items:3, price:41999, oldPrice:46999,
    productIds:[68,69,70],
    desc:'Trafiğe veda paketi: Xiaomi M365 Pro 2 size, Ninebot eşinize; dash cam de aracınızda kalanları kaydetsin.',
    features:['M365 Pro 2 + Segway Ninebot + 2K Dash Cam','45 km menzil, uygulamalı takip','Benzine değil kendinize harcayın'],
    thumbs:[
      {icon:'settings',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('Xiaomi_M365_Pro_2.jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('Segway_Ninebot_(23849656504).jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('Dashcams_P1210466.JPG')} ] }
];

GD.escapeHtml = function(str){
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// GD.getProduct artık catalog.js tarafından (admin panelinin yönetebildiği
// dinamik ürün deposu üzerinden) tanımlanır.
GD.getCategoryLabel = key => (GD.getCategories().find(c => c.key === key) || {}).label || key;

/*
 * Ürün detay sayfasındaki galeri slaytlarını üretir. Gerçek fotoğrafı
 * (img / images) olan ürünlerde onları kullanır; olmayanlarda aynı ikonu
 * farklı gradyan açı/renk sıralamalarıyla tekrar kullanarak bir
 * "çoklu görsel" hissi veriyoruz.
 */
GD.getGallery = function(product){
  if(Array.isArray(product.images) && product.images.length){
    return product.images.map(src => ({ img: src, icon: product.icon, grad: product.grad }));
  }
  if(product.img){
    return [{ img: product.img, icon: product.icon, grad: product.grad }];
  }
  const { angle, c1, c2 } = GD.parseGradient(product.grad);
  return [
    { icon: product.icon, grad: `linear-gradient(${angle}deg,${c1},${c2})` },
    { icon: product.icon, grad: `linear-gradient(${(angle + 90) % 360}deg,${c2},${c1})` },
    { icon: product.icon, grad: `linear-gradient(${(angle + 180) % 360}deg,${c1},${c2})` },
    { icon: product.icon, grad: `linear-gradient(${(angle + 270) % 360}deg,${c2},${c1})` }
  ];
};

/* ---------- Müşteri Yorumları (reviews.html) ---------- */
(function(){
  const REVIEWS_KEY = 'gd_reviews';
  const SEED_REVIEWS = [
    { id:'r1', name:'Elif K.', rating:5, productId:1, date:'2026-06-02', comment:'Aurora X12 Pro kamerası gerçekten harika, kargo da 1 günde geldi. Kesinlikle tavsiye ederim.' },
    { id:'r2', name:'Mert Y.', rating:4, productId:7, date:'2026-06-10', comment:'PulseSound kulaklığın gürültü engelleme özelliği bu fiyata beklediğimden iyi çıktı. Sadece kutusu biraz hırpalanmış geldi.' },
    { id:'r3', name:'Zeynep A.', rating:5, productId:4, date:'2026-05-22', comment:'NovaBook ile video kurgu yapıyorum, hiç takılma yaşamadım. Yıllardır aldığım en iyi teknoloji ürünü.' },
    { id:'r4', name:'Can T.', rating:3, productId:11, date:'2026-05-15', comment:'VoltGrip gamepad fena değil ama Bluetooth bağlantısı bazen kopuyor. Kablolu kullanınca sorun yok.' },
    { id:'r5', name:'Selin D.', rating:5, productId:15, date:'2026-04-30', comment:'ChronoFit 2 ile uyku takibi çok isabetli. Pil ömrü de iddia edildiği gibi gerçekten bir hafta gidiyor.' },
    { id:'r6', name:'Ahmet B.', rating:4, productId:13, date:'2026-04-18', comment:'PowerCell powerbank günlük kullanımda telefonu 3 kez dolduruyor, seyahatlerde artık yanımdan ayırmıyorum.' },
    { id:'r7', name:'Buse S.', rating:2, productId:9, date:'2026-04-05', comment:'StudioMic mikrofonun sesi iyi ama masaüstü standı biraz oynak, ekstra bir stand almanız gerekebilir.' },
    { id:'r8', name:'Onur K.', rating:5, productId:10, date:'2026-03-28', comment:'StrikePad klavye ile refleks süresi gerçekten fark ediliyor, RGB aydınlatma da çok şık duruyor.' },
    { id:'r9', name:'Deniz Ö.', rating:5, productId:21, date:'2026-07-01', comment:'AirTag sayesinde Barcelona aktarmasında kaybolan valizimin havalimanının hangi köşesinde olduğunu görüp geri aldım. Tek kelimeyle hayat kurtarıcı.' },
    { id:'r10', name:'Gökçe M.', rating:5, productId:25, date:'2026-06-25', comment:'AeroPress ile evde içtiğim kahve, dışarıda 200 TL verdiğimden daha iyi. Kamp çantasına da atıyorum, kırılmıyor.' },
    { id:'r11', name:'Baran E.', rating:5, productId:29, date:'2026-06-20', comment:'Raspberry Pi 5 ile eski TV\'yi medya merkezine çevirdim, üstüne bir de retro oyun konsolu kurdum. Bu paraya bu kadar eğlence inanılmaz.' },
    { id:'r12', name:'İrem T.', rating:4, productId:33, date:'2026-06-12', comment:'Smart Band 8\'in uyku takibi çok isabetli, pili de gerçekten iki haftadan fazla gidiyor. Kayış biraz terletiyor, tek eksisi o.' },
    { id:'r13', name:'Kaan V.', rating:5, productId:30, date:'2026-05-30', comment:'Flipper Zero ile evdeki bütün kumandaları tek cihazda topladım. İçindeki yunus da ayrı sevimli, tam bir oyuncak-alet karışımı.' },
    { id:'r14', name:'Melis A.', rating:4, productId:38, date:'2026-05-18', comment:'GoPro\'yu dalış tatilinde kullandım, HyperSmooth gerçekten gimbal gibi. Pili soğuk suda biraz hızlı bitiyor, yedek pil şart.' }
  ];

  function getReviews(){
    let stored;
    try { stored = JSON.parse(localStorage.getItem(REVIEWS_KEY)); }
    catch(e){ stored = null; }
    if(!Array.isArray(stored)){
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(SEED_REVIEWS));
      stored = SEED_REVIEWS;
    }
    return stored;
  }
  function addReview({ name, rating, comment, productId }){
    const reviews = getReviews();
    const review = {
      id: 'r' + Date.now().toString(36),
      name: name || 'Misafir',
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      comment: comment || '',
      productId: productId || null,
      date: new Date().toISOString().slice(0,10)
    };
    reviews.unshift(review);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    return review;
  }

  Object.assign(GD, { getReviews, addReview });
})();
