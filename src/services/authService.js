const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../config/constants');

exports.registerUser = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    try {
        if (!user) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const user = await User.create({ ...userData, password: hashedPassword });
            return user;
        } else {
            throw { message: 'User with this email already exsists!' }
        }
    } catch (err) {
        return err;
    }
};