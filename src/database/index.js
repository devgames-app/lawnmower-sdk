const mysql = require("mysql");
const config = require("../config");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

const get = (stmt, params) => {
  return new Promise((resolve, reject) => {
    pool.query(stmt, params, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      return resolve(results[0]);
    });
  });
};

const run = (stmt, params) => {
  return new Promise((resolve, reject) => {
    pool.query(stmt, params, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  get,
  run,
};
