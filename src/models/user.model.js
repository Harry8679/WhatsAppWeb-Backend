const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: [true, 'This email address already exist'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    picture: {
        type: String,
        default: 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    },
    status: {
        type: String,
        default: 'Hey there ! I am using whatsapp'
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: [6, 'Please make sure you have at least 6 characters'],
        maxLength: [128, 'Please make sure your password is less than 128 characters long']
    }
}, {
    collection: 'user',
    timestamps: true
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);
module.exports = UserModel;