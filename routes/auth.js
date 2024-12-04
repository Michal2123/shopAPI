const express = require("express");
const router = express.Router();
const { postLogin, postRegister } = require("../controllers/auth-controller");
const {
  loginJSONVeryfi,
  registerJSONVerify,
} = require("../middleware/veryfi-json");

router.post("/login", loginJSONVeryfi, postLogin);

router.post("/register", registerJSONVerify, postRegister);

module.exports = router;
