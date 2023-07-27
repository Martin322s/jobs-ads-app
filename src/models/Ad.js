const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headeline: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    appliedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;