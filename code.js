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
