const pool = require("../config/db")

const findById = (data,callback) => {
    console.log(data)

    return pool.query(`SELECT * FROM payment WHERE type = '${data}' `,callback)

    
}

const findAll = (callback) => {

    return pool.query(`SELECT * FROM payment`,callback)

    
}

module.exports = {findById, findAll}

