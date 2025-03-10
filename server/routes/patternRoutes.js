const express = require("express");
const {
  createPattern,
  getAllPatterns,
  deletePattern,
} = require("../controllers/patternController");

const router = express.Router();

router.post("/", createPattern);
router.get("/", getAllPatterns);
router.delete("/:id", deletePattern);

module.exports = router;
