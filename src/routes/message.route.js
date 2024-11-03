const express = require('express');
const trimRequest = require('trim-request');
const authMiddleware = require('../middlewares/auth.middleware');
const { sendMessage, getMessage } = require('../controllers/message.controller');

const router = express.Router();

router.route('/').post(trimRequest.all, authMiddleware, sendMessage);
router.route('/:convo_id').get(trimRequest.all, authMiddleware, getMessage);

module.exports = router;