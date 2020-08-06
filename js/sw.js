console.log('sw.js');
self.addEventListener('install', function(ev){
    console.log('SW Installed!!');
});

self.addEventListener('activate', function(ev){
    console.log('SW Activated!');
});

self.addEventListener('fetch', function(ev){
    console.log('Fetch ev');
});