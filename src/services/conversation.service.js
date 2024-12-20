const createHttpError = require("http-errors");
const ConversationModel = require("../models/conversation.model");
const UserModel = require('../models/user.model');


const doesConversationExist = async (sender_id, receiver_id) => {
    let convos = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: sender_id } } },
            { users: { $elemMatch: { $eq: receiver_id } } },
        ],
    })
    .populate('users', '-passwords')
    .populate('latestMessage');

    if (!convos) throw createHttpError.BadRequest('Oops...Something went wrong !');

    // Populate message model
    convos = await UserModel.populate(convos, {
        path: 'latestMessage.sender',
        select: 'name email picyire status'
    });

    return convos[0];
};

const createConversation = async (data) => {
    const newConvo = await ConversationModel.create(data);
    if (!newConvo) {
        throw createHttpError.BadRequest('Oops...Something went wrong !');
    }
    return newConvo;
}

const populateConversation = async(id, fieldToPopulate, fieldsToRemove) => {
    const populatedConvo = await ConversationModel.findOne({ _id: id}).populate(fieldToPopulate, fieldsToRemove);

    if (!populatedConvo) {
        throw createHttpError.BadRequest('Oops...Something went wrong !');
    }

    return populatedConvo;
}

const getUserConversations = async(user_id) => {
    let conversations;
    await ConversationModel.find({ users: { $elemMatch: { $eq: user_id } } })
    .populate('users', '-password').populate('admin', '-password').populate('latestMessage')
    .sort({ updatedAt: -1 })
    .then(async(results) => {
        results = await UserModel.populate(results, {
            path: 'latestMessage.sender',
            select: 'name email picture status'
        });
        conversations = results;
    })
    .catch((err) => {
        throw createHttpError.BadRequest('Oops...Something went wrong !');
    });
    return conversations;
};

module.exports = { doesConversationExist, createConversation, populateConversation, getUserConversations };