const createUser = require("../services/auth.service");
const dotenv = require('dotenv');
const generateToken = require("../services/token.service");
// const { generateToken } = require("../services/token.service");
dotenv.config();

const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        // console.log(name, email, picture, status, password);
        const newUser = await createUser({ name, email, picture, status, password });

        const access_token = await generateToken({ userId: newUser._id}, '1d', process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: newUser._id}, '30d', process.env.REFRESH_TOKEN_SECRET);

        res.status(201).json({ 
            message: 'Register Success.',
            access_token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {} catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {} catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {} catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout, refreshToken };