if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_CI;

const Sequelize = require('sequelize');

const db = new Sequelize(DATABASE_URL, { logging: false });

module.exports = db;
