const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Nihal",
    lastName: "Sandhu",
    email: "nihalsandhu007220@gmail.com",
    password: "nihal@1234",
  };
  //   Creating a new instance of User Model
  const user = new User(userObj);

  await user.save(); // return us the promise
  res.send("user signed up");
});

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => console.log("Server started"));
  })
  .catch((err) => {
    console.log("not connect properly");
    console.log(err);
  });
