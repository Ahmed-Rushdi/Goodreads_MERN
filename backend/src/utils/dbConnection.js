const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    console.log("Database Name:", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
