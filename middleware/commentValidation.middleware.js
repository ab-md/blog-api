const { createCommentSchema, updateCommentSchema } = require("../validation/comment.validation");

const createCommentValidation = (req, res, next) => {
    try {
        const result = createCommentSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            })
            return res.status(400).json({
                statusCode: res.statusCode,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const updateCommentValidation = (req, res, next) => {
    try {
        const result = updateCommentSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            })
            return res.status(400).json({
                statusCode: res.statusCode,
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCommentValidation,
    updateCommentValidation,
}