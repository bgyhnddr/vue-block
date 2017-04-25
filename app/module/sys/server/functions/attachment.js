let formidable = require('formidable')
let util = require('util')
let fs = require('fs')

let dealFile = (fileInfo) => {
  var file = require('../db/models/file')
  var attachment = require('../db/models/attachment')
  return file.upsert({
    hash: fileInfo.hash,
    size: fileInfo.size,
    path: "upload/files/" + fileInfo.hash,
    type: fileInfo.type
  }).then(() => {
    return attachment.create({
      file_hash: fileInfo.hash,
      name: fileInfo.name
    })
  })
}

exports.getAttachment = (attachment_id) => {
  return Promise.resolve().then(() => {
    var id = attachment_id
    if (id) {
      var fs = require('fs')
      var file = require('../db/models/file')
      var attachment = require('../db/models/attachment')
      attachment.belongsTo(file)
      return attachment.findOne({
        include: file,
        where: {
          id: id
        }
      }).then((result) => {
        if (result != null) {
          return result
        } else {
          return Promise.reject("no file record")
        }
      })
    } else {
      return Promise.reject("attachment id not found")
    }
  })
}

exports.uploadFile = (req) => {
  return new Promise(function(resolve, reject) {
    try {
      if (req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "upload/temp";
        form.maxFieldsSize = 2; //10G
        form.hash = "md5"

        if (!fs.existsSync("upload")) {
          fs.mkdirSync("upload")
        }

        if (!fs.existsSync("upload/files")) {
          fs.mkdirSync("upload/files")
        }
        if (!fs.existsSync("upload/temp")) {
          fs.mkdirSync("upload/temp")
        }

        form.on('file', function(name, file) {
          fs.rename(file.path, "upload/files/" + file.hash, function(result) {
            dealFile(file).then((result) => {
              resolve(result)
            }).catch((e)=>{
              reject(e)
            })
          })
        })
        form.on('error', function(err) {
          console.log('error' + err)
          reject(err)
        })
        form.parse(req)
      } else {
        reject("please post")
      }
    } catch (e) {
      reject("file upload error:" + e.message)
    }
  })
}
