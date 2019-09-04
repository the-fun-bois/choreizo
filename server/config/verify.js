const jwt = require('jsonwebtoken');
const auth = require('./auth');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ');
    const decoded = jwt.verify(token[1], auth.secret);
    req.body.user = decoded;
  } catch (err) {
    res.sendStatus(401);
  }
  next();
};
