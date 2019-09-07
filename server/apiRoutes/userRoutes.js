const router = require('express').Router();
const { User, Group } = require('../database');

router.get('/profile', (req, res, next) => {
  req.body.userId = 1;
  User.findByPk(1, { include: [Group] })
    .then(user => {
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

module.exports = router;
