const Sequelize = require('sequelize');
const db = require('./../db');

const EthereumWallet = db.define('ethereumWallet', {
  balance: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false,
  },
});

module.exports = EthereumWallet;
