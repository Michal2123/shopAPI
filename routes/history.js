const express = require("express");
const router = express.Router();
const {
  getHistory,
  postHistory,
} = require("../controllers/history-controller");
const veryfiToken = require("../middleware/veryfi-token");

//Route for get all user order history
router.get("/", veryfiToken, getHistory);

//Route for insert new order to user order history
router.post("/", veryfiToken, postHistory);

module.exports = router;
