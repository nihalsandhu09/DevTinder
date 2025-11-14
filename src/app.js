const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("hello from dasboard");
});

app.use("/hello", (req, res) => {
  res.send("hello helo hello  ");
});
app.use("/test", (req, res) => {
  res.send("hello from the server ");
});

app.listen(3000, () => console.log("Server started"));
grgrgr;
