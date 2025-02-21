self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("pwa-cache").then(function(cache) {
            return cache.addAll([
                "Charge.html",
                "manifest.json",
                "icon-192.png",
                "icon-512.png"
            ]);
        })
    );
    console.log("✅ Service Worker 安裝完成");
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
