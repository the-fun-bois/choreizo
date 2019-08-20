const { db } = require('./database');
const app = require('./server');

const { PORT } = process.env;

db.sync().then(() => {
  console.log('db synced');
  app.listen(PORT, () => {
    console.log(`
      Listening on PORT : ${PORT}

      http://localhost:3000
    `);
  });
});
