const router = require('express').Router();
const { Group } = require('../database/index');

/*
 * @ROUTE: POST to /api/admin/creategroup
 * @DESC: Allows for an admin to create a new group with passed in info
 * @ACCESS: admin only
 */
router.post('/creategroup', async (req, res, next) => {
  const { name, description } = req.body;
  res.send(name);
});

module.exports = router;
