const express = require("express");
const router = express.Router();
const MapMarker = require("../models/mapMarkersModel");

router.get("/getMarkers", async (req, res) => {
    // get all the map markers from the database
    const mapMarkersList = await MapMarker.find();

    return res.status(200).send(mapMarkersList);
});

router.post("/addMarkers", async (req, res) => {
    // get all the map markers from the database
    const { newMarkers } = req.body;

    try {
        // add list of markers
        await MapMarker.insertMany(newMarkers);
        return res.status(200);
    } catch (error) {
        // error adding the markers
        return res.status(400);
    }
});

// use to connect the routes defined in this file to the main
module.exports = router;
