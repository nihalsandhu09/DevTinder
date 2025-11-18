const adminauth = (req, res, next) => {
  console.log("admin auth getting checked ");
  const token = "xyz";
  const isAdmingAuthorized = token === "xyz";
  if (!isAdmingAuthorized) {
    res.status(401).send("user is not authorized");
  } else {
    next();
  }
};

const userauth = (req, res, next) => {
  console.log("user auth is getting checked ");
  const token = "xyz";
  const isAdmingAuthorized = token === "xyz";
  if (!isAdmingAuthorized) {
    res.status(401).send("user is not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminauth,
  userauth,
};
