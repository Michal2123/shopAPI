const {
  getUserHistory,
  postUserHistory,
} = require("../service/history-service");

const getHistory = async (req, res, next) => {
  try {
    const data = await getUserHistory();
    res.send(data);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

const postHistory = async (req, res, next) => {
  try {
    const data = await postUserHistory();
    res.send(data);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

module.exports = { getHistory, postHistory };
