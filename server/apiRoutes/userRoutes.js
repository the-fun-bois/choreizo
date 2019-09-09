const router = require('express').Router();
const { User } = require('../database');

router.get('/profile', (req, res, next) => {
  User.findByPk(req.body.userId)
    .then(user => res.status(200).send(user))
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
