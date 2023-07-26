const router = require('express').Router();
const authController = require('./controllers/authController');
const jobsController = require('./controllers/jobsController');

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/auth', authController);
router.use('/jobs', jobsController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;