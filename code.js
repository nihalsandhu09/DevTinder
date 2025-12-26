app.use(express.json());
app.use((req, res, next) => {
  console.log("Time ", Date.now());
});
// app.get("/user", (req, res) => {
//   res.send({ firstName: "nihal", lastName: "Sandhu" });
// });
// app.post("/user", (req, res) => {
//   console.log("save data to database");
//   res.send("data saved succesfullt to the database");
// });

// app.delete("/user", (req, res) => {
//   res.send("user deleted succefully");
// });

// app.patch("/user", (req, res) => {
//   res.send("user updated succesfully");
// });
// app.put("/user", (req, res) => {
//   res.send("user whole data changed");
// });

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Body received");
});

app.get("/user/:id", (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

app.get("/search", (req, res) => {
  res.send(req.query);
});

// // app.get("/abc", (req, res) => {
// //   res.send({ firstName: "nihal", lastName: "Sandhu" });
// });
const { adminauth, userauth } = require("./Middlewares/auth");
app.use("/admin", adminauth);

app.post("/user/login", (req, res) => {
  res.send("logged in");
});

app.get("/user", userauth, (req, res) => {
  res.send("User data sent ");
});

app.get("/admin/getalldata", (req, res) => {
  console.log("data is sent ");
  res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delee user");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
}); // handle Auth Middlreware for all request GET ,POST

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("dvbcjhdh");
    res.send("user data sent ");
  } catch (err) {
    res.status(500).send("some error contatctsupport team");
  }
});
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("something went wrong");
//   }
// });

app.get("/orders/:id", (req, res, next) => {
  const id = req.params.id;

  if (isNaN(id)) {
    // sync error → automatically goes to error handler if passed with next
    return next(new Error("Invalid order id"));
  }

  res.send("Order fetched");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// login

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

// Authentication  user

app.use(express.json());

//  user token logic
const checkToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return next(new Error("Token missing"));
  }

  const user = users.find((u) => u.token === token);

  if (!user) {
    return next(new Error("Invalid token"));
  }

  next();
};

// user profile
app.get("/profile", checkToken, (req, res) => {
  res.send("Welcome to your profile");
});

const users = [];

// user register
app.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) return next(new Error("Name is required"));
  if (!email) return next(new Error("Email is required"));
  if (!password) return next(new Error("Password is required"));
  users.push({ name, password, email });
  res.send("User registered successfully");
});

//  user  login
app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new Error("Email is required"));
  if (!password) return next(new Error("Password is required"));

  const user = users.find((u) => u.email === email);
  if (!user) {
    return next(new Error("user not found"));
  }

  if (user.password !== password) {
    return next(new Error("incorrect password"));
  }

  const token = Math.random().toString(36).substring(2);
  user.token = token;
  res.send({ message: "login succesfull", token: token });
});

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
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
  const Allowed_updates = ["photoUrl", "about", "gender", "age", "skills"];
  const isupdateAllowed = Object.keys(updateFields).every((k) =>
    Allowed_updates.includes(k)
  );
  if (!isupdateAllowed) {
    return res.status(400).send("update not allowed");
  }
  if (updateFields.skills && updateFields.skills.length > 10) {
    return res.status(400).send("cannot add more then 10 skills ");
  }
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
