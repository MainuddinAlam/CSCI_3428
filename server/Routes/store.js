const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");
const upload = require("../middleware/upload");

// upload the images for the item
router.post("/uploadImg", upload("items").single("image"), (req, res) => {
    res.send(req.file);
});

/**
 * Add a new item to the database
 *
 * Author: Agowun Muhammad Altaf (A00448118)
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
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.get("/itemFullInfo/:itemId", async (req, res) => {
    // get the value in the paramenters (itemId)
    const { itemId } = req.params;

    const itemData = await Item.findOne({ _id: itemId });

    return res.status(200).send(itemData);
});

// use to connect the routes defined in this file to the main
module.exports = router;
