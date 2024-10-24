const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/refreshToken').post(refreshToken);

module.exports = router;