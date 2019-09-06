const env = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  env.config();
}

module.exports = {
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID || 'Test Session',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Test Session',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/redirect',
  },
  facebookAuth: {
    clientID: process.env.FB_CLIENT_ID || 'Test Session',
    clientSecret: process.env.FB_CLIENT_SECRET || 'Test Session',
    callbackURL: process.env.FB_CALLBACK_URL || '/api/auth/facebook/redirect',
  },
  secret: process.env.SECRET_KEY || 'capstone1',
};
