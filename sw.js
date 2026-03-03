// ── WARRIOR OS SERVICE WORKER ──────────────────────────────────
// Cache-first strategy with network fallback for offline support

const CACHE_NAME = 'warrior-os-v1';
const STATIC_CACHE = 'warrior-os-static-v1';
const DYNAMIC_CACHE = 'warrior-os-dynamic-v1';

// Core files to cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// External resources to cache
const EXTERNAL_CACHE = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap'
];

// ── INSTALL ──────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[WarriorOS SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // Cache local files (these must succeed)
      return cache.addAll(PRECACHE_URLS)
        .then(() => {
          // Try to cache external resources (best effort — don't fail install)
          return Promise.allSettled(
            EXTERNAL_CACHE.map(url => cache.add(url).catch(() => {}))
          );
        });
    }).then(() => {
      console.log('[WarriorOS SW] Installed');
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[WarriorOS SW] Activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[WarriorOS SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      console.log('[WarriorOS SW] Activated');
      return self.clients.claim();
    })
  );
});

// ── FETCH ─────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and Chrome extension requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // For HTML navigations: network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html') || caches.match(request))
    );
    return;
  }

  // For Google Fonts / CDN: cache first, network fallback
  if (url.hostname.includes('fonts.') || url.hostname.includes('cdnjs.')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => new Response('/* offline */', { headers: { 'Content-Type': 'text/css' } }));
      })
    );
    return;
  }

  // Default: cache first, network fallback, cache update
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => null);

      return cached || networkFetch;
    })
  );
});

// ── BACKGROUND SYNC / MESSAGES ────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});
