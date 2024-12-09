const getAllProducts = require("../service/product-service");

//Controller for get all products
const getProducts = async (req, res, next) => {
  try {
    const data = await getAllProducts();
    res.send(data);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

module.exports = getProducts;
