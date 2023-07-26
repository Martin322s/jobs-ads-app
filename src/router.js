const router = require('express').Router();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

module.exports = router;