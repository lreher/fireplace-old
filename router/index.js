var roomsController = require('../controllers/rooms')
var songsController = require('../controllers/songs')
var requestData = require("request-data")
var path = require("path")
var SeaLion = require("sea-lion")
var Dion = require("dion")

var router = new SeaLion()
var fileServer = new Dion(router)


module.exports = function(services) {
  function handleRequest(controllerMethod){
    return function(request, response, tokens, body){
      var scope = {
        request,
        response,
        tokens,
        body,
        services
      }

      controllerMethod(scope, function(error, result) {
        if(error) {
          response.writeHead(error.code || 500)
          response.end(JSON.stringify(error))
          //response.end(error.code ? error.message : "Ohno")

          return
        }

        response.writeHead(200, {
          'content-type': "application/json"
        })
        response.end(JSON.stringify(result))
      })
    }
  }

  router.add({
    "/": fileServer.serveFile(path.resolve(__dirname, "../client/static/index.html"), 'text/html'),
    "/spotify/`songName`": {
      "get": handleRequest(songsController.getSpotifySong)
    },
    "/rooms": {
      "post": requestData(handleRequest(roomsController.createRoom))
    },
    "/rooms/`roomName`": {
      "get": handleRequest(roomsController.getRoom)
    },
    "/rooms/`roomName`/songs/`songName`": {
      "post": requestData(handleRequest(songsController.addSong))
    },
    "/rooms/`roomName`/songs": {
      "get": handleRequest(songsController.getRoomSongs)
    },
    "/`path...`": fileServer.serveDirectory(path.resolve(__dirname,"../client/static"), {
      ".js": "application/javascript",
      ".css": "text/css"
    })
  })

  return router.createHandler()
}
