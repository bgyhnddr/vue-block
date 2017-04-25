let fs = require('fs')
let attachment = require('../../functions/attachment')

exports.getAttachment = (req, res) => {
  return attachment.getAttachment(req.query.attachment_id).then((result) => {
    let localFile = fs.readFileSync("upload/files/" + result.file_hash, 'binary')
    res.setHeader('Content-disposition', 'inline; filename=' + encodeURIComponent(result.name))
    res.setHeader('Content-Type', result.file.type)
    res.setHeader('Content-Length', result.file.size)
    res.write(localFile, 'binary')
    res.end()
  })
}

exports.uploadFile = (req, res) => {
  return attachment.uploadFile(req).then((result) => {
    res.send(result)
  })
}
