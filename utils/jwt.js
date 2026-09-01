const jwt = require("jsonwebtoken");
const { createError } = require("./utils");

const createToken = payload => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
}

const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        throw createError("Invalid or expired token", 401);
    }
}

module.exports = {
    createToken,
    verifyToken,
}