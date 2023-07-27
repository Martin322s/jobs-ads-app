const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, rePassword, description } = req.body;
    try {
        if (!Object.values(req.body).some(x => x === '')) {
            if (password === rePassword) {
                const user = await authService.registerUser({ email, password, description });

                if (typeof user === 'object') {
                    const token = await authService.generateToken(user);
                    res.cookie('session', token);
                    res.status(200).redirect('/');
                } else {
                    res.status(400).render('auth/register', { error: user });
                }
            } else {
                throw {
                    message: 'Passwords don\'t match!'
                }
            }
        } else {
            throw {
                message: 'All fields must be filled correctly!'
            }
        }
    } catch (err) {
        res.status(400).render('auth/register', { error: err.message });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/logout', (req, res) => {
    res.send('Unauthorized');
});

module.exports = router;