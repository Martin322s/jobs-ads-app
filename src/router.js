const router = require('express').Router();
const authController = require('./controllers/authController');

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/auth', authController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;