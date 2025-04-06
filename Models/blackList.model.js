const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const BlackList = mongoose.model('blacklist', blackListSchema);
module.exports = BlackList;