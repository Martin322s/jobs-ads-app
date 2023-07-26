const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./constants');

const databaseConnection = () => {
    return mongoose.connect(CONNECTION_STRING);
};

module.exports = databaseConnection;