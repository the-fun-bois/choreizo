const Sequelize = require('sequelize');
const db = require('../db');

const TransferChore = db.define('transferChore', {
  price: {
    type: Sequelize.DECIMAL(10, 5),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
    defaultValue: 'pending',
  },
});

module.exports = TransferChore;
