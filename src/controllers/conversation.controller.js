const createHttpError = require('http-errors');
const logger = require('../config/logger.config');
const { doesConversationExist, createConversation, populateConversation, getUserConversations } = require('../services/conversation.service');
const { findUser } = require('../services/user.service');

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

        if (existed_conversation) {
            res.json(existed_conversation);
        } else {
            let receiver_user = await findUser(receiver_id);
            let convoData = { 
                name: receiver_user.name,
                picture: receiver_user.picture,
                isGroup: false,
                users: [sender_id, receiver_id]
            };
            const newConvo = await createConversation(convoData);
            const populatedConvo = await populateConversation(newConvo._id, 'users', '-password');
            res.status(200).json(populatedConvo);
            // res.json(newConvo);
        }
    } catch(error) {
        next(error);
    };
};

const getConversations = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const conversations = await getUserConversations(user_id);
        res.status(200).json(conversations);
    } catch(error) {
        next(error);
    };
};

module.exports = { create_open_conversation, getConversations };