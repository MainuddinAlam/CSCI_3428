/**
 * The purpose of this file is to create a middleware for when the admin uploads
 * an image.
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file.
 */

// import the multer library to save image on the database
const multer = require("multer");

/**
 * save image to ./asset
 *
 * code adapted from documentation https://github.com/expressjs/multer
 * Author: Agowun Muhammad Altaf (A00448118)
 * @param subdoc sub document path
 * @returns multer upload function
 */
function upload(subdoc) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./assets/${subdoc}/`);
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname);
        },
    });

    return multer({ storage: storage });
}

// export the middleware to allow other files to use it to upload images to the server
module.exports = upload;
