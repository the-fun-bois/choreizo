const jwt = require('jsonwebtoken');
const auth = require('./auth');

module.exports = (req, res, next) => {
  if (process.env.TEST_SESSION === 'true') next();
  else {
    try {
      /* 
      Use the app secret to verify the auth header.
      */
      const token = req.headers.authorization.split(' ');
      const decoded = jwt.verify(token[1], auth.secret);
      req.body.userId = decoded.id;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};
