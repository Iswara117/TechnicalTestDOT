const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env
// console.log(DB_USERNAME, 'ini nama database')
        const pool = mysql.createConnection({
    host: DB_HOSTNAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
    })

    pool.connect((err) => {
        if (err) throw err
        // console.log('Connected!')
      })

      // var sql = "SHOW TABLES";
      
        
        

module.exports =  pool;