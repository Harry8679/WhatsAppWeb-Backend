const createHttpError = require('http-errors');
const logger = require('../config/logger.config');
const { doesConversationExist } = require('../services/conversation.service');

const create_open_conversation = async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const { receiver_id } = req.body;
        // Check if receiver_id is provided
        if (!receiver_id) {
            logger.error('Please provide the user id you wanna start a conversation with !');
            throw createHttpError.BadRequest('Something went wrong');
        }
        // Check if chat exists
        const existed_conversation = await doesConversationExist(sender_id, receiver_id);
        res.send('Conversation created');
    } catch(error) {
        next(error);
    };
};

module.exports = { create_open_conversation };