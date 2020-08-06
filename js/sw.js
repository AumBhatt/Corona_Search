console.log('sw.js');
var cache_name = "cov19Track"; // The string used to identify our cache

self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});




self.addEventListener('activate', function(ev){
    console.log('SW Activated!');
});

self.addEventListener('fetch', function(ev){
    console.log('Fetch ev');
    if (event.request.url === "https://aumbhatt.github.io/ProjectX") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});