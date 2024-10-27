const { createUser } = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        // console.log(name, email, picture, status, password);
        const newUser = createUser({ name, email, picture, status, password });
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