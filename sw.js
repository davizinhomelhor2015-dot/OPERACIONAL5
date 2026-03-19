const CACHE='crop-v5';
const ASSETS=['/OPERACIONAL9/','/OPERACIONAL9/index.html','/OPERACIONAL9/manifest.json','/OPERACIONAL9/icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.hostname.includes('firebase')||url.hostname.includes('googleapis')||url.hostname.includes('gstatic'))return;
  e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match(e.request).then(r=>r||new Response('Offline',{status:503}))));
});
self.addEventListener('push',e=>{
  const d=e.data?e.data.json():{title:'CROP',body:'Nova mensagem'};
  e.waitUntil(self.registration.showNotification(d.title||'CROP',{body:d.body||'',icon:'/OPERACIONAL9/icon.png',badge:'/OPERACIONAL9/icon.png',vibrate:[200,100,200]}));
});
