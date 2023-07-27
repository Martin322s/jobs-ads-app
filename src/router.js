const router = require('express').Router();
const authController = require('./controllers/authController');
const jobsController = require('./controllers/jobsController');
const jobsService = require('./services/jobsService');

router.get('/', async (req, res) => {
    const all = await jobsService.getAllAds();
    const lastThree = all.slice(all.length - 3).reverse();
    lastThree.map(x => x.candidates = x.appliedUsers.length);
    res.render('index', { lastThree });
});

router.use('/auth', authController);
router.use('/jobs', jobsController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;