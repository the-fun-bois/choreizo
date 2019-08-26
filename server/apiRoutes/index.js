const express = require('express');
const apiRoutes = express.Router();
//import api routes here
const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
// set api routes here
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);

module.exports = apiRoutes;
