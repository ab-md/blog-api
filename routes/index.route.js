const { Router } = require("express");

const authRouter = require("./auth.route");
const categoryRouter = require("./category.route");
const commentRouter = require("./comment.route");
const postRouter = require("./post.route");

const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/comments", commentRouter);
router.use("/posts", postRouter);

module.exports = router;