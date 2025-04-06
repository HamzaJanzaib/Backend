const UserModel = require('../Models/user.model');
const BlackList = require('../Models/blackList.model');
const UserServices = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await UserModel.hashPassword(password);
    const user = await UserServices.CreateUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashPassword });
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ user, token });
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res) => {
    const user = await UserModel.findById(req.user._id);
    res.status(200).json({ user });
}

module.exports.logout = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlackList.create({ token });
    res.status(200).json({ message: 'Logout successfully' });
}
