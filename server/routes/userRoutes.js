const express = require("express");
const { registerUser, getUsers, loginUser, updateUser, deleteUser } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getUsers);
router.put("/:id",  updateUser);
router.delete("/:id",  deleteUser);

module.exports = router;
