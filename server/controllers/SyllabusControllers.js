const Syllabus = require("../models/Syllabus");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads stored in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }).single("syllabusFile");

// Upload syllabus
exports.uploadSyllabus = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed.", error: err });
    }

    try {
      const { courseCode } = req.body;
      if (!courseCode || !req.file) {
        return res.status(400).json({ message: "Course code and file are required." });
      }

      const syllabus = new Syllabus({
        courseCode,
        fileUrl: `/uploads/${req.file.filename}`, // Save file path
      });

      await syllabus.save();
      res.status(201).json({ message: "Syllabus uploaded successfully!", syllabus });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  });
};

// Get all uploaded syllabus records
exports.getSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find();
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

// Delete syllabus
exports.deleteSyllabus = async (req, res) => {
  try {
    const { id } = req.params;
    await Syllabus.findByIdAndDelete(id);
    res.status(200).json({ message: "Syllabus deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
