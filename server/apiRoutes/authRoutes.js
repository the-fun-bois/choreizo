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
  const token = jwt.sign(req.user.dataValues, auth.secret);
  res.redirect(`${req.query.state}?${token}`);
});
