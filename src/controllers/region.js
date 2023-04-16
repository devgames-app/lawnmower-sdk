const crypto = require('../utils/crypto')
const protobuf = require('../utils/protobuf')
const config = require('../config')

const regionList = (req, res) => {
  let customConfig = {
    sdkenv: 2,
    checkdevice: false,
    loadPatch: false,
    showexception: false,
    regionConfig: 'pm|fk|add',
    downloadMode: 0,
  }
  customConfig = crypto.xor(Buffer.from(JSON.stringify(customConfig)), crypto.key())
  res.send(
    protobuf.regionListRsp({
      regionList: config.region,
      clientSecretKey: crypto.seed(),
      clientCustomConfigEncrypted: customConfig,
      enableLoginPc: true,
    })
  )
}

module.exports = {
  regionList,
}
