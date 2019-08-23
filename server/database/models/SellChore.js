const Sequelize = require('sequelize')
const db = require('../db')

const SellChore = db.define('sellChore', {
    originalOwnerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    newOwnerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    assignedChoreId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
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