const { createUser, signUser } = require("../services/auth.service");
const dotenv = require('dotenv');
const { generateToken, verifyToken } = require("../services/token.service");
const createHttpError = require("http-errors");
const { findUser } = require("../services/user.service");
dotenv.config();

const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        const newUser = await createUser({ name, email, picture, status, password });

        const access_token = await generateToken({ userId: newUser._id}, '1d', process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: newUser._id}, '30d', process.env.REFRESH_TOKEN_SECRET);

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshToken',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        console.table({ access_token, refresh_token });

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
    try {
        const { email, password } = req.body;
        const user = await signUser(email, password);
        // res.json(user);
        const access_token = await generateToken({ userId: user._id }, '1d', process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: user._id }, '30d', process.env.REFRESH_TOKEN_SECRET);

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshtoken',
            max: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            message: 'Login Success',
            access_token,
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            status: user.status,
        })
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshtoken', { path: '/api/v1/auth/refreshtoken' });
        res.json({ message: 'Logged out !' });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refreshtoken;
        if (!refresh_token) throw createHttpError.Unauthorized('Please Login.');
        const check = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        // const user = await findUser(check.id);
        const user = await findUser(check.userId);
        const access_token = await generateToken({ userId: user._id }, '1d', process.env.ACCESS_TOKEN_SECRET);
        // res.json(check);
        res.json({
            access_token,
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            status: user.status,
        })
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout, refreshToken };