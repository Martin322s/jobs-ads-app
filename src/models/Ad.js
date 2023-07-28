const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        minLength: 4
    },
    location: {
        type: String,
        required: true,
        minLength: 8
    },
    companyName: {
        type: String,
        required: true,
        minLength: 3
    },
    companyDescription: {
        type: String,
        required: true,
        maxLength: 40
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