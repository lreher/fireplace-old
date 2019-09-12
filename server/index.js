var http = require('http')
var createRouter = require("../router")
var createDB = require("../services/db")

module.exports = function(config) {
  var services = {
    db: createDB(config)
  }

  var router = createRouter(services)
  var server = http.createServer(router)

  return server.listen(config.get("port"))
}
