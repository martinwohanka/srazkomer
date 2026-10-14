/* Srážkoměr – service worker
   Při každé změně souborů appky zvyš název cache. */
const CACHE = 'srazkomer-v2.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg?v=1.0',
  './icon-180.png?v=1.0',
  './icon-192.png?v=1.0',
  './icon-512.png?v=1.0',
  './icon-maskable-192.png?v=1.0',
  './icon-maskable-512.png?v=1.0'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(ASSETS.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // API, mapa, fonty a vše ostatní z cizích domén jde rovnou na síť
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    try {
      // vždy ověřit na serveru
      const res = await fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' });
      if (res && res.ok) {
        const c = await caches.open(CACHE);
        c.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const idx = await caches.match('./index.html');
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
