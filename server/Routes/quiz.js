/**
 * Purpose: The purpose of this Javascript file is to make the
 * server code for the newQuiz.html and quiz.html pages.
 * This server code handles adding and retrieving quiz information
 * from database. It is also needed to generate options when making
 * a multiple choice question.
 *
 * Author: Mainuddin Alam Irteja (A00446752). Mainuddin Alam Irteja wrote
 * this file completely.
 */

//global
//constant to require the express module
const express = require("express");
//global
//constant for the Router to be used
const router = express.Router();
//global
//constant to reauire the random-words module
const randomWords = require("random-words");
//global
//constant to require the Quiz model to be used
const Quiz = require("../models/quizModel");

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/quiz/addMCQ. This express function
 * calls an anonymous callback function once the POST request gets recognized.
 *
 * @param "/quiz/addMCQ/" is the url destination to be recognized
 * @param anonymous callback function gets executed once the POST request
 * is recognized.
 *
 *        Purpose: The purpose of the callback function is to add
 *        multiple choice question to the database in the form of a JSON object
 *
 *        @param req the request object which has the question to be added
 *        to the database
 *        @param res the result object which has the message to the client side to
 *        let the person know whether the request was successful or not
 *
 *        @returns the result object to the client
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
router.post("/addMCQ", async (req, res) => {
  try {
    /* The JSON object with the details of a multiple choice question
  mcq = {
    Question: {
      type: [String]
    },
    Options: {
      type: [String Array]
    },
    Correct_Answer: {
      type: [String]
    }
  }
  */
    let mcq = {
      question: req.body.Question,
      options: req.body.Options,
      answer: req.body.Correct_Answer,
    };
    //add the new mcq to the database
    await Quiz.create(mcq);
    //return the result to the client side
    return res.status(200).send("Question added successfully!");
  } catch (error) {
    console.log(error);
    //return the error message to the client
    res.status(400).send(`Question was not added. The error was ${error}`);
  }
});

/**
 * Purpose: The purpose of this express function is to receive a GET request at
 * the URL = http://140.184.230.209:3026/quiz/getQuiz. This express function
 * calls an anonymous callback function.
 *
 * @param "/quiz/getQuiz/" is the url destination to be recognized
 * @param anonymous callback function gets executed once GET request is reognized
 *
 *        Purpose: The purpose of this anonymous callback function is to
 *        retrieve all the quiz information from the database to the client
 *        side quiz.html page.
 *
 *        @param req the request object
 *        @param res the result object which has the whole quiz information
 *
 *        @returns the whole quiz information from the database to the client
 *        side.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
router.get("/getQuiz", async (req, res) => {
  try {
    //find and retrieve the quizList
    //the quiz information will be found in the collection called "quiz"
    const quizList = await Quiz.find();
    return res.status(200).send(quizList);
  } catch (error) {
    res.send(400).send(`There was an error. The error was ${error}`);
  }
});

/**
 * Purpose: The purpose of this function is to receive a GET request at
 * the URL = http://140.184.230.209:3026/quiz/getWord. This express function
 * calls an anonymous callback function.
 *
 *
 * @param "/quiz/getWord/" is the url destination to be recognized
 * @param anonymous callback function gets executed once GET request is recognized
 *
 *        Purpose: The purpose of the callback function is to retrieve a
 *        random word from the server.
 *
 *        @param req the request object
 *        @param res the result object which has the random word
 *
 *        @returns the random word to be used as an option
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
router.get("/getWord", (req, res) => {
  try {
    //get the random word and return it
    let randomWord = randomWords();
    return res.status(200).send(randomWord);
  } catch (error) {
    res.status(400).send(`Message Could not be sent. The error was ${error}`);
  }
});

// use to connect the routes defined in this file to the main
module.exports = router;
