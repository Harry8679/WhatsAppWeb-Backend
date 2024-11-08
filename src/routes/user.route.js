const express = require('express');
const trimRequest = require('trim-request');
const authMiddleware = require('../middlewares/auth.middleware');
const { searchUsers } = require('../controllers/user.controller');
const router = express.Router();

// router.route('/').get(trimRequest.all, authMiddleware, searchUsers);
router.route('/').get(searchUsers);

module.exports = router;