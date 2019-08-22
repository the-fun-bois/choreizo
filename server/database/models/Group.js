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
  // add admin id throught associations
});

module.exports = Group;
