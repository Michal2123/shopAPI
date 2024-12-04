const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { secretKey, accessTokenSecret } = require("../config");

// Define the encryption key
const encryptionKey = secretKey;

// Function to encrypt data
const encryptData = (plaintext) => {
  const ciphertext = CryptoJS.AES.encrypt(plaintext, encryptionKey).toString();
  return ciphertext;
};

// Function to decrypt data
const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

// Function to create jwt token
const createToken = (userId) => {
  const token = jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "1h",
  });
  return { token };
};

module.exports = { encryptData, decryptData, createToken };
