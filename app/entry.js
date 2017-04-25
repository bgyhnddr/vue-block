module.exports = function(app) {
  let fs = require('fs')
  let session = require('express-session')
  let bodyParser = require('body-parser')
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
  app.use(bodyParser.json())
  app.use(session({
    secret: '1234567890QWERTY'
  }))

  app.use("/service/public/:module/:type/:action", (req, res) => {
    Promise.resolve().then(() => {
      return require('./module/' + req.params.module + '/server/service/public/' + req.params.type)[req.params.action](req, res)
    }).catch((e) => {
      console.log(e)
      res.status(500).send(e.toString())
    })
  })
}
