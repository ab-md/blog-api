const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    text: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ["pending", "published", "rejected"],
        default: "pending"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;