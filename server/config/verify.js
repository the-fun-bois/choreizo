const jwt = require('jsonwebtoken');
const auth = require('./auth');

module.exports = (req, res, next) => {
  if (process.env.TEST_SESSION === 'true') next();
  else {
    try {
      const token = req.headers.authorization.split(' ');
      console.log('token: ', token);
      console.log(auth.secret);
      const decoded = jwt.verify(token[1], auth.secret);
      console.log('decoded ', decoded);
      req.body.user = decoded;
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    };
    next();
  };
};
