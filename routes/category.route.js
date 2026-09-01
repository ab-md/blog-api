const { Router } = require("express");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controller/category.controller");
const { authintication } = require("../middleware/authValidation.middleware");
const { createCategoryValidation, updateCategoryValidation } = require("../middleware/categoryValidation.middleware");
const uploadFile = require("../middleware/fileUpload.middlware");

const router = Router();

router.post("/", authintication, uploadFile("categories").single("image"), createCategoryValidation, createCategory);
router.get("/", getCategories);
router.get("/:slug", getCategory);
router.put("/:slug", authintication, uploadFile("categories").single("image"), updateCategoryValidation, updateCategory);
router.delete("/:slug", authintication, deleteCategory);

module.exports = router;