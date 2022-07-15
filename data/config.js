const mysql = require("mysql")
const util = require("util")

const pool = mysql.createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.dbName
})

pool.getConnection((error)=> {
    error ? console.warn("No conectado ",{"error " : error.code}) : console.log("Conexion con BD establecida")
})

pool.query = util.promisify(pool.query)
module.exports = pool