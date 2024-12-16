const pool = require("./postgersql-connection");

//Data access for update user shipping detalis
const updateUserShippingDataDB = (data, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
        SET first_name = $1, last_name = $2, city = $3, zip_code = $4, address = $5
        WHERE user_id= $6`,
      [
        data.firstName,
        data.lastName,
        data.city,
        data.zipCode,
        data.address,
        userId,
      ],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

//Data access for select user shipping details
const selectUserDB = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT first_name, last_name, city, zip_code, address FROM users
            WHERE user_id=$1`,
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.rows[0]);
      }
    );
  });
};

module.exports = {
  updateUserShippingDataDB,
  selectUserDB,
};
