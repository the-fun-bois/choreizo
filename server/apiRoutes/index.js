const passport = require('passport');
const express = require('express');

const apiRoutes = express.Router();
// import api routes here

const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
const transferChoreRoutes = require('./transferChoreRoutes');
const adminRoutes = require('./adminRoutes');
const choresRoutes = require('./choresRoutes');
const authenticationRoutes = require('./authRoutes');

// set api routes here

apiRoutes.use('/auth', authenticationRoutes);
apiRoutes.use('*', (req, res, next) => {
  if (process.env.TEST_SESSION === 'true') next();
  else {
    passport.authenticate('jwt', {session: false})(req, res, next);
  };
});
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);
apiRoutes.use('/transfer_chore', transferChoreRoutes);
apiRoutes.use('/chores', choresRoutes);
apiRoutes.use('/admin', adminRoutes);

module.exports = apiRoutes;
