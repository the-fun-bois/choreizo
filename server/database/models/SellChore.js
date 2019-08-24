const Sequelize = require('sequelize');
const db = require('./../db');

const SellChore = db.define('sellChore', {
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
        defaultValue: 'pending',
    }
})

module.exports = SellChore