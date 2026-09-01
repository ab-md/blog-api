const { Router } = require("express");
const { createPost, getPosts, getPost, updatePost, deletePost } = require("../controller/post.controller");
const { authintication } = require("../middleware/authValidation.middleware");
const uploadFile = require("../middleware/fileUpload.middlware");
const { createPostValidation, updatePostValidation } = require("../middleware/postValidation.middleware");

const router = Router();

router.use(authintication);
router.post("/", uploadFile("posts").single("image"), createPostValidation, createPost);
router.get("/", getPosts);
router.get("/:slug", getPost);
router.put("/:slug", uploadFile("posts").single("image"), updatePostValidation, updatePost);
router.delete("/:slug", deletePost);

module.exports = router;