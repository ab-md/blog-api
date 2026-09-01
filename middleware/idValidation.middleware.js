const { isValidObjectId } = require("mongoose");
const { createError } = require("../utils/utils");

const idValidation = (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) return next(createError(`ID: ${id} is invalid`, 400));
    next();
}

module.exports = {
    idValidation,
}