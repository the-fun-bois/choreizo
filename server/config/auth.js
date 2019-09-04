const env = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  env.config();
};

module.exports = {
  googleAuth: {
    'clientID': process.env.GOOGLE_CLIENT_ID,
    'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
    'callbackURL': process.env.GOOGLE_CALLBACK_URL,
  },
  session: {
    key: 'capstone1',
  },
};
