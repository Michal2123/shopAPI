const request = require("./sql-connection");

//Data access for select all user order history
const selectHistoryDB = (userId) => {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT id, date, userOrder FROM history WHERE userId='${userId}'`,
      (err, recordset) => {
        if (err) {
          reject(err);
        }
        resolve(recordset.recordset);
      }
    );
  });
};

//Data access for inser new order to user order history
const insertHistoryDB = (data, userId) => {
  const { date, orderList } = data;
  return new Promise((resolve, reject) => {
    request.query(
      `INSERT INTO history OUTPUT Inserted.ID VALUES ('${userId}', '${date}', '${JSON.stringify(
        orderList
      )}')`,
      (err, recordset) => {
        if (err) {
          reject(err);
        }
        resolve({ id: recordset.recordset[0].ID, userId, orderList, date });
      }
    );
  });
};

module.exports = { insertHistoryDB, selectHistoryDB };
