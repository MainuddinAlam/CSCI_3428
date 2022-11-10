const express = require("express");
const mongoose = require("mongoose");
const server = express();
const port = 3026;

const speciesRouter = require("./Routes/species");

let head = "mongodb://";
let user = "group23E";
let password = "41AustriaLeaderThin";
let localHost = "127.0.0.1";
let localPort = "27017";
let database = "group23E";
let connectionString = `${head}${user}:${password}@${localHost}:${localPort}/${user}`;

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
    mongoose.connect(connectionString);
    // connection succesful

    // listen to request to /species
    server.use("/species", speciesRouter);

    // start listening
    server.listen(port, function () {
        console.log("Listening on port 3026");
    });
} catch (error) {
    // handle error on the server
    console.error("Server Error", error);
}
