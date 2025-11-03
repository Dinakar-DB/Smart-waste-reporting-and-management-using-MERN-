const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    driveremail: {
        type: String,
        required: true,    
    },
    binarea: {
        type: String,
        required: true,    
    },
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


workSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

workSchema.set('toJSON', {
    virtuals: true,
});


exports.Work = mongoose.model('Work', workSchema);
