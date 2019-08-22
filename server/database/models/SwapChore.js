const Sequelize = require('sequelize')
const db = require('../db')

const SwapChore = db.define('swapChore', {
    swapId: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    user1: {
        type: Sequelize.INTEGER,
        alloiwNull: false,
    },
    assignedChoreId1: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user2: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    assignedChoreId2: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM(['accepted', 'pending', 'declined']),
        defaultValue: 'pending,'
    },
})