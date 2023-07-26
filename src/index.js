const express = require('express');
const databaseConnection = require('../config/database');
const viewEngineSetup = require('../config/handlebars');
const cookieParser = require('cookie-parser');
const router = require('./router');
const app = express();
const port = 3000;

viewEngineSetup(app);
app.use(cookieParser());
app.use(router);

databaseConnection()
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch(err => {
        console.log(`Database connection error: ${err}`);
    });