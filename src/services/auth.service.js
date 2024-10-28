const createHttpError  = require('http-errors');
const validator = require('validator');

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
}

module.exports = createUser;