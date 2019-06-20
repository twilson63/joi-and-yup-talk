const express = require('express')

const app = express()

app.use(express.static('public'))
app.post('/api', express.json(), (req, res) => {
  res.send({ok: true})
})

app.listen(4040)
