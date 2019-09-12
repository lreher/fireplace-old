var roomsController = require("./rooms")
var songsController = require("./songs")
var createApiCall = require("./apiCall")

module.exports = function(fastn) {
  var app = {
    mutate: fastn.Model,
    apiUrl: ".",
    state: {
      onRoom: false,
      songSearchResults: []
    }
  }

  app.apiCall = createApiCall(app)
  app.rooms = roomsController(app)
  app.songs = songsController(app)

  return app
}
