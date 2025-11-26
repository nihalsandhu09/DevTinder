const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//
app.post("/signup", async (req, res) => {
  const userObj = req.body;
  // const { firstName, secondName, email, password, age, gender } = userObj;
  // if (!firstName || !secondName || !email || !password || !age || !gender) {
  //   res.send("something is missing ");
  // }

  try {
    //   Creating a new instance of User Model
    const user = new User(userObj);

    await user.save(); // return us the promise
    res.send("user signed up");
  } catch (error) {
    res.status(400).send("error saving the user" + error.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not existed");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong : " + err.message);
  }
});

//
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(400).send("User is not Exist ");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong : " + error.message);
  }
});

//
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User is not Exist ");
    }
    // if (password !== user.passWord) {
    //   return res.status(400).send("Invalid password");
    // }
    res.send("Login succesfull");
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send("User not founds");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).send("User not founds");
    }

    res.send("user deleted succesfully ");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});
app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    res.send(updateUser);
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
  }
});

// update the user with emailid
app.patch("/user", async (req, res) => {
  const { email, ...updateFields } = req.body;

  try {
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { $set: updateFields },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).send("User not found");
    }
    res.send(updateUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => console.log("Server started"));
  })
  .catch((err) => {
    console.log("not connect properly");
    console.log(err);
  });
