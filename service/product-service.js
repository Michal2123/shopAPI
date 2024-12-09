const selectProductsDB = require("../db/products-db");

const getAllProducts = async () => {
  try {
    const data = await selectProductsDB();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllProducts;
