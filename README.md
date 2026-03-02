# ⚔ WARRIOR OS

**Combat Dominance Protocol — 15-Year Vision Tracker**

A progressive web app (PWA) built as a single HTML file — no dependencies, no build step, installs directly to your home screen.

## 🚀 Deploy to GitHub Pages

### One-time setup
1. **Fork or push this repo to GitHub**
2. Go to **Settings → Pages**
3. Under *Source*, select **GitHub Actions**
4. Push to `main` — it deploys automatically

Your app will be live at:
```
https://<your-username>.github.io/<repo-name>/
```

### Manual deploy
Just push any change to `main`. The GitHub Action handles the rest.

---

## 📱 Install as PWA

Once deployed, open the URL in:
- **iOS Safari** → Share → *Add to Home Screen*
- **Android Chrome** → Menu → *Add to Home Screen* / *Install App*
- **Desktop Chrome/Edge** → Address bar install icon

The app works fully **offline** after first load.

---

## Features

- ⚡ **Today** — Current time block focus mode with sequential habits/tasks queue
- 📋 **Schedule** — 7-day time block system with add/edit/delete tasks per block
- ◼ **Habits** — Weekly habit grid with daily reset
- 🌟 **Vision** — 60-cycle (15-year) blueprint tracker with Pomodoro timer
- 🎬 **Actor** — Performance metrics dashboard
- 📈 **Metrics** — Training & conditioning tracker
- 📝 **Review** — Weekly reflection system

All data stored in `localStorage` — private, offline, no server needed.

---

## File structure

```
warrior-os/
├── index.html          ← entire app (single file)
├── manifest.json       ← PWA manifest
├── sw.js               ← service worker (offline support)
├── icons/              ← PWA icons (72–512px)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml  ← auto-deploy on push to main
```
