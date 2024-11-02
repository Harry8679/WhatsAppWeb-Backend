const express = require('express');
const trimRequest = require('trim-request');
const authMiddleware = require('../middlewares/auth.middleware');
const { create_open_conversation, getConversations } = require('../controllers/conversation.controller');

const router = express.Router();

router.route('/').post(trimRequest.all, authMiddleware, create_open_conversation);
router.route('/').get(trimRequest.all, authMiddleware, getConversations);

module.exports = router;