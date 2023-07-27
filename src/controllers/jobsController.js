const router = require('express').Router();
const jobsService = require('../services/jobsService');
const authService = require('../services/authService');

router.get('/catalog', async (req, res) => {
    const all = await jobsService.getAllAds();
    const isLoggedIn = req.user !== undefined ? true : false;
    all.map(x => x.isLoggedIn = isLoggedIn);
    res.render('jobs/catalog', { all, isLoggedIn });
});

router.get('/create-offer', (req, res) => {
    res.render('jobs/create');
});

router.post('/create-offer', async (req, res) => {
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
    console.log(detailedAd._ownerId._id, req.user);
    res.render('jobs/details', {
        isOwner: detailedAd._ownerId._id === req.user,
        email: detailedAd._ownerId.email,
        _id: detailedAd._id,
        headline: detailedAd.headline,
        location: detailedAd.location,
        companyName: detailedAd.companyName,
        companyDescription: detailedAd.companyDescription
    });
});

router.get('/edit', (req, res) => {
    res.render('jobs/edit');
});

router.get('/search', (req, res) => {
    res.render('search');
});

module.exports = router;