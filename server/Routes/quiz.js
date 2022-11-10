const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizModel");

Quiz.insertMany([]);

router.get("/getQuiz", async (req, res) => {
    const quizList = await Quiz.find();

    return res.status(200).send(quizList);
});

// use to connect the routes defined in this file to the main
module.exports = router;
