const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('jobs/catalog')
});

router.get('/create-offer', (req, res) => {
    res.render('jobs/create');
});

router.get('/details', (req, res) => {
    res.render('jobs/details');
});

router.get('/edit', (req, res) => {
    res.render('jobs/edit');
});

router.get('/search', (req, res) => {
    res.render('search');
});

module.exports = router;