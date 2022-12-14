/**
 * The purpose of this file is to define the code for the request to the route
 * http://140.184.230.209:3026/server/species/...
 *
 * - manage the species in the gallery of the website, add new species
 * - provide access to information on the species at the French Village
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// create the router
const router = express.Router();
// import the species model to interact with the database, species collection
const Species = require("../models/speciesModel");
// import the image uploading middleware
const upload = require("../middleware/upload");

// number of species data to send per request
const PAGINATION_NUM = 6;

// upload the images for the species
router.post("/uploadImg", upload("species").single("image"), (req, res) => {
    res.send(req.file);
});

/**
 * Add a new species to the database
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.post("/add", async (req, res) => {
    try {
        // adding new species
        await Species.create(req.body);

        res.sendStatus(200);
    } catch (error) {
        console.error("could not add new species:", error);
        res.sendStatus(400);
    }
});

/**
 * get the information on how pagination is done by the server, used to
 * build the pagination index bar (information are the number of species and
 * the number of docuements sent each time a list is requested)
 *
 * category: fauna / flora
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.get("/getPaginationInfo/:category", async (req, res) => {
    // get the value in the parameter (category)
    const { category } = req.params;

    // get the number of documents that are under the category
    const speciesLength = (await Species.find({ category })).length;

    return res.status(200).send({
        speciesLength,
        paginationNum: PAGINATION_NUM,
    });
});

/**
 * get a paginated list of species first image and name
 *
 * category: fauna / flora
 * indx: use to pick document after a certain number of documents
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.post("/getSpecies/:category/:index", async (req, res) => {
    // get the value in the paramenters (category and index)
    const { category, index } = req.params;

    const speciesList = await Species.find({ category }) // find all the species that are of the category
        .sort({ createdAt: -1 }) // sort them in descending order from when they were inserted into the database
        .skip(Number(index) * PAGINATION_NUM) // skip the first documents (Pagination)
        .limit(PAGINATION_NUM) // limit the number of documents being sent (Pagination)
        .select({ name: 1, imgsURL: 1, description: 1 }); // only send the required data

    return res.status(200).send(speciesList);
});

/**
 * get all the information on a specific species
 *
 * speciesId: objectId of the species
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.get("/speciesFullInfo/:speciesId", async (req, res) => {
    // get the value in the paramenters (speciesId)
    const { speciesId } = req.params;

    const speciesData = await Species.findOne({ _id: speciesId });

    return res.status(200).send(speciesData);
});

// use to connect the routes defined in this file to the main
module.exports = router;
