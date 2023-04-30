const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express()

// Router
const AuthRouter = require("./routes/userRoutes");
const OrderRouter = require("./routes/orderRoutes")
const PaymentRouter = require("./routes/paymentRoutes")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

// Configure Router
app.use('/auth', AuthRouter)
app.use('/order', OrderRouter)
app.use('/payment', PaymentRouter)


app.use('/images', express.static('images'));

app.listen(3002, () => {
    console.log('server running')
})


module.exports = app