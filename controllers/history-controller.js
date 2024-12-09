const {
  getUserHistory,
  postUserHistory,
} = require("../service/history-service");

//Controller for get all user order history
const getHistory = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const data = await getUserHistory(token);
    res.send(data);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

//Controller for post new order to user order hisoty
const postHistory = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const data = await postUserHistory(req.body, token);
    res.json(data);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

module.exports = { getHistory, postHistory };
