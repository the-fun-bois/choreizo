const { db } = require('./database');
const app = require('./server');
const chalk = require('chalk');

const { PORT } = process.env;

const force = true;
db.sync({ force }).then(() => {
  console.log('db synced');
  if (force) {
    console.log(chalk.red('**** WARNING \n {force: true} is enabled'));
  }
  app.listen(PORT, () => {
    console.log(`
      Listening on PORT : ${PORT}

      http://localhost:3000
    `);
  });
});
