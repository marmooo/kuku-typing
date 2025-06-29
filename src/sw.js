const CACHE_NAME = "2025-06-29 00:00";
const urlsToCache = [
  "/kuku-typing/",
  "/kuku-typing/index.js",
  "/kuku-typing/mp3/bgm.mp3",
  "/kuku-typing/mp3/cat.mp3",
  "/kuku-typing/mp3/correct.mp3",
  "/kuku-typing/mp3/end.mp3",
  "/kuku-typing/mp3/keyboard.mp3",
  "/kuku-typing/favicon/favicon.svg",
  "https://marmooo.github.io/fonts/textar-light.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
