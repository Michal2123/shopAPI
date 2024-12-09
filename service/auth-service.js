const { decryptData, encryptData, createToken } = require("../utlis/crypto");
const { registerUserDB, loginUserDB } = require("../db/auth-db");
const { getUserDetails } = require("./user-service");
const createError = require("http-errors");

const registerUser = async (data) => {
  try {
    const newAccount = {
      ...data,
      password: encryptData(data.password),
    };
    const id = await registerUserDB(newAccount);
    return createToken(id);
  } catch (error) {
    if (error.message.includes("UNIQUE KEY")) {
      throw createError(403);
    }
    throw error;
  }
};

const loginUser = async (data) => {
  try {
    const { email, password } = data;
    const recordset = await loginUserDB(email);
    if (!recordset || password !== decryptData(recordset.password)) {
      throw createError(401);
    }
    const token = createToken(recordset.id);
    const user = await getUserDetails(token);
    const fullUser = { ...user, email };
    return { accessToken: token, user: fullUser };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
