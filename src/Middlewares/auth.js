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
      return res.status(401).send("Access denied: unauthorized Login ");
    }
    // validate the token
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found ");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = auth;
