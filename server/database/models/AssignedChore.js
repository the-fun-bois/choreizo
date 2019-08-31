const Sequelize = require('sequelize');
const moment = require('moment');
const db = require('./../db');
const Chore = require('./Chore');

const AssignedChore = db.define('assignedChore', {
  status: {
    type: Sequelize.ENUM(['completed', 'incomplete', 'pending', 'voting']),
    defaultValue: 'pending',
  },
  expiresOn: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

AssignedChore.beforeValidate(assignedChoreInstance => {
  // creates expiresOn date automatically when assigned chore is created
  // skips this if updating expiresOn
  if (!assignedChoreInstance.choreId) {
    return;
  }
  if (!assignedChoreInstance.expiresOn) {
    const { choreId } = assignedChoreInstance;
    return Chore.findByPk(choreId)
      .then(chore => {
        const { timeLimit } = chore;
        const expiresOn = moment()
          .add(timeLimit, 'day')
          .format('L');
        assignedChoreInstance.expiresOn = expiresOn;
      })
      .catch(e => {
        console.log(e);
        throw new Error('Error creating expiresOn date');
      });
  }
});
module.exports = AssignedChore;
