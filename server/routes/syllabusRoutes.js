const express = require("express");
const { uploadSyllabus, getSyllabus, deleteSyllabus } = require("../controllers/SyllabusControllers.js");
const router = express.Router();

router.post("/upload", uploadSyllabus);
router.get("/", getSyllabus);
router.delete("/:id", deleteSyllabus);

module.exports = router;
