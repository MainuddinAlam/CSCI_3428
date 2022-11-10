const multer = require("multer");

// code adapted from documentation https://github.com/expressjs/multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets/species/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
