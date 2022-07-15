const mysql = require("mysql")
const util = require("util")

const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b24db3e05c4dd1',
    password: '9839283f',
    database: 'heroku_f774bb06ab789d6'
})

pool.getConnection((error)=> {
    error ? console.warn("No conectado ",{"error " : error.code}) : console.log("Conexion con BD establecida")
})

pool.query = util.promisify(pool.query)
module.exports = pool