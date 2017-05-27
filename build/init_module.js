var fs = require('fs')
module.exports = () => {
  fs.readdirSync('app/module').forEach((f) => {
    if (fs.existsSync('app/module/' + f + '/init.js')) {
      require('../app/module/' + f + '/init.js')()
    }
  })
}
