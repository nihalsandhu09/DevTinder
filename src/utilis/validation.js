const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter the name properly");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("entered password is not strong ");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed ? true : false;
};
module.exports = { validateSignUpData, validateEditProfileData };
