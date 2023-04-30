const request = require('supertest');
const mysql = require("mysql")
const dotenv = require('dotenv');
const app = require('../app');

const order_data = {
    name_Products:"order botol",
    total_Paid:"10000",
    total_Price:"10000",
    type_Payment:"dana"
  };

  const user = {
    email: "anakagunggedeiswarawijaya@gmail.com",
    password: "customer",
  };

  const error_token = {
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjgyNzcxMjUyfQ.ggQeuYtV4POZINYsXNnmSyYgB7stvF6Eq3hQDwF-FM87'
  };

describe('add order', () => {
    it('should return 200, success add order', async()=>{
        
        const {body} = await request(app).post("/auth/login").send(user)
        console.log(body)
        await request(app)
        .post("/order/add-orders")
        .set('Authorization',body.token)
        .send(order_data)
        .expect(200)
    })

    it('should return 401, invalid signature', async()=>{
        
        const {body} = await request(app).post("/auth/login").send(user)
        console.log(body)
        await request(app)
        .post("/order/add-orders")
        .set('Authorization',error_token)
        .send(order_data)
        .expect(401)
    })
})