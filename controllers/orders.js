const orders = require("../models/orders")
const payment = require("../models/payment")
const {Deta} = require("deta")
const deta = Deta("c0x1nrki_LhQt95CaBmmsQ31B6TJJbWr8KdHww6yp");
const drive = deta.Drive("c0x1nrki");
const path = require("path");
const { v4: uuidv4, } = require('uuid');



const addOrders = async(req,res) => {
    try {

        const {name_Products, total_Price, total_Paid, type_Payment } = req.body
        const {name, id} = req.user
        const payment_token = `${uuidv4()}${Date.now()}${Math.random()}`;
        console.log(payment_token)

        const data = {
            nameProducts : name_Products,
            totalPrice : total_Price,
            totalPaid : total_Paid,
            orderBy : name,
            userId : id,
            paymentToken : payment_token,

        }
        
        payment.findById( type_Payment, (err, rows, fields) => {
                data.type = rows[0].type

                const transfersTo = rows[0].tranfersTo
                const type = rows[0].type
                orders.addOrders( data, (err, rows, fields) => {
                    if(err){
                        return res.status(500).json({
                            message : err
                        })     
                    } 
                        return res.status(200).json({
                            success : true,
                            message : `hello ${name}, You have successfully made a transaction with the payment method ${type} please transfer to ${transfersTo}`,
                          });
                    
        
                    
                })

        })

    }catch(err){
        return res.status(500).json({
            message : err
        }) 
    }
    
}

const payment_Verification = async(req,res) => {
    try {

        const {codePayment} = req.params
        console.log(codePayment)
        const images = req.file ? req.file.filename : "";
        const contents = `${path.join(__dirname, "../images")}/${images}`;
        await drive.put(images, { path: contents });

        const data = {
            proofOfPayment : images,
            code_Payment : codePayment
        }
        
        
        orders.verificationOrders( data, (err, rows, fields) => {
            if(err){
                return res.status(500).json({
                    message : err
                })     
            }

            return res.status(200).json({
                success : true,
                message : 'thank you for verifying the order, then your order will be processed immediately',
              });
        })

        


    }catch(err){
        return res.status(500).json({
            message : err
        }) 
    }
    
}

const update_transaction = async(req,res) => {
    try {

        console.log('data masuk sini')
        const {name} = req.user
        const {codePayment, status} = req.body


        const data = {
            status : status,
            code_Payment : codePayment,
            updateBy : name
        }

         
         orders.findAllBycodePayment( data, (err, rows, fields) =>{
            console.log(rows[0].status == 'done')
            if(rows[0].status === 'pending'){
                        return res.status(500).json({
                            message : `status data can't change because the data status is still pending`
                        })
            }
            else if(rows[0].status === 'done'|| rows[0].status === 'rejected'){
                console.log(rows[0].status)
                        return res.status(500).json({
                            message : `status data can't change because status done or rejected `
                        })
            } else if(status == 'Rejected'){
             orders.findTotalPaid( data, (err, rows, fields) =>{
                    data.totalReturn = rows[0].total_paid
                    orders.updateOrdersReject( data, (err, rows, fields) =>{
                        if(err){
                            console.log(data.totalReturn,'total return')
                            return res.status(500).json({
                                message : err
                            }) 
    
                        }
            
                        return res.status(200).json({
                            success : true,
                            message : `${name},you have successfully updated the data`,
                          });
                    })
                })
    
            }else{
                console.log('data masuk else')
                orders.updateOrdersDone( data, (err, rows, fields) => {
                    if(err){
                        return res.status(500).json({
                            message : err
                        })     
                    }
        
                    return res.status(200).json({
                        success : true,
                        message : `${name},you have successfully updated the data`,
                      });
                })
            }
        })
    }catch(err){
        return res.status(500).json({
            message : err
        }) 
    }
    
}

const HistoryTransaction = async(req,res) => {
    try {

        
        
        orders.findAll(  (err, rows, fields) => {
            
            if(err){
                return res.status(500).json({
                    message : err
                })     
            }

            return res.status(200).json({
                success : true,
                message : 'success get all history',
                data : rows
              });
        })

        


    }catch(err){
        return res.status(500).json({
            message : err
        }) 
    }
    
}    
module.exports = {addOrders, payment_Verification, update_transaction, HistoryTransaction}