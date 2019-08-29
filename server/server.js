const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');

const app = express();

const { db } = require('./database');

const morganMode = process.env.NODE_ENV === 'production' ? 'tiny' : 'dev';
app.use(morgan(morganMode));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(express.urlencoded({ extended: false }));
}

const apiRoutes = require('./apiRoutes');

app.use('/api', apiRoutes);

// error middleware
app.use((err, req, res, next) => {
  console.log(chalk.black.bgRed('Error: ', err.stack));
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
