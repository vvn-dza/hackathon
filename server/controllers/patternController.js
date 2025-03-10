const Pattern = require("../models/Pattern");

// Add a new question paper pattern
exports.createPattern = async (req, res) => {
  try {
    const { patternName, subjectCode, sections } = req.body;
    const newPattern = new Pattern({ patternName, subjectCode, sections });
    await newPattern.save();
    res.status(201).json(newPattern);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all patterns
exports.getAllPatterns = async (req, res) => {
  try {
    const patterns = await Pattern.find();
    res.status(200).json(patterns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a pattern
exports.deletePattern = async (req, res) => {
  try {
    await Pattern.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
