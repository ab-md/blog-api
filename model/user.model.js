const { Schema, default: mongoose, model } = require("mongoose");

const userSchema = new Schema({
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    role: { 
        type: String, 
        enum: ["user", "admin", "editor"],
        default: "user" },
    avatar: { type: String, default: "/uploads/users/user.png" },
}, {
    timestamps: true,
    versionKey: false
});

const User = model("User", userSchema);

module.exports = User;