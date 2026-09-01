const { createCategorySchema, updateCategorySchema } = require("../validation/category.validation");

const createCategoryValidation = (req, res, next) => {
    try {
        const result = createCategorySchema.safeParse(req.body);
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

const updateCategoryValidation = (req, res, next) => {
    try {
        const result = updateCategorySchema.safeParse(req.body);
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
    createCategoryValidation,
    updateCategoryValidation,
}