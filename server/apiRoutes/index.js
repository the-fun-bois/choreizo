const express = require('express');

const apiRoutes = express.Router();
// import api routes here

const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
const transferChoreRoutes = require('./transferChoreRoutes');
const adminRoutes = require('./adminRoutes');
const choresAPIRoutes = require('./choresRoutes');

// set api routes here

apiRoutes.use('*', (req, res, next) => {
  if (req.isAuthenticated() || process.env.TEST_SESSION === 'true') next();
  else res.sendStatus(400);
});
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);
apiRoutes.use('/transfer_chore', transferChoreRoutes);
apiRoutes.use('/chores', choresAPIRoutes);
apiRoutes.use('/admin', adminRoutes);

module.exports = apiRoutes;
