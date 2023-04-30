const express = require("express");
const router = express.Router()
const userControllers = require("../controllers/user")

router.post("/login", userControllers.loginController)

module.exports = router