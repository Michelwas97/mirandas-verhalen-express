// Define the cache name for the service worker
const cacheName = 'mirandas-verhalen-cache-v1';

// List of urls to cache
const urlsToCache = [
  '/offline',
  '/styles/style.css',
  '/scripts/synthesizer.js',
  '/images/blob-left.svg',
  '/images/circle-text-final.svg',
];

// Install event listener for the service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: installed');

  // Cache the assets during the installation process
  event.waitUntil((async () => {
    try {
      // Open the cache with the specified cache name
      const cache = await caches.open(cacheName);
      
      // Add the assets to the cache
      const cacheResult = await cache.addAll(urlsToCache);
      console.log('Cached URLs:', urlsToCache);
      return cacheResult;
    } catch (error) {
      console.error('Cache Add All error:', error);
    }
  })());
});

// Activate event listener for the service worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
  
    // Clean up old caches during the activation process
    event.waitUntil((async () => {
      // Get the list of cache names
      const cacheNames = await caches.keys();
      return Promise.all(
        // Delete caches that are not the current cache
        cacheNames.filter((thisCacheName) => thisCacheName !== cacheName)
          .map((cacheName) => {
            console.log('Service Worker: Deleting Cache ', cacheName);
            return caches.delete(cacheName);
          })
      );
    })());
  });
  
  // Fetch event listener for the service worker
  self.addEventListener('fetch', (event) => {
    // Respond to fetch events with a cached response or a network request
    event.respondWith((async () => {
      try {
        // Try to find a cached response for the request
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
  
        // If not in cache, perform a network request
        const networkResponse = await fetch(event.request);
  
        // If we received a valid response, cache it and return it
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          const cache = await caches.open(cacheName);
          cache.put(event.request, responseToCache);
          return networkResponse;
        }
  
        // If response is not valid, return it without caching
        return networkResponse;
      } catch (error) {
        // If a network error occurs, serve the offline page for all requests
        return caches.match('/offline');
      }
    })());
  });