const jwt = require("jsonwebtoken");
const { insertHistoryDB, selectHistoryDB } = require("../db/history-db");

const getUserHistory = async (token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    const data = await selectHistoryDB(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const postUserHistory = async (data, token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    return await insertHistoryDB(data, userId);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserHistory, postUserHistory };
