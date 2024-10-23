const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config();
const app = express();

// Morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Helmet
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello from Server API');
});

module.exports = app;