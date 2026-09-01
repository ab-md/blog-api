const multer = require("multer");
const path = require("path");


const uploadFile = (folder) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/uploads/${folder}`);
        },

        filename: (req, file, cb) => {
            const whiteListFormat = [
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".ico",
                ".icon"
            ];

            const format = path.extname(file.originalname).toLowerCase();

            if (!whiteListFormat.includes(format)) {
                return cb(
                    new Error(
                        "Only png, jpg, jpeg, ico, icon and webp formats are allowed"
                    )
                );
            }

            cb(null, Date.now() + format);
        }
    });

    return multer({ storage });
};

module.exports = uploadFile;