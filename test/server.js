var express = require('express')
var config = require('../config')
var opn = require('opn')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port


var app = express()

require('../app/entry')(app)

app.use(express.static('./test/page'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

var uri = 'http://localhost:' + port
opn(uri)
opn(uri + "/upload.html")
