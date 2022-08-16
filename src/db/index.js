// configure connection
const Pool = require('pg').Pool;
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USER;
const dbDatabase = process.env.DB_DATABASE;


const pool = new Pool({
  user: dbUsername,
  database: dbDatabase,
  password: dbPassword,
  host: dbHost,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}

