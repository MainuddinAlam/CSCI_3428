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

/**
 * Purpose: The purpose of this express function is to receive a GET request
 * at the URL = http://140.184.230.209:3026/map/getMarkers.
 * This express function calls an anonymous callback function once the GET
 * request gets recognized.
 *
 * @param "/getMarkers" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the GET request
 * is recognized.
 *
 *        Purpose: get the map markers informations
 *
 *        @param req is the predefined request object
 *        @param res is the predefined result object
 *
 *        @returns
 *         [{
 *          _id: String,
 *          x: Number,
 *          y: Number,
 *          title: String,
 *          description: String,
 *          imgURL: [String],
 *          }, ...
 *         ]
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.get("/getMarkers", async (req, res) => {
    // get all the map markers from the database
    const mapMarkersList = await MapMarker.find();

    return res.status(200).send(mapMarkersList);
});

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/map/addMarkers. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/addMarkers" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: add a list of new map markers
 *
 *        @param req is the predefined request object contains the a list of
 *                   new map markers information within newMarkers field
 *        @param res is the predefined result object
 *
 *        @returns OK if everything went well or ERROR message "Bad Request" otherwise
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
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
