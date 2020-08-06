console.log('sw.js');
var cache_name = "cov19Track"; // The string used to identify our cache

const ASSETS = [
    "index.html",
    "js/covid.js",
    "js/install.js",
    "js/sw.js",
    "css/style.css",
    "images/newCovidIcon192.png",
    "images/newCovidIcon512.png",
    "images/icons/pandemic.svg",
    "images/icons/recovery.svg",
    "images/icons/newCovidIcon.svg",
    "images/icons/hospital.svg",
    "images/icons/coronavirus.svg",
    "images/icons/rip.svg",
    "images/icons/virus.svg"
];


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