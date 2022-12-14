/**
 * Root js file for the server. it connects the rest of the file created for the
 * server together.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * Author: Mainuddin Alam Irteja (A00446752)
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// import the library used to interact with the database
const mongoose = require("mongoose");
// create the server
const server = express();
// store the port for the server to be run on
const port = 3026;

// refer to the routes created in other files
// refer to the species.js file which contains the routes for species
const speciesRouter = require("./Routes/species");
// refer to the store.js file which contains the routes for store
const storeRouter = require("./Routes/store");
// refer to the contacts.js file which contains the routes for contacts
const contactsRouter = require("./Routes/contacts");
// refer to the quiz.js file which contains the routes for quiz
const quizRouter = require("./Routes/quiz");
// refer to the map.js file which contains the routes for map
const mapRouter = require("./Routes/map");

// build the connection string
let head = "mongodb://";
let user = "group23E";
let password = "41AustriaLeaderThin";
let localHost = "127.0.0.1";
let localPort = "27017";
let database = "group23E";
let connectionString = `${head}${user}:${password}@${localHost}:${localPort}/${database}`;

// code provided by Prof Terry
// set JSON recognition
server.use(express.json());
// set incoming name:value pairs to be any type
server.use(express.urlencoded({ extended: true }));

let allowCrossDomain = function (req, res, next) {
    // allow any origin
    res.header("Access-Control-Allow-Origin", "*");
    // allow any method
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // accept only headers with Content-Type included
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // link express process to next operation
    next();
};

// set allowable domain characteristics
server.use(allowCrossDomain);

try {
    // connect to the database
    mongoose.connect(connectionString);

    // listen to request to /map
    server.use("/map", mapRouter);

    // listen to request to /species
    server.use("/species", speciesRouter);

    // listen to request to /store
    server.use("/store", storeRouter);

    // listen to request to /contacts
    server.use("/contacts", contactsRouter);

    // listen to request to /quiz
    server.use("/quiz", quizRouter);

    // start listening on the port
    server.listen(port, function () {
        console.log(`Listening on port ${port}.`);
    });
} catch (error) {
    // handle error on the server
    console.error("Server Error", error);
}
