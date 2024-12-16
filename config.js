const dotenv = require("dotenv");

dotenv.config();

const {
  ACCESS_TOKEN_SECRET,
  SECRET_KEY,
  PORT,
  DATABASE,
  HOST,
  USER,
  PASSWORD,
  DBPORT,
} = process.env;
module.exports = {
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  secretKey: SECRET_KEY,
  port: PORT,
  database: DATABASE,
  host: HOST,
  user: USER,
  password: PASSWORD,
  dbport: DBPORT,
};
