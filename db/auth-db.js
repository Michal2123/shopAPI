const pool = require("./postgersql-connection");
const { v1: uuidv1 } = require("uuid");

//Data access for register new user
const registerUserDB = async (data) => {
  const id = uuidv1();
  try {
    await pool.query("BEGIN");
    await pool.query("INSERT INTO auth VALUES ($1,$2,$3)", [
      id,
      data.email,
      data.password,
    ]);
    await pool.query("INSERT INTO users VALUES ($1,$2,$3,$4,$5,$6)", [
      id,
      data.firstName,
      data.lastName,
      data.city,
      data.zipCode,
      data.address,
    ]);
    await pool.query("COMMIT");
    return id;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

//Data access for login user
const loginUserDB = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM auth WHERE login=$1`, [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.rows[0]);
    });
  });
};

module.exports = { registerUserDB, loginUserDB };
