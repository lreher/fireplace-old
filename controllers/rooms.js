function createRoom(scope, callback) {
  getRoom(scope, function(error) {
    if(error) {
      scope.services.db.create("rooms", {
        name: scope.body.name,
        password: scope.body.password
      }, function(error, row) {
        callback(error, row && {
          ...row,
          password: undefined
        })
      })
    } else {
      callback({
        code: 400,
        message: `A room with name ${scope.tokens.roomName} already exists... idiot.`
      })
    }
  })
}

function getRoom(scope, callback) {
  var roomName = decodeURIComponent(scope.tokens.roomName)

  scope.services.db.query("rooms", [
    ['name', '=', roomName]
  ], function (error, rows) {
    if (error) {
      return callback(error)
    }

    if (rows.length === 0) {
      return callback({
        code: 404,
        message: `No room found with Name ${roomName}.`
      })
    }
    callback(null, {
      ...rows[0],
      password: undefined
    })
  })
}

module.exports = {
  createRoom: createRoom,
  getRoom: getRoom
}
