const request = require("./sql-connection");

//Data access for update user shipping detalis
const updateUserShippingDataDB = (data, userId) => {
  return new Promise((resolve, reject) => {
    request.query(
      `UPDATE users
        SET firstName ='${data.firstName}', lastName ='${data.lastName}', city ='${data.city}', zipCode ='${data.zipCode}', address ='${data.address},'
        WHERE userId='${userId}'`,
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
    request.query(
      `SELECT firstName, lastName, city, zipCode, address FROM users
            WHERE userId='${userId}'`,
      (err, recordsets) => {
        if (err) {
          reject(err);
        }
        resolve(recordsets.recordset[0]);
      }
    );
  });
};

//Data access for update user email/login
const updateUserLoginDB = (email, userId) => {
  return new Promise((resolve, reject) => {
    request.query(
      `UPDATE auth
        SET login ='${email}'
        WHERE id='${userId}'`,
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

//Data access for update user password
const updateUserPasswordDB = (password, userId) => {
  return new Promise((resolve, reject) => {
    request.query(
      `UPDATE auth
        SET password ='${password}'
        WHERE id='${userId}'`,
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

module.exports = {
  updateUserLoginDB,
  updateUserPasswordDB,
  updateUserShippingDataDB,
  selectUserDB,
};
