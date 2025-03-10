const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  sem: { type: String, required: true },
  type: { type: String, enum: ["theory", "laboratory"], required: true },
  specialization: { type: String },
  modules: [{ type: String }],
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
