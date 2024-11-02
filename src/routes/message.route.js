const express = require('express');
const trimRequest = require('trim-request');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').post(trimRequest.all, authMiddleware);