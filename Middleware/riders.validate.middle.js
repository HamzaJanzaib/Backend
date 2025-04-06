const { body } = require('express-validator');

module.exports.registerValidRider = [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motercycle', 'auto']).withMessage('Vehicle type must be car, motercycle, or auto'),
];

module.exports.loginValidRider = [
    body('email').isEmail().withMessage('Please enter a valid email').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];