const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {  // Remplace `export default` par `module.exports =`
    if (!req.headers['authorization']) {
        return next(createHttpError.Unauthorized());
    }
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err.name);
            console.log(err.message);
            return next(createHttpError.Unauthorized());
        }
        req.user = payload;
        next();
    });
};
