const { Pool } = require("pg");
const { database, host, password, dbport, user } = require("../config");

//Create new Pool for postgres queres
const pool = new Pool({
  database: database,
  host: host,
  port: dbport,
  password: password,
  user: user,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.log(`connection error: ${err}`);
  throw err;
});

module.exports = pool;
