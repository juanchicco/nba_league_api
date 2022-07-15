const mysql = require("mysql")
const util = require("util")

const pool = mysql.createPool({
    host: process.env.dbHost,
    database: process.env.dbName,
    user: process.env.dbUser
})

pool.getConnection((error)=> {
    error ? console.warn("No conectado ",{"error " : error.code}) : console.log("Conexion con BD establecida")
})

pool.query = util.promisify(pool.query)
module.exports = pool