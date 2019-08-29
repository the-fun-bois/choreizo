const router = require('express').Router();
const { AssignedChore, Chore, UserGroup } = require('../database/index');
const { choreIncludeParamsAccepted } = require('./utils/choreUtils');

//assumes only UserId is coming in for each route

/*
 * @ROUTE: POST to /api/chores/allpersonalchores
 * @DESC: allow a user to see all their assigned chores
 * @ACCESS: private
 */
router.post('/all_personal_chores', async (req, res, next) => {
  let { userId } = req.body;
  const chores = {};
  const group = await UserGroup.findAll({
    where: { userId },
  });
  for (let i = 0; i < group.length; i++) {
    const test = await AssignedChore.findAll({
      where: { userId, status: 'pending' },
    });
    chores[group[i].groupId] = test;
  }
  res.send(chores);
});

/*
 * @ROUTE: POST to /api/chores/personal_chore_history
 * @DESC: allow a user to see all their historical chores
 * @ACCESS: private
 */
router.post('/personal_chore_history', (req, res, next) => {
  let { userId } = req.body;
  AssignedChore.findAll({
    where: { userId, status: 'completed' },
  })
    .then(response => res.send(response))
    .catch(next);
});

module.exports = router;
