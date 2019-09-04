const express = require('express');

const apiRoutes = express.Router();
// import api routes here

const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
const transferChoreRoutes = require('./transferChoreRoutes');
const adminRoutes = require('./adminRoutes');
const choresRoutes = require('./choresRoutes');
const authenticationRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

// set api routes here

apiRoutes.use('/auth', authenticationRoutes);
apiRoutes.use('*', require('../config/verify'));

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);
apiRoutes.use('/transfer_chore', transferChoreRoutes);
apiRoutes.use('/chores', choresRoutes);
apiRoutes.use('/admin', adminRoutes);

module.exports = apiRoutes;
