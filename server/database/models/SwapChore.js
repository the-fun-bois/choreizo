const Sequelize = require('sequelize');
const db = require('./../db');

const SwapChore = db.define('swapChore', {
    swapId: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    status: {
        type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
        defaultValue: 'pending',
    },
})