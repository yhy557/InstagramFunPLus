# ✨ Features

### 1. 🎨 Achievement Tooltips
A beautiful tooltip now appears when you hover over achievement cards with your mouse!

**What it Shows:**
- 🏆 Achievement name and icon
- 📝 Detailed description
- 📍 Distance required to unlock
- ⭐ XP amount to be earned

**How to Use:**
1. Open the popup (extension icon)
2. Go to the "Achievements" section
3. Hover your mouse over any achievement
4. The tooltip will appear automatically!

**Visual:**
```
┌─────────────────────────────┐
│ ⛺ Base Camp Preparation │
│ 442m completed! │
│ Unlocks at 442m • +500 XP │
└─────────────────────────────┘
▼
[Achievement Card]
```

---

### 2. 🌍 Country/City Routes System

You can now travel **between different points of the world**, not just up Everest!

#### 📍 Available Countries and Cities

**🇹🇷 Turkey**
- Ankara (Capital)
- Istanbul

**🇳🇴 Norway**
- Oslo (Capital)
- Bergen

**🇨🇭 Switzerland**
- Bern (Capital)
- Zurich

**🇯🇵 Japan**
- Tokyo (Capital)
- Osaka

**🇺🇸 USA**
- Washington D.C. (Capital)
- New York

**🇩🇪 Germany**
- Berlin (Capital)
- Munich

#### 🛣️ How It Works

1. Open the **"Select Your Route"** section (in the Popup)
2. Select a **Starting Point**:
   - Select Country → Select City
3. Select a **Destination**:
   - Select Country → Select City
4. **Distance is calculated automatically** (real-world flight distance!)
5. Click the **"Set This Route as Target!"** button
6. **Refresh the page** and start reaching your new goal!

#### 📊 Example Distances

| Route | Distance |
|------|--------|
| Ankara → Tokyo | 8,674 km |
| Istanbul → New York | 8,050 km |
| Berlin → Washington | 6,545 km |
| Oslo → Tokyo | 8,770 km |
| Zurich → Osaka | 9,830 km |
| Bern → Bergen | 1,650 km |

#### 🎯 What Happens When You Set a Route?

1. **Achievements are automatically adjusted**
   - %5 = 434 km (for Ankara-Tokyo)
   - %25 = 2,169 km
   - %50 = 4,337 km (HALFWAY THERE!)
   - %100 = 8,674 km (ROUTE COMPLETED!)

2. **Progress bar updates based on the route**
   - "Everest Progress" → "Ankara → Tokyo Progress"

3. **The final achievement becomes special**
   - "EVEREST CONQUEROR!" → "ROUTE COMPLETED!"
   - Description: Starting City → Destination City

4. **Active Route is displayed**
   - An "Active Route" badge appears in the Popup
   - Route name and distance are displayed

#### 💡 Tips

- **Short routes**: For quick achievements (e.g., Bern → Munich: 390 km)
- **Long routes**: For an epic challenge (e.g., Ankara → Tokyo: 8,674 km)
- **Different combinations**: 6 countries x 2 cities = **36 different routes** to choose from!
- **Change route**: You can pick a new route anytime
- **Progress is preserved**: Your meters are not lost; the percentage is recalculated based on the new target

---

## 🎨 Design Details

### Tooltip Animation
- Smooth fade-in on hover
- Subtle upward sliding effect
- Golden border
- Arrow pointer
- Glassmorphism background

### Route Selector UI
- Dropdown menus (country and city)
- Animated airplane icon (✈️) between start and finish
- Distance calculation card (blue background)
- "Set This Route as Target!" button (gradient)
- Active route badge (golden border)

---

## 🚀 Technical Details

### Distance Calculation
```javascript
// Pre-defined distance matrix
const DISTANCES = {
  'turkey-ankara-japan-tokyo': 8674,
  'turkey-istanbul-newyork': 8050,
  // ... 90+ route distances
};

### Achievement Recalculation
// Route distance = 8674 km = 8,674,000 meters
targetDistance = currentRoute.distance * 1000;

// Percentage for each achievement is preserved
percentage = achievement.distance / 8848;
newDistance = targetDistance * percentage;

// Example: 5% achievement
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
'''

## 📖 Usage Scenarios

### Scenario 1: Short Challenge
'''
1. Select Bern → Zurich (310 km)
2. Goal: 310,000 meters
3. 5% achievement: 15,500 m = 15.5 km
4. Scroll and finish quickly!

'''

### Scenario 2: Medium Challenge
'''
1. Select Berlin → Ankara (2,100 km)
2. Goal: 2,100,000 meters
3. 25% achievement: 525 km
4. Can be completed in a few days

'''

### Scenario 3: Epic Challenge
'''
1. Select Ankara → Tokyo (8,674 km)
2. Goal: 8,674,000 meters
3. 50% achievement: 4,337 km
4. Requires weeks of scrolling!

'''

---

## 🎮 Routes in Leaderboard
Y
You can now show which route you are completing on the Leaderboard:
-Username
-Total meters (regardless of which route you are on)
-Level and Reels count


---

## ⚙️ Settings

### Resetting the Route
If you want to change your route:
1. Select a new route
2. Click "Set This Route as Target!"
3. The old route is replaced by the new active route
4. Your meter count remains the same

### Returning to Everest
If you don't want to use the route system:
- Simply don't select a route
- Or reinstall the extension
- Everest is active by default

---

**Happy travels! ✈️🗺️**
