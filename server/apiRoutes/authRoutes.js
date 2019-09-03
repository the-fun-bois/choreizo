const router = require('express').Router();
const passport = require('passport');

module.exports = router;

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect(`ChoresApp://login?user=${JSON.stringify(req.user)}`);
});

router.get('/user', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user.dataValues);
  } else {
    res.json({user: null});
  }
});
