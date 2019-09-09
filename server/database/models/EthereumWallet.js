const Sequelize = require('sequelize');
const db = require('./../db');

const EthereumWallet = db.define('ethereumWallet', {
  balance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = EthereumWallet;
