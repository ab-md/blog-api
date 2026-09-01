const { isValidObjectId } = require("mongoose");
const Comment = require("../model/comment.model");
const { createError } = require("../utils/utils");
const Post = require("../model/post.model");

const createComment = async (req, res, next) => {
    try {
        const { role, id: userId } = req.user;
        if (!role) return next(createError("Log into your account first", 403));
        const { text, post: postId } = req.body;
        const isPost = await Post.findById(postId);
        if (!isPost) return next(createError("Post not found", 404));
        if (isPost.status === "pending") return next(createError("Restrictd action", 403));
        const result = await Comment.create({
            text,
            user: userId,
            post: postId
        });
        res.status(201).json({
            statusCode: res.statusCode,
            message: "Comment created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { id } = req.params;
        const { status } = req.body;
        if (!isValidObjectId(id)) return next(createError("Invalid ID", 404));
        if (!role || role === "user") return next(createError("Unauthorized action", 403));
        const result = await Comment.findByIdAndUpdate(id, {
            $set: { status }
        }, {
            new: true
        });
        if (!result) return next(createError("Comment not found", 404));
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Comment updated successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { id } = req.params;
        if (!isValidObjectId(id)) return next(createError("Invalid ID", 404));
        if (!role || role === "user") return next(createError("Unauthorized action", 403));
        const result = await Comment.findByIdAndDelete(id);
        if (!result) return next(createError("Comment not found", 404));
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Comment deleted successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.user;
        if (!isValidObjectId(id)) return next(createError("Invalid ID", 400));
        const comment = await Comment.findById(id).select("text status post user");
        if (!comment) return next(createError("Comment not found", 404));
        const blackList = ["pending", "rejected"];
        if (!role || role === "user" && blackList.includes(comment.status)) {
            return next(createError("This comment is not available", 403));
        }
        res.status(200).json({
            statusCode: res.statusCode,
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

const getComments = async (req, res, next) => {
    try {
        const { role } = req.user;
        const comments = await Comment.find({}).select("text status post user");
        const published = comments.filter(comment => comment.status === "published");
        if (!role || role === "user") return res.status(200).json({
            statusCode: res.statusCode,
            data: published
        });
        res.status(200).json({
            statusCode: res.statusCode,
            data: comments
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComment,
    getComments,
}