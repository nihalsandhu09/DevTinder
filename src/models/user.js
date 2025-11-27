const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      immutable: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email adresss" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,

      minLength: 6,
      select: false,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("not Strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid ");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "i am Software Developer ",
      maxLength: 200,
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length >= 10) {
          throw new Error("cannot add more then   10 skills  ");
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
