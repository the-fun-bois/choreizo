const router = require('express').Router();
const { AssignedChore, Chore, UserGroup } = require('../database/index');

//assumes only UserId is coming in for each route

const findGroupInfo = userId => {
  return UserGroup.findAll({
    where: { userId, userStatus: 'active' },
  })
    .then(result => result)
    .catch(e => console.error(e));
};

/*
 * @ROUTE: POST to /api/chores/
 * @DESC: allow admin to see all chores (if admin of any group), return nothing if not admin
 * @ACCESS: admin only
 */
router.post('/', async (req, res, next) => {
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
    const chores = await Chore.findAll({});
    res.send(chores);
  } else {
    res.send('You are not authorized, only admins can see chores');
  }
});

/*
 * @ROUTE: POST to /api/chores/allassignedchores
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

  for (let i = 0; i < groups.length; i++) {
    const choreList = await Chore.findAll({ where: { groupId: groups[i] } });
  }

  //adminStatusByGroup.forEach(group => {
  //change into a for loop and await each pull from Assigned Chores
  // for (let i = 0; i < adminStatusByGroup.length; i++) {
  //   if (adminStatusByGroup[i].userIsAdmin) {
  //     const choresList = await AssignedChore.findAll({
  //       where: adminStatusByGroup.userId,
  //     });
  //     let id = adminStatusByGroup[i].groupId;
  //     chores[id] = choresList;
  //   }
  // }

  res.send(chores);
});

/*
 * @ROUTE: POST to /api/chores/allpersonalchores
 * @DESC: allow a user to see all their assigned chores
 * @ACCESS: private
 */
router.post('/all_personal_chores', (req, res, next) => {
  let { userId } = req.body;
  AssignedChore.findAll({ where: { userId } })
    .then(result => res.send(result))
    .catch(e => console.error(e));
});

module.exports = router;
