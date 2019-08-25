const express = require('express');
const apiRoutes = express.Router();
//import api routes here

const choresAPIRoutes = require('./chores');

// set api routes here
// apiRouter.use('/someRoute', someRoute)

apiRoutes.use('/chores', choresAPIRoutes);

module.exports = apiRoutes;
