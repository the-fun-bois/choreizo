const express = require('express');
const apiRoutes = express.Router();
//import api routes here
const tradeChoreRoutes = require('./tradeChoreRoutes');
// set api routes here
apiRoutes.use('/trade_chore', tradeChoreRoutes);

module.exports = apiRoutes;
