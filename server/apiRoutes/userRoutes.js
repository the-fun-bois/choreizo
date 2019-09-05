const router = require('express').Router();
const { User } = require('../database');

router.get('/profile', (req, res, next) => {
  User.findByPk(req.body.userId)
    .then(user => res.json(user))
    .catch(next);
});

module.exports = router;
