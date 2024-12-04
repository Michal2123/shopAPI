const { decryptData, encryptData, createToken } = require("../utlis/crypto");

const registerUser = async () => {
  await setTimeout(() => {}, 3000);
  return createToken(1);
};

const loginUser = async (data) => {
  await setTimeout(() => {}, 3000);
  console.log(data);
  return createToken(1);
};

module.exports = { registerUser, loginUser };
