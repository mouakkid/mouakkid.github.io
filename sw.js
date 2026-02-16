self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('shop-from-london-store').then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './logo.png'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});