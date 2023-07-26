const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('jobs/catalog')
});

module.exports = router;