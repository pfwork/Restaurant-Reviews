self.addEventListener('install', function(event) {
  // Perform install steps
  // var CACHE_NAME = 'my-site-cache-v1';
  var urlsToCache = [
    '/',
    '/css/styles.css',
    '/css/responsive.css',
    '/img/*',
    '/js/dbhelper.js',
    '/js/main.js',
    'restaurant_info.js'
  ];

  // Perform install steps
  event.waitUntil(
    caches.open('restaurant-static-v1')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
