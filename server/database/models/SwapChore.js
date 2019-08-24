const Sequelize = require('sequelize');
const db = require('./../db');

const SwapChore = db.define('swapChore', {
  status: {
    type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
    defaultValue: 'pending',
  },
});

module.exports = SwapChore;
