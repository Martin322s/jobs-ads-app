const router = require('express').Router();
const authController = require('./controllers/authController');

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/auth', authController);

module.exports = router;