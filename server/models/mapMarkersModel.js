const mongoose = require("mongoose");

const mapMarkerSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("MapMarker", mapMarkerSchema);
