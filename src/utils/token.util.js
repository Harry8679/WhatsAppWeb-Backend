const jwt = require('jsonwebtoken');
const logger = require('../config/logger.config');

export const sign = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: expiresIn }, (error, token) => {
            if (error) {
                logger.error(error);
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};