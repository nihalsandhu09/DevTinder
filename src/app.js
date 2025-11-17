const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // Route =handler

    next();
    // res.send("route handler 1 ");
  },
  (req, res, next) => {
    // res.send("handler route 2 ");
    next();
  },
  (req, res, next) => {
    // res.send("handler route 3 ");
    next();
  },
  (req, res, next) => {
    res.send("handler route 4 ");
    // next();
  }
);

app.listen(3000, () => console.log("Server started"));
