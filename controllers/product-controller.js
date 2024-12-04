const getAllProducts = require("../service/product-service");

const getProducts = async (req, res, next) => {
  try {
    const data = await getAllProducts();
    res.send(data);
  } catch (error) {
    res.sendStatus(500) && next(error);
  }
};

module.exports = getProducts;
