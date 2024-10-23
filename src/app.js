const express = require('express');
const morgan = require('morgan');

const app = express();

// Morgan
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello from Server API');
});

module.exports = app;