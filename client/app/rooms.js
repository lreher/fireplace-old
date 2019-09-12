module.exports = function(app) {
  function setCurrentRoom(name, room) {
    app.mutate.set(app.state, "currentRoomName", name)

    if (room) {
      app.mutate.set(app.state, "currentRoom", room)
      app.songs.getRoomSongs()
    } else {
      getRoom(name)
    }
  }

  function createRoom(data) {
    app.apiCall({
      method: "post",
      url: "/rooms",
      data: data
    }, function(error, result) {
      if (error) {
        alert("shit!  " + error.message)
      }

      setCurrentRoom(result.name, result)
      app.mutate.set(app.state, "onRoom", true)
    })
  }

  function getRoom(name) {
    app.apiCall({
      method: "get",
      url: `/rooms/${name}`
    }, function(error, result) {
      if (error) {
        alert("shit!  " + error.message)
      }

      setCurrentRoom(result.name, result)
    })
  }

  return {
    createRoom: createRoom,
    getRoom: getRoom
  }
}
