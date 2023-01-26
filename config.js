require("dotenv").config()
const {PORT, DB_PASSWORD} = process.env
const {Pool} = require("pg")
const postgreDB = new Pool({
    host: "localhost",
    user: "postgres",
    database: "postgres",
    password: DB_PASSWORD,
    port : PORT
})

module.exports = postgreDB