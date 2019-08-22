const Sequelize = require('sequelize');
const db = require('./../db');

const EthereumWallet = db.create('EthereumWallet', {
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

