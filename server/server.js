require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/users", userRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
