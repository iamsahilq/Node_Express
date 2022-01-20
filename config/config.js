// config.js
require('dotenv').config();
const {
  DB_HOST = '127.0.0.1',
  DB_USERNAME = 'sahil',
  DB_PASSWORD = 'sahil',
} = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'node_express_dev',
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'node_express_test',
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'node_express_prod',
    host: DB_HOST,
    dialect: 'postgres',
  },
};
