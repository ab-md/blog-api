const { default: z } = require("zod");

const createPostSchema = z.object({
    title: z.string().min(7).max(60).trim(),
    text: z.string().min(20).trim(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    slug: z.string().min(5).max(70).trim().optional(),
    status: z.enum(["published", "pending"]).optional(),
}).strict();

const updatePostSchema = z.object({
    title: z.string().min(7).max(60).trim().optional(),
    text: z.string().min(20).trim().optional(),
    slug: z.string().min(5).max(70).trim().optional(),
    status: z.enum(["published", "pending"]).optional(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID").optional()
}).strict();

module.exports = {
    createPostSchema,
    updatePostSchema,
}