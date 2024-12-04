const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config");

const veryfiToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, accessTokenSecret);
    req.userId = decoded.userId;
    next();
  } catch (_) {
    res.sendStatus(401);
  }
};

module.exports = veryfiToken;
