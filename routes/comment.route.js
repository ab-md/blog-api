const { Router } = require("express");
const { createComment, getComments, getComment, updateComment, deleteComment } = require("../controller/comment.controller");
const { authintication } = require("../middleware/authValidation.middleware");
const { createCommentValidation, updateCommentValidation } = require("../middleware/commentValidation.middleware");

const router = Router();

router.use(authintication);
router.post("/", createCommentValidation, createComment);
router.get("/", getComments);
router.get("/:id", getComment);
router.patch("/:id", updateCommentValidation, updateComment);
router.delete("/:id", deleteComment);

module.exports = router;