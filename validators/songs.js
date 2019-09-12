var discriminate = require("discriminate")
var { Custom } = discriminate

var Song = discriminate({
  name: String,
  duration: Number,
  spotifyID: String,
  roomName: String
})

module.exports = {
  Song: Song
}
