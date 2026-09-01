const { default: z } = require("zod");

const registerSchema = z.object({
    fullname: z.string().min(5).max(40).trim(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Confirm password doesn't match",
    path: ["confirmPassword"]
}).strict();

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
}).strict();

const roleSchema = z.object({
    role: z.enum(["user", "admin", "editor"])
});

const userUpdateSchema = z.object({
    fullname: z.string().min(5).max(40).trim().optional(),
    description: z.string().min(20).trim().optional(),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }).optional(),
    confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.password) {
        return data.confirmPassword === data.password;
    }

    return true;
},
    {
        message: "Passwords does not match",
        path: ["confirmPassword"]
    }
).strict();

module.exports = {
    registerSchema,
    loginSchema,
    roleSchema,
    userUpdateSchema,
}