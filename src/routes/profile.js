const express = require("express");
const profileRouter = express.Router();
const auth = require("../Middlewares/auth");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateEditProfileData } = require("../utilis/validation");
profileRouter.get("/profile/view", auth, async (req, res) => {
  try {
    // validate the token
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
});

profileRouter.patch("/profile/edit", auth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid Edit request ");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
    res.json({
      message: `${loggedInUser.firstName}, your profile updated succesfully `,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERRor" + error.message);
  }
});

profileRouter.patch("/profile/password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("both old and new password are required");
    }
    const user = req.user;

    const ispasswordMAtch = await bcrypt.compare(oldPassword, user.password);

    if (!ispasswordMAtch) {
      throw new Error(" password is incorrect");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("password must be strong ");
    }

    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;
    await user.save();

    res.status(200).json({ message: "password changed succesfully" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
module.exports = profileRouter;
