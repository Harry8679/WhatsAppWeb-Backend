const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'UserModel'
    },
    message: {
        type: String,
        trim: true
    },
    conversation: {
        type: String,
        ref: 'ConversationModel'
    },
    files: [],
}, {
    collection: 'messages',
    timestamps: true
});

const MessageModel = mongoose.MessageModel || mongoose.model('MessageModel', messageSchema);

module.exports = MessageModel;