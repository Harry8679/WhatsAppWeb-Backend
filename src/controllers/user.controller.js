const createHttpError = require("http-errors");
const logger = require("../config/logger.config");

const searchUsers = async (req, res, next) => {
    try {
        const keyword = req.query.search;
        if (!keyword) {
            logger.error('Please add a search query first.');
            throw createHttpError.BadRequest('Oops...Something went wrong.');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { searchUsers };