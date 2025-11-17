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
