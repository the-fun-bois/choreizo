const router = require('express').Router();
const sequelize = require('sequelize');
const {
  Group,
  UserGroup,
  Chore,
  AssignedChore,
  User,
} = require('../database/index');

const findGroupInfo = userId => {
  return UserGroup.findAll({
    where: { userId, userStatus: 'active' },
  })
    .then(result => result)
    .catch(e => console.error(e));
};

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
router.post('/create_group', (req, res, next) => {
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
      res.send(
        `User ${userId} created for group '${name}' and assigned as Admin`
      )
    )
    .catch(e => console.error(e));
});

/*
 * @ROUTE: POST to /api/admin/add_chore
 * @DESC: Allows for an admin to add a chore to their specific group
 * @ACCESS: admin only
 */
router.post('/add_chore', async (req, res, next) => {
  const { userId, name, difficulty, timeLimit, details } = req.body;
  const userInfo = await UserGroup.findOne({ where: { userId } });
  const detailsArray = Array(details);
  if (userInfo.userIsAdmin) {
    Chore.create({
      name,
      difficulty,
      penalty: 1,
      timeLimit,
      details: detailsArray,
      groupId: userInfo.groupId,
    })
      .then(newChore => res.send(newChore))
      .catch(e => console.error(e));
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
  const { userIdToModify, choreId, newDueDate } = req.body;
  const adjusted = new Date(newDueDate);
  console.log(adjusted);
  AssignedChore.update(
    { expiresOn: adjusted },
    { where: { userId: userIdToModify, choreId } }
  )
    .then(newChore => res.send(newChore))
    .catch(next);
});

/*
 * @ROUTE: POST to /api/admin/add_new_user
 * @DESC: Allows for an admin to extend a chores time
 * @ACCESS: admin only
 */
router.post('/add_new_user', async (req, res, next) => {
  const { userId, firstName, surName, email, groupId, adminRights } = req.body;
  let newUserId = 0;
  const isAdmin = await UserGroup.findOne({ where: { userId, groupId } })
    .then(user => {
      if (user.userIsAdmin === true && user.userStatus === 'active') {
        return true;
      }
      return false;
    })
    .catch(next);
  if (isAdmin) {
    const newUser = await User.create({ firstName, surName, email }).catch(
      next
    );
    newUserId = newUser.id;
    const group = await UserGroup.create({
      userIsAdmin: adminRights,
      userStatus: 'active',
      userId: newUserId,
      groupId: groupId,
    })
      .then(newUserGroup => res.send(`User Created Successfully`))
      .catch(next);
  }
  res.send('You are not an Admin');
});
module.exports = router;
