const createHttpError = require('http-errors');
const { MessageModel, ConversationModel } = require('../models/index');

const createMessage = async (data) => {
    let newMessage = await MessageModel.create(data);
    if (!newMessage) {
        throw createHttpError.BadRequest('Oops...Something went wrong !');
    }
    return newMessage;
}

const populatedMessage = async (id) => {
    let msg = await MessageModel.findById(id)
        .populate({
            path: 'sender',
            select: 'name picture',
            model: 'UserModel'
        })
        .populate({
            path: 'conversation',
            select: 'name isGroup users',
            model: 'ConversationModel',
            populate: {
                path: 'users',
                select: 'name email picture status',
                model: 'UserModel'
            }
        });
    if (!msg) throw createHttpError.BadRequest('Oops...Something went wrong !');
    return msg;
}

const updateLatestMessage = async (convo_id, msg) => {
    try {
        // Vérifiez que convo_id existe
        const conversation = await ConversationModel.findById(convo_id);
        if (!conversation) {
            throw createHttpError.BadRequest(`Conversation with ID ${convo_id} not found`);
        }
        
        // Mettez à jour la conversation avec latestMessage
        const updatedConvo = await ConversationModel.findByIdAndUpdate(
            convo_id,
            { latestMessage: msg._id },
            { new: true }
        );

        if (!updatedConvo) {
            throw createHttpError.BadRequest(`Failed to update latestMessage for conversation ${convo_id}`);
        }

        console.log("Conversation successfully updated with latest message:", updatedConvo);
        return updatedConvo;

    } catch (error) {
        console.error("Error in updateLatestMessage:", error);
        throw createHttpError.BadRequest('Oops...Something went wrong in updateLatestMessage!');
    }
};

const getConvoMessages = async (convo_id) => {
    const messages = await MessageModel.find({ conversation: convo_id })
        .populate('sender', 'name picture email status')
        .populate('conversation');
    if (!messages) {
        throw createHttpError.BadRequest('Oops...Something went wrong !');
    }
    return messages;
};

module.exports = { createMessage, populatedMessage, updateLatestMessage, getConvoMessages };
