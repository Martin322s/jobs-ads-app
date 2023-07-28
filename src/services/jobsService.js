const Ad = require('../models/Ad');
const User = require('../models/User');

exports.createAd = async (adData) => await Ad.create(adData);
exports.getAllAds = async () => await Ad.find().lean();
exports.getOneAd = async (adId) => await Ad.findById({ _id: adId }).populate('_ownerId').populate('appliedUsers');
exports.applyForJob = async (adId, userId) =>
    await Ad.findByIdAndUpdate(
        { _id: adId },
        { $push: { appliedUsers: userId } }
    );

exports.deleteAd = async (adId) => await Ad.findByIdAndDelete({ _id: adId });
exports.getUser = async (userId) => await User.findById({ _id: userId });
exports.updateUser = async (userId, userData) => await User.findByIdAndUpdate(userId, userData);
exports.updateAd = async (adId, data) => await Ad.findByIdAndUpdate(adId, data);