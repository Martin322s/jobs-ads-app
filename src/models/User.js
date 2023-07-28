const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                const regex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/gm;
                return regex.test(this.email);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 40
    },
    myAds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;