const dotenv = require("dotenv");

dotenv.config();

const { ACCESS_TOKEN_SECRET, SECRET_KEY, PORT } = process.env;
module.exports = {
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  secretKey: SECRET_KEY,
  port: PORT,
};
