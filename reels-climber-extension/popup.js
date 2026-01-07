// Reels Climber Popup Dashboard
document.addEventListener('DOMContentLoaded', async () => {
  const EVEREST_HEIGHT = 8848; // metre
  
  // Cities and distances data
  const CITIES = {
    turkey: {
      name: '🇹🇷 Türkiye',
      cities: {
        ankara: { name: 'Ankara', capital: true },
        istanbul: { name: 'İstanbul', capital: false }
      }
    },
    norway: {
      name: '🇳🇴 Norveç',
      cities: {
        oslo: { name: 'Oslo', capital: true },
        bergen: { name: 'Bergen', capital: false }
      }
    },
    switzerland: {
      name: '🇨🇭 İsviçre',
      cities: {
        bern: { name: 'Bern', capital: true },
        zurich: { name: 'Zürich', capital: false }
      }
    },
    japan: {
      name: '🇯🇵 Japonya',
      cities: {
        tokyo: { name: 'Tokyo', capital: true },
        osaka: { name: 'Osaka', capital: false }
      }
    },
    usa: {
      name: '🇺🇸 Amerika',
      cities: {
        washington: { name: 'Washington D.C.', capital: true },
        newyork: { name: 'New York', capital: false }
      }
    },
    germany: {
      name: '🇩🇪 Almanya',
      cities: {
        berlin: { name: 'Berlin', capital: true },
        munich: { name: 'Münih', capital: false }
      }
    }
  };
  
  // Distance matrix (in km) - Real distances via air travel
  const DISTANCES = {
    // Türkiye başlangıçları
    'turkey-ankara-japan-tokyo': 8674,
    'turkey-ankara-japan-osaka': 8820,
    'turkey-ankara-usa-washington': 8950,
    'turkey-ankara-usa-newyork': 8670,
    'turkey-ankara-norway-oslo': 2650,
    'turkey-ankara-norway-bergen': 2950,
    'turkey-ankara-switzerland-bern': 2280,
    'turkey-ankara-switzerland-zurich': 2250,
    'turkey-ankara-germany-berlin': 2100,
    'turkey-ankara-germany-munich': 1890,
    
    'turkey-istanbul-japan-tokyo': 9300,
    'turkey-istanbul-japan-osaka': 9450,
    'turkey-istanbul-usa-washington': 9100,
    'turkey-istanbul-usa-newyork': 8050,
    'turkey-istanbul-norway-oslo': 2540,
    'turkey-istanbul-norway-bergen': 2840,
    'turkey-istanbul-switzerland-bern': 2090,
    'turkey-istanbul-switzerland-zurich': 2070,
    'turkey-istanbul-germany-berlin': 1850,
    'turkey-istanbul-germany-munich': 1650,
    
    // Norveç başlangıçları
    'norway-oslo-japan-tokyo': 8770,
    'norway-oslo-japan-osaka': 8920,
    'norway-oslo-usa-washington': 6370,
    'norway-oslo-usa-newyork': 5875,
    'norway-oslo-switzerland-bern': 1500,
    'norway-oslo-switzerland-zurich': 1480,
    'norway-oslo-germany-berlin': 815,
    'norway-oslo-germany-munich': 1310,
    'norway-oslo-turkey-ankara': 2650,
    'norway-oslo-turkey-istanbul': 2540,
    
    'norway-bergen-japan-tokyo': 8900,
    'norway-bergen-japan-osaka': 9050,
    'norway-bergen-usa-washington': 6240,
    'norway-bergen-usa-newyork': 5750,
    'norway-bergen-switzerland-bern': 1650,
    'norway-bergen-switzerland-zurich': 1630,
    'norway-bergen-germany-berlin': 950,
    'norway-bergen-germany-munich': 1450,
    'norway-bergen-turkey-ankara': 2950,
    'norway-bergen-turkey-istanbul': 2840,
    
    // İsviçre başlangıçları
    'switzerland-bern-japan-tokyo': 9700,
    'switzerland-bern-japan-osaka': 9850,
    'switzerland-bern-usa-washington': 6500,
    'switzerland-bern-usa-newyork': 6330,
    'switzerland-bern-norway-oslo': 1500,
    'switzerland-bern-norway-bergen': 1650,
    'switzerland-bern-germany-berlin': 850,
    'switzerland-bern-germany-munich': 390,
    'switzerland-bern-turkey-ankara': 2280,
    'switzerland-bern-turkey-istanbul': 2090,
    
    'switzerland-zurich-japan-tokyo': 9680,
    'switzerland-zurich-japan-osaka': 9830,
    'switzerland-zurich-usa-washington': 6480,
    'switzerland-zurich-usa-newyork': 6310,
    'switzerland-zurich-norway-oslo': 1480,
    'switzerland-zurich-norway-bergen': 1630,
    'switzerland-zurich-germany-berlin': 680,
    'switzerland-zurich-germany-munich': 310,
    'switzerland-zurich-turkey-ankara': 2250,
    'switzerland-zurich-turkey-istanbul': 2070,
    
    // Japonya başlangıçları
    'japan-tokyo-usa-washington': 11140,
    'japan-tokyo-usa-newyork': 10850,
    'japan-tokyo-norway-oslo': 8770,
    'japan-tokyo-norway-bergen': 8900,
    'japan-tokyo-switzerland-bern': 9700,
    'japan-tokyo-switzerland-zurich': 9680,
    'japan-tokyo-germany-berlin': 8920,
    'japan-tokyo-germany-munich': 9230,
    'japan-tokyo-turkey-ankara': 8674,
    'japan-tokyo-turkey-istanbul': 9300,
    
    'japan-osaka-usa-washington': 11270,
    'japan-osaka-usa-newyork': 10980,
    'japan-osaka-norway-oslo': 8920,
    'japan-osaka-norway-bergen': 9050,
    'japan-osaka-switzerland-bern': 9850,
    'japan-osaka-switzerland-zurich': 9830,
    'japan-osaka-germany-berlin': 9070,
    'japan-osaka-germany-munich': 9380,
    'japan-osaka-turkey-ankara': 8820,
    'japan-osaka-turkey-istanbul': 9450,
    
    // Amerika başlangıçları
    'usa-washington-japan-tokyo': 11140,
    'usa-washington-japan-osaka': 11270,
    'usa-washington-norway-oslo': 6370,
    'usa-washington-norway-bergen': 6240,
    'usa-washington-switzerland-bern': 6500,
    'usa-washington-switzerland-zurich': 6480,
    'usa-washington-germany-berlin': 6545,
    'usa-washington-germany-munich': 6760,
    'usa-washington-turkey-ankara': 8950,
    'usa-washington-turkey-istanbul': 9100,
    
    'usa-newyork-japan-tokyo': 10850,
    'usa-newyork-japan-osaka': 10980,
    'usa-newyork-norway-oslo': 5875,
    'usa-newyork-norway-bergen': 5750,
    'usa-newyork-switzerland-bern': 6330,
    'usa-newyork-switzerland-zurich': 6310,
    'usa-newyork-germany-berlin': 6380,
    'usa-newyork-germany-munich': 6590,
    'usa-newyork-turkey-ankara': 8670,
    'usa-newyork-turkey-istanbul': 8050,
    
    // Almanya başlangıçları
    'germany-berlin-japan-tokyo': 8920,
    'germany-berlin-japan-osaka': 9070,
    'germany-berlin-usa-washington': 6545,
    'germany-berlin-usa-newyork': 6380,
    'germany-berlin-norway-oslo': 815,
    'germany-berlin-norway-bergen': 950,
    'germany-berlin-switzerland-bern': 850,
    'germany-berlin-switzerland-zurich': 680,
    'germany-berlin-turkey-ankara': 2100,
    'germany-berlin-turkey-istanbul': 1850,
    
    'germany-munich-japan-tokyo': 9230,
    'germany-munich-japan-osaka': 9380,
    'germany-munich-usa-washington': 6760,
    'germany-munich-usa-newyork': 6590,
    'germany-munich-norway-oslo': 1310,
    'germany-munich-norway-bergen': 1450,
    'germany-munich-switzerland-bern': 390,
    'germany-munich-switzerland-zurich': 310,
    'germany-munich-turkey-ankara': 1890,
    'germany-munich-turkey-istanbul': 1650
  };
  
  function getDistance(startCountry, startCity, endCountry, endCity) {
    const key = `${startCountry}-${startCity}-${endCountry}-${endCity}`;
    return DISTANCES[key] || 0;
  }
  
  // Define achievements (same as content.js)
  const achievements = [
    { id: 'base_camp', distance: EVEREST_HEIGHT * 0.05, name: 'Baz Kampı', icon: '⛺' },
    { id: 'slope_start', distance: EVEREST_HEIGHT * 0.10, name: 'Yokuş Başladı', icon: '🥾' },
    { id: 'oxygen_drop', distance: EVEREST_HEIGHT * 0.15, name: 'Oksijen Düşüyor', icon: '😮‍💨' },
    { id: 'above_clouds', distance: EVEREST_HEIGHT * 0.20, name: 'Bulutların Üstü', icon: '☁️' },
    { id: 'quarter_way', distance: EVEREST_HEIGHT * 0.25, name: 'Yolun Çeyreği', icon: '🏔️' },
    { id: 'mountain_goat', distance: EVEREST_HEIGHT * 0.30, name: 'Dağ Keçisi', icon: '🐐' },
    { id: 'storm_coming', distance: EVEREST_HEIGHT * 0.35, name: 'Fırtına Öncesi', icon: '🌪️' },
    { id: 'altitude_expert', distance: EVEREST_HEIGHT * 0.40, name: 'İrtifa Uzmanı', icon: '🧗' },
    { id: 'peak_visible', distance: EVEREST_HEIGHT * 0.45, name: 'Zirve Göründü', icon: '🥇' },
    { id: 'halfway', distance: EVEREST_HEIGHT * 0.50, name: 'YOLUN YARISI', icon: '⚡' },
    { id: 'frozen_fingers', distance: EVEREST_HEIGHT * 0.55, name: 'Donmuş Parmaklar', icon: '🥶' },
    { id: 'glacier_explorer', distance: EVEREST_HEIGHT * 0.60, name: 'Buzul Kaşifi', icon: '🧊' },
    { id: 'pushing_limits', distance: EVEREST_HEIGHT * 0.65, name: 'Sınırları Zorlayan', icon: '💪' },
    { id: 'himalaya_native', distance: EVEREST_HEIGHT * 0.70, name: 'Himalaya Yerlisi', icon: '🏔️' },
    { id: 'stratosphere', distance: EVEREST_HEIGHT * 0.75, name: 'Stratosfer', icon: '💎' },
    { id: 'breathless', distance: EVEREST_HEIGHT * 0.80, name: 'Nefessiz', icon: '😵' },
    { id: 'death_zone', distance: EVEREST_HEIGHT * 0.85, name: 'Ölüm Bölgesi', icon: '☠️' },
    { id: 'final_stretch', distance: EVEREST_HEIGHT * 0.90, name: 'Son Düzlük', icon: '🔥' },
    { id: 'summit_fire', distance: EVEREST_HEIGHT * 0.95, name: 'Zirve Ateşi', icon: '🌟' },
    { id: 'everest_conqueror', distance: EVEREST_HEIGHT, name: 'EVEREST FATİHİ', icon: '👑' }
  ];
  
  // Load data from storage
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
    'leaderboardData',
    'unlockedAchievements'
  ], (result) => {
    const metersClimbed = result.metersClimbed || 0;
    const currentLevel = result.currentLevel || 1;
    const totalScrolls = result.totalScrolls || 0;
    const reelsViewed = result.reelsViewed || 0;
    const soundEnabled = result.soundEnabled !== undefined ? result.soundEnabled : true;
    const userName = result.userName || '';
    const userID = result.userID || ''; // Benzersiz ID
    const currentRoute = result.currentRoute || null;
    const localLeaderboard = result.leaderboardData || [];
    const unlockedAchievements = new Set(result.unlockedAchievements || []);
    
    // Online leaderboard'u da yükle ve birleştir
    chrome.storage.sync.get(['onlineLeaderboard'], (syncResult) => {
      const onlineLeaderboard = syncResult.onlineLeaderboard || [];
      
      // Local ve online leaderboard'u birleştir (userID bazlı)
      function mergeLeaderboards(local, online) {
        const merged = {};
        
        // Local'daki tüm kullanıcıları ekle
        local.forEach(user => {
          merged[user.userID] = user;
        });
        
        // Online'daki kullanıcıları ekle/güncelle (daha güncel timestamp varsa)
        online.forEach(user => {
          if (!merged[user.userID] || merged[user.userID].timestamp < user.timestamp) {
            merged[user.userID] = user;
          }
        });
        
        // Object'ten array'e çevir ve sırala
        return Object.values(merged)
          .sort((a, b) => b.meters - a.meters)
          .slice(0, 100);
      }
      
      const mergedLeaderboard = mergeLeaderboards(localLeaderboard, onlineLeaderboard);
      
      console.log('📊 Leaderboard yüklendi:', {
        local: localLeaderboard.length,
        online: onlineLeaderboard.length,
        merged: mergedLeaderboard.length
      });
      
      // Birleştirilmiş leaderboard'u kullan
      const leaderboardData = mergedLeaderboard;
    
    // Hedef mesafeyi belirle (rota varsa rota, yoksa Everest)
    const targetHeight = currentRoute ? (currentRoute.distance * 1000) : EVEREST_HEIGHT;
    const targetName = currentRoute ? `${currentRoute.startCityName} → ${currentRoute.endCityName}` : 'Everest';
    
    // Update stats
    document.getElementById('total-meters').textContent = `${Math.floor(metersClimbed)}m`;
    document.getElementById('current-level').textContent = currentLevel;
    document.getElementById('reels-viewed').textContent = reelsViewed;
    
    // Update progress
    const progress = Math.min((metersClimbed / targetHeight) * 100, 100);
    document.getElementById('everest-progress-fill').style.width = `${progress}%`;
    document.getElementById('everest-percentage').textContent = `${progress.toFixed(1)}%`;
    
    // Update title
    document.querySelector('.progress-title').textContent = currentRoute ? 
      `${targetName} İlerlemesi` : 'Everest İlerlemesi';
    
    // Update SVG Path Animation
    updateSVGProgress(progress);
    
    // Update progress text
    let progressMessage = '';
    if (progress === 0) {
      progressMessage = `Tırmanışa hazırlan! Instagram Reels'i kaydırmaya başla!`;
    } else if (progress < 25) {
      progressMessage = `Harika başlangıç! ${((targetHeight - metersClimbed) / 1000).toFixed(1)}km daha var.`;
    } else if (progress < 50) {
      progressMessage = `Yarıya yaklaşıyorsun! Devam et!`;
    } else if (progress < 75) {
      progressMessage = `İnanılmaz! Yarıyı geçtin! ${((targetHeight - metersClimbed) / 1000).toFixed(1)}km kaldı.`;
    } else if (progress < 100) {
      progressMessage = `Hedef çok yakın! Bitiş çizgisine geliyorsun!`;
    } else {
      progressMessage = currentRoute ? 
        `🎉 ROTAYI TAMAMLADIN! ${targetName}` : 
        '🎉 EVEREST\'İ FETHETTİN! Efsanesin!';
    }
    document.getElementById('progress-text').textContent = progressMessage;
    
    // Update achievements count
    const everestAchievements = achievements.filter(a => !a.special && !a.hidden); // Gizli başarımları filtrele
    const unlockedEverestCount = everestAchievements.filter(a => unlockedAchievements.has(a.id)).length;
    document.getElementById('achievements-count').textContent = 
      `${unlockedEverestCount}/${everestAchievements.length}`;
    
    // Populate achievements grid (sadece gizli olmayanları göster)
    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = '';
    
    everestAchievements.forEach(achievement => {
      const isUnlocked = unlockedAchievements.has(achievement.id);
      const achievementDiv = document.createElement('div');
      achievementDiv.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
      achievementDiv.innerHTML = `
        <div class="achievement-icon-small">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-tooltip">
          <div class="tooltip-title">${achievement.icon} ${achievement.name}</div>
          <div class="tooltip-desc">${achievement.description}</div>
          <div class="tooltip-requirement">${achievement.distance.toFixed(0)}m'de açılır • +${achievement.xp} XP</div>
        </div>
      `;
      
      achievementsGrid.appendChild(achievementDiv);
    });
    
    // Set sound toggle state
    document.getElementById('sound-toggle').checked = soundEnabled;
    
    // Set username input and button state
    const usernameInput = document.getElementById('username-input');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    usernameInput.value = userName;
    saveUsernameBtn.disabled = userName.length === 0;
    
    // Display leaderboard (userID kullanarak - merged data ile)
    displayLeaderboard(leaderboardData, userID, Math.floor(metersClimbed));
    }); // sync callback sonu
  }); // local storage callback sonu
  
  // Display leaderboard
  function displayLeaderboard(leaderboardData, currentUserID, currentMeters) {
    const container = document.getElementById('leaderboard-container');
    
    if (leaderboardData.length === 0) {
      container.innerHTML = '<div class="leaderboard-info">Henüz kimse leaderboard\'da yok. İlk sen ol!</div>';
      return;
    }
    
    container.innerHTML = '';
    
    leaderboardData.forEach((user, index) => {
      const isCurrentUser = user.userID === currentUserID;
      const isTop3 = index < 3;
      
      const item = document.createElement('div');
      item.className = `leaderboard-item ${isCurrentUser ? 'current-user' : ''} ${isTop3 ? 'top-3' : ''}`;
      
      let rankIcon = index + 1;
      if (index === 0) rankIcon = '🥇';
      else if (index === 1) rankIcon = '🥈';
      else if (index === 2) rankIcon = '🥉';
      
      const routeDisplay = user.route || 'Everest';
      const routeBadge = routeDisplay !== 'Everest' ? 
        `<span style="font-size: 10px; color: #4A9EFF;">✈️ ${routeDisplay}</span>` : 
        '<span style="font-size: 10px; color: #94A3B8;">🏔️ Everest</span>';
      
      item.innerHTML = `
        <div class="leaderboard-rank">${rankIcon}</div>
        <div class="leaderboard-info-col">
          <div class="leaderboard-name">${user.name} ${isCurrentUser ? '(Sen)' : ''}</div>
          <div class="leaderboard-stats">Lv.${user.level} • ${user.reels} Reels • ${routeBadge}</div>
        </div>
        <div class="leaderboard-meters">${user.meters.toLocaleString('tr-TR')}m</div>
      `;
      
      container.appendChild(item);
    });
  }
  
  // SVG Progress Animation
  function updateSVGProgress(progressPercent) {
    const completedPath = document.getElementById('completed-path');
    const climberCircle = document.getElementById('climber-circle');
    
    // Animate completed path (stroke-dashoffset)
    const pathLength = 1000;
    const offset = pathLength - (pathLength * progressPercent / 100);
    completedPath.style.strokeDashoffset = offset;
    
    // Move climber circle along path
    const animateMotion = climberCircle.querySelector('animateMotion');
    if (animateMotion) {
      // Set keyPoints to move from 0 to progressPercent
      const keyPoint = progressPercent / 100;
      animateMotion.setAttribute('keyPoints', `${keyPoint};${keyPoint}`);
      animateMotion.beginElement();
    }
  }
  
  // Reset button functionality
  document.getElementById('reset-button').addEventListener('click', () => {
    if (confirm('Tüm ilerleme sıfırlanacak! Emin misin?')) {
      chrome.storage.local.clear(() => {
        alert('İlerleme sıfırlandı! Sayfayı yenile ve yeni bir tırmanışa başla! 🏔️');
        location.reload();
      });
    }
  });
  
  // Sound toggle
  document.getElementById('sound-toggle').addEventListener('change', (e) => {
    const soundEnabled = e.target.checked;
    chrome.storage.local.set({ soundEnabled }, () => {
      console.log('Ses ayarı güncellendi:', soundEnabled ? 'Açık' : 'Kapalı');
    });
  });
  
  // Username input with button and enter key support
  const usernameInput = document.getElementById('username-input');
  const saveUsernameBtn = document.getElementById('save-username-btn');
  
  // Input değiştiğinde butonu aktif et
  usernameInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    saveUsernameBtn.disabled = value.length === 0;
  });
  
  // Enter tuşu ile kaydet
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!saveUsernameBtn.disabled) {
        saveUsername();
      }
    }
  });
  
  // Buton ile kaydet
  saveUsernameBtn.addEventListener('click', saveUsername);
  
  function saveUsername() {
    const userName = usernameInput.value.trim();
    
    if (!userName) {
      alert('⚠️ Lütfen bir kullanıcı adı gir!');
      return;
    }
    
    // UserID'yi al veya oluştur
    chrome.storage.local.get(['userID', 'metersClimbed', 'currentLevel', 'reelsViewed', 'currentRoute'], (result) => {
      let userID = result.userID;
      
      // UserID yoksa oluştur
      if (!userID) {
        userID = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        console.log('🆔 Yeni userID oluşturuldu:', userID);
      }
      
      const metersClimbed = result.metersClimbed || 0;
      const currentLevel = result.currentLevel || 1;
      const reelsViewed = result.reelsViewed || 0;
      const currentRoute = result.currentRoute || null;
      
      // UserID ve userName'i kaydet
      chrome.storage.local.set({ userID, userName }, () => {
        console.log('✅ Kullanıcı adı kaydedildi:', userName, 'UserID:', userID);
        
        // Leaderboard'a ekle/güncelle
        chrome.storage.local.get(['leaderboardData'], (result) => {
          let leaderboard = result.leaderboardData || [];
          
          // Bu userID ile mevcut entry var mı?
          const userIndex = leaderboard.findIndex(u => u.userID === userID);
          
          const userData = {
            userID: userID,
            name: userName,
            meters: Math.floor(metersClimbed),
            level: currentLevel,
            reels: reelsViewed,
            route: currentRoute ? `${currentRoute.startCityName} → ${currentRoute.endCityName}` : 'Everest',
            timestamp: Date.now()
          };
          
          if (userIndex >= 0) {
            // Güncelle
            leaderboard[userIndex] = userData;
            console.log('🔄 Leaderboard güncellendi');
          } else {
            // Yeni ekle
            leaderboard.push(userData);
            console.log('➕ Leaderboard\'a eklendi');
          }
          
          // Sırala
          leaderboard.sort((a, b) => b.meters - a.meters);
          leaderboard = leaderboard.slice(0, 100);
          
          // Kaydet ve göster
          chrome.storage.local.set({ leaderboardData: leaderboard }, () => {
            // Online leaderboard'a da kaydet (sync)
            chrome.storage.sync.get(['onlineLeaderboard'], (syncResult) => {
              let onlineLeaderboard = syncResult.onlineLeaderboard || [];
              
              const onlineUserIndex = onlineLeaderboard.findIndex(u => u.userID === userID);
              
              if (onlineUserIndex >= 0) {
                onlineLeaderboard[onlineUserIndex] = userData;
              } else {
                onlineLeaderboard.push(userData);
              }
              
              onlineLeaderboard.sort((a, b) => b.meters - a.meters);
              onlineLeaderboard = onlineLeaderboard.slice(0, 100);
              
              chrome.storage.sync.set({ onlineLeaderboard: onlineLeaderboard }, () => {
                if (!chrome.runtime.lastError) {
                  console.log('☁️ Online leaderboard güncellendi!');
                }
              });
            });
            
            // Başarı mesajı
            const notification = document.createElement('div');
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: linear-gradient(135deg, #10B981 0%, #059669 100%);
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              font-weight: 600;
              z-index: 10000;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
              transition: all 0.3s ease;
            `;
            notification.textContent = `✅ ${userName} leaderboard'a eklendi!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
              notification.style.opacity = '0';
              notification.style.transform = 'translateX(-50%) translateY(-10px)';
              setTimeout(() => notification.remove(), 300);
            }, 2000);
            
            // Leaderboard'u yeniden göster
            displayLeaderboard(leaderboard, userID, Math.floor(metersClimbed));
            
            // Butonu kapat
            saveUsernameBtn.disabled = true;
          });
        });
      });
    });
  }
  
  // Country selection handlers
  const startCountrySelect = document.getElementById('start-country');
  const startCitySelect = document.getElementById('start-city');
  const endCountrySelect = document.getElementById('end-country');
  const endCitySelect = document.getElementById('end-city');
  const routeInfo = document.getElementById('route-info');
  const routeDistanceEl = document.getElementById('route-distance');
  const setRouteButton = document.getElementById('set-route-button');
  
  function updateCityOptions(countrySelect, citySelect) {
    const country = countrySelect.value;
    citySelect.innerHTML = '<option value="">Şehir seç...</option>';
    
    if (country && CITIES[country]) {
      citySelect.disabled = false;
      const cities = CITIES[country].cities;
      Object.keys(cities).forEach(cityKey => {
        const city = cities[cityKey];
        const option = document.createElement('option');
        option.value = cityKey;
        option.textContent = `${city.name}${city.capital ? ' (Başkent)' : ''}`;
        citySelect.appendChild(option);
      });
    } else {
      citySelect.disabled = true;
    }
  }
  
  function checkRouteSelection() {
    const startCountry = startCountrySelect.value;
    const startCity = startCitySelect.value;
    const endCountry = endCountrySelect.value;
    const endCity = endCitySelect.value;
    
    if (startCountry && startCity && endCountry && endCity) {
      if (startCountry === endCountry && startCity === endCity) {
        routeInfo.style.display = 'none';
        alert('Başlangıç ve varış noktası aynı olamaz!');
        return;
      }
      
      const distance = getDistance(startCountry, startCity, endCountry, endCity);
      routeDistanceEl.textContent = `${distance.toLocaleString('tr-TR')} km`;
      routeInfo.style.display = 'block';
      
      // Store temporary route
      routeInfo.dataset.startCountry = startCountry;
      routeInfo.dataset.startCity = startCity;
      routeInfo.dataset.endCountry = endCountry;
      routeInfo.dataset.endCity = endCity;
      routeInfo.dataset.distance = distance;
    } else {
      routeInfo.style.display = 'none';
    }
  }
  
  startCountrySelect.addEventListener('change', () => {
    updateCityOptions(startCountrySelect, startCitySelect);
    checkRouteSelection();
  });
  
  startCitySelect.addEventListener('change', checkRouteSelection);
  
  endCountrySelect.addEventListener('change', () => {
    updateCityOptions(endCountrySelect, endCitySelect);
    checkRouteSelection();
  });
  
  endCitySelect.addEventListener('change', checkRouteSelection);
  
  setRouteButton.addEventListener('click', () => {
    const startCountry = routeInfo.dataset.startCountry;
    const startCity = routeInfo.dataset.startCity;
    const endCountry = routeInfo.dataset.endCountry;
    const endCity = routeInfo.dataset.endCity;
    const distance = parseInt(routeInfo.dataset.distance);
    
    const startCityName = CITIES[startCountry].cities[startCity].name;
    const endCityName = CITIES[endCountry].cities[endCity].name;
    
    const route = {
      startCountry,
      startCity,
      startCityName,
      endCountry,
      endCity,
      endCityName,
      distance
    };
    
    chrome.storage.local.set({ currentRoute: route }, () => {
      alert(`🎯 Rota belirlendi: ${startCityName} → ${endCityName} (${distance.toLocaleString('tr-TR')} km)\n\nSayfayı yenile ve tırmanmaya devam et!`);
      location.reload();
    });
  });
  
  // Load and display current route
  chrome.storage.local.get(['currentRoute'], (result) => {
    const currentRoute = result.currentRoute;
    if (currentRoute) {
      const currentRouteEl = document.getElementById('current-route');
      const currentRoutePathEl = document.getElementById('current-route-path');
      const currentRouteDistanceEl = document.getElementById('current-route-distance');
      
      currentRoutePathEl.textContent = `${currentRoute.startCityName} → ${currentRoute.endCityName}`;
      currentRouteDistanceEl.textContent = `${currentRoute.distance.toLocaleString('tr-TR')} km`;
      currentRouteEl.style.display = 'block';
    }
  });
});
