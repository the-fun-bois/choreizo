const { AssignedChore } = require('../../database/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateChoreStatus = () => {
  let now = new Date();
  console.log(now);
  return AssignedChore.update(
    { status: 'incomplete' },
    { where: { status: 'pending', expiresOn: { [Op.lt]: now } } }
  ).catch(e => console.error(e));
};

module.exports = { updateChoreStatus };
