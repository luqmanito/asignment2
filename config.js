require("dotenv").config();
const {
  PORT,
  DB_PORT,
  DB_PASSWORD,
  DB_HOST_DEV,
  DB_USER_DEV,
  DB_NAME_DEV,
  DB_PASS_DEV,
} = process.env;
const { Pool } = require("pg");
// const postgreDB = new Pool({
//     host: "localhost",
//     user: "postgres",
//     database: "postgres",
//     password: DB_PASSWORD,
//     port : PORT
// })

const postgreDB = new Pool({
  host: DB_HOST_DEV,
  user: DB_USER_DEV,
  database: DB_NAME_DEV,
  password: DB_PASS_DEV,
  port: DB_PORT,
});

module.exports = postgreDB;
