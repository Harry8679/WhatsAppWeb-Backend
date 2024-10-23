const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Server API');
});

module.exports = app;