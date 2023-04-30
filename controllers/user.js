const {login,} = require("../models/user")
const jwt = require("jsonwebtoken");
const password = require("../utils/password")

const loginController = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    try{
          await login(data.email,function(err, rows, fields) {
            const result = rows[0]
            if (result === undefined) {
                return res.status(404).json({
                    message : 'User Not Found'
                })
            }

            console.log(result.id)

            const token = jwt.sign(
                { id: result.id,  },
                'rahasia',
              );

            const match = password.validPassword(data.password, result.password)
            console.log(match)
            if(match){
                return res.status(200).json({
                    id_user: result.id,
                    username: result.email,
                    token: token,
                    success: true,
                })
            }else{
                return res.status(401).json({
                    message : 'Password is invalid'
                })
            }
        })
        
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {loginController}