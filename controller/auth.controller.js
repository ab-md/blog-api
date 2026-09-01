const User = require("../model/user.model");
const { encryptPassword, verifyPassword } = require("../utils/encryption");
const { createToken } = require("../utils/jwt");
const { createError } = require("../utils/utils");

const register = async (req, res, next) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;
        const result = await User.create({
            fullname,
            email,
            password: encryptPassword(password)
        })
        return res.status(201).json({
            statusCode: res.statusCode,
            message: "Registered successfully.Please log into your accont"
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(createError("Incorrect email or password", 401));
        if (!verifyPassword(password, user.password)) return next(createError("Incorrect email or password", 401));
        const token = createToken({
            id: user._id,
            email: user.email,
            role: user.role
        });
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.status(200).json({
            statusCode: res.statusCode,
            message: "Logged in successfully",
            data: {
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

const roleHandler = async (req, res, next) => {
    try {
        const { role: userRole } = req.user;
        if (userRole !== "admin") return next(createError("You're not allowed to change this section", 403));
        if (req.user.id === req.params.id) return next(createError("You can't change your own role", 403));
        const { id } = req.params;
        const { role } = req.body;
        const result = await User.findByIdAndUpdate(id, {
            role,
        }, {
            new: true
        }).select("fullname email role avatar description");
        return res.status(200).json({
            statusCode: res.statusCode,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        let { fullname, password, description } = req.body;
        const { id } = req.params;
        const file = req.file;
        if (id !== req.user.id) return next(createError("Unauthorized user action", 403));
        const updateData = {
            fullname,
            description,
        }
        if (!!file) updateData.avatar = `/uploads/users/${file.filename}`;
        if (password) {
            const user = await User.findById(id);
            if (!user) return next(createError("User not found", 404));
            if (verifyPassword(password, user.password)) return next(createError("New password can't be same as old password", 400));
            updateData.password = encryptPassword(password);
        }
        const result = await User.findByIdAndUpdate(id, {
            $set: updateData
        }, {
            new: true
        });
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Profile updated successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "admin" && role !== "editor") {
            return next(createError("You don't have the permission for this section", 403));
        }
        const users = await User.find({}).select("fullname email avatar role description");
        return res.status(200).json({
            statusCode: res.statusCode,
            data: users
        })
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id: userID, role } = req.user;
        const user = req.user;
        const { id } = req.params;
        const allowedRoles = ["admin", "editor"];
        if (!allowedRoles.includes(role) && id !== userID) {
            return next(createError("You don't have access to this section", 403));
        }
        const result = await User.findById(id).select("fullname email description role");
        if (!result) return next(createError(`Not found user: ${id}`, 404));
        return res.status(200).json({
            statusCode: res.statusCode,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    updateProfile,
    getUsers,
    getUser,
    roleHandler,
}