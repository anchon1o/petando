const C='petando-v2',CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{caches.open(C).then(c=>c.put('./index.html',x.clone()));return x}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok&&(u.origin===location.origin||u.hostname.includes('gstatic')||u.hostname.includes('googleapis')))caches.open(C).then(c=>c.put(r,x.clone()));return x})))});
