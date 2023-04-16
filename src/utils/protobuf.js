const protobuf = require('protobufjs')
const path = require('path')

const protoPath = path.join(__dirname, '..', '..', 'proto')

module.exports = {
  regionListRsp: (query_region_list) => {
    let root = protobuf.loadSync(protoPath + '/QueryRegionListHttpRsp.proto')
    let QueryRegionListHttpRsp = root.lookupType('QueryRegionListHttpRsp')
    let list = QueryRegionListHttpRsp.create(query_region_list)
    return Buffer.from(QueryRegionListHttpRsp.encode(list).finish()).toString('base64')
  },
}
