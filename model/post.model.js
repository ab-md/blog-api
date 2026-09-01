const { Schema, default: mongoose, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    image: { type: String, default: "/uploads/posts/post.png" },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        type: String,
        enum: ["published", "pending"],
        default: "pending"
    }
}, {
    timestamps: true,
    versionKey: false
});

const Post = model("Post", postSchema);

module.exports = Post;