const pool = require("../config/db")
const password = require("../utils/password")

const createUser = 'INSERT INTO USER (name,email,password,gender) VALUES ("admin","admin",?, "man"),("Anak Agung Gede Iswara Wijaya","anakagunggedeiswarawijaya@gmail.com",?, "man")'

const password_seed_admin = password.setPassword('admin')
const password_seed_customer = password.setPassword('customer')
      
      pool.query(createUser,[password_seed_admin, password_seed_customer], err => {
        if(err) {
          throw err
        }

        console.log('sql seed complete')
        pool.end
      })


