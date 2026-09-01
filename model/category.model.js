const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    image: { type: String, default: "/uploads/categories/category.png" },
    description: { type: String, required: true, trim: true }
});

const Category = model("Category", categorySchema);

module.exports = Category;