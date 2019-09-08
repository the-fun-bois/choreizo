const router = require('express').Router();
const { User, UserGroup, Group, EthereumWallet } = require('../database');

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
  console.log('user id', userId);
  User.findByPk(userId, { include: [Group, EthereumWallet] })
    .then(user => {
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

router.post('/group_members', (req, res, next) => {
  const { groupId } = req.body;
  User.findAll({
    include: [{ model: Group, where: { id: groupId }, attributes: ['id'] }],
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(next);
});

module.exports = router;
