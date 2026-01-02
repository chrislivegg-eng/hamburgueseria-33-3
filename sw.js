const CACHE_NAME = 'menu-333-v1';
const ASSETS = [
  './',
  './index.html',
  './menu-combos.html',
  './menu-hamburguesas.html',
  './menu-hotdogs.html',
  './menu-alitas.html',
  './menu-adicionales.html',
  './style.css',
  './logo.png',
  './offline.html' // Tu página de auxilio
];

// Instalación: Guarda todo lo de arriba en la memoria del cel
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Estrategia: Intenta cargar por internet, si no hay, saca la copia de la memoria
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request).then(response => {
        // Si la página que busca no está en memoria, muestra la de error offline
        return response || caches.match('./offline.html');
      });
    })
  );
});