const Pool = require("pg").Pool;
const pool = new Pool({
  user: "saaardii",
  host: "localhost",
  database: "mesdb",
  password: "suppsupp",
  port: 5432,
});

module.exports = pool;
