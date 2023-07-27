const User = require('../models/User');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtSign = promisify(jwt.sign);
const { SALT_ROUNDS, SECRET } = require('../../config/constants');

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

exports.generateToken = async (user) => {
    const payload = { _id: user._id, email: user.email };
    const options = { expiresIn: '2h', algorithm: 'RS256' };
    const token = await jwtSign(payload, SECRET, options);
    return token;
};