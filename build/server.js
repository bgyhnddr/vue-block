var express = require('express')
var config = require('../config')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port


var app = express()

require('./entry')(app)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
