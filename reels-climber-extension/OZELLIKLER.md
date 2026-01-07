# 🆕 Yeni Özellikler v4.0

## ✨ Eklenen Özellikler

### 1. 🎨 Başarım Tooltip'leri
Başarım kartlarının üzerine mouse ile geldiğinizde artık güzel bir balon çıkıyor!

**Ne Gösterir:**
- 🏆 Başarımın adı ve ikonu
- 📝 Detaylı açıklama
- 📍 Kaç metrede açılacağı
- ⭐ Kazanılacak XP miktarı

**Nasıl Kullanılır:**
1. Popup'ı aç (eklenti ikonu)
2. "Başarımlar" bölümüne git
3. Herhangi bir başarımın üzerine mouse'unu getir
4. Tooltip otomatik belirir!

**Görsel:**
```
┌─────────────────────────────┐
│ ⛺ Baz Kampı Hazırlığı      │
│ 442m tamamlandı!            │
│ 442m'de açılır • +500 XP    │
└─────────────────────────────┘
        ▼
    [Başarım Kartı]
```

---

### 2. 🌍 Ülke/Şehir Rotaları Sistemi

Artık sadece Everest değil, **dünyanın farklı noktaları arasında yolculuk** yapabilirsiniz!

#### 📍 Mevcut Ülkeler ve Şehirler

**🇹🇷 Türkiye**
- Ankara (Başkent)
- İstanbul

**🇳🇴 Norveç**
- Oslo (Başkent)
- Bergen

**🇨🇭 İsviçre**
- Bern (Başkent)
- Zürich

**🇯🇵 Japonya**
- Tokyo (Başkent)
- Osaka

**🇺🇸 Amerika**
- Washington D.C. (Başkent)
- New York

**🇩🇪 Almanya**
- Berlin (Başkent)
- Münih

#### 🛣️ Nasıl Çalışır?

1. **Rotanı Seç** bölümünü aç (Popup'ta)
2. **Başlangıç noktası** seç:
   - Ülke seç → Şehir seç
3. **Varış noktası** seç:
   - Ülke seç → Şehir seç
4. **Mesafe otomatik hesaplanır** (gerçek hava yolu mesafesi!)
5. **"Bu Rotayı Hedefle!"** butonuna tıkla
6. **Sayfayı yenile** ve yeni hedefe ulaşmaya çalış!

#### 📊 Örnek Mesafeler

| Rota | Mesafe |
|------|--------|
| Ankara → Tokyo | 8,674 km |
| İstanbul → New York | 8,050 km |
| Berlin → Washington | 6,545 km |
| Oslo → Tokyo | 8,770 km |
| Zürich → Osaka | 9,830 km |
| Bern → Bergen | 1,650 km |

#### 🎯 Rota Belirlediğinde Ne Olur?

1. **Başarımlar otomatik ayarlanır**
   - %5 = 434 km (Ankara-Tokyo için)
   - %25 = 2,169 km
   - %50 = 4,337 km (YOLUN YARISI!)
   - %100 = 8,674 km (ROTAYI TAMAMLADIN!)

2. **İlerleme barı rotaya göre güncellenir**
   - "Everest İlerlemesi" → "Ankara → Tokyo İlerlemesi"

3. **Son başarım özel olur**
   - "EVEREST FATİHİ!" → "ROTAYI TAMAMLADIN!"
   - Açıklama: Başlangıç → Varış şehirleri

4. **Aktif Rota gösterilir**
   - Popup'ta "Aktif Rota" badge'i görünür
   - Rota adı ve mesafe görüntülenir

#### 💡 İpuçları

- **Kısa rotalar**: Hızlı başarım istiyorsan (örn: Bern → Münih: 390 km)
- **Uzun rotalar**: Epic challenge istiyorsan (örn: Ankara → Tokyo: 8,674 km)
- **Farklı kombinasyonlar**: 6 ülke x 2 şehir = **36 farklı rota** seçebilirsin!
- **Rota değiştir**: İstediğin zaman yeni rota seçebilirsin
- **İlerleme korunur**: Metrelerin kaybolmaz, yeni hedefe göre yüzde hesaplanır

---

## 🎨 Tasarım Detayları

### Tooltip Animasyonu
- Hover'da smooth fade-in
- Yukarı doğru hafif kayma efekti
- Altın kenarlık
- Ok işareti (arrow)
- Glassmorphism arka plan

### Rota Seçici UI
- Dropdown menüler (ülke ve şehir)
- Animasyonlu uçak ikonu (✈️) başlangıç-varış arasında
- Mesafe hesaplama kartı (mavi arka plan)
- "Bu Rotayı Hedefle!" butonu (gradyan)
- Aktif rota badge'i (altın kenarlık)

---

## 🚀 Teknik Detaylar

### Mesafe Hesaplama
```javascript
// Önceden tanımlanmış mesafe matrisi
const DISTANCES = {
  'turkey-ankara-japan-tokyo': 8674,
  'turkey-istanbul-newyork': 8050,
  // ... 90+ rota mesafesi
};
```

### Başarım Yeniden Hesaplama
```javascript
// Rota mesafesi = 8674 km = 8,674,000 metre
targetDistance = currentRoute.distance * 1000;

// Her başarım yüzdesi korunur
percentage = achievement.distance / 8848;
newDistance = targetDistance * percentage;

// Örnek: %5 başarımı
// Everest: 8848 * 0.05 = 442 m
// Tokyo: 8674000 * 0.05 = 433,700 m = 434 km
```

### Storage
```javascript
chrome.storage.local.set({
  currentRoute: {
    startCountry: 'turkey',
    startCity: 'ankara',
    startCityName: 'Ankara',
    endCountry: 'japan',
    endCity: 'tokyo',
    endCityName: 'Tokyo',
    distance: 8674
  }
});
```

---

## 📖 Kullanım Senaryoları

### Senaryo 1: Kısa Challenge
```
1. Bern → Zürich seç (310 km)
2. Hedef: 310,000 metre
3. %5 başarım: 15,500 m = 15.5 km
4. Scroll yap ve hızlıca tamamla!
```

### Senaryo 2: Orta Challenge
```
1. Berlin → Ankara seç (2,100 km)
2. Hedef: 2,100,000 metre
3. %25 başarım: 525 km
4. Birkaç gün içinde tamamlanabilir
```

### Senaryo 3: Epic Challenge
```
1. Ankara → Tokyo seç (8,674 km)
2. Hedef: 8,674,000 metre
3. %50 başarım: 4,337 km
4. Haftalarca scroll gerekir!
```

---

## 🎮 Leaderboard'da Rotalar

Leaderboard'da artık hangi rotayı tamamladığını gösterebilirsin:
- Kullanıcı adı
- Toplam metre (hangi rotada olduğu önemli değil)
- Seviye ve Reels sayısı

**Gelecek özellik**: Rota bazlı ayrı leaderboard'lar!

---

## ⚙️ Ayarlar

### Rota Sıfırlama
Rotayı değiştirmek istersen:
1. Yeni rota seç
2. "Bu Rotayı Hedefle!" tıkla
3. Eski rota kaybolur, yeni rota aktif olur
4. Metre sayın aynı kalır

### Everest'e Geri Dönme
Eğer rota sistemini kullanmak istemezsen:
- Hiç rota seçme
- Veya extension'ı yeniden yükle
- Default olarak Everest aktif

---

## 🔮 Gelecek Güncellemeler

- [ ] Daha fazla ülke (Brezilya, Hindistan, Avustralya, vs.)
- [ ] Özel turistik noktalar (Eyfel Kulesi, Özgürlük Heykeli, vs.)
- [ ] Rota bazlı özel başarımlar
- [ ] Rota geçmişi (hangi rotaları tamamladın)
- [ ] Rota önerileri (AI tabanlı)
- [ ] Rota paylaşma (arkadaşlarınla aynı rotayı tamamla)

---

**Keyifli yolculuklar! ✈️🗺️**
