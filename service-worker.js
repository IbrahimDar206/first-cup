const CACHE_NAME = "first-cup-v5";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

// Install Service Worker

self.addEventListener("install", function(event) {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME).then(function(cache) {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});

// Activate Service Worker

self.addEventListener("activate", function(event) {

    self.clients.claim();

    event.waitUntil(

        caches.keys().then(function(cacheNames) {

            return Promise.all(

                cacheNames.map(function(cacheName) {

                    if (cacheName !== CACHE_NAME) {

                        return caches.delete(cacheName);

                    }

                })

            );

        })

    );

});

// Fetch Fresh Files First, Cache as Backup

self.addEventListener("fetch", function(event) {

    if (event.request.method !== "GET") {
        return;
    }

    const requestURL = new URL(event.request.url);

    if (requestURL.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        fetch(event.request)

            .then(function(response) {

                if (response.ok) {

                    const responseCopy = response.clone();

                    caches.open(CACHE_NAME).then(function(cache) {

                        cache.put(event.request, responseCopy);

                    });

                }

                return response;

            })

            .catch(function() {

                return caches.match(event.request);

            })

    );

});