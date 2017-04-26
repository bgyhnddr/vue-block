var express = require('express')
var config = require('../config')
var opn = require('opn')
var webpack = require('webpack')
var webpackConfig = require('./webpack.test.conf.js')
var rm = require('rimraf')
var ora = require('ora')
var fs = require('fs')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port


var app = express()

require('../app/entry')(app)

var tests = []
fs.readdirSync('app/module').forEach((f) => {
  if (fs.existsSync('app/module/' + f + '/test')) {
    fs.readdirSync('app/module/' + f + '/test').forEach((t) => {
      tests.push("require('../../app/module/restaurant/test/" + t + "')")
    })
  }
})
fs.writeFileSync("test/page/entry.js", tests.join('\n'))

var spinner = ora('building for test...')
spinner.start()


rm('./test/page/dist', err => {
  if (err) throw err
  webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    app.use(express.static('./test/page'))

    app.listen(port, function(err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('Listening at http://localhost:' + port + '\n')
    })

    // var uri = 'http://localhost:' + port
    // opn(uri)
    // opn(uri + "/upload.html")
  })
})
