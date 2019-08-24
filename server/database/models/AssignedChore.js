const Sequelize = require('sequelize');
const db = require('./../db');

const AssignedChore = db.define('assignedChore', {
  status: {
    type: Sequelize.ENUM(['completed', 'rejected', 'pending']),
    defaultValue: 'pending',
  },
  expiresOn: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = AssignedChore;
