const jwt = require("jsonwebtoken");
const { encryptData } = require("../utlis/crypto");
const {
  updateUserLoginDB,
  updateUserPasswordDB,
  updateUserShippingDataDB,
  selectUserDB,
} = require("../db/user-db");

const patchUserDetails = async (data, token) => {
  try {
    const keys = Object.keys(data);
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    if (keys.includes("email")) {
      await updateUserLoginDB(data.email, userId);
    } else if (keys.includes("password")) {
      await updateUserPasswordDB(encryptData(data.password), userId);
    } else {
      await updateUserShippingDataDB(data, userId);
    }
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    const data = await selectUserDB(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserDetails, patchUserDetails };
