const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes.js");
const reviewRoutes = require("./src/routes/reviewRoutes.js");
require("dotenv").config();

//express app
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());

//routes
app.use("/api", userRoutes);
app.use("/api", reviewRoutes);

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

//listen to requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
