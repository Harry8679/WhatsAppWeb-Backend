const createHttpError = require("http-errors");
const ConversationModel = require("../models/conversation.model");
const UserModel = require('../models/user.model');


export const doesConversationExist = async (sender_id, receiver_id) => {
    let convos = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $req: sender_id } } },
            { users: { $elemMatch: { $req: receiver_id } } },
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