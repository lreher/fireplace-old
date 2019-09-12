module.exports = function(app) {
  function searchSong(name) {
    app.apiCall({
      method: "get",
      url: `/spotify/${name}`
    }, function(error, result) {
      if (error) {
        alert("shit!  " + error.message)
      }

      app.mutate.set(app.state, "songSearchResults", result)
    })
  }

  function addSong(data) {
    app.apiCall({
      method: "post",
      url: `/rooms/${app.state.currentRoom.name}/songs/${data.name}`,
      data: {
        name: data.name,
        duration: data.duration,
        spotifyID: data.id
      }
    }, function(error, result) {
      if (error) {
        alert("shit!  " + error.errors ? error.errors.map((error) => error.message).join('\n') : error.message)
      }

      getRoomSongs()
    })
  }

  function getRoomSongs() {
    var room = app.state.currentRoom

    if (!room) {
      return
    }

    app.apiCall({
      method: "get",
      url: `/rooms/${app.state.currentRoom.name}/songs`
    }, function(error, result) {
      if (error) {
        return alert(error)
      }

      app.mutate.set(room, "songs", result)
    })
  }

  return {
    searchSong: searchSong,
    addSong: addSong,
    getRoomSongs: getRoomSongs
  }
}
