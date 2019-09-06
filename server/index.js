const { db } = require('./database');
const app = require('./server');
const chalk = require('chalk');

const { PORT, DB_FORCE, NODE_ENV } = process.env;

db.sync({ force: DB_FORCE === 'true' }).then(() => {
  console.log('db synced');
  if (NODE_ENV !== 'production') {
    console.log(
      chalk.red(`****  db.sync({force: ${DB_FORCE === 'true'}}) is enabled`),
    );
  }
  app.listen(PORT, () => {
    console.log(`
      Listening on PORT : ${PORT}

    `);
  });
});
