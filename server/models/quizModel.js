/**
 * Schema for the quiz page
 *
 * Idea of using Schemas: Altaf
 * Author for the quiz schema: Mainuddin Alam Irteja (A00446752)
 */
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("quiz", quizSchema);
