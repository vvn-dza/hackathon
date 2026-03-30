const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
    },
    {
        name: "Faculty User",
        email: "faculty@example.com",
        password: "password123",
        role: "teacher",
    },
    {
        name: "Student User",
        email: "student@example.com",
        password: "password123",
        role: "student",
    },
    {
        name: "HOD User",
        email: "hod@example.com",
        password: "password123",
        role: "HOD",
    },
    {
        name: "Exam Staff User",
        email: "staff@example.com",
        password: "password123",
        role: "exam_staff",
    },
];

const seedUsers = async () => {
    try {
        await connectDB();

        // Check if users exist to avoid duplicates or clear them
        // For this task, let's just try to create them if they don't exist

        for (const userData of users) {
            const userExists = await User.findOne({ email: userData.email });
            if (userExists) {
                console.log(`User ${userData.email} already exists`);
            } else {
                const user = new User(userData);
                await user.save();
                console.log(`User ${userData.email} created`);
            }
        }

        console.log("Seeding complete");
        process.exit();
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
};

seedUsers();
