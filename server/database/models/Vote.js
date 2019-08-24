const Sequelize = require('sequelize');
const db = require('./../db');

const Vote = db.define('vote', {
  choreIsComplete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Vote;
