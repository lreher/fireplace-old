module.exports = function(request, callback) {
  var buffer = Buffer.from("")

  request.on("data", function(chunk) {
    buffer = Buffer.concat([buffer, chunk])
  })

  request.on("end", function() {
    var body

    if (buffer.length !== 0) {
      body = JSON.parse(buffer.toString())
    }

    callback(null, body)
  })
}
