const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config");

//Middlewere for veryfi user jwt token
const veryfiToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    await new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = veryfiToken;
