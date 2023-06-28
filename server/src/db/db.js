const Pool = require("pg").Pool;
const pool = new Pool({
  user: "saaardii",
  host: "localhost",
  database: "supervisio",
  password: "root",
  port: 5432,
});

module.exports = pool;
