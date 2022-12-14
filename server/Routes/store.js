/**
 * The purpose of this file is to define the code for the request to the route
 * http://140.184.230.209:3026/server/store/...
 *
 * - manage the items in the store of the website, add new item
 * - provide access to the items being sold on the store
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared the code from species route
 * Author: Anmol Bhatla (A00441358), wrote the whole file and adapted the shared code from the species route to the store route
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// create the router
const router = express.Router();
// import the item model to interact with the database, items collection
const Item = require("../models/itemModel");
// import the image uploading middleware
const upload = require("../middleware/upload");

// upload the images for the item
router.post("/uploadImg", upload("items").single("image"), (req, res) => {
    res.send(req.file);
});

/**
 * Add a new item to the database
 *
 * Author: Anmol Bhatla (A00441358)
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
