const express = require("express");
const router = express.Router();
const {
  getHistory,
  postHistory,
} = require("../controllers/history-controller");

router.get("/", getHistory);

router.post("/", postHistory);

module.exports = router;
