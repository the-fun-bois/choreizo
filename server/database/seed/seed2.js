const {
  db,
  User,
  UserGroup,
  Group,
  Chore,
  AssignedChore,
  TradeChore,
  TransferChore,
  SwapChore,
} = require('./../index');
const moment = require('moment');

const choresData = require('./data/choresSeed');
const groupData = require('./data/groupsSeed');
const usersData = require('./data/usersSeed');

const seed = async (choreList, groupInfo, userList) => {
  try {
    console.log('syncing db');
    await db.sync({ force: true });

    console.log('create group');
    const group = await Group.create(groupInfo);
    const groupId = group.id;

    console.log('creating users');
    const users = await Promise.all(userList.map(user => User.create(user)));
    await Promise.all(users.map(user => user.addGroup(group)));

    // make first user an admin of the group
    const admin = users[0];
    await UserGroup.update(
      { userIsAdmin: true },
      { where: { userId: admin.id, groupId: group.id } },
    );

    const usersAndGroup = await UserGroup.findAll({
      where: { groupId: group.id },
    });
    await Promise.all(
      usersAndGroup.map(usergroup =>
        usergroup.update({ userStatus: 'active' }),
      ),
    );

    console.log('creating chores');
    const chores = await Promise.all(
      choreList.map(chore => {
        return Chore.create({ ...chore, groupId: group.id });
      }),
    );

    // run chores for a month
    const startDate = moment()
      .subtract(30, 'days')
      .toISOString()
      .split('T')[0];

    const nextDay = moment(startDate)
      .add(1, 'days')
      .toISOString();

    console.log(startDate, nextDay);

    // shuffle chores and assign them by date
  } catch (e) {
    console.error(e);
  }

  db.close();
};

seed(choresData[0], groupData[0], usersData[0]);
