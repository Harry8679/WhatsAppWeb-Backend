const createHttpError = require("http-errors");

const searchUsers = async (req, res, next) => {
    try {
        const keyword = req.query.search;
        if (!keyword) {
            throw createHttpError.BadRequest('Please add a search term first.');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { searchUsers };