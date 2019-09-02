const router = require('express').Router();
const { updateChoreStatus } = require('./utils/adminUtils');
const {
  Group,
  UserGroup,
  Chore,
  AssignedChore,
  User,
} = require('../database/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const findGroupInfo = userId => {
  return UserGroup.findAll({
    where: { userId, userStatus: 'active' },
  })
    .then(result => result)
    .catch(e => console.error(e));
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
//Taken from Seed
const createArrayOfSentences = numberOfSentences => {
  const sentenceArr = [];
  Array(numberOfSentences)
    .fill(1)
    .forEach(val => sentenceArr.push(faker.lorem.sentence()));
  return sentenceArr;
};

/*
 * @ROUTE: POST to /api/admin/
 * @DESC: allow admin to see all chores (if admin of some group), return nothing if not admin of ANY group
 * @ACCESS: admin only
 */
router.post('/all_chores', async (req, res, next) => {
  //replicate the chores route and give me only the assigned from groups where is admin
  await updateChoreStatus();
  const userId = req.body.userId;
  let isAdmin = false;
  const adminStatusByGroup = await findGroupInfo(userId);
  //res.send(adminStatusByGroup);
  for (let i = 0; i < adminStatusByGroup.length; i++) {
    if (adminStatusByGroup[i].userIsAdmin) {
      isAdmin = true;
    }
  }
  if (isAdmin) {
    const chores = await Chore.findAll({ include: [{ model: AssignedChore }] });
    res.send(chores);
  } else {
    res.send('You are not authorized, only admins can see chores');
  }
});

/*
 * @ROUTE: POST to /api/admin/all_assigned_chores
 * @DESC: allow admin to see all assigned chores, return nothing if not admin
 * @ACCESS: private
 */
router.post('/all_assigned_chores', async (req, res, next) => {
  await updateChoreStatus();
  let chores = {};
  const groups = [];
  const userId = req.body.userId;
  const allGroups = await findGroupInfo(userId);

  //slim out groups to only those belonged to
  for (let i = 0; i < allGroups.length; i++) {
    groups.push(allGroups[i].groupId);
  }

  //get all chores that are assigned in the group
  for (let i = 0; i < groups.length; i++) {
    const choreList = await Chore.findAll({
      where: { groupId: groups[i] },
      include: [{ model: AssignedChore }],
    });
    chores[groups[i]] = choreList;
  }
  //At this point we have chores and users info for those chores, or no chores are assigned
  if (chores) {
    res.send(chores);
  } else {
    res.send(
      'You do not have any assigned chores for your group, get to work!'
    );
  }
});

/*
 * @ROUTE: POST to /api/admin/creategroup
 * @DESC: Allows for an admin to create a new group with passed in info
 * @ACCESS: private
 */
router.post('/create_group', async (req, res, next) => {
  await updateChoreStatus();
  const { name, description, userId } = req.body;
  Group.create({ name, description })
    .then(group =>
      UserGroup.create({
        userIsAdmin: true,
        userStatus: 'active',
        userId,
        groupId: group.id,
      })
    )
    .then(assignedInfo =>
      res.status(200).send({
        message: `User ${userId} created for group '${name}' and assigned as Admin`,
      })
    )
    .catch(next);
});

/*
 * @ROUTE: POST to /api/admin/add_chore
 * @DESC: Allows for an admin to add a chore to their specific group
 * @ACCESS: admin only
 */
router.post('/add_chore', async (req, res, next) => {
  await updateChoreStatus();
  // details must be an array
  const { userId, name, difficulty, timeLimit, details } = req.body;
  const userInfo = await UserGroup.findOne({ where: { userId } });
  let detailsArray;
  if (!Array.isArray(details)) {
    detailsArray = Array(details);
  } else {
    detailsArray = details;
  }
  if (userInfo.userIsAdmin) {
    Chore.create({
      name,
      difficulty,
      penalty: 1,
      timeLimit,
      details: detailsArray,
      groupId: userInfo.groupId,
    })
      .then(newChore =>
        res.status(201).send({ message: `${newChore} created successfully` })
      )
      .catch(next);
  } else {
    res.status(404).send('You are not an admin');
  }
});

/*
 * @ROUTE: POST to /api/admin/extend_chore_time
 * @DESC: Allows for an admin to extend a chores time by feeding new due date
 * @ACCESS: admin only
 */
router.post('/extend_chore_time', async (req, res, next) => {
  await updateChoreStatus();
  const { newDueDate, idToModify } = req.body;
  const adjusted = new Date(newDueDate);
  AssignedChore.update({ expiresOn: adjusted }, { where: { id: idToModify } })
    .then(newChore =>
      res
        .status(201)
        .send({ message: `Sucessfully updated ${newChore[0]} chore` })
    )
    .catch(next);
});

/*
 * @ROUTE: POST to /api/admin/add_new_user
 * @DESC: Allows for an admin to create a new user
 * @ACCESS: admin only
 */
router.post('/add_new_user', async (req, res, next) => {
  await updateChoreStatus();
  const { userId, groupId, adminRights, userIdToAdd } = req.body;
  const isAdmin = await UserGroup.findOne({ where: { userId, groupId } })
    .then(user => {
      if (user.userIsAdmin === true && user.userStatus === 'active') {
        return true;
      }
      return false;
    })
    .catch(next);

  if (isAdmin) {
    await UserGroup.create({
      userIsAdmin: adminRights,
      userStatus: 'active',
      userId: userIdToAdd,
      groupId,
    })
      .then(newUserGroup =>
        res.status(201).send({
          message: `User ${userIdToAdd} successfully added to group ${groupId}`,
        })
      )
      .catch(next);
  } else {
    res.status(404).send({ message: 'You are not an Admin' });
  }
});

/*
 * @ROUTE: POST to /api/admin/assign_chores
 * @DESC: Route that will randomly assign all chores to the admins group
 * @ACCESS: admin only
 */
router.post('/assign_chores', async (req, res, next) => {
  const { userId } = req.body;
  const intialGroupId = req.body.groupId;
  await updateChoreStatus();
  const allChores = await Chore.findAll({});
  const { userIsAdmin, groupId } = await UserGroup.findOne({
    where: { userId, groupId: intialGroupId },
  });

  if (!userIsAdmin) {
    res
      .status(404)
      .send({ message: 'You are not an admin and cannot assign chores' });
  } else {
    let groupUsers = await UserGroup.findAll({ where: { groupId } });

    // Slim out user Ids for the group Admin is in
    let users = [];
    for (let i = 0; i < groupUsers.length; i++) {
      users.push(groupUsers[i].userId);
    }

    // Pull out all chores that are pending
    const pendingChores = await AssignedChore.findAll({
      where: { status: 'pending', userId: { [Op.in]: users } },
    });
    const pendingArr = [];
    for (let i = 0; i < pendingChores.length; i++) {
      pendingArr.push(pendingChores[i].id);
    }

    //slim out to only chores that need assigned
    const choresToAssign = [];
    for (let i = 0; i < allChores.length; i++) {
      if (!pendingArr.includes(allChores[i].id)) {
        choresToAssign.push(allChores[i].id);
      }
    }
    //users and chores to assign
    //stir it up ... little darling ... stir it up
    shuffleArray(users);
    shuffleArray(choresToAssign);

    let userIndex = 0;
    for (let i = 0; i < choresToAssign.length; i++) {
      if (userIndex >= users.length) {
        userIndex = 0;
      }
      const userId = users[userIndex];
      await AssignedChore.create({
        status: 'pending',
        userId,
        choreId: choresToAssign[i],
      });
      userIndex += 1;
    }

    res.status(200).send({
      message: 'Successfully shuffled chores for Admin group',
    });
  }
});
module.exports = router;
