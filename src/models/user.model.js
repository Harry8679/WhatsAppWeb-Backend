const mongoose = require('mongoose');

const userSchela = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: [true, 'This email address already exist']
    }
});