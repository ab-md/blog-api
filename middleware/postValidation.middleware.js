const { createPostSchema, updatePostSchema } = require("../validation/post.validation");

const createPostValidation = (req, res, next) => {
    try {
        const result = createPostSchema.safeParse(req.body);
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

const updatePostValidation = (req, res, next) => {
    try {
        const result = updatePostSchema.safeParse(req.body);
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
    createPostValidation,
    updatePostValidation,
}