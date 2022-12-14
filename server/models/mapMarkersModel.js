/**
 * purpose of this file is to define how the species object is structured and
 * what the keys of the species object stores.
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file.
 */

// import the library used to create the schema and model
const mongoose = require("mongoose");

const mapMarkerSchema = new mongoose.Schema({
    // x-position of the map marker on the map
    x: {
        type: Number,
        required: true,
    },
    // y-position of the map marker on the map
    y: {
        type: Number,
        required: true,
    },
    // description of what the map marker represent
    description: {
        type: String,
        required: true,
    },
    // link for the image represented by the map marker
    imgUrl: {
        type: String,
        required: true,
    },
    // title for what the map marker represent
    title: {
        type: String,
        required: true,
    },
});

// export the model created from the above schema so that other files can modify the mapmarkers object on the database
module.exports = mongoose.model("MapMarker", mapMarkerSchema);
