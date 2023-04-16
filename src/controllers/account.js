const path = require('path');
const database = require('../database')
const crypto = require('../utils/crypto')

const showRegister = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../views/register.html'))
}

const doRegister = (req, res) => {
  if (typeof req.body.username !== 'undefined' && /^([a-zA-Z0-9]{6,})$/.test(req.body.username)) {
    let username = req.body.username.toLowerCase()
    let token = crypto.generateMd5(username)
    database.run('INSERT INTO accounts (username, token) VALUES (?, ?)', [username, token]).then((result) => {
      res.send({
        retcode: 0,
        message: 'Account registered successfully.'
      })
    }).catch(() => {
      res.send({
        retcode: -1,
        message: 'Username already exist!'
      })
    })
  } else {
    res.send({
      retcode: -1,
      message: 'Invalid username. Require at least 6 characters long!'
    })
  }
}

module.exports = {
  showRegister,
  doRegister
}
