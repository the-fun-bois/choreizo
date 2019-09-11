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
  EthereumWallet,
} = require('./../index');
const moment = require('moment');

const choresData = require('./data/choresSeed');
const groupData = require('./data/groupsSeed');
const usersData = require('./data/usersSeed');

const getRandomUser = users => {
  const numberOfUsers = users.length;
  const randomUserIdx = Math.floor(Math.random() * numberOfUsers);
  return users[randomUserIdx];
};

const createChoreHistory = async (
  chore,
  users,
  startDate,
  endDate = Date.now(),
) => {
  const { timeLimit } = chore;
  let currentDate = startDate;
  while (
    moment(currentDate)
      .add(timeLimit, 'days')
      .isBefore(endDate)
  ) {
    const assignee = getRandomUser(users);
    const getRandomStatus = () => {
      const statuses = ['completed', 'incomplete'];
      const index = Math.floor(Math.random() + 0.25);
      return statuses[index];
    };
    await AssignedChore.create({
      choreId: chore.id,
      userId: assignee.id,
      status: getRandomStatus(),
      expiresOn: moment(currentDate).add(timeLimit, 'days'),
    });
    currentDate = moment(currentDate).add(timeLimit, 'days');
  }
  currentDate = moment(currentDate).add(timeLimit, 'days');
  await AssignedChore.create({
    choreId: chore.id,
    userId: getRandomUser(users).id,
    status: 'pending',
    expiresOn: moment(currentDate).add(timeLimit),
  });
};

const createMarketChores = async pendingChores => {
  const numberOfChores = pendingChores.length;
  for (let idx = 1; idx < 4; idx++) {
    if (idx >= numberOfChores) {
      break;
    }
    if (idx === 1) {
      const user1Id = pendingChores[0].userId;
      const assignedChore1Id = pendingChores[0].id;
      const user2Id = pendingChores[1].userId;
      const assignedChore2Id = pendingChores[1].id;
      await SwapChore.create({
        user1Id,
        assignedChore1Id,
        user2Id,
        assignedChore2Id,
      });
    }
    if (idx === 2) {
      await TradeChore.create({
        assignedChoreId: pendingChores[2].id,
        originalOwnerId: pendingChores[2].userId,
        tradeTerms: 'back rub',
      });
    }
    if (idx === 3) {
      await TransferChore.create({
        assignedChoreId: pendingChores[3].id,
        originalOwnerId: pendingChores[3].userId,
        price: 100,
      });
    }
  }
};

const seed = async (choreList, groupInfo, userList) => {
  try {
    console.log('syncing db');
    await db.sync({ force: true });

    console.log('create group');
    const group = await Group.create(groupInfo);

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

    console.log('creating wallets');
    await Promise.all(
      users.map(user => {
        const balance = Math.floor(Math.random() * 100000) + 100;
        EthereumWallet.create({ balance, userId: user.id });
      }),
    );

    console.log('creating chores');
    const chores = await Promise.all(
      choreList.map(chore => {
        return Chore.create({ ...chore, groupId: group.id });
      }),
    );

    console.log('creating chore history');
    // start date is 2 weeks before now
    const startDate = moment()
      .subtract(14, 'days')
      .toISOString()
      .split('T')[0];

    for (let choreIdx = 0; choreIdx < chores.length; choreIdx++) {
      await createChoreHistory(chores[choreIdx], users, startDate);
    }

    console.log('creating market items');
    const pendingChores = await AssignedChore.findAll({
      wherer: { status: 'pending', groupId: group.id },
    });

    await createMarketChores(pendingChores);

    // const nextDay = moment(startDate)
    //   .add(1, 'days')
    //   .toISOString();
    // shuffle chores and assign them by date
  } catch (e) {
    console.error(e);
  }

  db.close();
};

seed(choresData[0], groupData[0], usersData[0]);
