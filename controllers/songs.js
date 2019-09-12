var { Song } = require("../validators/songs")

function addSong(scope, callback) {
  var roomName = decodeURIComponent(scope.tokens.roomName)

  Song({
      ...scope.body,
      roomName: roomName
    },
    function(error, song) {
      if (error) {
        return callback({
          ...error,
          code: 400,
        })
      }

      scope.services.db.create("roomSongs", song, callback)
    }
  )
}

function getRoomSongs(scope, callback) {
  var roomName = decodeURIComponent(scope.tokens.roomName)

  scope.services.db.query("roomSongs", [
    ['roomName', '=', roomName]
  ], function (error, rows) {
    if (error) {
      return callback(error)
    }

    if (rows.length === 0) {
      return callback({
        code: 404,
        message: `No songs found in room ${roomName}.`
      })
    }
    callback(null, rows)
  })
}

function getSpotifySong(scope, callback) {
  var songName = decodeURIComponent(scope.tokens.songName)

  scope.services.db.query("spotifySongs", [
    ['name', '=', songName]
  ], function (error, rows) {
    if (error) {
      return callback(error)
    }

    if (rows.length === 0) {
      return callback({
        code: 404,
        message: `No songs found in Spotify with name ${songName}.`
      })
    }
    callback(null, rows)
  })
}

module.exports = {
  addSong: addSong,
  getRoomSongs: getRoomSongs,
  getSpotifySong: getSpotifySong
}
