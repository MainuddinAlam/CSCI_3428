/**
 * Server code for the quiz page
 * This server code handles adding and retrieving quiz information
 * from database. It is also needed to generate options when making
 * a multiple choice question
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
const express = require("express");
const router = express.Router();
const randomWords = require("random-words");
const Quiz = require("../models/quizModel");

// code to save new question details to the database
router.post("/addMCQ", async (req, res) => {
  try {
    // adding the new multiple choice question to the database
    let mcq = {
      question: req.body.Question,
      options: req.body.Options,
      answer: req.body.Correct_Answer,
    };
    await Quiz.create(mcq);
    return res.status(200).send("Question added successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send(`Question was not added. The error was ${error}`);
  }
});

// code to retrieve all quiz information from the database
router.get("/getQuiz", async (req, res) => {
  try {
    const quizList = await Quiz.find();
    return res.status(200).send(quizList);
  } catch (error) {
    res.send(400).send(`There was an error. The error was ${error}`);
  }
});

//code to generate random option for making a multiple choice question
router.get("/getWord", (req, res) => {
  try {
    let randomWord = randomWords();
    return res.status(200).send(randomWord);
  } catch (error) {
    res.status(400).send(`Message Could not be sent. The error was ${error}`);
  }
});

// use to connect the routes defined in this file to the main
module.exports = router;
