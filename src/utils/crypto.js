const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const dataPath = path.join(__dirname, '..', '..', 'data')

const key = () => fs.readFileSync(dataPath + '/key.bin')

const seed = () => fs.readFileSync(dataPath + '/seed.bin')

const xor = (buffer, key) => {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= key[i % key.length]
  }
  return buffer
}

const generateMd5 = (input) => {
  return crypto.createHash('md5').update(input).digest('hex')
}

module.exports = {
  key,
  seed,
  xor,
  generateMd5,
}
