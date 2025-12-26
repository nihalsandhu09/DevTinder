const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  // Read the token from the req cookies
  // validate the token
  // find token
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Access denied: No token provided");
    }
    // validate the token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id).select("+password");
    if (!user) {
      throw new Error("user not found ");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Error " + error.message);
  }
};

module.exports = auth;
