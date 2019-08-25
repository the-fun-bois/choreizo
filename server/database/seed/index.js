const chalk = require('chalk');
const { db, User, Chore, Group, EthereumWallet, UserGroup } = require('./../');
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
      groupsSeed.map(group => Group.create(group))
    );

    console.log('putting users in group');
    // using sequelize magic method 'addGroup'
    await Promise.all(users.map(user => user.addGroup(groups[0])));
    // make first user admin
    const usersAndGroups = await UserGroup.findAll({ order: ['userId'] });
    await usersAndGroups[0].update({ userIsAdmin: true });
    // make all users status = active
    await Promise.all(
      usersAndGroups.map(usergroup => {
        return usergroup.update({ userStatus: 'active' });
      })
    );
    // add a random balance to each users wallet
    console.log('creating wallets');
    await Promise.all(
      users.map(user => {
        return EthereumWallet.create({
          userId: user.id,
          balance: Math.random() * 100,
        });
      })
    );
    console.log('creating chores');
    await Promise.all(
      choresSeed.map(chore => {
        chore.groupId = groups[0].id;
        return Chore.create(chore);
      })
    );
  } catch (e) {
    console.error(e);
    console.log(chalk.red(e));
    db.close();
  }

  console.log('closing connectiom');
  db.close();
};

seed();
