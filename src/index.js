const express = require('express');
const databaseConnection = require('../config/database');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

databaseConnection()
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch(err => {
        console.log(`Database connection error: ${err}`);
    });