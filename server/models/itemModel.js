/**
 * purpose of this file is to define how the item object is structured and what
 * the keys of the item object stores.
 *
 * Author: Anmol Bhatla (A00441358), wrote the whole file.
 */

// import the library used to create the schema and model
const mongoose = require("mongoose");

// create the schema to be use to represent an item in the database
const itemSchema = new mongoose.Schema(
    {
        // name of the item
        name: {
            type: String,
            required: true,
        },
        // list of the links to the images of the item
        imgsURL: {
            type: [String],
            required: true,
        },
        // description of what the item is
        description: {
            type: String,
            required: true,
        },
        // price of the item in CAD
        price: {
            type: Number,
            required: true,
        },
    },
    {
        // mongoose option to add a createdAt (use to order the item) and updatedAt field
        timestamps: true,
    }
);

// export the model created from the above schema so that other files can modify the items object on the database
module.exports = mongoose.model("item", itemSchema);
