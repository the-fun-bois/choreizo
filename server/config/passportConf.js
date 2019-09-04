const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const auth = require('./auth');
const { User } = require('../database/index');

passport.use(
  new GoogleStrategy({
    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: auth.googleAuth.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    User.findOne({where: {
      email,
    }})
      .then((user) => { // eslint-disable-line
        if (user) {
          done(null, user);
        } else {
          return User.create({
            email
          })
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
  })
);
