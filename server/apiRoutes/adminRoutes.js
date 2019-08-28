const router = require('express').Router();
const { Group, UserGroup, Chore } = require('../database/index');

/*
 * @ROUTE: POST to /api/admin/creategroup
 * @DESC: Allows for an admin to create a new group with passed in info
 * @ACCESS: admin only
 */
router.post('/create_group', (req, res, next) => {
  const { name, description } = req.body;
  Group.create({ name, description })
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
    Chore.create({
      name,
      difficulty,
      timeLimit,
      details,
      groupId: userInfo.groupId,
    });
    // .then(newChore => res.send('created'))
    // .catch(e => console.error(e));
  } else {
    res.status(404).send('You are not an admin');
  }
});

module.exports = router;
