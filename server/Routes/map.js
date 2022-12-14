/**
 * The purpose of this file is to define the code for the request to the route
 * http://140.184.230.209:3026/server/map/...
 *
 * provide the information on the map markers:
 * - x-coordinate
 * - y-coordinate
 * - image url
 * - title
 * - decription
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// create the router
const router = express.Router();
// import the mapmarkers model to interact with the database, mapmarkers collection
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
