const { default: z } = require("zod");

const createCategorySchema = z.object({
    title: z.string().min(7).max(60).trim(),
    slug: z.string().min(7).max(70).trim().optional(),
    description: z.string().min(20).max(300).trim(),
}).strict();

const updateCategorySchema = z.object({
    slug: z.string().min(7).max(70).trim().optional(),
    description: z.string().min(20).max(300).trim().optional(),
}).strict();

module.exports = {
    createCategorySchema,
    updateCategorySchema,
}