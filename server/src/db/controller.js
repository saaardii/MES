const pool = require("./db");
const queries = require("./queries");

const getJobs = async () => {
  const data = await pool.query(queries.getJobs);
  return data.rows;
};

const setJob = (data) => {
  pool.query(queries.setJob, [
    data.serNum,
    data.lotName,
    data.product,
    data.mouldCode,
    data.norminalParts,
    data.numCavities,
    data.expCycTime,
    data.name,
  ]);
};

const getCycles = async () => {
  const data = await pool.query(queries.getCycles);
  return data.rows;
};

const setCycle = (
  cyclecounter,
  lotname,
  product,
  job,
  cycletime,
  sernum,
  machinename,
  cushionstroke,
  dosingtime,
  injectiontime
) => {
  pool.query(queries.setCycle, [
    cyclecounter,
    lotname,
    product,
    job,
    cycletime,
    sernum,
    machinename,
    cushionstroke,
    dosingtime,
    injectiontime,
  ]);
};

module.exports = {
  getJobs,
  setJob,
  getCycles,
  setCycle,
};
