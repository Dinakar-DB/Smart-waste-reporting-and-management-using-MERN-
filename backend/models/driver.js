const mongoose = require('mongoose');


// name, email, password, phone, city, question1, question2

const driverSchema = new mongoose.Schema({
    adminemail: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: true,
    },
    area: {
        type: String,
        default: true,
    },
    aadharno: {
        type: String,
        required: true,
    }
});

driverSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

driverSchema.set('toJSON', {
    virtuals: true,
});

exports.Driver = mongoose.model('Driver', driverSchema);
exports.driverSchema = driverSchema;
