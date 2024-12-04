const express = require("express");
const router = express.Router();
const {
  getHistory,
  postHistory,
} = require("../controllers/history-controller");
const veryfiToken = require("../middleware/veryfi-token");

router.get("/", veryfiToken, getHistory);

router.post("/", veryfiToken, postHistory);

module.exports = router;
