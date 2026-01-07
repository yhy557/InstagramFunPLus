// Reels Climber - Instagram Scroll Tracker
class ReelsClimber {
  constructor() {
    this.totalScrollDistance = 0; // Total scroll distance (pixels)
    this.lastScrollY = 0;
    this.metersClimbed = 0;
    this.currentLevel = 1;
    this.currentXP = 0;
    this.xpForNextLevel = 1000;
    this.totalScrolls = 0;
    this.reelsViewed = 0; // Number of unique reels viewed
    this.lastReelsUrl = '';
    this.userName = ''; // Username for the leaderboard
    this.userID = ''; // Unique user ID (permanent)
    
    // Reels speed tracking and penalty system
    this.reelsTimestamps = []; // Reels viewed in the last 5 minutes
    this.penaltyEndTime = 0; // Penalty end time (timestamp)
    this.isPenalized = false; // Penalty status
    
    // Pixel to meter conversion factor (1 meter ≈ 2000 pixels)
    this.pixelsPerMeter = 2000;
    
    // Sound effects setting
    this.soundEnabled = true;

    // Achievement definitions
    this.achievements = this.defineAchievements();
    this.unlockedAchievements = new Set();
    
    this.init();
  }

  generateUserID() {
    // Generate a unique user ID (permanent)
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  defineAchievements() {
    const EVEREST_HEIGHT = 8848; // meters
    
    return [
      // Everest Başarımları
      { id: 'base_camp', distance: EVEREST_HEIGHT * 0.05, name: 'Baz Kampı Hazırlığı', xp: 500, icon: '⛺', description: '442m tamamlandı!' },
      { id: 'slope_start', distance: EVEREST_HEIGHT * 0.10, name: 'Yokuş Başladı', xp: 750, icon: '🥾', description: '884m - İlk ekipmanını kuşan' },
      { id: 'oxygen_drop', distance: EVEREST_HEIGHT * 0.15, name: 'Oksijen Seviyesi Düşüyor', xp: 1000, icon: '😮‍💨', description: '1.327m - Nefes almak zorlaşıyor' },
      { id: 'above_clouds', distance: EVEREST_HEIGHT * 0.20, name: 'Bulutların Üstü', xp: 1500, icon: '☁️', description: '1.769m - Gümüş madalya!' },
      { id: 'quarter_way', distance: EVEREST_HEIGHT * 0.25, name: 'Yolun Çeyreği', xp: 2000, icon: '🏔️', description: '2.212m - Çeyrek geride kaldı' },
      { id: 'mountain_goat', distance: EVEREST_HEIGHT * 0.30, name: 'Dağ Keçisi', xp: 2500, icon: '🐐', description: '2.654m - Efsanevi unvan!' },
      { id: 'storm_coming', distance: EVEREST_HEIGHT * 0.35, name: 'Fırtına Öncesi', xp: 3000, icon: '🌪️', description: '3.096m - Tehlike yaklaşıyor' },
      { id: 'altitude_expert', distance: EVEREST_HEIGHT * 0.40, name: 'Yüksek İrtifa Uzmanı', xp: 3500, icon: '🧗', description: '3.539m - Profesyonel seviye' },
      { id: 'peak_visible', distance: EVEREST_HEIGHT * 0.45, name: 'Zirve Göründü', xp: 4000, icon: '🥇', description: '3.981m - Altın madalya!' },
      { id: 'halfway', distance: EVEREST_HEIGHT * 0.50, name: 'YOLUN YARISI!', xp: 5000, icon: '⚡', description: '4.424m - Yarı Tanrı rütbesi' },
      { id: 'frozen_fingers', distance: EVEREST_HEIGHT * 0.55, name: 'Donmuş Parmaklar', xp: 4500, icon: '🥶', description: '4.866m - Buz gibi soğuk' },
      { id: 'glacier_explorer', distance: EVEREST_HEIGHT * 0.60, name: 'Buzul Kaşifi', xp: 5000, icon: '🧊', description: '5.308m - Buzullarda kaybolma' },
      { id: 'pushing_limits', distance: EVEREST_HEIGHT * 0.65, name: 'Sınırları Zorlayan', xp: 5500, icon: '💪', description: '5.751m - Gücün sınırlarını zorla' },
      { id: 'himalaya_native', distance: EVEREST_HEIGHT * 0.70, name: 'Himalaya Yerlisi', xp: 6000, icon: '🏔️', description: '6.193m - Artık burası evin' },
      { id: 'stratosphere', distance: EVEREST_HEIGHT * 0.75, name: 'Stratosfer Komşusu', xp: 7000, icon: '💎', description: '6.636m - Platin madalya!' },
      { id: 'breathless', distance: EVEREST_HEIGHT * 0.80, name: 'Nefessiz Takip', xp: 8000, icon: '😵', description: '7.078m - Oksijen tükeniyor' },
      { id: 'death_zone', distance: EVEREST_HEIGHT * 0.85, name: 'Ölüm Bölgesi', xp: 9000, icon: '☠️', description: '7.520m - DEATH ZONE aktif' },
      { id: 'final_stretch', distance: EVEREST_HEIGHT * 0.90, name: 'Son Düzlük', xp: 10000, icon: '🔥', description: '7.963m - Zirve çok yakın!' },
      { id: 'summit_fire', distance: EVEREST_HEIGHT * 0.95, name: 'Zirve Ateşi', xp: 12000, icon: '🌟', description: '8.405m - Neredeyse orada!' },
      { id: 'everest_conqueror', distance: EVEREST_HEIGHT, name: 'EVEREST FATİHİ!', xp: 20000, icon: '👑', description: '8.848m - EFSANE SHERPA!' },
      
      // Özel Başarımlar (Reels bazlı)
      { id: 'speed_demon', special: 'speed', threshold: 50, name: 'Hız Şeytanı', xp: 1000, icon: '⚡', description: 'Tek seferde 50m scroll yaptın!' },
      { id: 'marathon', special: 'scrolls', threshold: 100, name: 'Maraton Koşucusu', xp: 2000, icon: '🏃', description: '100 kez kaydırdın!' },
      { id: 'thousand_scrolls', special: 'scrolls', threshold: 1000, name: 'Bin Kaydırma', xp: 5000, icon: '🎯', description: '1000 scroll - İnanılmaz!' },
      { id: 'reels_addict', special: 'reels', threshold: 100, name: 'Reels Bağımlısı', xp: 3000, icon: '🎬', description: '100 Reels izledin!' },
      { id: 'reels_master', special: 'reels', threshold: 500, name: 'Reels Ustası', xp: 8000, icon: '🎭', description: '500 Reels! Profesyonel!' },
      { id: 'reels_legend', special: 'reels', threshold: 1000, name: 'Reels Efsanesi', xp: 15000, icon: '🏆', description: '1000 Reels! Efsanesin!' },
      { id: 'night_climber', special: 'time', threshold: 'night', name: 'Gece Tırmanıcısı', xp: 3000, icon: '🌙', description: 'Gece yarısında aktifsin!' },
      { id: 'early_bird', special: 'time', threshold: 'morning', name: 'Sabah Kuşu', xp: 2000, icon: '🌅', description: 'Sabah erken başladın!' },
      { id: 'persistent', special: 'daily', threshold: 7, name: 'Azimli', xp: 5000, icon: '🔗', description: '7 gün üst üste scroll yaptın!' },
      { id: 'veteran', special: 'daily', threshold: 30, name: 'Veteran', xp: 15000, icon: '⭐', description: '30 gün üst üste aktif!' },
      
      // GİZLİ BAŞARIMLAR (hidden: true - popup'ta gösterilmez)
      // Kullanıcı bunları bilmeyecek, sadece kazanınca ortaya çıkacak!
      
      // Instagram aktivite başarımları
      { id: 'social_butterfly', special: 'instagram', threshold: 'story_view', name: '???', xp: 2000, icon: '🦋', description: '???', hidden: true, revealName: 'Sosyal Kelebek', revealDesc: 'İlk story görüntülemen!' },
      { id: 'heart_giver', special: 'instagram', threshold: 'like', name: '???', xp: 1500, icon: '❤️', description: '???', hidden: true, revealName: 'Kalp Dağıtıcı', revealDesc: 'Reels izlerken like attın!' },
      { id: 'comment_king', special: 'instagram', threshold: 'comment', name: '???', xp: 2500, icon: '💬', description: '???', hidden: true, revealName: 'Yorum Kralı', revealDesc: 'İlk yorumunu yaptın!' },
      { id: 'profile_stalker', special: 'instagram', threshold: 'profile_visit', name: '???', xp: 1000, icon: '👀', description: '???', hidden: true, revealName: 'Profil Avcısı', revealDesc: 'Birinin profiline gittin!' },
      { id: 'share_master', special: 'instagram', threshold: 'share', name: '???', xp: 3000, icon: '📤', description: '???', hidden: true, revealName: 'Paylaşım Ustası', revealDesc: 'İlk Reels paylaşımın!' },
      { id: 'dm_sender', special: 'instagram', threshold: 'dm', name: '???', xp: 2000, icon: '✉️', description: '???', hidden: true, revealName: 'Mesaj Göndericisi', revealDesc: 'Mesaj attın!' },
      { id: 'search_detective', special: 'instagram', threshold: 'search', name: '???', xp: 1000, icon: '🔍', description: '???', hidden: true, revealName: 'Arama Dedektifi', revealDesc: 'Arama yaptın!' },
      
      // Zaman bazlı gizli başarımlar
      { id: 'midnight_warrior', special: 'time', threshold: 'midnight', name: '???', xp: 5000, icon: '🌃', description: '???', hidden: true, revealName: 'Gece Yarısı Savaşçısı', revealDesc: 'Tam gece yarısı (00:00-01:00) aktiftin!' },
      { id: 'sunrise_chaser', special: 'time', threshold: 'sunrise', name: '???', xp: 4000, icon: '🌄', description: '???', hidden: true, revealName: 'Gündoğumu Avcısı', revealDesc: 'Gün doğarken (05:00-06:00) aktiftin!' },
      { id: 'workday_warrior', special: 'time', threshold: 'workday', name: '???', xp: 3000, icon: '💼', description: '???', hidden: true, revealName: 'Mesai Savaşçısı', revealDesc: 'Çalışma saatlerinde (09:00-17:00) scroll yaptın!' },
      
      // Davranış bazlı gizli başarımlar
      { id: 'no_penalty', special: 'behavior', threshold: 'clean_week', name: '???', xp: 10000, icon: '😇', description: '???', hidden: true, revealName: 'Mükemmel Kullanıcı', revealDesc: '7 gün hiç ceza almadın!' },
      { id: 'comeback_kid', special: 'behavior', threshold: 'penalty_survived', name: '???', xp: 2000, icon: '💪', description: '???', hidden: true, revealName: 'Geri Dönen', revealDesc: 'Ceza aldıktan sonra normal kullanıma döndün!' },
      { id: 'speed_limit', special: 'behavior', threshold: 'slow_scroll', name: '???', xp: 5000, icon: '🐢', description: '???', hidden: true, revealName: 'Ağırdan Alan', revealDesc: '1 saatte 20 Reels\'ten az izledin (sağlıklı kullanım!)' },
      { id: 'level_five', special: 'level', threshold: 5, name: '???', xp: 3000, icon: '🎖️', description: '???', hidden: true, revealName: 'Seviye 5!', revealDesc: '5. seviyeye ulaştın!' },
      { id: 'level_ten', special: 'level', threshold: 10, name: '???', xp: 8000, icon: '🏅', description: '???', hidden: true, revealName: 'Seviye 10!', revealDesc: '10. seviyeye ulaştın!' },
      { id: 'level_twenty', special: 'level', threshold: 20, name: '???', xp: 20000, icon: '👑', description: '???', hidden: true, revealName: 'Seviye 20!', revealDesc: 'Efsane seviyeye ulaştın!' },
      
      // Şanslı/Rastgele başarımlar
      { id: 'lucky_seven', special: 'lucky', threshold: 'reels_777', name: '???', xp: 7777, icon: '🎰', description: '???', hidden: true, revealName: 'Şanslı Yedi', revealDesc: 'Tam 777. Reels\'ini izledin!' },
      { id: 'perfect_scroll', special: 'lucky', threshold: 'meter_1234', name: '???', xp: 1234, icon: '🎲', description: '???', hidden: true, revealName: 'Mükemmel Sayı', revealDesc: 'Tam 1234 metreye ulaştın!' },
      { id: 'first_kilometer', special: 'milestone', threshold: 1000, name: '???', xp: 5000, icon: '🥇', description: '???', hidden: true, revealName: 'İlk Kilometre!', revealDesc: '1 km tamamladın!' },
      { id: 'five_kilometers', special: 'milestone', threshold: 5000, name: '???', xp: 15000, icon: '🏅', description: '???', hidden: true, revealName: '5 Kilometre!', revealDesc: '5 km! İnanılmaz!' }
    ];
  }

  async loadData() {
    return new Promise((resolve) => {
      chrome.storage.local.get([
        'metersClimbed',
        'currentLevel',
        'currentXP',
        'totalScrollDistance',
        'totalScrolls',
        'reelsViewed',
        'soundEnabled',
        'userName',
        'userID',
        'currentRoute',
        'reelsTimestamps',
        'penaltyEndTime',
        'unlockedAchievements',
        'lastActiveDate'
      ], (result) => {
        this.metersClimbed = result.metersClimbed || 0;
        this.currentLevel = result.currentLevel || 1;
        this.currentXP = result.currentXP || 0;
        this.totalScrollDistance = result.totalScrollDistance || 0;
        this.totalScrolls = result.totalScrolls || 0;
        this.reelsViewed = result.reelsViewed || 0;
        this.soundEnabled = result.soundEnabled !== undefined ? result.soundEnabled : true;
        this.userName = result.userName || '';
        this.reelsTimestamps = result.reelsTimestamps || [];
        this.penaltyEndTime = result.penaltyEndTime || 0;
        
        // Ceza durumu kontrolü
        this.isPenalized = this.penaltyEndTime > Date.now();
        if (this.isPenalized) {
          console.log('⚠️ Ceza aktif! Bitiş:', new Date(this.penaltyEndTime).toLocaleTimeString());
          this.showPenaltyNotification();
        }
        
        // UserID yoksa yeni oluştur (her tarayıcı için benzersiz ve kalıcı)
        if (!result.userID) {
          this.userID = this.generateUserID();
          chrome.storage.local.set({ userID: this.userID });
          console.log('🆔 Yeni kullanıcı ID oluşturuldu:', this.userID);
        } else {
          this.userID = result.userID;
        }
        
        this.currentRoute = result.currentRoute || null;
        this.unlockedAchievements = new Set(result.unlockedAchievements || []);
        this.lastActiveDate = result.lastActiveDate || new Date().toDateString();
        
        // Eğer rota varsa, başarımları rotaya göre ayarla
        if (this.currentRoute) {
          this.adjustAchievementsForRoute();
        }
        
        this.calculateXPForNextLevel();
        resolve();
      });
    });
  }

  adjustAchievementsForRoute() {
    // Rota mesafesini km'den metreye çevir
    const targetDistance = this.currentRoute.distance * 1000;
    
    // Everest başarımlarını rotaya göre yeniden hesapla
    this.achievements = this.achievements.map(achievement => {
      if (!achievement.special && achievement.id !== 'everest_conqueror') {
        // Yüzdelik dilimi koru ama yeni mesafeye göre hesapla
        const percentage = achievement.distance / 8848;
        return {
          ...achievement,
          distance: targetDistance * percentage,
          originalDistance: achievement.distance
        };
      }
      // Son başarımı tam rota mesafesine ayarla
      if (achievement.id === 'everest_conqueror') {
        return {
          ...achievement,
          distance: targetDistance,
          name: 'ROTAYI TAMAMLADIN!',
          description: `${this.currentRoute.startCityName} → ${this.currentRoute.endCityName}`,
          originalDistance: achievement.distance
        };
      }
      return achievement;
    });
    
    console.log(`🗺️ Rota belirlendi: ${this.currentRoute.startCityName} → ${this.currentRoute.endCityName} (${this.currentRoute.distance}km)`);
  }

  async init() {
    // Verileri yükle
    await this.loadData();
    
    // Level barını oluştur
    this.createLevelBar();
    
    // Instagram sidebar'a Leaderboard butonu ekle
    this.injectLeaderboardButton();
    
    // Scroll listener'ı ekle
    this.attachScrollListener();
    
    // URL değişimini izle (Reels geçişleri için)
    this.trackReelsChanges();
    
    // Instagram aktivitelerini izle
    this.trackInstagramActivities();
    
    // Periyodik kontroller
    setInterval(() => this.checkTimeBasedAchievements(), 60000); // Her dakika
    setInterval(() => this.checkBehaviorAchievements(), 300000); // Her 5 dakika
    
    console.log('🏔️ Reels Climber aktif! Everest\'e tırmanmaya başla!');
    console.log('📊 Mevcut metre:', this.metersClimbed.toFixed(2), 'm');
    console.log('🎬 İzlenen Reels:', this.reelsViewed);
  }

  injectLeaderboardButton() {
    // Instagram sidebar'ına Leaderboard butonu ekle
    const checkAndInject = () => {
      // Zaten eklenmişse tekrar ekleme
      if (document.getElementById('reels-climber-leaderboard-btn')) {
        return;
      }
      
      // Instagram nav container'ını bul
      // Profil linkini içeren parent'ı bul
      const profileLinks = Array.from(document.querySelectorAll('a[href*="/"][role="link"]'))
        .filter(link => {
          const href = link.getAttribute('href');
          // Profil linki: username içerir ama /reels, /direct, /explore değildir
          return href && 
                 href.includes('/') && 
                 !href.includes('/reels') && 
                 !href.includes('/direct') && 
                 !href.includes('/explore') &&
                 !href.startsWith('#') &&
                 href !== '/' &&
                 link.querySelector('img[alt*="profil"]'); // Profil resmi var
        });
      
      if (profileLinks.length === 0) {
        return;
      }
      
      const profileLink = profileLinks[0];
      
      // Profil item'ının en üst div'ini bul (span içindeki div)
      let profileItem = profileLink.closest('div.x1n2onr6');
      
      if (!profileItem) {
        console.log('❌ Profil item bulunamadı');
        return;
      }
      
      // Profil item'ının parent container'ını bul
      const parentContainer = profileItem.parentElement;
      
      if (!parentContainer) {
        console.log('❌ Parent container bulunamadı');
        return;
      }
      
      // Leaderboard item'ı oluştur (Instagram'ın yapısına uygun)
      const leaderboardWrapper = document.createElement('div');
      
      const leaderboardSpan = document.createElement('span');
      leaderboardSpan.className = 'html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j';
      
      const leaderboardDiv = document.createElement('div');
      leaderboardDiv.className = 'x1n2onr6';
      
      const leaderboardLink = document.createElement('a');
      leaderboardLink.id = 'reels-climber-leaderboard-btn';
      leaderboardLink.className = 'x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x4gyw5p _a6hd';
      leaderboardLink.href = '#';
      leaderboardLink.setAttribute('role', 'link');
      leaderboardLink.setAttribute('tabindex', '0');
      
      // İçeriği kopyala (Instagram'ın yapısına uygun)
      leaderboardLink.innerHTML = `
        <div class="x9f619 x3nfvp2 xr9ek0c xjpr12u xo237n4 x6pnmvc x7nr27j x12dmmrz xz9dl7a xpdmqnj xsag5q8 x1g0dm76 x80pfx3 x159b3zp x1dn74xm xif99yt x172qv1o x4afuhf x1lhsz42 x10v4vz6 xdoji71 x1dejxi8 x9k3k5o x8st7rj x11hdxyr x1eunh74 x1wj20lx x1obq294 x5a5i1n xde0f50 x15x8krk">
          <div>
            <div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
              <div aria-selected="false" class="x9f619 xxk0z11 xii2z7h x11xpdln x19c4wfv xvy4d1p">
                <svg aria-label="Leaderboard" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" class="x1lliihq x1n2onr6 x5n08af">
                  <title>Leaderboard</title>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="x6s0dn4 x9f619 xxk0z11 x6ikm8r xeq5yr9 xf7dkkf x1s85apg xzzcqpx" style="opacity: 1;">
            <div style="width: 100%;">
              <div class="" style="width: 100%;">
                <span class="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xl565be xo1l8bm x5n08af x1tu3fi x3x7a5m x10wh9bi xpm28yp x8viiok x1o7cslx" dir="auto" style="--x---base-line-clamp-line-height: 20px; --x-lineHeight: 20px;">
                  <span class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft">Leaderboard</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Click handler
      leaderboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLeaderboardNotification();
      });
      
      // Yapıyı birleştir
      leaderboardDiv.appendChild(leaderboardLink);
      leaderboardSpan.appendChild(leaderboardDiv);
      leaderboardWrapper.appendChild(leaderboardSpan);
      
      // Profil item'ından sonra ekle
      parentContainer.insertBefore(leaderboardWrapper, profileItem.nextSibling);
      
      console.log('🏆 Leaderboard butonu sidebar\'a eklendi!');
    };
    
    // İlk denemede ekle
    setTimeout(checkAndInject, 2000);
    
    // Her 5 saniyede bir kontrol et (sidebar dinamik olabilir)
    setInterval(checkAndInject, 5000);
    
    // Sayfa yüklendiğinde de dene
    if (document.readyState === 'complete') {
      setTimeout(checkAndInject, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(checkAndInject, 1000);
      });
    }
  }

  showLeaderboardNotification() {
    // Sidebar'da leaderboard panel'i aç (Instagram tarzı)
    this.showLeaderboardPanel();
  }

  showLeaderboardPanel() {
    // Zaten açıksa kapat
    if (document.getElementById('reels-climber-leaderboard-panel')) {
      document.getElementById('reels-climber-leaderboard-panel').remove();
      return;
    }
    
    // Panel container oluştur
    const panel = document.createElement('div');
    panel.id = 'reels-climber-leaderboard-panel';
    panel.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      background: #000000;
      border-left: 1px solid #262626;
      z-index: 10000000;
      overflow-y: auto;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      animation: slideInFromRight 0.3s ease-out;
    `;
    
    // Storage'dan veri al
    chrome.storage.local.get(['leaderboardData', 'userID', 'metersClimbed', 'userName'], (result) => {
      const leaderboardData = result.leaderboardData || [];
      const userID = result.userID || '';
      const metersClimbed = result.metersClimbed || 0;
      const userName = result.userName || 'Bilinmeyen';
      
      // Header
      const header = `
        <div style="padding: 20px; border-bottom: 1px solid #262626; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF;">🏆 Leaderboard</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #A8A8A8;">${leaderboardData.length} tırmanıcı</p>
          </div>
          <button id="close-leaderboard-panel" style="
            background: transparent;
            border: none;
            color: #FFFFFF;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            line-height: 1;
          ">×</button>
        </div>
      `;
      
      // Leaderboard items
      let leaderboardHTML = '';
      
      if (leaderboardData.length === 0) {
        leaderboardHTML = `
          <div style="padding: 40px 20px; text-align: center; color: #A8A8A8;">
            <div style="font-size: 48px; margin-bottom: 16px;">🏔️</div>
            <p>Henüz kimse yok!</p>
            <p style="font-size: 12px; margin-top: 8px;">İlk tırmanıcı sen ol!</p>
          </div>
        `;
      } else {
        leaderboardData.forEach((user, index) => {
          const isCurrentUser = user.userID === userID;
          const isTop3 = index < 3;
          
          let rankIcon = `<span style="color: #A8A8A8; font-size: 14px; font-weight: 600;">${index + 1}</span>`;
          if (index === 0) rankIcon = '<span style="font-size: 20px;">🥇</span>';
          else if (index === 1) rankIcon = '<span style="font-size: 20px;">🥈</span>';
          else if (index === 2) rankIcon = '<span style="font-size: 20px;">🥉</span>';
          
          const routeDisplay = user.route || 'Everest';
          
          leaderboardHTML += `
            <div style="
              padding: 12px 20px;
              border-bottom: 1px solid #262626;
              display: flex;
              align-items: center;
              gap: 12px;
              background: ${isCurrentUser ? 'rgba(0, 149, 246, 0.1)' : 'transparent'};
              ${isTop3 ? 'background: rgba(255, 215, 0, 0.05);' : ''}
            ">
              <div style="width: 30px; text-align: center;">
                ${rankIcon}
              </div>
              <div style="flex: 1;">
                <div style="color: #FFFFFF; font-size: 14px; font-weight: ${isCurrentUser ? '600' : '400'};">
                  ${user.name} ${isCurrentUser ? '<span style="color: #0095F6; font-size: 12px;">(Sen)</span>' : ''}
                </div>
                <div style="color: #A8A8A8; font-size: 12px; margin-top: 2px;">
                  Lv.${user.level} • ${user.reels} Reels
                </div>
                <div style="color: #4A9EFF; font-size: 11px; margin-top: 2px;">
                  ${routeDisplay === 'Everest' ? '🏔️ Everest' : '✈️ ' + routeDisplay}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="color: #FFFFFF; font-size: 16px; font-weight: 600;">
                  ${user.meters.toLocaleString('tr-TR')}m
                </div>
              </div>
            </div>
          `;
        });
      }
      
      panel.innerHTML = header + leaderboardHTML;
      document.body.appendChild(panel);
      
      // Close button
      document.getElementById('close-leaderboard-panel').addEventListener('click', () => {
        panel.style.animation = 'slideOutToRight 0.3s ease-out';
        setTimeout(() => panel.remove(), 300);
      });
      
      // Click outside to close
      panel.addEventListener('click', (e) => {
        if (e.target === panel) {
          panel.style.animation = 'slideOutToRight 0.3s ease-out';
          setTimeout(() => panel.remove(), 300);
        }
      });
      
      // Animation styles
      if (!document.getElementById('leaderboard-panel-styles')) {
        const style = document.createElement('style');
        style.id = 'leaderboard-panel-styles';
        style.textContent = `
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          @keyframes slideOutToRight {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(100%);
            }
          }
          #reels-climber-leaderboard-panel::-webkit-scrollbar {
            width: 8px;
          }
          #reels-climber-leaderboard-panel::-webkit-scrollbar-track {
            background: #000000;
          }
          #reels-climber-leaderboard-panel::-webkit-scrollbar-thumb {
            background: #262626;
            border-radius: 4px;
          }
          #reels-climber-leaderboard-panel::-webkit-scrollbar-thumb:hover {
            background: #363636;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }

  trackInstagramActivities() {
    // Like, comment, share, story view gibi Instagram aktivitelerini izle
    
    // Like butonu tıklaması
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      // Like butonu (kalp ikonu)
      if (target.closest('svg[aria-label*="Beğen"], svg[aria-label*="Like"]')) {
        this.unlockHiddenAchievement('heart_giver');
      }
      
      // Share butonu
      if (target.closest('svg[aria-label*="Paylaş"], svg[aria-label*="Share"]')) {
        this.unlockHiddenAchievement('share_master');
      }
      
      // Comment butonu
      if (target.closest('svg[aria-label*="Yorum"], svg[aria-label*="Comment"]')) {
        this.unlockHiddenAchievement('comment_king');
      }
      
      // Profil linki
      if (target.closest('a[href*="/"]') && target.closest('a[href*="/"]').href.match(/instagram\.com\/[^\/]+\/?$/)) {
        this.unlockHiddenAchievement('profile_stalker');
      }
      
      // Story görüntüleme
      if (target.closest('canvas') || target.closest('div[role="button"][tabindex="0"]')) {
        const url = window.location.href;
        if (url.includes('/stories/')) {
          this.unlockHiddenAchievement('social_butterfly');
        }
      }
    });
    
    // Arama kullanımı
    document.addEventListener('focus', (e) => {
      if (e.target.matches('input[placeholder*="Ara"], input[type="search"]')) {
        this.unlockHiddenAchievement('search_detective');
      }
    }, true);
    
    // DM sayfası ziyareti
    const checkDM = () => {
      if (window.location.pathname.includes('/direct/')) {
        this.unlockHiddenAchievement('dm_sender');
      }
    };
    setInterval(checkDM, 5000);
    
    console.log('👁️ Instagram aktivite izleyicisi aktif!');
  }

  unlockHiddenAchievement(achievementId) {
    // Gizli başarımı aç
    if (this.unlockedAchievements.has(achievementId)) {
      return; // Zaten açılmış
    }
    
    const achievement = this.achievements.find(a => a.id === achievementId);
    
    if (achievement && achievement.hidden) {
      this.unlockedAchievements.add(achievementId);
      this.gainXP(achievement.xp);
      
      // Özel gizli başarım bildirimi göster
      this.showHiddenAchievementNotification(achievement);
      
      this.saveData();
      console.log(`🎁 GİZLİ BAŞARIM AÇILDI: ${achievement.revealName}`);
    }
  }

  showHiddenAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: -150px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000001;
      background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
      border: 3px solid #FFD700;
      border-radius: 16px;
      padding: 24px 32px;
      box-shadow: 0 12px 36px rgba(124, 58, 237, 0.6);
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 380px;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
    `;
    
    notification.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 12px;">
        ${achievement.icon}
      </div>
      <div style="font-size: 11px; color: #FFD700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
        🎁 GİZLİ BAŞARIM AÇILDI!
      </div>
      <div style="font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px;">
        ${achievement.revealName}
      </div>
      <div style="font-size: 13px; color: #E9D5FF; margin-bottom: 16px;">
        ${achievement.revealDesc}
      </div>
      <div style="font-size: 16px; color: #4ADE80; font-weight: 700;">
        +${achievement.xp} XP
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
      notification.style.top = '20px';
      notification.style.opacity = '1';
    }, 100);
    
    // Ses çal
    this.playAchievementSound();
    
    // 5 saniye sonra kaybol
    setTimeout(() => {
      notification.style.top = '-150px';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  checkBehaviorAchievements() {
    // Davranış bazlı gizli başarımları kontrol et
    const now = Date.now();
    
    // 7 gün hiç ceza almama
    if (!this.unlockedAchievements.has('no_penalty')) {
      // Burada penalty history tutmamız gerekir, şimdilik basit kontrol
      if (this.metersClimbed > 5000 && this.penaltyEndTime === 0) {
        this.unlockHiddenAchievement('no_penalty');
      }
    }
    
    // Cezadan dönme
    if (!this.unlockedAchievements.has('comeback_kid')) {
      if (this.penaltyEndTime > 0 && now > this.penaltyEndTime && !this.isPenalized) {
        this.unlockHiddenAchievement('comeback_kid');
      }
    }
    
    // Yavaş scroll (sağlıklı kullanım)
    // Son 1 saatte 20'den az Reels
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentReels = this.reelsTimestamps.filter(t => t > oneHourAgo).length;
    if (recentReels > 0 && recentReels < 20 && !this.unlockedAchievements.has('speed_limit')) {
      this.unlockHiddenAchievement('speed_limit');
    }
  }

  isReelsPage() {
    return window.location.pathname.includes('/reels/');
  }

  trackReelsChanges() {
    // İlk reels URL'ini kaydet
    this.lastReelsUrl = window.location.href;
    
    // Eğer ilk kez açılıyorsa ve reels sayfasındaysa say
    if (this.reelsViewed === 0 && this.isReelsPage()) {
      this.reelsViewed = 1;
      this.reelsTimestamps.push(Date.now());
      this.gainXP(10); // İlk Reels için +10 XP
      this.saveData();
      console.log('🎬 İlk Reels! Toplam:', this.reelsViewed, '+10 XP');
    }
    
    // URL değişimlerini izle - daha sık kontrol
    let lastUrl = window.location.href;
    
    const checkUrlChange = () => {
      const currentUrl = window.location.href;
      
      if (currentUrl !== lastUrl) {
        console.log('🔄 URL değişti:', currentUrl);
        lastUrl = currentUrl;
        
        // Yeni bir reels görüntülendi
        if (currentUrl.includes('/reels/') && currentUrl !== this.lastReelsUrl) {
          this.lastReelsUrl = currentUrl;
          this.reelsViewed++;
          
          const now = Date.now();
          
          // Son 5 dakikadaki reels'leri filtrele
          const fiveMinutesAgo = now - (5 * 60 * 1000);
          this.reelsTimestamps = this.reelsTimestamps.filter(t => t > fiveMinutesAgo);
          this.reelsTimestamps.push(now);
          
          // Ceza kontrolü
          const reelsIn5Min = this.reelsTimestamps.length;
          
          if (reelsIn5Min > 50) {
            // Ceza moduna geç!
            if (!this.isPenalized) {
              // İlk ceza
              this.penaltyEndTime = now + (10 * 60 * 1000); // 10 dakika
              this.isPenalized = true;
              this.showPenaltyNotification();
              console.log('⚠️ CEZA! 5 dakikada 50+ reels! 10 dakika ceza başladı!');
            }
            
            // Cezalı her reels
            this.metersClimbed -= 1; // -1 metre
            if (this.metersClimbed < 0) this.metersClimbed = 0;
            
            this.currentXP -= 20; // -20 XP
            if (this.currentXP < 0) this.currentXP = 0;
            
            console.log(`🎬 Yeni Reels (CEZALI)! Toplam: ${this.reelsViewed} | -1m | -20 XP | ${reelsIn5Min}/50 5dk içinde`);
            this.showMiniNotification(`⚠️ Cezalısın! -1m -20XP`);
          } else {
            // Normal bonus
            this.gainXP(10); // +10 XP bonus
            console.log(`🎬 Yeni Reels! Toplam: ${this.reelsViewed} | +10 XP | ${reelsIn5Min}/50 5dk içinde`);
          }
          
          this.updateLevelBar();
          this.saveData();
          
          // Her 10 reels'te bir mini başarım
          if (this.reelsViewed % 10 === 0) {
            this.showMiniNotification(`🎬 ${this.reelsViewed} Reels izledin!`);
          }
          
          // Ceza bitti mi kontrol et
          if (this.isPenalized && now > this.penaltyEndTime) {
            this.isPenalized = false;
            this.penaltyEndTime = 0;
            this.hidePenaltyNotification();
            this.showMiniNotification('✅ Ceza sona erdi! Artık normal bonuslar alacaksın.');
            console.log('✅ Ceza sona erdi!');
          }
        }
      }
    };
    
    // Her 500ms'de bir kontrol et
    setInterval(checkUrlChange, 500);
    
    // MutationObserver ile de dinle (daha hızlı tespit için)
    const urlObserver = new MutationObserver(checkUrlChange);
    urlObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    console.log('✅ Reels tracker aktif!');
  }

  showMiniNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'mini-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }

  async loadData() {
    return new Promise((resolve) => {
      chrome.storage.local.get([
        'metersClimbed',
        'currentLevel',
        'currentXP',
        'totalScrollDistance',
        'totalScrolls',
        'reelsViewed',
        'soundEnabled',
        'userName',
        'unlockedAchievements',
        'lastActiveDate'
      ], (result) => {
        this.metersClimbed = result.metersClimbed || 0;
        this.currentLevel = result.currentLevel || 1;
        this.currentXP = result.currentXP || 0;
        this.totalScrollDistance = result.totalScrollDistance || 0;
        this.totalScrolls = result.totalScrolls || 0;
        this.reelsViewed = result.reelsViewed || 0;
        this.soundEnabled = result.soundEnabled !== undefined ? result.soundEnabled : true;
        this.userName = result.userName || '';
        this.unlockedAchievements = new Set(result.unlockedAchievements || []);
        this.lastActiveDate = result.lastActiveDate || new Date().toDateString();
        
        this.calculateXPForNextLevel();
        resolve();
      });
    });
  }

  async saveData() {
    return new Promise((resolve) => {
      chrome.storage.local.set({
        metersClimbed: this.metersClimbed,
        currentLevel: this.currentLevel,
        currentXP: this.currentXP,
        totalScrollDistance: this.totalScrollDistance,
        totalScrolls: this.totalScrolls,
        reelsViewed: this.reelsViewed,
        soundEnabled: this.soundEnabled,
        userName: this.userName,
        currentRoute: this.currentRoute,
        reelsTimestamps: this.reelsTimestamps,
        penaltyEndTime: this.penaltyEndTime,
        unlockedAchievements: Array.from(this.unlockedAchievements),
        lastActiveDate: new Date().toDateString()
      }, () => {
        // Leaderboard'u güncelle (eğer kullanıcı adı VE userID varsa)
        if (this.userName && this.userID) {
          this.updateLeaderboard();
          console.log('🔄 Leaderboard otomatik güncellendi:', this.userName);
        }
        resolve();
      });
    });
  }

  async updateLeaderboard() {
    // Leaderboard verilerini hem local hem online güncelle
    chrome.storage.local.get(['leaderboardData'], (result) => {
      let leaderboard = result.leaderboardData || [];
      
      // Mevcut kullanıcıyı userID ile bul (userName değil!)
      const userIndex = leaderboard.findIndex(u => u.userID === this.userID);
      const userData = {
        userID: this.userID, // Benzersiz ID (değişmez)
        name: this.userName, // İsim (değişebilir)
        meters: Math.floor(this.metersClimbed),
        level: this.currentLevel,
        reels: this.reelsViewed,
        route: this.currentRoute ? `${this.currentRoute.startCityName} → ${this.currentRoute.endCityName}` : 'Everest',
        timestamp: Date.now()
      };
      
      if (userIndex >= 0) {
        // Güncelle (aynı userID, sadece veriler değişir)
        leaderboard[userIndex] = userData;
        console.log('🔄 Leaderboard güncellendi:', this.userName);
      } else {
        // Yeni ekle (ilk kez)
        leaderboard.push(userData);
        console.log('➕ Leaderboard\'a eklendi:', this.userName);
      }
      
      // Sırala (metre sayısına göre)
      leaderboard.sort((a, b) => b.meters - a.meters);
      
      // En fazla 100 kişi tut
      leaderboard = leaderboard.slice(0, 100);
      
      // Local storage'a kaydet
      chrome.storage.local.set({ leaderboardData: leaderboard }, () => {
        console.log('💾 Leaderboard local storage\'a kaydedildi');
      });
      
      // Online leaderboard'a kaydet (Chrome Storage Sync)
      this.syncToOnlineLeaderboard(userData);
    });
  }

  async syncToOnlineLeaderboard(userData) {
    // Chrome Storage Sync kullanarak tüm cihazlar arası senkronizasyon
    try {
      // Önce mevcut online leaderboard'u al
      chrome.storage.sync.get(['onlineLeaderboard'], (result) => {
        let onlineLeaderboard = result.onlineLeaderboard || [];
        
        // Bu kullanıcıyı bul veya ekle
        const userIndex = onlineLeaderboard.findIndex(u => u.userID === userData.userID);
        
        if (userIndex >= 0) {
          onlineLeaderboard[userIndex] = userData;
        } else {
          onlineLeaderboard.push(userData);
        }
        
        // Sırala ve sınırla
        onlineLeaderboard.sort((a, b) => b.meters - a.meters);
        onlineLeaderboard = onlineLeaderboard.slice(0, 100);
        
        // Sync storage'a kaydet (tüm cihazlarda senkronize olur)
        chrome.storage.sync.set({ onlineLeaderboard: onlineLeaderboard }, () => {
          if (chrome.runtime.lastError) {
            console.warn('⚠️ Sync storage hatası:', chrome.runtime.lastError.message);
          } else {
            console.log('☁️ Online leaderboard güncellendi!');
          }
        });
      });
    } catch (error) {
      console.error('❌ Online sync hatası:', error);
    }
  }

  calculateXPForNextLevel() {
    // Her 5 levelde bir zorlaşma
    const levelGroup = Math.floor((this.currentLevel - 1) / 5);
    this.xpForNextLevel = 1000 * Math.pow(1.5, levelGroup);
  }

  attachScrollListener() {
    let scrollTimer;
    let lastScrollPosition = 0;
    
    const handleScroll = (source = 'unknown') => {
      // Instagram Reels'te birden fazla scroll container olabilir
      let currentScrollPosition = 0;
      
      // 1. Window scroll
      currentScrollPosition = Math.max(currentScrollPosition, window.scrollY || window.pageYOffset || 0);
      
      // 2. Document element scroll
      currentScrollPosition = Math.max(currentScrollPosition, document.documentElement.scrollTop || 0);
      
      // 3. Body scroll
      currentScrollPosition = Math.max(currentScrollPosition, document.body.scrollTop || 0);
      
      // 4. Instagram'ın ana container'ı (varsa)
      const mainContainer = document.querySelector('main') || document.querySelector('[role="main"]');
      if (mainContainer) {
        currentScrollPosition = Math.max(currentScrollPosition, mainContainer.scrollTop || 0);
      }
      
      const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);
      
      // Minimum scroll threshold (çok düşük)
      if (scrollDelta > 5) {
        this.totalScrollDistance += scrollDelta;
        const oldMeters = this.metersClimbed;
        this.metersClimbed = this.totalScrollDistance / this.pixelsPerMeter;
        this.totalScrolls++;
        
        // Debug log - Her 1 metrede log
        if (Math.floor(this.metersClimbed) > Math.floor(oldMeters)) {
          console.log('🏔️ Yeni metre!', Math.floor(this.metersClimbed), 'm (scroll delta:', scrollDelta, 'px, source:', source + ')');
        }
        
        // Debug - Her scroll'da
        console.log('📊 Scroll:', scrollDelta, 'px | Toplam:', this.totalScrollDistance, 'px | Metre:', this.metersClimbed.toFixed(2), 'm');
        
        // Her scroll'da kontrol et
        this.checkAchievements();
        this.updateLevelBar();
        
        // Veriyi kaydet (debounced)
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          this.saveData();
        }, 1000);
        
        lastScrollPosition = currentScrollPosition;
      }
    };
    
    // 1. Window scroll event
    window.addEventListener('scroll', () => handleScroll('window'), { passive: true });
    
    // 2. Document scroll event
    document.addEventListener('scroll', () => handleScroll('document'), { passive: true, capture: true });
    
    // 3. Instagram'ın main container'ına listener ekle
    const addMainContainerListener = () => {
      const mainContainer = document.querySelector('main') || document.querySelector('[role="main"]');
      if (mainContainer) {
        mainContainer.addEventListener('scroll', () => handleScroll('main-container'), { passive: true });
        console.log('✅ Main container scroll listener eklendi!');
      }
    };
    
    // Hemen dene
    addMainContainerListener();
    
    // Sayfa yüklendikten sonra tekrar dene (Instagram geç yüklenebilir)
    setTimeout(addMainContainerListener, 1000);
    setTimeout(addMainContainerListener, 3000);
    
    // 4. Wheel event (scroll wheel kullanımı için)
    window.addEventListener('wheel', (e) => {
      // Wheel delta'yı da scroll'a ekle
      const wheelDelta = Math.abs(e.deltaY);
      if (wheelDelta > 0) {
        this.totalScrollDistance += wheelDelta;
        const oldMeters = this.metersClimbed;
        this.metersClimbed = this.totalScrollDistance / this.pixelsPerMeter;
        
        if (Math.floor(this.metersClimbed) > Math.floor(oldMeters)) {
          console.log('🏔️ Yeni metre (wheel)!', Math.floor(this.metersClimbed), 'm');
        }
        
        console.log('🎡 Wheel:', wheelDelta, 'px | Metre:', this.metersClimbed.toFixed(2), 'm');
        
        this.checkAchievements();
        this.updateLevelBar();
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => this.saveData(), 1000);
      }
    }, { passive: true });
    
    // 5. Touch events (mobil için)
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      const touchDelta = Math.abs(e.touches[0].clientY - touchStartY);
      if (touchDelta > 5) {
        this.totalScrollDistance += touchDelta;
        this.metersClimbed = this.totalScrollDistance / this.pixelsPerMeter;
        
        console.log('👆 Touch:', touchDelta, 'px | Metre:', this.metersClimbed.toFixed(2), 'm');
        
        this.checkAchievements();
        this.updateLevelBar();
        
        touchStartY = e.touches[0].clientY;
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => this.saveData(), 1000);
      }
    }, { passive: true });
    
    // İlk pozisyonu kaydet
    lastScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    console.log('✅ Scroll listener aktif! (window + document + wheel + touch)');
    console.log('📊 pixelsPerMeter:', this.pixelsPerMeter);
    console.log('📊 Başlangıç pozisyonu:', lastScrollPosition);
  }

  checkAchievements() {
    this.achievements.forEach(achievement => {
      // Zaten açılmışsa geç
      if (this.unlockedAchievements.has(achievement.id)) return;
      
      let unlocked = false;
      
      // Normal mesafe başarımları
      if (!achievement.special && achievement.distance && this.metersClimbed >= achievement.distance) {
        unlocked = true;
      }
      
      // Özel başarımlar
      if (achievement.special === 'scrolls' && this.totalScrolls >= achievement.threshold) {
        unlocked = true;
      }
      
      if (achievement.special === 'reels' && this.reelsViewed >= achievement.threshold) {
        unlocked = true;
      }
      
      if (achievement.special === 'level' && this.currentLevel >= achievement.threshold) {
        // Gizli seviye başarımı
        if (achievement.hidden) {
          this.unlockHiddenAchievement(achievement.id);
        } else {
          unlocked = true;
        }
      }
      
      // Kilometre milestone'ları (gizli)
      if (achievement.special === 'milestone') {
        const meters = this.metersClimbed;
        if (achievement.threshold === 1000 && meters >= 1000 && meters < 1001) {
          this.unlockHiddenAchievement(achievement.id);
        }
        if (achievement.threshold === 5000 && meters >= 5000 && meters < 5001) {
          this.unlockHiddenAchievement(achievement.id);
        }
      }
      
      // Şanslı sayılar (gizli)
      if (achievement.special === 'lucky') {
        if (achievement.threshold === 'reels_777' && this.reelsViewed === 777) {
          this.unlockHiddenAchievement(achievement.id);
        }
        if (achievement.threshold === 'meter_1234') {
          const meters = Math.floor(this.metersClimbed);
          if (meters === 1234) {
            this.unlockHiddenAchievement(achievement.id);
          }
        }
      }
      
      if (unlocked && !achievement.hidden) {
        this.unlockAchievement(achievement);
      }
    });
  }

  checkTimeBasedAchievements() {
    const hour = new Date().getHours();
    
    this.achievements.forEach(achievement => {
      if (this.unlockedAchievements.has(achievement.id)) return;
      
      if (achievement.special === 'time') {
        // Normal zaman başarımları
        if (achievement.threshold === 'night' && (hour >= 0 && hour < 6) && !achievement.hidden) {
          this.unlockAchievement(achievement);
        }
        if (achievement.threshold === 'morning' && (hour >= 5 && hour < 9) && !achievement.hidden) {
          this.unlockAchievement(achievement);
        }
        
        // Gizli zaman başarımları
        if (achievement.threshold === 'midnight' && (hour === 0) && achievement.hidden) {
          this.unlockHiddenAchievement(achievement.id);
        }
        if (achievement.threshold === 'sunrise' && (hour === 5) && achievement.hidden) {
          this.unlockHiddenAchievement(achievement.id);
        }
        if (achievement.threshold === 'workday' && (hour >= 9 && hour <= 17) && achievement.hidden) {
          // Hafta içi mesai saatlerinde
          const day = new Date().getDay();
          if (day >= 1 && day <= 5) {
            this.unlockHiddenAchievement(achievement.id);
          }
        }
      }
    });
  }

  unlockAchievement(achievement) {
    // Normal başarımlar için
    if (!achievement.hidden) {
      this.unlockedAchievements.add(achievement.id);
      this.gainXP(achievement.xp);
      this.showAchievementNotification(achievement);
      this.saveData();
    }
  }

  gainXP(amount) {
    this.currentXP += amount;
    
    // Level atla
    while (this.currentXP >= this.xpForNextLevel) {
      this.currentXP -= this.xpForNextLevel;
      this.currentLevel++;
      this.calculateXPForNextLevel();
      this.showLevelUpNotification();
    }
    
    this.updateLevelBar();
  }

  createLevelBar() {
    const levelBar = document.createElement('div');
    levelBar.id = 'reels-climber-level-bar';
    levelBar.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      background: #000000;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 12px 16px;
      min-width: 200px;
      max-width: 280px;
      z-index: 9999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    `;
    
    levelBar.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="
          background: linear-gradient(135deg, #4A9EFF 0%, #2563EB 100%);
          color: white;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(74, 158, 255, 0.3);
        ">Lv ${this.currentLevel}</span>
        <span style="
          color: #A8A8A8;
          font-size: 13px;
          font-weight: 500;
        ">${this.metersClimbed.toFixed(0)}m</span>
      </div>
      <div style="
        position: relative;
        height: 6px;
        background: #1A1A1A;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
      ">
        <div id="xp-bar-fill" style="
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: ${(this.currentXP / this.xpForNextLevel) * 100}%;
          background: linear-gradient(90deg, #4A9EFF 0%, #2563EB 100%);
          border-radius: 8px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(74, 158, 255, 0.5);
        "></div>
      </div>
      <div style="
        margin-top: 6px;
        text-align: center;
        color: #737373;
        font-size: 10px;
        font-weight: 500;
      ">${this.currentXP.toFixed(0)} / ${this.xpForNextLevel.toFixed(0)} XP</div>
    `;
    
    document.body.appendChild(levelBar);
  }

  updateLevelBar() {
    const levelBar = document.getElementById('reels-climber-level-bar');
    if (!levelBar) return;
    
    // Update level badge
    const levelBadge = levelBar.querySelector('span');
    if (levelBadge) {
      levelBadge.textContent = `Lv ${this.currentLevel}`;
    }
    
    // Update meters
    const metersSpan = levelBar.querySelectorAll('span')[1];
    if (metersSpan) {
      metersSpan.textContent = `${this.metersClimbed.toFixed(0)}m`;
    }
    
    // Update XP bar
    const xpBarFill = document.getElementById('xp-bar-fill');
    if (xpBarFill) {
      xpBarFill.style.width = `${(this.currentXP / this.xpForNextLevel) * 100}%`;
    }
    
    // Update XP text
    const xpText = levelBar.querySelector('div:last-child');
    if (xpText) {
      xpText.textContent = `${this.currentXP.toFixed(0)} / ${this.xpForNextLevel.toFixed(0)} XP`;
    }
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.style.cssText = `
      position: fixed;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
      border: 2px solid #FFD700;
      border-radius: 12px;
      padding: 16px 20px;
      z-index: 10000000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 320px;
      max-width: 400px;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
    `;
    
    notification.innerHTML = `
      <div style="font-size: 32px; line-height: 1;">${achievement.icon}</div>
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: 600; color: #FFD700; margin-bottom: 2px;">
          🏆 ${achievement.name}
        </div>
        <div style="font-size: 12px; color: #D4E8FF;">
          ${achievement.description}
        </div>
      </div>
      <div style="font-size: 16px; font-weight: 700; color: #4ADE80;">
        +${achievement.xp} XP
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in from top
    setTimeout(() => {
      notification.style.top = '20px';
      notification.style.opacity = '1';
    }, 100);
    
    // Ses efekti
    this.playAchievementSound();
    
    // 4 saniye sonra kaldır
    setTimeout(() => {
      notification.style.top = '-100px';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }

  showLevelUpNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #4A9EFF 0%, #2563EB 100%);
      border: 2px solid #60A5FA;
      border-radius: 12px;
      padding: 16px 20px;
      z-index: 10000000;
      box-shadow: 0 8px 24px rgba(74, 158, 255, 0.4);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 280px;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
    `;
    
    notification.innerHTML = `
      <div style="font-size: 32px; line-height: 1;">⭐</div>
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-bottom: 2px;">
          SEVİYE ATLADIN!
        </div>
        <div style="font-size: 18px; font-weight: 700; color: #FFD700;">
          Seviye ${this.currentLevel}
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.top = '20px';
      notification.style.opacity = '1';
    }, 100);
    
    this.playAchievementSound();
    
    setTimeout(() => {
      notification.style.top = '-100px';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }

  playAchievementSound() {
    // Ses kapalıysa çalma
    if (!this.soundEnabled) return;
    
    // Web Audio API ile basit bir başarım sesi
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Ses oynatma desteklenmiyorsa sessizce geç
    }
  }

  showPenaltyNotification() {
    // Eski penalty notification varsa kaldır
    this.hidePenaltyNotification();
    
    const notification = document.createElement('div');
    notification.id = 'penalty-notification';
    notification.className = 'penalty-notification';
    
    const timerCircle = document.createElement('div');
    timerCircle.className = 'penalty-timer-circle';
    
    const timerText = document.createElement('div');
    timerText.className = 'penalty-timer-text';
    
    const content = document.createElement('div');
    content.className = 'penalty-content';
    content.innerHTML = `
      <div class="penalty-icon">⚠️</div>
      <div class="penalty-title">CEZA MODU AKTİF!</div>
      <div class="penalty-desc">5 dakikada 50+ Reels izledin!</div>
      <div class="penalty-info">
        <div>Her Reels: <span class="penalty-negative">-1 metre</span></div>
        <div>Her Reels: <span class="penalty-negative">-20 XP</span></div>
      </div>
    `;
    
    notification.appendChild(timerCircle);
    notification.appendChild(timerText);
    notification.appendChild(content);
    document.body.appendChild(notification);
    
    // Timer'ı güncelle
    this.updatePenaltyTimer();
    
    // Her saniye güncelle
    this.penaltyTimerInterval = setInterval(() => {
      this.updatePenaltyTimer();
    }, 1000);
    
    setTimeout(() => notification.classList.add('show'), 100);
  }

  updatePenaltyTimer() {
    const notification = document.getElementById('penalty-notification');
    if (!notification) return;
    
    const timerCircle = notification.querySelector('.penalty-timer-circle');
    const timerText = notification.querySelector('.penalty-timer-text');
    
    const now = Date.now();
    const remaining = Math.max(0, this.penaltyEndTime - now);
    const totalDuration = 10 * 60 * 1000; // 10 dakika
    const progress = (remaining / totalDuration) * 100;
    
    // Dakika ve saniye hesapla
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    timerCircle.style.background = `conic-gradient(#EF4444 ${progress}%, rgba(239, 68, 68, 0.2) ${progress}%)`;
    timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Ceza bitti
    if (remaining <= 0) {
      this.hidePenaltyNotification();
      this.isPenalized = false;
      this.penaltyEndTime = 0;
      this.showMiniNotification('✅ Ceza sona erdi!');
    }
  }

  hidePenaltyNotification() {
    const notification = document.getElementById('penalty-notification');
    if (notification) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }
    
    if (this.penaltyTimerInterval) {
      clearInterval(this.penaltyTimerInterval);
      this.penaltyTimerInterval = null;
    }
  }
}

// Instagram Reels sayfasında başlat
if (window.location.hostname === 'www.instagram.com') {
  let climberInstance = null;
  
  const startIfReels = () => {
    if (window.location.pathname.includes('/reels/')) {
      console.log('🏔️ Reels sayfası tespit edildi!');
      if (!climberInstance) {
        climberInstance = new ReelsClimber();
        window.reelsClimber = climberInstance;
      }
    } else {
      console.log('📍 Reels sayfasında değilsiniz.');
      // Reels sayfasında değilse level barını kaldır
      const levelBar = document.getElementById('reels-climber-level-bar');
      if (levelBar) {
        levelBar.remove();
        console.log('🗑️ Level bar kaldırıldı.');
      }
      climberInstance = null;
      window.reelsClimber = null;
    }
  };
  
  // Sayfa yüklendiğinde başlat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIfReels);
  } else {
    startIfReels();
  }
  
  // URL değişimlerini izle (SPA navigation)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      console.log('🔄 Sayfa değişti:', window.location.pathname);
      lastPath = window.location.pathname;
      startIfReels();
    }
  }, 500);
}
