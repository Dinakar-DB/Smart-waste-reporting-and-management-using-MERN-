const mongoose = require('mongoose');


const complaintSchema = mongoose.Schema({
    binarea: {
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
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})



complaintSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

complaintSchema.set('toJSON', {
    virtuals: true,
});


exports.Complaint = mongoose.model('Complaint', complaintSchema);
exports.complaintSchema = complaintSchema;