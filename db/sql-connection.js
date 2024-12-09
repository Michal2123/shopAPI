const sql = require("mssql/msnodesqlv8");
const { database, server } = require("../config");

//Create connection for sql server
sql.connect(
  {
    server: server,
    database: database,
    options: {
      trustedConnection: true,
    },
  },
  (err) => {
    if (err) throw err;
  }
);

const request = new sql.Request();

module.exports = request;
