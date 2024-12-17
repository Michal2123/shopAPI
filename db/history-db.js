const pool = require("./postgersql-connection");

//Data access for select all user order history
const selectHistoryDB = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id, date, user_order FROM history WHERE user_id=$1",
      [userId],
      (err, result) => {
        if (result) {
          resolve(result.rows);
        }
        reject(err);
      }
    );
  });
};

//Data access for inser new order to user order history
const insertHistoryDB = (data, userId) => {
  const { date, orderList } = data;
  const jsonOrder = JSON.stringify(orderList);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO history (user_id, date, user_order) VALUES ($1, $2, $3) RETURNING id`,
      [userId, date, jsonOrder],
      (err, result) => {
        if (result) {
          const id = result.rows[0].id;
          resolve({ id, userId, orderList, date });
        }
        reject(err);
      }
    );
  });
};

module.exports = { insertHistoryDB, selectHistoryDB };
