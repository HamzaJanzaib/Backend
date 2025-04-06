const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const useSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },

});

useSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

useSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

useSchema.methods.hashPassword = async function () {
    return await bcrypt.hash(this.password, 10);
}

// Static method to hash a password
useSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const UserModel = mongoose.model('user', useSchema);
module.exports = UserModel;