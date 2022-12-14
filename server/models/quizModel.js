/**
 * Purpose: The purpose of this Javascript file is to make the Schema
 * for adding new multiple choice questions.
 *
 * Author: Mainuddin Alam Irteja (A00446752) Mainuddin Alam Irteja wrote the
 * Schema for adding new multiple choice question.
 * Author: Muhammad Altaf Agowun (A00448118). The idea of using Schemas
 * was suggested by Muhammad Altaf Agowun.
 */

//global
//constant to require the mongoose module which is needed to make the Schema
const mongoose = require("mongoose");

//global
//constant to set the Schema for adding new multiple choice questions to the database
const quizSchema = new mongoose.Schema({
  //the question of the multiple choice question
  question: {
    type: String,
    required: true,
  },
  //the options of the multiple choice question
  options: {
    type: [String],
    required: true,
  },
  // the correct answer to the multiple choice question
  answer: {
    type: String,
    required: true,
  },
});

// export the model created from the above Schema so thot other files
// can modify the items object on the database
// The collection being used is "quiz"
module.exports = mongoose.model("quiz", quizSchema);
