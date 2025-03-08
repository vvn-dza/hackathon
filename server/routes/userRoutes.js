const express = require("express");
const { registerUser, getUsers,loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getUsers);

module.exports = router;
