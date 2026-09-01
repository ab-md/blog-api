const { default: z } = require("zod");

const createCommentSchema = z.object({
    text: z.string().min(20).trim(),
    post: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID"),
}).strict();

const updateCommentSchema = z.object({
    status: z.enum(["published", "pending", "rejected"]),
}).strict();

module.exports = {
    createCommentSchema,
    updateCommentSchema,
}