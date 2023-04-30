const pool = require("../config/db")

const login = (data,callback) => {

    return pool.query(`SELECT * FROM user WHERE email = '${data}' `,callback)

    
}
const findById = (data,callback) => {

    return pool.query(`SELECT * FROM user WHERE id = '${data}' `,callback)

    
}


module.exports = {login, findById}