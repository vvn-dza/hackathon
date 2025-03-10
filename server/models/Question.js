const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  marks: { type: Number, required: true },
  module: { type: String, required: true },
  courseCode: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] },
});

module.exports = mongoose.model("Question", questionSchema);
