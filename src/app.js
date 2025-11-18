const express = require("express");

const app = express();
app.use(express.json());
app.post("/login", (req, res, next) => {
  if (req.body.username && req.body.password) {
    res.send("Login succesfull");
  } else {
    next(new Error("Something is fishy "));
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => console.log("Server started"));
