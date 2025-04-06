const { body } = require('express-validator');

module.exports.registerValid = [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

module.exports.loginValid = [
    body('email').isEmail().withMessage('Please enter a valid email').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
