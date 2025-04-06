const express = require('express');
const router = express.Router();
const riderControllers = require('../Controllers/Riders.Controllers');
const { registerValidRider } = require('../Middleware/riders.validate.middle');

router.post('/register', registerValidRider, riderControllers.registerRider);


module.exports = router;
