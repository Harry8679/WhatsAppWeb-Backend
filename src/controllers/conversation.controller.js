const createHttpError = require('http-errors');
const logger = require('../config/logger.config');

const create_open_conversation = async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const { receiver_id } = req.body;
        // Check if receiver_id is provided
        if (!receiver_id) {
            logger.error('Please provide the user id you wanna start a conversation with !');
            throw createHttpError.BadRequest('Something went wrong');
        }
        res.send('Conversation created');
    } catch(error) {
        next(error);
    };
};

module.exports = { create_open_conversation };