const Sequelize = require('./node_modules/sequelize');
const db = require('../db');

const EthereumWallet = db.define('ethereumWallet', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }
})

module.exports = EthereumWallet

