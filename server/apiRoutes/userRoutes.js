const router = require('express').Router();
const { User, Group, EthereumWallet } = require('../database');
const Op = require('sequelize').Op;

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

router.post('/group_members', (req, res, next) => {
  const { userId, groupId } = req.body;
  User.findAll({
    where: { id: { [Op.ne]: userId } },
    include: [{ model: Group, where: { id: groupId }, attributes: ['id'] }],
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(next);
});

router.post('/wallet', (req, res, next) => {
  const { userId } = req.body;
  EthereumWallet.findOne({ where: { userId } })
    .then(userWallet => {
      if (!userWallet) {
        return res.status(400).send({ error: 'no wallet found' });
      }
      res.status(200).send(userWallet);
    })
    .catch(next);
});

router.put('/update', (req, res, next) => {
  const firstName = req.body.firstName;
  const surName = req.body.surName;
  User.findByPk(req.body.userId)
    .then(user => {
      return user.update({
        firstName,
        surName,
      })
    })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(next);
});

module.exports = router;
