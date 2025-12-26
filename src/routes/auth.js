const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utilis/validation");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    console.log("Password received:", req.body.password);

    // validate of data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    // Encrypt thee password it will retyrn the promise
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //   Creating a new instance of User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save(); // return us the promise
    res.send("user signed up");
  } catch (error) {
    res.status(400).send("error saving the user :" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email received:", email);
    console.log("Password received:", password);

    const user = await User.findOne({ email });
    console.log("User from DB:", user);

    if (!user) {
      return res.status(400).send("User is not Exist ");
    }

    console.log("Hashed password in DB:", user.password);
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    const token = await user.getJWT();

    // Add the token to cokkie and send the response back to the user
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.send("Login succesfull");
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout succesfully ");
});

module.exports = authRouter;
