const express = require("express");
const router = express.Router();
const putUser = require("../controllers/user-controller");

router.put("/:id", putUser);

module.exports = router;
