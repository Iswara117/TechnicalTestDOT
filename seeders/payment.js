const pool = require("../config/db")

const createPayment = 'INSERT INTO PAYMENT (type,tranfersTo,logo_payment) VALUES (,"8090092988","https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-BCA-PNG-1024x768.png"),("dana","085156047067","https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png")'

      
      pool.query(createPayment, err => {
        if(err) {
          throw err
        }

        console.log('sql seed complete')
        pool.end
      })