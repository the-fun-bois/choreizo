const Sequelize = require('./node_modules/sequelize');
const db = require('../db');

const AssignedChore = db.define('assignedChores', {
    assignedChoreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    completed:{
        type: Sequelize.ENUM(['accepted', 'declined', 'pending']),
        defaultValue: 'pending',
    },
    assignedOn: {
        type: Sequelize.DATE,
        allowNull: false,
    }
})

module.exports = AssignedChore