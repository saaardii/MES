const getJobs = "SELECT * FROM jobs;";
const setJob =
  "INSERT INTO jobs (sernum, lotname, product, mouldcode, norminalparts, numcavities, exptime, mouldname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
const getCycles = "SELECT * FROM quality ;";
const setCycle =
  "INSERT INTO quality (cyclecounter, lotname, product, job, cycletime, sernum, machinename, cushionstroke, dosingtime, injectiontime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";
module.exports = {
  getJobs,
  setJob,
  getCycles,
  setCycle,
};
