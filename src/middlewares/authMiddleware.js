const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRET } = require('../../config/constants');
const jwtVerify = promisify(jwt.verify);

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers['cookie']?.substring(8);
    
    if (token) {
        const decodedToken = await jwtVerify(token, SECRET);
        res.locals.email = decodedToken.email;
        res.locals.user = decodedToken._id;
        req.user = decodedToken._id;
        next();
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
}