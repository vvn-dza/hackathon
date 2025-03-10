const mongoose = require("mongoose");

const patternSchema = new mongoose.Schema({
  patternName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  sections: [
    {
      title: String,
      marks: Number,
      module: String,
    },
  ],
});

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;
