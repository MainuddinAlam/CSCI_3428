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

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/species/uploadImg. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/uploadImg" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: save the image passed within the request using the middleware
 *
 *        @param req the request object which has the image to be saved
 *        @param res the response object which has the message to the client side to
 *                   let the person know whether the request was successful or not
 *
 *        @returns the file/image that was saved on the server
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.post("/uploadImg", upload("species").single("image"), (req, res) => {
    res.send(req.file);
});

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/species/add. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/add" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: add a new document on the database to store a new specie
 *
 *        @param req the request object which has the informations about the new
 *                   specie to be added
 *        @param res is the predefined result object
 *
 *        @returns OK if everything went well or ERROR message "Bad Request" otherwise
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
 * Purpose: The purpose of this express function is to receive a GET request
 * at the URL = http://140.184.230.209:3026/species/getPaginationInfo/:category.
 * This express function calls an anonymous callback function once the GET
 * request gets recognized.
 *
 * :category is either fauna or flora
 *
 * @param "/getPaginationInfo/:category" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the GET request
 * is recognized.
 *
 *        Purpose: get the pagination information for the category in :category
 *
 *        @param req is the predefined request object
 *        @param res is the predefined result object
 *
 *        @returns
 *          {
 *           speciesLength: Number,
 *           paginationNum: Number // note: it is the constant PAGINATION_NUM
 *          }
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
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/species/getSpecies/:category/:index.
 * This express function calls an anonymous callback function once the POST
 * request gets recognized.
 *
 * :category is either fauna or flora
 * :index is a number use to pick document after a certain number of documents
 *
 * @param "/getSpecies/:category/:index" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: get a list of size PAGINATION_NUM (6) of species for the
 *        category and from the index specified
 *
 *        @param req is the predefined request object
 *        @param res is the predefined result object
 *
 *        @returns
 *         [{
 *           _id: String,
 *           name: String,
 *           imgsURL: [String],
 *           description: String
 *          },
 *           _id: String,
 *           name: String,
 *           imgsURL: [String],
 *           description: String
 *          }, ...
 *         ]
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
 * Purpose: The purpose of this express function is to receive a GET request
 * at the URL = http://140.184.230.209:3026/species/speciesFullInfo/:speciesId.
 * This express function calls an anonymous callback function once the GET
 * request gets recognized.
 *
 * :speciesId _id of a specific specie
 *
 * @param "/speciesFullInfo/:speciesId" is the relative url destination to be recognized
 * @param anonymous callback function gets executed once the GET request
 * is recognized.
 *
 *        Purpose: get the information for a single specific specie
 *
 *        @param req is the predefined request object
 *        @param res is the predefined result object
 *
 *        @returns
 *          {
 *           _id: String,
 *           name: String,
 *           imgsURL: [String],
 *           description: String
 *          }
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
router.get("/speciesFullInfo/:speciesId", async (req, res) => {
    // get the value in the paramenters (speciesId)
    const { speciesId } = req.params;

    // fetch the information from the database
    const speciesData = await Species.findOne({ _id: speciesId });

    return res.status(200).send(speciesData);
});

// use to connect the routes defined in this file to the main
module.exports = router;
