const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/auth.controller');
const trimRequest = require('trim-request');

const router = express.Router();

router.route('/register').post(trimRequest.all, register);
router.route('/login').post(trimRequest.all, login);
router.route('/logout').post(trimRequest.all, logout);
router.route('/refreshToken').post(trimRequest.all, refreshToken);
router.route('/testingauthMiddleware').get(trimRequest.all, (req, res) => {
    res.send(req.user);
});
// router.route('/testingauthMiddleware').get()

module.exports = router;