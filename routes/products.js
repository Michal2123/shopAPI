const express = require("express");
const router = express.Router();
const getProducts = require("../controllers/product-controller");

//Route for get all products
router.get("/", getProducts);

module.exports = router;
