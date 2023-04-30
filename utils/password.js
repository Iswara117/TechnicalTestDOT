const crypto = require("crypto")

let salt = "LlGKTKzECTLHQAKCYi+MyP1+LIJMepF+VKLFX0Di34yJghBEJmdYWmTy90xUyeKQ3wxYsnUxztOFoS9u/5ojRSt5KPN0gZUk0p+B8zxndG2gxo64rUKZxeeftqXuhNd4ynWvdA76IgG85Qlq4BanYBg/mQmonDkNzRJIPgbrseA="


 function hash_password (password){
    return hash_validate = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
}

const setPassword = function(password) {
    const hash = hash_password(password)
    return hash 
}




const validPassword = function (password, passwordSeed) {
    const hash_password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
    return hash_password === passwordSeed;
};


module.exports = {setPassword , validPassword}