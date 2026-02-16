const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is missing `,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("gender data is not valid ");
      //   }
      // },
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
      default: [],
      validate(value) {
        if (value.length >= 10) {
          throw new Error("cannot add more then   10 skills  ");
        }
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPAsswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPAsswordValid;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
