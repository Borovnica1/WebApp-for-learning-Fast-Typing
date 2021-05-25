const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello SSSS')
})
 
app.listen(3000)