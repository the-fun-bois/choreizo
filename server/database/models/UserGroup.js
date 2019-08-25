const Sequelize = require('sequelize');
const db = require('./../db');

const UserGroup = db.define('userGroup', {
  userIsAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userStatus: {
    type: Sequelize.ENUM(['active', 'inactive', 'pending']),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = UserGroup;
