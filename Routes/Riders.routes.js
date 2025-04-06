const express = require('express');
const router = express.Router();
const riderControllers = require('../Controllers/Riders.Controllers');
const { registerValidRider, loginValidRider } = require('../Middleware/riders.validate.middle');
const authMiddleware = require('../Middleware/auth.Middleware');

router.post('/register', registerValidRider, riderControllers.registerRider);
router.post('/login', loginValidRider, riderControllers.loginRider);
router.get('/profile', authMiddleware.authRider, riderControllers.getRiderProfile);
router.get('/logout', authMiddleware.authRider, riderControllers.logout);



module.exports = router;
