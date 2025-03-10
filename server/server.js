require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const subjectRoutes=require("./routes/subjectRoutes")
const syllabusRoutes=require("./routes/syllabusRoutes")
const cors = require("cors");
const bodyParser = require("body-parser");
const pattern=require("./routes/patternRoutes")
const questionRoutes = require("./routes/questionRoute");


const connectDB = require("./config/db");

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/syllabus", syllabusRoutes);
app.use("/api/v1/patterns",pattern )




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
