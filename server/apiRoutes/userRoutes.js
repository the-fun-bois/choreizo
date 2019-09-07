const router = require('express').Router();
const { User, Group } = require('../database');

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
  console.log('req body', req.body);
  const { userId } = req.body;
  // console.log('reqbody', req.body);
  User.findByPk(userId, { include: [Group] })
    .then(user => {
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

module.exports = router;
