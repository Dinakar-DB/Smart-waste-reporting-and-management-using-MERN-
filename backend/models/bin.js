const mongoose = require('mongoose');

const binSchema = mongoose.Schema({
    adminemail: {
        type: String,
        required: true,    
    },
    area: {
        type: String,
        required: true,    
    },
    locality: {
        type: String,
        required: true,    
    },
    landmark: {
        type: String,
        required: true,    
    },
    city: {
        type: String,
        required: true,    
    },
    loadtype: {
        type: String,
        required: true,    
    },
    driveremail: {
        type: String,
        required: true,    
    },
    cycleperiod: {
        type: String,
        required: true,    
    },
    bestroute: {
        type: String,
        required: true,    
    },
    lat: {
        type: Number,  
        default: 0,         
    },
    long: {
        type: Number,
        default: 0,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})


binSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

binSchema.set('toJSON', {
    virtuals: true,
});


exports.Bin = mongoose.model('Bin', binSchema);
