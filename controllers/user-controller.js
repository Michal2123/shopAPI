const { getUserDetails, patchUserDetails } = require("../service/user-service");

//Controller for patch user account details
const patchUser = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.header("Authorization");
    await patchUserDetails(data, token);
    res.sendStatus(200);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

//Controller for get user account details
const getUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const data = await getUserDetails(token);
    res.json(data);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

module.exports = { getUser, patchUser };
