var CACHE_NAME = 'restaurant-app-cache-v1';
var urlsToCache = [
  '/',
  '/css/responsive.css',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  '/restaurant.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response){
                return response
            }
            // not in cache, return from network
            return fetch(event.request, {credentials: 'include'});
        })
    );
})

self.addEventListener('activate', function(event) {

  var cacheWhitelist = 'restaurant-app-cache-v1';

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
