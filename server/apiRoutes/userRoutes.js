const router = require('express').Router();
const { User, Group, EthereumWallet } = require('../database');

router.get('/profile', (req, res, next) => {
  User.findByPk(req.body.userId, { include: [Group] })
    .then(user => {
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

router.post('/profile', (req, res, next) => {
  const { userId } = req.body;
  User.findByPk(userId, { include: [Group, EthereumWallet] })
    .then(user => {
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

module.exports = router;
