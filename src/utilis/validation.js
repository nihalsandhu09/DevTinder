const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enmter the name properly");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("entered password is not strong ");
  }
};

module.exports = validateSignUpData;
