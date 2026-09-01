const { verifyToken } = require("../utils/jwt");
const { createError } = require("../utils/utils");
const { registerSchema, roleSchema, loginSchema, userUpdateSchema } = require("../validation/auth.validation")

const registerValidation = (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                errors[field] = issue.message;
            });
            return res.status(400).json({
                statusCode: 400,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error)
    }
}

const loginValidation = (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            return res.status(400).json({
                statusCode: 400,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const roleValidation = (req, res, next) => {
    try {
        const result = roleSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            return res.status(400).json({
                statusCode: 400,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const userUpdateValidation = (req, res, next) => {
    try {
        const result = userUpdateSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            return res.status(400).json({
                statusCode: 400,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const authintication = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || authorization === undefined) {
            return next(createError("Authorization failed.Please log into your accont.", 401));
        }
        const [bearer, token] = authorization.split(" ");
        if (!bearer || bearer.toLowerCase() !== "bearer") {
            return next(createError("Authorization failed.Please log into your accont.", 401));
        }
        if (!token) return next(createError("Authorization failed.Please log into your accont.", 401));
        const result = verifyToken(token);
        if (!result) return next(createError("Invalid information.Please login again", 401));
        req.user = {
            role: result.role,
            id: result.id
        }
        console.log(req.user);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    roleValidation,
    authintication,
    userUpdateValidation,
}