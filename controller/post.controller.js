const Category = require("../model/category.model");
const Post = require("../model/post.model");
const { createError } = require("../utils/utils");

const createPost = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (!role || role === "user") return next(createError("Unauthorized action", 403));
        let { title, slug, text, category, status } = req.body;
        if (!slug && title) slug = title.split(" ").join("-").toLowerCase(); //here
        if (!status) status = "pending";
        const validCategory = await Category.findById(category);
        if (!validCategory) return next(createError("Category not found", 404));
        const initialData = { //dynamic data
            title,
            slug,
            text,
            category,
            status
        }
        initialData.author = req.user.id;
        initialData.image = req.file ? `/uploads/posts/${req.file.filename}` : "/uploads/posts/post.png";
        const result = await Post.create(initialData);
        res.status(201).json({
            statusCode: res.statusCode,
            message: "Post created successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { slug } = req.params;
        const file = req.file;
        const { title, text, status, category } = req.body;
        const post = await Post.findOne({ slug });
        if (!post) return next(createError("Post not found", 404));

        if (!req.body.slug) req.body.slug = slug;

        const updateData = {};
        if (title !== undefined) {
            updateData.title = title;
        }
        if (text !== undefined) {
            updateData.text = text;
        }
        if (category !== undefined) {
            updateData.category = category;
        }
        if (status !== undefined) {
            updateData.status = status;
        }
        if (!!file) updateData.image = `/uploads/posts/${file.filename}`;

        if (!role || role === "user") return next(createError("Unauthorized action", 403));
        if(role !== "admin" && req.user.id !== post.author.toString()) {
            return next(createError("Unauthorized action", 403));
        }
        const result = await Post.findOneAndUpdate({ slug }, {
            $set: updateData
        }, {
            new: true
        });
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Post updated successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { slug } = req.params;
        const blackList = ["user", "editor"];
        if (!role || blackList.includes(role)) return next(createError("Unauthorized action", 403));
        const result = await Post.findOneAndDelete({ slug });
        if (!result) return next(createError("Post not found", 404));
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Post deleted successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const getPost = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { slug } = req.params;
        const post = await Post.findOne({ slug }).select("title text image author category status slug").lean();
        if (!post) return next(createError("Not found post", 404));
        if (!role || role === "user" && post.status !== "published") return next(createError("This post is not available", 403))
        res.status(200).json({
            statusCode: res.statusCode,
            data: post
        })
    } catch (error) {
        next(error);
    }
}

const getPosts = async (req, res, next) => {
    try {
        const { role } = req.user;
        const posts = await Post.find({}).select("title text image author category status slug");
        const published = posts.filter(post => post.status === "published");
        if (!role || role === "user") {
            return res.status(200).json({
                statusCode: res.statusCode,
                data: published
            });
        }
        res.status(200).json({
            statusCode: res.statusCode,
            data: posts
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
}