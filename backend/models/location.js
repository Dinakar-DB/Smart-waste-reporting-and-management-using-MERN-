const mongoose = require('mongoose');

// vendoremail  useremail  complaint mobile lat long status
const locationSchema = mongoose.Schema({
    vendoremail: {
        type: String,
        required: true,    
    },
    useremail: {
        type: String,
        required: true,    
    },
    complaint: {
        type: String,
        required: true,    
    },
    mobile: {
        type: Number,
        required: true,    
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: String, // Store as string to prevent automatic conversion to local time in MongoDB
        default: new Date().toISOString(),
    }
})


locationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

locationSchema.set('toJSON', {
    virtuals: true,
});


exports.Location = mongoose.model('Location', locationSchema);
