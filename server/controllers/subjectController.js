const Subject = require("../models/Subject");

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addModuleToSubject = async (req, res) => {
    try {
      const { subjectCode, moduleName } = req.body;
  
      if (!subjectCode || !moduleName) {
        return res.status(400).json({ message: "Subject code and module name are required" });
      }
  
      // Find the subject by subjectCode
      const subject = await Subject.findOne({ subjectCode });
  
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      // Append the new module to the modules array
      subject.modules.push({ moduleName });
  
      await subject.save();
      res.status(201).json({ message: "Module added successfully", subject });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };