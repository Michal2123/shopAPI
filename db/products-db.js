const pool = require("./postgersql-connection");

//Data access for select all products
const selectProductsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products", (err, result) => {
      if (result) {
        resolve(result.rows);
      }
      reject(err);
    });
  });
};

module.exports = selectProductsDB;
