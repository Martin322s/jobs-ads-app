const express = require('express');
const databaseConnection = require('../config/database');
const viewEngineSetup = require('../config/handlebars');
const cookieParser = require('cookie-parser');
const router = require('./router');
const { authMiddleware } = require('./middlewares/authMiddleware');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
viewEngineSetup(app);
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);

databaseConnection()
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch(err => {
        console.log(`Database connection error: ${err}`);
    });