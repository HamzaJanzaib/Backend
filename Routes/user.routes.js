const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user.Controllers');
const validator = require("../Middleware/User.validate.middle")

router.post("/register", validator.registerValid, userControllers.register
)

router.post("/login", validator.loginValid, userControllers.loginUser
)

module.exports = router;