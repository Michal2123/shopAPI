const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { insertHistoryDB, selectHistoryDB } = require("../db/history-db");

const getUserHistory = async (token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    const data = await selectHistoryDB(userId);
    const newData = data.map((item) => {
      const encoded = JSON.parse(item.user_order);
      return {
        id: item.id,
        date: item.date,
        orderList: encoded,
      };
    });
    return newData;
  } catch (error) {
    throw error;
  }
};

const postUserHistory = async (data, token) => {
  try {
    if (!Object.keys(data).length) {
      throw createError(400);
    }
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    return await insertHistoryDB(data, userId);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserHistory, postUserHistory };
