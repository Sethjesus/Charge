const CACHE_NAME = "electricity-carbon-calculator-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "service-worker.js",
    "icon-192.png",
    "icon-512.png"
];

// 安裝 Service Worker 並快取靜態資源
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 攔截請求並提供快取內容（離線支援）
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 清理舊版快取
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cache) => cache !== CACHE_NAME)
                          .map((cache) => caches.delete(cache))
            );
        })
    );
});
