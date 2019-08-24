const Sequelize = require('sequelize');
const db = require('./../db');

const AssignedChore = db.define('assignedChore', {
  status: {
    type: Sequelize.ENUM(['completed', 'incomplete', 'pending', 'voting']),
    defaultValue: 'pending',
  },
  expiresOn: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = AssignedChore;
