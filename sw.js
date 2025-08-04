// Service Worker for Intelligent Caching
const CACHE_NAME = 'l3onkers-site-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Resources to cache on install
const STATIC_ASSETS = [
    '/',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/images/profile/profile.jpg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external requests (except fonts and CDN)
    if (url.origin !== location.origin && 
        !url.hostname.includes('fonts.googleapis.com') &&
        !url.hostname.includes('cdnjs.cloudflare.com')) {
        return;
    }
    
    event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Strategy for different types of resources
    if (isStaticAsset(request)) {
        return cacheFirst(request, STATIC_CACHE);
    } else if (isAPIRequest(request)) {
        return networkFirst(request, DYNAMIC_CACHE);
    } else if (isHTMLRequest(request)) {
        return staleWhileRevalidate(request, DYNAMIC_CACHE);
    } else {
        return cacheFirst(request, DYNAMIC_CACHE);
    }
}

// Cache first strategy (for static assets)
async function cacheFirst(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);
        return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network first strategy (for API requests)
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Network error and no cached version available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Stale while revalidate strategy (for HTML pages)
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);
    
    return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(request) {
    const url = new URL(request.url);
    return url.pathname.includes('/assets/') ||
           url.hostname.includes('fonts.googleapis.com') ||
           url.hostname.includes('cdnjs.cloudflare.com');
}

function isAPIRequest(request) {
    const url = new URL(request.url);
    return url.pathname.includes('/api/') || url.pathname.includes('.json');
}

function isHTMLRequest(request) {
    const acceptHeader = request.headers.get('Accept');
    return acceptHeader && acceptHeader.includes('text/html');
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implement background sync logic here
    console.log('Background sync triggered');
}

// Push notifications (for future use)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New content available!',
        icon: '/assets/images/profile/profile.jpg',
        badge: '/assets/images/profile/profile.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View updates',
                icon: '/assets/images/profile/profile.jpg'
            },
            {
                action: 'close',
                title: 'Close notification',
                icon: '/assets/images/profile/profile.jpg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('L3onkers Site Update', options)
    );
});
