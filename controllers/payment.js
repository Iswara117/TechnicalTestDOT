const payment = require("../models/payment")


const findAllPayment = async(req,res) => {

    payment.findAll((err, rows, fields) => {
        return res.status(200).json({
            success : true,
            message : 'success ordering',
            data : rows
          });
    })
}

module.exports = {findAllPayment}