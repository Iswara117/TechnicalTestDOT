const jwt = require('jsonwebtoken');
const user = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
const auth = (req, res, next) => {
  try {
    // console.log(req.headers)
    const bearerToken = req.headers.authorization;
    // console.log(bearerToken);
    // const token = bearerToken.split('Bearer')[1];
    if (!bearerToken) {
      return res.status(401).json({
        status: 'failed',
        message: 'Required authorization',
      });
    }
    const payload = jwt.verify(bearerToken, 'rahasia');
    
   user.findById(payload.id, (err, rows, fields) => {
    
    req.user = rows[0]
    next()
   })
  } catch (err){
    res.status(401).json({
      status: 'failed',
      message: 'Invalid token',
      message: err
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    user.findById(req.user.id, (err, rows, fields) => {
    
      if(rows[0].role === 'admin')  next()
      
     })
    throw new Error();
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      message: 'hanya bisa diakses oleh admin',
    });
  }
};
module.exports = {auth, isAdmin};