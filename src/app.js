const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "nihal", lastName: "Sandhu" });
});
app.post("/user", (req, res) => {
  console.log("save data to database");
  res.send("data saved succesfullt to the database");
});

app.delete("/user", (req, res) => {
  res.send("user deleted succefully");
});

app.patch("/user", (req, res) => {
  res.send("user updated succesfully");
});
app.put("/user", (req, res) => {
  res.send("user whole data changed");
});
app.listen(3000, () => console.log("Server started"));
