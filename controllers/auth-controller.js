const { loginUser, registerUser } = require("../service/auth-service");

//Controller for post new user to data base
const postRegister = async (req, res, next) => {
  try {
    const data = req.body;
    const token = await registerUser(data);
    res.json(token);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

//Controller for post login user
const postLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await loginUser(data);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { postRegister, postLogin };
