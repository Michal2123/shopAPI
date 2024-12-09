const express = require("express");
const router = express.Router();
const { postLogin, postRegister } = require("../controllers/auth-controller");
const {
  loginJSONVeryfi,
  registerJSONVerify,
} = require("../middleware/veryfi-json");

//Route for login user
router.post("/login", loginJSONVeryfi, postLogin);

//Route for register user
router.post("/register", registerJSONVerify, postRegister);

module.exports = router;
