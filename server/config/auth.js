const env = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  env.config();
};

module.exports = {

  googleAuth: {
    'clientID': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET,
    'callbackURL': process.env.CALLBACK_URL,
  },
  session: {
    key: 'capstone1',
  },
};
