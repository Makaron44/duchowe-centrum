
const CACHE_NAME = "duchowe-centrum-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "modlitwy.html",
  "cytaty.html",
  "style.css",
  "app.js",
  "modlitwy.js",
  "cytaty.js",
  "tryb_nocny.css",
  "tryb_nocny.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
