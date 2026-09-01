const notFound = (req, res, next) => {
    return res.status(404).json({
        statusCode: 404,
        error: {
            message: `Not found ${req.originalUrl}`
        }
    })
}

const serverError = (err, req, res, next) => {
    // console.log("--- DEBUG ERROR ---");
    // console.log("Full Error Object:", err); // این خط جادوی شماست
    // console.log("Error Message Type:", typeof err.message);
    // console.log("-------------------");
    const statusCode = err.statusCode || 500;
    if (err.code === 11000) {
        return res.status(409).json({
            statusCode: 409,
            error: {
                message: "Email already exists",
            }
        });
    }
    return res.status(statusCode).json({
        statusCode,
        error: {
            message: err.message || "Internal Server Error"
        }
    })
}

module.exports = {
    notFound,
    serverError,
}