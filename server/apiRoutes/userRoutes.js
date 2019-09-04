const router = require('express').Router();
// const { User } = require('../database');

router.get('/profile', (req, res) => {
  res.json(req.body.user);
});

module.exports = router;
