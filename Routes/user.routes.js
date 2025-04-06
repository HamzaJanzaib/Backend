const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user.Controllers');
const { registerValid, loginValid } = require("../Middleware/User.validate.middle");
const authMiddleware = require('../Middleware/auth.Middleware');

router.post("/register", registerValid, userControllers.register);

router.post("/login", loginValid, userControllers.loginUser);

router.get("/profile", authMiddleware.authUser, userControllers.getUserProfile);

router.get("/logout", authMiddleware.authUser, userControllers.logout);

module.exports = router;
