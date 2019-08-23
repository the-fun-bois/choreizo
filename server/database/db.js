if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Sequelize = require('sequelize');
const db = new Sequelize(/*process.env.DATABASE_URL*/'postgres://:5432/choreApp', { logging: false });

module.exports = db;
