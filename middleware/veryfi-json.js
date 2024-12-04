const {
  loginJSONValidation,
  registerJSONValidation,
} = require("../utlis/auth-schema");

const loginJSONVeryfi = (req, res, next) => {
  try {
    const data = req.body;
    const valid = loginJSONValidation(data);
    if (!valid) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.sendStatus(400) && next(error);
  }
};

const registerJSONVerify = (req, res, next) => {
  try {
    const data = req.body;
    const valid = registerJSONValidation(data);
    if (!valid) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.sendStatus(400) && next(error);
  }
};

module.exports = { loginJSONVeryfi, registerJSONVerify };
