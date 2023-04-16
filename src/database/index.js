const sqlite3 = require('sqlite3').verbose()
const config = require('../config')

const db = new sqlite3.Database(config.database || ':memory:')

const setup = () => {
  db.serialize(() => {
    let createTableAccounts = 'CREATE TABLE IF NOT EXISTS accounts (uid INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, token TEXT UNIQUE)'
    db.run(createTableAccounts)
  })
}

const get = (stmt, params) => {
  return new Promise((res, rej) => {
    db.get(stmt, params, (error, result) => {
      if (error) {
        return rej(error.message)
      }
      return res(result)
    })
  })
}

const run = (stmt, params) => {
  return new Promise((res, rej) => {
    db.run(stmt, params, (error, result) => {
      if (error) {
        return rej(error.message)
      }
      return res(result)
    })
  })
}

module.exports = {
  setup,
  get,
  run,
}
