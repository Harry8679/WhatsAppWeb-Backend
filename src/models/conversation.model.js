const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Conversation name is required'],
        trim: true,
    },
    picture: {
        type: String,
        trim: true,
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false,
    },
    users: [
        {
            type: ObjectId,
            ref: 'UserModel',
        },
    ],
    latestMessage: {
        type: ObjectId,
        ref: 'MessageModel',
    },
    admin: {
        type: ObjectId,
        ref: 'UserModel',
    }
}, {
    collection: 'conversions',
    timestamps: true,
});

const ConversationModel = mongoose.model.ConversationModel || mongoose.model('ConversationModel', conversationSchema);

module.exports = ConversationModel;