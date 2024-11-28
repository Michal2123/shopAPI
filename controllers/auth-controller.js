const postRegister = (req, res, next) => {
  res.send("Post Register");
};

const postLogin = (req, res, next) => {
  res.send("Post Login");
};

module.exports = { postRegister, postLogin };
