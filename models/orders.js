const pool = require("../config/db")

const  addOrders = (data,callback) => {

    

    // const paymentId = `(SELECT * FROM payment WHERE type = '${data.typeId}')`
    const sql = `insert into orders (name,total_paid,total_price,payment_code,orderBy,paymentId,userId) VALUES('${data.nameProducts}','${data.totalPaid}','${data.totalPrice}','${data.paymentToken}','${data.orderBy}',(SELECT id FROM payment WHERE type = '${data.type}'),(SELECT id FROM user WHERE id = '${data.userId}'))`

    return pool.query(sql,callback)    

}



const findTotalPaid = (data,callback) => {
    
    return pool.query(`SELECT total_paid FROM orders WHERE payment_code = '${data.code_Payment}' `,callback)

    
}

const findAll = (callback) => {
    
    return pool.query(`SELECT * FROM orders`,callback)

    
}

const findAllBycodePayment = (data,callback) => {
    
    return pool.query(`SELECT * FROM orders WHERE payment_code = '${data.code_Payment}' `,callback)

    
}



const verificationOrders = (data,callback) => {

    return pool.query(`UPDATE orders SET proof_of_payment = '${data.proofOfPayment}', status = 'progress' WHERE payment_code = '${data.code_Payment}' `,callback)

    
}

const updateOrdersDone = (data,callback) => {
    

    return pool.query(`UPDATE orders SET  status = '${data.status}', updateBy = '${data.updateBy}' WHERE payment_code = '${data.code_Payment}' `,callback)

    
}

const updateOrdersReject = (data,callback) => {
    

    return pool.query(`UPDATE orders SET  status = '${data.status}', updateBy = '${data.updateBy}', total_return = '${data.totalReturn}' WHERE payment_code = '${data.code_Payment}' `,callback)

    
}


module.exports = {addOrders, verificationOrders, updateOrdersDone , updateOrdersReject, findTotalPaid, findAllBycodePayment, findAll}