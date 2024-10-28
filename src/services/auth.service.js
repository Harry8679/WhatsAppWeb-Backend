const createHttpError  = require('http-errors');

const createUser = async(userData) => {
    const { name, email, picture, status, password } = userData;

    // Check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Please fill all fields');
    }
}

module.exports = createUser;