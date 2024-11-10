const UserModel = require('../models/user.model');
const createHttpError = require('http-errors');

const findUser = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError.BadRequest('Please fill all fields.');
    return user;
}

const searchUser = async(keyword, userId) => {
    const users = await UserModel.find({
        $or : [
            { name: {$regex: keyword, $options: 'i'} },
            { email: {$regex: keyword, $options: 'i'} },
        ]
    }).find({ _id: { $ne: userId } });
    return users;
};

module.exports = { findUser, searchUser };