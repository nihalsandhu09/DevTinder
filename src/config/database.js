const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://nihalsandhu:Nihal12345@nodejs.ciembsu.mongodb.net/devTinder"
      // "mongodb://127.0.0.1:27017/devDB"
    );
  } catch (error) {
    console.log("DB Connection Failed:", error);
    throw error;
  }
}

module.exports = connectDB;
