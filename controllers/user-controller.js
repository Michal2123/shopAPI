const putUserDetails = require("../service/user-service");

const putUser = (req, res, next) => {
  try {
    const data = putUserDetails();
    res.send(data);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

module.exports = putUser;
