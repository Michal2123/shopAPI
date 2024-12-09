const request = require("./sql-connection");

//Data access for select all products
const selectProductsDB = () => {
  return new Promise((resolve, reject) => {
    request.query("SELECT * FROM products", (err, recordsets) => {
      if (err) {
        reject(err);
      }
      resolve(recordsets.recordset);
    });
  });
};

module.exports = selectProductsDB;
