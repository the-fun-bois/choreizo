const Sequelize = require('sequelize');
const db = require('./../db');

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Group;
