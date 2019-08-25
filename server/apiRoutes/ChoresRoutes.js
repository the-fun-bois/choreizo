const router = require('express').Router();

const result = router.post('/allchores', (req, res, next) => {
  res.send('working');
});

module.exports = result;
