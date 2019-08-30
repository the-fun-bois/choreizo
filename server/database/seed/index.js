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

    console.log('creating groups');
    const groups = await Promise.all(
      groupsSeed.map(group => Group.create(group)),
    );

    for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
      console.log(`********** seeding group ${groupIdx + 1}`);
      const currentGroup = groups[groupIdx];
      console.log('creating users');
      const users = await Promise.all(
        usersSeed[groupIdx].map(user => User.create(user)),
      );
      console.log('assigning users to groups');
      await Promise.all(users.map(user => user.addGroup(currentGroup)));
      // make first user of each group the admin
      await UserGroup.update(
        { userIsAdmin: true },
        { where: { userId: users[0].id } },
      );
      console.log('creating wallets');
      await Promise.all(
        users.map(user =>
          EthereumWallet.create({
            userId: user.id,
            balance: Math.random() * 100,
          }),
        ),
      );
      console.log('creating chores');
      const groupChores = await Promise.all(
        choresSeed[groupIdx].map(chore => {
          chore.groupId = groups[groupIdx].id;
          return Chore.create(chore);
        }),
      );
      console.log('assigning chores');
      const totalUsers = users.length;
      let currentUser = 0;
      for (let choreIdx = 0; choreIdx < groupChores.length; choreIdx++) {
        // rotate back to first user
        if (currentUser >= totalUsers) {
          currentUser = 0;
        }
        await AssignedChore.create({
          choreId: groupChores[choreIdx].id,
          userId: users[currentUser].id,
        });
        currentUser += 1;
      }
    }
    console.log('**********');
  } catch (e) {
    console.error(e);
    console.log(chalk.red(e));
    db.close();
  }

  console.log('closing connection');
  db.close();
};

seed();
