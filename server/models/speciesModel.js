/**
 * purpose of this file is to define how the species object is structured and
 * what the keys of the species object stores.
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file.
 */

// import the library used to create the schema and model
const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
    {
        // name of the species
        name: {
            type: String,
            required: true,
        },
        // list of the links to the images of the species
        imgsURL: {
            type: [String],
            required: true,
        },
        // description about the species
        description: {
            type: String,
            required: true,
        },
        // category to which the species belong to fauna / flora
        category: {
            type: String,
            required: true,
            enum: ["fauna", "flora"],
        },
    },
    {
        // mongoose option to add a createdAt (use to order the species) and updatedAt field
        timestamps: true,
    }
);

// export the model created from the above schema so that other files can modify the species object on the database
module.exports = mongoose.model("Species", speciesSchema);
