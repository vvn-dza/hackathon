const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");

const runDebug = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");

    const email = "admin@example.com";
    const password = "password123";
    const role = "admin";

    console.log(`Searching for user: ${email} (${role})`);
    const user = await User.findOne({ email, role });

    if (!user) {
      console.error("User not found!");
      process.exit(1);
    }

    console.log("User found. Comparing password...");
    console.log("Input Password:", password);
    console.log("Stored Hash:", user.password);

    try {
      const isMatch = await user.comparePassword(password);
      console.log("isMatch:", isMatch);
    } catch (err) {
      console.error("Error in comparePassword:", err);
    }

    console.log("Generating token...");
    try {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      console.log("Token generated:", token.substring(0, 10) + "...");
    } catch (err) {
      console.error("Error in jwt.sign:", err);
    }

    process.exit(0);
  } catch (error) {
    console.error("Global Catch Error:", error);
    process.exit(1);
  }
};

runDebug();
