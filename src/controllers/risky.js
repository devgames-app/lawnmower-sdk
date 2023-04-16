const riskCheck = (req, res) => {
  res.send({
    retcode: 0,
    message: 'OK',
    data: { id: 'none', action: 'ACTION_NONE', geetest: null },
  })
}

module.exports = {
  riskCheck,
}
