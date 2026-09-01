const Category = require("../model/category.model");
const { createError } = require("../utils/utils");

const createCategory = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "admin") return next(createError("You are not allowed doing this action", 403));
        const file = req.file;
        let { title, slug, description, image } = req.body;
        image = file ? `/uploads/categories/${file.filename}` : "/uploads/categories/category.png";
        if (!slug) slug = title.split(" ").join("-");
        const result = await Category.create({
            title,
            slug,
            description,
            image
        });
        res.status(201).json({
            statusCode: res.statusCode,
            message: "Category created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const {role} = req.user;
        if(role === "user" || !role) return next(createError("You are not allowed to change this section",403));
        const file = req.file;
        const { slug } = req.params;
        // if (!!file) req.body.image = `uploads/categories/${file.filename}`;
        if (!req.body.slug) req.body.slug = slug;
        const { slug: updateSlug, image, description } = req.body;
        const updateData = {
            description,
            slug: updateSlug
        }
        if(!!file) updateData.image = `/uploads/categories/${file.filename}`;
        const result = await Category.findOneAndUpdate({slug}, {
            $set :updateData
        }, {
            new: true
        });
        if(!result) return next(createError("Category not found", 404));
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Category updated successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const {role} = req.user;
        if(!role || role !=="admin") return next(createError("Unauthorized action", 403));
        const result = await Category.findOneAndDelete({slug});
        if(!result) return next(createError("Category not found", 404));
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Category deleted successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug }).select("title description image slug");
        if (!category) return next(createError(`Not found ${slug} category`, 404));
        res.status(200).json({
            statusCode: res.statusCode,
            data: category
        });
    } catch (error) {
        next(error);
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).select("title description image slug");
        res.status(200).json({
            statusCode: res.statusCode,
            data: categories
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategories,
}