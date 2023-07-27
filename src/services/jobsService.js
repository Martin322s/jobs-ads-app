const Ad = require('../models/Ad');

exports.createAd = async (adData) => await Ad.create(adData);
exports.getAllAds = async () => await Ad.find().lean();