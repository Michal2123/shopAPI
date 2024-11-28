const getHistory = (req, res, next) => {
  res.send("Get History");
};

const postHistory = (req, res, next) => {
  res.send("Post History");
};

module.exports = { getHistory, postHistory };
