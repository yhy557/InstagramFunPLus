# 🏔️ Reels Climber: Instagram Everest Challenge

Instagram Reels'i kaydırdıkça Everest'e tırmanın! Her scroll metreye dönüşür, başarımlar kazanın ve seviye atlayın.

## 🎮 Özellikler

### 📏 Gerçek Zamanlı Takip
- Her Instagram Reels kaydırmanız otomatik olarak metreye dönüşür
- **Dengeli metre kazanımı**: 1 metre ≈ 1.890 piksel (2x daha kolay!)
- Gerçek scroll mesafesi takibi
- Anlık XP kazanımı ve seviye atlama sistemi
- **Sadece Reels sayfasında çalışır** - /reels/ URL'lerinde aktif

### 🏆 Leaderboard Sistemi
- **Gerçek zamanlı liderlik tablosu** - Eklentiyi kullanan diğerleriyle yarış!
- Kullanıcı adını gir ve sıralamaya katıl
- Top 3 için özel madalyalar (🥇🥈🥉)
- Her kullanıcının metre, seviye ve Reels sayısını gör
- Otomatik sıralama (en yüksek metre başta)
- En fazla 100 kullanıcı gösterimi

### 🎬 Reels Takibi
- Her yeni Reels videosu otomatik sayılır (URL değişimi bazlı)
- Her 10 Reels'te mini bildirim
- Toplam izlenen Reels istatistiği

### 🏆 Başarım Sistemi

#### Everest Başarımları (8.848m)
Her %5'lik dilimde özel başarımlar:
- **%5 (442m)**: Baz Kampı Hazırlığı - 500 XP
- **%10 (884m)**: Yokuş Başladı - 750 XP
- **%25 (2.212m)**: Yolun Çeyreği - 2.000 XP
- **%50 (4.424m)**: YOLUN YARISI! - Yarı Tanrı rütbesi - 5.000 XP
- **%75 (6.636m)**: Stratosfer Komşusu - Platin madalya - 7.000 XP
- **%85 (7.520m)**: Ölüm Bölgesi - 9.000 XP
- **%100 (8.848m)**: EVEREST FATİHİ! - Efsanevi Sherpa unvanı - 20.000 XP

#### Dünya Turu Başarımları
Everest'i tamamladıktan sonra:
- **Boğaziçi Köprüsü** (1.5km) - Kıtalararası Yolcu
- **Manş Denizi** (33km) - Yüzücü madalyası
- **Büyük Kanyon** (446km) - Derinlik Sarhoşu
- **Atmosferden Çıkış** (100km) - Astronot unvanı
- **Çin Seddi** (21.000km) - İmparatorluk Muhafızı

#### Özel Başarımlar
- **Hız Şeytanı**: Tek seferde 50m scroll
- **Maraton Koşucusu**: 100 kez kaydırma
- **Gece Tırmanıcısı**: Gece yarısında aktif olma
- **Sabah Kuşu**: Sabah erken başlama

### ⭐ Seviye Sistemi
- XP kazanarak seviye atlayın
- Her 5 levelde bir zorlaşma (daha fazla XP gerekir)
- Sağ üstte canlı level barı
- Gerçek zamanlı mesafe gösterimi

### 🎨 Görsel Efektler
- Başarım açıldığında animasyonlu bildirimler
- Level atladığında ekran ortasında kutlama
- Smooth animasyonlar ve micro-interactions
- Adventure temalı modern tasarım

## 📦 Kurulum

### Chrome/Edge için:

1. Bu repository'yi indirin veya klonlayın:
```bash
git clone [repository-url]
```

2. Chrome/Edge tarayıcınızda `chrome://extensions/` adresine gidin

3. Sağ üstten "Geliştirici modu"nu aktif edin

4. "Paketlenmemiş öğe yükle" butonuna tıklayın

5. `reels-climber-extension` klasörünü seçin

6. Eklenti yüklendi! Instagram'a gidin ve Reels kaydırmaya başlayın! 🚀

## 🎯 Kullanım

1. Instagram'a gidin (`instagram.com`)
2. Reels bölümüne gidin veya ana feed'de kaydırın
3. Sağ üstte level barınızı göreceksiniz
4. Kaydırdıkça metre birikiyor ve başarımlar açılıyor!
5. Eklenti ikonuna tıklayarak istatistiklerinizi görün

## 🎨 Ekran Görüntüleri

### Level Bar (Sağ Üst)
- Anlık seviye bilgisi
- Metre sayacı
- XP barı (animasyonlu)

### Başarım Bildirimleri
- Ekranın sağ üstünde popup
- Başarım ikonu ve açıklaması
- Kazanılan XP miktarı
- 5 saniye görünür kalır

### Dashboard (Popup)
- Toplam istatistikler (metre, seviye, reels sayısı)
- **SVG Path Animasyonu** - Daire karakter yol boyunca ilerler
- **Geçilen yol turuncu** olur, geri kalan gri
- Tüm başarımların listesi (kilidi açılmış/kilitli)
- **Leaderboard** - Tüm kullanıcıların sıralaması
  - Top 3 özel vurgu
  - Senin yerini göster
  - Gerçek zamanlı güncelleme
- **Kullanıcı adı girişi** - Leaderboard'a katılmak için
- **Ses efektleri toggle** - İstersen sesleri kapat
- **Dağ seçimi** - Gelecekte farklı dağlar (K2, Kilimanjaro, vs.)
- Sıfırlama seçeneği

## 🔧 Teknik Detaylar

### Scroll → Metre Çevirimi
- **1 metre ≈ 1.890 piksel** (dengeli ve erişilebilir!)
- Gerçek scroll mesafesi takibi
- Spam önleme mekanizması (minimum 10 piksel)

### Leaderboard Sistemi
- Chrome Storage Local kullanılır
- Her kullanıcı için:
  - İsim, metre, seviye, reels sayısı
  - Timestamp (son güncelleme zamanı)
- Otomatik sıralama (metre bazlı)
- En fazla 100 kullanıcı tutulur
- Gerçek zamanlı güncelleme

### Reels Takibi
- URL değişimi bazlı (her yeni /reels/XXX linki = 1 reels)
- Hem setInterval (500ms) hem MutationObserver kullanılır
- Sayfa yenilendiğinde bile veri korunur
- İlk açılış otomatik sayılır

### Sadece Reels Sayfasında
- Eklenti sadece `/reels/` URL'lerinde aktif olur
- Ana feed veya diğer Instagram sayfalarında görünmez
- Performans optimize edildi

### Veri Saklama
- Chrome Storage API kullanılır
- Her scroll sonrası otomatik kayıt (debounced)
- Tarayıcı kapatılsa bile veriler korunur

### Level Zorlaşması
```javascript
Level 1-5: 1000 XP
Level 6-10: 1500 XP
Level 11-15: 2250 XP
Level 16-20: 3375 XP
// Her 5 levelde %50 artış
```

## 🎨 Tasarım Felsefesi

- **Tema**: Outdoor Adventure / Mountain Climbing
- **Font**: Exo 2 (body), Russo One (display) - distinctive ve modern
- **Renkler**: 
  - Dağ mavisi (#4A9EFF)
  - Kar beyazı (#F8FBFF)
  - Sunset turuncu (#FF6B35)
  - Altın (#FFD700)
- **Animasyonlar**: Smooth, performant, dikkat çekici
- **Responsive**: Mobil ve desktop uyumlu

## 🐛 Sorun Giderme

### Level bar görünmüyor?
- Sayfayı yenileyin (F5)
- Eklentinin aktif olduğundan emin olun
- Console'da hata olup olmadığını kontrol edin (F12)

### Başarımlar açılmıyor?
- Gerçekten scroll yapıyor musunuz? (minimum 50 piksel)
- Storage verilerini kontrol edin
- Popup'tan istatistiklerinizi görüntüleyin

### Verileri sıfırlama
- Popup'tan "İlerlemeyi Sıfırla" butonuna basın
- Veya: `chrome://extensions/` → Eklenti → "Hizmet çalışanı" → "Sil"

## 📊 İstatistikler Örnekleri

```
Everest Zirvesi'ne ulaşmak için:
- ~8.848 metre scroll
- ~33.5 milyon piksel kaydırma
- Yaklaşık 100-200 başarım açma fırsatı
- Ortalama 50-100 seviye

Dünya turu tamamlamak için:
- Sadece Çin Seddi için 21.000 km! 😱
```

## 🚀 Gelecek Özellikler

- [ ] Günlük/haftalık challenge'lar
- [x] **Ses efektleri toggle** ✅ EKLENDİ
- [x] **Leaderboard sistemi** ✅ EKLENDİ
- [ ] **Farklı dağlar** (K2, Kilimanjaro, Matterhorn) - Geliştiriliyor
- [ ] Global leaderboard (backend entegrasyonu)
- [ ] Arkadaş ekleme ve özel yarışmalar
- [ ] Özel temalar ve skin'ler
- [ ] Dark/Light mode seçimi
- [ ] Export/Import progress
- [ ] Günlük streak sistemi
- [ ] Sosyal paylaşım özellikleri
- [ ] Haftalık/aylık leaderboard sıfırlamaları

## 📝 Lisans

Bu proje eğitim ve eğlence amaçlıdır. Instagram'ın kullanım koşullarına uygun kullanın.

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için lütfen önce bir issue açın.

## ⚠️ Disclaimer

Bu eklenti Instagram'ın resmi ürünü değildir. Sadece scroll tracking yapar ve veriyi local olarak saklar. Instagram'ın hiçbir verisine erişmez veya değiştirmez.

---

**Keyifli tırmanışlar! 🏔️⛷️**

*Made with ❤️ for scroll addicts*
