import ConversationModel from "../models/conversation.model";

export const doesConversationExist = async (sender_id, receiver_id) => {
    let convo = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $req: sender_id } } },
            { users: { $elemMatch: { $req: receiver_id } } },
        ],
    })
    .populate('users', '-passwords')
    .populate('latestMessage');
};