const express = require("express");
const router = express.Router()
const paymentControllers = require("../controllers/payment")
const authorization = require("../middleware/auth")

router.get("/all-payment", authorization.auth,paymentControllers.findAllPayment)


module.exports = router