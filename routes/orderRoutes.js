const express = require("express");
const router = express.Router()
const orderControllers = require("../controllers/orders")
const multer = require("../lib/upload")
const authorization = require("../middleware/auth")


router.post("/add-orders", authorization.auth, orderControllers.addOrders)
router.put("/verification-order/:codePayment", authorization.auth, multer.send , orderControllers.payment_Verification)
router.put("/update-order", authorization.auth, authorization.isAdmin ,orderControllers.update_transaction)
router.get("/history-order", authorization.auth, authorization.isAdmin,orderControllers.HistoryTransaction)
module.exports = router

