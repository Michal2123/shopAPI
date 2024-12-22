const jwt = require("jsonwebtoken");
const { updateUserShippingDataDB, selectUserDB } = require("../db/user-db");

const patchUserDetails = async (data, token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    await updateUserShippingDataDB(data, userId);
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (token) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    const data = await selectUserDB(userId);
    return {
      firstName: data.first_name,
      lastName: data.last_name,
      city: data.city,
      zipCode: data.zip_code,
      address: data.address,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserDetails, patchUserDetails };
