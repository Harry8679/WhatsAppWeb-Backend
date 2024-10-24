const express = require('express');

const router = express.Router();

router.route('/register').post((req, res) => {
    res.send('Hello from Register!');
});

module.exports = router;