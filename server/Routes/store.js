/**
 * The purpose of this file is to define the code for the request to the route
 * http://140.184.230.209:3026/server/store/...
 *
 * - manage the items in the store of the website, add new item
 * - provide access to the items being sold on the store
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared the code from Routes/species
 * Author: Anmol Bhatla (A00441358), wrote the whole file and adapted the shared code from the Routes/species
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// create the router
const router = express.Router();
// import the item model to interact with the database, items collection
const Item = require("../models/itemModel");
// import the image uploading middleware
const upload = require("../middleware/upload");

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/store/uploadImg. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/store/uploadImg" is the url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: save the image passed within the request using the middleware
 *
 *        @param req the request object which has the image to be saved
 *        @param res the result object which has the message to the client side to
 *        let the person know whether the request was successful or not
 *
 *        @returns the file/image that was saved on the server
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared the code from Routes/species
 * Author: Anmol Bhatla (A00441358), wrote and adapted the code from Routes/species file
 */
router.post("/uploadImg", upload("items").single("image"), (req, res) => {
    res.send(req.file);
});

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/store/add. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/add" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: add a new document on the database to store a new item
 *
 *        @param req the request object which has the informations about the new
 *                   item to be added
 *        @param res is the predefined result object
 *
 *        @returns OK if everything went well or ERROR message "Bad Request" otherwise
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared the code from Routes/species
 * Author: Anmol Bhatla (A00441358), wrote and adapted the code from Routes/species file
 */
router.post("/add", async (req, res) => {
    try {
        // adding new item
        await Item.create(req.body);

        res.sendStatus(200);
    } catch (error) {
        console.error("could not add new item:", error);
        res.sendStatus(400);
    }
});

/**
 * get a list of item first image, name and price
 *
 * Author: Anmol Bhatla (A00441358)
 */

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/store/getitems.
 * This express function calls an anonymous callback function once the POST
 * request gets recognized.
 *
 * :category is either fauna or flora
 * :index is a number use to pick document after a certain number of documents
 *
 * @param "/getitems" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: get a list of size PAGINATION_NUM (6) of species for the
 *        category and from the index specified
 *
 *        @param req is the predefined request object
 *        @param res is the predefined result object
 *
 *        @returns
 *         [{
 *           _id: String,
 *           name: String,
 *           imgsURL: [String],
 *           description: String
 *          },
 *           _id: String,
 *           name: String,
 *           imgsURL: [String],
 *           description: String
 *          }, ...
 *         ]
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.post("/getitems", async (req, res) => {
    const itemList = await Item.find() // find all the items
        .sort({ createdAt: -1 }) // sort them in descending order from when they were inserted into the database
        .select({ name: 1, imgsURL: 1, description: 1, price: 1 }); // only send the required data

    return res.status(200).send(itemList);
});

/**
 * get all the information on a specific item
 *
 * itemId: objectId of the item
 *
 * Author: Anmol Bhatla (A00441358)
 */
router.get("/itemFullInfo/:itemId", async (req, res) => {
    // get the value in the paramenters (itemId)
    const { itemId } = req.params;

    const itemData = await Item.findOne({ _id: itemId });

    return res.status(200).send(itemData);
});

// use to connect the routes defined in this file to the main
module.exports = router;
