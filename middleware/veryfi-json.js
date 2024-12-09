const {
  loginJSONValidation,
  registerJSONValidation,
} = require("../utlis/auth-schema");
const patchUserJSONValidation = require("../utlis/user-schema");

//Middlewere for check login JSON schema
const loginJSONVeryfi = (req, res, next) => {
  try {
    const data = req.body;
    const valid = loginJSONValidation(data);
    if (!valid) {
      throw new Error("Wrong login model schema");
    }
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//Middlewere for check registration JSON schema
const registerJSONVerify = (req, res, next) => {
  try {
    const data = req.body;
    const valid = registerJSONValidation(data);
    if (!valid) {
      throw new Error("Wrong register model schema");
    }
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//Middlewere for check user JSON schema for update shipping details, email and password
const patchUserJSONVerify = (req, res, next) => {
  try {
    const data = req.body;
    const valid = patchUserJSONValidation(data);
    if (!valid) {
      throw new Error("Wrong user model schema");
    }
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = { loginJSONVeryfi, registerJSONVerify, patchUserJSONVerify };
