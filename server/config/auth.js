const env = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  env.config();
};

module.exports = {
  googleAuth: {
    'clientID': process.env.GOOGLE_CLIENT_ID  || "Test Session",
    'clientSecret': process.env.GOOGLE_CLIENT_SECRET  || "Test Session",
    'callbackURL': process.env.GOOGLE_CALLBACK_URL  || "/auth/google/redirect",
  },
  secret: process.env.SECRET_KEY || 'capstone1',
};
