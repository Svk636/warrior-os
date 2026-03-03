# ⚔️ Warrior OS — Combat Dominance Protocol

> Your personal discipline OS for daily time blocks, habits, metrics, and 15-year vision.

## 🚀 GitHub Pages Deployment

### Quick Setup

1. **Fork or push** this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch: `main` / root (`/`)**
4. Your app will be live at `https://yourusername.github.io/repo-name/`

### Repository Structure

```
/
├── index.html       ← Main app (single-file PWA)
├── manifest.json    ← PWA manifest
├── sw.js            ← Service worker (offline support)
├── icons/           ← App icons (all sizes)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── _config.yml      ← GitHub Pages config
├── .nojekyll        ← Disables Jekyll processing
└── README.md
```

## 📱 Installing as PWA

### Android / Chrome
When you visit the site, a banner will appear at the bottom of the screen — tap **INSTALL** to add it to your home screen.

### iOS / Safari
1. Open the site in **Safari**
2. Tap the **Share** button ⬆
3. Tap **"Add to Home Screen"**
4. Tap **"Add"**

An instruction modal will appear automatically on first visit from iOS Safari.

## ✨ Features

- **Today View** — Current time block, habits progress, focus mode
- **Schedule** — Full weekly schedule with time blocks
- **Habits** — Daily habit tracking with weekly grid
- **Metrics** — Body metrics, lifts, performance tracking
- **Vision** — 15-year cycle blueprint with tasks & milestones
- **Focus Mode** — Block-by-block execution queue
- **Offline** — Full offline support via service worker

## 🔧 Notes

- All data is stored locally in `localStorage` — no server needed
- Works 100% offline after first load
- Built as a single `index.html` file for simplicity
