const { Router } = require("express");
const { register, login, getUsers, getUser, updateProfile, roleHandler } = require("../controller/auth.controller");
const { registerValidation, roleValidation, loginValidation, authintication, userUpdateValidation } = require("../middleware/authValidation.middleware");
const { idValidation } = require("../middleware/idValidation.middleware");
const uploadFile = require("../middleware/fileUpload.middlware");

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.patch("/users/:id", idValidation, authintication, roleValidation, roleHandler);
router.put("/users/:id", idValidation, authintication, uploadFile("users").single("avatar"), userUpdateValidation, updateProfile);
router.get("/users", authintication, getUsers);
router.get("/users/:id", idValidation, authintication, getUser);

module.exports = router;