const jsonServer = require('json-server'); // json-server kütüphanesini dahil et
const server = jsonServer.create(); // Yeni bir json-server oluştur
const router = jsonServer.router('db.json'); // db.json dosyasını veri kaynağı olarak kullan
const middlewares = jsonServer.defaults(); // Varsayılan middleware'leri al (CORS, statik dosya desteği vb.)

server.use(middlewares); // Middleware'leri kullan

// Özel CORS ayarlarını tanımla
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1111'); // İzin verilen origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // İzin verilen HTTP metodları
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // İzin verilen başlıklar
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // OPTIONS isteklerini işle ve 200 döndür
  }
  next(); // Sonraki middleware'e geç
});

server.use(router); // Router'ı kullan
// Server'ı 3000 portunda başlat
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});