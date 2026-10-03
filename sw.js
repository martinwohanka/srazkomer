const CACHE = 'srazkomer-v4';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg?v=1.39', './icon-192.png?v=1.39', './icon-180.png?v=1.39', './icon-512.png?v=1.39', './icon-maskable-192.png?v=1.39', './icon-maskable-512.png?v=1.39'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// jen soubory appky (stejný origin) jdou přes cache; API předpovědi a mapa jdou vždy na síť.
// Načtení stránky (a index.html) se vždy ověří na serveru (cache:'no-cache' → ETag/304), aby prohlížeč
// nepodstrčil kopii z HTTP cache — hosting ji povoluje držet až hodinu po nasazení.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  const isPage = e.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  const req = isPage && e.request.method === 'GET' ? fetch(url.href, {cache: 'no-cache', credentials: 'same-origin'}) : fetch(e.request);

  e.respondWith(
    req.then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
