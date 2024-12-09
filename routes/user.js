const express = require("express");
const router = express.Router();
const { getUser, patchUser } = require("../controllers/user-controller");
const veryfiToken = require("../middleware/veryfi-token");
const { patchUserJSONVerify } = require("../middleware/veryfi-json");

//Route for update user data, shipping details, email and password
router.patch("/", veryfiToken, patchUserJSONVerify, patchUser);

//Route for get user shipping details data
router.get("/", veryfiToken, getUser);

module.exports = router;
