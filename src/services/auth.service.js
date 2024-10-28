const createHttpError  = require('http-errors');
const validator = require('validator');
const UserModel = require('../models/user.model');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async(userData) => {
    const { name, email, picture, status, password } = userData;

    // Check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Please fill all fields');
    }

    // Check name length
    if (!validator.isLength(name, { min:2, max: 16 })) {
        throw createHttpError.BadRequest('Please make sure your name is between 2 and 16 characters long.');
    }

    // Check status length
    if (status) {
        throw createHttpError.BadRequest('Please make sure your status is less than 64 characters long.');
    }

    // Check if email address is valid
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please make sure to provide a valid email address');
    };

    // Check if user already exists
    const checkDb = await UserModel.findOne({ email });
    if (checkDb) {
        throw createHttpError.Conflict('Please try again with a different email address, this email already exists.');
    }

    // Check password length
    if (!validator.isLength(password, { min:6, max: 128 })) {
        throw createHttpError.BadRequest('Please make sure your password is between 6 and 128 characters long.');
    }

    // Hash password --> to be done in the user model

    // a
    const user = await new UserModel({
        name,
        email,
        picture: picture || process.env.DEFAULT_PICTURE,
        status: status || process.env.DEFAULT_STATUS,
        password
    }).save();

    return user;
}

const signUser = async (email, password) => {}

module.exports = { createUser, signUser };