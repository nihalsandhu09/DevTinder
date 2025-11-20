const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nihalsandhu:Nihal12345@nodejs.ciembsu.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
