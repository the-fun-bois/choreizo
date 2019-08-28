const router = require('express').Router();
const { Group } = require('../database/index');

/*
 * @ROUTE: POST to /api/admin/creategroup
 * @DESC: Allows for an admin to create a new group with passed in info
 * @ACCESS: admin only
 */
router.post('/creategroup', (req, res, next) => {
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
router.post('/addchore', (req, res, next) => {
  const { userId, name, difficulty, timeLimit, details } = req.body;
});

module.exports = router;
