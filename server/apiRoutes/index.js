const express = require('express');
const apiRoutes = express.Router();
//import api routes here
<<<<<<< HEAD

const choresAPIRoutes = require('./chores');

=======
const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
const transferChoreRoutes = require('./transferChoreRoutes');
>>>>>>> 2c69341bf83198c0ea26000deac9268dc54e1140
// set api routes here
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);
apiRoutes.use('/transfer_chore', transferChoreRoutes);

apiRoutes.use('/chores', choresAPIRoutes);

module.exports = apiRoutes;
