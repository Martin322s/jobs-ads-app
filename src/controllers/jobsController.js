const router = require('express').Router();
const jobsService = require('../services/jobsService');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    const all = await jobsService.getAllAds();
    const isLoggedIn = req.user !== undefined ? true : false;
    all.map(x => x.isLoggedIn = isLoggedIn);
    res.render('jobs/catalog', { all, isLoggedIn });
});

router.get('/create-offer', isAuth, (req, res) => {
    res.render('jobs/create');
});

router.post('/create-offer', isAuth, async (req, res) => {
    const userId = req.user;
    const adData = req.body

    try {
        if (!Object.values(req.body).some(x => x === '')) {
            const newAd = await jobsService.createAd({ ...adData, _ownerId: userId });
            await authService.addNewAdd(userId, newAd._id);
            res.redirect('/jobs/catalog');
        } else {
            throw { message: 'All fields must be filled correctly!' };
        }
    } catch (err) {
        res.status(400).render('jobs/create', { error: err.message });
    }
});

router.get('/details/:adId', async (req, res) => {
    const adId = req.params.adId;
    const detailedAd = await jobsService.getOneAd(adId);
    const appliedUsers = detailedAd.appliedUsers.map(x => (
        { _id: x._id, email: x.email, description: x.description }
    ));
    const isApplied = appliedUsers
        .findIndex(x => x._id.toString() === req.user) !== -1 ? true : false;

    res.render('jobs/details', {
        isOwner: detailedAd._ownerId._id.toString() === req.user,
        email: detailedAd._ownerId.email,
        _id: detailedAd._id,
        headline: detailedAd.headline,
        location: detailedAd.location,
        companyName: detailedAd.companyName,
        companyDescription: detailedAd.companyDescription,
        appliedUsers: appliedUsers,
        countOfAppliedUsers: appliedUsers.length,
        isApplied: isApplied
    });
});

router.get('/edit/:adId', isAuth, async (req, res) => {
    const ad = await jobsService.getOneAd(req.params.adId);
    res.render('jobs/edit', {
        headline: ad.headline,
        location: ad.location,
        companyName: ad.companyName,
        companyDescription: ad.companyDescription
    });
});

router.post('/edit/:adId', isAuth, async (req, res) => {
    await jobsService.updateAd(req.params.adId, req.body);
    res.redirect(`/jobs/details/${req.params.adId}`);
});

router.get('/delete/:adId', isAuth, async (req, res) => {
    const ad = await jobsService.getOneAd(req.params.adId);
    const user = await jobsService.getUser(req.user);
    const newAds = user.myAds.filter(x => x.toString() !== req.params.adId);
    user.myAds = newAds;
    await jobsService.deleteAd(req.params.adId);
    await jobsService.updateUser(user._id, user);
    res.redirect('/jobs/catalog');
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {
    const user = await jobsService.getUserByEmail(req.body.search);
    const allAds = await jobsService.getAllAds();
    const searchedAds = allAds.filter(x => x._ownerId.toString() === user?._id.toString()).map(x => ({
        headline: x.headline,
        companyName: x.companyName
    }));
    
    res.render('search', { searchedAds, searchedEmail: user?.email });
});

router.get('/apply/:adId', isAuth, async (req, res) => {
    const adId = req.params.adId;
    const userId = req.user;
    await jobsService.applyForJob(adId, userId);
    res.redirect(`/jobs/details/${adId}`);
});

module.exports = router;