const router = require('express').Router();
const { Group, UserGroup, Chore, AssignedChore } = require('../database/index');

const findGroupInfo = userId => {
  return UserGroup.findAll({
    where: { userId, userStatus: 'active' },
  })
    .then(result => result)
    .catch(e => console.error(e));
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
  const { name, description } = req.body;
  Group.create({ name, description })
    //add the user as admin to the group
    .then(response => res.send(response))
    .catch(e => console.error(e));
});

/*
 * @ROUTE: POST to /api/admin/addchore
 * @DESC: Allows for an admin to add a chore to their specific group
 * @ACCESS: admin only
 */
router.post('/add_chore', async (req, res, next) => {
  const { userId, name, difficulty, timeLimit, details } = req.body;
  const userInfo = await UserGroup.findOne({ where: { userId } });
  if (userInfo.userIsAdmin) {
    console.log('******************hit');
    Chore.create({
      name,
      difficulty,
      timeLimit,
      details,
      groupId: userInfo.groupId,
    })
      .then(newChore => res.send(newChore))
      .catch(e => console.error(e));
  } else {
    res.status(404).send('You are not an admin');
  }
});

module.exports = router;
