const { loginUser, registerUser } = require("../service/auth-service");

const postRegister = async (req, res, next) => {
  try {
    const token = await registerUser();
    res.json(token);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const token = await loginUser(data);
    res.json(token);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

module.exports = { postRegister, postLogin };
