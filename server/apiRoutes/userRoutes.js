const router = require('express').Router();

router.get('/profile', (req, res) => {
  res.json(req.body.user);
});

module.exports = router;
