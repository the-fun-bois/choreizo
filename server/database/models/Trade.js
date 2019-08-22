// tradeId	originalOwnerId	newOwnerId	assignedChoreId	tradeTerms	status
// 				ex: beer, movie tickets	"[accepted, declined, pending, ]
// "

const Sequelize = require('sequelize');
const db = require('./../db');

const Trade = db.define('trade', {
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
  // add originalOwner, newOwner, assignedChore through associations
});

module.exports = Trade;
