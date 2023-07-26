const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/logout', (req, res) => {
    res.send('Unauthorized');
});

module.exports = router;