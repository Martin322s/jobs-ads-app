const Ad = require('../models/Ad');

exports.createAd = async (adData) => await Ad.create(adData);
exports.getAllAds = async () => await Ad.find().lean();
exports.getOneAd = async (adId) => await Ad.findById({ _id: adId }).populate('_ownerId').populate('appliedUsers');
exports.applyForJob = async (adId, userId) =>
    await Ad.findByIdAndUpdate(
        { _id: adId },
        { $push: { appliedUsers: userId } }
    );