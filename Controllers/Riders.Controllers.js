const RiderModel = require('../Models/Riders.model');
const BlackList = require('../Models/blackList.model');
const RiderServices = require('../services/Riders.services');
const { validationResult } = require('express-validator');

module.exports.registerRider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isRider = await RiderModel.findOne({ email });
    if (isRider) {
        return res.status(401).json({ message: 'Rider already exists' });
    }
    const hashPassword = await RiderModel.hashPassword(password);
    const rider = await RiderServices.createRider({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashPassword, color: vehicle.color, plate: vehicle.plate, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType });
    const token = rider.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ rider, token });
}

module.exports.loginRider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const rider = await RiderModel.findOne({ email }).select('+password');
    if (!rider) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await rider.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = rider.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ rider, token });
}

module.exports.getRiderProfile = async (req, res) => {
    const rider = await RiderModel.findById(req.Rider._id);
    res.status(200).json({ rider });
}

module.exports.logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlackList.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}