const express = require("express");
const auth = require("../Middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/requests/received", auth, async (req, res) => {
  // get all the pending connection requests for the logged-in user
  try {
    const loggedInUser = req.user;

    const requests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName    lastName age gender about skills");

    return res.json({
      message: "pending connections",
      data: requests,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

userRouter.get("/user/connections", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      status: "accepted",
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .populate("fromUserId", "firstName lastName photoUrl age about gender")
      .populate("toUserId", "firstName lastName photoUrl age about gender");

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "connection fecth succesfully ",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

userRouter.get("/user/feed", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // add pagination
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        { toUserId: loggedInUser._id },
      ],
    });
    console.log(connections);
    const excludedUserIds = new Set();

    excludedUserIds.add(loggedInUser._id.toString());

    connections.forEach((request) => {
      if (request.fromUserId.toString() === loggedInUser._id.toString()) {
        excludedUserIds.add(request.toUserId.toString());
      } else {
        excludedUserIds.add(request.fromUserId.toString());
      }
    });

    const feedUsers = await User.find({
      _id: {
        $nin: Array.from(excludedUserIds),
      },
    })
      .select("firstName lastName age gender photoUrl about skills ")
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed ",
      page,
      limit,
      count: feedUsers.length,
      data: feedUsers,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = userRouter;
