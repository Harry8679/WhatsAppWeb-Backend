const UserModel = require('../models/user.model');
const createHttpError = require('http-errors');

const findUser = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError.BadRequest('Please fill all fields.');
    return user;
}

module.exports = { findUser };