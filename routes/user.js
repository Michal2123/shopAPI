const express = require("express");
const router = express.Router();
const putUser = require("../controllers/user-controller");
const veryfiToken = require("../middleware/veryfi-token");

router.put("/:id", veryfiToken, putUser);

module.exports = router;
