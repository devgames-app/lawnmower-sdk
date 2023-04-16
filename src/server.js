const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const database = require('./database')

database.setup()

const app = express()
const port = config.port || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "1mb" }))

app.use(require('./middleware/logging'))
app.use(require('./routes'))

app.use((req, res) => {
  res.status(404).send({ error: 'Page not found' })
})

app.listen(port, () => {
  console.log(`SDK Server listening on port ${port}`)
})
