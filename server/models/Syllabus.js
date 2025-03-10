const mongoose = require("mongoose");

const SyllabusSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  fileUrl: { type: String, required: true }, // URL for the uploaded file
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Syllabus", SyllabusSchema);
