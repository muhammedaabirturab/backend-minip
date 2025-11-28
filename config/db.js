const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Server will continue without database connection");
    // process.exit(1); // commented to allow server to run
  }
};

module.exports = connectDB;
