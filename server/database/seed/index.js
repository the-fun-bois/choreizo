const chalk = require('chalk');
const {
  db,
  User,
  Chore,
  Group,
  EthereumWallet,
  UserGroup,
  AssignedChore,
} = require('./../');

const usersSeed = require('./data/usersSeed');
const groupsSeed = require('./data/groupsSeed');
const choresSeed = require('./data/choresSeed');

const seed = async () => {
  try {
    console.log('syncing db');
    await db.sync({ force: true });

    console.log('creating users');
    const users = await Promise.all(usersSeed.map(user => User.create(user)));

    console.log('creating groups');
    const groups = await Promise.all(
      groupsSeed.map(group => Group.create(group)),
    );

    console.log('putting users in group');
    // using sequelize magic method 'addGroup'
    for (let i = 0; i < groups.length; i++) {
      await Promise.all(users.map(user => user.addGroup(groups[i])));
    }

    // make first user admin in all groups
    await UserGroup.update({ userIsAdmin: true }, { where: { userId: 1 } });
    await UserGroup.update(
      { userStatus: 'active' },
      { where: { userStatus: 'pending' } },
    );
    // add a random balance to each users wallet
    console.log('creating wallets');
    await Promise.all(
      users.map(user => EthereumWallet.create({
        userId: user.id,
        balance: Math.random() * 100,
      })),
    );
    console.log('creating chores');
    let allChores = [];
    for (let i = 0; i < groups.length; i++) {
      const groupChores = await Promise.all(
        choresSeed.map((chore) => {
          chore.groupId = groups[i].id;
          return Chore.create(chore);
        }),
      );
      allChores = [...allChores, ...groupChores];
    }

    console.log('assigning chores');
    const totalUsers = users.length;
    let currentUser = 0;
    for (let i = 0; i < allChores.length; i++) {
      // rotate back to first user
      if (currentUser >= totalUsers) {
        currentUser = 0;
      }
      await AssignedChore.create({
        choreId: allChores[i].id,
        userId: users[currentUser].id,
      });
      currentUser += 1;
    }
  } catch (e) {
    console.error(e);
    console.log(chalk.red(e));
    db.close();
  }

  console.log('closing connection');
  db.close();
};

seed();
