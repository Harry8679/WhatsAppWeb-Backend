const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('Hello from Server API');
});

module.exports = app;