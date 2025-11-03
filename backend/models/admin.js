const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }

});

adminSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

adminSchema.set('toJSON', {
    virtuals: true,
});

exports.Admin = mongoose.model('Admin', adminSchema);
exports.adminSchema = adminSchema;
