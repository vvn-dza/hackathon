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
router.get('/:subjectCode', async (req, res) => {
  try {
    const pattern = await Pattern.findOne({ subjectCode: req.params.subjectCode });
    if (!pattern) {
      return res.status(404).json({ message: 'Pattern not found' });
    }
    res.json(pattern);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
