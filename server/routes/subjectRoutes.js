const express = require("express");
const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  addModuleToSubject
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/", createSubject);
router.post("/subjects/add-module", addModuleToSubject);

router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
