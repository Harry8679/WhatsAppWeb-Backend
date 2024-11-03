const logger = require('../config/logger.config');
// const { populate } = require('../models/user.model');
const { createMessage, populatedMessage, updateLatestMessage, getConvoMessages } = require('../services/message.service');

const sendMessage = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const { message, convo_id, files } = req.body;

        console.log('Sending message from user:', user_id);
        console.log('Conversation ID:', convo_id);
        console.log('Message:', message);

        if (!convo_id || (!message && !files)) {
            logger.error('Please provide a conversation id and a message body');
            return res.status(400).json({ message: 'Missing data' });
        }

        const msgData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || []
        };
        let newMessage = await createMessage(msgData);
        console.log('Message created:', newMessage);

        let populatedMsg = await populatedMessage(newMessage._id);
        console.log('Populated message:', populatedMsg);

        await updateLatestMessage(convo_id, newMessage);
        res.json(populatedMsg);
    } catch (error) {
        console.error(error);
        next(error);
    }
};



const getMessage = async (req, res, next) => {
    try {
        const convo_id = req.params.convo_id;
        if (!convo_id) {
            logger.error('Please add a conversation id in params');
            res.sendStatus(400);
        }
        const messages = await getConvoMessages(convo_id);
        res.json(messages);
    } catch (error) {
        next(error);
    };
};

module.exports = { sendMessage, getMessage };