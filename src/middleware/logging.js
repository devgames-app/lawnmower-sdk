const logging = (req, res, next) => {
  var datetime = new Date()
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`[${datetime.toString()}][${ip}][${req.method}] ${req.originalUrl}`)
  next()
}

module.exports = logging
