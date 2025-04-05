const UserModel = require('../Models/user.model');
const UserServices = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { fullname , email, password } = req.body;

    const hashPassword = await UserModel.hashPassword(password);
    const user = await UserServices.CreateUser({ firstname : fullname.firstname, lastname : fullname.lastname, email, password: hashPassword });

    const token = user.generateAuthToken();
    
    console.log(token);

    res.status(201).json({ user, token });

}