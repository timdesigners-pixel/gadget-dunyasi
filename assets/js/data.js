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
  { key:'kamera', label:'Kamera & İçerik' }
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
    specs:[['Kapsül','3 kondansatör kapsül'],['Desenler','Kardioid, çift yönlü, çok yönlü, stereo'],['Kontroller','Kazanç, sessize alma, kulaklık çıkışı'],['Bağlantı','USB, stand dahil']] }
];

/*
 * Konu bazlı gerçek ürün setleri. productIds set içeriğini katalogdaki
 * gerçek ürünlere bağlar; thumbs aynı ürünlerin gerçek fotoğraflarını kullanır.
 */
GD.SETS = [
  { id:'s1', name:'Akıllı Ev Başlangıç Seti', featured:true, items:4, price:37999, oldPrice:43299,
    productIds:[17,18,19,20],
    desc:'Evinizi tek pakette akıllandırın: Alexa\'lı Echo Dot, Philips Hue akıllı aydınlatma kiti, kendi çöpünü boşaltan Roomba i7+ ve faturanızı düşüren Nest öğrenen termostat.',
    features:['Echo Dot + Hue kit + Roomba i7+ + Nest termostat','Tek uygulama önerisiyle kurulum rehberi dahil','Sesli komutla ışık, süpürge ve ısıtma kontrolü'],
    thumbs:[
      {icon:'speaker',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('The_black_Amazon_Echo_Dot_(fifth_generation)_on_wooden_table.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('Philips_Hue_hub_and_2_bulbs.jpg')},
      {icon:'settings',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('IRobot_Roomba_i7%2B.jpg')} ] },
  { id:'s2', name:'Gezgin Teknoloji Seti', featured:true, items:4, price:16999, oldPrice:19799,
    productIds:[21,22,23,24],
    desc:'Sık seyahat edenlerin hayalindeki valiz: bavulunuzu takip eden AirTag, binlerce kitaplık Kindle, uçak sesini yok eden Sony ANC kulaklık ve cebe sığan Anker powerbank.',
    features:['AirTag + Kindle + Sony XM3 + PowerCore 5000','Uçuş modunda haftalarca pil ömrü kombinasyonu','Kayıp bavul stresine son'],
    thumbs:[
      {icon:'map-pin',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('Apple_AirTags_einrichten.jpg')},
      {icon:'tablet',grad:'linear-gradient(150deg,#20403c,#0d1a18)', img:GD.commonsImg('Amazon_Kindle_Paperwhite_5_Eleventh_Generation_(C2V2L3)_6-inch_e-reader.jpg')},
      {icon:'headphones',grad:'linear-gradient(150deg,#42305c,#170f26)', img:GD.commonsImg('Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.2.jpg')} ] },
  { id:'s3', name:'Akıllı Mutfak Seti', featured:false, items:4, price:18999, oldPrice:22199,
    productIds:[25,26,27,28],
    desc:'Mutfağı teknoloji üssüne çeviren dörtlü: kült AeroPress kahve demleyici, yağsız kızartan Airfryer, 19 bar Nespresso ve 7\'si 1 arada Instant Pot.',
    features:['AeroPress + Airfryer + Nespresso + Instant Pot','Kahveden akşam yemeğine tam donanım','Yeni eve çıkanlar için ideal hediye paketi'],
    thumbs:[
      {icon:'package',grad:'linear-gradient(150deg,#4a2a2a,#1c1010)', img:GD.commonsImg('Red_AeroPress_with_Accessories.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#4a2f2a,#1c1310)', img:GD.commonsImg('Airfryer.jpg')},
      {icon:'package',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('Instant_Pot_(49907000991).jpg')} ] },
  { id:'s4', name:'Maker & Hobi Elektroniği Seti', featured:false, items:4, price:21999, oldPrice:25799,
    productIds:[29,30,31,32],
    desc:'Kurcalamayı sevenlere: Raspberry Pi 5 mini bilgisayar, Tamagotchi görünümlü Flipper Zero, efsane Arduino Uno ve LCD tuşlu Stream Deck + tek sette.',
    features:['Raspberry Pi 5 + Flipper Zero + Arduino + Stream Deck +','Başlangıç proje rehberleri dahil','Elektronik meraklısına en iyi hediye'],
    thumbs:[
      {icon:'grid',grad:'linear-gradient(150deg,#1f3b3a,#0d1a19)', img:GD.commonsImg('Raspberry_Pi_5.jpg')},
      {icon:'gamepad-2',grad:'linear-gradient(150deg,#2f3a52,#111725)', img:GD.commonsImg('Flipper_Zero.jpg')},
      {icon:'grid',grad:'linear-gradient(150deg,#1c3a44,#0c1720)', img:GD.commonsImg('Arduino_Uno_R3.JPG')} ] },
  { id:'s5', name:'Sağlık & Zinde Yaşam Seti', featured:false, items:5, price:39999, oldPrice:46899,
    productIds:[33,34,35,36,37],
    desc:'Vücudunuzu uçtan uca izleyen beşli: Smart Band 8 bileklik, Withings akıllı tartı, EKG çeken ScanWatch 2, Theragun masaj tabancası ve Oura akıllı yüzük.',
    features:['Bileklik + tartı + hibrit saat + masaj + akıllı yüzük','Uyku, nabız, EKG ve toparlanma takibi','Tüm veriler telefon uygulamalarında'],
    thumbs:[
      {icon:'watch',grad:'linear-gradient(150deg,#2a3a52,#101725)', img:GD.commonsImg('Xiaomi_Mi_Band_8.jpg')},
      {icon:'watch',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('Withings_ScanWatch_2_white.jpg')},
      {icon:'heart',grad:'linear-gradient(150deg,#3a2b52,#160f24)', img:GD.commonsImg('OURA_Ring_-_1.jpg')} ] },
  { id:'s6', name:'İçerik Üretici Seti', featured:false, items:4, price:52999, oldPrice:60499,
    productIds:[38,39,40,41],
    desc:'Vlog\'dan drone çekimine komple stüdyo: GoPro Hero 9 Black, 249 gramlık DJI Mini 4 Pro drone, retro Instax Mini 70 ve efsanevi Blue Yeti mikrofon.',
    features:['GoPro + DJI Mini 4 Pro + Instax + Blue Yeti','5K video, 4K HDR drone ve stüdyo sesi','YouTube\'a başlamak için gereken her şey'],
    thumbs:[
      {icon:'camera',grad:'linear-gradient(150deg,#1f3550,#0d1622)', img:GD.commonsImg('GoPro_Hero_9_Black_-_Front_2.jpg')},
      {icon:'camera',grad:'linear-gradient(150deg,#22345c,#0e1526)', img:GD.commonsImg('2024_Dron_DJI_Mini_4_Pro_(01).jpg')},
      {icon:'mic',grad:'linear-gradient(150deg,#2a2a3a,#12121c)', img:GD.commonsImg('Blue_Yeti_Blackout.jpg')} ] }
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
