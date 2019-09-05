const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

module.exports = router;

router.get('/google', (req, res) => {
  const appUrl = `${req.query.protocol}://${req.query.domain}`;
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    state: appUrl,
  })(req, res);
})

router.get('/google/redirect', passport.authenticate('google', {
  session: false,
}), (req, res) => {
  const userData = {
    id: req.user.dataValues.id,
    email: req.user.dataValues.email,
  }
  const token = jwt.sign(userData, auth.secret);
  res.redirect(`${req.query.state}?${token}`);
});
