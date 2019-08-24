// tradeId	originalOwnerId	newOwnerId	assignedChoreId	tradeTerms	status
// 				ex: beer, movie tickets	"[accepted, declined, pending, ]
// "

const Sequelize = require('sequelize');
const db = require('../db');

const Trade = db.define('tradeChore', {
  tradeTerms: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
    defaultValue: 'pending',
  },
});

module.exports = Trade;
