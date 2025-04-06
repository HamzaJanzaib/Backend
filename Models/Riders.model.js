const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const riderSchema = new mongoose.Schema({
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
    status: {
        type: String,
        default: 'inactive',
        enum: ['inactive', 'active']
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters']
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motercycle', 'auto']
        }
    },
    location: {
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        }
    }
});

riderSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

riderSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

riderSchema.methods.hashPassword = async function () {
    return await bcrypt.hash(this.password, 10);
}

// Static method to hash a password
riderSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const RiderModel = mongoose.model('rider', riderSchema);
module.exports = RiderModel;
