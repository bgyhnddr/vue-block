var fs = require('fs')
var routers = []
module.exports = () => {
  fs.readdirSync('app/module').forEach((f) => {
    if (fs.existsSync('app/module/' + f + '/router.js')) {
      routers.push(f)
    }
  })

  fs.writeFileSync("app/router/router.js", routers.map((o) => {
      return "import " + o + " from '../module/" + o + "/router'"
    }).join('\n') + "\n" + "export default [" +
    routers.map((o) => {
      return o
    }).join(',') + "]")
}
