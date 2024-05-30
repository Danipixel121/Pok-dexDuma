self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('pokedex-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/pokedex.css', // Cambia a la ruta correcta de tus archivos CSS
          '/js/pokedex.js', // Cambia a la ruta correcta de tus archivos Js
          '/img/Masterball.png',
          '/img/Pokémon.png',
          '/img/logo.png',
          // Añade cualquier otro archivo que desees cachear
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  