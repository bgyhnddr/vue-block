let fs = require('fs')
let models = []

let initModels = (mods) => {
  mods.forEach((m) => {
    fs.readdirSync("app/module/" + m + "/server/db/models").forEach((o) => {
      models.push('./module/' + m + "/server/db/models/" + o)
    })
  })
}
module.exports = (types) => {
  if (!types) {
    initModels(fs.readdirSync('app/module'))
  } else {
    initModels(types)
  }


  return Promise.resolve().then(() => {
    return Promise.all(models.map((o) => {
      return require(o).sync({
        force: true
      })
    }))
  }).then(function() {
    console.log("success")
  }).catch(function(e) {
    console.log(e)
  })
}
