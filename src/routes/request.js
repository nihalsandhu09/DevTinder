const express = require("express");
const auth = require("../Middlewares/auth");
const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest", auth, async (req, res) => {
  const user = req.user;
  res.send("connection request sent by  " + user.firstName);
});
module.exports = requestRouter;
