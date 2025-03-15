const express = require('express');
const router = express.Router();

// Ana sayfa rotası: index.ejs dosyasını render et
router.get('/', (req, res) => {
  res.render('index');
});

// ToDo List rotası: todo.ejs dosyasını render et
router.get('/todo', (req, res) => {
  res.render('todo');
});

// Router'ı dışa aktar
module.exports = router;