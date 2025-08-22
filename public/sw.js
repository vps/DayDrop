const CACHE_NAME = 'countdown-widget-v3';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Force refresh for iOS PWAs
const FORCE_REFRESH_INTERVAL = 3600000; // 1 hour

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients
  return self.clients.claim();
});

// Fetch event - Simplified for faster initial load
self.addEventListener('fetch', (event) => {
  // For navigation requests, always go to network first for fresh content
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // For other requests, use cache-first strategy for speed
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Background sync for iOS PWA updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_COUNTDOWN') {
    // Broadcast to all clients to update countdown
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'COUNTDOWN_UPDATE_REQUIRED',
          timestamp: Date.now()
        });
      });
    });
  }
});

// Periodic background sync (for supported browsers)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'countdown-update') {
    event.waitUntil(updateCountdown());
  }
});

function updateCountdown() {
  // Notify all clients to update their countdown
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'COUNTDOWN_UPDATE_REQUIRED',
        timestamp: Date.now()
      });
    });
  });
}
