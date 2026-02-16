const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      // "mongodb://127.0.0.1:27017/devDB",
    );
  } catch (error) {
    console.log("DB Connection Failed:", error);
    throw error;
  }
}

module.exports = connectDB;
