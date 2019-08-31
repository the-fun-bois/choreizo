const Sequelize = require('sequelize');
const db = require('./../db');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  surName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;
