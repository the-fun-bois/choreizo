const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');
const { User } = require('../database/index');

module.exports = router;

router.get('/google', (req, res) => {
  /*
  Grab appUrl from query string and place it in state. 
  */
  const appUrl = `${req.query.protocol}://${req.query.domain}`;
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    state: appUrl,
  })(req, res);
});

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    session: false,
  }),
  (req, res) => {
    const userData = {
      id: req.user.dataValues.id,
      email: req.user.dataValues.email,
    };
  /*
  Create a token and sign it with the app secret 
  */
    const token = jwt.sign(userData, auth.secret);
    res.redirect(`${req.query.state}?${token}`);
  }
);

// facebook routes
router.get('/facebook', (req, res) => {
  /*
  Grab appUrl from query string and place it in state. 
  */
  const appUrl = `${req.query.protocol}://${req.query.domain}`;
  passport.authenticate('facebook', {
    session: false,
    state: appUrl,
    scope: ['email'],
  })(req, res);
});

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    session: false,
  }),
  (req, res) => {
    const userData = {
      id: req.user.dataValues.id,
      email: req.user.dataValues.email,
    };
    /*
  Create a token and sign it with the app secret 
  */
    const token = jwt.sign(userData, auth.secret);
    res.redirect(`${req.query.state}?${token}`);
  }
);

// for front end fbauth method
router.post('/facebook/token', (req, res) => {
  // check body for id and email
  const { email } = req.body;

  // add to db if doesn't exist, otherwise return user?
  User.findOne({
    where: {
      email,
    },
  })
    .then(user => {
      // eslint-disable-line
      if (!user) {
        return User.create({ email });
      }
      return user;
    })
    .then(user => {
      const userDecode = {
        id: user.id,
        email,
      };
      // jwt send ... req.body contains user data id and email
      const token = jwt.sign(userDecode, auth.secret);
      res.send(`${user.id}-${token}`);
    })
    .catch(e => console.error('Couldnt create user', e));
});
