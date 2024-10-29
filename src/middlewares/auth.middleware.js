const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

export default async function (req, res, next) {
    if(!req.hseader['authorization']) {
        return next(createHttpError.Unauthorized());
    }
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err.name);
            console.log(err.message);
            return;
        }
        req.user = payload;
        next();
    });
}