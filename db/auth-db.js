const request = require("./sql-connection");
const { v1: uuidv1 } = require("uuid");

//Data access for register new user
const registerUserDB = (data) => {
  const id = uuidv1();
  return new Promise((resolve, reject) => {
    request.query(
      `BEGIN TRANSACTION
      INSERT INTO auth VALUES ('${id}','${data.email}','${data.password}');
      INSERT INTO users VALUES ('${id}','${data.firstName}','${data.lastName}','${data.city}','${data.zipCode}','${data.address}');
      COMMIT`,
      (err, __) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(id);
      }
    );
  });
};

//Data access for login user
const loginUserDB = (email) => {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT * FROM auth WHERE login='${email}'`,
      (err, recordset) => {
        if (err) {
          reject(err);
        }
        resolve(recordset.recordset[0]);
      }
    );
  });
};

module.exports = { registerUserDB, loginUserDB };
