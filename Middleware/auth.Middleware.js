const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    const blackListToken = await BlackList.findOne({ token });
    if (blackListToken) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        return next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized.' });
    }
}
